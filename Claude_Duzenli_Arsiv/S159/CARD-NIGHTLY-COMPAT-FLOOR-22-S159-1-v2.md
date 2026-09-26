<!-- relay-audit: v1 kind=card -->
CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v2

LANE: AG-1 (fresh window; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-26T16:12Z (bridge clock, date -u in the command that wrote this file)
OWNER RULING: OWNER-RULING-S159-NIGHTLY-FLOOR-22-1, the owner's words "onay nightly 22/24" (2026-09-26 19:02 TSI) to the Architect's one path: the nightly compatibility matrix becomes [22.x, 24.x] and the two envProxy tests that need a Node API absent below v24.14 SKIP BY NAME on a Node without it. OWNER-RULING-S153-NO-ARMES-HARDCODE-1 stands.
SUPERSEDES: CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1, bus 2026-09-26T16:11:03Z: "GREEN once D1 and D2 are cut into a v2"). v2 = v1 plus exactly D1, D2 and N1, applied where each is named below; the scout's findings are credited to the scout (S112-YASA-1). Scout advisories carried, not defects: a 22.x patch below 22.18.0 would need --experimental-strip-types (setup-node resolves 22.x to the latest, v22.23.2 measured); the new 24.x compat leg re-runs a suite the coverage job already runs on 24.x (the owner ruled the matrix; it stands).
ADVERSARY GATE: EXEMPT for this re-cut only, the loop-breaking case of project instruction 12.1: v2 repeats v1's subject and applies the scout's own complete delta to GREEN (D1, D2, N1) and nothing else; OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; the S157 practice recorded in bootstrap v159 (RED with complete delta -> apply, EXEMPT).

```evidence:adversary
ADVERSARY: EXEMPT
ack: c90793ad-d4ff-4645-9513-33a287dbd94d
basis: project instruction 12.1 loop-breaking case + OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1; ack = SCOUT-STATUS-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1 (scout from_lane row, 2026-09-26T16:11:03Z), whose complete delta D1, D2, N1 this body applies verbatim
```
BRANCH: phase/nightly-compat-floor-22-s159-1 off origin/master · PUSH early · REPORT docs/relay/NIGHTLY-COMPAT-FLOOR-22-S159-1-AG1-report.md · PR: yes, non-draft, opened in THIS card.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.
Work in your own worktree for this branch (git worktree add off origin/master), never in the main worktree another lane uses.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-26T16:04Z | master |
| the nightly matrix is [20.x, 22.x] and its header names that as the compatibility obligation | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T16:04Z | matrix |
| the two failing envProxy tests hand the REAL node:http to installEnvProxy and assert a routing that needs http.setGlobalProxyFromEnv | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T16:04Z | tests |
| the API check and its version note live in scripts/envProxy.mjs | MEASURED: git show on origin/master, Architect bridge, 2026-09-26T16:04Z | api |
| every scheduled run since 2026-09-23 failed; 22.x fails exactly the two envProxy tests, 20.x those two plus fifteen of mergeGuard's thirty-one tests (type stripping absent on Node 20); both files were BORN in the window (PR 594, PR 597); lockfile unchanged | READ: SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1 (scout from_lane row, 2026-09-26T15:52:26Z), steps 2-5 | scout |
| the suite baseline is ONE skipped test on every Node (an unconditional it.skip in another file), vitest 4.1.9 has it.skipIf and the repo already uses it, and the default CI reporter prints skipped COUNTS per file but never a skipped test's NAME | READ: SCOUT-STATUS-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1 (scout from_lane row, 2026-09-26T16:11:03Z), step 2(a) | baseline |

```evidence:master
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35
```

```evidence:matrix
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:.github/workflows/nightly-compat.yml:10:#   (a) COMPATIBILITY -- the suite on 20.x and 22.x. Insurance against a dependency or
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:.github/workflows/nightly-compat.yml:49:      # Never fail-fast: when 20.x breaks we still want to know whether 22.x also broke.
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:.github/workflows/nightly-compat.yml:54:        node-version: [20.x, 22.x]
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:.github/workflows/nightly-compat.yml:82:      run: npm run test
```

