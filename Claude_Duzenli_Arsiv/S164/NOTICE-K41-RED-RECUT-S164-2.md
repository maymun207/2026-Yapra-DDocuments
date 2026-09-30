<!-- relay-audit: v1 kind=notice -->
NOTICE-K41-RED-RECUT-S164-2

LANE: AG-1 (PR 643, head 53d76e6b67c679f7bc19ff934c41f388af8788ca)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:50Z
MEASURED (Architect, gh.sh actions/runs + jobs at the full head, 04:37Z): Build and Test FAILED — job "changes", step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)" = failure; jobs eval-canary, rule26, build SKIPPED (the code itself is UNMEASURED by CI); Auto-merge landing, report-schema, Relay corpus = success. No slip from you has reached the bus since 04:31Z.
DECISION: the PR slot goes to M2 NOW (AG-3's re-cut is prepped and green: phase/m2-honest-grading-s164-2 = 37faf47a7fcec16e299050af0d83365a162ab3a4). K41 follows M2.
AUTHORITY: register 145 (an open PR is never updated; a red PR is closed and carried to a fresh branch) · §12.12 (name the failing step and the skipped steps) · §13.11.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. NOW, first: `gh pr close 643 --comment "Closed: merge guard red at step 6 (see the VERDICT line in the next K41 report); carried to a fresh branch after M2 lands. NOTICE-K41-RED-RECUT-S164-2."` — do NOT delete the branch. Print `gh pr list --state open` → must be EMPTY after the close.
2. Read the merge-guard log of that run and QUOTE the `[merge-guard] VERDICT` line and the rule it names (e.g. NO-FENCE, FENCE-GREW, MERGE-HAND-EDIT) with the guard's own file:line (scripts/mergeGuard.mjs).
3. Repair on a NEW branch `phase/k41-router-knob-split-s164-2` from current master (print it): re-pick your ONE commit, fix exactly what the VERDICT names (most likely the report's FILE-FENCE block must list every changed path exactly once, incl. gate-regenerated files), re-run the guard locally if it can run (`node scripts/mergeGuard.mjs` as build.yml calls it) and quote its VERDICT GREEN.
4. Push; DO NOT open a PR (M2 holds the slot). Slip SLIP-K41-RECUT-S164-2 (bus + fallback S164/): VERDICT line quoted, fix, new 40-hex head, parent. If master moves (M2 lands) before your PR notice, the notice will say re-pick.
5. Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

END · NOTICE-K41-RED-RECUT-S164-2
