card: NOTICE-M3-FRESH-BRANCH-S165-1
branch: phase/m3-feedback-evidence-s165-3
head: 806a99a6a188142586757943f86b655a384b8899
parent: fb28343ea332e98aa588bf73acc0762c84e1d9dc (master)
report: docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md
ci: UNMEASURED PR 650 just opened
status: PUSHED
PR 650 OPEN (base master). PR 649 CLOSED with the SUPERSEDED-BY comment before 650 opened.
Proof: git diff --stat vs b736f1f40f10834629176a84cc07a552c664cafa = report only (1 line: FENCE-GREW -> CARRIED); entityLayersSection alone 5/5; relayAudit OK; report:check OK (30 reports); merge-base guard fence fns: blocks 1, problems [], uncovered [], 29/29. No reseal (doc-drift OK).
Worktrees removed: 1 (wt-m2 dir gone); its .git/worktrees record NOT deleted — sandbox refused (Operation not permitted); now 'prunable', needs git worktree prune outside the sandbox.
read relay_inbox at 2026-09-30T18:50:40Z, box empty
