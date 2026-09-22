<!-- relay-audit: v1 kind=card -->
CARD-LAND-PRN-S140-1-v1

LANE: AG-5
fanout: personalized
Sixth CODE landing of S140 for the FOREMAN, and the smallest: the ask-option label rung — a parentless candidate is labelled by its own display name (parent → self → layer → entity-id), under CARD-ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-v2 and its AMENDMENT-1 (the floor-path pin). This is the first defect the ⑤/⑥ witness found on production after PR 573 and the repair for it. The author pushed the code at 2026-09-16T18:13:01Z and the report at 18:16:45Z; the §12.8 clock started at 18:13Z. The branch forks from CURRENT master, so step 2 should find no update owed and this may be a ONE-run landing. You did not write this code and you will not repair it.

PRECONDITION: the branch head is as fenced and on the forge, master is at the fenced anchor (or beyond it by docs/relay landings only), the lock ref is ABSENT (print the ls-remote line), and the diff carries no permission surface. If anything differs, YOUR reading wins, you print both, and you still land on YOUR measured green.

```evidence:raw-tokens
work card row (AG-4)    f0abe578-cec7-46ab-8a0d-dbef8929cfe8
amendment row           aeb70cda-2db9-42d5-b790-55393b53d50a
scout GREEN on work     a5f797ee-8c91-469b-99f2-24530dc55145
author slip row         SLIP_ROW
```

```evidence:the-head
branch         phase/ask-option-label-is-own-name-s140-1
head           b86932f6ed17873009184a55b0d4cf11c316cecd   the report commit over the code commit; two commits over the fork
code commit    f9823169ea07ff723703ff385d604bd5d20d9a2e   "a parentless option is labelled by its own name", 18:13:01Z
fork point     2f404888c42c7394566ed9803148390d8e1bab73   the current master (merge of PR 573); ahead by 2, behind by 0
pull request   PRN, opened by the author
diff           5 paths over master, three-dot, +401/-23: api/cwf/_lib/turn/stageClarify.ts (+37/-?; the self rung visible between parent and layer at the seam) · api/cwf/_lib/routing/askOnUnresolved.ts (comment clause) · api/cwf/__tests__/stageClarify.test.ts (+102) · docs/relay/ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-AG4-report.md (new, +255) · public/architecture/manifest.json (reseal); NUL bytes over the whole three-dot diff 0 (tr -cd, wc -c); no settings, hooks, guard, allowlist or migration path
author gates   RELAYED from the slip: AUTHOR_GATES
measured       2026-09-16T18:21Z shared-clone objects (lane-fetched origin), read by the Architect; the Architect holds no forge credential and cannot fetch
```

```evidence:ci-as-read
CI_AS_READ
```

## PREMISE

MEASURED: the head, code commit, fork point, master, the five paths, the NUL count and the permission grep in `the-head`, at 2026-09-16T18:21Z.
MEASURED: relay_inbox (execute_sql) — the scout's GREEN on the work card (18:01:21Z) and the author's slip, rows named in `raw-tokens`.
UNMEASURED: CI at this head by anyone but the author — `ci-as-read` is the author's read, RELAYED; ORDER 2 is where green is measured, by you.
MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 stands — no spend approval for a master push; no permission surface in the diff, so no separate authority approval arises.
MEASURED: ARCHITECT-RULING-S136-THE-MERGE-FORM-1 — the land script is the route.
SELF-INVALIDATION: this premise dies if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, or if a lock ref is present.

## ORDERS

ORDER 1 - PRINT THE LOCK STATE FIRST: `git ls-remote origin` filtered to the land script's lock ref name. Absent → continue. Present → STOP, print it, post it.

ORDER 2 - MEASURE CI AT THE FULL FORTY-HEX HEAD YOURSELF with `actions/runs?head_sha=<forty hex>`. A zero is read a SECOND time before it becomes a premise and you say so. Name every workflow, its `run_attempt` and its conclusion; eval-canary SKIPPED is named, never folded into green. If runs are still in progress, WAIT on them — name what you are waiting for and the last conclusion you saw.

ORDER 3 - LAND ON YOUR MEASURED GREEN: `ADF_LANE_ROLE=AG-5 npm run land -- PRN`. The PR exists — use it, open none. No-ff, never a squash. If step 2 finds no update owed, this is a one-run landing; if it syncs, wait on CI at the moved head and land on run 2. If ANY step reddens, STOP: that is the author's, by ORDER 4 — name the step and the skipped steps.

ORDER 4 - YOU EDIT NOTHING. If a gate refuses, STOP and print the refusal verbatim: WHICH step failed and which steps were SKIPPED (skipped is silent, not passing). The AUTHOR repairs its own branch and pushes; nobody re-runs to chase a green (S55-1).

ORDER 5 - AFTER THE MERGE, print master's new forty-hex head, the CI conclusion there as it arrives, and the Vercel production record for it (this one BUILDS — api/ paths — print state and readyState; a CANCELED here is a finding). Post ONE from_lane slip. The post-landing witness (the work card's ORDER 3: the near-miss factory sentence → three options reading their own names, labelSource self) is the Architect's to run on production READY, not yours.

## FALSIFIER

If a lock ref is present, STOP. If the diff touches a permission surface, STOP: that landing needs the owner's own named approval. If CI at the head is red on the latest attempt, STOP and name the step. If the land script's merge-tree rehearsal reports a conflict, STOP and print it.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/stageClarify.ts
- api/cwf/_lib/routing/askOnUnresolved.ts
- api/cwf/__tests__/stageClarify.test.ts
- docs/relay/ASK-OPTION-LABEL-IS-OWN-NAME-S140-1-AG4-report.md
- public/architecture/manifest.json
```

You write NOTHING. The merge commit is the land script's.

## DECISION RIGHTS

You choose the route on the self-test's measurement, as before. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, code commit, fork point, master, five paths, NUL count and permission grep | MEASURED: git log, merge-base, diff --stat three-dot, diff --name-only grep, tr/wc over the shared clone at 2026-09-16T18:21Z | the-head |
| the pull request number and the author's gates | RELAYED: the author's slip on the bus | the-head |
| the scout's GREEN on the work card | READ: relay_inbox row at 2026-09-16T18:01:21Z | the-head |
| CI at the head | NOT-READ | ci-as-read |
| no spend approval and no authority approval is required | MEASURED: OWNER-RULING-S136-CANARY-RETIRED-NOT-DESTROYED-1 and the five-path diff | the-head |
| the lock ref state now | NOT-READ | ORDER 1 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if the head moves by a hand other than the land script's own step 2, if the diff grows a permission-surface path, if a lock ref is present, or if a v2 appears.
