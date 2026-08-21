# PHASE · M1F3 · HEALTH-SURFACE-1 · v1
<!-- PHASE-M1F3-HEALTH-SURFACE-1-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Master rollout plan item 1.4 — the LAST item in Block 1.
     Design base: cwf-measure-1-design-note-v1 §4 · RECON-M1F2-DATA-LAYER-1-v1_1.
     SELF-CONTAINED (D-2). Every value below computed this session from a fresh
     clone at origin/master = 310e4c05fd4f421729d59d24980c4682ba6a00fd (D-3). -->

## §0 · WHAT THIS PHASE IS, AND WHAT IT CARRIES

1.3 built the measurement layer. This phase gives it a face — the 17th admin
tab, **"Sağlık"** — and with it **closes Block 1**.

It is not a pure surface phase, and that is declared up front rather than
discovered mid-flight: it carries **one migration**, two reads that do not exist
yet, and the resolution of the 1.4 precondition **PERF-P95-1**. Everything Block
1 still owes is inside this file. Nothing is deferred "somewhere".

**Touch budget (doctrine v1_2 D-6):** this phase opens an AG quartet AND, because
it carries a migration, an Operator quartet after it. Declared now.

---

## §1 · HARD PRE-FLIGHT (blocking — report literal output)

Fresh **full clone**. S80-1/D-8: every write uses an ABSOLUTE path.

```
git clone https://github.com/maymun207/cwf_yaprak.git <scratch> && cd <scratch>
git rev-parse origin/master
```
**Expected anchor:** `310e4c05fd4f421729d59d24980c4682ba6a00fd`. Differs ⇒ STOP.

| Command | Expected |
|---|---|
| `ls supabase/migrations/*.sql \| wc -l` | `66` (latest `20260803120000_health_measurement_aggregates.sql`) |
| `npx vitest run` | **430 files / 4782 tests** green — report exact numbers |
| `grep docVersion public/architecture/manifest.json` | `rev 184 · 2026-08-03` |
| `check:doc-drift` · `check:tenant-zero` · `typecheck:api` | `[OK]` / `[OK]` / clean |

Branch: `phase/m1f3-health-surface-1`.

---

## §2 · BINDING CONSTRAINTS

1. **ONE migration, AUTHORED not applied** (ADR-005). Double-apply idempotence
   proven on a disposable postgres:16 — **and per S80-2, say explicitly which
   claims that container CAN and CANNOT express.** A grant-shape claim is proven
   by the standing gate, never by the container.
2. **Eval-gate untouched** · **C1 LAW** (zero writes to `messages`) · **zero
   governed publishes**.
3. **MEASURE-READ-HONESTY-1** — every count through `exactCountOrThrow`; every
   read feeding a rendered number distinguishes *no data* from *could not read*.
4. **The three hard rulings (S71):** feedback flows to HUMANS and MEASUREMENT
   only — never a prompt input, never a knowledge source, never a viz data
   source. Every rate carries a Wilson interval and the governed `health.minN`;
   below N it is **unqualified/gray, never green, never red**.
5. **empty≠zero at the render layer.** Three states, always distinct: a real 0 ·
   missing/no data · **could not read**. `UsageBarChart.tsx` already implements
   exactly this triple (real bar / deliberate hairline / no bar + broken line) —
   **reuse it, do not author a fourth vocabulary.**
6. **RULE-26** — nothing clips at 1280 or 1024. Rendered evidence or not done.
7. **RULE-1** — no hardcoded config; every bar comes from `resolveHealthPolicy`.
8. **FIX-SCOPE-TRUTH-1** — extensions allowed to keep this phase's own new
   statements true, each **FLAGGED** in the hand-back.
9. **No rerun, no retry, no overlay suppression** to green a gate.

---

## §3 · GATED SUB-PHASES

### G0 · THE CARRIED DEBTS (do these first, they are small and they are owed)

**G0.1 · DOC-FLIP.** `20260803120000_health_measurement_aggregates.sql` is now
APPLIED (Operator, 2026-08-03, all gates PASS: 4 functions `security definer`,
live ACL `postgres=X, service_role=X` with anon/authenticated **absent**,
`verifyGrants` 63/0 with all four 42501-denied, second push a no-op). Flip its
header status, plus the provenance comments in `shared/grantPolicy.ts` /
`shared/dbConstants.ts` if they carry one. Prove comment-only by the standing
comments-stripped byte-compare (S35-1).

