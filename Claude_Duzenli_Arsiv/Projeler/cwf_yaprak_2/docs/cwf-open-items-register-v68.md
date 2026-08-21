# CWF — Open Items Register · v68
<!-- cwf-open-items-register-v68 · 2026-07-28 · S67 close. Supersedes v67.
     S63-2: SELF-SUFFICIENT — every OPEN item carries its full wording here;
     pointers only to terminal-marked items and LIVE documents. v60–v67 archive. -->

## VERIFIED FLOOR (v68 / S67 close)
- `origin/master` = **`0d540c9d4742ee3da6e2cd1eb13d7a9fe5b58ba6`** · **rev 150**
  (docVersion UNCHANGED — no manifest-mapped area was touched; see F190)
- **362 test files / 3957 tests** · drift `[OK]` · zero pending migrations
- **59 migrations** — unchanged this session; **no migration was written or
  applied in S67**
- Merge commit verified by the Architect from a fresh clone: two parents
  (`088b2a5e` + `5308980`), no squash, merge message byte-identical to the
  Architect-authored text (S30-2)
- Post-merge master CI read directly from the GitHub API by the Architect:
  run `30309516863`, `conclusion=success`, all jobs green including
  `eval-canary` (which was `skipped` on the PR)
- `docs/adr/` now holds **10** files; the three landed ADR blobs hash to
  `8f65998e…` / `cb2f49dd…` / `0a3e3640…`, byte-identical to the Architect's
  authored payload and unchanged through every falsification run

**Governed live state (verified this session — do NOT re-infer):**
- `router.frameRouting` = **0** · `router.frameEnabled` = 1
- `synthetic.activeSetId` = **`33cd8365-3c8d-4602-9158-5e5e29cc1b46`**
  (**question-set-v3**, 9 utterances) — **day-1 population is complete**: 500
  injections between `00:01:04Z` and `01:39:19Z` on 2026-07-28, 493 with a
  recorded frame
- `backend_entity_layers` = **3 rows** (armes: `factory`/FACTORY/`getFactoryList`
  zero-arg · `line`/LINE/`getFactoryLines` zero-arg · `equipment`/EQUIPMENT/
  `getEntities` fan-out, `cadence_class='slow'`)
- `entity_registry` = **17 factory active** · **779 line active** ·
  **equipment 0/0, `present=false`**
- `entityAliasIndexSize` = **5**, `entityAliasSource` = **`db`** (NOT the code
  floor — every `entity-unresolved` count below is against published rows)
- `factory_registry` = 17 active/17 (drop deferred to B5)
- `armes.entity_alias` = 5 rows · `armes.zone` = 4 rows (both untouched — F184)
- `tool_category_cache` = 19 rows (F185 evidence, unchanged this session)
- `backend_tools` (superset) = **26 rows**: 22 gateway-inner + 4 entry, count
  reconciled against `count(*)` in both directions
- Published `domain_rules`: armes `tool_annotation` **141** / `tool_category`
  **12**; superset **0 / 0** — both kinds exist and are EMPTY

## 0 · CARRY-DIFF PROOF — v67 → v68
**Closed this session (live evidence, S63-1):** F190 (merged + CI-arbitrated +
gate re-verified on merged master).
**Decided this session (not closed — the decision itself is the outcome):**
F194 — `static_args` DEFERRED, with a stronger reason than "no evidence"; see §5.
**Partially closed:** F175 (entity half, measured) · F176 (mechanism confirmed in
CI, not just locally).
**Carried unchanged (full wording in §5):** F129 · F177 · F178 · F179 · F180 ·
F171-B · F153 · F158 · F160 · F164 · F165 · F166 · F172 · F184 · F186 · F188 ·
F189 · F195 · F-PROVIDER · F-BW11/12/13.
**Updated wording (full text in §5):** F185 (design note now exists) · F187
(design note v1_2, per-tool diff computed) · F191 (second site, LATENT) ·
F196 (upgraded on measured data) · F197 (four riders).
**New:** F198 · F199.
**Numbering disclosure carried: F192 and F193 were never assigned.** Deliberate
gaps, left rather than renumbered — `f187` and `f194` are frozen as tag strings
inside the live `synthetic_question_sets` v3 row and quoted in permanent merge
commits.
**Delivered:** 1 merged phase (F190 + FIX-1) · the v3 BASELINE · F187 design note
v1_1 → v1_2 · F185 design note v1 · the per-tool Superset dump · zero migrations.

## 1 · WHAT S67 WAS
**"THE BASELINE SESSION."** One phase merged, zero migrations, and the number
the whole queue was waiting on. S67 also spent most of its evidence budget on
instruments rather than features — which was the correct allocation, because
three separate instruments turned out to be lying by omission.

Order of events: floor verified at `088b2a5e` → pre-flight lens sweep (3490
frames, 58 min) → F190 authored, reviewed, FIX-1'd, merged → per-tool Superset
dump → v3 canary → **v3 baseline** → F185 design note.

## 2b · THE v3 BASELINE — the headline, and its limit
**`shortCircuitRate` = 33.27 %** (per-frame, n=493) · **33.33 %** (per-utterance,
n=9) · **ALT_D = 0**.

ALT_D is zero because v3 is class-A-only — verified independently by the
Architect against the corpus document: all nine utterances are `QUERY_*` or
`COMPARE`, none is COMMAND. Therefore `shortCircuitRate ≡ highRate` for this set
and **v3 is structurally free of the HIGH→ALT_D unmasking that inflated
gapfill-v1's apparent −49.7pp improvement.** That was the whole point of building
a standalone corpus, and it now holds as a measured fact.

`frameStability`: 9 utterances, `unstableShapes: 0`, `unstableOutcomes: 0` —
every utterance produced ONE frame shape and ONE outcome across ~55 injections.
**This baseline is deterministic, not an average over noise.**

**The per-utterance map (the real deliverable — the block rate is the least
informative number in the report).** Reconstructed by the Architect from the four
cause counts and the per-idx frame counts; the assignment is unique because
`unstableOutcomes` is 0, and it reconciles exactly (107+222+110+54 = 493;
110+54 = 164 = 33.27 %):

