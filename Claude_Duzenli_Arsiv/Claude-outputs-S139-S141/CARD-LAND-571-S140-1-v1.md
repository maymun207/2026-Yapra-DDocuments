<!-- relay-audit: v1 kind=card -->
CARD-LAND-571-S140-1-v1

LANE: AG-5
fanout: personalized
Third CODE landing of S140 for the FOREMAN. The author pushed at 2026-09-16T07:56:15Z (slip 07:57:06Z); the §12.8 clock started there. WHAT IT IS: the owner's K1 ruling (OWNER-RULING-S140-K1-ORDER-CELL-HINT-1) — the ORDER cell joins the metric-hint augmentation in `routing/deriveCategories.ts`, one line plus its comment and tests, with the reseal in the same commit; the report commit sits on top. The scout reviewed the work card GREEN (row named in `the-head`). The branch forks from CURRENT master, so the land script's step 2 should find no update owed and this may be a ONE-run landing; if master moves under it by a docs/relay landing of yours, step 2 syncs and you land on run 2 — that sync is not a decay. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at or beyond the fenced anchor by docs/relay landings only, the lock ref is ABSENT (print the ls-remote line — after this morning's leak, this line is not optional), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
scout verdict row    b655d29f-8952-4524-87b8-8da046f1a9c0
```

```evidence:the-head
branch         phase/order-cell-metric-hint-s140-1
head           7e6dc2f6a563955345b98c6381c251b86b5c50f5   the report commit, authored 2026-09-16T07:56:15Z, over the code commit; two commits over the fork
fork point     7da8491a8dd3d348316d3aa93f27c08f24e00279   the current master (merge of PR 570); ahead by 2, behind by 0
pull request   571, opened by the author
scout verdict  the verdict row on the work card CARD-ORDER-CELL-METRIC-HINT-S140-1-v1 (its id in `raw-tokens`), GREEN at 2026-09-16T07:26:52Z
diff           4 paths over master, three-dot: api/cwf/_lib/routing/deriveCategories.ts · api/cwf/_lib/routing/__tests__/deriveCategories.test.ts · docs/relay/ORDER-CELL-METRIC-HINT-S140-1-AG4-report.md (new, +145) · public/architecture/manifest.json (reseal); the landed line reads HINT_AUGMENTED_OBJECTS = new Set(['LINE', 'ZONE', 'ORDER']); NUL bytes over the whole three-dot diff 0; no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip of 07:57:06Z, local: typecheck:api; vitest 730 files 10736 passed; build after reseal (Architecture Map digest equals the gate's); check:tenant-zero [OK] ZERO hits 2211 files; failing-first on the fork 1 failed / 27 passed, at the head 28 passed
measured       2026-09-16T08:00Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-last-read
read by        the author only, at 07:58Z: Build and Test queued, report-schema and Relay corpus in progress — RELAYED, not a verdict; the scout is ordered in the review of this card to read it and name every workflow and conclusion, in-progress named as in-progress
```

## PREMISE

MEASURED: the head, fork point, master, the four paths, the landed line, the NUL count and the permission grep in `the-head`, at 2026-09-16T08:00Z.
MEASURED: the scout's GREEN on the work card, on the bus at 07:26:52Z.
UNMEASURED: CI at this head. Nobody but the author has read it and it was queued when read; this card does not call the head green. ORDER 2 is where green is measured, by you, and you WAIT for it.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — do not land on a partial set, and do not call the wait a blocker: name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 571`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — so print state and readyState; a CANCELED here would be a finding, unlike the docs-only landings). Post ONE from_lane slip.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/routing/__tests__/deriveCategories.test.ts
- docs/relay/ORDER-CELL-METRIC-HINT-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, fork point, master, four paths, the landed line, NUL count and permission grep | MEASURED: git cat-file, merge-base, rev-list, diff --name-only three-dot, show --stat, grep and tr over the shared clone at 2026-09-16T08:00Z | the-head |
| the pull request number and the push instant | READ: the author's slip on the bus at 2026-09-16T07:57:06Z and the commit's own timestamp | the-head |
| the author's local gates | RELAYED: the author's slip at 2026-09-16T07:57:06Z | the-head |
| the scout's GREEN on the work card | READ: relay_inbox row at 2026-09-16T07:26:52Z | the-head |
| CI at the head | NOT-READ | ci-as-last-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the four-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
