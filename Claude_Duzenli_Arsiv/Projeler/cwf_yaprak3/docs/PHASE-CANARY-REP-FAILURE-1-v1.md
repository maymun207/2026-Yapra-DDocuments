# PHASE PROMPT · CANARY-REP-FAILURE-1 · v1

<!-- PHASE-CANARY-REP-FAILURE-1-v1 · 2026-08-11 · S93.
     Walk item #35 (rollout v3_0). SELF-CONTAINED (S91-4: you cannot read
     Claude project files — everything binding is embedded here). -->

>> BLOCK: AG-1 <<

## 0 · PRECONDITION (verify before any work)

```
git clone <origin> && git rev-parse origin/master
# MUST print: 0de5ffdd98a1a855132bc80a71a7be50f070beef
```
If it does not match, STOP and report — do not proceed on a moved master.

Branch: `phase/canary-rep-failure-1` · PUSH the branch to origin ·
Report file: `docs/relay/PHASE-CANARY-REP-FAILURE-1-report.md` ·
Open a PR against master (CI must run on the PR head).
Full clone only — never `--depth N`. All scratch-clone writes use absolute
paths. No squash anywhere; the eventual merge will be `--no-ff` (not your
step — you stop at green PR + report).

## 1 · WHY (measured, not asserted — reproduce any number you rely on)

The replay answer book makes most reps unscoreable **by construction**:

- `api/cwf/_lib/replay/stubTools.ts:175` — MCP stub tools are advertised to
  the model with an EMPTY schema: `jsonSchema({ type:'object', properties:{} })`.
- `stubTools.ts:140` — the answer book is keyed
  `${toolName}#${canonicalArgsHash(entry.args)}`.
- So the model must reproduce the recorded argument object BYTE-EXACTLY
  while seeing no parameter schema at all. One differently-formatted date,
  one extra key → different hash → miss.
- `stubTools.ts:148-155` — a miss under `strict` (the production default,
  `config.ts` `REPLAY_DEFAULT_MISS_POLICY`) throws `ReplayStubMissError`.
- `api/cwf/_lib/replay/taskFn.ts:221-227` — the strict-miss check runs
  AFTER the stream completed: the rep burned its full token spend, then
  returns `ok:false` — and every consumer drops the reason.

Measured blast radius (Supabase, 2026-08-11): `golden_run_chunks` — 400
chunks, **282 scored zero**, **0 marked failed, 0 carry an error**, and the
zero-scored chunks burned **8.04M of 9.78M tokens (82%)**. Zero-scored
chunks average 1.93× the tokens of scored ones. The live canary shows the
same class: `failed/scored` per run 6/3 → 3/6 → 6/3. The publish gate
(golden batch) runs on the same engine — this is not canary-local.

## 2 · SCOPE — three changes, one phase

### 2.1 · Real schemas for stub tools
In `buildStubToolSet` (`stubTools.ts`), derive each MCP stub tool's
`inputSchema` from its recorded entries instead of the empty object:
- `properties` = union of arg keys across that tool's recorded calls; each
  property's `type` inferred from the recorded JSON value type (string /
  number / boolean / array / object; mixed types → omit `type`).
- `required` = keys present in EVERY recorded call of that tool.
- Tools recorded with no/empty args keep the current empty-object schema
  (byte-identical for them).
- `resolve_time_range` and the ResultStore meta-tools already use real
  schemas — do not touch them.

### 2.2 · Name-level fallback, counted — never hidden
In `lookup()` (`stubTools.ts:147`):
- Exact `name#argsHash` hit → BYTE-IDENTICAL behavior to today (pin this
  with a test: same serve, same stats, new counters at 0).
- Exact miss, but the SAME toolName has recorded entries → serve from a
  name-level pool for that tool (FIFO in recording order; exhausted →
  re-serve last, incrementing the existing `reusedLast`). Count it:
  `stats.servedByName++` and push `{toolName, argsHashRequested}` onto a new
  `stats.nameFallbacks` array. This is NOT a miss and does NOT throw under
  strict. (Precedent: the book already re-serves `last` on queue exhaustion,
  `stubTools.ts:156` — the principle is accepted; this widens it one notch
  and, unlike today, COUNTS it.)
- No recording for that toolName at all → today's behavior exactly: miss,
  `missedCalls`, strict throws / honest-empty serves the honest-empty result.

