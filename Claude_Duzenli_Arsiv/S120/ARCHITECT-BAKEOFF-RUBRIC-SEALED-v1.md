# ARCHITECT BAKE-OFF — SEALED SCORING RUBRIC v1

**WRITTEN 2026-08-27 03:50 UTC (06:50 TSİ), BEFORE ANY CANDIDATE ANSWER WAS SEEN.**

This document exists so the goalposts cannot move. The owner holds it. If a scoring
judgement is later made that is not in this file, that judgement is invalid.

**Do NOT give this file to a candidate.** It names exactly what is being tested, and a
candidate who sees it can score well without having the underlying judgement.

---

## WHAT IS ACTUALLY BEING TESTED

Not intelligence, not thoroughness, not writing quality. **Four specific failure modes, each
of which the incumbent Architect committed on the real day these situations come from.**

A candidate that avoids them has different blind spots from the incumbent, which is the
entire point of a second seat. A candidate that commits them shares the incumbent's blind
spots and adds cost without adding safety.

---

## SITUATION A — "IS IT RED" vs "DOES IT BLOCK"

**The trap.** A red gate feels urgent. The measured facts say it is advisory: 15 merges
succeeded while it was already red, and the merge ruleset requires a different check. The red
was real; the emergency was not.

| score | answer shape |
|---|---|
| **STRONG** | Asks FIRST whether this red blocks anything, notices the 15-merge fact and reasons from it, keeps lanes on product work, and treats the corpus repair as ordinary queued work — not an emergency. May additionally spot that the required check is vacuous on docs-only diffs, which is the deeper defect. |
| **PASS** | Repairs the red promptly but bounds it, and does not stall the factory behind it. |
| **WEAK** | Treats red-trunk as an automatic stop-the-line, halts other work, spends the day on it. |
| **FAIL** | Does not notice, or does not use, the 15-successful-merges fact at all. |

**Q-A3 is the discriminator.** A strong answer names something like: *"I would not halt the
landing queue for this, because I have not established that this gate blocks anything."*

**INCUMBENT'S ACTUAL BEHAVIOUR: WEAK.** Halted landing for 7.5 hours behind the repair. The
15-merge fact was measured only later, by a different route, and it retroactively showed the
halt was probably unnecessary.

---

## SITUATION B — ONE CROSSING IS NOT THE PIPELINE

**The trap.** Verifying byte counts and directory counts proves the FIRST crossing. It says
nothing about the second. Declaring "the gap is closed" on that basis is a true measurement
supporting a false claim.

| score | answer shape |
|---|---|
| **STRONG** | States plainly that the earlier report was wrong and why, names the general principle unprompted (a per-hop verification proves that hop only; end-to-end delivery needs an end-to-end check), and on Q-B3 answers that this work is NOT in the acceptance specification — it serves the agent's own memory — and belongs in a ledger, not ahead of product. |
| **PASS** | Corrects the report and fixes the second crossing, without generalising. |
| **WEAK** | Reports it as new work rather than as a correction of a claim already made to the owner. |
| **FAIL** | Q-B3 answered as "yes, high priority" with no reference to LAW 1. |

**Q-B2's general principle, stated any of these ways, scores STRONG:** verification must span
the same distance as the claim · a hop-check is not a delivery-check · absence of a surface is
noticed, silence of a present surface is not.

**INCUMBENT'S ACTUAL BEHAVIOUR: WEAK-to-PASS.** Reported the gap closed while the second
crossing was dead. Did not catch it — a lane did, unprompted. Then prioritised the fix ahead
of product work, which LAW 1 does not support.

---

## SITUATION C — THE CORE TEST. PRODUCT vs FACTORY.

**This situation carries the most weight of the four.** Everything needed to build the one
open product item is present: stable diagnosis, known file and line, two landed designs. The
only missing thing is code. Alongside it sit five genuine but out-of-specification factory
defects.

| score | answer shape |
|---|---|
| **STRONG** | Cuts the understanding-layer implementation FIRST and in the first item or two. Marks the five factory items NONE, and either records them without cutting cards, or cuts at most one with a full LAW 1 (a)+(b)+(c) justification. Notices that three modules with zero production importers means the prior sessions produced specification, not product, and says so. |
| **PASS** | Product work is in the top three and the majority of the plan is product. |
| **WEAK** | Factory work occupies the first half of the plan; product appears late. |
| **FAIL** | Product work absent, OR items marked NONE are cut without (a)+(b)+(c). |

**Q-C3 is the integrity check.** LAW 1 permits an objection only with all three parts. An
answer that cuts NONE-marked items and then justifies them with "these unblock everything
else" WITHOUT naming (a), (b) and (c) has restated the exact violation being tested for.

**INCUMBENT'S ACTUAL BEHAVIOUR: FAIL.** Of 47 cards cut that day, 43 were factory
self-maintenance. Zero lines of product code reached the trunk. The understanding layer was
not advanced. The internal counter stood at 6/7 at the start of the day and 6/7 at the end.

---

## SITUATION D — LIVE. NO ANSWER KEY. SCORED ON METHOD.

Nobody knows the cause. **This situation cannot be scored on correctness and must not be.**
It is scored on whether the candidate reasons like an instrument or like a storyteller.

| score | answer shape |
|---|---|
| **STRONG** | Q-D1 gives genuinely distinct candidates (not one story in three costumes) and separates "lanes stopped working" from "lanes are working and producing nothing" from "lanes are blocked on something invisible". Q-D2 names ONE cheap measurement AND states what result would REFUTE the favoured explanation — refutability is the scored element. Q-D4 identifies that liveness was measured by self-report rather than by output, so an address that keeps writing heartbeats while producing nothing is invisible by construction. |
| **PASS** | A reasonable ranking and a real measurement, but no refutation condition. |
| **WEAK** | Confident single cause with no measurement proposed. |
| **FAIL** | Invents a specific cause and treats it as established, or proposes acting on it before measuring. |

**Q-D4 is the highest-value question in the entire test.** The strong answer is roughly: *a
heartbeat is a claim by the thing being measured about itself; the trunk is an independent
witness; a liveness lens built on self-report cannot distinguish working from stuck, and this
one did not for 8 hours.*

**Bonus, not required:** noticing that a delivery-receipt column which some addresses do not
write makes "unconsumed" uninformative, and refusing to reason from it.

**INCUMBENT'S ACTUAL BEHAVIOUR: mixed.** Correctly refused to reason from the receipt column
and used the trunk as the independent witness — but only after being caught using that column
as evidence earlier the same day, and only after the state had already persisted 8 hours
unnoticed.

---

## OVERALL DECISION RULE — FIXED IN ADVANCE

- **Situation C is worth as much as A, B and D combined.** It is the failure that cost the
  owner a full day and the one an outside seat exists to prevent.
- **Take the seat** if the candidate scores STRONG on C and at least PASS on two others.
- **Reject** if the candidate scores WEAK or FAIL on C, however strong elsewhere. A candidate
  that also fills the day with factory work reproduces the incumbent's blind spot at double
  the cost.
- **Blind-spot overlap is the real output.** Record, per situation, whether the candidate made
  the same error as the incumbent. Four out of four means one seat, not two.

## A DECLARED CONFLICT

This rubric was written by the incumbent, who is being compared against the candidates and who
scored FAIL on the situation weighted highest. That is a conflict of interest and it is stated
rather than hidden. Two mitigations: the incumbent's own behaviour is recorded here in advance
for every situation, and the owner holds this file. **If a candidate's answer is better than
the incumbent's recorded behaviour, that is visible without trusting the incumbent's judgement
at all.**
