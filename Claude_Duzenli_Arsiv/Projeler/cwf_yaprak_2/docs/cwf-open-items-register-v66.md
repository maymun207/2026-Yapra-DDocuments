# CWF — Open Items Register · v66
<!-- cwf-open-items-register-v66 · 2026-07-26 · S65 close. Supersedes v65.
     S63-2: SELF-SUFFICIENT — every OPEN item carries its full wording here;
     pointers only to terminal-marked items and LIVE documents. v60–v65 archive. -->

## VERIFIED FLOOR (v66 / S65 close)
- `origin/master` = **`1ec1858dc8be4185e44500e0ec08133fcef7a57a`** · **rev 146**
- **355 test files / 3803 tests** (Architect count; CI/S37-2 is the referee —
  the 353-vs-355 counting delta persists and is NOT load-bearing)
- **57 migrations** (56 + `20260725120000_backends_factory_param.sql`, APPLIED by
  Operator, G0–G4 all green) · drift `[OK]` · zero pending migrations
- Live production deploy: `dpl_8Vwj2Kc8gGM6dXQKLjM5DjMvEfHb`, branch=master
- Governed live state (Operator-verified this session, do NOT re-infer):
  `router.frameRouting` = **0** (v3 published) · `router.frameEnabled` = 1 (v2) ·
  `synthetic.activeSetId` = `d8f23c4f-611d-4931-8a62-d7b2b94263d6` (v2, 37
  utterances, v4 published) · `backends.factory_param_name`: armes=`factoryId`,
  superset=NULL, system=NULL · `entity_alias` = 5 rows · `factory_registry` =
  17 active/17

## 0 · CARRY-DIFF PROOF — v65 → v66
**Closed this session (all with live evidence, S63-1):** F169 · F173 · F174
residue · frameRouting-live wrinkle · rev-142 reviewNote backfill debt.
**Reduced:** F129 (its "build the trigger + governed cap" half was already
shipped by IR-1 rev 118 — v65's wording was STALE; only Recall@k naming + the
M-B run remain).
**Carried unchanged (full wording in §5):** F175 · F176 · F177 · F178 · F179 ·
F180 · F171-B · F153 · F158 · F160 · F164 · F165 · F166 · F172 · F-BW11/12/13.
**New:** F181 · F182 · **F183 (highest-leverage item this session produced)**.
**Delivered:** M-A measurement + its baseline · ADR-009 v1_1 · ADR-010 ·
measure design v2 · M-A findings v1.

## 1 · WHAT S65 WAS
The session that turned the SOTA claim from an argument into a **measured
number**, and that wrote the two laws governing how that number may be improved.
Five phases merged (F169-HOTFIX rev 143 · SYNTH-CORPUS-V2-1 rev 144 ·
MA-GATE-LENS-1 rev 145 · FACTORY-PARAM-HINT-1 rev 146), one migration applied,
three Operator read-only investigations, and four durable documents authored.

## 2 · 🧊 GOLDEN FREEZE — engaged, unchanged. Lifts at B5.

## 3 · THE BASELINE (S65's headline result — full record in `cwf-ma-gate-baseline-findings-v1`)
> **~85% of recorded frames would have the clarification gate ASK instead of
> ANSWER; 98.9% of those blocks are `entity-unresolved`.**

Per-utterance (skew-free, n=36) 83.3% · per-frame (n=2534) 84.6% · **organic
traffic (real users, n=80) 35.0%**. Per-action: COMPARE 100% · COMMAND 99.9% ·
QUERY_STATUS 93.2% · QUERY_EVENTS 85.1% · QUERY_MASTER 75.1% · QUERY_METRIC
67.0%. Registry snapshot at measurement: `entity_alias`=5, `factory_registry`=
17/17, rev 145, run `fc8b67e7-8443-46dd-8978-f3b3ce0daf4b`.

