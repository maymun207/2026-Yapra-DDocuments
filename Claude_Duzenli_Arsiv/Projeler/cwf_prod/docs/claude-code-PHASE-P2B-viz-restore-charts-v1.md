# Claude Code — PHASE P-2B: Viz-Restore (Charts, from-tool) — close the chart fidelity hole
**rev 1 · 2026-06-30 · target: `cwf_yaprak` @ HEAD `e9fbee3` · scope: frontend render + parser chart-branch + prompt (NO backend data path change)**

Restore **chart** rendering — but on the same data-fidelity-safe footing P-2A gave tables. Tool-sourced charts
plot values pulled from the verified raw tool output the client already holds; the model emits a directive that
contains **field names only — never a number**. This retires the old chart macros for good (dead-simulation
`station/parameter/metric` forms + the `data="x:y|…"` form where the model typed the values — the exact fidelity
hole `[TABLE_FROM_TOOL]` closed for tables). With P-2A + P-2B, the viz-restore unit is complete.

---

## 0. WHY — diagnosis (the fork this phase exists to resolve)

P-2A left charts as a deliberate no-op and removed all chart instructions from the prompt. The render chain
otherwise exists: backend ships `message.rawToolResults` (verified, persisted, re-hydrated); the parser splits
macros; `tableData.ts` derives table data from records via a reusable `findRecords`. Charts now get the
**from-tool** treatment that mirrors tables exactly.

**The deterministic/safe split (project RULE §8), applied to charts:**
- **AUTHORITATIVE = the plotted VALUES.** A tool chart's series come from `message.rawToolResults` via a new
  `chartData.deriveChartData` (reusing `tableData.findRecords`). The model supplies **zero** numeric values.
- **SOFT = PRESENTATION.** Chart type (line/bar), title, which field is the x-axis, which numeric fields are the
  series. The directive supplies only these. A wrong field choice is cosmetic; it can never alter a value.
- **Bounded escape hatch = `[CHART_START]`.** Small series the model genuinely COMPUTED (not from a tool),
  explicit JSON points, ≤~20 points. Lower fidelity, explicitly scoped to non-tool data.

**Why the old forms die:** `[Chart:… station=press parameter=pressure_bar]` / `[Chart:BarChart metric=oee]`
are virtual-factory telemetry that no longer exists; `[Chart:… data="x:y|…"]` makes the MODEL type the data —
re-opening the fidelity hole. None survive P-2B. (They are already absent from the prompt; this phase removes
their PARSER branch and replaces it with the from-tool directives.)

**`empty ≠ zero` is SHARPER for charts than tables.** A `0` plotted on a line/bar reads as "the metric IS zero."
An empty or absent tool result must render an explicit "no data" affordance — NEVER a 0-point, NEVER a flat
zero line/bar. This is the sacred invariant, now visual.

**Chart library decision (committed): dependency-free SVG.** Build a clean line/bar renderer in our own SVG
(like the architecture diagrams), in the chat-dark palette — NO recharts / d3 / chart.js. Rationale: the charts
are simple (x label + numeric series), the project bar is lean/no-bloat/no-compat-risk (React 19), and this
matches how `DataTable` was harvested clean onto primitives. Harvest the donor's data-shaping LOGIC if useful,
render with our SVG. Do NOT add a charting dependency.

---

## 1. HARD PRE-FLIGHT GATE — abort and report if ANY fails

```bash
test "$(git rev-parse --short HEAD)" = "e9fbee3" || echo "ABORT G1: HEAD is not e9fbee3 (post P-2A)"
test -z "$(git status --porcelain)" || echo "ABORT G2: working tree dirty"
# P-2A landed: tables render, charts are a no-op, prompt has no charts
test "$(grep -c 'Chart:' shared/cwfConstants.ts)" = "0" || echo "ABORT G3: chart macros unexpectedly present (P-2A state changed)"
grep -q "findRecords" src/lib/tableData.ts || echo "ABORT G4: tableData.findRecords moved — chart builder reuse target gone"
grep -q "case 'chart'" src/components/ui/cwf/MessageChartContent.tsx || echo "ABORT G5: renderer chart branch moved"
test -f api/cwf/__tests__/__fixtures__/phase1-prompt-tools.txt || echo "ABORT G6: prompt fixtures moved"
```

