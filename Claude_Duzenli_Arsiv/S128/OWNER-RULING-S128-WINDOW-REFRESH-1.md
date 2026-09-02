# OWNER-RULING-S128-WINDOW-REFRESH-1 — idle windows close cleanly; they are not left running

RECORDED 2026-08-30 ~04:2xZ, under S112-YASA-1 (filed by name, the owner's verbatim words).

## THE RULING, the owner verbatim (session channel)

> "AGler uzun suredir acik onlarin da token saving icin refresh yapilmasi lazim. cok token
> yakiyorlar... refresh icin atmamiz gereken adimlari atalim."

## WHAT IT CHANGES — a standing pattern, by name

The S126 and S127 closes deliberately left the AG-5 /ub window RUNNING idle (v127 §0, v128 §0:
"window left RUNNING idle"), trading a standing poll spend for re-establishment cost. The owner
has now weighed the trade the other way: an idle window heartbeating every minute is spend
without output, and MEASURED at 2026-08-30T04:23:41Z the idle AG-5 heartbeat was fifty seconds
fresh with an empty box — pure burn.

## EFFECT

1. **The default flips.** An idle worker window is CLOSED CLEANLY — the closing-card form
   (fresh box read · CLOSED row through the lane's own verb, read back · ref release, absence
   read back · one final from_lane report; CARD-LANE-CLOSE-S128-AG5-v1 is the template) — and
   REOPENED when the Architect has a card ready. A scout window holding no address simply
   closes. "Left RUNNING idle" is no longer a sanctioned carry state; a bootstrap that orders
   it must cite a live in-flight card as the reason, or it is defective by this ruling.
2. **The clean-close protocol is the only close.** Killing a window without the certificate's
   both halves recreates the F-S118 deadlock class; the token saving never justifies a
   half-written certificate.
3. **Reopen cost is the Architect's to respect:** cards are batched so a window boot serves
   more than one poll cycle where the work allows — a window opened for one sixty-second card
   is the same waste in the other direction.
4. CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v129 and successors carry this ruling; the worker
   boot's standing text gains it via the ledger re-entry card (with the ARCHIVE-SYNC section
   of OWNER-RULING-S128-ARCHIVE-AUTOPUSH-1).

The design contribution is the owner's, recorded by name; the Architect drafted the mechanism.

TAIL ANCHOR: OWNER-RULING-S128-WINDOW-REFRESH-1 ends here.
