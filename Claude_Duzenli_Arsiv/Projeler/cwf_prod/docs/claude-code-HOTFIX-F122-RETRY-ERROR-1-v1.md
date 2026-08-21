# HOTFIX F122-RETRY-ERROR-1 — extend OBS-3 empty-retry to `finishReason=error`
<!-- claude-code-HOTFIX-F122-RETRY-ERROR-1-v1 · rev 1 · 2026-07-16 · Architect-authored, S47 -->
<!-- PLATINUM compliance: pure code change, zero manual configuration introduced; behavior self-contained, no owner steps. -->

**IDENTITY CHECK (mandatory first output line):** Print `[AG-A] F122-RETRY-ERROR-1 · clone=<absolute path> · origin/master=<hash>` before any work. If you are not AG-A, STOP.

**Profile: HOTFIX (S43-2 / S37-approved).** Single-surface, no api-contract/migration/security change. Targeted tests only. Single pass, no gated sub-phases. CI (unsharded) is the sole test arbiter — do NOT run the full suite locally.

---

## 0 · Pre-flight (hard gate — all must hold or STOP and report)

```bash
mkdir -p /tmp/agA-f122 && cd /tmp/agA-f122 && rm -rf cwf_yaprak
git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master        # ANCHOR must be 5cb873f629ddc7e953f952625dda47abff96db6e
```

Grep-verify the surface (facts pinned by the Architect at authoring; if any miss, STOP):
1. `api/cwf/_lib/llm/completionGuard.ts` contains `RETRIABLE_EMPTY_FINISH_REASONS` = `['stop', 'other', 'unknown', undefined]`.
2. Same file: `decideRetry` gives `'give-up'` for empty + `error`.
3. `api/cwf/__tests__/completionGuard.test.ts` has a `TERMINAL` array containing `'error'` (line ~43).
4. `api/cwf/_lib/turn/stageStream.ts:185` drives `decideRetry` with `finishReason` resolved from the result promise (`.catch(() => 'unknown')`).

## 1 · Problem (live KB7 evidence, on file)

A transient provider error settles the stream with `finishReason='error'`, empty text, zero tool calls. Today `decideRetry` classifies `error` as terminal → immediate honest OBS-2 message. Observed live: an identical immediate re-ask heals. The OBS-3 retry loop exists precisely for this class but its retriable set excludes `error`.

## 2 · Change spec (exact, minimal)

**C1 — `api/cwf/_lib/llm/completionGuard.ts` (the only behavioral change):**
- Add `'error'` to `RETRIABLE_EMPTY_FINISH_REASONS`.
- Update EVERY comment in this file that currently lists `error` as non-transient/terminal (module-header "Retry posture" bullet, the set's doc comment, `isRetriableEmpty` doc, `decideRetry` doc). After the edit, no comment may claim `error` is non-retriable.
- `content-filter` and `length` REMAIN excluded — never hammer a safety block or a token cutoff. State this in the set's comment.
- `emptyCompletionMessage('error', …)` text UNCHANGED — it is now the retries-exhausted message for this class.

**C2 — `api/cwf/_lib/turn/stageStream.ts` (comment-only):**
- Fix the OBS-3 header comment (lines ~32–36) that enumerates the retriable class as `finishReason=stop,…` so it includes `error`. Zero code changes in this file.

**C3 — `api/cwf/__tests__/completionGuard.test.ts`:**
- Move `'error'` out of the `TERMINAL` array into the retriable expectations of the exhaustive matrix.
- Add four explicit named cases:
  a. empty text + 0 tool calls + `error` + attempt < max → `'retry'`
  b. same + attempt === max → `'give-up'`
  c. non-empty text + `error` → `'accept'` (partial-streamed-text invariant — pre-existing, F122 does not touch it)
  d. toolCallCount > 0 + `error` → `'accept'` (F69 silentFinish ladder untouched)
- `emptyCompletionMessage`/`silentFinish` assertions for `'error'` stay as-is.

## 3 · Binding constraints
- SAME provider only; cross-provider swap stays FORBIDDEN. Bound stays `LLM_EMPTY_RETRY_MAX` (default 2). Perturbation tiers stay attempt-indexed (`adoptedTierForAttempt`) — no reason-conditional forking.
- No changes to: gateway call site, eval-gate surface, config values, env vars, migrations, telemetry payload shapes. `[LLMRetry]`/`[LLMFinish]` log lines and emit payloads are already finishReason-generic — do not modify them.
- No new files except none; this is a 3-file diff (2 source, 1 test).

## 4 · Verify (targeted, HOTFIX)
```bash
npx vitest run api/cwf/__tests__/completionGuard.test.ts api/cwf/__tests__/silentFinish.test.ts \
  api/cwf/__tests__/retryPerturbation.test.ts api/cwf/__tests__/stageStreamPerturbation.test.ts \
  api/cwf/__tests__/stageStreamSpans.test.ts api/cwf/__tests__/stageStreamSpanAttrs.test.ts
npm run check:doc-drift    # must stay [OK]; if the manifest maps a touched file, reseal per S34-1
npm run typecheck:api
```

## 5 · Branch & report (NO merge — Architect gates)
- Branch: `hotfix/f122-retry-error` → push → open PR. CI unsharded run must be green (S37-2 precondition).
- Report back, literally: remote branch head hash · `git diff --stat 5cb873f..HEAD` · tail of the targeted vitest run · doc-drift output line · confirmation that grep `"non-transient"` / `"terminal"` in completionGuard.ts no longer references `error` incorrectly.
- Merge happens only after Architect GO, `--no-ff`, with this verbatim message:
  `Merge F122-RETRY-ERROR-1: OBS-3 empty-retry now covers finishReason=error (same-provider, bounded)`

## 6 · Self-verify checklist (answer each with evidence, not claims)
- [ ] Anchor hash matched exactly at clone.
- [ ] `RETRIABLE_EMPTY_FINISH_REASONS` now = stop | other | unknown | undefined | error — paste the line.
- [ ] Matrix test proves content-filter/length still give-up — paste the assertion lines.
- [ ] Case (c) and (d) above exist and pass — paste test names from vitest output.
- [ ] doc-drift `[OK]` — paste the line.
- [ ] No file outside the 3 named is in the diff — paste `--stat`.

<!-- END · claude-code-HOTFIX-F122-RETRY-ERROR-1-v1 · rev 1 · 2026-07-16 -->
