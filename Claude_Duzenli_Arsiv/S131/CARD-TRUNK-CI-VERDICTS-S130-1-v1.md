<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-TRUNK-CI-VERDICTS-S130-1 · v1 — read the two trunk CI verdicts nobody read, at the full forty hex, and report red before hygiene
lane: AG-4
report: docs/relay/TRUNK-CI-VERDICTS-S130-1-AG4-report.md
fanout: personalized

This is the first card of S131 minted through the conformed Architect template, and it is the second item of the owner's FIRST JOBS list (bootstrap v131, item 1b). It is a READ card: it writes no code, moves no ref, touches no governed row. Its only output is a report — on the bus and, if the owner's ARCHIVE-FIRST ruling is honoured, beside the push in the documents repository — so that a red on master is named before any hygiene work starts (S63-1: merge is not evidence; the post-merge CI read is).

Run it AFTER CARD-ARCHIVE-PUSH-S130-2-v1, which sits above it in your box; that card is unrelated to this one and this one does not wait on it for any value.

## PREMISE
- MEASURED: 2026-09-06T02:54Z, `git ls-remote`-equivalent over the owner's clone (`git for-each-ref refs/remotes/origin/master`) AND Vercel `list_deployments` for the production project: both name the master tip in the `trunk` fence, and Vercel reports that deployment READY for production.
- MEASURED: 2026-09-06T02:54Z, Vercel `list_deployments`: the previous production deployment names the parent tip in the `parent` fence (the PR #493 landing).
- UNMEASURED: the master workflow's job set at either tip. Bootstrap v131 CARRIES the claim that master runs `coverage`, `compat (20.x)`, `compat (22.x)` and `fence` — gates no PR run exercises — and that neither run was read in S130. That claim is inherited, not measured; ORDER A measures it.
- ON-DISAGREEMENT: if your `git ls-remote origin refs/heads/master` does not equal the `trunk` fence, STOP and report the value you read — master has moved, the verdicts this card names are no longer the newest, and the Architect re-cuts.
- DECAYS the moment any commit lands on master after the `trunk` fence tip.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master's tip and its parent, the two commits whose trunk CI is owed | MEASURED: Vercel list_deployments (githubCommitSha of the two newest production READY deployments), corroborated by git for-each-ref in the owner's clone | trunk |
| the parent tip | MEASURED: same read | parent |
| the trunk workflow verdicts at both tips | NOT-READ | ORDER A reads them; the Architect's container holds no GitHub credential |

```evidence:trunk
824fb29d927c6e8c1f59e55ceac49455f3374cb0
```

```evidence:parent
5d916ad418032daf2ec312d059c64c26738b79d1
```

## SCOPE
```scope
- trunk CI at the `trunk` fence tip (the PR #494 landing)
- trunk CI at the `parent` fence tip (the PR #493 landing)
```
The two tips above are the whole scope. Nothing else is read, and nothing is written except the report.

## ORDER A — READ THE TWO VERDICTS, NOT THE PR TABLES
For EACH tip in the scope fence, `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<forty hex>&per_page=50"`. Print `total_count`; S101-L1 applies — `total_count` of zero is ALWAYS FAILED, never "CI did not run". For every run at that sha print workflow name, event, conclusion, and the job list with each job's conclusion (`gh api .../runs/<id>/jobs`). Name explicitly whether `coverage`, `compat (20.x)`, `compat (22.x)` and `fence` are present at each tip, and what each concluded. If a job is absent at a tip, say ABSENT — absence is a reading, not a failure and not a pass.

## ORDER B — IF ANY TRUNK JOB IS RED
Do not fix anything. Quote the failing step's last forty lines from `gh run view <id> --log-failed` into an UNANCHORED evidence fence in your report, and name the file and line it points at. The fix is a separate card; this card's job is to make the red visible before hygiene.

## ORDER C — REPORT
File `docs/relay/TRUNK-CI-VERDICTS-S130-1-AG4-report.md` on a branch `phase/trunk-ci-verdicts-s130-1`, push it, and post the same text as a from_lane row named `TRUNK-CI-VERDICTS-S130-1-AG4-report`. Report-only branches land through the foreman's REPORT-ONLY path (`docs/relay/` only); do not open a PR for a report-only branch unless the foreman's landing card asks for one. Write the two tips in full forty hex in your CLAIMS table with `MEASURED: gh api` as basis.

## FALSIFIER
This card is wrong if a run at either tip carries jobs the bootstrap did not name (then the carried claim about the master job set was wrong and the report says so), if `total_count` at either tip is zero (then the trunk workflow is not firing on master and that is the session's first work), or if master has moved past the `trunk` fence (ON-DISAGREEMENT).

## SHARED SURFACES
None in the product tree. One new report file under `docs/relay/` on its own branch. No governed row is written; the bus receives one from_lane row.

## DECISION RIGHTS
Whether a red found here is fixed before hygiene — Architect, under S63-1. Nothing in this card is the lane's to decide.

BODIES: bootstrap v131 item 1b · F-S130-TRUNK-VERDICTS-OWED-1 · S63-1 · S101-L1 · S37-2 · TOTAL-45.

```deliverables
report file: docs/relay/TRUNK-CI-VERDICTS-S130-1-AG4-report.md on branch phase/trunk-ci-verdicts-s130-1, pushed
bus row: from_lane TRUNK-CI-VERDICTS-S130-1-AG4-report, same text
```

TAIL ANCHOR: CARD-TRUNK-CI-VERDICTS-S130-1-v1 ends here.
