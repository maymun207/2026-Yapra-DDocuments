# S124 · FINDINGS ADDENDUM 3 — the review chain's provenance was wrong, and the gate is behind the factory

CUT 2026-08-29T04:45Z. Corrects addendum 2 §4 and the round-23 card. Nothing earlier is edited
(`S37-1`).

---

## 1 · v2 HAS BEEN REVIEWED BY NOBODY — the correction, and whose defect it is

The scout's late round-22 report (bus row created 2026-08-29T04:31:14Z, reply_to `da9e9cf1…`) proved
by digest what I had asserted from memory: **round 22 carried and reviewed `v1`**
(sha1 `4c7acf52282e3b312bc12fcce4f6712e8b1a3689`, 9635 bytes — reproduced from the round-22 row and
matching the very line v2's own supersedes fence publishes). `v2` was minted at 2026-08-29T03:24:35Z —
**nine hours AFTER round 22 was cut** — by a session that was not this one. Round 22 could not have
reviewed a card that did not yet exist.

So the chain is: `v1` reviewed round 22, RED · `v2` reviewed by NOBODY · `v3` reviewed round 23, RED.
Two of my statements were therefore false and are withdrawn: round 23's "its predecessor v2 is the
card round 22 reviewed", and addendum 2's "v2 is ALREADY reviewed". **Both timestamps were in my own
query results and I never compared them** — provenance asserted from a standfirst instead of measured
from the bus. The same class as every other defect this session, and this instance nearly put an
unreviewed card into a producer's hands with the owner's own paste as the trigger. The owner was told
to HOLD within minutes of the measurement; at 04:33Z the claim-event count since 04:30 was ZERO and
v2 was unconsumed — the hold arrived before any execution.

The scout also dated the unit regression: v1's fence pairs the right sha with the RIGHT byte count;
v2's and v3's pair right shas with character counts labelled bytes. The confusion entered between v1
and v2 and was carried forward — including by me.

## 2 · ROUND 24 — v2's first-ever review, dispatched

`SCOUT-CARD-REVIEW-24-v1`, bus row `32bfb588-343d-48bc-a9be-aa674101ceac`, 2026-08-29T04:36:23Z,
3771 bytes / 3736 characters (both units, measured by `octet_length`/`length` at insert). It states
the corrected provenance in full, withdraws `v3` by name, asks for a verdict on `v2` ON ITS MERITS,
and puts the Architect's position on v2's three known defects in writing so the scout can attack it:
the fence unit error (no order acts on that fence — not blocking), the missing lock disposition
(v2's own COMMIT-refusal fallback is a named complete outcome, and a push does not touch the index —
not blocking), the stale "untracked ZERO" prose (the checked invariant is the filtered porcelain,
measured EMPTY in round 23's R1 — not blocking). If the scout rules any of the three blocking, v2
dies and a fresh card is cut with corrected provenance.

The owner's confirmation text for the AG-4 takeover is UNCHANGED and waits on round 24's GREEN.

## 3 · `F-S124-GATE-BEHIND-FACTORY-1` — the scout's structural finding, relayed to the owner

Measured by the scout, from the box and the tree, with identifiers:

> Twenty-nine cards sit in the scout box, unactioned. Twenty-two are review rounds. The oldest has
> waited 306047s. Meanwhile the candidates those rounds were meant to gate WERE DISPATCHED AND
> EXECUTED: round 9's PHASE-HONESTBENCH-SCORER-BUILD-1 has a LANDED report on master; round 8's
> PHASE-TRIAGE-REDS-1 is open PR 471; rounds 4 and 5's GO-EXECUTE-LANDING-2 is open PR 470. The
> owner's ruling is that no card reaches a producer until a scout returns GREEN. MEASURED, cards
> reached producers and producers finished them while their review rounds sat unread. **THE GATE HAS
> BEEN RUNNING BEHIND THE FACTORY, not in front of it, and a review delivered after execution is a
> record rather than a gate.**

This is a finding about how ruling ② has actually operated across S123's landings — the reviews that
DID gate (rounds 13–22, this session's 23–24) gated because a scout window happened to be open at
dispatch time. When none is, the round sits and the card outruns it. The remedy is a mechanism —
a dispatch precondition that a matching GREEN exists, enforced where cards are inserted — and
mechanisms do not land inside the P-6 window. **Recorded here with the scout's identifiers; the
ruling on what to do belongs to the owner at GATE-1.** Alongside it, from the same report: v2's
verdict-less state was only discoverable because the scout read its OWN box's history — the round
ledger has no carrier other than the bus itself.

---

TAIL ANCHOR: S124-FINDINGS-ADDENDUM-3 ends here.
