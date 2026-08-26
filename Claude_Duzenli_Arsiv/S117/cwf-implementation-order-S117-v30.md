# CWF IMPLEMENTATION ORDER — S117 close → v30
Supersedes v29 (S116). Single ordered list; **SOTA-1 governs: nothing SOTA-relevant defers without
(a) which criterion is left unproven, (b) by what date it becomes provable, (c) which measurement
resolves it.** Predecessor `claude/cwf-implementation-order-S116-v29.md` READ IN FULL first.

**v29's items 1, 2 and 3 are DISCHARGED and are carried here only as closures**: the S117 zero-paste
factory test RAN (item 1 — and it passed by producing three filed defects, which is the test working);
`CI-DIET-1` landed as #377 (item 2); the budget fence produced runs and they are RED, so item 3's
"green proof" has become an owner-surface item rather than a queue item (§5).

---

## 0 · THE ORDER CHANGED SHAPE AT S118 OPEN, AND HERE IS WHY

v29 sequenced BUILD work. Two measurements taken at S118 open moved something in front of all of it,
and neither is a preference:

1. **`CARD_GATE = 'REPORT'`** — `scripts/mail-wait.mjs:151`, master `50ba7d7e`. The card preflight from
   #401 is landed **DISARMED**: it prints the failed check ids and the lane **proceeds**. Every
   discipline S117 adopted about cards is therefore ADVISORY today. It cannot be armed by flipping the
   constant, because 0 of 10 cards pass and four checks (CP-1, CP-3, CP-4, CP-5) refuse ALL of them for
   one reason — no card is written in the card grammar at all. **Arming today would halt the factory,
   including any card sent to countermand it.**
2. **`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`** — `factory_claim` admits a re-claim in
   exactly two shapes and both are gated on a nonce only the dead window could present. A lane that
   lawfully re-wins its address is locked out of the database permanently. Measured live on AG-3.

**Neither is SOTA-relevant, so putting them first is not a SOTA-1 deferral of anything.** They are
load-bearing for the factory that BUILDS the SOTA work, and a factory whose cards are unenforced and
whose addresses can be permanently lost is not a faster path to `#29` — it is the same path with the
measurements missing.

---

## 1 · `PHASE-ARCHITECT-CARD-GRAMMAR-1` — **BLOCKING, and it now has an acceptance test**

Not tidiness. Until cards are written in the grammar the preflight checks, the gate cannot be armed;
until it is armed, nothing the receiving lane measures about a card can stop a bad card.
**Acceptance test, and it is a number rather than an opinion: re-run AG-4's measurement over the ten
most recent cards and read `CARDS THAT WOULD PASS`. Arm on 10/10, never before.**
Carries **item E**: migrate the project-box open items INTO `docs/ground/open-items.md`, which has been
canonical since bootstrap v112 §2.3 while the items stayed behind. Until E lands,
`cwf-open-items-register-v121` is a MIRROR and says so in its own §0.

## 2 · `PHASE-FACTORY-CLAIM-THIRD-SHAPE-1` — the deadlock, and it is a phase, never a hand-edit

`factory_claim` needs a reachable exit for a lane that holds the GIT half and cannot present the dead
window's nonce. Two candidate shapes, and the design owes a ruling on which:
**(a)** a `factory_release(addr, nonce)` a lane holding the git ref may call to force its own row to
`CLOSED`; **(b)** a third admissible branch in `factory_claim` keyed on the git half.
**The constraint that decides it:** the verb cannot see git, and it must not be allowed to pretend it
can. Any shape that lets a caller ASSERT the git half is a takeover with no corroboration.
Also in scope, because they are the same wound: **`F-S118-SILENCE-DECLARATION-UNREADABLE-1`**
(`readLanes()` omits `note`; `candidateNotice` has no non-test caller) and
**`F-S118-WATERMARK-MOVED-BY-WRITELANE-1`** (a declaration moves the box floor). #397/#399 built a
write path with no read path; this phase finishes it.

## 3 · `#402` — the red must be UNDERSTOOD, not retried

`F-S117-ROUTE-DERIVE-G3-RED-UNEXPLAINED-1`. **Raising the timeout is FORBIDDEN** and that is settled on
evidence, not taste: the file completes in ~1 s against a 5000 ms per-test budget.
**The measurement to DESIGN, and it is the whole item:** outcome 2 (a real race) and outcome 3 (a
genuine assertion failure) are separable only under CI-grade load — CI reported 332 s where a local run
takes ~30 s. So the deliverable is *a way to reproduce contention*, not another local run. Sixteen
greens at a tenth of the load are already in hand and they decide nothing.
`#402` unblocks `#387`, and `#387` is landable **by AG-5 and by nobody else** (measured).

