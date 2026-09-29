MEMORY-MAP: 10 stores · 3 CALLER-ABSENT · failed-turn-positive=CONFIRMED

# SCOUT-STATUS-MEMORY-MAP-S163-1

- **From:** scout-2 (read-only)
- **Answers:** ORDER-SCOUT-MEMORY-MAP-S163-1 (id `204c9f5b-c817-4266-b985-46c1c1ac838e`, body_md5 `a06719ecb61f6cc2f4f9dd8d061532ed`)
- **Base:** `origin/master` = `ee12161ecad43b338489e85fcb73df1e08aa8ac0`. Every file:line below is at this base.
- **Boot controls:**
  - guard-bash BLOCKED · GB-4 (PASS)
  - guard-mcp BLOCKED · GM-1 (PASS)
  - `ls-remote` master = HEAD = `ee12161e…` (tree current)
  - CronList: none
- **Method:**
  - I measured the code side only. The DB figures are the Architect's, taken at 06:50Z; I did not re-read them.
  - Lenses: graft (ask/grep/callers/skeleton) plus `git grep`, with direct reads of the key spans.
  - Two read-only Explore sub-agents mapped (a) episodes, semantic memory and short-term context, and (b) the Graph KB, the vector store, the procedural stores and A25.
  - I re-verified their load-bearing claims myself:
    - GraphKbReader has no caller: `git grep -E "parentsOf|containsAmong|GraphKbReader"` over api, shared, scripts and src.
    - The tool_category_cache learn guard: direct read of stageTools.ts:1800-1909.
    - `classifyTurnOutcome`: direct read of memoryDistill.ts:150-188.

## Counting rule

- **10 stores:**
  1. short-term history
  2. `episodes`
  3. `semantic_memory`
  4. `tool_experience`
  5. `tool_category_cache`
  6. `tool_behavior_census`
  7. plan templates
  8. Graph KB (`entity_registry` + `entity_topology_edges` + GraphKbReader)
  9. vector (`vector_index_digest` + Qdrant lane)
  10. `router_proposals`
- **CALLER-ABSENT** means no reader on the answering path (no path to stage 03, stage 07 or the prompt). Three stores qualify:
  - `entity_topology_edges`/GraphKbReader
  - `vector_index_digest`
  - `router_proposals` (admin queue only)
- `entity_registry` itself is NOT caller-absent. Stage 03 and stage 07 read it.

## THE TABLE

