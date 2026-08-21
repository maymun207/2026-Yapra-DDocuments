# PHASE CHAR-1 — Empty-Saga Characterization Runs (measurement only)
**claude-code-PHASE-CHAR-1-empty-saga-characterization-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `5d13b73` (721/721 tests, docVersion rev 27, `replay_audit` DDL applied)
**Author lane:** Claude Code (AntiGravity).

---

## 0. WHY

REPLAY-B produced the saga's first datum: specimen `07beb11f…` reproduces its production empty at 3/10 raw. But 3/10 at N=10 carries a ~8–65% binomial CI — too wide to design OBS-3.1 against, and one specimen is not a characterization. This phase runs the instrument systematically and answers three questions with raw counts:

1. **How empty is the empty region, precisely?** (tighten the CI on `07beb11f` to ±~10%)
2. **Is it sampling-jitter or input-deterministic?** (temperature arms: if temp=0 is 0/N or N/N, the region is input-deterministic and OBS-3.1's perturbation MUST change the input; if temp=0 recovers, temperature jitter alone may suffice)
3. **Is `07beb11f` one of a class or a singleton?** (screen the other empty-flagged specimens + a negative control)

**This phase writes ZERO production code.** The deliverable is a measurement report: raw per-rep data + run aggregates. The architect does the statistics and designs OBS-3.1 against them — never the other way around.

## 1. HARD PRE-FLIGHT GATE
```bash
git fetch origin && git rev-parse origin/master        # MUST be 5d13b73...
git status --porcelain                                  # clean (stash-protect operator-local files)
npx vitest run 2>&1 | tail -3                           # 721 passed (721)
docker compose -f infra/langfuse/docker-compose.yml ps  # 6/6 up
```
Supabase (read-only check): `list_migrations` shows `20260704130000_replay_audit` applied. Record the pre-phase `replay_audit` row count (expect 1 — run `9d115773`).

No branch needed unless §3.5 fires (findings requiring a doc note): measurement runs produce no repo diff.

## 2. HARD CONSTRAINTS
- **C1 — ZERO production-code changes.** No file under `api/`, `src/`, `shared/`, `scripts/`, `supabase/` is touched. The engine, endpoint, panel, gateway, scorers, and config are frozen at `5d13b73`. If any run exposes a bug or fidelity gap: STOP that arm, report the finding with the run id + messageId — the fix is a separate architect decision. Do not "quickly patch" mid-measurement; a patched instrument invalidates every run before the patch.
- **C2 — Every run goes through the real gated endpoint** (`POST /api/admin/replay` with a super_admin session), never by importing the engine directly. The audit trail IS the run record: every run must land a `replay_audit` row (zero ALARM lines — DDL is live).
- **C3 — One variable per arm.** Provider/model = the recorded turn's attribution in ALL arms; only the arm's named variable (temperature or specimen) changes. Never combine a temperature override with a specimen switch in the same arm.
- **C4 — Ceilings are law.** `REPLAY_REPS_HARD_CEILING=25` is a safety property — the 50-rep baseline is TWO runs of 25, never a raised ceiling or env tweak (RULE 1: the ceiling being non-tunable is the point). Default token budget per run stays.
- **C5 — Total phase token spend ≤ 2,000,000** (input+output, summed across all runs from the audit digests). Abort remaining arms if crossed and report spend-to-date.
- **C6 — Raw data leaves nothing behind on interpretation.** The report carries, per rep: run id · rep # · ok · empty · finishReason · inputTokens · outputTokens · latencyMs · toolCallsServed · stub misses · floorPhrasePresent. Counts, not summaries — the architect computes the statistics.
- **C7 — Lab hygiene (REPLAY-B precedent):** throwaway super_admin user for the session; delete the user + session file + stop all lab processes at phase end.

## 3. GATED ARMS (run in order; each arm's gate = its audit rows + Langfuse traces exist)

### 3.1 — ARM-BASELINE: `07beb11f`, strict, recorded provider, recorded temperature, N=25 × 2 runs
50 raw attempts total. Gate: two `replay_audit` rows; 50 traces tagged `cwf.replay=true` across the two run-id sessions in Langfuse; 0 stub misses expected (this specimen dies pre-tool or takes a single recorded trajectory — REPLAY-B measured 0 misses at N=10; if misses appear now, report and continue, do not switch policy mid-arm).

### 3.2 — ARM-TEMP: `07beb11f`, strict, recorded provider, temperature OVERRIDE
- T-0: `temperature: 0.0`, N=10
- T-1: `temperature: 1.0`, N=10
Gate: two audit rows (provider_id + digest); per-rep tables. NOTE in the report which temperature each audit digest records — if the digest does not carry the override, say so (report finding, do not patch — C1).

### 3.3 — ARM-SCREEN: the remaining empty-flagged specimens
From the REPLAY-B hunt's 8 empty-flagged `llm_call` events: for each of the 7 not-yet-replayed, attempt `loadRecordedTurn` via the GET specimen list + a 1-rep probe. Then:
- Replayable, single-trajectory: N=10 `strict`.
- Replayable but strict-blocked by trajectory divergence (ReplayStubMissError): N=10 `honest-empty`, misses reported per rep.
- Not replayable (no `raw_tool_results`): record the messageId + reason — an explicit absence is a result (it sizes the fresh-capture need).
Gate: a disposition line per specimen (replayed@rate | honest-empty@rate+misses | not-replayable+reason).

### 3.4 — ARM-CONTROL: the OEE turn `3c266d30…`, strict, recorded provider/temp, N=10
Negative control. Expected ~0/10 (REPLAY-B first light was 0/5). A non-trivial empty rate here is a FINDING (the region may be wider than believed), not a failure.

### 3.5 — Findings note (ONLY if a finding fired)
If any arm produced a C1-class finding (bug, fidelity gap, digest gap), a short branch `char-1-findings` adds ONE changelog entry describing it (no code). `--no-ff` merge, push, hash reported. If no findings: no repo diff, state that explicitly.

## 4. REPORT FORMAT (the phase deliverable)
1. **Run ledger:** every run id ↔ arm ↔ audit row id ↔ Langfuse session link, + pre/post `replay_audit` counts and pre/post `telemetry_events`/`messages`/`conversations` counts (must be byte-identical for the latter three).
2. **Per-rep raw table** (C6 fields), grouped by arm — attach as JSON in the report, not prose.
3. **Per-arm headline:** emptyRate n/N only (no interpretation).
4. **Empty-rep anatomy for `07beb11f`:** for each empty rep across all arms — finishReason, inputTokens, outputTokens (expect 0), latencyMs, and whether ANY tool call was emitted before death. For each NON-empty rep: toolCallsServed + outputTokens (the recovered-shape fingerprint).
5. **floorPhrasePresent** anywhere = call it out with the rep id (recorded floor text leaking through history is a candidate input-correlation signal).
6. Total token spend vs the C5 ceiling.

## 5. SELF-VERIFICATION CHECKLIST (evidence per line)
- [ ] Pre-flight: HEAD `5d13b73`, 721/721, stack 6/6, migration applied, pre-count recorded
- [ ] ARM-BASELINE: 2 runs × N=25, audit rows + 50 tagged traces
- [ ] ARM-TEMP: T-0 + T-1 audit rows; temperature attribution in digest confirmed or reported absent
- [ ] ARM-SCREEN: disposition line for all 7 specimens
- [ ] ARM-CONTROL: N=10 aggregate
- [ ] Ledger deltas: replay_audit +N runs; telemetry_events/messages/conversations UNCHANGED (paste counts)
- [ ] Zero ALARM lines across all runs
- [ ] Raw per-rep JSON attached
- [ ] Production code diff vs `5d13b73` = EMPTY (or the single findings-changelog commit, named)
- [ ] Lab teardown: throwaway user deleted, processes stopped
- [ ] Total spend reported, ≤ 2M

## 6. NON-GOALS
No OBS-3.1 design or perturbation experiments (changing the INPUT is the next phase, designed by the architect against THIS data); no engine/endpoint/panel changes; no new scorers; no provider or model swaps (temperature is the only sanctioned override); no fresh production captures (if ARM-SCREEN shows the specimen pool is too thin, that finding TRIGGERS a capture-side architect decision — it is not solved here); no statistics in the report beyond n/N counts.
