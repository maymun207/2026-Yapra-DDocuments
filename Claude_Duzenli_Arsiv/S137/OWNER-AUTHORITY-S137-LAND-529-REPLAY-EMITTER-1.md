# OWNER-AUTHORITY-S137-LAND-529-REPLAY-EMITTER-1

Given by the owner in his own words, 2026-09-12T18:00Z (21:00 local), immediately after being shown the
adversary's gate-by-gate measurement:

    OWNER-AUTHORITY-S137-LAND-529-REPLAY-EMITTER-1 — PR 529 birlesmis agacta yesilse AG-5 indirebilir.

## WHAT HE WAS SHOWN BEFORE HE GAVE IT

Not a summary. The adversary read the runs, jobs and steps endpoints twice, at 2026-09-12T17:42:57Z and
17:44:01Z, and the report named every gate and every step:

```evidence:forge
at b29355fd785728a6eed5cca0dd58b54e025bad66 — EVERY GATE CONCLUDED GREEN:
  Relay corpus SUCCESS · report-schema SUCCESS · Build and Test SUCCESS
  inside it: changes SUCCESS (heavy=true ui=true, full suite), rule26 SUCCESS,
  eval-canary SKIPPED and named by if:false, build (24.x) SUCCESS with all nine
  steps executed and green. No step skipped, no step failed.

at ac44a15c25966d0dfb223fc096d7e11e2fc63d12 (the live tip, a report-only commit):
  Relay corpus SUCCESS · report-schema SUCCESS · Build and Test IN PROGRESS,
  with the step named Build already SUCCESS. Nothing red.
```

The two open questions of the last three sessions both closed by EXECUTION rather than by argument: the
C-SEAM structural pin passes because `emit` is now classified READ and supplied by the replay context
builder, and `lensPartialSurvivesKill` passes because commit one brought master's atomic writer onto the
branch. The one-versus-two disagreement is settled: the second failure was master's own torn-write race,
exactly as the adversary ruled, and it is gone.

## WHAT THIS AUTHORITY COVERS

ONE landing of pull request 529 by AG-5, on the merged tree. Master is already an ancestor of the tip, so
the base is NOT-OWED and the branch tree IS the merged tree. It does not override a red gate, it does not
survive a re-cut of the branch, and no spend approval accompanies it — the canary carries `if: false`.

## THE ARCHITECT'S OWN ERROR IN THE SAME HOUR, RECORDED BESIDE IT

Fifty minutes before this authority, the Architect told the owner that AG-4 was silent and asked him to go
look at the lane's window. That was wrong twice over, and both are named classes in this house's own law.

`§12.11(b)` — a lane editing files and running tsc or vitest touches no database and reaches no forge; it
is INVISIBLE to every lens the Architect holds. Absence of a push is not absence of work.

`§12.10` — absence of a green is not evidence of a red. "Two hours of silence" was a NON-MEASUREMENT
reported as a finding.

The measurement that corrected it: the card row's `consumed_at` was 2026-09-12T16:17:12Z, twenty-four
seconds after the insert, and the clone's FETCH_HEAD was written eight seconds after that. The lane had
read the card and started immediately. It pushed its first commit at 17:14Z and its second at 17:17Z.

The action item to the owner was withdrawn in the next message. Had he acted on it he would have
interrupted a working lane.

## THE PROCEDURAL RULE ADOPTED FROM IT

Two consecutive unmoved measurements are a REPORT TO THE OWNER and a finding, never a third tick. The
Architect had run four.

END · OWNER-AUTHORITY-S137-LAND-529-REPLAY-EMITTER-1