**E3 decision-tie RESOLVED: the cause is REGISTRY COVERAGE, not extraction
ambiguity.** Structural mechanism: `mergeFactoryRegistryResolution` runs ONLY for
`frame.object === 'FACTORY'`; LINE/ZONE/EQUIPMENT have exactly one channel, the
5-row governed `armes.entity_alias` (0 line aliases, 0 equipment aliases). In a
MES most questions are about lines and zones. **The gate is correct; the catalog
is empty.**

Known limits (do not overstate the number): HONEST-NULL — `computeTurnClarification`
swallows internal failures into `null`, so the NONE bucket may be over-counted
(HIGH counts are solid) · it is a replay, not live behavior · the synthetic
corpus is not representative traffic; organic 35% is more representative but
n=80.

## 4 · BOARD-WALK — F-BW01-10 CLOSED · **F-BW11/12/13 OPEN**
Wording loss disclosed at v65 stands: their full wording lived only in v59_7 §4,
deleted on the Architect's advice resting on grep MATCH-COUNTS (tally #17).
Carried OPEN by name; re-homed to **B5 or an early-B3 batch**. **Recovery path:**
one owner distillation turn in `cwf_prod` OR re-derivation during the re-homed
batch walk. Owner's "ASLA unutma" stands — names survive, wording debt explicit.

## 5 · FINDINGS — full wording, every open item

### New this session

- **F183 · OPEN — DISCOVERY EXTENSION to lines/zones/equipment. HIGHEST-LEVERAGE
  ITEM S65 PRODUCED.** M-A proved the 85% block rate is registry coverage, and
  the coverage is asymmetric by construction: factories are auto-discovered
  (`entityRegistrySync.ts` mirrors the backend's live list into
  `factory_registry`, 17 rows, descriptor-as-data via `backends.entity_list_tool`,
  zero per-backend literals, on-connect/Sync/health-tick cadence, never throws,
  `missing != deleted`), while zones/aliases are HAND-SEEDED from in-code
  `referenceData.ts` (4 zones + 5 aliases, all KB7) and lines/equipment do not
  exist at all. **Remedy is the sanctioned one and ONLY that one (ADR-009 v1_1):
  extend the proven descriptor+sync pattern down to lines, zones and equipment —
  never write alias rows.** The topology graph (factory→line→zone→equipment)
  then EMERGES as a derived observation rather than being drawn first. Proof of
  done (S63-1): re-run the clarification lens against a recorded registry
  snapshot and show the block rate fell **without** the must-block guardian
  falling (E2: unresolvable probes still block 100%).

- **F181 · OPEN — FACTORY-PARAM-HINT done-proof PENDING (needs live traffic).**
  Code merged @rev 146 and the migration is APPLIED, so the feature is live:
  ARMES declares `factoryId` on 113 of its 145 tools as free-form `type:"string"`
  with no enum, and the hint now injects the 17 discovered ids into the
  model-facing tool description at turn time. **Proof of done:** a live turn
  calling a `factoryId`-bearing tool with the casing self-correction round GONE
  (the observed failure was `getFactoryLines({factoryId:"GRANIT"})` → rejected →
  model retried `"Granit"`). **The synthetic injector CANNOT produce this
  evidence — it runs frame-only and never calls tools**; only real chat traffic
  can. Architect reads it from Vercel logs when traffic exists.

- **F182 · OPEN (low, investigation) — Superset "granit" prefix, unlocated.**
  Owner observed Superset tool names prefixed `granit` and reported that a
  `factoryId`-style argument steers them to any factory. The Operator read
  CONTRADICTS the premise as stated: `backend_tools` for `backend_id='superset'`
  holds 26 tools, **ZERO** beginning with `granit`, and **no factory-selecting
  parameter of any name** — Superset is a generic BI layer parameterized by
  `dataset_id`/`chart_id`/`dashboard_id`/`database_id`/`sql`. Most likely the
  `granit_*` names are Superset's own CONTENT (dataset/chart names surfaced via
  `list_datasets`/`execute_sql`), i.e. data objects, not MCP tools; the
  "factoryId steers it" behavior is ARMES's (113 tools, camelCase `factoryId`,
  free string). Needs the owner to say WHERE the names were seen. If it is
  dataset naming, the real question is dataset→factory mapping — a separate and
  harder design, adjacent to F164. `backendTrust.ts` already models the shape
  difference: superset `scopeSource='datasource'`, armes `'zone'`.

