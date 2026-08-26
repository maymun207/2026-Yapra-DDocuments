# S120 · FINDINGS LEDGER — v3

<!-- SUPERSEDES v2 (S37-1). Written WHOLE, not patched (A-REC-S101-7). Every v2 entry is carried;
     §0a prints what MOVED. v3 exists because the second half of the session answered the questions
     the first half opened: the factory silence got a CAUSE, the trunk repair LANDED and was verified
     twice, and the owner's own table was re-derived from source.
     EVERY NUMBER HERE IS A CLAIM (TOTAL-45). Where the Architect measured it himself it says so;
     where a lane measured it, the lane is named. The two are never blurred. -->

**Session:** S120 · opened 2026-08-26 ~08:31Z (11:31 TSİ) · Architect: Claude
**Anchor at open:** `origin/master` `483ac334809b2ed026d58b36278120042fffa9a7` · mode READY · five addresses held
**Anchor at this writing:** `origin/master` `da9b82b2e0446fff229cc510cc319c34e0e19ba0` — **the trunk moved once, deliberately, and the corpus is clean at the new head.**

---

## 0 · WHAT THIS SESSION DID

Sixteen cards across four waves; **all sixteen passed the landed preflight in the Architect's own container before posting and all sixteen inserted byte-identical to their local file.** Sixteen reports came back.

**Five Architect claims were overturned by measurement and every one was overturned by an instrument the card itself ordered.** The trunk's red was traced to one cause, that cause was found to be reddening a second workflow, and one repair closed both. Three items the project believed were blocked were not. **One owner decision turned out to be already done, and one turned out never to have been the owner's at all.**

## 0a · CARRY-DIFF FROM v2

| entry | v2 said | v3 says | what moved it |
|---|---|---|---|
| `F-S120-THREE-LIVENESS-SURFACES-WENT-QUIET-INSIDE-ONE-MINUTE-1` | UNMEASURED, cause unknown | **CAUSE FOUND — see §7.** A permission dialog was blocking the poller's own box read | the owner's screen. **No instrument in this factory could have produced it** |
| the trunk repair | built, verified at the branch head, waiting on a spend approval | **LANDED, and verified at the NEW MASTER by the Architect AND by the lane, independently** | the owner's named approval, then the foreman's landing |
| the canary | never observed firing on a landing for days | **FIRED ONCE, PASSED, 5m15s** — and was not re-run | the landing's own push run, read to conclusion |
| the heartbeat lens | used all session as evidence of lane liveness | **AUTHENTICATED BY A PUBLIC VALUE — see §8** | the nonce is readable in the state table; the Architect had been printing it all day |
| the owner's SOTA table | last written at S106 | **RE-DERIVED FROM SOURCE as v3**, every line tagged measured-or-carried | the owner asked; fourteen sessions had passed |
| `A-REC-S120-LANES-IDLE-WHILE-THE-ARCHITECT-BLOCKED-1` | recorded, uncorrected | **CORRECTED IN PRACTICE** — the next owner question was asked in prose without blocking, and a card was cut for a free lane in the same turn | the Architect changed the behaviour rather than only recording it |

**NOTHING IN v2 WAS DELETED.**

---

## 1 · THE TRUNK — one cause, two reds, one repair, and it held

**`F-S120-A-DOCS-ONLY-CHANGE-CONCLUDES-GREEN-WITH-ITS-TEST-STEP-SKIPPED-1`.** A documentation-only pull request switched the test step OFF and the job reported a pass having asserted nothing; the trunk's push filter then ignored documentation paths entirely. **Two mechanisms, same effect.** Debt accumulated unasserted until a branch carrying a source file switched the assertion back on — and that branch went red **for content its author never wrote.**

**The mechanism was caught in the act, on its own diagnosis.** A first report named three orphans; the Architect measured four. The fourth landed through a vacuous green *after* that report's evidence was gathered and *before* it was written.

**`F-S120-THE-ERROR-MESSAGE-RECOMMENDS-A-REPAIR-THAT-MAKES-IT-WORSE-1`.** Adding the header the assertion's own message asks for turns four orphan failures into **one hundred and thirteen** grammar violations. **Following the error message multiplies the debt fivefold.**

