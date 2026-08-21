# PHASE OBS-3.1 · Sub-phase C — Production Wire-in (perturbed empty-completion retry)
**claude-code-PHASE-OBS-3_1-subphaseC-prod-wirein-v1 · rev 1 · 2026-07-04**
**Design authority:** `cwf-obs3_1-perturbed-retry-design-v2.md` §5 "Only reanchor" adoption branch + KB v15 §4 decision record + the Gate B live result (independently recounted by the architect from `docs/replay/obs31-gateB/gateB-redacted-perrep.json`: none 9/25, reanchor **0/25** CI[0.0%,13.3%], directive 11/25 — **reanchor ADOPTED, directive REJECTED**).
**Both Sub-phase-C gates are MET before this phase:** (1) Gate B verdicts on record + architect-verified; (2) owner **reactive-only** confirmation **on record** (Maymun confirmed in the architect thread — perturbation fires strictly AFTER a detected empty, never predictively). Do not re-request either.
**Lane:** AG (Author). One branch `obs31-prod-wirein` off `master`, merge `--no-ff` (squash banned). Merge isn't done until pushed + remote hash reported (RULE 25).

---

## 0. HARD PRE-FLIGHT GATE (all must pass before ANY write)

1. Fresh clone; `git rev-parse origin/master` = **`d7df2a2`**. If HEAD moved, STOP and report — do not rebase onto an unreviewed head.
2. `npx vitest run` → **739/739, 74 files**. Any failure = STOP.
3. **Drift gate GREEN:** `npx tsx scripts/checkDocDrift.ts` → `[OK] no drift` (mandatory standing pre-flight line).
4. Typecheck green — root `tsc -b` + `tsconfig.api.json` + `tsconfig.api.test.json`. Remember the Vercel per-function compile lacks `strictNullChecks` (use `x === false` narrows, not `!x`, on boolean-literal unions).
5. Confirm the wire-in anchors exist at `d7df2a2`:
   - `stageStream.ts` retry branch (~line 111–116) currently hardcodes `const perturbationTier = 'none' as const;` and emits it. The top of the attempt loop calls `streamChat` with `ctx.aiMessages` / `ctx.systemPrompt` (frozen — verbatim every attempt).
   - `retryPerturbation.ts` exports `perturbForRetry`, `tierForAttempt`, `attemptForTier`, `PerturbationTier`, `PERTURBATION_TIERS`. **Note the trap:** `tierForAttempt(2) === 'directive'` — and directive is REJECTED. The production loop must NOT drive perturbation off `tierForAttempt`.
   If any anchor differs, STOP and report.
6. **Owner reactive-only confirmation is already on record** (architect thread). This phase encodes reactive-only by construction (perturbation only ever computed inside the retry loop, strictly after `decideRetry` returns `'retry'` on a detected empty; attempt 0 is always verbatim). No predictive/proactive path is added. If you find yourself adding any pre-first-attempt perturbation, STOP — that violates the confirmed decision.

## 1. HARD CONSTRAINTS (violating any = phase FAIL)

