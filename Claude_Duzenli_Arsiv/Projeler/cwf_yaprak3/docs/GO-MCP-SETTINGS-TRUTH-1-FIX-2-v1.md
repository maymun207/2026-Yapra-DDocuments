# GO-MCP-SETTINGS-TRUTH-1-FIX-2 · v1
**For: AG-2 · authorizes the merge of `phase/mcp-settings-truth-1-fix-2` (PR #246, head `accc921eecb2c6b55e444c44a7dc1d473b71efa8`). One relay, self-contained. Last lane of S101.**

**PRECONDITION (S47-1 / TAIL ANCHOR S61-3):** `origin/master` = `566b315e5aaa0ce13ed7f2d1fa951376adf6def1`. `git fetch origin --prune` first; if master differs, STOP and report.

## STEP 1 — CI verification (BLOCKING; sole arbiter, S37-2)
`GET https://api.github.com/repos/maymun207/cwf_yaprak/actions/runs?head_sha=accc921eecb2c6b55e444c44a7dc1d473b71efa8`
`"conclusion":"success"` AND `total_count >= 1` (S101-L1: assert the run EXISTS before reading any bucket); `in_progress`/`null` is NOT a pass. Confirm head == PR #246's `headRefOid` — load-bearing after a force-with-lease push.

## STEP 2 — Merge (S100-3 form; -B / force / stash / squash banned)
```
git fetch origin --prune
git rev-parse origin/master            # must print 566b315e5aaa0ce13ed7f2d1fa951376adf6def1
git checkout --detach origin/master
git merge --no-ff origin/phase/mcp-settings-truth-1-fix-2 -m "PHASE-MCP-SETTINGS-TRUTH-1-FIX-2: the census could see nothing because it asked with no body — `.limit(0)` replaces `head:true` so PostgREST's 42703 can travel, and the 40 tables that cannot hold a backend_id child stop vetoing a delete they have nothing to do with (count stays server-side via Content-Range; PGRST205 explicitly excluded — a missing table is a failure to measure, not an absent column). The gate is unweakened: an unreadable table still out-ranks a clean history and still refuses, proven by a mutant that folded unreadable to zero. Refusals now render blocked-by-rows apart from could-not-read. R3's chip was never broken — all three backend-less rows share an id with a global row and personalOnly removed them as override-shadows before the join; F-S101-OVERRIDE-DROPS-BACKEND filed rather than fixed, because a field-aware merge changes live turns and that is the real mechanism behind the four gateway-meta rows under armes. R4 filed at LOW on the lane's own live read: anon holds a redundant SELECT grant but user_audit's RLS policy is is_super_admin(auth.uid()), false for anon — Architect verified the policy and the function body and concurs; A-REC-S101-5 recorded (a severity read from GRANT alone is a hypothesis until POLICY is read). docVersion rev 268 (266 went stale the moment a sibling lane merged — the WAVE-SEAL LAW earning its keep)."
git push origin HEAD:master
```
Prove merge tree == branch tree before the push (S100-3). Any conflict → STOP.

## STEP 3 — Report back
Paste: merge SHA · `git rev-parse origin/master` · CI run id/conclusion/total_count · tree-hash equality line. Then S101's lanes are ALL closed (S91-3 satisfied) and the session can close: deployment confirmation is the Architect's, the panel visit the owner's.

## Recorded as precedent
"A provisional docVersion goes stale the moment ANY sibling lane merges" enters the KB as **S101-L2**, with today's near-miss attached: two lanes minting one scalar do not git-conflict, so the loss would have been silent. Your drop-and-re-derive is the standing procedure. Your portable rule — severity from a GRANT read is a hypothesis until the POLICY is read — is adopted verbatim.

<!-- END · GO-MCP-SETTINGS-TRUTH-1-FIX-2-v1 -->
