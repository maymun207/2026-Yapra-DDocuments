# S120 · HANDOVER CENSUS — written by the Architect because the lanes could not

MEASURED-AT 2026-08-27T07:10:00Z (10:10 TSİ). Every line below was read from git, the live bus,
or the live lane-state rows. Nothing here was supplied by a lane, because no lane could answer.

---

## WHY THIS DOCUMENT EXISTS INSTEAD OF FIVE LANE REPORTS

Four stop cards were dispatched at 09:55–09:58 TSİ ordering each address to land what mattered and
write a handover. **None was ever read.** The factory had already stopped an hour earlier.

| address | last heartbeat | silent for | stop card |
|---|---|---|---|
| AG-1 | 08:56:35 | 1h 12m | UNCONSUMED |
| AG-5 | 08:57:37 | 1h 11m | UNCONSUMED |
| AG-4 | 08:58:22 | 1h 10m | UNCONSUMED |
| AG-2 | 08:58:31 | 1h 10m | UNCONSUMED |
| AG-3 | 08:58:42 | 1h 10m | UNCONSUMED |

**All five stopped inside a two-minute window.** That is not five independent failures.

The owner pressed ESC and `continue` on every window. **Zero heartbeats moved afterwards.** The
windows display active generation — "Whirring", "Doing" — while executing nothing. This is the
failure mode the S117 close already recorded by name: *agent alive, poller silent, agent unaware.*

**The database is not the cause and was measured, not assumed:** 18 connections of 60, one active,
none stuck in transaction, and it served every query in this document without delay.

---

## WHAT STANDS AHEAD OF THE TRUNK — the ledger this stop leaves behind

Trunk at `cd8261ef5350`. Twenty branches carry commits the trunk does not.

### CARRIES CODE — six branches

| branch | commits | code files | last commit |
|---|---|---|---|
| `context-retrieval-1` | 13 | **20** | 26 Aug 22:09 |
| `context-retrieval-1-organ` | 13 | **20** | 25 Aug 12:00 |
| `authority-matrix-1` | 3 | 7 | 26 Aug 06:34 |
| `mailwait-flags-1` | 3 | 2 | 26 Aug 08:31 |
| `env-presence-probe-1` | 1 | 1 | 26 Aug 08:23 |
| `stale-fact-sweep-1` | 1 | 1 | 26 Aug 18:09 |

⚠ **The retrieval pair is the largest code work in the queue — 26 commits and 40 code files — and
it is fenced by a named abandonment.** It is also the item that would give the Architect reach into
the retrieval engine, which is the capability the owner asked about first. It is frozen, not lost,
and it is named here so that freezing it stays a decision rather than becoming an accident.

`mailwait-flags-1` is the only one of the six that repairs a defect this session measured: the box
reader that emits a heartbeat for whatever address it is handed, which is the same defect that made
one lane refuse to diagnose another this morning rather than forge a liveness row.

### CARRIES ONLY REPORTS — fourteen branches

`arm-corpus-gate-1` · `backlog-landing-order-1` · `build-docs-assertion-1` · `nightly-compat-red-1`
· `ref-sweep-remeasure-1` · `ruling-s120-spend-and-gate-consent-1` · `s118-final-closing-1-ag1-decayed`
· `s118-lane-sweep-2-ag5-report` · `s119-landing-order-1` · `s119-landing-order-2` ·
`s119-landing-order-3` · `s119-landing-order-4` · `scout-boot-stale-1` · `trunk-green-land-1`

These are the factory's reports about the factory. **Not one of them advances an acceptance
criterion.** Landing them would change no behaviour. They are frozen in place, and nothing in them
is lost: every finding they carry already exists either as a landed report on the trunk or as a
named entry in this session's ledger.

### LANE BRANCHES — permanent, never merged
`lane/AG-1` `9235075a` · `lane/AG-2` `3ba9549a` · `lane/AG-3` `88c9890f` · `lane/AG-4` `2fac2d0f` ·
`lane/AG-5` `4d590aad`

---

## WHAT IS ACTUALLY LOST

Almost nothing, and it is worth being precise rather than dramatic.

**Recoverable, because it lives in git and the bus:** every branch, every commit, every open pull
request, every landed report, every card and its body.

**LOST: the in-window context.** What each address was part-way through at 08:56, what it had
reasoned but not yet written, what it would have told a successor. Five windows' working memory.
That is the entire cost of the stop, and this census is the substitute for it.

**One thing the census cannot replace:** the last visible action at the landing address was a real
landing attempt with its own diagnosis — that a dry run cannot succeed on a branch owing an update,
because the rehearsal declines the update and then fails on the head it was told to expect. **That
is a genuine finding about the landing instrument and it is recorded here so it survives.**

---

## THE STATE OF THE PRODUCT, WHICH IS THE ONLY SCOREBOARD THAT MATTERS

| measure | at S120 open | now |
|---|---|---|
| internal readiness | 6/7 | **6/7 — unmoved** |
| acceptance contract | 0/16 | **0/16 — unmoved** |
| product code landed this session | — | **0 lines** |
| documents landed this session | — | 43 |

The understanding layer was not advanced. The named benchmark has 67 KB of landed design and no
harness, no fixture, no scorer. **Neither scoreboard moved in a full day of work by five addresses.**

---

## THE DESIGN FAULT, NOW UNARGUABLE

Four separate times in this session, progress required a human hand a machine could not substitute
for: a permission dialog that stopped five addresses; a boot file that told a window its channel was
shut; a ten-hour wait for a one-line ruling; and now five windows that generate without executing
and do not recover when continued.

**This factory cannot run unattended.** It cannot survive a night, and today it could not survive a
morning. Every autonomy claim made about it is contradicted by its own measured history, and no
amount of better card-writing addresses it — the defect is below the cards.

**The lanes are not the weakness.** Given a decision, one address delivered a correct, independently
verified fix in seventeen minutes. Given none, five addresses waited ten hours. Given a wedged turn,
none of them could tell anyone — including themselves.

<!-- END · S120-HANDOVER-CENSUS-v1 -->
