<!-- relay-audit: v1 kind=card -->
CARD-REGISTRY-READS-PAGINATE-S140-1-v1

LANE: AG-4
fanout: personalized
The entity registry crossed one thousand rows on 2026-09-10 when the equipment layer first landed, and from that day every unpaginated read of it has been silently PARTIAL. This house's own law says it in eight words — partial ≠ complete, PostgREST cuts at 1000 rows WITHOUT SIGNAL — and the finding was named in S135 (bootstrap v136 §10 item 7: "PostgREST's silent 1000-row cap in upsertLayer's post-write read"), left "open and unscheduled", and never carded. This morning the owner produced the live witness. He asked for the camera performance of the FIRINUST line of factory KB7; the product resolved KB7 and then asked him to choose between 452 rows all labelled "equipment". The registry holds three LINE rows named FIRINUST, each with a factory parent, and 823 equipment rows whose names begin with FIRINUST. The live cross-layer read orders by layer_key then entity_id, so the first thousand rows are ALL equipment; the factory and line layers never arrive; the disambiguator's parent pool has no line rows to label from and falls to the 'layer' rung; and 452 is exactly the number of FIRINUST-prefixed rows inside the first thousand — measured, not inferred. The ask the owner saw is the 1000-row cut, rendered.

This is a REPAIR card on one repository, and it reuses the paging loop the same file already carries (`listNamesForCorpus`, count-based truncation detection). §12.6: the mechanism exists; do not build a second one beside it.

PRECONDITION: `origin/master` is at the fenced anchor or beyond it, and the three reads named in `the-reads` still carry no `.range(` call. If any of them already pages, STOP and print the file — the premise is dead and the card is wrong.

```evidence:raw-tokens
turn id        074cc5490c1da7096ca2cccf6807ce11
conversation   4e4c60b5-b18b-416d-8434-669d6894296c
```

```evidence:the-witness
turn           the turn id in `raw-tokens`, 2026-09-16T06:04:55Z, read from turn_trace_digest by the Architect
question       "Son 1 haftalık kamera KB7 fabrikasının FIRINUST hattının kamera performanslarını incele ..."
stage 03 in    entityRefs ["KB7 fabrikası","FIRINUST hattı"]  frameObject QUALITY  scope layers=ALL[equipment,factory,line,workstation]
stage 03 out   KB7 fabrikası -> resolved (getFactoryList discovery)   FIRINUST hattı -> ambiguous candidateCount 452   ask-ambiguous, five options, every one label "equipment" labelSource "layer"
rendered       "'FIRINUST hattı' adıyla eşleşen 452 kayıt var. Hangisini kastettiniz? 1. equipment 2. equipment 3. equipment ..."
```

```evidence:the-registry
read by        the Architect over the live database, 2026-09-16T06:12Z
armes rows     equipment 1720 (all with parent, parent_layer_key line)   line 783 (all with parent, parent_layer_key factory)   factory 17   total 2520
FIRINUST       line: 3 rows, display_name FIRINUST, parents are factories   equipment: 823 rows, display_name FIRINUST_<14 digits>, parent is a line uuid
first 1000     ORDER BY layer_key, entity_id LIMIT 1000 -> layer_key equipment: 1000 rows, of which display_name ILIKE 'FIRINUST%': 452
growth         factory 17 (2026-07-22) · line 783 (07-26, 08-11) · equipment 1691 on 2026-09-10 then 1 to 9 per day — the table crossed 1000 rows on 2026-09-10
```

```evidence:the-reads
file           api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts   at master 883f90819110635273575b6e0a9d363b73a6f040
listByBackendLayer   .select(ROW_COLS).eq('backend_id').eq('layer_key').order('entity_id')                 no .range(   — equipment alone is 1720 rows
listByBackend        .select(ROW_COLS).eq('backend_id').order('layer_key').order('entity_id')              no .range(   — the live clarify cross-layer read, stageClarify.ts line 448
upsertLayer          post-upsert .select('entity_id, status').eq('backend_id').eq('layer_key')            no .range(   — the snapshot that decides the missing-flip and the returned totals
listNamesForCorpus   the ONE paged read in the file: for (from = 0; from < maxRows; from += pageSize) ... .select(..., { count: 'exact' }).order('id').range(from, to); truncated = total === null || names.length < total
constants      ENTITY_CORPUS_PAGE_SIZE = 500   ENTITY_CORPUS_MAX_ROWS = 50_000
```

```evidence:the-consumers
EntityRegistryRepository.listByBackend   turn/stageClarify.ts:448 (live)   backends/toolBehaviorCensus.ts:327   replay/lineResolutionLens.ts:733   replay/clarificationLens.ts:1386   routing/askSuggestions.ts:113
EntityRegistryRepository.listByBackendLayer   turn/stageClarify.ts (factory floor, ENTITY_FLOOR_LAYER_KEY)   and whatever your grep adds — print it
memo           both live reads sit behind memoizeFrozenRead keyed by method and backend; a paged read returns the same shape, so the memo key does not change
```

## PREMISE

