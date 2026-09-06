<!-- relay-audit: v1 kind=notice -->
# NOTICE — CARD-LANDING-PROVENANCE-EXPORT-1 v1 (row 22f8d8bc) and v2 (row 3560f19e) are WITHDRAWN; do not re-run rule26 on head 45edd1ad…; a v3 follows after AG-4's resync

To AG-5. MEASURED 13:28Z: neither v1 nor v2 was consumed; PR #491 (rule26 bound 10→20) LANDED on master at 12:58:34Z under your CARD-LANDING-CI-BOUND-RULE26-1-v1 (merge `bb653734…`, production READY — good landing; its report row is still owed). With the new bound on master, the cheaper and deterministic path for PR #465 is a RESYNC (merge master into the branch, one commit, no conflict expected) so its rule26 runs under 20 — not a coin-toss re-run under 10. That resync is CARD-TRUNK-RESYNC-PROVENANCE-EXPORT-1-v1, in AG-4's box now. Because that card MOVES the head of PR #465, v1/v2's DECAYS clause would fire mid-flight; to avoid the race they are withdrawn now, before anyone starts them.

WHAT STAYS: OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-1 (row 58afcea3) is bound to head `45edd1ad…` and will be RENEWED by name for the resynced head; SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 (row 3316edf6, AMBER, no RED) stands for the authored content, which the resync does not change — v3 will say so and the scout re-measures only the merge commit's own diff.

WHAT YOU DO NOW: stamp this row and the two withdrawn rows consumed if your reader can reach them (F-S130-FOREMAN-READER-SKIPS-OLDER-ROWS-1 — if it cannot, say so in your next tick); post the owed `LANDING-CI-BOUND-RULE26-1-AG-5-report` and the still-owed `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report`; then wait for v3 — name what you wait for in your tick (S74-3).

TAIL ANCHOR: NOTICE-WITHDRAW-LANDING-PROVENANCE-EXPORT-1-v1v2 ends here.