**`F-S120-A-GOVERNED-VIOLATION-HAS-NO-BYTE-PRESERVING-ROUTE-1`.** The orphan assertion accepts *governed OR exempt*; the governed-violations assertion consults no exemption list at all.

**`F-S120-THE-FROZEN-LIST-IS-FROZEN-BY-PROSE-ONLY-1`.** Two lenses: the shrink test refuses stale, enrolled and wildcard entries, and an addition naming a real headerless file is none of those; a sweep of the whole source tree finds no second assertion. **Recorded as a measurement of the code, NOT as a licence** — it is why the owner was asked rather than told.

**`F-S120-THREE-JOBS-ONE-CAUSE-1`.** The two version-matrix jobs and the coverage job of the scheduled compatibility workflow failed on **the same two assertions in the same file, byte for byte.** Streak: one night. **And they gate nothing** — measured from the ruleset surface, whose only required status check is the build context.

**`F-S120-THE-COVERAGE-FLOOR-WAS-NEVER-EVALUATED-1`.** The suite exited non-zero before the ratchet. **No coverage figure exists from that run and none is asserted.**

### 1a · The repair, and how it changed nothing anyone said

**`F-S120-A-FENCE-AROUND-A-SENTENCE-IS-NOT-AN-EDIT-OF-IT-1`.** Sixteen sentences carrying bare commit tokens were not moved into a table — **they were wrapped, where they stood, in `evidence:` fences.** The added CLAIMS table's own banner says every row *"restates a claim this report ALREADY makes, with the basis this report ALREADY states"*, and where the original names no command the basis is `RELAYED` — **it refused to invent a lens the author never ran.**

### 1b · The birth proof, taken twice by two parties

**ARCHITECT, at the new master, in his own container:**

```
ORPHANS 0 · GOVERNED VIOLATIONS 0 · stale exempt 0 · enrolled exempt 0 · wildcard none
git diff --numstat, old trunk → new:  101/0 · 415/0 · 47/0 · 49/0   — ZERO DELETIONS
```

**FOREMAN, independently:** required context at the branch head GREEN on a read of seven check-runs (**`total_count = 7` — not the zero-count silence case**); the auditor passes at the new master; **every job of the push run SUCCESS, canary included.**

**THE CANARY: fired once, passed, 5m15s, not re-run.** The owner's approval was for exactly one firing and exactly one firing occurred.

**AND THE ASYMMETRY RAN THE RIGHT WAY THIS TIME.** At the branch head the canary and `rule26` were SKIPPED; at the trunk they RAN. That same asymmetry is what reddened the trunk this morning.

**A HEAD PAIR THAT COLLAPSED, WITH ITS REASON MEASURED.** No branch update was owed — master was already an ancestor of the branch head — so the before and after are the same object. **The lane did not skip the pair; it measured why there was only one.**

---

## 2 · `#29 A23` — the Architect's argument was inverted, and the code had already said so

**`F-S120-THE-ASK-ASSERTS-AN-ABSENCE-THE-SYSTEM-HAD-MEASURED-AS-A-PRESENCE-1`.** On a live tie carrying three distinct entity ids:

```
RESOLVER OUTCOME BY NAME    : ambiguous (three candidates)
the map that reaches the ask: unresolved
decideAsk WITH the collapse : ask
decideAsk WITHOUT           : no-ask, reason "ambiguous-only"
```

**The Architect argued the collapse suppresses clarification. The opposite is true.** Removing it alone produces silence. It is a bug presently cancelling a second bug.

**The defect that reaches a user is one seam further on.** The rendered text says the token was found in **no connected source**, while the resolver had just returned the entities answering to it.

**`F-S120-THE-TIED-ROWS-DIFFER-ONLY-BY-PARENT-1`, and it decides the design.** The tied rows are byte-identical in every field a user could read and differ **only in the parent they hang from** — and the parent is dropped in the clarify stage's own candidate map. The parent names are distinct, so the parent CAN disambiguate; nothing carries it.

### 2a · A correction to this session's own framing

**`A-REC-S120-CLAIMED-A-DISCOVERY-THAT-WAS-ALREADY-DOCUMENTED-1`.** The Architect reported this defect as newly found. **It was already documented in a landed module** — `routing/entityDiagnosis.ts` names producer, pipe and consumer, names the collapsing statement, and states that `'ambiguous'` is an **unreachable union member** and `'ambiguous-only'` **a branch that cannot fire.**

