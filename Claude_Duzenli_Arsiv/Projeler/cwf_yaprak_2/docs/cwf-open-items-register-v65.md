# CWF — Open Items Register · v65
<!-- cwf-open-items-register-v65 · 2026-07-25 · amends v64 after S64
     ("ARCHITECTURE LOCK DAY"). GOLDEN LEDGER: append-only; items leave ONLY
     via a terminal marker (CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO);
     carry-diff pasted in §0.
     S63-2 (LAW): the register is SELF-SUFFICIENT — every OPEN item carries its
     FULL wording in every version. Back-pointers are legitimate ONLY toward
     terminal-marked items and LIVE working-set docs (master plan, ADRs, the
     A23 architecture set). No pointer may target a superseded register.
     After this version is uploaded, v60–v64 are archive and may be deleted. -->

## VERIFIED FLOOR (v65 / S64 close)
master `194f6a86831c215952feaba8e9df3ac00b32d364` · rev 142 · **353 test files
/ 3735 tests** · 56 migrations · **ZERO pending migrations** · drift `[OK]` ·
docVersion "rev 142 · 2026-07-23". **UNCHANGED from v64 — S64 merged NO code.**
S64 was a pure Architect/design session: architecture lock + SOTA assessment +
one readability re-format. No AG phase, no Operator migration, zero merges.
**Count note (TOTAL-45):** Architect fresh-clone grep at `194f6a8` returned
**355** test files vs the register's 353 on a byte-identical tree ⇒ a
counting-method delta, NOT a position change; CI/S37-2 is the sole arbiter;
not load-bearing. Deploy `dpl_B9dAqv53ctQGGJuY8zPkd1N7JegQ` still READY,
target=production, SHA `194f6a8` (last confirmed S63; unre-checked S64 — no
deploy occurred).

## 0 · CARRY-DIFF PROOF — v64 → v65
- **OPENED:** none.
- **CLOSED via terminal marker:** **F174** (CLOSED@owner-decision 2026-07-25 —
  BREADTH chosen; residue folds into MEASURE, §8-3).
- **STATUS CHANGED:** F175 (DESIGN-APPROVED@**v1_3** — was @v1_2; P3c refined
  by D-N7) · F169/F173/F129 unchanged (still owed, now STEP 1/2/3).
- **DESIGN DECISIONS ADDED (in the A23 set, not open findings):** **D-N7**
  (P3c cross-turn boundary fix) + **A-10** (cross-turn carrier / son-çözüm
  dilimi) — §1 + §6. GWT-accurate §3 rewrite of the attention framing.
- **CARRIED with FULL WORDING below (S63-2):** F169 · F173 · F129 · F175 ·
  F176 · F177 · F178 · F179 · F180 · F171-B · F153 · F158 · F160 · F164 ·
  F165 · F166 · F172 · blind_spot(MOOT) · F-BW11/12/13 (§4, wording-debt).
- Check: every v64 OPEN item is present below OR carries a terminal marker.
  **"Absent without marker" set = EMPTY ✓ — verifiable INSIDE this file.**

## 1 · v5_2 RELEASE TRACK — position + S64 record
GATE-0 ✓ → B1 ✓ → B2 ✓ → F163 ✓ → debt sweep ✓ → LOG-TRUTH-1 ✓ →
**UNDERSTANDING-LAYER TRACK: DESIGN LOCKED (A23 set: v1_3 + component v1_2 +
sequence v1_1 + runbook)** → F169 fix → MEASURE (F129 + widened corpus) →
turn_context → ⑤/⑥ build (+ cross-turn carrier A-10 + P3c) → B3 Memory
(MEMORY-1, F166-aware + ARDICTECH-constrained design note FIRST) → F166 → B4 →
B5 → B6 → B7 → Path B.

**S64 record (evidence in KB v63):**
1. **Owner four-part request completed:** (a) target component architecture
   drawn · (b) turn sequence drawn · (c) fact-based industry/research
   comparison (~55 current sources, 9 axes) · (d) fact-based SOTA verdict.
