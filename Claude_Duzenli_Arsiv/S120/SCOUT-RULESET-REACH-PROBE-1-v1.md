<!-- relay-audit: v1 kind=card prov=1 -->
# SCOUT-RULESET-REACH-PROBE-1-v1
fanout: personalized — one address, scout.

MEASURED-AT 2026-08-26T15:47:00Z. Read by the Architect from a fresh worktree at the current master, a planted-fault run of the landed gate test, and your own two posts on the bus.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS on any change to the repository ruleset or to the workflow files named below. Those are the subject.

## PREMISE
- MEASURED:a fresh worktree at the master named in the trunk fence @2026-08-26T15:43:00Z — the corpus holds 271 governed-or-exempt files, 190 carrying the header and 82 named in the frozen list.
- MEASURED:the landed gate test run on that worktree @2026-08-26T15:43:34Z — 37 of 37 pass, and an independently computed pass over the same corpus returns ORPHAN 0 and GOVERNED-VIOLATION 0.
- MEASURED:a PLANTED-FAULT run @2026-08-26T15:46:00Z — a headerless artifact was written into the corpus in a throwaway worktree and the gate went RED, naming the planted path in its failure. **This closes the UNMEASURED you declared: the gate does CATCH.** You were right not to plant one; planting is a write and you hold no address.
- UNMEASURED BY ANY INSTRUMENT THE ARCHITECT HOLDS — the repository ruleset. It reached the Architect as YOUR measurement, relayed: the required-status-check list contains exactly one context, and the corpus job is not in it. **There is no channel from the Architect to the repository settings surface, so this stands on your reading alone** — which is exactly why it is carried here as relay rather than as measurement.
- MEASURED:the two workflow files read from source at that master @2026-08-26T15:45:00Z — the corpus workflow's live trigger block carries push-to-master, an unfiltered pull-request trigger, and manual dispatch, and zero non-comment lines mention a path filter.
- UNMEASURED — whether the automation token available to a lane can CHANGE that ruleset. **This is the whole question of this card**, because it decides whether the remedy is a machine's job after consent or something with no machine behind it at all.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the gate catches a headerless artifact and names it | MEASURED: a planted-fault run of the landed test in a throwaway worktree · the failure text naming the planted path | catches |
| the corpus job runs on both the push and the pull-request path | RELAYED: your run listing, taken from the live workflow history | runs |
| the corpus workflow's live trigger block carries no path filter | MEASURED: a grep over the file · a re-parse discarding comment lines, which corrected the grep | unfiltered |
| the corpus workflow's own comment declines to claim it is a required check | MEASURED: reading the comment block at the head of the workflow file | modest |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
797f23b2c431b6a7772e1c130dbf675f53f28282
```

```evidence:catches
$ plant a headerless artifact into docs/relay, run the landed gate test
FAIL  every relay artifact is either GOVERNED or frozen-exempt — never neither
      expected [ Array(1) ] to deeply equal []
    + "docs/relay/ZZZ-PLANTED-FAULT-PROBE-1.md"
Tests  1 failed | 36 passed (37)      <- clean run at the same master: 37 passed
```

```evidence:runs
$ your run listing, relayed
push          master                          success
pull_request  phase/pr409-red-recheck-1       success
pull_request  phase/author-lens-diagnose-1    success
```

```evidence:unfiltered
$ live trigger block, comment lines discarded
on:
  push:
    branches: [ "master" ]
  pull_request:
  workflow_dispatch:
non-comment lines mentioning a path filter: 0
```

```evidence:modest
$ the workflow's own head comment
"This is NOT a required status context and does not claim to be.
 build (24.x) remains the required check... This job is a visible red
 on the pull request when the corpus breaks."
```

## WHY THIS CARD IS SMALL AND URGENT
You found the sentence this session turns on: a job that RUNS, and CATCHES, and cannot BLOCK. The Architect has now measured the middle term you could not. What remains is one fact, and the shape of the remedy depends entirely on it.

> **If a machine can make the change once consent exists, the owner's surface is CONSENT and nothing more.** If no machine can, then a human hand is structurally required, and that is a numbered PLATINUM fault to be recorded rather than quietly worked around by asking him to click.

Those two worlds get different cards. Do not let the Architect write the wrong one.

## ORDER A — THE REACH QUESTION, READ-ONLY
Determine whether the automation credential a lane runs under is permitted to modify the repository ruleset. **Read-only means read-only: inspect permissions, scopes, and what the settings surface reports back. Do NOT attempt the change to see whether it works.** A probe that succeeds has altered merge authority without consent, and that is the one outcome this card must not produce.

**Two independent lenses at minimum**, because a permissions listing and an actual authorisation are different things and either can mislead alone.

## ORDER B — THE BYPASS QUESTION
You flagged, and did not read, whether the ruleset carries bypass actors. Read it now. **A required check with a bypass list is a different guarantee from a required check without one**, and if the remedy is going to rest on that ruleset, its exceptions are part of the remedy.

## ORDER C — WHAT ELSE IS RESTING ON THE STRONGER CLAIM
The frozen exemption file states that the fault it records CANNOT RECUR because the next such artifact reds before it lands. On today's measurement it reds and still lands. Search for OTHER governance text in the repository resting on that same stronger reading — a claim that something is prevented where the measurement supports only that it is visible.

**Name each with file and line, and say plainly if this is the only one.** One negative probe is not proof; use more than one formulation.

## ORDER D — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a permissions error — report its exact text rather than routing around it. A refusal here is not a failed probe; it is the answer to ORDER A.

## FALSIFIER
1. If any repository setting, ruleset or branch protection is CHANGED, the card FAILED — this card reads and reports.
2. If ORDER A is answered by attempting the change, the card FAILED even if the attempt is reverted.
3. If either ORDER A or ORDER C rests on a single lens, the card FAILED.
4. If a permissions error is met and worked around rather than quoted, the card FAILED — its text is the measurement.

## SHARED SURFACES
The entire repository is READ-ONLY for this card, settings and rulesets included. Hold no address. Write nothing to the repository. Nothing is written to the database beyond your own reply on the bus.

## DECISION RIGHTS
Reporting what the credential may do is YOURS. Deciding whether the corpus job BECOMES a required check is the OWNER's, because it alters merge authority. Executing that change once he consents is a MACHINE's, if ORDER A finds a machine that can — and establishing which of those two worlds we are in is the entire point of this card.

## DELIVERY
Reply on the bus as a scout post. No branch, no pull request, no report file in the repository — you hold no address and this card does not give you one.
