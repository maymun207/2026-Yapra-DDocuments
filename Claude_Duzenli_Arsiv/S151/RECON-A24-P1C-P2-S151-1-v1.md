# RECON-A24-P1C-P2-S151-1-v1

S151 · 2026-09-21 ~19:40Z · two read-only recon subagents dispatched by the Architect over the bridge
(origin/master = 9cb7fefc947745bec1fdd97aff62d58c34c47919, lane-refreshed tracking ref, not ls-remote) and
Supabase MCP selects. Input for the P1-C (AG-1) and P2 (AG-2) cards of WAVE-A24-PARALLEL-PLAN-S151-1-v1.
Every line below is the subagents' reading, carried; each card re-measures its own lines (ORDER 0).

## P1-C (routing, AG-1)

MAIN FINDING — corrects F-S150-ROUTER-IGNORES-FRAME-METRICS-1: the frame DOES steer routing in
production (router.frameRouting=1 live). Q3's categories [linestop, andon, metrics] came from the frame
derivation table (deriveCategories.ts:77 cell QUERY_EVENTS x LINE + applyMetricFloor :160-163). The
scrap tools were missing because the governed metric hint is applied ONLY when action is QUERY_METRIC:
deriveCategories.ts:139 `if (action === 'QUERY_METRIC' && HINT_AUGMENTED_OBJECTS.has(object))`
(objects at :126: LINE, ZONE, ORDER). The governed data already maps it: live row
armes.metric_registry / fire v1 categoryHints ["quality"]; live armes.tool_category / quality v5 holds
the scrap tools. No new mapping or store is needed.
The fix amends the owner-ratified K1 matrix rule (precedent OWNER-RULING-S140-K1-ORDER-CELL-HINT-1) and
therefore needs a NAMED OWNER RULING. Tests pinning today's rule: deriveCategories.test.ts:88, :104, :136.

Offered-set path: single production caller stageTools.ts:653 -> filterToolsByMessage
(toolCategories.ts:1418): semantic router 1528-1546, keyword floor 1550/1557 (matchCategories :1148),
frame flip 1590-1609 (deriveCandidateCategories :1598), sticky 1637-1645, getToolsForCategories :1868,
ALWAYS_INCLUDE :1869 (defined :1203-1206; also :505-506, :550, :1250, :1904, :1968).
Stale text: health-analytics.ts:216-217 and clarificationLens.ts:6 still say frame routing is dark.

Exam machinery to extend (not duplicate): replay/recallCat.ts (category Recall@k), toolRetrievalRecall.ts,
routerAbLens.ts (coverage, no backend axis :229-231), routeShadowLens.ts (runs the PRODUCTION
filterToolsByMessage with a replayFrame :479-486). Recommended base: routeShadowLens.runArm + recallCat
scorer. Held-out source: turn_trace_digest (162 rows) stage-07 output (irFrame, matchedCategories,
offeredToolNames; stageTools.ts:1119-1123). Per-backend routing recall: computed nowhere.
K24: span constants observability/config.ts:547-613, set at toolCategories.ts:1658-1680; span IO
stageTools.ts:1090-1140; no cwf.trace.v1 in the repo; derived categories and applied hints not exposed.
K17: no CWF tool_search offered; Yol B toolRetrieval built, switch vector.toolRetrievalMode live 0;
TOOL_GRAPH_ENTRY = 'getFactoryLines' hard-coded at knowledge/backends/armes/toolGraph.ts:35.
Reach canary: UNMEASURED (mcp/gatewayEnumerate.ts is a candidate).

Proposed split: C1 metric hints reach the offered set (needs the owner ruling) -> C2 K24 routing fields
-> C3 routing-exam skeleton (Q3/Q4 golden, backend axis) -> C4 M-a held-out reader -> C5 K17 entry tool
behind a switch (after PARAMS) -> reach canary (recon first).

## P2 (retrieval + learning, AG-2)

Yol B (routing/toolRetrieval.ts) rungs OFF=0 SHADOW=1 OFFER=2 (:166-168), resolver
resolveToolRetrievalPolicy.ts:76-91, called stageTools.ts:850 (block :851-902). ctx.toolRetrieval
(:868) has NO reader (caller-absent class, 12.6). RRF: vectorLane/incumbentEngine.ts:86-101 (K=60 :57);
qdrant fuses server-side (qdrantEngine.ts:518-526). BM25 scorer pathB/bm25.ts is called ONLY by
scripts/pbFullMeasure.ts; the incumbent "sparse" lane is log-TF without IDF, not BM25; PATH_B_ENABLED
has no consumer. So item 5 "BM25+RRF over tools" exists nowhere today.
"F161 pattern" in A24 does not match the code (F161 = pagination honesty); the existing shadow pattern
is PHASE-FRAME-SHADOW-EVIDENCE-1 (frameEvidence.ts:564-622, written at runTurn.ts:209-214, telemetry_events
payload.kind). Record shadow rows there; never set top-level latency_ms (it would enter
health_latency_daily p95).
Analyzer: turkishFold wired; no Turkish stemmer ("deliberately NO Turkish stemmer",
learnableCorpus.ts:39-42), no stopwords in bm25.ts. POSSIBLE DEFECT (read, not executed): foldKey
lowercases before splitIdentifier, so camelCase splitting (learnableCorpus.ts:196-197) cannot fire;
getDailyOeeValues would be one token.
Absent: tool_output_tokens, a retrieval held-out set, a reranker, P5 outcome ledger.
Proposed split: P2-0 tokenizer characterization tests -> P2-1 tool-corpus BM25 + RRF in shadow (no
production change) -> P2-2 Turkish analyzer ablation arm -> P2-3 offline instrument -> P2-4 reranker
ablation -> P2-5 probe latency + p95 freeze -> P2-6 tool_output_tokens.

## FENCE CORRECTIONS TO THE WAVE PLAN (Architect, from this recon)

- routing/toolRetrieval.ts, resolveEntityRef.ts, learnableCorpus.ts sit under routing/** (AG-1's fence)
  but P2 needs them: P2 imports them read-only; any edit there is AG-1's card.
- turn/stageTools.ts is shared BY REGION: routing :600-1140 (AG-1), Yol B :850-902 (AG-2), tool
  execution :1900-2200 (AG-4). Each card names its region; an edit outside it is a STOP.
- turn/types.ts and turn/runTurn.ts: each card adds its own field or emit line; a git conflict is a STOP.
- PARAMS card (AG-4) must carry every wave key including the P2 shadow/analyzer/rerank keys and the K17
  switch.

END · RECON-A24-P1C-P2-S151-1-v1
