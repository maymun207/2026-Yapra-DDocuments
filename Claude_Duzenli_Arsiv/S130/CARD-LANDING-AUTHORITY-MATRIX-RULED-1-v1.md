<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-AUTHORITY-MATRIX-RULED-1 · v1 — land PR #490 at its trunk-synced head; every precondition row is in YOUR box under lane_addr AG-5

Foreman card, AG-5. The only code PR in the queue, ruled to land first by OWNER-RULING-S130-LAND-490-1 ("#490 onaylıyorum. sallanmadan hemen bitir"), which lifts for this PR alone the hold in OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 and the machinery freeze in OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. AG-4 merged today's master into the branch (one merge commit, no authored byte touched); the scout reviewed the synced head and returned GREEN on content; AG-4's sync report (the CI table at that head) had not been posted when this card was cut — your own ORDER B read of the check-runs is the CI referee (S37-2), and the report, if it arrives, is corroboration only. You have no between-turn poller; the owner was asked to type one line in your window to make you read this card. Every row you need was minted AFTER your claim — read with plain `--once`, not `--pre-watermark` (A-REC-S130-15).

## PREMISE

MEASURED: 2026-09-05T06:35:02Z, SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2 (bus row ids in the unanchored `ids` transcript below): VERDICT GREEN · RESOLVER AUTHOR-SUBJECT, landable-by AG-5 (AG-4 would SELF-LAND) · HEAD = the `head` fence · SYNCED yes (master an ancestor; the head is a MERGE whose first parent is the pre-sync head, unrewritten) · `diff --name-only origin/master...head` = 8 paths, six authored + two generated · three non-merge subjects in master..head, all `AG-4:` before the first colon · seven rulings each with an implementing line and a planted-fault test · C1, secrets, empty≠zero pass. The scout says in its own words that GREEN is the CONTENT verdict and that CI was NOT concluded at 06:35Z (build (24.x) and rule26 IN-PROGRESS).
MEASURED: 2026-09-05T06:26:06Z, Vercel dpl_JDpWxhsjgWZy176fqswjhziXHUyE for the `head` fence's commit on the branch — the push sensor; CANCELED by the ignored build step as every branch push this session.
MEASURED: 2026-09-05T06:53:01Z, OWNER-APPROVAL-S130-MASTER-PUSH-PR-490-1 in your box, bound by name to the `head` fence.
UNMEASURED: the CI conclusions at the `head` fence — your own ORDER B read at the forty hex (AG-4's TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-AG-4-report was absent from the bus at 07:02Z; if a copy is in your box by the time you read, print its table too); the landed master sha and deploy (ORDER D).
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ `head` fence, PR #490 not OPEN at it, any context not success/skipped, any precondition row absent, or the scout row RED → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, PR #490, the sync | MEASURED: 2026-09-05T06:35Z scout v2 at the full forty hex | head |
| authorship class per lander | MEASURED: 2026-09-05T06:35Z scout v2 (three `AG-4:` subjects; merge commits invisible to lens one) | authorship |
| the precondition rows | POSTED to lane_addr AG-5, named in the `rows` fence; ids in the unanchored transcript | rows |
| CI at the head | UNMEASURED — ORDER B, your own read | ci |
| the landed master sha and deploy | UNMEASURED — ORDER D | landing |

```evidence:head
phase/authority-matrix-ruled-1, PR #490 (OPEN, base master), trunk-synced head:
    23ef9cee0231c5f2a03235dec4894e65a74bf1c4
its parents:
    fe7085cfcc8b16aab38de5b95c0d098236c7dc77   (pre-sync head)
    0e5022902381d04702a4598235a2ef45bbb04eda   (master at sync time, PR #492 merge)
```

```evidence:authorship
three non-merge subjects in master..head, all beginning "AG-4:" (matrix; report; descendant fix); one merge commit on top
resolver (scout v2 at the head): cls=AUTHOR-SUBJECT lane=AG-4 candidates={} ; lander AG-5 -> PASS ; lander AG-4 -> SELF-LAND (7 of 8 paths leave docs/relay/)
run with: ADF_LANE_ROLE=AG-5
```

```evidence:rows
PRECONDITION 1  to_lane AG-5, artifact_name OWNER-APPROVAL-S130-MASTER-PUSH-PR-490-1 — body names the head above
PRECONDITION 2  to_lane AG-5, artifact_name SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2 — first line "VERDICT: GREEN"
OPTIONAL      to_lane AG-5, artifact_name TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-AG-4-report — corroboration if present; its absence is NOT a WAIT
both precondition rows are NEWER than your claim: plain `--once` read; read by artifact_name, not by "newest N"
absent -> WAIT per S74-3 naming the row and the newest row you saw; RED or any failure -> STOP
```

```
bus row ids (transcript, not instruction):
  scout v2 original from_lane row      72fe8818-cb36-4aa6-84cc-d93fd0583617
  scout v2 copy in your box            14758cfd-9a30-4461-b1f1-57cf1ffe9d25
  owner approval PR-490-1 in your box  b7d33c90-5061-4086-a9f9-5590bce75d26
```

```evidence:ci
UNMEASURED at cut time. ORDER B is your own read at the forty hex; it is the referee.
```

```evidence:landing
UNMEASURED. ORDER D prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — PRECONDITIONS (S47-1)
Box read with plain `--once`. Print each precondition row's full id, created_at, artifact_name, and the scout's VERDICT / RESOLVER / HEAD lines (and AG-4's CI table if its copy is present). Then your own reads: `git ls-remote origin refs/heads/phase/authority-matrix-ruled-1` = `head`; `gh pr view 490 --json state,headRefOid,mergeable` → OPEN, head, MERGEABLE.

## ORDER B — CI AT THE HEAD
Re-read all check-runs at the full forty hex; every context by name with conclusion; eval-canary skipped named; Vercel CANCELED-by-ignored-build-step named as such (it is not a failure). Any `cancelled` (other than Vercel's ignored build step) or `failure`, or any context still in progress → STOP / WAIT by name, no re-run.

## ORDER C — LAND
In your foreman worktree on a fresh `git fetch origin`: `ADF_LANE_ROLE=AG-5 npm run land -- 490`. Expected: resolver AUTHOR-SUBJECT/AG-4, lander AG-5 → pass; tree rehearsed; merge; push. If land.ts refuses: class and first refusing line verbatim, STOP, report. The migration file under `supabase/migrations/` lands as a FILE only — you do NOT apply it, run `supabase db push`, or touch the live constraint; the Operator does that later under its own approval.

## ORDER D — PROVE
`git ls-remote origin refs/heads/master` (forty hex, fenced); landed tree vs rehearsal; Vercel production state for the new master or UNREAD; `git status --porcelain -uall`; `git worktree list`.

## ORDER E — REPORT
`LANDING-AUTHORITY-MATRIX-RULED-1-AG-5-report` as a from_lane row: ORDER A rows and reads; CI table; the landing (merge sha fenced, read-back, tree, deploy) or the STOP. Stamp this card and both precondition rows consumed (and the AG-4 copy if present).

## FALSIFIER
Wrong if the head is not the `head` fence, if PR #490 is not OPEN at it, if either precondition row is absent, if the scout row is RED, if any context is not success/skipped (Vercel's ignored-build-step cancel excepted), if the resolver class is not AUTHOR-SUBJECT/AG-4, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One merge to master by land.ts, one push. NO file edited. NO re-run. NO migration applied. NO db push. NO governed row. NO branch deletion (GitHub's delete-on-merge setting will remove the head ref by itself; that is the platform, not you).

## DECISION RIGHTS
None. You land only with both preconditions met and every context green or skipped, only via land.ts.

BODIES: `S37-2` · `S47-1` · `S63-1` · `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-LAND-490-1 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 (hold lifted for #490) · OWNER-APPROVAL-S130-MASTER-PUSH-PR-490-1 · A-REC-S130-15 · LENS-AUTHOR-SET-1.

fanout: personalized

```deliverables
master: PR #490 merged by land.ts, one push, proven by ls-remote read-back
report: bus row from_lane, artifact_name LANDING-AUTHORITY-MATRIX-RULED-1-AG-5-report
```

TAIL ANCHOR: CARD-LANDING-AUTHORITY-MATRIX-RULED-1-v1 ends here.
