# PHASE SYNTH-TRAFFIC-1 — synthetic traffic subsystem (K1 shadow-frame generator)
**claude-code-PHASE-SYNTH-TRAFFIC-1-v1_2 · rev 1.2 · 2026-07-21 · Architect: Claude · Executor: AG-B**
Amends v1 (immutable, S37-1). ONE correction, folded into §0 below: the SEEDING
approach. Everything else in v1 stands (mechanism, two-mode cost, labeling,
reentry guard, spend guard, admin UI, gated sub-phases, self-verify). Design:
`cwf-synthetic-traffic-design-v1_3`. Seed corpus: `cwf-synthetic-question-set-v1`.

> PLATINUM statement: one governed subsystem — question sets are DATA
> (admin-UI-editable), the cron injector self-runs at a governed rate/mode from a
> single toggle, no manual per-utterance work. Rate + mode are the only human
> levers (spend/consent).

## §0 · SEEDING CORRECTION (supersedes v1 §3's "seed via KIND_REGISTRY" line)
AG-B correctly flagged that v1's "seed via KIND_REGISTRY/REFERENCE_INSTANCES"
mis-scoped the SEEDING RULING. Tree-verified (`selfSeedReconciler.ts:32`:
"DELIBERATELY NOT a registered domain"; SEED_DOMAINS covers only the
`rule_kinds`/`domain_rules` lane): **KIND_REGISTRY → REFERENCE_INSTANCES is the
RULE-GOVERNANCE lane** (router.prompt, agent params — things that pass the eval
gate). Synthetic question sets are **operational test DATA, not rules.** Forcing
them through the governed-kind lane would wrongly subject them to the
publish/golden mechanism and needlessly entangle GOLDEN FREEZE.

**DECISION — the correct model:**
- **REJECT "governed kind, no new table."** Synthetic sets are not rules, don't
  enter the eval gate, and must not ride domain_rules/RuleGovernanceService.
- **ADOPT "real table + in-code absence-only self-seeder"**, preserving the
  RULING's true prohibition (no raw-SQL rule INSERT in a migration):
  - `synthetic_question_sets` + `synthetic_runs` = real CRUD tables (§3), fast
    reads for the cron injector.
  - **Seed = NOT a raw INSERT in the migration.** A boot `warm()`-path,
    service-role, **absence-only idempotent self-seeder** following the EXISTING
    precedent (`SeedStateRepository` / `RouterProposalsRepository` /
    `RoutingCurationRepository` self-seed pattern: absence-only, idempotent,
    code-declared corpus constant). The migration creates the table + grants
    ONLY; the corpus lands via the in-code seeder on warm. This honors the RULING
    (no raw-SQL-rule-insert) WITHOUT abusing KIND_REGISTRY.
  - **Admin UI curation = a simple synthetic-set CRUD** (NOT the governance
    createDraft/publish flow — these aren't rules, curation doesn't hit the eval
    gate). A plain set editor.
  - **Grants/RLS UNCHANGED:** both new tables get HARDEN-GRANTS-1 all-grantees
    revoke + verifyGrants probe + CI coverage (S30-1, cite the family's latest
    fix migration).
Net: real tables + in-code absence-only warm-seed (SeedStateRepository pattern) +
plain set-CRUD UI. Do NOT route synthetic sets through the governed-kind lane.

## §P · PRECONDITION (S47-1, self-checking) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master == 0636fd372ffec93978bca2958a499d6bdab9bdfe`
(PANE-SCROLL-2 merged, F151 closed, rev 127). If SYNTH-TRAFFIC-1 was started on
the old `da279e0` tip, REBASE onto `0636fd3` — PANE-SCROLL-2 changed
`AdminPanel.tsx`'s nav array + panel structure (PanelScroll, new sections);
reconcile the new "Sentetik Trafik" nav item with the new structure and align it
with PanelScroll. On any mismatch STOP and report actual state. Clone into a
UNIQUE workdir (S56-1). Grep commands from `package.json` (S32-1). Branch:
`synth-traffic-1`.

