<!-- relay-audit: v1 kind=card -->
# PHASE-CP8-RECONCILE-1 · v6 — RE-MEASURED AFTER TWO LANDINGS

**READ THIS FIRST IF YOU ARE ALREADY WORKING v1.** v1 reached you before its scout window, which
was the Architect's process error, not yours. Three independent reviews then found that **two of
v1's own orders could not both be satisfied.** You appear to have found the same collision and
resolved it. Your resolution was the right one and this card RATIFIES it — you are not being
asked to revert. What follows makes the decision explicit, because it was a governance decision
that v1 forced you to make silently and no card had authorized.

## PREMISE

MEASURED: 2026-08-27T22:30Z, the collision reproduced by execution — the planted control token sits inside an `evidence:` fence and the ordered exemption blinds it; shown in the `collision` fence.
MEASURED: 2026-08-27T21:50Z, both regexes over the 302 landed relay documents AS OF THAT INSTANT; the corpus has since grown by the two landings, so re-derive rather than cite. Figures in the `corpus` fence.
MEASURED: `git ls-remote origin refs/heads/master` — the full sha sits in the `evidence:anchor` fence.
ON-DISAGREEMENT: if your own `git ls-remote` disagrees with that sha, STOP and report the value you read; do not rebase onto it and do not proceed.
DECAYS the moment `scripts/cardPreflight.ts` or `scripts/relayAudit.ts` lands. IT HAS ALREADY DECAYED ONCE: both sibling branches landed while this card was being written, which is what added texts 4 and 5 — see ORDER F.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| master is the sha this card was written against | MEASURED: git ls-remote origin refs/heads/master | anchor |
| the control token the old ORDER E protected sits INSIDE an evidence fence, so the ordered exemption blinds it | MEASURED: located the token's line in the clean-card constant and checked it against the grammar's exempt-line set | collision |
| the landed refusal rate decomposes into a false-positive part and a true-positive part | MEASURED: three regex variants over all 302 documents in docs/relay | corpus |
| the residue is overwhelmingly truncated shas at DOCUMENT level, but not every residue token is one | MEASURED: token-level count over the residue documents | corpus |
| CP-8's `requirement` text is ALSO falsified by this change, not only its `basis` | MEASURED: read of the requirement string in scripts/cardPreflight.ts | texts |
| the sibling branch regenerated the published artifact and conflicted there before it landed | MEASURED: trial merge of the two branch heads, run while both were unlanded | conflict |
| whether the corpus true-positive DOCUMENT count stays at 80 after the change | NOT-READ | it cannot be read before the change; ORDER D orders it measured |

```evidence:anchor
$ git ls-remote origin refs/heads/master
1e5d5cf4ed02406d46b3ecedb7c1cb6c53947fd2
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
SUPERSEDED BY ORDER A-2: that fence is ANCHORED, so under the ruling it is scanned and the
scenario goes RED again on its own. The collision dissolved. This fence is kept because it is
still why the card exists, not because it still describes the ordered behaviour.
```

```evidence:corpus
three variants over all 302 documents under docs/relay:
  CP-8 as landed                       refuses 271/302   89.7%
  + word-boundary anchoring            refuses 261/302   86.4%
  + the report grammar's exemption set refuses  80/302   26.5%
The residue tokens themselves are shown in the UNANCHORED `illustration` fence below, not
here — see ORDER A-3 for why that placement is this card obeying its own ruling.
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
6 marker lines (two hunks x three markers), all inside the generated page. BOTH forms identify this conflict correctly.
The lesson survives the correction and is sharper for it: the instrument that lied here was
the Architect's grep, not git.
```

```evidence:illustration
An evidence fence so the report grammar exempts it, and NOT anchored by any CLAIMS row, deliberately — see ORDER A-3.
Re-derive with the command named in the corpus fence rather than trusting these:
  PHASE-FAULT-SWITCH-0-report.md:11  **commit** `8287599` ... **anchored at** `b2d6c55`  <- residue
  PHASE-STAGE-BENCH-1-report.md:3    carries a FULL 40-hex and is NOT residue — the check
                                     accepting it is the behaviour being preserved
  PHASE-STAGE-BENCH-1-report.md:4    `fe06ed6…` — THIS is that file's residue
```

