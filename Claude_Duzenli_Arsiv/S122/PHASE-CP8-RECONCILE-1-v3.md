<!-- relay-audit: v1 kind=card -->
# PHASE-CP8-RECONCILE-1 · v3 — SUPERSEDES v2 AND v1

**READ THIS FIRST IF YOU ARE ALREADY WORKING v1.** v1 reached you before its scout window, which
was the Architect's process error, not yours. Three independent reviews then found that **two of
v1's own orders could not both be satisfied.** You appear to have found the same collision and
resolved it. Your resolution was the right one and this card RATIFIES it — you are not being
asked to revert. What follows makes the decision explicit, because it was a governance decision
that v1 forced you to make silently and no card had authorized.

## PREMISE

MEASURED: 2026-08-27T22:30Z, the collision reproduced by execution — the planted control token sits inside an `evidence:` fence and the ordered exemption blinds it; shown in the `collision` fence.
MEASURED: 2026-08-27T21:50Z, both regexes over a labelled case set and over all 302 landed relay documents; corrected figures in the `corpus` fence.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `evidence:anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read; do not rebase onto it and do not proceed.
DECAYS the moment `scripts/cardPreflight.ts` or `scripts/relayAudit.ts` lands, and TWO branches are in flight against both files right now — see ORDER F.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| the control token the old ORDER E protected sits INSIDE an evidence fence, so the ordered exemption blinds it | MEASURED: located the token's line in the clean-card constant and checked it against the grammar's exempt-line set | collision |
| the landed refusal rate decomposes into a false-positive part and a true-positive part | MEASURED: three regex variants over all 302 documents in docs/relay | corpus |
| the residue is overwhelmingly truncated shas at DOCUMENT level, but not every residue token is one | MEASURED: token-level count over the residue documents | corpus |
| CP-8's `requirement` text is ALSO falsified by this change, not only its `basis` | MEASURED: read of the requirement string in scripts/cardPreflight.ts | texts |
| two in-flight branches both regenerate the published artifact and conflict there | MEASURED: trial merge of the two branch heads | conflict |
| whether the corpus true-positive DOCUMENT count stays at 80 after the change | NOT-READ | it cannot be read before the change; ORDER D orders it measured |

```evidence:anchor
$ git ls-remote origin refs/heads/master
2e1d193b5bf809228821d1934caa5bce474f3959
```

```evidence:collision
the clean-card constant used by the self-test places its full sha INSIDE a fence:
    ```evidence:floor
    $ git rev-parse origin/master
    <the full 40-hex>          <- line 24 of that constant
    ```
and the landed self-test scenario plants the truncated prefix AT THAT LINE.
The report grammar's exempt-line set includes the contents of every `evidence:` fence.
So under the exemption this card orders, that line is NOT SCANNED:
    landed CP-8   -> 1 violation  => RED
    proposed CP-8 -> 0 violations => GREEN
v1's ORDER E said that scenario "must still go RED". v1's ORDER B made it green. Neither order
could be obeyed without breaking the other, and v1's SHARED SURFACES forbade the only fix.
```

```evidence:corpus
three variants over all 302 documents under docs/relay:
  CP-8 as landed                       refuses 271/302   89.7%
  + word-boundary anchoring            refuses 261/302   86.4%
  + the report grammar's exemption set refuses  80/302   26.5%
CORRECTED FROM v1, which cited the wrong line and called a SUCCESS case a residue:
  PHASE-FAULT-SWITCH-0-report.md:11  **commit** `8287599` ... **anchored at** `b2d6c55`   <- residue
  PHASE-STAGE-BENCH-1-report.md:3    carries a FULL 40-hex and is NOT residue — the check
                                     accepting it is the behaviour being preserved
  PHASE-STAGE-BENCH-1-report.md:4    `fe06ed6…` — THIS is that file's residue
