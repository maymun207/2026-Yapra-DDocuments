<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-FOREMAN-REPORTS-DRAIN-1 · v1 — under the owner's standing order, land every one of your own docs/relay-only report PRs until the open-PR list is empty, this card's own report included
lane: AG-5
report: docs/relay/FOREMAN-REPORTS-DRAIN-1-AG5-report.md
fanout: personalized

The owner gave a session-scoped standing order (`ruling` fence) so the one-report-behind loop ends. Run this AFTER CARD-LAND-HOLDS-REPORTS-1-v1 completes. Under the standing order you land your own report PRs — including the report PR this card produces — provided each is docs/relay-only and CI-green at its synced head. Nothing else changes: another lane's PR, or any PR with a path outside `docs/relay/`, is not yours to land.

## PREMISE
- MEASURED: 2026-09-07T04:37Z by the Architect, Vercel `list_deployments`: you are syncing `phase/holds-release-1` (PR 500) under CARD-LAND-HOLDS-REPORTS-1; PR 502 (`phase/land-499-1`) is open, your own LAND-499-1 report; master at the tip in the `trunk` fence (the #499 landing) as of that read — your landings move it.
- MEASURED: 2026-09-07T04:4xZ, the owner's word, recorded as OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 (verbatim in the `ruling` fence).
- UNMEASURED: the open-PR list when you start, each PR's author lane, paths, and CI. ORDER A reads them.
- ON-DISAGREEMENT: a PR whose author lane is not AG-5, or with any path outside `docs/relay/`, is LEFT OPEN and named in your report — the standing order does not reach it. If `gh pr list` is refused, print the refusal and stop; an unread list is not an empty list.
- DECAYS at S131 close (the owner's word), or the moment a non-AG-5 PR appears (it is simply excluded, the card continues).

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the standing order this card executes | MEASURED: owner's word in the Architect chat, verbatim | ruling |
| master as last read | MEASURED: Vercel list_deployments githubCommitSha of the #499 landing, 2026-09-07T04:28Z | trunk |
| the open-PR list, authors, paths, CI, landings | NOT-READ | ORDERS A–C measure them, repeatedly |

```evidence:ruling
OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1: onay — S131 kapanana kadar foreman'ın yalnız docs/relay/ altına dokunan kendi gözlem-raporu PR'ları, senkron head'de CI yeşil olmak şartıyla, sahibin daimi emri sayılarak foreman tarafından indirilir; S131 kapanışında bu emir düşer.
```

```evidence:trunk
fde98ac104e1345ef029513bf15984d958e86d73
```

## SCOPE
```scope
- every open PR whose author lane is AG-5 and whose changed paths all start with docs/relay/, at the time of each ORDER A read
- the report PR of CARD-LAND-HOLDS-REPORTS-1 (once it exists)
- the report PR of this card (once it exists)
```
Membership is computed at each ORDER A read, never carried.

## ORDER A — READ THE QUEUE, CLASSIFY
`gh pr list --state open --json number,headRefName,headRefOid` — print whole. For each PR: `git diff --name-only origin/master...<head>` (paths) and the AUTHOR-SUBJECT read land.ts uses (each non-merge subject's text before the first colon must carry exactly one `AG-5`). In scope only if author = AG-5 AND every path starts with `docs/relay/`. Print the classification per PR.

## ORDER B — FOR EACH IN-SCOPE PR, OLDEST FIRST: SYNC IF OWED, CI, LAND
`git merge-base --is-ancestor origin/master <head>; echo $?` — 0 means no sync owed; else `git merge --no-ff origin/master` in a worktree (S100-3; conflict → skip and report), push, read the new head. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<head>"` — expect 3, wait for `completed`; zero after five minutes is FAILED. If build (24.x), report-schema and relay corpus are success: `npm run land -- <n>`, landing block names OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1; prove with `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit`. Red corpus → do not land, quote `--log-failed` in an UNANCHORED fence, continue with the next. One PR in flight at a time; re-read master before each.

## ORDER C — REPORT, THEN LAND THE REPORT
Write `docs/relay/FOREMAN-REPORTS-DRAIN-1-AG5-report.md` on branch `phase/foreman-reports-drain-1` with the ORDER A classification and per-PR landing proofs; open its PR; then treat that PR as one more in-scope member: CI at its head, `npm run land`, prove. Post the report text ONCE as a from_lane row `FOREMAN-REPORTS-DRAIN-1-AG5-report` AFTER the landing, with the final `gh pr list --state open --json number` output appended — expected `[]`.

## FALSIFIER
Wrong if any PR lands with a non-AG-5 author or a non-`docs/relay/` path, without a CI read at its synced head, or if the final open-PR list is not printed.

## SHARED SURFACES
master (N report-only landings) · the branches synced · one bus row.

## DECISION RIGHTS
None — the standing order decided; you classify, execute, measure.

BODIES: OWNER-RULING-S131-FOREMAN-REPORTS-STANDING-1 · OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · S100-3 · S101-L1 · TOTAL-45.

```deliverables
every in-scope PR landed with a landing block naming the standing order, or its refusal quoted
report file docs/relay/FOREMAN-REPORTS-DRAIN-1-AG5-report.md, landed on master under the same order
bus row from_lane FOREMAN-REPORTS-DRAIN-1-AG5-report, posted once, ending with the open-PR list
```

TAIL ANCHOR: CARD-FOREMAN-REPORTS-DRAIN-1-v1 ends here.
