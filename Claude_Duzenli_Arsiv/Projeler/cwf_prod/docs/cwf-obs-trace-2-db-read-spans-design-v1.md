# OBS-TRACE-2 — DB-Read Span Layer · Design Note v1
<!-- cwf-obs-trace-2-db-read-spans-design-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (2 of 3). Design note only — the gated phase prompt is
     authored AFTER OBS-TRACE-1 merges (its span-I/O backbone is a dependency).
     Verified against origin/master = dca514c (rev 121). Companion:
     claude-code-PHASE-OBS-TRACE-1-v1 (phase 1), cwf-grand-sequence-flow-v1_2.html.
     Governs under the FULL-TRACE MANDATE (OBS-TRACE-1 §0): every DB/table read
     must show its input+output in Langfuse and the StagesDashboard. Today the
     persistence + knowledge layer has ZERO spans across 31 repositories / 144
     `.from()` reads — the single deepest dark zone. -->

## 1 · PROBLEM (tree-proven on dca514c)
- 31 repository classes, **144 `.from()` reads**, and the entire
  `persistence/` + `knowledge/` layer has **zero** `withSpan`/`startActiveSpan`
  calls. No `cwf.db.*` span name is even defined.
- Consequence: when a turn runs, which kinds `DbKnowledgeProvider` loaded, how
  many rows `tool_category_cache` returned, what `backend_authority` said, what
  the quota read found — none of it is in Langfuse, the StagesDashboard, or the
  logs. "Press button → lamp lights," with 144 reads dark in between.
- This is the load-bearing gap the owner named: *we can only improve what we can
  trace.* OBS-TRACE-1 lit the stage spans + routing chain; OBS-TRACE-2 lights
  the reads underneath them.

