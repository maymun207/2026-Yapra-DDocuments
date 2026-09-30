# A26 · CWF Memory & Learning Architecture — v0_2 (DRAFT; supersedes v0_1; still under scout-2 adversary review)

FROM: Architect, S164, 2026-09-30 05:5x TSİ. STATUS: DRAFT, not in force. v0_1 went to four external reviewers on the owner's hand — Gemini · OpenAI · Grok · DeepSeek (A26-Reviews, 2026-09-30) — and to scout-2 (ORDER-SCOUT-REVIEW-A26-S164-1, reply pending). v0_2 applies the external deltas; v0_3 will apply scout-2's measured findings and the owner's ruling.
CHANGE LOG v0_1 → v0_2 (every delta names its reviewer; S112-YASA-1 for the owner's contributions, same discipline for external ones): D1 label = multi-dimensional, two-clock, three-valued (OpenAI, Grok, DeepSeek) · D2 call-level label beside the turn label — credit assignment (OpenAI, Grok, DeepSeek) · D3 candidate-level eligibility per kind, not turn-level K23 AND (OpenAI, Grok) · D4 human feedback is an evidence channel with a reason code, never an override of observed facts (OpenAI, Grok, DeepSeek) · D5 poisoning gate = distinct USERS + population-relative counts; single-user pilot learns in user scope only (Grok, DeepSeek, OpenAI) · D6 bi-temporal facts on the semantic face; decay per memory class × volatility (Grok, OpenAI) · D7 memory trust layer: memory content never gains instruction authority; typed critique, no free text, no critique from transport/empty (OpenAI, Grok, DeepSeek) · D8 two experience series (raw → census, clean → ranking proposals) (Grok, DeepSeek) · D9 trace_label PK (trace_id, labelled_at) + current view (Grok) · D10 "helped" is causal or absent; v1 measures offered/used; no auto-disable (Grok, DeepSeek) · D11 MEMORY-1 harness: LongMemEval-V2 primary, v1 + abstention separate, Mem2ActBench for the procedural face; chip = instrument (OpenAI, Grok, DeepSeek) · D12 C10 dropped; E5 metrics fixed: head/tail Recall@k, time-to-first-correct-route, leakage = 0, shadow recall as ORDER input only (Grok, OpenAI, DeepSeek) · D13 vector lane (store 9) explicitly parked to E5 (Grok) · D14 K35 existence = Track 0 (Grok, DeepSeek) · D15 PII scrub at store time for episodes (Grok) · D16 rollback dependency graph evidence → proposal → bundle (DeepSeek) · D17 tenant-scoped default for multi-tenant backends; raw query text never in a published row (DeepSeek) · D18 P3 reworded: memory may propose, parameterize and rank; never authorize, override policy or replace authoritative state (OpenAI; Grok keeps the A25 red line — both kept, see P3) · D19 vendor store: principle corrected — governance stays in CWF, the storage engine is replaceable; still NOT adopted in v1 (OpenAI vs Grok; ruling in §10) · D20 citations: CoALA (four faces), Reflexion (critique), MemToolAgent numbers "as reported" (Grok). Gemini: no delta; concurs with §4.3 and the M1-first order.
EVIDENCE DISCIPLINE unchanged: MEASURED / RELAYED / HYPOTHESIS on every claim; code lines at `ee12161ecad43b338489e85fcb73df1e08aa8ac0` unless marked `@6a3824c2b5efd1764be178d05ba647feec06927c`. Grok's evidence finding is accepted: v0_1 left §4.2, §4.3 v1 column, §6 numbers and §7 thresholds untagged — v0_2 tags them.

---

## 0 · THESIS (unchanged in substance, sharpened)
CWF remembers but does not learn, because the signal that says "this succeeded" is false in three measured ways and the only learned routing store writes without a success test. A26 makes the signal true FIRST (M1 → TOUR-HONESTY → M2), gives it RESOLUTION (per call, per candidate, two clocks) and EVIDENCE STRUCTURE (facts ≠ quality ≠ utility), then routes every learned change through the ONE proposal → gate → publish → rollback path A25 defines. In v1 memory reaches tool routing only as PUBLISHED data; per-turn recall is measured in E5 shadow as an ORDER input, never a SET input.

---

## 1 · MEASURED STATE — unchanged from v0_1 §1 (stores table, F1/F2/F3, counts). Not repeated; v0_1 §1 is incorporated by reference and re-measured by scout-2 (ORDER items 1). One addition (Grok M-F): store 9 (vector lane, `vector.toolRetrievalMode`=0 MEASURED live) is now addressed in §8 E5 rather than left silent.

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
- **P9 · DETERMINISM OF THE OFFERED SET.** Stage 07's offered SET is a function of (message, published data, catalog_version, policy_version). Per-turn recall may enter E5 shadow as an ORDER (ranking) input only, versioned in the trace (memory_snapshot_id, index_version, retrieval_policy_version, candidate_ids + scores). The replay key gains user_id only if that ORDER flag is ever enabled. (OpenAI's "retrieval can be made deterministic" is accepted for ORDER; Grok's "never SET" is accepted for SET.)
- **P10 · MEMORY IS DATA, NEVER INSTRUCTION.** (NEW — OpenAI, Grok, DeepSeek.) Memory content is rendered to the model as quoted, attributed DATA with provenance and age; it can never carry instruction authority; read-time defense checks the retrieved SET (not only each row) against instruction-shaped and cross-row patterns; critique is typed, never free text.

---

## 4 · ARCHITECTURE (v0_2)

### 4.1 Faces (CoALA vocabulary over existing stores) — as v0_1 §4.1, with two changes
- **Experience** splits into two series (D8): `experience_raw` (every sent call incl. empty/error; the census re-probe reads THIS; the table is frozen, not dropped — RULE-49 reader census first) and `experience_clean` (label-true calls only; feeds ranking_policy PROPOSALS through K34). P1 holds: both are derived counters, the label is the record.
- **Semantic** facts become bi-temporal (P7): dossier row {entity, predicate, value, observed_at, valid_from, valid_to, source_trace, superseded_by, confidence}; a work order Open → Closed invalidates the old row; the prompt renders only valid rows.

### 4.2 The ONE learning path (v0_2)
```
turn ──► cwf.trace.v2 event (K35 — EXISTENCE MEASURED IN TRACK 0, §8)
      └► LABEL RECORD, append-only, (trace_id, labelled_at) PK, current_label VIEW
            tool_call_label{trace_id, call_idx, transport_ok, parse_ok, not_empty, answered, latency_bucket}      ← M1, TOUR-HONESTY
            k23_immediate{answered, grounded, cited, no_pii, not_empty}   (5 bits; at turn end)                   ← M2
            k23_settled  = k23_immediate + {no_correction: true|false|UNKNOWN}  (frozen at next turn OR 24 h)       ← M2 (window)
            interaction{user_correction: none|explicit, re_ask: bool, reason_code?}   (re_ask ≠ correction)        ← M2
            human{label: up|down|null, reason ∈ {wrong_tool, wrong_facts, wrong_tone, other}, by, at}             ← M3 (evidence, not override)
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
| default_plan | clean episode `decision.procedure` repeated | N/M/K; owner-visible queue |
| ranking_policy | experience_clean deltas | N/M/K; K34 exam; never auto if high-impact |
| negative_example | human.reason ∈ {wrong_tool, wrong_facts} OR explicit correction naming a tool | scoped; reason code required; wrong_tone/other never learn |
| critique | tool_call_label failure of class wrong_tool / wrong_args / schema_mismatch (NEVER transport/empty/timeout) | typed schema §7; prompt face only; shadow-measured before use |
| obligation_candidate | repeated example/negative pattern | NEVER auto-published; queue → owner (P3) |

### 4.3 Which memory feeds which decision point — as v0_1, with §4.3's HYPOTHESIS column corrected: E5 shadow per-turn recall is an ORDER input only; store 9 (vector lane) is parked to the same E5 arm (D13).

### 4.4 Data model (v0_2; each item = operator migration card + UI in the same card, §13.3/13.4)
- `trace_label` (D9): PK (trace_id, labelled_at); columns for tool_call_label[] (jsonb), k23_immediate, k23_settled, interaction, human; `current_label` VIEW = latest row per trace_id. Human rows are new rows.
- `router_proposals`: kinds of §4.2; `evidence_trace_ids[]`, `evidence_call_idx[]`, `distinct_users`, `distinct_conversations`, `exam_result`, `published_bundle_id`, `rejected_reason`, `depends_on[]`.
- `episodes`: `outcome` recomputed from current_label; PII scrub AT STORE TIME (D15 — today 83/83 turns are stored ungated); `critique` typed jsonb, not text.
- `semantic_memory`: bi-temporal columns (P7); `valid_to` set by supersession; INVALIDATE never deletes.
- `experience_raw` / `experience_clean` (D8).
- Memory row metadata baseline (OpenAI list, adopted as the minimum): memory_type · scope · tenant_id · user_id? · backend_id? · evidence_trace_ids · source_type · source_authority · observed_at · valid_from · valid_to · supersedes[] · contradicts[] · confidence · support_count · independent_support_count · sensitivity_class · read_policy · allowed_consumers · promotion_state · version · last_used_at.
- Admin UI (Memory tab / Learning Snapshots): proposal queue (kind, evidence, distinct users, exam, publish/reject) · labels view (per turn: call labels, k23 bits, human label+reason, editable → new row) · instrument panel offered/used per face/backend/day (helped only when shadow exists) · rollback list with dependency impact · bi-temporal dossier view (valid/invalid facts).

---

## 5 · THE SIGNAL, SPELLED OUT (v0_2)
| layer | record | true when | NOT a signal |
|---|---|---|---|
| tool call | tool_call_label | transport_ok (M1) ∧ parse_ok ∧ answered ∧ not_empty (observeResult.isEmpty=false) | latency, popularity |
| turn, immediate | k23_immediate | ≥1 answered non-empty call backs the answer (grounded, cited) ∧ no PII | apology absence alone |
| turn, settled | k23_settled | immediate ∧ no explicit correction within the window; UNKNOWN until the window closes | a re-ask; "no correction yet" |
| human | human{label, reason} | evidence beside facts: cuts offerability immediately; feeds routing extractor ONLY with reason wrong_tool / wrong_facts | 👍 cannot make transport_ok true; 👎 with wrong_tone learns nothing |
| candidate | per kind (§4.2) | its own evidence rows all true ∧ N/M/K (§6) ∧ not in a held-out exam set | turn-level AND of everything |

Bootstrap expectation, written so the owner is not told "it is not learning" by the sample size (Grok M-A): at ~83 turns/week the LEARNED flow is a TRICKLE; initial routing quality is OWNER-published rows (provenance=OWNER, e.g. the S164 routing_obligation witness); LEARNED is an increment on top.

---

## 6 · POISONING, POPULATION, FORGETTING (v0_2)
- **N/M/K gate for backend- or tenant-scoped LEARNED rows** (HYPOTHESIS, all governed params): N_traces = max(N_min, ceil(f · n_active_users_30d)) with N_min=2, f≈0.15; M_conversations ≥ 2; **K_distinct_users ≥ 2 MANDATORY**. Single-user pilot: candidates stay USER-scoped (prompt face) and are never published to stage 07. High-impact kinds (ranking_policy, default_plan, obligation_candidate): human approval always.
- **Read-time defense (P10)**: the retrieved set is screened for instruction-shaped content and cross-row composition before rendering; memory blocks are rendered as attributed data.
- **Forgetting**: supersession by bi-temporal validity (facts) and by (user, frame, entity set) (episodes); retraction via human reason or explicit correction → offerable off + dependency-graph impact; decay per class × volatility (alias: years; preference: months; tool latency: hours — each a governed param, HYPOTHESIS); deletion on user request / user removal / backend unmount / tenant offboarding (operator card, counts before and after).

## 7 · CRITIQUE SCHEMA (D7)
`{tool, error_class ∈ {wrong_tool, wrong_args, schema_mismatch}, arg_fingerprint, entity_ids[], scope ∈ {this_entity | this_tool}, observed_at, expires_at, evidence_trace_id}` — scope defaults to this_entity; this_tool requires N/M/K; rendered as "at T, with args A, tool Y returned Z — verify before reuse", never "do not use Y"; produced by the classifier from the trace, never by an LLM essay; enters the prompt face only after a shadow honesty delta (P8).

## 8 · ACCEPTANCE — MEMORY-1 (v0_2)
| face | harness | threshold (cwf-sota-definition v1_5 Tier C, RATIFIED; V2 addition = PROPOSED, needs a definition amendment) |
|---|---|---|
| prompt / user episodic | LongMemEval v1, abstention reported SEPARATELY (the `_abs` items) | abstention ≥ top quartile; overall ≥ median |
| semantic / workflow | **LongMemEval-V2** (primary for CWF's class) | ≥ median (PROPOSED) |
| procedural → tool action | Mem2ActBench | ≥ median |
| internal instrument | chip + memory_block_present on the trace; false_memory_rate (LLM-judge + human sample) when no memory applies | M4 instrument, NOT the acceptance |
K12 zero and contamination CI tests unchanged. E5 metrics (D12): head/tail Recall@k by phrasing-frequency tercile · time-to-first-correct-route (compilation hours vs shadow same-turn) · leakage: user A episode changing user B's offered set = 0 · shadow recall is ORDER only.

## 9 · MIGRATION (v0_2) — Track 0 added; steps single-landing; live routing untouched before its E-stage exit
| step | content | depends on |
|---|---|---|
| **Track 0** | MEASURE: does the cwf.trace.v2 builder (K35) exist on master? who reads `tool_experience` (RULE-49 census)? episodes PII at store time? | — (scout order; C12) |
| M1 · TOUR-HONESTY · M2 | as v0_1; M2 now carries tool_call_label + k23_immediate/k23_settled + re_ask ≠ correction | M1 in scout review; TOUR-HONESTY re-cut (PR 639 → -2) |
| M3 | human{label, reason} as evidence; offerability cut; review queue UI | M2 |
| M4 | offered/used instrument + panel; helped only via shadow; abstention slice | M2 |
| A26-P1 | trace_label (D9) + store-time PII + candidate extractor skeleton (no publish) | Track 0, M1–M3 |
| A26-P2 | per-kind eligibility + N/M/K (K_users) + K34 generalised; first LEARNED example published and rolled back on the FIXTURE backend | P1 |
| A26-P3 | Graph KB containsAmong → stage 03; bi-temporal dossier; two experience series; tool_category_cache write retired | P2 |
| A26-P4 (E5) | shadow ORDER-lane recall incl. vector lane; decay/poisoning params tuned by measurement; C10 retired | P3, A25 E3 |

## 10 · RULINGS ON THE REVIEWERS' DISAGREEMENTS (Architect's proposal; the owner rules)
- Per-turn recall into stage 07 (OpenAI: bounded reranker lane; Grok/DeepSeek/Gemini: not in v1): **v1 NO for the SET; E5 shadow YES for ORDER** (P9). Both sides' measurements are in §8.
- Vendor memory store (OpenAI: allowed as engine; Grok: reject): **principle corrected, adoption rejected** — governance/write policy/scope/provenance/rollback stay in CWF; the storage engine is replaceable in principle; no external store in v1 because the existing stores suffice and every new store is a new attack surface (P10).
- P3 wording (OpenAI softens; Grok keeps): **both** — propose/parameterize/rank allowed, authorize/override/replace-state forbidden, A25 red line intact.
- Human override (all three against): **accepted** — evidence channel with reason code.

## 11 · CLAIMS REGISTER (v0_2) — C1–C9 as v0_1 (C9 wording corrected); C10 RETIRED (Grok); C11 → per-class HYPOTHESES (§6); C12 → Track 0; NEW C13 HYPOTHESIS · K_users ≥ 2 suffices as the single-user brake in a ≤10-user factory; NEW C14 RELAYED · the 2026 memory-security results (§2) apply to CWF's prompt face as stated; NEW C15 PROPOSED · LongMemEval-V2 enters cwf-sota-definition as a Tier C criterion (needs the owner's ratification, SOTA-1).

## 12 · STILL OPEN (for scout-2 and the owner)
1. Track 0 results (K35 builder, tool_experience readers, PII at store).
2. The label-window length (next turn vs 24 h) — governed param, HYPOTHESIS.
3. Whether LongMemEval-V2 can be ratified into the SOTA definition this session (SOTA-1: a criterion enters by ruling, not by draft).

END · A26_cwf-memory-and-learning-architecture-v0_2
