# PHASE MCP-BACKEND-ID-1 — Thread `backend_id` through the MCP config UI + JSON import · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Code-grounded at
     master HEAD f020712 (916/916, 89 files, docVersion rev 43, drift [OK]). Closes the ONE
     remaining hole in the MCP config screen (RULE 29): a GLOBAL server for a NON-DEFAULT
     backend (e.g. Superset, a gateway) needs an explicit `backend_id`, but neither the JSON
     import (evaluateStrictEntry drops it) nor the tabular form sets it → a global Superset
     defaults to armes and mis-routes. This threads `backend_id` (a non-secret DATA field)
     through the frontend type, BOTH entry mechanisms (JSON import + tabular form + edit
     dialog), and the display mask. NO new secret handling, NO guard change, NO migration.
     Backend identity drives trust/scope/tool-pattern resolution → review the threading with
     care, but this touches no secret core. Architect writes this prompt (not AG). -->

---

## RULE 29 — amend (this phase closes an item the DONE contract missed)

Add clause **§8** to RULE 29 (the MCP-config DONE contract) in `AGENTS.md`:

> 8. **Backend identity is settable from the UI.** A global (or personal) server for a
>    non-default backend carries an explicit `backend_id` (DATA, not an enum) that BOTH the
>    JSON import and the tabular form/edit dialog can set, rendered verbatim (it is not a
>    secret). A server with no `backend_id` defaults to `DEFAULT_BACKEND_ID` (armes) — correct
>    for armes, wrong for a gateway like Superset, which MUST carry `backend_id: 'superset'`.

The auth/secret side (§1–§7) is already DONE (armes global is green via `apiKeyRef`). This is
the last field; after it, the MCP config screen is closed with no known gap.

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any change; paste evidence)

- [ ] Fresh clone; `git rev-parse origin/master` == **`f020712…`** (RULE 25 — verification starts here).
- [ ] `npm ci` clean; baseline **916/916 tests (89 files)** green BEFORE any change (paste counts).
- [ ] **Drift gate green** (`npm run check:doc-drift` → `[OK]`) on the untouched clone (paste the line).
- [ ] Read §1: the runtime already HONORS `server.backend_id` (`resolveActiveBackends.ts:27`
      `server.backend_id?.trim()`; `toolPatternOf(backend_id)` derives the gateway pattern) and the
      PUT already STORES it (`isValidServerEntry` validates id/name/transport/enabled, then upserts
      the whole object). The ONLY gaps are the frontend type + the two entry paths + the mask.

## 1. What this is + why armes worked but Superset did not

`backend_id` is authoritative DATA: each connected server's explicit `backend_id` decides its
backend (`resolveActiveBackends`), which drives the tool pattern (flat vs gateway,
`backendToolPattern.ts`), trust/authority, and scope. A server with NO `backend_id` defaults to
`DEFAULT_BACKEND_ID` = armes. So a global **armes** server added via JSON works even though the
import drops `backend_id` (the default is correct); a global **Superset** server cannot, because it
needs `backend_id: 'superset'` and no UI path sets it. This phase makes both entry paths carry it.

**Do NOT hardcode a backend enum.** The set of valid backend ids is DATA (rows in `public.backends`).
The form control is populated from the existing backends source the panel already uses (the same
list the trust/backends admin views read); if no client-side backends list exists yet, add a minimal
read of it — do NOT inline `['armes','superset']` as a literal union.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — `backend_id` is threaded through EVERY entry path.** The JSON import
(`src/lib/mcpConfig.ts evaluateStrictEntry`), the tabular Add form (`handleAddServer`), and the
Edit dialog (`saveEdit`) must all set/preserve `backend_id`. A round-trip test: import a JSON with
`"backend_id":"superset"` → the stored config carries `backend_id:'superset'` (not dropped, not
defaulted).

**2.2 — `backend_id` renders VERBATIM (it is not a secret).** Add it to
`maskMcpConfigForDisplay` alongside `apiKeyRef`/`apiKeyEnv` — shown in clear, never masked. It must
NOT be treated as a credential by `detectGlobalSecretViolation` (it isn't today; assert it stays
CLEAN — a global server with `backend_id` + `apiKeyRef` and no value passes the guard).

**2.3 — The personal + armes paths are unaffected.** A server with no `backend_id` still defaults to
armes at runtime (do NOT force a default into the config — absence must stay absence, so the existing
armes rows and all current behavior are byte-identical). Prove existing MCP tests pass unchanged.

