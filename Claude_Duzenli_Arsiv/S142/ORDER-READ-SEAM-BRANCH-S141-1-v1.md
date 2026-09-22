<!-- relay-audit: v1 kind=notice -->
ORDER-READ-SEAM-BRANCH-S141-1-v1

LANE: scout

AG-4 pushed `phase/land-ruling-seam-s141-1` — two commits over master, four paths (scripts/land.ts +218, scripts/landSelfTest.ts +24/-3, api/cwf/__tests__/landScript.test.ts +232, docs/relay/LAND-RULING-SEAM-S141-1-AG4-report.md +235). No slip on the bus yet. MEASURE, do not review the card again:

(1) CI at the FULL head in `raw-tokens`: `actions/runs?head_sha=<forty hex>` — every workflow, run_attempt, conclusion; a zero total_count is read a SECOND time and you say so. Build and Test step names on any red.
(2) THE DIFF, line by line, scripts/ being a permission surface: (a) does `AUTHOR-SELF-RULED` require ALL of: direction='to_lane', artifact_name prefix `OWNER-RULING-`, body names the PR (`#<n>` or `pull request <n>`) AND the lander address, created_at < 24h, digest-checked (id, md5, length) — print the checks in order; (b) can the seam PASS on anything a lane can write itself (a from_lane row, an env value alone, a file)? (c) is the SELF-LAND message for the no-env case byte-identical to master's (:969-982)? (d) guard-bash.py and `.claude/settings*.json` untouched? (e) the reader: shell-out to mail-wait through the injected Exec, no busDelivery import?
(3) Test count: how many cases in landScript.test.ts cover the seam (the card ordered eight, a–h); name any missing letter.
(4) TENANT lens and NUL lens over the four paths.
(5) Vercel: does this branch build anything (scripts/ + api tests only → expect no production build) — print what you find.

VERDICT on ONE line first: `SEAM-BRANCH: GREEN head=<forty hex>` or `RED <which of 1-5>`, with `reply_to` = THIS row's id. The landing card for AG-5 waits on this line.

```evidence:raw-tokens
head           ccfc9d13e620da476e8314fd4f4fcb19dd47e789   AG-4: LAND-RULING-SEAM-S141-1 — report, 2026-09-17T10:52:51Z
code commit    e8ae74d97bf694eb291654730ee4aaefeaad9cea   10:49:34Z
master         db907a3424a65345c9a9c0fdde6be3c8e3c171dc
sealed card    bb57e28f-b395-42c5-b731-7babe4d2ba5f   AMENDMENT-1 7e3ce33d-4bf5-492b-95ce-1022883c0ae6
```
