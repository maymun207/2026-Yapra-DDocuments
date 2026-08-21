# PHASE-LINE-RESOLUTION-DIAGNOSIS-1 · v1 — walk item #24 · lane AG-3

<!-- Architect-authored · S95 · SC-A class: READ-ONLY instrument, new files
     only. Self-contained; lanes cannot see project files. -->

## PRECONDITION (S47-1)
Fresh FULL clone. `git rev-parse origin/master` expected
`d8f33f80a5ba3c76fa710e0c73918664f0ffd979`; Wave-1 lanes may merge while you
work — if master differs, RECORD the SHA you branched from and proceed (your
fence is disjoint from Wave 1 by design; you will rebase before merge).

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-3** · branch **`phase/line-resolution-diagnosis-1`** · PUSH to
origin · OPEN PR against master (CI on PR head) · report
**`docs/relay/PHASE-LINE-RESOLUTION-DIAGNOSIS-1-report.md`** · merge only on
Architect GO. `--no-ff`.

## FENCE (hard)
NEW files only: `api/cwf/_lib/replay/lineResolutionLens.ts` + its test file +
`scripts/runLineResolutionLens.ts` (+ optional small fixtures dir). You may
IMPORT existing modules; you may not EDIT any existing file. Zero migrations ·
zero `shared/` · zero seal territory — your report includes
`check:doc-drift` output (expected: no drift) and
`git diff --name-only <base>..HEAD` verbatim.

## MISSION
The register carries a claim: **~785 unresolved LINE-layer entity references**.
That number is a CLAIM, not the world (TOTAL-45). Build the instrument that
(a) RECOMPUTES it from ground truth and (b) CLASSIFIES every unresolved case
by failure mode, so #23 (PathB) and #25 (Graph-KB) are designed against
measured reality, not an anecdote.

## BUILD (house Lens pattern — mirror `clarificationLens.ts` + its runner)
1. **Core `lineResolutionLens.ts` (pure, injectable):** given (i) the entity
   registry LINE-layer rows and (ii) the resolution attempt records the house
   already produces (the same sources `clarificationLens` reads — follow its
   repository seams; READ-ONLY, C1: zero writes anywhere), emit per-case rows:
   `{ surfaceForm, attemptedLayer, outcome, failureClass, parentContext }`.
2. **failureClass = CLOSED vocabulary** (extend only with a named reason in
   the report): `suffix-form` (ZONE_LINE_SUFFIX_WORDS family missed) ·
   `fuzzy-miss` (near-name existed, tier didn't reach) · `absent-from-registry`
   · `parent-guard` (JOIN-law: name matched but parent disambiguation failed —
   Glazur3 class) · `multi-span` ("3-4-5" style multi-line utterance) ·
   `non-line-misroute` (ref resolved to another layer) · `unclassified`
   (MUST stay possible and countable — a taxonomy that cannot say "I don't
   know" lies; MEASURE-READ-HONESTY-1).
3. **Runner `runLineResolutionLens.ts`:** mirrors the existing lens runners'
   pagination discipline — PostgREST caps at 1000 rows with NO signal; page to
   exhaustion and report `population` vs `read` with an explicit
   `truncated:false` proof (the LENS-CEILING lesson: an instrument that
   silently samples is void). Output: one JSON summary (counts per
   failureClass, total, population) + a per-case NDJSON for Architect drill.
4. **Honesty contracts:** empty result ≠ zero unresolved — the runner
   distinguishes "no data read" from "read 0 rows" and refuses a verdict on an
   unread source (three states, never two).

## BIRTH PROOF (S93-1 — machine-checkable; fixtures, not live)
Fixture set exercising EVERY failureClass at least once + one healthy resolved
case (S66-1 positive control: lens reports it resolved, NOT as a failure).
Mutation controls (D-5): (a) delete one classifier branch → its fixture case
falls to `unclassified` and the test REDS on the expected-class assertion;
(b) truncation control: feed a page-capped double → runner REDS refusing the
verdict. Live production run is NOT in this phase — it is the named post-merge
proof read (S63-1), executed by the Architect.

## REPORT MUST CONTAIN
Fixture census + class table · both mutation transcripts · drift output ·
diff name-list · test deltas (computed) · `>> BLOCK: AG-3 <<` + head SHA.

## DO-NOT
No edits to existing files · no DB writes of any kind · no Vercel CLI in
clones · absolute paths in scratch writes (S80-1).

<!-- END · PHASE-LINE-RESOLUTION-DIAGNOSIS-1-v1 -->
