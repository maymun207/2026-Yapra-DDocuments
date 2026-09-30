<!-- relay-audit: v1 kind=card -->
CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v2

LANE: AG-4 (building v1 as a PREP under NOTICE-SD2-PREP-AG4-S164-9; K41 LANDED at 06:17:13Z, master 61e7f368604ffdd86b8841d9063e540641d42efc — your priority rule applies: POST-LANDING-1 first, then this v2)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T06:20Z
SUPERSEDES: CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v1 (doc repo S164/, sha256 c2823a1b6fce516dbcbeb1b2929cf835e352f1ab7207d147faf160eb60b65884). scout-2 SCOUT-STATUS-REVIEW-CARD-SD-S164-1 (bus 265b1d0b-d1d3-485f-b78f-0c56ec448983; full text doc repo S164/) RED; its Δ6–Δ9 are applied below BY NUMBER and override any v1 line they contradict. Work already done on v1 is kept where it survives the deltas.
SUBJECT: register 61 (prose says "hepsi / all" after the per-tool cap refused calls) and register 50 (a grouped payload counts and stores one group), two CALLER-ABSENT wirings (§12.6).
SEAL: EXEMPT with ack = scout-2's review row of this SAME subject, practice 136 — v2 = the scout's deltas applied.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 265b1d0b-d1d3-485f-b78f-0c56ec448983
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · §12.6 · partial ≠ complete (§2) · A25 L265 (fixed model-facing text is prompt.segment data) · §13.3.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## DESIGN (as amended)
D1 → Δ6 RULED (A): the per-tool brake ALREADY reaches the user through the governed chip (done frame stageStream.ts:1093 → cwfService.ts:382 → cwfStore.ts:723 → toolEvidence.ts:364 → chatSurface.ts:279/:285). NO appended notice (one fact, one surface). partialRead.ts:87 `reasonSource` is corrected to what the function actually reads (ToolResultMeta), so the digest no longer claims a brake source it never consults. Named limitation, not repaired here: the chip is live-turn only (absent on history-loaded turns), the same pattern as the memory chip.
D2 → Δ7: the prose fix for register 61 lives on the MODEL side: toolCallCapMessage (burstBrakeMessage.ts:40-45) gains the running refused count for that tool; its new clause ("yanıtta 'tümü/hepsi' deme; kaç çağrının gönderilmediğini söyle" + EN) is a `prompt.segment` row (seeded absence-only through the existing prompt-segment seed path, resolved by resolvePromptSegments.ts:138), with the count as a placeholder — not a code literal. The one caller in stageTools.ts (the cap arm) passes the count. burstGuardReporting.test.ts (:109, :129, :138-139) is updated BY NAME.
D3 → Δ8 + Δ9: export groupsOf (inlineAggregates.ts:126-136) and reuse it EXACTLY (sibling groups only; the nested-shape rule is DROPPED, Δ9). In formatToolResult after :440, when groups ≥ 2: recordCount = returnedRecords = the SUM when every group is inline; when truncated, returnedRecords = the rows actually shown; the handle (:511-513) registers ALL rows tagged `_group` with the group key; fields / fieldSummaries from the same rows; the meta gains `groupCounts: {key: n}`; checkFabricationRisk adds each group count to knownCounts (groundingCheck.ts:405-410) and parseToolResultMeta (:460) reads it. A flat single-array payload is byte-identical (control). State in the report: replays re-format from raw payloads, so historical replays show the summed count after this card.
D4 · the client twin findRecordGroups (src/lib/tableData.ts:108-139) is NOT changed; state whether its grouping agrees with the server's `_group` on the inlineAggregates fixture.

## ORDERS
1. AFTER POST-LANDING-1 (NOTICE-POST-LANDING-1-PR-NEXT-S164-8 steps 2–3): `git ls-remote origin refs/heads/master` TWICE; re-base your SD2 WIP onto the current master with `cherry-pick -n` on a fresh branch phase/sd2-brake-notice-grouped-count-s164-2 (manifest drift only via `npm run reseal`).
2. Measure and quote: partialRead.ts :51-57, :87, :98-117; stageStream.ts :1093; chatSurface.ts :279/:285; burstBrakeMessage.ts :40-45; resolvePromptSegments.ts :138; toolResult.ts :175-209, :383, :440-442, :511-513, :555, :608; inlineAggregates.ts :126-136; groundingCheck.ts :405-423, :460, :623; toolResultClass.ts :339-382; inlineAggregates.test.ts :50, :65-66.
3. Build. Tests (named): SD2-1 cap harness (maxCallsPerToolPerTurn = 2, five calls to one tool) → brake {per_tool_calls, limit 2, count 3}, the third result carries the refused count and the segment clause, finalText has NO appended notice; SD2-2 partialRead digest reasonSource names ToolResultMeta; SD2-3 inlineAggregates.test.ts :50 and :66 flipped from 24 to 71 BY NAME, handle rows 71, `_group` set = the three keys; SD2-5 flat control byte-identical; SD2-6 observeResult on the 71-row fixture = today's non-empty class; SD2-7 inline grouped → partialReads [] ; SD2-8 answer "24 kayıt" on the grouped fixture → no fabrication_risk; SD2-9 the segment absent → toolCallCapMessage falls back to today's text plus the count (never a missing clause rendered as literal placeholder). Planted fault: sum only the first group → SD2-3 red; revert.
4. GATES: `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · touched suites + e2e locators for changed strings (practice 116). Report docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md with exactly ONE `FILE-FENCE:` block; no bare 7–39 hex in prose.
5. ONE commit; push; NO PR until the Architect's notice gives the slot. Slip SLIP-CARD-SD2-S164-1 (bus + fallback S164/).
6. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FILE-FENCE (scout-2 confirmed, after the deltas): api/cwf/_lib/turn/partialRead.ts · api/cwf/_lib/toolResult.ts · api/cwf/_lib/inlineAggregates.ts · api/cwf/_lib/grounding/groundingCheck.ts · api/cwf/_lib/grounding/types.ts · api/cwf/_lib/turn/burstBrakeMessage.ts · api/cwf/_lib/turn/stageTools.ts (the cap-arm call only) · the prompt-segment seed file · tests (inlineAggregates.test.ts, burstGuardReporting.test.ts, partialRead and groundingCheck suites) · report · gate-regenerated files.
FORBIDDEN: an appended brake notice; the nested-shape rule; a second grouping walker; the new model clause as a code literal; changing the per-tool cap value; changing flat-payload output; a migration; --force; cron; printing an environment value.

END · CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v2
