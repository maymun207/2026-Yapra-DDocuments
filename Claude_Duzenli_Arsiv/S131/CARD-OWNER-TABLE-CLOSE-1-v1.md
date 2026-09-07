<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-OWNER-TABLE-CLOSE-1 · v1 — execute OWNER-RULING-S131-OWNER-TABLE-1: close eleven PRs by name without deleting a branch, land your two own reports as the owner's order, and measure the queue empty
lane: AG-5
report: docs/relay/OWNER-TABLE-CLOSE-1-AG5-report.md
fanout: personalized

Hygiene stage 2 closes with this card. The owner ruled (OWNER-RULING-S131-OWNER-TABLE-1, in the `ruling` fence) on the set your drain card sent to the table plus the triage's 1b and owner-table classes. Nothing here rewrites a report, nothing deletes a branch, and the two landings are the owner's decision, not yours — this card carries that decision so that ⑤ is satisfied by a person's order rather than by your own judgment.

## PREMISE
- MEASURED: 2026-09-06T06:12Z by the Architect, bus row `HYGIENE-DRAIN-1A-AG5-report` (04:52:18Z): #444 and #437 refused on a corpus red at their synced heads; #484, #451, #434 landed; master at the tip in the `master` fence; PR #498 open, your own report.
- MEASURED: 2026-09-05T05:32Z by the scout, `SCOUT-OPEN-PR-TRIAGE-1-v1`: 424 427 431 432 483 485 487 header-missing (would red master); 405 AUTHOR-UNKNOWN {AG-3, AG-5}; 419 CONFLICTING.
- MEASURED: 2026-09-06T04:0xZ, Vercel `list_deployments`: PR #495 (`phase/foreman-boot-takeover-1`) rewritten to the relay grammar at the tip in the `pr495` fence; it may have moved since — ORDER C reads its head.
- UNMEASURED: the current open-PR list and each head. ORDER A reads it first.
- ON-DISAGREEMENT: if any PR in the `close` fence is already CLOSED or MERGED, skip it and say so; if any PR OUTSIDE the `close` fence and outside {495, 498} is open, do NOT touch it — report it. If #495 or #498 has a changed path outside `docs/relay/`, do NOT land it — report, it is §5's.
- DECAYS the moment a new PR is opened or any listed branch moves.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the ruling this card executes | MEASURED: owner's word in the Architect chat, recorded as OWNER-RULING-S131-OWNER-TABLE-1 | ruling |
| the eleven PRs to close | MEASURED: the ruling's own list | close |
| master at cutting time | MEASURED: bus row HYGIENE-DRAIN-1A-AG5-report tally fence, corroborated by Vercel list_deployments | master |
| PR 495's last-read head | MEASURED: Vercel list_deployments githubCommitSha for ref phase/foreman-boot-takeover-1, 2026-09-06T04:0xZ | pr495 |
| the open-PR list, heads, and post-close queue | NOT-READ | ORDER A and ORDER D read them |

```evidence:master
e4d4bcdd52b06899f27edcfbfb0901b06cc56b9a
```

```evidence:pr495
38726536a41c412ba163d2e8ebe4466501d396da
```

```evidence:ruling
OWNER-RULING-S131-OWNER-TABLE-1 (2026-09-06, "onaylıyorum"): the eleven are closed by name, no branch deleted; GATE-1 ⓹ superseded; #495 and #498 landed by the foreman as the owner's order.
```

```evidence:close
405 419 424 427 431 432 437 444 483 485 487
```

## SCOPE
```scope
- close: PR 405
- close: PR 419
- close: PR 424
- close: PR 427
- close: PR 431
- close: PR 432
- close: PR 437
- close: PR 444
- close: PR 483
- close: PR 485
- close: PR 487
- land: PR 495 (phase/foreman-boot-takeover-1)
- land: PR 498 (phase/hygiene-drain-1a)
```
Those thirteen are the whole scope.

## ORDER A — READ THE QUEUE FIRST
`gh pr list --state open --json number,headRefName,headRefOid --limit 100` — print it whole. Every number must be in the scope fence; anything else is ON-DISAGREEMENT (report, do not touch).

## ORDER B — CLOSE ELEVEN, DELETE NOTHING
For each PR in the `close` fence, in that order: `gh pr close <n> --comment "Closed under OWNER-RULING-S131-OWNER-TABLE-1: pre-grammar report that cannot land green; content retained on this branch and on the relay bus. Branch NOT deleted."` — WITHOUT `--delete-branch`. After each, `gh pr view <n> --json state` = CLOSED, and `git ls-remote origin refs/heads/<branch>` still returns the head (the branch survives). Print both per PR.

## ORDER C — LAND YOUR TWO OWN REPORTS, AS THE OWNER'S ORDER
For #495 then #498: read head at the forty hex; sync against current master if behind (`git merge --no-ff origin/master`, S100-3 form; conflict → STOP that PR, report); read CI at the synced head (expect 3 runs; wait for `completed`); if `build (24.x)`, `relay corpus (grammar v1)` and `report-schema` are success, `npm run land -- <n>`. Your landing block must name OWNER-RULING-S131-OWNER-TABLE-1 as the order — land.ts's report-only exception permits author==lander (your F-B); the ruling is what makes it legitimate under ⑤. If the corpus job is red on either, do NOT land: report the red — a red here means the rewrite did not reach the grammar and the PR joins the closed class by a later ruling, not by you.

## ORDER D — MEASURE THE QUEUE EMPTY
`gh pr list --state open --json number` — expect `[]`. Print it. `git ls-remote origin refs/heads/master` — print the forty hex.

## ORDER E — REPORT
File `docs/relay/OWNER-TABLE-CLOSE-1-AG5-report.md` on branch `phase/owner-table-close-1` with: ORDER A list, per-PR close proof (state + surviving branch head), the two landing blocks or their refusals, ORDER D output. Open its PR and leave it OPEN — it is your own observation report and this ruling covers only #495 and #498. Post the same text as a from_lane row `OWNER-TABLE-CLOSE-1-AG5-report`.

## FALSIFIER
Wrong if any branch disappears from `git ls-remote --heads origin` between ORDER A and ORDER D, if a PR outside the scope fence is closed or landed, or if #495/#498 land with a red corpus job.

## SHARED SURFACES
GitHub PR state for the thirteen · master (two report-only landings) · one bus row. No branch, no governed row, no product file.

## DECISION RIGHTS
None — the ruling decided; you execute and measure.

BODIES: OWNER-RULING-S131-OWNER-TABLE-1 · OWNER-RULING-S131-REPORT-ONLY-DRAIN-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · S37-1 · S100-3 · S101-L1 · TOTAL-45.

```deliverables
eleven PRs CLOSED with the ruling named, eleven branches still on origin
#495 and #498 landed (or their refusal quoted), each with its landing block naming the ruling
gh pr list --state open = [] printed
report file docs/relay/OWNER-TABLE-CLOSE-1-AG5-report.md on phase/owner-table-close-1 with an OPEN PR
bus row from_lane OWNER-TABLE-CLOSE-1-AG5-report
```

TAIL ANCHOR: CARD-OWNER-TABLE-CLOSE-1-v1 ends here.
