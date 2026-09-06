# S129-DISPATCH-RECORD-3 — CARD-TOOL-VISIBILITY-B-1-v1 to the scout

## WHAT WENT OUT

artifact_name : SCOUT-CARD-REVIEW-TOOL-VISIBILITY-B-1-v1
direction     : to_lane
lane_addr     : scout
body sha256   : 62ac985d1fd2dae4531d5e6c26ffbf113f87122309209d90166f31edc5e7ac57
body length   : 14260 bytes
inserted      : 2026-09-03T11:5xZ

The archive file `CARD-TOOL-VISIBILITY-B-1-v1.md` carries the SAME digest. The transport was a
single dollar-quoted INSERT with `RETURNING encode(sha256(convert_to(body,'UTF8')),'hex')`, and
the returned digest matched the on-disk file on the first attempt. No re-typing, no repair, no
STOP row — the A-REC-S129-7 protocol worked as designed.

## PREFLIGHT

Run on the Architect's own strip-types lens at `$HOME/lens`, against the archive file:

  CP-1 .. CP-11 all OK — GREEN, the card may be inserted.

One RED was caught and fixed before insertion: CP-8 refused a 32-hex turn id that sat inside
`evidence:sites`, a fence a CLAIMS row anchors. The turn id was removed and replaced with the
instrument that reproduces the reading. This is the second time in S129 that CP-8's anchored-band
rule caught a value the Architect placed without thinking about which fence it landed in.

## THE ARCHITECT CORRECTION THIS CARD CARRIES

A-REC-S129-9 — THE COUNTER THE ARCHITECT SAID ALREADY EXISTED DOES NOT.

The Architect told the owner, in the turn answering his gap question, that G-5's counter already
exists and the gap was "only a display problem", naming `unclassifiedCount: 12` as the counter and
`writeOfferedCount: 0` as an answer to a card's open question.

Reading `api/cwf/_lib/routing/backendCoverage.ts` at 2026-09-03T11:4xZ shows that was wrong.
`countExposure` runs over ONE TURN's already-filtered `toolDefs`, and its predicate is per-BACKEND
by deliberate design — the module's own prose states the per-TOOL predicate is FORBIDDEN, because
it would silently repeal ADR-011's write-lock over the write-annotated tools. `unclassifiedCount`
therefore never could have named the four invisible tools: they belonged to a COVERED backend, so
the per-backend predicate passes them through and they are not "unclassified" by that definition
at all.

The catalogue-wide number — which ACTIVE tools of a COVERED backend appear in no published
category — does not exist on any surface. It is not a display problem. It is a missing computation.

CLASS: the Architect read a field NAME and inferred a field MEANING, then reported the inference
to the owner as a measurement. This is `TOTAL-45` exactly: a name in telemetry is a claim, not the
world. It is also the second instance in S129 of the same shape (A-REC-S129-4 asserted address
closure from bus silence). The card corrects it in its own body rather than beside it, so a lane
reading only the card still gets the truth.

WHAT IT COST: nothing yet — the wrong statement was made in conversation and corrected before any
card was cut on it. Had GATE 2 been written from the original belief, it would have been a display
change over a number that answers a different question, and the owner's actual complaint — that
nobody tells the checker — would have survived a fix that appeared to close it.

## STATE AT DISPATCH

- The card is with the scout. The scout reviews BEFORE the worker sees it — the standing order.
- No producer has been dispatched. AG-4 holds `lane/AG-4`, box empty.
- The foreman has been offered by the owner and is not yet started. It is needed for the merge:
  `gh pr merge` is fenced in every producer window and `npm run land` refuses AUTHOR-SUBJECT
  self-landing, so a producer cannot land its own branch.
- `origin/master` last received a commit on 2026-08-30. This card is the first code card of S129.

TAIL ANCHOR: S129-DISPATCH-RECORD-3 ends here.
