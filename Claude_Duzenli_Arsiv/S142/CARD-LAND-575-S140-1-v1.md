<!-- relay-audit: v1 kind=card -->
CARD-LAND-575-S140-1-v1

LANE: AG-5
fanout: personalized
Seventh CODE landing of S140 for the FOREMAN: the cross-turn carrier (P1-4) — the previous turn's resolution scopes this turn's ambiguity, under CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 and its AMENDMENT-1 (caller-side read, ⑥ in-scope set carried, gate on the rendered ask, shown-options match). This closes the last open item on the owner's morning scorecard (the second ask on the reply turn). The author pushed the code at 2026-09-16T19:40:32Z; the §12.8 clock started there. The branch forks from CURRENT master, so step 2 should find no update owed and this may be a ONE-run landing. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    77f437e4-5f55-4f77-9a4d-4642d8bc0419
amendment row           3d01c9d2-357e-426d-8847-6cd0c8895d0f
scout GREEN on work     23ad53db-e206-406f-ad85-e71c43145f8a
author slip row         3eb36ef0-6dc1-46a1-9bd0-8574562a3703
```

```evidence:the-head
branch         phase/carry-last-resolution-into-clarify-s140-1
head           0992c64eb58abaad6599a3379a0b635b056c7649   the report commit over the code commit; two commits over the fork
code commit    c777909830d7c8f9421daf3d8bbc2c6b9376e412   "the previous turn's resolution scopes this turn's ambiguity", 19:40:32Z
fork point     4bec094ea1d14289eaf4783677d304385e4e4bc5   the current master (merge of PR 574); ahead by 2, behind by 0
pull request   575, opened by the author
diff           12 paths over master, three-dot, +1149/-38: api/cwf/_lib/turn/stageClarify.ts (+317) · api/cwf/_lib/turn/memoryDistill.ts (+10) · api/cwf/_lib/turn/types.ts (+33; two stamps — the author's own finding F-S140-CARRY-TYPES-SCOPE-EXCURSION-1, outside the card's fence) · api/cwf/_lib/persistence/index.ts · api/cwf/_lib/persistence/repositories/EpisodesRepository.ts (+27) · api/cwf/_lib/replay/clarificationLens.ts (+40) · api/cwf/__tests__/carryLastResolution.test.ts (new, +421) · three one-line fixture updates in memoryProcedure / memoryRetrieve / memorySliceWiring tests · docs/relay/CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-AG4-report.md (new, +309) · public/architecture/manifest.json (reseal); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip: full suite 10780 passed / 0 failed; failing-first fork 12 red (test (a) IS the second ask verbatim), head 13 green; pins green; build + reseal in the same commit; check:tenant-zero ZERO. The author names four findings: F-S140-CARRY-TYPES-SCOPE-EXCURSION-1 (types.ts stamps outside the fence), F-S140-CARRY-CTX-NO-CONVERSATION-THROW-1 (its own throw on a turn with no conversation, caught by the full run, fixed and pinned), F-S140-CARRY-ONE-ASK-PER-EPISODE-1 and F-S140-CARRY-OPTION-NEEDS-A-REF-1 (bounds)
measured       2026-09-16T20:09Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
read by the author at 20:02Z, RELAYED — attempt 1 of each run at the head:
Build and Test   success — changes · build (24.x) · rule26 success; eval-canary SKIPPED (named, never folded)
report-schema    success
Relay corpus     success
not yet read by anyone but the author; ORDER 2 is where YOU read it
```

## PREMISE

MEASURED: the head, code commit, fork point, master, the paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T20:09Z.
MEASURED: relay_inbox (execute_sql, 20:08Z) — the scout's GREEN on the work card (19:07:50Z) and the author's slip (20:04:43Z), rows named in `raw-tokens`.
UNMEASURED: CI at this head by anyone but the author — `ci-as-read` is the author's read, RELAYED; ORDER 2 is where green is measured, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- 575`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 5: the factory + kiln sentence → two-line ask; then the line's name alone → NO second ask, one survivor, stops tool called, stage 03 carried.peers naming the factory) is the Architect's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/turn/memoryDistill.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/_lib/persistence/index.ts
- api/cwf/_lib/persistence/repositories/EpisodesRepository.ts
- api/cwf/_lib/replay/clarificationLens.ts
- api/cwf/__tests__/carryLastResolution.test.ts (new)
- api/cwf/__tests__/memoryProcedure.test.ts · memoryRetrieve.test.ts · memorySliceWiring.test.ts (one-line fixture updates)
- docs/relay/CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, code commit, fork point, master, five paths, NUL count and permission grep | MEASURED: git log, merge-base, diff --stat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-16T20:09Z | the-head |
| the pull request number and the author's gates | RELAYED: the author's slip on the bus | the-head |
| the scout's GREEN on the work card | READ: relay_inbox row at 2026-09-16T19:07:50Z | the-head |
| CI at the head | NOT-READ | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
