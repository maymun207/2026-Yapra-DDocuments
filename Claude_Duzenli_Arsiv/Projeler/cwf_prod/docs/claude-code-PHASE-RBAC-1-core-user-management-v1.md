# Claude Code — PHASE RBAC-1 · Governance Core + User Management
**rev 1 · 2026-06-28 · target base HEAD `a8bd531` · canonical repo `cwf_yaprak`**

This is **step 1 of the governance redesign** (`cwf-governance-model-v1`): the *root of trust*. It establishes the **three-role maker-checker model**, a **permission layer** (check permissions, not roles), a **gated user-management endpoint** with anti-lockout guardrails, **narrows global publish to super_admin** (true separation of duties), and adds **capability-driven UI gating**. It does **not** build the admin shell redesign, session-preview/Lab mode, per-table reset UI, or the Tool Routing tab — those are steps 2–5. Stay inside this scope.

The model being implemented (from the approved design doc):
- `user` — chat only, no panel.
- `power_user` — **maker/developer**: panel access, create/edit drafts (scoped), but **cannot publish globally and cannot manage users**.
- `super_admin` — **checker/deployer**: everything, global publish, **user management**.
- The eval-gate remains the **automated impartial checker that binds everyone, super_admin included** — do not weaken it.

---

## HARD PRE-FLIGHT GATE — verify against the live tree BEFORE writing anything
Run these and **paste the actual output**. If any expected fact is false, **STOP and report** — do not "fix forward."

1. `git rev-parse HEAD` → expect `a8bd531` (or report the actual HEAD you are building on).
2. `git status --porcelain` → expect clean. If dirty, STOP.
3. Confirm the role taxonomy is exactly three:
   `grep -nE "SUPER_ADMIN|DOMAIN_EDITOR|USER:" shared/dbConstants.ts` → expect `super_admin`, `domain_editor`, `user`; **no `power_user` yet**.
4. Confirm the DB CHECK still allows only those three:
   `grep -n "check (role in" supabase/migrations/20260626140000_user_roles.sql` → expect `('super_admin', 'domain_editor', 'user')`.
5. Confirm the publish path is currently scope-guarded (the thing we will narrow):
   `grep -n "ensureBackendScope\|ensureSuperAdmin" api/admin/rules/\[id\].ts` → expect the publish handler currently gated by **`ensureBackendScope`** (NOT super-admin-only).
6. Confirm `UsersTab.tsx` is read-only (`grep -n "READ-ONLY\|loadUsers" src/components/admin/UsersTab.tsx`).
7. Confirm the eval-gate engine exists and note its files/symbols (you must keep these byte-identical): the `runGate` loop and the `GATE_STAGES`/stage-order definition. `grep -rn "GATE_STAGES\|function runGate\|export async function publish" api/cwf/_lib | head`.

Only proceed once 1–7 are confirmed and pasted.

---

## HARD CONSTRAINTS (non-negotiable — these are mechanical rules, not suggestions)
- **Secrets via env only.** Never read, write, or print any `.env*`. Never print a service-role key, JWT secret, or MCP token. The user-management endpoint runs under the **service role server-side** — it must never echo that key, and error responses must never include raw Supabase error payloads that could contain credentials.
- **RULE 1 — no hardcoded values.** Every permission string, role name, table name, and limit lives in a constants module (`shared/permissions.ts`, `shared/dbConstants.ts`). No string literals for roles/permissions in handlers.
- **The eval-gate engine stays byte-identical.** The `runGate` loop, the `GATE_STAGES` order, and the schema/referential/behavioral interpreters are **untouched**. You are changing **who may invoke publish**, not how the gate evaluates. Prove this with an empty `git diff` on those specific symbols/files at the end.
- **Migrations: you WRITE the SQL, you do NOT apply it.** Produce migration files under `supabase/migrations/`. Applying them is the owner's action via the Supabase MCP. Split the self-verification into "provable now (code)" vs "provable after the owner applies the migration (DB)".
- **All user-role writes go through the gated server endpoint (service role).** There must be **no client-side write path** to `user_roles` / `user_backend_scopes`. A direct client write must be RLS-denied (`42501`).
- **Authorization is server-side.** The UI may *reflect* capabilities, but every gate is enforced in the endpoint. A hidden button is never the security boundary.
- **Anti-lockout is absolute and lives in the endpoint** (not only RLS). See 1B.
- **No dead second path.** If you replace the read in `api/admin/roles.ts`, remove it and repoint callers — do not leave two read endpoints.
- **Preserve role resolution for other RLS policies.** `user_roles` is consulted by other policies without recursive RLS (see the migration header). Do **not** remove the SELECT mechanism that enables that. Only the **write** policies change.

