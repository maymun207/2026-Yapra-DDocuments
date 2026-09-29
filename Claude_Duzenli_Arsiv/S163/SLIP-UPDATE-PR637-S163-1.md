SLIP-UPDATE-PR637-S163-1

AG-1 · answers CARD-UPDATE-PR637-S163-1 (id 363a7c78-6a64-4c7a-9fec-edb305878bf0, md5 cc76fac8039f7d10a5e8a9b9674f5b88, DIGEST-OK, [STAMPED])

STATUS: STOPPED — the ordered update is done and the patch is identical, but the update itself turns the merge guard RED
by design. A ruling is needed; no second action was taken.

ORDER 1  gh pr view 637 → {"baseRefName":"master","headRefOid":"6783a4ae6e060ae4e40eb2e0fd9249c99458dc42","mergeStateStatus":"BEHIND"}
ORDER 2  gh pr update-branch 637 --rebase → "✓ PR branch updated" (server-side; no local push, no merge commit)
ORDER 3  old head 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42
         new head 8a8337361a2b09f132921f4dc34940bb5d7bc543  (parent ee12161ecad43b338489e85fcb73df1e08aa8ac0 = master; ONE commit)
         git range-diff ed033de0..6783a4ae ee12161e..8a833736 →
           1:  6783a4ae = 1:  8a833736 AG-1: CARD-K32-ROUTING-OBLIGATION-S163-1 — routing_obligation kind and its door beside the named-tool door
ORDER 4  npm run build on 8a833736 → [check:doc-drift] [OK] no drift -- all 7 narrative tabs synced (mode=worktree).
         gen:arch-facts "left unchanged"; git status --porcelain -uall → empty. Nothing regenerated, no second commit.
ORDER 5  CI by full head 8a8337361a2b09f132921f4dc34940bb5d7bc543 (total_count 4):
           Relay corpus success · report-schema success · Auto-merge landing success
           Build and Test FAILURE — changes job 109286885966 failed; build and rule26 SKIPPED (gated on changes); eval-canary SKIPPED
         merge guard:
           [merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
           [merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 8a8337361a2b09f132921f4dc34940bb5d7bc543
           [merge-guard] FAIL FORCE-PUSH — UNMEASURED: 1 head_ref_force_pushed event(s) on #637; a rewritten history cannot be judged
           [merge-guard] COLLISION: 0 other open PR(s) against master (plant heads ignored)
           [merge-guard] VERDICT RED — FORCE-PUSH
         PR 637: mergeStateStatus BLOCKED; auto-merge still armed (06:12:40Z).

THE CONFLICT (measured, not resolved)
  `gh pr update-branch --rebase` rewrites the PR head, and GitHub records it as a head_ref_force_pushed event on the PR
  timeline. The guard's timeline check reads that event as UNMEASURED/RED no matter how identical the patch is. So ORDER 2
  and the guard cannot both be satisfied on #637. The same would hold for the card's fallback (local rebase +
  --force-with-lease). The event is now permanent on #637's timeline, so any further push to this PR stays RED.
  Precedent: when the guard refused #629 on principle (MERGE-HAND-EDIT), the remedy was a FRESH branch + PR carrying the
  one commit (#631 → #634). The analogue here would be a new branch at 8a833736 (or a cherry-pick of it onto master), a new
  PR, and #637 closed. NOT done: a new branch/PR and closing #637 are outside this card.
NOT merged. GRAFT: not needed (gh + git only).
