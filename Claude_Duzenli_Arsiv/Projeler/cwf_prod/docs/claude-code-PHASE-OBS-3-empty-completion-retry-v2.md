# Claude Code — PHASE OBS-3 · bounded same-provider empty-completion retry
**Artifact:** `claude-code-PHASE-OBS-3-empty-completion-retry-v2.md` · **rev 2 · 2026-07-01**
**Lane:** Author (AG). **Type:** PHASE — bug-fix, closes the REOPENED intermittent Gemini empty-stop (was mis-attributed to TD-13 tool-scoping). Merges to master (gated on architect N-rep verdict).
**Base:** master @ `8b79084` (535 tests, docVersion rev 19).
**v2 changes:** added §L (Lane clarity / anti-confusion) and §H (Branch hygiene). No change to the fix design (§1–§2).

---

## §L. LANE CLARITY — read before executing (anti-confusion)
Last cycle AG got confused about who verifies and about branch push order. To prevent a repeat:
1. **Two lanes on verification.** AG BUILDS + REPORTS. The ARCHITECT reads Vercel runtime logs via the Vercel MCP and issues the verdict. AG does **not** read logs, does **not** poll the deployment, does **not** re-fire chat queries itself, and does **not** judge the fix.
2. **Your report ENDS at "preview READY + evidence."** Do **not** self-declare the fix "verified" OR "unverified." Do **not** write a "shipped unverified" note or memory entry. Your lack of log-read visibility is **by design, not a gap** — the architect closes that loop after your report.
3. **Do NOT merge** until the architect's explicit verdict arrives as a follow-up instruction. When it does, merge, then run §H post-merge cleanup.
4. **Commit-then-push, always.** Commit the change FIRST, then push, so the preview builds from the intended commit — never push a pointer-only/empty branch. After the preview is up, confirm its `githubCommitSha` equals your fix commit.
5. **Never "make the operation succeed" by inventing a path.** If any pre-flight gate mismatches the described shape, STOP and report the actual shape — do not adapt, guess, or work around it.

## §H. BRANCH HYGIENE — keep the remote clean (no dangling branches)
**Pre-flight cleanup (do this at step 0, before creating the OBS-3 branch):** delete the two stale branches this TD-13 line created — **remote + local**:
- `td-13-probe-factory-category` — throwaway diagnostic probe, never merged → intended discard.
- `td-13-fix-recipe-zone-scoping` — merged into master via `8b79084` (`--no-ff`); its commits live in master history, so deleting the branch pointer loses nothing.

Use `git push origin --delete <branch>` then `git branch -D <branch>` (local, if present); no-op gracefully if a branch is already gone. Then verify with `git ls-remote --heads origin` that NEITHER remains and only `master` (+ your new `p-obs-3-empty-retry`) are active session branches.

**Post-merge cleanup (part of §7, AFTER the architect verdict + your merge):** delete `p-obs-3-empty-retry` remote + local once it is merged into master.

**Standing rule (apply from now on):** a feature/fix/throwaway branch is deleted the moment its purpose ends (merged or discarded). `master` is the only long-lived branch. Do NOT touch unrelated historical branches in this phase — only the three named here.

---

## 0. Diagnosis — CONFIRMED, do not re-litigate
The `[factory]` + Gemini empty-stop is **INTERMITTENT** and **NOT** deterministically caused by tool composition. Matched runs, identical 6-tool offered set, same `gemini-2.5-flash`, same `[factory]` route, `canonicalOEE=absent`:
- preview `359b8c0d`: `empty=false` output=69 (getFactoryList called)
- prod `cc4792a8` (post-TD-13-fix): **`empty=true` output=0**, no text, no tool call

Same input → different output ⇒ stochastic. The failure signature (traces `3e45d14e`, `f2d63ff2`, `cc4792a8`): `finishReason=stop`, `output=0`, `reasoning=0`, **no text AND no tool call** — a clean empty candidate, a known `gemini-2.5-flash` flakiness. TD-13's `getZonesWithRecipeId*` re-scoping is a legitimate intent improvement and STAYS; it did not (could not) fix this.

