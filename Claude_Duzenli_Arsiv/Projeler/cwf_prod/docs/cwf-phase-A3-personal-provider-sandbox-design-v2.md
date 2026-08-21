# CWF — Phase A3 Design Note: Personal Provider Sandbox · v2

<!-- v2 · 2026-07-07 · anchor = origin/master `3dd0a95` (RULE-25 fresh-clone verified). SUPERSEDES v1.
     DELTA vs v1: (1) the three v1 §8 decisions are now OWNER-LOCKED — harden (two-table) · fail-loud on
     SSRF-block/unknown · sibling probe endpoint. (2) NEW owner requirement folded in: a developer can
     DISABLE a GLOBAL provider inside their own sandbox, so the sandbox runs ONLY on their own LLM
     structure. This maps 1:1 onto the EXISTING, tested `mergeMcpServers` personal-override pattern →
     so the CONFIG storage moves from v1's row-per-provider table to the `mcp_settings`-style SINGLE
     owner-RLS jsonb row (adds + global-disable overrides in one merge). The SECRET stays a separate
     service-role-only table (never client-bound). Everything else in v1 stands. -->

## 0. Locked decisions (owner, this window)
1. **Secret storage = HARDENED (two-table).** Config is client-readable (owner-RLS); the secret VALUE lives in
   a **service-role-only** table the owner cannot read back. Strictly stronger than the personal-MCP mirror.
2. **SSRF-block / unknown provider = FAIL LOUD.** Honest owner-facing error, turn stops. **Never** a silent
   swap to a global provider (a silent swap is a scope/authority surprise; fail-loud matches the resolver's
   existing "unknown family → throw" philosophy).
3. **Probe = a SIBLING endpoint** (`provider-probe.ts`) of the `mcp-probe.ts` shape — keeps the MCP probe's
   tight `{scope,id}` contract clean.

## 1. NEW requirement (owner) — "my sandbox runs only on my LLM"
A developer can, in their sandbox: **add** their own OpenAI-compatible providers **and disable any GLOBAL
provider for themselves only** — so they can guarantee the turn runs on the LLM *they* attached, nothing else.
This is exactly the `mergeMcpServers` contract, already shipped + tested for MCP:
> global baseline → a personal row with the SAME id as a global **replaces/disables** it *for this user only* →
> a personal row with a UNIQUE id is **added** → only `enabled !== false` survives.

So A3 reuses that pattern for providers instead of inventing a second one.

## 2. Storage (revised from v1)
- **`llm_providers_personal`** — **one owner-RLS jsonb row per user** (the `mcp_settings` shape verbatim:
  `user_id` PK → auth.users cascade, `providers jsonb not null default '[]'`, `updated_at` trigger; RLS
  `auth.uid()=user_id` for all four ops, anon revoked). Each array entry is EITHER:
  - a **personal provider**: `{ id, family:'openai-compatible', baseURL, modelId, label, enabled, hasSecret }`
    (`id` is a stable client-minted value namespaced e.g. `personal:<uuid>` so it can't collide with a global
    id by accident), **NO secret value in the jsonb** (client-readable row); or
  - a **global-disable override**: `{ id:<globalProviderId>, enabled:false }` (mirrors the MCP disable row).
- **`llm_provider_secrets`** — **service-role-ONLY** (the `mcp_secrets` shape verbatim: RLS on, NO client
  policy, REVOKE all from anon+authenticated). Keyed `(user_id, provider_id)`, column `value`. Resolved
  server-side only; **never** returned to any client. `+ llm_provider_secret_audit` (append-only:
  `actor_user_id · provider_id · action('set'|'rotate'|'delete')`, **no value column**).

The write endpoint validates a secret's `provider_id` exists in the caller's own config jsonb before storing —
no dangling secrets, no FK needed (mirrors mcp_secrets having no FK).

## 3. The merge — reuse, don't reinvent
New PURE helper **`mergePersonalProviders(globalChatProviders, personalEntries) → effectiveProviders[]`**,
structurally the sibling of `mergeMcpServers` (adds + same-id-disable + `enabled!==false` filter). This
produces the **per-user EFFECTIVE provider set**, which is the single authority for BOTH the picker and
resolution. **Inert for empty config:** a user with no personal entries (every normal user, and a developer who
hasn't configured anything) → the effective set == the global chat set → picker + resolution are
**byte-identical** to today. All new behaviour is confined to opted-in developers.

## 4. Gateway resolution seam (single gateway preserved)
Stage 6 `stageResolveProvider` (`turn/stagesModel.ts`) computes the caller's effective set (owner-scoped read
by `ctx.userId`), then:
- **empty personal config →** byte-identical global path (unchanged).
- **`forceProvider` = a PERSONAL entry →** build `LlmProviderDeclaration{family:'openai-compatible', baseURL,
  modelId, id}`; **SSRF-guard `baseURL` (§6) → block ⇒ FAIL LOUD**; resolve the personal secret server-side →
  stash transiently on **`ctx.personalApiKey`** (non-persisted, never-logged new ctx field).
