<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v4 — same runner as v3, fenced on the INSTRUMENT's blobs instead of on master, so the foreman's drain cannot decay it
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report-v4.md
fanout: personalized

v3 passed its credential gate for the first time (both secret names present, read as names) and then stopped at its own anchor clause because master had moved — by five `docs/relay/` landings, three of them your own reports, while the card was being read. The lane's drift fence proved the instrument byte-identical across the range. That stop was correct under v3's text and it is a design defect in the card, not in the lane: a measurement card must fence the thing it measures, not the tip of a tree the foreman is actively draining. v4 keeps every ORDER of v3 and changes exactly one thing — the ON-DISAGREEMENT is now about the five blobs in the `instrument` fence; master is READ and RECORDED at fetch, never a stop condition. Everything about the credential path is unchanged: the parity key lives in CI, never in a lane.

## PREMISE
- MEASURED: 2026-09-07T09:51Z by v3's report — `gh secret list` names include `SUPABASE_URL` and `SUPABASE_PARITY_KEY` (dated 2026-08-16); the four instrument files unchanged from the previous fence to the master read at 09:50Z; the only tree changes in that range were five relay reports.
- MEASURED: 2026-09-07T10:33Z over the bridge, `git rev-parse origin/master:<path>` in the owner's clone — the blob ids of the four instrument files and of the template workflow, listed in the `instrument` fence.
- MEASURED: 2026-09-07T09:06Z, Supabase `domain_rules` — `router.askOnUnresolved` published value 1: the valve is OPEN; no like-for-like comparison with S82 exists.
- UNMEASURED: whether the parity role holds SELECT on every table the lens reads; the run's duration in CI; the master you will fetch (RECORDED in your report, not fenced).
- ON-DISAGREEMENT: after fetch, `git rev-parse origin/master:<path>` for each of the five paths must equal the `instrument` fence line for line; any difference → STOP and report the differing blob(s). If either secret NAME is absent → STOP after ORDER A.0. If the workflow fails on a permission error for the parity role → STOP after ORDER B.2, quote the error unanchored. If `docs/replay/` holds a third MA artefact → STOP and report its name. Master moving is NOT a stop.
- DECAYS the moment any of the five instrument blobs changes on master, and the moment any file lands under `docs/replay/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the five instrument blobs this card measures against | MEASURED: git rev-parse origin/master:<path> over the bridge, one line per path | instrument |
| the owner's classification this card rests on | MEASURED: owner's word in the Architect chat, verbatim | ruling |
| the S82 floor, copied from the S82 artefact | MEASURED: git show origin/master:docs/replay/ma-gate-rerun2-S82-v1.md, the Floor line | s82-floor |
| the master you fetch | NOT-READ | recorded by ORDER A.2, never a fence |
| readIntegrity, guardian, both numerators, vocabSource | NOT-READ | produced by the CI run and ORDER C |

```evidence:instrument
a385c73fa249d9fe36596e90bbe23a59b202fe4b api/cwf/_lib/replay/clarificationLens.ts
ca6286a0d7a4c2975cf1e1c0ce4c65838af7f158 scripts/runClarificationLens.ts
08c77201ca0b43b4d93ca8cb2b76209e075acd3a scripts/analyseClarificationRun.ts
89f96e3ba550b2fefe668ce6dd92a318b5683c87 api/cwf/_lib/persistence/client.ts
a2dd64cce354217bf574cf51504072f0360abacf .github/workflows/vector-live-proof.yml
```

```evidence:ruling
OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 — owner's word: "Tek sınıflandırma: ölçüm runner'ı için workflow_dispatch CI işi — CWF ölçüm işi sayılıp dondurma dışında.!"
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: THREE new files — .github/workflows/ma-rerun.yml, docs/replay/ma-gate-rerun3-S132-v1.md, the report at the header path; no existing file edited
- cwf_yaprak: one branch phase/ma-rerun-3-s132-1-v4 cut from the master you fetch, one pull request, NOT report-only — Architect landing card + owner's named approval; never merged by you
- the workflow: workflow_dispatch only; SUPABASE_URL and SUPABASE_PARITY_KEY from repository secrets exactly as vector-live-proof.yml maps them; lens --all --json; evidence and stderr uploaded as a workflow artifact, retention at most fourteen days; nothing printed that could carry a value
- the lane: never sets, reads, echoes or hunts a secret; analyses the downloaded artifact with no Supabase variable in its environment, proven by env:presence
- database: reads by the CI job under the parity role only; zero governed writes, zero messages rows (C1 LAW), zero param publish; no model call
- no delta sentence against S82's figures anywhere
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report-v4, posted once
```

## ORDER A — READ FIRST
0. `gh secret list` — names only; both required names present, else STOP.
1. Read your box directly by `created_at`; act on any earlier row first.
2. `git fetch origin`; record `git rev-parse origin/master` in the report (informational). Then `git rev-parse origin/master:<path>` for the five paths — each must equal its `instrument` line, else ON-DISAGREEMENT.
3. Read `.github/workflows/vector-live-proof.yml` whole (the template), `docs/replay/ma-gate-rerun2-S82-v1.md` whole, and v1's report for the A.3 table (cite, do not re-derive).

## ORDER B — THE WORKFLOW AND THE RUN
1. Write `.github/workflows/ma-rerun.yml`: `workflow_dispatch` with one required input `until` (ISO instant); checkout; the same Node setup as the template; `npm ci`; the lens run `node --import tsx scripts/runClarificationLens.ts --all --until "${{ inputs.until }}" --json > ma-rerun-evidence.json` with `SUPABASE_URL: ${{ secrets.SUPABASE_URL }}` and `SUPABASE_SECRET_KEY: ${{ secrets.SUPABASE_PARITY_KEY }}` in the step env only; stderr to `ma-rerun-stderr.log`; `actions/upload-artifact` for both, retention-days at most fourteen; a final step printing `wc -c` of the evidence and the `readIntegrity` line by `grep`, never the file body.
2. Commit on `phase/ma-rerun-3-s132-1-v4`, push, dispatch at that branch: `gh workflow run ma-rerun.yml --ref phase/ma-rerun-3-s132-1-v4 -f until=<dispatch instant, ISO to the second>`; find the run, `gh run watch <id>`; print conclusion, duration, URL. Permission error → ON-DISAGREEMENT.
3. `gh run download <id>` OUTSIDE the tree; print byte count and runId.

## ORDER C — THE ANALYSIS, two numerators, fresh baseline
1. `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` → both UNSET, printed; then `scripts/analyseClarificationRun.ts --all` over the downloaded evidence.
2. Before any rate: `readIntegrity`, both `population` counts, both `truncated` flags, `armoredFrames`, guardian table with outcomes (`ASK` possible), `vocabSource` counts; seam count cross-checked against the stderr log's `[Clarify]` lines.
3. `byOutcome` whole for the whole corpus and for the like-for-like population by S82's TIME rule (count and `d` vs 2534 as CONTROL only); four labelled rates per population: `(HIGH+ALT_D)/N`, `(HIGH+ALT_D+ASK)/N`, HIGH-only, entity-unresolved share under both — copied from the analyser, old numerator computed from `byOutcome` if the analyser prints only the new one, and said so.
4. No delta against S82; state once why (different numerator, dark valve, unrecorded vocabSource, probes without metricsSurface, pre-guard credential path; event-based expiry tripped; this run is the fresh baseline under the parity role).
5. Any degraded/unknown non-zero, guardian probe not blocked, or `truncated` true → caveat on every number, NOT VALID, no re-run (S55-1).

## ORDER D — THE ARTEFACT AND THE REPORT
1. `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 shape (floor = the master you fetched, recorded; instrument blobs from the `instrument` fence; runner = workflow run id and URL; input by runId·bytes·window·populations·truncated; §0 verdict; §1 readIntegrity; §1.1 guardian; byOutcome; four-rate tables both populations; vocabSource counts; "why no delta against S82"; EVENT-BASED expiry naming the three defining files).
2. Commit artefact + report; push; open the pull request; do NOT merge.
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report-v4`. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if any secret value appears anywhere; wrong if the lane's environment carried a Supabase variable during analysis; wrong if a rate is quoted without readIntegrity and the guardian table above it; wrong if the like-for-like population is matched by size; wrong if a delta against S82 appears; wrong if the evidence JSON enters the tree; wrong if the workflow has a trigger other than workflow_dispatch; wrong if the card is stopped on master movement alone while the five blobs are unchanged; wrong if a re-run was performed to turn a caveat green.

## SHARED SURFACES
`.github/workflows/` gains one file. Database: CI reads under the parity role. cwf_yaprak: three new files on one branch. Bus: one row. Repository secrets: read by the workflow, never listed with values, never modified.

## DECISION RIGHTS
None. `cwf-sota-definition-v1_6` is the Architect's, from your artefact. A missing grant is reported for the Operator, never arranged by you.

BODIES: OWNER-RULING-S132-MEASUREMENT-RUNNER-IS-CWF-1 · ADR-002 · ADR-007 · C1 LAW · S37-1 · S55-1 · S63-1 · TOTAL-45 · cwf-sota-definition-v1_5 §8 and §10.1 · CARD-MA-RERUN-3-S132-1-v3 and its report (the anchor-decay finding) · vector-live-proof.yml.

```deliverables
gh secret list names, both required present
five instrument blobs re-read after fetch, equal to the fence; fetched master recorded
.github/workflows/ma-rerun.yml, workflow_dispatch only, parity key mapping as in the template
one completed run: id, URL, conclusion, duration; artifact downloaded outside the tree, byte count and runId
env:presence proof: both Supabase names UNSET in the lane during analysis
readIntegrity, populations, truncated, armoredFrames, guardian with outcomes, vocabSource counts — before any rate
byOutcome whole and four labelled rates, both populations; like-for-like count and d as control
docs/replay/ma-gate-rerun3-S132-v1.md, fresh baseline, event-based expiry, no S82 delta
docs/relay/MA-RERUN-3-S132-1-AG4-report-v4.md on phase/ma-rerun-3-s132-1-v4, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report-v4, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v4 ends here.
