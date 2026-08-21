# GO · `LENS-CEILING-1` — merge instruction · v1

<!-- GO-LENS-CEILING-1-MERGE-v1 · 2026-08-04 · S82 · Architect: Claude (Opus 5).
     ONE self-contained relay (D-2). Issued after a RULE-25 review from a fresh
     clone. THE GO IS CONDITIONAL: steps 1–3 are blocking and are checked BEFORE
     the merge command is run. -->

---

## §0 · REVIEW RESULT — what the Architect verified independently

Fresh full clone, `git fetch --all`, then re-derived. **Nothing below is taken
from the report.**

| Claim | Verified | Command |
|---|---|---|
| `origin/master` unmoved | `b960a1c9c44120f1e8821609d1f9acc4c2612646` ✓ | `git rev-parse origin/master` |
| branch head | `6bbb67c2018bfb64b95ab97c0eed5e2d9992c9ec` ✓ | `git rev-parse origin/phase/lens-ceiling-1` |
| master is an ancestor of the branch | **YES** ✓ | `git merge-base --is-ancestor` |
| diffstat | 10 files, **+1368 / −65** ✓ | `git diff --stat origin/master...` |
| `src/` untouched | **0 lines** ✓ | `git diff … -- src/ \| wc -l` |
| migrations | 67 ✓ | `ls supabase/migrations \| wc -l` |
| test files | **447** ✓ | `find src shared api -name '*.test.ts*'` |
| ADRs | 13 ✓ | `ls docs/adr` |
| docVersion | **rev 190 · 2026-08-04** ✓ | `manifest.json` |

**Grep pins, each run by the Architect:**

- `CLARIFICATION_LENS_MAX_LIMIT` → 4 hits, **all four inert**: one comment
  recording the retirement, three inside the test that asserts the export is
  gone. The `export` and the clamp are both absent. On `origin/master` the same
  grep returns exactly **2** — AG's census claim is confirmed to the number.
- `P2 FAULT INJECTION` / `__p2n` → **0** on the branch. The patch never landed.
- Wall clock in `clarificationLens.ts` → `Date.now()` **0**, argless `new Date()`
  **0**. C-TIME intact; the clock lives in the CLI as designed.
- **G1** — `readFailures` accumulated at `:157`, pushed at both catches
  (`:207`, `:245`), carried on **all four** returns (`:186`, `:199`, `:216`,
  `:238`, `:247`). No return path can forget it.
- **G2/G3 parity** — `readsToken` computed at `:425`, `ctx.clarifyRead` stamped
  at `:432`, the `[Clarify]` line at `:441` — **one value, one site**, and the
  stamp precedes `computeClarification` at `:446`, so every outcome branch
  carries the same record. Parity is structural, not remembered.
- **G4** — `REPLAY_CTX_STAMPED_FIELDS = ['entityResolutions', 'clarifyRead']`;
  `entityRead: SeamEntityRead | null` is a **required field with a nullable
  value** on both the evaluation and the probe; guardian probes carry it;
  `readIntegrity` is required in the evidence; the caveat fires on `degraded > 0`
  **or** `unknown > 0`.
- **G5, the load-bearing one** — the count and the read are built by the **same
  function**: `applySyntheticFilters` / `applyTelemetryFilters` wrap both the
  `{count:'exact', head:true}` query and the paged read. The equality is by
  construction, and `lensCeiling.test.ts:345` pins it
  (*"the count mirrors the READ's filters exactly"*). **That test is what makes
  the two `as unknown as` casts acceptable** — the casts sit inside those two
  helpers, the paged call sites keep their real types, and the property the
  casts could have broken is asserted directly.

**Not verified by the Architect:** CI conclusions. The GitHub API is rate-limited
from this sandbox (`API rate limit exceeded`, confirmed this session), so CI
re-verification is folded into STEP 2 below as a blocking gate — the standing
pattern for this project.

---

## §1 · TWO ARCHITECT PREMISE ERRORS IN THE BRIEF — mine, recorded

Both were caught by AG and declared rather than absorbed. Both go to the S82
premise ledger.

1. **The MAX_LIMIT site list was invented.** The brief said *"grep every usage
   (`:99`, `:337`, the CLI, the tests) — do not assume the list."* The
   instruction was right; the parenthesis contradicted it by naming sites the
   Architect had not verified. There were **two**, both in one file. Writing "do
   not assume" and then supplying an assumed list is worse than supplying
   neither.
2. **G6's premise about `:69` was false.** That line described what `--limit`
   means; it never advertised the 5000 cap. No line did. The gate's intent was
   met anyway, but the stated reason was wrong.

