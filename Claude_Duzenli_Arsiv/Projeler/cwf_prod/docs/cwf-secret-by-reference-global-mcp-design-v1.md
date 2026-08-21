# CWF — Secret-by-Reference for Global MCP Servers — Design Note · v1
<!-- rev 1 · 2026-07-06 · Design note (NOT a phase prompt). Precedes the AG phase prompt per the
     "design note BEFORE the phase prompt for security-relevant work" rule. Grounds the fix for
     the multi-user end-user gap surfaced by Maymun. Code-grounded at master HEAD 2f94a66.
     Author: Architect lane. -->

## 0. Purpose

For the end-user product (users in USER mode), every user must be able to query an
authenticated backend (ARMES) that a single admin configures ONCE. Today that is impossible: the
secret-guard (correctly) forbids a token in the world-readable global row, and the merge is
replace-by-id, so a personal row cannot inject *just a token* into a global shell. The only
working pattern today is ARMES fully duplicated in each user's personal row with the token — which
means a fresh end-user with no personal ARMES row gets **nothing** from ARMES. This note specifies
the fix: **a global MCP server carries a secret REFERENCE (an env-var name), not a secret value**;
the chat engine resolves the token server-side at request time. One global entry → all users
authenticated → the token lives only in env.

---

## 1. The gap (grounded)

- `mcp/mergeMcpServers.ts` is **replace-by-id**: a personal row with a global's id REPLACES the
  whole entry (not a field merge). So "global shell + personal token-only override" cannot work —
  the personal row would have to carry the full config (url + token), i.e. per-user duplication.
- `shared/mcpSecrets.ts` `detectGlobalSecretViolation` (correctly) rejects any global entry
  carrying `apiKey`/`headers`/`env` or a `Bearer`/`Authorization` in command/args. So a global
  server **cannot carry auth at all** today.
- Net: authenticated backends can only live in personal rows → no single-admin-config path for
  all end users. **This is a blocker for the USER-mode product, latent only because there is one
  user (super_admin) right now.**

The secret-guard is RIGHT and stays. What is missing is its counterpart: a way for a global
server to authenticate **by reference** rather than by value.

---

## 2. Ground-truth findings that shape the fix

1. **No `apiKeyEnv` field exists.** `MCPServerConfig` (src/lib/mcpConfig.ts) and `MCPServerDef`
   (api/cwf/_lib/turn/types.ts) both have `apiKey` (value) — the ref field is net-new, and slots
   next to `apiKey`.
2. **Exactly three sites build the outbound `Authorization` header**, all identical
   (`if (server.apiKey) headers['Authorization'] = 'Bearer ${server.apiKey}'`):
   `mcpClient.ts:124`, `mcpDiscovery.ts:73`, and the probe's `resolveTarget` (mcp-probe.ts). These
   MUST collapse to ONE shared resolver so the env path can't drift across them.
3. **No existing env resolution for MCP tokens** — net-new, but tiny (`process.env[name]`).
4. **The merge does NOT change.** A global row carrying `apiKeyEnv` is self-sufficient
   (url + ref); the existing replace-by-id merge already delivers global servers to every user.
   No `mergeMcpServers` change — the fix is purely additive at the header-build step + the field +
   the guard. (This is a major simplification over a field-level-merge approach.)

---

## 3. The mechanism

**3.1 — New field `apiKeyEnv?: string`** on `MCPServerConfig` + `MCPServerDef`: the NAME of an env
var holding the bearer token (e.g. `"ARMES_TOKEN"`). Non-secret. Validated to a safe pattern
(`^[A-Z][A-Z0-9_]*$`) so it can only name an env var, never be abused.

**3.2 — One shared resolver** `resolveAuthHeader(server): Record<string,string>` (a small pure-ish
helper, e.g. in `api/cwf/_lib/mcp/`). Precedence:
- `server.apiKey` present (a value) → `Authorization: Bearer <apiKey>` (today's behavior — personal
  rows keep working byte-identically).
- else `server.apiKeyEnv` present → read `process.env[apiKeyEnv]`; if set →
  `Authorization: Bearer <resolved>`; if UNSET → add NO header (graceful — the server then 401s and
  the probe shows `auth`; never crash, never fabricate).
- `server.headers` still merged after (unchanged).
All three header-build sites (§2.2) call this ONE helper. This is the entire injection.

**3.3 — The token value** lives in a Vercel env var (or the SSM-backed secret store), NEVER in any
DB row. The admin UI stores only the NAME (`apiKeyEnv`), mirroring the standing rule
"secret→env; the UI stores the env var NAME, never the value."

---

## 4. Why the merge stays unchanged (the simplification)

