# CWF — Phase A3 Design Note: Personal Provider Sandbox · v1

<!-- v1 · 2026-07-07 · anchor = origin/master `3dd0a95` (RULE-25 fresh-clone verified: permissions.ts,
     gateway.ts, llmProviderRegistry.ts, reference/providers.ts, providers.ts endpoint, mcp-settings.ts,
     mcp-secrets.ts, resolveAuthHeader.ts, mcp-probe.ts, mergeMcpServers.ts, McpSettingsRepository.ts,
     the mcp_settings / mcp_secrets / llm_providers migrations, stagesModel.ts, stageStream.ts, context.ts
     all read directly). Dedicated A3 note; supersedes the §4 sketch in
     cwf-phase-A-rbac-nav-maker-sandbox-design-v3.md. Design only — NOT the AG phase prompt. -->

## 0. Principle (unchanged, locked)
Developer (`power_user`/maker) adds **their own** LLM providers as **personal rows** and uses them **in their
own sessions**; nothing they do writes global state. Promotion of a proven personal provider to the global
registry is an **out-of-band human act** (developer proves it → verbal/email → super adds via
`PROVIDER_MANAGE`). New maker cap: **`PROVIDER_PERSONAL` (`provider:personal`)**. `PROVIDER_MANAGE` (global
registry) stays checker-only, untouched.

## 1. Data model — the ONE deviation from "mirror the MCP pattern" (owner decision #1)
The bootstrap said "mirror the personal/global MCP pattern." I read the actual code: personal MCP stores the
**token as a value** in `mcp_settings.servers` (jsonb) on an **owner-RLS-SELECT-own** row — i.e. the browser
reads its own token back (client-bound). That directly contradicts A3's own requirement: *masked, rotate-only,
**never client-bound**.* So A3 mirrors the **config** side of the MCP pattern but **hardens the secret** side to
the `mcp_secrets` discipline. Two tables:

- **`llm_providers_personal`** — owner-RLS (the `mcp_settings` policy shape verbatim: `auth.uid()=user_id` for
  select/insert/update/delete; `authenticated` keeps own-row writes; anon revoked). Columns:
  `id` (uuid PK) · `user_id`→auth.users cascade · `family` **CHECK = 'openai-compatible' only** (LiteLLM /
  Ollama / any OpenAI-compatible key fit natively; a personal row can never be a google/anthropic-family SDK
  path — that stays a global concern) · `model_id` · `base_url` (NOT NULL — required, §5) · `label` ·
  `enabled` · timestamps. **NO secret column here** — this row is client-readable, so it carries none.
- **`llm_provider_secrets`** — **service-role-ONLY**, the `mcp_secrets` shape verbatim (RLS on, **NO client
  policy**, `REVOKE all from anon+authenticated`; a browser query 42501s / 0 rows). Keyed by
  `(user_id, provider_id)`. Column `value` (the API key / tunnel auth token). Resolved **server-side only**;
  **never** returned to any client — not the config GET, not the picker, not chat, not the probe. `+
  llm_provider_secret_audit` (append-only: `actor_user_id · provider_id · action('set'|'rotate'|'delete')`,
  **NO value column** — the `mcp_secret_audit` shape).

This is strictly stronger than personal MCP and is the correct EAIP posture; the cost is one extra table +
one resolver vs. one column. (Rejected alternative: single owner-RLS row with a column-privilege REVOKE on the
secret column — PostgREST + column grants are fiddly and off-pattern; the two-table mirror of the *proven*
`mcp_secrets` design is cleaner and buy-before-build.)

## 2. Gateway resolution seam — single gateway preserved (no second client/code path)
A personal provider is **a record the existing gateway resolves**, exactly like a DB registry row — never a new
client. The resolver already dispatches `openai-compatible` → `createOpenAICompatible({ baseURL, apiKey })`
(`gateway.resolveModel`). The only change is the **source** of `baseURL` (the personal row) and `apiKey` (the
personal secret, resolved server-side). Seam is two existing stages:

