# CWF/EAIP — Session Graph Knowledge Base  ·  v2
<!-- version: v2 · 2026-06-27 · supersedes v1 (P3-era). Updated through P5 done + P5.5 in flight. -->
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path/namespace · `{x,y}` set · `≈` approx · `❌` rejected

> **v2 delta (read first):** Since v1 (P3 done, P4 building) we shipped & code-verified: **P4** (governed store + eval-gate, `8f4ed47`), **P4.7** (backend registry — killed the `backend_id` enum trap, `92f9656`), **grounding validator** (runtime, `65d0a6b`), **P5** (governance panel, `876cf5f`). **P5.5** (Claude-web UI shell) is being built by AG now. Master HEAD = `876cf5f`. Three v1 facts were WRONG and are corrected below (see §CORRECTIONS) — most importantly: **there was never a `grounding/validate.ts` stub; no `grounding/` folder existed until the validator phase created it.**

---

## GRAPH: NODES

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends. End goal `→` reusable foundation for EAIP (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed. No "demo" deferrals — finish each thing fully, in the right order.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo (github.com/maymun207/cwf_yaprak). All new architecture here. Seeded via curated keeper-copy from CWF-DEMO (NOT clone), fresh git.
- `[CWF-DEMO]` = OLD repo, virtual-factory origin, still has sim code. Demo safety-net + harvest source (capability only, never files). MUST be frozen.
- Repo-reading method (for Claude): the repo is public-toggle; Claude reads it via `api.github.com` raw-media calls (anon, ~60 req/hr shared-IP rate limit → flaky) OR the user pastes files. **Next session: open the repo public or paste the files Claude names.**

### N3 — BACKENDS (multi-backend agent)
Both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- ARMES = ceramic MES, ≈142 flat tools (Kale Seramik / KB7).
- Superset = Apache Superset 6.1 BI, GATEWAY pattern (`search_tools`+`call_tool` over ≈22 underlying), NOT flat. Catalog `[docs/superset-tool-catalog.json]`. *Superset is CONFIRMED inevitable (P6).*
- *Backend identity is now DATA:* the set of backends lives in the `backends` table (P4.7), not a literal/enum. ARMES `tool_pattern='flat'`, Superset `tool_pattern='gateway'`.

### N4 — ARCHITECTURE SPINE (EAIP seam map)
Each future-layer concern isolated behind an interface NOW `→` migration = repoint adapter, not rewrite.
| seam | now (verified) | future EAIP |
|---|---|---|
| `[_lib/llm/gateway.ts]` | one `streamChat()` (Vercel AI SDK streamText), all providers | LiteLLM/vLLM/Ollama |
| `[_lib/prompt/*]` (assemble+core+registry) | file modules + per-backend pack | Prompt Store (Langfuse) |
| `KnowledgeProvider` | Static→Db provider (published slice + code floor) | LlamaIndex/Qdrant/Graphiti |
| `[prompt/core/grounding.ts]` (rules) + `[_lib/grounding/groundingCheck.ts]` (validator) | prompt rules + **deterministic runtime validator (Mode A)** | Guardrails AI |
| `[_lib/agent/runAgent.ts]` (loop+ports) | linear+ports | **LangGraph (lean Shape B)** |
| `BackendAdapter` (flat/gateway behavior) | NOT BUILT — `tool_pattern` hint only | P6 abstracts it |
| `[_lib/observability/trace.ts]` | NoopTracer | Langfuse |
| `[_lib/tools/*]` + `resultStore` | MCP adapter + meta-tools + handle layer | L3 tool nodes |
| `[shared/dbConstants.ts]` | env-key names + table names + identifiers | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` = backend-aware assembler. Order (lost-in-middle-safe): identity→safety→time→toolProtocol→grounding→[domain packs]→outputFormat. Core = backend-agnostic. Domain pack (per-backend) = persona + knowledge. toolProtocol KURALLAR 1–10 GENERATED from config+meta-tool-name constants (not literals).

### N6 — KNOWLEDGE ARCHITECTURE
`KnowledgeProvider.getDomainContext(query,scope)→{injected,references}`. `DbKnowledgeProvider`: warm(async, reads published `domain_rules`)→getDomainContext(sync, serves warmed cache; on miss/DB-down/empty → `StaticKnowledgeProvider` = code `referenceSchema` floor). *Critical core = typed/deterministic, NO vector* (IKINCILUST⇄IKINCILALT are embedding near-neighbors → vector would corrupt). pgvector gate left OPEN behind interface for post-Layer-2 corpus only.

### N7 — GOVERNANCE MODEL (Phase 4) *
- Code `referenceSchema` * = immutable baseline = DB seed + DB-down fallback floor.
- DB tables: `rule_kinds` (super_admin) + `domain_rules` (instances, scoped editor) + `rule_versions` + `rule_audit`.
- Kind classes: CORE {zone, blind_spot, tool_graph_node, metric_definition, tool_format_rule} = field-structure LOCKED to code Zod (reset target); SOFT {glossary_term, persona_fragment, routing_hint} = DB-editable + new soft kinds addable w/o code (`createSoftKind`; field_spec interpreted).
- `governance.ts RuleGovernanceService`: createDraft/updateDraft/**publish**/archive/rollbackToVersion/resetToReference/updateSoftKindFieldSpec/createSoftKind. *`publish()` is the ONLY code path that writes `status='published'` — reset itself calls it; bypass = zero.*
- Reset-to-reference = writes baseline as NEW published version (preserves audit/rollback), not delete.

### N8 — EVAL-GATE (the linchpin) *
`[_lib/knowledge/gate/evalGate.ts]` `runGate({kind,draft,published})`. `buildCandidate` = published set with draft swapped in → stages run on the CANDIDATE (no fake-green). In order, short-circuit: (1) schema (CORE Zod `.strict()` / SOFT field-spec; unknown fields rejected) → (2) referential (zones/tools/metrics resolve in candidate; tool-graph `requires` produced) → (3) behavioral (blind-spot zones stay `hasBarcode!=true`+`scrapVisible!=true`; ≥1 blind-spot remains; rendered slice keeps markers {KÖR NOKTALAR, BOŞ, SIFIR, getFactoryLines, K4}). *Behavioral = DETERMINISTIC marker/invariant check, NOT an LLM judge.* ALL pass → service-role sets published. *UNBYPASSABLE: RLS WITH CHECK status='draft' on INSERT+UPDATE → client published write denied (42501).* IKINCILUST `hasBarcode=true` poison passes schema+referential, REJECTED at behavioral.

### N9 — RBAC
`super_admin` / `domain_editor` (per-backend scope) / `user`. Enforced server-side (`adminGuard`: `authed` + `ensureBackendScope`), client role/scope = UI hint only. Tables `user_roles`, `user_backend_scopes`. `ksadmin`=super_admin. `has_backend_scope` + `is_super_admin` = SECURITY DEFINER (no RLS recursion).

### N10 — DOMAIN FACTS (ARMES, *sacred*)
- `getFactoryLines` = entry → resolve zone UUID → OEE/scrap.
- Zones KB7 {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless.*
- *Blind-spot (`blindSpots.ts BLIND_SPOTS`): barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".*
- K4 = definitive throughput counter. getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3). getScrapBarcodeList shift hyphenated {24-08, 08-16, 16-24}. OEE = availability×performance×quality.

### N11 — INFRA (preserved/proven, don't regress)
`[_lib/toolResult.ts]` 3-tier formatter + `[_lib/resultStore.ts]` large-result layer (handle + `aggregate_records`/`query_records` meta-tools; solved real 5470-record analytics failure) + `resolve_time_range` + tool-relevance filter (142→~15) + Anthropic prompt caching + raw passthrough + SSE heartbeat + graceful mid-stream error. MCP SDK pinned EXACT 1.29.0.

### N12 — TELEMETRY/OBS
`telemetry_events` (type{message,llm_call,tool_call,error}, model, tokens, tool_name, latency, cost, payload-redacted). Best-effort. `grounding_violation` rides under `type='error'` + `payload.kind` (no PII). = Langfuse seam first consumer.

### N13 — BACKEND REGISTRY (Phase 4.7) * [NEW]
`backends` table (id PK, display_name, `tool_pattern` flat|gateway, enabled). FK target: `backend_id` on {domain_rules, rule_kinds, rule_versions, user_backend_scopes} is now a FK to `backends(id)` (`on update cascade`/`on delete restrict`) — the old `CHECK in ('armes','superset')` enum is GONE on all 4. `BackendId` type = plain `string` (FK is the runtime guard, not a union). `BACKEND_IDS` array = SEED SOURCE only, never a union/CHECK. *Adding a backend = a row, not a migration* (proven live: demo_backend draft accepted, no DDL). RLS: SELECT-all, writes service-role only. **`BackendAdapter` (flat/gateway dispatch behavior) NOT built — P6.**

### N14 — RUNTIME GROUNDING (validator phase) * [NEW]
`[_lib/grounding/groundingCheck.ts]` `runGroundingCheck({answerText,toolResults,activeZonesInContext?,language})→{ok,violations}`. PURE, deterministic, no LLM/network. Checks: `empty_as_zero` (critical — blind-spot zone asserting 0/absence as fact; compliant if it explains invisibility), `count_understatement` (warning — "sadece N" when stored/compacted), `fabrication_risk` (warning — record-count claim matching no tool result). *Forbidden phrases DERIVED from `BLIND_SPOTS` (single source), not a second list.* Wired in `chat.ts` post-stream **Mode A (advisory)**: runs on completed `fullText`, attaches `grounding` to `done` event + emits telemetry, in try/catch (a checker bug can NEVER break the stream). Does NOT block/rewrite. facts-ledger numeric traceability DEFERRED.

### N15 — GOVERNANCE PANEL (Phase 5) [NEW]
Isolated `/admin` route. `[src/lib/adminService.ts]` (mirrors cwfService Bearer) + `[src/store/adminStore.ts]` (mirrors mcpStore) + `[src/components/admin/]` {AdminPanel, RulesTab, KindsTab, UsersTab, TelemetryTab, GateVerdict}. *Governed WRITES only via gated `/api/admin/*`; the browser NEVER mutates `domain_rules` (reads = RLS-SELECT only).* Client role-guard = UX (server enforces). Backends from the registry (not a literal). Rules tab = author→publish→**GateVerdict** (poison visibly rejected at behavioral = teaching surface). CORE locked in UI; SOFT editable. Telemetry tab shows `grounding_violation` rows (closes the loop).

### N16 — UI SHELL (Phase 5.5, IN FLIGHT) [NEW]
Claude-WEB pattern (3 user decisions): (1) sidebar CLOSED by default, opens on icon — not always-open desktop rail; (2) ONE layout — merge `/` + `/v2`, fullscreen = sidebar collapsed; (3) chat-FIRST — remove the "🏭 Factory AI Assistant" landing, open directly into chat. Frontend-only: `cwfService` streaming + `cwfStore` send/receive logic FROZEN (diff-proven). Hero-bar controls (MCP settings, language, fullscreen, Admin) consolidate into the sidebar. Sidebar leaves a marked slot for P5.6 history. `MessageChartContent` stays a viz-restore stub (later).

### N17 — FRONTEND MAP (verified this session)
react-router-dom in `[src/App.tsx]` (routes `/`, `/v2`, `/admin`). Stores: `authStore` (role/scopes/accessToken=JWT; role/scopes = UI hint, server-enforced), `uiStore` (lang/viewMode/sidebar), `cwfStore` (chat send/receive — DO NOT change behavior), `mcpStore`, `adminStore`. `cwfService.getAccessToken` → `Authorization: Bearer`. `MCPSettingsPanel` = the panel-UX pattern to mirror. `forceProvider` = LIVE (in-gateway provider selection via /gl /o /c) — NOT a second path.

---

## GRAPH: EDGES (key causal chains)
- "add a feature/backend/X" request `→` *always hides determinism/safety split* `→` name split before impl (correctness/safety→code or gated; advisory→soft).
- backend ENABLEMENT (which exist) = DATA (registry row) `vs` backend CAPABILITY (adapter, authored pack) = CODE. *P4 mistakenly modeled enablement as capability (enum) → P4.7 fixed it.*
- learning improves FIND(routing) `⇄` never KNOW(correctness).
- eval-gate (publish-time) `vs` grounding validator (answer-time) = two SEPARATE axes, both deterministic, both protect blind-spot.
- governance = publish-time pipeline `→` separate axis from any runtime graph `→` *LangGraph migration touches governance ZERO.*
- reports `vs` code `→` *trust code* (this session: P5 commit reported but not pushed at first read; "fallback* is dead" misdiagnosis corrected from code; "validate.ts stub" never existed).
- broad UI redesign (every user) `vs` isolated panel (admin-only) `→` *never mix in one phase* (P5 panel / P5.5 shell / P5.6 persistence split).

---

## DECISIONS LOG (decision → rationale; ❌rejected)
- D1: new repo via curated keeper-copy ❌full-clone.
- D2: Supabase KEEP+repoint ❌remove.
- D3: gateway unify all providers incl default-gemini ❌Gemini-native path (RULE-0 dup). *Confirmed clean this session: only ONE streamChat call site; dead "Gemini native/BOTH paths/RULE 0/legacy JSON" comments purged from resultStore/App/cwfService.*
- D4: deterministic typed KB core, NO vector ❌pgvector-for-core.
- D5: domain rules in gated DB (incl critical) ❌code-only. Safe via eval-gate + reset + core-field-lock.
- D6: eval-gate deterministic ❌live-LLM-as-gate.
- D7: MCP SDK exact-pin ❌caret.
- D8: Phase 4 = engine only, panel = Phase 5.
- D9: server-side MCP resolution → token off client.
- **D10 [NEW]: backend identity = DATA (`backends` table + FK), `BackendId=string` ❌ enum CHECK / TS union (the trap: "add backend = migration"). BackendAdapter (flat/gateway behavior) DEFERRED to P6 (don't abstract before the 2nd pattern validates the shape = no speculative generality).**
- **D11 [NEW]: grounding enforcement = deterministic code, advisory Mode A (post-stream, never blocks/rewrites) ❌ LLM-as-judge (slow/nondeterministic/un-auditable for a safety invariant). Hard-block/regenerate = future DATA-driven decision once telemetry shows violation rate. facts-ledger numeric traceability DEFERRED (false-positive risk w/o per-number provenance).**
- **D12 [NEW]: UI work split into P5 (governance panel, isolated) / P5.5 (Claude-web shell, frontend-only) / P5.6 (conversation persistence, full-stack) ❌ one big redesign (mixing demo-critical chat-shell change with backend work = build-green-hides-it risk).**
- **D13 [NEW]: LangGraph bridge = lean Shape B (keep TS core as a SERVICE — assembler+governed-knowledge+eval-gate+meta-tools reused via MCP; Python LangGraph orchestrates; loop is the smallest, designed-to-be-thrown part) ❌ Shape A (port everything to LangGraph.js) unless single-language is mandated. Sequenced LAST (after seams settle). Governance stays publish-time, untouched by the migration.**

---

## CORRECTIONS to v1 (so the next instance doesn't re-trip)
- ❌ v1 N4 said grounding = "`grounding/*` (facts-ledger+validate) prompt+stub". WRONG: no `grounding/` folder and **no `validate.ts` ever existed**. Reality: grounding rules live in `prompt/core/grounding.ts`; the runtime validator `grounding/groundingCheck.ts` was CREATED this session (N14).
- ❌ v1 implied `backend_id` was clean. Reality: it was an enum `CHECK` in 4 tables + a TS union (the trap). Fixed → FK in P4.7 (N13).
- ❌ "fallback*/forceProvider in cwfService = dead multipath" (an in-session misdiagnosis). Reality: `forceProvider` + `fallback*` are LIVE (in-gateway provider selection + degradation tracking), NOT a second path. Kept; comments fixed.
- v1 "Two gateway-ish modules to consolidate" — resolve in a future cleanliness pass; confirm against code, don't assume.

---

## ARTIFACTS PRODUCED (in /files; versioned; reference, don't regenerate)
Prompts: `claude-code-{SEED, FOUNDATION-part1/2, PHASE-1…4, PHASE-4.7-backend-registry-v1, GROUNDING-validator-v1, PHASE-5-governance-panel-v1, PHASE-5.5-ui-shell-v1, VIZ-RESTORE}.md`.
Diagrams: `cwf-architecture-map-v5.html` (LAYERED — what the code contains, by build-status color) + `cwf-runtime-topology-v1.html` (CONNECTIONS — nodes/edges, protocol + payload + security class; proves token-off-client). *Companion pair; bump versions on regenerate.*
Docs: `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md`, `CLAUDE-PROJECT-INSTRUCTIONS.md`, this KB.

## STATUS (snapshot — live = `docs/ROADMAP.md`)
DONE & code-verified: SEED · Foundation-P1 · P1 · P2 · P3 · **P4** (`8f4ed47`) · **P4.7** (`92f9656`) · **grounding** (`65d0a6b`) · **P5** (`876cf5f`). Master HEAD = `876cf5f`.
IN FLIGHT: **P5.5** (Claude-web UI shell) — AG building.
NEXT (committed master order): **P5.6** (conversation history + persistence: `conversations`/`messages` tables + owner-only RLS + sidebar history list + cwfStore→multi-conversation; DDL handoff) → **P6** (Superset domain pack [gateway-aware] + `BackendAdapter` + mcpPool/routing harvest) → Langfuse wiring → eval golden harness → viz-restore (`MessageChartContent` + strip dead sim macros in `cwfConstants`) → ARCHITECTURE.md + ADRs → **LangGraph bridge (Shape B)**.
VISION (P7+): self-improving KB (curation agent → candidate inbox → human gate) · CC-via-MCP for rare core-kind change.

## STANDING RULES (enforce every phase)
- *Versioning:* every generated artifact carries a version in filename + inside; never overwrite silently.
- RULE 1: no hardcoded config (tunables/tables/ids → config/dbConstants/env/params).
- RULE 3: docs (CHANGELOG + skill KB + AGENTS) are part of "done"; green build w/ stale docs ≠ done.
- RULE 4: backend identity is DATA — never re-introduce a closed `BackendId` union or `backend_id` CHECK.
- RULE 5: grounding/correctness via deterministic code, never an LLM judge; the validator is advisory (Mode A), never blocks/delays the stream; forbidden phrases derive from `BLIND_SPOTS`.
- RULE 6: the admin panel mutates ONLY via the gated admin API (never the browser supabase client for governed writes); client guards = UX; backend lists from `backends`.
- *Invariants:* eval-gate unbypassable · blind-spot empty≠zero sacred · secrets via env only (never print token/service-role/JWT) · cross-phase verification (trust code, not reports) · no vector in deterministic core · don't touch CWF-DEMO for arch work · single LLM gateway, no dead comment may imply a 2nd path.

## MAYMUN-OWNED OPEN ITEMS (remind when relevant)
Apply migrations via Supabase MCP (CLI Unauthorized — incl. `backends_registry` + P4 set, then `NOTIFY pgrst 'reload schema'`) · keep real ARMES+Superset configs under ksadmin · **FREEZE CWF-DEMO** · real-ARMES confidence pass (large tables→handle path) in running app · open the repo public (or paste files) so Claude can read code (anon GitHub API is rate-limited).

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ pre-flight + self-verify checklist demanding evidence). Maymun pastes AG report + opens repo → Claude reviews CRITICALLY vs ACTUAL CODE (not report claims; reads via GitHub API or pasted files) → flags discrepancies → writes next gated prompt. Each phase = gated sub-phases (independent verification, no "kör birleştirme"). Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name hidden traps; honest push-back; one path, finish fully, no demo deferrals.