---

## GATED SUB-PHASES

### 1A — Permission layer + `power_user` role (data + seam; minimal behavior change)
**New file `shared/permissions.ts`:**
- `PERMISSIONS` — string constants for the matrix in the design doc: `CHAT_QUERY`, `PANEL_ACCESS`, `RULE_DRAFT_CRUD`, `RULE_PUBLISH_GLOBAL`, `RULE_RESET_REFERENCE`, `RULE_ROLLBACK`, `KIND_SOFT_EDIT`, `ROUTING_EDIT_GLOBAL`, `TELEMETRY_READ`, `USER_MANAGE`, `CONFIG_GLOBAL`. (Omit `RULE_PREVIEW_SESSION` and `LAB_TOGGLE_SESSION` — those are step 4; do not implement them now, but you may reserve the constants with a `// step 4` comment.)
- `ROLE_PERMISSIONS: Record<Role, ReadonlySet<Permission>>`:
  - `super_admin` → **all** permissions.
  - `power_user` → `{ CHAT_QUERY, PANEL_ACCESS, RULE_DRAFT_CRUD, KIND_SOFT_EDIT, TELEMETRY_READ }`. **No publish, no reset, no rollback, no routing-global, no user-manage, no config.**
  - `domain_editor` → **same set as `power_user`** (deprecated alias for the transition; defensive only).
  - `user` → `{ CHAT_QUERY }`.
- `hasPermission(role: Role, perm: Permission): boolean`.

**`shared/dbConstants.ts`:** add `POWER_USER: 'power_user'` to `ROLES`. Keep `DOMAIN_EDITOR` (deprecated alias). Update the doc comment.

**`api/cwf/_lib/auth.ts`:** `requireBackendScope` must treat `power_user` the same as `domain_editor` (scoped). Add a `requirePermission(ctx, perm)` helper (role→permission via `hasPermission`).

**`api/cwf/_lib/adminGuard.ts`:** add `ensurePermission(ctx, perm, res)` (403 `Forbidden: requires <perm>` on fail). Do **not** change existing call sites yet (that is 1C).

**Migration `supabase/migrations/<ts>_power_user_role.sql`:**
- `alter table public.user_roles drop constraint <the role check>;`
- re-add: `check (role in ('super_admin','power_user','user'))` — note **`domain_editor` removed from allowed values** (so no *new* domain_editor rows; existing ones are migrated next line).
- `update public.user_roles set role='power_user' where role='domain_editor';`
- Keep it idempotent (`drop constraint if exists`, named constraint).

**Gate to proceed:** `tsc` + api typecheck green; `hasPermission` unit-tested for all four roles; no existing call site behavior changed yet.

---

### 1B — Gated user-management endpoint + anti-lockout + audit
**New endpoint `api/admin/users.ts`** (replaces `api/admin/roles.ts` — fold its GET in, then delete `roles.ts` and repoint any import). All actions **`ensurePermission(ctx, USER_MANAGE)`** (super_admin only). Service-role writes.

