# CWF — Session Graph KB · v65
<!-- CWF-SESSION-GRAPH-KB-v65 · 2026-07-27 · S66 record. Supersedes v64.
     Companion to register v67 (state) — this file carries the CAUSAL CHAIN and
     the lessons in reusable form. v60–v64 archive. -->

## S66 in one line
The session that made the catalog real — 4 hand-authored zone rows to **779
discovered lines** — and in which the Architect's own design defect was caught
by the Author lane's post-apply measurement, and the headline was cut in half by
that same lane's disclosure.

## The chain (order matters — each step caused the next)

1. **The design opened with a live read, and the live read refuted the design.**
   F183's opening premise was that any layer below factories needs a per-parent
   fan-out. The Operator read of `backend_tools` showed `getFactoryLines` declares
   `required: []` — `factoryId` is OPTIONAL. So the layer carrying 85% of the
   blocks is discoverable with the **same zero-argument call** as factories.
   Fan-out is real only at equipment. **S65-1 paid for itself on the first turn of
   the session it was written for.**

2. **A second fact fell out of the same read, and it removed the need for
   hand-written aliases.** The recorded `getFactoryLines` payload carries
   `description: "Sırlama 3 ( Alt Kat )"` — the user's own word, already inside
   the backend's declaration. The F175 dead turn's `"sırlama 3-4-5"` did not need
   an alias row; it needed the match target widened to a field the backend was
   already sending. **Discovery doing the work authorship would otherwise do is
   the ADR-009-compliant answer to a vocabulary problem.**

3. **The descriptor became DATA, and so did the CALL SHAPE.** `backend_entity_layers`
   (one row per backend-layer: which tool lists it, how it hangs off its parent,
   at what cadence) and `entity_registry` (the N-layer mirror with a derived
   parent edge). The sync reads the tool's own `input_schema` to decide zero-arg
   vs fan-out — so even *how to call* is discovered — with an ADR-010 fallback if
   the observed outcome contradicts the declaration. Degree test: rows scale with
   the INTEGRATION, not the world. Adding `getEntityZones` later is one row and
   zero code.

4. **The phase shipped and the number moved: 4 → 779.** And the safety floor held
   by construction — any failure or empty discovery falls back to ENTITY-FLOOR-1's
   `factory_registry` path, so the phase could only ADD resolutions, never remove
   a working one.

5. **Then AG's own post-apply measurement found the Architect's design defect.**
   The written descent rule was *"descend if the record owns an array whose
   ELEMENTS carry ids"* — **vacuously false for an empty array**, so twelve
   childless factories were promoted to phantom LINE rows. `Pasta` then resolved a
   real LINE-scoped reference and **suppressed 14 clarifications while every log
   line reported a healthy sync**. This is the exact defect the phase existed to
   remove, reproduced at larger scale: the old parser minted one wrong row for a
   factory name; the new one minted one per childless factory.

6. **The fix was falsified by its own test before it shipped.** Deciding the
   container key once per response works — unless **every** container is empty, in
   which case no key can prove itself and the response reads flat again,
   reproducing the bug in miniature. AG's own ENERGIO case caught it. The
   uniformity fallback that covers it has a real false-negative risk, and that
   risk is **written into the source** rather than left implicit, with the
   direction chosen deliberately: a false negative writes zero rows and leaves the
   mirror alone; a false leaf writes a row that lies.

7. **A re-sync would NOT have repaired the data — and the obvious repair would
   have written a false history.** `upsertLayer` never deletes; a phantom flips to
   `missing`, and `missing` rows stay resolver match targets **by design**. So
   `Pasta` would have gone on suppressing. And flipping them to `missing` asserts
   *"ARMES once listed Pasta as a line"* — it never did; our parser invented it.
   Hence a structural DELETE (parentless rows in a layer whose descriptor declares
   a parent), naming no factory. **791 → 779**, second apply zero.

8. **The count gate belonged in the Operator prompt, not in the migration.**
   The Architect first demanded "STOP if not exactly 12" inside the SQL. AG
   declined, correctly: a live value frozen into a file is the same error as
   ADR-005's stale advisor floor. The gate moved to where a live read happens —
   and the Operator listed all 12 victims before deleting, turning the Architect's
   code-derived inference into an observation.

9. **The headline was then cut in half — by the lane that produced it.** gapfill
   showed HIGH 87.4% → 37.7%, but the gate checks `entity-unresolved` BEFORE the
   COMMAND write-exposure branch, so resolving the entity **unmasks** a refusal
   rather than answering the turn. 465 frames moved HIGH → ALT_D; both
   short-circuit. Honest figure: **−24.6pp, not −49.7pp**. Corroboration that this
   is masking and not noise: M-A had recorded `entity-unresolved` at 98.9% of
   causes, i.e. ALT_D ≈ 0 — exactly what a masked branch looks like.
   → **S66-4**, and the clean number is question-set-v1's **−46.3pp** (zero
   COMMAND frames, so relabelling is structurally impossible).

10. **The corpus comparison itself was invalid, and that produced a rule.**
    question-set-v2 supplied 474 of 589 frames and had **zero** recorded runs when
    M-A was taken. 84.6% → 30.6% conflated a corpus change with a phase effect.
    → **S66-3**, and its corollary: a new corpus records its baseline on its first
    passes, before anything else lands.

