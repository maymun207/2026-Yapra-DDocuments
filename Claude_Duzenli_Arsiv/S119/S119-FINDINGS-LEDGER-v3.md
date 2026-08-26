# S119 · FINDINGS LEDGER — v3 (live; written DURING the wave so it is NAMED, not discovered)

<!-- SUPERSEDES v2 (S37-1). Written WHOLE, not patched (A-REC-S101-7). v2's entries are ALL carried.
     v3 exists because a second measuring round after 07:00Z closed one finding, SUPERSEDED half of
     another with a contradicting measurement, added four findings, and caught the Architect
     committing the SAME defect a lane had flagged twenty minutes earlier. Every move is named with
     its carry-diff below; nothing was summarised away. -->

**Session:** S119 · opened 2026-08-26 ~01:55Z (04:55 TSİ) · Architect: Claude
**Anchor at open:** `origin/master` `51826e6f…` · factory mode measured **SHUTDOWN** (bootstrap said READY)
**Trunk at v3:** `origin/master` `483ac334…` · 62 heads · mode READY · five addresses held

---

## 0 · CARRY-DIFF FROM v2 (what MOVED, and why — read this before assuming v2 still holds)

| entry | v2 said | v3 says | what moved it |
|---|---|---|---|
| `F-S119-LANE-MACHINE-CANNOT-REACH-THE-IMAGE-REGISTRY-1` | the registry is unreachable from the lane's runtime | **SUPERSEDED-BY `F-S119-REGISTRY-REACH-WAS-TRANSIENT-1`** for its registry half | an ORDERED single retry pulled ~80 MB of base layers over that same path |
| the proxy inside that runtime | prime suspect | **REFUTED, not merely unproven** | the same proxy was in place while the bytes moved |
| the bench floor | UNMEASURED, blocked on the registry | **still UNMEASURED, blocked on something else entirely** | the build now dies four steps later, at the dependency install |
| `F-S119-THE-GATE-MEASURES-A-HEAD-THE-AUTHOR-NEVER-TESTED-1` (§2) | a green head was reddened by the gate's owed update | **carried, and now SHARPER** — the reddening delta contains ZERO source files | the delta was listed by name: fifteen paths, all under the report prefix |
| the trunk's own build state | never read this session | **read, and it answered with a THIRD value** | `total_count=0` at the trunk head — neither red nor green |
| card count in §7 | fifteen, all passed | **nineteen, all passed** | four more posted at 07:17–07:21Z |

**NOTHING IN v2 WAS DELETED.** Two entries moved class and both moves are printed above.

---

## 1 · CLOSED, BY EVIDENCE

**`PHASE-LANE-CLAIM-WITHOUT-FORCE-1` — ACCEPTANCE TEST PASSED.** Four producers claimed addresses
between `02:34:07Z` and `02:35:17Z` with a plain push. **Owner's witness: no dialog appeared during
the claim.** A criterion retires by evidence and this one did.

**`F-S118-BOOT-HAS-NO-PATH-FROM-SHUTDOWN-TO-READY-1` — CLOSED@evidence.** `foreman.md` §1x's third
ending ran for the first time in its life at `02:21:24Z`: `SHUTDOWN → READY`, one move.

**`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1` — CLOSED@evidence, BOTH HALVES.**
Database half: the recovery verb is in `pg_proc`, `SECURITY DEFINER`, execute granted to the lane
principal and absent for public/anonymous/authenticated — read from the raw ACL and independently by
the Operator through a different function. Code half: the caller is exported in the state script.

**`F-S119-MIGRATION-DRIFT-IS-TWO-DEEP-1` — CLOSED@evidence.** Both migrations applied and verified.

**`F-S119-REGISTRY-REACH-WAS-TRANSIENT-1` — CLOSED@evidence, and it CLOSES THE OWNER'S QUESTION.**
The owner asked why local Docker could not be reached and stated plainly that he had restricted
nothing. **He was right, and the earlier finding was measuring a moment rather than a condition.**
An ordered single retry, run after he restarted the runtime, resolved base-image metadata in
seconds, completed the auth handshake, and pulled and extracted roughly eighty megabytes of layers.
The host reaches the registry with sub-second DNS, TCP and TLS timings and a correct unauthenticated
answer. **No act by the owner is required, and nothing on his machine is blocking the registry.**

