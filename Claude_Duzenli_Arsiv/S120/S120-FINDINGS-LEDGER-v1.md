# S120 · FINDINGS LEDGER — v1 (written DURING the wave, so findings are NAMED, not discovered later)

<!-- Written WHOLE, not patched (A-REC-S101-7). This ledger stands BESIDE S119-FINDINGS-LEDGER-v3
     and does not supersede it. Every carry from S119 is printed in §0 with what moved it.
     EVERY NUMBER HERE IS A CLAIM (TOTAL-45). Where the Architect measured it himself it says so;
     where a lane measured it, the lane is named. The two are never blurred. -->

**Session:** S120 · opened 2026-08-26 ~08:31Z (11:31 TSİ) · Architect: Claude
**Anchor at open, MEASURED from a fresh clone + live DB, not from bootstrap v119:**
`origin/master` `483ac334809b2ed026d58b36278120042fffa9a7` · mode `READY` · five addresses held
**Anchor at this writing:** unchanged. Master did not move all session — nothing landed, and that
is correct rather than idle: the trunk was measured RED before anything could.

---

## 0 · CARRY-DIFF FROM S119 — what moved, and what moved it

| entry | S119 said | S120 says | what moved it |
|---|---|---|---|
| the four in-flight cards | in flight, unresolved | **ALL FOUR DELIVERED**, reports pushed 07:23–07:30Z | the lanes finished after S119 closed |
| `F-S119-A-DOCS-ONLY-DELTA-REDDENED-THE-BUILD-JOB-1` — two readings, unseparated | assertion-over-content vs nondeterminism | **SEPARATED. The assertion reading is CONFIRMED; nondeterminism REFUTED under two lenses** (169 build runs, zero shas with two conclusions, zero retries) | AG-1's diagnosis |
| the trunk's build state | `total_count=0`, neither red nor green | **RED.** The required context FAILS at an ancestor of the head; the head reports it ABSENT | AG-5's workflow-run query, confirmed independently by AG-1 |
| `F-S119-THE-REPORT-ONLY-EXCEPTION-CANNOT-RESCUE-AN-UNREADABLE-AUTHOR-1` | structural, occupant count unknown | **exactly ONE occupant today; the blocked set is exactly three and is not growing** | AG-2 ran the gate's own exported lens over every unmerged branch |
| `F-S119-THE-A2A-BUILD-DIES-AT-THE-DEPENDENCY-STEP-1` — cause unmeasured | four hypotheses standing | **CAUSE FOUND: the container VM restarted underneath the build.** Resource pressure REFUTED | AG-3 read a kernel boot banner 2.5s after the build died, containers restarting as a group with zero restart counts, and no kill line in three logs |
| the honestbench contradiction | two carriers disagree | **BOTH CARRIERS WRONG ABOUT THE SAME THING** — see F-S120-HONESTBENCH-IS-PUBLISHED-1 | AG-3 measured, the Architect independently confirmed |
| `#81`'s blocker | "a reading, not a decision" — repo and access UNMEASURED | **REPOSITORY LOCATED, REACHABLE, SPECIFICATION PRESENT, DIGEST MATCHES** | AG-2 |
| `#29 A23` — the Architect's leverage hypothesis | discovery substrate suspected, then refuted | **the real defect is named, and it is NOT the one the Architect argued** | AG-4's live instrumented run |
| the ref sweep plan | halted at one of thirty-four, plan assumed valid | **THE PLAN'S OWN ELIGIBLE LIST WAS DEFECTIVE** — see F-S120-OLD-SWEEP-PLAN-CONTRADICTS-ITS-OWN-RULE-1 | AG-5 re-measured with a second lens |

**NOTHING FROM S119 WAS DELETED.** Two entries changed class and both moves are printed above.

---

## 1 · THE SESSION'S LARGEST FINDING — a gate that reports green without asserting anything

**`F-S120-A-DOCS-ONLY-CHANGE-CONCLUDES-GREEN-WITH-ITS-TEST-STEP-SKIPPED-1`.** Measured by AG-1 from
the step lists of the green job and the red job:

```
at the GREEN head : install SKIPPED · gates SKIPPED · build SKIPPED · Run tests SKIPPED  -> job SUCCESS
at the RED   head : install success · gates success · build success · Run tests FAILURE  -> job FAILURE
```

**A documentation-only pull request switches the test step OFF and the job reports a pass having
asserted nothing.** The required context reads green, the report lands, and the trunk's push filter
then ignores documentation paths entirely so no run happens there either. **Two independent
mechanisms with the same effect, and repairing one leaves the other open.**

The consequence is not probabilistic. Debt accumulates in the trunk unasserted until the next branch
carrying any source file switches the assertion back on — and that branch goes red **for content its
author never wrote.**

**THE MECHANISM WAS THEN CAUGHT IN THE ACT, ON ITS OWN DIAGNOSIS.** AG-1's first report named THREE
orphans. The Architect measured FOUR. The extra file landed through a vacuous green *after* that
report's evidence was gathered and *before* it was written. **The report's own finding happened to
the report, while nobody was looking.** AG-1 confirmed it and refused to defend either number:
*"FOUR is true now, and my earlier report's THREE was true when it was written. Neither is defended;
both are dated."*

### 1a · The naive repair is INVERTING, and it is what the failing test itself recommends

**`F-S120-THE-ERROR-MESSAGE-RECOMMENDS-A-REPAIR-THAT-MAKES-IT-WORSE-1`.** Measured by the Architect
and confirmed by AG-1 to the file and to the rule:

```
four orphan failures  ->  add the header the assertion's own message asks for  ->  113 grammar violations
```

The header moves each file OUT of the assertion that has an escape hatch and INTO the one that has
none. **Following the error message multiplies the debt roughly fivefold.** A repair card cut without
this measurement would have been wrong, which is the whole argument for diagnosing first.

### 1b · The remedy set is SPLIT, and only half of it exists

**`F-S120-A-GOVERNED-VIOLATION-HAS-NO-BYTE-PRESERVING-ROUTE-1`.** Read by AG-1 from the test source:
the orphan assertion accepts *governed OR exempt*, so an orphan has a route that touches no bytes.
**The governed-violations assertion consults no exemption list at all.** A governed file that
violates must have its bytes changed or the trunk cannot be green. There is no third option in the
landed code.

### 1c · The freeze is a comment, not a gate

**`F-S120-THE-FROZEN-LIST-IS-FROZEN-BY-PROSE-ONLY-1`.** Two lenses, by AG-1. The shrink test refuses
a stale entry, an enrolled entry and a wildcard; an addition naming a real headerless file is none of
those. A sweep of the whole source tree finds no second assertion anywhere. The minimum-entry check
is a FLOOR, not a ceiling. **The prohibition on additions lives in a comment and in an assertion
message. Nothing landed enforces it.**

Recorded as a measurement of the code, **not as a licence.** It is precisely why the owner was asked
rather than told.

---

## 2 · `#29 A23` — THE ARCHITECT'S ARGUMENT WAS INVERTED BY MEASUREMENT

**`F-S120-THE-ASK-ASSERTS-AN-ABSENCE-THE-SYSTEM-HAD-MEASURED-AS-A-PRESENCE-1`.** AG-4, from a live
instrumented run against the real substrate, on a genuine display-name tie carrying three distinct
entity ids:

```
RESOLVER OUTCOME BY NAME    : ambiguous (three candidates)
the map that reaches the ask: unresolved
decideAsk WITH the collapse : ask
decideAsk WITHOUT           : no-ask, reason "ambiguous-only"
```

**The Architect's card argued that the binary collapse suppresses clarification. The opposite is
true: the collapse is what makes the user get asked at all.** Removing it alone would produce
silence. It is a bug presently cancelling a second bug.

**The defect that actually reaches a user is one seam further on.** When that ask fires, the rendered
text says — in the user's own language — that the token was found in **no connected source**, while
the resolver had just returned the list of entities answering to it. `proposeCandidates` has no
parameter through which the tied ids could arrive; the candidate list is structurally discarded.

