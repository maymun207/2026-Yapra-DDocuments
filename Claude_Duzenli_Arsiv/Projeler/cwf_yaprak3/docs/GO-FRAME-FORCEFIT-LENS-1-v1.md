<!-- relay-audit: v1 kind=go -->
# GO-FRAME-FORCEFIT-LENS-1 · v1 — merge authorization for lane AG-4 · QUEUE POSITION 4 (last)

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| branch tip 9c25496, +2; fence exact; zero migrations; zero `.agents` touches | READ: `git diff --name-only origin/master...<branch>` in Architect session | inline |
| side-by-side evidence per ruling: summary.json + summary-prefix-defect.json, same frozen `untilIso` | READ: `git show` both files | inline |
| first measurement: synthetic 11,058 measured; organic ZERO-POPULATION labelled refusal | READ: `git show <branch>:docs/relay/evidence/.../summary.json` | inline |
| AG4×AG3 intersection = ∅ | READ: `comm -12` over sorted diff lists | inline |
| full-suite verdict | NOT-READ | PR-head CI arbitrates (S37-2); STEP 1 reads it |

## STEP 0 — QUEUE (blocking)
You merge FOURTH and LAST. Do NOT start STEP 2 until the owner relays AG-3's
new `origin/master` SHA. STEP 1 may run now.

## STEP 1 — CI (blocking)
All runs on head `9c25496`: `completed`+`success`. `in_progress`/`null` is NOT
a pass. Red = STOP, name the job.

## STEP 2 — MERGE TURN (S95-1)
1. `git fetch origin --prune`; confirm master == the relayed SHA.
2. Rebase onto `origin/master`. You touched no `.agents` file, so the EXPECTED
   conflict set is EMPTY — any conflict at all = STOP and report the file list.
3. `npm run check:doc-drift` in the rebased tree. Your `api/cwf/_lib/replay/`
   files likely sit under the sealed globs, so RED-from-your-own-files is the
   expected branch here: S95-1 seal turn — read docVersion from `origin/master`
   LIVE (two siblings merged since your branch; never assume the number), take
   the next, `npm run reseal` + bump in the SAME commit, drift must return
   green. Green without a seal is also fine — follow what the gate says, not
   this prediction. REDRAW demand = STOP.
4. Re-run your own gate in the rebased tree and paste the verdict in your tail
   line: `npx vitest run api/cwf/__tests__/frameForceFitLens.test.ts`.
5. Merge `--no-ff` with the VERBATIM message below; push; keep the branch.
6. PR hygiene (wave standard): after push, close your own PR with
   `gh pr close <n> --comment "content merged into master by rebased --no-ff merge; head SHA stale after rebase"`.

## VERBATIM MERGE MESSAGE
merge: PHASE-FRAME-FORCEFIT-LENS-1 — the ruler for BUG-017: read-only, refuse-before-guess (synthetic 11,058 measured · organic zero-population labelled, not green; two instrument defects caught at birth and recorded side-by-side)

## AFTER PUSH
One line back through the owner: new `origin/master` SHA + the rev you pressed
(if any) + the step-4 vitest verdict. Your merge CLOSES the wave's build half;
the Operator package (migration 20260813090000 + live verifyGrants + the two
S63-1 reads + the paired zero-rows discriminators F-S96-CENSUS-ZERO-ROWS /
F-S96-SHADOW-ZERO-ROWS) is cut by the Architect on your SHA.

TAIL-ANCHOR: `git rev-parse origin/master` — paste its output as your final line.

## FALSIFIER
Void if: CI not green on 9c25496 · ANY rebase conflict (your expected set is
empty) · drift red after the seal turn · the evidence files' `untilIso` values
differ between summary.json and summary-prefix-defect.json in the merged tree.

<!-- END · GO-FRAME-FORCEFIT-LENS-1-v1 -->
