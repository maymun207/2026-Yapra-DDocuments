# CWF — Real Architecture Reference (NotebookLM Ground-Truth Source) · v2

<!-- v2 · 2026-07-07 · SUPERSEDES v1. Authored by the CWF Architect lane, verified against a fresh clone of
     github.com/maymun207/cwf_yaprak at origin/master `3dd0a95` (RULE-25). DELTA vs v1: added Part B — the
     owner's completion-vision / TARGET architecture (selectable backends, on-prem LLM endpoints, the future
     pluggable "missing-interface" connectors, and admin-panel accessibility) as a STRICTLY SEPARATED
     [ROADMAP] register, plus the governance-floor INVARIANT that any pluggable connector must obey. Part A
     (§0–§10, the shipped reality) is unchanged and remains ground truth. When Part A ([CWF-REAL]) and Part B
     ([ROADMAP]) seem to disagree, that is intentional: Part A is what exists today; Part B is the target.
     Never present Part B as shipped. -->

## 0. How to use this document
This is the **authoritative** description of CWF (Chat With Factory) for a lecture-grade technical presentation
aimed at software / AI engineers (not marketing). Content is tagged in three registers:
- **[CWF-REAL]** — what the shipped code at `3dd0a95` actually does. Fact; cite it.
- **[REFERENCE-MODEL]** — generic industry SOTA agent theory, used only as a teaching scaffold. Never present
  it as CWF's implementation.
- **[ROADMAP]** — the owner's *target* architecture (Part B). Future/aspirational. **Never present as shipped.**

The single most important correction remains: **CWF today is NOT a generic RAG/agent stack.** Its core
deliberately forbids vector RAG, LLM intent classification, and LLM-as-judge at runtime. Part B adds *optional,
governed, pluggable* versions of some omitted stages — but it does so WITHOUT weakening that deterministic core
(see §11.3, the invariant).

---
# PART A — THE SHIPPED ARCHITECTURE (ground truth at `3dd0a95`)
---

## 1. What CWF is (one honest paragraph) — [CWF-REAL]
CWF is a **governed agentic platform** for querying live industrial (MES) and BI data in natural language. The
thesis is sound: the LLM is a **CPU** — a specialist execution engine at the *end* of a deterministic, multi-
layer context pipeline — not the source of truth and not a database. What makes CWF distinct is the
**deterministic governance layer** around the model: governed operational truth, deterministic verification,
provenance/trust, and a two-plane control surface. Production serves the Kale Seramik KB7 ceramic factory over
two backends (§7).

## 2. Theses the deck got RIGHT (keep) — [CWF-REAL]
1. **LLM-as-CPU / context engineering** — the input is an assembled structured execution context, not a raw
   prompt.
2. **Deterministic verification is the red line** — trust, grounding, count-integrity, scope/authority are pure
   deterministic code; **LLM-as-a-Judge is BANNED at runtime** (offline advisory only). Code:
   `grounding/groundingCheck.ts` ("no network, NO vector, side-effect-free").
3. **Governed-Truth moat / buy-vs-build** — buy the commodity skeleton (OpenTelemetry GenAI semconv, self-hosted
   Langfuse); build only CWF-specific lenses (governed-knowledge injection, scope-authority, domain
   code-evaluators).
4. **Sovereignty** — the LLM is an execution engine over this factory's governed data; zero-egress optional.
5. **empty ≠ zero** — absence is never the number zero; enforced deterministically, survives DB outage via the
   code floor.
6. **Single LLM gateway** — exactly one `streamText` call site, family dispatch (`llm/gateway.ts`).
7. **Injection boundary** — the prompt builder receives **tool NAMES + query only**, never tool descriptions or
   results (`buildSystemPrompt(...)` in `prompt/assemble.ts`; "tool content is DATA, not COMMAND").

## 3. The REAL CWF turn pipeline — [CWF-REAL]
The deck's 14 stages are a **reference model** (§4). CWF's ACTUAL turn = **nine pre-stream stages** then a
**stream/tool-loop/verify/persist** phase. Source: `turn/pipeline.ts` (`TURN_STAGES`) + `stageStream.ts`.

