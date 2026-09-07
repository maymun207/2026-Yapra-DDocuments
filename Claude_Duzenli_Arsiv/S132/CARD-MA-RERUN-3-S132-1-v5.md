<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v5 — the run: dispatch the landed runner, analyse the artifact, write the fresh baseline; v4's ORDERS B.2 → D, unchanged, with the landing as the named precondition
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report-v5.md
fanout: personalized

v4 wrote and pushed `.github/workflows/ma-rerun.yml` and stopped at ORDER B.2 because a `workflow_dispatch` runner is resolvable only from the default branch (F-S132-WORKFLOW-DISPATCH-NEEDS-DEFAULT-BRANCH-1 — your finding, and it is structural: every future CI-side measurement will land first and run second). The owner approved the landing (OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1); AG-5 lands it under CARD-LAND-MA-RERUN-RUNNER-S132-1-v1. This card is v4's ORDERS B.2 through D verbatim in intent, with one precondition you WAIT for by name (S102-YASA-2): the workflow present at origin/master. Your v4 finding 3 (the injection pattern in the card's literal workflow text) is accepted; the committed env-bound form is the one that lands.

## PREMISE
- MEASURED: 2026-09-07T10:48:08Z — your v4 report: workflow committed on `phase/ma-rerun-3-s132-1-v4`; both secret names present; five instrument blobs equal to v4's fence; `npm run env:presence` both UNSET; dispatch refused with "not found on the default branch"; the registry lists eight workflows without `ma-rerun.yml`.
- MEASURED: 2026-09-07T11:53Z — the owner's approval to land, recorded in OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1.
- MEASURED: 2026-09-07T09:06Z — `router.askOnUnresolved` published value 1 (valve OPEN): no like-for-like with S82.
- UNMEASURED: when the landing completes; the master after it; whether the parity role holds SELECT on every table the lens reads; the run's duration in CI.
- ON-DISAGREEMENT: this card is RELEASED only by a `RELEASE-MA-RERUN-3-S132-1` row naming v5 (posted after the scout's review) — absent, stop at A.1. After release: `git fetch origin`; `git rev-parse origin/master:.github/workflows/ma-rerun.yml` must return a blob (the runner is on master) AND `gh api .../actions/workflows` must list it — if either is false, the landing has not happened: STOP, print both, post NO report, re-read your box on the next tick (this is the named wait). The five instrument blobs of v4 must still equal v4's fence, else STOP. Workflow permission error for the parity role → STOP after B.2, quote the error unanchored. `docs/replay/` holding a third MA artefact → STOP and report its name.
- DECAYS when any of v4's five instrument blobs changes on master, or when a file lands under `docs/replay/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the five instrument blobs (v4's fence, unchanged) | MEASURED: your v4 report `blobs` fence, each equal to the card fence | instrument |
| the landing's precondition line you wait for | MEASURED: your v4 `dispatch` fence — the registry without the runner is the BEFORE state; the AFTER state is the same command listing it | wait |
| the S82 floor | MEASURED: git show origin/master:docs/replay/ma-gate-rerun2-S82-v1.md, the Floor line | s82-floor |
| the master you fetch after release | NOT-READ | recorded in ORDER A, never a fence |
| readIntegrity, guardian, both numerators, vocabSource | NOT-READ | produced by the run and ORDER C |

```evidence:instrument
a385c73fa249d9fe36596e90bbe23a59b202fe4b api/cwf/_lib/replay/clarificationLens.ts
ca6286a0d7a4c2975cf1e1c0ce4c65838af7f158 scripts/runClarificationLens.ts
08c77201ca0b43b4d93ca8cb2b76209e075acd3a scripts/analyseClarificationRun.ts
89f96e3ba550b2fefe668ce6dd92a318b5683c87 api/cwf/_lib/persistence/client.ts
a2dd64cce354217bf574cf51504072f0360abacf .github/workflows/vector-live-proof.yml
```

```evidence:wait
$ gh api repos/maymun207/cwf_yaprak/actions/workflows --jq '.workflows[].path'   # must contain
.github/workflows/ma-rerun.yml
$ git rev-parse origin/master:.github/workflows/ma-rerun.yml                       # must return a blob id
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: TWO new files on a new branch phase/ma-rerun-3-s132-1-v5 cut from the master you fetch — docs/replay/ma-gate-rerun3-S132-v1.md and the report at the header path; no existing file edited; no workflow change (the runner is on master as landed)
- one pull request, report+artefact, NOT merged by you; lands by Architect landing card + owner's named approval
- the run: gh workflow run ma-rerun.yml --ref master (the runner now lives there) with input until = the dispatch instant; evidence and stderr downloaded OUTSIDE the tree; nothing printed that could carry a value
- the lane: never sets, reads, echoes or hunts a secret; analyses with no Supabase variable in its environment, proven by env:presence
- database: reads by the CI job under the parity role only; zero governed writes, zero messages rows (C1 LAW), zero param publish; no model call
- no delta sentence against S82's figures anywhere
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report-v5, posted once
```

