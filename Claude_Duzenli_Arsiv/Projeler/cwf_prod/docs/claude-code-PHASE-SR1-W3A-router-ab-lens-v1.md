# PHASE SR1-W3a — Router A/B Replay Lens (floor-vs-router, report-only)

<!-- claude-code-PHASE-SR1-W3A-router-ab-lens-v1 · rev 1 · 2026-07-17 · Architect-authored (S49 opener).
     Scope: W3a ONLY (lens build + real-specimen run + evidence artifact).
     W3b (router.enabled publish) and W3c (observation window + retirement DECISION)
     are SEPARATE, owner-gated steps authored AFTER the owner reviews W3a evidence. -->

## PRECONDITION (S47-1 — check FIRST, before any work)
Valid only while `origin/master == fd0be2b` and no other SR1 branch is open.
On mismatch: **STOP and report actual state** — do not adapt, do not proceed.

## PROFILE
**FULL** (multi-file, touches `api/cwf/_lib/replay/**`). CI (unsharded) is the sole
test arbiter (S37-2/S43-2). Merge only on CI green. `--no-ff` (squash banned).

## PLATINUM COMPLIANCE
The entire A/B — specimen selection, both arms, all reps, scoring, evidence JSON —
runs from ONE invocation of one gated seam. Zero manual assembly. The owner's only
touchpoints downstream are: reviewing the evidence and the enable GO (genuine
decisions). If any step of this phase requires a human to stitch results by hand,
the design is wrong — stop and flag.

## 🧊 FREEZE STATEMENT
Ordinary replay only. This phase MUST NOT: touch golden specimens, golden gate
machinery, golden_runs tables, or propose any golden run. Rides the standing
replay quota. Structurally freeze-clean per register v50 §0.

## MISSION
Produce the decisive evidence for the `router.enabled` flip: on REAL recorded
specimens, compare the production keyword/learned floor path (arm A) against the
semantic router path (arm B) — measuring, deterministically, whether each arm's
category selection would have REACHED the tools the original turn actually used,
plus divergence, floor-rate, latency, and the router's would-be proposals
(REPORT-ONLY). Router stays DARK throughout: this phase changes ZERO production-path
bytes.

## PRE-FLIGHT (grep-verified, paste outputs in report)
```bash
git rev-parse origin/master                       # must print fd0be2b…
grep -n "recordRouteProposals" api/cwf/_lib/toolCategories.ts   # emission site — the trap
grep -n "export async function routeSemantica" api/cwf/_lib/semanticRouter.ts
grep -n "resolveRoutingLearnedMap" api/cwf/_lib/replay/routingSlice.ts
grep -n "wilsonInterval" api/cwf/_lib/replay/pairedReplay.ts
grep -n "toolNames" api/cwf/_lib/replay/recordedTurn.ts
grep -n "ROUTER_ENABLED" api/cwf/_lib/knowledge/reference/agentParams.ts
```
Verify from `package.json` the exact test/build commands before running anything
(S32-1). Read `runExperiment.ts` + `scorers.ts` in full before designing the
integration — the lens MUST ride the existing experiment engine seams (specimen
loading, reps, quota/tokenBudget, result persistence). No parallel engine.

## BINDING CONSTRAINTS
1. **C-EMIT (the trap, absolute):** the replay router arm calls `routeSemantica`
   DIRECTLY. It NEVER calls `resolveToolCategories` with an enabled policy and
   NEVER touches `recordRouterProposal`/`router_proposals` by any path.
   `router_proposals` must contain ZERO rows after the full run. Pin with:
   (a) a test asserting the lens module has no import/reference to the proposals
   repository/RPC, and (b) a run-scoped assertion in the evidence output
   (`proposals_written: 0`, read via count before/after in test fixtures only —
   production run does NOT read the table, it simply never writes).
2. **C-DARK:** zero diffs under `api/cwf/_lib/turn/`, `toolCategories.ts`,
   `semanticRouter.ts`, `resolveRouterPolicy.ts`, `resolveRouterPromptTemplate.ts`
   — production path byte-identical. Additive files under `_lib/replay/` plus the
   experiment-engine registration point only. Frozen-surface diff name-list in
   the report.
3. **C-REAL-BRAIN:** arm B must run the REAL brain: resolve the policy via
   `resolveRouterPolicy` (then force `enabled:true` for the arm object only) and
   the template via `resolveRouterPromptTemplate` — so the A/B exercises the LIVE
   governed `router.prompt` row (source:db, rule c1ea1cf6), not the code floor.
   Evidence JSON must record which template source served (db|floor).
