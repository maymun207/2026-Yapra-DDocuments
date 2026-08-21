# Claude Code — PHASE-UM-2: User-management legibility (status · detail · audit view · search)
**rev 1 · 2026-06-30 · target HEAD `d37a584` · canonical repo `cwf_yaprak` · Author lane (Claude Code 4.8)**

## Why this phase exists
UM-1 gave the admin the lifecycle **operations**; UM-2 makes the surface **legible** so the admin knows *which* user needs *which* op at a glance, and can see the trail of what was done. All data already exists — `AdminAuthUser` carries `created_at / banned_until / email_confirmed_at / last_sign_in_at`, and the `user_audit` table is populated. This phase is **read-only display + one repository read method**: no migration, no owner step.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `d37a584`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record count N.
3. Read: `api/admin/users.ts` (the GET list map — already returns `disabled`/`emailConfirmed`/`last_sign_in_at`; the POST switch), `api/cwf/_lib/persistence/repositories/UserAuditRepository.ts` (only `insert` today — you will add a read), `shared/dbConstants.ts` (`DB_TABLES.USER_AUDIT`, `USER_AUDIT_ACTIONS`), `src/components/admin/UsersTab.tsx` + `src/store/adminStore.ts` + `src/lib/adminService.ts` (list render + the UM-1 action menu to extend).

## HARD CONSTRAINTS
- **Status is computed SERVER-side (single source).** Add one pure helper; the badge AND the filter both read the server-provided `status` so they can never disagree. Do not recompute status independently on the client.
- **Audit view is read-only + gated + bounded.** The per-user audit fetch goes through the gated `USER_MANAGE` endpoint, selects only that target's rows, ordered newest-first, with a LIMIT (no unbounded dump).
- **No secret exposure in the audit trail.** `user_audit` never stored temp passwords (UM-1 verified); display `action / actor / old→new / timestamp` as-is. If you resolve `actor_user_id` → email for legibility, reuse the existing auth-user email map; never expose anything beyond email.
- **Don't break the UM-1 list shape.** Keep `disabled`/`emailConfirmed`/`last_sign_in_at`/`created_at`; `status` is ADDITIVE.
- **No migration, no new table, no owner step.** Read-only over existing data.
- **No change to:** eval-gate, governance trust line, chat path, RBAC logic, the lifecycle ops themselves.
- **Doc lock-step:** `api/admin/**` (Governance Model) and `api/cwf/_lib/persistence/**` (Runtime Topology) will flag in `build`'s drift-guard → reconcile + reseal same-commit at the verified altitude.

---

## UM-2A — Account status model (server-computed, returned + badged)
Add a pure helper (next to `isDisabled`) — `computeUserStatus(u: AdminAuthUser): 'active' | 'pending' | 'unconfirmed' | 'disabled'` with this **precedence**:
1. `isDisabled(u.banned_until)` → `'disabled'`
2. else `!u.email_confirmed_at` → `'unconfirmed'`
3. else `!u.last_sign_in_at` → `'pending'` (invited / provisioned, hasn't completed first sign-in)
4. else → `'active'`
Return `status` in the GET list map (alongside the existing fields). UI: a status badge per row (distinct colors; disabled=muted/red, unconfirmed=amber, pending=blue, active=green) — use the design tokens, no new color literals if a palette exists.

## UM-2B — User-detail drawer + per-user audit trail
- `UserAuditRepository.listForUser(targetUserId: string, limit = 50)` (NEW): `select * from USER_AUDIT where target_user_id = $1 order by created_at desc limit $2`. Service-role read; returns `[]` on error (logs, never throws — mirror the repo's resilient style).
- GET branch: `GET /api/admin/users?userId=<id>` → `{ audit: AuditRow[] }` (gated `USER_MANAGE`). Keep the existing no-param GET as the list. (Resolve each row's `actor_user_id` → email via the auth-user map for display, if cheap.)
- UI: clicking a row opens a **detail drawer/panel** showing `email · user_id · status · created_at · last_sign_in_at · email_confirmed_at`, then the **audit trail** (action · actor · old→new · when), newest first. Read-only.

## UM-2C — Search / filter (client-side)
In `UsersTab`, operate on the already-fetched list (counts are small; server-side search is a tracked follow-up):
- A search box matching `email` (and optionally `user_id`), case-insensitive, substring.
- A **status filter** (all / active / pending / unconfirmed / disabled) reading the server `status` field, and a **role filter** (all / super_admin / power_user / user).
- Empty-result state ("no users match").

---

## SELF-VERIFICATION CHECKLIST (evidence — paste, don't self-report)
- [ ] Pre-flight green; N recorded.
- [ ] **Status:** a unit test of `computeUserStatus` covers all four branches + the precedence (disabled wins over unconfirmed/pending; unconfirmed wins over pending). GET returns `status`; the UM-1 fields are unchanged (list shape back-compat).
- [ ] **Audit view:** `listForUser` selects only the target's rows, ordered desc, LIMIT-bounded, returns `[]` on error (test). `GET ?userId=` is `USER_MANAGE`-gated and read-only; no secret fields surfaced.
- [ ] **Search/filter:** filtering by status uses the server `status` field (badge + filter agree); search is case-insensitive substring; empty-state renders.
- [ ] **Scope clean:** `git diff d37a584 -- api/cwf/chat.ts api/cwf/_lib/knowledge api/cwf/_lib/evalGate` empty; the POST lifecycle switch byte-identical; no migration added.
- [ ] **Build green incl. drift-guard** (`[OK] no drift`); Governance Model + Runtime Topology resealed + `docVersion` bumped (altitude justified). Full suite green; state the new count.

## OUT OF SCOPE (tracked follow-up)
- **Server-side search/pagination of the filter** (only needed at large user counts; client-side covers current scale).
- **UM-3:** change email / display name, resend-invite / regenerate-temp-pw / revoke pending invite.
- Login-history depth / session list (blocked on the same session-introspection gap as force-signout).

---
*Owner steps after AG pushes: none (read-only, no migration). I will verify from the repo: status is server-computed with the correct precedence (tested), the audit read is gated/bounded/target-scoped and leaks no secret, badge+filter share the one `status` source, the UM-1 list shape is intact, and the two doc tabs are sealed at the right altitude. Then UM-3 to finish the surface.*
