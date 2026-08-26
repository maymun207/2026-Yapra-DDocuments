# S118-FINDINGS-ADDENDUM-1

MERGE-INTO: `claude/S118-SESSION-NOTES-v1.md` at session close. This file is a
FRAGMENT, not a carrier. It exists because the findings below were measured after
the notes were last written whole, and losing them to a context boundary was the
larger risk. It is not append-only, it supersedes nothing, and it must not be
cited as a source once the merge lands.

Times are UTC on the wire; TSİ = UTC+3.

---

## 1 · THE SEALED ARCHITECTURE DOCUMENT SURVIVES — measured, not inferred

The project-box copy of `ADF-ARCHITECTURE-v1.html` was transcribed to disk and
measured against the digest the S113 payload card named as its target.

| | measured |
|---|---|
| length | 43145 bytes |
| digest | `75EBBB8CBBFEFE673CA0B31A59EEAA26` |
| target named by `ADF-PAYLOAD-ARCHDOC-1of2` | identical on both |

The target was read FROM THE WIRE, not from the Architect's own prose: the digest
and the byte count were pulled out of the payload card's own CLAIMS table in
`relay_inbox`. Two independent numbers agree.

**Binding consequence.** The artefact does NOT need a `v1_1` reseal. S37-1 holds:
the sealed original is intact and can be landed AS v1. A reseal would have been
the honest path only if the surviving copy had drifted, and it has not.

**A second measurement, same read:** the bus holds exactly ONE row whose name ends
`1of2` and NO row whose name ends `2of2`. The earlier transport was never
completed, and because it was gzip+base64 and split mid-stream it cannot be
completed — half a deflate stream is not regenerable. That attempt is STOPPED for good, and
this session replaced it whole rather than trying to finish it.

## 2 · F-S118-BUS-APPEND-ONLY-FORBIDS-SINGLE-ROW-ASSEMBLY-1

The Architect attempted to assemble a large payload into ONE bus row by inserting
a first chunk and appending the rest with `UPDATE ... SET body = body || ...`.

The database refused, verbatim:

```
ERROR:  RI001: relay_inbox is append-only: consumed_at is the only updatable
column (row 08a9b604-...)
CONTEXT:  PL/pgSQL function relay_inbox_update_guard() line 16 at RAISE
```

**This is the real reason the S113 transport was split**, and nobody had written
it down: not a size limit, not an MCP request cap — the bus itself forbids
in-place assembly by design. Any payload larger than one insert is multi-row, and
multi-row is exactly the shape that failed before.

The refusal is a MEASUREMENT and is correct behaviour; the guard is doing its job.
What was missing is that the constraint was nowhere in the transport's design.

**A-REC-S118-BUS-ASSEMBLY-ASSUMED-UPDATABLE-1.** The Architect designed a
transport around an UPDATE without measuring whether the table permits one — and
the guard is named `relay_inbox_update_guard` in a migration read earlier the same
day. This is the assumption class the owner named at S118 in his own words. The
cost was one wasted chunk emission.

**What made the second attempt survivable** and the first one not: the payload is
PLAIN TEXT, so each row is independently readable and its length independently
checkable, and the ordering card names all three members by name in a `scope`
fence with the final digest. An incomplete set is DETECTABLE. Under gzip+base64
it was not — which is why `2of2` going missing was invisible for three sessions.

## 3 · F-S118-FOREMAN-BOOT-POINTS-AT-A-FILE-THAT-HAS-NEVER-EXISTED-1

`.claude/boot/foreman.md:81` tells every foreman that the architecture it serves
is `docs/design/ADF-ARCHITECTURE-v1.html`, and instructs it to read that file.
Line 721 cites the same document for the decision-rights table.

Measured with three lenses, all empty:

- `ls docs/design/` — five files, none of them this one
- `git log --all --oneline --full-history -- 'docs/design/*'` — the artefact never appears
- a name scan of every commit's file list across all branches — nothing

The pointer has been dangling since the boot was written. Every foreman that has
ever booted was told to read a file that does not exist, and none reported it —
which is itself worth a look, because a boot instruction that silently no-ops is
indistinguishable from one that was followed.

Carded to AG-4 as ORDER D of `PHASE-ARCHDOC-LAND-1-v1`: **report the line, change
nothing** — `.claude/boot/foreman.md` is held by AG-2's recovery card.

## 4 · A-REC-S118-EXIT-CRITERION-ABSENCE-CLAIMED-FROM-ONE-PROBE-1

Earlier this session the Architect recorded, as a finding, that the seed's
"ADF done = exit test 6/6" line was UNSOURCED and that no source for a six-part
exit test existed.

**That finding is WRONG and is withdrawn.** The source is
`CWF-S115-SESSION-CLOSE-v1`, section *ADF EXIT TEST — re-measured at close*, which
enumerates exactly six criteria and scores them:

1. zero-paste open — EXPECTED-YES
2. scripts land — YES
3. gate two-way — YES
4. open-from-organ — NO (Kademe 3)
5. archive automation — NO (Kademe 3)
6. owner = consent + look — PARTIAL

Score at S115 close: **3+/6 → ADF NOT complete.**

The defect is named in law and the Architect committed it anyway: *a single
negative probe is not proof of absence* (S102, second half). One search
formulation returned nothing and the absence was written down as a fact. A second
formulation, run today, found it immediately.

