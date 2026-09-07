<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v1 — re-run the clarification-gate replay lens after the routing change, so the one measured row of the acceptance contract stops being a self-portrait taken before the world moved
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report.md
fanout: personalized

This is the second product card of S132 and the first item of the S117 order that SOTA-1 refuses to let sit any longer. The acceptance contract `cwf-sota-definition-v1_5` §10 carries exactly ONE measured row, the M-A gate block rate from runner `MA-RERUN-2` at 2026-08-04, and its own expiry clause says the row goes STALE on the next change to entity discovery, the entity registry or the clarification gate's branch order. Since then `frameRouting` went live (S106), `ROUTE-ASK-1` rewrote the lens's own read path (commit dated 2026-08-14), and the A23 ask-shape build landed (S123). The implementation order of S117 (v30 §11) named this re-run as provable NOW with no dependency, and it has not been run in any session since. This card runs it. It writes NOTHING governed: the runner is a service-role READER (C1 LAW: zero writes to `messages`), the evidence JSON stays local and uncommitted (it carries recorded frames), and the only new files are one replay artefact and one report. No model call is expected — the clarification seam is deterministic code by ADR-001 — and if the runner makes one, that is a STOP.

## PREMISE
- MEASURED: 2026-09-07T06:16Z, Supabase `relay_inbox` — your report row `SOTA-SCOREBOARD-S132-1-AG4-report` posted 2026-09-07T05:56:59Z; its ORDER A read `gh pr list --state open` as `[]` before PR #506 was opened; its ORDER B print carries a STALE census field, which this card does not rest on.
- MEASURED: 2026-09-07T06:16Z, Vercel `list_deployments` — branch `phase/sota-scoreboard-s132-1` deployed at its head, PR #506 open; the `master` fence unchanged since the previous card.
- MEASURED: 2026-09-07T06:20Z, `git ls-tree origin/master docs/replay` over the bridge — exactly two MA artefacts exist, `ma-gate-rerun-S81-v1.md` and `ma-gate-rerun2-S82-v1.md`; no third. The S82 artefact names its floor in the `s82-floor` fence, its instrument `scripts/analyseClarificationRun.ts` over the `--all` evidence of `scripts/runClarificationLens.ts`, and its input by runId, byte count and a frozen `until` window.
- MEASURED: 2026-09-07T06:20Z, `git log origin/master -- scripts/runClarificationLens.ts scripts/analyseClarificationRun.ts` — the newest commit touching the lens is `ROUTE-ASK-1 R3/R5` dated 2026-08-14, AFTER the S82 measurement: the instrument itself has moved and must be re-read, not assumed.
- UNMEASURED: whether the runner still completes over the whole corpus in this window's environment, and how long it takes (S82 recorded about two hours). ORDER B measures it.
- ON-DISAGREEMENT: if your `origin/master` after fetch differs from the `master` fence, STOP and report the value you read. If `docs/replay/` holds a third MA artefact you did not write, STOP and report its name — someone ran this before you.
- DECAYS the moment master moves past the `master` fence, and the moment any file lands under `docs/replay/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master at mint | MEASURED: Vercel list_deployments production newest githubCommitSha; git for-each-ref refs/remotes/origin/master over the bridge | master |
| the floor the S82 artefact measured against, copied from that artefact | MEASURED: git show origin/master:docs/replay/ma-gate-rerun2-S82-v1.md, the Floor line | s82-floor |
| the run's readIntegrity, guardian verdict and rates at this master | NOT-READ | the runner has not been executed since 2026-08-04; ORDER B and ORDER C produce them |
| the runtime of a full `--all` run in this environment | NOT-READ | measured by ORDER B's own clock |

```evidence:master
11d6da31644356efdb349f9a9cd9f258b1bdc05a
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: TWO new files — docs/replay/ma-gate-rerun3-S132-v1.md and the report at the header path; no source, migration, seal, boot or script file is opened for writing
- cwf_yaprak: one branch phase/ma-rerun-3-s132-1, one pull request; NOT report-only, so it lands under an Architect landing card with the owner's named approval, never by you
- the evidence JSON produced by the run stays LOCAL and UNCOMMITTED (it carries recorded frames); its runId, byte count and window are named in the artefact instead
- database: service-role READS only through the runner's own declared read path; zero governed writes, zero messages rows (C1 LAW), zero param publish
- no model call; a model call by the runner is a STOP, not a cost
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report, posted once
```

## ORDER A — READ FIRST
1. Read your box directly by `created_at` before anything else; act on any earlier row first.
2. `git fetch origin`; `git rev-parse origin/master` must equal the `master` fence — else ON-DISAGREEMENT.
3. Read `docs/replay/ma-gate-rerun2-S82-v1.md` WHOLE — it is the shape and the method you reproduce, and its §3.1 explains why the like-for-like population is reconstructed by TIME (a rule fixed before any rate is computed), never by matching a count. Read `scripts/runClarificationLens.ts` and `scripts/analyseClarificationRun.ts` at this master, including the ROUTE-ASK-1 change, and state in the report what the lens now reads that it did not read at S82.
4. `npm run env:presence` — the runner needs the service read path; print the presence line, never a value. On first use the runner prints the `[Fence]` project-ref banner; it must name `fjbrkimwvtpwoxhziidh`, else STOP.

## ORDER B — THE RUN, honesty first
1. Fix the window BEFORE running: `--until <ISO>` = the instant you start, printed to the second; `--all`; `--json` to a local file OUTSIDE the repository tree (name it in the report by absolute path, runId and byte count). Print wall-clock start and end.
2. Before any rate is read, print verbatim from the evidence: the `readIntegrity` line (totalSeamInvocations, degradedFrames, unknownFrames, byFailure), both `population` counts, both `truncated` flags, `armoredFrames`, and the must-block guardian table (four probes, each with its own read). Cross-check the seam count against the run's stderr `[Clarify]` lines as S82 did.
3. If `degradedFrames` or `unknownFrames` is non-zero, or any guardian probe is not blocked, or either `truncated` is true, the run is reported with that caveat on EVERY number and the artefact's verdict is NOT VALID — you still write it; you do not re-run to make it green (S55-1).

## ORDER C — THE ANALYSIS, both definitions, like-for-like by time
1. Run `scripts/analyseClarificationRun.ts` over the evidence with `--all`, as the S82 artefact did.
2. Reproduce S82's like-for-like population by the SAME time rule it recorded (its `T` and its tie rule), print the reconstructed count and `d` against S82's 2534, and report ask-rate (HIGH+ALT_D and HIGH-only) and entity-unresolved share of blocks for BOTH definitions on that population; then the same four figures over the whole frozen corpus. Every figure is copied from the analyser's output, never retyped from S82.
3. State the delta against S82's figures (55.41 / 37.02 / 43.45 / 65.03 like-for-like; 38.63 / 31.42 / 62.14 / 76.40 whole corpus) with S82's own caveat attached: the baseline block definition is UNDETERMINED, so a delta carries that uncertainty wherever it is quoted.

## ORDER D — THE ARTEFACT AND THE REPORT
1. Write `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 artefact's shape: floor (the `master` fence), date, instrument, input named (runId · bytes · window · populations · truncated), §0 verdict, §1 G0 honesty precondition, §1.1 guardian, the two-population tables, and the expiry clause restated as EVENT-BASED (the next change to entity discovery, the registry, or the clarify branch order — name the three files that define them at this master).
2. Branch `phase/ma-rerun-3-s132-1` from the fetched master; commit the artefact and the report; push; open the pull request to master. Do NOT merge (the PR carries `docs/replay/`, so it is not report-only; landing is an Architect card with the owner's named approval).
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report` whose body is the report. Print `read relay_inbox at <ISO>, box empty` or the rows you found.

## FALSIFIER
Wrong if any rate is quoted without the readIntegrity line and the guardian table printed above it; wrong if the like-for-like population is matched by SIZE rather than reconstructed by TIME; wrong if any figure is retyped from the S82 artefact instead of copied from this run's analyser output; wrong if the evidence JSON enters the tree; wrong if the runner made a model call and the run continued; wrong if a re-run was performed to turn a caveat green.

## SHARED SURFACES
Database: reads through the runner's declared service read path only. cwf_yaprak: two new files on one branch. Bus: one from_lane row. No governed row, no seal, no migration, no script.

## DECISION RIGHTS
None. Whether the §10 row of `cwf-sota-definition` moves to a v1_6 is the Architect's amendment, made from your artefact, not in it.

BODIES: SOTA-1 · C1 LAW · ADR-001 · ADR-007 · S55-1 · S63-1 · TOTAL-45 · cwf-implementation-order-S117-v30 §11 · cwf-sota-definition-v1_5 §8 and §10.1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · S132-S117-RECONCILIATION-v1.

```deliverables
readIntegrity line, populations, truncated flags, guardian table — printed verbatim before any rate
like-for-like population reconstructed by time, count and d against S82
ask-rate and entity-unresolved share, both definitions, both populations, copied from the analyser
docs/replay/ma-gate-rerun3-S132-v1.md in the S82 shape with an event-based expiry
docs/relay/MA-RERUN-3-S132-1-AG4-report.md on phase/ma-rerun-3-s132-1, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v1 ends here.