- **`forceProvider` = an ENABLED global in the effective set →** global `resolveChatProvider` (unchanged).
- **`forceProvider` = a DISABLED-for-user global, or unknown →** resolve the **effective default** (a small
  pure `effectiveDefault(set)`: the global default if still enabled for this user, else the first enabled entry
  in deterministic order). This is what makes "my sandbox runs only on my LLM" hold even against a stale forced
  id — a developer who disabled every global and added their own lands on their own, never a disabled global.

Stage 10 `stageStream` passes `resolvedApiKey: ctx.personalApiKey` (undefined for global turns) into
`streamChat`. `gateway.streamChat`/`resolveModel` gain an optional `resolvedApiKey?`; the `openai-compatible`
branch key precedence becomes **injected personal key → `process.env[apiKeyEnv]`**. Same one `streamText` call
site — a personal provider is a ROW the gateway resolves, never a second client. (Anthropic/google/openai
families + the global path are byte-identical.)

## 5. Secret handling
`resolvePersonalProviderKey(userId, providerId) → string | undefined` (sibling of `resolveAuthHeader`, reads
`llm_provider_secrets` via service role). Write via a `PROVIDER_PERSONAL`-gated endpoint scoped to
`ctx.userId` (never client-direct). Config GET returns `hasSecret` only. Value never echoed, never in picker/
probe/logs; audit is name/action/actor only. Rotate = PUT replaces value. A no-auth local Ollama is allowed but
the UI warns it's an open endpoint.

## 6. SSRF / egress guard — net-new SECURITY ARTIFACT (full review)
No SSRF guard exists today (verified). New pure `api/cwf/_lib/net/ssrfGuard.ts`:
`assertPublicHttpsUrl(url)` — **https-only**; DNS-**resolve** the host and reject loopback (`127/8`,`::1`),
private (`10/8`,`172.16/12`,`192.168/16`), link-local (`169.254/16`,`fe80::/10`), unique-local (`fc00::/7`),
unspecified/reserved. **Resolve-then-check** (validate the IP, never trust the hostname — DNS-rebinding
defence). **Two enforcement points, both mandatory:** (1) resolve-time pre-check in stage 6 + the probe →
fail fast, drives the honest `private-ip-blocked` probe class; (2) a **connect-time guarded `fetch`** passed to
`createOpenAICompatible({ fetch })` (and used by the probe) that re-validates the resolved IP immediately
before connect — the real enforcement, narrowing the TOCTOU window. **Honest limit:** the guarded fetch narrows
but doesn't mathematically eliminate TOCTOU (a fully IP-pinned undici agent would) — ship the guarded-fetch
floor, track the residual, don't claim "solved." **AG must verify** the pinned `@ai-sdk/openai-compatible`
exposes a `fetch` option and use it; if not, wrap the transport equivalently (explicit Author-lane gate — deps
weren't installed in the review clone).

## 7. Capability + gates (visibility ≠ enforcement)
`PROVIDER_PERSONAL:'provider:personal'` → `PERMISSIONS` + `MAKER_PERMISSIONS` (super derives via
`ALL_PERMISSIONS`). Do **not** rename `PROVIDER_VIEW`/`PROVIDER_MANAGE`. Personal endpoints: every op
`ensurePermission(PROVIDER_PERSONAL)` **AND** owner-scoped to `ctx.userId` (cap + RLS belt). Picker
(`api/cwf/providers.ts`) returns the **caller's effective set** (owner-scoped merge) — global registry read
otherwise unchanged. Gate tests mint through the real `ensurePermission` + `ROLE_PERMISSIONS`.

## 8. Invariants / floor / lock-step
Single LLM gateway (personal = a resolved ROW). Personal secrets service-role-only / masked / rotate-only /
never client-bound / never logged / audited. SSRF guard on every user-supplied server-side fetch (resolve +
connect). Fail-loud on block/unknown — never a silent swap. Empty-config path byte-identical. Personal-key
spend quota-exempt-but-audited (Phase B). CORE/global untouched; promotion out-of-band. Two-gate migrations (AG
authors both; Operator applies + schema-read confirms owner-CRUD on config, service-role-only on the secret
table). Living-doc: permission-matrix row + new endpoints + `net/` module + two migrations → reseal-with-redraw
(matrix row + security-artifact note); docVersion bump; drift-gate-green pre-flight.

<!-- END · cwf-phase-A3-personal-provider-sandbox-design-v2 · rev 2 · 2026-07-07 · anchor 3dd0a95 · supersedes v1 -->