**Two axes, not one.** H1–H10 in the architecture document is a HOLE MAP — what is
structurally missing. The six-criterion exit test is an ACCEPTANCE score — whether
the factory runs without hands. They are different instruments and neither
replaces the other. A session that reports one and calls it "ADF status" has
reported half.

The exit test has not been re-measured since S115. Three of its six lines are
about mechanisms this session touched directly, so the score is STALE, not
carried.

## 5 · ARCHITECT ACTS ON THE WIRE — S118, this segment

| artefact | address | bytes | digest verified |
|---|---|---|---|
| `PHASE-AUTHORITY-MATRIX-1-v1` | AG-4 | 7226 | yes, against the local file |
| `ADF-ARCHDOC-PAYLOAD-2-ASSEMBLING` | AG-4 | 14214 | length, then in the concatenation |
| `ADF-ARCHDOC-PAYLOAD-2-PART2` | AG-4 | 14163 | length, then in the concatenation |
| `ADF-ARCHDOC-PAYLOAD-2-PART3` | AG-4 | 14768 | length, then in the concatenation |
| `PHASE-ARCHDOC-LAND-1-v1` | AG-4 | 5956 | yes, against the local file |

The three payload rows were verified TOGETHER, server-side, before the ordering
card was posted: concatenated they measure 43145 bytes and
`75EBBB8CBBFEFE673CA0B31A59EEAA26`. The order card was minted only after that
read returned true — S102-YASA-2, the receiver never sees the order before the
payload is whole.

Both cards cleared the landed preflight 11/11 and the landed auditor with zero
violations before insert.

**The first payload row carries the name `...-ASSEMBLING`** because the append
refusal arrived after it was written and the bus does not permit a rename either.
The name is a scar and the ordering card says so in plain words rather than
hiding it. Renaming would have cost a re-emission of 14 KB to buy nothing but
tidiness.

## 6 · WHAT IS STILL OPEN FROM THIS SEGMENT

- **The exit test has not been re-measured.** Criteria 4 and 5 are Kademe 3 work;
  criterion 6 moved this session. A score is owed at close.
- **Order C's premise is UNMEASURED by design.** Nobody has checked whether a
  formatter, lint hook or seal pass rewrites files under `docs/design/`. The card
  orders a re-measure of the digest as the last act before commit precisely
  because the answer is unknown.
- **The archive automation gap is the same gap.** The document had to cross from
  the Architect's project box into the repository through the command bus, by
  hand-shaped chunks, because H2 is open. When the context organ and the archive
  workflow land, this transport stops being necessary — that is the point of
  `PHASE-CONTEXT-RETRIEVAL-1`, which still has no design document.

<!-- END · S118-FINDINGS-ADDENDUM-1 -->

---

## 7 · TWO MORE, FOUND WHILE POSTING THE LANDING CARD

### A-REC-S118-DECAY-CLAUSE-TRIPPED-BEFORE-DELIVERY-1

`PHASE-ARCHDOC-LAND-1-v1` carried a decay clause naming STAMPING as an
invalidator of its own premise. Measured immediately after posting: AG-4's box
reader had already stamped all three payload rows between 16:36 and 16:37 UTC —
BEFORE the ordering card was minted at 16:37:03. **The card arrived already
invalid by its own text.**

This is the second decay-clause defect of the session and the same shape as
`A-REC-S118-DECAY-CLAUSE-FORBIDS-ITS-OWN-EXECUTOR-1`: a clause written to protect
a premise instead forbade the only path by which the card could run. The pattern
is now twice-measured and deserves a rule rather than a third instance —

**Proposed, for the rule ledger:** a decay clause names events the card's own
delivery and execution CANNOT cause. If reading the card, claiming an address, or
stamping the box can trip it, the clause is scoped wrong.

Corrected by `PHASE-ARCHDOC-LAND-1-v2` under S37-1 — a new version, not an edit —
which scopes decay to DELETION or a MOVED DIGEST and states in the open that
stamping is not a trigger. The correction names the Architect as the party at
fault, in the card, where the lane will read it.

**The underlying mechanism is a known open item:** `readCard` stamps as it reads,
so a payload row is marked delivered by the mere act of looking at it. The scout
measured the same defect from the other side — reading AG-5's card triggered a
real write against AG-5's box. Here it was harmless because a stamp does not touch
the body; that was re-measured after the fact and the digest had not moved.

### F-S118-CP7-BASIS-STALE-1

Card preflight CP-7 refuses any line naming the receipt column unless the line
also says RETIRED. Its stated basis:

> MEASURED: across this lane's 67 rows, `consumed_at` is non-null on exactly 2,
> both stamped 2026-08-13. A filter therefore eliminates nothing.

Measured today: AG-4 alone carries **100 unstamped rows** and the stamp is being
written live by the box reader on every card it opens — four stamps in the last
ten minutes. **The receipt column is not retired; it is in active use.** CP-7's
basis describes a world that ended when `relay_mark_consumed` went live.

The check is not wrong to exist — gating an instruction on the receipt is still a
defect. But a check whose stated MEASUREMENT is false teaches its readers to
discount it, which is the failure mode CP-7's own file warns about two rules
earlier. The card was rewritten to describe the column rather than name it; the
refusal was NOT routed around.

Belongs with the eight items the scout already named for carding.

---

## 8 · THE SEAL LANDED — verified independently, not relayed

`docs/design/ADF-ARCHITECTURE-v1.html` is on master. Measured by the Architect from
a fresh clone, reading the blob at `origin/master` rather than trusting the report:

