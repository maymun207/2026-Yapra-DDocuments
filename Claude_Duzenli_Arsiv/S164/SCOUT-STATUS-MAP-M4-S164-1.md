SCOUT-STATUS-MAP-M4-S164-1 — scout-2 · reply_to ORDER-SCOUT-MAP-M4-S164-1 (id 12715973-98eb-4289-ac23-ebf82f65c478, md5 42863ea0387ed55c3b7bad392e724fcf DIGEST-OK)
BASE: master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (ls-remote, unchanged). M2 as ruled (two filters + listLastForCarry) is NOT landed; nothing below depends on it except "offered" row eligibility.
Lens note: git grep was run for instance calls beside graft, per the order.

1 · OFFERED — exists, counted, NOT durable, no ids
- Retrieval stage: memoryRetrieve.ts:596-609 retrieveMemory(…topK…) → :620-640 `ctx.memoryOffered = { count, conversationCount, userCount, routineOffered, dossierOffered }` (type turn/types.ts:720).
- Prompt: :658-662 `ctx.memorySliceBlock = [episodic slice, routine, dossier].join` → stagesModel.ts:411 `const memoryBlock = ctx.memorySliceBlock ? …`, the ONE join into the prompt.
- Traced: span attrs stagesModel.ts:393-398 (ATTR_MEMORY_OFFERED / _CONV / _USER / _UNAVAILABLE, config.ts:309-316). The SSE done frame is stageStream.ts:1140 `memoryOffered: ctx.memoryOffered ?? null`. The client chip is ChatShell.tsx:539-556 ("LIVE-TURN ONLY: memoryOffered is undefined on history-loaded"), copied at cwfService.ts:397 and cwfStore.ts:738.
- NOT durable: the telemetry `turn_done` row (stageStream.ts:853-861) carries no memory key. The key set is pinned strict at chatQuotaStream.test.ts:358 (`toEqual([... 'turnContext'])`, no memory*). The span goes to Langfuse/OTel and turn_trace_digest, which is display-only with 14-day retention, so there is no aggregatable per-turn record.
- No ids are recorded: the offered rows' ids exist only in-flight (outcome.offered[].id, used by reinforce at :666-671).
- COUNT POINT: memoryRetrieve.ts:620, the one stamp site. Proposal: memoryOffered gains `ids: string[]` (episode ids, the offered order) and `blocks: {episodic, routine, dossier}`, and the turn_done payload gains `memoryOffered` (count + ids + unavailable reason) at stageStream.ts:861. chatQuotaStream.test.ts:358 is updated by name. Null means unavailable and 0 means a real zero (the ATTR_MEMORY_UNAVAILABLE posture).

2 · USED — no signal exists
- ABSENT: `git grep -i -e memoryUsed -e memory_used -e memoryCited -e "used memory"` over api/src/shared → none. The chip is OFFERED-only: chatSurface.ts:110 "FACT (the done frame's memoryOffered), never a parsed claim".
- The block has no stable marker the model could echo: composeMemorySliceBlock memoryRetrieve.ts:703-717 renders `(createdAt) "asked" · varlıklar: ids · araçlar: names`, no row id.
- SMALLEST HONEST DEFINITION (no LLM judge): `used(row) = the turn ACTED on something that row carried`. That is (a) an entity id of the row is in this turn's ctx.entityResolutions.canonicalIds, or in a called tool's args by id (persistRaw args, scrubbed), or (b) a tool name of the row was called this turn (persistRaw), or (c) routine: the plan was seeded from ctx.offeredRoutine (memoryRetrieve.ts:646 → :563 derivePlan) AND its first step's tool was called.
- It CAN prove: overlap between offered memory and the turn's actions (an upper bound on influence).
- It CANNOT prove: causation. The model may have chosen the same tool or entity without the memory. That is HELPED's job (§3). Name the metric `overlap`, never "used".

