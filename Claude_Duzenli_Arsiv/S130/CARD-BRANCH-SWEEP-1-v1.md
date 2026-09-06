<!-- relay-audit: v1 kind=card -->
# CARD-BRANCH-SWEEP-1 · v1 — delete the ninety-eight remote branches the inventory proved are fully contained in master, and stop the pile from regrowing

AG-4 card, under OWNER-APPROVAL-S130-BRANCH-SWEEP-1 (owner's word: "sil onay") and OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 (this is repository hygiene, not factory machinery). The scout's inventory (SCOUT-BRANCH-INVENTORY-1-v1, 04:20Z) classified all 123 remote refs from the wire: 97 SAFE-TO-DELETE (96 MERGED-BY-PR with a distinct merge commit on master and a MERGED PR, 1 ANCESTOR-ONLY whose tip is itself an old master), 4 OWNER-DECISION, 21 KEEP (16 open-PR heads + 5 `lane/*`), `delete_branch_on_merge=false`. The owner approved deleting the 97 plus `phase/stale-fact-sweep-1` (CLOSED PR #452, superseded by #492) = 98, and flipping the setting. This is DESTRUCTION under S102-YASA-3: the list is the approved object; every delete is guarded by an ancestry check at execution time, and anything failing the guard is SKIPPED and named, never forced.

## PREMISE

MEASURED: 2026-09-05T04:15Z scout, `git ls-remote --heads origin`: 123 = 1 master + 5 lane/* + 97 merged (ancestry) + 20 not-merged; per-branch table in the scout row's transcript; `gh api repos/maymun207/cwf_yaprak --jq .delete_branch_on_merge` = false.
MEASURED: 2026-09-05T04:20Z scout: `phase/stale-fact-sweep-1` tip is the source of PR #452, CLOSED with a supersede comment naming #492; its content is carried byte-identically by `phase/stale-fact-sweep-2` (four blob shas equal, SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1/v2).
UNMEASURED: whether master moved since (PR #492 may land during this card) — irrelevant to ancestry (a branch contained in an older master is contained in a newer one); the exact count the wire returns at your start — ORDER A re-derives the list, it does not trust the number 98.
ON-DISAGREEMENT: any branch in your derived list that is an open-PR head, a `lane/*` ref, or one of the three OWNER-DECISION holds → STOP before deleting anything, print the offending name.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the shape and the setting | MEASURED: 2026-09-05T04:15Z scout inventory | shape |
| the four holds | MEASURED: 2026-09-05T04:20Z scout ORDER B | holds |
| the deletions | UNMEASURED — ORDER C prints each one | result |

```evidence:shape
123 = 1 master + 5 lane/* + 97 merged-into-master + 20 not-merged ; delete_branch_on_merge = false
APPROVED SET = the 97 SAFE-TO-DELETE + phase/stale-fact-sweep-1 = 98
```

```evidence:holds
NEVER DELETE (always):   lane/AG-1  lane/AG-2  lane/AG-3  lane/AG-4  lane/AG-5   and master
HOLD (owner decides later): phase/authorship-lens-2 (PR #393 MERGED but 2 commits ahead, unlanded)
                            probe/force-150316  probe/plain-150316 (no PR, one commit each)
KEEP: every head branch of an OPEN pull request (16 at inventory time; re-derive)
```

```evidence:result
UNMEASURED. ORDER C prints one line per branch: name · tip · guard result · delete result.
```

## ORDER A — DERIVE THE LIST FROM THE WIRE, NOT FROM THIS CARD
`git fetch origin --prune`. Build the candidate list mechanically: every `refs/heads/*` on `git ls-remote --heads origin` EXCEPT master, `lane/*`, the heads of `gh pr list --state open --json headRefName`, and the three HOLD names; for each remaining name require `git merge-base --is-ancestor <tip> origin/master` → true. Add `phase/stale-fact-sweep-1` explicitly (it is NOT an ancestor; it is approved by name because its content is carried by #492 — print its tip and #452's state CLOSED as the check). Print the list with tips; print its count. Expected 98; a different count is NOT a stop — print the difference by name and continue with what the derivation yields, because the derivation is the approved rule and the number is a claim.

## ORDER B — DRY RUN, PRINTED
For every candidate: `git merge-base --is-ancestor <tip> origin/master && echo CONTAINED || echo NOT-CONTAINED` (stale-fact-sweep-1 prints NOT-CONTAINED by design and is the only one allowed to). Any other NOT-CONTAINED → remove from the list and name it. Print the final list once more.

## ORDER C — DELETE, ONE BY ONE, GUARDED
`git push origin --delete <name>` per branch (no batch, no `-f`, no `+refs`), printing `name · tip · result` per line. A refused delete (protected, or ref moved) is printed and skipped — never retried with force. After the loop: `git ls-remote --heads origin | wc -l` and the remaining list by class (master · lane · open-PR heads · holds). Expected remaining: 1 + 5 + 16 + 3 = 25 (at inventory time; re-derive).

## ORDER D — STOP THE REGROWTH
`gh api -X PATCH repos/maymun207/cwf_yaprak -f delete_branch_on_merge=true`, then read it back with `--jq .delete_branch_on_merge` → true. This makes GitHub delete a PR's head branch when the PR merges; land.ts merges through GitHub, so future landings leave no branch behind. Lane refs are not PR heads and are untouched.

## ORDER E — REPORT
From_lane row, artifact_name `BRANCH-SWEEP-1-AG-4-report`: ORDER A list and count; ORDER B guard output; ORDER C per-branch lines and the remaining set; ORDER D read-back; box line; hygiene (`git worktree list` — if any of your own worktrees sat on a deleted branch, name it; do not remove it here).

## FALSIFIER
Wrong if any deleted branch was an open-PR head, a `lane/*` ref, master, or one of the three holds; if any deleted branch other than `phase/stale-fact-sweep-1` was not an ancestor of master at delete time; or if `delete_branch_on_merge` does not read true afterwards.

## SHARED SURFACES
Remote branch refs (deletions, approved by rule); one repository setting. NO push to master. NO commit. NO file edited. NO PR opened or closed. NO migration. NO db push. NO governed row. NO lane ref touched.

## DECISION RIGHTS
None beyond STOP. The rule (ancestry + exclusions) is the owner's approved object; you execute it and print what it yields.

BODIES: `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-APPROVAL-S130-BRANCH-SWEEP-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · SCOUT-BRANCH-INVENTORY-1-v1.

fanout: personalized

```deliverables
remote: the approved branches deleted; remaining refs = master + lane/* + open-PR heads + 3 holds
setting: delete_branch_on_merge = true, read back
report: bus row from_lane, artifact_name BRANCH-SWEEP-1-AG-4-report
```

TAIL ANCHOR: CARD-BRANCH-SWEEP-1-v1 ends here.
