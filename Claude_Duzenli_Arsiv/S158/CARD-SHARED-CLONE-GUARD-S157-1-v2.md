<!-- relay-audit: v1 kind=card -->
CARD-SHARED-CLONE-GUARD-S157-1-v2

LANE: AG-2 (existing tab; your current claim stays)
fanout: personalized (one lane, one body)
MEASURED-AT: 2026-09-23T05:44Z (bridge clock, date -u in the command that wrote this file)
OWNER APPROVAL: the owner's words "bunun birdaha olmamasi icin onlem al !", 2026-09-23 08:07 TSI, following "onay klon temizliği" (OWNER-APPROVAL-S157-CLONE-SYNC-1); S158 plan approval "onayliyorum", 2026-09-23 08:40 TSI (plan step 2 names this card). Owner design contribution (S112-YASA-1): his question "bunlar neden commit edilmemis?" surfaced a 66-commit-stale shared clone carrying stray copies of landed files, which no gate saw.
ADVERSARY GATE: EXEMPT, named. This card REPEATS the subject of CARD-SHARED-CLONE-GUARD-S157-1-v1, whose scout verdict was RED ON MECHANISM with a complete delta (bus row SCOUT-STATUS-REVIEW-CARD-SHARED-CLONE-GUARD-S157-1-v1, created 2026-09-23T05:15:16Z). v2 applies that delta D1-D8 VERBATIM and changes nothing else except the anchors. Authority: OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 (loop-breaking case, project instructions 12.1).
BRANCH: phase/shared-clone-guard-s157-1 off origin/master · PUSH early · REPORT docs/relay/SHARED-CLONE-GUARD-S157-1-AG2-report.md with a FILE-FENCE block · PR: yes, non-draft.
GRAFT: take code context from graft first; slip and report carry a GRAFT line. Graft indexes the working tree; where it lags master, read master blobs with git show and say so (the v1 scout did).

```evidence:adversary
ADVERSARY: EXEMPT
ack: fe985072-b28c-472e-ace8-15d045060087
```

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master at cut time, after PR 610 | MEASURED: GitHub API commits/master, Architect bridge, 2026-09-23T05:41Z | master |
| the shared clone was synced clean to the previous master by AG-2 | READ: bus row SLIP-SHARED-CLONE-SYNC-S157-1 (2026-09-23T05:18:58Z) and git status on the Architect bridge mount of the shared clone, 2026-09-23T05:5xZ | clone |

```evidence:master
2d7087bff1eda24b6224c2fbd9a9d987061dec7d
```

```evidence:clone
## master...origin/master
HEAD edc7e880213ec1d872483d5c239b54f9046c1466 (one merge behind the master above; the boot fast-forward is exactly what this card builds)
```

## PREMISE
MEASURED: the anchors above.
SCOUT P1 (v1 review) is SUPERSEDED by the sync slip: the scout's clone read predates SLIP-SHARED-CLONE-SYNC-S157-1. The stray directory ~/cwf-clone-strays-S157 was NOT readable from the Architect bridge (the bridge sees only connected folders); ORDER 1 reads it from your window, or prints UNMEASURED.
UNMEASURED by the Architect: which process wrote the strays (ORDER 1 answers read-only).
SELF-INVALIDATION: dies if the shared clone is dirty when you start (print the porcelain and stop).
ON-DISAGREEMENT: YOUR READING WINS: print both values, continue with yours.

## FALSIFIER
In a real scratch git clone driven by the real code: a planted stray (copy of a master file) and a planted foreign file: boot prints SHARED-CLONE-DIRTY with both paths classified and fast-forwards nothing; a clean behind clone is fast-forwarded. PLUS (D8): a linked worktree run from a path with a DOUBLE space; two windows with interleaved strays (each prints the other's as NEW-SINCE-THIS-BOOT, neither as its own); a write-protected directory in the ff delta (prints SHARED-CLONE-FF-FAILED plus the partial paths, the boot exits normally); an unreadable path (SHARED-CLONE-UNMEASURED, no ff); HEAD on a phase branch (touch nothing). Any silent pass: wrong, STOP.

## ORDERS
0. File set: scripts/laneBoot.mjs, scripts/laneClose.mjs, their tests, CLAUDE.md section 8 (one sentence), .claude/boot/producer.md, .claude/boot/foreman.md, .claude/boot/free.md (the ff lines only) (D7), your report. Nothing else.
1. Read-only root cause: git reflog of the shared clone and mtimes of the moved strays (~/cwf-clone-strays-S157/); name the writer class in the report, or UNMEASURED.
2. Boot (after the existing fetch at laneBoot.mjs:269):
   (D1) resolve the shared clone with git worktree list --porcelain (first 'worktree ' line), print the resolved path, and print SHARED-CLONE-RESOLVED-TO-SELF when it equals the cwd's own toplevel and no linked worktrees exist.
   (D2) clean-check: git status --porcelain=v1 -uall; ANY stderr or non-zero exit is SHARED-CLONE-UNMEASURED with the reason, and nothing moves.
   Clean and on master: (D3) before merging, list git diff --name-only HEAD FETCH_HEAD; then git merge --ff-only origin/master there, print before/after full sha; if the ff fails, print SHARED-CLONE-FF-FAILED, the git stderr, before/after HEAD and the porcelain after, and never retry or clean. A lock or Already up to date is printed as such and is non-fatal.
   Dirty: print SHARED-CLONE-DIRTY and every path classified SAME-AS-MASTER / DIFFERS / NOT-ON-MASTER, fast-forward nothing, delete nothing; continue the boot. Not on master: print it, touch nothing.
3. Close:
   (D4) compare the boot snapshot with close; print new paths as NEW-SINCE-THIS-BOOT (not CREATED-BY-THIS-WINDOW) and print beside it the lanes the state table shows alive in the interval; compare path plus git hash-object, not path alone.
   (D5) the boot snapshot lives at <git-common-dir>/lane-boot/<AG-n>.status (inside .git, so never a tree stray); unreadable at close prints UNMEASURED.
   (D6) WORKING-IN-SHARED-CLONE moves from boot to close, keyed on where the branch's commits were authored (cwd at close); at boot it may print only as INFO, never as an alarm.
4. (D7) CLAUDE.md section 8, one sentence: the shared clone stays on master, clean and current; the only write there is lane:boot's --ff-only of a clean clone; no lane authors a file there. Make producer.md, foreman.md and free.md say the same in their ff lines (producer.md:53 at master tells a lane to fast-forward by hand with no clean-check: replace that).
   (D8) Live test on the owner's clone: PRINT-ONLY unless the owner names it.
Before the first push of this work: re-read the box immediately before the command; if any card has arrived since this one, STOP and report rather than proceeding.
5. Tests with the FALSIFIER's plants; npm run build (all five gates), full suite, typecheck:api; open the PR; slip SLIP-SHARED-CLONE-GUARD-S157-1 with branch, full head, PR number, CI runs by full sha, the root-cause line. Stop.

## SHARED SURFACES
public/architecture/ narrative tabs and a reseal if doc-drift asks; merge origin/master, then reseal, in one commit.

## DECISION RIGHTS
AG-2 designs inside "measure, print, never discard". The Architect decided: boot fast-forwards only a clean shared clone; a dirty or unmeasured one is printed, never cleaned automatically.
FORBIDDEN: no automatic delete or checkout of any file in the shared clone; no reset --hard; no ruleset write; no poll task, no cron; never print an environment value; never merge your own PR.

END · CARD-SHARED-CLONE-GUARD-S157-1-v2
