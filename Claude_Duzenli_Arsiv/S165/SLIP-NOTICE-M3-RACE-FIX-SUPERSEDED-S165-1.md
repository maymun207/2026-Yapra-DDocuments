card: NOTICE-M3-RACE-FIX-SUPERSEDED-S165-1 (+ CI-RED-ENTITYLAYERS-RACE)
branch: phase/m3-feedback-evidence-s165-2
head: b736f1f40f10834629176a84cc07a552c664cafa
report: docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md
ci: UNMEASURED Build and Test on the head: changes FAILED, build/rule26 SKIPPED
status: STOPPED
PUSHED before I read the supersede (box read 18:13Z; notice 16:17Z): plain FF 72b912f7..b736f1f4, fix committed and gated; AG-1 had not pushed. Branch read twice = b736f1f4.
Measured: before fix alone 20/20, full suite 20/20 (not reproduced locally); plant (skip setReloadKey) RED, reverted; after fix alone 20/20, full 20/20. Cause GraphKbTab.tsx:337-339 + :312-319.
NEW RED: [merge-guard] FAIL FENCE-GREW (entityLayersSection.test.tsx beyond the first fence at 72b912f7) -> VERDICT RED. The race notice's fence growth is refused on an open PR. Pushing nothing; Architect rules.
Worktrees removed: 0 (branch did not move).
read relay_inbox at 2026-09-30T18:13:57Z, 1 row taken, now empty
