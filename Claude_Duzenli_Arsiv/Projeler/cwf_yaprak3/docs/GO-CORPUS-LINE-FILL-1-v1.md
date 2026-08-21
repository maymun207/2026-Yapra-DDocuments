# GO-CORPUS-LINE-FILL-1 · v1 — Architect → AG-4

**MERGE ORDER CHANGED BY OWNER RULING: you are SECOND** (after AG-3's
`phase/line-resolution-diagnosis-1`). #40/#41 rebase onto both of you.

## STATE PRECONDITION (S47-1) — WAIT FOR IT
Do NOT start until `git fetch origin && git rev-parse origin/master` shows a
SHA **different from** `d8f33f80a5ba3c76fa710e0c73918664f0ffd979` AND
`git log --oneline -1 origin/master` names LINE-RESOLUTION-DIAGNOSIS-1.
That merge mints docVersion **rev 234**. Poll every few minutes; if it has
not landed within 60 minutes, report instead of proceeding.

## STEPS (in order)
1. `git fetch origin` + rebase your branch onto the NEW origin/master.
2. **DROP your provisional reseal commit `aff8fdf`** (per RULING R2) — the
   rebase should make this natural; verify with `git log --oneline` that no
   reseal/docVersion commit of yours survives before you re-do it.
3. `npm run reseal` on the rebased worktree. Read docVersion from the MASTER
   side and take the NEXT number — expected **rev 234 → rev 235 ·
   2026-08-12**, but READ it, do not assume (your own Footgun-6 procedure, now
   wave law). Bump in the SAME commit as the reseal. Expected: hash-only,
   1 tab (Architecture Map). A demanded REDRAW = STOP and report.
4. One additive `.agents/CHANGELOG.md` entry at the top, house format.
5. Push; wait for CI on the PR head. **BLOCKING:** all jobs `completed` +
   `success` (`in_progress`/`null` is NOT a pass); `eval-canary skipped` is
   the standing PR pattern; `check:doc-drift` must be GREEN.
6. Merge `--no-ff` with the VERBATIM message below. Squash banned.
7. Report merge SHA, post-merge `origin/master`, resulting docVersion line.

## VERBATIM MERGE MESSAGE
```
CORPUS-LINE-FILL-1: a LINE-layer probe matrix, with its empty cells named

Raw material for #23 (PathB/BM25) and #25 (Graph-KB): a DESIGNED matrix
corpus in v1's family, standalone under its own set id
cwf-synthetic-question-set-line-1, NOT a superset — v1/v2/v3 keep existing,
keep being seeded, and their text stays frozen because their typos are data.

The matrix is stated before it is filled: 4 suffix forms (hattı / hattında /
hattının / bare) x 5 reference kinds (exact, fuzzy, multi-span,
parent-ambiguous, absent-from-registry) x 3 intents (status, metric,
linestop) = 60 cells. Twenty utterances is not an arbitrary point in the
18-24 band: it is the exact number that buys ALL-PAIRS coverage with exactly
one utterance per filled cell, and that bijection is what makes deleting any
utterance orphan exactly one NAMED cell. The other 40 cells are deliberately
empty, each with its own one-line reason — coverage-is-config demands the
residue be named, not waved at.

The axes, the grid and the named-empty list live in code as data, and each
utterance's cell is read off its OWN tags by cellOf(), so the tags ARE the
matrix and no parallel hand-kept index can drift from the rows it describes.

Tenant vocabulary never enters the tree: exact references carry {{LINE:n}}
template tokens filled at injection time from the live entity_registry line
layer — the first consumer of syntheticTemplateFills.ts's LINE slots.
Fuzzy and absent-from-registry cannot be tokens (you cannot author a typo of
a value resolved at injection time, and an absent name is by definition not
a registry row), so they use the neutral placeholder vocabulary already
present in this repository's resolver tests. The parent-ambiguous class is
realised STRUCTURALLY — the utterance names a line and no factory at all, so
one name under two parents cannot be told apart.

Four deliberate corruptions, each in a named Turkish typo class carried in
its tags — letter-drop, dotless-i, spurious-space, casing-collapse. Fixing
any of them deletes the probe.

Registration is additive: a fourth seedOneQuestionSet call with its own
domain, own fingerprint, own fail-open catch. v1/v2/v3 keep their argument
values, order and fingerprint inputs, so all three persisted seed_state rows
still match and stay no-ops, pinned by the existing invariance tests.
Arrival is not activation: the injector runs whichever single set
synthetic.activeSetId names, and repointing it is a separate ordered step
that this merge does not take.

Birth proof, four mutations applied by an asserting harness and reverted to
a byte-identical tree: deleting an utterance names the orphaned cell
verbatim rather than reporting a count mismatch; a duplicated idx reds both
idx nets (the sorted-sequence check and the position-agreement check are
genuinely different — a row swap passes the first and fails the second);
a v3 utterance copied in reds the overlap test; and the clean tree prints
cells=60 filled=20 named-empty=40 utterances=20, with the two sets asserted
disjoint and exhaustive.

No measurement claims anywhere: this phase supplies material and asserts
only its shape. Whether the resolver reaches ZoneZ3 from ZonZ3, or blocks on
an unqualified line name, is #23/#25's evidence to produce.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-4 <<
