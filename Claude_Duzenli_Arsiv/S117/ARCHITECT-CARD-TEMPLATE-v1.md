# ARCHITECT CARD TEMPLATE — v1 · the first Architect card body measured at 11/11

**MEASURED, not asserted.** Verified at S118 by running the LANDED instruments from a fresh clone at
master `50ba7d7efcd8b870e8350090696067c409e16a5c`:

    $ node -e "preflightVerdict(body)"   from scripts/mail-wait.mjs
      state: PASS          failed ids: (none)
    $ npx tsx  auditText(body)           from scripts/relayAudit.ts
      kind: card | governed: true | violations: 0

**The same probe run against a real posted Architect card reproduced the lane's verdict EXACTLY —
`CP-1, CP-3, CP-4, CP-5, CP-8` — the identical id list AG-5 printed from its own tree after it
fast-forwarded the shared clone.** The instrument is the same on both sides; the Architect simply
had never run it.

## WHY EACH CHECK FIRED ON EVERY ARCHITECT CARD EVER WRITTEN

| check | what it wanted | what the Architect wrote instead |
|---|---|---|
| **CP-1** | a `<!-- relay-audit: v1 kind=card -->` header, plus `## PREMISE`, `## CLAIMS`, `## FALSIFIER`, `## SHARED SURFACES`, `## DECISION RIGHTS` | prose with ORDERS and no header at all |
| **CP-3** | every `## PREMISE` line tagged `MEASURED:<command>` or literal `UNMEASURED` with a reason | measured facts written as sentences |
| **CP-4** | a `SELF-INVALIDATION` marker or a `DECAYS <when>` clause | a premise presented as timeless |
| **CP-5** | `fanout: broadcast` / `fanout: personalized`, or a `FAN-OUT:` line | nothing — the reader could not tell a personalisation from a drift |
| **CP-8** | every commit reference as the FULL 40 hex | short shas everywhere in prose — `50ba7d7e`, `82495d4d`, `adeedb97`. **This is the one that fires most and it is invisible while writing.** A 7–39 hex run anywhere in the body is a short sha to this check, and the reason is `S101-L1`: the CI API answers a short sha with `total_count=0`, byte-identical to "CI never ran". |
| **CP-11** | a destructive card additionally carries a FRESH BOX READ obligation immediately before the command | re-measuring the target, which is not re-reading the order — the exact gap that let a withdrawn deletion run eleven seconds late |

And two more the relay-audit layer enforces underneath CP-1:
**`R-CLAIMS-MISSING`** — a `## CLAIMS` table with real rows (`claim | basis | anchor`), and
**`R-TRIP-HEX`** — a bare commit token is forbidden OUTSIDE the CLAIMS table and the `evidence:` /
`diff` fences. So a sha does not merely need to be full-length; **it needs to live in a fence that an
anchor points at.** That is the mechanism behind the pointer-form stamp rule this project already had
in prose.

## THE TEMPLATE — copy the shape, not the content

<!-- relay-audit: v1 kind=card -->
# PHASE-ARCHITECT-CARD-GRAMMAR-1-v1
fanout: personalized

MEASURED-AT 2026-08-25T13:30:00Z.
ON-DISAGREEMENT: if your re-measure of any premise line differs, the MEASUREMENT WINS — STOP and report the difference rather than acting on this card.
SELF-INVALIDATION: this premise DECAYS on the next push to master, or the moment the card gate arming constant changes.

## PREMISE
- MEASURED:git ls-remote origin refs/heads/master @2026-08-25T13:25:28Z — master is the commit in the evidence fence below.
- MEASURED:grep -n "const CARD_GATE" scripts/mail-wait.mjs @2026-08-25T13:25:00Z — line 151 reads REPORT, so the gate prints its verdict and the lane proceeds into the card.
- UNMEASURED — whether any lane window is running right now. The factory mode row reads DRAINING and no lane holds a claim this card can verify from here.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in the evidence block | READ: git ls-remote origin refs/heads/master | floor |
| the card gate is landed disarmed | READ: grep -n "const CARD_GATE" scripts/mail-wait.mjs | gate |
| the Architect's own closing cards fail five checks | READ: node -e preflightVerdict over the posted body | preflight |

```evidence:floor
$ git ls-remote origin refs/heads/master
50ba7d7efcd8b870e8350090696067c409e16a5c	refs/heads/master
```

```evidence:gate
$ grep -n "const CARD_GATE" scripts/mail-wait.mjs
151:const CARD_GATE = 'REPORT';
```

```evidence:preflight
$ node probe.mjs S118-LANE-CLOSING-1-AG5-v1
state: REFUSED
failed ids: CP-1, CP-3, CP-4, CP-5, CP-8
```

## FALSIFIER
Run the landed preflight over the ten most recent cards addressed to any lane and read CARDS THAT WOULD PASS. If that number is not ten out of ten after this phase lands, the phase failed and the gate is NOT armed.

## SHARED SURFACES
`scripts/cardPreflight.ts` and `scripts/mail-wait.mjs` are READ-ONLY for this card. The Architect's card TEMPLATE is the only artefact this phase writes.

## DECISION RIGHTS
Widening the grammar belongs to the authoring lane. Narrowing it does not. The arming constant is the Architect's one-word decision and no lane changes it inside a commit.

## HOW TO USE IT WITHOUT TRUSTING IT

**Do not trust this file.** It is a derived view, and a derived view is not a source. Before posting
any card, run the landed instruments over the body from a FRESH clone:

    import { preflightVerdict } from './scripts/mail-wait.mjs'   // -> state, failed ids
    import { auditText }        from './scripts/relayAudit.ts'   // -> kind, governed, violations

`preflightVerdict` returns the ids only; `auditText` returns the SENTENCES, which is what tells you
what to fix. Run both — CP-1 delegates to `auditText` and reports it as a single id, so a card can
fail one check for two entirely different reasons.

## WHAT THIS UNBLOCKS

`cwf-implementation-order-S117-v30` item 1 makes `PHASE-ARCHITECT-CARD-GRAMMAR-1` blocking, with this
acceptance test: **re-run the preflight over the ten most recent cards addressed to a lane and read
`CARDS THAT WOULD PASS`. Arm the gate on 10/10, never before.** The number was 0 of 10 when AG-4
measured it at `2026-08-25T09:44Z`.
**Arming today would not gate the factory, it would HALT it** — every card fails, including any card
sent to countermand the arming. The cure is the grammar. The constant moves last.

END-OF-TEMPLATE ARCHITECT-CARD-TEMPLATE-v1
