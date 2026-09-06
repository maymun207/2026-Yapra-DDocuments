<!-- relay-audit: v1 kind=card -->
# CARD-TEST-FIX-STALE-FACT-SWEEP-2 · v1 — the two assertions that pin the stale wording now pin the corrected wording; one commit on the same branch, same token

AG-4 card, under OWNER-RULING-S130-SWEEP-TEST-FIX-1 (owner's word: "test-fix onay") on top of OWNER-RULING-S130-SWEEP-REAUTHOR-1. Your report (REAUTHOR-STALE-FACT-SWEEP-2-AG-4-report, 03:49Z) and the scout's (SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1, 03:51Z) agree to the line: `build (24.x)` FAILED at the head on exactly one test, `api/cwf/__tests__/learningSnapshotMigration.test.ts` lines 401–402, which READ `shared/dbConstants.ts` and `shared/grantPolicy.ts` off disk and pin the literal `AUTHORED, Operator-pending` that the sweep corrects; line 90 of the same file already asserts the opposite for the SQL header. The red is inherited (the source branch was never built green), the carry is exonerated (four paths byte-identical). The owner ruled the smallest cure: update the two assertions in a second commit on this branch, nothing else.

## PREMISE

MEASURED: 2026-09-05T03:44Z your `gh api check-runs` at the `head` fence: build (24.x) FAILURE (Build step SUCCESS, Run tests FAILURE), rule26 success 6m28s, relay corpus / report-schema / changes / Vercel Preview Comments success, eval-canary skipped.
MEASURED: 2026-09-05T03:45Z your job log: one failing assertion, `learningSnapshotMigration.test.ts:401`, expected `/AUTHORED, Operator-pending[\s\S]{0,400}LEARNING_SNAPSHOTS: 'learning_snapshots'/`; line 402 pins the same wording for grantPolicy; line 90 asserts `not.toContain('AUTHORED, Operator-pending')` for the SQL.
MEASURED: 2026-09-05T03:51Z scout: `git grep "Operator-pending"` over the two shared files at the head returns ZERO lines; grantPolicy's trailing text moved to "applied & ledger-verified 2026-08-26" (from the 01:50Z preflight).
UNMEASURED: the exact corrected comment text on the two lines the assertions read — ORDER A reads them from the head; the new regexes are built from what is THERE, not from this card.
ON-DISAGREEMENT: if the failing test set at the head is anything but that one file, or if any test outside lines 401–402 needs touching to go green → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head and its CI | MEASURED: 2026-09-05T03:44Z your check-runs read | head |
| the failing assertion and its sibling | MEASURED: 2026-09-05T03:45Z your job log; scout ORDER D | head |
| the new head and CI after the fix | UNMEASURED — ORDER D | result |

```evidence:head
phase/stale-fact-sweep-2, PR #492, head at card time (build RED):
    c11b46252db5b78621ea74cbc7e73a398043d02e
master:
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
failing file: api/cwf/__tests__/learningSnapshotMigration.test.ts  lines 401 (dbConstants pin) and 402 (grantPolicy pin)
```

```evidence:result
UNMEASURED. ORDER D prints the new tip and every CI context at the full forty hex.
```

## ORDER A — READ WHAT THE ASSERTIONS SHOULD PIN
In `wt-sweep2` at the `head` fence (`git status --porcelain -uall` empty): print the `LEARNING_SNAPSHOTS` line and its comment from `shared/dbConstants.ts` and the `[DB_TABLES.LEARNING_SNAPSHOTS]` line from `shared/grantPolicy.ts` verbatim. Print test lines 395–405 verbatim. The new regexes must match the printed wording literally (escape as needed) and keep the structural part of the old ones (`[\s\S]{0,400}LEARNING_SNAPSHOTS: 'learning_snapshots'` for 401; `LEARNING_SNAPSHOTS\]: WRITE_MODEL\.SERVER_ONLY,\s*\/\/ ` followed by the corrected wording for 402).

## ORDER B — THE EDIT, TWO LINES
Edit ONLY lines 401 and 402 (and the describe/it title on that block if it names "Operator-pending provenance comment" — rename to what it now asserts; print the diff). No other file. `git diff --stat` must show exactly one file.

## ORDER C — PROVE LOCALLY, THEN COMMIT ONCE
`npx vitest run api/cwf/__tests__/learningSnapshotMigration.test.ts` → all tests in the file pass, including line 90's `not.toContain`. Print the summary line. Then `npm run check:ground` and `npm run check:doc-drift` (expect GREEN; no generated file moves — the test file is not a generator input; if a generator moves, STOP). ONE commit, subject:

    AG-4: PHASE-STALE-FACT-SWEEP-2 — the two assertions that pinned the stale provenance wording now pin the corrected wording

Body: name the failing run's head, the two lines, the old and new regex, and F-S130-SWEEP-ASSERTION-PINS-THE-STALE-FACT-1 as the finding this closes. Lens one must still read ONE token: `git log --no-merges --format=%s master..HEAD` → two subjects, both `AG-4:` before the first colon.

## ORDER D — PUSH; CI; REPORT
Push; `git ls-remote` read-back; `gh pr view 492 --json headRefOid,state` (OPEN, head = new tip). Wait for conclusions at the full forty hex; print every context with durations; `build (24.x)` must be SUCCESS — RED → STOP with the failing tests verbatim (no re-run). Report from_lane, artifact_name `TEST-FIX-STALE-FACT-SWEEP-2-AG-4-report`: ORDER A prints, the diff, the local vitest summary, the new tip fenced, the CI table, box line, hygiene.

## FALSIFIER
Wrong if more than one file changes, if any test outside the two lines must change, if the local run of that file is not green, if `master..HEAD` shows a subject without the `AG-4:` token, or if CI at the new head is not green on build.

## SHARED SURFACES
One file, two lines (plus a title), one commit, one push to the existing branch. NO new PR. NO push to master. NO edit to the four sweep paths or any script. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. The cure is the owner's ruling; STOP is yours on every ON-DISAGREEMENT above.

BODIES: `S37-2` · `S55-1` · `S63-1` · `S102-YASA-1` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-SWEEP-TEST-FIX-1 · OWNER-RULING-S130-SWEEP-REAUTHOR-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-SWEEP-ASSERTION-PINS-THE-STALE-FACT-1 · F-S130-SWEEP-PINS-STALE-COMMENT-1 (scout's name for the same finding).

fanout: personalized

```deliverables
branch: phase/stale-fact-sweep-2 at a new tip, two AG-4 commits, PR #492 following; build (24.x) SUCCESS
report: bus row from_lane, artifact_name TEST-FIX-STALE-FACT-SWEEP-2-AG-4-report
```

TAIL ANCHOR: CARD-TEST-FIX-STALE-FACT-SWEEP-2-v1 ends here.
