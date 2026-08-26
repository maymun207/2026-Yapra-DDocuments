# S120 · FINDINGS LEDGER — v2 (written DURING the wave, so findings are NAMED, not discovered later)

<!-- SUPERSEDES v1 (S37-1). Written WHOLE, not patched (A-REC-S101-7). Every v1 entry is carried;
     §0a prints what MOVED. v2 exists because a second card wave delivered five more reports, the
     trunk repair was built and INDEPENDENTLY VERIFIED BY THE ARCHITECT, and the factory then went
     silent on three surfaces at once — an event that must be recorded while it is being measured
     rather than reconstructed afterwards.
     EVERY NUMBER HERE IS A CLAIM (TOTAL-45). Where the Architect measured it himself it says so;
     where a lane measured it, the lane is named. The two are never blurred. -->

**Session:** S120 · opened 2026-08-26 ~08:31Z (11:31 TSİ) · Architect: Claude
**Anchor at open, MEASURED from a fresh clone + live DB, not from bootstrap v119:**
`origin/master` `483ac334809b2ed026d58b36278120042fffa9a7` · mode `READY` · five addresses held
**Anchor at this writing:** UNCHANGED, all session. Nothing landed. That is correct rather than
idle: the trunk was measured RED before anything could land, and the repair that clears it is built,
verified, and waiting on one named spend approval.

---

## 0 · WHAT THIS SESSION ACTUALLY DID, IN ONE PARAGRAPH

Ten cards were posted across two waves; all ten passed the landed preflight in the Architect's own
container before posting and all ten inserted byte-identical to their local file. Ten reports came
back. **Four Architect claims were overturned by measurement and every one of them was overturned by
an instrument the card itself ordered.** The trunk's red was traced to a single cause, the same cause
was then measured to be reddening a second workflow, and one repair closes both. Three items the
project believed were blocked turned out not to be. The factory then went quiet on three surfaces
inside one minute, and that silence is UNMEASURED rather than diagnosed.

## 0a · CARRY-DIFF FROM v1 — what moved inside this session

| entry | v1 said | v2 says | what moved it |
|---|---|---|---|
| the trunk repair | ruled by the owner, not yet built | **BUILT, and VERIFIED BY THE ARCHITECT'S OWN AUDIT** — see §1d | AG-1 delivered; the Architect re-ran the landed auditor at the branch head |
| `F-S120-SCHEDULED-WORKFLOW-JOBS-RED-AT-THE-HEAD-1` — cause unmeasured | three jobs red, cause unknown | **SAME CAUSE AS THE TRUNK RED.** One defect, three jobs, one night old, and it gates nothing | AG-5 read all three failed logs |
| the honestbench frozen rules | assumed reachable | **NOT ON THE LIVE BUS**, under two lenses | AG-3's address-scoped read plus the Architect's unscoped read of the whole table |
| the design-corpus collision | two instances, class unsized | **2 of 8, and the outlier directory is NOT systematically bad** | AG-2 digested all eight |
| the `#29` ask design | ruled: it should ask and name what it found | **the tied rows are identical in every field a user can read except the parent** — which decides the whole design | AG-4's live probe |
| factory liveness | five lanes alive, heartbeats seconds old | **THREE SURFACES SILENT SINCE ~13:26Z** — UNMEASURED, not dead | §7 |

**NOTHING IN v1 WAS DELETED.**

---

## 1 · THE TRUNK — one cause, two reds, and a repair that touched no meaning

### 1a · A gate that reports green without asserting anything

**`F-S120-A-DOCS-ONLY-CHANGE-CONCLUDES-GREEN-WITH-ITS-TEST-STEP-SKIPPED-1`.** Measured by AG-1 from
the step lists of the green job and the red job:

```
at the GREEN head : install SKIPPED · gates SKIPPED · build SKIPPED · Run tests SKIPPED  -> job SUCCESS
at the RED   head : install success · gates success · build success · Run tests FAILURE  -> job FAILURE
```

