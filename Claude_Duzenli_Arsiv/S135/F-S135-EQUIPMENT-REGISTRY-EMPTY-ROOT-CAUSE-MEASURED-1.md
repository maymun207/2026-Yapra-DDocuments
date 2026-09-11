# F-S135-EQUIPMENT-REGISTRY-EMPTY-ROOT-CAUSE-MEASURED-1

STATUS: ROOT CAUSE MEASURED FROM PRIMARY SOURCE. This finding CLOSES the open question in
F-S135-EQUIPMENT-REGISTRY-EMPTY-CAUSE-NARROWED-v2 and FALSIFIES two earlier hypotheses of the
Architect's own, both named below.

Session S135. Written 2026-09-10T05:20Z. Master `7591fff69860eb67c054b9738f9b9b2bd2b48e5b`.

## THE CAUSE, IN ONE LINE

The equipment layer's registry upsert THROWS on every cron tick with a Postgres duplicate-conflict-key
error, the throw is caught by a handler that writes a console line and leaves the mirror untouched, and
the console line is the only record that the layer failed at all.

## THE PRIMARY SOURCE

Vercel runtime log, production deployment at the master named above, two consecutive cron ticks:

```
04:30:34 GET /api/admin/backend-health 200
    [EntityDiscovery] backend=armes layer=equipment failed (mirror left untouched): [EntityRegistryRepository] registry upsert failed: ON CONFLICT DO UPDATE command cannot affect row a second time
    [EntityDiscovery] backend=armes layer=line tool=getFactoryLines shape=zeroarg calls=1 args=declared-default total=783 active=783 missing=0 edges=783 edgesAbsent=0 edgesLive=783 arb=783landed

05:00:36 GET /api/admin/backend-health 200
    [EntityDiscovery] backend=armes layer=equipment failed (mirror left untouched): [EntityRegistryRepository] registry upsert failed: ON CONFLICT DO UPDATE command cannot affect row a second time
    [EntityDiscovery] call failed tool=getEntities: MCP error -32603: text must not be null
    [EntityDiscovery] backend=armes layer=equipment tool=getEntities param=showAll DISCOVERED value=true via=declared-value-space-probe calls=2 [source=boolean tried[showAll=true -> 5000 entities | showAll=false -> 5000 entities] adopted=contains-all]
```

## WHY IT IS THE WHOLE STORY

Postgres refuses an `INSERT ... ON CONFLICT DO UPDATE` statement whose batch carries the SAME conflict
key twice. The conflict key here is `(backend_id, layer_key, entity_id)`. A single repeated entity id
rejects the ENTIRE statement, not merely the duplicate row. That is why the equipment layer has never
had one row rather than having most of its rows.

The asymmetry that produces it, both texts read at the named master:

`persistEdges`, entityDiscoverySync.ts near line 660 — DEDUPES:
```
const seen = new Set<string>();
for (const e of outcome.entities) { ... const key = `${e.parentEntityId} ${e.entityId}`; if (seen.has(key)) continue; ... }
```

`upsertLayer`, EntityRegistryRepository.ts near line 197 — DOES NOT:
```
const rows = entities.map((e) => ({ backend_id, layer_key, entity_id: e.entityId, ... }));
.upsert(rows, { onConflict: 'backend_id,layer_key,entity_id' });
if (error) throw new Error(`[${this.name}] registry upsert failed: ${error.message}`);
```

The edge write runs FIRST and dedupes, so the ledger fills. The registry write runs second and does not,
so it dies. The observed state — 1726 edges, zero registry rows — is exactly what that ordering predicts.

## WHAT THIS FALSIFIES

**FALSIFIED — "the mislabelled parent layer causes the empty registry."** `entity_registry` carries a
unique key on `(backend_id, layer_key, entity_id)`, a status check, and a foreign key on `backend_id`
only. There is NO foreign key on any parent column and NO trigger. A parent reference pointing at a
line row while labelled `factory` therefore cannot reject anything. The mislabel is real and remains a
separate open defect; it is not this one.

**FALSIFIED — "the Architect's runtime-log lens is blind on this path."** It is not. The earlier probe
was a single negative read against the whole project with no deployment scope; scoping to the production
`deploymentId` with a `minutesAgo` window returned the line immediately. This is S102's second half
reproduced by the Architect against itself: A SINGLE NEGATIVE PROBE IS NOT PROOF OF ABSENCE. The line
that had been called unreadable for the length of this session was readable the whole time, and the
graph-sync trace card cut minutes earlier was justified on a premise that was wrong. That card stands on
its own merits — a console-only terminus is still a FULL-TRACE MANDATE gap — but its urgency argument
was built on an unmeasured absence and is withdrawn.

## MEASURED STATE AT THE TIME OF WRITING

- `entity_registry`, backend armes, 05:12Z: factory 17 rows, line 783 rows, **equipment layer absent entirely** — no row has ever been written.
- `entity_topology_edges`, backend armes, 05:14Z: equipment 1726 edges, newest `last_seen` 2026-09-10T05:01:56Z, oldest `first_seen` 2026-08-27T07:02:41Z.
- The failure has therefore been running on every tick for approximately two weeks.

## WHAT IS STILL UNMEASURED, AND SAID SO

- WHY the payload carries a duplicate entity id. The likeliest reading is one equipment id reported under
  more than one parent; the payload itself was not inspected. Argument, not conclusion.
- Whether `getEntities: MCP error -32603: text must not be null` is related to this defect or is a second
  defect standing beside it.
- Whether the identical five-thousand entity count under BOTH probe values is a truncation cap. Five
  thousand is a round number and round numbers in this house are read twice.
- Whether any OTHER layer in the same sweep fails the same way silently.

## THE SECOND DEFECT THIS EXPOSES, AND IT IS THE ARCHITECTURAL ONE

A layer can be TOTALLY DEAD for two weeks and the only witness is a console line. The catch that turns
this throw into `console.warn` is the reason nobody knew. `empty != zero` is honoured on the read side
and defeated here on the write side: the registry says "no equipment" and the system cannot distinguish
that from "equipment never wrote". That is the same class as the tool_call trace gap, and it is why the
durable-terminus work matters even though its original urgency argument was wrong.

## DISPOSITION

`CARD-ADVERSARY-REVIEW-EQUIPMENT-REGISTRY-DUPLICATE-KEY-S135-1-v1` was inserted to the scout at
2026-09-10T05:22:47Z, both card gates agreeing PASS. The repair is ordered as: dedupe by the conflict key
before the upsert; NAME the collapse rather than letting last-one-wins run silently, because one entity
id under two parents is a real containment fact the single parent column cannot hold; test with a
duplicate-bearing payload; and do NOT touch the parent-layer declaration in the same branch.
