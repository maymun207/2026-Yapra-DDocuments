# CWF/EAIP — Context Bootstrap + New-Session Prompt  ·  v3
<!-- version: v3 · 2026-06-27 · resume point = P6.8 done + re-seeded (guard LIVE), ADR-001 proposed, acceptance test pending. Supersedes v2 (P5-done/P5.5-flight). -->

### 0. NEXT-SESSION LOADER PRIMER  (paste this verbatim into the new session)
> You are my architect for the CWF→EAIP rebuild. Read `CWF-SESSION-GRAPH-KB-v3.md` + `ADR-001-backend-trust-and-provenance-v1.md` + `CLAUDE-PROJECT-INSTRUCTIONS.md` + the `claude-code-*.md` prompt files in this project, and treat the repo code in `cwf_yaprak` (github.com/maymun207/cwf_yaprak, public) as ground truth over any summary — you `git clone` it yourself and verify reports against the actual code, never trusting a report's claims. We work in a loop: I run Claude Code 4.8 on AntiGravity to implement; you diagnose, decide with committed recommendations, and write detailed gated phase prompts (versioned, hard pre-flight gate + self-verify checklist demanding evidence), then critically review the AG report I paste by cloning the repo and diffing against the last verified commit. **Resume point: SEED→P6.8 are DONE and code-verified; master HEAD `6009b2d`; the P6.8 cross-backend scope/authority guard is re-seeded and LIVE in the governed store. ADR-001 (Backend Trust & Provenance) is PROPOSED. PENDING (mine): deploy `6009b2d` then run the 3-provider acceptance test ("KB7 OEE this week", ARMES off, Gemini Flash / GPT-4.1 / Sonnet 4.6 — expect NO Granit-as-KB7). NEXT (yours): ADR-001 review → Phase-A (Trust Registry + injection-boundary + acid-test scaffold).** Standing rules: every artifact you generate is versioned in filename + inside; backend identity is data not an enum; grounding AND trust are enforced by deterministic code, never an LLM judge/score; the admin panel writes only via the gated API; Superset is a gateway (never transcribe its catalog); scope is the underlying datasource not the title; single LLM gateway, no dead comment may imply a second path. TR for strategy, EN for technical/prompts; diagnosis-first, committed recs not menus, tight prose, name the hidden trap, push back honestly, one path — finish fully, no "demo" deferrals.

### 1. CORE SEED & STATE
- **Objective:** rebuild CWF (agentic AI over live MCP backends) into a clean, SOTA, ~100%-reusable EAIP-aligned codebase. Quality > speed; finish each thing fully.
- **Current state:** in `cwf_yaprak`, DONE & code-verified through **P6.8** (`c96f5b7`; master HEAD `6009b2d` adds the reseed note). Multi-backend: **ARMES** flat ≈140 (`system_of_record`, authoritative) + **Superset** gateway ≈22 (`reporting_mirror`, advisory, live-activated/DB-sourced). The P6.8 scope/authority guard is re-seeded → LIVE in the governed store. **ADR-001 (Backend Trust & Provenance) = PROPOSED** — the multi-backend trust primitive.
- **Operational env:** Claude Code 4.8 on AntiGravity (implements) ⇄ Claude/architect (gated prompts + code review by cloning the repo). Stack: React 19 + Vite + react-router + Vercel serverless + Supabase. MCP SDK pinned exact 1.29.0.
- **Identifiers:** `cwf_yaprak` (canonical, public) · `CWF-DEMO` (old/safety-net/harvest, FREEZE) · backends under `ksadmin@ardictech.com` in `mcp_settings` · catalog `docs/superset-tool-catalog.json` · live roadmap `docs/ROADMAP.md`.

### 2. TECH STACK & RUNTIME FLOW
`browser (auth session, JWT only — no token/config) → POST /api/cwf/chat (verify Bearer, derive userId+role+scopes) → resolve mcp_settings server-side → resolveActiveBackends (enabled ∩ backend_id ∩ RBAC) → scopeToolsToBackends → warm DbKnowledgeProvider (published domain_rules, code floor) → buildSystemPrompt(ctx, activeBackends) [core + domain packs] → ONE streamChat gateway (Vercel AI SDK, all providers) → MCP tools (ARMES flat / Superset search→call, token server-side, transient-retry+SSE-first transport) → resultStore/formatToolResult → post-stream grounding check (Mode A) → best-effort message persist → SSE done`. Browser↔Supabase NARROW: Auth + RLS-SELECT only; governed writes detour through `/api/admin/*`. Vercel↔Supabase = service-role (RLS-exempt).

### 3. DOMAIN DICTIONARY
- `domain pack`: per-backend {persona + typed knowledge} composed by the assembler. ARMES = flat-tool pack; Superset = GATEWAY pack (protocol + semantics + blind-spots; never the catalog).
- `eval-gate`: publish pipeline schema→referential→behavioral on the candidate; only `publish()` (service-role) sets `published`; RLS blocks client publish (42501); deterministic, backend-aware additive dispatch.
- `CORE vs SOFT kind`: CORE field-structure code-locked (reset target); SOFT DB-editable + extensible. All instances editable but gated.
- `source of truth`: runtime = governed DB; code referenceSchema = seed + reset target + outage floor (DB-first/code-floor — never invert).
- `blind-spot / empty≠zero`: IKINCILUST barcodeless → empty scrap ≠ zero; never "sıfır".
- `scope≠title`: a resource's scope = its bound underlying datasource, NEVER its title (a "KB7"-titled / Granit-bound dashboard is Granit data).
- `trust tier / authority`: backends declared (DATA) as system_of_record / reporting_mirror / etc.; OEE/fire/throughput are ARMES-authoritative; Superset is authoritative for nothing (ADR-001).
- `K4`/`getFactoryLines`: ARMES throughput counter / entry tool. `resultStore`: large-result handle + meta-tools. `scopeToolsToBackends`/`mcpTransport`: active-backend tool filter / transient-retry+SSE-first.

