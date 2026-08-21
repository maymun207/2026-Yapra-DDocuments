# Claude Code 4.8 — PHASE 5.6 (v1): Conversation history + persistence — fill the sidebar slot, one writer, owner-only
<!-- version: v1 · 2026-06-27 · cwf_yaprak P5.6 conversation persistence -->
### cwf_yaprak · master HEAD `29e1367` (P5.5) · server is the single message-writer · browser reads via RLS · the chat round-trip is preserved exactly
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER P5.5 (`29e1367`). P5.5 delivered the Claude-web shell with a **marked but empty** history slot (`Sidebar.tsx`, `{/* P5.6: history list mounts here */}`) and a `clearMessages()`-only "New chat". P5.6 fills that slot with **persisted conversations**: two owner-only tables, a server that writes messages as a best-effort side-effect of the existing chat stream, and a multi-conversation client store + sidebar history list. Chat BEHAVIOR (prompt assembly, gateway, streaming, tool handling) does NOT change — P5.6 only ADDS a persistence side-effect and a read path.

---

## SCOPE BOUNDARY (load-bearing — do not reinterpret)
- **IS:** `conversations` + `messages` tables (owner-only RLS) · server-side persistence wired into `api/cwf/chat.ts` as a best-effort write (mirrors telemetry) · multi-conversation `cwfStore` (load/new/active) · a read-only `conversationsService` (browser RLS SELECT + title rename + soft-delete) · the Sidebar history list filling the existing marked slot.
- **IS NOT:** any change to how the agent thinks or answers — NO edit to prompt assembly (`prompt/`), the LLM `gateway`, grounding, the eval-gate, governance/admin, or the **chat context/streaming contract** beyond (a) adding one `conversationId` field to the request and (b) adding persistence writes that never block the stream. `MessageChartContent` stays the viz-restore stub. NO LLM-generated titles (that drags the gateway + cost/latency into a persistence phase — wrong layer; titles are a deterministic truncation).
- **The one architectural invariant:** **message CONTENT is authoritative agent output → written ONLY by the server** (service role, best-effort). The browser NEVER writes a message row. The browser MAY write conversation METADATA it owns (create/title/soft-delete) via RLS, exactly like `mcp_settings`. If you find yourself inserting into `messages` from the browser, STOP — that is the wrong path.

## WHY THIS SHAPE (the determinism/safety split, named before building)
Persistence is mostly a *soft* concern (titles, ordering, a history list). It has exactly **one hard invariant: owner isolation** — a user must NEVER read another user's conversations or messages. That part is code/RLS-gated and **proven** (cross-owner SELECT denied, mirroring the P4 `42501` proof). The content/metadata seam mirrors two patterns already proven in this repo:
- `conversations` ≈ **`mcp_settings`** — owner-only, full client CRUD via RLS (the client mints, renames, soft-deletes its own conversations).
- `messages` ≈ **`telemetry_events`** — owner-only SELECT, **no client write policy**; only the service role (server) writes. Best-effort, non-throwing — a write failure must never break a chat (identical posture to `TelemetryRepository.record`).

