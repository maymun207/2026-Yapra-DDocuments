<!-- relay-audit: v1 kind=card -->
CARD-LAND-OWN-SLIPS-S140-1-v1

LANE: AG-5
fanout: personalized
You are the FOREMAN, freshly booted through `npm run lane:boot` at 2026-09-16T03:47Z — the first live boot through the one-command path in this factory's history. This card is a landing of YOUR OWN four landing reports from S139: the reports for PR 560, PR 559, PR 561 and PR 564 each sit on their own `phase/land-*-s140-1` branch, one commit ahead of the master they forked from, and none has reached master. Each branch's single commit touches exactly one file under `docs/relay/`. This is the report-only landing the owner's ruling allows a lane to land for itself (OWNER-RULING-S122-E1-E2-v1 + E1-AMENDMENT-1: a lane may land the RECORD of a landing it was ordered to perform; the seam is land.ts's AUTHOR-SUBJECT classification, and you are both). The report follows the landing and never gates it — these ARE the reports, and they are owed to master.

The land script's step 2 is the designed route for a behind-master branch: three of the four are behind, so expect the two-run shape you measured yourself on PR 559, PR 561 and PR 564 — step 2 merges master into the branch through the forge, refuses CI-ZERO-RUNS, you wait on CI at the moved head, run 2 lands. THAT SYNC IS NOT A DECAY OF THIS CARD. Land them oldest fork first so each sync is small.

PRECONDITION: master is at the fenced anchor in `the-heads` and the four branch heads are as fenced. If any differs, YOUR reading wins and you print both; you still land on YOUR measured green.

```evidence:the-heads
measured       2026-09-16T04:04:39Z shared-clone refs (lane-fetched origin), read by the Architect; the Architect holds no forge credential
master         abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb   merge of PR 564
land-560       phase/land-560-s140-1  head 34ff88fed503e0a323fc80436e8564ca13f0308c  fork bb1a157507ec0d30b21afb4fef6623a2dc0d130a  behind master by 13 commits  PR 562
land-559       phase/land-559-s140-1  head 50a95201e06eb041e159eb06292335a56039994f  fork fb7f971ca626536864308cf9e3f0dfe2873b7877  behind master by 8 commits   PR 563
land-561       phase/land-561-s140-1  head ead91050fbc87e29baa0bb8ac445f41c32dd0a9d  fork ec09181359fecd327b08beeae1098b59713e1f1e  behind master by 4 commits   PR 565
land-564       phase/land-564-s140-1  head cdf3b8ad0770885914c62415bd975f5ed53da0f0  fork abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb  behind master by 0 commits   PR 566
each commit    git diff-tree --no-commit-id --name-only -r <head> prints exactly ONE path:
               docs/relay/LAND-CLARIFY-SPAN-S139-1-AG5-report.md · docs/relay/LAND-TABLE-CELLS-S139-1-AG5-report.md · docs/relay/LAND-LANE-BOOT-S139-1-AG5-report.md · docs/relay/LAND-ASK-NO-LAYER-NO-PROSE-S139-1-AG5-report.md
each file      first line is the relay-audit report header; NUL byte count 0 in all four (tr -cd over git show)
PR numbers     read from the Vercel deployment records' githubPrId for each branch push (dpl_EcX7jqjBY8dWvo9cgGRRuBEoPz9m, dpl_3YsbUsQkTdFnmiQRSiwUwxjdtJPT, dpl_BsUy2iuDxPEP1H8SCEW1q4rJtuYN, dpl_3sXsUfWFdPpfWr1vy6vpjh2bPYqP)
```

```evidence:ci-as-last-read
read by        nobody for these four heads — the Architect cannot read GitHub Actions; the branch pushes were docs-only and Vercel CANCELED their previews by the ignore script, which says nothing about CI
```

## PREMISE

