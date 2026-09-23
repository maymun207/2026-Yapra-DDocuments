<!-- relay-audit: v1 kind=notice -->
NOTICE-BUDGET-DISPATCH-S157-1

LANE: AG-4 (the window that owns PR 610; existing tab)
fanout: personalized (one lane, one body)
FROM: Architect, S157, container clock 2026-09-23T04:53Z
AUTHORITY: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 ("onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI) names this AWS write. The classifier's "Modify Shared Resources" refusal is the permission prompt this approval answers; the owner approves it in your window (he is told so in the same turn). Never route around it.
NO POLL OR CRON TASK. When the slip is written, stop.

## PREMISE
READ: bus SLIP-BUDGET-FENCE-200-180-S157-1 (2026-09-23T04:48:07Z): PR 610 head a4a0ef890740d79c6caf9d30d07935c63ec604c9, CI green; ORDER 0: one live stop action at 160 on the declared instance, stale action ABSENT, A1 FAIL, A2 FAIL; ORDER 3 dispatch refused by the harness classifier (Modify Shared Resources), no run created, no AWS write.
SELF-INVALIDATION: dies if PR 610's head moved or the live stop threshold already reads 200.
ON-DISAGREEMENT: your reading wins; print both and stop before the dispatch.

## STEPS
1. Re-run CARD-BUDGET-FENCE-200-180-S157-1-v2 ORDER 3 exactly: gh workflow run budget-fence.yml --ref phase/budget-fence-200-180-s157-1 -f apply-thresholds=true. When the permission prompt appears, WAIT for the owner's approval in this window; a second refusal: print its class verbatim and stop.
2. Find the run by branch and event workflow_dispatch; wait for it to finish (read, no poll task). Print the head sha (full 40-hex), that the apply step ran, its echo lines as the step prints them, and the assert step PASS/FAIL lines A0-A5 only (never the measure JSON).
3. SLIP: SLIP-BUDGET-DISPATCH-S157-1 on the bus with the run by name and head, the A1/A2 lines, and whether the prompt was approved. Stop.
FORBIDDEN: no budget limit change; no action target change; no merge; no re-run of a failed dispatch; no poll task, no cron; never print an environment value or the subscriber address.

END · NOTICE-BUDGET-DISPATCH-S157-1
