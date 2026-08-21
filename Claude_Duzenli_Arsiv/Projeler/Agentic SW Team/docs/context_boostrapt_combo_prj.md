# Context Bootstrap — ARDICTECH Combined-Platform Deliverables (EAIP + Revolutionize)

> Shorthand: `→` leads to | `⇒` results in | `↔` bidirectional | `vs` comparison | `w/` with | `w/o` without | `>>` much greater | `≈` approx | `[A]:[B]` namespace/path | `{x,y}` set | `*` critical/blocker

---

### 0. NEXT-SESSION LOADER PRIMER
You are a senior full-stack architect + AI-agent expert resuming ARDICTECH's combined-platform deliverables program. Treat this doc as authoritative state, do not re-explain, resume from §7. Two domains (EAIP = product platform; Revolutionize = the autonomous org that builds it); 9 bilingual dark-theme HTML deliverables already shipped to `[out]` and validated.

---

### 1. CORE SEED & STATE
- **Objective:** Produce + maintain the aligned deliverable set (architecture · connectivity · schedule · master web page · leadership charter) for ARDICTECH's two platforms, bilingual EN/TR, dark-theme standalone HTML, internal-technical audience.
- **Current State:** ALL 5 tasks DONE → 9 files shipped + validated (`node --check` + DOM-stub dual-lang render smoke test). v6 master page = combined live-tab superset of all 7 standalone views. Charter grounded in the June→Dec 2026 CWF+Revolutionize-v0.5 program. Nothing pending except optional export/bundle.
- **Operational Env:** Deliverables = self-contained HTML (dark GitHub-style theme). Built in `/home/claude`, copied to `[out]`. *Inline Visualizer MCP DOWN (timeout ≈4min)* → ALL visuals delivered as standalone HTML, never inline. Owner locale Istanbul/Ankara TR. Validation = `python3` extract `<script>` → `node --check` → `node` DOM-stub render both langs.
- **Identifiers:**
  - Owner: **Maymun, ARDICTECH A.Ş., Istanbul**
  - **CTO = Program Leader = Tech Lead = ONE person**
  - Output root `[out]`: `/mnt/user-data/outputs/`
  - `[out]:ARDICTECH_Platform_v6_SSoT_bilingual.html` (master page)
  - `[out]:architecture/` → `01_revolutionize_architecture.html`, `02_eaip_architecture.html`, `03_bridge_revolutionize_builds_eaip.html`, `04_eaip_connectivity.html`, `05_revolutionize_connectivity.html`, `06_eaip_schedule.html`, `07_revolutionize_schedule.html`, `08_leadership_charter_bilingual.html`
  - Source (read-only) `/mnt/project/`: `{context_bootstrap.md, dev_schedule_patch_v1.md, ADR-001-litellm-llm-gateway.md, ADR-002-mcp-external-tool-protocol.md, ARDICTECH_Platform_v5_SSoT.html (1471 lines), Architecture_Review.pdf, Bootstrapping_a_revolutionary_platform.pdf, virtual_software_team_architecture_diagrams.pdf, development_schedule_antigravity.pdf}`
  - Suggested repo: `git@github.com:maymun207/revolutionize.git`
  - Customer: **Kale Seramik** (first CWF tenant) | **Türk Re** (insurance triage)
  - Env var: `ANTHROPIC_API_KEY` (shell-loaded, never committed)

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**EAIP (product):** 10 layers `L0..L9` · 67 components · 100 connections · phases `A–G` · **≈12,060 eng-hrs** · `M1–M13`.
```
L0 Channels → L1 API/Identity → L2 Reasoning/Orchestration → L3 AI/LLM → L4 Knowledge/Memory
→ L5 Cleansing/Governance → L6 Storage → L7 Ingestion → L8 External → L9 Infra/Ops
Hot path: Channel → gateway → Kong+OPA → FastAPI+Keycloak → LangGraph → LiteLLM → vLLM
LangGraph fan-out: LlamaIndex→Qdrant(gRPC) | PostgresSaver(PSQL) | ARMES MCP→MariaDB | Langfuse(SDK)
```
Stack: LangGraph, Kong(DB-less), Keycloak, OPA, FastAPI, **LiteLLM(L3 gateway)**, vLLM(Llama-3-8B), Ollama, PostgreSQL16+pgvector(`wal_level=logical`), Redis, Qdrant, MinIO, ClickHouse, MariaDB, TimescaleDB, Iceberg, Redpanda, Debezium(CDC), Airflow, NiFi(SMB), Airbyte, dbt, Soda, OpenMetadata, Langfuse, MLflow, Guardrails, LlamaIndex, LightRAG, Graphiti+FalkorDB, Temporal, Whisper STT, n8n, Entra federation. External via **MCP**: ARMES(✓pre-built), SAP, SharePoint, Salesforce.
Phases: core 2900h(M1-3) · wa 740h(M2-3) · gu 640h(M2-3) · cwf1 1500h(M3-5,*Kale contractual*) · ins 1160h(M4-5) · cwf2 1500h(M6-8) · fin/Astra 3620h(M8-13). 42 tasks total (incl A4.5).