**A documentation-only pull request switches the test step OFF and the job reports a pass having
asserted nothing.** The trunk's push filter then ignores documentation paths entirely, so no run
happens there either. **Two independent mechanisms, same effect; repairing one leaves the other
open.** Debt accumulates unasserted until the next branch carrying a source file switches the
assertion back on — and that branch goes red **for content its author never wrote.**

**THE MECHANISM WAS CAUGHT IN THE ACT, ON ITS OWN DIAGNOSIS.** AG-1's first report named THREE
orphans; the Architect measured FOUR. The fourth landed through a vacuous green *after* that report's
evidence was gathered and *before* it was written. AG-1 confirmed it and refused to defend either
number: *"FOUR is true now, and my earlier report's THREE was true when it was written. Neither is
defended; both are dated."*

### 1b · The error message recommends a repair that makes it worse

**`F-S120-THE-ERROR-MESSAGE-RECOMMENDS-A-REPAIR-THAT-MAKES-IT-WORSE-1`.** Measured by the Architect,
confirmed by AG-1 to the file and to the rule: adding the header the assertion's own message asks for
turns four orphan failures into **one hundred and thirteen** grammar violations, because it moves each
file out of the assertion that has an escape hatch and into the one that has none. **Following the
error message multiplies the debt roughly fivefold.**

### 1c · The remedy set is SPLIT, and the freeze is prose

**`F-S120-A-GOVERNED-VIOLATION-HAS-NO-BYTE-PRESERVING-ROUTE-1`.** The orphan assertion accepts
*governed OR exempt*; the governed-violations assertion consults no exemption list at all. A governed
file that violates must have its bytes changed. There is no third option in the landed code.

**`F-S120-THE-FROZEN-LIST-IS-FROZEN-BY-PROSE-ONLY-1`.** Two lenses, by AG-1: the shrink test refuses a
stale entry, an enrolled entry and a wildcard, and an addition naming a real headerless file is none
of those; a sweep of the whole source tree finds no second assertion. The minimum-entry check is a
FLOOR, not a ceiling. **Recorded as a measurement of the code, NOT as a licence** — it is exactly why
the owner was asked rather than told.

### 1d · The repair, and how it changed nothing anyone said

**`F-S120-A-FENCE-AROUND-A-SENTENCE-IS-NOT-AN-EDIT-OF-IT-1`.** The grammar forbids a bare commit token
*outside* the CLAIMS table and the evidence fences. AG-1 did not move sixteen sentences into a table —
**it wrapped them, where they stood, in `evidence:` fences**, then added a CLAIMS table whose rows
point at those fences and whose banner says every row *"restates a claim this report ALREADY makes,
with the basis this report ALREADY states."* Where the original names no command, the basis is
`RELAYED` — **it refused to invent a lens the author never ran.**

**ARCHITECT'S OWN VERIFICATION, run in his own container against the branch head — not the lane's
declaration:**

```
ORPHANS                    : 0
GOVERNED WITH VIOLATIONS   : 0
stale exemption entries    : 0
enrolled exemption entries : 0
wildcard                   : none

git diff --numstat  (insertions / DELETIONS)
  101  0   .github/workflows/relay-corpus.yml
  415  0   docs/relay/PHASE-TRUNK-GREEN-REPAIR-1-AG1-report.md
   47  0   docs/relay/RELAY-AUDIT-EXEMPT-HISTORY-v1.txt
   49  0   docs/relay/S118-FINAL-CLOSING-1-AG5-report.md
```

**ZERO DELETIONS IN ALL FOUR FILES.** The owner's condition was that not one CLAIM may change; a
sentence's meaning cannot be changed by adding lines around it while removing nothing. **The condition
is satisfied at byte level, not by declaration.** Exactly four paths were added to the exemption list
and they are exactly the four measured orphans.

