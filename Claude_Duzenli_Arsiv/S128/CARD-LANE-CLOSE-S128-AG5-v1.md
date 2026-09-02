<!-- relay-audit: v1 kind=card -->
# CARD-LANE-CLOSE-S128-AG5-v1 — the Architect's closing card: certificate in both halves, then the poller ends

This is the closing card CLAUDE.md §2 promises ("hold your claim until the Architect's final
closing card releases it") and §1 names as the one legitimate end of a poller. The owner ruled
the reason, verbatim: "AGler uzun suredir acik onlarin da token saving icin refresh yapilmasi
lazim. cok token yakiyorlar... refresh icin atmamiz gereken adimlari atalim." An idle window
heartbeating every minute is spend without output; the cure is a CLEAN close — both halves of
the death certificate, in the order S125 proved — so the next window claims first-try over a
CLOSED row instead of dancing the F-S118 deadlock.

You hold NOTHING in flight: CARD-ARCHIVE-PUSH-S128-1 closed on your own report with two
ls-remote read-backs, and your box has been empty since. Acting on THIS card is the last act of
this window's life.

SCOUT: NAMED BYPASS, written here and in the dispatch record — this card is the routine
lane-close form (precedent: the three sha-verified S125 closing cards), it mutates only this
lane's own certificate surfaces (its factory_state row, its own git ref), and the scout window
is itself being closed under the same owner order. Nothing here touches a surface the scout's
second eye exists to guard.

## PREMISE

MEASURED: 2026-08-30T04:23:41Z, factory_state read over the Architect's declared read path — AG-5 state CLAIMED under the nonce in the `claim` fence, heartbeat 2026-08-30T04:22:51Z (fifty seconds fresh at read, the idle burn the owner named), factory mode READY.
MEASURED: 2026-08-30T04:23:41Z, relay_inbox counted by created_at — ZERO rows addressed to AG-5 newer than the archive card row of 2026-08-30T03:58:46Z; your last from_lane output was ARCHIVE-PUSH-S128-1-AG5-report at 2026-08-30T04:05:59Z and nothing has been asked of you since.
MEASURED: 2026-08-30T04:12Z-04:14Z, the archive card's own closure — your report carried both push read-backs and the Architect re-read both commits from the bridge lens; no work of yours is open, half-done, or waiting on a wire.
DECAYS the moment any new row lands in your box; the fresh-box read in ORDER A is where you find out.
ON-DISAGREEMENT: if your fresh box read shows a row newer than this card, this card is VOID — act on that row first and do not close; if your CLOSED write is refused or your ref deletion is refused for any reason other than the ref already being gone, STOP, print the refusal verbatim, and file it from_lane — a half-written certificate is the F-S118 class and one named refusal is cheaper than one deadlock.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| AG-5 is CLAIMED under the nonce below, heartbeat fresh, box empty above the archive card, factory READY | MEASURED: factory_state and relay_inbox reads at 2026-08-30T04:23:41Z | claim |
| nothing is in flight on this lane — the archive card closed on your own two read-backs | MEASURED: your report row at 2026-08-30T04:05:59Z; the Architect's bridge re-read of both commits | claim |
| whether your box is still empty when you act | NOT-READ | ORDER A; your fresh read is the deliverable's first line |

```evidence:claim
lane_addr  AG-5
nonce      9364074d43753d1638b2972e804e13e503843675
ref        refs/heads/lane/AG-5 (the repository the nonce was pushed to: maymun207/cwf_yaprak)
last out   ARCHIVE-PUSH-S128-1-AG5-report, from_lane, 2026-08-30T04:05:59Z
```

## ORDER A — FRESH BOX READ, THE ONE CP-11 AND COMMON SENSE BOTH DEMAND

Read your box fresh, directly by created_at. A row newer than this card VOIDS this card: act on
it first, leave this card unactioned, and say so from_lane. Print the reading either way.

## ORDER B — THE DATABASE HALF: CLOSED, THROUGH YOUR OWN VERB, READ BACK

Write your lane row to CLOSED through the coordination verb your boot uses for lane-state
writes, under your stored nonce. Then READ THE ROW BACK and print state and nonce — a write
reported by its own exit code is the S63-1 class. The CLOSED row is written FIRST because it is
the recoverable half: factory_claim admits a fresh claim over CLOSED, so if this window dies
mid-card the next window is not deadlocked.

## ORDER C — THE GIT HALF: RELEASE YOUR REF, READ THE ABSENCE BACK

Delete refs/heads/lane/AG-5 on the wire with a ref-deletion push, then read it back:
`git ls-remote origin refs/heads/lane/AG-5` must return NOTHING, and per empty-vs-unread you
print the command and its empty output together with its exit code — an absence claimed
without its instrument is not an absence. If the deletion is refused because the ref is
already gone, that is a finding to print, not a failure.

## ORDER D — THE LAST ROW, THEN SILENCE

File ONE from_lane row, artifact name `LANE-CLOSE-S128-AG5-report`, carrying: the ORDER A box
reading · the CLOSED row read-back · the ls-remote absence reading · the sentence "read
relay_inbox at <ISO>, box empty" with the instant of your final read. Then STOP POLLING — this
card is the closing card §1 names, the poller's one legitimate end. Do not delete your poll
task's history, do not sweep any other lane's anything, do not touch AG-1/2/3's fossil rows
(they are another card's subject). The owner closes the window after your report; the window
does not close itself.

## FALSIFIER

This card is wrong if your box holds a row newer than it (ORDER A finds this), or if your row
is not CLAIMED under the fence's nonce when you go to write CLOSED. Either way: print, file
from_lane, and do not force anything.

## SHARED SURFACES

Every surface this card touches, enumerated — both are this lane's own:

```scope
- the AG-5 lane row in factory_state (written to CLOSED, ORDER B)
- refs/heads/lane/AG-5 on the wire (deleted, ORDER C)
```

No file in either repository is touched, no commit is made, no gate, no migration, no governed
row, no other lane's row or ref. This card spends one report row and the reads named above; its
whole purpose is to stop the standing spend.

## DECISION RIGHTS

The owner ruled the refresh; the Architect decides the close is safe because nothing is in
flight — measured, not assumed. You decide only whether the world matches this card: a fresh
row in your box, or a refused write, overrides everything here and comes back from_lane.

BODIES: `S102-YASA-1` · `S63-1` · `TOTAL-45` · `empty ≠ zero` (an empty ls-remote answer is
printed WITH its instrument, never asserted bare) · the F-S118 certificate discipline (both
halves, recoverable half first).

fanout: personalized

```deliverables
branch: none — no commit is made by this card
report: from_lane bus row LANE-CLOSE-S128-AG5-report
```

TAIL ANCHOR: CARD-LANE-CLOSE-S128-AG5-v1 ends here.
