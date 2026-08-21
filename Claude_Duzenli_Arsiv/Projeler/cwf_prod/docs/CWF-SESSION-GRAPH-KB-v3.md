# CWF/EAIP — Session Graph Knowledge Base  ·  v3
<!-- version: v3 · 2026-06-27 · supersedes v2 (P5-done/P5.5-flight). Updated through P6.8 done+re-seeded + ADR-001 proposed. -->
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path · `{x,y}` set · `≈` approx · `❌` rejected

> **v3 delta (read first):** Since v2 (P5 done, P5.5 in flight) we shipped & code-verified: **P5.5** UI shell, **P5.6** conversation persistence (`4d69647`/`7027389`), **P6** Superset domain pack + dual-backend assembly (`2f6cf0a`), **P6.5** Superset live-activation (`89fce64`, DB-sourced + 10/10 live gates), **P6.6+P6.7** active-backend tool-scoping + Superset read-path/transport fix (`8bd6166`), **P6.8** cross-backend scope & data-authority guard (`c96f5b7`, re-seeded → guard LIVE in governed store). Master HEAD = **`6009b2d`** (P6.8 + reseed note). **ADR-001 (Backend Trust & Provenance) = PROPOSED** — the multi-backend trust primitive (N23). **Repo-read method CHANGED:** Claude now `git clone`s the public repo directly (not the rate-limited anon API) — code is ground truth, verified every phase. **NEW locked fact:** KB7 OEE does NOT exist in Superset; "KB7" dashboards are Granit shells (N22).

---

