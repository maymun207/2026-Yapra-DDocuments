# PHASE OBS-TRACE-2 — DB-Read Span Layer (client-proxy wrap)
<!-- claude-code-PHASE-OBS-TRACE-2-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (2 of 3). Lane: AG-B (after OBS-TRACE-1). Design source:
     cwf-obs-trace-2-db-read-spans-design-v1.
     ══ DEPENDENCY GATE (HARD) ══ Do NOT start until OBS-TRACE-1 is MERGED to
     master. This phase reuses OBS-TRACE-1's span-I/O helper (`setSpanIO` or
     whatever OBS-TRACE-1 actually named it) + its scrub/cap helpers — TREE-VERIFY
     the real exported symbol on the merged tree before building; do NOT assume
     the name from the design note.
     ANCHOR: = the OBS-TRACE-1 merge HEAD (FILL AT DISPATCH). The Architect sets
     this the moment OBS-TRACE-1 lands; until then the value below is a placeholder.
     PRECONDITION (S47-1): valid ONLY while origin/master == <OBS-TRACE-1-MERGE-HEAD>
     and no other obs-trace-2 branch exists. On mismatch: STOP and report.
     Ceremony: FULL profile (touches persistence/client.ts — a load-bearing seam +
     a NEW secret surface). CI-green on PR head = merge precondition (S37-2).
     Zero migrations · zero Operator · zero golden/prompt surface.
     PLATINUM: self-configuring — ONE wrap point traces all 144 reads AND every
     future read, by construction; no manual step, the mandate cannot leak. -->

## §0 · PRE-FLIGHT GATE (hard)
```bash
cd <workspace> && git fetch origin && git rev-parse origin/master
# MUST equal the OBS-TRACE-1 merge HEAD the Architect pinned — else STOP, report.
git checkout -b obs-trace-2 origin/master
```
Then TREE-VERIFY the OBS-TRACE-1 deliverables you depend on and record their real
names in your report:
```bash
grep -rn "setSpanIO\|OBSERVATION_INPUT\|scrubbedAttrValue\|MCP_SPAN_RESULT_MAX_LEN" api/cwf/_lib/observability/ | head
```
S32-1 commands (grep-verify from package.json on the anchor): `npm test`
(unsharded CI = sole arbiter, S37-2) · `npm run typecheck:api` · `npm run build`
· `npm run check:doc-drift` · `npm run reseal`. Push early.

