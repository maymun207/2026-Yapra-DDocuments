<!-- relay-audit: v1 kind=card -->
CARD-LAND-OLD-SLIPS-S140-1-v1

LANE: AG-5
fanout: personalized
Second landing card of S140 for the FOREMAN, same form as CARD-LAND-OWN-SLIPS-S140-1-v1, which you closed at 2026-09-16T04:50:51Z with four landings in ten minutes. This one is the SAME class, further back: SEVEN of your landing reports from S137, S138 and S139 still sit on their own `phase/land-*` branches, each one or two commits ahead of the master they forked from, each touching exactly one file under `docs/relay/`, none on master. They are between 28 and 57 commits behind, so every one of them takes the land script's two-run shape; that sync is the designed route and NOT a decay of this card. Land oldest fork first. Report-only self-landing under the same seam land.ts enforces (paths all under docs/relay/, author = lander PERMITTED), measured by the scout on the previous card and unchanged since.

PRECONDITION: master is at the fenced anchor in `the-heads` and the seven heads are as fenced. If any differs, YOUR reading wins and you print both; you still land on YOUR measured green.

```evidence:the-heads
measured       2026-09-16T04:55:01Z shared-clone refs (lane-fetched origin), read by the Architect; the Architect holds no forge credential
master         7b3232244dcd99e62b3cd1b11ff16dc520c84816   merge of PR 566
land-529       phase/land-529-s137-1  head 1fd4643123e873e2056aef74ea61a71158844a13  fork 8f3ddebd05cd7d34666885c4ba82e274638c52ed  ahead 1  behind 57  path docs/relay/LAND-529-S137-1-AG5-report.md
land-535       phase/land-535-s137-1  head 51ce16aa4fb47aa00f71cd85ddeb1e88b7f326af  fork e95b0fdf4fdb4c53eba3f3561b0eae0ac50f81c5  ahead 1  behind 52  path docs/relay/LAND-535-S137-1-AG5-report.md
land-547       phase/land-547-s138-1  head eff0e30d5b03c1f4b4758171d842ab3caf02fb10  fork 3adf6bb513422ef2f61c63599988edb8132040b9  ahead 2  behind 47  path docs/relay/LAND-547-S138-1-AG5-report.md (two commits, one path)
land-549       phase/land-549-s139-1  head a2e1addf2617da153daae258bb90db6aa36ef429  fork 96fe357a6cdab599b04bbf88c2d9f8bc69bd88a8  ahead 1  behind 43  path docs/relay/LAND-ASK-AFTER-DISCOVERY-S139-1-AG5-report.md
land-550       phase/land-550-s139-1  head 053140faca38f1fc8cbe047eaa9b7d672fe49f6c  fork 9e830fe8ff074ee195a818b95173609245e89492  ahead 1  behind 38  path docs/relay/LAND-FLOOR-ANNOUNCES-S139-1-AG5-report.md
land-551       phase/land-551-s140-1  head 4c5c21c8483044cf12bef27ebd1cd69faa891204  fork 909851baec5f48fcc582ad5a636c2a7206527557  ahead 1  behind 33  path docs/relay/LAND-FLOOR-WIDENS-S139-1-AG5-report.md
land-552       phase/land-552-s140-1  head 74368a7d17c37891ddb4bf08c0374e9ca8273884  fork 8f05ca23af69582310df8bdd9df8d04ba134c2d9  ahead 1  behind 28  path docs/relay/LAND-ENTITY-LAYER-SURFACE-S139-1-AG5-report.md
each branch    git diff --name-only <fork> <head> prints exactly ONE path; NUL byte count over the diff is 0 on all seven; every head's author is the foreman lane
PR numbers     NOT READ by the Architect (no forge credential); you read them from the forge by branch name before ORDER 3
```

```evidence:ci-as-last-read
read by        nobody for these seven heads — docs-only pushes; the land script's step 2 produces the moved head and its own run, which is the run you land on
```

## PREMISE

