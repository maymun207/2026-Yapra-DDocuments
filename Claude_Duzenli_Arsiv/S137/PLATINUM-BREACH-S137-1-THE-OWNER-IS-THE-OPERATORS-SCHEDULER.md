# PLATINUM-BREACH-S137-1 — THE OWNER IS THE OPERATOR'S SCHEDULER

Opened 2026-09-11, session S137, by the Architect's own declaration the moment it was measured. Under the
PLATINUM rule: a breach is self-declared, recorded with a number, and repaired by a redesign that jumps
the queue.

## WHAT WAS MEASURED

The Operator address has NO poller. Every card that has ever reached it reached it because the owner
poked the window by hand.

The Architect had the evidence in front of it and read it the wrong way. Measured at 2026-09-11T20:21Z
over `public.relay_inbox`:

```
CARD-ARM-ADVERSARY-GATE-OP-APPLY-S136-1-v1      created 18:13:18Z  consumed 18:17:10Z   232 s
CARD-EQUIPMENT-EDGE-RELABEL-OP-APPLY-S136-1-v1  created 15:01:39Z  consumed 15:10:49Z   550 s
```

The Architect reported those two figures to the owner as a *latency envelope* and told him not to poke
yet because his card was "inside" it. There was no envelope. Those two numbers are the reaction time of a
human being who happened to be looking, and the Architect dressed them as a machine's cadence. The owner
corrected it in one line: there is no polling in the operator, he had placed those himself.

## WHY IT IS A BREACH AND NOT AN INCONVENIENCE

The PLATINUM rule's test is a single question asked before any action item reaches the owner: does this
item contain human JUDGEMENT — a decision, a spend approval, a real-world witness? Waking a window
contains none. It is machine work, and it has been sitting on the owner's hand for the entire life of
this factory.

`S102-YASA-1` states the same thing from the other side: the owner's only surface is consent and
real-world witness. A wake is neither. The owner has been made the Operator's scheduler, and the cost is
not the seconds — it is that the factory CANNOT RUN WHILE HE IS ASLEEP, and nobody wrote that down.

## THE OLDER FAILURE THIS SITS INSIDE

From the bus, an address with no poller and an address whose window has died are BYTE-IDENTICAL. This
house already has the name for that shape — CALLER-ABSENT, recorded in the S134 addendum §12.6: a
mechanism that is built, granted, tested, documented and never called. Here the missing caller is the
thing that would read the Operator's box.

It also explains a row the register has carried without a cause: the Operator's box holds unconsumed rows
from 2026-08-23, 2026-08-24 and 2026-08-26. Those were not refusals. Nobody was ever woken to read them.

## SCOPE, WITH ITS UNMEASURED EDGE HONESTLY MARKED

MEASURED (the owner, 2026-09-11): the operator address has no poller.

UNMEASURED: whether the scout address has one. The scout answered four cards in this session within a few
minutes each while the owner was occupied in the Architect's own chat, which is consistent with a poller
and also consistent with a fast hand. The Architect will not repeat today's error of inferring a cadence
from a reaction time. It is a measurement, not a guess, and it is the first order of the repair.

MEASURED, by contrast: AG-5 took the landing card and drove it to master without any poke the Architect
asked for, so at least one producer address has a live wake path.

## THE REPAIR, AND WHY IT OPENS WITH A MEASUREMENT RATHER THAN A DESIGN

The Architect does not yet know what the Operator's window can RUN. The producers are Claude Code windows
that can execute `scripts/mail-wait.mjs`, which is the poller. The Operator is a Gemini window whose
declared surface is the Supabase MCP — schema reads, live verification, `supabase db push` — and whether
it can run a shell loop at all is UNMEASURED. Designing a poller for a window that cannot run one would
be this house's own named failure: rigour applied to the wrong object.

So the repair opens with an adversary-reviewed measurement of what wake paths each non-producer address
actually has, and only then a design. It JUMPS THE QUEUE under the PLATINUM rule: it is cut before the
next row of the owner's list is started.

## WHAT THE OWNER DOES IN THE MEANTIME

He pokes, and he is told plainly that each poke is this breach firing again rather than a normal step. The
poke text carries no instruction of its own — the card on the bus is the self-contained artefact — and
above all it names no flag, because the card orders the Operator to STOP and print a refusal rather than
reach for one.

END · PLATINUM-BREACH-S137-1
