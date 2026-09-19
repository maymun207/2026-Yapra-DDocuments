# F-S142-THE-SEAL-GATE-REQUIRES-A-VERDICT-GRAMMAR-NO-ORDER-NAMES-1

Status: OPEN. Filed in S142, 2026-09-18, AGAINST THE ARCHITECT. Instance cured in the same turn; the
CLASS stands open.

## WHAT HAPPENED, EACH STEP MEASURED

The scout returned GREEN on CARD-GATE-PATH-SCOPE-S141-1-v2 (bytes row
b2ce0783-37c6-407d-bc9c-62ae454941fc, 10597 bytes, md5 6e72b253464567ff01149e967bd3b32a): the
repository's own cardPreflight, run on the exact inserted bytes, exit 0, eleven checks OK. The Architect
then tried to seal that GREEN to AG-4 and the database REFUSED the insert, verbatim:

    AG004: the verdict row's first line carries no sha256 - verdict c103bc65-d2e6-49ef-a73e-70ec496c10c5

The refusal was correct and the GREEN was correct. What was wrong was the ARCHITECT'S ORDER: it asked
the scout for a "gate run", so the scout answered in that shape and its first line read
`GATE: GREEN on the row's exact bytes ...`. The seal path requires a different first line.

## THE PRIMARY SOURCE, READ RATHER THAN GUESSED

`pg_get_functiondef` on `public.relay_adversary_gate_check` (the trigger body is
`public.relay_adversary_gate`). For a GREEN seal addressed to `^AG-[0-9]+$` it requires, in order: a
`kind=card` relay-audit header as the FIRST LINE; an `evidence:adversary` fence; `ADVERSARY: GREEN`;
`verdict: <36-char row id>`; that row resolving to a `from_lane` `scout` row with a NON-NULL `reply_to`;
and that row's FIRST LINE matching

    ^ADVERSARY-VERDICT: GREEN card=\S+ sha256=([0-9a-f]{64})

and finally the printed digest equalling `relay_adversary_canonical_sha256(body)`, which is sha256 over
`relay_adversary_seal_strip(body)` - the card WITHOUT its seal block.

MEASURED, not reasoned: the Architect built the sealed body from the bytes row with a placeholder
verdict id and called the gate's own two functions on it. Sealed body 10686 bytes, stripped 10597,
canonical sha256 2f76e868758ae6a03561fa7618b7834f5d9eecdb2bd46b647ac505f635d8b00b - identical to the
digest the scout had already printed and verified. So the bytes were never in question; one line of
grammar was.

## THE CLASS, WHICH IS WHY THIS IS FILED

The card's grammar is defended by ELEVEN named checks. The grammar of the ROW THAT SEALS THE CARD is
defended by a trigger whose requirement appears in NO card template, NO bootstrap section and NO clause
of `docs/ground/AUTO-MERGE-LANDING-v1.md`. It lives only in the wording of individual ORDER cards.

The scout corroborated this against itself, unprompted: its first three verdict rows of the session
(rows a2af8022, 59a4f0a5, 7626e092) opened with the canonical `ADVERSARY-VERDICT: ... sha256=...` line
ONLY because those order cards spelled that line out. Its words: "the grammar lived in the individual
orders, never in the contract or the boot".

So the failure mode is silent and it is shaped like this house's oldest one: an Architect that varies the
shape of an order produces a CORRECT adversary GREEN that cannot be sealed on, and learns this only from
a database error at seal time. A gate whose requirement is unstated is a gate that fires on the honest
and the careless alike.

## WHAT THE ARCHITECT DID NOT DO, AND WHY IT MATTERS

It did not write the verdict row itself. An Architect that speaks with the adversary's voice is
PLATINUM-BREACH-S122-1, and that breach stands in the record. It ordered the scout for one line, told it
plainly that the line was the Architect's paperwork debt and not a conclusion to be manufactured, and
said in the order that if anything the scout measured argued against GREEN it should say so on that line
instead and the card would not land.

## THE CURE, MECHANICAL AND NOT MORAL

A rule that depends on an Architect remembering the wording has already failed
(A-REC-S122-ARCHITECT-PRECISION-DECAY-1). ONE path, per S112-YASA-1, in two halves that must both land
because the requirement binds a row only an ORDER can shape:

1. `docs/ground/AUTO-MERGE-LANDING-v1.md` gains a VERDICT ROW GRAMMAR clause quoting the regex from the
   gate's own source, beside the five required contexts it already names.
2. Every order that asks for an adversary verdict carries the exact first line the seal will need,
   with the canonical digest computed from the gate's own functions before the order is sent - so the
   order cannot ask for an unsealable answer.

Discriminator for whether the cure works: an order that omits the line must be refusable BEFORE the
scout spends a review, not after the seal fails.

## ROWS

order (gate run, wrongly shaped) dca6cc60-6a68-4191-ae93-64267d163954
scout gate run, GREEN            c103bc65-d2e6-49ef-a73e-70ec496c10c5
order (one line of grammar)      7d25b071-0704-4f01-a4c4-5b42fe8d5590
scout canonical verdict          84f9cc8f-b1f7-46b1-967b-8a046a8a7cc5
sealed card to AG-4              072c7eaa-2973-4aca-98fc-d9bbe5b235cd

Cross-references: section 12.2 (a refusal is a measurement - carry it, do not route around it),
section 12.13 (two gates judging different objects, and the gap between them),
PLATINUM-BREACH-S122-1, F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1.

OWNER ACTION: none. This is the Architect's blind spot and the cure is a lane's work.
