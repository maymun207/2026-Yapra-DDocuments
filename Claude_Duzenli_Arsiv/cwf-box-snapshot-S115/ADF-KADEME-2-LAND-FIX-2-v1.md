<!-- relay-audit: v1 kind=card prov=1 -->
# ADF-KADEME-2-LAND-FIX-2-v1
land.ts: cold-clone MERGE-CONFLICT, the queued verdict, and the commit-status lens
fanout: personalized - one address, AG-2.

## PREMISE - MEASURED @2026-08-23T05:10:00Z, Architect fresh clone at the floor in evidence:floor
- MEASURED: scripts/land.ts:765 runs git merge-tree --write-tree baseSha liveHead; line 525 labels every non-success exit MERGE-CONFLICT; AG-5 measured the same bytes red before fetch and green after in a cold clone (F-S114-LAND-COLD-CLONE-CONFLICT-1)
- MEASURED: land.ts:543 - with --auto the merge may be queued; the verdict text at 602 still states "verified after the merge" for a queued PR (F-S114-LAND-QUEUE-VERDICT-1)
- MEASURED: land.ts:741-760 reads check-runs only; AG-5 measured a Vercel commit-status "Canceled by Ignored Build Step" shown green by gh pr checks and absent from check-runs (F-S114-VERCEL-CANCELED-GREEN-1)
- UNMEASURED: whether GitHub lists that cancelled status under the combined-status endpoint for the head sha; you measure it first
SELF-INVALIDATION: decays on the first push to master after the floor, and on any harness upgrade the owner reports.

## FALSIFIER
A merge-tree exit caused by a missing object that is still labelled MERGE-CONFLICT falsifies A; a queued merge whose verdict claims a verified tree falsifies B; a head sha carrying a non-success commit-status that step 3 passes falsifies C.

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| the floor is the commit in evidence:floor | MEASURED: git ls-remote origin refs/heads/master | floor |
| step 3 has one lens | MEASURED: grep -n commit-status scripts/land.ts on origin/master returns zero lines and grep -n statuses returns zero lines · check-runs parsed at 741-760 | inline |

```evidence:floor
$ git ls-remote origin refs/heads/master
7c099fc6a6e6534dbabc4d9d0e4e89d84ac78c62	refs/heads/master
```

## STANDING ORDERS
- consumed_at is RETIRED. You do not merge. Subjects carry exactly one AG-2 token before the first colon. package.json is closed to this wave; the three npm scripts keep their names.

## ORDERS
```scope
- A · Step 4 fetches origin for base and head before merge-tree, and separates exits: a missing object is OBJECT-MISSING (retry once after fetch), a true conflict is MERGE-CONFLICT; both print the merge-tree stderr verbatim.
- B · Queued verdict. When gh pr merge returns queued rather than merged, the verdict block says MERGE-QUEUED, names the required check it waits on, and omits the "verified" line; step 7 re-reads master and prints LANDED or STILL-QUEUED.
- C · Commit-status lens. Step 3 reads the combined status for the head sha beside check-runs; any non-success state (error, failure, pending) is a red with the context name; a cancelled Vercel status is printed, not hidden.
- D · land:selftest gains one class per order (OBJECT-MISSING, MERGE-QUEUED, STATUS-RED); reds=14 defects=0 expected.
```

## SHARED SURFACES
scripts/land.ts, scripts/landSelfTest.ts .. AG-2 sole owner
package.json ............................... CLOSED - nobody this wave

## DECISION RIGHTS
retry count after fetch ... AG-2
status-state vocabulary ... AG-2 may widen, never narrow
queued wording ............ AG-2; the absence of "verified" is the Architect's

## DELIVERY
- Branch phase/adf-kademe-2-land-fix-2 from the measured floor; push early.
- Report docs/relay/ADF-KADEME-2-LAND-FIX-2-AG2-report.md plus JSON twin; selftest transcript verbatim.
- Open the pull request against master; do not merge it.
- Report opens with read relay_inbox at <ISO> - read OK - N rows since ADF-KADEME-2-LAND-FIX-2-v1; closes with git status --porcelain -uall and git worktree list.
