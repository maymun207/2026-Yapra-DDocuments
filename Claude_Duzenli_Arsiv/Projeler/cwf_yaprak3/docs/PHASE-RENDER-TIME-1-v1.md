# PHASE-RENDER-TIME-1 · v1 — the readable table the user asked for four times

<!-- PHASE-RENDER-TIME-1-v1 · 2026-08-07 · S86 · Architect: Claude (Opus 5).
     Lane: AG-2 (parallel to AG-1's phase/fault-switch-0 — file sets disjoint, census
     below). Born from the S86 four-turn user session (traces 58f1a8b3 · f794bd21 ·
     9d80df71 · 0f4902e5 · 6ebeab2e). Closes the render half of that failure:
     F-S86-1 (allowlist gap) · F-S86-5 (parser prose-mention swallow) · F-S86-4
     (EN relative-grammar gap). The behavioural half belongs to Blok 2F BY NAME
     and is deliberately NOT touched here.
     USER-EYE FINISH (S74-1): when the user asks for human-readable times, a
     human-readable table is ON SCREEN within one turn. -->

## PRECONDITION (S47-1)
Fresh full clone (RULE-25). `git rev-parse origin/master` = `b2d6c555a36461ea3bf412dc872a2e133b0c4830`
or a descendant. AG-1's `phase/fault-switch-0` is in flight on `api/cwf/_lib/faults/*`,
`api/cwf/_lib/persistence/repositories/{SyntheticRuns,BackendHealth}Repository.ts` and
`api/cwf/__tests__/*faultSwitch*` — this phase touches NONE of those files. Re-read the
base at merge time (S81-1: it may move forward under you; a CHANGELOG collision with
AG-1's merge is possible — both entries whole, late-merge on top). Worktree only (S83-3);
absolute paths (D-8). Branch: `phase/render-time-1`.

## G1 · WIDEN THE TIME-FIELD QUALIFIER — `src/lib/timeFormat.ts`

Today `TABLE_TIME_FIELDS = {'timestamp','startMs','endMs'}` and `formatTableCellTime`
returns null for everything else — which is the exact byte that printed raw epochs for
`startTimestamp`/`endTimestamp`/`createdDate`/`modifiedDate` (ARMES row convention).

Replace set-membership with a named predicate `isTableTimeField(field: string)`:
- TRUE for the existing exact names (unchanged), OR
- field `endsWith('Timestamp')` OR `endsWith('Date')` OR `endsWith('Ms')` — case-sensitive,
  suffix-exact.

Everything else in `formatTableCellTime` stays byte-identical — in particular the F63
plausibility window (`looksLikeEpochMs`, year 2000..2100) remains the SECOND gate. That
window is what makes the suffix rule safe: a duration field like `durationMs` (~10^5–10^8)
falls below the window → null → renders raw; an ISO string under a `*Date` name fails the
all-digit check → null → renders raw. Write BOTH of those as innocent-case tests (D-5).

Honesty invariants — DO NOT TOUCH, and test-pin them:
- the raw value stays the sort key and the `title` tooltip (presentation only, per the
  function's own contract comment);
- null / undefined / '' still return null unconditionally (empty≠zero: an absent cell
  never grows a 1970 timestamp);
- `TABLE_TIME_FIELDS` the exported name may stay for the chart path — do not silently
  change chart-axis behaviour; the chart's own gates are OUT OF SCOPE.

Tests (G1): `startTimestamp`/`endTimestamp`/`createdDate` epoch-ms → formatted, tooltip
carries raw; `durationMs` below window → raw; ISO-string `createdDate` → raw; 13-digit
in-window value under a non-time name (e.g. `orderId`) → raw (name gate holds); the three
original names → byte-identical output to today (regression pin).

## G2 · ANCHOR THE MACRO PARSER — `src/lib/chatParser.ts` (F-S86-5)

Mechanism, pinned from the live turn (trace `6ebeab2e`, message `6746693a…`): the model
mentioned `` `[TABLE_FROM_TOOL]` `` inline in prose, then emitted a well-formed directive.
The non-greedy, position-blind regex matched from the PROSE mention to the real
directive's closer → body wasn't JSON → honest `viz-invalid` box → and because that match
consumed the real closer, the real directive never rendered. The honest panel behaved
correctly; the opener detection is the defect.

Fix, deterministic and minimal: an opener token counts ONLY at line start — permit
leading whitespace, nothing else on the line before it (directives are block-level by the
instructions' own examples). Apply the SAME anchoring to:
1. the main `macroRegex` alternation (all four opener tokens), and
2. **the dangling-open detector** (the `tail.match(...)` at the stream-progress site) —
   MISSING THIS turns every prose mention into an eternal "rendering…" state; the two
   sites may never drift (add a test that pins them to the same anchoring rule).

The four-state law (BUG-034 rule v3) is untouched: a CLOSED block with invalid JSON still
yields `viz-invalid`, never raw text.

Tests (G2): prose-mention (backticked, mid-sentence) + later real directive → real
directive renders, ZERO invalid boxes, ZERO dangling; prose-mention alone → plain text,
no dangling; genuinely unclosed line-start opener → dangling still detected (positive
control); line-start opener with invalid JSON → `viz-invalid` (four-state pin);
`match`-carrying multi-directive behaviour unchanged (regression).

## G3 · THE ENGLISH RELATIVE PATTERN — resolve_time_range (F-S86-4)

The relative grammar accepts `last_24_hours`/`last_7_days` and Turkish `"son N gün"`, but
no generic `last_N_days` — the model's very first guess in the session. Add the
`last_N_days` (and `last_N_hours`) pattern arm mirroring the existing `"son N gün"`/"son
N saat" semantics exactly — same day-boundary rules, same timezone handling, same
interpretation string discipline (report what the tool computed). Locate the parser by
reading the tool's implementation (the error text's own vocabulary list is the anchor);
this file is in `api/` but is NOT in AG-1's census above — state the exact path in your
report for the disjointness record. Update the error text's valid-values list to include
the new pattern (the error is a teaching surface — keep it truthful).

Tests (G3): `last_3_days` ≡ `"son 3 gün"` byte-equal range on a pinned NOW; `last_12_hours`
≡ `"son 12 saat"`; unknown value still errors with the UPDATED list.

## SCOPE — named exclusions (D-7 Q7)
NOT touched: prompt segments / VIZ_MACRO_INSTRUCTIONS (G2 makes prose-mention
structurally harmless, so no behavioural prompt edit is needed and none is licensed);
chart-axis gates; grounding; anything in Blok 2F's territory (repeat-call memory,
deictic follow-ups, action-claim planning — those land with 2F.1–2F.4 by name);
`Kanıt` parity counting (F-S86-3 — Architect's own read, separate).

## DOCS & GATES
CHANGELOG entry as usual. doc-drift: expect silent or hash-only reseal (no diagram maps
these files); the gate's VERDICT rules, its `likelyCulprits` hint is advisory (W-025).
tenant-zero green with positive control first.

## STOP-FOR-REVIEW CONTRACT
STOP after CI green on the branch head; push the report to `docs/relay/` (Architect reads
from git). Report carries: CI run id · suite BASE+DELTA (expected ~+3 test files; counts
CI-arbitrated) · the G3 file path · base-drift note vs AG-1's lane. Merge only on the
Architect's GO with verbatim subject; `--no-ff`, `--cleanup=strip`, squash banned.

## POST-DEPLOY PROOF (S63-1 — this phase's named proof read)
After merge + production READY: the owner re-asks the original question once
("KB7 fabrikasının 3 günlük fırın duruşları — human readable") — the ONLY owner touch,
hand-witness class (D-4c) because it IS the user-eye finish. The Architect independently
reads the turn's logs and the screen evidence: formatted `startTimestamp`/`endTimestamp`
columns on screen, raw values in tooltips, zero invalid-directive boxes.

<!-- END · PHASE-RENDER-TIME-1-v1 -->
