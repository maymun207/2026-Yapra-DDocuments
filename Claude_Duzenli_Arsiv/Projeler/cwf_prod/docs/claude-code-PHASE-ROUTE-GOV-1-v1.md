# PHASE `ROUTE-GOV-1` — a tool's reachability stops being a redeploy

<!-- claude-code-PHASE-ROUTE-GOV-1-v1 · rev 1 · 2026-07-14 · Session 42.
     Author: Architect. Executor: AG (Claude Code / AntiGravity).
     Closes the ROOT of F78 (29 unreachable tools) and F91 (tool graph ≠ catalog).
     ANSWERS F80 (write-capable tools) — does not defer it.
     Batches: npm seed scripts (--env-file footgun), learned-map log-spam idempotence guard.
     Anchor: origin/master c5f58a4 · 2212 tests / 216 files · docVersion rev 73 · drift [OK].
     Ceremony: FULL. Touches api/**, shared/**, scripts/** ⇒ expect a reseal. NO migration
     (kinds are code-declared; instances are domain_rules rows — backend identity is DATA).
     CONTAINS OWNER STEPS (§6): a catalog snapshot BEFORE sub-phase B can gate, and a seed
     + draft-publish pass AFTER merge. -->

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

## 1 · WHY — the whole night, one chain

The owner asked one A3 question and the system failed him four ways. Every failure descends from one
line of architecture:

```
Wrong table under FIRINALT's heading (F82)
  → because getLineStopsReport was called 4× (once per line)
     → because the BATCH tool (getLineStopsReportForZones) was never offered to the model
        → because it is in no category — unreachable BY CONSTRUCTION (F78/F91)
           → because CATEGORIES is a static const in toolCategories.ts        ← THIS PHASE
```

We proved the dead-end experimentally tonight: a governed `tool_format_rule` steering the model to
the batch tool was published and **changed nothing** — the model cannot pick a tool it cannot see.
The learned map cannot rescue it either: `matchCategories` maps keywords to category **names**;
`getToolsForCategories` draws tools **only** from `CATEGORIES`. No rule, no cache clear, no learning
reaches an uncategorised tool. (S40 §4.1 — re-proven at a cost of four turns, again.)

Meanwhile the catalog is 141 tools; the categories cover ~112; **29 are unreachable**, and the
governance surface (tool graph) knows **4**. Two layers describing the same world, disagreeing
silently, with nothing checking — the same wound as S39/S40/F82, at the routing layer.

**This phase makes the category map a governed, versioned, auditable, panel-editable DATA object**
— exactly the DB-first / code-floor pattern every other knowledge object already follows. Adding a
tool to the agent's world becomes a published row, not a redeploy.

**Governed does not mean unguarded (constitutional):** every red→green move relocates its guard.
Reachability was enforced by a static array + RULE-31 CI; it moves INTO the eval-gate (§3.B). Write
exposure was enforced by nobody; it becomes an explicit, gated flag (§3.B — F80).

---

## 2 · BINDING CONSTRAINTS

1. **S39-2 / S37-2** — branch → PR (fires CI) → Architect's verbatim `--no-ff` merge; CI green on the
   PR head is the merge precondition. Sharded local green ≠ CI.
2. **DB-first / code-floor LAW, verbatim:** runtime SSOT = governed DB (`DbKnowledgeProvider`
   warm→read). The code `CATEGORIES` array plays exactly three roles: **seed**, **reset-to-reference
   target**, **outage floor**. Never code-primary with DB as overlay.
3. **Seed is byte-identical to today.** The seeded category rows must reproduce the current static
   `CATEGORIES` exactly — same names, same keywords, same tools, including the write-capable tools
   that are ALREADY offered today (behaviour-preserving; removing them is the owner's governed call
   later, from the panel, not this phase's silent decision).
4. **F80 — write exposure is explicit or absent:**
   - A new code reference `ARMES_WRITE_TOOLS: readonly string[]` (sub-phase A) names every
     write-capable catalog tool. Deterministic gate anchor — an explicit list, not a prefix regex.
   - The `armes.tool_category` payload gains `allowWrite?: boolean` (default false).
   - **Referential gate rule:** a category rule whose `tools` intersect `ARMES_WRITE_TOOLS` FAILS
     unless `allowWrite: true`. Seeded categories that already contain write tools are seeded with
     `allowWrite: true` — current behaviour preserved, and the exposure is **visible in the panel
     for the first time**.
   - A CI tripwire keeps the list honest: any SNAPSHOT tool name matching
     `^(create|update|delete|set|assign|start|stop|abort|confirm|post|put|save|add|remove)` that is
     NOT in `ARMES_WRITE_TOOLS` fails a test with the name printed (forces human classification;
     the heuristic lives in CI, never in the runtime gate).
5. **Eval-gate machinery untouched.** Staging ENGINE + STAGE ORDER + schema interpreter + existing
   backend paths stay byte-identical. New checks are **additive lines inside the existing ARMES
   referential dispatch** (the same pattern every ARMES kind already uses) + a new entry in
   `KIND_IDS` / `CORE_SCHEMA_REFS` / fieldSpec. Prove byte-identity of the engine files in §5.
6. **Replay determinism.** The routing replay lens must resolve the category slice **at the
   specimen's pinned version** (`rule_versions`); a specimen predating any category rows resolves to
   the code floor — which is exactly what it originally ran against, so old specimens stay correct
   **by construction**. State this as a test.
7. **C1 LAW** — zero writes to `messages`. **ADR-007** — no secret in any log/span/output.
   **S40-5** — new logging is bounded.
8. **No migration.** `armes.tool_category` is a `rule_kinds` row (seeded by script) + `domain_rules`
   instances. If you find yourself writing SQL under `supabase/`, stop — you have left the design.
9. **Scope discipline:** learning QUALITY (stop-words, semantic matching) is SEMANTIC-ROUTING-1,
   not here. The router fallback, ALWAYS_INCLUDE contents, and category *contents* beyond the seed
   are not touched.

---

## 3 · SUB-PHASES (gated — a sub-phase starts only when the prior one's tests are green)

### A · The catalog becomes a checked-in fact (snapshot + write classification)

The gate cannot validate "this tool exists" without a deterministic reference, and none exists in
code (`ARMES_REFERENCED_TOOLS` is a short domain list, not the catalog).

1. Ship `scripts/genArmesCatalogSnapshot.ts`: connects with the same client/config path
   `api/admin/mcp-catalog.ts` uses (reuse its listTools logic — extract a shared helper if needed,
   behaviour of the endpoint byte-identical), and writes
   `api/cwf/_lib/knowledge/backends/armes/catalogSnapshot.json`:
   `{ generatedAt, serverKey, tools: [{ name, description }] , count }`, names sorted.
   Env via `--env-file` (never dotenv imports). Add npm script `gen:armes-catalog`.
2. **OWNER GATE (§6.1):** AG STOPS after pushing sub-phase A and requests the owner run the script
   and hand back the JSON (paste or file). AG commits it verbatim. Nothing in B–D proceeds on a
   guessed catalog. **Do NOT fabricate or hand-type the snapshot.**
3. From the snapshot, author `ARMES_WRITE_TOOLS` in
   `api/cwf/_lib/knowledge/backends/armes/writeTools.ts` — every write-capable name, each with a
   one-line comment of what it mutates. Start from the prefix heuristic, then EYEBALL the remainder;
   list any ambiguous names in the §5 report for the Architect.
4. While in `toolCategories.ts` territory: make `learnToolMapping` **idempotent-silent** — if the
   in-memory mapping for the key is deep-equal to the incoming categories, skip both the log line
   and the upsert. (Tonight's log: the same 18 words re-learned on every tool round — hundreds of
   spam lines per turn. S40-5.)
5. Add the four npm seed scripts (kills the `--env-file` footgun permanently):
   `seed:rules`, `seed:agent-params`, `seed:prompt-segments`, `seed:providers` — each
   `node --import tsx --env-file=.env.local scripts/<file>.ts`.

**Gate A:** snapshot committed (141±, count asserted in a test against the file itself);
`ARMES_WRITE_TOOLS` present; CI tripwire test green; log-spam test (same key+cats twice → one log,
one upsert).

### B · The kind: `armes.tool_category` (CORE) + the guard relocation

1. Zod, `.strict()` (poison guard, like every CORE schema):
   ```ts
   export const ToolCategorySchema = z.object({
       name: z.string().min(1),
       keywords: z.array(z.string().min(1)).min(1),
       tools: z.array(z.string().min(1)).min(1),
       allowWrite: z.boolean().optional(),
   }).strict();
   ```
2. Register: `KIND_IDS.TOOL_CATEGORY = 'armes.tool_category'`, `CORE_SCHEMA_REFS`, fieldSpec (panel
   payload template + schema visibility come free in the Rules tab), kinds registry entry
   (CORE class — structure locked, instances owner-editable), seed rows in `referenceData.ts` from
   the static `CATEGORIES` (key = category name; **byte-identical mapping**, constraint 3).
3. **Referential stage — additive checks in the ARMES dispatch:**
   a. every `tools[]` name ∈ snapshot names ∪ ALWAYS_INCLUDE (typo guard; error names the tool);
   b. `tools[] ∩ ARMES_WRITE_TOOLS ≠ ∅ ⇒ allowWrite === true` (F80; error names the write tools);
   c. **RULE 31, relocated:** every `tool_graph_node.tool` in the candidate ∈
      `⋃ categories.tools ∪ ALWAYS_INCLUDE` — *declared ⇒ reachable* becomes a publish-time
      invariant on BOTH kinds (publishing a category that orphans a declared graph node fails;
      declaring a node no category offers fails).
4. RED-first tests, in this order, each pasted failing-then-passing:
   - the production failure: on the anchor, `getLineStopsReportForZones ∉ reachableToolNames()`;
     after a staged category amendment adds it, it IS reachable and IS in the offered set;
   - the F80 guard: staging `createRecipe` into a category without `allowWrite` → referential FAIL
     with the named error; with `allowWrite: true` → pass;
   - the typo guard: `getLineStopsReprot` → FAIL naming the unknown tool.

**Gate B:** the three RED-first tests green; existing gate suites byte-identically green.

### C · Runtime goes DB-first (warm→read, floor on outage, pinned in replay)

1. **Verify the order first (do not assume):** knowledge warm (stage 06) precedes tool selection
   (stage 07) on the turn path. Grep `stageStream`/`chat` and cite line numbers in §5. If routing
   ever runs pre-warm, STOP and report — do not reorder stages on your own authority.
2. `RoutingCoreInput` gains `categories: ReadonlyArray<ToolCategoryPayload>` (pure core stays pure;
   the module const becomes the DEFAULT/floor argument). `getToolsForCategories`,
   `reachableToolNames()`, and `routeKeywordLayer` resolve from the passed slice.
3. The turn path resolves the slice from the warmed knowledge provider (published
   `armes.tool_category` rows → payloads). Outage / zero rows ⇒ code floor. **No third state.**
4. Observability (S40-5, bounded): the existing `[ToolRoute]` line gains
   `catSource=db|floor catCount=N writeOffered=M`. The fingerprint needs NO new field — categories
   are rules, so `knowledge_hash` moves by construction; assert that in a test (publish a category
   → hash changes).
5. Replay: the routing lens resolves the category slice at the specimen's pinned rule versions;
   pre-category specimens → floor (constraint 6). Test both directions.
6. `reachableToolNames()` keeps serving RULE-31 CI on the **floor**; the LIVE half of the invariant
   now lives in the gate (§3.B.3c). State this split in a code comment where the CI test imports it.

**Gate C:** unsharded suite green; a live-shaped integration test proving: publish category v2 adding
a tool → next resolved offered set contains it **without** any module reload trickery (the provider
read path, not the const, is authoritative).

### D · The 29 stop being a mystery (uncovered-tools artifact + pre-staged read-only drafts)

1. Ship `scripts/genUncoveredToolsReport.ts` (pure, no network): snapshot names −
   (⋃ seed categories ∪ ALWAYS_INCLUDE) → prints a table: name · description ·
   read/write (per `ARMES_WRITE_TOOLS`) · proposed category. Commit the generated
   `docs/armes-uncovered-tools-v1.md`.
2. Propose the mapping yourself (AG) from names + descriptions — **read tools only**. Every write
   tool in the uncovered set is listed under a separate "OWNER DECISION REQUIRED — WRITE" heading
   and gets **no** proposed draft.
3. Extend `scripts/seedRules.ts` (or the dedicated seed this repo uses for ARMES rules — grep,
   don't guess) with an **idempotent draft-staging pass**: for each proposed read-tool assignment,
   stage a DRAFT amendment of the target category (status draft, NOT ready, NOT published), keyed so
   a re-run updates rather than duplicates (S31-1: second-run idempotence probe required). The owner
   publishes each from the panel — review-by-diff, not typing 29 names (automation-first).
4. `getLineStopsReportForZones` and `getScrapSummaryForZones` (read tools, tonight's actual gap) are
   in the proposed drafts, categories `linestop` / `quality`-or-`metrics` per description.

**Gate D:** report committed; seed re-run proof (two runs, second is a no-op); drafts visible via the
admin list endpoint in a test using the staged store.

---

## 4 · WHAT MUST NOT MOVE

- The offered set for every query, **before any new publish**: floor ≡ seed ≡ today. A
  characterization test locks this: for a fixed set of representative queries (the A3 sentence
  among them), `routeKeywordLayer(floor)` output is IDENTICAL pre/post phase.
- `ALWAYS_INCLUDE` contents. The router fallback path. The learned-map read semantics.
- The eval-gate engine, stage order, schema interpreter (constraint 5) — byte-identical.
- `tool_format_rule` / `tool_graph_node` behaviour except the ADDITIVE referential checks.
- Chat UX, panels beyond what fieldSpec gives the Rules tab for free.

---

## 5 · SELF-VERIFICATION (paste each, with evidence)

1. Anchor SHA · branch · PR URL.
2. `git diff --stat <anchor>..HEAD`; `git diff --name-only <anchor>..HEAD -- supabase` → **EMPTY**.
3. Gate-engine byte-identity: `git diff <anchor>..HEAD -- <engine files>` → empty (list the files).
4. The three §3.B RED-first tests: failing on anchor, passing on HEAD (paste both runs).
5. The §4 characterization test (offered-set identity on floor) — paste the query list.
6. Snapshot count test; write-tripwire test; ambiguous write-names list (may be empty).
7. Log-spam idempotence test. `[ToolRoute]` line sample from a local run.
8. knowledge_hash-moves test. Replay pinning tests (both directions).
9. Uncovered report: total, read-count (drafted), write-count (withheld, names listed).
10. `npx tsc -b` · `npm run typecheck:api` · UNSHARDED `npx vitest run` count vs anchor.
11. Drift: reseal performed, resulting docVersion rev.
12. **CI green on the PR head.**
13. One sentence confirming: no behaviour changes until the owner publishes — floor serves
    byte-identical routing on day one.

---

## 6 · OWNER STEPS (ordered — the Architect will re-issue these as click-level items)

1. **Mid-phase (after sub-phase A pushes):** run `npm run gen:armes-catalog` in your clone on the
   phase branch; hand the JSON output to AG. (~1 minute.)
2. **After merge:** `git pull` → `npm run seed:rules` (idempotent; publishes the kind + seed
   categories, stages the 29-minus-writes drafts). Paste the output.
3. **Panel:** Rules → ARMES → `armes.tool_category` — publish the pre-staged draft amendments you
   agree with (each shows a diff; the batch-tools drafts close tonight's A3 gap). Write-tool
   decisions: none required today; the withheld list is in the report for a future call.
4. Re-ask the A3 question (Gemini). Expected: `getLineStopsReportForZones` offered → single batch
   call → no ambiguity panels → per-line tables, each captioned (VIZ-BIND-1 + the already-published
   format rule finally biting).

---

## 7 · ACCEPTANCE

1. Publishing a category row changes the offered tool set on the next turn — **no deploy**.
2. A category referencing an unknown tool cannot be published (named error).
3. A write tool cannot enter a category silently (F80) — only via an explicit, audited
   `allowWrite: true`.
4. Declared ⇒ reachable holds at publish time on both sides (RULE 31 in the gate).
5. The A3 flow: batch tool offered, one call per tool, no ambiguity panels, honest per-line tables.
6. `[ToolRoute] … catSource=db …` visible in the Vercel log (Architect readable, S40-5).

## 8 · OUT OF SCOPE

SEMANTIC-ROUTING-1 (stop-words/embedding quality — F74). GATE-VISIBLE-1 (F88/F90 silent-reject UX).
F89 (golden budget). Write-tool PRODUCT policy (which writes the agent may ever perform — owner +
ARMES write-auth track). MCP-INVOKE-1. Superset activation. Panel niceties beyond fieldSpec.

<!-- END · claude-code-PHASE-ROUTE-GOV-1-v1 · rev 1 · 2026-07-14 -->
