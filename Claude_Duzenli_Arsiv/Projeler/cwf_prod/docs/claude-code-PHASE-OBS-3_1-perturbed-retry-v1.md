# PHASE OBS-3.1 — Perturbed Empty-Completion Retry
**claude-code-PHASE-OBS-3_1-perturbed-retry-v1 · rev 1 · 2026-07-04**
**Design authority:** `cwf-obs3_1-perturbed-retry-design-v2.md` (LOCKED — P-b primary; do not re-litigate ordering) + KB v15 §4 decision record. CHAR-1 data is the empirical substrate.
**Lane:** AG (Author). One branch per sub-phase off `master`, merge `--no-ff` (squash banned). Merge isn't done until pushed + remote hash reported (RULE 25).

---

## 0. HARD PRE-FLIGHT GATE (all must pass before ANY write)

1. Fresh clone `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` = **`0c6c328`**. If HEAD moved, STOP and report — do not rebase silently onto an unreviewed head.
2. `npx vitest run` → **721/721, 73 files**. Any failure = STOP.
3. **Drift gate GREEN:** `npx tsx scripts/checkDocDrift.ts` → `[OK] no drift`. (Mandatory standing pre-flight line. Now trivially cheap — content-hash markers.)
4. Typecheck green (both root and per-function configs — remember the Vercel per-function compile lacks `strictNullChecks`; use `x === false` narrows where needed).
5. Confirm the retry loop anchors exist as expected at `0c6c328`: `stageStream.ts` — attempt loop bounded by `LLM_EMPTY_RETRY_MAX`, `decideRetry` call, `retry` branch with `emptyRetryEmitPayload`; `completionGuard.ts` exports `isEmptyCompletion`, `isRetriableEmpty`, `decideRetry`, `filterPreTokenDelta`, `emptyCompletionMessage`, `emptyCompletionEmitPayload`, `emptyRetryEmitPayload`. If any anchor is missing, STOP and report.
6. Replay engine anchors: `api/cwf/_lib/replay/{config,taskFn,runExperiment,scorers,stubTools,recordedTurn}.ts` present; `REPLAY_REPS_HARD_CEILING = 25`; task-fn makes exactly ONE `streamChat` call per rep. Specimen `07beb11f-55c2-4b82-813a-b7249df748b2` loadable with its stub book.
7. **Owner confirmation on record: production firing = REACTIVE-ONLY** (perturb only after a detected empty; never predictive). If Maymun has not confirmed in-thread, STOP before Sub-phase C (A and B may proceed — they are lab-only).

## 1. HARD CONSTRAINTS (violating any = phase FAIL)

- **C1 — Purity:** `perturbForRetry(messages, system, attempt) → { messages, system }` is a PURE, DETERMINISTIC, MEANING-PRESERVING function. No LLM call, no `Math.random`, no `Date.now` influence on content, no I/O. It nudges scaffold/framing/emphasis ONLY — the user's request tokens are never altered, reordered into different meaning, or dropped.
- **C2 — Tier mapping (LOCKED):** attempt 0 = `none` (verbatim originals, ALWAYS), attempt 1 = `reanchor` (P-b: re-anchor/re-emphasize the last USER turn within the same prompt), attempt 2 = `directive` (P-a: fixed additive system-level engage nudge). P-c does not exist in this codebase.
- **C3 — Attempt-local, never persisted:** perturbed `{messages, system}` are locals for that attempt's `streamChat` call ONLY. `ctx.aiMessages` and `ctx.systemPrompt` are NEVER mutated (no in-place splice/unshift/rewrite). Persistence, promptSnapshot telemetry, and all downstream stages see the REAL conversation. No perturbed content is ever written to any ledger, log, or span — the `perturbationTier` enum is the only new emitted datum (it fully reconstructs the perturbation, since the helper is pure).
- **C4 — Byte-identical periphery:** `filterPreTokenDelta` no-double-paint, `give-up` honest floor (`emptyCompletionMessage` path), cross-provider ban, `LLM_EMPTY_RETRY_MAX` bound, `isEmptyCompletion`/`decideRetry` logic — all unchanged. empty≠zero untouched at every layer.
- **C5 — Replay C7 invariant holds:** the replay validation applies the perturbation to the INPUT before the single gateway call — still exactly ONE `streamChat` per rep. The structural scan banning `decideRetry`/`LLM_EMPTY_RETRY_MAX`/attempt-loops across `replay/` is NOT weakened; `perturbForRetry` (a pure input transform) is a permitted import.
- **C6 — Grounding scorer = production re-export:** replay grounding verdicts come from the production `runGroundingCheck` (re-export / direct call), never a reimplementation (C8 discipline from REPLAY-B).
- **C7 — Stochastic discipline:** no tier is adopted on a point estimate. Adoption requires the literal evidence gates in Sub-phase B. Both-tiers-fail is an explicitly permitted outcome: Sub-phase C then does NOT ship and the phase closes as measurement+helper-only. Do not force-ship.
- **C8 — Secrets env-only.** No keys in code or reports. Replay token budget raised via `CWF_REPLAY_TOKEN_BUDGET` env (RULE 1 — no hardcoded budget bumps). Lab runs: remember the F2 trap — `vercel dev` ignores parent-shell exports; use a full `.env.local` copy + overrides, delete at teardown.
- **C9 — Living-doc lock-step:** narrative tabs touched → two-commit seal; drift gate green at every merge. Any enforcement-script touch (drift gate, verifyGrants, eval-gate) is out of scope for this phase — if you believe one is needed, STOP and report instead.

