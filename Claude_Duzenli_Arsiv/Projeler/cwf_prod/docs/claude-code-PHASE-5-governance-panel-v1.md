# Claude Code 4.8 — PHASE 5 (v1): Governance Panel — the human face of the gated knowledge engine
<!-- version: v1 · 2026-06-27 · cwf_yaprak P5 governance panel -->
### cwf_yaprak · isolated `/admin` route · React over the P4/P4.7 admin API · role-gated · the chat shell is NOT touched · demo-safe
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER the grounding validator (`65d0a6b`). P4 built the governed store + unbypassable eval-gate; P4.7 made backend identity first-class data (`backends` table + FK); the grounding validator added runtime answer-time enforcement. All of that is an ENGINE with no human face. P5 builds that face: a React admin panel where a `super_admin`/`domain_editor` authors rules, attempts publish, **sees the gate verdict**, manages kinds/users/scopes, and reads telemetry — all over the existing P4/P4.7 admin endpoints.
>
> **SCOPE BOUNDARY (load-bearing):** P5 is the GOVERNANCE PANEL only. It is an ISOLATED `/admin` route. It must NOT touch the chat shell (`HomePage`, `CWFChatPanel`, `CWFFullScreen`), the chat store, or the chat service. The Claude-style sidebar / hero-bar redesign the user wants is a SEPARATE later phase (P5.5) — do NOT start it here. Mixing a broad UI redesign (touches every user, demo-critical) with the admin panel (narrow, admin-only) is exactly the build-green-hides-it regression we avoid. Leave clearly-marked `P5.5` seams where the redesign will later absorb this panel's entry point.

---

## WHY THIS, WHAT IT IS / IS NOT (read — do not reinterpret)
- **The panel is a CLIENT of the gated engine, never a bypass.** Every mutating action goes through the existing role/scope-gated admin endpoints (`api/admin/rules.ts`, `rules/[id].ts`, `kinds.ts`, `reset.ts`), which run the eval-gate server-side. The panel NEVER writes `domain_rules` directly via the browser Supabase client — RLS would deny `published` anyway (`42501`), and drafts must flow through the service so the gate + audit + versioning happen. If you find yourself calling `supabase.from('domain_rules')` to mutate, STOP — that is the wrong path; call the admin API.
- **Client role-guard is UX, not security.** `authStore.role`/`scopes` gate what the panel SHOWS, for a clean UX. The SERVER (`adminGuard`: `authed` + `ensureBackendScope`) re-derives and ENFORCES authorization on every request — never trust the client value. Put a comment saying exactly this wherever the guard is used.
- **Gate verdict is the centerpiece.** When the user clicks Publish, the endpoint returns `{ published, failedStage, stages }`. The panel's job is to make that verdict legible: on reject, show WHICH stage failed (schema/referential/behavioral) and the stage errors, so the editor learns why (e.g. the IKINCILUST poison → "behavioral: zone is a blind-spot subject but hasBarcode=true"). This is the teaching surface.
- **Backends come from the registry, not a literal.** Any backend dropdown/list enumerates `public.backends` (P4.7) — never a hardcoded `['armes','superset']`. Adding a backend later must light up in the panel with zero panel code change.

