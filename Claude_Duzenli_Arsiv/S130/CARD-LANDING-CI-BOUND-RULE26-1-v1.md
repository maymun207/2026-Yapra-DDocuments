<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-CI-BOUND-RULE26-1 · v1 — land PR #491 (AG-4's one-line rule26 bound change) under the owner's artefact-bound approval; shape check first, land.ts second

Foreman card, AG-5. Authorised by OWNER-RULING-S130-THAW-RULE26-BOUND-1 and approved for master by OWNER-APPROVAL-S130-MASTER-PUSH-CI-BOUND-RULE26-1 (row 26445cd2, 12:30:14Z — already in your box; it is bound to the branch's SHAPE, not a PR number, and ORDER A is the shape check that makes it bite). This lands AFTER CARD-LANDING-PROVENANCE-EXPORT-1-v1 (row 22f8d8bc) completes or STOPs — the owner's ruled order is the product first; the bound change is machinery, thawed for one line. If #465 is in a WAIT you cannot resolve, land this one and say so in both reports.

One thing this landing does NOT do, said plainly so nobody expects it: it does not change PR #465's CI. GitHub runs the workflow file FROM THE PR HEAD; #465's head carries the old 10-minute bound and keeps it. The new bound helps every branch synced onto master AFTER this lands (stale-fact-sweep-1 and onward). #465 still lands by its own card's one measured re-run.

## PREMISE

MEASURED: 2026-09-04T12:33:44Z (GitHub push via the Vercel deployment record, ref `phase/ci-bound-rule26-1`, `githubPrId` 491): head in the `head` fence; commit subject `AG-4: CI-BOUND-RULE26-1 — rule26 timeout-minutes 10 -> 20, sized from two measured cancels at the ceiling`; body carries both cancels with full shas and the 598 s re-run.
MEASURED: 2026-09-04T12:31:54Z, AG-4 consumed CARD-CI-BOUND-RULE26-1-v1 (row a6cee005); its `CI-BOUND-RULE26-1-AG-4-report` is owed with the CI table — if it is in the box when you read this, its table is the premise for ORDER B; if not, you read CI yourself.
MEASURED: 2026-09-04T12:2xZ, master `1af600f9…`: rule26 job `timeout-minutes: 10` at line 401; the diff must be that key and its comment, nothing else.
NOT-READ: CI at the head (ORDER B). NOT-READ: whether `changes` skipped rule26 on a workflow-only diff (ORDER B names it either way).
DECAYS on any push to the branch or to master. ON-DISAGREEMENT: head ≠ `head` fence, or the shape check fails → STOP; the approval does not cover what you found.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head and PR number | MEASURED: 2026-09-04T12:33:44Z Vercel deployment meta for the push | head |
| the shape the approval binds to | MEASURED: 2026-09-04T12:30Z OWNER-APPROVAL-S130-MASTER-PUSH-CI-BOUND-RULE26-1 | shape |
| CI at the head | NOT-READ | head |
| the landed master and deploy | NOT-READ | landing |

```evidence:head
phase/ci-bound-rule26-1, PR #491 (base master), head:
    67a09c7d877b9cd80175776af19331721efc43eb
master at cut time (PR #387 merge; or the PR #465 merge if that landed first — read it):
    1af600f9c810c6918dd8bc20f6ac5a344556d7f7
```

```evidence:shape
git log --oneline --no-merges origin/master..origin/phase/ci-bound-rule26-1      -> exactly ONE line, subject begins "AG-4:"
git diff --stat origin/master...origin/phase/ci-bound-rule26-1                    -> exactly ONE file: .github/workflows/build-test.yml
git diff origin/master...origin/phase/ci-bound-rule26-1 -- .github/workflows/build-test.yml | grep -E '^[-+][[:space:]]*timeout-minutes'
                                                                                   -> exactly:  -    timeout-minutes: 10
                                                                                                +    timeout-minutes: 20
all other +/- lines in that diff begin with "#" after indentation (comment lines)   -> else STOP
```

```evidence:landing
NOT-READ. ORDER D prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — SHAPE CHECK (this is the approval's own test)
`git fetch origin`; `git rev-parse origin/phase/ci-bound-rule26-1` = `head` fence. Run the three lines in the `shape` fence and print their output verbatim. Any deviation → STOP, report; the approval row says it does not cover a different shape.

## ORDER B — CI AT THE HEAD
Read every check-run at the full forty hex. `build (24.x)` must be SUCCESS. rule26: if it RAN, it must have CONCLUDED (success/failure) under the new bound — print its per-step durations, that is the positive control; if `changes` SKIPPED it on a workflow-only diff, name that and note the positive control moves to the next product landing. eval-canary skipped named. Any `cancelled` context → STOP (land.ts would refuse anyway).

## ORDER C — LAND
`ADF_LANE_ROLE=AG-5 npm run land -- 491`. Expected resolver class: AUTHOR-SUBJECT lane AG-4; lander AG-5 ≠ AG-4 → pass. If land.ts refuses: class and first refusing line verbatim, STOP, report.

## ORDER D — PROVE
`git ls-remote origin refs/heads/master` (fenced, forty hex); tree vs rehearsal; Vercel production state for the new master or UNREAD; `git show origin/master:.github/workflows/build-test.yml | grep -n 'timeout-minutes: 20'` → the rule26 line, as the landed positive control of the change itself.

## ORDER E — REPORT
From_lane, artifact_name `LANDING-CI-BOUND-RULE26-1-AG-5-report`: ORDER A outputs; the CI table; the landing (merge sha, read-back, tree, deploy) or the STOP; and the standing state of #465 (landed / waiting on what / stopped on what).

## FALSIFIER
Wrong if the head is not the `head` fence, if any shape line deviates, if any context at the head is cancelled or failed, if the resolver class is not AUTHOR-SUBJECT/AG-4, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One merge to master by land.ts, one push. NO file edited. NO migration. NO db push. NO governed row. Nothing on #465's branch.

## DECISION RIGHTS
None. The approval covers exactly the shape in the `shape` fence; you verify the shape, you do not judge the number.

BODIES: `S37-2` · `S47-1` · `S63-1` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · OWNER-RULING-S130-THAW-RULE26-BOUND-1 · OWNER-APPROVAL-S130-MASTER-PUSH-CI-BOUND-RULE26-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-RULE26-NPM-CI-STARVATION-1.

fanout: personalized

```deliverables
master: PR #491 merged by land.ts, one push, proven by ls-remote read-back and the grep in ORDER D
report: bus row from_lane, artifact_name LANDING-CI-BOUND-RULE26-1-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-CI-BOUND-RULE26-1-v1 ends here.
