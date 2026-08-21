# PHASE PROVIDER-PERSONAL-1 — Personal Provider Sandbox (A3)
**v1 · 2026-07-07 · anchor = origin/master `3dd0a95` · Author lane (AG) · design authority =
cwf-phase-A3-personal-provider-sandbox-design-v2.md**

You implement THIS prompt exactly. Do NOT re-design, re-scope, or re-split — the spec is the Architect's. If
you believe something is wrong, STOP and report; do not "fix" by improvising a different shape.

---

## 0. HARD PRE-FLIGHT GATE (all must be literally true before any write — paste evidence in the report)
1. `git rev-parse origin/master` == `3dd0a95` (fresh clone; if HEAD moved, STOP and report).
2. `npm ci` clean; **full suite green** — record the exact `Tests N passed` + file count (baseline 1074 / 103).
3. **Drift gate GREEN**: `npx tsx scripts/checkDocDrift.ts` (or the repo's drift command) prints `[OK]`.
4. `git status` clean. Long-lived branch = `master` only; you branch, merge `--no-ff` (squash BANNED).

If any of 1–4 fails, STOP.

---

## 1. HARD CONSTRAINTS (violating any one = phase rejected)
- **Secrets, absolute.** A personal-provider secret VALUE is written ONLY to `public.llm_provider_secrets`
  (service-role) and read ONLY server-side by the resolver. It is NEVER: returned by any endpoint (config GET
  returns `hasSecret:boolean` only), placed in the jsonb config row, sent to the picker or probe, written to a
  log/telemetry/audit-value, or bundled to the client. Audit rows carry name/action/actor, **no value column**.
- **Single LLM gateway.** A personal provider is a `LlmProviderDeclaration` the EXISTING gateway resolves —
  `createOpenAICompatible` at the ONE `streamText` call site. You may add an optional `resolvedApiKey?` param
  and a guarded `fetch`; you may NOT add a second client, a second stream path, or a browser-side LLM call.
- **Empty-config byte-identical.** For a user with NO personal config entries, stage 6 resolution, the picker,
  and the stream MUST be byte-identical to `3dd0a95`. All new behaviour is confined to opted-in users. Prove it
  with a test.
- **FAIL LOUD.** An SSRF-blocked `baseURL`, an unknown forced personal id, or an unresolvable personal secret
  → an honest error that stops the turn. NEVER a silent fallback to a global provider (that is a scope/authority
  surprise). Mirrors the resolver's existing "unknown family → throw".
- **No renaming shipped strings.** `PROVIDER_VIEW`/`PROVIDER_MANAGE`/`REPLAY_LENS`/`KIND_DRAFT` etc. are wire
  strings — do not touch. Only ADD `PROVIDER_PERSONAL`.
- **Capability-not-role.** No role literals in render or server. Gate every op via
  `hasPermission`/`ensurePermission`. Cap + owner-RLS belt on every personal op (a maker may only ever touch
  their OWN rows; `ctx.userId` is the authority, never a client-supplied user id).
- **Eval-gate / governed tables untouched.** This phase adds NON-governed personal tables only. The eval-gate
  engine, `GATE_STAGES`, the schema interpreter, and every governed-table path stay byte-identical.
- **Two-gate migration.** You AUTHOR the migrations; you do NOT apply them. Application is the Operator lane +
  a schema-read confirmation (separate gate). Say so in the report; do NOT run `supabase db push`.
- **FULL REVIEW artifacts (security-critical — expect line-by-line Architect review):** `net/ssrfGuard.ts` +
  the guarded fetch, `resolvePersonalProviderKey`, the personal config/secret endpoints, the sibling probe, the
  permission-matrix delta, and the stage-6/gateway seam.
- **Diff scope.** Permitted beyond the code: `.agents/CHANGELOG.md`, `public/architecture/manifest.json`
  (reseal), the frontend service/store methods. Do NOT forbid the changelog. Nothing else unexpected.
- **Frozen-file sweep.** After merge, confirm zero changes to frozen files (report the sweep).

---

## 2. GATED SUB-PHASES (do in order; each gate must pass before the next)

### 2.1 — Migrations (authored, NOT applied)
Create `supabase/migrations/20260707<HHMMSS>_llm_providers_personal.sql`:
- `public.llm_providers_personal` — `user_id uuid primary key references auth.users(id) on delete cascade`,
  `providers jsonb not null default '[]'::jsonb`, `updated_at timestamptz not null default now()`; reuse
  `set_updated_at()` trigger. RLS ENABLED; owner policies ONLY (`auth.uid()=user_id` for
  select/insert/update/delete); `revoke ... from anon` (authenticated keeps own-row writes, mirroring
  `mcp_settings`). Comment: providers jsonb holds NO secret value (client-readable; secrets live in
  `llm_provider_secrets`).
- `public.llm_provider_secrets` — `user_id uuid`, `provider_id text`, `value text not null`,
  `updated_at timestamptz`, `updated_by uuid references auth.users(id) on delete set null`,
  **PRIMARY KEY (user_id, provider_id)**; `set_updated_at()` trigger. RLS ENABLED with **NO client policy**;
  `revoke select,insert,update,delete,truncate from anon; ... from authenticated;` (the `mcp_secrets` posture:
  service-role only, both directions). Comment: sensitive; never returned to a client.
- `public.llm_provider_secret_audit` — append-only, mirrors `mcp_secret_audit`:
  `id uuid pk default gen_random_uuid()`, `actor_user_id uuid references auth.users(id) on delete set null`,
  `provider_id text not null`, `action text not null check (action in ('set','rotate','delete'))`,
  `created_at timestamptz not null default now()`. RLS: super_admin SELECT (`is_super_admin(auth.uid())`); no
  client write policy; `revoke insert,update,delete,truncate from anon,authenticated`. Index on
  `(provider_id, created_at desc)` + `(actor_user_id, created_at desc)`. `notify pgrst,'reload schema';`
- Extend `scripts/grantPolicy.ts` classification + its test: `llm_providers_personal` = OWNER_CRUD;
  `llm_provider_secrets` = SERVICE_ROLE_ONLY; `llm_provider_secret_audit` = the append-only super-select shape.

**Gate 2.1:** migration files parse; grantPolicy test passes; you did NOT apply them.

### 2.2 — Capability
`shared/permissions.ts`: add `PROVIDER_PERSONAL:'provider:personal'` to `PERMISSIONS`; add it to
`MAKER_PERMISSIONS` (super derives via `ALL_PERMISSIONS`). Comment it as a SANDBOX cap (personal rows only;
never global). Do not touch other strings.

**Gate 2.2:** a test asserts `hasPermission('power_user','provider:personal')` true and
`hasPermission('user','provider:personal')` false, minted through the REAL `ROLE_PERMISSIONS`.

### 2.3 — Secret store + resolver
- `McpSecretsRepository` is the shape to mirror. Add `LlmProviderSecretsRepository` (service-role):
  `get(userId,providerId)`, `set(userId,providerId,value,actorId)`, `remove(userId,providerId,actorId)` — each
  writes the matching audit row (no value).
- `api/cwf/_lib/llm/resolvePersonalProviderKey.ts`: `(userId, providerId) => Promise<string|undefined>` reading
  via the repo. Never logs a value; logs name-only on a miss (like `resolveAuthHeader`).

**Gate 2.3:** unit test — set→get round-trips server-side; the repo/resolver never returns a value to any
non-service path; audit row written with no value.

### 2.4 — Config repository + the PURE merge
- `LlmProvidersPersonalRepository` (service-role, owner-scoped `.eq('user_id',…)` on every op):
  `getByUserId(userId) => PersonalProviderEntry[]`, `upsert(userId, entries)`.
- `api/cwf/_lib/llm/mergePersonalProviders.ts` — PURE, the structural sibling of `mergeMcpServers`:
  `(globalChatProviders, personalEntries) => effectiveProviders[]`. Same rules: global baseline → a personal
  entry with the SAME id replaces/disables the global → a unique-id personal entry is added → filter
  `enabled !== false`. Never mutates inputs, never writes.
- `effectiveDefault(effectiveProviders, globalDefaultId) => id` — PURE: the global default if still enabled for
  this user, else the first enabled entry in deterministic order.

**Gate 2.4:** merge tests cover add / same-id-disable / unique-add / empty-config-passthrough (== global set);
`effectiveDefault` covers "global default still enabled" and "all globals disabled → first personal".

### 2.5 — SSRF guard (FULL REVIEW)
`api/cwf/_lib/net/ssrfGuard.ts`:
- `assertPublicHttpsUrl(url): Promise<void>` (throws a typed `SsrfBlockedError` on violation) — https-only;
  `dns.lookup`/`resolve` the host (all A/AAAA); reject if ANY resolved IP is loopback/private/link-local/
  unique-local/unspecified/reserved (IPv4 `127/8,10/8,172.16/12,192.168/16,169.254/16,0.0.0.0`; IPv6
  `::1,fe80::/10,fc00::/7,::`). Resolve-then-check (validate the IP, not the hostname).
- `ssrfGuardedFetch: FetchFunction` — a `fetch` wrapper that re-runs the IP check against the target host
  immediately before connect, then delegates. This is what `createOpenAICompatible({ fetch })` and the probe
  use. **Verify** the pinned `@ai-sdk/openai-compatible` exposes a `fetch` option and use it; if it does not,
  wrap the transport equivalently and REPORT which path you took.

**Gate 2.5:** unit tests — blocks `http://`, `https://127.0.0.1`, `https://169.254.169.254` (cloud metadata),
`https://10.x`, a hostname that resolves to a private IP (rebinding case, mocked resolver); allows a public
hostname. The guarded fetch re-validates (test the connect-time path, not just the pre-check).

### 2.6 — Gateway seam
- `gateway.ts`: `resolveModel(rec, resolvedApiKey?)` — openai-compatible branch key precedence = injected
  `resolvedApiKey` → `process.env[rec.apiKeyEnv]`. When `rec` is a personal provider, pass
  `fetch: ssrfGuardedFetch` to `createOpenAICompatible`. Every other family + the global path unchanged.
  `streamChat` gains `resolvedApiKey?` and threads it. **No behaviour change when `resolvedApiKey` is absent.**
- `turn/types.ts` + `context.ts`: add `personalApiKey?: string` (non-persisted; NEVER written to any DB/log).
- `turn/stagesModel.ts` `stageResolveProvider`: after the existing global resolve, load the caller's personal
  entries (owner-scoped by `ctx.userId`); if empty → unchanged. Else compute the effective set + apply §4 of
  the design (personal id → SSRF-guard baseURL [block ⇒ FAIL LOUD] + resolve secret → `ctx.personalApiKey`;
  enabled global → global resolve; disabled/unknown → `effectiveDefault`). Set `ctx.provider`/`modelName`/
  `isAnthropic` from the resolved record as today.
- `turn/stageStream.ts`: pass `resolvedApiKey: ctx.personalApiKey` into `streamChat`.

**Gate 2.6:** tests — personal id resolves to openai-compatible with the injected key + guarded fetch;
SSRF-block throws (fail loud, no global fallback); empty-config resolution is byte-identical (assert the
resolved rec equals the pre-change global resolve for a set of ids).

### 2.7 — Endpoints (FULL REVIEW)
- `api/admin/provider-personal.ts` (`PROVIDER_PERSONAL`, owner-scoped): GET → the caller's config entries each
  with `hasSecret` (NO value); PUT/POST → upsert config entries (validate: openai-compatible only, non-empty
  `baseURL` + `modelId`, id-namespacing; global-disable entries validated against real global ids); DELETE →
  remove a personal entry (+ its secret).
- Secret ops on the SAME endpoint or a `?secret` sub-route (your call, keep it one file):
  `PROVIDER_PERSONAL`-gated, owner-scoped — set/rotate (PUT value → store, echo NAME only) / delete. Validate
  the `provider_id` exists in the caller's config before storing. Audit each.
- `api/admin/provider-probe.ts` — the **sibling** of `mcp-probe.ts`: GET `?id=<personalProviderId>`
  (`PROVIDER_PERSONAL`), resolve the row SERVER-SIDE from the caller's own config (never a URL from the
  request), run `assertPublicHttpsUrl`, reachability-check `baseURL` (an OpenAI-compatible `GET /models` or
  HEAD via `ssrfGuardedFetch`), return NAMES/booleans/class ONLY: `reachable` / `unreachable` /
  `private-ip-blocked` / `auth`. Never a credential, never the raw error message.

