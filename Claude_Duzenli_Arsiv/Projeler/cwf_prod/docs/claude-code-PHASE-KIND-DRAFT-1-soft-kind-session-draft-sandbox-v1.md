# claude-code — PHASE KIND-DRAFT-1 · SOFT-Kind Session-Draft Sandbox · v1

<!-- v1 · 2026-07-07 · Architect-lane gated phase prompt (written by the Architect, NOT AG).
     Anchor: origin/master `e5b678a` · 1036 tests / 98 files / docVersion rev 48 / drift [OK].
     Design source: cwf-phase-A2-kind-draft-sandbox-design-v1.md (owner-approved).
     Touches a migration on a NEW table + the kind-resolution seam feeding the eval gate → FULL RULE-25
     review. The eval-gate ENGINE itself is FROZEN. -->

## 0. PRE-FLIGHT GATE (hard — abort if any line fails)

1. `git fetch origin && git rev-parse origin/master` → MUST print `e5b678a…`. Else STOP and report.
2. Working tree clean; branch `feat/kind-draft-1-sandbox` off origin/master.
3. **Drift gate green** (`[OK]`) before any edit.
4. Full suite green at anchor: 1036/1036 across 98 files. Record both numbers.

## 1. HARD CONSTRAINTS (violating any = phase rejected)

- **Scope fence:** ONLY the SOFT-kind draft sandbox per the design note. Do NOT build: in-system
  publish/promotion workflow, draft versioning/history, draft sharing, provider sandbox (A3), quota (B),
  any `rule_kinds` schema change, any permission rename.
- **FROZEN (zero diff lines, verified by name):** `gate/evalGate.ts` (engine/stages/interpreter),
  `groundingCheck.ts`, trust registry, injection boundary, `resolveAuthHeader`, secret-guard modules,
  `shared/mcpSecrets.ts`. The ONLY runtime behavior change is WHICH KindDef reaches existing call sites,
  via the resolution seam.
- **Governed-table line:** `kind_drafts` is a NEW, NON-governed, owner-RLS table. No production read path
  may join or read it. `rule_kinds` writes remain exclusively the existing `KIND_SOFT_EDIT` path.
- **Migration = two gates:** you AUTHOR the `.sql` (+ document it); you NEVER apply it. Application to the
  live DB is the Operator lane's gate. All your tests must pass WITHOUT the live migration (repository
  mocked, as existing repo tests do).
- **CORE lock:** a draft targeting a CORE kind_id (or a kind_id whose global row is `class='core'`) is
  rejected 422 with the kind named. The overlay helper must refuse to override CORE — enforce in BOTH the
  endpoint and the helper (defense in depth).
- **Same-Zod rule:** draft save validates `field_spec` with the SAME `FieldSpecSchema` parse as the global
  path — verbatim import, no relaxed variant.
- **Owner-scope server-side:** every kind-drafts operation filters by the authed ctx user id; never trust
  a client-supplied user id. Cross-user access returns 404 (not 403 — do not leak existence).
- **Capability-not-role** throughout; no secrets anywhere.
- Diff-scope explicitly PERMITS: `.agents/CHANGELOG.md`, manifest reseal, frontend service methods, AND
  the one-line `api/admin/replay.ts` HEADER docstring fix (stale "Both gated by REPLAY_RUN" → the
  lens/run split truth) — a tracked-small from the NAV-RBAC-1 review, comment-only.

## 2. GATED SUB-PHASES (complete + self-verify each before the next)

### 2.1 Migration (author only)
`supabase/migrations/<ts>_kind_drafts.sql`: table per design §2.1 — `draft_id uuid PK default
gen_random_uuid() · user_id uuid not null references auth.users(id) on delete cascade · kind_id text not
null · backend_id text not null references backends(id) · name text not null · field_spec jsonb not null ·
note text · created_at/updated_at timestamptz` · UNIQUE `(user_id, kind_id)` · RLS ENABLED with
owner-CRUD policies ONLY (select/insert/update/delete where `auth.uid() = user_id`); no service-role
production read is added anywhere. Comment on table states: personal sandbox, NON-governed, never served
to production.
**Gate evidence:** the file, verbatim, in the report + an explicit line "NOT applied — Operator gate".

