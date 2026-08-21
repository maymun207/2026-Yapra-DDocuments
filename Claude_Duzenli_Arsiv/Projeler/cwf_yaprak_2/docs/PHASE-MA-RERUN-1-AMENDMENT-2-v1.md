# AMENDMENT 2 to PHASE-MA-RERUN-1-v1

<!-- PHASE-MA-RERUN-1-AMENDMENT-2-v1 · 2026-08-03 · S81 · Architect: Claude.
     Issued after the L5000 run1 report, before run2 lands and before the G4
     artifact is written. PHASE-MA-RERUN-1-v1 and AMENDMENT-1 stay in force
     except where a clause below names what it changes.
     No re-run is requested. Every clause is analysis over files already on
     disk. -->

**Nothing here asks for compute. All three clauses read files you already have.**

---

## A8 · The agreement check has a THIRD attribution, and A3 does not name it

**What A3 said:** if the two runs' `perFrame` tallies disagree, check whether a
`*/30` catalog-sync boundary fell inside either window.

**What A3 missed.** The loader orders `created_at`/`ts` **descending** and the
cap truncates, so each run reads *the newest N rows at the moment it starts*.
L5000 run1 read at `19:00:26Z`; run2 started `19:56:13Z` and will land near
`23:15Z`. **If any frame was recorded in between, the window slid** and the two
runs read **different row sets**. Under that condition a tally disagreement is
neither nondeterminism nor a sync boundary — it is the instrument's window
moving, and no amount of re-running fixes it.

**Do this before attributing anything** (both JSONs are already on disk;
`RecordedFrameRow` carries a stable `rowId`):

1. Compute `set(rowId)` for run1 and for run2.
2. Report: identical / `|run1 \ run2|` / `|run2 \ run1|`, and the
   `min(createdAt)` and `max(createdAt)` of each run's population.
3. **Only if the row sets are identical** does a tally disagreement mean what
   A3 assumed. State which of the three attributions applies, by name:
   - **identical rows, tallies agree** → the instrument is stable over this
     window; the agreement check passes;
   - **identical rows, tallies differ** → A3 applies: check the sync boundary,
     and if none fell inside, report an **unattributed** disagreement (the
     larger finding);
   - **row sets differ** → the window slid. Report the drift, and record that
     the agreement check **could not be performed** — do not report it as a
     pass or a failure.

**Run2 is now worth finishing for this reason specifically**, not for the
agreement check as originally conceived. Whether a three-hour gap moves the
window is itself a property of the instrument we have never measured.

**Also note, without chasing it:** run2 is running at roughly a quarter of
run1's rate (≈26 vs ≈92 frames/min) with a clean stream. Record the observation
and both runs' rates in the artifact. Do **not** investigate it inside this
phase.

---

## A9 · `high-unattributed` is a named phenomenon with no name in the enum

**Measured, at two different window sizes:**

| window | `high-unattributed` | `layerStatus = declared-empty:equipment` | overlap |
|---|---|---|---|
| L3000 | 23 | 23 | **100 %** |
| L5000 | 155 | 155 | **100 %** |

All `EQUIPMENT`, all `HIGH`. `CLARIFICATION_CAUSES` carries seven values and
**none of them is "the layer for this object is declared but empty"**; the
lens's own comment calls `high-unattributed` the born-loud *"a HIGH we could not
attribute"*.

**So it was attributable all along — the enum simply has no word for it**, and
A4's stderr reading supplies the word from outside the enum.

**Required in the G4 artifact:** report this as a **named cause**, not as
residual. State the count, the 100 % correspondence at both window sizes, and
the fact that the cause enum lacks the category. **Do not add the category** —
§10's no-code-change rule holds without exception. Naming the gap is the
deliverable; closing it is a later phase's.

---

## A10 · The `n`-matching remedy is DISPROVEN — record it, it is the most transferable finding

§3's Trap 3 prescribed reconstructing like-for-like *"by matching `n`, never by
copying flags."* The recon said the same. **Your measurement disproves it:**

- `perUtterance.n` went **9 → 52** between the L3000 and L5000 windows. The
  newest 3000 rows covered **nine** distinct utterances out of fifty-two.
- `LINE` `entity-unresolved` went **20 → 420** between the same two windows.

A recency-ordered cap over a corpus injected in **per-set rotation** concentrates
on whatever ran most recently. **Matching `n` matches a count, not a
population** — and the cause mix is window-dependent, so any single truncated
number would have been quoted as *"the"* block rate.

**Required in the G4 artifact**, stated plainly and prominently: the remedy the
brief and the recon both prescribed does not work on this corpus, with those two
figures as the evidence. This is the finding most likely to save the next
measurement, and it must not be buried under the void verdict.

**The Architect's record.** Trap 3's remedy was the Architect's, in both the
recon and the brief. It is the third defect of this phase's authorship, after
the wrong seam citation (AMENDMENT-1 §A5) and §6's one-sided population
anticipation. All three were found by execution, none by re-reading documents.

---

## A11 · Accepted, with thanks: the ZONE correction

Your correction stands and is the right instinct — the earlier statement *"zero
ZONE frames exist in the corpus"* was true of the L3000 window only; L5000 shows
**159**, all `resolved`, all `clean`, none blocked. Direction unchanged, the
statement was wrong.

Carry the corrected form into the artifact, and carry the reason too: it is the
same window-dependence A10 describes. A claim of the form *"zero X exist"* made
from a truncated recency-ordered read is **never** safe.

---

## A12 · WHAT DOES NOT CHANGE

Everything else. In particular §7's void verdict stands and must be reported as
the result; §8's one-line verdict rule stands; §10's hard NOs stand in full —
no code change, not one line, not to add a cause category.

<!-- END · PHASE-MA-RERUN-1-AMENDMENT-2-v1 -->