**Part (a) — the hole — was closed by a NEW workflow rather than by narrowing the old one**, and the
rejection is a measurement rather than a preference: a landed test pins the ignore list to the deploy
skip's own roster, so narrowing it would either red that test or move the deploy plane too, making
every documentation push pay for a production deploy. **The new job fired on the pull request and
reported success**, so it is valid to the platform, its trigger matches, and it runs in CI and not
only on one machine.

### 1e · The same defect was reddening a second workflow

**`F-S120-THREE-JOBS-ONE-CAUSE-1`.** AG-5 read all three failed logs: the two version-matrix jobs and
the coverage job fail on **the same two assertions in the same test file**, byte-for-byte. **One
defect, three jobs.** The streak is **one night** — the last success was the morning before, so the
corpus debt became fatal exactly when the fourth orphan landed.

**They gate nothing:** master carries no classic branch protection, and the active ruleset's only
required status check is the build context. **Measured from the ruleset surface, not inferred from
the fact that they are scheduled.**

**`F-S120-THE-COVERAGE-FLOOR-WAS-NEVER-EVALUATED-1`.** The suite exited non-zero before the ratchet
was read. **No coverage figure was produced by that run and none is asserted.** A red coverage job
that never measured coverage is not a coverage finding.

---

## 2 · `#29 A23` — THE ARCHITECT'S ARGUMENT WAS INVERTED, AND THE REAL DEFECT IS WORSE

**`F-S120-THE-ASK-ASSERTS-AN-ABSENCE-THE-SYSTEM-HAD-MEASURED-AS-A-PRESENCE-1`.** AG-4, from a live
instrumented run on a genuine tie carrying three distinct entity ids:

```
RESOLVER OUTCOME BY NAME    : ambiguous (three candidates)
the map that reaches the ask: unresolved
decideAsk WITH the collapse : ask
decideAsk WITHOUT           : no-ask, reason "ambiguous-only"
```

**The Architect argued the collapse suppresses clarification. The opposite is true: the collapse is
what makes the user get asked at all.** Removing it alone produces silence. It is a bug presently
cancelling a second bug.

**The defect that reaches a user is one seam further on.** The rendered text says the token was found
in **no connected source**, while the resolver had just returned the entities answering to it.
`proposeCandidates` has no parameter through which the tied ids could arrive.

> **A system that found three and says it found none is committing, in production, the exact confusion
> this project legislates against — and it is the precise axis the project authored a benchmark to
> measure.**

**Two mechanisms, separated by evidence in one execution and NOT merged.** The recorded reproduction —
a bare entity noun, empty normalization — returns before any tier runs and is **provably inert** with
respect to the collapse: both decide branches print identically for it.

**`F-S120-THE-TIED-ROWS-DIFFER-ONLY-BY-PARENT-1`, and it decides the design.** AG-4 measured that the
tied rows are byte-identical in every field a user could read — same display name, same attributes,
same description — and differ **only in the parent they hang from**. So an ask offering the name
offers three identical lines. **And the parent is dropped in the clarify stage's own candidate map.**
The parent display names are distinct, so the parent CAN disambiguate; nothing carries it.

**ORDERING CONSTRAINT:** carrying the third value through before an ask shape exists converts a
badly-worded question into silence, which is worse than today. AG-4 was ordered to convert that
constraint from prose into something a gate can check — *a constraint that lives only in a report is
one that will be violated by whoever does not read the report.*

---

## 3 · `mcp-honestbench` — PUBLISHED, AND TWO CARRIERS REFUTED

**`F-S120-HONESTBENCH-IS-PUBLISHED-1`. MEASURED BY AG-3 AND INDEPENDENTLY BY THE ARCHITECT, from two
different networks, with the same hash pins.** The endpoint answers with the instrument's own payload:
both configuration hash pins, the honesty control active, two profiles. The repository is PUBLIC. The
adversary modes are **implemented code** — four families, five dial positions, plus a null control,
with the dial file declared the only authority over behaviour.

