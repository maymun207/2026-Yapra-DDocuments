# Claude Code — PHASE GOV-2 · Admin Shell + Design System
**rev 1 · 2026-06-28 · base HEAD `780018a` · canonical repo `cwf_yaprak`**

Governance redesign **step 2** (steps RBAC-1 + RBAC-1.1 were step 1). This builds the **chassis**: a modern, *legible* admin shell on a real design system (shadcn/ui), with scrollable/searchable data tables, proper loading/empty/error states, a role + environment badge, and capability-driven controls. It does **not** build per-table edit/reset UI (step 3), session-preview/Lab mode (step 4), or the Tool Routing tab (step 5).

**Why this phase exists (the real problem):** the current admin UI is unreadable — measured: 48× `text-xs`, plus `text-[10px]`/`text-[11px]`, and foreground colors at `text-white/40`, `text-white/30`, `text-white/20` (white at 20–40% opacity on a dark panel — **far below WCAG AA contrast**). The fix is **not** "add shadcn" alone; it is a legible token system with enforced contrast and minimum sizes. shadcn gives the legible base; this phase makes legibility a **measured, hard requirement** so the unreadable tokens cannot survive.

---

## HARD PRE-FLIGHT GATE — verify and paste
1. `git rev-parse HEAD` → `780018a` (or report actual). `git status --porcelain` clean.
2. Confirm the stack: `grep -E "\"(tailwindcss|react|vite|lucide-react)\"" package.json` → Tailwind **v4** (`^4.x`), React 19, Vite 8, lucide-react present.
3. Confirm Tailwind v4 CSS-first config: `head -3 src/index.css` shows `@import "tailwindcss";`, and there is **no** `tailwind.config.js`. (shadcn setup for v4 differs from v3 — use the v4 path.)
4. Confirm no shadcn yet: `ls src/components/ui 2>/dev/null` empty/absent; `grep -rn "tailwind-merge\|class-variance-authority\|export function cn" src/` → none.
5. Confirm the capability layer from step 1 exists (this phase consumes it): `grep -rn "can(\|capabilities\|permissionsForRole" src/store/adminStore.ts src/components/admin/AdminPanel.tsx | head`.
6. Confirm the chat shell is a SEPARATE surface you must NOT touch: note the chat entry (`src/components/ui/ChatShell.tsx`, `src/store/cwfStore.ts`) — these stay byte-identical.

---

## HARD CONSTRAINTS (mechanical)
- **Scoped to `/admin` ONLY.** Do **not** restyle, retheme, or touch the chat shell / main app (`ChatShell.tsx`, `cwfStore.ts`, the streaming UI, the global chat aesthetic). Prove with `git diff` that no chat-shell file changed and the chat surface renders identically. shadcn's theme tokens may be added globally, but the **admin light theme is applied via a scoped wrapper** so the chat shell's appearance is unchanged.
- **No behavioral / gate / runtime file touched.** `chat.ts`, `gateway.ts`, grounding, `evalGate.ts`, prompt packs, the admin API endpoints — untouched. This is a pure frontend chassis + presentation phase. Prove with `git diff --stat`.
- **Preserve ALL RBAC enforcement from step 1.** Capability-driven UI is presentation only: gate controls on the `can(perm)` selector (server-derived capabilities), never invent client-side authority. The server endpoints remain the security boundary. A power_user must still see publish + user-management controls **disabled** (not hidden-then-crash).
- **LEGIBILITY IS A MEASURED REQUIREMENT (the point of this phase):**
  - **Contrast:** every text/background pair meets **WCAG AA — 4.5:1** for body/data text, **3:1** for large (≥18px bold / ≥24px). **No** `text-white/40`, `/30`, `/20`-style low-opacity foregrounds. Use a proper `--foreground` / `--muted-foreground` token pair with verified ratios.
  - **Minimum sizes:** data/body text ≥ **14px** (`text-sm`); labels/captions ≥ **12px** (`text-xs`) and never below; **zero** `text-[10px]`/`text-[11px]` in the admin tree.
  - **Default theme:** the admin panel defaults to a **light, high-contrast theme** (most legible for data-dense governance; the chat shell stays dark). Build it on tokens so a dark admin theme is a later toggle, not a rewrite.
- **RULE 1 — tokens centralized.** Colors/spacing/typography live as CSS variables / theme tokens, not inline literals. shadcn components are **owned source** (copied into the repo), deps pinned.
- No `.env*` touched; no secret printed.

---

## GATED SUB-PHASES

### 2A — Design-system foundation (shadcn/ui on Tailwind v4)
- Initialize shadcn for **Tailwind v4 + Vite + React 19** (`npx shadcn@latest init`, the v4 path: `components.json`, CSS-variable theme in `src/index.css` via the v4 `@theme inline` / `:root` tokens, `tw-animate-css` not `tailwindcss-animate`). Add `src/lib/utils.ts` with `cn()` (clsx + tailwind-merge). Pin the new deps (`class-variance-authority`, `clsx`, `tailwind-merge`, the needed `@radix-ui/*`).
- Define a **legible token set** that meets the contrast/size constraints above. Verify the `--foreground`/`--muted-foreground`/`--background`/`--card` pairs against WCAG AA and record the ratios.
- Add the primitives this redesign needs: `button`, `badge`, `input`, `select`, `switch`, `dialog`, `table`, `tabs`, `tooltip`, `dropdown-menu`, `scroll-area`, `skeleton`, and a toast (`sonner`).
- **Do not change the chat shell's appearance.** If init writes global tokens, ensure the chat surface still renders identically (the admin theme is applied via a scoped `.admin-theme` wrapper or the panel root).

