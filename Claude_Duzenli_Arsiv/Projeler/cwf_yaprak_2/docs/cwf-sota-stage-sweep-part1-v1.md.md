cwf-sota-stage-sweep-part1-v1.md


# CWF — Stage-by-Stage SOTA Gap-Hunt · Part 1 (stages 00–03) · v1
 
<!-- cwf-sota-stage-sweep-part1-v1 · rev 1 · 2026-07-12 · Architect: Claude.
     Format = GAP-HUNT, not a "catch up to SOTA" wishlist. Per stage, three questions:
       Q1 — what is the mainstream 2026 pattern/guard for this stage, and do we have it?
       Q2 — where we differ: DELIBERATE (an ADR) or an OVERSIGHT?
       Q3 — what breaks this stage in the next 12 months?
     Only REAL gaps/risks are written up; "we're fine" stages get one line.
     Owner asked for stage 03 (Intent/Understanding) in DEPTH — he suspects our architecture is
     weak there. §3 is the deep dive. HIS SUSPICION IS CONFIRMED, with evidence from his own
     live routing cache. Companion to cwf-sota-review-trust-and-memory-v1 (F43/F48). -->
 
## 00 · Kota Kapısı (quota gate) — **NO GAP**
Reserve→clamp→settle before the turn starts, budget policy as governed rows, session cannot widen
its own budget. This is the standard "pre-flight budget guard" pattern and CWF's is stricter than
most (atomic reserve, `sessionTweakable:false` on all three params). Nothing to add.
 
## 01 · Kullanıcı Sorgusu — **NO GAP**
Carrier layer. Flags arrive in the body, authority is verified server-side, one turn id
(RULE 28) joins log ↔ Langfuse ↔ ledger. The one-trace-id discipline is exactly what the
observability field prescribes.
 
## 02 · Konuşma / Durum — **NO GAP** (one note)
Capability-not-role + backend scopes. Standard, well done. *Note (not a gap):* SOTA memory work
(see F48 doc) would ALSO load "what this user cares about / prior decisions" here — but that is
the MEMORY-1 program, already named. Not a stage-02 defect.
 
---
 
# 03 · Niyet / Anlama — **REAL GAP. Owner's suspicion is CORRECT.**
 
