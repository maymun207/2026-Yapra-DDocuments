<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1

LANE: scout (scout-1 window, the one that measured the nightly; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T16:04Z
OWNER RULING: OWNER-RULING-S159-NIGHTLY-FLOOR-22-1, the owner's words "onay nightly 22/24" (2026-09-26 19:02 TSI).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1, embedded below between the BEGIN/END markers; the same bytes live in the doc repo at Claude_Duzenli_Arsiv/S159/CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1.md, sha256 5f2e72a0f00511d2c03f093c5bd9824c0e4a289c89332ea9199f29aa0562d84f. Your own measurement (SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1) is the card's scout anchor; check that the card quotes it faithfully.

## PREMISE
READ: master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 (GitHub API commits/master, Architect bridge, 2026-09-26T16:04Z).
SELF-INVALIDATION: dies if master moves by a commit touching .github/workflows/nightly-compat.yml or api/cwf/__tests__/envProxy.test.ts before you read; then print the commit and STOP.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. Print git ls-remote origin refs/heads/master (full 40-hex). Extract the card bytes between the markers to a file; sha256 must equal the value above (print it). Run node --import tsx scripts/cardPreflight.ts --check <file>; print every check.
2. Hostile questions, each with quoted output:
   (a) Does it.skipIf exist in the vitest version pinned in package-lock.json (quote the version and the API), and does a skipped test print its name in the CI log format npm run test uses (quote a skipped line from any existing run, or say none exists)?
   (b) Does Node 22.x on ubuntu-latest strip types WITHOUT a flag for the merge guard's spawn (quote the 22.x mergeGuard result from the run you already read, and Node's own doc line for when --experimental-strip-types became default)? If 22.x needs a flag at some patch level, the card's matrix claim is fragile: say so with the version.
   (c) Is anything in ORDERS 1-2 already built (a skipIf in envProxy.test.ts, a 24.x leg anywhere)? grep and quote.
   (d) Can gh workflow run --ref <branch> dispatch nightly-compat.yml from a NON-default branch (the file carries workflow_dispatch; GitHub requires the workflow file to exist on the ref)? Quote the doc line or a prior dispatch in this repo's runs (event=workflow_dispatch, any ref).
   (e) Does removing 20.x from the matrix delete any user-visible product function (OWNER RULE: none may be removed)? Answer with what 20.x proves today: quote the 20.x mergeGuard error line.
3. Verdict: GREEN first line exactly
   ADVERSARY-VERDICT: GREEN card=CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1 sha256=5f2e72a0f00511d2c03f093c5bd9824c0e4a289c89332ea9199f29aa0562d84f
   or RED with each defect by file:line and the change that would make it GREEN.
FORBIDDEN: read-only. No status post, no edit, no dispatch, no poll task, no cron. Never print an environment value.
REPLY (on the bus, scout_reply): SCOUT-STATUS-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1

LANE: AG-1 (fresh window; one card per window)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-26T16:04Z (bridge clock, date -u in the command that wrote this file)
OWNER RULING: OWNER-RULING-S159-NIGHTLY-FLOOR-22-1, the owner's words "onay nightly 22/24" (2026-09-26 19:02 TSI) to the Architect's one path: the nightly compatibility matrix becomes [22.x, 24.x] and the two envProxy tests that need a Node API absent below v24.14 SKIP BY NAME on a Node without it. OWNER-RULING-S153-NO-ARMES-HARDCODE-1 stands.
ADVERSARY GATE: NOT lifted. New subject: this card goes to the scout first (project instruction 12.1); the evidence:adversary block below is filled from the scout's GREEN row before dispatch.

