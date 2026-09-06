<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1 · v2 — the only code PR in the queue, now ruled to land: re-review at its trunk-synced head against the owner's seven rulings and the laws

Scout card. Read-only by your charter. Supersedes the S130 v1 review (your SCOUT-VERDICT-AUTHORITY-MATRIX-RULED-1-v1, 2026-09-04 06:42Z) whose head moved once (the "report must not name its own descendant" fix) and is now being trunk-synced by AG-4 under CARD-TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-v1. Owner's ruling OWNER-RULING-S130-LAND-490-1 lifts the HOLD and the machinery freeze for this PR alone. Review the head you find; if AG-4's merge commit is not yet pushed when you start, review the pre-sync head and say so — the landing card will wait for CI at the synced head regardless.

## PREMISE

MEASURED: 2026-09-05T05:32Z your triage: PR #490 OPEN, 8 paths, resolver AUTHOR-SUBJECT lane AG-4, lander AG-5 PASS, MERGEABLE, all seven contexts green at the `head` fence's PR line.
MEASURED: 2026-09-04T06:42Z your v1 verdict (row SCOUT-VERDICT-AUTHORITY-MATRIX-RULED-1-v1) on the earlier head — carry forward whatever still holds; re-measure what the later commit and the sync change.
MEASURED: 2026-09-04 (S130 record 2): the card the branch answers — CARD-AUTHORITY-MATRIX-RULED-1 under OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1: six matrix assertions corrected to the owner's rulings (foreman claimShape `^AG-5$`, producer `^AG-(?!5$)[0-9]+$`, scout claimShape null, …), the calendar gate removed, the `reply_authority` reconciling migration AUTHORED (Operator applies), each inverted lens paired with a planted-fault test.
UNMEASURED: the synced head (AG-4, in flight); the migration file's exact statement against live `reply_authority` (read-only `pg_get_constraintdef` over your read path is allowed); whether any path outside the eight rode in with the sync (only the two generated files may).
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ what AG-4 reports → review what you find, say so first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the PR, its class, its CI at the pre-sync head | MEASURED: 2026-09-05T05:32Z triage | head |
| the content verdict at the synced head | UNMEASURED — ORDERS A–D | verdict |

```evidence:head
PR #490 phase/authority-matrix-ruled-1, pre-sync head:
    fe7085cfcc8b16aab38de5b95c0d098236c7dc77
master it is being synced onto:
    0e5022902381d04702a4598235a2ef45bbb04eda
```

```evidence:verdict
UNMEASURED. ORDER A paths and subjects; ORDER B the seven rulings vs the diff; ORDER C laws; ORDER D resolver and CI.
```

## ORDER A — SHAPE
`git ls-remote` the branch; `git diff --name-only origin/master...<head>` (expect 8 authored paths ± the two generated); non-merge subjects in master..head (expect three, all `AG-4:` — the matrix commit, the report, the descendant fix); merge commits are invisible to lens one.

## ORDER B — THE RULINGS, ONE BY ONE
For each of the seven disagreements in OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1: quote the ruling line, quote the matrix line at the head that implements it, and name the planted-fault test that fails when the fault is planted (from the test file; do not run it). Any ruling with no implementing line, or any implementing line with no failing test, is a FINDING. The migration: print the statement; read live `pg_get_constraintdef` for `reply_authority` over your read path; state whether the migration would reconcile live to the migration's own text (this is what the Operator will apply later — the PR lands the FILE, not the change).

## ORDER C — THE LAWS
C1 LAW (no write to `messages`); secrets env-only; empty ≠ zero in the matrix (unmeasured vs zero); FULL-TRACE where a stage is touched; no route-around of a refusal in the report (the report says it KEPT `ROLE-SHAPE-UNSATISFIED` against the retirement order — confirm the reason stands at the head). The relay grammar on the report file.

## ORDER D — RESOLVER AND CI
Installed `resolveAuthorLane` + `judgeReportOnly` at the head (expect AUTHOR-SUBJECT/AG-4; lander AG-5 PASS; lander AG-4 SELF-LAND since paths leave docs/relay/). CI at the full forty hex of whichever head you review; if the synced head's CI is still running, say IN-PROGRESS by name — the landing card waits on AG-4's report for the conclusions.

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2`. First line `VERDICT: GREEN|AMBER|RED`; second `RESOLVER: <cls> · landable-by: <lanes>`; third `HEAD: <the head you reviewed> · SYNCED: yes|no`. Then ORDERS A–D. This row is copied into the AG-5 box as the landing card's PRECONDITION.

## FALSIFIER
Wrong if any ruling has no implementing line, if a path outside the eight plus the two generated files appears, if the resolver does not read AG-4, or if the migration would not reconcile live to its own text.

## SHARED SURFACES
None written. Reads only; the live DB read is over your declared read path.

## DECISION RIGHTS
None.

BODIES: `S37-2` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · C1 LAW · OWNER-RULING-S130-LAND-490-1 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 · CARD-AUTHORITY-MATRIX-RULED-1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-AUTHORITY-MATRIX-RULED-1-v2 ends here.
