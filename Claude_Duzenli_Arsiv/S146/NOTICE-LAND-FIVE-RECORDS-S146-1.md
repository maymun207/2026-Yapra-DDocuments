<!-- relay-audit: v1 kind=notice -->
NOTICE-LAND-FIVE-RECORDS-S146-1

LANE: AG-4
FROM: Architect, S146, 2026-09-20T07:27Z
AUTHORITY: OWNER-APPROVAL-S146-LAND-FIVE-RECORDS-1 ("onayliyorum", 2026-09-20 10:19 TSI).
TAKE THIS ONLY AFTER NOTICE-VECTOR-REPAIR-CHAIN-S146-1 is finished and its slip is on the bus.
NO POLL OR CRON TASK in this window (OWNER-RULING-S143-OPERATING-MODEL-1).
fanout: personalized (one lane, one body)

## PREMISE
MEASURED: git diff --stat origin/master...origin/phase/<branch> in the owner clone, 2026-09-20T07:15Z -> each branch below adds exactly ONE file under docs/relay/ and that file is absent from master
UNMEASURED: why the four 8/8-green PRs did not auto-merge; the Architect cannot read the ruleset or check contexts, step 1 measures it
UNMEASURED: whether PR 523's 5/8 red is still the forge billing refusal its title names; step 2 replaces it with a fresh run
SELF-INVALIDATION: this premise DECAYS the moment any of these branches or PRs changes state.

## SCOPE
```scope
- PR 567 phase/s141-foreman-boot-1 docs/relay/S141-FOREMAN-BOOT-1-AG5-report.md
- PR 556 phase/s140-foreman-boot-1 docs/relay/S140-FOREMAN-BOOT-1-AG5-report.md
- PR 553 phase/s139-foreman-boot-1 docs/relay/S139-FOREMAN-BOOT-1-AG5-report.md
- PR 543 phase/land-the-ten-records-s137-1 LAND-THE-TEN-RECORDS-S137-1-AG5-report.md
- PR 523 phase/lens-measurement-repair-1-s134-1 LENS-MEASUREMENT-REPAIR-1-S134-1-AG4-report.md
```

## DO
Work in a dedicated worktree per branch, never in the main worktree another lane is using.
1. For each PR print: state, head sha, mergeable_state, auto_merge on/off, every status context and check with its conclusion, and which required context of the master ruleset is MISSING at that head.
2. For each branch: merge origin/master into it with --no-ff (no squash, no rebase), push. If the merge conflicts on anything but the one report file, STOP for that PR and report it. The push produces its own CI run; do not re-run anything to chase a green (S55-1).
3. Enable auto-merge on each PR where it is off (merge method: merge commit).
4. Read CI at each new FULL 40-hex head (actions/runs?head_sha=), zero read twice (12.10); in_progress is UNMEASURED, report it as such and stop, no wait loop.

## FALSIFIER
The landing is FALSE if any PR diff after step 2 touches a path outside its one report file. Report RED with the diff stat.

## SHARED SURFACES
Five phase branches and their PRs. No master push, no file content edited: the reports are landed as written by their author lanes (12.12).

## DECISION RIGHTS
AG-4 decides only the per-PR STOP in step 2. The adversary/scout review of the five heads is ordered to the scout separately after this slip. Closing any PR instead of landing it belongs to the owner.

## ON DIFFERENCE
If a re-measurement DIFFERS from this premise (a branch adds more than one file, a PR is already merged or closed), the re-measurement wins: skip that PR and print both values.

REPLY (on the bus): SLIP-LAND-FIVE-RECORDS-S146-1 (from AG-4), first line
LAND-FIVE: per PR <number>=<new 40-hex head>/<CI conclusion|UNMEASURED>/<missing contexts> · CronList: <output>

END · NOTICE-LAND-FIVE-RECORDS-S146-1
