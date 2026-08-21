# Claude Code 4.8 — FOUNDATION (Part 2: Auth + Per-User + Server-Side MCP Resolution)
### Supabase Auth · authenticated identity through the request · ARMES token off the client
> Run with Claude Code 4.8 (AntiGravity add-on) from the CWF service repo, **after Foundation Part 1 is verified-live**. This part makes the service multi-tenant: real Supabase Auth replaces the static login, the authenticated `userId` flows through every request, and each user's MCP config (including the ARMES token) is resolved **server-side** so the token never reaches the browser. This part DOES change the login and the request contract — do it carefully, keep the chat working end-to-end, and verify before commit.

---

## HARD PRE-FLIGHT GATE (stop if any fails)
Before doing anything, independently verify Part 1 is **live**, not just authored. If any check fails, STOP and instruct the user to finish Part 1 verification — do not proceed.
1. The new CWF Supabase project is linked / env present (`supabase status` or `SUPABASE_*` set). 
2. The three tables exist in the new project with RLS enabled — query them (e.g. `select tablename from pg_tables where schemaname='public'` and confirm `mcp_settings`, `tool_category_cache`, `telemetry_events`; verify `rowsecurity = true`).
3. `auth.users` is reachable and the user has created the **first auth user** (from the previously-buried credentials). If no user exists yet, STOP and ask the user to create it (Supabase dashboard → Authentication → Add user, or an admin script).
4. The Part 1 chat smoke test passed against the new project (tool calls fire, `tool_category_cache` writes land there). If unconfirmed, STOP.

## HARD CONSTRAINTS (non-negotiable)
- **Keep the chat working.** The end-to-end chat must succeed for an authenticated user before you commit. If you can't verify it, stop and report — do not commit a broken auth flow.
- **Token off the client is the whole point.** After this part, the ARMES token (and any MCP server secret) must NOT appear in any browser-side request payload, JS bundle, or response. Prove it.
- **Secrets via env only.** Never read/write/print `.env*` real values; no service-role key, JWT secret, or ARMES token in code, logs, or chat. If one appears, STOP and flag it.
- **RULE 1.** No new hardcoded literals; reuse `shared/dbConstants.ts` and config/env.
- **Definition of done = green + auth works + token off the wire.** `tsc -b`, the dedicated `api/` typecheck, `vite build`, `oxlint`, `vitest`, plus a manual authenticated chat run, all pass.

## PRE-FLIGHT
Read `AGENTS.md`, `CHANGELOG.md`, the skill. Record HEAD + baseline test count. Confirm `McpSettingsRepository` (from Part 1) is present and that `mcp_settings` RLS is owner-only.

## TASKS

### A2.1 — Frontend: replace static login with Supabase Auth
- Replace the static credential check in `src/components/ui/LoginPage.tsx` with Supabase Auth email/password sign-in via the frontend `supabaseClient.auth.signInWithPassword`.
- Wire `src/store/authStore.ts` to the Supabase session: persist/restore session, expose `user`/`userId`/`accessToken`, handle sign-out, and subscribe to `onAuthStateChange`.
- Gate the app behind an active session (unauthenticated → login screen).
- Remove the `VITE_AUTH_USERNAME` / `VITE_AUTH_PASSWORD` usage and delete those vars from `.env.example` (they were client-bundle-exposed; real auth replaces them).

### A2.2 — Backend: authenticate the request, derive userId
- In `api/cwf/chat.ts`, require and verify the caller's Supabase session: read the access token from the `Authorization: Bearer` header, verify it server-side (e.g. `supabaseClient.auth.getUser(accessToken)` using a server client), and derive `userId`. Reject unauthenticated requests with 401.
- Pass `userId` into the agent context (do not trust any client-supplied user identity).

