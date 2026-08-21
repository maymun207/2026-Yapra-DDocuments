# CWF/EAIP — Context Bootstrap (resume in cwf_prod)

### 0. NEXT-SESSION LOADER PRIMER (paste this verbatim into the new session)
> You are my architect for the CWF→EAIP rebuild. Read `CWF-SESSION-GRAPH-KB.md` + `CLAUDE-PROJECT-INSTRUCTIONS.md` + the `claude-code-*.md` prompt files in this project, and treat repo code in `cwf_yaprak` as ground truth over any summary. We work in a loop: I run Claude Code 4.8 on AntiGravity to implement; you diagnose, decide with committed recommendations, and write detailed gated phase prompts, then critically review the AG reports I paste against the actual code. We just finished Phase 3; Phase 4 (governed knowledge store + eval-gate) is being built by AG. Resume from there. TR for strategy, EN for technical/prompts; diagnosis-first, tight prose, name hidden traps, push back honestly.

### 1. CORE SEED & STATE
- **Objective:** rebuild CWF (agentic AI over live MCP backends) into a clean, SOTA, ~100%-reusable EAIP-aligned codebase. Quality > speed.
- **Current State:** Phases SEED→P3 done in `cwf_yaprak`. P4 (governance store + unbypassable eval-gate) prompt delivered, AG building. Agent is multi-backend (ARMES flat ≈140 tools + Superset gateway ≈22).
- **Operational Env:** Claude Code 4.8 on AntiGravity (implements) ⇄ Claude/architect (writes gated prompts). Stack: React 19 + Vite + Vercel functions + Supabase. MCP SDK pinned exact 1.29.0.
- **Identifiers:** repos `cwf_yaprak` (canonical) · `github.com/maymun207/CWF-DEMO` (old/safety-net/harvest, FREEZE) · new project `cwf_prod`. Backends under `ksadmin@ardictech.com` in Supabase `mcp_settings`. Catalog `docs/superset-tool-catalog.json`. Live roadmap `docs/ROADMAP.md`.

### 2. TECH STACK & FLOW
`client (auth session) → /api/cwf/chat (verify Bearer, derive userId+role+scopes) → resolve mcp_settings server-side (token off client) → assembler buildSystemPrompt(ctx, activeBackends) [core + domain packs] → gateway.streamChat (Vercel AI SDK, all providers) → MCP tools (ARMES flat / Superset search+call) → resultStore/formatToolResult → SSE stream`. Knowledge via `DbKnowledgeProvider` (published `domain_rules`, code-`referenceSchema` fallback). Telemetry → `telemetry_events` best-effort.

### 3. DOMAIN DICTIONARY
- `domain pack`: per-backend {persona + typed knowledge} composed into the prompt by the assembler.
- `eval-gate`: server-side publish pipeline schema→referential→behavioral; only it sets `published`; RLS blocks client publish (42501).
- `CORE vs SOFT kind`: CORE field-structure code-locked (reset target); SOFT DB-editable + extensible. All instances editable but gated.
- `referenceSchema`: immutable code baseline = DB seed + DB-down fallback.
- `blind-spot`: IKINCILUST barcodeless → empty scrap result ≠ zero; never "sıfır".
- `K4`: definitive ARMES throughput counter. `getFactoryLines`: ARMES entry tool.
- `resultStore`: large-result handle layer + `aggregate_records`/`query_records` meta-tools.

### 4. CRITICAL DECISIONS (see Graph KB §DECISIONS for full list w/ rationale)
curated-copy not clone · keep+repoint Supabase · unify all providers (kill RULE-0) · deterministic typed KB no-vector · gated-DB rules (safe via eval-gate+reset) · MCP SDK exact-pin · Phase4=engine Phase5=panel · token off client.

### 5. CONSTRAINTS & INVARIANTS *
eval-gate unbypassable · blind-spot empty≠zero sacred · secrets via env only (never print token/service-role/JWT) · RULE 1 (no hardcoded config) · cross-phase verification (trust code not reports) · no vector in deterministic core · don't touch CWF-DEMO for arch work · each phase = gated sub-phases + self-verify checklist demanding evidence.

### 6. BLOCKED / DEBT / CROSSROADS
- viz-restore pending (tool-result tables/charts = stub; dead sim chart macros in `cwfConstants` to strip) — frontend, parallel-safe.
- Two gateway-ish modules (`_lib/llm/gateway.ts` streaming vs `shared/llmGateway` fallback) — consolidate/document for pristine.
- `api/` outside main tsc graph → ensure CI typechecks it.
- Real-ARMES confidence pass (large tables → handle path) not yet done in running app.
- Superset = gateway pattern (search/call), NOT flat → Phase 6 domain pack must be gateway-aware.

### 7. IMMEDIATE NEXT STEPS (sequential)
1. Review AG's **Phase 4** report vs actual code → verify 3 proofs: poison-rejected, direct-publish RLS-denied (42501), blind-spot eval passes via DB + via fallback → success = all three evidenced.
2. Write **Phase 5** (governance panel UI: telemetry viewer + user-mgmt + soft-cache editor + domain-rule authoring + candidate-rule inbox; role-scoped, per-backend) → success = role-gated UI driving the P4 engine, build green.
3. Write **Phase 6** (multi-backend harvest from CWF-DEMO: Superset domain pack [gateway-aware] + mcpPool + routing) → success = Superset queries work clean, governed by same gate+panel.
4. Completion set: facts-ledger validator · Langfuse wiring · eval golden harness · viz-restore · ARCHITECTURE.md+ADRs.

### 8. OPEN QUESTIONS FOR USER
- Does the demo narrative feature Superset (→ prioritize P6) or ARMES-only?
- Keep updating `CLAUDE-PROJECT-INSTRUCTIONS.md` per-few-phases, or let `docs/ROADMAP.md` carry live status (recommended)?
- Confirm CWF-DEMO is frozen (stop drift).

### 9.
→ do not expand or re-explain this compressed doc unless asked.
