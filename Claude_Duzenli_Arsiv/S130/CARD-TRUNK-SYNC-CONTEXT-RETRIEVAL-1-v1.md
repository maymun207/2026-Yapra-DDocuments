<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1 · v1 — bring the current master into phase/context-retrieval-1 and run the REAL suite on it

The owner ruled (OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1, 2026-09-04): product work first, factory machinery frozen. `phase/context-retrieval-1` is the largest unmerged PRODUCT work in the repository — the context-retrieval organ (vector lane + ground MCP), thirteen phase-prefixed commits, last touched 2026-08-27, eight days behind master. It is YOUR branch. This card is a PRODUCER card: merge master into your own branch (required by `CLAUDE.md` §5, not an act of authorship), reseal if the gate says a sealed file moved, push, make sure a pull request exists, read the heavy suite, report. **This card does not land anything and does not touch any other branch.** Do this AFTER your AUTHORITY-MATRIX-RULED-1 report is posted; that lane report is owed first and is not interrupted by this card.

⚠ `phase/context-retrieval-1-organ` is the measured ANCESTOR of this branch (PR #390 merged it INTO `context-retrieval-1`). Do not sync it, do not touch it; it is named here so you do not take it for a second work.

## PREMISE

MEASURED: 2026-09-04T07:44Z, the owner's shared clone after the foreman's fetch — `refs/remotes/origin/master` reads the `master` fence value, which is the PR 488 merge (landed 06:21:03Z, class AUTHOR-REPORT-CORROBORATED, heavy `build (24.x)` SUCCESS 18m17s).
MEASURED: 2026-09-04T07:52Z, the shared clone's `refs/remotes/origin/phase/context-retrieval-1` reads the `branch` fence value; `git merge-base --is-ancestor origin/phase/context-retrieval-1-organ origin/phase/context-retrieval-1` exits 0. A remote-tracking ref is the clone's LAST FETCH — ORDER A resolves both tips live.
MEASURED: 2026-09-04T07:55Z, three-way `git merge-tree <merge-base> origin/master origin/phase/context-retrieval-1` on the shared clone (git 2.34) prints ZERO conflict markers. A rehearsal, not the merge; ORDER B is the merge.
MEASURED: 2026-09-04T07:52Z, `git diff --name-only origin/master...origin/phase/context-retrieval-1` includes `public/architecture/manifest.json` — the branch already carries reseals ("reseal after item D", "reseal after floors A, B and C"); master has moved under them, so a reseal in the merge commit is LIKELY and ORDER B measures it rather than assumes it.
MEASURED: 2026-09-04T07:52Z, the thirteen non-merge subjects `origin/master..origin/phase/context-retrieval-1` all begin `PHASE-CONTEXT-RETRIEVAL-1`; only THREE carry `AG-4` before the colon. The landing gate's lens one will not be unanimous; lens two (H1 + first paragraph of the `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md`) will be load-bearing at landing (F-S130-LENS-TWO-LOAD-BEARING-1). NOT this card's problem — named so the merge does not touch those report headers.
DECAYS on any push to the branch or to master, and on CI re-running. ORDER A re-resolves both tips live.
ON-DISAGREEMENT: if `origin/master` is not the `master` fence value, or the branch tip is not the `branch` fence value, or the merge reports a CONFLICT — STOP and report with the bytes. A conflict means another lane's content is in play and this card does not authorise resolving it. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master's tip is the PR 488 merge | MEASURED: 2026-09-04T07:44Z, the shared clone's remote-tracking ref after the foreman's fetch; the foreman's landing report on the bus (from_lane `LANDING-TOOL-VISIBILITY-B-1-AG-5-report`) carries the same value | master |
| the branch tip is one value, and it is AG-4's | MEASURED: 2026-09-04T07:52Z, the shared clone's remote-tracking ref; ORDER A re-resolves live | branch |
| the merge rehearses clean | MEASURED: 2026-09-04T07:55Z, three-way merge-tree on the shared clone, zero conflict markers | rehearsal |
| `-organ` is this branch's ancestor, not a second work | MEASURED: 2026-09-04T07:52Z, `merge-base --is-ancestor` exit 0; merge commit of PR #390 reachable from the branch | branch |
| whether the heavy suite is green on the synced head | NOT-READ | ci |
| whether a pull request already exists for this branch | NOT-READ | ci |

```evidence:master
origin/master, the PR 488 merge, as the shared clone last fetched it:
    1dceed1ceaaf970085e13463215b53134ff733a8
```

```evidence:branch
phase/context-retrieval-1, as the shared clone last fetched it:
    a90e7df14abd863f75c31eecf232398042eb70f4
its ancestor, NOT a second work — do not touch:
    phase/context-retrieval-1-organ
This is the clone's last fetch, not the remote. Resolve it yourself at ORDER A with git ls-remote.
```

```evidence:rehearsal
git merge-tree $(git merge-base origin/master origin/phase/context-retrieval-1) origin/master origin/phase/context-retrieval-1 | grep -c '^<<<<<<<'
    0
```

```evidence:ci
NOT-READ. The synced head does not exist yet. ORDER D reads it with the FULL forty hex; a short
sha returns total_count=0, which is byte-identical to "CI never ran" and is ALWAYS FAILED.
```

## ORDER A — RESOLVE BOTH TIPS LIVE, IN YOUR OWN WORKTREE
Work in an exclusive worktree for this branch (S98-L1), never in the shared clone's main tree: the shared clone carries an uncommitted generator stamp on `docs/ground/authority-conformance.latest.md` and a stash; do not stage, commit, drop or discard either — they are named, not yours.
`git fetch origin`. `git ls-remote origin refs/heads/master refs/heads/phase/context-retrieval-1`. Confirm master equals the `master` fence and the branch equals the `branch` fence. Print both. Any mismatch → ON-DISAGREEMENT.

## ORDER B — MERGE MASTER IN, THE HOUSE WAY
`git merge --no-ff origin/master` — never a rebase, never `--force`, not one byte of any file edited by hand. Accept the default merge subject; do NOT rewrite it to carry the phase prefix (a merge is not authorship, and the gate reads it as such). If the merge STOPS on a conflict: STOP, report the conflicting paths, touch nothing.
If the merge brings in a change to a SEALED file, run `npm run reseal` in the SAME commit (CLAUDE.md §5) and verify the measured way: re-derived digests equal the ones the gate reports, and `git status` shows the seal as the only other change. If no sealed file moved, say so — "no reseal needed" is a measurement, print the check that produced it (S100-1: a reseal that changes no hash is not a reseal).

## ORDER C — PUSH YOUR BRANCH, AND MAKE SURE A PULL REQUEST EXISTS
`git push origin phase/context-retrieval-1` — plain push, no lease, no force. Read the new tip back with `git ls-remote` and report it in full forty hex inside your report's fence.
Then `gh pr list --head phase/context-retrieval-1 --state open`. If a pull request exists, report its number and confirm it shows the new head. If NONE exists, open one: base `master`, title `PHASE-CONTEXT-RETRIEVAL-1 AG-4: the context-retrieval organ`, body pointing at `docs/relay/PHASE-CONTEXT-RETRIEVAL-1-report.md`. Report the number. Opening a pull request is not landing; nothing in this card merges to master.

## ORDER D — READ THE HEAVY SUITE (THE POINT OF THIS CARD)
This head touches code, so `build (24.x)` runs the REAL suite, not CI-DIET. The bound is now 45 minutes; the last heavy run concluded in 18m17s. Wait for the required context to reach a CONCLUSION — `in_progress` is not a pass, `cancelled` is neither failed nor a pass. Ask with the full forty hex. Report EVERY context by name, including `eval-canary skipped` and `rule26` whatever it says; a skipped job is named, never folded into the green.
If `build (24.x)` is SUCCESS → report it. If it is RED → report the failing tests verbatim and STOP. Do not fix, do not re-run, do not diagnose in this card: a red on the synced head is a MEASUREMENT and the Architect owns what happens next. If the red is in the branch's OWN modules (`api/cwf/_lib/vectorLane`, `api/cwf/_lib/groundMcp`) say so in one line — that is the one classification this card asks of you.

## ORDER E — REPORT
File from_lane, artifact_name `TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report`, carrying: the ORDER A two readings, the merge commit sha (full forty hex, in a fence), whether reseal ran and its digest check, the ORDER C ls-remote read-back and the pull request number, the FULL CI verdict per context, and the sentence `read relay_inbox at <ISO>, box empty` or what it holds. Also print `git worktree list` and `git status --porcelain -uall` for your worktree.

## FALSIFIER
Wrong if master is not the `master` fence value, the branch tip is not the `branch` fence value, the merge conflicts, the merge touches any file by hand, or `-organ` is touched. A red heavy build does NOT falsify the card — it is the card's measurement and is reported, not tolerated and not repaired here.

## SHARED SURFACES
One merge commit on YOUR branch, one push to YOUR branch, at most one pull request opened. NO push to master. NO file edited by hand (reseal is the tool's write, in the same commit, or absent). NO migration. NO db push. NO governed row. NO production traffic. NO touch on `phase/context-retrieval-1-organ`, `phase/provenance-export-1`, `phase/stale-fact-sweep-1` or `phase/authority-matrix-ruled-1`.

## DECISION RIGHTS
You decide NOTHING about conflicts (STOP), about a red suite (STOP and report), or about landing (the foreman lands under a future card after a scout review). You decide the reseal only in the sense of running the tool the house form requires when the gate says a sealed file moved.

BODIES: `PLATINUM` · `S37-2` (PR-head unsharded CI is the referee) · `S61-1` (stash is not a clean checkout — use your worktree) · `S63-1` (merge is not evidence; the CI conclusion on the pushed head is) · `S98-L1` · `S100-1` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1.

fanout: personalized

```deliverables
branch: phase/context-retrieval-1 — one merge commit (with reseal if measured), pushed to origin; pull request open
report: bus row from_lane, artifact_name TRUNK-SYNC-CONTEXT-RETRIEVAL-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-CONTEXT-RETRIEVAL-1-v1 ends here.