**Ratified, by name (FIX-SCOPE-TRUTH-1):** AG's scope addition — the
`full` + `limit` contradiction throws in the **library**, not only in the CLI as
G6 specified. Correct call. A silent override inside `loadRecordedFrames` would
be the same class of defect this phase exists to remove, and a rule enforced only
at the outermost layer is not enforced.

**Recorded, not minted as a new law:** AG's mutation harness produced one false
GREEN (`tail -6` pushed the vitest summary out of the window) and was caught by
its own positive control — the empty test count. This is the standing
`cmd | tail` footgun and S68-4 (*a check that reports but does not gate is not a
check*), a repeat instance rather than a new rule. The law count does not grow
for a known shape.

---

## §2 · THE DEVIATION THAT DECIDES THE MERGE SHAPE

The brief (§5) said all proofs run **on the merged `master` build**. P1 and P2
were run on the **branch head**, pre-merge, and this was not declared in §9.

It is resolvable rather than fatal, because `origin/master` is a verified
ancestor of the branch: a `--no-ff` merge produces a merge commit whose **tree is
identical** to the branch head's. STEP 5 below proves that identity rather than
assuming it — which is what transfers P1 and P4 onto master.

**BUG-008 is the exception, and it is not negotiable.** `BUG-CARRY-1` rule 4 is
owner-legislated and stricter: *a bug closes ONLY by its own named post-deploy
live proof read.* A tree-identity argument is exactly the kind of reasoning that
rule exists to refuse. **P2 is therefore re-run on merged `master`** (STEP 6). It
is a two-minute run; the strictness costs almost nothing and the alternative is a
closure resting on an equivalence argument.

---

## §3 · BLOCKING STEPS — in order, before any merge command

### STEP 1 · P4 must be COMPLETE and PASSING

At hand-back P4 was **RUNNING**. Do not merge until it has finished. Pass
condition, all four:

- `population.synthetic` and `population.telemetry` are **numbers**, not `null`;
- `queried.X === population.X` on both sources;
- `truncated.synthetic === false` **and** `truncated.telemetry === false`;
- `readIntegrity` present, with `unknownFrames === 0`.

`readIntegrity.degradedFrames > 0` on a real two-hour run is **not** a failure —
it is the instrument working, and the number plus its caveat are the result.
Report it either way.

**If P4 fails or cannot complete: STOP. Do not merge. Report instead.**

### STEP 2 · CI, five gates, on `6bbb67c2`

`/actions/runs?head_sha=6bbb67c2018bfb64b95ab97c0eed5e2d9992c9ec`. **`in_progress`
or `null` is NOT a pass.** Required: build (20.x) · build (22.x) · coverage ·
rule26 — all `completed/success`; eval-canary `skipped` (spend fence, structural
on PR). Report each conclusion by name, read at merge time — not the values from
the hand-back.

### STEP 3 · The anchor has not moved

`git fetch --all && git rev-parse origin/master` must still be
`b960a1c9c44120f1e8821609d1f9acc4c2612646`. **If it has moved: STOP and report.**
Do not rebase, do not merge, do not adapt.

---

## §4 · MERGE — verbatim message, `--no-ff`, squash banned

```
git checkout master && git pull --ff-only
git merge --no-ff phase/lens-ceiling-1 -F <message file>
```

**The message, verbatim:**

