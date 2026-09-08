# OWNER-APPROVAL-S133-WEB-VALVE-MERGE-1

kind: owner artefact · S102 named spend approval · S112-YASA-1 design-source record
session: S133
cut: 2026-09-08, by the Architect, immediately on receipt
status: SPENT on ONE landing — CARD-LAND-WEB-VALVE-1-S133-1-v1, bus row at 2026-09-08T10:25:26.833229Z, body md5 29d2dcf8fbabe6a5ca55b8f284d46e82

## THE APPROVAL, VERBATIM

```approval
web valve merge onay
```

Nothing is added to it and nothing is read into it. It is three words and they cover
one landing.

## WHAT IT WAS ASKED FOR

The Architect asked, in the sentence the owner answered:

> "master'a push için adlandırılmış harcama onayın gerekiyor (§5 — bu makine işi değil,
> senin kararın). Onaylıyorsan tek kelime yeter: **web valve merge onay** — O an şeride
> şunu emrederim: dalı master'a `--no-ff` ile PR üzerinden al, valf KAPALI kalsın, ve
> iniş sonrası CI'yi ben okuyup sana tek satır sonuç yazayım."

So the approval's scope is exactly: land `phase/web-valve-1-s132-1` into master through a
pull request, `--no-ff`, squash forbidden, the valve left CLOSED, and the Architect reads
the post-landing CI himself and reports one line.

## WHAT IT DOES NOT COVER

- No second landing. The MA-RERUN line has no approval and does not get one from this row.
- No change to any valve default, environment variable or flag. The floor stays CLOSED.
- No path outside the nine in the card's `paths` fence. A tenth path is a STOP.

## WHY THIS IS AN OWNER SURFACE AND NOT A MACHINE STEP

§5 requires a NAMED owner spend approval for every master push, and PLATINUM's test
passes it to him: this is human JUDGEMENT — a decision to spend — not an operation a
machine may take. Everything downstream of the three words is machine work and was
dispatched to AG-5 as a card, not to the owner as instructions (S102-YASA-1).

## THE DESIGN CONTRIBUTION IN IT — S112-YASA-1

The approval is not only a spend decision. It closed a failure the Architect could not
see from inside: for roughly twenty-two hours the factory produced card versions about
code that was already written and already green, and the Architect read the repeated
`UNMOVED` signal as a checkbox rather than as a fact. The owner ended it with four
questions in plain language — is it implemented, did you test it, is it in the load, why
are we spending days — and those questions, not any measurement the Architect chose to
take, are what caused the code to be read for the first time.

Recorded here by name because the Architect keeps the record and has no memory between
sessions; an unattributed record becomes, a hundred sessions later, one in which every
insight appears to be the Architect's own. That is DAİRESEL KANIT, and this house names it.

Carried alongside: A-REC-S133-6.
