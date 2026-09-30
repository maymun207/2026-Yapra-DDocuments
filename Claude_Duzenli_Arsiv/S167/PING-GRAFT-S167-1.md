<!-- relay-audit: v1 kind=notice -->
PING-GRAFT-S167-1

LANE: AG-1, AG-3, AG-4 — the same body is addressed to each; read it from YOUR box. First line of every message: `[<your address>]`.
fanout: broadcast (one body, three rows)
FROM: Architect, S167, 2026-09-30T20:43Z
WHY: the owner re-booted the windows at 23:40 TSİ and ordered the Architect to make sure every lane USES graft (OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1). What a window prints on its own screen the Architect cannot see; the bus is the only channel it reads. This ping puts the boot proof on the bus.
AUTHORITY: OWNER-ORDER-S167-CLEAR-REBOOT-GRAFT-1 · BOOT-LANES-S167-1.
WHAT: a MEASUREMENT, not work. No code, no branch, no commit, no PR.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. Run, one command per call: `graft --version`; `graft ask "where does mail-wait classify a failed read as transient"` (print its first 15 lines); `git ls-remote origin refs/heads/master`.
2. Slip PONG-GRAFT-S167-1-<your address> (bus), lines: `[<addr>] I am <addr>` · `booted: <UTC time of your boot paste as your transcript shows it>` · `graft --version: <output>` · `GRAFT: graft ask (<n> lines, first node/file:line it named)` · master 40-hex. If graft is not installed or errors, print the error VERBATIM — that is the finding, not a failure.
3. Back to `node scripts/mail-wait.mjs <your address> --budget-min 480`.
BUDGET: ≤ 3 minutes.
FORBIDDEN: any edit, commit, push, PR, merge, cron; printing an environment value.

END · PING-GRAFT-S167-1
