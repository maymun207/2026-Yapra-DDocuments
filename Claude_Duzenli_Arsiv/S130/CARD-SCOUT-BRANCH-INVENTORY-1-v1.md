<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-BRANCH-INVENTORY-1 · v1 — 123 remote branches: name each one's class with the command that proves it, so a deletion card can be written from a list and not from a feeling

Scout card. Read-only by your charter. The owner saw "123 Branches" on the repository page and asked how to clean it. The Architect measured the shape on the owner's clone (below); the deletion itself is destruction and runs only on a NAMED owner approval (S102-YASA-3) after the product queue — this card produces the list that approval will bind to. Runs in parallel with the sweep chain and touches nothing it touches.

## PREMISE

MEASURED: 2026-09-05T04:10Z, owner's clone `git for-each-ref refs/remotes/origin`: 123 refs = master + 5 `lane/*` + 97 already MERGED into `origin/master` (`git branch -r --merged origin/master`) + 20 NOT merged (`--no-merged`: 18 `phase/*`, 2 `probe/*`; last commits 17 in 2026-08, 3 in 2026-09).
MEASURED: 2026-09-05T03:46Z (owner's screenshot): 16 open pull requests.
UNMEASURED: which of the 20 unmerged branches carry an open PR, which are superseded/closed, and which are orphans; whether every one of the 97 "merged" branches is merged by a MERGE COMMIT on master (a `--merged` answer is true for any ancestor, including a branch whose tip is simply an old master).
ON-DISAGREEMENT: counts differ from the clone's → print yours; the wire wins.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the 123 and their four-way split | MEASURED: 2026-09-05T04:10Z owner's clone, commands above | shape |
| the per-branch class | UNMEASURED — ORDER A–C | shape |

```evidence:shape
123 = 1 master + 5 lane/AG-1..AG-5 + 97 merged-into-master + 20 not-merged (18 phase/*, 2 probe/*)
```

## ORDER A — THE 97 "MERGED"
For each: tip sha (short is fine here — this is a transcript, put the table in an UNANCHORED fence), the merge commit on master that contains it (`git log --merges --ancestry-path <tip>..origin/master --format=%h -1 --reverse` or equivalent) or `ANCESTOR-ONLY` when the tip is itself on master's first-parent line, and the PR number if `gh pr list --head <name> --state all` finds one. Class: `MERGED-BY-PR`, `ANCESTOR-ONLY`, or `MERGED-NO-PR`.

## ORDER B — THE 20 NOT MERGED
For each: tip sha, last commit date, `gh pr list --head <name> --state all --json number,state`; ahead/behind master (`git rev-list --left-right --count`). Class: `OPEN-PR` (keep), `CLOSED-PR-SUPERSEDED` (candidate), `CLOSED-PR-ABANDONED` (owner), `NO-PR` (owner), `PROBE` (owner). Name the three September ones explicitly (expected: `phase/stale-fact-sweep-1` superseded by #492, `phase/stale-fact-sweep-2` active, one more).

## ORDER C — THE 16 OPEN PRs
`gh pr list --state open --json number,headRefName,updatedAt,mergeable` — the table, oldest first. Mark each whose head branch is in ORDER B.

## ORDER D — THE LANE REFS
Print the five `lane/*` tips and their nonce messages; they are NEVER in scope for deletion (they are the factory's address claims).

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-BRANCH-INVENTORY-1-v1`: first line `SAFE-TO-DELETE: <n> (MERGED-BY-PR + ANCESTOR-ONLY)`, second line `OWNER-DECISION: <n>`, third `KEEP: <n> (open PRs + lane)`, then the three tables in unanchored fences. Also print, once, the repository setting `gh api repos/maymun207/cwf_yaprak --jq .delete_branch_on_merge` — if false, that is the reason the pile grows; the Architect will propose flipping it in the deletion card.

## FALSIFIER
Wrong if the four-way split does not sum to 123 on the wire, or if any `lane/*` ref is classed as anything but KEEP.

## SHARED SURFACES
None written. Reads only.

## DECISION RIGHTS
None. Deletion is a separate card under a named owner approval.

BODIES: `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-BRANCH-INVENTORY-1-v1
```

TAIL ANCHOR: CARD-SCOUT-BRANCH-INVENTORY-1-v1 ends here.
