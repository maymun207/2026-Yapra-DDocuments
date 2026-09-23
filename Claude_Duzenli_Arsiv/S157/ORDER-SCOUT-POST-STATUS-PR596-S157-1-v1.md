<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-POST-STATUS-PR596-S157-1-v1

LANE: scout (scout-2, which wrote SCOUT-STATUS-LAND-PR596-S157-1; same window if still open, else fresh)
fanout: personalized (one lane, one body)
FROM: Architect, S157, bridge clock 2026-09-23T04:02Z
OWNER APPROVAL: S157 plan approval "onay" 2026-09-23 06:49 TSI (item 58 G1b lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
SECURITY: never print, echo, printenv or cat any environment variable or credential file, with any flag, for any reason. Your previous window printed CWF_LANE_DATABASE_URL; that is being rotated. If you need the write path, call the verb and let it read the variable itself.

## PREMISE
MEASURED: 2026-09-23T03:58:12Z, bus SCOUT-STATUS-LAND-PR596-S157-1: ADVERSARY-VERDICT GREEN pr=596 head=b6de1efd9a12236901e8319c256f2f5d900a0970, content only; status not posted because build (24.x) was in_progress.
MEASURED: 2026-09-23T04:01:51Z, Architect bridge, actions/runs?head_sha=b6de1efd9a12236901e8319c256f2f5d900a0970: total 4, Auto-merge landing, report-schema, Relay corpus, Build and Test all completed success. Master 1ca28ede61588ff542764cf3f1375568c94436ae unmoved.
UNMEASURED: check-runs at the head (the Architect's token cannot read them); you read them.
SELF-INVALIDATION: dies if PR 596 head is not b6de1efd9a12236901e8319c256f2f5d900a0970 or master has moved (then print "needs master merge" and stop).

## STEPS
1. Read check-runs at b6de1efd9a12236901e8319c256f2f5d900a0970 twice: changes, rule26, build (24.x), relay corpus (grammar v1) must be success; SKIPPED named.
2. If all green: post adversary/scout success on b6de1efd9a12236901e8319c256f2f5d900a0970 with description citing SCOUT-STATUS-LAND-PR596-S157-1. If the harness refuses the POST, print the refusal class verbatim and stop.
REPLY (on the bus): SCOUT-STATUS-POST-PR596-S157-1, first line `ADVERSARY-VERDICT: GREEN pr=596 head=<40-hex> posted=yes|no`, check-runs by name.
FORBIDDEN: no edit, no push, no merge, no re-run, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-POST-STATUS-PR596-S157-1-v1
