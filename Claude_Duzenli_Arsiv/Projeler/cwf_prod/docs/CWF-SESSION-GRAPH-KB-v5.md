# CWF/EAIP — Session Graph Knowledge Base  ·  v5
<!-- version: v5 · 2026-06-28 · supersedes v4 (through A1+A1.1 done, ADR-001 v2 accepted, A2 written). Updated through A2+B1+B2+C DONE & code-verified + the 3-provider acceptance test RUN + Superset gateway-rule live-refresh. Master HEAD = 8e9f65d. -->
### Claude's self-reference graph. Read to reconstruct context fast. Nodes = entities/decisions; edges = relations. Trust repo code > this doc.

Legend: `→` leads-to/causes · `⇄` bidirectional · `vs` comparison · `*` critical/invariant · `[A:B]` path · `{x,y}` set · `≈` approx · `❌` rejected

> **v5 delta (read first):** Since v4 (A1+A1.1 done, ADR-001 v2 accepted, A2 written) we shipped & code-verified the WHOLE rest of Phase A→C: **A2** injection boundary (`531cfc5`) · **B1** envelope provenance (`97406fe`) · **Superset gateway-rule LIVE-REFRESH** (`87665aa` — `resetToReference` republished the kind so the P6.8 guards stopped being overridden by the stale P6.5 seed; owner ran it, 13/13 + 4/4 + 10/10) · **B2** payload provenance (`56d8fc3`) · **C** deterministic scope/authority validator + append (`8e9f65d`). Master HEAD = **`8e9f65d`**. The **3-provider acceptance test was RUN** (verdict in N22) → C escalated to HIGH **empirically** (not speculatively). New durable rules: **RULE 12** (tool/backend content = DATA not COMMAND) · **RULE 13** (scope-divergence is deterministic + advisory + append, never an LLM judge / never a block-rewrite). New nodes: provenance (N27), scope/authority validator (N28). N26 → A2 DONE. **NEXT: D-core (lying-backend acid, prompt written) → E reconciliation; quarantine → governance-UI.** Diagrams architecture-map **v6** / runtime-topology **v2** now lag (predate B/C) — bump when next touched.

---

## GRAPH: NODES

