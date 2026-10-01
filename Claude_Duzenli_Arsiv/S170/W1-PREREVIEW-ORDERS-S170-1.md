# W1-PREREVIEW-ORDERS-S170-1 — archive pointer (S170, after "onay S170-A" 09:37 TSİ)
Canonical bytes live on the bus (relay_inbox). Each order carries its v1 card verbatim.
| Order | Card (v1) | Scout | Lane after v2 | Bus row | length |
|---|---|---|---|---|---|
| ORDER-SCOUT-PREREVIEW-E2-REGISTRY-S170-1 | CARD-E2-REGISTRY-DATA-S170-1-v1 (register 119, A25 E2, §13.1) | scout-1 | AG-1 | 4e95d30b-4091-439d-9652-561e6093d270 | 6635 |
| ORDER-SCOUT-PREREVIEW-A26-P1A-S170-1 | CARD-A26-P1A-LABELS-AND-RECALL-LOG-S170-1-v1 (register 213, A26-P1, Δ8/Δ19) | scout-2 | AG-4 | 3c6321e3-5a65-4db1-94c4-26487e5d0be3 | 6270 |
| ORDER-SCOUT-PREREVIEW-PII-S170-1 | CARD-A26-PII-DETECTOR-S170-1-v1 (register 210, A26 Track 1b, K8) | scout-1 (2nd) | AG-2 | baaea4fb-f00b-4f85-9d55-e016ccfb649c | 5067 |
| ORDER-SCOUT-PREREVIEW-E2-ROUTER-BUDGET-S170-1 | CARD-E2-ROUTER-BUDGET-S170-1-v1 (register 40e, A25 K1/K18/K35) | scout-2 (2nd) | AG-3 | 118ed1ed-164b-4a6e-8af7-a51e5bbf61b9 | 5425 |
Liveness: NOTICE-PING-AG3-S170-1 (f8ad319a-c424-4a86-a2dd-64f2003b37f9) consumed 06:41:43Z — AG-3 is in the loop; 4 producer lanes.
Measured facts the cards rest on (06:3x–06:4xZ): public.backends 7 rows (6 active + armes-new retired); public.trace_label exists (M3, human-only, 0 rows); telemetry_events types tool_call/message/llm_call/error; router.* agent params exist except maxTools/maxSchemaTokens/maxFanout; derivedPack.ts:108 MAX_TOOLS=40 display cap.
Owner away ~09:40–17:00 TSİ: every card is migration-free or absence-tolerant; operator steps queue for his return.

## Ticks
- 06:46:13Z scout-1 SCOUT-STATUS-PREREVIEW-E2-REGISTRY-S170-1 RED, A1–A7 (row 4dfce52f-6e88-41a2-b257-3dcd5501f246, md5 c9c126daf58e72ec1f191ad1799386cb). Seam: self-seed reconciler + pure genericFamilyKindDefs over live active backends; R3 defect confirmed (superset accept wrote armes.tool_category).
- 06:48:59Z CARD-E2-REGISTRY-DATA-S170-1-v2 → AG-1 (row 94b42c7c-d1b9-47f7-b842-ac4f0ed11dbb, 9412 chars, md5 0c6ea0e2b5e78010002fcb97a70bcec3), composed by SQL (v1 from order row + amendments substring; scout row md5+sha256 preconditions held).
- 06:48:41Z scout-1 PII RED A1–A8 (row bfe1402b-f4dd-407e-a6df-6141a937f993); 06:50:22Z scout-2 P1a RED A1–A7 (row 2a2edeee-da1f-40a5-b2b8-364b72a1e6cd: telemetry_events.type CHECK refuses new types → kind under tool_call; per-call resultClass/isEmpty not stored); 06:51:14Z scout-2 ROUTER-BUDGET RED A1–A8 (row a7e0591a-2266-4052-b470-556ef2773c5b: offered count not persisted; keyword arm alphabetical; fan-out knob belongs to BurstGuard).
- 06:5xZ v2s by one SQL composition (preconditions md5+sha256 on each scout row): CARD-A26-PII-DETECTOR-S170-1-v2 → AG-2 (a4cbd5c7-7242-49f8-bb0d-fac28fb52db4, md5 065c029e0dc6b99302474c0306a41439) · CARD-A26-P1A-LABELS-AND-RECALL-LOG-S170-1-v2 → AG-4 (ddedd240-54af-4c3b-9caf-14104c66ad92, md5 77ead7aec959d8acecfe6951ca9eb369) · CARD-E2-ROUTER-BUDGET-S170-1-v2 → AG-3 (f46496f0-0536-4855-88d4-4ad46385caa2, md5 6583b01718fcaa0ada00dcbf18e93cbc).
- AG-1 took CARD-E2-REGISTRY-DATA-S170-1-v2 at 06:50:14Z.
- 06:55–06:56Z W2 pre-reviews: ORDER-SCOUT-PREREVIEW-E2-K33-IDENTITY-S170-1 → scout-1 (475e9019-8ee5-47c5-b596-75e694709d46) · ORDER-SCOUT-PREREVIEW-A26-M2B-DK1-S170-1 → scout-2 (14b98b7b-5fdf-4374-bb36-2101aed51f3e). All four W1 v2 cards consumed (AG-1 06:50, AG-2 06:55, AG-4 06:55, AG-3 by 06:59).
- 06:59:30Z scout-2 M2B/DK1 RED A1–A6 (b5b6c381-e6cf-47da-80bf-9932fc6c9831: 212 NOT done — numeric dropped at stageStream.ts:668; N1 alone would not change offerability). 07:00:46Z scout-1 K33 RED A1–A7 (740c0c53-60ea-4d4d-918e-b30a233e44dc: LIVE collisions armes∩machine-knowledge-base knowledge_* ×5, armes∩superset ×4, honestbench∩mount-probe hb_* ×4; first claimant keeps bare name).
- 07:0xZ v2s queued behind current cards: CARD-E2-K33-TOOL-IDENTITY-S170-1-v2 → AG-3 (bda4a7b3-b765-4679-8ad7-a7e42812274e, md5 cdb2b16d594b381bd1b6adef7e89f354) · CARD-A26-M2B-NOTSENT-AND-DK1-S170-1-v2 → AG-4 (df3ea40d-c935-44db-b444-73a13639606b, md5 c7903550c6e8a0601dcb4bc214879a3b).
- 07:0xZ W3 pre-reviews: ORDER-SCOUT-PREREVIEW-A26-P1B-PII-WIRING-S170-1 → scout-2 (9b6044b2-65eb-406c-8229-835ea4377abf) · ORDER-SCOUT-PREREVIEW-168-BACKEND-LITERAL-TEXT-S170-1 → scout-1 (69c4533d-5705-455a-bdc8-69031515e75e).