## GRAPH: NODES

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends → reusable foundation for **EAIP** (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed. No "demo" deferrals — finish each thing fully, in the right order.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo (github.com/maymun207/cwf_yaprak). All new architecture here. Seeded via curated keeper-copy from CWF-DEMO (NOT clone), fresh git. Master HEAD = `6009b2d`.
- `[CWF-DEMO]` = OLD repo, virtual-factory origin, still has sim code. Demo safety-net + harvest source (capability only, never files). MUST be frozen.
- *Repo-reading method (Claude):* `git clone https://github.com/maymun207/cwf_yaprak.git` in the sandbox each phase → verify reports against ACTUAL code (diff vs the last verified commit; never trust a report's claims). Public repo, works reliably.

### N3 — BACKENDS (multi-backend agent)
Both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- **ARMES** = ceramic MES, ≈140 FLAT tools (Kale Seramik / KB7). `system_of_record` (authoritative for everything). `backend_id='armes'`, `tool_pattern='flat'`.
- **Superset** = Apache Superset 6.1 BI, **GATEWAY** pattern. Only 4 tools (`get_instance_info`/`health_check`/`search_tools`/`call_tool`); ≈22 underlying discovered at runtime via `search_tools` (`parameters_hint` opaque = literally `"request"` for 21/22). Catalog `[docs/superset-tool-catalog.json]` = authoring ground-truth, NEVER pasted into prompt. `backend_id='superset'`, `tool_pattern='gateway'`. **LIVE-ACTIVATED (P6.5):** DB-sourced runtime truth (7 kinds / 22+ published rules). Role = `reporting_mirror` (advisory BI, NEVER authoritative — ADR-001).
- *Backend identity = DATA:* `public.backends` registry (P4.7), `backend_id` FK-constrained, resolved by `resolveActiveBackends` (enabled ∩ backend_id ∩ RBAC; legacy/untagged → `DEFAULT_BACKEND_ID='armes'`).

### N4 — ARCHITECTURE SPINE (EAIP seam map)
| seam | now (verified) | future EAIP |
|---|---|---|
| `[_lib/llm/gateway.ts]` | one `streamChat()` (Vercel AI SDK streamText, `stepCountIs(MAX_TOOL_ROUNDS)`) | LiteLLM/vLLM |
| `[_lib/prompt/*]` (assemble + core + per-backend pack) | `buildSystemPrompt(ctx,activeBackends)` | Prompt Store (Langfuse) |
| `KnowledgeProvider` | `DbKnowledgeProvider` (DB-first warm→read) + `StaticKnowledgeProvider` (code floor); `composeFor` dispatches `composeArmes`/`composeSuperset` per backend | LlamaIndex/Qdrant/Graphiti |
| grounding | `[prompt/core/grounding.ts]` rules + `[_lib/grounding/groundingCheck.ts]` runtime validator (Mode A, ARMES-zone-specific) | Guardrails AI |
| transport/tools | `[_lib/backends/mcpTransport.ts]` (transient retry + SSE-first) + `executeMCPTool`/discovery; meta-tools + `resultStore` | L3 tool nodes |
| backend dispatch | `tool_pattern` hint + per-backend composers/packs (flat vs gateway); no formal `BackendAdapter` class yet | the adapter port |
| `[_lib/observability/trace.ts]` | NoopTracer + `telemetry_events` | Langfuse |
| `[shared/dbConstants.ts]` | env-key + table names + ids | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` = backend-aware assembler. Order: identity→safety→time→toolProtocol→grounding→[domain packs]→outputFormat. Core = backend-agnostic. Domain pack (per-backend) = persona + knowledge. *INVARIANT: `buildSystemPrompt(ctx,[])` and `(ctx,['armes'])` are BYTE-IDENTICAL (`promptSnapshot.test.ts`) — Superset slice appears only when `'superset'` active.* toolProtocol rules GENERATED from config/meta-tool-name constants (not literals).

### N6 — KNOWLEDGE ARCHITECTURE / SOURCE-OF-TRUTH *
`KnowledgeProvider.getDomainContext(query,scope)→{injected,references}`. **Runtime SINGLE SOURCE OF TRUTH = the governed DB** (read via `DbKnowledgeProvider` warm→read). Code `referenceSchema` plays exactly 3 roles: (1) seed published into DB, (2) reset-to-reference target, (3) **outage floor** (DB-down/empty/unwarmed → serves code baseline so the agent is NEVER knowledge-blind; empty≠zero must survive a Supabase outage). *NEVER build a backend code-primary with DB as optional overlay — that inverts the model; always mirror ARMES (DB-first/code-floor).* *Critical core = typed/deterministic, NO vector* (IKINCILUST⇄IKINCILALT embedding near-neighbors). pgvector gated for a future Layer-2 corpus only.

### N7 — GOVERNANCE MODEL (P4) *
Code `referenceSchema` (immutable baseline = seed + floor) + DB `rule_kinds`/`domain_rules`/`rule_versions`/`rule_audit`. CORE kinds = field-structure LOCKED to code Zod (un-poisonable SHAPE; values live/gated/audited in DB; resettable). SOFT kinds {glossary_term, persona_fragment, routing_hint} = structure+value DB-editable + extensible. `governance.ts`: createDraft/updateDraft/**publish**/archive/rollback/resetToReference/createSoftKind. *`publish()` = the ONLY code path that writes `status='published'`; reset calls it; bypass = zero.* `scripts/seedRules.ts` (service role) publishes referenceData directly (does NOT run the gate — it IS the trusted seed).

### N8 — EVAL-GATE (the linchpin) *
`[_lib/knowledge/gate/evalGate.ts]` `runGate` on the CANDIDATE (published set w/ draft swapped). Stages (order authoritative, short-circuit): schema (CORE Zod `.strict()` / SOFT field-spec) → referential → behavioral (deterministic marker/invariant check — blind-spot survives, required markers present). *Backend-aware ADDITIVE dispatch on `kind.backendId` (P6): ARMES path byte-identical; Superset adds `stageReferentialSuperset`/`stageBehavioralSuperset`.* `SUPERSET_REQUIRED_MARKERS` (~L139) = substrings that must survive (search-then-call forbidden, empty≠zero forbidden, decline-on-empty forbidden, **+P6.8: scope-match-or-decline + metric-authority-armes forbidden**). *UNBYPASSABLE: RLS WITH CHECK status='draft' → client published write denied (42501).* Poison (IKINCILUST barcoded / Superset call-without-search / scope-substitute) REJECTED at behavioral.
- *Scoping lesson:* "no eval-gate machinery change" = the staging ENGINE (runGate), STAGE ORDER (GATE_STAGES), schema interpreter, AND the existing backend's path stay byte-identical — NOT "evalGate.ts diff empty." A NEW backend legitimately needs additive per-backend dispatch.

### N9 — RBAC
`super_admin` / `domain_editor` (per-backend scope) / `user`. Server-enforced (`adminGuard`); client role/scope = UI hint. `user_roles`, `user_backend_scopes`. `ksadmin`=super_admin. SECURITY DEFINER helpers (no RLS recursion).

### N10 — DOMAIN FACTS (ARMES, *sacred*)
- `getFactoryLines` = entry → resolve zone UUID → OEE/scrap. Zones KB7 {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless.*
- *Blind-spot: barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".*
- K4 = definitive throughput counter. getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3). getScrapBarcodeList shift hyphenated {24-08, 08-16, 16-24}. OEE = availability×performance×quality. *OEE/fire/throughput are ARMES-AUTHORITATIVE (N21/N23).*

### N11 — INFRA (preserved/proven, don't regress)
`toolResult.ts` 3-tier formatter + `resultStore.ts` large-result layer (handle + aggregate/query meta-tools; solved a real 5470-record failure) + `resolve_time_range` + tool-relevance filter + Anthropic prompt caching + raw passthrough + SSE heartbeat + graceful mid-stream error. MCP SDK pinned EXACT 1.29.0.

### N12 — TELEMETRY/OBS
`telemetry_events` (type{message,llm_call,tool_call,error}, model, tokens, tool_name, latency, cost, payload-redacted). Best-effort. `grounding_violation` rides under `type='error'`. = Langfuse seam's first consumer.

### N13 — BACKEND REGISTRY (P4.7) *
`public.backends` (id PK, display_name, `tool_pattern` flat|gateway, enabled). `backend_id` on {domain_rules, rule_kinds, rule_versions, user_backend_scopes} = FK to `backends(id)` (`on update cascade`/`on delete restrict`); the old `CHECK in (...)` enum is GONE. `BackendId` = plain `string`. *Adding a backend = a row, not a migration* (proven live). RLS: SELECT-all, writes service-role only (a backend cannot register/elevate itself).

### N14 — RUNTIME GROUNDING (validator) *
`grounding/groundingCheck.ts` `runGroundingCheck(...)` PURE/deterministic. Checks empty_as_zero (critical), count_understatement, fabrication_risk. *Forbidden phrases DERIVED from `BLIND_SPOTS` (single source).* Wired post-stream **Mode A (advisory)** in `chat.ts` (try/catch — a checker bug can NEVER break the stream); attaches `grounding` to `done` + telemetry. Does NOT block/rewrite. *ARMES-zone-specific by construction → a Superset/cross-backend runtime validator is the open P7 item (N21/N23).*

### N15 — GOVERNANCE PANEL (P5)
Isolated `/admin`. `adminService.ts` (Bearer) + `adminStore.ts` + `components/admin/` {AdminPanel, RulesTab, KindsTab, UsersTab, TelemetryTab, GateVerdict}. *Governed WRITES only via gated `/api/admin/*`; browser never mutates `domain_rules`.* CORE locked in UI; SOFT editable. GateVerdict shows poison rejected at behavioral (teaching surface). Telemetry tab shows `grounding_violation` rows.

### N16 — UI SHELL (P5.5, DONE)
Claude-web pattern: sidebar CLOSED by default; ONE layout (`/`+`/v2` merged, landing removed); chat-FIRST. Frontend-only — `cwfService` streaming + `cwfStore` send/receive FROZEN. Hero controls consolidated into sidebar; sidebar holds the P5.6 history slot.

### N17 — FRONTEND MAP
react-router (`/`, `/v2`, `/admin`). Stores: `authStore` (JWT; role/scopes = UI hint, server-enforced), `uiStore` (lang/sidebar), `cwfStore` (chat send/receive + **multi-conversation routing**, P5.6 — DON'T change behavior), `mcpStore`, `adminStore`. `MCPSettingsPanel` = the panel-UX pattern.

### N18 — CONVERSATION PERSISTENCE (P5.6, DONE) [NEW]
`conversations` (owner-CRUD RLS ≈ mcp_settings; client mints/renames/soft-deletes) + `messages` (SELECT-own + server-write-only ≈ telemetry_events). *Server is the SINGLE message-writer* (best-effort flush in `chat.ts`; `assertOwned` re-derives ownership before write since service-role bypasses RLS). *Conversation IDs CLIENT-minted (`crypto.randomUUID`)* — `assertOwned` guard is mandatory anyway, so client-mint adds zero security cost + free optimistic UI. Titles = deterministic truncation. Delete = soft (`deleted_at`). Repos: `ConversationRepository`/`MessageRepository`. Live RLS proof 10/10.

### N19 — SUPERSET GATEWAY DOMAIN (P6/P6.5, DONE+LIVE) [NEW]
Taught, NOT transcribed. Pack `[_lib/knowledge/backends/superset/]` {gatewayProtocol (GATEWAY_RULES/STEPS/PARAMETER_HINT_RULE), blindSpots, semantics, render, types, index}. Teaches PROTOCOL (search_tools→call_tool; never call a name search didn't return; never fabricate/invent params; re-search on error) + BI semantics (dataset vs chart vs dashboard) + blind-spots (permission-scoped empty ≠ zero) — NEVER enumerates the catalog (RULE 9; `supersetDomain.test.ts` no-enumeration guard). Composer `composeSuperset.ts` (governed rows override, else code floor) → `DbKnowledgeProvider.composeFor`. **P6.5 live:** seeded into DB, `scripts/verifySupersetRules.ts` 10/10 LIVE; live read-only round-trip proven (non-fabricated, read-only, empty≠zero honored).

### N20 — ACTIVE-BACKEND TOOL DISCIPLINE + TRANSPORT (P6.6/P6.7, DONE) [NEW]
- `[_lib/backends/scopeTools.ts]` `scopeToolsToBackends` — scopes the model-facing toolset to activeBackends BEFORE the Anthropic/relevance split. ARMES-only = no-op (byte-identical prefix); enabled-but-inactive backends' tools dropped.
- `[_lib/backends/mcpTransport.ts]` `isTransientMcpError`/`transportOrder`/`backoffMs` — `executeMCPTool` retries connect+call ONLY on transient errors (the live `SSE Non-200 (405)`); validation errors return as RESULT (model self-corrects). `connectMcp` honors transport order (SSE-first for Superset; ARMES `['http','sse']` = prior order, unchanged). `MCP_TOOL_MAX_ATTEMPTS` env-tunable. *These are CODE → require a deploy to take effect.*
- P6.7 pack rules (DB, live after reseed): request-shape-from-description, recover-from-validation-error, decline-on-empty (softened: fires only when search genuinely empty), list-page-one-indexed.

### N21 — CROSS-BACKEND SCOPE/AUTHORITY GUARD (P6.8, DONE+LIVE) * [NEW]
The corrective for a P6.7 footgun (a hardcoded Granit worked-example that guided the model to present Granit OEE as KB7). 4 guard `GATEWAY_RULES` (eval-gate-enforced markers): **scope-from-datasource** (scope = the bound underlying datasource, NEVER the resource TITLE — a "KB7"-titled dashboard bound to "Granit -" datasources is GRANIT data), **scope-match-or-decline** (sibling of empty≠zero: wrong-scope ≠ the answer; never substitute Granit for KB7), **attribute-source** (Superset = BI, not authoritative MES), **metric-authority-armes** (OEE/fire/throughput are ARMES-authoritative; don't fabricate from a similar-labeled BI dataset). Re-seeded → LIVE in governed store. *Prompt layer only; still needs the deterministic runtime validator (N14 sibling) as the third layer — P7.*

### N22 — DATA REALITY (KB7 / Granit, *locked*) * [NEW]
Live-verified: **KB7 OEE does NOT exist as KB7-scoped data in Superset.** Superset's only genuine OEE = GRANIT datasets (`Granit - Hat Günlük OEE` etc., ClickHouse). A dashboard *titled* `KB7 - Yönetici Raporu` (id 5) is a SHELL — all 29 charts bound to `Granit -` datasources. `KB7 - Ham Fire` (id 3) similarly. So "KB7" in Superset = a LABEL on Granit data ("olmalı ≠ var"). *Correct behavior when ARMES off + "KB7 OEE" asked: state KB7 OEE is not visible in the active backend / needs ARMES; at most offer clearly-labeled Granit-scope BI — NEVER Granit-as-KB7.* **OPEN data Q (sets acceptance branch):** is KB7 a filterable column-value in any Granit OEE dataset, or wholly absent? Evidence ⇒ absent. (Owner: Superset is an ARMES→MySQL→Superset reporting mirror; team to confirm whether it currently exposes only Granit.)

### N23 — BACKEND TRUST & PROVENANCE (ADR-001, *PROPOSED*) * [NEW]
The multi-backend trust primitive (artifact `ADR-001-backend-trust-and-provenance-v1.md`). *Decision:* **trust is earned by declaration + verification, ceiling-capped by role, revoked on anomaly; unknown backend defaults to the floor (advisory/never-authoritative).** Five mechanisms: (1) registry declarations (DATA, gated) = `trust_tier`/role {system_of_record, reporting_mirror, enrichment, unverified} + authority map (OEE→ARMES) + scope-identity contract; (2) provenance on every emitted fact (backend·tool·datasource·scope); (3) enforcement in ARCHITECTURE (authority routing, scope-match-or-decline, attribution); (4) **trust = a DETERMINISTIC FUNCTION** of provenance+role-ceiling+scope+authority+cross-source-reconciliation+invariants → score + reason set, *NEVER an LLM self-score* (that's RULE-5 theatre + poisonable); (5) containment (tool-output = DATA never COMMAND = injection boundary; can't poison KB / self-elevate / see tokens; quarantine on anomaly). *3 trust layers, honest reliability:* declaration-routing (strong/deterministic) · prompt guard (medium/model-dependent) · runtime validator (the real, model-independent check). *Honest limit:* a single-source self-consistent in-scope lie is made HARMLESS (can't be authoritative/poison, must be attributed, quarantinable) but not VISIBLE without an independent second source (redundancy = data/infra, not software). Acid test = attach a deliberately-lying MCP; PASS = its claims never authoritative, flagged on divergence, can't write KB, can't hijack via tool content — NOT "system knew the numbers were fake."

---

## GRAPH: EDGES (key causal chains)
- "add a backend/feature/X" request `→` *always hides a determinism/safety split* `→` name it before impl (correctness/safety→code or gated; advisory→soft). At backend scale: a new MCP defaults to the FLOOR (advisory, never authoritative) — trust is earned, not granted (N23).
- backend ENABLEMENT (which exist) = DATA (registry row) `vs` CAPABILITY (composer/pack) = CODE.
- learning improves FIND(routing) `⇄` never KNOW(correctness).
- "operation failed → make operation succeed" `vs` *"should this happen via this path at all?"* — the recurring AG trap (P6.6/6.7: tried to make a Superset OEE query succeed → would present Granit-as-KB7). *Ask the authority/scope question first.*
- title/label `vs` underlying datasource `→` *scope is the datasource, never the title* (N21/N22).
- eval-gate (publish-time) `vs` grounding/scope validator (answer-time) `vs` trust-function (provenance-time) = SEPARATE deterministic axes.
- reports `vs` code `→` *trust code* (this line: P5.6 "pushed" but not on remote at first read; AG's 4 OEE-diagnosis pivots overturned by cloning the repo; the Granit footgun caught only by reading the actual rule text).

---

## DECISIONS LOG (decision → rationale; ❌rejected)
D1 curated keeper-copy ❌full-clone · D2 keep+repoint Supabase ❌remove · D3 one gateway all providers ❌Gemini-native dup · D4 deterministic typed KB ❌vector-for-core · D5 gated-DB rules ❌code-only · D6 eval-gate deterministic ❌LLM-as-gate · D7 MCP SDK exact-pin ❌caret · D8 engine-then-panel · D9 server-side MCP resolution (token off client).
- **D10** backend identity = DATA (`backends`+FK), `BackendId=string` ❌ enum CHECK/union.
- **D11** grounding = deterministic code, advisory Mode A ❌ LLM-judge; facts-ledger numeric traceability deferred.
- **D12** UI split P5/P5.5/P5.6 ❌ one big redesign.
- **D13** LangGraph bridge = lean Shape B (TS core as MCP service), sequenced LAST ❌ Shape A port-everything.
- **D14 [P5.6]** conversation IDs CLIENT-minted (`crypto.randomUUID`) + mandatory server `assertOwned` ❌ server-only id-gen (assertOwned is required regardless → client-mint = zero security cost + optimistic UI).
- **D15 [P4→P6 locked]** runtime source of truth = governed DB; code = seed+reset+**outage floor** ❌ code-primary with DB overlay (inverts the model; empty≠zero must survive a Supabase outage). All backends mirror ARMES (DB-first/code-floor).
- **D16 [P6 eval-gate]** adding a backend = ADDITIVE per-backend referential/behavioral dispatch on `kind.backendId` ❌ "evalGate.ts diff must be empty" (self-contradictory — the engine/order/ARMES-path stay byte-identical; new backend needs its own stages).
- **D17 [P6.8]** cross-backend data-authority guard = scope-from-datasource (not title) + scope-match-or-decline (never substitute) + attribution + metric-authority(ARMES) ❌ "make the Superset query succeed" (would present Granit-as-KB7 = guided fabrication).
- **D18 [ADR-001, proposed]** Backend Trust & Provenance = trust is a DETERMINISTIC function (provenance+role-ceiling+scope+authority+reconciliation+invariants), unknown=floor, tool-output-never-command, containment over detection ❌ model-emitted trust score (RULE-5 theatre, poisonable) ❌ "make the liar honest" (a single-source in-scope lie is uncatchable without redundancy → make it harmless, not visible).

---

## ARTIFACTS PRODUCED (versioned; reference, don't regenerate)
Prompts: `claude-code-{SEED, FOUNDATION-1/2, PHASE-1…4, PHASE-4.7, GROUNDING-validator, PHASE-5, PHASE-5.5, PHASE-5.6, PHASE-6(-v1/v2), PHASE-6.5, PHASE-6.6, PHASE-6.8-cross-backend-scope-authority-guard-v1, VIZ-RESTORE}.md`.
ADR: **`ADR-001-backend-trust-and-provenance-v1.md`** (proposed — the N23 primitive).
Diagrams: `cwf-architecture-map-v5.html` + `cwf-runtime-topology-v1.html` (*stale — predate P5.6/P6.x; bump to v6/v2 when next touched*).
Docs: `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md`, `CLAUDE-PROJECT-INSTRUCTIONS.md`, this KB (v3), bootstrap (v3).

## STATUS (snapshot — live = `docs/ROADMAP.md`)
DONE & code-verified: SEED · Foundation-P1 · P1 · P2 · P3 · P4 (`8f4ed47`) · P4.7 (`92f9656`) · grounding (`65d0a6b`) · P5 (`876cf5f`) · P5.5 · **P5.6** (`7027389`) · **P6** (`2f6cf0a`) · **P6.5** (`89fce64`) · **P6.6+P6.7** (`8bd6166`) · **P6.8** (`c96f5b7`, re-seeded → guard LIVE). Master HEAD = **`6009b2d`**.
PENDING (owner): **deploy `6009b2d`** (transport+scoping are CODE) → **3-provider acceptance** (ARMES off, "KB7 OEE this week" on Gemini Flash / GPT-4.1 / Sonnet 4.6) → expect NO Granit-as-KB7 on any → paste traces → ratify P6.8.
NEXT (architect): **ADR-001 review/approve** → **Phase-A** (Trust Registry + injection-boundary + acid-test scaffold) → B provenance → C deterministic validators+trust annotation → D containment/quarantine + acid test. Also queued: Fix B (`execute_sql` SELECT-is-read — ONLY after guard passes acceptance) · Fix D (final-message fallback, independent) · Langfuse · eval golden harness · viz-restore · ARCHITECTURE.md · LangGraph bridge (Shape B).
VISION (P7+): deterministic runtime cross-backend scope validator (N14 sibling) · self-improving KB (curation agent → candidate inbox → human gate) · CC-via-MCP for rare core-kind change.

## STANDING RULES (enforce every phase)
- *Versioning:* every generated artifact versioned in filename + inside; never overwrite silently.
- RULE 1 no hardcoded config · RULE 3 docs (CHANGELOG+skill KB+AGENTS) part of done · RULE 4 backend identity = DATA · RULE 5 grounding/trust = deterministic code never an LLM judge/score · RULE 6 admin writes only via gated API · RULE 9 Superset = gateway, never transcribe the catalog · RULE 10 toolset scoped to activeBackends + scope-from-datasource + metric-authority(ARMES).
- *Invariants:* eval-gate unbypassable · blind-spot empty≠zero sacred · scope≠title / wrong-scope≠answer · secrets via env only (never print token/service-role/JWT) · cross-phase verification (trust code, clone & diff) · no vector in deterministic core · don't touch CWF-DEMO for arch work · single LLM gateway · ARMES byte-identical when Superset inactive.

## MAYMUN-OWNED OPEN ITEMS (remind when relevant)
**Deploy `6009b2d` + run the 3-provider acceptance** · place `ADR-001` in `docs/adr/` · confirm whether Superset currently exposes only Granit (team) + whether KB7 is a filterable value anywhere (N22) · keep real ARMES+Superset configs under `ksadmin` · **FREEZE CWF-DEMO** · real-ARMES confidence pass (large tables→handle path) in the running app.

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ hard pre-flight + self-verify checklist demanding evidence). Maymun pastes the AG report → Claude `git clone`s the repo and reviews CRITICALLY vs ACTUAL CODE (diff vs the last verified commit; never the report's claims) → flags discrepancies → writes the next gated prompt. Phases split into gated sub-phases (independent verification, no "kör birleştirme"). Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name the hidden trap; honest push-back; one path, finish fully, no demo deferrals.
