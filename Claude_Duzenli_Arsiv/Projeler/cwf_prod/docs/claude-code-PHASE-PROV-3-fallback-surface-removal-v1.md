# Claude Code — PHASE-PROV-3: Remove the dead `shared/llmGateway` fallback surface
**rev 1 · 2026-06-30 · target HEAD `48d345a` · canonical repo `cwf_yaprak`**

## Why this phase exists (and why it is REMOVAL, not consolidation)
PROV-1 made the LLM provider set **data** (DB-first `llm_providers` + family-dispatch `resolveModel` in `gateway.ts`) and PROV-2 gave it a gated admin UI. The PROV-1 changelog tracked a follow-up: "consolidate `shared/llmGateway/*` (the non-streaming fallback) onto the same registry." Reading the code at `48d345a` shows that follow-up is correctly resolved by **deletion, not wiring**:

- `shared/llmGateway/index.ts` (`fallbackGenerateText` / `fallbackGenerateObject` / `probeAvailableProvider`) has **zero production callers** — the only reference anywhere is a *comment* in `gateway.ts`. `generateText`/`generateObject` appear **nowhere else** in the codebase, so there is no live non-streaming surface to consolidate.
- The live agent **never routes through it** — `gateway.ts` (the ONE LLM call site) states this explicitly and has no try/catch into the fallback. The system already has **zero** live cross-provider failover; removing this surface removes nothing in use.
- `shared/llmGateway/providers.ts` (`FALLBACK_PROVIDERS`) is a **second, hardcoded provider list** (`gemini-2.5-flash-lite` / `gpt-4.1-mini` / `claude-sonnet-4-6`) — the exact RULE-1 model-id duplication PROV-1 eradicated, and a silent drift landmine versus the registry/PROV-2 admin edits.
- `shared/llmGateway/rateLimiter.ts` self-documents "**NOT ACTIVE in production**"; even `index.ts` doesn't import it — only its own test does.
- The router (`toolCategories.ts`) already reads `llmProviderRegistry.routerModelId()` — it is **not** a second def surface and is **out of scope**.

