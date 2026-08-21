# Claude Code — PHASE-OBS-1: Test Observability (no-redeploy cache clear + per-turn trace log)
**rev 1 · 2026-06-28 · target HEAD `9ca5833` (GOV-4) · canonical repo `cwf_yaprak`**

## Why this phase exists (read first)
The operating model is changing: **Claude (architect) builds the automation + observability; Maymun triggers a test; Claude reads the logs directly from Vercel and gives the verdict.** No more hand-built result tables, manual SQL, or log copy-pasting. The pending cold-cache test (does the relevance filter surface the canonical OEE tools on a *cold* cache, or only because months of testing warmed it?) currently requires Maymun to: empty Supabase by hand, redeploy to clear the in-memory map, then read scattered logs. **Every one of those manual steps is a missing tooling feature.** This phase builds the two that remove them:

- **A — No-redeploy "Clear Routing Cache".** Emptying the `tool_category_cache` table is not enough to cold the cache: a warm serverless instance keeps its in-memory `learnedMappings` Map and only reloads from Supabase on a cold start. So a clear must propagate to all warm instances **without a redeploy**, via a shared **epoch counter** the filter checks.
- **B — Structured per-turn trace log.** One greppable line per turn carrying a short `traceId` + the routing decision (path, provider, bypass, offered-count, and whether the canonical OEE tools made the offered set), so Claude pulls the whole turn from Vercel with `query=<traceId>` and reads the cold-cache verdict without a hand-built table.

**Relationship to the parked F-obs phase:** This is the *light bridge*, not the backbone. The full OTel → self-hosted Langfuse causal trace tree (memory) comes later. The `traceId` minted here is a deliberate first step toward F-obs's per-turn trace id. Do **not** pull in OTel/Langfuse here.

---

## PRE-FLIGHT GATE (hard — do not proceed until all pass)
1. `git rev-parse --short HEAD` == `9ca5833`. Working tree clean. If not, STOP and report.
2. `npm ci && npm run build && npx vitest run` — build green, all **376** tests pass. Record the count. If red before any change, STOP and report.
3. Read these before writing anything (this prompt names them; verify they still match):
   - `api/cwf/_lib/toolCategories.ts` — `filterToolsByMessage`, `matchCategories`, `routerSelectCategories`, `loadCacheFromSupabase`, `learnToolMapping`, module-level `learnedMappings`/`cacheLoaded`, `ALWAYS_INCLUDE`, and the `[ToolFilter]` log lines.
   - `api/cwf/_lib/persistence/repositories/ToolCacheRepository.ts` — `getAll`/`upsert` (you will add a clear + an epoch repo alongside).
   - `api/cwf/chat.ts` — handler entry (~L353), `conversationId`/`sessionId` resolve (~L380), the provider/bypass tool split (~L541–557: `provider === 'anthropic' || labActive?.routingBypass`), tool_call telemetry (~L581), stream log (~L705).
   - `shared/permissions.ts` — `PERMISSIONS`, `MAKER_PERMISSIONS`, `ROLE_PERMISSIONS`, `ALL_PERMISSIONS`.
   - `api/admin/reset.ts` + `api/cwf/_lib/adminGuard.ts` — the gated-endpoint pattern (`authed` → `ensurePermission` → service).
   - `src/components/admin/AdminPanel.tsx` (nav `Tab` union + `can(PERMISSIONS.X)` gating), `src/components/admin/adminUi.tsx` (`ConfirmDialog`), `src/components/admin/LabTab.tsx` (an existing diagnostic tab to mirror).
   - `shared/dbConstants.ts` (`DB_TABLES`) and `vercel.json` (`functions` block).

---

