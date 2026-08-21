# Claude Code — PATCH RBAC-1.1 · Matrix Honesty
**rev 1 · 2026-06-28 · base HEAD `ab9181f` · canonical repo `cwf_yaprak`**

A surgical patch, not a phase. It closes the one finding from the RBAC-1 review: the permission matrix grants `power_user` → `KIND_SOFT_EDIT`, but nothing honors it (`kinds.ts` enforces `ensureSuperAdmin`; the UI gates KindsTab on `isSuper`). No security hole, but the matrix is the single source of truth the capability-driven UI will read — a grant it claims but the system denies is a latent landmine (the moment a later step gates KindsTab on `can(KIND_SOFT_EDIT)`, a power_user gets an enabled control that 403s). **Invariant we are restoring: the matrix never claims a grant the enforcement does not honor — at every commit.**

Design intent (power_user edits SOFT kinds) is preserved as a TARGET: `KIND_SOFT_EDIT` returns to the maker set in the same step that narrows `kinds.ts` with the soft-vs-core split (CORE kind structure stays locked to code). Enforcement and matrix move together, never apart.

---

## PRE-FLIGHT (light) — confirm and paste
1. `git rev-parse HEAD` → `ab9181f` (or report actual). `git status --porcelain` clean.
2. `grep -n "KIND_SOFT_EDIT" shared/permissions.ts` → confirm it is currently in `MAKER_PERMISSIONS`.
3. `grep -n "ensureSuperAdmin\|ensurePermission" api/admin/kinds.ts` → confirm `kinds.ts` enforces `ensureSuperAdmin` (NOT a `KIND_SOFT_EDIT` permission).
4. `grep -rn "KIND_SOFT_EDIT" api/ src/ | grep -v permissions` → confirm **no `ensurePermission(KIND_SOFT_EDIT)` call exists anywhere** (it is currently an enforcement-orphan; removing it from the maker set changes only what a power_user's capabilities report).
5. `grep -rn "domain_editor" src/` → confirm the stale display string in `AdminPanel.tsx` (~line 62) and the stale comment (~line 50).

---

## CHANGES (exact)

### 1. `shared/permissions.ts` — remove `KIND_SOFT_EDIT` from the maker set
In `MAKER_PERMISSIONS`, drop `PERMISSIONS.KIND_SOFT_EDIT`. The maker set becomes `{ CHAT_QUERY, PANEL_ACCESS, RULE_DRAFT_CRUD, TELEMETRY_READ }`. Leave `KIND_SOFT_EDIT` in the `PERMISSIONS` constant and in `ALL_PERMISSIONS` (super_admin keeps it — super_admin genuinely can edit kinds via `ensureSuperAdmin`). Add a one-line comment at the removal site:
```
// KIND_SOFT_EDIT intentionally NOT granted to the maker yet — kinds.ts enforces
// ensureSuperAdmin (no soft/core split). Restored to MAKER in the step that narrows
// kinds.ts to ensurePermission(KIND_SOFT_EDIT) with CORE structure locked. The matrix
// must never claim a grant the endpoint does not honor.
```

### 2. `shared/__tests__/permissions.test.ts` — flip the assertion
Move `PERMISSIONS.KIND_SOFT_EDIT` from the `MAKER` array into `MAKER_DENIED`. The existing test (`power_user holds exactly the MAKER set …`) then asserts power_user **must NOT hold** `KIND_SOFT_EDIT`. The super_admin = ALL assertion and `permissionsForRole(super_admin) = ALL` stay green unchanged (super_admin still holds it).

### 3. `src/components/admin/AdminPanel.tsx` — stale `domain_editor` display/comment → `power_user`
- ~line 62, the user-facing string: `'Bu alan domain_editor / super_admin içindir.'` / `'This area is for domain_editor / super_admin.'` → replace `domain_editor` with `power_user` in both TR and EN.
- ~line 50 comment `domain_editor sees only scoped backends; super_admin sees all` → `power_user sees only scoped backends; super_admin sees all`.
- **Leave line ~41 as-is** — that comment correctly documents `domain_editor` as the *deprecated alias*; it is accurate, not stale.

### 4. (OPTIONAL tidy — only if clean) `api/admin/users.ts`
In `assignRole`, `getRole(body.userId)` is called twice (once for anti-lockout `targetCurrentRole`, once for the audit `oldRole`). Reuse a single `const currentRole = await users.getRole(body.userId)` for both. Pure micro-tidy; skip if it complicates the anti-lockout call shape.

---

## HARD CONSTRAINTS
- **No behavioral / gate / runtime file touched.** This patch is matrix + test + display only. `chat.ts`, `gateway.ts`, grounding, `evalGate.ts`, prompt packs — untouched. Prove with `git diff --stat`.
- **Do NOT remove the code-level deprecated alias.** `ROLES.DOMAIN_EDITOR` and the `ROLE_PERMISSIONS[DOMAIN_EDITOR]` entry stay (transition safety; a stray row must still resolve). Only the *maker grant of KIND_SOFT_EDIT* and the *display strings* change.
- No `.env*` touched; no secret printed. RULE 1 honored (no new literals).

---

## SELF-VERIFY (evidence)
- [ ] Pre-flight 1–5 pasted.
- [ ] `hasPermission(POWER_USER, KIND_SOFT_EDIT) === false` and `hasPermission(SUPER_ADMIN, KIND_SOFT_EDIT) === true` — paste both.
- [ ] `permissions.test.ts` green with `KIND_SOFT_EDIT` now in `MAKER_DENIED`.
- [ ] **Three-way agreement restored for kinds:** matrix (power_user: no `KIND_SOFT_EDIT`) = endpoint (`kinds.ts` super-only) = UI (`KindsTab` `isSuper`). State all three.
- [ ] Capabilities endpoint for a power_user no longer lists `kind:soft:edit` (paste the response or describe).
- [ ] Stale `domain_editor` display string + comment updated; line ~41 alias comment left intact.
- [ ] `git diff --stat` — expect ≈3 files (`shared/permissions.ts`, `shared/__tests__/permissions.test.ts`, `src/components/admin/AdminPanel.tsx`) [+ `api/admin/users.ts` if the optional tidy was taken]. Confirm **no behavioral/gate file** in the list.
- [ ] `tsc -b` + typecheck:api + `vite build` + `oxlint` + `vitest` all green — paste numbers.

---

## STOP
Stop after the checklist. Then state:

> **"RBAC-1.1 complete — matrix honesty restored: power_user no longer claims KIND_SOFT_EDIT (enforcement-orphan removed); matrix = endpoint = UI agree for kinds; stale domain_editor display strings fixed; deprecated code alias preserved. No behavioral/gate file touched. Ready for step 2 (admin shell redesign)."**