HONEST QUALIFICATION, also corrected: at DOCUMENT level the residue is overwhelmingly genuine
truncated shas, and only one of the 80 documents has a purely false-positive residue. At TOKEN
level it is mixed: of 1481 residue tokens, 247 are pure-digit runs, some of which are cost
figures rather than shas. The 80 in ORDER D is therefore a DOCUMENT count and is written as one.
```

```evidence:conflict
$ git merge-tree --write-tree <this branch> <the sibling branch>; echo exit=$?
exit=1
100644 ... 1  docs/ground/CARD-PREFLIGHT-v1.md      <- stage 1/2/3 == a real conflict
100644 ... 2  docs/ground/CARD-PREFLIGHT-v1.md
100644 ... 3  docs/ground/CARD-PREFLIGHT-v1.md
$ git merge --no-commit --no-ff <the sibling branch>     # the same thing done for real
Auto-merging docs/ground/CARD-PREFLIGHT-v1.md
CONFLICT (content): Merge conflict in docs/ground/CARD-PREFLIGHT-v1.md
Auto-merging scripts/cardPreflight.ts          <- clean
Auto-merging scripts/relayAudit.ts             <- clean
Automatic merge failed; fix conflicts and then commit the result.
TWO METHODS AGREE: the two SOURCES merge cleanly because the lanes touched different regions;
only the GENERATED page collides, because both branches regenerate it.
A CORRECTED NOTE ON THE INSTRUMENT, since this card is about instruments: v2 of this card
claimed the older three-argument merge-tree prints NO conflict markers and "reads as clean".
THAT WAS FALSE, and it was false because of a bad grep — the pattern searched for a doubled
plus sign against output carrying a single one. Re-measured on git 2.43.0, the old form emits
4 marker lines, all inside the generated page. BOTH forms identify this conflict correctly.
The lesson survives the correction and is sharper for it: the instrument that lied here was
the Architect's grep, not git.
```

```evidence:texts
CP-8 carries THREE texts this change falsifies, and v1 named only the first:
  1. the `basis` sentence beginning "Known limit, stated rather than discovered later"
  2. the `basis` passage "THE RULE IS UNCONDITIONAL BECAUSE THE CONDITIONAL VERSION WAS WRONG …
     so the line is not what makes a prefix dangerous"
  3. the `requirement` string: "A hex run of 7-39 characters is rejected wherever it appears"
(3) is the one that matters most: `requirement` is RENDERED into the published artifact, so
leaving it stale ships a false rule statement to the page lanes are told to read.
```

## ORDER A — the governance decision v1 forced you to make silently, now made explicitly

**A TRUNCATED SHA INSIDE AN `evidence:` FENCE IS EXEMPT FROM CP-8. That is the Architect's
ruling, and here is the reasoning, because a ruling without one is just a preference.**

An `evidence:` fence is a TRANSCRIPT — a record of what a command actually printed. CP-8 exists
because a lane copies forward a prefix it read in an INSTRUCTION and the forge then answers a
short sha with a zero count that reads identically to "nothing ran". A transcript is not an
instruction: it is the measurement itself, and abbreviating what a tool printed is not the
error CP-8 was built to catch.

**The cost is real and is not being hidden:** this removes CP-8's coverage from exactly the
place a lane most often pastes a sha. That is why ORDER B below requires the control to move
rather than disappear. The check must still be PROVEN to fire — just somewhere a lane's
instruction actually lives.

The deciding fact is that the report grammar has taken this position over the entire landed
corpus for its whole life. Two checks disagreeing about the same bytes IS the defect being
repaired; the resolution is that both take the grammar's position, not that one keeps a private
one.

### ORDER A-2 — ONE FENCE IS CARVED OUT, AND IT IS THE MOST IMPORTANT ONE

**`evidence:anchor` IS NOT EXEMPT. Every other `evidence:` fence is.**

The reasoning in ORDER A has exactly one exception, and v2 of this card missed it. An
`evidence:anchor` fence is **not a transcript — it is the instruction.** Every card in this
corpus writes `the full sha sits in the evidence:anchor fence` in its PREMISE and then orders
the lane, in ON-DISAGREEMENT, to compare its own `git ls-remote` against that value and STOP if
they differ. The lane is told to *act on* that token. That is the exact shape CP-8 was built
for, at the single most load-bearing value in every card the factory mints.

Measured, on this card's own predecessor:

```evidence:carve
truncated the anchor sha to seven characters inside the evidence:anchor fence, then:
  landed CP-8    -> [FAIL] short sha `2e1d193`      CAUGHT
  proposed CP-8  -> tokens caught outside fences: 0
                    tokens BLINDED inside evidence fences: 1
  report grammar -> also blind there, by design
