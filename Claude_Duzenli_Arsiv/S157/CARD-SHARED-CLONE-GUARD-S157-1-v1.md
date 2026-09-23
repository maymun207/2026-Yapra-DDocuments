<!-- relay-audit: v1 kind=card -->
CARD-SHARED-CLONE-GUARD-S157-1-v1

LANE: AG-2 (after SLIP-SHARED-CLONE-SYNC-S157-1; existing tab)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T05:08Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: the owner's words "bunun birdaha olmamasi icin onlem al !", 2026-09-23 08:07 TSI, following "onay klon temizliği" (OWNER-APPROVAL-S157-CLONE-SYNC-1). Owner design contribution (S112-YASA-1): his screenshot question "bunlar neden commit edilmemis?" surfaced a 66-commit-stale shared clone carrying stray copies of landed files, which no gate saw.
ADVERSARY GATE: NEW SUBJECT. Goes to the scout first; reaches AG-2 only with a GREEN verdict row.
BRANCH: phase/shared-clone-guard-s157-1 off origin/master · PUSH early · REPORT docs/relay/SHARED-CLONE-GUARD-S157-1-AG2-report.md with a FILE-FENCE block · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 597 | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T05:00Z | master |
| lane boot already fetches origin master and CLAUDE.md asks only that the shared clone's HEAD stays on master | MEASURED: git grep on the tracking ref, Architect bridge, 2026-09-23T05:08Z; PR 597 touched neither file (GitHub compare) | boot |
| the shared clone was 66 behind with 15 stray copies of landed files and one regenerated file | MEASURED: git status and hash-object vs origin/master, Architect bridge, 2026-09-23T05:04Z | stray |

```evidence:master
edc7e880213ec1d872483d5c239b54f9046c1466
```

```evidence:boot
3c930797178bd0246470c1db2aa30220d7d84f02:scripts/laneBoot.mjs:269:    const fetch = deps.git(['fetch', 'origin', 'master']);
3c930797178bd0246470c1db2aa30220d7d84f02:CLAUDE.md:310:`--no-merged`; never delete an unmerged branch, name it. Leave the shared clone's
```

```evidence:stray
## master...origin/master [behind 66]
SAME-AS-MASTER x15 (.claude/boot/*.md, CLAUDE.md, a workflow, two tests, eight docs/relay reports); DIFFERS docs/ground/facts.json (generated)
```

## PREMISE
MEASURED: the anchors above.
UNMEASURED by the Architect: which process wrote the strays into the shared clone (a lane working there instead of its worktree, a checkout of master paths, or a local build); ORDER 1 answers it from git reflog and file mtimes, read-only.
SELF-INVALIDATION: dies if SLIP-SHARED-CLONE-SYNC-S157-1 is absent or reports anything but a clean, current clone.
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
With a planted stray file (a copy of a master file) and a planted foreign file (content not on master) in a scratch clone: boot must print SHARED-CLONE-DIRTY with both paths classified, fast-forward nothing, and close must attribute a stray created during the window to that window. On a clean behind clone, boot must fast-forward it. Any silent pass: wrong, STOP.

## ORDERS
0. File set: scripts/laneBoot.mjs, scripts/laneClose.mjs, their tests, CLAUDE.md section 8 (one sentence), your report. Nothing else.
1. Read-only root cause: git reflog of the shared clone and mtimes of the 16 moved strays (~/cwf-clone-strays-S157/); name the writer class in the report, or UNMEASURED.
2. Boot (after the existing fetch at laneBoot.mjs:269): resolve the SHARED clone as the main worktree (first entry of git worktree list). Clean and on master: git merge --ff-only origin/master there, print before/after full sha. Dirty: print SHARED-CLONE-DIRTY and every path classified SAME-AS-MASTER / DIFFERS / NOT-ON-MASTER, fast-forward nothing, delete nothing; continue the boot (the print is the alarm, the owner's clone is his). Not on master: print it, touch nothing.
3. Close: record the shared clone's porcelain status at boot in the lane's own state and compare at close; any path new since boot is printed as CREATED-BY-THIS-WINDOW. A window whose cwd is the shared clone rather than its worktree prints WORKING-IN-SHARED-CLONE at boot.
4. CLAUDE.md section 8: add one sentence: the shared clone stays on master, clean and current; boot fast-forwards it and prints any stray path; a lane never writes there.
Before the first push of this work and before each live test on the owner's clone: re-read the box immediately before the command; if any card has arrived since this one, STOP and report rather than proceeding. Re-measuring the target is not re-reading the order (carried from cardPreflight CP-11, which refused this card's first draft).
5. Tests with the FALSIFIER's plants; npm run build (all five gates), full suite, typecheck:api; open the PR; slip SLIP-SHARED-CLONE-GUARD-S157-1 with branch, full head, PR number, CI runs by full sha, the root-cause line. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "measure, print, never discard". The Architect decided: boot fast-forwards only a clean shared clone; a dirty one is printed, never cleaned automatically.
FORBIDDEN: no automatic delete or checkout of any file in the shared clone; no reset --hard; no ruleset write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-SHARED-CLONE-GUARD-S157-1-v1
