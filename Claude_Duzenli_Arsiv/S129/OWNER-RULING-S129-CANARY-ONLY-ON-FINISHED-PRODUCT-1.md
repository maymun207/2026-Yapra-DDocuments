# OWNER-RULING-S129-CANARY-ONLY-ON-FINISHED-PRODUCT-1

Recorded under S112-YASA-1: the owner is a DESIGN SOURCE and his contributions are recorded BY
NAME. This is his, not the Architect's, and the Architect was moving in a direction that invited
the misreading this ruling corrects.

## THE RULING, IN THE OWNER'S OWN WORDS

> "canary ye onay vermiyorum, bugli ve eksik fonksyonaliteli CWF hic bir zaman eval canary run
> edemez! Ancak bitmis urun eval canary run eder!"

## THE RULING IN ITS GENERAL FORM

THE EVAL-CANARY IS AN ACCEPTANCE INSTRUMENT, NOT A DEVELOPMENT GATE. A CWF that is buggy or
functionally incomplete NEVER runs it. Only a FINISHED PRODUCT runs it.

This is STRONGER than the freeze already in place. `PHASE-CANARY-FREEZE-1-v1` of 2026-08-27 was an
ACT — the canary was switched off until somebody switched it back on. This ruling supplies the
PREDICATE FOR THAWING: the canary does not thaw because a release feels close, because a phase
landed, because the debt is uncomfortable, or because someone wants a number. It thaws when the
product is finished, and not before.

## WHAT IS ALREADY TRUE, MEASURED RATHER THAN ASSUMED

MEASURED: 2026-09-03T13:2xZ, `.github/workflows/build-test.yml` read at master
`d8895114744dbb23ba5633d726a0814cfe0468d5` — the `eval-canary` job carries `if: false` at line 530.
The real condition it would otherwise use sits directly above it, COMMENTED OUT. A job guarded by
`if: false` cannot run on any event: not a master push, not a pull request, not
`workflow_dispatch`. The ruling and the machine already agree.

MEASURED: 2026-09-03T13:2xZ, `git diff --stat <anchor>...phase/tool-visibility-b-1 -- .github/`
returns EMPTY. Pull request 488 does not touch the workflow directory at all, so landing it cannot
thaw anything by accident.

MEASURED: 2026-09-03T13:1xZ, `docs/ops/CANARY-FROZEN.md` at the same anchor — the freeze document
opens by instructing any reader who finds the canary "missing, stale, or unmeasured" that this IS
the freeze working, and must not be repaired.

## THE ARCHITECT'S SHARE IN WHY THIS RULING WAS NEEDED

A-REC-S129-15 — THE ARCHITECT PUT THE CANARY IN THE FOREGROUND OF A REQUEST THAT WAS NOT ABOUT IT.

S102 attaches a NAMED owner spend approval to every master push, and names the eval-canary's ~110k
as the cost driver in the same breath. The Architect asked for that approval and, wanting to be
honest about cost, led with the canary measurement — "the canary is frozen, so this push fires no
model spend". The sentence was TRUE and it was the WRONG THING TO PUT FIRST. It made a request
about LANDING CODE read as a request about RUNNING THE CANARY, and the owner ruled on what he was
shown.

The class: an Architect that leads with the reassurance rather than the ask has changed the subject
of the ask. The remedy is mechanical and is adopted here — a request for a master-push approval
names the MERGE, the pull request and what lands; the spend measurement goes UNDERNEATH, as a
figure, not as the headline.

## WHAT THIS RULING DOES NOT DECIDE

Whether pull request 488 lands. That is a separate act and it is still open. The canary does not
run either way, and the ruling above does not speak to merging code.

The mapping between "finished product" and a MEASURED definition. This project has exactly one
acceptance contract — `cwf-sota-definition`'s sixteen external criteria, which SOTA-1 binds v1 to —
and it would be natural to read "bitmiş ürün" as those sixteen. THE OWNER DID NOT SAY THAT AND THE
ARCHITECT IS NOT PUTTING IT IN HIS MOUTH. The mapping is UNMEASURED and it is the owner's to make.
It is named here so that a future Architect does not quietly supply it and then treat its own
inference as the owner's ruling — this house's name for that is CIRCULAR EVIDENCE.

## STANDING EFFECT

Any card, phase prompt or lane instruction proposing to thaw, re-run, dry-run or "just check" the
eval-canary is REFUSED unless it carries a fresh, named owner ruling that the product is finished.
The Architect may not supply that judgement. A lane may not infer it from a green CI.

TAIL ANCHOR: OWNER-RULING-S129-CANARY-ONLY-ON-FINISHED-PRODUCT-1 ends here.
