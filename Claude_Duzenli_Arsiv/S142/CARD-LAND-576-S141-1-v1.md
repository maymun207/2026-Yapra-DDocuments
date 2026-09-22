<!-- relay-audit: v1 kind=card -->
CARD-LAND-576-S141-1-v1

LANE: AG-5
fanout: personalized
First CODE landing of S141 for the FOREMAN: the matched option becomes its own ref when the frame has none, under CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1 and its AMENDMENT-1 (scout F1: a ledger-and-memory gain, never a tool-argument gain — the tree says so in its own words since the third commit). The author pushed the code at 2026-09-17T03:42:23Z; CI at the certified head completed green at 04:05:53Z and the §12.8 clock runs from there. The branch forks from CURRENT master, so step 2 should find no update owed and this is a ONE-run landing; if step 2 syncs, wait on CI at the moved head and land on run 2. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    a5c6d6f1-78c0-40c5-8712-b8d2a709cbbf
amendment row           a55390ef-e7ff-4ccb-8b3f-e0d04609ad91
scout GREEN on work     b4d8fcaf-cb4e-42e9-acd6-e658bc515761
scout CI read, complete 74f48ea2-d6f3-4ee3-9174-d60c1d059eb4   (rows 1-2: 55807765…, 9d8d7d1e… — in progress, then cancelled-by-supersede at the previous head)
author slip row         NONE at cut — the landing does not wait for it (bootstrap v142 ③-6)
```

```evidence:the-head
branch         phase/carried-option-injects-its-ref-s141-1
head           55166efb1f29a1bfed2242cbbbc73ba62340bce0   the AMENDMENT-1 wording commit over the report over the code; three commits over the fork
report commit  bb4c53a4438c2a4780b2e620bf24dc4502afe879   03:44:56Z — its Build and Test run was CANCELLED by the superseding push (neither pass nor fail)
code commit    43d8761193976e7d39a57bb8a3fc329c99a1db49   "the matched option becomes its own ref when the frame has none", 03:42:23Z; the code is byte-identical at the head
fork point     47402e33faec80c45254668d917cb6f58625a916   the current master (merge of PR 575); ahead by 3, behind by 0
pull request   576, opened by the author; headRefOid = the head above; mergeable MERGEABLE; base master (the scout's gh read at ~04:07Z)
diff           5 paths over master, three-dot, +471/-34: api/cwf/_lib/turn/stageClarify.ts (+89/-17) · api/cwf/_lib/turn/types.ts (+7) · api/cwf/__tests__/carryLastResolution.test.ts (+113/-5; the five minus lines are the exact-equality carried pins gaining injectedRef: null) · docs/relay/CARRIED-OPTION-INJECTS-ITS-REF-S141-1-AG4-report.md (new, +250) · public/architecture/manifest.json (reseal, 24 seal lines); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path (grep over the name list: empty)
measured       2026-09-17T03:59:14Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch; the scout's wire read at ~04:07Z agrees on head and master
```

```evidence:ci-as-read
read by the SCOUT at ~04:07Z (row named in raw-tokens), the first independent read — attempt 1 of each run at the head:
Build and Test   completed SUCCESS 04:05:53Z — changes 5/5 · build (24.x) 13/13 (RULE-40 no-NUL · migration version-key · Tenant-zero · Build with doc-drift · Run tests) · rule26 10/10; eval-canary 0 steps SKIPPED (named, never folded)
report-schema    completed SUCCESS 03:49:20Z
Relay corpus     completed SUCCESS 03:49:23Z
ORDER 2 is where YOU read it again, at the same forty hex
```

## PREMISE

MEASURED: the head, code commit, report commit, fork point, master, the five paths, the NUL count and the permission grep in `the-head`, over the shared clone at 2026-09-17T03:59:14Z.
MEASURED: relay_inbox (execute_sql, 04:08:10Z) — the scout's GREEN on the work card (03:23:58Z), the scout's three CI rows (03:49:44Z, 03:52:16Z, 04:07:56Z) and the pull request number, rows named in `raw-tokens`.
MEASURED: CI at the head by the scout, `ci-as-read`; ORDER 2 is where green is measured again, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 576`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 5: the factory + kiln sentence → two-line ask; then the line's name alone → NO second ask, stage 03 `carried.optionRefs` = [label] with `injectedRef` = label when the router folds the phrase) is the Architect's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/__tests__/carryLastResolution.test.ts
- docs/relay/CARRIED-OPTION-INJECTS-ITS-REF-S141-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, code commit, report commit, fork point, master, five paths, NUL count and permission grep | MEASURED: git log, merge-base, diff --numstat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-17T03:59:14Z | the-head |
| the pull request number, headRefOid and mergeable state | MEASURED: the scout's gh pr list at ~04:07Z, row in raw-tokens | the-head |
| the scout's GREEN on the work card | MEASURED: relay_inbox row at 2026-09-17T03:23:58Z, execute_sql 03:25Z | the-head |
| CI at the head | MEASURED: the scout's completion row at 04:07:56Z — attempt 1, three runs SUCCESS, eval-canary SKIPPED | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
