# PHASE · `LENS-CEILING-1` · v1 — the measurement ceiling and BUG-008, in one piece

<!-- PHASE-LENS-CEILING-1-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     Author lane: AG (Claude Code / AntiGravity). ONE self-contained relay (D-2):
     every dependency is embedded below — do not fetch another artifact.
     Rollout position: register v84 §8, the ratified next work item.
     Written on RECON-LENS-CEILING-1-v1 (D-1). ZERO migrations. ZERO Operator. -->

---

## §0 · PRECONDITION (S47-1) — verify before writing a line

```
FRESH FULL clone (never --depth, never git stash — S61-1)
git fetch --all                                   # S81-1: rev-parse reads a LOCAL ref
git rev-parse origin/master
  EXPECT b960a1c9c44120f1e8821609d1f9acc4c2612646
```

Also verify, and **state each in the report as a number you computed**:

| Check | Expected at the anchor |
|---|---|
| `ls supabase/migrations \| wc -l` | 67 |
| test files (`find src shared api -name '*.test.ts*'`) | 445 |
| `docVersion` in `public/architecture/manifest.json` | `rev 189 · 2026-08-04` |
| `docs/adr/` | 13 files |

**If any differs, STOP and report.** Do not adapt the brief to a moved floor.

Branch: `phase/lens-ceiling-1`. Merge is `--no-ff` (squash banned) and only on the
Architect's verbatim GO.

---

## §1 · WHY THESE TWO ARE ONE PHASE

The clarification lens cannot read the whole corpus, and the evidence file it
produces cannot say that something broke while it read. Fixing only the first
produces **a longer measurement with the same blindness**:

- The instrument's cost is DB round trips. Per frame, the seam performs at least
  two uncached reads (`stageClarify.ts:132` and `:141`, fresh repository instance
  each call, no memo) plus `resolveShiftBoundaries()` and the alias index. At the
  S81 run's 5164 frames that is **≥10,000 round trips** for the entity reads
  alone.
- The observed degradation was a connection-level failure
  (`listByBackend failed: TypeError: terminated`), whose probability rises with
  run length.
- **So raising the ceiling raises the exposure to exactly the failure BUG-008
  makes invisible.** The honesty field must exist *with* the larger read, never
  after it.

**Do not split this phase.** If you believe it must be split, report and stop.

---

## §2 · THE TWO DEFECTS, TRACED TO BYTES (do not re-diagnose — verify)

### 2.1 · The ceiling

| Fact | Line |
|---|---|
| `CLARIFICATION_LENS_MAX_LIMIT = 5000` | `api/cwf/_lib/replay/clarificationLens.ts:99` |
| the silent clamp | `:337` |
| the cap is applied **per source** | `fetchAllPages(limit, …)` at `:357` and `:394` |
| the loader already pages to exhaustion | `:266–303` (`READ_PAGE_SIZE = 1000`) |
| `truncated` is set **only** on hitting the caller's own limit | `:291` |

Measured population at S81 (`docs/replay/ma-gate-rerun-S81-v1.md` §4.1, an
independent `count=exact` read, not via the lens): `synthetic_runs WHERE
frame_recorded = true` = **6626**; the telemetry source = **164**. `6626 > 5000`,
so `truncated.synthetic` is `true` at every legal `--limit` and MA-RERUN-1 was
VOID.

**The corpus moves.** `vercel.json:53` runs the synthetic injector at
`* * * * *`; `SyntheticRunsRepository.ts:73` inserts one row per injected turn.
A larger literal is therefore outgrown by construction, and a run taking hours
reads a population that changed while it ran.

**Consequence you must implement, not reinterpret:** today `truncated` is a
statement about **our own literal**, not about the corpus. It must become a
statement about the corpus, over a **frozen window**.

### 2.2 · BUG-008

The degradation lives in the production seam, `api/cwf/_lib/turn/stageClarify.ts`,
`loadEntityCandidates` (`:123–211`):

| Step | Line |
|---|---|
| `layerStatus` starts `'unknown'` | `:130` |
| descriptor read (`listEnabled`) | `:132` |
| registry read (`listByBackend`) — **the read that threw** | `:141` |
| **the catch: `console.warn` and NOTHING else** | `:175–177` |
| the floor path, and its own catch | `:192–210` |

**Two distinct blindnesses. Both must be closed:**

