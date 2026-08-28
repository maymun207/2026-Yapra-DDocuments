<!-- relay-audit: v1 kind=card -->
# PHASE-LEDGER-DECAY-SWEEP-1 · v4 — READ ONLY. YOU WRITE NOTHING INTO THE LEDGER.

`docs/ground/open-items.md` is the canonical open-items ledger, APPEND-ONLY behind two floor
gates — which is why it fails in the one direction gates do not watch: an item stays OPEN long
after the tree has closed it. **`GI-015` is the case that started this: its line announces, in
the present tense, an emergency the tree may well have ended.** Nobody has read the OPEN set
against the tree. This card orders that reading and **stops there.**

**v1 AND v2 WERE BOTH REFUSED BY ALL THREE SCOUT WINDOWS. v3 IS SMALLER BECAUSE OF IT.** v2
ordered you to write closures into the ledger, and three windows independently showed that was
wrong: the write is irreversible, the gate cannot check it, and one of the doors it opened would
have executed a ruling the Architect reserved. **The write half is withdrawn.** ORDER E records
what was wrong so you can calibrate how much to trust the rest.

**v4 CHANGES NOTHING v3 ORDERED. IT CLOSES FOUR DEFECTS THREE WINDOWS FOUND IN v3 ITSELF.** v3 was
reviewed under `SCOUT-CARD-REVIEW-10-v1` and returned GREEN from three independent windows, all
nine of its fence claims reproducing in each. The windows also found four things, and v3's own
ORDER E says a found defect goes in the record rather than around it. So: a `deliverables` block
now exists, because without one this card's delivery could never be measured as ACTED; the
`READ:` collision with a `prov=1` CLAIMS row is named; the counted-noun tripwire claim is
corrected downward to what the source actually matches; and one byte figure is replaced by a
measured one. **No order, no scope, no verdict word and no surface changed.** The four defects
are recorded in ORDER E beside v1's and v2's.

## PREMISE

MEASURED: 2026-08-28T09:58Z from a fresh clone at the master sha in the `anchor` fence, re-derived for v4; v3's 07:45Z reading agreed on all nine and three review windows reproduced all nine independently. Item counts, byte floor and law-corpus sizes in the `sizes` fence; the GI-015 reading in the `worked` fence.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read. Do NOT proceed: a ledger sweep measured against a different tree is a sweep of a different repository.
UNMEASURED: how many of the OPEN items the tree closes. That is this card's whole question and no reading of it exists yet.
DECAYS the moment anything lands that changes an item's evidence — which is most landings. Re-derive every reading here rather than citing it; ORDER E says why you should distrust the fences specifically.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| the OPEN set is sixty-one items across four sections | MEASURED: grep -cE over the gate's own item grammar, run with and without the OPEN filter | sizes |
| exactly THREE of those four sections are structural under the law and the gate; the fourth is protected by nothing | MEASURED: the law record's binds field, the gate's REQUIRED_SECTIONS constant, and the ledger's own header sentence — three lenses | sizes |
| the ledger sits EXACTLY on its byte floor, which is why v2's ordered edit could not be obeyed | MEASURED: wc -c of the file against the pinned floor constant in the gate | sizes |
| GI-015's remedy is present in the tree as code and self-tests, while its line still reads OPEN | MEASURED: grep for the id over scripts/, plus a read of the ancestry predicate and the self-test scenario names | worked |
| whether that discharges GI-015's own sentence, which is about a builder this tree cannot observe | NOT-READ | it is exactly the judgement ORDER A hands you, and this card does not make it for you |
| how many OPEN items the tree closes | NOT-READ | ORDER A orders it measured; no closure is written under this card |

```evidence:anchor
$ git ls-remote origin refs/heads/master
b86850250cb3d845ff5be5edc425e3304e0dc72f
```

