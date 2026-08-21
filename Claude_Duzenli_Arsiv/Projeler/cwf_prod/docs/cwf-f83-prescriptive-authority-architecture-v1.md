# CWF — F83: The Answer-Authority Ladder
## How the agent may say "do X" without becoming a liar

<!-- cwf-f83-prescriptive-authority-architecture-v1 · rev 1 · 2026-07-14 · Session 41.
     Architect: Claude. Owner decision: the agent MUST give both (a) data-grounded observations +
     possible causes AND (b) actionable operational instructions.
     This note answers: what architecture, and what is SOTA. Sources at the end, all 2026. -->

---

## 0 · THE DECISION THIS NOTE SERVES

The owner asked for a 24-hour A3 report with corrective actions. He got the data — and a refusal:
*"operasyonel düzeltici aksiyon önerileri sunma yeteneğim bulunmamaktadır."* That refusal comes from
the governed `safety.b1_scope` prompt segment.

**Owner's ruling:** both halves are required. Observations with causes, *and* "do X" instructions.
And beyond that: answer from the **knowledge base**, research the **web** when the KB falls short,
and **write the finding back into memory** so the system learns.

This note does **not** loosen a prompt. It says what must exist first, and why.

---

## 1 · THE TRAP, NAMED FIRST

> *"Glazur3'te 41 duruş oldu"* and *"parlatma taşını 4 saatte bir değiştir"* are **not the same class
> of claim**, and no amount of prompt wording makes them one.

The first is **groundable**: it descends from a tool result, and CWF's grounding validator can check
it deterministically. That is the entire thesis of ADR-001 — *make a lying backend harmless*.

The second is a **claim about the world**. No tool output can verify it. If the model free-generates
it, CWF has quietly opened an **ungrounded authority channel** into a system whose whole reason for
existing is that it does not have one. The agent would then be exactly as trustworthy as a plausible
sentence — which is the thing this project has spent forty sessions refusing to be.

**So the question is not "may it advise?" It is: *whose* advice is it, and how is that attributed?**

The right frame is the one CWF already uses everywhere else: **a claim's authority comes from its
SOURCE, not from its fluency.** `backend_authority` already grades sources
(`system_of_record` / `reporting_mirror` / `unverified`). Advice needs the same ladder.

---

## 2 · THE LADDER (the architecture)

Five tiers. Each has a different **source**, a different **verification**, and — critically — a
different **visual treatment in the answer**. The agent may climb only as high as its source allows.

| Tier | What it is | Source | Verified by | If the source is missing |
|---|---|---|---|---|
| **T0 · FACT** | "41 duruş, 23'ü PLANSIZ" | MCP tool result | grounding validator (deterministic) | honest gap (`empty ≠ zero`) |
| **T1 · ANALYSIS** | "duruşların %62'si POLISHING" | **computed** over T0 | arithmetic, reproducible | — |
| **T2 · DIAGNOSIS** | "olası neden: taş aşınması" | model **hypothesis** | nothing — and it must SAY so | labelled *hypothesis*, cites the T0/T1 it rests on |
| **T3 · PRESCRIPTION** | "taşı 4 saatte bir değiştir" | **governed procedural KB** (SOP / bakım standardı) | citation: rule id + version | *"bu duruma dair kayıtlı bir prosedür yok"* — **never improvise** |
| **T4 · LEARNING** | a NEW procedure | web research / operator experience | **human publish through the eval-gate** | stays a DRAFT forever |

Three rules bind the ladder:

1. **A tier may never be rendered as the tier above it.** A hypothesis printed in the voice of a fact
   is the same defect as F82's table: *a guess that looks like an answer.* T2 and T3 get distinct
   visual treatment in chat — the hypothesis labelled and caveated, the prescription **carrying its
   citation** (source rule, version, "son güncelleme").
2. **T3 abstains rather than invents.** No governed procedure ⇒ the agent says so plainly and offers
   T2. *That is a feature, and it is the honest version of today's refusal.* Today's message is wrong
   because it says *"I can't"* when the truth is *"nobody has told me the procedure yet."*
