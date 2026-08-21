# CWF — Open Items Register · v64
<!-- cwf-open-items-register-v64 · 2026-07-25 · amends v63 after S63
     ("ARCHITECTURE + LEDGER SELF-SUFFICIENCY DAY"). GOLDEN LEDGER: append-only;
     items leave ONLY via a terminal marker (CLOSED@evidence / SUPERSEDED-BY /
     MERGED-INTO); carry-diff pasted in §0.
     S63-2 (NEW LAW, effective THIS version): the register is SELF-SUFFICIENT —
     every OPEN item carries its FULL wording in every version. Back-pointers
     are legitimate ONLY toward terminal-marked items and LIVE working-set docs
     (master plan, ADRs, v1_2 architecture). No pointer may target a superseded
     register. After this version is uploaded, v60/v61/v62/v63 are archive and
     may be deleted. -->

## VERIFIED FLOOR (v64 / S63 close)
master `194f6a86831c215952feaba8e9df3ac00b32d364` · rev 142 · **353 test files
/ 3735 tests** · 56 migrations · **ZERO pending migrations** · drift `[OK]` ·
docVersion "rev 142 · 2026-07-23". **UNCHANGED from v63 — S63 merged NO code.**
S63 was a pure Architect session: design + hygiene + live reads. No AG phase,
no Operator migration.
**Deploy:** `dpl_B9dAqv53ctQGGJuY8zPkd1N7JegQ` = **READY**, target=production,
SHA `194f6a8` — confirmed via Vercel MCP `list_deployments` (authoritative per
tooling note). BORÇ-1 of bootstrap v61 discharged (§5 F169 for the read).

