# CWF — Phase A Design Note: RBAC Nav Re-grouping + Maker-Sandbox Capability Model · v1

<!-- v1 · 2026-07-06 · anchor = origin/master `bf3d95d` (1013 tests / docVersion rev 47 / drift OK).
     Architect-lane design note. NOT the phase prompt — the ONE gated AG prompt follows after owner nod.
     Phase A of 3 (A = this · B = replay quota subsystem · C = User Docs page). -->

## 0. Scope boundary (what this phase is / is NOT)

**Phase A delivers:** the 5-section admin nav IA from the RBAC screenshot, and the *capability* changes
that make the DEVELOPER (`power_user`) column true — expressed as capabilities, never role literals.

**Phase A does NOT deliver** (deliberately deferred, named here so this phase can't balloon):
- **B — Replay quota subsystem:** `user_quotas` table, server-side atomic per-user token quota at the
  replay POST (monthly reset + super-admin manual reset), "no limit" option, super-admin quota admin UI,
  per-user usage view. Cost/security-relevant; its own gated phase.
- **C — User Docs page:** the DOCUMENTS-section doc renderer that hosts the reference docs (incl. the
  committed governance-replay explainer). Its own phase. In Phase A the DOCUMENTS section ships with
  **Architecture only**; User Docs is added in C.
- **No new kind/provider *edit* sandbox.** See §4 — developer gets **view** of Kinds and the Provider
  registry in Phase A, not a new draft/preview authoring surface for them. Building those is future work.

## 1. The screenshot → code reality (why anything changes)

Roles map: SUPERADMIN = `super_admin`, DEVELOPER = `power_user` (code comment: "maker/developer: panel +
scoped draft authoring; NO global publish/users"), USER = `user`.

Two requirements are **already correctly enforced today — untouched by Phase A:**
- **USER = N/A.** The Sidebar admin/settings link is gated by `hasPermission(PANEL_ACCESS)`; `user` lacks
  it → the entry point never renders. (UX hint; server re-enforces.)
- **MCP Global settings = super-admin only.** `MCPSettingsTab` gates its global section on
  `can(CONFIG_GLOBAL)`; server gates `api/admin/mcp-settings` on `CONFIG_GLOBAL`. Personal MCP stays
  owner-RLS. Matches the annotation.

Three items are drawn as visible-to-DEVELOPER but hidden today, because their nav `show:` gate is bound to
the **action** capability (super-admin-only for deliberate reasons):

| Item | Today's gate | Why super-only today |
|---|---|---|
| Kinds | `can(KIND_SOFT_EDIT)` | kind edit intentionally not granted to the maker (CORE structure lock) |
| LLM Providers | `can(PROVIDER_MANAGE)` | global provider config = super (global publish stays checker) |
| Replay | `can(REPLAY_RUN)` | REPLAY_RUN **spends tokens** — super-only "plus cost" |

**The hidden trap this phase resolves:** the nav conflates *seeing a page* with *performing its privileged
action*. Hiding/showing a nav item is cosmetic — the real gate is server-side. So the fix is not "flip
three `show:` flags"; it is to **split visibility/read from the privileged action** at both the cap layer
and the server, so DEVELOPER can develop without inheriting the paid/global-blast-radius powers.

## 2. IA change: two planes → five sections (RULE 24 reconciliation)

Today `plane: 'govern' | 'microscope'` is **visual grouping only** — two `PlaneGroup` renders, no
plane-level toggle/state. Minimal faithful change: replace the `plane` field with a `section` field and
render five `SectionGroup`s. Section → tab assignment (as drawn):

- **DOCUMENTS** — Architecture · (User Docs → added in Phase C)
- **CONNECTION SETTINGS** — MCP Servers · LLM Providers
- **CONFIGURATION** — Rules · Kinds · Routing
- **MICROSCOPE** — Inspect · Tweak · Replay
- **GOVERN** — User Management

**RULE 24 impact:** its "two-plane control-plane home" wording becomes "sectioned control-plane home."
This is a living-doc lock-step change — the architecture doc + manifest reseal + the RULE 24 text update
travel in this phase's seal (§6). The primer collapse⇄expand behavior (a separate concern from nav
grouping) is preserved unchanged.

## 3. Capability model (capability-not-role)

New granular capabilities (naming follows the existing `domain:verb` convention):

| New cap | String | Meaning | Granted to |
|---|---|---|---|
| `REPLAY_LENS` | `replay:lens` | pure-GET, token-free governance lenses + specimen inspect | `power_user` (+ super via ALL) |
| `KIND_VIEW` | `kind:view` | read-only view of kind types/values | `power_user` (+ super via ALL) |
| `PROVIDER_VIEW` | `provider:view` | read-only view of the configured provider/model registry | `power_user` (+ super via ALL) |

Role → capability delta: **`MAKER_PERMISSIONS` (power_user) gains exactly** `REPLAY_LENS`, `KIND_VIEW`,
`PROVIDER_VIEW`. Nothing else. `super_admin` = `ALL_PERMISSIONS` (auto-includes the new caps). `user`
unchanged (`CHAT_QUERY` only). **`power_user` does NOT gain `REPLAY_RUN` in Phase A** — the paid run
stays gated; the token-free lenses are what light up. (Phase B grants a *quota-gated* `REPLAY_RUN`.)

Updated nav `show:` predicates (each an OR of view-or-action so both roles see the tab, server decides
what each may DO):

- Architecture `true` · Rules `true` · MCP Servers `true` · Routing `can(ROUTING_CACHE_CLEAR)` (already
  power_user) · Inspect `can(TELEMETRY_READ)` · Tweak `can(LAB_TOGGLE_SESSION)` · User Management
  `can(USER_MANAGE)` (super only) — **unchanged.**
- Kinds → `can(KIND_VIEW) || can(KIND_SOFT_EDIT)`
- LLM Providers → `can(PROVIDER_VIEW) || can(PROVIDER_MANAGE)`
- Replay → `can(REPLAY_LENS) || can(REPLAY_RUN)`

## 4. Maker-sandbox semantics — what DEVELOPER actually develops

The develop-loop is real and already largely exists; Phase A completes its *visibility*:
- **Rules** — full maker loop already present (`RULE_DRAFT_CRUD` + `RULE_PREVIEW_SESSION`): draft → session
  preview → hand to checker for global publish. **Unchanged.**
- **Lab / Tweak** (`LAB_TOGGLE_SESSION`) — session sandbox: toggle lab mode, try things in-session,
  including per-session model experimentation. **Already power_user.**
- **Token-free governance lenses** (`REPLAY_LENS`, new) — replay one's own drafts (`@ preview`) against
  recorded turns to see what a rule change flips. Deterministic, pure GET, no tokens. **This is the core
  develop-and-test surface** and the direct answer to "how does a developer develop without playing."
- **Kinds** — DEVELOPER gets **view** (`KIND_VIEW`). Kind *structure* stays super-authored **by design**
  (the CORE field-structure lock: CORE shape is locked to the code Zod schema). No new kind edit-sandbox
  here; view satisfies the screenshot.
- **LLM Providers** — DEVELOPER gets **view** of the registry (`PROVIDER_VIEW`); model experimentation is
  via Tweak (already granted); managing the registry stays `PROVIDER_MANAGE` (super).
- **Paid model-replay** — the token-spending A/B (PERTURB-1) / Part-B run stays behind `REPLAY_RUN`; in
  Phase A its run controls are **disabled for developer** (no REPLAY_RUN yet). Phase B unlocks it under a
  per-user monthly quota (auto-reset + super manual reset, "no limit" option).

## 5. Server-side gate discipline (visibility ≠ enforcement — the security core)

For every surface newly *visible* to DEVELOPER, the read path is gated by the VIEW/LENS cap while the
privileged action stays on the ACTION cap. Endpoints in scope (each = full-review touch):

- **Providers API** — split: list/read → allow `PROVIDER_VIEW`; add/remove/toggle/publish → keep
  `PROVIDER_MANAGE`. Confirm current handler doesn't gate read+write jointly on `PROVIDER_MANAGE`.
- **Kinds API** — split: read → allow `KIND_VIEW`; write → keep `KIND_SOFT_EDIT`.
- **Replay endpoint (`/api/admin/replay`)** — the sensitive split: **GET** paths (specimen list, specimen
  detail, grounding/routing/scope lenses — pure GET, token-free, un-audited) → `REPLAY_LENS`; **POST** run
  (mode `ab` / Part B — spends tokens, writes the audit row) → keep `REPLAY_RUN`. A replay endpoint that
  could leak redacted payloads is a full-review artifact; the C9 raw-payload boundary and NAME-ONLY lens
  output are unchanged.

## 6. Invariants / floor — what must NOT change

- Global publish (rules/kinds/providers) stays **checker-only** (`super_admin`); never quota'd, never
  maker-granted. Quota governs cost; publish governs blast radius — different axes.
- Paid replay stays gated (Phase A: `REPLAY_RUN` unchanged, developer denied; Phase B: quota).
- Token-free lenses stay pure-GET / un-audited / NAME-ONLY / production-core reuse (lab floor never
  drifts); C9 raw payloads stay server-side.
- USER keeps no `PANEL_ACCESS`; MCP global stays `CONFIG_GLOBAL`; personal MCP stays owner-RLS.
- Capability-not-role everywhere: no new role-literal checks in render; the one existing role literal
  (Admin vs Settings label) is display-only and stays.

## 7. Living-doc lock-step + seal

Mapped areas touched (`api/**`, `shared/**`, `src/**` admin nav) → architecture doc + `manifest.json`
reseal + RULE 24 text update ("sectioned control-plane home") in the same seal; two-commit pattern for the
mixed code+doc phase; docVersion bump on completion. Drift gate green is a mandatory pre-flight line.

## 8. Deferred / hand-off

- Kind & provider *edit* sandbox for the maker → tracked future (not this phase).
- Phase B (quota) depends on the `REPLAY_LENS`/`REPLAY_RUN` split landing here first.
- Phase C (User Docs) adds the DOCUMENTS-section renderer + hosts the governance-replay explainer.

<!-- END · cwf-phase-A-rbac-nav-maker-sandbox-design-v1 · rev 1 · 2026-07-06 -->