### 2.2 Capability
`KIND_DRAFT: 'kind:draft'` added to PERMISSIONS + `MAKER_PERMISSIONS`. Tests: power_user has it; user
does not; power_user still lacks `KIND_SOFT_EDIT`.

### 2.3 Repository + endpoint
`KindDraftsRepository` (mirrors existing repo patterns; mocked in tests) + `api/admin/kind-drafts.ts`:
GET (own list) · POST (create) · PATCH (edit own) · DELETE (own). All gated
`ensurePermission(KIND_DRAFT)`. POST/PATCH: Zod-parse field_spec (same schema), reject CORE-shadow 422
(named), reject unknown backend_id.
**Gate evidence (tests):** matrix — power_user: own CRUD 200/201, foreign draft_id → 404; user: all 403
(error contains `kind:draft`); super_admin: 200 (ALL includes the cap). CORE-shadow → 422 test. Invalid
field_spec → 422 with the Zod message surfaced verbatim.

### 2.4 Resolution overlay (runtime heart — additive only)
Pure helper (new file, e.g. `knowledge/resolveKindWithDrafts.ts`): `(globalKind: KindDef|null,
callerDraft: KindDraft|null) → KindDef|null` — caller draft wins ONLY when global is null or global is
SOFT; CORE always wins; null-safe.
- **Seam 1 (governance.ts rule-draft create/update):** kind resolution becomes global ∪ caller's own
  draft via the helper. The actor id already in scope is the ONLY draft source.
- **Seam 2 (`composeLabSlice`):** when `previewUserId` is set, kind resolution for composing the caller's
  preview slice consults the caller's drafts via the same helper. Published/production reads
  (`getPublishedRules`, warmed cache, `getDomainContext`) remain byte-identical — zero draft awareness.
**Gate evidence (tests):** (a) rule draft against caller's draft kind → save succeeds; same input without
the draft → `unknown kind`; (b) rule draft against ANOTHER user's draft kind → `unknown kind` (isolation);
(c) draft shadowing a CORE kind never reaches the validator (helper returns the CORE def); (d) a
production-path compose (no previewUserId) with drafts present in the mock → output identical to
no-drafts (byte-compare).

### 2.5 UI (KindsTab + rule editor)
"Taslaklarım / My drafts" section for `KIND_DRAFT` holders: create/edit/delete with the existing SOFT
field editor, live Zod verdict verbatim, shadow badge when kind_id matches an existing SOFT kind,
CORE-collision rejected inline (pre-emptive mirror of the server rule), copy-as-JSON button. Rule-draft
editor's kind picker includes own draft kinds, badged "taslak/draft". Global list behavior (NAV-RBAC-1
read-only for maker) unchanged.
**Gate evidence:** RTL — power_user sees the section + can author; user sees nothing; the picker shows a
badged draft kind; copy-as-JSON puts the field_spec JSON on the clipboard mock.

### 2.6 Living-doc lock-step + seal
Architecture/governance docs: `kind_drafts` (personal, non-governed) + `kind:draft` maker row per RULE 20
altitude judgment (redraw if matrix altitude, else reseal — justify which). Manifest reseal; docVersion
**48 → 49**; two-commit seal; merge `--no-ff`; push.

## 3. SELF-VERIFICATION (literal evidence; "build green" is NOT evidence)

1. Anchor before/after + merge + remote hash (push confirmed).
2. Suite count 1036 → strictly greater; list every new test file + per-file test counts.
3. `git diff --stat origin/master...HEAD` full; FROZEN files zero lines, verified by name sweep.
4. Paste verbatim: the migration SQL; the KIND_DRAFT constants hunk; the helper's full body; the two seam
   diff hunks (governance.ts + composeLabSlice).
5. Paste the §2.3 + §2.4 matrix test names + key assertions.
6. Paste the replay.ts header fix hunk (comment-only).
7. Drift `[OK]` after seal + docVersion line rev 49.
8. Declare every deviation explicitly; undeclared deviation = rejected phase.
9. End with the exact line: "MIGRATION AUTHORED, NOT APPLIED — Operator gate pending."

<!-- END · claude-code-PHASE-KIND-DRAFT-1-soft-kind-session-draft-sandbox-v1 · rev 1 · 2026-07-07 -->
