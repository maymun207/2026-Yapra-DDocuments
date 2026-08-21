# PHASE · M1F2B · DATA-LAYER-1 · v1
<!-- PHASE-M1F2B-DATA-LAYER-1-v1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     Master rollout plan item 1.3, gate 2 of 2 (1.3a = M1F2A, merged ce9c96de).
     Design base: cwf-measure-1-design-note-v1 §3 · RECON-M1F2-DATA-LAYER-1-v1_1.
     SELF-CONTAINED (D-2). Every value below was computed this session from a
     fresh clone at origin/master = ce9c96de501add2bf3c69c3fbd1b4f9b8f402be1 (D-3). -->

## §0 · WHAT THIS PHASE IS

1.3a made the read floor able to say *"I could not read"*. This phase builds the
measurement layer on that floor: the aggregates, the trend series, the governed
thresholds, and the honest cost split. **No surface** — the Health tab is 1.4.

It also closes the one thing 1.3a left open, and that is the FIRST gate, not a
rider: **F-M1F2A-1**. The Architect's G5 sentence said *"no consumer may re-fold
a null on the way to the SCREEN"*. `rolloutGuardrail` re-folds it on the way to a
**DECISION**. The gap was the Architect's wording, not the sweep — and the
owner's standing rule is that what we start, we finish. It finishes here.

---

## §1 · HARD PRE-FLIGHT (blocking — report literal output)

Fresh **full clone** (not a `reset --hard`; S80-1: every write uses an ABSOLUTE
path — the cwd is a variable another process can change).

```
git clone https://github.com/maymun207/cwf_yaprak.git <scratch> && cd <scratch>
git rev-parse origin/master
```

**Expected anchor:** `ce9c96de501add2bf3c69c3fbd1b4f9b8f402be1`
Differs ⇒ **STOP and report.**

| Command (all verified present in `package.json` scripts) | Expected |
|---|---|
| `ls supabase/migrations/*.sql \| wc -l` | `65` (latest: `20260802160000_turn_feedback.sql`) |
| `npx vitest run` | **427 files / 4740 tests** green — report the exact numbers |
| `grep docVersion public/architecture/manifest.json` | `rev 183 · 2026-08-03` |
| `npm run check:doc-drift` · `check:tenant-zero` · `typecheck:api` | `[OK]` / `[OK]` / clean |

Branch: `phase/m1f2b-data-layer-1`.

**G0 housekeeping (carried here so it costs no separate relay):** delete the
remote branch `phase/m1f2a-honest-read-1` — Architect-authorized, it is an
ancestor of master and its commit lives in the merge. Report the deletion.

---

## §2 · BINDING CONSTRAINTS

1. **ONE migration, AUTHORED not applied** (ADR-005 — `supabase db push` by the
   Operator only). Prove double-apply idempotence on a disposable postgres:16.
2. **Eval-gate untouched** — `evalGate.ts` diff EMPTY.
3. **C1 LAW** — zero writes to `messages`. **Zero governed writes / publishes**
   (the new `health.*` params self-seed through the existing S46 reconciler from
   their decls; do NOT publish them by hand).
4. **ADR-007** — secrets never echoed. **RULE-1** — no hardcoded config.
5. **MEASURE-READ-HONESTY-1** (in force since 1.3a) — every count in this phase
   goes through `exactCountOrThrow`; every aggregate distinguishes *no data*
   from *could not read*. **A number this phase cannot measure is `null`, never 0.**
6. **The three hard rulings (S71, binding):** feedback flows to humans and
   measurement ONLY — never a prompt input, never a knowledge source, never a
   viz data source. Every rate ships with a Wilson interval and a governed
   minimum N; below N the value is GRAY/unqualified, never green, never red.
7. **FIX-SCOPE-TRUTH-1** — extensions permitted to keep this phase's own new
   statements true, but every one is **FLAGGED** in the hand-back.
