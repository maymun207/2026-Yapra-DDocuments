<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-NIGHTLY-VERDICTS-S131-1 · v1 — read where the four relocated gates actually live (the nightly runs), open the PR your last report needs, and release the two retained worktrees by measurement
lane: AG-4
report: docs/relay/NIGHTLY-VERDICTS-S131-1-AG4-report.md
fanout: personalized

Your TRUNK-CI-VERDICTS report fired its own falsifier correctly: `coverage`, `compat (20.x)`, `compat (22.x)` and `fence` never run on a push, they run on the `nightly-compat.yml` and `budget-fence.yml` schedules. The tree's own header calls a red there an alarm-class event that nobody reads. This card is that read. It writes no product code; it opens one PR for an existing report branch, reads the runs API, and removes two worktrees only after measuring them merged by content.

## PREMISE
- MEASURED: 2026-09-06T03:39Z, Vercel `list_deployments` (the Architect's push sensor): branch `phase/trunk-ci-verdicts-s130-1` is on origin at the tip in the `branch` fence, and it has NO pull request (no `githubPrId` on the deployment; the card that produced it said not to open one).
- MEASURED: 2026-09-06T03:45Z, `scripts/land.ts` main in the owner's clone at master: `usage: npm run land -- <pr> [--dry-run]` — the foreman lands PULL REQUESTS, not bare branches, so a report-only branch without a PR cannot be landed by anyone.
- MEASURED: 2026-09-06T03:39Z, your own report `TRUNK-CI-VERDICTS-S130-1-AG4-report` (bus row, from_lane): the four relocated jobs are absent from push runs BY CONSTRUCTION; `nightly-compat.yml` runs `compat` (line 45) and `coverage` (line 87) on schedule `17 7 * * *`; `budget-fence.yml` runs `fence` (line 62) on schedule `10 7 * * *`.
- UNMEASURED: the newest run of either scheduled workflow, its head sha, its conclusion, and its age. The Architect's container holds no GitHub credential. ORDER A measures them.
- UNMEASURED: whether the two retained worktrees named in bootstrap v131 (`wt-harden`, `wt-hprov`) still exist in your window's clone, and whether their branches are merged by content into master. ORDER C measures both before touching anything.
- ON-DISAGREEMENT: if `git ls-remote origin refs/heads/phase/trunk-ci-verdicts-s130-1` differs from the `branch` fence, or a PR already exists for that branch, STOP on ORDER 0 and report what you read; the other orders still run.
- DECAYS the moment either scheduled workflow fires again (next scheduled instants are 07:10Z and 07:17Z today) — a read after that is a read of a different run; say which run you read, by id and by `created_at`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the report branch tip that needs a PR | MEASURED: Vercel list_deployments githubCommitSha for ref phase/trunk-ci-verdicts-s130-1, corroborated by the branch push time | branch |
| master at the time of cutting | MEASURED: git ls-remote-equivalent in the owner's clone and Vercel production READY, 2026-09-06T02:54Z | trunk |
| the newest nightly-compat and budget-fence runs | NOT-READ | ORDER A reads them with gh |
| the two worktrees' merged-by-content state | NOT-READ | ORDER C measures with git |

```evidence:branch
cf60cf8bab027c9b919acf3d4a96a690f4af150d
```

```evidence:trunk
824fb29d927c6e8c1f59e55ceac49455f3374cb0
```

## SCOPE
```scope
- PR for phase/trunk-ci-verdicts-s130-1 (report-only, docs/relay/ only)
- newest run of .github/workflows/nightly-compat.yml (jobs compat 20.x, compat 22.x, coverage)
- newest run of .github/workflows/budget-fence.yml (job fence)
- worktree wt-harden and worktree wt-hprov, release by RULE-49 measurement only
```
Those four are the whole scope.

## ORDER 0 — THE PR YOUR LAST REPORT NEEDS
`gh pr create --base master --head phase/trunk-ci-verdicts-s130-1 --title "TRUNK-CI-VERDICTS-S130-1-AG4-report (report-only)" --body-file docs/relay/TRUNK-CI-VERDICTS-S130-1-AG4-report.md`. Print the PR number and `headRefOid` from `gh pr view <n> --json number,headRefOid`; the oid must equal the `branch` fence. Wait for CI at that oid: `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<oid>"` — name the `total_count` you expect from your last report (2) and print what you get (F-S130-CI-COUNT-GROWS-AFTER-PUSH-1 applies if it grows).

## ORDER A — READ THE NIGHTLY VERDICTS
For each of `nightly-compat.yml` and `budget-fence.yml`: `gh api "repos/maymun207/cwf_yaprak/actions/workflows/<file>/runs?per_page=3"` — print `total_count`, then for the newest run: id, `event`, `head_sha` (full forty hex, in an UNANCHORED fence), `created_at`, `conclusion`, and every job with its conclusion from `gh api .../runs/<id>/jobs`. Then the same for the run before it, so a flap is visible. State the AGE of the newest run against `date -u` at the read. If `total_count` is zero for a workflow, that is a reading: the schedule has never fired — say so, do not call it green.

## ORDER B — IF ANY NIGHTLY JOB IS RED
Do not fix. Quote the failing step's last forty lines from `gh run view <id> --log-failed` into an UNANCHORED evidence fence, name the file and line it points at, and name whether the red is on the trunk tip or on an older sha (a nightly runs on whatever master was at 07:1xZ).

## ORDER C — RELEASE THE TWO WORKTREES, BY MEASUREMENT
`git worktree list --porcelain`. For each of `wt-harden` and `wt-hprov` that exists: print its branch and HEAD; measure merged-by-content with `git merge-base --is-ancestor <HEAD> origin/master` (print `$?`) AND `git diff --stat origin/master...<HEAD>` (expect empty); only if BOTH say merged, RE-READ THE BOX immediately before the command (`node scripts/mail-wait.mjs AG-4 --once`; if any card has arrived since this one, STOP and report rather than proceeding), then `git worktree remove <path>` and then `git worktree prune`; print `git worktree list` after. If either lens says not merged, leave it and report the diff. A worktree that does not exist is reported ABSENT, not removed.

## ORDER D — REPORT
File `docs/relay/NIGHTLY-VERDICTS-S131-1-AG4-report.md` on branch `phase/nightly-verdicts-s131-1`, push, open its PR the same way as ORDER 0, and post the same text as a from_lane row named `NIGHTLY-VERDICTS-S131-1-AG4-report`. Run `npm run card:preflight -- --check` on nothing — reports are not cards; but run `npx tsx scripts/relayAudit.ts` on your report file if the tree offers a report check, and print its verdict.

## FALSIFIER
Wrong if a nightly workflow has a `push` trigger after all (then your last report's "by construction" was wrong and this one says so), if the newest nightly run is older than 48 hours (then the schedule is not firing and that is the alarm, not the conclusion), or if a worktree is removed with either merged-lens disagreeing.

## SHARED SURFACES
Two PRs against master (report-only, `docs/relay/` only). Your window's own worktrees. No governed row; two bus rows (this report, and nothing else).

## DECISION RIGHTS
Whether a nightly red is fixed before hygiene — Architect, under S63-1. Whether `eval-canary` thaws — owner, frozen. Nothing here is the lane's to decide.

BODIES: bootstrap v131 items 1b and its ride-alongs · F-S131-TRUNK-VERDICT-CLASS-IS-NIGHTLY-1 · RULE-49 · S63-1 · S101-L1 · F-S130-CI-COUNT-GROWS-AFTER-PUSH-1 · TOTAL-45.

```deliverables
PR for phase/trunk-ci-verdicts-s130-1, number and headRefOid printed
report file docs/relay/NIGHTLY-VERDICTS-S131-1-AG4-report.md on phase/nightly-verdicts-s131-1, pushed, with its own PR
bus row from_lane NIGHTLY-VERDICTS-S131-1-AG4-report
worktree list after ORDER C
```

TAIL ANCHOR: CARD-NIGHTLY-VERDICTS-S131-1-v1 ends here.