**(a) The seam never tells its caller.** `computeTurnClarification` (`:344`)
returns the lossy outcome; `scope` and `layerStatus` never leave
`loadEntityCandidates`. The lens is blind by construction — which is why the only
trace was the born-loud `[Clarify]` line at `:384`.

**(b) One class is ambiguous even inside the seam.** For a `FACTORY` frame, a
thrown discovered-read whose floor read succeeds returns
`scope='floor=entity_registry'`, `layerStatus='resolved'` — **byte-identical** to
a legitimately empty scoped layer that fell to the floor. **Therefore returning
`scope` does NOT close this bug.** The failure must be *named at the catch site*
and carried out. Anything inferred downstream from a scope string is rejected at
review.

**Law.** `ADR-013 DECISION-PARITY-1` half (b): the decision is recorded — to the
console — and is not routed to what consumes it. Also MEASURE-READ-HONESTY-1 one
storey up: the *evidence object of a measurement* must distinguish "evaluated
cleanly" from "evaluated on a fallback".

---

## §3 · GATES

Every gate is RED-first: write the failing test, show it fails, then fix. Every
new rule gets a **mutation control** (D-5) — including an innocent-case probe.

### G1 · Name the failure at the catch site — `stageClarify.ts`

Export a closed vocabulary and thread it through **every** return path of
`loadEntityCandidates`:

```ts
/** Which governed read degraded while this frame's entity candidates were loaded. */
export type EntityReadFailure = 'discovered' | 'floor';
```

- The return type gains `readFailures: readonly EntityReadFailure[]`.
- **Always present.** `[]` means "both reads returned"; it is never omitted and
  never optional. An absent field reproduces this bug in a new shape.
- The catch at `:175` pushes `'discovered'`; the catch at `:207` pushes
  `'floor'`. Both can be present.
- Every early return (`:184`, `:167`, `:194`, `:209`) carries the accumulated
  array. Accumulate in a `const` declared beside `layerStatus` at `:130` so a new
  return path inherits it rather than having to remember it.
- **Carry no error text.** The vocabulary is a closed enum, not a message. The
  underlying `console.warn` is unchanged and keeps its message; BUG-005 is open
  and this phase adds **zero** new prose to any log or evidence file.

### G2 · Parity in the born-loud line — same site, same fact

The `[Clarify]` line at `:384` gains a token that is **always** printed:

```
reads=ok            # readFailures is empty
reads=discovered    # or floor, or discovered,floor
```

An omitted token is indistinguishable from clean, so the innocent case prints
`reads=ok` explicitly. Test both directions.

### G3 · Stamp it onto the context — the seam's existing outward route

`api/cwf/_lib/turn/types.ts` — beside the `entityResolutions` stamp at `:364`:

```ts
/** BUG-008: what the entity-candidate load actually did on this turn. Stamped for
 *  the offline lens; never read back inside the gate. */
clarifyRead?: {
    readFailures: readonly EntityReadFailure[];
    layerStatus: string;
    scope: string;
};
```

- `computeTurnClarification` sets it **at the same site as the `[Clarify]` line**
  (`:384`), so log and stamp cannot disagree — parity by construction, not by
  discipline.
- It is set on **every** frame-bearing turn, before the outcome branches, so a
  HIGH and a NONE carry the same record.
- Production reads it nowhere. This is the exact posture `entityResolutions`
  already has (`clarificationLens.ts:447–457` documents why that is safe).

### G4 · The lens surfaces it — `clarificationLens.ts`

1. `REPLAY_CTX_STAMPED_FIELDS` (`:457`) gains `'clarifyRead'`. The structural pin
   at `__tests__/clarificationLens.test.ts:229/:259` re-scans the seam's source
   and must still fail for any *other* new `ctx.x`. Verify that it does.
2. `evaluateRecordedFrame` (`:601`) and `runGuardian` (`:558`) currently inline
   `buildReplayTurnContext(...)` into the `runGate` call (`:607`, `:566`). Hold
   the context in a local and read `ctx.clarifyRead` **after** the await —
   including in the guardian's `catch` branch at `:568`.
3. `ClarificationEvaluation` (`:472`) gains a **required, nullable** field:

```ts
/** The seam's own record of what its entity reads did. `null` = the seam never
 *  reached the read (it threw earlier and swallowed into null) — an UNKNOWN,
 *  never a clean. */
entityRead: { readFailures: readonly EntityReadFailure[]; layerStatus: string; scope: string } | null;
```

   `GuardianProbeResult` (`:512`) gains the same field.
   **Three states, never two:** `null` = unknown · `[]` = clean · non-empty =
   degraded. Collapsing `null` into clean is the bug.

