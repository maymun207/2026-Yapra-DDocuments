# OBS-3.1 — Perturbed Empty-Completion Retry · Design Note
**cwf-obs3_1-perturbed-retry-design · rev 1 · 2026-07-04**
**Status:** DESIGN (architect desk) — not yet a phase prompt. Written against CHAR-1 data (11 runs, 80 strict reps on `07beb11f`) and the live retry loop in `stageStream.ts` @ `c772171`.

---

## 1. What the data forces (not opinion — measured)

Three CHAR-1 findings constrain this design to essentially one shape:

1. **Empty region = 32.5% (26/80), Wilson 95% [23%, 43%].** Real, repeatable, on a single fixed input.
2. **Temperature does not rescue it.** T=0 → 50%, T=1 → 40%, CIs overlap the recorded 30%. Removing sampling jitter is NOT the lever. → An identical re-run at a different temperature would not reliably escape. This kills "just retry hotter/colder."
3. **The empty signature is step-1, pre-tool: 6,049 in → 0 out, `finishReason=stop`, zero tool calls, 486–1,454 ms.** Recovered reps take the tool round (~12.5k in, 111–636 out). The model isn't erroring — it's *deciding to say nothing* on that exact prompt, before it ever considers a tool.

**The inference:** the empty is *input-correlated to a specific prompt state*, and identical re-submission lands in the same high-empty region (CHAR-1's whole point, and why production's identical OBS-3 retry goes 3/3 empty at temp 0.7). The only lever the data leaves open is **changing the input on retry** so the second attempt is not asking the identical question that just died. This is perturbed retry, and CHAR-1 is its justification, not a guess.

## 2. The core design decision — perturbation must be MEANING-PRESERVING and DETERMINISTIC

This is the whole ballgame, and where it could go wrong. A perturbation that changes what the user *asked* is a correctness bug worse than an empty (it silently answers a different question). A perturbation that's an LLM rewrite is a runtime LLM-judge — banned by our constitution. So the perturbation must be:

- **Meaning-preserving:** it must not alter the user's semantic request. It nudges the *framing/scaffold* around the request, never the request tokens themselves.
- **Deterministic:** pure function `(messages, attempt) → messages'`. No LLM call, no randomness that isn't seeded. Testable, replayable, reviewable.
- **Bounded & escalating:** attempt 1 = smallest nudge, attempt 2 = slightly stronger. Still capped by `LLM_EMPTY_RETRY_MAX`. Never unbounded.
- **Observable:** each perturbed attempt emits which perturbation tier it used, so the replay harness can measure per-tier escape rates.

### Three candidate perturbation levers (design will pick, replay will validate — not shipped on guess)
The signature (dies pre-tool, at step 1) says the perturbation should target the model's *first-step decision to engage*. Candidates, cheapest/safest first:

- **P-a — retry directive append (recommended default):** append a short, fixed system-level nudge on retry only — e.g. an instruction to produce the tool call / answer and not return empty. Zero change to user tokens. Purely additive to the scaffold. This is the minimal, lowest-risk lever and directly targets "engage on step 1."
- **P-b — history re-anchoring:** the empty reps sit at 6,049 input tokens vs 12,544 recovered — the empty path is a *shorter* assembled prompt (recovered path includes a served tool result). On retry, re-assert the last user turn as the salient/most-recent instruction (re-anchor) so the model's attention lands on the actual question. Still meaning-preserving; touches ordering/emphasis, not content.
- **P-c — benign whitespace/structural normalization:** the crudest lever — trivially perturb non-semantic formatting to move off the exact token sequence. Weakest theoretical basis; kept only as a floor if a/b underperform in replay.

**Committed design stance:** P-a as the primary, P-b as the escalation on attempt 2, P-c rejected unless replay shows a/b flat. Rationale: P-a and P-b both target the measured signature (step-1 non-engagement); P-c is cargo-culting a token change with no mechanism behind it. But — see §5 — the *replay harness decides the final ordering*, not this note.

## 3. Where it plugs in (surgical — 3 touch points, no rewrite)

The loop in `stageStream.ts` already has the exact shape. OBS-3.1 adds a perturbation step at the `retry` branch, nothing else moves:

- **Touch 1 — a new pure helper** `perturbForRetry(messages, systemPrompt, attempt) → { messages, system }` in `completionGuard.ts` (or a sibling `retryPerturbation.ts`), alongside the existing pure helpers (`isRetriableEmpty`, `decideRetry`, `filterPreTokenDelta`). Pure, deterministic, unit-testable in isolation — mirrors ADR-003's helper style exactly.
- **Touch 2 — the retry branch** (currently `if (decision === 'retry') { log; emit; continue; }`): before `continue`, apply `perturbForRetry` to produce the next attempt's `messages`/`system`. The `streamChat` call at the top of the loop reads the perturbed values instead of the frozen originals. **Critically: attempt 0 is ALWAYS the unperturbed original** — the user's real question runs verbatim first; perturbation only happens after a measured empty. No user ever gets a perturbed first answer.
- **Touch 3 — telemetry** `emptyRetryEmitPayload` gains a `perturbationTier` field (`none` | `directive` | `reanchor`) so the ledger and the replay harness both see which lever fired. Redaction posture unchanged — tier is an enum, never content.

Everything else — the no-double-paint `filterPreTokenDelta` guard, the `give-up` honest-completion floor, the cross-provider ban, `LLM_EMPTY_RETRY_MAX` bound — stays byte-identical. empty≠zero and the honest-message floor are untouched; perturbation sits strictly *between* "empty detected" and "give up."

## 4. The invariant that must not break

**A perturbed retry that produces a wrong-but-non-empty answer is a REGRESSION, not a win.** The empty guard's honest message ("I couldn't complete that") is *correct behavior* — it never lies. A perturbation that coaxes the model into confabulating an answer to a subtly-changed question is worse than the empty it replaced. So the design's success metric is NOT "empty rate → 0." It is **"empty rate down AND grounding/scope verdicts unchanged on the recovered reps."** The deterministic grounding check (kademe 11) already runs post-completion; OBS-3.1's replay validation must confirm perturbed-recovered reps pass grounding at the same rate as naturally-recovered reps. If perturbation buys a lower empty rate at the cost of grounding failures, it's rejected.

## 5. How it gets validated — replay first, production second (the standing rule)

OBS-3.1 is the replay lab's first real customer. The sequence is non-negotiable:

1. **Design the perturbation helpers** (this note → phase prompt).
2. **Measure in replay against `07beb11f`:** the REPLAY-B engine runs the perturbed task-fn at N=25 per tier. Evidence gate: **"empty rate drops from the CHAR-1 baseline [23–43%] to a Wilson-CI-separated lower band, AND recovered-rep grounding verdicts match natural recoveries."** A tier that doesn't separate its CI from baseline is not adopted — no shipping on a point estimate (stochastic-verification discipline).
3. **Only then** wire it into production `stageStream.ts` behind the existing bound.

**The N=1 specimen limit (CHAR-1 F4) is a stated design risk, carried explicitly:** the perturbation is *designed and validated on one turn*. Its production generalization is unproven until fresh captures (the §6 capture trigger) give a second and third specimen. So OBS-3.1 ships with its own replay instrumentation live (per-tier `perturbationTier` telemetry) — production becomes its own ongoing experiment, and the first divergent specimen captured in the wild gets replayed against the shipped perturbation. This is buy-before-build honesty: we don't pretend one specimen generalizes; we make the disagreement measurable.

## 6. What this note does NOT decide (deliberately open for your call)

The one strategic decision I flagged — **when perturbation fires in production** — reduces, given the design, to a narrower question than the original three options. Because attempt 0 is always unperturbed and perturbation only follows a *measured* empty, the "proactive on high-risk input" option (pre-detecting a bad prompt and perturbing before the first attempt) would require a runtime classifier for "high-empty-risk input" — which is exactly the kind of predictive judgment we keep deterministic-or-not-at-all. My committed recommendation is therefore **reactive-only: perturb strictly after a detected empty, never predictively.** It needs no new classifier, keeps attempt 0 honest, and the data (step-1 empty is only detectable *after* it happens) supports nothing else. I'll carry that as the single-path recommendation into the phase prompt unless you override.

---

## Committed next artifact
A gated `claude-code-PHASE-OBS-3.1-perturbed-retry-v1.md` phase prompt: pre-flight (incl. the new "drift gate green" line + the `e565dd3` manifest fix folded in) → hard constraints (perturbation pure/deterministic/meaning-preserving; attempt-0-unperturbed invariant; grounding-parity gate; no LLM judge; empty≠zero floor untouched) → gated sub-phases (helper + unit tests → replay validation per tier with CI-separation evidence → production wire-in) → self-verification demanding the replay CI-separation numbers and grounding-parity as literal evidence, not "tests green."
