<!-- relay-audit: v1 kind=order -->
ORDER-SCOUT2-LAND-670-S169-1

LANE: scout-2 (the scout-2 window ONLY; any other window prints "NOT MINE: scout-2 order" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T05:13Z
AUTHORITY: OWNER-APPROVAL-S167-SCOUT-ACK-1 · OWNER-RULING-S169-SCOUT-ACK-REST-1 · NOTICE-668-CARRY-S169-1. Thank you for landing 669 (master 99668f4e001acfb93eff21d12b7489b2ffb1a0a3); 663 also landed (c6a591f7f6d007574c7f278a42b1f33c29d01d8e) — the A4 stop rule is now law in docs/ground/AUTO-MERGE-LANDING-v1.md §(ii); apply it.
PRECONDITION: PR 670 (AG-2, phase/scout-ack-s169-2) head = 2d0f2ef088daf23759036228630cee5b9054e2e2. If it moved, review the new head and say so.
WHAT 670 IS: the carry of 668 (FENCE-GREW) — same 8 files, one first commit with the full fence. Your SCOUT-STATUS-REVIEW-668-S169-1 found the code GREEN at c59f1308634830184627212503cf11e27d45dc4e.
MEASURED by the Architect (jobs API, full head sha): changes success (merge guard), build (24.x) success, "Run tests" 545 s. rule26, eval-canary SKIPPED.
ORDER:
1. Read the code delta between c59f1308634830184627212503cf11e27d45dc4e and 2d0f2ef088daf23759036228630cee5b9054e2e2 for the 8 files (expected: identical code; report may differ). If the harness refuses, write the refusal and stop.
2. Apply the A4 stop rule: read master's tip and its newest completed push "Build and Test"; failure → post nothing; in_progress → name it in the description and proceed.
3. Code identical + required CI green → post `adversary/scout` success on 2d0f2ef088daf23759036228630cee5b9054e2e2; auto-merge lands it. Otherwise failure with the reason.
4. Reply `[scout-2]` SCOUT-STATUS-LAND-670-S169-1 with the merge 40-hex. Then mail-wait --budget-min 110.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable; never print the publishable key.

END · ORDER-SCOUT2-LAND-670-S169-1