## 4 · `#387` `phase/context-retrieval-1` — lands after #3, by AG-5 only
`AUTHOR-UNKNOWN` on a TRUE two-lane tie born of `A-REC-S117-BRANCH-ATTRIBUTION-ASSERTED-1`.
**No report is removed from any tree to clear it.**

## 5 · `PHASE-CONTEXT-RETRIEVAL-1` — **write the DESIGN DOCUMENT first**
Its name appears in two carriers and **it still has no document.** That has been true since S112 and it
is the reason the Architect has no surface onto Qdrant: the item that would give it one has never been
specified. Contents owed: `cwf-ground-mcp`, `arch__*` collections, the
HEAD/SUPERSEDED/HISTORICAL/UNKNOWN freshness contract, and — measured at S112 and unchanged —
**a ruling on `ALLOWED_CORPORA`, which is a CLOSED list in `api/cwf/_lib/vectorLane/corpora.ts` that no
Architect corpus can enter without a LAW change, not a config change.**

## 6 · `#29 A23 UNDERSTANDING LAYER` — the seventh internal key, and it has stopped being a design item
`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1` is its **live production reproduction AND its falsifier**,
deterministic on any `KB7 <equipment-metric>` query, with an `empty ≠ zero` breach at the RENDER layer
on top. Fix direction is written out in bucket v54 and restated in v55 §1: promote the parent-layer
resolve into the child's parent-param scope; never render `declared-empty` on an unscoped child layer
as "no records in the system"; make the Ask decision read the pass that carries `unresolved`.
**A key with a deterministic repro is worth more than a key with a design.**

## 7 · Kademe 3 remainder — unchanged from v29, none of it dropped
archive automation → private docs repo (**ORDER D blocked on a harness refusal, reported and NOT routed
around**) · Operator boot to repo · takeover-in-walk relocation retry · MCP inventory (14 servers) ·
model pin · eval-canary SKIPPED-streak investigation · `F-S116-RELAY-INBOX-MIGRATION-DRIFT-1`
alignment (AG + Operator pair) · **census re-run cadence, now itself a defect** — STALE at open for
three consecutive sessions.

## 8 · Kademe 4 — H9 deploy verification · H10 dispatch half on the `factory_events` substrate

## 9 · ADF EXIT TEST re-run → if 6/6, ADF 100% declared and S113-H2 lifts

## 10 · Then, per project instructions §9
VECTOR-QOS as its own phase BEFORE any engine switch (owner verbatim) · `#81 BACKEND-DISCOVERY-1` ·
**scoreboard (B) work.** The parked items are never dropped: `#82b` Design-RAG carries the owner's
**"ASLA UNUTMA"**.

---

## 11 · THE ITEM THIS ORDER KEEPS BURYING, NAMED AT THE TOP OF ITS OWN SECTION SO IT STOPS

**`MA-RERUN-2` after `b0e8c9e2` has not been run in S113, S114, S115, S116 or S117.**

It is the measurement that resolves the ONE measured row in acceptance scoreboard (B), whose expiry is
EVENT-BASED and was very likely tripped when `frameRouting=1` went live at S106. Five sessions of
"next session" is exactly the shape SOTA-1 exists to refuse, so it is stated here in the form the law
demands rather than left to drift again:

- **(a) which criterion is left unproven:** the single measured row of `cwf-sota-definition` v1_5 §10 —
  and with it the honesty of the whole (B) column, since a self-portrait taken before a routing change
  is not evidence after it.
- **(b) by what date it becomes provable:** it is provable NOW. There is no dependency. It has been
  provable since `b0e8c9e2` landed.
- **(c) which measurement resolves it:** `MA-RERUN-2` re-run at or after `b0e8c9e2`, published with its
  stage order and interpreter byte-identical per the eval-gate law.

**Since (a)+(b)+(c) can all be named, there is no admissible objection class left, and the honest
conclusion is that this is not a deferral at all — it is an item nobody has picked up.** It rides the
first wave that has a lane free.

END-OF-ORDER cwf-implementation-order-S117-v30
