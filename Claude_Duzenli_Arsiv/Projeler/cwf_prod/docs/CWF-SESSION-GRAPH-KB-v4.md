# CWF/EAIP — Session Graph Knowledge Base  ·  v4
<!-- version: v4 · 2026-06-28 · supersedes v3 (through P6.8 + ADR-001 proposed). Updated through A1 + A1.1 done + ADR-001 v2 ACCEPTED + A2 prompt written. -->
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path · `{x,y}` set · `≈` approx · `❌` rejected

> **v4 delta (read first):** Since v3 (P6.8 done, ADR-001 proposed) we shipped & code-verified: **A1** backend trust registry (`e3ab250`→`e5b8310`) — trust as gated DATA + read seam, unknown→floor, zero behavioral change; **A1.1** RLS/grant hardening sweep (`1092c40`→`bc7ce8e`) — emergent from a real bug AG caught. Master HEAD = **`bc7ce8e`**. **ADR-001 v2 = ACCEPTED** (was proposed) with four amendments folded in (N23). **A2 (injection boundary) prompt WRITTEN, not yet implemented.** New durable rule: **RULE 11 — RLS isn't enough; classify the write-model + REVOKE** (the grant-asymmetry lesson). New nodes: trust registry (N24), grant hardening (N25), injection boundary (N26). Diagrams bumped: architecture-map **v6**, runtime-topology **v2** (this session).

---

