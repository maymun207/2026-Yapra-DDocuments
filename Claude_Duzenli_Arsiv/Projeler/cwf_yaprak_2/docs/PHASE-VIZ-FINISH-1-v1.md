# PHASE-VIZ-FINISH-1 · v1
<!-- PHASE-VIZ-FINISH-1-v1 · 2026-08-01 · S74 · Architect: Claude.
     Owner mandate: VIZ finishes AS ONE PIECE, never revisited (law S74-1).
     PRECONDITION (S47-1): origin/master == c4a15ea3134abe56cbe9b69500c05a0dcf9aae1b
     · 407 vitest files · 62 migrations · docVersion rev 168 · production
     dpl_GB7Mxibnn5v7btXLP8w1prGcBtmP READY. If master moved, STOP and report. -->

## FINISH DEFINITION (user-eye, the phase's only exit door)

> Every turn that asks for a chart/table either renders correctly or shows an
> honest panel. The user NEVER sees raw directive text, cut JSON, or an
> hourly-dump-labeled-daily. A follow-up chart ask re-calls the DATA tools.
> Sealed by live turn evidence, not by test counts.

## §0 · HARD PRE-FLIGHT (all literal, all evidenced)

1. Fresh clone → `git rev-parse origin/master` must print
   `c4a15ea3134abe56cbe9b69500c05a0dcf9aae1b`. Anything else → STOP, report.
2. `npm ci` clean. Commands verified to exist in package.json at this floor:
   `npm run test` (vitest run) · `npm run lint` (oxlint) ·
   `npm run test:rule26` (playwright) · `npm run typecheck:api`. Use the
   repo's own script names for anything further — grep package.json, never guess.
3. Baseline suite green BEFORE any edit (chunked single-core if needed; record
   the file/test counts you observed — expected 407/4516, arbitrate if it
   differs).

## §1 · PREMISE BLOCK — run every premise AGAINST REALITY before building.
A premise that fails re-binds the design; report the failure, do not silently
patch around it (S72/S73 precedent: this block has caught the Architect twice).

- **P1** `src/lib/chatParser.ts` — the macro regex (~:386) requires CLOSING
  tokens; the dangling-tail guard (~:438-451) searches ONLY
  `\[TABLE_START\]|\[TABLE_FROM_TOOL\]` → an unclosed `[CHART_START]` /
  `[CHART_FROM_TOOL]` dumps raw JSON to the user.
- **P2** All four CLOSED-block branches (~:403-433) fall back to
  `{type:'text', content: match[0]}` on parse-null → invalid closed JSON ALSO
  reaches the user as raw text. Same leak class, second door.
- **P3** `table-loading` renders a static italic "Tablo hazırlanıyor…" line
  (`src/components/ui/cwf/MessageChartContent.tsx` ~:418) with no
  streaming-vs-final distinction: on a truncated FINAL message it would claim
  "preparing" forever.
- **P4** `parseMessageContent` has exactly ONE production caller
  (`MessageChartContent.tsx:394`).
- **P5** `shared/cwfConstants.ts` `VIZ_MACRO_INSTRUCTIONS` already teaches
  FROM_TOOL-preferred + "CHART_START ≤~20 points". Production exhibit (P7)
  proves the soft layer alone cannot close the class. `VIZ_MACRO_TOKENS`
  lockstep is pinned by `promptSegmentGate.test.ts` — all four tokens must
  survive v4 verbatim.
- **P6** `scripts/publishGovernedContent.ts` (PUBLISH-SEAM-1) publishes
  governed prompt segments from an Architect-authored job file
  (`promptSegments: [{segmentId, text}]`), subcommands
  plan → stage → golden → publish; `golden` REFUSES without
  `--consent-tokens`. Verify the viz segment's actual `segmentId` from the
  seed/DB path (`scripts/seedPromptSegments.ts`) — the seam doc's example
  says `"viz"`; confirm, never assume.
