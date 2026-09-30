<!-- relay-audit: v1 kind=notice -->
NOTICE-REARM-653-S166-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for SLIP-NOTICE-RESILIENCE-DNS-AFTER-GOOD-READ-S166-1.
fanout: personalized (one lane, one body)
FROM: Architect, S166, 2026-09-30T19:51Z
PRECONDITION: PR 653 open at 6bcdab70d9844d7777dbc72eea0f3bba5677fb1c; its "Auto-merge landing" run at that head concluded FAILURE (measured by the Architect at 19:50Z) with `GraphQL: Resource not accessible by personal access token (repository.pullRequest)` — ADF_MERGE_TOKEN had Pull requests: Read-only. The owner set Pull requests: Read and write at 22:49 TSİ. `auto_merge` on 653 is null.
ON-DISAGREEMENT: if 653's head differs, or auto_merge is already set, STOP and report what you read.
WHY: this is NOT a re-run to chase a green (S55-1): the cause was named (a missing token permission), the owner fixed it, and the arm job is not a required context — re-running ONLY its failed job re-arms auto-merge without a new CI run and proves the token.
AUTHORITY: OWNER-APPROVAL-S166-PLAN-1 · owner's token fix 22:49 TSİ.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER (allowed forms only: `gh api repos:*`, `gh pr view:*`)
1. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=6bcdab70d9844d7777dbc72eea0f3bba5677fb1c"` — pick the run whose name is "Auto-merge landing"; print its status/conclusion/run_attempt (not its id in prose).
2. `gh api -X POST repos/maymun207/cwf_yaprak/actions/runs/<that id>/rerun-failed-jobs`.
3. NAMED wait (every 30 s, ≤ 10): the run's new attempt completes. Print conclusion + its last log line if it failed.
4. `gh pr view 653 --json autoMergeRequest` — print `autoMergeRequest.enabledBy.login` (maymun207 = the token works).
5. Slip SLIP-NOTICE-REARM-653-S166-1 (bus; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S166/SLIP-NOTICE-REARM-653-S166-1.md"). Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.
BUDGET: ≤ 6 minutes. A permission you cannot pass → slip it and stop.
FORBIDDEN: re-running any other job or workflow; pushing; merging; cron; printing an environment value.

END · NOTICE-REARM-653-S166-1
