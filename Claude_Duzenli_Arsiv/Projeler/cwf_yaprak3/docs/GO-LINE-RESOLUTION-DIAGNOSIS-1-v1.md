# GO-LINE-RESOLUTION-DIAGNOSIS-1 · v1 — Architect → AG-3

**MERGE ORDER CHANGED BY OWNER RULING: you are now FIRST.** Ready work merges
ahead of in-flight work; #40/#41 rebase onto you (their prompts require it).

## STATE PRECONDITION (S47-1)
`origin/master` = `d8f33f80a5ba3c76fa710e0c73918664f0ffd979`, docVersion
**rev 233 · 2026-08-12**. You hold the WAVE-SEAL TOKEN for this merge turn:
**you mint rev 234.** If master has moved when you start, STOP and report.

## STEPS (in order — do not reorder)
1. `git fetch origin` + rebase your branch onto current origin/master.
2. `npm run reseal` on the rebased worktree; bump docVersion **rev 233 → rev
   234 · 2026-08-12** in the SAME commit. Expected: hash-only, no redraw
   (your §7.1 diagnosis says 2 tabs — Architecture Map + Agent Control Plane).
   If the reseal demands a REDRAW, STOP and report — that is a different
   phase.
3. One additive `.agents/CHANGELOG.md` entry at the top, house format.
4. Push; wait for CI on the PR head. **BLOCKING STEP:** every job must be
   `completed` + `success` (`in_progress` or `null` is NOT a pass);
   `eval-canary skipped` is the standing PR pattern and is expected.
   `check:doc-drift` must now be GREEN — that is the whole point of step 2.
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report the merge SHA + the post-merge `git rev-parse origin/master` +
   the resulting docVersion line, in your report file, and push.

## VERBATIM MERGE MESSAGE
```
LINE-RESOLUTION-DIAGNOSIS-1: the 785 becomes a measurable quantity

A READ-ONLY instrument for the LINE-layer resolution failure population.
Two tiers kept deliberately apart: TIER 1 recounts through the production
seam (computeTurnClarification via evaluateRecordedFrame — nothing
reimplemented), TIER 2 classifies per REFERENCE by recomposing stageClarify's
chain from that module's exported primitives, because the seam discards which
ref failed and why. The reimplementation risk is AUDITED, not asserted:
seamParity judges every frame both ways, and a non-zero mismatch marks the
distribution provisional.

Two denominators, never interchanged: the register's 785 counts FRAMES
(byCause['entity-unresolved'] filtered to frame.object === 'LINE'), while a
failure taxonomy is only meaningful per REFERENCE. Reporting one as the other
would have called a different quantity agreement.

failureClass is a closed vocabulary — suffix-form, fuzzy-miss,
absent-from-registry, parent-guard, multi-span, non-line-misroute,
unclassified — and unclassified is reachable BY CONSTRUCTION:
absent-from-registry is a positive claim requiring a proven search space, so
it is never the fall-through. A taxonomy that cannot say "I don't know"
claims explanatory coverage it does not have.

Honesty contracts as built: three read states (no-source-read /
read-zero-rows / read-rows), refusal on an unread source, uncounted
population or truncated read, exit 2 distinct from crash, counts still
printed but labelled. Pagination reuses loadRecordedFrames with an exact
population count under the same filters; --all refuses to run without a
denominator.

Birth proof, real source deletions and both reverted: deleting a classifier
rung reds its fixture's expected-class assertion, and the report corrects the
brief — the fall-through TARGET depends on the rung (only the LAST falls to
unclassified), pinned as its own permanent test rather than glossed. The
truncation control reds both the core verdict and the rendered report against
the exact LENS-CEILING shape (1000 of 2465).

Carried forward as a named finding: multi-span damage is mostly INVISIBLE to
any clarification count — resolveEntityRef's prefix tier accepts a
"<stem> <n>-<m>" surface and silently resolves it to the FIRST span, so the
real damage appears as a confident wrong answer about one line, not as a
block. #23 and #25 design against this; no clarification-derived number,
including this lens's, can see it.

Zero migrations, zero governed writes, zero production behaviour change.
The live run is the named post-deploy proof read (S63-1), the Architect's to
execute; a refused verdict is not quotable.
```

## AFTER MERGE
Stand by. Your next phase prompt follows immediately — you do not idle.

>> BLOCK: AG-3 <<