**2.4 — No secret/guard/migration/resolver change.** This phase adds one non-secret field to the
type + two entry paths + the mask + a form control. `shared/mcpSecrets.ts`, `resolveAuthHeader.ts`,
`api/admin/mcp-secrets.ts`, and every migration stay untouched (0 files). Confirm with a diff stat.

**2.5 — The frontend type carries it.** Add `backend_id?: string` to `MCPServerConfig`
(`src/lib/mcpConfig.ts`) mirroring the api `MCPServerDef` (`api/cwf/_lib/turn/types.ts:55`).

## 3. GATED SUB-PHASES

**3-A · Types + import + mask.**
- `src/lib/mcpConfig.ts`: add `backend_id?: string` to `MCPServerConfig`; in `evaluateStrictEntry`
  add `backend_id: raw.backend_id || undefined` (next to `apiKeyRef`); in `maskMcpConfigForDisplay`
  emit `backend_id` verbatim when present.
- Tests: strict-import threads `backend_id`; mask shows it verbatim.

**3-B · Tabular Add form.** In `MCPSettingsTab.tsx`, add a **backend** control to the Add Server form
(a `<Select>` of valid backend ids from the backends registry, with a "— default (armes) —" option =
no `backend_id`). Thread `formBackendId` into `handleAddServer`'s config for BOTH global and personal
HTTP servers (and stdio). Absence ⇒ omit the field (keep the default behavior).

**3-C · Edit dialog.** Add the same backend select to the Edit dialog (`openEdit`/`saveEdit`) so the
EXISTING orange global `supersetArmes` row can be fixed in place — set `backend_id: 'superset'` +
`apiKeyRef: 'supersettoken'` and save, no re-import, no duplicate id. Prefill from `s.backend_id`.

**3-D · Tests + reseal.** Add `mcpSettingsTab.test.tsx` cases: add/edit a global server with a
backend_id; the strict-import round-trip. Two-commit seal; bump manifest `docVersion` (rev 43 → rev
44) and re-sync any mapped tab that depicts backend resolution (the Governance Model / control-plane
diagram if it names backend_id). Record RULE 29 §8 in `AGENTS.md`. Changelog in `.agents/CHANGELOG.md`.
**Diff-scope EXPLICITLY permits** `.agents/CHANGELOG.md` + the manifest reseal + the frontend service
method — do not forbid the changelog.

## 4. SELF-VERIFICATION (literal evidence, not "build green")

1. Baseline → final test counts, itemized (paste).
2. **Import round-trip (§2.1):** paste the test proving a JSON with `"backend_id":"superset"` +
   `"apiKeyRef":"supersettoken"` (no value) imports CLEAN to Global and the stored config carries
   `backend_id:'superset'`.
3. **Guard still clean (§2.2):** `detectGlobalSecretViolation({ url, apiKeyRef, backend_id:'superset' })`
   → null (accepted). Paste.
4. **Default preserved (§2.3):** a server with no `backend_id` stays without one (absence = armes at
   runtime); existing MCP tests pass. Paste.
5. **No secret-core touch (§2.4):** `git diff --stat f020712..HEAD` shows 0 changes to
   `shared/mcpSecrets.ts`, `resolveAuthHeader.ts`, `api/admin/mcp-secrets.ts`, `supabase/migrations/**`.
   Paste the stat.
6. **Edit-in-place works:** describe the Edit-dialog flow that sets `backend_id:'superset'` +
   `apiKeyRef:'supersettoken'` on the existing global `supersetArmes` row.
7. Seal: `tsc` (app + api + api.test) + `oxlint` clean; drift `[OK]`; docVersion rev 44; two `--no-ff`
   merges — paste code + changelog hashes. `origin/master` still `f020712` (held for push).

## 5. AFTER GREEN — owner activation (Architect surfaces; not the Author lane)

Once merged + live, the owner adds Superset globally, either path — SAME as armes:
- **JSON import → Global:**
  `{ "mcpServers": { "supersetArmes": { "transport":"sse", "url":"https://armes-reports2.ardich.com:8443/mcp", "apiKeyRef":"supersettoken", "backend_id":"superset" } } }`
  (dedupes by name → REPLACES the broken orange row).
- **or Edit the existing orange global `supersetArmes`** → set backend = superset + apiKeyRef =
  supersettoken → Save.
Then the Architect verifies from logs that the global Superset probes `ok` and routes as the gateway.
