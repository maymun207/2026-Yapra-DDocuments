# CWF — Single-Request Perturbation Replay ("Part A" shell) — Design Note · v1
<!-- rev 1 · 2026-07-06 · Design note (NOT a phase prompt). Grounds the activation of the ReplayTab
     "Part A · single-request replay" perturbation shell (the model-perturbation feature — distinct
     from the REPLAY-A1/A2 governance lenses that already shipped on the specimen-detail panel).
     Code-grounded at master HEAD 3f8b639 (rev 46, 980/92). Precedes the AG phase prompt per the
     standing "design note BEFORE the phase prompt" rule for security-relevant replay work. Author:
     Architect lane. Ships under phase PERTURB-1. -->

## 0. Purpose (one paragraph)

The ReplayTab has an INACTIVE "Part A · single-request replay" shell: a captured-stage selector +
`nudge` / `temp` / `model` perturbation chips + an ORIGINAL vs REPLAYED pane pair + a run button. The
owner wants it built. This note establishes, from the code at `3f8b639`, **what this feature actually
is (a two-armed A/B over the completion stage), that every perturbation primitive it needs ALREADY
EXISTS in the shipped REPLAY-B engine, the two honest design corrections the shell's UI implies wrongly
(the "captured stage" abstraction and the single-shot stochastic trap), the reuse-not-rebuild scope,
and the security/audit posture.** It is not the phase prompt; it is the artifact that lets us write a
correct one. It is UNRELATED to REPLAY-A1/A2 (deterministic governance lenses, no LLM) — this one
RE-RUNS THE MODEL and spends tokens.

---

## 1. What it actually is: a two-armed A/B on the completion stage (not new engine work)

The shipped REPLAY-B engine already re-runs a recorded turn through the production gateway against the
recorded tool STUBS, retry-disabled, write-nothing, token-budgeted, cwf.replay-traced, and scores it
deterministically. Reading `runExperiment.ts`'s `ReplayRunRequest`, **every knob the Part A shell
exposes is already a first-class engine parameter:**

| Shell chip | Existing engine parameter (code) | Path |
|---|---|---|
| **nudge** | `perturbationTier: 'none' \| 'reanchor' \| 'directive'` (OBS-3.1) | pure deterministic input transform in `taskFn` via `perturbForRetry`/`attemptForTier` |
| **temp** | `temperature?: number` → `streamChat({ temperature })` (C7) | wired end-to-end |
| **model** | `provider?: string` (registry id) + `model?: string` (C7) | wired end-to-end; the registry rows are the Providers tab |

So "Part A" is **not a new engine** and **not per-stage isolation of the pipeline**. It is a
two-armed orchestration over the EXISTING `runExperiment`:
- **Arm A (ORIGINAL / baseline):** `perturbationTier='none'`, recorded provider/model/temperature.
- **Arm B (REPLAYED / perturbed):** the chosen nudge tier and/or temperature and/or provider+model.

Run both, show each arm's output + deterministic scorer verdicts side by side. This is, precisely, the
interactive surface for the **OBS-3.1 3-arm comparison** the engine was built to run
(`none` vs `reanchor` vs `directive`) — "does this perturbation change the outcome on this specimen?"

---

## 2. The two honest corrections the shell's UI implies wrongly (the load-bearing findings)

**2.1 — The "captured stage" selector is aspirational — there is exactly ONE perturbable stage.** The
replay engine re-runs the WHOLE turn (`buildSystemPrompt` → `streamChat` with stubs); it has no
per-stage isolation. And `nudge`/`temp`/`model` only change anything on the stage that CALLS THE LLM —
the **completion (model) stage**. The other pipeline stages are deterministic: grounding and routing
are already covered by REPLAY-A1/A2 (no LLM, nothing to perturb with temp/model); resolve/governance/
tools-register don't consume temp/model/nudge. **Committed correction:** do NOT ship a multi-option
"captured stage" selector that pretends per-stage perturbation exists. Either (a) drop the selector and
label the feature honestly as "completion-stage A/B", or **(b) — lean — keep a single, fixed-value
selector reading "completion / model output"** so the shell's shape is preserved without over-promising.
Naming the other stages as perturbable would be the "fabricated capability" sin the project keeps
refusing.

