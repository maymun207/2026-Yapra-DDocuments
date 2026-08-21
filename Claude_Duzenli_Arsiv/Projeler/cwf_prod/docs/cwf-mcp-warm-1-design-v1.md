# CWF — MCP-WARM-1 Design Note (F117)
<!-- cwf-mcp-warm-1-design-v1 · rev 1 · 2026-07-16 · Architect-authored, S47.
     Verified against origin/master 15609d5 (S46-3). Owner approval gates the phase prompt. -->
<!-- PLATINUM compliance: cron self-runs on the existing CRON_SECRET pattern; the mirror
     self-heals (live-fallback feeds it back); the ONLY human touchpoint is migration
     consent, executed through the standing Operator lane. Zero manual configuration. -->

## 1 · Diagnosis (code facts, live master)

Stage `resolve-mcp` (`stagesResolve.ts:21-22`) runs on EVERY turn:
`loadUserMcpServers` (cheap DB reads) → `discoverMcpTools` (per server: **connect + listTools**,
5-min warm-instance TTL cache). On serverless, cold starts and TTL expiry make the
connect+list pair a recurring per-turn cost — measured **3.92s ≈ 35% of turn latency**.

The hidden fact that makes this deletable: **tool EXECUTION never reuses the discovery
connection.** `callMcpTool` (P6.7) opens a fresh connection per call. The eager connect's
only product is tool *definitions* — and `backend_tools` (ROUTE-GOV-1 v2_2) already
mirrors exactly those: `tool_name`, `description`, `input_schema` (stored explicitly for a
future consumer — this phase is that consumer), `status active|missing`, missing≠deleted.

So the phase is not "build a cache." It is: **serve definitions from data we already
govern-adjacently hold, delete the per-turn connect, and stand up a cron that keeps the
mirror fresh and knows backend health.**

## 2 · Design (committed single path)

### A · Mirror-served tool definitions (turn path)
New read `resolveMirrorTools(activeBackendIds)` inside the resolve-mcp stage:
`backend_tools WHERE backend_id IN (…) AND status='active'` → mapped to `MCPToolDef`
(name/description/inputSchema; `serverId`/`serverName` reconstructed from the turn's
matched server def for that backend).

**Floor law (empty≠zero, sacred):** live `discoverServerTools` remains the outage floor,
per SERVER, triggered by any of:
- mirror returns ZERO active rows for that backend (never synced ≠ no tools);
- the mirror read throws (DB down);
- a stored `input_schema` fails the shape validation (skip that server to live, loud log);
- the backend↔server mapping is ambiguous this turn (>1 enabled server claims the
  backend) — **never guess** (S39/S40 lesson), fall to live for that backend.
Personal servers with unique ids (no mirrored backend) ALWAYS use live discovery — the
mirror is per-backend and global by construction.

**Self-healing (PLATINUM):** whenever the live fallback fires and succeeds, its result is
fed through the EXISTING `syncBackendCatalog` upsert (fire-and-forget, never fails the
turn) — the mirror repopulates itself with zero owner action.

### B · Lazy connect = deleting the eager one
With A, a turn performs **zero MCP connects before the LLM's first tool call**. No new
mechanism: execution already connects per call. No-tool turns never touch MCP at all.
The TTL discovery cache stays as a shield on the live-fallback path only.

### C · `backend_health` ledger (cron, new table → one Operator visit)
Append-only ledger: `backend_id · checked_at · status('up'|'down') · latency_ms ·
tool_count · error_head` (capped, C-3: never headers/tokens/auth'd URLs).
Service-role-only both directions; registered in the standing security triple
(DB_TABLES, TABLE_WRITE_MODEL, verifyGrants probe) — the generic tests enforce it.

Writer: new `/api/admin/backend-health` cron (`*/5 * * * *`), CRON_SECRET dual-auth
verbatim from the golden-runner pattern. Each run, per enabled GLOBAL backend server:
connect + listTools → write one health row → **feed `syncBackendCatalog`** — the cron is
the standing mirror-freshener, closing A's staleness structurally (a schema change lands
in the mirror within one cron interval). RULE 28: the cron mints no turn ids.

