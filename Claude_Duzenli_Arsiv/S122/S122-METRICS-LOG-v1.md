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
| S122 | 2026-08-27/28 | **7** | **1** | **0** | **0%** | 2 (both AUTHORIZED self-traps, excluded per rider R-1) | **12** | T1 shipped. Full accounting below, including two Architect defects |

## S122 ROW — how each number was obtained

* **dispatches = 1** — `PHASE-SELF-DESCRIBING-REFUSALS-1-v4` to AG-3 at 2026-08-27T21:27:41Z,
  after standing ruling ②'s scout window. Stored body verified byte-identical to the
  preflighted file (same digest, 14,729 octets), so the dispatched object is the object the
  scouts cleared. The remaining cards are **HELD** pending owner rulings; a held card is not a
  dispatch.
* **repairs = 0, cross-body = 0** — **provisional and not yet evidence of anything**: the lane
  has not reported. Re-measured at session close.
* **post-dispatch validator refusals = 0** — provisional for the same reason. It becomes
  evidence for G1-a only when the lane's report lands.
* **caught locally = 5** — three on v1 and two on v2, all repaired in the Architect container.

## S122 FINAL ROW — every number, including the ones against me

**7 dispatches:** T1-4 card v4 (AG-3) · producer-boot v3 (AG-4) · CP-8 v1 (AG-2) · CP-8 v6
(AG-2, MIS-SENT) · CP-8 v7 (AG-2, the correction) · GO-LANDING-S122-1 (AG-5) ·
GO-LANDING-S122-2 (AG-5).

**1 repair, and it was MINE, not a lane's.** The row named `PHASE-CP8-RECONCILE-1-v6` carried
`v1`'s bytes — an insert that copied an existing body instead of carrying the new text. AG-2
consumed it 71 seconds later. The bus is append-only so the row could not be withdrawn, and a
consumed row cannot be updated, so the correction went out as a new row, `v7`. **Classified:
NOT cross-body.** It was a transcription defect at the dispatch surface, which is a class the
metrics log had no column for because it had never happened before.

**AG-2 caught it before I told it to.** Its commit reads *"a mis-sent row caught by its
digest"* — the lane compared digests and refused the stale bytes on its own measurement. That
is the factory's discipline working on the Architect rather than on a lane.

**THREE ARCHITECT DEFECTS THIS SESSION, NAMED:**

| # | defect | consequence | caught by |
|---|---|---|---|
| 1 | dispatched CP-8 v1 with no scout window (ruling ② read as covering producers only) | the card carried two mutually unsatisfiable orders; AG-2 resolved the collision itself and made an unauthorized governance decision | three scout windows, after the fact |
| 2 | mis-sent v6 with v1's bytes | a lane held wrong bytes under a right name for four minutes | my own read-back, and AG-2's digest check |
| 3 | dispatched v7 without preflighting it — a direct T1-5 violation, committed while hurrying to fix defect 2 | none measured; the card passed when checked afterwards | myself, immediately after |

Defect 3 is the one worth keeping: **the repair for one defect was itself made by breaking the
rule that prevents defects.** Urgency is exactly when shift-left gets skipped, which is exactly
when it is load-bearing.

**12 caught locally** across five card lineages, plus **8 scout refusals** on two cards.

**Post-dispatch validator refusals: 2, both the AUTHORIZED CP-8 self-trap** (v1 and v7), excluded
from G1-a per owner rider R-1. Note the second one refused on **CP-7 and CP-8**, where v1 refused
on CP-8 alone — CP-7 fired because the card's own evidence names `consumed_at` while describing
the mis-send. Recorded, not repaired.

## KNOWN SELF-TRAP — the entry rider R-1 requires, and it CLOSES ONLY BY MEASUREMENT

| instrument | verdict on the CP-8 card's bytes |
|---|---|
| CP-8 as landed | **REFUSES** (7 tokens at v1; 3 at v6/v7 after ORDER A-3 moved the raw tokens to an unanchored fence) |
| the report grammar, same bytes | **OK — zero violations** |
| CP-8 as the card proposes to repair it | **0 refusals** |

The exemption covers a transitional inconsistency, not bad content: the repaired rule accepts
its own repair card while the landed rule refuses it.

**CLOSING LINE, TO BE WRITTEN BY MEASUREMENT AND NOT BY PROMISE:** after
`PHASE-CP8-RECONCILE-1` lands, re-run the repaired preflight on this very card and record the
7 → 0 transition here. Until that line exists, this entry is open.

## THE SCOUT WINDOW IS A SECOND, INDEPENDENT FILTER — and it earned its place on its first run

Preflight-GREEN was necessary and **nowhere near sufficient.** v1 passed all eleven mechanical
checks and was then refused by **all three** scout windows on grounds no gate can see:

| window | ground for refusal |
|---|---|
| 1 | `[card:preflight] REFUSED-CHECKS=` on stdout is a machine contract parsed by `mail-wait.mjs` and pinned by a unit test; ORDER A would have had a lane rewrite it and break the box reader |
| 2 | the scope fence omitted a sixth refusal emitter (`guard.sh`), and ORDER D demanded verdict preservation "on any input" — an unbounded quantifier no instrument can prove |
| 3 | ORDER A's central premise was false for the two largest surfaces: prose homes already exist, one of them generated from the code |

v2 fixed those; window 1 then refused v2 on a **factual error in the card's own prose** — it
claimed three hook tests protect the additive rule when exactly one does. v3 fixed that, v4
added a dispatch note window 1 supplied, and all three cleared it.

**Read against the primary metric:** every one of these is a *cross-body* defect — a
requirement living in a body other than the one being consulted. The mechanical gates cannot
see across bodies at all. Whatever else the scout window costs, it is currently the only
instrument in the factory that catches this class **before** a lane pays for it.
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
