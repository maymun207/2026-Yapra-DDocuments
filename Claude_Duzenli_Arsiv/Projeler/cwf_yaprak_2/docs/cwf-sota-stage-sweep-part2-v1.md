cwf-sota-stage-sweep-part2-v1.md


# CWF — Stage-by-Stage SOTA Gap-Hunt · Part 2 (stages 04–08) · v1
 
<!-- cwf-sota-stage-sweep-part2-v1 · rev 1 · 2026-07-12 · Architect: Claude.
     Continues cwf-sota-stage-sweep-part1-v1 (00–03; stage 03 = REAL GAP → SEMANTIC-ROUTING-1).
     Same GAP-HUNT format: Q1 what's the mainstream pattern & do we have it · Q2 deliberate or
     oversight · Q3 what breaks it in 12 months. Only real gaps/risks written up.
     HEADLINE OF THIS PART: two of the three stages the owner suspected are NOT gaps — and in
     stage 08 the SOTA literature actively VINDICATES the "deliberate stub" decision. The real
     new finding is a MEASUREMENT gap, not an architecture gap. -->
 
# 04 · Planlama / Ayrıştırma — **NOT A GAP (today). A named latency/cost trigger.**
 
## What CWF does
No separate planner. Planning is implicit inside the tool loop (`MAX_TOOL_ROUNDS = 8`).
 
## What the field does
**ReAct (reason→act→observe, interleaved) is the most battle-tested pattern of 2026 and the
production default.** So CWF's "no planner" is not a lag — **it IS the mainstream choice.**
 
The alternative, **Plan-and-Execute**, plans all steps upfront: higher accuracy on complex
multi-step tasks (the planner is forced to consider the whole workflow), but slower end-to-end.
Its real prize is **parallelism**: LangChain's LLMCompiler streams a DAG of tasks with explicit
dependency tracking, and the original paper (Kim et al., ICML 2024) reports a **3.6× speedup**
over sequential ReAct-style execution. The trade-off the sources name repeatedly: ReAct needs
**an LLM call per tool invocation** and only plans one sub-problem at a time, which can yield
sub-optimal trajectories.
 
Two hard warnings from the same literature, both relevant later:
- Dynamically generated plans **can be wrong** — teams add a *plan validation step* before
  execution (a second pass that checks the plan against known constraints).
- Explicit planning (a graph/state machine, e.g. LangGraph) is **more controllable and traceable**;
  implicit planning is flexible but harder to control.
## Honest CWF read
For a single-metric factory question ("KB7'nin dünkü OEE'si"), ReAct is correct and cheap.
The cost shows up on **multi-entity comparisons** — "5 zone'un geçen ayki OEE'sini karşılaştır"
becomes N sequential tool calls, each paying a full LLM round-trip, against an 8-round ceiling.
That is a **latency/cost ceiling, not a correctness bug** (grounding still guards the answer).
 
Note also (as in part 1 §3.5): the governed `armes.routing_hint / sequencing` rule — *"resolve the
ZONE UUID via `getFactoryLines` BEFORE calling any OEE/fire metric tool"* — is effectively a
**hand-authored plan fragment**. CWF already does the one piece of explicit planning that matters
for correctness, without a planner.
 
## Verdict + trigger
**No work now.** Open a planner phase (the already-deferred LangGraph item) **only when** one of
these fires:
1. Users routinely ask multi-entity comparisons that feel slow or hit the 8-round ceiling
   (measurable — see §08's measurement recommendation), or
2. Parallel tool execution becomes the difference between a usable and an unusable answer.
When it lands, prefer **explicit/traceable** (graph) over implicit — it fits CWF's audit culture —
and include a **plan validation step**, per the literature's own warning.
---
 
# 05 · Bellek Getirme — **GAP ALREADY NAMED (MEMORY-1). One new, important nuance.**
 
The gap itself is F48/MEMORY-1 (episodic memory missing; see the trust-and-memory doc). What this
round adds is a **defense of CWF's existing control surface**:
 
**Bigger context is NOT free.** The 2026 research on "context rot" is blunt: performance degrades
*before* the window fills. Chroma's 2025 study across 18 frontier models found degradation at
**every increment** of context growth, with a *lost-in-the-middle* effect causing **30%+ accuracy
drops** for information buried in the middle of long conversations. Practitioner post-mortems go
further: roughly **65% of enterprise AI failures in 2025 were attributed to context drift / memory
loss during multi-step reasoning — not raw context exhaustion.**
 
**Implication for CWF:** the instinct "just raise `historyWindowN` and the agent will remember
more" is **wrong** — a larger N can make answers *worse* while costing more. CWF's design (N as a
governed param, with a hard `[min,max]` clamp on every source) is exactly the right control
surface, and the 05 card's own "Denge" note is correct. **Do not widen N as a substitute for
MEMORY-1.** Retrieval of the *right* few memories beats stuffing more history.
 
