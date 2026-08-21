# Claude Code — PHASE P-2A: Viz-Restore (Tables) — data-fidelity-safe render path
**rev 1 · 2026-06-30 · target: `cwf_yaprak` @ HEAD `347e80e` · scope: frontend render + prompt cleanup (NO backend data path change)**

Restore the interactive **table** rendering that is currently degraded to a drop-everything stub, using the
data path that already exists, and remove the dead simulation chart macros from the prompt. **Charts are
explicitly P-2B** (they carry a data-fidelity fork that gets its own gated phase). This phase ships the
highest-value, lowest-risk half: tool-sourced tables, rendered from the verified raw tool output the client
already holds — the model never re-types a single data value.

---

## 0. WHY — diagnosis (the split before the build)

The chain is intact except for ONE missing link:
- **Backend** ships raw tool output to the client: `message.rawToolResults[]` (each `{ toolName, … }`),
  persisted as `raw_tool_results` and re-hydrated on conversation reload (`cwfStore` L255/L376, `cwfService` L162–204). ✓
- **Prompt** instructs the model to emit `[TABLE_FROM_TOOL]` / `[TABLE_START]` / `[Chart:…]` macros — LIVE,
  appended by `api/cwf/_lib/prompt/core/outputFormat.ts` from `shared/cwfConstants.ts::CHART_MACRO_INSTRUCTIONS`. ✓
- **Parser** detects all three macro families into typed segments — `src/lib/chatParser.ts` (360 lines, tested). ✓
- **Table builder** turns a `[TABLE_FROM_TOOL]` directive + `message.rawToolResults` into `{columns, rows, defaultVisible}` — `src/lib/tableData.ts` (tested). ✓
- **Renderer** — `src/components/ui/cwf/MessageChartContent.tsx` (42 lines) — **DROPS every non-text segment
  (charts AND tables), rendering prose only** (returns `null` for non-text at ~L36–38). ← THE STUB.

So the model emits a perfectly good `[TABLE_FROM_TOOL]` directive every turn and the renderer silently throws
it away. The user asks for a table, the model "makes" one, it vanishes.

**The deterministic/safe split this phase enforces (project RULE §8):**
- **AUTHORITATIVE / deterministic = the VALUES.** Table rows for tool-sourced data come from
  `message.rawToolResults` via `tableData.ts`. The model supplies **zero** row values for tool data. This is
  why `[TABLE_FROM_TOOL]` exists and why it is the only fidelity-safe path for large/tool lists.
- **SOFT / advisory = PRESENTATION.** Which columns are visible first, the title, sort order. The model's
  directive supplies only these. A wrong column choice is cosmetic, never a data error.
- **Bounded escape hatch = `[TABLE_START]`.** Small data the model genuinely COMPUTED itself (not a tool
  result), explicit JSON rows, ≤~15 rows. Lower fidelity, explicitly scoped to non-tool data.

**Why charts are NOT in this phase:** the chart macros include (a) dead simulation forms
(`[Chart:… station=press parameter=pressure_bar]`, `[Chart:BarChart metric=oee]`) bound to a virtual factory
that no longer exists, and (b) a `data="x:y|…"` form where the MODEL types the data values — re-opening the
exact fidelity hole `[TABLE_FROM_TOOL]` closed for tables. Charts get a from-tool redesign in P-2B. This phase
**removes the dead/unsafe chart instructions from the prompt** so it stops promising a capability it can't (and
shouldn't, in that form) render — the prompt stays honest at every step.

---

## 1. HARD PRE-FLIGHT GATE — abort and report if ANY fails

```bash
# G1 — base is the post-DOC-2 master
test "$(git rev-parse --short HEAD)" = "347e80e" || echo "ABORT G1: HEAD is not 347e80e (DOC-2 merge)"

# G2 — clean tree
test -z "$(git status --porcelain)" || echo "ABORT G2: working tree dirty"

# G3 — the stub is where the diagnosis says (renderer drops non-text segments)
grep -q "MessageChartContent" src/components/ui/cwf/MessageChartContent.tsx || echo "ABORT G3: renderer moved"

# G4 — the data path the restore depends on still exists
grep -q "rawToolResults" src/store/cwfStore.ts && grep -q "TableFromToolDirective" src/lib/tableData.ts \
  || echo "ABORT G4: rawToolResults / tableData contract moved — re-diagnose before building"

# G5 — the golden prompt fixtures that WILL change are present
test -f api/cwf/__tests__/__fixtures__/phase1-prompt-tools.txt || echo "ABORT G5: prompt fixtures moved"
```

---

## 2. HARD CONSTRAINTS

- **No backend DATA-path change.** Do NOT alter how `rawToolResults` are produced, shaped, persisted, or
  shipped (`cwfService.ts` stream handling, `chat.ts`, `resultStore.ts`, `toolResult.ts`). This phase consumes
  the existing raw output; it does not reshape it. If the data shape looks wrong, STOP and report — do not "fix"
  it from a render phase.
