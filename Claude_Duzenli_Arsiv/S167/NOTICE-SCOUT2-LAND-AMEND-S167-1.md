<!-- relay-audit: v1 kind=notice -->
NOTICE-SCOUT2-LAND-AMEND-S167-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 notice" and stops). First line of every message: `[scout-2]`.
fanout: personalized (one lane, one body)
FROM: Architect, S167, 2026-09-30T21:35Z
AMENDS ORDER-SCOUT-LAND-656-657-S167-1: PR 657 will NOT land. The header-only fix was refused by AG-3 with a measurement (header alone → the grammar then demands ## CLAIMS, ## DIFF and flags two short hexes: 36/37). Under NOTICE-INBUCKET-CARRY-S167-1, AG-3 carries the same config.toml change onto phase/inbucket-s167-2 with its OWN report and opens a new PR; it then closes 657 as SUPERSEDED-BY. Your order's part 1 applies to THAT new PR (same checks; the config.toml diff must be byte-equal to 67eaf3b36149e43655e0ea82bfd402b67054b49f's; the report is AG-3's own). Land 656 first as ordered; then the new INBUCKET PR when its Build and Test is green. Never post a status on 657.
AUTHORITY: OWNER-APPROVAL-S167-PLAN-1.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable. Reply: ACK-BY-REPLY, one line.

END · NOTICE-SCOUT2-LAND-AMEND-S167-1
