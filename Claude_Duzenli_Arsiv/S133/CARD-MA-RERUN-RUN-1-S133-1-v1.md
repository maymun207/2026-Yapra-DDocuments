<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-RUN-1-S133-1 · v1 — dispatch the hardened runner, take the measurement, and write the artefact the MA line has owed since S82
lane: AG-4
report: docs/relay/MA-RERUN-RUN-1-S133-1-AG4-report.md
fanout: personalized

THIS CARD REPLACES ORDERS B.1 THROUGH D OF CARD-MA-RERUN-3-S132-1-v15. Its ORDER B.0 was replaced by CARD-MA-RERUN-HARDEN-1-S133-1-v1, and that card's commit is this one's PRECONDITION. Together the two supersede v15 entirely; v15 and every version back to v5 are VOID, and none of them ever produced a commit.

THIS CARD IS NOT GATED ON A SCOUT VERDICT and its judge is the measurement itself. The same exemption the harden card carries applies here, under OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1.

NO MASTER PUSH IS ASKED FOR AND NONE MAY BE TAKEN. `gh workflow run --ref <branch>` dispatches from a branch, so this measurement needs no landing and therefore no owner spend approval. You open a pull request and leave it open.

## PREMISE
- MEASURED: 2026-09-08T11:46Z — `CARD-MA-RERUN-HARDEN-1-S133-1-v1` was posted to your box; it asks for one commit on `phase/ma-rerun-harden-1-s133-1` changing only `.github/workflows/ma-rerun.yml`.
- UNMEASURED, AND IT IS THIS CARD'S PRECONDITION: whether that commit exists yet. You do not read a remembered hash for it — you COMPUTE the head from the branch and you verify the change is IN it, by the two greps in ORDER A.3. If the branch is absent or the change is not in it, this card WAITS; it does not fail, and it does not do the harden card's work.
- MEASURED: 2026-09-08T11:45Z — `.github/workflows/ma-rerun.yml` on master triggers on `workflow_dispatch` ONLY, takes one required input `until` bound through the environment as `UNTIL`, maps the READ-ONLY parity key onto `SUPABASE_SECRET_KEY`, and writes nothing (C1 LAW).
- MEASURED: 2026-09-08T11:44Z — no `ma-rerun` branch exists and no MA-RERUN commit is newer than the S132 landing, so no earlier run of this measurement is in flight to collide with.
- UNMEASURED: the run's conclusion, its duration, the population counts, `readIntegrity`, and every rate. That is what this card is for.
- ON-DISAGREEMENT: a dispatch permission error, or a refusal because the workflow is not on the default branch → STOP and quote it unanchored. `truncated` true, any non-zero degraded or unknown count, or a guardian probe not blocked → the numbers stand as NOT VALID with the caveat on every one of them, and there is NO re-run (S55-1). A disagreement between `totalSeamInvocations` and the run log's `clarify_lines` → a caveat on every number, never a re-run.
- DECAYS when the report this card asks for is pushed, or when a v2 of this card appears.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the workflow's trigger, input binding, credential mapping and write posture | MEASURED: `git show origin/master:.github/workflows/ma-rerun.yml` at 11:45Z | shape |
| the precondition commit's existence and content | NOT-READ | ORDER A |
| the run, the evidence and every number | NOT-READ | ORDER B |

```evidence:shape
on:
  workflow_dispatch:
    inputs:
      until:
        required: true
          SUPABASE_SECRET_KEY: ${{ secrets.SUPABASE_PARITY_KEY }}
          UNTIL: ${{ inputs.until }}
```

## SCOPE
```scope
- one dispatch of ma-rerun.yml, on the harden branch's ref, with a window you name to the second
- the evidence artifact downloaded OUTSIDE the repository tree and DELETED from the run afterwards
- the analysis run with the repository's own analyser; no re-implementation of it
- one artefact, docs/replay/ma-gate-rerun3-S133-v1.md, and your report, on the harden branch
- a pull request opened and NOT merged
- no master push. No governed write. No messages row. The lens is a READER (C1 LAW)
- the evidence JSON never enters the tree, and no frame content is ever printed (BUG-005)
```

## ORDER A — THE PRECONDITION, COMPUTED NOT REMEMBERED
1. Read your box by `created_at`; earlier rows first.
2. `git fetch origin`; `git ls-remote origin refs/heads/phase/ma-rerun-harden-1-s133-1` — it must return exactly one line. Absent → WAIT: say so, keep your tick loop running, and re-read your box. This is a wait state, not a terminal one.
3. `git show <that branch head>:.github/workflows/ma-rerun.yml | grep -c 'ma-rerun-stderr.log'` and `... | grep -c 'clarify_lines='` — the stderr name must appear ONLY in the lens step's redirect and not in the upload step's `path:`, and the counting step must be present. Print both greps with their surrounding lines. Not satisfied → WAIT, as above.
4. Print the branch head at full length. Every later step names that head.

