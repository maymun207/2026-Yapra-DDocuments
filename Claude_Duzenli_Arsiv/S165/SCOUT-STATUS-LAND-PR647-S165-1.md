ADVERSARY-VERDICT: GREEN pr=647 head=794be5a81b956937eee1a25d0fdeedc2eecde235 · LANDED merge=64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8
SCOUT-STATUS-LAND-PR647-S165-1 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-PR647-S165-1 (id 00446503-725e-4122-91ce-a4ab8e450efb)

1 · PRECONDITIONS. PR 647 was the only open PR. Master read twice = 763a54bc551572137276afa6cc55446e80c934cc. One commit on the head; its parent = master; it touches exactly the 12 named paths.

2 · FENCE. The merge-base's own mergeGuard.mjs over the report: 1 block (report line 143), 12 entries, problems [], diff-not-fence [], fence-not-diff [].

3 · CARRY FIDELITY. The raw patch md5 differs: original 02a77c0e27b02b46a189fa71626dd09b, carried 160d7302a4b1eac02cba2043a29063f9. After stripping the index lines and the @@ line numbers, both are 1b4f91267528c0a7beb75bae807a71e3, so the content is EQUAL. The only difference is three hunk headers that moved: +5 in the test, +1 and +20 in stageTools.

4 · CONTENT. isError now counts as a failure in all three places the card names: examScorers.readResult (transportError: entry.isError === true), entityDiscoverySync callOnce, and gatewayEnumerate (both throw when isError === true). recordToolCall carries `outcome?.isError === true` into PersistRawEntry.isError. mcpIsErrorPassthrough.test.ts adds the M1B case (persistRaw isError present/absent). No assertion was weakened.

5 · SUITES at the head, run in a scratch tree: 5 files, 131/131 passed. Four files passed inside the sandbox. mcpIsErrorPassthrough failed 3 tests inside the sandbox with `listen EPERM`; the fixture server cannot bind a local port there. That is the sandbox, not the code. The same file passed 9/9 outside the sandbox.

6 · MANIFEST RESEAL: UNMEASURED locally. `npm run reseal` needs a real git repo, and scouts make no worktree. CI's doc-drift check inside Build is the lens, and it is green (below).

7 · CI at 794be5a81b956937eee1a25d0fdeedc2eecde235. All 4 workflow runs completed/success: Build and Test 36681581868, Auto-merge landing 36681581770, Relay corpus 36681581757, report-schema 36681581762.
- Job `changes`: every step success, including the merge-guard step, whose log says `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head` · `FENCE-GREW ok` · `[merge-guard] VERDICT GREEN`.
- Job `build (24.x)`: every step success. This includes RULE-40, the migration version-key gate, the Tenant-zero gate, the Backend-name gate, Build and Run tests.
- Job `rule26`: success.
- SKIPPED: `eval-canary`, by design. It is named here and NOT folded into the green.
- My own CI wait script exited 3 because of a bug in its "done" check: it split job names on spaces, so "build (24.x)" never matched. build (24.x) actually finished success at 07:23:39Z. This was a scout tooling fault, not a CI fault.

8 · LANDING
- Collision guard: I read the head statuses twice, the last time right before posting; there was no adversary/scout.
- I POSTED `adversary/scout | success | scout-2 GREEN ORDER-SCOUT-LAND-PR647-S165-1: fence 12=12, carry equal, 131/131, CI 4of4 | 2026-09-30T07:33:31Z`.
- Named wait: wait 1 (07:33:38Z) pr=OPEN, master=763a54bc…; wait 2 (07:34:40Z) pr=MERGED, merge=64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8, and master = that sha.
- Vercel PRODUCTION deployment at the merge sha: `Production | success | Deployment has completed | 2026-09-30T07:38:21Z`. No deployment existed at waits 1-4; it appeared at wait 5 (07:38:51Z).
- The head's preview status `success | Canceled by Ignored Build Step` is NOT a deploy, and it is not counted as one.

read relay_inbox via mail-wait (exit 0) + --read of order 00446503.
