ADVERSARY-VERDICT: GREEN pr=648 head=9eab2178c898868106b0b578c500a3c46b8bd409 · NOT-LANDED — step 6: GitHub auto-merge did not fire within the named wait (10 × 60 s)
MIGRATION: 20260930050000_health_memory_daily OPERATOR-PENDING (not applied)
SCOUT-STATUS-LAND-PR648-S165-1 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-PR648-S165-1 (id 39ba8ad3-9de9-4cbf-b496-67e2140fdd53, md5 f3aadceccaa7ff65d46cfafd0dc3dda1 DIGEST-OK)
The order was minted at 07:42:31Z. My previous mail-wait died at 07:41Z with READ-FAILED (PROXY-REFUSED), and I read the order at 14:23:15Z. I re-measured every premise at that time.

1 · PRECONDITION HOLDS. `gh pr list --state open` → exactly one open PR: 648, phase/m4a-memory-offered-overlap-s165-1 @ 9eab2178c898868106b0b578c500a3c46b8bd409. Master read twice, then a third time before posting = 64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8. baseRefOid is the same sha.

2 · SHAPE. One commit, 9eab2178, whose parent = 64f5d5c7. `git diff --stat`: 21 files, +1248 −33.
Fence, checked with the merge-base's own mergeGuard.mjs (parseFenceBlocks, validateFence, fenceCovers) over docs/relay/M4A-MEMORY-OFFERED-OVERLAP-S164-1-AG4-report.md:
- blocks 1 (line 213), entries 21
- problems []
- diff-not-fence [], fence-not-diff []

3 · CARRY FIDELITY. I compared blob pairs from `git diff --raw` over c2a9eab7..62d8d59a against 64f5d5c7..9eab2178, excluding the manifest. The original chain is 62d8d59a → b6e347be → c2a9eab7.
- 20 = 20 paths. 19 paths have EQUAL blob pairs (old and new).
- api/cwf/_lib/turn/types.ts has a different base because master moved under it. Its normalised patch is equal. The carried head's types.ts minus the pre-review tip's is exactly master's M1B hunk (the `isError?: true` doc and field), and nothing else.
- Mismatches: 0.
Manifest: I ran `npm run reseal` in a scratch detached worktree at the head. All 7 tabs came back "unchanged": ff11fc07fc46, 05cca0de4ef6, 282f5cad2cd9, fca774c2c2f1, 220706b84cf9, 3485247b605c, 8c369db0ff59. The only diff is the 14 self-referential `lastSyncedCommit` lines (64f5d5c7 → 9eab2178), with 0 other lines. The seal content matches. I removed the worktree afterwards.

