# PHASE-CHART-RESIDUAL-TRUTH-1 · v1 — the cap counts SERIES, and the table obeys the same identity law

<!-- PHASE-CHART-RESIDUAL-TRUTH-1-v1 · 2026-08-09 · S89 · Architect → AG-2.
     ONE self-contained relay (D-2). Closes W-029 + W-031 (register v92 §2,
     born as CHART-SERIES-IDENTITY-1 residuals). Branch: phase/chart-residual-truth-1.
     Base = origin/master, EQUALITY PROVEN (S82-4). -->

## PRECONDITION (S47-1) — verify, do not assume
```
git rev-parse origin/master   # MUST print 19e84206eb84a8f…afb6d8179cff
```
If it differs: STOP, report, wait — do not rebase on your own authority.

## S88-1 WAVE-ANCHOR CLAUSE (binding)
AG-1 is building `phase/planner-0` on the SAME anchor; both lanes are
STOP-FOR-REVIEW, so **no master movement is expected during your build** — a
moved master is a stop condition, not a rebase license. Cross-probe (D-5, both
directions): your lane touches ONLY `src/**` (+ its tests); AG-1's file map is
ONLY `api/**` + `shared/**` params. You MUST NOT touch `api/**` or `shared/**`.
`.agents/CHANGELOG.md` is the one shared file — your entry goes on top at
report time (the standing dual-lane pattern; 3-way merge handles it).

## WHY — two named residuals from CHART-SERIES-IDENTITY-1 (F-S88-1, closed)
The S88 fix established the law: **a series' identity is (group, field), and a
field list is a SET (first header wins).** Two sites still predate the law:

- **W-029** — `MessageChartContent.tsx:452`:
  `if (slice.keys.length <= MAX_CHART_SERIES)` compares the cap (=12,
  `chartData.ts:366`, named "SERIES") against the **GROUP count**. In the
  F-S88-1 production trace, 5 groups sailed under the cap while producing 25
  series. Post-fix the multiplication is gone, but the guard still measures the
  wrong axis: 10 groups × 2 fields = 20 real series would pass a cap of 12.
- **W-031** — `tableData.ts` (~434–453): the directive-column merge updates an
  existing field's header on EVERY duplicate (`existing.header = dc.header`),
  i.e. **last header wins** — the exact opposite of the chart law's
  first-wins, and unaudited for the duplicate-field class the chart side
  already survived.

## BUILD (only these files; anything else = report first)
1. **`src/lib/chartData.ts`** — export a pure helper
   `projectedSeriesCount(groupCount: number, directive): number` =
   `groupCount × max(1, distinctFields(directive.series-fields).length)`,
   reusing the EXISTING `distinctFields` (line 379) — never a second
   dedup implementation.
2. **`src/components/ui/cwf/MessageChartContent.tsx:452`** — the guard
   compares `projectedSeriesCount(slice.keys.length, chartDirective)`
   against `MAX_CHART_SERIES`. Above the cap the honest
   `GroupAmbiguousPanel` renders, exactly as today.
3. **`src/lib/tableData.ts`** — align the directive-column merge to the
   identity law: a `field` seen again NEVER overwrites the first header
   (first-wins), type may still be forced only on first sight; add the same
   set-discipline comment pointing at `distinctFields`. UNIT-TRUTH-1
   reconciliation (G2 block, ~470–478) runs AFTER and is untouched.

## GATES (each = test(s); D-5 both directions)
G1 · Cap arithmetic: 10 groups × 2 distinct fields ⇒ panel (20 > 12);
     10 groups × 1 field ⇒ multi-series renders (10 ≤ 12); 5 groups with the
     F-S88-1 duplicate-directive fixture ⇒ counts 5 (dedup upstream), renders.
G2 · Reverse (D-5): with the helper bypassed (fixture calling the OLD
     comparison), the 10×2 case wrongly renders — proving the test can go red.
G3 · Table first-wins: directive `[{field:'oee',header:'A'},{field:'oee',
     header:'B'}]` ⇒ ONE column, header 'A'; reverse probe pins that pre-fix
     behavior yielded 'B'.
G4 · Byte-identity off the changed paths: existing chart/table test suites
     pass untouched; no snapshot outside the two behaviors moves.

## CI + REPORT (STOP-FOR-REVIEW; do NOT merge)
lint · typecheck:api · build · full `npm test` · `check:doc-drift` (worktree
AND CI=1 head) · `check:tenant-zero`. Push branch +
`docs/relay/PHASE-CHART-RESIDUAL-TRUTH-1-report.md`: diffstat · per-gate test
names · suite arithmetic over 500/5986 · PR-head CI run id read by CONCLUSION
("eval-canary skipped-by-design on PR" wording) · new spans: expected
"yeni span: yok" · any deviation named. Architect reviews from a fresh clone
(RULE-25); merges are SEQUENCED at GO time (S88-1) — never self-merge.

<!-- END · PHASE-CHART-RESIDUAL-TRUTH-1-v1 -->
