# PHASE-VIZ-FINISH-1-FIX-1 · v1_1
<!-- PHASE-VIZ-FINISH-1-FIX-1-v1_1 · 2026-08-01 · S74 · Architect: Claude.
     Supersedes v1 (unrelayed; folded the owner's W2 exhibit per S37-1).
     SAME PROGRAM (S74-1): VIZ-FINISH-1 stays open; this fix rides inside it.
     PRECONDITION (S47-1): origin/master == 86569a1e7b3ee82afcae92aed2c348edb3a3575a
     · 408 vitest files · docVersion rev 169 · production dpl_DA7FVHcV… READY.
     The v4 segment publish has NOT run yet ([Gate] absent in prod logs through
     03:05Z) — it is REPLACED by the single v4.1 publish in G4 here. -->

## WHY (witness evidence, Architect-read)

W1 (trace `eb8e178b`, 02:58:33Z, dep `dpl_DA7FVHcV`): leak closure HELD
(finishReason=stop; FROM_TOOL dialect; chart rendered; honest Glazur1 prose;
125 hourly pts × 7 zones). But the finish definition failed twice:
1. **CHART-TIME-AXIS-1 (NEW, render layer):** the zone-keyed multi-series
   chart drew as ~7 concatenated per-zone bands; x ticks showed the SAME
   label five times ("07-27 00:59" ×5). F160's e2e asserted "one chart",
   never tick sanity or time-join — too weak, upgraded here.
1b. **W2 exhibit (owner screenshot ~03:08Z) CONFIRMS the mechanism:** the
   2-zone follow-up chart shows ticks `07-27 00:59 → 07-28 18:59 →
   07-30 12:59 → 07-27 00:59 → 07-28 18:59 → 08-01 05:59` — time RESTARTS
   mid-axis: two concatenated per-zone bands, each spanning the week. Also
   two good-behavior witnesses banked pre-teaching: the follow-up RE-CALLED
   the data tool (evidence chip `getOeeValuesForZones ×1` — F166-A held),
   and the prose again claimed "günlük" over hourly points (dissonance
   exhibit #2 — no new work; v4.1's 🗣️ rule covers it).
2. **Grain still ignored** ("gün bazında" → hourly). Teaching wasn't
   published yet, but the deeper defect is the design: v4's A1 asked the
   model to hand-compute daily averages into CHART_START — fragile AND it
   re-types numbers, against the fidelity spine. Grain becomes DETERMINISTIC
   here; teaching only points at it.

## §1 · PREMISES (run against reality; a failed premise re-binds the design)

- **P1** `src/lib/chartData.ts` cross-group builder joins rows via
  `rowIndexByLabel` keyed on `String(row[x])` — a FORMATTED label string
  (~:186-207).
- **P2 (mechanism — now DOUBLE-witnessed, still reproduce first):** per-zone
  timestamps differ sub-minute (`…771037` vs `…770850`, 01:05Z logs) and
  the derived label strings do not collide across zones (suspect: seconds
  precision), so rows never join → concatenated bands. The W2 tick-restart
  pattern (07-27 → 07-30 → 07-27 again) is the visible signature. STILL
  reproduce with two zones' verbatim records; if labels DO join in your
  repro, find the real divergence and report before building.
- **P3** `MessageChart.tsx` XAxis is category-typed: `dataKey="__x"`,
  `interval={0}`, custom `XTick` with precomputed `visibleTickIndices` /
  `displayCategories` (~:246-253).
- **P4** `src/lib/timeFormat.ts` is the ONE clock (`looksLikeEpochMs`,
  `zonedParts`, `zonedDateKey`, `zonedHourMinute`, `DISPLAY_TIMEZONE`,
  `looksLikeIsoDate`) — every new time decision in this fix calls THIS
  family; no new Date(string), no second clock.
- **P5** The VIZ-FINISH-1 job file is merged but unpublished; SEG_MAX=8000,
  v4 body was 7713 — v4.1 edits must stay under 8000 (measure, report).
- **P6** VIZ-UPLIFT-1 conventions hold: fallback strings byte-pinned outside
  the lib; animations off; chart-branch jsdom pins at props boundary; e2e
  owns pixels.

## §2 · CONSTRAINTS

- Parent phase's constraints carry (0-byte pins on TABLE-1/UPLIFT-1/
  MATCH-ARRAY-1 surfaces except files this fix names; RULE-26; --no-ff;
  CI arbiter; no migrations; no secrets).
- **Aggregation is REAL math on REAL tool records, disclosed** — the bucket
  subtitle states the operation ("günlük ortalama · daily mean"). A bucket
  with zero records is a GAP (missing), never 0 (empty≠zero).
- Bucket boundaries are computed in `DISPLAY_TIMEZONE` via the ONE clock
  (a "day" is an Istanbul day).
- The time-join fix must keep the honest-gap semantics: a zone with no
  record in a bucket contributes null (gap in the line), never interpolation.

## §3 · GATES

**G1 — TIME-JOIN + TIME AXIS (kills CHART-TIME-AXIS-1).**
When the x field's values look like epoch-ms or ISO dates (P4 detectors):
- Join across records/groups by TIME BUCKET KEY (minute-floor by default),
  never by formatted string.
- Ticks: choose density from the span (>3 days → day ticks "27 Tem";
  ≤2 days → hour ticks), labels via the ONE clock, first tick may carry the
  fuller context (TABLE-1 title convention).
- Non-time x values: behavior byte-identical to today (category join by
  string) — pin with a test.
- Unit tests: two-zone verbatim-log fixture joins to ONE row per minute;
  tick labels ALL DISTINCT **and STRICTLY TIME-INCREASING left→right** for a
  7-day span (the W2 restart pattern is the negative exhibit — encode it:
  a two-band input must come out as one monotonic axis); non-time
  regression pin.

**G2 — DETERMINISTIC GRAIN: `"bucket"` in chart-from-tool directives.**
- Optional `"bucket": "day" | "hour"` parsed in `parseChartFromTool`
  (unknown values ignored + disclosed in the report, never a parse failure).
- chartData: per-series MEAN per zoned bucket; point count = bucket count;
  empty bucket → null gap; subtitle discloses the operation bilingually.
- Tests: 125-hourly-records fixture + bucket:day → exactly the span's day
  count of points, means hand-verified for two buckets in the test.

**G3 — DENSE-SERIES PIXELS (demo-parity look, recharts-only).**
- Dots hidden when a series exceeds ~50 points; line smoothing per the
  existing `type="monotone"`; colors/legend untouched.
- e2e upgrade (this file may change: the F160/chart e2e assertions):
  tick labels DISTINCT + MONOTONIC in time + every series' rendered
  x-extent spans the data's full range (band-artifact guard) + RULE-26 at
  1280/1024.

**G4 — v4.1 TEACHING + THE SINGLE PUBLISH.**
- Amend the merged job text + `VIZ_MACRO_INSTRUCTIONS` floor (byte-identical
  pair) — A1 REPLACED with:

```
⏱️ GRANULARITY: chart at the grain the user asked for. For tool data, do it
with ONE field: add "bucket": "day" (or "hour") to [CHART_FROM_TOOL] — the
frontend aggregates the raw records deterministically and labels the chart
with the operation. NEVER hand-compute averages from tool output into
[CHART_START]; you would be re-typing numbers. [CHART_START] stays only for
genuinely self-computed small data (≤~20 points/series).
```

- Body stays < 8000 (P5; measure and report the byte count).
- Publish via PUBLISH-SEAM-1: stage → golden (owner's S54-4 consent line,
  quoted) → publish, `--as ksadmin@ardictech.com`; paste the
  `[Gate] … verdict=published` line.

**G5 — LIVE RE-WITNESS (the finish definition's seal).**
- W1′: the verbatim ask again → expected: daily-grain multi-line chart
  (bucket path) with distinct day ticks — the Image-2 look on OUR truth
  surface; Architect reads the turn log (directive kind, bucket field,
  finishReason).
- W2′: follow-up chart ask in the same conversation → fresh data-tool call
  in the log AND both series joined on one monotonic axis. (The BEHAVIOR
  half is already double-witnessed pre-teaching — 01:18Z and ~03:08Z chips
  both show the re-call; W2′ seals the RENDER half.)
- CHANGELOG + KB; drift gate; reseal + docVersion bump in-commit if mapped
  areas moved.

## §4 · SELF-VERIFY
Branch head hash · suite before/after with true exits · P2 verification
verbatim (the repro's label strings shown) · G1/G2 test names + the two
hand-verified bucket means · e2e distinctness+extent assertions quoted ·
v4.1 byte count · gate verdict line · owner consent line quoted ·
RULE-26 screenshots · 0-byte pin list.

## §5 · MERGE (verbatim)

```
Merge PHASE VIZ-FINISH-1-FIX-1: time joins on time, grain becomes a field,
and the week finally reads left to right
```

TAIL ANCHOR: **FIX-1 TAIL: time-axis joined, bucket live, publish sealed** +
remote merge hash.

<!-- END · PHASE-VIZ-FINISH-1-FIX-1-v1_1 · 2026-08-01 ·
     precondition 86569a1e · same program, same finish definition -->