## HARD CONSTRAINTS (every sub-phase)
- **RULE 1 — no hardcoded values.** New table name, conflict target, TTL, and the canonical-metric tool-name list live in `shared/dbConstants.ts` / `shared/config` — never inline literals in logic or logs.
- **Secrets:** never read/write/print `.env*`, tokens, service-role keys, JWT secrets. The new trace log prints **only** names/counts/flags — **never tool args or tool results** (those can carry credentials per the project's standing warning). Reaffirm this in code comments at the log site.
- **Observe-only for B (critical trap):** the trace log REPORTS whether the canonical OEE tools are in the offered set. It MUST NOT add them to the set, reorder, or otherwise change `toDefs`/`filtered`. Changing the offered set here would pre-empt the very test this instruments (and is the *candidate fix*, decided separately by the test outcome). The filtered set for every existing path stays byte-identical.
- **Non-regression:** with the cache un-cleared and no lab flags, the ARMES-only and Anthropic tool sets are byte-identical to `9ca5833`. The only runtime additions on the hot path are (a) a throttled epoch read and (b) log lines. The eval-gate engine (`evalGate.ts`, `GATE_STAGES`, `runGate`) is **untouched**.
- **Matrix = enforcement, same commit.** A new permission appears in `PERMISSIONS`, in the role set(s) that should have it, AND is enforced at the endpoint in the same sub-phase. Never grant in the matrix what enforcement won't honor (the RBAC-1.1 lesson).
- **vercel.json:** the new endpoint needs **no** `functions` entry (default duration; the clear is fast). Do not add one. Do not delete or rename any `api/**` file referenced there (the GOV-1 unmatched-function-pattern lesson). If you must, grep `vercel.json` first.
- Each sub-phase ends green (`vitest run`) and is independently verifiable. No "kör birleştirme."

---

## OBS-1A — Epoch infrastructure (no UI; the load-bearing mechanism)
Goal: a shared epoch that lets any warm instance self-cold its in-memory cache **without a redeploy**.

1. **Migration** `supabase/migrations/<ts>_routing_cache_meta.sql` (owner applies live via the Supabase MCP — do NOT run it yourself; mark it for the owner):
   - Singleton table `routing_cache_meta`: `id boolean PRIMARY KEY DEFAULT true CHECK (id)`, `epoch bigint NOT NULL DEFAULT 0`, `cleared_at timestamptz`, `cleared_by uuid REFERENCES auth.users(id)`. Seed exactly one row `(true, 0, null, null)`.
   - RLS enabled; **server-only** writes (service role) — no anon/authenticated INSERT/UPDATE/DELETE (mirror the `tool_category_cache` privilege posture; add the REVOKEs to match `shared/grantPolicy.ts` `TABLE_WRITE_MODEL`, server-only tier). SELECT may stay server-only too (the filter reads via the service client).
2. `shared/dbConstants.ts`: add `DB_TABLES.ROUTING_CACHE_META = 'routing_cache_meta'`. Add config constant `ROUTING_CACHE_EPOCH_TTL_MS` (default `15000`) somewhere a server lib can import (config or dbConstants). Add `CANONICAL_METRIC_TOOLS = ['getOeeValuesForZones', 'getDailyOeeValues']` (used by B; observe-only).
3. **Repo** — extend `ToolCacheRepository` (or add a sibling `RoutingCacheMetaRepository` — your call, keep it typed + service-client + no-op-when-unconfigured like the existing repo):
   - `clearAll(): Promise<void>` — `DELETE` all rows from `tool_category_cache`.
   - `getEpoch(): Promise<number>` — read `routing_cache_meta.epoch` (0 when unconfigured).
   - `bumpEpochAndClear(actorId: string): Promise<{ epoch: number }>` — in one logical op: `clearAll()` + `UPDATE routing_cache_meta SET epoch = epoch + 1, cleared_at = now(), cleared_by = actorId` returning the new epoch. (Two statements are fine; no raw SQL string-building of identifiers.)
4. **`toolCategories.ts` — epoch-aware self-cold:**
   - Module-level `loadedEpoch = -1` and `lastEpochCheckMs = 0`.
   - `async function ensureFreshCache(): Promise<void>` called at the top of `filterToolsByMessage` (before `loadCacheFromSupabase`): if `Date.now() - lastEpochCheckMs >= ROUTING_CACHE_EPOCH_TTL_MS`, read `getEpoch()`; set `lastEpochCheckMs = now`; if `epoch > loadedEpoch`, **clear** `learnedMappings`, set `cacheLoaded = false` (so the existing `loadCacheFromSupabase` reloads the now-empty table), set `loadedEpoch = epoch`. Wrap in try/catch — an epoch-read failure must NEVER break the chat (degrade to "no change", same posture as the existing cache load).
   - Export `invalidateInMemoryCache()` (clears `learnedMappings` + `cacheLoaded=false` in the current instance) so the endpoint can also clear its own instance immediately. (The epoch handles the *other* warm instances.)
   - Do NOT change category matching, router, `ALWAYS_INCLUDE`, or the assembled `filtered` set.
5. **Tests** (`vitest`, fake/instanced repo): (a) bumping the epoch causes the next `filterToolsByMessage` (after TTL) to clear + reload an empty Map; (b) within the TTL window the epoch is NOT re-read (assert call count) so steady-state adds ~zero overhead; (c) a `getEpoch` throw degrades to "no change" and does not throw out of `filterToolsByMessage`; (d) with epoch unchanged, the filtered set is byte-identical to before.

## OBS-1B — Gated endpoint
1. `shared/permissions.ts`: add `ROUTING_CACHE_CLEAR: 'routing:cache:clear'`. Grant to `MAKER_PERMISSIONS` (power_user) **and** it is in `ALL_PERMISSIONS` (super_admin). Rationale (state in a comment): the routing cache is a **soft, self-healing, advisory** perf layer — not governed knowledge, not data, not user state — so a maker/tester clearing it is low-stakes and audited; this is exactly the "makers run tests" affordance. (Contrast: global *publish* stays super_admin.) Update `permissions.test.ts` accordingly (power_user + super_admin allow; plain user deny).
2. `api/admin/routing-cache.ts` (mirror `reset.ts`):
   - `GET` → `ensurePermission(ctx, ROUTING_CACHE_CLEAR)` → return `{ epoch, count, mappings: [{keyword, categories}] }` (view the learned cache; harmless, gated for tab access).
   - `POST` → `ensurePermission(ctx, ROUTING_CACHE_CLEAR)` → `bumpEpochAndClear(ctx.userId)` + `invalidateInMemoryCache()` → return `{ ok: true, epoch, clearedAt }`.
   - Non-permitted → 403 (via `ensurePermission`); wrong method → 405.
   - **No** `vercel.json` functions entry.
3. **Tests:** permitted POST bumps epoch + audits `cleared_by`/`cleared_at`; non-permitted → 403; GET returns mappings shape.

## OBS-1C — RoutingTab UI (capability-gated)
1. New `src/components/admin/RoutingTab.tsx`: shows the current epoch + learned mappings table (keyword → categories, from `GET`), and a **Clear Routing Cache** button gated `disabled={!can(PERMISSIONS.ROUTING_CACHE_CLEAR)}` wrapped in `ConfirmDialog` (copy: "Clears the learned tool-routing cache for ALL users; the next queries re-learn. This is a diagnostic/test action, not a governance change."). On success: toast + refresh the mappings + epoch.
2. `AdminPanel.tsx`: add `'routing'` to the `Tab` union; nav item `{ id: 'routing', label: t('Yönlendirme', 'Routing'), icon: <pick a lucide icon, e.g. Route/Network>, show: can(PERMISSIONS.ROUTING_CACHE_CLEAR) }`; render `{tab === 'routing' && can(PERMISSIONS.ROUTING_CACHE_CLEAR) && <RoutingTab lang={lang} />}`. Match the existing nav/body pattern exactly.
3. Light styling only — reuse the GOV-2 shadcn primitives + `.admin-theme` scoping; no new design tokens, WCAG-AA preserved.

## OBS-1D — Structured per-turn trace log (the read surface)
1. `filterToolsByMessage` return type: add `path: 'keyword' | 'router' | 'all-fallback'` (set it where each branch is decided). No behavior change; callers ignoring it are unaffected.
2. `api/cwf/chat.ts`:
   - At handler entry mint a short **per-turn** id: `const traceId = randomUUID().slice(0, 8);` (distinct from `conversationId`, which is per-conversation). 
   - Emit ONE structured decision line right after the tool split, e.g.
     `console.log(\`[trace=\${traceId}] [ToolRoute] provider=\${provider} bypass=\${bypassOn ? 'on' : 'off'} path=\${path} offered=\${toolDefs.length}/\${totalToolCount} canonicalOEE=\${canonicalPresence} categories=[\${cats.join(',')}]\`);\`
     where `canonicalPresence` is computed observe-only by checking `toolDefs` names against `CANONICAL_METRIC_TOOLS` → `present` (all) / `partial` (some) / `absent` (none). For the bypass branch, `path='all-fallback'`/`bypass=on` as appropriate.
   - Prefix the existing per-turn lines (`[CWF] Tool filter…`, `[CWF] Full tool set…`, `[CWF] Streaming via gateway…`) with `[trace=\${traceId}]` so the entire turn is greppable by the one id. Do not add args/results to any line.
   - (Optional, no schema change) include `traceId` in the existing tool_call telemetry payload metadata if it already carries a free-form object; if it requires a column, SKIP — logs are the read surface for this phase.
3. **Tests / proof:** a unit test asserting the `[ToolRoute]` line is composed with the right `canonicalPresence` for a given offered set; and capture one REAL line shape in the report (see checklist).

---

## SELF-VERIFICATION CHECKLIST (paste evidence, not assertions)
- [ ] Pre-flight: HEAD `9ca5833`, clean tree, **376** tests green pre-change (state the number).
- [ ] **No-redeploy proof (the point of the phase):** a test showing epoch-bump → next `filterToolsByMessage` (post-TTL) clears + reloads empty, WITHOUT re-instantiating the module (simulating a warm instance). Paste the test + run output.
- [ ] **Throttle proof:** within `ROUTING_CACHE_EPOCH_TTL_MS`, `getEpoch` is called ≤1×. Paste the assertion.
- [ ] **Degrade-safe:** `getEpoch`/`clearAll` throwing does not throw out of `filterToolsByMessage`. Paste the test.
- [ ] **Byte-identical non-regression:** with epoch unchanged + no lab flags, the assembled tool set for an ARMES-only query and for Anthropic is identical to baseline. Paste a diff/equality assertion. Confirm `git diff --stat 9ca5833 -- api/cwf/_lib/knowledge/gate` is empty.
- [ ] **Endpoint gated + audited:** POST as power_user and super_admin → 200 + epoch+1 + `cleared_by` set; as plain user → 403. Paste outputs.
- [ ] **Matrix=enforcement:** `permissions.test.ts` shows `ROUTING_CACHE_CLEAR` ∈ power_user + super_admin, ∉ user; endpoint enforces the same.
- [ ] **Observe-only:** show that `CANONICAL_METRIC_TOOLS` is read ONLY to compute the log flag — `git grep` proves it is not added to `ALWAYS_INCLUDE`, categories, or `filtered`.
- [ ] **Real trace line:** paste one actual `[trace=…] [ToolRoute] …` line from a local run (or a clearly-marked hand-constructed example matching the exact format), confirming it carries no args/results.
- [ ] **vercel.json:** unchanged; build's function-pattern check green; new endpoint resolves.
- [ ] Full suite green after all sub-phases (state the new count). UI: `/admin` Routing tab renders, button disabled for a role lacking the perm.
- [ ] **Owner action flagged (do NOT do it yourself):** the `routing_cache_meta` migration must be applied live via the Supabase MCP; the report tells Maymun to apply it and re-run the verify.

## OUT OF SCOPE (do not touch)
- Adding canonical tools to the offered set / any filter behavior change (that is the *candidate fix*, gated on the cold-cache test outcome — not this phase).
- OTel / Langfuse / the full F-obs causal trace tree (separate later phase).
- The full Tool Routing tab (per-category editing) — this phase ships view + clear only.
- Gemini Lite path divergence; viz-restore. Separate parked items.
```
```
After AG reports: Maymun applies the one migration via the Supabase MCP, then I (Claude) verify the diff against the repo AND read the deployed `[ToolRoute]` lines directly from Vercel. Then Maymun runs the cold-cache test one-click (Clear Routing Cache → OEE query, GPT-4.1, bypass OFF, ×3) and I read the verdict from the logs.
```
