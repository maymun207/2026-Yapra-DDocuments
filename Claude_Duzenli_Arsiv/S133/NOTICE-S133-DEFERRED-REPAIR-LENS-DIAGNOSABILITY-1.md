# NOTICE-S133-DEFERRED-REPAIR-LENS-DIAGNOSABILITY-1

kind: Architect ruling on a deferral · S61-2 requires a deferral to be NAMED and RECORDED, never silent
session: S133 (cut after the close, because the measurement arrived after it)
subject: the diagnosability regression AG-4 declared in `MA-RERUN-HARDEN-1-S133-1-AG4-report`

## WHAT THE LANE MEASURED AND DECLARED, in its own words

The harden commit removed the lens's stderr from the CI artifact. AG-4 was ordered to state
what a future reader of a FAILED run can still obtain and what was given up, and to say so
plainly if the answer is "less than before". It did:

> A parity role missing a grant now produces `lens_outcome=failure`, `clarify_lines=0`,
> `lens_failed_lines=0` — **and so does a DNS failure, a bad `--until`, an unset secret, and a
> crash before the first frame.** All five collapse into the same three values.
> … the counting step tells a reader HOW MUCH the lens got through, and no longer tells them
> WHY it stopped.

It also named the repair and refused to make it, correctly, because the card's SCOPE fenced the
commit and its FALSIFIER forbade more: a third anchored prefix count over the FENCE-DB-1 banner,
or the node exit code printed beside the outcome, would separate "failed before reading
anything" from "failed after reading some" **without printing a single line of content**.

## THE RULING — DEFER, AND HERE IS THE CONDITION THAT ENDS THE DEFERRAL

The repair is NOT cut now. The run card is already in flight and its precondition is satisfied;
inserting another workflow card ahead of it would delay the measurement, and delay-by-improvement
is the exact failure this session recorded as `A-REC-S133-6`.

**The deferral ends the moment it costs something.** If the dispatched run FAILS and the three
printed values do not distinguish why, that ambiguity IS the trigger: the repair card is cut
immediately, with AG-4's own two options as its ORDER, and the failed run is re-measured only
after it lands (never re-run before, S55-1). If the run SUCCEEDS, the repair is a hygiene item
for the next session and nothing more.

This is a legitimate deferral under S61-2 because it is named, recorded, and carries the exact
condition that ends it. It is NOT legitimate under SOTA-1 as a "good enough" — no SOTA criterion
is being deferred here, only a diagnostic convenience on a measurement instrument.

## WHY THE TRADE ITSELF STANDS

Containment of recorded frames outranks convenience of diagnosis. The stream carries per-frame
verdict lines from organic turns; a fortnight-lived copy of them in a CI artifact is a
publication, and a transcript is a publication (S127's edge, S132's stderr edge, the same law).
The lane made the right trade and, more to the point, **it wrote the loss down instead of
leaving the next reader to discover it by needing it.** That is the behaviour this house wants
and it is recorded as such.

## CARRY

This notice is the carrier for the item. `cwf-open-items-register-v123` was already submitted
when this measurement arrived and S37-1 forbids editing a submitted artefact, so the item lives
here by name and is folded into `cwf-open-items-register-v124` at the next close.
