# CWF — viz v3 Prompt-Segment Edit Set · v1

<!-- cwf-viz-v3-segment-edit-v1 · rev 1 · 2026-07-15 · Architect-authored.
     Segment: prompt.segment `viz` (published rev: v2, golden-gated). This edit set
     is PUBLISH PAYLOAD ONLY (DB-first): the code floor (shared/cwfConstants.ts
     VIZ_MACRO_INSTRUCTIONS) stays at v2 — an outage serves v2, which is honest
     (triggers the which-group panel, never a lie). Floor sync folds into the next
     shared-touching FULL phase (register small-item).
     BATCHING (trap #3): this is edit 1 of 3 in the ONE golden run (~10M + one
     Consent) — batched with b1_scope v2 (F83.1+F110) and SUPERSET-SERVE-1.
     GATE NOTE: all four VIZ_MACRO_TOKENS preserved verbatim ([TABLE_FROM_TOOL],
     [TABLE_START], [CHART_FROM_TOOL], [CHART_START]) — L2 behavioral gate green
     by construction.
     PLATINUM: teaches the model an automatic emission rule; creates no manual
     step. The renderer stays honest with OR without the model complying. -->

## 1 · What changes (diff summary — two targeted insertions, ~130 words added)

**Closes:** F111 emission side (renderer side CLOSED@86a2333 VIZ-BIND-2) + the
documented mismatched-key edge (model is told: key name irrelevant, VALUE must
equal the entity id — array-inclusion makes the same line work at call-selection).

