# CWF — Open Items Register · v67
<!-- cwf-open-items-register-v67 · 2026-07-27 · S66 close. Supersedes v66.
     S63-2: SELF-SUFFICIENT — every OPEN item carries its full wording here;
     pointers only to terminal-marked items and LIVE documents. v60–v66 archive. -->

## VERIFIED FLOOR (v67 / S66 close)
- `origin/master` = **`088b2a5e51d9969dbf5e48b30137ff07574c3431`** · **rev 150**
- **361 test files / 3953 tests** · drift `[OK]` · zero pending migrations
- **59 migrations** — 57 carried, plus `20260726120000_entity_registry_layers.sql`
  and `20260726160000_entity_registry_orphan_cleanup.sql`, **both APPLIED** by
  Operator with full gates green
- Live production deploy: **`dpl_D7gauGW2699TrWcAeAEHmJRPnbfB`**, sha `088b2a5e`
- **Ledger↔repo verified by diff, not assertion:** `schema_migrations` held 57
  rows byte-identical to the repo's 57 files at the pre-merge anchor. **ADR-005's
  open precondition (\"the ledger reconcile must be independently confirmed before
  `db push` is trusted\") is CLOSED.**

**Governed live state (verified this session — do NOT re-infer):**
- `router.frameRouting` = **0** (v3) · `router.frameEnabled` = 1 (v2)
- `synthetic.activeSetId` = **`33cd8365-3c8d-4602-9158-5e5e29cc1b46`**
  (**question-set-v3**, 9 utterances, **v5 published**, eval-gate green) — CHANGED
  this session from v2's `d8f23c4f-…`
- `backend_entity_layers` = **3 rows** (armes: `factory`/FACTORY/`getFactoryList`
  zero-arg · `line`/LINE/`getFactoryLines` zero-arg · `equipment`/EQUIPMENT/
  `getEntities` fan-out, `cadence_class='slow'`)
- `entity_registry` = **17 factory active** · **779 line active** ·
  **equipment 0/0, `present=false`** (described, never swept — F194)
- `factory_registry` = 17 active/17 (still live; drop deferred to B5)
- `armes.entity_alias` = 5 rows · `armes.zone` = 4 rows (both untouched — F184)
- `tool_category_cache` = **19 rows** — cleared to 2 pinned (`kb7`, `scrap`) this
  session, **regrown to 19 within hours** (F185 evidence)
- `backends.factory_param_name`: armes=`factoryId`, superset=NULL, system=NULL

## 0 · CARRY-DIFF PROOF — v66 → v67
**Closed this session (live evidence, S63-1):** F181 · F182 · F183 (code half +
data correction + live proof) · ADR-005 ledger precondition.
**Carried unchanged (full wording in §5):** F129 · F175 · F176 · F177 · F178 ·
F179 · F180 · F171-B · F153 · F158 · F160 · F164 · F165 · F166 · F172 ·
F-BW11/12/13.
**New:** F184 · F185 · F186 · F187 · F188 · F189 · F190 · F191 · F194 · F195 ·
F196 · F197.
**Numbering disclosure: F192 and F193 were never assigned.** They are deliberate
gaps, left rather than renumbered — `f187` and `f194` are frozen as tag strings
inside the live `synthetic_question_sets` v3 row and quoted in permanent merge
commits; silent renumbering would break both.
**Delivered:** 5 merged phases · 2 migrations applied · ADR-005 v2 restored to
project knowledge · F183 + F187 design notes · question-set v3 · the
provider-asymmetry findings note.

## 1 · WHAT S66 WAS
The session that took M-A's number and **made the catalog real**: from 4
hand-authored zone rows to **779 discovered lines**, with the clarification
gate's FACTORY-only guard lifted. Five phases merged — DISCOVERY-EXTEND-1
(rev 147) · FIX-1 (rev 148) · FIX-2 (rev 148, scripts-only) · SYNTH-CORPUS-V3
(rev 149) · SYNTH-CORPUS-V3-FIX-1 (rev 150) — two migrations applied, four
Operator read-only investigations, and a corpus of the owner's own real
operator questions seeded.

It was also the session in which **the Architect's design defect was caught by
AG's own post-apply measurement**, and the headline was cut in half by AG's own
disclosure. Both are recorded as the standard, not as incidents.

## 2 · 🧊 GOLDEN FREEZE — engaged, unchanged. Lifts at B5.

## 3 · THE RESULT — stated honestly, twice
**The clean number:**
> **question-set-v1: block rate 82.5% → 36.2%, a −46.3 point drop, n=600 = 600.**

That set has **zero COMMAND frames**, so the ALT_D branch is structurally
unreachable and HIGH ≡ short-circuit. No relabelling is possible. This is the
strongest real result of the session.

**The number that must NOT be quoted alone:** gapfill-v1 shows HIGH 87.4% →
37.7% (−49.7pp), but **roughly half of that is relabelling**. All 465 gapfill
ALT_D frames carry a non-empty `entity_ref`; the gate checks `entity-unresolved`
BEFORE the COMMAND write-exposure branch (`stageClarify.ts:303` returns `high`
ahead of the ALT_D branch at :312), so resolving the entity does not answer those
turns — it **unmasks a different refusal**. Both short-circuit; the user gets no
answer either way. **Honest figure: short-circuit 87.4% → 62.8% (−24.6pp).**
Corroboration that this is masking and not noise: M-A recorded `entity-unresolved`
at 98.9% of causes, i.e. ALT_D ≈ 0 at baseline — exactly what a masked branch
looks like. AG found this in its own run and cut its own headline.

**Not comparable, stated as such:** organic n went 80 → 89 (population changed,
S66-3); question-set-v2 supplied 474 frames and has **no baseline at all**.

**The catalog, measured:** `[EntityDiscovery] layer=line shape=zeroarg calls=1
total=779 active=779 missing=0 emptyContainers=12`, confirmed on two consecutive
ticks and cross-checked by Operator SQL. **Must-block guardian 4/4, rate 1.0,
zero leaked** — the block rate fell without the gate ceasing to ask.

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

- **F185 · OPEN (HIGH after F183) — the learning path has no guard and no brake.**
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

- **F187 · OPEN (design LOCKED, §6 precondition NOW SATISFIED) — Superset is a
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

- **F190 · OPEN — binding law is invisible from the Author lane.** `docs/adr/`
  holds ADR-001..004 and 006..008. **ADR-005, ADR-009 and ADR-010 are NOT in the
  repository**, while 15+ repo files — production code, tests and two applied
  migrations — cite them BY NAME as binding. This did not start with S66:
  `20260725120000_backends_factory_param.sql` and `factoryParamHint.ts` already
  cited ADR-005/009 in S65. The DISCOVERY-EXTEND-1 prompt compounded it by
  telling AG to \"READ FIRST\" a design note AG cannot see. Damage was avoided only
  because the prompt restated the laws inline.
  **Remedy: land the three ADRs in `docs/adr/`. Design notes do NOT go in** —
  the map's own working-set rule treats shipped design notes as archive.
  **ADR-005 v2 is the owner's original and is restored to project knowledge**
  (`ADR-005-supabase-apply-authority-v2`); the Architect's retroactive
  reconstruction was discarded, and its invented rationale for `db push` was
  **materially wrong** (the real cause is timestamp `version`s that never matched
  file prefixes → ledger drift found by the SEC-ADVISOR reconcile).
  **Partial local remedy already shipped:** `questionSetCorpusV3.ts` now carries a
  header block recording what F175/F187/F194 are.

- **F191 · OPEN (low) — genericity holds at the producer, not the consumer.**
  The new discovery modules carry zero per-backend literals (grep-verified). But
  `stageClarify.ts:94` still reads `ENTITY_ALIAS_BACKEND_ID = 'armes'` — verified
  **pre-existing** (line 77 on master before the phase), so a carried boundary,
  not a regression. Consequence: when a second backend gets descriptor rows, the
  clarify stage will not see it. ADR-009's genericity test is applied to the
  producer today; it must also be applied to the consumer.

- **F194 · OPEN (decision gated on the v3 baseline) — the layer descriptor models
  only the PARENT parameter.** `getEntities` declares **two** required params —
  `factoryId` and `showAll` — and the descriptor models only `parent_param_name`,
  so the tool is called without a declared-required argument. Result: 17
  successful calls, zero parseable entities, `equipment` permanently empty.
  FIX-1 made this **diagnosable, not fixed**: the layer now skips with
  `reason=required-param-no-default param=showAll`.
  **Operator settled the disputed fact:** the stored schema has **no `default`
  key** for `showAll`; the words \"optional, default true\" appear only inside the
  human `description` string. AG correctly refused to regex a behavioural default
  out of prose.
  **Also recorded: the declaration contradicts itself** — `required: ["factoryId",
  "showAll"]` versus a description that says \"(optional, default true)\". This is
  an ADR-010 class of its own: not \"the tool lies\" but \"the tool says two
  different things about itself\".
  **Proposed remedy: a `static_args jsonb` descriptor column** — integration-
  shaped data exactly like `parent_param_name`, so it passes the ADR-009 degree
  test. **Deliberately NOT built yet.** The gate: does the clean v3 baseline show
  blocked frames carrying EQUIPMENT? **idx7 (camera performance) is the probe.**
  If no EQUIPMENT demand appears, 17 fan-out calls per sweep are never paid for
  and F194 stays an honest gap — correct behaviour, not a defect. → DISCOVERY-EXTEND-2.

- **F195 · PARTIALLY CLOSED — an empty discovery result must say WHY.** Shipped
  in FIX-1: six distinct reasons, so \"the backend refused\" and \"the parser could
  not read it\" are now distinguishable. Carried open only as a principle to apply
  elsewhere: a failure wearing the costume of a designed skip is the S65-3 class.

- **F196 · OPEN — the e2e suite is RED on master and non-deterministic.** AG's
  decisive experiment: 3 failed / 37 passed on its branch, and **3 failed / 37
  passed on a clean master worktree with none of its changes**, with the failing
  panes rotating every run (branch: MCP Settings+Tweak; master: Providers+MCP
  Settings; CI: Replay). A real regression fails the same test every time.
  Consequence: **`rule26` currently cannot distinguish a regression from noise —
  a gate that is not a gate**, the S65-3 class in CI form. Supersedes and absorbs
  F176's escalation; F176's Vite/oxc sub-cause remains the best mechanism lead.

- **F197 · OPEN (small, folds into the next lens touch) — `shortCircuitRate`
  becomes the reported headline for any set containing COMMAND frames**, with
  `highRate` and the ALT_D split reported beside it as diagnosis. See **S66-4**
  for the rule and §3 for the evidence.

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

## 7 · ARCHITECT PREMISE-ERROR TALLY (S66) — every one caught by another lane
1. **Fan-out assumed necessary for the line layer.** The opening read premised
   that anything below factories needs a per-parent fan-out. `getFactoryLines`
   declares `required: []`. Caught by the Operator read before any design.
2. **The cache cleanup was offered as an Operator DB write.** The product already
   exposes it as a gated, audited, point-revertible admin action
   (`RoutingCurationRepository`). Caught by the Architect's own live read — after
   the wrong instruction had already been given.
3. **`tool_annotation` described as a visibility switch.** Its schema is
   `{tool, exposure:'read'|'write'}` — a mutation-risk classifier. Caught by
   reading `coreSchemas.ts`.
4. **AG bound to ADRs not present in the repo.** Caught by AG (F190). Damage
   avoided only because the prompt restated the laws inline.
5. **ADR-005 reconstructed with an invented rationale.** The provenance section
   flagged it as reconstruction, which was right — but the mechanism was still
   wrong, and the owner's original supplied the real one.
6. **A proof contract demanded a metric the instrument could not produce**
   (\"must-block guardian at 100%\" from a lens with no guardian field). Caught by
   AG's grep.
7. **The descent rule was vacuously false for empty arrays** — the phantom-row
   design defect. Caught by AG's own post-apply measurement, which is the
   highest-value catch of the session.
8. **The merge message said three known-failing utterances; the corpus tagged
   two.** Caught by AG against a permanent commit message.
9. **Wrong `deploymentId` queried for the first `[EntityDiscovery]` read** —
   violating the Architect's own tooling note. Self-caught.

**Common root, stated plainly:** writing specifications from documents and
assumptions instead of reading the live artifact. S65-1 exists for exactly this
and was still violated. The lane structure caught every one.

## 8 · WATCHES / PARKED
- **`[SynthTraffic] daily token ceiling reached` at `error` level every minute**
  for ~22h/day. Confirmed again this session (`tokensToday: 200000`,
  `dailyTokenCeiling: 200000`, `injected: 0`). Correct designed stop, pure noise
  that will mask a real error. Cheap fix, unscheduled.
- **4 armes tools sit at `status='missing'`** — `search_tools`, `call_tool`,
  `get_instance_info`, `health_check`. Gateway/meta tools once mirrored under
  armes. Harmless (`missing != deleted`) but evidence of a past labelling error.
- **`missing` rows remain resolver match targets by design.** Whether a row the
  backend stopped reporting should still resolve silently is a real open question
  (ADR-001 \"lying backend\" surface). Deliberately NOT this session's; the cleanup
  removed rows that were never entities, not rows that went missing.
- **v2 synthetic traffic has stopped** — `activeSetId` now points at v3 and the
  injector runs ONE active set (no rotation). v2 has no baseline and now never
  will. Accepted: v2 is synthetic, v3 is real operator language.
- **Historical runs remain readable per-set** as long as `--limit` is high enough;
  the last run pulled 2939 rows with `truncated: false`.
- **Corpus intake requires a code phase.** The Question Sets panel has CRUD, but
  the documented path for a new corpus is the in-code absence-only warm-seeder,
  and raw SQL is forbidden by the table's own contract. Not a bug today; if it
  bites again, open a gated bulk-import affordance.
- **`created_by` is NULL on the v3 row** — correct per S33-1 (machine actors use
  NULL + jsonb attribution, never a string sentinel).
- Carried: 353-vs-355 counting delta · Supabase 522 · `seed_state` 23505 ·
  stale-branch sweep · EAIP A1 stale anchor (rev 70) · RULE-27 Class-C clause
  owed · map v3 §6 stale · Path B v1_4 (ALT-A split) owed · HONEST-NULL in
  `computeTurnClarification` · new-deploy `[Obs]`-absence-as-health fragility.

## 9 · OWED AT S67 OPEN — dependency-ordered
1. **v3 BASELINE — the first thing S67 does.** Blocked only by the injector's
   daily budget, which resets at 00:00Z. Verify from Vercel logs that the
   injector actually reaches v3 (`[SynthTraffic] injected>0`, set
   `33cd8365-…`), let ≥3 full passes over the 9 utterances accrue, then run
   `scripts/runClarificationLens.ts --json` with a **raised `--limit`** and record
   v3's per-set numbers as its baseline, with the per-layer registry snapshot
   attached and `shortCircuitRate` as the headline (S66-4).
2. **F194 / `static_args` decision** — falls out of (1): does idx7 (EQUIPMENT)
   appear among blocked frames?
3. **F187 phase** — amend the design note to v1_1 (§6 precondition satisfied:
   tags exist, `explore` is the foreign-surface signal, no real schemas), then
   the phase: `gatewayPolicy` fail-closed sibling, model-facing `search_tools`
   filter with an unfiltered trace, redirect message, `execute_sql` read-only
   check. Carries F188's telemetry-honesty fix.
4. **F190 docs phase** — land ADR-005 v2, ADR-009 v1_1, ADR-010 into `docs/adr/`.
   Small, and it should precede the next code phase.
5. **F185 learning guard + `router.learnEnabled`** — required before M-C.
6. **M-C** — the controlled provider comparison (F-PROVIDER).
7. **F175 / ⑤+⑥ build** (A23 v1_3 §9-3) — the other half.
8. **M-B** (F129 residue) · **F177 reads → B3/MEMORY-1** · **F178/F179** in the
   observability round · **F180** a separate read.

## 10 · YOUR ACTION ITEMS (owner, at v67 write / S66 close)
- **Upload the S66 documents to the project** if not already there:
  `cwf-f183-discovery-extension-design-v1` · `cwf-f187-superset-data-not-render-
  design-v1` · `cwf-provider-arm-asymmetry-findings-v1` ·
  `cwf-synthetic-question-set-v3-real-operator-v1` ·
  `ADR-005-supabase-apply-authority-v2` (already done) · this register · the S66
  KB · bootstrap v65.
- **Nothing operational.** The v3 baseline needs only the clock; the Architect
  reads the logs.
- **Optional, when convenient:** confirm whether AG's Supabase key should be
  downgraded to read-only. AG reported its MCP surface **does** expose
  `apply_migration`, `execute_sql`, `deploy_edge_function` and branch
  mutation — capability present, restriction unknown, and AG declined to test it
  by attempting a write (correct). ADR-005 §Interim calls the downgrade \"the
  first action\"; it has not happened.

<!-- END · cwf-open-items-register-v67 · 2026-07-27 · S66 close -->
