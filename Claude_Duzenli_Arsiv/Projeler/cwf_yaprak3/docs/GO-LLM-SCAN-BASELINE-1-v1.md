# GO-LLM-SCAN-BASELINE-1 · v1 — Architect → AG-3

**Review verdict: PASSED.** Independently verified on your head `afa885f`:
62/62 across both suites. The ordering module is the part I checked hardest,
because it is the whole reason this instrument can be trusted later — you
rejected hash-ordering for the right reason (deterministic and
non-alphabetical, yet still a FIXED function of the catalog, so it fails
per-query distinctness), and you named position bias explicitly rather than
treating candidate order as an implementation detail. That is exactly the
defect class the house has open elsewhere.

## STEPS AT YOUR MERGE TURN
Merge order in this wave is **whoever is ready first** — there is no queue
position to wait for. Check master, then go.
1. `git fetch origin`. Rebase onto current `origin/master` if it has moved
   from `d8e76884318bba818d910a8dc0a838d163f94b89`.
2. Read `docVersion` MASTER-side, take the NEXT number (rev 236 → **237** if
   you are first), `npm run reseal` on the REBASED worktree, bump in the SAME
   commit. A demanded REDRAW is a STOP-and-report.
3. RULE 3 `.agents/CHANGELOG.md` + KB entries — already in your diff; if
   another lane merged first, rebase keeps all entries, yours on top.
4. CI on the PR head: every job `completed` + `success`
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` is expected;
   `check:doc-drift` goes green with step 2).
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report merge SHA, post-merge `origin/master`, resulting docVersion.

## VERBATIM MERGE MESSAGE
```
LLM-SCAN-BASELINE-1: the number the vector will have to beat

A vector store that is not measured against the cheap incumbent is a
purchase, not an improvement. This lands the incumbent's measurement first,
before anyone has an interest in the answer: an LLM-scan retrieval baseline
over the corpus already in this repository, scored on the same task #27 would
serve.

The scoring set is not hand-labelled. It is drawn from the synthetic
question-set corpora, whose rows already carry their own ground truth in
tags and intendedToolCategories; where a needed label does not exist, the
slice is EXCLUDED by name rather than guessed at, because a benchmark that
quietly invents its own labels measures the labeller.

Candidate ORDER is treated as part of the instrument, not as an
implementation detail. LLMs have a well-known position bias, so a fixed
candidate order silently converts that bias into a score. Alphabetical order
is rejected, and so is the catalog's declaration order, which leaks authoring
sequence. Hash-ordering is rejected too, and for a subtler reason: it is
deterministic and non-alphabetical and still fails the second property,
because it remains a FIXED function of the catalog rather than varying per
query. The rule that survives is stated in code and pinned by test.

Cost is a column, not a footnote. #27's entire argument is quality-per-cost,
so recall@k and precision@k for k in {1,3,5} ship alongside per-query latency
and per-query token cost; a baseline without a cost column cannot be beaten
honestly.

Three read states everywhere — measured, no-data, unread — and a truncated
read produces a REFUSED verdict rather than a low score. PostgREST caps
selects at 1000 rows with no signal, so the runner pages to exhaustion and
prints population against read; a refused verdict is not quotable as a
number.

No vector store, no embeddings, no comparison claims, no live run. This ships
the instrument and its fixture-proven behaviour. The live baseline is the
named post-merge proof read, and its numbers are what #27 will have to clear.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-3 <<
