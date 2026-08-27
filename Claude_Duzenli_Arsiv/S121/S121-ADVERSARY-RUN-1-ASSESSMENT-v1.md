# S121 · ADVERSARY RUN 1 — ASSESSMENT

MEASURED-AT 2026-08-27 09:35Z (12:35 TSİ).

**Subject under test:** the Architect seat's adversary half, run once against a real artefact.
**Instrument:** Codex/OpenAI, IDE-native, file-only channel, no repository and no database.
**Input:** `S121-OPEN-MEASUREMENT-v1.md` (11 762 bytes).
**Output:** `S121-ADVERSARY-VERDICT-CODEX-1.md` — 15 615 bytes, md5
`282303b705ffa617df9b21de2be74cc3`, written 2026-08-27 09:25Z. Verdict: **REFUTED**.

The falsifier fixed in advance (`S121-ARCHITECT-SEAT-v1` §5): *if across the first three artefacts
the adversary surfaces nothing the incumbent had not already flagged in the same document, the
second seat is not paying for itself.*

---

## 1 · SCORED — run 1 clears the bar, on its first artefact

**Four upheld attacks, none of which the incumbent had flagged:**

| # | attack | why it is upheld |
|---|---|---|
| **A-1** | *"the deadlock is remedied"* rests on `pg_proc` existence; existence is not behaviour | **Correct, and it is the incumbent's own law** — ADR-010, declaration is not observation. The incumbent had read the migration source and still wrote a behavioural verdict from a catalogue row |
| **A-2** | *"AG-1 has none"* is an absence claimed from ONE lens (unconsumed rows only) | **Correct, and it is the law the same document quotes at others** — a single negative probe is not proof of absence (S102). The wider lens changed the finding's scope |
| **A-3** | *"a lens 347× wider"* — 695 ÷ 2 = 347.5, and the multiplier is rhetorical, not measured | **Correct.** A number in the Architect's own prose is a claim (TOTAL-45), and this project's §1 says that law binds the Architect's prose specifically |
| **A-4** | *"it costs nothing"* is undefined and therefore false as written; and the document states no falsifier for its own chosen path | **Correct on both.** The second is the sharper one: v1 demanded refutability of others and supplied none of its own |

**All four are repaired in `S121-OPEN-MEASUREMENT-v2`**, and two of them were repaired by running a
*new measurement* rather than by softening a sentence:

- `factory_reclaim` re-measured: deployed body md5 `4d1f9d2a41c6d257550b3e6e42ba46e1`, length 2248,
  **byte-identical to the reviewed migration's body**; `SECURITY DEFINER`; ACL
  `{postgres=X, service_role=X, cwf_lane=X}` with `anon`/`authenticated` absent; `cwf_lane` exists
  and holds EXECUTE. **The claim came back stronger and correctly bounded** — deployed and
  reachable, behaviour untested.
- AG-1 re-measured over all rows: no card from the S120 stop wave (confirmed), **plus** an
  unconsumed `S116-DRAINING-AG1-v1` from 24 Aug that v1's lens could not see, inert under the boot
  rule; and AG-1 consumed a card at 05:28:34Z, 28 minutes before its final heartbeat.

**An adversary that makes the incumbent measure something new has already paid for itself.**

## 2 · THE LIMIT, MEASURED IN THE SAME RUN — and it is the more useful result

**The adversary found ZERO factual errors.** Not one number in v1 was wrong. Every upheld attack
was about *form* — unexhibited evidence, an undefined term, a single lens, an arithmetic slip.

That is not a failure of the model. It is a **structural consequence of the channel it was given.**
It held the document and nothing else: no repository, no database, no endpoint. **An adversary with
no measurement surface can only refute the presentation, never the world.**

The signature is visible in the output's shape. Roughly forty of its paragraphs apply one uniform
standard — *you summarised a measurement instead of pasting its raw output* — to nearly every line.
Applied uniformly, that standard refutes every governance artefact this project has ever written,
including the sealed bake-off rubric itself. **A test that fails everything discriminates nothing**,
and the sealed rubric's own STRONG bands reward discrimination, not uniform severity.

Three of its attacks are category errors worth naming so the next brief prevents them: it attacks a
**plan** for not being a measurement (§1, line 172), a **precedence rule** for not being measured
(line 7-8), and a **verbatim quotation of a law** for lacking a hash. And one is simply mis-stated:
it calls the honestbench conclusion *"second-hand in this document"* — the document did not exhibit
the read, which is the fair half, but the trunk artefacts **were** read directly from the fresh
clone, so "not measured" is wrong.

**And here is what it walked past.** The deepest hole in v1 was that
`F-S121-BOOTSTRAP-REFUTES-ITS-OWN-SESSION-LEDGER-1` picks a winner between carriers that disagree,
partly on the strength of a measurement — *the public endpoint answers* — that **this seat did not
re-run**. Forty paragraphs about missing exit codes, and the one load-bearing carried claim went
unchallenged. v2 §3.1 now bounds it and names the resolving probe.

## 3 · WHAT THIS CHANGES IN THE SEAT DESIGN

The ruling stands: **adversary first, drafter waits.** Run 1 supports it. Two corrections to how the
adversary is run, both cheap, both this seat's error rather than the candidate's:

1. **Give it the repository.** `maymun207/cwf_yaprak` is public. A file-only adversary was the
   incumbent's setup choice, not a constraint, and it is the direct cause of the form-only ceiling
   in §2. With the repo it can check a quoted line, a file's existence, and a count — it moves from
   refuting prose to refuting the world.
2. **Scope the brief to falsifiable claims.** Ask which specific claims, if false, break the
   document's conclusion — and require the attack to name the check that would settle each one.
   The uniform "show raw output" attack is what an unscoped brief produces.

**The falsifier is unchanged and still running.** Two artefacts remain in the trial. If runs 2 and 3
— with the repository attached — still return only form, the seat is a proofreader rather than a
second pair of eyes, and the ruling returns to the owner before any drafter channel is built.

## 4 · WHAT THIS RUN COST

One owner action: a window opened and a brief pasted. No factory, no lane, no bus write, no
credential, no cloud spend. The verdict arrived as a file in the archive folder and was read from
the bridge — **a full machine channel in both directions, with nothing built.**

<!-- END · S121-ADVERSARY-RUN-1-ASSESSMENT-v1 -->
