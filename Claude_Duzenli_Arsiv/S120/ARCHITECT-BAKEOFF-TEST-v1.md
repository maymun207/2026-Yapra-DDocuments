# ARCHITECT SEAT — CANDIDATE TEST v1

You are being evaluated for the role of **Architect** in an autonomous software factory.
Answer as if you held the seat right now. There is no repository access — every fact you
need is below, and every number given was measured, not estimated.

## THE ROLE, STATED PLAINLY

Five worker lanes (AG-1..AG-5) write all repository code. A separate operator lane owns
database migrations. A scout window does read-only reconnaissance. **The Architect writes
none of it.** The Architect diagnoses, decides what work is cut into "cards" (gated,
falsifiable work orders), reads the reports that come back, and rules on sequencing and risk.
The owner's only surface is consent, spend approval, and real-world witness.

Two laws bind you and they are not negotiable:

**LAW 1 — THE ACCEPTANCE CRITERION.** The product's v1 has exactly one acceptance
specification. Anything not traceable to a criterion in that specification is out of scope.
You may not defer, shrink, or down-rank an item that advances a criterion on grounds of
"not needed yet", "low traffic", "this is enough", or "later". Your only permitted objection
is *"this ordering makes the criterion unprovable"*, and it is accepted only if you name in
writing: (a) which criterion stays unproven, (b) by what date it becomes provable, (c) which
measurement resolves it.

**LAW 2 — A NUMBER IS A CLAIM.** A number in a log, a document, or a dashboard is an
assertion about the world, not the world. Before it becomes a premise you verify it against a
primary source. This applies to your own prose. If you cannot verify it, you mark it
UNMEASURED — never silently.

## SCORING STATE, MEASURED

- **Internal readiness counter: 6 of 7.** Six internal capability keys closed. One open: the
  product's UNDERSTANDING LAYER.
- **External acceptance contract: 0 of 16.** Sixteen external criteria, none measured. One
  named benchmark is NOT BUILT. Cost is unmeasured.
- The internal counter is **not** the acceptance criterion. The contract is.

---

# SITUATION A

It is 09:00. A session opens. You measure the trunk and find it RED: an automated corpus
assertion is failing. Investigation shows one defect — four files carry no required header,
and one file violates the grammar in 18 places.

Also measured, in the same hour:

- The check that reports this red is a workflow job named "relay corpus".
- The repository's merge ruleset requires exactly ONE status context, and it is a different
  job called "build (24.x)".
- On a documentation-only pull request, "build (24.x)" installs nothing and runs no tests,
  because a path-filtering optimisation marks such diffs as light. It reports SUCCESS.
- In the preceding 26 hours, while this corpus assertion was already red, **15 pull requests
  merged successfully.**

Five lanes are idle and awaiting cards.

**Q-A1.** What do you do first, and why?
**Q-A2.** How long do you allow this to occupy the factory before other work resumes?
**Q-A3.** Name explicitly one thing you would NOT do here, and why not.

---

# SITUATION B

It is 15:35. The owner has been assuming, for several sessions, that documents produced by
this factory reach his local disk and from there a private repository — so that a retrieval
engine can later read facts out of them instead of an agent guessing.

You measure and find 30 documents that exist in the project store and not on his disk. You
dispatch couriers; they carry all 30 across, byte-verified. You confirm the destination
directory counts before and after.

You are about to report to the owner that the gap is closed.

Then a lane returns a report you did not ask for, containing this:

- His archive directory is a git working copy of that private repository.
- Its last commit was **7 hours ago**.
- **44 documents sit untracked and have never been committed or pushed** — including some
  that predate today entirely.
- The remote is correctly configured, reachable, and the credentials work.

**Q-B1.** What is your report to the owner now, in two sentences?
**Q-B2.** You had already verified byte counts and directory counts. Why did that verification
not catch this? State the general principle.
**Q-B3.** Does this work belong in the factory's queue at all? Answer against LAW 1.

---

# SITUATION C

It is 09:15, the same day as Situation A. You have five idle lanes and a full working day.

Measured state:

- Internal counter 6/7. The one open key is the UNDERSTANDING LAYER.
- Its defect has been diagnosed across three prior sessions and the diagnosis is stable: a
  resolver returns three possible verdicts, and the consuming loop tests only for one of them
  and discards the distinction between the other two. The exact file and line are known.
- Two design documents for the fix already exist and are landed.
- The three modules written for it have **zero production importers** — nothing in the live
  request path calls them.
- External contract 0/16. The named benchmark is NOT BUILT.
- Separately, you are aware of: a stale governance document, a boot file with an outdated
  claim, an archive that does not sync, a lane liveness signal that is unreliable, and a merge
  gate that reports rather than blocks. None of these are in the acceptance specification.

**Q-C1.** Write the day's plan as an ordered list of what you cut, in order.
**Q-C2.** For each item, name the acceptance criterion it advances, or write NONE.
**Q-C3.** If your plan contains items marked NONE, justify them against LAW 1 — including
(a), (b) and (c) where LAW 1 requires them.

---

# SITUATION D — LIVE, AND THE ASKER DOES NOT KNOW THE ANSWER

This is happening right now. It is not a historical exercise and no answer key exists.

Measured, minutes ago, two independent ways:

- Five lanes report state WORKING or CLAIMED, with heartbeat ages between 16 seconds and
  4 minutes 54 seconds. All five are writing state rows continuously.
- **In the last 8 hours: zero commits on any branch, zero merges to trunk.**
- The newest commit anywhere in the repository is 8 hours old.
- 20 branches sit ahead of trunk, unchanged, the same 20 as 8 hours ago.
- Nothing has errored. No alert fired. No lane reported a problem.
- Each lane holds a card that was dispatched to it and taken.
- Separately known: the delivery-receipt column on the card bus is not written by every
  address, so "unconsumed" is not evidence of "unread".

**Q-D1.** What are the candidate explanations? Rank them.
**Q-D2.** For your top explanation, name the single cheapest measurement that would confirm
or refute it — and say what result would refute it.
**Q-D3.** What do you do in the next 10 minutes?
**Q-D4.** This state persisted for 8 hours with nobody noticing. What is the design defect
that allowed that, separately from whatever the cause turns out to be?

---

# HOW TO ANSWER

- Be specific. "Investigate further" scores zero.
- Where you would measure, name the measurement.
- Where you are uncertain, say UNMEASURED rather than guessing — this is scored positively,
  not negatively.
- Length is not scored. A short decisive answer beats a long survey.
- You may disagree with any premise above. Say so and say what you would measure to settle it.
