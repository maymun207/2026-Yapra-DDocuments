# RELAY · LOCAL-HYGIENE-S93 · v1

>> BLOCK: AG-1 <<
(Any AG window on this machine — the workspaces are shared. Do everything
below in ONE pass and paste the full output back to the owner.)

The owner's screenshot shows local leftovers. Origin/DB/production are in
lockstep (verified independently); this is about preventing FUTURE
contamination of master. IRON RULE for this whole relay: you never commit or
push anything to master here — inspection first, then the stated defaults.

## H1 · Two uncommitted modifications on the main cwf_yaprak checkout (master)
```
git -C <path-to-cwf_yaprak> status --porcelain
git -C <path-to-cwf_yaprak> diff -- api/cwf/__tests__/learningSnapshotMigration.test.ts supabase/migrations/20260811120000_learning_snapshots.sql
```
PRINT the diff in your reply. Then apply the decision rule:
- If the diff is proof-harness residue or any edit made AFTER the merge that
  was never part of the reviewed branch (whatever its content):
  `git restore` both files, then re-run `git status --porcelain` and show it
  clean. Origin's version is the reviewed truth; local edits to merged files
  die here.
- The ONLY exception: if the diff looks like deliberate NEW work someone
  started, do NOT restore — say so and stop. (Expected: it is residue.)

## H2 · The unpublished `obs-trace-1b` branch (cwf-obs-trace-1 folder)
```
git -C <path-to-cwf-obs-trace-1> log --oneline master..obs-trace-1b
git -C <path-to-cwf-obs-trace-1> status --porcelain
```
PRINT both. Decision rule:
- 0 commits ahead AND clean tree → delete the local branch and say so. The
  folder itself may be closed/removed from the workspace.
- Anything ahead or dirty → do NOT delete, do NOT publish. Print the log and
  stop; the Architect will rule on it from the pasted output.

## H3 · The stale `cwf-prose-render-parity-1` folder
That phase is long merged (origin count 0 ahead). Confirm its tree is clean
(`status --porcelain`); if clean, close/remove the folder from the workspace.
If dirty, print the status and stop.

## H4 · Standing rule (append to your working notes)
After a phase merges, the phase worktree is DEAD: no file in it is edited
again, and the main checkout's master is never committed to directly. Any
new work begins with a fresh `phase/<name>` branch cut from a freshly
fetched origin/master.

Reply with: H1 diff + verdict applied · H2 outputs + action taken ·
H3 confirmation · one line acknowledging H4.

TAIL: LOCAL-HYGIENE-S93 v1
