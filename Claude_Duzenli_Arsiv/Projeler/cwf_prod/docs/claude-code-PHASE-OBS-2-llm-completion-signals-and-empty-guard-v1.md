# PHASE OBS-2 — LLM completion signals + empty-completion guard (all providers)
<!-- artifact: claude-code-PHASE-OBS-2-llm-completion-signals-and-empty-guard-v1.md · rev 1 · 2026-07-01 -->

**Lane:** Author (Claude Code 4.8 / AG). **Repo:** `cwf_yaprak`. **Base:** master HEAD `84d9c57` (post-FLOOR-1).
**Type:** observability + resilience (code-only, additive). **No** migration, **no** dependency, **no** secret path. **No** provider fallback.

---

## 0. Diagnosis (verified against production logs + code)

A production request ("fabrika listesini döner misin", `gemini-2.5-flash`, trace `5edb46ed`) returned **`output=0`** — the model produced zero tokens, **no** tool call, **no** thrown error. The SSE stream closed 200-clean with empty text; the client rendered `'No response generated.'` (`src/lib/cwfService.ts:200` — `fullText || metadata.text || 'No response generated.'`). Cross-provider proof it is model-side, not routing: the identical `[factory]` request answered on `openai` (output 410) and `anthropic` (output 550); `gemini` failed it twice (output=0) yet worked on an OEE/`[metrics]` query (output 8183). Likely trigger: a `[factory]`-category tool schema (`getZonesWithRecipeId*`) `gemini` emits a malformed/empty completion on.

**The gap is ours and is general, not Gemini-specific.** At the single LLM call site we **throw the response signals away**: `gateway.ts` types `onFinish` as `{ usage }` only (`gateway.ts:71`, wiring `gateway.ts:101`) and `chat.ts` consumes only `result.textStream` (`chat.ts:814`). So `finishReason`, `warnings`, provider stop/safety metadata, and usage sub-fields never reach us, and a **silent empty completion is never detected** — `chat.ts` handles only the THROW path (`streamErr` → ⚠️ note, `chat.ts:896`). A non-throw empty stream falls straight through to a `done` with empty text.

**Fix = capture the full completion signal surface for EVERY provider + deterministically detect an empty/abnormal completion and surface an honest message instead of a blank.** This makes the Gemini case honest as a side effect and makes every provider's silent failures / length-truncations / safety-blocks visible.

---

## 1. HARD PRE-FLIGHT GATE (stop if any fails; paste evidence)

1. `git rev-parse HEAD` → `84d9c57` (or a named descendant). `git status --porcelain` → clean. Full suite green (baseline 504).
2. Confirm the drop points by reading:
   - `gateway.ts:70-71` (`onError`/`onFinish` types), `gateway.ts:100-101` (wiring passes only `usage`).
   - `chat.ts:787-800` (the `onFinish` emit — `llm_call`, usage/cost only), `chat.ts:814-817` (the `textStream` loop), `chat.ts:896-934` (the THROW-path note+done — the ONLY current failure handler).
   - `src/lib/cwfService.ts:200` (the client `'No response generated.'` fallback).
3. Confirm `TelemetryEvent.payload` is `Record<string, unknown>` (jsonb) — `persistence/types.ts:52` — so new fields ride in `payload` with **no migration**, and `type:'error' + payload.kind` is the established pattern (grounding_violation, `chat.ts:837`).
4. **Read the actual `ai@6` types for the `streamText` result + `onFinish` callback** (node_modules/ai) and record the EXACT field names you will use (`finishReason`, `warnings`, `usage.reasoningTokens`, `usage.cachedInputTokens`, `providerMetadata`, `response.id`/`response.modelId`, `steps`). Do NOT guess field names — the SDK types are ground truth. Note the `FinishReason` union values (`stop | length | content-filter | tool-calls | error | other | unknown`).

---

## 2. HARD CONSTRAINTS

