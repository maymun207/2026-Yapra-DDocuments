# PHASE L4 — ROUTING-DRAFTS (learned-map lifecycle: drafts · pin · publish · revert · honest @preview) · v1

<!-- claude-code-PHASE-L4-routing-drafts-v1 · rev 1 · 2026-07-10 · AG-lane artifact.
     Ratified design: cwf-L4-routing-drafts-design-v1 (Architect-lane; do NOT go looking for
     it — everything binding is embedded HERE verbatim). Anchor: origin/master d87fedd
     (1779 tests / 170 files / docVersion rev 61). THIS PHASE HAS DDL: ONE migration,
     AUTHORED ONLY — Operator applies it later via `supabase db push`. AG's DB access is
     read-only (supabase-ro); AG NEVER applies anything. -->

## 0 · HARD PRE-FLIGHT (STOP on any failure — report, do not improvise)

```bash
cd <workspace> && rm -rf cwf_yaprak && git clone https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # EXPECT d87fedd29b174c3d9a58befbab58ebaa043d4f63 — if moved, STOP and report
npm ci --no-audit --no-fund
npm run test                       # EXPECT green, 1779 tests / 170 files
npm run typecheck:api              # EXPECT green
```
Branch: `feat/l4-routing-drafts`. At the end: push the BRANCH and STOP — the merge happens
ONLY on the Architect's explicit GO after the RULE-25 fresh-clone review, `--no-ff`
(squash BANNED), with a verbatim merge message the Architect supplies at GO time.

## 1 · WHAT THIS PHASE BUILDS (one paragraph)

