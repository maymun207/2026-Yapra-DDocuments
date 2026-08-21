# claude-code — PHASE ADMIN-THEME-1: Admin Joins Global Theme + Legibility Restore · v1

<!-- claude-code-PHASE-ADMIN-THEME-1-v1 · v1 · 2026-07-09 · Architect-authored (Claude).
     Anchor = origin/master `8632eac` (1250 tests / 125 files / docVersion rev 53 / drift [OK]).
     Design: cwf-admin-theme-1-design-v1 (owner-approved 2026-07-09, combined scope).
     Corrects CHAT-UX-1's mistake: theme must be GLOBAL. You (AG) implement EXACTLY. ONE clarifying
     design question allowed; expect ONE committed answer. -->

## 0. HARD PRE-FLIGHT
1. `git fetch && git rev-parse origin/master` MUST print `8632eac81645bb850232bbc2192dc402781f3509`.
   Moved? STOP, report.
2. `git status --porcelain` empty.
3. Baseline: `npm ci --no-audit --no-fund --silent && npx vitest run --reporter=dot 2>&1 | tail -5`
   MUST show **1250 passed / 125 files**. Record tail.
4. `npm run check:doc-drift` → `[OK]`. Record.
5. Branch: `git checkout -b feat/admin-theme-1`.

## 1. HARD CONSTRAINTS
- **FROZEN — zero diffs:** `api/` (all) · `shared/permissions.ts` · `shared/dbConstants.ts` ·
  `supabase/` · `scripts/verifyGrants.ts` · `.mcp.json` · `src/components/ui/ChatShell.tsx` ·
  `src/components/ui/LoginPage.tsx` · `src/components/ui/Sidebar.tsx` · `src/components/ui/cwf/**` ·
  `src/lib/useChatTheme.ts` (CONSUME, do not edit) · `src/components/docs/**`. In `src/index.css`
  the `:root` and `.chat-theme*` blocks are byte-frozen; ONLY the `.admin-theme.dark` block is edited
  (the two fixes in §T.2) and NOTHING else in that file.
- **No new deps, no secrets, no new permission, no migration (no Operator lane).**
- Dark-palette values in §T.2 are Architect-measured and VERBATIM — do not re-derive or adjust.
- Merges `--no-ff` (squash banned). CHANGELOG entry permitted; manifest reseal permitted if drift flags.
- RULE 26: nothing clips at 1280/1024 — rendered evidence, BOTH admin themes + an open portal in dark.

## 2. WHAT YOU ARE BUILDING (one paragraph)
Admin/settings currently ignore the global theme (a full dark palette exists but is never activated;
DocsReader already honors `cwf.theme`, AdminPanel does not). You will: route every `.admin-theme`
application point through a new `adminThemeClass()` helper that appends `dark` from the SAME
`cwf.theme` the chat toggle writes; activate + correct the dormant `.admin-theme.dark`; restore the
61 `text-[10/11px]` legibility violations; and wire an `adminLegibility` CI gate so neither regresses.

## 3. GATED SUB-PHASES

### T.1 — The `adminThemeClass()` helper + wire all 8 points
1. NEW `src/lib/adminTheme.ts`:
   ```ts
   import { useChatTheme } from './useChatTheme'; // returns true = LIGHT (global cwf.theme)
   /** The admin design system class, theme-aware from the global cwf.theme.
    *  The ONLY place `.admin-theme` is applied — raw string literals are banned (adminLegibility). */
   export function useAdminThemeClass(extra = ''): string {
       const light = useChatTheme();
       return `admin-theme${light ? '' : ' dark'}${extra ? ' ' + extra : ''}`;
   }
   ```
2. Replace EVERY raw `"admin-theme"` / `className="admin-theme …"` occurrence with the helper:
   - `AdminPanel.tsx` roots (lines 92, 166) — `useAdminThemeClass('h-screen w-screen …')`.
   - Any `.admin-theme` in `ReplayTab.tsx`, `ProvidersTab.tsx`, `MCPSettingsTab.tsx`.
   - The 4 portal primitives — `select.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `tooltip.tsx`: each
     `*Content` currently prepends `"admin-theme"` via `cn(...)`; swap to `cn(useAdminThemeClass(), …)`.
     (These are hooks — the primitives are function components, so `useAdminThemeClass()` is a legal
     call. If any is not a component/hook context, resolve the class from a passed prop or a tiny
     non-hook reader of `useUIStore.getState().theme` + matchMedia — pick the clean path and pin it.)
   **Trap:** portals render to `document.body` outside the admin root; they MUST resolve the theme
   themselves or they render light over a dark panel. Verify a dropdown/dialog opened while dark is dark.
**GATE T.1:** `tsc --noEmit` clean; grep `"admin-theme"` raw string across `src/**` (excluding
`adminTheme.ts` + `index.css` + `DocsReader.tsx`) returns ZERO.

### T.2 — Activate + correct `.admin-theme.dark` (VERBATIM edits)
In `src/index.css`, inside the existing `.admin-theme.dark` block, change ONLY these three lines:
```css
    --destructive: oklch(0.55 0.20 25);   /* was oklch(0.704 0.191 22.216) — white-on-btn 2.75→5.15:1 */
    --border: oklch(1 0 0 / 18%);          /* was 12% — mild perceivability */
    --input: oklch(1 0 0 / 22%);           /* was 15% — mild perceivability */
