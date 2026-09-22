<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1

LANE: scout

Adversary review of CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1; digests in `raw-tokens`). NEW subject (§12.1: to the scout, no gate lift). It is built on YOUR F1 of this morning: no tool-argument builder reads `ctx.entityResolutions`. The card's claim under test: binding a resolved entity id into an UNFILLED tool argument at the existing `planToolCall` seam, keyed by the governed row's `candidate_layer_key`, is a WIRING of mechanisms that exist (stamp + policy + plan), changes nothing when the model fills the slot itself, and can be witnessed from its own log line and ledger stamp because the trace carries arg SHAPES only.

DISCRIMINATORS, measure each and print what you measured:
(1) THE ANCHOR. `git ls-remote origin refs/heads/master` NOW versus the card's `the-head`; also print whether `refs/heads/phase/carried-option-injects-its-ref-s141-1` exists on the wire yet (AG-4's first card; a push there does not decay this card unless it touches the fenced files).
(2) THE SEND SEAM AS FENCED. stageTools.ts around the `planToolCall` call: is `ctx` (the TurnContext carrying `entityResolutions`) IN SCOPE at that site, and is `args` a plain object there or can it be the INNER_ARGS_UNSCHEMAD shape? Print the lines. If ctx is not reachable at the call site, say what is (the card leaves the crossing to the lane, but a crossing that needs a signature widening through three functions is a different card).
(3) THE LAYER QUESTION (ORDER 4). Read the tool's declared input schema for `getLineStopsReportForZones` at master (the backends catalogue / discovery cache / tool docs in the tree — name where you read it) and say what `zoneIds` is documented to hold. The card writes candidate_layer_key 'line' for it on the strength of ONE production call that carried a line's entity id and returned three stops. If the schema says equipment/zone ids, the card's ORDER 4 is WRONG as written and the verdict is RED with the schema line printed.
(4) THE CALLER-ABSENT CHECK (§12.6). Grep the consumers of `candidateLayerKey` and `loadSlotCandidates`: is there ANY existing path that fills an argument from a resolution (not merely offers candidates on refusal)? If one exists, this is not a wiring card.
(5) THE MIGRATION ROUTE. `scripts/checkMigrationVersions.ts` and toolArgPolicySeed.test.ts: does adding a second seed migration for `tool_arg_policy` break a version-key or row-count pin, and is the seed test pinned to exactly twenty-three rows? Print what the pin asserts.
(6) TENANT LENS over the card body (placeholders only: `<factory code>`, `<the line's entity id>`); the tool NAMES are vendor API names that already live in governed rows and prior landed reports — confirm they are not a tenant hit under the gate's own lens.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-RESOLVED-ENTITY-BINDS-TOOL-ARGUMENT-S141-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row, with an EXISTS on it in the seal SQL. A REFUSAL MET WHILE AUTHORING, carried per §12.2: cardPreflight refused the first draft on CP-1/CP-8 because a verdict-row UUID sat in prose; the UUID moved to `raw-tokens` and nothing else changed; the second body is the one in the BYTES row and read GREEN on all eleven checks at 2026-09-17T03:37:16Z (bridge preflight — a grammar reading, not this review).

```evidence:raw-tokens
card md5        e09fddcd4de4260b5f42eb813d77b31c
card sha256     91402ef0fc81f4275cc8c041de4784224123f4fdaf251b7bf07bce487c21e2d8
card bytes      16133
master (card)   47402e33faec80c45254668d917cb6f58625a916
your F1 row     b4d8fcaf-cb4e-42e9-acd6-e658bc515761   (verdict on CARD-CARRIED-OPTION-INJECTS-ITS-REF-S141-1-v1)
owner ruling    OWNER-RULING-S141-TOOL-ARGUMENT-CARD-FIRST-1 ("ÖNCE" — this card precedes the §9-1 baseline)
```