## GRAPH: NODES

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends → reusable foundation for **EAIP** (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed. No "demo" deferrals — finish each thing fully, in the right order.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo (github.com/maymun207/cwf_yaprak). All new architecture here. Seeded via curated keeper-copy from CWF-DEMO (NOT clone), fresh git. Master HEAD = **`bc7ce8e`**.
- `[CWF-DEMO]` = OLD repo, virtual-factory origin, still has sim code. Demo safety-net + harvest source (capability only, never files). MUST be frozen.
- *Repo-reading method (Claude):* `git clone https://github.com/maymun207/cwf_yaprak.git` in the sandbox each phase → verify reports against ACTUAL code (diff vs the last verified commit; never trust a report's claims). Public repo, works reliably.

### N3 — BACKENDS (multi-backend agent)
Both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- **ARMES** = ceramic MES, ≈140 FLAT tools (Kale Seramik / KB7). `backend_id='armes'`, `tool_pattern='flat'`. **Trust tier = `system_of_record`** (authoritative for `oee`/`fire`/`throughput` — A1/N24).
- **Superset** = Apache Superset 6.1 BI, **GATEWAY** pattern. 4 tools (`get_instance_info`/`health_check`/`search_tools`/`call_tool`); ≈22 underlying discovered at runtime. Catalog `[docs/superset-tool-catalog.json]` = authoring ground-truth, NEVER pasted into prompt. `backend_id='superset'`, `tool_pattern='gateway'`. LIVE-ACTIVATED (P6.5). **Trust tier = `reporting_mirror`** (advisory BI, authoritative for NOTHING — A1/N24). Scope = bound datasource, never the title.
- *Backend identity = DATA:* `public.backends` registry (P4.7), `backend_id` FK-constrained, resolved by `resolveActiveBackends` (enabled ∩ backend_id ∩ RBAC; legacy/untagged → `DEFAULT_BACKEND_ID='armes'`).

### N4 — ARCHITECTURE SPINE (EAIP seam map)
| seam | now (verified) | future EAIP |
|---|---|---|
| `[_lib/llm/gateway.ts]` | one `streamChat()` (Vercel AI SDK streamText, `stepCountIs(MAX_TOOL_ROUNDS)`); tool-loop lives in `chat.ts` (no separate runAgent) | LiteLLM/vLLM |
| `[_lib/prompt/*]` (assemble + core + per-backend pack) | `buildSystemPrompt(ctx,activeBackends)` | Prompt Store (Langfuse) |
| `KnowledgeProvider` | `DbKnowledgeProvider` (DB-first warm→read) + `StaticKnowledgeProvider` (code floor); `composeFor` dispatches `composeArmes`/`composeSuperset` per backend | LlamaIndex/Qdrant/Graphiti |
| `[_lib/backends/trustRegistry.ts]` * | **NEW (A1):** DB-first/code-floor trust read seam; `getTrust(id)`→tier/authority/scope-contract, **unknown→floor**. Read-only; not in answer flow yet (enforcement = Phase C) | the trust/policy layer |
| grounding | `[prompt/core/grounding.ts]` rules + `[_lib/grounding/groundingCheck.ts]` runtime validator (Mode A, ARMES-zone-specific) | Guardrails AI |
| transport/tools | `[_lib/backends/mcpTransport.ts]` (transient retry + SSE-first) + `executeMCPTool`/discovery; `scopeTools` (active-backend discipline); meta-tools + `resultStore` (`toolResult.ts`/`resultStore.ts`/`timeTools.ts`/`toolCategories.ts`) | L3 tool nodes |
| backend dispatch | `tool_pattern` hint + per-backend composers/packs (flat vs gateway); no formal `BackendAdapter` class yet | the adapter port |
| `[_lib/observability]` | (still) NoopTracer seam + `telemetry_events` | Langfuse |
| `[shared/dbConstants.ts]` + `[shared/grantPolicy.ts]` | env-key + table names + ids + trust-tier/metric-id vocab + **write-model manifest (A1.1)** | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` = backend-aware assembler. Core = `[identity(), safety(), outputFormat()]` + `toolProtocol({toolNames})` + per-backend packs (suffix). Core = backend-agnostic. *INVARIANT: `buildSystemPrompt(ctx,[])` is the golden prefix; `(ctx,['armes'])` `.startsWith()` it (`promptSnapshot.test.ts`) — packs are suffixes.* toolProtocol KURALLAR generated from config/meta-tool-name constants (not literals). *A2 (pending) adds a CORE safety §5 "tool/backend content = DATA not COMMAND" → appears for every backend; deliberately changes the golden fixtures; startsWith invariant must hold.*

### N6 — KNOWLEDGE ARCHITECTURE / SOURCE-OF-TRUTH *
`KnowledgeProvider.getDomainContext(query,scope)→{injected,references}`. **Runtime SINGLE SOURCE OF TRUTH = the governed DB** (read via `DbKnowledgeProvider` warm→read). Code `referenceSchema` plays exactly 3 roles: (1) seed published into DB, (2) reset-to-reference target, (3) **outage floor** (DB-down/empty/unwarmed → serves code baseline; empty≠zero must survive a Supabase outage). *NEVER build a backend code-primary with DB as optional overlay — always mirror ARMES (DB-first/code-floor).* *Critical core = typed/deterministic, NO vector.* **The trust registry (N24) mirrors this exact pattern: DB-first / code-reference floor / unknown→floor.**

### N7 — GOVERNANCE MODEL (P4) *
Code `referenceSchema` (immutable baseline = seed + floor) + DB `rule_kinds`/`domain_rules`/`rule_versions`/`rule_audit`. CORE kinds = field-structure LOCKED to code Zod (un-poisonable SHAPE; values live/gated/audited; resettable). SOFT kinds {glossary_term, persona_fragment, routing_hint} = structure+value DB-editable + extensible. `governance.ts`: createDraft/updateDraft/**publish**/archive/rollback/resetToReference/createSoftKind. *`publish()` = the ONLY code path that writes `status='published'`; bypass = zero.* `scripts/seedRules.ts` (service role) publishes referenceData directly (IS the trusted seed). **Trust declarations follow the same seed-as-trusted-source pattern (`scripts/seedBackendTrust.ts`).**

### N8 — EVAL-GATE (the linchpin) *
`[_lib/knowledge/gate/evalGate.ts]` `runGate` on the CANDIDATE. Stages (order authoritative, short-circuit): schema (CORE Zod `.strict()` / SOFT field-spec) → referential → behavioral (deterministic marker/invariant check). *Backend-aware ADDITIVE dispatch on `kind.backendId` (P6): ARMES path byte-identical; Superset adds `stageReferentialSuperset`/`stageBehavioralSuperset`.* `SUPERSET_REQUIRED_MARKERS` incl. P6.8 scope-match-or-decline + metric-authority-armes. *UNBYPASSABLE: RLS WITH CHECK status='draft' → client published write denied (42501).* Poison REJECTED at behavioral.
- *Scoping lesson:* "no eval-gate machinery change" = engine (runGate) + stage order + schema interpreter + existing backend's path stay byte-identical — NOT "evalGate.ts diff empty." A NEW backend legitimately needs additive per-backend dispatch.

### N9 — RBAC
`super_admin` / `domain_editor` (per-backend scope) / `user`. Server-enforced (`adminGuard`); client role/scope = UI hint. `user_roles`, `user_backend_scopes`. `ksadmin`=super_admin. SECURITY DEFINER helpers (no RLS recursion).

### N10 — DOMAIN FACTS (ARMES, *sacred*)
- `getFactoryLines` = entry → resolve zone UUID → OEE/scrap. Zones KB7 {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless.*
- *Blind-spot: barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".*
- K4 = definitive throughput counter. getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3). getScrapBarcodeList shift hyphenated {24-08, 08-16, 16-24}. OEE = availability×performance×quality. *OEE/fire/throughput are ARMES-AUTHORITATIVE (N21/N24).*

### N11 — INFRA (preserved/proven, don't regress)
`toolResult.ts` 3-tier formatter + `resultStore.ts` large-result layer (handle + aggregate/query meta-tools; solved a real 5470-record failure) + `timeTools.ts` resolve_time_range + `toolCategories.ts` relevance filter + Anthropic prompt caching + raw passthrough + SSE heartbeat + graceful mid-stream error. MCP SDK pinned EXACT 1.29.0.

### N12 — TELEMETRY/OBS
`telemetry_events` (type{message,llm_call,tool_call,error}, model, tokens, tool_name, latency, cost, payload-redacted). Best-effort. `grounding_violation` rides under `type='error'`. = Langfuse seam's first consumer.

### N13 — BACKEND REGISTRY (P4.7 + A1) *
`public.backends` (id PK, display_name, `tool_pattern` flat|gateway, enabled). `backend_id` on {domain_rules, rule_kinds, rule_versions, user_backend_scopes} = FK to `backends(id)`; old `CHECK in (...)` enum GONE. `BackendId` = plain `string`. *Adding a backend = a row, not a migration.* RLS: SELECT-all, writes service-role only **+ explicit REVOKE anon/authenticated (A1/A1.1)**. **A1 extended `backends` with `trust_tier` (CHECK vocab, default 'unverified'=floor) + `scope_identity` jsonb, and added `backend_authority` (backend_id,metric) PK table.**

### N14 — RUNTIME GROUNDING (validator) *
`grounding/groundingCheck.ts` `runGroundingCheck(...)` PURE/deterministic. Checks empty_as_zero (critical), count_understatement, fabrication_risk. *Forbidden phrases DERIVED from `BLIND_SPOTS` (single source).* Mode A (advisory) in `chat.ts` (try/catch — never breaks the stream); attaches `grounding` to `done` + telemetry. *ARMES-zone-specific. Consumes `ToolResultMeta[]` which today has count/stored/compacted but NO backend/datasource/scope → the cross-backend scope/trust validator (Phase C) is BLOCKED on provenance (Phase B). This A→B→C dependency is hard, not preference.*

### N15 — GOVERNANCE PANEL (P5)
Isolated `/admin`. `adminService.ts` (Bearer) + `adminStore.ts` + `components/admin/*`. *Governed WRITES only via gated `/api/admin/*`; browser never mutates `domain_rules` (reads RLS-SELECT only).* CORE locked in UI; SOFT editable. GateVerdict shows poison rejected at behavioral. Telemetry tab shows `grounding_violation` rows.

### N16 — UI SHELL (P5.5, DONE) + N17 FRONTEND MAP
Claude-web pattern: sidebar closed-by-default; one layout (`/`+`/v2` merged); chat-first. react-router (`/`,`/v2`,`/admin`). Stores: `authStore` (JWT; role/scopes UI hint), `uiStore`, `cwfStore` (chat + multi-conversation P5.6), `mcpStore`, `adminStore`. *Browser direct writes (audited A1.1): ONLY `mcp_settings` upsert + `conversations` rename/soft-delete (owner-CRUD). Everything else browser-touches is RLS-SELECT read.*

### N18 — CONVERSATION PERSISTENCE (P5.6, DONE)
`conversations` (owner-CRUD RLS) + `messages` (SELECT-own + server-write-only). *Server is the SINGLE message-writer* (best-effort flush in `chat.ts`; `assertOwned` re-derives ownership before write since service-role bypasses RLS). *Conversation IDs CLIENT-minted (`crypto.randomUUID`)* — `assertOwned` mandatory regardless → client-mint = zero security cost + free optimistic UI. Titles = deterministic truncation. Delete = soft (`deleted_at`).

### N19 — SUPERSET GATEWAY DOMAIN (P6/P6.5, DONE+LIVE)
Taught, NOT transcribed. Pack `[_lib/knowledge/backends/superset/]` {gatewayProtocol, blindSpots, semantics, render, types, index}. Teaches PROTOCOL (search_tools→call_tool; never call an unreturned name; never fabricate params; re-search on error) + BI semantics + blind-spots (permission-scoped empty≠zero) — NEVER enumerates the catalog (RULE 9). Composer `composeSuperset.ts` (governed rows override, else code floor). P6.5 live: seeded, `verifySupersetRules.ts` 10/10, live read-only round-trip proven.

### N20 — ACTIVE-BACKEND TOOL DISCIPLINE + TRANSPORT (P6.6/P6.7, DONE)
- `[_lib/backends/scopeTools.ts]` scopes the model-facing toolset to activeBackends BEFORE the Anthropic/relevance split. ARMES-only = no-op (byte-identical); enabled-but-inactive backends' tools dropped.
- `[_lib/backends/mcpTransport.ts]` `isTransientMcpError`/`transportOrder`/`backoffMs` — `executeMCPTool` retries connect+call ONLY on transient errors (live `SSE Non-200 (405)`); validation errors return as RESULT (model self-corrects). SSE-first for Superset; ARMES order unchanged. `MCP_TOOL_MAX_ATTEMPTS` env-tunable. CODE → require a deploy.

### N21 — CROSS-BACKEND SCOPE/AUTHORITY GUARD (P6.8, DONE+LIVE) *
4 guard `GATEWAY_RULES` (eval-gate-enforced): **scope-from-datasource** (scope = bound datasource, NEVER the TITLE), **scope-match-or-decline** (wrong-scope ≠ the answer; never substitute Granit for KB7), **attribute-source** (Superset = BI, not authoritative MES), **metric-authority-armes**. Re-seeded → LIVE. *Prompt layer only; the deterministic runtime validator (N14 sibling) is Phase C.* Generalized by ADR-001 (N23).

### N22 — DATA REALITY (KB7 / Granit, *locked*) *
Live-verified: **KB7 OEE does NOT exist as KB7-scoped data in Superset.** Superset's only genuine OEE = GRANIT datasets (ClickHouse). Dashboard `KB7 - Yönetici Raporu` (id 5) is a SHELL — all 29 charts bound to `Granit -` datasources. *Correct behavior (ARMES off + "KB7 OEE"): state KB7 OEE not visible in active backend / needs ARMES; at most offer clearly-labeled Granit-scope BI — NEVER Granit-as-KB7.* **OPEN data Q (acceptance branch):** is KB7 a filterable column-value in any Granit OEE dataset, or wholly absent? Evidence ⇒ absent.

### N23 — BACKEND TRUST & PROVENANCE (ADR-001 v2, *ACCEPTED*) * [UPDATED]
Artifact `ADR-001-backend-trust-and-provenance-v2.md` (supersedes v1; placeholder in `docs/adr/`). *Decision (unchanged):* **trust earned by declaration + verification, ceiling-capped by role, revoked on anomaly; unknown→floor.** Five mechanisms: registry declarations (DATA, gated); provenance per fact; enforcement in architecture; **trust = a DETERMINISTIC FUNCTION** (provenance+role-ceiling+scope+authority+reconciliation+invariants), NEVER an LLM score; containment (tool-output=DATA-never-COMMAND; can't poison/self-elevate/see-tokens; quarantine on anomaly).
- **v2 amendments (the code-grounded review):** **A1** the honest limit covers SCOPE not only values (scope `datasource_name` is self-reported → the runtime scope validator is STRONG vs an honest backend, **containment-only vs a deliberate liar** that forges the label). **A2** provenance is TWO TIERS: *envelope* (`backend·tool·serverName`, agent-assigned, unforgeable, cheap, ship first) vs *payload* (`datasource·scope`, backend-CLAIMED, role-ceilinged, never ground-truth). **A3** injection boundary = structural + containment + prompt rule, **NOT a sanitizer** (no regex-stripping tool text — same theatre as a trust score). **A4** Phase-A acid scaffold = provenance-free tests only; the scope/reconciliation acid test → Phase D (needs B+C); quarantine triggers = deterministic set only (drop "injection attempts" as an auto-demotion driver).
- *Honest limit:* a single-source self-consistent in-scope lie (values AND scope label) is made HARMLESS, not VISIBLE, without an independent second source. **Software contains; redundancy reveals.**
- *Roadmap:* **A** registry+injection boundary (A1 ✓ / A2 written) → **B** provenance (envelope then payload) → **C** deterministic validators + first enforcement (trust routes answers; the acceptance test sets C's priority) → **D** quarantine + the acid test.

### N24 — TRUST REGISTRY (A1, DONE+LIVE) * [NEW]
The registry half of ADR-001 Phase A (`e3ab250`→`e5b8310`). **DATA + read seam, ZERO behavioral change** (frozen diff empty on chat/prompt/llm/grounding; enforcement = C).
- Migration `20260628120000`: `backends.trust_tier` (CHECK {system_of_record, reporting_mirror, enrichment, unverified}, **default 'unverified' = the floor**) + `backends.scope_identity` jsonb + `backend_authority` (backend_id FK, metric, PK) table; RLS SELECT-all + no write policy + **REVOKE** anon/authenticated.
- `[_lib/knowledge/reference/backendTrust.ts]`: `FLOOR_TRUST` + `REFERENCE_BACKEND_TRUST` (armes=system_of_record {oee,fire,throughput}/zone; superset=reporting_mirror/[]/datasource) = seed source + reset target + outage floor.
- `[_lib/backends/trustRegistry.ts]`: DB-first/code-floor `warm()→getTrust()`; **unknown→floor** resolution (outage→code-reference; warmed-but-`unverified`→floor; "known ≠ declared"). Injectable `TrustSource` for tests. NOT imported into `chat.ts`.
- `shared/dbConstants.ts`: `TRUST_TIER` + `METRIC_IDS` + `BACKEND_AUTHORITY`. Scripts: `seedBackendTrust.ts` + `verifyBackendTrust.ts` (live 14/14: structure, seed, unknown→floor, 42501 RLS-deny, outage floor).

### N25 — RLS/GRANT HARDENING (A1.1, DONE+LIVE) * [NEW]
Emergent from a real bug AG caught mid-A1 (`1092c40`→`bc7ce8e`). **The asymmetry:** RLS-on + no write policy → INSERT default-denies (42501) but UPDATE/DELETE silently match ZERO rows (success, no error). So an anon UPDATE was a silent no-op, not a hard deny. **Fix:** `REVOKE` moves denial to the privilege layer (deterministic 42501 before RLS). Audited all 13 tables by intended writer:
- *server-only* (browser reads only; writes via service role) → REVOKE anon+authenticated: telemetry_events, messages, rule_versions, rule_audit, tool_category_cache, domain_rules, rule_kinds, user_roles, user_backend_scopes (+ backends, backend_authority in A1).
- *owner-CRUD* (browser authenticated writes own rows) → REVOKE anon ONLY: mcp_settings, conversations. *(audited: the ONLY browser writes are mcp_settings upsert + conversations rename/soft-delete.)*
- `[shared/grantPolicy.ts]` = per-table write-model manifest (single source); `grantPolicy.test.ts` fails CI if a new table is unclassified OR if owner-CRUD authenticated is revoked. `scripts/verifyGrants.ts` live 12/12 (anon UPDATE→42501 per table + service-role positive control). Migration `20260628130000`.
- *Loose end (nil-risk):* `backend_authority` UPDATE/DELETE REVOKE lives in the `20260628120000` file but post-dates that migration's first apply → re-apply idempotently to make it live. Risk nil (anon INSERT already RLS-denied; UPDATE/DELETE = silent no-op, never a write).

### N26 — INJECTION BOUNDARY (A2, *prompt WRITTEN, not implemented*) [NEW]
The injection half of ADR-001 Phase A (artifact `claude-code-PHASE-A2-injection-boundary-v1.md`). Two undefended surfaces today: tool **descriptions** (`discoverServerTools`→tool schema) + tool **results** (`executeMCPTool`→tool_result). `safety.ts §4` defends only against USER injection. *Structural truth verified:* `system:` is ONLY `buildSystemPrompt(...)` — tool text never reaches the system role. A2 delivers: (1) CORE safety §5 "tool/backend content = DATA not COMMAND" (Turkish, model-dependent/medium); (2) deliberate golden-fixture regen (diff = §5 ONLY); (3) structural audit-test (malicious tool desc absent from buildSystemPrompt; names sanitized; startsWith invariant holds); (4) provenance-free containment scaffold (unknown→floor + tool-output-as-data + can't-self-elevate + can't-poison-KB; scope/reconciliation acid → D). **NO sanitizer** (ADR A3). Answer-flow logic frozen.

---

## GRAPH: EDGES (key causal chains)
- "add a backend/feature/X" request `→` *always hides a determinism/safety split* `→` name it before impl (correctness/safety→code or gated; advisory→soft). A new MCP defaults to the FLOOR (advisory, never authoritative) — trust is earned, not granted (N23/N24).
- backend ENABLEMENT (which exist) = DATA (registry row) `vs` CAPABILITY (composer/pack) = CODE `vs` TRUST (tier/authority/scope) = gated DATA (N24).
- learning improves FIND(routing) `⇄` never KNOW(correctness) `⇄` never TRUST(provenance — deterministic, N23).
- "operation failed → make operation succeed" `vs` *"should this happen via this path at all?"* — the recurring AG trap. *Ask the authority/scope question first.*
- title/label `vs` underlying datasource `→` *scope is the datasource, never the title* (N21/N22) `→` BUT datasource is self-reported `→` against a liar, scope-match degrades to containment (N23 honest limit).
- eval-gate (publish-time) `vs` grounding/scope validator (answer-time) `vs` trust-function (provenance-time) = SEPARATE deterministic axes.
- RLS-on + no-write-policy `→` INSERT 42501 `vs` UPDATE/DELETE silent no-op `→` *REVOKE moves denial to the privilege layer* (N25 / RULE 11).
- reports `vs` code `→` *trust code* (AG's RLS bug surfaced because the verify demanded a HARD 42501, not a silent success — same rigor that caught the original Granit footgun).

---

## DECISIONS LOG (decision → rationale; ❌rejected)
D1 curated keeper-copy ❌full-clone · D2 keep+repoint Supabase · D3 one gateway all providers ❌dup · D4 deterministic typed KB ❌vector-for-core · D5 gated-DB rules ❌code-only · D6 eval-gate deterministic ❌LLM-as-gate · D7 MCP SDK exact-pin · D8 engine-then-panel · D9 server-side MCP resolution (token off client).
- **D10** backend identity = DATA (`backends`+FK), `BackendId=string` ❌ enum CHECK/union.
- **D11** grounding = deterministic code, advisory Mode A ❌ LLM-judge.
- **D12** UI split P5/P5.5/P5.6 ❌ one big redesign.
- **D13** LangGraph bridge = lean Shape B (TS core as MCP service), sequenced LAST ❌ Shape A port-everything.
- **D14 [P5.6]** conversation IDs CLIENT-minted + mandatory server `assertOwned` ❌ server-only id-gen.
- **D15 [P4→P6 locked]** runtime source of truth = governed DB; code = seed+reset+**outage floor** ❌ code-primary with DB overlay. All backends (incl. the trust registry, N24) mirror ARMES (DB-first/code-floor).
- **D16 [P6 eval-gate]** adding a backend = ADDITIVE per-backend dispatch on `kind.backendId` ❌ "evalGate.ts diff must be empty."
- **D17 [P6.8]** cross-backend data-authority guard = scope-from-datasource + scope-match-or-decline + attribution + metric-authority(ARMES) ❌ "make the Superset query succeed."
- **D18 [ADR-001 v2, ACCEPTED]** Backend Trust & Provenance = trust is a DETERMINISTIC function, unknown=floor, tool-output-never-command, containment over detection ❌ model-emitted trust score ❌ "make the liar honest." *v2 amendments:* honest limit covers SCOPE (A1); provenance two-tier envelope/payload (A2); injection boundary structural NOT a sanitizer (A3); provenance-free acid scaffold + deterministic quarantine triggers (A4).
- **D19 [A1]** trust registry = `trust_tier` CHECK vocabulary (like tool_pattern) on `backends` + `scope_identity` jsonb + `backend_authority` table; default 'unverified'=floor; DB-first/code-floor read seam; **unknown→floor** ❌ trust_tier lookup-table/enum-on-backend_id ❌ scope_identity as its own table (B/C only read it) ❌ code-primary.
- **D20 [A1.1]** RLS isn't enough → classify each table's write-model + `REVOKE` (privilege-layer deny) ❌ blanket revoke (would break owner-CRUD: mcp_settings/conversations need authenticated own-row writes). Manifest (`grantPolicy.ts`) + CI guard + live verify.

---

## ARTIFACTS PRODUCED (versioned; reference, don't regenerate)
Prompts: `claude-code-{SEED…PHASE-6.8, PHASE-A1-trust-registry-v1, PHASE-A2-injection-boundary-v1, VIZ-RESTORE}.md`. *(A1.1 grant sweep was emergent — no standalone prompt; captured in CHANGELOG + this KB.)*
ADR: **`ADR-001-backend-trust-and-provenance-v2.md`** (ACCEPTED; v1 superseded; placeholder in `docs/adr/`).
Diagrams: **`cwf-architecture-map-v6.html`** + **`cwf-runtime-topology-v2.html`** (this session; supersede v5/v1).
Docs: `CWF-SERVICE-ARCHITECTURE-AND-BUILD-PLAN.md`, `CLAUDE-PROJECT-INSTRUCTIONS.md`, this KB (v4), bootstrap (**bump to v4 when next touched**).

## STATUS (snapshot — live = `docs/ROADMAP.md`)
DONE & code-verified: SEED · Foundation-P1 · P1 · P2 · P3 · P4 · P4.7 · grounding · P5 · P5.5 · P5.6 · P6 · P6.5 · P6.6+P6.7 · P6.8 · **A1** (`e5b8310`) · **A1.1** (`bc7ce8e`). Master HEAD = **`bc7ce8e`**.
NEXT (architect): **A2** (injection boundary — prompt written, awaiting AG run) → **B** provenance (envelope→payload) → **C** deterministic validators + first enforcement → **D** quarantine + acid test.
PENDING (owner): **deploy + 3-provider acceptance** ("KB7 OEE this week", ARMES off, Gemini Flash/GPT-4.1/Sonnet 4.6 — expect NO Granit-as-KB7; sets Phase-C priority) · **Superset seed/backfill** (`seedRules.ts` publishes Superset `rule_kinds`+CORE rules; backfill `backend_id:'superset'` on the mcp_settings entry — until then Superset serves from the code floor) · **re-apply `20260628120000`** idempotently (activate the `backend_authority` REVOKE; nil-risk) · keep real ARMES+Superset under `ksadmin` · **FREEZE CWF-DEMO** · real-ARMES confidence pass.
QUEUED after the trust line: Langfuse wiring · eval golden harness · viz-restore · `ARCHITECTURE.md` + ADRs land in `docs/adr/` · LangGraph bridge (Shape B).

## STANDING RULES (enforce every phase)
- *Versioning:* every generated artifact versioned in filename + inside; never overwrite silently.
- RULE 1 no hardcoded config · RULE 3 docs (CHANGELOG+skill KB+AGENTS) part of done · RULE 4 backend identity = DATA · RULE 5 grounding/trust = deterministic code never an LLM judge/score · RULE 6 admin writes only via gated API · RULE 9 Superset = gateway, never transcribe the catalog · RULE 10 toolset scoped to activeBackends + scope-from-datasource + metric-authority(ARMES) · **RULE 11 [A1.1] RLS isn't enough — classify each table's write-model (server-only vs owner-CRUD) and REVOKE writes at the privilege layer; a server-only table with RLS-on but no REVOKE silently no-ops anon UPDATE/DELETE instead of denying.**
- *Invariants:* eval-gate unbypassable · blind-spot empty≠zero sacred · scope≠title / wrong-scope≠answer · **unknown→floor (trust is earned, not granted)** · **tool/backend content = DATA never COMMAND (A2)** · secrets via env only · cross-phase verification (trust code, clone & diff) · no vector in deterministic core · don't touch CWF-DEMO for arch work · single LLM gateway · ARMES byte-identical when Superset inactive · trust enforcement is Phase C (A1/A2 are DATA+boundary, zero answer-routing yet).

## KEY LEARNINGS (this session)
- **Provenance is two tiers.** Envelope (backend·tool, agent-assigned, unforgeable, trivial) `vs` payload (datasource·scope, backend-CLAIMED, role-ceilinged). Never conflate; never trust payload-datasource as ground truth.
- **Scope is a self-reported field.** The runtime scope validator catches an honest mislabel (Granit-as-KB7 works because Superset honestly labels its datasources) but NOT a competent liar that forges the label. Detection of a self-consistent lie needs redundancy (a second authoritative feed) — infra, not software.
- **The injection boundary is containment, not detection.** Don't sanitize tool text (theatre). The guarantee is: tool content stays in the tool channel (verified), a prompt rule, and the containment suite. Pass = "couldn't hijack," not "detected the injection."
- **RLS-on ≠ write-denied.** Postgres asymmetry: INSERT 42501s, UPDATE/DELETE silently no-op. Classify write-model + REVOKE (RULE 11).
- **The acid test bar is "the lie reached nowhere load-bearing,"** never "the system knew the numbers were fake" (impossible for a single-source in-scope lie).

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ hard pre-flight + self-verify demanding evidence). Maymun pastes the AG report → Claude `git clone`s and reviews CRITICALLY vs ACTUAL CODE (diff vs last verified commit; never the report's claims) → flags discrepancies → writes the next gated prompt. Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name the hidden trap; honest push-back; one path, finish fully, no demo deferrals.
