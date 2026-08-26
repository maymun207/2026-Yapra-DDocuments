# CWF IMPLEMENTATION ORDER — S120 → v32

<!-- SUPERSEDES v31. Written WHOLE (A-REC-S101-7). SOTA-1 governs: nothing SOTA-relevant defers
     without (a)+(b)+(c) in writing.
     v32 EXISTS BECAUSE FOUR OF v31'S ITEMS WERE MEASURED FALSE IN S119 AND S120 — not stale in
     emphasis, FALSE in fact. Two of them are owner-gated items the owner was still being asked to
     decide, and one of those was already done. §0a prints every move with the measurement that
     produced it. Nothing from v31 is deleted; items that closed are shown closed, with evidence. -->

## §0 · THE ORDER CHANGED AGAIN, AND AGAIN THE REASON IS MEASURED

v31's §0 was right about its own subject and is carried unchanged: **the harness is not blocked by
code.** What v31 got wrong is the list of what IS blocking, and it got it wrong in the most expensive
direction — **it carried owner decisions that no longer needed deciding.**

> **THE OWNER-SIDE CRITICAL PATH IS TWO DECISIONS, NOT FOUR AND NOT THREE:**
> **a long-lived host, and a spend authorisation.** Everything else on the old owner list is either
> done, or is build work that was wearing an owner label.

**This is a SOTA-1 matter, not bookkeeping.** An order that routes work through an owner decision that
does not exist manufactures a deferral out of nothing, and SOTA-1 removes the ordinary grounds for
deferral entirely. Every correction below shortens the path to a measurement.

## §0a · CARRY-DIFF FROM v31 — what moved, and what moved it

| item | v31 said | v32 says | measurement |
|---|---|---|---|
| **A4** honestbench endpoint | *"deliberately never published; publication is an owner decision"* — **Owner ruling** | **CLOSED@evidence. IT IS PUBLISHED.** | the endpoint answers with the instrument's own hash-pinned payload — measured by a lane, then INDEPENDENTLY by the Architect from a different network |
| **A3** Operator's two rows | parallel with A4 | **DOWNSTREAM of A4** | S119: the prepared packet carries a placeholder for an endpoint that did not exist and says *"Do not run this yet."* Never written into the order until now |
| **B0** unapplied migration | *"is on master and has never executed against the live database"* | **CLOSED@evidence. APPLIED.** | the version row is present and the recovery verb exists as SECURITY DEFINER — read from `pg_catalog` |
| **B6** `#29`'s lever | *"its measured lever is DISCOVERY, not clarify logic; DISCOVERY-EXTEND-2 is the lever"* | **REFUTED, twice over** | S119: the discovery substrate is present AND populated. S120: the real defect is one seam past the resolver, and widening the collapse alone makes the system ask LESS |
| **B7** context retrieval | a queue item | **NOT SOTA-GATING; a real but separate debt** | S119: zero product source, zero product tests, zero ADRs — it is the Architect's own context, not CWF's runtime |
| **B2** land the recon branch | *"belongs on master before anyone quotes it"* | **DO NOT LAND AS-IS** | that report contains the sentence A4's closure refutes; landing it puts a refuted claim on master |
| the honestbench blocker | implicitly the endpoint | **the DETERMINISTIC SCORER, and it is BUILD WORK** | four independent lenses: the adversary modes are implemented code; nothing applies the frozen pass conditions |
| `#81` BACKEND-DISCOVERY-1 | a reading nobody had done | **UNBLOCKED** — bytes located, digest MATCHED | the document repository is reachable and the specification's digest equals the one recorded in the design index |

**NOTHING IN v31 WAS DELETED.** Four items closed or were refuted by measurement; each is shown with
what measured it.

---

## §1 · TRACK Z — THE TRUNK. NOTHING ELSE LANDS UNTIL THIS DOES.

**NEW IN v32, AND IT SITS ABOVE BOTH TRACKS**, because it is not a competitor to them — it is the
floor they both stand on. v31 had no such item because the condition was not known.