A global ARMES entry `{ id, name:'armesMes', transport:'sse', url, apiKeyEnv:'ARMES_TOKEN', backend_id:'armes', enabled:true }` is fully self-sufficient. `mergeMcpServers` already makes every
global server the baseline for every user's request (personal rows only override/disable by id).
So: one global entry → all users get authenticated ARMES, token resolved server-side from env.
**No per-user personal row, no merge change, no field-level merge machinery.** A user can still
disable it for themselves via a personal `{id, enabled:false}` override (existing behavior).

---

## 5. Secret-guard update (small, keeps the guard correct)

`detectGlobalSecretViolation` must:
- ALLOW `apiKeyEnv` (a name — not a secret) — but VALIDATE it against `^[A-Z][A-Z0-9_]*$`
  (reject a global entry whose `apiKeyEnv` is malformed).
- Keep BLOCKING `apiKey` (value), `headers`, `env`, and `Bearer`/`Authorization` in command/args.
So a global server authenticates ONLY by ref; a value in the global row is still refused. The
personal-accepts-values path is unchanged. Add a test: global entry with `apiKeyEnv:'ARMES_TOKEN'`
→ accepted; with `apiKey:'x'` → still 422; with a malformed `apiKeyEnv` → 422.

---

## 6. The stdio wrinkle + the ONE open decision

ARMES-MES today is **stdio** (`npx mcp-remote <url> --header "Authorization: Bearer <token>"`) —
the token is embedded in `args`, and the header is built by `extractHTTPFromStdioArgs`, not from
`apiKey`. The clean `apiKeyEnv` path (§3.2) targets the **http/sse** header-build. Two options:

- **(A) Recommended — convert ARMES-MES to a direct `sse`/`streamable-http` server** with
  `url` + `apiKeyEnv:'ARMES_TOKEN'`, dropping the `mcp-remote` stdio bridge. The codebase already
  speaks HTTP/SSE natively (`connectMcp`), and the Superset backend is ALREADY a direct SSE server —
  so the bridge is likely unnecessary. This removes the args-embedded token entirely and makes the
  guard/ref story clean.
  - **Needs one datapoint to confirm:** does ARMES-MES's endpoint speak MCP `streamable-http`/`sse`
    directly (so `connectMcp` can hit it without mcp-remote)? Superset already does, which is
    strong evidence ARDIC's gateway does too — but confirm before committing the config change.
- **(B) Fallback (only if ARMES-MES truly needs mcp-remote)** — support `${env:NAME}`
  interpolation inside args at request time. This reintroduces a `Bearer` string in the global
  args (guard-refinement wrinkle) and adds a templating surface. **Avoid unless (A) is impossible.**

**Architect rec: (A).** The core mechanism (§3–§5) is transport-agnostic and ships regardless;
ARMES-MES conversion is a config action, not code. Superset can use `apiKeyEnv` immediately.

---

## 7. Provisioning, rotation, and the daily-token payoff

- Set the value ONCE as a Vercel env var `ARMES_TOKEN` (or SSM secret). Every user's requests
  resolve it server-side.
- **Daily rotation becomes a ONE-place update** (the env var), not an Operator array-UPDATE across
  N user rows. New end-users get ARMES automatically. (Still manual until ARDIC issuance can be
  automated — but the toil drops from N rows to 1 var, and the per-user-provisioning burden is
  gone entirely.)
- Composes with MCP-UX-1's probe: an unset/expired `ARMES_TOKEN` surfaces as `auth` on the panel.

---

## 8. Open decision for Maymun + scope

**8.1 — The ARMES-MES endpoint (§6):** confirm ARMES-MES speaks direct sse/streamable-http (→ (A),
recommended) vs must keep mcp-remote (→ (B) fallback). If unknown, the phase builds the mechanism
(§3–§5, usable for Superset now) and ARMES-MES conversion follows once confirmed.

**8.2 — Scope of the phase:** field + shared resolver + guard update + tests (+ the UI affordance
to set `apiKeyEnv` on a server, per the admin-panel rule — a NAME field, never a value). Explicitly
NOT: changing `mergeMcpServers`; a secrets *store* UI (env is the store); ARDIC token automation
(source-blocked); args-interpolation (unless 8.1 forces (B)).

---

## 9. What this is NOT

- **Not a merge change.** The global row is self-sufficient; replace-by-id is untouched.
- **Not a relaxation of the secret-guard.** Values are still refused from global; only a NAME is
  allowed. The guard gets stricter (validates the name), not looser.
- **Not ARDIC-token automation.** That is source-blocked (manual token); this only moves the token
  to one env-resolved place and makes it serve all users.
- **Security posture:** touches the chat-path header build (the byte-identical files from MCP-UX-1)
  + the secret-guard + env resolution of a secret → **FULL REVIEW**, with a test that an unset
  `apiKeyEnv` degrades gracefully (no header, no crash, no leak) and that the personal `apiKey`
  path stays byte-identical.
