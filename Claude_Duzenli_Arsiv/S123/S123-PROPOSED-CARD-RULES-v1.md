# S123 · THREE PROPOSED CARD RULES, WRITTEN BY THE REVIEW WINDOWS THEMSELVES · v1
MINTED 2026-08-28, S123. **A PROPOSAL FOR THE OWNER. NOTHING HERE IS ENACTED.** The P-6 observation window is open and forbids governance changes, so this is recorded and held for the GATE-1 sitting. It is on the agenda; it is not on the trunk.

**WHY IT EXISTS.** Across three review rounds on one card, the scout windows were each asked the same standing question and their answers converged. They were not asked to design a rule until the third round, and then all three wrote one unprompted and in the same direction. The Architect is relaying them rather than paraphrasing, because the wording is theirs and the evidence is the session's own record.

---

## THE EVIDENCE THAT MAKES THIS A PROPOSAL RATHER THAN AN OPINION

`PHASE-LEDGER-DECAY-SWEEP-1` was re-measured three times and reviewed three times. **Every round returned GREEN, and every round still found defects.** Five in total, and each one lived in territory the verdict's own checks never reached:

```evidence:defects
v3  no `deliverables` block — the card's branch and report were named in PROSE only, so
    busDelivery.ts could never classify the work ACTED. The gate stayed silent because the
    block is required for kind=phase and this card is kind=card.
v3  claimed a prose tally like "N items" reds. TRIP_COUNT_RE matches only tests,
    migrations and ADRs. The claim was carried, never read.
v3  ordered `READ:` without naming that the same spelling is refused as a CLAIMS basis
    under prov=1 — a red the lane would have walked into.
v3  said the GI-015 line "continues for roughly another 1400 bytes". Never measured.
v4  replaced it with 1243 and named no counting convention, then derived "roughly 1050"
    where the measurement is 1090. This one was the ARCHITECT'S, made inside the
    correction of somebody else's.
```

One window's own summary of what that means, in its words: *"all four v3 defects lived in territory no window had re-run, including a band my own GREEN endorsed unread."*

---

## THE THREE RULES, RELAYED VERBATIM

### PROPOSAL 1 · THE FIGURE CARRIES ITS INSTRUMENT

> A card states no figure without printing, in the same fence, the command that produced it and the counting convention it counted under — newline or none, unit, clock — and any assertion that lacks such a command beside it is spelled `NOT-READ`; enforced at preflight the way a bare sha already is, so the card declares its own blind spots on its face instead of leaving them for a later round to discover.

A second window wrote the same rule independently and added the read-moment: *"the command, the counting convention, and the read-moment in the same fence as the figure."*

**Would have caught:** the 1400-byte claim, the 1243-without-convention claim, the 1050 derivation. **Mechanically checkable:** yes — `CP-2` already refuses an unfenced count, so the shape exists.

### PROPOSAL 2 · THE CONSUMERS FENCE

> Every card carries a CONSUMERS fence naming each instrument that will read what the card or its lane produces — file and line, gate, matcher, corpus job or ledger — with every entry tagged `MEASURED:` naming the read that was done, or `NOT-READ` with its reason; an instrument that later turns out to consume the output while absent from that fence is by definition a card defect, and the fence is checkable by the same preflight that already refuses an unfenced count.

**This is the one that matters most, and the session proved it the expensive way.** The `deliverables` defect survived three GREENs for exactly one reason, named by a window: *"no lens asked which landed instrument would consume the card."* A CONSUMERS fence forces that question at authoring time, where it costs one grep.

### PROPOSAL 3 · THE NOT-RE-MEASURED FENCE

> Every card ends with a `NOT-RE-MEASURED` fence naming each claim it carries forward on another reading's authority, so that the boundary between measured and inherited is declared by the author and the reviewer's job starts at the declared blind spots instead of hunting for them.

**This is the direct countermeasure to `F-S122-STALE-COUNT-CLASS-IS-SUBSTRATE-INDEPENDENT-1`** — the finding that the factory's dominant failure is a number travelling between carriers without being re-derived, committed by every actor including the owner. Nothing today gates a number on its way INTO a carrier. This fence does not gate it either, but it makes the inheritance visible at the point of authorship.

---

## A FOURTH, ON THE REVIEW SIDE, AND IT IS SMALLER

Two windows independently proposed the same review-side rule: **a GREEN never travels without its findings list, and enumerates what it did NOT re-measure.** In one window's words: *"the findings are the product and the verdict is only the gate."*

That needs no preflight change — it is a report-form rule for the scout channel, and it costs one paragraph per verdict.

---

## THE ARCHITECT'S OWN POSITION, STATED RATHER THAN IMPLIED

**All three are worth having, and Proposal 2 is worth having first.** It is the only one of the three that would have caught the only defect in the set that had a permanent consequence: a commissioned piece of work whose delivery could never have been proven.

**And one honest caution against enacting all three at once.** Three new preflight checks land on every card the factory writes, and this session's own record is that a card was refused four times by mechanical checks before it reached a window. Adding three more refusal surfaces to a grammar that already refuses most first drafts is a real cost, and it is a cost paid by every future card, not only the ones that would have carried a defect. **Proposal 2 as a check; Proposals 1 and 3 as card-form requirements first, promoted to checks only if a measured round shows authors skipping them.** That is a proposal, not a ruling.

**One window put the economics better than the Architect can:** *"A loop that re-cuts a card over one newline byte has inverted its own economics; the rule is where that byte belongs."*

---

## STATUS

`HELD FOR GATE-1.` No rule file is written, no check is added, no card grammar is changed. The P-6 observation window stays clean.

TAIL ANCHOR: S123-PROPOSED-CARD-RULES-v1 ends here.
