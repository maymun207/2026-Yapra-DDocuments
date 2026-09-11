# F-S135-THE-GRAPH-WIRING-FINDING-WAS-MEASURED-WRONG-v2

SUPERSEDES F-S135-THE-GRAPH-WIRING-WOULD-CHANGE-NO-ANSWER-TODAY, which is WRONG and must not be quoted.
v1 stands in the record as written, because a delivered artefact is immutable and a correction is a new
version — but anyone reading v1 should stop at this line and read this file instead.

## WHAT v1 CLAIMED, AND WHY IT WAS WRONG

v1 reported that wiring the discovered containment graph into the answering path would change NO answer
today, on the strength of one number: children whose registry parent is NULL but for which the graph
holds a live edge, measured at ZERO. It concluded the wiring was future-proofing rather than a fix.

THE QUERY JOINED entity_topology_edges TO entity_registry AND THEN ASKED WHETHER THE REGISTRY'S PARENT
COLUMN WAS NULL. The join is what hid the answer. That population really is empty — because the
children in question ARE NOT IN THE REGISTRY AT ALL, so they never survive the join to be counted.

A KEY THAT IS ABSENT IS NOT A KEY WHOSE VALUE IS NULL. This repository's own parentage map encodes the
difference deliberately: a null parent means MEASURED TOP OF CHAIN, an absent key means UNMEASURED and
the candidate is KEPT. v1 measured the first and reported it as though it covered the second. It is the
empty-versus-zero law, broken by the Architect, in a finding the Architect wrote to close a card.

## WHAT IS ACTUALLY TRUE, RE-MEASURED 2026-09-09T22:22Z AGAINST THE LIVE DATABASE

```evidence:counts
backend_entity_layers declares THREE layers : factory (root) · line -> factory · equipment -> factory
entity_registry by layer                    : line 783 · factory 17 · equipment ZERO
entity_topology_edges, live                 : 2503 edges over 2503 distinct children
graph children with NO registry row at all  : 1720
  every one of them                         : child layer equipment, parent layer factory, via getEntities
of those 1720, parent found in registry     : 0
registry parent vs graph parent, disagreeing: 0
registry names a parent the graph lacks     : 0
```

Where both stores speak they agree COMPLETELY — zero disagreements in either direction. The gap is not
disagreement. The gap is that one store carries a whole LAYER the other has never heard of.

## THE FINDING, STATED PROPERLY

THE EQUIPMENT LAYER IS DECLARED, DISCOVERED, AND UN-INVENTORIED. The layer descriptor names it and says
it hangs off factory by a factoryId parameter. Discovery has found 1720 of its members and written them
into the edge ledger. `entity_registry` — the store the answering path actually reads — holds NOT ONE
equipment row.

So a user asking about a machine has no inventory to resolve against. The clarification path is not
wrong when it fails there; it is honestly empty, and the 1720 the system already discovered sit in a
table nothing on the answering path consults.

## AND THE OBVIOUS REPAIR IS BLOCKED BY A SECOND MEASURED FACT

The equipment edges name their parent by UUID. The registry names factories by short human codes. Two
vocabularies for the same seventeen factories, and no join between them can succeed however correct
either side is.

That means "wire parentsOf into the narrowing" — v1's proposed shape, and the shape the adversary had
already refused on other grounds — would return a parent id the rest of the system cannot match. The
landed source warns about exactly this class in its own comment about matching raw strings.

The likelier repair is that the equipment layer should be SYNCED INTO THE REGISTRY the way line and
factory are, keeping ONE inventory in ONE vocabulary. That is a hypothesis, not a ruling: it is question
B of CARD-ADVERSARY-REVIEW-EQUIPMENT-LAYER-HAS-NO-INVENTORY-S135-1-v1, posted to the adversary at
2026-09-09T22:24Z, together with the question that decides everything — WHY the sync never produced an
equipment row.

## THE LESSON, WHICH IS ABOUT THE ARCHITECT AND NOT ABOUT THE GRAPH

The adversary asked for one number before the card was cut, and it was right to. The Architect ran a
query, believed it, and wrote a finding closing the subject — the same shape as trusting a single
negative probe, which this house forbids by name. The zero was not a lie and it was not a typo; it was
a lens that could not see the population it was pointed at, and nothing in it announced that.

WHAT WOULD HAVE CAUGHT IT AT THE TIME: asking the same question a second way, with different
assumptions. Three formulations now exist and agree — no registry row, null parent, and disagreement —
and only the first one sees the 1720.

THE OWNER CAUGHT THIS. He asked when the graph's consumerless state gets solved and whether it was in
the lane's current work, rather than accepting v1's closure. His question is what triggered the
re-measurement. Recorded by name, beside the Architect's blind spot, because a record where every
insight looks like the Architect's teaches a future Architect to trust itself more than it has earned.
