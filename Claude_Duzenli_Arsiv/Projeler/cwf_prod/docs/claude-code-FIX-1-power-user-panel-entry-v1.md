# FIX-1 — power_user can't see the panel entry (stale role-literal gate)
**rev 1 · 2026-07-01 · target base HEAD `3408c61` (master)**

**Bug:** a `power_user` logs in and the left sidebar shows **no Admin/Settings entry**, so they can't reach the panel (Lab tab = their session/test config). Root cause: `src/components/ui/Sidebar.tsx` gates the entry on a **role literal** that lists only `super_admin` + the **deprecated** `domain_editor` — power_user (the current maker role) isn't in it. The permission model already grants the maker `PANEL_ACCESS`; the UI just doesn't ask the capability. Classic capability-driven-UI + RULE 1 violation left stale by the domain_editor→power_user rename.

**Scope: UI-only.** The `/admin` route and `AdminPanel` are ALREADY correct — `AdminPanel.tsx:49` uses `hasPermission(role, PERMISSIONS.PANEL_ACCESS)` and there is no route-level role guard, so a power_user who types `/admin` is already authorized (they just can't see the link). Do NOT touch the server, the route, the panel's authorization, or any endpoint — those correctly enforce PANEL_ACCESS already.

---

## PRE-FLIGHT GATE (abort if any check fails — paste evidence)
1. `src/components/ui/Sidebar.tsx` still contains `const canGovern = role === ROLES.SUPER_ADMIN || role === ROLES.DOMAIN_EDITOR;` and the entry renders under `{canGovern && ( <Link to="/admin">…{t('admin')}…</Link> )}`.
2. `grep -n "ROLES" src/components/ui/Sidebar.tsx` shows `ROLES` is used ONLY in that one line (so its import becomes dead after the fix).
3. `src/components/admin/AdminPanel.tsx` already uses `hasPermission(role, PERMISSIONS.PANEL_ACCESS)` (the reference this fix must mirror), and `MAKER_PERMISSIONS` in `shared/permissions.ts` includes `PERMISSIONS.PANEL_ACCESS` while the plain `user` set does NOT.

---

## HARD CONSTRAINTS
- **Capability, not role (RULE 1).** The gate must be `hasPermission(role, PERMISSIONS.PANEL_ACCESS)` — no role literal, no new inline permission string. This makes the sidebar and `AdminPanel` share ONE source of truth for panel visibility.
- **Do not broaden access.** Plain `user` (no `PANEL_ACCESS`) must STILL not see the entry. super_admin, power_user, and the deprecated domain_editor (all have PANEL_ACCESS) see it.
- **UI-only.** No server / route / endpoint / authorization change — those already gate on PANEL_ACCESS.
- **RULE 20:** `src/**` is unmapped in `public/architecture/manifest.json` (verify) → no doc seal. If somehow mapped, reseal per RULE 20.

---

## THE FIX
1. `src/components/ui/Sidebar.tsx`:
   - Remove `import { ROLES } from '../../../shared/dbConstants';` (now unused).
   - Add `import { hasPermission, PERMISSIONS } from '../../../shared/permissions';`.
   - Replace `const canGovern = role === ROLES.SUPER_ADMIN || role === ROLES.DOMAIN_EDITOR;` with `const canAccessPanel = hasPermission(role, PERMISSIONS.PANEL_ACCESS);`.
   - Update the render guard `{canGovern && ( … )}` → `{canAccessPanel && ( … )}`.
2. **Adaptive label** (the "should be Settings" half): the entry currently reads `{t('admin')}`. Make it role-honest — `super_admin` sees **Admin**, everyone else with panel access sees **Settings/Ayarlar**:
   - Add a translation key (e.g. `settings` → `{ tr: 'Ayarlar', en: 'Settings' }`) in `src/lib/translations.ts` if not present.
   - Render `{role === ROLES.SUPER_ADMIN ? t('admin') : t('settings')}` — this is a display-only role check (labels differ by role), NOT an authorization check (the gate above stays capability-based). Keep the `ROLES` import ONLY if you use it here; otherwise compare against the string via a existing helper. (Simplest: keep a minimal `ROLES` import solely for this label branch — acceptable since it's presentation, not a gate.)

---

## SELF-VERIFY (evidence)
- Paste the `Sidebar.tsx` diff. Confirm the gate is now `hasPermission(role, PERMISSIONS.PANEL_ACCESS)` and matches `AdminPanel.tsx:49` byte-for-byte in intent.
- **New regression test** — add `src/components/ui/__tests__/sidebar.test.tsx` (or the nearest existing UI test harness): render the sidebar (mock the auth store role + a MemoryRouter) and assert:
  - `role='power_user'` → the panel link is present (and labelled "Settings").
  - `role='super_admin'` → present (labelled "Admin").
  - `role='user'` → the panel link is ABSENT.
  This is the test whose absence let the gate drift — it must fail if a role literal is reintroduced. Paste it + `npm run test` (count rises).
- `npm run build` + `oxlint` clean (the dead `ROLES` import must be gone unless reused only for the label branch).
- RULE 20: confirm `src/**` matches no `manifest.json` `codeAreas` glob → no seal. `npm run check:doc-drift [OK]`.

## FINISH
One commit (`fix(rbac-ui): show the panel entry to power_user via PANEL_ACCESS, not a stale role literal`) on a branch → PR to `master`. Paste `git log --oneline` + the green CI checks on the PR (the coverage/build gates now run live). Confirm no server/route/panel authorization was touched.
