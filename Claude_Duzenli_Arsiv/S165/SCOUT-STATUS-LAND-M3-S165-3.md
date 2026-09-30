ADVERSARY-VERDICT: GREEN pr=650 head=806a99a6a188142586757943f86b655a384b8899 · LANDED merge=d768bc2915524b7fbe5987aa86f45d8932f09508
MIGRATION: 20260930060000_learning_snapshots_human_evidence OPERATOR-PENDING (not applied)
SCOUT-STATUS-LAND-M3-S165-3 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-M3-S165-3 (id 587f4d0a-6cfc-4d4f-a993-dab3bb6f6916, md5 d686f4ea4f802c6b5b9fd33227b4a837 DIGEST-OK)
Review = tree equality + CI (loop-breaking scope). My diff reviews in -1 (dd6de897) and -2 (6dc5b1ca) carry over.

1 · PR. The named wait (every 2 min, ≤ 20) ran from 18:24:08Z. At waits 1–13, 649 was OPEN at b736f1f4 and nothing else was open. At wait 14 (18:50:39Z): 649 CLOSED, exactly ONE open PR, **650** on phase/m3-feedback-evidence-s165-3 @ **806a99a6a188142586757943f86b655a384b8899**. Master = fb28343ea332e98aa588bf73acc0762c84e1d9dc at every wait. No disagreement case.

2 · SHAPE — GREEN.
- One commit (AG-3: "M3 — human feedback becomes evidence: …"), parent = fb28343ea332e98aa588bf73acc0762c84e1d9dc. Not a draft.
- `git diff --stat b736f1f4 806a99a6` → ` docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md | 2 +-` · `1 file changed, 1 insertion(+), 1 deletion(-)`. The one line is the `FENCE-GREW:` paragraph rewritten as "CARRIED to a fresh branch per NOTICE-M3-FRESH-BRANCH-S165-1 (first fence = full fence). …". Everything else, including the race fix and the manifest, is byte-equal to b736f1f4.
- Report: exactly ONE line that trims to `FILE-FENCE:` (two more lines mention the word in prose). The merge-base's own mergeGuard.mjs gives blocks 1 (line 135), entries 29, problems [], diff-not-fence [], fence-not-diff []. The fence equals `git diff --name-only fb28343e 806a99a6` (29 paths).

3 · CI at 806a99a6. 4 runs, all attempt 1:
- Relay corpus 36761402581 success · report-schema 36761402882 success · Auto-merge landing 36761402689 success.
- Build and Test 36761402752 success. Named wait from 18:51:21Z: rule26 done at wait 4, build (24.x) done at wait 10 (19:09:28Z).
  - `changes` success; its merge-guard step logged:
    - `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head`
    - `[merge-guard] FENCE-GREW ok — head fence is held by the first fence, at 806a99a6…`
    - `[merge-guard] timeline ok — 3 events, no reopen, no force-push`
    - `[merge-guard] COLLISION: 0 other open PR(s) against master`
    - **`[merge-guard] VERDICT GREEN`**
  - `build (24.x)` success, every step: RULE-40, the Migration version-key gate, the Tenant-zero gate, the Backend-name gate, Build and Run tests. The race fix held in CI.
  - `rule26` success (RULE-26 headless clip gate).
  - SKIPPED: `eval-canary`, by design, not folded into the green.

4 · LANDING.
- Collision guard: statuses on the head read twice (only Vercel preview, `Canceled by Ignored Build Step`); adversary/scout count 0 immediately before posting.
- POSTED `adversary/scout | success | scout-2 GREEN ORDER-SCOUT-LAND-M3-S165-3: tree = b736f1f4 but report, fence 29=29, guard GREEN, CI 4of4 | 2026-09-30T19:09:59Z`.
- Named wait for master, every 60 s, at most 10: wait 1 (19:10:08Z) and wait 2 were OPEN/CLEAN. At wait 3 (19:12:12Z) the PR was MERGED; mergedAt 19:12:08Z, **by app/github-actions (auto-merge fired)**; merge = master = **d768bc2915524b7fbe5987aa86f45d8932f09508**.
- Vercel PRODUCTION at the merge sha: `Production | success | Deployment has completed | 2026-09-30T19:17:58Z`. There was no deployment at waits 1–6; it appeared at wait 7 (19:18:29Z).
- Note on F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1: here the timeline reads auto_merge_enabled 18:50:15Z (github-actions[bot]) → adversary/scout 19:09:59Z (19m44s later) → merged 19:12:08Z by github-actions[bot] (2m09s after the final context). This matches the 647 pattern (short arming-to-final gap), not 648's. The finding stays UNMEASURED; this is one more data point, not a cause.

read relay_inbox at 2026-09-30T18:23:49Z (mail-wait exit 0, 1 row) + --read of order 587f4d0a.
