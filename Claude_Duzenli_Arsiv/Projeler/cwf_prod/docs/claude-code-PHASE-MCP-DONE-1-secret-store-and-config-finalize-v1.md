# PHASE MCP-DONE-1 — MCP Secret Store + Config Finalize (finish the MCP screen, once) · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Code-grounded at
     master HEAD b165c34 (887/887, 87 files, docVersion rev 42, drift [OK]). This is the
     CLOSING phase for the MCP configuration screen: it makes credential management fully
     UI-driven and daily-rotatable with NO Vercel env edit and NO redeploy, by adding an
     isolated service-role-only secret store that a GLOBAL server references. It also fixes
     the dead-end error copy and pins a DONE contract (RULE 29) so we never reopen this screen.
     SECURITY-RELEVANT (secret storage + the auth resolver + the write guard + a migration on a
     secret table + the probe) → FULL REVIEW, not hotfix mode. Migration = TWO gates: AG AUTHORS
     the .sql; the Operator APPLIES it to the live DB; the Architect confirms via a schema read.
     Architect writes this prompt (not AG) so the independent review-gate is not collapsed. -->

---

## RULE 29 — the MCP-config DONE contract (this is WHY this phase exists; pin it)

The MCP configuration screen is **DONE** — and must not be reopened for another UI/UX pass —
when ALL of the following hold. Every future MCP change must fit inside this contract, not
re-litigate it:

1. **Personal secrets** (a user's own server): a value lives in the user's `mcp_settings` row
   (owner-scoped RLS, ADR-002), rotatable from the edit dialog's masked token field (shipped in
   MCP-UX-1). No Vercel, no redeploy.
2. **Global secrets** (one entry serving ALL users): a global server carries only a **reference**,
   never a value — either `apiKeyRef` (names a row in the new isolated `mcp_secrets` store,
   THIS phase) or `apiKeyEnv` (names an `MCP_`-prefixed env var, MCP-SECRET-REF-1). The token
   itself is resolved SERVER-SIDE at request time.
3. **Daily rotation of a global secret is a single UI action with NO redeploy** — the super_admin
   updates the stored secret value once in the panel; every user picks it up on the next request.
4. **A secret VALUE is never returned to any client** — not to a panel GET, not to chat/discovery,
   not to the probe. The store's read path is service-role-only; the UI shows secret NAMES +
   metadata + a masked "•••• set" indicator, never a value.
5. **The write guard fail-closes** on any secret VALUE in a global row (`apiKey`/`headers`/`env`/
   Bearer-in-args), and the error copy names the two legitimate reference paths (`apiKeyRef`,
   `apiKeyEnv`) so it never reads as a dead-end.
6. **One shared auth resolver** builds every outbound Authorization header (chat client, discovery,
   probe) with a single precedence order — no divergent inline copy.
7. **Import round-trips every field** (`apiKey` masked, `apiKeyEnv` verbatim, `apiKeyRef` verbatim)
   — nothing silently dropped.

When §1–§7 are true and verified, MCP-config is CLOSED. Record RULE 29 in `AGENTS.md`.

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any change; paste evidence)

- [ ] Fresh clone; `git rev-parse origin/master` == **`b165c34…`** (RULE 25 — verification starts here).
- [ ] `npm ci` clean; baseline **887/887 tests (87 files)** green BEFORE any change (paste counts).
- [ ] **Drift gate green** (`npm run check:doc-drift` → `[OK]`) on the untouched clone (paste the line).
- [ ] Read §1 (the secret store is service-role-ONLY at both read and write — model it on
      `20260630163000_mcp_global_settings_revoke_select.sql` + `20260630180000_provider_audit.sql`)
      and §2 (the resolver becomes async with precedence apiKey → apiKeyRef → apiKeyEnv → none;
      the personal `apiKey` OUTPUT stays byte-identical).

---

## 1. What this delivers + the security cores

Today a global MCP server cannot carry auth (the guard rightly forbids a value in a row that is
distributed to every user via `mergeMcpServers` + returned by the panel GET). MCP-SECRET-REF-1 added
`apiKeyEnv` (an env-name pointer) but rotating it means a Vercel env edit + redeploy — too heavy for
a token that expires daily. THIS phase adds an isolated, service-role-only **secret store** the panel
manages, plus an `apiKeyRef` pointer, so **daily rotation is one UI action with no redeploy**.

**SECURITY CORE A — the store is service-role-only, both directions.** `mcp_secrets` has RLS enabled,
NO client policy, and REVOKE select+write from `anon`+`authenticated` (exactly the
`mcp_global_settings_revoke_select` posture). Only the service role (chat resolver + gated admin
endpoint) ever touches it. A browser can never read a value, even if it forges a query.

**SECURITY CORE B — a value never leaves the server.** The admin GET returns secret NAMES + metadata
+ a boolean "is set", NEVER the value. The resolver injects the value only into an outbound
Authorization header built server-side. No value in a DB row that ships to clients, no value in logs,
telemetry, the probe response, or the audit table (audit stores name + action + actor only).

