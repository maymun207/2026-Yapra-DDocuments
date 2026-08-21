# Claude Code — PHASE-INV-2: Accept-invite → set-password flow (complete user registration)
**rev 1 · 2026-06-30 · target HEAD `ba2846c` · canonical repo `cwf_yaprak` · Author lane (Claude Code 4.8)**

## Why this phase exists
INV-1 (operator lane) fixed the invite **link base**: Supabase Site URL → `https://cwfyaprak.vercel.app`, Redirect URLs allowlist now includes `https://cwfyaprak.vercel.app` + `/**`. A fresh invite's verify endpoint now 303-redirects to `https://cwfyaprak.vercel.app#access_token=…&type=invite`. The link works — but registration still **cannot complete**, because:
- The invite is created with **no `redirectTo`** (`api/admin/users.ts:108` → `inviteUserByEmail(body.email)`), so the user lands at root `/` (ChatShell).
- `detectSessionInUrl:true` establishes a session, but the app has **no "set your password" UI** for an invited user. `LoginPage` only does email+password sign-in; `authStore` has no `updateUser`; there is no `/accept-invite` route (routes are only `/`, `/v2`, `/admin`).
- Result: the invited user lands authenticated-but-**passwordless** with nowhere to set a password — they can never sign in again, and registration is unfinished.

This phase adds the completion flow: an explicit `redirectTo` to a dedicated `/accept-invite` route that lets the user set a password (`supabase.auth.updateUser`) and finishes registration.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `ba2846c`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record the count (N).
3. Read: `src/App.tsx` (the `if (!isAuthenticated) return <LoginPage/>` guard is OUTSIDE `<BrowserRouter>` — note this), `src/store/authStore.ts` (`signIn`/`logout` actions + the `applySession` single-mapping-point + the module-load `onAuthStateChange` sync), `src/components/ui/LoginPage.tsx` (form pattern to mirror), `api/admin/users.ts` (the `invite` case at ~L105, the service-role `client.auth.admin.inviteUserByEmail` call), `src/lib/supabaseClient.ts` (`detectSessionInUrl:true` confirmed), `src/lib/params/admin.ts` (the only existing app-path constant pattern), `public/architecture/manifest.json` (the tab mapping `api/admin/**` and the one mapping `shared/**`).

## HARD CONSTRAINTS
- **Single-source the path (the drift trap).** The string `'/accept-invite'` MUST come from ONE shared constant imported by BOTH `src/App.tsx` (the `<Route path>`) AND `api/admin/users.ts` (the `redirectTo` path). Two separate literals WILL drift and the invite link 404s. grep-prove exactly one definition.
- **No hardcoded base URL (RULE 1) + no silent-regression trap.** The redirect base is `process.env.APP_BASE_URL ?? <origin derived from the request>` (Vercel sets `x-forwarded-proto` + `x-forwarded-host`/`host`; the admin triggers the invite from the deployed app, so the origin is reliably the prod URL). `redirectTo = base + ACCEPT_INVITE_PATH`. **If base is falsy, OMIT `redirectTo` entirely and log a warning — NEVER send a malformed `undefined/accept-invite`** (Supabase would reject it and fall back to Site URL root → silent regression to the current broken state). No literal `cwfyaprak.vercel.app` anywhere in code.
- **Don't weaken the auth guard for other routes.** `/accept-invite` is reachable because an invited user IS authenticated (invite session). Do NOT add an unauthenticated bypass to the top-level guard; only add the route inside the existing authenticated `<BrowserRouter>`.
- **Secrets via env only.** `APP_BASE_URL` is a public URL (not a secret) but is still env-sourced; never read `.env`. No new secret introduced.
- **No change to:** the eval-gate, governance, trust line, the chat path, RBAC role logic (the new user still defaults to `'user'` — unchanged), or the existing `signIn`/`logout` behavior.
- **Doc lock-step (RULE 20):** `api/admin/users.ts` ∈ `api/admin/**` and the new `shared/appRoutes.ts` ∈ `shared/**` — both are mapped `codeAreas`. `check:doc-drift` runs inside `build` and WILL flag the mapped tabs. Reconcile each flagged tab + bump `lastSyncedCommit` (+ `docVersion`) same-commit; **verify the diagram's altitude first** (a route constant + an invite-completion route likely don't change the depicted architecture truth — if so, a seal bump with a one-line justification, not a redraw). Two-commit seal if mixed code+doc, matching P-2A/P-2B/PROV-3.

---

## INV-2A — Shared route constant (kill the drift trap)
New `shared/appRoutes.ts` (importable by both client and server):
```ts
/** App route paths used by BOTH the client router and server-built redirect URLs.
 *  Single source — the invite redirectTo and the <Route path> must never drift. */
export const ACCEPT_INVITE_PATH = '/accept-invite';
```

## INV-2B — Explicit `redirectTo` on the invite (server)
In `api/admin/users.ts`, the `invite` case:
- Derive the base: `const base = process.env.APP_BASE_URL ?? originFromRequest(req)` where `originFromRequest` builds `${proto}://${host}` from `x-forwarded-proto` (default `https`) + `x-forwarded-host` ?? `host`. Keep it a small local helper.
- `const redirectTo = base ? base + ACCEPT_INVITE_PATH : undefined;`
- `await client.auth.admin.inviteUserByEmail(body.email, redirectTo ? { redirectTo } : undefined);`
- If `redirectTo` is `undefined`, `console.warn('[admin/users] invite: no APP_BASE_URL / origin — link will use Supabase Site URL root (set-password landing unavailable).')` so the degraded path is visible, never silent.
- Everything else in the case unchanged (the audit row, the default `'user'` role, the 201 response).

