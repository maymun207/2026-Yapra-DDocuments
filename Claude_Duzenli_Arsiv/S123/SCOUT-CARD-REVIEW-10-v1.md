<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-CARD-REVIEW-10 · v1 — the ledger sweep, third cut, re-measured before it reaches a producer

fanout: personalized — ONE address, scout, one copy. No sibling holds these bytes.

**THIS CARD ADVANCES NO ACCEPTANCE CRITERION AND SAYS SO.** It is the owner's review ruling
applied to `PHASE-LEDGER-DECAY-SWEEP-1-v3`, which is FROZEN in shape and has never been through
a window. v1 and v2 were each refused by all three windows; v3 was cut from those refusals and is
therefore the version nobody has read. The owner ruled that a fresh session re-measures the
candidate's fence claims before sending. **That re-measurement is done and it is printed below,
so you can falsify it rather than take it.**

**THE CANDIDATE IS LINE-QUOTED AND HERE IS WHY, MEASURED RATHER THAN ASSUMED.** The candidate
carries evidence fences of its own. The landed grammar's fence scanner is a naive open/close
toggle, so a nested fence flips the parity and throws the candidate's own anchor sha into
unfenced prose. This card was written that way first and the mechanical check refused it on two
rules. So every line of the candidate below carries a leading pipe-and-space, the transform is
reversible with one command, and BOTH digests are stated: the one you can compute over what you
read, and the one over the recovered original that dispatch will use.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is `b86850250cb3d845ff5be5edc425e3304e0dc72f` at the instant in PREMISE | MEASURED: git ls-remote origin refs/heads/master | remeasure |
| the quoted candidate you can see hashes to sha1 `8af6d0343a1e50b3eb3a32f35c84dce16f658ac3` over 15175 bytes, and stripping the quote prefix recovers a file whose sha1 is `c9bbb9b6fab8a5313f29aa50a7b261bde8bfc522` over 14717 bytes | MEASURED: sha1sum and wc -c over both files, plus cmp of the recovered file against the staged original — the recovery was verified byte for byte, not asserted | bytes-read |
| the recovered original passes the landed mechanical card check, and that check proved itself in BOTH directions before it was trusted | MEASURED: npx tsx scripts/cardPreflight.ts --self-test, then --check over that same recovered file | bytes-read |
| every one of the candidate's fence claims, enumerated in the scope fence, re-measures TRUE at that master | MEASURED: one command per claim, each printed beside what it returned in the remeasure fence | remeasure |
| the law-corpus figure the candidate quotes from GI-009 is still stale in the ledger, in the direction the candidate says | MEASURED: the GI-009 line read out of the ledger, against ls of the two law directories | remeasure |
| whether the candidate is SOUND as a work order | NOT-READ | that is the deliverable and only your reading answers it |
| whether any producer window is free to take it | NOT-READ | lane state is hand-written and goes fossil, and a heartbeat is anti-correlated with work; only output proves a lane is free, and none has been asked |

## EVIDENCE

```scope
- claim 1 · the master sha in the candidate's own anchor fence
- claim 2 · the item count under the gate's own item grammar
- claim 3 · the OPEN subset of that count, and the four that already wear a closure
- claim 4 · the byte size of the ledger
- claim 5 · the FLOOR bytes constant pinned in the gate test
- claim 6 · the file counts under docs/laws/rules and docs/laws/constitution
- claim 7 · the GI-009 sentence the candidate quotes
- claim 8 · four sections present, three named structural by three independent lenses
- claim 9 · the GI-015 code sites and the lines naming it under scripts/
```

```evidence:bytes-read
The candidate was staged from the owner's archive, quoted by machine, recovered by machine,
and compared to the staged file byte for byte. Nothing here was retyped.
    quoted    sha1 8af6d0343a1e50b3eb3a32f35c84dce16f658ac3 over 15175 bytes  — this is what you can hash
    recovered sha1 c9bbb9b6fab8a5313f29aa50a7b261bde8bfc522 over 14717 bytes  — this is what dispatch sends
    recovery  sed 's/^| //' over the quoted block; cmp against the staged original: IDENTICAL
    preflight --self-test over the landed checker: red=proven green=proven
    preflight --check over the recovered file: CP-1 through CP-11 all OK, GREEN, exit zero
The bytes you review, the bytes that were hashed, and the bytes that dispatch are one file.
```