- **Single call site.** All widening happens at `gateway.ts` (the one `streamChat`) + `chat.ts` (the one consumer). Do not add a second LLM path.
- **NO provider fallback / auto-swap.** PROV deliberately removed the fallback path; `resolveModel` fails loud on an unknown family. The empty-completion recovery is an **honest user-facing message + the existing model picker** — never a silent retry on a different provider. (A same-provider retry is also OUT of scope for this phase — surface + observe first.)
- **Redaction (named trap).** Emit/log ONLY safe metadata: `finishReason`, warning `type`/count, provider reason CODES (`google` blockReason category, `anthropic` stop_reason, `openai` refusal-present boolean), usage numbers, `response.id`/`modelId`. **NEVER** emit/log: the prompt, the response text, safety-blocked content, `response.headers` (may carry tokens), or raw `response.body`/`providerMetadata` free-text. Same discipline as `TelemetryEvent.payload` ("redacted by the caller").
- **Guard reads `await result.finishReason`, NOT an onFinish closure.** `onFinish` timing vs the `textStream` loop is not ordered — reading the result promise post-loop is deterministic. Reading `finishReason` both in `onFinish` (for telemetry, fire-and-forget) and via `await result.finishReason` (for the guard) is fine (the promise is memoized). Do NOT "unify" these into a shared mutable set by `onFinish` — that reintroduces the race.
- **Byte-identical happy path.** A normal answer (non-empty text) is unchanged: same stream, same `done`, same persistence. All new logic is additive and guarded by `if (empty)`.
- **Do not touch** `sessionId`/TD-10 (`chat.ts:449`), the grounding/scope append, the THROW-path note, or the client — the server sending a real `done.text` already makes the client fallback moot.

---

## 3. THE FIX

