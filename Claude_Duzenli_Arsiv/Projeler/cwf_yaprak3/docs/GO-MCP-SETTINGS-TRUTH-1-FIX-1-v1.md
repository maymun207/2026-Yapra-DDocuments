# GO-MCP-SETTINGS-TRUTH-1-FIX-1 · v1
**For: AG-2 · authorizes the merge of `phase/mcp-settings-truth-1-fix-1` (PR #245, head `a71d8b6c6846b4e3da76398b548703c3e32b31fd`). One relay, self-contained.**

**PRECONDITION (S47-1 / TAIL ANCHOR S61-3):** `origin/master` = `63b3beb2a2a462a75ebb2a3c21a33da86b8c2c80`. `git fetch origin --prune` first; if master differs, STOP and report.

## STEP 1 — CI verification (BLOCKING; sole arbiter, S37-2)
`GET https://api.github.com/repos/maymun207/cwf_yaprak/actions/runs?head_sha=a71d8b6c6846b4e3da76398b548703c3e32b31fd`
`"conclusion":"success"`; `in_progress`/`null` NOT a pass; `total_count:0` on a PR = FAILED. Confirm head == PR #245's `headRefOid` before reading the verdict (the force-with-lease push makes this check load-bearing, not ceremonial).

## STEP 2 — Merge (S100-3 form; -B / force / stash / squash banned)
```
git fetch origin --prune
git rev-parse origin/master            # must print 63b3beb2a2a462a75ebb2a3c21a33da86b8c2c80
git checkout --detach origin/master
git merge --no-ff origin/phase/mcp-settings-truth-1-fix-1 -m "PHASE-MCP-SETTINGS-TRUTH-1-FIX-1: the exit stops being a state test — delete admissible for any never-published identity (draft OR retired) with the census deciding on governed history, not on lifecycle as proxy; counts fixed without a single DELETE (armes renders 141 live + 9 missing-as-history, superset 4 entry points + 22 via gateway, missing rows leave the action math but stay visible); inline credentials masked at the render layer with reveal-before-copy and a document-wide assertion; system's controls ABSENT not disabled (ADR-012 INVARIANT); backend_id required on save with legacy rows flagged loudly, never silently rewritten; probe chip says what it measures. A-REC-S101-3 recorded: the phase's own R3(a) premises were falsified by the lane's live read and the prune door was refused. docVersion rev 265 (seal redone master-side on the rebased worktree; Governance Model diagram redrawn, not sealed-as-was)."
git push origin HEAD:master
```
Prove merge tree == branch tree before the push (S100-3). Any conflict → STOP.

## STEP 3 — Report back
Paste: merge SHA · `git rev-parse origin/master` · CI run id/conclusion · tree-hash equality line. Then your lane is complete; deployment confirmation is the Architect's, the panel visit the owner's.

## Recorded, not re-ruled
Your other-user-row answer is ACCEPTED as read: owner-scoped personal rows stay owner-scoped, three of four are the owner's to fix, `armesMes` belongs to account `d388d5c2…`. Cross-user administration is refused as a side effect and filed as an open item (`F-S101-PERSONAL-ROW-CROSS-USER`) for its own ruling if a real need appears. The one compiler-demanded tag threaded as a parameter over three semantically distinct counts is the correct reading of the purpose law — a shared string there would have been three indistinguishable reads.

<!-- END · GO-MCP-SETTINGS-TRUTH-1-FIX-1-v1 -->