```evidence:remeasure
Re-measured 2026-08-28T09:58:34Z from a fresh clone at master b86850250cb3d845ff5be5edc425e3304e0dc72f.
Each entry is claim, then command, then what it returned.

1 master        git ls-remote origin refs/heads/master
                returned b86850250cb3d845ff5be5edc425e3304e0dc72f
                AGREES with the candidate's anchor fence
2 items         grep -cE over the gate's own ITEM_RE grammar in docs/ground/open-items.md
                returned 65
                AGREES
3 open subset   the same grep with the OPEN filter
                returned 61 OPEN; the four wearing a closure are GI-011 GI-013 PI-004 PI-023
                AGREES, and those four are exactly the four the candidate's ORDER C names
4 ledger bytes  wc -c docs/ground/open-items.md
                returned 38990
                AGREES
5 floor const   FLOOR.bytes in api/cwf/__tests__/groundLedger.test.ts line 45
                returned 38990
                AGREES; the slack is zero, exactly as the candidate says
6 law corpus    ls docs/laws/rules and ls docs/laws/constitution
                returned 59 and 16
                AGREES
7 GI-009        the item's own sentence read out of the ledger
                returned "fifty-five numbered rules and fifteen constitutional records"
                AGREES that the ledger figure is stale against 59 and 16
8 sections      the heading scan over docs/ground/open-items.md
                returned PARK, NÖBET, SAYILAN PAYDA, PROJE KAPSAMI — four headings
                REQUIRED_SECTIONS in scripts/groundLedgerCore.ts line 37 holds three of them:
                PARK, NÖBET, SAYILAN PAYDA. PROJE KAPSAMI is covered by no gate.
                AGREES, and it is three independent lenses as claimed
9 GI-015 sites  grep -rn over scripts/
                returned 21 lines across 4 files: checkGroundTruth.ts, architectOpen.ts,
                relayAudit.ts, groundContract.ts
                the named anchors read as claimed: groundContract.ts line 391 exports
                ancestryOfHead; checkGroundTruth.ts line 194 routes the unknown verdict into
                an UNMEASURED push and never into errs; four self-tests at lines 360, 365,
                370 and 375, and four more at architectOpen.ts lines 969 to 972, including
                the one asserting that an unknown never reads as fabricated
                AGREES

NOT RE-MEASURED, and named rather than left silent: whether any of the sixty-one OPEN items
is closed by the tree. That is the candidate's whole question and no reading of it exists.
Open pull requests and CI conclusions are UNMEASURED here for a declared reason — the
Architect's container has no gh, so the lane is the referee and this card is not.
```

## PREMISE

PRECONDITION READ AT 2026-08-28T09:58:34Z: master is the sha in CLAIMS row one — MEASURED:git ls-remote origin refs/heads/master
MEASURED:the two digests, the two byte counts, the byte-for-byte recovery and the preflight verdict, all taken from the one staged file and its machine-made quote.
MEASURED:the nine re-measurements in the remeasure fence, each from that same fresh clone at that same master.
UNMEASURED — whether the candidate survives your reading, which is the entire point of sending it.

SELF-INVALIDATION: this premise decays on the next push to master, and every reading in the remeasure fence decays the moment anything lands that touches the ledger, the law directories or the ground scripts. ON-DISAGREEMENT: if your own read of the remote returns a different sha, or any of the nine entries returns something other than what is written beside it, STOP and report the value you read — do not adjust the fence to match, and do not review a card measured against a different tree.

## THE CHECKLIST — R1 to R6 as you have applied them

R1 premise truth · R2 completeness against the landed gates · R3 the file-content trap ·
R4 surface collision · R5 executability · **R6 byte proof: recover the candidate, confirm both
digests in CLAIMS, and say so.** If either differs, everything below it is void and that is the
only finding worth reporting.

**R2 HAS A NAMED TARGET THIS TIME.** The candidate forbids every write to
`docs/ground/open-items.md` and orders a report only. Read its ORDER D against its ORDER A and
ORDER C and say whether all three can be obeyed at once, by one lane, in one branch. Two mutually
unsatisfiable orders in one card is the exact defect this loop was created to catch, and it is
the defect the one unreviewed card of the last session actually carried.

