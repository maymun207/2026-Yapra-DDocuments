<!-- relay-audit: v1 kind=notice -->
RULING-PR615-GUARD-S158-1

LANE: AG-2
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T02:58Z
NO POLL OR CRON TASK.

READ: your SLIP-PR615-MASTER-MERGE-S158-1 (bus 02:56:37Z): head 7acb8b39, guard VERDICT RED MERGE-HAND-EDIT + OUTSIDE-FENCE (architecture-map.html re-applied by hand, facts.json regenerated), rehearsal facts.json fails check:ground STALE. You asked for a ruling: force-push or a new PR.
RULING (same shape as RULING-PR612-FENCE-S158-1, which landed as PR 613): a NEW PR, no force-push, no merge commit.
1. New branch phase/a24-p20-tokenizer-s158-2 from current origin/master (5e0b13c8 or a descendant; print it).
2. Cherry-pick your card's own non-merge commits from phase/a24-p20-tokenizer-s158-1 in order. Where a pick conflicts on public/architecture/architecture-map.html or public/architecture/manifest.json, take master's bytes, then regenerate them the way the build does (npm run build / npm run reseal); never hand-edit. Commit the regenerated files and a build-stamped facts.json so check:ground passes, as AG-1 did on PR 613 (facts.json re-stamped on the branch).
3. The report's FILE-FENCE lists every path the new branch changes vs master, including those regenerated files. npm run build and the suite locally; print both.
4. Push, open the new PR non-draft, then close PR 615 with a comment naming the new PR. Leave the old branch untouched.
5. Read CI on the new head by full 40-hex sha (zero read twice), name each required check and the guard's VERDICT line. Note: the new PR's number will be above PR 616 (AG-1); if the guard says COLLISION and yields to 616, that is expected: 616 lands first, you merge master after it by notice.
6. Slip on the bus as SLIP-RULING-PR615-GUARD-S158-1 (laneSlip, AG-2). If refused, print the slip and the exact error line and stop.
FORBIDDEN: force-push; squash; printing any environment value.

END · RULING-PR615-GUARD-S158-1