```evidence:tests
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:api/cwf/__tests__/envProxy.test.ts:20:import http from 'node:http';
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:api/cwf/__tests__/envProxy.test.ts:97:    it("Node's own refusal is INVALID-CONFIG and its URL-bearing message is never read out", () => {
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:api/cwf/__tests__/envProxy.test.ts:147:    it('ROUTED: a host that cannot resolve is answered — so only the proxy could have answered it', async () => {
```

```evidence:api
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:scripts/envProxy.mjs:83:    if (typeof http?.setGlobalProxyFromEnv !== 'function') return ROUTING.API_ABSENT;
2a6f6781b1a4748aac5f5bc7b1d73136863b1c35:scripts/envProxy.mjs:99:            `[env-proxy] ${ROUTING.API_ABSENT}: a proxy variable is SET and this Node (${process.version}) has no ` +
```

```evidence:baseline
READ: SCOUT-STATUS-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1 step 2(a), run 36241355990 job logs
compat (22.x) suite line: "Tests 2 failed | 11182 passed | 4 expected fail | 1 skipped (11189)"; compat (20.x): "Tests 17 failed | 11167 passed | 4 expected fail | 1 skipped (11189)"; coverage (24.x): "Tests 11184 passed | 4 expected fail | 1 skipped (11189)"
the one baseline skip: api/cwf/__tests__/namedToolIsOffered.test.ts:286, unconditional it.skip; its per-file line "✓ api/cwf/__tests__/namedToolIsOffered.test.ts (15 tests | 1 skipped) 257ms"; grep -c of its name in the job log = 0 (names are not printed)
package-lock.json: vitest 4.1.9; node_modules/@vitest/runner/dist/tasks.d-DEYaIMIu.d.ts:840 "skipIf: (condition: any) => ChainableTestAPI<ExtraContext>;"; existing use api/admin/__tests__/benchArmor.test.ts:148
22.x runner node v22.23.2; mergeGuard.test.ts (31 tests) green there; Node doc: "v23.6.0, v22.18.0 — Type stripping is enabled by default."
prior non-default-branch dispatches in this repo: budget-fence on phase/budget-fence-200-180-s157-1 (success), vector-diagnose on phase/vector-path-probe-s142-1 (success)
```

```evidence:scout
READ: SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1, first line "MEASURE: b tests=17"
compat (22.x): Test Files 1 failed | 750 passed (751) · Tests 2 failed — envProxy.test.ts :: INVALID-CONFIG test (expected 'API-ABSENT' to be 'INVALID-CONFIG', envProxy.test.ts:102:27) and :: ROUTED test (expected 'API-ABSENT' to be 'ROUTED', envProxy.test.ts:151:27)
compat (20.x): Test Files 2 failed | 749 passed (751) · Tests 17 failed — the same 2 plus 15 of the 31 in mergeGuard.test.ts (22.x passed all 31, including those 15), each "Unknown file extension \".ts\"" from node 20.20.2 importing the merge-base's scripts/docDriftCore.ts
git diff --name-status 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27: A envProxy.test.ts · A mergeGuard.test.ts · A scripts/envProxy.mjs; package.json, package-lock.json, nightly-compat.yml unchanged
scout local run at master on Node 26: mergeGuard 31/31; envProxy 30/30 with loopback allowed
```

## PREMISE
MEASURED: the anchors above. READ: the scout anchor. UNMEASURED by the Architect: whether the 24.x nightly leg passes with 0 skipped (ORDER 4 measures it by dispatch); whether Node 22.x on the GitHub runner strips types without a flag (the scout measured v22.23.2 passing all 31 mergeGuard tests; stripping is default from v22.18.0; ORDER 4 re-measures).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## THE PROBLEM, IN PLAIN WORDS
The nightly compatibility run is the alarm the merge gate stopped carrying (its own header: "A RED HERE IS AN ALARM-CLASS EVENT"). It has been red on every scheduled run since 2026-09-23 and nobody read it. The scout measured the cause: nothing old broke; two new test files were born red on the older runtimes. envProxy's two tests exercise a Node API that exists only from v24.14 / v25.4 and assert a routing that cannot happen without it; the merge guard imports a TypeScript file through Node's own type stripping, which Node 20 cannot do at all. Node 20 therefore cannot run this repository's merge guard: the 20.x floor is already gone in fact, and keeping it in the matrix makes a permanent red that hides every future real regression. The owner ruled: the matrix says what is true, [22.x, 24.x]; the two API-bound tests skip BY NAME where the API is absent, and a skip is printed, never counted as a pass.

