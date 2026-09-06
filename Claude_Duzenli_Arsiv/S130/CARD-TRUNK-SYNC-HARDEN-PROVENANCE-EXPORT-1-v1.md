<!-- relay-audit: v1 kind=card -->
# CARD-TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1 · v1 — merge today's master (the #493 landing) into your PR #494 branch so its CI is measured against the trunk it will land on

AG-4 card, the owner's queue item 2 second half (OWNER-RULING-S130-LAND-490-1 §2). Your `phase/harden-provenance-export-1` was cut from the pre-#493 master; #493 landed at 14:06:38Z and both branches resealed `public/architecture/manifest.json`, so the merge will meet a conflict in that one generated file and in nothing authored. One merge commit, regenerate the seal, one push, one CI read; nothing authored.

## PREMISE

MEASURED: 2026-09-05T13:59:14Z your HARDEN-PROVENANCE-EXPORT-1-AG-4-report: PR #494 OPEN at the `head` fence's tip, 3 paths (module, test, seal), two `AG-4:` subjects, CI total_count 6 — five success, eval-canary SKIPPED; 29/29 at the fix, typecheck:api clean; each new case FAILS at the parent.
MEASURED: 2026-09-05T14:06:38Z PR #493 landed — master is now the `head` fence's master line (foreman report; Vercel production READY, Architect read). #493 resealed the Architecture Map to a different digest than your branch did, and #493's diff touches none of your three paths.
UNMEASURED: the exact conflict shape in `manifest.json` (expected: both sides moved `mappedContentSha` on overlapping tabs); the CI table at the merged head — ORDER C/D.
ON-DISAGREEMENT: a conflict in `turnProvenanceExport.ts` or its test → STOP, print the hunks; that is a content decision, not a sync.

## CLAIMS

| claim | basis | anchor |
|---|---|---|
| the tip, the PR, its CI at the old base | MEASURED: 2026-09-05T13:59Z your report | head |
| the merged head and CI | UNMEASURED — ORDERS C–D | result |

```evidence:head
phase/harden-provenance-export-1, PR #494 (OPEN, base master), tip:
    f5b8663838a810b7eebf88edfcbcd7573ef8871f
master now (PR #493 merge):
    5d916ad418032daf2ec312d059c64c26738b79d1
```

```evidence:result
UNMEASURED. ORDER D prints the merged tip and every CI context at the full forty hex.
```

## ORDER A — STATE
`git fetch origin`; in `wt-hprov`: `git rev-parse HEAD` = `head` fence tip; `git status --porcelain -uall` empty; `git rev-list --left-right --count origin/master...HEAD` (print it).

## ORDER B — MERGE, RESEAL, PROVE
`git merge --no-ff origin/master`. A conflict ONLY in `public/architecture/manifest.json` (and/or `docs/ground/facts.json`) is resolved by REGENERATING, never by hand-merging JSON: take either side, then `npm run gen:arch-facts` and `npm run reseal` (print their lines — tabs and digests; `lastSyncedCommit` churn is the known breadcrumb, F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1). Any other conflict → STOP (ON-DISAGREEMENT). `npm run check:ground` and `npm run check:doc-drift` GREEN on the merge commit. Print `git diff --name-only origin/master...HEAD` (expect your 3 paths).

## ORDER C — PUSH; PR FOLLOWS
`git push origin phase/harden-provenance-export-1`; `git ls-remote` read-back (forty hex, fenced); `gh pr view 494 --json state,headRefOid,mergeable` → OPEN, new head, MERGEABLE. No new PR.

## ORDER D — CI AT THE NEW HEAD; REPORT
Every context at the full forty hex with conclusions; wait for build (24.x) and rule26 to CONCLUDE (an earlier read of the old tip returned total_count 4 before they registered — your own finding; do not certify a count). `build (24.x)` RED → STOP with the failing tests verbatim, no re-run. Report from_lane, artifact_name `TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-AG-4-report`: ORDER A–C outputs, the merge subject, the new tip fenced, CI table, hygiene.

## FALSIFIER
Wrong if HEAD is not the `head` fence tip at ORDER A, if any authored path conflicts, if the push moves the PR to a head other than your merge commit, or if `build (24.x)` is not SUCCESS at the new head.

## SHARED SURFACES
One merge commit and one push to your own branch. NO push to master. NO authored edit. NO migration. NO db push. NO governed row.

## DECISION RIGHTS
None. STOP is yours on every ON-DISAGREEMENT.

BODIES: `S37-2` · `S63-1` · `S100-1` · `S102-YASA-1` · `TOTAL-45` · `empty ≠ zero` · OWNER-RULING-S130-LAND-490-1 (§2) · OWNER-RULING-S130-CWF-FOCUS-ADF-FREEZE-1 · F-S130-RESEAL-BREADCRUMB-ALWAYS-DIRTIES-1.

fanout: personalized

```deliverables
branch: phase/harden-provenance-export-1 at a merge commit containing master, pushed; PR #494 following
report: bus row from_lane, artifact_name TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-AG-4-report
```

TAIL ANCHOR: CARD-TRUNK-SYNC-HARDEN-PROVENANCE-EXPORT-1-v1 ends here.
