# cwf-vision-note-HGT-SCIENCE · v1

<!-- Architect-authored · 2026-08-12 · conceptual side-session (brainstorm mode,
     owner-declared: NO effect on the current plan; future-process material only).
     STATUS: VISION / NON-BINDING. Mints no walk item, changes no register,
     touches no sequencing. SOTA gate unaffected.
     RELATION: companion body for the S94 closing-set note `cwf-vision-HGT`.
     S37-1 discipline: one name, one content — the S94 note should REFERENCE
     this file by name (or absorb it verbatim), never fork the content.
     Anchors into live work: #39 SNAPSHOT-PORTABILITY-1, #40 PERSISTENCE-CLASS-1
     (ADR-014), ADR-010 earned trust, ADR-001 harmless-liar, ADR-009 discovery,
     METRIC-REGISTRY-DATA-1, ctx.taskId clean-agent isolation. -->

## §0 · ONE-PARAGRAPH THESIS

CWF's distinguishing property is that learning lives outside the frozen model
as governed symbolic rows — inspectable, versioned, revertible, epoch-stamped.
This makes knowledge transfer between installations a *data operation*, not a
weight operation ("zero-gradient knowledge transfer"). Horizontal exchange of
distilled knowledge between an EAIP installation population is therefore the
agent-world analogue of bacterial **horizontal gene transfer (HGT)** — and the
analogy is load-bearing, not decorative: the class map we derived from first
principles matches distinctions biology has stress-tested for billions of
years. The scientifically open — and unoccupied — territory is HGT in an
**untrusted** environment: gates, immunity, earned trust, re-grounding.
CWF already runs that trust machinery in production for backends; this note
maps its generalization to knowledge rows.

## §1 · THE THREE-LAYER SEPARATION (settled this session)

| Layer | Organ | Grade |
|---|---|---|
| Inventory law — WHAT must travel is derived from persistence classes, never hand-listed | #40 PERSISTENCE-CLASS-1 / ADR-014 | Law: forgetting cannot stay green |
| Transport organ — row-faithful, byte-trustworthy carry; sole truth for restore/seed | #39 SNAPSHOT-PORTABILITY-1 | LEDGER-grade |
| Representation layer — human-readable, ecosystem-interoperable rendering (SKILL.md open standard) | future, unbuilt | DISPLAY-grade |

**Third instance of an existing law** (ADR-004/008 ledger-vs-display,
`turn_trace_digest` DISPLAY-ONLY): *a readable export is never a restore
source.* The readable form is screen; the snapshot is truth. A SKILL.md
export, if ever born, is a second serializer over the same rows — a derived,
lossy view for audit and interchange, never authority.

## §2 · THE MEMORY HIERARCHY WE ALREADY BUILT

The consolidation chain `episodes` (raw experience) → `semantic_memory`
(distilled generalization) → procedure recall (how-to) reproduces the
episodic→semantic→procedural backbone of human-memory literature. A readable
skill export would be the natural fourth link: **externalized procedural
knowledge** — what "being able to explain it to someone else" is for a human.
Lossiness is not a defect; every consolidation layer is a compression, and
compression *is* generalization.

## §3 · THE GENERALIZATION AXIS (unnamed, orthogonal to #40's classes)

Not every learned row is equally portable. Four strata observed:

1. **Instance fact** ("Glazur3 is in zone X") — never transports.
2. **Backend idiom** ("this tool paginates, caps at 1000") — transports to
   another installation of the *same* backend.
3. **Domain law** ("OEE = A × P × Q") — transports across the ceramics/MES
   domain.
4. **Universal procedure** ("time series + single metric → line chart") —
   transports everywhere.

#40 solved the *storage* axis; this is the *portability* axis — orthogonal,
currently unnamed in the codebase. Open scientific question (ADR-009's spirit
applied to knowledge): **can the system discover a row's stratum by
measurement rather than declaration?** Portability is observed, not declared.

## §4 · HGT MAPPING TABLE (the load-bearing part)

