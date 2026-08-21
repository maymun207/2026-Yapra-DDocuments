# PHASE SR1-W1 — semantic router core (dark-launched, floor-guarded, code-only)
<!-- claude-code-PHASE-SR1-W1-router-core-v1 · rev 1 · 2026-07-16 · Architect-authored, S47.
     Design authority: cwf-sr1-semantic-routing-design-v1.md + cwf-sr1-signal-flow-v1.mermaid.
     Owner decisions folded in: model=gemini-flash-lite class · proposals visible in BOTH
     panel and a daily log summary (panel+summary land in SR1-W2; W1 logs proposals verbatim). -->
<!-- PLATINUM compliance: dark launch behind a governed param (enabling = a data publish);
     params self-seed (decl-derived); zero manual configuration. -->
<!-- GOLDEN FREEZE compliance: this phase touches NEITHER the chat prompt.segment kind NOR
     any golden machinery. The router prompt is a CODE-FLOOR constant in W1 (its governed
     DB-versioned kind lands in SR1-W2 with the proposals surface). -->

**IDENTITY CHECK (mandatory first output line):** Print `[AG-B] SR1-W1 · clone=<absolute path> · origin/master=<hash>` before any work.

**PRECONDITION (S47-1):** AG-A's MCP-WARM-1 (PR #59) is merging concurrently. Branch from CURRENT origin/master at your clone time and STATE ITS HASH. Your functional surface (`toolCategories.ts` + new router files) is disjoint from MCP-WARM-1's — but BOTH phases reseal the manifest. **Reseal responsibility is pre-assigned to YOU (S47-1 corollary): as second-to-merge, rebase onto the post-WARM master, re-run `npm run reseal` on the MERGED tree, and land docVersion rev N+1 in your merge.** If master moves mid-phase, rebase — never resolve the manifest by hand-picking a side.

**Profile: FULL** (turn path). Single wave, gated verify. Unsharded CI on the PR head is the sole arbiter (S37-2).

---

## 0 · Pre-flight (hard gate — grep-verify, any miss → STOP)
```bash
mkdir -p /tmp/agB-sr1w1 && cd /tmp/agB-sr1w1 && rm -rf cwf_yaprak
git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master   # STATE the hash in your identity line
```
1. `api/cwf/_lib/toolCategories.ts` — `matchCategories(message, learned, categories)` (line ~411): learned-first + keyword equality; `filterToolsByMessage`/caller seam that produces the matched category set for the turn.
2. `resolveToolCategories` pre-stage-7 seam (ROUTE-GOV-1): loads the DB-first category slice with the code floor (`catSource=db|floor` already logged).
3. `AGENT_PARAM_SEEDS = REFERENCE_AGENT_PARAMS.map(…)` — decl-derived (agentParams.ts ~210); adding decls self-seeds.
4. The LLM provider client construction used by the gateway (`api/cwf/_lib/llm/gateway.ts` / provider registry) — identify the EXISTING non-streaming or minimal completion path you can reuse for a small JSON call. Do NOT add a new SDK dependency.
5. `withTimeout` helper (`turn/mcpClient.ts`) — the timeout pattern to reuse.
6. Field-spec check: does any `agent.param` decl in the corpus use `type:'string'`? Record the answer — it decides D1 below.

## 1 · Scope (exactly this, nothing more)

**1.1 — `api/cwf/_lib/turn/semanticRouter.ts` (new):**
`routeSemantica(message, catalog, params) → { matched: string[] } | { floor: true, reason: string }`
- Builds the router prompt from the catalog: per category one line `name · keywords · description?` — NEVER tool names.
- Calls gemini-flash-lite (see D1) through the EXISTING provider client path, temperature 0, small maxTokens, `withTimeout(router.timeoutMs)`.
- **Deterministic armor (the trust line):** JSON parse (strip code fences defensively) → Zod schema `{ matched: string[], proposals?: { keyword: string, category?: string|null }[] }` → `matched` filtered to `⊆ catalog names` (out-of-catalog entries DROPPED and counted, not erroring the turn) → dedupe → hard cap at `router.maxCategories` (keep first N). Empty `matched` after armor = valid outcome (means "no category fits") — falls to FLOOR (starving the model on router say-so is not acceptable in v1; the floor decides).
- ANY throw/timeout/parse-fail → `{ floor: true, reason }`.

**1.2 — Router prompt (code floor constant, W1):** `ROUTER_PROMPT_FLOOR` in the new module, with a header comment: "SR1-W2 promotes this to a governed system kind (born code-ref, DB-versioned); this constant is the outage floor from day one." Content: instruct strict-JSON two-channel output, matched only from the given catalog, ≤N categories, propose keywords genuinely missing from the catalog. Bilingual robustness (TR/EN queries) stated in the prompt.

**1.3 — Wiring (`toolCategories.ts` seam):** when `router.enabled` resolves true AND the semantic result is non-floor and non-empty → its `matched` set replaces the keyword/learned match for the turn. EVERY other case → today's `matchCategories` path, byte-identical (the FLOOR). The learned-map write path (post-F123) fires ONLY on the floor path in W1 — the router path never writes learning (SR1-W2's proposals loop is the governed replacement).

