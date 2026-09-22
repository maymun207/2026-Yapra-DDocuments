<!-- relay-audit: v1 kind=notice -->
ORDER-READ-CI-TURN-CONTEXT-FLOW-WIRED-S141-2-v1

LANE: scout

AG-5 applied AMENDMENT-1: the wiring branch moved to the head in `raw-tokens` (one commit over the red head, one file, turnContextLog.test.ts +22/-3). Master moved too — PR 578 landed (the docs/relay baseline report only). MEASURE and print:

(1) `git ls-remote origin refs/heads/phase/turn-context-flow-wired-s141-1` and `refs/heads/master` NOW versus `raw-tokens`.
(2) `gh api "repos/maymun207/cwf_yaprak/actions/runs?head_sha=<new forty-hex head>"` — total_count read TWICE; every workflow, run_attempt, conclusion; in-progress named. If Build-and-Test completes while you read, print the vitest summary line and confirm turnContextLog.test.ts passes; if it does not, name the failing test and line.
(3) `git diff <red head>..<new head>` — the whole hunk: confirm the importer pin is now an EXACT sorted list of five paths (two tests + context.ts, stageTools.ts, types.ts), the scan and the grantPolicy positive control are kept, and nothing else changed.
(4) `gh pr view 579 --json headRefOid,mergeable,baseRefName,state`.

ONE from_lane row, `reply_to` = THIS row's id, first line `CI-READ: <head> pr=579 runs=<n> <workflow=conclusion ...> pin=<exact-list|weakened|other>`; if Build-and-Test is in progress on your first read, a completion row follows when it lands (as you did for the red run).

```evidence:raw-tokens
new head      b32d6ba3f5658fa67ef49297c9b6ae354b4ec2c9
red head      2f04591f56a7f67a37ba3133ef57ff6c92fc4097
master        db907a3424a65345c9a9c0fdde6be3c8e3c171dc   (merge of PR 578, 07:48:21Z)
amendment     4e0b9139-1df1-4345-bf97-fdf637cce201
```
