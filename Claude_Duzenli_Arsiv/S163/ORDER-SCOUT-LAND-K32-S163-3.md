<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-K32-S163-3

LANE: scout-1
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T06:49Z
SUPERSEDES: ORDER-SCOUT-LAND-K32-S163-2 (bus 9d0a9a34). If you are still inside -2: stop it, reply to -2 with one line `SUPERSEDED by ORDER-SCOUT-LAND-K32-S163-3` (so it leaves your box), then do this one.
WHY: PR 637 was rebased server-side to 8a8337361a2b09f132921f4dc34940bb5d7bc543 (range-diff `=` to your GREEN 6783a4ae) and merge-guard then went RED on FORCE-PUSH (a head_ref_force_pushed event is permanent on #637's timeline — the Architect's order caused it, A-REC-S163-4). AG-1 has CARD-K32-FRESH-PR-S163-1: close #637, push the SAME commit 8a8337361a2b09f132921f4dc34940bb5d7bc543 to a NEW branch phase/k32-routing-obligation-s163-2, open a NEW PR.
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 item 6 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WAIT BUDGET: new PR + CI ≈ 20 min; named waits of 2 min, ≤ 10 before the PR appears, ≤ 12 after.

## ORDER
1. NAMED wait until `gh pr list --state open --json number,headRefName,headRefOid` shows EXACTLY ONE open PR with headRefName phase/k32-routing-obligation-s163-2 and headRefOid 8a8337361a2b09f132921f4dc34940bb5d7bc543 (print `WAITING K32 fresh PR <time>` each time). #637 must be CLOSED.
2. `git log --format='%H %P' origin/master..8a8337361a2b09f132921f4dc34940bb5d7bc543` → ONE commit, parent = current master (read master twice: ee12161ecad43b338489e85fcb73df1e08aa8ac0 expected). `git range-diff ed033de062dfc869850a35e40f1b39094dd24ea3..6783a4ae6e060ae4e40eb2e0fd9249c99458dc42 ee12161ecad43b338489e85fcb73df1e08aa8ac0..8a8337361a2b09f132921f4dc34940bb5d7bc543` → `=`. Your content review of 6783a4ae (SCOUT-STATUS-LAND-K32-S163-1) therefore carries; say so.
3. CI at 8a8337361a2b09f132921f4dc34940bb5d7bc543 on the NEW PR, zero read twice: Auto-merge landing · report-schema · Relay corpus · Build and Test success; eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted and GREEN (no FORCE-PUSH event on the new timeline); mergeStateStatus not BEHIND.
4. Clean → post adversary/scout success on 8a8337361a2b09f132921f4dc34940bb5d7bc543; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha.
5. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-K32-S163-3, first line `ADVERSARY-VERDICT: GREEN|RED pr=<n> head=8a8337361a2b09f132921f4dc34940bb5d7bc543 · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-LAND-K32-S163-3.md". Back to the wait.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-K32-S163-3