3. **T4 is never self-authoritative.** See §4 — this is where the literature is loudest.

---

## 3 · WHAT SOTA SAYS (2026, checked — not from memory)

### 3.1 · The industrial-agent benchmark says: *do not let the LLM reason freely over flat documents*
**AssetOpsBench** (KDD 2026) is the first systematic benchmark of LLM agents on industrial asset
operations — 139–141 expert-curated maintenance scenarios. <cite index="5-1">GPT-4 agents score 65% reasoning over flat document stores; a typed knowledge-graph grounding substrate lifts the *same model* to 82–83%, and native graph/optimization primitives with **no LLM at all** reach 99% on graph-answerable scenarios</cite>. The paper's own name for the winning pattern is **inverted LLM usage**: <cite index="5-1">constrain the LLM to query generation or one-shot enrichment from a typed schema, and let the deterministic engine execute</cite>.

**Read for CWF:** this is a direct, external vindication of the ADR-001 line — and a warning about
T1. Today the model *narrates* percentages from tool output. Anything computable should be
**computed**, not written by a language model. T1 belongs in code (or an analytic tool), not in prose.

### 3.2 · The prescriptive half is a RETRIEVAL problem, not a reasoning problem
The 2026 literature converges on **SOPs as retrievable procedural knowledge**: <cite index="4-1">SOP-Agent gives general agents domain-specific SOPs as explicit behavioural guidance, SOP-Bench benchmarks agents against complex industrial SOPs, and Flow-of-Action constrains multi-agent root-cause analysis with SOPs</cite> — while <cite index="4-1">the open challenge is named as *accurately retrieving and grounding agents in complete SOP documents* in industrial settings</cite>.

**Read for CWF:** "corrective action" is not a capability you unlock with a prompt. It is a **corpus
you must have**. The SOTA answer to *"how should the agent know to change the polishing stone?"* is:
**because Kale's own maintenance standard says so, and the agent cited it.**

### 3.3 · Memory that writes itself is the most dangerous component in the system
This is where the field is unambiguous, and where the owner's step (c) — *"kendi memory'sine kaydetsin
ve öğrensin"* — must be built very carefully.

- <cite index="12-1">A 2026 security study of memory-poisoning attacks found **over 90% of tested agents vulnerable, with a 100% relapse rate** when teams tried to fix the problem by correcting the agent in conversation.</cite>
- <cite index="12-1">Databricks (April 2026): agents that retrieved results from earlier **incorrect** runs reused them **with even more confidence than before** — because memory had given the wrong answer *the appearance of established precedent*.</cite>
- The defensive consensus: <cite index="18-1">agents should not have write access to long-term memory unless the task requires it, and memory writes should go through a **staging buffer with validation** rather than directly into the live store.</cite>
- And the pattern with a name: <cite index="17-1">**Co-memorize diff-and-approve** — when an agent proposes to write a memory, the system computes a structured diff between the proposed write and the current state, presents it to a human reviewer, and commits **only on approval**.</cite>

### 3.4 · The punchline: **CWF already has the SOTA memory architecture and does not know it.**

> **draft → eval-gate (schema → referential → behavioral) → super_admin publishes → versioned +
> audited + rollbackable**

That *is* diff-and-approve, and it has been in production here for months. It was built for
governance rules. It is exactly the mechanism the 2026 memory-security literature says an agent's
long-term memory needs.

**Therefore MEMORY-1 is not "add a vector store."** It is: **let the agent open a DRAFT.**
The agent's learning writes into `domain_rules` as a proposal, with provenance (which turn, which
data, which web source), and a human publishes it. Nothing the agent learns becomes authoritative by
being remembered. It becomes authoritative by being **approved** — the same gate a governance rule
passes. A poisoned memory then cannot become a prescription without a human looking at a diff.

*(Corollary, free: the eval-gate's audit trail gives you memory **lineage** — the thing four separate
2026 papers propose bolting onto memory stores after the fact.)*

