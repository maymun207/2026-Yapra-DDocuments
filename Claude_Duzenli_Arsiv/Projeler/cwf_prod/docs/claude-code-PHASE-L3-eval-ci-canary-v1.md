# PHASE L3 — EVAL-CI CANARY (post-deploy golden canary + CI verdict surface) · v1

<!-- claude-code-PHASE-L3-eval-ci-canary-v1 · rev 1 · 2026-07-10 · AG-lane artifact.
     Ratified design: cwf-L3-eval-ci-design-v1 (Architect-lane; do NOT go looking for it —
     everything binding is embedded HERE verbatim). Anchor: origin/master 494b9ba
     (1746 tests / 168 files / docVersion rev 60). NO DDL, NO migration, NO Operator door
     in this phase. -->

## 0 · HARD PRE-FLIGHT (STOP on any failure — report, do not improvise)

```bash
cd <workspace> && rm -rf cwf_yaprak && git clone https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # EXPECT 494b9ba113095d2fff33b17c1ed268740aa6808d — if moved, STOP and report
npm ci --no-audit --no-fund
npm run test                       # EXPECT green, 1746 tests / 168 files
npm run typecheck:api              # EXPECT green
```
Branch: `feat/l3-eval-ci-canary`. Merge at the end `--no-ff` (squash BANNED) with the
verbatim message in §6.

## 1 · WHAT THIS PHASE BUILDS (one paragraph)

A **post-deploy golden canary**: on every production deploy of `master`, a GitHub Actions
job calls a new trigger-secret-gated endpoint that runs the golden specimen set
**single-arm** (published segments, N reps) through the EXISTING replay engine, pools
empty/violation Wilson counters, compares them **longitudinally** against the latest
matching stored canary baseline using the EXISTING `goldenVerdict()`, persists one
`replay_audit` row (`outcome.canary:true`, rates/counts/hashes ONLY), and returns a
redaction-safe verdict JSON. The CI job goes red ONLY on a distinguishable regression or
an incomplete run. No conversation content and no data-access credential ever reaches
GitHub.

## 2 · CONSTRAINTS (violating any one fails the phase)

- **C-A NO DDL / NO migration.** `replay_audit` additive outcome shape only.
- **C-B BYTE-IDENTITY pins:** `api/cwf/_lib/adminGuard.ts`,
  `api/cwf/_lib/knowledge/gate/goldenPublishContract.ts`,
  `api/cwf/_lib/knowledge/governance.ts`, `api/cwf/_lib/replay/pairedReplay.ts`,
  `api/admin/prompt-golden.ts`, `api/admin/replay.ts` (still FROZEN — the standing
  micro-TD does NOT open here) — `git diff 494b9ba..HEAD -- <path>` MUST be empty for
  each.
- **C-C ONE verdict rule.** `goldenVerdict` / `wilsonInterval` / their helpers are
  IMPORTED, never reimplemented. Exactly ONE definition of each in the tree (grep-pin).
- **C-D C9 redaction:** the canary outcome and the endpoint response carry
  rates/counts/hashes/ids only — NEVER reply text, tool text, or specimen content.
- **C-E Secrets:** the trigger secret value is NEVER logged, echoed, or asserted-by-value
  anywhere (tests use injected fakes); rejection messages are reason-only (the ADR-007
  posture). No new env value is committed anywhere.
- **C-F NO quota-ledger contact:** `api/admin/eval-ci.ts` MUST NOT import
  `UserQuotasRepository` (the ledger is user-keyed; the canary has no user — its fences
  are the monthly run-count cap + the per-run token budget).
- **C-G FK honesty:** the audit row's `actor_user_id` is `null` (the column is
  `uuid references auth.users` — a string sentinel would fail the insert and the insert
  path only ALARMs). Machine attribution rides `outcome.actor: 'eval-ci'`.
- **C-H The PR plane never spends:** the new workflow job MUST be unreachable from
  `pull_request` events.

## 3 · GATED SUB-PHASES

### G1 — Pure core (constants + canary batch + verdict)

**`api/cwf/_lib/replay/config.ts`** — add (RULE 1, exported, JSDoc'd like the file's
existing style):
- `EVAL_CI_MONTHLY_RUN_CAP` (env `CWF_EVAL_CI_MONTHLY_RUN_CAP`, default `60`): max canary
  runs per calendar month; at/above → the endpoint refuses with 429 (a spend fence, not
  an error).
- `EVAL_CI_REPS` (env `CWF_EVAL_CI_REPS`, default `GOLDEN_MIN_REPS`, passed through
  `clampReps` then floored at `GOLDEN_MIN_REPS` — same double-bound as `runGoldenBatch`).