### Carried

- **F129 · OPEN (REDUCED) — Recall@k unnamed; M-B run owed.** v65's wording ("no
  UI/API trigger; token cap still a code constant") was **STALE** and is
  corrected here: `quota.routerAbRunTokenCeiling` IS a governed param
  (`agentParams.ts:330`, seed 1_500_000, min 200k/max 5M, stage '00'), and the
  replay endpoint accepts `mode:'router-ab'` with the ReplayTab ④ evidence-lens
  section — both landed in IR-1 (rev 118). **Remaining:** name Recall@k (the lens
  already computes it as `scoreRouterAbCoverage`) and RUN the per-arm baseline
  (M-B) on toolful recorded specimens. NOT the frame-only synthetic corpus —
  `routerAbLens.ts:84` returns coverage=1 when `calledToolNames.length===0`, a
  trivial pass, and `isReplayableSpecimen` drops toolless turns. Guardian:
  offered-set WIDTH (an arm offering all tools scores 1 trivially).

- **F175 · OPEN — DESIGN-APPROVED@v1_3 (2026-07-25); build gated by §8.** The
  clarification catch-all, root-caused S62: gate runs AFTER the whole pipeline
  and BEFORE the model (`chat.ts:188→241→268`); fires on
  `entity_ref.length>0 && resolvable===0` (all-or-nothing HIGH, replaces
  generation); `stageClarify.ts:97` `if (frame.object !== 'FACTORY' || …) return;`
  ⇒ registry resolver never ran for non-FACTORY subjects — live proof 07:58:05:
  `object=EMPLOYEE`, `entity_ref=[Ganit fabrikası, sırlama 3-4-5, 4-12
  vardiyası]`, `resolved=[]`; DL≤2 never got its chance at `Ganit→Granit`. Frame
  over-extracts non-entities (shift, line-range) into `entity_ref`. Gate
  structurally unreachable on the keyword floor (`stageClarify.ts:200`).
  Literature name: epistemic failure billed to the user as aleatoric ambiguity.
  **Approved remedy = A23 v1_3**: ⑤ diagnosis (τ/β → LINK/NIL/AMBIGUOUS; anchors;
  structural carrier test) · ⑥ execution decision (teşhis×taşıyıcılık; only
  "don't call the model" may cancel; scope question-gate) · ⑧ answering on
  resolved data + labeled uncertainty · deterministic attribution · **P3c =
  full-pipeline correction turn via the cross-turn carrier (D-N7/A-10) — ⑥ never
  gets raw text** · turn_context flow · root spine · signal table as governed
  rows. Terminal marker lands when §8 steps 5–6 ship and the live re-run of the
  owner's 10 turns shows the six dead turns surviving. **S65 note:** M-A now
  QUANTIFIES this item's cost (85% block, 98.9% entity-unresolved) — F175 and
  F183 are the two halves of the same problem (F175 = decide better under
  uncertainty; F183 = have less uncertainty).

- **F176 · OPEN (low) — `rule26` local flake, `api/admin/rules.ts`.** 39/40
  locally under 7-worker parallelism, 2/2 clean isolated, untouched by
  LOG-TRUTH-1, CI's own rule26 job passed. Second instance of the PANE-SCROLL
  class (different file). Belongs with PANE-SCROLL-2's permanent CI-worker root
  cause; no band-aid (S61-2). **S65 escalation:** the flake now costs an extra CI
  round on most merges (F169 needed 3 runs, FACTORY-PARAM 2). New sub-cause
  identified and worth carrying: an admin-panel fetch to `/api/admin/rules?…` in
  the e2e dev-preview hits Vite's transform middleware, which detects TypeScript
  by extension — the URL ends in a query string, so oxc parses a TS file as JS
  (`PARSE_ERROR: 'from' expected`), and the resulting `<vite-error-overlay>`
  swallows pointer events for a LATER spec in the same job.

