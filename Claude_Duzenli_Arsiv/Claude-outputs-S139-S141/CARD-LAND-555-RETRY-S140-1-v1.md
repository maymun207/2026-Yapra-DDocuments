<!-- relay-audit: v1 kind=card -->
CARD-LAND-555-RETRY-S140-1-v1

LANE: AG-5
fanout: personalized
One branch of CARD-LAND-OLD-SLIPS-S140-1-v1 stopped and this card retries it. Your slip of 2026-09-16T05:20:00Z says: PR 555 (phase/land-550-s139-1, your LAND-FLOOR-ANNOUNCES report) STOPPED with LOCK-UNKNOWN — the lock push returned HTTP 408, not a held lock; the lock ref was absent; CI at the moved head was green on its own run; you did not re-run and edited nothing. That was the right stop. A 408 on a ref push is a forge timeout, not a verdict on the tree, and a fresh landing attempt is a NEW attempt, not a re-run of a diagnosed transient (S55-1 forbids re-running the same run to chase a green; it does not forbid landing a branch whose landing never started).

PRECONDITION: the lock ref for the land script is ABSENT on the forge when you start (print the ls-remote line), master is at or beyond the fenced anchor, and the branch head is the synced head your run 1 produced. If a lock ref IS present, STOP and print it — that is a different finding.

```evidence:the-branch
branch         phase/land-550-s139-1
pull request   555
head           7c30cd41c2d9df8e9a7e02d5771e085259e5341a   the synced head your run 1 pushed at 2026-09-16T05:11:25Z (Vercel record dpl_AfiNTFCgVe75oZDJsi9MqB1AkGTK, PR 555, CANCELED by the ignore script — docs-only)
ci there       green on the run your slip of 2026-09-16T05:20:00Z names (the Build and Test run at that head) — RELAYED; re-read it yourself before landing
master         883f90819110635273575b6e0a9d363b73a6f040   merge of PR 568 at 05:42:53Z (production READY 05:47:31Z)
path           docs/relay/LAND-FLOOR-ANNOUNCES-S139-1-AG5-report.md — the one path of the original branch commit
measured       2026-09-16T05:50:00Z Vercel deployment records + your slip; the Architect holds no forge credential and the shared clone is only as fresh as the lanes' last fetch
```

## PREMISE

MEASURED: the synced head and its Vercel record in `the-branch`, at 2026-09-16T05:50:00Z.
MEASURED: CI green at that head and the LOCK-UNKNOWN cause — RELAYED from your own slip at 2026-09-16T05:20:00Z, read on the bus; ORDER 2 re-reads both.
UNMEASURED: whether the branch is now behind master again (PR 568 landed after your sync). If so, step 2 syncs once more and you wait on CI at the new head — the two-run shape, not a decay.
SELF-INVALIDATION: this premise dies if a lock ref is present on the forge, if the head moved by a hand other than the land script's own step 2, or if the diff shows a second path.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name (read the name from scripts/land.ts). Absent → continue. Present → STOP, print it, post it.

ORDER 2 - RE-READ CI AT THE CURRENT BRANCH HEAD (full forty-hex, zero read twice). Then `ADF_LANE_ROLE=AG-5 npm run land -- 555`. If step 2 syncs again (master moved by PR 568), wait on CI at the moved head and land on run 2.

ORDER 3 - IF THE LOCK PUSH FAILS AGAIN with any HTTP status, STOP, print the exact status and the ls-remote line before and after, and post it — two 408s in a row on one branch is a finding about the forge or the lock ref, not about this branch. No third attempt without a card.

ORDER 4 - AFTER THE MERGE, print master's new forty-hex head and the CI conclusion there; Vercel will CANCEL (docs-only) — print it verbatim. Post ONE from_lane slip. No report file.

## FALSIFIER

If a lock ref is present, STOP. If the diff shows a second path, STOP. If CI at the head is red, STOP and name the step. If the lock push fails again, STOP (ORDER 3).

## SHARED SURFACES

```scope
- docs/relay/LAND-FLOOR-ANNOUNCES-S139-1-AG5-report.md
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the branch's synced head and its docs-only push | MEASURED: Vercel deployment record for PR 555 at 2026-09-16T05:50:00Z | the-branch |
| CI green at that head, and the 408 on the lock push | RELAYED: your slip at 2026-09-16T05:20:00Z | the-branch |
| the lock ref state now | NOT-READ | ORDER 1 measures it |
| CI at the head you land on | NOT-READ | ORDER 2 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if a lock ref is present, if the head moves by a hand other than the land script's own step 2, or if the diff shows a second path.