**S120 re-derived it independently, which has value, and added two things the landed spec does not contain:** that widening the collapse alone produces silence, and that the user-facing message asserts an absence after a measured presence. **But the framing "we discovered this" was wrong and is corrected here.**

---

## 3 · `mcp-honestbench` — published, two carriers refuted, and the real blocker named

**`F-S120-HONESTBENCH-IS-PUBLISHED-1`. MEASURED BY A LANE AND INDEPENDENTLY BY THE ARCHITECT, from two networks, with the same hash pins.** The repository is PUBLIC; the adversary modes are **implemented code**.

**TWO CARRIERS ARE REFUTED**, not merely stale: a landed lane report and the implementation order both state the instrument *"has deliberately never been published."*

**`F-S120-NO-DETERMINISTIC-SCORER-EXISTS-1`**, under four independent lenses. **Freezing the rules is not the same act as writing the program that applies them.**

**`F-S120-THE-FROZEN-PASS-CONDITIONS-ARE-NOT-ON-THE-LIVE-BUS-1`.** Two lenses — an address-scoped read and the Architect's unscoped read of the entire table. The conditions live in **cards, not files.**

**`F-S120-THE-FROZEN-CONDITIONS-WERE-IN-THE-ARCHIVE-1` — CLOSED@evidence.** Both documents found, three independent lenses, a tree proved complete rather than sampled (1973 blobs, not truncated), **no gating marker**, conditions reproduced verbatim. **Three of them are not self-contained and one may be unmeasurable as written** — reported, not repaired, per the brief's own instruction.

> **BINDING: implementation-order item A4 is DONE.** The owner-side critical path drops from four to **two**: a host and a spend.

---

## 4 · `#81` and the design corpus

The document repository is located, reachable, and — **measured, not assumed** — the SAME tree as the session archive. **All eight owner-held documents are PRESENT and every one has a blob whose digest MATCHES its index row.**

**`F-S120-TWO-DOCUMENTS-WEAR-ONE-VERSION-NAME-1`.** Collision class **2 of 8**. A version name does not identify a document in that corpus.

**`F-S120-THE-OUTLIER-DIRECTORY-IS-NOT-THE-CAUSE-1`.** The odd blob sits under the same project directory both times — **but that directory also holds five matching copies.** Naming it as the cause would be wrong, and the lane said so rather than reporting the tidy pattern.

**`F-S120-A-SECOND-AMBIGUITY-CLASS-POINTS-THE-OTHER-WAY-1`.** One blob wearing two different version names.

**`F-S120-THE-ARCHIVE-FENCE-IS-DISCIPLINE-NOT-PERMISSION-1`.** The identity the factory reaches that repository with holds **admin and push.** The fence held because a card said so and a lane obeyed.

---

## 5 · The ref sweep — the owner's halt saved work that exists nowhere else

**`F-S120-OLD-SWEEP-PLAN-CONTRADICTS-ITS-OWN-RULE-1`.** The landed plan excluded two probe refs because, being absent from master, *"they carry commits that exist nowhere else"* — **then marked thirteen refs in exactly that state ELIGIBLE**, one carrying thirteen commits with no pull request.

> **An execution of the old list would have destroyed it.** The halt was ordered for an unrelated reason and prevented this. **A stop that was correct twice, whose second reason only became visible when somebody measured again.**

**`F-S120-ONE-LENS-CANNOT-SEE-A-CHERRY-PICK-1`.** One ref disagrees across ancestry and content and is excluded as its own class rather than resolved.

**ARCHITECT'S OWN CLASSIFICATION, taken independently and reconciling exactly with the lane's plan:** of 78 heads — 6 permanent (five addresses + trunk), **41 CONTAINED**, **31 UNIQUE-WORK**. Delete set 41 − 1 hand-excluded = **40**, member for member the lane's number.

**THE OWNER'S QUESTION — *"make sure no unprocessed item is in there"* — ANSWERED IN TWO HALVES:**
1. **For the 40: no, and it is an identity rather than a judgement.** Every one returns zero from `git cherry`: every commit's patch is already in master.
2. **But the unprocessed work is not in the delete set — it is on the 31.** Deleting cannot clean them; landing can. **Hence the ruling: land first, sweep after.** Each landing moves a branch from unique to contained, so the final sweep is larger and the repository actually ends clean.

