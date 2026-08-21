# PHASE-LLM-SCAN-BASELINE-1 · v1 — walk item #26 · lane AG-3

<!-- Architect-authored · S95 Wave 2 · SC-A class. Self-contained. -->

## PRECONDITION (S47-1)
Fresh FULL clone. Expected base
`d8e76884318bba818d910a8dc0a838d163f94b89` · docVersion **rev 236** ·
72 migrations · 14 ADRs · 541 test files. If master moved, record the actual
base and proceed.

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-3** · branch **`phase/llm-scan-baseline-1`** · PUSH · OPEN PR ·
report **`docs/relay/PHASE-LLM-SCAN-BASELINE-1-report.md`** · merge on GO,
`--no-ff`, squash banned.

## WAVE-SEAL LAW (binding)
Do NOT reseal during the build. At your merge turn: rebase → read docVersion
MASTER-side → next number → `npm run reseal` on the REBASED worktree → bump in
the same commit. A demanded REDRAW is a STOP. `.agents/CHANGELOG.md` + KB
entries are required by RULE 3 and expected to conflict; late-merge on top,
keep every lane's entry.

## WAVE CONTEXT (S88-1) — your fence
NEW files under `api/cwf/_lib/replay/**` + `scripts/**` + your tests. You may
IMPORT existing modules; **edit none**. Zero migrations · zero `shared/**` ·
zero `src/**` · zero admin surface. Report `git diff --name-only` verbatim.

## MISSION — the bar the vector must clear
Item #27 proposes a vector index (Qdrant · bge-m3) for corpus retrieval.
**A vector store that is not measured against the cheap incumbent is a
purchase, not an improvement.** This phase builds the incumbent's measurement:
an LLM-scan retrieval baseline over the existing corpus, scored on the same
task #27 would serve, so that when the vector arrives there is a NUMBER it
must beat — recorded BEFORE anyone has an interest in the answer.

## BUILD
1. **Task definition, written before any measurement:** the retrieval question
   is "given a user utterance, which corpus lines/entities are the correct
   candidates?" Define the scoring set from material ALREADY in the repo —
   the synthetic question-set corpora (v1/v2/v3 and the new
   `cwf-synthetic-question-set-line-1`, whose rows carry `tags` and
   `intendedToolCategories`, i.e. their own ground truth). No new labelling by
   hand; if a needed label does not exist, the report says so and that slice
   is EXCLUDED by name rather than guessed.
2. **The baseline scanner:** a straightforward LLM-scan over candidates —
   deliberately the SIMPLE incumbent, not a tuned system. Follow the house's
   existing runner shape (`goldenBatchRunner` / `memoryAbLens` are the local
   precedents; mirror their repository seams and their pagination discipline:
   PostgREST caps at 1000 rows with no signal — page to exhaustion, print
   `population` vs `read`, and refuse a verdict on a truncated read).
3. **Metrics, fixed in code before results exist:** recall@k and precision@k
   for k ∈ {1,3,5}, per-query latency, and per-query token cost. **Cost is
   part of the baseline, not a footnote** — #27's whole argument is
   quality-per-cost, and a baseline without a cost column cannot be beaten
   honestly.
4. **Three read states everywhere** (`measured` / `no-data` / `unread`) and a
   refusal path: an unread source produces a REFUSED verdict, never a zero.
   A refused verdict must not be quotable as a score.
5. **Determinism + provenance:** every run records model id, corpus set id,
   candidate-set size, k values, timestamp, and the exact seed/ordering used
   for candidate presentation. **The candidate order MUST NOT be alphabetical
   or otherwise degenerate** — the house has an open finding that an
   instrument selecting its own sample lexicographically is not sampling.
   State the ordering rule explicitly and pin it with a test.
6. **NOT in this phase:** no vector store, no Qdrant, no embedding calls, no
   comparison claims, no live production run. This phase ships the instrument
   and its fixture-proven behaviour. The live baseline run is the named
   post-merge proof read (S63-1), Architect-ordered, and its numbers are what
   #27 will have to beat.

## BIRTH PROOF (S93-1, fixtures — no live calls)
(a) a fixture where the correct candidate is rank 1 → recall@1 = 1;
(b) a fixture where it is rank 4 → recall@1 = 0, recall@5 = 1 (proves k is
real, not decorative); (c) truncation control → REFUSED verdict, not a low
score; (d) an empty candidate set → `no-data`, distinguished from `unread`;
(e) S66-1 positive control: clean run prints
`queries=<n> population=<p> read=<r> truncated=false` and the metric table.

## REPORT MUST CONTAIN
Task definition + which corpus slices are in and which are EXCLUDED by name ·
metric definitions · ordering rule · all five birth-proof transcripts · full
diff name-list · computed test deltas · drift output · `>> BLOCK: AG-3 <<`
with head SHA.

## DO-NOT
No edits to existing files · no embedding/vector work · no live LLM spend
beyond what fixtures require (state the spend, if any) · no comparison claims
· no Vercel CLI · absolute paths in scratch writes.

<!-- END · PHASE-LLM-SCAN-BASELINE-1-v1 -->