- **P7 (production exhibit, Architect-read 2026-08-01):** trace `5481b4f2`,
  01:18:43Z, `[LLMFinish] provider=gemini model=gemini-2.5-flash
  finishReason=length output=17395 … TRUNCATED` with `maxOutputTokens=16384`;
  the model emitted `[CHART_START]` carrying ~148 hourly points × 7 series
  verbatim (ignoring P5's teaching), the directive died unclosed mid-JSON, the
  user saw raw text. Data side was healthy: `[ToolResult]
  getOeeValuesForZones: elements=148 returned=148 truncated=false`.
- **P8** Playwright e2e family exists: `e2e/chart-axis.spec.ts`,
  `e2e/chart-uplift.spec.ts` — the new spec joins this family.
- **P9** F160 closed at S73 with e2e evidence that multi-series charts from
  the zone-keyed `getOeeValuesForZones` shape RENDER via the from-tool path.
  Locate that passing e2e and lift its exact directive as the taught example
  in §6-A (slot `«F160_EXAMPLE»`). If P9 fails (no such passing e2e), STOP —
  the dialect teaching would be fighting a capability gap; report instead.

## §2 · BINDING CONSTRAINTS

- ONE branch, merge `--no-ff` (squash banned), CI on PR head is the sole test
  arbiter (S37-2).
- **Leak-class ruling (do not "improve" it):** the parser must NEVER surface
  raw directive text. But a COMPLETE, VALID, oversized `[CHART_START]` still
  RENDERS — no size-based rejection in the parser. Rationale: a size-reject
  falling back to any panel converts working truth into refusal; the leak
  doors are (a) unclosed and (b) invalid, and only those become panels. Size
  is governed at the soft layer (§6-A) + by the dialect. Record this ruling in
  the code comment at the guard.
- Panel/fallback strings byte-pinned OUTSIDE the lib, following the
  VIZ-UPLIFT-1 convention (find the existing fallback-string home and join it).
- 0-byte pins: chart math/axis/clock tests and e2e from TABLE-1/UPLIFT-1/
  MATCH-ARRAY-1 stay byte-identical, EXCEPT the two files this phase
  deliberately re-specifies: `src/components/ui/__tests__/messageChartFallbacks.test.tsx`
  and the chatParser unit tests — their diffs are disclosed in the report.
- RULE-26: every new panel rendered-evidenced at 1280 AND 1024, nothing clips.
- No migrations. No secrets read or echoed (ADR-007). Zero `messages` writes
  (C1). Floor+publish lockstep: the SAME §6-A body lands in
  `VIZ_MACRO_INSTRUCTIONS` (code floor) and in the governed publish (G5) —
  byte-identical, one source in this artifact.
- Turkish user-facing strings carry the existing bilingual pattern
  ("Tablo hazırlanıyor… · preparing table…" style).

## §3 · GATES (in order; each gate's evidence lands in the report before the next opens)

**G0 — FAILURE-SURFACE INVENTORY (the spine).** The table in §6-D is the
phase's map. Fill the Evidence column for every row (file:line / test name /
e2e name / segment line). A row left without BOTH a mechanism and a pinned
proof at close = the phase FAILS. Rows marked [done] get a one-line
verification that they still hold at this floor (no rebuild).

**G1 — DANGLING GUARD, ALL FOUR TOKENS (deterministic; closes leak door a).**
- Extend the dangling-tail detection to all four OPEN tokens.
- `parseMessageContent(content, opts?: { final?: boolean })`:
  - streaming (final !== true): dangling → loading placeholder segment
    (tables keep `table-loading`; charts gain the mirror kind).
  - **final: dangling → `viz-truncated` segment** → honest panel: the answer
    was cut before the chart/table completed; raw bytes preserved on the
    segment for Inspect, NEVER rendered.
- Wire `final` from the one caller chain (P4): `ChatShell` knows which
  message is in flight; completed messages pass `final: true`.
- Tests: unit — each of the four tokens × {streaming, final}; PLUS the
  verbatim production head-bytes fixture (§6-C) parsed with `final: true`
  must yield exactly [text, viz-truncated] and ZERO raw-JSON text segments.
  Red-then-green demanded: show the fixture failing on the pre-G1 parser.
- e2e (`e2e/viz-finish-evidence.spec.ts`): a final message with an unclosed
  CHART_START renders the honest panel; screenshot at 1280+1024.

**G2 — INVALID-CLOSED-BLOCK HONESTY (deterministic; closes leak door b).**
- All four parse-null branches: `{type:'text', content: match[0]}` →
  `viz-invalid` segment → honest panel (directive present but unusable; raw
  preserved for Inspect only).
- Deliberate re-spec of `messageChartFallbacks.test.tsx` + chatParser tests;
  disclose every changed expectation in the report.
- e2e: closed-but-garbage CHART_FROM_TOOL → panel, no raw text.

**G3 — DATE-PREFIX ELISION (parked cosmetic, folded in).** Column-aware
elision of a repeated date prefix in table cells (S73 §4f exhibit: "2026-07-31 "
×19). Applies at render only; sort stays on raw values; title carries the
full date context (TABLE-1 conventions). Unit test with the exhibit shape.