| store | writer (file:line, stage, condition) | write on success / empty / fail | reader (file:line, stage) | reaches routing (07)? | gate | A25 target |
|---|---|---|---|---|---|---|
| short-term history | client `src/store/turnHistory.ts:27` `CLIENT_HISTORY_MAX = 10`, `:99` slice; sent in the request body (`api/cwf/chat.ts:60`) | sent unchanged on every turn type | `stagesModel.ts:129` `.slice(-input.historyWindowN)` (stage 12; `agentParams.ts:377` default 6, max 10); per-message trim `stagesModel.ts:131-132` | NO (prompt only) | governed param only | none |
| `episodes` | `distillAndWriteEpisode` from `runTurn.ts:301` (stage 14 flush, after the stream); actor gate `memoryDistill.ts:421` and `EpisodesRepository.ts:498`, which always passes on this path | written on all three. Success: outcome `unproven` (never `clean` when tools ran), importance 2. Empty: `failed` (surfacedEmpty), 0. Fail: `failed` only if `failures>0 ∧ successes==0` or grounding false, otherwise `unproven` (see F3) | `memoryRetrieve.ts:406-408` (stage 12 warm-trust, `stagesModel.ts:390`): 2 rows by conversation_id + 50 by user_id, ranked, topK default 3 (0-8); `OFFERABLE_OUTCOME_FILTER` `EpisodesRepository.ts:378` drops only `failed`; reinforce `memoryRetrieve.ts:666` → `EpisodesRepository.ts:600` | NO. Stage 07 runs BEFORE stage 12 (`pipeline.ts:22` register-tools before `:24` warm-trust). Reaches the PROMPT (`stagesModel.ts:146`), the planner nudge (`memoryRetrieve.ts:563` → `stageStream.ts:334`), and stage 03 clarify (`stageClarify.ts:689`, 1 row) only when `frameRoutingEnabled` (`:2771`, dark by default) | UNGATED write (TTL param `agentParams.ts:654`); read switch is topK=0 | examples (a grounded-successful `asked` → tool paraphrase proposal); default plan (from `decision.procedure`) |
| `semantic_memory` | `writeSemanticMemory` awaited in distill, `memoryDistill.ts:570-571`; only when `procedureEligible` (`:298-322`: not failed, grounding true, toolFailures 0, not surfacedEmpty, has yield, has a frame) | success: upsert per entity (`SemanticMemoryRepository.ts:189`). Empty: nothing (`semanticMemory.ts:162`). Fail: nothing. Keys are only the raw surface form while frameRouting is off (`semanticMemory.ts:146` returns `[]`) | `readDossier` `memoryRetrieve.ts:414` (stage 12); `(user_id, entity_key IN …, task_id IS NULL)` `SemanticMemoryRepository.ts:139-145`; k=2 `semanticMemory.ts:57`; no frame means no read (`:336`) | NO. PROMPT only (`memoryRetrieve.ts:661` → `stagesModel.ts:146`) | the eligibility predicate is the gate; no flag, no review | alias (user entity surface forms → `entity_alias` proposal); none for routing (user-scoped, D1) |
| `tool_experience` | `flushToolExperience` `runTurn.ts:303` (stage 14 flush), accumulated at `stageTools.ts:1704-1705` `if (callWasSent) recordToolSuccess(...)`; rejects only `outcome.failed` (`toolExperienceFlush.ts:87`) | PER CALL, not per turn. Success: +1. Empty `[]`: +1 (classified `answered`). A failed TURN still gets +1 for every call that was sent and not classified as an error (see F1 and F2) | `toolCensusRefresh.ts:442`: offline, health cron; P3 re-probes only tools with NO positive experience. `censusToolDoc.ts:214`: turn path (`stageTools.ts:1272`), tool-note text, gated off (`:196`, `agentParams.ts:961` composeEnabled=0) | NO. Changes neither what is offered nor what is chosen. It only suppresses re-probes and feeds a tool note that is off | UNGATED write | ranking_policy signal ONLY after it is outcome-filtered (K23). Today it is a success-agnostic counter |
| `tool_category_cache` | `learnToolMapping` `toolCategories.ts:956`, from `stageTools.ts:1904`, inside the tool-call path at the first call (`:1807`), basis must be `keyword` (`:1822`) | written with NO outcome test (success, empty and fail are identical): guards are basis / clean-agent / brake / breadth / vocab (`:1822-1900`) | `toolCategories.ts:734` getAll → `:774` learnedMappings → `matchCategories` `:1585` / `:1578` / `:1661` / `:1698` (stage 07) | **YES. The only learned store that changes what is OFFERED at stage 07** | `router.learnEnabled` brake (`toolCategories.ts:929`; code floor 1 `agentParams.ts:639`; code comment `routeShadowLens.ts:1073` says published 0 since 2026-07-29, NOT re-measured by me) | examples/alias, via proposal + K34, instead of a direct write |
| `tool_behavior_census` | `toolBehaviorCensus.ts:135` (on connect), `toolCensusRefresh.ts:217` (cron) | not per-turn | `DbKnowledgeProvider.ts:386` → `derivedPack.ts:259` → model context `DbKnowledgeProvider.ts:181-183` | NO. PROMPT (derived pack, for backends with no published rules) | no flag on the derived-pack read | tool_profile (A25 `:259` names it under K34) |
| plan templates | governed `system.plan_template` rows + `PLAN_TEMPLATE_FLOOR`; `planner.ts:377` | not learned; nothing writes them automatically | `memoryRetrieve.ts:562-565` `derivePlan(ctx.irFrame, ctx.offeredRoutine, overrides)` → `ctx.planBlock` (stage 12) | NO. PROMPT / planner nudge | `planner.enabled` (`agentParams.ts:891`, floor 1) and an irFrame must exist | default plan (A25 `:531`); the episode `decision.procedure` is the natural feed |
| Graph KB: `entity_registry` | `entityDiscoverySync.ts:1102` upsertLayer (`last_seen_at` `EntityRegistryRepository.ts:319`), from `catalogSync.ts:194`: admin/cron only (`backend-health.ts:101`, `backend-tools/sync.ts:53`, `backend-verify.ts:235`, `mcp-settings.ts:191`) | not per-turn | stage 03 `stageClarify.ts:918`, `:1100`; stage 07 `toolArgPolicyLoad.ts:128`, `factoryParamHint.ts:152` (tool-description text); learn-corpus guard `toolCategories.ts:673` | PARTIAL: argument policy and hint text at 07; clarify at 03 | sync has 6h staleness for slow layers | alias |
| Graph KB: `entity_topology_edges` + GraphKbReader | `entityDiscoverySync.ts:774` syncLayerEdges → `EntityTopologyEdgesRepository.ts:190-191` | not per-turn | `parentsOf` / `containsAmong` (`GraphKbReader.ts:96`, `:127`): **CALLER-ABSENT**, no caller even in tests (tests import only `toolGraphFor`). Other readers: the sync's own arbitration `entityDiscoverySync.ts:829`, admin `api/admin/graph-kb.ts:379`, `scripts/verifyGrants.ts:108` | **CALLER-ABSENT** | n/a | obligation CANDIDATE (containment facts → a clarify / scope obligation proposal to the owner) |
| vector: `vector_index_digest` + Qdrant lane | `indexCorpus.ts:404` (only when `written>0`), cron `api/admin/vector-index.ts:183` (`CRON_SECRET`) | not per-turn | digest: indexer only (`indexCorpus.ts:349`) → **CALLER-ABSENT** on the turn. Lane: stage 07 `stageTools.ts:880-916`, stage 03 `stageClarify.ts:3025` | lane: YES when on; `vector.toolRetrievalMode` floor 0 (`agentParams.ts:1123`), `vector.enabled` floor 0 (`:1068`). Live DB values NOT read by me | governed switches (off at floor) | ranking_policy (retrieval as a ranking input, through K34) |
| `router_proposals` | `toolCategories.ts:1806` (semantic path, not braked, not clean-agent) | per-turn when on the semantic path | `api/admin/router-proposals.ts:76`, `route-proposals-summary.ts:44`: human review queue | **CALLER-ABSENT** on the turn | brake + clean-agent door | this is ALREADY the proposal-queue shape A25 asks for (examples/alias) |