Nothing would have caught it. After the exemption, no card's anchor is protected.
```

So the exempt set for CP-8 is: CLAIMS table rows, fence delimiters, and the interior of every
`evidence:` fence **whose info string is not exactly `evidence:anchor`**.

**THE MATCH IS EXACT, NOT A PREFIX.** `evidence:anchor` is carved out; `evidence:anchor-hole`
and any other longer name are ordinary evidence fences and stay exempt. A prefix match would
quietly pull in every future fence somebody names after the anchor, which is a rule that grows
by accident. This card's own `evidence:carve` fence is the worked example: it discusses the
carve-out and is itself exempt.

Name the carve-out in the code and in the rule text, so the next reader learns why one fence is
different rather than reading it as an oversight.

## ORDER B — move the control into prose, and prove BOTH arms

Replace the landed truncated-prefix scenario with a **trio**, not a pair — v2 ordered two arms
and two is not enough now that ORDER A-2 carves out a fence:

* the prefix planted in **prose**, expecting RED — the check still fires where it matters;
* the same prefix inside an ordinary `evidence:` fence, expecting GREEN — the exemption is
  reachable and deliberate rather than an accident nobody tested;
* the same prefix inside an **`evidence:anchor`** fence, expecting **RED** — the carve-out is
  real. Without this arm the carve-out is a sentence in a card rather than a property of the
  code, and the next refactor deletes it without anything going red.

**This is a widening of v1's SHARED SURFACES and it is authorized:** you may edit the clean-card
constant and the self-test scenarios for this purpose, which v1 forbade while ordering the
change that required them. A single-arm control proves nothing here; a rule that has never been
seen to fire and never been seen to abstain is untested in both directions.

## ORDER C — the anchoring and the band, unchanged from v1

Replace CP-8's hex-character lookarounds with word-boundary anchoring, and **keep its own
`{7,39}` upper bound.** The band is what lets the full 40-character sha pass, and passing it is
CP-8's entire purpose. Do not widen the band to the report grammar's, which refuses it.

## ORDER D — the seam, RATIFIED rather than re-specified

v1 ordered the exemption computation "exported and called". Measured, that function takes a
parse tree, and both the parse function and its type are also private — so v1's instruction
implied three exports and would have made the grammar's internal shape a public dependency.

**The narrow wrapper that takes a flat string and returns the exempt line set is the ORDERED
shape.** It keeps one function public instead of three and leaves the parse tree private. If you
have already built it, that is the ratified design and you need change nothing.

Note also that CP-8's predicate must become a **line-indexed scan**: the exempt set is a set of
line numbers and the current predicate matches over the whole body at once. That is a
restructure, not a regex swap, and v1 understated it.

**A PRIVATE COPY REMAINS THE DEFECT, NOT THE FIX.** Do not reimplement the exemption logic.

## ORDER E — correct ALL THREE falsified texts, then regenerate

Rewrite all three texts named in the `texts` fence — both `basis` passages and the
`requirement` string. v1 named only one and the other two would have shipped stale.

**PRESERVE THE HISTORICAL LESSON WHILE CORRECTING IT, because the two conditionalities are not
the same thing.** The rejected early draft keyed on line **semantics** — whether a line
mentioned CI, a merge, a commit — and it was wrong because a lane copies the token, not the
sentence it sat in. The exemption you are landing keys on line **structure**: is this line a
CLAIMS row, a fence delimiter, or the interior of a transcript fence. Say that distinction
plainly, or the next reader sees a reversal where there is a refinement.

**DESCRIBE ONLY THE EXEMPT REGIONS A CARD CAN ACTUALLY HAVE.** The DIFF-section arm is
inherited from the report grammar and is **inert for cards** — that rule fires only for
`kind=report`, and a card has no DIFF section. If you write "fences inside a DIFF section are
exempt" into CP-8's text you ship a sentence describing a region a card cannot have, onto the
generated page, which is exactly the stale-text failure this order exists to prevent.

Then run the artifact regeneration command and land the regenerated page in the same branch.
`requirement` and `basis` are both rendered into it. **Never hand-edit that page.**

## ORDER F — THE LANDING ORDER, because two branches collide on the generated page

The sibling branch is **`phase/self-describing-refusals-1`**, in flight against both scripts and
the generated page. Measured by trial merge: **the two sources merge CLEANLY** — the lanes
touched different regions — **and the generated artifact CONFLICTS**, because both branches
regenerate it. The conflict includes the page's own measured-at stamp, so it is guaranteed for
any two concurrent regenerations even when every rendered rule is identical.

**Whichever branch lands SECOND does this and only this:** merge master into it, re-run the
artifact regeneration command, and commit the regenerated output. **Do NOT resolve that page by
hand** — it is generated, both cards forbid hand-editing it, and a textual resolution would
produce a page matching neither generator. If the regenerated page still differs from what your
own change implies, STOP and report: that means the two changes disagree about a rule's text,
which is a real conflict and not a merge artifact.

## ORDER G — the acceptance, corrected

```acceptance
- the false-positive rate falls to ZERO over these three classes ONLY: hex-compatible ordinary
  English words, migration filenames, and content on lines the report grammar exempts
