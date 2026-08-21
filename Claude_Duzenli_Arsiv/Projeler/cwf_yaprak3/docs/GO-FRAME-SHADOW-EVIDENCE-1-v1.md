# GO-FRAME-SHADOW-EVIDENCE-1 · v1 — Architect → AG-2

**Review verdict: PASSED.** Independently verified on your head `3bb87b7`:
77/77 across the four suites. I checked the two things that could have made
this unsafe, and both are right:

- **The `irFrame.ts` edit is export-only.** A comment plus `export` on
  `IrFrameRawSchema`; the armor's own use is byte-untouched. And your reason
  is the correct one — handing the recorder THIS schema is what keeps it a
  recorder instead of a second model of the frame that agrees today and
  diverges the first time a field changes. That is a real architectural
  distinction, not a convenience.
- **The `semanticRouter.test.ts` expectations are written out LITERALLY**
  rather than computed by calling `deriveFrameEvidence`. A test that builds
  its expectation from the code under test asserts only that a function equals
  itself. You saw that and avoided it. Noted with approval.

`telemetry_events` with a payload discriminator and a stated ceiling is the
right landing place — no new table, so no ADR-014 obligation, and the volume
question is answered rather than deferred.

## STEPS AT YOUR MERGE TURN
Merge order is **whoever is ready**; AG-3 already merged (rev 237), so master
has moved.
1. `git fetch origin` + rebase onto current `origin/master`.
2. Read `docVersion` MASTER-side and take the NEXT number — expected
   **rev 237 → 238**, but READ it; another lane may land between now and your
   turn. `npm run reseal` on the REBASED worktree, bump in the SAME commit.
   A demanded REDRAW is a STOP-and-report.
3. RULE 3 CHANGELOG + KB entries are in your diff; rebase keeps every lane's,
   yours on top.
4. CI on the PR head: every job `completed` + `success`
   (`in_progress`/`null` is NOT a pass; `eval-canary skipped` expected;
   `check:doc-drift` goes green with step 2).
5. Merge `--no-ff` with the VERBATIM message below. Squash banned.
6. Report merge SHA, post-merge `origin/master`, resulting docVersion.

## VERBATIM MERGE MESSAGE
```
FRAME-SHADOW-EVIDENCE-1: the frame stops throwing away its own reasoning

ROUTE-ASK-1 will one day have to decide whether to ASK rather than guess, and
that decision can only be as good as the evidence behind it. Today the frame
layer knows which readings it considered, which it dropped and by which rule,
and then discards all of it. This records that, in shadow, alongside the live
path.

Shadow means shadow. The recorder cannot change routing, cannot change
output, and cannot fail a turn — and containment is proven rather than
promised: a test throws inside the recorder and the turn completes unchanged.
An observability organ that can take down the thing it observes is not an
observability organ.

It is a recorder, not a second model of the frame. It reads the raw block
through the armor's own schema, now exported for exactly that purpose, because
a re-declared copy would agree today and drift the first time a field changes.
This is emphatically not a planner and takes no decision; the house has one
planner, and what to do with this evidence is #14's question.

Three states, never two: captured, nothing-to-capture, capture-failed. "No
candidates were dropped" is DATA and stays distinguishable from "the recorder
did not run" — empty is not zero on the newest surface as much as the oldest.
A frame that never arrived is itself a fact worth recording, so an absent
frame is captured as such rather than silently skipped.

The record lands on the existing telemetry plane under its own payload
discriminator, so no new table and no persistence class to declare, and the
growth question is answered rather than deferred: the per-record ceiling is
stated and enforced rather than discovered later when this becomes the
largest thing in the house.

The router's own exhaustive expectations are written out literally rather
than computed from the function under test, because a test that builds its
expectation by calling the code asserts only that the code equals itself.
What those cases pin is that the router CARRIES the record and that adding it
changed nothing else in the result.

No routing change, no output change, no prompt change, no consumption. The
evidence is now there for #14 to use.
```

## AFTER MERGE
Stand by; your next phase prompt follows immediately.

>> BLOCK: AG-2 <<