> **A system that found three and says it found none is committing, in production, the exact
> confusion this project legislates against — and it is the precise axis the project authored a
> benchmark to measure.**

**Two mechanisms, separated by evidence in one execution and NOT merged.** The recorded reproduction
(a bare entity noun, empty normalization) returns before any tier runs and is **provably inert** with
respect to the collapse: both decide branches print identically for it. It is a router extraction
defect, already classified elsewhere, and it is not this.

**And the collapse is DECLARED in the source, not accidental** — the module states the narrowing,
names the consequence, and defers it to a phase that owns it. Two things in that note are corrected
by measurement: "slightly more eager than its taxonomy intends" understates it (the alternative is
silence, not a softer question), and the smallest repair does **not** require widening the shared
contract.

**ORDERING CONSTRAINT, and it is the part that can hurt:** carrying the third value through before an
ask shape exists converts a badly-worded question into silence, which is worse than today.

---

## 3 · `mcp-honestbench` — ONE NAME, TWO OBJECTS, AND A LANDED SENTENCE REFUTED

**`F-S120-HONESTBENCH-IS-PUBLISHED-1`. MEASURED BY AG-3 AND INDEPENDENTLY BY THE ARCHITECT, from two
different networks, with the same hash pins.**

```
GET <the instrument's public health path>  ->  200
{"ok":true,"fixtureSha256":"763cc42c…3aa5","dialSha256":"1954a300…a43cd",
 "activeMode":null,"profiles":{"flat":true,"gateway":true}}
```

The repository is PUBLIC. The adversary modes are **implemented code**, not a plan: four families,
five dial positions (one family split by an amendment), plus a null honesty control, with the dial
file declared the only authority over behaviour.

**TWO CARRIERS ARE REFUTED, not merely stale:** a landed lane report and the implementation order
both state the instrument *"has deliberately never been published."* It is published and answering.
A third carrier records the repository as private and names a head that has since moved.

**THE COLLISION HYPOTHESIS SURVIVED IN SHAPE AND DIED IN ITS TIDY FORM.** The name does denote two
things — a live mounted backend and a contributed benchmark — but the comfortable version, *both
carriers true, neither stale*, does not survive. AG-3 attempted the refutation first, as ordered, and
reported that it partially succeeded. **That is the card grammar working exactly as designed.**

### 3a · What is actually missing, and it is smaller and sharper than "NOT BUILT"

**`F-S120-NO-DETERMINISTIC-SCORER-EXISTS-1`**, under four independent lenses. The three scoring axes
and the per-mode pass conditions are **frozen** and may not be edited once any outcome is known.
**Freezing the rules is not the same act as writing the program that applies them, and nothing
applies them.**

> **BINDING CONSEQUENCE FOR THE IMPLEMENTATION ORDER: item A4 is DONE.** It is carried as an owner
> ruling awaiting an answer; the ruling is unnecessary because the act is complete. **The owner-side
> critical path drops from three decisions to two.** What blocks the contributed benchmark is BUILD
> WORK, and it is cardable today.

---

## 4 · `#81` — THE BLOCKER IS GONE, AND A DIFFERENT ONE APPEARED

AG-2, holding an envelope-only fence that was not breached: the document repository is located,
reachable, and — **measured, not assumed** — is the SAME tree as the session archive. The
specification is PRESENT and its digest **MATCHES** the one recorded in the design index, at five
paths. The index's chain-of-custody claim holds where it was tested.

**`F-S120-TWO-DOCUMENTS-WEAR-ONE-VERSION-NAME-1`.** A sixth path carries **different bytes** under the
same version name — ninety-five bytes longer, a different digest. **A version name does not identify
a document in that corpus.** The same shape appears again for a second design document, with the
outlier under the same project directory both times. **Two instances is a pattern to test, not a
cause**, and AG-2 declined to extend scope to test it.

**`F-S120-THE-ARCHIVE-FENCE-IS-DISCIPLINE-NOT-PERMISSION-1`.** The identity the factory reaches that
repository with holds **admin and push**. The read-only fence held because a card said so and a lane
obeyed. **A fence that exists only in prose is worth naming as one**, because the next lane will have
the same access and may not have the same card.