**SECURITY CORE C — the guard still fail-closes on values in global.** `apiKeyRef` (a name) and
`apiKeyEnv` (an `MCP_` name) are CLEAN for global; `apiKey`/`headers`/`env`/Bearer-in-args are refused
with a 422 **before** upsert. `apiKeyRef` needs no `MCP_` prefix — the store itself is the boundary
(a ref can only resolve a value a super_admin explicitly stored), so an unknown ref resolves NOTHING.

---

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — `mcp_secrets` is service-role-only at read AND write.** No client SELECT/INSERT/UPDATE/DELETE
policy; REVOKE all from `anon`+`authenticated`. Prove with an Operator (or test) read that an
`authenticated`-role query returns 0 rows / 42501, while the service role reads the row.

**2.2 — Personal `apiKey` OUTPUT stays byte-identical.** `resolveAuthHeader` may become async, but for
`{apiKey:'x'}` it must still yield exactly `{ Authorization: 'Bearer x' }`. All existing MCP tests pass
(await-adjusted only where they call the resolver). Prove parity.

**2.3 — ONE shared async resolver; the three sites collapse to it.** `mcpClient.ts`, `mcpDiscovery.ts`,
and `mcp-probe.ts` all `await resolveAuthHeader(server)` (or a single async `dialAuthHeader`). Precedence
inside the ONE function: (1) `apiKey` value → Bearer; (2) `apiKeyRef` → read `mcp_secrets` via service
role → Bearer (unknown/empty ref → no header + warn NAME only); (3) `apiKeyEnv` (`MCP_` allowlist) → env
→ Bearer; (4) else `{}`. `grep -rn 'Bearer ${' api/ shared/` matches ONLY inside the resolver.

**2.4 — A secret value NEVER reaches a client or a log.** The admin GET omits values; the probe response
omits values; every warn/error names the ref/env NAME only. Add a test that plants a store value and
asserts it is absent from the admin GET body, the probe body, and any logged line.

**2.5 — Guard reason copy + UI copy name the reference paths.** The 422 reason and the panel error text
must read like: "a global server carries secrets by reference — use `apiKeyRef` (a stored secret) or
`apiKeyEnv` (an MCP_ env var), not a raw value." No more "import to Personal or remove the secret" as the
only guidance.

**2.6 — Migration is authored here, applied by the Operator.** AG writes the `.sql` (two of them: the
`mcp_secrets` table + the `mcp_secret_audit` table, or one file with both) following the referenced
patterns; AG does NOT claim it is applied. The self-verify explicitly states "authored, awaiting Operator
apply" — the Architect confirms application via a schema read before the phase is CLOSED.

**2.7 — No secret literal in code or tests.** Fixtures use obviously-fake values (`fake-token-…`). No
real token anywhere.

---

## 3. GATED SUB-PHASES

**3-A · Migration (AUTHOR only).** Add `supabase/migrations/2026070X…_mcp_secrets.sql`:
- `public.mcp_secrets ( name text primary key, value text not null, updated_at timestamptz not null
  default now(), updated_by uuid references auth.users(id) )`. Reuse `set_updated_at()` trigger.
  `comment on column value` = 'Sensitive: MCP bearer token. Service-role-only; never returned to a client.'
- RLS enable; NO policies; `revoke select, insert, update, delete, truncate on public.mcp_secrets from
  anon, authenticated;` (model: `mcp_global_settings_revoke_select`).
- `public.mcp_secret_audit` append-only, mirroring `provider_audit`: `id uuid pk`, `actor_user_id uuid`,
  `secret_name text not null`, `action text check in ('set','rotate','delete')`, `created_at timestamptz`.
  RLS: `select using (public.is_super_admin(auth.uid()))`; no write policy; REVOKE writes from
  anon+authenticated. **NO value column — names + action + actor only.**
- `notify pgrst, 'reload schema';`
- Add `MCP_SECRETS` + `MCP_SECRET_AUDIT` to `shared/dbConstants.ts DB_TABLES`.

**3-B · Repository.** `api/cwf/_lib/persistence/repositories/McpSecretsRepository.ts` (mirror
`McpGlobalSettingsRepository`, service-role `getServiceClient()`):
- `get(name): Promise<string | null>` — value for the resolver (service-role read).
- `list(): Promise<{ name, updatedAt, updatedBy }[]>` — **metadata only, NO value** (for the admin GET).
- `set(name, value, actor): Promise<boolean>` — upsert + append `mcp_secret_audit` (`set` if new, `rotate`
  if existing). Never logs the value.
- `remove(name, actor): Promise<boolean>` — delete + audit `delete`. Export from `persistence/index.ts`.

**3-C · Resolver (the byte-identity + precedence core).** In `api/cwf/_lib/mcp/resolveAuthHeader.ts` make
the exported entry async with precedence apiKey → apiKeyRef → apiKeyEnv → none (per §2.3). The apiKeyRef
branch reads `new McpSecretsRepository().get(ref)`; empty/unknown → `{}` + `console.warn` naming the ref
only. Keep the personal-apiKey output byte-identical. Update the three call sites to `await`. Extend
`resolveAuthHeader.test.ts`: apiKeyRef resolves when the store has it; unknown ref → `{}`; a store value
never appears in a warn line; precedence apiKey > apiKeyRef > apiKeyEnv.