- **C1 — Adopted mapping is LOCKED and single-sourced:** production perturbation per attempt is **0 → `none` (verbatim), 1 → `reanchor`, ≥2 → `none`**. Encode this as ONE new pure exported function in `retryPerturbation.ts` — `adoptedTierForAttempt(attempt: number): PerturbationTier` — so the Gate-B adoption decision lives in exactly one place (a future specimen re-opening `directive` changes this one function). Do NOT reuse `tierForAttempt` for the live loop (it maps 2→directive). `tierForAttempt`/`attemptForTier` stay untouched — they remain the LAB arm-driver.
- **C2 — Attempt-0 verbatim invariant:** attempt 0 always sends `ctx.aiMessages` / `ctx.systemPrompt` unaltered (tier `none` → identity). No user ever receives a perturbed first answer. Prove it with a gateway-spy test.
- **C3 — Attempt-local, never persisted, never mutated:** the perturbed `{messages, system}` are locals used ONLY for that attempt's `streamChat` call. `ctx.aiMessages` and `ctx.systemPrompt` are NEVER mutated (no splice/unshift/reassign of their contents). Persistence, the promptSnapshot telemetry, grounding, and every downstream stage see the REAL conversation. No perturbed content is ever logged/emitted/persisted — the `perturbationTier` enum is the only new datum, and (perturbForRetry being pure) it fully reconstructs the perturbation. Prove `ctx.aiMessages` is deep-equal to its pre-loop snapshot after a simulated empty→reanchor retry.
- **C4 — Byte-identical periphery:** `filterPreTokenDelta` no-double-paint, the `give-up` honest floor (`emptyCompletionMessage` path), the cross-provider ban, `LLM_EMPTY_RETRY_MAX` bound, `isEmptyCompletion`/`decideRetry` logic — all unchanged. **empty≠zero untouched at every layer.** The perturbation sits strictly between "empty detected + retries remain" and "give up."
- **C5 — Emit/log tier reflects the ACTUAL applied tier.** The retry-branch emit currently hardcodes `'none'`. Replace with the tier the NEXT attempt will apply = `adoptedTierForAttempt(attempt + 1)` (consistent with the `emptyRetryEmitPayload` contract "carries which perturbation the NEXT attempt applies"). The `[LLMRetry]` log's `tier=` field likewise. The per-attempt perturbation actually applied at the top of the loop uses `adoptedTierForAttempt(attempt)` — the two are consistent across iterations.
- **C6 — No LLM judge, no randomness, no I/O** in the perturbation path (already true of `perturbForRetry`; do not add any). No enforcement script (drift gate, verifyGrants, eval-gate) is touched — if you think one is needed, STOP and report.
- **C7 — Honest relabeling (doc-truth):** the adopted `reanchor` tier is, as implemented, **"re-anchor the last user turn + an engage-directive carried inside that re-anchored user turn"** (the `REANCHOR_PREFIX` instructs "respond directly — produce the required tool call or a substantive answer, never an empty completion", then quotes the user turn verbatim). This is what Gate B validated and it is meaning-preserving (the user's own tokens are verbatim; the prefix is scaffold). Update the `retryPerturbation.ts` `reanchor` doc-comment and the CHANGELOG/KB entry to describe it accurately — do NOT describe it as "pure re-emphasis with no directive." The Gate-B finding that the SAME engage-instruction succeeds in a user turn (0/25) but backfires in the system prompt (directive 44% > 36% control) is the recorded rationale; carry it in the CHANGELOG as a replay-lab finding.
- **C8 — Living-doc lock-step:** if a narrative tab maps to a touched file (`stageStream.ts` maps `api/cwf/_lib/turn/**`; `retryPerturbation.ts`/`completionGuard.ts` map `api/cwf/_lib/**`), two-commit reseal; drift green at every merge. Reseal-not-redraw is the default for a below-altitude wire-in (grep-confirm no diagram depicts the empty-guard→perturbation edge, as with OBS-3/Sub-phase-A); if a diagram assertion IS falsified, STOP and report rather than redraw mid-phase.
- **C9 — Secrets env-only.** No keys in code/reports. RULE 1 — no hardcoded config.

## 2. IMPLEMENTATION (exactly the surgical touch points — no rewrite)

1. **`retryPerturbation.ts`** — add the pure `adoptedTierForAttempt(attempt)` (C1). Update the `reanchor` doc-comment for C7 accuracy. Nothing else in this file changes.
2. **`stageStream.ts`** — two edits only:
   - **Top of the attempt loop:** compute the attempt-local input:
     `const tier = adoptedTierForAttempt(attempt);`
     `const { messages: attemptMessages, system: attemptSystem } = perturbForRetry(ctx.aiMessages, ctx.systemPrompt, attemptForTier(tier));`
     and pass `attemptMessages` / `attemptSystem` (NOT `ctx.aiMessages` / `ctx.systemPrompt`) to `streamChat`. (`attemptForTier('none')===0`, `attemptForTier('reanchor')===1`, so this drives `perturbForRetry` to the adopted tier while leaving that helper untouched; attempt 0 → none → identity → verbatim, C2.)
   - **Retry branch:** replace the hardcoded `const perturbationTier = 'none' as const;` with `const perturbationTier = adoptedTierForAttempt(attempt + 1);` (C5). Log + emit unchanged otherwise.
3. **No change** to `completionGuard.ts`, the replay engine, or any scorer — Sub-phase B already carries the telemetry field and the lab arms.

## 3. TESTS (named, integration-level — gateway spy)

Add to the turn/stageStream integration suite (or the completionGuard/stage test file where the loop is exercised):
- **T1 (C2):** attempt 0 sends the verbatim `ctx.aiMessages`/`ctx.systemPrompt` — gateway spy asserts the first call's messages/system are reference/deep-equal to the originals.
- **T2 (C1+C3):** simulate an empty on attempt 0 → assert the SECOND gateway call (attempt 1) receives the `reanchor` perturbation (the last user turn is wrapped with `REANCHOR_PREFIX`, user tokens present verbatim), AND `ctx.aiMessages` is deep-equal to its pre-loop snapshot (never mutated).
- **T3 (C1):** simulate empties on attempts 0 and 1 → assert attempt 2's gateway call is `none` (verbatim originals again — NOT a repeated reanchor, NOT directive).
- **T4 (C5):** the emitted `empty_retry` payload's `perturbationTier` on the attempt-0 empty is `reanchor`; on the attempt-1 empty is `none`. `[LLMRetry]` log carries the matching `tier=`.
- **T5 (C4):** the give-up honest-floor path (empties exhausted) still emits `emptyCompletionMessage` unchanged; existing empty≠zero / no-double-paint tests remain green.
- **T6 (`adoptedTierForAttempt` unit):** 0→none, 1→reanchor, 2→none, 3→none, negative→none.
- Coverage floor ratchets up only.

## 4. SELF-VERIFICATION CHECKLIST (report EVIDENCE, not assertions)

- [ ] Pre-flight: HEAD `d7df2a2` · 739/739 · drift `[OK]` · anchors present (paste the grep lines for the retry branch + `tierForAttempt(2)==='directive'` trap acknowledged)
- [ ] `adoptedTierForAttempt` is the ONLY driver of the live perturbation; `tierForAttempt` untouched (diff the two)
- [ ] T1–T6 named and green (list them); paste the T2 assertion proving `ctx.aiMessages` deep-equal after the reanchor retry
- [ ] Diff scope: exactly `retryPerturbation.ts` (+`adoptedTierForAttempt`, doc-comment) + `stageStream.ts` (2 edits) + the test file(s) + reseal/CHANGELOG/KB. Explicitly confirm empty≠zero / give-up / no-double-paint / cross-provider-ban paths byte-identical.
- [ ] C7 relabeling landed in the `reanchor` doc-comment + CHANGELOG (the placement-effect finding recorded)
- [ ] No enforcement script touched
- [ ] Reseal two-commit if a narrative tab mapped; drift green post-reseal; docVersion bump noted
- [ ] Final `origin/master` hash + test count + docVersion for the architect's RULE-25 review
- [ ] **Post-merge (do NOT assign to Maymun):** state that the architect will confirm from production Vercel logs that `[LLMRetry] ... tier=reanchor` appears on the next natural attempt-0 empty. Do not design any step requiring Maymun to hand-read logs.
