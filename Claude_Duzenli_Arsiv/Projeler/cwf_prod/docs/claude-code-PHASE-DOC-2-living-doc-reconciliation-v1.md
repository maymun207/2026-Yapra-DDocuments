# Claude Code — PHASE DOC-2: Living Architecture Document Reconciliation
**rev 1 · 2026-06-30 · target: `cwf_yaprak` @ HEAD `768bd6d` · scope: DOC-ONLY (no source, no behavior change)**

You are reconciling the 5 narrative diagrams of the Living Architecture Document with the code as it
actually stands at `768bd6d`, then sealing the freshness manifest. This is a documentation-truth phase.
You will NOT change a single line of runtime code, schema, or test.

---

## 0. WHY THIS PHASE EXISTS (diagnosis — read before touching anything)

The 5 diagram HTML files have **not been edited since the DOC-1 birth commit `151153e`.** Every "sync"
since then (`9de7d3e`, `5e8bb8a`) bumped only the manifest *number* — asserting the diagrams were
accurate without showing it. The manifest is frozen at `a262403`.

Since `a262403`, **8 commits across 3 feature lines moved manifest-mapped code areas**, and none
re-drew the diagrams:
- **MCP-ADMIN** (`ea16f52`) — new `mcp_global_settings` table + repo + `api/admin/mcp-settings.ts`; `chat.ts` now merges global⊕personal MCP servers; new dual-scope admin "MCP" tab; legacy sidebar MCP panel removed.
- **Security audit** (`42fbac8`, `f4ae23a`) — REVOKE SELECT on `mcp_global_settings` (H1), HSTS/CSP headers (M1/M2), PUT body validation (H3), dead-panel + dep cleanup (L1/D1).
- **PROV-1 / PROV-2** (`a262403` baseline, surfaced by `06126f6`) — `llm_providers` registry as governed DATA; new `PROVIDER_MANAGE` permission; `api/admin/providers.ts` + `provider_audit` table + gated "Providers" admin tab; chat picker now fed FROM the registry via `api/cwf/providers.ts`.

**All 5 tabs are drifted.** Two concrete consistency bugs were found and MUST be fixed here:
1. **Table-count is wrong AND self-contradictory.** Architecture Map says *"13 tables"*, Request Lifecycle says *"all 12 tables"* — they disagree with each other, and the **true count is 18**.
2. **The drift-guard is blind to top-level `api/cwf/*.ts` endpoints.** PROV-2's new `api/cwf/providers.ts` is matched by NO tab's `codeAreas` glob, so the guard never warned about it. Fixed in DOC-2F.

Because this phase is **doc-only**, the manifest seal target is the current code HEAD `768bd6d`: after your
edits, `git diff 768bd6d` touches only `public/architecture/**`, which matches NO `codeAreas` glob, so the
seal goes immediately green.

---

## 1. HARD PRE-FLIGHT GATE — abort and report if ANY check fails

```bash
# G1 — exact HEAD
test "$(git rev-parse --short HEAD)" = "768bd6d" || echo "ABORT G1: HEAD is not 768bd6d"

# G2 — clean tree
test -z "$(git status --porcelain)" || echo "ABORT G2: working tree dirty"

# G3 — manifest is frozen at a262403 (all 5 tabs)
test "$(grep -c '"lastSyncedCommit": "a262403"' public/architecture/manifest.json)" = "5" \
  || echo "ABORT G3: manifest not at a262403x5 — state differs from diagnosis"

# G4 — true table count is 18 (do NOT proceed on a guessed number)
N=$(grep -rhiE 'create table' supabase/migrations/ | grep -ioE 'create table (if not exists )?public\.[a-z_]+' \
    | sed -E 's/.*public\.//' | sort -u | wc -l)
test "$N" = "18" || echo "ABORT G4: table count is $N, not 18 — STOP and report the delta"
```

If any line prints `ABORT`, **stop the phase and report**. Do not improvise a fix.

---

## 2. HARD CONSTRAINTS

