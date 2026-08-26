# S119 · FINDINGS LEDGER — v1 (live; written before the close so it is NAMED, not discovered)

<!-- Written WHOLE. This file exists because the carrier debt is the defect that has bitten every
     recent session: findings measured in the session's conversation, never written down, then
     rediscovered. It is written DURING the wave, not at the end, and it is updated in place.
     Every entry carries the lens that produced it. Nothing here is remembered. -->

**Session:** S119 · opened 2026-08-26 ~01:55Z (04:55 TSİ) · Architect: Claude
**Anchor at open:** `origin/master` `51826e6f…` · factory mode measured **SHUTDOWN** (bootstrap said READY)

---

## 1 · THINGS THAT CLOSED, BY EVIDENCE

**`PHASE-LANE-CLAIM-WITHOUT-FORCE-1` — ACCEPTANCE TEST PASSED.** Four producers claimed addresses
between `02:34:07Z` and `02:35:17Z` with a plain push. **Owner's witness: no permission dialog
appeared during the claim.** The criterion retires by evidence, which is the only way a criterion
retires. S118's hour of hand-approving the claim walk is closed for the ACQUIRE path.

**`F-S118-BOOT-HAS-NO-PATH-FROM-SHUTDOWN-TO-READY-1` — CLOSED@evidence.** `foreman.md` §1x now
carries a third ending, `ALREADY-FINISHED → OPEN THE FACTORY`, landed in the factory-recovery merge.
It **ran for the first time in its life** at `02:21:24Z`: `SHUTDOWN → READY`, one move, no
intermediate. Verified in `factory_events`, not inferred.

**`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1` — CLOSED@evidence, BOTH HALVES.**
Database half: `factory_reclaim(p_addr, p_dead_nonce, p_new_nonce)`, `SECURITY DEFINER`, present in
`pg_proc`, execute granted to the lane principal and absent for the public, anonymous and
authenticated grantees — read from `proacl`, and independently from `has_function_privilege` by the
Operator. Code half: `scripts/factoryState.mjs` exports `reclaim()` and calls the verb. Before
tonight the code half was on master and the database half did not exist.

**THE COLD START TOOK ZERO HAND-WRITTEN ROWS.** S118 needed three. The whole sequence — foreman
claims, reads the remnant verdict, opens the factory, four producers claim — ran with no Architect
hand anywhere in it.

---

## 2 · FINDINGS MEASURED THIS SESSION

**`F-S119-ANCHOR-MINTED-BEFORE-THE-LAST-ACT-1`.** The bootstrap's anchor table was written at
`19:45Z` and the session's closing wave ran `01:22–01:46Z`. Two anchor rows were therefore stale on
arrival: mode read `SHUTDOWN` not `READY`, and open branches measured 14 phase + 2 probe, not 9.
**Rule the next bootstrap must carry: the anchor table is the LAST act of a close, never the first.**

**`F-S119-MIGRATION-DRIFT-IS-TWO-DEEP-1` — now CLOSED@evidence.** The bootstrap named ONE unapplied
migration; the applied ledger ended two behind master. Both applied by the Operator this session and
verified independently by the Architect.

**`F-S119-MODE-ROW-NOTE-ARGUES-THE-OPPOSITE-1`.** Second instance of the dropped-note defect. The
factory mode row read `SHUTDOWN` while its `note` carried the prose of an OPEN. A reader taking the
note as the reason for the mode reads the opposite of the state. `factory_set_mode` still accepts no
note parameter. **NOT hand-corrected: the stale note IS the live reproduction.**

**`F-S119-CLAIM-DOES-NOT-RESET-THE-HEARTBEAT-1`.** Read from the function body, not inferred:
`factory_claim`'s re-claim branch writes state, nonce, changed_at, updated_at and changed_by, and
**does not touch `heartbeat_at`**. Measured live: a lane 74 seconds old carried a heartbeat 68
minutes stale — its DEAD predecessor's, under the successor's nonce. Every liveness lens reads
heartbeat age, and a stale POSITIVE number does not read as "no data". The first-claim path leaves
it null, which is honest; the defect is only on re-claim.

**`F-S119-THE-RECEIPT-COLUMN-UNDER-REPORTS-DELIVERY-1`.** `consumed_at` measures a `--read` call,
not a delivery. Three of five closing cards were unstamped yet all three lanes executed them; a
producer that went `WORKING` 71 seconds after its card arrived left its row null. **`consumed_at IS
NULL` is not evidence of "unread".** Attribution is supposed to be measured from the bus, and this
is the bus's delivery lens under-counting.

**THE DIALOG CLASSES — three distinct causes, one symptom.** Conflating them was the S118 error and
it was avoided here by measuring each:
- **`F-S119-INLINE-SCRIPT-DIALOG-CLASS-1`** — `node -e '<script>'` prompted although
  `Bash(node -e:*)` is in BOTH allow-lists. The foreman's gate probe printed `[guard-bash] BLOCKED`,
  which proves its settings WERE loaded, so the cause is the MATCHER, not the loading.
- **`F-S119-ENV-PRESENCE-PROBE-HAS-NO-RULE-1`** — `printenv` is in neither allow-list. Fully
  explained. **And it must NOT be added:** `printenv <CONNECTION_STRING_VAR>` prints a password into
  a transcript, and a transcript is a publication.
