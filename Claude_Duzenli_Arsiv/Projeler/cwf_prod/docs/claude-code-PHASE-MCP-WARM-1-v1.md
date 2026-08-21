# PHASE MCP-WARM-1 — mirror-served tool defs · lazy connect · backend_health cron
<!-- claude-code-PHASE-MCP-WARM-1-v1 · rev 1 · 2026-07-16 · Architect-authored, S47.
     Design authority: cwf-mcp-warm-1-design-v1.md. Owner decisions folded in:
     cron cadence */30 · health-based withholding ACTIVE from W2. -->
<!-- PLATINUM compliance: cron self-runs (CRON_SECRET pattern); mirror self-heals via
     fallback-feed; the governed param self-seeds (decl-derived). Only human touchpoint:
     Operator migration consent through the standing lane. -->

**IDENTITY CHECK (mandatory first output line):** Print `[AG-A] MCP-WARM-1 · clone=<absolute path> · origin/master=<hash>` before any work.

**PRECONDITION (S47-1):** Valid only while `origin/master == 15609d5c21dccf827fa004f2c250e1d9caa1b079` and no other live writer is on `api/cwf/_lib/turn/**`. On mismatch: STOP and report actual state. If unrelated work merged first: rebase, and per the S47-1 corollary YOU own the reseal-on-merged-tree (docVersion rev N+1) at merge time.

**Profile: FULL** (turn path + migration + security surface). Gated sub-phases W1→W2→W3, each with its own verify gate. Unsharded CI on the PR head is the sole test arbiter (S37-2); do not run the full suite locally as proof.

---

