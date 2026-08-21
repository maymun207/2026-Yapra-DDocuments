# PHASE SYNTH-TRAFFIC-1 — synthetic traffic subsystem (K1 shadow-frame generator, FRAME-ONLY)
**claude-code-PHASE-SYNTH-TRAFFIC-1-v1_3 · rev 1.3 · 2026-07-21 · Architect: Claude · Executor: AG-B**
Amends v1_2 (immutable, S37-1). ONE owner-ratified scope change folded into §0b:
**this phase ships FRAME-ONLY; full-turn is deferred to SYNTH-TRAFFIC-2.** The §0
seeding correction (v1_2) and everything else stand. Design:
`cwf-synthetic-traffic-design-v1_3`. Corpus: `cwf-synthetic-question-set-v1`
(handed to AG-B verbatim; embed as the code-declared constant).

> PLATINUM statement: one governed subsystem — question sets are DATA
> (admin-UI-editable), the cron injector self-runs at a governed rate from a
> single toggle, no manual per-utterance work. Rate is the human lever.

## §0b · SCOPE (owner-ratified) — FRAME-ONLY THIS PHASE
AG-B correctly surfaced that FULL-TURN mode drives the real turn pipeline
(`createTurnContext`→pipeline→`messages` write) which requires a real `userId`
FK to `auth.users` (`chat.ts:66/115/173`), and no synthetic/system identity or
auth-bypass exists. Minting a login-capable `auth.users` account is REJECTED — it
creates a new production auth attack surface and impersonates a real identity,
against the S33-1 spirit (machine actors write `actor_user_id: null` + attribution,
never a minted/sentinel identity) and touches C1 LAW (messages writes).

**Owner decision:** ship FRAME-ONLY now; defer full-turn to **SYNTH-TRAFFIC-2**
(its own design note will solve the system-principal question properly).
- **Frame-only needs NO auth.users identity — tree-verified.** IR-1 frame
  recording goes through `RouterProposalsRepository` → `record_router_proposal`
  RPC under **service-role** (`getServiceClient()`), fields `resolved_by:
  string|null` — a machine/service-role write, no `user_id references auth.users`.
  So the cron injector calls the router/frame-extraction IN-PROCESS server-side
  and records via the existing service-role + null-actor path (S33-1 pattern).
  No new auth surface, no messages write, no C1-LAW contact.
