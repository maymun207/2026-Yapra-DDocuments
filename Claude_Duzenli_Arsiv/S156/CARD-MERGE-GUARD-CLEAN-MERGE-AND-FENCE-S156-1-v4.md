<!-- relay-audit: v1 kind=card -->
CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v4

LANE: AG-2 (first boot in S156: fresh window, takeover per the boot text)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:52Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3 (scout RED, SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3, bus 2026-09-23T02:47:11Z). v4 applies D1 to D9 exactly as that verdict wrote them; the scout judged the v3 mechanism "worth it once D2 makes it sound". LOOP EXIT, named to the owner before this cut: if v4 is RED on a NEW mechanism defect, the card is parked and the factory runs today on Architect-assigned disjoint ORDER 0 sets checked by the scout, with no further version.
OWNER APPROVAL: S156, owner "onay" 2026-09-23 05:01 TSI for this card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism. Owner's question that produced it (S112-YASA-1, by name): parallel lanes merging on their own could silently erase each other's changes in the same file; do we need a foreman; how do we stop it without losing speed.
ADVERSARY GATE: back to the scout (ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v4, which carries the v3 defect list); reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/merge-guard-clean-merge-and-fence-s156-1 off origin/master · PUSH early · REPORT docs/relay/MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-AG2-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the ruleset requires the branch to be up to date, and its required contexts | MEASURED: GitHub API, the ruleset named master-merge-gate, Architect bridge, 2026-09-23T01:52Z | ruleset |
| a merge-tree rehearsal exists in the tree, and land.ts tests import it from there | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:52Z | rehearsal |
| reseal writes one manifest path, named by an absolute-path constant in a TypeScript file | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:52Z | reseal |
| the changes job is required and short, and other required jobs need it | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:52Z | changesjob |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:ruleset
MEASURED: ruleset master-merge-gate rules, strict flag and required contexts
required_status_checks strict=True contexts=changes, rule26, build (24.x), relay corpus (grammar v1), adversary/scout
updated_at 2026-09-23T04:52:00.201+03:00 (owner saved it in S156)
```

```evidence:rehearsal
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/land.ts:1588: * STEP 4 · the merge-tree rehearsal.
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/land.ts:2492:    let mtRaw = git('merge-tree', '--write-tree', baseSha, liveHead);
1ca28ede61588ff542764cf3f1375568c94436ae:api/cwf/__tests__/landScript.test.ts:35:    judgeMergeTree,
```

```evidence:reseal
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/reseal.ts:45:    writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + (hadTrailingNewline ? '\n' : ''));
1ca28ede61588ff542764cf3f1375568c94436ae:scripts/docDriftCore.ts:31:export const MANIFEST = resolve(ROOT, 'public/architecture/manifest.json');
```

```evidence:changesjob
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:40:  pull_request:
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:109:  changes:
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:111:    timeout-minutes: 5
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:259:    needs: changes
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:386:    needs: changes
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-23T02:23:47Z, 02:34:42Z, 02:47:11Z): the repository allows squash and rebase merges; pull_request has no types list, so a PR body edit fires no run; the guard hook permits --force-with-lease and non_fast_forward covers the default branch only; manifest tabs carry codeAreas and a diagram, and one tab's diagram is a code path; the repository is private, forks are allowed, none exist, default workflow permissions are read; open PRs today = 0; the last 50 closed PRs are all by one login; the changes job has no setup-node step today; docDriftCore.ts imports only node builtins; the last 20 first-parent landings carry 10 in-branch merges and 0 renames.
UNMEASURED by design, the named residual (D8): no two open PRs hold one path; a revert inside a lane's own diff (after it merged master and then rewrote lines another PR had landed, or after a rebase done before its PR opened) is left to the scout's review of that diff.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
Replay CLEAN-MERGE over the in-branch merges (second-parent side) of the last 20 first-parent landings: no honest merge fails. FENCE and COLLISION on history print UNMEASURED (historic PRs carry no fence), never a pass (D7). A check that passes any red plant of ORDER 9, or fails its green control, is wrong: STOP and report.