11. **The owner reframed Superset, and the reframing was better than the
    diagnosis.** The Architect read a chart failure as "broken tools, hide them
    until fixed". The owner corrected: Superset's MCP **renders the chart inside
    Superset** and hands back a URL. So those tools are not broken relative to
    their purpose — their purpose is the wrong surface for this product, and the
    remedy therefore survives Superset fixing its bugs. Evidence agrees:
    `generate_chart`'s success envelope is all references INTO Superset.

12. **Chasing that produced a structural finding about ALL gateways.** Superset's
    22 inner tools are **never offered** — the model discovers them via
    `search_tools` and invokes them as an ARGUMENT to `call_tool`. So
    `generate_chart` is not a tool in our catalog; it is a **string in a payload**,
    beyond the reach of every annotation, category and exposure rule. Exactly two
    reach points exist: the `search_tools` result and the `call_tool` pre-flight.
    **This generalizes to every gateway backend.** Corollaries found in the same
    read: eight inner tools are `mutate` and three are `destructiveHint:true`
    (including `execute_sql`), all ungoverned, and `writeOffered=0` on those turns
    is a **false negative in a safety counter** (F188) — an `empty≠zero` violation
    inside the governance layer. And 22 of 22 inner tools carry no real schema, so
    the model calls them **blind** (F189).

13. **The cleanup proved the treadmill.** 166 learned keyword rows were cleared to
    2 pinned. Within hours: **19**, with 17 keys returning inside ~10 minutes and
    `granit` landing in a **third** distinct category set. The cleanup was correct
    and temporary; without a guard the class regrows. Worse, the proposal queue's
    Accept **publishes with `pinned:true`**, i.e. creates rows Clear can never
    remove — so the human-ratification door is a *more* dangerous contamination
    path than the learning path.

14. **The corpus became real.** Nine of the owner's actual operator questions —
    typos mid-sentence, three entities in one breath, a date plus a shift plus a
    line range, bare record identifiers, and one request for **analysis** rather
    than retrieval. Three recorded known-failing **before** the run. A real sicil
    number was substituted because the injector is frame-only but the utterance
    text persists in a ledger specified PII-free.

15. **And the last defect was a tag count.** The merge message said three
    known-failing; the corpus tagged two. AG caught it against a permanent commit
    message, inside the window before the absence-only seeder froze the row.
    → **S66-5**: a status tag that does not name its evidence is a rumour.

## Lessons in reusable form

- **The dangerous measurement error is the FLATTERING one.** It passes every check
  you wrote, because you wrote them hoping for that number. Both of this session's
  measurement defects — the phantom rows and the ALT_D relabelling — moved the
  number the way everyone wanted.
- **A rule written from a defect must be applied to every instance immediately**,
  not only to the file that motivated it. A convention installed with a
  file-scoped test is one that the next file silently opts out of, because nobody
  writing v4 reads v3's tests.
- **Ship the soundness case with any pin whose green could mean "nothing to
  check".** Two self-verify commands returned confident false zeros this session,
  one of them on a safety grep.
- **An output contract is verified only by executing it.** Reading the diff is
  not verification. The FIX-2 mechanism — ESM evaluates imports fully before the
  importing module's body — cannot be seen by reasoning about the function, and
  the load-bearing property (import ORDER) cannot be seen by a behavioural test.
- **An absence-only seeder gives exactly ONE window to fix its data, and it closes
  on first deploy.** Answer "has it seeded yet" with a query, never a guess.
- **The strongest proof that you did not disturb the neighbours is the production
  ledger, not a fixture.** AG proved v1/v2 stayed no-ops by reading `seed_state`'s
  persisted fingerprints, not by asserting against a fake.
- **A live value frozen into a file is a bug in waiting** — whether it is a
  migration constant, an advisor floor, or a commit hash in a phase brief.
- **Deciding a shape once per RESPONSE beats deciding it per RECORD** when the
  records are heterogeneous — but then handle the degenerate case where the
  evidence for that decision is absent.
- **When a heuristic could shrink a mirror, make it REPORT instead of FILTER.** A
  false positive that deletes is worse than the defect it chases.
- **Two lanes disagreeing about a stored fact is settled by reading the stored
  fact.** The `showAll` "default" dispute ended in one query: the word lives in
  the description prose, not in the schema.
- **A declaration can contradict ITSELF.** `required: ["showAll"]` alongside
  "(optional, default true)". That is a distinct ADR-010 class from "the backend
  lies" — the tool says two different things about itself.
- **Some entities can never be discovered, and that is a category error, not a
  coverage gap.** Record identifiers (personnel numbers, work-order numbers) are
  transactional records, not topology; no depth of discovery will put them in a
  registry. If the gate blocks on them, the fix is in a different lane entirely.
- **The lane structure is the safety mechanism, not a formality.** Nine Architect
  premise errors this session; every one caught by another lane. The common root
  is always the same: writing a specification from documents instead of reading
  the live artifact.

## What S66 deliberately did NOT do
- Did not retire `armes.zone` — its behavioural qualifiers (`hasBarcode`,
  `scrapVisible`) are not discoverable and guard an `empty≠zero` case (F184).
- Did not build `static_args` for the equipment layer — legitimate in shape, but
  its necessity is gated on whether blocked frames actually carry EQUIPMENT.
- Did not touch the proposal queue — Accept pins, and pinning contaminated rows
  is worse than leaving them queued.
- Did not run M-C — the provider comparison is confounded until learning can be
  frozen and the action space controlled.
- Did not compare v3 to anything — it has no baseline yet, and inventing one
  would repeat the mistake this session named.

<!-- END · CWF-SESSION-GRAPH-KB-v65 · 2026-07-27 · S66 record -->
