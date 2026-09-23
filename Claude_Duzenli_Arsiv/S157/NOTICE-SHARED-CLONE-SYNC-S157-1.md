<!-- relay-audit: v1 kind=notice -->
NOTICE-SHARED-CLONE-SYNC-S157-1

LANE: AG-2 (existing tab; your claim and worktree stay)
fanout: personalized (one lane, one body)
FROM: Architect, S157, container clock 2026-09-23T05:06Z
OWNER APPROVAL: "onay klon temizliği", 2026-09-23 08:05 TSI (OWNER-APPROVAL-S157-CLONE-SYNC-1): remove the stray working copies in the owner's SHARED clone and fast-forward its master. Register item 78.
NO POLL OR CRON TASK. When the slip is written, stop.

## PREMISE
MEASURED: 2026-09-23T05:04Z, Architect bridge, in the shared clone (the cwf_yaprak folder the owner opens in AntiGravity, NOT your worktree): master behind origin/master by 66, ahead 0; git status shows 5 modified tracked files and 11 untracked files.
MEASURED: same time, git hash-object of each working file vs git rev-parse origin/master:<path>: 15 of 16 SAME-AS-MASTER (.claude/boot/foreman.md, .claude/boot/free.md, .claude/boot/producer.md, CLAUDE.md, .github/workflows/vector-origin-repair.yml, api/cwf/__tests__/noPollTask.test.ts, api/cwf/__tests__/vectorOriginRepairWorkflow.test.ts, and 8 files under docs/relay/); docs/ground/facts.json DIFFERS (a generated file).
SELF-INVALIDATION: dies if any other window has the shared clone checked out on a branch other than master, or if a path you measure DIFFERS where the Architect measured SAME (then STOP, print it, touch nothing).
ON-DISAGREEMENT: your reading wins; print both; never discard a file whose content is not on origin/master.

## STEPS
1. git fetch origin. In the shared clone print git status --porcelain -uall and, for EVERY listed path, the blob of the working file and of origin/master:<path>.
2. Only if every path except docs/ground/facts.json is SAME: move the untracked SAME files into a dated folder outside the repo (e.g. ~/cwf-clone-strays-S157/) rather than deleting; git checkout -- the modified tracked files and docs/ground/facts.json (their content is on origin/master or generated).
3. git merge --ff-only origin/master. Print HEAD (full 40-hex) = origin/master, and git status -sb (clean, not behind).
4. SLIP: SLIP-SHARED-CLONE-SYNC-S157-1 on the bus: the per-path table, where the strays were moved, the new HEAD. Stop.
FORBIDDEN: no commit, no push, no rebase, no reset --hard, no rm of a file that is not on origin/master, no change inside any worktree; no poll task, no cron; never print an environment value.

END · NOTICE-SHARED-CLONE-SYNC-S157-1
