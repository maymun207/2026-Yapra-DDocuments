# F-S135-EQUIPMENT-REGISTRY-EMPTY-CAUSE-NARROWED-v2

STATUS: OPEN, CAUSE NOT YET PROVEN. This EXTENDS
F-S135-THE-LINE-LAYER-IS-WHOLE-AND-THE-EQUIPMENT-LAYER-IS-THE-GAP, which measured the
SYMPTOM. It does not replace it. Measured 2026-09-10 against live production at master
`16fef74cdbee6ca57060005ebb0e23894404fede`.

OWNER QUESTION THAT FORCED THIS, recorded by name under S112-YASA-1 and s12.14: "do we
understand the whole problem, and is what we wrote enough to solve it". The honest answer
was NO, and asking it produced the narrowing below. The v1 document measured a gap and
would have been mistaken for a diagnosis.

## THE CONTRADICTION, WHICH IS THE FINDING

One cron tick, one writer, two outcomes. Read from the live database:

    entity_registry   armes/factory    active  17 rows   newest 2026-09-10 00:01:16Z
    entity_topology   equipment edges          1725      last_seen 2026-09-10 00:02:00Z
    entity_topology   line edges                783      last_seen 2026-09-10 00:02:28Z
    entity_registry   armes/line       active 783 rows   newest 2026-09-10 00:02:32Z
    entity_registry   armes/equipment                    NO ROWS, ANY STATUS

The equipment layer SWEPT. It reached its backend, called its declared tool, and wrote
1725 live edges at 00:02:00Z — 25 minutes before this was measured. On the same tick the
line layer wrote BOTH its edges and its registry rows. Equipment wrote edges and NO
registry row.

This repeats every thirty minutes and is reproducible on demand.

## WHY THAT SHOULD BE IMPOSSIBLE, READ FROM SOURCE

`api/cwf/_lib/backends/entityDiscoverySync.ts`, at master:

    line 903   persistEdges(...)                    <- edges written HERE
    line 906   if (outcome.entities.length === 0) { ... return; }   <- the only skip after
    line 935   rows = outcome.entities.map(toSyncInput)
    line 957   registryRepo.upsertLayer(...)        <- registry written HERE

Edges are built FROM `outcome.entities`. So 1725 edges means `outcome.entities` was not
empty, which means the only early return between the two writes did NOT fire, which means
`upsertLayer` was reached. And arbitration cannot be the cause: it is documented and coded
never to drop a row — "dropping the row instead would turn a parentage dispute into a
missing entity, which is a strictly worse lie than the one being fixed" — it only rewrites
`parentEntityId`.

Nor is the database refusing the write. `entity_registry` carries only a status CHECK, a
backend FK, a primary key and a UNIQUE on (backend_id, layer_key, entity_id). Nothing there
can single out the equipment layer.

## THE THREE SURVIVING EXPLANATIONS, AND WHY THIS DOCUMENT STOPS HERE

1. `upsertLayer` THROWS for this layer, and the caller's own posture — "one layer's failure
   never aborts the others" — swallows it. Edges, already written, survive. This fits every
   number above.
2. The 1725 equipment edges are written by a DIFFERENT path than the one read above, and the
   equipment layer's registry sweep never runs at all.
3. Something reached `upsertLayer` with an empty row set for a reason not yet read.

ONE ARTEFACT SEPARATES ALL THREE and it already exists: the log line this code emits every
tick, `[EntityDiscovery] backend=armes layer=equipment ...`, which prints the shape, the call
count, total/active/missing, the arbitration report, and every SKIP reason by name.

THE ARCHITECT CANNOT READ IT. The runtime-log lens returned zero rows for a window
containing a turn independently proven to exist. That blindness is not a side note here: it
is the OWNER'S OWN STANDING COMPLAINT about missing trace and tracking, and this is the
first measured instance of it costing a diagnosis rather than a convenience. A system that
logs the answer and cannot read its own log has the trace and not the tracking.

## WHAT IS ALSO TRUE AND SEPARATELY WRONG

`backend_entity_layers` declares, for backend `armes`:

    factory    getFactoryList    parent null              cadence sync
    line       getFactoryLines   parent factory/factoryId cadence sync
    equipment  getEntities       parent factory/factoryId cadence slow

Equipment declares its parent layer as `factory`, bound by `factoryId`. The DATA contradicts
that: all 1725 equipment edges resolve to eleven parent refs and every one is a `line`-layer
registry row. So the mislabel measured in v1 is CONFIG-DERIVED, not a code bug — the edges
carry `parent_layer_key='factory'` because the descriptor says so.

This is a defect whatever the answer to the contradiction above, and it is repairable in
CONFIGURATION rather than in code. It is also NOT proven to be the cause of the empty
registry, and this document does not claim it is.

`cadence_class='slow'` additionally means the equipment layer is unreachable from every
interactive path by construction, and sweeps at most once per six hours from the
backend-health cron. That is deliberate and documented, and it is not the cause either: the
sweep demonstrably ran.

## WHAT WOULD CLOSE THIS

In order, and each is a card, not a plan:
1. READ THE LOG LINE for `layer=equipment` from a tick — dispatched to the lane that holds
   the credential the Architect does not. If the lens is blind there too, that refusal is
   itself the deliverable and it promotes the trace gap to the top of the queue.
2. Whatever that line names, repair it. Until it is read, any repair is a guess with a
   plausible story attached, and this house has a name for shipping those.
3. Independently of 1 and 2: correct the equipment descriptor's declared parent layer, with
   its own before/after measurement of the edge labels.

## ARCHITECT BLIND SPOT

A-REC-S135-A-MEASURED-SYMPTOM-READS-LIKE-A-DIAGNOSIS-1. v1 of this finding measured the gap
precisely enough to feel finished, and said "WHY it is empty is UNMEASURED" in one line near
the end. Precision about a symptom is not understanding of a cause, and a document that is
right about everything it measured can still be the wrong thing to hand a lane. The owner
asked whether it was enough. It was not.