- `GET` → list `{ user_id, email?, role, scopes[], created_at }` (join user_roles + user_backend_scopes; email via `auth.admin` lookup if cheap, else omit).
- `POST { action }`:
  - `assignRole { userId, role }` — set/replace the user's single role row.
  - `setScopes { userId, scopes[] }` — replace `user_backend_scopes` for the user (validate each via `BACKEND_IDS`).
  - `removeRole { userId }` — demote to plain `user` (delete the row → default `user`).
  - `invite { email }` — create a user **password-free** via Supabase `auth.admin.inviteUserByEmail` (no password handling). New user defaults to role `user` (least privilege).
  - `deleteUser { userId }` — destructive; requires `confirm: true`; `auth.admin.deleteUser` + cascade role/scope rows.

**Anti-lockout (enforced in the endpoint, server-side, BEFORE any mutation):**
- Reject if `userId === ctx.userId` for `assignRole`/`removeRole`/`deleteUser` (**no self-demotion / no self-delete**) → 409 `Cannot modify your own role/account`.
- Reject demoting/deleting the **last** `super_admin`: count super_admins; if the target is currently super_admin and the count is 1, deny → 409 `Cannot remove the last super_admin`.
- `assignRole.role` must be a valid `Role` (reject `domain_editor` — deprecated).

**Audit:** new migration `supabase/migrations/<ts>_user_audit.sql` — table `public.user_audit (id, actor_user_id, target_user_id, action, old_value jsonb, new_value jsonb, reason text, created_at)`, **append-only**, service-role write only (no client write policy → `42501` on direct write), super_admin SELECT. Write one row on every successful mutation. Add a `UserAuditRepository` mirroring the `rule_audit` pattern.

**RLS tighten (same or new migration):** ensure `user_roles` and `user_backend_scopes` have **no client INSERT/UPDATE/DELETE policy** (so only the service-role endpoint writes; direct client write → `42501`). **Keep** the existing SELECT/role-resolution mechanism intact.

**Gate to proceed:** endpoint compiles; anti-lockout branches covered by tests (last-super_admin demote denied; self-demote denied); `roles.ts` removed and no dangling imports (`grep -rn "admin/roles" src api`).

---

### 1C — Narrow global publish to super_admin (the SoD change)
**`api/admin/rules/[id].ts`:** the **`publish`** action must switch from `ensureBackendScope(...)` to **`ensurePermission(ctx, RULE_PUBLISH_GLOBAL)`** (super_admin only). `rollback` and `archive` likewise become `ensurePermission(ctx, RULE_ROLLBACK)` / super_admin. **Draft authoring in `api/admin/rules.ts` stays `ensureBackendScope`** (a power_user must still create/edit drafts on its scoped backends).

**`api/admin/reset.ts`:** confirm it is `ensurePermission(ctx, RULE_RESET_REFERENCE)` (super_admin only). If currently scope-guarded, narrow it.

**Do not touch the gate body.** The publish handler still calls the exact same `publish()`/`runGate()` — only the authorization wrapper changes.

**Gate to proceed:** prove with a focused test/trace:
- A `power_user` calling publish → **403** (`requires rule:publish:global`), draft unchanged.
- A `super_admin` calling publish on a valid draft → gate runs (schema→referential→behavioral) and publishes (unchanged behavior).
- A `super_admin` calling publish on the **poisoned** draft (IKINCILUST barcoded / scrap=0) → still **rejected by the gate** (proves the gate is untouched and binds super_admin).
- `git diff` on the `runGate` loop + `GATE_STAGES` + stage interpreters → **empty**.

---

### 1D — Capability surface + UsersTab CRUD + capability-driven gating
**New endpoint `api/admin/capabilities.ts`** (any authed user): returns `{ role, permissions: Permission[] }` for the caller (from `ROLE_PERMISSIONS`). This is the SOTA "frontend asks what it may do."

