# FIX-2 — invite flow: unify with reset (drop temp-pw) + crossover recovery
**rev 1 · 2026-07-01 · target base HEAD `bd6a992` (master)**

**Bug (observed end-to-end):** an invited user cannot onboard through the invite path; only the admin-reset path works. Root cause: the `invite` case bolts a **temp-password fallback** (INV-3A) onto the magic-link flow, creating two conflicting credential paths. The temp password is **non-functional** on a freshly-invited user (their email is unconfirmed → password login returns "email not confirmed") and **UX-harmful** (the admin shares it, the user tries to log in with it, hits the wall). The reset path works precisely because it is a single clean magic-link → set-password flow with no temp password. Separately, the crossover guard's `crossover` state is a UX dead-end (a static "sign out and reopen" message with no action), which strands the user when a stale/other session is present (e.g. testing in the same browser as the admin).

**Two independently-gated sub-fixes (2A then 2B), each its own commit.**

---

## HARD PRE-FLIGHT GATE (abort if any check fails — paste evidence)
1. `api/admin/users.ts` `case 'invite'`: calls `inviteUserByEmail(email, {redirectTo})`, THEN `updateUserById(data.user.id, { password: tempPassword })`, and returns `{ ok: true, userId, audited, tempPassword }`.
2. `case 'sendReset'`: calls ONLY `resetPasswordForEmail(email, {redirectTo})` (no temp password) — this is the clean reference path 2A converges the invite onto.
3. `case 'resendInvite'`: also sets + returns a `tempPassword` (same anti-pattern; include it in 2A).
4. `src/components/ui/AcceptInvite.tsx`: the `crossover` branch renders a static message ("You opened this link while signed in as another account. Sign out and reopen the link.") with NO action button. Confirm the comment states an invite/recovery link "lands the user authenticated (link session)" — i.e. the link alone confirms email + establishes the session (this is what makes dropping the temp password safe).
5. `src/lib/inviteGuard.ts`: `evaluateInviteGate` returns `allow` ONLY when `sessionUserId === linkUserId` (POSITIVE id match). This invariant must remain byte-identical after 2B.

---

## HARD CONSTRAINTS (whole phase)
- **Do NOT weaken the crossover guard.** `evaluateInviteGate` stays exactly as-is (positive-id-match, default-deny). 2B only adds a recovery ACTION on the `crossover` state; it must NOT make `crossover` permit set-password, and must NOT auto-clobber a different signed-in user's session without the user's explicit click.
- **Invite must still confirm email via the LINK, not at invite time.** Do NOT add `email_confirm: true` at invite creation — the magic link confirms on click (verification is the point). Removing the temp password must not be "compensated" by auto-confirming.
- **`setTempPassword` (the separate explicit action) is untouched** — it remains for handing a confirmed user a password. Only the temp-pw *embedded in invite/resendInvite* is removed.
- **Secrets (RULE 0):** unchanged handling; simply stop generating/returning the invite temp password.
- **RULE 20:** `api/admin/**` maps to the Governance Model tab; verify altitude — the endpoint stays gated/audited (credential mechanics are below its altitude), so likely a reseal, not a redraw. `src/**` is unmapped. Seal per RULE 20 in the same commit if mapped; paste the doc diff + `check:doc-drift`.
- One sub-fix = one commit.

---

## SUB-FIX 2A — invite/resendInvite become pure magic-link (drop the temp password)

**Do:**
1. `api/admin/users.ts` `case 'invite'`: remove the `generateTempPassword()` + `updateUserById(..., { password })` block and the `tempPassword` from the response. The case becomes: `inviteUserByEmail(email, {redirectTo})` → audit `INVITE` → `return res.status(201).json({ ok: true, userId: data.user.id, audited })`. (Same shape as before minus `tempPassword`.)
2. `case 'resendInvite'`: apply the same — drop the temp-pw set + return; it should re-send the invite/recovery link only. (If resend legitimately needs a different Supabase call than invite, keep that call but strip the temp-password.)
3. UI: `src/lib/adminService.ts` + `src/store/adminStore.ts` + `src/components/admin/UsersTab.tsx` — the invite (and resend) flows must no longer expect or reveal a `tempPassword`. Remove the invite temp-pw reveal modal path for these two actions (the `credentialReveal`/`lastInvite` surface). Leave `setTempPassword`'s reveal modal intact (that action still returns a secret).
4. `generateTempPassword` stays (still used by `setTempPassword`); only its invite/resend call sites go.

**2A self-verify (evidence):**
- Paste the `users.ts` diff: invite + resendInvite call `inviteUserByEmail`/reset only, no `updateUserById(password)`, response has no `tempPassword`.
- Update/confirm tests: the existing invite test must assert the response no longer carries `tempPassword` and the audit `INVITE` row is still written. Paste `npm run test` (count stable or adjusted).
- `npm run build` + `oxlint` clean; confirm no dangling `tempPassword` reference in the invite UI path.
- Manual-observable: a fresh invite to a test address lands on `/accept-invite` (set-password), no separate password needed, no "email not confirmed". (You run it; I read the Vercel logs / you confirm the screen.)

---

## SUB-FIX 2B — crossover state gets an actionable recovery

**Do:**
1. `src/components/ui/AcceptInvite.tsx` `crossover` branch: keep the explanatory text, but add a **"Sign out & continue"** button that:
   - calls the auth store sign-out (clears the wrong session),
   - re-establishes the LINK user's session from the token snapshotted at module load (`LINK_USER_ID` / the captured hash), then re-evaluates the gate → `allow` (or `no-session` if the token was already consumed, which correctly routes to "request a new link").
   - The positive-id-match guard still governs: after sign-out, set-password is permitted ONLY if the re-settled session's user id equals the link's user id.
2. If re-applying the snapshotted token after sign-out isn't feasible (token single-use/consumed), the button's fallback is an honest `no-session` state ("this link was already used — ask your admin to resend"), NOT a silent failure. Prefer re-establishing the link session; degrade explicitly.

**2B self-verify (evidence):**
- A focused test (extend `AcceptInvite`/`inviteGuard` tests): with a session whose id ≠ the link's user id, the render shows the "Sign out & continue" action (not a dead-end), and `evaluateInviteGate` still returns `crossover` for that input (the guard logic is unchanged — prove it with a unit assertion). Paste it.
- Paste the `AcceptInvite.tsx` diff; confirm `inviteGuard.ts` `evaluateInviteGate` is byte-unchanged (`git diff` on it = empty).
- `npm run build` + `oxlint` clean.

---

## FINISH — report for architect review
- 2 commits (+ seal if mapped) on a branch → PR to `master`; paste `git log --oneline` for the range + the green CI checks on the PR.
- State: the crossover guard's positive-id-match invariant is unchanged; invite/resend no longer mint a temp password; `setTempPassword` is untouched; no auto email-confirm was added.
- One-paragraph summary of the new invite flow end-to-end (link → authenticated + email-confirmed → set password → active), so it can be diffed against the reset flow for parity.
