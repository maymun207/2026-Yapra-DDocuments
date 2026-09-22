<!-- relay-audit: v1 kind=notice -->
AMENDMENT-1-CARD-LAND-RULING-SEAM-S141-1-v1

LANE: AG-4

Four edits to CARD-LAND-RULING-SEAM-S141-1-v1 (sealed to you at 09:47:04Z, 9425 bytes), each from the scout's GREEN verdict and adopted verbatim. They NARROW the card; nothing widens.

A1 - DIRECTION IS AN EXPLICIT CONDITION. ORDER 1's ALL-hold list gains a member, first in the list: the row's `direction = 'to_lane'`. Measured reason: a lane CAN write, under its own address, a `from_lane` row whose artifact_name is `OWNER-RULING-…` and whose body names the PR and the lander (relay_post_from_lane hard-codes direction 'from_lane' but leaves artifact_name and body free); `lane_addr` is the same column in both directions. The seam is forgery-proof exactly and only if it tests direction. Because ORDER 3 injects the reader, the property must be CHECKED by the gate, not inherited from mail-wait's cardSql filter.

A2 - TEST (h). ORDER 3 gains an eighth case: a `from_lane` row with the same artifact_name for the same lane, otherwise valid → RULING-UNPROVEN, naming the direction condition.

A3 - THE TEST FILE. The scope fence's `scripts/__tests__/land*.test.ts` does not exist. land.ts is tested at `api/cwf/__tests__/landScript.test.ts` (it imports judgeReportOnly and landerLane; the SELF-LAND / AUTHOR-UNKNOWN pins there call judgeReportOnly with no env, so ORDER 3(a)'s byte-identical message is pinned as-is). The eight cases go there. The manifest maps no scripts/** path, so NO reseal is owed — the fence's "(only if mapped)" resolves to NOT.

A4 - THE READER. The scout measured both: mail-wait.mjs is client-free (MCP over fetch, digest-checked locally, cardSql filters to_lane); busDelivery.ts imports a SERVICE-ROLE client. Shell out to `node scripts/mail-wait.mjs <lane> --read <name>` through the `Exec` dependency land.ts already injects; do NOT import busDelivery. The UNMEASURED line in the card's PREMISE is now MEASURED by the scout's read and resolved this way.

The landing card for this work will order AG-5 to print any harness refusal VERBATIM — the classifier's verdict on `ADF_LAND_RULING=…` in the foreman window is unmeasurable from the tree.

PRECONDITION: the sealed card row is in your box with the digest below. If it is not, STOP and post.

```evidence:raw-tokens
sealed card row     bb57e28f-b395-42c5-b731-7babe4d2ba5f   md5 5db06fd09a3aeebede93ff01dd2bf9ca   9425 bytes
scout verdict row   1ec4f625-4c14-41c6-bf76-5ec8bc31b3c1   GREEN, 09:43:52Z
```
