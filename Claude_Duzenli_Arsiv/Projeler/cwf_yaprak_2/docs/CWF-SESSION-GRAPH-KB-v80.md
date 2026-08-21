# CWF — Session Graph KB · v80

<!-- CWF-SESSION-GRAPH-KB-v80 · 2026-08-04 · records S81.
     Supersedes v79. The narrative layer: what happened, why it happened, and
     which sentences are worth carrying. Numbers live in register v84; this file
     never restates a count as authority. -->

---

## S81 in one paragraph

The session was supposed to re-measure the clarification gate's ask-rate. Before
it started, the owner noticed something odd in production and pulled the thread.
**Seven defects came out of one thread**, a bug bucket was built to hold them,
and by the close it held eleven. The measurement itself turned out to be
impossible with the current instrument and was declared **void, honestly**. Two
rollout items merged. Three bugs closed with live proof. And the single most
useful hour of the session was the owner's own idea: *"let me delete the ARMES
key and see how the system behaves."*

---

## The thread, and where it led

The owner asked for a factory list and the product said it had no such tool. The
answer was **correct given the tools it held** — ARMES had been marked down by a
health check thirty minutes earlier and its tools were withheld. Everything
downstream of that was working exactly as designed.

What was not working was everything **around** it:

- The owner replaced the expired token, probed ARMES, **got the tool list back**
  — and the health surface still said disconnected. The probe proved liveness to
  a human and to nothing else.
- The ARMES vendor reported receiving **no requests at all**. True, and by
  design: in the withholding window the product sends the backend zero traffic.
  The outage was invisible from both sides.
- The recorded cause of the outage was `Error POSTing to endpoint:` — a sentence
  that stops where the reason should begin. An expired token and a dead host were
  the same string. That is why a phone call was needed.

**The diagnosis that organised all of it:** the system knew things and the
knowledge never reached whatever consumed it; and where a decision was made,
nothing recorded that it had been made. Two halves of one missing law, which
became **ADR-013 DECISION-PARITY-1**.

---

## The refutation test, and why it mattered

Before writing the phase, the Architect committed to a falsifier in writing: *if
the fixes for BUG-001 and BUG-006 share no common mechanism, the "missing law"
diagnosis is a rationalisation and I withdraw it.*

The test **survived, and corrected its own wording.** The diagnosis had said a
recording mechanism was *missing*. It was not. In all five sites the mechanism
**already existed** and simply was not invoked on one of the paths reaching the
same decision — a `recordCheck` the probe paths never called, a
`classifyProbeError` the ledger-writer never used, a log line and span
attributes emitted by one branch and not by its sibling three lines away.

**The law is a parity law, not a recording law.** Writing the falsifier first is
what made that correction possible instead of embarrassing.

---

## The window: the day's best hour

The owner proposed the test himself, in the simplest possible form. It became an
eight-step controlled window and it produced more than the phase's own test suite
had:

- BUG-001 and BUG-003 **closed** on three independent legs.
- **76 seconds** from repair to working product, against ~30 minutes the day
  before.
- And **four findings nobody had anticipated**, three of them defects the phase
  itself introduced or left behind.

**The most instructive moment:** told to press Sync, the owner pressed **Probe** —
the control he actually reaches for, the one that returns the tool list, and the
one that records nothing. The phase had fixed two human-reachable paths and never
asked whether there were others. *The button that gives the human the strongest
evidence is the button that records nothing.*

---

## Sentences worth carrying

> **Five hand-enumerations of a class, five failures, in two days.** Architect
> twice (a DDL spelling, a multi-line ALTER), AG twice (a `DB_TABLES` literal, a
> `DO` block), and Architect once more (the third caller of `syncBackendCatalog`).
> **Enumerating a class by hand does not work in this project.** Without a gate
> there is no census, only a guess — and a guess that returns "clean" is believed.

> **If you place a remedy on a path only the model can open, you cannot prove it
> on demand.** BUG-002, BUG-006 and BUG-007 are all like this: the withheld-aware
> message lives inside the misroute handler, and a correctly-behaving model never
> misroutes. Asked three times — twice by reproduction, once by explicit
> instruction — the model searched the gateway catalog first and declined every
> time. **Where a fix lives is part of whether it can be proven.**

> **A rule must work on the person who wrote it.** The Architect built the bug
> bucket, wrote the carry rule, designed its positive control — and then tried to
> defer writing an entry "until the next batch" to avoid file churn. The owner
> caught it with one question. The rule that came out: **an item enters the
> register in the message it is announced.**

> **The closure machinery found a defect in itself on its first run.** BUG-004's
> proof pinned an absolute baseline; a legitimate tab load moved it hours before
> the test, and the rule applied literally would have declared a working fix
> broken. That is why BUG-004 was sequenced first out of eight.

> **Everything found this session was found because something refused to lie.**
> The read floor recorded twelve failures instead of showing zeros. A born-loud
> log line carried what the JSON could not. A truncation flag voided a
> measurement rather than shipping a number. **The goal is not zero defects; it
> is zero silent ones.**

---

## What the owner ruled

| Ruling | Effect |
|---|---|
| The bug bucket exists, and carries session to session | `BUG-CARRY-1`, ten rules, three-count positive control |
| Customer data must not sit in a server log | BUG-005 opened; **no interim retention mitigation** — revisited after the fix, last, if at all. Do not re-raise. |
| Both gateway findings are bugs | BUG-006 and BUG-007 filed separately — the owner's split, better than the Architect's proposal, because their closure proofs differ |
| `countAgingDrafts` counts **untouched** drafts | No `created_at` column added; a backfill would put a fabricated date where a fact belongs |
| The gateway fence **stays fail-open** | Behaviour unchanged; only its visibility changes |
| The sequence after BUG-004 | 2.3 → measurement ceiling + BUG-008 → BUG-005 → HONEST-READ-2 |

---

## Carried forward, unresolved

Three rulings are owed (register v84 §7): the `BUG-CARRY-1` rule 1 amendment,
BUG-006's `inert` condition, and the RAG lane's relay. Three items have no home:
the schema-reference gate, the generic parity gate, and a safe fault-injection
affordance. And **eight bugs are open** — every one of them with a named closure
proof, because in this project a bug is not closed by a merge.

<!-- END · CWF-SESSION-GRAPH-KB-v80 -->
