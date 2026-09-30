<!-- relay-audit: v1 kind=notice -->
NOTICE-M2-CARRY-METHOD-RULING-S164-3

LANE: AG-3 (STOPPED on NOTICE-M2-CARRY-FILTER-RULING-S164-2 item 5; your slip SLIP-NOTICE-M2-CARRY-FILTER-RULING-S164-2, bus row 9fb3f508-6b9f-4688-b19f-871da8f5595e)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:35Z
AMENDS: NOTICE-M2-CARRY-FILTER-RULING-S164-2 item 1 ONLY (every other item stands). Your stop was exactly right: listRecentByConversation has a RECALL caller (memoryRetrieve.ts:407, MEMORY_CARRIER_LIMIT_K1) besides the carrier (stageClarify.ts:689). scout-2 measured the same leak independently (SCOUT-STATUS-REVIEW-CARD-M3-S164-1 Q4 / Δ4, bus row 6c4199bb-b21e-451d-bb3e-34662c3aa053) and its remedy equals yours.
NO CRON TASK. GRAFT: graft first (graft's callers view missed both instance calls — say so in the report; git grep is the lens that found them). SECURITY: never print, echo, printenv or cat any environment variable.

## RULING (replaces item 1)
- `listRecentByConversation` STAYS on OFFERABLE_OUTCOME_FILTER (it is recall: memoryRetrieve.ts:407).
- NEW method `listLastForCarry(conversationId, taskId)` on EpisodesRepository reads LIMIT 1 through the NAMED `CARRY_OUTCOME_FILTER` (the pre-M2 class-only literal, byte-for-byte), called ONLY by stageClarify.ts:689 (readCarriedResolution). No other caller; a test pins that.

## STEPS
1. Cut `phase/m2-honest-grading-s164-2` from CURRENT origin/master (print it; 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 now — K41 may land first; if master moves before you open, re-pick your ONE commit onto the new master). Carry M2 content, apply NOTICE-…-S164-2 as amended here.
2. Tests: F7, F7e, F7f, F7g, F7h as ordered, PLUS F7i — the recall same-conversation carrier (memoryRetrieve.ts:407 path) still EXCLUDES a non-offerable row; PLUS F7j — `listLastForCarry` has exactly one caller (git grep lens in the test or a wiring assertion). Planted faults: point stageClarify back at listRecentByConversation → F7f red; point listRecentByConversation at CARRY → F7i red; revert both.
3. All gates as before (build five, typecheck:api, rule24, migration-versions, tenant-zero, backend-names, reseal if drift, relayAudit, report-schema by name); report with exactly ONE FILE-FENCE block; no bare 7–39 hex in prose.
4. ONE commit; push; DO NOT open the PR — K41 (AG-1) holds the slot. Slip SLIP-M2-RECUT-PREP-S164-3 (bus + fallback S164/) with the 40-hex head and parent. The Architect sends the open-PR notice when K41 lands.
5. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.

END · NOTICE-M2-CARRY-METHOD-RULING-S164-3
