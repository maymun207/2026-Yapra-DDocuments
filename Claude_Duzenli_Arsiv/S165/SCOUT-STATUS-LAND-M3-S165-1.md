ADVERSARY-VERDICT: RED pr=649 head=72b912f74495484a3da5c4a6f54d2eeebd544bac · NOT-LANDED — required context `build (24.x)` FAILED at step "Run tests" (1 file: src/components/admin/__tests__/entityLayersSection.test.tsx:132, outside M3's diff); adversary/scout NOT posted
MIGRATION: 20260930060000_learning_snapshots_human_evidence OPERATOR-PENDING (not applied)
SCOUT-STATUS-LAND-M3-S165-1 · scout-2 → Architect · reply_to ORDER-SCOUT-LAND-M3-S165-1 (id d59a1a8a-728a-4490-a837-e0e732a603df, md5 b5b6435953ea9b74457fd85eb22ecffb DIGEST-OK)
The diff review is GREEN (steps 5 and 6a, below). The verdict is RED ONLY because a required CI context is red, and the card allows the post only on "Clean". I did not re-run anything (forbidden).

## A · F-S165-AUTOMERGE-ARMED-CLEAN-NOT-MERGED-1 — the reason is UNMEASURED
1. Statuses on 9eab2178c898868106b0b578c500a3c46b8bd409, every context:
   - `adversary/scout | success | maymun207 | 2026-09-30T14:27:50Z` (mine)
   - `Vercel | success | vercel[bot] | 07:38:05Z` (Canceled by Ignored Build Step)
   - `Vercel | pending | vercel[bot] | 07:38:00Z`
   So adversary/scout was PRESENT and success from 14:27:50Z.
2. Ruleset `master-merge-gate` (id 21034238): enforcement active, target ~DEFAULT_BRANCH.
   - rules: deletion · non_fast_forward · required_status_checks.
   - Required contexts (exact strings): `changes`, `rule26`, `build (24.x)`, `relay corpus (grammar v1)`, `adversary/scout`.
   - strict_required_status_checks_policy: true (the branch must be up to date), do_not_enforce_on_create: false.
   - bypass_actors []. No review rule, no merge-queue rule, no other rule.
3. What the three lenses show:
   - (a) Gate vs PR: every requirement was met by 14:27:50Z. All four CI contexts were success (the last at 07:52:17Z), and adversary/scout was success. Strict up-to-date was also satisfied: base 64f5d5c7 = master for the whole window. That matches your REST `clean` at 14:28Z. The `blocked` you read at 14:04Z is simply adversary/scout not being posted yet.
   - (b) PR timeline: `auto_merge_enabled 07:38:25Z github-actions[bot]` → `auto_merge_disabled 14:39:29Z maymun207` → `merged 14:40:08Z maymun207`. There is no disable, failure or conflict event in between.
   - (c) GitHub incidents (githubstatus.com /api/v2/incidents.json): no incident on 2026-09-29 or 09-30. The newest entry is 2026-09-28T21:16:39Z.
   - Comparison with PR 647, the same path that DID fire: armed 07:04:29Z, adversary/scout by the same creator (maymun207) at 07:33:31Z, merged by github-actions[bot] 38 s later (07:34:09Z).
   - The only difference I can measure is time: armed → final context was 29 min for 647 and 6 h 49 min for 648. That is a lead, NOT a cause.
   Every readable surface says the gate was satisfied and auto-merge was still armed, and none shows why GitHub did not act, so the one reason is UNMEASURED.
   Operational consequence: a lane cannot tell "armed and about to merge" from "armed and stuck" by any field I can read. The 10 × 60 s named wait IS the detector. When it runs out on a CLEAN PR, the finding goes to the owner, as it did here.

## B · M3
4. Named wait for the PR: at wait 2/15 (14:46:21Z), PR **649**, phase/m3-feedback-evidence-s165-2 @ **72b912f74495484a3da5c4a6f54d2eeebd544bac**. It is the only open PR and not a draft.
5. SHAPE — GREEN.
   - One commit; its parent is fb28343ea332e98aa588bf73acc0762c84e1d9dc = master (read at the start and again before this report). The tree of fb28343e is a398bd19, equal to the tree of 9eab2178.
   - `git diff --stat fb28343e 72b912f7`: 28 files, +1604 −43.
   - Fence, checked with the merge-base's own mergeGuard.mjs: blocks 1 (line 126), entries 28, problems [], diff-not-fence [], fence-not-diff [].
   - Tree vs 0e457088d2e8245f5954778ce53ee09e479f9261 (whose parent is 9eab2178): the ONLY difference is docs/relay/M3-FEEDBACK-EVIDENCE-S164-1-AG3-report.md, +11 −1. That is the re-pick evidence paragraph and the DIFF baseline line. Code, manifest and migrations are identical, and no generated file moved.
   - Q-1 union: all 92 lines M4a added to MemoryTab.tsx and all 53 it added to memoryTab.test.tsx survive in the head (multiset check, 0 missing). The only line M3 removes against master is `-export function MemoryTab({ lang }: { lang: 'tr' | 'en' }) {`, the signature change the report names. memoryTab.test.tsx removes 0 lines.
6. CI at 72b912f7. 4 runs, all attempt 1:
   - Relay corpus 36731533322 success.
   - report-schema 36731533374 success.
   - Auto-merge landing 36731533516 success (armed 14:45:40Z).
   - **Build and Test 36731533397 FAILURE**:
     - `changes` success. `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head` · `FENCE-GREW ok … at 72b912f7…` · `[merge-guard] VERDICT GREEN`.
     - `rule26` success (at wait 4, 14:54:19Z).
     - `eval-canary` SKIPPED by design. It is named here and not folded into anything.
     - **`build (24.x)` failure** (wait 9, 15:04:23Z). RULE-40, Migration version-key, Tenant-zero, Backend-name and Build were all success. **Run tests: failure**. The job summary is `Test Files 1 failed | 774 passed (775)`.
   - The failing test is `src/components/admin/__tests__/entityLayersSection.test.tsx > declaring a layer — the click path > a successful declaration names the layer and its audit id, and the list reloads`. It fails with `AssertionError: expected 1 to be greater than or equal to 2`.
   DIAGNOSIS (not a licence to re-run):
   - Neither the test file nor GraphKbTab.tsx is in M3's diff. adminService is fully `vi.mock`ed in that test, so M3's adminService.ts change cannot reach it.
   - It is a race built into the test. GraphKbTab.tsx EntityLayersSection :338-341 calls `setLastWrite(…)` and `setReloadKey(k+1)` in one batch. The second `getEntityLayerDescriptors` call lives in the `useEffect([backendId, reloadKey])` at :312-319, which runs AFTER that render commits.
   - The test at :129 waits only for the `entitylayers-written` banner. It then asserts the call count SYNCHRONOUSLY at :132, so under load it can observe 1 before the effect fires.
   - Locally on the head (scratch tree): the file alone gives 7/7, and all of src/components/admin in parallel gives 82/82 files, 1164/1164 tests. It did NOT reproduce.
   - Remedy (the Architect's to card; nothing here re-runs): make :132 `await waitFor(() => expect(h.getEntityLayerDescriptors.mock.calls.length).toBeGreaterThanOrEqual(2))`. Its landing on this PR, or a fresh push, gives a new certificate. It is the same family as the vectorLane/admission follow-up I named in PREREVIEW-M4A: a wall-clock or scheduling assertion.
7. adversary/scout NOT posted; the head carries only the Vercel statuses. At the final read the PR is `OPEN | 72b912f7… | BLOCKED | auto-merge armed 14:45:40Z`, and master = fb28343e.
   - The landing wait was NOT started, because nothing was posted.
   - Does A's cause apply here? No. This PR is BLOCKED by a failed required context. That is a measured, different reason from 648's stall, where the PR was CLEAN and still did not merge.
   - SKIPPED: the landing wait, the merge sha, and the Vercel production deployment.
read relay_inbox at 2026-09-30T14:42:43Z (mail-wait exit 0, 1 row) + --read of order d59a1a8a.