```
merge: LENS-CEILING-1 — a measurement that can say it was interrupted

The clarification lens could not read its own corpus, and could not say
so. Both halves are closed here, together, because closing only the first
produces a longer measurement with the same blindness.

THE CEILING WAS THE WRONG SHAPE, NOT THE WRONG NUMBER.
CLARIFICATION_LENS_MAX_LIMIT = 5000 is RETIRED, not raised: the corpus
(6626 at S81) had outgrown it, the synthetic injector writes a row every
minute, and any literal is outgrown by construction. `truncated` was a
statement about our own limit; it is now a statement about the corpus,
counted with exactCountOrThrow under the SAME filter functions that build
the read (lensCeiling.test.ts:345 pins that equality, which is what makes
the two supabase-js generic casts safe). A population that cannot be
counted is null plus a named read error, never 0; the verdict then falls
back to the old conservative rule and DISCLOSES that it did. `--all`
sizes each source to its own counted population and REFUSES to run
without a denominator. A bad limit is loud (ClarificationLensLimitError),
never clamped. `--until` freezes the window, defaulted by the CLI at run
start — the clock stays outside the lens, and the C-TIME ban that forbids
it there is unmodified and green.

BUG-008: THE ABSENCE WAS IN THE SEAM, NOT ONLY IN THE EVIDENCE FILE.
loadEntityCandidates recorded a failed governed read to console.warn and
to nothing else, and for a FACTORY frame a thrown discovered-read whose
floor read succeeded returned values byte-identical to a legitimately
empty layer — so returning `scope` could never have closed this.
EntityReadFailure ('discovered' | 'floor') is named AT the catch sites and
carried on all four return paths from an accumulator declared beside
layerStatus, so a future return path inherits it rather than having to
remember it. One value, one site: the `reads=` token on the born-loud
[Clarify] line and the ctx.clarifyRead stamp are computed together and
stamped BEFORE the outcome branches, so a HIGH and a NONE carry the same
record — ADR-013 DECISION-PARITY-1 by construction. The lens lifts the
stamp off the context it built (evaluations and guardian probes alike,
including the throwing branch) into a REQUIRED, nullable entityRead, and
THREE states never collapse into two: null = the seam never reached the
read, [] = clean, non-empty = degraded. readIntegrity reports every
number as a present zero on a clean run; load.readErrors is NOT widened,
because one field with two meanings is the defect.

PROVEN, NOT ASSERTED. 11 mutations, 11 caught, each including an
innocent-case probe: suppressing `reads=ok` reds, folding null into clean
reds, ignoring the guardian reds, restoring the silent clamp reds,
folding an uncountable population to 0 reds, a wall-clock read in the
lens reds. P2 forced every third governed registry read to throw and the
JSON's degradedFrames matched the stderr's reads=discovered count exactly
across 93 seam invocations, with load.readErrors staying empty — the two
surfaces did not get conflated. The temporary fault patch was reverted;
grep over the tree returns zero.

Tests 445/4965 -> 447/5015. Zero migrations, zero Operator steps, zero
governed writes, zero src/ lines. Reseal rev 189 -> 190, hash-only, five
tabs, no redraws: a stamped ctx field, a counter and a CLI flag add no
topology node, edge, table, gate stage, endpoint or authority. Every
drift culprit named by the guard was a file this phase edited — no
F185/F190 misattribution.

DECLARED, NOT ABSORBED: the brief's MAX_LIMIT site list was invented (two
sites, both in one file) and its claim that the CLI advertised the cap was
false — both Architect premise errors, both caught by AG. The full+limit
contradiction throws in the library rather than only the CLI, a scope
addition ratified under FIX-SCOPE-TRUTH-1. AG's mutation harness produced
one false GREEN from a tail-truncated summary and its own positive
control caught it — the standing cmd|tail footgun, S68-4's shape, not a
new law.

NOT DONE HERE, each named: BUG-008 does not close on this merge (its
post-deploy proof is a separate read, BUG-CARRY-1 rule 4); the per-frame
registry read is still uncached and still ~2 reads per frame; the 3x
run-rate spread from S81 is still uninvestigated; TypeError: terminated
is now VISIBLE, not impossible; sinceIso's client-side/server-side
asymmetry on the telemetry source is recorded and untouched.
```

### STEP 5 · TREE IDENTITY — the step that transfers the proofs

Immediately after the merge, from the merge commit:

```
git diff --quiet 6bbb67c2018bfb64b95ab97c0eed5e2d9992c9ec HEAD && echo "TREE IDENTICAL"
```

**It must print `TREE IDENTICAL`.** If it does not, the merge changed a file and
every pre-merge proof is void — report and stop. Then push.

---

## §5 · AFTER THE MERGE

### STEP 6 · P2, re-run on merged `master` — BUG-008's actual closure

Same shape as the hand-back's P2, on the merged build: the temporary uncommitted
patch, one degraded run, one clean run, revert, `git status` clean, and a grep
proving the patch left no residue. Report both runs' numbers and the stderr
cross-check. **This, and not the merge, is what closes BUG-008.**

### STEP 7 · Report

Merge commit SHA (with `git log -1 --format=%P` showing **two** parents) · the
five CI conclusions read at merge time · P4's four pass conditions with their
numbers · the `TREE IDENTICAL` line · STEP 6's two runs · final `git status`.

**The Architect's own read (P3), no owner step:** after the deploy converges, the
Architect reads Vercel runtime logs for `Clarify` and confirms every line in
production carries a `reads=` token. That result is reported by the Architect,
not by AG.

<!-- END · GO-LENS-CEILING-1-MERGE-v1 -->