```evidence:sizes
MEASURED: grep -cE over the gate's own item grammar in docs/ground/open-items.md = 65 items
MEASURED: the same grep with the OPEN filter = 61 OPEN, so four already wear a closure
MEASURED: wc -c docs/ground/open-items.md = 38990 bytes
          api/cwf/__tests__/groundLedger.test.ts pins FLOOR bytes at 38990
          THE SLACK IS ZERO. The file does not sit above its floor; it IS the floor. That is
          why v2's ordered re-stamp was unobeyable — see ORDER E.
MEASURED: ls docs/laws/rules = 59 files · ls docs/laws/constitution = 16 files
          GI-009's line says "fifty-five numbered rules and fifteen constitutional records".
FOUR SECTIONS: PARK · NÖBET · SAYILAN PAYDA · PROJE KAPSAMI.
THREE ARE STRUCTURAL, NOT FOUR, and three lenses agree: the law record's binds field names
PARK, NÖBET and SAYILAN PAYDA; the gate's REQUIRED_SECTIONS holds those same three; and the
ledger's own header says "The three sections are STRUCTURAL". PROJE KAPSAMI landed later and
nothing was widened to cover it — it holds most of the items and is protected by no gate.
CONFIRM THAT YOURSELF, it is ORDER B's first question, and v2 got it wrong in its own BODIES.
```

```evidence:worked
GI-015 — its line reads, in part: "OPEN · ⚠ THE ANCESTRY CHECK READS A SHALLOW CLONE AS
         FABRICATED PROVENANCE, and it is reddening every lane's preview deployment right
         now." MEASURED: the whole GI-015 line is 1243 bytes, so roughly 1050 remain after
         this prefix; it already carries "RELAYED, not fixed" — read the WHOLE line, not
         this prefix. (v3 said "roughly another 1400" and that was never measured.)
         the tree: scripts/groundContract.ts:391 exports a three-valued ancestryOfHead;
         scripts/checkGroundTruth.ts:194 routes `unknown` into an UNMEASURED block printed
         before the verdict and never into `errs`; four self-test scenarios there at
         :360 :365 :370 :375 and four more in scripts/architectOpen.ts at :969-972,
         including one asserting the word "fabricated" never appears on an unknown.
         $ grep -rn 'GI-015' scripts/      -> 21 lines across 4 files

THIS IS A WORKED EXAMPLE OF THE METHOD AND NOT ITS ANSWER, AND HERE IS THE CATCH THAT MAKES
IT WORTH SHOWING. The item's own sentence is about the VERCEL PREVIEW BUILDER — a machine
this tree cannot observe. The code half is in the tree; the claim is about a deployment.
By ORDER A's own definitions that may be UNDECIDABLE-HERE rather than closed. v2 steered
this to a closure and a scout window caught it. Decide it yourself.
```

## ORDER A — read every OPEN item against the tree, print a verdict and a command for each

For each of the OPEN items, print one line: the id, one verdict, and **a command a reader can
re-run to reach the same verdict.**

```verdicts
CLOSED-BY-TREE      the tree demonstrably satisfies what the item's own text asks for
STILL-OPEN          it asks for something, and the tree does not supply it
UNDECIDABLE-HERE    its text asks about something this tree cannot answer — a gated store,
                    an owner ruling, another lane's or a builder's machine — reason named
DESCRIPTIVE-NO-ASK  it asks for nothing: it records a state rather than requesting a change.
                    Report the state it records and whether the tree still matches it
```

**THE COMMAND IS THE POINT OF THIS CARD, NOT THE VERDICT.** A verdict is your reading; a command
is something the Architect can re-run before deciding anything. Where a verdict genuinely rests
on reading prose rather than running something, say `READ:` and name the file and line.

**THESE FOUR WORDS ARE REPORT VOCABULARY AND NEVER APPEAR IN THE LEDGER.** They are one token
away from the ledger's legal state values, and this card writes nothing into the ledger at all.

## ORDER B — where the four verdicts DO NOT FIT, that is data, not a problem to solve

A scout window sampled real items and found several that fit two verdicts, and several that fit
none. **That is expected and it is worth more to the Architect than a clean partition.**

For any item where the four words do not fit, print the id, the verdicts that compete or the
reason none applies, and **the sentence in the item that causes it.** Then pick the one you would
defend and mark it `(contested)`. Report how many you marked contested, as its own number.

**DO NOT FORCE A FIT AND DO NOT INVENT A FIFTH WORD.** A partition that needed forcing is a
finding about the grammar, and the grammar is the Architect's to repair in the light of what you
report. Two shapes are already known to strain it and you should expect more: items that record a
state the tree satisfies while declaring themselves permanently open, and items whose evidence is
a `RELAYED` closure from a store outside this repository.

