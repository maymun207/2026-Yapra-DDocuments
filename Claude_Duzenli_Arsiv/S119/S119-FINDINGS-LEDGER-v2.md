# S119 · FINDINGS LEDGER — v2 (live; written DURING the wave so it is NAMED, not discovered)

<!-- SUPERSEDES v1 (S37-1). Written WHOLE, not patched. v1's entries are carried and several have
     MOVED: two closed, one was superseded by a sharper measurement. v2 exists because six more
     findings arrived after v1 was written, and one of them is the largest of the session. -->

**Session:** S119 · opened 2026-08-26 ~01:55Z (04:55 TSİ) · Architect: Claude
**Anchor at open:** `origin/master` `51826e6f…` · factory mode measured **SHUTDOWN** (bootstrap said READY)

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

**THE COLD START TOOK ZERO HAND-WRITTEN ROWS.** S118 needed three.

---

## 2 · THE LARGEST FINDING OF THE SESSION

**`F-S119-THE-GATE-MEASURES-A-HEAD-THE-AUTHOR-NEVER-TESTED-1`.** Measured by the foreman while
landing, and proved with a pair of reads rather than argued:

```
branch's OWN head        -> build (24.x) :: SUCCESS
head after the update    -> build (24.x) :: FAILURE
```

**A green branch went red because the landing gate's own owed update merged current master into it.**
The general statement, which neither boot nor card carried:

> **The head a gate reads and the head an author tested are different objects, and the landing
> procedure is what makes them differ.**

An author reading a success on their pull request has measured a sha the gate will never read, and
nothing in the pull request view distinguishes them.

**AND THE LANE THEN FALSIFIED THE OBVIOUS INFERENCE.** "Current master reddens code branches" was
tested against the other refusal and refuted — that one was already red before anyone touched it.
Two refusals, same class, different causes, reported separately. Its own sentence: *lumping them
would have charged the landing procedure with a red it did not cause.*

**This is the mirror of the hazard named for the authority-matrix branch.** There an update would
have orphaned a RED sha; here it orphaned a GREEN one. The mechanism is symmetric and now measured
in both directions. **The remedy is in `S119-LANDING-ORDER-3`: every landing records the head before
the update and the head after, always, even when both are green.**

---

## 3 · FINDINGS MEASURED THIS SESSION

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
authored by another, reads as TWO authors and refuses as `AUTHOR-UNKNOWN` — *a branch declaring two
authors declares none*. **Any report ABOUT another lane's address is unlandable by construction.**
CI was green and the path was under the prefix; the unreadable-lane test runs first by design.

**`F-S119-CLASSIFIER-REFUSED-THE-READ-ONLY-VERIFIER-1`.** The harness classifier blocked the sweep's
**read-only verification step** one deletion into a thirty-four-ref run, while the destructive push
itself was permitted. The lane stopped rather than continuing unverified, and escalated the re-route
question rather than deciding it. **Architect's ruling: HALT. A refusal is a measurement and is
never routed around — and a cosmetic sweep never justifies routing around a safety refusal.**

**`F-S119-LANE-MACHINE-CANNOT-REACH-THE-IMAGE-REGISTRY-1`.** The bench image could not be built on
the lane's machine: the daemon answered, the repository's own build step succeeded, and fetching
base-image metadata from the public registry died on a deadline, corroborated by an absent local
cache and a registry query that hung past two minutes. **The runtime is healthy; the registry is
unreachable from it.** Owner reports no VPN and a long-running runtime, and restarted it.
**A SECOND SHAPE, measured independently in the Architect's own container:** the same registry
refuses there with a fast proxy 403. **Two different shapes, therefore two different causes** — and
the fast-refusal shape is what a policy block looks like, which supports the owner's machine NOT
being policy-blocked.

**`F-S119-TRANSIENT-503-CACHED-REF-STOOD-IN-FOR-A-WIRE-READ-1`.** A fetch failed and a cached ref
silently stood in while the wire had moved. **A cached ref is not a measurement.**

**`F-S119-CP8-BIT-A-MIGRATION-CARD-AGAIN-1`.** Second measured instance: a card ABOUT migrations
cannot NAME them, because their filenames carry timestamps the check reads as live state. **Not
routed around** — names removed, derivation ordered instead.

**`F-S119-OPERATOR-REPORT-STAMPS-LOCAL-TIME-AS-Z-1`.** Two report sections carried local time under a
UTC suffix. Work sound, label wrong.

**`F-S119-OPERATOR-BOOT-NOT-IN-THE-REPO-1`.** Carried from S117. The one lane whose boot must be
pasted. **The owner's standing rule this session — everything in the repository — is violated by
exactly this and nothing else measured tonight.** A card is in flight.

**`F-S119-ARCHITECT-CONTAINER-CARRIES-UNDECLARED-CLOUD-CREDENTIALS-1`.** The Architect's own
container environment carries cloud credentials the capability map does not list. **Not used, and
not probed** — probing a credential to learn what it unlocks is the wrong instinct. Presence named,
value never printed, ruling left to the owner.

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
time, which is why `S119-LANDING-ORDER-3` exists.**

**`A-REC-S119-COMPARISON-SET-NARROWED-WITHOUT-SAYING-SO-1`.** The host comparison priced four options
and read as though those were the field. Railway was never evaluated; the owner asked and was right
to. **Narrowing a comparison set is legitimate; not declaring the narrowing is not.** Corrected in
the v2 comparison, which now carries an explicit exclusion table.

---

## 5 · RULINGS THAT SHOULD BECOME RULES

**ON-DISAGREEMENT binds on premises an ORDER DEPENDS ON.** A lane found a premise figure did not
reproduce, reported the divergence, declined to call it a refutation (the two figures measured
different objects), and asked the Architect whether the clause required a stop. **Ruling: it does
not.** The card itself labelled that figure a PROXY and no order depended on its value. Stopping on
a number the card already deprecates would withhold the findings that mattered.

**A REFUSAL IS NEVER ROUTED AROUND, AND COSMETIC WORK NEVER BUYS AN EXCEPTION.** Ruled live when a
lane offered a legitimate alternative route past a blocked safety check.

**EVERY LANDING RECORDS ITS BEFORE-AND-AFTER HEAD PAIR.** From §2. Always, even when both are green.

---

## 6 · A CORRECTION TO THE IMPLEMENTATION ORDER

`cwf-implementation-order-S118-v31` lists **A3** (the Operator's two data rows) and **A4** (publishing
the honestbench instrument) as parallel. **Measured: A3 is DOWNSTREAM of A4.** The prepared packet on
master carries a placeholder for an endpoint that does not exist and says *"Do not run this yet."*

**The owner-side critical path is three decisions, not four:** a long-lived host, publication of the
instrument, and a spend authorisation.

---

## 7 · THE CARD GRAMMAR HELD

Fifteen cards posted. **Every one passed the landed preflight and the landed relay audit BEFORE
posting, and every insert returned a body digest matching the local file.** The seed records the
prior figure: of the Architect's last ten cards, ZERO passed. Two were refused on the first attempt
and repaired rather than routed around.

<!-- END · S119-FINDINGS-LEDGER-v2 -->
