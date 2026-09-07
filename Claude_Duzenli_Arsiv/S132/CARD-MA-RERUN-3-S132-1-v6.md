<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v6 — v5 plus the scout's verdict: the stderr artifact must not publish entity surfaces; AMENDMENTS 1–6 verbatim; the runner is on master, so the run dispatches at THIS branch's ref
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report-v6.md
fanout: personalized

v5 was FAILED by the scout on one SCOPE sentence: "evidence and stderr downloaded OUTSIDE the tree; nothing printed that could carry a value". The landed runner uploads `ma-rerun-stderr.log` as a workflow artifact (retention 14 days), and S81's own record says those streams carry `[EntityResolve]` lines with verbatim entity surface strings from organic turns; under `--json` the stdout guard rebinds `console.log` to stderr for the whole import graph, so they land in that file — readable by every principal with repo read access for the retention period. "Outside the tree" contains the tree, not the artifact. v5's "no workflow change" clause forbade the one edit that closes it. v6 takes the scout's six amendments verbatim: the workflow is edited on THIS card's branch (the runner now exists on master, so `workflow_dispatch --ref <branch>` resolves and runs the branch's file — measured by you at B.1, STOP if refused), the analyser is invoked with its real signature, the population rule is stated as the code computes it, the wait fence compares BYTES, the run-log grep is named decoration, and baseline-delta is separated from S82-delta. Landing (workflow fix + artefact + report) follows by Architect landing card + owner approval.

## PREMISE
- MEASURED: 2026-09-07T10:48:08Z — your v4 report: workflow committed on `phase/ma-rerun-3-s132-1-v4`; both secret names present; five instrument blobs equal to v4's fence; `npm run env:presence` both UNSET; dispatch refused with "not found on the default branch"; the registry lists eight workflows without `ma-rerun.yml`.
- MEASURED: 2026-09-07T12:04:52Z — AG-5: PR 514 LANDED; `.github/workflows/ma-rerun.yml` in the workflow registry (nine workflows); the owner's approval OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 executed.
- MEASURED: 2026-09-07T12:21:37Z — scout row `ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report`: VERDICT FAIL on the stderr-artifact sentence; origin/master had moved again (recorded by the scout, not fenced — master is never a stop for this card); five instrument blobs equal; `origin/master:.github/workflows/ma-rerun.yml` blob equal to v4's (in the `wait` fence); token has `repo` and `workflow` scopes, the v4 404 was a lookup failure; `analyseClarificationRun.ts` takes ONE positional argument and has no `--all`; `chooseCutoff(evaluations, hourlyCutoffs(2026, 6, 25), BASELINE.armoredFrames)` at `:486` pins the sweep to the 2026-07-25 UTC day and calibrates T by minimising |count(T) − 2534|; the analyser prints four delta-pp lines against BASELINE at `:523-526`; the run-log `readIntegrity` grep can match only the literal key on pretty-printed JSON.
- MEASURED: 2026-09-07T09:06Z — `router.askOnUnresolved` published value 1 (valve OPEN): no like-for-like with S82.
- UNMEASURED: when the landing completes; the master after it; whether the parity role holds SELECT on every table the lens reads; the run's duration in CI.
- ON-DISAGREEMENT: this card is RELEASED only by a `RELEASE-MA-RERUN-3-S132-1` row naming v6 (posted after the scout's review) — absent, stop at A.1; v5 is VOID. After release: `git fetch origin`; the three `wait` lines must all be true (registry lists the runner; blob at origin/master returns; that blob EQUALS the fence value) — if any is false: STOP, print all three, post NO report. If `gh workflow run ma-rerun.yml --ref phase/ma-rerun-3-s132-1-v6` is refused with a default-branch reason even though the runner is on master → STOP, quote the refusal unanchored, post the report (the landing of the workflow fix then precedes the run, by a further Architect card). The five instrument blobs of v4 must still equal v4's fence, else STOP. Workflow permission error for the parity role → STOP after B.2, quote the error unanchored. `docs/replay/` holding a third MA artefact → STOP and report its name.
- DECAYS when any of v4's five instrument blobs changes on master, or when a file lands under `docs/replay/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the five instrument blobs (v4's fence, unchanged) | MEASURED: your v4 report `blobs` fence, each equal to the card fence | instrument |
| the landing's precondition, by registry AND by blob bytes | MEASURED: AG-5 registry line 12:04Z; scout blob read 12:21Z equal to v4's branch blob | wait |
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
$ git rev-parse origin/master:.github/workflows/ma-rerun.yml   # must equal cc78579791d8af66332fe63c8b8ee8df7fb5fa5a, the blob v4 pushed — existence and a registry listing prove nothing about bytes.
cc78579791d8af66332fe63c8b8ee8df7fb5fa5a
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: on a new branch phase/ma-rerun-3-s132-1-v6 cut from the master you fetch — ONE edited file .github/workflows/ma-rerun.yml (AMENDMENT 1 only), TWO new files docs/replay/ma-gate-rerun3-S132-v1.md and the report at the header path; nothing else
- AMENDMENT 1 (replaces v5's "no workflow change" and the stderr clause): ONE workflow change is in scope and is a precondition of the run: ma-rerun.yml either drops ma-rerun-stderr.log from the upload or filters it to the [Fence], [ClarificationLens] and [Clarify] prefixes before uploading, because S81 records that these streams carry [EntityResolve] lines with verbatim entity surface strings from organic turns, and an uploaded artifact is readable by every principal with repo read access for its whole retention period, which "outside the tree" does not contain.
- one pull request, report+artefact, NOT merged by you; lands by Architect landing card + owner's named approval
- the run: gh workflow run ma-rerun.yml --ref phase/ma-rerun-3-s132-1-v6 (the runner exists on master so the trigger resolves; the branch's file — with AMENDMENT 1 applied — is what runs) with input until = the dispatch instant; the evidence artifact downloaded OUTSIDE the tree; the filtered stderr (if uploaded) contains only the three prefixes; no secret value anywhere
- the lane: never sets, reads, echoes or hunts a secret; analyses with no Supabase variable in its environment, proven by env:presence
- database: reads by the CI job under the parity role only; zero governed writes, zero messages rows (C1 LAW), zero param publish; no model call
- AMENDMENT 6 (replaces "no delta sentence against S82's figures anywhere"): no RUN-TO-RUN delta against S82's figures anywhere; the analyser's four delta-pp lines against the 2026-07-25 BASELINE at analyseClarificationRun.ts:523-526 are retained verbatim, because a baseline delta and an S82 delta are different facts and only the second is forbidden.
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report-v6, posted once
```

## ORDER A — WAIT BY NAME, THEN READ
1. Read your box by `created_at`; earlier rows first. Without the `RELEASE-MA-RERUN-3-S132-1` row naming v6, stop here; v5 is VOID.
2. `git fetch origin`; the three `wait` lines (registry, blob exists, blob EQUALS the fence value); all true or STOP (no report). Record `git rev-parse origin/master`. The five `instrument` blobs equal the fence, else STOP.
3. `gh secret list` — both names present (names only), else STOP.

## ORDER B — THE WORKFLOW FIX, THEN THE RUN
0. Branch `phase/ma-rerun-3-s132-1-v6` from the fetched master. Apply AMENDMENT 1 to `.github/workflows/ma-rerun.yml`: prefer DROPPING the stderr upload entirely; if the seam-count cross-check (ORDER C.2) needs `[Clarify]` lines, upload a FILTERED file produced by `grep -E '^\[(Fence|ClarificationLens|Clarify)\]'` and never the raw stream. Print the diff. Commit and push. Read the repository's workflow-security hook output and keep the env-bound input form.
1. `gh workflow run ma-rerun.yml --ref phase/ma-rerun-3-s132-1-v6 -f until=<dispatch instant, ISO to the second>`; find the run; `gh run watch <id>`; print conclusion, duration, URL; confirm from the run's page that the workflow file executed is the branch's (the job step list shows no raw stderr upload). Permission error → ON-DISAGREEMENT; default-branch refusal → ON-DISAGREEMENT.
2. `gh run download <id>` OUTSIDE the tree; print byte count and runId. AMENDMENT 5: the run-log summary step is not evidence: the evidence JSON is pretty-printed with a two-space indent, so its readIntegrity grep can match only the literal "readIntegrity": { and never a figure — quote readIntegrity from the analyser output and treat that run-log line as decoration.

## ORDER C — THE ANALYSIS (v4's ORDER C, unchanged)
1. `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` → both UNSET, printed; AMENDMENT 2: then node --import tsx scripts/analyseClarificationRun.ts <path to the downloaded evidence.json>, with NO --all: that analyser has no flag parser and takes exactly one positional argument (process.argv[2], usage "analyseClarificationRun.ts <evidence.json>"), so --all is either consumed AS the path and fails to open or is silently ignored — --all belongs to runClarificationLens.ts, which the workflow already passes it to.
2. Before any rate: `readIntegrity`, both `population` counts, both `truncated` flags, `armoredFrames`, guardian table with outcomes (`ASK` possible), `vocabSource` counts; seam count cross-checked against the FILTERED stderr's `[Clarify]` lines if that file was uploaded, else stated as not cross-checked.
3. `byOutcome` whole for the whole corpus and for the like-for-like population by S82's TIME rule (count and `d` vs 2534 as CONTROL only); four labelled rates per population: `(HIGH+ALT_D)/N`, `(HIGH+ALT_D+ASK)/N`, HIGH-only, entity-unresolved share under both — copied from the analyser; old numerator computed from `byOutcome` if the analyser prints only the new one, and said so.
4. No RUN-TO-RUN delta against S82 (AMENDMENT 6; the analyser's BASELINE delta-pp lines stay verbatim); state once why (different numerator, dark valve, unrecorded vocabSource, probes without metricsSurface, pre-guard credential path; event-based expiry tripped; this run is the fresh baseline under the parity role).
5. Any degraded/unknown non-zero, guardian probe not blocked, or `truncated` true → caveat on every number, NOT VALID, no re-run (S55-1).

## ORDER D — THE ARTEFACT AND THE REPORT (v4's ORDER D, unchanged)
1. `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 shape (floor = the master you fetched, recorded; instrument blobs from the fence; runner = workflow run id and URL; input by runId·bytes·window·populations·truncated; §0 verdict; §1 readIntegrity; §1.1 guardian; byOutcome; four-rate tables both populations; vocabSource counts; "why no delta against S82"; EVENT-BASED expiry naming the three defining files).
2. Commit artefact + report on `phase/ma-rerun-3-s132-1-v6` (the workflow fix is already on it); push; open the pull request; do NOT merge; `auditText` locally `violations: 0` before push.
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report-v6`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any secret value appears anywhere; wrong if the lane's environment carried a Supabase variable during analysis; wrong if the run was dispatched before the two `wait` lines were true; wrong if a rate is quoted without readIntegrity and the guardian table above it; AMENDMENT 3: wrong if the cutoff T is re-picked after a rate is seen, or if the sweep boundaries or the 2534 target are changed from analyseClarificationRun.ts:486 (hourlyCutoffs(2026, 6, 25), BASELINE.armoredFrames); the selector stays temporal (row.createdAt <= T) and the count stays the control, and the pre-registered rule calibrating T by minimising |count(T) - 2534| IS that rule, not a breach of it; wrong if a run-to-run delta against S82 appears; wrong if the evidence JSON enters the tree; wrong if any raw stderr stream is uploaded as an artifact; wrong if the workflow edit touches anything but the stderr upload step; wrong if the run executed master's workflow file rather than the branch's; wrong if a re-run was performed to turn a caveat green; wrong if the card acted without the RELEASE row naming v6.

## SHARED SURFACES
CI: one workflow run under the parity role at the branch ref. Database: reads only. cwf_yaprak: one edited workflow and two new files on one branch; landing by Architect card + owner approval. Bus: one row. Secrets: read by the workflow, never listed with values, never modified.

## DECISION RIGHTS
None. `cwf-sota-definition-v1_6` is the Architect's, from your artefact. A missing grant is reported for the Operator, never arranged by you.

BODIES: ADVERSARY-REVIEW-MA-RERUN-3-v5-S132-1-scout-report (VERDICT FAIL, six amendments) · docs/replay/ma-gate-rerun-S81-v1.md (the stderr sensitivity record) · OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 · CARD-MA-RERUN-3-S132-1-v4 and its report (F-S132-WORKFLOW-DISPATCH-NEEDS-DEFAULT-BRANCH-1) · CARD-LAND-MA-RERUN-RUNNER-S132-1-v1 · S102-YASA-2 (wait by name) · ADR-002 · C1 LAW · S37-1 · S55-1 · S63-1 · TOTAL-45 · cwf-sota-definition-v1_5 §8 and §10.1.

```deliverables
RELEASE row (v6) present; the three wait lines true incl. blob equality; fetched master recorded; five blobs equal to the fence; both secret names present
workflow fix on the branch: raw stderr never uploaded; diff printed
one completed run at --ref phase/ma-rerun-3-s132-1-v6, branch file executed: id, URL, conclusion, duration; artifact downloaded outside the tree, byte count and runId
env:presence proof: both Supabase names UNSET during analysis
readIntegrity, populations, truncated, armoredFrames, guardian with outcomes, vocabSource counts — before any rate
byOutcome whole and four labelled rates, both populations; like-for-like count and d as control
docs/replay/ma-gate-rerun3-S132-v1.md, fresh baseline, event-based expiry, no S82 delta
docs/relay/MA-RERUN-3-S132-1-AG4-report-v6.md on phase/ma-rerun-3-s132-1-v6, auditText violations: 0, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report-v6, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v6 ends here.