```evidence:texts
CP-8 carries FIVE texts this change falsifies. v1 named one; v5 named three; a SIBLING CARD
LANDED WHILE THIS ONE WAS IN FLIGHT and added the last two:
  1. the `basis` sentence beginning "Known limit, stated rather than discovered later"
  2. the `basis` passage "THE RULE IS UNCONDITIONAL BECAUSE THE CONDITIONAL VERSION WAS WRONG …
     so the line is not what makes a prefix dangerous"
  3. the `requirement` string: "A hex run of 7–39 characters is rejected wherever it appears" — EN DASH in the source; grepping a hyphen returns nothing
  4. `rule`      — "Write every commit reference as the full forty hex characters."
  5. `expected`  — "THERE IS NO CONFORMING SHORT FORM — a prefix is ambiguous by construction,
                    so the accepted alternative is the whole value or none of it …"
ALL FIVE ARE RENDERED to the published page: the generator emits Required, Rule, Accepted form
and Basis. Leaving any of them stale ships a false rule statement to the page lanes are told
to read.
(5) IS THE SERIOUS ONE AND IT CONTRADICTS THIS CARD DIRECTLY. `expected` is the text a REFUSED
LANE ACTUALLY READS, and it says no conforming short form exists. ORDER A-3 says one does: an
UNANCHORED evidence fence. Ship `expected` unchanged and every future refusal teaches the
opposite of the discipline this card is landing.
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
repaired.

**AND THE RESOLUTION IS NOT "MAKE THEM IDENTICAL" — ORDER A-2 MAKES THEM DIVERGE IN EXACTLY ONE
RESPECT, DELIBERATELY.** CP-8 adopts the grammar's anchoring and its exempt set, and then
subtracts anchored fences, which the grammar does not. That is a governed divergence with a
stated reason: a card is an instruction about to be executed, a landed report is a record. Say
this in the rule text. An earlier draft of this card claimed both checks would take the same
position; that is no longer true and must not be rendered onto the generated page.

### ORDER A-2 — THE CARVE-OUT IS STRUCTURAL, AND THE OWNER RULED IT

**A FENCE IS NOT EXEMPT FROM CP-8 IF A CLAIMS ROW ANCHORS TO IT. Every other fence is exempt.**

Owner ruling, 2026-08-28, on a P-4 escalation. v3 carved out the single name `evidence:anchor`
and that was wrong — not by prefix-versus-exact, but because it keyed on a NAME while the
property is a ROLE, and this corpus does not use one name for that role.

```evidence:census
fence names carrying an operative sha, counted over docs/relay. THE SIX PER-NAME COUNTS ARE
ILLUSTRATIVE and differ by a few depending on how 'carrying an operative sha' is matched;
re-derive rather than cite them. The DECIDING measurement is the grep below, and it is exact:
  evidence:precondition  35 files      evidence:base   12 files
  evidence:anchor        24 files      evidence:head    3 files
  evidence:floor         21 files      evidence:master  0 files
