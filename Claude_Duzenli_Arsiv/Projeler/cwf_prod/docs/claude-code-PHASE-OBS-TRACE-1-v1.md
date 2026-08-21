# PHASE OBS-TRACE-1 — Per-Stage Langfuse I/O + Routing Chain (F148)
<!-- claude-code-PHASE-OBS-TRACE-1-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (1 of 3). This is phase 1 — the span I/O backbone +
     the routing decision chain on the register-tools span. Lane: AG-B.
     Anchor: origin/master = e1218bad98615a7c0ff5c978908756971d52771f
     PARALLEL with BATCH-W-1 (AG-A). S47-1 preconditions + reseal pre-assignment
     are MANDATORY (both phases touch mapped files → doc-drift manifest collides).
     Ceremony: FULL profile (api/cwf/_lib/observability + turn touch).
     CI-green on PR head = merge precondition (S37-2). Zero migrations · zero
     Operator · zero golden exposure (no prompt.segment). Client observability
     config unchanged (OBSERVATION spans already flow to Langfuse).
     PLATINUM compliance: self-configuring — no manual owner step; this phase
     REMOVES the dark-read blindness that forces manual guesswork. -->

## §0 · GOVERNING LAW (owner-legislated, this session — carry to register v57)
**FULL-TRACE MANDATE:** Every pipeline stage, every DB/table read, every tool
call — its INPUT and OUTPUT must be visible in BOTH Langfuse and the
StagesDashboard. No read stays dark. "We can only improve what we can trace."
Sits above other work. The ONLY thing scrubbed is raw secrets/tokens (the
existing `scrubbedAttrValue` boundary) — category names, tool names, extracted
keywords, row counts, DB result shapes are ALL visible.
This phase delivers the FIRST slice: per-stage span I/O + the routing chain.
(OBS-TRACE-2 = the 144-site DB-read span layer; OBS-TRACE-3 = StagesDashboard
reflection. Both follow; do NOT attempt them here.)

## §1 · PRE-FLIGHT GATE (hard)
```bash
cd <workspace> && git fetch origin && git rev-parse origin/master
# MUST print e1218bad98615a7c0ff5c978908756971d52771f — else STOP, report.
git worktree add ../cwf-obs-trace-1 origin/master   # separate worktree — AG-A holds batch-w-1
cd ../cwf-obs-trace-1 && git checkout -b obs-trace-1 origin/master
```
S32-1 discipline (grep pre-flight commands from `package.json` — verified on
anchor): `npm test` (unsharded CI is the sole arbiter, S37-2) ·
`npm run typecheck:api` · `npm run build` · `npm run check:doc-drift` ·
`npm run reseal`. Push early.

**S47-1 reseal pre-assignment (BINDING):** BATCH-W-1 (AG-A) and this phase both
touch mapped TypeScript → both will want to reseal the doc-drift manifest to the
same rev. **Whichever phase merges SECOND rebases onto the merged master and
re-runs `npm run reseal` on the MERGED tree, resealing to rev N+1 in its own
merge commit.** State this in your PR description so the second-merger knows.

## §2 · ARCHITECT DIAGNOSIS — TREE-PROVEN (build on these facts)
Verified on the anchor clone:
- `withSpan` (`observability/spans.ts:20`) takes ONLY `attributes` — it never
  sets Langfuse I/O. So every manual stage span shows `Input/Output: undefined`
  in the Langfuse UI (owner-confirmed screenshot on `cwf.stage.07.register-tools`).
- The ONLY spans with real I/O today are the `cwf.turn` ROOT
  (`TRACE_INPUT`/`TRACE_OUTPUT`, chat.ts:151/257) and the AI SDK's own
  `ai.streamText` generation span. Everything between is I/O-blind.
- The routing chain is INVISIBLE: `resolveToolCategories` logs
  `matched=[...]` to console and stamps `ATTR_ROUTE_MATCHED_COUNT` (a COUNT)
  on the span — but never the matched category NAMES, never the extracted
  KEYWORDS, never the DROPPED category names, never the offered TOOL NAMES.
  `ctx.offeredToolNames` (a Set built at `stageTools.ts:272`) reaches NO span.