**D1 — Table section, extend the existing multi-call ⚠️ with a GROUP-SHAPED rule**
(inserted immediately after "…shows an honest \"which one?\" panel instead of a
table — it never guesses."):

> - ⚠️ GROUP-SHAPED results: some tools return ONE result keyed by entity id —
>   e.g. getOeeValuesForZones returns { "<zoneUuid>": [records…], "<zoneUuid>":
>   [records…] }. If you present each entity under its own heading, EVERY
>   [TABLE_FROM_TOOL]/[CHART_FROM_TOOL] directive MUST carry "match" whose VALUE
>   is that entity's exact key — the same id you passed in your call args, e.g.
>   "match": { "zoneId": "6d432a3b-c50e-11f0-8832-02420a000166" }. One call,
>   several directives, one match each. The key NAME inside match does not
>   matter; the VALUE must equal the group key EXACTLY (full id, never
>   shortened). If the result has only ONE group, match is optional — the
>   frontend derives it automatically. Without a match on a multi-group result
>   the frontend shows an honest "which group?" panel — it never guesses.

**D2 — Chart section, extend the existing ⚠️ pointer** (replacing its final
"— see the table rules above." with):

> — see the table rules above, including GROUP-SHAPED results (one directive per
> zone/entity, "match" value = that entity's exact id key).

Everything else byte-identical to v2.

## 2 · Full v3 segment content (the publish payload — paste as the segment body)

```
## Interactive Data Tables (USE INSTEAD OF MARKDOWN TABLES)
🚫 NEVER write a markdown table (any line containing pipe characters like "| Gün | OEE |"). The instant you are about to produce a row/column table, you MUST emit a table macro instead. This is ABSOLUTE and applies to EVERY tabular thing — tool result lists AND small summaries you computed yourself (e.g. a 7-row daily OEE table next to a chart). A markdown table is a rendering bug for this app; the macro produces a real interactive grid the user can sort and column-toggle.

Do NOT print a markdown table header or separator row (e.g. "| Gün | OEE |" or "|---|---|") before or instead of the macro — emit ONLY the macro block for the data; a short prose title line above it is fine.

There are TWO macros — pick by where the data came from:

### 1) PREFERRED for tool/MCP data: [TABLE_FROM_TOOL] (NO rows in your output!)
If the rows come from a tool result you just called (shipments, materials, personnel, etc.), DO NOT paste the rows. The frontend already has the raw tool output. Emit ONLY a tiny directive; the grid is built from the raw data automatically, with ALL columns. This avoids truncation and is the ONLY reliable way for big / many-column lists.
[TABLE_FROM_TOOL]
{
  "tool": "<tool name you called, e.g. listShipments>",
  "title": "<short title>",
  "defaultVisible": ["operationalFactoryName", "materialDescription", "amount", "fromPersonnelName", "toPersonnelName"]
}
[TABLE_END_FROM_TOOL]
Rules:
- "tool": the name of the tool whose result to tabulate (omit to use the most recent result).
- "defaultVisible": the useful subset shown first (other columns are auto-included and revealable via the "Columns" panel). The frontend derives ALL columns from the raw data — you NEVER list rows, so "show all columns without reducing" just works.
- Optional "columns": only to rename headers or surface a nested value via a dot-path field, e.g. { "field": "reports.0.status", "header": "Kalite" }. Otherwise omit and let columns auto-derive.
- This is tiny — it never truncates. Use it for ANY tool-sourced list, especially large ones.
- ⚠️ If you call the SAME tool more than once in this answer (e.g. once per line/factory) and emit more than one [TABLE_FROM_TOOL]/[CHART_FROM_TOOL] for it, each directive MUST also carry "match": an object with the arg(s) that identify WHICH call you mean, e.g. "match": { "zoneId": "eee1-42" }. Without it, the frontend cannot tell your calls apart and shows an honest "which one?" panel instead of a table — it never guesses.
- ⚠️ GROUP-SHAPED results: some tools return ONE result keyed by entity id — e.g. getOeeValuesForZones returns { "<zoneUuid>": [records…], "<zoneUuid>": [records…] }. If you present each entity under its own heading, EVERY [TABLE_FROM_TOOL]/[CHART_FROM_TOOL] directive MUST carry "match" whose VALUE is that entity's exact key — the same id you passed in your call args, e.g. "match": { "zoneId": "6d432a3b-c50e-11f0-8832-02420a000166" }. One call, several directives, one match each. The key NAME inside match does not matter; the VALUE must equal the group key EXACTLY (full id, never shortened). If the result has only ONE group, match is optional — the frontend derives it automatically. Without a match on a multi-group result the frontend shows an honest "which group?" panel — it never guesses.

### 2) For SMALL data YOU computed yourself (not from a tool): [TABLE_START]
Only when you have a handful of rows you produced (not a tool result). Body is STRICT JSON with explicit rows:
[TABLE_START]
{ "title": "<title>", "columns": [{ "field": "name", "header": "Ad" }, { "field": "value", "header": "Deger", "type": "number" }], "defaultVisible": ["name", "value"], "rows": [{ "name": "X", "value": 5 }] }
[TABLE_END]
- Use scalar values only (string/number) — NO nested objects, NO stringified JSON in cells.
- Keep it small (max ~15 rows). For anything larger or tool-sourced, use [TABLE_FROM_TOOL] instead.
- JSON must be valid: double quotes only (NEVER single quotes), true/false/null (NEVER Python True/None), no trailing commas, no comments.

## Charts (line / bar)
For a trend or comparison over a series (e.g. daily OEE, hourly throughput), draw a chart. Same two-tier rule as tables — pick by where the numbers came from. You NEVER type the numeric data into a chart: the frontend plots the values from the raw tool output. The old [Chart:…] tag forms (the dead station / parameter / metric / inline-data variants) are GONE — never emit them.

### 1) PREFERRED for tool data: [CHART_FROM_TOOL] (NO numbers in your output!)
If the values come from a tool result you just called, emit ONLY a tiny directive with FIELD NAMES — never any data points. The frontend reads the raw records and plots record[x] against each record[series].
[CHART_FROM_TOOL]
{
  "tool": "<tool name you called, e.g. getDailyOeeValues>",
  "type": "line",
  "title": "<short title>",
  "x": "<field for the x-axis label, e.g. day>",
  "series": ["<numeric field>", "<another numeric field>"]
}
[CHART_END_FROM_TOOL]
Rules:
- "tool": the tool whose result to plot (omit to use the most recent result).
- "type": "line" (trend over time) or "bar" (compare discrete categories).
- "x": the record field used as the x-axis label. "series": one or more NUMERIC record fields to plot.
- You type ZERO numbers — only field names. If a series field is empty or non-numeric, the frontend shows an honest "no data" / "not chartable" note (it NEVER invents a 0).
- ⚠️ Calling the SAME tool more than once for different data (per line/factory) and emitting several [CHART_FROM_TOOL]/[TABLE_FROM_TOOL] for it? Add "match" to each, e.g. "match": { "zoneId": "eee1-42" } — see the table rules above, including GROUP-SHAPED results (one directive per zone/entity, "match" value = that entity's exact id key).

### 2) For SMALL data YOU computed yourself (not from a tool): [CHART_START]
Only when you have a handful of points you produced (not a tool result). Body is STRICT JSON with explicit points (≤~20):
[CHART_START]
{ "type": "bar", "title": "<title>", "x": "<x-axis name>", "series": [{ "name": "<series name>", "points": [{ "label": "Oca", "value": 5 }, { "label": "Şub", "value": 8 }] }] }
[CHART_END]
- Each point is { "label": "<x>", "value": <number> }. Keep it small; for anything larger or tool-sourced, use [CHART_FROM_TOOL].
- JSON must be valid: double quotes only (NEVER single quotes), real numbers for "value" (NEVER strings), no trailing commas, no comments.

### Showing RAW tool output
If the user asks to see the raw/unmodified tool result, DO NOT paste the JSON in your reply (it is slow and may be cut off). Tell them to expand the "Ham tool ciktisi" panel shown under your message — it contains the exact, full result.
```

## 3 · Acceptance evidence (post-publish, on the golden run + first live A3-class probe)
- Golden gate SCHEMA/REFERENTIAL/BEHAVIORAL green (all four VIZ_MACRO_TOKENS
  present — behavioral by construction).
- Live probe: a multi-zone ForZones question renders per-zone charts (match
  emitted, slices derived) — the F111 anecdote's exact query is the test.
- Regression probe: a deliberately match-less multi-group render still lands on
  the honest which-group panel (renderer discipline unchanged).

<!-- END · cwf-viz-v3-segment-edit-v1 · rev 1 · 2026-07-15 -->
