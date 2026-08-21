# FIX-3 — power_user session MCP management: complete closure
**rev 1 · 2026-07-01 · target base HEAD `f4bd4e0` (master)**

**Intent (final — do not leave any part open):** a power_user must, in their OWN session, get the global MCP servers by default, be able to ADD personal servers, AND toggle an existing GLOBAL server on/off **for their session only, without ever mutating the global config**. Audit found: the merge ENGINE (`loadUserMcpServers` in `chat.ts`) already supports all three (global baseline → personal override by id → personal-only add → enabled filter, read-time, global never written), and the governance/RLS is correct (global = super_admin/`CONFIG_GLOBAL`/service-role; personal = owner-CRUD). **But three things are open, and this phase closes ALL of them in one PR so it is never revisited:**
- **GAP 1 (the real bug):** the "disable a global for my session" capability has **no UI affordance** — the global-server toggle is `disabled` (inert) for non-super_admin, there is no override button, yet the help text promises "you can disable global ones." The engine supports it; the UI doesn't expose it.
- **GAP 2:** the merge engine (the thing that makes req 1–3 correct) is **untested** — `loadUserMcpServers` is private to `chat.ts` and referenced nowhere else. A silent regression would ship green.
- **GAP 3:** a personal MCP connection stores a **raw `apiKey` in the owner's `mcp_settings` row**, unmasked on reload, with no settled governance decision.

Three gated sub-fixes (3A → 3B → 3C), each its own commit, shipped as ONE PR.

---

## HARD PRE-FLIGHT GATE (abort if any check fails — paste evidence)
1. `chat.ts` `loadUserMcpServers`: merges `McpGlobalSettingsRepository().get()` + `McpSettingsRepository().getByUserId(userId)`; a personal row with the SAME id as a global **replaces** it (can disable); unique personal ids are added; then `.filter(s => s.enabled !== false)`. Confirm this logic is present and unchanged.
2. `src/components/admin/MCPSettingsTab.tsx`: global-server rows render `<Switch ... disabled />` when `!canGlobal` (inert for power_user); the InlineHelp for the personal section claims "you can add extra servers or disable global ones."
3. `src/store/mcpStore.ts` exposes `addServer`, `removeServer`, `updateServer`, `toggleServer`, `setServers` operating on the user's own `mcp_settings` (owner-CRUD via `saveMCPSettingsToSupabase`).
4. `MCPServerConfig` (`src/lib/mcpConfig.ts`) has `apiKey?: string` (raw), NO `apiKeyEnv`; `saveMCPSettingsToSupabase` upserts `{ user_id, servers }` (the raw apiKey lands in the row). The add-form apiKey input is `type="password"`.
5. There is NO unit test exercising the global+personal merge (`loadUserMcpServers` appears only in `chat.ts`).

---

## HARD CONSTRAINTS (whole phase)
- **A personal action NEVER writes global.** Every session-scoped change goes to the user's own `mcp_settings` (owner-CRUD). `mcp_global_settings` is written ONLY by the existing super_admin/`CONFIG_GLOBAL` path — untouched here. The disable-a-global-for-me affordance must be structurally incapable of mutating global.
- **Do not weaken the governance gates.** `canGlobal = can(CONFIG_GLOBAL)` still guards the true global writes/toggles/deletes for super_admin. The new affordance is ADDITIVE for non-super_admin and is owner-scoped.
- **Secrets (RULE 0):** the personal `apiKey` is NEVER logged, audited, or emitted in telemetry, and NEVER sent to any user other than its owner. No `.env` reads/writes.
- **Zero migration.** Reuse the existing override-by-id merge model; do NOT add a table/column for "disabled globals" — a personal row `{id, enabled:false}` IS the override the engine already honors.
- **RULE 20:** `chat.ts` maps to Architecture Map / Runtime Topology; extracting the merge helper is below their altitude (a pure function move, no behavior change) — verify and reseal if mapped. `src/**` is unmapped. Seal in the same commit if a mapped area changed; paste the doc diff + `check:doc-drift`.
- One sub-fix = one commit.

---

## SUB-FIX 3A — the "disable a global for my session" affordance (GAP 1)

**Model:** the global-server row toggle becomes interactive for non-super_admin, backed by a personal override.
- **Effective state** shown on each global row = `personalOverrideById.get(g.id)?.enabled ?? (g.enabled !== false)`.
- **super_admin** path is UNCHANGED: `canGlobal` → the toggle calls the existing `handleGlobalToggle` (writes global).
- **non-super_admin** path (new): the toggle is enabled and, on change:
  - turning a global **OFF** → `mcpStore.addServer({ id: g.id, name: g.name, transport: g.transport, url: g.url, enabled: false })` — a personal override the merge honors (same id → personal wins → filtered out). This writes ONLY to `mcp_settings`.
  - turning it back **ON** → `mcpStore.removeServer(g.id)` — deletes the override so the global shows through enabled again (clean; no stale copy of the global config is kept).