## HARD PRE-FLIGHT GATE (stop if any fails)
1. On `65d0a6b` (grounding) or later; `tsc -b` + `vite build` + `oxlint` + `vitest` green (report numbers).
2. Confirm by reading source (verify, don't trust this prompt's paths):
   - Admin endpoints exist: `api/admin/{rules.ts, rules/[id].ts, kinds.ts, reset.ts}` and their request/response shapes (read them — the panel's service must match exactly: e.g. publish POST returns `{ published, failedStage, stages, rule }`).
   - `api/cwf/_lib/adminGuard.ts` (`authed`, `ensureBackendScope`) — confirm how the Bearer is verified + what 401/403 look like, so the panel handles them.
   - Frontend conventions to MIRROR (do not invent new patterns): `src/lib/cwfService.ts` (Bearer from `authStore.accessToken`, fetch shape), `src/components/ui/MCPSettingsPanel.tsx` (panel UX), `src/store/mcpStore.ts` (store shape), `src/lib/params/` (RULE 1 tunables), `src/lib/translations.ts` + `useTranslation` (TR/EN), `src/store/authStore.ts` (`role`, `scopes`, `accessToken`).
   - Routing: `src/App.tsx` uses `react-router-dom` with `/` and `/v2`. The new route slots in here.
3. Report the real admin-endpoint request/response shapes you found vs. what this prompt assumed; use the REAL ones.

## HARD CONSTRAINTS
- **Chat shell untouched.** No edits to `HomePage`, `CWFChatPanel`, `CWFFullScreen`, `cwfStore`, `cwfService` (except the dead-comment purge in P5.0 which is comments/types only, no behavior). The `/admin` route is additive.
- **Mirror existing conventions** — `adminService` mirrors `cwfService` (Bearer, error handling); `adminStore` mirrors `mcpStore` (zustand); tunables in `src/lib/params/`; all copy via `translations.ts` (TR/EN), no inline strings.
- **No new dependency** unless unavoidable; if a table/diff view genuinely needs one, justify it. Prefer building with what's there (Tailwind, lucide-react, existing components).
- **RULE 1:** page sizes, poll intervals, endpoint base paths → `src/lib/params/`. No scattered literals.
- **RULE 3 (docs are done):** `.agents/CHANGELOG.md` + `.agents/skills/cwf-project-kb/SKILL.md` + `.agents/AGENTS.md`.
- **Secrets via env only**; never touch `.env*`; never print/log a token/JWT.
- **Definition of done** = `/admin` route live + role-guarded; rules authoring with visible gate verdict; kinds (CORE locked / SOFT editable); users & scopes; telemetry viewer; dead multipath purge; docs; all builds/tests green.

---

## SUB-PHASE P5.0 — Purge remaining dead multi-path comments/types (cleanup pre-step)
The donor left frontend lies mirroring the backend ones already cleaned. The user's standing rule: NO dead code/comment may even suggest a second LLM path or the old demo identity.
- `src/App.tsx`: header says "CWF-DEMO Main Application"; UI says "Dijital İkiz / Digital Twin"; footer "Powered by Gemini AI". This is the CLEAN service (no digital twin; single gateway). Rewrite the file header to reality; the user-facing copy (Digital Twin → the real product framing) goes through `translations.ts` — keep it minimal, this is not the redesign, just de-lying.
- `src/lib/cwfService.ts`: remove the **"Legacy JSON Path (Gemini)"** branch (`return response.json()` fallback) IF the backend only ever returns SSE now (verify in `chat.ts` — it does: it always `res.writeHead(... text/event-stream)`). Remove the `fallback`/`fallbackProvider` response fields and the `forceProvider` "legacy Gemini" comments that imply a second path, UNLESS `forceProvider` is still a live feature (it is — the `/gl /o /c` slash commands) — in that case KEEP `forceProvider` but fix the comments so they describe "one gateway, provider selectable", not "a separate Gemini path". Distinguish carefully: `forceProvider` = live (provider choice within the single gateway); `fallback*` + legacy-JSON = dead (a second path that no longer exists).
- Grep `src/` for the same dead language as before (`Gemini native`, `legacy`, `digital twin`, `CWF-DEMO`, `two paths`, `fallback path`) and fix each to match the single-gateway clean-service reality. Comments/copy/types only — no logic change to streaming.
- **GATE:** list every file + before/after; zero comments imply a second LLM path or the old demo; `forceProvider` (if kept) is correctly described as in-gateway provider selection; streaming behavior unchanged; tests green.

## SUB-PHASE P5.1 — adminService (mirror cwfService)
Create `src/lib/adminService.ts` — the typed client for the admin API, mirroring `cwfService`'s Bearer pattern (`authStore.accessToken` → `Authorization: Bearer`):
- `listRules(backendId?, status?)`, `getRule(id)` (detail + versions + diffs), `createDraft(...)`, `updateDraft(id, payload)`, `publish(id, reason?)` → returns `{ published, failedStage, stages, rule }`, `rollback(id, versionNo)`, `archive(id, reason?)`, `reset(backendId, kindId?)`, `listKinds(backendId?)`, `createSoftKind(...)`, `updateSoftKindFieldSpec(...)`, `listBackends()` (from `public.backends`), `listTelemetry(filter)`, plus users/scopes reads as the endpoints allow.
- Match the REAL endpoint shapes found in pre-flight. Typed request/response interfaces. 401/403 → a typed error the store surfaces as "not authorized" (don't crash).
- Tunables (base path, page sizes) in `src/lib/params/`.
- **GATE:** every method maps to a real endpoint with the real shape; Bearer identical to `cwfService`; no direct `supabase.from('domain_rules')` mutation anywhere.

## SUB-PHASE P5.2 — adminStore (mirror mcpStore) + route + guard
- `src/store/adminStore.ts` (zustand, mirror `mcpStore`): holds rules/kinds/backends/telemetry slices, loading/error flags, and actions that call `adminService`. Invalidate/refetch after a successful publish/reset (the server already invalidated the agent's cache; the panel just refreshes its view).
- `src/App.tsx`: add `<Route path="/admin" element={<AdminPanel />} />` inside the existing `<Routes>`. Additive — `/` and `/v2` untouched.
- **Role guard (UX only):** `AdminPanel` reads `authStore.role`; if `role === 'user'`, render a "not authorized" notice (no panel). `domain_editor` sees only their scoped backends; `super_admin` sees all + the kinds/users tabs. Comment loudly that the SERVER enforces this; the guard is presentation.
- **Entry point (P5 interim):** a small role-gated "Admin" button in the existing hero bar (visible only to `super_admin`/`domain_editor`) linking to `/admin`. Mark it `// P5.5: moves into the sidebar`. Do NOT redesign the hero bar — one button.
- **GATE:** `/admin` reachable; `user` role blocked at the UI; `domain_editor` sees only scoped backends; chat routes unaffected.

## SUB-PHASE P5.3 — Rules tab (the centerpiece: author → publish → SEE THE GATE VERDICT)
The most important screen. For the selected backend (from `listBackends`):
- **List** published + draft rules grouped by kind; show status badges (draft/published/archived), key, version.
- **Detail/editor:** view a rule's payload; for a DRAFT, an editor (JSON or structured form per the kind's field spec) to `updateDraft`. For CORE kinds the structure is locked (show the schema read-only-shaped; only allowed fields editable). For SOFT kinds, the field_spec drives the form.
- **Publish flow — the teaching surface:** a Publish button calls `publish(id)`. Render the verdict:
  - `published:true` → success, refetch (the new published version shows; prior archived).
  - `published:false` → show `failedStage` prominently (schema | referential | behavioral) + the failing stage's errors verbatim, so the editor sees *why* (e.g. behavioral: "zone 'IKINCILUST' is a blind-spot subject but hasBarcode=true"). This is how a human learns the EMPTY≠ZERO invariant by hitting it.
- **History:** versions + diffs (from `getRule`), with rollback (creates a gated draft — make clear it must re-pass the gate) and archive.
- **Poison demo (acceptance):** authoring the IKINCILUST "hasBarcode=true" draft and clicking Publish must visibly REJECT at behavioral with the reason shown. Use this as the tab's acceptance test.
- **GATE:** a draft can be authored, published if valid, and a poisoned draft is visibly rejected at the right stage with the reason; CORE structure is not editable; rollback creates a draft.

## SUB-PHASE P5.4 — Kinds tab + Users/Scopes tab (super_admin)
- **Kinds:** list `rule_kinds` per backend; CORE kinds shown LOCKED (field structure read-only, badge "locked to code"); SOFT kinds allow `updateSoftKindFieldSpec` (with the server's re-validation-of-all-instances behavior surfaced — if the change would break instances, show the server's rejection) and `createSoftKind`. No client-side bypass of the lock — the server enforces; the UI just reflects it.
- **Users & Scopes:** read `user_roles` + `user_backend_scopes` (as endpoints/RLS allow); show who has which role + scopes. Editing roles/scopes only if a server endpoint exists for it; if not, READ-ONLY this iteration and note "role assignment via Supabase dashboard / future endpoint" — do NOT invent a direct-write path that bypasses RBAC.
- **GATE:** CORE locked in UI + server; SOFT editable + the break-detection surfaced; users/scopes at least read-only and honest about write capability.

## SUB-PHASE P5.5-SEAM — Telemetry viewer (read-only) + redesign seams
- **Telemetry tab:** read `telemetry_events` (own/all per role) — a simple table: ts, type (message/llm_call/tool_call/error), model, tokens, latency, cost_estimate, and for `error` rows the `payload.kind` (so `grounding_violation` events are visible — closing the loop: the runtime validator emits, the panel surfaces). Filter by type/date. Read-only. Respect the redaction rule (payload already has no PII/secrets; don't add any).
- **Redesign seams:** leave a clearly-commented note at the panel's entry point and layout root: `// P5.5: this panel + the hero-bar controls (MCP settings, language, fullscreen, Admin) consolidate into a Claude-style left sidebar. Keep the panel's internals route-addressable so the sidebar can link to /admin/rules, /admin/kinds, etc.` Structure the panel's internal navigation as addressable sub-views (even if via local state now) so the future sidebar can deep-link without a rewrite.
- **GATE:** telemetry visible incl. grounding_violation rows; redesign seams documented; no redesign actually performed.

## SUB-PHASE P5.6 — Docs (RULE 3) + commit
- `.agents/CHANGELOG.md`: dated entry — What (isolated /admin governance panel; rules authoring with visible gate verdict; kinds CORE-locked/SOFT-editable; users/scopes; telemetry incl. grounding violations; dead frontend multipath purge), Where (adminService, adminStore, AdminPanel + tabs, App.tsx route, hero-bar Admin button), Verify (poison-rejected-visibly acceptance; chat shell untouched; build/typecheck/lint/test numbers).
- `.agents/skills/cwf-project-kb/SKILL.md`: add a "Governance panel (P5)" section — the panel is a client of the gated admin API (never a DB bypass), client guard is UX-only (server enforces), backends from the registry, gate verdict is the teaching surface, P5.5 redesign is the next UI phase.
- `.agents/AGENTS.md`: capture — *"The admin panel mutates ONLY via the role/scope-gated admin API (never the browser Supabase client for governed writes). Client role-guards are UX; the server enforces. Backend lists come from public.backends, never a literal."*
- Final: `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green (report numbers; add panel/store tests where it makes sense — adminStore actions, guard logic).
- Commit: `feat(phase5): governance panel (/admin) — rules authoring + visible eval-gate verdict, kinds, users/scopes, telemetry; purge dead frontend multipath`.

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on 65d0a6b+; baseline green; REAL admin-endpoint shapes confirmed vs. assumptions (report deltas).
- [ ] P5.0: dead frontend multipath/demo comments purged (App.tsx header/copy, cwfService legacy-Gemini-JSON branch + fallback fields); `forceProvider` kept but re-described as in-gateway selection (if still live); files + before/after listed; streaming behavior unchanged.
- [ ] P5.1: `adminService` mirrors `cwfService` Bearer; every method hits a real endpoint with the real shape; NO direct browser `supabase.from('domain_rules')` governed-write anywhere.
- [ ] P5.2: `adminStore` mirrors `mcpStore`; `/admin` route additive (`/`,`/v2` untouched); `user` blocked at UI; `domain_editor` scoped; hero-bar Admin button role-gated + marked for P5.5.
- [ ] P5.3: author → publish → **gate verdict visible**; valid publishes; **IKINCILUST poison visibly REJECTED at behavioral with the reason shown**; CORE not structurally editable; rollback creates a gated draft.
- [ ] P5.4: CORE kinds locked (UI + server); SOFT editable with break-detection surfaced; users/scopes read-only-honest (no invented RBAC-bypass write).
- [ ] P5.5-SEAM: telemetry read-only incl. `grounding_violation` rows; redesign seams documented; NO redesign done.
- [ ] P5.6: CHANGELOG + SKILL + AGENTS updated; commit made.
- [ ] Chat shell (HomePage/CWFChatPanel/CWFFullScreen/cwfStore) NOT touched (diff proves it); no `.env*`; no secret logged; no new dep (or justified).
- [ ] `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green — exact numbers.
- [ ] State explicitly: **"Phase 5 complete — isolated /admin governance panel over the gated admin API; rules authoring with the eval-gate verdict made legible (poison visibly rejected at behavioral); kinds CORE-locked/SOFT-editable; users/scopes; telemetry incl. grounding violations; client guard is UX-only, server enforces; backends from the registry; chat shell untouched; dead frontend multipath purged. The Claude-style sidebar redesign (P5.5) is seamed but not built."**

Do NOT build: the Claude-style sidebar / hero-bar redesign (P5.5), chat-history persistence, any chat-shell change beyond de-lying comments, or any governed write that bypasses the admin API. Isolated governance panel only. Stop after the checklist and present your report — including the dead-comment purge list and the poison-rejected-visibly acceptance evidence.
