# CWF — Phase A Design Note: Sandbox-vs-Global RBAC + Nav Re-grouping · v2

<!-- v2 · 2026-07-06 · anchor = origin/master `bf3d95d`. SUPERSEDES v1.
     DELTA vs v1: (1) reframed around the owner's principle — developer has FULL sandbox on everything;
     the ONLY line is global-level (publish/commit) = super_admin ONLY. (2) Kinds moved OUT of "view-only"
     INTO the developer sandbox — but code shows no session kind-draft exists today and the preview overlay
     is rules-only, so the SOFT-kind session-draft is NEW machinery carved into its own gated sub-phase A2.
     Architect-lane design note; the gated AG prompt(s) follow after owner nod. -->

## 0. The governing principle (owner-set)

> Developer plays with **everything in their own sandbox**; the **only** thing gated is **global level** —
> any change that commits/publishes to the shared, all-users state is **super_admin only**.

This is exactly the maker-checker line. The correct axis is **SANDBOX (session-scoped draft/preview,
isolated, no blast radius) vs GLOBAL (publish/commit to the governed DB, affects all users)** — not the
coarser "view vs act" of v1. Every surface is mapped onto this one axis in §3.

## 1. Scope of the three phases (unchanged split, kinds-build carved explicit)

- **A — nav IA (5 sections) + the sandbox-vs-global capability model + wiring visibility for surfaces
  whose sandbox ALREADY exists (rules, lab/Tweak, replay lenses, personal MCP) + the server-side
  read/action & lens/run splits.** Makes the screenshot true for everything already sandbox-able.
