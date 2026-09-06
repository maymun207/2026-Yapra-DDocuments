<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-TOOL-VISIBILITY-B-1 · v1 — bring the fresh master into phase/tool-visibility-b-1 so the REAL suite runs on the re-stamp

PR 489 landed: master now carries the re-stamped authority snapshot. PR 488 (`phase/tool-visibility-b-1`, AG-4's branch) is still built on the OLD master and its `build (24.x)` is red on the three time-triggered `authorityMatrix` assertions that the re-stamp exists to clear. Every green so far has been CI-DIET (docs-only, correctly not spent). The first run that actually TESTS the re-stamp is a heavy pull request taking the new master — and that is this card. It is a PRODUCER card for the branch's own author: merging master into your own branch is required by `CLAUDE.md` §5 and is not an act of authorship, so no merge authority is involved and no master push happens here.

**THIS CARD DOES NOT LAND PR 488.** `HOLD-S129-LANDING-488-PENDING-AUTHORITY-INVESTIGATION-1` stands in the foreman box and only a fresh dispatch row releases it. You sync, push YOUR branch, read CI, report. Nothing else.

## PREMISE

MEASURED: 2026-09-04T04:37Z, the foreman's ORDER D report on the bus (from_lane `LANDING-AUTHORITY-SNAPSHOT-REFRESH-1-AG-5`) — PR 489 MERGED at 04:32:50Z; master tip and the ancestry test are in the `master` fence; landed tree equals the merge-tree rehearsal.
MEASURED: 2026-09-04T04:4xZ, a SECOND lens — the owner's shared clone's `refs/remotes/origin/master` after the foreman's fetch reads the same tip as the `master` fence. Two readings, one value.
MEASURED: 2026-09-04T04:4xZ, the shared clone's `refs/remotes/origin/phase/tool-visibility-b-1` and its local branch ref both read the value in the `branch` fence. A remote-tracking ref is the clone's LAST FETCH, not the remote — ORDER A resolves the tip live.
MEASURED: 2026-09-04T04:4xZ, `scripts/land.ts` at the shared clone's HEAD — the author lens enumerates subjects with `git log --no-merges`, and its own comment says why: merging master into a branch is required by `CLAUDE.md` §5 and is not authorship. A `Merge …` commit on your branch is INVISIBLE to the landing gate's author lens. It is NOT invisible to `CARD-LANDING-TOOL-VISIBILITY-B-1-v2`'s literal commits-fence RULE ("every commit must begin PHASE-TOOL-VISIBILITY-1"), whose base-moved arm also fires now — so a landing v3 is owed AFTER this card, and it is the Architect's, not yours.
MEASURED: 2026-09-03T14:12Z, AG-4's own addendum 3 — the three `authorityMatrix` reds are repo-wide, time-triggered (P7D bound on a 2026-08-26 reading), and fail identically on a pristine master worktree. The re-stamp on the new master moves `measuredAt` to 2026-09-03.
DECAYS on any push to the branch or to master, and on CI re-running. ORDER A re-resolves both tips live.
ON-DISAGREEMENT: if `origin/master` is not the `master` fence value, or the re-authored commit is not an ancestor of it, or the branch tip is not the `branch` fence value, or the merge reports a CONFLICT — STOP and report with the bytes. A conflict means another lane's content is in play and this card does not authorise resolving it. If your re-measure differs from any line here, THE MEASUREMENT WINS.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master moved to the re-stamp merge and the re-authored commit is reachable from it | MEASURED: 2026-09-04T04:37Z, the foreman's ORDER C reading (ls-remote + merge-base --is-ancestor exit 0), corroborated by the shared clone's remote-tracking ref after its fetch | master |
| the branch tip is one value, and it is AG-4's | MEASURED: 2026-09-04T04:4xZ, the shared clone's local and remote-tracking refs; ORDER A re-resolves live | branch |
| the landing gate's author lens ignores merge commits | MEASURED: 2026-09-04T04:4xZ, `git log --no-merges` in land.ts ORDER B, with its comment | lens |
| the three authorityMatrix reds are the snapshot's age, not the branch's code | MEASURED: 2026-09-03T14:12Z, AG-4 addendum 3; the scout's 13:2xZ reading in the v2 landing card | — |
| whether the heavy suite is green on the synced head | NOT-READ | ci |

```evidence:master
origin/master after the PR 489 landing, two lenses:
  foreman ORDER C  git ls-remote origin refs/heads/master
    f1b18f60b0aeddba65c73854639a13b6ccf2da50
  shared clone     refs/remotes/origin/master (after the foreman's fetch, 07:32 TSİ)
    f1b18f60b0aeddba65c73854639a13b6ccf2da50
the re-authored refresh commit, ancestor of that tip (merge-base --is-ancestor exit 0):
    29a87d0e418f81852d72abe3f55bf320fff898a9
the previous base, which your branch still sits on:
    d8895114744dbb23ba5633d726a0814cfe0468d5
```

```evidence:branch
phase/tool-visibility-b-1, as the shared clone last saw it (local branch ref == remote-tracking ref):
    4e9e6ed6e6eb6becff864e28f8eea083d4c41e7d
This is the clone's last fetch, not the remote. Resolve it yourself at ORDER A with git ls-remote.
```

```evidence:lens
scripts/land.ts, ORDER B on lane tokens, at the shared clone's HEAD:
    /**
     * ORDER B, on LANE tokens. `--no-merges` because merging master into a branch is
     * required by `CLAUDE.md` §5 and is not an act of authorship — see `authorLaneOf`.
     */
    const subjects = git('log', '--no-merges', '--format=%s', `${baseSha}..${liveHead}`)
```

```evidence:ci
NOT-READ. The synced head does not exist yet. ORDER D reads it with the FULL forty hex; a short
sha returns total_count=0, which is byte-identical to "CI never ran" and is ALWAYS FAILED.
```

## ORDER A — RESOLVE BOTH TIPS LIVE, IN YOUR OWN WORKTREE
Work in YOUR exclusive worktree for this branch (S98-L1), never in the shared clone's main tree: the shared clone carries an uncommitted generator stamp on `docs/ground/authority-conformance.latest.md`, a file this merge brings in from master — a checkout-and-merge there will collide. Do not stage, commit or discard that stamp; it is named, not yours.
`git fetch origin`. `git ls-remote origin refs/heads/master refs/heads/phase/tool-visibility-b-1`. Confirm master equals the `master` fence and the branch equals the `branch` fence; confirm `git merge-base --is-ancestor <refresh-commit> origin/master` exits 0. Print all three. Any mismatch → ON-DISAGREEMENT.

## ORDER B — MERGE MASTER IN, THE HOUSE WAY
`git merge --no-ff origin/master` — never a rebase, never `--force`, not one byte of any file edited by hand. Accept the default merge subject; do NOT rewrite it to carry the phase prefix (a merge is not authorship, and the gate reads it as such). If the merge STOPS on a conflict: STOP, report the conflicting paths, touch nothing.
If the merge brings in a change to a SEALED file, run `npm run reseal` in the SAME commit (CLAUDE.md §5) and verify the measured way: re-derived digests equal the ones the gate reports, and `git status` shows the seal as the only other change. If no sealed file moved, say so — "no reseal needed" is a measurement, print the check that produced it.

## ORDER C — PUSH YOUR BRANCH
`git push origin phase/tool-visibility-b-1` — plain push, no lease, no force. Read the new tip back with `git ls-remote` and report it in full forty hex inside your report's fence. Confirm PR 488 now shows that head.

## ORDER D — READ THE HEAVY SUITE (THE POINT OF THIS CARD)
This head touches code, so `build (24.x)` runs the REAL suite, not CI-DIET. Wait for the required context to reach a CONCLUSION — `in_progress` is not a pass, `cancelled` is neither failed nor a pass. Ask with the full forty hex. Report EVERY context by name, including `eval-canary skipped` and `rule26` whatever it says; a skipped job is named, never folded into the green.
The question this run answers: are the three `authorityMatrix` assertions GREEN on the re-stamped snapshot? If `build (24.x)` is SUCCESS → report it as the first measured evidence that the repo-wide blocker is cleared. If it is RED → report the failing tests verbatim and STOP. Do not fix, do not re-run, do not diagnose in this card: a red on the synced head is a MEASUREMENT and the Architect owns what happens next. If CI reproduces a failure that the re-stamp was supposed to clear, that is the STRONGER signal and is reported as such.

## ORDER E — REPORT
File from_lane, artifact_name `TRUNK-SYNC-TOOL-VISIBILITY-B-1-AG-4-report`, carrying: the ORDER A three readings, the merge commit sha (full forty hex, in a fence), whether reseal ran and its digest check, the ORDER C ls-remote read-back, the FULL CI verdict per context, and the sentence `read relay_inbox at <ISO>, box empty` or what it holds. Also print `git worktree list` and `git status --porcelain -uall` for your worktree.

## FALSIFIER
Wrong if master is not the `master` fence value, the refresh commit is not its ancestor, the branch tip is not the `branch` fence value, the merge conflicts, or the merge touches any file by hand. A red heavy build does NOT falsify the card — it is the card's measurement and is reported, not tolerated and not repaired here.

## SHARED SURFACES
One merge commit on YOUR branch, one push to YOUR branch. NO push to master. NO file edited by hand (reseal is the tool's write, in the same commit, or absent). NO migration. NO db push. NO governed row. NO production traffic. The HOLD on landing PR 488 is untouched.

## DECISION RIGHTS
You decide NOTHING about conflicts (STOP), about a red suite (STOP and report), or about landing (HOLD stands; the foreman lands under a future card). You decide the reseal only in the sense of running the tool the house form requires when the gate says a sealed file moved.

BODIES: `PLATINUM` · `S37-2` (PR-head unsharded CI is the referee) · `S61-1` (stash is not a clean checkout — use your worktree) · `S63-1` (merge is not evidence; the CI conclusion on the pushed head is) · `S98-L1` · `S100-1` (a reseal that changes no hash is not a reseal) · `TOTAL-45` · `empty ≠ zero`.

fanout: personalized

```deliverables
branch: phase/tool-visibility-b-1 — one merge commit, pushed to origin
report: bus row from_lane, artifact_name TRUNK-SYNC-TOOL-VISIBILITY-B-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-TOOL-VISIBILITY-B-1-v1 ends here.
