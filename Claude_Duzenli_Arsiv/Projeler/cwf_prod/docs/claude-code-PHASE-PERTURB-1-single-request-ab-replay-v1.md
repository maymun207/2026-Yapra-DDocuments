# PHASE PERTURB-1 — Part A single-request A/B perturbation replay (activate the shell, one pass) · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG / Claude Code on AntiGravity). Code-grounded at master HEAD
     ff46bf3 (983/983, 92 files, docVersion rev 46, drift [OK]). Activates the INACTIVE ReplayTab
     "Part A · single-request replay" shell as a two-armed A/B (baseline vs perturbed) over the ALREADY-
     SHIPPED REPLAY-B engine — NO new engine, scorer, budget, stub, or rep loop. Grounded by the design
     note cwf-single-request-replay-perturbation-design-v1.md (§7 decisions LOCKED below). It REUSES
     runExperiment/taskFn/stubTools/scorers/redactGroundingVerdict/loadRecordedTurn verbatim and adds a
     paired orchestration + one POST mode + an audit row + UI activation. It SPENDS TOKENS and runs the
     LLM → it is AUDITED (unlike the REPLAY-A1/A2 GET governance lenses). This phase ALSO folds in, up
     front, EVERY Part-B UX accretion the owner added incrementally during REPLAY-B (see §PARITY) so we
     do not re-add them one-by-one. SECURITY-RELEVANT (reads cross-user turns, spends tokens, C9
     boundary) → FULL REVIEW, design-note-first (done). Architect writes this prompt (not AG). -->

## LOCKED design decisions (design note §7 — do not re-litigate)
- **7.1** ONE fixed "completion / model output" stage entry — the shell's selector is preserved but non-multi; do NOT fabricate per-stage pipeline isolation (only the completion stage consumes nudge/temp/model; grounding/routing are the deterministic A1/A2 lenses, nothing to perturb).
- **7.2 (load-bearing)** N-rep-per-arm by DEFAULT (reuse Part B `reps`). A 1-vs-1 A/B conflates the perturbation with sampling noise — a single-shot mode may exist ONLY if labeled "illustrative, not evidence."
- **7.3** ONE POST paired run (`mode:'ab'`) — atomic token budget across both arms, ONE paired `replay_audit` row.
- **7.4** perturbations COMBINABLE on arm B; any unset perturbation inherits the baseline (recorded) value.

## 0. HARD PRE-FLIGHT GATE (all literally true; paste evidence)
- [ ] Fresh clone; `git rev-parse origin/master` == **`ff46bf3…`** (RULE 25).
- [ ] `npm ci` clean; baseline **983/983 (92 files)** green BEFORE any change (paste).
- [ ] **Drift gate green** (`npm run check:doc-drift` → `[OK]`) untouched clone (paste).
- [ ] Read the reuse map (§3 of the design note) and confirm: this adds NO new rep loop, scorer, token budget, or stub path. If the build starts to, STOP — it drifted from reuse.

## 1. What it is (reuse, not rebuild)
Two arms over the existing `runReplayExperiment`:
- **Arm A (ORIGINAL / baseline):** `perturbationTier='none'`, recorded provider/model/temperature.
- **Arm B (REPLAYED / perturbed):** the chosen subset of `perturbationTier` (`none|reanchor|directive`) / `temperature` / `provider`+`model`; unset ⇒ baseline value.
Each arm = an existing `ReplayRunSummary` (reps, emptyRate, grounding{checkedReps,cleanReps,violationReps}, reps[], sample reply). The panes show arm A vs arm B + a delta. This is the interactive surface for the OBS-3.1 comparison the engine already runs.

## 2. HARD CONSTRAINTS (violating any = rejected review)

**2.1 — REUSE verbatim, zero new engine.** `runReplayExperiment`, `taskFn`/`runReplayRep` (C7 retry-disabled, C6 cwf.replay span, C1 write-nothing), `stubTools` (C3 recorded stubs — NO live backend re-hit), `retryPerturbation` (audited tiers, pure — meaning-preserving, user request tokens never altered), the gateway `temperature`/`provider`/`model` overrides (C7), scorers (`emptyCompletionScorer`, `groundingScorer`=production `runGroundingCheck`, `floorPhraseScorer`), `redactGroundingVerdict` (C9), `loadRecordedTurn`, `config.ts` bounds. A grep must show NO second rep loop / budget / scorer / stub added.