4 · CONTENT (read from the head; graft's index is master, where `health_memory_daily` has 0 hits, so the head tree is the lens).
- N1 PRESENT. scripts/verifyGrants.ts adds 'health_memory_daily' to SERVICE_ROLE_ONLY_FUNCTIONS after health_feedback_daily (hunk @@ -212), and `health_memory_daily: { p_from: NO_WINDOW, p_to: NO_WINDOW }` to FN_EXECUTE_PROBES (hunk @@ -317).
- N2 PRESENT. memoryOverlap.ts computeMemoryOverlap:
  - `offered === null` → whole turn {unknown, memory-unavailable}.
  - Otherwise `entityKnown = resolvedEntityIds !== undefined`, and lenses {entity: measured | {unknown, entity-resolutions-absent}, tool: measured, routine: measured}.
  - An unknown entity lens counts no row, even when the id appears in the arguments.
  - CLARIFICATION_OVERLAP stays {unknown, no-answer}.
- "used": ABSENT. A node scan of all 1235 added lines (manifest excluded) for /\bused\b|kullan/i found 0 hits.
- The migration is byte-equal to my pre-review read: `git diff --quiet b6e347be 9eab2178 -- <migration>` exited 0.
- Suites at the head (scratch tree), all nine named: memoryOverlap 15/15, healthAnalytics 22/22, chatQuotaStream 12/12, memorySliceWiring 6/6, stageClarify 67/67, memoryTab 14/14, healthAnalyticsContract 8/8, migrationFnLockdown 2/2, verifyGrantsFnProbes 4/4 → 150/150.
  - The name filters also matched healthAnalyticsBackendReason 8/8 and stageClarifyLayers 16/16. The run total was "Test Files 11 passed (11) · Tests 174 passed (174)".
- N2 PLANT, in the scratch copy only (the repository is untouched):
  - I added `if (!entityKnown) return { status:'unknown', reason:'memory-unavailable' }`.
  - Result: "Tests 2 failed | 13 passed (15)". The failures were "N2: entityResolutions undefined, tool called → entity UNKNOWN, tool MEASURED true — the other lenses are not lost" and "N2: an unknown entity lens never counts a row — even when the entity is in the call's arguments".
  - Reverted: the scratch file is byte-equal to the head (no-index diff empty), and the suite is back to 15/15.

5 · CI at 9eab2178c898868106b0b578c500a3c46b8bd409. total_count 4, all attempt 1, so nothing was re-run. Every run completed/success: Build and Test 36684849452, Auto-merge landing 36684849390, Relay corpus 36684849497, report-schema 36684849256. No wait was needed; everything was already complete when I read it.
- `changes`: every step success, including "Merge guard (clean-merge + file-fence, run from the merge-base)". Its log: `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head` · `FENCE-GREW ok — head fence is held by the first fence, at 9eab2178…` · `[merge-guard] VERDICT GREEN`.
- `build (24.x)`: every step success. That includes RULE-40, the Migration version-key gate, the Tenant-zero gate, the Backend-name gate, Build and Run tests (which contain doc-drift). It completed at 07:52:17Z.
- `rule26`: success, including the RULE-26 headless clip gate. It ran because public/ is in the diff.
- SKIPPED: `eval-canary`, by design. It is named here and NOT folded into the green.

6 · LANDING — NOT LANDED.
- Collision guard: I read the head statuses twice; there was no adversary/scout.
- I POSTED `adversary/scout | success | scout-2 GREEN ORDER-SCOUT-LAND-PR648-S165-1: fence 21=21, carry 20/20, N1 N2 present, 150/150, CI 4of4 | 2026-09-30T14:27:50Z`.
- Named wait for master, every 60 s, at most 10: waits 1–10 ran from 14:27:57Z to 14:37:17Z. Every read was pr=OPEN, merge=none, master=64f5d5c77e70b1da03b0ea333c760e9ceb2f13d8.
- Final read: `OPEN | none | CLEAN | auto-merge armed 2026-09-30T07:38:25Z by app/github-actions`. mergeable=MERGEABLE, not draft.
- statusCheckRollup is all SUCCESS: arm auto-merge, changes, relay corpus, report-schema, build (24.x), rule26, Vercel, Vercel Preview Comments, adversary/scout. eval-canary is SKIPPED.
- So GitHub itself says CLEAN, and auto-merge is armed, but it has not merged.
- For comparison, PR 647 merged about 70 s after the same status. WHY auto-merge did not fire is UNMEASURED. One candidate I did not verify: the arming at 07:38 fell in the same window as the 07:41Z network outage.
- I did NOT merge by hand, re-run, re-arm or dispatch (all forbidden). Unblocking it is the owner's or Architect's decision: for example, re-arming auto-merge through the house's own path, or pushing a no-op event.
- SKIPPED because nothing merged: printing the merge sha, and the Vercel production deployment at the merge sha. The only Vercel status on the head is preview `success | Canceled by Ignored Build Step`, which is NOT a deploy.
- The adversary/scout success stays on 9eab2178, so if auto-merge fires later, the landing needs no new scout verdict at this head.

HYGIENE: my scratch worktree is removed. `git worktree prune` could not delete eleven stale .git/worktrees/* records that belong to OTHER windows (wt-master, wt-ag1, wt-ag21, wt-ag11, wt640, wt-ag2, wt-ag3, wt-ag4, wt-ag2b, wt-ag2d, wt-ag2c): `Operation not permitted` from the sandbox. They are named here and left alone.
read relay_inbox at 2026-09-30T14:23:15Z (mail-wait exit 0, 1 row) + --read of order 39ba8ad3.
