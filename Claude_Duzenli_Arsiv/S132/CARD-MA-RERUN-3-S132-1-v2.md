<!-- relay-audit: v1 kind=card prov=1 -->
# CARD-MA-RERUN-3-S132-1 · v2 — re-run the clarification-gate replay lens now that the credential path is the shell environment; both numerators, no delta claim against S82
lane: AG-4
report: docs/relay/MA-RERUN-3-S132-1-AG4-report-v2.md
fanout: personalized

v1 of this card was blocked at ORDER A.4: the runner's documented `--env-file` path is refused by `guard-secrets` and the two service variables were UNSET in the shell (report row `MA-RERUN-3-S132-1-AG4-report`, 2026-09-07T06:30:29Z). v1 is not withdrawn (S37-1); this v2 supersedes it after the owner placed the two variables in the session environment and rebooted the windows. v2 also carries v1's own corrections to the Architect: the lens's behaviour lives in `api/cwf/_lib/replay/clarificationLens.ts`, which moved four commits past the date v1's premise recorded; `ASK` is now a fifth outcome inside the short-circuit numerator; and the valve `router.askOnUnresolved` is OPEN in production (published value 1, 2026-08-30 — read by the Architect from `domain_rules`), so a like-for-like comparison with S82 is NOT available. This card therefore asks for a FRESH baseline with both numerators printed, and forbids any delta sentence against S82's figures. Everything else v1 said about what this card does not do still holds: no governed write, no `messages` row, no model call, evidence JSON local and uncommitted.

## PREMISE
- MEASURED: 2026-09-07T09:06Z, Supabase `relay_inbox` — v1's report row present (06:30:29Z), ORDER B–D not attempted, `docs/replay/` untouched; v1's card row consumed 06:25:03Z.
- MEASURED: 2026-09-07T09:06Z, Supabase `domain_rules` (published) — `router.askOnUnresolved` value 1, version 2, updated 2026-08-30. The valve is OPEN; `byOutcome.ASK` will not be zero by construction.
- MEASURED: 2026-09-07T06:30Z by v1's own report, `git log origin/master -- scripts/runClarificationLens.ts scripts/analyseClarificationRun.ts api/cwf/_lib/replay/clarificationLens.ts` — newest commit 2026-08-29 (`PHASE-A23-LAYER-SCOPE-1 ORDER C completion`); thirteen behavioural changes since the S82 floor, listed in that report's A.3 table.
- MEASURED: 2026-09-07T09:20Z by the owner's screen — the ask shape is live in production (three candidates proposed for `değirmen10`), so ASK outcomes exist in current traffic.
- UNMEASURED: whether `SUPABASE_URL` and `SUPABASE_SECRET_KEY` are SET in your shell after the owner's reboot — ORDER A.0 measures PRESENCE only. Whether the run completes and how long it takes — ORDER B.
- ON-DISAGREEMENT: if either variable measures UNSET, STOP after ORDER A.0 and post a report saying so — do not open `.env.local`, do not try another spelling. If `origin/master` after fetch differs from the `master` fence, STOP and report the value read. If `docs/replay/` holds a third MA artefact, STOP and report its name.
- DECAYS the moment master moves past the `master` fence, and the moment any file lands under `docs/replay/`.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master at mint | MEASURED: Vercel list_deployments production newest githubCommitSha; git for-each-ref refs/remotes/origin/master over the bridge | master |
| the S82 floor, copied from the S82 artefact | MEASURED: git show origin/master:docs/replay/ma-gate-rerun2-S82-v1.md, the Floor line | s82-floor |
| presence of the two service variables in your shell | NOT-READ | an environment fact of your window; ORDER A.0 prints SET/UNSET, never a value |
| readIntegrity, guardian, both numerators, vocabSource at this master | NOT-READ | produced by ORDER B and ORDER C |

```evidence:master
11d6da31644356efdb349f9a9cd9f258b1bdc05a
```

```evidence:s82-floor
4469a37057ac4819d64e078000c2232e58bb9187
```

## SCOPE
```scope
- cwf_yaprak: TWO new files — docs/replay/ma-gate-rerun3-S132-v1.md and the report at the header path; no source, migration, seal, boot or script file is opened for writing
- cwf_yaprak: one branch phase/ma-rerun-3-s132-1-v2, one pull request; if the docs/replay artefact is written the PR is NOT report-only and lands under an Architect landing card with the owner's named approval; if ORDER A.0 stops the card, the PR carries only the report and is report-only
- the evidence JSON stays LOCAL and UNCOMMITTED, named by absolute path, runId, byte count and window
- database: service-role READS only through the runner's declared read path; zero governed writes, zero messages rows (C1 LAW), zero param publish
- no model call; a model call by the runner is a STOP
- no delta sentence against S82's figures anywhere in the artefact or the report
- bus: one from_lane row MA-RERUN-3-S132-1-AG4-report-v2, posted once
```