## §1 · ARCHITECT DIAGNOSIS — TREE-PROVEN (build on these)
Verified on dca514c (re-confirm on the merged anchor):
- **Single chokepoint:** `api/cwf/_lib/persistence/client.ts:48` `getServiceClient()`
  is the ONE Supabase client factory ("no other createClient call anywhere in
  api/"). Every repo takes `constructor(client = getServiceClient())` and issues
  all `.from()` reads through that memoized `SupabaseClient`. 31 repos, 144
  `.from()` reads, ZERO spans in the layer today.
- **Secret tables are enum-named (drift-proof deny-list):** the three secret-
  bearing repos read via `DB_TABLES` constants — `LLM_PROVIDER_SECRETS`
  (LlmProviderSecretsRepository), `MCP_SECRETS` (McpSecretsRepository),
  `LLM_PROVIDERS_PERSONAL` (LlmProvidersPersonalRepository). The deny-list derives
  from these `DB_TABLES` members, NOT hardcoded strings.
- **Decision (design note §3): WRAP the client, do NOT weave 144 call sites.** A
  span-emitting proxy over the `SupabaseClient` returned by `getServiceClient()`
  intercepts `.from(table)` → proxied query builder whose terminal await opens a
  `cwf.db.read` span. Traced by construction; new reps traced automatically. The
  144-site weave was rejected (drift + mandate leaks by default).

## §2 · GATED SUB-PHASES (in order; gate = tests green before next)

### G1 — Prototype the proxy against ONE real read (de-risk the mechanics first)
1. PostgREST builders are thenable AND chainable after `.from()`
   (`.select().eq()…`). The span must open at the TERMINAL resolution (so `op` +
   filter summary are complete), NOT at `.from()`. Prototype the wrap against ONE
   real read — `RoutingCacheMetaRepository` is the recommended specimen — proving
   you can intercept `.from`, capture the built statement (table + method chain →
   op), await the real result, and read `data`/`error`/row count at resolution.
2. Wrap point: intercept the builder's `.then` (and/or `.throwOnError`) so the
   real Supabase behavior is byte-identical to callers — the proxy is transparent
   except for the span. Prove a wrapped read returns EXACTLY what an unwrapped one
   does (a test comparing wrapped vs raw result for one query).

### G2 — Make the wrap idempotent + memoization-safe
1. `getServiceClient()` must return the SAME wrapped instance on repeat calls
   (preserve the existing `cached` memoization + `__resetServiceClientForTests`).
   Mark the proxied client so a re-wrap is a no-op (never double-instrument).
2. Degrade: when `getServiceClient()` returns `null` (DB disabled), no wrap, no
   throw — the existing null path is byte-identical. Test both: null path
   untouched, wrapped path idempotent across two `getServiceClient()` calls.

### G3 — The `cwf.db.read` span payload (honest, scrubbed, never dark)
Reuse OBS-TRACE-1's I/O helper + `scrubbedAttrValue` + cap
(`MCP_SPAN_RESULT_MAX_LEN`). Define span name `cwf.db.read` in
`observability/config.ts` beside the existing constants.
- **Attributes:** `cwf.db.table`, `cwf.db.op` (select/insert/update/upsert/delete,
  inferred from the chain), `cwf.db.filter_summary` (column names + a redacted
  marker for values — NOT raw predicate values), `cwf.db.row_count`
  (**`0` = real datum; `null`/absent = read failed/unknown — empty≠zero at the
  trace layer**), `cwf.db.latency_ms`, `cwf.db.ok` (on error: PostgREST error
  CODE + message NAME only, NEVER the raw error payload — it can carry
  credentials per the TelemetryRepository redaction contract).
- **OBSERVATION_INPUT:** `{ table, op, filterSummary }`.
- **OBSERVATION_OUTPUT:** `{ rowCount, isEmpty: rowCount === 0, sampleHead:
  <first row, scrubbed + capped> }`.
- **Nesting:** children of the active stage span (register-tools, warm-*, stream)
  — so Langfuse reads `stage → reads it caused → rows`.

### G4 — Secret-table deny-list (the load-bearing safety boundary)
1. Build `SECRET_READ_TABLES` from the `DB_TABLES` members above
   (`LLM_PROVIDER_SECRETS`, `MCP_SECRETS`, `LLM_PROVIDERS_PERSONAL`) — derive from
   the enum, never hardcode strings.
2. For a read whose table ∈ deny-list: the span carries `cwf.db.table`,
   `cwf.db.op`, `row_count`, `ok` — but **NO `sampleHead`** and a fully-redacted
   `filter_summary` (column names only, or a `[redacted]` marker). NEVER emit row
   contents for these tables.
3. **Hard test (verifyGrants-class rigor):** a read against a deny-list table
   emits NO key/token material on its span — assert `sampleHead` absent and no
   secret-shaped value in any attribute. This is a security gate, not a nicety.
4. Do NOT rely on the generic pattern-scrubber alone for these tables — the
   deny-list is a SECOND, explicit boundary.

### G5 — Serverless flush volume guard
A read-heavy turn may emit 30-50 `cwf.db.read` spans. Confirm the existing
force-flush (F-obs, chat.ts) still completes before response end and span volume
stays bounded. If volume is a real problem, the approved fallback is a per-turn
read AGGREGATE span (`table → read count + total rows`) INSTEAD of per-read — but
start per-read (richer) and MEASURE on a representative heavy turn; only fall back
with evidence. Report the observed span count on a heavy turn.

## §3 · BINDING CONSTRAINTS
- Touch: `persistence/client.ts` (the wrap), `observability/config.ts` (span
  name), and the wrap/helper modules. Do NOT edit the 144 call sites or the repos
  themselves (the whole point is zero per-site change).
- The wrapped client must be behaviorally transparent — no change to query
  results, error propagation, or the `Repository` interface.
- Scrub-then-cap order (C4) on every I/O value; reuse `scrubbedAttrValue` +
  `MCP_SPAN_RESULT_MAX_LEN`; invent no second scrubber.
- Confirm the knowledge-layer reads (`DbKnowledgeProvider`) ALSO go through
  `getServiceClient()` (they should — the single-createClient invariant). If ANY
  knowledge read bypasses it, that bypass is a FINDING — report it (do not
  silently work around).
- Zero migrations · zero Operator · zero golden/prompt surface.
- CHANGELOG + `.agents/` skill-KB entry land ON the branch pre-merge. Reseal per
  S34-1 if a mapped file changed (client.ts IS mapped → budget a reseal; second-
  merger rule if another phase is concurrent).

## §4 · SELF-VERIFY CHECKLIST (evidence = literal outputs)
1. `npm test` green UNSHARDED locally AND CI green on PR head (link).
2. G1: the wrapped-vs-raw result-parity test name + the specimen read used.
3. G2: idempotent-wrap test + null-path-untouched test names.
4. G3: a test asserting a normal read's span carries table/op/rowCount + a
   scrubbed sampleHead; and that `rowCount: 0` renders as a real 0 (empty≠zero).
5. G4: the deny-list secret test (no key material on a secrets-table read) —
   paste the asserted absence.
6. G5: observed `cwf.db.read` span count on a representative heavy turn +
   confirmation the flush still completes.
7. `npm run typecheck:api` + `npm run build` + `npm run check:doc-drift`.
8. Diff-scope sweep: `git diff --stat <anchor>..HEAD` — NO edits to the 144 call
   sites, NO migrations/prompt/golden; paste the stat.
9. The tree-verified names of the OBS-TRACE-1 symbols you reused (from §0).

## §5 · MERGE (only after Architect GO)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge PHASE OBS-TRACE-2: DB-read span layer — cwf.db.read spans over the single getServiceClient proxy (all 144 reads traced by construction) + secret-table deny-list boundary + serverless flush guard
```
Report: remote hash + CI link + §4 evidence. Architect FULL review (NOT
FAST-GATE — client.ts seam + new secret surface: full read of the wrap + the
deny-list test is non-negotiable). Then OBS-TRACE-3 (the StagesDashboard
reflection) anchors to this merge HEAD.

<!-- END · claude-code-PHASE-OBS-TRACE-2-v1 · rev 1 · 2026-07-20 -->