**THREE MORE LANDINGS, EACH WITH ITS HEAD PAIR RECORDED.** The sweep-execution report, the
Operator's rules entering the repository, and the bench-image measurement all landed at 07:0xZ.
Two of the three carried an owed update that MOVED the head and the verdict survived the move.

**THE COLD START TOOK ZERO HAND-WRITTEN ROWS.** S118 needed three.

---

## 2 · THE LARGEST FINDING OF THE SESSION — AND IT GOT SHARPER, NOT SOFTER

**`F-S119-THE-GATE-MEASURES-A-HEAD-THE-AUTHOR-NEVER-TESTED-1`.** Measured by the foreman while
landing, and proved with a pair of reads rather than argued:

```
branch's OWN head        -> build job :: SUCCESS
head after the update    -> build job :: FAILURE
```

**A green branch went red because the landing gate's own owed update merged current trunk into it.**
The general statement, which neither boot nor card carried:

> **The head a gate reads and the head an author tested are different objects, and the landing
> procedure is what makes them differ.**

**AND THE LANE THEN FALSIFIED THE OBVIOUS INFERENCE.** "Current trunk reddens code branches" was
tested against the other refusal and refuted — that one was already red before anyone touched it.
Two refusals, same class, different causes, reported separately.

**THE SHARPENING, MEASURED AT 07:0xZ.** The delta between the green head and the red head was
listed by name: **FIFTEEN paths, EVERY ONE under the report prefix, ZERO source files.**

**`F-S119-A-DOCS-ONLY-DELTA-REDDENED-THE-BUILD-JOB-1`.** A build job changed verdict across a delta
containing no code at all. **Two readings survive and only one can be true:**

1. the build job ASSERTS OVER the content of the report directory, so adding reports can redden it;
2. the failure is NONDETERMINISTIC and the pair is a coincidence of timing.

**The measurement does not separate them and neither was named.** The three agreeing head pairs
recorded the same hour are evidence against "any update reddens a branch", which is what makes this
a specific event rather than a general property. **`PHASE-BUILD-DOCS-ASSERTION-1` is in flight to
separate them by reading the failing log and the failing step's own source — with re-running the
check named as a falsifier, because a fresh run measures a different moment.**

**WHY IT IS NOT A CURIOSITY.** Those fifteen files are already in the trunk, and by §3's CI-diet
finding they entered it WITHOUT EVER BEING BUILT. If reading one is correct, the trunk is carrying
an unbuilt change of exactly the class known to be capable of reddening the build job.

---

## 3 · FINDINGS MEASURED THIS SESSION

**`F-S119-CI-ZERO-RUNS-ON-THE-TRUNK-IS-THE-DIET-NOT-A-DEFECT-1` — NEW.** Asked whether the trunk was
red or green, the check API answered `total_count = 0` at the trunk's own head: **byte-identical to
what a short sha returns, and neither red nor green.** The build workflow's push trigger carries an
ALL-or-nothing ignore list, so a push whose paths are all documentation fires no run. The trunk had
advanced twelve commits with no run on any of them.

**THE RESOLUTION WAS AN IDENTITY, NOT A SAMPLE.** The foreman found the most recent trunk sha with a
successful run, and proved the code trees identical once the ignored prefixes were excluded.
**Reporting `total_count=0` as "green" would have been the exact substitution the rules forbid;
reporting it as "red" would have been a different lie.** The honest answer needed three commands and
a workflow read. `S119-LANDING-ORDER-4` writes that procedure into the order so the third value is
no longer an improvisation.

**`F-S119-THE-REPORT-ONLY-EXCEPTION-CANNOT-RESCUE-AN-UNREADABLE-AUTHOR-1` — NEW, STRUCTURAL.** Read
from the landing gate's own source: **the author is resolved FIRST, and the report-only exception is
judged AFTER, by comparing the author to the lander.** An unresolved author has nothing to compare,
so the exception never fires. **A branch carrying nothing but a report — precisely the class the
exception exists for — is therefore unlandable when its author cannot be read, no matter how clean
its paths are.** Two branches are in that state now. `PHASE-AUTHOR-LENS-DIAGNOSE-1` is in flight to
run the lens rather than reason about it, and is forbidden from choosing a repair.

