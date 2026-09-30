<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR644-S164-1

LANE: scout-2 (the scout-2 window ONLY; after ORDER-SCOUT-MEASURE-K41-GUARD-S164-1)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:06Z
WHY: M2 (register 140, Track 1) is on PR 644, branch phase/m2-honest-grading-s164-2, head 37faf47a7fcec16e299050af0d83365a162ab3a4, ONE commit whose parent is master 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (AG-3). Content = CARD-M2-HONEST-GRADING-S164-1-v2 (your RED Δ1–Δ14 applied) + NOTICE-M2-CARRY-TEST-S164-1 + NOTICE-M2-CARRY-FILTER-RULING-S164-2 + NOTICE-M2-CARRY-METHOD-RULING-S164-3 (your Δ4: listLastForCarry on CARRY_OUTCOME_FILTER, sole caller stageClarify.ts:689; listRecentByConversation stays OFFERABLE; askTurnUngraded removed; ask turns exempt from emptyOnlyWithFailures). Architect's read at 05:04Z by full head: Auto-merge landing, Relay corpus, report-schema = success; Build and Test = in_progress. scout-1 is silent, so this landing is yours.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · OWNER-APPROVAL-S163-MEMORY-PLAN-1 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 644 at 37faf47a7fcec16e299050af0d83365a162ab3a4. Master read twice by ls-remote = 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1.
2. SHAPE: one commit, parent = master; `git diff --stat 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 37faf47a7fcec16e299050af0d83365a162ab3a4` printed; the report has EXACTLY ONE FILE-FENCE block equal to the diff's path set (K41 died on the merge guard at step 6 — check this before CI does).
3. CONTENT vs the card + the three notices: (a) D1 emptyOnlyWithFailures, ask turns exempt; (b) offerable = clean ∨ outcomeHonest, no askTurnUngraded; (c) OFFERABLE_OUTCOME_FILTER = your literal; CARRY_OUTCOME_FILTER = the pre-M2 class-only literal byte-for-byte; (d) listLastForCarry has ONE caller (stageClarify.ts:689) and listRecentByConversation stays on OFFERABLE (memoryRetrieve.ts:407 recall); (e) D3 recordToolSuccess after observeResult with `empty`, deriveTurnOutcome once, flushToolExperience {turnFailed}; (f) D5 MemoryTab outcome badge; (g) tests F7, F7b, F7e, F7f, F7g, F7h, F7i, F7j, F7c exist and pass — re-run them; (h) no backend/tenant literal in non-test source.
4. CI at 37faf47a7fcec16e299050af0d83365a162ab3a4, zero read twice: NAMED wait for Build and Test (every 2 min, ≤ 12); name EVERY step's conclusion (merge guard, Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted GREEN.
5. Clean → post adversary/scout success on the head; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — STATE and DESCRIPTION (a success whose description says cancelled is not a deploy).
6. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-PR644-S164-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=644 head=37faf47a7fcec16e299050af0d83365a162ab3a4 · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to doc repo S164/SCOUT-STATUS-LAND-PR644-S164-1.md. Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR644-S164-1
