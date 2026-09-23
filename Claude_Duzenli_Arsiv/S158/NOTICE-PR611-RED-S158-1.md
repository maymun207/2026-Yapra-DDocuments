<!-- relay-audit: v1 kind=notice -->
NOTICE-PR611-RED-S158-1

LANE: AG-2 (the window that owns PR 611; existing tab)
fanout: personalized (one lane, one body)
FROM: Architect, S158, bridge clock 2026-09-23T07:21Z
AUTHORITY: S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (shared clone guard v2 is plan step 2).
NO POLL OR CRON TASK. When your slip is written, stop.
SECRET NOTE: never print any environment value in any form.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## PREMISE
MEASURED: 2026-09-23T07:21Z, Architect bridge, GitHub API: PR 611 open, head fb6e56741740d62fe73e6856bc63fa7f08b82a88, ahead 2 behind 0 of master 2d7087bff1eda24b6224c2fbd9a9d987061dec7d, auto-merge armed, mergeable_state blocked.
MEASURED: actions/runs?head_sha=<head>, read twice: total 4. Auto-merge landing and report-schema success. RED: Build and Test, job build (24.x), step 10 "Run tests" failure (steps after it skipped, rule26 skipped). RED: Relay corpus, job relay corpus (grammar v1), step 5 "Relay corpus assertion" failure.
UNMEASURED: the failing test names and the corpus assertion text; the Architect's token cannot read job logs (proxy 403 on the log redirect). You read them.
SELF-INVALIDATION: dies if PR 611's head is no longer fb6e56741740d62fe73e6856bc63fa7f08b82a88 (print the new head and its runs, then continue from STEP 2).

## STEPS
1. Read both failing job logs at the head above (gh run view --log-failed). Print the failing test names and the exact corpus assertion line(s).
2. Repair in YOUR branch only (the author fixes its own artefact, project instructions 12.12). If the corpus failure is your report's grammar, fix the report; if a test failed, fix the code or the test the card named. Nothing outside the card's file set; if the fix needs a file outside it, STOP and name it.
3. Push; read CI at the new full head by its forty-hex sha, a zero read twice; no re-run of an old run (S55-1).
4. Slip SLIP-PR611-RED-S158-1: the failing names, the cause in one line each, the new head, CI runs by name. Stop.

END · NOTICE-PR611-RED-S158-1
