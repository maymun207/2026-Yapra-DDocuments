# S120 · FINDINGS ADDENDUM 2 — THE GATE THAT CATCHES BUT CANNOT BLOCK

<!-- ADDENDUM, NOT a v4. S120-FINDINGS-LEDGER-v3 and S120-FINDINGS-ADDENDUM-1 are NOT superseded
     and NOT re-typed. Re-typing them from memory is the silent-compression DEFECT the
     "most fully witnessed statement wins" law names. Both stand whole; this file appends. -->

MEASURED-AT 2026-08-26T15:50:00Z (18:50 TSİ). Every line below is labelled with the instrument
that produced it. Where the Architect has no instrument, it says so and names whose measurement
it is standing on.

---

## F-S120-POST-LANDING-AUDIT-HELD-1 · THE MANDATORY AUDIT, PASSED

The standing order is that after every landing wave the Architect runs the corpus audit himself,
in a fresh worktree, at the NEW master — because a gate that stops working is the one failure that
looks exactly like success.

Master moved by one real landing. The audit was run in a fresh worktree at the new tip.

| measure | value |
|---|---|
| corpus files under the relay directory | 271 |
| governed (carry the grammar header) | 190 |
| named in the frozen exemption list | 82 |
| **ORPHAN count** | **0** |
| **GOVERNED-VIOLATION count** | **0** |

Both numbers were **computed independently**, not read off a passing assertion — the landed test
also passes 37 of 37, but a green test tells you a claim held, not what the number is. The gate
held through the landing.

---

## F-S120-GATE-CATCHES-MEASURED-1 · A PLANTED FAULT, WHICH IS THE ONLY REAL PROOF

The scout window declared, correctly and unprompted, an UNMEASURED it could not close: it had
measured that the corpus job RUNS, and not that it CATCHES — because proving a gate means planting
a fault in the thing it guards, and planting one is a write, and it held no address.

**The Architect closed it.** In a throwaway worktree, a headerless relay artifact was written into
the corpus and the landed gate test was re-run.

The gate went RED and named the planted path in its failure message. Removed; worktree clean.
A clean run at the same commit passes 37 of 37, so the red is attributable to the plant and to
nothing else.

**This is what a gate self-test looks like, and it is worth more than any number of green runs.**

---

## F-S120-RELAY-CORPUS-GATE-ADVISORY-1 · RUNS · CATCHES · CANNOT BLOCK

Three facts about the same job, each carrying a different instrument. They are separated here on
purpose, because collapsing them is exactly how the overclaim below happened.

| fact | instrument | who measured it |
|---|---|---|
| the job RUNS on push-to-master and on pull requests | live workflow run history | the scout window |
| the job's trigger block carries no path filter | the workflow source, read twice | the Architect |
| the job CATCHES a headerless artifact | a planted fault | the Architect |
| **the job is NOT a required check and cannot block a merge** | the repository ruleset API | **the scout window — the Architect has NO channel to that surface and cannot verify it** |

**The fourth row is relayed, not measured, and it is the load-bearing one.** It is recorded as
relay because the Architect has no instrument for it, and a relayed fact written as a measured one
is precisely the TOTAL-45 violation this project keeps paying for.

If it holds, then on a documentation-only pull request: the REQUIRED check reports success having
installed nothing and tested nothing, while the only check that actually inspected the corpus is
advisory. **The required check is vacuous on exactly the diffs the advisory check exists to judge.**

---

## F-S120-EXEMPT-FILE-OVERCLAIM-1 · A GOVERNANCE ARTEFACT RESTING ON THE STRONGER READING

The workflow file itself is honest and is not charged here: its own head comment says it is not a
required context and does not claim to be, and that it delivers a visible red. That is exactly
what it delivers.

The overclaim is in the frozen exemption list, which states that the fault it records **cannot
recur, because the next such artifact reds before it lands.**

It reds. It still lands. **"Reds before it lands" and "cannot land" are different facts**, and the
freeze — the thing that makes a further exemption forbidden — is resting on the stronger one.

Worse for a future reader: that same file instructs a future lane to treat any wish for a further
exemption as evidence that the gate has broken again. On this measurement **the gate has not
broken. It was never load-bearing.** A lane following that instruction would diagnose the wrong
failure.

---

## A-REC-S120-ONE-LENS-FALSE-POSITIVE-1 · SELF-DECLARED

While checking whether the corpus workflow carries a path filter, the Architect ran a single grep
and it returned hits. Read alone it says the filter is present. **Every hit was inside a comment**
— including one whose sentence says a filter there would reintroduce the very hole the file exists
to close, i.e. a comment stating the opposite of what the grep appeared to show.

A second lens that discarded comment lines returned zero, and that is the true answer.

One negative probe is not proof of absence; **this records the mirror case, which gets far less
attention: one POSITIVE probe is not proof of presence.** A grep matches text, not meaning.

---

## WHAT THIS CHANGES

- **Two worlds, and which one we are in is not yet measured.** If the automation credential a lane
  runs under can modify the ruleset, then the owner's surface here is CONSENT and the execution is
  a machine's. If no machine can reach it, a human hand is structurally required and that is a
  numbered PLATINUM fault to record rather than quietly work around by asking him to click.
- A probe card was cut to the scout window to settle exactly that, read-only, with an explicit
  prohibition on attempting the change to see whether it works — a probe that succeeded would have
  altered merge authority without consent.
- Any remedy that leans on the frozen list's freeze inherits that freeze's actual strength, which
  on today's measurement is advisory.

---

## THE OWNER'S ITEM, STATED ONCE

Adding the corpus job to the required-check list alters MERGE AUTHORITY. That is a governance
decision and it is his. It is deliberately NOT written here as a click for him to perform: under
the owner-hand law his surface is consent, and if a machine can execute it, a machine will.

<!-- END · S120-FINDINGS-ADDENDUM-2 -->
