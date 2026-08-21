# CWF — Phase A2 Design Note: SOFT-Kind Session-Draft Sandbox · v1

<!-- v1 · 2026-07-07 · anchor = origin/master `e5b678a` (post NAV-RBAC-1 · 1036 tests / docVersion rev 48).
     Architect-lane design note; the ONE gated AG prompt follows after owner nod.
     Parent design: cwf-phase-A-rbac-nav-maker-sandbox-design-v3.md §1 (A2). -->

## 0. Goal (one line)

Give the developer (`power_user`) a true **kind sandbox**: author SOFT-kind structure drafts (new kinds OR
proposed edits to existing SOFT kinds), validate them with the same Zod discipline as global, use them in
their own rule drafts + session preview + lenses — **without ever touching global.** Publish stays a
human, out-of-band act (developer proves it → tells super → super applies via the existing gated editor).

## 1. Code reality that shapes the design (verified at `e5b678a`)

1. **The rules draft pattern does NOT copy directly.** Rules sandbox = same governed table, `status='draft'`
   + `created_by` owner-scope. But `rule_kinds` has `kind_id` as PRIMARY KEY — one row per kind, no
   status/owner columns. A "draft row" in `rule_kinds` = PK collision or an invasive governed-table
   migration. **Rejected.**
2. **The kind def is already a parameter, not a global.** Rule draft-save resolves its kind via
   `resolveKindDef(await repo.getKind(kindId))` (governance.ts:87 create / :106 update) and hands it to
   `validateInstancePayload(kind, payload)`. The eval-gate ENGINE (`runGate`, stage order, schema
   interpreter) consumes the resolved def — it never looks kinds up itself. So a draft-kind overlay is an
   **additive change at the resolution seam only**; the frozen eval-gate machinery stays byte-identical
   (the standing eval-gate-scoping invariant is satisfied by construction).
3. **CORE is categorically locked** (`class='core'` → `is_locked` + `code_schema_ref`, structure = code Zod).
   No draft may target a CORE kind_id — for anyone.
4. **The lab preview overlay pattern exists** (`composeLabSlice` previewKeys/previewUserId: read-only,
   caller-scoped, key-matched). A2 reuses its *shape* for kind resolution.

## 2. Committed design

### 2.1 Storage — new per-user, NON-governed table `kind_drafts`
Owner-RLS (owner-CRUD only, like personal `mcp_settings`), never served to production reads:
`draft_id uuid PK · user_id (owner) · kind_id text · backend_id · name · field_spec jsonb · note text ·
created_at/updated_at`. Uniqueness `(user_id, kind_id)` — one draft per kind per user.
- `kind_id` may be **new** (proposed new SOFT kind) or may **shadow an existing SOFT kind** (proposed
  structure edit — overlays only in the caller's own sandbox resolution).
- Shadowing a **CORE** kind_id → rejected at save (422, named).
- Save-time validation = the **same** `FieldSpecSchema` Zod parse the global path uses (no weaker sandbox
  schema). Migration = authored (AG) AND applied (Operator) — two separate gates, schema-read confirmed.

### 2.2 Capability + API
- New cap `KIND_DRAFT: 'kind:draft'` → added to `MAKER_PERMISSIONS`. Global write stays `KIND_SOFT_EDIT`
  (checker). **Decision: NO rename to `KIND_PUBLISH_GLOBAL`** (v3 floated it) — renaming a shipped
  permission string is churn across gates/tests/docs for zero behavior; `KIND_SOFT_EDIT` already *is* the
  global tier. v3's intent is honored by the axis, not the label.
- New endpoint `api/admin/kind-drafts.ts` (GET own list · POST create · PATCH edit · DELETE), all
  `ensurePermission(KIND_DRAFT)` + owner-scope enforced server-side (never trust a client user id).
- No in-system publish workflow (owner principle: promotion is verbal/email). One convenience only: a
  **copy-as-JSON** affordance on a draft so super can paste the proven `field_spec` into the existing
  global editor. No new publish gate, no promotion endpoint.

### 2.3 Resolution overlay (the runtime heart — additive, two seams)
A tiny pure helper `resolveKindWithDrafts(globalKind, callerDraft)` — caller's draft wins in the caller's
own sandbox context; otherwise global; CORE never overridable.
- **Seam 1 — rule-draft save/update (governance.ts):** when the actor saves a rule draft, kind resolution
  becomes global-kind ∪ caller's-own-draft-kind. Result: a developer can author rule drafts against their
  draft kind (today: `unknown kind` error). Gate engine untouched — it still just receives a KindDef.
- **Seam 2 — session preview (`composeLabSlice`):** when composing the caller's lab slice, rules whose
  kind is the caller's draft kind compose normally (kind name/def resolved via the overlay). Published
  production reads NEVER see drafts (overlay requires previewUserId = caller — same discipline as rules).
- Grounding/routing lens `@ preview` picks this up for free (lenses reuse the production core + preview
  slice; floor stays sacred — a draft kind can never weaken a floor verdict, only show in the diff).

### 2.4 UI (KindsTab)
For `KIND_DRAFT` holders: a **"Taslaklarım / My drafts"** section — create/edit/delete own drafts with the
same field editor as SOFT kinds, live Zod verdict verbatim, shadow-badge when kind_id matches an existing
SOFT kind, CORE-collision rejected inline, copy-as-JSON. Rule-draft editor's kind picker includes own
draft kinds (badged "draft"). Global list stays read-only for the maker (NAV-RBAC-1 behavior).

## 3. Invariants (must hold; the phase prompt will demand evidence)

- `kind_drafts` is NOT a governed table; no production read path ever joins it. Global `rule_kinds`
  untouched by any sandbox op. Publish = existing `KIND_SOFT_EDIT` path only.
- CORE structure locked for everyone: draft targeting a CORE kind_id rejected; overlay refuses CORE.
- Eval-gate machinery byte-identical (`runGate`/stages/interpreter); the ONLY change is what KindDef is
  passed in, via the resolution seam.
- Same Zod (`FieldSpecSchema`) at draft save as global — sandbox is not schema-weaker.
- Lenses/preview stay pure/read-only; floor sacred; C9 unchanged.
- Owner-scope server-enforced; drafts never visible cross-user (RLS + endpoint filter).

## 4. Out of scope (do not build)

In-system promotion/publish workflow · kind draft **versioning/history** · draft sharing between users ·
provider sandbox (A3) · quota (B) · any `rule_kinds` schema change.

<!-- END · cwf-phase-A2-kind-draft-sandbox-design-v1 · rev 1 · 2026-07-07 -->
