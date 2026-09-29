ADVERSARY-VERDICT: RED pr=637 head=8a8337361a2b09f132921f4dc34940bb5d7bc543 · NOT-LANDED — merge guard FAIL FORCE-PUSH: the ordered server-side rebase left a head_ref_force_pushed event on #637, and the guard refuses any rewritten history

SCOUT-STATUS-LAND-K32-S163-2 · from scout-1 · reply to ORDER-SCOUT-LAND-K32-S163-2 (bus 9d0a9a34-5d2c-4931-acdf-0c861fb72135, md5 370dcb91a0231eb4945651e8075989ef, DIGEST-OK)

BOOT CONTROLS: guard-bash BLOCKED GB-4 (pass) · guard-mcp BLOCKED GM-1 (pass) · ls-remote master = HEAD = ee12161ecad43b338489e85fcb73df1e08aa8ac0 (tree current).

1. NEW HEAD (no wait needed; it had already moved at first read)
   gh pr view 637 --json headRefOid -> 8a8337361a2b09f132921f4dc34940bb5d7bc543 (differs from 6783a4ae6e060ae4e40eb2e0fd9249c99458dc42)

2. SHAPE: CLEAN
   git log --format='%H %P' ee12161e..8a833736 -> ONE commit, 8a8337361a2b09f132921f4dc34940bb5d7bc543, parent ee12161ecad43b338489e85fcb73df1e08aa8ac0
   master read 1 (ls-remote) = ee12161ecad43b338489e85fcb73df1e08aa8ac0 ; master read 2 = ee12161ecad43b338489e85fcb73df1e08aa8ac0 -> parent is CURRENT master
   git range-diff ed033de0..6783a4ae ee12161e..8a833736 -> "1: 6783a4ae = 1: 8a833736" (identical patch)

3. CI at 8a8337361a2b09f132921f4dc34940bb5d7bc543 (check-runs total_count=8 on read 1 and read 2, identical):
   Auto-merge landing run 36531793332 success (arm auto-merge success)
   report-schema run 36531793463 success
   Relay corpus run 36531793522 success (relay corpus (grammar v1) success)
   Build and Test run 36531793496 FAILURE:
     changes job 109286885966 failure — step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)" failure; annotation "Process completed with exit code 1."
     build SKIPPED, rule26 SKIPPED (they need: changes; the block working, not a flake)
     eval-canary SKIPPED (by design)
   Vercel status: success "Canceled by Ignored Build Step"
   mergeStateStatus: BLOCKED (read twice; not BEHIND)

   [merge-guard] VERDICT — CI LOG UNREAD, stated as such: the job log download (gh run view --log-failed; gh api .../jobs/109286885966/logs) failed from this window both times (gh cache path not permitted; log blob host "context deadline exceeded"). So the CI VERDICT line is NOT quoted from CI. Two other lenses:
   (a) Local rerun of the merge-base checker (merge-base = ee12161e = this clone's HEAD, so the on-disk scripts/mergeGuard.mjs is the one CI extracted), same args CI passes:
       [merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
       [merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 8a8337361a2b09f132921f4dc34940bb5d7bc543
       (every changed path inside the fence / reseal / narrative exemption — no OUTSIDE-FENCE)
       [merge-guard] FAIL UNMEASURED — timeline of #637 unreadable: ... → fetch failed
       [merge-guard] FAIL UNMEASURED — open pull requests against master unreadable: ... → fetch failed
       [merge-guard] VERDICT RED — UNMEASURED
       The API half is UNMEASURED locally (no network to api.github.com from node here), not a finding about the PR.
   (b) gh api repos/maymun207/cwf_yaprak/issues/637/timeline:
       committed 2026-09-29T06:34:39Z 8a8337361a2b09f132921f4dc34940bb5d7bc543
       head_ref_force_pushed 2026-09-29T06:34:41Z maymun207 8a8337361a2b09f132921f4dc34940bb5d7bc543
       scripts/mergeGuard.mjs:488-489: any head_ref_force_pushed event -> fail('FORCE-PUSH', "a rewritten history cannot be judged").
   So the CI failure is, by the code plus the timeline, FAIL FORCE-PUSH; the git half is green. Confidence rests on (a)+(b), not on the CI log.

4. NOT POSTED: adversary/scout success was NOT written (not clean). No failure status written either — not ordered. No landing wait (nothing can land: changes is a required context and red).

FINDING FOR THE ARCHITECT (card-vs-gate contradiction, reported, not resolved):
   CARD-UPDATE-PR637-S163-1 ordered `gh pr update-branch --rebase`. A rebase-mode update rewrites the PR head and GitHub records head_ref_force_pushed, which MERGE-GUARD fails unconditionally and permanently for this PR number (the event stays in the timeline; a new push does not clear it). #637 cannot go green by any further push.
   The content is fine: identical patch, one commit on current master, fence clean.
   Remedy is the Architect's to cut, e.g. the PR 632 precedent (NOTICE-PR632-FRESH-BRANCH-S163-1): a fresh branch from master carrying 8a8337361a2b09f132921f4dc34940bb5d7bc543's content as a new PR, #637 closed. Merge-mode update-branch (non-rebase) avoids the event for future BEHIND cases.

Clone note: the shared clone shows ".claude/settings.json" staged-modified (present at session start; not mine, untouched).
FORBIDDEN list honoured: no edit, push, merge, re-run, dispatch, cron, migration apply; no environment value printed.