```
Everything else in `.admin-theme.dark` stays byte-identical.
**Contrast report (Architect-measured, sRGB WCAG — ship, do not re-derive):**
foreground/bg 18.96 · foreground/card 17.16 · mutedFg/card 8.05 · primaryFg/primary 14.22 ·
secondaryFg/secondary 14.48 · destructive-fg(white)/destructive **5.15** · destructive/card(text) 3.33
(≥3:1 UI) · success/card 7.14 · warning/card 8.78 · foreground/sidebar 17.16. All text ≥AA.
**GATE T.2:** `git diff src/index.css` shows ONLY these three changed lines; `vite build` clean.

### T.3 — RULE-16 legibility restore (61 → 0)
All 61 are `text-[10px]`/`text-[11px]` (56 in `ReplayTab.tsx`; rest in `ProvidersTab.tsx`,
`adminUi.tsx`, `TweakTab.tsx`, `AdminPanel.tsx`). Replace: labels/badges/mono-IDs → `text-xs`
(12px); any tabular DATA cell → `text-sm` (14px). No layout redesign, no color change (admin color is
already tokenized). Do not touch `text-xs`/`text-sm` that already comply.
**GATE T.3:** the T.4 grep already lands EMPTY on `src/components/admin/**`.

### T.4 — `adminLegibility` CI gate
NEW `src/components/admin/__tests__/adminLegibility.test.ts` (mirror the proven `chatLegibility`):
reads `src/components/admin/**/*.tsx` from disk and asserts ZERO matches of
`/(text|bg|border|ring|placeholder:text)-white\/(20|30|40|50)|text-\[10px\]|text-\[11px\]/`
AND ZERO raw `/"admin-theme"/` or `/className="admin-theme/` string (all must route through
`useAdminThemeClass`), with file+line in the failure message. Prove it fires: temporarily seed a
`text-[10px]` → RED → revert (note it in the report).
**GATE T.4:** full suite green; report NEW totals (recount — expect 125 + 1 file; do not assume).

### T.5 — Admin preview harness + seal
1. Extend the DEV harness pattern: NEW `src/dev/AdminPreview.tsx` + a DEV-only branch in `App.tsx`
   (`import.meta.env.DEV && pathname === '/dev/admin-preview'`) rendering `AdminPanel` with a MOCKED
   authorized store (super_admin, no network/Supabase) + a visible theme toggle. Prove tree-shaken:
   `vite build` then `grep -ri admin-preview dist/` = 0.
2. RULE-26 evidence: AdminPanel at 1280 and 1024, **dark AND light** (≥4 images) PLUS one image of an
   **open Select/Dialog in dark** proving the portal is themed (the trap) + a programmatic clip table.
3. `.agents/CHANGELOG.md` entry (ADMIN-THEME-1: what/how/verify, the 3 fixes, 61→0, the gate, the
   global-theme correction). Update the KB `§RULE 16` note that the ban is now a wired gate.
4. `npm run check:doc-drift`; reseal-not-redraw + docVersion bump ONLY if it flags.
5. **Frozen sweep (literal, must print nothing):**
   `git diff --stat 8632eac..HEAD -- api/ shared/permissions.ts shared/dbConstants.ts supabase/ scripts/verifyGrants.ts .mcp.json src/components/ui/ChatShell.tsx src/components/ui/LoginPage.tsx src/components/ui/Sidebar.tsx src/components/ui/cwf/ src/lib/useChatTheme.ts src/components/docs/`
   plus `git diff 8632eac..HEAD -- src/index.css` showing ONLY the three `.admin-theme.dark` lines.
6. Merge `--no-ff`, push, report remote hash.

## 4. SELF-VERIFICATION REPORT (literal evidence — build-green is NOT acceptance)
Verbatim: pre-flight HEAD + 1250/125 tail + drift `[OK]` · per-gate outputs · raw-`"admin-theme"` grep
= 0 · index.css diff = the 3 lines only · legibility grep 61→0 on admin · adminLegibility fires proof ·
final suite NEW counts (recounted) · `dist/` grep proving admin-preview absent from prod · the ≥5
RULE-26 images incl. dark portal + clip table · frozen-sweep empty · CHANGELOG hunk · drift final ·
remote hash. The Architect fresh-clones and independently re-verifies every claim (RULE 25).

<!-- END · claude-code-PHASE-ADMIN-THEME-1-v1 · v1 · 2026-07-09 · anchor 8632eac -->
