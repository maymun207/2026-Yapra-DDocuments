# Claude Code 4.8 — VIZ-RESTORE
### Clean CWF-native rendering for tool-result tables & data-driven charts · strip dead simulation macros
> Run with Claude Code 4.8 (AntiGravity add-on) from the CWF service repo (post-Foundation). The SEED step deleted the demo media components that used to render the chat's tables and charts, so tool-result tables and chart macros currently degrade to plain text. This restores them with clean, CWF-native renderers and removes the simulation-only macros that have no data source. **Frontend + a prompt-constants cleanup only** — do NOT touch auth, the Foundation data layer, or the server-side agent logic.

---

You are restoring the CWF chat's data visualization. The agent emits declarative macros (defined in `shared/cwfConstants.ts` → `CHART_MACRO_INSTRUCTIONS`); the parse layer (`src/lib/chatParser.ts`, `src/lib/tableData.ts`) turns them into typed blocks; the render layer that drew them was delegated to deleted demo components and must be rebuilt cleanly. You will also strip the macro variants that were backed only by the (now-removed) simulation.

## HARD CONSTRAINTS (non-negotiable)
- **Scope: rendering + macro-instructions only.** Do NOT modify auth, the Supabase/persistence layer, the request contract, or the server-side MCP resolution / agent loop. Only the frontend render layer and the `CHART_MACRO_INSTRUCTIONS` text.
- **Match the existing parse contract.** Read `chatParser.ts` + `tableData.ts` first and render exactly the block types they produce. Do not change the parser's output shape unless strictly necessary (if you must, keep it minimal and update its tests).
- **No heavyweight deps.** Tables: a clean custom sortable / column-toggle grid (NO `@mui/x-data-grid`). Charts: lightweight — re-add `recharts` as a real, intentional dependency, OR minimal custom SVG. Your choice; state it.
- **RULE 1.** No new hardcoded literals scattered around; colors/dimensions/limits go in a small config or the existing token/theme location.
- **Definition of done = green + it actually renders.** Build/test green AND a representative ARMES query renders an interactive table/chart end-to-end.

## PRE-FLIGHT
1. Read `chatParser.ts`, `tableData.ts`, and `shared/cwfConstants.ts` (`CHART_MACRO_INSTRUCTIONS`). Enumerate every macro the model can emit and the parsed block type each becomes.
2. Read the current `MessageChartContent.tsx` (the SEED-rewritten stub) and `MessageBubble.tsx` to see where rendering plugs in.
3. Record HEAD + baseline test count.

## THE MACRO CONTRACT (what survives vs what is dead)
**KEEP + RENDER (data-driven — these carry real ARMES/tool or model-computed data):**
- `[Chart:LineChart label="..." series="l1,l2,..." data="x:y1:y2|..."]` — universal multi-series line chart.
- `[Chart:BarChart label="..." series="l1" data="x:y|..."]` — universal bar chart.
- `[TABLE_FROM_TOOL]{ "tool", "title", "defaultVisible", optional "columns" }[TABLE_END_FROM_TOOL]` — grid built from the raw tool result; ALL columns auto-derived, `defaultVisible` shown first, others revealable; sortable. **This is the most important one** (ARMES lists).
- `[TABLE_START]{ "title", "columns", "defaultVisible", "rows" }[TABLE_END]` — small self-computed table.

**DELETE from `CHART_MACRO_INSTRUCTIONS` (simulation-only, no data source in the CWF service):**
- The hardcoded telemetry line charts: `[Chart:LineChart station=<...> parameter=<...> ...]` and the entire "Supported Line Chart Combinations" station/parameter list (press/dryer/glaze/printer/kiln/conveyor/sorting/packaging...).
- The hardcoded OEE bar: `[Chart:BarChart metric=oee ...]` across PR/DR/GL/PT/CV/KL/SR/PK.
These were fed by the deleted simulation store; leaving them in the prompt makes the model emit macros that cannot render and implies simulated data exists. Remove them and any examples that reference them. Keep the data-driven macros and both table macros intact.