## HARD PRE-FLIGHT GATE (stop if any fails — report findings as deltas vs. these assumptions)
1. On `29e1367` (P5.5) or later; `tsc -b` + api strict-nodenext typecheck + `vite build` + `oxlint` + `vitest` green (report exact numbers; P5.5 baseline was 209 tests).
2. Confirm these REAL shapes before writing (verify, do not assume — list any delta):
   - `shared/dbConstants.ts` — `DB_TABLES` (add here), `DB_CONFLICT_TARGETS`. RULE 1: table names live here only.
   - `supabase/migrations/` — timestamp-ordered; last is `20260627160000_backends_registry.sql`. The owner+RLS template is `..._mcp_settings.sql` (full owner CRUD + the global `public.set_updated_at()` trigger fn — reuse it). The SELECT-own-only template is `..._telemetry_events.sql`.
   - `api/cwf/_lib/persistence/` — `client.ts` (`getServiceClient()`, returns `null` when env absent = graceful-degradation contract), `repositories/TelemetryRepository.ts` (the writer pattern to mirror: service client, `.insert`, best-effort, non-throwing), `index.ts` (barrel), `types.ts` (`Repository` interface + row types).
   - `api/cwf/chat.ts` — `getAuthContext(...).userId` (~L313–317); the telemetry mechanism: `telemetryWrites: Promise<void>[]` + `emit(...)` + a single `await Promise.allSettled(telemetryWrites)` flush before the function ends (~L357–647); `fullText` accumulation (~L573); the `done` SSE event (~L611). `randomUUID` is already imported.
   - `src/store/cwfStore.ts` — single flat `messages: CWFMessage[]`; `sendMessage` builds `conversationHistory` from the in-memory `messages` (last 10 non-system) and updates a placeholder by id during streaming. Header comment is stale (`Used by: CWFChatPanel.tsx`) — fix it as part of this phase.
   - `src/lib/cwfService.ts` — `cwfApiCall` request body (`message, conversationHistory, language, forceProvider`) — you will add `conversationId`.
   - The **browser Supabase client** that `src/lib/mcpSettingsService.ts` already uses for RLS reads/writes — **confirm its exact module path** and reuse it for `conversationsService` (do NOT create a second browser client).
   - `src/components/ui/Sidebar.tsx` (the marked slot ~L93, `t('noConversations')`) and `src/components/ui/ChatShell.tsx` (renders `messages` ~L213; "New chat" calls `clearMessages` ~L168) and `src/App.tsx` (`useCWFStore.getState().clearMessages()` on each authenticated session — the multi-conversation reconcile point).
3. Report the real shapes + any delta, then proceed.

## HARD CONSTRAINTS
- **Chat behavior frozen except the two additive seams.** `prompt/`, `gateway`, grounding, eval-gate, governance/admin: untouched. In `chat.ts` you may ONLY: (a) read `conversationId` from the body, (b) enqueue conversation+message writes into the existing best-effort flush. You may NOT change prompt assembly, tool handling, the SSE shape (beyond reusing existing events), or how `conversationHistory` is consumed. Prove `gateway.ts`, `assemble.ts`, and the grounding/gate files are untouched (empty diff).
- **Single message-writer = server.** No `messages` insert from the browser. The service role is RLS-exempt, so the server message-writer MUST re-derive ownership: before persisting, verify the `conversationId` belongs to the authed `userId` (the same defense-in-depth `adminGuard` applies). A foreign/forged `conversationId` is rejected server-side, not merely by RLS.
- **Best-effort, stream-sacred.** Every persistence write is non-throwing and fire-and-forget into the existing `Promise.allSettled` flush. `getServiceClient()` `null` (env absent) ⇒ persistence is a silent no-op and **chat still works** — prove it.
- **Owner-only, proven.** Both tables RLS-on; cross-owner SELECT denied (show the denial, mirroring the P4 `42501` proof). `conversations` = full owner CRUD; `messages` = SELECT-own + NO client write policy.
- **RULE 1:** table names + conflict targets → `dbConstants`; title-truncation length, history page size, etc. → `src/lib/params/`. No inline literals.
- **i18n:** all new copy (New chat, Rename, Delete, confirm, empty state) via `translations.ts` + `useTranslation` (TR/EN). No inline strings.
- **No secrets:** never read/write/print `.env*`; never log the secret key or a JWT. No new dependency (Supabase client + zustand + lucide-react + react-router already present) — or justify.
- **Versioning (standing rule):** the runtime-topology diagram is a versioned artifact — regenerate as a NEW file `docs/cwf-runtime-topology-v2.html` (do NOT overwrite v1), bump the internal `rev`. Same for any KB/diagram you touch.

---