## ORDER C — the items that already wear a closure are IN SCOPE, read the other way

```scope
- GI-011
- GI-013
- PI-004
- PI-023
```

**Check each one's closure against the tree** and report whether the evidence it names still
exists and still supports what the item claimed.

A false closure that has already landed is invisible to every gate — `closureProblem()` checks
only that the closure string is non-empty, not that its path exists or proves anything — and it
is permanent, because the ledger has no reopen door. This is a small enough set to audit properly and nobody ever has.

## ORDER D — YOU WRITE NOTHING INTO THE LEDGER, AND THAT IS THE CARD'S MAIN CLAUSE

`docs/ground/open-items.md` is **READ-ONLY** under this card. No closure, no correction, no
re-stamp, not one byte — including `GI-015`'s alarm sentence, however plainly it needs fixing.

**Three reasons, all measured, and any one of them is sufficient:**

* **The write is irreversible and ungated.** The gate cannot tell a true closure from a false
  one, and the ledger has no reopen door. The only lawful repair for a wrong closure is a new
  item contradicting it — two records and no resolution.
* **One of the doors v2 opened executes a reserved ruling.** MEASURED: a scout window read the
  ledger and found the flagged-duplicate items each name their own target id, so `SUPERSEDED-BY:<that id>` is a one-token edit that
  performs the merge `PI-008` reserves to the Architect in the ledger's own words. Reserving the
  spelling `MERGED-INTO` did not reserve the act.
* **The edit could not be obeyed anyway.** The floor has zero slack and an honest re-stamp is
  net-shortening, so v2's ORDER D commanded a change that reds a gate whose constant it also put
  out of bounds. A scout window reproduced that red.

**The Architect reads your verdicts and issues the closures as a second card.** That puts the
ruling with the party that holds it and costs one relay. If you believe an item must be closed
today, say so in your report with your command — that is the input, not a reason to write.

## ORDER E — WHAT v1 AND v2 GOT WRONG, RECORDED RATHER THAN QUIETLY FIXED

You are entitled to know how much to trust the fences above. Every one of these was caught by a
scout window before dispatch, and every one is the same class this card exists to sweep — a claim
carried forward without being re-measured.

```evidence:priorerrors
v1  printed a transcript its own command cannot produce, and dropped six lines it does emit
v1  said "eight code sites name GI-015"; measured, 21 lines across 4 files
v1  opened by announcing three closures its own fence then said might be two
v1  told the lane the stamp interior was ungated. False for this file, which has its own
    interior gate on the six keys, their order, and each one's format
v2  called four ledger sections STRUCTURAL. Three are. The law, the gate and the ledger's
    own header all say three, and v2 cited the law while contradicting it
v2  ordered a re-stamp that reds the byte floor, and put the remedy out of bounds
v2  opened SUPERSEDED-BY while reserving MERGED-INTO, which reserves a spelling and not an act
v2  MEASURED by a scout window: it pre-announced verdicts for items in the same card that
    condemned pre-announcing
v2  cited RULE-54's two-lens requirement for absence claims, then ordered one lens per closure
v3  carried no `deliverables` block. MEASURED at busDelivery.ts: a card is ACTED only when a
    name its own block declares exists on origin, so v3's branch and report — named in prose
    only — were inert to the one instrument built to prove delivery. The gate did not catch it
    because the block is required for kind=phase and this card is kind=card. Fixed in v4
v3  said a bare tally like "N items" reds in prose. MEASURED, TRIP_COUNT_RE matches only
    tests, migrations and ADRs. Overstated, corrected in v4
v3  ordered `READ:` without naming that the same spelling is refused as a CLAIMS basis under
    prov=1. Named in v4
v3  said GI-015's line continues "roughly another 1400 bytes". MEASURED, the whole line is
    1243. Replaced with the measurement in v4
```

**IF YOU FIND ANOTHER, IT GOES IN YOUR REPORT.** Re-measured is not the same as right, and this
card has been re-measured twice.

## FALSIFIER