**Turn-start read (deterministic, FAIL-OPEN):** latest health row per active backend.
Fresh (< freshness window) AND `down` → exclude that backend's tools from the offer and
surface the existing degraded/scope-honesty messaging class — the ARMES-401 lesson: never
offer 141 tools that will all fail. No row / stale row / read error → **offer normally**
(cron-down ≠ chat-down; the observability-floor invariant, applied analogically).

### D · Config governance (RULE 1: nothing hardcoded)
One new governed decl in the existing `agent.param` lane (decl-derived seeds mean
SELF-SEED publishes it automatically — the F81-closure mechanism working for us):
`mcp.healthFreshnessSec` — floor 600 (= 2× cron interval), min 120, max 3600,
sessionTweakable:false, ops-plane (resolveQuotaPolicy pattern). Cron cadence itself lives
in `vercel.json` (structure→code, per the standing boundary).

### E · Observability
Resolve-stage span gains `cwf.mcp.tool_source = mirror|live|mixed` + per-source counts;
`SPAN_MCP_DISCOVER` now appears ONLY when the live fallback actually fires (its absence
becomes the success signal). One loud log line:
`[MCP Mirror] served N defs backend=X (live-fallback: Y)` — Architect-readable in Vercel
logs (S40-5 discipline). Health-excluded backends log
`[MCP Health] backend=X down (checked_at=…) — tools withheld`.

## 3 · What this deliberately does NOT do
- No change to tool execution, retries, or the P6.7 transient-retry path.
- No mirror writes from the turn path except the fire-and-forget fallback-feed.
- `resolveToolCategories` (stage 7) untouched — categories partition NAMES; this phase
  supplies DEFINITIONS. Backend-aware filter and scope-authority guard see identical
  attribution (serverId/backend_id survive the mirror mapping — a binding test pins it).
- No UI beyond logs (a health chip in the MCP panel is a later, separate polish item).
- ADR-001 posture unchanged: the mirror stays an OBSERVATION. A stale definition fails
  honestly at execution via the existing error path; it never becomes authority.

## 4 · Named traps (found during design, bound in the phase prompt)
1. **Down-backend offer flood** — solved by C's fail-open read.
2. **Personal servers invisible to the mirror** — per-server routing, never a global switch.
3. **Malformed stored `input_schema`** — Zod-shape check at map time; skip-to-live + loud
   log; a bad row must never crash tool registration.
4. **Attribution ambiguity** (backend claimed by >1 enabled server) — live fallback,
   never a pick (the F82 family lesson: a guess must never look like an answer).
5. **Replay/eval isolation** — replay uses recorded stubs, never live discovery; the
   phase pre-flight grep-proves the replay path imports none of the touched functions.

## 5 · Delivery shape
FULL profile (api/** + migration + turn path). Sub-phases:
- **W1** (no migration): mirror-served defs + floor fallback + fallback-feed + spans/logs
  + binding tests (incl. byte-identical offer on a synced-mirror fixture vs live fixture).
- **W2**: `backend_health` migration (authored, Operator-pending) + cron endpoint +
  turn-start fail-open read + `mcp.healthFreshnessSec` decl (self-seeds).
- **W3**: DOC — reseal (below diagram altitude: no new lifecycle stage; table + cron
  endpoint follow the GOLDEN-BATCH-1 reseal precedent) + CHANGELOG/KB.
Operator visit: ONE (`backend_health`). Candidate fold-in: F73 if still open at
authoring (verify against register at phase time).

**Expected win:** −3.92s on every discovery-miss turn; no-tool turns drop all MCP I/O;
prod gains a standing per-backend health record where today the first signal is a red
span mid-turn.

## 6 · Decisions for the owner (only these)
1. Cron cadence `*/5 * * * *` — approve? (Cost: one connect+list per backend per 5 min.)
2. Health-based tool withholding (C's fail-open read) — approve the withholding behavior,
   or ship health as display-only in W2 and gate withholding behind a later flip?
Everything else is committed.

<!-- END · cwf-mcp-warm-1-design-v1 · rev 1 · 2026-07-16 -->