4. **C-SEMANTICS:** arm B mirrors production fall-through exactly: on
   `{floor:true}` the arm's categories = arm A's keyword result (and the rep is
   counted in `floor_rate`, not discarded). Genuine-replace only on success.
5. **C-METRICS (deterministic scorer, no LLM judge):** per specimen per rep:
   - `coverage`: fraction of the specimen's recorded `toolNames` present in the
     arm's candidate tool set (categories → tools via the same union
     `routeKeywordLayer`/candidate derivation production uses, including
     ALWAYS_INCLUDE floor — replicate via existing pure helpers, do not fork
     logic).
   - `matched_categories` (names), `divergence` (set diff A vs B),
     `latency_ms` (B only), `dropped`, `proposals` (keywords, REPORT-ONLY),
     `floored` (bool + reason).
   Aggregates: per-arm coverage Wilson CI via the EXISTING `wilsonInterval`,
   `distinguishable` flag, floor-rate CI, per-specimen table. Report
   underpowered honestly: overlapping CIs = "not distinguishable at this N",
   never "no effect" (Wilson-CI lesson, 2026-07-06).
6. **C-REPS:** arm A is deterministic — compute once per specimen and assert
   determinism with one repeat in tests. Arm B: `reps=3` per specimen (default;
   engine-parameterized).
7. **C-SPECIMENS:** N=24 real, recent, replayable specimens (have
   `raw_tool_results`), selected by the ENGINE (newest-first, distinct
   conversations, both backends when available) — selection criteria are code,
   not hand-picking. Turkish-heavy phrasing is expected and is the point (SR-1
   motivation). Specimen ids + previews in evidence (C9 redaction line holds:
   tool NAMES only, never payloads).
8. **C-BUDGET:** rides existing replay quota through the engine's tokenBudget
   seam; estimate ≈ N×reps×(catalog+question) ≲ 0.5M tokens — hard-cap the run
   at 1.5M via the existing budget parameter. Abort-on-exhaustion inherits
   engine behavior.
9. **C1 LAW:** zero writes to `messages`. Zero learned-map writes. Zero DB
   writes anywhere except the engine's own experiment-result persistence.
10. **EVIDENCE ARTIFACT:** the run emits ONE versioned JSON
    (`router-ab-evidence-…`) through the engine's result store + a
    human-readable summary block in the run log. Versioned per standing rule.

## GATED SUB-PHASES
- **W3a.1 — Lens core** (`routerAbLens.ts` or equivalent under `_lib/replay/`):
  arms, scorer, aggregation. Unit tests: emission-absence pin (C-EMIT), arm-A
  determinism, fall-through semantics (C-SEMANTICS), coverage math on fixtures,
  Wilson aggregation reuse. GATE: targeted tests green locally → proceed.
- **W3a.2 — Engine registration + seam**: register the lens in the existing
  experiment engine + expose through the existing gated admin replay seam
  (capability-gated, same pattern as current lenses). GATE: integration tests
  green; frozen-surface diff empty.
- **W3a.3 — Real run** (AG executes via gated seam per ADR-006 rev 2 / S43-4):
  N=24, reps=3. Paste the summary + evidence JSON location in the report.
- **W3a.4 — Docs**: `.agents/` CHANGELOG entry + skill-KB note. If the drift
  gate flags mapped files: reseal to rev 106 IN the merge commit (pre-assigned
  here — single artifact in flight).

## SELF-VERIFY (evidence, not claims)
- [ ] Pre-flight outputs pasted; anchor greps match.
- [ ] `git diff --stat fd0be2b..HEAD` — name-list confirms C-DARK surfaces
      untouched.
- [ ] CI green on the PR head (unsharded) — the arbiter.
- [ ] Emission-absence test present and named in report.
- [ ] Run evidence: per-arm coverage CIs, floor-rate, divergence table,
      proposals list (report-only), `template_source: db`.
- [ ] `router_proposals` row count unchanged (0) — state how verified without a
      production-path read (test-fixture assertion + absence of any writer).

## MERGE (only after CI green + Architect FAST-GATE GO)
Merge message, verbatim (S30-2):
```
Merge SR1-W3a: router A/B replay lens — floor-vs-router coverage evidence on real specimens (report-only proposals, production path byte-identical)
```
`--no-ff`. Report remote master hash after push.

## REPORT FORMAT
1. Precondition check output. 2. Pre-flight outputs. 3. Files added/changed +
diff-stat. 4. Test names for each pinned constraint. 5. Run summary (the
evidence). 6. CI link/status. 7. Deviations (flag, don't improvise).

<!-- END · claude-code-PHASE-SR1-W3A-router-ab-lens-v1 · rev 1 · 2026-07-17 -->