**G0.2 · F-M1F2B-1.** That same header's lines 7-10 still describe the modelled-on
posture as *"EXECUTE revoked from PUBLIC and granted to service_role only"*. The
file does NOT do that — it revokes all-grantees, and its revoke block says so at
length. A reader of the header alone concludes PUBLIC-only. **One sentence, in
the header, naming the deviation where the header makes the claim.** This is the
same comment-versus-code class 1.3a punished; it does not get to survive because
it is small.

**G0.3 · prune** `phase/m1f2b-data-layer-1` if still present (verify ancestry
first). The two by-design stale remotes stay: `phase/e2e-devserver-api-404-1`,
`phase/inspect-verdict-1`.

---

### G1 · THE MIGRATION (one file, Operator-pending)

**G1.1 · `turn_feedback` gains a triage state.** Today the table is
`id · trace_id · conversation_id · user_id · verdict · reason_text · created_at ·
updated_at` with `unique(user_id, trace_id)` — **there is no review state.**
The design note's "unreviewed 👎 queue" therefore has nothing to read: a human
who looks at a 👎 and decides it is not a real fault cannot remove it, so the
queue never drains and becomes the opposite of what the card promises.

Add the minimum that makes "unreviewed" a real predicate: a **reviewed marker
(who / when)**, nullable, defaulting to unreviewed. **Do NOT** add a "reviewed"
boolean AND a timestamp AND an actor as three independent columns that can
disagree — one source of truth, absence = unreviewed.

Grants/RLS: `turn_feedback` is **owner-CRUD** today (owner select/insert/update,
NO delete policy, delete+truncate revoked from `authenticated`). The triage write
is an **admin** act on **another user's row** — it must NOT widen the owner
policy. Route it service-role only, through a gated endpoint. State in the
migration which posture you chose and why.

**G1.2 · close the retry double-count in `health_latency_daily`.**
`llm_call.latency_ms` is `Date.now() - ctx.llmStartedMs`, and `ctx.llmStartedMs`
is set ONCE at `chat.ts:257`, right after `writeHead`, **outside the retry loop**
(`stageStream.ts:201` is the emit). So on a retried turn the second attempt's row
carries attempt 1 **plus** attempt 2 — two samples for one turn, the later one
inflated by construction. The aggregate does `count(*)` over every row.

Measured: across the 7-day window `llm_call` samples equalled turns on **all
eight days** (2/2 · 5/5 · 6/6 · 9/9 · 41/41 · 29/29 · 5/5 · 1/1) — **zero retries
occurred**, so today's numbers are clean and no historical figure is wrong. The
distortion is latent. Close it now: one turn contributes **one** latency sample.
`create or replace function`, same posture, no new grant needed (the function
already sits in both `verifyGrants` lists).

**Both changes in ONE migration file.**

---

### G2 · THE READS THAT DO NOT EXIST YET

