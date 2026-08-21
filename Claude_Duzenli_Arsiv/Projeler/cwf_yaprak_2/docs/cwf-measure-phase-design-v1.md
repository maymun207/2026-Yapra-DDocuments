# CWF — MEASURE phase (STEP 3) design note · v1
<!-- cwf-measure-phase-design-v1 · 2026-07-25 · Architect: Claude · child of
     A23_cwf-execution-runbook STEP 3 · binds to understanding-layer v1_3 §7
     (measurement constitution) · floor rev 143 (master 4a3ecfc; F169 + F173
     CLOSED@evidence). Self-contained; supersedes the register/runbook's
     single-line "Recall@k + gate-behavior baseline" framing of STEP 3. -->

## §0 · What this phase is (and is not)
STEP 3 = MEASURE: the step that turns the SOTA claim from a **design/stance
argument** into an **empirical, ledger-nailed baseline**. It establishes the
"before" that STEP 5 (⑤/⑥, the understanding layer) must beat to earn the word
"improved." It is NOT a head-to-head competitor benchmark — it measures OUR
system's own behavior and OUR mechanisms' effect (running rival systems on the
same corpus is out of scope). The verdict's "ahead of frontier" half stays a
design argument; what STEP 3 makes empirical is that the system actually works
and the mechanisms actually move the number.

## §1 · Register correction (TOTAL-45) — STEP 3 is smaller than the register says
Register v65 F129 ("no UI/API trigger; token cap still a code constant") is
**STALE**. Verified against master @4a3ecfc:
- `quota.routerAbRunTokenCeiling` is a **governed param** (`agentParams.ts:330`,
  seed 1_500_000, min 200k / max 5M, stage '00') — it replaced the old
  `ROUTER_AB_TOKEN_BUDGET_CAP` env constant. [IR-1, rev 118]
- The replay endpoint accepts `mode:'router-ab'` (`replay.ts:446`) and
  `ReplayTab.tsx` carries the ④ Router A/B evidence-lens section (UI trigger).
  [IR-1 / SR1-W3a]

So the "build trigger + governed cap" half of F129's STEP-3 deliverable **already
landed** — there is NO AG phase to build the lens trigger. F129's remaining work
is only: (a) NAME Recall@k (the lens already computes it as
`scoreRouterAbCoverage` → "coverage"), and (b) RUN it on the widened corpus as
the ablation baseline. (Carry-staleness: the register kept F129's pre-IR-1
wording across the fix; corrected at session close.)

## §2 · Diagnosis-first — MEASURE is TWO measurements, not one
The runbook conflated "Recall@k + gate-behavior baseline on the widened corpus."
Their specimen requirements are different, so they are two distinct measurements:

**M-A · gate-behavior baseline** — the clarification gate's behavior on the
widened **FRAME-ONLY** corpus.
- Input: the widened frame-only synthetic corpus. The 8 v2 utterances
  (COMMAND + QUERY_TOPOLOGY) are exactly the K1 §8 zero-traffic enum probes —
  this is where they earn their place.
- Why frame-only: the gate decision is frame-based (pre-tool). Frame-only is the
  correct, cheap input; nothing executes.

**M-B · Recall@k baseline** — the router-ab lens (`scoreRouterAbCoverage`),
per-arm (A = production keyword floor, B = semantic router), on recorded
specimens **that have called tools** (full-turn).
- Input: golden specimens + organic recorded turns (real tool usage). NOT the
  frame-only synthetic corpus — `routerAbLens.ts:84` returns `coverage=1` when
  `calledToolNames.length===0` (a trivial pass), and the `isReplayableSpecimen`
  filter drops toolless turns. A small full-turn synthetic batch is optional and
  is closer to the empty≠zero SYNTH-TRAFFIC-2 test (a different lane).

Together, M-A + M-B are the "before" baseline for STEP 5's delta.

## §3 · §7 room cards (the measurement contracts)

