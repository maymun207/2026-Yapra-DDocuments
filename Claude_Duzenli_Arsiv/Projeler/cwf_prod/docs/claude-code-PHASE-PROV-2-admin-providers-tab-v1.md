# Claude Code — PHASE-PROV-2: Admin "Providers" tab (LLM registry UI affordance)
**rev 1 · 2026-06-30 · target HEAD `5e8bb8a` · canonical repo `cwf_yaprak`**

## Why this phase exists
PROV-1 made the LLM provider set **data** (DB-first `llm_providers`, family-dispatch). Today those rows are script-editable only. The standing rule: a governed-DATA operation (add/remove/toggle an LLM) must be doable through a **gated admin-panel UI affordance**, not code/script-only. This phase adds that affordance — mirroring the governance panel + backends pattern — and drives the chat provider picker FROM the registry (no more hardcoded client list).

**The boundary (memory rule — do NOT cross it):** the UI edits VALUES inside a LOCKED structure.
- **DATA → UI:** add/remove/toggle/edit a provider ROW within a known family (model id, baseURL, apiKeyEnv name, cost, exposedAsChat, enabled).
- **STRUCTURE → code:** a NEW family (new SDK/dep) or the family-dispatch resolver is NOT a UI op. The family field is a **closed-set Select** (`google|openai|anthropic|openai-compatible`); `openai-compatible` already covers custom/self-hosted.
- **SECRET → env only:** apiKeyEnv is a NAME (pointer). The UI shows an **env-set status badge**, NEVER a secret-value field, NEVER echoes a value.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `5e8bb8a`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record the count (~414).
3. Read: `api/admin/reset.ts` + `api/admin/routing-cache.ts` (gated-write: `authed`→`ensurePermission`→service-role+audit), `api/cwf/_lib/adminGuard.ts` (`authed`, `ensurePermission`), `shared/permissions.ts` (`PERMISSIONS`, `MAKER_PERMISSIONS`, `ROLE_PERMISSIONS`, matrix-honesty rule), `api/admin/capabilities.ts`, `src/components/admin/AdminPanel.tsx` (Tab union + `can(perm)` nav + TabsContent; the recent `architecture` tab), `src/components/admin/KindsTab.tsx` + `adminUi.tsx` (table + `ConfirmDialog`/`GatedBadge` + the UI-1 **admin-theme on portaled Content** lesson), the PROV-1 stack: `api/cwf/_lib/llm/reference/providers.ts`, `llmProviderRegistry.ts`, the `getLlmProviders` repo reader, `src/lib/params/cwfProviders.ts` (the client picker surface).

## HARD CONSTRAINTS
- **Secrets via ENV only.** apiKeyEnv is a NAME. The endpoint returns per provider only `envSet: boolean` (= `process.env[api_key_env] != null`) — NEVER the value, never logged, never a value input field anywhere in the UI. grep-prove no secret-value field.
- **Structure stays code.** `family` is a closed-set Select (the 4 PROV-1 families). Adding a new family/SDK is NOT reachable from the UI. The UI edits VALUES within the Zod-locked structure (validate every write against the PROV-1 `LlmProviderDeclaration` schema, server-side).
- **Gated + audited + RLS.** Writes only via a `PROVIDER_MANAGE`-gated server endpoint (service role); RLS already denies client writes (PROV-1). Every write audited (actor · action · provider_id · before→after · ts) — mirror the existing rule/reset audit; reuse a generic audit sink if one fits, else add a minimal `provider_audit` in an owner-applied migration.
- **Anti-brick guard.** The endpoint REJECTS delete/disable of the DEFAULT provider (`DEFAULT_PROVIDER_ID`) or the ROUTER provider (`ROUTER_PROVIDER_ID`) — bricking chat/routing must be impossible (mirror the users anti-lockout).
- **No chat-runtime change.** `chat.ts` provider resolution is UNTOUCHED (it already reads the registry from PROV-1). 2C changes only the CLIENT picker's source. `git diff 5e8bb8a -- api/cwf/chat.ts` empty.
- **No eval-gate / trust line / governance-logic change.** `git diff 5e8bb8a -- api/cwf/_lib/knowledge` limited to nothing governance-behavioral.
- **Matrix honesty.** `PROVIDER_MANAGE` is granted to super_admin only (NOT maker); the endpoint enforces exactly that; the UI gates the tab on it. The three must agree.
- **admin-theme on portaled components** (UI-1): any new `Select`/`Dialog`/`ConfirmDialog` Content gets the `admin-theme` class (else ghost popovers). grep-prove.
- **Doc lock-step** (inherited AGENTS RULE 20 / RULE 3 item 4): if a manifest-mapped area changes, sync the tab + bump `lastSyncedCommit`, or `check:doc-drift` flags it. (The Live Facts provider list is derived → auto-regenerates.)

---

