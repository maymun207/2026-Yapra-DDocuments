# PHASE TRACE-LINK-1 — persist the turn trace id → pre-run "open original trace in Langfuse"
<!-- v1 · 2026-07-05 · baseline master HEAD `0b848ec` (798 tests / 81 files / docVersion rev 38 / drift [OK]). Owner-requested (Part B specimen-detail panel): before replaying, open the recorded turn's ORIGINAL production trace end-to-end in Langfuse. Architect-verified against code at `0b848ec`. Security-adjacent (touches the C9 replay-detail endpoint + the persistence write path) → FULL review on merge. -->

You are AG (Author lane). Execute this ONE phase. All repo writes are yours; merge `--no-ff` (squash banned). Do NOT start until every pre-flight line is green.

---

## §0 — PRE-FLIGHT GATE (hard; do not proceed on any red)
- [ ] `git rev-parse origin/master` == **`0b848ec`** (fresh clone; RULE 25 starts here). If it differs, STOP and report — the baseline moved.
- [ ] Baseline JS suite **798/798, 81 files** green on a clean clone before touching anything.
- [ ] **Drift gate green:** `npm run check:doc-drift` → `[OK]` (6 tabs synced) at `0b848ec`.
- [ ] `tsc -b` + `typecheck:api` + `vite build` + full `npm run build` all exit 0 at baseline.

If any pre-flight line is red, STOP and report — do not "fix forward."

---

