# S129-DISPATCH-RECORD-4 — the scout's AMBER, v2, one ruling, and a transport defect repaired

## THE SCOUT'S VERDICT ON v1: AMBER

Filed from_lane at 2026-09-03T11:56:28Z, ten minutes after dispatch. Grammar GREEN eleven of
eleven, and the scout ran cardPreflight's own self-test FIRST so the GREEN meant something.

THE AMBER, in the scout's own framing: one sentence was missing and without it an obedient lane
corrupts production telemetry.

`offeredToolNames` names TWO objects. v1's ORDER B never said which. The SPAN FIELD may be
redefined freely — the scout settled v1's NOT-READ row and found NO production reader consumes it;
every admin consumer recomputes its own list from `toolCategories.ts`. But `ctx.offeredToolNames`,
THE SET, is a LIVE PREDICATE: `checkRoutingContainment` tests it and emits a `routing_mismatch`
telemetry row on a miss, and it is called at the execute closure with the RAW `toolDef.name`. Give
the Set registered or sanitised names and every tool whose raw name needed sanitising becomes a
false routing_mismatch on every call — silently, in the telemetry this project measures routing by.

The Architect re-derived every one of the scout's readings against the source before accepting
them. All confirmed.

## WHAT ELSE THE SCOUT FOUND, ALL VERIFIED AGAINST SOURCE

- v1 UNDERCOUNTED ITS OWN DEFECT. Not three sites, FIVE: the `routing_mismatch` payload carries
  `offeredCount: ctx.offeredToolNames.size`, and the `[ToolRegistry]` line ALREADY prints
  `registered=` and `collisions=` — the honest pair, already computed, never lifted into the span.
  The refused count already rides the span as `ATTR_TOOL_COLLISION_COUNT`. v1 asked a lane to
  invent counters that exist.
- A LIVE DECISION-PARITY-1 VIOLATION v1 ordered half-fixed: `registered=` is computed at the
  ToolRegistry line AND again at `stageStream.ts:166`. v1 named only the stream side.
- THE ARCHITECT'S CORRECTION PARAGRAPH WAS MIS-SITED. v1 said `countExposure`'s predicate is
  per-BACKEND. It is not — `exposureOf` is per-TOOL already, documented "It takes a NAME and a MAP.
  It does not know about coverage, and it must not". The per-BACKEND predicate is
  `isSubjectToFilter`, a different function. The CONCLUSION survives, re-measured: `countExposure`
  counts "over the set ACTUALLY OFFERED" and states "`unclassified` is NOT `uncoveredFlat.length`".
  Right answer, wrong reason, TWICE — this is A-REC-S129-9's second layer.
- THE PROVENANCE DEFECT AGAIN, second card running. v1's surfaces fence claimed "every reader" and
  sourced it from a grep that returns sixty-nine files while naming six, and named GovernanceTab.tsx
  under a command whose output does not contain it. The scout called it a pattern, not an incident.
  It is right.
- THE CLONE MOVED mid-session, from three-behind to the current anchor. Three cards read as live
  over one clone and none named another.

## THE ARCHITECT'S RULING, filed to the bus

`ARCHITECT-RULING-S129-ONE-LIVE-CARD-PER-CLONE-1`. A-1-v2 is closed by its filed report.
CARD-LANE-POSSESSION-1-v1 is WITHDRAWN — never dispatched, and its ON-DISAGREEMENT arm now names a
stale HEAD, so a lane running it today could only STOP. Its DEFECT is not retired; the card is.
Exactly one card is live: CARD-TOOL-VISIBILITY-B-1-v2.

THE STANDING RULE THE SCOUT'S QUESTION EXPOSED: a card parked in the Architect's head is a card the
bus still reads as live, and every other actor reads the bus. Parking now requires a bus row in the
turn it is parked.

## THE TRANSPORT DEFECT, AND ITS REPAIR

The v2 INSERT returned sha256 `79853d1b...` against the file's
`eeae96f74fed570e155aabf5a4e64c70c1b4f81383ec7c1026cde3318066450a`. Refused. STOP row filed
immediately; the bus is append-only and RI003 refuses a delete, so the bad row stays and the STOP
row is what makes it safe.

Bisected by prefix hash on both sides, seven queries: lines 1-61 agreed, 62 and 63 were TRANSPOSED
and nothing else in 344 lines differed. The Architect had typed two adjacent CLAIMS rows in the
wrong order. Repaired by mechanical SQL rebuild from the bad row's own array —
`arr[1:61] || ARRAY[arr[63], arr[62]] || arr[64:...]` — digest matched the file on the first
attempt, 25640 octets.

A-REC-S129-10 — THE SECOND HAND-TYPED CARD, THE SECOND DRIFT. A-REC-S129-7 was the same class on
CARD-TOOL-VISIBILITY-A-1-v2, also a transposition of adjacent blocks. Two for two on cards typed
into an INSERT by hand. The digest protocol caught both, which is the protocol working — but the
protocol is a NET, not a cure, and the cure is that a card body should never be re-typed. The
mechanical route exists and was used successfully today for nothing: the v1 body was inserted
correctly on the first attempt and could have been transformed in place. THE STANDING FIX: when a
card supersedes one already on the bus, build v2 in SQL from v1's row wherever the change is
splice-shaped, and re-type only what is genuinely new.

A-REC-S129-11 — THE DIAGNOSTIC NUMBER WAS ITSELF A CARRIED VALUE. The Architect first read the
corruption as "eighty-one bytes lost", comparing Postgres `length()` against `wc -c`. Those count
CHARACTERS and BYTES respectively, and this card carries eighty-one multi-byte UTF-8 characters.
Nothing was lost. A wrong number, produced while diagnosing a defect whose class is wrong numbers,
inside the same ten minutes. `octet_length()` is the comparable one.

## STATE AT THIS RECORD

- `SCOUT-CARD-REVIEW-TOOL-VISIBILITY-B-1-v2-REPAIRED` is in the scout box, digest verified.
- The scout is CONFIRMED ALIVE by output at 11:56:28Z. An earlier Architect statement that its
  liveness was unestablished was correct at the moment it was made and is now superseded by
  evidence.
- AG-5 (foreman) CLAIMED its address at 11:49:47Z and wrote that row itself. AG-4 CLAIMED, heartbeat
  11:53:04Z, box empty.
- No producer has been dispatched. No repository file has been written. `origin/master` last
  received a commit on 2026-08-30.

TAIL ANCHOR: S129-DISPATCH-RECORD-4 ends here.
