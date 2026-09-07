<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-MA-RERUN-RUNNER-S132-1 · v1 — land the pull request at branch phase/ma-rerun-3-s132-1-v4 (the MA-RERUN measurement runner + its report) under the owner's named approval
lane: AG-5
report: docs/relay/LAND-MA-RERUN-RUNNER-S132-1-AG5-report.md
fanout: personalized

The measurement runner `.github/workflows/ma-rerun.yml` is written and pushed on `phase/ma-rerun-3-s132-1-v4` (AG-4 report v4, 10:48Z). It cannot be dispatched until it exists on the default branch — GitHub resolves `workflow_dispatch` from master (the lane's `dispatch` fence: HTTP 404 "not found on the default branch", and the workflow registry lists eight workflows without it). The owner gave the S102 named approval for this ONE landing: OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1. This card is NOT report-only and does not rest on REPORT-ONLY-DRAIN-1; it rests on the approval, in the form CARD-LAND-499-1 used in S131. It is a landing, not a build, so the adversary-review header the Architect owes producer cards does not apply (A-REC-S132-5 §mechanical cure item 1 names producers).

## PREMISE
- MEASURED: 2026-09-07T10:48:08Z — AG-4 report v4 DIFF: `git diff --name-only origin/master...HEAD` → `.github/workflows/ma-rerun.yml` and `docs/relay/MA-RERUN-3-S132-1-AG4-report-v4.md`; two files; `git status --porcelain -uall` clean; the lane opened the PR and did not merge.
- MEASURED: 2026-09-07T11:53Z — the owner's approval sentence, verbatim in the `approval` fence.
- MEASURED: 2026-09-07T09:58Z — your pass-3 report: `npm run land -- <n>` lands at a synced head read green on the three required runs; `eval-canary` and `rule26` print as "still dark" and are named, never folded.
- UNMEASURED: the PR number (you read it by branch); whether master moved since the branch was cut (you measure `merge-base --is-ancestor`); whether the required runs are green at the head you land.
- ON-DISAGREEMENT: if the PR's changed paths are not EXACTLY the two in the `paths` fence → STOP, print the list, land nothing (the approval covers those two paths only). If any required run is red at the synced head → STOP, quote the failing job unanchored, no re-run (S55-1). If a sync merge conflicts → STOP (another lane's content is in play).
- DECAYS when the PR is merged or closed, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the two paths the approval covers | MEASURED: AG-4 report v4 DIFF section, read on the bus at 10:48Z | paths |
| the owner's approval | MEASURED: owner's word in the Architect chat, verbatim | approval |
| the PR number, the head, the run verdicts | NOT-READ | ORDER A |

```evidence:paths
.github/workflows/ma-rerun.yml
docs/relay/MA-RERUN-3-S132-1-AG4-report-v4.md
```

```evidence:approval
"phase/ma-rerun-3-s132-1-v4 insin (ma-rerun.yml + rapor) ONAYLIYORUM." — OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1
```

## SCOPE
```scope
- one landing: the open PR whose headRefName is phase/ma-rerun-3-s132-1-v4; found by branch, never by a remembered number
- sync if owed: git merge --no-ff origin/master in a worktree, pushed to the lane's branch; never a rebase; on conflict STOP
- land only at a SYNCED head read green on every required run; skipped jobs named
- no other PR touched; no file edited by you except your own report
- bus: one from_lane row LAND-MA-RERUN-RUNNER-S132-1-AG5-report, posted once
```

## ORDER A — READ FIRST
1. Read your box by `created_at`; earlier rows first.
2. `gh pr list --state open --json number,headRefName,headRefOid` → the PR with headRefName `phase/ma-rerun-3-s132-1-v4`; absent → STOP and report.
3. `git diff --name-only origin/master...<head>` → must equal the `paths` fence exactly (two lines), else ON-DISAGREEMENT.
4. `git log --no-merges --format=%s origin/master..<head>` → author lane AG-4, printed.

## ORDER B — SYNC AND LAND
1. `git merge-base --is-ancestor origin/master <head>`; exit 1 → sync: worktree, `git merge --no-ff origin/master`, push to the branch; print the new head. Conflict → STOP.
2. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<full 40-hex synced head>"` — `total_count >= 1` (S101-L1) and every required run `completed :: success`; name `eval-canary` and `rule26` as SKIPPED.
3. `ADF_LANE_ROLE=AG-5 npm run land -- <n>`; then `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit` — the merge commit equals master's tip, printed in an anchored fence, full 40-hex.
4. `gh api repos/maymun207/cwf_yaprak/actions/workflows --jq '.workflows[].path'` — `.github/workflows/ma-rerun.yml` now present; print the list. This line is what CARD-MA-RERUN-3-S132-1-v5 waits for, by name.

## ORDER C — THE REPORT
1. `docs/relay/LAND-MA-RERUN-RUNNER-S132-1-AG5-report.md`, grammar v1, `auditText` locally `violations: 0` before push; your own report PR lands under the S132 standing word (OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1) after this landing, not before.
2. Post ONE from_lane row `LAND-MA-RERUN-RUNNER-S132-1-AG5-report`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if a PR with any path outside the `paths` fence is landed; wrong if landed at a head not read green; wrong if a red run was re-run; wrong if a rebase was used; wrong if the PR was found by a number rather than by branch; wrong if `eval-canary`/`rule26` are counted as green; wrong if the workflow registry line is missing from the report.

## SHARED SURFACES
cwf_yaprak: master gains one merge commit (two files). CI: the runner becomes dispatchable. Bus: one row. Secrets, database, production behaviour: untouched.

## DECISION RIGHTS
None. The approval is the owner's; the run is AG-4's card.

BODIES: OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 · CARD-LAND-499-1-v1 (the form) · OWNER-RULING-S122-E1-E2-v1 · S101-L1 · S55-1 · S102 (named push approval) · TOTAL-45 · MA-RERUN-3-S132-1-AG4-report-v4.

```deliverables
PR found by branch; diff equals the two paths
sync if owed, no conflict; synced head printed
required runs green at the synced head; skipped jobs named
landed; merge commit equals master tip, full 40-hex in an anchored fence
workflow registry now lists .github/workflows/ma-rerun.yml
docs/relay/LAND-MA-RERUN-RUNNER-S132-1-AG5-report.md, auditText violations: 0
bus row from_lane LAND-MA-RERUN-RUNNER-S132-1-AG5-report, posted once
```

TAIL ANCHOR: CARD-LAND-MA-RERUN-RUNNER-S132-1-v1 ends here.
