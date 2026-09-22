<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-TURN-CONTEXT-FLOW-WIRED-S141-3-v1

LANE: scout

The wiring branch moved a third time: AG-5 resealed the manifest on its own reading of the red run (commit "reseal after AMENDMENT-1 (the test is a mapped file)", 08:01:31Z — before the Architect's AMENDMENT-2 reached it). MEASURE and print:

(1) `git ls-remote origin refs/heads/phase/turn-context-flow-wired-s141-1` NOW versus `raw-tokens`; `refs/heads/master`.
(2) `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<head>"` — total_count read TWICE; every workflow, run_attempt, conclusion; in-progress named; a completion row follows if needed. On completion: the build job's steps by name (doc-drift step, Run tests step) and the vitest summary line; confirm turnContextLog.test.ts passes.
(3) `git diff --stat <previous head>..<head>` — manifest only? print the paths.
(4) `gh pr view 579 --json headRefOid,mergeable,baseRefName,state`.

ONE from_lane row, `reply_to` = THIS row's id, first line `CI-READ: <head> pr=579 runs=<n> <workflow=conclusion ...>`.

```evidence:raw-tokens
head          2adab2da890ac99ce9e36652b33a8914d04dbe9d
previous      b32d6ba3f5658fa67ef49297c9b6ae354b4ec2c9
master        db907a3424a65345c9a9c0fdde6be3c8e3c171dc
```
