# PHASE-LANDING-YIELD-TRUTH-1 · v1
**Lane: AG-1 (Author) · Architect-gated · S88 · 2026-08-08**
**Closes: F-S88-2 (table answer stamped failed) + PROCEDURE-YIELD-2 (discovery counts as yield)**

## ANCHOR (verify before any edit — STOP on mismatch)
- `git rev-parse origin/master` == `3d6b056b30bf08504489bf690df6fdb102533f31`
- Branch: `phase/landing-yield-truth-1` off that SHA. `npm test` green before first edit.
- docVersion on master reads **rev 216**. No migrations in this phase. No admin-UI surface.

## THE TWO WITNESSED DEFECTS (production, 2026-08-08, minutes after the S88 merges)

**W1 — trace `62bbed70` ("Granit'te bugünkü doğalgaz tüketimi"):** the reply landed the
data as a `[TABLE_FROM_TOOL]` grid with the honest "(grafik çizilmedi — veri tabloda)"
note — a user-eye SUCCESS. `[LandingGate] fetchedNotDrawn=true` fired anyway, the turn
was stamped `outcome=failed importance=0 procedure=0 semantic=0`, and the failed stamp
exposes a successful turn to the BUG-032 history quarantine. Root, read from master:
`landingSignals.ts` G3 is `hasChartDataFetch && !carriesVizMacro`, and `VIZ_MACROS`
knows only `[CHART_FROM_TOOL]` / `[CHART_START]`. The gate cannot see a table.
*Drawn is not the only way to land; a table is a landed reply.*

**W2 — trace `5d4ece48` ("Granit'te dünkü helyum tüketimi"):** honest "no data" answer,
yet `procedure=1 semantic=1`. The chain's records came from `list_charts` (10/191),
`list_datasets` (10/47), `get_dataset_info` (1) — reach classes `enumeration` /
`inspection` — while the only `data`-class result (`execute_sql`) had 0 rows. The
shipped yield conjunct counts ANY result with records, so catalog spelunking passed for
yield. This is Residual 1 of PHASE-PROCEDURE-YIELD-1, now production-witnessed.
*Finding the library is not finding the book.*

## G1 — a table is a landed reply (landingSignals.ts)
- Add `const TABLE_MACROS = ['[TABLE_FROM_TOOL]', '[TABLE_START]']` and export
  `carriesTableMacro(text)`, same shape as `carriesVizMacro`.
- G3 becomes: `hasChartDataFetch(...) && !carriesVizMacro(finalText) && !carriesTableMacro(finalText)`.
- Do NOT fold tables into `carriesVizMacro` itself — the distiller's viz arm and the
  stream-stage log both consume that name today with "drew a chart" semantics; widening
  it silently would change two other call sites' meaning. New predicate, new name.
- OUT OF SCOPE, named: a fabricated table macro with no fetch behind it is the
  grounding layer's case (same family as the fabricated chart macro residual). Do not
  legislate it here.

## G2 — yield means DOMAIN data (memoryDistill.ts + landingSignals.ts)
- Add to `landingSignals.ts` an exported, deterministic
  `hasDomainYield(persistRaw, reachClasses): boolean` — true iff at least one entry
  satisfies: **(a)** flat backend tool (`toolName !== 'call_tool'` and
  `toolName !== 'search_tools'`) whose raw carries records, or **(b)** gateway inner
  (`innerToolName(entry)`) whose reach class is `'data'` and whose raw carries records.
  Reuse `carriesRecords` / `innerToolName` — do not re-spell either.
- In `memoryDistill.ts`, the eligibility yield arm becomes:
  `hasDomainYield(...) || carriesVizMacro(finalText) || carriesTableMacro(finalText)`
  (a landed table is proof of domain data exactly as a drawn chart is).
  Keep `ctx.toolYield` accumulating as today for telemetry; append
  `domainYield=0|1` to the `[MemoryWrite]` line so the two counters stay separately
  observable in production.
- The same predicate guards the semantic-dossier delta (ONE door, as shipped).
- Bump `PROCEDURE_SCHEMA_VERSION` to 3 and leave `PROCEDURE_MIN_OFFERABLE_VERSION` at 2
  UNLESS your truth-table work shows v2 rows of the W2 shape are already in the store —
  in that case raise the floor to 3 and say so in the report with the row count you
  measured. Decide from data, not taste; show the query.

## TRUTH TABLE (tests; every row is a test, both directions, plus innocent probes)
Neutral fixture vocabulary ONLY (ZoneA/FactoryX...) — `check:tenant-zero` has no
exclusion list, and fixtures are inside its eight tokens.

| shape | fetchedNotDrawn | procedure |
|---|---|---|
| data-class rows + chart macro | false | 1 |
| data-class rows + table macro, no chart (W1) | **false** | **1** |
| data-class rows + neither macro | **true** | per yield arm |
| enum/inspection rows only, honest no-data (W2) | false (no data fetch) | **0** |
| flat ARMES rows + no macro | false | 1 |
| zero rows everywhere (e0751b56) | false | 0 |
| no tools ran | false | ABSENT (no `[MemoryWrite]` yield field lies) |

Replay W1 and W2 as fixtures shaped from their traces (neutralized names, same
structure: W2 = search envelopes + enumeration 10/191 + inspection 1 + data 0 rows).

## RULES
- Territory: `api/cwf/_lib/turn/landingSignals.ts`, `api/cwf/_lib/turn/memoryDistill.ts`,
  `api/cwf/_lib/persistence/repositories/EpisodesRepository.ts` (only if the version
  floor moves), their test files. NOTHING in `src/` — the client is AG-2's lane today.
- No repo-wide renames, no drive-by edits, merge squash banned.
- Reseal docVersion to **rev 217** against your combined tree; dual CHANGELOG entry.
- Report to `docs/relay/PHASE-LANDING-YIELD-TRUTH-1-report.md` on the branch:
  anchor proof, truth-table results, the v2-row measurement and your floor decision,
  diffstat, CI run id read by CONCLUSION, honest residuals. Then **STOP FOR REVIEW** —
  no merge without the Architect's GO.
- S63-1 named post-deploy proof (for the GO, not for you to run): the owner re-runs the
  helium→doğalgaz pair; expected inversion: helium `procedure=0 domainYield=0`,
  doğalgaz `outcome=unproven procedure=1` and NO `[LandingGate]` line.

<!-- END · PHASE-LANDING-YIELD-TRUTH-1-v1 -->