$ grep -c 'evidence:anchor' scripts/cardPreflight.ts
0
THE DECIDING MEASUREMENT: the repository's own canonical specimen -- the clean-card constant
the self-test is built from -- has NO evidence:anchor fence at all. Its operative sha lives in
evidence:floor, under its own ON-DISAGREEMENT clause. A name-keyed carve-out would have left
the specimen blind, and the third control arm would have passed while the hole stayed open.
```

**Why structural is the ruling and not a longer list of names.** The grammar ALREADY computes
this mapping — its anchor rule refuses a CLAIMS row naming a fence that does not exist — so the
parse already knows which fences a card depends on. A fence a card points at from its CLAIMS
table is, by construction, a fence the card asks the lane to rely on; a transcript nobody
anchors is a transcript. **The rule maintains itself:** a lane coining a new fence name next
month is covered without anyone editing a list. A name list goes stale the first time someone
coins a sixth name, which is exactly how this hole was born.

**THE COST, NAMED RATHER THAN HIDDEN — and it changes how you write reports.** An anchored
fence is SCANNED. So a refusal transcript that echoes a short sha, pasted into an *anchored*
fence, is refused. The discipline that follows is coherent but must be taught, and this card is
where it starts:

```discipline
- a TRANSCRIPT goes in an UNANCHORED fence          -> exempt, paste freely
- a value the card asks the lane to ACT ON goes in an ANCHORED fence -> scanned, must be full
```

The grammar already permits unanchored fences, so nothing new is needed to obey this. Write it
into CP-8's rule text so the next lane reads it instead of tripping it.

### ORDER A-3 — WHERE EVIDENCE THAT IS ITSELF A SHORT SHA GOES

The ruling creates a class nobody had to think about before, and this card is the first member
of it: **a card whose evidence IS truncated shas.** Anchor that evidence and it is scanned and
refused; leave it unanchored and the CLAIMS row has nothing to point at.

**The resolution, and it is general:** anchor the claim to the **reproducible command and its
counts**, and show the raw tokens in an UNANCHORED illustration fence beside it. The basis of
such a claim is the command, not the sample — a reader who doubts it re-runs the command rather
than trusting pasted characters. This card does exactly that: `evidence:corpus` is anchored and
carries only counts; the tokens sit in `evidence:illustration`, which no CLAIMS row names — an evidence fence,
so the report grammar exempts it, and unanchored, so the repaired card rule exempts it too.

Write this into CP-8's rewritten text. Without it the next author meets a wall with no posted
way around it, and the way around it is not a loophole — it is better evidence discipline.

## ORDER B — move the control into prose, and prove BOTH arms

Replace the landed truncated-prefix scenario with a **trio**, not a pair — v2 ordered two arms
and two is not enough now that ORDER A-2 makes anchored fences non-exempt:

* the prefix planted in **prose**, expecting RED — the check still fires where it matters;
* the same prefix inside an ordinary `evidence:` fence, expecting GREEN — the exemption is
  reachable and deliberate rather than an accident nobody tested;
* the same prefix inside **the specimen's own anchored fence** — the one its CLAIMS table
  points at, which today is `evidence:floor` and is NOT named `anchor` — expecting **RED**.
  **Plant it where the specimen actually keeps its sha, not in a fence you added to make the
  arm pass** — this warning binds THIS arm only. A third arm that only fires on a
  freshly-created fence proves the wrong thing: it would go red while the specimen stayed
  blind, which is precisely the failure v3 shipped.

**TWO THINGS ABOUT THESE ARMS THAT THE EARLIER DRAFTS GOT BACKWARDS.** First, arm 3 is a
**REINSTATEMENT, not a replacement**: the specimen's fence is anchored, so under ORDER A-2 the
ORIGINAL landed scenario goes RED again, unchanged. v1's whole ORDER B/ORDER E collision
dissolves — you are restoring a control, not overriding one. Second, arm 2 has **no site in the
specimen**, because its only evidence fence is anchored; you must ADD an unanchored fence for
it, and that addition is authorized.

**This is a widening of v1's SHARED SURFACES and it is authorized:** you may edit the clean-card
constant and the self-test scenarios for this purpose, which v1 forbade while ordering the
change that required them. A single-arm control proves nothing here; a rule that has never been
seen to fire and never been seen to abstain is untested in both directions.

## ORDER C — the anchoring and the band, unchanged from v1

Replace CP-8's hex-character lookarounds with word-boundary anchoring, and **keep its own
`{7,39}` upper bound.** The band is what lets the full 40-character sha pass, and passing it is
CP-8's entire purpose. Do not widen the band to the report grammar's, which refuses it.

## ORDER D — the seam: its SHAPE is ratified, its CONTENTS must change

v3 ratified a flat-string wrapper over the report grammar's exempt-line computation. **That
wrapper cannot carry the owner's ruling, and a wrapper already built to it MUST change.**
Measured, and this is the blocking fact:

```evidence:seam
Parsed exposes `evidenceAnchors` — commented in the source as "Anchor ids DECLARED BY
    evidence-colon-id fences" (spelled out rather than quoted literally: a backtick fence
    marker at column zero inside a fence closes it, which is how an earlier draft of this
    very card broke its own section structure). That is the SUPPLY side: which fences exist.
The ruling needs the DEMAND side: which anchors CLAIMS ROWS REFERENCE. That set is computed
transiently inside the claims audit and DISCARDED — only violations survive it. Nothing
exports it.
Consequence, run against the branch's existing wrapper: the specimen's sha line, inside its
ANCHORED evidence fence, reports exempt = TRUE. ORDER B's third arm plants exactly there and
expects RED. Through the ratified seam it is GREEN, so the arm is unsatisfiable and the hole
the owner closed would ship.
```

**THE ORDERED SHAPE — two NAMED exports, not one function with a flag.**

* factor a private `anchoredFenceIds(parsed)` out of the claims audit, and have **both** the
  claims audit and the new export call it, so there remains ONE vocabulary for "which fences
  does this card depend on";
* keep `tripwireExemptLinesForText(text)` returning **exactly what it returns today**;
* add a second, separately named export — `cardExemptLinesForText(text)` — returning the same
  set MINUS the interiors of anchored evidence fences. CP-8 calls this one.

**WHY TWO NAMES AND NOT AN OPTIONS FLAG.** A flag whose default must preserve today's behaviour
is one wrong call site away from moving the report grammar's verdicts, and the blast radius is
measured, not imagined:

```evidence:blast
scanning anchored evidence-fence interiors across the landed corpus:
  MEASURED, and ILLUSTRATIVE rather than exact: roughly 170 of the ~300 landed reports
  carry a word-bounded 7-to-39 hex run inside an ANCHORED evidence fence. Two independent
  measurements gave 171/303 and 162/304, differing only in how each extracted the anchor id
  from a CLAIMS row. Re-derive with your own lens and NAME it; the conclusion is invariant
  under both and that is what matters here.