## TASKS

### V1 — Prompt-constants cleanup  →  `shared/cwfConstants.ts`
Edit `CHART_MACRO_INSTRUCTIONS`: remove the two hardcoded/simulation macro families above and their examples; keep the universal data-driven LineChart, universal BarChart, `[TABLE_FROM_TOOL]`, and `[TABLE_START]` with their rules. Ensure the remaining text reads coherently (the model should understand it only has data-driven charts + the two table macros).

### V2 — Clean renderers (CWF-native, no demo branding)
Create renderers under `src/components/ui/cwf/charts/` and `.../tables/` (or the existing structure) consuming the parsed blocks:
- `UniversalLineChart` — multi-series, parses/consumes `series` + `data` (X may contain colons like `08:00` — do not mis-split; Y-count must equal series count; render gracefully if malformed).
- `UniversalBarChart` — single/multi bar from `data`.
- `ToolResultTable` — from `[TABLE_FROM_TOOL]`: derive ALL columns from the raw tool result (via `tableData.ts`), show `defaultVisible` first with a Columns toggle panel, support sorting; handle nested dot-path fields and header renames from optional `columns`; never truncate.
- `ComputedTable` — from `[TABLE_START]`: explicit columns/rows, types (number formatting), sortable.
Style consistent with the chat's cyan theme; lightweight; responsive within the chat bubble.

### V3 — Wire into message rendering
Rebuild `MessageChartContent.tsx` as the orchestrator: take the parsed sequence of blocks (prose, lineChart, barChart, tableFromTool, computedTable) and render them interleaved in order inside the bubble. Ensure `MessageBubble.tsx` uses it. Remove any remaining dead imports/branches from the SEED stub.

### V4 — Verify
1. `tsc -b`, `api/` typecheck (unchanged), `vite build`, `oxlint`, `vitest run` — all green. Add/adjust unit tests for the new renderers (data-string parsing, column derivation, sort, column toggle, malformed-data graceful handling).
2. **Render e2e:** with an authenticated user + their ARMES config, run (a) a query returning a tool list (e.g. a shipments/defects/production list) → confirm it renders as an interactive, sortable, column-toggle grid with ALL columns available; (b) a query asking for a trend/comparison chart → confirm a real chart renders; (c) confirm the model no longer emits, and the UI no longer needs, the removed simulation macros; (d) confirm NO raw markdown table leaks into the bubble.
3. Commit: `feat(viz): CWF-native table & chart rendering; drop simulation-only chart macros`.

## SELF-VERIFICATION CHECKLIST (end your run by confirming each, with evidence)
- [ ] Parse contract read; every macro mapped to its renderer; nothing renders to plain text that should be a grid/chart.
- [ ] `CHART_MACRO_INSTRUCTIONS` cleaned: simulation-only station/parameter line charts and `metric=oee` bar removed; data-driven + table macros kept and coherent.
- [ ] Renderers built CWF-native: `ToolResultTable` (all columns, defaultVisible, sort, column toggle, no truncation), `ComputedTable`, `UniversalLineChart` (colon-safe X, series/Y count guarded), `UniversalBarChart`.
- [ ] Charting approach stated (recharts re-added intentionally, or custom SVG); NO `@mui/x-data-grid` reintroduced.
- [ ] Auth / Foundation / server-side agent logic untouched (confirm — diff scope is frontend render + `cwfConstants` only).
- [ ] `tsc -b` + `api/` typecheck + `vite build` + `oxlint` + `vitest` all green — exact numbers.
- [ ] Render e2e passed: tool-list query → interactive grid; chart query → real chart; no markdown-table leak; no dead macros.
- [ ] State explicitly: **"Viz-restore complete — tool-result tables and data-driven charts render natively; simulation-only macros removed; chat unchanged elsewhere."**

Do not start the `_core/` restructure, the gateway unification, or the knowledge base. Stop after the checklist and present your report.
