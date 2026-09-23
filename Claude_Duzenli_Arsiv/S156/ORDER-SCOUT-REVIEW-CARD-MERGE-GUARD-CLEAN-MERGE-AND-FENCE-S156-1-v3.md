<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3

LANE: scout (the merge-guard scout window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S156, bridge clock 2026-09-23T02:37Z
OWNER APPROVAL: S156 owner "onay" 2026-09-23 05:01 TSI for the merge-guard card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: the card below was checked on the bridge with node --import tsx scripts/cardPreflight.ts --check: GREEN on all eleven checks. That is a GRAMMAR verdict, not a review (12.1). This notice itself is expected to refuse CP-1 (kind=notice).
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: re-review of CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3 (merge guard, supersedes item 70), the card a scout RED-ed as v1 and v2. A cleared window cannot read its own earlier status (from_lane rows are not readable by mail-wait), so the v2 defect list is carried below, as a PARAPHRASE of SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2 (bus 2026-09-23T02:34:42Z): X1 resurrection blind; X2 rebase and force-push collapse pre-merge history; X3 pre-merge history undefined; X4 renames and moved lines; X5 binary paths; X6 body edited after GREEN; X7 manifest tabs ambiguous; X8 exemptions read from the head; X9 MANIFEST mechanics and .mjs; X10 no green control, missing plants; X11 non-master base and fork PRs. Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = 0717af8e8b12c54d65b0e99eb8a7f61a1d3c39d1785834801d0006ff8fb8b4c4.
PARALLEL CARDS: G1b v2 and G2 v2 are in review in the other windows.

## PREMISE
MEASURED: 2026-09-23T02:37Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v4 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run cardPreflight --check on the card bytes and mail-wait --read on this order; print any refusal verbatim; if they disagree, print both.
2. Read each evidence fence against origin/master and the live DB (read-only): does each quote its source's bytes? Then attack: for each of X1 to X11: answered, withdrawn with reason, or applied, with the card line. Then attack the NEW design: ORDER 5 COLLISION (can two lanes still hold the same file open at once; is later-opened-yields deadlock-free; what if a fence is edited after the other PR opens; is the API list of open PRs complete and live); ORDER 6 digest binding; ORDER 7; whether prevention by disjoint fences slows the factory more than it protects it; whether the named residual in the PREMISE is honest.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no DB write, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3

LANE: AG-2 (first boot in S156: fresh window, takeover per the boot text)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:37Z (bridge clock, date -u in the command that wrote this file)
SUPERSEDES: CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2 (scout RED, SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v2, bus 2026-09-23T02:34:42Z). LOOP BREAK, by name (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1): v1 and v2 tried to DETECT a stale-copy overwrite after the fact; each review found new edges (v2: resurrected lines X1, rebase and force-push X2, body edits after GREEN X6). v3 removes the class STRUCTURALLY instead: two open PRs may never hold overlapping fences, so no lane can hold a stale copy of a file another open lane is changing. The OVERWRITE blame order of v2 is withdrawn, not shrunk: X1 and X3 to X5 addressed a mechanism that no longer exists. X2, X6, X7, X8, X9, X10, X11 are applied below.
OWNER APPROVAL: S156, owner "onay" 2026-09-23 05:01 TSI for this card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism. Owner's question that produced it (S112-YASA-1, by name): parallel lanes merging on their own could silently erase each other's changes in the same file; do we need a foreman; how do we stop it without losing speed.
ADVERSARY GATE: back to the scout (ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3, which carries the v2 defect list); reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/merge-guard-clean-merge-and-fence-s156-1 off origin/master · PUSH early · REPORT docs/relay/MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-AG2-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| the ruleset requires the branch to be up to date, and its required contexts | MEASURED: GitHub API, the ruleset named master-merge-gate, Architect bridge, 2026-09-23T01:52Z | ruleset |
| a merge-tree rehearsal exists in the tree, and land.ts tests import it from there | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:37Z | rehearsal |
| reseal writes one manifest path, named by an absolute-path constant in a TypeScript file | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:37Z | reseal |
| the changes job is required and short, and other required jobs need it | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:37Z | changesjob |

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
UNMEASURED by the Architect, READ from the scout's primary-source readings (bus 2026-09-23T02:23:47Z and 02:34:42Z): the repository allows squash and rebase merges, so "merge commit only" is a property of the arming workflow; pull_request has no types list, so a PR body edit fires no run and a re-run replays the original payload; the guard hook permits --force-with-lease and the ruleset's non_fast_forward covers the default branch only, so phase branches can be rebased or force-pushed; manifest tabs carry codeAreas and a diagram, and one tab's diagram is a code path; the repository is private, forking is allowed, no forks exist, default workflow permissions are read; the last twenty first-parent landings hold ten merge commits, all clean or manifest-only.
UNMEASURED by design, a named residual: a lane can still overwrite its OWN earlier work from a stale copy; that is its own diff and the scout reviews it. The mechanism below does not claim to detect it.
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
Replay CLEAN-MERGE and FENCE over enough recent first-parent landings to include at least ten merge commits (print the count and window): no honest PR fails. COLLISION cannot be replayed (historic fences do not exist): print UNMEASURED for history, never a pass. A check that passes any red plant of ORDER 9, or fails its green control, is wrong: STOP and report.

## ORDERS
1. Shared rehearsal (X9): one .mjs module under scripts/ returning the RAW merge-tree rehearsal (tree line, exit, conflicted flag, object-missing flag), loadable by plain node and by tsx. scripts/land.ts keeps mergeTreeSha, isObjectMissing and judgeMergeTree byte-identical in behaviour and keeps exporting them; landScript.test.ts and landSelfTest.ts stay unmodified and green.
2. CLEAN-MERGE: judged against the PR's OWN base (X11). Every commit in merge-base..head with two or more parents: more than two prints UNMEASURED and fails; for two, the commit's tree may differ from the rehearsal (clean or conflicted) only in the reseal paths; any other path fails with commit (full 40-hex) and paths. A rehearsal that cannot run prints UNMEASURED and fails.
3. RESEAL PATHS (X9): materialise scripts/docDriftCore.ts from the MERGE-BASE into a temp dir, import it with Node 24 type stripping (setup-node 24.x is REQUIRED), take relative(ROOT, MANIFEST) from that copy; a base without the export prints UNMEASURED and fails.
4. FENCE: every PR carries a FILE-FENCE: block in its body (git pathspec glob dialect), read LIVE from the API. Every path in git diff -M --name-only merge-base..head must match the fence, the reseal paths, or the narrative exemption (X7): exactly 'public/architecture/' + tabs[].diagram as read at the merge-base, and only where that result lies under public/architecture/; codeAreas never; public/architecture/index.html is named by no tab and needs the fence; print each tab's resolution. A fence line matching the whole tree is refused; a missing fence fails.
5. COLLISION (replaces v2's OVERWRITE): list every OTHER open PR against the same base (API, live), read each one's live FILE-FENCE, and expand both fences against the union of both PRs' changed paths. Any overlap fails the PR that was OPENED LATER, printing both PR numbers and the overlapping paths; the earlier PR passes. An open PR with no readable fence prints UNMEASURED and fails the later PR (it cannot prove disjointness). This is what makes the owner's case impossible: while one lane changes a file, no other open lane may hold it.
6. DIGEST BINDING (X6): print the sha256 of the fence block. The scout's adversary/scout status on a head must quote that digest; on any run where an adversary/scout status exists at the head and quotes a different digest (the body was edited after the scout judged it), fail. Exemptions for the guard itself are read from the MERGE-BASE, keyed on the PR author login from the API (X8), and a PR touching the checker or build-test.yml prints GUARD-SELF-EDIT.
7. HISTORY REWRITE (X2): read the PR timeline live; any head_ref_force_pushed event prints UNMEASURED (history rewritten, CLEAN-MERGE cannot judge) and fails. Name the rebase path in the report.
8. Wiring: a step of the existing required changes job, placed after its decide step. On any event other than pull_request it prints UNMEASURED and exits 0. Job permissions: contents: read, pull-requests: read, statuses: read, issues: read (timeline). Do not add the edited type. A fork PR fails, it does not skip (X11). Print runtime before and after and stay inside the job's timeout; state that a red guard makes the jobs that need changes report skipped, which is the intended block.
9. Tests and plants (X10): unit tests per order. In CI, as DRAFT pull_requests, one GREEN positive control (clean merge + reseal-only merge + fenced change) and red plants, each printing its named CLASS plus the offending commit or path: COLLISION (two drafts, overlapping fences, the later one red), OUTSIDE-FENCE, NO-FENCE, WHOLE-TREE-FENCE, MERGE-HAND-EDIT, OCTOPUS, FORCE-PUSH. Plant branches are scratch branches named plant/merge-guard-s156-*; the FORCE-PUSH plant force-pushes ONLY such a branch. Re-read the box immediately before the first plant push and before the force-push; if any card has arrived since this one, STOP and report rather than proceeding. Close the plant PRs and delete the plant branches after reading them.
10. The FALSIFIER replay table. Your own PR body carries its FILE-FENCE.
11. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 with branch, full head sha, PR number, CI runs by full sha, the replay table, the plant results, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "a check that cannot look fails and says so". The Architect decided: prevention by disjoint open fences instead of after-the-fact overwrite detection; the later-opened PR yields; enforcement through the existing required changes job.
FORBIDDEN: no ruleset or branch-protection write; no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v3
