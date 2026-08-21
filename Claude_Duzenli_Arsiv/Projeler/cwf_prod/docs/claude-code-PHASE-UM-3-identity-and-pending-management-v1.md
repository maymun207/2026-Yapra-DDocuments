# Claude Code — PHASE-UM-3: Identity edits + pending-user management (finish the surface)
**rev 1 · 2026-06-30 · target HEAD `477819d` · canonical repo `cwf_yaprak` · Author lane (Claude Code 4.8)**

## Why this phase exists
The final slice of the user-management surface: edit a user's **email** and **display name**, and manage **pending** (invited-but-not-activated) users — resend their onboarding and revoke an invite. After UM-3 the admin never needs the Supabase dashboard for anything. Most pending-management reuses existing ops; the genuinely-new backend is the two identity edits (which need two audit actions added to the CHECK).

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `477819d`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record count N.
3. Read: `api/admin/users.ts` (the POST switch incl. `deleteUser`, `sendReset`, `setTempPassword`; the GET list map; `AdminAuthUser`), `api/cwf/_lib/userManagement.ts` (`checkAntiLockout`), `shared/dbConstants.ts` (`USER_AUDIT_ACTIONS` — note `resend_invite` already present; `change_email`/`update_profile` are NOT), `src/components/admin/UsersTab.tsx` + `src/store/adminStore.ts` + `src/lib/adminService.ts` (the action menu + temp-pw reveal modal to extend), `computeUserStatus` (the `pending` state drives the pending-only affordances).

## HARD CONSTRAINTS
- **`user_metadata` MERGE, never overwrite.** Setting the display name must spread existing metadata (`{ ...existing_user_metadata, full_name }`) — overwriting wipes other fields. Read the current metadata first.
- **Email-change safety.** Commit to the **admin-authoritative immediate apply**: `updateUserById(id, { email, email_confirm: true })` (the new email becomes the login identity at once) + audit `old→new`. The UI MUST show a confirm dialog ("the user will sign in with the NEW email — verify it's correct"), because a typo silently moves the account. Surface a clear error on a uniqueness collision (email already in use). (Stricter end-user re-verification flow is a tracked option, not this phase.)
- **Pending-only affordances.** "Resend invite" and "Revoke invite" appear only for `status === 'pending'` rows. Revoke = the existing `deleteUser` (confirm:true, anti-lockout) with pending-appropriate labeling — no new destructive primitive.
- **Secret hygiene.** If resend regenerates a temp password, same rule as `setTempPassword`: returned once over HTTPS, surfaced once in the reveal modal, never logged/audited by value.
- **Anti-lockout.** Email/name edits don't strip access, so no new lockout case — but do NOT weaken the existing guard; revoke (=deleteUser) keeps its last-super_admin/self protection.
- **No change to:** eval-gate, governance trust line, chat path, RBAC role logic, the lifecycle ops from UM-1, the status/audit read from UM-2.
- **Doc lock-step:** `api/admin/**` (Governance Model) + `shared/**` (Architecture Map, via `dbConstants`) will flag in `build`'s drift-guard → reconcile + reseal at the verified altitude.

---

## UM-3A — Migration: two new audit actions
`supabase/migrations/<ts>_user_audit_identity_actions.sql` — drop+recreate the `user_audit_action` CHECK adding `change_email` and `update_profile` to the UM-1 set (keep all existing values). Mirror in `shared/dbConstants.ts` `USER_AUDIT_ACTIONS` (`CHANGE_EMAIL: 'change_email'`, `UPDATE_PROFILE: 'update_profile'`). **Owner-applied** (operator lane) — same best-effort-until-applied posture as UM-1.

## UM-3B — Change email (gated action)
`changeEmail { userId, email }`: validate non-empty/format; `updateUserById(userId, { email, email_confirm: true })`; on uniqueness/other error return a clear 4xx; audit `CHANGE_EMAIL` with `old_value:{email:old}, new_value:{email:new}`. UI: an "Edit email" entry → confirm dialog (old→new warning) → calls the action; the list/detail reflect the new email.