**`F-S119-THE-A2A-BUILD-DIES-AT-THE-DEPENDENCY-STEP-1` — NEW, CAUSE UNMEASURED.** With the registry
question closed, the build now fails four steps later, during the dependency install, with the
builder's own connection dropping. **This is a DIFFERENT failure from the one that was diagnosed,
and the lane refused to conflate them.** Six containers belonging to an unrelated workload came up
on that machine within about a minute of the retry; the lane recorded that as concurrent state and
explicitly declined to call it a cause. **Resource pressure, a builder restart, a daemon fault and
something specific to the dependency step all produce that same line.** `PHASE-A2A-BUILD-EOF-1` is
in flight with the three separating measurements the lane itself named, and with **at most one
further build** — one, not until it goes green.

**`F-S119-ANCHOR-MINTED-BEFORE-THE-LAST-ACT-1`.** The bootstrap's anchor table was written before
the close it describes finished. Two rows were stale on arrival. **Rule the next bootstrap carries:
the anchor table is the LAST act of a close, never the first.**

**`F-S119-MODE-ROW-NOTE-ARGUES-THE-OPPOSITE-1`.** The mode row read one state while its note carried
the prose of the opposite one. The mode verb still accepts no note parameter. Not hand-corrected:
the stale note IS the live reproduction.

**`F-S119-CLAIM-DOES-NOT-RESET-THE-HEARTBEAT-1`.** Read from the function body: the re-claim branch
writes state, nonce and timestamps and does NOT touch the heartbeat. A lane 74 seconds old carried
its dead predecessor's heartbeat, 68 minutes stale, under the successor's nonce. Every liveness lens
reads that field and a stale POSITIVE number does not read as "no data".

**`F-S119-THE-RECEIPT-COLUMN-UNDER-REPORTS-DELIVERY-1`.** The bus receipt measures a read CALL, not a
delivery. Three of five closing cards were unstamped yet all three lanes executed them. **A null is
not evidence of "unread".**

**THE DIALOG CLASSES — three distinct causes, one symptom, each measured separately.**
- **`F-S119-INLINE-SCRIPT-DIALOG-CLASS-1`** — an inline-script form prompted although its rule is in
  both allow-lists; the foreman's gate probe proved its settings were loaded, so the cause is the
  MATCHER, not the loading.
- **`F-S119-ENV-PRESENCE-PROBE-HAS-NO-RULE-1`** — no rule exists for the value-printing probe. **And
  none must be added:** it would print a connection string's password into a transcript.
- **`F-S119-ENV-PREFIX-ASSIGNMENT-DEFEATS-THE-ALLOW-LIST-1`** — three measured instances. A prefix
  rule matches the FIRST token, so a leading variable assignment is unmatchable by definition.
- Neither guard hook can emit an "ask": both emit only allow and block, read from their sources.

**`F-S119-RUNNER-ECHOES-ARGV-BEFORE-THE-REFUSAL-1` — measured by a lane, correcting the Architect's
own card.** The package runner echoes argv before the script runs, so a value on a command line is
disclosed BEFORE the refusal fires. The instrument's protection is partial; the real cure is a boot
rule that a value never goes on a command line.

**`F-S119-BOOT-PROSE-STRICTER-THAN-THE-LANDED-GATE-1`.** The foreman boot states the self-land rule
flat, with no mention of the report-only exception the landed gate carries and decides BY THE PATH
LIST. Cost: three landable pull requests reported unlandable. All three landed once measured.

**`F-S119-THE-REPORT-LENS-CONFUSES-SUBJECT-WITH-AUTHOR-1`.** A sweep report about one address,
authored by another, reads as TWO authors and refuses as unattributable — *a branch declaring two
authors declares none*. **Any report ABOUT another lane's address is unlandable by construction.**
CI was green and the path was under the prefix; the unreadable-lane test runs first by design.

**`F-S119-CLASSIFIER-REFUSED-THE-READ-ONLY-VERIFIER-1`.** The harness classifier blocked the sweep's
**read-only verification step** one deletion into a thirty-four-ref run, while the destructive push
itself was permitted. The lane stopped rather than continuing unverified, and escalated the re-route
question rather than deciding it. **Architect's ruling: HALT. A refusal is a measurement and is
never routed around — and a cosmetic sweep never justifies routing around a safety refusal.**
**STILL HALTED at one of thirty-four. Resuming is destruction and needs the owner's word again,
because the owner personally ordered the halt.**