- `EVAL_CI_BASELINE_SCAN_LIMIT` (no env, `20`): how many recent canary rows the baseline
  search scans.

**`api/cwf/_lib/replay/goldenSpecimens.ts`** — add pure
`goldenSetHashOf(ids: string[]): string` = sha256 hex over the SORTED ids joined with
`'\n'` (order-insensitive by construction; `node:crypto`).

**`api/cwf/_lib/replay/canaryRun.ts`** (new) — the single-arm batch + pure verdict:

- `runCanaryBatch(request, deps?)`: request = `{ specimenIds, reps?, missPolicy?,
  segments: PromptSegments, tokenBudget? }`. Per specimen SEQUENTIALLY, mirror
  `pairedReplay.ts`'s **arm-A invocation exactly** (definition site — lines ~193-200):
  `runReplayExperiment({ messageId, reps, missPolicy, perturbationTier: 'none',
  promptSegments: request.segments }, undefined, { tokenBudget: remaining })` where
  `remaining` starts at `min(REPLAY_TOKEN_BUDGET, request.tokenBudget ?? Infinity)` and
  shrinks by each run's `aggregate.tokens.total`. Exhausted budget / thrown specimen /
  aborted run ⇒ `completed:false` (the `runGoldenBatch` discipline verbatim). Pool ONE
  arm's counters `{ emptyCount, scoredReps, violationReps, checkedReps, tokens }` across
  specimens; per-specimen digest = counts only. DI seam like `GoldenRunDeps`
  (`runSingle` injectable; production = `runReplayExperiment`).
- `export interface CanaryPooled { emptyCount; scoredReps; violationReps; checkedReps; tokens }`.
- `decideCanaryVerdict(baseline: CanaryPooled | null, current: CanaryPooled,
  baselineMeta: { promptRevMatch: boolean } | null)` — PURE, returns exactly one of:
  - `{ kind: 'baseline:absent' }` when `baseline === null`;
  - `{ kind: 'advisory:promptRev-changed', verdict }` when `baselineMeta.promptRevMatch === false`
    (verdict still computed + recorded, NEVER blocks — the segment delta was already
    Wilson-gated at publish);
  - `{ kind: 'compared', verdict, underpowered }` otherwise — where `verdict` comes from
    the EXISTING `goldenVerdict()` fed
    `{ empty: { baseline: wilsonInterval(b.emptyCount, b.scoredReps), candidate:
    wilsonInterval(c.emptyCount, c.scoredReps) }, violation: { … violationReps/checkedReps } }`
    and `underpowered = verdict === 'underpowered'`.

**Tests (G1):** every row of this table pinned against `decideCanaryVerdict` +
`runCanaryBatch` (fake `runSingle`):

| Case | Expected |
|---|---|
| no baseline | `baseline:absent` |
| promptRev mismatch | `advisory:promptRev-changed`, verdict present, never `regression`-as-block |
| current strictly worse on empty axis (CIs separated) | `compared` / `regression` |
| current strictly worse on violation axis | `compared` / `regression` |
| overlapping CIs | `compared` / `underpowered:true` |
| separated, current better | `compared` / `non_regressing` |
| budget exhausted mid-batch | `completed:false`, remaining specimens marked, counters honest |
| specimen throws | `completed:false`, error named, batch continues |
| `goldenSetHashOf` | deterministic + order-insensitive + distinct sets ⇒ distinct hashes |

### G2 — Repository reads + the endpoint

**`ReplayAuditRepository`** — TWO additive reads (existing redaction posture: never
select content, outcome digest only):
- `countCanaryRunsSince(sinceIso: string): Promise<number>` — count rows
  `message_id = 'canary'` AND `created_at >= sinceIso` (rides the existing
  `replay_audit_message_idx`).
- `listRecentCanaryRuns(limit: number)` — `run_id, outcome, created_at` for
  `message_id = 'canary'` ordered `created_at desc`, `limit` rows. Baseline selection
  happens in code, NOT in SQL.

**`api/admin/eval-ci.ts`** (new). RULE-1 consts at top (the `build-info.ts` single-consumer
precedent): `EVAL_CI_TRIGGER_SECRET_ENV = 'EVAL_CI_TRIGGER_SECRET'`,
`EVAL_CI_HEADER = 'x-eval-ci-secret'`, `export const CANARY_AUDIT_MESSAGE_ID = 'canary'`,
`const CANARY_ACTOR = 'eval-ci'`.

Auth arm (NO `adminGuard` import — C-B):
1. env unset/empty → `503 { error: 'eval-ci disabled: EVAL_CI_TRIGGER_SECRET is not configured' }`
   (graceful-off, loud, value class never named beyond the env NAME).
