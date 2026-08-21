# Claude Code — PHASE-PROV-1: LLM Provider Registry (DB-first / code-floor)
**rev 1 · 2026-06-30 · target HEAD `dc16a2e` · canonical repo `cwf_yaprak`**

## Why this phase exists
Adding an LLM today is NOT "a row" — it needs a `case` in `gateway.ts resolveModel` (CODE), and a custom/self-hosted (OpenAI-compatible) LLM has **no path at all**. Worse, `resolveModel`'s `default: google(...)` is a **fail-silent trap**: add a provider to `LLM_MODELS` but forget the switch and it silently runs through the Google SDK. This phase makes the LLM provider set **DATA** — a DB-first/code-floor registry (mirroring the `backends` registry) with a **family-dispatch** resolver, so adding gemini-lite OR a custom OpenAI-compatible LLM becomes a registry ENTRY, not code surgery. (The admin-panel UI to edit those rows is the NEXT phase, PROV-2; this phase builds the data layer + code floor so the rows are script-editable now and UI-editable after PROV-2.)

**Settled with the architect:**
- **DB-first / code-floor** (memory rule — never code-primary): runtime reads the governed DB; the code reference is seed + reset-target + outage floor. Mirror the `backends`/`trustRegistry` stack exactly.
- **Custom family = `openai-compatible`** (`@ai-sdk/openai-compatible`, direct to the endpoint → prompt/response stay in your infra). The Vercel AI Gateway family is explicitly NOT added (data-egress for regulated factory data).
- **Secrets via env only:** a provider row stores an `apiKeyEnv` **NAME**; the resolver reads `process.env[apiKeyEnv]`. NEVER store/log/print the key VALUE.
- **gemini-lite:** dropped as a CHAT option (`exposedAsChat=false`), but KEPT in the registry as the **router model** (the router needs a cheap classifier). This also single-sources the router model (fixes the RULE-1 hardcoded `'gemini-2.5-flash-lite'` literal at `toolCategories.ts:419`).
- **Behavior byte-identical** for the 3 kept chat providers (gemini default, openai, anthropic) — same models, same `streamText` params, same path.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `dc16a2e`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record the count (~402).
3. Read (the pattern to MIRROR + the surfaces to migrate):
   - `api/cwf/_lib/knowledge/reference/backendTrust.ts` (code reference shape), `api/cwf/_lib/backends/trustRegistry.ts` (warm→read, **outage→code-floor**, unknown→floor), `scripts/seedBackendTrust.ts` (service-role idempotent seed), the `backends` table migration (`supabase/migrations/*backends*` or grep `create table .* backends`) — table + RLS service-role-only-writes.
   - `api/cwf/_lib/llm/config.ts` (`LLM_MODELS`, `LLM_COST_PER_1M`, `DEFAULT_PROVIDER`, `isLlmProvider`, `LlmProvider`, `MAX_TOOL_ROUNDS`, `GEN_*`, `estimateCost`), `api/cwf/_lib/llm/gateway.ts` (`resolveModel` switch + `streamChat`), `api/cwf/chat.ts` (L374 `forceProvider` parse, L508 resolution, L509 `modelName`, the `estimateCost` + router call sites), `api/cwf/_lib/toolCategories.ts` (L419 router model literal), `src/components/ui/ChatShell.tsx` (L97 `providerToModelMap`, the `PROVIDER_SHORTCUTS` / picker maps), `shared/dbConstants.ts` (`DB_TABLES`).

## HARD CONSTRAINTS
- **DB-first / code-floor — NEVER code-primary** (standing memory rule). Runtime reads the DB; the code reference is seed + outage floor. The registry's `warm()` reads the DB; an unwarmed/failed read serves the **code reference** so the 4 built-ins are always resolvable (the agent is never provider-blind). Mirror `trustRegistry` exactly.
- **Byte-identical behavior for gemini (default) / openai / anthropic.** The family-dispatch resolver MUST produce the SAME AI SDK model handle as today's switch for these three; `streamText` params unchanged. Prove with a resolution-equality test.
- **Secrets via ENV only.** Reference/DB store `apiKeyEnv` (a NAME). The resolver reads `process.env[apiKeyEnv]`. NEVER read/write/log/print a key value. No `.env` access.
- **Structure-locked (CORE-class).** `family` ∈ a closed set (`google|openai|anthropic|openai-compatible`) + the field SHAPE are Zod-locked in the code reference (un-poisonable shape); VALUES are DB-editable. Unknown family → **explicit throw** (kill the `default:google` trap; fail-loud).
- **RULE 1 — no model-id literals in logic.** Every model id flows from the reference/registry. The router model literal at `toolCategories.ts:419` is replaced by the registry's router-provider modelId.
- **OUT OF SCOPE — do NOT touch:** `shared/llmGateway/*` (the separate non-streaming fallback — a later consolidation), the eval-gate, the trust line, governance, the router's transport (keep it the GoogleGenAI native call; only single-source its model STRING). The admin UI (PROV-2).
- **The router stays a separate call.** Do not rewire the router through the gateway; only source its model id from the registry.
- Migration is **owner-applied** (Supabase MCP) and the seed is **owner-run** (service role), exactly like backends/rules. Until then the **code floor serves** (the 4 built-ins) — PROV-1 is fully functional on the floor; the DB read activates on seed. State this; do not block on it.

