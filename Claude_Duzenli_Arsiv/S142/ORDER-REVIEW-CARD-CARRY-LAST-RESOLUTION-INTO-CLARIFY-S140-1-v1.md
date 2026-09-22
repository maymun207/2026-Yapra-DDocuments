<!-- relay-audit: v1 kind=notice -->
ORDER-REVIEW-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1

LANE: scout

Adversary review of CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 (bytes in the row named BYTES-FOR-REVIEW-CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1; digests in `raw-tokens`). NEW subject: P1-4, the cross-turn carrier — a WIRING card. The claim under test is that the slice already exists as the asking turn's episode row and only the consumer is absent.

DISCRIMINATORS, measure each and print what you measured:
(1) The carrier read: EpisodesRepository.listRecentByConversation at master — its filter (OFFERABLE_OUTCOME_FILTER): does it ADMIT an asking turn's episode? Read the filter and the outcome class an ask turn distils to (memoryDistill.ts — what class does a turn with zero tool calls and a clarification outcome get?). If an asking turn is excluded, the card's FALSIFIER fires and the card is RED — say which class.
(2) The shape join: `entities.canonical` at distill (memoryDistill.ts:489-495 from ctx.entityResolutions.canonicalIds) versus what narrowAmbiguousByResolvedPeer / walkToResolvedPeer compare against (CandidateParentage's parent_entity_id — bare ids or layer-qualified?). If the walker needs a layer-qualified key the card's ORDER 1 cannot satisfy with bare ids, RED (the card's FALSIFIER names this).
(3) The seam order: is the peer set built AFTER the resolver loop (stageClarify.ts ~965-976) such that a carried peer can be added before narrowing without touching the loop? Print the lines.
(4) ORDER 2's option match: does ctx.askEvidence at distill time carry the options with entityIds (askOnUnresolved.ts AskEvidence shape)? If not, the card asks the lane to write what is not in hand — RED.
(5) Tenant-zero: ORDER 4 names synthetic fixtures and forbids live names in the report; run the gate's lens over the card body and locate the hits (the-witness fence is on the bus, acceptable).
(6) §12.7: is there an existing consumer of listRecentByConversation on the clarify path, or any prior cross-turn mechanism (grep lastResolution|crossTurn|carried|priorEpisode in api/cwf/_lib/turn and routing)? An existing one makes this card wrong.

VERDICT on ONE line first: `ADVERSARY-VERDICT: GREEN card=CARD-CARRY-LAST-RESOLUTION-INTO-CLARIFY-S140-1-v1 sha256=<hex>` or RED with the discriminator number, with `reply_to` = THIS row's id. The Architect seals ONLY on the verdict that answers THIS row.

```evidence:raw-tokens
card md5        bc92626d1d6c1198ca23f6b99e5122ac
card sha256     9193d9712645d22eca42df11a2d26508ea87dcc99b05473562435f082f81698d
master          4bec094ea1d14289eaf4783677d304385e4e4bc5
asking turn     518d7393413c51080b2fa6377587e47f
reply turn      5b3f26de3e9f4ae998f14dfa97e13263
```