**TWO CARRIERS ARE REFUTED, not merely stale:** a landed lane report and the implementation order both
state the instrument *"has deliberately never been published."* A third records the repository as
private and names a head that has since moved.

**THE COLLISION HYPOTHESIS SURVIVED IN SHAPE AND DIED IN ITS TIDY FORM.** AG-3 attempted the refutation
first, as ordered, and reported that it partially succeeded — the name does denote two things, but the
comfortable version, *both carriers true, neither stale*, does not survive.

**`F-S120-NO-DETERMINISTIC-SCORER-EXISTS-1`**, under four independent lenses. **Freezing the rules is
not the same act as writing the program that applies them, and nothing applies them.**

> **BINDING CONSEQUENCE: implementation-order item A4 is DONE.** It is carried as an owner ruling
> awaiting an answer; the ruling is unnecessary because the act is complete. **The owner-side critical
> path drops from three decisions to two.** What blocks the contributed benchmark is BUILD WORK.

**`F-S120-THE-FROZEN-PASS-CONDITIONS-ARE-NOT-ON-THE-LIVE-BUS-1`.** Two lenses: AG-3's address-scoped
read returned no matching card, and the Architect's **unscoped** read of the entire relay table
returned only the two cards written this session. The conditions live in a phase brief and an
amendment that are **cards, not files**, addressed to a lane that no longer exists on this bus.
**AG-3 refused to read another address's mailbox to obtain them, which was correct** — and the
Architect, who may read the whole table, found they are not there either.

---

## 4 · `#81` AND THE DESIGN CORPUS — the blocker is gone, and two ambiguity classes appeared

AG-2, holding an envelope-only fence that was not breached: the document repository is located,
reachable, and — **measured, not assumed** — is the SAME tree as the session archive.

**All eight owner-held documents are PRESENT, and every one has a blob whose digest MATCHES its index
row.** No document is missing and no document is *only* wrong.

**`F-S120-TWO-DOCUMENTS-WEAR-ONE-VERSION-NAME-1`.** The collision class is **2 of 8** — not one, not
all. **A version name does not identify a document in that corpus.**

**`F-S120-THE-OUTLIER-DIRECTORY-IS-NOT-THE-CAUSE-1`.** The odd blob sits under the same project
directory both times — but that directory also holds five *matching* copies. **Naming it as the cause
would be wrong**, and AG-2 said so rather than reporting the tidy pattern.

**`F-S120-A-SECOND-AMBIGUITY-CLASS-POINTS-THE-OTHER-WAY-1`.** One blob wearing two different version
names. The index cannot see that one either, and it is the inverse of the first.

**`F-S120-THE-ARCHIVE-FENCE-IS-DISCIPLINE-NOT-PERMISSION-1`.** The identity the factory reaches that
repository with holds **admin and push**. The read-only fence held because a card said so and a lane
obeyed. **A fence that exists only in prose is worth naming as one.**

---

## 5 · THE REF SWEEP — THE OWNER'S HALT SAVED WORK THAT EXISTS NOWHERE ELSE

**`F-S120-OLD-SWEEP-PLAN-CONTRADICTS-ITS-OWN-RULE-1`.** The landed plan excluded two probe refs
because, being absent from master, *"they carry commits that exist nowhere else."* **It then marked
thirteen refs in exactly that state ELIGIBLE**, one of them carrying thirteen commits with no pull
request.

> **An execution that took the old eligible list at face value would have destroyed it.** The halt was
> ordered for an unrelated reason — a refusal met mid-run — and it prevented this. **A stop that was
> correct twice, whose second reason only became visible when somebody measured again.**

**It is a defect in the OBJECT, not a drift of the world.** Master moving explains new heads; it does
not explain a rule stated in one paragraph and not applied three paragraphs above it.

