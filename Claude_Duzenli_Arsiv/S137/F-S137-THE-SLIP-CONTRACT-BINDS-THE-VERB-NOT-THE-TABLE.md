# F-S137-THE-SLIP-CONTRACT-BINDS-THE-VERB-NOT-THE-TABLE-1

Opened 2026-09-11, session S137, minutes after `BUS-REPLY-PATH-1` was applied to the live database. Filed
before the wave was declared closed, because a capability that is armed and unused is this factory's
dominant failure shape and it has a name here already.

## WHAT LANDED AND IS TRUE

`BUS-REPLY-PATH-1` landed at master `0cae062c130b99a94df825f3481537b8251d23b2` and was applied at
2026-09-11T20:37:01Z. Independently re-measured by the Architect at 2026-09-11T20:39:46Z, not taken from
the Operator's report:

```evidence:live
supabase_migrations.schema_migrations  20260911170000  PRESENT
trg_relay_adversary_gate               tgenabled O     still armed across the apply
relay_inbox_reply_authority            CHECK (direction = 'to_lane' OR lane_addr = ANY
                                       (ARRAY['operator','scout','AG-1','AG-2','AG-3','AG-4','AG-5']))
relay_post_from_lane                   carries FW005 (the cap) and FW006 (the required fields)
```

A positive control the Architect did not plan and should record: probing the verb as `AG-4` was refused
`FW001` — the nonce gate fired BEFORE the cap check. The Architect cannot post as a lane. That door held
against its own commissioner, which is the same proof the adversary gate earned this morning.

## WHAT IS NOT TRUE, MEASURED

`ADR-015` v3 states that the verb refuses anything that is not a slip. That sentence is correct about the
VERB and it is being read as a statement about the BUS. It is not.

The cap is UNCONDITIONAL in the function — `v_cap constant integer := 1024`, no address exemption, read
from the migration source at 2026-09-11T20:41Z. Yet:

```evidence:bypass
public.relay_inbox, from_lane rows after the contract went live:
  20:37:31Z  operator  REPORT-APPLY-SLIP-CONTRACT-S137-1-v2   5185 characters
the contract was applied at 20:37:01Z. Thirty seconds later a body five times the cap
entered the bus as a from_lane row under an admitted author name.
```

Since the cap admits no exemption, that row DID NOT PASS THROUGH THE VERB. It was written straight to the
table. The constraint governs WHO may be a `from_lane` author; nothing governs WHAT they write unless
they choose to go through the verb. The slip contract is a door, not a wall, and the old door is still
open beside it.

This is not an accusation against the Operator, which did exactly what its card ordered and proved every
reading it was asked for. It is a statement about what the mechanism can and cannot promise.

## THE COMPANION: CALLER-ABSENT, ON THE DAY IT LANDED

Measured at 2026-09-11T20:40Z over master's tree:

- `postSlip` is imported in exactly one file, `api/cwf/__tests__/busReplyPath.test.ts`. Its own test.
- `.claude/` — every boot document, every command, `loop.md` — contains no mention of the slip,
  `postSlip`, or `laneSlip`. The three matches for the word "slip" are ordinary English in unrelated
  sentences.
- No `package.json` script invokes it.

So no lane has been told the door exists, and the general mechanism it was built beside is untouched.
This is `CALLER-ABSENT` exactly as the S134 addendum §12.6 defines it, and §12.6's own sentence applies
without adjustment: from the outside, an absent caller and a dead component are byte-identical.

## WHY THIS WAS NOT CAUGHT EARLIER, STATED PLAINLY

The adversary reviewed the DESIGN and the BYTES of the card, and both reviews were good. Neither was asked
"after this lands, what calls it" — because the Architect did not ask. §12.6 says to grep for the CONSUMER
before proposing to BUILD a capability. The Architect greped for the consumer AFTER the landing. The rule
was followed in the wrong order, which is how the rule fails quietly.

## WHAT THIS DOES NOT MEAN

The work is not wrong and it is not to be voided. `§12.7` governs: a card is voided for being WRONG, never
for being incomplete against a question nobody asked. The verb is correct, its contract is enforced for
every caller that uses it, the constraint widening is real, and the adversary gate survived the apply.
What is missing is WIRING and a claim that is wider than its mechanism.

## THE TWO REPAIRS, NEITHER CUT YET

1. A WIRING item: a lane is told, in its boot document, to file its slip through `postSlip`, and the
   instruction names the six fields and the cap. Until then the capability is armed and unused.
2. A CLAIM item: `ADR-015`'s sentence is narrowed to what it can prove — the verb refuses a non-slip; the
   table does not — or the table gains what would make the wider sentence true. Which of those is right is
   a design question and goes to the adversary, not to the Architect's own judgement.

Both are UNMEASURED against the owner's list and neither jumps ahead of `PLATINUM-BREACH-S137-1`, whose
repair already holds the queue.

END · F-S137-THE-SLIP-CONTRACT-BINDS-THE-VERB-NOT-THE-TABLE-1