**`A-REC-S120-ONELENS-UNDERCOUNTED-1`** — the Architect's card claimed one in-repo carrier names the
specification. There are **two tracked carriers**, plus two more that name it without its extension.
Caught because the card labelled its own claim a single lens and ordered a second; **the claim was
under-counted, not wrong in kind.**

---

## 5 · THE REF SWEEP — THE OWNER'S HALT SAVED WORK THAT EXISTS NOWHERE ELSE

**`F-S120-OLD-SWEEP-PLAN-CONTRADICTS-ITS-OWN-RULE-1`.** The landed plan excluded two probe refs with
the reason that, being absent from master, *"they carry commits that exist nowhere else."* **It then
marked thirteen refs in exactly that state ELIGIBLE.** One of them carries thirteen commits and has
no pull request — work that exists in no other place.

> **An execution that took the old eligible list at face value would have destroyed it.** The halt
> was ordered by the owner for an unrelated reason — a refusal met mid-run — and it prevented this.
> **That is not luck being credited as judgement: it is a stop that was correct twice, and the second
> reason only became visible when somebody measured again.**

**AND IT IS A DEFECT IN THE OBJECT, NOT A DRIFT OF THE WORLD.** Master moving explains new heads; it
does not explain a rule stated in one paragraph and not applied three paragraphs above it.

**`F-S120-ONE-LENS-CANNOT-SEE-A-CHERRY-PICK-1`.** The old plan classified with ancestry alone. The
re-measure runs ancestry AND content, and they **do not always agree** — one ref disagrees across the
two lenses and is excluded rather than resolved, as its own class. A cherry-pick lands identical
content under a different sha and ancestry is blind to it.

The re-measured plan: **40 to delete, 26 excluded, 66 classified, line count equal to head count.**
Every member of both sets named. **The classifier holds four read verbs and no verb that can destroy
a ref** — the guarantee is a tool that cannot do the thing, not an operator who chose not to.

**Owner status: reading the bytes. No execution card has been cut.**

---

## 6 · A SECOND TRUNK RED NOBODY HAD NAMED

**`F-S120-SCHEDULED-WORKFLOW-JOBS-RED-AT-THE-HEAD-1`.** AG-1 read four failing jobs at the trunk head
while the landing gate's own required context was **ABSENT** there. The Architect measured which
workflows own them: a version matrix and a coverage job belong to a scheduled compatibility workflow;
the fourth is the budget fence, whose red is a KNOWN state under a standing owner ruling of *watch,
no action* — **and the stop has NOT fired**, so the standing exception does not trigger.

**The compatibility reds are unexplained and are not the landing gate.** Carded separately, with the
fence job fenced out by name and its logs forbidden.

**AG-1 named the absent context ABSENT rather than colouring it**, and named the four reds rather
than hiding them behind the silence it was actually asked about. Both are the standard this session
asked for and got.

---

## 7 · ARCHITECT ERRORS, S120 — all four caught by instruments the cards themselves ordered

**`A-REC-S120-ARGUMENT-INVERTED-1`.** The `#29` card argued that the binary collapse suppresses
clarification. Measurement showed the reverse. **The card was right in FORM — it labelled the
argument an argument, ordered refutation before confirmation, and forbade a repair — and wrong in
CONTENT.** The form is what made the wrongness cheap.

**`A-REC-S120-ONELENS-UNDERCOUNTED-1`.** §4.

**`A-REC-S120-STAMP-POSTDATED-1`.** One card's `MEASURED-AT` ran **one second** ahead of its own row.
Self-declared. The premises were genuinely read earlier, but the direction of the error is the
dangerous one: a forward stamp makes a premise look fresher than it is. **S119's diagnosis stands and
is now twice-proven: the remedy is not more care, it is that the stamp must be computed at insert.
While it is hand-typed it will recur.**

**`A-REC-S120-LANES-IDLE-WHILE-THE-ARCHITECT-BLOCKED-1`.** Five lanes sat carded-out and heartbeating
for roughly three and a half hours while the Architect waited on an owner answer. **The register was
not empty; the Architect was.** The owner's rule is that no lane idles while a doable item exists,
and blocking on one question is not an exemption from it — independent cards existed and could have
been cut first.

