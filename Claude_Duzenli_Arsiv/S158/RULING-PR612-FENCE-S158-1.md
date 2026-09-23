<!-- relay-audit: v1 kind=notice -->
RULING-PR612-FENCE-S158-1

LANE: AG-1 (the window that owns PR 612; existing tab). This SUPERSEDES STEP 2 of NOTICE-PR612-GUARD-RED-S158-1.
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T09:34Z
AUTHORITY: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (G2 v4 is plan step 4); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. When your slip is written, stop.
SECRET NOTE: never print any environment value in any form.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## PREMISE
READ: your slip SLIP-ARMES-G2-KNOWLEDGE-AS-DATA-S156-1 (bus 2026-09-23T09:28:41Z): merge guard RED RENAME-SOURCE-OUTSIDE on api/cwf/__tests__/armesDomain.test.ts; adding it grows the fence and FENCE-GREW refuses; local build 5 gates green, suite 11119/0, typecheck:api clean, parity DIFFS 0.
MEASURED: 2026-09-23T09:34Z, git show of scripts/mergeGuard.mjs at master 2d7087bff1eda24b6224c2fbd9a9d987061dec7d on the Architect bridge: FENCE-GREW compares the head fence with the fence of the FIRST commit of the branch that carries a fence (mergeGuard.mjs:445-475); REOPENED fails a reopened PR (:487). So a second PR on the SAME branch fails the same way.

## RULING
1. The rename source is IN SCOPE: card v4 ORDER 0 includes "the tests of all of these", and armesDomain.test.ts is the test of backends/armes/*. Naming it in the fence is correct, not a widening of the card.
2. Mechanism: a FRESH branch phase/armes-g2-knowledge-as-data-s156-2 off origin/master. Cherry-pick your PR 612 commits in order; the commit that FIRST adds the report's FILE-FENCE carries the complete fence including the rename source (git cherry-pick -n on that one commit, edit the fence, commit). No force-push of any branch; the old branch stays untouched.
3. PROOF: git diff ce9efcbf50488b37cacb6b3d164fe803a2f30fb9 <new head> prints ONLY the fence line(s) in the report. Anything else: STOP.
4. Open the new PR, non-draft, auto-merge as before. Close PR 612 with one comment naming the successor PR. Never edit the merge guard.
5. Read CI at the new full head, a zero read twice; if the guard passes and build (24.x) goes red, print the failing test names and repair in the new branch.
6. Slip SLIP-RULING-PR612-FENCE-S158-1: new branch, full head, new PR number, the step-3 diff (stat), CI runs by name. Stop.
The three STOP sites (metric-authority-armes key; superset routing-hint row text) stay named in the report: they are DB changes for the Gemini operator, cut separately.

END · RULING-PR612-FENCE-S158-1
