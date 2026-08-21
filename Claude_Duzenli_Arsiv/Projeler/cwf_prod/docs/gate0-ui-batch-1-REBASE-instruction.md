# GATE0-UI-BATCH-1 — REBASE onto current master, then GO
**Architect: Claude · Executor: AG-A · 2026-07-21**

Review is otherwise CLEAN (client-only confirmed, DigestLegend `<li>`→`<div>`
fix verified, the `ol > li` locator change ACCEPTED as the stronger structural
invariant, FIX-2's scoped 60s timeout ACCEPTED as a real root-cause fix not a
bare rerun). ONE blocker: the branch is one merge behind.

**Do this:**
1. `gate0-ui-batch-1` was rebased onto `7d31793`, but master is now `4415d64`
   (SYNTH-TRAFFIC-1 DOC-FLIP `0f6c917` merged after you branched — your branch
   does NOT contain it; `git merge-base origin/master gate0-ui-batch-1` still
   reads `7d31793`). **Rebase `gate0-ui-batch-1` onto `4415d64`.** It's clean —
   your changes are `src/components/admin/**` + `src/lib/chartData.ts` +
   `e2e/**` + tests; DOC-FLIP touched only the migration comment + CHANGELOG, no
   overlap. The migration will resolve to master's flipped-STATUS version
   (keep master's — do not reintroduce the pre-flip text).
2. Push, confirm the WHOLE CI job green ONCE on the rebased head (S56-2, single
   attempt — S55-1: if anything flakes, root-cause, don't rerun).
3. Report the new head SHA + `git merge-base origin/master <head>` reading
   `4415d64`.

**Then GO** — `--no-ff` with the original merge message (unchanged):

`Merge PHASE GATE0-UI-BATCH-1: board-walk batch — context persist + collapsed defaults + digest legend/dedupe + render-decision & candidate-memory previews (F-BW01/02/03/04/08/09/10)`

Post-merge: delete branch `gate0-ui-batch-1`.

<!-- END · gate0-ui-batch-1-REBASE-instruction · 2026-07-21 -->
