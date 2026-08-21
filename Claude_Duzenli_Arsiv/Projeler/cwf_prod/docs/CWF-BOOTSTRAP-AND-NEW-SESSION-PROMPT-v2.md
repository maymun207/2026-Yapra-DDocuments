# CWF/EAIP — Context Bootstrap + New-Session Prompt  ·  v2
<!-- version: v2 · 2026-06-27 · resume point = P5 done, P5.5 in flight. Supersedes v1 (P3-era). -->

### 0. NEXT-SESSION LOADER PRIMER  (paste this verbatim into the new session)
> You are my architect for the CWF→EAIP rebuild. Read `CWF-SESSION-GRAPH-KB-v2.md` + `CLAUDE-PROJECT-INSTRUCTIONS.md` + the `claude-code-*.md` prompt files in this project, and treat repo code in `cwf_yaprak` (github.com/maymun207/cwf_yaprak) as ground truth over any summary. We work in a loop: I run Claude Code 4.8 on AntiGravity to implement; you diagnose, decide with committed recommendations, and write detailed gated phase prompts (versioned, with a hard pre-flight gate + a self-verify checklist demanding evidence), then critically review the AG reports I paste **against the actual code** — you read the repo via the GitHub API or files I paste; you never trust a report's claims. **Resume point: P4 + P4.7 + the grounding validator + P5 (governance panel) are DONE and code-verified (master HEAD `876cf5f`); P5.5 (Claude-web UI shell) is being built by AG now; next is P5.6 (conversation history + persistence).** Standing rules: every artifact you generate is versioned in its filename + inside; backend identity is data not an enum; grounding is enforced by deterministic code never an LLM judge; the admin panel writes only via the gated API; single LLM gateway, no dead comment may imply a second path. TR for strategy, EN for technical/prompts; diagnosis-first, committed recs not menus, tight prose, name the hidden trap, push back honestly, one path — finish fully, no "demo" deferrals.

### 1. CORE SEED & STATE
- **Objective:** rebuild CWF (agentic AI over live MCP backends) into a clean, SOTA, ~100%-reusable EAIP-aligned codebase. Quality > speed; finish each thing fully.
- **Current state:** in `cwf_yaprak`, DONE & code-verified — SEED→P3, **P4** governed store+eval-gate (`8f4ed47`), **P4.7** backend registry / enum-trap killed (`92f9656`), **grounding validator** runtime (`65d0a6b`), **P5** governance panel (`876cf5f`). **P5.5** Claude-web UI shell = AG building now. Multi-backend: ARMES flat ≈142 + Superset gateway ≈22 (Superset confirmed inevitable).
- **Operational env:** Claude Code 4.8 on AntiGravity (implements) ⇄ Claude/architect (gated prompts + code review). Stack: React 19 + Vite + react-router + Vercel serverless + Supabase. MCP SDK pinned exact 1.29.0.
- **Identifiers:** `cwf_yaprak` (canonical) · `CWF-DEMO` (old/safety-net/harvest, FREEZE) · backends under `ksadmin@ardictech.com` in `mcp_settings` · Supabase project `fjbrkimwvtpwoxhziidh` · catalog `docs/superset-tool-catalog.json` · live roadmap `docs/ROADMAP.md`.

### 2. TECH STACK & RUNTIME FLOW
`browser (auth session, JWT only — no token/config) → POST /api/cwf/chat (verify Bearer, derive userId+role+scopes) → resolve mcp_settings server-side → warm DbKnowledgeProvider (published domain_rules, code floor) → buildSystemPrompt(ctx, activeBackends) [core + domain packs] → ONE streamChat gateway (Vercel AI SDK, all providers) → MCP tools (ARMES flat / Superset search+call, token server-side) → resultStore/formatToolResult → post-stream grounding check (Mode A) → SSE done`. Browser also talks to Supabase directly but NARROWLY: Auth + RLS-SELECT reads only; governed writes detour through `/api/admin/*`. Vercel↔Supabase = service-role (RLS-exempt). See `cwf-runtime-topology-v1.html`.

