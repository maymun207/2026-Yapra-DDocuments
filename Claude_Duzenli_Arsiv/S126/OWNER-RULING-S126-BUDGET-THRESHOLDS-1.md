# OWNER-RULING-S126-BUDGET-THRESHOLDS-1 — stop 125 -> 160, subscribed warning added at 152

RECORDED 2026-08-29 ~16:40Z, under S112-YASA-1 (filed by name, with the owner's verbatim word).
AMENDED ~17:55Z: §EFFECT items 5–6 added — the stale-action deletion ruling and the closure of
the open observation, both from the owner's own words on the session channel.

## THE READING PUT TO THE OWNER (fence run 33261656136 @2026-08-29T15:58:18Z, AG-5 verbatim relay)

limit 150 · actuals 141.385 over 29d (4.88/day) · projected month 151.14 (crossed the 150
limit between the 13:08Z and 15:58Z runs) · AWS forecast 155.875 · notifications 0.01/101/125
(each 1 subscriber) · stop 125 ABSOLUTE targeting i-057e5737f7ce02c52 · VERDICT FAIL —
A1-stop-above-baseline (125 < 151.14) and A2-warning-before-stop (no subscribed warning
between 151.14 and the stop).

## THE PROPOSED CURE, single path as put to him

Stop threshold 125 -> 160; a NEW subscribed warning at 152 (between the projected month and
the new stop). Named trade, stated with the proposal: the month closes ~151–156, above the
150 limit; the only way to stay under 150 — stopping the box for the rest of the month — was
named and not recommended.

## THE RULING, the owner verbatim (session channel, 2026-08-29 ~16:40Z)

> "onay"

## EFFECT

1. Stop threshold moves 125 -> 160 (ABSOLUTE_VALUE, same action, same one permitted target
   instance). A subscribed notification is added at 152, reusing the subscriber address
   already on the existing thresholds — no new address, no secret pasted anywhere.
2. The change is MACHINE WORK: a scout-reviewed card to the worker lane effects it and
   re-runs the fence expecting A1 PASS and A2 PASS; the owner's surface was the decision
   only (S102-YASA-1). (Progress note: the lane holds no AWS credential — measured on two
   lenses — so the cure is authored as a gated workflow_dispatch input in PR #486, default
   false, applied only by a card-ordered dispatch after landing.)
3. The accepted consequence is explicit: the month is expected to close above the 150
   limit; the owner accepted this in approving the cure.
4. OPEN OBSERVATION — CLOSED at ~17:55Z, see item 6.
5. **STALE ACTION DELETION (recorded ~17:55Z, the owner verbatim: "Onay , silinsin").** The
   second automatic stop action — threshold 101, ApprovalModel AUTOMATIC, targeting the
   DECOMMISSIONED instance i-030c2b4fadebfa229 (the box replaced on 2026-08-16), outside the
   fence's assertion surface, last fired 2026-08-23 — is DELETED. Machine work: the same
   gated workflow path performs it, resolving the action by its target being the
   decommissioned id and refusing unless exactly one matches. The fence's assertion surface
   widening (assert on ALL stop actions) rides the ledger card.
6. **THE OPEN OBSERVATION CLOSED (the owner verbatim: "Evet biz başlattık (sende
   hatilayacaksin session logolarında vardir)").** The Langfuse box was restarted after the
   2026-08-26T22:30Z stop by the owner side deliberately; the stop action itself fired and
   succeeded (EXECUTION_SUCCESS, measured from action history). No probe is owed; the
   "actuals above old stop while the box runs" tension is fully explained: budget actions
   stop once at the crossing event and do not continuously enforce.

TAIL ANCHOR: OWNER-RULING-S126-BUDGET-THRESHOLDS-1 ends here.
