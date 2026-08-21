# GO · FLOOR-RESYNC-1 · v1

>> BLOCK: AG-2 <<

RULE-25 review complete. Verdict: **GO.** Deviations D1–D8 **RATIFIED as
built** — revert nothing. The owner relaying this GO to you IS the owner's
approval of the floor rewrite (the redacted diff summary was presented and
consented to).

You are the **SECOND merger** — S92-1 applies in full. Do NOT merge until
AG-1's LEARNING-SNAPSHOT merge is on origin/master.

## STEP 1 (BLOCKING) · CI re-verification on YOUR PR head
Confirm per check on the floor-resync PR head: `build (20.x)` · `build (22.x)`
· `coverage` · `rule26` green; `eval-canary` skipped (expected). F-BW01 flake
⇒ one ordered rerun; any other red ⇒ STOP.

## STEP 2 · Second-merger protocol (S92-1 — measured in review, not guessed)
The review MERGE-SIMULATED your branch onto AG-1's: `toolCategories.ts`
auto-merges cleanly (disjoint regions), but `public/architecture/manifest.json`
and `.agents/CHANGELOG.md` CONFLICT — both lanes minted `rev 228`.

```
git fetch origin && git rev-parse origin/master
# MUST show AG-1's LEARNING-SNAPSHOT merge commit at HEAD of master.
git checkout phase/floor-resync-1
git merge origin/master        # brings AG-1's work into your branch
# Resolve .agents/CHANGELOG.md: UNION — keep BOTH lanes' entries, yours last.
# Resolve manifest.json: do NOT hand-merge hashes. On the MERGED tree run:
npm run reseal                 # reseals all tabs against the combined tree
# Then SET docVersion EXPLICITLY (S90-1/S92-1): "rev 229 · 2026-08-11"
npm run check:doc-drift        # worktree mode — MUST be 7/7 green
CI=1 npm run check:doc-drift   # head mode after committing — MUST be 7/7 green
git commit  (merge + reseal, message: "reseal: rev 229 — second-merger combined tree (S92-1)")
git push origin phase/floor-resync-1
```
Verify the suite is green on the merged branch head (full unsharded vitest, or
push and read the PR-head CI per check — the CI is the arbiter). Then:

## STEP 3 · Merge
```
git checkout master && git pull --ff-only
git merge --no-ff phase/floor-resync-1 -m "merge: PHASE-FLOOR-RESYNC-1 — the outage floor catches up with what is actually published

The floor is a generated mirror of the live catalog and it had fallen behind:
seven energy keywords on armes/machine, and an entire backend —
machine-knowledge-base, one category, five knowledge tools — that the floor
did not know existed. This merge runs the one-way sync at the per-backend
address, so the five tools land under their own key instead of leaking into
armes's outage set. One live keyword was refused by name: G-EXCLUDE keeps
gated vocabulary out of code (the floor may be exactly that many keywords
short of live, counted and disclosed), structural fields STOP the sync
outright, and the tenant-zero gate was proven falsifiable both ways. employee
ends byte-identical. Second-merger reseal: rev 229 on the combined tree
(S92-1). rev 229."
git push origin master
```
No squash. Report the merge SHA and the final docVersion as your last lines.

TAIL: GO FLOOR-RESYNC-1 v1 — merge authorized (second merger, S92-1)
