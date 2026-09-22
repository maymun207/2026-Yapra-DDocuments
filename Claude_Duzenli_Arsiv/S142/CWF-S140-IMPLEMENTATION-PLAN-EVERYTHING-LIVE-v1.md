# CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v1

OWNER RULING, S140, 2026-09-15 ~23:1x TSI, in his words: "Bu tabloda olan her item calismiyor sa calisacak, bagli degilse baglanacak, eksikse insa edilecek ... bu tabloda her sey calisiyor, her fonksiyon aktif olacak." Recorded as OWNER-RULING-S140-EVERYTHING-IN-THE-TABLE-GOES-LIVE-1. He also approved by name that the next A23 card is the wiring card (OWNER-APPROVAL-S140-A23-WIRING-FIRST-1). Source table: CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1.

Order rule: A23 §9 build order is the spine (owner-locked, KARAR-A23-SEQ-1); Path B and control-plane items hang off it where they do not block it. Every item is ONE card, scout-reviewed (new subject, §12.1), landed by the land script, verified post-deploy (S63-1). No item closes on merge.

## P0 · TONIGHT, BEFORE THE SPINE
- P0-1 Lanes hold nothing open (measured: no unconsumed card in AG-4/AG-5 boxes). Owner reboots both through npm run lane:boot -- first live boot; PATH B takeover is the law for windows claimed the old way. First cards after boot: AG-5 lands its own four report PRs (562/563/565/566); AG-4 takes the named-tool seam.
- P0-2 Vector engine unreachable on 5/5 queries today. Lane dispatches vector-live-proof on a branch ref; root cause measured (Qdrant host / VECTOR_QDRANT_URL / fence); repaired; did-you-mean re-witnessed.
- (already queued) CARD-NAMED-TOOL-IS-OFFERED: verbatim tool name -> deterministic offer; ORDER×scrap reaches quality (HINT_AUGMENTED_OBJECTS or metricsSurface->metric id).

## P1 · THE UNDERSTANDING LAYER -- A23 §9, in order
1. §9-1 baseline: Recall@k + offered-set width, N-rep, on the live corpus, BEFORE wiring (routerAbLens, toolRetrievalRecall exist -- produce the standing number).
2. §9-2 turn_context skeleton: contribution triple (value·confidence·producer), append-only, weight declaration.
3. §9-3a WIRE entityDiagnosis + executionDecision into stageClarify (replace the computeClarification.ts:187 binary); t/b as published agent.param rows (DECLARED, not calibrated); attribution records in the flow, rendered; NIL+carrier = notify; AMBIGUOUS+carrier = options from the anchor.
4. §9-3b cross-turn carrier (last-resolution slice): table (Operator migration) + write at flush + read at ② + P3c full-pipeline correction.
5. Wire coverage graph G (GraphKbReader) as ④'s search space; closes S117-PARENT-PROMOTION / PEER-SCOPE / A23-COLLAPSE by wiring.
6. Scope gate live: signal table as governed rows, router.nudgeOnTimeUnclear=1, attributed scope.
7. §9-4 ③ typer (managed pattern rows) + ④ channel-2 BM25 + RRF (score space born here).
8. §9-5 L5 entity-miss ledger + proposal arm + t/b calibration loop (only with channel-2 live + L5 data).
9. §9-6 router_proposals consumption arm; keyword map = frozen floor, measured.
10. §9-7 room cards, neighbour-pair ablation, question budget + AUROC.

## P2 · IR PATH B AND THE VALVES
1. Yol B tool retrieval ON (vector.toolRetrievalMode) after P0-2; retrieval-miss ledger; ALT-C.
2. pathB.enabled: hybrid retrieval over the tool corpus (I1-I5 ingestion on-connect + one Sync button).
3. Policy filter c, CWF-native: chain rules + tenant scope + ALT-D honest message in gatewayPolicy.
4. Deterministic pre-LLM time slot injected into stage-09 (tool stays as fallback).
5. Owner valve decisions: web.enabled, synthetic.enabled, golden.enabled -- one named decision each.

## P3 · CONTROL PLANE AND THE RECORD
1. Replay Part A + Inspect cross-user read (measure ReplayTab first).
2. A23 v1_5 / grand-flow v1_3 from a real post-wiring trace; instruction box v5_11; doc-drift green.

## STANDING VERIFICATION
CI at the 40-hex head (scout) · Vercel READY at that sha · post-deploy turn_trace_digest read · owner witness on his own screen. A landing without the post-deploy read is not closed.

END · CWF-S140-IMPLEMENTATION-PLAN-EVERYTHING-LIVE-v1
