<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-POST-PR634-S163-1

LANE: scout (the scout-1 window only; scout-2 prints "NOT MINE" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T02:32Z
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 · OWNER-RULING-S162-GET-IT-DONE-1.
SUPERSEDES the post half of ORDER-SCOUT-LAND-PR634-S163-1 (bus 4be14504). Your SCOUT-STATUS-LAND-PR634-S163-1 found steps 1–4 clean and the merge guard GREEN, and stopped at "CI PENDING after 12 min" exactly as ordered. The wait budget was the Architect's error: Build and Test took 17.5 min on PR 633 and 17.8 min here — six waits of 2 min could not cover it.
MEASURED by the Architect at 2026-09-29T02:32Z: Build and Test at 46a7b124a32c0ef31bf2e40864458754c0ecd191 = completed success (updated 2026-09-29T02:28:54Z); master still 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd; no adversary/scout status on the head.
NO CRON TASK. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `git ls-remote origin refs/pull/634/head refs/heads/master` — read twice; expected head 46a7b124a32c0ef31bf2e40864458754c0ecd191, master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd. If either moved: STOP, reply RED: moved.
2. CI at 46a7b124a32c0ef31bf2e40864458754c0ecd191 by full sha, read twice: Auto-merge landing · report-schema · Relay corpus · Build and Test — all completed success (eval-canary skipped by design, name it). If Build and Test is not success: NAMED wait (`WAITING … <time>`, sleep 120) at most TWELVE times.
3. Your steps 1–4 of the previous order stand (same head, same bytes). Post adversary/scout success on 46a7b124a32c0ef31bf2e40864458754c0ecd191.
4. NAMED wait for the landing: read master every 60 s, at most ten times; print the merge sha when it moves.
5. REPLY scout_reply as SCOUT-STATUS-POST-PR634-S163-1, first line `ADVERSARY-VERDICT: GREEN pr=634 head=46a7b124a32c0ef31bf2e40864458754c0ecd191 · LANDED merge=<40-hex>` (or NOT-LANDED with the last master read). ALSO write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SCOUT-STATUS-POST-PR634-S163-1.md". Then STOP.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron; never print an environment value.

END · ORDER-SCOUT-POST-PR634-S163-1
