# Claude Code — PHASE GOV-3 · Per-Table Edit/Reset Affordances
**rev 1 · 2026-06-28 · base HEAD `6b42738` · canonical repo `cwf_yaprak`**

Governance redesign **step 3** — closes the per-table edit/reset story. **This is a surgical, frontend-only phase.** The backend is already complete and much of the UI already shipped in GOV-2; this phase adds ONLY the five genuinely missing affordances. Do **not** rebuild what exists.

**Already built — DO NOT recreate (verified at `6b42738`):**
- Version history UI (RulesTab renders `detail.versions` with status), rollback button per version (→ new gated draft), archive button. ✅
- Endpoints all exist: `/api/admin/reset` (`{backend, kindId?}` → re-publish code baseline as a NEW published version through the gate, prior archived, history preserved, cache invalidated; super_admin via `RULE_RESET_REFERENCE`); `/api/admin/rules/[id]` GET returns `{rule, versions, diffs}` (diffs already computed server-side); POST `rollback`/`archive`. ✅
- Client calls wired in `adminService`: `reset(backendId, kindId?)`, `rollback`, `archive`, `getRule` (returns versions+diffs). ✅
- CORE/SOFT data exists: `rule_kinds.class` (`KIND_CLASS.CORE`/`SOFT`), `is_locked`; governance enforces CORE field-structure lock. ✅

**Missing — THIS phase builds exactly these five:**
1. **Reset-to-reference button** — the `reset()` client call exists but NOTHING in the UI invokes it.
2. **Diff rendering** — `diffs` are fetched but never displayed (no field-level from→to).
3. **CORE/SOFT + gated/advisory badges** — the data exists but is not shown as visible labels.
4. **Inline how-to-edit / how-reset help** — absent (only the GateVerdict teaching surface exists).
5. **Confirmation dialogs** for destructive actions — reset/rollback/archive currently fire on click (or have no trigger).

---