**`F-S119-LANE-MACHINE-CANNOT-REACH-THE-IMAGE-REGISTRY-1` — SUPERSEDED-BY
`F-S119-REGISTRY-REACH-WAS-TRANSIENT-1`.** Carried here in full rather than deleted, because the
shape of the error was real when measured and the supersession is the point. It read: the daemon
answered, the repository's own build step succeeded, and fetching base-image metadata died on a
deadline, corroborated by an absent local cache. **A second shape was measured independently in the
Architect's own container — a fast proxy refusal — and the two shapes were correctly called two
different causes.** That reasoning still stands; only the lane-machine half is superseded.
**A PRECISION THE LANE VOLUNTEERED AGAINST ITSELF:** the base image is now fetched but is NOT in the
image store — the builder pulled it into its own cache, and "in the local cache" and "in the image
store" are two different places its earlier wording did not distinguish.

**`F-S119-TRANSIENT-503-CACHED-REF-STOOD-IN-FOR-A-WIRE-READ-1`.** A fetch failed and a cached ref
silently stood in while the wire had moved. **A cached ref is not a measurement.**

**`F-S119-CP8-BIT-A-MIGRATION-CARD-AGAIN-1`.** Second measured instance: a card ABOUT migrations
cannot NAME them, because their filenames carry timestamps the check reads as live state. **Not
routed around** — names removed, derivation ordered instead. **A THIRD instance measured at 07:2xZ,
and it is funnier and worse: the check read seven letters inside an ordinary English word as a
commit prefix and refused the card.** The known limit is stated in the check's own source, so this
is a documented cost rather than a surprise — but three instances in one session is a rate, not an
anecdote, and the check now refuses more true cards than false ones in this Architect's hands.

**`F-S119-OPERATOR-REPORT-STAMPS-LOCAL-TIME-AS-Z-1`.** Two report sections carried local time under a
UTC suffix. Work sound, label wrong.

**`F-S119-OPERATOR-BOOT-NOT-IN-THE-REPO-1`.** Carried from S117. The one lane whose boot must be
pasted. **The owner's standing rule this session — everything in the repository — is violated by
exactly this and nothing else measured tonight.** The card landed at 07:0xZ and the lane's own
report **refuses to claim the gap is closed**, naming what remains instead. That refusal is correct
and the item stays OPEN.

**`F-S119-ARCHITECT-CONTAINER-CARRIES-UNDECLARED-CLOUD-CREDENTIALS-1`.** The Architect's own
container environment carries cloud credentials the capability map does not list. **Not used, and
not probed** — probing a credential to learn what it unlocks is the wrong instinct. Presence named,
value never printed, ruling left to the owner. **Still open.**

**`F-S119-BOOT-ARTEFACT-CARRIES-THE-PREVIOUS-SESSION-NUMBER-1`.** Carriers are found by name.

---

## 4 · ARCHITECT ERRORS, S119

**`A-REC-S119-ORDERED-A-BOOT-SEQUENCE-THE-LANDED-BOOT-FORBIDS-1`.** Told the owner to open five
windows at once; the producer boot says the foreman boots first and producers after READY. Four
lanes correctly refused. The boot file was in a fresh clone and was not read before the order.

**`A-REC-S119-INHERITED-A-LANE-REFUSAL-WITHOUT-READING-THE-GATE-1`.** A lane's refusal class was
reported to the owner as a design question; reading the gate showed an exception that admitted all
three branches.

**`A-REC-S119-SECOND-LANDING-CARD-NOT-CUT-1`.** The first landing order's nine all resolved and the
branches the wave then produced had no card. **The same defect this session diagnosed as the root
cause of the whole unlanded backlog, committed again three hours after naming it — and then a THIRD
time, which is why `S119-LANDING-ORDER-3` exists.** A fourth order was cut inside eight minutes of
the third report, which is the first time this session the gap did not open.

**`A-REC-S119-COMPARISON-SET-NARROWED-WITHOUT-SAYING-SO-1`.** The host comparison priced four options
and read as though those were the field. Railway was never evaluated; the owner asked and was right
to. **Narrowing a comparison set is legitimate; not declaring the narrowing is not.** Corrected in
the v2 comparison, which now carries an explicit exclusion table.

**`A-REC-S119-CARD-STAMPS-POSTDATED-THEIR-OWN-ROW-1` — caught by a lane, not by the Architect.**
A card's header stamp and its premise stamps ran roughly twenty minutes AHEAD of the row's own
creation time, so they could not be measurements taken before the card was written. The lane
re-measured every premise independently, found no substantive difference, and **recorded the defect
anyway** — its reason: a card's timestamps are how a reader judges whether a premise is stale, and a
stamp that runs ahead of its own row cannot do that job.

