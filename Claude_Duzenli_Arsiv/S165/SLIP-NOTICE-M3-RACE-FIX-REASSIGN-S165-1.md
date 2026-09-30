card: NOTICE-M3-RACE-FIX-REASSIGN-S165-1
branch: phase/m3-feedback-evidence-s165-2 (NOT pushed by AG-1)
head: b736f1f40f10834629176a84cc07a552c664cafa (AG-3, parent 72b912f7..., pushed 21:13 per NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1)
report: docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md (AG-3's FENCE-GREW line)
ci: 36757025862 failure (PR 649 at b736f1f4, job changes): merge-guard VERDICT RED FENCE-GREW (fence adds entityLayersSection.test.tsx beyond first fence at 72b912f7); build skipped
status: STOPPED at pre-push re-check, head moved 72b912f7 -> b736f1f4. Race confirmed (GraphKbTab.tsx:339-341 batched bump, :312-319 passive effect, :444 banner ungated; M3 touched neither file). Local fix byte-identical to AG-3's awaited assertion: 20/20, plant red, full suite 775/775. Unpushed, discarded.
FINDING: guard forbids growing a PR's fence, so the ordered fence-grow is red on 649 by construction. Architect to rule.
worktrees: 1 removed, prune 0
