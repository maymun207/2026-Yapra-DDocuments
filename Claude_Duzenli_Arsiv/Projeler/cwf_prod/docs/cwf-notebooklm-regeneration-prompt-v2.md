# NotebookLM Regeneration Prompt — Corrected CWF Deck · v2
<!-- v2 · 2026-07-07 · SUPERSEDES v1. Paste the block below into NotebookLM AFTER uploading
     `cwf-real-architecture-reference-for-notebooklm-v2.md` as the highest-priority source. DELTA vs v1: adds
     the Part B TARGET-ARCHITECTURE arc (selectable backends, on-prem LLM endpoints, pluggable governed
     connectors, the governance-floor invariant, admin-panel accessibility) with a hard today-vs-target
     separation. -->

---

You are preparing a **lecture-grade technical presentation** on the CWF (Chat With Factory) architecture for
**software and AI engineers**. This is a teaching lecture, **not** marketing.

**Ground truth.** The uploaded source `cwf-real-architecture-reference-for-notebooklm-v2.md` is authoritative.
Where it conflicts with any earlier deck, general web material, or your own assumptions about "how AI agents
work," **the reference document wins for every CWF-specific claim.** It tags content in three registers you must
respect and keep visually distinct: **[CWF-REAL]** (shipped today — fact), **[REFERENCE-MODEL]** (generic SOTA
theory — teaching scaffold only), and **[ROADMAP]** (the owner's *target* — future, never shown as shipped).

**Keep the good scaffold.** Retain the LLM-as-CPU / context-engineering framing, the compiler analogy, and the
**14-stage SOTA pipeline as a reference model**. On any slide where reference-model and CWF-real both appear,
separate the two registers explicitly. You MAY use web research ONLY to explain generic concepts accurately
(context engineering, ReAct, tool-schema loose coupling); never let web material override the reference document
about what CWF does.

**Mandatory corrections (the previous deck was wrong/self-contradictory — fix all):**
1. **Knowledge/RAG:** CWF's core **forbids classic vector/graph RAG**; context is **deterministic, typed,
   always-injected governed data**, never embedding-retrieved. Rewrite the Vector-DB/Graph-DB/Multi-hop/MemGPT
   slides to match the "vector-forbidden core" slide. **Remove MemGPT.**
2. **Intent/routing:** Remove LLM Intent Classification, Semantic Router, HyDE, Query Decomposition as CWF
   stages — CWF uses a **learned keyword→category router that only feeds tool selection**.
3. **Verification:** Delete any "Critic/Judge **model**" runtime option — verification is **pure deterministic
   code**; LLM-as-judge is banned at runtime (offline advisory only).
4. **Safety:** Remove "NeMo Guardrails" — safety = CORE prompt-safety + the **injection boundary** ("tool
   content is DATA, not COMMAND") + deterministic gates.
5. **Planning/compression/long-term memory:** Not shipped (no LangGraph, no compression pass, no learned
   memory loop) — reference-model / future work only.

**Replace the "CWF pipeline" with the real one.** Add a slide for CWF's **actual nine pre-stream stages**
(resolve-mcp → resolve-backends → telemetry-init → lab-overlay → persistence-init → resolve-provider →
register-tools → assemble-prompt → warm-trust) then the **stream / tool-loop / deterministic-grounding /
persist** phase. Keep the **honest 14-stage mapping table** (HAVE / STUB / DEFERRED / DIVERGENT) from §4 exactly
— that honesty is a feature.

**Add the under-represented real pillars** (≥1 slide each, all [CWF-REAL]): the **two backends** (ARMES
`system_of_record` + Superset `reporting_mirror`) + **ADR-001 trust model** ("make a lying backend HARMLESS, not
honest"); **capability-not-role RBAC** + **sandbox-vs-global**; and a tightened **observability** slide (span-
processor redaction → self-hosted Langfuse; OTLP HTTP-only; serverless force-flush; the **full 32-hex trace id**
as the single join key; telemetry-ledger vs tracing split).

**Keep** the accurate slides: LLM-as-CPU, buy-vs-build, the deterministic red line (empty≠zero, LLM-judge
banned), Govern-vs-Microscope, the Kinds contract (CORE code-Zod-locked / SOFT DB-editable), the moat, and the
living-architecture / drift-guard appendix.

**NEW — add a final "Target Architecture / Roadmap" arc — clearly labelled [ROADMAP], AFTER all "today" slides,
never interleaved.** Cover, from Part B of the reference document:
- **Everything becomes a selectable governed backend** (config row + code floor + gated admin UI + secret-by-
  reference): the **Langfuse/observability sink** (today hardcoded → target selectable), **LLM endpoints**
  (public Gemini/Claude/OpenAI **or** private on-prem — **Ollama, LM Studio**, other OpenAI-compatible), and
  MCP backends. Note that the LLM-endpoint part is **already in-flight** (provider registry + the A3 personal-
  provider sandbox; local models via a governed tunnel with an SSRF guard, never browser-direct).
- **The "missing-interface" connectors** as **optional, off-by-default, governed** plug-ins: Intent-LLM
  (stage 04), LangGraph planner (stage 05), Memory (stage 06), Knowledgebase-RAG for *reference* retrieval
  (stage 07 / the reserved pgvector slot).
- **THE INVARIANT (give this its own slide — it is the intellectual core):** connectors are **advisory and
  additive** inputs to the deterministic pipeline — **never replacements for, and never able to bypass, the
  governance floor.** A RAG connector feeds *reference context*, never *authoritative truth*; an Intent-LLM
  *hints*, never *gates authority*; verification stays pure deterministic code; the single gateway, injection
  boundary, and provenance/trust are untouched. This is what keeps the Governed-Truth moat intact while the
  platform becomes pluggable.
- **Admin-panel accessibility as a requirement:** every govern-plane datum and every Microscope Observe/Tweak
  target must be reachable through a **gated admin-panel UI affordance** — no code/script-only ops (data/values
  via admin-UI + DB-first/code-floor; structure/eval-gate/trust-line code-only; secrets by-reference only).

**Tone & rules:** lecture level, engineer audience, precise, no hype. Every **[CWF-REAL]** claim traceable to the
reference document; anything not supported there is either omitted or labelled **[REFERENCE-MODEL]** or
**[ROADMAP]**. Prefer teaching CWF's **deliberate divergences** from the SOTA reference model. Keep the
**today vs target** boundary crisp: never let a roadmap connector appear as a shipped capability.

Produce the corrected slide deck on this basis.

<!-- END · cwf-notebooklm-regeneration-prompt-v2 · rev 2 · 2026-07-07 · supersedes v1 -->