| Biology | CWF | Note |
|---|---|---|
| Plasmid (self-contained mobile element, own replication machinery) | Skill package / #39 export file | D-2 ONE-RELAY is the same physics: dependencies embedded, package self-sufficient |
| Chromosome (host-context-embedded genes; do not transfer, or transfer dead) | `episodes` + owner-context `semantic_memory` | Matches #39's D1 cut: user memory does not seed |
| Three transfer mechanisms: conjugation / transformation / transduction | direct installation↔installation channel / open pool import / third-party carrier | The carrier carries harm at the same efficiency — transduction's dark side is free with the metaphor |
| Restriction-modification system (cut unsigned foreign DNA) | sha256 + installation-ref fence; schema→referential→behavioral eval gate | Unsigned/incompatible material is cut before reaching tables |
| CRISPR-Cas adaptive immunity (fingerprint memory of past attackers) | quarantine + provenance memory | ADR-001 "make the liar harmless" applied to knowledge rows |
| Natural selection (a gene spreads iff it confers fitness) | ADR-010 earned trust — per-row, from observed use | See §6 SEED-PROBATION |
| Codon-usage / promoter incompatibility (transferred gene cannot be expressed) | vocabulary grounding is backend field-DATA (METRIC-REGISTRY-DATA-1) | A transported procedure must renegotiate grounding at the receiver |
| Universal ribosome (why HGT works at all: the genetic code is universal) | **the LLM is the universal interpreter** | The deep reason skill exchange can succeed where Semantic Web died: every installation carries a reader of natural language. Softens — does not erase — the grounding problem |
| Carriage cost (plasmids cost energy; unselected plasmids are shed) | context/token cost; unused skills must decay | Same physics as the ADR-010-anchored decay ruling |
| Pangenome (species = core genome + accessory genome; no individual carries all genes) | EAIP = code floor (core) + per-installation governed learned layer (accessory) | "The platform" becomes a pangenome, not a single artifact |
| Antibiotic-resistance genes (detector-silencers, HGT's most dangerous cargo) | `backend_authority` rows | R2 ruling ("authority passes only by separate written approval") is biology's most painful lesson, engineered |
| FMT / colonization resistance (transplant takes only into an emptied host) | empty-target seeding rule | Strengthened dynamically in §7 |
| Toxin-antitoxin addiction modules (cargo punishes its own removal) | **non-removability attack** — a skill making others depend on it until quarantine is impossible | New attack class, apparently unnamed in the literature; see §8 |

## §5 · MOBILIZATION = DISTILLATION (resolves the table-vs-row tension)

Tension: the S94 D1 cut is **table-level** (cache/proposals = plasmid;
episodes/semantic = chromosome), while §3's axis is **row-level** —
`semantic_memory` contains all four strata, so the table cut imprisons some
portable knowledge in the chromosome.

Biology supplies the resolution: chromosomal genes DO transfer — via
**mobilization**. Transposons and genomic islands excise a useful chromosomal
gene and copy it onto a plasmid; what travels is never the chromosome but the
*distilled gene in plasmid form*. CWF's consolidation chain
(episode→semantic→procedure) **is the mobilization mechanism**. The rule that
falls out:

> **The chromosome is never exported. The distiller lifts genes from the
> chromosome into transportable form, and only that form boards the plasmid.**

Consequence for a future v2: the cut does not move from table to row — it
moves to the **distillation output**. The table cut stays as permanent law;
distillation becomes the single doorway to portability. The two sessions'
frames compose without contradiction.

## §6 · SEED-PROBATION (the selection pressure the analogy demands)

In nature, a horizontally acquired gene earns no automatic trust — it persists
iff it confers fitness. Today a seeded row would be born with native status;
ADR-010's spirit ("declaration is a claim; trust is earned by observation")
must extend to transplanted knowledge:

- Seeded rows enter **source-stamped and conditional**; they nativize as they
  accumulate proof in local use.
- **Amelioration is measurable.** In genomics, a transferred gene's codon
  statistics drift toward the host's over generations, and the gene's age is
  read from its nativization degree. Analogue: a seeded row's provenance
  stamp evolves from "foreign" toward "nativized" as local usage evidence and
  local re-grounding accumulate — and that evolution is *read from
  provenance*, not asserted.
- **Engineering economy: no new machine.** The earned-trust engine ADR-010
  already runs for backends is reused as-is. One trust engine, two consumers:
  backends and transplanted knowledge. SEED-PROBATION is not a new system;
  it is ADR-010's second customer.
- Future item name reserved (S94): **SEED-PROBATION**. Importance grows when
  Graph-KB thickens the transplantable brain.

## §7 · COLONIZATION RESISTANCE (empty-target rule becomes a theorem)

FMT's mechanism is deeper than "conflict": in a full ecosystem the incumbent
community occupies the niches, so the newcomer *never gets fed*. CWF
translation: in a full brain, routing already owns learned paths; seeded rows
lose to native rows at retrieval → are never invoked → can never gather
evidence → **probation starves**. Under §6's mathematics, seeding into a full
brain is not merely risky — it is *impossible for the seed to nativize*.
The empty-target rule thus stands on two independent legs: a safety ruling
AND a forced consequence of selection dynamics.

## §8 · IMMUNE ARCHITECTURE — attack classes named so far

1. **Detector-silencing** — resistance-gene analogue; `backend_authority`
   rows as cargo. Countered by R2 (separate written approval).
2. **Non-removability / addiction module** — a transplanted skill becomes a
   load-bearing dependency of other procedures until quarantine would cascade
   harm. Design consequence: no transplanted skill may be a correctness
   dependency of another skill, OR the dependency graph is tracked so
   quarantine can cascade *deliberately*. Apparently unnamed in the
   literature.
3. **Carrier compromise** — transduction path: a third-party distribution
   channel spreads harmful cargo at useful-cargo efficiency. (Adjacent
   published work exists on self-replicating adversarial prompts in agent
   ecosystems — the "worm" class.)
4. **Grounding spoof** (open) — cargo that passes schema/behavioral gates but
   re-grounds maliciously at the receiver (binds a correct-looking procedure
   to the wrong local field). Candidate for the immunity map's next study.

Standing principle over all four: ADR-001 unchanged — the goal is never to
make foreign knowledge *honest*; it is to make a lying skill **harmless**:
contained, attributed, quarantinable, and (new, per class 2) removable.

## §9 · WHERE THE ANALOGY BREAKS — honest accounting (all three favor us)

1. **Selection is not blind here.** Nature measures nothing; it kills. We
   measure: **transfer gain** = golden-set score(seeded) − score(empty) is a
   quantitative fitness function. This moves us from natural selection to
   *artificial selection* (breeding) — faster and steerable. We keep the
   metaphor's machinery and discard its blindness.
2. **Population N≈1.** Evolution wants large N; we have one installation.
   Not fatal: **the population is simulable** — `ctx.taskId` clean-agent
   isolation can host K virtual installations on one physical installation,
   each learning on a different traffic slice, exchanging skills through the
   gate. Island-model GA literature supplies the mathematics (migration rate
   vs diversity). The Avida/Tierra digital-evolution tradition, agent
   edition — mechanically possible with today's organs.
3. **Semantics are not universal.** The ribosome argument (LLM as universal
   reader) softens but does not zero the codon problem; grounding still
   demands local renegotiation. This is the field's *real* open problem and
   the core of a publishable contribution: can re-grounding of a transported
   procedure be autonomous and measurable?

## §10 · LITERATURE ANCHOR (2025–26; read 2026-08-12)

- The field's axiom matches ours: skill evolution is formalized as improving
  an agent with **frozen parameters** by updating only its external skill
  library (AlignEvoSkill's formulation, arXiv 2506.23149).
- Ecosystem exists: SkillWeaver, MemSkill, Memento-Skills, SkillRL
  (2602.08234 — abstraction from experience to skill beats raw memory at a
  fraction of the context), SkillMAS (2605.09341 — credit only from verified
  execution traces; bounded library growth), surveys proposing skill
  libraries as *living, monitored infrastructure* (2606.11435).
- Benchmarks report the frontier pain: current mechanisms "struggle to
  consistently consolidate experience into robust and **transferable**
  skills" (ContinualSkillBench, 2608.03874).
- **Closest work and the gap in one sentence:** FederatedSkill
  (2606.03143, UCSB/MIT-IBM/Cisco) establishes federated skill exchange with
  semantic skill diffs as the unit of communication — and states its own
  limit: *it assumes a trusted federated environment.* Untrusted-environment
  HGT — restriction enzymes (gates), adaptive immunity
  (provenance+quarantine), earned-trust selection (ADR-010), re-grounding —
  is the unoccupied layer, and it is precisely the machinery CWF already
  operates in production for backends.

## §11 · THE MINIMAL EXPERIMENT (design only; nothing scheduled)

1. Define the replicator unit: a distilled row with provenance.
2. Spawn K virtual installations via `ctx.taskId`; learn on disjoint traffic
   slices.
3. Exchange distilled skills through the governed gate; sweep migration rate.
4. Measure **transfer gain** per §3 stratum via layered seeding ablation
   (universal-only → +domain laws → +backend idioms): which knowledge class
   carries how much gain.
5. Red-team with §8's attack classes; verify the immune gates fail loudly
   (S93-1 spirit: an instrument proves itself by its first real measurement).

All five steps use existing organs (taskId isolation, snapshot/restore,
golden set, canary, gate). Zero new infrastructure to *design* the
experiment; building it is a future ruling.

## §12 · WHAT THIS NOTE IS NOT

Not a walk item. Not a register entry. Not a sequencing argument. The SOTA
gate (1/7) and the service wave stand exactly where they stand. This is the
scientific body behind the S94 `cwf-vision-HGT` marker; when SEED-PROBATION
or a skill-export item is ever minted, it is minted by owner ruling against
this note — the note itself binds nothing.