4. `ClarificationLensEvidence` (`:770`) gains, always present:

```ts
readIntegrity: {
    /** evaluations + guardian probes — the number to compare with the
     *  `[Clarify]` line count for the same run. */
    totalSeamInvocations: number;
    degradedFrames: number;
    unknownFrames: number;
    byFailure: { discovered: number; floor: number };
};
```

   A clean run reports every number as **0, present** — never an absent object.

5. `caveats` (`:1020`) gains one line when `degradedFrames > 0` **or**
   `unknownFrames > 0`, naming both counts. Do not widen `load.readErrors`
   (`:243`): it is correctly scoped to the LOAD phase, and making one field mean
   two things is the defect, not the fix.

### G5 · Population honesty and the frozen window — the ceiling

1. `LoadRecordedFramesRequest` (`:245`) gains:
   - `untilIso?: string` — an **upper** `created_at` / `ts` bound, applied
     **server-side** in both queries (`:364`, `:401`) plus the client-side guard
     mirroring the existing pattern at `:410`.
   - `full?: boolean`.
   **Do not touch `sinceIso`'s existing asymmetry** (the telemetry source filters
   it client-side at `:410` with no `.gte` in the query). It is observed and
   recorded here; changing it is out of scope. Note it in the report.

2. `RecordedFrameLoad` (`:230`) gains:

```ts
/** Exact row count for each source under the SAME filters as the read.
 *  `null` = the count could not be taken (a named readErrors entry) — never 0. */
population: { synthetic: number | null; telemetry: number | null };
```

   Counted with the existing `exactCountOrThrow`
   (`api/cwf/_lib/persistence/countGuard.ts:39`), which already throws
   `CountUnavailableError` on both the error and the bodiless-204 branches. Catch
   it **here**, record a named `readErrors` entry, and set `population` to `null`.
   Never fold to 0.

3. **`truncated` is redefined** and its doc comment rewritten to say so:

```
population known  → truncated.X = queried.X < population.X
population null   → fall back to the old conservative rule (queried.X === limit)
                    AND push a caveat stating the verdict is limit-derived,
                    not population-derived.
```

4. **`CLARIFICATION_LENS_MAX_LIMIT` is retired.** Grep every usage (`:99`,
   `:337`, the CLI, the tests) — do not assume the list. Replace the silent
   clamp at `:337` with:
   - a non-finite, non-integer or `< 1` limit **throws** a named error (loud,
     never a clamp);
   - `full: true` sets each source's limit to **that source's counted
     population**;
   - `full: true` with a `null` count **throws** — a full run whose population is
     unknown is not a full run, and must never silently degrade into a bounded
     one.
   `CLARIFICATION_LENS_DEFAULT_LIMIT = 500` is unchanged.

### G6 · The CLI — `scripts/runClarificationLens.ts`

- `--until <iso>`. **When absent, the CLI stamps it to the run start
  (`new Date().toISOString()`) and prints it.** The clock lives here on purpose:
  `clarificationLens.ts` is forbidden from reading a wall clock, and
  `__tests__/clarificationLens.test.ts:272–274` asserts that against the module's
  own source. **That test must remain unmodified and green.**
- `--all` → `full: true`. `--all` together with `--limit` is a contradiction:
  fail loudly, do not pick a winner.
- `--limit` no longer advertises a maximum (`:69`).
- Always print, in every mode: the pinned window, `population` per source
  (`unread` when null), `queried`, the truncation verdict **and how it was
  derived**, and the whole `readIntegrity` block including its zeros.

---

## §4 · WHAT IS NOT IN THIS PHASE — named, not silent

- **Memoising the per-frame registry read.** It would cut the run cost, and it
  would change what the lens measures (production re-reads per turn). Named,
  deliberately open, decided on this phase's own timing evidence.
- **The 3× run-rate spread** between the two S81 L5000 runs — recorded by S81 as
  uninvestigated, still uninvestigated.
- **The `TypeError: terminated` root cause.** This phase makes it *visible*, not
  *impossible*.
- **`sinceIso`'s client-side/server-side asymmetry** (G5.1).
- **MA-RERUN-2.** It is the next item and consumes this phase's `--all` output.
- **The safe fault-injection affordance** (register v84 §4, unhoused). §5's P2
  works around its absence with a temporary local patch; that workaround is
  evidence FOR the item, not a substitute for it.

