# S122 · P-5 ESCALATION — THE CP-8 SELF-TRAP

**This is the P-4/P-5 escalation your ruling named as the one reason to contact you before
GATE-1.** One decision is needed. Everything else in T1 continues without you.

MEASURED 2026-08-27T21:52Z from a fresh clone at master
`2e1d193b5bf809228821d1934caa5bce474f3959`.

---

## 1 · WHAT HAPPENED — P-5 fired, on the exact card it was written for

P-5 anticipated this: *"Cards that modify CP-8 or the tripwires may be refused by the very
check they repair."* It did.

`PHASE-CP8-RECONCILE-1-v1` is refused by CP-8, seven times, on seven tokens:

```
[card:preflight] [FAIL] CP-8 — short sha `2f08046`
[card:preflight] [FAIL] CP-8 — short sha `20260827120000`
[card:preflight] [FAIL] CP-8 — short sha `deadbeef`
[card:preflight] [FAIL] CP-8 — short sha `17482910345`
[card:preflight] [FAIL] CP-8 — short sha `abc1234`
[card:preflight] [FAIL] CP-8 — short sha `8287599`
[card:preflight] [FAIL] CP-8 — short sha `b2d6c55`
[card:preflight] REFUSED-CHECKS=CP-8
```

**Every one of those tokens IS the evidence.** `2f08046` is the truncated sha the check must go
on catching. `20260827120000` and `17482910345` are the false-positive classes being repaired.
`8287599` and `b2d6c55` are the residue proving the 80 remaining documents are true positives
rather than noise. Remove them and the card no longer demonstrates anything — which is the
rewrite P-5 forbids, so I did not attempt it.

One refusal in the first run was NOT the trap — a plain CP-2 count-noun collision — and I
repaired that normally. **CP-8 is the sole remaining refusal.**

## 2 · THREE MEASUREMENTS THAT MAKE THE CASE BETTER THAN ANY ARGUMENT

| instrument | verdict on this card's bytes |
|---|---|
| **CP-8 as landed** | **7 refusals** |
| **the report grammar, same bytes** | **`[OK]` — zero violations** |
| **CP-8 as this card proposes to repair it** | **0 refusals** |

The middle row is the divergence, live, on this very file. The bottom row is the point:
**the repaired rule accepts its own repair card; the landed rule refuses it.**

## 3 · THE MECHANISM IS NOT ACTUALLY BLOCKED — so I am asking for permission, not a path

I checked before asking, because asking you for a mechanism that already exists would waste
your attention:

```
CARD_GATE = 'REPORT'          (scripts/mail-wait.mjs:151)
preflightVerdict(card)  ->    {"state":"REFUSED","ids":["CP-8"]}
on delivery the lane sees:    [CARD-GATE-DISARMED] CARD_GATE=REPORT, so this refusal is
                              REPORTED and NOT acted on. The lane proceeds into the card.
```

So the card **can** be delivered today; the receiving lane would be told CP-8 refused it and
would proceed anyway. What stops me is not the machine. It is **T1-5**, which you ratified:
*dispatch only what passes, or escalate per P-4.* Dispatching a knowingly-refused card without
your word would be me quietly deciding that a rule I find inconvenient does not apply to me —
on the very card that exists because a rule was over-applied.

## 4 · THE DECISION — one path

> **Authorize the dispatch of `PHASE-CP8-RECONCILE-1-v1` with its CP-8 refusal recorded rather
> than repaired.** The refusal is logged in the metrics log as a KNOWN SELF-TRAP with its seven
> tokens, is excluded from the G1-a post-dispatch-refusal count with that reason named, and the
> exclusion is written into the GATE-1 scorecard so it is visible at the gate rather than
> discovered there. No other card gets this exemption; it dies with this one.

**Why not the alternatives.** Arming `CARD_GATE` to `'REFUSE'` first would make the card
undeliverable and freeze T1-1 permanently — the check would have veto over its own repair.
Stripping the tokens would leave a card ordering a change it no longer evidences. Waiting until
after the fix lands is circular: the fix cannot land without the card.

## 5 · ONE THING THE GATE STATE MEANS FOR GATE-1, recorded now rather than at the gate

`CARD_GATE = 'REPORT'` means the delivery gate **reports and does not block**. So G1-a's
"post-dispatch validator refusals ≈ 0" is measured against a gate that cannot stop anything. A
zero there means the Architect's shift-left worked, not that the machine enforced it. That is
still the number G1-a wants — but it is a weaker instrument than its wording suggests, and you
should know that before you read a zero in it.

## 6 · WHAT PROCEEDS WITHOUT YOU

T1-2 (the producer-boot card under D-4) carries no self-trap and goes to a lane through the
normal scout window. T1-4 was consumed by AG-3 at 21:29:56Z and is being executed. Nothing else
in T1 waits on this decision.

**OWNER DECISION: AUTHORIZE | REFUSE | AMEND** ____________  date: __________

---

TAIL ANCHOR: S122-P5-ESCALATION-CP8-SELF-TRAP-v1 ends here.
