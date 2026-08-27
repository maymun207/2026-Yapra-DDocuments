<!-- relay-audit: v1 kind=card prov=1 -->
# RULING-S120-LAND-THE-FIX-FIRST-1-v1
fanout: personalized — one address, AG-5.

MEASURED-AT 2026-08-27T05:50:00Z. Read by the Architect from a fresh fetch of the fix branch, his own local run of the guard test on it, and a diff of that branch against the trunk.
ON-DISAGREEMENT: if your re-measure differs from any line here, THE MEASUREMENT WINS — STOP and report the difference.
SELF-INVALIDATION: this ruling exists to correct one sentence in the ruling that preceded it. It DECAYS the moment the fix branch lands.

## PREMISE
- MEASURED:the previous ruling's own text, re-read by its author @2026-08-27T05:48:00Z — it says *"do not land while the guard test is red"* and *"when the guard goes green you may resume"*. **Read strictly, those two sentences deadlock: the guard only goes green AFTER the fix lands, and the fix cannot land while it is red. THE ARCHITECT WROTE A DEADLOCK AND IS CORRECTING IT IN THE SAME HOUR.**
- MEASURED:a fresh fetch of the fix branch @2026-08-27T05:47:00Z — it carries two changed files: the flagged report, altered by ten lines, and its own new report.
- MEASURED:the Architect's own local run of the guard test on that branch @2026-08-27T05:47:30Z — **ten of ten assertions pass.** On the trunk the same file passes nine of ten.
- MEASURED:a name-scoped diff of that branch against the trunk @2026-08-27T05:47:40Z — the guard script, its tests and the exemption list are all absent from the changed set. The guard was not widened.
- UNMEASURED — whether a second guard hit lies behind the first, and whether this landing consumes the single authorised canary firing. Both are expected and neither blocks this card.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the fix branch passes the guard test in full | MEASURED: the Architect's own run on a fresh checkout of that branch · the same suite run on the trunk for comparison | green |
| the fix branch changes exactly two files, neither of them the guard | MEASURED: a diff of the branch against the trunk · a name-scoped search of that diff for guard paths | scoped |

## EVIDENCE

```evidence:green
$ on the fix branch
Test Files  1 passed (1)
     Tests  10 passed (10)
$ on the trunk, same suite
     Tests  1 failed | 9 passed (10)
```

```evidence:scoped
$ git diff --stat origin/master...FETCH_HEAD
 docs/relay/PHASE-LANE-COMMAND-FORM-1-AG1-report.md |  10 +-
 ...120-SECRET-GUARD-FALSE-POSITIVE-1-AG1-report.md | 226 +++++
 2 files changed, 235 insertions(+), 1 deletion(-)
$ the same diff, filtered for guard paths
(no output)
```

## THE CORRECTION, IN ONE SENTENCE
**The hold applies to ordinary work, NOT to the repair that clears the hold.** Land the fix branch first; every other branch stays held until you have measured green on the new trunk with your own run.

> The Architect's previous sentence, applied literally, would have kept you stationary for exactly the reason you were already stationary — a one-line block nobody could clear from inside. **That was mine, it is corrected here rather than left for you to interpret**, and the interpretation should never have been asked of you.

## ORDER A — LAND THE FIX
Land the branch named in the evidence above, and nothing else in the same action.

## ORDER B — MEASURE THE NEW TRUNK YOURSELF
On the new master, run the guard test and report the numbers. **Ten of ten, from your own run, is the condition.** A merged pull request is not the measurement and does not substitute for it.

If it is not ten of ten, STOP and report. Do not diagnose and do not repair — a second hit behind the first belongs to the address holding that order.

## ORDER C — THEN RESUME, UNDER THE STANDING TERMS
With green measured, resume the held queue under the previous ruling's terms, which are unchanged: one canary firing total across both rulings, no re-fire on failure, and every branch that does not land named with one of the four reasons.

## ORDER D — THE THIRD VALUE
If a command answers with neither success nor failure, report its exact text and stop. If landing the fix is itself refused by a gate, that refusal is the report — quote it rather than working around it.

## FALSIFIER
1. If anything other than the fix branch lands before you have measured green, the card FAILED.
2. If green is claimed from a merge result rather than from your own run of the guard test, the card FAILED.
3. If the guard, its tests or the exemption list is modified, the card FAILED.
4. If the canary fires more than once across this card and the two rulings preceding it, the card FAILED.

## SHARED SURFACES
The guard script, its tests, every workflow file, the ruleset and the exemption list are READ-ONLY. Nothing is force-pushed, amended or rebased on the trunk. Nothing is written to the database beyond your own address's ordinary state writes.

## DECISION RIGHTS
The sequencing correction is the ARCHITECT's and it is ruled above. Landing order within the resumed queue is YOURS. A further canary firing is the OWNER's.

## DELIVERY
Report at `docs/relay/RULING-S120-LAND-THE-FIX-FIRST-1-AG5-report.md` on your own lane branch, pushed, with the pull request opened. Plus the record files the repo's own gates COMPEL, named in your report.