## 1. PRINCIPLE RECONCILIATION — do this FIRST (comments + docs), before code
OBS-2's ban is: **no silent retry on a DIFFERENT provider** (cross-provider fallback). That ban STANDS. This phase adds a **bounded, logged, SAME-provider** retry on a transient empty completion — a categorically different thing. You MUST update the now-inaccurate absolutes so the code does not contradict its own behavior:
- `completionGuard.ts` header ("NO provider fallback / auto-swap … never a silent retry on a different provider") — refine to: *cross-provider swap stays forbidden; a bounded, logged, same-provider retry on a clean-transient empty is permitted resilience.*
- `chat.ts` (~line 853, "NO provider fallback/retry: the recovery is an honest message + the model picker") — refine to the same distinction: same-provider bounded retry FIRST, then (if still empty) the honest message + model picker.

The line to codify: **same provider + bounded + logged = allowed; different provider + silent = still banned.**

## 2. THE FIX (chat.ts streaming block · completionGuard.ts · config.ts)
Add a pure helper to `completionGuard.ts`:
```
isRetriableEmpty({ text, toolCallCount, finishReason }): boolean
  = isEmptyCompletion({text, toolCallCount})
    AND finishReason ∈ { 'stop', 'other', 'unknown', undefined }
```
i.e. retry ONLY a clean transient empty. Return **false** for `content-filter` / `length` / `error` (terminal or handled elsewhere — never hammer a safety block), for any non-empty text, and for `toolCallCount > 0`. Exhaustively unit-tested.

Wrap the `streamChat → for-await(result.textStream) → empty-check` in a **bounded attempt loop**:
- Read the retry bound from a NEW `config.ts` constant `LLM_EMPTY_RETRY_MAX` (default **2** retries = 3 total attempts; RULE 1 — no hardcode).
- Per attempt: fresh `fullText=''`, `toolCallCount=0`; run `streamChat` with **IDENTICAL params** (same `providerRec` — NEVER call `resolveModel` with a different rec).
- If the attempt commits any non-whitespace text OR any tool call → that is the answer; stream/proceed exactly as today. STOP looping.
- If the attempt is `isRetriableEmpty` AND attempts remain → discard it, emit `[LLMRetry]` log + `llm_retry` telemetry (**redacted**: provider + attempt index + finishReason ONLY — no text/headers/providerMetadata), loop again.
- If the attempt is empty but NOT retriable (content-filter/length/error), OR retries are exhausted → fall through to the EXISTING OBS-2 honest-message guard unchanged (`emptyCompletionMessage` + `emptyCompletionEmitPayload`).

**Streaming safety (no double-paint):** a retriable-empty attempt commits no non-whitespace text to the client, so a retry cannot double-paint. Suppress whitespace-only `text-delta` writes before the first real token, so a retry is visually clean. NEVER retry once any non-whitespace delta OR any tool call has been sent to the client.

**Free measurement:** each attempt's `onFinish` still fires its `[LLMFinish]` + `llm_call` (add an `attempt` index to both). The `[LLMRetry]` count + per-attempt `empty` flags finally make the underlying empty RATE observable — the number we were blind to.

Plain identical retry only (no prompt nudge) — simplest thing that works for provider nondeterminism; if telemetry later shows retries frequently exhausting, that's a separate escalation.

## 3. HARD PRE-FLIGHT GATE (stop + report if any differs)
0. **Branch hygiene first** — run §H pre-flight cleanup, then confirm via `git ls-remote --heads origin` that the two stale TD-13 branches are gone.
1. Clean tree on `master` @ `8b79084`. Branch `p-obs-3-empty-retry`.
2. Confirm the streaming block: `streamChat(` ~L779, `for await (const chunk of result.textStream)` ~L841, `if (isEmptyCompletion(` ~L855, `let toolCallCount = 0` ~L541, `let fullText = ''` ~L839. If the structure differs materially, STOP and report the actual shape.
3. Confirm `config.ts` holds `MAX_TOOL_ROUNDS` / `GEN_*` (the home for `LLM_EMPTY_RETRY_MAX`).