This card is wrong if a verdict it produces cannot be reproduced from the command printed beside
it. **Test that on your own output before you report:** pick three verdicts at random, re-run
their commands from a clean checkout, and say whether each reproduced. If any did not, the sweep
is not finished — report which, rather than adjusting the verdict to match.

Second arm, and it is the one this card can cause: **a sweep that reports everything
UNDECIDABLE-HERE is as useless as one that closes everything.** Report the count for each verdict. If
UNDECIDABLE exceeds half, name the items you came closest to deciding and, for each, the one
additional measurement that would have settled it.

## SHARED SURFACES

**Your report only**, at the path named below. `docs/ground/open-items.md` is READ-ONLY. You
change no gate, no generator, no test, no artifact under `docs/ground/`, and no source file
anywhere. If your sweep finds a gate itself is wrong — and `GI-009`'s stale counts and the
unprotected fourth section both suggest you will — that is a finding to REPORT, not to fix.

**Your report is a governed relay artifact** and `relay-corpus.yml` runs unfiltered on the pull
request, so it must survive the report grammar's tripwires. Three of them will fire on the
content this card orders unless you place it correctly:

```evidence:tripwires
- a bare 7-to-40 hex token reds unless it sits in a CLAIMS row or inside an evidence fence.
  Several ledger items quote full shas in their own text, and you will be quoting them.
- a counted-noun tally in prose reds the same way, but the band is NARROWER than v3 said.
  MEASURED at TRIP_COUNT_RE in scripts/relayAudit.ts: it fires on a number followed by
  tests, migrations or ADRs and their Turkish plurals, and on NOTHING ELSE. "N items" in
  prose does NOT red. v3 claimed it did; that claim was unmeasured and is withdrawn.
  Putting your tallies in an evidence fence is still the discipline, and still cheaper
  than re-checking the band each time.
- a plain ``` fence is NOT exempt. Only an evidence-colon-id fence, a CLAIMS row, and a
  fence inside a DIFF section are.
So: put every sha and every number in an evidence-colon-id fence or a CLAIMS row. This is the
grammar you are already required to follow; it is spelled out because the card orders the exact
content that trips it, and a scout window reproduced all three reds on a draft report.
```

**ONE COLLISION THIS CARD CREATES, NAMED SO YOU DO NOT WALK INTO IT.** ORDER A tells you to write
`READ:` where a verdict rests on prose. That spelling is safe in body prose and inside an evidence
fence, and it is REFUSED as a CLAIMS-row basis under a `prov=1` header — MEASURED at
`relayAudit.ts:1008-1013`, and `prov=1` is the header the gate's own canonical example shows. So:
in your CLAIMS table the bases are `MEASURED:`, `RELAYED:` or `NOT-READ`. Keep every `READ:`
verdict in the body or in a fence, never in a CLAIMS basis cell.

## DECISION RIGHTS

The Architect decides the four-verdict vocabulary, that the write half is withdrawn, and that the
closures will be issued as a second card. The lane decides every individual verdict and every
contested marking — that is the entire content of this card and it is not second-guessed here.
**NOBODY writes into the ledger under this card**, and no verdict is reported without a command
or a named `READ:`.

BODIES: `docs/laws/` constitution and rules · `CLAUDE.md` · the project box · the ledger's own
three structural sections under `S103-YASA-2` · `S103-YASA-1` (a number is never re-issued) ·
`GOLDEN-LEDGER` (every closure pastes its own carry-diff) · `RULE-54` (an absence claim wants two
independent lenses) · `S61-2` · `TOTAL-45` · the third-value discipline `GI-015` itself records.

fanout: personalized

Branch `phase/ledger-decay-sweep-1`. Push it to origin. Report to
`docs/relay/PHASE-LEDGER-DECAY-SWEEP-1-AG1-report.md`. Open a pull request against master so the
checks run on the request head. The block below is the machine-readable half of that same
sentence, and it is what makes this card's delivery measurable at all.

```deliverables
branch: phase/ledger-decay-sweep-1
report: docs/relay/PHASE-LEDGER-DECAY-SWEEP-1-AG1-report.md
```

TAIL ANCHOR: PHASE-LEDGER-DECAY-SWEEP-1-v4 ends here.