**G4 — (renumbered into G1/G2 tests; intentionally empty — do not invent work.)**

**G5 — VIZ SEGMENT v4 (soft layer; frequency-reducer, NOT the class-closer).**
- Replace `VIZ_MACRO_INSTRUCTIONS` body with §6-A (fill `«F160_EXAMPLE»` per
  P9; show the substitution in the report). `VIZ_MACRO_TOKENS` all present →
  `promptSegmentGate.test.ts` green.
- Write §6-B job file into the branch (path of your choosing under a jobs/
  or fixtures/ home consistent with repo layout), then run the seam:
  `plan` → `stage` → `golden --consent-tokens <n>` → `publish`, `--as` the
  owner identity relayed with this prompt. **`golden` consent: the OWNER
  states the token consent in YOUR channel** (S54-4) — do not run golden
  before that line arrives; quote it in the report.
- Evidence: the gate verdict line (`[Gate] action=publish … verdict=published`)
  read back and pasted; segment version noted.

**G6 — LIVE WITNESSES + DOC.**
- Deploy to production (merge per §5 first if review is GO; otherwise witness
  on the preview matching the branch head and re-witness post-merge).
- **W1:** re-ask the exhibit verbatim: *"KB7 – Haftalık OEE Trendi (Hat
  Bazlı) ve gun bazinda"*. Expected: a rendered chart at the requested grain
  (daily aggregate or from-tool) OR an honest panel — NEVER raw directive
  text. Capture screenshot + the turn's log lines (finishReason, directive
  kind used).
- **W2:** a follow-up chart ask in the same conversation re-calls the DATA
  tool (F166-A) — log line evidence (`getOeeValuesForZones` or equivalent
  present in the follow-up turn).
- CHANGELOG + KB entries; run the drift gate; if a mapped area changed,
  reseal + docVersion bump IN THE SAME COMMIT (two-commit pattern for mixed
  code+doc).

## §4 · SELF-VERIFY (literal evidence or it did not happen)

1. `git rev-parse` of branch head + files-changed list.
2. Full suite counts before/after (before expected 407/4516; after = report
   exact), lint clean, typecheck clean — true exit codes, never through a pipe.
3. §6-C fixture red-then-green diff shown.
4. Every §6-D row's Evidence cell filled.
5. RULE-26 screenshots (each new panel, 1280+1024).
6. Gate verdict line for the segment publish + the quoted owner consent line.
7. W1/W2 screenshots + log excerpts with trace ids.
8. Confirmation that TABLE-1/UPLIFT-1/MATCH-ARRAY-1 pinned tests are 0-byte
   (list them) and the two allowed files' diffs are disclosed.

## §5 · MERGE (message VERBATIM — S30-2)

```
Merge PHASE VIZ-FINISH-1: the leak class closes at the parser, the teaching
sharpens above it — a directive that cannot finish becomes an honest panel,
never the user's problem
```

TAIL ANCHOR (S61-3): after pushing, report the remote merge hash and the
phrase **VIZ-FINISH-1 TAIL: leak doors a+b closed, inventory complete**. A
report missing the anchor is treated as truncated.

---

## §6 · PAYLOADS

### §6-A · VIZ_MACRO_INSTRUCTIONS — v4 FULL BODY (floor + publish, byte-identical)

Take the CURRENT body verbatim and apply EXACTLY these edits (show the final
diff in the report; everything not listed stays byte-identical):

**A1 — In "## Charts (line / bar)" intro, after the two-tier sentence, ADD:**

```
⏱️ GRANULARITY: chart at the grain the user asked for. "gün bazında/daily"
over a week = ~7 points per series, NEVER the hourly dump. If the tool
returns finer data than asked: prefer [CHART_FROM_TOOL] when a matching
field exists; otherwise compute the aggregate yourself (e.g. daily averages)
and emit a SMALL [CHART_START] (≤~20 points/series). An hourly dump labeled
"günlük" is wrong twice: wrong grain AND it will not fit your output budget.
```

**A2 — In "### 2) … [CHART_START]" rules, REPLACE the line
"- Each point is { \"label\": …. Keep it small; for anything larger or tool-sourced, use [CHART_FROM_TOOL]."
WITH:**

```
- Each point is { "label": "<x>", "value": <number> }. HARD LIMIT ~20 points
  per series. NEVER copy tool-result numbers into [CHART_START] — that is
  what [CHART_FROM_TOOL] is for. A real failure from this factory
  (2026-08-01): a model pasted 148 hourly points × 7 series into
  [CHART_START]; the answer hit the output-token ceiling and was CUT
  mid-JSON — the user got no chart at all. The tiny [CHART_FROM_TOOL]
  directive would have rendered the same chart in ~15 lines.
```

