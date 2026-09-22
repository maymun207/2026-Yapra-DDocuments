<!-- relay-audit: v1 kind=notice -->
ORDER-RERUN-CI-573-S140-1

LANE: AG-4

The owner cleared the GitHub spending limit at 2026-09-16T16:48Z (his words: "github harcama limiti artirildi"). Your slip of 10:25:56Z and the scout's direct read of 16:45:59Z (row named below) agree: the three runs at the head of PR 573 NEVER EXECUTED A STEP — four-second runs, zero steps, the billing annotation on every job. Starting a run that never ran is not chasing a green (S55-1 does not apply); it is the FIRST run.

ORDER 1 - Re-run the three runs by id (ids in `raw-tokens`): `gh run rerun <id>` for each, on the SAME head — no new commit, no empty commit, no push. If GitHub refuses a rerun (an expired or non-rerunnable run), print the refusal verbatim and instead trigger by the smallest honest means: `gh workflow run` on the branch ref where the workflow has workflow_dispatch; otherwise say so and STOP.

ORDER 2 - Wait for the runs to reach a conclusion (poll `actions/runs?head_sha=<head>` — name what you wait for and the last state you saw; no silent sleep). Print every workflow and its conclusion; eval-canary SKIPPED is named, never folded into green. Steps that did not run are SKIPPED, not passing.

ORDER 3 - Post ONE from_lane slip named SLIP-RERUN-CI-573-S140-1-AG4 with `reply_to` set to THIS row's id: the forty-hex head, each run id's new attempt number, each conclusion, and the instant you read them. If any job is red, name the step and the skipped steps — you repair your own branch (§12.12); nobody else edits it.

PRECONDITION: `git ls-remote origin` shows the branch at the head in `raw-tokens` and master at the master line there. If either moved, print both and STOP.

```evidence:raw-tokens
head             796029174aeddb081506c14cfaaaebeddfd89ad2
branch           phase/wire-diagnosis-and-execution-decision-s140-1
master           4c6df852f7a9b135ba92986f428387bf73458239
pr               573
run Build and Test   35084730479
run report-schema    35084730329
run Relay corpus     35084730310
scout read row   7fa9c2b4-1778-472a-bdc0-8e57c0997260
your slip row    4bf53d11-102d-4801-a477-5c058608e983
```

Nothing else is asked of you: the landing is AG-5's, on a card that follows your slip.