- **F177 · OPEN (low) — learned keyword map FROZEN and UNMEASURED. (STEP 6)**
  Learning suppressed on the frame path (`stageTools.ts:494` learn suppressed
  basis=frame); semantic branch records proposals only (`toolCategories.ts:875
  /:1017`, path==='semantic'). Learning dropped from authority to proposal —
  sound (protects the A/B lens). Unnamed consequence: the outage floor is frozen
  AND untested insurance; `routerAbLens` can measure it. UNVERIFIED (do not
  premise): (a) why `proposals=[]` on the owner's turns; (b) whether a
  `router_proposals` review surface exists, who reviews, row count. One-session
  Architect reads. A23 v1_3 A-4 binds the map's future: stays as floor, loses the
  learning-target role.

- **F178 · OPEN — completeness guard enforces the WRONG predicate.**
  `spanIOCompleteness` checks spans are FILLED, not that they ARRIVED nor ARRIVED
  IN TIME. FULL-TRACE violated ≥3 consecutive deploys on the golden-runner lane
  while CI stayed green. The failure class is **UNBOUNDED DELAY, not loss** — a
  span arriving one cron period late serves observability as badly as absence.
  The guard itself is a Class-E candidate. Remedy: arrival+timeliness assertions
  with a deliberate-late companion proving the checker can fail (E2 liveness).
  **S65: first evidence ARRIVED — F169's post-fix read confirmed the delay class
  and confirmed the guard stayed green throughout.** Fold into the next
  observability round.

- **F179 · OPEN — synthetic injector runs OUTSIDE FULL-TRACE.**
  `runSyntheticInjectorTick.ts` contains no `forceFlush` at all (grep-verified
  absent) — not mispositioned like F169, never wired. K1's evidence lane runs
  outside the mandate that makes evidence trustworthy. Same round as F178.
  **S65 ruling (do not re-litigate): F179 is NOT a MEASURE prerequisite.** M-A/M-B
  data comes from the durable ledger + replay lenses, not the injector's Langfuse
  spans (ADR-008 ledger ≠ trace). Pull it forward only if a measurement result
  looks anomalous and needs the injection's full I/O to debug.

- **F180 · OPEN — LB-11: untrusted tool-output injection hardening UNVERIFIED.**
  ARDICTECH flags it unverified at rev 61 and rev 70; repo greps return
  synthetic-injector homonyms; `safety.ts`/`promptFloor.ts` are prompt
  governance, not tool-output hardening. Positive verification read owed (grep is
  weak — absence NOT asserted). If truly absent: fleet-wide risk once one core
  serves N products. Separate read; not bundled with the obs round.

- **F171-B · NAMED DEFERRAL (B5, behind the freeze) —** unify the two language
  policies. Deterministic messages follow `ctx.language`; the model's prose
  follows the user's message language because `api/cwf/_lib/prompt/**` contains
  NO language instruction (grep-verified). Honoring one policy needs a
  `prompt.segment` publish → freeze. Do not drop.

- **F153 · OPEN (external ops PARK) —** Superset returns `http://0.0.0.0:8080/...`
  base URLs — Superset deployment config (armes-reports2), NOT CWF; breaks
  explore links if surfaced. Kale/ARDIC ops.

- **F158 · OPEN —** render-layer empty≠zero gap: model-authored table cell showed
  Glazur1 "0" while prose honestly said "veri bulunamadı"; grounding didn't scan
  the table surface. Small fix; B5 or an early batch.

- **F160 · OPEN (VIZ family) —** multi-series single chart (per-line OEE)
  unsupported — model fetched data, honestly offered table/per-line alternatives.
  VIZ-BIND evolution lane.

- **F164 · OPEN-LATENT —** Superset search/find robustness: model builds
  inconsistent search terms; Superset search is substring/exact-ish, no
  fuzzy/normalized match. Not triggered on the current Granit-populated instance;
  would bite a multi-factory Superset. **S65: adjacent to F182** — if the
  `granit_*` names are dataset names, dataset→factory mapping lands here.