```
75ebbb8cbbfefe673ca0b31a59eeaa26   43145 bytes
target                             75ebbb8cbbfefe673ca0b31a59eeaa26   43145
```

master `8e7026e1` → `5f099a0e`, PR #410, landed by `npm run land -- 410` at
2026-08-25T17:33:44Z. The merge verdict carries the gate sha
(`DIVERGED-GATE-IDENTICAL`), the tree rehearsed by `git merge-tree`, five CI jobs
by name, and **`still dark : eval-canary · rule26`** — the skipped jobs are named
rather than folded into the green, which is the whole point of that line.

**The ADF landing protocol landed the document that specifies the ADF landing
protocol.** Item 5 of the S114 order, open since S113, is closed.

**AG-4's report corrects the Architect twice and itself once**, and all three are
worth keeping:

- It caught its OWN false alarm before reporting it as a defect: the first
  integrity check compared a CHARACTER count against a BYTE count. Its reason for
  naming it anyway is exactly right — *a false alarm on a seal is the kind of
  finding that gets a real one dismissed later.*
- The same units difference explains why its header lines record the card lengths
  as 6855 and 5936 where the Architect recorded 6885 and 5956. Digests agree, so
  nothing drifted; two instruments were counting different things.
- It confirmed the countermand's premise rather than its falsifier: the box handed
  it the SUPERSEDED version thirty minutes AFTER the superseding one. Its account of
  why it stamped v1 anyway is sharper than the Architect's framing: *"an unstamped
  row returns on every tick, and a box that can never empty trains its reader to
  ignore the count. Acting on a card that says do not act IS actioning it."*

`PHASE-AUTHORITY-MATRIX-1` is pushed as `209e4202` — a source module, its type
declaration, and a conformance test whose commit says it **lands RED**. That is
ORDER B satisfied exactly: a conformance test that passed on its first run would
have been written to agree with what exists rather than with the source.

## 9 · A LENS THE ARCHITECT MISREAD, AND CORRECTED

The Architect reported "no `from_lane` report in 82 minutes" as a worrying signal.
It measured nothing. Reports land in `docs/relay/` in git, per the landed delivery
contract; the bus `from_lane` channel is not the report path at all. An empty
channel that nothing writes to is not evidence about productivity —
`empty ≠ zero`, and coverage is config.

## 10 · OWNER RULINGS, S118 LATE WAVE

**S118-H1 · the modal.** The owner closed AG-1's blocking dialog at roughly
20:44 TSİ. The effect was measured immediately: AG-1's heartbeat went from 1323
seconds stale to beating, and it stamped `S118-RULING-CLAIM-WITHOUT-FORCE-1-v1` at
17:44:53Z. **That is a positive measurement of the diagnosis** — the window was
HUNG on the modal, not stopped, and the bus ruling was waiting where it could be
found the moment the block lifted. Silence was not a stop, and saying so held.

**S118-H2 · landing spend.** Asked whether the foreman's `npm run land` carries a
standing spend consent or needs a named approval per landing, the owner answered
`onaylı`. Recorded as: **foreman landings carry standing spend consent for this
wave.** Bounded on purpose, because a general ruling does not replace an
individual firing (S102) and because this session already recorded
`A-REC-S118-CONSENT-EXTENDED-FROM-ACT-TO-CLASS-1` — one consent covers one act,
never a class. The bound: anything that actually FIRES `eval-canary` (the
expensive gate) still wants a named approval for that firing. PR #410 read
`eval-canary = skipped`, so the cost was not incurred and the verdict says so.
The owner can widen or narrow this in one word.

---

## 11 · S118-H3 · THE TWO PRODUCTS, AND THE SCOREBOARD THAT DOES NOT EXIST YET

The owner restated the product frame. It is not a new ruling — it is written, sealed,
and as of today it lives in the repository. Read from `origin/master`, not recalled:

`docs/design/ADF-ARCHITECTURE-v1.html` §0:
> CWF (Chat With your Factory) ve Yaprak, ADF'nin bugün ürettiği ürünlerdir. Fabrika
> ile ürün aynı depoda yaşıyor olsa da kavram olarak ayrıdır.

§12, the horizon, an owner decision:
> Ufuk, sahip kararı: ADF'nin kendi deposu ve bir Claude Code eklentisi olarak
> dağıtımı ... **Bugün değil; ikinci ürün geldiğinde tetiklenir.**

§12, the product binding table:
> Ürün kabul sözleşmesi: `cwf-sota-definition`; **fabrika işleri SOTA kriterinin
> önüne geçemez (SOTA-1)**

**THREE live instruments, and they are not interchangeable:**

| board | what it measures | measured |
|---|---|---|
| CWF acceptance contract (`cwf-sota-definition`) | the REAL product | 0/16 |
| CWF internal seven-key counter | internal readiness, not acceptance | 6/7 |
| ADF exit test, six criteria | is the car drivable | 2/6 (S118) |

**A fourth does not exist and must not be written yet.** ADF has no acceptance
contract of its own. Writing one today would invent a scoreboard the owner has
explicitly deferred to "when the second product arrives", and every hour spent
scoring it would be an hour taken from the sixteen.

**The ADF exit test is not a SOTA.** It answers one question — can the factory run
a wave without the owner's hands — and it exists because a working factory was
judged the cheaper road to the sixteen. It is a means, and it is measured as one.

### The live governance question this raises