### 3.5 · The web is not a source. It is an **unverified backend**.
The owner wants web research when the KB is thin. ADR-001 already knows what to do with a source that
may lie: **contain it, attribute it, never let it be authoritative.** Web findings enter at
`unverified` in the same authority table that already grades ARMES and Superset. A web-derived
sentence may support a **T2 hypothesis** or seed a **T4 draft**. It may **never** be rendered as a
T3 prescription. Zero new philosophy is required — only a row.

---

## 4 · THE SEQUENCE (committed, single path)

**F83 is four phases, not one.** Loosening `safety.b1_scope` today, before the tiers are structurally
distinguishable, would not give the owner corrective actions — it would give him **fluent guesses in
the voice of a factory standard**, in a product whose entire value is that it does not do that.

| # | Phase | What it buys | Cost |
|---|---|---|---|
| **F83.1** | **`SCOPE-HONEST-1`** — rewrite `safety.b1_scope` (governed, **no deploy**): T1 + T2 permitted and **labelled**; T3 abstains with the honest reason (*"kayıtlı bir prosedür yok"*, not *"yapamam"*). Chat gets a distinct **hypothesis** treatment. | The owner immediately gets observations + causes. The refusal stops lying about *why*. | S · one prompt-segment republish + a small client change |
| **F83.2** | **`SOP-KB-1`** — a governed `procedure` kind (SOP / bakım standardı / düzeltici aksiyon), authored in Rules like every other rule; retrieval + **mandatory citation**; T3 unlocked *only* for cited answers. | "Do X" — with Kale's own standard behind it, versioned and auditable. | M · new kind + retrieval + render |
| **F83.3** | **`WEB-UNVERIFIED-1`** — web research as an `unverified` backend: attributed, quarantined, never T3. | The KB stops being a ceiling. | M |
| **F83.4** | **`MEMORY-1`** — the agent proposes a `procedure`/`insight` **draft** with full provenance; a human publishes. Episodic recall reads only **published** rows. | The system learns — and cannot poison itself. | L · but it reuses the gate that already exists |

**Prerequisite, non-negotiable:** F83.2 needs a corpus. Kale has maintenance standards, shift
instructions, root-cause sheets — on paper, in people's heads, in some folder. **That is the real
blocker, and it is not a code problem.** Until a first thin slice of that corpus exists (ten
procedures would do), T3 has nothing to cite and the phase is theatre.

---

## 5 · WHAT I AM NOT DOING

- I am **not** letting an LLM judge or generate a prescription at runtime. ADR-001 stands.
- I am **not** giving memory a write path to authority. §3.3 is why.
- I am **not** treating T1 arithmetic as prose forever (§3.1) — but that is a later, separate phase.

---

## 6 · SOURCES (all 2026 unless noted)

- **AssetOpsBench** (Patel et al., KDD 2026) + *Knowledge Graphs as the Missing Data Layer for
  LLM-Based Industrial Asset Operations* (Mandarapu & Kunkunuru, May 2026, arXiv 2605.26874) —
  65% → 82–83% → 99%; "inverted LLM usage".
- **SOPRAG** (arXiv 2602.01858) — SOPs as retrievable procedural knowledge; survey of SOP-Agent
  (Ye et al. 2025), **SOP-Bench** (Nandi et al. 2026, arXiv 2506.08119), Flow-of-Action, ChatSOP.
- *Designing Agentic Memory in 2026* (The Nuanced Perspective, May 2026) — >90% of agents vulnerable
  to memory poisoning, 100% relapse on in-conversation correction; Databricks' confidence-amplifying
  wrong-memory finding.
- *AI Agent Memory Poisoning: Defense Guide* (BeyondScale, Apr 2026) — staging buffer + validation;
  OWASP Agentic AI Top 10.
- **memorywire** (arXiv 2606.01138) — the **Co-memorize diff-and-approve** governance pattern.
- Supporting: MINJA (NeurIPS 2025), MemoryGraft, MemLineage (arXiv 2605.14421), *A Survey on the
  Security of Long-Term Memory in LLM Agents* (arXiv 2604.16548).

<!-- END · cwf-f83-prescriptive-authority-architecture-v1 · rev 1 · 2026-07-14 -->
