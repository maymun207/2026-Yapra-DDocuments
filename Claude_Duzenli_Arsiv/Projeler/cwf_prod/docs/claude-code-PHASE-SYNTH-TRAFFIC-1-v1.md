# PHASE SYNTH-TRAFFIC-1 — synthetic traffic subsystem (K1 shadow-frame generator)
**claude-code-PHASE-SYNTH-TRAFFIC-1-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG**
Design: `cwf-synthetic-traffic-design-v1_3` (owner-approved). Seed corpus:
`cwf-synthetic-question-set-v1` (embedded verbatim in §Seed below).

> PLATINUM statement: one governed subsystem — question sets are DATA
> (admin-UI-editable), the cron injector self-runs at a governed rate/mode from a
> single toggle, no manual per-utterance work. Rate + mode are the only human
> levers (spend/consent).

## §P · PRECONDITION (S47-1, self-checking) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master == da279e096457db9b662e8cc941349fe89049012f`
(the F152 merge, rev 127) AND no PANE-SCROLL-2 collision on the files below.
NOTE: PANE-SCROLL-2 is concurrently in flight (admin panel layout + e2e). THIS
phase touches DIFFERENT surfaces (new tables/params/endpoint/injector + a NEW nav
item), but BOTH edit `AdminPanel.tsx`'s nav array — if PANE-SCROLL-2 is unmerged
when you reach the nav edit, STOP and report; the second-to-merge rebases (S47-1).
Clone into a UNIQUE workdir (S56-1). Re-derive fresh; grep commands from
`package.json` (S32-1). Branch: `synth-traffic-1`.