**`A-REC-S119-CARD-STAMPS-POSTDATED-THEIR-OWN-ROW-2` — THE SAME DEFECT, COMMITTED AGAIN IN THE VERY
NEXT WAVE, TWENTY MINUTES AFTER BEING TOLD.** Three of the four cards posted at 07:17–07:21Z carry
stamps two to nine minutes ahead of their own rows. **This is the worse instance, because the first
was ignorance and this one was inattention.** The direction of the error is the dangerous one: a
forward stamp makes a premise look FRESHER than it is.

> **THE ROOT CAUSE IS NOT CARELESSNESS AND THE REMEDY IS NOT MORE CARE.** The Architect hand-types a
> value the poster could compute. Under PLATINUM that is a design fault, not a discipline fault:
> **manual work that a machine could do means the design is wrong.** The remedy is a card-grammar
> item — the stamp is written at INSERT, or the check refuses a stamp that postdates its row — and
> until that lands, this error should be expected to recur.

**The four cards were NOT reissued.** Every premise in them decays on branch movement, not on
minutes, and each carries its own event-keyed invalidation clause; reissuing four cards mid-read to
correct a stamp that changes no order would cost four lane re-reads and buy nothing. **That is a
judgement, and it is recorded as one rather than presented as obviously right.**

---

## 5 · RULINGS THAT SHOULD BECOME RULES

**ON-DISAGREEMENT binds on premises an ORDER DEPENDS ON.** A lane found a premise figure did not
reproduce, reported the divergence, declined to call it a refutation (the two figures measured
different objects), and asked whether the clause required a stop. **Ruling: it does not.** The card
itself labelled that figure a PROXY and no order depended on its value.

**A REFUSAL IS NEVER ROUTED AROUND, AND COSMETIC WORK NEVER BUYS AN EXCEPTION.** Ruled live when a
lane offered a legitimate alternative route past a blocked safety check.

**EVERY LANDING RECORDS ITS BEFORE-AND-AFTER HEAD PAIR.** From §2. Always, even when both are green.
**A pair that AGREES is what makes a pair that disagrees legible** — that sentence is a lane's, and
it is the best argument in the session for recording a measurement whose answer you already expect.

**A BINARY QUESTION ABOUT A MEASURED WORLD NEEDS ITS THIRD VALUE WRITTEN DOWN — NEW.** A card asked
"is the trunk red or green" and the world answered "nothing ran". **A card that offers two branches
forces the lane to either improvise or lie.** Every gate question in a card is to carry its
not-measured branch explicitly, with what to do in it.

**A CARD'S STAMP IS WRITTEN BY THE POSTER, NOT THE AUTHOR — NEW, from §4.** A stamp that postdates
its own row is a defect by construction and should be refused at the gate rather than caught by a
reader.

---

## 6 · A CORRECTION TO THE IMPLEMENTATION ORDER

`cwf-implementation-order-S118-v31` lists **A3** (the Operator's two data rows) and **A4** (publishing
the honestbench instrument) as parallel. **Measured: A3 is DOWNSTREAM of A4.** The prepared packet on
the trunk carries a placeholder for an endpoint that does not exist and says *"Do not run this yet."*

**The owner-side critical path is three decisions, not four:** a long-lived host, publication of the
instrument, and a spend authorisation.

**AND THE HOST DECISION HAS AN UPSTREAM THAT IS STILL DARK.** The comparison's tie-break is the
runtime floor, the floor needs a completed build, and §3 records that the build now dies at the
dependency step for an unmeasured reason. **The host decision is not waiting on the owner's
judgement; it is waiting on a number nobody has yet.**

---

## 7 · THE CARD GRAMMAR HELD

Nineteen cards posted. **Every one passed the landed preflight and the landed relay audit BEFORE
posting, and every insert returned a body digest matching the local file.** The seed records the
prior figure: of the Architect's last ten cards, ZERO passed. Three were refused on the first
attempt and repaired rather than routed around — one for counting a set without naming its members,
one for naming migration files whose timestamps read as live state, and one for an ordinary English
word whose letters read as a commit prefix.

<!-- END · S119-FINDINGS-LEDGER-v3 -->
