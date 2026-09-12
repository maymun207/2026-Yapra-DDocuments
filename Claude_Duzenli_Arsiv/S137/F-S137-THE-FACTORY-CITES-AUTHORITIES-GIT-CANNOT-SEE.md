# F-S137-THE-FACTORY-CITES-AUTHORITIES-GIT-CANNOT-SEE-1

Opened 2026-09-12, session S137. Three different actors hit the same wall on the same day, independently,
and none of them was looking for it. That is what makes it a class rather than three oversights.

## THE CLASS

This factory writes cards that carry an AUTHORITY line naming a ruling. A lane is expected to obey the card
because the ruling stands. But for most of the rulings cited this session, **the ruling exists nowhere the
lane can read it.** It lives in a chat transcript, in the project box, or in the Architect's memory of a
sentence the owner typed.

So the card asks the lane to act on a name, and the lane's only way to check the name is to trust the
Architect. That is the DERIVED-NEVER-SOURCE law inverted: not a derived view standing in for a source, but a
citation with no source behind it at all.

## MEASURED, BY THE ARCHITECT, IN THE TREE AT MASTER

`git grep -l <name> origin/master`, run 2026-09-12T16:41Z in the owner's mounted clone.

```evidence:citations
OWNER-RULING-S122-E1-E2              ABSENT from the tree
CANARY-RETIRED-NOT-DESTROYED         ABSENT from the tree
OWNER-RULING-S133-P6                 ABSENT from the tree
scout_reply                          ONE file — .claude/boot/free.md, a boot text, not a migration

OWNER-RULING-S130                    NINE files, including api/cwf/__tests__/authorityMatrix.test.ts,
                                     api/cwf/__tests__/relayBusMigration.test.ts and docs/adr/ADR-015
```

The last line is the point. **One ruling in this set is done properly**, and it is done so thoroughly that
two TESTS pin it. So the repair is not hypothetical: this house already knows how.

## HOW EACH ONE SURFACED, AND WHO FOUND IT

Not one of these was found by looking for it, which is why it took three actors to see the shape.

**AG-5**, landing the ten records, filed it as a CLAIM in its own report rather than passing over it: *"the
ruling the card cites as AUTHORITY is not locatable in this clone by name"* — three greps, all empty. It
landed under that authority anyway, because the SCRIPT's report-only seam was measurable in the source even
though the ruling was not. The mechanism saved it; the citation did not.

**The scout**, ruling on the slip seam, found that `scout_reply` — a security-definer function that files
rows on the governance bus under the scout's own name, with a wider cap than the lane verb and no nonce —
exists in **no migration at master**. Its own words: the record's "by code" claim "has a door that git
cannot see."

**The scout again**, reviewing the 532 landing card, measured that the canary ruling's NAME is absent while
the FACT it stands for is measurable twice in the tree. It corrected the card to cite the two measured
places instead of the ruling — the right repair, applied to one card.

**The Architect** wrote all three of those citations, and noticed none of them.

## WHY IT MATTERS MORE THAN IT LOOKS

An authority a lane cannot verify is not an authority; it is a request for obedience. The gates this factory
built exist precisely so that no actor has to take another's word — the adversary seal so a card is not
self-certified, the report-only seam so a self-land is not self-granted, the digest preconditions so a
mistyped insert writes nothing. Every one of those is enforced by something a lane can read.

The AUTHORITY line is the one place where that discipline stops and prose begins.

And it degrades in the direction the house already fears. A hundred sessions on, a card cites a ruling; the
next Architect greps for it, finds nothing, and either invents what it must have said or drops it. Both
outcomes are worse than never having cited it. This is CIRCULAR EVIDENCE arriving by a different road.

## WHAT THIS FINDING DOES NOT CLAIM

It does not claim any of the four rulings is wrong, or that any decision taken under them was wrong. Every
landing this session that cited one was independently sound: the report-only seam was read in the source,
the canary's `if: false` was measured in two files, the slip contract's verb was read in its migration.

It does not claim the rulings were never given. The owner gave them; the Architect recorded them in the
archive. The defect is that the archive is not where a lane looks.

## THE REPAIR DIRECTION, NOT RULED HERE

Two shapes, and which applies depends on what the ruling governs. This is a design question and it goes to
the adversary, not to the Architect alone.

**A ruling that GATES MACHINE BEHAVIOUR belongs in the tree**, the way the S130 rulings are: named in the
law corpus or the architecture record, and where possible PINNED BY A TEST so that removing it breaks a
build rather than merely contradicting a document. The merge-authority exception, the canary retirement and
the observation-window ruling are all of this kind — each one changes what a lane is permitted to do.

**A ruling that is pure record** — a decision about sequencing, a park, a spend approval spent once — can
live in the archive, but then a card must cite it AS an archive artefact and say so, rather than naming it
like a law.

And one item is not a ruling at all but the same disease in infrastructure: `scout_reply` must come into the
migrations tree, which the owner has already ruled
(`OWNER-RULING-S137-THE-SCOUT-DOOR-STAYS-AND-COMES-INTO-GIT-1`).

## WHAT REMAINS UNMEASURED

How many earlier cards cited an authority that was already absent. The Architect measured five names, chosen
because they came up today; the register and the older cards are not swept.

Whether the law corpus under `docs/laws/` has a home for owner rulings of the gating kind, or whether one
must be made.

END · F-S137-THE-FACTORY-CITES-AUTHORITIES-GIT-CANNOT-SEE-1
