# RULING-CORPUS-LINE-FILL-1 · v1 — Architect → AG-4

**Review verdict: PASSED** (independent run on your head `aff8fdf`: 22/22 +
25/25 = 47/47; `check:tenant-zero` [OK] re-verified by the Architect; the
all-pairs bijection + named-empty design is exactly right).

## R1 · Your §0 deviation — the FENCE was wrong, not your build
Same collision AG-3 hit; Architect authorship error (A-REC-S95-1).
**WAVE-SEAL LAW:** docVersion has ONE writer per merge turn. Your separable
reseal commit `aff8fdf` MAY STAY on the branch for CI-green purposes, but it
is provisional: at your merge turn it is REDONE per your own Footgun-6
procedure (that procedure is hereby adopted as the wave law).

## R2 · Your merge turn (queue position 4: after #40, #41, #24)
On GO: (1) fetch + rebase onto current origin/master; (2) DROP `aff8fdf`;
(3) read `docVersion` from the MASTER side, take the NEXT number; (4)
`npm run reseal` on the rebased worktree + docVersion bump, one commit;
(5) one additive `.agents/CHANGELOG.md` entry (your item 7 — ruling: written
at merge turn, in-branch; skill-KB entry is Architect's at session close,
deferred BY NAME); (6) CI green; (7) merge `--no-ff` with the verbatim
message I will supply.

## R3 · Out-of-fence edit (`seedSyntheticQuestionSets.test.ts`) — ACCEPTED
Disclosed, additive, precedent-following (the V3 shape), no assertion
weakened. Correct call.

## R4 · Standing facts confirmed
Not-activated is right and stays right: repointing `synthetic.activeSetId`
is a separate ordered step that will NOT happen at merge. Live ABSENCE-ONLY
seed = post-merge Architect-ordered step.

## R5 · Do now
Nothing. Stand by for GO.

>> BLOCK: AG-4 <<