- **Personal section hygiene:** filter out personal rows whose id matches a global id — they are override-shadows, not standalone personal servers, and must NOT appear as phantom entries in the "Personal MCP Servers" list. The personal list = personal rows with ids NOT present in the global set.
- The InlineHelp promise ("you can disable global ones") is now TRUE — leave it, it is accurate.

**3A self-verify (evidence):**
- Paste the `MCPSettingsTab.tsx` diff: non-super_admin global toggle is interactive; effective-state derivation; personal-section filters out override-shadows. Confirm `canGlobal` still gates all TRUE-global writes/deletes.
- A render/store test: as a power_user, toggling a global OFF calls `addServer({id: <globalId>, enabled:false})` and NEVER a global-write path; toggling ON calls `removeServer(<globalId>)`. Paste it.
- Manual-observable: power_user disables a global in their session → their next chat omits that backend's tools; a DIFFERENT user's session (and `mcp_global_settings`) is unchanged. (You run; I read Vercel logs / you confirm.)

---

## SUB-FIX 3B — make the merge engine testable + regression-proof (GAP 2)

**Do:**
1. Extract the PURE merge from `loadUserMcpServers` into a testable helper, e.g. `mergeMcpServers(globalRows, personalRows): MCPServerDef[]` in `api/cwf/_lib/mcp/mergeMcpServers.ts` (or the nearest existing `_lib` home). `loadUserMcpServers` keeps doing the two DB reads, then calls the helper. **No behavior change** — byte-identical result.
2. Unit-test the helper:
   - no personal rows → returns the enabled global set (**req 1: global default**);
   - a unique personal id → added (**req 2: personal add**);
   - a personal row with a global's id + `enabled:false` → that global is **absent** from the result AND the input `globalRows` array is **not mutated** (**req 3: session-disable without touching global**);
   - a personal row with a global's id + `enabled:true` (override that re-enables) → present;
   - `enabled !== false` filter honored.

**3B self-verify (evidence):**
- Paste the extraction diff + confirm `loadUserMcpServers`'s output is unchanged (the helper is a pure move).
- Paste the new test file + `npm run test` (count rises).
- `npm run build` + `oxlint` clean.

---

## SUB-FIX 3C — settle the personal-secret model (GAP 3)

**Decision (final, committed — this is the closure, not a deferral):** a personal MCP connection's secret is a **user-owned credential with no environment path** (users cannot set Vercel env vars), so it MUST live in the user's own `mcp_settings` row (owner-only RLS). The env-name-pointer pattern used for the LLM provider registry does NOT apply here and must NOT be forced. Harden the model instead:
1. **UI masking on reload/edit:** when editing an existing server, do NOT prefill the raw `apiKey` into the input. Show a masked "set / ••••" state with a "Replace key" action; only send a new value if the user types one (an empty field on save = keep the existing key, do not overwrite with blank). The add-form input stays `type="password"`.
2. **No-leak guarantee:** verify (and add a guard/comment where a reader exists) that the personal `apiKey` is never written to logs, `telemetry_events`, or `user_audit`, and never returned to a non-owner. The chat-path already reads it server-side only — confirm no code path echoes it to the client beyond the owner's own settings fetch.
3. **ADR:** add a short decision record `docs/adr/ADR-002-personal-mcp-secrets.md` (or the repo's ADR home) stating: personal MCP secrets are owner-scoped, RLS-protected, never env (no user-env path), masked in the UI, never logged/audited/telemetried. Link it from the CHANGELOG so the decision is discoverable and **not re-litigated**.

**3C self-verify (evidence):**
- Paste the `MCPSettingsTab.tsx` diff for masked edit (no raw-key prefill; replace-only; blank-keeps-existing).
- A test: editing a server without touching the key preserves the stored key (save payload does not blank it); a reload does not expose the raw key in an editable field.
- Paste the ADR + the CHANGELOG link. Confirm no log/audit/telemetry path carries the apiKey.

---

## FINISH — report for architect review
- 3 sub-fix commits (+ seal if a mapped area changed) on a branch → PR to `master`; paste `git log --oneline` for the range + green CI checks.
- State plainly, each verified: (1) a power_user can disable a global for their session and it writes ONLY their `mcp_settings`, global + other users unchanged; (2) the merge engine is now a tested pure helper covering req 1–3; (3) personal secrets are owner-scoped, masked, never logged, ADR-recorded.
- Confirm no true-global write path or governance gate was weakened, and the merge behavior is byte-identical to before (the extraction is a pure move).