Read from the carriers' own opening orders: S114 opened on Kademe 2, S115 closed
ordering Kademe 3, S116 on the Kademe 3 wave, S117 on the foreman drain, S118 on
the factory refresh. **Five sessions of factory work with the acceptance contract
untouched at 0/16.**

SOTA-1 is unambiguous: the Architect may not defer, shrink or de-prioritise an item
that advances a SOTA criterion, and the ONLY admissible objection is *"this ordering
makes SOTA unprovable"* — admissible only if it names (a) which criterion stays
unproven, (b) by what date it becomes provable, (c) which measurement resolves it.

Nobody has written those three for the factory detour. Either the detour is
justified and owes its (a)+(b)+(c) in writing, or it is a SOTA-1 breach that has
been accumulating quietly for five sessions. **This is the owner's ordering call,
and the Architect owes him the question rather than the smoothing.**

---

## 12 · THE §6 BLOCKING CLAIM IS 21 DAYS OLD AND THE WORK HAS LANDED

The acceptance contract's §6 names three items and says they block **15 of 16
criteria** — "no other item in the project unblocks anything at that scale, which is
why they lead the rollout plan." That sentence is dated **2026-08-04**.

Measured against `origin/master`, 2026-08-25:

| §6 item | evidence on master |
|---|---|
| `BENCH-A2A-1` | `docs/relay/PHASE-BENCH-A2A-1-report.md` — *"CWF becomes an A2A purple agent"*, AG-1, Wave 6, walk item #18. Code: `a2a/agentCard.ts`, `server.ts`, `executor.ts`, `runTask.ts`, `spendFence.ts`, `machineAuth.ts`, `Dockerfile.a2a` |
| `BENCH-BACKEND-MOUNT-1` | `docs/relay/PHASE-BENCH-BACKEND-MOUNT-1-report.md` — AG-1, S98, Wave-5, walk item #16 |
| `BENCH-RESET-1` | `docs/relay/PHASE-BENCH-RESET-1-report.md`; code `api/admin/bench-reset.ts` plus three test suites and an admin pane |
| (plus) `BENCH-SMOKE-1` | `docs/relay/PHASE-BENCH-SMOKE-1-report.md` — the cost organ, DB-first price book, no decimal literal in five production sources |

**The Architect was one step from cutting phase cards for work that had already
landed.** The recon that prevented it took two commands. This is the same defect class
the project instructions were rewritten for at v5_7: a numeric claim in a governing
document, carried for weeks, never re-measured.

**"A report exists" is NOT "the item works."** `BENCH-RESET-1`'s own report carries a
live blocker, in its own CLAIMS table:

> `persistence_class_catalog` is NOT installed, so bench-reset REFUSES in production
> today — READ: pg_proc census via supabase-ro (absent from the result)

AgentBeats mandates fresh state per assessment. If that catalogue is still absent, one
missing database object holds the third leg of §6 shut. It is an **owed Operator
migration**, and the Operator address is CLOSED.

**And the internal counter is this work.** Walk item #16 is BACKEND-MOUNT (S98), #18 is
A2A — both are keys in the internal seven. So the two boards finally read cleanly:

- **internal 7-key tally (6/7)** = *can we be measured at all*
- **acceptance contract (0/16)** = *have we been measured*
- **`#29` A23** = the last key of the first board

The owner's memory that A23 is next was right, and for a better reason than either
party had stated.

## 13 · THE ARCHITECT CORRECTS HIS OWN PROPOSED ORDER

One message earlier the Architect proposed `MA-RERUN-2` as step two of the CWF return.
Reading the contract itself refutes that placement:

- The row it maintains is an **internal** row. Under **C2** an internal, self-run,
  unpublished number is a self-portrait — it advances **no external criterion**.
- **§8** says a stale criterion may not be cited as evidence of SOTA. The honest and
  **free** act is therefore to mark the row **STALE**, not to re-run it.
- Its expiry is event-based and almost certainly already blown: `frameRouting=1` went
  live at S106 and layer-aware `[EntityResolve]` prints in production.

**Ruling: `MA-RERUN-2` leaves the second slot. The row is marked STALE in the v1_6
amendment.** Re-running it becomes worthwhile only when it gates something external.

## 14 · TWO FINDINGS FROM THE ADVISOR NOTE THAT CHANGE WHAT GETS BUILT

Source: `cwf-advisor-note-CS329A-lessons-v2` (2026-08-08, ADVISORY, zero authority; its
CWF state claims are stale by default per RULE-25 and were re-derived where used).

**(a) A23's lever is DISCOVERY, not clarify logic.** `MA-RERUN-2` measured the
entity-unresolved share of clarification blocks at **62.14 % / 76.40 %** (whole corpus)
and **43.45 % / 65.03 %** (like-for-like). The long-tail theorem gives the mechanism:
per-problem `pass@k = 1 − (1 − pass@1)^k`, so **sampling only lifts problems with
pass@1 > 0. A deterministic failure class has pass@1 = 0 and is untouched at any k.**
"Sample more / bigger model" cannot move A23. `DISCOVERY-EXTEND-2` is the measured
lever. This belongs in the register's lessons so the debate resolves by citation.