## 2. SUB-PHASE A — pure helper + unit tests (branch `obs31-perturb-helper`)

1. Create `api/cwf/_lib/llm/retryPerturbation.ts`:
   - `export type PerturbationTier = 'none' | 'reanchor' | 'directive';`
   - `export function tierForAttempt(attempt: number): PerturbationTier` — 0→none, 1→reanchor, ≥2→directive (bounded anyway by `LLM_EMPTY_RETRY_MAX`).
   - `export function perturbForRetry(messages, system, attempt) → { messages, system }` implementing:
     - `none`: returns the SAME references untouched (identity — asserted in tests).
     - `reanchor`: returns NEW arrays/strings (no mutation of inputs) in which the last user turn is re-anchored — re-emphasized as the salient, most-recent instruction (e.g. a deterministic restatement wrapper around the existing user turn content, clearly marked as the same question). The user's own tokens appear VERBATIM inside the re-anchor — quoted, not paraphrased.
     - `directive`: original messages untouched; system gains a short FIXED appended retry directive (one constant string, no interpolation of user content) instructing the model to engage — produce the required tool call or answer, never an empty completion.
2. `emptyRetryEmitPayload` gains `perturbationTier: PerturbationTier` (additive field; existing callers updated). `[LLMRetry]` log line gains `tier=`.
3. Unit tests (new file beside existing completionGuard tests), minimum:
   - determinism: same inputs → deep-equal outputs, twice;
   - identity at tier `none` (reference equality);
   - non-mutation: input arrays/strings unchanged after `reanchor`/`directive` (deep snapshot before/after);
   - meaning preservation: the exact user-turn string is present verbatim in the `reanchor` output; `directive` leaves messages deep-equal to input;
   - tier mapping for attempts 0/1/2/5;
   - payload shape includes the tier enum.
4. Coverage floor: ratchets up only — do not lower any threshold.

**Gate A evidence:** test count delta reported (721 → N), all green; drift gate green; typecheck green; branch merged `--no-ff`, pushed, remote hash reported.

## 3. SUB-PHASE B — replay validation, 3-arm paired design (branch `obs31-replay-validate`) — LAB ONLY, ZERO production-path change

1. Extend the replay run request with `perturbationTier?: PerturbationTier` (default `none`). The task-fn applies `perturbForRetry(messages, system, tierAsAttempt)` to the composed input BEFORE its single `streamChat` call (C5: still one call per rep).
2. Add a grounding scorer to `scorers.ts` that invokes the production `runGroundingCheck` (C6) on each recovered (non-empty) rep, using the rep's stub tool results; record the verdict per rep in the run output.
3. Run on specimen `07beb11f`, ONE run per arm (each run = one tier, N=25, within `REPLAY_REPS_HARD_CEILING`):
   - **Arm A** `none` (contemporaneous control), **Arm B** `reanchor`, **Arm C** `directive`.
   - Budget: set `CWF_REPLAY_TOKEN_BUDGET` via env high enough per run (expect ~6–13K tokens/rep; ~150–350K per arm). Report actual per-arm spend.
   - Each run goes through the existing `replay:run`-permission-gated audited endpoint. Record `replay_audit` row count BEFORE and AFTER each run (this doubles as F3 forensic data — report the counts, do not interpret).
