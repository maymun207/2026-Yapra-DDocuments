# CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1

Measured 2026-09-15T20:0x-20:4xZ by the Architect against master `abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb`
(owner's clone, `origin/master` = anchor) and the live DB (`fjbrkimwvtpwoxhziidh`, `domain_rules` PUBLISHED rows).
Source documents re-read in full: the sixteen files of `Claude_Duzenli_Arsiv/yapra-mimari-documents/` (latest of each
supersedes-chain is binding: A23 understanding-layer v1_4 LOCKED - A23 component v1_2 - A23 turn-sequence v1_1 -
execution-runbook v1 - ir-sequence-logic v1 (Path A) - ir-pathb-hybrid-logic v1_3 (Path B, IR-4 future contract) -
grand-sequence-flow v1_2 (a real trace cross-check, 2026-07-20) - control-plane blueprint v2_1 - OA-10 UI scope v1 -
block-diagram v1 (derived view of v1_2)).

Every "LIVE / BUILT-NOT-WIRED / ABSENT" verdict below names its instrument. Owner's question, three parts.

## 1 - THE ARCHITECTURE, IN ONE PARAGRAPH EACH

**Understanding layer (A23 v1_4).** The turn is a FLOW over an append-only, typed, attributed `turn_context` that
carries confidence (GWT / blackboard, deterministic hard-competition, not softmax). Two LLM touches only: 2 IR router
(captures surface: frame{action-object-entity_ref[]-metric-time} + per-slot confidence, never types, never routes by
judgement) and 8 main LLM (answers over RESOLVED data + LABELLED uncertainty; may not bind entities, choose scope, write
attributions or invent confidence). Between them, deterministic rooms: 3 mention typer (negative classifier, managed
pattern rows), 4 resolve (channel-1 TR-fold+prefix+DL<=2, channel-2 BM25 name+alias, RRF fusion; search space = scope of
filled anchors read from the coverage graph G with four queries ancestors/children/roots/in_scope), 5 diagnosis (status
report only: s1<tau->NIL - s1-s2>=beta->LINK - else AMBIGUOUS; anchor fullness; carrier-ness; tau/beta governed rows), 6 execution
decision (NEW authority; the only cancel form is "do not call the model"; LINK->resolve+attribute - AMBIGUOUS+carrier->
offer options from the anchor - AMBIGUOUS+not-carrier->best candidate, labelled - NIL+carrier->NOTIFY, not ask -
NIL+not-carrier->drop visibly - scope: explicit/signalled->use+attribute, neither->ASK closed options), 7 tool retrieval
(Yol A (action x object) table today; Yol B hybrid later), 9 grounding+render (attributions read FROM the flow). P3c
correction ("hayir, KB7") is a NEW full-pipeline turn that reads a persistent minimal LAST-RESOLUTION SLICE (cross-turn
carrier, A-10) at 2; 6 never sees raw text. L5 entity-miss ledger turns every NIL/AMBIGUOUS into labelled data ->
proposal -> human+eval-gate. Measurement constitution: 8-line room card + triple evidence (room metric, neighbour
contract, useful-turn ratio). Build order 9: 0 F169 flush - 1 MEASURE (Recall@k, set width) - 2 turn_context
skeleton - 3 5+6 machine + carrier + P3c (tau/beta DECLARED not calibrated) - 4 3 typer + 4 BM25 + RRF - 5 L5 + tau/beta
calibration - 6 keyword-map role change + router_proposals loop - 7 question budget + AUROC.

**IR Path A / Path B.** Path A: normalizer (temp-0 small LLM) -> armor (Zod+enum whitelist+cap) -> resolvers (governed
alias table exact-only; time parser with governed shift boundaries) -> tool resolver = pure (action x object) table union
ALWAYS_INCLUDE -> prompt assembly with resolved slots -> main LLM -> deterministic validators. Path B (IR-4, future): on
core-table MISS, canonical frame terms (never raw text) -> bge-m3 dense+sparse -> Qdrant tenant collection -> RRF ->
threshold -> OPA fail-closed policy filter -> candidates union ALWAYS_INCLUDE; zero new LLM calls; retrieval-miss ledger;
Yol B->Yol A promotion by one governed row. Four-member empty!=zero family in routing: ALT-A (ambiguous/unresolved
alias), ALT-B (floor ladder), ALT-C (retrieval empty), ALT-D (COMMAND x exposure-ungoverned).

**Control plane (blueprint v2_1 + OA-10).** Buy the body (OTel GenAI semconv + self-hosted Langfuse: trace tree,
prompt/LLM replay, datasets, experiments), build four lenses (semconv instrumentation with redaction + force-flush;
domain-stage replay task-functions; deterministic scorers empty!=zero/count-integrity/scope-authority; the
governance-integrated home). Two identity bans: no vector in the knowledge CORE; no LLM-as-judge at runtime (offline
advisory only). OA-10: GOVERN plane (Rules, Kinds, Providers/MCP/Routing/Users) vs MICROSCOPE plane (Inspect, Tweak,
Replay). Three uncorrelated ids folded into one OTel trace id (RULE-28).

## 2 - WHAT IS IN THE CODE TODAY -- MEASURED

| Architecture element | State at master | Instrument |
|---|---|---|
| 2 IR router frame (`irFrame.ts`, Zod+enum armor, per-turn `ir_frame`) | LIVE and ROUTING (not shadow any more) | `router.frameEnabled=1`, `router.frameRouting=1` v4 published 2026-08-18; trace `basis:"frame"` on tonight's turns |
| 7 Yol A (action x object) table | LIVE -- `deriveCategories.ts` MATRIX + `HINT_AUGMENTED_OBJECTS` (LINE, ZONE only) + metric floor | read; tonight's turn matched `production` only for ORDER x scrap |
| Semantic router (category LLM) + keyword floor + ALWAYS_INCLUDE | LIVE, primary path `semantic`, 1500 ms timeout | `router.enabled=1`, `router.timeoutMs=1500`, `router.maxCategories=4` |
| 4 resolve channel-1 (exact->prefix->DL<=2 over `entity_registry`, observed aliases) | LIVE -- `resolveEntityRef.ts`, called from `stageClarify.ts` | import census |
| 4 channel-2 BM25 + RRF fusion | ABSENT on the entity path. `pathB/bm25.ts` exists; its only importer is `vectorLane/encoder.ts` (tokenizer) | import census |
| 3 mention typer (managed pattern rows) | ABSENT -- no module, no rule kind | grep `typer` -> 0 |
| 5 diagnosis machine (`entityDiagnosis.ts`: tau-first order, LINK/NIL/AMBIGUOUS, attribution record) | BUILT, NOT WIRED -- its own header says "imported by nobody on the live turn path" (PHASE-DIAGNOSIS-DECISION-SPEC-1 scope law); only importer `executionDecision.ts` | import census |
| 6 execution decision table (`executionDecision.ts`, carrier axis) | BUILT, NOT WIRED -- importers: `entityDiagnosis.ts`, `backends/catalogVerify.ts` (a verify script), nobody on the turn path | import census |
| tau / beta governed rows | NOT PRESENT in `agent.param` (declared in code comments only) | `domain_rules kind_id='agent.param'` full list read |
| Live clarify path actually running | `computeClarification.ts` + `askOnUnresolved.ts` + `stageClarify.ts` (three-state verdict resolved/unresolved/ambiguous; ask-after-discovery PR 549; no-layer->literal PR 564; clarify span PR 560) | code + tonight's `stages->'03'` bytes |
| Scope gate (implicit time scope signal table, D-N5/D-N6) | PARTIAL: `resolveNudgeOnTimeUnclear.ts` exists and is wired, but the valve is OFF | `router.nudgeOnTimeUnclear=0` published 2026-08-29 |
| Time resolution | LIVE as a MODEL-CALLED local tool `resolve_time_range` with governed `time.shiftBoundaries=0,8,16` -- not the pre-LLM deterministic slot the IR doc draws (grand-flow section 4 already recorded this divergence) | trace 2026-07-20 + params |
| `turn_context` contribution triple (value-confidence-producer), append-only, weight declaration | ABSENT -- `turn/context.ts` is an 80-line bag with no confidence/producer fields | grep |
| Cross-turn carrier / last-resolution slice (A-10, P3c) | ABSENT -- no module, no table | grep `lastResolution|crossTurn|resolutionSlice` -> 0 |
| L5 entity-miss ledger | ABSENT -- no table, no module | grep -> 0; migrations grep -> 0 |
| Coverage graph G (4 queries) | PARTIAL: `entity_topology_edges` + `GraphKbReader.parentsOf/containsAmong` exist; NO importer anywhere (CALLER-ABSENT, carried since S134) | import census |
| Governed alias table `armes.entity_alias` (exact-only) | LIVE, merged before mirror aliases in `stageClarify.ts` | code header |
| Planner (frame spoken back as a plan, drift nudge) | LIVE and ON -- not in the A23 docs at all (PHASE-PLANNER-0, S89) | `planner.enabled=1`, `planner.replanNudgeMax=1` |
| Semantic memory (B3/MEMORY-1) | LIVE -- `memoryRetrieve.ts`, `agent.memory.retrievalTopK=3`, `ttlDays=90` | params |
| Yol B tool retrieval over `backend_tools.description` (`routing/toolRetrieval.ts`, wired into `stageTools.ts`) | BUILT AND WIRED, VALVE OFF | `vector.toolRetrievalMode=0`, `pathB.enabled=0` |
| Vector lane (Qdrant engine + bge-m3 encoder + archive corpus + admission) | BUILT, `vector.enabled=1`, `vector.engine=qdrant` -- and UNREACHABLE on every vector query today (5/5 `VectorEngineUnreachableError` since 13:00Z; earlier: no vector spans, so UNMEASURED) | `turn_trace_digest` |
| Where vector is consumed | `vectorSuggestions.ts` <- `stageClarify.ts` only (did-you-mean surfaces on unresolved refs) -- NOT tool routing, NOT the knowledge core (ban honoured) | import census |
| OPA / Rego policy engine | ABSENT. Its contract lives in `tool_annotation` exposure + fail-closed `gatewayPolicy.ts` (the CWF-native form the Path B doc names) | grep `rego` -> 0 |
| Retrieval-miss ledger | ABSENT | grep -> 0 |
| router_proposals (3 few-shot / 6 table-gap proposals) | Repository + writer exist (`RouterProposalsRepository.ts`, `toolCategories.ts`) | grep; consumption arm UNMEASURED tonight |
| Keyword-map self-learning (`[ToolFilter] Learned`) | BUILT, VALVE OFF | `router.learnEnabled=0` (v1_4 section 9 step 6 "role change") |
| Web valve (`web_fetch`, SSRF guard, citation contract) | LIVE code, VALVE OFF | `web.enabled=0` (S133) |
| F169 force-flush before response; OTel + Langfuse (EC2); `telemetry_events` ledger; `turn_trace_digest` mirror; RULE-28 single turn id | LIVE -- `runTurn.ts` finally owns the flush; 14-card digest with stage 03 since PR 560 | `chat.ts`, `observability/*`, tonight's digest |
| Replay / experiments (blueprint lens 2+3) | BUILT: `replay/` holds runExperiment (N-rep empty-completion), goldenRun, routerAbLens, routeShadowLens, clarificationLens, lineResolutionLens, frameForceFitLens, memoryAbLens, toolRetrievalRecall, scorers, stubTools (stage-10 stub-from-recorded) | directory census |
| Golden / synthetic / canary runners | BUILT, VALVES OFF | `golden.enabled=0`, `synthetic.enabled=0`, eval-canary RETIRED (S136) |
| OA-10 panels | LIVE: Governance (Rules+Kinds), Inspect, Tweak (labMode: routingBypass - knowledgeSource - previewDrafts), Replay, Stages, Routing, Providers, MCP, Users, Health, Bench, Census, Learning, Memory, GraphKb, Rollout, Synthetic, Quota | `src/components/admin/` census |
| Stage registry vs the 14-stage concept | 9 pipeline stages + stream + clarify wrapped; digest keys tonight `01,02,03,07,09,10,12,14` | `STAGE_NUMBER_BY_SPAN`, digest |

## 3 - USED, UNUSED, ENABLED, DISABLED -- THE HONEST SHAPE

**Running in production on every turn:** IR frame routing (frame-based category derivation, semantic path), channel-1
entity resolution with observed aliases + governed alias, clarify (ask-after-discovery, no-layer->literal, span 03),
planner, memory retrieve, tool categories from PUBLISHED `tool_category` rows, exposure fail-closed gateway policy,
grounding, empty!=zero render, table-cells-from-tool-bytes, OTel/Langfuse/digest, entity discovery cron (4 layers:
factory/line/equipment/workstation).

**Built, wired, switched OFF by governed valve (a row flip away):** Yol B tool retrieval (`vector.toolRetrievalMode`),
time-unclear nudge (`router.nudgeOnTimeUnclear`), keyword-map learning (`router.learnEnabled`), web valve
(`web.enabled`), golden/synthetic traffic, `router.frameOnAllPaths`.

**Built, NOT wired (caller-absent) -- the A23 core:** 5 `entityDiagnosis`, 6 `executionDecision`, `GraphKbReader`
(coverage graph G). These are exactly section 9 step 3's machine, built under a scope law that forbade a live importer, and no
wiring card has followed. `askOnUnresolved`'s three-state verdict is the ONE piece of 5 vocabulary that reached the
live path, and its 'ambiguous' branch "cannot fire today" (S134 measurement, still true: resolveEntityRef returns
ambiguous only on tier ties).

**Enabled and broken tonight:** vector lane (`vector.enabled=1`, engine qdrant) -- every query since 13:00Z fails
unreachable. Because its only consumer is did-you-mean suggestions, the product degrades silently: the ask seam
simply gets fewer candidates.

**Absent -- designed, never built:** 3 typer, 4 channel-2 BM25/RRF on entities, tau/beta rows, `turn_context` confidence
triple, cross-turn carrier / P3c slice, L5 entity-miss ledger, retrieval-miss ledger, OPA, question budget/AUROC,
room cards for any room.

**Divergences the docs already knew and that still stand:** time is resolved by a model-called tool, not pre-LLM;
stage 03 lives inside 07's register-tools for the router (only clarify has its own span); the Path B doc's
"Qdrant absent today" is now "Qdrant present, unreachable"; the blueprint's "Replay 0/14" is now a replay directory
of 30+ modules.

**So, against A23 section 9:** step 0 DONE (F169) - step 1 PARTIAL (routerAbLens, toolRetrievalRecall exist; no standing
Recall@k baseline read tonight) - step 2 NOT DONE - step 3 HALF (machine built, carrier absent, nothing wired) -
steps 4-7 NOT STARTED. Against the runbook: STEP 0-2 done long ago, STEP 3 baseline never became a standing number,
STEP 4 never started, STEP 5's machine exists without its wiring, migration or carrier.

## 4 - WHAT THIS MEANS FOR TONIGHT'S BUG (the named tool)

The owner's `getOrderScrapWithReasons` case is a Yol-A table gap, not an understanding-layer gap: the frame path
cannot reach `quality` for ORDER x scrap, and the router is forbidden by design from matching tool names. Two repairs
are on the table and both are wiring-sized: a deterministic verbatim-tool-name match in `stageTools.ts` (code, per section 8),
and either extending `HINT_AUGMENTED_OBJECTS` to ORDER or resolving `metricsSurface:["scrap"]` to metric id `fire`
so the governed `fire->quality` hint fires. Yol B (`vector.toolRetrievalMode`) would ALSO have found it by description --
but it is off, and tonight its engine is unreachable.

END - CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1
