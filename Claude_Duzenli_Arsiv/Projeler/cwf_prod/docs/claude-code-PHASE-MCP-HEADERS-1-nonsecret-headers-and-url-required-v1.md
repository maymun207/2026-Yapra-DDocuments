# PHASE MCP-HEADERS-1 — Header-name-aware global guard + required-URL form validation · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Code-grounded at
     master HEAD 9dda837 (922/922, 89 files, docVersion rev 44, drift [OK]). Root cause found
     from PRODUCTION evidence, not code alone: the Superset gateway (an SSE-style MCP endpoint
     behind :8443) REQUIRES a non-secret `Accept: application/json, text/event-stream` header —
     the owner's original PERSONAL config (sse + Accept + Authorization) probed GREEN at 10:19;
     every global recreation probed `error` because (a) streamable-http was the wrong transport
     for this endpoint and (b) detectGlobalSecretViolation blocks ALL headers wholesale, so a
     global row can never carry the non-secret Accept. Second, separately-confirmed defect: the
     tabular Add form validates only `name`, so an empty URL silently creates a broken url-less
     row (probes red). This phase (1) refines the guard from "any headers" to CREDENTIAL-NAME
     headers, (2) requires a URL for non-stdio adds/edits, closing the last MCP-config gap.
     SECURITY-RELEVANT (it loosens the secret-to-global guard) → FULL REVIEW. No migration.
     Architect writes this prompt (not AG). -->

---

## RULE 29 — amend §5 (the guard clause) + add §9

Amend RULE 29 §5 in `AGENTS.md`: the write guard fail-closes on any secret VALUE in a global row —
`apiKey`, **credential-named headers** (not all headers), `env`, Bearer-in-args. Add:

> 9. **Non-secret transport headers are legitimate global config.** A global server may carry
>    headers whose NAMES are non-credential (e.g. `Accept`, `Content-Type`); the guard blocks by
>    HEADER NAME (`authorization`, `proxy-authorization`, `cookie`, `set-cookie`, `x-api-key`,
>    `api-key`, `x-auth-token`) and additionally blocks ANY header whose VALUE matches a
>    credential marker (`Bearer `, `Basic `) regardless of name — belt and braces. The Add form
>    requires a URL for non-stdio transports (no silent url-less rows).

## 0. HARD PRE-FLIGHT GATE (all literally true; paste evidence)

- [ ] Fresh clone; `git rev-parse origin/master` == **`9dda837…`**.
- [ ] `npm ci` clean; baseline **922/922 (89 files)** green BEFORE any change (paste).
- [ ] **Drift gate green** (`npm run check:doc-drift` → `[OK]`) untouched clone (paste).
- [ ] Read §1: this LOOSENS a security guard — the loosening must be name+value bounded, and the
      existing block cases (raw apiKey, Authorization header, env, Bearer-in-args) must STAY
      blocked, proven by keeping every existing guard test green UNCHANGED.

## 1. The security core of the loosening

`detectGlobalSecretViolation` currently rejects `isNonEmptyRecord(entry.headers)` wholesale. Replace
with per-header inspection:

- **Block by NAME (case-insensitive):** `authorization`, `proxy-authorization`, `cookie`,
  `set-cookie`, `x-api-key`, `api-key`, `x-auth-token` → reason names the header (never the value).
- **Block by VALUE marker (any name):** a string value containing `Bearer ` or `Basic `
  (case-insensitive) → blocked; a token can hide under a custom name (`X-Custom: Bearer eyJ…`).
- **Everything else** (`Accept`, `Content-Type`, custom non-credential names with plain values) →
  CLEAN for global.

Keep the ONE definition in `shared/mcpSecrets.ts` (guard + client mirror both import it). The server
PUT (`api/admin/mcp-settings.ts`) needs no change beyond the shared function's new behavior.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — Every existing block case stays blocked, tests UNCHANGED.** Raw `apiKey`; an
`Authorization` header (by name); a Bearer-in-args stdio; `env` records — all still 422. Existing
guard tests pass without edits. New tests add: `{headers:{Accept:'application/json, text/event-stream'}}`
→ CLEAN; `{headers:{'X-Custom':'Bearer x'}}` → BLOCKED (value marker); `{headers:{cookie:'a=b'}}` →
BLOCKED (name).