## §1 · WHY
K1's §8 needs a statistically meaningful IR-1 shadow-frame sample; organic
traffic is too thin (9 turns/18h). This subsystem GENERATES labeled synthetic
frames on demand, so K1 ratifies weeks early. It is GOLDEN-FREEZE-INDEPENDENT
(not a prompt.segment publish; frame-only mode doesn't even call the main LLM).

## §2 · BINDING CONSTRAINTS
1. **Determinism split.** Question sets = governed DATA (seeded reference +
   DB-extensible, admin-UI editable). Rate/mode/enabled = governed params.
   Injector = code. IR-1 frame extractor = UNCHANGED (feed it, never fork it).
2. **Labeling (data honesty, empty≠zero spirit).** Every synthetic turn carries
   `synthetic: true` + a dedicated synthetic user id / `source:'synthetic'`.
   REUSE the existing synthetic marker (`observability/config.ts:321` already
   defines a "synthetic replay traffic" boolean — extend/align, don't mint a
   parallel one). §8 metrics filter on `synthetic:true`. Synthetic data NEVER
   masquerades as organic; NEVER writes to real user conversation history in a
   way that pollutes organic analytics.
3. **Reentry-no-loop.** A synthetic turn MUST short-circuit any path that could
   re-inject — a synthetic turn never spawns another. Deterministic guard + a
   test that proves no loop.
4. **Spend guard.** `synthetic.dailyTokenCeiling` (governed, clamp like the
   golden ceiling) hard-caps cost; the cron injector checks it before each
   injection and stops at the cap (born-loud log, S41-1). frame-only mode is the
   cheap default; full-turn is opt-in.
5. **Freeze/gate untouched.** No prompt.segment surface, no golden-gate contact,
   no eval-gate machinery change. New migration is additive (new tables/params).
6. **Mode is SELECTABLE at runtime** (owner decision): `synthetic.mode` ∈
   {`frame-only`, `full-turn`}, a UI toggle — chosen when starting traffic.
   - **frame-only:** run only up to the router/IR-1 frame extraction; record the
     frame; STOP (no main LLM, no MCP execution). Cheap; the K1 workhorse.
   - **full-turn:** the real full chat path (router→tools→grounding→viz). Exercises
     the pipeline + Class C empty≠zero live test; costs real tokens.

## §3 · WHAT TO BUILD
- **Migration (additive):** `synthetic_question_sets` (id · name · lang ·
  utterances jsonb · intended_tool_categories jsonb · class[A|B|C] tags ·
  created_by · created_at). RLS on, service-role gated, all-grantees revoke
  citing HARDEN-GRANTS-1 (S30-1, cite `20260711120000_harden_grants_default_acl_
  sweep.sql`), verifyGrants probe row + CI coverage test. Governed params via the
  existing L1 param registry: `synthetic.enabled`(bool) · `synthetic.mode` ·
  `synthetic.ratePerMinute`(int, clamp e.g. [1,60]) · `synthetic.activeSetId` ·
  `synthetic.dailyTokenCeiling`(clamp). A `synthetic_runs` ledger row per
  injected turn (turn_id, set_id, utterance_idx, mode, factory, synthetic=true,
  tokens, frame_recorded bool) for §8 aggregation + the live counter.
- **Cron injector** (CRON_SECRET-gated, golden-batch cron pattern): when
  `synthetic.enabled`, on each tick pop the next utterance from
  `synthetic.activeSetId` at `ratePerMinute`, drive frame-only OR full-turn per
  `synthetic.mode`, write the `synthetic_runs` row, honor `dailyTokenCeiling`.
  Idle-silent when disabled (ADR-007).
- **Seed the reference set** from §Seed (the v1 corpus) via the KIND_REGISTRY /
  REFERENCE_INSTANCES path — NEVER raw SQL (SEEDING RULING). Owner edits in UI.
- **Admin UI — new bottom-left nav item "Sentetik Trafik / Synthetic Traffic"**
  (super_admin-gated; add to `AdminPanel.tsx` nav array in a suitable section —
  a new `operations` section or under GOVERN). Controls: mode toggle
  (frame-only|full-turn) · rate (q/min) · active question-set picker · set
  view/add/edit (owner curation) · start/stop (flips `synthetic.enabled`) · a
  LIVE counter (injected · frames recorded · per-field enum-drop so far · daily
  token spend vs ceiling). Uses PanelScroll (align with PANE-SCROLL-2 once merged).

## §4 · GATED SUB-PHASES
- **G1 — migration + params + seed** (verifyGrants, seeding via registry).
- **G2 — cron injector** (frame-only + full-turn paths; labeling; reentry guard;
  ceiling).
- **G3 — admin UI** (nav item + controls + live counter).
- **G4 — RED→GREEN tests:** (a) a synthetic turn produces a LABELED IR-1 frame
  (frame_recorded=true, synthetic=true); (b) reentry guard — a synthetic turn
  never injects another (loop test RED without the guard); (c) frame-only does
  NOT call the main LLM / MCP (assert); (d) full-turn Class C returns honest
  empty (not fabricated zero) for an inactive factory; (e) ceiling stops
  injection born-loud; (f) hard-leak / no-secret in synthetic_runs.
- **G5 — full suite + CI.** FULL unsharded CI green on PR head (S37-2, whole job,
  no rerun S55-1/S56-2). Doc-drift reseal if manifest maps a touched file (S34-1).

## §5 · SELF-VERIFY (evidence, literal)
- [ ] Migration additive; verifyGrants probe + CI coverage; grant/revoke cites
      the HARDEN-GRANTS-1 family (S30-1).
- [ ] Seed via KIND_REGISTRY/REFERENCE_INSTANCES, zero raw-SQL rule insert
      (SEEDING RULING).
- [ ] Labeling reuses the existing synthetic marker (config.ts:321), grep-proven.
- [ ] All six G4 tests present + RED→GREEN pasted (esp. the reentry loop test and
      the Class C honest-empty test).
- [ ] frame-only proven to skip main-LLM + MCP (assert/log).
- [ ] `git diff --stat` pasted; nav edit reconciled with PANE-SCROLL-2 (S47-1).
- [ ] FULL unsharded CI green on PR head, no rerun.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).

## §6 · WHAT YOU DO NOT DO
No merge (Architect FULL review → verbatim merge message, S30-2). No
prompt.segment / golden / eval-gate change. No raw-SQL rule seed. No parallel
synthetic marker. No shared workdir. No CI rerun (root-cause or report, S55-1).

## §Seed · QUESTION SET v1 (embed verbatim — reference set to seed)
FACTORY GROUND TRUTH (getFactoryList 2026-07-21): ACTIVE(4)=KB7·Granit·Sir·Masse;
INACTIVE(13)=Granit_Irak·Pasta·KB3·Slab1·Sinterflex2·Masse_DK·Granit_Yerkoy1·KB2·
Granit_Yerkoy2·Sinterflex1·Masse_Yerkoy·Sir_Yerkoy·Masse_YK.
[Seed the full Class A / B / C utterance list from `cwf-synthetic-question-set-v1`
verbatim — owner anchors A1/A2/B1/B2 exact, A3–A14 generated, C1–C13 one probe
per inactive factory. Do not paraphrase the owner anchors.]

<!-- END · claude-code-PHASE-SYNTH-TRAFFIC-1-v1 · rev 1 · 2026-07-21 -->