---

## 6 · Architect errors, S120

**`A-REC-S120-ARGUMENT-INVERTED-1`.** The `#29` card's argument was reversed by measurement. **Right in FORM — it labelled the argument an argument, ordered refutation first, forbade a repair — and wrong in CONTENT. The form is what made the wrongness cheap.**

**`A-REC-S120-ONELENS-UNDERCOUNTED-1`.** A card claimed one in-repo carrier; there are two tracked plus two more without the extension. Caught because the card labelled its own claim a single lens and ordered a second.

**`A-REC-S120-STAMP-POSTDATED-1`.** One card's stamp ran one second ahead of its own row. **The remedy is not more care; it is that the stamp must be computed at insert.**

**`A-REC-S120-LANES-IDLE-WHILE-THE-ARCHITECT-BLOCKED-1`.** Five lanes sat carded-out for roughly three and a half hours while the Architect blocked on an owner question. **The register was not empty; the Architect was.** **CORRECTED IN THE SAME SESSION:** every later owner question was asked in prose without blocking, and a card was cut for a free lane in the same turn.

**`A-REC-S120-CLAIMED-A-DISCOVERY-THAT-WAS-ALREADY-DOCUMENTED-1`.** §2a.

**`A-REC-S120-ASSUMED-A-LANE-HAD-IMPROVISED-CARELESSLY-1`.** The command-form card's premise implied a landed channel existed for the read a window improvised past. **The lane measured that the channel cannot serve another address's box without forging a heartbeat for it, and the Architect's premise was wrong.** The card had ordered exactly that check and forbidden the blaming answer, which is why it surfaced.

**`F-S120-CP8-BIT-A-CONTENT-DIGEST-1` and its fifth instance.** The card check reads a 32-character content digest, and separately a timestamp-shaped migration version key, as truncated commit references and refuses true cards. **Five measured instances; the class is exact.** Never routed around — the literal is removed and derivation ordered instead.

---

## 7 · THE FACTORY SILENCE — cause found, and only a human could find it

**`F-S120-A-PERMISSION-DIALOG-BLOCKED-THE-POLLER-ITSELF-1`.**

The silence of §7 in v2 had a cause and it arrived as **the owner's own screen capture**: a permission dialog standing, its description reading *"Direct box read for anything new"* — **the poller's own box read.** The agent was alive; the polling loop was blocked in a modal. **That is `LOOP-STOPPED`, and it is the state the seed says is visible only from outside.**

**THE MECHANISM IS A KNOWN, NAMED CLASS:** a permission rule matches the FIRST token, and the command began with an environment assignment. **No allow rule can ever match it.**

**THE SEVERITY CHANGED CLASS.** Recorded at S119 with three instances as a nuisance. **Today it stopped five addresses for roughly twenty-five minutes and needed the owner's hand.** Under PLATINUM: manual work was required, therefore the design is wrong.

**AND THE ARCHITECT'S FIRST READING OF IT WAS WRONG — see `A-REC-S120-ASSUMED-A-LANE-HAD-IMPROVISED-CARELESSLY-1`.** The improvisation was correct: **the landed channel writes a heartbeat for whatever address it is given**, so using it to read another address's box would publish a liveness the window cannot vouch for. **There was no working tool to reach past.**

**THE DEEPER FINDING, and it outranks the dialog:** a blocked poller is indistinguishable from a working one from outside. The factory did not fail loudly — it went quiet, **and quiet reads as nothing at all from where the Architect stands.**

---

## 8 · THE INSTRUMENT PROBLEM — the heartbeat lens is authenticated by a public value

**`F-S120-THE-HEARTBEAT-IS-GUARDED-BY-A-VALUE-ANYONE-CAN-READ-1`.**

The heartbeat verb is nonce-guarded. **But the nonce is a column in the state table, and the Architect read and printed it repeatedly today.**

> **A heartbeat therefore proves "something that can read the table wrote this row" — NOT "that address's window is alive."**

