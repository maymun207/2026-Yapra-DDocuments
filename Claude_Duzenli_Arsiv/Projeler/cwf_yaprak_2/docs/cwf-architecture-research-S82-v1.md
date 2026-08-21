# CWF — Architecture Research & Decision · S82 · v1

<!-- cwf-architecture-research-S82-v1 · 2026-08-06 · Architect: Claude (Opus 5).
     Owner request: research how industry and academia solve the tool-selection /
     planning problem before pulling the trigger, and test the owner's hunch that
     memory (N=3) is under-used. Sources listed in §7. Nothing here changes the
     queue until the owner rules; §6 is a recommendation, not an enactment. -->

## §1 · OUR PROBLEM HAS A NAME, AND IT IS TWO PROBLEMS

The literature calls it **context bloat**, and splits it exactly the way our two open
items split:

| their name | our item | our measurement |
|---|---|---|
| **Tool definition bloat** — the full action space is injected upfront; the model still never sees inner-tool schemas | BUG-021 / `TOOL-EARNED-TRUST-1` | 7 recorded instances of a guessed parameter (`chart_id` for `identifier`) |
| **Tool result bloat** — full results flow through the model's context, often twice | `RESULT-BUDGET-1` | 206 order-line records over 5 days → 315 030 tokens, turn cut at day 5 |

This is not two unrelated bugs we happened to hit. **It is the canonical failure pair of
MCP-based agents at scale**, and it is what every 2026 fix addresses.

## §2 · THE INDUSTRY CONVERGED — three implementations, one idea

- **Anthropic Tool Search Tool** (Nov 2025): tools queried on demand instead of preloaded.
  Reported ~85% token reduction; definitions from 10K+ to ~3K per request.
- **Anthropic code execution with MCP**: servers presented as code APIs; agents filter and
  transform large datasets *in the execution environment* and pass back only what matters.
  Reported 150 000 → 2 000 tokens on the same task.
- **Cloudflare Code Mode** (Feb 2026): 2 500+ endpoints behind **two** tools —
  search and execute — in roughly 1 000 tokens.

The single shared idea: **progressive disclosure — the catalogue stays large, the working
set stays small.** Retrieval-based tool selection (tools in a vector store or knowledge
graph, equipped at runtime) is now the standard, not fine-tuning.

Research frontier beyond that, in rough order of relevance to us:
**Graph RAG-Tool Fusion** (models *dependencies* between tools — "get stock price" needs
"get stock ticker"), **Tool-to-Agent / Agent-as-a-Graph** retrieval (+14.9% Recall@5 over
prior SOTA on LiveMCP-Bench), **HYSET** (scores the tool *set* jointly rather than each tool
in isolation), **SING** (intention-graph, retrieves as the task state evolves),
**MemTool** (removes tools from context once the question is solved).

## §3 · WHERE WE ALREADY ARE — and the one thing we withhold

**Our gateway is already the search-and-execute shape.** `search_tools` + `call_tool` over
22 inner Superset tools is exactly Cloudflare's Code Mode topology, built before we read any
of this.

**But we perform the disclosure and withhold the types.** `search_tools` returns a name, a
description and `parameters_hint: "request"` — and *nothing about the parameters*. So the
model does the right thing (searches, finds `get_chart_data`) and then guesses the argument
shape. `backend_tools.input_schema` already exists in our database and is empty.

That reframes `TOOL-EARNED-TRUST-1`: it is not "publish some schemas". It is **finishing the
progressive-disclosure pattern we already implement half of** — the schema is returned by
the search, on demand, for the tool actually chosen. Preloading all 154 would re-create the
bloat we accidentally avoided.

**And we already own the code-execution half too, unused.** `ctx.resultStore` with
`aggregateRecords` / `queryRecords` and a tier-3 `STORED handle=` path is precisely
"filter in the environment, return the small thing". It never fires because
`MAX_TOOL_RESULT_CHARS = 40000` is **per call** and no single call reached it.
`RESULT-BUDGET-1` is therefore not new machinery — it is **moving an existing threshold
from the call axis to the turn axis** and routing the overflow into the store the model can
already query.

## §4 · PLANNING — the honest read, including what argues against a planner

There is **no universal winner**, and any source claiming one is selling something.

