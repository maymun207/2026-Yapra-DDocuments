# WAVE-3 TREE-EXCLUSIVITY ADDENDUM · v1 — paste to ALL FOUR lanes, ahead of the phase brief

<!-- Architect-issued mid-wave. Cause: four lanes were found sharing ONE clone.
     Live state at issue time (read from origin, not recalled): origin/master =
     1b7f8dd9490b8943e730e4e4175223385ec54dae; NONE of the four Wave-3 branches
     exists on origin yet. Nothing is lost. This addendum is binding and
     supersedes the "fresh FULL clone" sentence in your phase brief's
     PRECONDITION by making it a CHECKED step instead of an instruction. -->

## WHY (read this once — it is not process hygiene, it is the wave's proof)

Every Wave-3 report must carry `git diff --name-only origin/master...HEAD`
verbatim, and the Architect computes the four-way intersection matrix (6 pairs,
expected ∅) from those diffs. A shared working tree has a SHARED INDEX: one
lane's `git add` can stage a sibling's in-flight file, and every lane's diff
then describes a tree it does not own. The matrix would compute ∅ over
fabricated inputs — a measurement that measured nothing, which is the exact
INSTRUMENT defect this wave exists to gate. So: **one lane = one working tree.
No exceptions, no "just for a minute".**

## STEP 0 — TREE EXCLUSIVITY (run BEFORE anything else; abort conditions are hard)

```bash
# 0.1 — where am I, and is this tree mine?
pwd
git rev-parse --show-toplevel
git status --porcelain
```

**ABORT and report to the Architect, writing NOTHING, if any of these is true:**
- `git status --porcelain` lists modified/untracked files that are NOT in your
  brief's scope (a sibling lane's files are in this tree — it is not yours);
- the toplevel path is a shared/default clone rather than a path carrying YOUR
  lane's phase name;
- another agent is reported to be building in this same toplevel.

**If the tree is not exclusively yours, create your own and work only there:**

```bash
# from the shared clone's toplevel (this touches NO working file, only .git)
git fetch origin --prune
git worktree add ../wt-<your-phase-kebab-name> -b phase/<your-phase-kebab-name> origin/master
cd ../wt-<your-phase-kebab-name>
npm ci
git status --porcelain     # MUST be empty. If it is not, stop and report.
```

Your branch name is the one named in your brief's DELIVERY section — do not
invent a new one. From this point every path you write is ABSOLUTE (S80-1: the
working directory is a variable, and you now have two of them on disk).

## IF YOU ALREADY HAVE WORK IN THE SHARED TREE

Do **not** `git add`, `git commit`, `git stash` or `git checkout` in the shared
tree — every one of those touches a shared index or a shared stash stack and can
consume a sibling's uncommitted work.

1. Create your worktree exactly as above.
2. **Copy your own files by path** (plain `cp`, file by file, from your brief's
   scope list) from the shared tree into your worktree. Never `cp -r` a whole
   directory: that is how a sibling's in-flight file travels.
3. Leave the shared tree byte-untouched. Do not clean it, do not revert it.
4. In your report, list under `## TREE-MIGRATION` every file you copied and the
   command you used, so the Architect can verify the carry.

## WHO KEEPS THE SHARED CLONE

**AG-1 (`PHASE-TOOL-BEHAVIOR-CENSUS-1B`) keeps it.** It is the heavy lane, holds
this wave's seal token and its only migration, and its work is the most
expensive to reproduce. AG-1 still runs STEP 0: if `git status --porcelain`
shows sibling files, AG-1 does NOT clean them — it reports and waits while the
siblings migrate out. AG-2, AG-3 and AG-4 move to their own worktrees regardless
of how far along they are.

## LANE ↔ BRIEF (bind yourself before you build — mismatches happened)

| Lane | Phase brief | Branch |
|---|---|---|
| AG-1 | PHASE-TOOL-BEHAVIOR-CENSUS-1B | `phase/tool-behavior-census-1b` |
| AG-2 | PHASE-HARNESS-HONESTY-GATE-1 | `phase/harness-honesty-gate-1` |
| AG-3 | PHASE-RELAY-AUDIT-GATE-1 | `phase/relay-audit-gate-1` |
| AG-4 | PHASE-FRAME-FORCEFIT-LENS-1 | `phase/frame-forcefit-lens-1` |

If the brief you are holding is not the one on your row: **STOP, write nothing,
and say so.** Building a sibling's brief produces a duplicate PR and forces a
pick-one — that is not redundancy, it is two lanes of the wave spent on one
item.

## REPORT ADDITION (all lanes)

Add to your report, above the diff:

```
## TREE
toplevel: <output of git rev-parse --show-toplevel>
status-at-start: <empty | the migration you performed>
```

A lane whose report omits this section has not proven its diff describes its own
tree, and the Architect will send it back before RULE-25 review begins.

<!-- END · WAVE-3 TREE-EXCLUSIVITY ADDENDUM v1 -->
