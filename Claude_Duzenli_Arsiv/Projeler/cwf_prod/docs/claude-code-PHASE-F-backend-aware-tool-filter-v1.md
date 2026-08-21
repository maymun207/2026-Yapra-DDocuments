# Claude Code — PHASE-F: Backend-aware tool filter (gateway exemption + metrics routing)
**rev 1 · 2026-06-29 · target HEAD `d0b91a0` · canonical repo `cwf_yaprak` · api-only**

## Why this phase exists (read first — diagnosis is empirical, from the live `[ToolRoute]` log)
With **Superset active (ARMES off)**, the OBS-1 instrumentation caught a live break. Vercel `[ToolRoute]` lines from the test:
```
openai      bypass=off  path=router  offered=0/4   categories=[production,factory]   → 0 tools → FAIL
gemini      bypass=off  path=router  offered=0/4   categories=[production,factory]   → 0 tools → FAIL
gemini-lite bypass=off  path=router  offered=0/4   categories=[production,factory]   → 0 tools → FAIL
anthropic   path=all-fallback  offered=4/4  → called search_tools/call_tool/list_dashboards → WORKED
```
**Root cause:** the relevance filter's categories are 100% **ARMES flat-tool names**. When the active backend is the **Superset gateway** (model-facing tools = `search_tools`/`call_tool`, a tiny fixed set), those names match no category → the filter offers **0 of the gateway's tools** to every non-Anthropic provider → they can't reach Superset at all. Only Anthropic survives because it takes the full-set (no-filter) branch. The filter is a **flat-tool optimizer**; applying it to a gateway backend is a category error.

**The fix is backend-aware filtering** (this generalizes — it also closes the still-open ARMES canonical-metric gap):
> `offered = all(gateway-backend tools) ∪ relevanceFilter(flat-backend tools)`
A gateway backend's tools are its **only** entry points and must always be offered; a flat backend keeps relevance filtering (it genuinely helps weak models navigate ~140 tools — v1's bypass test proved the full set drowns them).

Two halves, one prompt:
- **Superset half (live bug, testable NOW with Superset on):** gateway tools never filtered to zero.
- **ARMES half (the original Phase-F question, testable when ARMES is on):** the canonical OEE tools (`getOeeValuesForZones`/`getDailyOeeValues`) are in **zero categories** today, so an OEE query routes to `[production,factory]` — which contains the *confusable* `getOrderDetails`/`getPlannedOrderPlans`, not the OEE tools. Fix: a **`metrics` category** (keyword `oee`) holding the canonical tools, so an OEE query routes to them and *away* from the confusables.

---

## PRE-FLIGHT GATE (hard)
1. `git rev-parse --short HEAD` == `d0b91a0`. Clean tree.
2. `npm ci && npm run build && npx vitest run` — green; record the count (expect ~390).
3. Read: `api/cwf/chat.ts` tool-assembly (~L505–575: `serverMap`, `scopeToolsToBackends`→`scopedTools`, the `provider==='anthropic' || labActive?.routingBypass` full-set branch vs the `filterToolsByMessage` branch, the `[ToolRoute]` line); `api/cwf/_lib/backends/scopeTools.ts` + `resolveActiveBackends.ts` (`backendOf`, `BackendServerLike`); `api/cwf/_lib/toolCategories.ts` (`CATEGORIES`, `ALWAYS_INCLUDE`, `filterToolsByMessage`); `shared/dbConstants.ts` (`CANONICAL_METRIC_TOOLS`, backend-id constants, `DEFAULT_BACKEND_ID`); the `backends.tool_pattern: 'flat'|'gateway'` field (`RuleStoreRepository.ts`).

