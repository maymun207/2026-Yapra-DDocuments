# Claude Code 4.8 — PHASE 6.6 (v1): Active-backend tool discipline — decline don't fabricate + scope the model-facing toolset to active backends
<!-- version: v1 · 2026-06-27 · cwf_yaprak P6.6 active-backend tool discipline -->
### cwf_yaprak · master HEAD `89fce64` (P6.5) · two coupled gaps from the live traces · additive · ARMES byte-identical (pack AND tool prefix)
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER P6.5 (`89fce64`). The P6.5 live round-trips surfaced a real (non-safety) robustness gap: with ARMES disabled and only Superset active, an ARMES-intent question made the model **fabricate a flat tool name** (`getFactoryLines`) and pass it to `call_tool` — which the gateway rejected. No wrong data was produced (the model declined to answer rather than inventing a number), so this is **robustness, not a safety hole** — but it violates the gateway's "never fabricate a tool name" invariant and exposes a structural gap. P6.6 closes both, additively.

---

## THE TWO COUPLED GAPS (from the live evidence — internalize before coding)
1. **Decline-on-empty (prompt):** when `search_tools` returns nothing relevant to the request, the model must DECLINE ("that capability isn't available for the active backend(s)") and STOP — it must NOT `call_tool` a name `search_tools` never returned, and must NOT reach for another backend's flat tool name. Observed: Superset-only active, OEE question, search found nothing → model fabricated `getFactoryLines`.
2. **Tool-scope (chat.ts):** the model-facing toolset is NOT scoped to `activeBackends`. `chat.ts` registers ALL discovered tools — for Anthropic the full sorted set, for others the relevance-filtered set — but **never filters by `activeBackends`**. So a backend that is *enabled-but-not-active* (RBAC-excluded, or enabled-without-pack) has its tools handed to the model with no matching domain pack. (Confirmed in the tool-registration block: the Anthropic/relevance split never consults `activeBackends`.)

Gap 1 fixes the observed bug. Gap 2 closes the general case (offered-but-ungoverned tools). They are the same concern — *the model should only see, and only call, tools for the active backend(s)* — from the prompt side and the mechanism side.

## SCOPE BOUNDARY (load-bearing)
- **IS:** (A) a decline-don't-fabricate rule + a tiny "`list_*` page starts at 1" hint in the Superset gateway pack; (B) a pure, tested filter that scopes the model-facing toolset to `activeBackends` in `chat.ts`; tests + docs; a live re-verify.
- **IS NOT:** any change to MCP discovery/transport/`callTool` (discovery stays unioned), the LLM `gateway`, the eval-gate machinery, the composers (`composeArmes`/`composeSuperset`), governance/admin, or ARMES content. NO new vector. NO mutating Superset call.
- **ARMES byte-identical — TWO senses, both required:** (i) the ARMES domain pack text is unchanged (snapshot green); (ii) for the **ARMES-only configuration** the model-facing **tool prefix is unchanged** (nothing to filter when only ARMES is enabled → the Anthropic cache prefix stays byte-stable). The ONLY behavioral change is the *enabled-but-inactive-backend* case.

## HARD PRE-FLIGHT GATE (stop if any fails — report deltas)
1. On `89fce64`; baseline green (`tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` — report the count, was 249).
2. Confirm the real shapes (verify, list deltas):
   - `api/cwf/chat.ts` tool-registration block: the Anthropic-sort vs `filterToolsByMessage` split; `toolToServerMap`; `mcpServers` carry `id`/`backend_id` and `backendOf()` (from `resolveActiveBackends`) maps a tool's server → backend. Confirm there is currently **no `activeBackends` filter** on the registered set.
   - `resolveActiveBackends` / `backendOf` (`api/cwf/_lib/backends/resolveActiveBackends.ts`) — reuse, don't reimplement.
   - The Superset gateway pack source — `api/cwf/_lib/knowledge/backends/superset/gatewayProtocol.ts` (and how its rules render): where the "search-then-call / never fabricate" rule lives, and whether the decline-on-empty facet already exists. Confirm whether the gateway rules are a CORE-locked `superset.gateway_rule` kind (so a change rides the code baseline + re-seed) or always-inject protocol text.
   - The eval-gate's `SUPERSET_REQUIRED_MARKERS` (`gate/evalGate.ts`) — so the new decline rule stays **consistent with the behavioral markers** (a future poison must not be able to strip it).
   - `promptSnapshot.test.ts` (the byte-identical gate) + how the ARMES-only tool set is asserted, if at all.
3. Report shapes + deltas, then proceed.

## HARD CONSTRAINTS
- **Discovery/transport frozen.** No edit to `discoverMcpTools`/`discoverServerTools`/`callTool`. P6.6 filters the ALREADY-discovered set at registration time only.
- **ARMES byte-identical (both senses).** Prove (i) the ARMES pack snapshot is unchanged and (ii) the ARMES-only tool prefix is unchanged (filter is a no-op when only ARMES is active).
- **Determinism/safety split.** The decline rule is a correctness invariant of the gateway → it belongs in the CODE baseline (and, if the gateway rules are a CORE-locked kind, in the reference instance that re-seeds to the DB), consistent with `SUPERSET_REQUIRED_MARKERS`. Do NOT put it only in a soft/advisory layer.
- **No mutating Superset call; secrets via env only; RULE 1 / i18n.** No new dependency.
- **Versioning (standing rule):** bump any regenerated diagram/KB to a new file.

---