The learned tool-routing map (`tool_category_cache`) gets its full lifecycle: a `pinned`
flag the machine learn-path cannot clobber; a personal owner-RLS draft store
(`routing_drafts`, set/remove overlay ops); an append-only curation ledger
(`routing_audit`) with single-keyword point revert; gated live row-CRUD + publish
(super, `ROUTING_EDIT_GLOBAL` — its FIRST enforcement) where EVERY live mutation rides ONE
`mutateAndBump` seam (row write + ONE epoch bump + audit rows, never separable); the
routing replay lens honestly gains `@preview` (live ∪ the CALLER's OWN drafts) plus a pure
probe bench; RoutingTab becomes the four-column family panel
(Reference | Live | My Draft | Preview). Routing stays the SOFT/learned axis: it changes
how the agent FINDS tools, never what it KNOWS — the static `CATEGORIES` + `ALWAYS_INCLUDE`
floor inside `routeKeywordLayer` is untouchable and below-floor stays structurally
impossible.

## 2 · CONSTRAINTS (violating any one fails the phase)

- **C-A DDL AUTHORED, NEVER APPLIED.** Exactly ONE new migration file (§3-G1, SQL embedded
  verbatim). AG does not apply it, does not run seeds, does not touch the live DB beyond
  supabase-ro reads. Every doc written this phase states the migration is
  **"AUTHORED, Operator-pending"** — never "applied".
- **C-B BYTE-IDENTITY pins** — `git diff d87fedd..HEAD -- <path>` MUST be empty for each:
  `api/cwf/_lib/adminGuard.ts` · `api/cwf/_lib/knowledge/gate/goldenPublishContract.ts` ·
  `api/cwf/_lib/knowledge/governance.ts` · `api/cwf/_lib/replay/pairedReplay.ts` ·
  `api/cwf/_lib/replay/groundingSlice.ts` · `api/cwf/_lib/replay/scopeSlice.ts` ·
  `api/admin/prompt-golden.ts` · `api/admin/eval-ci.ts` · `api/admin/golden-specimens.ts`.
  **`api/admin/replay.ts` is a LEGIT OPEN this phase** (first since REPLAY-A3) but ONLY for
  (i) the routing block accepting `preview` and (ii) the §3-G3 authorityDiff fold. The
  grounding and specimen blocks stay byte-identical (diff-scoped check: the only hunks in
  `replay.ts` touch the routing block and lines 332-338's fold).
- **C-C THE FLOOR IS SACRED.** `routeKeywordLayer`'s signature, `CATEGORIES`,
  `ALWAYS_INCLUDE`, `matchCategories`, `getToolsForCategories` are byte-untouched inside
  `toolCategories.ts` (the ONLY permitted diffs in that file are the `ToolCacheRepository`-
  facing learn/clear call sites if any signature ripple demands it — expected: NONE; the
  two-step upsert lives inside the repository). With an empty learned map and no drafts,
  `routeKeywordLayer` output is byte-identical to HEAD (floor test).
- **C-D GHOST-PUBLISH GUARD.** Every live-table curation mutation (publish/edit/delete/
  pin/unpin/revert/clear) flows through ONE repository seam `mutateAndBump` that performs
  the row write(s) + exactly ONE epoch bump + the audit row(s). The endpoint layer can
  NEVER call the row write and the bump separately. Test pin: **every curation action
  advances the epoch by exactly 1** (including a multi-keyword publish = ONE bump).
- **C-E PIN-CLOBBER GUARD.** `ToolCacheRepository.upsert` (the machine learn path) becomes
  two statements: `insert … on conflict do nothing` then
  `update … set categories, updated_at where keyword = ? and pinned = false`. A pinned row
  SURVIVES a learn attempt (tested with a fake/in-memory client asserting the emitted
  filters). The learn path writes NO audit rows (advisory cache, not governance).
- **C-F CLEAR PRESERVES PINNED.** `clearAll` deletes `where pinned = false` only; the
  clear action writes ONE `routing_audit` row (`action:'clear'`, `before:{deletedCount}`)
  and keeps the existing singleton `cleared_by/at` + epoch bump. RoutingTab copy updated to
  say pinned rows survive (matrix honesty).
- **C-G PREVIEW IDENTITY.** `@preview` resolves the CALLER's OWN drafts from the
  adminGuard context user id ONLY. A userId query/body param for preview is FORBIDDEN
  (impersonation door). Pure read: no writes, no tokens, no spans, no audit.
- **C-H DRAFT VALIDITY AT THE DOOR.** Draft PUT rejects with 422: (i) any category name
  not in `getAllCategories()` (re-checked at publish — code may have moved); (ii) any
  keyword that can never match — the learned-map lookup is per-extracted-word and
  `extractKeywords` drops words of length ≤ 2, so the keyword must be a single
  whitespace-free token, length ≥ 3, stored lowercase (a multi-word or 2-char draft would
  be a silent dead draft — reject it honestly instead).
- **C-I NO LLM IN CURATION.** `routerSelectCategories` and the `filterToolsByMessage`
  fallback are byte-untouched. No LLM call is reachable from any new endpoint.
- **C-J FK HONESTY (S33-1).** `routing_audit.actor_user_id` is `uuid references
  auth.users`, nullable; curation actors are humans → `ctx.userId`. No string sentinel
  ever.
- **C-K CAPABILITY-NOT-ROLE.** New cap `ROUTING_DRAFT` added to `PERMISSIONS` + the MAKER
  set (the `KIND_DRAFT` precedent, comment included). `ROUTING_EDIT_GLOBAL` (exists,
  checker-only via the super derivation — do NOT add it to the maker set) gates publish /
  live row-CRUD / pin / unpin / revert / audit read. `ROUTING_CACHE_CLEAR` unchanged.
  Every gate is `ensurePermission(...)`, never a role check.
- **C-L GRANT DISCIPLINE IN-PHASE.** `DB_TABLES` entries + `grantPolicy.TABLE_WRITE_MODEL`
  entries (`routing_drafts` = OWNER_CRUD, `routing_audit` = SERVER_ONLY) + `verifyGrants.ts
  PROBES` rows for BOTH new tables land in THIS diff (the coverage tests enforce it).
- **C-M C9 NAMES ONLY.** Lens/probe/audit responses carry keyword/category/tool NAMES,
  counts, and curation metadata — never tool-result payloads, never message content.
- **C-N No new secrets, no env changes, nothing printed.** Vercel serverless posture
  unchanged; the new endpoints are pure DB reads/writes — no OTel spans, no force-flush
  needed (RULE 27 applies only where spans are emitted).

## 3 · GATED SUB-PHASES (each gate = its listed evidence, in order)

### G1 — Migration + shared constants (the structural floor)

Create `supabase/migrations/20260710150000_l4_routing_drafts.sql` VERBATIM:

```sql
-- ============================================================================
-- Migration: L4 ROUTING-DRAFTS — pinned flag + personal draft store + curation ledger
--
-- (1) tool_category_cache.pinned: human curation the machine learn-path may not
--     overwrite (the two-step repository upsert guards it; clear deletes unpinned only).
-- (2) routing_drafts: the personal owner-RLS sandbox (kind_drafts precedent) — a
--     set/remove overlay on the learned map, never on the static code floor.
-- (3) routing_audit: append-only curation ledger (backend_trust_audit posture) —
--     service-role only; single-keyword point revert reads `before`.
-- Forward-only. Idempotent. AUTHORED by AG; applied ONLY by the Operator via db push.
-- ============================================================================

alter table public.tool_category_cache
    add column if not exists pinned boolean not null default false;

comment on column public.tool_category_cache.pinned is
    'L4: human-curated row — the machine learn path must not overwrite it; Clear preserves it.';

-- ── routing_drafts (owner sandbox) ──────────────────────────────────────────
create table if not exists public.routing_drafts (
    user_id    uuid not null references auth.users (id) on delete cascade,
    keyword    text not null,
    op         text not null check (op in ('set','remove')),
    categories text[],
    updated_at timestamptz not null default now(),
    primary key (user_id, keyword),
    constraint routing_drafts_op_categories check (
        (op = 'set'    and categories is not null and cardinality(categories) > 0)
     or (op = 'remove' and categories is null)
    )
);

comment on table public.routing_drafts is
    'L4 personal routing-draft sandbox: per-user set/remove overlay ops on the learned map. Owner-RLS; publish (super) promotes to tool_category_cache pinned=true.';

alter table public.routing_drafts enable row level security;

drop policy if exists routing_drafts_select_own on public.routing_drafts;
create policy routing_drafts_select_own on public.routing_drafts
    for select using (auth.uid() = user_id);
drop policy if exists routing_drafts_insert_own on public.routing_drafts;
create policy routing_drafts_insert_own on public.routing_drafts
    for insert with check (auth.uid() = user_id);
drop policy if exists routing_drafts_update_own on public.routing_drafts;
create policy routing_drafts_update_own on public.routing_drafts
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists routing_drafts_delete_own on public.routing_drafts;
create policy routing_drafts_delete_own on public.routing_drafts
    for delete using (auth.uid() = user_id);

-- owner-crud tier: revoke anon writes ONLY (authenticated keeps own-row writes).
revoke insert, update, delete, truncate on public.routing_drafts from anon;

-- ── routing_audit (append-only curation ledger) ─────────────────────────────
create table if not exists public.routing_audit (
    id            bigint generated always as identity primary key,
    actor_user_id uuid references auth.users (id) on delete set null,
    action        text not null check (action in ('pin','unpin','edit','delete','publish','revert','clear')),
    keyword       text,
    before        jsonb,
    after         jsonb,
    epoch_after   bigint not null,
    created_at    timestamptz not null default now()
);

comment on table public.routing_audit is
    'L4 append-only routing-curation ledger (human ops only; the machine learn path never writes here). Service-role only; point revert applies a row''s `before`.';

alter table public.routing_audit enable row level security;
-- ZERO policies on purpose → service role (RLS-exempt) is the only reader/writer.

-- server-only tier: privilege-layer defense-in-depth on top of zero policies.
revoke insert, update, delete, truncate on public.routing_audit from anon, authenticated;

-- ── PostgREST: reload schema cache ──────────────────────────────────────────
notify pgrst, 'reload schema';
```

Same commit: `shared/dbConstants.ts` gains `ROUTING_DRAFTS: 'routing_drafts'` +
`ROUTING_AUDIT: 'routing_audit'`; `shared/grantPolicy.ts` gains both entries with the
migration-citing comment (S30-1: cite `20260710150000_l4_routing_drafts` — it IS the
family's latest fix migration); `scripts/verifyGrants.ts` `PROBES` gains
`ROUTING_DRAFTS: { set: { keyword: '__p__' }, fcol: 'keyword', fval: '__nomatch__' }` and
`ROUTING_AUDIT: { set: { keyword: '__p__' }, fcol: 'keyword', fval: '__nomatch__' }`;
`shared/permissions.ts` gains `ROUTING_DRAFT: 'routing:draft'` with a KIND_DRAFT-precedent
comment + MAKER set membership. GATE: `npm run test` green (grantPolicy + permissions +
verifyGrants coverage tests all pass with the new rows).

### G2 — Repositories (the mutateAndBump seam)

- `ToolCacheRepository`: `getAll()` now selects `keyword, categories, pinned`
  (`ToolCacheRow` type extended — ripple through `types.ts`); `upsert` becomes the C-E
  two-step; `clearAll` becomes `delete … eq('pinned', false)` and RETURNS the deleted
  count (`select` on delete or a count read — your choice, tested).
- NEW `RoutingDraftsRepository` — mirror `KindDraftsRepository`'s client/auth pattern
  exactly (same seams, same owner-scoping): `listOwn(userId)`, `upsertOwn(userId, draft)`,
  `deleteOwn(userId, keyword)`.
- NEW `RoutingAuditRepository` — `append(rows)`, `listRecent(limit)`, `getById(id)`.
  Service client.
- NEW `RoutingCurationRepository` composing ToolCache + RoutingCacheMeta + RoutingAudit:
  the ONLY public mutation surface is
  `mutateAndBump(actorUserId, ops: CurationOp[]): Promise<{ epoch }>` where a `CurationOp`
  is `{ action, keyword?, write }` — it executes the row writes, bumps the epoch ONCE
  (reuse the meta repo's update path WITHOUT the clear; add a `bumpEpoch(actorId)` sibling
  to `bumpEpochAndClear` rather than duplicating), then appends one audit row per op with
  `epoch_after` = the new epoch, `before`/`after` = `{categories, pinned} | null`. Revert
  reads `getById(auditId).before` and issues the inverse as a `revert` op through the SAME
  seam. Clear routes through the seam too (its op carries `before:{deletedCount}`).
  GATE: unit tests — epoch +1 per action incl. multi-keyword publish; pin survives learn;
  clear preserves pinned; revert round-trip (edit → revert restores `before`, both
  audited).

### G3 — The lens: honest `@preview` + the authorityDiff fold

- `routingSlice.ts`: `ROUTING_SLICE_VERSIONS = ['floor','live','preview']`.
  `resolveRoutingLearnedMap` gains an explicit options arg for preview:
  `resolveRoutingLearnedMap('preview', { userId, draftsRepo? })` — types force the id
  (discriminated overload); floor/live call sites unchanged. Preview = live map, then the
  caller's drafts overlaid (`set` → put, `remove` → delete). Floor-on-failure posture
  unchanged (any failure → empty floor map). Update the header comment: the deferral note
  is now HISTORY — rewrite it to describe the draft store (do not leave a stale "no draft
  store exists" claim — doc honesty).
- `api/admin/replay.ts` routing block: accept `preview` (the imported
  `ROUTING_SLICE_VERSIONS` already drives validation — pass `ctx.userId` when
  version==='preview'). Response shape UNCHANGED (same keys; `version:'preview'`).
- **The standing micro-TD fold, due on this legit open:** replace the inline
  authorityDiff computation at `replay.ts:332-338` with a call to the existing
  `shared/authorityDiff` canonical home. The scope-lens response must stay BYTE-identical
  — existing REPLAY-A3 tests pin behavior; add one explicit response-shape assertion if
  none pins the diff keys today.
  GATE: routing-lens tests — preview overlay (set overrides, remove tombstones, caller
  isolation: user A's draft invisible to user B), floor survives both, `floor`/`live`
  arms byte-identical to HEAD fixtures; scope-lens tests green untouched.

### G4 — Endpoints

- NEW `api/admin/routing-drafts.ts` (gate `ROUTING_DRAFT`): GET own list · PUT upsert one
  `{keyword, op, categories?}` (C-H 422 validation; keyword normalized lowercase/trim) ·
  DELETE `?keyword=`. Mirror `kind-drafts.ts` structure.
- NEW `api/admin/routing-curation.ts`:
  - GET `?view=reference` → `getRoutingCategoryManifest()` (gate `PANEL_ACCESS` — code
    manifest, names only).
  - GET `?view=audit&limit=` → recent ledger rows (gate `ROUTING_EDIT_GLOBAL`).
  - POST `{action: 'publish'|'edit'|'delete'|'pin'|'unpin'|'revert', …}` (gate
    `ROUTING_EDIT_GLOBAL`) — ALL through `mutateAndBump`. `publish {keywords?}` consumes
    the CALLER's OWN drafts (all when omitted): `set` → live row `pinned=true`, `remove` →
    live row deleted; consumed drafts deleted; category names re-validated (C-H). `edit`
    sets `pinned=true` (a human edit left unpinned is a ghost edit). `revert {auditId}`
    applies `before`.
  - POST `{action:'probe', message, version}` (gate `REPLAY_LENS`) — resolve the slice at
    `version` (preview = caller identity per C-G), run `routeKeywordLayer`, return the
    `RoutingCoreResult` names only. Pure, zero tokens, no audit.
- `api/admin/routing-cache.ts`: GET mapping rows now include `pinned`; POST clear routes
  through the curation seam (C-F semantics + ledger row); response shape otherwise
  unchanged.
  GATE: endpoint tests — capability denials (maker denied curation POST 403, user denied
  drafts 403), 422 arms, publish consumes drafts + pins + one bump, probe never writes.

### G5 — UI (RULE 26)

`RoutingTab` → the four-column family panel: **Reference** (manifest: static categories +
ALWAYS_INCLUDE, read-only) | **Live** (rows + `pinned` chip; row actions
edit/delete/pin/unpin gated on `can(ROUTING_EDIT_GLOBAL)`) | **My Draft** (CRUD, gated
`can(ROUTING_DRAFT)`; publish / "request promotion" affordance per the burn rule —
publish button enabled only for `ROUTING_EDIT_GLOBAL` holders) | **Preview** (the probe
bench: message input + version chips floor/live/preview → matched categories + offered
names). Audit drawer (super) with point-revert buttons. ConfirmDialog on every mutating
action. Clear copy updated per C-F. `ReplayTab` routing lens version selector gains
`preview`. TR/EN strings per the existing `t(tr, en)` pattern.
GATE: RULE 26 rendered evidence — headless screenshots at 1280 AND 1024, nothing clipped;
component tests for gating (maker sees drafts, cannot see curation actions).

### G6 — Docs + reseal (two-commit seal)

Update `docs/ARCHITECTURE.md` + `docs/ROADMAP.md` (routing lifecycle section; migration
state = **"AUTHORED, Operator-pending"**), then the separate reseal commit:
`npm run reseal` + bump docVersion **rev 61 → 62** in `public/architecture/manifest.json`.
GATE: `npm run build` green END-TO-END (typecheck:api + gen:arch-facts + vite build +
check:doc-drift → drift [OK]).

## 4 · SELF-VERIFY (run ALL; paste literal outputs in the report)

```bash
npm run test                          # EXPECT green; report exact "N tests / M files" (must be > 1779)
npm run typecheck:api                 # EXPECT green
npm run build                         # EXPECT green incl. doc-drift [OK]
for f in api/cwf/_lib/adminGuard.ts api/cwf/_lib/knowledge/gate/goldenPublishContract.ts \
         api/cwf/_lib/knowledge/governance.ts api/cwf/_lib/replay/pairedReplay.ts \
         api/cwf/_lib/replay/groundingSlice.ts api/cwf/_lib/replay/scopeSlice.ts \
         api/admin/prompt-golden.ts api/admin/eval-ci.ts api/admin/golden-specimens.ts; do
  echo "== $f"; git diff d87fedd..HEAD -- "$f"; done   # EXPECT every diff EMPTY
git diff d87fedd..HEAD -- api/admin/replay.ts          # EXPECT hunks ONLY in the routing block + the 332-338 fold
git diff d87fedd..HEAD -- api/cwf/_lib/toolCategories.ts  # EXPECT empty (C-C; repository owns the learn change)
grep -rn "mutateAndBump" api/ shared/ src/ --include="*.ts" --include="*.tsx" | grep -v __tests__ | grep -v "\.test\."   # EXPECT: ONE definition + endpoint call sites only
grep -rn "ROUTING_SLICE_VERSIONS" api/ shared/ --include="*.ts" | grep -v __tests__       # EXPECT one definition home (routingSlice.ts) + imports
grep -c "routing_drafts\|routing_audit" scripts/verifyGrants.ts                            # EXPECT ≥ 2 (probe rows present)
```

Evidence gates (literal, in the report): the epoch-per-action test name + pass line · the
pin-survives-learn test name + pass line · clear-preserves-pinned test output · preview
caller-isolation test output · RULE 26 screenshot filenames at both widths · confirmation
in prose that the migration was AUTHORED ONLY and no DB write occurred.

## 5 · REPORT FORMAT

(1) Pre-flight literal outputs · (2) per-sub-phase gate evidence · (3) self-verify literal
outputs · (4) any deviation from this prompt DISCLOSED with rationale (deviations are
reviewed, not auto-rejected) · (5) branch name + tip commit hash, pushed. STOP — no merge
until Architect GO.

<!-- END · claude-code-PHASE-L4-routing-drafts-v1 · rev 1 · 2026-07-10 -->