2. header missing or length differs or `crypto.timingSafeEqual` (over utf8 buffers,
   length-guarded first) fails → `401 { error: 'eval-ci: invalid or missing trigger secret' }`
   — reason-only, NEVER echoing anything received.

**GET** → `200 { commitSha }` where `commitSha = process.env.VERCEL_GIT_COMMIT_SHA?.trim() || null`
(non-secret provenance — the `build-info.ts` documented class). ZERO side effects.

**POST** → the run:
1. Golden set via `loadGoldenSpecimenSet()` — the fail-loud family verbatim:
   `ReplayUnavailableError` → 503; other → 500 with error NAME; empty →
   `200 { verdict: 'goldenSet:absent', note: <the standing loud note>, commitSha }`,
   ZERO spend, NO audit row.
2. Monthly fence: `countCanaryRunsSince(<first instant of the current UTC month>)`; at/
   above `EVAL_CI_MONTHLY_RUN_CAP` → `429 { error: 'eval-ci monthly run cap reached',
   cap, used }` — NO run, NO row.
3. Segments: `const published = await resolvePromptSegments()` (published>floor, NO lab,
   NO drafts — the canary arms with production truth only).
4. `initObservability()`; `runCanaryBatch({ specimenIds, reps: EVAL_CI_REPS,
   missPolicy: REPLAY_DEFAULT_MISS_POLICY, segments: published.segments,
   tokenBudget: REPLAY_TOKEN_BUDGET })`.
5. Baseline: `listRecentCanaryRuns(EVAL_CI_BASELINE_SCAN_LIMIT)` → first row (already
   newest-first) whose outcome has `canary === true && completed === true &&
   goldenSetHash === <this run's> ` — promptRev match decided SEPARATELY and passed as
   `baselineMeta.promptRevMatch` (a promptRev-mismatched newest match is still THE
   baseline row; the verdict just downgrades to advisory).
6. Persist ONE audit row: `actor_user_id: null` (C-G), `run_id: randomUUID()`,
   `message_id: CANARY_AUDIT_MESSAGE_ID`, reps fields mirroring `prompt-golden.ts`'s
   arithmetic, `miss_policy: REPLAY_DEFAULT_MISS_POLICY`, `outcome = { canary: true,
   actor: CANARY_ACTOR, completed, pooled, goldenSetHash, promptRev:
   published.promptRev, gitSha: commitSha, decision: <the decideCanaryVerdict result>,
   baselineRunId: <run_id | null>, skippedSpecimens (ids only, if any), tokensTotal,
   repsPerSpecimen }` — counts/hashes/ids ONLY (C-D).
7. `forceFlushObservability()` before responding (RULE 27).
8. Respond `200 { commitSha, runId, decision, completed, pooled, tokensTotal,
   baselineRunId, goldenSetHash, promptRev }`.

**Tests (G2):** env unset → 503 · bad/missing/length-mismatch header → 401, response
string contains NEITHER the configured nor the presented value · GET echoes SHA, zero
repo/audit calls · POST empty set → the absent arm, zero spend · cap reached → 429, no
run · happy path with injected deps: row persisted with `actor_user_id: null` +
`message_id:'canary'` + outcome shape exactly as above · baseline selected by
goldenSetHash with promptRev-mismatch → advisory decision recorded · incomplete run
persists but a later run does NOT select it as baseline · JSON.stringify of every
response/outcome in the tests contains no specimen text fixture marker (plant a sentinel
string in the fake specimen content and assert its absence — C-D pin).

### G3 — The CI job

`.github/workflows/build-test.yml`: add `workflow_dispatch:` to `on:` and ONE new job
`eval-canary`:
- `if: github.event_name == 'push' || github.event_name == 'workflow_dispatch'` (C-H —
  the workflow also fires on `pull_request`; this line is the fence).
- Step 1 — secret presence: if `${{ secrets.EVAL_CI_TRIGGER_SECRET }}` is empty →
  `::warning::eval-canary skipped: EVAL_CI_TRIGGER_SECRET not set in repo secrets` and
  exit 0 (green — a toothless gate never reds master).
- Step 2 — SHA convergence poll: `curl` GET `https://<PROD_HOST>/api/admin/eval-ci` with
  header `x-eval-ci-secret`, every 20s, total budget 15 min (values as yaml env at the
  job top with a comment naming them the RULE-1 home for CI-side knobs). GET returns 503
  → stop polling, `::warning::eval-ci disabled server-side`, exit 0. `commitSha` equals
  `${{ github.sha }}` → proceed. Timeout → **exit 1** with
  `::error::deploy for ${{ github.sha }} never became live` (a legitimate red).
  `PROD_HOST` = a yaml env const at the job top (the production domain — read it from
  `vercel.json`/repo docs; if genuinely absent from the repo, use a
  `${{ vars.EVAL_CI_PROD_HOST }}` repository variable and SAY SO in the report).
