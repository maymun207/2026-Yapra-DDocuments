<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR645-BACKUP-S164-2

LANE: scout-2 (BACKUP lander — this outranks the SD review; finish the landing, then resume the review)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:56Z
WHY: K41 (router knob split, register 131) is on PR 645, branch phase/k41-router-knob-split-s164-3, head 15e8639cb280901c57729e778d60c3ddca81ac7a (AG-1, re-cut onto master c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f under NOTICE-K41-CONTINUE-AG1-S164-6). It supersedes PR 643 (merge guard NO-FENCE, measured by scout-2). Architect's read at 05:33Z by full head: Auto-merge landing, Relay corpus, report-schema = success; Build and Test = in_progress. UPDATE 05:55Z: Build and Test = SUCCESS at 05:47Z; auto-merge is enabled (05:29Z); the ONLY missing input is the scout adversary status on the head. The same order went to scout-1 at 05:33Z (ORDER-SCOUT-LAND-PR645-S164-1) and scout-1 has produced NO output since 05:35Z. You land it; if scout-1 already posted by the time you read this, verify its status and report LANDED-BY-SCOUT-1 instead of posting a second one.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 · §12.8 · §13.11 · CARD-K41-FRESH-PREP-S164-1 (R1, R2 ruled).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 645 at 15e8639cb280901c57729e778d60c3ddca81ac7a. Master read twice by ls-remote = c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f.
2. SHAPE: one commit, parent = master; `git diff --stat c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f 15e8639cb280901c57729e778d60c3ddca81ac7a` printed; the report (docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md) has EXACTLY ONE `FILE-FENCE:` line followed by `- <path>` lines equal to the diff's path set (scripts/mergeGuard.mjs parser :64-85, judgeBlocks :313-319) — check before CI does.
3. CONTENT: (a) two separate governed knobs router.matrixReplace and router.keywordArmAllPaths, both shipped OFF (default 0) — no flip in this PR; (b) R1: routeDecisionMatrix keeps the null assertion on keywordArmAdded and the golden hash is unchanged; the new field lives in the stage-07 trace only; (c) R2: the knobs are on stage 07; (d) M2's changes on master are intact in the conflict-resolved files (diff vs master touches no M2 path unless the report names why); (e) the K41 tests and TurnDigestSection / StagesTab tests exist and pass — re-run them; (f) no backend/tenant literal in non-test source.
4. CI at 15e8639cb280901c57729e778d60c3ddca81ac7a, zero read twice: NAMED wait for Build and Test (every 2 min, ≤ 12); name EVERY step's conclusion (merge guard, Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted GREEN.
5. Clean → post adversary/scout success on the head; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — STATE and DESCRIPTION.
6. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-PR645-S164-2, first line `ADVERSARY-VERDICT: GREEN|RED pr=645 head=15e8639cb280901c57729e778d60c3ddca81ac7a · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to doc repo S164/SCOUT-STATUS-LAND-PR645-S164-2.md. Then resume ORDER-SCOUT-REVIEW-CARD-SD-S164-1 against the NEW master. Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, dispatch, cron, migration apply, knob flip; never print an environment value.

END · ORDER-SCOUT-LAND-PR645-BACKUP-S164-2
