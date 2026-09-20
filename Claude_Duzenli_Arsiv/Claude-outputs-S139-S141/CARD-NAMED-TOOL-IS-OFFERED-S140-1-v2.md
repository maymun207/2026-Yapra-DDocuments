<!-- relay-audit: v1 kind=card -->
CARD-NAMED-TOOL-IS-OFFERED-S140-1-v2

LANE: AG-4
fanout: personalized
You are a PRODUCER, freshly booted through `npm run lane:boot` at 2026-09-16T03:58Z, and this is the first work card of S140. v2 of this card applies the scout's three findings on v1 (SCOUT-REVIEW-CARD-NAMED-TOOL-IS-OFFERED-S140-1-v1, 04:29Z): the call-site census file is named correctly, the aliasesById claim is scoped to the frame path only, and ORDER 3 is marked as a K1 amendment awaiting the owner's ruling. Nothing else moved. It repairs the defect the owner witnessed on his own screen twice last night, after PR 564 had already removed the ask: he typed the name of a tool and an order number, the turn answered without asking, and the answer opened by telling him the tool does not exist. The tool exists. It is active in the mirror, it sits in a PUBLISHED category, and the register-tools stage never offered it — for two measured reasons, and both are wiring, not new mechanism (§12.6 of the instruction box).

REASON 1 — NO DOOR FOR A TOOL THE USER NAMES. The router is forbidden by design from matching tool names (its prompt says "never mention or invent tool names"), the keyword floor matches category keywords only, and the frame path maps QUERY_METRIC × ORDER to `production` alone. So a tool the user names VERBATIM is offered only if its category happens to be reachable by some other word in the sentence. A name match on the discovered catalogue is deterministic code, not routing — the §8 split — and it is absent.

REASON 2 — A PUBLISHED ALIAS IS DROPPED AT THE ARMOR. The published `armes.metric_registry` row `fire` carries aliases `scrap`, `ıskarta`, `iskarta` and `categoryHints: ["quality"]`. The armor keeps a raw metric only if it is an ID; an alias lands on `metricsSurface` and contributes no hint. The resolved registry already builds `aliasesById`, and nothing on the FRAME PATH reads it — `armorIrFrame` and its callers read `vocab.ids` only. (It does have consumers elsewhere: the learn corpus in toolCategories.ts, `isMetricVocabWord`, groundingCheck.ts, and stageClarify.ts, whose folded-alias loop is the pattern ORDER 2 copies rather than invents.) On the witnessed turn the frame was `metrics: []`, `metricsSurface: ["scrap"]`, so the `fire → quality` hint could never fire. And even with the alias folded, the hint applies to LINE and ZONE cells only, so ORDER × scrap still cannot reach `quality` — that is ORDER 3.

PRECONDITION: master is at the fenced anchor in `the-witness` and the three files named in ORDERS read as the fences quote them. If any differs, YOUR reading wins; you print both and stop before editing.

```evidence:the-witness
turn           the Architect's repeat of the owner's own turn (both turn_trace_digest turn ids are thirty-two hex and live in `raw-tokens`), production, build abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb, answered 2026-09-15T19:31:00Z
owner's words  the tool name, the word "aracı ile getir", and the seven-digit order number — verbatim in `raw-tokens`, an unanchored fence (CP-8 reads a seven-digit number as a short sha)
answer opens   `getOrderScrapWithReasons` aracı bulunamadı — then falls back to getOrderDetails and prints a table
stage 07       cwf.stage.07.register-tools input.extractedKeywords = ["getorderscrapwithreasons","aracı","ile","getir",<the order number>]
               output.path = semantic · matchedCategories = ["production"] · basis = frame
               irFrame = {action QUERY_METRIC, object ORDER, entity_ref [<the order number>], metrics [], metricsSurface ["scrap"], confidence HIGH}
               offeredCount 38 · registeredCount 37 · unclassifiedCount 12 · getOrderScrapWithReasons ABSENT from offeredToolNames and registeredToolNames
stage 10       the model called search_tools on the SUPERSET server with query getOrderScrapWithReasons → content [] (empty), then getOrderDetails on armes
DB             domain_rules kind armes.tool_category key quality status published version 5 — tools[] contains getOrderScrapWithReasons
               domain_rules kind armes.tool_annotation key getOrderScrapWithReasons status published — exposure read
               domain_rules kind armes.metric_registry key fire status published — aliases ["fire","scrap","ıskarta","iskarta"], categoryHints ["quality"]
measured       2026-09-15T20:0xZ turn_trace_digest + domain_rules via Supabase MCP, project fjbrkimwvtpwoxhziidh
```

```evidence:raw-tokens
owner's words   getOrderScrapWithReasons aracı ile getir 1600167
owner's turn    be86ec518c0883243f96ae1af5b3068c   2026-09-15T19:27:28Z
repeat turn     3f52a621b519c18e4dc96d8f0b7731e7   2026-09-15T19:31:01Z
```