**(b) The vector infrastructure has not earned its place, and nobody has run the test
that would let it.** The valve is live (`vector.enabled=1`, `vector.engine='qdrant'`),
an encoder image workflow exists, and the consumer is still off
(`vector.toolRetrievalMode=0`). The note's discipline: **before vector infrastructure
is committed, a governed LLM-scan retrieval baseline must be measured under F1
(BrowseComp-Plus)** — CodeMonkeys reached **92.6 % recall at ~$0.7/problem** with plain
LLM-scan over a ~3M-token corpus, approaching oracle retrieval as context grows. That
baseline has never been run. The honest limit is also recorded: LLM-scan cost is linear
in corpus size, so the crossover is itself a measurement and corpus size belongs in the
baseline design. **This is a direction question with money already spent on one side of
it, and it is the owner's to rule.**

## 15 · THE CORRECTED ORDER FOR THE CWF RETURN

1. Land the four phases in flight — the factory's last act, owner-approved
2. **§6 RECON, one card** — measure the LIVE state of the three blocking items and
   confirm or refute the contract's 21-day-old "15 of 16" sentence
3. `persistence_class_catalog` — the owed Operator migration that opens bench-reset in
   production
4. Amend the contract to **v1_6**: internal row STALE, §6's measured state, the S118
   rulings, and `BENCH-SMOKE-1`'s metered figure if one exists
5. The first external measurement — which criterion is cheapest and readiest is an
   output of step 2, not a guess made before it

---

## 16 · THE LANDING ORDER — ONE LANDED, ONE REFUSED, AND THE FOREMAN CORRECTED THE ARCHITECT TWICE

`S118-LANDING-ORDER-1-v1` returned a report that is the best artefact of the session.

**`#407` (factory-recovery) LANDED** — master `61558f98` → `51826e6f`. It was green at
its own head the whole time; the only thing between it and master was that **nobody had
said "land this one."** The Architect's missing wave card was the entire cause, and the
card closed it.

**`#409` (authority-matrix) REFUSED on a measured red** at head `209e4202`, reported at
the sha the red was measured at:

```
gate: Build and Test      build (24.x) = FAILURE
changes = success · report-schema = success · Vercel = success
eval-canary = SKIPPED · rule26 = SKIPPED     (named, not folded into anything)
```

### The foreman's first correction — about its OWN conduct, unprompted

The card claimed the two were "stepped over". The foreman refused that framing about
itself: it did not choose a different order, it **landed whatever read `CLEAN` at the
moment it looked**, and those two never did — one was `BLOCKED` on a real red, the other
`BEHIND` on every tick. *"The sequence I ran was not a sequence at all: it was
opportunistic, driven by whatever the mergeability field happened to say."* It named
that as a property of its own behaviour rather than only as a gap in the Architect's.

### The foreman's second correction — it declined an order, correctly

ORDER A said attempt the landing. It declined `#409` on a measurement, which DECISION
RIGHTS grants, and the reason is mechanical rather than preference: `#409` is `BEHIND`,
so the land script's step 2 does `update-branch`, which **pushes a new head and starts a
fresh CI run** — a re-run in everything but name, forbidden by ORDER B in three separate
sentences — and it would **orphan the very sha the refusal is measured at**, destroying
the artefact the card called its most valuable product. **Better judgement than the
order it was given.**

## 17 · A-REC-S118-ORDERED-A-RED-TEST-THROUGH-A-GREEN-GATE-1 — CONFIRMED, HALF

The Architect's hypothesis was stated as a hypothesis and came back **partially
confirmed with a named correction**. Both halves matter and they have different owners.

**(A) The C-group red is the Architect's, and the hypothesis holds.** The conformance
assertion failed exactly as designed — `CONFORMANCE: 6 disagreement(s)`, each named:
shape-decides-claimability, role-binding-is-a-code-literal, boot-prose-binds-role-to-
ordinal, and three `UNMEASURED-live-*` entries. A card that orders a deliberately red
test through a gate that requires green is **unlandable by construction**, and that is
an Architect error.

**RULING — the remedy is a shape change, not a softened assertion.** The conformance
comparison becomes a REPORTING instrument: it prints every disagreement, writes them to
a governed document, and **exits 0**. The redness lives in the FINDING, not in the gate.
This is principled, not convenient: a gate exists to stop defects ENTERING; a
conformance report exists to measure a gap that already exists everywhere. Dressing the
second as the first blocks the very source that would let anyone close the gap. **The
falsifier survives the change** — the test still FAILS if the comparison finds ZERO
disagreements (proof it was written to agree with the world rather than with its
source), and it still fails if it cannot run at all.

**(B) The B-group red is NOT the Architect's hypothesis and is the larger finding.** Two
assertions failed that are a different class entirely — they assert the comparison FIRES
on named drift, and it did not:

```
B · claim 3 · catches the bus admitting a report author the nonce verb refuses
    expected [ …(6) ] to include 'BUS-ADMITS-AN-AUTHOR-THE-VERB-REFUSES'
B · also catches reply-authority drift the repository cannot rebuild
    expected [ …(6) ] to include 'REPLY-AUTHORITY-DRIFT'
```

**The instrument cannot see the defect it was commissioned to see** — and that defect is
the `disagree` anchor in the commissioning card's own CLAIMS table. The three
`UNMEASURED-live-*` entries say why: **the detector has no live-read path at all**, so
it cannot compare a source against a world.

**RULING — this is NOT repaired by deleting the assertions.** It is repaired by giving
the comparison a live side. If a producer lane has no database read path — UNMEASURED,
and it is the first thing the v2 card must establish — then the live side must be
captured into a GOVERNED SNAPSHOT written by a lane that can read it, and the test
compares source against snapshot with **the snapshot's own freshness as a measured
field**. A comparison whose live half is permanently `UNMEASURED` is a self-portrait in
the same way an internal benchmark is.

