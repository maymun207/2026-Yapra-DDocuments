# PHASE-FRAME-SHADOW-EVIDENCE-1 · v1 — walk item #6 · lane AG-2

<!-- Architect-authored · S95 Wave 2. Self-contained. Feeds #14 ROUTE-ASK-1. -->

## PRECONDITION (S47-1)
Fresh FULL clone. Expected base
`d8e76884318bba818d910a8dc0a838d163f94b89` · docVersion **rev 236** ·
72 migrations · 14 ADRs · 541 test files. If master moved, record actual base.

## LANE / BRANCH / REPORT / PR (S91)
Lane **AG-2** · branch **`phase/frame-shadow-evidence-1`** · PUSH · OPEN PR ·
report **`docs/relay/PHASE-FRAME-SHADOW-EVIDENCE-1-report.md`** · merge on GO,
`--no-ff`, squash banned.

## WAVE-SEAL LAW (binding)
No reseal during build. At the merge turn: rebase → read docVersion
MASTER-side → next number → reseal on the REBASED worktree → bump in the same
commit. A demanded REDRAW is a STOP. RULE 3 CHANGELOG + KB entries required;
conflicts expected, late-merge on top, keep every lane's entry.

## WAVE CONTEXT (S88-1) — your fence
`api/cwf/_lib/routing/**` (irFrame + its neighbours) + your tests. **NOT
yours:** `api/cwf/_lib/backends/**` (AG-1), `api/cwf/_lib/replay/**` (AG-3 and
AG-4), `src/**`, `shared/**`, migrations. Report `git diff --name-only`
verbatim; expected intersection with the other three lanes: ∅.

## MISSION — evidence for the ask, not a second planner
`ROUTE-ASK-1` (#14) must one day decide whether to ASK the user a
clarifying question instead of guessing. That decision is only as good as the
evidence behind it, and today the frame layer discards WHY it ended up where
it did. This phase makes the frame's own reasoning **observable in shadow**:
recorded alongside the live path, changing NO production behaviour.

**Explicit non-goal (binding):** this is not a planner and not a second
decision layer. The house has exactly one planner. If a design choice here
starts to look like "deciding", stop and report it — that is #14's job, and
#29's territory.

## BUILD
1. **Shadow evidence record (pure, derived at frame time):** for each frame,
   capture what the frame layer ALREADY knows but throws away — which
   candidate readings were considered, which were dropped and by which rule,
   which enum drops fired, what remained ambiguous. Build from the existing
   `irFrame` structures (`IrFrame`, `IrFrameEnumDrops`, `IrFrameArmorResult`
   are already exported); **do not invent a parallel model** of the frame.
2. **Shadow means shadow:** the record is written on a path that cannot change
   routing, cannot change output, and cannot fail a turn. A shadow writer that
   can take down a turn is not a shadow — prove containment with a test where
   the recorder throws and the turn completes unchanged.
3. **Honesty:** three states (`captured` / `nothing-to-capture` /
   `capture-failed`), never two. `empty ≠ zero`: "no candidates were dropped"
   is DATA and must be distinguishable from "the recorder did not run".
4. **Where it lands:** prefer the existing trace/telemetry plane rather than a
   new table — state which one and why in the report. **If a new table is
   genuinely required**, ADR-014 (landed today, `d8e7688`) means it MUST
   declare a persistence class in the same commit; the correct class for
   derived observability is `operational.telemetry`, and you must say so
   explicitly rather than letting CI discover it.
5. **Volume discipline:** the record is per-turn and this house runs synthetic
   traffic — state the expected row/byte growth per 1000 turns, computed, and
   put a governed cap or sampling rule behind it if the number warrants one.
   An observability organ that silently becomes the largest table in the house
   is a defect.
6. **NOT in this phase:** no consumption of the evidence, no asking behaviour,
   no prompt changes, no routing changes. #14 consumes it later.

## BIRTH PROOF (S93-1)
(a) a frame with dropped candidates produces a record naming the dropping
rule; (b) a frame with nothing dropped produces `nothing-to-capture`, NOT an
empty success that reads as zero drops; (c) recorder throws → turn completes,
record marked `capture-failed` (containment proven, not asserted);
(d) S66-1 positive control: clean run prints
`frames=<n> captured=<c> nothing=<z> failed=<f>` and the counts sum.

## REPORT MUST CONTAIN
What the frame layer already knew and was discarding (the specific fields) ·
where the record lands + why · computed growth estimate + any cap · all four
birth-proof transcripts · full diff name-list · computed test deltas · drift
output · `>> BLOCK: AG-2 <<` with head SHA.

## DO-NOT
No routing/output behaviour change of any kind · no decision logic · no
touching other lanes' fences · no Vercel CLI · absolute paths in scratch
writes.

<!-- END · PHASE-FRAME-SHADOW-EVIDENCE-1-v1 -->
