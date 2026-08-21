# PHASE VIZ-TABLE-1 · v1 — the table learns to tell time
<!-- Architect-authored · 2026-07-31 · S73 · First phase of the owner-mandated
     visualization overhaul (design: cwf-viz-overhaul-design-v1_1).
     Fixes TABLE-EPOCH-1 (new, this session) + carries the F158 rider.
     Small, freeze-independent, zero migrations. -->

──── PREMISE BLOCK (Architect fills; AG VERIFIES and STOPS if wrong or absent) ────
P-A  REACHABILITY — the code path executes today: `[TABLE_FROM_TOOL]` tables
     render on the live chat path (owner production screenshot, 2026-07-31,
     deployment `dpl_BTqZ3v8HaJgsUBbakLUwqGkEkpCr`: KB7 Glazur3 daily-OEE table
     with a raw-epoch `timestamp` column, values like `1785362370761`).
P-B  PROVENANCE — anchor `origin/master` = `215bd9ab03439b736ad75f9bae41b08a8d08d96d`
     (fresh clone, Architect-read) · suite 404/4484 · docVersion rev 167 ·
     grep census on that SHA: `src/components/ui/cwf/DataTable.tsx` and
     `src/lib/tableData.ts` contain ZERO time-formatting lines; the timezone
     family (`CHART_TIMEZONE='Europe/Istanbul'`, `zonedDateKey`,
     `formatEpochMsLabel`) lives ONLY in `src/lib/chartData.ts:237,254,293` ·
     grounding scanner = `api/cwf/_lib/grounding/groundingCheck.ts` (Mode A,
     complete-answer scan) — its exact table-cell insertion point is
     UNVERIFIED by the Architect; you derive and disclose it (G3).
     The time-field NAME LIST is deliberately NOT supplied — you derive it
     from the live armes payload shapes (mirror/fixtures) and disclose it.
P-C  SATISFIABILITY — (epoch-ms column → formats zoned) satisfiable: exhibit
     fixture. (non-time numeric column → byte-identical) satisfiable: any
     metric column in the same fixture. (null/empty cell → untouched)
     satisfiable: existing empty≠zero fixtures. (sort stays numeric on raw)
     satisfiable: DataTable already sorts on coerced numbers.
AG: if any field is empty, self-referential, or contradicted by what you read, STOP.
────────────────────────────────────────────────────────────────────────────────────

## §0 · THE TWO DEFECTS (bind the fix to these, not to symptoms)

1. **TABLE-EPOCH-1:** the table surface never adopted the F209 formatting
   family. Tool payloads carry epoch-ms timestamps; `DataTable` prints
   `String(v)`. Same disease as F209, neighboring organ.
2. **F158 (rider):** a MODEL-AUTHORED markdown-table cell once showed
   Glazur1 "0" while the prose honestly said "veri bulunamadı" — the
   grounding scan does not cover table-cell surfaces, so a fabricated
   numeric in a table escapes the check prose is subject to.

## §1 · GATED SUB-PHASES

**G1 · Extract the ONE clock.** Move the timezone family out of
`chartData.ts` into a shared module (e.g. `src/lib/timeFormat.ts`);
`chartData.ts` imports (or re-exports) it. Chart behavior is BYTE-PINNED
across the move: the existing chart tests (`chartAxisLabels`, `chartData`)
pass UNCHANGED — zero edits to their files is itself the pin; if any chart
test needs touching, STOP and hand back why. Table and chart now share one
clock by construction; a second time convention anywhere is the defect.

**G2 · Table epoch formatting (presentation-only).** In the
`tableData`/`DataTable` pipeline, a cell renders as a zoned human-readable
time (short form, same locale conventions as the chart family) ONLY when
BOTH hold: (a) the column key matches the time-field convention — derive
the list from the live armes payload shapes, disclose it verbatim in
self-verify, do not invent; (b) the value is a plausible epoch-ms magnitude
(state your window and its rationale). Everything else is byte-identical.
Binding laws: raw value stays reachable (title/tooltip attr) · numeric SORT
still uses the raw value · any copy/export surface keeps raw · null/empty/
absent cells untouched (empty≠zero — no 1970 artifacts, ever) ·
`DataTable`'s own "never change a value" docblock is quoted in a test name.

**G3 · F158 rider — the grounding scan reaches table cells.** Extend
`groundingCheck.ts`'s Mode A scan so numeric values inside model-authored
markdown table cells are scanned with the same machinery as prose numerics
(untraceable → the same advisory violation class, attributed to the cell).
Disclose the insertion point and the surface-detection approach in
self-verify. **Split-out clause:** if this proves deeper than a rider
(new violation class, renderer coupling, >~150 focused lines), STOP the
sub-phase, ship G1+G2, and hand F158 back by name with your findings —
absorbing it silently is the failure mode, splitting it is not.

**G4 · Tests + evidence.** Unit: detection both-ways (epoch column formats ·
non-time numeric untouched · null untouched · sort raw · title carries
raw). e2e @1280: exhibit-shaped fixture (epoch `timestamp` column) renders
zoned readable, numeric RULE-26 assert (scrollWidth ≤ innerWidth), PNG
artifact. Suite green; `tsc -b` + `typecheck:api` green; `check:doc-drift`
— if it flags, reseal rev 167 → 168 in the same G; CHANGELOG + KB per
RULE 3.

## §2 · CONSTRAINTS

Zero migrations · Operator does NOT enter · freeze untouched (zero
publishes; zero `prompt.segment` edits) · chart pixel behavior unchanged in
this phase (the renderer swap is VIZ-UPLIFT-1, a SEPARATE later phase — do
not start it here) · no new dependencies in this phase · branch
`phase/viz-table-1` · self-verify with literal evidence → hand back →
RULE-25 → GO → `--no-ff` (squash banned).

## §3 · POST-MERGE PROOF READ (S63-1)

The owner re-asks the exhibit question in production ("KB7 Glazur3 hattının
bugünkü OEE değerleri"); the table's timestamp column renders zoned
human-readable; the Architect reads the deployment READY + the owner's
screenshot confirms. F158's proof (if G3 ships): a planted fabricated-0
table cell in the test harness produces the advisory violation —
red-then-green pinned in G4.

TAIL ANCHOR: this brief ends after the word ANCHOR-END. ANCHOR-END

<!-- END · PHASE-VIZ-TABLE-1-v1 · 2026-07-31 · S73 · anchor 215bd9ab -->
