# F-S135-THE-GRAPH-WIRING-WOULD-CHANGE-NO-ANSWER-TODAY

STATUS: MEASURED. The F24 graph-wiring card STANDS DOWN as a repair. It is not refused as wrong; it is
refused as CHANGING NOTHING, and the number that says so is below.

## WHAT WAS PROPOSED

Wire the discovered containment graph (`entity_topology_edges`, 2503 live edges, each stamped with the
tool that observed it) into the clarification answering path, which today reads parentage only from
`entity_registry`. The Architect proposed it as the cheapest remaining product improvement and sent the
shape to the adversary first.

## THE ADVERSARY REFUSED THE SHAPE ON TWO COUNTS, BOTH CORRECT

1. WRONG SYMBOL. The card named `containsAmong`, calling it "word for word" the question the turn asks.
   It is not. The turn performs a MULTI-HOP WALK up the chain — child to parent to parent — until it
   meets a resolved peer. `containsAmong` is a ONE-HOP, PARENT-SIDE test that must be TOLD the parent it
   is checking, and it cannot see a grandparent relation at all. `parentsOf` is the symbol that maps onto
   the existing parentage map. The reader's own docblock says containment is answered by asking for the
   child layer's parents and INVERTING — that is, by inverting `parentsOf`. The card would have reached
   the same data by the longer, lossier route.
2. NOT A WIRING CARD, BY THE CARD'S OWN TEST. The card wrote "a wiring card that needs new plumbing is
   not a wiring card". The enclosing function takes frame, aliasResult and a loaded bundle, and holds NO
   backendId; both graph symbols take backendId as argument 1. Threading one down means changing a
   signature that was deliberately reshaped in an earlier phase. That is work, not wiring.

## AND THE ADVERSARY CORRECTED THE ARCHITECT'S QUESTION, WHICH IS THE PART THAT MATTERED

The card asked whether the two sources DISAGREE, citing the arbitration surface's conflicting 0 of 783.
The scout said that is the wrong population, and it was right: a conflict needs BOTH sources to hold an
opinion. The narrowing does not fail on conflict — it fails when the REGISTRY IS SILENT, because a
candidate whose parent row is missing is treated as unmeasured and KEPT, the ambiguity stands, and the
user is asked the question this whole line of work exists to stop.

So the population that decides the card is: CHILDREN WHOSE REGISTRY PARENT IS NULL BUT FOR WHICH THE
GRAPH HOLDS A LIVE EDGE. None of those is a conflict, so none of them appears in the 0 of 783.

## THE MEASUREMENT, RUN BY THE ARCHITECT AT 2026-09-09T18:56Z AGAINST THE LIVE DATABASE

```evidence:count
entity_registry rows, all layers ....................................... 800
  of which parent_entity_id IS NULL .................................... 17
entity_topology_edges with absent_since IS NULL (live edges) ........... 2503
children whose registry parent is NULL and for which a live edge EXISTS .. 0
```

ZERO. The seventeen parentless registry rows are top-of-chain entities the graph correctly holds no
containment edge for. The graph knows no parent the registry does not.

## THE RULING

The wiring would change NO answer today. It is therefore not a fix, and cutting it as one would have
put a card, a lane burst, a signature change and a review cycle behind a benefit that does not exist.
The scout named the falsifier in its own reply — "if that count is ZERO, your premature-refusal instinct
is right and I withdraw the objection" — and the count is zero.

F24 stays in the missing-functionality table as OPEN, reclassified from a repair to PROVENANCE AND
FUTURE-PROOFING, and it is not scheduled. It becomes a fix the day the measurement above returns
non-zero, which is a one-query check any future session can repeat.

## WHAT IS CARRIED FORWARD FROM THE REVIEW ANYWAY, because it will be needed whenever this is built

- `parentsOf`, not `containsAmong`.
- An `unreadable` answer must OMIT THE KEY. The parentage map encodes three states and a null
  parentEntityId means MEASURED TOP OF CHAIN, so mapping a failed read to null would launder a read
  failure into a positive measurement and stop the walk at a node it should have walked past.
- `CandidateParentage` is a two-field struct with NO provenance field, so any claim that provenance
  survives into it is false until the type is widened.
- Precedence must be written down before two sources feed one map: registry wins, graph fills silence.
- Both graph symbols are UNTESTED BY NAME repo-wide, so whoever wires them characterises them first.
- The S117 parent promotion lives on the WRITE side and this lives on the READ side; they do not collide,
  and the shared surface is the layer-descriptor repository.

## WHY THIS IS RECORDED RATHER THAN DROPPED

A proposal that dies of measurement is worth more written down than a proposal that dies of silence: the
next session that notices 2503 collected edges nobody reads will have the same idea, and this file is the
one-query answer to it. The Architect's blind spot is recorded beside it — the card asked whether the two
sources disagree, when the question was whether one of them is silent.