### A2.3 — Server-side MCP config resolution (token off the client)
- The backend, using the authenticated `userId`, loads that user's MCP config from `mcp_settings` via `McpSettingsRepository` (service role) and builds the MCP server list (including the ARMES URL + token) **server-side**.
- The frontend STOPS sending `mcpServers` / tokens in the request body. Update `src/lib/cwfService.ts` and `api/cwf/chat.ts` request contract accordingly; the client sends only the message, history, language, and its session token.
- **Demo safety valve (optional, documented):** behind a config flag (default per the user's choice), optionally accept client-sent config as a transitional fallback. If enabled, document it and ensure it is clearly temporary; the secure default is server-side only.

### A2.4 — Frontend MCP settings keyed by the real user
- `src/components/ui/MCPSettingsPanel.tsx` + `src/lib/mcpSettingsService.ts`: load/save the authenticated user's config to `mcp_settings` keyed by the **session userId** (the real `auth.uid()`), via the frontend client under owner-only RLS.
- After this part, the user signs in and **re-enters their ARMES MCP config once** through the UI; it persists to the new project keyed by their auth uid. (This is the recommended path — robust and simple.)

### A2.5 — (Optional) re-key existing config instead of re-entering
Only if the user explicitly supplies old-project read creds AND the old→new `user_id` mapping: write an idempotent `scripts/rekey-mcp-settings.ts` that copies the old `mcp_settings` row to the new project re-keyed to the new auth uid. Secrets via env only; never print the token. Default recommendation: skip this; use A2.4 UI re-entry.

### A2.6 — Verify (this is a behavior-changing part — verify thoroughly)
1. `tsc -b`, the dedicated `api/` typecheck, `vite build`, `oxlint`, `vitest run` — all green.
2. **Auth flow:** sign in as the first user via Supabase Auth; confirm session persists and sign-out works; unauthenticated access is blocked.
3. **End-to-end chat:** as the authenticated user (with their ARMES config saved in `mcp_settings`), run a representative ARMES query; confirm tool calls fire and the answer is correct — identical quality to pre-Part-2.
4. **Security proof (the core goal):** inspect the browser Network tab for the `/api/cwf/chat` request — confirm the body contains NO `mcpServers`, NO ARMES URL, NO token; confirm the token does not appear in the JS bundle. State the evidence.
5. **RLS proof:** confirm a user cannot read another user's `mcp_settings` row (owner-only).
6. Commit: `feat(foundation): Supabase Auth + per-user identity + server-side MCP config resolution`.

## SELF-VERIFICATION CHECKLIST (end your run by confirming each, with evidence)
- [ ] Pre-flight gate passed: tables live + RLS on, first auth user exists, Part 1 smoke confirmed. (If it failed, you stopped here.)
- [ ] Static `VITE_AUTH_*` login replaced by Supabase Auth; vars removed from `.env.example`; app gated behind a session.
- [ ] Backend verifies the session server-side and derives `userId`; unauthenticated requests rejected (401).
- [ ] MCP config resolved server-side from `mcp_settings`; frontend no longer sends `mcpServers`/tokens; request contract updated on both sides.
- [ ] Security proof: ARMES token / MCP server config absent from the browser request body and JS bundle — evidence stated.
- [ ] RLS proof: cross-user `mcp_settings` read denied.
- [ ] MCP settings UI saves/loads keyed by the real `auth.uid()`; first user's config re-entered via UI (or re-keyed via A2.5 if explicitly chosen).
- [ ] No `.env*` real value or secret in code/logs/output.
- [ ] `tsc -b` + `api/` typecheck + `vite build` + `oxlint` + `vitest` all green — exact numbers.
- [ ] Authenticated end-to-end chat verified working; quality unchanged from pre-Part-2.
- [ ] State explicitly: **"Foundation Part 2 complete — multi-tenant auth live, MCP config resolved server-side, ARMES token off the client, chat verified. Foundation done."**

Do not start the `_core/` restructure or the agent refactor. Stop after the checklist and present your report.