**Z1 · THE TRUNK IS RED AND THE CORPUS REPAIR IS BUILT.** A single defect — four orphaned relay
artefacts and one governed artefact with eighteen grammar violations — reddens the build gate AND all
three jobs of the scheduled compatibility workflow. **One repair closes both reds.** It is built,
verified by the Architect's own audit at the branch head (zero orphans, zero violations, zero
deletions across all four changed files), and waits on **one named spend approval** because landing it
fires the expensive canary.

**Z2 · THE HOLE THAT CREATED IT IS CLOSED IN THE SAME BRANCH.** A documentation-only change concluded
the build job green with its test step SKIPPED, so bad artefacts landed through a gate that asserted
nothing. **Without Z2, every repair of Z1 decays on the next landing.** The two are one branch by
design.

**Z3 · THE LANE COMMAND FORM.** A permission rule matches a command's FIRST token, so a command
leading with a variable assignment is unmatchable by construction and raises a dialog. **Measured cost:
five addresses silent for roughly twenty-five minutes, cleared only by the owner's hand.** Under
PLATINUM that is a design fault, not a discipline problem. In flight as a diagnosis.

> **ORDERING IS NOT NEGOTIABLE: Z1+Z2 land before anything else in this document lands.** Not because
> they are more important than a benchmark, but because a red trunk makes every other landing either
> impossible or dishonest.

---

## §2 · TRACK A — THE BENCHMARK UNBLOCKS

**A1 · A long-lived public HTTPS host for the agent server.** Built from `Dockerfile.a2a` or from a
pushed image. Not configured anywhere; Vercel cannot hold this endpoint open and the code says so
itself. **Owner decision + spend. STILL OPEN.**

**⚠ AND IT IS NOT WAITING ON THE OWNER'S JUDGEMENT.** The comparison's tie-break is the runtime floor;
the floor needs a completed build; **no build has completed.** S120 measured why the last attempt died
— the container VM restarted underneath it, proven by a kernel boot banner 2.5 seconds after the build
died, containers restarting as a group with zero restart counts, and no kill line in three logs.
**WHY the VM restarted is UNMEASURED.** Asking the owner to choose a host before that number exists is
asking him to decide without the evidence the decision was defined to rest on.

**A2 · The credential set.** `A2A_TRIGGER_SECRET` and `A2A_ACTOR_USER_ID` — the latter a real
`auth.users` uuid, **not a sentinel** — plus `A2A_CARD_URL` set to the address peers actually use.
Env-only, never a settings file, never a transcript. **Owner hand.** Carried unchanged.

**A3 · The Operator's two data rows** — the `backends` identity and the global MCP server row in
`mcp_global_settings` (**not** `mcp_settings`, which is per-user). **DOWNSTREAM OF A4, which is now
closed — so A3 is UNBLOCKED and needs only an Operator window.** Its packet's placeholder can now be
filled with a real endpoint.

**A4 · A public HTTPS endpoint for the honestbench instrument. — CLOSED@evidence.**
The repository is public, the instrument answers on a public path, and its payload carries both
configuration hash pins plus the honesty control. **Measured twice, independently, from two networks.**
**No owner ruling is required and none should be requested.** Two carriers still assert the opposite
and both are refuted — see §5.

**A4b · THE DETERMINISTIC SCORER — NEW, AND IT IS THE REAL BLOCKER.** The adversary modes are
implemented code: four families, five dial positions, one null control, with the dial file declared the
only authority over behaviour. **What does not exist is the program that applies the frozen pass
conditions.** Four independent lenses agree.

**This is BUILD WORK and it was wearing an owner label.** Its own precondition is that the frozen
conditions be located: they live in a phase brief and an amendment that are **cards, not files**, and
they are **not on the live bus** — measured by an address-scoped read and by the Architect's unscoped
read of the entire table. A search of the session archive is in flight.

**⚠ THE TRAP, RESTATED BECAUSE IT IS EASY TO LOSE:** the contract requires the benchmark to ship with
**at least one adversary mode this system currently fails**, and its scoring authored **before** results
are known. A scorer written from a paraphrase of the frozen rules would silently author scoring after
behaviour is known. **Verbatim or not at all.**

