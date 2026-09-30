<!-- relay-audit: v1 kind=notice -->
NOTICE-M2-F7-RULING-S164-1

LANE: AG-3 (working on CARD-M2-HONEST-GRADING-S164-1-v2, stopped at NOTICE-M2-CARRY-TEST-S164-1 step 2)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:00Z
AUTHORITY: CARD-M2-HONEST-GRADING-S164-1-v2 · your STOPPED slip SLIP-CARD-M2-HONEST-GRADING-S164-1 (bus row 14c9ab64-69b5-4b35-b8bc-9f0b0b4f81f3) and report docs/relay/M2-HONEST-GRADING-S164-1-AG3-report.md at prep head 9b6715b07f71ab20542d4aa78fe8e07b6bafb23d. This notice RULES on the F7 stop; scout-2 reads the same ruling in parallel (ORDER-SCOUT-REVIEW-M2-F7-RULING-S164-1) and a RED from it arrives as a further notice before your PR opens.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## RULING — shape (b), narrowed to `offerable` only

Your stop was right and your measurement settles it. The ruling is NOT (a) (a second filter) and NOT (c) (an unfiltered carrier): an unfiltered carrier would read a failed reply turn as "the latest episode" and lose the ask the user is retrying against — the pre-M2 filter's skip of failed turns is behaviour to keep.

The ruling is (b), and it touches ONLY the stamped `offerable`, never `outcomeHonest` and never `procedureEligible`:

  offerable = class === 'clean' || outcomeHonest(outcome) || askTurnUngraded

  askTurnUngraded = the episode being written carries a non-null decision.ask (the same field readCarriedResolution reads)
                    AND outcome.signals.groundingOk === null   (grounding never ran — stageStream.ts:649 is the only writer)
                    AND class !== 'failed'

WHY this and nothing wider: (1) an ask turn's product is a question, not an answer, so "grounding did not run" is not-applicable, not dishonest; (2) pre-M2 these turns were offerable (class unproven, not failed), so this restores the pre-M2 behaviour exactly where M2 never meant to change it; (3) `procedureEligible` keeps the D2 truth table unchanged — an ask turn does not become a learnable procedure; (4) a failed ask turn stays not-offerable, same as pre-M2; (5) there is still ONE filter, the scout's literal, unchanged.

## STEPS
1. Measure first: confirm with graft that the ask is available at stamping time (the object memoryDistill stamps carries decision.ask). Quote the line. If it is NOT available there, STOP and slip the bytes — do not thread a new parameter without a ruling.
2. Implement askTurnUngraded as above, in the same module as the D2 split, as a named exported predicate; stamp `offerable` with it. Do not touch outcomeHonest, procedureEligible or OFFERABLE_OUTCOME_FILTER.
3. Tests (named, all green required):
   F7  — unchanged fixture: an ask turn with one answered discovery call carries its shown option (askOption = 'k-north').
   F7b — the same ask turn with class 'failed' (one failed discovery call, zero data) is NOT offerable and does not carry — pre-M2 parity.
   F7c — an answer turn (decision.ask null) with groundingOk null and one data-bearing success stays offerable=false — the M2 honesty change is NOT undone for answers.
   F7d — askTurnUngraded does not change procedureEligible for the F7 fixture (stays false).
   Planted fault: remove the decision.ask conjunct → F7c must go red; revert.
4. Report lines: "F7 ruling: shape (b) narrowed to offerable; F7/F7b/F7c/F7d: <lines>" and the planted-fault line.
5. Then continue the card as written. The PR still waits for M1 (PR 641) to land, per Δ14; rebase the prep onto the new master when it does (fresh branch from master if the base moved, never update an open PR).

END · NOTICE-M2-F7-RULING-S164-1
