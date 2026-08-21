# CWF — L3 EVAL-CI Design Note · v1

<!-- cwf-L3-eval-ci-design-v1 · rev 1 · 2026-07-10 · Architect-lane artifact (NOT for AG).
     Diagnosis at origin/master 494b9ba (1746 tests / 168 files / docVersion rev 60,
     spine verified unmoved this session). Charter anchor: decision-surface inventory v4
     line "L3 EVAL-CI: golden set + N×lens×A/B runner + Wilson-CI thresholds as a
     publish/merge GATE" — the PUBLISH half shipped in L2; this note designs the MERGE
     (code-change) half. S30-3 definition-site anchors and S32-1 grep-verified commands
     observed throughout. -->

---

## §0 One-paragraph commitment

L3 EVAL-CI = a **post-deploy golden canary**: on every production deploy of `master`, a
GitHub Actions job triggers a **single-arm** golden batch inside the deployed app (published
segments, N reps per specimen over the EXISTING paired-replay substrate), pools empty-rate
and grounding-violation Wilson intervals, and compares them **longitudinally** against the
stored baseline canary (the latest completed run with a matching golden-set hash AND
promptRev). Verdict discipline is L2 verbatim: the job goes red **only** on a
distinguishable regression (candidate CI strictly worse); overlap = `underpowered:true`,
audited, green-with-annotation, never "safe". No LLM call, no conversation content, and no
data-access credential ever enters GitHub Actions — the runner lives app-side; CI receives
rates/counts/verdict JSON only (C9 posture preserved end-to-end). No DDL; the run record is
one more `replay_audit` row shape (`outcome.canary:true`).

---

## §1 Diagnosis at HEAD `494b9ba`

**What exists (code-verified this session, fresh clone):**

1. **L2 Layer-2 publish gate — LIVE.** `gate/goldenPublishContract.ts` is pure and
   server-verified; `api/admin/prompt-golden.ts` runs the paired (published-vs-draft)
   golden batch, quota-metered, persisting ONE `replay_audit` row
   (`outcome.golden:true`, pooled rates/counts/hash, never text). Prompt.segment
   publishes are gated NOW — the publish half of the charter line is done.
2. **`runGoldenBatch` (goldenRun.ts)** — sequential specimens, shared shrinking budget,
   `GOLDEN_MIN_REPS = 3` floor, `clampReps` ceiling, pooled two-axis Wilson
   (`empty`, `violation`), pure `goldenVerdict()` exported for contract testing.
3. **`wilsonInterval` lives in `pairedReplay.ts`** and is already reused; `strictlyWorse`
   / `separated` encode the verdict discipline in ONE place.
4. **Golden set is EMPTY** (store live, `goldenSet:absent` loud-skip arm standing). The
   owner's first mark flips the publish gate; the SAME event gives L3 its first tooth.
5. **CI today (`.github/workflows/build-test.yml`) is fully deterministic**: Node 20/22
   matrix `npm run build` (which ends in `check:doc-drift`) + `npm run test`, plus the
   `test:coverage` ratchet job. Script names grep-verified from `package.json` (S32-1).
6. **Replay dispatch is stub-fed for tools (C3)** — only the LLM provider call is live.
   A golden run therefore needs exactly the credentials the Vercel environment already
   holds (provider keys + Supabase). Nothing new must exist anywhere else.
7. **`replay_audit.outcome` is free-shape jsonb behind a redaction-honest repository** —
   a canary record is an additive outcome shape on the EXISTING surface, the exact
   precedent `prompt-golden` set. **No DDL ⇒ no Operator door in this phase.**
8. **`PERMISSIONS.REPLAY_RUN` is checker-only (super_admin).** There is no narrow role a
   machine identity could hold without a DB CHECK migration — a fact that shapes the
   trigger design below (§3.3).

**What is genuinely missing (the L3 gap):** nothing gates a **code** change against the
golden set. The L2 gate compares two *segment sets under one code version*,
contemporaneously. A merge to `master` can regress the prompt floor, a scorer, the
gateway, the turn pipeline — and today the only Wilson evidence would come from a manual
admin-triggered run. The charter's "merge GATE" half is unbuilt.

---

## §2 The determinism split (name the trap before it bites)

Per the project's recurring-trap rule, the split for "eval in CI":

- **Deterministic / CI-native:** the verdict rule, thresholds, contract arms, lens code.
  These are already pinned by the vitest suite that CI runs on every PR and push. **L3
  adds definition-site threshold constants and longitudinal-verdict pins to that suite —
  and nothing else — to the PR plane.** A PR can never trigger token spend.
- **Stochastic / app-native:** anything that dispatches an LLM. It may NEVER run on a
  GitHub runner:
  1. it would put a **data-access credential** (Supabase service key, provider keys) in
     GitHub secrets — a secret-perimeter expansion with incident-class blast radius;
  2. golden specimens are **factory conversation content** — recorded turns must never
     leave the app boundary; CI may see rates/counts only (C9);
  3. provider hiccups would flake merges — a nondeterministic merge gate is a lie.

