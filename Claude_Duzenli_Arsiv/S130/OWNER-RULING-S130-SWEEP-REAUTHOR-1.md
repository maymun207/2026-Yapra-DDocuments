<!-- relay-audit: v1 kind=notice -->
# OWNER-RULING-S130-SWEEP-REAUTHOR-1 — the stale-fact sweep is re-authored under one lane token; the original authors remain the authors of record

Owner's words, verbatim (2026-09-05 ~06:0x TSİ / 03:0xZ, answering the Architect's one-path proposal "re-author onay"): "evet blok foreman a  yapistirildi.  + onay". The "+ onay" is the ruling on the proposal; the first clause is the owner's testimony that the foreman takeover confirmation was pasted (recorded separately in the foreman's own report). Recorded by the Architect; the executing card is CARD-REAUTHOR-STALE-FACT-SWEEP-2-v1 (AG-4).

## THE FACT RULED ON

MEASURED (scout, SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1, 2026-09-05T01:50Z, installed `resolveAuthorLane` + `judgeReportOnly` at the branch tip): `phase/stale-fact-sweep-1` (PR #452, OPEN) carries two non-merge subjects with two different lane tokens (AG-1, AG-2) → `cls=AUTHOR-UNKNOWN`, landable-by NONE; lens two (report header) is structurally not consulted on `mixed` (land.ts:1297-1302, by design: "contradictory subjects are not rescued"). Content: GREEN — four authored paths change comments and one JSDoc block only; authority values on `shared/grantPolicy.ts` and `shared/dbConstants.ts` byte-identical; report passes grammar v1; the one merge conflict is the generated manifest's reseal stamp.

## THE RULING

1. AG-4 opens `phase/stale-fact-sweep-2` from today's master, carries the four authored paths' CONTENT byte-identical (proven by a non-comment diff grep), regenerates the two generated files, and commits ONCE under the token `AG-4:`. The commit body names AG-1 (PHASE-STALE-FACT-SWEEP-1) and AG-2 (PHASE-TRIAGE-REDS-1 reseal) with their full source shas as the authors of record — git author AG-4, intellectual authors AG-1/AG-2 (S112-YASA-1's attribution principle applied to lanes).
2. PR #452 is closed as SUPERSEDED-BY the new PR, with a one-line comment naming the resolver reason. No branch deletion.
3. The resolver is NOT changed (OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1). No hand merge (S102-YASA-1).
4. The new PR follows the standing chain: scout review at its head → landing card to the foreman → owner master-push approval under the standing "numara sorma, devam" instruction.

## WHAT THIS RULING DOES NOT DO

It does not decide whether a future two-author branch should be rescued by lens two; that is a resolver design question and stays frozen with the ADF. It does not re-measure the sweep's dated claims (scout A1/A3) — those are a separate product card if the owner wants them.

```evidence:source
phase/stale-fact-sweep-1 tip (PR #452):
    6769f519290c3da2dc8bb6240b1d65db34dbeac2
master at ruling time:
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
```

TAIL ANCHOR: OWNER-RULING-S130-SWEEP-REAUTHOR-1 ends here.