```evidence:the-seams
master         abd00e2c4c9c64dd3af9aa8b6b6046510d5dd2bb
irFrame.ts     line 171: const keptMetrics = rawMetrics.filter((m) => metricIdSet.has(m));   ← ids only; aliases fall to metricsSurface at line 192
               line 30: export interface MetricVocabulary { readonly ids: readonly string[]; }   ← no aliases on the type the armor receives
resolveMetricRegistry.ts   line 106: aliasesById: Record<string, string[]>;   line 275-278: built from row.payload.aliases   ← BUILT, not consumed by armorIrFrame
deriveCategories.ts        line 66/72/78/84/90: ORDER: ['production'] in every non-COMPARE row;  line 114: const HINT_AUGMENTED_OBJECTS = new Set(['LINE', 'ZONE']);  line 127: the hint union runs only for those objects
toolCategories.ts          line 119: "(never tool names — see semanticRouter.ts)";  semanticRouter.ts line 227: "Never mention or invent tool names — only category names and keywords."
stageTools.ts              line 625: filterToolsByMessage(coverage.coveredFlat, ctx.message, catRes.categories, …) is the covered-flat door; line 63 imports retrieveToolCandidates (Yol B, valve off: vector.toolRetrievalMode value 0)
metricRegistry.ts (seed)   line 88-103: id fire, synonyms ['scrap','ıskarta','iskarta'], categoryHints ['quality']
measured       2026-09-15T20:2xZ–21:1xZ, sed/grep over the shared clone at master
```

## PREMISE

MEASURED: the witnessed turn's stage 07 and stage 10 bytes, the three published rows, and the six code sites in `the-witness` and `the-seams`.
MEASURED: the tool is not in any code-floor category in toolCategories.ts (grep: only askSuggestions.ts names it) — its only home is the PUBLISHED quality row, which the runtime reads. So the category is reachable in principle and was not reached on this turn.
UNMEASURED: whether any OTHER turn today was starved the same way. This card repairs the mechanism, not the count.
UNMEASURED: CI at your head — the scout reads it when you push.
SELF-INVALIDATION: this premise dies if master moves off the fenced anchor before you fork (re-fork, re-read the six sites, print what changed), if `filterToolsByMessage`'s signature at line 625 no longer matches the fence, or if the armor already folds aliases on master.

## ORDERS

ORDER 1 - THE NAMED-TOOL DOOR, deterministic and ADDITIVE. In the register-tools stage, AFTER `filterToolsByMessage` has produced the covered set and BEFORE the union with the uncovered slice and ALWAYS_INCLUDE: fold the user's message to tokens (split on whitespace and punctuation, lowercase, Turkish-fold with `turkishFold` from `routing/resolveEntityRef.ts`); for every ACTIVE tool of every ACTIVE covered backend whose name, lowercased, equals a token, add that tool to the offered set. The door NEVER removes anything, never bypasses the exposure gate (a write-exposed tool still meets gatewayPolicy exactly as before), and never matches partial names, prefixes or fuzzy forms — a name is a name. Record it on the stage 07 span as `namedToolsOffered: string[]` (empty array printed when empty — A-REC-S133-5) and on the `[ToolRoute]` line as `named=<n>`. Put the rule in ONE exported pure function (`namedToolsInMessage(tokens, catalogue)`) in `routing/`, beside the other pure routing readers, so the scout can read it in one place.

ORDER 2 - FOLD PUBLISHED ALIASES AT THE ARMOR. `MetricVocabulary` gains `aliasesById` (threaded from the resolved registry, which already builds it — wire, do not rebuild). In `armorIrFrame`, a raw metric that is not an id but equals a published alias (Turkish-folded) becomes its id in `metrics`; it does NOT land on `metricsSurface`. The drop arithmetic stays honest: a folded word is neither kept-as-typed nor dropped, so add `foldedMetrics` beside `droppedMetrics` and print it on the `[Frame]` line. The vocabulary parameter stays REQUIRED (no default) — the module's own law. Every call site the compiler enumerates threads the aliases: the live one at semanticRouter.ts line 358 and the replay lenses (frameForceFitLens.ts, routeShadowLens.ts, clarificationLens.ts). The census that keeps them enumerated is `api/cwf/__tests__/metricRegistryData.test.ts` (its call-site scan at lines 177-209) — extend THAT test; create no second census. Copy the folding shape stageClarify.ts already uses at line 1282 (`for (const alias of metricVocab.aliasesById[id] ?? []) known.add(turkishFold(alias))`), where `turkishFold` is exported from `routing/resolveEntityRef.ts`.

ORDER 3 - LET THE METRIC HINT REACH THE ORDER CELL — A K1 AMENDMENT, GATED ON THE OWNER. `HINT_AUGMENTED_OBJECTS` is a cell list of the K1-ratified matrix (deriveCategories.ts lines 98 and 106-107), and the scout measured that the ratifying phase prompt is not in the versioned tree, so neither the scout nor the Architect can rule it. Build it BEHIND the ruling: add `ORDER` to the set in its own commit, last, with a comment naming this witness and the ruling id OWNER-RULING-S140-K1-ORDER-CELL-HINT-1. If that ruling has not reached your box by the time ORDERS 1-2 are pushed, push ORDERS 1-2 without it and say so in the report; ORDERS 1-2 close the witness on their own.

