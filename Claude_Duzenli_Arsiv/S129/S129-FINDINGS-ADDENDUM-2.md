# S129-FINDINGS-ADDENDUM-2 — what the scout windows found that no card carries, and what is still owed

Four items surfaced during the S129 review rounds that belong to no card cut so far. They are
recorded here rather than left in verdict bodies, because a verdict is a message and a register is
a home. Written while AG-4 works, so the wait produced something.

## F-S129-CARD-GATE-JUDGES-EVERY-BUS-ROW-AS-A-CARD-1

FOUND BY: the second scout window, in its verdict on CARD-TOOL-VISIBILITY-B-1-v2 at
2026-09-03T12:14:26Z, section 7. Reported, in its own words, "not asking for it".

WHAT IT MEASURED: `ARCHITECT-RULING-S129-ONE-LIVE-CARD-PER-CLONE-1`, the STOP row and the NOTICE row
each drew `[CARD-REFUSED]` from the card grammar under `CARD_GATE=REPORT` — CP-1, CP-3, CP-4 and
CP-5 on all three, plus CP-6 and CP-9 on the ruling. They are rulings and notices. They are not
cards. The grammar judges them as cards because the bus carries one kind of row and the gate knows
one kind of body.

WHY IT MATTERS, AND WHY IT IS THE SAME CLASS AS THE SESSION'S OTHER RED: a gate that refuses every
non-card row on the bus is BARKING ON ITS MAJORITY CASE. That is the identical defect the scout
filed against GATE 2's badge two verdicts earlier — a signal whose normal state is a complaint
teaches its reader to ignore it. The gate is currently in REPORT mode, so it costs nothing today.
The day it is ARMED, every ruling, notice, stop and report on the bus becomes a refusal, and the
first genuine card defect it catches will arrive inside that noise.

WHAT IS NEEDED BEFORE `CARD_GATE` IS EVER ARMED: a KIND DISCRIMINATOR. The relay-audit header
already carries `kind=card`; the gate must read it and judge only what claims to be a card. This is
NOT ordered by any card and is NOT in scope for CARD-TOOL-VISIBILITY-B-1. It is a register item.

## D-S129-NINE-OLDER-UNTRACKED-PROJECT-DOCUMENTS

MEASURED: at 2026-09-03T12:19:3xZ, `git status --porcelain` in the documents repository — beside the
thirteen S129 files, nine older paths are untracked:

  Claude_Duzenli_Arsiv/Projeler/EAIP-1/docs/          three .docx files
  Claude_Duzenli_Arsiv/Projeler/cwf_yaprak3/docs/     six session-reading .md files

`CARD-ARCHIVE-PUSH-S129-2-v1` names them in a fence and DELIBERATELY EXCLUDES them, so that a lane
which sweeps them up with `git add .` can recognise the mistake and so their absence is not read as
a second oversight. They predate S129. They are a real debt under the ARCHIVE-AUTOPUSH ruling and
they belong to whoever cuts the card that closes them. NAMED, NOT FIXED — which S61-2 permits only
because it is named here.

## D-S129-AG-1-HEARTBEAT-STILL-FORGED

A scout window, running `mail-wait AG-1 --once` to read a box, wrote an AG-1 heartbeat at
2026-09-02T22:41:49.772Z. The `factory_state` row for AG-1 still reads `state=WORKING` with that
instant, and no AG-1 window has run since. The row asserts a lane is working when none is.

STILL UNREPAIRED at the time of this record. It is a small lie in a table this factory reads for
liveness, and it sits beside the measured fact that heartbeats are inversely correlated with
production anyway. NAMED, NOT FIXED.

## D-S129-TWO-READINGS-NO-REVIEWER-HAS-RE-TAKEN

Both scout windows named these rather than passing over them, and both were right to.

FIRST: the population reading of 2026-09-03T12:1xZ that GATE 2 rests on — the forty-seven, the
forty-four floor, the three unannotated. It is the Architect's, taken once. Neither scout could
re-take it: their SQL verb is fenced on the MCP surface, correctly. The second window did what it
could instead and checked the enumeration against itself, finding two identities that close
(44+0+3=47, and 145−47=98) and a third that closes only if annotation rows map one-to-one onto
ACTIVE tools (145−3=142), which the fence does not state. Its own conclusion, quoted because the
discipline in it is the point: a set of numbers can be internally consistent and still be wrong
together. CARD-TOOL-VISIBILITY-B-1-v4's ORDER A is where the lane re-takes it.

SECOND: the PREMISE instant `2026-09-03T10:20:43Z`, the production category publish, inherited from
the A card. Unread by any scout across three review rounds.

Neither is a defect. Both are UNVERIFIED PREMISES carried into a dispatched card, and the reason
they are written here is that an unverified premise nobody names becomes a fact nobody remembers
doubting.

## A NOTE ON WHAT THE THREE-WINDOW RULE COST AND BOUGHT

The owner's S122 ruling was that the mitigation for Architect precision decay is MECHANICAL, and the
mechanism was scout windows per card. S129 ran two windows over one card and they did not agree:
window one returned AMBER on an ambiguity that would have corrupted production telemetry; window
two, reviewing the same v1 without having seen window one's verdict, returned RED on a defect window
one never reached. Neither found the other's headline finding.

That is the whole argument for the rule, measured rather than asserted. One window would have
shipped a card with a badge nobody could read. The cost was roughly forty minutes and four card
versions. The Architect records this in the register rather than in a session close, so the next
Architect finds it while deciding whether to skip a round.

TAIL ANCHOR: S129-FINDINGS-ADDENDUM-2 ends here.