8. **No rerun, no retry, no overlay suppression** to green a gate (S79 ruling).
9. Positive controls mandatory at every zero (S66-1).

---

## §3 · GATED SUB-PHASES

### G1 · F-M1F2A-1 — the null survives to the DECISION layer

`api/cwf/_lib/replay/rolloutGuardrail.ts:81-83` (current line numbers, read at
`ce9c96de`):

```ts
const row = (input.usage ?? []).find((r) => r.promptRev === rev);
const turns = row?.turns ?? 0;
const emptyTurns = row?.emptyTurns ?? 0;
```

`UsageEmptyRow.turns` / `.emptyTurns` are now `number | null` (1.3a). These two
`?? 0` were written for the **row-absent** case — which is a real, correct 0 arm
that the power floor should catch as `underpowered`. They now ALSO swallow a
**row-present-but-not-measured** value into the same 0.

Two facts bound the severity, both verified — state them in your own words in
the CHANGELOG so the record is not inherited:
* not live-reachable today (all four aggregates `coalesce(...,0)` server-side);
* the actuator gates on `verdict === 'regression'` at `rolloutGuardrail.ts:189`
  and `api/admin/rollouts.ts:267`, so `underpowered` and `unavailable` are
  equally non-acting. **No wrong rollback can arise from this.**

Required: **row-absent and value-unmeasured become different outcomes.**
Absent ⇒ a real 0 arm ⇒ `underpowered` (unchanged). Present-but-null ⇒ the arm
is unmeasured ⇒ verdict `unavailable`, `forced: 'usage-unavailable'` — the arm
carries no fabricated 0 and `wilsonInterval` is never called on a null.
`RolloutArmEvidence.turns/emptyTurns` widen accordingly.

**Then census the class, do not patch the instance.** Every consumer of
`UsageDayRow` · `UsageUserTotalsRow` · `UsageFingerprintRow` · `UsageEmptyRow`
across `api/**` and `src/**`, every `?? 0` / `|| 0` on those fields. The
Architect's grep found the consumers at `api/admin/usage-analytics.ts:18,24-26`,
`api/cwf/_lib/persistence/index.ts:39`, `rolloutGuardrail.ts:39,73,147` — treat
that as a cross-check, not your input. **If you find one I did not, yours wins
and the delta is named.**

---

### G2 · THE AGGREGATES (one migration, Operator-pending)

Model every new function on `usage_daily_series`
(`supabase/migrations/20260709160000`, lines 194-221) — `language sql`,
`security definer`, `set search_path = public`, `revoke execute … from public`,
`grant execute … to service_role`, `comment on function …`, and the file ends
with `notify pgrst, 'reload schema'`.

**G2.1 · The denominator problem — the reason this is not one obvious query.**

`usage_daily_series` counts `turns = count(distinct e.session_id)` over
`type = 'llm_call'` rows. A turn that ASKS instead of answering never reaches
`runStreamStage` (`chat.ts:267-274` chooses `runClarificationTurn` INSTEAD), so
it emits **no `llm_call` row and no `turn_done` row** — only
`clarification_asked` (`stageClarify.ts:465`). The honest-withhold class the
useful-turn ratio wants to CREDIT is structurally absent from both candidate
denominators. Latent today (`router.frameRouting` is dark, so
`computeTurnClarification` no-ops), live the day A23 flips it.

The discriminators, all verified at `ce9c96de`:

| Fact | Where |
|---|---|
| turn completed | `type='message'`, `payload->>'kind' = 'turn_done'` |
| honest withhold | `type='message'`, `payload->>'kind' = 'clarification_asked'` |
| answer was empty | `turn_done` → `payload->>'empty'` |
| tool ran and succeeded | `type='tool_call'`, `tool_name` not null, `payload->>'ok' = 'true'` |
| grounding violated | `type='error'`, `payload->>'kind' = 'grounding_violation'` |
| LLM failed | `type='error'`, `payload->>'kind' = 'llm_error'` |
| quota denied | `type='error'`, `payload->>'kind' = 'chat_quota_denied'`, **`session_id` IS NULL by construction** (`chat.ts:115` — the turn never started, so no turn id exists) |