**On whether `ROLE-BINDING-IS-A-CODE-LITERAL` and
`F-S118-LANE-NONCE-IS-PUBLIC-SO-IT-AUTHENTICATES-NOBODY-1` are one finding:** the
foreman declined to assert it and was right to. They are ADJACENT, not identical — the
nonce finding is about AUTHENTICATION (a public nonce authenticates nobody), the literal
is about WHERE ROLE IS BOUND. Both stay open, separately.

**RULING ON SEQUENCE — the v2 card is NOT cut in this session.** The owner approved
closing after this wave. Cutting a build card now re-opens the wave instead of closing
it, and nothing is lost by waiting: the work is on a branch, the red is measured at a
named sha, and the request stays open across the boundary carrying both. `#409` and its
red become the FIRST build item of the next session, named in the opening order.

## 18 · MASTER CARRIES AN UNAPPLIED MIGRATION — named, per ORDER C

```
supabase/migrations/20260825153000_factory_recovery.sql
blob df2a191d…  · 207 lines · on master at 51826e6f
```

**Merging a file is not applying a migration.** The statements have not executed against
the live database. Application belongs to the Operator, whose address reads `CLOSED`
with heartbeat never — **there is no live window able to apply it.**

The foreman named the thing that makes this dangerous rather than merely pending:
**nothing in the poll tick, the landing gate, or `architect:open` reads pending
migrations, so the disagreement between repository and schema is SILENT.** It is named
here, must be named in the wave report, and must be named again by whoever next reads
the factory state. Opening an Operator window is a real-world act and therefore the
owner's surface — it is not urgent tonight, and it is not something a machine can do.

## 19 · THE SAME TRAP, CAUGHT BY THE FOREMAN THIS TIME

The two-dot diff of `#407` against master read as a catastrophe — four files the
Architect had landed this same wave showing as 315, 220, 308 and 350 line deletions,
plus a gutted poller. The foreman measured instead of reporting the fear:

```
git merge-tree --write-tree origin/master <head>  ->  e4876258…
  all four files SURVIVE in the rehearsed tree
  merged scripts/mail-wait.mjs == the blob #408 landed, BYTE-IDENTICAL
```

**The rehearsed tree it computed by hand is the same tree the land script rehearsed and
master verified byte-identical after the merge.** This is the third time in one session
that a two-dot diff nearly produced a false report, and the second time it was caught.
The Architect fell into it twice today; the foreman did not fall into it once. The rule
is landed in `CLAUDE.md` section 4 and it needs no amendment — it needs reading.

---

## 20 · F-S118-PIPE-DIALOG-CLASS-STILL-LIVE-1 — and a sentence the Architect made too broad

A permission dialog reached the owner's screen during the recon:

```
grep -n "docker run\|-e A2A\|SUPABASE\|ANTHROPIC\|OPENAI\|env " \
     /private/tmp/ag3-sota-recon/docs/relay/PHASE-BENCH-A2A-1-report.md | head -25
```

**This is NOT the class that was closed tonight.** The force class was measured and
fixed — a plain push and a force push creating the same shape of throwaway ref were run
back to back and only the force form raised a dialog. That finding stands.

**This is the PIPE class, and it was never touched.** `CLAUDE.md` on master, lines
173–176, verbatim:

> **Every bash call is ONE command.** No chains, no pipes, no heredocs. Permission
> rules match by command PREFIX, so a six-command chain cannot match one by
> definition. This is not a style preference — it is the precondition for the
> permission system working at all.

The lane piped `grep` into `head`. A prefix rule cannot match a pipeline **by
definition**, so the harness had no rule to match and asked. **The mechanism did
exactly what it is for.** The defect is the lane's, not the harness's, and the law it
broke is landed and unambiguous.

The command itself was on-card and harmless — a read-only grep over a COMMITTED report,
answering ORDER A's "name what a third party would have to be given to run it." Consent
was correct. Expect more dialogs of this same class from this recon.

**A-REC-S118-DIALOG-CLASS-OVERCLAIMED-1.** The Architect told the owner *"the thing that
made you a monkey at the screen is closed."* Too broad. **One class** closed — the force
class, and that half is measured. The pipe class remained live the whole time and this
dialog is the proof. The honest sentence was "the force class is closed", and the
difference between that and what was said is exactly the kind of quiet widening this
project keeps paying for.

**Not carded tonight** — same ruling as `#409`: cutting a card now re-opens a wave the
owner has approved closing. It enters the next session's opening order as a named item,
with its own acceptance test: a lane's whole recon runs with zero dialogs, proven by a
real run rather than by reading the rule.

**One thing to watch in the recon report:** the grep pattern searches for
credential-shaped names. `CLAUDE.md` section 6a governs the result — *if you FIND a
credential in a file, name the FILE and the VARIABLE, never the value.* The report must
be read against that before it is quoted anywhere.

---

## 21 · THE §6 RECON RETURNED — AND IT REORDERS THE OWNER'S PLAN

`PHASE-SOTA-HARNESS-RECON-1` came back on `phase/sota-harness-recon-1`. Its opening
sentence is the finding:

> **The harness the acceptance contract calls blocking is NOT BLOCKED BY CODE.** Every
> code floor the honestbench phase named has since been repaired and wired; every phase
> has landed. What stands between this system and its first external measurement is
> deployment, one governed data write, and a spend authorisation — none of which is
> build work.

