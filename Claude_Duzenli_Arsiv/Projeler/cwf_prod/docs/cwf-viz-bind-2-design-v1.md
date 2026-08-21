# CWF — VIZ-BIND-2 Design Note: Render-All-Labelled for Multi-Group Results

<!-- cwf-viz-bind-2-design-v1 · rev 1 · 2026-07-17 · Architect lane -->
<!-- PLATINUM compliance: zero configuration, zero migration, zero publish.
     Client-only deterministic transforms; one merge+deploy activates. -->

## 0 · The product failure (owner live test, 2026-07-17 09:14Z, trace 2032bf00)

"tum hatlari tek bir grafikde cizelim" reached the right tool (SR1-W3b fixed
reachability): `getOeeValuesForZones` returned 7 keyed groups. The user got:
a GroupAmbiguousPanel ("Bu sonuç 7 etiketli grup içeriyor…"), series keys as
raw zone UUIDs, and the model dictating a UUID→name legend in prose. The
plumbing was honest; the product did not deliver the chart the user asked for.

Root cause: VIZ-BIND-1/F82 named the fix direction "render all, labelled, OR
state the ambiguity honestly" — only the honesty branch was built. When the
result's groups ARE the requested series (a multi-zone comparison), showing
all of them is not a guess: it is the only rendering that contains no choice
at all. The panel is the right answer to "which one?"; it is the wrong answer
to "all of them."

## 1 · Design

### D1 — groups → multi-series (charts)
In `MessageChartContent`, when `sliceRecordGroups` yields `groupAmbiguous`
for a CHART directive whose type supports multiple series (line/bar):
deterministic transform `groupsToMultiSeries(groups, directive, labelMap)` —
each group key becomes one series; the directive's x/y field names apply
per-group exactly as they do in the `sliced` path today; series name =
`labelMap.get(key) ?? key`. `MessageChart`'s existing multi-series model +
legend renders it (no chart-component change expected).

**Law (no silent drops):** every group key becomes a series or is named in a
visible note — a key may never vanish. Empty-array groups render through the
chart's existing empty semantics (all-null series = gap, never 0) — the
empty≠zero render doctrine is load-bearing here, not decorative.

**Cap:** `MAX_CHART_SERIES = 12` (named code constant, register candidate for
a future governed param). Above cap OR non-series-capable chart type → the
existing panel, now with labelled keys (D2).

### D2 — deterministic turn-scoped label map (kills F87's raw UUIDs here)
`buildTurnLabelMap(rawToolResults)`: scan ALL same-turn results for record
arrays exposing an id-like + name-like pair (`zoneId|id` + `name`), collect
`id → name`. Pure code, zero model trust — in the failing turn the map is
fully present in the same turn's `getFactoryLines` result. Applied to: chart
series names (D1), `GroupAmbiguousPanel` keys (both consumers,
MessageChartContent.tsx:210 and :257), and the table path (D3). Unresolved
ids render as the raw key — honest, never invented.

### D3 — multi-group tables
`[TABLE_FROM_TOOL]` on a `groupAmbiguous` slice: one concatenated table with
a leading "Grup" column carrying the resolved label per row-group. Same
transform family, same no-silent-drop law.

### D4 — evidence/warning chip language (F137, folded per batch rule)
The tool-evidence line and zero-evidence warning rendered English on Turkish
turns while the ambiguity panel rendered bilingual. Fix: the chips consume
the SAME language-selection mechanism the bilingual panel uses (AG verifies
the actual mechanism in code — S49-1 — and states it; no new i18n machinery).

## 2 · Explicitly rejected
- LLM-side fix ("tell the model to emit per-zone directives") — moves a
  deterministic render concern into model trust; VIZ-BIND-1's whole point.
- Intent detection ("did the user say 'all'?") — text-intent parsing in the
  renderer is model-trust by the back door. Render-all needs no intent: it is
  choice-free.
- Dropping the panel — it remains the honest fallback above cap / for
  non-series chart types / for genuinely single-slot directives.

## 3 · Ledger (register v52)
- **F136** fixed-by VIZ-BIND-2 (D1+D2+D3). Evidence: trace 2032bf00.
- **F87** partially closed (viz surfaces); admin-panel raw UUIDs remain open.
- **F137** fixed-by VIZ-BIND-2 (D4).
- VIZ-BIND-1's never-guess law UNTOUCHED: `resolveToolBinding` (call-level
  ambiguity) is out of scope; only the group-level render path changes.

## 4 · Verified code facts (S49-1)
- `sliceRecordGroups` → `flat | sliced | groupAmbiguous{keys,groups}` —
  toolResultSelect.ts:144,160-170.
- `groupAmbiguous` consumed ONLY at MessageChartContent.tsx:210 (table) and
  :257 (chart) — the two seams to change.
- `MessageChart` model: `series: Array<{name, values(number|null)[]}>`,
  legend at series.length>1, missing label = null never 0 —
  MessageChart.tsx:34,48,78,134. Multi-series capability pre-exists.
- Chart directive carries field NAMES + type + title (chartData.ts:4);
  per-group application reuses the existing record→series mapping.
- Chip strings live in chatSurface.ts (Kanıt/Evidence entries, SR1-W3b).

<!-- END · cwf-viz-bind-2-design-v1 · rev 1 · 2026-07-17 -->