**Verdict:** no new work. MEMORY-1 stands as named. This nuance goes into the Wave-2 content for
stage 05 (it is a genuinely useful thing to teach a new developer).
 
---
 
# 06 · Bilgi / RAG — **NOT A GAP TODAY. A named scale trigger.**
 
## What CWF does
Governed `domain_rules` are **injected into the prompt** (warm→read, code floor on outage). This
is *curated knowledge injection*, not retrieval. There is no vector RAG. The owner already
flagged: *"buraya gerçek bir RAG bağlayacağız."*
 
## Honest read
For a **bounded, curated** rule set (glossary terms, zone definitions, metric definitions, blind
spots), injection is **better than retrieval**: it is deterministic, auditable, gated, versioned,
and it cannot "fail to retrieve." Retrieval buys you scale and pays for it with a new failure mode
(the right fact exists but wasn't fetched). Trading determinism for scale you don't need yet is a
bad trade — and it would collide with the eval-gate/rollback discipline that makes CWF trustworthy.
 
## The trigger (name it now, don't build it now)
Injection has a hard economic ceiling: **every rule is paid for on every single turn.** The moment
the governed rule set stops fitting comfortably in the prompt budget — realistically when
**Superset's packs land (F36)** and the rule count roughly doubles — injection must become
**selective retrieval**.
 
When that day comes, the shape is already decided by part 1's §3.6: **hybrid retrieval on
`pgvector` in the existing Supabase** — semantic + keyword + entity, fused — over the *governed*
rules, with the gated draft→publish lifecycle untouched. **Same machinery as SEMANTIC-ROUTING-1.**
That is a strong argument for building the embedding/retrieval substrate **once**, for tools and
rules together.
 
**Verdict:** no work now; fold the "selective rule retrieval" option into SEMANTIC-ROUTING-1's
design note as a phase-2 of the same substrate. Measure the prompt's rule-token cost after Superset
activation — that number is the trigger.
 
---
 
# 07 · Araç Seçimi — **SAME GAP AS 03** (see part 1)
 
Stage 07 consumes what stage 03 produces; the weakness is the keyword-based candidate map, already
written up as **SEMANTIC-ROUTING-1**. Two additions specific to 07:
- The **`ALWAYS_INCLUDE` availability floor** is a genuinely good, un-fashionable idea: it makes an
  empty tool set structurally impossible. The literature's failure mode ("retrieval returns nothing
  useful") simply cannot happen here. **Keep it, and keep it un-lowerable — even in lab.**
- The precondition-contract insight (CMTF, part 1 §3.5) belongs to 07's *ordering*, not 03's
  *recall*. Semantic retrieval must not be allowed to bypass the sequencing hints.
---
 
# 08 · Sıkıştırma — **THE INTERESTING ONE: CWF's "deliberate stub" is VINDICATED.
The real gap here is MEASUREMENT, not architecture.**
 
## What CWF does
`resultStore` offloads large tool results behind a **handle**; the agent then queries them
deterministically (`query_records` / `aggregate_records`). **Summarization is deliberately NOT
built** ("bilinçli stub"). Thresholds are hardcoded (`AGENT_PARAM_KEYS` has no resultStore key).
 
## What the field does — three distinct mechanisms
The 2026 stack (per Anthropic's own context-engineering guidance and the surrounding literature)
separates three things that are often conflated:
1. **Compaction** — summarize the *conversation* when it nears the window and continue from the
   summary.
2. **Tool-result clearing** — drop old, **re-fetchable** tool results while keeping the record that
   the call happened.
3. **Memory** — structured external note-taking so progress survives outside the context window.
## The vindication (this is the finding)
Summarization is **lossy by construction**, and the literature says so plainly: compaction reduces
context by 90–99% in token count, **information is always lost**, and *the model decides what to
keep and what to drop with no guarantee of consistency across runs*. One reported case compressed a
335k-token research context ~120:1 — and what survived depended entirely on how the summarization
prompt was written.
 
Now apply that to CWF's actual job: **a factory data agent where the numbers ARE the answer.** A
summarizer that silently drops a zone's scrap figure, or rounds it, or keeps a *different* subset
on a re-run, is a **grounding violation generator** — it manufactures exactly the class of error
(empty-as-zero, fabricated figures, inconsistent runs) that ADR-001 and the whole grounding layer
exist to prevent.
 
**CWF's resultStore is the correct alternative, and it is essentially "tool-result clearing done
right":** instead of summarizing (lossy, non-deterministic) or dropping (amnesia), it keeps the
full result **addressable and queryable, deterministically**. The model gets what it asks for, in
full precision, on demand. **The decision to stub summarization was not a shortcut — it was the
right architectural call for this domain.** Do not reverse it under the impression that "everyone
else summarizes."
 
## Where a REAL gap remains
1. **No conversation compaction at all.** CWF bounds history with the last-N window — a blunt
   truncation, not a summary. For a long chat session, older turns simply fall off. Given the
   context-rot findings (05), *that is often fine* — but it is unmeasured.
2. **Thresholds are invisible and ungoverned** (the F39-family problem): the offload trigger is
   hardcoded; nobody can see it or tune it from the admin panel.
3. **The 2026 frontier has moved past fixed thresholds anyway:** *Self-Compacting Language Model
   Agents* (June 2026) shows that letting the **model decide when to compact** (a compaction tool +
   a rubric: fire when a sub-task resolves, hold mid-derivation) **matches or beats a fixed
   threshold at a fraction of the token cost** — because firing mid-derivation discards partial
   results the model must then reconstruct, the most expensive possible moment to forget. Anthropic's
   own guidance likewise recommends compacting *proactively* (~5–20k tokens for simple workloads,
   50–100k for complex), not at the wall.
## RECOMMENDATION — measure before you build (and CWF can, today)
**Do NOT build a summarizer.** Instead:
1. **Measure the actual session shape.** The data already exists: `telemetry_events` token counts
   per turn + the Langfuse span tree. Answer three questions with real numbers:
   - How long do real CWF chat sessions get (turns / tokens)?
   - How often does a turn approach a context ceiling?
   - How often does `resultStore` offload fire, and how big are the payloads?
2. **If the numbers say sessions are short** (very likely for factory Q&A: ask → answer → done),
   then 08 is **closed** — no compaction needed, and that is a *finding*, not a deferral.
3. **If the numbers say sessions run long**, the CWF-shaped fix is, in priority order:
   (a) **govern the thresholds** (an `agent.resultStore*` L1 param — cheap, fits an existing batch),
   (b) **tool-result clearing** before any summarization (keep the *record* of the call, drop the
   re-fetchable payload — CWF can always re-query via the handle: this is nearly free given
   resultStore already exists), and only then
   (c) a **model-decided, feature-flagged, versioned compactor** — never a silent, always-on one,
   and never one allowed to touch numeric facts (it must summarize *narrative*, not *data*).
This is the automation-first answer: the telemetry to settle the question is **already being
collected**; the missing piece is a query, not a feature.
 
---
 
## Running gap ledger (parts 1–2)
| Stage | Verdict | Item |
|---|---|---|
| 00 | ✅ no gap | — |
| 01 | ✅ no gap | — |
| 02 | ✅ no gap | (memory load → MEMORY-1) |
| **03** | 🔴 **REAL GAP** | **SEMANTIC-ROUTING-1** (hybrid semantic tool discovery) |
| 04 | ⚪ no gap today | Planner deferred; trigger = multi-entity comparisons / 8-round ceiling. Prefer explicit+traceable + plan validation when it lands |
| 05 | 🟡 named | **MEMORY-1** (episodic). NEW: context-rot — do NOT widen N as a memory substitute |
| 06 | ⚪ no gap today | Trigger = rule-token cost after Superset. Then selective retrieval on the SAME pgvector substrate as SEMANTIC-ROUTING-1 |
| **07** | 🔴 same as 03 | Keep `ALWAYS_INCLUDE` floor + sequencing hints above any semantic recall |
| **08** | 🟢 **VINDICATED** + 🔵 measurement gap | resultStore (deterministic handles) is RIGHT for a data agent — summarization is lossy & non-deterministic. **Measure session shape from existing telemetry before building anything.** Govern thresholds (F39-family) |
 
*Next: stages 09–14 (prompt assembly, LLM inference, tool loop, verification, format, memory update).*
 
## Sources (part 2)
- ReAct as the battle-tested 2026 default; plan-validation gotcha — Innovatrix agentic-patterns
  survey (2026); Blck Alpaca (Jun 2026) on implicit vs explicit planning/controllability.
- ReAct vs Plan-Execute vs Graph agents; accuracy/latency trade-offs — dasroot.net (Apr 2026);
  LangChain "Planning Agents" (2026); LLMCompiler DAG **3.6× speedup** (Kim et al., ICML 2024) via
  Oracle developers' agent-loop write-up.
- Context rot: degradation at every context increment; lost-in-the-middle 30%+; ~65% of 2025
  enterprise AI failures attributed to context drift/memory loss — Zylos Research (Feb/Mar 2026),
  citing Chroma's 18-model study.
- The three mechanisms (compaction / tool-result clearing / memory) — Anthropic Claude Cookbook,
  context-engineering.
- Summarization is lossy; 90–99% token reduction with no cross-run consistency guarantee; 120:1
  case — arXiv 2605.23296 (parallel context compaction); TianPan context-engineering (2026).
- Compact proactively (~5–20k / 50–100k tokens), compaction is routine not last-resort — Slipstream,
  arXiv 2605.08580, citing Anthropic 2026 guidance.
- **Self-Compacting Language Model Agents** (Jun 2026, arXiv 2606.23525) — model-decided compaction
  matches/beats fixed thresholds at a fraction of the token cost; context rot.
<!-- END · cwf-sota-stage-sweep-part2-v1 · rev 1 · 2026-07-12 -->