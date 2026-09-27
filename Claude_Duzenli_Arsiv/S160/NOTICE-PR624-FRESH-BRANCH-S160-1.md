<!-- relay-audit: v1 kind=notice -->
NOTICE-PR624-FRESH-BRANCH-S160-1

LANE: AG-4 (the window that authored PR 624 if still open; else a fresh AG-4 window)
fanout: personalized (one lane, one body)
FROM: Architect, S160, 2026-09-27T16:04Z
OWNER APPROVAL: OWNER-APPROVAL-S160-PLAN-1 step 3 (CARD-ALWAYS-INCLUDE-TO-DATA-S160-1-v2). RULING: the Architect chooses remedy (a) of your slip — a FRESH branch whose first commit carries the complete 77-path fence, superseding PR 624 — under practice 101 (register v151 H) and RULING-PR618-FRESH-BRANCH-S158-1: a grown fence is never admitted by ruling, because a guard whose refusal is waived is decoration (12.13). SUPERSEDES NOTICE-PR624-REPORT-GRAMMAR-S160-1 (bus 15:31:46Z; its content is already in head 4eb57c4a — do not run it).
NO POLL OR CRON TASK. GRAFT: as in the card. SECURITY: never print, echo, printenv or cat any environment value.
PRECONDITION (MEASURED by the Architect, GitHub API, 2026-09-27T16:01Z, read twice): PR 624 head 4eb57c4a93d4701b87446877e38e6f2ff9f83f65 (5 commits: fence report · code · fence-syntax · relay grammar + rule26 locator · FENCE-GREW record). Runs at that head: Auto-merge landing success · Relay corpus SUCCESS (your grammar repair holds) · report-schema success · Build and Test FAILURE at job "changes" step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; jobs build (24.x), rule26, eval-canary SKIPPED (silent, not passing). Your slip SLIP-ALWAYS-INCLUDE-TO-DATA-S160-1 (bus 15:49:06Z) names the cause: e2e/rule26-admin.spec.ts joined the fence after the first commit because ORDER 5's placeholder change broke its locator. The card and the scout both missed that e2e spec (Architect blind spot, recorded: F-S160-CARD-MISSED-E2E-LOCATOR-ON-UI-STRING-1). Master 9fbb0b9b4de44e192c8f5e4eb69f6d0cad6ad2c4.
ORDER:
1. New branch phase/always-include-to-data-s160-2 off origin/master (fresh worktree). FIRST commit: the report docs/relay/ALWAYS-INCLUDE-TO-DATA-S160-2-AG4-report.md carrying the COMPLETE FILE-FENCE as bare paths — the 76 paths of PR 624 plus e2e/rule26-admin.spec.ts (77), with the report path itself renamed to -S160-2. Nothing else in that commit.
2. SECOND commit: the code exactly as at 4eb57c4a (cherry-pick or apply the diff 9fbb0b9b..4eb57c4a excluding the old report file; the old report's body becomes the new report's body with the -S160-2 name, its ## DIFF and evidence fences intact, plus one line under "## CI" recording that PR 624 was superseded for FENCE-GREW). No new code; no new scope. The rule26 locator change stays as in 9bcc936c.
3. Locally: npm run build (five gates) + full suite + typecheck:api; run the merge guard the way CI runs it (scripts/mergeGuard from the merge-base) and print its VERDICT line — it must say the fence holds before you push.
4. Push; open PR non-draft titled as PR 624's with "(supersedes #624)"; close PR 624 with a comment naming this PR (the branch stays). Print git rev-parse HEAD (full 40-hex). Do not merge. Do not dispatch any workflow.
REPLY (laneSlip): SLIP-ALWAYS-INCLUDE-TO-DATA-S160-2 with branch, full head, PR number, the local guard VERDICT line, CI by full sha read twice if zero. If laneSlip fails on DNS (F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1) print it on screen and stop; the pushed head is the proof.

END · NOTICE-PR624-FRESH-BRANCH-S160-1