**Client (`src/lib/adminService.ts` + `src/store/adminStore.ts`):**
- Load capabilities once on panel mount; expose `can(perm)` selector.
- Add user-management calls (`assignRole`, `setScopes`, `removeRole`, `invite`, `deleteUser`) hitting `/api/admin/users`.

**`src/components/admin/UsersTab.tsx`:** replace the read-only notice with a working table:
- Row actions: change role (select `user`/`power_user`/`super_admin`), edit scopes (multiselect over `BACKEND_IDS`), demote, delete (with a confirm dialog).
- An "Invite user" affordance (email input → `invite`).
- **Capability-driven:** all mutating controls are disabled (with a tooltip `requires super_admin`) when `!can(USER_MANAGE)`. The whole tab is only reachable when `can(PANEL_ACCESS)`.
- Disabled state must match the server: a power_user sees the tab read-only-disabled, never an enabled write control.

**Also gate the Rules publish button** in the existing RulesTab on `can(RULE_PUBLISH_GLOBAL)` — a power_user sees "Save draft" enabled and "Publish (global)" disabled with the super_admin tooltip.

**Gate to proceed:** UI builds; a power_user session shows publish + user-management controls **disabled**; a super_admin session shows them enabled.

---

## SELF-VERIFICATION CHECKLIST — confirm each WITH EVIDENCE

**Provable now (code):**
- [ ] Pre-flight 1–7 pasted and matched (or deviations reported).
- [ ] `shared/permissions.ts` created; `hasPermission` returns the exact matrix for all four roles (paste the test).
- [ ] `power_user` added to `ROLES`; `domain_editor` retained as deprecated alias mapped to the power_user permission set.
- [ ] **1C proof — publish narrowed:** power_user publish → 403; super_admin publish valid draft → publishes; super_admin publish **poisoned** draft → still rejected by the gate. Paste all three.
- [ ] **Eval-gate untouched:** `git diff` on `runGate` loop + `GATE_STAGES` + stage interpreters is **empty** (paste the diff stat showing those files unchanged).
- [ ] **Anti-lockout (endpoint logic):** unit tests prove last-super_admin demote → 409, self-demote → 409, self-delete → 409. Paste.
- [ ] `api/admin/roles.ts` removed; no dangling imports (paste `grep` result).
- [ ] `api/admin/capabilities.ts` returns correct `permissions[]` per role (paste a power_user and a super_admin response).
- [ ] UI: power_user session → publish + user-mgmt controls **disabled**; super_admin → enabled (describe/screenshot the disabled state).
- [ ] No `.env*` touched; no secret in code/log/output; RULE 1 honored (roles/permissions/tables centralized).
- [ ] `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` all green — **paste exact numbers**.
- [ ] `git diff --stat` — list every file touched; confirm no behavioral file outside this scope changed.

**Provable after the owner applies the migrations (DB) — list as PENDING, with the exact check to run:**
- [ ] `power_user` migration applied → CHECK allows `power_user`, denies a new `domain_editor` insert; existing rows migrated. (`select role, count(*) from user_roles group by role;`)
- [ ] Direct client write to `user_roles` → **`42501`** (paste once applied).
- [ ] `user_audit` table live; a mutation through the endpoint writes one audit row; direct client write to `user_audit` → `42501`.
- [ ] `invite` creates a user defaulting to role `user` (least privilege).

---

## STOP CONDITION
Do **not** build the admin shell redesign (step 2), per-table reset/diff UI (step 3), session-preview/Lab mode (step 4), or the Tool Routing tab (step 5). Stop after the checklist and present your report, **including the publish-narrowing proof, the anti-lockout test output, and the empty eval-gate diff**. Then state explicitly:

> **"RBAC-1 complete — three-role maker-checker live; permissions enforced server-side; global publish narrowed to super_admin (power_user denied, super_admin still gated, poison still rejected); user-management endpoint gated with anti-lockout + audit; capability-driven UI. Eval-gate engine byte-identical. Migrations written, pending owner apply. Ready for step 2 (admin shell redesign)."**