- **A2 — SOFT-kind session-draft/preview subsystem (NEW machinery).** Session-scoped SOFT-kind draft store
  + extend `composeLabSlice` to overlay session kind-structure drafts + super-only global publish. Touches
  the CORE/SOFT structure contract → full review. Sequenced right after A (A2 depends on A's caps).
- **B — replay quota subsystem** (monthly reset + super manual reset + no-limit + usage view; unlocks
  quota-gated `REPLAY_RUN` for developer).
- **C — User Docs page** (DOCUMENTS-section renderer; hosts the committed governance-replay explainer).

## 2. Nav IA: two planes → five sections

`plane` is visual grouping only (two `PlaneGroup` renders, no toggle/state). Minimal faithful change:
`plane` field → `section` field; two groups → five `SectionGroup`s. Assignment (as drawn):

- **DOCUMENTS** — Architecture · (User Docs → Phase C)
- **CONNECTION SETTINGS** — MCP Servers · LLM Providers
- **CONFIGURATION** — Rules · Kinds · Routing
- **MICROSCOPE** — Inspect · Tweak · Replay
- **GOVERN** — User Management

RULE 24 "two-plane home" → "sectioned control-plane home" (living-doc lock-step, §6). Primer
collapse⇄expand preserved.

## 3. Sandbox-vs-global mapping, per surface (the heart)

| Surface | Sandbox op (developer + super) | Global op (super ONLY) | State today |
|---|---|---|---|
| **Rules** | draft CRUD + session preview (`RULE_DRAFT_CRUD`, `RULE_PREVIEW_SESSION`) | global publish (`RULE_PUBLISH_GLOBAL`) | ✅ exists — no change |
| **Lab / Tweak** | session lab toggle + per-session model try (`LAB_TOGGLE_SESSION`) | — | ✅ exists — dev already has |
| **Replay lenses** | token-free grounding/routing/scope lenses incl. `@ preview` of own drafts (`REPLAY_LENS`, new) | paid model-replay run (`REPLAY_RUN`, quota in B) | lens = new cap on existing GET; run split from it |
| **Kinds (SOFT structure)** | session SOFT-kind draft + preview (`KIND_DRAFT`, new — **A2 build**) | publish SOFT kind to global (`KIND_PUBLISH_GLOBAL`; today's direct `KIND_SOFT_EDIT` becomes the super-only global op) | ❌ no session draft exists → A2 |
| **Kinds (CORE structure)** | — (code-Zod-locked for everyone; immutable via DB) | — (reset-to-reference only) | locked — not a sandbox/global question |
| **Kind instances** | live in Rules → already sandboxed via rule drafts | via rule publish | ✅ exists |
| **Providers** | session model/provider *selection* experimentation via Tweak; registry **view** (`PROVIDER_VIEW`, new) | registry add/remove/config (`PROVIDER_MANAGE`) | view = new cap; experimentation exists |
| **MCP** | personal servers (owner-RLS) | global servers (`CONFIG_GLOBAL`) | ✅ exists — perfectly fits the principle |
| **Routing** | cache clear (`ROUTING_CACHE_CLEAR`) | global routing edit (`ROUTING_EDIT_GLOBAL`) | ✅ exists — dev already has |
| **Users** | — | user management (`USER_MANAGE`) | super only — unchanged |

**Capability delta (capability-not-role):** `MAKER_PERMISSIONS` (power_user) gains, in Phase A,
`REPLAY_LENS` + `PROVIDER_VIEW`; in A2, `KIND_DRAFT` (+ session-preview for kinds). Global caps
(`*_PUBLISH_GLOBAL`, `PROVIDER_MANAGE`, `CONFIG_GLOBAL`, `USER_MANAGE`, paid `REPLAY_RUN` pre-quota) stay
super. No role literals in render.

Nav `show:` predicates (OR of sandbox-or-global so both roles see the tab; server decides what each may DO):
Kinds → `can(KIND_DRAFT) || can(KIND_PUBLISH_GLOBAL)`; LLM Providers →
`can(PROVIDER_VIEW) || can(PROVIDER_MANAGE)`; Replay → `can(REPLAY_LENS) || can(REPLAY_RUN)`; the rest
unchanged.

## 4. Server-side gate discipline (visibility ≠ enforcement — security core)

Hiding a nav item is cosmetic; the real gate is server-side. Endpoints in scope (full-review touches):

- **Replay `/api/admin/replay`** — split: **GET** (specimen list/detail + grounding/routing/scope lenses,
  pure GET, token-free, un-audited) → `REPLAY_LENS`; **POST** run (mode `ab` / Part B, spends tokens,
  writes audit) → keep `REPLAY_RUN`. C9 raw-payload boundary + NAME-ONLY lens output unchanged.
- **Providers API** — split: list/read → allow `PROVIDER_VIEW`; mutate → keep `PROVIDER_MANAGE`.
- **Kinds API (A2)** — the session draft path writes a **per-user draft store**, never the governed
  `domain_kinds` table; only `KIND_PUBLISH_GLOBAL` (super) commits globally. `composeLabSlice` extended to
  overlay the caller's session kind-drafts (mirrors `previewDrafts` for rules). CORE structure stays
  code-locked regardless of caps.

## 5. Invariants / floor — must NOT change

- Global = super, always. No sandbox op ever writes the governed global tables; sandbox = session overlay
  / per-user draft only. This is the whole safety line.
- Paid replay stays gated (A: dev denied; B: quota). Token-free lenses stay pure-GET/un-audited/NAME-ONLY,
  production-core reuse (lab floor never drifts); C9 raw payloads server-side.
- CORE kind structure code-Zod-locked for everyone (super included); SOFT structure DB-editable but only
  super publishes globally.
- USER keeps no `PANEL_ACCESS`; MCP global stays `CONFIG_GLOBAL`; personal MCP owner-RLS.

## 6. Living-doc lock-step + seal

Mapped areas (`api/**`, `shared/**`, admin nav) → architecture doc + `manifest.json` reseal + RULE 24 text
update, same seal; two-commit pattern; docVersion bump; drift-gate-green pre-flight line. A and A2 each
seal independently.

## 7. Deferred / open

- Session-scoped *provider config* drafts (beyond model selection) — not in scope; flag if wanted later.
- A2's kind-draft overlay is the one genuinely new subsystem; everything else in A rides existing sandbox
  machinery.

<!-- END · cwf-phase-A-rbac-nav-maker-sandbox-design-v2 · rev 2 · 2026-07-06 · supersedes v1 -->
