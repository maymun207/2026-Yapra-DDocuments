# GO — AXIS-TRUTH-1 MERGE · v1

**Branch:** `phase/axis-truth-1` · **HEAD:** `176b356470217ce1c1729e8b9552b5d17ee8426c`
**Anchor:** `338e538056e471c950dbaaa17c8bf7ed22996a31` (= `merge-base`, verified)
**PR:** #157 · **Closes on proof, not on merge:** `BUG-018`

**RULE-25 review taken on a fresh clone, independently recounted.** Re-derived
rather than accepted: HEAD, merge-base, the 6-file diff surface (zero
migrations, zero `api/`, zero manifest), `13 + 5 = 18` new `it()` blocks across
2 new files, `Y_AXIS_WIDTH = yAxisWidth()` being derived rather than constant,
`fmtTickPreAxisTruth` / `Y_AXIS_WIDTH_PRE_AXIS_TRUTH = 44` preserved as the real
pre-fix pair, `fmtYTick` absent from the tooltip and table paths, zero real
tenant line names with `LINE-A..E` in their place and the magnitudes kept
verbatim, and `ChartUpliftPreview.tsx` untouched.

---

## STEP 1 — BLOCKING. Re-read CI before touching master.

The Architect's sandbox cannot reach the GitHub API (403).

```bash
gh run list --repo maymun207/cwf_yaprak --commit 176b356470217ce1c1729e8b9552b5d17ee8426c --json name,status,conclusion
```

**PASS CONDITION — all four `completed` + `success`:** `build (20.x)` ·
`build (22.x)` · `coverage` · `rule26`. `eval-canary` = `skipped` on the PR
plane, expected, **not a pass**. `in_progress`/`null` is **not** a pass.

**Note the history:** the first push on this branch went RED on
`check:tenant-zero` and was fixed. **Confirm you are reading the run for
`176b3564`, not an earlier one.**

---

## STEP 2 — MERGE `--no-ff`, message VERBATIM

```bash
git checkout master && git pull --ff-only
git merge --no-ff 176b356470217ce1c1729e8b9552b5d17ee8426c -F -
```

