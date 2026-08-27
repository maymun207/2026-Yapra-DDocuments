<!-- relay-audit: v1 kind=card -->
# PHASE-CP8-RECONCILE-1 · v1

CP-8 and the report grammar disagree about the same bytes, in BOTH directions, and each is
right about its own half. This card ends the disagreement surgically rather than by making one
check into a copy of the other — which would destroy CP-8.

## PREMISE

MEASURED: 2026-08-27T21:50Z, the two live regexes executed side by side over a labelled case set and over all 302 landed relay documents; results in the evidence fences.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `evidence:anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read; do not rebase onto it and do not proceed.
DECAYS the moment `scripts/cardPreflight.ts` or `scripts/relayAudit.ts` lands, because both regexes and the exemption set live there.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| the two checks disagree in BOTH directions on the same bytes | MEASURED: both regexes executed over a labelled case set | probe |
| the proposed anchoring gives the intended verdict on all eight labelled cases | MEASURED: the proposed regex executed over that same set | probe |
| the landed refusal rate over the corpus decomposes into a false-positive part and a true-positive part | MEASURED: three regex variants executed over all 302 documents in docs/relay | corpus |
| the residue is genuine truncated shas rather than false positives | MEASURED: grep of the residue tokens in their source lines | corpus |
| cardPreflight can already import from relayAudit | MEASURED: grep of the import block in scripts/cardPreflight.ts | reuse |
| the exemption computation is NOT exported today | MEASURED: grep for its declaration in scripts/relayAudit.ts | reuse |
| whether the corpus true-positive count stays at 80 after the change | NOT-READ | it cannot be read before the change; ORDER D orders it measured |

```evidence:anchor
$ git ls-remote origin refs/heads/master
2e1d193b5bf809228821d1934caa5bce474f3959
```

```evidence:probe
The LANDED CP-8 anchors on hex-character lookarounds; the report grammar anchors on word
boundaries. That single difference is the whole ordinary-English false-positive class,
because a word boundary cannot fall between two word characters.

input                                       landed  proposed  intended
"2f0804622c59b9b857208342314912499ba076f1"   pass     pass      pass    <- CP-8 REQUIRES this
"2f08046"                                    REFUSE   REFUSE    REFUSE  <- the whole point
"the job s-u-c-c-e-e-d-e-d" (unhyphenated)   REFUSE   pass      pass    <- the English class
"20260827120000_add_col.sql"                 REFUSE   pass      pass    <- migration filename
"deadbeef"                                   REFUSE   REFUSE    REFUSE  <- a real bare token
"run 17482910345"                            REFUSE   REFUSE    REFUSE  <- CI run id in prose
"abc1234"                                    REFUSE   REFUSE    REFUSE  <- a 7-hex prefix
All eight land as intended under the proposal. Note row 1: the report grammar REFUSES the full
40-hex token that CP-8 exists to REQUIRE, which is why wholesale copying is forbidden below.
```

```evidence:corpus
three variants over all 302 documents under docs/relay:
  CP-8 as landed                       refuses 271/302   89.7%
  + word-boundary anchoring            refuses 261/302   86.4%
  + the report grammar's exemption set refuses  80/302   26.5%
the residue, read in its source lines rather than assumed:
  PHASE-FAULT-SWITCH-0-report.md:11   **commit** `8287599` ... **anchored at** `b2d6c55`
  PHASE-STAGE-BENCH-1-report.md:3     **Base** `fe06ed6efd2a69d8c6d685ef36605db9a7501820`
