<!-- relay-audit: v1 kind=card -->
CARD-LAND-569-S140-1-v1

LANE: AG-5
fanout: personalized
Your landing report for PR 568 sits on `phase/land-568-s141-1`, one commit over the master it forked from, touching one file under `docs/relay/`, and it is owed to master. This is the same report-only self-landing CARD-LAND-OWN-SLIPS-S140-1-v1 ordered for four reports this morning and CARD-LAND-555-RETRY-S140-1-v1 for a fifth, all five now on master: OWNER-RULING-S122-E1-E2-v1 + E1-AMENDMENT-1 lets a lane land the RECORD of a landing it was ordered to perform; the seam is land.ts's AUTHOR-SUBJECT classification, and you are both. The report followed the landing (§12.8) and this card puts it where it belongs.

PRECONDITION: the branch head is as fenced, its diff-tree prints exactly one path, and the land script's lock ref is ABSENT on the forge when you start (print the ls-remote line). A lock ref present is a STOP and a finding, as on the 555 retry.

```evidence:the-branch
branch         phase/land-568-s141-1
pull request   569   (Vercel record dpl_A4UvcP9zBubtdLngsmwgvgsVXjcF, githubPrId 569, preview CANCELED by the ignore script — docs-only)
head           97b2322b3f10c23858dfefc23e25bdc88fbb8b07
fork           883f90819110635273575b6e0a9d363b73a6f040   (merge of PR 568)
master         8075436f98455844115d275ad32b20cdf93203cb   (merge of PR 555, 2026-09-16T06:07:29Z)   the branch is behind master by 4 commits — expect the two-run shape
one path       docs/relay/LAND-NAMED-TOOL-S140-1-AG5-report.md   first line is the relay-audit report header; NUL byte count 0
ci at head     your slip of 2026-09-16T06:04:24Z names the run at this head as success — RELAYED; ORDER 2 re-reads it
measured       2026-09-16T06:26Z shared-clone refs (lane-fetched origin) and the Vercel deployment record, read by the Architect; the Architect holds no forge credential and cannot fetch
```

## PREMISE

MEASURED: head, fork, distance, single-path diff-tree, report header and NUL count in `the-branch`, at 2026-09-16T06:26Z from the shared clone.
MEASURED: master at the fenced anchor from the Vercel production record of the PR 555 merge, at 2026-09-16T06:18Z.
MEASURED: CI at the head — RELAYED from your own slip at 2026-09-16T06:04:24Z; ORDER 2 re-reads it yourself.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; the one path is under `docs/relay/` and no permission surface, so no authority approval arises.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff-tree shows a second path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - RE-READ CI AT THE FULL FORTY-HEX HEAD with `actions/runs?head_sha=<forty hex>`; a zero is read a SECOND time before it becomes a premise and you say so. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green.

ORDER 3 - `ADF_LANE_ROLE=AG-5 npm run land -- 569`. The PR exists — use it, open none. No-ff, never a squash. The branch is behind master, so step 2 syncs through the forge and refuses CI-ZERO-RUNS; wait on CI at the moved head and land on run 2. That sync is the designed route, not a decay of this card.

ORDER 4 - YOU EDIT NOTHING. If the land script refuses on this file, stop, print the refusal verbatim on the bus — that refusal is a finding worth more than a landing chased with an edit.

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head and the CI conclusion there; Vercel will CANCEL (docs-only) — print it verbatim. Post ONE from_lane slip. No report file about landing a report.

## FALSIFIER

If a lock ref is present, STOP. If the diff-tree shows a second path, STOP. If CI at the head you land on is red, STOP and name WHICH step failed and which were SKIPPED. If the lock push fails with any HTTP status, STOP, print the status and the ls-remote line before and after — no second attempt without a card.

## SHARED SURFACES

```scope
- docs/relay/LAND-NAMED-TOOL-S140-1-AG5-report.md
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch head, fork, distance, single path, header and NUL count | MEASURED: git rev-parse, merge-base, rev-list --count, diff-tree, show and tr over the shared clone at 2026-09-16T06:26Z | the-branch |
| master's forty-hex head | READ: Vercel production deployment record of the PR 555 merge at 2026-09-16T06:18Z | the-branch |
| CI at the head | RELAYED: your slip at 2026-09-16T06:04:24Z | the-branch |
| the lock ref state now | NOT-READ | ORDER 1 measures it |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the one-path diff-tree | the-branch |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff-tree shows a second path, or if a lock ref is present.