## SUB-PHASE P5.6.1 — Schema + RLS (DDL handoff)
- `shared/dbConstants.ts`: add `DB_TABLES.CONVERSATIONS = 'conversations'`, `DB_TABLES.MESSAGES = 'messages'`; add `DB_CONFLICT_TARGETS.CONVERSATIONS = 'id'`.
- New migration `supabase/migrations/20260627170000_conversations.sql` (mirror `mcp_settings`):
  - `id uuid primary key default gen_random_uuid()` (client may supply its own id on insert), `user_id uuid not null references auth.users(id) on delete cascade`, `title text`, `created_at timestamptz not null default now()`, `updated_at timestamptz not null default now()`, **`deleted_at timestamptz`** (soft delete; null = live).
  - Reuse `public.set_updated_at()` via a `before update` trigger.
  - Index `(user_id, updated_at desc) where deleted_at is null` for the history list.
  - RLS on; **full owner CRUD** policies (`select`/`insert`/`update`/`delete`, all `auth.uid() = user_id`), verbatim shape from `mcp_settings`.
- New migration `supabase/migrations/20260627170001_messages.sql` (mirror `telemetry_events` for the policy posture):
  - `id uuid primary key default gen_random_uuid()`, `conversation_id uuid not null references public.conversations(id) on delete cascade`, `user_id uuid not null references auth.users(id) on delete cascade` (denormalized owner → simple, fast RLS — chosen over a join-subquery policy; the single server writer keeps it consistent), `role text not null check (role in ('user','assistant','system'))`, `content text not null default ''`, `tool_call_count integer`, `raw_tool_results jsonb`, `error boolean not null default false`, `created_at timestamptz not null default now()`.
  - Index `(conversation_id, created_at)`.
  - RLS on; **SELECT-own only** (`auth.uid() = user_id`); **NO insert/update/delete policy** → only the service role writes (mirror `telemetry_events`). Comment this explicitly.
  - Note on `raw_tool_results`: it is the already-trimmed client-facing result (post-`resultStore` handle), so it is bounded — but add a one-line comment flagging it as the row's size driver for a future retention sweep.
- **DDL HANDOFF:** the Supabase CLI was Unauthorized for this project — output the two migrations and instruct the user to apply them via the **Supabase MCP**. Do not block the phase on application; mark P5.6.1 "schema authored + handed off".
- **GATE:** migrations authored, dbConstants updated; the owner-CRUD vs SELECT-own split matches the two templates; **stated proof plan**: after the user applies, a cross-owner SELECT on each table is denied, a browser `insert` into `messages` is RLS-denied, and a browser CRUD on own `conversations` succeeds.

