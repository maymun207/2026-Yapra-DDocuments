# OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1

GRANTED 2026-09-11, S136, in the owner's word: "onayliyorum", answering the request quoted below.

## WHAT IS AUTHORISED

ONE master landing: branch `phase/equipment-parent-layer-split-1-s135-1` at head
`58f85fdc11c752123d9574e694f8af93e2fc5a0d`, authored by AG-5 under
`CARD-EQUIPMENT-PARENT-LAYER-SPLIT-1-S135-1-v1` and its v2 amendments.

It authorises the spend of ONE master push. It names ONE ACTION, not a path list. It does not
authorise any other branch, any re-run, a second landing, or a follow-up fix on master.

## THE REQUEST, AS IT WAS PUT

    OWNER-APPROVAL-S136-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1:
    58f85fdc11c752123d9574e694f8af93e2fc5a0d head'ini master'a indir.
    Tek inis icin gecerlidir.

## THE CONDITION THE ARCHITECT ATTACHED BEFORE THE OWNER ANSWERED

The premise was named as UNMEASURED at the moment of the ask, in these words:

> the CI at that head was NOT measured by me; the approval is spent only if AG-4 measures the green
> itself. If it is red, unmeasured, or skipped-where-it-should-have-run, the approval is NOT spent and
> the owner is told in that turn.

That condition BINDS, and `CARD-LAND-EQUIPMENT-PARENT-LAYER-SPLIT-S136-1-v2` ORDER A is the measurement
that discharges it. This artefact exists because A-REC-S133-7 records this house's own failure: the
Architect said "green" when that green was no CI run's verdict, and the owner gave a spend approval on an
unmeasured premise. The premise is named here rather than discovered later.

## WHY THE APPROVAL HAD TO BE RE-GRANTED IN S136

`CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v136` §3 asserts that
`OWNER-APPROVAL-S135-EQUIPMENT-PARENT-LAYER-SPLIT-MERGE-1` was granted and unspent. The S136 Architect
searched for that artefact through TWO independent lenses and found it in NEITHER: the project box,
which holds the three sibling S135 approvals under their own names, and the documents archive by grep.

An assertion in a bootstrap is not an approval artefact. Under FULLEST-ATTESTED the attested text wins
over the asserted one, and under §11 rewriting an inherited claim as a fact is a fresh defect committed
at close. So the approval was re-requested with its premise restated, rather than inherited.

Whether the S135 approval was in fact given and merely never written down is UNMEASURED and is not
settled by this artefact. If it was given, this one supersedes it in force and duplicates nothing that
can be read today.

## WHAT THE LANDING REPAIRS

The equipment layer's absence reconciliation has been STRUCTURALLY INCAPABLE of firing since the layer
existed. `readObservedEdges` filters stored edges by the parent ids the fan-out was SCOPED with, while
the rows carry the parent refs the PAYLOAD named; measured on the live ledger, the overlap is zero, so
the read returns zero rows on every tick. In fifteen days not one equipment edge has ever been flipped
absent. ORDER 1 of the branch scopes that reconciliation by the parents the payload named.

## WHAT IT DOES NOT AUTHORISE, STATED SO IT IS NOT MISREAD

- The migration the branch carries, `20260911070000_entity_layer_parent_ref_layer_key.sql`, is applied by
  the OPERATOR and by nobody else, under ADR-005 and OWNER-RULING-S130 RULING 1. Landing the file on
  master is not applying it.
- The post-landing measurement is owed and is not covered by this approval: after the next cron tick,
  the absent count is re-read. If it still cannot move, ORDER 1 landed and did not work.

## THE CARD IT IS SPENT THROUGH

`CARD-LAND-EQUIPMENT-PARENT-LAYER-SPLIT-S136-1-v2`, to AG-4 as LANDER. The author is AG-5, so no lane
lands its own work.