## ORDER B — THE RUN
1. Choose the window: the dispatch instant, ISO 8601 to the second, in UTC. Print it before you dispatch — the population must be fixed BEFORE the run or it is not reproducible.
2. `gh workflow run ma-rerun.yml --ref phase/ma-rerun-harden-1-s133-1 -f until=<that instant>`; find the run; `gh run watch <id>`; print conclusion, duration and URL.
3. Confirm from the run's own page that the file executed is the BRANCH's: the step list shows no stderr upload, shows the counting step, and the summary step prints no stderr byte count. Quote the `clarify_lines=<integer>` line from the log. Print the evidence artifact's expiry from `gh api` — about one day after the run, not a fortnight.
4. `gh run download <id>` OUTSIDE the tree; print byte count and run id. Then read the artifact id from `gh api repos/maymun207/cwf_yaprak/actions/runs/<run-id>/artifacts`, take the entry named `ma-rerun-evidence`, and `gh api -X DELETE repos/maymun207/cwf_yaprak/actions/artifacts/<artifact-id>`; print the delete status. A step output is job-internal and the REST jobs payload carries no outputs key, so the artifacts listing is the ONLY route — do not spend a STOP looking for another. If the credential is refused, STOP on the delete only, quote the refusal unanchored, continue the analysis on the downloaded file, and name the artifact as NOT deleted.

## ORDER C — THE ANALYSIS
1. `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` → both UNSET, printed. Then `node --import tsx scripts/analyseClarificationRun.ts <path to the downloaded evidence.json>` with NO other flag: that analyser has no flag parser and takes exactly one positional argument.
2. BEFORE any rate: `readIntegrity`; both `population` counts; both `truncated` flags; `armoredFrames`; the guardian table with outcomes (ASK is possible); `vocabSource` counts; and `totalSeamInvocations` cross-checked against the log's `clarify_lines`, which must agree exactly minus `unknownFrames`.
3. `byOutcome` whole, for the whole corpus and for the like-for-like population under S82's TIME rule. Four labelled rates per population: `(HIGH+ALT_D)/N`, `(HIGH+ALT_D+ASK)/N`, HIGH-only, and the entity-unresolved share under both. Copy them from the analyser; if it prints only the new numerator, compute the old one from `byOutcome` and say you did.
4. NO run-to-run delta against S82. State once why, in your own words, naming: a different numerator, a dark valve, an unrecorded `vocabSource`, probes without `metricsSurface`, the pre-guard credential path, and event-based expiry having tripped. This run is the fresh baseline under the parity role.
5. If the lens run FAILED, the reconciliation in C.2 is recorded as UNPERFORMED with its reason — no evidence JSON exists to compare against — and never as agreement or disagreement.

## ORDER D — THE ARTEFACT AND THE REPORT
1. `docs/replay/ma-gate-rerun3-S133-v1.md` in the S82 shape: floor = the master the branch was cut from, recorded; runner = the workflow run id and URL; input by run id, bytes, window, populations and truncated flags; the verdict; `readIntegrity`; the guardian table; `byOutcome`; the four-rate tables for both populations; `vocabSource` counts; the "why no delta against S82" paragraph; and the EVENT-BASED expiry naming the three files that define it.
2. Commit the artefact and `docs/relay/MA-RERUN-RUN-1-S133-1-AG4-report.md` on `phase/ma-rerun-harden-1-s133-1`; `auditText` locally `violations: 0` before push; push; open a pull request; do NOT merge.
3. Post ONE from_lane row if your channel can. If it cannot, say MECHANISM-ABSENT and name the lenses — F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1 is known, and your artefact on origin is the receipt.

## FALSIFIER
Wrong if the evidence JSON entered the repository tree; wrong if any frame content was printed anywhere; wrong if a rate was reported before `readIntegrity`, the populations and the truncated flags; wrong if a run was re-run after a red or a caveat; wrong if the analyser was passed any flag; wrong if a run-to-run delta against S82 was computed; wrong if the artifact was neither deleted nor named as not deleted; wrong if anything was pushed to master; wrong if the pull request was merged.

## SHARED SURFACES
cwf_yaprak: one branch gains two commits; one open pull request; master untouched. CI: one dispatched run under the read-only parity role. Database: READ only — no row is written, no param is published (C1 LAW). Production behaviour: UNCHANGED. Secrets: read by CI from the repository store, never by a lane, and never printed.

## DECISION RIGHTS
Yours: the exact window instant, and how the S82-shaped artefact is laid out. Not yours: whether the numbers are valid — the caveat rules in ORDER C.5 and the FALSIFIER decide that, and a caveated number is reported, never quietly dropped.

BODIES: CARD-MA-RERUN-HARDEN-1-S133-1-v1 (the precondition) · CARD-MA-RERUN-3-S132-1-v15 (orders B.1–D, the source; superseded) · OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1 · OWNER-APPROVAL-S132-LAND-MA-RERUN-RUNNER-1 · A-REC-S133-6 · S82 · C1 LAW · BUG-005 · S101-L1 · S55-1 · TOTAL-45.

```deliverables
the harden branch head, computed from the branch and printed at full length, with both greps
the window instant, printed BEFORE the dispatch
run id, conclusion, duration, URL
the branch's file proven to be the one that executed; clarify_lines quoted; artifact expiry about one day
evidence downloaded outside the tree; artifact deleted, or named as not deleted with the refusal quoted
env:presence showing both UNSET
readIntegrity, both populations, both truncated flags, armoredFrames, guardian table, vocabSource counts — all BEFORE any rate
totalSeamInvocations reconciled against clarify_lines, or recorded UNPERFORMED with its reason
byOutcome and four labelled rates for both populations
the why-no-delta paragraph
docs/replay/ma-gate-rerun3-S133-v1.md in the S82 shape
docs/relay/MA-RERUN-RUN-1-S133-1-AG4-report.md, auditText violations: 0
a pull request opened and NOT merged
one from_lane row, or MECHANISM-ABSENT with the lenses named
```

TAIL ANCHOR: CARD-MA-RERUN-RUN-1-S133-1-v1 ends here.