## SUB-PHASE P5.6.2 — Server persistence (the single writer)
- `api/cwf/_lib/persistence/types.ts`: add `Conversation` + `Message` row types.
- `repositories/ConversationRepository.ts` + `repositories/MessageRepository.ts` (mirror `TelemetryRepository`: `getServiceClient()`, best-effort, non-throwing, `DB_TABLES.*`, no throw on error — log + continue):
  - `ConversationRepository.upsert({ id, user_id, title })` — lazy create on first message; on conflict(`id`) do nothing to the title (don't clobber a user rename); `touch(id)` to bump `updated_at`; `assertOwned(id, userId)` returning whether the conversation belongs to the user (the ownership guard).
  - `MessageRepository.insert({ id, conversation_id, user_id, role, content, tool_call_count, raw_tool_results, error })`.
- `index.ts`: export both.
- `api/cwf/chat.ts` (additive only):
  - Read `conversationId: string` from the request body (client-minted uuid). If absent/empty, generate one server-side and return it on the `done` event so a degraded client still gets an id.
  - **Ownership guard:** `await conversationRepo.assertOwned(conversationId, userId)`. If it exists and is owned by someone else → do NOT persist (log a security note); the chat still streams (don't break UX on a metadata anomaly), but no row is written under the wrong owner. If it does not exist → it's a new conversation for this user → upsert it with a **deterministic title = the first user message truncated** to `params` length (single line, ellipsis).
  - Enqueue (into the SAME best-effort array that telemetry uses, or a sibling `persistenceWrites[]` flushed in the same `Promise.allSettled`): the **user** message at request start; the **assistant** message at the `done` point (`content: fullText`, `tool_call_count`, `raw_tool_results`, `error` if the stream errored). Reuse the existing message ids the store will send if provided, else mint.
  - Return `conversationId` (and the assistant `messageId`) on the `done` event so the client can reconcile without a re-fetch.
- **GATE:** with env set, a real chat persists exactly one `conversations` row (correct owner + truncated title) and two `messages` rows (user+assistant) under the authed user; a foreign/forged `conversationId` writes NOTHING under the wrong owner (server guard, proven separately from RLS); with `getServiceClient()` returning `null`, the chat streams identically and nothing is written (degradation proven); `gateway.ts`/`assemble.ts`/grounding diff empty.

## SUB-PHASE P5.6.3 — Client: multi-conversation store + sidebar history
- `src/lib/conversationsService.ts` (reuse the existing browser Supabase client from `mcpSettingsService`): `listConversations()` (RLS SELECT, `deleted_at is null`, order `updated_at desc`, page size from params), `loadMessages(conversationId)` (RLS SELECT, order `created_at`), `renameConversation(id, title)` (RLS UPDATE), `softDeleteConversation(id)` (RLS UPDATE `deleted_at = now()`). **Reads/metadata only — never inserts a message.**
- `src/store/cwfStore.ts` (rewrite the header comment; go multi-conversation **without changing send/stream semantics**):
  - Add `activeConversationId: string | null` and `conversations: ConversationSummary[]`.
  - `newConversation()`: mint a uuid (`crypto.randomUUID()`), set it active, clear `messages` (this REPLACES the bare `clearMessages` for the "New chat" affordance — keep `clearMessages` as the internal reset it calls).
  - `loadConversation(id)`: set active, `loadMessages(id)` → hydrate `messages` (map rows → `CWFMessage`, including `rawToolResults`), so the EXISTING ChatShell render path shows them unchanged.
  - `refreshConversations()`: populate the sidebar list.
  - `sendMessage`: if `activeConversationId` is null, mint one first (lazy new conversation); pass `conversationId` to `cwfApiCall`; on the `done` reconcile, adopt the server-returned id if it minted one, and `refreshConversations()` so the new/renamed/touched conversation surfaces. **The `conversationHistory` it sends still comes from the in-memory `messages` (now = the active conversation) — unchanged context contract.**
- `src/lib/cwfService.ts`: add `conversationId` to the `cwfApiCall` request body and surface the returned `conversationId`/`messageId` from `done`.
- `src/components/ui/Sidebar.tsx`: fill the marked slot with the history list — each item: title, click → `loadConversation` + close sidebar, active-highlight for `activeConversationId`, a rename affordance, a soft-delete (with an i18n confirm). Keep the quiet empty state when the list is empty. "New chat" button → `newConversation()` (not bare `clearMessages`).
- `src/components/ui/ChatShell.tsx`: point its "New chat" (~L168) at `newConversation()` too. No render change otherwise.
- `src/App.tsx`: reconcile the session-begin `clearMessages()` → `newConversation()` (start a fresh empty conversation on login) and trigger an initial `refreshConversations()`; history remains loadable from the sidebar (login starts fresh, it does NOT wipe persisted history).
- `params`: title-truncation length, history page size. `translations.ts`: New chat / Rename / Delete / confirm / empty state (TR+EN).
- **GATE (the build-green-hides-it re-proof):** history lists, loads, renames, soft-deletes (soft-deleted ones disappear from the list, are not hard-removed). **Chat round-trips IDENTICALLY and messages land in the CORRECT conversation:** send in A → `newConversation` B → send in B → `loadConversation` A → A's tail is intact and a new send in A appends to A (streaming wrote to the right active id, not a stale one). Streaming + tool call + raw-tool toggle still work. `cwfService` streaming semantics and the SSE handling otherwise unchanged.

## SUB-PHASE P5.6.4 — Docs (RULE 3) + topology v2 + commit
- `.agents/CHANGELOG.md`: dated entry — What (conversation history + persistence; server single-writer; owner-only tables; sidebar history list/load/rename/soft-delete; multi-conversation store), Where (two migrations, dbConstants, ConversationRepository/MessageRepository, chat.ts persistence seam, conversationsService, cwfStore, Sidebar, App), Verify (owner-isolation denial; foreign-conversationId rejected; degradation no-op; chat-round-trip-identical + correct-conversation; build/test numbers).
- `.agents/skills/cwf-project-kb/SKILL.md`: "Conversation persistence (P5.6)" — server is the only message-writer (best-effort, mirrors telemetry); browser reads history via RLS + owns conversation metadata (mirrors mcp_settings); owner isolation is the one hard invariant; titles are deterministic truncations (no LLM); soft-delete (`deleted_at`).
- `.agents/AGENTS.md`: capture — *"Messages are agent output: only the server writes message rows (best-effort, never breaks the stream); the service role is RLS-exempt so the server re-derives conversation ownership before writing. The browser only reads history and edits conversation metadata it owns (RLS). Titles are deterministic truncations, never LLM-generated. Delete is soft (`deleted_at`)."*
- **Versioned diagram:** create `docs/cwf-runtime-topology-v2.html` (NEW file; do not overwrite v1; bump internal `rev`): widen the browser↔Supabase **read** edge (history SELECT, owner-only) and add the conversations metadata **write** edge (client RLS, same class as the existing mcp_settings write); mark `messages` as **server-write-only**. Keep the security-class annotations.
- Tick `docs/ROADMAP.md` P5.6 done.
- Final: `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green (report numbers; add tests where they earn their keep — `cwfStore` active-conversation routing, `ConversationRepository.assertOwned`/`upsert`, the ownership-guard branch in a `chat.ts` unit if feasible).
- Commit: `feat(phase5.6): conversation history + persistence — owner-only tables, server single-writer, sidebar history`.

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on `29e1367`+; baseline green (report numbers); real shapes confirmed vs. the assumptions above (report deltas — esp. the browser Supabase client path and the chat.ts flush mechanism).
- [ ] P5.6.1: two migrations authored; `dbConstants` updated; `conversations` = owner-CRUD, `messages` = SELECT-own + no client write; `deleted_at` present; handed off for Supabase-MCP apply; denial/CRUD proof plan stated.
- [ ] P5.6.2: server persists conversation(correct owner + truncated title) + user + assistant messages; **ownership guard rejects a foreign `conversationId` server-side** (proven, separate from RLS); **`getServiceClient()` null ⇒ chat streams identically, nothing written** (degradation proven); diff proves `gateway.ts`/`assemble.ts`/grounding/eval-gate UNCHANGED.
- [ ] P5.6.3: history list/load/rename/soft-delete work; **chat round-trips identically AND messages land in the correct conversation** (the A→B→A switch test, described with evidence); streaming + tool call + raw-tool toggle unchanged; `cwfService` streaming semantics unchanged; `App.tsx` login starts a fresh conversation without wiping persisted history.
- [ ] Owner isolation proven: cross-owner SELECT denied on BOTH tables; browser `messages` insert RLS-denied.
- [ ] P5.6.4: CHANGELOG + SKILL + AGENTS + ROADMAP updated; **`docs/cwf-runtime-topology-v2.html` created (v1 NOT overwritten)**; commit made.
- [ ] No `.env*` touched; no secret logged; no message ever written from the browser; no LLM-generated title; no new dependency (or justified).
- [ ] `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green — exact numbers.
- [ ] State explicitly: **"Phase 5.6 complete — conversation history + persistence; owner-only `conversations` (client-CRUD) + `messages` (server-write-only, SELECT-own); the server is the single message-writer (best-effort, never breaks the stream) and re-derives conversation ownership before writing; the browser reads history via RLS and owns conversation metadata; titles are deterministic truncations; delete is soft; multi-conversation store routes messages to the correct conversation (A→B→A proven); chat behavior unchanged (gateway/assembly/grounding diff-empty); runtime-topology bumped to v2."**

Do NOT build: LLM-generated titles, any chat-behavior/prompt/gateway/grounding/governance change, the chart/viz restore (`MessageChartContent` stays a stub), telemetry↔conversation linkage (a future observability item), or any message write from the browser. Stop after the checklist and present your report — including the ownership-guard rejection evidence, the degradation-no-op evidence, and the A→B→A correct-conversation evidence.
