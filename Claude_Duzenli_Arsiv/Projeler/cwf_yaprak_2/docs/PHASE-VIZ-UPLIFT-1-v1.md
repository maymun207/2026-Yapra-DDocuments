# PHASE VIZ-UPLIFT-1 · v1 — the chart earns the demo's face without losing yaprak's honesty
<!-- Architect-authored · 2026-07-31 · S73 · Second phase of the owner-mandated
     visualization overhaul (design: cwf-viz-overhaul-design-v1_1 §2b).
     Chart parity harvest from CWF-DEMO + table liveliness rider.
     Freeze-independent, zero migrations, ONE new dependency (recharts). -->

**PRECONDITION (S47-1 — do not start before it holds):** `origin/master`
contains the **VIZ-TABLE-1 merge**, and the shared clock module its G1
produced (path as disclosed in your own VIZ-TABLE-1 self-verify) exists on
master. Fresh clone; disclose the new anchor SHA in your self-verify. If the
precondition does not hold, STOP and say so.

──── PREMISE BLOCK (Architect fills; AG VERIFIES and STOPS if wrong or absent) ────
P-A  REACHABILITY — the chart path executes today: `[CHART_FROM_TOOL]` charts
     render on the live chat path (owner production screenshot 2026-07-31,
     `dpl_BTqZ3v8HaJgsUBbakLUwqGkEkpCr`: 7-series KB7 weekly-OEE chart).
P-B  PROVENANCE — Architect reads at authoring time (SHA `215bd9ab`, pre-
     VIZ-TABLE-1; RE-VERIFY everything on your fresh clone): `MessageChart.tsx`
     (296 lines) is hand-rolled SVG, straight `<path>` segments, ZERO
     tooltip/hover lines (grep) · x labels are `String(xv)` passthrough
     (`chartData.ts:108`) — date STRINGS bypass the epoch formatter ·
     VIZ-BIND-2 multi-group machinery exists (`chartData.ts:142+`).
     Harvest source (read-only reference, never a file copy-paste target):
     `github.com/maymun207/CWF-DEMO` @ `main` —
     `src/components/demo/media/DemoUniversalDataChart.tsx`: recharts
     `^3.9.0` · `SERIES_COLORS` (:25) · `CustomTooltip` (:48) · gradient
     area stops (:117) · `CartesianGrid strokeDasharray="3 3"` ·
     `type="monotone"` · `dot={{r:4,…}}` / `activeDot={{r:6, white fill}}`.
     CWF-DEMO is a FROZEN HARVEST SOURCE: patterns may be re-implemented in
     yaprak's idiom; no file is imported verbatim, no demo architecture
     decision is inherited.
P-C  SATISFIABILITY — (all three honest-fallback states re-render through the
     new renderer) satisfiable: fixtures exist from the 1B/1C evidence specs
     and the parser tests. (multi-series case) satisfiable: the 7-series
     exhibit shape. (same rows in → same displayed values) satisfiable:
     chartData's row pipeline is untouched by this phase.
AG: if any field is empty, self-referential, or contradicted by what you read, STOP.
────────────────────────────────────────────────────────────────────────────────────

## §0 · THE GAP (bind to the design note's §1b table, not to taste)

Demo wins on interaction + polish (crosshair tooltip, monotone curves,
localized ticks, humanized series names, markers/legend). yaprak wins on the
truth surface (raw tool output, evidence strip, advisory banners, honest
fallbacks). This phase imports the former; it may not spend a pixel of the
latter.

## §1 · GATED SUB-PHASES