## UM-3C — Change display name (gated action)
`updateProfile { userId, fullName }`: read the user's current `user_metadata`, `updateUserById(userId, { user_metadata: { ...current, full_name: fullName } })`; audit `UPDATE_PROFILE` (`old→new` name). Surface the name: the GET list maps `name: u.user_metadata?.full_name ?? null`; the row/detail shows the name with email as the fallback/secondary line. UI: an inline "Edit name" affordance.

## UM-3D — Pending-user management
- **Resend invite** (`resendInvite { userId }`, pending-only): re-send the set-password link to `/accept-invite` (reuse the `sendReset`/recovery machinery + the single-sourced `redirectTo`) AND regenerate a fallback temp password (`updateUserById({ password })`); return the temp-pw once; audit `RESEND_INVITE`. (Mirrors the invite's "link + temp-pw fallback" but for an already-created pending user — do not call `inviteUserByEmail` again, which would fail on an existing user.)
- **Revoke invite** (pending-only): the existing `deleteUser` action, surfaced as "Revoke invite" on pending rows, with the confirm + anti-lockout intact.

---

## SELF-VERIFICATION CHECKLIST (evidence — paste, don't self-report)
- [ ] Pre-flight green; N recorded.
- [ ] **Migration:** CHECK now includes `change_email` + `update_profile` (all prior values kept); `dbConstants` mirrors them.
- [ ] **Change email:** a test asserts `updateUserById(id,{email,email_confirm:true})`, the audit `old→new`, and a clear error on collision; the UI confirm dialog gates the call.
- [ ] **Change name:** a test asserts the `user_metadata` is **merged** (existing keys preserved), audit `UPDATE_PROFILE`; the list maps `name` from `user_metadata.full_name` (email fallback).
- [ ] **Resend invite:** pending-only; re-sends the `/accept-invite` link (single-sourced redirect) + regenerates temp-pw; the temp-pw is never logged/audited (grep + test); does NOT call `inviteUserByEmail`. **Revoke** = `deleteUser` with confirm + anti-lockout intact (last-super_admin/self still 409).
- [ ] **Secret hygiene:** `grep -rn "tempPassword\|password" api/admin/users.ts` shows no `console.*`/audit emission of any password value.
- [ ] **Scope clean:** `git diff 477819d -- api/cwf/chat.ts api/cwf/_lib/knowledge api/cwf/_lib/evalGate` empty; UM-1/UM-2 behavior byte-identical (lifecycle switch + status/audit read unchanged).
- [ ] **Build green incl. drift-guard** (`[OK] no drift`); Governance Model + Architecture Map resealed + `docVersion` bumped (altitude justified). Full suite green; state the new count.

## OWNER / OPERATOR STEPS
- **Apply the migration** (`<ts>_user_audit_identity_actions.sql`) via Supabase MCP — operator lane (repo-provided migration). Until applied, `change_email`/`update_profile` audit rows are best-effort (logs-and-continues), the ops themselves work.
- **Live acceptance:** edit a user's email (confirm dialog → new email becomes login) and name (appears in the list); for a pending user, resend invite (temp-pw + link) and revoke (removed); confirm last-super_admin/self revoke is refused (409).

## OUT OF SCOPE (tracked follow-up)
- **Stricter email change** requiring end-user re-verification (vs the admin-authoritative immediate apply) — a governance option if you want unverified-email-change disallowed.
- **Audit-or-fail posture** for governance-critical admin mutations (vs the current best-effort) — the standing item from UM-1.
- Force-signout / session-revoke (blocked on the SDK gap, tracked from UM-1); bulk actions; CSV export.

---
*This finishes the user-management surface — every account operation is now in the gated, audited, RBAC'd panel, zero Supabase-dashboard touches. Owner steps after AG pushes: apply the one migration via the operator lane. I will verify from the repo: metadata is merged not overwritten, email-change is audited with a collision error path, resend is pending-only + secret-clean + does not re-invite, revoke keeps anti-lockout, and the two doc tabs are sealed. Then we return to the parked PL-1 F-obs.*
