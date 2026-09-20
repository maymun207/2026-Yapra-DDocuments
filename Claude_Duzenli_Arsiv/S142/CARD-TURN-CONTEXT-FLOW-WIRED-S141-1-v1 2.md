<!-- relay-audit: v1 kind=card -->
CARD-TURN-CONTEXT-FLOW-WIRED-S141-1-v1

LANE: AG-5
fanout: personalized
A WIRING card (§12.6) — plan v2 item P1-2, A23 §9 step 2. The S140 measured table called the `turn_context` contribution triple ABSENT; that reading was WRONG and is corrected here by name: `api/cwf/_lib/turn/turnContextLog.ts` (260 lines, PHASE-TURN-CONTEXT-SKELETON-1, landed 2026-08-20) is the append-only, typed, attributed flow with confidence and pinned read declarations, it has its own test, and its header says "imported by nobody on the live turn path" — the CALLER-ABSENT class. Nothing is built here. Three producers that already stamp the mutable bag are made to ALSO contribute to the flow at the same site, the tool-argument binder declares the read it makes, and the sealed record leaves the turn on the `turn_done` ledger row. The flow steers NOTHING in this card: no decision path reads it. That is the A23 gate ("akış olmadan ⑤/⑥ güven okuyamaz") — the flow is what P1-3 will read.

