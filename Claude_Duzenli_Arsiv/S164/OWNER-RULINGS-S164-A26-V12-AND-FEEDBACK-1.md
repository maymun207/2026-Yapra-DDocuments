# OWNER-RULINGS-S164-A26-V12-AND-FEEDBACK-1

Recorded by the Architect, S164, 2026-09-30T04:00Z (owner turn 11). Two rulings, the owner's own words, one message.

## 1 · OWNER-RULING-S164-A26-V12-1 — "onay A26 v1_2"

- Object: `A26_cwf-memory-and-learning-architecture-v1_2.md` (Claude_Duzenli_Arsiv/S164/, md5 6d71d26d3ffcd5226a26c7bc58ccb1a4 measured on the bridge 2026-09-30T03:57Z; project box docs/).
- Effect: A26 v1_2 is the DESIGN IN FORCE for memory & learning. It SUPERSEDES v1_0 (in force since OWNER-RULING-S164-A26-1, "onay A26 v0_3") and v1_1 (draft). v1_0 and v1_1 stay as inputs; nothing is deleted.
- What v1_2 carries over v1_0: Codex K1–K9 (A26-CODEX-REVIEW-S164-1) as corrected by scout-2's SCOUT-STATUS-REVIEW-A26-V11-S164-1 (Δ-K1…Δ-K9, Δ-FB, Δ-SYN, Δ-43).
- Build order it fixes (§9): Track 0 DONE-except-PII → M1 · TOUR-HONESTY · M2 → M3 → M4 → A26-P1 → A26-P2 → A26-P3 → A26-P4 (= A25 E5). Track 1b = PII detector (named build item). §9a statements are REQUIRED before A26-P2 opens.
- Still open inside v1_2 §12 (NOT decided by this ruling): label-window length (governed param, hypothesis); whether LongMemEval-V2 / MEMORY-1 thresholds enter the SOTA definition (enters only by a separate ruling — SOTA-1); MEMORY-1 bar ratification (K7: reference systems, task count, gold answers, scorer version, thresholds) before the first run.

## 2 · OWNER-RULING-S164-FEEDBACK-EVIDENCE-1 — "onay feedback-evidence"

- Amends: `cwf-measure-1-design-note-v1` §2 ("feedback is never a prompt input, never a knowledge source, never a viz data source"), pinned today by `feedbackPipelineIsolation.test.ts:5-10` (scout-2 Δ-FB).
- New text of the rule (binding from this ruling):
  1. User feedback MAY be written as EVIDENCE — `human{label, reason}` — into trace_label, ONLY through an ADMIN write path that lives OUTSIDE `api/cwf/_lib/turn/**` and `prompt/**`.
  2. The turn reads ONLY THE RESULT (the stamped `offerable` flag / label outcome), never `turn_feedback` rows.
  3. The three bans STAY: feedback is never a prompt input, never a viz data source, never a knowledge source for answers.
  4. The pin test is UPDATED in the same card that adds the write (M3), naming this ruling; it is never deleted.
  5. `markReviewed` keeps only marking; a new reason/label write needs its own permission (Codex completion), shown in the admin UI (§13.3).
- Unblocks: CARD-M3 (feedback loop + review queue UI). M3 still goes to scout-2 first (new subject, §12.1).

## Provenance (S112-YASA-1 / §12.14)
- Design source for the feedback-as-evidence shape: OWNER-DESIGN-S163-MEMORY-FEEDBACK-1 (owner, S163) → Codex completion (feedback write contract) → scout-2 Δ-FB (the pin test is a hard ruling, not a test) → this ruling.
- Architect blind spot recorded beside it: A26 v1_1 proposed feedback as evidence without naming that §2 of the measure-1 note forbids it; scout-2 caught it.

END · OWNER-RULINGS-S164-A26-V12-AND-FEEDBACK-1
