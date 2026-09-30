SLIP-CARD-SD2-S164-1

card: CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v2 (built from the v1 prep under NOTICE-SD2-PREP-AG4-S164-9)
branch: phase/sd2-brake-notice-grouped-count-s164-2
head: 7f4f84b1bfef862bfa21390c14f04c5e24d9b61b
parent: 61e7f368604ffdd86b8841d9063e540641d42efc (the order-1 master, read twice; PR 646 has since landed on top as 763a54bc — this prep is re-picked at its slot)
report: docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-AG4-report.md
ci: UNMEASURED no PR by order
status: BLOCKED
(status BLOCKED names ONE piece: Δ7's prompt.segment home. Everything else is built, pushed and green.)

## BLOCK — reported, not resolved (card vs law)
The "not all" clause as a `prompt.segment` row means:
1. A 21st segment id. segmentIds.ts declares the id set CLOSED ("governance edits segment TEXT, never segment TOPOLOGY"). A new id needs a code change, a floor entry and a RE-SEED, which is a DB write through the Operator's door. promptSegmentSchema.test.ts:26 pins 20.
2. Every production turn's promptRev moves. promptRevFrom hashes EVERY id in SEGMENT_IDS, so the floor hash and every turn's promptRev change, including turns that never hit the cap. promptRev is the L5 guardrail's arm label.
3. The resolved segments are not on ctx. stagesModel.ts feeds them to buildSystemPrompt and keeps only capture and promptRev; stage 07 would need a new ctx field.
Built and waiting: toolCallCapMessage(tool, limit, refused, clause?) with {{REFUSED_COUNT}} substitution and the SD2-9 fallback (today's sentence + count). The caller passes the count now and no clause.
Decision needed (Architect): (a) a 21st segment with a re-seed and an accepted promptRev break, (b) a segment outside the promptRev hash, or (c) another governed home for model-facing tool-result text.

## Built
- Δ6: no appended notice. The brake reaches the chip through the done frame's `brakes` (stageStream.ts:1093); SD2-1 proves it from the REAL stage-07 ledger. partialReadDigest.reasonSource = 'ToolResultMeta'. The chip is live-turn only (named, not repaired).
- D2: the running refused count is in the model-facing message.
- D3/Δ8/Δ9: groupsOf exported, reused exactly (sibling only; the v1 nested rule removed). recordCount = sum; returnedRecords = sum when all inline, else the rows shown; the handle holds all rows tagged _group; groupCounts on the result and the meta; checkFabricationRisk counts each group. Flat and nested payloads are byte-identical to master. Replays of old grouped results show the summed count after this card.
- D4: client findRecordGroups unchanged; it agrees with the server's _group on the fixture (24/24/23 = 24/24/23).

## Tests
SD2-1 (REAL stage 07 → REAL stream; brake count 3; results[2]/[4] carry 1/3; finalText === fullText; done.brakes carries the record) · SD2-2 · SD2-3 (:50/:66 → 71, handle 71, _group set, groupCounts) · SD2-5 (flat/envelope sha pins unchanged) · Δ9 nested stays flat · SD2-6 · SD2-7 (partialReads []) · SD2-8 (no fabrication_risk; CONTROL without groupCounts fires) · SD2-9 (fallback, no literal placeholder; a governed clause is substituted).
Planted: sum only the first group → SD2-3 red on :50 and :66 (plus SD2-6, SD2-7, SD2-8's control); reverted.

## Gates
- build: doc-drift RED on 5 tabs → reseal (ff4c27693c50 / c98bc48472e1 / 3328afdcb74d / b0d14fdb5c35 / 1d44fd98c597, each = the gate's got); then [check:ground] GREEN, [check:doc-drift] [OK] no drift.
- typecheck:api exit 0 · rule24 OK (2398) · tenant-zero OK (2352) · backend-names exact · relay corpus 37/37 · report:check OK (after one R-ANCHOR fix in my own report) · touched suites 7 files 143/143.
- Full suite in the sandbox: 11653 passed | 16 failed, all listen EPERM (5 files); outside the sandbox those files pass 123/123.

## Named
- v1 was never pushed. Its local WIP e9ca5739 was carried with cherry-pick -n. The only conflict was the generated seal file (master's side taken, then resealed).
- stageStream.ts is restored byte-for-byte to master. The v1 brakeDropNotice.test.ts became perToolCapCount.test.ts.
- Two transient permission-classifier failures (the first push, one read-back) were retried once each as allowed. The push and read-back then succeeded.
- The authority-conformance timestamp side effect was restored and is not in the commit. No cron task. No environment value printed.

read relay_inbox at 2026-09-30T07:04:02Z, box empty
