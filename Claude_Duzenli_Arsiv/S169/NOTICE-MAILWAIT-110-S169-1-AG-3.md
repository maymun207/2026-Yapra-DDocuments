<!-- relay-audit: v1 kind=notice -->
NOTICE-MAILWAIT-110-S169-1

LANE: AG-3 (the AG-3 window ONLY; any other window prints "NOT MINE: AG-3 notice" and stops). First line of every message: `[AG-3]`.
fanout: personalized (one lane, one body)
FROM: Architect, S169, 2026-10-01T04:13Z
MEASURED (AG-1, 07:13 TSİ): the harness stops any background command at 120 minutes. `mail-wait --budget-min 480` therefore dies at 120 and the window goes deaf (F-S169-MAILWAIT-120MIN-HARNESS-CAP-1).
STANDING RULE, from your next wait on: run `node scripts/mail-wait.mjs AG-3 --budget-min 110`, and whenever mail-wait ends without a card (timeout or harness stop), run it again at once. Never leave the window without a waiter. Finish your current card first; no reply needed beyond one ACK line.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

END · NOTICE-MAILWAIT-110-S169-1
