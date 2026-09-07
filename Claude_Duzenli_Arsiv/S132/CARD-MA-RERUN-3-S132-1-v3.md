<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v3 — run the clarification-gate replay lens in the repository's own CI with the read-only parity key, never in a lane's shell; analyse the artifact without holding a secret
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report-v3.md
fanout: personalized

v1 was blocked by `guard-secrets` (no lawful credential path in a lane's shell); v2 was WITHDRAWN before action because it presupposed the service-role key in a producer window — an ADR-002 breach the owner refused. The owner then classified a `workflow_dispatch` measurement runner as CWF measurement work, outside the ADF freeze (OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1, `ruling` fence). This v3 is that runner. The credential never touches a lane: the workflow maps the repository's READ-ONLY parity key into the persistence client exactly as `vector-live-proof.yml` already does at master (lines 160–167: `SUPABASE_URL` from secrets, `SUPABASE_SECRET_KEY: ${{ secrets.SUPABASE_PARITY_KEY }}`), runs the lens, and uploads the evidence JSON as a workflow artifact; you then download the artifact and run the analyser locally with no environment variable set. No lane holds a secret at any step; if the workflow needs a secret that is not in the repository store, you STOP and report its NAME — the owner or the Operator places it, never you. Everything else this card's earlier versions said still holds: C1 LAW, no model call, no delta claim against S82, both numerators printed, the evidence JSON never enters the tree (the artifact store is not the tree).

## PREMISE
- MEASURED: 2026-09-07T09:39Z over the bridge, `git show origin/master:.github/workflows/vector-live-proof.yml` — a `workflow_dispatch` job already runs a live Supabase READ in CI with `SUPABASE_URL` and `SUPABASE_PARITY_KEY` from repository secrets, mapping the parity key into `SUPABASE_SECRET_KEY` for the persistence client; `docs/relay/PHASE-QDRANT-ENGINE-1-report.md:211` names the parity key read-only. No workflow at master uses `actions/upload-artifact` yet.
- MEASURED: 2026-09-07T09:06Z, Supabase `domain_rules` — `router.askOnUnresolved` published value 1: the valve is OPEN, so `byOutcome.ASK` is expected non-zero and no like-for-like comparison with S82 exists (v1 report FINDING 2).
- MEASURED: 2026-09-07T06:30Z by v1's report — the lens core `api/cwf/_lib/replay/clarificationLens.ts` moved four commits past 2026-08-14; thirteen behavioural changes since the S82 floor, listed in v1's A.3 table; the lens calls `getServiceClient()` and has no other client path.
- UNMEASURED: whether `SUPABASE_URL` and `SUPABASE_PARITY_KEY` are present in the repository secret store (names only — ORDER A.0 lists them); whether the parity role holds SELECT on every table the lens reads (`SYNTHETIC_RUNS`, `TELEMETRY_EVENTS`, entity registry, backend entity layers, question sets, metric registry) — ORDER B's first run measures it; the run's duration under a CI runner.
- ON-DISAGREEMENT: if either secret NAME is absent from `gh secret list`, STOP after ORDER A.0, report the missing NAME, post the row. If the workflow fails on a permission error for the parity role, STOP after ORDER B.2, quote the error in an unanchored fence, and report — the grant is the Operator's, not yours. If `origin/master` after fetch differs from the `master` fence, STOP and report. If `docs/replay/` holds a third MA artefact, STOP and report its name.
- DECAYS the moment master moves past the `master` fence, and the moment any file lands under `docs/replay/` or `.github/workflows/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master at mint | MEASURED: Vercel list_deployments production newest githubCommitSha; git for-each-ref refs/remotes/origin/master over the bridge | master |
| the owner's classification this card rests on | MEASURED: owner's word in the Architect chat, verbatim | ruling |
| the S82 floor, copied from the S82 artefact | MEASURED: git show origin/master:docs/replay/ma-gate-rerun2-S82-v1.md, the Floor line | s82-floor |
| presence of the two secret names in the repository store | NOT-READ | `gh secret list` is a lane read; ORDER A.0 prints names only |
| readIntegrity, guardian, both numerators, vocabSource at this master | NOT-READ | produced by the CI run and ORDER C |

```evidence:master
11d6da31644356efdb349f9a9cd9f258b1bdc05a
```

```evidence:ruling
OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 — owner's word: "Tek sınıflandırma: ölçüm runner'ı için workflow_dispatch CI işi — CWF ölçüm işi sayılıp dondurma dışında.!" A workflow_dispatch job whose deliverable is a SOTA measurement is CWF work; it does not touch the ADF freeze.
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: THREE new files — .github/workflows/ma-rerun.yml, docs/replay/ma-gate-rerun3-S132-v1.md, and the report at the header path; no existing file is edited
- cwf_yaprak: one branch phase/ma-rerun-3-s132-1-v3, one pull request, NOT report-only — it lands under an Architect landing card with the owner's named approval, never by you
- the workflow: workflow_dispatch only, no schedule, no push trigger; reads SUPABASE_URL and SUPABASE_PARITY_KEY from repository secrets exactly as vector-live-proof.yml does; runs the lens --all --json; uploads the evidence as a workflow artifact with a retention of at most fourteen days; prints nothing that could carry a value
- the lane: never sets, reads, echoes or hunts a secret; runs the analyser on the downloaded artifact with no credential in its environment
- database: reads by the CI job through the persistence client under the parity role only; zero governed writes, zero messages rows (C1 LAW), zero param publish
- no model call; a model call by the runner is a STOP
- no delta sentence against S82's figures anywhere
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report-v3, posted once
```

## ORDER A — READ FIRST
0. `gh secret list` — print the NAMES only. `SUPABASE_URL` and `SUPABASE_PARITY_KEY` must both appear, else STOP and report the missing name.
1. Read your box directly by `created_at`; act on any earlier row first (the withdrawn v2 and its notice are stamped and not acted on).
2. `git fetch origin`; `git rev-parse origin/master` must equal the `master` fence.
3. Read `.github/workflows/vector-live-proof.yml` whole — its secret mapping and its `runs-on`/`node` setup are the template; read `docs/replay/ma-gate-rerun2-S82-v1.md` whole and v1's report for the A.3 table.

## ORDER B — THE WORKFLOW AND THE RUN
1. Write `.github/workflows/ma-rerun.yml`: `workflow_dispatch` with one input `until` (ISO instant, required); checkout; the same Node setup as vector-live-proof; `npm ci`; the lens run `node --import tsx scripts/runClarificationLens.ts --all --until "${{ inputs.until }}" --json > ma-rerun-evidence.json` with `SUPABASE_URL` and `SUPABASE_SECRET_KEY: ${{ secrets.SUPABASE_PARITY_KEY }}` in the step env only; stderr captured to `ma-rerun-stderr.log`; the FENCE-DB-1 banner is allowed on stderr (it names a project ref, not a secret); `actions/upload-artifact` for both files, retention-days at most fourteen; a final step that prints `wc -c` of the evidence and the `readIntegrity` line by `grep`, never the file body.
2. Commit the workflow on `phase/ma-rerun-3-s132-1-v3`, push, then dispatch it AT THAT BRANCH: `gh workflow run ma-rerun.yml --ref phase/ma-rerun-3-s132-1-v3 -f until=<the instant you dispatch, ISO to the second>`; record the instant. `gh run list --workflow=ma-rerun.yml --branch phase/ma-rerun-3-s132-1-v3` until the run appears; `gh run watch <id>` to completion; print conclusion, duration and the run URL. A permission error → ON-DISAGREEMENT.
3. `gh run download <id>` into a directory OUTSIDE the tree; print the evidence byte count and runId; the file never enters the tree.

## ORDER C — THE ANALYSIS, two numerators, fresh baseline
1. `scripts/analyseClarificationRun.ts --all` over the downloaded evidence, with NO Supabase variable in your environment (prove by `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` → both UNSET, printed).
2. Before any rate: print verbatim `readIntegrity`, both `population` counts, both `truncated` flags, `armoredFrames`, the guardian table with outcomes (`ASK` is a possible outcome), `vocabSource` counts (governed / floor / stale). Cross-check the seam count against the stderr log's `[Clarify]` lines.
3. Print `byOutcome` whole for the whole corpus and for the like-for-like population reconstructed by S82's TIME rule (count and `d` against 2534 as a CONTROL only). For each population, four labelled rates: old numerator `(HIGH+ALT_D)/N`, new numerator `(HIGH+ALT_D+ASK)/N`, HIGH-only, entity-unresolved share of blocks under both — copied from the analyser; if it prints only the new numerator, compute the old from `byOutcome` and say so.
4. No delta against S82. State once: S82's row was taken under a different numerator, a dark valve, unrecorded `vocabSource`, probes without `metricsSurface`, and a pre-guard credential path; its event-based expiry has tripped; this run is the fresh baseline under the current instrument and the parity role.
5. Any non-zero degraded/unknown, any guardian probe not blocked, any `truncated` true → caveat on every number, verdict NOT VALID, no re-run to make it green (S55-1).

## ORDER D — THE ARTEFACT AND THE REPORT
1. Write `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 shape (floor = `master` fence; instrument with the lens core file named; runner = the workflow, run id and URL; input by runId·bytes·window·populations·truncated; §0 verdict; §1 readIntegrity; §1.1 guardian; `byOutcome`; four-rate tables for both populations; vocabSource counts; "why no delta against S82"; EVENT-BASED expiry naming the three defining files at this master).
2. Commit the artefact and the report on the same branch; push; open the pull request to master; do NOT merge.
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report-v3` whose body is the report. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any secret value appears in a log, artefact, report or transcript; wrong if the lane's environment carried a Supabase variable during the analysis; wrong if any rate is quoted without readIntegrity and the guardian table above it; wrong if the like-for-like population is matched by size; wrong if a delta against S82 appears; wrong if the evidence JSON enters the tree; wrong if the workflow has any trigger other than workflow_dispatch; wrong if a re-run was performed to turn a caveat green.

## SHARED SURFACES
`.github/workflows/` gains one file. Database: reads by CI under the parity role. cwf_yaprak: three new files on one branch. Bus: one from_lane row. Repository secrets: read by the workflow, never listed with values, never modified.

## DECISION RIGHTS
None. The `cwf-sota-definition-v1_6` amendment is the Architect's, from your artefact. A missing secret or a missing grant is reported, not repaired: the owner places secrets, the Operator grants roles.

BODIES: OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 · ADR-002 · ADR-007 · C1 LAW · S37-1 · S55-1 · S63-1 · TOTAL-45 · cwf-sota-definition-v1_5 §8 and §10.1 · vector-live-proof.yml (the precedent) · CARD-MA-RERUN-3-S132-1-v1 and its report · NOTICE-WITHDRAW-MA-RERUN-3-v2-1.

```deliverables
gh secret list names, the two required names present
.github/workflows/ma-rerun.yml, workflow_dispatch only, parity key mapping as in vector-live-proof
one completed run: id, URL, conclusion, duration; evidence artifact downloaded outside the tree, byte count and runId printed
proof the analysis ran with no Supabase variable in the lane's environment
readIntegrity, populations, truncated, armoredFrames, guardian table with outcomes, vocabSource counts — before any rate
byOutcome whole and four labelled rates, both populations; like-for-like count and d as control
docs/replay/ma-gate-rerun3-S132-v1.md, fresh baseline, event-based expiry, no S82 delta
docs/relay/MA-RERUN-3-S132-1-AG4-report-v3.md on phase/ma-rerun-3-s132-1-v3, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report-v3, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v3 ends here.
