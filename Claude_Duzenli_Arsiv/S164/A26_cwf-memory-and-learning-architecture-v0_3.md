# A26 · CWF Memory & Learning Architecture — v0_3 (DRAFT; supersedes v0_2; for the owner's ruling)

FROM: Architect, S164, 2026-09-30 06:1x TSİ. STATUS: DRAFT, not in force. v0_1 went to four external reviewers on the owner's hand — Gemini · OpenAI · Grok · DeepSeek (A26-EXTERNAL-REVIEWS-S164-1) — and to scout-2, whose SCOUT-STATUS-REVIEW-A26-S164-1 (2026-09-30T02:47Z, base 6a3824c2b5efd1764be178d05ba647feec06927c, 27746 bytes) returned RED with nineteen paste-ready deltas. v0_2 applied the external deltas; v0_3 applies scout-2's Δ1–Δ19 by number. Next: the owner's ruling (OWNER-RULING-S164-A26-1) → v1_0.
CHANGE LOG v0_2 → v0_3 (scout-2, MEASURED at 6a3824c2b5efd1764be178d05ba647feec06927c): Δ1 short-term history ALREADY reaches stage 07 (sticky categories) · Δ2 semantic_memory is written by procedureEligible turns, never `clean` (clean ⇔ calls=0) · Δ3/Δ4 cite drift corrected, second tool_experience reader named · Δ5 C5 corrected: a 3-failure/0-success turn IS `failed`; the real gap is toolFailures unused when successes ≥ 1 and every tool-bearing non-failed turn = `unproven` · Δ6 C1 restated · Δ7 P9 grandfathers the existing non-published stage-07 inputs by name · Δ8 the E5 measurement must be RECORDED LIVE from now (A25 E3 replays recorded inputs only) · Δ9 the correction detector is NEW (memoryDistill.ts:33/:483), governed lexicon, provisional labels with final_at · Δ10 apology detection restated in counters (wording detection forbidden, toolOutcomes.ts:286-296) · Δ11 offerable = existing procedureEligible; default_plan from procedureEligible episodes · Δ12 NEW table learned_proposals (router_proposals is a global keyword-PK ledger and cannot carry kinds) · Δ13 experience view keyed on the TOOL's own result within a recency window; both readers listed · Δ14 decay = periodic PROPOSAL through K34 (A25 L259 forbids runtime weights); existing forgetting seams named incl. learning_wipe/restore · Δ15 MEMORY-1 = LongMemEval taxonomy on a CWF-shaped set under a task-namespaced synthetic identity, scored on answer text (C1-LAW forbids synthetic episodes) · Δ16 human fields marked as A26 ADDITIONS to A25 L579 · Δ17 C12 MEASURED ABSENT · Δ18 NEW §9a SECURITY (cross-user leakage via learned text, authorization, erasure cascade, synthetic/clean-agent refusals, replay pinning, cost, tenancy columns) · Δ19 trace.v2 source decided per row (telemetry_events + episodes, never turn_trace_digest).
CHANGE LOG v0_1 → v0_2 (every delta names its reviewer; S112-YASA-1 for the owner's contributions, same discipline for external ones): D1 label = multi-dimensional, two-clock, three-valued (OpenAI, Grok, DeepSeek) · D2 call-level label beside the turn label — credit assignment (OpenAI, Grok, DeepSeek) · D3 candidate-level eligibility per kind, not turn-level K23 AND (OpenAI, Grok) · D4 human feedback is an evidence channel with a reason code, never an override of observed facts (OpenAI, Grok, DeepSeek) · D5 poisoning gate = distinct USERS + population-relative counts; single-user pilot learns in user scope only (Grok, DeepSeek, OpenAI) · D6 bi-temporal facts on the semantic face; decay per memory class × volatility (Grok, OpenAI) · D7 memory trust layer: memory content never gains instruction authority; typed critique, no free text, no critique from transport/empty (OpenAI, Grok, DeepSeek) · D8 two experience series (raw → census, clean → ranking proposals) (Grok, DeepSeek) · D9 trace_label PK (trace_id, labelled_at) + current view (Grok) · D10 "helped" is causal or absent; v1 measures offered/used; no auto-disable (Grok, DeepSeek) · D11 MEMORY-1 harness: LongMemEval-V2 primary, v1 + abstention separate, Mem2ActBench for the procedural face; chip = instrument (OpenAI, Grok, DeepSeek) · D12 C10 dropped; E5 metrics fixed: head/tail Recall@k, time-to-first-correct-route, leakage = 0, shadow recall as ORDER input only (Grok, OpenAI, DeepSeek) · D13 vector lane (store 9) explicitly parked to E5 (Grok) · D14 K35 existence = Track 0 (Grok, DeepSeek) · D15 PII scrub at store time for episodes (Grok) · D16 rollback dependency graph evidence → proposal → bundle (DeepSeek) · D17 tenant-scoped default for multi-tenant backends; raw query text never in a published row (DeepSeek) · D18 P3 reworded: memory may propose, parameterize and rank; never authorize, override policy or replace authoritative state (OpenAI; Grok keeps the A25 red line — both kept, see P3) · D19 vendor store: principle corrected — governance stays in CWF, the storage engine is replaceable; still NOT adopted in v1 (OpenAI vs Grok; ruling in §10) · D20 citations: CoALA (four faces), Reflexion (critique), MemToolAgent numbers "as reported" (Grok). Gemini: no delta; concurs with §4.3 and the M1-first order.
EVIDENCE DISCIPLINE unchanged: MEASURED / RELAYED / HYPOTHESIS on every claim; code lines at `ee12161ecad43b338489e85fcb73df1e08aa8ac0` unless marked `@6a3824c2b5efd1764be178d05ba647feec06927c`. Grok's evidence finding is accepted: v0_1 left §4.2, §4.3 v1 column, §6 numbers and §7 thresholds untagged — v0_2 tags them.

---

## 0 · THESIS (unchanged in substance, sharpened)
CWF remembers but does not learn, because the signal that says "this succeeded" is false in three measured ways and the only learned routing store writes without a success test. A26 makes the signal true FIRST (M1 → TOUR-HONESTY → M2), gives it RESOLUTION (per call, per candidate, two clocks) and EVIDENCE STRUCTURE (facts ≠ quality ≠ utility), then routes every learned change through the ONE proposal → gate → publish → rollback path A25 defines. In v1 LONG-TERM memory reaches tool routing only as PUBLISHED data (the existing non-published inputs — sticky prior-message categories, the LLM frame, the live semantic router — are grandfathered by name until E5); per-turn recall is measured in E5 shadow as an ORDER input, never a SET input.

---

## 1 · MEASURED STATE — v0_1 §1 incorporated by reference, CORRECTED by scout-2 at 6a3824c2b5efd1764be178d05ba647feec06927c (Δ1–Δ6). DB counts remain the Architect's 2026-09-29 06:5xZ reads (scout-2 could not read the DB: GM-1, not routed around).
Corrections to the stores table:
- Row 1 (short-term history) "reaches stage 07?": **YES** — sticky union: the last prior message's categories join the offered set (toolCategories.ts:1695-1698). (Δ1)
- Row 2 (episodes): reach stage 03 when frameRouting is on; the HIGH frame then REPLACES the router's category set (stageTools.ts K32 hunk comment :812-815). A second, conditional path from memory into routing exists today.
- Row 3 (semantic_memory) "written when": **procedureEligible turns only** (memoryDistill.ts:293-323: tool-bearing calls>0, grounded, zero tool failures, domain yield, frame) — never `clean`, which by :187 means calls=0. (Δ2)
- Row 4 (tool_experience): writer stageTools.ts:1779-1781 @6a3824c2b5efd1764be178d05ba647feec06927c; readers toolCensusRefresh.ts:442 AND censusToolDoc.ts:200. (Δ3)
- Row 5 (tool_category_cache): learn gate stageTools.ts:1882 `!learnedThisTurn && matchedCategories.length > 0` → :1979 learnToolMapping; no toolError/resultClass test. Only LEARNED store read by stage 07; K32 routing_obligation (owner-published) is not learned. (Δ4)
- Store 9 (vector lane, `vector.toolRetrievalMode`=0 MEASURED live): addressed in §8 E5 (Grok M-F).
F3 CORRECTED (Δ5): **MEASURED** · a turn with failures and ZERO successes IS `failed` (memoryDistill.ts:168 via toolOutcomes.ts:315-317, and :170). The gap is (i) `toolFailures` is recorded (:179) and unused when successes ≥ 1, and (ii) every tool-bearing non-failed turn is `unproven` by construction (:187 `calls > 0 ? 'unproven' : 'clean'`). The S161 tour turn reached `unproven` because its failures were COUNTED AS SUCCESSES (F1/F2), not because the class rule ignores failures. M2's target is therefore (i) and (ii), on top of M1/TOUR-HONESTY.
C12 (Δ17): **MEASURED ABSENT** @6a3824c2b5efd1764be178d05ba647feec06927c, two lenses — no cwf.trace.v1/v2 builder, no trace_label, no K23 code; the only hit is a relay report line. `turn_trace_digest` is DISPLAY-ONLY BY LAW (20260721120000_turn_trace_digest.sql:26-30; 14-day retention :32-37) and cannot be the learning input.

## 2 · INDUSTRY STATE — v0_1 §2 plus the reviewers' additions (all RELAYED; none is a CWF number)
- **CoALA** (Sumers et al., 2023): canonical source of the episodic / semantic / procedural (+ working) memory vocabulary A26 uses.
- **Reflexion** (Shinn et al., 2023) and **ExpeL**: origin of "critique from failure"; MemToolAgent (arXiv 2606.07909) is the tool-agent instance. NESTFUL 15.6 → 30.4 is quoted AS REPORTED; the relative-gain wording is dropped (Grok).
- **LongMemEval-V2** (arXiv 2605.12493, May 2026): static state · dynamic state · workflow knowledge · environment gotchas · premise awareness, over agent trajectories — closer to CWF than LongMemEval v1 (chat QA). **Mem2ActBench** (ACL 2026): 400 memory-dependent tool tasks; memory → parameter grounding is where current frameworks fail.
- **Memory security, 2026**: Bad Memory (arXiv 2607.14611) — stored instructions steer later sessions; MemPoison (2607.14651) — benign-looking rows become malicious when retrieved TOGETHER (write-time validation alone is insufficient); InjecMEM (2608.23471) — one interaction can inject. **TrustMem** (2606.25161) — memory UPDATES must be verified for coverage, preservation, faithfulness (omission / corruption / hallucination are separate failure classes). **Memora / FAMA** (2604.20006) and Supersede (2606.27472) — outdated-memory use is a primary failure mode; stronger models do not fix it; maintenance is its own problem.
- **Bi-temporal facts** (Zep/Graphiti's contribution, independent of the vendor): valid_from / valid_to / INVALIDATE — the mechanism, not the store, is what A26 adopts (Grok M-D).

---

## 3 · PRINCIPLES (v0_2; each testable)
- **P1 · FACTS ≠ QUALITY ≠ UTILITY, RECORDED SEPARATELY.** The learning input is the `cwf.trace.v2` event (A25 K35) plus a LABEL RECORD that is multi-dimensional, per call and per turn, two-clock, three-valued (§5). No counter is a label. (Replaces v0_1 "one label".)
- **P2 · SIGNAL TRUTH BEFORE LEARNING.** Unchanged: M1 → TOUR-HONESTY → M2 → M3; `router.learnEnabled` stays 0 until they are on master. Unanimous.
- **P3 · MEMORY MAY PROPOSE, PARAMETERIZE AND RANK; IT MAY NEVER AUTHORIZE, OVERRIDE POLICY, OR REPLACE AUTHORITATIVE CURRENT STATE.** The A25 red line stands inside this: learning never changes what a tool DOES (schema, slots, source attribution, merging — `A25 L533`), LEARNED mappings never become obligations (`L534 (3)`); a default plan or a default argument is a PROPOSAL the planner may take; a safety-critical action parameter never comes from memory. (OpenAI wording; Grok's red line preserved.)
- **P4 · ONE PATH: PROPOSAL → GATE → PUBLISH → ROLLBACK.** Unchanged and unanimous. Plus (DeepSeek): a dependency graph evidence → proposal → bundle → published row, so a retracted trace marks every derivative.
- **P5 · SCOPE IS A KEY.** Unchanged, plus: a backend serving several tenants defaults to TENANT/SITE scope for learned routing rows; raw query text never enters a published row — only generalized pattern, alias, category (DeepSeek 2.9). A single user can never teach a shared router (§6 K_users).
- **P6 · ABSENCE IS NOT A NEGATIVE.** Unchanged (K12). Extended: transport/empty/timeout produce NO critique either.
- **P7 · TIME IS FIRST-CLASS.** Every semantic fact carries observed_at · valid_from · valid_to · supersedes · contradicts · source_authority · confidence; the prompt sees only currently-valid facts; decay is per memory class × volatility × evidence freshness, not one half-life. (Replaces v0_1 §6 30-day half-life — now HYPOTHESIS per class.)
- **P8 · INSTRUMENT BEFORE INFLUENCE — AND "HELPED" IS CAUSAL OR ABSENT.** v1 ships offered/used; helped only from shadow replay / switchback with a sequential test; below minimum sample = INCONCLUSIVE, never auto-disable.
- **P9 · DETERMINISM OF THE OFFERED SET — STATED HONESTLY.** Today stage 07 is NOT a pure function of (message, published data, catalog_version, policy_version): it also reads prior-message sticky categories (toolCategories.ts:1695-1698), an LLM frame, and a live semantic-router LLM call that A25 L627 itself calls non-replayable. These are GRANDFATHERED BY NAME until E5 (Δ7). The v1 rule is: NO NEW per-turn input from LONG-TERM stores enters the offered SET. Per-turn recall may enter E5 shadow as an ORDER (ranking) input only, versioned in the trace (memory_snapshot_id, index_version, retrieval_policy_version, candidate_ids + scores). The replay key gains user_id only if that ORDER flag is ever enabled. (OpenAI's "retrieval can be made deterministic" is accepted for ORDER; Grok's "never SET" is accepted for SET.)
- **P10 · MEMORY IS DATA, NEVER INSTRUCTION.** (NEW — OpenAI, Grok, DeepSeek.) Memory content is rendered to the model as quoted, attributed DATA with provenance and age; it can never carry instruction authority; read-time defense checks the retrieved SET (not only each row) against instruction-shaped and cross-row patterns; critique is typed, never free text.

---

## 4 · ARCHITECTURE (v0_2)

### 4.1 Faces (CoALA vocabulary over existing stores) — as v0_1 §4.1, with two changes
- **Experience** splits into two series (D8): `experience_raw` (every sent call incl. empty/error; the census re-probe reads THIS; the table is frozen, not dropped — RULE-49 reader census first) and `experience_clean` (label-true calls only; feeds ranking_policy PROPOSALS through K34). P1 holds: both are derived counters, the label is the record.
- **Semantic** facts become bi-temporal (P7): dossier row {entity, predicate, value, observed_at, valid_from, valid_to, source_trace, superseded_by, confidence}; a work order Open → Closed invalidates the old row; the prompt renders only valid rows.

### 4.2 The ONE learning path (v0_2)
```
turn ──► cwf.trace.v2 event (K35 — MEASURED ABSENT on master, Δ17; SOURCE DECIDED in §9 Track 0/A26-P1: telemetry_events `tool_call` rows (durable; per-call ok/klass/reason, stageTools.ts:1846-1868) + episodes.decision.outcome, OR a new append-only table — NEVER turn_trace_digest (Δ19))
      └► LABEL RECORD, append-only, (trace_id, labelled_at) PK, current_label VIEW
            tool_call_label{trace_id, call_idx, transport_ok, parse_ok, not_empty, answered, latency_bucket}      ← M1, TOUR-HONESTY
            k23_immediate{answered, grounded, cited, no_pii, not_empty}   (5 bits; at turn end)                   ← M2
            k23_settled  = k23_immediate + {no_correction: true|false|UNKNOWN}  (PROVISIONAL until turn t+1 OR timeout; final_at stamped)   ← M2 (window)
            interaction{user_correction: none|explicit, re_ask: bool, reason_code?}   (re_ask ≠ correction) — NEW MECHANISM (Δ9): no correction detector exists today (memoryDistill.ts:33 `user_correction UNDERIVABLE-THIS-PHASE`, :483 `userCorrection = null`); the CarriedResolution seam (stageClarify.ts:549-579) carries an ENTITY, not a correction. Detector = governed locale LEXICON (CompiledLexicon precedent, examScorers.ts), never Turkish tokens in code (NO-HARDCODE 8c).   ← M2
            human{label: up|down|null, reason ∈ {wrong_tool, wrong_facts, wrong_tone, other}, by, at}   — A26 ADDITION to A25 L579 (Δ16); writer = the EXISTING review queue (feedback-triage.ts:61 markReviewed, health-analytics.ts:491 listUnreviewedDown, turn-feedback.ts:64), not a new queue (Δ7 CALLER-ABSENT)   ← M3 (evidence, not override)
      └► CANDIDATE EXTRACTOR: emits memory CANDIDATES each with its OWN evidence (call-level where the kind is per-tool)
      └► PER-KIND ELIGIBILITY (D3), then N/M/K gate (§6), then K34 gate (schema · referential · exam K25 band · reach · canary)
      └► PUBLISH bundle (K21), provenance=LEARNED, version++ ──► stage 07 / 03 / planner read PUBLISHED rows only
      └► ROLLBACK: one click; dependency graph marks derivatives; trace and label stay; proposal → rejected (negative example)
```
Per-kind eligibility table (D3):
| kind | reads | filter |
|---|---|---|
| example | k23_settled + the call-level label of the tool it names | all five immediate bits true ∧ no_correction ≠ false ∧ that call answered ∧ not_empty |
| alias (entity_alias proposal) | interaction.user_correction = explicit with a resolved entity, OR a clean dossier pair | independent of the turn's other calls (OpenAI's "F7" case) |
| base_set | discovery class INITIAL-NEED-MISS (A25 K36) ∧ k23_settled | N/M/K |
| default_plan | procedureEligible episodes' `decision.procedure` repeated (Δ11: `clean` ⇔ calls=0 and has no procedure; the procedure-recall path already feeds the planner: memoryRetrieve.ts:646 → :563 derivePlan) | N/M/K; owner-visible queue |
| ranking_policy | experience_clean deltas | N/M/K; K34 exam; never auto if high-impact |
| negative_example | human.reason ∈ {wrong_tool, wrong_facts} OR explicit correction naming a tool | scoped; reason code required; wrong_tone/other never learn |
| critique | tool_call_label failure of class wrong_tool / wrong_args / schema_mismatch (NEVER transport/empty/timeout) | typed schema §7; prompt face only; shadow-measured before use |
| obligation_candidate | repeated example/negative pattern | NEVER auto-published; queue → owner (P3) |

### 4.3 Which memory feeds which decision point — as v0_1, with three corrections
- Prompt row: offerable = **procedureEligible** (memoryDistill.ts:293-323), the EXISTING predicate — no second predicate is written (Δ11; §12.6). A retraction (human reason or explicit correction) removes offerability regardless.
- Planner row: default_plan proposals come from procedureEligible episodes' decision.procedure (Δ11).
- E5 column: shadow per-turn recall is an ORDER input only; store 9 (vector lane) is parked to the same arm (D13). scout-2 GREEN on the decision itself; what is LOST is named: (i) latency-to-learn = publish cadence; (ii) long-tail phrasing seen once never clears the N/M/K floor and is never compiled; (iii) per-USER tool preference has no home except the prompt face; (iv) a newly mounted backend has zero rows until enough clean turns.
- **MEASUREMENT STARTS BEFORE E5** (Δ8): A25 E3 replays RECORDED inputs only, so an E5 shadow of per-turn recall is impossible unless the recall candidate set is recorded LIVE from now. A26-P1 adds: per turn, record in a DURABLE store (never turn_trace_digest) the tool names the top-n recalled episodes WOULD add to the offered set; metric = rate at which that set contains a not-offered tool that the eventually-clean answer used, vs the compiled-rows arm over the same window. C10 (retired) is re-decided on this log only.

### 4.4 Data model (v0_2; each item = operator migration card + UI in the same card, §13.3/13.4)
- `trace_label` (D9): PK (trace_id, labelled_at); columns for tool_call_label[] (jsonb), k23_immediate, k23_settled (+ final_at), interaction, human (A26 ADDITION to A25 L579, Δ16); `current_label` VIEW = latest row per trace_id. Human rows are new rows. Inherits BY NAME the two existing refusals: synthetic/replay actors (C1-LAW, episodes.sql:76) and clean-agent turns (stageTools.ts:1921 isCleanAgentTurn) (§9a-d).
- **NEW table `learned_proposals`** (Δ12): id, kind (§4.2), backend_id, tenant_key, key, payload jsonb, evidence_trace_ids[], evidence_call_idx[], distinct_users, distinct_conversations, exam_result, status, published_bundle_id, rejected_reason, depends_on[]. `router_proposals` STAYS what it is — a GLOBAL keyword-evidence ledger with `keyword text primary key` and no kind/backend column (20260717120000_router_proposals.sql:38, :44-45, :97-105; toolCategories.ts:1796); eight kinds cannot share one keyword PK, and a PK change would ripple into the learning-snapshot functions (20260812160000_restore_where_true.sql:249, :267). SNAPSHOT SCOPE stated per new table (§6).
- `episodes`: `outcome` recomputed from current_label; PII scrub AT STORE TIME (D15 — today 83/83 turns are stored ungated); `critique` typed jsonb, not text.
- `semantic_memory`: bi-temporal columns (P7); `valid_to` set by supersession; INVALIDATE never deletes.
- `experience_raw` / `experience_clean` (D8, Δ13): the clean view counts the TOOL's own result (klass answered ∧ ¬isEmpty) inside a recency window — never the turn label (which would credit a failing tool in a good turn); returns null on a failed read and [] only on genuine absence (toolCensusRefresh.ts:311-316 skips P3 on any positive, cumulative with no recency — a defect that already hides faults today, fixed by the window). Readers (RULE-49): toolCensusRefresh.ts:442 AND censusToolDoc.ts:200.
- Memory row metadata baseline (OpenAI list, adopted as the minimum): memory_type · scope · tenant_id · user_id? · backend_id? · evidence_trace_ids · source_type · source_authority · observed_at · valid_from · valid_to · supersedes[] · contradicts[] · confidence · support_count · independent_support_count · sensitivity_class · read_policy · allowed_consumers · promotion_state · version · last_used_at.
- Admin UI (Memory tab / Learning Snapshots): proposal queue (kind, evidence, distinct users, exam, publish/reject) · labels view (per turn: call labels, k23 bits, human label+reason, editable → new row) · instrument panel offered/used per face/backend/day (helped only when shadow exists) · rollback list with dependency impact · bi-temporal dossier view (valid/invalid facts).

---

## 5 · THE SIGNAL, SPELLED OUT (v0_2)
| layer | record | true when | NOT a signal |
|---|---|---|---|
| tool call | tool_call_label | transport_ok (M1) ∧ parse_ok ∧ answered ∧ not_empty (observeResult.isEmpty=false) | latency, popularity |
| turn, immediate | k23_immediate | ≥1 answered non-empty call backs the answer (grounded, cited) ∧ no PII ∧ NOT (failures > 0 ∧ an answer shipped) — COUNTERS ONLY; wording detection is forbidden by the owner's ruling at toolOutcomes.ts:286-296 (Δ10) | apology wording; absence of an apology |
| turn, settled | k23_settled | immediate ∧ no explicit correction within the window (detector: governed lexicon, NEW — Δ9); UNKNOWN until the window closes; PROVISIONAL with final_at | a re-ask; "no correction yet" |
| human | human{label, reason} | evidence beside facts: cuts offerability immediately; feeds routing extractor ONLY with reason wrong_tool / wrong_facts | 👍 cannot make transport_ok true; 👎 with wrong_tone learns nothing |
| candidate | per kind (§4.2) | its own evidence rows all true ∧ N/M/K (§6) ∧ not in a held-out exam set — the held-out set is NAMED: E1-a's exam sets (examScorers.ts / data/exam), membership via the exam-set registry | turn-level AND of everything |

Bootstrap expectation, written so the owner is not told "it is not learning" by the sample size (Grok M-A): at ~83 turns/week the LEARNED flow is a TRICKLE; initial routing quality is OWNER-published rows (provenance=OWNER, e.g. the S164 routing_obligation witness); LEARNED is an increment on top.

---

## 6 · POISONING, POPULATION, FORGETTING (v0_2)
- **N/M/K gate for backend- or tenant-scoped LEARNED rows** (HYPOTHESIS, all governed params): N_traces = max(N_min, ceil(f · n_active_users_30d)) with N_min=2, f≈0.15; M_conversations ≥ 2; **K_distinct_users ≥ 2 MANDATORY**. Single-user pilot: candidates stay USER-scoped (prompt face) and are never published to stage 07. High-impact kinds (ranking_policy, default_plan, obligation_candidate): human approval always.
- **Read-time defense (P10)**: the retrieved set is screened for instruction-shaped content and cross-row composition before rendering; memory blocks are rendered as attributed data.
- **Forgetting — EXISTING seams first (Δ14, §12.6)**: TTL = episodes.expires_at + daily hard-delete cron (api/admin/memory-forget.ts:2-4; MEMORY_TTL_DAYS agentParams.ts:654, 90 d, clamp [7,365]; audited memory_audit `forget_tick`) · per-episode delete on request (EpisodesRepository.ts:709, audited `episode_delete`) · reinforce (EpisodesRepository.ts:595) · WHOLE-LAYER wipe/restore = learning_snapshots (20260811120000_learning_snapshots.sql: the learned layer's six tables) — the existing rollback seam. NEW: supersession (bi-temporal facts; episodes by (user, frame, entity set)), retraction (human reason or explicit correction → offerable off; a LEARNED row whose evidence is all retracted is PROPOSED for rollback — proposed, never automatic), backend-unmount deletion, tenant offboarding, user-removal cascade into LEARNED rows (§9a-c).
- **Decay is a PROPOSAL, never a runtime weight** (Δ14): A25 L259 rules that ranking_policy is PUBLISHED data with no runtime learned weight (a top-k reorder changes the offered set → passes the gate). Therefore decay = a periodic proposal that re-publishes decayed weights through K34; per class × volatility half-lives are governed params (HYPOTHESIS).
- **Snapshot / restore interaction** (Δ14): `learning_restore` / `learning_wipe` rewrite router_proposals and tool_category_cache in one SECURITY DEFINER transaction with NO K34 gate. RULE: trace_label and learned_proposals join snapshot scope as APPEND-ONLY evidence (restore never deletes them); PUBLISHED LEARNED bundles are NOT in snapshot scope — they move only through K21 publish/rollback, so a restore can never silently republish or unpublish learned routing state. Bundle-level rollback (new) and whole-layer restore (existing) coexist: restore is the disaster lever, rollback is the per-change lever.

## 7 · CRITIQUE SCHEMA (D7)
`{tool, error_class ∈ {wrong_tool, wrong_args, schema_mismatch}, arg_fingerprint, entity_ids[], scope ∈ {this_entity | this_tool}, observed_at, expires_at, evidence_trace_id}` — scope defaults to this_entity; this_tool requires N/M/K; rendered as "at T, with args A, tool Y returned Z — verify before reuse", never "do not use Y"; produced by the classifier from the trace, never by an LLM essay; enters the prompt face only after a shadow honesty delta (P8).

## 8 · ACCEPTANCE — MEMORY-1 (v0_2)
| face | harness | threshold (cwf-sota-definition v1_5 Tier C, RATIFIED; V2 addition = PROPOSED, needs a definition amendment) |
|---|---|---|
| prompt / user episodic | **CWF-shaped MEMORY-1 set** (Δ15): LongMemEval's five-ability TAXONOMY (extraction · multi-session · temporal · knowledge update · abstention) instantiated on the FIXTURE vocabulary under a task-namespaced SYNTHETIC identity whose episodes live in a task-namespaced store (AgentBeats task_id namespacing, learning_snapshots.sql:18-20) — because episodes REFUSE synthetic actors (C1-LAW, 20260730150000_episodes.sql:76) and store no conversational facts (deterministic distill, no assistant content). Scored on ANSWER TEXT with the existing lexicon machinery (examScorers.ts:150-164 splitSentences / sentenceViolation, CompiledLexicon); abstention = no unhedged memory claim in the answer, never "chip absent". The published LongMemEval v1 number is reported SEPARATELY as an external reference, labelled a different task (chat-history QA). | abstention ≥ top quartile; overall ≥ median (RATIFIED thresholds apply to the CWF-shaped set; ratification of that reading is the owner's, SOTA-1) |
| semantic / workflow | **LongMemEval-V2** (primary for CWF's class) | ≥ median (PROPOSED) |
| procedural → tool action | Mem2ActBench | ≥ median |
| internal instrument | chip + memory_block_present on the trace; false_memory_rate (LLM-judge + human sample) when no memory applies | M4 instrument, NOT the acceptance |
K12 zero and contamination CI tests unchanged. E5 metrics (D12): head/tail Recall@k by phrasing-frequency tercile · time-to-first-correct-route (compilation hours vs shadow same-turn) · leakage: user A episode changing user B's offered set = 0 · shadow recall is ORDER only.

## 9 · MIGRATION (v0_2) — Track 0 added; steps single-landing; live routing untouched before its E-stage exit
| step | content | depends on |
|---|---|---|
| **Track 0** | DONE by scout-2 (Δ17, Δ13): no trace.v1/v2 builder, no trace_label, no K23 code on master; tool_experience readers = toolCensusRefresh.ts:442 + censusToolDoc.ts:200; episodes stored ungated for 83/83 turns with no store-time PII scrub. REMAINING: name the Turkish-text PII scrubber and its measured recall (§9a-a) | — |
| M1 · TOUR-HONESTY · M2 | as v0_1; M2 now carries tool_call_label + k23_immediate/k23_settled + re_ask ≠ correction | M1 in scout review; TOUR-HONESTY re-cut (PR 639 → -2) |
| M3 | human{label, reason} as evidence; offerability cut; review queue UI | M2 |
| M4 | offered/used instrument + panel; helped only via shadow; abstention slice | M2 |
| A26-P1 | trace_label (D9) with its SOURCE DECIDED (Δ19): telemetry_events `tool_call` rows + episodes.decision.outcome (durable) — or a new append-only table if a field is missing; never turn_trace_digest · store-time PII scrub · correction-detector lexicon (governed) · the LIVE recall-candidate log for the E5 measurement (Δ8) · candidate extractor skeleton (no publish) | Track 0, M1–M3 |
| A26-P2 | learned_proposals table (Δ12) + per-kind eligibility + N/M/K (K_users) + K34 generalised + §9a security statements enforced (authorization key, erasure cascade, tenancy columns); first LEARNED example published and rolled back on the FIXTURE backend | P1 |
| A26-P3 | Graph KB containsAmong → stage 03; bi-temporal dossier; two experience series; tool_category_cache write retired | P2 |
| A26-P4 (E5) | shadow ORDER-lane recall incl. vector lane; decay/poisoning params tuned by measurement; C10 retired | P3, A25 E3 |

## 9a · SECURITY, TENANCY, ERASURE, REPLAY, COST — REQUIRED STATEMENTS BEFORE A26-P2 (Δ18; scout-2 §9)
- (a) **Cross-user leakage through LEARNED text.** Compiled `example`/`alias` rows are backend-scoped and reach every user's routing and, via tool-profile examples, prompts. `router_proposals.sample_query` already stores the user's message truncated to 200 chars (router_proposals.sql:57-58). RULE: raw user text NEVER enters a published row — a published example is a PARAPHRASE produced by the intent generator (A25 K40); K23 `no_pii` is backed by a NAMED Turkish-text PII scrubber with a measured recall before P2, or the paraphrase rule stands alone.
- (b) **Authorization.** An example learned from a user with access to backend X must not surface to a user without it. Offering is K10-gated; prompt-face critiques and dossier blocks are NOT routing and must carry the same backend/tenant key and be filtered by the reader's scope (RBAC backend scopes exist: admin User Management).
- (c) **Erasure completeness.** User removal cascades into evidence_trace_ids AND into LEARNED rows derived from that user's text: a row whose evidence becomes empty is proposed for rollback; a paraphrased row with ≥ K_users remaining evidence survives (it is not that user's text).
- (d) **Synthetic, task and clean-agent turns.** trace_label and the extractor inherit BY NAME the two refusals that already exist: synthetic/replay actors (C1-LAW, episodes.sql:76) and clean-agent turns (stageTools.ts:1921 isCleanAgentTurn); otherwise the AgentBeats zero-cross-run rule breaks.
- (e) **Replay.** A replayed turn pins the LEARNED bundle version live at the time (K35 catalog_version/policy_version) — including after a rollback removed it. Rolled-back bundles stay readable for replay; rollback un-publishes, never deletes.
- (f) **Cost.** Per-turn label computation, the next-turn detector pass, per-proposal K34 exams (a routing exam per proposal) and canary are BUDGETED: proposals are batched per exam run; label computation is O(calls); the detector runs once per turn on the lexicon. Numbers measured in P1 before P2 opens.
- (g) **Tenancy columns.** router_proposals and tool_category_cache have no tenant or backend key today. Every NEW learned table (trace_label via its trace, learned_proposals, experience views) carries backend_id and tenant_key columns; learned rows are keyed, not filtered (P5).
- (h) **NO-HARDCODE traps named** (scout-2 §8): the critique sentence template and the "memory used" chip text are prompt.segment / chatSurface.ts data (A25 L265; OUTAGE_CHIP_TEXT precedent), never inline; the correction lexicon is governed per locale; A25 L531's example plan (a backend-specific shape) is never seeded — it can only arrive as that backend's own LEARNED proposal; new tests never copy ctx builders carrying a backend id literal.

## 10 · RULINGS ON THE REVIEWERS' DISAGREEMENTS (Architect's proposal; the owner rules)
- Per-turn recall into stage 07 (OpenAI: bounded reranker lane; Grok/DeepSeek/Gemini: not in v1): **v1 NO for the SET; E5 shadow YES for ORDER** (P9). Both sides' measurements are in §8.
- Vendor memory store (OpenAI: allowed as engine; Grok: reject): **principle corrected, adoption rejected** — governance/write policy/scope/provenance/rollback stay in CWF; the storage engine is replaceable in principle; no external store in v1 because the existing stores suffice and every new store is a new attack surface (P10).
- P3 wording (OpenAI softens; Grok keeps): **both** — propose/parameterize/rank allowed, authorize/override/replace-state forbidden, A25 red line intact.
- Human override (all three against): **accepted** — evidence channel with reason code.

## 11 · CLAIMS REGISTER (v0_3)
C1 MEASURED (corrected, Δ6) · stage 07 precedes stage 12 (pipeline.ts:22, :24): LONG-TERM stores do not reach routing; short-term history DOES (sticky, toolCategories.ts:1695-1698), and episodes reach stage 03 when frameRouting is on.
C2 MEASURED · tool_category_cache is the only LEARNED store read by stage 07 (toolCategories.ts:1578/1585/1661/1698); learn gate stageTools.ts:1882 → :1979 with no outcome test; brake published 0 (Architect's live read).
C3 MEASURED · `result.isError` unread in mcpClient.ts:272-369 @6a3824c2b5efd1764be178d05ba647feec06927c; `transportError` never passed at stageTools.ts:1718-1723.
C4 MEASURED · `[]` classified `answered` (toolResultClass.ts:169-192); recordToolSuccess on it (stageTools.ts:1779-1781; toolExperienceFlush.ts:87).
C5 MEASURED (corrected, Δ5) · a failures>0 ∧ successes=0 turn IS `failed` (memoryDistill.ts:168, :170); toolFailures (:179) unused when successes ≥ 1; every tool-bearing non-failed turn is `unproven` (:187); the S161 tour turn was `unproven` because its failures counted as successes (F1/F2).
C6 MEASURED · parentsOf/containsAmong defined only (GraphKbReader.ts:96, :127); router_proposals readers are off-turn (admin ×2, routerAbLens.ts:10).
C7 MEASURED (code) · turn_feedback readers: feedback.ts:66, feedback-triage.ts:61, health-analytics.ts:491, turn-feedback.ts:64, HealthGovernanceRepository.ts:178-197 — none in a learning path; DB half (10 rows, 0 reviewed) = Architect's read.
C8 RELAYED (faithful per scout-2 with two exceptions now applied: human fields marked as additions; decay reframed as proposal).
C9 RELAYED · MemToolAgent numbers as reported.
C10 RETIRED.
C11 HYPOTHESIS · per-class half-lives; N/M/K parameters.
C12 MEASURED ABSENT · no trace.v1/v2 builder, no trace_label, no K23 code; turn_trace_digest display-only by law.
C13 HYPOTHESIS · K_users ≥ 2 suffices as the single-user brake in a ≤10-user factory.
C14 RELAYED · the 2026 memory-security results (§2) apply to CWF's prompt face as stated.
C15 PROPOSED · LongMemEval-V2 enters cwf-sota-definition as a Tier C criterion; the CWF-shaped MEMORY-1 set (§8) is the acceptance instrument — both need the owner's ratification (SOTA-1).
C16 MEASURED · router_proposals: keyword PK, no kind/backend column; snapshot functions serialize it by row type (Δ12).
C17 MEASURED · no correction detector exists (memoryDistill.ts:33, :483); CarriedResolution carries an entity (stageClarify.ts:549-579).

## 12 · STILL OPEN (for scout-2 and the owner)
1. Track 0 results (K35 builder, tool_experience readers, PII at store).
2. The label-window length (next turn vs 24 h) — governed param, HYPOTHESIS.
3. Whether LongMemEval-V2 can be ratified into the SOTA definition this session (SOTA-1: a criterion enters by ruling, not by draft).

END · A26_cwf-memory-and-learning-architecture-v0_3