## HARD PRE-FLIGHT GATE — verify and paste
1. `git rev-parse HEAD` → `6b42738` (or report). `git status --porcelain` clean.
2. Confirm what EXISTS (so you don't rebuild): `grep -nE "Version history|rollback|archive|getRuleDetail" src/components/admin/RulesTab.tsx` shows version history + rollback + archive already present; `grep -n "async reset" src/lib/adminService.ts` shows `reset()` wired.
3. Confirm what's MISSING: `grep -rnE "reset\(" src/components/admin/*.tsx` → **no UI trigger**; diffs not rendered (no from→to in RulesTab); no CORE/SOFT badge in KindsTab; no inline help; no confirm dialog in RulesTab.
4. Confirm the GOV-2 legibility invariant holds at baseline: `grep -rnE "text-white/(20|30|40|50)|text-\[1[01]px\]" src/components/admin/` → empty.

---

## HARD CONSTRAINTS (mechanical)
- **Frontend-only. No backend / behavioral / gate / endpoint file touched.** Every endpoint already exists. Prove with `git diff --stat` (only `src/components/admin/**`, `src/store/adminStore.ts`, `src/lib/adminService.ts` if a store-wire is needed, and shared UI helpers). `api/`, `shared/permissions.ts`, `shared/dbConstants.ts`, `chat.ts`, `gateway`, grounding, `evalGate.ts` — untouched.
- **Do NOT rebuild existing UI** (version history, rollback, archive). Extend in place.
- **Capability-gated, server is the boundary.** Reset gated on `can(RULE_RESET_REFERENCE)`; rollback/archive on `can(RULE_ROLLBACK)`. A power_user sees these **disabled** (tooltip `requires super_admin`); the server re-enforces `ensurePermission` regardless.
- **Destructive actions REQUIRE confirmation.** Reset (rewrites published baseline), rollback (creates a draft), archive (retires) must go through a confirm dialog — no fire-on-click. Reset's dialog must state it re-publishes the code baseline as a NEW version, archives prior, **preserves history**, and is **not** a delete.
- **GOV-2 legibility preserved.** New badges/help/dialogs follow the same rules: WCAG AA contrast, data ≥14px / labels ≥12px, **no** banned tokens. The banned-token grep must stay empty.
- **Chat shell untouched.** No change outside `/admin`.
- RULE 1 (tokens/strings centralized); no `.env*`/secret.

---

## GATED SUB-PHASES

### 3A — Reset-to-reference button (the headline gap)
Surface a reset control at the level the endpoint operates: **per-backend** (and an optional **per-kind** narrowing), since `reset(backend, kindId?)` is backend/kind-scoped — NOT per-rule. Place it where backend/kind scope reads naturally (e.g. a KindsTab header action, or a backend-scoped control in the shell). Wire it through the store if `reset` isn't yet exposed to the component (the `adminService.reset()` exists; expose it on `useAdminStore` if missing).
- Gated on `can(RULE_RESET_REFERENCE)` → disabled + tooltip for non-super_admin.
- Opens a **confirmation dialog** (copy per the constraint above). On confirm → call `reset()`, toast the `{reset, failed}` result, refresh the affected rules/kinds.

**Gate:** super_admin can reset (per-backend and per-kind) behind a confirm; power_user sees it disabled.

### 3B — Diff rendering
Render the already-fetched `detail.diffs` in the version history: for each version transition, show the **field-level from→to** of what changed (the `Record<string,{from?,to?}>` shape). Keep it legible and compact (a small "what changed" expander per version, or a diff column). Empty/identical → "no changes".

**Gate:** selecting a rule with ≥2 versions shows the field-level changes between them.

### 3C — CORE/SOFT + gated/advisory badges
Surface the governance class visibly:
- In **KindsTab**: a badge per kind — `CORE` (locked, field structure code-locked) vs `SOFT` (DB-editable/extensible), driven by `kind.class` / `is_locked`. CORE kinds' structure controls are disabled with a "locked to code" note.
- In **RulesTab** (and tab headers): a small **gated** indicator (domain_rules / rule_kinds = eval-gate governed). (tool_category_cache = advisory has no surface yet — that's step 5; do not add it here.)

**Gate:** every kind shows its CORE/SOFT class; CORE kinds visibly indicate the code-lock.

### 3D — Inline how-to help + confirmation dialogs
- **Inline help** (Maymun's explicit ask): a concise, dismissible explainer per relevant tab — how editing works (maker saves a **draft** → **eval-gate** → super_admin **publishes** globally), how **reset** works (re-publishes the code baseline as a new version, history preserved), and what **CORE-locked vs SOFT** means. Short, legible, not a wall of text.
- **Confirmation dialogs** for rollback and archive too (not just reset) — replace the current fire-on-click with a confirm (shadcn `dialog`/`alert-dialog`).

**Gate:** each destructive action confirms first; the inline help explains edit + reset + CORE/SOFT.

---

## SELF-VERIFICATION CHECKLIST — evidence
- [ ] Pre-flight 1–4 pasted (existing surfaces confirmed; missing pieces confirmed; baseline grep empty).
- [ ] **Reset button:** present, gated on `can(RULE_RESET_REFERENCE)`, behind a confirm dialog with the correct "new version / history preserved / not a delete" copy. power_user → disabled. (Describe/screenshot both.)
- [ ] **Diff rendered:** a rule with ≥2 versions shows field-level from→to.
- [ ] **CORE/SOFT badges:** every kind shows class; CORE shows the code-lock; gated indicator on rules.
- [ ] **Inline help:** explains draft→gate→publish, reset semantics, CORE vs SOFT.
- [ ] **Confirm dialogs:** reset + rollback + archive all confirm before acting (no fire-on-click).
- [ ] **Legibility preserved:** `grep -rnE "text-white/(20|30|40|50)|text-\[1[01]px\]" src/components/admin/` → **empty**; new text ≥ AA + min sizes.
- [ ] **Frontend-only:** `git diff --stat 6b42738..HEAD` touches only admin components / store / service / shared UI helpers; **no** `api/`, `shared/permissions.ts`, `shared/dbConstants.ts`, gate, chat, gateway, grounding. Paste it.
- [ ] **Did NOT rebuild** version history / rollback / archive (extended in place).
- [ ] `tsc -b` + typecheck:api + `vite build` + `oxlint` + `vitest` green — paste numbers.

---

## STOP
Do **not** build session-preview/Lab mode (step 4) or the Tool Routing tab (step 5). Stop after the checklist and present the report with the empty banned-token grep, the frontend-only diff stat, and the reset/confirm proof. Then state:

> **"GOV-3 complete — per-table edit/reset story closed: reset-to-reference button (gated + confirmed, history-preserving), version diffs rendered, CORE/SOFT + gated badges, inline edit/reset help, confirm dialogs on all destructive actions. Frontend-only — no backend/gate file touched. Legibility preserved. Ready for step 4 (session-preview + Lab mode + test toggles)."**