## SUB-PHASE P6.6.A — Decline-don't-fabricate + page hint (prompt; Superset pack)
- In the Superset gateway pack (the `gateway_rule` set / protocol render), add/strengthen an explicit rule:
  - *If `search_tools` returns no tool relevant to the request, STATE that the capability is not available for the active backend(s) and STOP. NEVER `call_tool` a name that `search_tools` did not return. NEVER substitute or invent a flat/other-backend tool name (e.g. a direct MES tool) — those are not reachable through this gateway.*
  - A tiny format hint: *`list_*` tools are 1-indexed — `page` starts at 1, not 0.* (From the observed `page:0` self-correction.)
- If the gateway rules are a CORE-locked `superset.gateway_rule` kind: add/strengthen the reference instance in the code baseline, keep its marker text consistent with `SUPERSET_REQUIRED_MARKERS`, and note that `scripts/seedRules.ts` (idempotent) must be re-run by the owner to publish it to the DB (until then the code floor already carries it).
- Present ONLY when `superset` is active → ARMES-only/empty prompts byte-identical.
- **GATE:** the decline rule + page hint render in the Superset slice (code floor AND DB-composed); the ARMES pack snapshot is byte-unchanged; the new rule is consistent with the eval-gate markers (a poison dropping it would still fail behavioral).

## SUB-PHASE P6.6.B — Scope the model-facing toolset to active backends (chat.ts)
- Extract a **pure function** `scopeToolsToBackends(tools, toolServerLookup, activeBackends)` (own file, e.g. `api/cwf/_lib/backends/scopeTools.ts`) that drops any tool whose server's `backendOf()` ∉ `activeBackends`. Unit-test it directly.
- In `chat.ts`, apply it to `mcpTools` **at the top of the tool-registration block, BEFORE the Anthropic-sort / relevance-filter split**, so both provider paths register only active-backend tools. Discovery (`discoverMcpTools`) is unchanged — only the model-facing set is scoped, now consistent with pack injection.
- Keep the relevance filter and the Anthropic cache-mode sort intact; they operate on the already-scoped set.
- **GATE:**
  - ARMES-only config (only ARMES enabled+active) → the registered tool set is **identical** to today (no Superset tools to drop) → Anthropic tool prefix byte-stable (prove it).
  - Both active → both backends' tools register.
  - **Enabled-but-inactive** (e.g. Superset enabled but not in `activeBackends`) → Superset tools are NOT registered (the gap closed). Unit-tested via the pure function.

## SUB-PHASE P6.6.C — Tests + docs
- Unit: `scopeToolsToBackends` (active-only registers; inactive dropped; ARMES-only is a no-op). Snapshot: ARMES-only pack + (if asserted) tool set unchanged. Dual-active keeps both packs+tools.
- `.agents/CHANGELOG.md` (What/Where/Verify incl. both byte-identical senses + the decline-rule render), `.agents/skills/cwf-project-kb/SKILL.md` (active-backend tool discipline: model sees+calls only active-backend tools; decline-don't-fabricate; empty search ≠ invent a name), `.agents/AGENTS.md` (a rule: *"The model-facing toolset is scoped to activeBackends; on an empty search the model declines, never fabricates or reaches for another backend's tool name"*), `docs/ROADMAP.md`.
- Final green run (report numbers).

## SUB-PHASE P6.6.D — Live re-verify  **[MAYMUN runs; PASTES BACK]**
- (a) ARMES disabled, ask the same ARMES-intent question ("KB7 OEE this week") → expect the model to **DECLINE** ("capability not available for the active backend") — NO `getFactoryLines`, no fabricated `call_tool`.
- (b) Both backends enabled, ask a Superset question then an ARMES question → each routes to its own tools, no cross-talk, no fabrication.
- **[PASTE BACK]** the `telemetry_events` tool_call trace for each. (Read-only; if a backend is unreachable, record as deferred.)
- Commit `fix(phase6.6): active-backend tool discipline — decline-don't-fabricate + scope toolset to active backends` and **push + prove sync**.

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on `89fce64`; baseline green (count); shapes confirmed — esp. that chat.ts does NOT currently scope tools to activeBackends, and where the gateway decline rule lives. Report deltas.
- [ ] P6.6.A: decline-don't-fabricate + page hint render in the Superset slice (floor AND DB); consistent with `SUPERSET_REQUIRED_MARKERS`; ARMES pack snapshot byte-unchanged.
- [ ] P6.6.B: `scopeToolsToBackends` pure + unit-tested; applied before the Anthropic/relevance split; **ARMES-only tool prefix byte-identical** (proven); both-active registers both; enabled-but-inactive drops the inactive backend's tools.
- [ ] P6.6.C: tests + docs updated.
- [ ] P6.6.D: live re-verify — ARMES-off ARMES-question → model DECLINES (no fabricated tool name); both-active → no cross-talk (paste traces or record deferred); committed + pushed + sync proven.
- [ ] No discovery/transport/gateway/eval-gate/composer change (diffs empty); ARMES byte-identical (pack + ARMES-only tool prefix); no vector; no `.env*`/token; no mutating Superset call; no new dependency.
- [ ] `tsc -b` + api typecheck + `vite build` + `oxlint` + `vitest` green — exact numbers.
- [ ] State explicitly: **"Phase 6.6 complete — the model-facing toolset is scoped to activeBackends (a pure, tested filter applied before the Anthropic/relevance split; ARMES-only tool prefix byte-identical; enabled-but-inactive backends' tools no longer offered), and the Superset gateway pack now DECLINES when search_tools finds nothing instead of fabricating a tool name (+ a list_* page-1 hint); ARMES pack byte-identical; discovery/transport/gateway/eval-gate unchanged; live re-verify shows the ARMES-off question declines cleanly and dual-active has no cross-talk; pushed and in sync."**

Do NOT: change discovery/transport/`callTool`, the LLM gateway, the eval-gate machinery, or the composers; touch ARMES content; offer an inactive backend's tools; or make a mutating Superset call. Stop after the checklist and present the report with the live re-verify traces.
