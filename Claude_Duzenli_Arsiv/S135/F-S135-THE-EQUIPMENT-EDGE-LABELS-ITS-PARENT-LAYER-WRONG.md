# F-S135-THE-EQUIPMENT-EDGE-LABELS-ITS-PARENT-LAYER-WRONG

STATUS: MEASURED, live database, 2026-09-09T22:47Z. This is the third correction on this subject in one
night, and each one came from asking the same question a different way. Read the chain, not only the end.

## THE FINDING IN ONE SENTENCE

Every one of the 1720 live equipment edges declares `parent_layer_key = 'factory'`, and every parent it
actually names is a **LINE** row in the registry. The label is wrong on 1720 of 1720 rows.

## THE MEASUREMENT

```evidence:labels
distinct parent refs on live equipment edges            : 11
of those, matched as an entity_id in entity_registry    : 11   (ALL of them)
the layer those matched rows actually belong to         : line
equipment edges labelled parent_layer_key = 'line'      : 0
equipment edges labelled parent_layer_key = 'factory'   : 1720
factory rows' attrs keys                                : name only — NO uuid anywhere
line layer parent refs, by contrast                     : factory CODES such as Masse
```

So the shape is: factory (code) -> line (uuid) -> equipment (name+timestamp), and the equipment edge
correctly points at its line while CALLING that line a factory.

## HOW THIS CORRECTS TWO EARLIER CONCLUSIONS, BOTH OF THEM MINE OR ADOPTED BY ME

FIRST CORRECTION, EARLIER TONIGHT. I reported that wiring the graph would change no answer, on a count of
ZERO. That query JOINED the graph to the registry and asked whether the registry's parent column was
null; the population was empty because the children are not in the registry at all. Absent is not null.
Re-measured, the number is 1720. Recorded as F-S135-THE-GRAPH-WIRING-FINDING-WAS-MEASURED-WRONG-v2.

SECOND CORRECTION, THIS ONE. The adversary and I then both concluded that the equipment edges name their
parent by UUID while the registry names factories by code — "two vocabularies for the same factories" —
and built a repair argument on it: that syncing equipment alone would leave a UUID parent that no
factory row could match, so a mapping between two identifier spaces was needed first.

THAT WAS WRONG, AND IT WAS WRONG BECAUSE WE BOTH BELIEVED A COLUMN'S LABEL. There is no unmatched
foreign key and no second identifier space. The parent IS in the registry, it IS keyed the way its own
layer is keyed, and the line layer is keyed by UUID exactly as the equipment edges spell it. The only
thing broken is the LAYER NAME written beside it.

This repository's own law, from its lane charter: THE LABEL OF A FIELD IS NOT ITS COMPUTATION — before
making an indicator a premise, read the expression that produces it. Two actors read `parent_layer_key`
as a fact about the world and reasoned for an hour on top of it.

## WHY IT MATTERS, BEYOND BEING WRONG

A reader asking the graph "what contains this machine" gets an answer that says FACTORY and hands back a
LINE id. Any consumer that trusts the layer name and then looks the ref up in the factory layer finds
nothing, and — because absence means unmeasured — keeps the candidate and asks the user. That is the
same false-empty family the owner has now witnessed twice in production, arriving by a different road.

It also means the layer DESCRIPTOR is suspect: `backend_entity_layers` declares equipment as hanging off
factory by a factoryId parameter. If equipment actually hangs off line, the descriptor is wrong too, and
the discovery fan-out has been asking the wrong parent question all along — which is a candidate
explanation for the separate defect that equipment has ZERO registry rows while its edges exist.

## WHAT IS STILL UNMEASURED, NAMED RATHER THAN GUESSED

- WHETHER the descriptor or the edge writer is the defect. One of them is wrong about the hierarchy;
  possibly both. NOT MEASURED.
- WHY equipment has zero registry rows. The adversary eliminated three causes by reading the source —
  the descriptor exists, the cadence gate does not exclude it from the cron path, and a never-synced
  layer is always due — and narrowed the loss to two candidates between the edge write and the registry
  write: an arbitration filter that refuses every row, or a registry upsert that throws and is caught.
  NOT MEASURED.
- Whether any equipment question has ever reached production. The adversary measured that EQUIPMENT is a
  live frame object across the answering path in shipped source, so it CAN be asked; whether it HAS been
  is a different question and is unmeasured.

## THE METHOD NOTE, WHICH IS THE PART WORTH KEEPING

Three formulations of one question produced three different answers tonight: a join that hid the
population, a probe that found a vocabulary mismatch that was not there, and a lookup that asked which
layer the parent actually belongs to. Only the third is true, and nothing in the first two announced
that they were incomplete.

The owner forced the first correction by refusing the closure and asking when the graph gets consumed.
The adversary forced the second by demanding one measurement before a card was cut. The third came from
taking the adversary's own suggested query — "the join key may already be on disk" — and running it,
which returned a NO that only made sense once the layer question was asked.