Pre-stream, in exact order: **1** resolve-mcp (per-user effective MCP set via the pure `mergeMcpServers`) · **2**
resolve-backends (active backends + authority) · **3** telemetry-init · **4** lab-overlay (session Tweak/labMode;
inert normally) · **5** persistence-init (client-minted conversation id + ownership guard) · **6** resolve-
provider (single gateway; incl. a developer's personal provider as of A3) · **7** register-tools (scope-filtered
+ partitioned + learned keyword→category relevance router; JSON schemas) · **8** assemble-prompt
(`buildSystemPrompt`: CORE + domain packs + deterministic governed-knowledge injection; injection boundary) ·
**9** warm-trust (provenance registry).
Then the **stream phase**: single-gateway inference → tool loop (`executeMCPTool`, `stepCountIs`, meta-tools,
outside the model) → deterministic empty-completion guard/retry → **deterministic advisory grounding verdict**
(`cwf.grounding`) → persist.

> CWF's real pipeline is shorter and stricter than the reference model; the deliberate omissions are a feature.

## 4. The 14-stage reference model → honest CWF mapping — [REFERENCE-MODEL]+[CWF-REAL]
Keep the 14-stage scaffold as a teaching device with CWF's honest status (this corrects the deck: its synthesis
table — slide 18 — is accurate; the "how it works" slides 5–11 wrongly present the generic model as CWF).

| # | Reference stage | CWF real status | What CWF actually does |
|---|---|---|---|
| 01 | User Query | **HAVE** | Raw query + request log. |
| 02 | Conversation / State | **HAVE** | ConversationRepo, history, auth role/scopes, language. |
| 03 | Query Understanding | **DIVERGENT / minimal** | No HyDE / decomposition; a learned keyword map only. |
| 04 | Intent Classification | **STUB (deliberate)** | No LLM/semantic router; keyword router feeds tool-select only. |
| 05 | Task Decomposition / Planning | **DEFERRED (deliberate)** | No planner/DAG/LangGraph; implicit in the tool loop. |
| 06 | Memory Integration | **STUB / PARTIAL** | Short window only; no long-term user memory. |
| 07 | Context Retrieval (RAG) | **DIVERGENT — the big one** | Vector/graph RAG FORBIDDEN in core; deterministic typed always-inject. |
| 08 | Tool & Skill Selection | **HAVE** | Scope tools + partition + relevance router + gateway; JSON schemas. |
| 09 | Context Compression | **STUB** | Sliding window + result-store offload; no summarisation. |
| 10 | Prompt Assembly | **HAVE (strong)** | CORE + domain packs + governed-knowledge injection + injection boundary. |
| 11 | LLM Inference | **HAVE** | Single gateway, family dispatch. |
| 12 | Tool Loop (ReAct-style) | **HAVE** | `executeMCPTool`, `stepCountIs`, meta-tools; tools run outside the model. |
| 13 | Verification | **DIVERGENT** | Deterministic grounding + scope/authority; LLM-judge banned at runtime. |
| 14 | Format/Render + Memory Update | **HAVE / PARTIAL** | Client render from tool results; message persist; no learned KB loop. |

