# Claude Code 4.8 — FOUNDATION (Part 1: Data Layer)
### New CWF Supabase project · versioned migrations · persistence repository layer · telemetry schema
> Run with Claude Code 4.8 (AntiGravity add-on) from inside the clean CWF service repo (post-SEED). This is **Part 1 of the Foundation**: it stands up the CWF service's own Supabase data layer. It is **additive and non-breaking** — the chat must keep working exactly as it does today and the login flow is NOT touched. Auth, per-user resolution, and server-side MCP config come in **Part 2**.

---

You are building the data foundation for the CWF service on its **own, new Supabase project** (separate from the old simulation project). Phase scope: versioned schema migrations, a centralized persistence layer behind a repository interface, repointing the existing Supabase usage to the new project, and the telemetry schema. **No auth changes, no request-contract changes, no agent refactor in this part.**

## MANUAL PREREQUISITE (the user does this before running you)
- The user has created a **new, dedicated CWF Supabase project** and provided its connection. You receive it via environment / Supabase CLI link — NEVER as raw values pasted into code:
  - `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` (in `.env.local`, git-ignored), and/or the project linked via `supabase link`.
- If the project is not linked and these env vars are absent, do NOT guess — produce the migration SQL and stop with a clear instruction for the user to apply it.

## HARD CONSTRAINTS (non-negotiable)
- **Non-breaking.** The chat (`/api/cwf/chat`) must behave identically after this part. Do NOT change the login, the request contract, or the agent loop.
- **Secrets via env only.** Never read/write/print `.env*` real values. All DB connections use `$SUPABASE_*` env vars or the linked CLI. The ARMES token and any service-role key must never appear in code, logs, migration files, or chat. If one does, STOP and flag it as a security incident.
- **Migrations are version-controlled SQL.** No schema is created by clicking in the console. Everything lives in `supabase/migrations/*.sql`, reviewable and reproducible.
- **One persistence layer.** No scattered `createClient` calls. After this part, exactly one backend client factory and one frontend client exist; all DB access goes through typed repositories.
- **RULE 1 (no static values).** Table names, retention windows, and any tunables live in config/env, not as inline literals scattered across modules.
- **Definition of done = green + chat still works.** `tsc -b`, `vite build`, `oxlint`, `vitest` all green, and the chat verified working against the new project's env.

## PRE-FLIGHT
1. Read `.agents/AGENTS.md`, `.agents/CHANGELOG.md`, and the cwf-project-kb skill. Confirm post-SEED state (HEAD hash, clean tree, green baseline test count).
2. Confirm the live agent is `api/cwf/chat.ts` and that `api/cwf/_lib/toolCategories.ts` still references `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` (the repoint target) and `src/lib/mcpSettingsService.ts` uses the frontend `supabaseClient`.
3. Verify the new project connection is available (env vars present or `supabase status` shows a linked project). If not, proceed to write migrations but stop before applying, per the prerequisite rule.

## TASKS

### F1.1 — Schema migrations  →  `supabase/migrations/`
Author versioned SQL migrations creating the CWF schema on the new project. Match the existing data shapes so current behavior fits.
- `mcp_settings`: `user_id uuid` (FK → `auth.users(id)`, ON DELETE CASCADE), `servers jsonb not null default '[]'`, `updated_at timestamptz default now()`. **RLS enabled**: a user may select/insert/update/delete only their own row (`auth.uid() = user_id`). The `servers` jsonb is sensitive (contains MCP tokens) — its row is owner-only; never expose to other roles. (Auth wiring that populates `user_id` is Part 2; the table + RLS are created now.)
- `tool_category_cache`: `keyword text primary key`, `categories text[] not null`, `updated_at timestamptz default now()`. **RLS enabled**: global SELECT allowed (read-only learning shared across instances); INSERT/UPDATE only via the service role (so clients cannot poison the learned mapping). Document this in a comment.
- `telemetry_events`: `id uuid pk default gen_random_uuid()`, `user_id uuid null` (FK → `auth.users(id)` ON DELETE SET NULL), `session_id text`, `ts timestamptz default now()`, `type text` (check in: `'message','llm_call','tool_call','error'`), `model text`, `input_tokens int`, `output_tokens int`, `total_tokens int`, `tool_name text`, `latency_ms int`, `cost_estimate numeric`, `payload jsonb`. **RLS enabled**: a user sees only their own events; service role writes. Add an index on `(user_id, ts)` and on `(session_id)`. Add a comment noting a retention policy and PII handling are required before production (KVKK/GDPR) — payload must be redacted of secrets/PII at write time.
- Enable `pgcrypto`/`gen_random_uuid()` if needed.
Keep table/column names as the single source of truth; reference them from a `config` constants module on the code side, not as repeated string literals.

