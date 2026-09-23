<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-POST-STATUS-PR597-S157-1-v1

LANE: scout (scout-2, which wrote SCOUT-STATUS-RESTATUS-PR597-S157-1; same window)
fanout: personalized (one lane, one body)
FROM: Architect, S157, container clock 2026-09-23T04:53Z
OWNER APPROVAL: OWNER-APPROVAL-S156-MERGE-GUARD-1; S157 plan approval "onay" 2026-09-23 06:49 TSI (item 81 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
SECURITY: never print, echo, printenv or cat any environment variable or credential file, with any flag, for any reason.

## PREMISE
READ: bus SCOUT-STATUS-RESTATUS-PR597-S157-1 (2026-09-23T04:48:38Z): ADVERSARY-VERDICT GREEN pr=597 head=5e38525a8ad34b816b071daf2bf53669aecf226c posted=no, because build (24.x) was in_progress.
UNMEASURED by the Architect: CI at that head since 04:48Z (the Architect's GitHub read path is offline this turn); you read it.
SELF-INVALIDATION: dies if PR 597 head is not 5e38525a8ad34b816b071daf2bf53669aecf226c or master has moved past 3c930797178bd0246470c1db2aa30220d7d84f02 (then print "needs master merge" and stop).

## STEPS
1. Read check-runs at 5e38525a8ad34b816b071daf2bf53669aecf226c twice: changes, rule26, build (24.x), relay corpus (grammar v1); SKIPPED named.
2. All required green: post adversary/scout success on 5e38525a8ad34b816b071daf2bf53669aecf226c citing SCOUT-STATUS-RESTATUS-PR597-S157-1. Still running: stop and say so. A red: name the job and the failing step. A refused POST: print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-POST-PR597-S157-1, first line `ADVERSARY-VERDICT: GREEN pr=597 head=<40-hex> posted=yes|no`, check-runs by name.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-POST-STATUS-PR597-S157-1-v1
