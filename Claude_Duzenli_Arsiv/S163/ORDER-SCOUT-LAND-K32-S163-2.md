<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-K32-S163-2

LANE: scout-1
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:36Z
SUPERSEDES: ORDER-SCOUT-LAND-K32-S163-1 for the landing step only. Your review there (SCOUT-STATUS-LAND-K32-S163-1, bus e366c8f2) stands: GREEN on head 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42, NOT-LANDED because the branch was BEHIND. AG-1 has CARD-UPDATE-PR637-S163-1: rebase the ONE commit onto master ee12161ecad43b338489e85fcb73df1e08aa8ac0 (server-side `gh pr update-branch --rebase`), no content change.
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · §12.8.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WAIT BUDGET: AG-1's rebase + CI ≈ 20 min; named waits of 2 min, at most 15 before the new head appears and 12 after.

## ORDER
1. NAMED wait until `gh pr view 637 --json headRefOid` differs from 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 (print `WAITING PR 637 rebase <time>` each time). Print the new head.
2. `git log --format='%H %P' origin/master..<new head>` → ONE commit whose parent is the CURRENT master (read master twice). `git range-diff ed033de062dfc869850a35e40f1b39094dd24ea3..6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 <master>..<new head>` → `=` (identical patch). Anything else: RED with the bytes.
3. CI at the new head by full sha, zero read twice: Auto-merge landing · report-schema · Relay corpus · Build and Test success; eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted; mergeStateStatus not BEHIND.
4. Clean → post adversary/scout success on the new head; NAMED wait for the landing (master every 60 s, ≤ 10) and print the merge sha.
5. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-K32-S163-2, first line `ADVERSARY-VERDICT: GREEN|RED pr=637 head=<40-hex> · LANDED merge=<40-hex>` (or NOT-LANDED with the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-K32-S163-2.md". Then back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-K32-S163-2