### F1.2 — Backend persistence layer  →  `api/cwf/_lib/persistence/`
Centralize all backend Supabase access behind typed repositories. (This is the EAIP persistence seam; it will relocate to `_core/` in the later restructure — keep the interface clean now.)
- `client.ts`: a single service-role client factory reading `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` from env (no inline literals, no second `createClient` anywhere in `api/`).
- `repositories/ToolCacheRepository.ts`: `getAll()` / `upsert(keyword, categories)` — typed; replaces the inline dynamic-import `createClient` currently inside `toolCategories.ts`.
- `repositories/McpSettingsRepository.ts`: `getByUserId(userId)` / `upsert(userId, servers)` — typed (used server-side in Part 2; define the interface now).
- `repositories/TelemetryRepository.ts`: `record(event)` — typed; not yet wired into the agent loop (emission is a later observability step), just the repository + types.
- Define a small `Repository` interface/types file so all repos share a shape (swappable later for non-Supabase backends).

### F1.3 — Repoint existing usage to the persistence layer
- `api/cwf/_lib/toolCategories.ts`: replace its inline `createClient` + `.from('tool_category_cache')` calls with `ToolCacheRepository`. Behavior identical; it now points at the new project via the centralized client. Keep the in-memory cache layer as-is.
- `src/lib/supabaseClient.ts` (frontend): ensure it is the single frontend client, reading the new project's `SUPABASE_URL` / anon key (via `VITE_`-prefixed envs as appropriate). `src/lib/mcpSettingsService.ts` keeps using it for now (auth-driven `userId` arrives in Part 2).
- `.env.example`: ensure the CWF Supabase vars (service-role for backend, anon for frontend) are present and clearly labeled; remove any leftover simulation-project vars.

### F1.4 — Optional data carry (global tool cache only)
If — and only if — the user supplies **read** credentials for the OLD simulation project via separate env vars (e.g. `OLD_SUPABASE_URL`, `OLD_SUPABASE_SERVICE_ROLE_KEY`), write a one-off, idempotent script `scripts/migrate-tool-cache.ts` that copies `tool_category_cache` rows (global, not user-keyed) from old → new. Do NOT migrate `mcp_settings` here — it is user-keyed and will be re-keyed to the new auth uid in Part 2. Never hardcode either project's creds; redact nothing-sensitive but never print keys. If old creds are absent, skip silently — the cache will re-learn at runtime.

### F1.5 — Verify
1. Apply migrations to the new project (`supabase db push` if linked, else output SQL + stop per prerequisite). Confirm the three tables + RLS policies exist (`supabase db diff` / a verification query through the service-role client).
2. `tsc -b`, `vite build`, `oxlint`, `vitest run` — all green.
3. **Chat smoke test**: with the new project's env, confirm `/api/cwf/chat` still answers a representative ARMES query end-to-end (tool calls fire, table/raw output flows) and that `tool_category_cache` reads/writes go to the new project. Behavior must match pre-change.
4. Commit: `feat(foundation): CWF Supabase data layer — migrations, persistence repositories, telemetry schema`.

## SELF-VERIFICATION CHECKLIST (end your run by confirming each, with evidence)
- [ ] Post-SEED baseline recorded (HEAD, clean tree, test count).
- [ ] Migrations authored under `supabase/migrations/`; three tables created with RLS as specified; applied to the new project (or SQL emitted + user instructed if unlinked).
- [ ] Exactly one backend service-role client factory; no other `createClient` remains in `api/` (grep proof). `toolCategories.ts` now uses `ToolCacheRepository`.
- [ ] One frontend client; `.env.example` reflects the new CWF project only; no simulation-project vars remain.
- [ ] No `.env*` real value read/written; no service-role key or ARMES token in any code, migration, log, or output.
- [ ] Telemetry schema present with RLS + indexes + the retention/PII comment; `TelemetryRepository` defined (emission deferred).
- [ ] Optional tool-cache data carry: done (old creds supplied) or skipped (absent) — state which.
- [ ] `tsc -b`, `vite build`, `oxlint`, `vitest` all green — exact numbers.
- [ ] Chat smoke test passed against the new project; behavior unchanged from pre-Foundation; tool cache hits the new project.
- [ ] Login flow and request contract were NOT changed (confirm).
- [ ] State explicitly: **"Foundation Part 1 complete — CWF data layer live, additive, chat unchanged. Ready for Part 2 (auth + per-user + server-side MCP resolution)."**

Do not start Part 2 (auth), the `_core/` restructure, or the agent refactor. Stop after the checklist and present your report.
