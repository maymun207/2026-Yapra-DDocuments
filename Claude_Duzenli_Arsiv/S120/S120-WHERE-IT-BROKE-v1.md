# S120 · WHERE IT BROKE — a synthesis, not another addendum

<!-- Written because the owner asked the only question that matters: what actually happened,
     where did it break, what did we miss. This is a SYNTHESIS of measurements already
     recorded in LEDGER-v3 and ADDENDUM-1..4. It introduces no new measurement and it
     supersedes nothing. Every fact below is anchored to a measurement taken this session. -->

MEASURED-AT — no new measurement. Every number here was taken earlier today and is cited to
the artifact that holds it.

---

## THE ONE SENTENCE

**Nothing broke today. Today is the day we finally looked.**

Every defect found this session had been sitting in place for days, behaving exactly as
designed, while documents written by careful people described it as something else.

---

## THE COMMON SHAPE — every single finding is the same defect

Lay today's findings side by side and they stop looking like eight problems:

| what a document asserted | what the measurement said | how long it had been wrong |
|---|---|---|
| the corpus gate "reds before it lands", so the fault CANNOT recur | it reds, and it still lands — the job is advisory and cannot block a merge | since the file was written |
| the scout window's channel is REFUSED, exit 2 | the channel was widened at S116; the boot file still says shut | 3 days |
| the internal gate tally is 5/7 | measured 6/7 | 3 sessions |
| the vector valve is CLOSED | published as open, engine set | 4 days |
| the admission drip is a PRECONDITION still to come | it had already landed | unknown |
| open items were MERGED-INTO the canonical ledger | the canonical ledger contains none of them | since the move |
| the archive gap is CLOSED | one crossing closed; the second was dead, 44 files, head 7h stale | the whole session |
| a card was delivered to the scout box | it was delivered to a box nothing was reading | 3 hours |

**Every row is the same defect: a claim that was TRUE WHEN WRITTEN, went stale, and kept
being obeyed — because nothing measured it a second time.**

This project has unusually strong laws about verification. It has almost no MACHINES that
enforce them. So each law depends on whoever reads it choosing to obey — which is precisely
the thing this repo already has a name for: **a law without a gate.**

---

## WHERE IT BROKE, STRUCTURALLY

The factory has two halves and only one of them was ever made autonomous.

**PRODUCTION is parallel and autonomous.** Five addresses take cards, work independently in
their own trees, push branches, open pull requests. It works — eighteen landings today, and
during the seven-and-a-half-hour landing gap the lanes still produced twenty-two commits.

**VERIFICATION is serial and manual. Verification is one Architect.** Every card is written
by one process. Every report is read by one process. Every ruling is issued by one process.

That asymmetry is the break, and it has a measurable signature:

```
26 Aug 06:00-09:59   14 landings     production AND verification running
26 Aug 09:59-17:31    0 landings     production continued (22 commits) · verification stalled
26 Aug 17:31-22:05   18 landings     both running again, draining the backlog
```

The 09:59-17:31 window is not a mystery. It is what the factory looks like when the single
verification thread blocks: **the lanes kept working and nothing could be judged.** Part of
that window is a permission dialog that stopped five addresses for roughly twenty-five
minutes and needed a human hand to clear. Part of it is the Architect blocking on a question
for four hours while five lanes sat with nothing new to do.

**Five producers behind one verifier is not a factory. It is a queue with a person at the end
of it.**

---

## WHAT WE MISSED — the honest list

**1 · We built the production half and called it the factory.** The gates exist, and most of
them REPORT rather than ENFORCE. The corpus gate catches a planted fault — measured today —
and cannot stop a merge. The required check passes on a documentation-only pull request
having installed nothing and tested nothing. **The one check that inspects the factory's
actual output is advisory, and the factory's output is ninety percent documents.**

**2 · We treated the seams as if they were free.** Every failure today is at a JOIN, never
inside a component:

- box → disk: thirty documents never crossed
- disk → repository: forty-four documents never crossed, on a remote that was wired,
  reachable and credentialed the whole time
- card → scout: delivered to a box nothing was reading
- gate → ruleset: a job that runs and catches and cannot block
- ledger → ledger: items carried to one register and never carried out of it

The components are individually sound. **Nothing measured the joins**, and a surface that is
absent gets noticed while a surface that is present and silent does not.

**3 · We let documents outrank measurements.** The project's own law says the most fully
witnessed statement wins and that a number in a document is a claim, not the world. In
practice, governance documents were read as ground truth for days at a time. The cure is not
better documents. **It is a machine that re-measures what documents assert.**

**4 · The Architect is the bottleneck and made it worse.** Three times today the same error
class: a conclusion drawn from a corpus too narrow to support it, dressed in the vocabulary of
rigour. Two "independent" lenses that both keyed on the same word. A dead column used as
evidence minutes after declaring it unreliable. A gap reported as closed when one of its two
crossings was still dead. **Each was caught — twice by measurement, twice by the owner — and
each had been published or was one keystroke from being published.**

That matters more than it sounds. A wrong finding that reaches the archive is worse than no
finding, because the next session trusts the archive instead of re-measuring.

---

## WHAT IS NOT BROKEN — and this is not consolation

Naming only the failures would be its own distortion.

- **The lanes work.** Eighteen landings, twenty-two commits during a stalled window, reports
  that argue back with their own measurements.
- **The card gate works.** It refused the Architect's own cards four times today and was right
  every time. It caught a dead-column dependency the Architect had used three times in prose.
- **The corpus gate CATCHES.** Measured with a planted fault. It is not broken — it was never
  load-bearing.
- **The credential can arm the gate.** Measured on three surfaces. The remedy the owner
  consented to is executable by a machine, and no design fault needs recording on that count.
- **The archive crossing fired.** Seventy-three documents committed and pushed at 21:04.
- **Lanes correct the Architect.** The archive report opened by overturning the card's own
  premise, with the bytes. That is the behaviour worth protecting above all others.

---

## THE SHAPE OF THE CURE

Not more documents. **Machines at the seams:**

- A reconciler that measures box against disk against repository, continuously, and reports
  drift rather than absence alone. Designed today; on the trunk.
- A gate that BLOCKS rather than reports. Consented; card out; waiting on the wave.
- Boot files that carry dated measurements as dated, so a repaired door does not stay shut for
  three days.
- A liveness lens that is positive — actual merges, actual writes — because the heartbeat lied
  three separate times today and the trunk never did.
- And the hard one: **verification that is not one process.** Five producers behind one
  verifier reproduces today's gap every time the verifier stops, and no discipline fixes an
  arithmetic problem.

<!-- END · S120-WHERE-IT-BROKE-v1 -->