Those are genuine truncated shas in prose. They are what CP-8 exists to catch and they are NOT
to be made passable.
```

```evidence:reuse
$ grep -n "from './relayAudit.js'" scripts/cardPreflight.ts
70: import { RELAY_KINDS, auditText } from './relayAudit.js';
$ grep -n 'function tripwireExemptLines' scripts/relayAudit.ts
353: function tripwireExemptLines(parsed: Parsed): Set<number> {
The import path already exists. The exemption computation is module-private, so today the only
way to use it from the preflight is to export it.
```

## ORDER A — change the ANCHOR, keep the BAND

Replace CP-8's hex-character lookarounds with word-boundary anchoring, and **keep its own
`{7,39}` upper bound.** The band is what lets the full 40-character sha pass, and passing it is
CP-8's entire purpose. Do not widen the band to the report grammar's, which refuses it.

## ORDER B — REUSE the exemption set; do not reimplement it

Give CP-8 the same exempt-line set the report grammar already computes — the CLAIMS table rows,
the contents of `evidence:` fences, the contents of fences inside a DIFF section, and every
fence delimiter. **Export that computation from `scripts/relayAudit.ts` and CALL it.** The
preflight already imports from that module, so the path exists.

**A PRIVATE COPY IS THE DEFECT, NOT THE FIX.** Two vocabularies for one grammar is precisely
the disagreement this card exists to end; a reimplementation would re-create it one release
later. If exporting proves impossible for a named mechanical reason, STOP and report the
reason — do not fall back to copying.

## ORDER C — CP-8's stated basis becomes FALSE and must be corrected in the same change

CP-8's `basis` today states a known limit: that any hex run in its band reads as a sha, so a
digest fragment quoted in a card will red the check. **After ORDER A and ORDER B that sentence
is no longer true.** A rule whose stated reasoning contradicts its behaviour is worse than one
with no reasoning, because the next reader trusts it.

Rewrite the limit sentence to describe what the check does after this change, and say what it
still catches. Do NOT touch CP-8's `title` or its intent.

**Then regenerate the published artifact.** `docs/ground/CARD-PREFLIGHT-v1.md` is produced by
`npx tsx scripts/cardPreflight.ts --write-artifact` and carries its own provenance line. If
your change touches any check's `title`, `requirement` or `basis`, run that command and land
the regenerated file in the same branch. **Never hand-edit it.**

Do not add a jurisdiction statement anywhere in this change. That sentence is owned by a
separate owner-gated item and writing it here would duplicate it.

## ORDER D — the acceptance, which is the owner's revised criterion and not the original one

The original criterion — corpus refusal rate to one percent — is **VOID by owner ruling**: it
measured a population this check does not govern. Measure and report all four:

```acceptance
- the false-positive rate over the landed corpus falls to ZERO, measured on the labelled
  classes: hex-compatible ordinary English words, migration filenames, CI run ids, and content
  on lines the report grammar already exempts
- the TRUE-positive count is reported as its own number and is EXPECTED TO BE 80, unchanged,
  because those are real truncated shas
- a genuine secret-string and raw-hash fixture is STILL REFUSED
- the full 40-character sha is STILL ACCEPTED
```

Report the four as numbers, not as a tick. A rate reported without its true-positive twin is
the reading that produced the void criterion in the first place.

## ORDER E — the positive control, and the fixtures

The landed self-test scenario that plants a truncated prefix and expects RED **must still go
RED**. Run `npx tsx scripts/cardPreflight.ts --self-test` before and after and report both
lines; a self-test that has never been seen red is not evidence.

Add a fixture per labelled false-positive class and a fixture for the secret and raw-hash case
that must still trip. The English-word instance is the one that refused a live card on
2026-08-27; its exact spelling is recorded in the `probe` fence above, written with separators
so that this card can survive its own subject.

## FALSIFIER

This card is wrong if, after it lands, either half of the disagreement survives: a card is
still refused for an ordinary English word or a migration filename, or a truncated sha is
allowed through anywhere. Test both arms; one arm alone proves nothing.

## SHARED SURFACES

`scripts/cardPreflight.ts` and `scripts/relayAudit.ts` are shared with every lane that mints or
lands. Touch ONLY CP-8's predicate, the export of the exemption computation, CP-8's basis text,
and the regenerated artifact. Do not change any other rule's predicate, any other exemption, or
any verdict outside CP-8.

**OUT OF BOUNDS:** the `REFUSED-CHECKS=` line on stdout. It is parsed by `scripts/mail-wait.mjs`
and pinned by the preflight's unit test.

**A SELF-TRAP IS EXPECTED ON THIS CARD SPECIFICALLY.** Your own fixtures and diffs will contain
the very tokens the landed check refuses, so the preflight may refuse your report. You get TWO
repair attempts. On a second refusal, STOP, attach both refusal texts verbatim, and escalate —
do not reword content to slip past a validator. That escalation is anticipated and is not a
failure of this card.

## DECISION RIGHTS

The Architect decides the anchoring change, the reuse-not-reimplement rule, and the acceptance
set. The lane decides the implementation and the fixture shapes. NOBODY relaxes the two arms in
the FALSIFIER, and nobody makes the 80 residue documents passable.

BODIES: docs/laws/ constitution and rules · CLAUDE.md · the project box · the card grammar in
scripts/cardPreflight.ts and its generated home docs/ground/CARD-PREFLIGHT-v1.md · the report
grammar in scripts/relayAudit.ts · OWNER-RULING-S122-T1-v1 decisions D-2 and D-3 ·
DIRECTIVES v1.1 · T1-1 · P-4 · P-5 · P-8.

fanout: personalized

Branch `phase/cp8-reconcile-1`. Push it to origin. Report to
`docs/relay/PHASE-CP8-RECONCILE-1-AG2-report.md`. Open a pull request against master so the
checks run on the request head.

TAIL ANCHOR: PHASE-CP8-RECONCILE-1-v1 ends here.