**G1 · Renderer swap (recharts, pixels only).** Add `recharts` (current
stable 3.x; disclose the exact version) — the ONLY new dependency of this
phase. Rebuild `MessageChart`'s drawing surface on recharts: `LineChart` +
`Line type="monotone"`, point dots + white-fill activeDot halo,
`CartesianGrid strokeDasharray="3 3"` at yaprak's theme opacity, `Legend`,
and a custom crosshair tooltip (hover a column → every series' value with
its color dot — re-implement the DemoUniversalDataChart `CustomTooltip`
pattern in yaprak's Tailwind idiom). Series color palette: a named constant
in yaprak's theme vocabulary (harvest the demo palette as the starting
values; disclose it).
**Boundary law (the phase's first byte-pin):** recharts touches pixels only.
`chartData.ts` remains the single data/label pipeline — same rows in, same
values displayed, test-pinned. The honest fallback panels (non-chartable ·
group-ambiguous · not-available-to-chart, `MessageChartContent.tsx:83`
family) render OUTSIDE recharts and their strings are byte-identical —
pinned.

**G2 · Tick localization through the ONE clock.** Date-STRING x labels
("2026-07-25") parse and render as zoned short labels ("25 Tem") via the
shared clock module VIZ-TABLE-1 produced; the epoch path stays byte-pinned
(the F209 tests pass unchanged). Unparseable strings pass through RAW — a
guess never looks like an answer. The last-label clipping is measured and
fixed (axis margin/interval; RULE-26 numeric assert at both 1280 and 1024).

**G3 · Series-name humanization (attributed, never invented).** Priority:
(1) the dialect `header` when the directive carries one (mechanism already
shipped in CHART-SERIES-DIALECT-1 — teaching the model to SUPPLY headers is
viz v4's A5 publish, NOT yours); (2) else the entity-registry surface name
IF the series key resolves canonically — disclose the resolution read you
use; (3) else the raw key, untouched. No prettification heuristics, no
title-casing guesses.

**G4 · Table liveliness rider (Tailwind, no MUI).** `DataTable` visual pass
at its existing altitude: zebra rows, hover highlight, sticky header,
comfortable density — Tailwind/shadcn idiom only. Explicitly banned: MUI /
@mui/x-data-grid / emotion (the demo's table stack is NOT harvested — one
design system).

**G5 · F160 residue re-measure (disclosure, not a build mandate).** With the
new renderer, exercise the multi-series matrix: single-tool multi-series
(exhibit shape) · VIZ-BIND-2 cross-group. Report in self-verify what — if
anything — remains of F160's original claim ("multi-series single chart
unsupported"), case by case. The Architect closes or re-scopes it by name
from your evidence; do not fix beyond the matrix.

**G6 · Tests + evidence.** Pins from G1's boundary law + G2's F209-unchanged
+ fallback-string byte-pins. e2e @1280 AND @1024: the exhibit question's
chart renders with tooltip reachable (hover interaction exercised),
localized ticks, no clipping — numeric RULE-26 asserts + PNG artifacts,
including one side-by-side-framed shot against the demo exhibit for the
owner's eye. Suite green · `tsc -b` + `typecheck:api` green ·
`check:doc-drift` — reseal rev N → N+1 if flagged · CHANGELOG + KB
(RULE 3), including the harvest provenance line (CWF-DEMO patterns
re-implemented, files not copied).

## §2 · CONSTRAINTS

Zero migrations · Operator does NOT enter · freeze untouched (zero
publishes; zero `prompt.segment` edits — G3's teaching half belongs to
viz v4 at A5) · exactly ONE new dependency (recharts) — MUI banned ·
bundle-size delta disclosed in self-verify · branch `phase/viz-uplift-1` ·
self-verify with literal evidence → hand back → RULE-25 → GO → `--no-ff`
(squash banned).

## §3 · POST-MERGE PROOF READ (S63-1)

The owner re-asks the exhibit question in production ("KB7 son 7 günlük
hat bazlı OEE"); the chart renders with the crosshair tooltip live under
the owner's pointer, monotone curves, "25 Tem"-style ticks, humanized
legend where headers/registry resolve; the Architect reads the deployment
READY and the owner's screenshot is the parity witness against the demo
exhibit.

TAIL ANCHOR: this brief ends after the word ANCHOR-END. ANCHOR-END

<!-- END · PHASE-VIZ-UPLIFT-1-v1 · 2026-07-31 · S73 · authored at 215bd9ab;
     anchor re-read at pre-flight per PRECONDITION -->
