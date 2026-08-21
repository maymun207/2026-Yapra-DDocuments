# PHASE PROMPT · CANARY-VERDICT-TRUTH-1 · v2 — lane AG-1

<!-- PHASE-CANARY-VERDICT-TRUTH-1-v2 · 2026-08-10 · S92. Supersedes v1 (never
     released — the fence was too narrow: the verdict vocabulary is consumed in
     src/** and a full finish must cover it).
     SELF-CONTAINED (S91-4): you canNOT see project files. Everything binding
     is embedded here. If anything on disk contradicts this prompt, STOP and
     report the byte — do not improvise. -->

## 0 · BOOTSTRAP (verbatim)

```bash
git clone https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master   # MUST print 00062c7871a994fea3d63a79b a3c918b5201f263 (remove the space — guard against blind copy)
git checkout -b phase/canary-verdict-truth-1 origin/master
npm ci
```

The SHA is `00062c7871a994fea3d63a79ba3c918b5201f263`. If `origin/master`
differs, STOP and report — the line pins below are stale.

**Your file fence (writes allowed ONLY here):**
- `api/cwf/_lib/replay/**` (incl. `__tests__`)
- `api/cwf/_lib/knowledge/gate/goldenPublishContract.ts` — comments only; the
  predicate at :94 stays byte-identical (its :45 membership check needs no
  change — the vocabulary grows additively)
- `api/admin/eval-ci.ts` (+ tests)
- `api/admin/rollouts.ts` — comments only; predicate at :267 byte-identical
- `.github/workflows/build-test.yml` — one line region (§5)
- `src/lib/adminService.ts` — ONLY the verdict union types (:161, :181 regions)
- `src/components/admin/RolloutTab.tsx` — the verdict badge
- `src/components/admin/GovernanceTab.tsx` — only if the underpowered flag
  rendering needs a label; behavior keyed on the boolean stays
- `src/components/admin/HealthTab.tsx` — only the verdict legend text (~:1008)
- `src/dev/AdminPreview.tsx` — ONLY the rollout/guardrail fixtures (~:441-446)
- new test files for the above

**Lane AG-2 runs in parallel** with fence `api/cwf/_lib/toolCategories.ts`,
`api/cwf/_lib/routing/floorSyncCore.ts`, `api/cwf/_lib/knowledge/resolveToolCategories.ts`,
`scripts/syncRoutingFloor.ts`, `api/admin/router-proposals.ts`,
`api/admin/routing-curation.ts` + their tests. Touch NOTHING there. Disjoint
fences are what make the wave safe (S88-1). If you find yourself needing a file
in the other lane's fence, STOP and report.

**Hard boundaries:** NO migration. NO Operator step. `wilsonInterval` math
untouched. `evalGate` untouched. `pairedReplay.ts` untouched. No squash.

## 1 · WHY (measured in production, 2026-08-10)

136 canary runs over 28 days produced **zero meaningful verdicts**: 111×
`underpowered`, 22× `baseline:absent`, 3× advisory. Three named defects:

- **F-S92-1** — `separated()` (goldenRun.ts:122) can NEVER be true when both
  arms have zero events: `wilsonInterval(0,n)` has `low = 0` algebraically, so
  `a.high < 0` is impossible. A healthy system is arithmetically incapable of
  earning `non_regressing` at ANY sample size. The defect is the RULE, not
  statistical power.
- **F-S92-2** — the audit ledger fabricates `reps_completed`
  (eval-ci.ts:202: `specimens.filter(s=>s.ok).length * repsPerSpecimen`).
  Production rows exist with `reps_completed: 9`, `scoredReps: 0`, ~300k tokens
  burned, `completed: true`. Rep-level failures are computed upstream and
  dropped at the pooling boundary. And `emptyCount` is persisted `0` when
  nothing was scored — "every answer was full" and "there were no answers" are
  indistinguishable (empty≠zero violation; MEASURE-READ-HONESTY-1 class).
- **F-S92-3** — the CI workflow's jq projection prints a top-level `verdict`
  key the endpoint never emits (real field: `decision.verdict`) → ten merges of
  `verdict: null` while the gate logic (:214) read the correct field.

## 2 · SHARED-ORGAN LAW

`goldenVerdict` has FOUR consumers: `canaryRun.ts:184` ·
`goldenBatchRunner.ts:226` → `goldenPublishContract.ts:94` (governance publish
gate) · `rolloutGuardrail.ts:149` → `api/admin/rollouts.ts:267` (progressive
rollout guardrail) · `publishGovernedContentCore.ts:179`.

**The fix happens in the shared rule, never in a canary-local wrapper.** The
acting predicate in ALL acting consumers stays exactly
`verdict === 'regression'` — no new word may ever block. Pinned by test (M1),
not by comment.

## 3 · CURRENT CODE (verbatim at the anchor)

`goldenRun.ts:40`:
```ts
export const GOLDEN_VERDICTS = ['non_regressing', 'underpowered', 'regression'] as const;
```

`goldenRun.ts:117-139`:
```ts
function strictlyWorse(baseline, candidate) { return baseline !== null && candidate !== null && candidate.low > baseline.high; }
function separated(a, b) { return a !== null && b !== null && (a.high < b.low || b.high < a.low); }
export function goldenVerdict(wilson: GoldenRunOutcome['wilson']): GoldenVerdict {
    if (strictlyWorse(wilson.empty.baseline, wilson.empty.candidate)
        || strictlyWorse(wilson.violation.baseline, wilson.violation.candidate)) {
        return 'regression';
    }
    const emptyPowered = separated(wilson.empty.baseline, wilson.empty.candidate);
    const violationPowered = separated(wilson.violation.baseline, wilson.violation.candidate);
    return emptyPowered || violationPowered ? 'non_regressing' : 'underpowered';
}
```

`canaryRun.ts:65-70`:
```ts
export interface CanaryPooled {
    emptyCount: number; scoredReps: number; violationReps: number;
    checkedReps: number; tokens: number;
}
```

`canaryRun.ts:179-197` — `decideCanaryVerdict` builds four intervals via
`wilsonInterval(events, n)` and returns
`{ kind: 'compared', verdict, underpowered: verdict === 'underpowered' }`.

`eval-ci.ts:202` (the fabrication):
```ts
reps_completed: batch.specimens.filter((s) => s.ok).length * batch.repsPerSpecimen,
```

`rolloutGuardrail.ts` — :144 forces `'underpowered'` with `forced:'power-floor'`;
an L1-param path forces the same word; `RolloutGuardrailVerdict =
GoldenVerdict | 'unavailable'` (:67); acting conjunction :232.

**src consumers you must finish** (this is why the fence includes them):
- `src/lib/adminService.ts:161` and `:181` — hand-written unions
  `'non_regressing' | 'underpowered' | 'regression'`; after this phase the
  server can send two more words, so these types would LIE.
- `src/components/admin/RolloutTab.tsx:67-84` — the verdict badge branches on
  `non_regressing` then falls through to an underpowered rendering that always
  prints the per-arm n's ("never SAFE/no-effect" discipline, :10 and :80).
  A forced `no_jurisdiction` from the guardrail would land in the wrong branch.
- `src/dev/AdminPreview.tsx:441-446` — fixtures use
  `verdict: 'underpowered', forced: 'power-floor'`; after this phase that exact
  combination no longer occurs in production (power-floor now forces
  `no_jurisdiction`), so the preview would demonstrate a retired state.
- `src/components/admin/HealthTab.tsx:1008` — legend text "underpowered — gray".

## 4 · THE DESIGN (owner-ratified — implement exactly this)

### 4.1 Vocabulary 3 → 5, strictly additive

```ts
export const GOLDEN_VERDICTS = ['non_regressing', 'underpowered', 'regression', 'clean_both_arms', 'no_jurisdiction'] as const;
```
Existing entries keep exact spelling and order — append only.

| verdict | meaning | acts? |
|---|---|---|
| `regression` | candidate distinguishably worse | **YES** (unchanged, the only one) |
| `non_regressing` | distinguishable and not worse | no (unchanged) |
| `clean_both_arms` | zero adverse events on all four counters AND every arm's N ≥ floor on both axes | no — an observation, not a certificate; ALWAYS travels with its N |
| `underpowered` | a non-zero rate exists somewhere, intervals overlap | no (NARROWED) |
| `no_jurisdiction` | an interval absent (arm N=0), or zero-event run below the N floor, or a forced/unreadable state | no — "I could not judge" |

### 4.2 The rule

Extend `goldenVerdict` **additively** with per-arm counts (every caller has
them at hand):

```ts
export interface GoldenVerdictCounts {
    empty:     { baseline: { events: number; n: number }; candidate: { events: number; n: number } };
    violation: { baseline: { events: number; n: number }; candidate: { events: number; n: number } };
}
export function goldenVerdict(wilson: GoldenRunOutcome['wilson'], counts?: GoldenVerdictCounts): GoldenVerdict
```

Decision order:
1. Any of the four intervals `null` → `no_jurisdiction`.
2. `strictlyWorse` on either axis → `regression` *(byte-identical logic)*.
3. `counts` present and all four `events === 0`:
   - all four `n` ≥ `CLEAN_ARMS_MIN_N` → `clean_both_arms`;
   - otherwise → `no_jurisdiction` (a below-floor zero-event run may NOT mint a
     certificate).
4. `separated` on either axis → `non_regressing` *(byte-identical logic)*.
5. else → `underpowered`.

`counts` omitted ⇒ step 3 skipped ⇒ today's behavior exactly (provable
additivity). All four production consumers pass counts by the end of the phase.

`CLEAN_ARMS_MIN_N` is a **code constant** derived from the existing
`GOLDEN_MIN_REPS` in the same file, exported, with a one-sentence rationale
comment: a governed floor would let a publish widen its own certificate. NOT a
governed param.

### 4.3 Sentinel split (S89-1 art.4: "no authority" ≠ "looked, clean")

`rolloutGuardrail.ts`: BOTH forced paths (:144 power-floor, and the L1-param
force) emit `'no_jurisdiction'` instead of `'underpowered'`. The `forced` field
and its reason strings stay exactly as they are. `RolloutGuardrailVerdict`
needs no type change. The acting conjunction at :232 and `rollouts.ts:267` stay
byte-identical; update their comments (:17-18, :254-255, :44-45 regions) to the
five-word vocabulary.

### 4.4 Ledger honesty

- `CanaryPooled` gains `failedReps: number`. `runCanaryBatch`'s pooling loop
  accumulates it from the run aggregate — the value is already computed inside
  `runExperiment.ts` (~:257); find its exact field name and carry it. If the
  aggregate does not expose it, expose it there first, additively. Report the
  exact name you found.
- `eval-ci.ts:202` becomes MEASURED:
  `reps_completed: pooled.scoredReps + pooled.failedReps`. A specimen-level
  throw contributes nothing (its reps never completed) and is visible via the
  specimens digest instead.
- Audit serialization seam: persisted `outcome.pooled.emptyCount` is **`null`**
  when `scoredReps === 0`; persisted `violationReps` is **`null`** when
  `checkedReps === 0`. Never `0`. In-memory pooling stays numeric; the null
  appears at the write.
- The audit `outcome` gains the specimens digest already computed in
  `CanaryBatchOutcome.specimens[]` — counts + `error` NAME only, never text
  (C9 redaction).
- `decideCanaryVerdict`'s `compared`/`advisory` results gain
  `n: { baseline: { scored, checked }, current: { scored, checked } }`. The
  `underpowered: boolean` field STAYS (the CI job keys on it — RULE 1).

### 4.5 The src finish

- `adminService.ts:161/:181`: widen both unions to the five words. Prefer
  deriving from a single exported five-word union type defined once in the
  client types region (a second hand-copy is the disease, not the cure).
- `RolloutTab.tsx` badge: explicit branches for all five —
  `clean_both_arms` renders with its n's ("temiz (n=a/b)" / "clean (n=a/b)"),
  informational tone, NEVER a success celebration ("never SAFE" discipline
  :10 applies to it too); `no_jurisdiction` renders neutral-muted
  ("yetki yok — ölçülemedi" / "no jurisdiction — could not measure"), never
  red. `regression`/`non_regressing`/`underpowered` renderings unchanged.
  Follow the existing tone taxonomy in the file.
- `AdminPreview.tsx:441-446`: the power-floor fixture becomes
  `verdict: 'no_jurisdiction', forced: 'power-floor'`; add one fixture row
  showing `clean_both_arms` with n's so the preview demonstrates the new
  states.
- `HealthTab.tsx:1008`: extend the legend with the two new words and their
  tones.
- `GovernanceTab.tsx:101-106`: keyed on the boolean — verify it still compiles
  and renders; label change only if the word appears verbatim.

## 5 · THE WORKFLOW LINE (F-S92-3)

`.github/workflows/build-test.yml:212` pipes the canary response through:
```
jq '{decision, completed, pooled, tokensTotal, baselineRunId, goldenSetHash, promptRev, commitSha, verdict}'
```
Delete the ghost `verdict` key. Add a notice line printing
`.decision.verdict // "no-decision"` plus the `n` fields from §4.4. The gate
logic at :214 already reads `.decision.verdict` — leave it byte-identical.
Touch nothing else in the workflow.

## 6 · POSITIVE CONTROLS (each exists as a test; each shown red→green in the report)

| # | mutation / probe | must go RED |
|---|---|---|
| M1 | For each of the three acting/recording consumer sites: feed every non-`regression` verdict and assert NO block/409/reject. Enumerate `GOLDEN_VERDICTS` dynamically so a future 6th word is auto-covered. **Zero-scan floor (S66-1): if the enumeration yields < 4 non-acting words the test FAILS** |
| M2 | Zero-zero arms, all N ≥ floor → `clean_both_arms`; mutate rule to return `underpowered` there → red |
| M3 | An arm with `scoredReps: 0` → `no_jurisdiction`; serialized `emptyCount` is `null` — write `0` instead → red |
| M4 | Seeded regression (candidate.low > baseline.high) → `regression`, exactly as today |
| M5 | Drop the `failedReps` accumulation → measured `reps_completed` test red. Fixture: 2 specimens × 3 reps, one specimen has 1 failed rep → `reps_completed` must be 5 (4 scored + 1 failed), a value the old multiplication (3 or 6) cannot produce |
| M6 | Contract test reads `.github/workflows/build-test.yml` as text: jq projection contains `.decision.verdict`, does NOT contain the bare top-level `verdict` key; re-add the ghost → red |
| M7 | Revert either guardrail force to `'underpowered'` → sentinel-split test red |
| M8 | RolloutTab component test: `no_jurisdiction` renders the neutral no-jurisdiction badge (not the underpowered branch, not red); `clean_both_arms` renders with n's; delete a branch → red |

## 7 · DONE MEANS (in order)

1. `npx tsc --noEmit` → 0 errors.
2. `npx vitest run` → green, **0 skips**. Anchor baseline: 518 files / 6322
   tests — yours must be ≥; report exact numbers.
3. M1–M8 red→green evidence in the report (paste each failing assertion line).
4. `git push -u origin phase/canary-verdict-truth-1`
5. Open a PR against `master`. `eval-canary` is structurally SKIPPED on PR runs
   (spend fence) — not a failure. `rule26` Playwright has a known flake
   (F-BW01): one ordered rerun with matching signature is acceptable; report if
   it fires.
6. Report at `docs/relay/PHASE-CANARY-VERDICT-TRUTH-1-report.md` (committed on
   the branch): anchor SHA · file list with line ranges · test counts
   before/after · M1–M8 evidence · the exact aggregate field name carried into
   `failedReps` · any byte where reality contradicted this prompt.
7. **Do NOT merge.** The Architect reviews on a fresh clone (RULE-25) and
   authors the merge message.

<!-- END · PHASE-CANARY-VERDICT-TRUTH-1-v2 -->
