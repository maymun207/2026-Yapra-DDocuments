# PHASE REPLAY-B — Empty-Completion Replay Engine + Deterministic Scorers + Panel Activation
**claude-code-PHASE-REPLAY-B-empty-experiment-engine-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `7eb59ce` (681/681 tests, docVersion rev 25)
**Author lane:** Claude Code (AntiGravity).

---

## 0. WHY

The empty saga is contained, not solved: ~14% input-correlated empties, identical retry proven insufficient in prod, OBS-3.1 (perturbed retry) deliberately blocked on DATA. This phase builds the instrument that produces that data — the two BUILD pieces blueprint v2.1 assigned us (everything else is bought): **the domain task-function** (re-run a recorded turn with recorded tool stubs) and **the deterministic scorer** (empty/recovery measurement). Inputs come from `messages.content` + `messages.raw_tool_results` — UNREDACTED conversation truth, NEVER redacted telemetry. Buildable now, pre-AWS: the engine is repo code; Langfuse is only a beneficiary (replay traces land there tagged), not a dependency.

Payoff on day one: today's prod turns (the OEE turn with full `raw_tool_results`) are already replayable, and any recorded OBS-3-era high-empty turn becomes the lab's first specimen.

## 1. HARD PRE-FLIGHT GATE
```bash
git fetch origin && git rev-parse origin/master        # MUST be 7eb59ce...
git status --porcelain                                  # empty (stash-protect operator-local files if present)
npx vitest run 2>&1 | tail -3                           # 681 passed (681)
docker compose -f infra/langfuse/docker-compose.yml ps  # 6/6 up (for the tagged-trace evidence)
```
Branch: `feat-replay-b-empty-experiment`.

## 2. HARD CONSTRAINTS
- **C1 — Replay is a READ-ONLY guest in the production data model.** A replay run writes NOTHING to `conversations`/`messages` (reuse the existing `persistEnabled=false` path) and emits NOTHING to `telemetry_events` (the governance ledger must not be polluted by synthetic turns — ADR-004 discipline). The ONLY writes: the audit row for the run itself (C4) and OTel spans (tagged, C6).
- **C2 — Determinism boundary.** Stub matching, scorers, and aggregation are pure deterministic code, unit-testable, zero LLM-judging (the runtime LLM-judge ban extends here; the LLM being MEASURED is the only nondeterminism, and it is quarantined inside the task-fn).
- **C3 — Fidelity over convenience.** ALL tool calls during replay are answered from the recording — including local deterministic tools like `resolve_time_range` (its output depends on the wall clock; replaying it live would silently shift time ranges). Stub matcher keys on tool name + canonicalized-args hash. Miss policy is explicit config: `strict` (fail the rep with a named error) | `honest-empty` (return the empty-result shape, rep continues, miss counted). Default `strict`.
- **C4 — Capability-gated + audited.** New `PERMISSIONS.REPLAY_RUN` (super_admin), enforced with the exact `ensurePermission` pattern from `api/admin/telemetry.ts`; every run audit-logged (who, source messageId, reps, outcome digest) — audit-or-alarm.
- **C5 — Cost is bounded by config (RULE 1):** `REPLAY_MAX_REPS` (default 10, hard ceiling 25) + per-run token budget guard that aborts remaining reps if cumulative input+output tokens exceed `REPLAY_TOKEN_BUDGET`. Both in a replay config module.
- **C6 — Replay traffic is distinguishable, never mixed.** Every replay rep runs through the normal `streamChat` gateway (single-gateway rule holds) with the OTel trace tagged `cwf.replay=true` + `cwf.replay.run_id` + `cwf.replay.rep`, so Langfuse can filter it in or out. Observability-down = replay still works (RULE 27 floor).
- **C7 — Measure RAW attempts.** The OBS-3 bounded-retry loop is DISABLED inside replay (retry masks exactly the signal we are measuring). Each rep = ONE provider attempt; recovery statistics are computed by the scorer over reps, not by in-loop retries. Provider/model/temperature default to the recorded turn's values, overridable per run.
- **C8 — Scorer honesty.** Two scorers, named for what they actually measure: (a) `emptyCompletionScorer` — MUST reuse the production `isEmptyCompletion` predicate (import it; re-implementation = drift = rejected); (b) `floorPhraseScorer` — deterministic containment check of the configured OBS-2/floor strings from `chatSurface` params against the reply, reported as advisory (`floor_phrase_present` boolean), explicitly NOT a semantic-correctness judgment. No scorer invents semantics.
- **C9 — Privacy posture.** Unredacted content stays server-side; the admin API returns per-rep outcome metadata + reply text ONLY to the REPLAY_RUN-gated caller. Nothing replay-related is written to any client-readable store.

## 3. GATED SUB-PHASES

