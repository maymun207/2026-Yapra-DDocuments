# CWF-S163-MEMORY-DIAGNOSIS-AND-PLAN-v1

FROM: Architect, S163, 2026-09-29 10:10 TSİ
SOURCES: SCOUT-STATUS-MEMORY-MAP-S163-1 (scout-2, base ee12161ecad43b338489e85fcb73df1e08aa8ac0, sha256 ae5da064a32634c8893e855be0aa93993d1d0dae52d2b89cc01b83ad8182cd56) · Architect's production DB reads 06:50Z–07:05Z.
OWNER DESIGN INPUT (S112-YASA-1, by name): OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 ("should successful turns feed back into routing?") and OWNER-DESIGN-S163-MEMORY-A26-1 ("memory must get the same from-scratch design and analysis the understanding layer got"; "burası sıfır hata çalışması gereken … training dediğimiz şeyin özü"). The Architect's blind spot that made it necessary: 25 architecture documents designed routing and learning, none measured whether the success signal feeding learning is true.

## 1 · DIAGNOSIS (measured)
Remembering works; learning does not.
- REMEMBERS: every turn writes an episode (83/83 in 7 d); 3 are retrieved into the model's context per turn (659/786 ever retrieved); clean turns write a per-user entity dossier.
- GRADES ITSELF WRONG:
  - F2: the MCP client drops the tool's own `isError` flag (mcpClient.ts:333-342) — a tool error is recorded as a success in the ledger, telemetry and tool_experience.
  - F1: an empty [] counts as a positive (toolResultClass.ts:169-192).
  - F3: a turn with 3 tool failures and an apology is graded `unproven`, not `failed` (memoryDistill.ts:166-172), and is offered to later turns (EpisodesRepository.ts:378).
  - Episode classes in production: unproven 337 · clean 242 · failed 62 · unclassified 145.
- LEARNING DOES NOT REACH DECISIONS:
  - Memory reaches the prompt only. Stage 07 (tool routing) runs BEFORE memory retrieval (pipeline.ts:22 vs :24).
  - The one learned routing store (tool_category_cache) writes with no success test and is correctly braked (router.learnEnabled = 0, published).
  - Graph KB parentsOf/containsAmong: no caller.
  - Vector tool retrieval off (vector.toolRetrievalMode = 0).
  - router_proposals (the review queue A25 wants) is fed but never used.
- NO REAL LABELS: turn_feedback = 10 rows ever (5 up, 5 down), 0 reviewed, no reader in the learning path.
- NO INSTRUMENT: nothing measures "memory offered → used → helped". SOTA MEMORY-1 (LongMemEval incl. abstention, Mem2ActBench) is a v1 criterion and is unmeasured.

## 2 · PLAN — two tracks, in parallel
TRACK 1 · STOP WRONG LEARNING (code; small wiring cards; each → scout → lane → PR → master):
- M1 · MCP isError passthrough (F2): executeMCPTool returns the flag; classifyToolResult receives transportError. One seam fixes the ledger, telemetry, honesty and experience together.
- M2 · Honest grading (F1, F3), built on TOUR-HONESTY:
  - tool_experience +1 only for a non-empty yield on a turn not failed;
  - a turn with tool failures and an unbacked or apologetic answer is `failed` and never offered.
- M3 · Feedback loop:
  - thumbs up/down → turn_feedback → the human label overrides the episode class;
  - an admin review queue in the Health tab (UI in the same card).
- M4 · Memory instrument: per-turn trace of memory rows offered and whether the answer used them; a Health-tab panel for learned · offered · used · helped; K-A style exam slice for recall + abstention (LongMemEval shape).

TRACK 2 · A26 MEMORY & LEARNING ARCHITECTURE (the memory face of A25, not a rival):
- One learning path: cwf.trace.v2 events (A25 K35) → K23 filter (a TRUE success signal = M1–M3) → proposals into the EXISTING router_proposals queue → K34 gate → publish → one-click rollback.
- Which store feeds which decision point:
  - routing (stage 07 — does memory move before it?);
  - clarify (stage 03 — the Graph KB wiring);
  - planner (default plans from clean episodes);
  - prompt.
- Forgetting and decay; tenant/user scope; the acceptance metrics (MEMORY-1).
- Draft in S164 → scout adversary review → owner approval. It is a PRECONDITION of A25 E5 (E5 learns from a signal that is broken today).

ORDER (one open PR at a time): K32 (landing now) → M1 → TOUR-HONESTY → M2 → K41 → M3 → M4. A26 draft runs beside them.
SOTA-1: MEMORY-1 is a v1 criterion; nothing here may be deferred on sufficiency grounds.

END · CWF-S163-MEMORY-DIAGNOSIS-AND-PLAN-v1