## ORDERS
1. Shared rehearsal: one .mjs module under scripts/ returning the RAW merge-tree rehearsal (tree line, exit, conflicted flag, object-missing flag), loadable by plain node and by tsx. scripts/land.ts keeps mergeTreeSha, isObjectMissing and judgeMergeTree byte-identical in behaviour and keeps exporting them; landScript.test.ts and landSelfTest.ts stay unmodified and green.
2. CLEAN-MERGE: judged against the PR's own base. Every commit in merge-base..head with two or more parents: more than two prints UNMEASURED and fails; for two, the commit's tree may differ from the rehearsal (clean or conflicted) only in the reseal paths; any other path fails with commit (full 40-hex) and paths. A rehearsal that cannot run prints UNMEASURED and fails.
3. RESEAL PATHS: materialise scripts/docDriftCore.ts from the MERGE-BASE into a temp dir, import it with Node 24 type stripping, take relative(ROOT, MANIFEST) from that copy; a base without the export prints UNMEASURED and fails. This ADDS a setup-node 24.x step to the changes job (it has none today); print its cost against timeout-minutes 5 (D9).
4. FENCE IN THE TREE (D1): the fence is a FILE-FENCE: block inside the PR's own report file under docs/relay/ (exactly one such block among the PR's changed report files, else fail NO-FENCE). A fence change is therefore a push and a new head, and the per-sha adversary/scout status drops until the scout re-reviews. Dialect (D2): literal repo paths and directory prefixes ending in '/'; no globs; a line that is '/' or empty-prefix is refused (WHOLE-TREE-FENCE). Every entry of git diff --name-status -M merge-base..head, BOTH paths of a rename (D3), must match the fence, the reseal paths, or the narrative exemption: exactly 'public/architecture/' + tabs[].diagram as read at the merge-base, only where that lies under public/architecture/; codeAreas never; print each tab's resolution. Exemptions beyond these: none (D5), and the card says so.
5. COLLISION (D2): list every other open PR against the same base (API, live) and read each one's fence from ITS head via the contents API. Two fences overlap iff one entry equals or is a directory prefix of another (a property of the fences alone). Any overlap fails the PR with the HIGHER number, printing both numbers and the overlapping entries (YIELDED-TO #N). FENCE-GREW: the head fence must be a subset of the fence in the first commit of the branch that carries a fence, else fail. REOPENED: a reopened PR fails (open a new PR). An open PR whose fence cannot be read prints UNMEASURED and fails the higher-numbered PR. Non-plant PRs ignore heads under plant/merge-guard-s156-* (rule read from the merge-base); plants are judged among themselves (D6).
6. SELF-JUDGEMENT (D4): the checker is materialised from the MERGE-BASE and that copy is run, so a PR editing the checker is judged by the old checker. A PR touching .github/workflows/build-test.yml or the checker prints GUARD-SELF-EDIT, and the scout's status must quote that line; build-test.yml edits stay a named residual carried by adversary/scout.
7. HISTORY REWRITE: read the PR timeline live; a head_ref_force_pushed event prints UNMEASURED and fails. A rebase before the PR opened is in the residual.
8. Wiring (D9): a step of the existing required changes job, after its decide step. On any event other than pull_request it prints UNMEASURED and exits 0. Job permissions: contents: read, pull-requests: read, issues: read (timeline). A fork PR fails. The block is the changes context itself being required and red (the jobs that need it then report skipped); say so. No digest machinery (withdrawn with the body fence).
9. Tests and plants: unit tests per order. In CI, as DRAFT pull_requests on scratch branches plant/merge-guard-s156-*, one GREEN control (clean merge + reseal-only merge + fenced change) and red plants each printing its CLASS plus commit or path: COLLISION (two plants, the higher number red), FENCE-GREW, REOPENED, OUTSIDE-FENCE, NO-FENCE, WHOLE-TREE-FENCE, RENAME-SOURCE-OUTSIDE, MERGE-HAND-EDIT, OCTOPUS, FORCE-PUSH. The FORCE-PUSH plant force-pushes ONLY its own plant branch. Re-read the box immediately before the first plant push and before the force-push; if any card has arrived since this one, STOP and report rather than proceeding. Close the plant PRs and delete the plant branches after reading them; name any stall a plant caused and its remedy.
10. The FALSIFIER replay table. Your own report file carries this PR's FILE-FENCE.
11. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 with branch, full head sha, PR number, CI runs by full sha, the replay table, the plant results, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "a check that cannot look fails and says so". The Architect decided: prevention by disjoint open fences; the fence lives in the tree; literal paths and directory prefixes only; the higher-numbered PR yields; the checker runs from the merge-base.
FORBIDDEN: no ruleset or branch-protection write; no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v4