## 0 · CARRY-DIFF PROOF — v63 → v64
- **OPENED:** F178 · F179 · F180 (full text §5).
- **STATUS CHANGED:** F169 (mechanism now LIVE-PROVEN; v63's "spans lost"
  claim CORRECTED — see §5 and tally #15; fix authored, **still not sent**) ·
  F175 (**DESIGN-APPROVED@v1_2** — Stage C owner-approved 2026-07-25 with two
  bindings; build gated by §8) · F174 (**elevated to CRITICAL PATH**) · F173
  unchanged (code merged @194f6a8; live confirm still owed).
- **CLOSED via terminal marker:** none this session.
- **CARRIED with FULL WORDING below (S63-2):** F129 · F153 · F158 · F160 ·
  F164 · F165 · F166 · F171-B · F172 · F176 · F177 · blind_spot(MOOT) ·
  F-BW11/12/13 (§4 — with a disclosed wording loss).
- Check: every v63 item is present below OR carries a terminal marker.
  **"Absent without marker" set = EMPTY ✓ — now verifiable INSIDE this file.**

## 1 · v5_2 RELEASE TRACK — position + S63 record
GATE-0 ✓ → B1 ✓ → B2 ✓ → F163 ✓ → debt sweep ✓ → LOG-TRUTH-1 ✓ →
**UNDERSTANDING-LAYER TRACK: DESIGN CLOSED (v1_2 approved+uploaded)** →
F169 fix round → MEASURE (F129+F174) → ⑤/⑥ build → B3 Memory (MEMORY-1,
F166-aware + ARDICTECH-constrained design note FIRST) → F166 → B4 → B5 → B6 →
B7 → Path B.

**S63 record (evidence in KB v62):**
1. **BORÇ-1 discharged** — prod `[Obs]` read on the READY deploy; S62 diagnosis
   2/3 confirmed, 1/3 refuted-and-sharpened (F169 below).
2. **Owner rulings:** `CWF-DEMO` has NOTHING to do with this project (never
   raise it); `cwf_prod` = real prior architectural history; `EAIP-1` =
   platform detail (owner preparing its distillation).
3. **Memory established:** 13 durable items in Claude memory; `memory` file
   retired; session state NEVER carried in memory (item 12).
4. **Working-set sweep:** v2 map, bootstrap v60, KB v60, LOG-TRUTH-1 prompt,
   register v59_7, `memory` deleted; registers v60/v61 temporarily uploaded to
   restore the pointer chain — consumed by this version, now archive.
5. **`cwf-prod-lineage-KB-v1` read** — five-class load-bearing inventory;
   its §6 finding corrected by live measurement (F178); F179 minted from its
   E2; §9 partials narrowed ("Pişmiş Stok" heading is NOT render-authored;
   banner contradiction largely refuted — clarify turns truly have
   toolCallCount=0).
6. **`ARDICTECH_Load_Bearing_Core_v1_0` read** — PORT measured at `194f6a8`:
   `auth.users` → **31/56 migrations, 47 refs**; `auth.uid()` → **90** policy
   expressions. SC-2 = RLS-surface rewrite, not a library swap. B3 constraints
   derived (§3). LB-11 → F180. A1 brick doc anchors CWF at rev 70 = stale
   index (watch §7).
7. **Six design nodes resolved with the owner (D-N1…D-N6)** and folded into
   **`cwf-understanding-layer-architecture-v1_2`** (uploaded, live, BINDING —
   summaries are not; the third-model summary drifted 3× : silent-LINK,
   map-removal, command-semantics). **Stage C OWNER-APPROVED 2026-07-25** with
   two bindings: deterministic attribution (model never writes it) +
   single-turn correctability (P3c is part of C).

## 2 · 🧊 GOLDEN FREEZE — engaged, unchanged. Lifts at B5.
Golden-runner 1075/18h watch unchanged. Frozen-surface definition lives in
**`cwf-master-plan-v5_2` §1 (LIVE doc — legitimate pointer under S63-2)**;
`prompt.segment` publishes remain blocked. Consequences honored this session:
v1_2 A-1 (router types NOT via prompt) · F171-B stays behind the freeze.

## 3 · REMAINING SPINE — full status
- **B3 Memory (NEXT after understanding-layer steps 1–6 of §8):** MEMORY-1
  design note, **F166-aware** + **ARDICTECH-bound**: episodic tables carry NO
  FK to `auth.users` (S33-1 stays Supabase-shaped for existing tables; NEW
  memory tables use profile-derived actor identity); tenant boundary from
  profile; retention from the Class-C contract; memory NEVER a viz data source.
- **B4** RAG connection (master plan §1).
- **B5** freeze lift + security cleanup: `mcp_settings` 6/6 raw→apiKeyRef +
  ksadmin's 2 stale personal rows + F171-B + F165 + render/i18n batch.
- **B6** architecture close · **B7** (master plan §1).
- **Path B** = IR-4 FUTURE-STATE contract (`cwf-ir-pathb-hybrid-logic-v1_3`,
  live doc). **The understanding layer is its PRECONDITION** (morphology dies
  in Path A). **Owed at next Path B touch:** mint v1_4 with the ALT-A split —
  ALT-A₁ alias-unresolved (epistemic → inform) · ALT-A₂ frame-ambiguous
  (aleatoric → offer options) — per v1_2 ⑥ behaviours.

## 4 · BOARD-WALK — F-BW01-10 CLOSED · **F-BW11/12/13 OPEN**
**Disclosed loss (S63-2's motivating failure, second instance):** their full
wording lived only in v59_7 §4, deleted this session on the Architect's advice;
that advice rested on grep MATCH-COUNTS, not read wording (tally **#17**).
Carried OPEN by name; re-homed to **B5 or an early-B3 batch** (v60 ruling).
**Recovery path:** one owner distillation turn in `cwf_prod` (as done for the
lineage KB) OR re-derivation during the re-homed batch walk. Owner's
"ASLA unutma" stands — the names survive; the wording debt is explicit.

## 5 · FINDINGS — full wording, every open item

- **F169 · OPEN — mechanism LIVE-PROVEN; fix authored; NOT SENT.**
  Prod `[Obs]` on `dpl_B9dAqv53…` (every cron tick, 30-min window):
  `flush cold=false pending=1 scrub=in-time(0ms) digest=in-time(0ms)
  langfuse=never(5000ms)` followed by `late-settle langfuse=ok(59361ms)`.
  Settle times cluster at **59.3/59.7/60.0/60.2 s = exactly the cron period**;
  ~120 s = two periods frozen; ~34 s = container woken early by another call.
  ⇒ export waits not on network but on **the next tick unfreezing the
  container**. S62 diagnosis: WARM ✓ · langfuse-named ✓ · "never settles" ✗ —
  **REFUTED AND SHARPENED: spans are NOT lost; they are delayed ~1 cron period
  and delivered** (lost only if the container is retired before next wake).
  v63 §5's "those spans are lost as well" is hereby CORRECTED (tally #15).
  Three-endpoint table stands (chat.ts:348 pre-end 0 fail · eval-ci.ts:222
  pre-json 0 fail · golden-runner.ts finally post-json ≥82 % fail).
  **Fix (exact):** golden-runner flush moves INSIDE `try`, BEFORE
  `res.status(200).json(result)`, **awaited**, byte-pattern of eval-ci.ts:222
  ("RULE 27: flush spans BEFORE responding"); the `finally` flush is removed
  entirely — its `claimed>0 → await` branch is equally post-response, so
  "move the line up" is NOT the fix, both branches relocate. HOTFIX profile:
  single file, no api/shared/migration/security surface,
  `OTEL_FLUSH_TIMEOUT_MS` NOT widened. `waitUntil` remains the reserved floor.
  **Proof of done (S63-1):** post-deploy `[Obs]` re-read — the late-settle
  line must disappear on the golden-runner lane; merge alone proves nothing.

- **F174 · OPEN — NOW CRITICAL PATH.** Synthetic ceiling caps the K1 data
  gate and the lever is the QUESTION SET, not the ceiling. Verified:
  `synthetic.dailyTokenCeiling`=200 000 (governed, `agentParams.ts:389`) ·
  `ratePerMinute`=5 (live) · cost/injection=**400 CONSTANT ESTIMATE**
  (`runSyntheticInjectorTick.ts:33`; `tokensToday` = rows×400, a CLAIM not
  metered spend — TOTAL-45 flag) · day rolls 00:00 UTC ⇒ exactly 500
  injections/day, ceiling hit ~01:39 UTC, idle ~22.4 h. Authored set =
  **29 utterances ⇒ ~17 repetitions/day: measures classifier STABILITY, not
  COVERAGE.** Raising the ceiling buys repeats, not coverage — publish the 8
  authored v2 utterances (`cwf-synthetic-question-set-v2-additions-v1`) and
  widen. UNVERIFIED: live `synthetic.activeSetId` row count (29 is from the
  doc). **Why critical path now:** v1_2 §7's whole-outcome column
  (useful-turn rate) and the labeled eval baseline are UNMEASURABLE on a
  17×-repeated 29-question corpus. **Owner decision owed: breadth vs ceiling.
  Architect's committed recommendation: BREADTH.**

- **F175 · OPEN — DESIGN-APPROVED@v1_2 (2026-07-25); build gated by §8.**
  The clarification catch-all, root-caused in S62: gate runs AFTER the whole
  pipeline and BEFORE the model (`chat.ts:188→241→268`); fires on
  `entity_ref.length>0 && resolvable===0` (all-or-nothing HIGH, replaces
  generation); `stageClarify.ts:97` `if (frame.object !== 'FACTORY' || …)
  return;` ⇒ registry resolver never ran for non-FACTORY subject domains —
  live proof 07:58:05: `object=EMPLOYEE`, `entity_ref=[Ganit fabrikası,
  sırlama 3-4-5, 4-12 vardiyası]`, `resolved=[]`; DL≤2 never got its chance at
  `Ganit→Granit`. Frame over-extracts non-entities (shift, line-range) into
  `entity_ref`. Gate structurally unreachable on the keyword floor
  (`stageClarify.ts:200`). Literature name: epistemic failure billed to the
  user as aleatoric ambiguity. **Approved remedy = v1_2**: ⑤ diagnosis
  (τ/β → LINK/NIL/AMBIGUOUS; anchors; structural carrier test) · ⑥ execution
  decision (teşhis×taşıyıcılık table; only "don't call the model" may cancel;
  scope question-gate) · ⑦ answering on resolved data + labeled uncertainty ·
  deterministic attribution · P3c single-turn correction · turn_context flow ·
  root spine (discriminator vs scope roots) · signal table as governed rows.
  Terminal marker lands when §8 steps 4–6 ship and the live re-run of the
  owner's 10 turns shows the six dead turns surviving.

- **F176 · OPEN (low) — `rule26` local flake, `api/admin/rules.ts`.** 39/40
  locally under 7-worker parallelism, 2/2 clean isolated, untouched by
  LOG-TRUTH-1, CI's own rule26 job passed. Second instance of the
  PANE-SCROLL class (different file). Belongs with PANE-SCROLL-2's permanent
  CI-worker root cause; no band-aid (S61-2).

- **F177 · OPEN (low) — learned keyword map FROZEN and UNMEASURED.**
  Learning suppressed on the frame path (`stageTools.ts:494` learn suppressed
  basis=frame); semantic branch records proposals only (`toolCategories.ts:875
  /:1017`, path==='semantic'). Learning dropped from authority to proposal —
  sound (protects the A/B lens). Unnamed consequence: the outage floor is
  frozen AND untested insurance; `routerAbLens` can measure it, F129 blocks
  the trigger. UNVERIFIED (do not premise): (a) why `proposals=[]` on the
  owner's turns; (b) whether a `router_proposals` review surface exists, who
  reviews, row count. One-session Architect reads (§8-7). v1_2 A-4 binds the
  map's future: stays as floor, loses the learning-target role.

- **F178 · OPEN (NEW) — completeness guard enforces the WRONG predicate.**
  `spanIOCompleteness` checks spans are FILLED, not that they ARRIVED nor
  ARRIVED IN TIME. FULL-TRACE was violated ≥3 consecutive deploys on the
  golden-runner lane while CI stayed green. Correct statement after the live
  read: the failure class is **UNBOUNDED DELAY, not loss** — and a span
  arriving one cron period late serves observability as badly as absence.
  The guard itself is a Class-E candidate (lineage KB §6). Remedy direction:
  arrival+timeliness assertions with a deliberate-late companion proving the
  checker can fail (E2 liveness pattern). Fold into the next observability
  round; first evidence = F169's post-fix re-read.

- **F179 · OPEN (NEW) — synthetic injector runs OUTSIDE FULL-TRACE.**
  `runSyntheticInjectorTick.ts` contains no `forceFlush` call at all
  (grep-verified absent) — not mispositioned like F169, never wired. K1's
  evidence lane runs outside the mandate that makes evidence trustworthy.
  Same round as F178.

- **F180 · OPEN (NEW) — LB-11: untrusted tool-output injection hardening
  UNVERIFIED at rev 142.** ARDICTECH flags it unverified at rev 61 and rev 70;
  repo greps at 194f6a8 return synthetic-injector homonyms; `safety.ts` /
  `promptFloor.ts` are prompt governance, not tool-output hardening. Positive
  verification read owed (grep is a weak instrument — absence NOT asserted).
  If truly absent: fleet-wide risk once one core serves N products. Separate
  read; not bundled with the obs round.

- **F129 · OPEN — CRITICAL PATH (§8-4).** router-ab lens: no UI/API trigger;
  token cap still a code constant, not a governed `quota.*` param. It already
  computes per-arm "did the arm reach the tools the turn actually used" —
  **Recall@k unnamed**. Also the ablation rig for v1_2 §7 (frozen map = floor
  arm, synthetic corpus = fixed input). Trigger + governed cap = step 4's
  deliverable.

- **F172 · OPEN (low) —** first published tool_doc overlay is TAUTOLOGICAL
  ("Hat duraklarının listesini döndürür."). Pipeline proof complete; knowledge
  contribution zero. Value begins when it states what the SERVER does not
  know. Candidate content from live logs: `reasonSource`
  (GLAZUR/PACKAGING/POLISHING) semantics · `stopType null` = unplanned vs
  not-entered · whether `KB7_StopAlternative` ("Alternatif Hat Kullanımı") is
  a real stop or an accounting record. Owner-owned; a v2 publish closes it.

- **F171-B · NAMED DEFERRAL (B5, behind the freeze) —** unify the two
  language policies. Deterministic messages follow `ctx.language`; the
  model's prose follows the user's message language because
  `api/cwf/_lib/prompt/**` contains NO language instruction (grep-verified).
  Honoring one policy needs a `prompt.segment` publish → freeze. Do not drop.

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
  instance; would bite a multi-factory Superset. (KB7 0-result was a TRUE 0
  for the config; catalog enumeration was TRUNCATED at chart page 12/20 — no
  completeness claim.)

- **F165 · OPEN (minor, B5) —** unbounded "list everything" exhausts the
  tool-round budget (maxToolRounds=16, silentFinish); model stops HONESTLY;
  budget-exhaustion message renders in English (i18n).

- **F166 · OPEN (VIZ-BIND lane, AFTER B3) —** cross-turn viz binding: a
  follow-up "chart these" references a PRIOR turn's tool result; binder is
  turn-scoped, current turn's rawToolResults empty → honest "not available to
  chart" panels ×5 (trace fa62a5fb). Polarity CORRECT (no F82), UX broken.
  Directions: (A) re-fetch · (B) attributed carry-forward (C1-LAW care).
  Memory helps only A indirectly; **memory must NEVER be a viz data source**.
  B3 design note must be written F166-aware.

- **blind_spot row option · MOOT** under the coverage-is-config law — do NOT
  add.

## 6 · RULES / RECORDS
All prior rules survive by name (corpus in KB v62 + live docs). **NEW:**
- **S63-1 (standing) — MERGE IS NOT PROOF; LIVE MEASUREMENT IS.** A merged
  fix has not started carrying load until a production read shows the symptom
  gone. Born: lineage KB §6 (three green deploys under a violated mandate) +
  the F169 live read. Every fix phase now names its post-deploy proof read.
- **S63-2 (standing, effective v64) — THE REGISTER IS SELF-SUFFICIENT.**
  Full wording for every OPEN item in every version; §2/§3/§4 carry their own
  status; pointers only to terminal-marked items and LIVE working-set docs.
  Born: the v62→v61→v60→v59_7 chain break found and (partially) paid for this
  session — see §4's disclosed loss.
- **Stage C approval recorded** (2026-07-25, two bindings) — do not re-ask.
- **Binding-artifact rule reaffirmed:** the design note binds; summaries do
  not (third-model drift ×3 caught this session).
**ARCHITECT PREMISE-ERROR TALLY (arc S59→S63 = 17):** (1)–(14) carried by
name from v63 §6. NEW:
- **(15)** v63 §5's "the claimed>0 spans are lost as well" — falsified by the
  live read (delayed, delivered). **First tally entry to cross an artifact
  boundary**: it shipped into a governed register and was corrected one
  session later by measurement — the exact gap S63-1 now closes.
- **(16)** SOTA doc §10's "A1 first" ordering — rested on the unstated
  premise that NIL⇒cancel is immutable; v1_2 §9 corrects (A4+C first, its
  superset).
- **(17)** "v59_7 safe to delete — its content is in v61" — grep MATCH-COUNTS
  treated as full-wording presence; falsified while writing this version;
  cost = F-BW11/12/13 wording (recovery path named in §4).
Discipline note: #15–#17 were all caught by the Architect's own verification
of the Architect's own prior work.

## 7 · WATCHES / PARKED
- PANE-SCROLL Replay CI-flake (+F176 second instance) — permanent fix =
  PANE-SCROLL-2 / CI-worker root cause; no band-aid.
- Vercel MCP log technique (load-bearing): deploymentId + ≤30 min for detail;
  `group_by=requestPath` fast path; ONE distinctive content word.
- Supabase 522 (2026-07-23) — architecture vindicated; watch recurrence.
- `seed_state` 23505 benign-by-design, will increase. docVersion rev 142
  unchanged this session (no reseal — no code).
- Stale-branch sweep owed: `obs-trace-2b` · `flake-sweep-1` ·
  `pane-scroll-1/2` · `hotfix/f152`.
- Keyword stopword-learning evidence window ~Aug 2 (map frozen anyway — F177).
- **NEW · EAIP index staleness:** A1 brick doc anchors CWF at `b753783`/rev 70
  vs live rev 142. PORT measurement (31/56 · 47 · 90 @194f6a8) closes their
  §8-8 — owner-owned optional export to the EAIP side.
- **NEW · RULE-27 amendment owed:** Langfuse traces are EAIP Class C — the
  per-instance (env-driven) endpoint is a CONTRACT clause, not an accident;
  write it explicitly at the next observability round.
- **NEW · map v3 §6 stale:** says live register = v62; v64 is live (bootstrap
  v62 overrides; fix at next map edit → v4).
- **NEW · architecture v1 (HTML)** immutable, NOT in the project — superseded
  by v1_2 (uploaded). ALT-A₁/A₂ family naming preserved in v1 §4 + this
  register §3.

## 8 · OWED AT S64 OPEN — dependency-ordered
1. **F169 HOTFIX phase** — Architect authors the gated prompt (profile in §5);
   AG builds; CI = blocking STEP 1 (S62-3); **proof of done = post-deploy
   `[Obs]` re-read, late-settle gone (S63-1)**.
2. **F173 live confirmation** — Operator read: 22P02 template stopped since
   `194f6a8` deploy?
3. **F174 owner decision** — breadth vs ceiling (recommendation: BREADTH).
   Blocks the baseline corpus.
4. **MEASURE** — F129 trigger + governed cap: Recall@k baseline + current
   gate-behavior baseline on the widened corpus (v1_2 §9-1; S62-2 gate —
   unskippable).
5. **turn_context skeleton** (v1_2 §9-2).
6. **⑤+⑥ phase** — τ/β + anchors + three behaviours + scope gate +
   deterministic attribution + P3c (v1_2 §9-3; Stage C approved ✓).
7. **F177 reads** — `proposals=[]` why; review surface; row count.
8. **B3 / MEMORY-1 design note** — F166-aware + ARDICTECH-bound (§3).
   F178/F179 fold into the next observability round; F180 is a separate read.

## 9 · YOUR ACTION ITEMS (owner, at v64 write / S63 close)
- **Add to the project:** this register `v64` ·
  `CWF-SESSION-GRAPH-KB-v62` · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v62`.
- **Delete (now archive under S63-2):** `cwf-open-items-register-v60` · `v61`
  · `v62` · `v63` · `CWF-SESSION-GRAPH-KB-v61` ·
  `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v61` — six files.
- To start S64: paste bootstrap `v62` into a fresh session.
- **Decision owed:** F174 breadth vs ceiling (recommendation: breadth).
- **Optional, owner-owned:** F172 v2 overlay · PORT-measurement export to the
  EAIP side · one `cwf_prod` distillation turn to recover F-BW11/12/13
  wording.

<!-- END · cwf-open-items-register-v64 · 2026-07-25 -->