**A3 — After the CHART_FROM_TOOL "Rules" list, ADD (fill the slot per P9):**

```
- Zone-keyed results (e.g. getOeeValuesForZones returning { "<zoneId>":
  [records…] }) chart fine through this path — a production-proven example:
«F160_EXAMPLE»
  Use the EXACT field names from the raw result (timestamp, oee, …) — never
  invented ones.
```

**A4 — At the end of the "## Charts" section, ADD:**

```
### Follow-ups, clocks, and honesty
- 🔁 A follow-up that changes the chart (new grain, new lines, new window)
  MUST re-call the DATA tool(s). Re-resolving the time range or line list is
  NOT enough — without a fresh data call the frontend has nothing to plot
  and shows honest "no data" panels.
- 🕐 When you state the resolved window in prose, attribute the clock
  correctly: resolve_time_range's startISO/endISO are UTC — either convert
  to the user's timezone or label them UTC. Never print UTC bytes with an
  "(Europe/Istanbul)" label.
- 🗣️ Never narrate a chart that is not there. If a directive could not be
  emitted or data is missing, SAY that; the panel and your prose must agree.
```

### §6-B · GOVERNED PUBLISH JOB (values final except the two marked slots)

```json
{
  "promptSegments": [
    {
      "segmentId": "«VERIFIED_SEGMENT_ID_P6»",
      "text": "«THE FULL §6-A v4 BODY — byte-identical to the cwfConstants floor text after A1–A4»"
    }
  ]
}
```

### §6-C · VERBATIM PRODUCTION HEAD-BYTES FIXTURE (trace 5481b4f2)

Construct the fixture as: the text below VERBATIM, followed by NO closing
token (EOF exactly where production stopped — mid-object). Store as a test
fixture file; the unit test parses it with `final: true`.

```
KB7 fabrikasının son bir haftalık OEE değerlerini hat bazında ve günlük olarak aşağıda bulabilirsiniz.

İstenen zaman aralığı: 2026-07-25 21:00:00 - 2026-08-01 20:59:59 (Europe/Istanbul) olarak çözümlenmiştir.

[CHART_START]
{
"type": "line",
"title": "KB7 Hat Bazında Haftalık OEE Trendi",
"x": "Zaman",
"series": [
{ "name": "Glazur2", "points": [{"label": "26 Tem 00:00", "value": 85}, {"label": "26 Tem 01:00", "value": 77}, {"label": "26 Tem 02:00", "value": 83}] },
{ "name": "IKINCILUST", "points": [{"label": "26 Tem 00:00", "value": 90}, {"label":
```

### §6-D · FAILURE-SURFACE INVENTORY (fill Evidence; empty cell = phase fails)

| # | Lifecycle step | Failure class | Mechanism (layer) | Evidence |
|---|---|---|---|---|
| 1 | Model decides to chart | skips viz on follow-up (F166) | §6-A A4 teaching (soft) + W2 witness | |
| 2 | Model picks dialect | verbose dialect on tool data | §6-A A2 negative example (soft) | |
| 3 | Model sizes output | grain ignored / point dump | §6-A A1 (soft); cause-side deterministic fix considered & REJECTED (mid-stream intervention — fragile), ruling recorded | |
| 4 | Stream ends | directive UNCLOSED → raw leak | G1 dangling guard, final→`viz-truncated` (deterministic) | |
| 5 | Closed block parses | invalid JSON → raw leak | G2 `viz-invalid` panel (deterministic) | |
| 6 | Directive→call binding | match miss / ambiguity | [done] F111b + MATCH-ARRAY-1 + honest "which one?" panel — verify still pinned | |
| 7 | Data layer | empty/partial/non-numeric | [done] F209 fallbacks byte-pinned — verify | |
| 8 | Render layer | clock, labels, clip, multi-series | [done] TABLE-1/UPLIFT-1 (ONE clock, RULE-26) — verify | |
| 9 | Prose vs render | narrated ghost chart | §6-A A4 dissonance rule (soft) + panels make truth visible | |
| 10 | Table cosmetics | repeated date prefix | G3 elision (deterministic render) | |

<!-- END · PHASE-VIZ-FINISH-1-v1 · 2026-08-01 · S74 ·
     precondition c4a15ea3 · finish definition is the only exit -->
