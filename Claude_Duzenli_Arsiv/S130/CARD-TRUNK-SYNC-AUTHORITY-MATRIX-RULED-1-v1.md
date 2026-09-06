<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1 · v1 — merge today's master into your own PR #490 branch so its CI is measured against the trunk it will land on

AG-4 card, under OWNER-RULING-S130-LAND-490-1 (owner: "#490 onayliyorum. sallanmadan hemen bitir"), which lifts the HOLD on this PR and the machinery freeze for it alone. Your branch `phase/authority-matrix-ruled-1` is 3 ahead / 37 behind master (scout, 05:32Z); its green CI was measured against the old base. The standing chain wants CI at a head that contains the trunk (S37-2), then a scout review at that head, then the foreman. One merge commit, one push, one CI read; nothing authored.

## PREMISE

MEASURED: 2026-09-05T05:32Z scout SCOUT-OPEN-PR-TRIAGE-1-v1: PR #490 OPEN, head in the `head` fence, 8 paths (not report-only), resolver AUTHOR-SUBJECT lane AG-4, lander AG-5 PASS, MERGEABLE, all seven contexts green (rule26 SUCCESS).
MEASURED: 2026-09-05T04:46Z master = the `head` fence's master line (PR #492 merge; Vercel dpl_B2wpWw6kEUPJHYXYVgzmDpWtWuUX READY).
UNMEASURED: conflicts between the branch and today's master (the two generated files are the usual suspects); the CI table at the merged head — ORDER C/D.
ON-DISAGREEMENT: a conflict in any AUTHORED path (not `docs/ground/facts.json`, not `public/architecture/manifest.json`) → STOP, print the conflict hunks; that is a content decision, not a sync.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the head, the PR, its CI at the old base | MEASURED: 2026-09-05T05:32Z scout triage | head |
| the merged head and CI | UNMEASURED — ORDERS C–D | result |

```evidence:head
phase/authority-matrix-ruled-1, PR #490 (OPEN, base master), head:
    fe7085cfcc8b16aab38de5b95c0d098236c7dc77
master:
    0e5022902381d04702a4598235a2ef45bbb04eda
```

```evidence:result
UNMEASURED. ORDER D prints the merged tip and every CI context at the full forty hex.
```

## ORDER A — STATE
`git fetch origin`; in `wt-matrix` (yours): `git rev-parse HEAD` = `head` fence; `git status --porcelain -uall` empty. `git rev-list --left-right --count origin/master...HEAD` (expect 37 / 3 or print what it is).

## ORDER B — MERGE, RESEAL, PROVE
`git merge --no-ff origin/master`. Conflicts ONLY in the two generated files are resolved by regenerating: `npm run gen:arch-facts` and `npm run reseal` (print their lines; `lastSyncedCommit` stamps move by construction — F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1); any other conflict → STOP (ON-DISAGREEMENT). `npm run check:ground` and `npm run check:doc-drift` GREEN on the merge commit. Print `git diff --name-only origin/master...HEAD` (expect your 8 paths ± the generated two).

## ORDER C — PUSH; PR FOLLOWS
`git push origin phase/authority-matrix-ruled-1`; `git ls-remote` read-back (forty hex, fenced); `gh pr view 490 --json state,headRefOid,mergeable` → OPEN, new head, MERGEABLE. No new PR.

## ORDER D — CI AT THE NEW HEAD; REPORT
Every context at the full forty hex with durations; rule26 per-step under the 20-minute bound (fourth measurement). `build (24.x)` RED → STOP with the failing tests verbatim, no re-run. Report from_lane, artifact_name `TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-AG-4-report`: ORDER A–C outputs, merge subject, the new tip fenced, CI table, box line, hygiene.

## FALSIFIER
Wrong if the head is not the `head` fence at ORDER A, if any authored path conflicts, if the push moves the PR to a head other than your merge commit, or if `build (24.x)` is not SUCCESS at the new head.

## SHARED SURFACES
One merge commit and one push to your own branch. NO push to master. NO authored edit. NO migration applied. NO db push. NO governed row.

## DECISION RIGHTS
None. STOP is yours on every ON-DISAGREEMENT.

BODIES: `S37-2` · `S63-1` · `S100-1` · `S102-YASA-1` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-LAND-490-1 · OWNER-RULING-S130-SEVEN-DISAGREEMENTS-AND-HOLD-1 (hold lifted for #490) · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1.

fanout: personalized

```deliverables
branch: phase/authority-matrix-ruled-1 at a merge commit containing master, pushed; PR #490 following
report: bus row from_lane, artifact_name TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-AUTHORITY-MATRIX-RULED-1-v1 ends here.