- **ReAct** (what stage 04's note describes): adaptive, cheaper per task (~2 000–3 000
  tokens vs ~3 000–4 500 for plan-and-execute), and its named weakness is *short-term
  thinking* — no holistic view, inefficient paths, failures when steps depend on each other.
- **Plan-and-Execute**: better completion on structured multi-step work with dependencies;
  cost profile roughly `1×strong_model + N×cheap_model`, which **beats ReAct for N > 3**.
  Its named failure mode is **the brittle plan** — the planner commits before seeing any
  tool output. The published fix is a **re-plan gate**: after every K steps, or on any
  surprising output, ask whether to revise the remainder. Devin uses plan-first with
  re-planning when the executor stalls.
- **2026 consensus**: hybrid — plan-and-execute as the outer layer, ReAct inside each step.

**Applied to us:** our failing turn made 12 calls, six of them redundant
`resolve_time_range`. That is textbook ReAct inefficiency at N ≫ 3, which is exactly the
regime where the cost argument flips. **`PLANNER-0` must be plan-first *with a re-plan
gate*, never a rigid upfront plan** — otherwise we trade a wasteful agent for a confidently
wrong one.

## §5 · PROCEDURAL MEMORY — `PROCEDURE-RECALL-1` is a named, measured field

The owner's item has a literature name and published numbers.

- **AWM (Agent Workflow Memory)**: induces reusable *workflows* — abstracted action
  templates — from successful trajectories and retrieves them as procedural guidance.
  Explicitly credited with **reducing redundant exploration**. Memory grows with the
  diversity of workflows, not the number of trajectories, so the store stays compact.
- **Memp**: stepwise procedures with an *update* mechanism, sitting between purely episodic
  stores and abstract workflow libraries. Its cold-start answer: define a robust evaluation
  metric first, then keep the trajectories that score highest.
- **Measured effect (REAL benchmark)**: reliability **74.5% → 79.0%**; steps to completion
  **25.2 → 20.2** on average — and for **Gemini 2.5 Flash specifically, 28.9 → 22.3**.
  That is our production model.
- **Microsoft shipped it as a product** (Foundry, June 2026) with TTL configuration, framing
  the shift as memory moving *from a personalization feature to a core part of reliable
  agent execution*.
- **H-EPM**: a tool graph built from accumulated trajectories where recurring tool-to-tool
  dependencies are the procedural routine and each edge carries a compact episodic summary.

**Five published warnings, and every one of them is already one of our laws:**
1. Do not store raw traces — abstract the routine, drop incidental noise.
2. Do not recall by keyword alone — score semantic relevance before following a routine.
3. Never-expiring workflows rot: schemas and policies change, so procedures need freshness
   checks. *(Our TTL and `empty≠zero` posture already say this.)*
4. Do not let failed runs write memory automatically — bad trajectories go to review, not
   into the playbook.
5. Do not measure only final success — pair completion with **step efficiency**.

Warning 5 is the one to act on immediately: it names the metric that would have caught our
six redundant time calls, and we do not measure it today.

## §6 · MEMORY HIERARCHY — the owner's hunch, graded precisely

**The hunch is correct, and one part of it is already solved in our code.**

**What is already right.** Our episodic score is
`keyword:3 · entity:2 · recency:2 · importance:1`. That is the Generative Agents composite
(`α_rel·relevance + α_imp·importance + α_rec·recency`) — the de-facto standard adopted by
MemGPT/Letta, Mem0 and LangGraph — **plus** an entity term most implementations lack.
Importance is computed, stored and *used in ranking*. This tier is not the problem.

**What is actually missing: the other tiers.** The canonical taxonomy (CoALA, Princeton) is
**working · episodic · semantic · procedural**. We implement **one** — episodic — and the
2026 survey's diagnosis lands on us verbatim: *different memory types require different
retrieval logic, and most production systems collapse them into a single retrieval problem
when they are not.* A related survey: *most current systems implement only two layers well
and handle the transitions between layers via crude heuristics.*

Concretely, for the question that failed three times:

| tier | what it would hold | do we have it |
|---|---|---|
| working | the live context window | yes (implicitly) |
| episodic | *"this was asked on 2026-08-05"* | **yes** |
| semantic | *"Granit gas consumption lives in chart 85"* | **no** |
| procedural | *"this class of question is answered by `list_charts(search) → get_chart_data(identifier)`"* | **no** |

