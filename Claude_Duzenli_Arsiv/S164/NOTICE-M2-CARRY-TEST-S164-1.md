<!-- relay-audit: v1 kind=notice -->
NOTICE-M2-CARRY-TEST-S164-1

LANE: AG-3 (working on CARD-M2-HONEST-GRADING-S164-1-v2)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:50Z
AUTHORITY: CARD-M2-HONEST-GRADING-S164-1-v2 (this notice ADDS one test and one report line; it changes no design) · scout-2 SCOUT-STATUS-REVIEW-A26-V11-S164-1 Δ-K9 (bus row 327f577b-a13d-4305-9d75-bc1cf4d5001c).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHY: scout-2 measured at master 1b2553c960317ab0cc0718e51dda8b7bc92bc112 that the stage-03 "answer a shown question" path — stageClarify.ts:677-704 readCarriedResolution → `repo.listRecentByConversation(conversationId, 1, taskId)` → `matchShownOptionDetailed(message, row.decision?.ask ?? null)`, reached at :2798 (frameRouting-gated) — reads through the SAME `.or(OFFERABLE_OUTCOME_FILTER)` as recall (EpisodesRepository.ts:550). So your D2 filter change also decides whether a user's reply to a shown ask can be resolved by its option. An ask turn that ran discovery calls is tool-bearing; if its outcome is not `outcomeHonest` (e.g. grounding did not run: groundingOk null), under D2 it stops carrying.

## STEPS
1. Measure first, before changing anything: on your branch, for an ask turn with discovery calls (fixture), print the class and `offerable` your D2 computes, and whether readCarriedResolution still returns the option. Quote the lines.
2. ADD test F7 (named): "an ask turn with discovery calls still carries its shown option to the next turn under M2's filter" — green required. If it cannot be green without widening D2, STOP and slip the measured bytes (class, signals, offerable) — the Architect rules; do NOT invent a second filter.
3. Report line: "stage-03 carried-ask read shares OFFERABLE_OUTCOME_FILTER (EpisodesRepository.ts:550); F7 result: <line>".
4. Continue the card as written (fence gains nothing if F7 passes; if it needs a test-only fixture file, it joins the fence and is named).

END · NOTICE-M2-CARRY-TEST-S164-1