## 2 · THE SINGLE CHOKEPOINT (why this is tractable, not 144 edits)
`api/cwf/_lib/persistence/client.ts:48` — `getServiceClient()` — is the ONE
Supabase client factory ("there must be no other `createClient` call anywhere in
api/", enforced by its own doc + the Fence). Every repository takes
`constructor(client = getServiceClient())` and issues all `.from()` calls through
that single memoized `SupabaseClient`. So the read surface funnels through ONE
object. We instrument the object, not the 144 call sites.

## 3 · DECISION — wrap the client, do NOT weave 144 call sites
Two candidates were weighed:

**(A) Weave a `withDbSpan(...)` helper into all 144 `.from()` sites.** Rejected:
144 hand-edits = 144 chances for drift, an enormous diff, and every NEW repo read
added later silently escapes tracing (the mandate leaks by default). Violates
"traced by construction."

**(B) Wrap the `SupabaseClient` returned by `getServiceClient()` in a
span-emitting proxy — CHOSEN.** A thin wrapper intercepts `.from(table)` and
returns a proxied query builder whose terminal `.then()` (PostgREST builders are
thenable) opens a `cwf.db.read` span, awaits the real result, stamps
input/output, and closes. Every read — current and future — is traced with ZERO
per-call-site code. Traced by construction; the mandate cannot leak.

This mirrors the project's own "isolate behind an interface" contract and the
deterministic-boundary pattern (instrument once, at the seam).

## 4 · WHAT EACH `cwf.db.read` SPAN CARRIES (honest, scrubbed, never dark)
Reuse OBS-TRACE-1's `setSpanIO` + `scrubbedAttrValue` + cap (`MCP_SPAN_RESULT_MAX_LEN`).
- **Span name:** `cwf.db.read` (define in `observability/config.ts` beside the
  existing span-name constants).
- **Attributes:** `cwf.db.table` (the `.from()` argument), `cwf.db.op`
  (select/insert/update/upsert/delete — inferred from the builder method chain),
  `cwf.db.filter_summary` (a scrubbed shape of `.eq/.in/.gte…` predicates, NOT
  raw values where a value could be sensitive — column names + a redacted marker),
  `cwf.db.row_count` (returned rows; **`0` is a real datum, `null`/absent = read
  failed/unknown — empty≠zero at the trace layer too**), `cwf.db.latency_ms`,
  `cwf.db.ok` (boolean; on error, the PostgREST error CODE + message NAME only,
  never the raw error payload — that can carry credentials, per the
  TelemetryRepository redaction warning).
- **OBSERVATION_INPUT:** `{ table, op, filterSummary }`.
- **OBSERVATION_OUTPUT:** `{ rowCount, sampleHead: <first row, scrubbed + capped>,
  isEmpty: rowCount === 0 }`. A scrubbed sample row (not the full set — cap it) so
  you can SEE what came back without dumping a 10k-row payload or a secret.
- **Nesting:** these spans are children of whatever stage span is active
  (register-tools, warm-knowledge, warm-trust…), so in Langfuse the tree reads
  `stage → the reads it caused → their rows`. That is the "which button → which
  lamp" chain the owner asked for, at read granularity.

## 5 · THE THREE HIDDEN TRAPS (name them before building — project discipline)
1. **Secret-leak surface (the big one).** Full row I/O is a NEW secret surface —
   `LlmProviderSecretsRepository`, `McpSecretsRepository`, `LlmProvidersPersonalRepository`
   read rows that contain API keys / tokens. The scrubber MUST run at the wrapper
   BEFORE any value reaches a span, AND secret-bearing tables get an explicit
   **deny-list**: for a known-secret table, the span carries `row_count` + `ok`
   but **NO** `sampleHead` and a redacted `filter_summary`. This deny-list is a
   hard, tested boundary (a test that a secrets-table read emits no key material
   on its span), same rigor as `verifyGrants`. Do NOT rely on the generic
   pattern-scrubber alone for these tables.
2. **Serverless flush (already solved, must not regress).** chat.ts force-flushes
   before response end (F-obs). Adding ~dozens of child spans per turn must not
   overflow the flush or delay the response — verify span volume stays bounded
   (a read-heavy turn could emit 30-50 db spans). If volume is a problem, the
   fallback is a per-turn read AGGREGATE span (table → count of reads + total
   rows) rather than one span per read — but start with per-read (richer) and
   measure.
3. **Double-instrumentation / recursion.** The wrapper must not span its own
   internal reads (none here, but guard against the client being re-wrapped —
   idempotent wrap: mark the proxied client so `getServiceClient()` returns the
   SAME wrapped instance, preserving the existing memoization contract +
   `__resetServiceClientForTests`).

## 6 · SCOPE — everything, but built in a proven order (owner: NO narrowing)
The mandate is ALL reads. The wrapper delivers all 144 by construction in one
move, so there is no scope-narrowing here — the ordering below is about
VALIDATION sequence, not coverage:
1. Wrap `getServiceClient()`; the hot-path reads (knowledge warm, routing cache,
   quota, backend_authority) are the first to eyeball in Langfuse for correctness.
2. Secret-table deny-list + its test (before ANY secrets read is exercised).
3. Full-suite + a read-volume check on a representative heavy turn.
The knowledge-layer reads (`DbKnowledgeProvider`) that don't go through a
repository — confirm they ALSO use `getServiceClient()` (they should; if any
knowledge read bypasses it, that bypass is itself a finding to fix, because the
"single createClient" invariant would be violated).

## 7 · WHAT THIS DOES NOT DO (belongs to OBS-TRACE-3)
Reflecting these db spans into the StagesDashboard UI (so you see the reads in
OUR panel, not only Langfuse) is OBS-TRACE-3. This phase makes the data EXIST on
the spans; phase 3 surfaces it in-panel.

## 8 · DEPENDENCIES & SEQUENCING
- **Hard dependency on OBS-TRACE-1** (needs `setSpanIO` + the I/O scrub/cap
  helpers it introduces). Author the OBS-TRACE-2 phase prompt only after
  OBS-TRACE-1 merges; anchor it to that new master.
- Blocked behind F149 (master is red) → OBS-TRACE-1 → then this.
- FULL profile (touches `persistence/client.ts` — a load-bearing seam + a new
  secret surface). NON-negotiable: the secret deny-list test, full read
  (not FAST-GATE) of the wrapper + client diff, and the serverless flush check.
- Zero migrations · zero Operator · zero golden/prompt surface.
- PLATINUM: self-configuring — one wrap point traces all reads forever; no manual
  step, and NEW reps are traced automatically (the mandate holds by construction).

## 9 · OPEN QUESTION FOR THE PHASE PROMPT (decide at authoring time)
PostgREST builders are thenable but also chainable AFTER `.from()` (`.select().eq()…`).
The proxy must open the span at the TERMINAL await, not at `.from()` (which has no
filters yet), so the `op`/`filter_summary` are complete. Confirm the wrap point is
the builder's `.then`/`.throwOnError` resolution, capturing the fully-built
statement — prototype this against one real read (e.g. `RoutingCacheMetaRepository`)
before templating.

<!-- END · cwf-obs-trace-2-db-read-spans-design-v1 · rev 1 · 2026-07-20 -->
