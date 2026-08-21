# PHASE SR1-W2 — Governed Proposals Loop + Router-Prompt Promotion (+F127.b ride-along)
<!-- claude-code-PHASE-SR1-W2-v1 · rev 1 · 2026-07-16 · Architect-authored against live master 4f756bb -->

## S47-1 PRECONDITION (binding)
Valid ONLY while `origin/master == 4f756bb` and no other phase PR is open against
mapped code. On mismatch: **STOP and report actual state** — do not adapt silently.
Reseal responsibility: this is the only in-flight phase; you own the reseal
(docVersion rev 102 → 103) in this branch. If master moves mid-flight, stop,
report, await rebase instruction.

## PLATINUM COMPLIANCE STATEMENT
Everything in this phase self-configures: the proposals table self-populates from
the router's own output (fire-and-forget), the router-prompt kind self-seeds via
the existing selfSeedReconciler, the daily summary is a machine cron, and the
code is safe BEFORE the migration is applied (table-absent ⇒ silent no-op,
fail-open — the MCP-WARM-1 pattern). The only human touchpoints are genuine
decisions: accepting/rejecting a proposal in the panel.

## CEREMONY PROFILE
**FULL** (migration + api/** + shared/** touch). CI (unsharded) is the merge
arbiter (S37-2); run the full suite unsharded once locally before push — a
sharded green is NOT the CI experiment.

---

## 0 · PRE-FLIGHT (hard gate — evidence in report)
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master          # MUST print 4f756bb…
npm ci --no-audit --no-fund --silent
npm run docs:drift                    # MUST print [OK] (verify exact script name from package.json first — S32-1)
```
Verify from `package.json` (grep, never guess — S32-1) the exact names for:
test run, drift gate, reseal. Branch: `sr1-w2` off master.

## 1 · CONTEXT (verified at authoring, 2026-07-16)
- Router core `api/cwf/_lib/semanticRouter.ts` is DARK (`router.enabled` floor 0).
  `routeSemantica` already returns `proposals: RouterProposal[]` — today they die
  in the `[Route]` log line (`toolCategories.ts:693`) and a span count attr.
- **L4 REUSE VERDICT (Architect, binding):** the `routing_drafts` TABLE is NOT
  the proposal store — it is a personal owner-RLS sandbox (PK `user_id+keyword`,
  op set/remove, no evidence fields); machine rows there would violate S33-1.
  What IS reused verbatim: `normalizeDraftKeyword` + `unknownCategoriesOf`
  (api/admin/routing-drafts.ts C-H helpers), the capability gates
  (`ROUTING_EDIT_GLOBAL`), and — for ACCEPT — the existing server-side governed
  publish core (`publishGovernedContentCore`) so an accepted keyword lands as a
  gated `armes.tool_category` publish, never a side-door write.
- Golden-gate scoping verified: `governance.ts:289` — golden publish contract is
  **prompt.segment ONLY**. The new `router.prompt` kind is therefore structurally
  outside the golden gate. 🧊 GOLDEN FREEZE untouched by construction.
- `ToolCategorySchema` (coreSchemas.ts): `{ name, keywords min(1), tools min(1),
  allowWrite? } .strict()` — no `description` yet. `buildRouterPrompt` already
  renders `c.description` from the catalog slice, and `stageTools` already passes
  the DB-first `resolveToolCategories()` slice → adding an optional `description`
  field makes DB enrichment flow to the router prompt with ZERO new plumbing.

## 2 · BINDING CONSTRAINTS
1. **Dark-launch equivalence preserved**: `routerPolicy` omitted ⇒ byte-identical
   behavior; the SR1-W1 equivalence test stays green UNCHANGED.
2. **Zero learned-map writes on the semantic path** stays true (SR1-W1 invariant).
3. **Turn path never blocks on proposals**: emission is fire-and-forget
   (`void promise.catch(log)`), bounded, and a missing table / DB outage is a
   silent no-op. Chat NEVER degrades for the proposals loop (RULE 27 spirit).
4. **No message content in LOGS** (C-M posture): the `[Route]`/cron lines carry
   keywords and counts only. The truncated `sample_query` lives ONLY in the DB
   row and the capability-gated panel — this is a CONSCIOUS, owner-approved
   evidence surface (query·count·seen), gated by `ROUTING_EDIT_GLOBAL`.
5. **S41-2 (no toolless keyword)**: ACCEPT terminates in a governed
   `armes.tool_category` publish whose schema already enforces `tools.min(1)` —
   a keyword can only be accepted INTO a category that binds tools. A proposal
   with no category suggestion forces the reviewer to pick one. There is no
   accept path that writes a bare keyword anywhere.
6. **Eval-gate unbypassable**: no gate engine/stage-order/interpreter change.
   `router.prompt` enters via additive kind registration + behavioral check
   (placeholder presence), the legitimate additive form.
7. **Secrets/grants standing rules**: new table gets the all-grantees revoke
   pattern (public + anon + authenticated explicitly), a `verifyGrants` probe
   row, and a CI coverage test. Service-role writes only; client reads only via
   the authed endpoint.
8. **RULE 34** (guard read AND write): proposal WRITE filters through
   `isLearnableKeyword` + `normalizeDraftKeyword` + drops keywords that already
   match the resolved catalog (published keywords or floor); the panel LIST read
   re-applies the stopword guard defensively.
9. **RULE 35**: no raw provider SDK calls under `turn/*` — nothing in this phase
   adds an LLM call anywhere.
10. **Code-before-migration safety**: every new DB consumer treats table-absent /
    error as no-op (write) or empty (read). The PR merges before the Operator
    applies the migration; that window must be safe by construction.
11. Migration file only — NEVER apply it (Operator lane, `db push`, ADR-005).
12. Every new/changed file header explains WHY (bible-grade). Merge `--no-ff`.

---

## 3 · GATED SUB-PHASES

### W2.a — Proposals persistence (migration + repository + emission)
**Migration `supabase/migrations/<ts>_router_proposals.sql`:**
```sql
create table public.router_proposals (
  keyword            text primary key,            -- normalized (lowercase, single token)
  suggested_category text,                        -- latest non-null model suggestion; may be null
  sample_query       text not null,               -- latest triggering user message, truncated 200 chars
  count              integer not null default 1,  -- dedupe = counter++
  first_seen         timestamptz not null default now(),
  last_seen          timestamptz not null default now(),
  status             text not null default 'pending'
                     check (status in ('pending','accepted','rejected')),
  resolved_by        uuid references auth.users,  -- NULL for machine writes (S33-1)
  resolved_at        timestamptz,
  resolution         jsonb                        -- {category, ruleVersion?} on accept; {reason?} on reject
);
alter table public.router_proposals enable row level security;
-- all-grantees revoke pattern (FIX-2 lesson): revoke ALL from PUBLIC, anon, authenticated explicitly.
-- No policies: service-role only. Clients reach it ONLY through the authed endpoint.
```
- `verifyGrants` probe row for `router_proposals` + CI coverage test (the
  standing pattern — cite the LATEST fix-migration's grant form, S30-1).
- **`RouterProposalsRepository`** (`api/cwf/_lib/persistence/repositories/`):
  `recordBatch(proposals: {keyword, category, sampleQuery}[])` — per-keyword
  upsert: on conflict `count = count + 1`, `last_seen = now()`,
  `sample_query = excluded.sample_query`, `suggested_category =
  coalesce(excluded.suggested_category, router_proposals.suggested_category)`;
  ONLY rows still `status='pending'` are re-counted (a rejected keyword
  re-proposed → new evidence should re-open it: flip rejected→pending on
  conflict when re-proposed, and say so in a comment — accepted stays terminal).
  `listPending()`, `resolve(keyword, status, userId|null, resolution)`.
  All methods swallow errors to a single `console.error` (fire-and-forget
  contract); table-absent (42P01) is DEBUG-silent.
- **Emission** in `toolCategories.ts` semantic branch only: after the `[Route]`
  line, `void recordProposals(…)` with: normalize via `normalizeDraftKeyword`,
  drop non-`isLearnableKeyword`, drop keywords already present in the resolved
  catalog's keywords (case-insensitive), truncate query to 200 chars. Zero
  awaits added to the turn path.

### W2.b — Panel list + accept/reject + daily summary
- **Endpoint `api/admin/router-proposals.ts`** (capability `ROUTING_EDIT_GLOBAL`,
  `authed` + `ensurePermission` — the routing-curation pattern):
  - `GET` → pending proposals (keyword, suggested_category, count, first/last
    seen, sample_query). Read-side stopword guard applied (RULE 34).
  - `POST {action:'reject', keyword}` → terminal flip + audit trail in
    `resolution` (born-loud, S41-1: log line `[RouteProposals] rejected …`).
  - `POST {action:'accept', keyword, category}` → SERVER composes the governed
    publish: read the current published `armes.tool_category` row for
    `category` (or its code-floor entry when no DB row exists — the
    stage-draft-from-floor pattern), append the keyword to `keywords`
    (idempotent — already-present ⇒ 409 honest refusal), submit through the
    EXISTING server-side gated publish path (same seam `api/admin/rules.ts`
    publish uses — reuse, do not fork). Only on gate success flip the proposal
    to accepted with `resolution={category, ruleVersion}`. Gate refusal
    propagates as the gate's own 422 (born-loud) and the proposal STAYS pending.
- **`RoutingTab.tsx` "Öneriler / Proposals" section** (Araç Eşleme panel):
  pending list with evidence columns (keyword · suggested category · count ·
  first/last seen · sample query), per-row Accept (category picker prefilled
  with the suggestion; options = resolved catalog names) and Reject. Empty
  state honest: "Öneri yok — router karanlıkta veya öneri üretmedi."
  Bilingual `t()` copy like the rest of the tab. RULE 26: nothing clips at
  1280/1024 (reuse the tab's existing layout primitives; no new layout system).
- **Daily summary cron**: new `vercel.json` cron `{"path":
  "/api/admin/route-proposals-summary", "schedule": "0 5 * * *"}` +
  `api/admin/route-proposals-summary.ts` with the CRON_SECRET machine-arm
  pattern COPIED from `backend-health.ts` (constant-time compare, 401 on
  missing/bad). Emits exactly ONE line ALWAYS (pending=0 included):
  `[RouteProposals] daily pending=N new_24h=M accepted_24h=A rejected_24h=R top=[kw1,kw2,kw3]`
  — keywords and counts only, never query content (constraint 4). Owner gets
  BOTH surfaces: panel = live list, log = daily line.

### W2.c — Router-prompt promotion to a governed kind
- `shared/dbConstants.ts`: `SYSTEM_LANE_KIND_IDS.ROUTER_PROMPT = 'router.prompt'`.
- `coreSchemas.ts`: `CORE_SCHEMA_REFS.ROUTER_PROMPT = 'RouterPrompt'` +
  `RouterPromptSchema = z.object({ template: z.string().min(1) }).strict()`
  with a `.refine` requiring ALL THREE placeholders `{{CATEGORIES}}`,
  `{{MAX_CATEGORIES}}`, `{{USER_MESSAGE}}` (the behavioral gate check — a
  template that can't be substituted is refused at the door, 422).
- `kinds.ts`: register the kind — system lane, CORE, locked, codeSchemaRef,
  fieldSpec mirror (follow the AGENT_PARAM/PROMPT_SEGMENT row form exactly).
- **Seed**: add to `SEED_DOMAINS` in `selfSeedReconciler.ts` a
  `system.router_prompt` domain with ONE instance whose `template` is
  `ROUTER_PROMPT_FLOOR` verbatim (decl-derived — import, never copy the
  string; the F81-guard pattern). Expected live line at next warm:
  `[Seed] domain=system.router_prompt rows=1` — document this in the report as
  the EXPECTED post-deploy line (not an X1 incident).
- **Resolver `api/cwf/_lib/knowledge/resolveRouterPrompt.ts`** — the
  resolveToolCategories contract verbatim: dedicated small fetch, NEVER throws,
  outage/unconfigured/missing/invalid ⇒ `ROUTER_PROMPT_FLOOR`, no module cache,
  returns `{ template, source: 'db'|'floor' }`.
- **Wiring**: `RouterPolicy` gains `promptTemplate: string`;
  `resolveRouterPolicy` callers unchanged — `stageTools.ts` resolves the
  template beside the policy and passes it down; `buildRouterPrompt` substitutes
  into the RESOLVED template. Floor behavior byte-identical: with no published
  row the substituted prompt is character-identical to today's — assert this in
  a test (floor-resolution ⇒ `buildRouterPrompt` output unchanged vs a pinned
  fixture).
- `ROUTER_PROMPT_FLOOR` stays exported and stays the outage floor forever
  (SR1-W1 header contract).

### W2.d — Category-description enrichment + F127.b copy fix
- `ToolCategorySchema` += `description: z.string().optional()` (additive;
  existing published rows without it still pass `.strict()`? — NO: `.strict()`
  rejects UNKNOWN keys, absent optional keys are fine; adding the key makes
  previously-refused description-carrying payloads now VALID — that is the
  enrichment path). Mirror the field into the kind's `fieldSpec` so the
  Rules/BULK-REVIEW panel renders an edit box for it (data op — no new
  endpoint). Confirm `resolveToolCategories` passes payloads through untyped
  enough that `description` flows (it maps to `ToolCategory`, which already has
  `description?` — verify, don't assume).
- **F127.b** `MCPSettingsTab.tsx` (BOTH forms — create ~:843-845/:1031 helper
  and edit ~:1022-1031): replace the helper text with (TR/EN via `t()`):
  - TR: "Bu sunucunun konuştuğu backend (veri). Boş bırakılırsa chat yolunda
    varsayılan (armes) kullanılır, ANCAK sunucu sağlık takibine ve mirror
    servise DAHİL EDİLMEZ — global sunucularda backend'i açıkça seçin."
  - EN: "The backend this server speaks (data). Blank still defaults to armes
    on the chat path, BUT the server is NOT health-tracked and NOT
    mirror-served — set it explicitly on global servers."
  Do NOT change the '' ⇒ armes chat-path behavior (by design — project
  instructions §1). Copy only.

---

## 4 · TESTS (minimum; extend where the suite's patterns demand)
- Repository: recordBatch upsert/counter++/re-open-rejected semantics;
  table-absent silence; resolve terminality (accepted never re-counts).
- Emission: semantic-path-only, stopword-dropped, catalog-known-dropped,
  fire-and-forget (no await in the turn path — assert via the existing
  turn-path purity/allowlist test style if one exists; otherwise a unit test on
  the emitter).
- Endpoint: capability gates (403 without ROUTING_EDIT_GLOBAL), accept happy
  path publishes through the gate (mock the seam), gate-refusal keeps pending,
  duplicate-keyword accept ⇒ 409, reject born-loud.
- Cron: 401 without CRON_SECRET; one summary line always (pending=0 case).
- Router prompt: schema refuses missing-placeholder template (422);
  floor-resolution ⇒ buildRouterPrompt output identical to pinned pre-phase
  fixture; DB-resolution substitutes the published template.
- SR1-W1 equivalence test UNCHANGED and green.
- `adminLegibility.test.ts` auto-gens 2 tests per admin .tsx — budget for it.
- verifyGrants probe coverage test for `router_proposals`.

## 5 · SELF-VERIFY (evidence in report, literal)
1. `git rev-parse origin/master` at start = `4f756bb…` (pasted).
2. Full suite UNSHARDED locally green once (count pasted; expect > 2623).
3. Drift gate `[OK]` after reseal to rev 103 (pasted).
4. `git diff --stat 4f756bb..HEAD` (pasted) — no frozen-surface files touched
   beyond the declared scope; eval-gate engine/stage-order/interpreter
   byte-identical (name-list the untouched gate files).
5. Migration file full text in the report (Operator applies later; G-gates and
   idempotence probe are the Operator prompt's job, not yours).
6. The three placeholders' refine demonstrated by a failing-then-passing test.
7. Statement: "no golden machinery touched; router.prompt publishes via the
   standard gate (governance.ts prompt.segment-only golden contract unmodified)".
8. Push branch `sr1-w2`, open PR, report CI status. Merge ONLY on Architect GO
   with the Architect-authored merge message (S30-2) — do not self-merge.

<!-- END · claude-code-PHASE-SR1-W2-v1 · rev 1 · 2026-07-16 -->