- **DOC-ONLY.** You may edit files under `public/architecture/` ONLY. You may NOT touch any `api/**`,
  `shared/**`, `src/**`, `supabase/**`, `vercel.json`, `scripts/**`, `package*.json`, or any test. If you
  believe a code change is required, **STOP and report** — it is out of scope by definition.
- **Use the FACTS in §3 verbatim.** Do not invent table names, permission names, endpoints, or counts.
  If you need a fact not listed in §3, STOP and ask. (The whole point of this phase is to stop the
  "asserted accurate without checking" pattern — every value below was read from the repo at `768bd6d`.)
- **Preserve each diagram's visual language.** New nodes/rows/cells REUSE the diagram's own existing CSS
  classes and color tokens (`.node`, `.new`, `.badge`, `.seqrow`, the table `<tr>` format, etc.). No new
  design system, no restyling, no inline CSS beyond matching a sibling element.
- **Each diagram is a versioned artifact.** Where a diagram carries an internal rev/version in its header
  or HTML comment, bump it (Runtime Topology `rev 3` → `rev 4`; bump others' `· vN` ONLY if their depicted
  content changed — all 5 change here). Never silently overwrite the semantic of a prior rev.
- **No secrets.** Never read or print `.env*`, MCP tokens, keys, or JWT secrets.
- **WARN→FAIL escalation of `checkDocDrift.ts` is OUT OF SCOPE** (see §6). Do not touch the script.

---

## 3. FACTS (authoritative — read from the repo at `768bd6d`; use verbatim)

### 3.1 The 18 public tables (the true count)
```
backend_authority · backends · conversations · domain_rules · llm_providers · mcp_global_settings ·
mcp_settings · messages · provider_audit · routing_cache_meta · rule_audit · rule_kinds ·
rule_versions · telemetry_events · tool_category_cache · user_audit · user_backend_scopes · user_roles
```

### 3.2 Grant model (from `shared/grantPolicy.ts`) — `verifyGrants` is now **18/18**
- **16 SERVER_ONLY** (REVOKE writes from anon + authenticated): telemetry_events, messages,
  rule_versions, rule_audit, tool_category_cache, routing_cache_meta, domain_rules, rule_kinds,
  user_roles, user_backend_scopes, user_audit, backends, backend_authority, **llm_providers**,
  **mcp_global_settings**, **provider_audit**.
- **2 OWNER_CRUD** (REVOKE anon only; authenticated writes own rows): mcp_settings, conversations.
- The claim *"RLS + REVOKE on every one"* **still holds at 18** — the 3 new tables are all SERVER_ONLY.

### 3.3 The 3 NEW tables (since the diagrams were last true) + their posture
| table | role | write model | provenance |
|---|---|---|---|
| `llm_providers` | LLM provider registry — governed DATA, DB-first/code-floor, Zod-locked structure | SERVER_ONLY | PROV-1 (`a262403`) |
| `mcp_global_settings` | platform-wide global MCP servers (super_admin-managed singleton) | SERVER_ONLY · **SELECT REVOKED** anon+auth (held MCP bearer tokens — security H1) | MCP-ADMIN (`ea16f52`) + `…163000` |
| `provider_audit` | append-only audit of provider mutations (mirrors `user_audit`) | SERVER_ONLY · super_admin SELECT | PROV-2 (`06126f6`) |

### 3.4 New permission
- `PROVIDER_MANAGE` — **super_admin-only**. In `ALL_PERMISSIONS`, **NOT** in `MAKER_PERMISSIONS`
  (`permissions.test` asserts MAKER_DENIED — matrix honesty). Enforced server-side at `api/admin/providers.ts`.

### 3.5 New / changed surfaces
- **Admin "MCP" tab** (`MCPSettingsTab`) — dual-scope: Global (super_admin) + Personal (owner). MCP settings
  were **removed from the sidebar/ChatShell** (legacy `MCPSettingsPanel` deleted — security L1).
- **Admin "Providers" tab** (`ProvidersTab`) — gated `llm_providers` editor; `apiKeyEnv` NAME pointer +
  env-status badge (NEVER the secret value); default (gemini) + router (gemini-lite) anti-brick.