**`F-S120-ONE-LENS-CANNOT-SEE-A-CHERRY-PICK-1`.** The old plan classified with ancestry alone. The
re-measure runs ancestry AND content and they do not always agree; one ref disagrees and is excluded
as its own class rather than resolved.

The re-measured plan: **40 to delete, 26 excluded, 66 classified, line count equal to head count**,
every member named. **The classifier holds four read verbs and no verb that can destroy a ref.**

**Owner status: reading the bytes. No execution card cut.** The census has since grown to seventy-six
heads while master did not move — so the delete set's classification is untouched and the plan's total
is stale. **Both halves reported.**

---

## 6 · ARCHITECT ERRORS, S120 — all caught by instruments the cards themselves ordered

**`A-REC-S120-ARGUMENT-INVERTED-1`.** The `#29` card's argument was reversed by measurement. **The card
was right in FORM — it labelled the argument an argument, ordered refutation first, forbade a repair —
and wrong in CONTENT. The form is what made the wrongness cheap.**

**`A-REC-S120-ONELENS-UNDERCOUNTED-1`.** A card claimed one in-repo carrier named a document; there are
two tracked, plus two more without the extension. Caught because the card labelled its own claim a
single lens and ordered a second.

**`A-REC-S120-STAMP-POSTDATED-1`.** One card's stamp ran **one second** ahead of its own row.
Self-declared. **The remedy is not more care; it is that the stamp must be computed at insert.**

**`A-REC-S120-LANES-IDLE-WHILE-THE-ARCHITECT-BLOCKED-1`.** Five lanes sat carded-out and heartbeating
for roughly three and a half hours while the Architect blocked on an owner question. **The register was
not empty; the Architect was.** Corrected in the second wave: the next owner question was asked in
prose without blocking, and a card was cut for a free lane in the same turn.

**`F-S120-CP8-BIT-A-CONTENT-DIGEST-1`.** The card check read a thirty-two character content digest as a
truncated commit reference and refused a true card. **Fourth measured instance; the class is now exact.**
Not routed around — the literal was removed and derivation ordered instead.

---

## 7 · THE FACTORY WENT SILENT — recorded while being measured, not reconstructed

**`F-S120-THREE-LIVENESS-SURFACES-WENT-QUIET-INSIDE-ONE-MINUTE-1`.**

```
heartbeat : all five lanes, last write 13:26:27Z .. 13:27:26Z   (a 59-second window)
refs      : last push 13:17Z
bus       : a card inserted 13:26:29Z, UNCONSUMED 20 minutes later
```

Every card earlier in the session was consumed within two to fourteen minutes.

**NEGATIVE CONTROL, AND IT MATTERS:** the Architect's own reads work. The database answers and git
answers. **The failing side is the lanes', not the instrument's.**

**THE VERDICT IS `UNMEASURED`, AND IT IS THE ONLY HONEST ONE.** Four states exist — BUSY, STOPPED,
LOOP-STOPPED, HUNG — and from this container none can be distinguished from the others. **The last two
are visible only from the owner's screen.** A positive-only lens proves life at an instant and never
proves death; three silent surfaces are a strong signal and are still not a proof.

**A TIMING COINCIDENCE, STATED IN BOTH DIRECTIONS BECAUSE ONLY ONE DIRECTION WOULD BE DISHONEST.** The
silence begins within seconds of the Architect's last card insert. The heartbeat period is roughly
sixty seconds, so the true stopping moment lies inside a window that CONTAINS that insert. **Ordering
cannot exonerate it and cannot convict it. The coincidence is recorded; no cause is claimed.**

**NOTHING WAS SWEPT, NOTHING WAS HAND-WRITTEN, NO ADDRESS WAS RELEASED**, and none will be before a
real-world witness. S118 recorded what hand-written state rows cost, and that record is why this one
says only what it measured.