- **Stage 6 `stageResolveProvider` (`turn/stagesModel.ts`).** After the global
  `llmProviderRegistry.resolveChatProvider(forceProvider)`, if `ctx.forceProvider` names one of the **caller's
  own** personal rows (owner-scoped read by `ctx.userId`): (a) build a `LlmProviderDeclaration`
  (`family:'openai-compatible'`, `baseURL`, `modelId`, `id`); (b) **run the SSRF guard on `baseURL`** (§5) —
  reject → **fail loud** with an honest owner-facing error, **never** a silent swap to a global provider
  (mirrors the resolver's existing "unknown family → throw, no silent fallback" philosophy); (c) resolve the
  personal secret server-side and stash it transiently on **`ctx.personalApiKey`** (a new *non-persisted,
  never-logged* ctx field — it is never in a DB write, telemetry, or a log line). `ctx.provider`/`modelName`
  set from the record for logs/telemetry as usual. Global path (no personal match) is **byte-identical**.
- **Stage 10 `stageStream` (`turn/stageStream.ts`).** Pass `resolvedApiKey: ctx.personalApiKey` (undefined for
  global turns) into `streamChat`.
- **`gateway.streamChat`/`resolveModel`.** New optional `resolvedApiKey?: string`. In the `openai-compatible`
  branch the key precedence becomes **injected personal key → `process.env[apiKeyEnv]`** (mirrors
  `resolveAuthHeader` precedence: personal value → env name). Every other family and the global path are
  untouched → byte-identical. **Enforcement is the same one `streamText` call site** — the SSRF guard also
  rides a guarded `fetch` on the compatible client (§5), so the connect-time IP check is on the actual gateway
  transport, not a pre-check only.

## 3. Secret handling
New server-side resolver **`resolvePersonalProviderKey(userId, providerId) → string | undefined`** (sibling of
`resolveAuthHeader`; reads `llm_provider_secrets` via the service role). Write path is a **`PROVIDER_PERSONAL`-
gated server endpoint** scoped to `ctx.userId` (never a client-direct Supabase write — that is the whole point
of the deviation). Rotate = a PUT that replaces `value`; delete removes it. The config GET returns
`hasSecret: boolean` only. **A value never leaves the server** — not echoed on write, not in the picker, not in
the probe, not in any log (name/action/actor audit only, no value column). "Local Ollama with no auth" is
allowed but the UI warns it is an open endpoint (a naked tunnel = your LLM open to the internet); the
auth-header field is **effectively mandatory** for a tunnel.

## 4. Tunnel + probe UX (reuse the MCP probe, do not re-invent)
- **Local-LLM entry = a guided tunnel flow**, not browser-direct localhost. Browser-direct is **REJECTED**: it
  moves the LLM call outside the server-side turn pipeline → bypasses the single-gateway + ADR-001 governance.
  The UI gives: a copy-paste tunnel command snippet (cloudflared/ngrok), a **URL field** (the public tunnel
  hostname), and the **auth-header-as-personal-secret** field.
- **Probe = the existing `api/admin/mcp-probe.ts` pattern**, extended with a `scope='personal-provider'` branch
  (or a sibling endpoint of identical shape): resolve the row **server-side** from `{scope, id}` (the request
  URL is **never** a probe target — no SSRF widening), run the SSRF guard, do a cheap reachability check to
  `base_url` (an OpenAI-compatible `GET /models` or a HEAD), and return **NAMES/booleans/class only**:
  `reachable` / `unreachable` / **`private-ip-blocked`** (the new honest class) / `auth`. Never the URL
  credential, never the raw error message.

## 5. SSRF / egress guard — the net-new SECURITY ARTIFACT (full review)
There is **no SSRF guard in the codebase today** (verified). Personal base URLs are the first user-supplied
server-side fetch targets, so this is genuinely new attack surface. New pure module
**`api/cwf/_lib/net/ssrfGuard.ts`**:
- **`assertPublicHttpsUrl(url)`** — **https-only**; parse; **DNS-resolve the host** and reject if ANY resolved
  address is loopback (`127/8`, `::1`), private (`10/8`, `172.16/12`, `192.168/16`), link-local
  (`169.254/16`, `fe80::/10`), unique-local (`fc00::/7`), or unspecified/reserved. **Resolve-then-check** (DNS
  rebinding defence — validate the *IP*, never trust the hostname).
- **Two enforcement points, both mandatory:** (1) **resolve-time pre-check** in stage 6 + the probe → fail
  fast, drives the honest `private-ip-blocked` probe class; (2) **connect-time guarded `fetch`** passed to
  `createOpenAICompatible({ fetch })` (and used by the probe) that **re-validates the resolved IP immediately
  before connect** — this is the real enforcement and closes most of the TOCTOU/rebinding window that a
  pre-check-only design leaves open.
- **Honest limit (state it, ADR-001 style):** a resolve-time check alone is TOCTOU-vulnerable; the guarded
  `fetch` narrows but does not mathematically eliminate the window (a fully pinned-IP undici agent would).
  A3 ships the guarded-fetch floor and flags the residual as tracked-small, not silently "solved."
- Tunnel URLs (public cloudflared/ngrok hostnames) resolve to public IPs → pass naturally.
- **AG must verify** the pinned `@ai-sdk/openai-compatible` version exposes a `fetch` option; if not, wrap the
  transport equivalently. (I could not confirm the SDK signature from the clone — deps aren't installed — so
  this is an explicit Author-lane verification gate, not an assumption.)

## 6. Capability + server gates (visibility ≠ enforcement)
- `PROVIDER_PERSONAL:'provider:personal'` added to `PERMISSIONS` + `MAKER_PERMISSIONS` (super derives it via
  `ALL_PERMISSIONS`). Do **not** rename `PROVIDER_VIEW`/`PROVIDER_MANAGE` (shipped strings).
- Personal-provider endpoint: every op `ensurePermission(ctx, PROVIDER_PERSONAL)` **AND** owner-scoped to
  `ctx.userId` (belt: cap + RLS). GET config → `PROVIDER_PERSONAL`, returns `hasSecret` only. Secret write/
  rotate/delete → `PROVIDER_PERSONAL`, service-role write scoped to `ctx.userId`, audited.
- Picker (`api/cwf/providers.ts`): union the **caller's own** enabled personal providers onto the global
  `listChatProviders()` (owner-scoped) so they appear in **that owner's** picker only — mirrors how personal
  MCP overlays global, but per-caller. Global registry read is unchanged.
- Gate tests mint through the **real** `ensurePermission` + `ROLE_PERMISSIONS` (remove `PROVIDER_PERSONAL`
  from `MAKER_PERMISSIONS` → the maker test fails at the capability layer, not a mock).

## 7. Invariants / floor / lock-step
Single LLM gateway (a personal provider is a ROW the gateway resolves, never a 2nd client). Personal secrets
service-role-only, masked, rotate-only, never client-bound, never logged, audited (name/action/actor). SSRF
guard on every user-supplied server-side fetch (resolve-time + connect-time). Fail-loud on SSRF-block / unknown
— never a silent provider swap. Personal-key spend is **quota-exempt but audited** (Phase B). CORE/global
untouched; promotion out-of-band. Two-gate migration (AG authors both migrations; Operator applies + a
schema-read confirms RLS = owner-CRUD on config, service-role-only on the secret table). Living-doc:
`shared/permissions.ts` matrix + a new endpoint + a new `net/` module + two migrations → likely a
**reseal-with-redraw** (permission matrix diagram row + the security-artifact note); AG bumps docVersion, drift
gate green pre-flight.

## 8. Owner decisions to confirm BEFORE I write the gated prompt
1. **Secret storage (§1):** confirm the **two-table hardening** (config owner-RLS + secret service-role-only,
   owner cannot read the value back) over the literal personal-MCP mirror (owner reads own token). *My
   recommendation: yes — it's what A3's own "never client-bound" requires.*
2. **SSRF-block behaviour (§2b/§5):** confirm **fail-loud** (honest error to the owner, turn stops) over any
   silent fallback to a global provider. *My recommendation: yes — a silent swap is a scope/authority
   surprise; fail loud matches the resolver's existing philosophy.*
3. **Probe endpoint shape (§4):** extend `mcp-probe.ts` with a `personal-provider` scope, or a **sibling**
   `provider-probe.ts` of identical shape? *My recommendation: sibling — keeps the MCP probe's tight
   `{scope, id}` contract clean and avoids overloading one endpoint across two resource families.*

<!-- END · cwf-phase-A3-personal-provider-sandbox-design-v1 · rev 1 · 2026-07-07 · anchor 3dd0a95 -->
