# OWNER-RULING-S126-TRUNK-SYNC-LANDING-1 — a trunk-sync merge does not spend landing eligibility

RECORDED 2026-08-29 ~15:55Z, under S112-YASA-1 (filed by name, with the owner's verbatim words).
AMENDED ~17:55Z: §EFFECT gains item 5 — the S126 LANDING CLASS ruling, recorded here because it
extends the same subject (who may land under single-lane mode).

## THE QUESTION PUT TO THE OWNER

CLAUDE.md §5: "NEVER MERGE YOUR OWN WORK — that rule tracks who did the work, not who opened
the PR, and no measurement, wait or argument relaxes it." Under OWNER-RULING-S125-SINGLE-LANE-1
the factory runs exactly ONE worker lane, so the forward merge that re-levels PR #482
(git merge origin/master, ordered by PHASE-S126-OPEN-1-v3 ITEM 2) puts that worker's own
merge commit on the branch it must later land. The scout's round-1 verdict read §5 as already
answering AGAINST the worker landing; the only alternative — the owner pressing merge himself —
is the S102-YASA-1 violation class (no machine-doable operation moves to the owner).

## THE PROPOSED EXCEPTION, as put to the owner (single path)

> A trunk-sync merge commit — `git merge origin/master`, conflict-free, not one byte
> hand-edited — does NOT count as product authorship for landing eligibility. Under
> single-lane mode, the worker may land a PR whose only commits of its own are such
> trunk-sync merges plus card-ordered reseals.

Rationale: every product byte on the branch belongs to the S125 build lane; the sync commit
introduces no new content, and a conflict is a STOP under the card's own arms before this
exception could ever cover it.

## THE RULING, the owner verbatim (session channel, 2026-08-29 ~15:55Z)

> "Evet iyi dusunmussun bunu kesinlikle onayliyorum!"

## EFFECT

1. The exception is LAW at the stated width and no wider: conflict-free trunk-sync merges and
   card-ordered reseals only. Any commit that touches a file by hand, resolves a conflict, or
   adds content spends eligibility exactly as §5 always said.
2. GO-LANDING v4 for #482 carries this ruling's verbatim text and lands under it.
   (Post-fact note: #482 landed at 16:45:48Z; land.ts measured author AG-4 ≠ lander AG-5 on
   its own terms — merge commits are excluded by --no-merges — so this exception was
   belt-and-braces there, not load-bearing. It remains law for the cases that DO reach it.)
3. Lanes cannot read the project store: the ledger re-entry card files this ruling (with
   OWNER-RULING-S125-SINGLE-LANE-1) into the repository, and the boot-file SINGLE-LANE MODE
   section names it.
4. The design contribution is the owner's, recorded by name — the Architect drafted the width,
   the owner ruled it (S112-YASA-1 asymmetry respected: the proposal was a single measured
   path, not a menu).
5. **S126 LANDING CLASS (recorded 2026-08-29 ~17:55Z, the owner verbatim: "Onay").** The
   question put to him, verbatim from the session channel: "Tek-şerit modunda işçi,
   kart-emirli ve scout-incelemeli bir iniş kartıyla KENDİ yazdığı PR'ı indirebilir; kalıcı
   metin değişikliği (CLAUDE.md §5 + boot dosyaları) defter kartıyla yapılır." APPROVED.
   Width: single-lane mode only; the landing must be ordered by a card that carries a scout
   verdict; the scout review is the second eye §5's purpose demands. The durable amendment of
   CLAUDE.md §5 and the boot files rides the ledger re-entry card; until it lands, each such
   landing card carries this ruling verbatim on its face.

TAIL ANCHOR: OWNER-RULING-S126-TRUNK-SYNC-LANDING-1 ends here.