4. Compute per arm: empty count, empty rate, **Wilson 95% CI** (report the formula inputs so Claude can recompute), grounding verdict table for recovered reps.

**Gate B evidence (literal — "tests green" is NOT evidence):**
- **B-validity:** Arm A empty rate ∈ [23.2%, 43.4%]. Outside → run INVALID; re-run once; still outside → STOP and report (specimen/engine drift).
- **B-separation (per tier):** tier's Wilson 95% UPPER bound < 23.2%. At N=25 this means ≤1/25 empties. State the verdict per tier explicitly: ADOPTED / NOT ADOPTED.
- **B-grounding-parity (per adopted tier):** recovered-rep grounding verdicts match Arm A's natural recoveries (no new grounding-fail class, no rate regression). Any regression → tier REJECTED regardless of empty rate; say so explicitly.
- Raw per-rep JSON committed under the run artifacts (same convention as CHAR-1) so the architect can recompute every rate.

**Merged `--no-ff`, pushed, remote hash reported. Then STOP — report Gate B verdicts to Claude before Sub-phase C.**

## 4. SUB-PHASE C — production wire-in (branch `obs31-prod-wirein`) — GATED on B verdicts + owner reactive-only confirmation

Only tiers marked ADOPTED in Gate B are wired. Adoption policy (LOCKED, design v2 §5):
- Both adopted → attempt 1 = `reanchor`, attempt 2 = `directive`.
- Only `reanchor` → attempt 1 = `reanchor`, attempt 2 = `none` (today's identical retry; a repeated reanchor is banned — identical re-submission of a perturbed prompt is the same fallacy the data killed).
- Only `directive` → attempt 1 = `directive`, attempt 2 = `none`.
- Neither → **no wire-in.** Close the phase honestly as A+B only.

Implementation (exactly the 3 touch points — no rewrite):
1. In `stageStream.ts`, introduce attempt-local `let attemptMessages/attemptSystem` initialized from ctx; the `streamChat` call reads the locals; in the `retry` branch, before `continue`, set them via `perturbForRetry(ctx.aiMessages, ctx.systemPrompt, nextAttempt)` per the adopted mapping (C3: ctx untouched).
2. Retry emit + log carry the tier (already from A).
3. Integration tests: (a) attempt 0 sends verbatim originals (spy on the gateway); (b) after a simulated empty, attempt 1's gateway call receives the adopted-tier perturbation while `ctx.aiMessages` is deep-equal to its pre-loop snapshot; (c) give-up path and honest floor byte-identical (existing tests still green); (d) tier appears in the emitted `empty_retry` payload.

**Gate C evidence:** the gateway-spy assertions above named individually; 721+N tests green; drift gate green; reseal two-commit lock-step if narrative tabs changed; merged `--no-ff`, pushed, remote hash reported. Post-deploy: Claude (not you, not Maymun) verifies from production Vercel logs that `[LLMRetry] ... tier=` appears on the next natural empty — do NOT design any step requiring Maymun to hand-read logs.

## 5. SELF-VERIFICATION CHECKLIST (report with EVIDENCE, not assertions)

- [ ] Pre-flight: HEAD `0c6c328` confirmed · 721/721 · drift gate `[OK]` · anchors present (paste the grep lines)
- [ ] C1/C3 proven by named unit tests (list test names)
- [ ] Gate B table: per-arm N, empties, rate, Wilson CI bounds, verdict; Arm A validity check; grounding-parity table; raw JSON paths; per-arm token spend; replay_audit pre/post counts per run
- [ ] Adoption decision stated with the policy branch taken
- [ ] Gate C (if reached): spy-test names + tier-in-payload evidence
- [ ] Every merge: `--no-ff`, pushed, remote hash listed
- [ ] Explicit statement: no enforcement script touched; empty≠zero paths byte-identical (diff scope listed)
- [ ] Final `origin/master` hash + test count + docVersion for Claude's independent RULE-25 review