### 4. CRITICAL DECISIONS (full list + rationale in Graph KB §DECISIONS D1–D18)
curated-copy not clone · keep+repoint Supabase · one gateway · deterministic typed KB no-vector · gated-DB rules · MCP SDK exact-pin · engine-then-panel · token off client · backend identity = data (D10) · grounding deterministic+advisory (D11) · UI split (D12) · LangGraph Shape-B last (D13) · **client-mint conversation ids + assertOwned (D14)** · **DB-first/code-floor source of truth (D15)** · **eval-gate additive per-backend dispatch (D16)** · **cross-backend scope/authority guard, not "make the query succeed" (D17)** · **ADR-001: trust = deterministic function, unknown=floor, contain-don't-detect (D18)**.

### 5. CONSTRAINTS & STANDING RULES *
eval-gate unbypassable · blind-spot empty≠zero sacred · scope≠title / wrong-scope≠answer · secrets via env only (never print token/service-role/JWT) · cross-phase verification (trust code — clone & diff, not reports) · no vector in deterministic core · don't touch CWF-DEMO for arch work · single gateway / no dead 2nd-path comment · ARMES byte-identical when Superset inactive · **versioning** (every artifact versioned in filename+inside) · **RULE 1** no hardcoded config · **RULE 3** docs part of done · **RULE 4** backend identity is data · **RULE 5** grounding/trust deterministic, never LLM-judge/score · **RULE 6** admin writes only via gated API · **RULE 9** Superset gateway, never transcribe catalog · **RULE 10** toolset scoped to activeBackends + scope-from-datasource + metric-authority(ARMES) · each phase = gated sub-phases + self-verify checklist demanding evidence.

### 6. BLOCKED / DEBT / CROSSROADS
- **P6.8 not yet ratified** — needs the deployed 3-provider acceptance test (the guard is live in DB, but transport+scoping are CODE → deploy `6009b2d` FIRST so a transient SSE 405 isn't misread as a guard failure).
- **Data reality (locked):** KB7 OEE absent from Superset; "KB7" dashboards are Granit shells. Open Q: is KB7 a filterable column-value in any Granit OEE dataset, or wholly absent (evidence ⇒ absent)? — sets the acceptance expectation (clean "needs ARMES" vs filtered+attributed).
- Fix B (`execute_sql` SELECT-is-read) is the loaded gun — ONLY after the guard passes acceptance. Fix D (final-message fallback) independent/anytime.
- P7 deterministic runtime cross-backend scope validator (the N14/groundingCheck sibling) — the third trust layer; no fragile regex.
- Diagrams `cwf-architecture-map-v5.html` / `cwf-runtime-topology-v1.html` stale (predate P5.6/P6.x) — bump when next touched.
- viz-restore pending (`MessageChartContent` stub; dead sim chart macros in `cwfConstants`). Real-ARMES confidence pass (large tables → handle path) not done in running app.

### 7. IMMEDIATE NEXT STEPS (sequential)
1. **(Owner)** Deploy `6009b2d`, then run the 3-provider acceptance test (ARMES off, "KB7 OEE this week" on Gemini Flash / GPT-4.1 / Sonnet 4.6). Paste the `telemetry_events` traces. Expected on ALL three: KB7 OEE stated as not visible in the active backend / needs ARMES, at most clearly-labeled Granit-scope BI — never Granit-as-KB7.
2. **(Architect)** On traces: ratify P6.8 (record in CHANGELOG) OR, if any provider still presents Granit-as-KB7, escalate the deterministic runtime scope validator from P7 to next (prompt layer proved insufficient).
3. **(Architect)** Finalize/approve **ADR-001**; place in `docs/adr/`.
4. **(Architect)** Write **Phase-A** of ADR-001: Trust Registry (`trust_tier`/authority/scope-contract as gated DATA; unknown→floor) + injection boundary (tool-output = data, never executed) + acid-test scaffold. Then B (provenance) → C (deterministic validators + trust annotation) → D (containment/quarantine + the lying-MCP acid test).
5. Then queued: Fix B (post-acceptance) · Fix D · Langfuse wiring · eval golden harness · viz-restore · ARCHITECTURE.md + ADRs · LangGraph bridge (Shape B).

### 8. OPEN QUESTIONS FOR USER
- Does Superset currently expose only Granit datasets (team check)? Is KB7 a real filterable value in any OEE dataset, or absent? — sets the acceptance branch + whether real KB7-via-Superset is a future data/infra task.
- ADR-001: any decision to change before locking (trust tiers, authority map, the contain-don't-detect stance)?
- LangGraph language boundary: EAIP L3 Python (→ Shape B, TS core as MCP service) vs single-language mandate (→ Shape A)? Not urgent.
- Confirm CWF-DEMO is frozen.

### 9.
→ do not expand or re-explain this compressed doc unless asked. On resume: read this + KB v3 + ADR-001, `git clone` and confirm master HEAD = `6009b2d`, then proceed from step 7 (owner runs the acceptance test; architect reviews traces → ADR-001 → Phase-A).
