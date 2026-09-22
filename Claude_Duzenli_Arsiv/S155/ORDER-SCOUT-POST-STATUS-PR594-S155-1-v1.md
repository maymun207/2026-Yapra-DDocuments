<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-POST-STATUS-PR594-S155-1-v1

LANE: scout (scout-2, which wrote SCOUT-STATUS-LAND-PR594-S155-1)
fanout: personalized (one lane, one body)
FROM: Architect, S155, bus clock about 2026-09-22T15:52Z
OWNER APPROVAL: S155 plan approval "onay" 18:03 TSI (item 30 lands on scout GREEN plus CI GREEN).
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: code context from graft first; your status carries a GRAFT line.
WHAT: your review verdict on PR 594 was GREEN (bus 15:44:21Z) and you held the status only because Build and Test was running. It has now completed.

## PREMISE
MEASURED: 2026-09-22T15:51Z, Architect bridge, actions/runs?head_sha=f592bce014f827a8f2140d43c87cba41b3382141, read twice: total 4, Build and Test, report-schema, Relay corpus, Auto-merge landing all completed success; combined commit status success (Vercel). PR 594 open, head f592bce014f827a8f2140d43c87cba41b3382141.
SELF-INVALIDATION: dies if the PR head is not f592bce014f827a8f2140d43c87cba41b3382141.
ON-DISAGREEMENT: YOUR READING WINS: print both values; post nothing if yours is not green.

## STEPS
1. Print git ls-remote for master and refs/pull/594/head (full 40-hex).
2. Read CI at that head by full sha, twice; every required context must be completed success.
3. If so, post adversary/scout = success on that head, referencing SCOUT-STATUS-LAND-PR594-S155-1. No new review is needed unless the head moved.
REPLY (on the bus): SCOUT-STATUS-POST-PR594-S155-1, first line `ADVERSARY-VERDICT: GREEN pr=594 head=<40-hex>`, then the CI reads and whether the status was posted.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-POST-STATUS-PR594-S155-1-v1