The committed consequence: **the spend runs app-side; CI only triggers and reads the
verdict.** "Thresholds in CI" means the *decision* (red/green + annotation) surfaces in
CI, not that the *evaluation* executes there.

---

## §3 Committed architecture

### 3.1 The canary run (single-arm, longitudinal)

A paired A/B is meaningless for a code deploy — the old code is gone, both arms would run
the same binary. The honest comparison is **temporal**:

- **Run:** golden set × `reps` (floored at `GOLDEN_MIN_REPS`) under the **published**
  segment set (resolved through the production `resolvePromptSegments` chain — no drafts,
  no lab), same sequential-budget discipline as `runGoldenBatch`. Pool
  `empty` and `violation` counters across specimens exactly as today.
- **Persist:** one `replay_audit` row — `outcome = { canary:true, completed, pooled
  counts, wilson intervals' inputs, goldenSetHash, promptRev, gitSha, verdictVsBaseline,
  baselineRunId|null, tokensTotal, repsPerSpecimen }`. Rates/counts/hashes only, never
  text. `message_id` sentinel `'canary'` (the `'golden'` precedent).
- **Compare:** load the **baseline** = latest completed canary row where
  `goldenSetHash` AND `promptRev` both match the new run. Recompute both arms' Wilson
  intervals from stored pooled counts and feed the EXISTING `goldenVerdict()` — zero new
  statistics code, the discipline literally cannot drift from L2's.

**Baseline matching rules (the honesty core):**