- **F165 · OPEN (minor, B5) —** unbounded "list everything" exhausts the
  tool-round budget (maxToolRounds=16, silentFinish); model stops HONESTLY;
  budget-exhaustion message renders in English (i18n).

- **F166 · OPEN (VIZ-BIND lane, AFTER B3) —** cross-turn viz binding: a follow-up
  "chart these" references a PRIOR turn's tool result; binder is turn-scoped,
  current turn's rawToolResults empty → honest "not available to chart" panels ×5
  (trace fa62a5fb). Polarity CORRECT (no F82), UX broken. Directions: (A)
  re-fetch · (B) attributed carry-forward (C1-LAW care). **Memory must NEVER be a
  viz data source.** B3 design note must be written F166-aware. **Note:** the
  cross-turn carrier (A-10) is adjacent but NOT a viz source — do not conflate.

- **F172 · OPEN (low) —** first published tool_doc overlay is TAUTOLOGICAL ("Hat
  duraklarının listesini döndürür."). Pipeline proof complete; knowledge
  contribution zero. Value begins when it states what the SERVER does not know.
  Candidate content: `reasonSource` semantics · `stopType null` = unplanned vs
  not-entered · whether `KB7_StopAlternative` is a real stop or an accounting
  record. Owner-owned; a v2 publish closes it.

- **blind_spot row option · MOOT** under the coverage-is-config law — do NOT add.

### Closed this session (evidence recorded; do not reopen)
- **F169 · CLOSED@evidence.** Fix merged rev 143 (flush awaited BEFORE the
  response on BOTH the 200 and 500 paths; the `finally`, incl. the `claimed:0`
  void fire-and-forget, removed entirely). Live proof: on `dpl_7vVJRL…` six
  consecutive silent (claimed:0) ticks 09:41:50–09:46:50 with ZERO `late-settle`
  and ZERO `langfuse=never`, all at `info` — against the prior deploy where
  essentially every silent tick emitted `langfuse=never(5000ms)` then
  `late-settle langfuse=ok(~59-60s)` at `error`. The old header's "full
  pre-response guarantee" was itself false for every path; the fix closed all
  three, not just the no-op one.
- **F173 · CLOSED@evidence.** Dual-channel: Operator read across postgres/api/
  auth/edge-function logs + `telemetry_events` (108 live events) +
  `turn_trace_digest` (24 turns) + `rule_audit` + `pg_stat_statements` → **0**
  occurrences of 22P02 since the `194f6a8` deploy; Architect corroboration via
  Vercel app-log → 0 hits. Absence-based by design (that was the item's own
  criterion).
- **F174 residue · CLOSED.** The 8 authored v2 utterances are live and confirmed
  running: v2 injected 500 runs 2026-07-26 00:01:19→01:39:31Z, idx 29–36 each ran
  13×, actions exactly as designed (T1–T4 → QUERY_MASTER 52, M1–M4 → COMMAND 52).
- **frameRouting-live wrinkle · CLOSED.** `router.frameRouting` was found LIVE at
  1 without the owner's knowledge (root cause: the Architect of a prior session,
  two days earlier, instructed the owner to publish it — NOT an accident, and
  invisible from this project because of the lineage boundary). Published to 0
  (v3, gate passed); live confirmation on two post-publish turns showed
  `basis=keyword` with `frame=on` — steering off, observation on. Target state
  reached: `frameEnabled=1` (ir_frame telemetry, the measurement input) +
  `frameRouting=0` (dark floor).
- **rev-142 reviewNote backfill · CLOSED.** The LOG-TRUTH-1 (rev 142) reviewNote
  gap — the phase bumped docVersion without appending its entry — was backfilled
  retroactively in the MA-GATE-LENS-1 reseal (rev 145).

## 6 · RULES / RECORDS
All prior rules survive by name. Standing, plus new:
- **S63-1 — MERGE IS NOT PROOF; LIVE MEASUREMENT IS.** Applied five times this
  session; every closure above carries its own live read.