2. **SOTA verdict (delivered, not yet frozen as an artifact):** component
   level = SOTA-current (established techniques correctly reused, zero
   novelty — right call); design/stance level = SOTA-aligned→leading on the
   governance/trust/determinism axis (independently ahead of the 2026
   convergence: MS Agent Governance Toolkit's "deterministic-before-the-wire",
   OPA-on-MCP, eval-to-guardrail, structured clarification, blackboard revival,
   observability/eval separation); ~8 novel-in-combination mechanisms
   (harmless-not-honest · ⑤/⑥ split · frame-not-language retrieval · A↔B
   promote-to-deterministic · confidence-carrying single-turn blackboard ·
   measurement constitution · DB-first/code-floor+empty≠zero · L5
   self-generating labels). **Honest ceiling:** most distinctive machinery is
   TARGET/ADJACENT — UNBUILT; the SOTA claim is about the DESIGN, not a
   measured system; the empirical answer arrives with the S62-2 baseline.
   Optional freeze: `A23_cwf-sota-benchmark-vs-industry-v1.md` (owner did not
   request it this session).
3. **Attention framing corrected (GWT-accurate) — §3 of v1_3:** what the doc
   calls "attention" is a METAPHOR, not neural attention. Academic home =
   Global Workspace Theory (Baars) + its neural instantiation (Goyal/Bengio,
   ICLR 2022, arXiv 2103.01197: modules read/write a bandwidth-limited shared
   channel via attention with an attentional bottleneck) + blackboard
   (Hearsay-II). GWT permits **hard-competition** bottlenecks ⇒ our
   deterministic/hard threshold is a LEGITIMATE GWT variant, not a departure.
   Confidence-decay math = classical (t-norm / MYCIN certainty-factors /
   Dempster-Shafer). **What is ours:** the deterministic, governed, non-learned
   instantiation applied intra-turn — NOT the shared-workspace structure
   itself (tally #18).
4. **P3c architectural flaw (owner-caught) → D-N7 + A-10.** The owner caught
   that the drawn P3c feedback arrow entered ⑥ directly, but ⑥ is
   deterministic and cannot parse raw text ("hayır, KB7") without violating
   D-N3. **Resolution (now binding in v1_3):** P3c is a FULL-PIPELINE turn
   (②→③→④→⑤→⑥); ⑥ never receives raw text; the correction returns to the turn
   HEAD, not ⑥. New component: the **cross-turn carrier** (son-çözüm dilimi) —
   a minimal working-memory slice (prior turn's canonical_ids + scope + ⑥
   decision + presented candidates) written at turn end, read by ② next turn;
   never writes `messages` (C1-LAW), never reads the digest (ADR-008), no
   re-parse of our own prose; forward-compatible with B3/MEMORY-1; ships WITH
   ⑤/⑥ (Stage C BAG 2 — cannot defer). Binding constraint **A-10**.
5. **A23 architecture set LOCKED (S37-1: new versions, prior = archive):**
   `A23_cwf-understanding-layer-architecture-v1_3` (binding; supersedes v1_2) ·
   `A23_cwf-target-component-architecture-v1_2` (readability re-format of v1_1;
   content-identical) · `A23_cwf-turn-sequence-target-v1_1` ·
   `A23_cwf-execution-runbook-v1` (STEP 0–6 plan, not binding architecture).
6. **Readability defect (owner-caught) → S64-1.** Component v1_1's single dense
   SVG became illegible (~7px) when scaled to container width; re-issued as
   v1_2 in native-text HTML. Standing note S64-1 (§6).

## 2 · 🧊 GOLDEN FREEZE — engaged, unchanged. Lifts at B5.
Golden-runner 1075/18h watch unchanged. Frozen-surface definition lives in
**`cwf-master-plan-v5_2` §1 (LIVE doc — legitimate pointer under S63-2)**;
`prompt.segment` publishes remain blocked. Consequences honored: A23 v1_3 A-1
(router types NOT via prompt) · F171-B stays behind the freeze.

## 3 · REMAINING SPINE — full status
- **B3 Memory (NEXT after the understanding-layer build):** MEMORY-1 design
  note, **F166-aware** + **ARDICTECH-bound** + **carrier-aware**: episodic
  tables carry NO FK to `auth.users` (S33-1 stays Supabase-shaped for existing
  tables; NEW memory tables use profile-derived actor identity); tenant from
  profile; retention from the Class-C contract; memory NEVER a viz data source.
  **New question for the note:** whether B3 is a SUPERSET of the cross-turn
  carrier (A-10) or a separate slice — the carrier ships first (minimal); B3
  extends it, does not break it.
- **B4** RAG connection (master plan §1).
- **B5** freeze lift + security cleanup: `mcp_settings` 6/6 raw→apiKeyRef +
  ksadmin's 2 stale personal rows + F171-B + F165 + render/i18n batch.
- **B6** architecture close · **B7** (master plan §1).
- **Path B** = IR-4 FUTURE-STATE contract (`cwf-ir-pathb-hybrid-logic-v1_3`,
  live doc). **The understanding layer is its PRECONDITION.** **Owed at next
  Path B touch:** mint v1_4 with the ALT-A split — ALT-A₁ alias-unresolved
  (epistemic → inform) · ALT-A₂ frame-ambiguous (aleatoric → offer options) —
  per A23 v1_3 ⑥ behaviours (already folded into ⑤/⑥ target; the Path B doc
  itself still needs the amendment).

## 4 · BOARD-WALK — F-BW01-10 CLOSED · **F-BW11/12/13 OPEN**
**Disclosed wording loss (S63-2's second motivating failure):** their full
wording lived only in v59_7 §4, deleted on the Architect's advice resting on
grep MATCH-COUNTS (tally #17). Carried OPEN by name; re-homed to **B5 or an
early-B3 batch**. **Recovery path:** one owner distillation turn in `cwf_prod`
OR re-derivation during the re-homed batch walk. Owner's "ASLA unutma" stands —
the names survive; the wording debt is explicit.

## 5 · FINDINGS — full wording, every open item

- **F174 · CLOSED@owner-decision (2026-07-25) — BREADTH.** Synthetic ceiling
  capped the K1 data gate; the lever was the QUESTION SET, not the ceiling.
  Verified: `synthetic.dailyTokenCeiling`=200 000 (governed,
  `agentParams.ts:389`) · `ratePerMinute`=5 · cost/injection=400 CONSTANT
  ESTIMATE (`runSyntheticInjectorTick.ts:33`; `tokensToday`=rows×400, a CLAIM
  not metered — TOTAL-45) · day rolls 00:00 UTC ⇒ 500 injections/day, ceiling
  ~01:39 UTC, idle ~22.4 h. Authored set = 29 utterances ⇒ ~17 reps/day
  (measures classifier STABILITY, not COVERAGE). **Owner chose BREADTH.**
  **Residue (→ §8-3):** publish the 8 authored v2 utterances
  (`cwf-synthetic-question-set-v2-additions-v1`) and widen the corpus, so
  v1_3 §7's whole-outcome column (useful-turn rate) + the labeled baseline
  become measurable. UNVERIFIED (do not premise): live `synthetic.activeSetId`
  row count (29 is from the doc).

- **F169 · OPEN — mechanism LIVE-PROVEN; fix authored; NOT SENT. (STEP 1)**
  Prod `[Obs]` on `dpl_B9dAqv53…` (every cron tick, 30-min window):
  `flush cold=false pending=1 scrub=in-time(0ms) digest=in-time(0ms)
  langfuse=never(5000ms)` then `late-settle langfuse=ok(59361ms)`. Settle
  times cluster at 59.3/59.7/60.0/60.2 s = exactly the cron period; ~120 s =
  two frozen periods; ~34 s = container woken early. ⇒ export waits on the
  next tick UNFREEZING the container, not on network. Diagnosis: WARM ✓ ·
  langfuse-named ✓ · "never settles" ✗ — REFUTED AND SHARPENED: spans are NOT
  lost, they are delayed ~1 cron period and delivered (lost only if the
  container is retired before next wake). Three-endpoint table stands
  (chat.ts:348 pre-end 0 fail · eval-ci.ts:222 pre-json 0 fail ·
  golden-runner.ts finally post-json ≥82 % fail). **Fix (exact):** golden-runner
  flush moves INSIDE `try`, BEFORE `res.status(200).json(result)`, AWAITED,
  byte-pattern of eval-ci.ts:222 ("RULE 27: flush spans BEFORE responding");
  the `finally` flush is removed entirely — its `claimed>0 → await` branch is
  equally post-response, so "move the line up" is NOT the fix, both branches
  relocate. HOTFIX profile: single file, no api/shared/migration/security
  surface, `OTEL_FLUSH_TIMEOUT_MS` NOT widened. `waitUntil` remains the
  reserved floor. **Proof of done (S63-1):** post-deploy `[Obs]` re-read — the
  late-settle line must disappear on the golden-runner lane; merge proves
  nothing.

- **F173 · OPEN — live confirm owed. (STEP 2)** non-uuid identity guard code
  merged @`194f6a8` (LOG-TRUTH-1). Operator read owed: has the 22P02 template
  error stopped since the `194f6a8` deploy? If still present, open a new item.

- **F129 · OPEN — CRITICAL PATH. (STEP 3)** router-ab lens: no UI/API trigger;
  token cap still a code constant, not a governed `quota.*` param. It already
  computes per-arm "did the arm reach the tools the turn actually used" —
  **Recall@k unnamed**. Also the ablation rig for v1_3 §7 (frozen map = floor
  arm, synthetic corpus = fixed input). Trigger + governed cap = STEP 3's
  deliverable, on the widened (F174-breadth) corpus; S62-2 gate — unskippable.

- **F175 · OPEN — DESIGN-APPROVED@v1_3 (2026-07-25); build gated by §8.** The
  clarification catch-all, root-caused S62: gate runs AFTER the whole pipeline
  and BEFORE the model (`chat.ts:188→241→268`); fires on
  `entity_ref.length>0 && resolvable===0` (all-or-nothing HIGH, replaces
  generation); `stageClarify.ts:97` `if (frame.object !== 'FACTORY' || …)
  return;` ⇒ registry resolver never ran for non-FACTORY subjects — live proof
  07:58:05: `object=EMPLOYEE`, `entity_ref=[Ganit fabrikası, sırlama 3-4-5,
  4-12 vardiyası]`, `resolved=[]`; DL≤2 never got its chance at `Ganit→Granit`.
  Frame over-extracts non-entities (shift, line-range) into `entity_ref`. Gate
  structurally unreachable on the keyword floor (`stageClarify.ts:200`).
  Literature name: epistemic failure billed to the user as aleatoric ambiguity.
  **Approved remedy = A23 v1_3**: ⑤ diagnosis (τ/β → LINK/NIL/AMBIGUOUS;
  anchors; structural carrier test) · ⑥ execution decision (teşhis×taşıyıcılık;
  only "don't call the model" may cancel; scope question-gate) · ⑧ answering on
  resolved data + labeled uncertainty · deterministic attribution · **P3c =
  full-pipeline correction turn via the cross-turn carrier (D-N7/A-10) — ⑥
  never gets raw text** · turn_context flow · root spine · signal table as
  governed rows. Terminal marker lands when §8 steps 5–6 ship and the live
  re-run of the owner's 10 turns shows the six dead turns surviving.

- **F176 · OPEN (low) — `rule26` local flake, `api/admin/rules.ts`.** 39/40
  locally under 7-worker parallelism, 2/2 clean isolated, untouched by
  LOG-TRUTH-1, CI's own rule26 job passed. Second instance of the PANE-SCROLL
  class (different file). Belongs with PANE-SCROLL-2's permanent CI-worker root
  cause; no band-aid (S61-2).

- **F177 · OPEN (low) — learned keyword map FROZEN and UNMEASURED. (STEP 6)**
  Learning suppressed on the frame path (`stageTools.ts:494` learn suppressed
  basis=frame); semantic branch records proposals only (`toolCategories.ts:875
  /:1017`, path==='semantic'). Learning dropped from authority to proposal —
  sound (protects the A/B lens). Unnamed consequence: the outage floor is
  frozen AND untested insurance; `routerAbLens` can measure it, F129 blocks
  the trigger. UNVERIFIED (do not premise): (a) why `proposals=[]` on the
  owner's turns; (b) whether a `router_proposals` review surface exists, who
  reviews, row count. One-session Architect reads. A23 v1_3 A-4 binds the map's
  future: stays as floor, loses the learning-target role.

- **F178 · OPEN — completeness guard enforces the WRONG predicate.**
  `spanIOCompleteness` checks spans are FILLED, not that they ARRIVED nor
  ARRIVED IN TIME. FULL-TRACE violated ≥3 consecutive deploys on the
  golden-runner lane while CI stayed green. After the live read the failure
  class is **UNBOUNDED DELAY, not loss** — a span arriving one cron period late
  serves observability as badly as absence. The guard itself is a Class-E
  candidate. Remedy: arrival+timeliness assertions with a deliberate-late
  companion proving the checker can fail (E2 liveness). Fold into the next
  observability round; **first evidence = F169's post-fix re-read.**

- **F179 · OPEN — synthetic injector runs OUTSIDE FULL-TRACE.**
  `runSyntheticInjectorTick.ts` contains no `forceFlush` at all (grep-verified
  absent) — not mispositioned like F169, never wired. K1's evidence lane runs
  outside the mandate that makes evidence trustworthy. Same round as F178.

- **F180 · OPEN — LB-11: untrusted tool-output injection hardening UNVERIFIED
  at rev 142.** ARDICTECH flags it unverified at rev 61 and rev 70; repo greps
  at `194f6a8` return synthetic-injector homonyms; `safety.ts`/`promptFloor.ts`
  are prompt governance, not tool-output hardening. Positive verification read
  owed (grep is weak — absence NOT asserted). If truly absent: fleet-wide risk
  once one core serves N products. Separate read; not bundled with the obs
  round.

- **F171-B · NAMED DEFERRAL (B5, behind the freeze) —** unify the two language
  policies. Deterministic messages follow `ctx.language`; the model's prose
  follows the user's message language because `api/cwf/_lib/prompt/**` contains
  NO language instruction (grep-verified). Honoring one policy needs a
  `prompt.segment` publish → freeze. Do not drop.

- **F153 · OPEN (external ops PARK) —** Superset returns
  `http://0.0.0.0:8080/...` base URLs — Superset deployment config
  (armes-reports2), NOT CWF; breaks explore links if surfaced. Kale/ARDIC ops.

- **F158 · OPEN —** render-layer empty≠zero gap: model-authored table cell
  showed Glazur1 "0" while prose honestly said "veri bulunamadı"; grounding
  didn't scan the table surface. Small fix; B5 or an early batch.

- **F160 · OPEN (VIZ family) —** multi-series single chart (per-line OEE)
  unsupported — model fetched data, honestly offered table/per-line
  alternatives. VIZ-BIND evolution lane.

- **F164 · OPEN-LATENT —** Superset search/find robustness: model builds
  inconsistent search terms; Superset search is substring/exact-ish, no
  fuzzy/normalized match. Not triggered on the current Granit-populated
  instance; would bite a multi-factory Superset.

- **F165 · OPEN (minor, B5) —** unbounded "list everything" exhausts the
  tool-round budget (maxToolRounds=16, silentFinish); model stops HONESTLY;
  budget-exhaustion message renders in English (i18n).

- **F166 · OPEN (VIZ-BIND lane, AFTER B3) —** cross-turn viz binding: a
  follow-up "chart these" references a PRIOR turn's tool result; binder is
  turn-scoped, current turn's rawToolResults empty → honest "not available to
  chart" panels ×5 (trace fa62a5fb). Polarity CORRECT (no F82), UX broken.
  Directions: (A) re-fetch · (B) attributed carry-forward (C1-LAW care).
  **Memory must NEVER be a viz data source.** B3 design note must be written
  F166-aware. **Note:** the cross-turn carrier (A-10) is adjacent but NOT a viz
  source — do not conflate.

- **F172 · OPEN (low) —** first published tool_doc overlay is TAUTOLOGICAL
  ("Hat duraklarının listesini döndürür."). Pipeline proof complete; knowledge
  contribution zero. Value begins when it states what the SERVER does not know.
  Candidate content: `reasonSource` semantics · `stopType null` = unplanned vs
  not-entered · whether `KB7_StopAlternative` is a real stop or an accounting
  record. Owner-owned; a v2 publish closes it.

- **blind_spot row option · MOOT** under the coverage-is-config law — do NOT add.

## 6 · RULES / RECORDS
All prior rules survive by name (corpus in KB v63 + live docs). Standing:
- **S63-1 — MERGE IS NOT PROOF; LIVE MEASUREMENT IS.** Every fix phase names
  its post-deploy proof read. (First scheduled application: F169, STEP 1.)
- **S63-2 — THE REGISTER IS SELF-SUFFICIENT.** Full wording for every OPEN item
  every version; pointers only to terminal-marked items and LIVE working-set
  docs.
- **S64-1 (NEW, readability) — DENSE VISUALS MUST BE LEGIBLE AT CONTAINER
  WIDTH.** A single dense SVG scaled to page width can drop text below
  legibility; for high component density prefer native-text HTML layout over a
  scaled single SVG. Extends RULE-26 (non-clipping) with legibility. Born:
  component v1_1 unreadable → v1_2 re-format (owner-caught).
- **Stage C approval recorded** (2026-07-25, two bindings) — do not re-ask.
- **D-N7 / A-10 recorded** (2026-07-25) — P3c is a full-pipeline turn; ⑥ never
  gets raw text; cross-turn carrier is a binding constraint on the ⑤/⑥ build.
- **Binding-artifact rule:** the design note binds; summaries do not.

**ARCHITECT PREMISE-ERROR TALLY (arc S59→S64 = 20):** (1)–(17) carried by name
from v64 §6. NEW:
- **(18)** SOTA Tier-3 called the confidence-carrying single-turn blackboard
  "novel-in-form" — narrowed by the GWT/Goyal-Bengio anchor: the
  shared-workspace-attention STRUCTURE is not novel; only the
  deterministic-governed-intra-turn discipline is. Surfaced by the owner's
  attention question, corrected by Architect research.
- **(19)** The drawn P3c feedback arrow entered ⑥ directly — contradicts the
  Architect's own D-N3 (⑥ cannot parse raw text). **OWNER-CAUGHT.** Fixed via
  D-N7/A-10.
- **(20)** "A single dense SVG will render legibly" — false; component v1_1 was
  unreadable when scaled. **OWNER-CAUGHT** (format premise). Fixed via v1_2 +
  S64-1.
Discipline note: #15–#17 were Architect-self-caught; **#19 and #20 were
OWNER-caught — S64 broke the self-caught streak.** Lesson: high-volume artifact
production reintroduces the verification gap that independent review closes;
apply the same skepticism to my own new artifacts that RULE-25 applies to AG's.

## 7 · WATCHES / PARKED
- **NEW · test-file count delta:** register 353 vs Architect grep 355 @194f6a8
  (identical tree ⇒ counting method; CI/S37-2 is the arbiter; not load-bearing).
- PANE-SCROLL Replay CI-flake (+F176 second instance) — permanent fix =
  PANE-SCROLL-2 / CI-worker root cause; no band-aid.
- Vercel MCP log technique (load-bearing): deploymentId + ≤30 min for detail;
  `group_by=requestPath` fast path; ONE distinctive content word.
- Supabase 522 (2026-07-23) — architecture vindicated; watch recurrence.
- `seed_state` 23505 benign-by-design, will increase. docVersion rev 142
  unchanged (no reseal — no code).
- Stale-branch sweep owed: `obs-trace-2b` · `flake-sweep-1` · `pane-scroll-1/2`
  · `hotfix/f152`.
- Keyword stopword-learning evidence window ~Aug 2 (map frozen anyway — F177).
- EAIP index staleness: A1 brick doc anchors CWF at `b753783`/rev 70 vs live
  rev 142. PORT (31/56 · 47 · 90 @194f6a8) closes their §8-8 — owner-owned
  optional export.
- RULE-27 amendment owed: Langfuse traces are EAIP Class C — the per-instance
  (env-driven) endpoint is a CONTRACT clause; write it explicitly next obs round.
- map v3 §6 stale (says live register = v62); v65 is live (bootstrap overrides;
  fix at next map edit → v4).
- **Architecture archive:** v1 HTML (immutable, not in project) + v1_2
  understanding-layer + un-prefixed component v1 & sequence v1 + component v1_1
  all superseded by the A23 set — confirm they are archived (§9).

## 8 · OWED AT S65 OPEN — dependency-ordered (= execution runbook STEP 1–6)
1. **F169 HOTFIX (STEP 1)** — Architect authors the gated prompt (profile §5);
   AG builds; CI = blocking STEP 1 (S62-3); **proof of done = post-deploy
   `[Obs]` re-read, late-settle gone (S63-1)**.
2. **F173 live confirmation (STEP 2)** — Operator: 22P02 stopped since
   `194f6a8`? (parallel with STEP 1).
3. **MEASURE (STEP 3)** — publish the 8 v2 utterances + widen (F174 residue) →
   Recall@k baseline + current gate-behavior baseline on the widened corpus
   (F129; S62-2 gate — unskippable). This is the step that turns the SOTA
   claim from design-grade into empirical.
4. **turn_context skeleton (STEP 4)** (A23 v1_3 §9-2).
5. **⑤+⑥ phase (STEP 5)** — τ/β + anchors + three behaviours + scope gate +
   deterministic attribution + **cross-turn carrier (A-10)** + P3c
   (A23 v1_3 §9-3; Stage C approved ✓). Operator migrations (governed tables).
6. **F177 reads → B3 / MEMORY-1 design note (STEP 6)** — F166-aware +
   ARDICTECH-bound + carrier-aware (§3). F178/F179 fold into the next
   observability round; F180 is a separate read.

## 9 · YOUR ACTION ITEMS (owner, at v65 write / S64 close)
- **Add to the project (5 files):** this register `v65` ·
  `CWF-SESSION-GRAPH-KB-v63` · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v63` ·
  the three A23 architecture docs + the runbook (if not already uploaded:
  `A23_cwf-understanding-layer-architecture-v1_3` ·
  `A23_cwf-target-component-architecture-v1_2` ·
  `A23_cwf-turn-sequence-target-v1_1` · `A23_cwf-execution-runbook-v1`).
- **Delete (now archive):** `cwf-open-items-register-v60/61/62/63/64` (5) ·
  `CWF-SESSION-GRAPH-KB-v62` · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v62` ·
  `cwf-understanding-layer-architecture-v1_2` · the un-prefixed
  `cwf-target-component-architecture-v1` & `cwf-turn-sequence-target-v1` ·
  `A23_cwf-target-component-architecture-v1_1`.
- To start S65: paste bootstrap `v63` into a fresh session.
- **No decision owed** (F174 closed; architecture locked).
- **Optional, owner-owned:** freeze the SOTA verdict as
  `A23_cwf-sota-benchmark-vs-industry-v1.md` · F172 v2 overlay · PORT-export to
  the EAIP side · one `cwf_prod` distillation turn to recover F-BW11/12/13.

<!-- END · cwf-open-items-register-v65 · 2026-07-25 -->
