# Claude Code — PHASE-INV-3: Credential lifecycle hardening
**rev 1 · 2026-06-30 · target HEAD `1fb1d17` · canonical repo `cwf_yaprak` · Author lane (Claude Code 4.8)**

## Why this phase exists (three real bugs, each hit live)
1. **No usable credential after invite/reset.** Invite creates a confirmed-but-**passwordless** user; the link signs them in (token session) but if the set-password form is skipped/not reached, no password is ever set → "Invalid login credentials" on the next email+password sign-in. Recovery/magic links land at Site URL **root** (`/`), which has no set-password step, so reset never produces a password either. (Confirmed live: a dashboard `updateUserById({password})` was the only thing that restored login.)
2. **Session crossover in `AcceptInvite`.** The form only checks `isAuthenticated` (any session) and applies `setPassword` → `updateUser({password})` to **whatever session is active**. If a pre-existing user (e.g. `ksadmin`) is signed in and an invite/reset link is opened (especially a stale/consumed token that establishes no new session), the password is written to the **wrong account**. This is the likely cause of `ksadmin`'s corrupted password.
3. **No fallback when the link path fails** (email delayed/rate-limited, link expired, form skipped).

**Product decision (owner):** invites use the **link as the preferred path AND a temporary password as a fallback** ("ikisi de olsun"). Recovery/reset must always land on the set-password form. The set-password form must never write to the wrong account.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `1fb1d17`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record count N.
3. Read: `api/admin/users.ts` (the `invite` case + the POST switch), `src/components/ui/AcceptInvite.tsx` (persists via `setPassword`; **no identity guard** today), `src/store/authStore.ts` (`setPassword`, `applySession`, `onAuthStateChange`), `src/components/admin/UsersTab.tsx` + `src/store/adminStore.ts` + `src/lib/adminService.ts` (how invite is triggered and the response surfaced), `src/lib/supabaseClient.ts` (`detectSessionInUrl:true`), `shared/appRoutes.ts` (`ACCEPT_INVITE_PATH`).

## HARD CONSTRAINTS
- **Crossover guard is the load-bearing SAFETY fix — make it positive, not best-effort.** `setPassword` must be applied ONLY to a session this page-load established from a link token, for the link's own user. If `AcceptInvite` is opened with a pre-existing session and no fresh link token consumed this load → REFUSE (show "Bu linki, başka bir hesaba giriş yapmışken açtınız — çıkış yapıp linke tekrar tıklayın / You opened this link while signed in as another account — sign out and reopen the link") and do NOT call `setPassword`. Getting this wrong re-corrupts accounts.
- **Temp password is a SECRET.** Generate it server-side (strong, ≥16 chars, CSPRNG). **NEVER log it** (no `console.*`, no audit `new_value`). Return it ONLY in the invite HTTP response to the authorized admin over HTTPS; surface it in the UI **once** (copyable), do not persist it in client state beyond the modal. The audit row records the invite event WITHOUT the password.
- **Server-side targeting:** the post-invite `updateUserById` MUST target the just-created `data.user.id` (never the actor). Same crossover discipline, server-side.
- **RULE 1 / single-source:** reuse `ACCEPT_INVITE_PATH` and the existing `buildInviteRedirect`/origin helper for the recovery `redirectTo`. No literal URLs, no second path literal.
- **Don't regress INV-2:** the invite email (preferred link, `redirectTo=/accept-invite`) keeps sending; the temp password is ADDITIVE.
- **No change to:** eval-gate, governance trust line, chat path, RBAC role logic (invited user still defaults to `'user'` — no role row written), the auth guard.
- **Doc lock-step:** `api/admin/**` (Governance Model tab) will flag in `build`'s drift-guard; reconcile + seal same-commit (verify altitude — the credential mechanics aren't depicted → reseal, no redraw). `src/**` is unmapped → no seal.

---

## INV-3A — Invite: link (preferred) + temp-password (fallback)
In `api/admin/users.ts` `invite` case, after `inviteUserByEmail(email, redirectTo ? { redirectTo } : undefined)` succeeds (keep the redirectTo + omit-guard from INV-2):
- Generate `tempPassword` (CSPRNG, ≥16 chars, mixed classes) using `crypto`.
- `await client.auth.admin.updateUserById(data.user.id, { password: tempPassword })` — sets the fallback credential on the **new** user (confirmed already by invite).
- Return `201 { ok: true, userId: data.user.id, tempPassword }`. The audit row is unchanged (NO password in it).
- `UsersTab` (+ `adminService`/`adminStore`): on a successful invite, show the `tempPassword` **once** in a copyable inline panel/modal with a note: "Davet linki gönderildi (tercih edilen). Bağlantı gelmez/çalışmazsa bu geçici şifreyi güvenli bir kanaldan iletin; kullanıcı girişte değiştirebilir. / Invite link sent (preferred). If the link doesn't arrive, share this temp password securely; the user can change it after signing in." Do not persist it; clear it when the panel closes.
- Benefit to note in the PR: the temp password also **de-risks the email rate limit** — if the invite email is delayed/limited, the user still has a working credential.

