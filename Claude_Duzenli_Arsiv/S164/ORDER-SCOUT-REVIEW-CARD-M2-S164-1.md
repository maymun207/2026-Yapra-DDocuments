<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-M2-S164-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:20Z
AUTHORITY: OWNER-APPROVAL-S163-MEMORY-PLAN-1 (Track 1, M2) · OWNER-RULING-S164-A26-1 (A26 v1_0 in force; your SCOUT-STATUS-REVIEW-A26-S164-1 deltas Δ2/Δ5/Δ11/Δ13 are this card's ground) · §12.1 (NEW subject → adversary review).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of CARD-M2-HONEST-GRADING-S164-1-v1 before it goes to AG-3. Card body: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/CARD-M2-HONEST-GRADING-S164-1-v1.md" (also project box docs/). Print its md5 first. Base: origin/master (print which); the card's precondition is TOUR-HONESTY on master (PR 640, head ddc28caa768e767ed31a0bf3f39e3602cf0af467) — if it has landed, read at that master; if not, read PR 640's head for the toolEmpties/recordToolEmpty seams and say so.

## REVIEW — measure each premise, do not argue it
1. W1–W3: quote classifyTurnOutcome, OFFERABLE_OUTCOME_FILTER and its two query sites, procedureEligible, recordToolSuccess and its call site; confirm the call site precedes observeResult (order matters for D3a).
2. D1: is `failures > 0 ∧ dataBearing === 0` the right disjunct, or does it double-count with answerUnbacked / (calls>0 ∧ successes===0)? Build the truth table over (data, empty, failed) ∈ {0,1}³ and print the class before/after. Any existing truth-table test that pins today's classes (the BUG-035 test) must be named and its update stated.
3. D2: can PostgREST express `offerable.eq.true OR (offerable.is.null AND class.neq.failed)` in the existing `.or(...)` call at :550/:575? Quote the exact filter string grammar (installed postgrest-js, not docs). Does `decision.outcome` have any consumer that would break on a new key (jsonb schema test, replay lens, admin)?
4. D3c: does `distillAndWriteEpisode` accept a precomputed outcome today, or recompute? Quote. Is calling `classifyTurnOutcome(ctx)` in runTurn.ts before both writes race-free (ctx.toolLedger complete at :301)?
5. D3a/b: where does TOUR-HONESTY place `recordToolEmpty` (read PR 640's stageTools.ts); confirm the move of recordToolSuccess to the same spot keeps `callWasSent` semantics and gateway `viaGateway` handling; name the tests that pin the current position.
6. D4: with fewer positives, what does toolCensusRefresh.ts:311-316 do on the fixture — count the re-probes before/after (an order-of-magnitude is enough); is anything gated on "has ANY positive" besides P3?
7. D5: what does MemoryTab.tsx render today (class chip? counters?); name the i18n table it uses; is there an episode list at all, or only CandidateMemorySection? Give the exact file:line for the badge.
8. §12.6 CALLER-ABSENT sweep and NO-HARDCODE trap as usual; anything M2 must NOT touch because A26-P1 owns it (trace_label, correction lexicon).

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-CARD-M2-S164-1, first line `REVIEW-VERDICT: GREEN|RED card=CARD-M2-HONEST-GRADING-S164-1-v1 md5=<md5>`, numbered findings each with a paste-ready delta. Over 8192 chars: bus row = verdict line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-REVIEW-CARD-M2-S164-1.md". Then back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-CARD-M2-S164-1