## ORDER A — WAIT BY NAME, THEN READ
1. Read your box by `created_at`; earlier rows first. Without the `RELEASE-MA-RERUN-3-S132-1` row naming v5, stop here.
2. `git fetch origin`; the two `wait` lines; both true or STOP (no report). Record `git rev-parse origin/master`. The five `instrument` blobs equal the fence, else STOP.
3. `gh secret list` — both names present (names only), else STOP.

## ORDER B — THE RUN
1. `gh workflow run ma-rerun.yml --ref master -f until=<dispatch instant, ISO to the second>`; find the run; `gh run watch <id>`; print conclusion, duration, URL. Permission error → ON-DISAGREEMENT.
2. `gh run download <id>` OUTSIDE the tree; print byte count and runId.

## ORDER C — THE ANALYSIS (v4's ORDER C, unchanged)
1. `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` → both UNSET, printed; then `scripts/analyseClarificationRun.ts --all` over the downloaded evidence.
2. Before any rate: `readIntegrity`, both `population` counts, both `truncated` flags, `armoredFrames`, guardian table with outcomes (`ASK` possible), `vocabSource` counts; seam count cross-checked against the stderr log's `[Clarify]` lines.
3. `byOutcome` whole for the whole corpus and for the like-for-like population by S82's TIME rule (count and `d` vs 2534 as CONTROL only); four labelled rates per population: `(HIGH+ALT_D)/N`, `(HIGH+ALT_D+ASK)/N`, HIGH-only, entity-unresolved share under both — copied from the analyser; old numerator computed from `byOutcome` if the analyser prints only the new one, and said so.
4. No delta against S82; state once why (different numerator, dark valve, unrecorded vocabSource, probes without metricsSurface, pre-guard credential path; event-based expiry tripped; this run is the fresh baseline under the parity role).
5. Any degraded/unknown non-zero, guardian probe not blocked, or `truncated` true → caveat on every number, NOT VALID, no re-run (S55-1).

## ORDER D — THE ARTEFACT AND THE REPORT (v4's ORDER D, unchanged)
1. `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 shape (floor = the master you fetched, recorded; instrument blobs from the fence; runner = workflow run id and URL; input by runId·bytes·window·populations·truncated; §0 verdict; §1 readIntegrity; §1.1 guardian; byOutcome; four-rate tables both populations; vocabSource counts; "why no delta against S82"; EVENT-BASED expiry naming the three defining files).
2. Commit artefact + report on `phase/ma-rerun-3-s132-1-v5`; push; open the pull request; do NOT merge; `auditText` locally `violations: 0` before push.
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report-v5`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any secret value appears anywhere; wrong if the lane's environment carried a Supabase variable during analysis; wrong if the run was dispatched before the two `wait` lines were true; wrong if a rate is quoted without readIntegrity and the guardian table above it; wrong if the like-for-like population is matched by size; wrong if a delta against S82 appears; wrong if the evidence JSON enters the tree; wrong if the workflow on master is edited; wrong if a re-run was performed to turn a caveat green; wrong if the card acted without the RELEASE row.

## SHARED SURFACES
CI: one workflow run under the parity role. Database: reads only. cwf_yaprak: two new files on one branch. Bus: one row. Secrets: read by the workflow, never listed with values, never modified.

## DECISION RIGHTS
None. `cwf-sota-definition-v1_6` is the Architect's, from your artefact. A missing grant is reported for the Operator, never arranged by you.

BODIES: OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 · CARD-MA-RERUN-3-S132-1-v4 and its report (F-S132-WORKFLOW-DISPATCH-NEEDS-DEFAULT-BRANCH-1) · CARD-LAND-MA-RERUN-RUNNER-S132-1-v1 · S102-YASA-2 (wait by name) · ADR-002 · C1 LAW · S37-1 · S55-1 · S63-1 · TOTAL-45 · cwf-sota-definition-v1_5 §8 and §10.1.

```deliverables
RELEASE row present; the two wait lines true; fetched master recorded; five blobs equal to the fence; both secret names present
one completed run at --ref master: id, URL, conclusion, duration; artifact downloaded outside the tree, byte count and runId
env:presence proof: both Supabase names UNSET during analysis
readIntegrity, populations, truncated, armoredFrames, guardian with outcomes, vocabSource counts — before any rate
byOutcome whole and four labelled rates, both populations; like-for-like count and d as control
docs/replay/ma-gate-rerun3-S132-v1.md, fresh baseline, event-based expiry, no S82 delta
docs/relay/MA-RERUN-3-S132-1-AG4-report-v5.md on phase/ma-rerun-3-s132-1-v5, auditText violations: 0, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report-v5, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v5 ends here.