---

## §5 · POST-DEPLOY PROOF (S63-1 — merge is not proof)

Four reads. **P1, P2 and P4 are yours; P3 is the Architect's.** All run on the
merged `master` build. The lens is a CLI against the live governed DB — no
Vercel deploy is required for P1/P2/P4; P3 requires the deployed turn code.

**P1 · the ceiling mechanism (minutes).** A bounded-window run
(`--since`/`--until` over a short window) where `population.synthetic` is a
number, `queried.synthetic === population.synthetic`, `truncated.synthetic ===
false`, and no TRUNCATED caveat appears. Positive control: the same window with
`--limit` set below the population reports `truncated: true` **with the
population number beside it**.

**P2 · BUG-008 closure — the bucket's own wording, not this phase's.** Quoted
verbatim from `REGISTER-BUG-BUCKET-v9`:

> With a per-frame registry read **forced to fail** for a known subset of frames,
> one run produces JSON evidence carrying a countable field naming how many
> frames were evaluated on the fallback, and which — cross-checked against the
> `[Clarify]` stderr count for the same run, the two agreeing exactly.
> **Positive control:** a clean run reports that field as **`0`**, present and
> zero — never absent.

The fault-injection affordance does not exist. Force the failure with a
**temporary, uncommitted** local patch to `EntityRegistryRepository.listByBackend`
that throws for a known subset, run once, then revert. The report must carry the
patch verbatim, the counts from both sides, and a `git status` showing a clean
tree afterwards. **The patch must never reach the branch.**

**P3 · production parity (Architect).** After deploy the Architect reads Vercel
runtime logs for `Clarify` and confirms every line carries a `reads=` token. No
owner step.

**P4 · at scale (1–3 hours, expected).** One `--all` run over the frozen corpus:
`population` and `queried` agree on both sources, `truncated` is `false` on both,
`readIntegrity` is reported. **Keep the JSON locally — it is MA-RERUN-2's
input.** Report aggregates only.

**BUG-005 constraint, binding on all four:** the stderr streams carry verbatim
entity surfaces from organic turns, and the JSON carries recorded frames.
**Neither is ever committed, pasted whole, or quoted beyond aggregates.**

---

## §6 · CI, RESEAL, AND THE FOOTGUN

Five gates must be green on the PR head (`npm run test` is the sole test
arbiter, S37-2):

1. **Build and Test** — `check:tenant-zero`, `build` (which runs
   `check:doc-drift` at its end), `test`
2. **coverage** — `test:coverage`, ratchet floor never lowered
3. **rule26** — `test:rule26` (chronic flake F-BW01: at most ONE ordered rerun,
   and only on a signature match)
4. **eval-canary** — structurally skipped on PR runs by the spend fence; a skip
   is **not** a failure

`in_progress` or `null` is **NOT** a pass. Report each conclusion by name.

**Reseal.** `api/cwf/_lib/**` is a mapped code area, so the drift guard will
fire. This phase adds no topology node, edge, table, gate stage, endpoint or
authority — a stamped ctx field and a counter are **below diagram altitude**, so
this is a **hash-only reseal**, `rev 189 → 190`, no redraws. Run `npm run reseal`
on a clean tree and write the reviewNote yourself.

**The known footgun (F185/F190 family):** `check:doc-drift` DETECTS from the
working tree but names culprits from committed history, so it can blame a file
this phase never touched. If it does, run it once from a clean-anchor worktree at
`b960a1c9` and attribute from that.

---

## §7 · REPORT — what the hand-back must contain

1. Branch name and head SHA.
2. The §0 numbers, each computed by you.
3. Per gate G1–G6: what changed, in which file and at which line, and the
   mutation control that proves each new rule fires **and** does not fire on the
   innocent case.
4. Test deltas: files and count, before → after.
5. All five CI conclusions by name.
6. The reseal: rev, tabs, hash-only confirmation.
7. P1, P2 and P4 in full, aggregates only — including the P2 patch verbatim and
   the clean `git status` after reverting it.
8. Anything you found that this brief did not anticipate, **by name**. Scope
   growth is legitimate when declared (FIX-SCOPE-TRUTH-1); silent growth is not.
9. If you disagree with a gate, say so in the report **before** implementing a
   different shape.

**Do not merge.** The Architect reviews from a fresh clone (RULE-25) and issues a
verbatim GO with the merge message.

<!-- END · PHASE-LENS-CEILING-1-v1 -->
