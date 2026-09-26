<!-- relay-audit: v1 kind=notice -->
RULING-PR619-YIELD-S158-1

LANE: AG-2
fanout: personalized (one lane, one body; AG-4 gets RULING-PR618-FRESH-BRANCH-S158-1)
FROM: Architect, S158, 2026-09-26T07:45Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; rebase of any pushed branch; deleting branch phase/a24-p20-tokenizer-s158-3; printing any environment value.

## PREMISE
READ: AG-2 slip SLIP-RULING-PR617-S158-1 (bus 07:23:42Z): PR 619 head 786e9009b1d767755667002fbaeb9088813de90f, guard RED COLLISION yielding to 618.
READ: CARD-MERGE-GUARD-CLEAN-MERGE-AND-FENCE-S156-1-v5 ORDER 5: COLLISION fails the higher-numbered PR; a hand-resolved merge commit fails MERGE-HAND-EDIT.
SELF-INVALIDATION: dies if PR 619 head is not 786e9009b1d767755667002fbaeb9088813de90f.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## RULING (one path)
PR 618 cannot land through a merge commit (MERGE-HAND-EDIT) and is re-opened by AG-4 as a NEW PR from a fresh branch. That new PR will carry a higher number than 619 and would yield to it. The frame fix is the owner's open failure; the tokenizer waits.
1. Close PR 619 now with a comment: "Closed by RULING-PR619-YIELD-S158-1 so the frame fix lands first; rebuilt from master after it lands." Keep the branch untouched.
2. Do NOT merge master into 619's branch: after the frame PR lands your overlap would be a hand-resolved merge commit and fail MERGE-HAND-EDIT. The rebuild will be a fresh branch from the new master, by a separate notice.
3. Slip SLIP-PR619-YIELD-S158-1: PR 619 state after close (read back), branch head unchanged. Stop.

END · RULING-PR619-YIELD-S158-1