### The four verdicts

| surface | verdict |
|---|---|
| agent-to-agent | **READY-WITH-NAMED-GAP** — built, fenced, containerised, and proven by execution over a real wire in four independent falsifiers. *"Nothing about it is a promise."* The gap: **it exists nowhere a stranger can reach.** No image pushed, no registry credential, no long-lived host — only Vercel, which the code itself names as unable to hold the endpoint open. |
| fresh-state reset | **READY-WITH-NAMED-GAP** — the catalogue is live; the documented refusal can still fire but *no longer for the documented reason*. |
| foreign-backend mount | **PARTIALLY PROVEN** — the code-change half is now **PROVEN ABSENT** (dispatch reads `backends.tool_pattern` DB-first and is wired into the turn pipeline; admin validation unions live registry over code floor; the flat-path collision hole is closed with a traced record). The mount half is **UNPROVEN BY EXECUTION** — no stranger's server has ever been mounted, and the scoring table is five rows of `NOT RUN — not a pass`. |
| cost instrument | **READY-WITH-NAMED-GAP; the metered figure is UNMEASURED** — both bases built, and the honest one is careful (per-rep telemetry, refuses the total rather than under-report). **No METERED figure exists**; both figures on record are FIXTURE figures and the instrument labels them so. **The contract's cost line being an Architect's estimate is therefore correct and correctly labelled.** |

### The contract's blocking sentence — answered

> **"Partly true, and stale in its reasoning."**
>
> Still true: not one surface has been exercised end to end and no external measurement
> has ever been taken. **No longer true — and this is the part that would have cost a
> wave — is the implication that BUILD WORK unblocks them.** Cutting build cards against
> this list would be commissioning work that already exists.

### WHAT BLOCKS THE FIRST EXTERNAL MEASUREMENT — four things, none of them code

1. A long-lived host with a public HTTPS URL for the agent server — **not configured anywhere**
2. A registry credential if the image route is taken — **absent from the environment, measured**
3. `A2A_TRIGGER_SECRET` and `A2A_ACTOR_USER_ID` (a real `auth.users` uuid, not a sentinel), plus `A2A_CARD_URL` set to the address peers actually use
4. A public HTTPS endpoint for the honestbench instrument — *"containerised and locally proven and deliberately never published; publication is an owner decision, not an oversight"*
5. The Operator's two data rows: the `backends` identity, and the global MCP server row in `mcp_global_settings` — **not** `mcp_settings`, which is per-user
6. A spend authorisation, and a ruling on whether the synthetic injector is paused for the run window
7. For the reset specifically: a service client on the target and a session holding `LEARNING_MANAGE`

### THE CONSEQUENCE FOR THE PLAN — measured, not argued

The owner's approved shape was **Wave 9 build → Wave 10 benchmarks**. The recon refutes
its premise: **the benchmark path is not blocked by build at all**, so the two waves sit
on DIFFERENT critical paths and do not compete. Three of the blockers are the owner's
surface exclusively — a host, an Operator window, a spend ruling — and none of them
waits on a single line of Wave 9.

**Under SOTA-1 this removes the question rather than answering it.** The Architect no
longer owes an (a)+(b)+(c) objection for deferring the first measurement, because the
correct ordering is not a deferral: the benchmark unblocks start immediately and in
parallel, and Wave 9 proceeds beside them.

### FOUR FINDINGS THE RECON NAMED AND DID NOT REPAIR (ORDER F honoured)

1. **The reset endpoint's docblock is stale and misleads its first reader** — it says the catalogue "is not installed yet". It is installed. A reader trusting the comment concludes the organ is unarmed when its precondition is met.
2. **`F-S99-BENCH-RESET-UNARMED` rests on the same retired fact** and deserves a re-read against today's catalogue rather than another inheritance.
3. **The honestbench headline is now historical** — *"backend identity is DATA is HALF FALSE"* was true and is no longer. Quoting the headline without the repair quotes a fixed defect as a live one.
4. **The discipline note, and it is load-bearing:** *"A landed report proves a phase ran, and every one of these phases says so itself. The install phase declined to claim its own apply; the A2A phase declined to claim a push it never attempted; the harness phase declined to claim a single mode passed. That discipline is why this recon could be done from source at all — the reports do not overclaim, so what they leave NOT-READ is exactly where the live gaps are."*

**The card wrote no code.** `git diff --name-only` empty; the only untracked file is the
report. Every DO-NOT-TOUCH surface was read-only. ORDER F held.

---

## 22 · F-S118-RELEASE-PATH-STILL-ON-FORCE-1 — predicted before it happens

The owner asked what he will see on the lane screens during the close. Measured from
the producer boot on master rather than predicted from memory — line 409:

```
3. RELEASE your lane ref — a lease PINNED to your own nonce:
     git push --force-with-lease=refs/heads/lane/AG-N:<your-own-nonce> \
              origin :refs/heads/lane/AG-N
```

**The RELEASE path is still on the force form.** The allow-list does carry
`Bash(git push --force-with-lease:*)`, and yet AG-1's probe measured that *a plain push
and a force push creating the same shape of throwaway ref were run back to back, and
only the force form raised a dialog.* The allow-list entry is therefore not what
decides it.

