# PHASE — INSPECT-VERDICT-1 · v1
<!-- PHASE-INSPECT-VERDICT-1-v1 · 2026-08-02 · S79 · rollout plan item 1.2b
     (owner-approved addition; MEASURE-1 family, F1's read-side companion).
     Authored on RECON-INSPECT-VERDICT-1-v1 — every live fact in §0/§1 was
     read this session from a fresh clone at dec3ff55. ONE self-contained
     relay (D-2): everything you need is in this file.
     STOP-FOR-REVIEW at the end. Do NOT merge. -->

## §0 · HARD PRE-FLIGHT (run first; any mismatch = STOP and report)
Fresh FULL clone (never `git stash`, never a shallow clone — report
`git rev-parse --is-shallow-repository` = false).
1. `git rev-parse origin/master` → **`dec3ff557036bc142d85002d596f9c74325a76ce`**
2. `ls supabase/migrations/*.sql | wc -l` → **65** (this phase adds ZERO)
3. Suite baseline: your own count of vitest files under `src/ shared/ api/`
   → **420** (tests 4675 per the M1F1 CI arbiter). Re-prove the baseline on
   the untouched clone before you write anything.
4. `grep -oE '"docVersion": ?"[^"]*"' public/architecture/manifest.json`
   → **rev 179**
5. Zero-existing-surface check, paste the output:
   `grep -rln "turn_feedback\|TURN_FEEDBACK\|TurnFeedbackRepository" api/admin src/components/admin`
   → expect **no output** (0 files). If ANY file matches, STOP — the premise
   of this phase (no admin surface exists) is false and I must re-brief.

## §1 · WHAT IS TRUE TODAY (read this session; do not re-derive as opinion)
- **The join key is already shared.** `chat.ts:172` mints ONE turn id via
  `turnIdentity()`; `observability/identity.ts` documents that the log
  prefix, the Langfuse trace and `telemetry_events.session_id` all derive
  from it (RULE 28). `inspectGrouping.ts:107` keys a TURN on
  `row.session_id`. The migration comment on `turn_feedback.trace_id` names
  the same value. **You will not mint, derive, or transform any id in this
  phase. Join by value, on `trace_id === session_id`, or not at all.**
- **Inspect has TWO read doors** (`InspectTab.tsx` `refresh()`, ~:173-182):
  `canAll && who !== 'me'` → `loadTelemetryAdmin` → GET `/api/admin/telemetry`
  (service-role, `TELEMETRY_READ_ALL`-gated at `api/admin/telemetry.ts:52`);
  otherwise → `loadTelemetry` → `adminService.listTelemetry` (browser RLS
  SELECT over `telemetry_events`). The DEFAULT screen (user filter = "ben")
  uses the SECOND door even for a super_admin.
- **Turn badges** render at `InspectTab.tsx:~609-619` from
  `TurnBadges {grounding, truncated, quotaDegraded}`, built in
  `inspectGrouping.buildTurn()` from the turn's OWN telemetry rows.
- **The feedback lane has NO server read.** `TurnFeedbackRepository` exposes
  exactly one method, `upsert(...)`. The only reader anywhere is the client
  `loadOwnFeedback(conversationId)` in `src/lib/feedbackService.ts`
  (browser RLS SELECT, `conversation_id`-keyed, returns a `trace_id`-keyed
  map, `[]` on error).
- Constants that exist and must be reused, never re-literalled (RULE 1):
  `DB_TABLES.TURN_FEEDBACK` (`shared/dbConstants.ts:60`),
  `ADMIN_TELEMETRY_DEFAULT_LIMIT` = 100 / `ADMIN_TELEMETRY_MAX_LIMIT` = 1000
  (`:770-771`), `PERMISSIONS.TELEMETRY_READ_ALL` (`shared/permissions.ts:83`).

## §2 · BINDING CONSTRAINTS (violate one and the phase is rejected)
1. **ZERO migrations, ZERO governed writes, ZERO publishes, ZERO Operator
   steps.** This is a read-side phase. If you find yourself wanting a
   column, STOP and hand back.
2. **THE THREE HARD RULINGS HOLD.** Feedback is never a prompt input, never
   a knowledge source, never a viz data source. `api/cwf/_lib/turn/**` and
   `api/cwf/_lib/prompt/**` gain ZERO references to the feedback lane;
   `feedbackPipelineIsolation.test.ts` stays green and UNMODIFIED.
3. **The producer is frozen.** `api/cwf/feedback.ts`, the migration,
   `TurnFeedbackRepository.upsert`, `FeedbackButtons.tsx` and the chat wiring
   are NOT touched except for the ONE additive read method in §3 G1.
4. **Privacy tier = telemetry's tier, never lower.** Cross-user feedback
   reads gate on `PERMISSIONS.TELEMETRY_READ_ALL` ONLY. Never PANEL_ACCESS,
   never an ungated browser read of another user's rows.
5. **Secrets: none are involved and none may be echoed** (ADR-007). No new
   env var.
6. **`reason_text` never renders in a list row** — expanded turn detail only
   (D-C). Nothing about the verdict is ever written back anywhere.
7. **empty ≠ zero.** A turn with NO verdict renders NO chip — never a
   neutral/grey "0" chip, never "henüz oy yok" noise per row. A FAILED
   feedback read renders NO chips at all and logs; it must never make voted
   turns look unvoted in a way the panel presents as fact — see G4's honest
   marker requirement.
8. RULE 26: nothing clips at 1280 and 1024; rendered evidence or not done.

## §3 · GATED SUB-PHASES

### G1 · The server read (repository + gated endpoint)
- `TurnFeedbackRepository` gains ONE additive read:
  `async listByTraceIds(traceIds: string[]): Promise<TurnFeedbackRecord[]>`
  — service-role, `.in('trace_id', …)`, bounded by
  `ADMIN_TELEMETRY_MAX_LIMIT`, chunked if the id list exceeds a safe URL/IN
  size (you choose the chunk size; state it and why). Empty input → `[]`
  WITHOUT a query. A DB error THROWS (the endpoint 500s) — a read failure
  must never read as "nobody voted".
- New endpoint **`api/admin/turn-feedback.ts`**: `GET` only (405 otherwise),
  `authed()` then `ensurePermission(ctx, PERMISSIONS.TELEMETRY_READ_ALL,
  res)` — copy the posture of `api/admin/telemetry.ts` exactly. Accepts
  `?traceIds=a,b,c` (bounded count; over the bound → 422, never a silent
  truncation). Returns `{ feedback: TurnFeedbackRecord[] }`.
- This endpoint is the CROSS-USER door only.

### G2 · The client lookup (both doors, ONE merge point)
- `src/lib/feedbackService.ts` gains `loadFeedbackForTraces(traceIds)` —
  the PERSONAL door: browser RLS SELECT over `DB_TABLES.TURN_FEEDBACK`
  filtered `.in('trace_id', …)`, returning the same `trace_id`-keyed map
  shape `loadOwnFeedback` already returns. Reuse the existing map/record
  types; do not fork a second shape.
- `src/lib/adminService.ts` gains `listTurnFeedbackAdmin(traceIds)` calling
  the G1 endpoint through the existing `adminFetch` helper — the
  CROSS-USER door.
- `InspectTab` picks the door with the **same condition `refresh()` already
  uses** (`canAll && who !== 'me'` → admin endpoint, else personal RLS).
  Do not invent a second condition; if the two ever diverge the badge lies.
  The lookup runs AFTER the telemetry rows land, over the trace ids present
  in the grouped result, and stores one `Map<traceId, verdict-record>`.

### G3 · The surface
- Turn row: a verdict chip beside the existing badges (👍 success-toned,
  👎 amber/destructive-toned per the file's existing Badge vocabulary —
  match the neighbours, invent no new colour language), with a
  `data-testid` per verdict for the tests.
- Expanded turn detail: the verdict plus `reason_text` when present,
  rendered as bounded text (it is ≤2000 chars by DB CHECK — still wrap it,
  RULE 26).
- Filter bar: one control **"yalnız 👎 / only 👎"** that narrows the tiers
  view to turns carrying a `down` verdict. Client-side, same posture as the
  existing `type` dropdown. Absent verdict data → the control is present but
  matches nothing (never hidden silently, never an error state).
- Turkish + English strings through the file's existing `t(tr, en)` helper.

### G4 · Honesty of the lookup itself
- One structured log line per lookup: door taken, id count requested, rows
  returned. No user text in the log.
- If the feedback lookup FAILS (throw / 403 / network), the panel renders
  its turns normally and shows ONE honest marker in the filter bar area
  (e.g. "oy bilgisi okunamadı / feedback unavailable") — NEVER silently
  chipless turns that read as "no one voted". This is the phase's own
  empty≠zero obligation and it is test-pinned.

### G5 · Tests (both directions, S66-1 floors)
- Repository: empty input no-queries; error THROWS; chunking exercised.
- Endpoint: 405 · 401 · 403 without `TELEMETRY_READ_ALL` (assert the exact
  permission constant, not a role name) · 422 over the id bound · 200 shape.
- Client: door selection matches `refresh()`'s condition in BOTH states.
- Grouping/render: a voted turn shows the chip; **an unvoted turn shows NO
  chip (the positive control that the detector can stay silent)**; a failed
  lookup shows the honest marker and NOT a chipless-clean panel; the
  "yalnız 👎" filter narrows and un-narrows.
- The isolation fence test must still pass UNMODIFIED — run it and say so.
- RULE 26 e2e evidence at 1280 and 1024 for the new chip + filter.

### G6 · Docs
CHANGELOG entry + KB lesson + `npm run reseal` (docVersion **179 → 180**)
+ `check:doc-drift` [OK] all tabs, in the SAME commit as the code (RULE 20).
Attribute drift from a clean anchor at `dec3ff55` (the F185 attribution
footgun): if the drift gate names a file this branch never touched, run the
clean-anchor worktree check and report both readings.

## §4 · SELF-VERIFY (literal evidence, no adjectives)
Report, each as pasted output not prose:
1. `git rev-parse origin/master` at start + your branch name + head sha.
2. The §0 five pre-flight outputs.
3. Full file list with `git diff --stat af2d194e-equivalent` (use
   `dec3ff55..HEAD`) — counts must reconcile with your narrative.
4. Suite: files/tests before and after, with the delta explained per file.
5. `tsc -b` + `typecheck:api` clean.
6. The isolation-fence test result, named.
7. reseal: tabs resealed, rev 179→180, `check:doc-drift` verdict.
8. RULE-26 screenshots/e2e evidence for both widths.
9. `grep -rn "turn_feedback\|TurnFeedbackRepository" api/cwf/_lib/turn api/cwf/_lib/prompt`
   → paste (expect ZERO).
10. Statement: zero migrations, zero governed writes, zero publishes, zero
    Operator steps — or name what you needed and STOP instead.

## §5 · STOP-FOR-REVIEW
Push the branch (`phase/inspect-verdict-1`), open NO PR yet, merge NOTHING.
Hand back the report. Architect runs RULE-25 from a fresh clone and issues
the GO with the verbatim merge message.

<!-- TAIL ANCHOR (S61-3): this relay ends after the words "verbatim merge
     message." and this comment. Missing line = truncated relay — request a
     re-send before acting. -->
<!-- END · PHASE-INSPECT-VERDICT-1-v1 -->