**Revolutionize (builder):** 5 systems · 3 channels · 8 phases · 12–15mo.
```
Vision Engine →[intent_stream]→ Execution Swarm →[verification_gate]→ Verification Mesh
Production ← Reality Loop ←[reality_feed]←┘ ; Meta-cognition observes all (Phase 8, last)
Cross-cutting: Measurement Foundation | Living Knowledge | Tool Integration
```
Telemetry (6L, *agent never waits*): OTel SDK(in-proc) → ring buffer(mmap 10MB lock-free MPSC) → sidecar batcher(zstd-3, 1000ev/5s) → Redpanda → ClickHouse(hot 30d)/Tempo + MinIO(cold 365d) → Grafana/Metabase.
LLM routing (LiteLLM ADR-001): **Opus 4.7** highest-stakes {founder, architect, EM, code-reviewer, security, spec-author, intent-synth, red-team, arch-proposer} | **Sonnet 4.6** DEFAULT {exec cells, test-gen, perf, reality-observer, empathy} | **Haiku 4.5** high-vol {reporter, support-synth, PO} | **Gemini 3.1 Pro** fallback/long-ctx.
6 MCP servers (Stage Group 1.7, ADR-002): 1.7.4 filesystem(*calibration, ships FIRST*), 1.7.5 web-search, 1.7.6 docs-fetch, 1.7.2 git, 1.7.3 github, 1.7.1 sandbox(Docker via Provider Interface).
Phase-1 backlog (patched): groups {1.1 telemetry×10, 1.2 streaming×7, 1.3 observability×7, 1.4 gateway×2, 1.7 MCP×6, 1.5 v1-agents×10, 1.6 first-product TBD}; ≈42 stages, 6–8 wks; 1.4∥1.7 after 1.3.

**The bridge:** Revolutionize ships verified PRs → EAIP components; EAIP production telemetry → reality_feed → Vision. Shared sovereign substrate: Keycloak·Vault·MariaDB Galera·ClickHouse·Redpanda·MinIO·Kubernetes (Netaş/OSB).

**v6 master page mechanics:** one file, 7 tabs {Big Picture | EAIP arch/conn/plan | Revolutionize arch/conn/plan}, `setLang('en'|'tr')` re-renders ALL from JS data dicts (`T`, `LAYERS`, `COMPS`, `ECONN×100`, `EPLAN`, `RSYS`, `RCONN×40`, `RGRP_P1`, `RPH`, `ROPENS`), `switchTab()` for tabs, filterable connection tables.

---

### 3. DOMAIN DICTIONARY & PROJECT GLOSSARY
- `EAIP`: ARDICTECH Unified Intelligence Platform — the multi-tenant product (Web Asistan, Galip Usta, CWF, Insurance, Astra).
- `Revolutionize`: virtual SW engineering org; autonomous multi-agent builder; v1 (human-team simulation) → v2 (cellular intelligence).
- `CWF`: Chat With Factory — manufacturing-intelligence product; first tenant Kale Seramik; M3–M5 contractual.
- `Conductor`: senior engineer's role — directs Antigravity/execution surface, does NOT type code.
- `Three folds`: learn agentic dev + build Revolutionize v0.5 + deliver CWF — same loop practiced twice (customer + internal).
- `Calendar-bound vs impl-bound`: calendar (validation/telemetry-maturity/canary/learning) = 0% compressible; implementation = AI compresses 50–80%.
- `Channels`: only 3 sanctioned inter-system paths {intent_stream, verification_gate, reality_feed} over Redpanda (guard vs multi-agent chat sprawl).
- `Verification Mesh`: {spec-author(TLA+/Alloy), verifier, code-reviewer(6-dim), test-gen, security, red-team, perf, taste-eval}.
- `Living Knowledge`: skills(md) + ADRs + GraphRAG codebase graph + MEMORY.md + SOUL.md + pattern lib + prompt versions.
- `Stage`: unit of work = 1 stage = 1 prompt = 1 PR; size {XS,S,M,L} only (XL must decompose).
- `Astra`: enterprise EAIP phase (UC1 factory-intel, UC2 predictive-maint, UC3 financial/board, UC4 multi-channel).

---

