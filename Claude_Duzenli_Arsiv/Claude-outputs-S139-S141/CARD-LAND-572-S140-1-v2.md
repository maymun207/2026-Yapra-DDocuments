<!-- relay-audit: v1 kind=card -->
CARD-LAND-572-S140-1-v2

LANE: AG-5
fanout: personalized
v2 SUPERSEDES v1, which DECAYED before delivery: the head moved twice by the author's hand — a report commit, then a merge of master because the pull request was DIRTY (a seal conflict on public/architecture/manifest.json between this branch's reseal and PR 571's reseal; no pull_request run fires on a dirty PR). The author resolved the conflict by RESEAL OVER THE MERGED TREE only (Architecture Map digest recomputed, four other tabs byte-identical) and pushed at 2026-09-16T08:38:25Z. Fourth CODE landing of S140 for the FOREMAN; the §12.8 clock restarted at that push. WHAT IT IS: CARD-RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-v1 — in `turn/stageClarify.ts` a ref now resolves against every registry layer (the frame object names the answer's layer only) and an ambiguity spanning child and parent layers is asked at the parent; one new test file, one extended, one new label source in `routing/askOnUnresolved.ts`, reseal in the same commit. The scout reviewed the work card GREEN (row named in `raw-tokens`). The branch now CONTAINS master (the author's merge), so the land script's step 2 should find no update owed and this should be a ONE-run landing; if master moves under it by a docs/relay landing of yours, step 2 syncs and you land on run 2 — that sync is not a decay. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at or beyond the fenced anchor, the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
scout verdict row    fe51e85a-23fb-4fe5-abad-0b0c6f45204d
```

```evidence:the-head
branch         phase/resolve-every-layer-ask-at-parent-s140-1
head           6409f813196bcd4c724510a8175879c37d6b4158   the author's MERGE commit (origin/master into the branch, --no-ff, seal conflict resolved by reseal), authored 2026-09-16T08:38:25Z; three commits over master: code 73212e598477c45db6294a1be9ede1cda33a7b69 (08:29:16Z) · report 5dae91359751b3f3e3ce4e2c637f76fae5c0ee5f (08:32:19Z) · merge 6409f813196bcd4c724510a8175879c37d6b4158
master         688cfc45c4e541916a0e8c9a41c12715991a8df8   merge of PR 571; the branch is ahead by 3 and behind by 0
pull request   572, opened by the author
scout verdict  the verdict row on the work card CARD-RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-v1 (its id in `raw-tokens`), GREEN at 2026-09-16T08:01:04Z
diff           6 paths over master, three-dot: api/cwf/__tests__/stageClarify.test.ts · api/cwf/__tests__/stageClarifyLayers.test.ts (new) · api/cwf/_lib/routing/askOnUnresolved.ts · api/cwf/_lib/turn/stageClarify.ts · docs/relay/RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-AG4-report.md (new) · public/architecture/manifest.json (reseal over the merged tree); 641 insertions, 41 deletions; NUL bytes over the whole three-dot diff 0; no settings, hooks, guard, allowlist or migration path
author slips   RELAYED: 08:33:20Z (code+report, ci UNMEASURED seconds after push) and 08:39:24Z (the merge; Build and Test · report-schema · Relay corpus all in progress at 08:41Z; local gates typecheck:api · vitest 730 files 10742 passed · build after reseal · tenant-zero [OK] ZERO hits · lint; failing-first fork 11 failed/65 passed, head 86 passed across three suites)
measured       2026-09-16T08:42Z shared-clone objects (lane-fetched origin) and the Vercel deployment record, read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-last-read
read by        the author only, in progress at 08:41Z — RELAYED, not a verdict; the scout is ordered in the review of this card to read it and name every workflow and conclusion, in-progress named as in-progress; steps 8 (Tenant-zero) and 9 (Build/doc-drift) are the two that held PR 570 and are named first
```

## PREMISE

MEASURED: the head, its three commits over master, the six paths, the stat, the NUL count and the permission grep in `the-head`, at 2026-09-16T08:42Z.
MEASURED: the v1 decay — two author pushes after the v1 fence — RELAYED from the author's two slips.
MEASURED: the scout's GREEN on the work card, on the bus at 08:01:04Z.
UNMEASURED: CI at this head. Nobody has read it; this card does not call the head green. ORDER 2 is where green is measured, by you, and you WAIT for it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — do not land on a partial set, and do not call the wait a blocker: name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 572`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — so print state and readyState; a CANCELED here would be a finding, unlike the docs-only landings). Post ONE from_lane slip.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/__tests__/stageClarify.test.ts
- api/cwf/__tests__/stageClarifyLayers.test.ts
- api/cwf/_lib/routing/askOnUnresolved.ts
- api/cwf/_lib/turn/stageClarify.ts
- docs/relay/RESOLVE-EVERY-LAYER-ASK-AT-PARENT-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, its commits, master, six paths, stat, NUL count and permission grep | MEASURED: git cat-file, rev-list, log, diff --name-only three-dot, diff --stat and tr over the shared clone at 2026-09-16T08:42Z | the-head |
| the pull request number, the pushes and the author's local gates | RELAYED: the author's slips on the bus at 2026-09-16T08:33:20Z and 08:39:24Z | the-head |
| the scout's GREEN on the work card | READ: relay_inbox row at 2026-09-16T08:01:04Z | the-head |
| CI at the head | NOT-READ | ci-as-last-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the six-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v3 appears.
