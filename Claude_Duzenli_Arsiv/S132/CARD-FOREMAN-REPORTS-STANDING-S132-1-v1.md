<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-FOREMAN-REPORTS-STANDING-S132-1 · v1 — under the owner's S132 standing order, land your own docs/relay-only report PRs and, under the standing report-only ruling, AG-4's; keep the queue empty until S132 closes, this card's own report included
lane: AG-5
report: docs/relay/FOREMAN-REPORTS-STANDING-S132-1-AG5-report.md
fanout: personalized

The owner re-gave for S132 the session-scoped standing order that ended S131's one-report-behind loop (`ruling` fence). Two report-only pull requests are open at mint: #505, your own boot/takeover report, and #506, AG-4's SOTA scoreboard report. Under the standing order you land your own; under OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 (still standing) you land another lane's report-only PR without a per-push word. Nothing else changes: any PR with a path outside `docs/relay/` is not yours to land, whoever wrote it — the MA-RERUN-3 PR that AG-4 will open carries `docs/replay/` and is EXCLUDED by that rule; leave it open and name it. This card stays alive: after the first pass, re-read the queue on every poll and apply the same classification until a closing card for your lane or S132 close.

## PREMISE
- MEASURED: 2026-09-07T06:16Z by the Architect, Vercel `list_deployments` — PR #505 `phase/s131-foreman-boot-1` at the `pr505` fence (author AG-5, its subject before the first colon), PR #506 `phase/sota-scoreboard-s132-1` at the `pr506` fence (author AG-4); master at the `trunk` fence, unmoved since the S131 close landing.
- MEASURED: 2026-09-07T06:45Z, the owner's word, recorded as OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1 (verbatim in the `ruling` fence).
- UNMEASURED: the open-PR list, each PR's author lane, paths and CI when you start; ORDER A reads them.
- ON-DISAGREEMENT: if either head differs from its fence, the branch moved — re-read paths and CI at the head you find, do not carry the fence. A PR with any path outside `docs/relay/` is LEFT OPEN and named. If `gh pr list` is refused, print the refusal and stop this pass; an unread list is not an empty list.
- DECAYS at S132 close (the owner's word), or the moment a closing card for AG-5 is read.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the standing order this card executes | MEASURED: owner's word in the Architect chat, verbatim | ruling |
| PR #505 head at mint | MEASURED: Vercel list_deployments githubCommitSha for phase/s131-foreman-boot-1 | pr505 |
| PR #506 head at mint | MEASURED: Vercel list_deployments githubCommitSha for phase/sota-scoreboard-s132-1 | pr506 |
| master at mint | MEASURED: Vercel list_deployments production newest githubCommitSha | trunk |
| the queue, authors, paths, CI, landings | NOT-READ | ORDERS A–C measure them on every pass |

```evidence:ruling
OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1: onay — S132 kapanana kadar foreman'ın yalnız docs/relay/ altına dokunan kendi gözlem-raporu PR'ları, senkron head'de CI yeşil olmak şartıyla, sahibin daimi emri sayılarak foreman tarafından indirilir; S132 kapanışında bu emir düşer. Owner's word: "PR #505 (foreman'ın kendi raporu) için S132 standing word - Evet diyorum."
```

```evidence:pr505
09e3791fef499f21aa3f7c952e0b360c5b9b0a5a
```

```evidence:pr506
a53ba2a2c8583fecfb2a4fd97d42996d2cd0bc68
```

```evidence:trunk
11d6da31644356efdb349f9a9cd9f258b1bdc05a
```

## SCOPE
```scope
- every open PR whose changed paths ALL start with docs/relay/ and whose author lane is AG-5 (standing order) or another lane (report-only ruling), at the time of each ORDER A read
- the report PR of this card, once it exists
- EXCLUDED by rule: any PR with a path outside docs/relay/ — named, left open
```
Membership is computed at each ORDER A read, never carried.

## ORDER A — READ THE QUEUE, CLASSIFY
`gh pr list --state open --json number,headRefName,headRefOid` — print whole. For each PR: `git diff --name-only origin/master...<head>` (paths) and the AUTHOR-SUBJECT read `land.ts` uses (each non-merge subject's text before the first colon carries exactly one lane token). In scope if every path starts with `docs/relay/`; the ruling that licenses it is the standing order for AG-5 authors and REPORT-ONLY-DRAIN-1 for other authors — print which. Print the classification per PR.

## ORDER B — FOR EACH IN-SCOPE PR, OLDEST FIRST: SYNC IF OWED, CI, LAND
`git merge-base --is-ancestor origin/master <head>; echo $?` — 0 means no sync owed; else `git merge --no-ff origin/master` in a worktree (S100-3; conflict → skip and report), push, read the new head. Ask CI at the FULL head sha with `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<head>"` — expect three runs, wait for completed; an empty read seconds after a push is "not yet registered", zero after five minutes is FAILED. If build (24.x), report-schema and relay corpus are success: `npm run land -- <n>`; the landing block names the ruling that licensed it; prove with `git ls-remote origin refs/heads/master` and `gh pr view <n> --json state,mergeCommit`. Red corpus → do not land, quote `--log-failed` in an UNANCHORED fence, continue. One PR in flight at a time; re-read master before each.

## ORDER C — REPORT, LAND THE REPORT, STAY ON WATCH
Write the report at the header path on branch `phase/foreman-reports-standing-s132-1` with the ORDER A classification and per-PR landing proofs; open its PR; treat it as one more in-scope member: CI at its head, land, prove. Post the report text ONCE as a from_lane row `FOREMAN-REPORTS-STANDING-S132-1-AG5-report` AFTER the landing, ending with `gh pr list --state open --json number` printed. Then keep polling: every later report-only PR in S132 is landed the same way, and each later pass is appended to the SAME report file by a new commit on a new branch of the same name pattern with a pass number, never by editing the landed file (S37-1).

## FALSIFIER
Wrong if any PR lands with a path outside `docs/relay/`, without a CI read at its synced head, under a ruling that does not cover its author, or if a pass ends without the open-PR list printed.

## SHARED SURFACES
master (N report-only landings) · the branches synced · bus rows, one per pass.

## DECISION RIGHTS
None — the two rulings decided; you classify, execute, measure.

BODIES: OWNER-RULING-S132-FOREMAN-REPORTS-STANDING-1 · OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · S100-3 · S101-L1 · S37-1 · TOTAL-45.

```deliverables
every in-scope PR landed with a landing block naming its licensing ruling, or its refusal quoted
docs/relay/FOREMAN-REPORTS-STANDING-S132-1-AG5-report.md landed on master under the standing order
bus row from_lane FOREMAN-REPORTS-STANDING-S132-1-AG5-report, once per pass, ending with the open-PR list
```

TAIL ANCHOR: CARD-FOREMAN-REPORTS-STANDING-S132-1-v1 ends here.
