<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-SPEND-AND-GATE-CONSENT-1-v1
fanout: personalized — one address, AG-5.

MEASURED-AT 2026-08-26T16:05:00Z. Read by the Architect from the live bus, the live lane-state rows, and a fresh fetch of the trunk before this row was written.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this ruling's spend authority is CONSUMED BY ONE FIRING. The moment a canary run fires under it, this artifact is spent and a further firing needs a further ruling. It does not decay by time; it decays by USE.

## PREMISE
- MEASURED:a fresh fetch of the trunk @2026-08-26T16:03:00Z — master is the commit in the trunk fence, one real landing ahead of this session's repair anchor.
- MEASURED:an independently computed pass over the relay corpus at that master @2026-08-26T15:43:00Z — ORPHAN 0 and GOVERNED-VIOLATION 0, alongside the landed gate test passing 37 of 37.
- MEASURED:a planted-fault run of that same gate in a throwaway worktree @2026-08-26T15:46:00Z — a headerless artifact was written into the corpus and the gate went RED naming it, then the plant was removed and the worktree verified clean.
- MEASURED:a live read of the bus @2026-08-26T16:04:00Z — the five cards dispatched between 14:26Z and 14:49Z are all consumed, and no report has been posted back in the ninety minutes since.
- MEASURED:a live read of the lane-state rows over that same window — every address kept writing, so the silence is LONG CARDS and not a stopped factory.
- UNMEASURED — whether the automation credential can alter the repository ruleset. A read-only probe is out to the scout window and its answer decides who executes the gate change ruled on below.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| master is the commit in the trunk fence | MEASURED: git rev-parse over a freshly fetched origin/master | trunk |
| the relay corpus is clean at that master | MEASURED: an independently computed orphan and violation count · the landed gate test passing 37 of 37 | clean |
| the corpus gate catches a headerless artifact and names it | MEASURED: a planted-fault run · the failure text naming the planted path | catches |
| every dispatched card is consumed and every address kept writing | MEASURED: a live read of the bus · a live read of the lane-state rows | alive |

## EVIDENCE

```evidence:trunk
$ git rev-parse origin/master
797f23b2c431b6a7772e1c130dbf675f53f28282
```

```evidence:clean
$ independently computed over docs/relay at that master
corpus files 271 | governed 190 | frozen-exempt 82
ORPHAN 0 | GOVERNED-VIOLATION 0 | offenders: none
$ landed gate test at the same commit
Tests 37 passed (37)
```

```evidence:catches
$ plant a headerless artifact, re-run the landed gate test
FAIL  every relay artifact is either GOVERNED or frozen-exempt — never neither
    + "docs/relay/ZZZ-PLANTED-FAULT-PROBE-1.md"
Tests  1 failed | 36 passed (37)
```

```evidence:alive
$ bus, cards dispatched 14:26Z-14:49Z
all five consumed | from_lane reports in the last 90 minutes: none
$ lane-state rows over the same window
every address advanced between reads
```

## RULING 1 — SPEND AUTHORITY, GRANTED ONCE
The owner was asked for a named spend authorisation for a master push whose gate chain fires the expensive canary. **He gave it, in his own words, as an explicit approval.**

**You may fire it ONCE.** Not once per branch, not once per attempt, not "until the wave is done" — ONE firing under this ruling.

If that firing fails for any reason — a flake, a timeout, a red — **you do NOT re-fire.** You report what it cost and what it showed, and a further firing waits for a further named approval. A diagnosed transient is not a licence to re-run; that is a standing law here and this ruling does not suspend it.

> **A general instruction to finish the work is NOT a spend authorisation** and never substitutes for one. This artifact is the authorisation, it names one firing, and it is spent when that firing happens.

## RULING 2 — THE CORPUS GATE BECOMES REQUIRED, CONSENT GIVEN
The scout window measured that the corpus job runs and cannot block, because the required-check list carries exactly one context and the corpus job is not in it. **The owner has consented to making it required.**

**This ruling records the consent. It does NOT dispatch the change to you**, for one reason: it is not yet measured whether an automation credential can alter that ruleset at all. If it can, a machine performs it and the owner's surface stays consent. If it cannot, a human hand is structurally required and that is a numbered design fault to record rather than paper over.

**Do nothing about this item.** It is here so that when the reach answer arrives, the consent is already on the record with its date and its wording, rather than being asked for twice.

## ORDER A — LAND WHAT IS LANDABLE
Continue the wave. For every branch that does NOT land, name it and give the reason from the four the standing order distinguishes: fenced out, went red, never reached the queue before the wave stopped, or already contained in the trunk. **A branch listed without one of those four reasons reads as an unexplained gap and the report is incomplete.**

## ORDER B — RE-VERIFY THE CORPUS AFTER YOUR LAST LANDING
After the wave, re-run the corpus check on the NEW master and report ORPHAN and GOVERNED-VIOLATION as NUMBERS, not as a green tick. **If either is above zero, STOP and report before landing anything further** — a gate that stops holding is the one failure that looks exactly like success from where the Architect stands.

## ORDER C — THE THIRD VALUE
If a command answers with neither success nor failure — a dialog, a refusal, a hang — report its exact text rather than routing around it. A permission dialog stopped five addresses for roughly twenty-five minutes earlier in this session and needed the owner's hand to clear; its text was the only measurement anyone had.

## FALSIFIER
1. If the canary fires more than ONCE under this ruling, the card FAILED.
2. If a failed firing is retried without a further named approval, the card FAILED.
3. If any repository ruleset or branch protection is changed, the card FAILED — Ruling 2 records consent and dispatches nothing.
4. If a branch is reported as not-landed without one of the four named reasons, the card FAILED.
5. If the post-wave corpus check is reported as a green tick rather than as two numbers, the card FAILED.

## SHARED SURFACES
The repository settings, rulesets and branch protections are UNTOUCHABLE for this card. Every workflow file is READ-ONLY. Nothing is force-pushed, amended or rebased on the trunk. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
Landing order within the approved wave is YOURS. Spending a further canary firing is the OWNER's and is not delegated by this ruling. Changing merge authority is the OWNER's, consented but not yet dispatched to anyone.

## DELIVERY
Report at `docs/relay/RULING-S120-SPEND-AND-GATE-CONSENT-1-AG5-report.md` on your own lane branch, pushed, with the pull request opened. Plus the record files the repo's own gates COMPEL, named in your report.