- CI RUN IDS ARE NOT IN THAT LIST. A bare run id in PROSE is still refused, deliberately —
  it is live state exactly as a sha is. v1 listed it as a false positive and its own probe
  table refused it; that was a contradiction and this is the correction
- the TRUE-positive count is reported as its own number, counted in DOCUMENTS, and is expected
  to be 80 unchanged
- the landed truncated-prefix control still goes RED in prose, and its evidence-fence twin
  goes GREEN — both arms reported
- the full 40-character sha is STILL ACCEPTED
```

Report these as numbers, not as a tick.

**The raw-hash fixture v1 demanded is DROPPED, and v2's reason for dropping it was WRONG.**
Measured on both regexes:

```hash-lengths
md5,    32 hex   landed: REFUSE   proposed: REFUSE
sha256, 64 hex   landed: pass     proposed: pass
sha,    40 hex   landed: pass     proposed: pass
```

v2 said a 64-character hash "still trips" and is therefore indistinguishable. It does not trip
at all — no 7-to-39 character substring of a longer unbroken hex run can end on a word boundary.
The fixture is dropped because **there is no raw hash that this check refuses which is not
already the truncated-sha case**, not because its verdict is ambiguous.

**The asymmetry is worth knowing and worth a line in the rule text:** a 32-character md5 IS
refused; a 64-character hash is NOT. A lane pasting a digest will meet one and not the other,
and that surprise should be documented rather than discovered.

## FALSIFIER

This card is wrong if, after it lands, either arm of the disagreement survives **in a
non-exempt region**: a card is still refused for an ordinary English word or a migration
filename, or a truncated sha is allowed through in prose. The "anywhere" of v1 is replaced by
"in a non-exempt region", because ORDER A deliberately creates exempt regions and a falsifier
that contradicts the card's own ruling cannot be run.

## SHARED SURFACES

Touch CP-8's predicate, the new exemption wrapper and its export, CP-8's three falsified texts,
the clean-card constant and the self-test scenarios named in ORDER B, the fixtures, and the
regenerated artifact. Do not change any other rule's predicate, any other exemption, or any
verdict outside CP-8.

**OUT OF BOUNDS:** the `REFUSED-CHECKS=` line on stdout. It is parsed by `scripts/mail-wait.mjs`
and pinned by the preflight's unit test.

## OWNER AUTHORIZATION — THE REFUSAL YOU WILL SEE IS EXPECTED

This card is REFUSED by the landed CP-8 on the tokens that constitute its evidence. The owner
authorized dispatch with that refusal RECORDED rather than repaired, because arming the gate
first would give the check a veto over its own repair, stripping the tokens would leave a card
ordering a change it no longer evidences, and waiting for the fix is circular. Three instruments
on these bytes: the landed check refuses, the report grammar returns OK, and the check this card
proposes returns clean. **Report that you saw the refusal, name the ids, and proceed.** The
exemption covers this card only.

## DECISION RIGHTS

The Architect decides the exemption ruling in ORDER A, the two-arm control in ORDER B, the seam
in ORDER D, and the landing order in ORDER F. The lane decides the implementation and the
fixture shapes. NOBODY makes the 80 residue documents passable, and nobody removes the prose arm
of the control.

Two repair attempts per artifact. On a second refusal, STOP, attach both refusal texts verbatim,
and escalate.

BODIES: docs/laws/ constitution and rules · CLAUDE.md · the project box · the card grammar in
scripts/cardPreflight.ts and its generated home docs/ground/CARD-PREFLIGHT-v1.md · the report
grammar in scripts/relayAudit.ts · the sibling branch named in ORDER F ·
OWNER-RULING-S122-T1-v1 decisions D-2 and D-3 · DIRECTIVES v1.1 · T1-1 · P-4 · P-5 · P-8.

fanout: personalized

Branch `phase/cp8-reconcile-1` — the branch you are already on. Push it to origin. Report to
`docs/relay/PHASE-CP8-RECONCILE-1-AG2-report.md`. Open a pull request against master so the
checks run on the request head.

TAIL ANCHOR: PHASE-CP8-RECONCILE-1-v3 ends here.