- Step 3 — trigger: `curl` POST, parse with `jq`. Exit **1** ONLY when
  `.decision.kind == "compared" && .decision.verdict == "regression"` OR
  `.completed == false` (both with `::error::` naming the reason verbatim from the
  response). HTTP 429/503 → `::warning::` + exit 0. Any other non-200 → exit 1
  (unexpected). All other decisions → exit 0 with the arm annotated verbatim:
  `underpowered` ⇒ `::warning::canary underpowered — cannot distinguish, audited (never "safe")`;
  `baseline:absent` / `advisory:promptRev-changed` / `goldenSet:absent` ⇒ `::notice::`
  with the kind string.
- The job never uploads artifacts and never prints response fields beyond the
  rates/counts JSON (which is redaction-safe by construction).

### G4 — Pins (tests or greps, all in-suite where possible)

- `git diff 494b9ba..HEAD --` empty for every C-B path (run in self-verify, paste output).
- Grep: exactly ONE `function goldenVerdict` and ONE `function wilsonInterval` in the
  tree; `eval-ci.ts` imports them (transitively) rather than defining any interval math.
- Grep: `UserQuotasRepository` absent from `eval-ci.ts` (C-F).
- Grep: `adminGuard` absent from `eval-ci.ts` (the trigger-secret arm must be structurally
  unable to leak into human paths, and vice versa).
- Test: the endpoint module exports `CANARY_AUDIT_MESSAGE_ID === 'canary'` and it differs
  from `GOLDEN_AUDIT_MESSAGE_ID`.

## 4 · SELF-VERIFY (paste literal outputs — S32-1: these commands are grep-verified
against package.json at authoring time)

```bash
npm run test               # green; total tests STRICTLY > 1746, files STRICTLY > 168
npm run typecheck:api      # green
npm run lint               # green
npm run build              # green END-TO-END (includes gen:arch-facts + check:doc-drift)
git diff 494b9ba..HEAD -- api/cwf/_lib/adminGuard.ts api/cwf/_lib/knowledge/gate/goldenPublishContract.ts api/cwf/_lib/knowledge/governance.ts api/cwf/_lib/replay/pairedReplay.ts api/admin/prompt-golden.ts api/admin/replay.ts   # EXPECT empty
grep -rn "function goldenVerdict" api/ shared/ src/ | wc -l    # EXPECT 1
grep -n "UserQuotasRepository\|adminGuard" api/admin/eval-ci.ts # EXPECT no matches
```
If `check:doc-drift` fails on the touched sources: `npm run reseal` + bump docVersion
**rev 60 → 61** (the script prints the reminder), commit as part of the branch.

## 5 · REPORT CONTRACT

Deviations DISCLOSED individually with grounds (never silently "improved"); every
self-verify block pasted verbatim; remote branch pushed; merge NOT done until the
Architect's RULE-25 review passes — then merge `--no-ff` with §6 verbatim and report the
remote merge hash.

## 6 · MERGE MESSAGE (verbatim — S30-2)

```
Merge feat/l3-eval-ci-canary: PHASE L3 — EVAL-CI CANARY (post-deploy single-arm golden canary on the L2 seam [runCanaryBatch mirrors the paired arm-A invocation, sequential shrinking budget, GOLDEN_MIN_REPS floor; decideCanaryVerdict PURE — longitudinal Wilson via the EXISTING goldenVerdict, baseline matched on goldenSetHash with promptRev mismatch downgraded to advisory (publish-gated deltas never double-counted); baseline:absent and goldenSet:absent are GREEN loud arms; completed:false never becomes a baseline] + api/admin/eval-ci.ts [trigger-secret header, timing-safe, reason-only reject, value never echoed — ADR-007 posture; GET = SHA echo zero-side-effect, POST = run; actor_user_id NULL by FK honesty, attribution outcome.actor:'eval-ci'; monthly run-count fence EVAL_CI_MONTHLY_RUN_CAP via the canary message_id index, NO quota-ledger contact; C9 rates/counts/hashes only] + eval-canary job in build-test.yml [push/dispatch only — unreachable from pull_request; SHA convergence poll; red ONLY on distinguishable regression or completed:false, every other arm green-with-annotation, underpowered never phrased safe] + byte-identity pins [adminGuard, goldenPublishContract, governance, pairedReplay, prompt-golden, replay.ts still FROZEN]; no DDL, no Operator door; rev 60→61 reseal)
```

<!-- END · claude-code-PHASE-L3-eval-ci-canary-v1 · rev 1 · 2026-07-10 -->