Every row carries `session_id = ctx.turnId` (`stagesGovernance.ts:28-29`,
RULE 28) — the join is by value, no id is minted.

**Required denominator:** distinct `session_id` over
`turn_done ∪ clarification_asked`. Quota-denied turns are their OWN reported
number, never folded in — they have no turn id and joining them would be a
fabrication.

**G2.2 · The functions.** Author them as the band spec needs, at minimum:
* a daily series over the G2.1 denominator carrying: turns, withheld turns,
  empty-answer turns, evidence-bearing turns (≥1 successful `tool_call`);
* error-class counts per day (`payload->>'kind'` grouped, `type='error'`);
* **latency p95** — in SQL. R5: `latency_ms` lives on `llm_call`/`tool_call`
  rows, and the repo's only percentile helper (`routeShadowLens.ts:855`
  `quantile`) works on an in-memory array, which would hit the same silent
  1000-row cap this whole line of work exists to close.
* the feedback rates from `turn_feedback` (joined on `trace_id`).

**G2.3 · Security, per the standing rule.** Every new function gets a row in
`SERVICE_ROLE_ONLY_FUNCTIONS` **and** `FN_EXECUTE_PROBES`
(`scripts/verifyGrants.ts:119-160`) with REAL migration parameter names — a
wrong name 404s `PGRST202` and defeats the probe rather than proving anything.
Use the zero-width `NO_WINDOW` benign-args convention already there.

---

### G3 · GOVERNED `health.*` THRESHOLDS

Four decls on the existing `agent.param` system lane, posture copied VERBATIM
from `MEMORY_TTL_DAYS` (`agentParams.ts:458`): `type:'number'`, explicit
`min`/`max`, `sessionTweakable:false`, no lab tier, no env tier — the code decl
IS the outage floor. They self-seed via the S46 reconciler (`AGENT_PARAM_SEEDS`
is derived from the decls) ⇒ **zero migration, zero manual publish**.

`health.minN` · `health.p95WarnMs` · `health.usefulTurnWarnPct` ·
`health.feedbackQueueAgeWarnHours`.

One resolver, `resolveHealthPolicy.ts`, on the `resolveMemoryPolicy.ts` pattern
(ONE `fetchSystemParamRows` read serving all four keys, the one shared clamp).

---

### G4 · THE READ ENDPOINT

One gated handler, posture copied from `api/admin/usage-analytics.ts`:
`PERMISSIONS.TELEMETRY_READ_ALL` on every arm, pure read, no audit row, no
spans, days clamped. Returns the band series + Wilson intervals + the governed
thresholds that were applied.

