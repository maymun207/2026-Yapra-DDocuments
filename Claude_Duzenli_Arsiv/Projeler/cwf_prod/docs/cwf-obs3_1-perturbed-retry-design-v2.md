# OBS-3.1 — Perturbed Empty-Completion Retry · Design Note
**cwf-obs3_1-perturbed-retry-design · rev 2 · 2026-07-04 · supersedes rev 1**
**Status:** LOCKED design (decision record: KB v15 §4) → phase prompt issued (`claude-code-PHASE-OBS-3_1-perturbed-retry-v1.md`).
**Delta rev 1 → rev 2:** (1) **P-b promoted to primary** (attempt 1) per Maymun's committed choice; P-a demoted to attempt-2 escalation. (2) **P-b mechanism corrected**: the empty dies pre-tool, so there is NO prior tool result to re-anchor — P-b re-anchors the **last USER turn** within the same frozen 6,049-token prompt. (3) Tier enum ordering locked `none | reanchor | directive`. (4) New named trap: perturbation must be **attempt-local** — never mutate `ctx.aiMessages`/`ctx.systemPrompt` in place (persistence + promptSnapshot must reflect the REAL conversation). (5) Replay validation upgraded to a **3-arm paired design** (contemporaneous control). (6) Failure-outcome policy defined (a tier that doesn't validate is not adopted; both failing = measurement-only outcome, no production wire-in). Code anchors re-verified at `0c6c328`.

---

## 1. What the data forces (unchanged from rev 1 — measured, not opinion)

1. **Empty region = 32.5% (26/80), Wilson 95% [23.2%, 43.4%]** on specimen `07beb11f` (gemini-2.5-flash). Real and repeatable.
2. **Temperature does not rescue it.** T=0 → 50%, T=1 → 40%; CIs overlap recorded 30%. Identical re-submission at ANY temp stays in the empty region — which is exactly why production's identical OBS-3 retry goes 3/3 empty. **The only lever left is changing the input on retry.**
3. **Signature is step-1, pre-tool:** `finishReason=stop`, 6,049 in → 0 out, zero tool calls, 486–1,454 ms. The model *decides to say nothing* before considering a tool. The 6,049-vs-12,544 delta is NOT "less history" — both paths start from the same prompt; the recovered path is longer only because it received the ~6.5K-token `getFactoryList` result. **The empty dies before any tool result exists.**

## 2. Locked perturbation design (KB v15 §4 — do not re-litigate)

| Attempt | Tier | What it does |
|---|---|---|
| **0** | `none` | ALWAYS unperturbed — the user's real question runs verbatim first. No user ever gets a perturbed first answer. |
| **1** | `reanchor` (**P-b, primary**) | Re-position/re-emphasize the **last USER turn** within the same frozen prompt — a state/emphasis change that pulls the model's step-1 attention back to the question it silently skipped. Honors Maymun's "a state change forces a different decision" intuition, bound to the one real hook the code allows (no tool result exists to re-anchor). |
| **2** | `directive` (**P-a, escalation**) | Append a short fixed system-level retry nudge — instruct the model to engage (produce the tool call / answer), never return empty. Purely additive scaffold. |
| — | P-c (whitespace/structural) | **REJECTED** unless replay shows both a/b flat. No mechanism behind it. |

**Perturbation invariants (non-negotiable):**
- **Pure, deterministic, meaning-preserving:** `perturbForRetry(messages, system, attempt) → { messages, system }`. No runtime LLM judge (constitutional ban). No unseeded randomness. Nudges scaffold/framing/emphasis ONLY — never the user's request tokens.
- **Attempt-local (NEW — named trap):** the perturbed `{messages, system}` exist only for that attempt's `streamChat` call. `ctx.aiMessages` and `ctx.systemPrompt` are NEVER mutated — persistence, the promptSnapshot, and every downstream stage see the real conversation. Because the helper is pure+deterministic, the `perturbationTier` enum alone fully reconstructs the perturbed prompt — no perturbed content is ever persisted or emitted. Redaction posture unchanged.
- **Bounded:** capped by the existing `LLM_EMPTY_RETRY_MAX` (default 2 → 3 attempts, mapping exactly onto tiers 0/1/2). Cross-provider ban stands.
- **Observable:** `emptyRetryEmitPayload` gains `perturbationTier: 'none' | 'reanchor' | 'directive'` — enum only, never content.