MEASURED: the witness turn, its stage 03 input and output, in `the-witness`, at 2026-09-16T06:07Z.
MEASURED: the registry population, the FIRINUST rows, the first-thousand cut and its 452, and the growth timeline, in `the-registry`, at 2026-09-16T06:12Z.
MEASURED: the three unpaged reads and the one paged read, in `the-reads`, at the fenced master.
MEASURED: `partial ≠ complete` is a §2 doctrine law of this project, and the S135 finding that named this cap in `upsertLayer` was recorded and never scheduled.
UNMEASURED: whether, once the line rows arrive, the resolved KB7 scopes the FIRINUST line to one row (CARD-ENTITY-SCOPE-BY-RESOLVED-PEER-1-S134-1's seam) or the 823 equipment rows still pollute the ask. ORDER 4 measures it; it is NOT this card's repair.
SELF-INVALIDATION: this premise dies if any of the three reads already carries `.range(`, or if PostgREST's max-rows for this project is not 1000 — ORDER 1 reads the second from the API itself.

## ORDERS

ORDER 1 - PROVE THE CAP FROM THE API, NOT FROM THIS CARD. Before changing anything, read the registry through the same client the repository uses with no range and print `rows.length` beside a `count: 'exact'` head request for the same filter. The two numbers differ by the cap. If they are EQUAL, STOP: the cap is not where this card says.

ORDER 2 - ONE PAGED READ, THREE CALLERS. Extract `listNamesForCorpus`'s loop into one private paged helper on the repository (page size and ceiling as named constants; `count: 'exact'` on the first page; a stable ORDER BY that includes a unique column so pages cannot overlap) and route `listByBackend`, `listByBackendLayer` and `upsertLayer`'s post-upsert snapshot through it. `listNamesForCorpus` itself uses the same helper — one loop in the file, not two. The public signatures do not change. A read that cannot prove completeness (count unavailable, or rows < count at the ceiling) THROWS with the counts in the message — a partial registry is a wrong answer, and this house does not return wrong answers quietly.

ORDER 3 - THE TEST THAT WOULD HAVE CAUGHT IT. A repository test with a fake PostgREST client that caps every un-ranged select at 1000 rows and honours `.range()`, over a 2520-row registry shaped like `the-registry` (equipment 1720, line 783, factory 17). It proves: `listByBackend` returns 2520; `listByBackendLayer('equipment')` returns 1720; `upsertLayer` over the equipment layer flips NOTHING to missing when every live id is present (today it would see only 1000 and flip none of the other 720 by luck — write the test so a paged read is REQUIRED for the total to come back 1720). Add ONE assertion to the existing clarification tests: `buildDisambiguators` over the full row set labels a FIRINUST-prefixed equipment row with its LINE parent's name (`labelSource: 'parent'`), not `'layer'`.

ORDER 4 - MEASURE THE WITNESS AFTER THE LANDING, DO NOT REPAIR IT. Once master carries this and production is READY, the OWNER repeats his question in a NEW conversation. You read stage 03 of that turn and print: the scope token, each ref's verdict, candidateCount, and the five labels with their labelSource. Whether the ask is now one FIRINUST line under KB7, or three lines with factory labels, or still a wall of equipment, is the next card's premise — it is written down here, not fixed here.

ORDER 5 - LAND. Branch off current master, ONE pull request, no-ff, never a squash. Report at `docs/relay/REGISTRY-READS-PAGINATE-S140-1-AG4-report.md`. The report FOLLOWS the landing and never gates it (§12.8): when the branch is green, post the from_lane slip with the forty-hex head and the run's conclusion by NAME, and the landing is AG-5's on its own card.

## FALSIFIER

If ORDER 1 shows equal counts, STOP. If any consumer in `the-consumers` depends on the truncated shape (a test asserting 1000, a ceiling that assumed it), STOP and print it before changing it — that is a second finding. If the paged `upsertLayer` snapshot flips rows to missing that the unpaged one did not, print the ids: that is the S135 finding's predicted consequence becoming visible, not a regression.

## SHARED SURFACES

```scope
- api/cwf/_lib/persistence/repositories/EntityRegistryRepository.ts
- api/cwf/_lib/persistence/repositories/__tests__/ (repository test, new or extended)
- api/cwf/_lib/turn/__tests__/ or api/cwf/_lib/routing/__tests__/ (the one disambiguator assertion)
- docs/relay/REGISTRY-READS-PAGINATE-S140-1-AG4-report.md
```

No change to `stageClarify.ts`, to the IR contract, to `backend_entity_layers`, or to any discovery tool. No migration.

## DECISION RIGHTS

You choose the helper's name, page size and ceiling. You may refuse ORDER 2's throw-on-incomplete if you can show a consumer for which a proven-partial read is the honest answer — name it and return `{ rows, truncated, total }` to that consumer instead; the LIVE clarify read is never that consumer.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the owner's turn asked among 452 rows all labelled by layer | MEASURED: turn_trace_digest stage 03 at 2026-09-16T06:07Z | the-witness |
| the registry holds 2520 armes rows and the first thousand by (layer_key, entity_id) are all equipment, 452 of them FIRINUST-prefixed | MEASURED: live SQL at 2026-09-16T06:12Z | the-registry |
| three reads in the repository carry no `.range(` and one does | MEASURED: sed and grep over the file at the fenced master | the-reads |
| the callers of the two list reads | MEASURED: grep over api/cwf/_lib at the fenced master | the-consumers |
| PostgREST's max-rows for this project is 1000 | NOT-READ | ORDER 1 measures it |
| the ask shape after the landing | NOT-READ | ORDER 4 measures it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves past the anchor by a commit that touches the repository file, or if a v2 appears.
