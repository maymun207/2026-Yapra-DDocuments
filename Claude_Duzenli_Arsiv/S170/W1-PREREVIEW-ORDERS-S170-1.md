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