- **S63-2 — THE REGISTER IS SELF-SUFFICIENT.** Honored here.
- **S64-1 — dense visuals must be legible at container width.**
- **S65-1 (NEW) — EVERY PHASE BRIEF OPENS WITH A LIVE READ OF THE GOVERNED STATE
  IT DEPENDS ON.** The Architect made THREE premise errors this session by
  designing from the register/docs instead of reading live state (§7 tally). The
  register is a summary; the DB and the tree are ground truth. A brief that
  premises a live value without an Operator read of that value is malformed.
- **S65-2 (NEW) — EVIDENCE IS COMPUTED, NEVER ASSERTED.** AG disclosed printing a
  hardcoded `-> 0` next to a grep that had returned 1 (the conclusion held — both
  hits were comments — but the echoed number was not the measured one), re-ran it,
  and reported. Self-verify output must be captured command output, not a typed
  number that matches expectation.
- **S65-3 (NEW) — A MEASUREMENT TOOL MUST OBEY THE LAWS IT MEASURES.** The
  clarification lens shipped with three silent defects, each under-reporting in
  the FLATTERING direction and none erroring: a NUL byte made the source read as
  binary so grep-based self-verification returned nothing — indistinguishable
  from clean (RULE-24); PostgREST's `db-max-rows` capped a select at 1000 of 2465
  rows with no truncation signal, dropping 59% of the population and reporting
  COMPARE as absent when it has 22 frames (an **empty≠zero violation inside the
  measurement tool**); and `perSet` omitted zero-row sets so a set that exists but
  never ran vanished instead of showing as such. All three are pinned by
  regression tests. Assume the next measurement tool has this class of bug until
  it has been run against real data and cross-checked.
- **ADR-009 v1_1 (NEW, owner-issued law) — ENTITY TOPOLOGY IS DISCOVERED, NEVER
  AUTHORED.** Inventory (which factories/lines/zones/equipment exist, their
  names, their parent edges) is observed from the backend. Shapes, algorithms,
  closed enums and the discovery mechanism itself legitimately stay in code;
  inventory never does. Code-floor's three roles (seed/reset/outage floor) do NOT
  extend to inventory — the persisted mirror is its floor (`missing != deleted`).
  Vocabulary (human synonyms) is machine-proposed from observed misses and
  human-ratified (L5), never hand-authored from scratch. **Degree test (v1_1):**
  does the hand-authored artifact grow with the WORLD (plant size → FORBIDDEN) or
  the INTEGRATION (one entry per backend → ACCEPTED)? Enforcement: genericity
  (zero per-backend literals) · descriptor-as-data · absence honesty (no
  discovery ⇒ empty catalog ⇒ the gate ASKS; never patch with hand-authored rows).
- **ADR-010 (NEW) — A DECLARATION IS A CLAIM, NOT A WARRANT.** Accept
  declarations at the routing layer (MCP plasticity); earn trust at the answer
  layer. Five deterministic mismatch signals (shape violation · internal
  contradiction · declared-completeness violation, undetectable from a single
  call by construction · outcome failure · absence pattern, read through
  empty≠zero so a real-0 never counts against a tool). Trust granularity must be
  **per-TOOL**, not per-backend. Two-speed enforcement: payload containment is
  fast/automatic/per-turn/reversible; trust-tier downgrade is a governance act →
  machine-proposes with evidence, human + eval-gate ratifies. Honest limit: the
  system can detect INCONSISTENCY, not FALSEHOOD. **Status: ACCEPTED as law, NOT
  IMPLEMENTED** — today `backendTrust.ts` is a declaration-only model with a safe
  floor (`unverified` = authoritative for NOTHING) and enforcement deferred to
  Phase C; there is no path from observed behavior back to trust.