MEASURED: the seven heads, forks, distances, single-path diffs, NUL counts and authorship in `the-heads`, read at 2026-09-16T04:55:01Z from the shared clone.
UNMEASURED: the PR number of each branch, and CI at any head. ORDER 2 reads the PR numbers from the forge; ORDER 3 measures CI per moved head, by you.
MEASURED: land.ts's report-only seam (REPORT_ONLY_PREFIX docs/relay/, judgeReportOnly PERMITTED for author == lander, three-dot path list surviving the step-2 sync) — the scout's reading of 2026-09-16T04:29Z on the previous card; nothing in scripts/land.ts moved since (master moved only by your four docs/relay landings).
SELF-INVALIDATION: this premise dies if any head moves by a hand other than the land script's own step 2, if a branch has no open PR on the forge (then you open one for that branch — a report-only PR of your own file is yours to open — and say so), or if a diff ever shows a second path.

## ORDERS

ORDER 1 - RUN `npm run land:selftest` ON THE CURRENT MASTER FIRST AND PRINT ITS OUTPUT, as on the previous card.

ORDER 2 - READ THE PR NUMBER OF EACH OF THE SEVEN BRANCHES FROM THE FORGE (`gh pr list --head <branch> --state all`). Print branch, PR number and state. A branch with NO PR gets one opened by you, base master, title the branch name, body naming this card — and you print the new number.

ORDER 3 - FOR EACH BRANCH IN THIS ORDER — land-529, land-535, land-547, land-549, land-550, land-551, land-552 — `ADF_LANE_ROLE=AG-5 npm run land -- <PR>`. The two-run shape is expected on every one; wait on CI at the moved head yourself (full forty-hex, zero read twice), land on run 2. Re-read master's forty-hex head after each landing before starting the next. No-ff, never a squash.

ORDER 4 - YOU EDIT NOTHING. A refusal by the land script or the merge-tree rehearsal STOPS that branch; print it verbatim, continue with the others, report which stopped. Do not re-run to chase a green.

ORDER 5 - AFTER THE LAST MERGE, READ THE PRODUCT: master's new forty-hex head and the CI conclusion there. Vercel will CANCEL docs-only pushes by the ignore script — print that verbatim; it is not an outage.

ORDER 6 - POST ONE from_lane slip after all seven, never before: `read relay_inbox at <ISO>`, the seven PRs with their landed master heads in order, the runs you landed on, and which (if any) stopped and why. No report file for this card.

## FALSIFIER

If a diff shows a second path, STOP that branch: this card promised one file per branch.

If the merge-tree rehearsal reports a conflict on a branch, STOP that branch, print it, continue with the others.

If CI at a moved head is red, STOP that branch: name WHICH step failed and which were SKIPPED.

If the self-test fails AND the detached fallback also refuses, STOP and print both refusals.

## SHARED SURFACES

```scope
- docs/relay/LAND-529-S137-1-AG5-report.md
- docs/relay/LAND-535-S137-1-AG5-report.md
- docs/relay/LAND-547-S138-1-AG5-report.md
- docs/relay/LAND-ASK-AFTER-DISCOVERY-S139-1-AG5-report.md
- docs/relay/LAND-FLOOR-ANNOUNCES-S139-1-AG5-report.md
- docs/relay/LAND-FLOOR-WIDENS-S139-1-AG5-report.md
- docs/relay/LAND-ENTITY-LAYER-SURFACE-S139-1-AG5-report.md
```

You write NOTHING. The merge commits are the land script's; a PR you open under ORDER 2 is a forge object, not a file.

## DECISION RIGHTS

You choose the route on ORDER 1's measurement. You may reorder the seven if a measured conflict makes the fenced order impossible, and you say why. You may refuse any landing on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| seven report branches exist at the fenced heads, each ahead of its fork by one or two commits, each diff touching one docs/relay path, no NUL bytes, foreman-authored | MEASURED: git rev-parse, merge-base, rev-list --count, diff --name-only, tr -cd NUL and log --format=%an over the shared clone at 2026-09-16T04:55:01Z | the-heads |
| the report-only self-landing seam in land.ts permits author == lander for docs/relay-only path lists and survives the step-2 sync | MEASURED: the scout's read of scripts/land.ts lines 168, 896-976, 1255, 1293 and 2300 at 2026-09-16T04:29Z | the-heads |
| the PR numbers | NOT-READ | ORDER 2 is yours |
| CI at the seven heads | NOT-READ | ORDER 3 is yours |
| whether the land self-test passes on the current master | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if a branch head moves by any hand other than the land script's own step 2, if a diff shows a second path, or if scripts/land.ts changes on master before you land. Your own landings moving master are the card's purpose, not its decay.
