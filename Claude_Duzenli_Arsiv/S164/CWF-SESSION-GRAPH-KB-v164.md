# CWF-SESSION-GRAPH-KB-v164

Edges learned in S164, each tagged. Append to v163 (carried unchanged; this file lists only the S164 edges).

- [S164] mergeGuard.fence —parses→ exactly one `FILE-FENCE:` line + `- <path>` lines (scripts/mergeGuard.mjs :64-85, judgeBlocks :313-319); a Markdown heading + code block = NO-FENCE (PR 643).
- [S164] M2.carry —reads→ listLastForCarry(conversationId, taskId) on CARRY_OUTCOME_FILTER (pre-M2 class-only literal), sole caller stageClarify.ts:689; recall —reads→ listRecentByConversation on OFFERABLE (memoryRetrieve.ts:407).
- [S164] grounding.numericMode —resolved by→ stagesModel.ts:273-277 via resolveAgentParams → fetchSystemParamRows (filters to agent_param; outage → []); live value 'stamp' (published v2).
- [S164] governed three-state lists —precedent→ routingObligations.ts:36/:77 ('data' | 'absent' | 'unread'), entryFloor.ts:39.
- [S164] SOFT rule kinds —validated by→ fieldSpec (codeSchemaRef null; PLAN_TEMPLATE kinds.ts:552-557) and edited by the generic Rules surface (GovernanceTab.tsx:350 / kindFieldEditor.tsx); CORE kinds —validated by→ code Zod schema (GovernanceTab.tsx:1208).
- [S164] domain_rules seed rows —provisioned by→ selfSeedReconciler.seedDomain (knowledge/selfSeedReconciler.ts:233-331), absence-only; no migration seeds domain_rules or rule_kinds.
- [S164] per_tool_calls brake —surfaces via→ done frame stageStream.ts:1093 → cwfService.ts:382 → cwfStore.ts:723 → toolEvidence.ts:364 → chatSurface.ts:279/:285 (live-turn only).
- [S164] recordCount —consumed by→ partialRead.ts:51-57 (available vs read), groundingCheck.ts:405-423 checkFabricationRisk knownCounts, :278, :460, toolResultClass.ts:339-382, stageTools.ts span/observeResult.
- [S164] groupsOf (inlineAggregates.ts:126-136) —groups→ sibling record arrays only; findRecordArray (toolResult.ts:175-209) —picks→ known key → declared count → longest (first wins ties).
- [S164] memoryOffered —stamped at→ memoryRetrieve.ts:620; —durable in→ telemetry turn_done + clarification_asked (M4a branch); SSE done frame projects without ids.
- [S164] scout liveness —visible in→ supavisor_logs cwf_lane short episodes at ~90 s cadence while in mail-wait; a scout inside a review is invisible to this lens and does not read its box.
- [S164] Vercel production —builds→ ~5–8 min after merge (K41: 06:17 merge → READY by 06:25).
- [S164] owner ⚡ re-boot of a dropped scout —restores→ the loop within ~11 min (06:01 ⚡ → 06:12 scout-1 status → 06:16:59 adversary status).
END · CWF-SESSION-GRAPH-KB-v164
