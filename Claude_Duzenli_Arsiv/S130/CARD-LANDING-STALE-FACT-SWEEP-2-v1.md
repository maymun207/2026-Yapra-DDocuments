<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-STALE-FACT-SWEEP-2 · v1 — land PR #492 at its green head; every precondition row is in YOUR box under lane_addr AG-5

Foreman card, AG-5. Third product landing under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1, in the owner's ruled order (context-retrieval-1 → provenance-export-1 → stale-fact-sweep). The sweep was re-authored under one token (OWNER-RULING-S130-SWEEP-REAUTHOR-1) and its inherited red cleared by a two-assertion test fix (OWNER-RULING-S130-SWEEP-TEST-FIX-1); every CI context is green at the head. You have no between-turn poller (your own finding); the owner was asked to type one line in your window to make you read this card.

## PREMISE

MEASURED: 2026-09-05T04:28Z, TEST-FIX-STALE-FACT-SWEEP-2-AG-4-report (row 8f03b660, 04:33:51Z): head in the `head` fence; `gh api check-runs` at the full forty hex, total_count 7: build (24.x) SUCCESS 16m46s · rule26 SUCCESS 6m08s · relay corpus, report-schema, changes, Vercel Preview Comments success · eval-canary SKIPPED; two non-merge subjects in master..head, both `AG-4:` before the first colon; the second commit changes one file (the test), +12/−3.
MEASURED: 2026-09-05T03:51Z, SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1 at the previous head: four authored paths byte-identical to the source tip (blob shas); resolver `AUTHOR-SUBJECT lane=AG-4`, lander AG-5 → PASS; the RED it recorded was the test now fixed.
UNMEASURED: the scout's v2 verdict at the new head — it is PRECONDITION 2 and lands in your box as a to_lane row; the landed master sha and deploy (ORDER D).
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ `head` fence, PR #492 not OPEN at it, any context not success/skipped, or the scout row absent or RED → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, PR #492, CI table | MEASURED: 2026-09-05T04:28Z AG-4 report, full forty hex | head |
| authorship class per lander | MEASURED: 2026-09-05T03:51Z scout v1; subjects unchanged in form (two `AG-4:`) | authorship |
| the precondition rows | POSTED to lane_addr AG-5: approval …-PR-492-1; scout v2 verdict copy (named below) | rows |
| the landed master sha and deploy | UNMEASURED — ORDER D | landing |

```evidence:head
phase/stale-fact-sweep-2, PR #492 (OPEN, base master), head:
    621d0d862f09456053b0aaf5528bcbd5a81dbac5
master at cut time (PR #465 merge):
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
CI at the head (AG-4, 04:28Z, total_count 7): build SUCCESS 16m46s · rule26 SUCCESS 6m08s · eval-canary SKIPPED · others success
```

```evidence:authorship
two non-merge subjects in master..head, both beginning "AG-4:" (re-author; test-fix)
resolver (scout v1 at the parent head): cls=AUTHOR-SUBJECT lane=AG-4 candidates={} ; step B lander AG-5 -> PASS
run with: ADF_LANE_ROLE=AG-5
```

```evidence:rows
PRECONDITION 1  to_lane AG-5, artifact_name OWNER-APPROVAL-S130-MASTER-PUSH-PR-492-1, body names the head above
PRECONDITION 2  to_lane AG-5, artifact_name SCOUT-REVIEW-STALE-FACT-SWEEP-2-v2, first line "VERDICT: GREEN" (AMBER acceptable; RED -> STOP)
both rows are OLDER or NEWER than this card by minutes; read by artifact_name with --pre-watermark, not by "newest N"
absent -> WAIT per S74-3 naming the row and the newest row you saw
```

```evidence:landing
UNMEASURED. ORDER D prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — PRECONDITIONS (S47-1)
Box read with `--pre-watermark` (your finding 3: a card may sit below your watermark). Print each precondition row's full id, created_at, artifact_name, and the scout's VERDICT and RESOLVER lines. Then your own reads: `git ls-remote origin refs/heads/phase/stale-fact-sweep-2` = `head`; `gh pr view 492 --json state,headRefOid,mergeable` → OPEN, head, MERGEABLE.

## ORDER B — CI AT THE HEAD
Re-read all check-runs at the full forty hex; every context by name; eval-canary skipped named. Any `cancelled` or `failure` → STOP.

## ORDER C — LAND
In your foreman worktree on a fresh `git fetch origin`: `ADF_LANE_ROLE=AG-5 npm run land -- 492`. Expected: resolver AUTHOR-SUBJECT/AG-4, lander AG-5 → pass; tree rehearsed; merge; push. If land.ts refuses: class and first refusing line verbatim, STOP, report.

## ORDER D — PROVE
`git ls-remote origin refs/heads/master` (forty hex, fenced); landed tree vs rehearsal; Vercel production state for the new master or UNREAD; `git status --porcelain -uall`; `git worktree list`.

## ORDER E — REPORT
`LANDING-STALE-FACT-SWEEP-2-AG-5-report` as a from_lane row (you have the posting path — your own measurement): ORDER A rows and reads; CI table; the landing (merge sha fenced, read-back, tree, deploy) or the STOP. Stamp this card and both precondition rows consumed.

## FALSIFIER
Wrong if the head is not the `head` fence, if PR #492 is not OPEN at it, if either precondition row is absent, if the scout row is RED, if any context is not success/skipped, if the resolver class is not AUTHOR-SUBJECT/AG-4, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One merge to master by land.ts, one push. NO file edited. NO re-run. NO migration. NO db push. NO governed row. NO branch deletion.

## DECISION RIGHTS
None. You land only with both preconditions met and every context green or skipped, only via land.ts.

BODIES: `S37-2` · `S47-1` · `S63-1` · `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S130-SWEEP-REAUTHOR-1 · OWNER-RULING-S130-SWEEP-TEST-FIX-1 · OWNER-APPROVAL-S130-MASTER-PUSH-PR-492-1 · LENS-AUTHOR-SET-1 · F-S130-HANDOVER-CARD-BELOW-WATERMARK-1.

fanout: personalized

```deliverables
master: PR #492 merged by land.ts, one push, proven by ls-remote read-back
report: bus row from_lane, artifact_name LANDING-STALE-FACT-SWEEP-2-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-STALE-FACT-SWEEP-2-v1 ends here.