| idx | utterance | frames | outcome | cause |
|---|---|---|---|---|
| 0 | R1 · KB7 **3 günlük** fırın duruşları | 55 | LOW | **clean** |
| 5 | R6 · KB7 pişmiş stokta hangi işler | 52 | LOW | **clean** |
| 1 | R2 · Granit doğalgaz grafiği, **7 gün için** | 56 | LOW | time-unclear |
| 2 | R3 · **dün akşam 4-12 vardiyasında** sırlama 3-4-5 | 56 | LOW | time-unclear |
| 4 | R5 · **Dün** KB7 barkodsuz üretim | 55 | LOW | time-unclear |
| 7 | R8 · **Son 1 haftalık** kamera performansları | 55 | LOW | time-unclear |
| 3 | R4 · **10100000** sicil nolu çalışan | 55 | **HIGH** | entity-unresolved |
| 6 | R7 · **1596497** nolu iş emri | 55 | **HIGH** | entity-unresolved |
| 8 | R9 · Granit Ham stokta arabalar | 54 | **HIGH** | ambiguous |

**THE LIMIT, stated before the number is ever quoted:** the three PRE-REGISTERED
known-failing utterances (idx 1 = f187, idx 2 = f175, idx 7 = f194) did **not**
block, and the three that blocked were **not** pre-registered. Zero overlap. This
is not a contradiction — the two measure different stages. Pre-registration says
*the system cannot ANSWER this*; the lens says *the gate ASKS instead of
answering*. All three known failures are DOWNSTREAM of this gate. **Therefore
33.27 % measures the gate only and is not a proxy for end-to-end success, and
must never be quoted as one.**

**Carried caveat, load-bearing here:** all 500 injections land 00:01–01:39Z, so
every time-dependent frame was evaluated at ONE clock position (~01:00Z). With
`time-unclear` at 222 of 493 frames and 4 of 9 utterances, this baseline must
never be read as a general statement about the gate's time handling. Equally
true of v1/v2/gapfill, so comparability holds.

## 2 · 🧊 GOLDEN FREEZE — engaged, unchanged. Lifts at B5.

## 3 · THE S66 RESULT — carried unchanged, as the reference for v1/gapfill
Superseded as the session headline by §2b, but retained because it is still the
only before/after this project owns for those two corpora.
> **Clean number: question-set-v1 block rate 82.5 % → 36.2 %, −46.3 points,
> n = 600 = 600.** That set contains no COMMAND frames, so ALT_D cannot fire and
> HIGH ≡ short-circuit; re-labelling is structurally impossible.
>
> **The number that must NEVER be quoted alone:** gapfill shows HIGH 87.4 % →
> 37.7 % (−49.7pp), but **roughly half of that is re-labelling** — the gate
> checks `entity-unresolved` BEFORE the COMMAND branch, so resolving the entity
> does not answer the turn, it EXPOSES a different refusal. Honest figure:
> short-circuit **−24.6pp**.

**S67 re-measured both from the same pre-flight sweep and they reproduced
EXACTLY** — question-set-v1 36.2 % (n=600), gapfill-v1 62.8 % (n=1854). Nothing
behavioural had merged, so stability was the expected outcome; it is recorded
because it also retired an Architect hypothesis (§7).

## 4 · BOARD-WALK — F-BW01-10 CLOSED · **F-BW11/12/13 OPEN**
Unchanged from v66. Wording loss disclosed at v65 stands; carried OPEN by name,
re-homed to **B5 or an early-B3 batch**. Recovery: one owner distillation turn in
`cwf_prod`, or re-derivation during the re-homed batch walk.

## 5 · FINDINGS — full wording, every open item

### New this session