- **The model never supplies tool-data values.** The `[TABLE_FROM_TOOL]` render path takes rows ONLY from
  `message.rawToolResults`. Under no circumstance render rows the model typed for a tool-sourced table. (The
  only model-typed rows allowed are `[TABLE_START]`, explicitly the model-computed escape hatch.)
- **empty ≠ zero in the render layer.** An empty/absent raw tool result renders as an explicit empty grid /
  "no rows returned" affordance — NEVER a synthesized `0` row, NEVER a blank fabricated value, NEVER silently
  nothing. This is the project's sacred invariant at the render boundary.
- **DemoDataTable is a HARVEST, not a copy.** The interactive grid does not exist in `cwf_yaprak` (only the
  shadcn primitives in `src/components/ui/table.tsx`). Rebuild it CLEAN on those primitives, harvesting the
  proven sort + column-visibility LOGIC from the CWF-DEMO donor — take logic, never files/spaghetti, never any
  simulation dependency. (Project harvest rule.)
- **No new chart rendering.** Charts are P-2B. The renderer must gracefully **no-op** on any chart segment
  (render nothing, never crash) — but after step 3.3 the prompt won't emit them anyway.
- **No secrets.** Never read/print `.env*`, tokens, keys.
- **Living-doc lock-step (standing).** This phase touches `shared/**` and `api/cwf/_lib/prompt/**` — both now
  mapped (DOC-2 fixed the globs). You MUST sync the affected diagram + bump the manifest (step 5).

---

## 3. GATED SUB-PHASES

### P-2A.1 — Interactive grid component (`DataTable`)
Build `src/components/ui/cwf/DataTable.tsx` on the shadcn `table.tsx` primitives, consuming a `DerivedTable`
(`{ title?, columns, rows, defaultVisible? }` from `tableData.ts`) plus a model-`[TABLE_START]` table shape:
- **Sort** by clicking a column header (string + numeric aware; stable; toggles asc/desc/none).
- **Column visibility** — a "Columns" panel/menu; `defaultVisible` shown first, all other auto-derived columns
  hidden-but-revealable. (This is the macro's promise: "show all columns without reducing.")
- **Empty state** — `rows.length === 0` → a clear "no rows returned" cell, NOT a zero. (empty ≠ zero.)
- Reuse the `admin-theme` / existing CSS tokens; if any sort/columns control portals (Radix), prepend the
  theme class (the UI-1 portal-theme rule). No new design system.

### P-2A.2 — Wire the renderer (`MessageChartContent.tsx`)
Replace the drop-everything stub. For each parsed segment from `chatParser.ts`:
- **text** → render as today (markdown prose).
- **table-from-tool** → resolve the raw result: match the directive `tool` against `message.rawToolResults`
  by `toolName` (omitted `tool` → most recent result); call `tableData.ts` to derive `{columns, rows,
  defaultVisible}`; render with `DataTable`. **No matching raw result** → a small, honest "result not available
  to tabulate" note — NEVER fabricate rows.
- **table-start** → render the model's explicit JSON rows with `DataTable` (the bounded model-computed path).
- **chart** → render nothing (graceful no-op; P-2B).
- The component must receive the message's `rawToolResults` (thread it from `ChatShell`/`cwfStore` if not
  already passed). Render identically for a freshly-streamed message AND a reloaded conversation (rawToolResults
  is re-hydrated from `raw_tool_results`).

