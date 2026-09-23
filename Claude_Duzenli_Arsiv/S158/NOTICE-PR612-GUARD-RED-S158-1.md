<!-- relay-audit: v1 kind=notice -->
NOTICE-PR612-GUARD-RED-S158-1

LANE: AG-1 (the window that owns PR 612; existing tab)
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T09:27Z
AUTHORITY: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (G2 v4 is plan step 4); OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. When your slip is written, stop.
SECRET NOTE: never print any environment value in any form.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## PREMISE
MEASURED: 2026-09-23T09:27Z, Architect bridge, GitHub API: PR 612 open, head ce9efcbf50488b37cacb6b3d164fe803a2f30fb9, 221 changed files, ahead 5 behind 0 of master 2d7087bff1eda24b6224c2fbd9a9d987061dec7d, auto-merge armed.
MEASURED: actions/runs?head_sha=<head>, read twice: total 4. Relay corpus, report-schema, Auto-merge landing success. Build and Test FAILURE in job changes, step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; jobs build, rule26 and eval-canary SKIPPED, so no test ran: the code is UNMEASURED by CI, neither green nor red.
UNMEASURED: the guard's failure class (OUTSIDE-FENCE, NO-FENCE, WHOLE-TREE-FENCE, FENCE-GREW, MERGE-HAND-EDIT, RENAME-SOURCE-OUTSIDE ...); the Architect's token cannot read job logs. You read it.
SELF-INVALIDATION: dies if PR 612's head is no longer the head above (print the new head and its runs, continue from STEP 2).

## STEPS
1. gh run view --log-failed on the Build and Test run at the head above; print the merge guard's own lines verbatim (class and paths).
2. Repair in YOUR branch only (12.12). If the class is a fence class, fix the FILE-FENCE block in your report so it names exactly the paths the card's ORDER 0 file set allows; a path the card does not allow is a STOP, name it. A rename whose source sits outside the fence: name it. Never widen the fence to the whole tree.
3. Push; read CI at the new full head, a zero read twice; no re-run of the old run (S55-1). If the guard passes and build (24.x) goes red, print the failing test names and repair in the same way.
4. Slip SLIP-PR612-GUARD-RED-S158-1: the guard lines, the cause in one line, the new head, CI runs by name. Stop.

END · NOTICE-PR612-GUARD-RED-S158-1