- **`chat.ts` `loadUserMcpServers()`** now resolves the effective server set as
  **`mcp_global_settings` ⊕ `mcp_settings` (global ⊕ personal, personal wins, enabled-only)**.
- **Endpoints:** `api/admin/mcp-settings.ts` (GET panel-access / PUT super_admin, validated body),
  `api/admin/providers.ts` (GET / POST upsert / POST toggle / DELETE, super_admin),
  `api/cwf/providers.ts` (authed GET — feeds the chat picker from `exposedAsChat` registry rows).

### 3.6 Security audit = fold-in, NOT a new box
HSTS / CSP `unsafe-eval` removal (vercel.json), the `@vercel/node` bump, and the dead-panel deletion are
**below diagram altitude** — no diagram box. Their only architecture-relevant bit is the **REVOKE SELECT
posture of `mcp_global_settings`**, which folds into that table's depiction in §3.3 (already captured).

---

## 4. GATED SUB-PHASES (do in order; verify each before the next)

### DOC-2A — Architecture Map (`diagrams/architecture-map.html`)
1. **L423** data-layer heading: replace `Data — Supabase (13 tables, RLS + REVOKE on every one)`
   → `Data — Supabase (18 tables, RLS + REVOKE on every one)`.
2. **L440** grant claim: replace `verifyGrants 12/12` → `verifyGrants 18/18` (16 server-only + 2 owner-crud).
3. In the **Client** zone, the `MCP settings` box now depicts a **gated Admin-panel tab (global + personal hybrid)**, not a standalone sidebar panel — annotate accordingly (the sidebar panel was removed).
4. In the **Agent core / LLM gateway** area, add that the provider set is the **`llm_providers` registry (DB-first/code-floor)**, picker fed via `api/cwf/providers.ts`.
5. In the **Data** zone (or its node list), make the new tables visible: `llm_providers`, `mcp_global_settings`, `provider_audit` (mark `.new` per the diagram's convention). Keep the count consistent with step 1.
6. Bump the header `· v6` → `· v7` (or the diagram's equivalent version token).

### DOC-2B — Runtime Topology (`diagrams/runtime-topology.html`)
1. The enabled-server set feeding `discoverMcpTools` / `resolveActiveBackends` now resolves from
   **`mcp_global_settings` ⊕ `mcp_settings` (global ⊕ personal, personal wins)**. Add ONE node or edge in
   the `chat.ts` server zone reflecting this hybrid source (reuse `.node.new` / `.edge.is-new`).
2. Update the HTML header comment and the `<h1>` badge: `rev 3 · P6` → **`rev 4`** with a one-line note
   that rev 4 adds the hybrid global/personal MCP-server resolution. Keep the dual-backend assembly content
   intact (it is still accurate).
3. Do NOT add a table list to this diagram — it depicts topology, not the schema. The persistence-table
   additions are below its altitude (captured by Architecture Map / Request Lifecycle / Governance Model).

### DOC-2C — Request Lifecycle (`diagrams/request-lifecycle.html`)
1. **L464** section heading: replace `DB access · all 12 tables · who reads / writes / who may mutate`
   → `DB access · all 18 tables · who reads / writes / who may mutate`.
2. In that per-table DB-access block, add rows for the 3 new tables using the block's existing row format,
   with the posture from §3.3 (all server-written; `mcp_global_settings` SELECT-revoked; `provider_audit`
   super_admin-read; `llm_providers` registry).
3. Where the lifecycle resolves MCP servers, annotate the step: server set = global ⊕ personal merge (§3.5).
4. In the **Admin governance lane**, note the two new gated write endpoints (`api/admin/mcp-settings.ts` PUT,
   `api/admin/providers.ts` POST) — the "only write path into knowledge" invariant is unchanged (these are
   *config/registry* writes, gated; they are not knowledge/eval-gate writes). Keep that invariant's wording intact.
5. Bump `· v2` → `· v3`.

### DOC-2D — LLM Control Surface (`diagrams/llm-control-surface.html`)
1. **L416** (consolidated matrix, CP8 row) — the data source is WRONG. Replace the CP8 source cell
   `llm/config.ts · env` → `llm_providers registry (DB-first/code-floor) · apiKeyEnv→env`.
2. **CP8 detail card** (around L315–L320) — the mechanism text says `provider = forced-or-default (gemini)`.
   Update it to reflect that the provider/model set now resolves through the **`llm_providers` registry**
   (DB-governed values, code floor); the secret is still `apiKeyEnv → env` (never the value). This is the
   diagram's own *"DB-governed where values must flex; code-fixed where identity must not"* principle made literal.
3. Do NOT add a 14th control point — provider selection was already CP8; only its source changed.
4. Bump `· v1` → `· v2`.

### DOC-2E — Governance Model (`diagrams/governance-model.html`) — the largest edit
1. **Role × permission matrix** (thead at L190): add a `<tr>` for `PROVIDER_MANAGE` matching the existing
   row format — columns: `user ✗`, `power_user ✗` (MAKER_DENIED), `super_admin ✓`, hard enforcement =
   `api/admin/providers.ts · grantPolicy SERVER_ONLY`, status = `LIVE`. (Optionally add an MCP-global-settings
   access row if the matrix tracks endpoint access; `api/admin/mcp-settings.ts` PUT is super_admin-only.)
2. **Per-table governance table** (the block containing the `mcp_settings` row ~L262): add 3 rows using the
   same `<tr>` format:
   - `llm_providers` — `registry / governed DATA` · super_admin · `gated (Providers tab) · RLS deny direct` · `to-reference (code floor)` · `LIVE`.
   - `mcp_global_settings` — `config (global)` · super_admin · `gated (MCP tab) · SELECT REVOKED · RLS deny` · `—` · `LIVE`.
   - `provider_audit` — `audit` · `— (system)` · `written by every provider mutation · super_admin SELECT` · `—` · `view TARGET`.
   *(Pre-existing omissions `backend_authority`, `routing_cache_meta`, `user_audit` are SHOULD-if-trivial — add factually if you do, else leave the block labeled "representative". The 3 above are MUST.)*
3. **Implementation sequencing** (steps 1–5 end at L297 "Tool Routing tab"): append the now-shipped admin
   surfaces as new `.seqrow` items — step 6 **MCP settings tab (hybrid global/personal governance)**, step 7
   **Providers tab — gated LLM registry** (substrate: PROV-1 `llm_providers` as DATA). Match the `.seqrow` format.
4. Bump `· v1` → `· v2`.

### DOC-2F — Manifest seal + glob-gap fix + docVersion (`manifest.json`, `index.html`)
1. **Seal:** set `lastSyncedCommit` to **`768bd6d`** for ALL 5 tabs (replace every `a262403`).
2. **docVersion:** bump `manifest.json` `"docVersion": "rev 1 · 2026-06-30"` → `"rev 2 · 2026-06-30"`,
   and `index.html` L84 `<span … id="docVersion">rev 1 · 2026-06-30</span>` → `rev 2 · 2026-06-30`.
3. **Glob-gap fix** (the guard's blind spot): in the `codeAreas` of **Architecture Map** and
   **Request Lifecycle**, change `"api/cwf/chat.ts"` → `"api/cwf/*.ts"` so top-level endpoints
   (`api/cwf/providers.ts`) are seen by the drift-guard going forward. Leave `api/cwf/_lib/**` as a separate
   entry (it already covers the lib tree; `*.ts` is non-recursive and won't double-match it).

---

## 5. SELF-VERIFICATION — paste EVIDENCE, not claims

Run and paste the raw output of each:

```bash
# V1 — DOC-ONLY proof: every changed path is under public/architecture/
git diff --name-only
#   EXPECT: only public/architecture/** paths. ANY api/shared/src/supabase/vercel.json path = FAIL.

# V2 — table-count fixed and consistent (no stale 12/13 remains)
grep -rn "18 tables" public/architecture/diagrams/architecture-map.html public/architecture/diagrams/request-lifecycle.html
grep -rn "12 tables\|13 tables" public/architecture/diagrams/   # EXPECT: no matches

# V3 — grant claim updated
grep -n "verifyGrants 18/18" public/architecture/diagrams/architecture-map.html   # EXPECT: 1 match

# V4 — new permission + new tables present where required
grep -n "PROVIDER_MANAGE" public/architecture/diagrams/governance-model.html      # EXPECT: ≥1
grep -c "llm_providers\|mcp_global_settings\|provider_audit" public/architecture/diagrams/governance-model.html  # EXPECT: ≥3

# V5 — CP8 source corrected
grep -n "llm_providers" public/architecture/diagrams/llm-control-surface.html     # EXPECT: ≥1
grep -n "llm/config.ts · env" public/architecture/diagrams/llm-control-surface.html  # EXPECT: 0 for the CP8 source cell

# V6 — runtime topology rev bumped
grep -n "rev 4" public/architecture/diagrams/runtime-topology.html                # EXPECT: ≥1

# V7 — manifest sealed + glob fixed + version bumped
grep -c "a262403" public/architecture/manifest.json                               # EXPECT: 0
grep -c "768bd6d" public/architecture/manifest.json                               # EXPECT: 5
grep -c "api/cwf/\*.ts" public/architecture/manifest.json                         # EXPECT: 2
grep -n "rev 2 · 2026-06-30" public/architecture/manifest.json public/architecture/index.html  # EXPECT: 2 hits

# V8 — THE acceptance gate: the drift-guard now reports clean
npm run check:doc-drift
#   EXPECT: "[check:doc-drift] [OK] no drift -- all 5 narrative tabs synced."

# V9 — full diffs for architect review (paste in full)
git --no-pager diff public/architecture/
```

**Report must include:** the raw output of V1–V8, the full V9 diff, and an explicit statement that NO
file outside `public/architecture/` was touched. If `check:doc-drift` is not OK, the phase is NOT done —
find the unsynced mapped change and either reflect it or record why it is below altitude, then re-run.

---

## 6. OUT OF SCOPE (do NOT do — named so you don't "helpfully" add them)

- **WARN→FAIL escalation of `checkDocDrift.ts` (TD-5).** Deferred BY DESIGN, not forgotten. A build-time
  FAIL conflicts with the two-commit seal workflow that FUTURE mixed code+doc phases need: you cannot bump
  `lastSyncedCommit` to a commit SHA that does not exist yet at edit time (DOC-1 solved this with a separate
  seal commit, which a build-time FAIL would break by failing the intermediate build). This doc-only phase
  doesn't hit that wrinkle — its base `768bd6d` already exists — but flipping the global mode does. The right
  place for FAIL enforcement is the PR/merge layer, in its own phase. **Do not edit `checkDocDrift.ts`.**
- **Any runtime/code/schema/test change.** If a diagram seems to demand one, the diagram is wrong about the
  code, or the code has a real bug — either way, STOP and report; do not "fix" code from a doc phase.
- **Re-architecting the diagrams.** Reconcile, don't redesign. Smallest honest edit that makes each tab true.

---

## 7. COMMIT (single commit, doc-only)

```
docs(doc-2): reconcile the 5 living-architecture diagrams with code @ 768bd6d + seal manifest

- Architecture Map: 18 tables (was 13), verifyGrants 18/18, MCP-in-admin + 3 new tables, registry picker
- Runtime Topology rev 4: hybrid global⊕personal MCP-server resolution
- Request Lifecycle v3: 18 tables (was 12) + 3 per-table rows + admin-lane endpoints
- LLM Control Surface v2: CP8 data source corrected llm/config.ts·env -> llm_providers registry
- Governance Model v2: +PROVIDER_MANAGE matrix row, +3 per-table rows, +2 sequencing steps
- Manifest: seal all 5 tabs a262403 -> 768bd6d; docVersion rev 2; fix glob gap (api/cwf/*.ts)
- check:doc-drift -> OK (5/5 synced). Doc-only: no source/schema/test touched.
```

After commit, report the new HEAD short-SHA so the architect can clone-and-diff verify against `768bd6d`.
