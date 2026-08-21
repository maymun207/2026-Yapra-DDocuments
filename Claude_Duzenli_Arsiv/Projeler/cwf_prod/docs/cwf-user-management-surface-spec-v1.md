# CWF — User Management Admin Surface — complete spec
**rev 1 · 2026-06-30 · canonical repo `cwf_yaprak` · seeds phases UM-1…UM-3**

## Principle (the thing I violated, now fixed)
**Every account operation flows through the gated, audited, RBAC'd `/api/admin/users` endpoint and is mutated server-side via the service role. Zero Supabase-dashboard touches for any user operation.** A super_admin manages users entirely inside the app. Any operation that still requires the Supabase dashboard is a **missing tooling feature** (automation-first), not a task to hand off. The determinism boundary holds: account DATA/operations → gated admin UI; STRUCTURE (the action set, the CHECK constraint, the endpoint) → code/migration; SECRETS → env (temp-pw is returned over HTTPS once, never stored/logged).

## What a complete user-management surface is (and our gap)

| Capability | Status | Where |
|---|---|---|
| Invite (temp-pw + set-password link) | ✅ HAVE | INV-3 |
| Assign role (super_admin / power_user / user) | ✅ HAVE | dropdown + anti-lockout |
| Per-backend scopes (armes / superset) | ✅ HAVE | toggles |
| Remove role · Delete user | ✅ HAVE | actions |
| Send password-reset link (→ /accept-invite) | ⚠️ PARTIAL | backend `sendReset` exists; **needs a clear UI button + audit** |
| **Set a temp password directly** (admin-provisioned) | ❌ MISSING | — |
| **Disable / Enable account (lock/unlock)** | ❌ MISSING | the #1 gap — no way to block a user without deleting |
| **Force sign-out / revoke sessions** | ❌ MISSING | can't kick a compromised/departing user |
| **Confirm email manually** | ❌ MISSING | we hit this live; had to use the dashboard |
| **Resend invite / regenerate temp-pw** (pending users) | ❌ MISSING | — |
| **Account status badge** (active / pending / disabled / unconfirmed) | ❌ MISSING | list shows no state |
| **User detail**: created_at · last_sign_in · confirmed_at | ❌ MISSING | no observability per user |
| **Per-user audit trail** (who did what, when) | ❌ MISSING (data exists) | `user_audit` table populated but never surfaced |
| **Change email / display name** | ❌ MISSING | — |
| **Search / filter** users | ❌ MISSING | — |
| Pagination (all auth users) | ✅ HAVE | `fetchAllAuthUsers` |
| Audit-action coverage for the new ops | ❌ MISSING | `user_audit.action` CHECK lacks `password_reset/disable/enable/force_signout/confirm_email/resend_invite` (this is why `sendReset` is currently unaudited) |

## Architecture mapping (every operation, uniformly)
Each operation = one `POST /api/admin/users` action, all sharing the same spine:
- **RBAC gate:** `ensurePermission(USER_MANAGE)` (super_admin).
- **Anti-lockout:** extend the existing guard so you cannot disable / delete / force-sign-out / demote the **last** super_admin (and cannot lock yourself out).
- **Service-role mutation:** the Supabase auth state (ban, password, sessions, email-confirm) is changed only server-side via `supabase.auth.admin.*` — never client-direct, never dashboard.
- **Audit row:** every mutation writes a `user_audit` row (actor, target, action, old→new) — which requires the CHECK-constraint migration below so the new actions are even insertable.
- **Secrets:** temp passwords returned once over HTTPS, surfaced once in the UI, never logged or audited by value.

Supabase admin primitives behind each op: disable/enable → `updateUserById(id, { ban_duration })`; force-signout → `auth.admin.signOut(id, 'global')` (or revoke refresh tokens); confirm-email → `updateUserById(id, { email_confirm: true })`; set-temp-pw → `updateUserById(id, { password })`; reset link → `resetPasswordForEmail(email, { redirectTo: /accept-invite })`; resend invite → re-invite/regenerate.

## Account status model (computed, displayed everywhere)
Derive a single status from auth.users fields, shown as a badge + filterable:
- **Pending** — invited, never signed in / no password set yet.
- **Unconfirmed** — `email_confirmed_at` null.
- **Disabled** — `banned_until` in the future.
- **Active** — confirmed, not banned, has signed in.
This is what makes the list legible at a glance and tells the admin which action applies.

## Committed build sequence (full scope visible; gated phases)

**UM-1 — Audit foundation + the lifecycle operations that end the dashboard dependency.**
- Owner-applied migration: extend `user_audit.action` CHECK to add `password_reset`, `set_temp_password`, `disable`, `enable`, `force_signout`, `confirm_email`, `resend_invite` (backend identity stays data; this is a STRUCTURE change → migration).
- Gated actions + audit + anti-lockout + RBAC: **disable/enable, force-signout, confirm-email, send-reset (surface the button), set-temp-password.**
- UI: per-row action menu (reset · set temp-pw · disable/enable · force sign-out · confirm email · delete), each calling the gated endpoint.
- This single phase removes every reason to open the Supabase dashboard.

**UM-2 — Legibility: status + detail + audit view.**
- Status badge (active/pending/disabled/unconfirmed) computed server-side, returned in the list, filterable.
- User-detail drawer: created_at · last_sign_in · confirmed_at · status, plus the **per-user audit trail** (read the existing `user_audit` rows for that target).
- Search/filter (email, role, status).

**UM-3 — Identity edits + pending-user management.**
- Change email (admin `updateUserById` + re-confirm flow) and display name (user metadata).
- Pending-user affordances: resend invite, regenerate + copy temp-pw, revoke a pending invite.
- (Optional later: bulk actions, CSV export, login-history depth.)

## Standing follow-up folded in
- The **`sendReset` unaudited gap** (flagged in INV-3) is closed by UM-1's CHECK migration + audit emission.
- Anti-lockout is extended from role-only to cover disable/delete/force-signout of the last super_admin.

---
*Build order is committed and dependency-ordered (audit/CHECK foundation first, since every new op needs an insertable audit action). UM-1 is the one that ends the Supabase-dashboard dependency you're rightly angry about — I'll write its gated phase prompt next unless you reorder.*
