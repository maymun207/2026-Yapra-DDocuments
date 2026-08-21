# CWF — ADMIN-THEME-1 Design Note: Admin Joins the Global Theme + Legibility Restore · v1

<!-- v1 · 2026-07-09 · anchor = origin/master `8632eac` (1250 tests / 125 files / docVersion rev 53 / drift [OK]).
     RULE-25 fresh-clone grounded this session: `.admin-theme.dark` is a FULL 34-token palette but INERT
     (AdminPanel applies `.admin-theme` never `dark`, lines 92/166); DocsReader ALREADY honors cwf.theme
     (line 140 `admin-theme${dark?' dark':''}`); useChatTheme() (src/lib/useChatTheme.ts) is a reusable
     global-theme hook; the 61 RULE-16 violations are ALL `text-[10/11px]` (56 in ReplayTab, 0 opacity);
     4 portal primitives prepend `"admin-theme"` at 8 sites. Dark palette WCAG measured: 10/12 pairs PASS,
     2 fixes needed. Owner-approved 2026-07-09: ONE combined admin phase. Design only — NOT the AG prompt. -->

## 0. Corrected principle (the mistake this fixes)
**Theme is GLOBAL — chat + admin + docs are one theme system, no split.** CHAT-UX-1 scoped the toggle to
`.chat-theme` for phase hygiene, which produced a half-working global control that skips admin — even
though a full dark admin palette already exists and the docs reader already honors the global key.
ADMIN-THEME-1 corrects that: the same `cwf.theme` preference drives every surface.

## 1. What ADMIN-THEME-1 is (one combined admin visit — 4 scopes)
- **A · Wire admin to `cwf.theme`.** Every `.admin-theme` application point reads `useChatTheme()`
  and appends `dark` when dark. Points: AdminPanel roots (lines 92/166) + the ReplayTab/ProvidersTab/
  MCPSettingsTab `.admin-theme` usages + the 4 portal primitives (select/dialog/dropdown/tooltip, 8
  sites). Centralize via a tiny `adminThemeClass()` helper (returns `'admin-theme'` | `'admin-theme dark'`)
  so it's DRY and enforceable — no more raw `"admin-theme"` string literals.
  **Named trap:** portals render to `document.body` (outside the admin root), so they can NOT inherit
  `dark` — each must resolve the theme itself (exactly the UI-1 portal problem). Miss this and popovers
  render light over a dark panel.
- **B · Activate + correct the dark palette.** `.admin-theme.dark` already defines all 34 tokens and
  measures 10/12 WCAG pairs PASS. Ship it with two Architect-measured corrections (values in the prompt):
  `--destructive` `oklch(0.704 0.191 22.216)` → `oklch(0.55 0.20 25)` (white-on-button 2.75→**5.15:1**,
  matching the light theme's AA intent); `--border` 12%→18% and `--input` 15%→22% (mild perceivability;
  decorative dividers are NOT held to 3:1 — the light theme's borders aren't either).
- **C · RULE-16 legibility restore.** All 61 violations are `text-[10px]/[11px]` (56 in ReplayTab, the
  rest in ProvidersTab/adminUi/TweakTab/AdminPanel) → `text-xs` for labels, `text-sm` for data. Zero
  opacity/color violations (admin already uses tokens for color — good). This matters in BOTH themes.
- **D · Make the ban a real gate.** New `adminLegibility` test (mirrors CHAT-UX-1's proven
  `chatLegibility`): reads `src/components/admin/**` from disk, asserts ZERO
  `text-white/{20,30,40,50}` + `text-[10px]/[11px]` + raw `"admin-theme"` string (all must route through
  `adminThemeClass()`). The RULE-16 grep was asserted "enforced" but never wired — this closes it, the
  same lesson chatLegibility applied for chat.

## 2. Scope / frozen / seal
- **Frozen — zero diffs:** `api/` (entire tree) · `shared/permissions.ts` · `shared/dbConstants.ts` ·
  `supabase/` · `scripts/verifyGrants.ts` · `.mcp.json` · the chat surface
  (`src/components/ui/ChatShell|LoginPage|Sidebar|cwf/*`, `src/lib/useChatTheme.ts` — CONSUMED not
  edited) · `src/components/docs/**` (DocsReader already correct). In `src/index.css` the `:root` and
  `.chat-theme*` blocks are byte-frozen; ONLY `.admin-theme.dark` is edited (the 2 fixes) — it was
  dormant/never-live, so this activates rather than changes shipped behavior.
- **No backend, no migration, no new permission, no Operator lane, no new deps.** Two-lane.
- **Acceptance (measured):** dark-admin contrast report (both fixes proven, all pairs ≥AA/≥3:1 UI);
  `adminLegibility` grep 61→0 and the gate proven to fire (seed→RED→revert); RULE-26 no clip 1280/1024
  in BOTH admin themes INCLUDING an open portal/dialog in dark (the trap); reuse the DEV-harness pattern
  (a `/dev/admin-preview` rendering AdminPanel with a mocked authorized store, tree-shaken from prod) so
  evidence is fresh-clone reproducible — the auth-gate lesson from C/CHAT-UX-1.
- **Drift:** `src/**` UNMAPPED (PHASE-C/CHAT-UX-1 precedent) ⇒ likely no reseal; gate on
  `check:doc-drift`, bump docVersion only if flagged.

## 3. Deliverable order
1. This design note (v1) — done.
2. ONE gated AG phase prompt (next): `adminThemeClass()` helper + wire all 8 points → global theme ·
   the 2 dark-palette fixes (verbatim values) · 61 `text-[10/11px]`→`text-xs/sm` · `adminLegibility`
   CI gate · `/dev/admin-preview` harness · frozen sweep · RULE-26 both themes + portal-in-dark.

<!-- END · cwf-admin-theme-1-design-v1 · v1 · 2026-07-09 · anchor 8632eac -->