MEASURED: the four heads, forks, distances, single-path diff-trees, report headers and NUL counts in `the-heads`, read at 2026-09-16T04:04:39Z from the shared clone.
UNMEASURED: CI at any of the four heads. ORDER 2 measures it, per head, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; the four diffs touch only `docs/relay/` and no permission surface, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route; you landed eight PRs through it in S139.
SELF-INVALIDATION: this premise dies if any head moves by a hand other than the land script's own step 2, if master moves off the fenced anchor by any landing other than yours under this card (your own four landings move it, by design, and that is not decay), or if a diff-tree ever shows a second path.

## ORDERS

ORDER 1 - RUN `npm run land:selftest` ON THE CURRENT MASTER FIRST AND PRINT ITS OUTPUT. If it passes, the land script is your route for all four. If it fails, the detached form is your NAMED fallback and the failure goes to the bus as a finding.

ORDER 2 - FOR EACH PR IN THIS ORDER — 562, 563, 565, 566 — MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise, and you say so. Where no run exists because the push was docs-only and nothing fired, the state is UNMEASURED, not red: the land script's step 2 will produce a moved head and its own run; wait on THAT run and land on it. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green.

ORDER 3 - LAND EACH ON ITS OWN GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- <PR>`. The PRs exist — use them, open none. No-ff, never a squash. After each landing, re-read master's forty-hex head before starting the next; the next branch's step 2 syncs onto it.

ORDER 4 - YOU EDIT NOTHING. These are your own files, and the rule still holds the other way: if the land script refuses on any of them, stop, print the refusal verbatim on the bus, and that refusal is a finding — a report-only landing that a gate refuses is worth more to this house than a landing chased with an edit.

ORDER 5 - AFTER THE FOURTH MERGE, READ THE PRODUCT: master's new forty-hex head, the CI conclusion at that head as it arrives, and the Vercel record for it (a docs-only push is CANCELED by the ignore script by design — print that verbatim, it is not an outage).

ORDER 6 - POST ONE from_lane slip after all four, never before: `read relay_inbox at <ISO>`, the four PRs with their landed master heads in order, the runs you landed on. No fifth report file for this card — the four reports ARE the deliverable, and a report about landing reports is the recursion this house refuses.

## FALSIFIER

If any diff-tree shows a second path, STOP: this card promised one file per branch and was wrong.

If the land script's merge-tree rehearsal reports a conflict on any branch, STOP for that branch, print it, continue with the others, and report which stopped.

If CI at a moved head is red, STOP that branch: name WHICH step failed and which were SKIPPED. Do not re-run to chase a green.

If the self-test fails AND the detached fallback also refuses, STOP and print both refusals rather than choosing a third route.

## SHARED SURFACES

```scope
- docs/relay/LAND-CLARIFY-SPAN-S139-1-AG5-report.md
- docs/relay/LAND-TABLE-CELLS-S139-1-AG5-report.md
- docs/relay/LAND-LANE-BOOT-S139-1-AG5-report.md
- docs/relay/LAND-ASK-NO-LAYER-NO-PROSE-S139-1-AG5-report.md
```

You write NOTHING. The merge commits are the land script's.

## DECISION RIGHTS

You choose the route between the land script and the detached fallback on ORDER 1's measurement and nothing else. You may reorder the four if a measured conflict makes the fenced order impossible, and you say why. You may refuse any landing on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| four report branches exist at the fenced heads, each one commit over its fork, each commit touching one docs/relay path | MEASURED: git rev-parse, merge-base, rev-list --count and diff-tree over the shared clone at 2026-09-16T04:04:39Z | the-heads |
| the four files carry the report header and no NUL byte | MEASURED: git show head:path piped to head -1 and tr -cd NUL at 2026-09-16T04:04:39Z | the-heads |
| the PR numbers | READ: Vercel deployment records githubPrId at 2026-09-15T20:5xZ | the-heads |
| CI at the four heads | NOT-READ | ORDER 2 is yours |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the four diff-trees | the-heads |
| whether the land self-test passes on the current master | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if a branch head moves by any hand other than the land script's own step 2, if a diff-tree shows a second path, or if the canary freeze is lifted. Your own four landings moving master are the card's purpose, not its decay.