ORDER 4 - TESTS, FAILING FIRST ON THE FORK POINT: (a) the witness message against a fixture catalogue containing the tool in `quality` only → offered, `namedToolsOffered` names it; (b) the same message with the tool write-exposed and ungoverned → still refused by the gate, so the door does not widen exposure; (c) `armorIrFrame` with vocab ids `[fire]` and aliases `{fire:[scrap]}` on raw metrics `["scrap"]` → `metrics ["fire"]`, `metricsSurface []`, `foldedMetrics 1`, `droppedMetrics 0`; (d) `deriveCandidateCategories` for QUERY_METRIC × ORDER with metrics `[fire]` and the quality hint → categories contain `production` AND `quality`; (e) a prefix (`getOrderScrap`) and a fuzzy form (`getOrderScrapWithReason`) are NOT matched by the door. Run the repository's OWN gate set, not your habitual four: `npm run build` (all five gates), vitest, `typecheck:api`, the relay gate over your report; rule26 runs only on the forge and changes no rendered time here.

ORDER 5 - PUSH EARLY, REPORT AFTER. Branch `phase/named-tool-is-offered-s140-1` from master. Code commit first, pushed; open the PR; then the report at docs/relay/NAMED-TOOL-IS-OFFERED-S140-1-AG4-report.md with the CLAIMS table, the failing-first outputs, the diff, and every finding you met beside the card. Post ONE from_lane slip: `read relay_inbox at <ISO>`, branch, forty-hex head, PR number, gates run. You do not land: the foreman lands on a landing card.

## FALSIFIER

If `armorIrFrame` on master ALREADY folds aliases and the witnessed `metricsSurface ["scrap"]` came from somewhere else, STOP: this card's REASON 2 is wrong; print the bytes and post them.

If the covered catalogue at register-tools does NOT contain getOrderScrapWithReasons (the tool is filtered out before the door could see it), STOP: the door as ordered cannot reach it; print where it is dropped.

If adding the door changes any existing test's expectation on the OFFERED count for a message that names no tool, STOP: the door is not additive as ordered.

## SHARED SURFACES

```scope
- api/cwf/_lib/routing/namedTools.ts (new)
- api/cwf/_lib/routing/irFrame.ts
- api/cwf/_lib/routing/deriveCategories.ts
- api/cwf/_lib/routing/resolveTurnFrame.ts
- api/cwf/_lib/knowledge/resolveMetricRegistry.ts
- api/cwf/_lib/turn/stageTools.ts
- api/cwf/_lib/turn/types.ts
- api/cwf/__tests__/namedToolIsOffered.test.ts (new)
- api/cwf/__tests__/metricRegistryData.test.ts
- api/cwf/_lib/routing/__tests__/deriveCategories.test.ts
- docs/relay/NAMED-TOOL-IS-OFFERED-S140-1-AG4-report.md
- public/architecture/manifest.json (reseal only if check:doc-drift demands it)
```

You touch NOTHING else. Not the router prompt, not the category rows, not the gateway policy.

## DECISION RIGHTS

You choose file placement and names within the scope. You may split ORDER 2's `aliasesById` threading across the call sites the compiler names. You may refuse ORDER 3 on a measured reason and still deliver ORDERS 1-2. You may not widen the door beyond exact, folded, whole-token equality.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the owner named an existing, published-category, read-exposed tool and it was not offered | MEASURED: turn_trace_digest stages 07 and 10 + domain_rules at 2026-09-15T20:0xZ | the-witness |
| the router and keyword paths cannot match a tool name by design | READ: toolCategories.ts line 119 and semanticRouter.ts line 227 at 2026-09-15T20:2xZ | the-seams |
| the armor keeps ids only, and aliasesById has no consumer on the FRAME PATH (it has four elsewhere) | MEASURED: irFrame.ts lines 30 and 171, resolveMetricRegistry.ts lines 106 and 275 at 2026-09-15T21:1xZ; the scout's grep of 2026-09-16T04:2xZ naming the four other consumers | the-seams |
| the quality hint reaches LINE and ZONE cells only | READ: deriveCategories.ts lines 114 and 127 at 2026-09-15T21:0xZ | the-seams |
| the fire row publishes scrap as an alias with the quality hint | MEASURED: domain_rules armes.metric_registry key fire at 2026-09-15T21:1xZ | the-witness |
| Yol B tool retrieval would also have found it by description | READ: agent.param vector.toolRetrievalMode value 0 at 2026-09-15T20:0xZ — the valve is off, so it did not | the-seams |
| CI at your head | NOT-READ | the scout reads it on push |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if master moves off the fenced anchor before you fork, if any of the six code sites reads differently from the fence, or if the quality row is unpublished.
