# PHASE-CHART-SERIES-IDENTITY-1 · v1
**Lane: AG-2 (Author) · Architect-gated · S88 · 2026-08-08**
**Closes: F-S88-1 (series/legend explosion on multi-zone long-range chart)**

## STEP 0 — settle the outstanding deliverable FIRST (blocking, before any code)
Your READY-EDIT-TRUTH-1 merge (`3d6b056`) is on master but its MERGE relay report is
not. Push `docs/relay/PHASE-READY-EDIT-TRUTH-1-MERGE-report.md` to master as a
docs(relay) commit BEFORE branching: master CI run **31263479298** read by CONCLUSION
(the Architect has independently read `completed/success`, 5/5 incl. eval-canary — your
report must still quote the per-job list and the canary PAYLOAD: decision/verdict/reps,
since a green canary job is not yet a verdict). Then proceed.

## ANCHOR (verify before any edit — STOP on mismatch)
- `git rev-parse origin/master` == the SHA of YOUR step-0 docs commit (record it in the
  report; it will differ from `3d6b056` by exactly that one docs commit).
- Branch: `phase/chart-series-identity-1`. `npm test` green before first edit.
- No migrations. No server files — this phase lives in `src/` ONLY. AG-1 is
  concurrently in `api/cwf/_lib/turn/` — do not enter it.

## THE WITNESSED DEFECT (production, 2026-08-08, trace `b16754a1`)
Same conversation, same tool, same render path, two minutes apart:
- 3-day OEE, `getOeeValuesForZones` → 66 points across 5 zones (keyed object
  `{zoneId: [{timestamp, performance, availability, quality, oee}...]}`) → chart
  rendered **5 series, 5 distinct colors, legend "FIRINALT / FIRINUST / Glazur3/4/5"**. Correct.
- 8-day OEE, same tool, same shape → 186 points across the SAME 5 zones → legend shows
  **25 entries** — every zone repeated 5 times as "`<zone> · oee`" in 5 different
  colors — and every plotted line collapses into one purple family.
The data was correct and complete (`elements=186 returned=186 truncated=false`); the
multiplication happened in the client's series derivation. 5 zones × 5 = 25 is the
smoking arithmetic: some per-zone structure (chunking, per-metric expansion, or a
non-stable series key) is multiplying series identity instead of merging into it.

## G1 — diagnose to the byte (S73-1: the chain ends at a byte, never patch above it)
In `src/` chart data derivation (start at `MessageChartContent.tsx` and the series
extraction it delegates to — likely `chartData`/`tableData` helpers), reproduce the
25-series outcome in a unit test using a NEUTRALIZED fixture with the exact structure:
keyed object, 5 zone keys, per-zone point arrays large enough to cross whatever
boundary the 66-point payload does not cross (186 points total). Name, in the report,
the precise line where one zone becomes five series.

## G2 — fix series identity
- A series' identity must be a STABLE key: (zone, metric). Same key ⇒ same series,
  merged points, one legend entry, one color.
- Expected post-fix: the 186-point fixture renders exactly 5 series with 5 distinct
  colors; the 66-point fixture stays byte-identical in series count and legend (pin
  BOTH — the second is the innocent-case probe).
- Do not "fix" by capping legend entries or hiding duplicates — the duplication itself
  must not exist. If the true root is upstream of the renderer (e.g. segment assembly
  producing repeated bindings), fix it there in `src/` and say so.
- OUT OF SCOPE, named: the "· oee" label suffix styling; the sibling prose defect
  (model printing a UTC timestamp labeled Istanbul) — prose layer, separately queued.

## RULES
- Fixture vocabulary neutral (ZoneA…ZoneE) — `check:tenant-zero` has no exclusion list.
- Territory: `src/` only + its tests. No `api/`, no `shared/` writes.
- Reseal docVersion against your combined tree; AG-1's lane is concurrently minting
  rev 217 — whichever of you merges SECOND reseals the combined tree to rev 218 (the
  standing dual-lane pattern; the GO will fix the order).
- Report to `docs/relay/PHASE-CHART-SERIES-IDENTITY-1-report.md` on the branch:
  step-0 commit SHA, anchor proof, the byte-level diagnosis, before/after series counts
  from the tests, diffstat, CI run id read by CONCLUSION, honest residuals. Then
  **STOP FOR REVIEW** — no merge without the Architect's GO.

<!-- END · PHASE-CHART-SERIES-IDENTITY-1-v1 -->
