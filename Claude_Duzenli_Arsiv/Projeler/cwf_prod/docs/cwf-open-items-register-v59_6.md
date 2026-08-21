# CWF — Open Items Register · v59_6

<!-- cwf-open-items-register-v59_6 · rev 59.6 · 2026-07-22 · S57 CLOSE amend of
     the v59_2→v59_5 chain (each presented → immutable per S37-1 → mints the next,
     never in-place). DELTA vs v59_5 (two post-v59_5 events): (1) IR-3 phase
     AUTHORED + handed to AG (`claude-code-PHASE-IR-3-v1`, branch `ir-3`,
     precondition bad00f4, NOT on origin yet — AG working) · (2) synthetic
     injector STOPPED by owner (K1 answered → no longer gate-critical; 660 frames
     total). This is the S57 SESSION-CLOSE register. Session-close artifacts:
     register v59_6 · KB v56 · bootstrap v56. Supersedes v58 + interrupt v59.
     GOLDEN LEDGER RULE (Altın Kural): append-only; items leave ONLY via
     CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO; carry-diff pasted below; no
     summary-of-summary — every F-number, phase, gate, watch, parked entry
     survives BY NAME with essence + last-full-wording pointer. -->

## VERIFIED FLOOR (v59_4)
master **`bad00f4f6e81e2a7ab8f621fbe111bf140a2c7cb`** (Merge PR #97
GATE0-UI-BATCH-1) · docVersion **rev 128** · drift [OK] · ZERO pending migrations
(last applied = `20260721150000_synthetic_traffic.sql`, Operator-applied +
STATUS-flipped) · **325 test files** (~3392 tests, CI-arbitrated per
S37-2/S56-2). Merge lineage this session: `0636fd3` (S56 close) → `7d31793`
(SYNTH-TRAFFIC-1 PR#95) → `4415d64` (DOC-FLIP PR#96) → `bad00f4`
(GATE0-UI-BATCH-1 PR#97). Fresh-clone RULE-25 verified at each step (2026-07-21).
Actors: Architect=Claude ·
AG-A/AG-B=Claude Code on AntiGravity · Operator=Gemini+Supabase MCP
(`supabase db push` only, project `fjbrkimwvtpwoxhziidh`) · Owner=Maymun.

---

## 0b · v59_3 → v59_4 TERMINAL MARKERS (this amend)
- **GATE0-UI-BATCH-1 → CLOSED@bad00f4** (PR #97). Board-walk batch
  F-BW01/02/03/04/08/09/10 all LIVE: context persist + auto-select last turn
  (F-BW01) · page-head + card bodies default-collapsed (F-BW02/03) · digest
  legend + duplicate-trust dedupe (F-BW04/08) · render-decision derived view
  (F-BW09) · card-14 candidate-memory preview under honest banner (F-BW10).
  Rebased onto `4415d64` (head `42c90d0`), CI green first attempt (S56-2), merged
  `--no-ff`. Two AG-A deviations from FIX-1 ACCEPTED on review: rule26 locator
  `getByRole('listitem')`→`ol > li` (stronger structural invariant, `.toBe(15)`
  intact) + FIX-2 scoped 60s timeout (real root-cause: FIX-1's expand step + CI
  2-worker constraint — not a bare rerun, S55-1 clean). DigestLegend `<li>`→
  `<div>` fix also landed. Last-full-wording: `claude-code-PHASE-GATE0-UI-BATCH-1-v1`
  + `claude-code-GATE0-UI-BATCH-1-FIX-1-v1` + rebase instruction.
- **SYNTH-TRAFFIC-1 DOC-FLIP → CLOSED@4415d64** (PR #96): migration STATUS
  flipped to Operator-applied + live-verified; verifyGrants 54/0 (+2 deny-probes,
  zero leaks); branch deleted. Completes the SYNTH-TRAFFIC-1 close begun in
  v59_3 §6.
- **GATE-0 (v5_2 item):** (a) PANE-SCROLL-2 ✓ · (b) board-walk 00–14 + batch ✓
  → **only (c) owner "UI clean" word remains.** On that word, GATE-0 SEALS.
- v59_2/v59_3 items all carried; new: 5 stale merged branches (§8).
  Absent-without-terminal-marker: EMPTY.

## 0 · CARRY-DIFF PROOF (GOLDEN tooth #2) — v58 → v59_2
Every v58 item accounted for. Terminal markers minted this version:
- **F151 → CLOSED@0636fd3** (v58 §0/§1/§6 OPEN). The whole-pane-scroll defect
  closed across THREE merges: PANE-SCROLL-1 (`46813be`, PR #92 — one
  `PanelScroll(min-h-full)` on 10 panels; AG-B's uniform deviation from the
  Architect's A/B classification RATIFIED as superior) → HOTFIX-F152
  (`da279e0`) → PANE-SCROLL-2 (`0636fd3`, PR #94 — **G3 SCOPE RULING reversed by
  owner override**: `VSplit.tsx` DELETED (ProvidersTab last consumer),
  Providers/Routing document-flow, no-scroll-trap guard comprehensive across
  ALL 12 non-Stages panels incl. Rollout, dead vsplit allowlist cleaned;
  CHANGELOG `b3d09ba`). Monoblock DEAD. RULE-26 + pane-scroll e2e green.
  Last-full-wording: `cwf-pane-scroll-defect-design-v1` + the two phase prompts.
- **F152 → CLOSED@da279e0** (NEW+CLOSED within S56). PR #93 (`7b182f1` guard
  over-claim correction + `b4a440b` v1_2 intermittent-timeout root-fix). The
  Architect's "AdminPanel never imports RolloutTab" diagnosis was **WRONG** —
  AG-A tree-proved the import+render; Rollout RESTORED to the guard in
  PANE-SCROLL-2. Recorded in the premise-error tally (§7). Birth lesson =
  **S56-2** (partial-green merge).
- **F150 CLOSED@a6fd3df** · **FLAKE-SWEEP-1 CLOSED@31d456e** · **S55 docVersion
  watch RESOLVED@a6fd3df** · **v57-era branch cleanup DONE** — all four carried
  from v58 §0 with their full wording there (unchanged).
- **G3 SCOPE RULING → SUPERSEDED-BY owner override @0636fd3** (v58 §5 via v57):
  the VSplit fixed-viewport allowlist is dead with VSplit itself; the
  no-scroll-trap law now applies uniformly. (The RULING's historical record
  stays in v57/KB v54.)
- **Interrupt-skeleton register v59 (chat-embedded, S56 close) →
  SUPERSEDED-BY this v59_2** — same floor/content, full wording restored.
- **LEDGER archaeology (S57 boot, closes a silent gap):** **ENTITY-FLOOR-1**
  (S54-era design: factory-registry mirror + entity resolver + not-found
  mediation + ungrounded-refusal detector) → **MERGED-INTO IR-2** (`eddf83e`):
  the governed backend-scoped entity-alias kind + `resolveEntityAlias`
  (`'unresolved'`, never fuzzy-guess) + clarification contract ARE that design.
  Now terminally marked instead of silently absent.
- **LEDGER-VERIFY (open, small):** the S54 walkthrough's chart **X-axis
  tick-label density** observation is not carried under that name in v56–v58;
  believed folded into the freeze-staged viz-v4/F135 chart family — CONFIRM at
  freeze lift (BLOCK 5); if not covered, mint an F-number then.
- v58 §1 (SPINE) / §2 (FREEZE) / §3 (M-WAVES) / §4 (PARKED+WATCH+BOARD-WALK) /
  §5 (RULES) / §6 (FINDINGS) — **all carried below BY NAME.**
- **Absent-without-terminal-marker check: EMPTY.**

NEW items minted across v59_2/v59_4: **F-BW01…F-BW11** (§4; F-BW10 card-14 +
F-BW11 seed-on-view added in v59_4) · **SYNTH-TRAFFIC-1** (v59_2 in-flight →
**v59_4 CLOSED@7d31793 + injector live-verified**; DOC-FLIP the only residual) ·
**SYNTH-TRAFFIC-2** (named) · **v5_2 MUST-FOLLOW** · **S56-1 · S56-2** ·
premise-error tally +2 · durable-map ARMES correction · golden-runner 1075/18h
watch · S56 branch-hygiene list.
v59_2 → v59_4 carry-diff: F-BW10+F-BW11 added, SYNTH-TRAFFIC-1 flipped
in-flight→closed(+live-verified). Absent-without-terminal-marker: EMPTY.

---

## 1 · v5_2 RELEASE TRACK (MUST-FOLLOW rule book — `cwf-master-plan-v5_2.md`)
**GATE-0** "no UI crap" → **B1** IR (K1 → IR-3 flip → IR-4 contract) → **B2**
Superset E-activation → **B3** MEMORY-1/F48 + F83 arc → **B4** Kale-RAG →
**B5** cleanup + GOLDEN FREEZE LIFT → **B6** docs+arch → **B7** release close →
**Path B adjacent program** (Qdrant+bge-m3+OPA, contract =
`cwf-ir-pathb-hybrid-logic-v1_3`).
**Position (v59_4):** GATE-0 nearly SEALED — (a) PANE-SCROLL-2 ✓ · (b) board-walk
00–14 + batch fix F-BW01–10 ✓ (merged `bad00f4`) · (c) owner "UI clean" word =
the ONLY remaining GATE-0 step. On that word → BLOCK 1 (IR) fully opens; K1 data
motor (SYNTH-TRAFFIC-1) already LIVE and accumulating frames.
<!-- superseded detail below (v59_2 wording, kept for lineage) -->
**Position (v59_2):** GATE-0 partially complete — (a) PANE-SCROLL-2 ✓ · (b) cards 00–13
walked, **card 14 remains** · (c) "UI clean" NOT YET. B1's K1 data motor
(SYNTH-TRAFFIC-1) in flight. B2–B7 not started.

## 2 · 🧊 GOLDEN FREEZE (engaged, unchanged from v58 §2)
Staged: **viz v4 · safety.b1_scope v3 · tools.rule.1 v2 · tools.rule.6 v2**
(F140/F138/F139 stay OPEN) + **F133-L5** once minted + F83.1 golden sub-items.
Infra: **GOLDEN-BATCH-2 (F142) · BUDGET-HONEST-1 · GOLDEN-ASSIST-2 ·
SPECIMEN-HEALTH-1**. Carried whole: ksadmin replay-exempt quota records ·
S50-viz4 job ARCHIVED · W3b job SUPERSEDED-kept. Boundary (tree-proven S54):
golden batch fires ONLY for `prompt.segment`. No golden token spent in S56.
Lifts at BLOCK 5. **NEW freeze-period watch:** golden-runner **1075 calls/18h**
observed during the freeze — UNDIAGNOSED (freeze machinery should be idle);
investigate at BLOCK 5 before lift.

## 3 · REMAINING SPINE (v58 §1 carried whole, REORDERED per v5_2)
1. **K1 ratification (B1) → ANSWERED@S57.** The gate was DATA sufficiency (not
   the ~Aug 2 estimate). Answered from SYNTH-TRAFFIC-1 shadow frames (§6):
   enum-drop **3.45%**, confidence **93% HIGH**, **COMMAND live-proven 100%**
   (14/14 correct: DOWNTIME/LINE/SYSTEM), all-7-actions exercised via v1+gapfill.
   ONE taxonomy decision surfaced + RATIFIED (owner, S57): **QUERY_TOPOLOGY 3/4
   classified as QUERY_MASTER (incl. the taxonomy's own TOPOLOGY examples) →
   DECISION A: merge TOPOLOGY into MASTER (6 actions).** Evidence: router can't
   separate them live + the `(action×object)→category` derivation gives BOTH the
   identical `factory` category + zero downstream code branches on TOPOLOGY.
   → The merge is IR-3's first rider (below). Window-pool items ride the review.
2. **IR-3 — THE flip → IN FLIGHT with AG** (phase `claude-code-PHASE-IR-3-v1`
   authored S57 close, branch `ir-3`, precondition `bad00f4`, NOT on origin yet).
   6 gated sub-phases: G0 K1-A enum merge (QUERY_TOPOLOGY→MASTER, 3 sites) · G1
   build `deriveCategories.ts` (the (action×object)→category table — NOT in code
   today, only in the design doc) · G2 THE FLIP (frame→semantic→keyword primary,
   governed by reversible `router.frameRouting` param, ships DARK=false) · G3
   clarification ACTIVE (wire IR-2's built-but-unwired `computeClarification`) +
   ALT-D (COMMAND×F80 honest message = empty≠zero routing family 4th member) · G4
   `router.prompt` governed re-publish (owner consent-class, floor serves until
   published) · G5 riders · G6 seal. Freeze-independent. Going live after merge =
   separate owner-consented `router.frameRouting=true` publish + shadow compare.
   Original spine wording (frame→semantic→keyword primary; clarification ACTIVE;
   COMMAND×F80 honest message = ALT-D). **NEW RIDER (K1-A): delete
   `QUERY_TOPOLOGY` from the 3 enum sites — `semanticRouter.ts:170` prompt
   (DB-governed via resolveRouterPromptTemplate → may need a governed publish),
   `irFrame.ts:21` Zod enum, and the taxonomy-design derivation table (fold
   TOPOLOGY row into MASTER) — as IR-3's FIRST step (not a standalone phase; the
   flip already makes the derivation primary, so the merge is its natural part).
   `segmentIds.ts:11` "TOPOLOGY" is unrelated (segment-topology wording).**
   Other RIDERS: `semanticRouter.ts:179-181` stale "only ever floor" comment ·
   **F134** · **F146** (probe context + per-layer attribution lens) · **F147**
   (`GroundingViolation.backendId`) · enrichment 4th-tier sentence.
3. **IR-4** — Path B contract one-pager folded into IR-0. Zero build.
4. **Superset E-activation (B2)** — DB-first serve: `seedRules.ts` publish +
   `backend_id:'superset'` backfill; verify live via Vercel logs.
   Freeze-independent.
5. **MEMORY-1/F48 + F83 arc (B3)** — episodic memory stages 05+14; KB→web→
   write-back; F83.1 golden sub-items wait for B5 lift.
6. **Kale-RAG (B4)** — MCP backend ROW, external dependency; guidance delivered.
7. **B5 cleanup:** security-cleanup (mcp_settings 6/6 raw→apiKeyRef +
   DB-introspection endpoint) · FREEZE LIFT + staged publishes + golden-infra ·
   golden-runner diagnosis · dev-preview seam residuals · branch cleanup ·
   BOARD-WALK residuals · F-number tail carried by name: **F118 · F119 · F120 ·
   F135 · F122** (first `finishReason=error` watch) · **LANGFUSE-V4-UPGRADE** ·
   separate-POC-key belt · **STAGE-PLAYGROUND** · **LOG-2 (MERGED-INTO F83
   arc)** · LEDGER-VERIFY tick-density (§0).
8. **B6 docs+arch** (incl. durable-map ARMES=4-active/17-registered correction ·
   governance-replay explainer refresh-only-if-drifted) → **B7 close.**

## 4 · BOARD-WALK FINDINGS (`cwf-board-walk-findings-v1`, S56; full wording)
- **F-BW01 · OPEN** — Stage context resets on manual tab-switch + no auto-select
  of last turn. Picked-turn `snapshot` is StagesTab-LOCAL useState
  (`StagesTab.tsx:444`) → resets on unmount; deep-link path preserves it (F42
  turnRef via NavContext) = INCONSISTENT. First entry shows "bağlam ayarlanmadı"
  though `useLatestTurnTrace()` (:405) already resolves the last turn. Owner:
  (1) context SURVIVES manual return, (2) LAST turn auto-selected on first
  entry. Fix: lift turnId/snapshot into AdminPanel's existing context-lift
  pattern (AdminPanel.tsx:80, same as Rules filters/stageCardId/scrollY); seed
  `handlePickTurn` from latestTrace on empty first mount. Pure client
  state-lift; no table/migration/security surface.
- **F-BW02 · OPEN** — Page-head info blocks (`InlineHelp` :141-145 +
  `PanelPrimer` :203-204 in adminUi.tsx) default EXPANDED when no sessionStorage
  pref. Owner ruling (option a): GLOBAL default flip absent→COLLAPSED,
  everywhere; legacy 'dismissed'/'expanded'/'collapsed' values still honored.
  Single-file.
- **F-BW03 · OPEN** — In-card NE YAPAR / NASIL AYARLANIR bodies always-open
  (`StagesTab.tsx:277-278/:283`); the C-11 "… daha fazla" disclosure exists but
  only wraps the LOWER extras. Owner: make both bodies collapsible DEFAULT
  CLOSED via the same C-11 idiom. Confirmed on cards 03, 09 (♥), 10 — spans ALL
  cards.
- **F-BW04 · OPEN** — DB-read/digest tables unexplained (legend needed);
  enriched across cards 07/09/10/12. Legend must explain: table/op/rows
  semantics · "insert (not measured)" (inserts don't count rows) ·
  `seed_state` claim-probe (F-BW06) · `tierSummary` + **`superset:[]` =
  honest-absence, NOT a gap** (the ADR-001 Data Authority face — the single most
  valuable legend target) · `ai.*` no-I/O intentional (F-BW07 ruling-1: "I/O
  lives on the matching cwf.* spans").
- **F-BW05 · CLOSED@diagnosis** — `domain_rules` select ×4 on card 09 =
  legitimate multi-kind reads (distinct kinds/rows: 188·33·41·41), not
  duplication. Legend copy folds into F-BW04.
- **F-BW06 · CLOSED@diagnosis** — `seed_state insert (not measured)` ×3 +
  `select (1)` ×3 per warm = the S46 SELF-SEED concurrency CLAIM: atomic INSERT
  lock-probe on unique(domain, fingerprint); 23505 conflict = already-seeded,
  claim=false, instant return. 3 pairs = 3 domains (armes/superset/system).
  Deliberate, idempotent, cheap. Honest note: a cheap pre-SELECT could skip the
  probe when already-seeded — **micro-opt candidate, BLOCK 5**; do not "fix" the
  correct pattern now. Legend → F-BW04.
- **F-BW07 · CLOSED@owner-ruling-1** — `ai.*` native spans show "(no I/O
  captured)" / "tokens: not captured": `gateway.ts:184-187` omits
  `recordInputs/recordOutputs` — INTENTIONAL: (a) the same I/O rides the
  scrubbed `cwf.*` sibling spans (OBS-TRACE-1/1b/2), (b) enabling would widen
  the raw prompt/completion secret surface past the ADR-004 scrubber's shape.
  FULL-TRACE MANDATE satisfied — no information lost (verified). Fix = legend
  only (→ F-BW04); `recordInputs/Outputs` stays OFF. (Ruling-2/OBS-TRACE-4 path
  rejected.)
- **F-BW08 · OPEN** — Card 12 shows the SAME output JSON twice
  (`cwf.warm.trust` + `cwf.stage.12.warm-trust`, byte-identical) — NOT a bug
  (OBS-TRACE-1b nested-consistency child==stage, stagesModel.ts:192/:222) but
  reads redundant. Fix: dedupe/collapse identical nested outputs in the digest
  display + legend note. Joins the F-BW04 family.
- **F-BW09 · OPEN** — Stage-13 (Biçim/Sunum) viz/render DECISION invisible in
  the digest: the four render states (real-0=drawn · missing=blank · no
  result="veri yok" · non-numeric=not-charted) are the trust-critical
  client-side outcome, but the digest gives no visibility into WHICH state fired
  / what the render layer decided. Trust-critical legibility gap; client-only.
- **F-BW10 · OPEN** — Card 14 (Bellek Güncelleme) candidate-memory preview:
  deterministic client-only recomposition of the existing digest (intent/frame
  from stage-03 · entities · tools+rowCounts from stage-11 · flush outcome from
  stage-14) under an honest banner ("Uzun süreli bellek YOK — MEMORY-1 ile
  gelecek; hiçbir yere YAZILMADI, knowledge base'e girmez; bilgi≠bellek, sistem
  bugün sadece kelime→araç öğrenir"). No digest → honest empty state, never a
  fabricated preview. Card pedagogy: must NOT claim a memory format or write
  path (MEMORY-1's design is not prejudged). Client-only, GATE-0 batch.
  Closed card 14 → board-walk cards 00–14 COMPLETE.
→ **GATE0-UI-BATCH-1 (F-BW01·02·03·04·08·09·10) → CLOSED@bad00f4** (PR #97, AG-A;
+FIX-1 markup/e2e repair +FIX-2 timeout headroom, rebased onto `4415d64`, CI
green first attempt). All seven findings LIVE on master. See §0b for the full
close record.
- **F-BW11 · OPEN (owner-approved, S57; NOT a board-walk card — SYNTH-TRAFFIC-1
  UX)** — the Sentetik Trafik panel shows "No question sets yet" on a fresh
  deploy because the v1 corpus seeder is wired ONLY to `DbKnowledgeProvider.
  warm()` (fires on a real chat turn), and the admin GET is read-only
  (`setRepo.listAll()`, does not seed). An operator opening the panel before any
  chat turn sees an empty screen and must ask "where are the questions?" — a
  small PLATINUM friction (the ideal is one-click-operational). Owner hit this
  live (S57), triggered the seeder with one chat turn (verified:
  `[SynthTrafficSeed] … seeded id=410f8e35…`), and approved the fix. **Fix
  direction:** the admin GET, when it sees "zero sets AND the v1 corpus was
  never seeded," triggers the EXISTING idempotent `seedSyntheticQuestionSets()`
  once (already absence-only + claim-guarded → safe, no double-write) — then a
  panel open alone suffices, no chat turn required. Server-side (admin
  endpoint), NOT part of the client-only GATE-0 batch; its own small
  HOTFIX-profile phase, sequenced post-GATE-0 (or folded into a BLOCK-2/Superset
  visit). Class: server-side, low-risk. Last-full-wording = this entry.
- **F-BW12 · OPEN (S57; SYNTH-TRAFFIC-1 token accounting)** — the injector's
  `tokensToday` is NOT real token usage: `runSyntheticInjectorTick.ts:141` adds a
  fixed `ESTIMATED_TOKENS_PER_ROUTER_CALL` (=400) per frame because the semantic
  router (`routeSemantica`) doesn't surface real usage back (SemanticRouteResult
  carries no usage field — the code's own comment admits this). Effect: the 200k
  daily ceiling = exactly 500 frames/day regardless of real spend, which for
  frame-only (gemini-flash-lite, short output) is far below the real cost — the
  ceiling is over-conservative AND the log's "200000 tokens" is misleading.
  Safety worked perfectly (born-loud ceiling stop); this is an accuracy/legibility
  fix. Real fix = thread actual usage from the router (the code's own TODO).
  Deferred BLOCK 5. Ceiling raise was considered and REJECTED (K1 needs coverage
  not volume — §3.1). Class: low-risk, server-side. Last-full-wording = this entry.
- **F-BW13 · OPEN (S57; SYNTH-TRAFFIC-1 UX, PLATINUM friction)** — adding a
  question set ("+ Add") and making it active are TWO separate manual steps; the
  first alone is silently inert (owner added gapfill set → it produced ZERO frames
  until `synthetic.activeSetId` was separately published; diagnosed via
  set_id-per-run Operator read, root cause = active-set-not-switched, NOT router
  misclassification). PLATINUM ideal = one action. Fix direction: on "+ Add",
  either offer "make active?" or auto-activate when it's the only/first set (or a
  single-select that publishes activeSetId inline). Server/client-side, low-risk,
  post-GATE-0. Last-full-wording = this entry.

## 5 · M-WAVES — carried whole (v53 §3 wording via v54–v58). S56 delta: none.

## 6 · IN FLIGHT / NAMED PHASES
- **SYNTH-TRAFFIC-1 → CLOSED@7d31793 (merge) + live-verified@S57** — frame-only
  K1 shadow-frame generator. Chain, all verified: PR #95 merged `7d31793`
  (verbatim message, single unretried CI pass — S56-2 evidence run
  29858555514, whole job green) → Operator applied
  `20260721150000_synthetic_traffic.sql` to `fjbrkimwvtpwoxhziidh` (G1–G5:
  dry-run exact-one → clean apply → 2nd-push no-op → RLS true/true → 0 policies
  → anon/authenticated 0 grants) → corpus seeded via warm on a real chat turn
  (`[SynthTrafficSeed] domain=synthetic.question_set_v1 seeded
  id=410f8e35-63db-4ab9-962c-06b051ed826f`; 29 utterances, 3 classes) → owner
  set active + Start → **injector LIVE-VERIFIED** (19:15:46 tick:
  `{ active:true, mode:'frame-only', injected:5, framesRecorded:5,
  tokensToday:2000 }` — 5/min = rate, taze-DB read with NO warm-cache lag,
  empty≠zero 5=5). **K1 data-gate OPEN — frames accumulating.** REMAINING:
  DOC-FLIP (§0/next) flips migration STATUS + verifyGrants +2 deny-probes —
  IN FLIGHT with AG-B (prompt
  `claude-code-SYNTH-TRAFFIC-1-DOC-FLIP-applied-live-verified-v1`; screenshot-
  confirmed AG-B running it S57; branch not yet on origin). Design/corpus/phase
  artifacts: `cwf-synthetic-traffic-design-v1_3` · `cwf-synthetic-question-set-v1`
  · `claude-code-PHASE-SYNTH-TRAFFIC-1-v1_3`.
- **SYNTH-TRAFFIC-2 (NAMED, NOT BUILT)** — full-turn mode + proper
  system-principal identity (S33-1/C1-LAW-clean) + Class-C live empty≠zero
  answer test. Own design note first.
- **GATE-0 BATCH FIX (to author after card 14)** — F-BW01·02·03·04·08·09, one
  AG phase, client-only, HOTFIX-adjacent profile candidate (no api/shared/
  migration surface) — profile declared at authoring.

## 7 · RULES / RECORDS
v58 §5 carried WHOLE by name (FULL-TRACE MANDATE · COMPLETENESS GUARD · ADR-008
· ROOT-SPAN I/O nuance · G3 auth two-tier · S55-1 · S55-2 · S56-1 · K1/K2/K3 ·
S52-1/2 · S53-1/2 · HYGIENE SWEEP · SC-1 · naming law · Step-0 project-confirm ·
DB-INTROSPECTION · doc-drift false-alarm · RTF recovery · PLATINUM-BREACH-4 ·
S49-1 · S50-1 · relay identity-tag · naming-collision grep · executable
acceptance probe · S54-1 · S54-2 · S54-3+PLATINUM-BREACH-3 · S54-4 · CHANGELOG
ruling · S32-1 wording note). Exception: **G3 SCOPE RULING (VSplit allowlist)
SUPERSEDED @0636fd3** (§0). **S56 adds:**
- **S56-1 (ISOLATED-WORKDIR, standing):** full wording in v58 §5 — carried.
- **S56-2 (CI FULL-JOB GREEN, standing):** a mid-run "job already green" claim
  ≠ full-job green; the merge precondition is the WHOLE unsharded CI job
  finished green — no partial or stale reads. Extends S37-2. Born from the F152
  partial-green merge lesson.
- **cwf-master-plan-v5_2 = MUST-FOLLOW UNTIL FINISH** (owner-legislated): no
  detour; every response positions against v5_2; laser-focus.
- **Architect premise-error tally (S54-1 lineage): +2 in S56** — F152 Rollout
  "never imports" misdiagnosis (AG-A caught) + SEEDING RULING mis-scope onto
  synthetic sets (AG-B caught). Three-count since S54-1 born. The two-lane
  critique loop is load-bearing — keep both lanes in review posture.

## 8 · PARKED / EXTERNAL / WATCH (v58 §4 carried + S56 delta)
Carried by name: **F134 · F135** · first live viz-v4-compliant chart
(freeze-staged) · **F122** watch · LANGFUSE-V4-UPGRADE · separate-POC-key belt ·
**Kale-RAG** external arc · STAGE-PLAYGROUND · **Superset E-activation** (now
scheduled = v5_2 BLOCK 2). Live watches unchanged: `routing_mismatch` ticks ·
learn-quality (map ~141 rows; suffix/ASCII-variant keys) · divergence-badge
rates · WINDOW-POOL semantic-router reliability N=2 · ASCII-stopword top-ups.
- **BOARD-WALK (owner "ASLA unutma"):** now CONCRETE — card 14 + §4 batch =
  the closing moves of GATE-0 item (b). Re-raise until "UI clean."
- **NEW watch:** golden-runner 1075 calls/18h during freeze (§2, BLOCK 5).
- **Branch hygiene (fresh-clone verified @bad00f4):** 5 stale merged remotes
  remain — `obs-trace-2b` · `flake-sweep-1` · `pane-scroll-1` · `pane-scroll-2` ·
  `hotfix/f152-rollout-guard-blind`. (synth-traffic-1/-docflip + gate0-ui-batch-1
  already deleted.) All merged; safe to delete — fold into the next AG phase's
  post-merge step or an AG-B cleanup pass. *(v59_2 wording below, superseded.)*
- **Branch hygiene (fresh-clone verified at S57 boot):** un-deleted post-merge
  remotes: `obs-trace-2b` · `flake-sweep-1` · `pane-scroll-1` ·
  `hotfix/f152-rollout-guard-blind` · `pane-scroll-2`. Owner/AG discretion;
  fold into the next AG phase's post-merge step.
- **Durable-map correction pending (B6):** CLAUDE-PROJECT-INSTRUCTIONS "ARMES =
  KB7" → "4 active (KB7·Granit·Sır-Çan·Masse) of 17 registered factories."

## 9 · YOUR ACTION ITEMS (owner, at v59_5 write / S57)
Two gates cleared this turn: **GATE-0 SEALED** (owner "UI clean") + **K1 §8
ANSWERED** + **taxonomy decision A RATIFIED**. BLOCK 1 (IR-3) is now open.
1. **Add to project files:** `cwf-open-items-register-v59_5.md` (this file) +
   `CWF-SESSION-GRAPH-KB-v55_2.md`. Bootstrap v55 (pasted) stays valid.
2. **Next: Architect authors the IR-3 phase** (its FIRST step = the K1-A merge:
   delete QUERY_TOPOLOGY from the 3 enum sites, fold into QUERY_MASTER). Say the
   word and I write it. This is where the router-prompt DB-governed publish
   question gets resolved (may need a governed publish for the prompt segment).
3. **Injector — your call.** K1 §8 is answered, so it's no longer gate-critical.
   Leave it running (accumulates IR-3-validation data cheaply) OR Stop it from
   the panel — either is fine. Ceiling protects spend regardless.
4. **Deferred, sequenced (post-GATE-0, low-risk):** F-BW11 (seed-on-view) ·
   F-BW12 (real-token ceiling accounting) · F-BW13 (add-set-not-active) — three
   small SYNTH-TRAFFIC UX/accuracy fixes, batchable. F-BW12 sits at BLOCK 5.
5. **Optional:** hand AG-B the 5 stale merged branches (§8) to delete.
Relay stays the only owner surface. GOLDEN FREEZE engaged until BLOCK 5.

<!-- END · cwf-open-items-register-v59_6 · rev 59.6 · 2026-07-21/22 -->
