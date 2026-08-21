# PHASE CANARY-CAP-1 — governed smoke-subset eval-canary (gate repair)

<!-- claude-code-PHASE-CANARY-CAP-1-v1 · rev 1 · 2026-07-14 · Architect: Claude (S44)
     Profile: FULL (eval/L3 surface — never lightened). Queue position: jumps ahead of
     OUTPUT-BUDGET-1 merge (CI-green is a merge precondition and eval-canary is red on master). -->

**PLATINUM compliance:** both new knobs are governed L1 params editable in the admin Rules
tab and snapshotted per run; the code declarations are the outage floor; zero manual env
steps are required for the gate to function; the seed script is machine-run (S43-4).

---

## 0 · Why (diagnosis, verified from code + prod logs)

CI run #166 on master `74f9ae9`: eval-canary red with `completed:false, tokensTotal:508438`.
Root cause is arithmetic, not code: `api/admin/eval-ci.ts:148` passes
`tokenBudget: REPLAY_TOKEN_BUDGET` (= env `CWF_REPLAY_TOKEN_BUDGET` || **500_000**,
`replay/config.ts:38`) and runs the **FULL golden set** synchronously. The set has grown to
GOLDEN-BATCH scale (~25k tokens/chunk, dozens of specimens) and per-rep spend grew
(maxToolRounds v2=16); one specimen ≈ 170k/rep × 3 reps ate the whole budget, the rest were
skipped, and the batch honestly reported `completed:false` ("an incomplete run never becomes
a baseline" — canaryRun.ts docblock; the flag is working as designed, the gate is mis-sized).
Raising the budget alone hits the next wall: serverless duration (157s spent on ~1 specimen;
the full set would need 20+ min). `baseline:absent` in the same JSON is the separate,
documented-GREEN arm (goldenSetHash changed as the set grew) — NOT the failure.

**Design:** the canary becomes a **deterministic smoke subset** of the golden set. Full-set
assurance already lives in the async GOLDEN-BATCH publish gate (Layer 2); the canary's job
is post-deploy regression smoke — the module's own `advisory:promptRev-changed` philosophy.

## 1 · Hard pre-flight (evidence in the report, verbatim outputs)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master          # MUST print 74f9ae9133a34cf4e6cd8a2d0be2d18707bae5bb — else STOP, report
grep -n "seed:agent-params" package.json                      # MUST exist (verified by Architect)
grep -n "REPLAY_TOKEN_BUDGET" api/admin/eval-ci.ts            # line ~148 — the call site you will change
grep -n "GOLDEN_RUN_TOKEN_CEILING" api/cwf/_lib/knowledge/reference/agentParams.ts   # the decl pattern to mirror (~L51, ~L125)
python3 - <<'EOF'
import json; print(json.load(open('vercel.json')).get('functions',{}))
EOF
# MUST show NO entry for api/admin/eval-ci.ts yet — you will add one
```

Branch: `canary-cap-1` off `74f9ae9`. Work on this branch only.

## 2 · Binding constraints

1. **Eval-gate machinery byte-identical:** `canaryRun.ts` (`runCanaryBatch`,
   `decideCanaryVerdict`), `goldenRun.ts` (`goldenVerdict`), `pairedReplay.ts`
   (`wilsonInterval`), the staging engine, stage order, and schema interpreter are NOT
   touched. The entire change lives in: `reference/agentParams.ts` (+2 decls), ONE new
   resolver file, `api/admin/eval-ci.ts` (composition layer), `vercel.json`, tests.
2. **C1 LAW:** zero writes to `messages` from any path here.
3. **No migration.** Params ride the existing governed rows (`agent.param` kind).
   No Operator visit this phase.
4. **DB-first / code-floor:** resolution = db > code-decl floor; **no lab tier, no env
   tier** — mirror `resolveGoldenRunPolicy.ts` EXACTLY (same header rationale applies:
   a spend fence is an ops-plane concern; a session may never widen it; the code decl IS
   the outage floor). Every source passes the one shared `clampParamValue`.
5. **Born-loud (S41-1):** the resolved values are stamped in THREE places — the console
   log line, the audit row outcome, and the response JSON.
6. **Secrets:** none touched, none printed.
7. **Longitudinal honesty:** `goldenSetHash` recorded on the audit row and used for
   baseline matching MUST be computed over the SUBSET actually run
   (`goldenSetHashOf(subset)`), never over the full set — a baseline must describe what
   ran. Subset membership change ⇒ `baseline:absent` (documented GREEN, loud) — this is
   correct behavior, do not "fix" it.

## 3 · Gated sub-phases (complete each; self-verify before the next)

### C-1 — Param declarations (reference/agentParams.ts)
Add to `AGENT_PARAM_KEYS`:
- `EVAL_CI_SPECIMEN_CAP: 'quota.evalCiSpecimenCap'`
- `EVAL_CI_TOKEN_BUDGET: 'quota.evalCiTokenBudget'`

Add two decls mirroring the `GOLDEN_RUN_TOKEN_CEILING` row shape exactly
(`stage: '00'`, `sessionTweakable: false`):
- cap: `value: 3, type: 'number', min: 1, max: 5` — decl comment MUST name the duration
  wall: one specimen ≈ 155–170s at 3 reps; maxDuration 800 bounds the cap at 5.
- budget: `value: 2_000_000, type: 'number', min: 500_000, max: 5_000_000`.

### C-2 — Resolver (new file `api/cwf/_lib/knowledge/resolveEvalCiPolicy.ts`)
`resolveEvalCiPolicy(opts?): Promise<{ specimenCap: number; tokenBudget: number;
capSource: string; budgetSource: string }>` — the `resolveGoldenRunTokenCeiling` pattern
verbatim (one `fetchSystemParamRows` read serves BOTH keys; never throws; floor on
outage/missing). `resolveParamValue`'s returned source tag is surfaced (`source:db` /
`source:floor` — reuse whatever literal the existing resolver vocabulary uses; do NOT
invent new strings).

### C-3 — Composition wiring (api/admin/eval-ci.ts + vercel.json)
1. After `loadGoldenSpecimenSet()`: `const picked = [...goldenSet].sort().slice(0, specimenCap)`
   — deterministic sorted-prefix pick (the loader returns curation order; the sort makes
   the pick membership-stable).
2. `runCanaryBatch({ specimenIds: picked, ..., tokenBudget })` — governed budget replaces
   the raw `REPLAY_TOKEN_BUDGET` at THIS call site only (the constant keeps its other
   roles; note `runCanaryBatch` still clamps by `min(REPLAY_TOKEN_BUDGET, request)` —
   see C-3.5).
3. `goldenSetHash = goldenSetHashOf(picked)` (constraint 7). Audit row additionally
   records `fullSetSize`, `pickedSize`, `specimenCap`, `tokenBudget`, `capSource`,
   `budgetSource` inside the existing outcome jsonb (additive keys only).
4. ONE console line before the batch (the PARAM-GOV-1 lesson — the Architect reads Vercel
   logs): `console.log('[EvalCI][Params] cap=%d (%s) budget=%d (%s) fullSet=%d picked=%d', …)`.
5. **Budget ceiling seam (BINDING; a sanctioned one-line amendment to constraint 1):**
   `runCanaryBatch` currently clamps `remaining = Math.min(REPLAY_TOKEN_BUDGET,
   request.tokenBudget ?? Infinity)` — a governed 2M would be silently re-clamped to 500k,
   a swallowed override. Change EXACTLY that one line in `canaryRun.ts` to
   `let remaining = request.tokenBudget ?? REPLAY_TOKEN_BUDGET;` with the comment:
   *"CANARY-CAP-1: the caller's budget is governed+clamped upstream (resolveEvalCiPolicy,
   [500k,5M]); the config constant remains the no-request floor."* Rationale (Architect,
   decided — do not redesign): the C5 server bound this clamp protected is now the governed
   clamp itself; widening `REPLAY_TOKEN_BUDGET`'s default instead would silently 10× every
   other replay consumer. `decideCanaryVerdict` and everything below stays byte-identical.
   Guard the seam: add a grep-based structural test (mirror the existing structural-scan
   style) pinning that `runCanaryBatch` is invoked ONLY from `api/admin/eval-ci.ts`, so an
   ungoverned caller can never ride the widened budget.
6. `vercel.json` functions: add `"api/admin/eval-ci.ts": { "maxDuration": 800 }`.

### C-4 — Tests (extend existing suites; new files where the suite maps demand)
- Decl clamps + floor resolution for both keys (mirror the goldenRunPolicy tests).
- Sorted-prefix determinism: shuffled input ⇒ identical pick; cap ≥ set size ⇒ full set.
- Hash-over-subset: audit/baseline hash = `goldenSetHashOf(picked)`, ≠ full-set hash when capped.
- Budget seam: `runCanaryBatch` honors a request budget ABOVE the old 500k constant
  (regression pin for C-3.5) + the no-request floor still equals `REPLAY_TOKEN_BUDGET`.
- Structural: single-caller scan for `runCanaryBatch`.
- eval-ci endpoint test: response + audit outcome carry the six new fields.
- `adminLegibility` footgun does not apply (no new admin .tsx) — state so in the report.

## 4 · Self-verify (literal evidence in the report)

1. `git rev-parse HEAD` on `canary-cap-1` + `git diff --stat 74f9ae9..HEAD` — file list
   MUST be exactly: `reference/agentParams.ts`, `resolveEvalCiPolicy.ts` (new),
   `api/admin/eval-ci.ts`, `api/cwf/_lib/replay/canaryRun.ts` (ONE line + comment),
   `replay/config.ts` (ONLY if a comment was added; no value change), `vercel.json`,
   test files. Anything else = STOP and explain.
2. Paste the ONE-line canaryRun.ts diff verbatim.
3. Targeted suites green locally; then push and report the PR URL — **unsharded CI on the
   PR head is the arbiter (S37-2/S43-2)**; do not claim done from a local/sharded run.
4. Expected PR-CI eval-canary behavior: the PR's deploy contains the fix; params are not
   yet seeded ⇒ code floors (cap 3 / budget 2M) apply ⇒ subset runs complete ⇒
   `completed:true` with `baseline:absent` (GREEN, loud). If eval-canary is red on the PR,
   STOP and report the response JSON verbatim.

## 5 · After Architect GO (do not pre-execute)

Merge is `--no-ff` with the Architect's verbatim message (delivered at GO — S30-2). Then
AG runs `npm run seed:agent-params` TWICE (S43-4; second run MUST print the idempotent
no-op evidence — S31-1) and pastes both outputs. Master CI on the merge commit green =
the gate is repaired; the Architect then reads the `[EvalCI][Params]` line from Vercel
logs as the final live evidence.

<!-- END · claude-code-PHASE-CANARY-CAP-1-v1 · rev 1 · 2026-07-14 -->