**Gate 2.7:** a no-leak test proves no endpoint response contains a secret value; a 403 test proves a `user`
role is denied; an owner-scope test proves user A cannot read/probe user B's provider.

### 2.8 — Picker
`api/cwf/providers.ts`: return the caller's EFFECTIVE set (owner-scoped merge of global chat providers +
personal entries). Empty personal config → identical output to today. Personal providers appear ONLY in their
owner's picker. Never surface a secret / baseURL credential.

**Gate 2.8:** test — empty config == current output; a personal add appears; a global-disable removes it.

### 2.9 — UI
`PersonalProvidersSection.tsx` (gated: `if (!can(PERMISSIONS.PROVIDER_PERSONAL)) return null;` — the
`KindDraftsSection` template), placed in CONNECTION SETTINGS › LLM Providers:
- Add-a-provider form (label, baseURL, modelId), a guided **tunnel** helper (copy-paste cloudflared/ngrok
  snippet + a warning that a naked tunnel exposes your LLM → the auth field is effectively required), the
  **secret** field (masked; on save shows only a "secret set" state; rotate + clear; NEVER renders a value),
  a **Test connection** button (calls provider-probe, shows the class), and **toggles to disable GLOBAL
  providers for my sandbox** (writes the `{id:<globalId>, enabled:false}` overrides). `adminService`/
  `adminStore` gain owner-scoped CRUD, loaded only when the cap is held (mirror the KIND_DRAFT load guard).