**1.4 — Governed params (decls, self-seeding):**
`router.enabled` (bool-as-number 0/1 if the corpus has no bool type — mirror the existing convention you find; floor **0/false = DARK LAUNCH**), `router.timeoutMs` (floor 1500, min 300, max 5000), `router.maxCategories` (floor 4, min 1, max 8). Extend `seedAgentParams.test.ts` count.
**D1 (bounded conditional from pre-flight 6):** if `type:'string'` params exist in the corpus → also govern `router.model` (floor `'gemini-2.5-flash-lite'`). If NOT → code const `ROUTER_MODEL` with env override `CWF_ROUTER_MODEL` (the CWF_MAX_TOOL_ROUNDS floor's-floor precedent) + one CHANGELOG line recording the deferral to a future string-param capability. Do not invent a string-param type in this phase.

**1.5 — Catalog `description` field:** add optional `description?: string` to the `ToolCategory` type + the code-floor CATEGORIES rows, using EXACTLY these Architect-drafted lines (owner reviews in-panel later):
- metrics: "OEE and canonical production-efficiency metrics"
- production: "Production runs, orders, plans, recipes and their zone mappings"
- machine: "Machines/equipment: data, parameters, sensors, notifications, alarms, warnings, start/stop"
- material: "Materials, stock and material movements"
- transfer: "Transfers and movements between zones/units"
- employee: "Employees, shifts, operators and assignments"
- quality: "Quality controls, measurements, defects and scrap"
- andon: "Andon calls: line alerts, intervention requests, alarm/call system"
- linestop: "Line stops, downtime reports, stoppage causes and durations"
- logistics: "Logistics, shipment and warehouse operations"
- factory: "Factory topology: plants, zones, areas, lines"
- admin: "Administrative and system-level operations"
The router prompt renders `description` when present (DB slice rows without it render name+keywords only — no error). DB-side enrichment of the 12 published rows is deliberately NOT this phase (data op via panel/BULK-REVIEW later).

**1.6 — Observability:** `[Route]` line EVERY turn: `path=semantic|floor · latency_ms=<router call, 0 on floor-by-disabled> · matched=[…] · dropped=<out-of-catalog count> · proposals=[verbatim keywords] · floor_reason?`. Span attrs `cwf.route.path`, `cwf.route.latency_ms`, `cwf.route.matched_count`, `cwf.route.proposal_count`. (Owner decision: proposals must be log-visible from day one; the daily summary + panel land in SR1-W2.)

## 2 · Binding constraints
- Everything downstream of the matched-category set is byte-identical: candidate assembly, ALWAYS_INCLUDE floor, backend-aware filter, scope authority, grounding, eval-gate — untouched.
- Chat `prompt.segment` kind untouched. No golden surface. No migration. No new deps.
- Router failures NEVER fail or delay the turn beyond `router.timeoutMs`.
- `router.enabled` floor = OFF: merged behavior is byte-identical to master until the owner publishes the enable (prove with the equivalence test below).

## 3 · Tests (`api/cwf/__tests__/semanticRouter.test.ts` + wiring tests)
- Armor matrix: invalid JSON / fenced JSON / out-of-catalog names dropped+counted / over-cap trimmed / schema violation / timeout / provider throw → each yields floor or sanitized result exactly as specced.
- Dark-launch equivalence: `router.enabled=false` ⇒ the full match pipeline output is byte-identical to master's for a fixture set (reuse `stopwordGuard.test.ts` fixtures — floor incl. F123 guard proven unchanged).
- Enabled+valid ⇒ semantic set replaces keyword set; enabled+empty-matched ⇒ floor; enabled+floor-reason ⇒ floor.
- Router path performs ZERO learned-map writes; floor path still learns (post-F123 semantics).
- Params: floor/db/clamp for all three (+ model per D1). `[Route]` emission shape asserted.
- The 12 description lines present on the floor rows; prompt renders with/without description.

## 4 · Branch & report (NO merge — Architect gates)
Branch `phase/sr1-w1-router-core` → push → PR → unsharded CI green (S37-2). Report: identity line · branch-point hash · diff --stat · targeted vitest tail · drift line (+ the reseal you own per the precondition) · pre-flight item 6 answer + D1 branch taken · the `[Route]` line format as implemented.
Merge only on Architect GO, `--no-ff`, verbatim:
`Merge SR1-W1: semantic router core, dark-launched behind router.enabled (floor-guarded)`

## 5 · Self-verify checklist (evidence, not claims)
- [ ] Identity + branch-point hash stated.
- [ ] Dark-launch equivalence test green — paste name (this is the phase's spine).
- [ ] Full armor matrix green — paste names.
- [ ] Zero learned-map writes on the router path — paste the assertion.
- [ ] Three (or four, per D1) param decls seeded; seed-count test updated — paste.
- [ ] No migration, no new deps — paste `--stat` + package.json diff (must be empty).
- [ ] Reseal landed on the MERGED tree at rev N+1 (state N) — or explain why not yet applicable.

<!-- END · claude-code-PHASE-SR1-W1-router-core-v1 · rev 1 · 2026-07-16 -->