## HARD CONSTRAINTS
- **The trust line is OFF-LIMITS.** Do NOT touch `api/cwf/_lib/knowledge/reference/backendTrust.ts` or `trustRegistry.ts` — that is the ADR-001 governance foundation, and routing is a *different* concern. The backend tool-pattern source for routing is a **new, separate** routing-layer reference (below). `git diff d0b91a0 -- api/cwf/_lib/knowledge api/cwf/_lib/backends/trustRegistry.ts` must be empty.
- **`filterToolsByMessage` stays pure-flat.** The backend-awareness (the gateway/flat partition) lives in **chat.ts**, where backend identity is known. Do not pass backend info into the filter.
- **ARMES-only must be byte-identical.** When no gateway backend is active, the gateway partition is empty → every tool is flat → the offered set equals today's. Prove it with an equality test (the Anthropic cache-prefix invariant depends on this).
- **The Anthropic / routing-bypass full-set branch is UNCHANGED.** Only the per-message *filtered* branch (non-Anthropic, no bypass) gains the partition.
- **RULE 1 — no inline literals.** Backend→pattern via the new reference; canonical tools via `CANONICAL_METRIC_TOOLS`; backend ids via the existing `shared/dbConstants` constants. No hardcoded `'armes'`/`'superset'`/tool-name strings in logic.
- **Eval-gate untouched.** `canonicalOeePresence` stays **observe-only** (it now legitimately reads `present` once the metrics category routes the tools — that is the *measurement of the fix*, not a behavior the flag drives).
- **api-only.** No `src/**` (frontend) change. `git diff --stat d0b91a0 -- src` empty.

---

## F-A — Backend tool-pattern reference (routing layer; isolated from the trust line)
New `api/cwf/_lib/backends/backendToolPattern.ts`:
- A code reference `BACKEND_TOOL_PATTERN: Record<string, 'flat' | 'gateway'>` keyed by backend id (ARMES → `'flat'`, Superset → `'gateway'`), built from the `shared/dbConstants` backend-id constants (not raw string literals).
- Pure `toolPatternOf(backendId: string | undefined): 'flat' | 'gateway'` → looks up the map; **default `'flat'`** for unknown/undefined (conservative: an unrecognized backend is treated as flat = filtered; a misclassified new gateway shows up immediately as `[ToolRoute] offered=0/N` and is fixed by adding it here).
- Rationale comment: the DB `backends.tool_pattern` is the runtime truth, but tool-assembly needs a **synchronous** read before the trust registry is warmed; this code reference is the structural floor for *routing* — the same code-floor philosophy as the trust reference, but isolated to the routing layer so the governance trust line is never read at tool-assembly time.
- Unit tests: armes→flat, superset→gateway, unknown→flat, undefined→flat.

## F-B — Gateway exemption in chat.ts (the partition)
In the **filtered branch only** (the `else` after `if (provider === 'anthropic' || labActive?.routingBypass)`):
- Partition `scopedTools` by `toolPatternOf(serverMap.get(t.serverId)?.backend_id)`:
  - `gatewayTools` = pattern `'gateway'`.
  - `flatTools`    = pattern `'flat'`.
- `const flatResult = flatTools.length > 0 ? await filterToolsByMessage(flatTools, message) : { filtered: [], matchedCategories: [], totalTools: 0, path: 'keyword' as const };`  (skip the filter — and its router LLM call — when there are no flat tools, e.g. Superset-only.)
- `toolDefs = [...gatewayTools, ...flatResult.filtered];`  Keep any existing downstream ordering/dedup the registration loop relies on.
- `filteredToolCount = toolDefs.length; matchedCategories = flatResult.matchedCategories; routePath = flatResult.path;`
- **`[ToolRoute]` line:** extend it with `gateway=${gatewayTools.length}` so the read surface shows gateway tools surfacing, e.g.
  `[trace=…] [ToolRoute] provider=… bypass=off path=… offered=${toolDefs.length}/${totalToolCount} gateway=${gatewayTools.length} canonicalOEE=${canonicalPresence} categories=[…]`
- Invariants to encode + test:
  - **ARMES-only** (no gateway active) → `gatewayTools` empty, `flatTools === scopedTools` → `toolDefs` equals today's `filterToolsByMessage(scopedTools, message).filtered`. **Byte-identical equality test.**
  - **Superset-only** → all gateway → `toolDefs === gatewayTools` (all offered, filter never applied to them).
  - **Mixed** → gateway always ∪ filtered(flat).
  - Anthropic/bypass branch unchanged.