### 3a. Widen the gateway surface — `api/cwf/_lib/llm/gateway.ts`
- Change `StreamChatParams.onFinish` type from `{ usage }` to forward the full finish info the SDK provides — at minimum `{ usage, finishReason, warnings, providerMetadata, response, steps }` (use the exact `ai@6` types from the pre-flight read; import the SDK's finish-callback type if exported rather than hand-rolling).
- Change the wiring (`gateway.ts:101`) to pass the whole info object through: `onFinish: params.onFinish ? (info) => params.onFinish!(info) : undefined`.
- Leave `onError` forwarding as-is (already passes the error); `chat.ts` will now emit it.

### 3b. New pure module — `api/cwf/_lib/llm/completionGuard.ts`
Two pure, provider-agnostic, exhaustively-testable functions (analogous to `scopeDivergenceNotice`):
```ts
export type FinishReason = 'stop' | 'length' | 'content-filter' | 'tool-calls' | 'error' | 'other' | 'unknown';

/** Empty/abnormal completion = the model produced no answer AND called no tool. */
export function isEmptyCompletion(input: { text: string; toolCallCount: number }): boolean {
    return input.text.trim() === '' && input.toolCallCount === 0;
}

/** An HONEST, finishReason-aware message to surface when the completion is empty. */
export function emptyCompletionMessage(finishReason: FinishReason | undefined, language: 'tr' | 'en'): string { … }
```
Message mapping (both languages): `content-filter` → güvenlik filtresine takıldı / blocked by the safety filter; `length` → token sınırında kesildi / cut off at the token limit; `error` → beklenmeyen bir hata / an unexpected error; `stop`/`other`/`unknown`/undefined → model bu istek için yanıt üretemedi, lütfen tekrar deneyin veya farklı bir model seçin / the model returned no answer, please retry or pick a different model.

### 3c. Capture + emit + guard — `api/cwf/chat.ts`
- **Extend the `onFinish` emit** (`chat.ts:787-800`): add to the `llm_call` `payload` (redacted): `finishReason`, `warnings` (array of `{ type }` + count — no free-text), `reasoningTokens`, `cachedInputTokens`, and `empty: isEmptyCompletion({ text: fullText, toolCallCount })`. Extend the `[Token Usage]` log OR add a single `[LLMFinish] provider=… finishReason=… output=… reasoning=… cached=… warnings=N empty=…` line keyed on `traceId`.
- **Empty guard** (in the success branch, right after the `for await` loop, before/around grounding): 
  ```ts
  const finishReason = await result.finishReason.catch(() => 'unknown');
  if (isEmptyCompletion({ text: fullText, toolCallCount })) {
      const msg = emptyCompletionMessage(finishReason, language === 'en' ? 'en' : 'tr');
      fullText = msg;                                   // flows into finalText → done.text + persistence
      try { if (res.headersSent) res.write(`data: ${JSON.stringify({ type: 'text-delta', text: msg })}\n\n`); } catch {}
      emit({ type: 'error', payload: { kind: 'empty_completion', finishReason, provider } });
  }
  ```
  Grounding then runs harmlessly on `msg` (not a factory answer), `scopeNotice` won't trigger, persistence stores the honest message, and the `done.text` is the honest message — so `'No response generated.'` can never appear for an empty completion.
- **Emit `onError` to telemetry** (`chat.ts:784`): in addition to `console.error`, emit `{ type: 'error', payload: { kind: 'llm_error', name: err?.name, statusCode: err?.statusCode /* redacted */ } }`. Do NOT emit `err.message`/`responseBody` verbatim (may echo prompt/keys) — name + statusCode only.

---

## 4. TESTS (evidence)

**New `api/cwf/__tests__/completionGuard.test.ts`:**
1. `isEmptyCompletion` truth table: empty text + 0 tools → true; whitespace-only text + 0 tools → true; non-empty text → false; empty text + ≥1 tool call → false.
2. `emptyCompletionMessage` — every `FinishReason` value (incl. `undefined`) → the correct message, in BOTH `tr` and `en` (exhaustive over the union; a missing case must be a compile or test failure).
3. A redaction assertion: the message/emit-shape helpers never include a field that could carry input/response text (assert the guard payload keys are a fixed allow-list: `kind`, `finishReason`, `provider`).

Run the FULL suite; all prior tests + the new ones green. Report old→new count.

---

## 5. LIVING-DOC + SEAL

- Altitude: this touches the LLM-finish edge of the request lifecycle + the telemetry event surface. If the request-lifecycle or telemetry tab depicts LLM-finish / telemetry types, sync it; otherwise below-altitude → manifest note + docVersion bump, no diagram redraw. Run `check:doc-drift` and act on what it flags — do not hand-wave the altitude call; verify which tabs map to `chat.ts` LLM-finish / `gateway.ts`.
- Bump `docVersion` (rev 16 → **rev 17**; read the actual source, bump by 1). CHANGELOG + KB note: "OBS-2: capture finishReason/warnings/usage-extras at the single gateway; deterministic empty-completion guard → honest finishReason-aware message (no provider fallback); `'No response generated.'` can no longer surface a blank. Redacted metadata only."
- **Two-commit seal:** commit 1 = code+tests (`feat(obs): LLM completion signals + empty-completion guard (OBS-2)`); commit 2 = docs/manifest/docVersion. PR; report PR number + both SHAs.

---

## 6. SELF-VERIFY CHECKLIST (paste evidence)

- [ ] Pre-flight gate green (HEAD, clean, 504 baseline; the four confirmations incl. the exact `ai@6` field names you used).
- [ ] `gateway.ts` `onFinish` now forwards the full info (paste the type + wiring diff); `onError` unchanged.
- [ ] `completionGuard.ts` pure functions + exhaustive tests green (every `FinishReason` × both languages; the truth table).
- [ ] `chat.ts` `llm_call` payload extended with finishReason/warnings/reasoning/cached/empty; `[LLMFinish]` line present; `onError` now emits `llm_error` telemetry.
- [ ] Empty guard: `await result.finishReason` (NOT an onFinish closure); on empty → honest message becomes `done.text` + streamed + persisted + `empty_completion` emitted. Paste the diff.
- [ ] **Redaction proof:** grep the new code — no `err.message`, no response/prompt text, no `response.headers`, no `providerMetadata` free-text, no safety free-text in any log/emit. Allow-list payload keys only.
- [ ] Happy path byte-identical: a non-empty completion streams/persists/`done`s exactly as before (an existing streaming test still green; new logic is `if (empty)`-guarded).
- [ ] No provider fallback/retry introduced; single gateway intact; no migration; no new dep.
- [ ] Full suite green (504 → N); typecheck clean; `check:doc-drift` OK. docVersion rev 17; two-commit seal; PR + both SHAs.

**Do not** claim done from a green build — the value is the *observability*: after merge, a repeat of the Gemini `[factory]` request must (a) show the user an honest message, not a blank, and (b) emit `finishReason` + `empty_completion` to telemetry so we can confirm the real cause (content-filter vs malformed-function-call). I review by cloning and diffing vs `84d9c57`, then re-running the live request and reading the new `[LLMFinish]` line via the Vercel MCP.
