# PHASE OBS-TRACE-1b — Exhaustive Span I/O + Completeness Guard
<!-- claude-code-PHASE-OBS-TRACE-1b-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Program: OBS-TRACE (1b — completes OBS-TRACE-1's G3, which targeted stage
     WRAPPERS but missed the inner cwf.warm.* children + stream/grounding/mcp/
     flush spans). Lane: AG-A. Design source: cwf-obs-trace-1(2/3) design notes +
     the owner's live-trace acceptance (trace fc1dc2f1…, 2026-07-21).
     ANCHOR: origin/master = 3ef02f83611527585e444f47c73bb9194606b174 (rev 122).
     PRECONDITION (S47-1): valid ONLY while origin/master == 3ef02f8 and no other
     obs-trace-1b branch exists. On mismatch: STOP and report.
     Ceremony: FULL profile (observability + turn spans). CI-green on PR head =
     merge precondition (S37-2). Zero migrations · zero Operator · zero golden/
     prompt surface. Client observability config unchanged.
     PLATINUM: self-configuring — no manual step; this CLOSES the owner-observed
     `undefined` gap AND installs a guard so it can never silently return.
     OWNER DIRECTIVE (verbatim intent): "bu trace'lerde boşluk KALMASIN" — every
     span that can carry I/O MUST, and a test must ENFORCE it going forward. -->

## §0 · THE MANDATE THIS PHASE ENFORCES
FULL-TRACE MANDATE (OBS-TRACE-1 §0): every stage / read / tool I/O visible in
Langfuse. OBS-TRACE-1 lit the stage WRAPPERS. This phase lights EVERY REMAINING
span AND adds a completeness guard so no future span escapes the mandate. The
guard is the load-bearing deliverable — hand-enumeration is how the first gap
happened (the Architect listed stage wrappers, missed the inner spans); the
guard removes reliance on anyone enumerating correctly ever again.

## §1 · PRE-FLIGHT GATE (hard)
```bash
cd <workspace> && git fetch origin && git rev-parse origin/master
# MUST equal 3ef02f83611527585e444f47c73bb9194606b174 — else STOP, report.
git checkout -b obs-trace-1b origin/master
```
TREE-VERIFY the OBS-TRACE-1 helper you build on:
```bash
grep -n "export function setSpanIO" api/cwf/_lib/observability/spans.ts
```
S32-1 commands from package.json: `npm test` (unsharded CI = sole arbiter) ·
`npm run typecheck:api` · `npm run build` · `npm run check:doc-drift` ·
`npm run reseal`. Push early.

## §2 · THE COMPLETE GAP MAP (Architect-verified on 3ef02f8 — close ALL)
Spans with NO I/O today, each `withSpan(SPAN_*, {}, fn)` — verified call sites:
1. `cwf.warm.provider` — stagesModel.ts:28
2. `cwf.warm.knowledge` — stagesModel.ts:100
3. `cwf.warm.prompt` — stagesModel.ts:109
4. `cwf.warm.params` — stagesModel.ts:135
5. `cwf.warm.trust` — stagesModel.ts:155
6. `cwf.stage.10.stream` (the stage) — chat.ts:244 / runStreamStage (stageStream.ts:32)
7. `cwf.stream.attempt` — stageStream.ts:57
8. `cwf.grounding` — stageStream.ts:269
9. `cwf.mcp.attempt` — mcpClient.ts:146
10. `cwf.mcp.discover` — mcpDiscovery.ts:64
11. `cwf.flush` — chat.ts:269
12. `cwf.replay.turn` — taskFn.ts:131 (replay path; include for completeness)
Already covered (DO NOT re-touch, verify unchanged): `cwf.turn`, the 9 stage
wrappers with setSpanIO, `cwf.mcp.tool`.

## §3 · GATED SUB-PHASES (in order)

### G1 — The completeness guard FIRST (test-driven: prove the gap, then close it)
Write the guard BEFORE the fixes so it goes RED on today's gaps, then GREEN as
you close them. Mechanism (mirrors the RULE-26 no-scroll-trap allowlist):
1. An integration test drives a representative turn (reuse the existing turn/
   pipeline test harness or a mock-tracer harness) with a TEST SPAN PROCESSOR
   that records EVERY span created and whether each got `OBSERVATION_INPUT` or
   `OBSERVATION_OUTPUT`.
2. Assert: every recorded span name is EITHER I/O-bearing (has input or output)
   OR listed in an explicit `SPANS_WITHOUT_IO_ALLOWLIST: ReadonlyArray<{ span:
   string; why: string }>` with a one-line justification. A span that is neither
   → test FAILS with the span name.
3. The allowlist starts EMPTY (or holds only spans with a genuine, defensible
   reason — e.g. a pure structural wrapper that truly has no meaningful I/O; if
   any exist, justify each in writing). The goal is: after this phase, the
   allowlist is minimal and every real span carries I/O.
4. This guard makes the mandate hold BY CONSTRUCTION: any future span added
   without I/O and without an allowlist entry fails CI. THIS is the "never make
   this mistake again" mechanism — it does not rely on anyone enumerating spans.
5. Also add: a static test that every `SPAN_*` constant in config.ts that names
   a turn-path span is exercised by the guard's representative turn OR explicitly
   marked non-turn (replay). No span-name constant is silently untested.

