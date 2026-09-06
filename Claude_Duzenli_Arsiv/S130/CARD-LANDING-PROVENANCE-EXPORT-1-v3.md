<!-- relay-audit: v1 kind=card -->
# CARD-LANDING-PROVENANCE-EXPORT-1 · v3 — land PR #465 at the resynced head; every context is green; two precondition rows are already in your box

Foreman card, AG-5. Supersedes v1 (22f8d8bc) and v2 (3560f19e), both WITHDRAWN by notice 31779451 (you consumed it 20:39:02Z). Second product landing under OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1. The re-run path is gone: AG-4 resynced the branch onto the post-#491 master (one merge commit, one path: `.github/workflows/build-test.yml`) and rule26 CONCLUDED — SUCCESS 6m18s — so land.ts's `cancelled` refusal cannot fire. No re-run, no bound question; this card is preconditions → land → prove → report.

## PREMISE

MEASURED: 2026-09-04T21:07Z, TRUNK-RESYNC-PROVENANCE-EXPORT-1-AG-4-report-v2 (row af386c2d, 21:10:08Z): head in the `head` fence, ls-remote read-back and `gh pr view 465` headRefOid both equal; CI at the full forty hex, total_count 7: build (24.x) SUCCESS 16m13s · rule26 SUCCESS 6m18s (steps: npm ci 14 s, gate 329 s) · report-schema, relay corpus, changes, Vercel Preview Comments success · eval-canary SKIPPED. `git diff --name-only 45edd1ad…..c46e78b5…` = one path, the workflow file. `check:ground` GREEN and `check:doc-drift` GREEN on the merge commit before the push.
MEASURED: 2026-09-04T12:20Z, SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1 (row 3316edf6): VERDICT AMBER, no RED, on the authored content — which the resync did not touch (base..head still has exactly ONE non-merge subject, AG-2's). The scout also measured the resolver on that content: **AUTHOR-SUBJECT lane AG-2, candidates {}; step B lander AG-5 → PASS**. Merge commits are `--no-merges`-invisible, so the class holds at the new head; land.ts will measure it again itself.
MEASURED: 2026-09-04T21:1xZ, OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2 posted to your box, bound to the `head` fence (renewal of …-1, which decayed with the resync; owner's standing word: "bana numara sorma Onayliyorum dolayisi ile devam").
NOT-READ: the landed master sha and deploy (ORDER D).
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ `head` fence, or PR #465 not OPEN at it, or any context at the head not success/skipped → STOP, report.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, PR #465, CI table | MEASURED: 2026-09-04T21:07Z AG-4 report v2, full forty hex | head |
| authorship class and step B per lander | MEASURED: 2026-09-04T12:20Z scout review, installed functions; authored content unchanged since | authorship |
| the two precondition rows | POSTED: approval …-2 (this turn); scout verdict 3316edf6 (12:20:19Z) — ORDER A reads both by artifact_name | rows |
| the resync merge's own diff | MEASURED: 2026-09-04T20:40Z AG-4 report v1, `git diff --name-only`; ORDER A re-checks with diff-tree | rows |
| the landed master sha and deploy | NOT-READ | landing |

```evidence:head
phase/provenance-export-1, PR #465 (OPEN, base master), head:
    c46e78b578f50f53f40d4f70b0d8ba4e28e6495b
master at cut time (PR #491 merge):
    bb653734552ec9abc4457109b100e877797d6c36
CI at the head (AG-4 v2, 21:07Z, total_count 7): build SUCCESS 16m13s · rule26 SUCCESS 6m18s · eval-canary SKIPPED · others success
```

```evidence:authorship
one non-merge subject in base..head: AG-2: PHASE-PROVENANCE-EXPORT-1 — the turn's attribution evidence becomes a file, and the join is declared unavailable
resolver: cls=AUTHOR-SUBJECT lane=AG-2 candidates={} ; step B lander AG-5 -> PASS
run with: ADF_LANE_ROLE=AG-5
```

```evidence:rows
PRECONDITION 1  to_lane AG-5, artifact_name OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2, created_at > 2026-09-04T21:10:00Z, body names the head above
PRECONDITION 2  from_lane scout, artifact_name SCOUT-REVIEW-PROVENANCE-EXPORT-1-v1, created_at 2026-09-04T12:20:19Z, first line "VERDICT: AMBER"
PRECONDITION 3  your own read, not a row:  git diff-tree --cc --name-only c46e78b578f50f53f40d4f70b0d8ba4e28e6495b  -> exactly ".github/workflows/build-test.yml" (or empty: a clean merge may list no path under --cc) ; AND  git diff --name-only bb653734552ec9abc4457109b100e877797d6c36...c46e78b578f50f53f40d4f70b0d8ba4e28e6495b  -> the module, its test, AG-2's report, facts.json, manifest.json — NO other path
absent or deviating -> WAIT per S74-3 (name the row, name the newest row you saw) ; RED in the scout row -> STOP
```

```evidence:landing
NOT-READ. ORDER D prints the merge sha, ls-remote read-back, tree = rehearsal, deploy state or UNREAD.
```

## ORDER A — PRECONDITIONS (S47-1)
Fresh box read — the rows are OLDER than the newest rows in your box; read by artifact_name, not by "newest N" (F-S130-FOREMAN-READER-SKIPS-OLDER-ROWS-1 is about exactly this). Print each row's full id, created_at, artifact_name, and the scout's VERDICT line. Run the two git reads in PRECONDITION 3 and print them verbatim.

## ORDER B — CI AT THE HEAD
Re-read all check-runs at the full forty hex; every context by name; eval-canary skipped named. Any `cancelled` or `failure` → STOP.

## ORDER C — LAND
In your foreman worktree on a fresh `git fetch origin`: `ADF_LANE_ROLE=AG-5 npm run land -- 465`. Expected: resolver AUTHOR-SUBJECT/AG-2, lander AG-5 → pass; tree rehearsed; merge; push. If land.ts refuses: class and first refusing line verbatim, STOP, report.

## ORDER D — PROVE
`git ls-remote origin refs/heads/master` (forty hex, fenced); tree vs rehearsal; Vercel production state for the new master or UNREAD; `git status --porcelain -uall`; `git worktree list`.

## ORDER E — THREE REPORTS (two are debts)
1. `LANDING-PROVENANCE-EXPORT-1-AG-5-report`: ORDER A rows and reads; CI table; the landing (merge sha fenced, read-back, tree, deploy) or the STOP.
2. `LANDING-CI-BOUND-RULE26-1-AG-5-report` — OWED since your 12:58Z landing of PR #491 (master `bb653734…`).
3. `LANDING-CONTEXT-RETRIEVAL-1-AG-5-report` — OWED since your 11:21Z landing of PR #387 (master `1af600f9…`).
Each as its own from_lane row. If 2 or 3 were posted and my read missed them, say so with the row id.

## FALSIFIER
Wrong if the head is not the `head` fence, if PR #465 is not OPEN at it, if either precondition row is absent, if PRECONDITION 3's diffs show any unexpected path, if any context is not success/skipped, if the resolver class is not AUTHOR-SUBJECT/AG-2, or if the landed tree differs from the rehearsed tree.

## SHARED SURFACES
One merge to master by land.ts, one push. NO file edited. NO re-run. NO migration. NO db push. NO governed row. NO second PR.

## DECISION RIGHTS
None. You land only with all three preconditions met and every context green or skipped, only via land.ts.

BODIES: `S37-2` · `S47-1` · `S63-1` · `S74-3` · `S102-YASA-1` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 · OWNER-APPROVAL-S130-MASTER-PUSH-PR-465-2 · LENS-AUTHOR-SET-1 · F-S130-FOREMAN-READER-SKIPS-OLDER-ROWS-1.

fanout: personalized

```deliverables
master: PR #465 merged by land.ts, one push, proven by ls-remote read-back
report: bus row from_lane, artifact_name LANDING-PROVENANCE-EXPORT-1-AG-5-report
report: bus row from_lane, artifact_name LANDING-CI-BOUND-RULE26-1-AG-5-report (owed)
report: bus row from_lane, artifact_name LANDING-CONTEXT-RETRIEVAL-1-AG-5-report (owed)
```

TAIL ANCHOR: CARD-LANDING-PROVENANCE-EXPORT-1-v3 ends here.
