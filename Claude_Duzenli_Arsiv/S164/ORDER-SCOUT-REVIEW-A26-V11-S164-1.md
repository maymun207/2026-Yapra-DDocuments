<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-A26-V11-S164-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:35Z
AUTHORITY: OWNER-RULING-S164-A26-1 (v1_0 in force) · OWNER-DESIGN-S159-1 (architecture argued with the scout before code) · §12.1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: a fifth external reviewer, Codex, read A26 v1_0 WITH the code at ee12161ecad43b338489e85fcb73df1e08aa8ac0 and returned nine findings (A26-CODEX-REVIEW-S164-1.md in S164/). The Architect applied them as K1–K9 in "A26_cwf-memory-and-learning-architecture-v1_1.md" (S164/; project box docs/). Print its md5 first. Base: origin/master (print which — expect 1b2553c960317ab0cc0718e51dda8b7bc92bc112, PR 640, or later).

## MEASURE (each K item names the seam Codex cited; confirm or refute AT MASTER, quote file:line)
K1 · telemetry `tool_call` payload (stageTools.ts ≈:1846-1868 at 6a3824c2b5efd1764be178d05ba647feec06927c; moved by 640): does it carry callId / isEmpty / klass? groundingCheck.ts:619 — quote the comment admitting ok:true with unsourced numbers; does a numeric-claim verdict exist separately (st12 numeric guard) that `grounded` could consume?
K2 · v1_1 §4.2 example row now requires k23_settled.final_at ∧ no_correction = true — is any path left where an UNKNOWN bit can publish? Read the per-kind table.
K3 · restore_where_true.sql:258 — confirm restore re-inserts episodes/semantic rows; does any deletion ledger exist today (memory_audit forget_tick / episode_delete)? Could memory_audit serve as the ledger v1_1 wants, or is a new table needed?
K4 · ADR-014-persistence-class-taxonomy.md:22 and snapshotEnvelope.ts:99 — quote; is "append-only evidence class merged on restore" compatible with the envelope format, and what exactly breaks for an old envelope?
K5 · SemanticMemoryRepository.ts:55 — quote the row shape; confirm it is usage statistics, not facts; is there ANY existing fact-shaped store (entity_registry attributes? glossary?) that the new `entity_fact` table would duplicate (§12.6)?
K6 · §4.3 two measurements — is the recorded recall-candidate log (A26-P1) enough for (a) rank quality, and what independent right-tool label exists for (b) (exam sets' gold tool? data/exam)?
K7 · examScorers.ts:155 — quote the hedge-clears-violation behaviour; is there any gold-answer scorer in the exam machinery today?
K8 · router_proposals.sql:57-58 sample_query — confirm; is there ANY PII/secret scrubber in the repo (grep pii, redact, scrub, mask)?
K9 · memoryRetrieve.ts:563 offeredRoutine → derivePlan and stageClarify episode→frame path — confirm both user-scoped recall paths; are there others v1_1 did not name?
Plus: feedbackPipelineIsolation.test.ts:6 contract (what it pins); the synthetic-actor refusal seams (episodes.sql:76; distill door) — can a task-namespaced `memory_exam` actor kind be admitted without weakening C1-LAW for real users?

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-A26-V11-S164-1, first line `REVIEW-VERDICT: GREEN|RED doc=A26_cwf-memory-and-learning-architecture-v1_1 md5=<md5>`, one numbered finding per K item with SAME/DIFFERENT and a paste-ready delta where needed. Over 8192 chars: bus row = verdict line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-REVIEW-A26-V11-S164-1.md". Then back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-A26-V11-S164-1