**`F-S120-CP8-BIT-A-CONTENT-DIGEST-1`.** The card check read a thirty-two character content digest as
a truncated commit reference and refused a true card. **Fourth measured instance of this class, and
the class is now exact: a content digest and a shortened commit reference are not distinguishable by
shape alone.** Not routed around — the literal was removed and the lane was ordered to derive it,
which is better evidence anyway.

---

## 8 · RULINGS THAT SHOULD BECOME RULES

**A DIAGNOSIS CARD EARNS ITS ROUND WHEN THE OBVIOUS REPAIR IS MEASURABLY WRONG.** The naive corpus
repair multiplies the debt fivefold. Two rounds cost one wave; the repair card would have cost the
trunk.

**AN ARCHITECT ARGUMENT GOES IN A CARD LABELLED AS AN ARGUMENT, WITH REFUTATION ORDERED FIRST.** Two
cards this session carried an Architect hypothesis. One was inverted, one was half-refuted. **Both
were caught in the same round because the card said so out loud and told the lane to attack it.**

**A CARD THAT WILL EDIT ANOTHER LANE'S ARTEFACT MUST CARRY ITS OWN LANDABILITY CONSTRAINT.** Measured
from the gate's source, not assumed: the author composition RETURNS on the subject lens when it
resolves and never consults the report lens. Without that sentence the repair branch would have been
unlandable by construction.

**CONSENT IS GIVEN TO A STRUCTURE, NEVER TO A CLAIM.** When an owner authorises changing a delivered
artefact's bytes for compliance, the authorisation covers form and never meaning. A card carrying
such consent must say so, and must order the lane to STOP rather than decide when the two cannot be
separated.

**A PLAN EXPIRES BY ITS OWN TERMS AND THE EXPIRY IS MEASURED, NOT ASSUMED.** The sweep plan expires
on master movement or census change. Master did not move; the census grew by five. **Both halves are
reported, and the delete set's validity is argued from the half that did not move — not from the
plan's age.**

**TWO INSTANCES ARE A PATTERN TO TEST, NOT A CAUSE TO REPORT.** AG-2's own phrasing, and it is the
best sentence written in this session about the difference between noticing and knowing.

---

## 9 · OWNER RULINGS, S120 — verbatim, with scope limits

**H1 · THE TRUNK REPAIR.** Chose *"Deliği kapat + 4'ü muaf et + 1'i onar"* over full retro-fit and
over prevention-only. **COVERS:** ending the vacuous skip; a dated machine-enumerated second stratum
in the frozen list with the freeze re-declared; changing the bytes of the one governed violator.
**DOES NOT COVER:** any other file, any narrowing of the grammar or the assertion, any change to a
CLAIM in the repaired artefact.

**H2 · THE SWEEP BYTES.** *"Önce ben okuyayım."* The plan document is with the owner. **No execution
card is cut and none will be until he says so.** The scope ruling from S119 — the sweep is inside the
cleanup — stands and is not reopened.

**CARRIED, UNCHANGED FROM S119:** A1 host remains open and is **not waiting on the owner's judgement**
— it waits on a runtime floor that does not exist because no build has completed. The AWS credentials
in the Architect's container remain deferred by owner instruction; not used, not probed, value never
printed.

---

## 10 · THE CARD GRAMMAR — nine cards, nine passes, four refusals repaired

Nine cards posted. **Every one ran the landed preflight in the Architect's own container before
posting, and every insert returned a body digest byte-identical to the local file.** Four were
refused on a first attempt and all four were **repaired, never routed around**: a pre-rule spelling in
a claim basis, an absence claim resting on one lens (twice), a content digest read as a short sha,
and evidence fences parsed as claim rows because they sat inside the claims section.

The seed records the prior figure: **of the Architect's last ten cards before this discipline, ZERO
passed.** The instrument was always there; it was simply never run.

<!-- END · S120-FINDINGS-LEDGER-v1 -->
