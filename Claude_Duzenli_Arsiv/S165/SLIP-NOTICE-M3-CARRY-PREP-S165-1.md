card: NOTICE-M3-CARRY-PREP-S165-1 (CARD-M3-FEEDBACK-EVIDENCE-S164-1-v2)
branch: phase/m3-feedback-evidence-s165-1
head: 0e457088d2e8245f5954778ce53ee09e479f9261
parent: 9eab2178c898868106b0b578c500a3c46b8bd409 (PR 648 head); master 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8
report: docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md
ci: UNMEASURED no PR (prep only; slot after 648 lands)
status: PUSHED
Picked 8e77c2b9822471627d0d3be94c9a2aa3e8fe4992 with cherry-pick -n; 5 conflicts. MemoryTab.tsx + memoryTab.test.tsx: Q-1 union, seams restored; every M4a line kept (the only - line vs 648 is M3's own signature). facts/baseline/manifest regenerated: reseal = gate digests; baseline Δ same as M3 (system only).
Gates: build OK, tsc app 0, rule24/tenant-zero/migration-versions/backend-names OK, relayAudit OK, 139 memory+M3 tests green; fence = diff vs 648 head, 1 block, 28/28.
read relay_inbox at 2026-09-30T14:11:03Z, box empty
