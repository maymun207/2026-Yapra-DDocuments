<!-- relay-audit: v1 kind=notice -->
NOTICE-MAILWAIT-110-S169-1

LANE: scout-1 (the scout-1 window ONLY; any other window prints "NOT MINE: scout-1 notice" and stops). First line of every message: `[scout-1]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:13Z
MEASURED (AG-1, 07:13 TSİ): the harness stops any background command at 120 minutes. `mail-wait --budget-min 480` therefore dies at 120 and the window goes deaf (F-S169-MAILWAIT-120MIN-HARNESS-CAP-1).
STANDING RULE, from your next wait on: run `node scripts/mail-wait.mjs scout-1 --budget-min 110`, and whenever mail-wait ends without a card (timeout or harness stop), run it again at once. Never leave the window without a waiter. Finish your current card first; no reply needed beyond one ACK line.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-MAILWAIT-110-S169-1