## §1 · WHY
K1's §8 needs a statistically meaningful IR-1 shadow-frame sample; organic
traffic is too thin (9 turns/18h). This subsystem GENERATES labeled synthetic
frames on demand, so K1 ratifies weeks early. GOLDEN-FREEZE-INDEPENDENT (no
prompt.segment publish; frame-only mode doesn't call the main LLM).

## §2 · BINDING CONSTRAINTS
1. **Determinism split (as corrected in §0).** Question sets = operational DATA
   (real table, in-code absence-only warm-seed, admin-UI-editable via plain
   CRUD). Rate/mode/enabled = governed L1 params. Injector = code. IR-1 frame
   extractor = UNCHANGED (feed it, never fork it). NOT the governed-kind lane.
2. **Labeling (data honesty, empty≠zero spirit).** Every synthetic turn carries
   `synthetic: true` + a dedicated synthetic user id / `source:'synthetic'`.
   REUSE the existing synthetic marker (`observability/config.ts:321`) — don't
   mint a parallel one. §8 metrics filter on `synthetic:true`. Synthetic data
   NEVER masquerades as organic; NEVER pollutes real user analytics.
3. **Reentry-no-loop.** A synthetic turn MUST short-circuit any re-inject path —
   a synthetic turn never spawns another. Deterministic guard + a loop test.
4. **Spend guard.** `synthetic.dailyTokenCeiling` (governed clamp, golden-ceiling
   style) hard-caps cost; the cron checks it before each injection and stops at
   the cap born-loud (S41-1). frame-only cheap default; full-turn opt-in.
5. **Freeze/gate untouched.** No prompt.segment surface, no golden-gate contact,
   no eval-gate machinery change. Migration additive (new tables/params only).
6. **Mode SELECTABLE at runtime** (owner decision): `synthetic.mode` ∈
   {`frame-only`, `full-turn`}, a UI toggle chosen when starting traffic.
   - **frame-only:** run only to the router/IR-1 frame extraction; record the
     frame; STOP (no main LLM, no MCP). Cheap; the K1 workhorse.
   - **full-turn:** the real full chat path (router→tools→grounding→viz).
     Exercises the pipeline + Class C empty≠zero live test; costs real tokens.

## §3 · WHAT TO BUILD (seed line corrected per §0)
- **Migration (additive):** `synthetic_question_sets` (id · name · lang ·
  utterances jsonb · intended_tool_categories jsonb · class[A|B|C] tags ·
  created_by · created_at) + `synthetic_runs` ledger (turn_id · set_id ·
  utterance_idx · mode · factory · synthetic=true · tokens · frame_recorded).
  Both: RLS on, service-role gated, all-grantees revoke citing HARDEN-GRANTS-1
  (S30-1), verifyGrants probe + CI coverage. **Migration creates tables + grants
  ONLY — no corpus INSERT.** Governed params via the existing L1 registry:
  `synthetic.enabled` · `synthetic.mode` · `synthetic.ratePerMinute`(clamp) ·
  `synthetic.activeSetId` · `synthetic.dailyTokenCeiling`(clamp).
- **In-code seeder (per §0):** boot `warm()`-path, service-role, absence-only
  idempotent seeder that lands the v1 corpus (code-declared constant), following
  the SeedStateRepository/RouterProposalsRepository self-seed pattern. NO raw-SQL
  rule insert, NO KIND_REGISTRY.
- **Cron injector** (CRON_SECRET-gated, golden-batch cron pattern): when
  `synthetic.enabled`, each tick pops the next utterance from
  `synthetic.activeSetId` at `ratePerMinute`, drives frame-only OR full-turn per
  `synthetic.mode`, writes the `synthetic_runs` row, honors `dailyTokenCeiling`.
  Idle-silent when disabled (ADR-007).
- **Admin UI — new bottom-left "Sentetik Trafik / Synthetic Traffic"** nav item
  (super_admin-gated; reconcile with the post-PANE-SCROLL-2 nav/section
  structure, PanelScroll-wrapped). Controls: mode toggle · rate (q/min) · active
  set picker · **plain set view/add/edit CRUD** (owner curation — NOT governance
  publish) · start/stop (flips `synthetic.enabled`) · LIVE counter (injected ·
  frames recorded · per-field enum-drop so far · daily spend vs ceiling).

## §4 · GATED SUB-PHASES
- **G1 — migration (tables + grants only) + params + in-code absence-only seeder**
  (verifyGrants; SeedStateRepository pattern).
- **G2 — cron injector** (frame-only + full-turn; labeling; reentry guard;
  ceiling).
- **G3 — admin UI** (nav item + controls + plain set CRUD + live counter).
- **G4 — RED→GREEN tests:** (a) synthetic turn → LABELED IR-1 frame
  (frame_recorded=true, synthetic=true); (b) reentry guard (loop test RED without
  guard); (c) frame-only skips main-LLM/MCP (assert); (d) full-turn Class C
  returns honest empty (not fabricated zero) for an inactive factory; (e) ceiling
  stops injection born-loud; (f) no-secret in synthetic_runs; (g) seeder is
  absence-only idempotent (second warm = no dup).
- **G5 — full suite + CI.** FULL unsharded CI green on PR head (S37-2, whole job,
  no rerun S55-1/S56-2). Doc-drift reseal if the manifest maps a touched file.

## §5 · SELF-VERIFY (evidence, literal)
- [ ] Migration additive, tables+grants ONLY (no corpus INSERT); verifyGrants +
      CI coverage; grant/revoke cites the HARDEN-GRANTS-1 family (S30-1).
- [ ] Corpus seeded via in-code absence-only warm-seeder (SeedStateRepository
      pattern), grep-proven; ZERO KIND_REGISTRY/domain_rules touch for synthetic
      sets.
- [ ] Labeling reuses the existing synthetic marker (config.ts:321), grep-proven.
- [ ] All seven G4 tests present + RED→GREEN pasted (esp. reentry loop, Class C
      honest-empty, seeder idempotence).
- [ ] frame-only proven to skip main-LLM + MCP.
- [ ] `git diff --stat` pasted; nav edit reconciled with PANE-SCROLL-2 (S47-1).
- [ ] FULL unsharded CI green on PR head, no rerun.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).