## Answers to the six items

### 1. The map
See the table above.

Procedural memory:
- `tool_category_cache` is the only procedural store that acts on routing.
- `tool_experience` is a re-probe suppressor, not procedural memory.
- Plan templates are governed, not learned.
- The episode `decision.procedure` + `composeRoutineBlock` (`memoryRetrieve.ts:346`) is the only learned procedure, and it reaches the prompt/planner, not stage 07.

### 2. The failed-turn write: CONFIRMED

The predicate that decides "positive" is per-call:

- `stageTools.ts:1643-1649`:
  - `const resultClass = callWasSent ? classifyToolResult({ resultText, args }) : null;`
  - `const toolError = resultClass !== null && resultClass.isError;`
- `stageTools.ts:1704-1705`: `if (callWasSent) recordToolSuccess(...)`
- `toolExperienceFlush.ts:87`: `if (outcome.failed) return;`

Nothing reads the turn outcome. On the tour turn, the four tools that answered each took +1 even though three other calls failed and the answer was "teknik bir sorun".

**F1 — empty `[]` counts as positive.** `classifyToolResult` (`toolResultClass.ts:169-192`) returns `answered` unless a `REJECTION_PATTERNS` regex matches (`:122-136`) or degenerate args are present. An empty array matches neither.

**F2 — the MCP `isError` flag is never read.**
- `mcpClient.ts:333-338` builds the output from `result.content` text parts only. `result.isError` is discarded, and the span stamps `ok: true` (`:342`).
- `ClassifyInput.transportError` (`toolResultClass.ts:154`, trusted at `:172`) has NO production caller. `git grep transportError -- api shared` finds only the test `toolResultClass.test.ts:63`.
- The early returns `{error:'Could not extract URL…'}` (`mcpClient.ts:284`) and `{error:'No valid transport…'}` also match no pattern. The thrown path is safe: `Tool execution failed:` matches `:135`.
- So a tool-level MCP error whose text is not in the recogniser list is classified `answered`. It is a positive in `tool_experience`, a success in `toolLedger`, and `payload.ok=true` in telemetry. The root cause is already named in the header of `toolResultClass.ts:119-120` (`Promise<string>`).