### P-2A.3 — Make the prompt honest (`shared/cwfConstants.ts`)
- Remove the **chart** portion of `CHART_MACRO_INSTRUCTIONS` (the `## Dynamic Charting Capabilities` block and
  all `[Chart:…]` forms — dead-sim `station/parameter/metric` AND model-typed `data="…"`). KEEP the table
  portion (`[TABLE_FROM_TOOL]`, `[TABLE_START]`, the "show raw tool output" panel note, and the "never write a
  markdown table" rule).
- **Recommended (cleanliness):** rename the constant `CHART_MACRO_INSTRUCTIONS` → `TABLE_MACRO_INSTRUCTIONS`
  (it is now table-only) and update the single import + reference in
  `api/cwf/_lib/prompt/core/outputFormat.ts` (the comment there too). If you rename, that is the ONLY other file
  touched. (If you judge the rename risky, leave the name and add a one-line "table-only since P-2A" comment —
  but the chart text must go either way.)
- Leave `chatParser.ts`'s Chart branch in place (harmless; P-2B reworks it). Do not touch the parser.

### P-2A.4 — Regenerate the golden prompt fixtures
`outputFormat()` output changed → the assembled system prompt changed → regenerate the snapshots:
- `api/cwf/__tests__/__fixtures__/phase1-prompt-notools.txt`
- `api/cwf/__tests__/__fixtures__/phase1-prompt-tools.txt`
- The regeneration diff MUST be **exclusively** the removed chart-instruction text (and, if renamed, no
  textual change at all beyond what was already only the chart removal). `promptSnapshot.test.ts` must pass.
  If the fixture diff shows ANY change other than the chart-section removal, STOP — something else moved.

### P-2A.5 — Living-doc lock-step sync (Architecture Map)
This phase changed mapped areas (`shared/cwfConstants.ts`, `api/cwf/_lib/prompt/**`). Per RULE 20:
- In `public/architecture/diagrams/architecture-map.html`, the Client "Chat" block carries
  `⚠ chart/table content = viz-restore stub (planned)`. Update it to reflect reality: **tables restored
  (rendered from rawToolResults); charts = P-2B**. Bump the diagram's `· v7 → · v8` + its stamp rev.
- Bump `manifest.json` `docVersion` (`rev 2 → rev 3`) and `index.html`'s docVersion span.
- **Manifest seal (two-commit pattern, because this phase mixes code + doc):** commit the code + diagram edits
  first (the guard is WARN-mode, so the interim WARN is tolerated), then a follow-up **seal commit** bumps the
  affected tabs' `lastSyncedCommit` to the code commit's SHA. Architecture Map MUST be re-sealed; re-seal any
  other tab whose `codeAreas` your final diff actually touched (check: Request Lifecycle / LLM Control Surface
  map `api/cwf/_lib/prompt/**` — if your prompt-module diff is below their altitude, bump-with-note; if it's at
  their altitude, update them too). Run `npm run check:doc-drift` after the seal → MUST be `[OK]`.

---

## 4. SELF-VERIFICATION — evidence + the acid test

### Evidence (paste raw output)
```bash
# build + the existing render/parse tests stay green
npm run build
npx vitest run src/lib/__tests__/chatParser.test.ts src/lib/__tests__/tableData.test.ts api/cwf/__tests__/promptSnapshot.test.ts

# the prompt no longer instructs charts; still instructs tables
grep -c "Chart:" shared/cwfConstants.ts            # EXPECT: 0
grep -c "TABLE_FROM_TOOL" shared/cwfConstants.ts   # EXPECT: ≥1

# golden fixture diff is ONLY the chart removal
git --no-pager diff 347e80e -- api/cwf/__tests__/__fixtures__/   # inspect: only chart text removed

# living-doc clean after the seal
npm run check:doc-drift                             # EXPECT: [OK] no drift — all 5 narrative tabs synced
```

### Acid test (the real-data fidelity gate) — run in the running app, paste a screenshot or the rendered DOM
1. Ask a question that triggers an ARMES tool returning a **list** (e.g. a shipments / personnel / daily-OEE-rows query).
2. Confirm the model's reply contained a `[TABLE_FROM_TOOL]` directive with **ZERO rows** (check the raw text / `[ToolRoute]` trace).
3. The chat renders an **interactive sortable grid**: columns auto-derived, `defaultVisible` first, all other columns revealable via the "Columns" panel, sort works.
4. **Fidelity:** the rendered rows equal `message.rawToolResults` exactly — the model supplied no values. (Spot-check 2–3 cells against the "Ham tool çıktısı" raw panel.)
5. **Reload** the conversation → the grid renders identically (rawToolResults re-hydrated), not a stub.
6. **empty ≠ zero:** trigger a tool that returns an EMPTY list → the grid shows an explicit "no rows" state, NOT a `0` and NOT a fabricated row.

Report must state explicitly: backend data path untouched; model emitted zero tool-data rows; empty rendered as empty (not zero); fixture diff was chart-removal-only; `check:doc-drift` OK.

---

## 5. OUT OF SCOPE (do NOT do)

- **Charts of any kind** — `[CHART_FROM_TOOL]`, `[CHART_START]`, retiring the parser's Chart branch, adding a
  chart library/renderer. All P-2B. (This phase only *stops the prompt from emitting* charts; it renders none.)
- **Reshaping `rawToolResults`** or any backend data path. Consume, don't reshape.
- **WARN→FAIL drift-guard escalation** (still deferred — DOC-2 §6 reasoning unchanged).
- **Touching `chatParser.ts`** beyond leaving it as-is.

---

## 6. COMMITS (two: code+doc, then seal)

```
feat(p2a): viz-restore (tables) — render [TABLE_FROM_TOOL]/[TABLE_START] from rawToolResults; retire dead chart macros

- DataTable.tsx: interactive grid (sort + column-visibility) on shadcn primitives (logic harvested from CWF-DEMO)
- MessageChartContent: render table segments from message.rawToolResults via tableData.ts; empty≠zero; charts no-op (P-2B)
- cwfConstants: remove chart instructions (dead-sim + model-typed data="") keep table macros [+ rename CHART_*→TABLE_*]
- prompt golden fixtures regenerated (diff = chart-section removal only); promptSnapshot green
- arch-map v8: viz-restore stub note → tables restored / charts P-2B; docVersion rev 3
- backend data path UNTOUCHED; model emits zero tool-data rows
```
```
chore(p2a): seal architecture-doc manifest to the P-2A commit (lock-step RULE 20)
```

Report the final HEAD short-SHA so the architect can clone-and-diff verify against `347e80e`.