**This is a defect in the Architect's own primary liveness instrument and it is recorded as one.** Today's readings were sound **by corroboration** — ref movement, card consumption, reports appearing — and not by the heartbeat alone. **A heartbeat alone is not enough and no future session should treat it as sufficient.**

---

## 9 · RULINGS THAT SHOULD BECOME RULES

**A DIAGNOSIS CARD EARNS ITS ROUND WHEN THE OBVIOUS REPAIR IS MEASURABLY WRONG.**

**AN ARCHITECT ARGUMENT GOES IN A CARD LABELLED AS AN ARGUMENT, WITH REFUTATION ORDERED FIRST.** Three cards carried one this session; all three were corrected in the same round **because the card said so out loud and told the lane to attack it.**

**A CARD MUST FORBID THE ANSWER THAT BLAMES THE CALLER.** The command-form card said *"do not assume the lane was careless"* — and the lane then measured that the channel, not the caller, was at fault. **Without that sentence the wrong cure would have shipped.**

**A CARD THAT WILL EDIT ANOTHER LANE'S ARTEFACT MUST CARRY ITS OWN LANDABILITY CONSTRAINT**, measured from the gate's source.

**CONSENT IS GIVEN TO A STRUCTURE, NEVER TO A CLAIM.** And `git diff --numstat` with a zero deletion column is how that is **proved** rather than promised.

**A PLAN EXPIRES BY ITS OWN TERMS AND THE EXPIRY IS MEASURED, NOT ASSUMED.**

**TWO INSTANCES ARE A PATTERN TO TEST, NOT A CAUSE TO REPORT.**

**DO NOT BLOCK ON AN OWNER QUESTION WHILE A LANE IS FREE.** Ask in prose, keep carding, read the answer when it comes.

**A CLEAN REPOSITORY IS REACHED BY LANDING, NOT BY DELETING.** Deleting a contained ref removes a label; it processes nothing. **The unprocessed work is always on the branches the sweep correctly refuses to touch.**

**A STALE CLAIM IN A DELIVERED REPORT IS REGISTERED, NEVER EDITED.** Its wrong sentence was true when written, and the record of what was believed then has value. **Source comments are the opposite: those are ordinary defects and are simply fixed.**

---

## 10 · OWNER RULINGS, S120 — verbatim, with scope limits

**H1 · THE TRUNK REPAIR.** *"Deliği kapat + 4'ü muaf et + 1'i onar."* **COVERS** the three named parts. **DOES NOT COVER** any other file, any narrowing of the grammar, any change to a CLAIM.

**H2 · THE SWEEP BYTES.** *"Önce ben okuyayım."* → then: *"burada tek sorum işlenmemiş bir item olmadığından emin ol, geri kanalın hepsini temizleyelim tertemiz bir github repomuz olsun."* **Scope approved; the condition is answered in §5; the ORDER is the Architect's and is land-then-sweep.**

**H3 · THE CANARY.** *"Eval canary ok, yapali."* **ONE firing, for THAT landing. SPENT** — it fired, passed, 5m15s. **A further firing needs a further approval.**

**H4 · EXECUTION.** *"sen yukarıda yazdıklarını adım adım execute et ve hepsini tamamla."* A general execution authority. **It does NOT substitute for individual spend firings** — the project's own rule says a general ruling never replaces a named one.

**CARRIED, UNCHANGED:** A1 host is open and **not waiting on the owner's judgement** — it waits on a runtime floor that does not exist because no build has completed. The AWS credentials in the Architect's container remain deferred by owner instruction; not used, not probed, value never printed. `#82b` Design-RAG stays PARKED and **nothing measured this session unparks it.**

---

## 11 · THE CARD GRAMMAR — sixteen cards, sixteen passes, eight refusals repaired

**Every one ran the landed preflight in the Architect's own container before posting, and every insert returned a body digest byte-identical to the local file.** Eight were refused on a first attempt and all eight were **repaired, never routed around**: a pre-rule spelling in a claim basis, an absence claim resting on one lens (four times), a content digest read as a short sha, a migration version key read the same way, evidence fences parsed as claim rows, a counted set named without its members, and a short sha in a quoted log line.

The seed records the prior figure: **of the Architect's last ten cards before this discipline, ZERO passed.** The instrument was always there; it was simply never run.

<!-- END · S120-FINDINGS-LEDGER-v3 -->
