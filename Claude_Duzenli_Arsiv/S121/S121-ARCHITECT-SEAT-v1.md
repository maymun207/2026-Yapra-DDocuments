# S121 · THE ARCHITECT SEAT — what was decided, what exists, and how it gets built

MEASURED-AT 2026-08-27 09:00–09:10Z (12:00–12:10 TSİ). Read from the connected archive folder,
the project box, the fresh clone and the live database.

**ON DISAGREEMENT:** if a carrier and this document disagree, the artefact on disk wins and the
difference is recorded as a finding.

---

## 1 · WHAT EXISTS — measured, not remembered

The decision is **not** two sentences in a session close. Two dedicated artefacts exist, and they
are good ones. They live in the archive folder on the owner's machine and **in no other place**:

| artefact | bytes | where |
|---|---|---|
| `ARCHITECT-BAKEOFF-TEST-v1.md` | 7 239 | `Claude_Duzenli_Arsiv/S120/` — **not in the project box** |
| `ARCHITECT-BAKEOFF-RUBRIC-SEALED-v1.md` | 8 222 | `Claude_Duzenli_Arsiv/S120/` — **not in the project box** |

Both were written 2026-08-27 03:50 UTC, **before any candidate answer was seen**, and the rubric
says so in its first line. It is a well-built instrument:

- It tests **four named failure modes the incumbent actually committed**, not intelligence.
- It records the incumbent's own score per situation **in advance** — WEAK, WEAK-to-PASS, **FAIL**,
  mixed — so a candidate can be judged without trusting the incumbent.
- It **declares its own conflict of interest**: written by the incumbent, who is being compared,
  and who scored FAIL on the situation weighted highest.
- Its decision rule is fixed in advance: **take the seat only on STRONG in Situation C plus PASS in
  two others; reject on WEAK or FAIL in C, however strong elsewhere.**
- It names the real output: *"Blind-spot overlap. Record, per situation, whether the candidate made
  the same error as the incumbent. Four out of four means one seat, not two."*

## 2 · `F-S121-BAKEOFF-RESULT-HAS-NO-CARRIER-1` — MEDIUM

**The inputs are sealed and durable. The output is one sentence.**

The only record of the result anywhere reachable is `CWF-S120-SESSION-CLOSE-v1` §6:
*"Fable5 as drafter, Codex/OpenAI as adversary (native in the IDE); Grok scored equally but has no
machine channel and copy-paste is forbidden on the card path."*

No candidate answers, no per-situation scores, and **no blind-spot overlap record** exist in the
archive, in the project box, or on the trunk. Measured with four lenses that differ in what they
assume: a filename sweep for `*seat*`/`*bake*`; a content grep for `bake-off`; a grep for the
question labels `Q-A3`/`Q-C3`/`Q-D4` that only an answer sheet would echo; and a grep for
`candidate` outside the two known files.

The owner ran the test in his own windows and holds the answers, so this is **not** a claim that
the ruling is unfounded. It is a claim that the ruling's evidence is un-archived, and by this
project's own law an un-archived judgement is one the next session must take on trust — which is
precisely the failure mode `F-S120-LEDGER-TRAIL-STOPS-AT-v108-1` and the v38 sole-copy recovery
already cost this project real time.

**The rubric's own decision rule cannot be checked against the ruling without those scores.**

## 3 · THE DESIGN QUESTION THE RULING DOES NOT SETTLE — build order

The ruling names two roles. It does not say which is built first, and that is the Architect's to
rule (§7: sequencing and dependencies). The two halves solve **different problems**, and only one
of them is the problem S120 named.

**S120's binding constraint, in its own words:** *"The verifier is one serial process that sleeps.
No amount of better card-writing addresses this — the defect is below the cards."* Five producers
behind one verifier; given a decision one address delivered a verified fix in seventeen minutes,
given none five waited ten hours.

- **The DRAFTER half does not address it.** A second card-writer is a sixth producer behind the
  same single verifier. Better cards were explicitly named as *not* the fix.
- **The ADVERSARY half addresses it directly.** S120 recorded **twelve** Architect
  self-declarations. The card gate caught four; the owner caught two. Every one of the rest —
  two lenses that were one lens, one positive probe treated as proof of presence, a dead column
  used as evidence minutes after being declared unreliable, a conclusion drawn from a three-file
  corpus — is an error a second reader of the same artefact catches, and the incumbent by
  construction cannot.

**Ruling: the adversary is built first. The drafter waits.** This does not re-open the owner's
seat decision; it sequences it.

## 4 · THE CHANNEL — the criterion that decided the bake-off, applied honestly

Grok was rejected for having **no machine channel**, copy-paste being forbidden on the card path.
That criterion has not been applied to the winners, and applying it changes what is cheap.

The Architect's real surfaces, measured: a fresh clone with full shell; Supabase MCP (read, plus
`relay_inbox` INSERT and the mode row); Vercel MCP; the connected archive folder; the project box.
**No `gh`** (proxy-gated, 403) and **no push credential** — the Architect cannot write the repo by
constitution *and* could not if it tried.

| role | channel it needs | exists today? |
|---|---|---|
| **adversary** | READ an artefact · WRITE a verdict | **YES, both.** The repo is public; the artefact under test is a file in the connected archive folder, which an IDE-native model reads directly; its verdict is a file written beside it, which the Architect reads from here. **Zero new infrastructure.** |
| **drafter** | WRITE cards to `relay_inbox` under the md5 transport discipline, from a fresh clone, against the live DB | **UNMEASURED.** "Native in the IDE" establishes file access on the owner's machine. It does not establish a bus write, a clone, or a live read. |

**The adversary's channel is a file. That is a full machine channel in both directions and it
requires nothing to be built.** The drafter's channel is the part that is actually work — and it
serves the half that does not address the binding constraint.

## 5 · THE ONE PATH — and it is falsifiable

Run the adversary once, on a real artefact, today, and let the result decide whether the seat is
worth any further spend.

1. **Artefact under test:** `S121-OPEN-MEASUREMENT-v1.md`, already sitting in
   `Claude_Duzenli_Arsiv/S121/` on the owner's machine. It is this session's own work, it names
   four findings and a verified anchor, and it is exactly the class of document that reached the
   archive wrong in S120.
2. **Brief:** refute it. Name what is asserted without measurement; what rests on a single lens;
   which conclusion would collapse if a stated number were wrong; and what the document does not
   say that it should.
3. **Output:** one file written next to it in the same folder. The Architect reads it from the
   bridge — no bus, no credential, no lane, no card.
4. **The owner's hand:** one window opened, one brief pasted. A machine cannot open an IDE window
   on his machine; this is the irreducible real-world-witness surface named in the memory seed §2,
   not a PLATINUM breach.

**THE FALSIFIER, FIXED IN ADVANCE — this is the part that makes it an experiment:** if across the
first **three** artefacts the adversary surfaces nothing the incumbent had not already flagged in
the same document, the second seat is not paying for itself and the ruling returns to the owner
before any drafter work is commissioned. The rubric's own words: *"four out of four means one
seat, not two."*

## 6 · WHAT THIS COSTS AGAINST THE ACCEPTANCE CONTRACT — stated, not hidden

**The Architect seat advances no criterion in `cwf-sota-definition`.** It is factory work, and
bootstrap v120 §2 forbids cutting a card for it. This document therefore **surfaces it for the
owner's ruling and cuts nothing**, which is the symmetry clause working as written.

The one item that moves 0/16 remains the four honestbench rulings (P-1). They need no factory, no
window and no spend, and they are not blocked by anything in this document.

<!-- END · S121-ARCHITECT-SEAT-v1 -->