---

## 2. HARD CONSTRAINTS

- **No backend DATA-path change.** Do NOT alter `cwfService.ts`, `chat.ts`, `resultStore.ts`, `toolResult.ts`,
  `cwfStore.ts`, or how `rawToolResults` are produced/shaped/persisted/shipped. Consume only.
- **The model never supplies tool-chart values.** The `[CHART_FROM_TOOL]` directive carries field NAMES + type
  + title — and NO numeric data. The renderer plots series ONLY from `deriveChartData(result.raw, …)`. The only
  model-typed points allowed are `[CHART_START]`, the explicit model-computed escape hatch.
- **empty ≠ zero, sharpened.** Empty/absent records → an explicit "no data" affordance; NEVER a 0-point, a flat
  zero series, or a fabricated point. A non-numeric series field → an honest "not chartable" note, never a coerced 0.
- **No new dependency.** Dependency-free SVG only (see §0). No recharts/d3/chart.js, no MUI, no sim deps.
- **Tables stay byte-identical.** This phase touches `chatParser.ts` (which P-2A did not). The TABLE parse
  branches (`[TABLE_START]`, `[TABLE_FROM_TOOL]`) and `tableData.deriveTableData` MUST be unchanged in behavior
  — only the CHART branch is reworked. `chatParser.test`/`tableData.test` table cases stay green.
- **Living-doc lock-step (standing).** Touches `shared/**` + `api/cwf/_lib/prompt/**` → sync the diagram + seal (step 6).
- **No secrets.** Never read/print `.env*`, tokens, keys.

---

## 3. GATED SUB-PHASES

### P-2B.1 — Parser rework (`chatParser.ts`)
- **Export `findRecords`** from `tableData.ts` (and `isScalar` if useful) so the chart builder reuses the SAME
  record-extraction — single source. (Pure function; no behavior change to tables.)
- Replace the `[Chart:…]` macro-regex branch + the `station/parameter/metric/data/series` parse + the
  `parseDataString`/`[Chart:…]` helpers with two NEW branches mirroring the table macros:
  - `[CHART_FROM_TOOL]{json}[CHART_END_FROM_TOOL]` → `ChartFromToolSegment { type:'chart-from-tool', tool?, chartType:'line'|'bar', title?, x:string, series:string[], raw }`.
  - `[CHART_START]{json}[CHART_END]` → `ChartSegment { type:'chart', chartType:'line'|'bar', title?, x:string, series:Array<{name:string; points:Array<{label:string; value:number}>}>, raw }` (model-computed; explicit points).
- Remove the old `ChartSegment` shape (station/parameter/metric/data) entirely; update the `MessageSegment` union.
- Invalid JSON in either chart block → fall back to rendering the raw block as TEXT (same pattern as tables).
- Do NOT touch the TABLE branches.

### P-2B.2 — From-tool chart builder (`src/lib/chartData.ts`, new)
- `deriveChartData(raw: string, directive: { tool?; chartType; title?; x: string; series: string[] }): DerivedChart | null`.
- `findRecords(JSON.parse(raw))` → records; for each record, take `record[x]` as the x label (string) and each
  `record[s]` for `s in series` as a numeric value (coerce numeric strings; a series field that is non-numeric
  across records → return null so the renderer shows an honest "not chartable" note — NEVER coerce to 0).
- `DerivedChart = { chartType, title?, xKey: string, series: Array<{ key: string; name: string }>, data: Array<Record<string, string|number>> }`.
- Empty records / empty array → return null (renderer shows "no data"; empty ≠ zero).
- Pure/total: no throws on malformed input (return null). Unit-test it (`chartData.test.ts`): values equal the
  records exactly; empty → null; non-numeric series → null; the model cannot introduce a value.

