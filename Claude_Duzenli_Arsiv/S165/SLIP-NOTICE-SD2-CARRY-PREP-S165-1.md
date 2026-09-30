card: NOTICE-SD2-CARRY-PREP-S165-1 (prep, no PR)
branch: phase/sd2-brake-notice-grouped-count-s165-1
head: 2bea820041c6ccd02d722c5cc47cd7499ef7d1b0
report: docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md (+CARRY; relayAudit, report:check OK)
ci: UNMEASURED no CI read at this head (no PR). Local: build (reseal 5 tabs = gate got), doc-drift OK, typecheck, rule24 2405, tenant-zero 2357, backend-names OK; 5 suites incl. every burstBrakeMessage importer 76/76
status: PUSHED no PR
precondition: x2 master fb28343e, SD2 31e7cae3, PR 649 OPEN
carry: 3 commits cherry-pick -n onto master; conflicts only manifest -> master + reseal; ONE commit, parent = master; files = old head except stageTools.ts (master's +8/-4 beside intact SD2 hunk); FILE-FENCE = diff, 13 paths
worktrees: removed 5 of mine (wt-sd2, wt-ag4, wt-m1b, wt-m4a, wt-pl1); prune also cleared 11 dead records of other windows (dirs already gone)
read relay_inbox at 2026-09-30T15:39:17Z, box empty
