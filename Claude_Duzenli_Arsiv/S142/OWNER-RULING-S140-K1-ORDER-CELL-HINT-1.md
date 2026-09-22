# OWNER-RULING-S140-K1-ORDER-CELL-HINT-1

Session S140. Given 2026-09-16T07:17Z (10:17 local, UTC+3). Owner's words: **"K1 için EVET."**

## THE QUESTION PUT TO THE OWNER

The K1-ratified derivation matrix (`api/cwf/_lib/routing/deriveCategories.ts`) lets a metric's governed `categoryHints` augment the derived category set in exactly two QUERY_METRIC cells, LINE and ZONE (`HINT_AUGMENTED_OBJECTS`, line 114 at master a996a2f5e92f7da0ea537e4a8b96d94d21fb2059). Should the ORDER cell join them, so that "<order> numaralı iş emrinin fire sebepleri" (QUERY_METRIC × ORDER, metrics [fire], hint [quality]) derives `quality` beside `production` and the scrap tool is offered in a fresh conversation?

## THE RULING

YES. ORDER joins the hint-augmented cells. No other cell is ruled on (FACTORY and EQUIPMENT remain unaugmented; not asked).

## WHY IT WAS NEEDED — MEASURED

- 2026-09-15 witness turn dd281fe14f0debe2ecfe2efd054f9b4d: matchedCategories [production, metrics], no quality, 40 tools offered, scrap tool not offered.
- 2026-09-16T06:02Z turn 6399300edbf28cd97fcbc98fe3a47c8f: answered correctly ONLY because `quality` arrived by sticky context (stage 07 stickyAdded ["quality"]) from earlier turns in the same conversation. A fresh conversation would not have it.
- PR 568 (named-tool door + alias fold) landed the other two orders of CARD-NAMED-TOOL-IS-OFFERED-S140-1-v2; ORDER 3 was gated on this ruling by name.

## EXECUTION

CARD-ORDER-CELL-METRIC-HINT-S140-1-v1 (AG-4), cut 07:20Z, scout review row ca0d8bc8-4983-4938-ac3d-25e5ce509528. Acceptance is ORDER 3 of that card: a fresh-conversation turn showing `quality` in matchedCategories with `stickyAdded` empty and the scrap tool offered.

## ATTRIBUTION (S112-YASA-1 · §12.14)

The owner ruled; the Architect proposed the amendment after measuring the sticky-context path. The owner also, in the same message, opened CWF in the Architect's built-in browser so the Architect can observe and run witness turns itself — a design contribution to the measurement loop, recorded by name.
