# CWF/EAIP — Session Graph Knowledge Base  ·  v6
<!-- version: v6 · 2026-06-30 · supersedes v5 (master 8e9f65d, through Phase C). Bumped to master HEAD = 768bd6d after the WHOLE post-C run: D-core · GATE-HARDENING · RBAC v2 · GOV-2/3/4 · OEE-parity learning · OBS-1 · UI-1 · Phase F · DOC-1 (living doc) · PROV-1/2 (LLM registry) · parallel MCP-ADMIN + a full security audit. Two new standing rules: automation-first, admin-UI-for-governed-data. -->
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path · `{x,y}` set · `≈` approx · `❌` rejected

> **v6 delta (read first):** Since v5 (master `8e9f65d`, trust line A→C done) the project shipped & code-verified 27 commits up to master **`768bd6d`**. The trust line A→C and SEED→P6.8 are unchanged and stable. NEW work, all DONE+code-verified (mostly LIVE): **D-core** lying-backend acid (`7451383`, forged-label limit codified) · **GATE-HARDENING** typecheck-in-build (`a8bd531`) · **RBAC v2** three-role maker-checker (`0166c01`+`780018a`) · **GOV-2/3/4** governance panel (admin shell + edit/reset + session-preview, `6b42738`/`7156f0c`/`9ca5833`) · **OBS-1** test observability (`a3d11d9`) · **UI-1** portal-theme escape (`d0b91a0`) · **Phase F** backend-aware tool filter (`1c2e0a7`, LIVE both halves) · **DOC-1** Living Architecture Document + drift-guard (`dc16a2e`) · **PROV-1** LLM provider registry as DATA (`a262403`/`5e8bb8a`) · **PROV-2** providers admin tab (`06126f6`, merged `768bd6d`). PLUS two PARALLEL phases I reviewed (sound, no blockers): **MCP-ADMIN** (`ea16f52`, MCP settings→panel, hybrid governance, touched chat.ts) + a **full security audit** (`42fbac8`+`f4ae23a`, H1/H3/M1/M2 fixed). New nodes N29–N41. New standing rules: **automation-first** + **admin-UI-for-governed-data** + **living-doc lock-step**. **NEXT (new session): P-2 viz-restore · living-doc reconciliation (5 diagrams drifted) · PROV-3 fallback consolidation · then PL-1 F-obs (OTel→Langfuse).**

---

