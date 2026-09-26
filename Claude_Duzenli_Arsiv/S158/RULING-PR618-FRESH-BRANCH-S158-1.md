<!-- relay-audit: v1 kind=notice -->
RULING-PR618-FRESH-BRANCH-S158-1

LANE: AG-4
fanout: personalized (one lane, one body; AG-2 gets RULING-PR619-YIELD-S158-1)
FROM: Architect, S158, 2026-09-26T07:45Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; rebase of any pushed branch; squash; editing PR 618's branch; printing any environment value.

## PREMISE
READ: AG-4 slip SLIP-PR618-MASTER-MERGE-S158-1-v3 as relayed by the owner (10:40 TSI): head d7e72faacb0525de2fafef45ff54ea6c6e9e28e5 on phase/frame-keeps-unmodeled-categories-s158-1; local build green, 616 10/10, 618 15/15, suite 751 files green; CI changes red with "[merge-guard] VERDICT RED - MERGE-HAND-EDIT, FENCE-GREW".
READ: CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v5 ORDER 5: FENCE-GREW = head fence not a subset of the fence in the first fenced commit; COLLISION fails the HIGHER-numbered PR; a lower-numbered overlapping open PR blocks until closed.
SELF-INVALIDATION: dies if master is not 7fb4a589349911c84757d9e38c0e0d98f2d48c58, or PR 618 head is not d7e72faacb0525de2fafef45ff54ea6c6e9e28e5.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## FINDING (Architect's miss, named)
The guard makes a hand-resolved conflict IMPOSSIBLE inside a merge commit (MERGE-HAND-EDIT), by design. My ruling RULING-PR618-TOOLCATEGORIES-UNION-S158-1 ordered exactly that, so it could never land. Filed as F-S158-GUARD-CONFLICT-HAS-NO-MERGE-PATH-1. The only lawful path for a conflicting sibling is a fresh branch from master with a new PR.

## RULING (one path)
1. Tree of d7e72faa is master 7fb4a589 plus the resolved change (union, exclusion, reseal). Carry that tree, byte-exact, onto a NEW branch phase/frame-keeps-unmodeled-categories-s158-2 cut from origin/master 7fb4a589: git checkout of every path in git diff --name-status 7fb4a589 d7e72faa from d7e72faa. NO merge commit, no hand edit beyond that copy.
2. The FIRST commit carries the report with the COMPLETE FILE-FENCE (routeDecisionMatrix.ts included, naming RULING-PR618-FALSIFIER-HASH-S158-1 and this ruling). The report names the new PR and that 618 is superseded. Print git diff --name-status origin/master..HEAD and show every path is in the fence or is the reseal path.
3. Verify: git diff d7e72faa HEAD -- <code and test paths> is EMPTY (print it); npm run build (all five gates) + full suite; print 616's routeTraceFields 10/10 (pin 44a7b5db unchanged) and 618's 15/15.
4. BEFORE gh pr create: read gh pr view 619 --json state. If OPEN, do not open the PR: slip WAITING-ON-619 with the prepared head and stop (AG-2 is ordered to close it). If CLOSED: push (no force), open the PR non-draft, then close PR 618 with a comment naming the new PR and this ruling. Leave 618's branch untouched.
5. CI by full sha, read twice if zero; quote the guard VERDICT line. Slip SLIP-PR618-FRESH-BRANCH-S158-1 (<=1024 chars): new branch, full head, PR number, CI by full sha, guard VERDICT, test counts. Do not merge.

END · RULING-PR618-FRESH-BRANCH-S158-1