**G2.1 · the feedback queue.** `TurnFeedbackRepository` has exactly two methods,
`upsert` and `listByTraceIds` — verified. A queue needs a NEW read: `verdict =
'down'` ∧ unreviewed, newest-first, **bounded, with truncation stated** ("first N
of M", F161 partial≠complete). PostgREST caps at 1000 rows with no signal — page
to exhaustion or bound by exact count, never a bare `select`.

**G2.2 · trace_id → the turn's assistant message id.** `MessageRepository` has
only `insert` and `findOwnedByTraceId(traceId, userId)` — **owner-scoped, and it
returns `conversationId`, not an id.** The one-click 👎→golden needs the
**assistant message id** for a turn belonging to *another* user, so it needs a
new service-role read. The existing curation door
(`POST /api/admin/golden-specimens {action:'mark', messageId}`, gated on
`PERMISSIONS.GOLDEN_CURATE`) is REUSED as-is — do not fork it, do not bypass its
replayability check.

**G2.3 · band 1's two honest sources — both already exist.**
`api/admin/build-info.ts` serves the live `VERCEL_GIT_COMMIT_SHA/REF/REPO_*` from
Vercel-injected env (PANEL_ACCESS), and `backend_health` is populated by the
`*/30` cron. **No new integration, no new secret.**

**G2.4 · the honesty card gets a real source.** `CountUnavailableError` and
`ReadUnavailableError` are currently recorded **nowhere** — they throw, the caller
aborts or 500s, nothing persists. The design note wants the card's footnote to
count "measurement failures CAUGHT (last 7d)". Shipping that number from no
source would be the exact defect this program exists to remove.

Fix it at the **catch sites, not in the repositories** (a repository does not
emit telemetry; the caller does — the existing convention). Each site that
already logs one of these errors additionally writes ONE `telemetry_events` row:
`type:'error'`, `payload.kind:'measurement_unavailable'`, plus the guard's label.
`telemetry_events.type` already admits `'error'` — **no migration for this.**
Then the card's footnote reads a real number.

---

### G3 · THE TAB

`adminTabs.ts` `TABS` is **16** entries (verified, listed in order: rules · kinds
· providers · mcp · routing · users · quota · trust · rollout · synthetic ·
memory · inspect · tweak · replay · architecture · stages). Add **`'health'`** →
17. The `Tab` union is derived from `TABS`, so type and runtime cannot drift.

**Top of page:** a one-sentence verdict chip ("İYİ — N uyarı") **and the
"worst thing, named" line** directly under it. The verdict must never be greener
than its worst band.

**Six bands:**

1. **Omurga** — **deliberately narrowed, owner-ratified this session.** Ships
   with what we can measure honestly: the live deployed SHA/branch (G2.3) and
   per-backend health. The other three signals — **prod deploy state · CI ·
   observability** — render as **"henüz ölçülmüyor"**, by name, each pointing at
   the named item **`OMURGA-SIGNALS-1`** (Block 2 head). This is the honesty law
   applied to the dashboard itself: we do not paint a colour on something we do
   not measure. **Do not invent a green.**
2. **Konuşmalar** — volume, error classes, latency, grounded/evidence rate.
3. **Kullanıcı sesi** — 👍/👎 with Wilson, the unreviewed-👎 queue size, the
   👎→golden conversion count.
4. **Bilgi & yönetişim** — published rows, last gate verdict, aging drafts,
   golden last run, entity registry, memory tick.
5. **Güven & maliyet** — per-backend earned trust, monthly tokens vs ceiling,
   per-turn cost, **and the real/synthetic split rendered as TWO numbers, never
   summed**, the synthetic one carrying its `estimateBasis` label.
6. **Gece işleri** — synthetic injector, forget tick, rollout guardrail
   (**"underpowered" stays gray**), cron activity.

Every card **deep-links to its existing room** (Stages · Trust · Memory · Replay
· Rollout · Inspect). The dashboard is an index, never a dead end.

**PERF-P95-1's three outcomes are binding here:**
* the latency metric is labelled for what it MEASURES — **turn generation time,
  from SSE headers to answer complete, tool rounds included** — not "LLM
  latency". Verified at `chat.ts:257` / `stageStream.ts:201`.
* `health.p95WarnMs` is **re-grounded on the measured distribution** and its new
  value justified in the decl comment. The shipped `12_000` is not defensible:
  measured `llm_call` p95 ran **2.1×–5.0× over it on seven of eight days**, and
  on four days the **median alone** exceeded the p95 bar (07-27 25.4s · 07-28
  13.1s · 07-31 13.6s · 08-01 14.0s). A bar that reds every single day is not a
  bar. Of a 13.6s median turn on the one day clearing `minN=30` (07-31, n=41),
  ~1.8s is tool time (1.46 tool calls/turn × 1245ms p50) and ~11.8s is
  generation. **Do not silently change the value — change it with its evidence.**
* the double-count is closed in G1.2.

---

### G4 · THE QUEUE AND THE ONE CLICK

The unreviewed-👎 list: turn link, reason text, age. One click converts a 👎 into
a golden candidate through the EXISTING curation door (G2.2), and one click marks
it reviewed (G1.1).

**Permission honesty:** the queue reads at `TELEMETRY_READ_ALL`; the golden
action requires `GOLDEN_CURATE` (verified: `shared/permissions.ts:83` and `:127`).
These are different capabilities — **the button must not render for a user who
cannot use it**, and the endpoint must gate on the action's own permission, not
the tab's.

**Curation stays human.** The click creates a CANDIDATE through the gated path;
nothing auto-publishes, nothing auto-learns.

---

### G5 · THE HONESTY LAWS AT THE RENDER LAYER

* **Gray-card law everywhere:** no data / below `minN` / could-not-read each
  render distinctly and **say which one they are**. Three states, three strings,
  test-pinned separately (S79 L8: two empty states are two facts — here, three).
* **Direction-aware trend arrows:** ↑ red on p95 and cost, ↑ green on volume.
  An arrow on an unmeasured or below-N series **does not render at all** — a
  trend needs two measured points and must not be drawn from one.
* **The verdict line** names the worst band; if any band is unmeasured, the
  page verdict says so rather than averaging over a hole.

---

### G6 · EVIDENCE, DOCS, SEAL

* **RULE-26:** a new e2e spec beside the existing ones (`e2e/` currently holds
  `rule26-admin.spec.ts`, `inspect-verdict.spec.ts`, `chart-axis.spec.ts` …) —
  the Health tab renders with **zero clip margin at 1280 AND 1024**, deep-linked
  via `?tab=health`. **Do NOT add a `test.describe.configure({retries})` block:**
  seven such blocks already exist (E2E-RETRY-MASK-7) and each can hide two real
  failures. This phase adds none.
* `npm run reseal`; bump `docVersion` **rev 184 → rev 185** by hand, once.
  **Never hand-write a hash** (L13). Note: `src/**` is unmapped by every tab, so
  the drift here comes from `api/**` only — report which tabs actually drifted
  rather than assuming.
* CHANGELOG + SKILL.md lessons.

---

## §4 · SELF-VERIFY (literal evidence, no prose claims)

1. G0.1 comment-only proof (stripped byte-compare) · G0.2 the amended header line
   quoted · G0.3 the branch list after pruning.
2. Migration: double-apply idempotence output, **plus the S80-2 statement of what
   the container can and cannot express**.
3. G1.2: a fixture with a RETRIED turn (two `llm_call` rows, same `session_id`)
   proving the turn now contributes ONE latency sample — and the same fixture
   shown to produce TWO before the fix.
4. G2.1: the queue read proven to state truncation ("first N of M") on a set
   larger than its bound, and to page rather than bare-select.
5. G2.4: one `measurement_unavailable` row proven to land from a forced guard
   throw, with a positive control that the emit path can fail.
6. G3: `TABS` length 16 → 17 and the derived `Tab` union covering it.
7. G3/PERF-P95-1: the new `health.p95WarnMs` value **with the evidence that
   chose it**, and the metric's label quoted from the card.
8. G4: a rendered proof that the golden button is ABSENT for a
   `TELEMETRY_READ_ALL`-only identity and PRESENT for a `GOLDEN_CURATE` one.
9. G5: the three empty-states as three distinct test-pinned strings; and a test
   that a one-point series draws no arrow.
10. Band 1: a rendered proof that the three unmeasured signals say
    "henüz ölçülmüyor" and name `OMURGA-SIGNALS-1` — **not a green, not a dash**.
11. `evalGate.ts` diff EMPTY · zero writes to `messages` · zero governed publishes.
12. `npx vitest run` green, counts and the delta fully accounted, each new file
    named · `typecheck:api` · `check:doc-drift` · `check:tenant-zero`.
13. `npm run test:rule26` green **first attempt**, with the **flaky count stated
    explicitly**, read from the run's own summary. No re-run.
14. Every FIX-SCOPE-TRUTH-1 extension by name.

**STOP FOR REVIEW.** Push, report the remote hash, **do not merge and do not
apply the migration.**

---

## §5 · POST-DEPLOY PROOF READ (S63-1)

Two, and the first one settles a debt carried from 1.3b:

1. **The owed §5 endpoint read** — `/api/admin/health-analytics` returning a
   series that matches a hand-checked day. It was not performable before this
   phase because the endpoint had no surface; the Health tab is that surface, so
   the tab's own witness discharges it.
2. **Owner hand-witness (D-4 class c):** the tab rendering with REAL greens, REAL
   grays, the verdict line, and the three unmeasured band-1 signals naming
   themselves — witnessed at container width (RULE-26).

Architect-side, in the same window: **W-M1F2A-1**, observable only in the
00:00–02:00Z window on a deployment carrying the merge. **Block 1 does not seal
until that watch reports.**

<!-- END · PHASE-M1F3-HEALTH-SURFACE-1-v1 -->
