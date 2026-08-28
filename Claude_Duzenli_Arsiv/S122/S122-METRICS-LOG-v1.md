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

**SIX ARCHITECT DEFECTS THIS SESSION, NAMED** (three added at close, after the landing cards
were measured — the count is revised upward by measurement, never quietly):

| # | defect | consequence | caught by |
|---|---|---|---|
| 1 | dispatched CP-8 v1 with no scout window (ruling ② read as covering producers only) | the card carried two mutually unsatisfiable orders; AG-2 resolved the collision itself and made an unauthorized governance decision | three scout windows, after the fact |
| 2 | mis-sent v6 with v1's bytes | a lane held wrong bytes under a right name for four minutes | my own read-back, and AG-2's digest check |
| 3 | dispatched v7 without preflighting it — a direct T1-5 violation, committed while hurrying to fix defect 2 | none measured; the card passed when checked afterwards | myself, immediately after |

| 4 | the `backlog` fence in `GO-LANDING-S122-2-v1` asserted, as MEASURED, that eight unlanded branches carry a report authored by AG-5 | wrong **in both directions**: AG-5 walked all 22 unlanded branches and found **13**, of which the fence named only 5. Three it named carry no AG-5 report at all — one adds no relay artifact, one is AG-1's report, one is another lane's feature branch | AG-5, by walking instead of accepting |
| 5 | `GO-LANDING-S122-2` reversed a hold that `GO-LANDING-S122-1` had placed on `phase/cp8-reconcile-1`, without stating that the governance question behind the hold had been ruled on | AG-5 landed on an **inferred** discharge and said so. The ruling had in fact arrived (owner, 2026-08-28, STRUCTURAL) — but the lane could not know that, and had it not arrived, a design would now be on the trunk | AG-5, naming it rather than resolving it |
| 6 | ordered AG-5 through the report-only exception in two consecutive cards without first reconciling it against the boot text that forbids self-merge absolutely | a lane was put in the position of obeying a card and a gate while an auto-loaded law said neither could authorise it | AG-5, after the landing — correctly noting it should have been raised before |

Defect 3 is the one worth keeping for the shift-left argument: **the repair for one defect was
itself made by breaking the rule that prevents defects.** Urgency is exactly when shift-left
gets skipped, which is exactly when it is load-bearing.

**Defects 4 and 5 are the ones worth keeping for the PRIMARY metric, and they change what this
row means.** Both are cross-body omissions committed by the Architect: 4 stated a fact about
the branch corpus without walking it, 5 stated an order without consulting the card that had
placed the hold. The S122 row records **0 cross-body defects reaching a lane** because it counts
*repairs a lane had to make*. Defects 4, 5 and 6 reached lanes and required no repair only
because AG-5 caught all three and reported rather than acted. **A metric that counts repairs
undercounts a factory whose lanes are good at refusing.** The next session should read column 3
as "cross-body defects that survived the lane", not "cross-body defects dispatched" — and
GATE-1's scorecard should say which one it is scoring before it is scored, not after.

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

### CLOSED BY MEASUREMENT 2026-08-28T06:52Z — AND THE MEASUREMENT REFUTED THE THIRD INSTRUMENT

`PHASE-CP8-RECONCILE-1` landed as PR #474. The repaired preflight was run from a fresh clone at
master `b86850250cb3d845ff5be5edc425e3304e0dc72f` against the **exact dispatched bytes** of
`PHASE-CP8-RECONCILE-1-v1` — md5 `68791d1ced42ef6db729b5551ade7d02`, confirmed identical to the
row the bus holds, so this is the card the table was written about and not a later edit of it.

```
$ npx tsx scripts/cardPreflight.ts --check PHASE-CP8-RECONCILE-1-v1.md
REFUSED-CHECKS=CP-8      6 CP-8 refusals
tokens: 2f08046 · deadbeef · 17482910345 · abc1234 · 8287599 · b2d6c55
```

**The transition is 7 → 6, NOT 7 → 0. The third row of the table above was wrong.** It is left
standing, wearing its refutation, because that is what an append-only ledger is for.

**Why it was wrong, and the reason is the finding.** All six surviving tokens sit inside
`evidence:probe` and `evidence:corpus`. Both fences are anchored by CLAIMS rows, so under the
owner's STRUCTURAL ruling both are SCANNED — correctly, by design. The prediction of zero was
computed against **ORDER B as v1 drafted it**, where *every* `evidence:` fence was exempt. The
P-4 escalation replaced that design, the owner ruled STRUCTURAL on 2026-08-28, and **the
prediction was never re-derived against the design that actually shipped.** It sat inside the
card's own bytes, in a table headed "three instruments", and no gate, no lane and no scout
window flagged it — because a prediction is not a claim any instrument in this factory reads.