If the anchored-fence exception went into the SHARED function, that is how many landed reports
would newly red. Two separately named exports make the divergence visible at every call site;
a defaulted flag hides it behind one argument.
```

**THE EXCEPTION LIVES IN CP-8's LAYER ONLY.** `R-TRIP-HEX` and every other report rule keep
today's set and today's verdicts. Prove it: the report grammar's own self-test and the landed
fixture corpus must produce byte-identical verdicts before and after your change, and you must
report that they did.

**A PRIVATE COPY IS STILL THE DEFECT — and this is not one.** Reimplementing the claim-row walk
inside the preflight WOULD be a second vocabulary and remains forbidden. Factoring the walk out
in the grammar and calling it from both places is the opposite: it makes the single vocabulary
explicit. That distinction is the whole of this order.

**FAIL-OPEN, STATED RATHER THAN DISCOVERED:** a body with no CLAIMS section yields an empty
anchored set, so every fence is exempt and CP-8 goes blind inside fences. That always co-occurs
with the missing-CLAIMS refusal, so it is acceptable — but say it in the rule text.

## ORDER E — correct ALL FIVE falsified texts, then regenerate

Rewrite all FIVE texts named in the `texts` fence — both `basis` passages, `requirement`,
`rule`, and `expected`. Earlier versions of this card named one, then three; the last two
arrived when a sibling card landed mid-flight, which is the re-certification tax showing up
inside a card's own premise rather than in a merge.

**`expected` GETS THE MOST CARE, BECAUSE IT IS WHERE A REFUSED LANE MEETS THIS RULE.** It
currently states that no conforming short form exists. After ORDER A-3 that is false: a raw
short sha has a conforming placement — an UNANCHORED evidence fence, with the claim anchored
to the reproducible command and its counts. Rewrite `expected` to carry that route, so a lane
that trips CP-8 is told where its evidence may legitimately go instead of being told there is
nowhere. A refusal that names no accepted form is the exact defect the sibling card landed to
remove; do not let this one re-create it in the same field.

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
All five texts are rendered into it. **Never hand-edit that page.**

## ORDER F — THE LANDING ORDER, because two branches collide on the generated page

The sibling branch was **`phase/self-describing-refusals-1`**, and it has **ALREADY LANDED** —
so your branch IS stale against master right now. That is expected, not a fault, and step 2 of
the landing script is where it gets fixed. You are the branch that lands SECOND, so the
paragraph below is addressed to you and not hypothetical. Measured by trial merge: **the two sources merge CLEANLY** — the lanes
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
- ALL THREE control arms are reported, not two: the truncated prefix goes RED in prose, its
  UNANCHORED evidence-fence twin goes GREEN, and the prefix planted in the specimen's own
  ANCHORED fence goes RED. The third is the one that proves the owner's structural ruling
  landed as code rather than as a sentence
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

Touch CP-8's predicate, the new exemption wrapper and its export, CP-8's five falsified texts,
the clean-card constant and the self-test scenarios named in ORDER B, the fixtures, and the
regenerated artifact. Do not change any other rule's predicate, any other exemption, or any
verdict outside CP-8.

**OUT OF BOUNDS:** the `REFUSED-CHECKS=` line on stdout. It is parsed by `scripts/mail-wait.mjs`
and pinned by the preflight's unit test.

## OWNER AUTHORIZATION — THE REFUSAL YOU WILL SEE IS EXPECTED

This card is REFUSED by the landed CP-8 on the tokens that constitute its evidence. The owner
authorized dispatch with that refusal RECORDED rather than repaired, because arming the gate
first would give the check a veto over its own repair, stripping the tokens would leave a card
ordering a change it no longer evidences, and waiting for the fix is circular. **A CORRECTION THE RULING FORCED, AND IT MATTERS.** v2 and v3 of this card claimed all three
instruments read: landed check refuses, report grammar OK, proposed check CLEAN. That third
reading was true then and would have become FALSE under ORDER A-2, because this card's own
evidence fence was anchored and would therefore be scanned. ORDER A-3 is the fix, and it is the
card obeying its own ruling rather than being exempted from it: the counts stay in the anchored
fence, the raw tokens moved to an unanchored illustration fence. **Verify the third reading
yourself rather than trusting this paragraph** — that is the whole point of the exercise.

**Report that you saw the landed refusal, name the ids, and proceed.** The authorization covers
this card only.

## DECISION RIGHTS

The Architect decides the exemption ruling in ORDER A, the three-arm control in ORDER B, the seam
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

TAIL ANCHOR: PHASE-CP8-RECONCILE-1-v6 ends here.