**3-D · Guard + error copy.** In `shared/mcpSecrets.ts detectGlobalSecretViolation`: treat a non-empty
`apiKeyRef` as CLEAN (it is a name). Keep all value rejections. Update the reason string per §2.5. In
`api/admin/mcp-settings.ts` the 422 already surfaces the reason — verify it now reads the new copy. In
`src/components/admin/MCPSettingsTab.tsx` update the panel error text (both TR + EN) to name `apiKeyRef`/
`apiKeyEnv`.

**3-E · Secrets admin endpoint.** `api/admin/mcp-secrets.ts` (mirror `mcp-settings.ts` /
`providers.ts`): `authed → ensurePermission`:
- `GET` (`CONFIG_GLOBAL`) → `{ secrets: [{ name, updatedAt, updatedBy }] }` — **names + metadata only**.
- `PUT` (`CONFIG_GLOBAL`) → body `{ name, value }` → `repo.set` → `{ ok:true, name }` (value never echoed).
- `DELETE` (`CONFIG_GLOBAL`) → `{ name }` → `repo.remove`. Add `mcpSecrets` API tests (auth gate, no-value-
  in-response, set/rotate/delete audited).

**3-F · UI — the "finish it" ergonomics.** In `MCPSettingsTab.tsx`, super_admin-only:
- A **Secrets** subsection: list secret names + "updated" + a masked "•••• set" chip; "Add secret"
  (name + masked value); "Rotate" (masked value field; new value replaces, blank cancels); "Delete".
- In the Add/Edit **global** server form: `apiKeyRef` is a **select of existing secret names** (plus the
  existing `apiKeyEnv` field for the env path). Personal form unchanged.
- Thread `apiKeyRef` through the strict import (`src/lib/mcpConfig.ts evaluateStrictEntry`) and
  `maskMcpConfigForDisplay` (render VERBATIM — it is a name, like `apiKeyEnv`). Add `apiKeyRef?: string`
  to `MCPServerConfig` (src/lib) and `MCPServerDef` (api types).

**3-G · Probe.** No change needed beyond §2.3 (it already routes through the shared resolver, which now
handles `apiKeyRef`) — but add a probe test: an `apiKeyRef` global server probes `ok` when the store has
the value, `auth` when it does not; the value never appears in the probe response.

**3-H · Reseal + docs.** Two-commit seal. Bump manifest `docVersion` (rev 42 → rev 43) and re-sync any
mapped tab that depicts the MCP/auth path (the Governance Model diagram had a one-clause MCP-SECRET-REF-1
update — extend it for the store). Add RULE 29 to `AGENTS.md`. Changelog entry in `.agents/CHANGELOG.md`.
**Diff-scope EXPLICITLY permits** `.agents/CHANGELOG.md`, the manifest reseal, and the frontend service
method — do not forbid the changelog.

---

## 4. SELF-VERIFICATION (literal evidence, not "build green")

1. Baseline → final test counts, itemized by new file (paste).
2. **Store isolation (§2.1):** paste a query proving `authenticated` cannot read `mcp_secrets`
   (42501 / 0 rows) while the service role can. (Author-side: a test with an anon/authenticated client.)
3. **Value never leaves (§2.4):** paste the test asserting a planted store value is absent from the
   admin GET body, the probe body, and logged lines.
4. **Personal parity (§2.2):** `resolveAuthHeader({apiKey:'x'})` → `{Authorization:'Bearer x'}`; existing
   MCP tests pass. Paste.
5. **Precedence + ref resolution (§2.3):** apiKeyRef resolves from the store; unknown ref → `{}`;
   `grep -rn 'Bearer \${' api/ shared/` matches ONLY the resolver. Paste.
6. **Guard (§2.5/§3-D):** `apiKeyRef:'armes-daily'` on a global row → accepted; `apiKey:'x'` → 422 with
   the new reference-naming copy. Paste both.
7. **Rotation is UI-only:** describe the exact panel flow that rotates the ARMES token with NO Vercel /
   NO redeploy (Secrets → Rotate → next request picks it up).
8. **Migration status:** state literally "AUTHORED — awaiting Operator apply" + the two `.sql` paths.
   Do NOT claim applied.
9. Seal: `tsc` (app + api + api.test) + `oxlint` clean; drift `[OK]` (all tabs); docVersion rev 43;
   two `--no-ff` merges — paste code + changelog hashes. `origin/master` still `b165c34` (held for push).

---

## 5. AFTER GREEN — the activation (Architect surfaces to the owner; do NOT do these in the Author lane)

- Operator applies the migration to the live DB → Architect confirms via schema read (the second gate).
- Owner (UI, no Vercel): Secrets → Add secret `armes-daily` = current ARMES token (masked). Add/convert
  the GLOBAL ARMES `sse` server to carry `apiKeyRef: armes-daily` (+ `backend_id` defaults to armes).
- Daily rotation forever after: Secrets → Rotate `armes-daily` → paste new token → done. No redeploy.
