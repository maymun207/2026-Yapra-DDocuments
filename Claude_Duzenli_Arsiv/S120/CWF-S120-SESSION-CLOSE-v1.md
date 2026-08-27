# CWF · S120 SESSION CLOSE — v1

MEASURED-AT 2026-08-27 10:15 TSİ. Ground read from a fresh worktree, the live bus, and the live
lane-state rows at the moment of writing. The factory is being physically shut down by the owner.

---

## 1 · GROUND

| measure | value |
|---|---|
| master at close | `cd8261ef53509efb9f6f7d985c0ce235e0695393` |
| master at open | `da9b82b2e0446fff229cc510cc319c34e0e19ba0` |
| landings this session | **19** |
| commits this session | 64 |
| remote branches | 90 |
| relay corpus (`docs/relay/**.md`) | 289 |
| frozen exemption entries | **82** (was 78 — see the open item) |
| gates at close | **47 of 47 pass** (relay-audit gate + secret guard) |

## 2 · THE SCOREBOARDS — both, because a close citing only one is incomplete

**(A) INTERNAL 7-KEY TALLY — 6/7. UNMOVED.** Open: `#29` A23 understanding layer. Not advanced.
Its three modules still form a closed island — one imports another, and **nothing in the live
request path imports any of them.** The defect itself is still at `stageClarify.ts:329`, the binary
loop, exactly where S112 measured it. The word `ambiguous` appears in that file only in COMMENTS
explaining that it is collapsed into `unresolved`.

**(B) ACCEPTANCE CONTRACT — 0/16. UNMOVED.** Sixteen external criteria, sixteen UNMEASURED.
`mcp-honestbench` has **67 KB of landed design across three reports and zero lines of code** — no
harness, no fixture, no scorer. Cost UNMEASURED.

**PRODUCT CODE LANDED THIS SESSION: ZERO LINES.** 53 files changed on 26 Aug: 43 documents, 7
factory tools, 2 factory tests, 1 factory migration. Measured two ways — a date-scoped commit walk
and a tree diff between the day's first and last trunk commit — which agree.

**Neither scoreboard moved in a full day of five addresses.**

## 3 · WHAT THIS SESSION ACTUALLY DID

It repaired the trunk twice, measured the archive pipeline end to end and closed both crossings,
proved a gate catches by planting a fault in it, established that the same gate cannot block a
merge, recovered a ledger item that existed in exactly one file in the world, and produced eleven
named findings and twelve Architect self-declarations.

**All of it is about the factory. None of it is the product.** The owner named this correctly and
ruled the factory stopped.

## 4 · THE ROOT CAUSE, IN ONE PARAGRAPH

Every failure this session was at a SEAM, never inside a component: box→disk, disk→repository,
card→scout, gate→ruleset, ledger→ledger, decision→lane. The components are individually sound and
nothing measured the joins. And each finding had the same shape: **a claim that was true when
written, went stale, and kept being obeyed** — because nothing re-measured it. The project has
unusually strong verification laws and almost no machines that enforce them, which is the thing
this repository already calls *a law without a gate*.

Underneath that sits the arithmetic: **five parallel producers behind one serial verifier.** Given
a decision, one address delivered a correct, independently verified fix in seventeen minutes. Given
none, five addresses waited ten hours. The queue was the Architect.

## 5 · HOW IT ENDED

At 08:56–08:58 on 27 Aug, all five addresses stopped inside a two-minute window. Windows display
active generation and execute nothing. The owner pressed ESC and `continue` on all five; **zero
heartbeats moved.** The database was measured healthy throughout. Four stop cards dispatched at
09:55–09:58 were never read — the factory had already stopped an hour earlier.

`S120-HANDOVER-CENSUS-v1` carries the branch-by-branch ledger the lanes could not write.

## 6 · WHAT S121 INHERITS

**Frozen, not lost — 20 branches ahead of trunk:**
- **6 carry code.** `context-retrieval-1` and `-organ` are the largest work in the queue — 26
  commits, 40 code files — fenced by named abandonment, **and they are the item that would give the
  Architect reach into the retrieval engine.** Plus `authority-matrix-1` (7 files),
  `mailwait-flags-1` (2 files, repairs the heartbeat-forging box reader), `env-presence-probe-1`,
  `stale-fact-sweep-1`.
- **14 carry only reports.** None advances a criterion. Landing them changes no behaviour.

**Four undelivered stop cards** sit on the bus for AG-1..AG-5. They remain valid.

**Owner rulings given in S120 and still standing:**
- Order of product work: **honestbench → MA-RERUN-2 → #29.** Reversed the Architect's earlier
  recommendation after measurement showed #29 moves the internal counter but not 0/16.
- The four exempted files: **fix them properly, list returns to 78.**
- The corpus job becomes a required check: **consented.** The arming card was cut with a
  precondition and never delivered.
- Architect seat bake-off: **Fable5 as drafter, Codex/OpenAI as adversary** (native in the IDE);
  Grok scored equally but has no machine channel and copy-paste is forbidden on the card path.
- One canary firing authorised; **UNSPENT.**

**The item eight sessions have not picked up:** `MA-RERUN-2` after `b0e8c9e2`. Its (a), (b) and (c)
are all nameable, which by SOTA-1's own text means there is no admissible objection class left —
so it was never a lawful deferral, and S120 did not run it either.

## 7 · THE BINDING CONSTRAINT FOR S121

Not throughput. Not card quality. **Two things, both measured this session:**

1. **The factory cannot run unattended.** Four times, progress required a human hand no machine
   could substitute for. It survived neither the night nor the following morning.
2. **The verifier is one serial process that sleeps.** No amount of better card-writing addresses
   this; the defect is below the cards.

Restarting the factory unchanged buys time until the next wedge. **Understanding why it wedges is
worth more than restarting it.**

## 8 · THE RULE THE ARCHITECT IS BOUND BY GOING FORWARD

**A card that cannot name the acceptance criterion it advances is not cut.** Factory defects are
recorded in the ledger and stay there. This rule alone would have prevented 43 of this session's 47
cards.

<!-- END · CWF-S120-SESSION-CLOSE-v1 -->
