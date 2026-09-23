<!-- relay-audit: v1 kind=card -->
CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2

LANE: AG-2 (first boot in S156: fresh window, takeover per the boot text)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:26Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1 (scout RED, SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1, bus 2026-09-23T02:23:47Z). Applied: D1 as the scout's own change (a new OVERWRITE order, plant pinned), and D2 to D8 as edits. Nothing else changed in intent.
OWNER APPROVAL: S156, owner "onay" 2026-09-23 05:01 TSI for this card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism. Owner's question that produced it (S112-YASA-1, recorded by name): parallel lanes merging on their own could silently erase each other's changes in the same file; do we still need a foreman, and how do we stop it without losing speed. The v1 design did not cover his exact case (same file, ordinary commit after a merge of master); the scout found it (D1).
ADVERSARY GATE: back to the scout that wrote the v1 RED (ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2); reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/merge-guard-clean-merge-and-fence-s156-1 off origin/master · PUSH early · REPORT docs/relay/MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-AG2-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| landings are armed as GitHub merge commits by the arming workflow | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:26Z | automerge |
| the ruleset requires the branch to be up to date, and its required contexts | MEASURED: GitHub API, the ruleset named master-merge-gate, Architect bridge, 2026-09-23T01:52Z | ruleset |
| a merge-tree rehearsal exists in the tree, and land.ts tests import it from there | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:26Z | rehearsal |
| reseal writes one manifest path, named by a constant | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:26Z | reseal |
| the changes job is required, short, and other required jobs need it | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:26Z | changesjob |

```evidence:master
1ca28ede61588ff542764cf3f1375568c94436ae
```

```evidence:automerge
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/auto-merge.yml:76:          gh pr merge "${{ github.event.pull_request.number }}" --auto --merge
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
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:279:    timeout-minutes: 45
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:386:    needs: changes
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:430:    timeout-minutes: 20
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:481:      timeout-minutes: 5
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:494:      timeout-minutes: 5
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:526:    timeout-minutes: 25
```

## PREMISE
MEASURED: the anchors above. Silent-loss paths after the strict flag and the force-push block: (a) a hand edit inside a merge commit of master; (b) an ORDINARY commit after a merge of master that rewrites lines from a stale copy, on a file inside the author's fence (the owner's case, and v1's blind spot); (c) a PR touching files outside its card's scope.
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-23T02:23:47Z): over the last twenty first-parent landings, ten merge commits, six clean and tree-equal, four conflicted only in the manifest and passing as reseal-only, none failing; the repository itself allows squash and rebase merges, so "merge commit only" is a property of the arming workflow; pull_request has no types list, so a PR body edit fires no run.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
Replay over enough recent first-parent landings to include at least ten merge commits (print the count and the window): the check must pass every PR whose merges were clean or reseal-only and must not fail any PR on OVERWRITE except where a line landed on master after that PR's fork was removed; print every such case as a table (PR, commit, path, line) for the scout to judge. A check that passes any of the four plants in ORDER 7, or fails an honest historic PR on CLEAN-MERGE or FENCE, is wrong: STOP and report.

## ORDERS
1. Shared rehearsal: move the merge-tree call into one module under scripts/ that returns the RAW rehearsal (tree line, exit code, conflicted flag, object-missing flag). scripts/land.ts keeps mergeTreeSha, isObjectMissing and judgeMergeTree with byte-identical behaviour and keeps exporting them; api/cwf/__tests__/landScript.test.ts and scripts/landSelfTest.ts stay unmodified and green.
2. CLEAN-MERGE: for every commit in merge-base..head with two or more parents: more than two parents prints UNMEASURED and fails; for two parents, rehearse the parents with the shared module; the commit's tree may differ from the rehearsed tree (clean or conflicted) ONLY in the reseal paths of ORDER 3; any other differing path fails, printing the commit (full 40-hex) and the paths. A rehearsal that cannot run prints UNMEASURED with its reason and fails.
3. RESEAL PATHS: import the manifest constant as it stands at the MERGE-BASE (base side), never at the PR head, so a PR cannot widen its own exemption; print it.
4. OVERWRITE (scout D1): for every line that git diff merge-base..head removes or rewrites, outside the reseal paths, blame that line at the merge-base. If the blamed commit is reachable from the merge-base but NOT from the branch's pre-merge history (it landed on master after the fork and arrived through the lane's own merge of master), fail, printing commit, path and line, unless the PR body lists that commit under an OVERWRITES: block (an author who means to change another lane's landed line says so, and the scout judges it).
5. FILE-FENCE: every same-repository PR to master carries a FILE-FENCE: block in its body, one pattern per line, git pathspec glob dialect; the only exemptions are listed in the script by name and printed. Every path in git diff --name-only merge-base..head must match the fence, the reseal paths, or a file named by the manifest's tabs at the merge-base (the narrative files, nothing else in public/architecture/). A fence line matching the whole tree is refused. A PR with no fence fails and says so. The check prints the fence verbatim with its sha256 so the scout can compare it with the card's ORDER 0 list.
6. Wiring: a step of the existing required changes job in .github/workflows/build-test.yml. On any event other than pull_request it prints UNMEASURED and exits 0 (master push, merge_group and workflow_dispatch are never skipped by a guard fault). It reads the PR body LIVE from the API at run time (a re-run must see the current body), with a job permissions block of pull-requests: read and contents: read. Do not add the edited type to the trigger. The checker is dependency-free (node built-ins only) so the job needs no npm ci; add setup-node 24.x if the runner's node cannot run it; print the job's runtime before and after and keep it inside the job's timeout.
7. Tests and plants: unit tests for each order's pass and fail arm. In CI, four plants, each as a DRAFT pull_request (drafts are not armed for auto-merge) that goes red on the named step: (i) the owner's case: a clean merge of master, then a single-parent commit rewriting a master-landed line on a path INSIDE the fence; (ii) a path outside the fence; (iii) a non-manifest hand edit inside a merge commit; (iv) an octopus merge. Close the plant PRs after reading them.
8. Your own PR body carries its FILE-FENCE (the new module and script, scripts/land.ts, .github/workflows/build-test.yml, their tests, your report path).
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 with branch, full head sha, PR number, CI runs by full sha, the FALSIFIER table, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "a check that cannot look fails and says so". The Architect decided: enforcement through the existing required changes job; the fence and OVERWRITES live in the PR body, read live; reseal paths at the base side.
FORBIDDEN: no ruleset or branch-protection write; no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2
