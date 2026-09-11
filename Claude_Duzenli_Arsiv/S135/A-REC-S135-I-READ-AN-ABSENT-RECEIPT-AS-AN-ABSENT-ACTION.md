# A-REC-S135-I-READ-AN-ABSENT-RECEIPT-AS-AN-ABSENT-ACTION

STATUS: RECORDED. Two Architect premises falsified by AG-5 with bytes, 2026-09-10.
The lane was right and the Architect was wrong, twice, in the same card.

## WHAT THE ARCHITECT ASSERTED

In `CARD-LAND-WEB-CITATION-S135-3-v1`, and to the owner in the same turn:

1. "`CARD-LAND-WEB-CITATION-S135-2-v1` was never acted on — the machine hosting the
   lanes was powered off."
2. The merge commit at the branch's landed head — master merged into the branch — was
   AG-4's work, and the author had closed the merged-tree gap on its own initiative.

## WHAT AG-5 MEASURED

BOTH ARE WRONG.

The S135-2 card WAS acted on. AG-5 read it, verified both refs against its fence,
re-took its CI, rehearsed the merge, and ran the landing path. THAT RUN IS WHAT MOVED
THE BRANCH HEAD. Its own transcript:

    [land] step 2 base contained in head? OWED -- an update WAS owed
    [land] step 2 update-branch exit 0
    [land] step 2 head re-read 2/5: <the landed head> -- MOVED
    [land] step 3 REFUSED CI-ZERO-RUNS -- total_count=0 at this head

and the commit itself:

    committer = GitHub <noreply@github.com>
    date      = 2026-09-10T00:39:16Z
    subject   = Merge branch 'master' into phase/web-citation-contract-1-s134-1

The committer is GitHub's API, which is what `update-branch` drives, at the exact minute
AG-5's landing attempt ran. The merge was AG-5's, not AG-4's.

AG-5's own words on why this matters, and it is the right reason: "a record that credits
one lane for another lane's action is a record nobody can audit later."

## THE DEFECT, NAMED PRECISELY

The Architect read `consumed_at IS NULL` on the bus row and concluded the card had not
been acted on.

`consumed_at` IS A DELIVERY RECEIPT, NOT A RECORD OF ACTION. A lane reading with `--read`
rather than `--take` never writes it. The Architect KNEW this: the scout states it at the
foot of every report it has filed tonight — "consumed_at NOT written: a --read, not a
--take" — and the card gate carries a check named, in its own words, THE DELIVERY RECEIPT
IS NOT A GATE. The Architect's own cards pass that check on every insert.

So this is not a fact that was unavailable. It is a law this house already owns, applied
to receipts instead of to counts:

    EMPTY IS NOT ZERO. An absent receipt is not evidence of an absent action.

The Architect took a NULL as a negative measurement, then built a narrative on it — a
powered-off machine explaining an inaction that never happened — and that narrative was
plausible enough to survive into a card and into a report to the owner. A plausible story
resting on an unread field is the exact shape this factory keeps paying for.

## THE SECOND-ORDER ERROR

Having decided nothing had acted, the Architect needed an actor for the merge commit it
could see, and assigned it to AG-4 — the only other lane in the story. That attribution
was never measured; it was inferred to make the first mistake coherent. One unmeasured
premise recruited a second.

## WHAT AG-5 GOT RIGHT THAT THE ARCHITECT DID NOT

Three refusals across one night, none of which spent the approval:

· REFUSAL 1, a genuine conflict on `public/architecture/manifest.json` — and the conflict
  was AG-5's OWN doing, created when it landed PR 524 earlier. It refused to resolve it
  anyway, because a lander editing another lane's file to get its own landing through is a
  half-written certificate (s12.12). It named its own fault and still would not cross the
  line.
· REFUSAL 2, `CI-ZERO-RUNS` at the head that `update-branch` had just produced — it read CI
  at the tree that RESULTED rather than the one it started from, and refused to certify a
  tree no gate had looked at.
· REFUSAL 3, the stale card, which the Architect voided first but whose own
  ON-DISAGREEMENT would have stopped the lane regardless.

An approval is spent by a landing, and there was none, so it survived all three.

## THE MECHANICAL CURE

Before writing "was not acted on", "did not run", or "never happened", the Architect names
WHICH FIELD it read and whether that field is WRITTEN BY THE ACTION or merely CORRELATED
with it. `consumed_at` is correlated. A branch head, a commit, a run id and a landed file
are written by the action. Liveness is read from OUTPUT — the same law already on the books
for heartbeats, applied here to receipts.

And the attribution half: a commit's author is READ from the commit, never inferred from
who else was in the room.

## OWNER-FACING CONSEQUENCE, STATED PLAINLY

The owner was told, in a report opening with a measurement, that his lanes had been idle
because his machine was off. His machine WAS off for part of that window — that much held —
but the specific claim that the card went unacted was false, and the branch had moved
because a lane did its job. He should not have to discover that from a lane's report.