3 · HELPED — machinery half-exists
- memoryAbLens (api/cwf/_lib/replay/memoryAbLens.ts:1-33; wired at api/admin/replay.ts:518 and scripts/runMemoryAbLens.ts:84): a zero-LLM paired rebuild. Arm A is the slice OFF, arm B is the live slice; it measures GROUNDING DRIFT only. It explicitly REFUSES quality gain ("`qualityGain` is a literal refusal object") and reads LIVE-STATE episodes, not the ones offered then.
- Live paired replay: goldenRun.ts:1-45 → pairedReplay.ts:182 runPairedReplay. Its arms differ by PROMPT SEGMENTS; no memory arm exists (`git grep -i memory` in pairedReplay.ts, runExperiment.ts, goldenRun.ts, taskFn.ts, canaryRun.ts → none).
- Labelled turns: golden_specimens.exam_set (shared/examSets.ts:17-28, held-out 'calibration','acceptance'), with AcceptableLabel {tools, facts} (:38-46).
- MISSING: (i) a memory ARM in runPairedReplay (arm B injects the retrieved slice for the specimen owner through the production composition, arm A none); (ii) a PINNED memory state per run (memory_snapshot_id, A26 P9), because memoryAbLens's LIVE-STATE caveat applies to any arm; (iii) a scorer that reads facts and tools (see 4); (iv) consent/spend: the live arm uses REPLAY_RUN and the replay quota, where memoryAbLens is zero-spend.