**2.2 — ATOMIC token budget across BOTH arms (C5).** One paired run shares ONE `REPLAY_MAX_REPS`-clamped, server-side token budget (client never supplies a budget or a rep count above the hard ceiling). If the budget is exhausted mid-run, the arm stops and reports `repsCompleted < repsRequested` honestly — never a silent partial pretending to be complete.

**2.3 — AUDITED (C4 — this is NOT A1/A2).** The paired POST writes ONE `replay_audit` row: actor · source `messageId` · both arms' parameters (tier/temp/provider/model) · reps · both arms' `emptyRate` + grounding summary + the delta. NO raw payloads, NO secret, NO reply text in the audit. (The A1/A2 GET lenses stay un-audited; this POST is audited because it spends tokens — audit-or-alarm.)

**2.4 — C9 boundary + no-leak test.** The POST response returns, per arm: metadata + reps' outcome + **reply text** (conversation text, already exposed to this REPLAY_RUN caller, like `specimenDetail`) + tool **NAMES** + redacted grounding verdicts (kind/severity). It NEVER returns `raw_tool_results` payloads or violation evidence. Add a no-leak test that plants a poison payload in a stub and asserts it is absent from the paired-run response body AND the audit row.

**2.5 — N-rep-per-arm + Wilson-CI delta (§7.2, the stochastic-discipline core).** `reps` applies EQUALLY to both arms (fair A/B); `missPolicy` shared. The delta is NOT a bare rate difference: report the empty-rate delta WITH Wilson-CI separation (reuse the project's existing Wilson-CI helper if present; else compute the standard two-proportion Wilson interval — deterministic, no LLM). A delta whose CIs overlap renders labeled **"not distinguishable from noise (N too small)"**, never as a confident effect. Single-shot (reps=1) is allowed but the UI labels the result "illustrative, not evidence."

**2.6 — empty≠zero render honesty (OBS-2, extends here).** An arm returning an empty completion shows the honest OBS-2 message, never a blank pane; a 0/N empty rate renders `0`; an unrun arm renders `—`; never a bare "0/0".

**2.7 — REPLAY_RUN gate (C4).** Both the POST and any specimen/detail read are `ensurePermission(REPLAY_RUN)` (super_admin), the exact pattern already in `api/admin/replay.ts`.

## §PARITY — FOLD IN every Part-B UX accretion UP FRONT (do NOT ship a bare version)
The owner added these to Part B one at a time; Part A must have their equivalents from the first commit:
1. **ChoiceChip selected-state** (REPLAY-UX-3 #1) — reuse the SAME `ChoiceChip` (filled `default`/bg-primary token, `aria-pressed`) for reps, miss-policy, and the nudge-tier chips. No bespoke chip.
2. **Searchable specimen picker** — reuse `listReplaySpecimens`/the Part B picker; each specimen shows its metadata; the request fires ONLY on an explicit user action (load / run), never on mount.
3. **Per-arm per-rep outcome table, expandable** — reuse Part B's `expandedReps` pattern; each rep row expands to its actual reply; never a bare "0/0".
4. **Safe detail expand, C9-redacted** (REPLAY-UX-3 #2) — reuse the redacted expand path: full reply text + tool NAMES only, NO raw payloads. The no-leak test (§2.4) covers it.
5. **Langfuse deep-link per arm** (REPLAY-UX-3 #3) — reuse `ObservabilityConfig` (non-secret host+projectId); each arm's run is `cwf.replay`-tagged and deep-links to its Langfuse session/trace. Graceful-off when host/projectId unset (no link, no crash).
6. **Honest-empty everywhere** (§2.6).
7. **Server-clamped controls** — reps clamped to `REPLAY_MAX_REPS`, miss-policy from `REPLAY_MISS_POLICIES`; the client never supplies a budget.
8. **Provider+model select from the Providers registry** (`llm_providers`, the rows the Providers tab shows) — arm B's model override picks from the registry, not a free-text model string.

## 3. GATED SUB-PHASES
**3-A · D1 paired orchestration** (`api/cwf/_lib/replay/`): a thin `runPairedReplay(req)` that calls the existing `runReplayExperiment` twice (arm A baseline, arm B perturbed) under ONE shared token budget, returns `{ baseline: ReplayRunSummary, perturbed: ReplayRunSummary, delta: { emptyRateDelta, wilson: {...separation}, groundingKindDiff } }`. No new scorer/budget/loop. Pure-core + a deps seam so tests stay pure. Tests: arm B inherits baseline for unset perturbations; budget is shared+atomic; delta CI-overlap → "noise".
**3-B · D2 endpoint mode** — extend POST `/api/admin/replay` with `mode:'ab'` (baseline+perturbed in one request), REPLAY_RUN-gated, atomic budget, returns the paired shape (§2.4 redaction). Existing Part B POST path stays byte-identical (mode absent ⇒ current behavior).
**3-C · D3 audit** — the `mode:'ab'` POST writes ONE paired `replay_audit` row (§2.3). Reuse Part B's audit path; extend its payload for two arms + delta; NO reply text / payload / secret. Test: an ab run writes exactly one audit row with both arms' params + rates, no payload.
**3-D · D4 UI activation** (`ReplayTab.tsx`) — turn the shell LIVE with the full §PARITY surface: the fixed "completion / model output" stage entry (7.1); nudge-tier + temperature + provider/model controls on arm B (7.4, combinable); shared reps + miss-policy chips; run → paired run; ORIGINAL pane = baseline summary, REPLAYED pane = perturbed summary, with the delta + Wilson-CI label between; per-arm expandable rep tables; per-arm Langfuse deep-link; honest-empty. Remove the InactiveBanner. RTL tests for the full flow.
**3-E · Reseal + docs** — two-commit seal; `api/**` is mapped → reseal + docVersion rev 46 → 47, re-sync the Governance Model / control-plane tab that depicts the replay surface (Part A now live + audited). CHANGELOG + SKILL-KB. Diff-scope EXPLICITLY permits `.agents/CHANGELOG.md` + manifest reseal + the frontend service method.

## 4. SELF-VERIFICATION (literal evidence)
1. Baseline → final test counts, itemized (paste).
2. **Reuse proof (§2.1):** grep shows NO new rep loop / token budget / scorer / stub; `runPairedReplay` calls `runReplayExperiment` twice. Paste.
3. **Atomic budget (§2.2):** test proving both arms share one budget + honest `repsCompleted<requested` on exhaustion. Paste.
4. **Audited (§2.3):** an ab run writes ONE paired audit row (both arms' params + rates, NO payload/reply/secret). Paste.
5. **No-leak (§2.4):** planted poison absent from the paired-run body AND the audit row. Paste.
6. **Wilson-CI delta (§2.5):** CI-overlap delta → "not distinguishable from noise"; reps applies to both arms. Paste.
7. **§PARITY:** each of the 8 folded items present (chip selected-state, picker-on-action, expandable per-arm table, C9 redacted expand, per-arm deep-link, honest-empty, server-clamp, registry model select) — cite the test/line for each.
8. **Part B untouched (regression):** existing REPLAY-B POST (no `mode`) byte-identical; its tests pass unchanged.
9. Seal: tsc ×3 + oxlint clean; drift `[OK]`; docVersion rev 47; two `--no-ff` merges held for push; `origin/master` still `ff46bf3`.

## 5. AFTER GREEN — owner (Architect surfaces)
No migration (reuses `replay_audit`), no env, no secret. Live check: Replay → Part A now active → pick a specimen → set arm B (e.g. `temp` 0.9 or a model swap) → reps 5× → run → baseline vs perturbed rates + Wilson-CI delta + per-arm deep-links. Architect verifies from logs the paired run is `cwf.replay`-traced, audited, and no-live-rehit (stub-served).
