# Claude Code — PHASE-UI-1: Admin portal-theme escape + layout fixes
**rev 1 · 2026-06-29 · target HEAD `95235be` · canonical repo `cwf_yaprak` · FRONTEND-ONLY**

## Why this phase exists
The /admin shell is the test cockpit, and two UI bugs are blocking clean use (screenshots provided):
1. **Lab → "Knowledge source" dropdown renders as an unstyled "ghost"** (transparent box, overlapping text).
2. **Routing tab → the Keyword (left) column is clipped / not fully visible.**

**Confirmed root cause for (1) — a portal-theme escape (systematic, affects more than this one dropdown).** GOV-2 scoped every shadcn token to `.admin-theme` (NOT `:root`/`body`) so the dark chat shell stays byte-identical. But the Radix primitives `Select`, `Dialog`, `DropdownMenu`, `Tooltip` render their `*Content` through a **Portal to `document.body`** — *outside* `.admin-theme`. Their content uses `.admin-theme`-scoped CSS-var tokens (`bg-popover`, `text-popover-foreground`, `ring-foreground/10`, `bg-background`), which are **undefined in `document.body`** → transparent background + unstyled text = the "ghost". This silently breaks every portaled popover in the admin panel, not just the one dropdown.

**Proven safe to fix unconditionally:** `grep -rln "@/components/ui/(select|dialog|dropdown-menu|tooltip)" src --include=*.tsx | grep -v "components/admin\|components/ui"` → **empty**. These 4 primitives are admin-only; adding `admin-theme` to their portaled content cannot leak into the chat surface.

---

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `95235be`. Clean tree. (This is a3d11d9 + the migration-applied marker; OBS-1 is live.)
2. `npm ci && npm run build && npx vitest run` — green; record the test count (expect ~390).
3. Read: `src/components/ui/{select,dialog,dropdown-menu,tooltip}.tsx` (the portaled `*Content`), `src/index.css` (the `.admin-theme { … }` token block, ~L24), `src/components/admin/AdminPanel.tsx` (the `.admin-theme` root at ~L79 + the `<main className="… overflow-hidden p-6">` body), `src/components/admin/RoutingTab.tsx` (the `ScrollArea` + `Table` nesting), and one known-good tab for comparison (`KindsTab.tsx` or `RulesTab.tsx`).

## HARD CONSTRAINTS
- **Frontend-only.** No `api/**`, no `chat.ts`, no `shared/**` logic, no migrations. Eval-gate untouched. Tests stay green.
- **`.admin-theme` isolation preserved.** The chat shell stays byte-identical — do NOT move tokens to `:root`/`body`/`*`. The fix adds the class to admin-only portaled content; it must not touch the chat surface.
- **No new design tokens.** Reuse the GOV-2 shadcn system. The GOV-2 **measured** bar holds: data ≥14px, labels ≥12px, WCAG-AA contrast ≥4.5:1 (≥3:1 large); the banned-token grep `text-white/(20|30|40|50)|text-\[1[01]px\]` stays empty.

---

## UI-1A — Portal theme escape (the confirmed root cause; fixes the ghost dropdown app-wide)
Add `"admin-theme"` to the **portaled** Content className of each of the four primitives, so the `.admin-theme` CSS vars resolve on the portaled element (the vars are defined on any element carrying `.admin-theme` and cascade to its children):
- `select.tsx` → `SelectContent` (the `<SelectPrimitive.Content>` className, ~L70): `className={cn("admin-theme", "relative z-50 …", …)}`.
- `dropdown-menu.tsx` → `DropdownMenuContent` (~L46): prepend `"admin-theme"`.
- `tooltip.tsx` → `TooltipContent` (~L42): prepend `"admin-theme"`.
- `dialog.tsx` → `DialogContent` **and** `DialogOverlay` (both are inside `DialogPortal` → both escape; the overlay's `bg-black/…` is fine but the content needs the class): prepend `"admin-theme"` to the content (and the overlay if it references any themed token).
- If any other primitive under `src/components/ui/*.tsx` uses a Portal, treat it the same (the current set is exactly these four — `grep -rln Portal src/components/ui/*.tsx`).

Keep the existing classes intact; only prepend `"admin-theme"`. Do NOT change the Radix portal/positioning behavior.

## UI-1B — RoutingTab Keyword column / layout (screenshot 1)
Diagnose first, then fix the minimal cause:
- `RoutingTab` nests Radix `<ScrollArea className="h-full">` **around** the shadcn `<Table>`, whose own wrapper is `<div className="relative w-full overflow-x-auto">`, inside `<main className="… overflow-hidden p-6">`. This double scroll-container nesting is the suspect.
- Align RoutingTab's table/scroll wrapper to a **known-good tab** (compare to `KindsTab`/`RulesTab`: do they wrap `<Table>` in `ScrollArea`, or rely on the Table's own `overflow-x-auto`?). Match the working pattern so the **Keyword column is fully visible** — sensible column sizing, no left clip, and `truncate` + `title` on overflow rather than hard clipping.
- Verify at two widths (a normal ~1280px and a narrow ~860px like the screenshot): the Keyword column shows in full; a horizontal scrollbar appears only if genuinely needed; no column hides under the sidebar.

## UI-1C — Per-tab viewport audit (the owner said "many UI bugs")
Sweep **every** admin tab — Rules, Kinds, Users, Telemetry, Lab, Routing — at the same two widths. For each, check and fix: clipped/hidden columns or text, any **portaled popover** still rendering unstyled (should be resolved by 1A — verify Select/Dropdown/Tooltip/Dialog in each tab), broken overflow/scroll, and AA-contrast regressions. Produce a short table: `tab → issue(s) found → fix`. Keep fixes minimal and within the GOV-2 system.

---

## SELF-VERIFICATION CHECKLIST (evidence, not assertions)
- [ ] Pre-flight green; test count recorded.
- [ ] **Ghost dropdown fixed:** describe/screenshot the Lab "Knowledge source" Select open → **opaque, themed, readable** (the screenshot-2 ghost is gone). Same spot-check for one DropdownMenu, one Tooltip, and the ConfirmDialog in the admin panel.
- [ ] **`grep -rn "admin-theme" src/components/ui`** shows it added to exactly the four portaled Contents (+ DialogOverlay if touched) — nowhere else.
- [ ] **No chat leak:** re-run `grep -rln "@/components/ui/(select|dialog|dropdown-menu|tooltip)" src --include=*.tsx | grep -v "components/admin\|components/ui"` → still empty (these primitives remain admin-only). The chat surface is visually unchanged.
- [ ] **Keyword column fixed:** describe/screenshot the Routing tab → Keyword column fully visible at both widths (screenshot-1 issue gone).
- [ ] **Per-tab audit table** included (tab → issues → fixes).
- [ ] **AA bar holds:** banned-token grep empty; data ≥14px / labels ≥12px preserved.
- [ ] Build green; full suite green (state the count — should be unchanged from pre-flight, this is frontend-only); `git diff --stat 95235be -- api shared` is **empty** (frontend-only proof).

## OUT OF SCOPE
- The relevance-filter backend-awareness fix (Superset 0-tool / ARMES canonical — the generalized Phase F). That is the **next** phase after this UI pass.
- Any api/chat/governance/migration change.
```
```
After this ships and the cockpit is clean, the next phase is the generalized Phase F: make the relevance filter backend-aware — a gateway backend (Superset) never has its gateway tools (search_tools/call_tool) filtered to zero; ARMES keeps its entry tools (+ the still-open canonical-metric question). The Vercel `[ToolRoute]` line (offered=N/M, canonicalOEE, path) is the read surface to verify it.
```