**F3 — the turn class is also soft.**
- `classifyTurnOutcome` (`memoryDistill.ts:166-172`) records `toolFailures` (`:179`) but does not use it in `failed`.
- `answerUnbacked` = `failures>0 && successes===0` (`toolOutcomes.ts:315-317`).
- Three failures + four successes + an apology is therefore `unproven`, which matches the stamp the Architect measured.
- `unproven` passes `OFFERABLE_OUTCOME_FILTER` (`EpisodesRepository.ts:378`, `neq.failed`), so that tour episode is retrievable and can be offered to later turns in the prompt memory slice.
- `procedureEligible` requires `toolFailures===0`, so it does NOT write `semantic_memory` or a routine.

Who reads `tool_experience`, and does it change what is offered or chosen:
- `toolCensusRefresh.ts:442` is offline. P3 "FRESH = no positive experience" (`:31`), so false positives SUPPRESS the re-probe that would find the fault. `stageTools.ts:1698` names exactly this failure mode.
- `censusToolDoc.ts:214` is a turn-path tool note, off (`composeEnabled=0`).
- It changes neither what is offered nor what is chosen.

### 3. Retrieval
- **Stage:** 12 (warm-trust), `stagesModel.ts:390` → `runMemoryRetrievalStage`.
- **Episodes:**
  - Keys: conversation_id (k1=2, `memoryRetrieve.ts:74`) and user_id (window 50, `:76`), both task-scoped.
  - Ranking: keyword 3 / entity 2 / recency 2 / importance 1 (`:79`). topK default 3.
  - `reinforce` bumps `retrieval_count` / `last_retrieved_at` only for offered rows (`:666`).
- **Semantic:** `(user_id, entity_key)`, k=2, only when a frame exists.
- **Reaches the model:** YES, both.
  - `memoryRetrieve.ts:658-662`: `ctx.memorySliceBlock = [composeMemorySliceBlock(offered), composeRoutineBlock(routine), composeDossierBlock(dossier)]…join('\n\n')`
  - `stagesModel.ts:411`: `const memoryBlock = ctx.memorySliceBlock ? \`${ctx.memorySliceBlock}\n\n\` : '';`
  - `stagesModel.ts:146`: `content: \`${input.memoryBlock}${input.timeContextBlock}\n\n${input.message}\``
  - It lands on the current USER message, not the system prompt.
- **DB consistency:** 659 of 786 episodes were ever retrieved, which is consistent with topK=3 per turn over a small per-user pool.

### 4. Graph KB
- `parentsOf` / `containsAmong` are still **CALLER-ABSENT** at `ee12161e`. There is no caller anywhere, not even a test.
- Other readers of `entity_topology_edges`:
  - the sync's own parent arbitration (`entityDiscoverySync.ts:829`)
  - admin `graph-kb.ts:379`
  - `verifyGrants.ts:108`
  - repository tests
- `last_seen` refreshed today is the health cron sync (`backend-health.ts:101`), not a turn.

### 5. Gates

| store | gate |
|---|---|
| `episodes` | UNGATED (actor=user always passes) |
| `semantic_memory` | outcome predicate only |
| `tool_experience` | UNGATED, success-agnostic |
| `tool_category_cache` | `router.learnEnabled` brake + guards. **No review gate and no K34: a direct write to a stage-07 input** |
| `router_proposals` | brake + clean-agent; human queue |
| census / registry / edges / vector digest | admin / cron triggers |
| vector lane read | `vector.enabled` / `toolRetrievalMode` (floor 0) |
| plan templates | `planner.enabled` + governed rows |

- None of these writers passes an eval or K34 gate.
- Per A25 `:110`, `decideGoldenPublish` covers only `prompt.segment` today.