**NO WORK IS LOST.** All five reports of the second wave are on the wire; the verified trunk repair is
on the wire; master is unmoved; the unconsumed card is durable and will be read when a window returns.

---

## 8 · RULINGS THAT SHOULD BECOME RULES

**A DIAGNOSIS CARD EARNS ITS ROUND WHEN THE OBVIOUS REPAIR IS MEASURABLY WRONG.**

**AN ARCHITECT ARGUMENT GOES IN A CARD LABELLED AS AN ARGUMENT, WITH REFUTATION ORDERED FIRST.** Two
cards carried an Architect hypothesis this session; one was inverted, one half-refuted, **both caught
in the same round because the card said so out loud.**

**A CARD THAT WILL EDIT ANOTHER LANE'S ARTEFACT MUST CARRY ITS OWN LANDABILITY CONSTRAINT**, measured
from the gate's source. Without it the repair branch would have been unlandable by construction.

**CONSENT IS GIVEN TO A STRUCTURE, NEVER TO A CLAIM.** When an owner authorises changing a delivered
artefact's bytes for compliance, the authorisation covers form and never meaning — and the card must
order the lane to STOP rather than decide when the two cannot be separated. **`git diff --numstat` with
a zero deletion column is how that is proved rather than promised.**

**A PLAN EXPIRES BY ITS OWN TERMS AND THE EXPIRY IS MEASURED, NOT ASSUMED.**

**TWO INSTANCES ARE A PATTERN TO TEST, NOT A CAUSE TO REPORT.** AG-2's phrasing, and the best sentence
of the session about the difference between noticing and knowing.

**DO NOT BLOCK ON AN OWNER QUESTION WHILE A LANE IS FREE.** Ask in prose, keep carding, read the answer
when it comes. Blocking cost this session three and a half lane-hours before it was corrected.

---

## 9 · OWNER RULINGS, S120 — verbatim, with scope limits

**H1 · THE TRUNK REPAIR.** *"Deliği kapat + 4'ü muaf et + 1'i onar."* **COVERS:** ending the vacuous
skip; a dated machine-enumerated second stratum in the frozen list with the freeze re-declared;
changing the bytes of the one governed violator. **DOES NOT COVER:** any other file, any narrowing of
the grammar or the assertion, any change to a CLAIM in the repaired artefact.

**H2 · THE SWEEP BYTES.** *"Önce ben okuyayım."* With the owner. **No execution card cut.** The S119
scope ruling — the sweep is inside the cleanup — stands and is not reopened.

**OPEN, ASKED, NOT YET ANSWERED:** a named spend approval for the `eval-canary` firing that the trunk
landing will cause. Measured from the workflow source: the job fires on a push to master, and the
repair branch touches a path the ignore list does not cover. **Standing wave consent does not
substitute for a named firing.**

**OPEN, AND THE ONLY ITEM ONLY A HUMAN CAN CLOSE:** the state of the five windows. Not an operation —
a witness.

**CARRIED, UNCHANGED:** A1 host remains open and is **not waiting on the owner's judgement** — it waits
on a runtime floor that does not exist because no build has completed. The AWS credentials in the
Architect's container remain deferred by owner instruction; not used, not probed, value never printed.

---

## 10 · THE CARD GRAMMAR — ten cards, ten passes, five refusals repaired

Ten cards posted across two waves. **Every one ran the landed preflight in the Architect's own
container before posting, and every insert returned a body digest byte-identical to the local file.**
Five were refused on a first attempt and all five were **repaired, never routed around**: a pre-rule
spelling in a claim basis, an absence claim resting on one lens (three times), a content digest read as
a short sha, evidence fences parsed as claim rows because they sat inside the claims section, and a
counted set named without its members.

The seed records the prior figure: **of the Architect's last ten cards before this discipline, ZERO
passed.** The instrument was always there; it was simply never run.

<!-- END · S120-FINDINGS-LEDGER-v2 -->