## ORDER A — READ FIRST
0. `npm run env:presence -- SUPABASE_URL SUPABASE_SECRET_KEY` — print the two presence lines. Both SET → continue. Either UNSET → STOP, report, post the row; nothing else runs.
1. Read your box directly by `created_at`; act on any earlier row first.
2. `git fetch origin`; `git rev-parse origin/master` must equal the `master` fence.
3. Read `docs/replay/ma-gate-rerun2-S82-v1.md` whole and v1's report (`docs/relay/MA-RERUN-3-S132-1-AG4-report.md` on its branch, or the bus row) — v1's A.3 table is the list of what the lens now reads; do not re-derive it, cite it.
4. Run the runner with `--limit 1` first, WITHOUT `--env-file`, so the `[Fence]` banner prints from the shell environment; it must name `fjbrkimwvtpwoxhziidh`, else STOP.

## ORDER B — THE RUN, honesty first
1. Fix `--until <ISO>` = the instant you start, printed to the second; `--all`; `--json` to a local file OUTSIDE the tree (absolute path, runId, byte count in the report). Print wall-clock start and end.
2. Before any rate: print verbatim `readIntegrity` (totalSeamInvocations, degradedFrames, unknownFrames, byFailure), both `population` counts, both `truncated` flags, `armoredFrames`, the guardian table (four probes, each with its own read AND its outcome — `ASK` is now a possible guardian outcome, print it if it occurs), and `vocabSource` per frame summarised as counts of governed / floor / stale. Cross-check the seam count against stderr `[Clarify]` lines.
3. Any non-zero degraded/unknown, any guardian probe not blocked, any `truncated` true → every number carries the caveat and the artefact verdict is NOT VALID; you still write it; no re-run to make it green (S55-1).

## ORDER C — THE ANALYSIS, two numerators, fresh baseline
1. `scripts/analyseClarificationRun.ts --all` over the evidence.
2. Print `byOutcome` whole (HIGH, ALT_D, ASK, LOW, NONE) for the whole corpus and for the like-for-like population reconstructed by S82's TIME rule (its `T` and tie rule; print the count and `d` against 2534 as a CONTROL only).
3. For each population print FOUR rates, each labelled by its numerator: old definition `(HIGH+ALT_D)/N`, new definition `(HIGH+ALT_D+ASK)/N`, HIGH-only, and entity-unresolved share of blocks under both definitions — copied from the analyser output; if the analyser prints only the new definition, compute the old one from `byOutcome` and say so.
4. Write NO delta against S82. State instead, once: S82's row was taken under a different numerator, a dark valve, unrecorded `vocabSource`, and probes without `metricsSurface`; its event-based expiry has tripped; this run is the fresh baseline under the current instrument.

## ORDER D — THE ARTEFACT AND THE REPORT
1. Write `docs/replay/ma-gate-rerun3-S132-v1.md` in the S82 shape (floor = `master` fence, date, instrument with the lens core file named, input by runId·bytes·window·populations·truncated, §0 verdict, §1 readIntegrity, §1.1 guardian, `byOutcome`, the four-rate tables for both populations, vocabSource counts), with the expiry EVENT-BASED and the three defining files named at this master; add a section "why no delta against S82" carrying ORDER C.4.
2. Branch `phase/ma-rerun-3-s132-1-v2` from the fetched master; commit; push; open the pull request; do NOT merge.
3. Post ONE from_lane row `MA-RERUN-3-S132-1-AG4-report-v2` whose body is the report. Print `read relay_inbox at <ISO>, box empty` or the rows found.

## FALSIFIER
Wrong if a value of either variable appears anywhere; wrong if any rate is quoted without readIntegrity and the guardian table above it; wrong if the like-for-like population is matched by size; wrong if any figure is retyped from S82 or a delta against S82 appears; wrong if the evidence JSON enters the tree; wrong if the runner made a model call and continued; wrong if a re-run was performed to turn a caveat green.

## SHARED SURFACES
Database reads via the runner's declared path only. cwf_yaprak: two new files on one branch. Bus: one from_lane row.

## DECISION RIGHTS
None. The `cwf-sota-definition-v1_6` amendment (retiring S82's row as event-expired, entering this run as the baseline) is the Architect's, made from your artefact.

BODIES: SOTA-1 · C1 LAW · ADR-001 · ADR-007 · S37-1 · S55-1 · S63-1 · TOTAL-45 · cwf-sota-definition-v1_5 §8 and §10.1 · CARD-MA-RERUN-3-S132-1-v1 and its report · OWNER-WITNESS-S132-GI-101-1.

```deliverables
presence lines for the two variables, SET/UNSET only
readIntegrity, populations, truncated, armoredFrames, guardian table with outcomes, vocabSource counts — before any rate
byOutcome whole, both populations; four labelled rates each; like-for-like count and d as control
docs/replay/ma-gate-rerun3-S132-v1.md, fresh baseline, event-based expiry, no S82 delta
docs/relay/MA-RERUN-3-S132-1-AG4-report-v2.md on phase/ma-rerun-3-s132-1-v2, pull request open, not merged
bus row from_lane MA-RERUN-3-S132-1-AG4-report-v2, posted once
```

TAIL ANCHOR: CARD-MA-RERUN-3-S132-1-v2 ends here.