**So a dialog is EXPECTED on each screen at the release step, and it is not a failure
of the claim fix.** AG-1's card scoped the ACQUIRE path — the claim walk, the claim
command, and `CLAUDE.md` section 2's claiming section. **The release path was never in
its scope.** The force class is closed for CLAIMING and still live for RELEASING.

**The lease here is a real safety property and must not be removed casually:** it is
pinned to the lane's OWN nonce, so it refuses to delete an address that somebody else
has re-claimed in the meantime. Whatever replaces it must keep that refusal — the
acquire-side fix worked because a plain push's non-fast-forward rule gave the same
guarantee for free, and the delete side has no equivalent for free.

**Why this matters beyond tonight:** tomorrow's cold start is the acceptance test for
*zero dialogs when a lane CLAIMS an address.* A release dialog tonight and a claim
dialog tomorrow are different classes in different code paths, and reading one as the
other would either falsely fail sound work or falsely pass unfinished work. **Three
dialog classes are now named:** the claim/force class (CLOSED), the pipe class (LIVE,
`F-S118-PIPE-DIALOG-CLASS-STILL-LIVE-1`), and the release/force class (LIVE, this
finding).

**One more thing the owner will not see: a window closing itself.** The boot ends the
poller when a `*-CLOSING-*` card for that lane is read; it does not end the window. The
lane prints its last measurement and sits idle. **Closing the windows is the owner's
real-world act** and no card can do it for him.

---

## 23 · S118-H4 · OWNER RULING ON VOCABULARY — the word is STOPPED

The owner ruled the word "death" out of this project's vocabulary in favour of
**STOPPED**.

**It is not a politeness change, and adopting it silently would miss why it is right.**
This project's standing law is that **silence is never evidence that a lane has
stopped** — the Architect is forbidden to infer it and must write `UNMEASURED`
instead. Meanwhile the closing artefact was called a *death certificate*. **The
vocabulary argued against the law every time it was read.**

A STOP is a STATE: it is measured, and it is reversible — S118 proved it twice, once
when AG-1 was HUNG on a modal and resumed the moment the block lifted, and once when
five heartbeats stalled together for fourteen minutes and came back with nobody
touching anything. **Death implies a fate and a cause**, and neither is ever measurable
from a quiet window.

**Adopted, with the distinction preserved:**

| was | is |
|---|---|
| `DEAD` | `STOPPED` — the process is gone |
| `LOOP-DEAD` | `LOOP-STOPPED` — alive, and making no progress |
| `HUNG` | `HUNG` — unchanged, blocked on something |
| `BUSY` | `BUSY` — unchanged |
| death certificate | **stop certificate** — still two halves in two systems: a `CLOSED` state row **plus** a released ref |

`HUNG` stays distinct and must: a hung window and a stopped one need different
remedies, and only the owner's screen separates them.

**Where it is NOT yet changed, named rather than quietly left:** the landed boots carry
the old word — `producer.md` line 120 states *"the death certificate is a `CLOSED`
state row plus a released ref"* — and **the Architect does not write repository files.**
A lane changes it, and it belongs with the boot work already inherited. Until then the
repository and this vocabulary disagree, and the disagreement is recorded here rather
than discovered later.

**The closing cards already on the bus keep the old word.** They are immutable under
S37-1, the bus is append-only, and they are being read as this is written. Re-cutting
five cards to change a noun would risk a live close to buy nothing — the meaning is
unambiguous either way. The vocabulary starts at S119 and the bootstrap carries it.

---

## 24 · THE FACTORY STOPPED — clean, and every certificate whole

Measured 2026-08-26T01:55:47Z (04:55 TSİ).

| address | state row | address ref | certificate |
|---|---|---|---|
| AG-1 | `CLOSED` | released | **COMPLETE** |
| AG-2 | `CLOSED` | released | **COMPLETE** |
| AG-3 | `CLOSED` | released | **COMPLETE** |
| AG-4 | `CLOSED` | released | **COMPLETE** |
| AG-5 | `CLOSED` | released | **COMPLETE** |

`factory_state` mode = **`SHUTDOWN`**. `git ls-remote origin 'refs/heads/lane/*'`
returns **nothing** — not one address ref survives.

**The sequence, from the event log, is exactly what the cards ordered:**

```
01:37:09  AG-3 → CLOSED
01:37:09  AG-1 → CLOSED
01:40:47  AG-2 → CLOSED
01:42:22  AG-4 → CLOSED
01:46:00  mode → SHUTDOWN        (foreman, still holding its own address)
01:46:01  AG-5 → CLOSED          (one second later)
```

**The foreman waited for all four producers, wrote the mode while it still held the
credential the mode verb spends, then closed itself, then released last.** One second
between the mode write and its own close — that is a window executing an ordered
sequence, not a window improvising.

**Nothing was lost and nothing was swept.** Unlanded branches went **9 → 14**: the
original nine all survive, and five closing reports were added, one per address.
`origin/master` did not move — landing was forbidden during the close and none
happened.

**What this stop measured, beyond itself:** the earlier cold shutdown in this same
session needed **three hand-written database rows** to come back. This one took none.
Five windows read one card, ran a five-step sequence in the right order, and produced
ten halves of five certificates without a single intervention. The only owner surface
touched was consent — the release dialogs, which are the force class in the release
path (`F-S118-RELEASE-PATH-STILL-ON-FORCE-1`) and were predicted before they appeared.

**The board S119 inherits is clean**: no held address, no half certificate, no lost
work, and a mode that says plainly what happened.