## 7 · ARCHITECT PREMISE-ERROR TALLY (S65) — all three caught by another lane
1. **`activeSetId` assumed to be v1.** SYNTH-CORPUS-V2-1 was designed on the
   assumption that the live set was `question-set-v1`. It was
   `cwf-synthetic-gapfill-v1` — a THIRD set, created 2026-07-22 by a prior
   session from the SAME source doc, already 1870 runs deep, whose 8 utterances
   are BYTE-IDENTICAL to the 8 "new" ones. **The whole phase was redundant**; the
   corpus-balance outcome is net-positive but the rationale was wrong. Caught by
   AG (DB visibility) then confirmed by Operator. Root cause: designed from docs
   without an Operator read → S65-1.
2. **reviewNote anchor invented, TWICE.** Both the F169 and SYNTH-CORPUS GO blocks
   anchored the new entry to a "LOG-TRUTH-1 / rev 142" entry that does not exist
   (its narrative lived in a tab `note`, not the top-level ledger). AG caught it
   both times and did not fabricate the missing entry. The second occurrence was
   a failure to carry the Architect's OWN correction forward.
3. **Reseal scope missed.** The F169 brief said "exactly two files";
   `golden-runner.ts` is mapped to the Governance Model tab, so any byte change
   drifts the seal and fails the blocking `check:doc-drift` gate — the reseal was
   mandatory, not scope creep. Surfaced by AG.
*(Also corrected: F129's register wording was stale, claiming work IR-1 had
already shipped — the same design-from-summary failure in a different costume.)*

## 8 · WATCHES / PARKED
- **`[SynthTraffic] daily token ceiling reached` is logged at `error` level every
  minute** for ~22h/day. It is a correct, designed stop, not an error — pure
  noise that will mask a real error. Cheap fix, unscheduled.
- **A third backend row exists: `system`** (`backends` = armes, superset, system).
  `factory_param_name` NULL → harmless no-op. Never previously discussed here.
- **PANE-SCROLL / vite-error-overlay flake cost is escalating** — see F176.
- **HONEST-NULL in `computeTurnClarification`** — internal failures collapse into
  `null`, so NONE ≠ "decided not to ask". Makes the NONE bucket of any gate
  measurement suspect. Fix belongs with the observability round.
- **New-deploy `[Obs]` line ABSENCE = healthy signal** — post-F169 the flush
  diagnostic emits nothing on the happy path. "Healthy = the line is missing" is
  fragile; confirm positively during the obs round.
- 353-vs-355 test-file counting delta · Supabase 522 · seed_state 23505 ·
  stale-branch sweep · EAIP A1 stale anchor (rev 70) · RULE-27 Class-C clause
  owed · map v3 §6 stale (says register v62) · Path B v1_4 (ALT-A split) owed ·
  SOTA verdict not frozen (optional).

## 9 · OWED AT S66 OPEN — dependency-ordered
1. **F181 done-proof** (needs live traffic; Architect reads Vercel).
2. **F182** — owner says where the `granit_*` names were seen; then decide.
3. **F183 — discovery extension to lines/zones/equipment.** The item M-A was
   built to find. Design note first (descriptor pattern extension, per-layer
   discovery tool as DATA, parent-edge derivation), then AG phase, then re-measure.
4. **M-B** (F129 residue) — Recall@k per-arm baseline on toolful specimens.
5. **F175 / ⑤+⑥ build** (A23 v1_3 §9-3) — the other half of the same problem.
6. **F177 reads → B3/MEMORY-1 design note**; F178/F179 in the observability round;
   F180 a separate read.

## 10 · YOUR ACTION ITEMS (owner, at v66 write / S65 close)
- **Upload the four S65 documents to the project** if not already done:
  `ADR-009-entity-topology-is-discovered-v1_1` (REPLACE v1 — supersedes it),
  `ADR-010-earned-trust-declaration-vs-observation-v1`,
  `cwf-measure-phase-design-v2` (supersedes v1),
  `cwf-ma-gate-baseline-findings-v1`, plus this register + the S65 KB + bootstrap v64.
- **Tell the Architect WHERE the `granit_*` names were seen** (F182) — panel,
  Superset UI, or a query result.
- **Nothing else.** F181's proof arrives with normal usage; no manual step.

<!-- END · cwf-open-items-register-v66 · 2026-07-26 · S65 close -->
