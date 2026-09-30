card: NOTICE-M2-CARRY-METHOD-RULING-S164-3 (CARD-M2-HONEST-GRADING-S164-1-v2)
branch: phase/m2-honest-grading-s164-2
head: 37faf47a7fcec16e299050af0d83365a162ab3a4
parent: 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (origin/master)
report: docs/relay/M2-HONEST-GRADING-S164-1-AG3-report.md
ci: UNMEASURED no PR (K41 holds the slot, per ruling step 4)
status: PUSHED
One commit. listLastForCarry + CARRY_OUTCOME_FILTER (pre-M2 literal), sole caller stageClarify.ts:689; listRecentByConversation stays OFFERABLE (recall, memoryRetrieve.ts:407); askTurnUngraded removed; ask turns exempt from emptyOnlyWithFailures via ctx.askShown?.[0].
F7 F7b F7e F7f F7g F7h F7i F7j F7c green. Plants: carrier->listRecentByConversation -> F7f red; listRecentByConversation->CARRY -> F7i red; both reverted.
Gates: build(reseal=gate digests) typecheck rule24 migration-versions tenant-zero backend-names relayAudit report-schema self-test OK; 3 sandbox EPERM.
read relay_inbox at 2026-09-30T04:44:22Z, box empty

Bus row: id=1a551b77-a06a-42b2-8de0-a65c6e06685e (laneSlip DRIFT MATCH, 991 chars).
Also: PR 642 closed unmerged (SUPERSEDED comment). graft's callers view missed both instance calls of listRecentByConversation; git grep found them (named in the report).
