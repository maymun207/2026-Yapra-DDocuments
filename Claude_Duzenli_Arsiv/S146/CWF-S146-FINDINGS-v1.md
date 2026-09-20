CWF-S146-FINDINGS-v1

Each finding carries HOW and WHEN (owner rule).

F-S146-PR587-MERGED-BEFORE-SCOUT-STATUS-1 — PR 587 merged 06:47:44Z; the first scout GREEN reached the bus 07:06Z and the second
scout session posted no status. Either a pre-/clear scout session posted adversary/scout before 06:47, or the ruleset does not
require it. HOW: LAND-FIVE step 1 prints the ruleset's required contexts; scout reads the created_at of the adversary/scout status on
990ca963. WHEN: with the LAND-FIVE slip, next session. If the gate did not hold: a card the same day.

F-S146-SHARED-CLONE-RACE-1 — AG-4 committed onto the PR branch in the shared main worktree while the scout was executing that
branch's workflow; scout proved byte-identity by blob sha. HOW: boot text says "work in your own worktree"; add to lane boot files
with the self-takeover rule (item 15 card). WHEN: after CARD-LANE-NO-POLLER lands.

F-S146-VECTOR-PARITY-20PCT-1 — vector vs current engine rank overlap 3/15. HOW: item 5 (channel-2 BM25+RRF) runs both channels
fused and is judged by eval, never by switching. WHEN: item 5 card, after item 7.

F-S146-REGISTER-ROWS-DROPPED-1 — v135 §4 lost fourteen rows. HOW: v136 enumerates all items. WHEN: done in this close set.

F-S146-LANE-SANDBOX-TSX-EPERM-RECURS-1 (MERGED-INTO item 19) — AG-4 and scout could not run npx tsx in-sandbox (IPC EPERM); both
ran the gate outside the sandbox. The Architect's bridge VM needed a linux-arm64 esbuild binary (ESBUILD_BINARY_PATH) to run it.
HOW/WHEN: item 19 card.

F-S146-LANE-WRITE-PATH-ENOTFOUND-1 — AG-4 slip e6af7398: consumed_at not stamped, heartbeat stale, "no DNS in this window" for the
lane write path, yet the slip reached the bus. UNMEASURED which path wrote it. HOW: ask AG-4 to name its slip write path in the next
slip. WHEN: next AG-4 slip.

END · CWF-S146-FINDINGS-v1