4 · ABSTENTION slice
- The lexicon scorer: examScorers.ts:150-164 splitSentences / sentenceViolation. "A sentence violates iff it matches an assertion AND matches no hedge", and any hedge clears it. emptyVsZeroHonesty :197-215 is scoped to turns with an empty or error TOOL result, not to memory. Lexicon data is data/exam/absence-lexicon.json.
- What it can verify: an unhedged absence assertion in the answer text. It cannot verify values, dates or multi-session facts, and a hedged false claim passes.
- GOLD-ANSWER SCORER INPUT ALREADY EXISTS, UNREAD: AcceptableLabel.facts (shared/examSets.ts:38-46: "`facts`: what a correct answer must carry (recorded for the owner's reading; no scorer in this card reads it)"). The new scorer (Δ-K7) needs: facts[] per exam turn (EXISTS); the answer text (loadRecordedTurn, recordedTurn.ts, or the live arm's output); normalization for numbers/dates in TR+EN; and an ABSTAIN expectation. AcceptableLabel has no such field today, so `expectAbstain?: boolean` goes on the shared type and the server zod in replay/goldenSpecimens.ts. Scorer version is part of the ratified MEMORY-1 bar.
- Exam sets live in golden_specimens (exam_set column: migration 20260928180000_golden_specimens_exam_set.sql; reader replay/goldenSpecimens.ts). The runner is replay/examRun.ts (zero-LLM, :1-9) via scripts/runExam.ts.

5 · PANEL
- Memory-lane surface: src/components/admin/MemoryTab.tsx "Bellek Sağlığı" health block (:179-190: total, expiring, last forget tick; data from api/admin/memory-episodes.ts GET :77-84).
- Daily aggregate surface: api/admin/health-analytics.ts (telemetry_events → daily series; thresholds resolved as governed values with a source, e.g. `thresholds.feedbackQueueAgeWarnHours.value` at :496; HealthTab.tsx renders band states :377).
- Proposal: the offered/overlap per-day counts are a health-analytics series read from turn_done.memoryOffered (§1), rendered in MemoryTab's health block (or a HealthTab band). Thresholds go on the health.* governed params the band already resolves, never literals. HELPED renders only from a stored shadow run (replay_audit evidence), never as a live number.

6 · CALLER-ABSENT (§12.6)
- AcceptableLabel.facts: built, written by curation, read by NO scorer (examSets.ts:38-46). This is M4b's input.
- memoryAbLens: built and wired, but drift-only. Extend it with the memory-arm SELECTION and pinning ideas; do not fork a second lens.
- ATTR_MEMORY_* span attrs (config.ts:309-316): stamped, Langfuse-only. They stay; the durable twin goes to turn_done.
- routineOffered / dossierOffered booleans (memoryRetrieve.ts:631, :639): carried to the client, aggregated nowhere.
- turn_trace_digest is NOT a source: display-only by law (20260721120000_turn_trace_digest.sql:26-30).
- No offered/used analytics query exists. `git grep -i memory` in api/admin/health-analytics.ts gives 5 hits, all the forget-cron tick: `memoryTick` :195, read at :588 via MemoryAuditRepository.latestForgetTick (a governance band). A memory band slot already exists there, and M4a's series sits beside it.

7 · SYNTHETIC / TASK IDENTITY (Δ-SYN) — the seam exists end to end
- chat.ts:66-78: the request body's `taskId` is validated by validateTaskId. "Present means: the four global learn doors refuse, and the two user-scoped memory tables namespace to this value." It is passed at :167 → context.ts:53 `taskId: seed.taskId ?? null`. isCleanAgentTurn cleanAgent.ts:87-89.
- Reads: EpisodesRepository.ts:345-350 withTaskNamespace (`taskId === null ? is('task_id', null) : eq('task_id', taskId)`) on both recall reads (:551, :576). The distill writes taskId (memoryDistill.ts:494-496).
- ⇒ The MEMORY-1 harness = a DEDICATED TEST USER account (actor 'user', C1-LAW untouched) posting /api/cwf/chat with a per-run taskId. Its episodes are written and recalled INSIDE that namespace; production (taskId null) never reads them. No new actor kind, no door change. The test user's chat quota applies (UserChatQuotas); name it in the card.

PROPOSED FILE-FENCE — split into two cards:
M4a · OFFERED/OVERLAP INSTRUMENT + PANEL (no LLM, no spend)
- api/cwf/_lib/turn/memoryRetrieve.ts (ids + blocks on memoryOffered, :620)
- api/cwf/_lib/turn/types.ts (:720 type)
- api/cwf/_lib/turn/stageStream.ts (turn_done memoryOffered + overlap at :861)
- the overlap derivation (a pure module beside memoryRetrieve, fed from ctx at flush)
- api/admin/health-analytics.ts (daily series + thresholds) · src/lib/adminService.ts types · src/components/admin/MemoryTab.tsx (health block) or HealthTab.tsx (band)
- src/lib/cwfService.ts / src/store/cwfStore.ts only if the client type changes
- tests: chatQuotaStream.test.ts:358 pin UPDATED by name, the overlap truth table, the analytics series, UI
- gate-regenerated files · report
NOT: prompt text, recall filters, any learn door.
M4b · SHADOW HELPED + GOLD/ABSTENTION SCORER (spend-gated)
- api/cwf/_lib/replay/pairedReplay.ts / goldenRun.ts (memory arm) or a sibling run in replay/ that REUSES runPairedReplay
- api/cwf/_lib/replay/memoryAbLens.ts (shared slice selection)
- the memory-state pin
- api/cwf/_lib/replay/examScorers.ts (+ gold scorer: facts + expectAbstain) · shared/examSets.ts (expectAbstain) · api/cwf/_lib/replay/goldenSpecimens.ts (zod)
- scripts/runExam.ts
- api/admin/replay.ts (action + REPLAY_RUN gate)
- the MEMORY-1 harness script (dedicated test user + taskId)
- tests · report
Depends on: the owner ratifying MEMORY-1's reference systems, task count and thresholds before the first scored run (A26 K7).

UNMEASURED: live rows and counts (DB is the Operator's read); whether the memoryAbLens pinned corpus (MEMORY_AB_SPECIMEN_COUNT) overlaps the exam sets.
read relay_inbox at 2026-09-30T04:33:03Z (mail-wait exit 0) + --read of order 12715973.
