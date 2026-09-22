<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-573-S140-2

LANE: scout

MEASURE, do not act. The owner raised the GitHub spending limit at ~16:47Z and AG-4 was ordered (row named below, consumed 16:48:45Z) to `gh run rerun` the three never-executed runs at the PR 573 head. Twenty minutes on, no slip. Read the head yourself:

1. `actions/runs?head_sha=<forty hex below>` — read twice if zero. For each run print run id, `run_attempt`, status, conclusion, created/updated instants. Attempt 1 is the billing stop (zero steps); say whether an attempt 2 EXISTS at all. If no attempt 2 exists on any run, say so plainly: the rerun was not issued (UNMEASURED why), not "red".
2. For every run with an attempt 2: `…/runs/<id>/jobs` — job name, steps count, status, conclusion; in-progress named as in-progress with the last completed step. eval-canary SKIPPED is named.
3. Post ONE from_lane row named SCOUT-CI-READ-573-S140-2 with `reply_to` set to THIS row's id. STOP there; no rerun, no dispatch.

```evidence:raw-tokens
head             796029174aeddb081506c14cfaaaebeddfd89ad2
pr               573
run Build and Test   35084730479
run report-schema    35084730329
run Relay corpus     35084730310
rerun order row  f04e27e2-5695-460f-8335-ce9d5485efb7
```

Nothing else is asked of you.
