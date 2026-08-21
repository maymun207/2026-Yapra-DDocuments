# PHASE F-OBS2 — Turn Pipeline + Manual Spans + One Joinable Identity
**claude-code-PHASE-F-OBS2-turn-pipeline-manual-spans-identity-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `6b2071b` (639/639 tests, docVersion rev 23, F-obs1 + PROBE-OBS landed)
**Author lane:** Claude Code (AntiGravity). All writes happen here.

---

## 0. WHY (three jobs, deliberately ONE phase)

1. **GAP-3 (god-orchestrator):** `chat.ts` is 1,050+ lines; auth → MCP resolve → tools → prompt → stream/retry → grounding → persistence → flush all live in one handler, and every phase accretes there. The SOTA shape is an explicit **turn pipeline**: ordered stage functions over a shared `TurnContext`.
2. **Manual spans:** the AI SDK gives GENERATION/tool spans for free; the causal tree still lacks OUR stages — MCP discovery/execution, knowledge/trust/provider warms, persistence flush.
3. **Identity unification:** production data (probe trace `23193ef9…`) showed THREE uncorrelated per-turn ids side by side: the OTel trace id (which Vercel's own request log already surfaces as `trace=`), the internal 8-char log `traceId` (`chat.ts:392`-era), and `telemetry_events.session_id` (a second `randomUUID`). After this phase there is ONE turn identity: **the OTel trace id is the SSOT**; the log id derives from it; the telemetry ledger stores it.

These are one phase because instrumenting stages requires NAMING the stages — extract once, instrument once. Doing them separately would mean touching the same 700 lines twice.

**This is the largest refactor since SEED. The counterweight is discipline, not caution-paralysis: move-only extraction, two separate code commits, and behavior-equivalence evidence at every gate.**

## 1. HARD PRE-FLIGHT GATE

```bash
git fetch origin && git rev-parse origin/master        # MUST be 6b2071b...
git status --porcelain                                  # empty (stash-protect operator-local files as before if present)
npx vitest run 2>&1 | tail -3                           # 639 passed (639)
docker compose -f infra/langfuse/docker-compose.yml ps  # 6/6 up (needed for §3.4 evidence)
```
Branch: `git checkout -b feat-fobs2-pipeline-spans-identity`.

## 2. HARD CONSTRAINTS

- **C1 — Behavior-preserving extraction (the phase lives or dies here).** The SSE event stream a client sees — event types, payload shapes, ordering, the `done` contract, error/`give-up` texts — is byte-shape-identical. OBS-2/OBS-3 semantics (completionGuard calls, retry decisions, `[LLMRetry]`/`[LLMFinish]` logs, emit payloads) are moved **verbatim**, never reworded. Grounding Mode A stays advisory/post-stream; FLOOR/empty≠zero paths untouched.
- **C2 — Move-only discipline + honesty ledger.** For every extracted stage, the report declares `verbatim-moved` or `adapted (reason)`. Logic changes are forbidden except the sanctioned identity changes in §3.3. "I improved it while I was there" = phase rejected.
- **C3 — Two code commits.** Commit A = pipeline extraction, ZERO observability changes (identical spans to F-obs1). Commit B = manual spans + identity. Each independently green (full build gate + tests). Then the doc-seal commit. Merge `--no-ff` (house pattern — squash is banned; it orphans manifest sync commits).
- **C4 — Floor discipline (RULE 27) extends to every new span.** Observability disabled ⇒ every manual-span helper is a hard no-op; the pipeline runs identically. No stage may fail because tracing failed.
- **C5 — Identity floor.** With observability disabled there is no OTel trace id: the turn id falls back to `randomUUID()` and EVERYTHING derives from that instead (log prefix = its first 8 hex chars, `telemetry_events.session_id` = it). One code path, one derivation function — not two branches scattered around.
- **C6 — Ledger/trace separation holds.** `telemetry_events` stays a redacted governance ledger. The ONLY change to it is the VALUE of `session_id` (now the turn id). No new columns, no payload changes, no schema migration.
- **C7 — Tool-span payload restraint (sequencing, name it in code).** Manual MCP spans carry: tool name, backend id, attempt number, duration, scrubbed input args, and result META (`total/returned/truncated/isError`) — NOT the raw result payload. Full I/O on tool spans waits for the hardened scrubber (F-obs3). The AI SDK's own spans already carry prompt/completion I/O through the existing scrub boundary.
- **C8 — Scrubber untouched.** The known `/token(?!s)/i` camelCase over-match (`…TokenDetails…` keys) is F-obs3 scope. Do not fix it here, do not work around it.
- **C9 — Secrets/env discipline unchanged; RULE 1** (stage names, span names, attribute keys as constants in `observability/config.ts` or a sibling).

## 3. GATED SUB-PHASES

### 3.1 — Pipeline extraction design note (30 lines max, BEFORE code)
Write `docs/turn-pipeline.md`: the stage list (name → responsibility → what it reads/writes on `TurnContext`), derived from the section comments already in `chat.ts` (auth · conversation identity · MCP resolve · active backends · telemetry init · lab overlay · persistence init · provider resolve · tool registration · prompt assembly · trust warm · stream(retry/grounding/scope-append/persist) · flush). Streaming reality check: the stream stage is necessarily special (it owns `res` writes and the retry loop) — the pipeline does NOT force it into a uniform pure-stage mold; it becomes a stage with an honestly-documented wider contract.
**Gate:** the note exists; stage list sanity-checked against the actual file.

### 3.2 — Commit A: extraction (zero observability delta)
1. Create `api/cwf/_lib/turn/` — `TurnContext` type + one module per stage (or tightly grouped stages; keep files < ~250 lines). `chat.ts` shrinks to: HTTP concerns (method/auth guard entry, SSE header, heartbeat), pipeline invocation, top-level error closure. Target: `chat.ts` well under 400 lines.
2. Logic moves verbatim (C2). The existing 8-char `traceId` and `sessionId` behavior is UNCHANGED in commit A.
3. Existing tests must pass UNMODIFIED except pure import-path updates (list every test file whose imports changed; any assertion change = explain or abort).
4. Add stage-level tests where extraction created a newly testable seam (at minimum: pipeline runs stages in declared order; a stage throw reaches the existing top-level error closure unchanged).
**Gate:** full build + all tests green on commit A alone; `wc -l api/cwf/chat.ts` reported; the verbatim/adapted ledger for every stage.

### 3.3 — Commit B: manual spans + one identity
1. **Turn root span:** the pipeline opens one root span per turn (name from config, e.g. `cwf.turn`); every stage runs inside a child span (`cwf.stage.<name>`) via a tiny helper (`withStageSpan(name, fn)`) that is a no-op pass-through when disabled (C4).
2. **MCP spans:** wrap the tool-execution path (`chat.ts`'s "MCP Tool Execution" helper, wherever it lands) — one span per attempt with the C7 attribute set. MCP **discovery** per backend gets a span too (the prod ARMES 401 would have been a red span on a tree, not a grep-find).
3. **Warm/flush spans:** `dbKnowledgeProvider.warm`, trust-registry warm, provider-registry warm, and the final persistence/telemetry flush each get a span (wrap at call site in the stage — do NOT thread tracing into the repositories/providers themselves).
4. **Identity unification (the sanctioned logic change):**
   - One function, e.g. `turnIdentity()`: returns the active OTel trace id when observability is enabled, else `randomUUID()` (C5). Called ONCE per turn, stored on `TurnContext`.
   - The log prefix becomes the first 8 hex chars of that id — `[trace=xxxxxxxx]` format preserved so existing Vercel-log grep habits keep working.
   - `telemetry_events.session_id` ← the full turn id (C6).
   - **Langfuse session/user binding:** the trace carries `conversationId` as the Langfuse session id and the Supabase `userId` as the Langfuse user id (via `@langfuse/otel`'s trace-attribute mechanism / `experimental_telemetry` metadata — consult the installed package's docs; the required OUTCOME is: in the Langfuse UI, traces are filterable by session = conversation and by user). Session ≠ turn: session groups a conversation's turns; the trace IS the turn.
5. Tests: `turnIdentity()` both modes + derivation stability; disabled-mode no-op for `withStageSpan`; telemetry emit uses the turn id (assert `session_id` equals it); MCP span helper records attempt/meta attributes (mock exporter or in-memory processor).
**Gate:** full build + all tests green (≥ 639 + Commit A + Commit B additions, report the number).

### 3.4 — Live verification (local, Langfuse stack up)
One real dev turn with ≥1 tool call. Evidence:
1. Langfuse UI: the turn's tree shows root `cwf.turn` → stage spans in order → MCP/warm spans nested where they belong → the AI SDK GENERATION span(s) inside the stream stage. Report trace id + span count + tree screenshot if possible.
2. **The identity proof (the phase's headline evidence):** for that SAME turn — (a) Langfuse trace id `X`; (b) the server log line shows `[trace=` + first-8-of-`X` `]`; (c) the `telemetry_events` row(s) for the turn have `session_id = X`. Three systems, one id.
3. Session/user binding visible: the trace lists session = the conversationId and user = the userId in the UI.
4. Negative check: `OBSERVABILITY_DISABLED=1` → turn works, logs still show a `[trace=xxxxxxxx]` prefix (fallback id), `telemetry_events.session_id` populated (fallback id), zero traces exported.
**Gate:** all four evidenced. Trace-in-UI, never build-green (RULE 27).

### 3.5 — Living-doc seal (separate commit)
Re-sync: **Runtime Topology** (chat.ts → pipeline decomposition — this one is REDRAWN, the altitude changed), **Request Lifecycle** (stage names now real code seams), **Agent Control Plane** (Observe cell: F-obs2 landed — manual spans + identity; Inspect's 14-stage slot maps to the stage list), **Architecture Map** (new `_lib/turn/` area + codeAreas updates so the drift guard watches it). Manifest → **rev 24** with a reviewNote naming redrawn-vs-resealed. Update `docs/turn-pipeline.md` if the landed stage list drifted from §3.1. AGENTS.md: extend RULE 27 (or add RULE 28) with the identity invariant: *one turn id, OTel-SSOT with random fallback, derived log prefix, ledger session_id — never mint a parallel per-turn id again.*
**Gate:** `check:doc-drift` clean, all tabs synced.

### 3.6 — Merge + push (RULE 25)
`--no-ff` merge (commits A + B + seal), branch deleted, push, report `git rev-parse origin/master`.

## 4. SELF-VERIFICATION CHECKLIST (evidence per line)
- [ ] Pre-flight: HEAD `6b2071b`, 639/639 baseline, stack 6/6
- [ ] `docs/turn-pipeline.md` + stage list vs code sanity
- [ ] Commit A hash · full gate green · tests green with unmodified assertions (import-only changes listed) · `wc -l chat.ts` · verbatim/adapted ledger
- [ ] Commit B hash · full gate green · total test count
- [ ] Span helpers hard-no-op when disabled (test evidence)
- [ ] C7 attribute set on MCP spans (no raw result payloads) — show one span's attributes
- [ ] Live tree evidence: root → stages → MCP/warm → GENERATION
- [ ] **Identity proof: same id across Langfuse UI + log prefix + telemetry_events row**
- [ ] Session=conversationId, user=userId visible in UI
- [ ] Negative check: disabled mode fully functional with fallback id, zero exports
- [ ] Doc seal: redrawn/resealed named, manifest rev 24, drift clean, RULE 27/28 identity invariant added
- [ ] `--no-ff` merged, pushed, remote hash reported

## 5. NON-GOALS
No scrubber changes (C8 — F-obs3), no full tool I/O on spans (F-obs3), no OBS-3.1/perturbed retry, no replay/dataset work, no AWS host, no `telemetry_events` schema change, no grounding/eval-gate/trust logic changes, no provider changes. If extraction uncovers a live bug in moved logic: report it as a finding, move it verbatim anyway (bug and all), fix in a later dedicated phase — behavior-preservation outranks correctness THIS phase.
