<!-- relay-audit: v1 kind=notice -->
NOTICE-NO-CI-WATCH-S169-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). First line of every message: `[AG-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:25Z
AUTHORITY: OWNER-RULING-S169-NO-CI-WATCH-1 ("onay ci-izleme-yok", 2026-10-01 07:24 TSİ).
STANDING RULE, from your next step on: never watch a CI run inside your window (no background watcher, no polling a run). After a push: write your slip with the head 40-hex and "ci: dispatched (not watched)", then go straight back to `node scripts/mail-wait.mjs AG-1 --budget-min 110`. The Architect and the scouts read CI; a red result comes back to you as a notice on the bus. A window that watches CI is deaf to the bus for the whole run. Scouts: when a landing order finds CI still running, reply WAITING-CI and return to mail-wait; the order is re-sent when CI completes. Finish your current step first; reply with one ACK line.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-NO-CI-WATCH-S169-1