**2.2 — No secret-core touch beyond the guard.** `resolveAuthHeader.ts`, `api/admin/mcp-secrets.ts`,
`McpSecretsRepository`, migrations: 0 changes (paste the scoped diff stat). The chat-path header merge
already applies `server.headers` after the resolved auth (verified at `mcpClient.ts` /
`mcpDiscovery.ts` / probe) — no runtime change needed for global headers to take effect.

**2.3 — Required URL for non-stdio (the silent-broken-row defect).** In `MCPSettingsTab.tsx`
`handleAddServer` AND `saveEdit`: a non-stdio config with a blank URL is refused with an inline
message (TR+EN), no row created/saved. Server-side belt: `api/admin/mcp-settings.ts
isValidServerEntry` requires a non-empty `url` when `transport !== 'stdio'` (and `command`+`args`
when stdio). RTL test: submit with empty URL → no `addServer`/`saveGlobal` call + message shown.

**2.4 — Headers editable/importable for global.** The JSON import already threads `headers`
(`evaluateStrictEntry`); the import preview's blocked-mirror now accepts non-credential headers for
Global (it mirrors the shared function — automatic). The Edit dialog + masked JSON view: keep masking
header VALUES for credential-NAMED headers; render non-credential header values VERBATIM (Accept is
not a secret; masking it hides legitimate config). Update `maskMcpConfigForDisplay` accordingly with
the same shared name-list.

**2.5 — Fixture honesty.** No real secret literal; fixtures obviously fake.

## 3. GATED SUB-PHASES

**3-A · Shared guard refine.** `shared/mcpSecrets.ts`: export `CREDENTIAL_HEADER_NAMES` (the list) +
`isCredentialHeader(name, value)`; rewrite the headers branch of `detectGlobalSecretViolation` per §1.
Tests per §2.1.

**3-B · Mask refine.** `maskMcpConfigForDisplay`: mask only credential-named header values (import the
same list); non-credential header values verbatim. Tests: Accept verbatim; Authorization masked.

**3-C · Required URL.** Form + edit validation (§2.3) + server-side `isValidServerEntry` tightening +
tests (client RTL + endpoint 422).

**3-D · Reseal + docs.** Two-commit seal; docVersion rev 44 → 45; re-sync the Governance Model clause
(§5 amend + §9); RULE 29 §5/§9 in `AGENTS.md`; CHANGELOG + SKILL-KB. Diff-scope EXPLICITLY permits
`.agents/CHANGELOG.md` + manifest reseal.

## 4. SELF-VERIFICATION (literal evidence)

1. Baseline → final counts, itemized (paste).
2. **Loosening bounded (§2.1):** paste the three new guard tests (Accept clean · X-Custom-Bearer
   blocked · cookie blocked) AND confirm every pre-existing guard test passes UNCHANGED (0 edits to
   the old cases).
3. **Secret-core untouched (§2.2):** scoped diff stat = empty for resolver/secrets endpoint/repo/
   migrations. Paste.
4. **URL required (§2.3):** RTL empty-url refusal + endpoint 422 test. Paste.
5. **Mask (§2.4):** Accept verbatim, Authorization masked. Paste.
6. Seal: tsc ×3 + oxlint clean; drift `[OK]`; docVersion rev 45; two `--no-ff` merges held for push;
   `origin/master` still `9dda837`.

## 5. AFTER GREEN — owner activation (Architect surfaces; the recipe that was green at 10:19)

Global JSON import (dedupes by name → replaces the broken row) — the owner's ORIGINAL shape, with
the value swapped for the reference:

```json
{"mcpServers":{"supersetArmes":{
  "transport":"sse",
  "url":"https://armes-reports2.ardich.com:8443/mcp",
  "headers":{"Accept":"application/json, text/event-stream"},
  "apiKeyRef":"supersettoken",
  "backend_id":"superset"
}}}
```

Also: delete the broken url-less personal row. Then the Architect verifies from logs the global
Superset probes `ok` and routes as the gateway.