### G2 — Inner warm.* children (the owner-observed `undefined`s)
`withSpan(SPAN_*, {}, fn)` passes `span` to the callback where the fn takes it
(warm.prompt already does: `async (span) => …`). For the others, thread the span
in. Set scrubbed I/O via `setSpanIO`:
- **warm.provider:** output `{ warmedProviders: <ids/count the registry warmed> }`.
- **warm.knowledge:** output `{ kindsLoaded: <kind ids>, rowCountsByKind: <{kind:
  n}>, backends: ctx.activeBackends }` — derive from `ctx.knowledgeCapture`.
  (This SUMMARY complements OBS-TRACE-2's per-read db spans that will nest under
  it — summary here, row-level detail there.)
- **warm.prompt:** output `{ segmentsResolved: <count>, segmentIds: <ids>,
  promptRev: ctx.promptRev, degraded: ctx.promptDegraded }` — from `segResolution`.
- **warm.params:** output `{ params: <resolved values>, sources: ctx.paramSources }`
  — from `resolution` (params + sources). Scrub; params are non-secret governed
  values (temperature, historyWindowN, maxToolRounds…) — show them.
- **warm.trust:** output the same shape the warm-trust STAGE already emits
  (`authorityBackends`, `tierSummary`) so the child and stage agree — resolves
  the nested inconsistency the owner hit (stage populated, child empty).

### G3 — stream stage + stream.attempt (the answer path)
- **`cwf.stage.10.stream` (stage):** in runStreamStage, set output `{ toolLoop:
  <ordered called tool names>, rounds: <count>, finishReason, outputTokens,
  empty }` — the tool-loop call sequence + final result summary (the "which tools
  did the model actually call, in what order, and how did it end" chain).
- **`cwf.stream.attempt`:** input `{ attempt, offeredToolCount }`; output
  `{ decision, finishReason, empty, tier }` (promote the existing attributes into
  the Langfuse I/O panel too, scrubbed).

### G4 — grounding + mcp.attempt + mcp.discover + flush
- **`cwf.grounding`:** output `{ ok, violationCount, violationKinds }` (promote
  existing attrs to I/O). Empty≠zero: `violationCount: 0` is a real clean result,
  never rendered as "missing".
- **`cwf.mcp.attempt`:** input `{ tool, attempt, server }`; output `{ ok,
  ms, resultBytes }` (scrubbed — NOT the raw result; that's on cwf.mcp.tool).
- **`cwf.mcp.discover`:** output `{ discoveredToolCount, source, mirrorCount,
  liveCount }` (promote existing attrs).
- **`cwf.flush`:** output `{ tokenSummary: {input,output,total}, spansFlushed?:
  <count if available> }` — the turn's final token summary + flush status.

### G5 — replay.turn (completeness)
- **`cwf.replay.turn`:** input `{ runId, rep, sourceMessageId }`; output a short
  status summary. Keep the replay path's existing behavior byte-identical
  otherwise (C1 LAW: replay writes nothing to messages).

## §4 · BINDING CONSTRAINTS
- Reuse OBS-TRACE-1's `setSpanIO` + `scrubbedAttrValue` + `MCP_SPAN_RESULT_MAX_LEN`.
  Invent no second scrubber, no new cap constant.
- Scrub-then-cap (C4) on EVERY new I/O value. Params/category/tool names are
  non-secret governed values → shown; anything secret-shaped is scrubbed.
- Do NOT change: the 9 stage wrappers OBS-TRACE-1 already covered, the root span,
  `cwf.mcp.tool`'s existing I/O, any span's existing ATTRIBUTES (this phase is
  PURELY additive I/O + the guard), migrations, eval-gate, golden/prompt,
  grounding logic, `checkRoutingContainment`, stream decision logic.
- `setSpanIO` no-op-on-undefined-span contract must hold for every new call
  (observability off → no throw). The guard test runs with observability ON.
- CHANGELOG + `.agents/` skill-KB entry land ON the branch pre-merge. Reseal per
  S34-1 (touches mapped files → budget it).

## §5 · SELF-VERIFY CHECKLIST (evidence = literal outputs)
1. **G1 guard: paste the RED run first** (guard failing on today's 12 gaps
   BEFORE fixes) then the GREEN run (all closed). This proves the guard actually
   catches gaps — a guard that was green from the start is worthless.
2. The `SPANS_WITHOUT_IO_ALLOWLIST` final contents (ideally empty; every entry
   justified in one line if not).
3. `npm test` green UNSHARDED locally AND CI green on PR head (link).
4. Per-span evidence: for EACH of the 12 spans, the test asserting its I/O shape
   (name the test + the asserted keys). warm.knowledge rowCountsByKind, stream
   toolLoop order, grounding violationCount=0-is-real, flush tokenSummary
   explicitly covered.
5. Nested-consistency test: `cwf.warm.trust` child output == `cwf.stage.12.warm-trust`
   stage output shape (the owner-hit inconsistency is gone).
6. `npm run typecheck:api` + `npm run build` + `npm run check:doc-drift`.
7. Diff-scope sweep: `git diff --stat 3ef02f8..HEAD` — NO migrations/prompt/
   golden; paste the stat.

## §6 · MERGE (only after Architect GO)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge PHASE OBS-TRACE-1b: exhaustive span I/O — close all 12 remaining undefined spans (warm.provider/knowledge/prompt/params/trust, stream + stream.attempt, grounding, mcp.attempt/discover, flush, replay.turn) + completeness-guard test enforcing every span carries I/O or is explicitly allowlisted
```
Report: remote hash + CI link + §5 evidence (the RED→GREEN guard proof is the
key artifact). Architect FAST-GATE (S43-2) against `3ef02f8`; then the owner
verifies in Langfuse that clicking ANY span on a fresh trace shows real
Input/Output — no `undefined` anywhere. That is the acceptance: zero gaps.

<!-- END · claude-code-PHASE-OBS-TRACE-1b-v1 · rev 1 · 2026-07-20 -->