## FALSIFIER
After the change, a workflow_dispatch of nightly-compat on the branch ref shows, COUNTED BY FILE (scout D1: the suite baseline is 1 skipped on every Node, from namedToolIsOffered.test.ts, and it stays): compat (22.x) green, per-file line "envProxy.test.ts (30 tests | 2 skipped)", suite skipped = 3; compat (24.x) green, per-file line "envProxy.test.ts (30 tests)" with no skipped, suite skipped = 1 (the two tests RAN); coverage green. The two skipped tests are named from SOURCE, not from the log (scout D2: the default reporter never prints a skipped test's name): git show <head>:api/cwf/__tests__/envProxy.test.ts shows the two it.skipIf lines. A run where envProxy's two tests are skipped on 24.x is RED (the skip condition is not tied to the real API). A change to any other test, to scripts/envProxy.mjs, or to mergeGuard is outside this card: STOP and name it.

## ORDERS
1. .github/workflows/nightly-compat.yml: matrix node-version: [22.x, 24.x]. Rewrite the three comment lines that name 20.x (:10, :49-:50) so they name 22.x and 24.x and cite OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 and the measured reason (Node 20 cannot import a .ts file, so the merge guard cannot run there). Nothing else in the file changes: cron, fetch-depth, the coverage job, the "not run here on purpose" note all stay byte-identical.
2. api/cwf/__tests__/envProxy.test.ts: the two tests at :97 and :147 become conditional on the REAL module — it.skipIf(typeof http.setGlobalProxyFromEnv !== 'function') — with the skip reason in the test name or a sibling comment naming the API and "added v25.4.0, v24.14.0". No other test in the file changes; the 'a proxy set on a Node without the API is API-ABSENT' test (:72) and 'API absent prints a NAMED class and continues' (:90) keep covering the absent-API branch on every Node.
3. Full suite locally + typecheck:api; npm run build (all five gates); reseal only if check:doc-drift asks, in the same commit. Report with the complete FILE-FENCE in the FIRST commit. PR non-draft.
4. MEASURE by dispatch on the BRANCH ref (project instruction 5, S133 addition: a workflow_dispatch on a branch ref is not a master push and needs no spend approval): gh workflow run nightly-compat.yml --ref phase/nightly-compat-floor-22-s159-1; read the run by full head sha (twice if zero); quote per job: conclusion, the suite summary line (passed / failed / skipped) AND the envProxy.test.ts per-file line. Expected: 22.x "envProxy.test.ts (30 tests | 2 skipped)" with suite skipped 3; 24.x "envProxy.test.ts (30 tests)" with suite skipped 1; coverage green. Put the quotes in the report beside the two it.skipIf lines quoted from git show at your head (the names come from source; the reporter does not print them). STOP, no logic edit, slip, ONLY on a deviation from those file-level counts.
5. Slip SLIP-NIGHTLY-COMPAT-FLOOR-22-S159-1 (branch, full head, PR number, CI by full sha, guard VERDICT line, the dispatch run's per-job quotes). Do not merge. Stop.

## SHARED SURFACES
```scope
- .github/workflows/nightly-compat.yml
- api/cwf/__tests__/envProxy.test.ts (exactly the two tests at :97 and :147)
- docs/relay/NIGHTLY-COMPAT-FLOOR-22-S159-1-AG1-report.md
- public/architecture/manifest.json (reseal, same commit, only if doc-drift requires)
```

## DECISION RIGHTS
AG-1 chooses the exact skip wording and where the version note sits. The Architect decided: matrix [22.x, 24.x]; skip by name tied to the real API, never a version-number string compare; no change to scripts/envProxy.mjs or to mergeGuard; measurement by branch dispatch before the slip. You may refuse on evidence this card did not anticipate.
FORBIDDEN: no change to the coverage job or its floor; no change to build-test.yml; no test deleted; no backend, vendor or tenant name added; no merge; no adversary/scout post on your own head; no poll task, no cron; never print an environment value.

END · CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v2
