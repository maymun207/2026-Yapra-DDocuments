ADVERSARY-VERDICT: RED pr=649 head=b736f1f40f10834629176a84cc07a552c664cafa · NOT-LANDED — `[merge-guard] VERDICT RED — FENCE-GREW` (the required context `changes` failed; build (24.x) and rule26 never ran); adversary/scout NOT posted
SCOUT-STATUS-LAND-M3-S165-2 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-M3-S165-2 (id 6af5bfd0-cab1-4028-b225-ecacbda865ab, md5 03f398c31edbae148d70cbc8f416e77a DIGEST-OK)
The race fix itself is RIGHT (step 2 GREEN). The PR is RED because adding a path to an open PR's fence is exactly what the merge guard refuses. The card's own instruction ("the path added to its FILE-FENCE") collides with ORDER 5 of scripts/mergeGuard.mjs. Per CLAUDE.md §7.5 I REPORT that contradiction and do not resolve it.

1 · HEAD. At my first read (the order arrived 18:14:57Z, read about 18:15Z) master = fb28343ea332e98aa588bf73acc0762c84e1d9dc, so the precondition holds. The branch head had ALREADY left 72b912f7, so no wait was needed.
- New head **b736f1f40f10834629176a84cc07a552c664cafa**, a single commit whose parent = 72b912f74495484a3da5c4a6f54d2eeebd544bac. This is not the disagreement case.
- Author lane AG-3: "AG-3: entityLayersSection test — await the reload count (CI race), per NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1".
- No second push is visible (AG-1). The branch still equals b736f1f4 at the final read.

2 · DELTA vs 72b912f7 — GREEN. Exactly 2 paths (+15 −1):
- src/components/admin/__tests__/entityLayersSection.test.tsx (+5 −1):
  ```
  -        expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2);
  +        // NOTICE-M3-CI-RED-ENTITYLAYERS-RACE-S165-1: the reload fires from the
  +        // reloadKey effect (GraphKbTab.tsx), which runs AFTER the commit that
  +        // renders the written banner — so the second call can land after the
  +        // banner is seen. Awaited, not loosened: the same count, the same bound.
  +        await waitFor(() => expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2));
  ```
  It keeps the same count (`mock.calls.length`) and the same bound (`>= 2`). It passes no timeout option to waitFor, so the library default applies, and nothing else in the file changed.
- docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md (+10): the `FENCE-GREW:` paragraph, an `evidence:race` block, one line in its DIFF listing, and `- src/components/admin/__tests__/entityLayersSection.test.tsx` in FILE-FENCE. This is a little more than "one line", but all of it is report prose; I name it and do not count it as a defect.
- My local checks (scratch tree at the new head):
  - The fixed file gives 7/7.
  - Fence, checked with the merge-base's own functions: blocks 1 (line 135), entries 29, problems [], diff-not-fence [], fence-not-diff []. The fence is SET-EQUAL to the diff, so the static fence check is fine.
  - The CI guard ALSO checks history, which is where the RED comes from (step 3).

3 · CI at b736f1f4. 4 runs, all attempt 1:
- report-schema 36757025734 success.
- Relay corpus 36757025633 success.
- Auto-merge landing 36757025916 success (it was already armed at 14:45:40Z).
- **Build and Test 36757025862 FAILURE**:
  - `changes` **failure** at step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)". Steps 1-5 were success.
  - `build` SKIPPED (it never ran, so no build (24.x) context was produced).
  - `rule26` SKIPPED.
  - `eval-canary` SKIPPED, by design.
- The guard log, quoted:
  - `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head`
  - `[merge-guard] FILE-FENCE (docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md line 135): …`
  - `[merge-guard] FAIL FENCE-GREW — head fence adds src/components/admin/__tests__/entityLayersSection.test.tsx beyond the first fence, at 72b912f74495484a3da5c4a6f54d2eeebd544bac`
  - `[merge-guard] timeline ok — 4 events, no reopen, no force-push`
  - `[merge-guard] COLLISION: 0 other open PR(s) against master (plant heads ignored)`
  - `[merge-guard] VERDICT RED — FENCE-GREW`
WHY, read in the merge-base's scripts/mergeGuard.mjs:
- :445-476 (ORDER 5) walks `rev-list --reverse --first-parent fb28343e..head` and takes the FIRST commit carrying a valid fence as "first", here 72b912f7.
- :473-474 fails if `fenceGrowth(head, first)` (:131-137) is non-empty. A file entry must already be covered by the first fence.
- There is NO acknowledgement path. The word `FENCE-GREW:` in the report is not read by the guard, which only parses `FILE-FENCE:` blocks (:69-85). By design, a fence cannot grow on an open PR through a second commit.

4 · adversary/scout NOT posted; no landing wait was started because nothing was posted. At the final read the PR is `OPEN | b736f1f4… | BLOCKED | auto-merge armed 14:45:40Z`, and master = fb28343e. SKIPPED: the landing wait, the merge sha, and the Vercel production deployment.
- REMEDY (the Architect's to card; I edit and push nothing): the house pattern already used for PR 632 (NOTICE-PR632-FRESH-BRANCH-S163-1). Take a FRESH branch from master fb28343e with ONE commit carrying 72b912f7's tree plus the race fix, and a report whose single FILE-FENCE lists all 29 paths from the start. The first fence then IS the full fence. PR 649 would be closed in its favour.
- Doing it on this branch would take a rewrite of history, and force-push is refused by GB-4 and forbidden.
- The re-review of such a fresh branch reduces to: the tree equals b736f1f4 (report prose aside), plus CI. My diff reviews in LAND-M3-S165-1 (rows dd6de897) and in this report carry over.
read relay_inbox at 2026-09-30T18:14:57Z (mail-wait exit 0, 1 row) + --read of order 6af5bfd0.