## 3. Where it plugs in (verified at `0c6c328` — 3 surgical touch points, no rewrite)

- **Touch 1 — pure helper** `perturbForRetry` in a sibling module beside `isRetriableEmpty`/`decideRetry`/`filterPreTokenDelta` in `completionGuard.ts`'s family. Unit-tested in isolation, ADR-003 helper style.
- **Touch 2 — the retry branch** (`stageStream.ts` @ ~line 111, `decision === 'retry'`): before `continue`, compute attempt-local perturbed `{messages, system}` for the NEXT attempt; the `streamChat` call reads those locals instead of the frozen ctx originals. Attempt 0 always reads the originals.
- **Touch 3 — telemetry:** `perturbationTier` added to `emptyRetryEmitPayload` (and the retry `[LLMRetry]` log line) so ledger + replay both see which lever fired.

Everything else byte-identical: `filterPreTokenDelta` no-double-paint, `give-up` honest floor (`emptyCompletionMessage`), cross-provider ban, `LLM_EMPTY_RETRY_MAX`. empty≠zero untouched — perturbation sits strictly between "empty detected" and "give up."

## 4. The invariant that must not break (unchanged)

**A perturbed retry that produces a wrong-but-non-empty answer is a REGRESSION, not a win.** Success metric is NOT "empty → 0." It is **"empty rate down (Wilson-CI-separated from the CHAR-1 baseline [23.2%, 43.4%]) AND grounding/scope verdicts on perturbed-recovered reps match natural recoveries."** A perturbation that coaxes a confabulated answer to a subtly-changed question is worse than the honest empty it replaced.

## 5. Validation — replay first, production second (3-arm paired design, upgraded in rev 2)

The REPLAY-B engine runs the perturbation-applied task-fn on `07beb11f`, **one gateway call per rep** (C7's no-loop invariant holds — the perturbation is applied to the INPUT before the single call; we measure P(empty | perturbed input) per tier directly):

- **Arm A (control, tier `none`):** N=25 unperturbed — contemporaneous baseline + the natural-recovery grounding reference, same engine version, same stub book, same day.
- **Arm B (tier `reanchor`):** N=25.
- **Arm C (tier `directive`):** N=25.

**Evidence gates (literal, per tier):**
1. **CI separation:** the tier's Wilson 95% upper bound < **23.2%** (the CHAR-1 baseline lower bound). At N=25 that means ≤1/25 empty. A tier at 2–3/25 is "improved point estimate, CI NOT separated → NOT adopted" — stochastic-verification discipline; no shipping on a point estimate.
2. **Grounding parity:** deterministic grounding verdicts on the tier's recovered reps match Arm A's natural-recovery verdicts (production `runGroundingCheck` reused — never a reimplementation, C8 discipline). Any perturbed-recovered grounding regression → tier REJECTED regardless of empty rate.
3. **Control validity:** Arm A's empty rate must fall inside [23.2%, 43.4%]. If it doesn't, the specimen/engine has shifted and the whole run is INVALID (re-run, don't reinterpret).

**Adoption policy (rev 2):** only validated tiers wire into production. Reanchor passes + directive fails → attempt 2 stays at today's identical retry (`none`), never a repeated reanchor (identical re-submission of the perturbed prompt is the same fallacy the data killed). Directive passes + reanchor fails → directive takes attempt 1. **Both fail → OBS-3.1 is a measurement-only outcome; no production wire-in ships** (an honest CHAR-1-style ending, explicitly permitted).

**Production firing = REACTIVE-ONLY** (committed single-path rec; Maymun confirms in the phase): perturb strictly AFTER a detected empty, never predictively. Proactive firing needs a runtime "high-empty-risk" classifier — exactly the predictive judgment we keep deterministic-or-not-at-all — and a step-1 empty is only detectable after it happens.

## 6. Stated design risk (carried, unchanged)

**N=1 specimen (CHAR-1 F4):** designed and validated on one turn. Generalization unproven until fresh captures. Mitigation: the `perturbationTier` telemetry ships live, so production becomes its own ongoing experiment; the first wild divergent specimen gets replayed against the shipped perturbation. We don't pretend one specimen generalizes — we make the disagreement measurable.
