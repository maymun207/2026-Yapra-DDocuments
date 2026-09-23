<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1

LANE: scout (whichever scout window finishes its current review first; one card per window, so /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S156, bridge clock 2026-09-23T02:03Z
OWNER APPROVAL: S156 owner "onay" 2026-09-23 05:01 TSI for the merge-guard card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: the card below was checked on the bridge with node --import tsx scripts/cardPreflight.ts --check: GREEN on all eleven checks. That is a GRAMMAR verdict, not a review (12.1). This notice itself is expected to refuse CP-1 (kind=notice).
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: first review of CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1 (merge guard, supersedes item 70), NEW subject, no gate lift. Card body = the bytes after the BEGIN marker line up to and including the final newline before the END marker line; sha256 = ed4b3a17c4a18bf0fb7720b9c4a13c4f995ca78c1db4d7a64a8ebbaf736d8740.
PARALLEL CARDS: the G2 and G1b cards are in review in the other windows; this card's check will judge their PRs only if it lands first, otherwise the re-status order covers them.

## PREMISE
MEASURED: 2026-09-23T02:03Z, Architect bridge, sha256sum of the card file as embedded below.
SELF-INVALIDATION: dies if a v2 of the card is posted.
ON-DISAGREEMENT: your reading wins; print both.

## STEPS
1. Run cardPreflight --check on the card bytes and mail-wait --read on this order; print any refusal verbatim; if they disagree, print both.
2. Read each evidence fence against origin/master and the live DB (read-only): does each quote its source's bytes? Then attack: ORDER 2 (can a legitimate merge ever differ from its merge-tree rehearsal outside the reseal paths, e.g. rename detection, merge strategy options, or line-ending normalisation, so the check fails honest PRs?); ORDER 4 (does a fence in the PR body let an author widen its own fence; is that acceptable given the scout reviews the body; do docs/relay report paths and the public/architecture exemption leave a hole); ORDER 5 (does a failing step inside the changes job block unrelated PRs, and does the changes job run on every PR event the ruleset needs, including the synchronize after an up-to-date merge); the FALSIFIER (are twenty merged PRs enough and is a planted fault in CI a real proof); whether the land.ts extraction changes land.ts behaviour.
3. Verdict: first line `ADVERSARY-VERDICT: GREEN|RED card=CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1 sha256=<sha256>`, then each defect with the change that makes it GREEN, and which may ride as edits.
REPLY (on the bus): SCOUT-STATUS-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1. If the bus write is refused, print the whole status in your window.
FORBIDDEN: read-only. No status post on any PR, no edit, no DB write, no poll task, no cron. Never print an environment value.

=== BEGIN CARD ===
<!-- relay-audit: v1 kind=card -->
CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1

LANE: AG-2 (first boot in S156: fresh window, takeover per the boot text)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T02:03Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: S156, owner "onay" 2026-09-23 05:01 TSI for this card, the scout re-status order shape, and item 70 SUPERSEDED-BY this mechanism. Owner's question that produced it (S112-YASA-1, recorded by name): parallel lanes merging on their own could silently erase each other's changes in the same file; do we still need a foreman, and how do we stop it without losing speed.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first (ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1); reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/merge-guard-clean-merge-and-fence-s156-1 off origin/master · PUSH early · REPORT docs/relay/MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-AG2-report.md · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. graft may index a stale local tree: line anchors from git show on origin/master.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T01:28Z | master |
| landings are GitHub merge commits, never squash or rebase | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:03Z | automerge |
| the ruleset now requires the branch to be up to date, and its required contexts | MEASURED: GitHub API, the ruleset named master-merge-gate, Architect bridge, 2026-09-23T01:52Z | ruleset |
| a merge-tree rehearsal already exists in the tree | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:03Z | rehearsal |
| the required changes job runs on pull_request | MEASURED: git grep on origin/master, Architect bridge, 2026-09-23T02:03Z | changesjob |

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
```

```evidence:changesjob
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:40:  pull_request:
1ca28ede61588ff542764cf3f1375568c94436ae:.github/workflows/build-test.yml:109:  changes:
```

## PREMISE
MEASURED: the anchors above. The one silent-loss path left after the strict flag and the force-push block: a lane brings master into its branch and then rewrites a file from a stale copy, so another lane's lines are reverted inside a commit git sees as an ordinary change.
UNMEASURED by the Architect: the exact set of paths `npm run reseal` writes (ORDER 3 reads it from the script); whether a step inside the changes job keeps that job within its current runtime (ORDER 5 measures it).
SELF-INVALIDATION: dies if any anchor reads differently at your head (then STOP and print both).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
Replayed over the last twenty merged PRs on master (their merge-base, their merge commits and their final heads), the new check must pass every one whose merge commits were clean, and must name the commit and path for any that was not. A check that fails a PR nobody edited during merge, or passes a planted stale-copy overwrite, is wrong: STOP and report.

## ORDERS
1. Extract the merge-tree rehearsal of scripts/land.ts step 4 into one shared module under scripts/ (no second implementation) and call it from a new script, scripts/checkMergeGuard.ts, run with node --import tsx.
2. CLEAN-MERGE: for every commit in merge-base..head that has two parents, compute git merge-tree --write-tree of its parents. Clean rehearsal and the commit's tree equal: pass. Otherwise the commit's tree may differ from the rehearsal ONLY in the reseal paths (ORDER 3); any other differing path fails the check and prints the commit (full 40-hex) and the paths. A rehearsal that cannot run (object absent) prints UNMEASURED with its reason and fails: "I could not look" is never a pass.
3. RESEAL PATHS: read the set of files npm run reseal writes from the script itself at the PR head, never a list typed in code; print it.
4. FILE-FENCE: a PR from a phase/* branch carries in its body a block starting with a line FILE-FENCE: followed by one path or glob per line (a card's ORDER 0 list). Every path in git diff --name-only merge-base..head must match the fence, the reseal paths, or public/architecture/ narrative files; any other path fails and is printed. A phase/* PR with no FILE-FENCE block fails and says so. Other branches print UNMEASURED and pass, named.
5. Run it as a step of the existing required changes job in .github/workflows/build-test.yml, so it is enforced with no ruleset change (the ruleset is the owner's surface). Print the job's runtime before and after on your PR.
6. Tests: (i) a clean merge passes; (ii) a merge commit with one hand-edited non-seal line fails and names it; (iii) a reseal-only difference passes; (iv) a path outside the fence fails; (v) a missing fence on a phase/* branch fails; (vi) an absent object prints UNMEASURED and fails. Plant a fault (a stale-copy overwrite after a merge of master) in a scratch branch and show the check go red on it in CI.
7. The FALSIFIER replay: print the per-PR result table for the last twenty merged PRs.
8. Your own PR body carries its FILE-FENCE: scripts/checkMergeGuard.ts, the shared module, scripts/land.ts, .github/workflows/build-test.yml, their tests, your report.
9. npm run build (all five gates) + full suite + typecheck:api locally; open the PR; slip SLIP-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1 with branch, full head sha, PR number, CI runs by full sha, what is still dark. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "a check that cannot look fails and says so". The Architect decided: enforcement through the existing required changes job; the fence lives in the PR body; reseal paths come from the script.
FORBIDDEN: no ruleset or branch-protection write; no backend, vendor or tenant name added in code; no removal of a user-visible function; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1
=== END CARD ===

END · ORDER-SCOUT-REVIEW-CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v1
