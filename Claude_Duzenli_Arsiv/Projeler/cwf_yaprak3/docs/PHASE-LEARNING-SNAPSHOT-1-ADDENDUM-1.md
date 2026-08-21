# PHASE-LEARNING-SNAPSHOT-1 · ADDENDUM-1 (BINDING, owner-ruled S93)

>> BLOCK: AG-1 <<

Applies to PHASE-LEARNING-SNAPSHOT-1-v1. If the lane has not started, treat
this as part of v1; if started, apply as a mid-phase binding amendment —
either way the report NAMES it.

## A1 · Wipe confirmation is a full typed SENTENCE (owner ruling)

Replaces the "fixed confirm word" in §2.4/§2.5 for the WIPE action only
(restore keeps snapshot-name confirmation, unchanged):

- ONE exported constant, single source in `shared/` (beside the panel's other
  shared strings):
  `WIPE_CONFIRM_SENTENCE = "Bu agentin tüm öğrenimini sıfırlamayı onaylıyorum"`
- The panel dialog shows the sentence and requires it typed VERBATIM
  (trim-only normalization; no case folding) — the destructive button is dead
  until it matches.
- The server RE-CHECKS `confirmText === WIPE_CONFIRM_SENTENCE` against the
  SAME constant (client and server import one source — no string twins).
  Mismatch ⇒ 422 naming the field, no RPC call.
- Test pins (extend §4 items 8–9): drop the server check ⇒ named test dies;
  drop the client verbatim gate ⇒ named test dies; a near-miss string
  (missing one char) is rejected by BOTH layers.

## A2 · Explicitly OUT of this phase: password re-entry

Do NOT implement password re-authentication for the dialog. Reason on the
record: admins authenticated via magic-link/OAuth have no password — the
control would be dead for them — and a per-button auth mechanism is a
platform-wide decision, not a panel detail. If the owner later rules it in,
it arrives as its own named item; nothing here pre-builds for it.

<!-- END · PHASE-LEARNING-SNAPSHOT-1-ADDENDUM-1 -->