**R5 HAS ONE TOO.** The candidate's SHARED SURFACES block tells the lane its report must survive
three named tripwires. This card was itself refused by two of that family before it reached you.
Say whether the candidate's own instructions are sufficient for a lane to write a passing report,
or whether it hands the lane a grammar it cannot satisfy while obeying ORDER A.

## ORDER A — one verdict, GREEN or RED, findings named against check ids

**Do not rewrite the card.** You report; the Architect re-cuts. A GREEN you are unsure of is worse
than a RED you can defend. If your verdict is GREEN, say in one line what you would expect to see
in the lane's report that would prove you were right to give it.

## ORDER B — one sentence, the standing question

This candidate has been written three times and refused twice, and its own ORDER E lists the
defects of its first two cuts. Name the ONE thing in v3 you still would not trust, and the single
measurement that would settle it — or say plainly that there is none. Answer from what you have
just read, not from principle.

## FALSIFIER

Falsified if either digest you compute differs from the one in CLAIMS: report that and stop,
because a review of bytes that are not the card certifies nothing.

Second arm, and it is the one this card can cause: **a window that agrees with all nine
re-measurements without re-running any of them has added no lens.** Re-run at least three of the
nine yourself, name which three, and say whether each reproduced.

## SHARED SURFACES

None. You write no file, no branch, no commit, no setting. Your reply is your only write.

## DECISION RIGHTS

The owner ruled that this loop exists, and that this candidate is frozen in shape and re-measured
before sending. You rule on the verdict. The Architect rules on what the card says next and stays
answerable for it after a GREEN. Nothing here spends.

## DELIVERY

Reply on the channel your boot names, addressed to this card, under the server's character
ceiling. Verdict first, findings second, the ORDER B sentence last.

## THE CANDIDATE — line-quoted, both digests in CLAIMS

Recover it with `sed 's/^| //'` over the block below. The candidate's own tail anchor is inside
the quoted block and carries the pipe prefix; THIS card's tail anchor is the last line of the file.

