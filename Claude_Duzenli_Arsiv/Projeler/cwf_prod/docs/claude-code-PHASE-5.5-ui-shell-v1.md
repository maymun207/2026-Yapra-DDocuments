# Claude Code 4.8 — PHASE 5.5 (v1): Claude-style UI shell — collapsible sidebar, one layout, chat-first
<!-- version: v1 · 2026-06-27 · cwf_yaprak P5.5 UI shell redesign -->
### cwf_yaprak · frontend-only · Claude-web pattern · chat FUNCTION preserved, only the SHELL changes · the engine + governance are untouched
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER P5 (`876cf5f`). The backend (gateway, knowledge, governance, grounding) and the `/admin` panel are DONE. P5.5 reshapes the chat **shell** into the Claude-web pattern the user wants. This is a FRONTEND-ONLY redesign of presentation: the chat's behavior, the streaming, the stores' data, the API calls — all stay. P5.6 (conversation history + persistence) is the NEXT phase; P5.5 leaves a clearly-marked sidebar slot for it but does NOT build persistence.

---

## THE THREE DECISIONS (settled by the user — implement exactly, do not re-litigate)
1. **Sidebar = Claude-WEB behavior:** CLOSED/collapsed by default; opens on clicking a hamburger/menu icon; closes again. NOT the always-open Claude-desktop rail. On mobile it overlays; on desktop it can push or overlay — match Claude-web (overlay/slide-over that doesn't permanently consume width).
2. **One layout:** merge the current `/` (docked side-panel) and `/v2` (fullscreen) into a SINGLE chat shell. The separate docked-vs-fullscreen route split goes away. "Fullscreen" is simply the sidebar collapsed + chat filling the viewport — not a separate route. Keep `/v2` as a redirect/alias to the single shell if removing it would break a bookmark, but there is ONE layout.
3. **Chat-first opening:** the big "🏭 Factory AI Assistant" landing/info screen is REMOVED. The app opens directly into the chat (Claude/Gemini/ChatGPT pattern) — an empty conversation with an input box and a "New chat" affordance, not a marketing landing.

## WHAT THIS IS / IS NOT
- **IS:** a presentation reshape — sidebar shell, consolidated controls, chat-first entry, one layout. Built with what's already here (React 19, react-router, Tailwind, lucide-react, zustand, `useTranslation`). Use the **frontend-design** skill if available for spacing/typography discipline, but match the existing CWF aesthetic (cyan/teal on slate — already in `App.tsx`); do NOT invent a new brand.
- **IS NOT:** any change to chat BEHAVIOR (`cwfService` streaming, `cwfStore` send/receive logic, the SSE handling), any backend/API/governance edit, or conversation persistence (that's P5.6). The chat must work EXACTLY as before — same messages, same streaming, same tool rendering, same raw-tool toggle.

## HARD PRE-FLIGHT GATE (stop if any fails)
1. On `876cf5f` (P5) or later; `tsc -b` + `vite build` + `oxlint` + `vitest` green (report numbers).
2. Read and map the current shell before changing it (verify, don't assume):
   - `src/App.tsx` — `HomePage` (docked), the `/v2` fullscreen route, the hero-bar controls (Admin, fullscreen, language, CWF-toggle), the `viewMode` logic.
   - `src/components/ui/CWFChatPanel.tsx` + `CWFFullScreen.tsx` — what each renders; what they SHARE vs duplicate (the merge target).
   - `src/store/uiStore.ts` — `showCWF`, `viewMode`, `currentLang`, `cwfPanelWidth`, the toggles. The sidebar state lives here.
   - `src/components/ui/MCPSettingsPanel.tsx` + `LayoutSettingsDropdown.tsx` + `QuickActionsDropdown.tsx` — the controls to consolidate into the sidebar.
   - `src/store/cwfStore.ts` — the chat store (DO NOT change its send/receive logic; the new shell renders the same store).
3. Report the real component structure + what `CWFChatPanel` and `CWFFullScreen` duplicate, so the merge is informed.

## HARD CONSTRAINTS
- **Chat behavior frozen.** No edits to `cwfService.ts` (streaming) or `cwfStore.ts` send/receive actions. You may read `cwfStore` from the new shell and call its existing actions; you may NOT change what those actions do. Prove with a diff that chat logic is untouched.
- **Governance/admin untouched.** `/admin`, `AdminPanel`, `adminService`, `adminStore` unchanged except: the Admin entry MOVES from the hero bar into the new sidebar (that's the only admin-adjacent edit). Keep it role-gated (UX only; server enforces).
- **One source for shell state** (RULE 1): sidebar open/closed, language, etc. live in `uiStore` (extend it; don't scatter local state). Widths/breakpoints/animation durations → `src/lib/params/`.
- **i18n:** all new copy via `translations.ts` + `useTranslation` (TR/EN). No inline strings.
- **A11y + quality floor:** the sidebar toggle is keyboard-accessible (focusable, Enter/Space, Escape closes); focus is managed when it opens; `prefers-reduced-motion` respected for the slide animation; mobile-responsive.
- **RULE 3 (docs are done):** `.agents/CHANGELOG.md` + SKILL + AGENTS.
- **Definition of done** = one chat-first layout; collapsible Claude-web sidebar holding the consolidated controls + a marked P5.6 history slot; `/` and `/v2` unified; landing removed; chat works identically; all builds/tests green.

---

## SUB-PHASE 5.5.1 — Sidebar shell + uiStore state
- Create `src/components/ui/Sidebar.tsx`: a Claude-web slide-over/overlay sidebar, CLOSED by default, toggled by a menu icon in a slim top bar (or floating top-left). Contains, in order: **New chat**, a **Conversations** section (empty placeholder now — `// P5.6: history list mounts here`, with a muted "No saved conversations yet" empty state that is an invitation, not an error), then the consolidated controls: **MCP settings** (opens the existing `MCPSettingsPanel`), **Language** (TR/EN), **Fullscreen toggle** (= collapse sidebar / expand chat), **Admin** (role-gated, `super_admin`/`domain_editor` only → `/admin`), and account/sign-out if present.
- Extend `src/store/uiStore.ts`: `sidebarOpen: boolean` (default false) + `toggleSidebar`/`setSidebarOpen`. Keep `currentLang`, language toggle, etc. Remove/retire `viewMode` docked/fullscreen duality if it's now expressed as sidebar-collapsed (or keep a single `chatFullscreen` boolean if cleaner — your call, but ONE concept, not two routes).
- **GATE:** sidebar opens/closes (click + keyboard + Escape); default closed; controls present; history slot marked for P5.6; state in uiStore, tunables in params.

## SUB-PHASE 5.5.2 — Merge to one chat-first layout
- Create a single `src/components/ui/ChatShell.tsx` (or repurpose one of the existing two) that renders the chat — reusing `CWFChatPanel`'s message list/input INTERNALS (extract the shared chat body if `CWFChatPanel` and `CWFFullScreen` duplicate it; DRY them into one chat-body component the shell renders). The shell = the slim top bar (menu toggle + maybe model/provider indicator) + the chat body + the `Sidebar`.
- **Chat-first entry:** opening the app (authenticated) renders `ChatShell` with an empty conversation directly — NOT the `HomePage` factory-landing. Remove the landing marketing block (`🏭 Factory AI Assistant`, the Start-Chatting CTA). The empty state inside the chat body is a simple, quiet "Ask about your factory…" prompt + input (Claude-style), via `translations.ts`.
- **Routing:** `/` → `ChatShell`. Collapse `/v2` into the same shell (redirect `/v2` → `/`, or render the same component). `/admin` stays as-is.
- **Preserve everything chat:** the message rendering (`MessageBubble`, `MessageChartContent`, `RawToolResults`), the raw-tool toggle, the streaming typewriter, the language — all still work, now inside the unified shell. (`MessageChartContent` is still the viz-restore stub — leave it; that's a later phase, do NOT fix charts here.)
- **GATE:** one layout; app opens directly in chat; `/` and `/v2` both land in the unified shell; landing gone; chat sends/streams/renders EXACTLY as before (manually verify a real message round-trips with streaming + a tool call + raw-tool toggle).

## SUB-PHASE 5.5.3 — Consolidate + retire the hero bar
- Move the hero-bar controls (from `App.tsx` `HomePage`) into the Sidebar / slim top bar: Admin (→ sidebar, role-gated), Fullscreen (→ sidebar-collapse), Language (→ sidebar), MCP settings (→ sidebar opens the existing panel). The standalone hero bar in `HomePage` is removed with the landing.
- Retire now-dead UI: if `LayoutSettingsDropdown`/`QuickActionsDropdown` duplicated controls now living in the sidebar, fold them in or delete them — do not leave two ways to do the same thing (the user's anti-spaghetti rule). List what you removed/merged and why.
- Keep `MCPSettingsPanel` itself (its logic is fine); just change HOW it's opened (from the sidebar).
- **GATE:** every old hero-bar control reachable from the sidebar; no duplicated control paths remain; dead dropdowns removed or justified.

## SUB-PHASE 5.5.4 — Polish, a11y, responsive
- Slide animation (respect `prefers-reduced-motion`); overlay scrim on mobile; Escape closes; focus trap or sensible focus management while open; visible keyboard focus on all controls; sidebar scrolls if tall.
- Match the existing cyan/teal-on-slate aesthetic; the sidebar is quiet and disciplined (Claude-web is restrained — one accent, lots of breathing room). Don't over-decorate.
- **GATE:** keyboard-operable; reduced-motion honored; mobile overlay works; no layout shift jank; matches the existing palette.

## SUB-PHASE 5.5.5 — Docs (RULE 3) + commit
- `.agents/CHANGELOG.md`: What (Claude-web sidebar, one chat-first layout, hero-bar retired into sidebar, `/`+`/v2` unified, landing removed), Where (Sidebar, ChatShell, uiStore, App routes, params), Verify (chat round-trip identical; a11y; build/test numbers; diff proving cwfService/cwfStore logic untouched).
- `.agents/skills/cwf-project-kb/SKILL.md`: add a "UI shell (P5.5)" note — one chat-first layout, Claude-web collapsible sidebar holds all controls + the P5.6 history slot; chat behavior unchanged; `MessageChartContent` still the viz-restore stub.
- `.agents/AGENTS.md`: capture — *"One chat layout + one collapsible sidebar holding all shell controls. No duplicate control paths. Chat behavior (cwfService/cwfStore) is not changed by shell work."*
- Final: `tsc -b` + `vite build` + `oxlint` + `vitest` green (report numbers; add a uiStore sidebar-toggle test).
- Commit: `feat(phase5.5): Claude-style UI shell — collapsible sidebar, one chat-first layout, hero bar retired`.

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on 876cf5f+; baseline green; current shell structure mapped (what CWFChatPanel/CWFFullScreen duplicate).
- [ ] 5.5.1: sidebar CLOSED by default, opens on icon, closes on click/Escape (Claude-web); controls + marked P5.6 history slot present; state in uiStore; tunables in params.
- [ ] 5.5.2: ONE chat-first layout; app opens directly into chat; landing removed; `/` and `/v2` both render the unified shell; **chat round-trips identically** (streaming + tool call + raw-tool toggle verified by hand).
- [ ] 5.5.3: all hero-bar controls live in the sidebar; NO duplicate control paths; dead dropdowns removed/merged (listed).
- [ ] 5.5.4: keyboard-accessible, reduced-motion honored, mobile overlay, focus managed, palette matched.
- [ ] 5.5.5: CHANGELOG + SKILL + AGENTS updated; commit made.
- [ ] **Diff proves `cwfService.ts` streaming + `cwfStore.ts` send/receive logic are UNCHANGED**; governance/admin untouched except the Admin entry moving into the sidebar; no `.env*`; no secret; no new dependency.
- [ ] `tsc -b` + `vite build` + `oxlint` + `vitest` green — exact numbers.
- [ ] State explicitly: **"Phase 5.5 complete — Claude-web collapsible sidebar (closed by default), one chat-first layout (/ and /v2 unified, landing removed), hero-bar controls consolidated into the sidebar, P5.6 history slot marked; chat behavior unchanged (diff-proven); governance untouched. Conversation persistence (P5.6) not built."**

Do NOT build: conversation history/persistence (P5.6), any chat-behavior change, the chart/viz restore (`MessageChartContent` stays a stub), any backend/governance edit. Shell reshape only. Stop after the checklist and present your report — including the chat-round-trip-identical evidence and the diff proving chat logic is untouched.
