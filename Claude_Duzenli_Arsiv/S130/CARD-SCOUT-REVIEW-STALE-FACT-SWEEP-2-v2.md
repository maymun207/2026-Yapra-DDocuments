<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-STALE-FACT-SWEEP-2 · v2 — the head moved by one test-fix commit; re-read identity, resolver and CI at the new head, and confirm the second commit touched one file

Scout card. Supersedes v1's head (your RED at the old head is the reason for this card, not a defect in it). AG-4 pushed a second `AG-4:` commit on `phase/stale-fact-sweep-2` under OWNER-RULING-S130-SWEEP-TEST-FIX-1 and reports every CI context GREEN at the new head. Everything your v1 measured on the four authored paths and the resolver should still hold; this card asks you to prove it at the new head and to bound the second commit.

## PREMISE

MEASURED: 2026-09-05T04:28Z AG-4 report TEST-FIX-STALE-FACT-SWEEP-2-AG-4-report (row 8f03b660, 04:33:51Z): head in the `head` fence; check-runs total_count 7: build (24.x) SUCCESS 16m46s · rule26 SUCCESS 6m08s (gate step 319 s) · relay corpus, report-schema, changes, Vercel Preview Comments success · eval-canary SKIPPED; the commit changes ONE file (`api/cwf/__tests__/learningSnapshotMigration.test.ts`, +12/−3); two subjects in master..head, both `AG-4:` before the first colon; planted-fault check on the assertion passed.
MEASURED: 2026-09-05T03:51Z your v1 at the previous head: four blob shas identical to the source tip; resolver AUTHOR-SUBJECT/AG-4, lander AG-5 PASS; only master's test pinned the stale wording.
UNMEASURED: everything above at the NEW head, by you — ORDERS A–C.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ `head` fence → review the head you find and say so first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the new head, PR, CI | MEASURED: 2026-09-05T04:28Z AG-4 report | head |
| identity, resolver, the second commit's scope | UNMEASURED — ORDERS A–C | verdict |

```evidence:head
phase/stale-fact-sweep-2, PR #492 (OPEN, base master), head after the test-fix commit:
    621d0d862f09456053b0aaf5528bcbd5a81dbac5
previous head (your v1, build RED):
    c11b46252db5b78621ea74cbc7e73a398043d02e
source tip (PR #452, CLOSED, superseded):
    6769f519290c3da2dc8bb6240b1d65db34dbeac2
master:
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
```

```evidence:verdict
UNMEASURED. ORDER A four-path identity at the new head; ORDER B resolver; ORDER C the second commit; ORDER D CI.
```

## ORDER A — IDENTITY AT THE NEW HEAD
`git diff <source tip> <head> -- <path>` for the four authored paths → all EMPTY (blob shas as your second lens). `git diff --name-only <master> <head>` → exactly SIX paths now: the four, `public/architecture/manifest.json`, and the test file. Any other path is a FINDING.

## ORDER B — RESOLVER, INSTALLED
`resolveAuthorLane` + `judgeReportOnly` at the new head: expected `cls=AUTHOR-SUBJECT lane=AG-4 candidates={}`, lander AG-5 → PASS. Print the two subjects.

## ORDER C — THE SECOND COMMIT, BOUNDED
`git show --stat <head>` → one file. Print the hunk. Confirm: the two assertions now match the literal wording in `shared/dbConstants.ts` and `shared/grantPolicy.ts` at the head (quote both source lines); line 90's `not.toContain('AUTHORED, Operator-pending')` is untouched; no executable path outside the test changed. Note anything in the +12 comment lines that reads as a claim you cannot verify.

## ORDER D — CI
Check-runs at the full forty hex of `head`, every context by name; `build (24.x)` SUCCESS is the point. `gh pr view 492 --json state,headRefOid,mergeable`.

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-REVIEW-STALE-FACT-SWEEP-2-v2`. First line `VERDICT: GREEN|AMBER|RED`; second `RESOLVER: <cls> · landable-by: <lanes>`. Then ORDERS A–D verbatim. This row is the landing card's PRECONDITION; the Architect copies it into the AG-5 box.

## FALSIFIER
Wrong if the head is not the `head` fence, if any four-path diff is non-empty, if the second commit touches more than the test file, if the resolver does not read AG-4, or if any context at the head is not success/skipped.

## SHARED SURFACES
None written. Reads only.

## DECISION RIGHTS
None.

BODIES: `S37-2` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-SWEEP-TEST-FIX-1 · OWNER-RULING-S130-SWEEP-REAUTHOR-1 · SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-REVIEW-STALE-FACT-SWEEP-2-v2
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-STALE-FACT-SWEEP-2-v2 ends here.