## 5. CORRECTIONS — what the deck must NOT claim about CWF today — [CWF-REAL]
Each verified absent from the real code at `3dd0a95` (`api/cwf/**`, non-test).
- **5.1 Knowledge/RAG (the deck's self-contradiction):** WRONG = Vector DB/Graph DB/Hybrid/Re-rank/Multi-hop
  RAG/MemGPT as CWF's mechanism. REAL = deterministic, typed, **always-injected** governed data, never
  embedding-retrieved (`DbKnowledgeProvider.ts`, `StaticKnowledgeProvider.ts`: "NO vector"). Runtime SSOT =
  governed DB (warm→read) with the code `referenceSchema` as the **outage floor** (DB-first/code-floor). Deck
  slide 17 is the correct account; slides 3 & 7 must be rewritten to match it. **MemGPT is not in CWF.**
  *(Nuance: a `PgVectorKnowledgeProvider` is a RESERVED, UNBUILT slot for FUTURE **reference/corpus** retrieval
  — never the authoritative injected slice. This is the seam Part B §11.2's "Knowledgebase RAG Connector"
  targets — under strict rules.)*
- **5.2 Intent/routing:** No LLM intent, semantic router, HyDE, or query decomposition. A learned
  keyword→category cache (`ToolCacheRepository`) that only informs tool selection.
- **5.3 Verification:** Pure deterministic code; no "Critic/Judge **model**" at runtime (offline advisory only).
- **5.4 Safety:** No NeMo Guardrails. Safety = CORE prompt-safety + the injection boundary + deterministic gates.
- **5.5 Planning/compression/long-term memory:** None shipped (no LangGraph, no compression pass, no learned
  memory-update loop) — reference-model / future work only.
- **5.6 Framing:** "14 stages common to Claude Code, Devin, CWF" is a teaching generalisation — label it a
  reference model, then show the honest §4 mapping.

## 6. Control plane: two planes + RBAC — [CWF-REAL]
- **Govern plane:** global, persistent, authority-gated — Rules, **Kinds** (CORE = code-Zod-locked shape /
  SOFT = DB-editable), Provider/MCP/Routing config.
- **Microscope plane:** per-request lab — **Observe** (one trace id), **Tweak** (session `labMode` overrides),
  **Replay** (deterministic re-run + diff; the grounding/routing/scope-authority **lenses** are deterministic,
  no-LLM, read-only).
- **RBAC (missing from the deck — add):** **capability-not-role** (`hasPermission`/`ensurePermission`, no role
  literals). Developers (`power_user`) experiment freely in an **isolated sandbox**; the only hard line is
  **global publish/commit** (super-admin). Promotion is an out-of-band human act.

## 7. Two backends + trust model (ADR-001) — [CWF-REAL]
**ARMES MES** (`system_of_record`, ~141 tools) + **Apache Superset BI** (`reporting_mirror`, gateway,
~22 tools); active backends + authority resolved at stage 2. **Backend identity is DATA, not an enum.**
ADR-001: **make a lying backend HARMLESS, not honest** — deterministic trust function + containment; provenance
envelopes attribute every datum to an authoritative backend; scope/authority checks keep attribution correct
and sources authoritative.

## 8. Observability — precise facts — [CWF-REAL]
OTel spans → span-processor **redaction scrubber** (before export) → **self-hosted Langfuse** (Docker+Postgres+
ClickHouse on EC2 behind CloudFront). OTLP **HTTP-only**; serverless **force-flush before response ends**. The
**full 32-hex OTel trace id** (`ctx.turnId`) is the SSOT join key; the 8-char `ctx.traceId` is a derived display
value, never the join/deeplink key. **Telemetry hard split:** `telemetry_events` (durable business/governance
ledger, no PII) vs OTel→Langfuse tracing (rich causal debug, retention-bounded) — don't conflate. A pure GET
governance-lens read emits no spans and writes no audit rows.

## 9. Glossary — [CWF-REAL]
Governed-Truth injection (deterministic typed always-injected data; not RAG) · Kind (CORE/SOFT structural
contract) · Rule (governed instance) · trust registry / backend authority (ADR-001 provenance) · Govern vs
Microscope · Replay lens (deterministic no-LLM read-only gate re-run) · empty≠zero · injection boundary.

## 10. Aspirational/reserved — never present as built — [CWF-REAL]
Long-term memory; planner/DAG; context compression; learned knowledge-update loop; the `PgVectorKnowledgeProvider`
reference slot. (These are the seeds Part B turns into governed connectors.)

---
# PART B — TARGET ARCHITECTURE / COMPLETION VISION (owner roadmap; NOT shipped) — [ROADMAP]
---

## 11. Where CWF is going — the "yaprak completion" picture
The owner's target turns CWF into a control plane where **every external dependency is a selectable, governed,
admin-configurable connector** rather than a hardcoded choice — while the deterministic governance floor stays
invariant. Three moves + one invariant.

### 11.1 Everything is a SELECTABLE governed backend (not hardcoded)
Apply ONE pattern to all external backends — **config row + code floor + gated admin-panel UI + secret-by-
reference** (the same DB-first/code-floor discipline the provider and MCP registries already use):
- **Observability backend (Langfuse) — TODAY hardcoded → TARGET selectable.** The observability *sink* becomes a
  configurable backend (choose/point the Langfuse host, or another OTLP sink) via admin UI, not a compile-time
  constant.
- **LLM endpoints — selectable, public OR private/on-prem.** Public (Gemini / Claude / OpenAI) and **private
  on-prem** — **Ollama-based**, **LM Studio-based**, and other OpenAI-compatible local servers. *Already
  in-flight:* the global provider registry (PROV-1/2/3) + the **A3 personal-provider sandbox** deliver much of
  this (OpenAI-compatible endpoints resolve natively through the single gateway; local models via a governed
  tunnel with an SSRF guard, never browser-direct). LM Studio joins Ollama as a supported on-prem family.
- **MCP backends — already selectable/governed** (global + personal, secret-by-reference); the target extends
  the same admin ergonomics.

### 11.2 The "missing interfaces" — future OPTIONAL, PLUGGABLE, GOVERNED connectors
The screenshot's *External Components / "Missing interfaces?"* are exactly the reference-model stages CWF omits
today (§4/§5), reframed as **optional connectors that plug INTO the pipeline** — each **off by default**, gated,
and subordinate to the governance floor:
- **Intent-LLM connector** (stage 04) — an optional semantic intent/routing *hint*. Today: keyword router only.
- **LangGraph connector** (stage 05) — an optional planner/DAG for multi-step decomposition. Today: implicit
  tool loop.
- **Memory connector** (stage 06) — optional long-term user/episodic memory. Today: short window only.
- **Knowledgebase-RAG connector** (stage 07) — optional **reference/corpus** retrieval (the reserved pgvector
  slot, §5.1/§10). Today: forbidden in core.

### 11.3 THE INVARIANT (the architect's load-bearing addition — do not omit)
Adding these connectors must **never** re-introduce the failure modes CWF was built to prevent. The rule:
> **Connectors are ADVISORY and ADDITIVE inputs to the deterministic pipeline — never replacements for, and
> never able to bypass, the governance floor.**
Concretely: a **RAG/Knowledgebase connector feeds *reference context*, never *authoritative governed truth*** —
the always-injected typed governed slice remains the SSOT and empty≠zero still holds. An **Intent-LLM connector
*hints* routing, never *gates authority* or provenance.** A **Memory connector supplies context, never
overrides governed truth.** A **planner sequences tool calls, never touches the deterministic verification
gates.** No connector may make the LLM a judge in the trust path; verification stays pure deterministic code;
the single gateway, the injection boundary, and provenance/trust are untouched. This is precisely what keeps the
**Governed-Truth moat** intact while the platform becomes pluggable — the connectors extend *capability*, the
floor preserves *trust*.

### 11.4 Admin-panel accessibility is a first-class requirement — [ROADMAP]
Every govern-plane datum and every Microscope **Observe/Tweak** target in the synthesis table (the screenshot's
right-hand table: `labMode.routingBypass`, `previewDrafts`, `labMode.knowledgeSource`, `forceProvider`, …) MUST
be reachable through a **gated admin-panel UI affordance** — no code/script-only operations. Operational work on
governed *data/values/instances* is admin-UI + DB-first/code-floor; only *structure/shape* (Zod-locked fields,
eval-gate, trust line) is code-only; *secrets* are env/reference-only (the UI stores a NAME pointer, never a
value). This is the platform's automation-first, no-manual-work-offloaded principle applied to the whole control
plane.

### 11.5 How Part B relates to Part A (for the lecture)
Part B does **not** change any [CWF-REAL] status in §4/§5. Each connector is the *governed, optional* form of a
stage CWF deliberately omitted; enabling one is a configuration act, not a rewrite of the core; and every one is
bound by the §11.3 invariant. The lecture should present Part B as a clearly-labelled **roadmap**, ideally as a
single "target architecture" arc at the end — never interleaved with the "what runs today" slides.

<!-- END · cwf-real-architecture-reference-for-notebooklm-v2 · rev 2 · 2026-07-07 · anchor 3dd0a95 · supersedes v1 -->