**A5 · A spend authorisation**, plus a ruling on whether the synthetic injector is paused for the run
window. R4 stands: 2M tokens for the harness proof, $10 per measurement round (provisional, owner's
words *"şimdilik $10 yapalım görelim"*), and a full-round estimate of ≈400M tokens ≈ $100 Flash-class
that **remains an estimate** until `BENCH-SMOKE-1` reports metered actuals. **The budget clause is
absolute: money decides how many criteria get measured, never what counts as measured.**

**A6 · Then the first external measurement.** Which criterion is cheapest and readiest is an OUTPUT of
A1–A5, not a guess made before them.

---

## §3 · TRACK B — THE BUILD QUEUE

**B0 · The unapplied migration. — CLOSED@evidence.** The version row is present and the recovery verb
exists as SECURITY DEFINER. v31's sentence that it *"has never executed"* is measurably false at the
live database.

**B1 · `PR #409` and its measured red.** Carried unchanged from v31, and its remedies remain
non-negotiable: the conformance comparison becomes a reporting instrument that exits 0, and the
detector's missing live-read path is fixed by a live read or by a governed snapshot with measured
freshness — **never by deleting the two assertions that failed.**

**B2 · The recon branch — LAND WITH A CORRECTION, NOT AS-IS.** v31 wanted it on master so it could be
quoted. **It carries the sentence that A4's closure refutes.** Landing it unchanged would put a refuted
claim on the trunk and make it quotable, which is exactly the harm v31 wanted landing to prevent. The
correction rides with the landing or the landing waits.

**B3 · The dialog classes — MERGED WITH Z3.** v31 named the pipe class; S119 measured three distinct
dialog causes and S120 measured a fourth instance whose cost was the whole factory. They are one
programme now. **Acceptance test, unchanged and now much harder: a lane's whole recon runs with zero
dialogs, proven by a real run rather than by reading the rule.**

**B4 · The carrier merge debt — LARGER THAN v31 RECORDED.** `S118-FINDINGS-ADDENDUM-1` into
`S118-SESSION-NOTES`, plus S118 versions of the bug bucket, the open-items register and the session KB
— **and now the S119 and S120 versions of all three, the implementation order, and the bootstrap.**
The bootstrap's anchor table is the LAST act of a close, never the first.

**B5 · The stale-fact sweep — GREW.** v31 named three documents that will mislead their next reader.
S120 adds: two carriers asserting an unpublished instrument that is published, a source comment
asserting a pending migration applied thirteen days earlier, and v31's own B0 and B6 sentences.
**Every one of them is a document that reads as live state and is not.**

**B6 · `#29` A23 — THE LEVER WAS WRONG AND THE REAL DEFECT IS NAMED.** It still traces to a criterion
(TIER A · Gaia2, the clarification gate), so SOTA-1 still protects it from deferral. **But v31's lever
is refuted:** the discovery substrate is present and populated, and widening the resolver collapse
alone would make the system ask LESS, not more.

**The defect that reaches a user is one seam further on.** On a live tie the system tells the user, in
his own language, that the token was found in **no connected source** — while the resolver had just
returned the entities answering to it. The candidate list is structurally discarded.

**Two things are now known and both constrain the repair.** The tied rows are byte-identical in every
field a user can read and differ **only in the parent they hang from** — and the parent is dropped in
the clarify stage's own candidate map. **And the ordering constraint is hard: the ask shape must exist
before the carry-through lands, or the repair converts a badly-worded question into silence.**

**B7 · `PHASE-CONTEXT-RETRIEVAL-1` — OUT OF THE SOTA QUEUE, STILL A DEBT.** Measured: zero product
source files, zero product tests, zero ADRs. It is the Architect's own context access, not CWF's
runtime. **It gates no criterion.** Its design document is still owed and it stays on the register.

**B8 · `#81` BACKEND-DISCOVERY-1 — UNBLOCKED, NEW STATUS.** The specification's bytes are located in
the document repository and its digest MATCHES the one recorded in the design index. **The engine that
blocked it was a reading, and the reading is done.** What remains is ordinary work.

