# NotebookLM Regeneration Prompt — Corrected CWF Deck · v3 (COMPACT)
<!-- v3 · 2026-07-07 · Compact edition of v2 (v2 was too long for NotebookLM's instruction box). All detail
     lives in the uploaded source `cwf-real-architecture-reference-for-notebooklm-v2.md`; this prompt only
     pins NotebookLM to it + the essential directives. Paste the block below after uploading that source as
     the highest-priority source. -->

---

Prepare a lecture-grade technical presentation on the CWF (Chat With Factory) architecture for software/AI engineers — a teaching lecture, not marketing.

GROUND TRUTH: the uploaded `cwf-real-architecture-reference-for-notebooklm-v2.md` wins over the old deck, the web, and any generic "how agents work" assumptions. Obey its 3 tags: [CWF-REAL] = shipped today; [REFERENCE-MODEL] = generic SOTA theory (teaching scaffold only, never shown as CWF); [ROADMAP] = future target (never shown as shipped). Put ALL roadmap content in one arc at the END, never interleaved with "today" slides.

KEEP as scaffolds: LLM-as-CPU, the compiler analogy, and the 14-stage pipeline as a reference model — plus the source's honest 14-stage mapping table (HAVE/STUB/DEFERRED/DIVERGENT). Replace any "CWF = 14 stages" with CWF's REAL pipeline: nine pre-stream stages (resolve-mcp → resolve-backends → telemetry-init → lab-overlay → persistence-init → resolve-provider → register-tools → assemble-prompt → warm-trust), then stream → tool-loop → deterministic grounding → persist.

FIX 5 errors — never present these as CWF: (1) no vector/graph RAG or MemGPT — CWF uses deterministic, typed, always-injected governed data; (2) no LLM intent / semantic router / HyDE — a keyword router feeds tool-select only; (3) no Critic/Judge model at runtime — verification is pure deterministic code (LLM-judge banned); (4) no NeMo Guardrails — safety = CORE prompt-safety + injection boundary; (5) no planner/DAG, compression, or long-term memory shipped.

ADD (from the source): the two backends (ARMES + Superset) + ADR-001 trust ("make a lying backend harmless, not honest"); capability-not-role RBAC + sandbox-vs-global; precise observability (span-processor redaction → self-hosted Langfuse, HTTP-only OTLP, force-flush, full 32-hex trace-id join key). ROADMAP arc: every backend becomes a selectable governed connector (Langfuse sink, LLM endpoints incl. on-prem Ollama/LM Studio, MCP); optional off-by-default connectors (Intent-LLM, LangGraph, Memory, Knowledgebase-RAG); and give THE INVARIANT its own slide — connectors are advisory/additive, never replacing or bypassing the deterministic governance floor (a RAG connector feeds reference context, never authoritative truth). Every govern/tweak datum must be admin-panel accessible.

Web research only to explain generic concepts, never to override the source about what CWF does. Lecture level, precise, no hype.

---

<!-- END · cwf-notebooklm-regeneration-prompt-v3 · rev 3 · 2026-07-07 · compact edition of v2 -->