```evidence:candidate
| <!-- relay-audit: v1 kind=card -->
| # PHASE-LEDGER-DECAY-SWEEP-1 · v3 — READ ONLY. YOU WRITE NOTHING INTO THE LEDGER.
| 
| `docs/ground/open-items.md` is the canonical open-items ledger, APPEND-ONLY behind two floor
| gates — which is why it fails in the one direction gates do not watch: an item stays OPEN long
| after the tree has closed it. **`GI-015` is the case that started this: its line announces, in
| the present tense, an emergency the tree may well have ended.** Nobody has read the OPEN set
| against the tree. This card orders that reading and **stops there.**
| 
| **v1 AND v2 WERE BOTH REFUSED BY ALL THREE SCOUT WINDOWS. v3 IS SMALLER BECAUSE OF IT.** v2
| ordered you to write closures into the ledger, and three windows independently showed that was
| wrong: the write is irreversible, the gate cannot check it, and one of the doors it opened would
| have executed a ruling the Architect reserved. **The write half is withdrawn.** ORDER E records
| what was wrong so you can calibrate how much to trust the rest.
| 
| ## PREMISE
| 
| MEASURED: 2026-08-28T07:45Z from a fresh clone at the master sha in the `anchor` fence. Item counts, byte floor and law-corpus sizes in the `sizes` fence; the GI-015 reading in the `worked` fence.
| MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `anchor` fence.
| ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read. Do NOT proceed: a ledger sweep measured against a different tree is a sweep of a different repository.
| UNMEASURED: how many of the OPEN items the tree closes. That is this card's whole question and no reading of it exists yet.
| DECAYS the moment anything lands that changes an item's evidence — which is most landings. Re-derive every reading here rather than citing it; ORDER E says why you should distrust the fences specifically.
| 
| ## CLAIMS
| 
| | claim | basis | anchor |
| |---|---|---|
| | master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| | the OPEN set is sixty-one items across four sections | MEASURED: grep -cE over the gate's own item grammar, run with and without the OPEN filter | sizes |
| | exactly THREE of those four sections are structural under the law and the gate; the fourth is protected by nothing | MEASURED: the law record's binds field, the gate's REQUIRED_SECTIONS constant, and the ledger's own header sentence — three lenses | sizes |
| | the ledger sits EXACTLY on its byte floor, which is why v2's ordered edit could not be obeyed | MEASURED: wc -c of the file against the pinned floor constant in the gate | sizes |
| | GI-015's remedy is present in the tree as code and self-tests, while its line still reads OPEN | MEASURED: grep for the id over scripts/, plus a read of the ancestry predicate and the self-test scenario names | worked |
| | whether that discharges GI-015's own sentence, which is about a builder this tree cannot observe | NOT-READ | it is exactly the judgement ORDER A hands you, and this card does not make it for you |
| | how many OPEN items the tree closes | NOT-READ | ORDER A orders it measured; no closure is written under this card |
| 
| ```evidence:anchor
| $ git ls-remote origin refs/heads/master
| b86850250cb3d845ff5be5edc425e3304e0dc72f
| ```
| 
| ```evidence:sizes
| MEASURED: grep -cE over the gate's own item grammar in docs/ground/open-items.md = 65 items
| MEASURED: the same grep with the OPEN filter = 61 OPEN, so four already wear a closure
| MEASURED: wc -c docs/ground/open-items.md = 38990 bytes
|           api/cwf/__tests__/groundLedger.test.ts pins FLOOR bytes at 38990
|           THE SLACK IS ZERO. The file does not sit above its floor; it IS the floor. That is
|           why v2's ordered re-stamp was unobeyable — see ORDER E.
| MEASURED: ls docs/laws/rules = 59 files · ls docs/laws/constitution = 16 files
|           GI-009's line says "fifty-five numbered rules and fifteen constitutional records".
| FOUR SECTIONS: PARK · NÖBET · SAYILAN PAYDA · PROJE KAPSAMI.
| THREE ARE STRUCTURAL, NOT FOUR, and three lenses agree: the law record's binds field names
| PARK, NÖBET and SAYILAN PAYDA; the gate's REQUIRED_SECTIONS holds those same three; and the
| ledger's own header says "The three sections are STRUCTURAL". PROJE KAPSAMI landed later and
| nothing was widened to cover it — it holds most of the items and is protected by no gate.
| CONFIRM THAT YOURSELF, it is ORDER B's first question, and v2 got it wrong in its own BODIES.
| ```
| 
| ```evidence:worked
| GI-015 — its line reads, in part: "OPEN · ⚠ THE ANCESTRY CHECK READS A SHALLOW CLONE AS
|          FABRICATED PROVENANCE, and it is reddening every lane's preview deployment right
|          now." (the line continues for roughly another 1400 bytes and already carries
|          "RELAYED, not fixed" — read the WHOLE line, not this prefix)
|          the tree: scripts/groundContract.ts:391 exports a three-valued ancestryOfHead;
|          scripts/checkGroundTruth.ts:194 routes `unknown` into an UNMEASURED block printed
|          before the verdict and never into `errs`; four self-test scenarios there at
|          :360 :365 :370 :375 and four more in scripts/architectOpen.ts at :969-972,
|          including one asserting the word "fabricated" never appears on an unknown.
|          $ grep -rn 'GI-015' scripts/      -> 21 lines across 4 files
| 
| THIS IS A WORKED EXAMPLE OF THE METHOD AND NOT ITS ANSWER, AND HERE IS THE CATCH THAT MAKES
| IT WORTH SHOWING. The item's own sentence is about the VERCEL PREVIEW BUILDER — a machine
| this tree cannot observe. The code half is in the tree; the claim is about a deployment.
| By ORDER A's own definitions that may be UNDECIDABLE-HERE rather than closed. v2 steered
| this to a closure and a scout window caught it. Decide it yourself.
| ```
| 
| ## ORDER A — read every OPEN item against the tree, print a verdict and a command for each
| 
| For each of the OPEN items, print one line: the id, one verdict, and **a command a reader can
| re-run to reach the same verdict.**
| 
| ```verdicts
| CLOSED-BY-TREE      the tree demonstrably satisfies what the item's own text asks for
| STILL-OPEN          it asks for something, and the tree does not supply it
| UNDECIDABLE-HERE    its text asks about something this tree cannot answer — a gated store,
|                     an owner ruling, another lane's or a builder's machine — reason named
| DESCRIPTIVE-NO-ASK  it asks for nothing: it records a state rather than requesting a change.
|                     Report the state it records and whether the tree still matches it
| ```
| 
| **THE COMMAND IS THE POINT OF THIS CARD, NOT THE VERDICT.** A verdict is your reading; a command
| is something the Architect can re-run before deciding anything. Where a verdict genuinely rests
| on reading prose rather than running something, say `READ:` and name the file and line.
| 
| **THESE FOUR WORDS ARE REPORT VOCABULARY AND NEVER APPEAR IN THE LEDGER.** They are one token
| away from the ledger's legal state values, and this card writes nothing into the ledger at all.
| 
| ## ORDER B — where the four verdicts DO NOT FIT, that is data, not a problem to solve
| 
| A scout window sampled real items and found several that fit two verdicts, and several that fit
| none. **That is expected and it is worth more to the Architect than a clean partition.**
| 
| For any item where the four words do not fit, print the id, the verdicts that compete or the
| reason none applies, and **the sentence in the item that causes it.** Then pick the one you would
| defend and mark it `(contested)`. Report how many you marked contested, as its own number.
| 
| **DO NOT FORCE A FIT AND DO NOT INVENT A FIFTH WORD.** A partition that needed forcing is a
| finding about the grammar, and the grammar is the Architect's to repair in the light of what you
| report. Two shapes are already known to strain it and you should expect more: items that record a
| state the tree satisfies while declaring themselves permanently open, and items whose evidence is
| a `RELAYED` closure from a store outside this repository.
| 
| ## ORDER C — the items that already wear a closure are IN SCOPE, read the other way
| 
| ```scope
| - GI-011
| - GI-013
| - PI-004
| - PI-023
| ```
| 
| **Check each one's closure against the tree** and report whether the evidence it names still
| exists and still supports what the item claimed.
| 
| A false closure that has already landed is invisible to every gate — `closureProblem()` checks
| only that the closure string is non-empty, not that its path exists or proves anything — and it
| is permanent, because the ledger has no reopen door. This is a small enough set to audit properly and nobody ever has.
| 
| ## ORDER D — YOU WRITE NOTHING INTO THE LEDGER, AND THAT IS THE CARD'S MAIN CLAUSE
| 
| `docs/ground/open-items.md` is **READ-ONLY** under this card. No closure, no correction, no
| re-stamp, not one byte — including `GI-015`'s alarm sentence, however plainly it needs fixing.
| 
| **Three reasons, all measured, and any one of them is sufficient:**
| 
| * **The write is irreversible and ungated.** The gate cannot tell a true closure from a false
|   one, and the ledger has no reopen door. The only lawful repair for a wrong closure is a new
|   item contradicting it — two records and no resolution.
| * **One of the doors v2 opened executes a reserved ruling.** MEASURED: a scout window read the
|   ledger and found the flagged-duplicate items each name their own target id, so `SUPERSEDED-BY:<that id>` is a one-token edit that
|   performs the merge `PI-008` reserves to the Architect in the ledger's own words. Reserving the
|   spelling `MERGED-INTO` did not reserve the act.
| * **The edit could not be obeyed anyway.** The floor has zero slack and an honest re-stamp is
|   net-shortening, so v2's ORDER D commanded a change that reds a gate whose constant it also put
|   out of bounds. A scout window reproduced that red.
| 
| **The Architect reads your verdicts and issues the closures as a second card.** That puts the
| ruling with the party that holds it and costs one relay. If you believe an item must be closed
| today, say so in your report with your command — that is the input, not a reason to write.
| 
| ## ORDER E — WHAT v1 AND v2 GOT WRONG, RECORDED RATHER THAN QUIETLY FIXED
| 
| You are entitled to know how much to trust the fences above. Every one of these was caught by a
| scout window before dispatch, and every one is the same class this card exists to sweep — a claim
| carried forward without being re-measured.
| 
| ```evidence:priorerrors
| v1  printed a transcript its own command cannot produce, and dropped six lines it does emit
| v1  said "eight code sites name GI-015"; measured, 21 lines across 4 files
| v1  opened by announcing three closures its own fence then said might be two
| v1  told the lane the stamp interior was ungated. False for this file, which has its own
|     interior gate on the six keys, their order, and each one's format
| v2  called four ledger sections STRUCTURAL. Three are. The law, the gate and the ledger's
|     own header all say three, and v2 cited the law while contradicting it
| v2  ordered a re-stamp that reds the byte floor, and put the remedy out of bounds
| v2  opened SUPERSEDED-BY while reserving MERGED-INTO, which reserves a spelling and not an act
| v2  MEASURED by a scout window: it pre-announced verdicts for items in the same card that
|     condemned pre-announcing
| v2  cited RULE-54's two-lens requirement for absence claims, then ordered one lens per closure
| ```
| 
| **IF YOU FIND ANOTHER, IT GOES IN YOUR REPORT.** Re-measured is not the same as right, and this
| card has been re-measured twice.
| 
| ## FALSIFIER
| 
| This card is wrong if a verdict it produces cannot be reproduced from the command printed beside
| it. **Test that on your own output before you report:** pick three verdicts at random, re-run
| their commands from a clean checkout, and say whether each reproduced. If any did not, the sweep
| is not finished — report which, rather than adjusting the verdict to match.
| 
| Second arm, and it is the one this card can cause: **a sweep that reports everything
| UNDECIDABLE-HERE is as useless as one that closes everything.** Report the count for each verdict. If
| UNDECIDABLE exceeds half, name the items you came closest to deciding and, for each, the one
| additional measurement that would have settled it.
| 
| ## SHARED SURFACES
| 
| **Your report only**, at the path named below. `docs/ground/open-items.md` is READ-ONLY. You
| change no gate, no generator, no test, no artifact under `docs/ground/`, and no source file
| anywhere. If your sweep finds a gate itself is wrong — and `GI-009`'s stale counts and the
| unprotected fourth section both suggest you will — that is a finding to REPORT, not to fix.
| 
| **Your report is a governed relay artifact** and `relay-corpus.yml` runs unfiltered on the pull
| request, so it must survive the report grammar's tripwires. Three of them will fire on the
| content this card orders unless you place it correctly:
| 
| ```evidence:tripwires
| - a bare 7-to-40 hex token reds unless it sits in a CLAIMS row or inside an evidence fence.
|   Several ledger items quote full shas in their own text, and you will be quoting them.
| - a bare tally in prose ("N tests passed", "N items") reds the same way, and ORDER A and the
|   FALSIFIER both ask you to report tallies.
| - a plain ``` fence is NOT exempt. Only an evidence-colon-id fence, a CLAIMS row, and a
|   fence inside a DIFF section are.
| So: put every sha and every number in an evidence-colon-id fence or a CLAIMS row. This is the
| grammar you are already required to follow; it is spelled out because the card orders the exact
| content that trips it, and a scout window reproduced all three reds on a draft report.
| ```
| 
| ## DECISION RIGHTS
| 
| The Architect decides the four-verdict vocabulary, that the write half is withdrawn, and that the
| closures will be issued as a second card. The lane decides every individual verdict and every
| contested marking — that is the entire content of this card and it is not second-guessed here.
| **NOBODY writes into the ledger under this card**, and no verdict is reported without a command
| or a named `READ:`.
| 
| BODIES: `docs/laws/` constitution and rules · `CLAUDE.md` · the project box · the ledger's own
| three structural sections under `S103-YASA-2` · `S103-YASA-1` (a number is never re-issued) ·
| `GOLDEN-LEDGER` (every closure pastes its own carry-diff) · `RULE-54` (an absence claim wants two
| independent lenses) · `S61-2` · `TOTAL-45` · the third-value discipline `GI-015` itself records.
| 
| fanout: personalized
| 
| Branch `phase/ledger-decay-sweep-1`. Push it to origin. Report to
| `docs/relay/PHASE-LEDGER-DECAY-SWEEP-1-AG1-report.md`. Open a pull request against master so the
| checks run on the request head.
| 
| TAIL ANCHOR: PHASE-LEDGER-DECAY-SWEEP-1-v3 ends here.
```

TAIL ANCHOR: SCOUT-CARD-REVIEW-10-v1 ends here.