**B9 · THE DESIGN CORPUS AMBIGUITY — NEW.** Two of the eight owner-held design documents carry a
second, different blob under the same filename, and a second class exists in the opposite direction —
one blob wearing two version names. **A version name does not identify a document in that corpus**, and
every future reading of an owner-held design document inherits that. The index cannot see either class.

---

## §4 · CARRIED, WITH THEIR TRIGGERS UNCHANGED

- **`MA-RERUN-2` is NOT a queue item.** It maintains an internal row that advances no external
  criterion; the honest and free remedy is to mark it **STALE** in the v1_6 amendment. It re-enters
  only when it gates something external.
- **`VECTOR-QOS` before any engine switch** (owner verbatim, carried since S115) — and the open
  question stands: the live engine already reads `qdrant`. **UNMEASURED** whether VECTOR-QOS landed
  first. Not an accusation; a measurement owed.
- **The vector infrastructure has not earned its place.** Before it is committed, a governed LLM-scan
  retrieval baseline must be measured under **F1 (BrowseComp-Plus)**. That baseline has never been run.
  **Owner's direction call**, with money already spent on one side of it.
- **`#82b` Design-RAG PARKED** (owner: *"ASLA UNUTMA"*). **S120 note: nothing measured this session
  unparks it.** The specification's envelope was measured; not one word of its gated content was read.
- **Qdrant owner surface deferred · `ADF-HEADLESS-LANE-1` deferred · org repo migration · census
  re-run cadence.** Carried.
- **`RULE26-HARDEN-1` → v1.1** (R8, owner: *"boş beleş iş yapmanın kimseye faydası yok"*).
- **The budget fence.** Owner ruling stands: **watch, no action.** STANDING EXCEPTION: if the stop
  actually FIRES, tell the owner immediately and say nothing else about it. Report SHAPE only; never
  read the fence logs into an artefact. **S120: the check is red and the stop has NOT fired.**

---

## §5 · THE TWO SCOREBOARDS — a close that names only the first is an incomplete close

**(A) THE INTERNAL SEVEN-KEY COUNTER — 6/7.** Open: `#29` A23. **This is an internal readiness measure
and IS NOT THE ACCEPTANCE CRITERION.**

**(B) THE ACCEPTANCE CONTRACT — 0/16.** Sixteen external criteria, none measured. **SOTA-1 binds
acceptance to (B).**

> **Turning the seventh key does NOT satisfy SOTA-1.** Any session closing on *"the gate is 6/7"*
> without naming (B) has closed incompletely.

**WHAT CHANGED IN S120, AND IT IS THE FIRST REAL MOVEMENT ON (B) IN MANY SESSIONS:** the reason given
for all sixteen being unmeasured was the state of the measuring instrument. **That state is now known:
the instrument is published and its adversary modes are code; only the scorer is missing.** The
sixteen are still 0/16 — **nothing here retires a criterion, and only proof retires one** — but the
blocker has moved from an unknown to a named, buildable, non-owner item.

---

## §6 · WHAT THE ORDER REFUSES TO DO

**It does not schedule an ADF acceptance contract.** ADF has no scoreboard of its own and the owner
deferred one to *"when the second product arrives."*

**It does not put build work in front of a measurement that build does not block.** v30's shape; the
S118 recon refuted its premise and that refutation still holds.

**It does not carry a number it did not measure.** Every figure above was measured in S119 or S120, or
is labelled an estimate by the contract itself.

**AND NEW IN v32: IT DOES NOT ASK THE OWNER FOR A DECISION THAT IS ALREADY MADE OR THAT IS NOT HIS.**
v31 carried two such items. One was complete before it was asked about; the other was build work in an
owner's coat. **Under SOTA-1 that is not a clerical error — an order that manufactures owner-gates
manufactures deferrals, and SOTA-1 exists to make deferrals expensive.**

<!-- END · cwf-implementation-order-S120-v32 -->
