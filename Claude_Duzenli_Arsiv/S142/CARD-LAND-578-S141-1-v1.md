<!-- relay-audit: v1 kind=card -->
CARD-LAND-578-S141-1-v1

LANE: AG-5
fanout: personalized
Third landing of S141 for the FOREMAN, and the smallest: ONE docs/relay file, no source, no migration, no manifest — the §9-1 baseline measurement report AG-4 wrote under CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2 (sealed row in `raw-tokens`). The report's standing number is arm A meanRecallCat 0.5202 over 66 distinct utterances, byte-identical on the pre-wiring tree and on master; the live router A/B was UNMEASURED by the lane (no credential, not routed around) and the Architect ran it himself on OWNER-APPROVAL-S141-ROUTER-AB-LIVE-RUN-1 — that reading lives in the Architect's witness, not in this diff. This card sits in your box BEHIND CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1; the box is read by `created_at` and you work it in order — finish or park the wiring card at a clean commit before landing this one, and say which you did. `the-head` was measured in the minute of the cut (the v1-of-577 defect, A-REC-S141-LANDING-CARD-CUT-ON-A-STALE-HEAD-1). You did not write this report and you will not edit it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the three-dot diff over master is exactly ONE path under docs/relay/. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    ace305d1-595c-48a7-bdf1-c8560cc87415
scout GREEN on work     02665ee9-fec6-4a38-b0e0-1c733567bce3
scout CI read, at head  a2f29b0a-ec90-4921-8a40-8e2171d00b75   (PR number, three runs, the diff)
```

```evidence:the-head
branch         phase/baseline-9-1-both-trees-s141-1
head           5af780eb9c85888812b1ce30d85eba794f09e652   "AG-4: BASELINE-9-1-BOTH-TREES-S141-1 — the measurement report (docs/relay only)", 2026-09-17T06:53:55Z; ONE commit over master, parent = master
master         d29935c1b87ce3878061061556689dc67006e411   merge of PR 577 — contained in the branch; ahead by 1, behind by 0
pull request   578, opened by the author; headRefOid = the head above; base master (the scout's gh read at ~07:11Z)
diff           1 path over master: docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md (+232, new); no source, no test, no migration, no manifest (docs/relay is not a mapped area; the author's check:doc-drift OK on the branch)
measured       2026-09-17T07:16:27Z shared-clone lane-fetched origin ref, read by the Architect IN THE MINUTE THIS CARD WAS CUT; the scout's wire read at ~07:11Z agrees on head and master; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
read by the SCOUT at ~07:12Z (row in raw-tokens), the first independent read at THIS head — attempt 1 of each run:
Build and Test   SUCCESS — DIETED: the build job green with steps 4-10 skipped (a docs-only diff under the CI-DIET decision); rule26 SKIPPED; eval-canary SKIPPED (named, never folded)
report-schema    SUCCESS
Relay corpus     SUCCESS
runs=3 at the head; ORDER 2 is where YOU read it again, at the same forty hex
```

## PREMISE

MEASURED: the head, master and the one-path diff in `the-head`, over the shared clone's lane-fetched origin ref at 2026-09-17T07:16:27Z, the minute of the cut.
MEASURED: relay_inbox (execute_sql, 07:16:15Z) — the scout's GREEN on the work card (06:43:04Z) and its at-head CI read (07:13:12Z), rows named in `raw-tokens`.
MEASURED: CI at THIS head by the scout, `ci-as-read`; a DIETED build is the CI-DIET decision's own shape for a docs-only diff and is not a red; ORDER 2 is where green is measured again, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a second path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; a DIETED build names its skipped steps; eval-canary SKIPPED is named, never folded into green.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 578`. The PR exists — use it, open none. No-ff, never a squash. If step 2 syncs master into the branch, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head and the CI conclusion there as it arrives. Vercel: a docs/relay-only diff may build or may be skipped by the platform's ignore step — print what the production record says, do not infer. Post ONE from_lane slip.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches anything outside docs/relay/, STOP and print the path. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- docs/relay/BASELINE-9-1-BOTH-TREES-S141-1-AG4-report.md (new)
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before, and whether to finish or park the wiring card before this one — say which. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, master and the one-path diff | MEASURED: rev-parse and diff --name-only over the shared clone at 2026-09-17T07:16:27Z | the-head |
| the pull request number and the three runs at the head | MEASURED: the scout's gh reads at ~07:11–07:12Z, row in raw-tokens | the-head |
| the scout's GREEN on the work card | MEASURED: relay_inbox row at 2026-09-17T06:43:04Z, execute_sql 07:16:15Z | the-head |
| CI at the head | MEASURED: the scout's at-head read at 07:13:12Z — attempt 1, three runs SUCCESS, build DIETED, eval-canary SKIPPED | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the one-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a second path, if a lock ref is present, or if a v2 appears.
