# F-S135-THE-GRAPH-WIRING-FINDING-MEASURED-THE-WRONG-POPULATION

STATUS: CORRECTION, MEASURED. This SUPERSEDES the ruling in
`F-S135-THE-GRAPH-WIRING-WOULD-CHANGE-NO-ANSWER-TODAY` without discarding it. That finding's zero was
CORRECT for the population it measured and that population was the WRONG ONE. The owner's question about
graph databases is what caused the re-measurement, and it is recorded here by name as a design-source
contribution (S112-YASA-1).

Session S135. Written 2026-09-10T05:45Z. Master `7591fff69860eb67c054b9738f9b9b2bd2b48e5b`.

## WHAT THE EARLIER FINDING MEASURED

> children whose registry parent is NULL and for which a live edge EXISTS .. 0

That query counts rows that ARE IN the registry carrying a null parent. Its conclusion — "the graph
knows no parent the registry does not" — was drawn from that count.

## THE POPULATION IT MISSED

A child can be invisible to the registry in TWO ways, and the earlier query saw only one:

1. the registry HAS a row for it and the parent column is null — **measured, and it was 0**
2. the registry has NO ROW FOR IT AT ALL — **never measured**

The equipment layer is entirely case 2. It has no rows, so its children cannot appear in a query that
starts from registry rows. The zero was true and blind at the same time.

## THE RE-MEASUREMENT, live database, 2026-09-10T05:44Z, backend armes

```evidence:count
distinct live children in entity_topology_edges (absent_since IS NULL) ......... 2512
  of which the registry has NO ROW AT ALL ..................................... 1729
  of which the registry HAS a row whose parent is null and the graph knows one ... 0
```

So today the graph holds containment for **1729 children the registry cannot describe at all**. The
earlier finding's second number is reproduced exactly; it is the first number that was never taken.

## WHAT THIS DOES *NOT* CHANGE — AND THIS IS THE IMPORTANT HALF

It does NOT promote the graph-wiring card to a fix. Those 1729 are missing because the WRITE PATH IS
BROKEN — `F-S135-EQUIPMENT-REGISTRY-EMPTY-ROOT-CAUSE-MEASURED-1`, the duplicate-conflict-key crash whose
repair is with a producer as `CARD-EQUIPMENT-REGISTRY-DEDUPE-1-S135-1-v1`. Wiring the read path to the
graph to route around an empty registry would be BUILDING A BYPASS AROUND A BUG: it would make the
symptom disappear, leave the crash running every thirty minutes, and remove the pressure that is
currently the only thing making anyone look at it.

The correct order is: repair the writer, let the registry fill, then RE-RUN THE COUNT ABOVE. Whatever
remains non-zero after that is the true residue — genuine multi-parent containment the single
`parent_entity_id` column cannot hold — and THAT number, not this one, is what decides the wiring card.

## THE STANDING TRIGGER, unchanged in form and corrected in content

The earlier finding said F24 "becomes a fix the day the measurement returns non-zero, which is a
one-query check any future session can repeat." That remains right. The query it named was incomplete.
The check to repeat is the THREE-number query in the fence above, and the number that matters is
`registry has NO ROW AT ALL` measured AFTER a tick in which the equipment layer wrote successfully.

## THE SEPARATE, STILL-TRUE FINDING

`GraphKbReader` is defined at `api/cwf/_lib/knowledge/graphKb/GraphKbReader.ts` with `parentsOf` at
line 82 and `containsAmong` at line 113. A repo-wide grep at this master returns **no import of
GraphKbReader anywhere outside its own tests**. The graph reader has ZERO CONSUMERS. That is the
CALLER-ABSENT class (s12.6) and it is unchanged by this correction: the graph is not underpowered, it is
unplugged. Whether plugging it in changes an answer is exactly what the re-run above decides.

## THE ARCHITECT'S BLIND SPOT, recorded beside the owner's contribution

The earlier finding already recorded one: "the card asked whether the two sources disagree, when the
question was whether one of them is silent." This is the same error one level deeper — the correction
asked whether the registry is silent ABOUT A ROW IT HAS, when it should have asked whether the registry
HAS A ROW. Each time the population was narrowed by the shape of the query rather than by the shape of
the question.
