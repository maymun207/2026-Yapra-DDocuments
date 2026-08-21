# GO-TRAIN-PRECURSOR-1 · STEP-6.1-AMENDED-v1 — hygiene with a computed target

<!-- S98 · Architect-authored · lane AG-1. Supersedes STEP 6.1 of
     GO-TRAIN-PRECURSOR-1-v1, which you correctly HELD: it ordered deleting
     a directory that is the git-common-dir of ~30 linked worktrees — a
     target the Architect never computed (recorded as A-REC-S98-2, and as
     law S98-L2: a destructive order names its target by COMPUTED identity,
     never by narrative reference). This amendment follows that law. -->

## LAW CLARIFICATION (S98-L1, refined by the owner's clean-page ruling)
What is FORBIDDEN is a shared WORKING TREE (two lanes touching one tree,
or building at the shared root tree — the S97 AG-3 incident). The common
object store + one exclusive worktree per lane is the house's standard
architecture and STAYS. Hygiene therefore removes residue and dead trees,
never the store.

## 6.1a — residue removal (compute first, then delete)
1. COMPUTE: from the repo root, `git status --porcelain` and
   `git worktree list`. Paste both into the report — the target identity
   precedes the act (S98-L2).
2. Delete ONLY untracked residue files in the ROOT working tree (the
   checkTenantZero artifact class from the S97 quarantine). Tracked files
   are not touched; the object store is not touched.

## 6.1b — dead worktrees
For every worktree whose branch is (i) merged to master AND (ii) among
the deleted branches (the train's 10, plus 6.1c below): `git worktree
remove <path>` (use `--force` only for an already-broken tree and say
so), then `git worktree prune`. Keep any tree belonging to a live lane.
Report the before/after `git worktree list` counts and the removed paths
BY NAME.

## 6.1c — the remaining 43 stale branches (Architect-computed, zero-loss by construction)
A fresh clone shows 43 further `phase/*` branches on origin beyond the
train's 10. Every one is `ahead=0` of master — its tip IS an ancestor of
master, so deletion removes a pointer, never content (this is the
ancestry case where ancestry alone IS sufficient, unlike the 8 re-authored
ones you rightly checked file-wise). Before deleting, VERIFY the ahead=0
claim yourself in one loop:
`for b in $(git branch -r | grep 'origin/phase/'); do echo "$b $(git rev-list --count origin/master..$b)"; done`
Any branch showing ahead>0: DO NOT delete it — report it by name instead
(it would be a boot-census miss, which the Architect must see). All
ahead=0: `git push origin --delete <branch>` for each, listed by name in
the report, none summarized.

## REPORT
Append a `STEP-6.1-AMENDED` section to
`docs/relay/GO-TRAIN-PRECURSOR-1-report.md` (or a dated addendum file if
you prefer): the two computed listings, removed residue by name, removed
worktrees by name, the 43-branch verification loop's output, deletions by
name. Push on master.

<!-- END · STEP-6.1-AMENDED-v1 -->
