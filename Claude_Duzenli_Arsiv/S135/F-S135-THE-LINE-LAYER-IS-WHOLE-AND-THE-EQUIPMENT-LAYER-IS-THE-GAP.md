# F-S135-THE-LINE-LAYER-IS-WHOLE-AND-THE-EQUIPMENT-LAYER-IS-THE-GAP

STATUS: OPEN. Measured against live production at master
`16fef74cdbee6ca57060005ebb0e23894404fede`, 2026-09-10.

OWNER CONTRIBUTION, recorded by name under S112-YASA-1 and s12.14: the owner opened the
Topology tab himself and said the graph already holds the FIRINUST relationships. He was
RIGHT, and measuring what he pointed at moved the finding rather than closing it. The
Architect had been carrying "the graph is consumerless" as one undifferentiated gap. It is
two different facts, and only one of them costs an answer today.

## WHAT THE OWNER'S SCREEN ASSERTED

layer `armes / line`, declared tool `getFactoryLines`: 783 observed · 0 probation ·
0 unclassifiable · 783 live · 0 absent-stamped. Arbitration: **conflicting 0 / 783**.
FIRINUST shown under KB7, Granit and KB3, registry parent and attesting parents agreeing
on every row.

A screen is a CLAIM, not the world (TOTAL-45). Every number below was re-read from the
live database rather than taken from the screenshot.

## MEASUREMENT ONE — THE OWNER'S READING HOLDS EXACTLY

    entity_registry, rows by layer:
      line     783
      factory   17
      equipment  — the layer does not appear at all: ZERO rows

    entity_registry where display_name like 'FIRINUST%':
      line  FIRINUST  parent factory Granit  active  721dbd77-6bb7-11f0-9acd-02420a000102
      line  FIRINUST  parent factory KB3     active  cfa7fb71-3711-11f1-b26a-860000924611
      line  FIRINUST  parent factory KB7     active  6d432c49-c50e-11f0-8832-02420a000166
      3 rows, 3 distinct parents

That three-way split IS the ambiguity `narrowAmbiguousByResolvedPeer` exists to resolve:
"KB7 FIRINUST" resolves the peer KB7 first, then narrows FIRINUST's candidates from three
to one. The owner's screen is a picture of the mechanism's input.

## MEASUREMENT TWO — WHICH SOURCE THE ANSWERING PATH ACTUALLY READS

Read from source at master, `api/cwf/_lib/turn/stageClarify.ts`:

    function buildParentage(
        rows: readonly { entity_id: string; parent_layer_key: string | null; parent_entity_id: string | null }[],
    ): ReadonlyMap<string, CandidateParentage>

Those three fields are `entity_registry` columns. The narrowing consumes REGISTRY
parentage. It does not read `entity_topology_edges` and it does not import
`GraphKbReader`.

## MEASUREMENT THREE — THE TWO LAYERS ARE NOT IN THE SAME STATE

    entity_topology_edges joined to entity_registry on (child_layer_key, child_ref):

    child_layer  parent_layer  edges  live  child rows MISSING from registry
    line         factory         783   783                                 0
    equipment    factory        1725  1725                              1725

For `line`, registry and ledger agree completely — 0 missing children, and the owner's own
screen reports 0/783 conflicting parents. **Wiring the graph into the answering path would
change no answer for the line layer today.** The gap there is architectural, not behavioural.

For `equipment`, the ledger holds 1725 live attested edges and the registry holds NOTHING.
The path reads the registry. So a question about a piece of equipment meets an empty read
while the ledger has the parentage sitting in it. **That is where consumerless costs an
answer**, and it is the whole of the cost measured so far.

## MEASUREMENT FOUR — AND THE EQUIPMENT EDGES MISLABEL THEIR OWN PARENT LAYER

Every one of the 1725 equipment edges carries `parent_layer_key = 'factory'`. Their
distinct parent refs are eleven, and EVERY ONE resolves to a `line`-layer registry row:

    Glazur2 · Glazur3 (x2) · Glazur4 · Glazur5 · FIRINALT (x2) · FIRINUST (x2)
    · IKINCILALT · IKINCILUST

Equipment hangs off a LINE, not off a factory, and the ledger says 'factory' anyway. The
LABEL of a field is not its COMPUTATION. Note the consequence the owner's example makes
concrete: FIRINUST appears among those parents TWICE — the KB7 one and the Granit one — so
equipment under "KB7 FIRINUST" is separable, but only if the parent is resolved first and
only if something reads the layer correctly.

## WHAT THIS DOES NOT SAY

It does not say the graph should be wired into the answering path — that is a design
question and it now has a measured cost attached to it for exactly one layer.
It does not say the equipment registry is empty for a wrong reason; WHY it is empty is
UNMEASURED and was not asked here.
It does not settle which mechanism answered the owner's witnessed KB7 FIRINUST turn. That
remains UNMEASURED and is what the durable emit under
CARD-SCOPE-DECISION-DURABLE-EMIT-S135-2-v2 exists to answer for the NEXT turn.

## ARCHITECT BLIND SPOT

A-REC-S135-ONE-GAP-WAS-ACTUALLY-TWO-1. The Architect carried "the graph is consumerless"
as a single undifferentiated finding across the session and would have cut a wiring card
against it. Measuring what the owner pointed at split it: for `line` the wiring changes
nothing, for `equipment` it changes everything. A card cut before this measurement would
have spent a lane on the half that costs nothing.