**Therefore: raising `retrievalTopK` from 3 is NOT the lever, and I recommend against
leading with it.** `retrievalTopK` is governed (floor 3, clamp [0,8]) and could be published
to 8 today — but every extra line is the same weak shape (*"you asked this, and these tools
ran"*), and the tools it names are the ones that failed. More of a weak signal is **context
dilution**, which the retrieval literature names as its own failure mode: the fix is *not*
"retrieve more" but score thresholds instead of a fixed K, plus reranking that cuts the long
tail. One published ablation finds accuracy peaking around top-k 10–14 *and then degrading
from retrieval noise* — the curve has a top, and we are not on the wrong side of it for the
reason the owner suspects.

**What I would be wrong about, and the measurement that proves it:** if the procedural tier
lands and recall still misses, then K *is* the constraint and it moves on that evidence.
The instrument already exists — the procedure chip flipping `none → some`.

## §7 · BENCHMARKS — the external comparison set SOTA-1 requires

- **τ-bench / τ²-bench** (Sierra): tool-agent-user interaction with **policy adherence** and
  `pass^k` reliability across trials. Even strong function-calling agents solved <50% of
  tasks with `pass^8 < 25%` in retail in the original work. The 2026 update added voice and
  a **knowledge-retrieval domain with configurable RAG pipelines**. Closest published proxy
  to what CWF does.
- **BFCL v4** (April 2026): re-weighted to holistic agentic evaluation — **Agentic 40%**
  (multi-step plan-and-execute), **Multi-Turn 30%**, Live 10%. Tests whether a model
  *identifies the right function and fills its parameters with valid values* — our BUG-021
  in benchmark form.
- **LiveMCP-Bench**: where the tool-retrieval papers report Recall@5 / nDCG@5.
- Caution recorded: leaderboard rows vary by harness, tool schema, attempt budget and
  verification level; τ-bench v1.0.1 re-graded a domain and made older scores incomparable.

## §8 · WHAT I RECOMMEND — and what does NOT change

**The queue order is validated by the research, with one refinement each.**

1. `BURST-GUARD-1-FIX-1` — unchanged, in flight.
2. **`RESULT-BUDGET-1`** — refined: not new machinery. Move `MAX_TOOL_RESULT_CHARS` to the
   **turn axis** and route overflow into the existing `resultStore` handle the model can
   already `query`/`aggregate`. This is Anthropic's code-execution pattern with parts we own.
3. **`TOOL-EARNED-TRUST-1`** — refined: return the schema **from the search, on demand**,
   for the chosen tool. Do not preload 154 schemas; that re-creates definition bloat.
4. **`PROCEDURE-RECALL-1`** — shaped by AWM/Memp: abstract the routine (never the raw
   trace), semantic recall (never keyword-only), TTL + freshness, **successful trajectories
   only**, and publish through the existing registered-procedure organ, absence-only, on the
   `selfSeedReconciler` precedent.
5. `PROSE-RENDER-PARITY-1` (+BUG-028, BUG-029) — unchanged.
6. … rest unchanged. **BUG-005 remains last.**
7. **`PLANNER-0`** — after (4), as plan-first **with a re-plan gate**, consuming the
   procedural tier rather than planning from a blank page.

**Two new named items for the owner to place** (I place nothing myself):

- **`STEP-EFFICIENCY-1`** — measure steps-to-completion per turn, not just completion. The
  literature's warning 5, and the metric that would have flagged six redundant
  `resolve_time_range` calls. It is also the number that proves whether (2)–(4) worked.
- **`SEMANTIC-MEMORY-1`** — the missing declarative tier (*"Granit gas = chart 85"*). Named
  now so it is on the board; it may well be subsumed by (4), and if it is, it retires by
  evidence rather than by being forgotten.

**What does NOT change:** the ceiling stays **300 000** (owner ruling); the three brakes
stay on their three shafts; `empty≠zero`, the eval gate, DB-first/code-floor and every ADR
are untouched by anything in this document. None of the research above argues for relaxing
a governance law — several of them argue that governance is the part most systems lack.