* Every count via `exactCountOrThrow`.
* `null` for "not measured" reaches the response as `null`; the repository
  returning `null` maps to **503** with the honest message — the 1.3a seam
  (`usage-analytics.ts`'s `unmeasured(res)`), reused, not re-invented.
* Below `health.minN`, a rate ships **unqualified** with its interval — never a
  green or red verdict. The verdict itself is 1.4's job; this phase must not
  pre-compute a colour.

---

### G5 · THE COST SPLIT — two tables, two epistemic classes

**R1 (verified this session): the real/synthetic split is a TABLE BOUNDARY, not
a field.** `telemetry_events` has exactly two writers in the whole repo —
`stagesGovernance.ts:29` (the turn pipeline's `ctx.emit`) and `chat.ts:115` (the
quota-deny row). The synthetic injector, the golden runner, the replay lenses
and the eval canary never call `TelemetryRepository.record`. The injector runs
frame-only and writes `synthetic_runs` only. **So `telemetry_events` is already
real-user-only, structurally — do NOT add a synthetic filter or flag.**

**R2: synthetic spend is an ESTIMATE by construction.**
`ESTIMATED_TOKENS_PER_ROUTER_CALL = 400` is a documented constant because
`routeSemantica` surfaces no usage. Real spend is metered
(`telemetry_events.total_tokens` / `cost_estimate`).

Required: the two are **two rows, never one total**, and the synthetic one is
labelled an estimate in the payload itself — not only in a future UI caption. A
number whose class is only knowable from the surface that renders it has the
same defect 1.3a removed.

Read synthetic spend through the 1.3a-repaired path
(`SyntheticRunsRepository`) — never a fresh unpaginated query.

---

### G6 · DOCS, SEAL, RECORD

`api/cwf/_lib/persistence/**` drifts **Architecture Map** + **Runtime
Topology**; `api/admin/**` + `api/cwf/_lib/knowledge/**` drift **Governance
Model**; `api/cwf/_lib/replay/**` drifts **Agent Control Plane**.

Run `npm run reseal` — **never hand-write a hash or a rev** (L13). Bump
`docVersion` **rev 183 → rev 184** by hand, once. CHANGELOG entry + SKILL.md
lessons. `check:doc-drift` `[OK]` at HEAD.

---

## §4 · SELF-VERIFY (literal evidence, no prose claims)

1. G1: the consumer census (method + count + delta against the Architect's
   list), and a test proving **row-absent ⇒ `underpowered`** while
   **row-present-null ⇒ `unavailable`** — two distinct outcomes, two distinct
   assertions. A single test covering both is not proof they differ.
2. G2: the migration's double-apply idempotence output; the denominator proven
   on a fixture containing a `clarification_asked` turn with NO `turn_done` row
   — it must be counted. A denominator that only ever sees `turn_done` passes
   silently today and breaks the day A23 lands.
3. G2.3: `verifyGrants` output showing the new functions probed and 42501-denied
   — with the three-way classification honoured (42501=PASS, no-error=LEAK,
   PGRST202/other=INCONCLUSIVE-fail; never silent-green).
4. G3: the four params resolving from the CODE FLOOR pre-seed, with their
   sources named.
5. G4: one endpoint response showing a real `null` in an unmeasured position,
   and a 503 arm — plus a positive control that the 503 path can fire.
6. G5: real and synthetic totals rendered as two numbers, the synthetic one
   carrying its estimate marker in the payload. Grep proving zero synthetic
   filtering was added to any `telemetry_events` query.
7. `evalGate.ts` diff EMPTY · zero writes to `messages` · zero governed publishes.
8. `npx vitest run` green; new counts and the delta fully accounted, each new
   file named.
9. `typecheck:api` clean · `check:doc-drift` `[OK]` · `check:tenant-zero` `[OK]`.
10. `npm run test:rule26` green **first attempt**, and **report the flaky count
    explicitly** — seven `retries: CI ? 2 : 0` blocks are still live
    (E2E-RETRY-MASK-7), so "passed" and "passed without spending a retry" are
    different facts. Read it from the run's own summary; do not re-run.
11. Every FIX-SCOPE-TRUTH-1 extension listed by name.
12. Confirmation that `phase/m1f2a-honest-read-1` was deleted (§1 G0).

**STOP FOR REVIEW.** Push the branch, report the remote hash, **do not merge**
and **do not apply the migration** — the Operator applies it after the Architect's
RULE-25 review, in a separate fenced prompt.

---

## §5 · POST-DEPLOY PROOF READ (S63-1, named now)

One aggregate endpoint returning a series that matches a **hand-checked day** —
the design note's own F2 proof. Architect-performed against a READY production
deployment whose SHA contains the merge, deployment id named (L10).

The Architect additionally carries an open watch from 1.3a into this window:
**W-M1F2A-1** — the spend read now throws `INCOMPLETE` if rows are inserted
between its first and last page. It has never been exercised (the injector sits
at its ceiling from ~01:40Z onward, inserting nothing); it can only be seen in
the 00:00–02:00Z window. No owner work.

<!-- END · PHASE-M1F2B-DATA-LAYER-1-v1 -->
