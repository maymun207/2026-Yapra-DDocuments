# PHASE `ROUTE-GOV-1` v2_2 — a tool's reachability stops being a redeploy; the catalog stops being a guess

<!-- claude-code-PHASE-ROUTE-GOV-1-v2_2 · rev 2.2 · 2026-07-14 · Session 42.
     SUPERSEDES v2 (presented → immutable, S37-1) and v1. PR #33 (v1 sub-phase A) was CLOSED
     UNMERGED and its branch deleted via claude-code-ROUTE-GOV-1-CLEAN-RESET-v1 — do not
     cherry-pick from it. Branch name for THIS phase: `route-gov-2`.
     What changed v1→v2: the v1 design checked a catalog SNAPSHOT into code and used the owner as
     the transport for it. The owner rejected both — correctly. They violate the project's own laws
     ("backend identity is DATA"; automation-first). v2: the catalog is a SYSTEM-SYNCED Supabase
     mirror, per backend, generic for every MCP endpoint; human knowledge about tools is a governed
     OVERLAY (draft→gate→publish), never an edit of the observation.
     What changed v2→v2_2 (carried-forward FACTS from the discarded PR #33, verified at 980bdaa):
     (1) STAGE ORDER IS KNOWN: tool-selection (stage 7 `register-tools`) runs BEFORE knowledge-warm
     (stage 8 `assemble-prompt` / `dbKnowledgeProvider.warm()`). §3.C no longer asks you to verify
     an assumption — it specifies the committed design for that reality (a dedicated pre-stage-7
     category resolve, shaped like `resolveAgentParams`/`resolvePromptSegments`).
     (2) Three small items from the dead branch are re-implemented FRESH in §3.A (the
     `mcpCatalogFetch` helper extraction, the `learnToolMapping` idempotence fix, the npm seed
     aliases) — spec unchanged, code rewritten, no cherry-picks.
     Closes the ROOT of F78 (29 unreachable tools) and F91 (tool graph ≠ catalog). ANSWERS F80.
     Batches: npm seed scripts, learned-map log-spam guard.
     Anchor: origin/master c5f58a4 · 2212 tests / 216 files · docVersion rev 73 · drift [OK].
     Ceremony: FULL + OPERATOR LANE (one migration). Touches api/**, shared/**, src/**,
     supabase/migrations/** ⇒ reseal expected.
     OWNER STEPS exist only AFTER merge (§6) — no mid-phase human data transport. -->

---

## 0 · PRE-FLIGHT GATE

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master   # RECORD — expect c5f58a4; if moved, re-derive
npm ci --no-audit --no-fund --silent
npx tsc -b && npm run typecheck:api            # clean
npx tsx scripts/checkDocDrift.ts               # [OK] — RECORD the rev
npx vitest run --reporter=dot                  # RECORD count/files (UNSHARDED)
```

---

## 1 · WHY — the chain, and the architecture the owner corrected

```
Wrong table under FIRINALT's heading (F82)
  → because getLineStopsReport was called 4× (once per line)
     → because the BATCH tool (getLineStopsReportForZones) was never offered to the model
        → because it is in no category — unreachable BY CONSTRUCTION (F78/F91)
           → because CATEGORIES is a static const in toolCategories.ts        ← THIS PHASE
```

Proven experimentally: a governed `tool_format_rule` steering the model to the batch tool changed
**nothing** — a model cannot pick a tool it cannot see. The learned map cannot rescue it:
`matchCategories` maps keywords to category **names**; `getToolsForCategories` draws tools **only**
from `CATEGORIES`. (S40 §4.1, re-proven tonight.)

**The v2 correction (owner's):** the reference for "what tools does this backend actually have" is
not a code artifact and not a human's paste — it is a **system-synced mirror**: when a backend is
connected (and on demand), CWF calls `listTools()` itself, with the credentials it already holds,
and persists the catalog per backend in Supabase. Generic: ARMES today, Superset the same day, any
future MCP (the Kale procedure-RAG) for free.

**One boundary, load-bearing (ADR-001):** the mirror carries text from a semi-trusted external
system. It is therefore an **observation**, immutable by humans, and NEVER governed authority by
itself. Human knowledge about tools — exposure classification, notes, description overrides — lives
in a governed OVERLAY kind that passes the eval-gate like every other rule. Observation flows
freely; authority passes a human gate. (The same diff-and-approve boundary the memory-poisoning
literature demands of agent memory — F83 research, yesterday.)

**Governed does not mean unguarded:** reachability's guard relocates INTO the eval-gate; write
exposure's guard becomes **fail-closed** — an unclassified tool cannot enter any category at all.

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 / S37-2** — branch → PR (CI fires) → Architect's verbatim `--no-ff` merge; CI green on
   the PR head is the merge precondition. Sharded ≠ CI.
2. **DB-first / code-floor LAW** (categories): runtime SSOT = governed DB via the warmed provider;
   the code `CATEGORIES` array is exactly seed + reset-target + outage floor. Never code-primary.
3. **Seed is byte-identical to today.** Seeded category rows reproduce the static `CATEGORIES`
   exactly — names, keywords, tools — including write-capable tools already offered today
   (behaviour-preserving; removing them is the owner's later governed call, not this phase's
   silent one).
4. **Mirror vs overlay (the ADR-001 boundary):**
   - `backend_tools` rows are written ONLY by the sync path (service role). No admin endpoint
     mutates them. No human edit path exists. Rows are never DELETED by sync — a tool absent from
     live flips to `status='missing'` (**empty ≠ zero for catalogs**: disappearance is information).
   - All human knowledge about a tool is a governed rule (`armes.tool_annotation`), gated,
     versioned, auditable.
5. **F80 — fail-closed exposure:** a tool may enter a category only if a PUBLISHED (or same-candidate)
   annotation classifies it. `exposure:'read'` → free. `exposure:'write'` → the category must carry
   `allowWrite: true`. **No annotation → publish FAILS** naming the tool. Nothing reaches the
   offered set unclassified.
6. **Turn hot path never touches the mirror.** Chat latency and outage surface are unchanged: tools
   still come from the live MCP client at turn time, filtered by categories (DB-first per
   constraint 2). A grep-test asserts no mirror-repository import from the turn path.
7. **Eval-gate machinery untouched.** Engine, stage order, schema interpreter, existing backend
   paths byte-identical. New checks = additive lines in the ARMES referential dispatch + new
   KIND_IDS/CORE_SCHEMA_REFS/fieldSpec entries. **Stage functions stay PURE**: the publish endpoint
   assembles a `catalog: { names: Set<string>, exposure: Map<string,'read'|'write'> }` input and
   injects it; tests inject fixtures.
8. **Replay determinism:** the routing lens resolves the category slice at the specimen's pinned
   rule versions; pre-category specimens → code floor (exactly what they ran against — correct by
   construction). Test both directions. The mirror is not turn-consumed, so it needs no pinning.
9. **DB ceremony (standing rules):** migration applied ONLY by the Operator via `supabase db push`
   (AG writes the file, never applies). FIX-2 grant pattern (revoke from public, anon, AND
   authenticated). `verifyGrants` probe row + CI coverage test in-phase. S31-1 idempotence probe on
   seeds. C1 LAW. ADR-007. S40-5 bounded logging.
10. **Scope discipline:** learning quality (stop-words/semantics) = SEMANTIC-ROUTING-1, not here.
    Router fallback, ALWAYS_INCLUDE contents, category *contents* beyond seed: untouched. No cron.

---

## 3 · SUB-PHASES (gated — a sub-phase starts only when the prior one's tests are green)

### A · The mirror: `backend_tools` + sync (generic, per backend)

1. **Migration** `supabase/migrations/<ts>_backend_tools.sql`:
   ```sql
   create table if not exists public.backend_tools (
       id            uuid primary key default gen_random_uuid(),
       backend_id    text not null,          -- FK to the backends table's key column (GREP the
                                             -- actual column name/type — do not guess)
       tool_name     text not null,
       description   text,
       input_schema  jsonb,                  -- stored now; consumed by MCP-INVOKE-1 later
       first_seen_at timestamptz not null default now(),
       last_seen_at  timestamptz not null default now(),
       status        text not null default 'active' check (status in ('active','missing')),
       unique (backend_id, tool_name)
   );
   ```
   RLS deny-all; service-role access only through a repository. FIX-2 all-grantees revoke. A
   `verifyGrants` probe row + CI coverage test land in this same sub-phase (standing rule).
2. **Repository** `BackendToolsRepository` (persistence/index pattern): `upsertCatalog(backendId,
   tools[])` implementing the sync semantics — present → update description/schema/`last_seen_at`,
   `status='active'`; in-DB-but-absent-from-live → `status='missing'`; never delete. `listByBackend`.
3. **Sync service** (server-side): reuse the `listTools()` connection logic that
   `api/admin/mcp-catalog.ts` already has — extract a shared helper; the existing endpoint's
   behaviour stays byte-identical. `syncBackendCatalog(backendId)` → `{ total, active, missing,
   durationMs }`. Log ONE bounded line: `[CatalogSync] backend=armes tools=141 missing=0 ms=3556`.
4. **Triggers:**
   a. **Manual:** `POST /api/admin/backend-tools/sync` (admin capability check as the other admin
      endpoints do it — grep the pattern). Panel: a small "Kataloğu senkronize et" button in the
      MCP Explorer surface (it already renders the live catalog; the button belongs there), showing
      the returned counts.
   b. **On-connect:** after a successful MCP settings save/enable for a backend (grep where that
      completes server-side), fire the sync. **A sync failure never fails the settings save** — the
      save succeeds and the sync error is reported honestly in the response/UI, not swallowed.
   c. No cron (out of scope).
5. Read endpoint `GET /api/admin/backend-tools?backend=…` for the panel/staging (D).
6. While in `toolCategories.ts`: make `learnToolMapping` **idempotent-silent** (deep-equal mapping ⇒
   skip log + upsert; tonight's log had the same 18 words re-learned every round — S40-5), and add
   the four npm seed scripts: `seed:rules`, `seed:agent-params`, `seed:prompt-segments`,
   `seed:providers`, each `node --import tsx --env-file=.env.local scripts/<file>.ts`.
   *(These three items and the §3.A.3 helper extraction existed on the dead PR #33 branch —
   re-implement them FRESH from this spec; no cherry-picks, no diff-applies.)*

**Gate A:** migration file + grants tests green (staged/local harness as the repo's other grant
tests do it); sync semantics unit tests (upsert / missing-flip / never-delete / re-sync restores
`active`); endpoint role tests; on-connect hook unit test; log-spam idempotence test.

### B · The overlay + the guard relocation: `armes.tool_annotation` + gate anchored to the mirror

1. Kind `armes.tool_annotation` (CORE), key = tool name:
   ```ts
   export const ToolAnnotationSchema = z.object({
       tool: z.string().min(1),
       exposure: z.enum(['read', 'write']),
       note: z.string().optional(),
   }).strict();
   ```
   Register in KIND_IDS / CORE_SCHEMA_REFS / fieldSpec / kinds registry.
2. Kind `armes.tool_category` (CORE), key = category name — schema as v1:
   `{ name, keywords: string[≥1], tools: string[≥1], allowWrite?: boolean } .strict()`.
   Seed rows in `referenceData.ts` byte-identical to today's `CATEGORIES` (constraint 3); the
   categories that already contain write tools are seeded `allowWrite: true` — current behaviour
   preserved and the exposure VISIBLE in the panel for the first time.
3. **Seed annotations** for every tool currently in any category: exposure per the write list you
   derive (prefix heuristic + eyeball; ambiguous names listed for the Architect in §5). These seeds
   make the fail-closed rule (constraint 5) hold on day one without changing behaviour.
4. **Referential stage — additive checks in the ARMES dispatch** (pure; catalog injected per
   constraint 7):
   a. `tool_category.tools[]` ⊆ mirror names ∪ ALWAYS_INCLUDE — else fail naming the tool
      (typo guard). Mirror EMPTY for the backend → fail `catalog not synced for 'armes' — sync
      first` (honest, actionable; never a silent pass).
   b. exposure per tool from annotations (candidate ∪ published): unclassified → FAIL naming it;
      `write` → category must carry `allowWrite: true` (F80).
   c. `tool_annotation.tool` ∈ mirror names (any status — classifying a temporarily-missing tool is
      legal; annotating a never-seen name is a typo).
   d. **RULE 31 relocated, both directions:** every `tool_graph_node.tool` ∈
      `⋃ categories.tools ∪ ALWAYS_INCLUDE` — publishing a category that orphans a declared node
      fails; declaring a node no category offers fails.
   e. The gate verdict `detail` records `{ catalogCount, catalogHash }` it checked against
      (auditability of the decision's evidence).
5. **RED-first tests** (paste failing-on-anchor → passing):
   - the production failure: `getLineStopsReportForZones ∉ reachableToolNames()` on the anchor;
     after a staged category amendment (with its read annotation) adds it → reachable and offered;
   - fail-closed: staging an unannotated tool into a category → FAIL naming it;
   - F80: `createRecipe` (annotated write) into a category without `allowWrite` → FAIL; with
     `allowWrite: true` → pass;
   - typo: `getLineStopsReprot` → FAIL naming the unknown tool;
   - unsynced mirror → FAIL with the sync message.

**Gate B:** the five RED-first tests green; existing gate suites byte-identically green.

### C · Runtime goes DB-first (stage order is KNOWN — design for it)

1. **KNOWN FACT (verified in the discarded PR #33 at 980bdaa — do not re-derive):** tool-selection
   (stage 7 `register-tools`) runs BEFORE knowledge-warm (stage 8 `assemble-prompt` /
   `dbKnowledgeProvider.warm()`). The category slice therefore CANNOT piggyback the stage-8 warm.
   **Committed design:** a dedicated pre-stage-7 resolve — `resolveToolCategories()` — with the
   SAME shape as `resolveAgentParams` / `resolvePromptSegments` (grep both; mirror their
   published-row read, code-floor fallback, and fingerprint-capture feed). Do NOT reorder stages;
   do NOT introduce a second warm of the full provider — ONE bounded read for this kind's published
   rows, feeding the same capture the fingerprint hashes (the §C.4 hash test is the arbiter that
   coverage holds by construction).
2. `RoutingCoreInput` gains `categories` (pure core; module const becomes the floor default).
   `getToolsForCategories`, `reachableToolNames()`, `routeKeywordLayer` resolve from the passed
   slice.
3. The turn path calls `resolveToolCategories()` pre-stage-7 (published `armes.tool_category` rows).
   Outage / zero rows ⇒ code floor. No third state.
4. `[ToolRoute]` gains `catSource=db|floor catCount=N writeOffered=M` (S40-5). No new fingerprint
   field — categories are rules, `knowledge_hash` moves by construction; assert with a test.
5. Replay pinning per constraint 8 — test both directions.
6. `reachableToolNames()` keeps serving RULE-31 CI on the **floor**; the live half now lives in the
   gate (§3.B.4d). One code comment where the CI test imports it, stating the split.

**Gate C:** unsharded suite green; an integration test proving publish-category-v2 → next resolved
offered set contains the new tool with **no** module-reload trickery.

### D · The 29 stop being a mystery — staged from the mirror, reviewed in the panel

1. `POST /api/admin/backend-tools/stage-drafts` (admin capability): computes
   `uncovered = mirror.active − (⋃ published categories ∪ ALWAYS_INCLUDE)` and stages, idempotently
   (S31-1 — second run updates, never duplicates):
   - a DRAFT `tool_annotation` for **every** uncovered tool — exposure from your proposed
     classification (write-pattern names → `write`, rest → `read`; the proposal constant lives in
     code, is consumed only by this stager, and decides nothing by itself — drafts are the object);
   - a DRAFT category amendment adding each **read**-classified tool to its proposed category
     (your mapping from mirror names + descriptions).
   Returns `{ annotationsStaged, categoryDraftsStaged, writeWithheld: string[] }`.
2. Panel: a "Kapsanmayan araçlar için taslak oluştur" button next to the sync button, rendering the
   returned counts + the withheld-writes list. The owner then reviews **diffs in the Rules tab** and
   publishes — review-by-diff, not typing 29 names.
3. `getLineStopsReportForZones` and `getScrapSummaryForZones` (tonight's actual gap) must be in the
   proposed read mapping (`linestop`, and `metrics`-or-`quality` per its description).

**Gate D:** endpoint tests over fixture mirror+rules (uncovered math, idempotence, role check);
withheld-writes list correctness test.

---

## 4 · WHAT MUST NOT MOVE

- The offered set for every query **before any new publish**: floor ≡ seed ≡ today. Lock with a
  characterization test over a fixed query list (the A3 sentence among them):
  `routeKeywordLayer(floor)` output IDENTICAL pre/post phase.
- `ALWAYS_INCLUDE` contents; router fallback; learned-map read semantics.
- Eval-gate engine / stage order / schema interpreter — byte-identical (list files, empty diff).
- `api/admin/mcp-catalog.ts` endpoint behaviour (helper extraction only).
- Turn-path latency profile: no mirror read on the hot path (grep-test, constraint 6).
- Chat UX; panels beyond fieldSpec + the two small buttons (§3.A.4a, §3.D.2).

---

## 5 · SELF-VERIFICATION (paste each, with evidence)

1. Anchor SHA · branch · PR URL.
2. `git diff --stat <anchor>..HEAD`; `git diff --name-only <anchor>..HEAD -- supabase` → exactly ONE
   new migration file.
3. Gate-engine byte-identity: `git diff <anchor>..HEAD -- <engine files>` → empty (list files).
4. The five §3.B RED-first tests: anchor-fail run + HEAD-pass run pasted.
5. §4 characterization test (offered-set identity on floor) — paste the query list.
6. Sync semantics tests; grants/verifyGrants coverage test; probe-row diff.
7. Ambiguous write-classification names for Architect review (may be empty).
8. Log-spam idempotence test; sample `[ToolRoute]` and `[CatalogSync]` lines from a local run.
9. knowledge_hash-moves test; replay pinning tests (both directions); the no-mirror-on-turn-path
   grep-test; the `resolveToolCategories` site (file:line) + proof of ONE bounded read per turn
   (no duplicate provider warm — cite the log/span evidence from a local run).
10. `npx tsc -b` · `npm run typecheck:api` · UNSHARDED `npx vitest run` count vs anchor.
11. Drift: reseal performed, resulting docVersion rev.
12. **CI green on the PR head.**
13. One sentence confirming: zero behaviour change until the owner syncs + publishes — the floor
    serves byte-identical routing on day one, and the migration alone changes nothing.

---

## 6 · OWNER STEPS (all AFTER merge — the Architect will re-issue click-level, in order)

1. **Operator (Gemini, FENCE header):** apply the migration via `supabase db push` — the Architect
   authors the fenced Operator prompt at merge time (AG never applies).
2. `git pull` → `npm run seed:rules` (kind rows + seed categories + seed annotations; idempotent —
   paste the output).
3. Panel → MCP Explorer → ARMES → **"Kataloğu senkronize et"** (counts should read ~141 / 0 missing).
4. Panel → **"Kapsanmayan araçlar için taslak oluştur"** → review the diffs in Rules → publish the
   annotations + the read-tool category drafts you agree with. Write-withheld list: no action
   required today.
5. Re-ask the A3 question (Gemini). Expected: batch tool offered → one call per tool → no ambiguity
   panels → per-line tables, each captioned (VIZ-BIND-1 + the already-published format rule finally
   biting).

---

## 7 · ACCEPTANCE

1. Connecting/syncing a backend materialises its catalog in the panel — for ANY MCP backend, no code.
2. Publishing a category row changes the offered tool set on the next turn — no deploy.
3. An unknown tool cannot be published into a category (named error); an unsynced backend says so.
4. An UNCLASSIFIED tool cannot enter a category (fail-closed); a WRITE tool only via explicit,
   audited `allowWrite: true` (F80).
5. Declared ⇒ reachable holds at publish time, both directions (RULE 31 in the gate).
6. The A3 flow: batch tool offered, single calls, honest per-line tables.
7. `[ToolRoute] … catSource=db …` and `[CatalogSync] …` readable in the Vercel log (S40-5).

## 8 · OUT OF SCOPE

SEMANTIC-ROUTING-1 (F74). GATE-VISIBLE-1 (F88/F90). F89 (golden budget). Write-tool PRODUCT policy
(which writes the agent may EVER perform — owner + ARMES write-auth track; this phase only makes
exposure explicit and gated). MCP-INVOKE-1 (the stored `input_schema` waits for it). Superset
activation. Periodic sync. Description OVERRIDE injection into prompts (the annotation kind carries
`note` only; overriding what the model sees is a separate, deliberate phase).

<!-- END · claude-code-PHASE-ROUTE-GOV-1-v2_2 · rev 2.2 · 2026-07-14 -->