## PROV-2A — Permission + gated write endpoint (validation gate + audit + env-status)
- `shared/permissions.ts`: add `PERMISSIONS.PROVIDER_MANAGE = 'provider:manage'`. It lands in `ALL_PERMISSIONS` (super_admin) automatically; do NOT add it to `MAKER_PERMISSIONS`. Update the capabilities/matrix surface so the UI can gate on it.
- New `api/admin/providers.ts` (mirror `reset.ts`/`routing-cache.ts`):
  - `authed` → `ensurePermission(ctx, PERMISSIONS.PROVIDER_MANAGE, res)`.
  - **GET** → `{ providers: [{ ...row, envSet: process.env[row.api_key_env] != null }] }` (envSet computed server-side; the key VALUE never leaves the server). For built-ins with no `api_key_env` (SDK reads its own default env), report `envSet: null` / "SDK-managed".
  - **POST upsert** → validate the body against the PROV-1 `LlmProviderDeclaration` Zod schema (family ∈ closed set; `baseURL` required when family=`openai-compatible`; `api_key_env` a NAME matching `/^[A-Z0-9_]+$/`; reject any field that looks like a key value); service-role upsert; audit before→after.
  - **POST toggle** (`enabled`/`exposed_as_chat`) and **DELETE** → service-role; audit. **Anti-brick:** 422 if the target is `DEFAULT_PROVIDER_ID` or `ROUTER_PROVIDER_ID` and the op would disable/delete it.
  - A service-role write method on the repo (`upsertLlmProvider`/`deleteLlmProvider`) — mirror the existing service-role writers.

## PROV-2B — Providers tab UI (table + add/edit + toggle/delete + env badge)
- New `src/components/admin/ProvidersTab.tsx` (mirror `KindsTab`):
  - Table: id · family · modelId · exposedAsChat · enabled · **env-status badge** (✓ "env set" / ⚠ "env var not set" / "SDK-managed").
  - Add/Edit dialog: `id`, `family` **Select (closed set)**, `modelId`, `baseURL` (shown ONLY when family=`openai-compatible`), `apiKeyEnv` (NAME text input + live env-status badge), `cost` (input/output), `exposedAsChat` toggle, `enabled` toggle. **No secret-value field.**
  - Toggle + Delete behind `ConfirmDialog`; the default/router provider's delete/disable controls are disabled with a tooltip ("required for chat/routing").
  - All portaled `Select`/`Dialog`/`ConfirmDialog` Content carry the `admin-theme` class (UI-1).
- Register in `AdminPanel.tsx`: add `'providers'` to the `Tab` union; nav item `{ id:'providers', label:t('Sağlayıcılar','Providers'), icon:…, show: can(PERMISSIONS.PROVIDER_MANAGE) }`; `{tab === 'providers' && can(PERMISSIONS.PROVIDER_MANAGE) && <ProvidersTab lang={lang} />}`.

## PROV-2C — Chat picker driven from the registry (drop the hardcoded list)
- Expose the chat-selectable providers to the client via a lightweight authed GET (new `api/cwf/providers.ts` or fold into the existing config/bootstrap response): `[{ id, label, modelId }]` for `exposed_as_chat && enabled` — DB-first/code-floor (serve the reference on outage).
- `src/lib/params/cwfProviders.ts` / the picker: render from that list instead of the hardcoded map, with a **safe fallback** to the default provider if the fetch fails (never brick the picker). Adding an `exposedAsChat` row in the UI now appears in the picker; dropping one removes it.

---

## SELF-VERIFICATION CHECKLIST (evidence)
- [ ] Pre-flight green; count recorded.
- [ ] **PROVIDER_MANAGE three-way:** super_admin-only in the matrix; the endpoint 403s a non-super (test); the UI hides the tab for non-super. Show all three.
- [ ] **Add/toggle/delete via the endpoint** works + is audited (a test or a paste of the audit row before→after).
- [ ] **Secrets:** GET returns only `envSet` (never a value); grep proves no secret-value field/echo anywhere in `api/admin/providers.ts` + `ProvidersTab.tsx`; the only `process.env[...]` read is the existence check.
- [ ] **Structure-lock:** a POST with an unknown family or a missing baseURL (openai-compatible) is rejected by the Zod gate (422). Test it.
- [ ] **Anti-brick:** delete/disable of `DEFAULT_PROVIDER_ID` / `ROUTER_PROVIDER_ID` → 422. Test it.
- [ ] **Picker from registry:** the chat picker renders the `exposedAsChat` rows from the endpoint; adding an exposedAsChat provider shows it; the fetch-failure fallback works. **`chat.ts` diff empty** (server resolution unchanged).
- [ ] **admin-theme** on the new portaled Content (grep); no chat-shell leak.
- [ ] **Scope:** eval-gate / trust line / governance-behavioral untouched; doc lock-step clean (`check:doc-drift` ok).
- [ ] Build green; full suite green (state new count).
- [ ] Migration (if a `provider_audit` table was needed) present + **owner-applies**; code path works without it where possible.

## OUT OF SCOPE (tracked)
- A NEW family / SDK (structure → code).
- The Vercel AI Gateway family (deferred).
- PROV-3 (consolidate the `shared/llmGateway` fallback onto the registry).
```
```
Owner steps (after AG pushes): if PROV-2 added a `provider_audit` table, apply that migration via the Supabase MCP. Then a super_admin can add/remove/toggle LLMs in the panel; a custom LLM = add an `openai-compatible` row (apiKeyEnv name) + set that env var in Vercel (the one out-of-band step). I'll verify the diff (secrets-never-valued + anti-brick + matrix honesty + chat.ts-untouched) from the repo, then we move to P-3 (KB v6).
```
