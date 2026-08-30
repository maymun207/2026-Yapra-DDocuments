# OWNER-RULING-S125-SINGLE-LANE-1 — the factory runs ONE worker + ONE scout until ADF is redesigned

RECORDED 2026-08-29 ~14:45Z, under S112-YASA-1 (a design contribution from the owner, filed by
name, in the same carrier class as A-RECs). The ruling, VERBATIM:

> "bizim sistemimizde cok temel bir problem var - bizim Ag lerin coordinasyonu mekanizmasi
> calismiyor, ve multipe AG ile biz is yapmaya kalktigimizda hersey yerle yeksan oluyor...
> Dolayisi ile biz bu isi sadece bir AG (worker) 1 tane scout (senin kartini denetleyen) ancak
> bu isi bu sekilde ilerletebiliriz.... aksi takdirde bizim bu isin altindan kalkmamiz ADF nin
> bu hali ile IMKANSIZ!"

## THE EVIDENCE BASE (measured today, S125 — the ruling is not a mood, it has receipts)

- The foreman consumed its landing card and PARKED SILENTLY for forty-plus minutes — neither
  landing nor filing a blocker; visible only from the owner's screen, never from the bus
  (S102-YASA-2 violated by the boot's poller design, not by any one window's error).
- The build→landing handoff consumed the Architect and the owner as manual glue all afternoon:
  producer forbidden to merge, foreman boot required, address release protocol, a resume card.
- F-S125-MAILWAIT-HEARTBEAT-CONTAMINATION-1: reading another lane's box WRITES that lane's
  heartbeat; the box channel has no read-only lens; the lane nonce is world-readable, so the
  guard refuses accident, not a wrong caller. Cross-lane observation is not safe as built.
- Two window deaths and one freeze this session; every death cost a re-establishment round.
- The parallelism was an illusion: at no point today did two lanes BUILD concurrently — the
  serialization through the relay was the real bottleneck, and coordination failures consumed
  any theoretical gain.

## EFFECT (operations, not law — no lane-count law exists, so nothing is amended)

1. Standing mode until revoked by the owner: EXACTLY ONE worker lane (a window that can both
   build and, when a card orders it, land) + ONE scout (card audit). No second worker, no
   separate foreman window, no parallel dispatch.
2. The in-flight S125 landing finishes under the CURRENT AG-5 window if it answers the resume
   card; after the landing (or its death), BOTH existing AG windows close and the mode begins.
3. ADF-ARCHITECTURE-v2 (GATE-1 agenda item) absorbs this ruling as a NAMED DESIGN INPUT: the
   coordination mechanism — synchronous handoffs, read-only observation lenses, per-lane
   credentials, liveness visible from the bus — must be REDESIGNED AND PROVEN before multi-lane
   operation is ever attempted again. Single-lane is the floor, not the ceiling; the burden of
   proof for a second lane sits on the mechanism, not on the owner.

TAIL ANCHOR: OWNER-RULING-S125-SINGLE-LANE-1 ends here.