### M-A — gate-behavior baseline
- **Contract (E0):** on the widened frame-only corpus, record the clarification
  gate's decision distribution (HIGH / LOW / NONE) and, for COMMAND +
  QUERY_TOPOLOGY frames specifically, the correct-fire vs over-clarify vs
  under-clarify counts.
- **Metric + guardian (E1):** metric = gate-fire correctness on the two new
  enums; guardian = **over-clarification rate**. A gate that clarifies
  everything scores "correct" on ambiguous cases but wrecks the guardian — the
  metric is gamed without it. Both must move together.
- **Baseline nailed (E5):** the pre-⑤/⑥ distribution, written to the ledger with
  corpus version (v2) + rev (143) + N.
- **Liveness (E2):** a deliberately-mislabeled probe (a COMMAND utterance the
  gate SHOULD flag) must turn the correctness metric RED — proves it can fail.
- **Decision-tie (E3):** if M-A cannot distinguish "gate handles the new enums"
  from "gate ignores them," it is not measuring.
- **Seams:** frame extraction (`extractSyntheticFrame`) + the gate
  (`computeClarification` / `stageClarify`).
- **Neighbor-contract:** must not perturb M-B (different specimens, different
  lens) or the live gate behavior.
- **Contribution:** answers K1 §8 for COMMAND + QUERY_TOPOLOGY (two enums
  ratified on a sample of zero) with non-zero traffic.

### M-B — Recall@k baseline
- **Contract (E0):** per-arm (A = keyword floor, B = semantic router), on toolful
  recorded specimens, record `scoreRouterAbCoverage` (coverage = fraction of
  called tools the arm's offered set reached) + the fully-covered rate.
- **Metric + guardian (E1):** metric = Recall@k (coverage); guardian =
  **offered-set width**. An arm that offers ALL tools scores coverage=1
  trivially — the width guardian catches that. Recall without the width guardian
  is meaningless.
- **Baseline nailed (E5):** per-arm coverage on the frozen floor map (GOLDEN
  FREEZE — arm A is the production keyword floor, arm B the semantic router that
  does NOT publish a routing type until B5, per A-1), written to the ledger with
  specimen-set id + rev + N.
- **Liveness (E2):** a specimen whose called tool is in NEITHER arm's offered set
  must drive coverage < 1 — proves the metric isn't stuck at 1.
- **Decision-tie (E3):** must distinguish "semantic arm reaches more / fewer
  tools than the floor" — that delta IS the SOTA-relevant routing signal.
- **Seams:** `routeSemantica` (arm B) + the keyword floor (arm A) +
  `recordedTurn` specimen loader.
- **Neighbor-contract:** read-only, write-nothing (the lens is a lens, not a
  mutation) — must not touch live routing or the frozen map (A-1).
- **Contribution:** the empirical number for "does our semantic routing reach the
  right tools vs the floor" — the routing half of the SOTA claim.

**Stochastic discipline (both):** a small clean sample is NOT proof — N-rep +
the specific observation (standing rule + §7). N and the reps are nailed in the
ledger, not left implicit.

## §4 · Corpus widening mechanism (Option B) — and its trap
The corpus lives in DB `synthetic_question_sets`, self-seeded from in-code
`questionSetCorpusV1.ts` (`SYNTHETIC_QUESTION_SET_V1_UTTERANCES`, 29 rows:
A1–A14, B1–B2, C1–C13) by `seedSyntheticQuestionSets.ts`.

**Decision (reverses the v2-additions doc's Option A): Option B** — AG in-code,
versioned, automation-first (no owner manual paste for pre-authored data). The
admin CRUD panel still stands for ad-hoc owner-curated test data; but for THIS
defined, pre-authored 8-utterance widening, in-code + versioned is the disciplined
path.

**The trap (absence-only seeder):** `seedSyntheticQuestionSets.ts` is
**absence-only** — lines 75–79: if `findByNameLang(v1_NAME, v1_LANG)` finds the
row, it records `rowsSkippedPresent:1` and returns WITHOUT updating, even when
the corpus fingerprint changed. So **appending to the v1 array does NOT propagate
to the DB** (the v1 row exists → skipped). The widening MUST therefore be a
**new v2 set**:

1. **AG:** add `SYNTHETIC_QUESTION_SET_V2_*` constants (name
   `cwf-synthetic-question-set-v2`, 37 utterances = 29 v1 + 8 new; the 8 texts
   VERBATIM from `cwf-synthetic-question-set-v2-additions-v1`; shape = the
   existing `SyntheticUtterance` interface — idx / label / text / class / tags /
   intendedToolCategories / factory). T1–T4 → class 'A' (QUERY_TOPOLOGY,
   intendedToolCategories ≈ ['factory']); M1–M4 → class 'B' (COMMAND,
   intendedToolCategories from the real category list, e.g. linestop / andon).
   Extend `seedSyntheticQuestionSets.ts` to warm-seed a SECOND domain
   `synthetic.question_set_v2` — mirroring the v1 absence-only path (new
   SEED_DOMAIN, new fingerprint, same claim → findByNameLang → insert control
   flow; `createdBy: null` per S33-1, machine-seeded, no minted actor).
2. **Repoint `synthetic.activeSetId`** (governed param) → the v2 set's id. The id
   is insert-generated, so this is **seed-then-repoint**, via the governed
   `publishSyntheticParam` path — NOT a hardwired seeder side-effect, NOT an owner
   panel click. A one-shot gated-service step (AG), after v2 is warm-seeded.

**Reseal check (F169 lesson forward):** if `questionSetCorpusV1.ts` /
`seedSyntheticQuestionSets.ts` are Governance-Model-mapped files, Sub-1 forces a
manifest reseal (rev 143→144) — Sub-1's gated prompt confirms via
`check:doc-drift` and budgets the reseal (+ reviewNote) in the same commit.

## §5 · F179 ruling — NOT a STEP 3 prerequisite
F179 (the synthetic injector runs outside FULL-TRACE — `runSyntheticInjectorTick`
has no forceFlush) does NOT block MEASURE. The measurement's data comes from the
**durable telemetry ledger** (ir_frame rows) + the **router-ab replay lens** on
recorded specimens — neither depends on the injector's Langfuse spans (ADR-008:
ledger ≠ trace). F179 degrades the injector's DEBUG traceability, not the
measurement's DATA. It stays in the observability round (register plan, with
F178). **Caveat:** if a measurement result looks anomalous and needs the
injection's full I/O to debug, pull F179 forward.