**Conclusion:** the single source of truth is achieved by ELIMINATING the duplicate surface, leaving the PROV-1 registry as the only provider definition. Cross-provider resilience for the live streaming path is a deliberate **future** concern (the gateway layer — LiteLLM/vLLM — or a registry-aware `streamChat` retry phase), NOT this orphaned non-streaming/no-tools surface that structurally cannot serve a streaming tool-calling agent.

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `48d345a`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; **record the count as N** (you will assert the post count is `N − 14`).
3. **Prove the surface is dead — paste the grep output** (must be empty of production callers):
   ```
   grep -rn "fallbackGenerateText\|fallbackGenerateObject\|probeAvailableProvider\|FALLBACK_PROVIDERS\|checkRateLimit\|getRemainingTokens\|resetAllBuckets" \
     --include="*.ts" --include="*.tsx" . | grep -v node_modules \
     | grep -v "shared/llmGateway/" | grep -v "shared/__tests__/rateLimiter.test.ts"
   ```
   The only match is the descriptive comment in `api/cwf/_lib/llm/gateway.ts`. If ANY other production caller appears, **STOP** — the surface is not dead; do not proceed; report it (this phase's premise would be wrong).
4. Read: `api/cwf/_lib/llm/gateway.ts` (lines 1–14 comment block + confirm no fallback try/catch), `shared/llmGateway/index.ts`, `shared/llmGateway/providers.ts`, `shared/llmGateway/rateLimiter.ts`, `shared/__tests__/rateLimiter.test.ts`, `README.md` (the "fallback gateway" line + the "Fallback providers (optional)" env line), `.agents/CHANGELOG.md` (the PROV-1 entry's follow-up bullet), `public/architecture/manifest.json` (the tab whose `codeAreas` includes `shared/**`).

## HARD CONSTRAINTS
- **Surgical removal only.** Delete the dead surface; change nothing about behavior. Do NOT add failover/retry to `streamChat`, do NOT touch the registry, do NOT add a "registry-aware fallback." Capability relocation is a separate future phase (tracked below).
- **`gateway.ts` is the ONE LLM call site — comment-only edit there.** The ONLY allowed change to `gateway.ts` is removing/correcting the now-stale NOTE comment about `shared/llmGateway/*`. `resolveModel` and `streamChat` must be **byte-identical**. `git diff 48d345a -- api/cwf/_lib/llm/gateway.ts` must show ONLY the comment block changing.
- **Remove ZERO dependencies.** `@ai-sdk/google`, `@ai-sdk/openai`, `@ai-sdk/anthropic`, `@ai-sdk/openai-compatible`, `ai`, `zod` are ALL used by the LIVE `resolveModel` family dispatch and elsewhere. `git diff 48d345a -- package.json package-lock.json` must be empty. Do NOT "tidy up" any package.
- **Registry untouched.** `git diff 48d345a -- api/cwf/_lib/llm/llmProviderRegistry.ts api/cwf/_lib/llm/reference/providers.ts api/cwf/_lib/llm/config.ts` must be empty.
- **Test-count DROP is the goal, not a regression.** Deleting `rateLimiter.test.ts` removes exactly **14** cases. Post count MUST be `N − 14`. Do NOT restore, replace, or re-home the rateLimiter test — it tests deleted dead code. State both N and N−14.
- **Doc lock-step is real here** (manifest `codeAreas` includes `shared/**`): `check:doc-drift` runs inside `build`, so build stays RED until the affected tab's `lastSyncedCommit` is bumped. Bump it — but FIRST verify the tab's diagram still holds at its altitude (the fallback was never depicted; the gateway box is unchanged), per the standing "verify altitude, never trust a seal note" rule. Do not redraw; the deletion does not change the diagram's truth.
- **Eval-gate / trust line / governance / chat.ts / router transport — untouched.**

---

## PROV-3A — Delete the dead surface
Delete these files, then remove the now-empty directory:
- `shared/llmGateway/index.ts`
- `shared/llmGateway/providers.ts`
- `shared/llmGateway/rateLimiter.ts`
- `shared/__tests__/rateLimiter.test.ts`
- the empty `shared/llmGateway/` directory

## PROV-3B — Correct the stale `gateway.ts` comment (comment-only)
Replace the lines 10–13 NOTE block (which describes `shared/llmGateway/*` as a fallback layer "left for later consolidation") with a single accurate line, e.g.:
```
 * The PROV-1 provider registry (api/cwf/_lib/llm/reference + llmProviderRegistry)
 * is the SINGLE provider definition surface; there is no separate fallback path.
```
Nothing else in this file changes.

## PROV-3C — Reconcile the docs (correctness, not just deletion)
- **`README.md`:**
  - The "with an OpenAI / Anthropic **fallback gateway** via the Vercel AI SDK" line is now wrong: post-PROV-1, OpenAI and Anthropic are first-class **selectable chat providers** in the registry, not a fallback. Correct it to reflect the live reality (one Vercel AI SDK `streamText` gateway; a DB-first provider registry; selectable providers gemini/openai/anthropic + the openai-compatible family).
  - The env line "**Fallback providers (optional):** `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`" — keep the env vars (they ARE still read by the live family dispatch) but rename the framing to "**Additional chat providers (optional)**" so the *reason* is correct.
- **`.agents/CHANGELOG.md`:** do NOT edit the PROV-1 entry (history is append-only). APPEND a new dated PROV-3 entry recording that the tracked follow-up was resolved by **removal** (with the one-line rationale: zero live callers; non-streaming/no-tools surface structurally unfit for the streaming tool-calling agent; resilience relocated to the future gateway layer). Include the Verify summary (greps + diffs + count delta) and the doc-sync note (the `shared/**` tab's `lastSyncedCommit` bumped).
- **`public/architecture/manifest.json`:** bump the affected tab's `lastSyncedCommit` to the PROV-3 commit (after the altitude check above). If a mixed code+doc two-commit seal is the established pattern, follow it; otherwise same-commit is fine for a comment/doc-only reconcile.

---

## SELF-VERIFICATION CHECKLIST (evidence — paste, don't self-report)
- [ ] Pre-flight green; **N recorded**; the dead-surface grep pasted and empty of production callers.
- [ ] `shared/llmGateway/` directory is GONE; `shared/__tests__/rateLimiter.test.ts` GONE (paste `ls shared/` + `ls shared/__tests__/`).
- [ ] **`git diff 48d345a -- api/cwf/_lib/llm/gateway.ts`** shows ONLY the comment block changed; `resolveModel`/`streamChat` byte-identical. Paste it.
- [ ] **ZERO deps changed:** `git diff 48d345a -- package.json package-lock.json` empty. Paste (or state empty).
- [ ] **Registry untouched:** `git diff 48d345a -- api/cwf/_lib/llm/llmProviderRegistry.ts api/cwf/_lib/llm/reference/providers.ts api/cwf/_lib/llm/config.ts` empty. Paste.
- [ ] **Build green incl. drift-guard:** paste the `[check:doc-drift] [OK] no drift` line. (If it flagged, the manifest bump is missing — fix, don't suppress.)
- [ ] **Full vitest green; count == N − 14** (state both numbers; the −14 is the deleted dead rateLimiter cases and is EXPECTED).
- [ ] **Docs reconciled:** paste the `README.md` diff (fallback→live-reality framing) and the **appended** `CHANGELOG.md` PROV-3 entry (PROV-1 entry unchanged); state the manifest `lastSyncedCommit` bump + the one-line altitude justification.
- [ ] **Scope clean:** `git diff 48d345a -- api/cwf/chat.ts api/cwf/_lib/toolCategories.ts api/cwf/_lib/knowledge api/cwf/_lib/evalGate` empty (router transport, chat runtime, eval-gate, trust line all untouched).

## OUT OF SCOPE (tracked follow-up)
- **Live-path cross-provider resilience.** The streaming agent currently has none, by design. When EAIP wants it, the correct home is the future **gateway layer (LiteLLM/vLLM)** — which does provider failover natively — or a deliberate **registry-aware `streamChat` retry** phase. It is NOT this removed non-streaming/no-tools surface. Tracked, not bolted on.
- The Vercel AI Gateway family (still deferred — egress posture).

---
*Owner steps after AG pushes: none — this is pure code/doc cleanup (no migration, no seed). I will verify from the repo: the dead-surface grep is empty, `gateway.ts` diff is comment-only, deps/registry diffs are empty, the count is exactly N−14, and the README/CHANGELOG/manifest reconcile is correct (history appended not rewritten). Then we move to PL-1 F-obs (OTel → self-hosted Langfuse).*
