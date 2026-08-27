# CWF · RULE-RUNTIME CONSOLIDATION · METRICS LOG — v1

Opened 2026-08-27 under P-6. **Every gate in this program is decided on these numbers and
never on impressions.** One row per session, appended, never rewritten. A row whose number
could not be measured says `UNMEASURED` with a reason — never a blank and never an estimate.

**The primary metric is column 3 as a share of column 2.** Baseline 3/4 = **75%**. The program
closes when that share is structurally ~0 and the repairs that remain are judgement repairs.

## COLUMN DEFINITIONS — fixed here so later rows stay comparable

1. **dispatches** — cards or GO artifacts sent to a producer lane in the session.
2. **repairs** — dispatched artifacts that needed a corrective follow-up for any reason.
3. **cross-body repairs** — the subset of (2) where the missed requirement lives in a
   *different governance body* than the one consulted. Each is named in the annex of the
   session's gate scorecard with the body it missed.
4. **post-dispatch validator refusals** — refusals raised by `cardPreflight` or `relayAudit`
   **after** an artifact reached a lane. This is the number T1-5 exists to drive to zero;
   refusals caught locally before dispatch are counted separately and are a *good* sign.
5. **pre-dispatch refusals caught locally** — added this session. Not a defect count. It is
   the work T1-5 moved off the lanes' windows and onto the Architect's.

## THE LOG

| session | date | 1 · dispatches | 2 · repairs | 3 · cross-body | 3/2 | 4 · post-dispatch refusals | 5 · caught locally | notes |
|---|---|---|---|---|---|---|---|---|
| **BASELINE** | 2026-08-27 (S121) | **14** | **4** | **3** | **75%** | 4 | 0 — no shift-left existed | the window the program was specified from |
| S122 | 2026-08-27 | **0** | 0 | 0 | — | **0** | **3** | T1 execution session. NOTHING WAS DISPATCHED: one card reached preflight-GREEN and waits on the scout window that standing ruling ② puts before any producer |

## S122 ROW — how each number was obtained

* **dispatches = 0** — `PHASE-SELF-DESCRIBING-REFUSALS-1-v1` is written and preflight-GREEN but
  did **not** reach a lane: standing ruling ② requires a scout window between preflight and any
  producer, and none ran this session. A card that passed the mechanical gate is not a
  dispatch. The remaining cards are **HELD** pending owner rulings; a held card is not a
  dispatch either.
* **repairs = 0, cross-body = 0** — trivially, since nothing was dispatched. **These are not
  yet evidence of anything.** They are recorded because P-6 requires the row to exist before
  any T1 change lands.
* **post-dispatch validator refusals = 0** — for the same reason, and it must not be read as a
  passing G1-a. A zero over an empty window measures the window, not the practice.
* **caught locally = 3** — the T1-4 card was refused three times in the Architect container and
  repaired there:

```
attempt 1  REFUSED-CHECKS=CP-1,CP-3,CP-5
attempt 2  REFUSED-CHECKS=CP-1,CP-3
attempt 3  GREEN — every check passed. The card may be inserted.
```

## A CAUTION ABOUT COLUMN 3 THAT THE NEXT SESSION SHOULD READ FIRST

The baseline's cross-body class is not only a lane phenomenon. **This session measured a
cross-body omission inside the program's own founding directive**: T1-2(a) prescribed a repair
against a tool surface that had already been repaired the previous day, because the finding
travelled from a lane report into an inventory into a directive without being re-measured
against the live tool. It is recorded in
`S122-T1-MEASUREMENT-AND-DEVIATION-MEMO-v1` §2 as `F-S122-BOOT-DEFECT-ALREADY-REPAIRED-1`.

It is **not** counted in the S122 row, because the row counts dispatches to lanes and this was
never dispatched — P-1 caught it first. It is written here so that column 3 is never read as
"the lanes' error rate". The class this program is extinguishing lives in the Architect's own
work too, and the baseline's 75% is very likely an undercount of it.

---

TAIL ANCHOR: CWF-RULE-RUNTIME-METRICS-LOG-v1 ends here.
