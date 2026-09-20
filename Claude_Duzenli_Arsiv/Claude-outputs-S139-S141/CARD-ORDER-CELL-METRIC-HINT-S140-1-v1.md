<!-- relay-audit: v1 kind=card -->
CARD-ORDER-CELL-METRIC-HINT-S140-1-v1

LANE: AG-4
fanout: personalized
This is ORDER 3 of CARD-NAMED-TOOL-IS-OFFERED-S140-1-v2, which that card gated on an owner ruling and which is now GIVEN: OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 (the owner's word at 2026-09-16T07:17Z: "K1 için EVET"). The K1-ratified derivation matrix lets a metric's governed `categoryHints` augment the derived category set in exactly two QUERY_METRIC cells, LINE and ZONE. The owner's live witness of 2026-09-15 and again this morning shows the ORDER cell needs it too: "<the order number in `raw-tokens`> numaralı iş emrinin fire ve fire sebeplerini getirir misin?" frames as QUERY_METRIC × ORDER with metrics [fire]; the cell derives [production] and the `fire → ['quality']` hint is never consulted, so the scrap tool in the `quality` category is not offered. This morning's turn answered correctly ONLY because `quality` arrived by sticky context from an earlier turn in the same conversation (stage 07: stickyAdded ["quality"]) — a fresh conversation gets [production, metrics] and no scrap tool. The ruling amends the matrix: ORDER joins the hint-augmented cells.

ONE line of behaviour, its comment, and its tests. Nothing else.

PRECONDITION: `origin/master` is at or beyond the fenced anchor and `HINT_AUGMENTED_OBJECTS` still reads `new Set(['LINE', 'ZONE'])`. If it already names ORDER, STOP — the work exists (§12.7) and this card is wrong.

```evidence:raw-tokens
order number             1600167
sticky witness turn      6399300edbf28cd97fcbc98fe3a47c8f   (2026-09-16T06:02:28Z, stickyAdded ["quality"], getOrderScrapWithReasons called)
fresh-shape turn          dd281fe14f0debe2ecfe2efd054f9b4d   (2026-09-15T13:30:50Z, matched [production, metrics], no quality, 40 tools offered)
```

```evidence:the-seam
file        api/cwf/_lib/routing/deriveCategories.ts   at master a996a2f5e92f7da0ea537e4a8b96d94d21fb2059 (file last touched by the METRIC-REGISTRY-DATA-1 landing)
line 114    const HINT_AUGMENTED_OBJECTS: ReadonlySet<IrObject> = new Set(['LINE', 'ZONE']);
line 127    if (action === 'QUERY_METRIC' && HINT_AUGMENTED_OBJECTS.has(object)) { for (const h of hints) if (!categories.includes(h)) categories.push(h); }
cell        MATRIX.QUERY_METRIC.ORDER = ['production']
comment     lines 96-113 say "The two QUERY_METRIC cells ... (LINE, ZONE — marked `*` in the ratified table)" and "which CELLS may be augmented is a property of the K1-ratified matrix"
hint row    metric_registry armes `fire`: aliases [fire, scrap, ıskarta, iskarta], categoryHints [quality]   (governed, read by the Architect 2026-09-15)
tests       api/cwf/_lib/routing/__tests__/deriveCategories.test.ts lines 77-113: describe 'FIRE-metric augmentation (QUERY_METRIC×{LINE,ZONE} only)'; line 88 'fire metric on a non-augmented object (e.g. FACTORY) does NOT add quality'
```

```evidence:the-witness
turn        the sticky witness in `raw-tokens`: irFrame {action QUERY_METRIC, object ORDER, entity_ref [the order number], metrics [fire]}; register-tools matchedCategories [production, metrics, quality], stickyAdded [quality]; stage 10 called getOrderScrapWithReasons with the resolved factory, the default process and the order number
fresh       the fresh-shape turn in `raw-tokens`: same frame shape, matchedCategories [production, metrics], no quality, offeredCount 40, tool not offered
read        turn_trace_digest by the Architect, 2026-09-16T06:03Z and 06:04Z
```

## PREMISE

MEASURED: the seam, its comment and its tests in `the-seam`, at the fenced master.
MEASURED: the two turns in `the-witness`, from turn_trace_digest at 2026-09-16T06:03Z.
MEASURED: OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 — the owner's "EVET" at 2026-09-16T07:17Z, recorded in the project box under that name.
UNMEASURED: whether any OTHER cell should join (FACTORY, EQUIPMENT). Not asked, not ruled, not this card — the FACTORY negative test stays.
SELF-INVALIDATION: this premise dies if the set already names ORDER, or if `origin/master` moves by a commit touching deriveCategories.ts.

## ORDERS

ORDER 1 - `HINT_AUGMENTED_OBJECTS` becomes `new Set(['LINE', 'ZONE', 'ORDER'])`. Rewrite the comment above it so it names THREE cells, cites OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 by name for the third, and keeps the G3a history intact.

ORDER 2 - TESTS, failing-first on the fork point: (a) QUERY_METRIC × ORDER with a metric whose hint is a category ⇒ that category is in the derived set beside `production`, once, no duplicate; (b) the existing FACTORY negative at line 88 STAYS and passes; (c) a QUERY_METRIC × ORDER frame with NO hinted metric derives exactly the ratified cell — the floor. Rename the describe block so it no longer says `{LINE,ZONE} only`. ⚠ TENANT-ZERO: use the fixtures the file already uses; no live factory, line or equipment name enters the tree (the gate held PR 570 red on exactly this at 06:33Z).

ORDER 3 - WITNESS, after the landing and production READY: in a NEW conversation the question "<order number> numaralı iş emrinin fire ve fire sebeplerini getirir misin?" must show at stage 07 `matchedCategories` containing `quality` with `stickyAdded` EMPTY, and the scrap tool among `offeredToolNames`. The OWNER or the Architect asks it; you read turn_trace_digest and print those three fields. That reading is the acceptance, not the unit test.

ORDER 4 - Branch off current master, ONE pull request, no-ff, never a squash. Run `npm run build` (the doc-drift gate lives there, not in vitest — reseal in the SAME commit if a mapped file moves) and `npm run check:tenant-zero` locally, print both. Report at `docs/relay/ORDER-CELL-METRIC-HINT-S140-1-AG4-report.md`; the report follows the landing and never gates it. Post the from_lane slip with the forty-hex head and CI as you read it.

## FALSIFIER

If the set already names ORDER, STOP. If augmenting ORDER makes any existing test red for a reason other than the `{LINE,ZONE} only` wording, STOP and print it — that is a consumer this card did not see.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/routing/__tests__/deriveCategories.test.ts
- public/architecture/manifest.json (only if the doc-drift gate demands a reseal)
- docs/relay/ORDER-CELL-METRIC-HINT-S140-1-AG4-report.md
```

No change to the metric registry, to `irFrame.ts`, to `stageTools.ts`, or to any other cell of the matrix.

## DECISION RIGHTS

You may add ORDER to the QUERY_EVENTS augmentation too ONLY if the code already augments QUERY_EVENTS anywhere (it does not, as read); otherwise you do not widen. You may refuse on evidence this card did not anticipate.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the set names LINE and ZONE only, the rule applies at line 127, the ORDER cell is [production] | MEASURED: sed and grep over deriveCategories.ts at the fenced master | the-seam |
| the fire row's hint is [quality] | READ: metric_registry row for armes, live database, 2026-09-15 | the-seam |
| this morning's correct answer came by sticky context, and the fresh shape omits quality | MEASURED: turn_trace_digest stage 07 at 2026-09-16T06:03Z | the-witness |
| the owner ruled ORDER in | READ: the owner's message at 2026-09-16T07:17Z, filed as OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 | inline |
| the fresh-conversation witness after landing | NOT-READ | ORDER 3 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching deriveCategories.ts, or if a v2 appears.