## INV-2C — `setPassword` action (authStore)
Add to `src/store/authStore.ts`, mirroring the `signIn` shape:
```ts
/** Set/replace the current user's password (completes an invite, or a reset). */
setPassword: (password: string) => Promise<boolean>;
```
Implementation: guard `if (!supabase) …`; `const { error } = await supabase.auth.updateUser({ password });` → on error set a `loginError`-style message and return `false`; on success return `true`. Do not touch `applySession`/`onAuthStateChange` (the session is already live). No secret logged.

## INV-2D — `/accept-invite` route + set-password component (client)
New `src/components/ui/AcceptInvite.tsx` (mirror `LoginPage` styling):
- On mount, read `isAuthenticated` from `authStore`. Because the invite session lands the user authenticated, the form shows immediately. Handle the edge: if `!isAuthenticated` after a short grace period (invalid/expired/consumed token), show a friendly state — "This invite link is invalid or has expired. Ask your admin to send a new one." — with no password form. (Subscribe to the store / a brief timeout; do not hang.)
- Form: `password` + `confirm`, client-validate min length ≥ 8 and match (server also enforces). On submit → `authStore.setPassword(password)` → on success `navigate('/')` (now a fully-registered user with a password); on failure show the error.
- Register the route in `src/App.tsx` INSIDE the existing `<BrowserRouter>`: `<Route path={ACCEPT_INVITE_PATH} element={<AcceptInvite/>} />` (import `ACCEPT_INVITE_PATH` from `shared/appRoutes`). Leave `/`, `/v2`, `/admin` and the top-level guard untouched.

---

## SELF-VERIFICATION CHECKLIST (evidence — paste, don't self-report)
- [ ] Pre-flight green; N recorded.
- [ ] **Single-source path:** `grep -rn "accept-invite" --include=*.ts --include=*.tsx . | grep -v node_modules` shows the string defined ONCE (in `shared/appRoutes.ts`) and otherwise only imported. Paste it.
- [ ] **redirectTo correct + RULE-1:** a test (mock the admin client) asserts `inviteUserByEmail` is called with `{ redirectTo: <base> + '/accept-invite' }` when a base is derivable, and with **no** `redirectTo` (+ the warn) when base is falsy. No literal `cwfyaprak.vercel.app` in code (grep). Paste.
- [ ] **Route mounts:** `/accept-invite` renders `AcceptInvite` for an authenticated (invite) session; the top-level guard + other routes unchanged (`git diff ba2846c -- src/App.tsx` shows only the added route + import).
- [ ] **setPassword works / fails cleanly:** a test asserts `setPassword` calls `supabase.auth.updateUser({ password })` and returns true on success / false on error; no password value logged.
- [ ] **Expired-token UX:** the component shows the "invalid/expired invite" state when no session arrives (test or a described manual check) — it does not hang or crash.
- [ ] **Build green incl. drift-guard:** paste `[check:doc-drift] [OK] no drift`. Mapped tabs (`api/admin/**`, `shared/**`) reconciled + sealed; paste the `lastSyncedCommit`/`docVersion` bump + the one-line altitude justification.
- [ ] **Full suite green; state the new count** (N + the new tests).
- [ ] **Scope clean:** `git diff ba2846c -- api/cwf api/cwf/_lib/knowledge api/cwf/_lib/evalGate` empty (chat, eval-gate, trust line untouched); `signIn`/`logout` byte-identical.

## OWNER STEP (operator lane / Vercel)
- Set `APP_BASE_URL=https://cwfyaprak.vercel.app` in Vercel project env (Production) for robustness. **Not a hard blocker** — the request-origin fallback already yields the prod URL for admin-triggered invites, so the flow works without it; the env var just makes it deterministic for any non-browser invite path. State this in the report.

## ACCEPTANCE (observable, automation-first)
After deploy, the operator lane triggers one fresh invite; the email link must land on `…/accept-invite`, the new user sets a password, then can sign **out** and sign back **in** with email+password. Paste the landing URL + the round-trip result.

## OUT OF SCOPE (tracked follow-up)
- **Password reset / recovery** (`type=recovery`) reuses the same `setPassword` + a landing route — a natural next extension (covers the "user abandoned the invite mid-way / forgot password" edge). Not built here; INV-2 is invite-completion only.
- Custom invite email template / branding (operator-lane dashboard config, if ever wanted).

---
*Owner steps after AG pushes: optionally set `APP_BASE_URL` in Vercel (above). I will verify from the repo: the `/accept-invite` string is single-sourced, the `redirectTo` is env/origin-derived (no literal URL) with the falsy-base omit-not-malform guard, the route + guard diff is minimal, `setPassword` wraps `updateUser` with no secret logged, and the doc lock-step sealed the mapped tabs at the right altitude. Then the operator triggers a live invite for the round-trip acceptance check.*
