<!-- relay-audit: v1 kind=card -->
CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v1

LANE: the next free producer lane — the Architect names it in a notice after scout review (this v1 goes to scout-2 first; NEW subject, §12.1)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:30Z
SUBJECT: two CALLER-ABSENT wirings (§12.6) measured by scout-1. Register 61: prose says "hepsi / all" after the per-tool cap refused calls — partialReadNotice already declares reasonSource 'toolLedger.brakes' and reads none. Register 50: a grouped payload counts one group and stores one group — groupsOf (inlineAggregates.ts) already walks all groups and is not called at recordCount / handle.
PREMISES: scout-1 SCOUT-STATUS-MEASURE-SMALL-DEFECTS-S164-1 (bus 877d786a-e0f1-4976-8d40-4c4934badfba; full text doc repo S164/, sha256 9efd7d417098db2d8dc0f92f6f6949f5893b2fd1b15e58d0495b2ed2e0dc58f7), blocks 61 and 50, by reference. Base: master c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f.
SEAL: PENDING scout-2 review (ORDER-SCOUT-REVIEW-CARD-SD-S164-1). v2 carries the ack.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · §12.6 (wire, do not rebuild) · partial ≠ complete (§2) · §13.3: this card adds NO data and NO setting, so no admin screen changes; the user-visible change is one appended notice and a correct count on the existing chips.
NO CRON TASK. GRAFT: graft first, then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## DESIGN
D1 · BRAKE NOTICE (61a, guaranteed): a sibling `brakeDropNotice` beside partialReadNotice (partialRead.ts:98-117) reads ctx.toolLedger.brakes of kind 'per_tool_calls' (recorded at stageTools.ts:1555) and, when any exist, emits one sentence per tool naming the tool and the refused count, in the same TR/EN localisation as partialReadNotice ("… aracına N çağrı tur sınırı nedeniyle gönderilmedi; bu yanıt tüm veriyi kapsamıyor." / EN equivalent). Appended at stageStream.ts:712 in the same concatenation as the other notices, AFTER partialReadNotice. No brakes → empty string, finalText byte-identical. partialReadNotice's own reasonSource claim is corrected to the truth it reads (ToolResultMeta), or it is made to read the brakes — pick the one that makes the digest honest and say which.
D2 · CAP MESSAGE (61b, advisory): toolCallCapMessage (burstBrakeMessage.ts:40-45) gains the running refused count for that tool and one clause "yanıtta 'tümü/hepsi' deme; kaç çağrının gönderilmediğini söyle" (EN equivalent). Its pinned tests (burstGuard suites) are UPDATED BY NAME. D1 holds even when the model ignores D2.
D3 · GROUPED COUNT (50): export groupsOf (inlineAggregates.ts:126-136) or move it beside findRecordArray (toolResult.ts:175-209); extend it with the nested shape rule (an array whose elements each carry exactly one record array, e.g. {groups:[{name, records:[…]}]}). In formatToolResult after :440, when groups ≥ 2: total = sum of group lengths; the handle (:511-513) registers ALL rows, each tagged `_group` with its group key (or the element's name for the nested shape); fields / fieldSummaries from the same rows. A flat single-array payload is byte-identical to today (control test).
D4 · The client twin findRecordGroups (src/lib/tableData.ts:108-139) is NOT changed; state in the report whether its grouping and the server's `_group` agree on the inlineAggregates fixture.

## ORDERS
1. `git ls-remote origin refs/heads/master` TWICE (print); clean worktree; `git switch -c phase/sd2-brake-notice-grouped-count-s164-1 <that master>`.
2. Measure first and quote: partialRead.ts :87, :98-117; stageStream.ts :693, :711-712, :909; stageTools.ts :1547-1556, :1628; burstBrakeMessage.ts :40-45; toolResult.ts :145-148, :175-209, :383, :440-442, :511-513, :555, :608; inlineAggregates.ts :126-136; inlineAggregates.test.ts :50, :65-66; every caller of recordCount in toolResultClass.ts (observeResult / deriveCompleteness).
3. Build D1–D4. Tests (named): SD2-1 stream harness, maxCallsPerToolPerTurn = 2, five calls to one tool → brake {per_tool_calls, limit 2, count 3}; third result === toolCallCapMessage(...); finalText ends with the notice naming the tool and 3; SD2-2 control two calls → finalText byte-identical to fullText; SD2-3 inlineAggregates.test.ts :50 and :66 flipped from 24 to 71 BY NAME, handle rows 71, set of `_group` = the three keys; SD2-4 nested {groups:[{records:[1,2]},{records:[3,4,5]}]} → recordCount 5; SD2-5 flat control byte-identical formatToolResult output; SD2-6 observeResult on the 71-row fixture classifies as today's non-empty class. Planted fault: sum only the first group → SD2-3 red; revert.
4. GATES: `npm run build` (reseal if drift) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · touched suites + e2e locators for changed strings (practice 116). Report docs/relay/SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-<LANE>-report.md with exactly ONE `FILE-FENCE:` line followed by `- <path>` lines; no bare 7–39 hex in prose.
5. ONE commit; push; ls-remote. No PR until the Architect's notice gives the slot. Slip SLIP-CARD-SD2-S164-1 (bus + fallback S164/).
6. Back to `node scripts/mail-wait.mjs <LANE> --budget-min 480`.

FILE-FENCE (proposed; the scout confirms): partialRead.ts · stageStream.ts · burstBrakeMessage.ts · toolResult.ts · inlineAggregates.ts · tests (inlineAggregates.test.ts, burstGuard suites, a stream-harness suite) · report · gate-regenerated files.
FORBIDDEN: a second grouping walker beside groupsOf; changing the per-tool cap value; changing flat-payload output; a migration; --force; cron; printing an environment value.

END · CARD-SD2-BRAKE-NOTICE-GROUPED-COUNT-S164-1-v1
