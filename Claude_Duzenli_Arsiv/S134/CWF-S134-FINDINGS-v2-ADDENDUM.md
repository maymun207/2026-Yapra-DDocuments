# CWF-S134-FINDINGS-v2-ADDENDUM

Written 2026-09-08 16:35 TSİ. Addendum to `CWF-S134-FINDINGS-v1`. Everything here was measured after that file was cut, and two of the four entries CORRECT beliefs this house has been carrying — one of them a finding of my own from three hours ago.

## F-S134-THE-SCOUT-CAN-POST-FROM_LANE-AND-A-PRODUCER-CANNOT-1 — and the block is a missing GRANT, not a missing transport

`F-S133-PRODUCER-HAS-NO-BUS-WRITE-PATH-1` has been carried as though no lane can write to the bus. MEASURED: nine `from_lane` rows carry `lane_addr = 'scout'` today, the most recent at 2026-09-08T13:20:28Z, three minutes after a notice reached that window. The finding is true of PRODUCERS ONLY.

**The route, named by the scout in its own reply and recorded here as ITS testimony rather than my measurement:** `POST /rest/v1/rpc/scout_reply` on the project's PostgREST, the publishable key in `apikey` and as a bearer token, body `{p_reply_to, p_artifact_name, p_body}`. The FUNCTION is the fence rather than the key — the server refuses a `p_reply_to` that does not name an existing `to_lane` row addressed to the caller, and refuses a body over 8192 characters.

**THE CURE FOR PRODUCERS IS THEREFORE SMALL AND SHAPED:** an `<addr>_reply` verb of that same shape, granted per address, gives AG-4 and AG-5 an identical path with NO new credential in any lane window. That is a migration, so it belongs to the Operator under `OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1`, and it is boot scope under the ADF freeze. Named, not carded, because a card needs the owner's lift first.

## F-S134-CONSUMED-AT-IS-RETIRED-AND-THAT-IS-WHY-A-FRESH-WINDOW-REPEATS-WORK-1

This SUPERSEDES my own `F-S134-CONSUMED-AT-IS-NOT-A-LANE-UNIFORM-SIGNAL-1`, which described the symptom and guessed at nothing. The mechanism, from the scout's reply:

`consumed_at` is RETIRED, so "already answered" is not a property of a row at all. A window that boots and reads its box by `created_at` — which is what the lane instructions order — receives every row with NO field distinguishing a discharged card from a live one. `relay_mark_consumed` is LIVE, but the lane read path is not the `cwf_lane` principal, so the stamp answers `42501`: CHANNEL-PRESENT-WRONG-PRINCIPAL.

**Why this matters more than it looks:** the duplicate scout verdict at 13:03:24Z was NOT a loop in the reading. It was a FRESH WINDOW, booted around 12:38Z, correctly answering the newest card it could see, unable to know a prior window had already answered it. Every window obeying the rule correctly still cannot see the difference, so no rule fixes this; the principal does.

## F-S134-THREE-FROZEN-LENSES-ARE-NOT-THE-SAME-AS-A-STALE-HEARTBEAT-1

`CANLILIK YALNIZ POZİTİFTİR` says a stale heartbeat reads as WORKING and a fresh one as IDLE, and it was written to stop premature reclaim. It was never a licence to read indefinite silence as production, and this session found the boundary.

MEASURED at 2026-09-08T13:27:06Z, three lenses that differ in what they assume:

- `.git/FETCH_HEAD` in the shared clone has not been rewritten since 12:37:47Z. No lane has run `git fetch origin` for fifty minutes, and `git fetch origin` is ORDER A.2 of the card AG-4 has held since 11:49Z.
- No ref at origin has moved since 12:04Z. `phase/ma-rerun-run-1-s133-1` and `phase/web-citation-contract-1-s134-1` are both ABSENT.
- Heartbeats: AG-4 at 12:55:10Z, AG-5 at 12:19:17Z. Four `to_lane` cards addressed to those two are unanswered.

Against that, the scout answered a notice within three minutes and posted twice more. So the bus, the rows and the delivery are all demonstrably working, and the difference is the WINDOW.

**The reading, and it is a reading rather than a measurement:** AG-4 and AG-5 are not polling. Stated as a hypothesis because no lens available to the Architect can see a window; the only lens that can is a human eye on the screen (`F-S117-LIVENESS-IS-POSITIVE-ONLY-1`), and the machine substitute for it — computer control of this device — was OFFERED TO THE OWNER AND DECLINED AT 2026-09-08T13:30Z. That declination is recorded without complaint: it makes the human lens the only remaining one, and the honest consequence is that no card of this session can advance until those two windows read their boxes.

## F-S134-THE-WEB-VALVE-REVIEW-LINE-DECAYED-AND-THE-SCOUT-SAID-SO-ITSELF-1

The scout's `ADVERSARY-REVIEW-WEB-VALVE-1-S132-1-scout-report-v12` at 13:18:40Z declares `CARD-WEB-VALVE-1-S132-1-v12` DECAYED by its own line-26 clause: three of five instrument blobs MOVED on master, the branch `phase/web-valve-1-s132-1` is DELETED, and the pull request merged that exact head under `OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1`. No RELEASE may name v12; a v13, if ever cut, is cut against master.

Recorded because it closes the second void line WITHOUT the Architect spending a round on it — the scout stopped itself, which is the mechanism working.

TAIL ANCHOR: CWF-S134-FINDINGS-v2-ADDENDUM ends here.