**2.2 — A single ORIGINAL-vs-REPLAYED shot is a stochastic-verification trap.** `temp`/`model`/`nudge`
re-run a STOCHASTIC LLM. A 1-vs-1 A/B conflates the perturbation's effect with sampling noise — the
observed difference may be pure chance. This directly violates the standing rule ("stochastic
verification discipline: a small clean sample is NOT proof; N-rep + specific observation"). The shell's
single ORIGINAL/REPLAYED panes imply single-shot, which is exactly the trap. **Committed correction:
each arm is N-rep** (reuse Part B's `reps` control + `emptyCompletionScorer`/`groundingScorer`), and
each pane shows the arm's **rate** (e.g. empty rate k/N + grounding summary) PLUS one representative
rep's text — a distributional A/B, not a single sample. A single-shot mode may exist but MUST be
labeled "illustrative, not evidence." The honest default is N-rep-per-arm.

---

## 3. Ground-truth reuse map (what exists vs what's new)

**Reused verbatim (no change):** `runExperiment` (rep loop, token budget C5, deterministic aggregation
C2), `taskFn`/`runReplayRep` (one raw attempt, retry-disabled C7, cwf.replay span C6, write-nothing
C1), `stubTools` (recorded-stub fidelity C3 — no live backend re-hit), `retryPerturbation`
(nudge tiers, pure), the gateway `temperature` override, the provider/model overrides, the scorers
(`emptyCompletionScorer`, `groundingScorer`, `floorPhraseScorer`), `redactGroundingVerdict` (C9),
`loadRecordedTurn`.

**New (small):**
- **D1 — a paired-run orchestration.** Run arm A (baseline) and arm B (perturbed) — each N reps — under
  ONE token budget, return `{ baseline: armSummary, perturbed: armSummary, delta }` where each
  `armSummary` = the existing Part B run summary shape (reps, empty rate, per-rep outcomes, a sample
  reply, grounding). `delta` = empty-rate difference + a category-name grounding diff (reusing the A1
  redacted-verdict shapes). No new scorer, no new engine.
- **D2 — the endpoint mode.** Either extend the existing POST `/api/admin/replay` with a `mode:'ab'`
  (baseline vs perturbed arms in one request) OR add a sibling. **Lean: one POST that runs both arms**
  (atomic token budget + one paired audit). It is `REPLAY_RUN`-gated exactly like Part B.
- **D3 — AUDIT (this is NOT A1/A2).** Unlike the pure GET governance lenses, this SPENDS TOKENS and
  runs the LLM → it MUST write `replay_audit` (audit-or-alarm: a run with tokens/spans is never
  un-audited). Reuse Part B's audit path; a paired run writes an audit row capturing both arms'
  parameters + rates (NO raw payloads, NO secret).
- **D4 — UI activation.** Turn the shell live: perturbation chips become real controls — a nudge-tier
  selector (`none`/`reanchor`/`directive`), a temperature input, a provider+model select drawn from the
  Providers registry (`llm_providers`, the same rows the Providers tab shows); the `reps` control per
  arm; the run button fires the paired run; ORIGINAL pane = baseline arm summary, REPLAYED pane =
  perturbed arm summary, with the delta between them. Graceful-off + honest empty handling (an empty
  completion never renders blank — the same OBS-2 honesty Part B uses).

---

## 4. The hidden trap: the determinism/safety split, restated for this feature

- The **scorers** are deterministic/authoritative (pure code, `empty≠zero`, never an LLM judge) — the
  only nondeterminism is the LLM being MEASURED, quarantined in `taskFn` (C7). This holds unchanged.
- The **perturbation** is a soft/experimental lever — but it must stay MEANING-PRESERVING (the
  `retryPerturbation` C1 invariant: the user's request tokens are never altered/reordered/dropped). Do
  NOT invent new perturbations that mutate user meaning; reuse the audited tier vocabulary.
- **empty≠zero at the render layer** extends here: an arm that returns an empty completion shows the
  honest OBS-2 message, never a blank pane; a 0/N empty rate renders `0`, an unrun arm renders "—".

---

## 5. Security & posture

Reads recorded cross-user turns (super_admin, `REPLAY_RUN` gate — same as Part B). Spends tokens (real
LLM). C1 write-nothing to governed conversation/message tables; C3 recorded stubs (NO live backend
re-hit); C7 retry-disabled; C5 token budget; C6 cwf.replay spans; **C4 audited** (D3); C9 the panes
show completion text (conversation text already exposed to this gated caller, like `specimenDetail`) —
tool-result payloads stay stubbed server-side. **Security-relevant → full review, not hotfix mode**,
design-note-first (this note), with the token-budget bound, the no-live-rehit stub proof, the audit
row, and the empty≠zero render honesty as gating evidence.

---

## 6. Explicitly OUT of scope

- **True per-stage pipeline isolation** (running only stage N of the pipeline). The engine is
  whole-turn; the completion stage is the only perturbable one (§2.1). Do not fake others.
- **New perturbation kinds** beyond the audited `retryPerturbation` tiers + temp + model. No
  user-meaning-mutating transforms.
- **A cross-provider recovery claim** as a runtime feature — this is an offline A/B INSPECTION; it does
  not change the production OBS-3 retry policy (which stays bounded same-provider).
- **A single-shot "proof."** N-rep-per-arm is the honest default (§2.2).

---

## 7. Open decisions (settled here; confirm before the phase prompt)

- **7.1 "captured stage" selector.** **Lean (b): keep a single fixed "completion / model output" entry**
  (preserve the shell's shape; do not pretend per-stage isolation). *Confirm.*
- **7.2 N-rep vs single-shot.** **Lean: N-rep-per-arm by default** (reuse Part B's `reps`); single-shot
  only if explicitly labeled "illustrative, not evidence." *Confirm — this is the load-bearing one.*
- **7.3 Endpoint.** **Lean: one POST paired run** (`mode:'ab'`), atomic token budget, one paired audit
  row. *Confirm.*
- **7.4 Perturbation surface.** nudge = the 3 audited tiers; temp = a bounded numeric input; model =
  a Providers-registry select. All three combinable on arm B, or one-at-a-time? **Lean: combinable**
  (arm B carries whatever subset is set; unset ⇒ inherits baseline). *Confirm.*

---

## 8. What this is NOT

- **Not REPLAY-A1/A2.** Those are deterministic, no-LLM governance lenses on the specimen-detail panel.
  This re-runs the MODEL, spends tokens, is stochastic, and is audited. Do not conflate the two "Part A"
  surfaces (the standing naming collision — this note is about the perturbation shell only).
- **Not a new engine.** It is a two-armed orchestration over the shipped `runExperiment` + a UI
  activation. If the build starts adding a new rep loop, budget, scorer, or stub path, STOP — that is a
  signal it drifted from reuse.
- **Not a runtime-policy change.** Inspection/experiment only; production OBS-3 retry is untouched.
