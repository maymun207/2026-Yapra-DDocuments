# CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v2

v2 SUPERSEDES v1 (2026-09-16T03:38Z). v1's text is carried whole below the STATUS block; v2 ADDS the measured state at 18:15Z and ONE reordering with its reason. Nothing in v1 is deleted.

## STATUS AT 18:15Z, MEASURED (master 2f404888c42c7394566ed9803148390d8e1bab73, production READY 17:40:52Z)

| item | state | evidence |
|---|---|---|
| P0-1 lanes rebooted | DONE | AG-4/AG-5 landed 555/568/569 in the morning |
| P0-2 vector engine | OPEN | VectorEngineUnreachableError on every witnessed turn (F-S140-VECTOR-ENGINE-UNREACHABLE-1); owner-side host item |
| CARD-NAMED-TOOL-IS-OFFERED | DONE | PR 571 (K1 ORDER cell hint, OWNER-RULING-S140-K1-ORDER-CELL-HINT-1); witness: quality offered with stickyAdded [] |
| registry reads paginated | DONE (unplanned, found by measurement) | PR 570; 2520 rows read as 500x5+20 |
| resolve every layer, ask at parent | DONE (unplanned, owner witness) | PR 572; "firin" -> two-line ask, labelSource self |
| P1-3 §9-3a wiring | DONE | PR 573 + AMENDMENT-1 carrier rule object!=SYSTEM; witnessed on production (turns a3ee6df3..., 8f825979...) -- diagnosis[]/decisions[]/blocking in stage 03 |
| ask option labels at parentless layers | IN FLIGHT | CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2 sealed to AG-4 18:01:58Z (F-S140-FACTORY-LAYER-ASK-LABELS-ARE-THE-LAYER-KEY-1) |
| P1-1 §9-1 baseline | NOT DONE -- see reordering | |
| P1-2 §9-2 turn_context | NOT DONE | |
| P1-4 cross-turn carrier | NEXT after the label card | F-S140-CROSS-TURN-CARRIER-ABSENT-1 |
| P1-5 GraphKb wiring | DEFERRED behind P1-4 -- see reordering | |
| t/b agent.param rows | NOT DONE (the wiring card set scores null, no rows -- deliberate, DECLARED carrier rule instead) | |

## REORDERING, WITH ITS REASON (one only)

v1 ordered §9-1 baseline -> §9-2 turn_context -> §9-3a wiring. The owner approved the wiring card FIRST by name (OWNER-APPROVAL-S140-A23-WIRING-FIRST-1) and it landed as PR 573. The baseline therefore measures the POST-wiring corpus; the pre-wiring number can still be produced by replaying the same corpus at master 4c6df852 (the fork point of 573) through routerAbLens -- the tree exists in git, so the "before" is recoverable, not lost. §9-1 stays owed.

P1-5 (GraphKb as ④'s search space) moves BEHIND P1-4 (cross-turn carrier): measured on 2026-09-16, the registry's own parentage (buildParentage, entity_registry columns) and entity_topology_edges agree on every line row (783/783, 0 conflicting), so wiring the graph changes no answer for the line layer today, while the missing cross-turn carrier loses the factory on every reply turn to an ask -- a defect the owner witnessed. The equipment layer (1725 edges, 0 registry rows) is where the graph will change answers; that is the trigger to pull P1-5 forward.

## WHAT THE WITNESSES SAY THE NEXT CARD IS
1. Label card lands (in flight).
2. P1-4 cross-turn carrier: last-resolution slice, table via Operator migration, written at flush, read at ② -- re-witness "firin" ask -> "FIRINUST" reply carries KB7.
3. §9-1 baseline on both trees (4c6df852 and the post-label master), reported as one number each.
4. Tool-selection observation (F-S140-TOOL-OFFERED-BUT-NOT-CHOSEN-1): measure before designing -- offered set versus called set over the day's ledgers; a gate only if the ratio is bad.

---
(v1 text, carried whole)

[v1 full text as in CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v1.md above]

END · CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v2
