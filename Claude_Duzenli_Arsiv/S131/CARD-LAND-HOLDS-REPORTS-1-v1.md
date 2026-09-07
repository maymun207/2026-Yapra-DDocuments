<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-HOLDS-REPORTS-1 · v1 — land your two HOLDS-RELEASE report PRs as the owner's order, under OWNER-RULING-S131-LAND-HOLDS-REPORTS-1
lane: AG-5
report: docs/relay/LAND-HOLDS-REPORTS-1-AG5-report.md
fanout: personalized

Two PRs, the owner's order, the procedure you used for 495, 498 and 499. Your LAND-499-1 report (PR 502) is NOT in this card and neither is the report this card produces — the owner is being asked for a session-scoped standing order that ends this one-report-behind loop; until it exists, leave them OPEN.

## PREMISE
- MEASURED: 2026-09-07T04:31Z by the Architect, Vercel `list_deployments`: PR 499 landed → master at the tip in the `trunk` fence; PR 502 opened for `phase/land-499-1`.
- MEASURED: 2026-09-07T04:24Z by the Architect on the owner's clone refs: `origin/phase/holds-release-1` and `origin/phase/holds-release-2` present at the tips in the `tips` fence (`git rev-parse` in the clone; you re-read them at ORDER A).
- UNMEASURED: the two PR numbers, heads, paths, CI. ORDER A reads them by branch name.
- ON-DISAGREEMENT: any changed path outside `docs/relay/` → do NOT land that PR, report. A branch whose PR is already MERGED or CLOSED → skip and say so.
- DECAYS the moment either PR is closed or its branch force-pushed.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the ruling this card executes | MEASURED: owner's word in the Architect chat, recorded as OWNER-RULING-S131-LAND-HOLDS-REPORTS-1 | ruling |
| master as last read | MEASURED: Vercel list_deployments githubCommitSha of the #499 landing, 2026-09-07T04:28Z | trunk |
| the two branch tips as last read | MEASURED: git for-each-ref on origin refs in the owner's clone, 2026-09-07T04:24Z | tips |
| the PR numbers, heads, paths, CI, landings | NOT-READ | ORDERS A–C measure them |

```evidence:ruling
OWNER-RULING-S131-LAND-HOLDS-REPORTS-1 (2026-09-07, "onayıyorum !"): the PRs for phase/holds-release-1 and phase/holds-release-2 are landed by the foreman as the owner's order.
```

```evidence:trunk
fde98ac104e1345ef029513bf15984d958e86d73
```

```evidence:tips
phase/holds-release-1  1b415360cfb40cab114bda40365d0d92d02e2555
phase/holds-release-2  f5a6048fb0256eb82ef51e16d2a0a66af04bff1d
```

## SCOPE
```scope
- land: the PR whose head branch is phase/holds-release-1
- land: the PR whose head branch is phase/holds-release-2
```
Those two, in that order. Nothing else.

## ORDER A — READ
`gh pr list --state open --json number,headRefName,headRefOid` — print it whole; identify the two PRs by branch name; every other open PR is left alone. For each: `gh pr view <n> --json state,headRefOid,files`; `git diff --name-only origin/master...<head>` as the second lens on paths.

## ORDER B — SYNC IF OWED, CI
`git merge-base --is-ancestor origin/master <head>; echo $?` — 0 means no sync is owed (as with 499); otherwise `git merge --no-ff origin/master` in a worktree for the branch (S100-3 form; conflict → STOP that PR), push, read the new head. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<head>"` — expect 3 runs, wait for `completed`; zero after five minutes is FAILED.

## ORDER C — LAND, ONE AT A TIME
If `build (24.x)`, `relay corpus (grammar v1)` and `report-schema` are success: `npm run land -- <n>`; landing block names OWNER-RULING-S131-LAND-HOLDS-REPORTS-1. Prove: `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit`. Red corpus → do NOT land; quote `--log-failed` last forty lines in an UNANCHORED fence. Then the second PR (re-read master first — your own first landing moved it).

## ORDER D — REPORT
File `docs/relay/LAND-HOLDS-REPORTS-1-AG5-report.md` on branch `phase/land-holds-reports-1`; open its PR and leave it OPEN; post the same text ONCE as a from_lane row `LAND-HOLDS-REPORTS-1-AG5-report`.

## FALSIFIER
Wrong if either PR lands with a non-`docs/relay/` path, without a CI read at its (synced) head, or if any PR outside the scope fence is landed.

## SHARED SURFACES
master (two report-only landings) · the two branches (a sync merge each, only if owed) · one bus row.

## DECISION RIGHTS
None — the ruling decided.

BODIES: OWNER-RULING-S131-LAND-HOLDS-REPORTS-1 · OWNER-RULING-S131-LAND-499-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · S100-3 · S101-L1 · TOTAL-45.

```deliverables
two PRs landed with landing blocks naming the ruling, or refusals quoted
report file docs/relay/LAND-HOLDS-REPORTS-1-AG5-report.md on phase/land-holds-reports-1 with an OPEN PR
bus row from_lane LAND-HOLDS-REPORTS-1-AG5-report, posted once
```

TAIL ANCHOR: CARD-LAND-HOLDS-REPORTS-1-v1 ends here.