## §6 · WHAT YOU DO NOT DO
No merge (Architect FULL review → verbatim merge message, S30-2). No
prompt.segment / golden / eval-gate change. No raw-SQL corpus insert. No
KIND_REGISTRY/governed-kind lane for synthetic sets. No parallel synthetic
marker. No shared workdir. No CI rerun (root-cause or report, S55-1).

## §Seed · QUESTION SET v1 (embed verbatim — the code-declared corpus constant)
FACTORY GROUND TRUTH (getFactoryList 2026-07-21): ACTIVE(4)=KB7·Granit·Sir·Masse;
INACTIVE(13)=Granit_Irak·Pasta·KB3·Slab1·Sinterflex2·Masse_DK·Granit_Yerkoy1·KB2·
Granit_Yerkoy2·Sinterflex1·Masse_Yerkoy·Sir_Yerkoy·Masse_YK.
Seed the full Class A / B / C utterance list from `cwf-synthetic-question-set-v1`
verbatim as the code-declared corpus constant — owner anchors A1/A2 (data-query),
B1/B2 (prescriptive/F83), C1–C13 (one probe per inactive factory) EXACT; A3–A14
generated. Do not paraphrase the owner anchors.

<!-- END · claude-code-PHASE-SYNTH-TRAFFIC-1-v1_2 · rev 1.2 · 2026-07-21 -->