---

## PROV-1A — Code reference (the floor / seed / structure-lock)
New `api/cwf/_lib/llm/reference/providers.ts`:
- `LlmFamily = 'google' | 'openai' | 'anthropic' | 'openai-compatible'` (closed set).
- Zod `LlmProviderDeclaration`: `{ id, family, modelId, baseURL?: string, apiKeyEnv?: string, cost?: { input: number; output: number }, exposedAsChat: boolean, enabled: boolean }`.
- `REFERENCE_LLM_PROVIDERS` — the 4 built-ins migrated from `config.ts` (same model ids + costs):
  - `gemini` → family `google`, `gemini-2.5-flash`, exposedAsChat **true** (default).
  - `openai` → family `openai`, `gpt-4.1-mini`, exposedAsChat **true**.
  - `anthropic` → family `anthropic`, `claude-sonnet-4-6`, exposedAsChat **true**.
  - `gemini-lite` → family `google`, `gemini-2.5-flash-lite`, exposedAsChat **false** (dropped as chat; kept for the router).
- `DEFAULT_PROVIDER_ID = 'gemini'`; `ROUTER_PROVIDER_ID = 'gemini-lite'` (the router resolves its model from this entry — single source).
- Re-home cost: the per-entry `cost` replaces `LLM_COST_PER_1M`; `estimateCost` reads it from the registry/reference. Keep the generation tunables (`MAX_TOOL_ROUNDS`, `GEN_TEMPERATURE`, `GEN_MAX_OUTPUT_TOKENS`) in `config.ts` (provider-agnostic). `config.ts` `LLM_MODELS`/`LlmProvider` either removed or re-derived from the reference (single source — no second list).

## PROV-1B — DB table + repository + seed (the data layer)
- Migration `supabase/migrations/2026063xxxxxxx_llm_providers.sql` (next number; **owner-applies via Supabase MCP**): `create table public.llm_providers ( id text primary key, family text not null check (family in ('google','openai','anthropic','openai-compatible')), model_id text not null, base_url text, api_key_env text, cost_input numeric, cost_output numeric, exposed_as_chat boolean not null default true, enabled boolean not null default true, created_at timestamptz not null default now() )`. RLS: **public SELECT, writes service-role only** (mirror `backends` — no client write policy; REVOKE anon+authenticated writes). Seed the 4 built-ins in-migration (like backends) so the table is never empty.
- `shared/dbConstants.ts`: `DB_TABLES.LLM_PROVIDERS = 'llm_providers'`.
- Repository: a `getLlmProviders()` reader (extend `RuleStoreRepository` or a sibling `LlmProviderRepository`), `configured` flag like the trust source.
- `scripts/seedLlmProviders.ts` — service-role, idempotent, upserts from `REFERENCE_LLM_PROVIDERS` (mirror `seedBackendTrust.ts`; never prints secrets; `api_key_env` stored as the NAME only).

## PROV-1C — Registry (warm→read, DB-first/code-floor) + family-dispatch resolver
- `api/cwf/_lib/llm/llmProviderRegistry.ts` (mirror `trustRegistry`):
  - `warm()` reads `llm_providers` into a cache; failure/unconfigured → outage (serve the code reference).
  - `resolveChatProvider(id?): LlmProviderDeclaration` — DB-first, code-floor; honors `exposedAsChat` (a non-exposed or unknown id falls back to `DEFAULT_PROVIDER_ID`); only `enabled` rows.
  - `routerModelId(): string` — the `ROUTER_PROVIDER_ID` entry's modelId (code-floor safe / synchronous fallback to the reference).
  - `costFor(modelId)` for `estimateCost`.