**Gate 2.9:** rendered evidence at 1280 + 1024 (RULE 26 — nothing clips); the secret value never appears in DOM
after save (inspect).

### 2.10 — Tests
All of the above, plus: gate tests minted through REAL permission bundles (remove `PROVIDER_PERSONAL` from
`MAKER_PERMISSIONS` → the maker test fails at the capability layer). Coverage floor ratchets up, never down.

### 2.11 — Living-doc reseal (lock-step, two-commit seal)
Permission-matrix diagram: +1 row (`provider:personal`, maker). Add the A3 security-artifact note (SSRF guard,
two-table secret store, fail-loud). Bump `docVersion` (rev 50). `.agents/CHANGELOG.md` entry. Re-run the drift
gate → `[OK]`. Commit 1 = code; commit 2 = doc/reseal; merge `--no-ff`.

---

## 3. SELF-VERIFICATION (literal evidence in the report — NOT "build green")
- [ ] `git rev-parse origin/master` before (== `3dd0a95`) and the final merged HEAD hash (pushed; report the
  remote hash — merge isn't done until pushed).
- [ ] Full suite: exact `Tests N passed` + file count, before and after.
- [ ] `grep -rn "provider:personal" shared/permissions.ts` shows it in PERMISSIONS + MAKER_PERMISSIONS; other
  strings untouched (`git diff` of that file pasted).
- [ ] Migration DDL pasted: owner-CRUD policies on `llm_providers_personal`; NO client policy + REVOKE on
  `llm_provider_secrets`; append-only audit with NO value column. **State explicitly: migrations NOT applied
  (Operator gate).**
- [ ] SSRF tests named + passing (http reject, 127/169.254/10.x reject, rebinding-resolver reject, public
  allow, connect-time re-validation). State whether the SDK `fetch` option was used or a wrapper.
- [ ] Fail-loud test named + passing (SSRF-block / unknown personal id → throws, NO global fallback).
- [ ] Empty-config byte-identical test named + passing (resolution + picker).
- [ ] No-leak test named + passing (no endpoint/picker/probe response contains a secret value).
- [ ] Owner-scope test named + passing (user A cannot touch user B's rows).
- [ ] Frozen-file sweep = zero. `git diff --stat` pasted; confirm diff scope (code + CHANGELOG + manifest +
  frontend service only).
- [ ] Drift gate `[OK]` after; docVersion == rev 50.

---

## 4. REPORT FORMAT
Section per sub-phase (2.1–2.11) with the gate evidence; then §3 checklist filled with literal outputs; then
the commit ledger (code hash → doc hash → merge hash, pushed remote hash); then an explicit "MIGRATIONS
AUTHORED, NOT APPLIED — Operator gate pending" line. If ANY gate could not be met, STOP at that gate and report
— do not proceed or paper over it.

<!-- END · claude-code-PHASE-PROVIDER-PERSONAL-1-personal-provider-sandbox-v1 · 2026-07-07 · anchor 3dd0a95 -->