| Condition | Behavior |
|---|---|
| No prior matching canary | `baseline:absent` — loud note, run persists and BECOMES the baseline, CI green-with-annotation |
| `goldenSetHash` differs | same as absent: the set changed, arms aren't comparable — new baseline epoch |
| `promptRev` differs | **advisory only, never blocks**: the segment delta was already Wilson-gated at publish (L2); blaming a code deploy for it would double-count. Verdict recorded, new baseline epoch starts |
| Match + `regression` | the ONLY red |
| Match + `underpowered` | green, `underpowered:true` in the row AND the CI annotation — never phrased as "safe" |
| Match + `non_regressing` | green |
| Golden set EMPTY | `goldenSet:absent` — **green** with the standing loud note; a red here would block master on a toothless gate |
| Run incomplete (budget abort / failed specimen) | persists with `completed:false`, never becomes a baseline, CI **red with named reason** (an under-sampled canary certifies nothing — the L2 contract's own words) |

### 3.2 The endpoint

`api/admin/eval-ci.ts` (new, gated): POST, runs the canary, returns the redaction-safe
verdict JSON. It reuses `loadGoldenSpecimenSet` (fail-loud family behavior verbatim:
unavailable store → 503, DB error → 500, empty → the loud-absent 200).

**Frequency/spend fence without DDL:** before running, count this calendar month's
`canary:true` rows in `replay_audit`; at/above `EVAL_CI_MONTHLY_RUN_CAP` (RULE-1 constant,
env-overridable, default sized to ~2 deploys/day) → 429 with a named reason, CI
**green-with-alarm-annotation** (a spend fence must not silently block master; the alarm
is the audit-or-alarm arm). Per-run spend stays under the existing
`REPLAY_TOKEN_BUDGET` clamp.

### 3.3 The trigger (the credential decision)

`REPLAY_RUN` is checker-only and role additions need a DB CHECK migration — so **no user
JWT and no machine user**. Instead: the endpoint accepts a dedicated
**`EVAL_CI_TRIGGER_SECRET`** header, timing-safe-compared against the env value
(env-only rule; Vercel env + GitHub Actions secret are the sanctioned stores). This is a
*trigger* secret, not a data credential: its full blast radius on leak is bounded,
capped, audited spend (the monthly fence + per-run budget) returning rates/counts — an
incident class categorically below any key currently held anywhere. The run's audit
actor is a fixed `'eval-ci'` sentinel (attribution without identity theater).
`authed()`/capability gating stays byte-untouched for every human path; the shared-secret
arm exists ONLY on this one endpoint and rejects loudly (reason-only, value never echoed
— the ADR-007 rejection posture).

### 3.4 The CI job

New job `eval-canary` in `build-test.yml`, `on: push` to `master` only (**never
pull_request — previews must not spend and share the production DB**):

1. Poll the deployed app's SHA-echo (the endpoint returns `VERCEL_GIT_COMMIT_SHA`) until
   it equals `${{ github.sha }}` — **no Vercel token in GitHub**; the app self-reports.
   Timeout (15 min) → red with named reason (the deploy didn't land — a legitimate red).
2. POST the canary trigger; parse the verdict JSON.
3. Exit nonzero ONLY on `verdict:'regression'` or `completed:false`; annotate
   (`::notice`/`::warning`) every other arm verbatim (`underpowered`, `baseline:absent`,
   `goldenSet:absent`, quota-fence 429).

Automation-first holds: the Architect reads the same truth from Vercel logs and the
`replay_audit` row; no manual verification step exists for anyone.

---

## §4 Small-N honesty (the register's explicit demand)

With the owner's realistic first set (3–5 specimens × 3 reps = 9–15 scored reps/arm),
Wilson intervals at n≈12 span roughly [0, 0.35] even on a zero count — **nearly every
early verdict will be `underpowered`**. The design states this openly: the gate's teeth
grow monotonically with the golden set (n = specimens × reps pools across the set), it
never blocks waiting for the ~20 curation, and `underpowered` is always written as
"cannot distinguish — audited", never "no regression". `GOLDEN_MIN_REPS` stays the floor;
raising canary reps above it is an env knob (`EVAL_CI_REPS`, clamped by the existing
`clampReps`) whose cost scales linearly and visibly in `tokensTotal`.

---

## §5 What L3 is NOT (scope fence)

- **No DDL, no migration, no Operator door** — `replay_audit` additive outcome shape only.
- **No per-PR spend, ever.** The PR plane gains only deterministic pins + RULE-1
  threshold constants.
- **No rollback automation.** A red canary is a **signal**; acting on it (halt/rollback/
  progressive promotion) is L5's charter. Building the actuator here would be scope creep
  into progressive delivery.
- **No new statistics.** `goldenVerdict`, `wilsonInterval`, `strictlyWorse`, `separated`
  are consumed, not reimplemented.
- **No lens changes.** A1/A2/A3 stay byte-identical; the canary consumes their existing
  aggregate counters through the paired-replay substrate.

---

## §6 Hidden traps, named

1. **Preview deploys share production env** — a `pull_request` trigger would spend tokens
   and write audit rows from unreviewed code. Fence: master-push only + the SHA-echo
   convergence check (a preview can never echo the master SHA the job is waiting for).
2. **The empty-set arm must be GREEN.** Red-on-absent would let a toothless gate block
   master and train everyone to ignore red. The loud annotation is the pressure.
3. **Double-counting segment deltas.** A publish between two canaries changes promptRev;
   comparing across it blames the deploy for a gated edit. Hence the promptRev match key
   and the advisory downgrade (§3.1).
4. **Baseline poisoning by incomplete runs.** `completed:false` rows never become
   baselines — otherwise one budget abort would widen the baseline CI and mask the next
   real regression.
5. **Trigger-secret scope drift.** The shared-secret arm must be structurally unable to
   reach any other endpoint — it lives in `eval-ci.ts` only, never in `adminGuard`.
   A future "let's reuse it" is the incident; the phase prompt will pin a test asserting
   `adminGuard` is byte-identical.
6. **Flake asymmetry.** A provider outage mid-canary yields `completed:false` = red. That
   is CORRECT (certifies-nothing discipline) but will occasionally red a healthy deploy;
   the named reason string must distinguish `budget-abort` / `specimen-error` /
   `provider-failure` so a re-run decision takes seconds, and the job supports manual
   `workflow_dispatch` re-trigger without a new push.

---

## §7 Phase decomposition

**ONE phase — `PHASE-L3-eval-ci-canary-v1`** (gated AG prompt, authored after
ratification):

- **G1** RULE-1 constants (`EVAL_CI_MONTHLY_RUN_CAP`, `EVAL_CI_REPS`,
  `EVAL_CI_SHA_POLL_TIMEOUT_MS`) in `replay/config.ts` + pure `runCanaryBatch` (single-arm
  pooling, reuse of arm counters) + pure `decideCanaryVerdict` (baseline matching table
  §3.1 verbatim) — contract-tested against every table row.
- **G2** `api/admin/eval-ci.ts` (trigger-secret arm, timing-safe, SHA echo, monthly
  fence, audit row, fail-loud golden reads) + `ReplayAuditRepository` additive canary
  reads (latest-matching-baseline query, monthly count).
- **G3** `build-test.yml` `eval-canary` job + `workflow_dispatch` + annotation arms.
- **G4** Pins: adminGuard byte-identity, publish-contract byte-identity, goldenVerdict
  reuse (no reimplementation grep), C9 no-text-in-outcome, secret never echoed.
- Self-verify: grep-verified commands only (S32-1) — `npm run test`,
  `npm run check:doc-drift`, `npm run typecheck:api`; evidence gates literal (the CI job
  visible green on a master push with the `goldenSet:absent` annotation, since the set is
  empty today).

**Deploy-time smoke (Architect, zero manual):** first master push after merge — Claude
reads the Actions result + the Vercel log line + the `replay_audit` canary row. When the
owner's first mark lands, the NEXT canary exercises the real-teeth arm and the golden
prod-smoke micro-TD rides the same event.

<!-- END · cwf-L3-eval-ci-design-v1 · rev 1 · 2026-07-10 -->