## 0 · Pre-flight (hard gate — grep-verify all, any miss → STOP)
```bash
mkdir -p /tmp/agA-warm1 && cd /tmp/agA-warm1 && rm -rf cwf_yaprak
git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master   # must be 15609d5…
```
1. `api/cwf/_lib/turn/stagesResolve.ts:21-22` — `ctx.mcpServers = await loadUserMcpServers(…)` then `ctx.mcpTools = await discoverMcpTools(ctx.mcpServers)`.
2. `api/cwf/_lib/turn/mcpDiscovery.ts` — `toolDiscoveryCache` (TTL 300_000) + `discoverServerTools` (connect + listTools inside `SPAN_MCP_DISCOVER`).
3. `api/cwf/_lib/persistence/repositories/BackendToolsRepository.ts` — `ROW_COLS` includes `description, input_schema, status`; sync upsert exists (`syncBackendCatalog` caller path from ROUTE-GOV-1).
4. `supabase/migrations/20260714120000_backend_tools.sql` — mirror table, service-role-only, missing≠deleted comment.
5. `api/admin/golden-runner.ts` — CRON_SECRET dual-auth pattern (line ~32).
6. `api/cwf/_lib/knowledge/reference/agentParams.ts` — `AGENT_PARAM_SEEDS = REFERENCE_AGENT_PARAMS.map(…)` (line ~210) — decl-derived; adding a decl self-seeds via `selfSeedReconciler.ts:54`.
7. `vercel.json` — crons array carries rollout-guardrail + golden-runner today.
8. Replay isolation: grep that `api/cwf/_lib/replay/**` imports neither `discoverMcpTools` nor `resolveMirrorTools` (the latter won't exist yet — pin the check for your self-verify).

## W1 · Mirror-served definitions + floor + self-heal (NO migration)

**W1.1 — `resolveMirrorTools`** (new, in `mcpDiscovery.ts` or a sibling module):
Input: the turn's enabled server defs. For each server with a `backend_id` that the mirror covers: read `backend_tools` rows `status='active'` for that backend via `BackendToolsRepository`; map to `MCPToolDef` (`name, description, inputSchema, serverId, serverName` — attribution reconstructed from THAT server def).
**Floor law (per SERVER, never global):** fall to live `discoverServerTools` when: (a) zero active rows for the backend; (b) the read throws; (c) a row's `input_schema` fails a minimal Zod shape check (`object|undefined` with `type`/`properties` tolerated loose — a bad row must never crash registration; skip the whole server to live, loud log); (d) backend claimed by >1 enabled server this turn (ambiguity → live, never a pick — F82 family). Personal/unique-id servers (no mirrored backend): always live.
**Self-heal:** when live fallback succeeds for a mirrored backend, feed the result through the existing sync upsert, fire-and-forget (`.catch` → log only; the turn NEVER waits on or fails from the feed).

**W1.2 — stage wiring:** `stagesResolve` keeps stage name/order; only internals change: `ctx.mcpTools = await resolveMirrorTools(ctx.mcpServers)` (which internally routes mirror/live per server). The TTL cache remains, shielding the live path only.

**W1.3 — observability:** resolve-stage span attr `cwf.mcp.tool_source = 'mirror'|'live'|'mixed'` + `cwf.mcp.mirror_count`/`cwf.mcp.live_count`. `SPAN_MCP_DISCOVER` now fires only on live fallback. One log line per turn: `[MCP Mirror] served N defs backend=<id> (live-fallback: M)`.

**W1.4 — binding tests (new file `api/cwf/__tests__/mcpWarmMirror.test.ts`):**
- Offer-equivalence: a fixture where mirror rows ≡ live listTools output produces a byte-identical `MCPToolDef[]` (order-normalized) to today's path.
- Each floor trigger (a)–(d) individually falls to live for THAT server only, others stay mirror.
- Personal server always live. `status='missing'` rows never offered.
- Fallback-feed called on live success, not awaited, failure swallowed with log.
- Attribution: `serverId`/`serverName` on mirror-served defs match the turn's server def (backend-aware filter + scope-authority inputs unchanged — reuse an existing scopeTools fixture).

**GATE W1:** targeted vitest green (new file + `resolveToolCategories`, `backendAwareFilter`, `scopeTools`-touching suites, `stageStreamSpans`) + `typecheck:api` + `check:doc-drift` (reseal if mapped — likely yes; budget it per S34-1).

## W2 · backend_health ledger + cron + fail-open withholding (ACTIVE)

**W2.1 — migration** `supabase/migrations/<ts>_backend_health.sql` (AUTHORED here, Operator-applied later — do NOT apply):
`backend_health(id uuid pk default, backend_id text not null references backends(id), checked_at timestamptz not null default now(), status text not null check (status in ('up','down')), latency_ms integer, tool_count integer, error_head text)`, index on `(backend_id, checked_at desc)`. Append-only ledger comment. Service-role-only: RLS on, NO client policy, revoke ALL from public+anon+authenticated explicitly (all-grantees pattern — FIX-2 lesson). `error_head` comment: capped ≤300 chars, C-3 — never headers/tokens/auth'd URLs. Register in DB_TABLES/TABLE_WRITE_MODEL + add the `verifyGrants` probe row + CI coverage test (standing security rule — the generic tests must pick it up, prove it in self-verify).

**W2.2 — cron endpoint** `api/admin/backend-health.ts`: CRON_SECRET dual-auth copied from golden-runner. Per enabled GLOBAL server with a backend_id: connect+listTools (existing helpers, existing timeout) → write one health row (`up` + latency + tool_count, or `down` + error_head) → on success ALSO feed `syncBackendCatalog` (the standing mirror-freshener). RULE 28: mint no turn ids. If the table is absent (pre-Operator window): respond 500 with `{error:'backend_health table absent — Operator migration pending'}` — born-loud (S41-1), self-explaining.
`vercel.json`: add `{ "path": "/api/admin/backend-health", "schedule": "*/30 * * * *" }` (owner decision).

**W2.3 — governed freshness param:** add decl `MCP_HEALTH_FRESHNESS_SEC: 'mcp.healthFreshnessSec'` to `AGENT_PARAM_KEYS` + `REFERENCE_AGENT_PARAMS` entry `{ value: 3600, type:'number', min:300, max:14400, stage:'00', sessionTweakable:false }` (floor = 2× the 30-min cadence). Decl-derived seeds ⇒ SELF-SEED publishes it — add zero manual steps; extend `seedAgentParams.test.ts` count.

**W2.4 — turn-start read + withholding (ACTIVE, owner decision):** in the resolve path, read the latest health row per active mirrored backend (one query, `checked_at desc limit 1` per backend or a lateral). Deterministic rule: row exists AND `now()-checked_at < mcp.healthFreshnessSec` AND `status='down'` → EXCLUDE that backend's tools from the offer, log `[MCP Health] backend=<id> down (checked_at=…) — tools withheld`, and mark the turn's scope context so the existing degraded/scope-honesty messaging class explains the absence. **FAIL-OPEN in every other branch** (no row / stale / read error / table absent) → offer normally. The code-before-migration window is therefore safe by construction — prove with a test that a thrown "relation does not exist" yields the normal offer.

**W2.5 — tests (`mcpHealthLedger.test.ts`):** cron auth 401 without secret; row write shape (up + down paths, error_head cap, no secret leakage — assert a header value never appears); fail-open matrix (fresh-down withholds; fresh-up, stale-down, no-row, throw all offer normally); withholding excludes ONLY that backend; freshness honors the governed param (db-published value wins over floor).

**GATE W2:** targeted vitest + typecheck + drift green. Migration file reviewed in full by Architect at FAST-GATE (non-negotiable class).

## W3 · DOC
Reseal on the final tree (docVersion +1; GOLDEN-BATCH-1 precedent — table + cron endpoint are below diagram altitude, reviewNote entries suffice) + CHANGELOG + KB skill entry + AGENTS.md lesson ONLY if flagged "proposed RULE" for Architect ratification.

## Binding constraints (whole phase)
- Tool EXECUTION path untouched (`callMcpTool`, P6.7 retry). `resolveToolCategories`/stage order untouched. Eval-gate surface byte-identical. No env vars. No client-visible API changes.
- Secrets never logged; `error_head` is the only failure text persisted, capped, sanitized.
- Migration is AUTHORED, never applied by you (ADR-006: raw DB = Operator lane).

## Branch & report (NO merge — Architect gates)
Branch `phase/mcp-warm-1` → push → PR → unsharded CI green. Report per gate: diff --stat vs 15609d5 · new-migration name-list (exactly 1) · targeted vitest tails · drift line · the W2.4 fail-open matrix test names · grep proof for pre-flight item 8. Merge only on Architect GO, `--no-ff`, verbatim:
`Merge MCP-WARM-1: mirror-served tool defs, lazy MCP connect, backend_health cron (F117)`

## Self-verify checklist (evidence, not claims)
- [ ] Anchor/precondition verified; identity line printed.
- [ ] A no-tool turn performs ZERO MCP connects (test or trace-level proof — name it).
- [ ] Offer-equivalence fixture green — paste test name.
- [ ] All four floor triggers individually proven per-server — paste names.
- [ ] Withholding fires ONLY on fresh-down; all other branches offer normally — paste matrix names.
- [ ] verifyGrants probe row + generic security tests cover backend_health — paste the rows/lines.
- [ ] `mcp.healthFreshnessSec` decl present; seed count test updated — paste.
- [ ] Exactly 1 new migration; applied by no one — paste name-list.

<!-- END · claude-code-PHASE-MCP-WARM-1-v1 · rev 1 · 2026-07-16 -->
