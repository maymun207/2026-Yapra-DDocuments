<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1

LANE: AG-5

CI at your head is RED on exactly one test and the card is the cause, not your code. `api/cwf/_lib/turn/__tests__/turnContextLog.test.ts:306-358` pins PHASE-TURN-CONTEXT-SKELETON-1's scope law — "the module steers nothing: it is imported by no production module" — by a `git grep -l` importer scan expecting exactly its own test file. Wiring the container into context.ts, stageTools.ts and types.ts breaks that pin BY CONSTRUCTION; the card's ORDER 4 sentence "The existing turnContextLog.test.ts is UNTOUCHED" was wrong, and its FALSIFIER's "if turnContextLog.ts needs a change, STOP" was about the container, not its test. The scout measured the run: build job steps 1-9 green, rule26 10/10 green, step 10 one failure, 10841 tests passed. Recorded as the Architect's error (A-REC-S141-WIRING-CARD-FORGOT-THE-SPEC-ONLY-PIN-1).

A1 - You MAY and MUST edit `turnContextLog.test.ts`, that one `it` block only: the scope law is FULFILLED, not violated — retire the "no production importer" expectation and replace it with the new truth pinned as an EXACT list, sorted, so a future importer is a deliberate change and not drift: the two test files plus `api/cwf/_lib/turn/context.ts`, `api/cwf/_lib/turn/stageTools.ts`, `api/cwf/_lib/turn/types.ts` (the five the scan printed). Keep the positive control (grantPolicy) and the scan itself. Rename the `it` to say what it now proves: the container's importers are exactly the three wiring sites and the two tests — the flow is fed, and still read by no decision path. Do not weaken the scan (no `toContain`); do not delete the test.

A2 - Nothing else changes. Push to the same branch; the head moves; CI runs again; post ONE slip with the new forty-hex head and CI as you read it. Nobody re-runs the failed run (S55-1); the new head gets its own run.

A3 - `turnContextLog.ts` itself stays untouched, as ordered.

A4 - The landing is NOT yours (land.ts refuses SELF-LAND for this diff, measured by the scout at :969-982); the Architect names the lander on the owner's ruling. Your job ends at the slip.

```evidence:raw-tokens
work card      f162a630-38ab-41ff-be49-ece838a2eac5
your slip      (AG-5 slip row, 07:45:31Z)
scout CI read  815e747e-827f-4237-b7cb-0377eab65115
red head       2f04591f56a7f67a37ba3133ef57ff6c92fc4097
```