### 2.3 · Attribution through every pooling boundary
The reason a rep fell must survive to the ledger (the F-S92-2 lesson, one
layer down):
- `runExperiment.ts` `aggregate`: add `servedByName` (sum over reps'
  `stub.servedByName`). `stubMisses` and `failedReps` already exist there.
- `taskFn.ts`: no behavior change; `failure.name` already exists — stop
  dropping it downstream.
- `canaryRun.ts` `CanaryPooled`: add `stubMisses`, `servedByName`.
  Per-specimen `digest`: add `failed` (that run's `aggregate.failedReps`),
  `misses`, `servedByName`, and `failureNames: Record<string, number>`
  built from `reps[].failure?.name`.
- `goldenBatchRunner.ts` chunk digest: add `failedReps`, `servedByName`,
  `stubMisses`, `failureName: string | null` (the single rep's
  `failure?.name`). The console line for a zero-scored chunk must say so —
  today it prints `ok`.
- `api/admin/eval-ci.ts`: persist the new pooled fields in the audit row's
  `outcome.pooled` and per-specimen digests; include `servedByName`,
  `stubMisses`, `failedReps` in the 200-response JSON.
- **Read-side law (empty≠zero):** the baseline reader `pooledOf`
  (`eval-ci.ts`) stays NARROW — exactly the four verdict counters. Old rows
  lack the new fields; never default them to 0 on read. State in the report
  that `CanaryBaselinePooled` is untouched.
- `api/admin/replay.ts` digests: add `servedByName` beside the existing
  `failedReps`/`stubMisses`.

## 3 · OUT OF SCOPE — do not touch
- `goldenVerdict` vocabulary, `CLEAN_ARMS_MIN_N`, `goldenRun.ts` rule logic.
- The governed `quota.evalCiSpecimenCap` row (stays 3) and any governed
  table (C1: zero writes to `messages`; no governance writes from this path).
- Golden-set membership/curation. Pruning specimens to "what the stub can
  serve" is FORBIDDEN — the instrument may not pick its own sample.
- Stage-08 card text (W-036 is a separate watch item).

## 4 · TESTS (each pin named in the report)
1. Schema derivation: union/required/type inference; empty-args tool
   byte-identical.
2. Exact-hit regression pin: recorded exact match ⇒ identical serve + stats,
   `servedByName === 0`, `nameFallbacks` empty.
3. Fallback: args-mismatch on a recorded tool ⇒ served, scored,
   `servedByName === 1`, no throw under strict.
4. True absence: unrecorded toolName under strict still throws
   `ReplayStubMissError`; under honest-empty serves the honest-empty result.
5. Aggregation: `aggregate.servedByName` sums across reps; canary pools it;
   specimen digest carries `failureNames`.
6. eval-ci row: new fields persisted; `pooledOf` on an OLD-shape row still
   returns the four counters (no read-side fabrication).
7. Golden chunk: failed rep ⇒ digest `failureName` set, console line no
   longer says `ok`.
Mutation discipline: for each new predicate, flip it and show the named test
goes red.

## 5 · GATES
- `npm run typecheck:api` — BOTH tsconfig projects run SEPARATELY. Root
  `npx tsc --noEmit` is FAKE GREEN (root `files: []`); `&&` chains
  short-circuit — run and report each project's exit code.
- Full unsharded vitest suite; CI on the PR head is the sole test arbiter.
- Do NOT copy `.env.local` into the worktree (`check:tenant-zero` scans
  gitignored files and will false-red — W-037).
- If any user-facing card text is touched (it should not be): no internal
  identifiers (ADR-nnn, RULE n, phase names) in card copy.

## 6 · REPORT (`docs/relay/PHASE-CANARY-REP-FAILURE-1-report.md`)
Branch head SHA · per-project typecheck exit codes · test file/count before
and after · touched-file list with one-line rationale each · every deviation
from this prompt NAMED (deviations are ratified or reverted at review — never
silent) · TAIL ANCHOR: end the report with the literal line
`TAIL: CANARY-REP-FAILURE-1 v1 complete` — print it, do not assume it.

## 7 · POST-DEPLOY PROOF (S63-1 — named now, read later, not your step)
After merge + production convergence, the next canary row must show the new
attribution fields populated. STOP CONDITION (owner-ratified): if that read
still yields no real verdict with scored < 9, the canary repair line HALTS —
no second diagnosis round; the item closes by owner ruling as "instrument
class rejected", and the walk returns to the architecture keys.

<!-- END · PHASE-CANARY-REP-FAILURE-1-v1 -->