- **`F-S119-ENV-PREFIX-ASSIGNMENT-DEFEATS-THE-ALLOW-LIST-1`** — three measured instances of
  `VAR=value <command>`. A prefix rule matches the FIRST token, so a leading assignment is
  unmatchable **by definition**. Sibling of the cd-chain finding.
- Neither guard hook can produce an "ask": both emit only allow and block. Measured from their
  sources. So no dialog seen tonight came from a hook.

**`F-S119-RUNNER-ECHOES-ARGV-BEFORE-THE-REFUSAL-1` — measured by AG-1, and it corrects the
Architect's own card.** The presence instrument was ordered to refuse an argument containing an
equals sign. Measured: the package runner echoes argv **before the script runs**, so a value on the
command line is disclosed by the RUNNER before the refusal fires. **The instrument's protection is
partial and the real cure is a boot rule: a value never goes on a command line.**

**`F-S119-BOOT-PROSE-STRICTER-THAN-THE-LANDED-GATE-1`.** `foreman.md` states "do not merge your own
work" flat, with no mention of the report-only exception the landed gate carries and decides BY THE
PATH LIST. Cost, measured: three landable pull requests were reported unlandable. All three landed
once the measurement was handed over.

**`F-S119-TRANSIENT-503-CACHED-REF-STOOD-IN-FOR-A-WIRE-READ-1`.** A fetch answered a transport
failure and the locally cached ref silently stood in. The wire had moved. **A cached ref is not a
measurement**, and the classifier card was written to refuse one by construction.

**`F-S119-CP8-BIT-A-MIGRATION-CARD-AGAIN-1`.** Second measured instance of the preflight check
reading a 7–39 digit run as live state: a card ABOUT migrations cannot NAME the migrations, because
their filenames carry timestamps. **Not routed around** — the filenames were removed and the
Operator was ordered to derive them from a directory listing, which is better practice anyway.

**`F-S119-OPERATOR-REPORT-STAMPS-LOCAL-TIME-AS-Z-1`.** The Operator's report stamps two sections
with a `Z` suffix carrying local time. The work is sound; the LABEL is wrong. A field whose label is
not its computation.

**`F-S119-OPERATOR-BOOT-NOT-IN-THE-REPO-1`.** Carried from S117 and still open. Three boots live in
the repository; the Operator's does not, so it is the one lane whose boot must be pasted. **The
owner's standing rule this session — everything must be in the repository — is violated by exactly
this and by nothing else measured tonight.**

**`F-S119-BOOT-ARTEFACT-CARRIES-THE-PREVIOUS-SESSION-NUMBER-1`.** The foreman's S119 boot report is
named for S118. Carriers are found by name.

**OPEN, UNMEASURED, and it is a lane liveness question:** one producer has held a stale heartbeat for
over an hour while holding a destructive card that has deleted nothing. Four states exist —
`BUSY · STOPPED · LOOP-STOPPED · HUNG` — and the last two are visible only from the owner's screen.
**No stop is attributed.** The sweep card was deliberately NOT re-issued to another lane: two windows
executing the same delete plan is the exact hazard that card's own orders forbid.

---

## 3 · ARCHITECT ERRORS, S119

**`A-REC-S119-ORDERED-A-BOOT-SEQUENCE-THE-LANDED-BOOT-FORBIDS-1`.** The opening instruction told the
owner to open five windows at once. `producer.md` says the foreman boots FIRST and producers boot
AFTER READY. Four producers correctly refused and stopped terminally, costing four re-runs. The boot
file was in a fresh clone and was not read before the order was given.

**`A-REC-S119-INHERITED-A-LANE-REFUSAL-WITHOUT-READING-THE-GATE-1`.** The foreman's refusal of three
report branches was reported to the owner as a design question. Reading `land.ts` showed the gate
carries an exception that admits all three. The lane's refusal class was taken as fact instead of
measured.

**`A-REC-S119-SECOND-LANDING-CARD-NOT-CUT-1`.** The first landing order named nine; all nine
resolved; the seven branches the wave then produced had no card. The foreman sat correctly idle for
thirty-five minutes. **This is the same defect this session diagnosed as the root cause of the whole
unlanded backlog — committed again, three hours after naming it.**

---

## 4 · A CORRECTION TO THE IMPLEMENTATION ORDER

`cwf-implementation-order-S118-v31` lists **A3** (the Operator's two data rows) and **A4** (a public
endpoint for the honestbench instrument) as parallel items. **Measured this session: A3 is
DOWNSTREAM of A4.** The prepared packet on master carries a placeholder for an endpoint that does
not exist and says in its own words *"Do not run this yet."* The first row alone mounts nothing, and
the admin guard validates against a hardcoded four-member identity tuple.

**Consequence: the owner-side critical path is three decisions, not four** — a long-lived host (A1),
publication of the instrument (A4), and a spend authorisation (A5). A3 becomes a five-minute
Operator write afterwards.

---

## 5 · THE CARD GRAMMAR HELD, AND THE NUMBER IS THE POINT

Eleven cards were posted this session. **Every one of them passed the landed preflight and the
landed relay audit BEFORE posting, and every INSERT returned a body digest that matched the local
file.** The seed records the prior figure: of the Architect's last ten cards, ZERO passed.

Two were REFUSED on the first attempt and repaired rather than routed around — one for counting a
set without naming its members, one for naming a migration whose filename the check reads as live
state. **The check being in the reader rather than the author is what made the difference.**

<!-- END · S119-FINDINGS-LEDGER-v1 -->
