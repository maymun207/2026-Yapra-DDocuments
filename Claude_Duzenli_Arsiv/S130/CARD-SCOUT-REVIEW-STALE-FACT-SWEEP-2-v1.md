<!-- relay-audit: v1 kind=card -->
# CARD-SCOUT-REVIEW-STALE-FACT-SWEEP-2 · v1 — the re-authored sweep: prove the content is byte-identical to the source branch, that the resolver now reads ONE author, and that nothing else rode along

Scout card. Read-only by your charter. PR #492, `phase/stale-fact-sweep-2`, one commit by AG-4 under OWNER-RULING-S130-SWEEP-REAUTHOR-1 (owner: "re-author onay"), carrying the content of AG-1's and AG-2's commits from `phase/stale-fact-sweep-1` (PR #452) onto today's master. Your preflight on the source branch (SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1, 01:50Z) is the baseline: GREEN content, `AUTHOR-UNKNOWN` resolver. This review asks whether the re-authoring changed exactly one thing — the author token — and nothing else.

## PREMISE

MEASURED: Vercel deployment record for the branch push (repoPushedAt 2026-09-05T03:26:21Z, githubPrId 492) → head in the `head` fence; subject "AG-4: PHASE-STALE-FACT-SWEEP-2 — the sweep re-authored under one token; content byte-identical to AG-1's and AG-2's, who remain its authors"; body names both source commits by full sha.
MEASURED: your preflight at 01:50Z on the source tip (the `source` fence): four authored paths comments-only; grantPolicy 16 entries key+value byte-identical; report passes grammar v1; merge-tree conflict only on the generated manifest.
UNMEASURED: AG-4's report (REAUTHOR-STALE-FACT-SWEEP-2-AG-4-report) — not yet on the bus at card time; CI at the head — read it in ORDER D.
DECAYS on any push to the branch or master. ON-DISAGREEMENT: head ≠ `head` fence → review the head you find and say so first.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the new head and PR | MEASURED: Vercel branch deployment meta 2026-09-05T03:26Z | head |
| the source tip and its content reading | MEASURED: scout preflight 2026-09-05T01:50Z | source |
| content identity, resolver class, CI | UNMEASURED — ORDERS A–D | verdict |

```evidence:head
phase/stale-fact-sweep-2, PR #492 (base master), head:
    c11b46252db5b78621ea74cbc7e73a398043d02e
master it was cut from (expected parent):
    65b7e344ec0fe2c7ff10f28236b25d81ef6f6723
```

```evidence:source
phase/stale-fact-sweep-1 tip (PR #452, to be closed as SUPERSEDED-BY #492):
    6769f519290c3da2dc8bb6240b1d65db34dbeac2
```

```evidence:verdict
UNMEASURED. ORDER A prints the four-path identity; ORDER B the resolver; ORDER C the generated files; ORDER D CI.
```

## ORDER A — CONTENT IDENTITY, TWO LENSES
(1) For each of the four authored paths (`api/admin/bench-reset.ts`, `docs/relay/PHASE-STALE-FACT-SWEEP-1-AG1-report.md`, `shared/dbConstants.ts`, `shared/grantPolicy.ts`): `git diff <source tip> <head> -- <path>` → expected EMPTY for all four. Print the four results. (2) `git diff --name-only <master> <head>` → expected exactly six paths: the four above plus `docs/ground/facts.json` and `public/architecture/manifest.json`; any seventh path is a FINDING. (3) Exactly ONE non-merge commit in master..head; its parent = the master line of `head`.

## ORDER B — THE RESOLVER, INSTALLED
Run `resolveAuthorLane` + `judgeReportOnly` as you did twice before: expected `cls=AUTHOR-SUBJECT lane=AG-4 candidates={}`; lander AG-5 → PASS; lander AG-4 → REFUSE SELF-LAND (paths outside docs/relay/); lander null → REFUSE. Also confirm the commit BODY contains no line starting with a second `AG-n:` token and no `Co-authored-by` carrying one (lens one reads subjects only — confirm from land.ts that the body is not read, quoting the line).

## ORDER C — THE GENERATED FILES
`docs/ground/facts.json`: diff master→head — expected the generator's own idempotent output (LEFT UNCHANGED means EMPTY diff; a non-empty diff is named, not scored, if it is the generator's). `public/architecture/manifest.json`: expected only `lastSyncedCommit` stamps moved and, if any, hash fields; `mappedContentSha` values are the lens (F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1). Print the diff stat.

## ORDER D — CI AND THE REPORT
Check-runs at the full forty hex of `head`: every context by name and conclusion; rule26 duration under the 20-minute bound (second measurement since the thaw). If AG-4's report row is on the bus by then, read it and note any disagreement with your own reads. PR #452 state: expect CLOSED with the supersede comment (or OPEN if AG-4 has not reached ORDER D yet — say which).

## ORDER E — REPORT
From_lane row, artifact_name `SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1`. First line `VERDICT: GREEN|AMBER|RED`; second line `RESOLVER: <cls> · landable-by: <lanes>`. RED = any non-empty diff in ORDER A(1), a seventh path, a resolver class other than AUTHOR-SUBJECT/AG-4, or `build (24.x)` failure. Then ORDERS A–D verbatim.

## FALSIFIER
Wrong if the head is not the `head` fence, if any of the four path diffs is non-empty, if master..head has more than one non-merge commit, or if the resolver does not read AG-4.

## SHARED SURFACES
None written. Reads only. NO worktree of another window; NO generator run; NO checkout.

## DECISION RIGHTS
None. The landing card follows your row.

BODIES: `S37-2` · `S102-YASA-3` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-SWEEP-REAUTHOR-1 · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · LENS-AUTHOR-SET-1 · SCOUT-PREFLIGHT-STALE-FACT-SWEEP-1-v1 · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1 · free.md.

fanout: personalized

```deliverables
report: bus row from_lane, artifact_name SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1
```

TAIL ANCHOR: CARD-SCOUT-REVIEW-STALE-FACT-SWEEP-2-v1 ends here.