- **`synthetic.mode` param KEEPS both enum values** (`frame-only`|`full-turn`) so
  the owner's selectable-mode design is preserved, BUT selecting `full-turn`
  returns an HONEST born-loud state ("full-turn henüz aktif değil — SYNTH-TRAFFIC-2;
  frame-only çalışıyor", S41-1) — NOT a silent no-op, NOT a half-built pipeline
  path. Default = `frame-only`.
- **SYNTH-TRAFFIC-2 (named follow-up, do NOT build here):** full-turn pipeline
  drive + a proper system-principal identity model (S33-1/C1-LAW-clean), Class C
  live empty≠zero answer test, tool-triggering. Register carries it as an open
  item.

## §0 · SEEDING (from v1_2 — unchanged)
Real tables + in-code absence-only warm-seeder (SeedStateRepository /
RouterProposalsRepository pattern), NOT KIND_REGISTRY/governed-kind lane. Migration
creates tables + grants ONLY; the corpus lands via the in-code seeder on warm.
Admin curation = plain synthetic-set CRUD (not governance publish).

## §P · PRECONDITION (S47-1) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master == 0636fd372ffec93978bca2958a499d6bdab9bdfe`
(PANE-SCROLL-2 merged, rev 127). If started on `da279e0`, REBASE onto `0636fd3`
(AdminPanel.tsx nav/section structure changed; reconcile the new "Sentetik Trafik"
item, PanelScroll-wrapped). On mismatch STOP and report. Unique workdir (S56-1).
Grep from `package.json` (S32-1). Branch: `synth-traffic-1`.

## §1 · WHY
K1's §8 needs a meaningful IR-1 shadow-frame sample; organic traffic is too thin
(9 turns/18h). Frame-only GENERATES labeled synthetic frames on demand →
K1 ratifies weeks early. GOLDEN-FREEZE-INDEPENDENT (no prompt.segment, no main
LLM in frame-only).

## §2 · BINDING CONSTRAINTS
1. **Determinism split.** Sets = operational DATA (real table, in-code
   absence-only warm-seed, admin-UI CRUD). Rate/mode/enabled = governed L1
   params. Injector = code. IR-1 extractor = UNCHANGED. NOT the governed-kind lane.
2. **Labeling (empty≠zero spirit).** Every synthetic frame/run row carries
   `synthetic: true` + null-actor attribution (S33-1 — NO minted identity). REUSE
   the existing synthetic marker (`observability/config.ts:321`). §8 metrics
   filter on `synthetic:true`. Never masquerade as organic.
3. **Reentry-no-loop.** A synthetic frame extraction MUST NOT trigger another
   injection. Deterministic guard + loop test.
4. **Spend guard.** `synthetic.dailyTokenCeiling` (governed clamp) hard-caps cost;
   frame-only is tiny (router LLM only) but the ceiling + born-loud stop still
   apply (S41-1).
5. **Freeze/gate untouched.** No prompt.segment, no golden-gate, no eval-gate
   change. Migration additive.
6. **Mode param present, full-turn = honest born-loud not-yet** (per §0b).

## §3 · WHAT TO BUILD (frame-only)
- **Migration (additive):** `synthetic_question_sets` (id·name·lang·utterances
  jsonb·intended_tool_categories jsonb·class[A|B|C]·created_by·created_at) +
  `synthetic_runs` ledger (turn/frame_id·set_id·utterance_idx·mode·factory·
  synthetic=true·tokens·frame_recorded). Both: RLS on, service-role gated,
  all-grantees revoke citing HARDEN-GRANTS-1 (S30-1), verifyGrants + CI coverage.
  Tables + grants ONLY, no corpus INSERT. Params via existing L1 registry:
  `synthetic.enabled`·`synthetic.mode`·`synthetic.ratePerMinute`(clamp)·
  `synthetic.activeSetId`·`synthetic.dailyTokenCeiling`(clamp).
- **In-code seeder:** boot `warm()`-path, service-role, absence-only idempotent,
  lands the v1 corpus (code-declared constant), SeedStateRepository pattern.
- **Cron injector (frame-only):** when `synthetic.enabled` & mode=frame-only, each
  tick pops the next utterance at `ratePerMinute`, calls the router/IR-1
  frame-extraction IN-PROCESS server-side (service-role, null-actor), records the
  frame + `synthetic_runs` row, honors `dailyTokenCeiling`. mode=full-turn →
  born-loud not-yet (§0b). Idle-silent when disabled (ADR-007).
- **Admin UI — bottom-left "Sentetik Trafik / Synthetic Traffic"** (super_admin,
  PanelScroll, reconciled with post-PANE-SCROLL-2 nav). Controls: mode toggle
  (full-turn shows "SYNTH-TRAFFIC-2'de" disabled/badged) · rate · active-set
  picker · plain set view/add/edit CRUD · start/stop (flips `synthetic.enabled`) ·
  LIVE counter (injected · frames recorded · per-field enum-drop · daily spend).

## §4 · GATED SUB-PHASES
- **G1** — migration (tables+grants only) + params + in-code absence-only seeder.
- **G2** — cron injector (frame-only in-process path; labeling null-actor;
  reentry guard; ceiling; full-turn born-loud stub).
- **G3** — admin UI (nav item + controls + plain set CRUD + live counter).
- **G4 — RED→GREEN:** (a) synthetic frame-only turn → LABELED IR-1 frame
  (frame_recorded=true, synthetic=true, actor null); (b) reentry loop guard (RED
  without guard); (c) frame-only writes ZERO to messages + calls NO main LLM/MCP
  (assert); (d) full-turn selection returns born-loud not-yet (no pipeline drive,
  no auth.users write); (e) ceiling stops born-loud; (f) no-secret in
  synthetic_runs; (g) seeder absence-only idempotent (second warm = no dup).
- **G5** — full unsharded CI green on PR head (S37-2, whole job, no rerun
  S55-1/S56-2). Doc-drift reseal if manifest maps a touched file.

## §5 · SELF-VERIFY (evidence, literal)
- [ ] Frame-only writes ZERO auth.users-FK rows; frame recorded via service-role
      null-actor path (S33-1), grep/test-proven.
- [ ] full-turn selection = born-loud not-yet, drives NO pipeline (test d).
- [ ] Migration tables+grants only (no corpus INSERT); verifyGrants + CI coverage;
      revoke cites HARDEN-GRANTS-1 (S30-1).
- [ ] Corpus via in-code absence-only warm-seeder; zero KIND_REGISTRY/domain_rules
      touch, grep-proven.
- [ ] Labeling reuses config.ts:321 marker, grep-proven.
- [ ] All seven G4 tests + RED→GREEN pasted.
- [ ] `git diff --stat` pasted; nav reconciled with PANE-SCROLL-2 (S47-1).
- [ ] Full unsharded CI green on PR head, no rerun.
- [ ] Report cites real merge-base from fresh `git rev-parse` (S54-1).

## §6 · WHAT YOU DO NOT DO
No full-turn pipeline drive / no auth.users identity mint (→ SYNTH-TRAFFIC-2). No
merge (Architect FULL review → verbatim merge message, S30-2). No prompt.segment/
golden/eval-gate change. No raw-SQL corpus insert. No KIND_REGISTRY lane. No
parallel synthetic marker. No shared workdir. No CI rerun (root-cause, S55-1).

## §Seed · CORPUS (embed the handed-over cwf-synthetic-question-set-v1 verbatim)
Factory ground truth (getFactoryList 2026-07-21): ACTIVE(4)=KB7·Granit·Sir·Masse;
INACTIVE(13)=Granit_Irak·Pasta·KB3·Slab1·Sinterflex2·Masse_DK·Granit_Yerkoy1·KB2·
Granit_Yerkoy2·Sinterflex1·Masse_Yerkoy·Sir_Yerkoy·Masse_YK. Embed A1/A2 (data
anchors), B1/B2 (F83 anchors), A3–A14, C1–C13 EXACT from the handed file — owner
anchors not paraphrased. Class C frames still record in frame-only (the live
empty-answer test itself is SYNTH-TRAFFIC-2).

<!-- END · claude-code-PHASE-SYNTH-TRAFFIC-1-v1_3 · rev 1.3 · 2026-07-21 -->
