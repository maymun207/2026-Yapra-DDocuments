# F-S135-THE-TOOL-CALL-RECORD-CARRIES-NEITHER-INPUT-NOR-OUTPUT

STATUS: OPEN. A measured violation of the FULL-TRACE MANDATE, with a live victim.
Measured 2026-09-10 against production telemetry at master
`16fef74cdbee6ca57060005ebb0e23894404fede`.

OWNER CONTRIBUTION, recorded by name under S112-YASA-1 and s12.14: the owner sent a
screenshot of a failing turn and said to look at the logs too. He had been naming missing
trace and tracking as vital for several turns. This document is that complaint promoted from
a standing concern to a measured constitutional breach, and it exists because he pushed a
screenshot rather than accepting a summary.

A SECOND OWNER CONTRIBUTION, and a correction of his own recollection: he placed the turn
"30-40 minutes ago". Telemetry places it at 22:11:04Z, roughly two hours and twenty minutes
before the reading. The screen was right, the recollection drifted, and measurement beat
memory — including his. Noted without ceremony because the same rule binds the Architect.

## THE TURN, READ WHOLE FROM `telemetry_events`

conversation `b93bab30-421b-43af-bf35-8ab09d0739a7`, 2026-09-09 22:11:04Z to 22:11:32Z:

    22:11:04.335  message    query_head "KB7 de FIRINUST de olan duruslari gosterirmisin"
    22:11:22.806  ir_frame   entity_ref ["KB7","FIRINUST"]  action QUERY_EVENTS
                             object DOWNTIME  confidence HIGH  drops action=0 object=0 metrics=0
    22:11:23.022  frame_evidence  outcome=frame  state=nothing-to-capture
                             ambiguity.confidence=high  every candidate fate=kept
    22:11:29.189  tool_call  getFactoryLines              ok=true   1208ms
    22:11:31.242  tool_call  getLineStopsReportForZones   ok=FALSE   261ms
    22:11:32.400  turn_done  funnel: frame=present tools=FAILED render=n/a
                             discovery=hit grounding=ok · planner steps=4 replans=1
    22:11:32.430  llm_call   gemini  toolCalls=2  finishReason=stop

## WHAT THIS TURN PROVES ABOUT THE ENTITY SEAM: IT WORKED

Both names resolved. `entity_ref` carries KB7 and FIRINUST, confidence HIGH, nothing dropped,
no ambiguity raised, no clarification asked, and `getFactoryLines` returned ok. THIS TURN DID
NOT FAIL ON THE ENTITY SEAM. Any reading of this screenshot as an entity-resolution failure
is wrong, and the Architect would have guessed exactly that from the screenshot alone.

## WHERE IT DID FAIL, AND WHY THE SPEED MATTERS

`getLineStopsReportForZones` returned ok=false in 261 MILLISECONDS. The neighbouring
successful call took 1208ms. A quarter of a second is not a timeout and not a slow backend —
it is a REJECTION. The backend looked at what it was given and refused it almost immediately.

## THE BREACH

The ENTIRE recorded payload of that failing call:

    {"ok": false, "server": "armesMes", "backendId": "armes"}

No arguments. No error message. No response body. No status. The successful call is equally
bare. The constitution says, verbatim:

    FULL-TRACE MANDATE — her stage, her DB okuması ve her araç çağrısı hem Langfuse'ta hem
    panelde INPUT+OUTPUT gösterir; yalnız ham sırlar temizlenir. İnşa yoluyla dayatılır
    (CI'daki tamlık muhafızı).

MEASURED: it does not. The tool-call rows carry neither INPUT nor OUTPUT. Whatever the
completeness guard in CI is checking, it is not this. That gap is itself UNMEASURED and is
the second thing this finding hands forward: a mandate enforced "by construction" that a
live row contradicts means either the guard does not cover this row or the guard is not
running.

## THE LIVE COST, WHICH IS THE POINT

The zones tool was rejected in 261ms and NOBODY CAN SAY WHY. Not the owner, not the
Architect, not a lane. The one artefact that would answer it — the arguments sent and the
error returned — was never written. A system that records that a call failed, and nothing
about the call, has TRACE without TRACKING.

## THE HYPOTHESIS THIS FINDING REFUSES TO ASSERT

The tool is `...ForZones`. Zones are the equipment layer. Measured, for the very line in
this question:

    KB7 / FIRINUST  entity_id 6d432c49-c50e-11f0-8832-02420a000166
      equipment children in entity_topology_edges : 191
      equipment rows in entity_registry           : 0

    and across all lines:
      FIRINUST(Granit) 622 · FIRINALT(KB7) 358 · IKINCILALT(KB7) 192 · FIRINUST(KB7) 191
      IKINCILUST(KB7) 103 · FIRINALT(Granit) 180 · Glazur4 34 · Glazur3(Granit) 17
      Glazur5 12 · Glazur2(KB7) 9 · Glazur3(KB7) 7
      registry rows for every one of them: ZERO

The answering path reads the REGISTRY. So it is PLAUSIBLE that the planner called the zones
tool with no zone ids, or wrong ones, and was refused. IT IS NOT PROVEN AND THIS DOCUMENT
DOES NOT CLAIM IT. The discriminator is the argument list, and the argument list is exactly
what was not recorded. A plausible story with no bytes behind it is an argument, not a
conclusion, and this house labels it as such.

## WHY THIS IS NOW THE TOP OF THE QUEUE

Every open thread in S135 that concerns behaviour terminates in the same missing field. Why
the zones tool refused: unrecorded. Whether the equipment registry emptiness caused it:
undecidable without it. Why the equipment registry is empty at all
(F-S135-EQUIPMENT-REGISTRY-EMPTY-CAUSE-NARROWED-v2): waiting on a log line the Architect
cannot read. Three separate investigations, one missing instrument.

Repairing the instrument is not overhead ahead of the "real" work. It IS the real work,
because without it every repair that follows is a guess with a story attached — and this
factory already has a name for shipping those.

## WHAT WOULD CLOSE THIS

1. The tool-call telemetry row carries the call's ARGUMENTS and its RESULT — the error text
   and status on failure, a bounded summary on success — with secrets redacted and tenant
   vocabulary handled by the same rules every other written surface obeys.
2. The CI completeness guard the mandate names is measured: what does it actually assert, and
   why did it pass while these rows exist. If it does not cover tool-call payloads, that is a
   defect in the guard and it is named.
3. ONLY THEN: re-run the owner's question and read why the zones tool refuses.

## ARCHITECT BLIND SPOT

A-REC-S135-I-WOULD-HAVE-GUESSED-THE-ENTITY-SEAM-1. Shown this screenshot, the Architect's
first instinct was that the entity layer had failed again — the thread it had been working
all session. The telemetry says the opposite: entity_ref resolved both names at HIGH
confidence with nothing dropped and no ask raised. The failure sits one layer downstream, in
a tool nobody had been discussing. Reading the turn cost four queries; guessing would have
cost a lane a night on the wrong seam.
