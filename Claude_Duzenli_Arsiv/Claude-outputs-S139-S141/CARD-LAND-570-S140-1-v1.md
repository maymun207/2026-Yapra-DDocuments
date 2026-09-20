<!-- relay-audit: v1 kind=card -->
CARD-LAND-570-S140-1-v1

LANE: AG-5
fanout: personalized
Second CODE landing of S140 for the FOREMAN, and the §12.8 clock on it started at 2026-09-16T06:31:56Z when the author pushed: working code reaches master within thirty minutes of being ready or the ONE measured reason is named. Take it ahead of CARD-LAND-569-S140-1-v1 if 569 is waiting on CI. You did not write this code and you will not repair it. The branch forks from the CURRENT master, so the land script's step 2 should measure NO update owed and this may be a one-run landing — if master moves under it by a docs/relay landing of yours, step 2 syncs and you land on run 2; that sync is not a decay.

WHAT IT IS: every read of `entity_registry` now pages (one private helper, four callers, complete-or-thrown), with the repository test that would have caught the cut and one disambiguator assertion — CARD-REGISTRY-READS-PAGINATE-S140-1-v1, which the scout reviewed GREEN. The owner witnessed the defect twice this morning on his own screen: an ask among 452 rows all labelled "equipment", then an ask among exactly one thousand. The report follows the landing and never gates it.

PRECONDITION: the branch head is as fenced and on the forge, master is at or beyond the fenced anchor by docs/relay landings only, and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:the-head
branch         phase/registry-reads-paginate-s140-1
head           97998416519e0294c30c6b6fd4e1ceadd48eb3d3   one commit, authored 2026-09-16T06:31:46Z, pushed 06:31:56Z (Vercel record dpl_7THzeu9d5gywPVumsu7YxW5MQzto, githubPrId 570, preview CANCELED by the ignore script as every branch push today)
fork point     8075436f98455844115d275ad32b20cdf93203cb   the current master (merge of PR 555); ahead by 1, behind by 0
pull request   570, opened by the author
diff           4 paths: api/cwf/__tests__/stageClarify.test.ts (+33) · api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts (195 lines, +/-) · api/cwf/_lib/persistence/repositories/__tests__/EntityRegistryRepository.paged.test.ts (new, +240) · public/architecture/manifest.json (reseal: lastSyncedCommit and mappedContentSha only); 429 insertions, 57 deletions; NUL bytes over the repository file 0; no settings, hooks, guard, allowlist or migration path
measured       2026-09-16T06:35Z shared-clone objects (lane-fetched origin) and the Vercel deployment record, read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-last-read
read by        nobody at this head — the author's slip has not yet been posted at the time of cutting; the scout is ordered in the review of this card to read CI at the head and name every workflow and conclusion
```

## PREMISE

MEASURED: the head, fork point, the four paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T06:35Z.
UNMEASURED: CI at this head. Nobody has read it; this card does not call the head green. ORDER 2 is where green is measured, by you, and you WAIT for it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — do not land on a partial set, and do not call the wait a blocker: name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 570`. The PR exists — use it, open none. No-ff, never a squash. If step 2 syncs, wait on CI at the moved head and land on run 2.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — so print state and readyState; a CANCELED here would be a finding, unlike the docs-only landings). Post ONE from_lane slip.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/__tests__/stageClarify.test.ts
- api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts
- api/cwf/_lib/persistence/repositories/__tests__/EntityRegistryRepository.paged.test.ts
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, four paths, NUL count and permission grep | MEASURED: git cat-file, diff-tree, merge-base, rev-list, show --stat and tr over the shared clone at 2026-09-16T06:35Z | the-head |
| the pull request number and push instant | READ: Vercel deployment record at 2026-09-16T06:34Z | the-head |
| CI at the head | NOT-READ | ci-as-last-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the four-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.