```
merge: AXIS-TRUTH-1 — the chart was right and the axis was lying

A bar chart of per-line gas consumption drew y ticks 40000 · 55000 · 70000 ·
85000 · 0 over a series whose own table read up to 337704. The real ticks were
340000 · 255000 · 170000 · 85000 · 0: every SIX-character label lost exactly its
leading glyph and every five-character label survived. Data correct, bars
correct, tooltip correct (209979), table correct. Only the axis lied -- and an
operator read a number 8.5x too small about his own factory. Every other defect
found this week makes the system FAIL; this one made it succeed while lying to a
human eye.

THE FORMATTER WAS INNOCENT, AND THE BRIEF GOT WRONG WHICH TEST DOES THE WORK.
fmtTickPreAxisTruth(340000) returns the full string "340000" -- a perfect round
trip. The clipping happens in the renderer, inside a 44px gutter, on
right-anchored text, where no pure test of a string can see it. So the
Architect's ROUND-TRIP assertion PASSES on the defective build and FIT is the one
that reds. AG ran it instead of reasoning about it and inverted the roles. Both
invariants stay required: FIT alone would admit "340"; ROUND-TRIP alone would
admit today's clipping.

THE PRE-FIX PAIR IS PRESERVED VERBATIM RATHER THAN PARAPHRASED.
fmtTickPreAxisTruth and Y_AXIS_WIDTH_PRE_AXIS_TRUTH = 44 are the real shipped
code, kept so the red control points at what actually ran rather than at a
restatement of it -- the ADR-011 precedent (use the real classifier, never a
restated list) applied to a formatter.

THE TWO KNOBS MOVE TOGETHER, WHICH IS THE ONLY VERSION OF THIS FIX THAT LASTS.
fmtYTick carries magnitude with an SI suffix and Y_AXIS_WIDTH is DERIVED from the
longest label the formatter can emit. Widening the gutter alone hides today's
magnitude and returns at the next one.

'B' WAS REJECTED AND THE REASON IS THIS BUG ITSELF. English B is 10^9; Turkish
"bin" is 10^3. In a bilingual product that is a thousand-fold ambiguity -- the
defect re-introduced by its own cure. K/M/G/T, defined once in Y_TICK_SUFFIXES.

THE BOUND IS DECLARED, NOT ASSUMED. Y_TICK_DECLARED_MAX_ABS = 1e15 names the
domain over which the five-character bound is PROVEN. Above it labels grow again,
the gutter would clip again, and the FIT test SAYS SO -- instead of the chart
lying quietly, which is the behaviour this phase exists to end.

TWO BUGS IN THE FIX, FOUND BY THE SWEEP AND NOT BY INSPECTION. 9990/1e3 = 9.99
is "< 10" so took one decimal, and (9.99).toFixed(1) is "10.0" -- so -9990
printed -10.0K, six characters, breaking the very bound the gutter is derived
from. A bound measured BEFORE rounding is not a bound on the printed string. And
a tolerance claimed 0 below 1000 while that branch rounds 9.99 to "10.0" --
checking a promise the formatter never made.

THREE MUTATIONS, THREE KILLS, EACH BY THE INVARIANT THAT OWNS IT: the pre-fix
formatter restored reds FIT (7 tests); a compact form without a unit
(340000 -> "340") reds ROUND-TRIP (4); fmtYTick leaked into the tooltip reds the
G3 control (2). One of AG's own controls was BROKEN and replaced rather than
trusted: a regex matched the import line, where Tooltip and fmtYTick are
neighbours.

A GATE CAUGHT WHAT THE AUTHOR HAD NOT RUN, AND IT IS RECORDED RATHER THAN TIDIED
AWAY. The first push went RED on check:tenant-zero -- real production line names
had been copied into a fixture and a docblock. Reproducing an incident is not an
exemption; that vocabulary is gated precisely so it cannot spread. The names are
now LINE-A..E and the MAGNITUDES are verbatim, because the magnitudes are the
evidence and the names carry none.

A CENSUS, NOT A GREP: two <YAxis> sites repo-wide, tickFormatter at exactly one.
The first attempt returned a zsh false zero from unquoted globs and was re-run
with a positive control (two <XAxis>) proving the pattern matches -- the third
apparatus false-green in a week to be caught BEFORE it was trusted (S82-2).
ChartUpliftPreview.tsx is DEV-gated, configures neither gutter nor tickFormatter,
and is a side-by-side parity exhibit whose job is to show the older look; it is
deliberately unchanged.

NO DRIFT, AND THE BRIEF'S PREDICTION WAS ONE STEP TOO STRONG. It predicted
reseal-only; in fact no narrative tab maps any src/ path, so reseal reports 0
tabs hash-changed and there is nothing to reseal. docVersion stays rev 193, and
the no-op breadcrumb diff was reverted rather than carried.

Tests 452/5124 -> 454/5142; +2 files, +18 it() blocks. Zero migrations, 67 before
and after. Zero api/ changes, zero new surfaces. BUG-019, BUG-020 and BUG-022
untouched by design.

BUG-018 does NOT close here. BUG-CARRY-1 rule 4: the proof is a production
re-render of the same question, read against the table in the same response.
```

Then `git push origin master`, and prune `phase/axis-truth-1` local + remote —
`phase/route-open-2` should be pruned in the same pass if it has not been.

---

## STEP 3 — Convergence before any proof

`list_deployments` → `state=READY`, `target=production`,
`githubCommitSha` = the new merge SHA. Name the `dpl_…`. A read against the
previous deployment proves nothing.

---

## STEP 4 — POST-DEPLOY PROOF (S63-1). BUG-018 closes here, or not at all.

**Owner-issued turn required** — the same constraint that gated ROUTE-OPEN-2's
proof. Re-ask the natural-gas question in production so a chart renders.

**PASS:** the top y tick reads a value **≥ the maximum in the table rendered in
the same response**, in SI form (e.g. `340K`), with no digit missing. Screenshot
plus the turn's trace id.

**FAIL, each meaning something different:**
- a bare five-digit tick above a six-digit table maximum → the fix did not reach
  the render path;
- a suffix-less compact label (`340`) → the ROUND-TRIP invariant is not wired to
  the shipped formatter;
- the tooltip or table gaining a suffix → G3 leaked and the fix traded a lie for
  a loss.

**If the turn renders no chart at all** (as the last production turn did — it
returned a table, W-013), that is **not a pass and not a fail**: BUG-018 stays
OPEN and the read is re-taken on a turn that draws one.

---

## STEP 5 — A NOTE FOR BUG-022, not work for this phase

The `176b356` build log carries the **same 22 function-layer type errors** as the
`338e538` build — **identical files, identical line:column coordinates**,
compared pairwise by the Architect. Two consequences, both recorded rather than
acted on here:

1. **This phase introduced zero of them.** The set did not move.
2. **22 is now BUG-022's baseline fixture.** Its gate's positive control is that
   a planted real type error makes the count 23 **and fails the deploy** — today
   it would print 23 and ship.

Do not fix them in this merge.

<!-- END · GO-AXIS-TRUTH-1-MERGE-v1 -->
