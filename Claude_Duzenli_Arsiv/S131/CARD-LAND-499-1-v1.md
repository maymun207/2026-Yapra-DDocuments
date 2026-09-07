<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-LAND-499-1 · v1 — land your OWNER-TABLE-CLOSE-1 report (PR 499) as the owner's order, under OWNER-RULING-S131-LAND-499-1
lane: AG-5
report: docs/relay/LAND-499-1-AG5-report.md
fanout: personalized

One PR, the owner's order, the same procedure you used for 495 and 498. Your two HOLDS-RELEASE report PRs are NOT in this card — they wait for the owner's next word; do not land them.

## PREMISE
- MEASURED: 2026-09-07T04:24Z by the Architect on the owner's clone refs: `origin/phase/owner-table-close-1` at the tip in the `tip` fence; master at the tip in the `trunk` fence (the #498 landing, 2026-09-06T06:35Z); `phase/authorship-lens-2` and both probes ABSENT (your HOLDS-RELEASE-2 report, 21:58Z: deleted and proven absent — hygiene stage 3 closed).
- MEASURED: 2026-09-06T06:39Z, your own `OWNER-TABLE-CLOSE-1-AG5-report`: PR 499 opened for that branch and left OPEN by the card's order.
- UNMEASURED: PR 499's head, its changed paths, CI at the synced head. ORDER A and B read them.
- ON-DISAGREEMENT: if PR 499 has any changed path outside `docs/relay/`, do NOT land — report; it is §5's. If its head differs from the `tip` fence, act on what you read.
- DECAYS the moment PR 499 is closed or its branch force-pushed.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the ruling this card executes | MEASURED: owner's word in the Architect chat, recorded as OWNER-RULING-S131-LAND-499-1 | ruling |
| the branch tip as last read | MEASURED: git for-each-ref on origin refs in the owner's clone, 2026-09-07T04:24Z | tip |
| master as last read | MEASURED: same read, corroborated by Vercel list_deployments for the #498 landing | trunk |
| PR 499's head, paths, CI, landing | NOT-READ | ORDERS A–C measure them |

```evidence:ruling
OWNER-RULING-S131-LAND-499-1 (2026-09-07, "#499 raporunu da bitirelim"): PR 499 is landed by the foreman as the owner's order, one-off, at the head it reads at the forty hex.
```

```evidence:tip
525eb1f15f6f13732e9ded913c314bf22258bae3
```

```evidence:trunk
5f861d66e23656468abf30c8a86c8a22b4b79aa8
```

## SCOPE
```scope
- land: PR 499 (phase/owner-table-close-1)
```
That one PR. Nothing else.

## ORDER A — READ
`gh pr view 499 --json state,headRefOid,baseRefName,files` — print state (OPEN), the forty-hex head, every changed path; `git diff --name-only origin/master...<head>` as the second lens. Any path outside `docs/relay/` → ON-DISAGREEMENT.

## ORDER B — SYNC, CI
If behind master: `git merge --no-ff origin/master` in a worktree for the branch (S100-3 form; conflict → STOP and report), push, read the new head. `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<head>"` — expect 3 runs; wait for every run `completed`; `total_count` zero after five minutes is FAILED.

## ORDER C — LAND
If `build (24.x)`, `relay corpus (grammar v1)` and `report-schema` are success: `npm run land -- 499`; landing block names OWNER-RULING-S131-LAND-499-1 as the order. Then `git ls-remote origin refs/heads/master` and `gh pr view 499 --json state,mergeCommit` — MERGED and the merge commit on master are the proof. If the corpus job is red: do NOT land; quote `--log-failed` last forty lines in an UNANCHORED fence.

## ORDER D — REPORT
File `docs/relay/LAND-499-1-AG5-report.md` on branch `phase/land-499-1`; open its PR and leave it OPEN; post the same text ONCE as a from_lane row `LAND-499-1-AG5-report`.

## FALSIFIER
Wrong if PR 499 lands with a non-`docs/relay/` path, without a CI read at the synced head, or if any other PR is landed.

## SHARED SURFACES
master (one report-only landing) · `phase/owner-table-close-1` (one sync merge if behind) · one bus row.

## DECISION RIGHTS
None — the ruling decided.

BODIES: OWNER-RULING-S131-LAND-499-1 · OWNER-RULING-S131-OWNER-TABLE-1 · OWNER-RULING-S122-E1-E2 + E1-AMENDMENT-1 · S100-3 · S101-L1 · TOTAL-45.

```deliverables
PR 499 landed with its landing block naming the ruling, or its refusal quoted
report file docs/relay/LAND-499-1-AG5-report.md on phase/land-499-1 with an OPEN PR
bus row from_lane LAND-499-1-AG5-report, posted once
```

TAIL ANCHOR: CARD-LAND-499-1-v1 ends here.
