<!-- relay-audit: v1 kind=notice -->
RULING-PR616-PR617-S158-1

LANE: AG-1 and AG-2
fanout: broadcast (identical body to both lanes; each lane does only its own section)
FROM: Architect, S158, 2026-09-26T03:27Z
NO POLL OR CRON TASK. FORBIDDEN: force-push; squash; printing any environment value.

## PREMISE
MEASURED: execute_sql relay_inbox by artifact_name at 2026-09-26T03:25Z: SLIP-PR616-MASTER-MERGE-S158-1 (AG-1, 03:05:56Z) head 8ecf873ce2c5f02136fbaaaba3b2bc6364797582, guard CLEAN-MERGE ok, VERDICT RED only COLLISION yielding to #615; #615 closed 03:05:30Z, after that run.
MEASURED: same read: SLIP-RULING-PR615-GUARD-S158-1 (AG-2, 03:11:53Z) PR 617 head 996e7d6cec0046c45310d9fe622f27f708956db3, guard RED FENCE-GREW (the picked commit carries the old fence) + COLLISION yielding to 616.
SELF-INVALIDATION: dies for a lane whose PR head is no longer the head above or a descendant; print what you read.
ON-DISAGREEMENT: YOUR READING WINS; print both.

## AG-1 · PR 616
The collision partner closed after the run: the input changed, so this is not a transient-failure re-run (S55-1 does not apply). Re-run the Build and Test workflow run on head 8ecf873ce2c5f02136fbaaaba3b2bc6364797582 ONCE (gh run rerun <that run>). Read CI by full sha, quote the guard's VERDICT line. The local vectorLane admission timing failure: print whether CI's suite passes it; if CI fails on it, stop and slip. Slip SLIP-RULING-PR616-S158-1.

## AG-2 · PR 617 (after PR 616 lands; not before)
FENCE-GREW is measured against the fence in the first commit that carries it. When PR 616 has landed: new branch phase/a24-p20-tokenizer-s158-3 from the new origin/master; cherry-pick with -n, write the COMPLETE fence (every path the branch will change, including build-regenerated files) into the report in the FIRST commit, then the rest; npm run build + suite; push; open the new PR; close PR 617 naming it. Read CI by full sha, quote the guard's VERDICT line. Slip SLIP-RULING-PR617-S158-1.

END · RULING-PR616-PR617-S158-1