```evidence:adversary
ADVERSARY: PENDING
ack: (scout GREEN row id, filled before dispatch)
basis: new subject, scout review required (12.1)
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
| every scheduled run since 2026-09-23 failed; 22.x fails exactly the two envProxy tests, 20.x those two plus fifteen mergeGuard tests (type stripping absent on Node 20); both files were BORN in the window (PR 594, PR 597); lockfile unchanged | READ: SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1 (scout from_lane row, 2026-09-26T15:52:26Z), steps 2-5 | scout |

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

```evidence:scout
READ: SCOUT-STATUS-MEASURE-NIGHTLY-COMPAT-S159-1, first line "MEASURE: b tests=17"
compat (22.x): Test Files 1 failed | 750 passed (751) · Tests 2 failed — envProxy.test.ts :: INVALID-CONFIG test (expected 'API-ABSENT' to be 'INVALID-CONFIG', envProxy.test.ts:102:27) and :: ROUTED test (expected 'API-ABSENT' to be 'ROUTED', envProxy.test.ts:151:27)
compat (20.x): Test Files 2 failed | 749 passed (751) · Tests 17 failed — the same 2 plus 15 in mergeGuard.test.ts, each "Unknown file extension \".ts\"" from node 20.20.2 importing the merge-base's scripts/docDriftCore.ts
git diff --name-status 9aba71fe2cbad0c53f3996d01b8991e5bbe40ed4 628e9ccf9632b4d7c2e8943a84c9ba42b8d86a27: A envProxy.test.ts · A mergeGuard.test.ts · A scripts/envProxy.mjs; package.json, package-lock.json, nightly-compat.yml unchanged
scout local run at master on Node 26: mergeGuard 31/31; envProxy 30/30 with loopback allowed
```

## PREMISE
MEASURED: the anchors above. READ: the scout anchor. UNMEASURED by the Architect: whether the 24.x nightly leg passes with 0 skipped (ORDER 4 measures it by dispatch); whether Node 22.x on the GitHub runner strips types without a flag (the scout's CI reading says 22.x passed all 15 mergeGuard tests, so yes at that runner image; ORDER 4 re-measures).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## THE PROBLEM, IN PLAIN WORDS
The nightly compatibility run is the alarm the merge gate stopped carrying (its own header: "A RED HERE IS AN ALARM-CLASS EVENT"). It has been red on every scheduled run since 2026-09-23 and nobody read it. The scout measured the cause: nothing old broke; two new test files were born red on the older runtimes. envProxy's two tests exercise a Node API that exists only from v24.14 / v25.4 and assert a routing that cannot happen without it; the merge guard imports a TypeScript file through Node's own type stripping, which Node 20 cannot do at all. Node 20 therefore cannot run this repository's merge guard: the 20.x floor is already gone in fact, and keeping it in the matrix makes a permanent red that hides every future real regression. The owner ruled: the matrix says what is true, [22.x, 24.x]; the two API-bound tests skip BY NAME where the API is absent, and a skip is printed, never counted as a pass.

## FALSIFIER
After the change, a workflow_dispatch of nightly-compat on the branch ref shows: compat (22.x) green with EXACTLY 2 skipped and their names in the log; compat (24.x) green with 0 skipped (the two tests RAN); coverage green. A run where the two tests are skipped on 24.x is RED (the skip condition is not tied to the real API). A change to any other test, to scripts/envProxy.mjs, or to mergeGuard is outside this card: STOP and name it.

## ORDERS
1. .github/workflows/nightly-compat.yml: matrix node-version: [22.x, 24.x]. Rewrite the three comment lines that name 20.x (:10, :49-:50) so they name 22.x and 24.x and cite OWNER-RULING-S159-NIGHTLY-FLOOR-22-1 and the measured reason (Node 20 cannot import a .ts file, so the merge guard cannot run there). Nothing else in the file changes: cron, fetch-depth, the coverage job, the "not run here on purpose" note all stay byte-identical.
2. api/cwf/__tests__/envProxy.test.ts: the two tests at :97 and :147 become conditional on the REAL module — it.skipIf(typeof http.setGlobalProxyFromEnv !== 'function') — with the skip reason in the test name or a sibling comment naming the API and "added v25.4.0, v24.14.0". No other test in the file changes; the 'a proxy set on a Node without the API is API-ABSENT' test (:72) and 'API absent prints a NAMED class and continues' (:90) keep covering the absent-API branch on every Node.
3. Full suite locally + typecheck:api; npm run build (all five gates); reseal only if check:doc-drift asks, in the same commit. Report with the complete FILE-FENCE in the FIRST commit. PR non-draft.
4. MEASURE by dispatch on the BRANCH ref (project instruction 5, S133 addition: a workflow_dispatch on a branch ref is not a master push and needs no spend approval): gh workflow run nightly-compat.yml --ref phase/nightly-compat-floor-22-s159-1; read the run by full head sha (twice if zero); quote per job: conclusion, the vitest summary line (passed / failed / skipped) and, for 22.x, the two skipped test names. Put the three quotes in the report. If 24.x shows any skipped or 22.x shows a count other than 2 skipped: STOP, no logic edit, slip.
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

END · CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-NIGHTLY-COMPAT-FLOOR-22-S159-1-v1
