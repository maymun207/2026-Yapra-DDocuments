# GO — LEDGER-COMPLETE-1 · merge authorization
**Lane: AG-1 · Architect-issued, S85 · touch 3 of 4 (doctrine v1_3 D-6)**
**RULE-25 verdict: clean. Reviewer credit recorded: the sync-function verification (a stringified Promise yields `"{}"`) was YOUR catch, not the brief's.**

## PRECONDITION (S47-1 — verify fresh; any failure = STOP + report)
1. `origin/phase/ledger-complete-1` still = `a1d93edfaac602b0681681e90af8a7468c6891b2`.
2. Fresh `git fetch`: if `origin/master` has moved past `57e736a` by DOCS-ONLY commits, proceed (state the new anchor + merge-base). If ANY code commit landed, STOP and report — your no-code-overlap claim binds to the tree you measured.
3. Fresh full clone for the merge (S61-1).

## STEP 1 — CI verification on the BRANCH HEAD (BLOCKING, S37-2)
The recorded arbiter (`31174178735`) sits on `3e13866`; the head moved to `a1d93ed` by two docs commits. This repo's own law — "a green on a SHA that is no longer the head is not a green on the head" — applies regardless of the commits being docs-only. Verify the run on `a1d93ed`: pass = 4/4 code jobs `success` + `eval-canary` `skipped`. `in_progress`/`null` is NOT a pass.

## STEP 2 — merge (--no-ff, squash banned)
Subject VERBATIM:
```
merge: LEDGER-COMPLETE-1 — the turn's ledger now sees all three of its own local tools (W-024)
```
**RULING-S85-1 prevention (binding from this GO forward):** when committing a conflicted merge, use `git commit --no-edit --cleanup=strip` so git's `# Conflicts:` comment block is stripped and the message lands subject-verbatim with an empty body. (The ruling on AG-2's instance: accepted as-is; deployed, verified history is never rewritten for a comment block.)

## STEP 3 — conflicts & reseal (your own pre-declared plan, ratified)
- `.agents/CHANGELOG.md` conflict is CERTAIN: both entries kept in full, late-merge on top. KB/SKILL.md same rule if it conflicts.
- `manifest.json`: last-to-merge reseal law — clear markers, `npm run reseal` on the MERGED tree, `check:doc-drift` must exit 0. Expected docVersion on master: **rev 207** (206 was COLLISION's; 207 is yours and master has not bumped since — you recorded this yourself, with the SIGNAL-SOURCE inverse-case lesson).
- Canary debt pays on the merge run (full team expected, canary converging; verdict reported VERBATIM, underpowered never "safe").
- Report push after: docs-only → zero runs + skipped deploy (free under CI-DIET; observe once, briefly — the mechanism is triple-proven, so one sample + the merge run as control suffices; no six-sample vigil owed anymore).

## STEP 4 — report back (touch 4 of 4)
Merge SHA · first-parent · merge-run URL + five verdicts (canary verbatim) · docVersion rev 207 confirmed on master · suite from the merge run (expected **488/5629**, CI-arbitrated) · one line confirming the W-024 şerh retires: BUG-028's ARMED seal now covers the FULL local roster (trigger unchanged: first natural local-tool turn, Architect reads it).

<!-- END GO-LEDGER-COMPLETE-1-v1 · tail anchor: MERGE ONLY AFTER STEP 1 PASSES ON a1d93ed -->