- **F148 (owner-approved):** the armor computes dropped names implicitly
  (`inCatalog = matched.filter(catalog.has)`, `semanticRouter.ts:261`) but only
  the COUNT (`dropped`) survives. The dropped NAMES are discarded.

**Verified API:** `LangfuseOtelSpanAttributes.OBSERVATION_INPUT` /
`OBSERVATION_OUTPUT` (= `langfuse.observation.input`/`…output`) are real enum
members in `@langfuse/core` (already the source for the TRACE_* keys used in
chat.ts). Setting them on a manual span populates the Langfuse `Input`/`Output`
panel for THAT span — the exact fix for the `undefined` fields.

## §3 · GATED SUB-PHASES (in order; each gate = tests green before next)

### G1 — Give `withSpan` an I/O channel (the backbone)
1. Extend `withSpan` with an optional structured I/O capture. Preferred shape:
   the span callback can set input/output via the passed `span` using a small
   named helper — add `export function setSpanIO(span, { input?, output? })`
   in `observability/spans.ts` that stamps
   `OBSERVATION_INPUT`/`OBSERVATION_OUTPUT` via `scrubbedAttrValue` (SAME
   scrub+cap discipline as the root's TRACE_* — scrub THEN cap, C4 order).
   Cap constant: reuse `MCP_SPAN_RESULT_MAX_LEN` (already the root's cap).
2. `setSpanIO` is a HARD no-op when `span` is undefined (observability off) —
   RULE 27 floor, never throws. Add a unit test proving the no-op path.
3. This must NOT change any existing span's attributes or the root's I/O.

### G2 — The routing chain on the register-tools span (the headline)
On the `cwf.stage.07.register-tools` span (and the `resolveToolCategories`
call site — thread the span in as needed, mirroring how `chat.ts` threads
`rootSpan`):
1. **INPUT** (`OBSERVATION_INPUT`, scrubbed JSON): `{ query: <scrubbed user
   message>, extractedKeywords: <extractKeywords(userMessage)>, ctxTurns,
   catalogCategories: <the 12 category names offered to the router> }`.
2. **OUTPUT** (`OBSERVATION_OUTPUT`, scrubbed JSON): `{ path, floorReason?,
   matchedCategories: <NAMES not count>, droppedCategories: <F148 — the NAMES
   the armor filtered out>, stickyAdded, offeredToolNames: <the full Set as an
   array>, offeredCount, gatewayCount, canonicalOeePresent }`.
3. **F148 plumbing:** `routeSemantica`/the armor must RETURN the dropped names
   (today it returns only `dropped: number`). Add `droppedNames: string[]` to
   the result type; compute it as `matched.filter(m => !catalogNames.has(m))`
   at the existing filter site (`semanticRouter.ts:261`). Also stamp a span
   attribute `cwf.route.dropped_names` (array) alongside the existing
   `dropped` count — parity with the frame's `enum_drop_*` attrs. Keyword/floor
   path: `droppedNames = []` (no router claim to drop), `offeredToolNames` still
   populated from the keyword-matched set.
4. Tool NAMES are catalog/tool-vocabulary strings — NOT user data. They are
   NOT scrubbed away (scrubber only removes secret patterns). Confirm in a test
   that a normal category/tool name survives the scrub intact.

### G3 — I/O on the remaining pre-stream stages
Apply `setSpanIO` to each manual stage span with a MEANINGFUL, scrubbed summary
(input = what the stage consumed, output = what it produced). Minimum set:
- `resolve-mcp`: out = `{ discoveredToolCount, backends, source: 'mirror'|'live-fallback' }`.
- `resolve-backends`: out = `{ activeBackends, defaultBackend }`.
- `resolve-provider`: out = `{ provider, bypass }`.
- `assemble-prompt`: out = `{ promptCoreRev, packBackends, toolCount }` (NOT the
  full prompt text — that is OBS-TRACE-2/ADR-004 territory; a structural summary
  here).
- `warm-trust`: out = `{ authorityBackends, tierSummary }`.
- `warm-knowledge` (if it owns a span): out = `{ kindsLoaded, rowCounts-by-kind }`.
- `telemetry-init` / `lab-overlay` / `persistence-init`: out = a short status
  summary (`{ sessionId, labActive, persisted }` — no message text).
Every value scrubbed. Where a stage genuinely has no useful I/O, set a one-line
status output rather than leaving it `undefined` — the mandate is NO dark stage.

### G4 — MCP tool span: promote args/result to Langfuse I/O
The `cwf.mcp.tool` span already carries `ATTR_TOOL_ARGS` (scrubbed) as a plain
attribute. ADD `OBSERVATION_INPUT` = scrubbed args and `OBSERVATION_OUTPUT` =
scrubbed result summary (bytes + isEmpty + a capped scrubbed head, reusing the
`summarizeRaw`-style shape) so the tool call's I/O shows in the Langfuse
Input/Output panel, not just buried in metadata. Keep the existing attributes
(don't remove — additive).

## §4 · BINDING CONSTRAINTS
- Zero changes to: the scrubber's REMOVAL rules, migrations, eval-gate,
  golden surfaces, prompt segments, the root span's existing TRACE_* stamps,
  `checkRoutingContainment`. Everything here is ADDITIVE span enrichment.
- Scrub-then-cap order (C4) on every new I/O value — never split a secret across
  the cap. Reuse `scrubbedAttrValue` + `MCP_SPAN_RESULT_MAX_LEN`; do not invent
  a second scrubber.
- Span events/status still carry NAME-only (recordSpanError unchanged) — this
  phase does not touch that restraint.
- `adminLegibility.test.ts` auto-gens 2 tests per admin `.tsx` — irrelevant here
  (no new admin tsx), but do not perturb it.
- CHANGELOG + `.agents/` skill-KB entries land ON the branch pre-merge.
- Reseal per S34-1; honor the §1 S47-1 second-merger reseal rule.

## §5 · SELF-VERIFY CHECKLIST (evidence = literal, paste outputs)
1. `npm test` green UNSHARDED locally AND CI green on the PR head (link).
2. G1: the `setSpanIO` no-op test name (observability off → no throw, no attr).
3. G2: a test asserting the register-tools span's OBSERVATION_OUTPUT contains
   matched NAMES + dropped NAMES (F148) + offeredToolNames array — NOT just
   counts. Paste the test's asserted shape.
4. F148: a test where the router returns an out-of-catalog name → `droppedNames`
   carries that name AND `cwf.route.dropped_names` attr is set; count still
   matches `droppedNames.length`.
5. Scrub-survives test: a normal tool/category name passes through
   `scrubbedAttrValue` unchanged (proves we didn't over-scrub the chain).
6. G3: list the stages you stamped and paste one stage's OBSERVATION_OUTPUT test.
7. `npm run typecheck:api` + `npm run build` + `npm run check:doc-drift` green.
8. Diff-scope sweep: `git diff --stat e1218ba..HEAD` — NO files under
   `supabase/migrations/`, prompt segments, or golden surfaces; paste the stat.
9. If BATCH-W-1 merged first: confirm you rebased + resealed to rev N+1 (S47-1).

## §6 · MERGE (only after Architect GO)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge PHASE OBS-TRACE-1: per-stage Langfuse I/O backbone + routing chain (query→keywords→matched/dropped category names→offered tool names) + F148 dropped-name capture + MCP tool I/O promotion
```
Report: remote hash + CI link + §5 evidence. Architect FAST-GATE review
(S43-2) against anchor `e1218ba`; then owner verifies in Langfuse that the
register-tools span now shows the full chain (the acceptance criterion).

<!-- END · claude-code-PHASE-OBS-TRACE-1-v1 · rev 1 · 2026-07-20 -->