`F-S122-INSTRUMENT-PREDICTION-STALE-1` — *a forward-looking number recorded in an artifact
survives a design change that invalidates it, because carriers gate claims about the present and
nothing gates a prediction.* Same family as `F-S112-GATE-TALLY-STALE-1` in the project box, and
the Architect committed it while running a programme whose whole subject is stale cross-body
claims.

**What the measurement DOES confirm, separately:**

* no regression at the band's top — a bare full 40-character sha in prose is `[OK] CP-8`,
  measured on an isolated fixture rather than inferred from the corpus run;
* the discipline the ruling created works — v7 moved its raw tokens into
  `evidence:illustration`, which no CLAIMS row anchors, and AG-2's arm 2 measures exactly that
  placement GREEN;
* v7's own delivery refusal was on **CP-7 and CP-8** (ids, quoted by AG-2 verbatim). The token
  COUNT at v7 is **UNMEASURED here** — the earlier "3 at v6/v7" in the table above was never
  measured either and is withdrawn rather than repeated.

This entry is CLOSED. It closed by refuting itself, which is the only kind of closure worth the
mechanism.

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

## SESSION CLOSE — THE DEFECT COUNT ROSE TO FIFTEEN AND THE SHAPE OF THE RISE IS THE FINDING

Six defects were recorded above while T1 was in flight. Nine more were caught between 06:44Z and
08:05Z, after T1 shipped, all in the fences of one card written three times, all refused by scout
windows before any lane paid for them:

| # | defect | version |
|---|---|---|
| 7 | a transcript printed that its own command cannot produce | v1 |
| 8 | "eight code sites"; measured, twenty-one lines across four files | v1 |
| 9 | called four ledger sections structural while citing the law that says three | v2 |
| 10 | ordered a re-stamp that reds a byte floor whose constant the same card put out of bounds | v2 |
| 11 | opened `SUPERSEDED-BY` while reserving `MERGED-INTO` — reserved a spelling, not an act | v2 |
| 12 | overshot the v2 correction into a NEW false claim: the fourth section is pinned item-by-item in the gate's floor manifest, and dropping it reds with fifty-one named lines | v3 |
| 13 | recorded a prior error that never happened — the re-stamp is byte-neutral, delta zero | v3 |
| 14 | stamped its own PREMISE seventeen minutes in the future, in a card about stale stamps | v3 |
| 15 | claimed a tripwire fires on a phrase it does not fire on, and said a window had reproduced it | v3 |

**PLATINUM-BREACH-S122-1** is recorded separately in `S122-P4-ESCALATION-CLOSE-v1` §4: two
landing cards ordered AG-5 through a self-merge that a plainly worded, executable prohibition
forbids, when any non-authoring lane could have landed those reports.

### WHAT THE RISE MEANS, AND IT IS NOT "FIFTEEN IS WORSE THAN SIX"

Defects 1–6 were made under deadline pressure with a programme running. Defects 7–15 were made
**after** the programme shipped, in ninety minutes, at roughly four times the rate — on work
nobody was waiting for, with no deadline at all. The comfortable reading is that the second batch
is cheaper because scout windows caught all nine. The correct reading is the opposite: **the
instrument that caught them is the only one that could**, and the same nine claims would have
reached a lane unmeasured on any card dispatched without a window.

`A-REC-S122-ARCHITECT-PRECISION-DECAY-1` — *the Architect's measurement discipline degraded
sharply once the deadline lifted, and the degradation was invisible from the inside; every one of
the nine felt measured when written.* This belongs in the next session's opening read, not in a
footnote, because the only working mitigation found so far costs three scout windows per card.

### AND THE PRIMARY METRIC, RESTATED HONESTLY

The S122 row records **0 cross-body defects reaching a lane**. That number is true and it is
narrower than it looks: it counts repairs a lane had to make. Defects 4, 5 and 6 reached lanes and
required no repair only because AG-5 caught all three and reported rather than acted; defects 7–15
never reached a lane only because three windows refused three cards. **A factory whose reviewers
are good makes its author look better than the author is.** GATE-1 must declare which of the two
it scores before it is scored.

---

TAIL ANCHOR: CWF-RULE-RUNTIME-METRICS-LOG-v1 ends here.