PRECONDITION: `origin/master` is at or beyond the head in `the-head`; `turnContextLog.ts` has no importer under `api/` other than its own test (grep prints exactly that); AG-4 holds CARD-BASELINE-9-1-BOTH-TREES-S141-1-v2 and you do NOT touch its paths (scripts/a23BaselineArmA.ts, api/cwf/_lib/replay/*, docs/relay/BASELINE-*).

```evidence:the-head
master               d29935c1b87ce3878061061556689dc67006e411   merge of PR 577, 2026-09-17T05:58:46Z, read from the shared clone's origin ref at 06:44:37Z
the flow             api/cwf/_lib/turn/turnContextLog.ts — exports ContributorId, Confidence {value, basis}, ReadDeclaration {key, seq, weight}, Contribution, ContributionInput, TurnContextLogOptions, ContributionRejection (9 channels incl. 'unknown-read-seq', 'sealed'), ContributionRefused (Error with .reason), TurnContextRecord {turnId, contributions, supersededKeys}, class TurnContextLog(turnId, options) with contribute(input) and seal(); importers: api/cwf/_lib/turn/__tests__/turnContextLog.test.ts ONLY (git grep at master, 06:45:25Z)
the bag              api/cwf/_lib/turn/context.ts createTurnContext(seed) — 80 lines, returns the mutable TurnContext via `as unknown as TurnContext`; no confidence, no producer
producer 1           api/cwf/_lib/turn/stageTools.ts:797 `ctx.irFrame = turnFrame.frame;` — IrFrame {action, object, entity_ref[], metrics[], metricsSurface[], time {surface}|null, confidence 'HIGH'|'AMBIGUOUS'} (routing/irFrame.ts:70-99)
producer 2           api/cwf/_lib/turn/stageClarify.ts:2664 `ctx.entityResolutions = {` — canonicalIds + `resolved?: readonly ResolvedEntityStamp[]` (types.ts:819-821), stamped on every frame-bearing turn
producer 3 / reader  api/cwf/_lib/turn/stageTools.ts:1384 `const bind = bindResolvedEntities(argPolicy, args ?? {}, ctx.entityResolutions?.resolved);` — PR 577's binder; its `[ToolArgBind]` line and toolLedger.argBindings already exist
the exit             api/cwf/_lib/turn/stageStream.ts:868 `argBindings: argBindingsWithoutValues(ctx.toolLedger?.argBindings),` inside the turn_done payload (:805-8xx) — the precedent for a values-stripped projection on the ledger row
```

## PREMISE

MEASURED: every line in `the-head`, by `git grep`/`git show` at master over the shared clone at 2026-09-17T06:44:37Z–06:45:25Z.
MEASURED: the S140 table's ABSENT verdict for this item (CWF-S140-ARCHITECTURE-VS-CODE-MEASURED-v1, "turn/context.ts is an 80-line bag") — true of the bag, false of the tree: the flow module was already there. Recorded as A-REC-S141-MEASURED-TABLE-MISSED-THE-FLOW-MODULE-1.
UNMEASURED: whether `ResolvedEntityStamp` carries a per-entity confidence today; ORDER 2 reads it and, if absent, contributes `{ value: 1, basis: 'registry-resolved' }` for a resolved stamp and nothing for an ambiguity (an ambiguity is NOT a contribution — the same rule the stamp site already applies to memory).
SELF-INVALIDATION: this premise dies if `origin/master` moves by a commit touching turnContextLog.ts, context.ts, the three producer sites or stageStream.ts's turn_done payload, or if a v2 appears.

## ORDERS

ORDER 1 - THE CONTAINER ON THE CONTEXT. Branch `phase/turn-context-flow-wired-s141-1` from `origin/master`; print the forty-hex head you cut from. In `context.ts`, construct `new TurnContextLog(seed.turnId)` and carry it on the context as `ctx.turnContext` (type it in `types.ts` beside `entityResolutions`, REQUIRED not optional — an absent flow must not be readable as an empty one). No other change to the bag.

ORDER 2 - THREE PRODUCERS, SAME SITES, SAME VALUES. At each site in `the-head`, immediately after the existing stamp, contribute to `ctx.turnContext` FROM THE SAME VALUE the stamp used (parity by construction, the LENS-CEILING-1 rule already at :2664):
 (a) :797 — by `'ir-router'`, keys `frame.action`, `frame.object`, `frame.entity_ref`, `frame.metrics`, `frame.time`; confidence from the frame's own field through ONE exported constant `ROUTER_DECLARED_CONFIDENCE = { HIGH: { value: 1, basis: 'router-declared HIGH' }, AMBIGUOUS: { value: 0.5, basis: 'router-declared AMBIGUOUS' } }` — DECLARED, not calibrated, and the constant's doc comment says so and names P1-3/P1-8 as where calibration lives.
 (b) :2664 — by `'clarify-resolve'`, key `entity.resolved`, value = the `resolved` stamps (canonicalId + layer, NO surface text), confidence per the UNMEASURED line above. If the carried-option rung (ORDER 2 of PR 576) injected a ref this turn, contribute a second entry by `'carried-option'`, key `entity.carried`, value = the injected ref, confidence `{ value: 1, basis: 'user-chose-option' }`.
 (c) :1384 — by `'tool-arg-bind'`, key `tool.arg.bound`, value = the values-stripped bind (tool, param, layer — the `argBindingsWithoutValues` shape), and `reads: [{ key: 'entity.resolved', seq: <the seq (b) returned>, weight: 1 }]` — the FIRST pinned read declaration on the live path; keep (b)'s returned seq on the context to pin it. If (b) did not run this turn, no read is declared and the bind contributes with `reads: []`.
 A `ContributionRefused` NEVER escapes the turn: catch at each site, print ONE line `[TurnContext] refused by=<producer> key=<key> reason=<.reason>` and continue — the flow is observe-only in this card and a refusal is a finding, not an outage. Do not swallow silently.

ORDER 3 - THE EXIT. At stageStream.ts's turn_done payload, beside `argBindings` (:868), add `turnContext: { contributions: <n>, producers: <sorted distinct by>, keys: <sorted distinct key>, supersededKeys: <record>, reads: <n declared> }` from `ctx.turnContext.seal()` — counts and names, NO values (the argBindingsWithoutValues precedent; a value on the ledger row is a tenant leak). Seal exactly once; a second seal is the container's own 'sealed' refusal and must not be reachable.

ORDER 4 - TESTS, THEN GATES. Add `api/cwf/_lib/turn/__tests__/turnContextFlowWired.test.ts`: a harness turn where (a) and (b) run and (c) pins (b)'s seq; a turn where (b) did not run and (c) declares no read; a refusal (e.g. confidence out of range) prints the line and the turn completes; the turn_done projection carries counts and names only — assert no `canonicalId` string appears in the payload. The existing turnContextLog.test.ts is UNTOUCHED. Then `npm run build` (all five gates, §8) and `vitest` — report each by name with its exit. `check:doc-drift` will name the narrative tab if the flow's wiring belongs in one; update that tab, not the others.

ORDER 5 - SHIP. Push; PR titled `PHASE-TURN-CONTEXT-FLOW-WIRED-S141-1: three producers and one pinned read on the live turn path`; slip on the bus with the forty-hex head and CI as you read it; report `docs/relay/TURN-CONTEXT-FLOW-WIRED-S141-1-AG5-report.md` on the same branch. Thirty minutes from green to a slip (§12.8) — the Architect cuts the landing card on the slip.

## FALSIFIER

If any decision path (stageClarify branching, toolArgPolicy, gatewayPolicy, the model prompt) READS `ctx.turnContext` to choose, STOP — that is P1-3's card, not this one. If wiring (a)/(b)/(c) changes ANY existing stamp, log line, or payload field, STOP and print the diff — parity means the flow copies, never replaces. If `turnContextLog.ts` needs a change to be wired, STOP and print why — the container was accepted as-is and a change to it is a second card.

## SHARED SURFACES

```scope
- api/cwf/_lib/turn/context.ts (construct the log)
- api/cwf/_lib/turn/types.ts (one required member)
- api/cwf/_lib/turn/stageTools.ts (:797 and :1384, contribute only)
- api/cwf/_lib/turn/stageClarify.ts (:2664, contribute only)
- api/cwf/_lib/turn/stageStream.ts (turn_done projection)
- api/cwf/_lib/turn/__tests__/turnContextFlowWired.test.ts (new)
- docs/relay/TURN-CONTEXT-FLOW-WIRED-S141-1-AG5-report.md (new)
- the narrative tab check:doc-drift names, if any
```

No migration, no governed row, no valve, no master push, no change to turnContextLog.ts, no path AG-4's baseline card holds.

## DECISION RIGHTS

You choose how the returned seq of (b) rides on the context to (c) (a field beside `entityResolutions` is the expected shape). You may refuse on evidence this card did not anticipate — above all if the three sites are not where `the-head` says at the head you cut from.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the flow exists, its exports, zero importers but its test | MEASURED: git grep/show at master, 2026-09-17T06:45:25Z | the-head |
| the three producer sites and the exit, by line | MEASURED: git grep at master, 2026-09-17T06:44:37Z–06:45:25Z | the-head |
| the S140 table's ABSENT verdict was wrong for this item | MEASURED: the module's first commit date in git log versus the table's date | the-head |
| per-entity confidence on ResolvedEntityStamp | NOT-READ | ORDER 2 reads it |

## ON-DISAGREEMENT

If any value here differs from what you measure live, YOUR READING WINS, you print both, and the difference is reported as a finding in its own right.

DECAYS if `origin/master` moves by a commit touching turnContextLog.ts, context.ts, stageTools.ts, stageClarify.ts or stageStream.ts, or if a v2 appears.
