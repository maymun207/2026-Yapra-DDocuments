# PHASE-CORPUS-LINE-FILL-1 · v1 — walk item #22 · lane AG-4

<!-- Architect-authored · S95 · SC-A class: new corpus module + registration,
     synthTraffic family only. Self-contained. -->

## PRECONDITION (S47-1)
Fresh FULL clone. Expected base `d8f33f80a5ba3c76fa710e0c73918664f0ffd979`;
if master moved (Wave-1 merges), record actual base and proceed — your fence
is disjoint; rebase before merge.

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-4** · branch **`phase/corpus-line-fill-1`** · PUSH · OPEN PR against
master · report **`docs/relay/PHASE-CORPUS-LINE-FILL-1-report.md`** · merge on
GO only. `--no-ff`.

## FENCE (hard)
`api/cwf/_lib/synthTraffic/**` ONLY: one NEW corpus module
`questionSetCorpusLine1.ts`, registration in `seedSyntheticQuestionSets.ts`
(additive lines only — show the diff hunk in the report), NEW test file(s).
Zero migrations · zero seal · zero `shared/` · no edits to v1/v2/v3 corpora
(their text is FROZEN — typos are data). Report carries `check:doc-drift`
(expected clean) + `git diff --name-only <base>..HEAD` verbatim.

## MISSION
LINE-layer raw material for #23 (PathB/BM25) and #25 (Graph-KB): a DESIGNED
matrix corpus (v1's family, NOT v3's real-sample family — do not mix the two
kinds, the house law is NOT-A-SUPERSET: standalone set, independently
measurable, own set id `cwf-synthetic-question-set-line-1`, idx contiguous
from 0, no gaps).

## BUILD
1. **Matrix, stated before authored** (the report shows the matrix FIRST,
   then the utterances filling it): axes = {suffix form: hattı/hattında/
   hattının + bare} × {reference kind: exact name · fuzzy/typo · multi-span
   "3-4-5" style · parent-ambiguous (same name under two parents — the
   Glazur3/JOIN-law class) · absent-from-registry} × {question intent: status
   · metric · linestop}. Fill to full coverage; target 18–24 utterances; every
   cell either filled or NAMED as deliberately empty with one-line reason
   (coverage-is-config: an unfilled cell must be visible, never silent).
2. **House conventions copied from `questionSetCorpusV3.ts`:** same row shape
   (`idx` 0-based contiguous · `tags` · `intendedToolCategories`), header
   comment stating set identity, revision, design intent, and the
   NOT-A-SUPERSET declaration. Turkish utterances, realistic operator
   register; entity names ONLY from vocabulary already present in the repo's
   corpora/tests (e.g. zone/line surface forms the resolver tests use) —
   invent NO new tenant vocabulary.
3. **Gates you must pass locally and paste output for:** `check:tenant-zero`
   (the corpus is code; tenant-vocabulary law applies) + the synthTraffic
   suite + your new tests.
4. **Tests (new file):** (i) idx contiguity + uniqueness; (ii) every matrix
   cell maps to ≥1 utterance OR is in the named-empty list — the matrix lives
   in code as data so this is asserted, not eyeballed; (iii) set id and
   NOT-A-SUPERSET: zero utterance-text overlap with v1/v2/v3 (byte compare);
   (iv) every row's `intendedToolCategories` non-empty and drawn from the
   category vocabulary the seeder already accepts.
5. **NOT in this phase:** publishing/seeding to the live DB (ABSENCE-ONLY seed
   runs post-merge as the named proof step, Architect-ordered) · injector
   schedule changes · any measurement claims.

## BIRTH PROOF (S93-1, machine-checkable)
Mutation controls (D-5): (a) delete one utterance → cell-coverage test REDS
naming the cell; (b) duplicate an idx → contiguity test REDS; (c) copy one
v3 utterance verbatim → overlap test REDS; (d) S66-1 positive control: clean
tree passes printing `cells=<n> filled=<m> named-empty=<k> utterances=<u>`.

## REPORT MUST CONTAIN
The matrix table · full utterance list · all four mutation transcripts ·
gate outputs (tenant-zero + suite) · diff name-list · test deltas ·
`>> BLOCK: AG-4 <<` + head SHA.

## DO-NOT
No edits outside synthTraffic · no live DB contact · no Vercel CLI · absolute
paths in scratch writes (S80-1).

<!-- END · PHASE-CORPUS-LINE-FILL-1-v1 -->
