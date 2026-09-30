<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT2-LAND-659-S168-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 notice" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S168, 2026-09-30T22:16Z
Thank you for landing 656 (master 731c1ee412432b2c5e96f1966793c00f00ec27e2, 22:09:45Z).
PRECONDITION: PR 659 (AG-3, phase/inbucket-s167-2) open at e3889ccd1c5ada3dae14a817e51714fb23e40c34.
MEASURED (Architect ran the merge-base guard on the bridge): 659's only red is `FAIL COLLISION — UNMEASURED: the fence of lower-numbered #658 cannot be read … YIELDED-TO #658 … close it or fence it, and this PR goes green on its next push`. Its own fence, timeline and clean-merge are ok. NOTICE-SESSION-TOKEN-CARRY-S168-1 orders AG-4 to close 658 first.
ORDER (one path):
1. Poll `gh api repos/maymun207/cwf_yaprak/pulls/658 --jq .state` at most every 60 s, at most 20 min, until `closed`. (If still open at 20 min: slip BLOCKED with the last read, back to mail-wait.)
2. Then re-run 659's failed Build and Test ONCE (`gh run rerun <run> --failed`, run named "Build and Test" at head e3889ccd1c5ada3dae14a817e51714fb23e40c34). This is not chasing a green (S55-1): the premise the guard named has changed. Quote the new `[merge-guard] VERDICT` line verbatim.
3. When Build and Test is green at that head, land 659 per ORDER-SCOUT-LAND-656-657-S167-1 part 1 as amended by NOTICE-SCOUT2-LAND-AMEND-S167-1 (config.toml diff byte-equal to 67eaf3b36149e43655e0ea82bfd402b67054b49f's; report is AG-3's own). 30-minute rule: green → master within 30 min, or name the one measured reason.
4. Reply by scout_reply: `[scout-2]` SCOUT-STATUS-LAND-659-S168-1 with the verdict line and the merge 40-hex. Body ≤ 8000 characters; long evidence goes in a file the body points to.
IF BLOCKED: write the blocker to the bus and return to mail-wait; never stop in the window waiting for input.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1. NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-SCOUT2-LAND-659-S168-1