**Gate:** `vite build` green; `cn()` works; a contrast report for the core token pairs (all ≥ AA); chat shell visually unchanged (state how verified).

### 2B — Admin shell: nav + role/environment badge
- Replace the ad-hoc `AdminPanel` layout with a proper shell: a **left sidebar nav** (Users · Rules · Kinds · Telemetry — Routing & Lab are later steps, omit), and a **top bar** with: the signed-in identity, a **role badge** (user / power_user / super_admin), and an **environment indicator** — `GLOBAL · prod` for super_admin (changes deploy globally) vs a neutral `SESSION` placeholder for power_user (the live Lab/dev wiring is step 4; show the badge now, no behavior).
- **Capability-driven nav:** tabs/items the role can't use are hidden or disabled with a tooltip; panel access itself stays gated on `can(PANEL_ACCESS)`.
- Responsive and keyboard-navigable (Radix gives focus management — keep it).

**Gate:** a super_admin sees all tabs + `GLOBAL · prod`; a power_user sees the allowed tabs + the role badge, with publish/user-mgmt entry points disabled.

### 2C — Real data tables + states (fixes the scroll/legibility bug)
Rebuild each existing tab's table on the shadcn `table` + `scroll-area`:
- **Scrollable container + sticky header** (this fixes the Kinds-doesn't-scroll bug — verify Kinds now scrolls with many rows).
- **Search/filter** per table; **pagination** (or virtualization if a table can exceed ~200 rows).
- Proper **loading** (skeleton), **empty** ("no rows / not authorized"), and **error** states — not silent blanks.
- **Capability-driven row actions:** controls a role lacks are disabled + tooltip (e.g. power_user: Rules "Publish (global)" disabled; Users mutations disabled). Reuse the step-1 `can()` selector — do not re-derive authority.
- UsersTab already has CRUD (RBAC-1); restyle it into the new system and keep its anti-lockout-aware controls. Keep the existing gate-verdict teaching surface (RulesTab) — restyle, don't remove.

**Gate:** Kinds table scrolls; every tab has loading/empty/error states; capability gating matches the server (power_user disabled, super_admin enabled).

### 2D — Legibility + a11y verification (the acceptance bar)
- **Zero** `text-white/{20,30,40,50}` and **zero** `text-[10px]`/`text-[11px]` remain in `src/components/admin/**` (grep proof).
- Contrast report: every foreground/background pair in the admin tree ≥ WCAG AA (list the pairs + ratios).
- Keyboard navigation works (tab order, focus rings, dialog focus trap via Radix).

**Gate:** the grep returns empty for the banned tokens; the contrast report is all-AA; a keyboard-only pass reaches every control.

---

## SELF-VERIFICATION CHECKLIST — confirm WITH EVIDENCE
- [ ] Pre-flight 1–6 pasted.
- [ ] shadcn initialized for Tailwind v4; `cn()` present; primitives added; deps pinned (paste `package.json` diff for the new deps).
- [ ] **Legibility proof:** `grep -rnE "text-white/(20|30|40|50)|text-\[1[01]px\]" src/components/admin/` → **empty**. Paste it.
- [ ] **Contrast proof:** the core token pairs + the admin tree's text pairs are listed with ratios, all ≥ AA (4.5:1 body / 3:1 large).
- [ ] **Min-size proof:** data/body ≥ 14px, labels ≥ 12px across the admin tree.
- [ ] **Scroll fix:** Kinds table scrolls with many rows (describe/screenshot).
- [ ] **States:** each tab shows loading (skeleton) / empty / error — not blanks.
- [ ] **Capability gating:** power_user session → publish + user-mgmt controls disabled (tooltip); super_admin → enabled. Matches the server.
- [ ] **Chat shell untouched:** `git diff` shows no change to `ChatShell.tsx` / `cwfStore.ts` / chat surface; the chat renders identically (state how verified).
- [ ] **No behavioral/gate file touched:** `git diff --stat` lists only frontend/admin + design-system files; `chat.ts`/`gateway`/grounding/`evalGate.ts`/prompt packs/admin endpoints unchanged.
- [ ] No `.env*` touched; no secret printed; RULE 1 (tokens centralized).
- [ ] `tsc -b` + typecheck:api + `vite build` + `oxlint` + `vitest` all green — paste numbers (admin store/service contracts from step 1 still pass).
- [ ] `git diff --stat` — full file list.

---

## STOP
Do **not** build per-table edit/reset UI (step 3), session-preview/Lab mode (step 4), or the Tool Routing tab (step 5). Stop after the checklist and present the report **with the empty banned-token grep, the contrast report, and the Kinds-scroll proof**. Then state:

> **"GOV-2 complete — legible admin shell on shadcn/ui (Tailwind v4); WCAG AA contrast + min-size enforced (banned-token grep empty); scrollable searchable tables with loading/empty/error states; role + environment badge; capability-driven controls matching server enforcement. Chat shell untouched; no behavioral/gate file touched. Ready for step 3 (per-table edit/reset affordances)."**
