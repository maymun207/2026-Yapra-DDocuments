# OWNER-APPROVAL-S135-EQUIPMENT-DEDUPE-MERGE-1

GRANTED 2026-09-10T06:13Z, in the owner's words: "onayliyorum".

## WHAT IS AUTHORISED

ONE master landing: branch `phase/equipment-registry-dedupe-1-s135-1` at head
`cc5e59ae8146158ebaba77cb990e38b916152db1`, authored by AG-5 under
`CARD-EQUIPMENT-REGISTRY-DEDUPE-1-S135-1-v1`.

This authorises the spend of ONE master push (eval-canary class). It names ONE ACTION, not a path list.
It does not authorise any other branch, any re-run, or a second landing.

## THE CONDITION THE ARCHITECT ATTACHED BEFORE THE OWNER ANSWERED

The approval was requested with the CI state at that head stated as UNMEASURED, and with this condition
written into the request rather than added afterwards:

> the approval is used ONLY if the scout's measurement comes back green; if it is red or unmeasurable,
> it is not used and the owner is told.

That condition BINDS. `CARD-READ-CI-AT-EQUIPMENT-DEDUPE-HEAD-S135-1-v1` was inserted to the scout at
2026-09-10T06:12:42Z and its report is the gate. If the scout reports a red check, a missing run after
two reads, or heavy steps that did not execute, THIS APPROVAL IS NOT SPENT and the owner is told in that
turn.

## WHY THE CONDITION IS WRITTEN DOWN

A-REC-S133-7 records this house's own failure: the Architect told the owner "green" when that green was
no CI run's verdict, and the owner gave a spend approval on an unmeasured premise. This artefact exists
so that cannot be repeated silently — the premise is named as unmeasured AT THE MOMENT OF THE ASK, and
the measurement that discharges it is named by card.

## WHAT THE LANDING FIXES

The equipment layer of the armes entity registry has held ZERO rows since approximately 2026-08-27. Its
cron sync throws on every tick with `ON CONFLICT DO UPDATE command cannot affect row a second time` —
one repeated entity id in a batch, refusing the whole statement — and the throw is swallowed into a
console line. Root cause measured from the production runtime log at two consecutive ticks and recorded
in `F-S135-EQUIPMENT-REGISTRY-EMPTY-ROOT-CAUSE-MEASURED-1`.

## WHAT THE LANDING DOES NOT FIX, STATED SO THE APPROVAL IS NOT MISREAD

- The equipment descriptor declares its parent layer as `factory` while all eleven distinct discovered
  parents resolve in the `line` layer. Once this lands, rows arrive with a parent label pointing into a
  layer that does not contain them. Under adversary review as
  `CARD-ADVERSARY-REVIEW-EQUIPMENT-PARENT-LAYER-SPLIT-S135-1-v1`.
- The swallowing catch that hid a total layer outage for two weeks. Ruled by the adversary to belong to
  the durable-trace card, not to this branch.
- The recurring `getEntities: MCP error -32603: text must not be null`, and the identical five-thousand
  entity count under both probe values. Both named UNMEASURED.

## THE MEASUREMENT OWED IMMEDIATELY AFTER THE LANDING

The adversary's fourth amendment, carried into the card and owed in the report: compare the FIRST
successful tick's `total/active/missing` against the SECOND tick's. `upsertLayer` flips every active row
absent from the batch to `missing`, and that mechanism has never run for this layer. If the counts
disagree by hundreds, the payload is truncated and the missing-flip is flapping — which is the next card,
not a surprise.