## §6 · Sub-phase sequencing
- **Sub-1 (AG, small):** corpus widening — v2 set + seed + activeSetId repoint
  (§4). No F129 trigger/cap work (already landed). Then let round-robin cycle
  ~2–3 passes (≈ 8 × 3 = 24 new frames, minutes at rate 5).
- **Sub-2a (M-A):** read the widened frame-only frames → gate-behavior baseline
  (§3 M-A room card) → nail to ledger.
- **Sub-2b (M-B):** run the router-ab lens on golden + organic toolful specimens
  → Recall@k baseline per-arm (§3 M-B room card) → nail to ledger.

M-A and M-B are independent (different inputs, different lenses); they can run in
either order. Sub-1 gates M-A only. The two nailed baselines together are the
empirical floor for the SOTA claim and the "before" for STEP 5's delta.

## §7 · Open threads carried into execution
- Sub-1 gated prompt: byte-precise after reading `resolveSyntheticTrafficPolicy`
  (how `activeSetId` is currently set/defaulted) + `publishSyntheticParam`
  (the repoint signature) + confirming the reseal-map membership of the two files.
- Ledger target for the nailed baselines (M-A, M-B): which table/row the "before"
  numbers are written to (telemetry_events vs a dedicated baseline record) — decide
  in Sub-2.
- Optional full-turn synthetic batch (empty≠zero adjacent) — out of MEASURE's
  critical path; parked with SYNTH-TRAFFIC-2.

<!-- END · cwf-measure-phase-design-v1 · 2026-07-25 -->
