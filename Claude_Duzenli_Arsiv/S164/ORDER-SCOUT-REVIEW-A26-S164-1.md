<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-A26-S164-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Take AFTER ORDER-SCOUT-REVIEW-CARD-M1-S164-1 if both are unanswered.
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-29T13:40Z
AUTHORITY: OWNER-APPROVAL-S163-MEMORY-PLAN-1 (Track 2, A26) · OWNER-APPROVAL-S164-PLAN-1 item 3 · OWNER-DESIGN-S163-MEMORY-A26-1 · §12.1 (NEW subject → adversary review) · OWNER-DESIGN-S159-1 (architecture argued with the scout BEFORE code).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: adversary review of the DRAFT "A26_cwf-memory-and-learning-architecture-v0_1" — the memory face of A25. File: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/A26_cwf-memory-and-learning-architecture-v0_1.md" (also project box docs/). Print its md5 first. Base: origin/master 6a3824c2b5efd1764be178d05ba647feec06927c or later — print which. Your own SCOUT-STATUS-MEMORY-MAP-S163-1 is its main measured source; where A26 quotes you, check it quotes you correctly.

## REVIEW — measure each premise, do not argue it
1. CLAIMS REGISTER §11: for C1–C7 re-measure each file:line at your base and print SAME/DIFFERENT; for C8 quote the A25 lines (yapra-mimari-documents/A25_cwf-capability-fabric-architecture-v1.html L526–L534, L573–L580, L259) and say whether A26's reading of them is faithful; C12: does a cwf.trace.v2 builder / trace_label writer exist on master (git grep "trace.v2", "trace_label", "k23")? Print what exists.
2. §4.3 THE STAGE-ORDER DECISION (no per-turn recall into stage 07 in v1; learned knowledge reaches routing only as PUBLISHED rows): attack it. Name what is lost, what measurement would settle it, and whether A25 E3/E5 already commits to one side. Rule GREEN/RED on this section alone.
3. §5 the success signal per layer: is each "true when" computable from code that EXISTS after M1 + TOUR-HONESTY + M2, or does a layer need a mechanism the draft does not name? Quote the seam for each row.
4. §4.4 data model: is `router_proposals` shaped to carry eight kinds (quote its migration and the admin reader)? Would `tool_experience` → VIEW change the census re-probe (toolCensusRefresh.ts P3) in a way that hides faults?
5. §6 forgetting: which of supersession / retraction / decay / deletion already has a mechanism (TTL param, retrieval_count, reinforce) and which is new? Any of them a hidden write to a governed table outside K34?
6. §7 acceptance: can LongMemEval's harness be run against the prompt face with the fixture backend as written, or is that a category error (QA benchmark vs tool agent)? Say what a faithful MEMORY-1 measurement is, concretely.
7. §12.6 CALLER-ABSENT sweep: does A26 propose ANY new mechanism where an existing one could be wired (extractor, label writer, decay)? Name each with the existing seam.
8. NO-HARDCODE: any place where a backend name, tool name or Turkish surface form would enter code under this design.
9. Anything the draft does NOT say that a memory architecture for a multi-tenant factory agent must say (security of memory across users/tenants, PII, replay, cost).

## REPLY
scout_reply as SCOUT-STATUS-REVIEW-A26-S164-1, first line `REVIEW-VERDICT: GREEN|RED doc=A26_cwf-memory-and-learning-architecture-v0_1 md5=<md5>`, numbered findings each with a paste-ready delta (section + replacement text). Over 8192 chars: bus row = verdict line + sha256; full text ALWAYS to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-REVIEW-A26-S164-1.md". Then back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge, DB write other than scout_reply, cron; never print an environment value.

END · ORDER-SCOUT-REVIEW-A26-S164-1