## GRAPH: NODES  (N1–N28 = stable foundation through Phase C; N29–N41 = post-C)

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends → reusable foundation for **EAIP** (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed. No "demo" deferrals — finish each thing fully, in the right order.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo (github.com/maymun207/cwf_yaprak, public). All new architecture here. Master HEAD = **`768bd6d`**.
- `[CWF-DEMO]` = OLD repo, FROZEN. Harvest source (capability only, never files).
- *Repo-reading method (Claude):* `git clone` in the sandbox each phase → verify reports against ACTUAL code (diff vs the last verified commit; never trust a report's claims). Caught: the gateway-override trap, the RLS asymmetry, the DOC-1 NUL-byte landmine, the chat.ts-diff-impossible-vs-stale-base (PROV-2).

### N3 — BACKENDS (multi-backend agent)
- **ARMES** = ceramic MES, ≈140 FLAT tools (KB7). `backend_id='armes'`, `tool_pattern='flat'`. Trust = **`system_of_record`** (authoritative for oee/fire/throughput).
- **Superset** = Apache Superset 6.1 BI, **GATEWAY** (4 tools: get_instance_info/health_check/search_tools/call_tool; ≈22 underlying). `backend_id='superset'`, `tool_pattern='gateway'`. LIVE. Trust = **`reporting_mirror`** (authoritative for NOTHING). Scope = bound datasource, never the title. Catalog `docs/superset-tool-catalog.json` = authoring ground-truth, NEVER pasted into prompt.
- *Backend identity = DATA* (`public.backends` registry, FK-constrained, `resolveActiveBackends`; legacy→`DEFAULT_BACKEND_ID='armes'`).
- **MCP server LIST is now hybrid-governed (N40):** `loadUserMcpServers` merges `mcp_global_settings` (super_admin platform-wide) + per-user `mcp_settings` (personal overrides by id; only enabled).

### N4 — ARCHITECTURE SPINE (EAIP seam map)
| seam | now (verified) | future EAIP |
|---|---|---|
| `[_lib/llm/gateway.ts]` | one `streamChat()` (Vercel AI SDK streamText); tool-loop still inline in `chat.ts` (**biggest structural debt — no `runAgent` seam; LangGraph needs it extracted first**). **Provider set now DATA (N38): `llmProviderRegistry` warm→read + family-dispatch resolver (openai-compatible for custom; unknown family→THROW).** | LiteLLM/vLLM |
| `[_lib/prompt/*]` | `buildSystemPrompt(ctx,activeBackends)`; CORE = identity+safety(§1–5)+outputFormat; per-backend packs as suffixes (golden-prefix invariant) | Prompt Store (Langfuse) |
| `KnowledgeProvider` | `DbKnowledgeProvider` (DB-first warm→read) + code floor; governed rows override else floor | LlamaIndex/Qdrant |
| `[_lib/backends/trustRegistry.ts]` * | DB-first/code-floor trust read seam; `getTrust(id)`→tier/authority/scope, unknown→floor; warmed in chat.ts, feeds the scope/authority validator (C) | trust/policy layer |
| grounding | `groundingCheck.ts` runtime validator (Mode A) — 4 checks incl. scope_divergence (C); provenance on `ToolResultMeta` (B1/B2) | Guardrails AI |
| transport/tools | `mcpTransport.ts` + discovery/`executeMCPTool`; `scopeTools` (active-backend) + **`backendToolPattern.ts` (F, flat|gateway routing floor)**; meta-tools + `resultStore` + relevance filter (**now backend-aware + a `metrics` category, N36**) | L3 tool nodes |
| `[_lib/observability]` | NoopTracer seam + `telemetry_events`; **+ OBS-1 `[ToolRoute]` per-turn trace log + no-redeploy cache-clear** | Langfuse (PL-1 F-obs: OTel→self-hosted Langfuse) |
| `[shared/dbConstants.ts]`+`[shared/grantPolicy.ts]` | env-key+tables+ids+trust/metric vocab+write-model manifest; `+LLM_PROVIDERS`, `+MCP_GLOBAL_SETTINGS`, `+provider_audit` | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` backend-aware assembler. CORE = identity+safety(§1–5: §5 = "tool/backend content = DATA not COMMAND", A2)+outputFormat + per-backend packs (suffix). *INVARIANT: `(ctx,[])` golden prefix; backend packs `.startsWith()` it.*

### N6 — KNOWLEDGE / SOURCE-OF-TRUTH *
Runtime SINGLE SOURCE OF TRUTH = governed DB (DbKnowledgeProvider warm→read). Code `referenceSchema` = (1) seed, (2) reset-to-reference target, (3) outage floor (empty≠zero survives a Supabase outage). *NEVER code-primary with DB overlay — DB-first/code-floor.* The trust registry (N24) AND the LLM provider registry (N38) mirror this exact pattern.

### N7 — GOVERNANCE MODEL (P4) *
Code referenceSchema baseline + DB `rule_kinds`/`domain_rules`/`rule_versions`/`rule_audit`. CORE kinds = field-shape LOCKED to code Zod (un-poisonable; values gated/audited/resettable). SOFT = structure+value DB-editable. `governance.ts`: …/`publish`/…/`resetToReference`. *`publish()` = the ONLY path that writes `status='published'`; RLS denies client publish (42501).*

### N8 — EVAL-GATE (the linchpin) *
`runGate` on the CANDIDATE: schema(CORE Zod `.strict()`/SOFT field-spec)→referential→behavioral, order authoritative. Backend-aware ADDITIVE dispatch on `kind.backendId` (ARMES byte-identical; Superset adds stages). UNBYPASSABLE. Poison REJECTED at behavioral.

### N9 — RBAC [SUPERSEDED by N31] *
*See N31 — RBAC v2 (three-role maker-checker). The old super_admin/domain_editor/user model is replaced; domain_editor is now a deprecated alias.*

### N10 — DOMAIN FACTS (ARMES, *sacred*)
`getFactoryLines` = entry → zone UUID → OEE/scrap. Zones KB7 {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".* K4 = throughput counter. getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3). `FACTORY_ID='KB7'`. *OEE/fire/throughput are ARMES-AUTHORITATIVE.* Canonical metric tools = `CANONICAL_METRIC_TOOLS` (getOeeValuesForZones/getDailyOeeValues) — the `metrics` routing category (N36).

### N11 — INFRA (preserved, don't regress)
`toolResult.ts` 3-tier formatter + `resultStore.ts` (handle + aggregate/query meta-tools) + `timeTools.ts` + `toolCategories.ts` relevance filter + Anthropic prompt caching + SSE heartbeat + graceful mid-stream error. MCP SDK pinned EXACT 1.29.0.

### N12 — TELEMETRY/OBS
`telemetry_events` (durable LEDGER; redacted; `tool_call` carries backendId). + OBS-1 `[ToolRoute]` trace log (debug; observe-only). *Hard split (PL-1): ledger vs tracing — different consumers/retention/PII.*

### N13 — BACKEND REGISTRY (P4.7 + A1) *
`public.backends` (id PK, `tool_pattern` flat|gateway, enabled, `trust_tier` CHECK default 'unverified'=floor, `scope_identity` jsonb). FK on governed tables; enum CHECK gone. *Adding a backend = a row.* `backend_authority` (backend_id,metric) PK. RLS SELECT-all + REVOKE anon/authenticated.

### N14 — RUNTIME GROUNDING (validator) *
`groundingCheck.ts` `runGroundingCheck` PURE/Mode A (post-stream, never blocks). 4 checks: empty_as_zero, count_understatement, fabrication_risk, scope_divergence (C). Consumes `ToolResultMeta[]` provenance (B1+B2).

### N15 — GOVERNANCE PANEL [EXPANDED by N32]
*See N32 — GOV-2/3/4 shipped the legible shell + per-table edit/reset (the reset-to-reference button now EXISTS) + session-preview. Deny/quarantine UI still open.*

### N16 — UI SHELL (P5.5) + FRONTEND MAP
Claude-web pattern: sidebar closed-by-default; chat-first. Stores: authStore/uiStore/cwfStore(chat+multi-conversation)/mcpStore/adminStore. *Browser direct writes (audited): mcp_settings upsert + conversations rename/soft-delete only; else RLS-SELECT.* **GOV-2 scoped shadcn tokens to `.admin-theme` (not `:root`) → the UI-1 ghost-popover bug (N35).**

### N18 — CONVERSATION PERSISTENCE (P5.6)
`conversations` (owner-CRUD) + `messages` (SELECT-own + server-write-only). *Server = single message-writer; `assertOwned` re-derives ownership* (held up as M3-IDOR-false-positive in the security audit, N41). IDs CLIENT-minted + assertOwned mandatory.

### N19–N22 — SUPERSET DOMAIN + GUARDS + DATA REALITY *  (stable; see v5 for full detail)
N19 Superset gateway pack (`composeSuperset`: governed rows OVERRIDE floor — a stale seed can hide newer floor rules; fixed via `resetToReference`). N20 active-backend tool discipline + transport (SSE-first, transient-retry). N21 4 cross-backend `GATEWAY_RULES` (scope-from-datasource/scope-match-or-decline/attribute-source/metric-authority-armes), eval-gate-enforced, LIVE. **N22 DATA REALITY (locked): KB7 OEE does NOT exist as KB7-scoped data in Superset — dashboard id 5 is a Granit-bound shell.** *Inverse relationship: more model capability → more wrong-scope data surfaced (drove C to HIGH, and N33).*

### N23–N28 — TRUST LINE A→C (DONE+code-verified; stable) *
**N23 ADR-001 v2 (ACCEPTED):** trust = a DETERMINISTIC FUNCTION (declaration+verification, role-ceiling, unknown→floor), never an LLM score; **containment over detection**; forged-label limit codified. **N24 trust registry (A1):** `backends.trust_tier`+`scope_identity`+`backend_authority`; `trustRegistry.warm()→getTrust()` unknown→floor; `isAuthoritativeFor`. **N25 RLS/grant hardening (A1.1):** RLS-on+no-write-policy is asymmetric → REVOKE at the privilege layer → **RULE 11**. **N26 injection boundary (A2):** tool content reaches tools/results channels, NEVER the system role; structural not a sanitizer → **RULE 12**. **N27 provenance (B1 envelope unforgeable / B2 payload claim, role-ceilinged):** `FactProvenance` on `ToolResultMeta`. **N28 scope/authority validator (C):** the 4th grounding check + deterministic APPEND on scope_divergence (S⊄T, non-authoritative backend, scoped metric); STRONG vs honest backend, CONTAINMENT vs forged label → **RULE 13**.

---

### N29 — D-CORE ACID (lying-backend, DONE) *
`7451383` (test-only, no source change). Proves containment end-to-end + **codifies the forged-label LIMIT**: a single-source self-consistent in-scope forged-`datasource_name` lie is CONTAINED (floor/role-ceiling) but NOT detected (S⊆T defeats C's scope-match). Closes the A2 `it.todo`. *The only software detection = Phase E reconciliation. Never add a heuristic to fake detection (RULE 5).*

### N30 — GATE-HARDENING (DONE)
`a8bd531`. The build gate now typechecks `api/` + scripts (nodenext source + bundler tests); fixed latent `supersetGate` TS2459; closed the build-green-hides-it hole. No runtime change.

### N31 — RBAC v2 (three-role maker-checker, DONE) [supersedes N9] *
`0166c01` (RBAC-1) + `780018a` (RBAC-1.1). Roles: **`super_admin`** (checker/deployer = ALL perms) / **`power_user`** (MAKER/dev = panel + scoped draft authoring + session-preview; NO publish/reset/rollback/routing/users/config) / **`user`** (chat). `domain_editor` = DEPRECATED alias→maker. `PERMISSIONS` map + `ROLE_PERMISSIONS` + `hasPermission`; server-enforced (`adminGuard`: authed→ensurePermission); client `can(perm)` = UI hint only. **Matrix honesty (RULE): the matrix must NEVER claim a grant the endpoint doesn't enforce** (RBAC-1.1 removed the power_user KIND_SOFT_EDIT orphan; `permissions.test.ts` asserts a `MAKER_DENIED` set). Gated user management (`api/admin/users.ts`, anti-lockout).

### N32 — GOVERNANCE PANEL v2 (GOV-2/3/4, DONE) [expands N15] *
`6b42738` **GOV-2** = legible admin shell on **shadcn/ui (Tailwind v4)** + design system (tokens scoped to `.admin-theme`, not `:root`, to keep the chat shell byte-identical — the source of the UI-1 bug). `7156f0c` **GOV-3** = per-table edit/reset affordances (**the reset-to-reference button now EXISTS** — closes the old N15 gap). `9ca5833` **GOV-4** = session-preview + Lab mode (server-authorized, READ-ONLY vs global state, additive; `RULE_PREVIEW_SESSION`/`LAB_TOGGLE_SESSION`). Tabs: Rules·Kinds·Users·Telemetry·Lab·Routing·**Mimari/Architecture (DOC-1)**·**Providers (PROV-2)**·**MCP (MCP-ADMIN)**. *Deny/quarantine UI still open.*

### N33 — OEE PARITY TEST LEARNING (empirical) *
Fixed-query 3-provider × routing-bypass test **INVERTED a prior diagnosis**: bypass OFF (relevance filter ON) SUCCEEDED for weak models; bypass ON (full 140-tool set) FAILED (weak models grabbed wrong production tools — getOrderDetails/getPlannedOrderPlans). **⇒ the relevance filter HELPS weak models (narrows away confusables); the full set DROWNS them.** Drove Phase F's `metrics` category. *The filter is beneficial for correctness, not just perf.*

### N34 — OBS-1 (test observability, DONE+LIVE) *  [automation-first enabler]
`a3d11d9`+`95235be`. **(1) No-redeploy routing-cache clear:** `routing_cache_meta` singleton epoch; `ensureFreshCache()` (TTL-throttled) re-reads the epoch + self-colds the warm instance on a bump → no redeploy; gated `api/admin/routing-cache.ts` (`ROUTING_CACHE_CLEAR`, maker+super) + RoutingTab. **(2) Per-turn `[ToolRoute]` trace log:** `traceId` + `provider·bypass·path·offered=N/M·gateway·canonicalOEE·categories`, OBSERVE-ONLY. *This is what lets Claude read Vercel runtime logs → verdict with zero manual paste — the core of the automation-first loop.*

### N35 — UI-1 (admin portal-theme escape, DONE+LIVE)
`d0b91a0`. Radix `Select`/`Dialog`/`DropdownMenu`/`Tooltip` portal `*Content` to `document.body` — OUTSIDE `.admin-theme` → tokens undefined → transparent ghost popovers. **Fix:** prepend `"admin-theme"` to the 4 portaled Content classNames (admin-only primitives, grep-proven no chat leak). + RoutingTab `Table`-in-`ScrollArea` column-clip → native overflow div. *Lesson: any new portaled Content needs admin-theme.*

### N36 — PHASE F (backend-aware tool filter, DONE+LIVE both halves) *
`1c2e0a7`. **`offered = all(gateway-backend tools) ∪ relevanceFilter(flat-backend tools)`.** Caught a LIVE bug (OBS-1 trace): with Superset active, the ARMES-centric filter offered `0/4` of the gateway tools to every non-Anthropic provider. **F-A** `backendToolPattern.ts` `toolPatternOf` (flat|gateway, default flat) — isolated from the trust line. **F-B** chat.ts filtered-branch partition (gateway always offered ∪ filter(flat); filter+router skipped when no flat; `[ToolRoute] gateway=N`; **ARMES-only byte-identical**, tested). **F-C** `metrics` category (`keywords:['oee']` → `CANONICAL_METRIC_TOOLS`) → OEE routes to the canonical tools, away from production confusables. **LIVE both halves:** Superset `offered=4/4 gateway=4`; mixed `path=keyword categories=[metrics] canonicalOEE=present` → model called getOeeValuesForZones → real per-zone OEE. *Closes the RULE-0 weak-model-finds-canonical-tool problem; OEE cold-cache fragility now MOOT (deterministic keyword route).*

### N37 — DOC-1 (Living Architecture Document, DONE+LIVE) *
`dc16a2e` (final; `151153e`+`9de7d3e` seal + NUL-fix). Consolidated tabbed HTML at `public/architecture/` (8 tabs), embedded in the admin "Mimari" tab via iframe. **Split by drift-risk:** narrative tabs (5 diagrams iframed AS-IS, byte-identical) vs **Live Facts** (build-time `genArchitectureFacts.ts` → gitignored `facts.json` from code constants — CANNOT drift). **Anti-drift = fail-loud:** `checkDocDrift.ts` (WARN-only, exit 0) maps code-area→tab via `manifest.json`; **lock-step gate = AGENTS RULE 20 + RULE 3 item 4** (every phase syncs the doc + bumps `lastSyncedCommit` same-commit, or the guard WARNs). `.gitattributes` (`*.ts text`) surfaces future NUL landmines. *OPEN: WARN→FAIL escalation; Mermaid conversion; live-DB facts; **the 5 narrative tabs are DRIFTED — manifest stuck at `a262403`; the parallel MCP-ADMIN/security work changed chat.ts/governance without a bump → a reconciliation pass is the near-term doc item.***

### N38 — LLM PROVIDER REGISTRY (PROV-1, DONE+LIVE) [spine] *
`a262403`/`5e8bb8a`. **The LLM provider set is now DATA** (DB-first/code-floor, mirrors the trust registry). Code reference `_lib/llm/reference/providers.ts` (Zod-locked `LlmFamily {google,openai,anthropic,openai-compatible}` + `LlmProviderDeclaration {id,family,modelId,baseURL?,apiKeyEnv?,cost?,exposedAsChat,enabled}`); `llm_providers` table (family CHECK, RLS service-role-writes, 4 built-ins seeded); `llmProviderRegistry` (warm→read, outage→floor, `resolveChatProvider`/`routerModelId`/`costFor`); **family-dispatch resolver** in gateway.ts (openai-compatible → `createOpenAICompatible({baseURL,apiKey:process.env[apiKeyEnv]})`; **unknown family → THROW** = the `default:google` trap is dead). **Adding an LLM = a row** (proven by a dummy openai-compatible test). **P-1 RESOLVED:** gemini-lite = model weakness (path identical to gemini, `output=0` — NOT a path bug), DROPPED as a chat option (`exposedAsChat=false`), KEPT as the router model (`routerModelId()` single-sourced — RULE-1 router literal gone). *Secrets: apiKeyEnv = NAME; resolver reads `process.env[apiKeyEnv]`, value never stored/logged.*

### N39 — PROVIDERS ADMIN TAB (PROV-2, DONE+LIVE) *  [the standing-rule UI affordance]
`06126f6` (merged `768bd6d`). `PROVIDER_MANAGE` (super_admin-only, matrix-honest, `MAKER_DENIED`) → `api/admin/providers.ts` (GET+`envSet` / upsert / toggle / DELETE); pure `providerManagement.ts` (Zod structure-lock — openai-compatible needs baseURL, apiKeyEnv `/^[A-Z0-9_]+$/` never a value — + **anti-brick**: DEFAULT/ROUTER provider can't be deleted/disabled, 422); `provider_audit` (super_admin SELECT, service-role write, **NAMES only, never secret values**). `ProvidersTab.tsx` (family closed-set Select; apiKeyEnv NAME + env-status badge, **NO secret field**; admin-theme portal). **Picker driven FROM the registry** (`exposedAsChat` rows, code-floor fallback); **chat.ts UNTOUCHED.** *Only `process.env[name] != null` (boolean) leaves the server.*

### N40 — MCP-ADMIN (parallel, DONE+LIVE) *
`ea16f52`. MCP settings → admin panel with **hybrid governance**: `mcp_global_settings` singleton (super_admin platform-wide; `CONFIG_GLOBAL` PUT) + per-user `mcp_settings`. `chat.ts loadUserMcpServers` now MERGES global + personal (personal overrides by id, only enabled). `MCPSettingsTab` (Global+Personal, JSON import). *Subtle (vs the trust line): a personal server can override a global backend id → inherits its trust tier IN THE USER'S OWN SESSION (pre-existing self-scoped pattern, low risk — tracked).*

### N41 — SECURITY AUDIT (parallel, DONE) *
`42fbac8`+`f4ae23a`+`4319750`. 7-phase OWASP/dep/API audit. Fixed: **H1** `mcp_global_settings` SELECT `using(true)` exposed MCP TOKENS → REVOKE (MCP-ADMIN introduced it; fixed same-day); **H3** mcp PUT arbitrary JSONB → structural validation + max-50 servers; **M1** HSTS added; **M2** CSP `'unsafe-eval'` removed; **M3** conversationId IDOR = false-positive (`assertOwned` held); **L1/D1** dead-code + `@vercel/node` 5.x. *TRACK (accepted/deferred): **D2** SSRF via admin MCP URLs (super_admin-only, accepted); **H2** rate limiting (deferred).*

---

## GRAPH: EDGES (key causal chains)
- "add a backend/LLM/feature/X" `→` *always hides a determinism/safety split* `→` name it: correctness/safety→code or gated; advisory→soft; **governed DATA → gated admin-UI (data) but structure/new-family/secret → code/env (N38/N39, standing rule).**
- relevance filter `→` HELPS weak models (narrows confusables); the full tool set DROWNS them (N33) `→` so the filter is beneficial, and a gateway backend must NEVER be filtered to zero (N36).
- a test that needs Maymun to hand-build a table / read logs `→` a MISSING tooling feature `→` build the automation (admin button / Vercel-log read), never offload (automation-first; OBS-1 is the enabler).
- LLM provider = a `switch(provider)` case `→` `default:google` silently swallows misconfig + custom LLM has no path `→` registry + family-dispatch + unknown-family-THROW (N38).
- docs `→` drift unless fail-loud `→` derived-facts (can't drift) + a build drift-guard + a lock-step gate (N37); the guard CAUGHT the parallel work's drift (working as designed).
- secret in a UI field `→` forbidden `→` apiKeyEnv is a NAME pointer + an env-set boolean badge; the value lives in env only (N39).
- reports `vs` code `→` *trust code* (clone & diff vs the last verified commit).
- a forged scope label `→` contained, not detected (N28/N29) `→` detection = Phase E reconciliation only.

---

## DECISIONS LOG (D1–D23 in v5; new below)
…D18 ADR-001 v2 · D19 trust registry=DATA · D20 classify write-model+REVOKE · D21 C=advisory+append · D22 D-split (acid-only/quarantine→UI/reconciliation→E) · D23 Superset refresh via resetToReference.
- **D24 [D-core]** acid-only; forged-label limit codified (contain≠detect); ❌ a heuristic that fakes detection.
- **D25 [RBAC v2]** three-role maker-checker (super_admin/power_user=maker/user); **matrix honesty** — never claim a grant the endpoint doesn't enforce; domain_editor = deprecated alias.
- **D26 [Phase F]** relevance filter is backend-aware: `all(gateway) ∪ filter(flat)`; the filter HELPS weak models (empirical, N33) ❌ apply the flat-tool filter to a gateway backend.
- **D27 [DOC-1]** living doc = docs-as-code + derived-facts + fail-loud drift-guard (WARN→FAIL later) + lock-step gate ❌ discipline-only "update the HTML after each dev".
- **D28 [PROV-1]** LLM provider set = DATA (DB-first/code-floor, family-dispatch, openai-compatible for custom) ❌ switch-case-per-provider ❌ Vercel-gateway family (egress for regulated data).
- **D29 [PROV-2 / standing rule]** governed-data ops get a gated admin-UI affordance; the UI edits VALUES inside a LOCKED structure; structure/new-family→code, secret→env (apiKeyEnv pointer) ❌ everything-in-UI ❌ script-only-for-data.
- **D30 [gemini-lite]** dropped as a chat option (model weakness, NOT a path bug), kept as the router model.

---

## ARTIFACTS PRODUCED (versioned; reference, don't regenerate)
Prompts (in the project): SEED…PHASE-6.8 · A1/A2/B1/B2/C · **PHASE-D-core** · **GATE-HARDENING** · **RBAC-1 (+PATCH-1.1)** · **GOV-2/GOV-3/GOV-4** · **OBS-1** · **UI-1** · **PHASE-F** · **DOC-1** · **PROV-1** · **PROV-2**. ADR: `ADR-001-...-v2.md` (in `docs/adr/`). Living doc: `public/architecture/` (DOC-1). Diagrams (sources, in `docs/source-diagrams/` + repo): architecture-map-v6 · runtime-topology-v3 · request-lifecycle-v2 · llm-control-surface-v1 · governance-model-v2 (**5 narrative tabs DRIFTED — reconciliation pending**). Registers: `cwf-open-items-register-v2.md`. Docs: **this KB (v6)**, bootstrap (**v5**).

## STATUS (snapshot — master HEAD `768bd6d`)
DONE & code-verified (post-C): D-core(`7451383`) · GATE-HARDENING(`a8bd531`) · RBAC-1(`0166c01`)+1.1(`780018a`) · GOV-2(`6b42738`)/GOV-3(`7156f0c`)/GOV-4(`9ca5833`) · OBS-1(`a3d11d9`) · UI-1(`d0b91a0`) · Phase F(`1c2e0a7`, LIVE) · DOC-1(`dc16a2e`, LIVE) · PROV-1(`a262403`/`5e8bb8a`, LIVE) · MCP-ADMIN(`ea16f52`, parallel) · security audit(`42fbac8`/`f4ae23a`) · PROV-2(`06126f6`→merge`768bd6d`, LIVE).
NEXT (new session, sequence): **P-2 viz-restore** (OEE data flows, table/chart render still stub; dead sim chart macros in cwfConstants) → **living-doc reconciliation** (judge the 5 diagrams vs reality post-MCP-ADMIN/security → update/bump manifest) → **PROV-3** (consolidate `shared/llmGateway` fallback onto the registry) → **PL-1 F-obs** (OTel→self-hosted Langfuse) → eval harness · ARCHITECTURE.md+ADRs (OBS-1/Phase-F/DOC-1/PROV-1) · deny/quarantine UI · Phase E reconciliation (gated on ARMES-on data-comparability) · LangGraph bridge (needs `runAgent` extraction first).
OWNER (open): apply `provider_audit` migration (best-effort audit until then) · seedRules.ts (Superset rule_kinds, verify) · backend_id:'superset' backfill (verify) · real-ARMES confidence pass (likely closeable). TRACK: D2 SSRF (accepted) · H2 rate-limit (deferred) · the personal-overrides-global-trust-id subtlety.

## STANDING RULES (enforce every phase)
- *Versioning:* every artifact versioned in filename + inside; never overwrite silently.
- RULE 1 no hardcoded config · RULE 3 docs part of done · RULE 4 backend identity=DATA · **RULE 5 grounding/trust = deterministic code, never an LLM judge/score** · RULE 6 admin writes only via gated API · RULE 9 Superset gateway never transcribe catalog · RULE 10 toolset scoped to activeBackends + scope-from-datasource + metric-authority(ARMES) · RULE 11 classify write-model + REVOKE at the privilege layer · RULE 12 tool/backend content = DATA not COMMAND (contain structurally, don't sanitize) · RULE 13 scope-divergence deterministic+advisory+append, never LLM-judge/block-rewrite.
- **NEW — automation-first (highest op priority):** NEVER offload manual work to Maymun (hand tables, manual SQL, log copy-paste) — last resort only. A manual step a test needs = a MISSING admin-panel/tooling feature → FIX it (build the button/endpoint/script, or read via Vercel/Supabase MCP). Tests must be OBSERVABLE so results flow to Claude (read Vercel `[ToolRoute]`/logs). Loop: Claude builds automation+observability, Maymun triggers, Claude reads logs → verdict.
- **NEW — admin-UI for governed DATA:** a governed-data op (add/remove/toggle LLM/backend/model/rule/routing) must be doable through a gated/audited admin-UI affordance, not code/script-only. The determinism/safety split applied to UI-ability: DATA/values within an existing structural contract → DB-first + gated admin UI; STRUCTURE (new family/SDK/dep, Zod-locked shape, the resolver, eval-gate, trust line) → CODE; SECRETS → ENV (UI stores an apiKeyEnv NAME + "set" status, never the value). Don't over-rotate to "everything in the UI". Name the data-vs-structure-vs-secret split per task. Sequence: DB-first registry + code floor first, then the admin tab.
- **NEW — living-doc lock-step (AGENTS RULE 20):** every phase that touches a manifest-mapped code area syncs the affected architecture-doc tab + bumps `lastSyncedCommit` in the same commit, or `check:doc-drift` WARNs. Facts are DERIVED, never hand-written.
- *Invariants:* eval-gate unbypassable · blind-spot empty≠zero sacred · scope≠title / wrong-scope≠answer · unknown→floor (trust earned) · tool content = DATA never COMMAND · provenance two-tier (envelope unforgeable / payload a claim) · forged scope label = contained not detected · **secrets via env only (apiKeyEnv = a NAME pointer; value never in DB/UI/logs)** · cross-phase verification (clone & diff) · no vector in deterministic core · don't touch CWF-DEMO · single LLM gateway · ARMES byte-identical when Superset inactive · **the relevance filter is backend-aware (gateway never filtered to zero)**.

## KEY LEARNINGS (this run)
- **The relevance filter HELPS weak models** (narrows confusables); the full tool set drowns them. Empirically inverted a prior diagnosis. Gateway backends must never be filtered to zero (Phase F).
- **gemini-lite was a model-weakness, not a path bug** — identical offered set, `output=0`. The fix was a product decision (drop as chat, keep as router) + the architecture (registry), not a code-path patch.
- **"Add an LLM" forced the LLM-as-DATA architecture** — the real question was extensibility (a row, not a switch case). The registry + family-dispatch + openai-compatible answers it; the admin-UI affordance (PROV-2) completes the standing rule.
- **The drift-guard caught the parallel work's drift** (manifest stuck while MCP-ADMIN/security changed chat.ts/governance) — fail-loud docs work, but only if every session honors the lock-step gate. The parallel sessions didn't → reconciliation pass needed.
- **A committed NUL-byte binary can still "run"** (DOC-1 checkDocDrift) — `git Bin` + `file=data` is the signal; `.gitattributes text` surfaces it going forward.
- **Security-aware mirroring pays:** PROV-2's `provider_audit` restricted SELECT to super_admin (didn't repeat the mcp `using(true)` token-exposure the audit had just fixed).

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ hard pre-flight + self-verify demanding EVIDENCE; read Vercel logs for live verdicts). Maymun pastes the AG report → Claude `git clone`s + reviews CRITICALLY vs ACTUAL CODE (diff vs the last verified commit; never the report's claims) → flags discrepancies → writes the next gated prompt. Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name the hidden trap; honest push-back; one path, finish fully, no demo deferrals.