## F-C — `metrics` category (routes ARMES OEE queries to the canonical tools, away from the confusables)
In `toolCategories.ts` `CATEGORIES`, add (DRY — reuse the OBS-1 constant):
```
{ name: 'metrics', keywords: ['oee'],  // tight, high-signal; add only synonyms that won't over-match
  tools: [...CANONICAL_METRIC_TOOLS] }  // getOeeValuesForZones, getDailyOeeValues — single source
```
- Effect: the ARMES query "…OEE değerleri…" keyword-matches `oee` → `matchCategories = {metrics}` (router skipped) → offered = the canonical OEE tools + `ALWAYS_INCLUDE` (getFactoryList/getFactoryLines for zone resolution). `production` is NOT matched (no production keyword) → `getOrderDetails`/`getPlannedOrderPlans` excluded.
- Keep keywords **tight** — `oee` is the load-bearing one; do not add broad terms (e.g. bare "verimlilik"/"performans") that would pull metrics into unrelated queries. State the over-match risk in a comment.
- Tests: (a) "bu haftanın OEE değerleri" → matched categories include `metrics`, offered set ⊇ `CANONICAL_METRIC_TOOLS`, and ⊉ `getOrderDetails`/`getPlannedOrderPlans`; (b) a non-OEE ARMES query is unchanged (metrics not matched); (c) the metrics category tools come from `CANONICAL_METRIC_TOOLS` (no duplicated literal).

---

## SELF-VERIFICATION CHECKLIST (evidence)
- [ ] Pre-flight green; count recorded.
- [ ] **Trust line untouched:** `git diff d0b91a0 -- api/cwf/_lib/knowledge api/cwf/_lib/backends/trustRegistry.ts` empty. **Frontend untouched:** `git diff --stat d0b91a0 -- src` empty.
- [ ] **F-A:** `toolPatternOf` unit tests pass (armes/superset/unknown/undefined).
- [ ] **ARMES-only byte-identical:** an equality test proving `toolDefs` (new partition path, no gateway active) === `filterToolsByMessage(scopedTools, message).filtered` (old path). Paste it.
- [ ] **Superset-only:** a test (or the live `[ToolRoute]` line) showing all gateway tools offered — `offered=N/N gateway=N`, not `0/N`.
- [ ] **Metrics routing:** test showing an OEE query → `metrics` matched, offered ⊇ canonical OEE tools, ⊉ production confusables.
- [ ] **Anthropic/bypass branch unchanged**; eval-gate diff empty; `canonicalOeePresence` still observe-only (grep: used only for the log flag).
- [ ] Full suite green (state the new count).
- [ ] **Owner-side live verification plan stated (no manual drudgery — Claude reads Vercel):**
  - *Superset (now):* a non-Anthropic OEE turn → expect `[ToolRoute] … offered>0 gateway=N` and real `search_tools`/`call_tool` calls. (Claude reads the line from Vercel.)
  - *ARMES (when ARMES is the active backend):* an OEE turn → expect `[ToolRoute] canonicalOEE=present path=keyword categories=[metrics]` and the model calling `getOeeValuesForZones`/`getDailyOeeValues`. (Claude reads it from Vercel.)

## OUT OF SCOPE
- Any change to `filterToolsByMessage`'s internal stages, the trust line, the eval-gate, or the frontend.
- The Gemini-Lite path divergence and viz-restore (separate parked items).
- Turning ARMES on/off is a config action the owner takes when ready to verify the ARMES half; the Superset half verifies under the current (Superset-on) config.
```
```
After AG reports: Claude verifies the diff (esp. the ARMES-only byte-identical equality + trust-line-untouched), then reads the live `[ToolRoute]` line from Vercel for a Superset OEE turn to confirm `gateway=N offered>0`. The ARMES half is confirmed whenever ARMES is next the active backend. No tables, no pasting — Claude reads the logs.
```
