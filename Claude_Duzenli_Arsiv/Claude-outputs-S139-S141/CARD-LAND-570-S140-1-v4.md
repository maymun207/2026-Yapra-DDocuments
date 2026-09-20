<!-- relay-audit: v1 kind=card -->
CARD-LAND-570-S140-1-v4

LANE: AG-5
fanout: personalized
v4 SUPERSEDES v3, v2 and v1, all of which DECAYED before delivery on the scout's CI reads. v1 head (the `code` commit in `the-head`): build (24.x) step 8 `Tenant-zero gate` FAILURE (live factory vocabulary in two test fixtures, carried there by the Architect's own ORDER 3 wording). v2 head (the first `repair` commit in `the-head`): step 8 SUCCESS — the vocabulary repair is measured — then step 9 `Build` FAILURE on `check:doc-drift` (two tabs drifted: the mapped test file changed and no reseal travelled in the repair commit), step 10 SKIPPED. v3 head (the second `repair` commit in `the-head`): step 8 SUCCESS, step 9 FAILURE again on doc-drift — the scout confirmed the Architect's reading that the manifest was never committed (the four twelve-hex digests are printed in `raw-tokens`). The author's THIRD repair, the `reseal` commit in `the-head`, pushed at 2026-09-16T07:00:43Z, commits the manifest with exactly the two `got` digests — the gate's own — and its slip says check:doc-drift OK and tenant-zero [OK] ZERO hits locally (RELAYED, local, not a CI verdict). The §12.8 clock restarted at that push; a fourth red on this branch STOPS the landing and goes to the author by name. Second CODE landing of S140 for the FOREMAN. You did not write this code and you will not repair it. The branch is behind master by three docs/relay landings of yours, so expect the two-run shape: step 2 syncs through the forge, refuses CI-ZERO-RUNS, you wait on CI at the moved head and land on run 2. THAT SYNC IS NOT A DECAY OF THIS CARD.

WHAT IT IS: every read of `entity_registry` now pages (one private helper, four callers, complete-or-thrown), with the repository test that would have caught the cut and one disambiguator assertion — CARD-REGISTRY-READS-PAGINATE-S140-1-v1, which the scout reviewed GREEN. The owner witnessed the defect twice this morning on his own screen: an ask among 452 rows all labelled "equipment", then an ask among exactly one thousand. The report follows the landing and never gates it.

PRECONDITION: the branch head is as fenced and on the forge, master is at or beyond the fenced anchor by docs/relay landings only, and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
doc-drift at the v3 head    Architecture Map expected e24bcb28e872 got 2a49b985a4a7 · Runtime Topology expected 9d19ce994993 got be0294325438
manifest at the v4 head     Architecture Map 2a49b985a4a7 · Runtime Topology be0294325438
```

```evidence:the-head
branch         phase/registry-reads-paginate-s140-1
head           02dc5530408e368ce4fb358e212026a1322119f1   the RESEAL commit, authored 2026-09-16T07:00:43Z (author's slip at 07:02:10Z, CI in progress at read); five commits over the fork: code 97998416519e0294c30c6b6fd4e1ceadd48eb3d3 · report 9277c218e3035367ca3d3069547bc0092739bfaa · repair 4e2cefd3a093e56428893321df0687cd7fabc679 · repair 9667cfdfc0e653f9cd7b873abd4f0bdb493c9f4a · reseal 02dc5530408e368ce4fb358e212026a1322119f1
fork point     8075436f98455844115d275ad32b20cdf93203cb   (merge of PR 555)
master         a996a2f5e92f7da0ea537e4a8b96d94d21fb2059   merge of PR 569 at 06:37:14Z; the branch is ahead by 5 and behind by 3 (PRs 569's sync and merge, docs/relay only)
pull request   570, opened by the author
diff           5 paths over master, three-dot: api/cwf/__tests__/stageClarify.test.ts · api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts · api/cwf/_lib/persistence/repositories/__tests__/EntityRegistryRepository.paged.test.ts (new) · docs/relay/REGISTRY-READS-PAGINATE-S140-1-AG4-report.md (new) · public/architecture/manifest.json (reseal); the reseal commit touches the report and public/architecture/manifest.json only (29 insertions, 11 deletions); the manifest at this head carries, for Architecture Map and Runtime Topology, exactly the two mappedContentSha values the gate printed as `got` at the previous head (see `raw-tokens`); NUL bytes over the whole three-dot diff 0; no settings, hooks, guard, allowlist or migration path
measured       2026-09-16T07:04Z shared-clone objects (lane-fetched origin) and the Vercel deployment record, read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-last-read
read by        nobody at this head at the time of cutting — the author's slip of 07:02:10Z says all three workflows in progress at 07:03Z; the scout is ordered in the review of this card to read it and name every workflow and conclusion, in-progress named as in-progress. At the EARLIER heads the scout read: step 8 Tenant-zero FAILURE (v1 head); step 8 SUCCESS and step 9 doc-drift FAILURE (v2 head); the same step 9 FAILURE with the manifest uncommitted (v3 head) — those are the reds the three repairs answer, and they are NOT evidence about this head
```

## PREMISE

MEASURED: the head, fork point, master, the five paths, the reseal commit's stat and its two manifest digests, the NUL count and the permission grep in `the-head`, at 2026-09-16T07:04Z.
MEASURED: the v1, v2 and v3 reds — step 8 at the v1 head, step 9 doc-drift at the v2 and v3 heads — RELAYED from the scout's three verdicts; they are why v4 exists.
UNMEASURED: CI at this head. Nobody has read it; this card does not call the head green. ORDER 2 is where green is measured, by you, and you WAIT for it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — do not land on a partial set, and do not call the wait a blocker: name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 570`. The PR exists — use it, open none. No-ff, never a squash. Step 2 will sync (the branch is behind by three); wait on CI at the moved head and land on run 2. If ANY step reddens at this head, STOP: that is the author's, by ORDER 4, and a fourth red on one branch is a finding in its own right — name the step.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — so print state and readyState; a CANCELED here would be a finding, unlike the docs-only landings). Post ONE from_lane slip.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/__tests__/stageClarify.test.ts
- api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts
- api/cwf/_lib/persistence/repositories/__tests__/EntityRegistryRepository.paged.test.ts
- docs/relay/REGISTRY-READS-PAGINATE-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, master, five paths, the manifest digests, NUL count and permission grep | MEASURED: git cat-file, merge-base, rev-list, diff --name-only three-dot, show --stat, show of the manifest and tr over the shared clone at 2026-09-16T07:04Z | the-head |
| the pull request number and the push instant | READ: the author's slip on the bus at 2026-09-16T07:02:10Z and the commit's own timestamp | the-head |
| the reds at the three earlier heads | RELAYED: the scout's verdicts at 2026-09-16T06:40:03Z, 06:51:34Z and 06:59:00Z | ci-as-last-read |
| CI at the head | NOT-READ | ci-as-last-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the five-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v5 appears.
