# CWF Design Note — METRIC-REGISTRY-DATA-1 · v1_1

<!-- cwf-design-METRIC-REGISTRY-DATA-1-v1_1 · 2026-08-09 · S91.
     AMENDS v1 (S37-1). v1 REMAINS THE BASE and is read alongside this sheet;
     only the sections below change. Owner ratified the amendment S91.
     Reason: a live recon at c1e3f5f (v1's recon was at 656ec292, two merges
     back) found one wrong value, two uncounted mechanics, and one boundary
     v1 asserted more widely than the phase can prove. -->

## §3-A · AMENDED (one sentence withdrawn)

WAS: "...That is the CORRECT day-one behavior for a bank: nothing pretends to
be official; everything lives as user declaration."

NOW: "...That is the correct day-one behavior for a bank AT THE ARMOR: no word
is treated as an official metric id, and every submitted word lives as user
declaration. This claim is scoped to the armor / grounding / trust surfaces
this phase touches. It is NOT a system-wide claim — see §10."

## §3-C · CORRECTED VALUE (computed, not recalled)

`deriveCategories.ts:103` pushes the CATEGORY NAME `'quality'`, not the alias
`'scrap'`. The registry row's hint is therefore `categoryHints: ['quality']`.
The `FIRE_AUGMENTED_OBJECTS` object-set condition STAYS IN CODE (structure);
only the metric→category link moves to the row payload.

## §3-A2 · NEW — the armor is a PURE SINGLE-ARG FUNCTION (v1 did not count this)

`armorIrFrame(raw)` gates on the module constant `METRIC_ID_SET`. Making it
registry-driven is a SIGNATURE change with 8 production call sites in 6 files:
semanticRouter.ts:315 · admin/bench/gate.ts:67 · admin/bench/armor.ts:104,142 ·
replay/clarificationLens.ts:564,606 · replay/routeShadowLens.ts:378.

The vocabulary parameter is REQUIRED, never optional-with-default — a default
would re-introduce the hard-code at the type level, the same error §2 fixes for
`MetricId`. Enforced structurally by a call-site census test (the F185
`learnBrakeCallSites.test.ts` pattern) WITH the S66-1 floor assertion: a
zero-site scan FAILS.

`deriveCandidateCategories(frame)` is the same shape and gains the same
parameter.

## §3-D2 · NEW — the polarity law has TEETH, and they are answered

`shared/metricVocab.ts`'s header carries POLARITY LAW (RULE 5): *"this module
is explicitly NOT a governed row and must never become one ... detectors that
can be silenced by data are not detectors."* v1 did not name it. Its live
instrument is `toolCategories.ts:936` — `METRIC_VOCAB_WORDS` /
`isMetricVocabWord`, the F156 cross-layer learn guard: a recognized metric word
must never be learned into a category set lacking 'metrics'.

The fear is REAL: an empty or unreadable slice makes `isMetricVocabWord` return
false for everything, and the guard silently fails OPEN.

**RULING (S91, binds the phase):** when the resolved vocabulary's
`vocabSource !== 'governed'`, the F156 guard FAILS CLOSED — it refuses to learn
rather than learning freely. Refusing to learn is reversible; a contaminated
`tool_category_cache` is not (F185 measured 2 → 19 rows in hours). The polarity
law's REASONING is preserved verbatim as a comment at the new guard site,
recording why data-driving became safe: `vocabSource` (GATE-SILENCE-VISIBILITY-1,
merged `5d92d81`) ended the condition the law depended on — a silenced detector
and a clean one are no longer byte-identical.

## §3-F · CORRECTED CLASSIFICATION

v1 lists `toolCategories.ts` as an alias consumer. Precisely, at c1e3f5f:

- `METRIC_ALIASES` LIVE at :631 (`resolveLearnCorpus`) and :939 (F156 guard).
- `FIRE_ROUTING_SYNONYMS` imported at :19 and **NEVER USED** — a DEAD import.
  Its only survivors are a comment (`floorSyncCore.ts:26`) and a test pin
  (`shared/__tests__/metricVocab.test.ts:36`). It died when F214 resolved the
  spread to literals; the import stayed and made the constant LOOK live.
- `routing/functionWords.ts` and `turn/stageTools.ts` hold NO direct reference
  at this SHA; they are transitive consumers. The exit criterion is therefore
  DIRECT-grep only, and those two get fixture proof as v1 §3-F says.

## §4.1 · PRECISION (naming, to prevent a wrong mint)

"`backend.metric_registry`" in v1 is a FAMILY name, not a literal kind id.
Kind ids follow the shipped convention: `<backendId>.metric_registry`
(`armes.metric_registry`, `superset.metric_registry`, …), minted generically by
a `metric_registry.kinds` `kindsOnly` SEED_DOMAINS entry — the
`tool_category.kinds` / `tool_doc.kinds` / `gateway_tool_policy.kinds`
precedent, verbatim.

**CONSEQUENCE: ZERO migrations, ZERO Operator steps.**

## §4.4 · PRECISION (the resolver already exists as a sibling)

The turn slice mirrors `api/cwf/_lib/knowledge/resolveToolCategories.ts:112`
byte-for-byte in POSTURE: every enabled `public.backends` row (system lane
excluded), union of published rows, unconfigured/outage ⇒ floor, never a throw
into the turn. Platform floor is EMPTY.
`vocabSource: 'governed' | 'floor' | 'stale'`.

## §8.1 · AMENDED TITLE + §8.6 NEW

§8.1 title WAS "Bank-shaped honesty" → NOW **"Armor-level honesty on an empty
registry"**. Its mechanics are unchanged (they were already armor-scoped).

NEW §8.6 — **guard fails closed**: with `vocabSource='floor'`, a metric-shaped
word must NOT be learnable into a non-metrics category set. Mutation: flip the
guard to fail-open ⇒ a named test dies.

## §10 · NEW — NAMED EXCLUSION (the boundary this phase does not cross)

`api/cwf/_lib/toolCategories.ts:164–490` is a GENERATED block
(`[F214-FLOOR-SYNC:BEGIN/END]`, `scripts/syncRoutingFloor.ts`). It holds 12
ceramic categories with resolved LITERALS — `'oee'` (:169), `'scrap'`/`'ıskarta'`
(:381–382) — plus ~100 armes tool names, and it is both the outage fallback
(`matchCategories`'s default argument) and the text rendered into the
router-fallback prompt (:1123). The v1 exit criterion cannot reach it: those
words are literals, not references.

This phase does NOT touch that block, and the exclusion is DECLARED, not
silent. It is the SAME defect class one organ lower — the routing floor has no
backend dimension, which AG-1's own ROUTE-DERIVE-1 report §5 already stated:
*"no per-backend floor concept exists anywhere in this codebase."*

Carrier: **`ROUTING-FLOOR-BACKEND-1`**, entering register v95 and the rollout
by name, in the 2E rail family, immediately behind this phase (S82-6 shape: a
layer enters the queue BY NAME and is built at SOTA level — this is not a
deferral, it is a different organ under the same law).

NOT named `…-TENANT-…`: in this repo "tenant" already means the customer-word
scanner (`check:tenant-zero`: kale / kalebodur / seramik / kb7 / glazur / …,
FLOOR-TENANT-SPLIT-1/2) and the PARKED TENANT-CONSOLE family whose re-entry
trigger is customer #2. That gate is GREEN on this block and correctly so —
`ıskarta` / `barkod` / `andon` are not in its vocabulary. The axis here is
BACKEND.

<!-- END · cwf-design-METRIC-REGISTRY-DATA-1-v1_1 · S91 -->