## §1 — WHAT & WHY (the diagnosis, verified against code at `0b848ec`)
The Part B specimen-detail panel (REPLAY-UX-3 #2) shows a recorded turn's user message + assistant reply + tool NAMES, but there is **no way to open that turn's ORIGINAL production trace in Langfuse before replaying**. Reason (verified): the `messages` row stores **no** trace/turn/session id — columns are `id, conversation_id, user_id, role, content, tool_call_count, raw_tool_results, error, created_at`. The only telemetry linkage today is a **time-window heuristic** (`resolveProvider` in `recordedTurn.ts`), which is fine for a provider *guess* but **must never key a deep-link** — two turns in the same window would link to the wrong trace, a fabricated "truth."

**The fix is exact, not heuristic.** `stagesGovernance.ts:24` sets `ctx.sessionId = ctx.turnId`, and telemetry writes `session_id: ctx.sessionId` → **`telemetry_events.session_id == ctx.turnId`**, which is exactly the value the item-4-verified Langfuse deep-link uses (`{host}/project/{projectId}/traces/{session_id}`, RULE 28). `ctx.turnId` = `turnIdentity()` = the active **OTel trace id** (32 hex) when observability is up, else a `randomUUID()` fallback. So: **persist `ctx.turnId` on the assistant message row**, surface it on the safe detail, and render a trace deep-link — graceful-off when absent.

**Honest caveats baked into the spec (do not paper over):**
- **Old + obs-down turns get no link.** Every message written before this migration is applied → `trace_id = null`. Turns where observability was down → `ctx.turnId` is a dashed `randomUUID` with **no** Langfuse trace. Both must **graceful-off** to an honest note, never a dead/fabricated link. This is empty≠zero at the render layer: missing ≠ a link that 404s.
- **Only `ctx.turnId` (the full id), NEVER `ctx.traceId`.** `ctx.traceId` is the 8-char log prefix (`turnLogPrefix(turnId)`, `types.ts:68`) — using it would build a broken link. Persist and surface **`ctx.turnId`**.

---

## §2 — HARD CONSTRAINTS
1. **Secrets:** none introduced. `trace_id` is a **join key**, not a secret and not a tool payload — RULE 28 explicitly names it the deep-link join key. The C9 no-leak boundary is about `raw_tool_results` **payloads**; those stay server-side exactly as today. Do NOT relax the existing no-leak assertions — **extend** them.
2. **No heuristic for the link.** Do NOT reuse `resolveProvider`'s time-window match (or any timestamp/`limit 1` scan) to obtain a trace id. The only source is the persisted `trace_id` column.
3. **Value = `ctx.turnId`, not `ctx.traceId`.** Write the full turn id at both insert sites.
4. **Deploy-ordering (critical — see YOUR ACTION ITEMS):** `MessageRepository.insert` is best-effort non-throwing; if the code writes `trace_id` to a DB **without** the column, PostgREST rejects the insert and **every message silently fails to persist**. The migration MUST be applied to the target DB **before** the deploy carrying this code goes live. The migration is `add column if not exists` (safe, fast, additive).
5. **`ctx.turnId` shape:** the deep-link is only valid for OTel-shaped ids (32 lowercase hex, no dashes). The frontend link gate is `/^[0-9a-f]{32}$/.test(traceId)`; a dashed `randomUUID` (obs-down fallback) → graceful-off. This is a deterministic format check on a controlled id, **not** a fragile regex over free text.
6. **Reseal file is `public/architecture/manifest.json`** — there is NO root `manifest.json`. (Do not repeat the prior phase's path error.)
7. **Diff-scope EXPLICITLY PERMITS**, in addition to the code files below: `.agents/CHANGELOG.md`, `public/architecture/manifest.json` (reseal), and `src/lib/adminService.ts` (the frontend type widening). Never forbid the changelog.
8. **`api/admin/replay.ts` is expected UNCHANGED** — the `?specimenDetail=` branch returns the detail object verbatim, so a richer `loadRecordedTurnDetail` flows through automatically. If you find you must touch it, keep it to the passthrough and say why.

---

## §3 — SUB-PHASE A: migration + write path
**A1 — migration file** (Author writes the file; application is Operator-lane, see YOUR ACTION ITEMS):
Create `supabase/migrations/20260705140000_messages_trace_id.sql` (timestamp strictly after the latest `20260704130000_replay_audit.sql`):
```sql
-- TRACE-LINK-1: carry the turn's Langfuse trace id on the assistant message row so
-- a recorded specimen can deep-link to its ORIGINAL production trace BEFORE replay.
-- The value written is ctx.turnId (= turnIdentity() = the OTel trace id, RULE 28 —
-- the SAME value telemetry_events.session_id carries, which keys /traces/{id}).
-- Nullable + no backfill: pre-existing rows and observability-down turns stay NULL →
-- the UI graceful-offs (honest "no original trace recorded"), never a fabricated link.
-- Additive; RLS unchanged (service-role writes only; users SELECT own rows as before).
alter table public.messages
    add column if not exists trace_id text;

comment on column public.messages.trace_id is
    'The turn''s Langfuse trace id (= telemetry_events.session_id for this turn, RULE 28) — the deep-link join key to the original production trace. NULL for rows written before TRACE-LINK-1 or when observability was disabled (turnIdentity() randomUUID fallback). Not a secret: a join key, never a payload.';
```
No index (reads are by message id; `trace_id` is carried, not queried). No RLS change.

**A2 — `MessageRow` type** (`api/cwf/_lib/persistence/types.ts`): add `trace_id?: string | null;` to the `MessageRow` interface.

**A3 — both assistant-insert sites** (`api/cwf/_lib/turn/stageStream.ts`): add `trace_id: ctx.turnId,` to BOTH `ctx.messageRepo.insert({ … })` objects — the success path (~line 245) **and** the `handleStreamError` partial-persist path (~line 290). Use **`ctx.turnId`** (NOT `ctx.traceId`).

**A4 — persist test** (`api/cwf/_lib/__tests__/conversationPersistence.test.ts`): extend to assert the persisted assistant `MessageRow` carries `trace_id === ctx.turnId` (and, to lock the trap, assert it is NOT the 8-char `ctx.traceId`). Cover both the success and error-path inserts if the existing test exercises both.

---

## §4 — SUB-PHASE B: backend safe-detail surface
**B1 — `recordedTurn.ts` load path:**
- `MessageRowLike` interface: add `trace_id: string | null;`.
- `loadRecordedTurn`'s `.select(...)` string on `DB_TABLES.MESSAGES`: append `, trace_id` to the column list.
- `RecordedTurn` interface: add `traceId: string | null;`; populate it in `loadRecordedTurn`'s return as `traceId: specimen.trace_id ?? null`.

**B2 — `loadRecordedTurnDetail` + `ReplaySpecimenDetail` (backend, `recordedTurn.ts`):** add `traceId: string | null;` to the `ReplaySpecimenDetail` interface and to the returned object (`traceId: turn.traceId`). The 4-field projection becomes 5-field — still **NO** `raw_tool_results`; `traceId` is a join key.

**B3 — endpoint:** `api/admin/replay.ts` `?specimenDetail=` branch should need **no change** (returns the object verbatim). Confirm and state so.

**B4 — backend tests:**
- `api/cwf/__tests__/recordedTurn.test.ts` — in the existing no-leak `loadRecordedTurnDetail` test, give `DETAIL_ROW` a `trace_id` of an OTel-shaped value (e.g. `'838a77c99543343f9dec86960255018c'`); assert `detail.traceId === '838a77c9…'`, and **keep** all existing no-leak assertions (`not.toHaveProperty('raw_tool_results')`, `JSON.stringify` excludes both planted payloads). Add a case: `trace_id: null` → `detail.traceId === null`.
- `api/admin/__tests__/replay.test.ts` — extend the specimenDetail 200 case to assert the response body carries `traceId`.

---

## §5 — SUB-PHASE C: frontend link (env-derived, graceful-off, OTel-shape gated)
**C1 — `src/lib/adminService.ts`:** add `traceId: string | null;` to the frontend `ReplaySpecimenDetail` interface. The `getReplaySpecimenDetail` method body is unchanged (type-only widening).

**C2 — `src/components/admin/ReplayTab.tsx`:**
- **Fetch obs config on expand.** In `toggleDetail(id)` (~line 226), add `void ensureObsConfig();` on the expand path so the deep-link config is available when the detail opens (it's ref-guarded/idempotent; it already fires in `run()`).
- **Build the trace link (mirror the run link).** Compute, for the expanded detail's `traceId`:
  ```ts
  const traceLinkable = !!detail?.traceId && /^[0-9a-f]{32}$/.test(detail.traceId);
  const originalTraceUrl = (langfuseHost && obs.langfuseProjectId && traceLinkable)
    ? `${langfuseHost}/project/${encodeURIComponent(obs.langfuseProjectId)}/traces/${encodeURIComponent(detail!.traceId!)}`
    : null;
  ```
  Reuse the existing `langfuseHost` (trailing-slash-stripped) and `obs.langfuseProjectId`. RULE 1 — never a hardcoded host.
- **Render in `SpecimenDetailPanel` (~line 417),** below the tool NAMES block:
  - `originalTraceUrl` present → an anchor "open original trace in Langfuse" / "orijinal trace'i Langfuse'da aç" (`ExternalLink` icon, mirror the run link's classes; `target="_blank" rel="noopener noreferrer"`).
  - else → a muted honest note via `t()`: TR `'bu turn için orijinal trace kaydedilmemiş (replay öncesi görüntüleme yalnızca bu özellikten sonra kaydedilen turn’ler için)'`, EN `'no original trace recorded for this turn (pre-replay view is available only for turns recorded after this feature)'`. Never a broken link, never a silent gap.

**C3 — RTL tests** (`src/components/admin/__tests__/replayTab.test.tsx`):
1. Expand a specimen whose detail has an **OTel-shaped** `traceId` with obs config present → an anchor renders with `href === {host}/project/{projectId}/traces/{traceId}`.
2. `traceId: null` → the honest graceful-off note renders, **no** anchor.
3. `traceId` present but obs host null → graceful-off, no anchor (no broken link).
4. `traceId` a **dashed** uuid (obs-down fallback shape) → graceful-off, no anchor (the `/^[0-9a-f]{32}$/` gate).
5. Assert `getObservabilityConfig` is called on **expand** (not only on run).

---

## §6 — SUB-PHASE D: reseal + docVersion + changelog
1. Run `npm run check:doc-drift` — it will **FAIL** on the tabs mapping the touched areas (`api/cwf/_lib/turn/**`, `api/cwf/_lib/**` incl. persistence + replay, `api/cwf/_lib/replay/**`; `api/admin/**` only if you actually changed `replay.ts`).
2. `npm run reseal` for exactly the tabs the gate reports (recompute `mappedContentSha`, advance `lastSyncedCommit` to the code-merge baseline). **No `.html` diagram file is touched** — this is a carried join key + a link, **below diagram altitude** (no new depicted authority/structure/flow) → **reseal-not-redraw**. Append a one-line below-altitude note to the affected tab(s) describing the `trace_id` carry + pre-run trace link.
3. Manually bump `docVersion` **rev 38 → 39** in `public/architecture/manifest.json`.
4. Re-run `check:doc-drift` → `[OK]` all 6 tabs. The reseal lands in the SAME commit as the code (RULE 20).
5. `.agents/CHANGELOG.md` entry as a **separate no-reseal follow-up merge** (`.agents/**` UNMAPPED).

---

## §7 — SELF-VERIFICATION (literal evidence; NOT "build-green")
Report each with the actual command output / grep, not a claim:
- [ ] `git rev-parse origin/master` before start == `0b848ec`.
- [ ] `ls supabase/migrations/ | tail -1` shows the new `…_messages_trace_id.sql`; its body is `add column if not exists trace_id text` + the comment.
- [ ] `grep -n "trace_id: ctx.turnId" api/cwf/_lib/turn/stageStream.ts` → **two** hits (success + error path); `grep -n "ctx.traceId" stageStream.ts` shows the id is NOT the 8-char prefix at those sites.
- [ ] Persist test asserts `row.trace_id === <ctx.turnId>` (and `!== ctx.traceId`) — paste the assertion + pass line.
- [ ] `recordedTurn.test.ts` no-leak test: `detail.traceId === '838a77c9…'` **and** both planted payloads absent from `JSON.stringify(detail)` **and** no `raw_tool_results`/`rawToolResults` property — paste pass lines. Null case passes.
- [ ] Handler test asserts the 200 detail body carries `traceId`.
- [ ] RTL: the 5 cases in §5-C3 pass — paste the `href` asserted in case 1 and the "no anchor" assertions in 2–4.
- [ ] `git diff --name-only e63fd0d..HEAD`… no — `git diff --name-only 0b848ec..HEAD` = exactly the permitted set (types.ts, stageStream.ts, recordedTurn.ts, adminService.ts, ReplayTab.tsx, the migration, the 4 test files, manifest.json, and — separate merge — CHANGELOG.md). Confirm `api/admin/replay.ts` is **absent** (or, if present, only the passthrough).
- [ ] `grep -rl "\.sql" supabase/migrations | tail` shows only the one new migration; no other `.sql` touched.
- [ ] Full suite green with count **up** (798 → 798+N, N = added tests; ratchet, never down); `tsc -b` + `typecheck:api` + `vite build` + `npm run build` exit 0.
- [ ] `check:doc-drift` FAILed pre-reseal (paste the failing tabs) → post-reseal `[OK]` all 6; `git diff --name-only` among `public/architecture/**` = **only** `manifest.json` (no `.html`).
- [ ] Merge `--no-ff`; report the code-merge remote hash + the changelog-merge remote hash (RULE 25 — not done until pushed).
- [ ] Feature branches deleted after merge (branch hygiene; master only long-lived).

---

## §8 — EXPLICITLY OUT OF SCOPE
- No backfill of `trace_id` on historical rows (they stay null → graceful-off, by design).
- No new index, no RLS change, no other table.
- No change to the run→session link (REPLAY-UX-3 #3) — this adds the **pre-run original-trace** link alongside it.
- No heuristic/telemetry-window trace resolution.
- No Part A (per-stage replay) work.

---

## YOUR ACTION ITEMS (Maymun — surfaced, not buried)
- **① Apply the migration to the target DB via Operator lane BEFORE this code deploys** (`add column if not exists trace_id text` on `public.messages`). Ordering is load-bearing: if the code goes live first, `MessageRepository.insert` (best-effort, non-throwing) will **silently drop every message** until the column exists. Since the migration is additive and instant, apply it first, then let the merge deploy.
- **② After ship, verify live:** ask the factory a fresh question (generates a NEW assistant turn that now carries `trace_id`), open that specimen's detail in Part B → the "open original trace in Langfuse" link appears and resolves (you must be signed into Langfuse on the AWS host — item-4; org `cwf`, project `cwf-prod`). Old specimens (e.g. `fac08913…` from your screenshot) will correctly show the honest "no original trace recorded" note — that is expected, not a bug.
- No other manual action. I review the AG report by fresh-clone diff vs `0b848ec` (full review — it touches the C9 detail endpoint + the persistence write path), independently recounting tests and re-running the no-leak + drift gates.
