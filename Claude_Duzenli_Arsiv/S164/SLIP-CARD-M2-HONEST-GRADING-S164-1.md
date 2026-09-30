card: CARD-M2-HONEST-GRADING-S164-1-v2 + NOTICE-M2-CARRY-TEST-S164-1
branch: phase/m2-honest-grading-s164-1-prep
head: 9b6715b07f71ab20542d4aa78fe8e07b6bafb23d
report: docs/relay/M2-HONEST-GRADING-S164-1-AG3-report.md (on the prep ref)
ci: UNMEASURED no PR; prep sits on M1 head (PR 641 not landed)
status: STOPPED
F7 RED, notice step 2: ask turn + 1 discovery call -> class=unproven offerable=false groundingOk=null (no grounding on a clarification turn) -> reply carried.read=empty askOption=null. Pre-M2 filter: same F7 green. Ruling needed; no second filter built.
D1-D5 built; F1-F6 green; build/typecheck/tenant-zero/backend-names/rule24/migration-versions OK; reseal digests = gate's; 3 planted faults -> 11 reds, reverted.
re-probe delta: UNMEASURED on production - Operator query: count tools per backend whose tool_experience positives would be zero after excluding empty answers
AG-3 claimed 8ae6c3f3a2896f4200286399e29c3a58592f444f, no FW001.
read relay_inbox at 2026-09-30T03:54:28Z, box empty

Bus row: id=14c9ab64-69b5-4b35-b8bc-9f0b0b4f81f3 (laneSlip DRIFT MATCH, 1007 chars).

F7 measured bytes (the notice asked for them verbatim):
[F7-MEASURE] class=unproven offerable=false signals={"surfacedEmpty":false,"silentFinish":false,"answerUnbacked":false,"groundingOk":null,"toolFailures":0,"absenceWithoutEnumeration":null,"fetchedNotDrawn":false,"empties":0,"dataBearingSuccesses":1,"emptyOnlyWithFailures":false}
[F7-MEASURE] carried.read=empty askOption=null askMatch=unread
Control (pre-M2 filter string): Tests 1 passed.

Candidate shapes for the ruling (named, NOT built): (a) the carried-ask read keeps the class-only filter — a second filter, forbidden by the notice; (b) offerable accepts groundingOk === null on a clarification turn — widens D2; (c) the ask carrier stops reading through the offerable filter because it reads decision.ask, not a recall — a carrier design change.