### N1 — PROJECT [cwf]
CWF (Chat With Factory) = agentic AI over live MCP backends → reusable foundation for **EAIP** (Maymun's multi-layer enterprise agentic platform). Bar: bible-grade, no-spaghetti, SOTA, ~100% reuse. *Quality never sacrificed for speed. No "demo" deferrals — finish each thing fully, in the right order.*

### N2 — REPOS
- `[cwf_yaprak]` * = CANONICAL clean repo (github.com/maymun207/cwf_yaprak). All new architecture here. Seeded via curated keeper-copy from CWF-DEMO (NOT clone), fresh git. Master HEAD = **`8e9f65d`**.
- `[CWF-DEMO]` = OLD repo, virtual-factory origin, still has sim code. Demo safety-net + harvest source (capability only, never files). **FROZEN (owner archived it).**
- *Repo-reading method (Claude):* `git clone https://github.com/maymun207/cwf_yaprak.git` in the sandbox each phase → verify reports against ACTUAL code (diff vs the last verified commit; never trust a report's claims). Public repo, works reliably.

### N3 — BACKENDS (multi-backend agent)
Both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- **ARMES** = ceramic MES, ≈140 FLAT tools (Kale Seramik / KB7). `backend_id='armes'`, `tool_pattern='flat'`. **Trust tier = `system_of_record`** (authoritative for `oee`/`fire`/`throughput` — A1/N24).
- **Superset** = Apache Superset 6.1 BI, **GATEWAY** pattern. 4 tools (`get_instance_info`/`health_check`/`search_tools`/`call_tool`); ≈22 underlying discovered at runtime. Catalog `[docs/superset-tool-catalog.json]` = authoring ground-truth, NEVER pasted into prompt. `backend_id='superset'`, `tool_pattern='gateway'`. LIVE-ACTIVATED (P6.5); **gateway rules live-refreshed to the P6.8 code reference (N21).** **Trust tier = `reporting_mirror`** (advisory BI, authoritative for NOTHING — A1/N24). Scope = bound datasource, never the title.
- *Backend identity = DATA:* `public.backends` registry (P4.7), `backend_id` FK-constrained, resolved by `resolveActiveBackends` (enabled ∩ backend_id ∩ RBAC; legacy/untagged → `DEFAULT_BACKEND_ID='armes'`).

### N4 — ARCHITECTURE SPINE (EAIP seam map)
| seam | now (verified) | future EAIP |
|---|---|---|
| `[_lib/llm/gateway.ts]` | one `streamChat()` (Vercel AI SDK streamText, `stepCountIs(MAX_TOOL_ROUNDS)`); tool-loop lives in `chat.ts` (no separate `runAgent` — the single biggest structural debt; LangGraph needs it extracted first) | LiteLLM/vLLM |
| `[_lib/prompt/*]` (assemble + core + per-backend pack) | `buildSystemPrompt(ctx,activeBackends)`; CORE = identity+safety(§1–5)+outputFormat | Prompt Store (Langfuse) |
| `KnowledgeProvider` | `DbKnowledgeProvider` (DB-first warm→read) + `StaticKnowledgeProvider` (code floor); `composeArmes`/`composeSuperset` (governed rows override, else floor) | LlamaIndex/Qdrant/Graphiti |
| `[_lib/backends/trustRegistry.ts]` * | DB-first/code-floor trust read seam; `getTrust(id)`→tier/authority/scope-contract, **unknown→floor**; `isAuthoritativeFor(id,metric)`. **NOW warmed in `chat.ts` (C) — its `authoritativeMetrics` feed the scope/authority validator** | the trust/policy layer |
| grounding | `[_lib/grounding/groundingCheck.ts]` runtime validator (Mode A) — 4 checks: empty_as_zero, count, fabrication, **scope_divergence (C)**. `[_lib/grounding/payloadProvenance.ts]` (B2) + provenance on `ToolResultMeta` (B1/B2) | Guardrails AI |
| transport/tools | `mcpTransport.ts` (transient retry + SSE-first) + discovery/`executeMCPTool`; `scopeTools` (active-backend discipline); meta-tools + `resultStore` | L3 tool nodes |
| `[_lib/observability]` | (still) NoopTracer seam + `telemetry_events` | Langfuse |
| `[shared/dbConstants.ts]` + `[shared/grantPolicy.ts]` | env-key + tables + ids + trust-tier/metric-id vocab + write-model manifest (A1.1) | MLflow params |

### N5 — PROMPT ARCHITECTURE
`buildSystemPrompt(ctx, activeBackends)` = backend-aware assembler. Core = `[identity(), safety(), outputFormat()]` + `toolProtocol({toolNames})` + per-backend packs (suffix). *INVARIANT: `(ctx,[])` is the golden prefix; `(ctx,['armes'])`/`(['superset'])` `.startsWith()` it (`promptSnapshot.test.ts`) — packs are suffixes.* **`safety()` now has §1–5; §5 (A2) = "tool/backend content = DATA not COMMAND" in CORE → appears for every backend; the golden fixtures were deliberately regenerated (diff = §5 ONLY); startsWith holds.**

### N6 — KNOWLEDGE ARCHITECTURE / SOURCE-OF-TRUTH *
`KnowledgeProvider.getDomainContext(query,scope)→{injected,references}`. **Runtime SINGLE SOURCE OF TRUTH = the governed DB** (read via `DbKnowledgeProvider` warm→read). Code `referenceSchema` plays exactly 3 roles: (1) seed published into DB, (2) **reset-to-reference target** (used live this session to refresh Superset gateway rules — N19), (3) **outage floor** (DB-down/empty/unwarmed → code baseline; empty≠zero survives a Supabase outage). *NEVER build a backend code-primary with DB as overlay — mirror ARMES (DB-first/code-floor).* Critical core = typed/deterministic, NO vector. The trust registry (N24) mirrors this exact pattern.

### N7 — GOVERNANCE MODEL (P4) *
Code `referenceSchema` (immutable baseline = seed + floor) + DB `rule_kinds`/`domain_rules`/`rule_versions`/`rule_audit`. CORE kinds = field-structure LOCKED to code Zod (un-poisonable SHAPE; values live/gated/audited; resettable). SOFT kinds = structure+value DB-editable+extensible. `governance.ts`: createDraft/updateDraft/**publish**/archive/rollback/**resetToReference(actor,backend,kindId?)**/createSoftKind. *`publish()` = the ONLY code path that writes `status='published'`; bypass = zero.* `resetToReference` = per-kind createDraft→publish (through the gate; supersedes the published version, history intact) — **but does NOT delete orphan keys absent from the reference** (no orphan risk when the reference only grew). `scripts/seedRules.ts` is insert-if-absent (won't UPDATE a changed key) → use `resetToReference` for a true refresh.

### N8 — EVAL-GATE (the linchpin) *
`[_lib/knowledge/gate/evalGate.ts]` `runGate` on the CANDIDATE. Stages (order authoritative, short-circuit): schema (CORE Zod `.strict()` / SOFT field-spec) → referential → behavioral. *Backend-aware ADDITIVE dispatch on `kind.backendId` (P6): ARMES byte-identical; Superset adds `stageReferentialSuperset`/`stageBehavioralSuperset`.* `SUPERSET_REQUIRED_MARKERS` incl. P6.8 scope-match-or-decline + metric-authority-armes. *UNBYPASSABLE: RLS WITH CHECK status='draft' → client published write denied (42501).* Poison REJECTED at behavioral.

### N9 — RBAC
`super_admin` / `domain_editor` (per-backend scope) / `user`. Server-enforced (`adminGuard`); client role/scope = UI hint. `user_roles`, `user_backend_scopes`. `ksadmin`=super_admin. SECURITY DEFINER helpers (no RLS recursion).

### N10 — DOMAIN FACTS (ARMES, *sacred*)
- `getFactoryLines` = entry → resolve zone UUID → OEE/scrap. Zones KB7 {Glazur3, FIRINALT, IKINCILALT, IKINCILUST}. *IKINCILUST barcodeless.* `FACTORY_ID='KB7'` (single const in `zones.ts`, added in C).
- *Blind-spot: barcodeless → getDailyManualScrap empty → empty ≠ zero. NEVER "sıfır/zero"; say "ARMES'te görünmüyor/barkodsuz".*
- K4 = definitive throughput counter. getDailyOeeValues = epoch-ms @ midnight TRT (UTC+3). Scrap shift hyphenated {24-08, 08-16, 16-24}. *OEE/fire/throughput are ARMES-AUTHORITATIVE (N21/N24).*

### N11 — INFRA (preserved/proven, don't regress)
`toolResult.ts` 3-tier formatter + `resultStore.ts` large-result layer (handle + aggregate/query meta-tools) + `timeTools.ts` resolve_time_range + `toolCategories.ts` relevance filter + Anthropic prompt caching + raw passthrough + SSE heartbeat + graceful mid-stream error. MCP SDK pinned EXACT 1.29.0. *(Acceptance test re-proved the large-result guard: a ~1.85M-token chart result was rejected with a limit hint and the model recovered.)*

### N12 — TELEMETRY/OBS
`telemetry_events` (type{message,llm_call,tool_call,error}, model, tokens, tool_name, latency, cost, payload-redacted). `tool_call` now carries `backendId` (B1). `grounding_violation` rides under `type='error'` (kind/severity only — **evidence NEVER logged**). = Langfuse seam's first consumer.

### N13 — BACKEND REGISTRY (P4.7 + A1) *
`public.backends` (id PK, display_name, `tool_pattern` flat|gateway, enabled, **`trust_tier` CHECK default 'unverified'=floor, `scope_identity` jsonb** — A1). `backend_id` FK on {domain_rules, rule_kinds, rule_versions, user_backend_scopes}; enum CHECK GONE. `BackendId`=string. *Adding a backend = a row.* `backend_authority` (backend_id,metric) PK table (A1). RLS SELECT-all, writes service-role only **+ explicit REVOKE anon/authenticated (A1/A1.1, verified live 14/14)**.

### N14 — RUNTIME GROUNDING (validator) *
`grounding/groundingCheck.ts` `runGroundingCheck(input)` PURE/deterministic, Mode A (post-stream, never blocks the stream; attaches `grounding` to `done` + telemetry). **4 checks:** empty_as_zero (critical, phrases DERIVED from `BLIND_SPOTS`), count_understatement, fabrication_risk, **scope_divergence (C/N28)**. Consumes `ToolResultMeta[]` which now carries **provenance** (B1 envelope + B2 payload). *The A→B→C dependency is now CLOSED: A1 gave the role-ceiling, B1/B2 gave origin+scope, C combined them.*

### N15 — GOVERNANCE PANEL (P5)
Isolated `/admin`. Governed WRITES only via gated `/api/admin/*`; browser reads RLS-SELECT only. CORE locked in UI; SOFT editable. GateVerdict shows poison rejected at behavioral. Telemetry tab shows `grounding_violation`. **UI GAP (flagged):** no reset-to-reference button (the `resetToReference` endpoint/method exists, script-only) — a gated per-kind "Reset to reference" control + a future "deny/quarantine backend" control are open panel-backlog items.

### N16 — UI SHELL (P5.5) + N17 FRONTEND MAP
Claude-web pattern: sidebar closed-by-default; one layout; chat-first. Stores: `authStore`/`uiStore`/`cwfStore` (chat+multi-conversation P5.6)/`mcpStore`/`adminStore`. *Browser direct writes (audited A1.1): ONLY `mcp_settings` upsert + `conversations` rename/soft-delete (owner-CRUD). Everything else = RLS-SELECT read.*

### N18 — CONVERSATION PERSISTENCE (P5.6)
`conversations` (owner-CRUD RLS) + `messages` (SELECT-own + server-write-only). *Server = SINGLE message-writer* (`assertOwned` re-derives ownership; service-role bypasses RLS). *IDs CLIENT-minted (`crypto.randomUUID`)* — `assertOwned` mandatory regardless → client-mint = zero security cost + free optimistic UI. Soft delete. **C appends a deterministic scope notice to the persisted `content` + the `done` text when scope_divergence fires.**

### N19 — SUPERSET GATEWAY DOMAIN (P6/P6.5 + live-refresh)
Taught, NOT transcribed. Pack `[_lib/knowledge/backends/superset/]`. Composer `composeSuperset.ts`: governed rows for a kind **OVERRIDE** the code floor (else floor). *This caused a real trap:* the P6.5-seeded `superset.gateway_rule` rows predated P6.8, so they were overriding the floor and **hiding the P6.8 guards at runtime**. Fixed via `resetToReference('superset','superset.gateway_rule')` (`87665aa`) → 13 rules republished through the gate; owner verified live (13/13 + guard-markers present + `verifySupersetRules` 10/10). *DB == code reference for that kind now.*

### N20 — ACTIVE-BACKEND TOOL DISCIPLINE + TRANSPORT (P6.6/P6.7)
`scopeTools.ts` scopes the model-facing toolset to activeBackends before the Anthropic/relevance split (ARMES-only = no-op). `mcpTransport.ts` retries connect+call ONLY on transient errors (live `SSE 405`); validation errors return as RESULT (model self-corrects). SSE-first for Superset. `MCP_TOOL_MAX_ATTEMPTS` env-tunable.

### N21 — CROSS-BACKEND SCOPE/AUTHORITY GUARD (P6.8, LIVE) *
4 guard `GATEWAY_RULES` (eval-gate-enforced): **scope-from-datasource** · **scope-match-or-decline** · **attribute-source** · **metric-authority-armes**. **Now genuinely LIVE** (re-refreshed via N19; was being overridden by the stale seed). The PROMPT-layer guard; its deterministic answer-time counterpart is **C (N28)**.

### N22 — DATA REALITY (KB7 / Granit, *locked*) + ACCEPTANCE VERDICT *
Live-verified: **KB7 OEE does NOT exist as KB7-scoped data in Superset.** Dashboard `KB7 - Yönetici Raporu` (id 5) is a SHELL — all charts bound to `Granit -` datasources.
- **3-PROVIDER ACCEPTANCE TEST RUN (ARMES off, "KB7 OEE this week", guards live):** verdict **SPLIT** — NO provider fabricated (no silent Granit-as-KB7). But: P1 = boilerplate deflection (safe, no engagement); P2 = 7× redundant `resolve_time_range` then a *correct* "KB7 OEE not available" (right answer, degenerate process); **P3 = full investigation + Granit table in the answer body under a heavy disclaimer** (NOT fabrication, but wrong-scope *oversharing* — violates scope-match-or-decline's intent). *Inverse relationship: more capability → more wrong-scope data surfaced.* **⇒ the prompt layer is model-dependent; C was escalated to HIGH empirically** (not speculation). The signal C needs (`datasource_name`/"Granit" in results) is present & extractable → B2 justified.

### N23 — BACKEND TRUST & PROVENANCE (ADR-001 v2, ACCEPTED) *
Artifact `ADR-001-backend-trust-and-provenance-v2.md`. *Decision:* **trust earned by declaration+verification, ceiling-capped by role, unknown→floor; trust = a DETERMINISTIC FUNCTION, never an LLM score; containment over detection.** *v2 amendments:* honest limit covers SCOPE (A1); provenance TWO TIERS envelope/payload (A2/B); injection boundary structural NOT a sanitizer (A3); provenance-free acid scaffold + deterministic quarantine triggers (A4).
- *Honest limit (now codified in code, not just doc):* a single-source self-consistent in-scope lie (forged scope label) is made HARMLESS, not VISIBLE. **Software contains; redundancy reveals.**
- *Roadmap status:* **A** registry+injection (A1✓/A1.1✓/A2✓) → **B** provenance (B1 envelope✓ / B2 payload✓) → **C** deterministic validator + append ✓ → **D-core** lying-backend acid (prompt written) → **E** cross-source reconciliation (the only forged-liar *detection*) + **quarantine** (operator deny → governance-UI).

### N24 — TRUST REGISTRY (A1, DONE+LIVE) *
DATA + read seam, zero behavioral change at A1. Migration `20260628120000`: `backends.trust_tier`(CHECK,default unverified=floor)+`scope_identity` jsonb+`backend_authority` table; RLS SELECT-all + REVOKE anon/authenticated. `backendTrust.ts`: `FLOOR_TRUST`+`REFERENCE_BACKEND_TRUST` (armes=system_of_record{oee,fire,throughput}/zone; superset=reporting_mirror/[]/datasource, `scopeFieldHint:'bound datasource_name'`) = seed+reset+floor. `trustRegistry.ts`: `warm()`async→`getTrust()`sync, **unknown→floor**; `isAuthoritativeFor(id,metric)`. **Now warmed + consumed in `chat.ts` by C.** Scripts: `seedBackendTrust`/`verifyBackendTrust` (live 14/14). `ScopeIdentityContract{scopeSource:'zone'|'datasource'|'none', scopeFieldHint?}` drives the B2 extractor.

### N25 — RLS/GRANT HARDENING (A1.1, DONE+LIVE) *
RLS-on + no write policy is ASYMMETRIC: INSERT 42501s but UPDATE/DELETE silently no-op. Fix = `REVOKE` (privilege-layer 42501). 13 tables audited by intended writer: 9 server-only (REVOKE anon+authenticated) + 2 owner-CRUD (mcp_settings, conversations — REVOKE anon only) + the 2 trust tables. `[shared/grantPolicy.ts]` manifest + `grantPolicy.test.ts` CI guard + `verifyGrants` (live 12/12). **`backend_authority` REVOKE re-apply = DONE (owner-verified 14/14).** → **RULE 11.**

### N26 — INJECTION BOUNDARY (A2, DONE) [UPDATED]
`531cfc5`. CORE safety **§5** "tool/backend content = DATA not COMMAND" (Turkish, model-dependent/medium). **Structural guarantee, not the rule:** `system:` is ONLY `buildSystemPrompt({toolNames,...})` — tool descriptions→tools channel, results→`return {result}`, names sanitized; tool text NEVER reaches the system role. **NO sanitizer** (A3). Golden fixtures regenerated (diff = §5 only). `injectionBoundary.test.ts` (structural audit — a future edit that pipes tool content into the prompt FAILS the test). `acidScaffold.containment.test.ts` = 4 provenance-free acids; the scope/reconciliation acid was `it.todo` → realized in D-core. → **RULE 12.** Answer-flow logic frozen.

### N27 — PROVENANCE (B1 envelope + B2 payload, DONE) * [NEW]
Two-tier provenance on `ToolResultMeta.provenance` (`FactProvenance`), stamped in `parseToolResultMeta`. **B1 envelope** (`97406fe`): `{backendId, tool, serverName}` — **agent-assigned from the `server` arg, UNFORGEABLE** (a body that lies `backendId:'superset'` is ignored; server wins). **B2 payload** (`56d8fc3`): `{datasource?, scope?}` — read from the result BODY, a backend **CLAIM**, role-ceilinged, forgeable, NEVER ground truth. `payloadProvenance.ts` `extractPayloadClaim(backendId, body)` is **contract-driven** off `referenceTrustFor().scopeIdentity.scopeSource` (code reference): `'datasource'`→`datasource_name`/`slice_name`/`chart_name`/…; `'zone'`→minimal; `'none'`→`{}`. Pure/total/honest-`{}`. *Anti-forgery survives the merge (`{...envelope,...payload}` — disjoint keys).* Both phases **behaviorally inert** (verdict unchanged); C consumes them.

### N28 — SCOPE/AUTHORITY VALIDATOR (C, DONE) — first behavioral layer * [NEW]
`8e9f65d`. The 4th grounding check + a deterministic APPEND. **Trigger (conservative, all must hold):** requested scope S (from query, bounded vocab `[FACTORY_ID,...ZONES]`) + requested metric M (`METRIC_IDS`+glossary aliases) + a tool result with B2 payload scope T + producing backend B **not** authoritative for M (warmed registry `backendAuthority`) + **S ⊄ T** → `scope_divergence` (warning). Miss any → no flag (ARMES-authoritative / scope-match / non-metric / no-scope all pass). **Append (owner-chose #2):** on a flag, `chat.ts` appends a deterministic system notice AFTER the streamed text (`finalText=fullText+notice`, reusing the empty-response `fullText+note` shape) — additive, **never a rewrite**, Mode A intact (no buffer-before-paint). **RULE 5 clean** (vocab+provenance+registry; no model/score). **Honest billing (in the code comment):** STRONG vs an honest backend; **containment-not-detection vs a forged datasource_name** (S⊆T defeated) → that's D/E. → **RULE 13.** *Minor polish:* C's `norm()` is lowercase-only vs the existing `normalize()` (Turkish folding) — fine for ASCII tokens, fold later.

---

## GRAPH: EDGES (key causal chains)
- "add a backend/feature/X" `→` *always hides a determinism/safety split* `→` name it (correctness/safety→code or gated; advisory→soft). A new MCP defaults to the FLOOR — trust is earned (N23/N24).
- title/label `vs` datasource `→` scope = the datasource (N21/N22) `→` BUT datasource is self-reported `→` an HONEST mislabel is DETECTED by C; a FORGED label is only CONTAINED (N28 limit → E reconciliation).
- guards live `→` BUT prompt layer is model-dependent (N22 acceptance: P3 still over-shared) `→` the deterministic answer-time validator (C) is necessary, not optional. *Empirically proven, not assumed.*
- envelope (server, unforgeable) `vs` payload (body, claim) `→` never trust payload as ground truth; ceiling it (N27/N28).
- eval-gate (publish-time) `vs` grounding/scope validator (answer-time) `vs` trust-function (provenance-time) = SEPARATE deterministic axes.
- composeSuperset: governed rows OVERRIDE the floor `→` a stale seed silently HIDES newer code-floor rules (N19 trap) `→` `resetToReference` for a true refresh, not insert-if-absent seed.
- RLS-on + no-write-policy `→` INSERT 42501 `vs` UPDATE/DELETE silent no-op `→` REVOKE at the privilege layer (N25 / RULE 11).
- reports `vs` code `→` *trust code* (clone & diff vs the last verified commit — caught the gateway-override trap + the RLS asymmetry + the original Granit footgun).

---

## DECISIONS LOG (decision → rationale; ❌rejected)
D1 curated keeper-copy ❌clone · D2 keep+repoint Supabase · D3 one gateway ❌dup · D4 deterministic typed KB ❌vector-core · D5 gated-DB rules · D6 eval-gate deterministic ❌LLM-gate · D7 SDK exact-pin · D8 engine-then-panel · D9 server-side MCP resolution · D10 backend identity=DATA ❌enum · D11 grounding deterministic+advisory ❌LLM-judge · D12 UI split · D13 LangGraph Shape-B last · D14 client-mint conv ids+assertOwned · D15 DB-first/code-floor SoT ❌code-primary · D16 eval-gate additive per-backend dispatch · D17 cross-backend scope/authority guard ❌"make the query succeed" · D18 ADR-001 v2 (trust=deterministic fn, unknown=floor, contain>detect).
- **D19 [A1]** trust registry = `trust_tier` CHECK on `backends` + `scope_identity` jsonb + `backend_authority` table; unknown→floor; DB-first/code-floor ❌enum ❌code-primary.
- **D20 [A1.1]** classify each table's write-model + `REVOKE` ❌blanket revoke (breaks owner-CRUD). Manifest + CI guard + live verify.
- **D21 [C]** the scope/authority validator = advisory detection **+ deterministic append** (#2) ❌ telemetry-only (leaves a known wrong-scope harm user-facing) ❌ block/rewrite the model stream (Mode A forbids). The append is additive/post-stream/model-independent.
- **D22 [D split]** D-core = the lying-backend ACID test only (containment is already complete via A1/A1.1/A2/B/C — the acid proves it); **quarantine deferred** to governance-UI (operator deny, not containment); **reconciliation = Phase E** (the only forged-liar detection; needs ARMES-on + a data-comparability proof first) ❌ bundle all three into one phase ❌ a heuristic to "catch" the forge (over-fires, breaks RULE 5).
- **D23 [Superset refresh]** refresh governed gateway rules via `resetToReference` (gated, supersedes, history intact) ❌ re-run `seedRules.ts` (insert-if-absent won't update the changed key) ❌ raw SQL (bypasses the gate).

---

## ARTIFACTS PRODUCED (versioned; reference, don't regenerate)
Prompts: `claude-code-{SEED…PHASE-6.8, PHASE-A1-trust-registry-v1, PHASE-A2-injection-boundary-v1, PHASE-6_9-superset-gateway-live-reseed-v1, PHASE-B1-envelope-provenance-v1, PHASE-B2-payload-provenance-v1, PHASE-C-scope-authority-validator-v1, PHASE-D-core-lying-backend-acid-v1, VIZ-RESTORE}.md`. *(A1.1 was emergent — no standalone prompt.)*
ADR: `ADR-001-backend-trust-and-provenance-v2.md` (ACCEPTED; place in `docs/adr/`).
Diagrams: `cwf-architecture-map-v6.html` + `cwf-runtime-topology-v2.html` (**now lag B/C — bump when next touched**).
Docs: build-plan, project-instructions, **this KB (v5)**, bootstrap (**v4**).

## STATUS (snapshot — live = `docs/ROADMAP.md`)
DONE & code-verified: SEED · Foundation-P1 · P1 · P2 · P3 · P4 · P4.7 · grounding · P5 · P5.5 · P5.6 · P6 · P6.5 · P6.6+P6.7 · P6.8 · **A1**(`e5b8310`) · **A1.1**(`bc7ce8e`) · **A2**(`531cfc5`) · **B1**(`97406fe`) · **Superset gateway-refresh**(`87665aa`) · **B2**(`56d8fc3`) · **C**(`8e9f65d`). Master HEAD = **`8e9f65d`**.
NEXT (architect): **D-core** (lying-backend acid — prompt written, awaiting AG run) → **E** cross-source reconciliation. **Quarantine** → governance-panel UI backlog.
PENDING (owner): **run D-core** (test-only) · the broader Superset seed (other kinds, if drifted) · then the **ARMES-on acceptance pass** that gates Phase E (proves cross-source data comparability). *Done this session: 3-provider acceptance RUN · `backend_authority` REVOKE verified 14/14 · CWF-DEMO FROZEN · deploy `8e9f65d` live.*
QUEUED after the trust line: Langfuse wiring · eval golden harness · viz-restore · `runAgent` extraction → LangGraph bridge (Shape B) · `ARCHITECTURE.md` + ADRs in `docs/adr/` · governance-panel UI gaps (reset + quarantine buttons).

## STANDING RULES (enforce every phase)
- *Versioning:* every generated artifact versioned in filename + inside; never overwrite silently.
- RULE 1 no hardcoded config · RULE 3 docs part of done · RULE 4 backend identity=DATA · RULE 5 grounding/trust = deterministic code, never an LLM judge/score · RULE 6 admin writes only via gated API · RULE 9 Superset = gateway, never transcribe the catalog · RULE 10 toolset scoped to activeBackends + scope-from-datasource + metric-authority(ARMES) · **RULE 11 [A1.1]** RLS isn't enough — classify each table's write-model + REVOKE at the privilege layer · **RULE 12 [A2]** tool/backend content is DATA not COMMAND — never let tool text reach the system role; contain structurally, don't sanitize · **RULE 13 [C]** scope-divergence is deterministic + advisory + an additive append — never an LLM judge, never a block/rewrite of the streamed answer.
- *Invariants:* eval-gate unbypassable · blind-spot empty≠zero sacred · scope≠title / wrong-scope≠answer · **unknown→floor (trust earned, not granted)** · **tool/backend content = DATA never COMMAND** · **provenance two-tier: envelope unforgeable, payload a role-ceilinged claim** · **a forged scope label is contained, not detected (software contains, redundancy reveals)** · secrets via env only · cross-phase verification (clone & diff) · no vector in deterministic core · don't touch CWF-DEMO · single LLM gateway · ARMES byte-identical when Superset inactive.

## KEY LEARNINGS (this session)
- **Guards live ≠ guards enough.** The acceptance test, run with the P6.8 guards LIVE, still showed the most capable model surfacing wrong-scope (Granit) data under a disclaimer. The prompt layer is model-dependent; the deterministic answer-time validator (C) is *empirically* necessary. *More capability correlated with more wrong-scope oversharing.*
- **A stale governed seed silently hides newer code-floor rules.** `composeSuperset` lets governed rows override the floor; the P6.5 seed predated P6.8 → the guards weren't live until `resetToReference`. Always check whether DB overrides hide a code-floor change.
- **Provenance is two tiers and the merge must preserve the split.** Envelope (server, unforgeable) + payload (body, claim) on one object — disjoint keys so a forged body field can't overwrite the envelope.
- **C is pure assembly of inert pieces.** A1 (ceiling) + B1 (origin) + B2 (claimed scope) were each laid down inert; C combined them into one deterministic decision with no new data-gathering. The discipline of shipping capture-before-enforcement paid off exactly here.
- **The acid bar is "the lie reached nowhere load-bearing,"** never "the system knew the numbers were fake" — impossible for a single-source in-scope (forged-label) lie. Codify the limit; never add a heuristic that fakes detection.

## WORKING LOOP
Maymun runs Claude Code 4.8 on AntiGravity (implements) ⇄ Claude = architect (diagnose, decide, write gated phase prompts w/ hard pre-flight + self-verify demanding evidence). Maymun pastes the AG report → Claude `git clone`s and reviews CRITICALLY vs ACTUAL CODE (diff vs the last verified commit; never the report's claims) → flags discrepancies → writes the next gated prompt. Style: TR strategy / EN technical+prompts; diagnosis-first; committed recs not menus; tight prose; name the hidden trap; honest push-back; one path, finish fully, no demo deferrals.
