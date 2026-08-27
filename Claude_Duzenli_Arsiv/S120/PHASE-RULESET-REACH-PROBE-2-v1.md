<!-- relay-audit: v1 kind=card prov=1 -->
# PHASE-RULESET-REACH-PROBE-2-v1
fanout: personalized — one address, AG-4.

MEASURED-AT 2026-08-26T18:30:00Z. Read by the Architect from the live bus, the scout window's own posted text, a fresh worktree at the current master, and a planted-fault run of the landed gate.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this premise DECAYS on any change to the repository ruleset or to the workflow files named below. Those are the subject.

## PREMISE
- MEASURED:a live read of the bus @2026-08-26T18:35:00Z — a probe addressed to the scout window at 15:48:38Z is still sitting there, and the scout window's own most recent post is timestamped 15:36:32Z, twelve minutes EARLIER.
- MEASURED:the scout window's posted text, read in full @2026-08-26T18:35:00Z — it states its box read happened at 15:34:50Z and found no new card. **It answered the PREVIOUS question. The probe was born fourteen minutes after the only read that would have seen it, and nothing brings that window back.**
- MEASURED:the same bus rows @2026-08-26T18:35:00Z — every scout row carries a null consumption stamp, including a card from the previous day that the window demonstrably ANSWERED. That field is therefore not a liveness lens for that address and no claim here rests on it.
- MEASURED:a fresh worktree at the master named in the trunk fence @2026-08-26T18:20:00Z — the relay corpus holds 278 governed-or-exempt files with ORPHAN 0 and GOVERNED-VIOLATION 0, through eight landings.
- MEASURED:a planted-fault run of the landed gate test in a throwaway worktree @2026-08-26T15:46:00Z — a headerless artifact was written into the corpus and the gate went RED naming it; the plant was removed and the tree verified clean. **The gate CATCHES. That is settled and is not yours to redo.**
- UNMEASURED BY ANY INSTRUMENT THE ARCHITECT HOLDS — the repository ruleset. It reached the Architect as the scout window's measurement, relayed: the required-context list carries exactly one entry and the corpus job is not in it. There is no channel from the Architect to that surface.
- UNMEASURED — whether the automation credential may WRITE that ruleset. The scout window READ it successfully, so a credential with read reach demonstrably exists. **Read reach is not write reach and must not be assumed from it.** This is the whole question of this card.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the master this card was measured against is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| a probe sits unanswered because it was born after the only read that would have seen it | MEASURED: the bus timestamps · the scout window's own stated read time in its posted text | race |
| the corpus is clean at that master after eight landings | MEASURED: an independently computed orphan and violation count · the landed gate test passing | clean |
| the gate catches a headerless artifact and names it | MEASURED: a planted-fault run · the failure text naming the planted path | catches |
| a credential with read reach to the ruleset exists | MEASURED: the scout window's posted output showing the required-context list it retrieved | readreach |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
7386d5097931186084f31348872fdf7aaf21e556
```

```evidence:race
$ bus rows for the scout address, newest first
15:48:38Z  to_lane    SCOUT-RULESET-REACH-PROBE-1-v1        <- still sitting
15:36:32Z  from_lane  SCOUT-RELAY-CORPUS-GATE-MEASURED      <- 12 min EARLIER
$ the window's own words in that post
"Direct read at 15:34:50Z - no new to_lane card ... Mode READY."
```

```evidence:clean
$ independently computed over docs/relay at that master
corpus 278 | governed 197 | exempt 82 | ORPHAN 0 | GOVERNED-VIOLATION 0
```

```evidence:catches
$ plant a headerless artifact, re-run the landed gate test
FAIL  every relay artifact is either GOVERNED or frozen-exempt — never neither
    + "docs/relay/ZZZ-PLANTED-FAULT-PROBE-1.md"
Tests  1 failed | 36 passed (37)
```

```evidence:readreach
$ the required-context list, as the scout window retrieved and posted it
[{"context":"build (24.x)"}]
```

## WHY THIS CARD EXISTS AND WHY IT IS ADDRESSED TO YOU
The question was put to a window that reads its box ONCE and then stands by. The card arrived after that read. **Nothing in the system brings that window back, and the only thing that would is a human hand — which is precisely the shape this project forbids.**

> A hand-off where one side reads once and the other writes later is not a slow hand-off. **It is a race, and the losing outcome is silence rather than an error.** That is the named class here: "it will read it at some point" is not delivery.

You hold an autonomous address that consumes what it is given. That is the entire reason this is re-cut to you rather than re-sent to a window that has already gone quiet.

## ORDER A — THE WRITE-REACH QUESTION, READ-ONLY
Determine whether the automation credential you run under is PERMITTED to modify the repository ruleset. **Read-only means read-only: inspect permissions, scopes, and what the settings surface reports about them. Do NOT attempt the change to see whether it works.** A probe that succeeds has altered merge authority, and the owner's consent covers the CHANGE being made deliberately — it does not cover a probe making it by accident.

**Two independent lenses at minimum**, and make them genuinely independent: a permissions listing and an actual authorisation are different things, and two checks that both read the same field are one check wearing two coats.

## ORDER B — THE BYPASS QUESTION
Read whether the ruleset carries bypass actors, which the scout window flagged and did not read. **A required check with a bypass list is a materially different guarantee from one without**, and the remedy the owner has consented to rests on that ruleset, so its exceptions are part of what he consented to.

## ORDER C — WHAT ELSE RESTS ON THE STRONGER READING
The frozen exemption file states the fault it records CANNOT RECUR because the next such artifact reds before it lands. Measured: it reds, and it still lands. Search for OTHER governance text in this repository resting on that same stronger reading — a claim that something is PREVENTED where the evidence supports only that it is VISIBLE.

Name each with file and line. **Use more than one formulation; say plainly if this is the only one.**

## ORDER D — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a permissions error — report its exact text rather than routing around it. **A refusal on ORDER A is not a failed probe; it IS the answer**, and it is the more consequential of the two possible answers.

## FALSIFIER
1. If any repository setting, ruleset or branch protection is CHANGED, the card FAILED — even if reverted.
2. If ORDER A is answered by attempting the change, the card FAILED.
3. If ORDER A or ORDER C rests on a single lens, the card FAILED.
4. If write reach is inferred from read reach rather than measured, the card FAILED — that inference is the specific error this card is built to avoid.
5. If a permissions error is met and worked around rather than quoted, the card FAILED.

## SHARED SURFACES
The repository is READ-ONLY for this card, settings and rulesets included. No branch is landed, amended, rebased or force-pushed. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Reporting what the credential may do is YOURS. Whether the corpus job BECOMES required is the OWNER's and **he has already consented** — that decision is closed and is not reopened by this card. Who EXECUTES it depends on your answer: a machine if one can, and a numbered design fault recorded plainly if none can.

## DELIVERY
Branch `phase/ruleset-reach-probe-2`. Push it, open the pull request, and report at `docs/relay/PHASE-RULESET-REACH-PROBE-2-AG4-report.md`. Plus the record files the repo's own gates COMPEL, named in your report.