## INV-3B — Recovery/reset → set-password form
There is no in-app reset flow today, so recovery lands at root. Add an **admin-triggered reset** (aligned with admin-provisioned factory users):
- `UsersTab`: a "Şifre sıfırla / Send reset" row action (super_admin only — gate via the existing permission) that calls a new admin action.
- Implement it via `client.auth.resetPasswordForEmail(email, { redirectTo: <base> + ACCEPT_INVITE_PATH })` (server-side, reusing the same base/origin helper as the invite). This makes the reset email land on `/accept-invite` — the same set-password form — instead of root.
- `AcceptInvite` already persists; the crossover guard (INV-3C) makes it safe for recovery too. (Recovery fires the `PASSWORD_RECOVERY` auth event — use it as part of the link-driven-session signal in 3C.)

## INV-3C — `AcceptInvite` crossover guard (the safety core)
Bind the set-password form to the **link-established** session for **its own** user:
- On first mount, capture whether this load is link-driven: read the URL hash for a recovery/invite `access_token` (before Supabase consumes it) and decode its `sub` (the link user id); and/or listen for `onAuthStateChange` `PASSWORD_RECOVERY` (recovery) / the fresh `SIGNED_IN` (invite) event.
- Enable the form / allow `setPassword` ONLY when the settled session's user id **equals** the link token's user id (i.e. the link drove this session this load).
- If a session exists but this load was NOT link-driven (no token in the URL, no recovery/invite event) → show the refusal state above and do NOT call `setPassword`.
- Keep the existing grace-period dead-end for the no-session case.
- `authStore.setPassword` may additionally re-assert the target by calling `supabase.auth.getUser()` and confirming identity before `updateUser`, as defense-in-depth (optional, but state what you did).

---

## SELF-VERIFICATION CHECKLIST (evidence — paste, don't self-report)
- [ ] Pre-flight green; N recorded.
- [ ] **INV-3A:** invite returns `{ userId, tempPassword }`; `updateUserById` targets `data.user.id`; a test asserts the temp password is **never** logged and **never** in the audit `new_value` (grep + test). UsersTab shows it once (described or test). Invite email still sends with `redirectTo=/accept-invite` (INV-2 unchanged).
- [ ] **INV-3B:** the reset action calls `resetPasswordForEmail(email, { redirectTo: <base>+ACCEPT_INVITE_PATH })`; `ACCEPT_INVITE_PATH` single-sourced (grep); super_admin-gated (test or described).
- [ ] **INV-3C (safety):** a test proves `setPassword` is BLOCKED when the session is not link-driven for the link's user (the crossover case → refusal, no `updateUser` call), and ALLOWED when the link's user id matches the session. Paste it. This is the must-have test.
- [ ] **Secret hygiene:** `grep -rn "tempPassword\|password" api/admin/users.ts` shows no `console.*`/audit emission of the value; over HTTPS only.
- [ ] **Scope clean:** `git diff 1fb1d17 -- api/cwf api/cwf/_lib/knowledge api/cwf/_lib/evalGate` empty; invited user still defaults to role `user` (no role row written — invite case still does not insert into `user_roles`).
- [ ] **Build green incl. drift-guard** (`[OK] no drift`); Governance Model tab resealed + `docVersion` bumped (altitude justified). Full suite green; state the new count.

## OWNER / OPERATOR STEPS
- **Operator lane (optional):** confirm Supabase Redirect URLs still allowlist `…/accept-invite` (covered by the `/**` entry from INV-1). No new config needed.
- **Acceptance (live, after deploy):** (1) invite a fresh email → admin sees a temp password + the email link arrives; signing in with the temp password works; clicking the link → `/accept-invite` lets the user set their own password; (2) trigger a reset for an existing user → the reset email lands on `/accept-invite` (not root) → setting a password works; (3) **crossover check:** while signed in as `ksadmin`, open an invite/reset link for a *different* user → the form REFUSES (does not change ksadmin's password).

## OUT OF SCOPE (tracked follow-up)
- **User-facing "forgot password"** link on `LoginPage` (same `resetPasswordForEmail(..., {redirectTo:/accept-invite})` machinery) — a natural extension; admin-triggered reset covers the immediate need.
- Custom invite/recovery email templates/branding (operator-lane dashboard).

---
*Owner steps after AG pushes: optional operator allowlist re-check. I will verify from the repo: the crossover guard is positive (blocks the non-link-driven session — the must-have test present), the temp password is never logged/audited and targets `data.user.id`, recovery uses `redirectTo=ACCEPT_INVITE_PATH` single-sourced, invited users still default to role `user`, and the Governance tab is sealed at the right altitude. Then the live three-part acceptance (invite temp-pw + link, reset→/accept-invite, crossover refusal).*