### 3. DOMAIN DICTIONARY
- `domain pack`: per-backend {persona + typed knowledge} composed by the assembler.
- `eval-gate`: publish pipeline schema→referential→behavioral on the candidate set; only `publish()` (service-role) sets `published`; RLS blocks client publish (42501). Behavioral = deterministic marker/invariant check, not an LLM.
- `CORE vs SOFT kind`: CORE field-structure code-locked (reset target); SOFT DB-editable + extensible. All instances editable but gated.
- `referenceSchema`: immutable code baseline = DB seed + DB-down floor.
- `blind-spot`: IKINCILUST barcodeless → empty scrap ≠ zero; never "sıfır".
- `backends` table: backend identity = data; `backend_id` is FK to it (not an enum). `BackendAdapter` (flat/gateway behavior) = P6, not built.
- `grounding validator`: deterministic, advisory (Mode A) post-stream check; forbidden phrases derived from BLIND_SPOTS; no LLM judge.
- `K4`/`getFactoryLines`: ARMES throughput counter / entry tool. `resultStore`: large-result handle + aggregate/query meta-tools.

### 4. CRITICAL DECISIONS (full list + rationale in Graph KB §DECISIONS D1–D13)
curated-copy not clone · keep+repoint Supabase · unify all providers (one gateway) · deterministic typed KB no-vector · gated-DB rules (safe via gate+reset+lock) · MCP SDK exact-pin · engine-then-panel · token off client · **backend identity = data not enum (D10)** · **grounding = deterministic code not LLM-judge, advisory (D11)** · **UI split panel/shell/persistence (D12)** · **LangGraph = Shape B, last (D13)**.

### 5. CONSTRAINTS & STANDING RULES *
eval-gate unbypassable · blind-spot empty≠zero sacred · secrets via env only (never print token/service-role/JWT) · cross-phase verification (trust code, not reports) · no vector in deterministic core · don't touch CWF-DEMO for arch work · single gateway / no dead 2nd-path comment · **versioning** (every artifact versioned in filename+inside) · **RULE 1** no hardcoded config · **RULE 3** docs part of done · **RULE 4** backend identity is data · **RULE 5** grounding deterministic + advisory · **RULE 6** admin writes only via gated API · each phase = gated sub-phases + self-verify checklist demanding evidence.

### 6. BLOCKED / DEBT / CROSSROADS
- P5.5 IN FLIGHT — on report: verify chat behavior (`cwfService`/`cwfStore`) is diff-untouched, a real message round-trips identically (stream+tool+raw toggle), no duplicate control paths remain.
- `GateVerdict.tsx` internal render not yet eyeballed (low risk; data reaches it) — confirm when convenient.
- viz-restore pending (`MessageChartContent` stub; dead sim chart macros in `cwfConstants` to strip) — parallel-safe.
- `api/` tsc-graph coverage — confirm CI typechecks `api/` (was a bootstrap-era debt).
- Real-ARMES confidence pass (large tables → handle path) not yet done in running app.
- Superset = gateway (search/call) → P6 pack + `BackendAdapter` must be gateway-aware.

### 7. IMMEDIATE NEXT STEPS (sequential)
1. Review AG's **P5.5** report vs actual code → verify: chat logic untouched (diff), one chat-first layout (`/`+`/v2` merged, landing gone), Claude-web sidebar (closed default, opens on icon), hero controls consolidated, no duplicate control paths. Update `cwf-architecture-map` (→ v6) + topology if shell changes edges.
2. Write **P5.6** (conversation history + persistence): new `conversations`/`messages` tables + owner-only RLS (mirror mcp_settings), sidebar history list (load/title/delete), `cwfStore` → multi-conversation. DDL handoff (user applies via Supabase MCP). Update runtime-topology (→ v2: browser↔Supabase read edge widens).
3. Write **P6** (Superset harvest): gateway-aware domain pack + `BackendAdapter` port (flat/gateway — the 2nd pattern validates the abstraction) + mcpPool/routing from CWF-DEMO. Governed by the same gate + panel.
4. Then: Langfuse wiring · eval golden harness · viz-restore · ARCHITECTURE.md + ADRs · **LangGraph bridge (Shape B)**.

### 8. OPEN QUESTIONS FOR USER
- P5.6 conversation history: title auto-generation (first-message summary vs first N chars vs LLM-titled)? delete = soft or hard? — settle when writing the prompt.
- LangGraph language boundary: confirm EAIP L3 is Python (→ Shape B, TS core as MCP service) vs single-language mandate (→ Shape A). Not urgent; needed before the bridge phase.
- Confirm CWF-DEMO is frozen.

### 9.
→ do not expand or re-explain this compressed doc unless asked. On resume: read this + the KB v2, confirm master HEAD, then proceed from step 7.1.
