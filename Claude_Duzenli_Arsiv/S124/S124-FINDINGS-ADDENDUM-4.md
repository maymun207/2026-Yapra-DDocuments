# S124 · FINDINGS ADDENDUM 4 — the live test FALSIFIED the claim, and the trace names two levers

CUT 2026-08-29T06:05Z. This RETRACTS part of the previous two turns' record, by name.

## 1 · THE RETRACTION FIRST

On the owner's first message ("soruyu sordum çalışıyor") the Architect recorded
`OWNER-WITNESS-S124-A23-LIVE` and proposed closing `GI-101`. The owner's screenshot falsifies that
record: the production answer to "değirmen10 durumu nedir?" was an abstention — *"Sistemde kayıtlı
hiç 'equipment' bulunmuyor"* — with the no-tool-query badge. **The witness record is WITHDRAWN, the
GI-101 closure proposal is WITHDRAWN (same message, SOTA-1 form), and GI-101 stays OPEN.** The live
test did exactly what a falsifier exists to do. The Architect's defect: crediting a verbal "it
works" before the screen was seen — a witness is the SCREEN, not the sentence about it.

## 2 · THE TRACE — one turn, fully lit, and it says two separate things

Production, `trace=cb49f416`, 05:49:53Z, read from Vercel runtime logs and matched to the
`messages` rows:

```evidence:trace
[Frame]         action=QUERY_STATUS object=EQUIPMENT entity_ref=[değirmen10] conf=HIGH
[EntityResolve] scope=floor=none refs=[değirmen10] resolved=[] unresolved=[değirmen10] ambiguous=[]
[Clarify]       layerStatus=declared-empty layer=equipment reads=ok
[Ask]           decision=ask unresolved=1 valve=0 wouldHaveAsked=1
```

**Lever 1 — the valve is SHUT, by design.** The turn DECIDED to ask (`decision=ask`) and the
governed valve `router.askOnUnresolved` = 0 rendered the honest abstention instead.
`wouldHaveAsked=1` is the code's own shadow metric, built — its comment says so — exactly so the
owner can decide the flip from counted evidence. The machinery #479 needs is deployed and DARK.

**Lever 2 — the deeper defect is still live, and it is the F-S117 class.** The resolver returned
ZERO candidates — not three, not ambiguous. The frame classified the object as EQUIPMENT; the
clarify read the `equipment` layer, which is `declared-empty`; scope collapsed to `floor=none`. The
three değirmen10 rows live under `armes/line` and were never consulted. So even with the valve OPEN,
this turn would have asked the *found-none* question, not #479's three-candidate "hangisi?" —
**the new seam never fires because no ambiguity ever reaches it.** #479's own report declared
precisely this NOT-READ: "whether the ladder's 'layer' and 'entity-id' rungs are reachable from
LIVE data". Now it is read, in production, and the answer is NO for this class.
`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` stands un-retired.

## 3 · WHAT THE SCREEN GOT RIGHT, so the record is fair

The abstention was HONEST: no tool query ran and the badge said so; the equipment layer genuinely
holds zero rows and the sentence said which layer. The honesty machinery worked. What failed is
UPSTREAM of it: classification/scope put the search in a layer where the entity does not live.

## 4 · THE ORDER OF REPAIR — one path

**Do not flip the valve first.** Flipped today, the system would ask a found-none question whose
premise (wrong layer) is false — the S120 constraint in mirror image: an ask shape fed by a wrong
scope converts silence into a misleading question. The order: ① S125's first build card = the
layer/scope defect (frame→layer mapping or cross-layer resolve), designed against this trace as its
falsifier; ② then the valve flip as an owner governed publish, with the `wouldHaveAsked` shadow
count read first — the instrument built for exactly that decision. GI-101's closure evidence
becomes: this same question, three plants offered, owner's screen.

TAIL ANCHOR: S124-FINDINGS-ADDENDUM-4 ends here.
