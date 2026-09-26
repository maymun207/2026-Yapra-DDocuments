<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1

LANE: scout (scout-1 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S159, 2026-09-26T17:20Z
OWNER AUTHORITY: OWNER-DESIGN-S159-1 (owner, 19:26 TSI: "Bunu da Scout'la detaylı bir şekilde tartışmamız gerekiyor" — the architecture document is argued with the scout before the owner rules). Doc-only review: NO code, NO governed data, NO card is authorised by this order.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
WHAT: adversary review of CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2 (doc v2) and of CWF-ASTRA-REVIEW-EVALUATION-S159-1 (its evidence annex), plus two literature measurements the Architect could not make.

## PREMISE
READ: doc repo (owner's clone, connected folder "2026 - Yapra - DDocuments") Claude_Duzenli_Arsiv/S159/CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2.md and Claude_Duzenli_Arsiv/S159/CWF-ASTRA-REVIEW-EVALUATION-S159-1.md; their sha256 lines are printed in the Architect's commit message on the S159 folder (git log -1 -- Claude_Duzenli_Arsiv/S159). The base document is the project-box A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 (also in the doc repo under S150/). Your own S159 verdict SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-1 (bus 16:44:11Z) is the delta doc v2 claims to have applied.
READ (Architect, clone at master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35, 17:00Z): stageTools.ts:551 Anthropic full-set branch; deriveCategories.ts:209; censusToolDoc.ts:214; governance.ts:427-429; toolRetrieval.ts:335-345; stageTools.ts:1281 claimToolName; encoder.ts:11-23; qdrantEngine.ts:510-527; ToolExperienceRepository.ts:110-150; routeShadowLens.ts:10-22; toolRetrievalAcceptance.test.ts:163-175; planner.ts header. Live: the personnel turn's stage 07 register-tools span, identified in the fence below.
```evidence:live-turn
turn_trace_digest.turn_id = 85cb74bcfe773dbdfabb170296af8724 (created 2026-09-26 16:02:28Z, totalTokens 489176)
stage 07 register-tools output: path=semantic, basis=keyword, matchedCategories=[employee, production], irFrame.metricsSurface=["personel sayısı","çalışan sayısı"], derived.hints=[]
```
SELF-INVALIDATION: dies if master is not 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35 when you read the code (then review on content and print "master moved"), or if either document's sha256 does not match the commit message (then stop and print both hashes).
ON-DISAGREEMENT: YOUR READING WINS; print both.

## STEPS
1. INLINE CHECK (the A-REC-S159-2 defect): doc v2 §2 claims to inline A24 v1_3 rules K17, K19, K21, K22, K23, K24, K25, K26, K28, K29, K31, the learning law, the conformal scope rule, the exam basis, the authorization layer and the card faces. For EACH, quote the A24 capture's sentence and say SAME / NARROWED / WIDENED / ABSENT. A NARROWED rule is a silent compression (FULLEST-ATTESTED) and is RED.
2. DELTA CHECK: for each item of your own S159 verdict, say where doc v2 applies it (section) or that it does not. Then the same for the eleven Astra items A1–A11 as listed in the evaluation §3.
3. CODE RE-MEASURE: re-read the twelve code locations in PREMISE on the clone at master and say for each whether the evaluation's reading (§1 C1–C15) is right. Especially: (a) is there ANY path on which the Anthropic branch applies categories/obligations (the doc claims none)? (b) does anything on the selection/ranking path read tool_experience? (c) is decideGoldenPublish reachable for any kind other than prompt.segment?
4. DESIGN ADVERSARY, minimum five attacks, each with the section it hits and the bytes it rests on: (i) P2's migration default (every published keyword row → OBLIGATION): count today's published tool_category keyword rows and their keywords; estimate from the last 200 turn_trace_digest rows how many turns would carry ≥ router.maxTools obligations (read router.maxTools/maxCategories from agent params; if absent say so) — is OBLIGATION-OVERFLOW a rare stamp or the normal state? (ii) L1(d) company layer as exact-match-only data: what breaks in stage 03 today if a company-layer row exists (the backend_entity_layers migration of 2026-07-26, lines 184-193, gives the row shape)? (iii) P9 Anthropic full-catalogue path: can obligations be enforced at all when every tool is already offered — or is "obligation" on that path a PLAN input only, and does the doc say so honestly? (iv) the routing event (A6) vs K24 trace schema frozen: is A6 an extension or a second ledger? (v) E3 arms: can the "matrix off" arm be run in shadow WITHOUT frameRouting=0 also switching off hints/metric floor/unmodeled-keep (:1609)? If not, the arm as named is not runnable and the doc must say which knob splits them.
5. LITERATURE (12.9 — the Architect could not read these): S1 ToolScope arXiv 2510.20036 (ACL 2026 long): quote the sentences that state the retrieval configuration of the main experiments (dense-only? BM25? hybrid? reranker?) and whether ground-truth labels are remapped after merging; S2 Toollery arXiv 2609.22218: quote the passage on prompt caching and whether token reduction translates proportionally into billing. Print the quotes verbatim, with section numbers.
6. VERDICT on doc v2: GREEN-FOR-OWNER-RULING or RED-ON-DESIGN with a COMPLETE delta (every change needed, none deferred), so that v3 — if needed — is the last draft before OWNER-RULING-S160-ROUTING-V2-1.
REPLY with scout_reply (NOT laneSlip) as SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2, first line `DESIGN-VERDICT: GREEN-FOR-OWNER-RULING|RED-ON-DESIGN doc=CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2`. If the bus body limit refuses, write the full reply to the doc repo as Claude_Duzenli_Arsiv/S159/SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2.md, post a slip with its sha256, and stop.
FORBIDDEN: no code edit, no push, no governed-data change, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2-v1