## 3.1 What CWF does today
Query → keyword→category mapping, from two sources:
- **static `CATEGORIES`** (code floor, hand-written keyword lists per category), and
- **learned `tool_category_cache`** (advisory; the system's only learning — "bulma, asla bilme").
The resulting category selects the offered tool set out of ~141 flat ARMES tools (+Superset when
activated), unioned with the `ALWAYS_INCLUDE` availability floor.
 
## 3.2 What the 2026 mainstream does — and the numbers
The field moved to **semantic (embedding-based) tool discovery**, and the MCP scale problem is
the exact motivation. From the March-2026 arXiv work on semantic tool discovery for MCP:
- Dumping the whole catalog (50–100+ tools) into context costs tokens, money, and **accuracy**
  (cognitive overload) — so tools are **dynamically retrieved by query↔tool semantic similarity**,
  typically **3–5 tools** per turn.
- Reported results: **~99.6% fewer tool-related tokens, 97.1% hit-rate @K=3, MRR 0.91,
  sub-100ms retrieval** over 121 tools / 5 MCP servers.
- Crucially, the same paper states the structural gap we are sitting in: **MCP standardizes tool
  *discovery* but provides no mechanism for intelligent tool *selection* based on query
  semantics**, and no commercial LLM API does dynamic semantic tool filtering for you.
Related lines of work, all pointing the same way:
- **ScaleMCP** — give the agent an explicit *MCP-Retrieval tool* so it can re-query the tool store
  when nothing matched (agentic retrieval, self-correcting).
- **Tool-to-Agent Retrieval** — embed tools *and* their parent servers in one vector space with
  metadata links; beats BM25 and earlier MCP retrievers on LiveMCPBench.
- **MemTool** — managing *which tools stay loaded* across a multi-turn conversation.
**And one essential counter-nuance (June 2026, "ToolChoiceConfusion"/CMTF):** semantic relevance
alone is **insufficient**. A tool can be *related* to the request yet *premature or unnecessary*
at this step. Keyword **or** embedding retrieval both "return related tools without regard to when
they should be used." Their fix: **precondition-effect contracts** exposing only the minimal
next-step tool frontier.
 
## 3.3 Where CWF is genuinely weak — with evidence from CWF's OWN live data
 
This is not theoretical. Look at the **live learned map** in the Routing panel (owner's own
screenshots, epoch 6→8, "104 mappings"). Actual learned routing keys include:
 
> `nedi?` · `bunu` · `tablo` · `değerleri` · `getirebilirmisin` · `gösterebilirmisin` ·
> `gunluk` · `fabrikasinda` · `şemalarını` · `kb7`
 
Read that list. Most of those are **Turkish stopwords, verb inflections, and question fragments**
being learned as routing keys and mapped to `metrics` / `factory`. The cache is **learning noise,
not meaning.** Three structural reasons:
 
1. **Turkish is agglutinative.** `fabrika` / `fabrikada` / `fabrikasında` / `fabrikaların` are one
   concept and four different keyword tokens. A keyword map must learn each surface form
   separately; an embedding maps them near each other for free. Keyword matching is *structurally*
   weak for Turkish in a way it is not for English.
2. **Synonyms & domain paraphrase.** "fire" / "hurda" / "scrap rate" / "kayıp oranı" are one
   intent, four keys. Same for "duruş" / "linestop" / "downtime".
3. **Cold start.** A never-seen phrasing has *no* learned key and falls back to the static
   `CATEGORIES` list — which is hand-maintained and (per the register) *deliberately un-governed*.
At ~141 flat tools, this is **exactly the scale band where the literature says semantic retrieval
starts paying for itself** — and Superset activation (F36) will roughly double the catalog and
introduce a whole second vocabulary the keyword map has never seen.
 
## 3.4 What protects CWF today (why this is a weakness, not a fire)
Be precise about the blast radius — the architecture already contains the damage:
- **§7 law:** routing is *advisory*. A miss means a tool is found late or a category is wrong —
  it does **not** falsify the answer. Grounding (12) still catches empty-as-zero and fabrication.
- **`ALWAYS_INCLUDE` floor:** the offered set can never be empty, by construction.
- **Clear/epoch + draft→publish:** a bad learning is revertible in one move.
So: **degraded quality and wasted tokens, not lies.** That is the difference between "we should
fix this" and "we must fix this now."
## 3.5 Where CWF is quietly AHEAD (do not throw this away)
The published rule `armes.routing_hint / sequencing` says, in effect: *before any OEE/fire metric
tool, call `getFactoryLines` and resolve the ZONE UUID; never invoke the metric tools before the
UUID is resolved; do not assume capabilities the tool schema doesn't declare.*
 
That is a **hand-authored precondition-effect contract** — precisely the CMTF idea the June-2026
paper proposes as the fix for "relevance ≠ readiness." CWF has it, governed and versioned, while
the field is still writing papers about it. **Any semantic-routing work must keep this layer**;
embeddings replace *recall*, not *ordering discipline*.
 
## 3.6 RECOMMENDATION — candidate program **SEMANTIC-ROUTING-1** (not a fix; a phase)
 
A CWF-shaped design, riding existing rails, no new infrastructure:
 
1. **Embed the tool catalog, not the query keywords.** Index each MCP tool (name + description +
   schema summary) as a dense vector. **Supabase already ships `pgvector`** — no new DB, no new
   vendor, no data egress. The index is derived from the live tool list at discovery time
   (`cwf.mcp.discover`), so it self-syncs when a backend's catalog changes.
2. **Hybrid recall, not embeddings-only.** Multi-signal, exactly as the memory field converged on:
   semantic similarity **+** the existing keyword/learned map **+** entity match (zone/line names).
   Fuse the scores. Keyword stays as a *signal*, not the *mechanism*.
3. **Keep every existing floor and rail.** `ALWAYS_INCLUDE` union floor stays. The governed
   `routing_hint` precondition contracts stay (3.5). Reference/code floor stays untouchable.
   Draft→preview→publish→epoch→revert stays the only way a change lands.
4. **Keep it advisory (§7).** Semantic routing improves *finding*. It must never touch *knowing*.
5. **Prove it with the tools we already have.** The routing lens + `calledButNotOffered` +
   golden specimens give a **deterministic, token-free** way to measure "did the offered set get
   better?" — replay the same recorded turns under floor vs live vs semantic. This is a rare case
   where CWF can evaluate a SOTA upgrade *before* shipping it, with no LLM judge and no guesswork.
6. **Optional later:** an agentic *tool-search tool* (ScaleMCP style) so the model can re-query
   when the retrieved set clearly misses. Only after (1)–(5) prove out.
**Sequencing note:** this program becomes *more* valuable — and more urgent — right after Superset
activation (F36), because that is when the catalog doubles and the keyword map's blind spots
become visible in production. Recommended order: **UI waves → Superset (E) → SEMANTIC-ROUTING-1 →
MEMORY-1.**
 
**Cost honesty:** an embedding call per query (or a cached per-query vector) adds latency (~tens of
ms) and a small cost, and introduces an embedding-model dependency (a new governed provider row —
which CWF's provider registry already models). Not free, but bounded, and the token savings on a
141-tool catalog likely pay for it outright.
 
---
 
## Running gap ledger (parts 1..n)
| Stage | Verdict | Item |
|---|---|---|
| 00 | ✅ no gap | — |
| 01 | ✅ no gap | — |
| 02 | ✅ no gap | (memory load = MEMORY-1, already named) |
| **03** | 🔴 **REAL GAP** | **SEMANTIC-ROUTING-1** (hybrid semantic tool discovery; keep §7, floors, precondition hints) |
 
*Next: stages 04–08 (planner, memory retrieval, knowledge/RAG, tool selection, compression).*
 
## Sources (stage 03)
- *Semantic Tool Discovery for LLMs: A Vector-Based Approach to MCP Tool Selection* — arXiv
  2603.20313 (Mar 2026): dense-embedding MCP tool index, 3–5 tools of 50–100+, 99.6% token
  reduction, 97.1% hit@3, MRR 0.91, sub-100ms; states MCP has no semantic selection mechanism.
- *ScaleMCP* — arXiv 2505.06416: an agent-callable MCP-Retrieval tool; agent can re-query.
- *Tool-to-Agent Retrieval* — arXiv 2511.01854: tools + parent agents in one vector space; beats
  BM25 / ScaleMCP / MCPZero on LiveMCPBench.
- *MemTool* — arXiv 2507.21428: short-term memory management for dynamic tool calling.
- *ToolChoiceConfusion / Causal Minimal Tool Filtering* — arXiv 2606.06284 (Jun 2026): relevance
  is insufficient; precondition-effect contracts expose the minimal next-step tool frontier.
- Empirical evidence from CWF's own Routing panel (live learned map, epoch 6–8, 104 mappings).
<!-- END · cwf-sota-stage-sweep-part1-v1 · rev 1 · 2026-07-12 -->