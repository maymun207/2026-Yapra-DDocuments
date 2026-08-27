# CWF · BOOTSTRAP AND NEW SESSION PROMPT — v120 (opens S121)

<!-- MINTED LAST, as the final act of the S120 close, per F-S119-ANCHOR-MINTED-BEFORE-THE-LAST-ACT-1.
     An anchor stamped before the last act is stale on arrival. -->

## §0 · THE ANCHOR — measured 2026-08-27 10:16:33 TSİ, as the closing act

| ground | value |
|---|---|
| master | `cd8261ef53509efb9f6f7d985c0ce235e0695393` |
| remote branches | 90 |
| relay corpus (`docs/relay/**.md`) | 289 |
| frozen exemption entries | 82 |
| newest migration | `20260825153000_factory_recovery.sql` |
| gates | **47 of 47 pass** — relay-audit gate + secret guard |
| factory | **PHYSICALLY SHUT DOWN by the owner at the close of S120** |

**EVERY NUMBER ABOVE IS A CLAIM (TOTAL-45).** Verify it against a fresh clone and the live database
before any of it becomes a premise. **S120 is the proof of why:** its Architect reported "corpus
clean" five times while a second gate was failing on the same trunk, unmeasured, because only one
suite had been run.

## §1 · THE FIRST THING S121 DOES

**Do not open the factory.** It was shut down deliberately. Opening it is the owner's decision and
requires a reason beyond "it is how we work."

Read, in this order: `CWF-S120-SESSION-CLOSE-v1` · `S120-HANDOVER-CENSUS-v1` ·
`REGISTER-BUG-BUCKET-v56` · `S120-WHERE-IT-BROKE-v1` · the four S120 findings addenda.

Then restate SOTA-1 verbatim from `docs/laws/constitution/SOTA-1.md` (S66-1 positive control), and
verify the anchor above yourself.

## §2 · THE BINDING RULE, CARRIED FORWARD

> **A card that cannot name the acceptance criterion it advances is not cut.** Factory defects are
> recorded in the ledger and stay there.

S120 cut 47 cards. **43 were factory self-maintenance. Zero lines of product code landed.** Both
scoreboards — internal 6/7 and acceptance 0/16 — ended exactly where they began. This rule alone
would have prevented 43 of those 47, and it is the single most valuable thing S120 produced.

Its authority is not the Architect's preference: `cwf-sota-definition-v1_5` §1 symmetry clause
already required that items advancing no criterion be **surfaced to the owner for ruling, never
quietly cut.** S120 cut them. That was a SOTA-1 violation and is recorded as one.

## §3 · THE OWNER'S STANDING RULINGS FROM S120

| ruling | state |
|---|---|
| product order: **honestbench → MA-RERUN-2 → #29** | given; **none started** |
| the four exempted files: fix properly, exemption list returns to 78 | given; not executed |
| corpus job becomes a required merge check | **consented**; arming card cut, never delivered |
| Architect seat: **Fable5 drafter, Codex/OpenAI adversary** | decided; not built |
| one canary firing | authorised, **UNSPENT** |
| factory | **STOPPED** — restarting is the owner's alone |

## §4 · WHY THE ORDER IS honestbench FIRST — measured, and it reversed the Architect

`#29` closes the internal 7-key counter. **It does not move 0/16.** `mcp-honestbench` is named in
the acceptance contract and is NOT BUILT — it is the only queued item that moves the external
scoreboard. `MA-RERUN-2` restores the honesty of the contract's single measured row and has been
un-picked-up for **eight sessions** with (a), (b) and (c) all nameable — which by SOTA-1's own text
means it was never a lawful deferral.

honestbench state: **67 KB of landed design across three reports, zero lines of code.** No harness,
no fixture, no scorer. The design phase is over; only building remains.

## §5 · WHAT IS FROZEN, NOT LOST

20 branches sit ahead of the trunk. **Six carry code:**

- `context-retrieval-1` + `-organ` — **26 commits, 40 code files.** The largest work in the queue,
  fenced by named abandonment, **and the item that would give the Architect reach into the retrieval
  engine.** Its freezing must remain a decision, not decay into an accident.
- `authority-matrix-1` (7 files) · `mailwait-flags-1` (2 files — repairs the box reader that emits a
  heartbeat for whatever address it is handed) · `env-presence-probe-1` · `stale-fact-sweep-1`

**Fourteen carry only reports.** None advances a criterion.

Four undelivered stop cards remain on the bus for AG-1..AG-5 and are still valid if the factory
reopens.

## §6 · THE TWO CONSTRAINTS S121 MUST TREAT AS GROUND

**1 · The factory cannot run unattended.** Measured four times in S120: a permission dialog that
stopped five addresses; a boot file asserting a three-day-old measurement as present tense; a
ten-hour wait for a one-line ruling; and five windows generating without executing, **unrecovered by
ESC and continue.** It survived neither the night nor the following morning.

**2 · The verifier is one serial process that sleeps.** Given a decision, one address delivered a
verified fix in seventeen minutes. Given none, five waited ten hours. No improvement in card
quality addresses this — the defect is below the cards.

**Restarting the factory unchanged buys time until the next wedge.** Understanding why it wedges is
worth more.

## §7 · THE VERIFICATION HABITS S120 PAID FOR

Written as instructions because each was learned by getting it wrong, in public, with the numbers:

- **Two lenses are independent only when they differ in what they ASSUME.** A filename search and a
  content grep for the same word are one lens in two coats. This produced a published-and-withdrawn
  finding.
- **One positive probe is not proof of presence**, the mirror of the absence rule. A grep "found" a
  path filter; every hit was a comment, one stating the opposite.
- **Verification must span the same distance as the claim.** Byte counts proved a first crossing and
  were reported as though they proved a pipeline.
- **The delivery-receipt column is dead** and the card gate refuses reasoning that leans on it. Two
  addresses never write it.
- **A heartbeat is a claim by the measured thing about itself. The trunk is an independent witness**
  and outranks it.
- **Before reporting anything of the owner's as missing, open every place he has already given you**
  — connected folders and all their subfolders, the project box, uploads, git history.
- **A wrong finding that reaches the archive is worse than none**, because the next session trusts
  the archive instead of re-measuring.

## §8 · WHAT S121 IS NOT ALLOWED TO DO

Reconstruct S118's or S119's bug bucket from memory. Neither was minted; the hole is dated and named
in `REGISTER-BUG-BUCKET-v56`. **Reconstruction from memory is the defect this project keeps paying
for.**

<!-- END · CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v120 -->