### 3.1 — Engine (`api/cwf/_lib/replay/`)
- `recordedTurn.ts`: load a replay specimen by assistant `messageId` — the triggering user message content, prior conversation history as-of that turn, the assistant row's `raw_tool_results`, and the turn's recorded provider/model. Fail loudly (named error) if `raw_tool_results` is null/empty — such turns are not replayable, say so.
- `stubTools.ts`: build the tool set for the run — same tool NAMES/schemas as the recorded turn expected, execute = lookup per C3. Track per-rep: calls served, misses, policy applied.
- `taskFn.ts`: one rep = compose the system prompt via the production `buildSystemPrompt` path with the recorded context, invoke `streamChat` headless with stub tools, retry disabled (C7), collect: full text, finishReason, token usage, latency, `isEmptyCompletion` verdict, stub stats.
- `runExperiment.ts`: N-rep loop under C5 budget; aggregate: `emptyRate`, per-rep table, miss totals, token spend. Deterministic aggregation (no sampling shortcuts).
**Gate:** unit tests — stub hit/miss both policies · canonical-args hash stability (key order insensitivity) · scorer parity with `isEmptyCompletion` on the guard's own test vectors · budget abort · C1 no-write (spy: persistence + telemetry emit not called). Full suite green.

### 3.2 — Admin API (`api/admin/replay.ts`)
POST {messageId, reps?, missPolicy?, provider?/model?/temperature? overrides} → runs the experiment, returns the aggregate + per-rep rows. `REPLAY_RUN` gate + audit per C4. GET (list) → recent replayable specimens: assistant messages with non-null `raw_tool_results` (id, conversation title, ts, tool-result count) — gated the same.
**Gate:** endpoint tests (403 without capability; audit row written; response shape).

### 3.3 — Panel: ReplayTab Part B goes LIVE
Part B section only: specimen picker (from the GET list) · reps + miss-policy controls (bounded by config) · run → per-rep outcome table (rep #, empty?, finishReason, tokens, latency, stub misses) + aggregate header (emptyRate N/M, spend). Part B's inactive banner removed; **Part A stays inactive** with its banner updated to name the real remaining dependency (permanent-host experiments / AWS phase — no longer "F-obs, OA-8", that text is stale). Panel primer updated (what-it-controls · tables · where-in-code · lifecycle). RULE 26: nothing clips at 1280/1024, rendered evidence required.
**Gate:** rendered screenshots at both widths + primer text shown.

### 3.4 — Live verification (the instrument's first light)
1. Replay TODAY's OEE turn (it has rich `raw_tool_results`): N=5, `strict`. Evidence: aggregate table from the panel; Langfuse shows 5 traces tagged `cwf.replay=true` with the run id; `telemetry_events` row count UNCHANGED before/after (paste counts); `messages`/`conversations` row counts UNCHANGED.
2. **Specimen hunt (stretch, attempt it):** query for OBS-3-era assistant messages flagged empty/retried that carry `raw_tool_results`; if one exists, run N=10 and report its measured emptyRate — the saga's first laboratory datum. If none is replayable, report that finding explicitly (it tells the architect the characterization needs fresh captures, which is itself a result).
**Gate:** all counts + trace tags evidenced. Trace-in-UI, never build-green.

### 3.5 — Living-doc seal (separate commit)
Agent Control Plane tab: Replay Part B cell → LANDED (Part A remains honest-inactive with corrected dependency text); manifest → **rev 26**, and fix the known one-word drift in the manifest `_comment` ("WARNs" → "FAILs" — the gate has FAILed since F-obs3). If the touched blueprint/architecture prose mentions backend extensibility, apply the GAP-4 one-sentence truth fix ("adding a backend = a row + a pack + one registration"); if not touched, leave it tracked. Changelog + KB updated. `check:doc-drift` OK.

### 3.6 — Merge + push (RULE 25)
`--no-ff`, branch deleted, push, report `git rev-parse origin/master`.

## 4. SELF-VERIFICATION CHECKLIST (evidence per line)
- [ ] Pre-flight: HEAD `7eb59ce`, 681/681, stack 6/6
- [ ] Engine tests: stub policies · hash stability · scorer parity with `isEmptyCompletion` vectors · budget abort · C1 no-write spies
- [ ] `REPLAY_RUN` capability + 403 test + audit row evidence
- [ ] Retry PROVABLY disabled in replay path (test or code-path evidence)
- [ ] Panel: Part B live, Part A banner corrected; RULE 26 screenshots at 1280 + 1024
- [ ] First-light run: N=5 aggregate + 5 tagged Langfuse traces + unchanged `telemetry_events`/`messages` counts
- [ ] Specimen hunt outcome reported (datum or explicit absence)
- [ ] Seal: Replay-B cell LANDED, manifest rev 26 + `_comment` word fixed, GAP-4 applied-or-tracked stated, drift check OK
- [ ] Full suite green (≥ 681 + new; report count)
- [ ] `--no-ff` merged, pushed, remote hash reported

## 5. NON-GOALS
No OBS-3.1 design (this phase builds the instrument, the architect designs the perturbation AGAINST its data); no Replay Part A / per-stage replay; no Langfuse Datasets/Experiments API integration (permanent-host phase); no scheduling/batch UI; no changes to OBS-2/OBS-3 production behavior, grounding, eval-gate, or `telemetry_events`; no scrubber changes. If replay exposes a fidelity gap (e.g. a tool result too large to have been recorded intact): report as a finding with the affected messageId — the capture-side fix is a separate architect decision.