### 4. CRITICAL DECISIONS & RATIONALES
- **Fork A** → keep EAIP + Revolutionize as TWO diagram sets + ONE bridge view (rejected: single merged diagram, too tangled).
- **Combined v6 master page, one self-contained file w/ live tabs** → single hub to align everyone (rejected: hub-that-links-out, less cohesive).
- **Full bilingual EN/TR, all human-readable prose both langs** → bilingual TR-native team; *technical identifiers (comp names, proto strings, call sigs, tool names, stage IDs, hours) stay as-is = code not prose*.
- **Standalone HTML for everything** → Visualizer MCP down; HTML packaging was the agreed end-step anyway.
- **Patches (ADR-001 LiteLLM, ADR-002 MCP, dev_schedule_patch_v1) apply ONLY to Revolutionize Phase 1** → EAIP already runs LiteLLM(L3)+MCP(ARMES✓/SAP/SharePoint/Salesforce), so EAIP regenerated clean w/ no patch deltas.
- **5 Revolutionize prereqs left OPEN, not invented** → user never resolved them; marked OPEN in schedules+charter.
- **EAIP content verbatim from v5 SSoT** (100 conns, proto strings, 42 tasks, hours) vs **Revolutionize connectivity CONSTRUCTED from ADRs/bootstrap** + **P2–8 month ranges = PROJECTION** → faithfulness flagged to user.
- **Build technique: incremental `cat >> file << 'EOF'` heredoc chunks + node validation** → manage large single files; *quoted `'EOF'` preserves `$`/backticks*.
- **CTO=Program Leader=one person → ONE combined charter w/ two role-hats** (rejected: two docs, it's one human).

---

### 5. CONSTRAINTS & INVARIANTS
- **Bilingual convention** (MUST): prose EN+TR; identifiers unchanged across langs.
- **Faithfulness** (MUST): never invent; EAIP=verbatim; Revolutionize=constructed/projected + flagged; OPEN prereqs stay OPEN.
- **Theme tokens** (MUST): dark `--bg:#0D1117 --bg2:#161B22 --border:#30363D --text:#E6EDF3`; accents core#58A6FF wa#3FB950 gu#E3B341 cwf1/purple#BC8CFF ins/red#F85149 cwf2#A371F7 fin#79C0FF; mono+sans stacks.
- **File-build discipline** (MUST): build in `/home/claude` or `[out]`; validate `node --check` + DOM-stub dual-lang render BEFORE `present_files`; *DON'T chain `&& echo …` after a huge heredoc — caused one truncation (Bad file descriptor); append big heredocs alone*. Watch object-close braces (one v6 `};` brace-miss bug fixed).
- **Revolutionize program invariants** (from project bootstrap, MUST hold): CWF delivery absolute priority (if anything gives, v0.5 gives — never reverse); every PR ≥30min human review (no rubber-stamp); Antigravity Artifacts ≠ proof (Verifier confirms independently); stage size XS/S/M/L only; eval ≥5 happy +3 edge +2 adversarial; prompts versioned in git + single author + SHA recorded; secrets = Vault refs only, never raw, PII redacted at emission; capability allowlist (NOT denylist) at MCP boot via Keycloak JWT; no agent prod-write by default (shadow read-only); calendar-bound activities 0% compressible; pre-reading enforced (Anthropic *Building Effective Agents*); Pattern Library sacred (archive success, post-mortem failure); Monday+Friday rituals don't skip.

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT
- *Visualizer MCP down* (timeout) → all visuals standalone HTML.
- *One bash append truncated mid-write* (fd error) on charter chunk 2 → rolled back to clean point + re-appended solo; validated OK. Lesson recorded in §5.
- *D4 ARU/KARU integration* = top EAIP schedule risk: REST API ≈80h vs Playwright UI-scrape ≈320h (fragile); Week-1 discovery spike gates the estimate.
- *Revolutionize P2–8 month ranges = projection only* (sequence + bound-type + deps are load-bearing; pixel dates are not).
- *Task count = 42* (incl A4.5); earlier prose loosely said "41" — hours total 12,060 unchanged either way.
- *Phase-1 Stage 1.6 (first product) = TBD* → gated by OPEN prereq #1.
- Deferred architectural crossroads (per source bootstraps): Pattern-Library store (Qdrant vs pgvector vs md, M2); Verifier impl (M4); AG2.0 SDK adapter (v0.7); framework (LangGraph vs Agent SDK vs raw, M4); multi-tenancy rollout (on 2nd customer); formal-methods scope TLA+/Alloy vs property-based (Phase 5); Zep memory (Phase 4).

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)
1. (optional, user-triggered) Export any deliverable to `.docx`/`.md` for redline → success: editable doc in `[out]`.
2. (optional) Bundle the 9 files into one archive → success: single downloadable artifact.
3. Resolve the 5 OPEN Revolutionize prereqs (§8) → success: written answers, then update schedules/charter.
4. Run the EAIP D4 ARU/KARU Week-1 discovery spike → success: integration method known, D-phase estimate locked.
5. Await next user deliverable request → produce per existing conventions (dark theme, bilingual, faithfulness flags, validate-before-present).

---

### 8. OPEN QUESTIONS FOR USER
- 5 Revolutionize Phase-1 prereqs: ① first product (gates 1.6; bridge implies CWF/EAIP component) ② founder for SOUL.md (Vision Engine taste anchor) ③ quarterly LLM budget (routing thresholds + gateway rate caps) ④ EAIP↔Revolutionize relationship (extensions vs independent) ⑤ biggest expertise gaps (TLA+/Alloy, orchestration, multi-tenant security).
- Export format preference (docx vs md) + bundle the 9 files? 
- Any program-context changes since: team still 6 seniors + CTO? GitHub repo stood up? pre-reading sent/acked? Kale contract/payment status affecting Dec-2026 cutover?

---

### 9.
Do not expand or re-explain the compressed doc unless asked.