### 6. A25 fit
The A25 doc is outside the repo: `…/yapra-mimari-documents/A25_cwf-capability-fabric-architecture-v1.html`. Its targets:
- examples `:526`
- negative example `:528`
- alias `:527`
- base-set `:530`
- default plan `:531`
- ranking_policy / obligation candidate → owner `:534`
- K23 filter; K34 as the publish gate for tool_category / routing_obligation / ranking_policy / tool_profile `:259`
- K12 "no LEARNED negative" `:529`
- K32 learned mappings never become obligations `:257`

Smallest WIRING per store (no new mechanism):

- **tool_experience → ranking_policy.**
  1. Pass `transportError: result.isError` through: `executeMCPTool` returns the flag alongside the text, and `stageTools.ts:1644` hands it to `classifyToolResult`. That fixes F2 for the ledger, telemetry and experience at once.
  2. Gate `recordToolSuccess` on the per-call non-empty yield already computed by `formatToolResult` (`toolYield`, `toolResult.ts` PROCEDURE-YIELD `> 0`) and on the turn class ≠ failed at flush time. `runTurn.ts:303` can read the distilled outcome, or flush after `distillAndWriteEpisode`.
- **episodes → examples / default plan.** Episodes that are `clean` or `grounded ∧ toolFailures==0` → a `router_proposals`-shaped proposal row. `procedureEligible` already exists and is the K23 filter in code. Also add `toolFailures > 0 ∧ answer apology` to `failed`, or at least exclude `toolFailures>0` from `OFFERABLE_OUTCOME_FILTER`, so a tour-class turn is not offered to later turns.
- **tool_category_cache → examples/alias through K34.** Route `learnToolMapping` writes into `router_proposals` (queue and admin reader already exist) instead of the live cache, and extend `decideGoldenPublish` to the `tool_category` kind as A25 `:259` states. Until then the `router.learnEnabled` brake is the only fence.
- **semantic_memory → alias proposal.** User surface → canonical pairs from the dossier feed `entity_alias` as a proposal. User-scoped (D1), so owner review is required.
- **Graph KB → obligation candidate.** Wire `containsAmong` into stage 03 scope resolution. This is the first caller; the reader already exists.
- **vector lane → ranking_policy.** Already wired to 07/03 behind floor-0 switches; enabling it is a governed publish through K34.
- **census → tool_profile.** Already reaches the prompt; its publish belongs under K34.
- **short-term / plan templates / digest / router_proposals.** None of these feeds a target by itself. router_proposals is the carrier the others should write into.

## Answer to the owner's question

"agent pipeline'da memory doğru ya da effective kullanılıyor mu?" — Partly. Memory reaches the MODEL (episodes, dossier, routine, plan, census) but never stage 07 routing.

The only learned input to stage 07 is `tool_category_cache`, and it:
- is written without any success test,
- sits behind the only fence it has (the brake), which is reportedly off (not re-measured by me),
- has no review gate.

The success signals are soft:
- `tool_experience` counts empties and MCP tool errors as positives (F1, F2).
- The turn class lets a 3-failure apology turn through as offerable `unproven` (F3).

So "should successful turns feed back into routing?" has no clean success signal to feed from yet. Fixing F2 and F3 is the precondition, and `router_proposals` + K34 is the existing path to route it through.

## Still dark
- **Live published values** of `router.learnEnabled`, `vector.enabled`, `vector.toolRetrievalMode`, `toolCensus.composeEnabled` and `planner.enabled`: I read the code floors only. The `routeShadowLens.ts:1073` comment is a RECALL, not a measurement.
- **The tour turn's per-call results:** whether its three failures reached `toolLedger.failures` or were classified `answered` (F2) is not measured. The Architect's "3 tool failures" source is not named in the card.

## Side finding (boot drift, for a card)
`.claude/boot/free.md` says the first box read must pass an explicit `--since`. `scripts/mail-wait.mjs` now REFUSES `--since` when a watermark exists, exit 2:

```
[BOUNDARY] REFUSED: --since … was given, but this lane has a MEASURED watermark …
```

The script's predicate is `created_at >=` (`mail-wait.mjs:495`), so the birth-blind hazard the boot describes appears repaired. The boot text needs a card.
