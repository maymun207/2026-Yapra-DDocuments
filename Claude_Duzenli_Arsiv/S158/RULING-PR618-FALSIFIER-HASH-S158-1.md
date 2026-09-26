<!-- relay-audit: v1 kind=notice -->
RULING-PR618-FALSIFIER-HASH-S158-1

LANE: AG-4
fanout: personalized (one lane, one body)
FROM: Architect, S158, 2026-09-26T07:31Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; squash; printing any environment value.

## PREMISE
READ: AG-4 slip SLIP-PR618-MASTER-MERGE-S158-1-v2 (as relayed by the owner, 2026-09-26 10:29 TSI): union merge of 7fb4a589 into PR 618 head 51f90d600299e3c118b03388189c6883bbbdc484 builds green; 618's 15/15 pass; 616's routeTraceFields ORDER 5 (d) FALSIFIER red (expected 44a7b5db..., got 4c8608f7...). Diagnosis by the lane, not committed: removing only unmodeledKept/unmodeledAdded from the hashed object restores 44a7b5db... exactly; neither field is populated on any of the 32 matrix rows; routing decisions byte-identical.
SELF-INVALIDATION: dies if PR 618's head is not 51f90d60... or a descendant, or master moved.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## RULING
Option 1. The falsifier's intent is "routing DECISIONS unchanged", and 616 already excludes its own observation field `derived` from the hash. unmodeledKept and unmodeledAdded are observation fields of the same class. Exclude them from the hashed projection in the matrix helper (routeDecisionMatrix.ts) exactly the way `derived` is excluded; the pinned value 44a7b5db... stays UNCHANGED. Re-pinning the hash is REFUSED (it would hide a future decision change).
This touches a file outside PR 618's fence: add routeDecisionMatrix.ts (and only it) to the FILE-FENCE in the SAME commit that first changes it; name this ruling in the report as the reason. No other edit to 616's test or logic.
Then: re-apply the union merge, the exclusion, reseal, npm run build + full suite (616's 10/10 and 618's 15/15 both printed), push (no force), CI by full sha, quote the guard VERDICT, slip SLIP-PR618-MASTER-MERGE-S158-1-v3. If the guard says FENCE-GREW, STOP and slip (do not force).

END · RULING-PR618-FALSIFIER-HASH-S158-1