- `gateway.ts`: replace the `resolveModel` switch with **family dispatch** on the resolved record:
  - `google` → `google(rec.modelId)`; `openai` → `openai(rec.modelId)`; `anthropic` → `anthropic(rec.modelId)`;
  - `openai-compatible` → `createOpenAICompatible({ name: rec.id, baseURL: rec.baseURL!, apiKey: process.env[rec.apiKeyEnv!] })(rec.modelId)` (add the `@ai-sdk/openai-compatible` dep);
  - **default (unknown family) → `throw`** (fail-loud; no silent google).
  - `streamChat` takes the resolved record (or chat.ts resolves and passes the model handle); the Anthropic cache-control branch keys on `rec.family === 'anthropic'` (preserve the exact prior behavior).

## PROV-1D — Migrate consumers + drop gemini-lite as chat + RULE-1 router fix
- `chat.ts`: warm `llmProviderRegistry` early (before provider resolution, mirror the trust warm); L508 → `const providerRec = llmProviderRegistry.resolveChatProvider(forceProvider)`; use `providerRec.id`/`providerRec.modelId` for logs + telemetry + `estimateCost`. (forceProvider='gemini-lite' now resolves to the default — it is no longer a chat option.)
- `toolCategories.ts:419`: model `'gemini-2.5-flash-lite'` literal → `llmProviderRegistry.routerModelId()` (single source; RULE-1 fixed). The router transport is otherwise unchanged.
- `ChatShell.tsx`: remove **Gemini Lite** from `providerToModelMap`, `PROVIDER_SHORTCUTS`, and the picker map (dropped as a chat option). Leave Gemini Flash (default) / GPT-4.1 / Claude Sonnet. (PROV-2 will drive this list FROM the registry's `exposedAsChat` rows; for now the minimal hardcoded removal.)
- gemini-lite remains in the registry (`exposedAsChat=false`) as the router model.

---

## SELF-VERIFICATION CHECKLIST (evidence)
- [ ] Pre-flight green; count recorded.
- [ ] **Byte-identical resolution** for gemini/openai/anthropic: a test asserting the family-dispatch resolver returns the same model (provider+modelId) as the old switch for the 3 kept providers + the default. Paste it.
- [ ] **"Add an LLM = a row" proven:** a test that injects a dummy `openai-compatible` registry entry (`{ family:'openai-compatible', baseURL:'https://x', apiKeyEnv:'DUMMY_KEY', modelId:'m' }`) and resolves it **with no code change** (createOpenAICompatible invoked with the env-sourced key). No real key used/printed.
- [ ] **Fail-loud:** an unknown family throws (no silent google fallback) — test it.
- [ ] **Router single-sourced:** grep shows no `'gemini-2.5-flash-lite'` literal in `toolCategories.ts`; the router model now == the registry router entry; a test asserts `routerModelId()` == `gemini-2.5-flash-lite`.
- [ ] **gemini-lite dropped as chat:** `resolveChatProvider('gemini-lite')` returns the DEFAULT (not gemini-lite); it is absent from the `ChatShell` picker; but it IS the router model. Show all three.
- [ ] **DB-first/code-floor:** registry `warm()` reads the DB; with the source unconfigured/failed, `resolveChatProvider`/`routerModelId` serve the code reference (the 4 built-ins resolve). Test the outage path.
- [ ] **Secrets:** grep proves no key VALUE is read/logged; only `apiKeyEnv` names + `process.env[...]` at resolve time. `.env` untouched.
- [ ] **Scope:** `git diff dc16a2e -- shared/llmGateway api/cwf/_lib/knowledge/gate` empty (fallback + eval-gate untouched); trust line untouched.
- [ ] Migration + `seedLlmProviders.ts` present; **owner-applies/seeds** (state it); code floor serves until then (the app runs green without the migration applied).
- [ ] `@ai-sdk/openai-compatible` added; build green; full suite green (state new count).

## OUT OF SCOPE (tracked follow-ups)
- **PROV-2:** admin-panel "Providers/LLMs" tab — add/remove/toggle/edit provider rows through the gated/audited path; `apiKeyEnv` pointer + "env var not set" status badge; the chat picker driven FROM the registry (`exposedAsChat`). (The UI affordance per the standing rule.)
- Consolidating `shared/llmGateway/*` (the fallback) onto the same registry.
- The Vercel AI Gateway family (deferred — egress posture).
```
```
Owner steps (after AG pushes): apply the `llm_providers` migration via the Supabase MCP, then run `scripts/seedLlmProviders.ts` (service role) — exactly like backends/rules. Until then the code floor serves the 4 built-ins (intended). I'll verify the diff (byte-identical resolution + the openai-compatible "row works" test + secrets + scope) from the repo, then we move to PROV-2 (the admin Providers tab).
```