- **F184 · OPEN — behavioral qualifiers are OBSERVED, not authored.** The 4
  `armes.zone` rows carry two different kinds of content. Inventory (`name`,
  `line`) grows with the world and discovery replaces it. But `hasBarcode:false`,
  `scrapVisible:false` and the IKINCILUST note (\"Fire/scrap ARMES'te görünmez;
  fire kırılımı yapısal olarak yoktur\") are **not discoverable from any list
  call** — they are knowledge about the backend's BEHAVIOR. Deleting them with
  the inventory half would silently destroy an **empty≠zero guard**:
  `scrapVisible:false` is what stops IKINCILUST's absent scrap data from being
  reported as a real zero. Owner-ratified split: F183 replaced the inventory half
  only; the qualifier half is carried, not deleted, and belongs in the ADR-010
  earned-trust lane (machine-proposed + human-ratified, not hand-authored
  forever). **Retiring `armes.zone` wholesale remains out of scope until this
  lands.**

- **F185 · OPEN (HIGH; DESIGN NOW EXISTS) — the learning path has no guard and
  no brake.** Design note **`cwf-f185-learning-guard-design-v1`** (S67) is the
  live document; it is written from code read at `0d540c9`, not from this
  summary, and it adds three things this entry did not have: the exclusion
  problem splits three ways (function words stay in code; TIME words defer to
  `resolve_time_range`; ENTITY names defer to the discovered `entity_registry`);
  the guard must use the RESOLVER's normalization or it misses exactly the
  inflected forms users type; and there are **three** write points, not two —
  the third being the curation accept path (`RoutingCurationRepository.ts:165`)
  which writes `pinned:true` while bulk clear removes unpinned rows only
  (`:183`), so **a human accepting a contaminated proposal creates a row Clear
  can never remove.** Diagnosis added: `ROUTING_STOPWORDS`
  (`toolCategories.ts:507`) is a hand-authored ~90-word list whose own comments
  record three separate *"observed production-leak top-up"* blocks — it grows
  with the WORLD, which is the ADR-009 degree test failing one layer above the
  zone table.
  Two halves, both needed:
  (a) **Guard.** `tool_category_cache` learns entity names and time words as
  domain signal. Observed keys: `granit` · `ganit` · `garnit` · `granik` ·
  `glazur1` · `glazur3` · `sırlama` · `3-4-5` (entities) and `dün` · `akşam` ·
  `gece` · `4-12` · `vardiyasında` · `geçen` (time). Proof the entity class is
  incoherent: `glazur1 → [material]` while `glazur3 → [metrics, production,
  andon, factory, machine]` — sibling lines, wholly different routing, differing
  only by which question each first appeared in. The correct exclusion sources
  now EXIST: `entity_registry` (779 rows, from F183) for entities, and the
  existing deterministic `resolve_time_range` for time words. The guard must sit
  on **BOTH** write points — `learnToolMapping` (stageTools) **and**
  `recordRouteProposals` (`toolCategories.ts:1017`), because accepting a proposal
  publishes with `pinned:true` and is then immune to Clear.
  (b) **Brake.** There is **no governed switch that stops learning.** The 23
  agent params are `agent.*`, `quota.*`, `router.{contextTurns, enabled,
  frameEnabled, frameRouting, maxCategories, timeoutMs}`, `synthetic.*`. The only
  candidate, `router.enabled=false`, points the WRONG WAY — `toolCategories.ts:881`
  says that path falls back to the keyword/learned map, i.e. leans on it harder.
  Proposed `router.learnEnabled` (seed 1), structure in code, value governed.
  **Measured evidence for both halves:** the cache was cleared to 2 pinned rows
  this session and had regrown to **19** within hours; 17 keys came back inside
  ~10 minutes, `granit` landing in a **third** distinct category set.
  **M-C cannot run without (b)** — without a freeze the arms contaminate each
  other, which is exactly what happened in the S66 A/B (see F-PROVIDER below).

- **F186 · OPEN (low) — the tokenizer leaks Turkish suffix fragments into the
  learned map.** Observed keys include `nin` · `sini` · `lar` · `larin` · `lere` ·
  `deki` · `icin` · `mısın` · `ayni` · `yada` · `(entity)` · `jafta` · `you` ·
  `your` · `empty` · `list?` · `table` · `number`. `nin` is a suffix fragment,
  not a word — most plausibly bleeding from a `Granit'in` → `["granit","in"]`
  split. These cannot carry category signal. Also unverified: the loader reports
  \"7 stopword/legacy rows ignored\" while the rows remain in the table. Small,
  and it compounds F185.

- **F187 · OPEN (design note v1_2 — BUILD-READY, nothing owed before the phase) — Superset is a
  DATA source, not a rendering surface.** Owner ruling: when we ask Superset's
  MCP to \"generate a chart\", Superset renders it **inside its own application**
  and hands back a URL. The remedy is therefore durable — it holds even after
  Superset fixes its bugs. Evidence: `generate_chart`'s success envelope is
  `explore_url` / `embed_code` / `form_data_key` / `api_endpoints`, every field a
  reference INTO Superset; its own description says \"Create a chart preview **in
  Superset**… LLM clients MUST display returned chart URL\".
  **The structural finding:** Superset's 22 inner tools are **never offered** —
  the model discovers them via `search_tools` and invokes them as an argument to
  `call_tool`. `generate_chart` is therefore not a tool in our catalog, it is a
  **string in a payload**, and no annotation/category/exposure rule can touch it.
  Exactly two reach points exist: the `search_tools` RESULT (what the model learns
  exists) and the `call_tool` PRE-FLIGHT (what it may invoke). **This generalizes
  to every gateway backend; Superset is only the first.**
  **§6 precondition RESOLVED by Operator read:** all 22 inner rows carry
  `annotations` + `tags` + `parameters_hint`; **zero** carry a real schema
  (`properties`/`type`). Tags: `mutate` 8 · `discovery` 6 · `core` 4 · `data` 2 ·
  `explore` 2. **`explore` is precisely the foreign-surface signal**
  (`generate_explore_link`, `open_sql_lab_with_context`). So D1 (\"disposition is
  discovered first\") SURVIVES. Design note `cwf-f187-superset-data-not-render-
  design-v1` needs a v1_1 amendment recording this, then a phase.
  Triage (owner-approved): **DATA — keep:** `get_chart_data` (preferred — the
  numbers behind a chart Kale has already curated) · `execute_sql` ·
  `list_datasets` · `list_charts` · `list_dashboards` · `list_databases` ·
  `get_dataset_info` · `get_chart_info` · `get_dashboard_info` ·
  `get_database_info` · `get_schema`. **Foreign surface — deny:**
  `generate_chart` · `generate_explore_link` · `generate_dashboard` ·
  `add_chart_to_existing_dashboard` · `create_virtual_dataset` · `save_sql_query` ·
  `update_chart` · `update_chart_preview` · `get_chart_preview` ·
  `open_sql_lab_with_context`.
  Design decisions: enforcement in a **new fail-CLOSED sibling**, never inside
  F155's deliberately fail-OPEN `gatewayPreflight.ts` · filter the model-facing
  `search_tools` copy but **never the trace** · the denial message carries the
  redirect (freeze-safe; a prompt segment would need a publish) · charts render
  through CWF's own viz layer. **Named risk, unverified:** the gateway flattens
  every inner tool to `call_tool`, so the chart binder's `{tool, callId, match}`
  resolution under flattening has never been observed working.
  **Cost evidence:** one 05:02Z turn burned **15 tool rounds / 306 388 input
  tokens** cycling payload shapes for tools that could never succeed, and the
  chart the user asked for **already existed in Superset** (ids 85 and 80) but
  behind `http://0.0.0.0:8080/...` URLs (F153).
  **`execute_sql` ruling:** stays in the DATA column despite declaring
  `destructiveHint: true`, but gains a deterministic read-only statement check
  (must start `SELECT`/`WITH`, no second statement). It is the only free-form data
  path and is proven to work; `get_database_info` returns `allow_dml` and should
  be READ, not assumed.

- **F188 · OPEN (SECURITY) — gateway inner tools bypass write governance, and the
  counter lies about it.** `execute_sql` declares `tags:["mutate"]`,
  `readOnlyHint:false`, **`destructiveHint:true`**. Eight of the 22 Superset inner
  tools are `mutate`; three are `destructiveHint:true` (`execute_sql`,
  `update_chart`, `update_chart_preview`). ARMES's flat catalog governs write
  exposure (`tool_annotation exposure=write` + category `allowWrite` + F80
  fail-closed); **the gateway inner tools have no equivalent**, because they are
  `call_tool` arguments and pass through no gate. Worse, every such turn logs
  `writeOffered=0` — the safety counter reports zero because it **cannot see
  them**, not because none were offered. That is a **false negative in a safety
  counter**, i.e. an `empty≠zero` violation in the governance layer itself.
  Enforcement point is shared with F187's `gatewayPolicy`; the telemetry-honesty
  fix is separate (`stageTools.ts:312`).

- **F189 · OPEN — gateway inner tools are called BLIND.** `catalogSync.ts:125`
  builds gateway rows' `input_schema` as `{parameters_hint?, annotations?, tags?}`
  — never a real JSON Schema. Operator confirmed: 22 of 22 rows have no
  `properties`/`type`; 21 of 22 have `parameters_hint: "request"` — one word. So
  the model guesses argument shapes. This is the fourth cause of the 05:02Z
  collapse (the five `generate_chart` attempts were not random — the model was
  reverse-engineering the schema from validation errors: `chart_type missing` →
  `x and y missing` → `validation_system_error` with empty details). It also
  affects the tools we KEEP: `execute_sql` works because the model guessed
  `{request:{database_id, sql}}` correctly. Superset's own
  `get_chart_type_schema` suggests richer schemas are retrievable.

- **F191 · OPEN (low, LATENT NOT ACTIVE — second site found S67) — genericity
  holds at the producer, not the consumer.** Second site: `stageClarify.ts:315`
  calls `resolveToolCategories()` for EVERY COMMAND frame, and that resolver
  reads `getPublishedRules(['armes'])` by literal
  (`knowledge/resolveToolCategories.ts:52`) — so a turn bound for superset has
  its write-exposure decision made against armes' governance. **The practical
  effect today is NIL and this is why it is not escalated:** G4 shows superset
  has ZERO published `tool_annotation` and `tool_category` rows, so there is
  nothing the armes-scoped read is failing to see. It becomes ACTIVE the moment
  superset publishes its first row of either kind — which F187/D6 makes possible.
  The new discovery modules carry zero per-backend literals (grep-verified). But
  `stageClarify.ts:94` still reads `ENTITY_ALIAS_BACKEND_ID = 'armes'` — verified
  **pre-existing** (line 77 on master before the phase), so a carried boundary,
  not a regression. Consequence: when a second backend gets descriptor rows, the
  clarify stage will not see it. ADR-009's genericity test is applied to the
  producer today; it must also be applied to the consumer.

- **F194 · DECIDED at S67 — `static_args` / equipment discovery is DEFERRED, and
  the reason is stronger than "no evidence found".** The probe (v3 idx 7 = R8,
  "Son 1 haftalık KB7 X hattının kamera performanslarını incele") was designed to
  answer *do EQUIPMENT references appear in blocked frames?* It answered a
  different and more useful question: **EQUIPMENT never appears in the frame at
  all.** idx 7 frames as `object: QUALITY`, so descriptor scoping never reaches
  the EQUIPMENT layer — a question literally about cameras on a line does not
  route there. Consequence: the empty layer is **not** the binding constraint on
  this turn, and building `static_args` now would populate a layer that the frame
  extractor never points at. The bottleneck is UPSTREAM of the registry — it is
  the frame's object taxonomy, not the mirror's contents. **The real next
  question is why "kamera performansları" derives QUALITY**, which is an IR /
  extraction question, not a discovery one.
  **Unchanged mechanics, for whenever it does run:** `getEntities` declares two
  required params (`factoryId`, `showAll`) and the descriptor models only the
  parent; a `static_args jsonb` column would carry the rest. **F198 binds it:**
  pagination lands BEFORE equipment discovery, never after.
  **Note under ADR-010:** `getEntities`'s declaration contradicts ITSELF —
  `required:["showAll"]` while the description says "(optional, default true)".
- **F195 · PARTIALLY CLOSED — an empty discovery result must say WHY.** Shipped
  in FIX-1: six distinct reasons, so \"the backend refused\" and \"the parser could
  not read it\" are now distinguishable. Carried open only as a principle to apply
  elsewhere: a failure wearing the costume of a designed skip is the S65-3 class.

- **F196 · OPEN (RAISED in S67 on measured data; schedule it before M-C) — the
  e2e suite is RED on master and non-deterministic.** New evidence, read by the
  Architect directly from the GitHub API rather than reported: of the 8 master
  runs preceding `0d540c9`, **4 concluded `failure`** (`97efc8f4`, `9095f147`,
  `8db9577c`, `1ec1858d`) on code already merged; three of those show `rule26`
  among their failed jobs. **So master's `rule26` signal is roughly 50 % noise.**
  F190 — a docs-only PR that cannot reach the e2e surface — still cost three
  separate rounds of evidence-gathering to merge past it. Every future merge pays
  that tax, and M-C will need several. Methodology note recorded while checking:
  a run-level `conclusion` can disagree with its current job conclusions after a
  job re-run, so run-level counts are indicative, not exact. AG's
  decisive experiment: 3 failed / 37 passed on its branch, and **3 failed / 37
  passed on a clean master worktree with none of its changes**, with the failing
  panes rotating every run (branch: MCP Settings+Tweak; master: Providers+MCP
  Settings; CI: Replay). A real regression fails the same test every time.
  Consequence: **`rule26` currently cannot distinguish a regression from noise —
  a gate that is not a gate**, the S65-3 class in CI form. Supersedes and absorbs
  F176's escalation; F176's Vite/oxc sub-cause remains the best mechanism lead.

- **F197 · OPEN (four riders now; still one small lens touch) — `shortCircuitRate`
  becomes the reported headline for any set containing COMMAND frames**, with
  `highRate` and the ALT_D split reported beside it as diagnosis. See **S66-4**
  for the rule and §3 for the evidence.

  **The four riders, all one class — the lens's `n` is a filtered subset and the
  filter hides failures:**
  1. **Effective limit must be printed.** `--limit` is silently clamped at
     `CLARIFICATION_LENS_MAX_LIMIT = 5000` (`clarificationLens.ts:99`); a value
     the operator supplied and the tool ignored is a silent divergence. At v3's
     500 runs/day the 5000 ceiling fills in ~10 days, after which baseline
     comparisons must be windowed with `--since` — document that before it bites.
  2. **ALT_D needs a two-way cause split.** One label
     (`command-no-write-exposure`) collapses two different exits: the static
     matrix returning `null` (`deriveCategories.ts:133`), which never reads
     governed rows at all, and a resolved category with no write exposure. Those
     are different defects — taxonomy coverage vs authorization — and today no
     run can tell them apart.
  3. **The organic bucket's predicate must be stated in the report.** The lens
     queried 90 telemetry rows where a direct SQL count found 121 with a frame
     key; `truncated` was false, so it is a filter difference, not truncation.
     Nobody may read the organic bucket as "all organic frames" until the
     predicate is printed beside it.
  4. **Injected-vs-framed must be disclosed per set.** The loader takes
     `frame_recorded = true` rows only, so v3's day-1 report says `n = 493` for a
     population of **500 injections** — and the 7 it cannot see are exactly the
     turns where something went wrong. The omission is biased in the worst
     direction.

- **F198 · OPEN (HIGH — gates equipment discovery) — unpaginated reads truncate
  silently, and the first table it will bite is the entity mirror.** The
  persistence layer holds **34 `.select()` calls with neither `.range()` nor
  `.limit()` nor any truncation signal**. Triage uses ADR-009's own degree test:
  tables that grow with the INTEGRATION (backends, rule_kinds, providers,
  secrets) are bounded and safe; tables that grow with the WORLD or with TIME are
  not. Three load-bearing sites:
  **(a) `EntityRegistryRepository.ts:163` — the worst.** The post-upsert snapshot
  inside `syncLayer` that decides which rows flip to `missing`. It has no
  `.order()`, so a truncated window is ARBITRARY and non-reproducible. Truncated,
  rows the backend no longer reports stay `active` forever — the mirror asserting
  something the backend never said (ADR-001's exact target).
  **(b) `EntityRegistryRepository.ts:82/99`** — `listByBackendLayer` /
  `listByBackend` on the resolve path. Truncated, candidates silently vanish and
  the gate asks about entities that exist. Safe direction, silent failure.
  **(c) `SyntheticRunsRepository.ts:88` = `tokensSpentToday()`** — the spend
  guard. Correct today at 500 rows/day (200 000 ÷ 400); raise the ceiling past
  400 000 and it under-counts and NEVER STOPS — a money-spending guard failing in
  the expensive direction. Also `BackendToolsRepository.ts:90/158` (~163 rows
  today, and Path B's stated target is literally "1000+ federated tools"), plus
  `ReplayAuditRepository.ts:135` · `RouterProposalsRepository.ts:83` ·
  `ToolCacheRepository.ts:37` · `GoldenRunsRepository.ts:190`.
  **Not exploding today:** `entity_registry` = 796 active rows.
  **What explodes it:** equipment discovery across 17 factories (see F194).
  **Honest limit (TOTAL-45):** the cap value of 1000 is a CLAIM from Architect
  tooling notes, not verified for this project; an Operator read settles it. The
  action is identical either way — with a cap the read truncates silently,
  without one we load a world-scaled table unbounded.
  **Remedy is not new engineering:** `clarificationLens.ts:269`'s `fetchAllPages`
  already does range-based paging with an id tiebreaker and an explicit
  `truncated` flag. **The measuring instrument obeys the law; the production path
  does not.** Site (a) must also gain an `.order()`.
  **Test (S66-1):** a structural gate in the `migrationFnLockdown.test.ts` mould
  — no repository read of a world/time-scaled table passes without `.range(` or
  `.limit(` — with a floor assertion (a scan finding zero files FAILS) and a
  positive-control fixture.

- **F199 · OPEN (cheap, high honesty value) — an EMPTY layer is invisible to the
  gate.** `backend_entity_layers` records that armes' `equipment` layer is
  `present=false` with 0/0 rows. The clarification gate never reads that
  descriptor. So the system cannot say "I have no equipment inventory"; it passes
  the turn through and fails downstream, opaquely. This is an `empty ≠ zero`
  violation at the gate boundary, in a codebase whose first law is that a missing
  thing and an empty thing are different statements. It is also **far cheaper
  than equipment discovery**, and it is the honest response to F194's deferral:
  if we are not going to fill the layer, the system must at least stop pretending
  it might be there.

- **F-PROVIDER · OPEN (investigation, → M-C) — the model A/B was confounded and
  cannot conclude what it looks like it concludes.** Full record in
  `cwf-provider-arm-asymmetry-findings-v1`. Sonnet received **145** tools on every
  turn via `stageTools.ts:213` (`ctx.isAnthropic || labActive?.routingBypass` →
  full sorted set, a documented prompt-cache decision); gemini and openai received
  **14–74** via semantic filtering. The experiment varied model AND action-space
  size. Four further causes: the filter's founding premise (\"helps weak models
  navigate ~140 tools\") is **falsifiable and the first evidence goes against it**
  — at 14 tools the weak model chose a current-state tool for a historical
  question while the 145-tool model chose correctly; the runs **mutated their own
  instrument** (F185); backend defects punish weak models disproportionately
  (`getShiftNotes` failed 3× consecutively, `list_charts` intermittently — sonnet
  absorbed them, gemini stopped); and attractive-nuisance tool shapes
  (`getEmployeesDetail({})` returned **6809** rows). **M-C design:** 2×3
  {gemini · openai · sonnet} × {filtered · bypass} — `labActive.routingBypass`
  already gives non-Anthropic arms the full set, so it is a flag, not a build.
  Two preconditions: **freeze learning** (F185b) and **record offered-tool count
  per turn**. M-C answers a second question for free: *does the relevance filter
  help or hurt weak models?* — a load-bearing architectural assumption never
  measured. Sequence: **F183 → F187 → M-C** (chart questions in the set would
  otherwise measure Superset's surface mismatch, not the models).

### Carried — unchanged wording from v66
- **F129 · OPEN (REDUCED)** — Recall@k unnamed; M-B run owed.
  `quota.routerAbRunTokenCeiling` IS governed (`agentParams.ts:330`) and the
  replay endpoint accepts `mode:'router-ab'` — both landed in IR-1 rev 118.
  Remaining: name Recall@k (`scoreRouterAbCoverage` already computes it) and RUN
  the per-arm baseline on **toolful** recorded specimens — NOT the frame-only
  synthetic corpus (`routerAbLens.ts:84` returns coverage=1 when
  `calledToolNames.length===0`, a trivial pass). Guardian: offered-set WIDTH.
- **F175 · OPEN — DESIGN-APPROVED@v1_3; build gated by §8.** The clarification
  catch-all. Gate runs AFTER the pipeline and BEFORE the model
  (`chat.ts:188→241→268`); fires on `entity_ref.length>0 && resolvable===0`.
  Remedy = A23 v1_3: ⑤ diagnosis (τ/β → LINK/NIL/AMBIGUOUS) · ⑥ execution
  decision · ⑧ answering on resolved data + labeled uncertainty · P3c full-pipeline
  correction via the cross-turn carrier (D-N7/A-10, ⑥ never gets raw text) ·
  signal table as governed rows. **S66 update: F183 removed one HALF of this
  item's cost** — `sırlama 3` is now resolvable through the backend's own
  `description` string. The other half stands: `3-4-5` is a RANGE naming three
  lines and the resolver has no concept of ranges. F175 = decide better under
  uncertainty; F183 = have less uncertainty.
- **F176 · OPEN (low)** — `rule26` local flake; Vite transform middleware parses
  a TS file as JS when the URL carries a query string, and the resulting
  `<vite-error-overlay>` swallows pointer events for a LATER spec. **Absorbed
  into F196**, which is the larger statement of the same problem.
- **F177 · OPEN (low)** — learned keyword map frozen and unmeasured. **S66
  partially resolved:** a review surface for `router_proposals` **does exist** and
  held **19 rows** (owner's screenshot). Still unverified: who reviews, and why
  `proposals=[]` on the owner's turns. **New danger recorded:** Accept = publish
  with `pinned:true`, so accepting a proposal creates a row **Clear can never
  remove**; the queue as it stands offers `granit`→factory, `glazur3`→production,
  `kb7`→machine (which would overwrite the curated `kb7`→factory), and
  `grafik`→andon (simply wrong). **Do not work the queue until F185's guard
  lands.** The misses themselves are legitimate signal — they belong in the
  entity lane, not the category map.
- **F178 · OPEN** — completeness guard enforces the WRONG predicate:
  `spanIOCompleteness` checks spans are FILLED, not that they ARRIVED or arrived
  IN TIME. Failure class is **unbounded delay, not loss**. Remedy: arrival +
  timeliness assertions with a deliberate-late companion proving the checker can
  fail. Observability round.
- **F179 · OPEN** — synthetic injector runs OUTSIDE FULL-TRACE; no `forceFlush`
  at all (grep-verified absent). **S65 ruling stands: NOT a MEASURE prerequisite**
  — measurement data comes from the durable ledger and replay lenses, not the
  injector's spans.
- **F180 · OPEN** — LB-11 untrusted tool-output injection hardening UNVERIFIED at
  rev 61/70. Positive verification read owed; absence NOT asserted.
  **S66 raises the stakes:** F187/F188/F189 show the gateway path is the least
  governed surface in the system.
- **F171-B · NAMED DEFERRAL (B5)** — unify the two language policies; needs a
  `prompt.segment` publish → behind the freeze.
- **F153 · OPEN (external ops PARK)** — Superset returns `http://0.0.0.0:8080/...`
  base URLs. **S66: no longer theoretical** — it blocked delivery of a chart the
  user asked for and which already existed (ids 85, 80). F187 removes CWF's
  dependence on those URLs but does not fix them. Kale/ARDIC ops.
- **F158 · OPEN** — render-layer empty≠zero gap: a model-authored table cell
  showed Glazur1 \"0\" while the prose honestly said \"veri bulunamadı\".
- **F160 · OPEN (VIZ family)** — multi-series single chart (per-line OEE)
  unsupported. **S66: F187's data path makes this the next binding constraint on
  chart quality.**
- **F164 · OPEN-LATENT** — Superset search/find robustness. **S66 CONCRETE:**
  `list_datasets({search:"granit"})` returns **34 datasets** (`records=20/34
  page=1/2`, pagination honest), e.g. id 74 \"Granit - Mengil Doğalgaz Kullanımı\"
  (ClickHouse, `armes_core`), id 61 (MySQL, `armes_db`), id 75. Dataset→factory
  mapping now has real evidence to work from.
- **F165 · OPEN (minor, B5)** — unbounded \"list everything\" exhausts the
  tool-round budget; model stops honestly; message renders in English.
- **F166 · OPEN (VIZ-BIND lane, AFTER B3)** — cross-turn viz binding.
  **Memory must NEVER be a viz data source.** The cross-turn carrier (A-10) is
  adjacent but NOT a viz source — do not conflate.
- **F172 · OPEN (low)** — first published tool_doc overlay is tautological.
  Owner-owned; a v2 publish closes it.
- **blind_spot row option · MOOT** under the coverage-is-config law.

### Closed this session (evidence recorded; do not reopen)
- **F190 · CLOSED@evidence.** ADR-005 v2, ADR-009 v1_1 and ADR-010 landed at
  `docs/adr/` (10 files). `api/cwf/__tests__/adrCitationsResolve.test.ts` makes
  the class unshippable at author time: every `ADR-\d{3}` token in the
  working-tree corpus must resolve, with a floor assertion (>=12 citing files,
  >=8 ids; live 98/10), a self-visibility assertion, and a named positive
  control. Merged `--no-ff` as `0d540c9`, two parents, message byte-identical;
  post-merge master CI green, gate re-verified 4/4 on merged master.
  **The FIX-1 is the durable record:** v1 was green before `git add` and RED on
  its own committed tree because the gate's two halves read two different
  realities — `landedAdrIds()` asked the FILESYSTEM while the corpus scan asked
  the GIT INDEX. Both now read the working tree (tracked ∪ untracked-not-ignored),
  mirroring `docDriftCore.ts:76`, of which v1 had copied only the tracked half.
- **F175 · PARTIALLY CLOSED (entity half, MEASURED).** v3 idx 2 now returns
  `time-unclear`, not `entity-unresolved`; its `entity_ref` is
  `["Ganit fabrikası","sırlama 3-4-5"]` and the gate no longer complains. The
  fuzzy tier reaches **Granit from the typo "Ganit"**, and the discovered line
  layer reaches **"sırlama 3-4-5"**. This is the **first measured return on the
  779-row mirror** — F183 paid off by computation, not assertion. **Still open:
  the shift-window half** ("dün akşam 4-12 vardiyasında"), which is what now
  blocks that utterance from being clean.
- **F176 · MECHANISM CONFIRMED IN CI (was: best local lead).** The F190 PR's
  failing Playwright job logged
  `[PARSE_ERROR] Expected 'from' but found '{'` against
  `api/admin/rules.ts?backend=armes&reference=armes.tool_graph_node` — the Vite
  transform middleware parsing a TS file as JS because the URL carries a query
  string, producing the `<vite-error-overlay>` that swallows pointer events for a
  LATER spec. Same spec passed @1280 in 1.9 s and failed @1024 at 30.1 s: a
  timing signature, not a defect. F196's permanent fix now has a concrete target.

- **F183 (code half) · CLOSED@evidence.** Two tables shipped and applied; the
  FACTORY-only guard lifted; `[EntityDiscovery] layer=line … total=779` observed
  on two consecutive ticks and confirmed by Operator SQL; question-set-v1 block
  rate −46.3pp with the guardian at 4/4. Safety floor held: any failure or empty
  discovered result falls back to ENTITY-FLOOR-1's `factory_registry` path, so
  the phase could only ADD resolutions.
- **F183 phantom-row defect · CLOSED@evidence.** The Architect's descent rule was
  vacuously false for empty arrays, so 12 childless factories became phantom LINE
  rows; `Pasta` then resolved a real LINE reference and suppressed 14
  clarifications **while every log line reported a healthy sync**. Found by AG in
  its own post-apply measurement. Fixed by deciding the container key **once per
  response**; AG's own ENERGIO test then falsified the first implementation
  (all-empty sweep → no key can prove itself → reads flat again), so a uniformity
  pass covers it with the false-negative direction chosen deliberately and
  disclosed in the source. Data corrected by a structural DELETE (parentless rows
  in a parented layer): Operator listed all 12 before deleting, migration NOTICE
  agreed, **791 → 779**, second apply zero.
- **F181 · CLOSED.** FACTORY-PARAM-HINT is live and observed:
  `[FactoryParamHint] backend=armes param=factoryId values=17 hintedTools=44`.
- **F182 · CLOSED@evidence.** The `granit_*` names are **Superset DATASET names**,
  not tools (34 of them). Superset's discovered inner catalog is 22 tools, stable
  across 8 consecutive ticks (`run1=22 run2=22`), **zero** beginning with
  `granit` — two independent channels agreeing. The owner's \"a factoryId-like
  argument steers them\" observation was right at a **different layer**: the
  ClickHouse table carries `factoryid` / `lineid` / `machineid` COLUMNS
  (`WHERE factoryid = 'Granit' AND lineid = 'DGAZ'`). Not a contradiction — two
  layers. Residue split: dataset→factory mapping → **F164**; Superset's own
  topology channel → a later DATA addition under F187's descriptor model.
- **ADR-005 ledger precondition · CLOSED.** See the floor above.
- **Routing keyword cache · CLEARED** (164 unpinned rows removed, `kb7`/`scrap`
  retained, epoch 11) — and **regrown to 19**, which is the evidence for F185
  rather than a failure of the clear.

## 6 · RULES / RECORDS
All prior rules survive by name. Standing (S63-1 · S63-2 · S64-1 · S65-1 ·
S65-2 · S65-3 · ADR-009 v1_1 · ADR-010), plus new:

- **S66-1 (NEW) — A SELF-VERIFY COMMAND'S ZERO IS NOT BELIEVED UNTIL THAT COMMAND
  IS PROVEN ABLE TO FAIL.** Ship a positive control with every pin whose green
  state could be produced by \"there was nothing to check\". Three instances this
  session: `grep -c $'\\x00'` cannot carry a NUL through argv and silently counted
  lines; an unquoted `$MODS` did not word-split in zsh, so a **safety** grep
  printed \"(no matches)\" after being handed one giant filename; and the Architect
  read \"no `[SynthTrafficSeed]` log\" as \"the seeder did not run\" when the same
  query returned nothing on the previous deployment too. **Extended by FIX-2: an
  output contract is verified only by EXECUTING it and inspecting the bytes.
  Reading a diff is not verification.** The named mechanism there — ESM evaluates
  imports fully before the importing module's body — is invisible to reasoning
  about the function, and the load-bearing property (import ORDER) is invisible to
  behavioural tests.
- **S66-2 (NEW) — A PHASE PROMPT MAY NEVER TELL THE AUTHOR LANE TO READ AN
  ARCHITECT-SIDE ARTIFACT.** The prompt IS the contract. If a law matters, either
  the prompt restates it inline or the law lives in the repo. (F190.)
- **S66-3 (NEW) — A BEFORE/AFTER WHOSE POPULATION CHANGED IS NOT A MEASUREMENT.**
  Compare set-to-set on identical n, or isolate with an A/B on one corpus. The
  84.6% → 30.6% figure conflated a corpus change with a phase effect and was
  withdrawn. Corollary: **a new corpus records its baseline on its first passes,
  before anything else lands.**
- **S66-4 (NEW) — IN A GATE OF SEQUENTIAL BRANCHES, THE TOP BRANCH'S RATE CANNOT
  BE THE HEADLINE ALONE.** Narrowing the top branch makes the next one visible,
  so part of the drop is relabelling. The headline must be the total rate at
  which the user gets no answer. (F197; §3.)
- **S66-5 (NEW) — A `known-failing` TAG MUST NAME THE FINDING THAT EXPLAINS IT.**
  A status tag without a referent is a rumour, not a claim. Enforced by a test
  across every corpus, not only the file that motivated it.


**NEW THIS SESSION — S67-1 · A GATE THAT SCANS THE REPOSITORY MUST BE RUN WITH
ITSELF INSIDE THE SCAN.** An unstaged artifact does not exist for `git ls-files`,
so that run's green belongs to the tree that produced it, not the tree that will
be reviewed. **General form: a gate's "what exists" and "what cites" questions
must read the SAME reality** — the index and the filesystem diverge precisely
during the commit that adds files, which is the one moment such a gate exists to
police.

**NEW — S67-2 · A GATE PROVEN NON-DETERMINISTIC PRODUCES NO EVIDENCE IN EITHER
DIRECTION.** Its red does not block on its own and its green does not clear on
its own. Every merge past it must be justified by an argument that never
references the gate's output — for F190 that was reachability (743 pure
insertions, zero files under `src/`, `api/admin/`, `e2e/`, or the vite/playwright
configs, and the file named in the parse error untouched). This is S55-1
sharpened: the danger is not the re-run, it is letting "we re-ran and it passed"
become the reason.

**NEW — S67-3 · WALL-CLOCK IS READ, NEVER INFERRED FROM TURN ADJACENCY.** Every
time-dependent precondition is verified by reading the clock; position in a
conversation says nothing about elapsed time. (Caught by the Author lane, whose
"9 minutes later" was actually ~3 hours — favourably, as it turned out: the
canary had captured the complete day-1 population.)

**CARRIED AND RE-PROVEN — S65-2 · EVIDENCE IS COMPUTED, NEVER ASSERTED.** S67's
strongest results were arithmetic reconciliations nobody was asked for: 94 → 98
citing files with a delta of exactly the four new files; 1865 − 1854 = the 11
unarmorable frames; 500 runs = 200 000 ÷ 400 confirmed three independent ways;
and the complete per-utterance baseline map recovered uniquely from four cause
counts.

## 7 · ARCHITECT PREMISE-ERROR TALLY (S67) — four, all caught in-session
Recorded because the pattern is the point, not the count. **Three of four were
caught by the Architect's own live reads; one was caught by the Author lane.**

1. **`--limit 20000` on the lens.** Specified without reading
   `CLARIFICATION_LENS_MAX_LIMIT = 5000`; the value was silently clamped and the
   "re-run with 60000" fallback was dead on arrival. Root: prescribing a flag
   value without reading the flag.
2. **The `ADR-999` sentinel.** The F190 prompt's clause (e) specified *"an inline
   fixture string containing `ADR-999`"* — which, once the file was tracked, made
   the gate fail against its own committed tree. **The Architect authored the
   trap and the Author implemented it faithfully.** Root: designing a
   self-scanning gate without asking what it sees when it scans itself.
3. **The F185 contamination hypothesis.** Predicted that a regrown
   `tool_category_cache` could move clarification-gate outcomes. It cannot:
   `deriveCandidateCategories` is a static matrix (`deriveCategories.ts:133`) and
   `resolveToolCategories` reads governed published rules only
   (`resolveToolCategories.ts:52`) — the clarify path never touches the learned
   map. Wrong at the DESIGN level, not merely underpowered. Root: designing a
   test for a mechanism without reading whether the mechanism exists.
   **Silver lining recorded:** the lens is therefore structurally insulated from
   the learning path, which is a property worth keeping.
4. **"RUN 2 gives F187 its before-number."** It cannot — the lens measures the
   clarification gate, never tool rounds. What the baseline DID give F187 is
   different and still useful: the gate passes idx 1 cleanly, so F187's failure
   is entirely downstream. F187's before-number remains the 05:02Z production
   turn's **15 tool rounds / 306 388 input tokens**.

Common root across all four, unchanged from S66: **writing a specification from a
document instead of reading the live artifact.** S65-1 exists for this and was
obeyed everywhere it was remembered.

## 8 · WATCHES / PARKED
- **`eval-canary` failed once on master** (`97efc8f4`, 2026-07-27 05:12Z), has
  passed since, green on `0d540c9`. One occurrence, unexplained. A different
  category from the Playwright flake — this is the eval gate's canary. One
  read owed.
- **v3 idx 5 (R6) lost 3 frames of 56** in the day-1 cycle while overall loss was
  7/500 = 1.4 % (better than v1's 4.8 % and v2's 5.4 %). Under a uniform
  assumption P(>=3) is about 4.5 %, so this is at the edge of chance and a
  structural failure would have been ~56/56, not 3/56. **Pre-declared test: if
  idx 5 loses >= 2 frames again in the next cycle it is a finding; if not it was
  noise.**
- **PII in the design document.** The repo deliberately substitutes `10100000`
  for the owner's real sicil number (`questionSetCorpusV3.ts:100`, pinned by
  `seedSyntheticQuestionSets.test.ts:371`) so the ledger stays PII-free. The
  project-knowledge design document still carries the real number. The repo did
  the right thing; the document should be pulled to the substituted value so the
  policy holds in both places.
- **The `N günlük` observation.** The only fully-clean time surface in v3 is the
  bare `N günlük` form (idx 0). `7 gün için`, `son 1 haftalık`, `dün`, and
  `dün akşam <shift>` are all flagged. One clean example, so this is a
  **hypothesis with a single supporting case**, not a law — but it is the
  discriminator whoever fixes the time surface should test first.
- Carried from v67: the synthetic injector's ceiling-reached error-level log
  every minute for ~22 h is designed behaviour, not an error.

## 9 · OWED AT S68 OPEN — dependency-ordered
1. **F187 phase** — design note v1_2 is build-ready and nothing is owed before
   it. Three governed rows, one fail-closed module, the `search_tools` model-view
   filter, the `execute_sql` read-only statement check, and F188's telemetry
   honesty fix. This is S68's opening work.
2. **F199** — an empty layer must be visible to the gate. Cheap, and it is the
   honest counterpart to F194's deferral.
3. **F177 / the record-identifier class** — the v3 baseline says two of the three
   blocking utterances are numeric record identifiers (110 of 164 blocked frames,
   67 %). This is the largest measured blocking cause in real operator questions
   and nobody was looking for it.
4. **F196** — schedule it before M-C, on the S67 evidence that `rule26` is ~50 %
   noise on master and every merge pays the tax.
5. **F185 guard + `router.learnEnabled`** — design note v1 exists; M-C's
   precondition.
6. **M-C** (after 4 and 5) → 7. **F175's shift-window half** → 8. **F198
   pagination** (must precede any equipment discovery) → 9. F197's four riders →
   10. M-B · F178 · F179 · F180.

## 10 · YOUR ACTION ITEMS (owner, at v68 write / S67 close)
1. Upload to project knowledge: **this register (v68)**, `CWF-SESSION-GRAPH-KB-v66`,
   `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v66`, and the three S67 design/read
   artifacts (`cwf-f187-…-v1_2`, `cwf-f185-learning-guard-design-v1`,
   `OPERATOR-READ-F187-INNER-TOOLS-PER-TOOL-v1` plus Gemini's result).
2. Pull the real sicil number out of the v3 question-set design document (§8).
3. Nothing else. No migration is pending, no phase is in flight, no PR is open.

<!-- END · cwf-open-items-register-v68 · 2026-07-28 · S67 close -->