### P-2B.3 — Chart renderer (`src/components/ui/cwf/MessageChart.tsx`, new)
- Dependency-free SVG line + bar, in the chat-dark palette (mirror `DataTable`'s look). Inputs: a `DerivedChart`
  (from-tool) OR the model-computed `[CHART_START]` series shape. Multi-series supported (multi-line / grouped bar).
- Axes with min/max from the data, x labels, a small legend for multi-series, hover/tooltip optional (nice-to-have,
  not required). Numeric y only.
- **empty ≠ zero:** `data.length === 0` (or all-null series) → an explicit "Veri yok · no data" affordance, NEVER
  a zero baseline drawn as if it were data.
- Responsive width; no portal (so the UI-1 portal-theme rule does not apply).

### P-2B.4 — Wire the renderer (`MessageChartContent.tsx`)
- `chart-from-tool` → `matchResult(rawToolResults, seg.tool)` (reuse P-2A's matcher); no match → the honest
  `UnavailableNote`; else `deriveChartData(result.raw, …)` → if null and the result is empty → `MessageChart`
  with empty data ("no data"); if null and non-tabular → `UnavailableNote`; else `MessageChart` with the derived chart.
- `chart` (model-computed `[CHART_START]`) → `MessageChart` from the explicit series.
- Remove the `case 'chart': return null` no-op. Keep all table branches as-is.

### P-2B.5 — Prompt: charts honest again (`shared/cwfConstants.ts` + `outputFormat.ts`)
- Add chart instructions to the macro block, in the same two-tier shape as tables:
  - **PREFERRED for tool data:** `[CHART_FROM_TOOL]` — emit ONLY `{ tool?, type:"line"|"bar", title, x:"<field>", series:["<numeric field>", …] }`, NO data points. "The frontend plots the series from the raw tool output; you never type a number."
  - **For small data YOU computed:** `[CHART_START]` — explicit `{ type, title, x:"label", series:[{name, points:[{label, value}]}] }`, ≤~20 points, strict JSON.
  - State plainly: the dead `[Chart:… station=/metric=/data="…"]` forms are GONE; never emit them.
- **Rename** `TABLE_MACRO_INSTRUCTIONS` → `VIZ_MACRO_INSTRUCTIONS` (now tables + charts); update the import +
  reference + comment in `api/cwf/_lib/prompt/core/outputFormat.ts`. (Only that one consumer.)
- Keep the "never write a markdown table/chart — emit the macro" discipline.

### P-2B.6 — Golden fixtures + living-doc lock-step
- Regenerate `phase1-prompt-{notools,tools}.txt`. This time the diff is **additions** (the chart instructions) —
  it MUST contain only the new chart-instruction text (+ the rename has no fixture effect). `promptSnapshot.test` green.
- Arch-map: bump `· v8 → · v9` + stamp; update the Chat-block note from "tables restored / charts P-2B" →
  **"tables + charts restored — both from `rawToolResults` (model emits zero values)"**.
- Manifest: `docVersion rev 3 → rev 4`; re-seal the 3 affected tabs (Architecture Map = at altitude → diagram
  edited; Request Lifecycle + LLM Control Surface = below altitude, they depict `outputFormat` as a module not
  its macro contents → bump-with-note) to the P-2B code commit via the **two-commit seal** (code+doc commit,
  then a seal commit bumping `lastSyncedCommit`). `npm run check:doc-drift` → `[OK]`.

---

## 4. SELF-VERIFICATION — evidence + the chart-fidelity acid test

### Evidence (paste raw output)
```bash
npm run build
npx vitest run src/lib/__tests__/chatParser.test.ts src/lib/__tests__/tableData.test.ts \
  src/lib/__tests__/chartData.test.ts api/cwf/__tests__/promptSnapshot.test.ts

# charts back in the prompt as from-tool; old forms absent
grep -c "CHART_FROM_TOOL" shared/cwfConstants.ts        # EXPECT: ≥1
grep -c "station=\|parameter=\|metric=\|data=\"" shared/cwfConstants.ts   # EXPECT: 0
grep -c "Chart:" src/lib/chatParser.ts                  # EXPECT: 0 (old branch gone)

# no charting dependency was added
git diff e9fbee3 -- package.json package-lock.json | grep -iE "recharts|d3|chart.js" && echo "FAIL: dep added" || echo "OK: no chart dep"

# tables untouched in behavior (parser table branches byte-identical)
git --no-pager diff e9fbee3 -- src/lib/chatParser.ts | grep -E "TABLE_START|TABLE_FROM_TOOL"   # inspect: table branches unchanged

# backend data path untouched
for f in src/lib/cwfService.ts api/cwf/chat.ts api/cwf/_lib/resultStore.ts api/cwf/_lib/toolResult.ts src/store/cwfStore.ts; do
  git diff --stat e9fbee3 -- "$f"; done   # EXPECT: empty

npm run check:doc-drift                                  # EXPECT: [OK] no drift
```

### Acid test (the chart fidelity gate) — run in the running app, paste a screenshot/DOM
1. Ask a question whose ARMES tool returns a **time series** (e.g. daily OEE rows over a date range).
2. Confirm the model emitted `[CHART_FROM_TOOL]` with `x` + `series` field names and **ZERO numeric data**.
3. A line/bar chart renders from the records.
4. **Fidelity:** spot-check 2–3 plotted points against the "Ham tool çıktısı" raw panel — the chart values
   equal the raw records exactly; the model supplied none.
5. **empty ≠ zero:** trigger a tool that returns an EMPTY series → the chart shows "no data", NOT a flat zero
   line/bar and NOT a fabricated point.
6. A model-computed `[CHART_START]` (e.g. "chart these 4 numbers I summarized") renders bounded.
7. The retired forms (`[Chart:… station=…]`, `data="…"`) no longer render anything (the model won't emit them; if pasted manually they fall back to text).

Report must state: backend data path untouched; model emitted zero chart values; empty rendered as "no data" (not zero); no charting dependency added; table parse/render unchanged; fixture diff was chart-additions only; `check:doc-drift` OK.

---

## 5. OUT OF SCOPE
- Any backend data-path reshape. Consume, don't reshape.
- A charting library / heavy dependency (dependency-free SVG is the decision).
- WARN→FAIL drift-guard escalation (still deferred — DOC-2 §6 reasoning).
- Touching the TABLE parse/render path beyond exporting `findRecords`.

---

## 6. COMMITS (two: code+doc, then seal)
```
feat(p2b): viz-restore (charts) — [CHART_FROM_TOOL]/[CHART_START] from rawToolResults; retire old chart macros

- chatParser: replace Chart branch with chart-from-tool + chart (model-computed); export findRecords from tableData
- chartData.ts (new): deriveChartData from records (reuses findRecords); empty/non-numeric → null (no fabricated values)
- MessageChart.tsx (new): dependency-free SVG line/bar, chat palette; empty≠zero ("no data", never a 0-point)
- MessageChartContent: wire chart-from-tool (values from rawToolResults) + model-computed chart; no-op removed
- cwfConstants: add CHART_FROM_TOOL/CHART_START; rename TABLE_*→VIZ_MACRO_INSTRUCTIONS (+ outputFormat)
- golden fixtures regenerated (diff = chart-instruction additions only); promptSnapshot green
- arch-map v9: tables + charts restored, both from rawToolResults; docVersion rev 4
- NO charting dependency; backend data path + table path UNTOUCHED; model emits zero chart values
```
```
chore(p2b): seal architecture-doc manifest to the P-2B commit (lock-step RULE 20)
```

Report the final HEAD short-SHA for clone-and-diff verify against `e9fbee3`.