## 4. HARD CONSTRAINTS
- **SAME provider only.** Never dispatch a different provider on retry. The cross-provider ban is intact.
- **Bounded.** The loop MUST terminate at `LLM_EMPTY_RETRY_MAX`; never unbounded.
- **Do NOT retry** `content-filter`, `length`, or `error`.
- **Redaction intact.** `[LLMRetry]` / `llm_retry` carry provider + attempt index + finishReason ONLY.
- No secrets, no governed tables, no `.env*`.
- Do NOT touch routing/`toolCategories`, grounding, eval-gate, or the floor. `composeArmesContext([]) === renderArmesCriticalSlice()` unchanged.
- Grounding + persistence still run on the FINAL attempt's `fullText`, unchanged.

## 5. LIVING-DOC (RULE 20 / RULE 23)
`completionGuard.ts` + `chat.ts` are mapped by Architecture Map, Request Lifecycle, and LLM Control Surface. `docVersion` rev 19 → 20. Altitude call: if the **Request Lifecycle** diagram depicts the LLM-finish → empty-guard edge, ADD the same-provider retry loop to that edge (redraw at that altitude); otherwise reseal. AG states reseal-vs-redraw per the actual diagram content for each of the three tabs. Update the CHANGELOG + KB SKILL.md + the OBS ADR: the completion-robustness principle now reads *"bounded logged same-provider retry on a clean-transient empty, THEN an honest finishReason-aware message; no cross-provider fallback."*

## 6. SELF-VERIFY (evidence — paste each)
1. `git ls-remote --heads origin` → the two stale TD-13 branches are GONE; `master` + `p-obs-3-empty-retry` present.
2. `git diff master --stat` → `completionGuard.ts`, `chat.ts`, `config.ts`, test file(s), manifest/doc.
3. `isRetriableEmpty` unit tests: **retries** on {stop, other, unknown, undefined} × empty × no-tool; **does NOT retry** on content-filter / length / error, on non-empty text, or on `toolCallCount > 0`. Paste the assertion result lines.
4. A **bounded-loop** test: an always-empty (retriable) attempt stops after `LLM_EMPTY_RETRY_MAX` and then surfaces the honest message (no infinite loop).
5. A **no-double-paint** test: a retried attempt emits the answer once (whitespace-only pre-token deltas suppressed).
6. Full suite green (≥535 + new). Floor invariant green.
7. Push → preview (commit-then-push per §L.4). Report `deploymentId` + URL + `githubCommitSha` match + env-parity.

## 7. LIVE VERIFICATION — architect-read, N-rep, gates the merge (the TD-13 lesson)
The bug is STOCHASTIC — one clean run proves nothing. After preview READY, the human fires the SAME `[factory]` query ("fabrika listesini getirir misin") with **Gemini selected**, **several times (~6, or until a `[LLMRetry]` is observed recovering)**. The architect pulls preview `[LLMFinish]` + `[LLMRetry]`:
- **PASS** iff every turn surfaces a real answer to the user — first-attempt success OR a retry that then succeeded — i.e. **zero user-visible empties** across all reps, and at least one `[LLMRetry]` observed actually recovering (proves the mechanism end-to-end, not just that empties happened not to fire).
- **FAIL** iff any turn exhausts all attempts and still empties → the bound may need raising or a deeper prompt/schema cause exists; do NOT merge, report the per-attempt trace.

Do not merge before the architect's N-rep verdict. On the verdict: merge, then run §H post-merge cleanup (delete `p-obs-3-empty-retry` remote + local). This manual grind is the last of its kind — it is exactly the replay harness the control-plane (OA-10 / F-obs) is meant to automate.
