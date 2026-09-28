<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR627-S161-1-v2

LANE: scout (scout-2 window; /clear first)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T04:15Z
SUPERSEDES: ORDER-SCOUT-LAND-PR627-S161-1-v1 (bus row e4d79634-564e-45f9-81ff-e5f22b0619ee). Your v1 verdict SCOUT-STATUS-LAND-PR627-S161-1 (bus row c534185c-b848-4ef3-8fd0-0582f6bcdb94, 2026-09-28T00:48Z) was RED on step 2b only, everything else clean, nothing posted. It was read by the Architect at 04:09Z — thirty-five minutes after the landing clock (§12.8) expired, because the Architect's bus read filtered on the wrong time window. That delay is the Architect's, recorded as F-S161-ARCHITECT-BUS-READ-WINDOW-MISS-1; nothing in your v1 was late.
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI), plan step P4 (row 114); OWNER-RULING-S161-F3-F6-1; OWNER-RULING-S160-UI-UX-WITH-EVERY-CARD-1; OWNER-RULING-S153-NO-ARMES-HARDCODE-1.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GRAFT: graft first; your status carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: the v1 review is NOT repeated. You verify that the author's one-line fix (NOTICE-PR627-PIN-FIX-S161-1, AG-4) is the ONLY change since the head you reviewed, that the pin now discriminates, that CI is 4/4 success at the NEW head, and you post adversary/scout success so auto-merge lands PR 627.

## PRECONDITION (read first, no waiting)
`git ls-remote origin refs/pull/627/head refs/heads/master` — read twice, print both.
- master must still be c58438b59cff4d1d403634b28e44af9b01db6dea. If it moved, write the verdict on content, print "needs master merge", do not post.
- PR 627 head must NOT be b8b5ff07bfb31ba4e969823b975aec92dd659656 (that is the head you RED-ed; the author's fix produces a new head). If the head is STILL b8b5ff07bfb31ba4e969823b975aec92dd659656, the fix has not been pushed yet: print `PRECONDITION NOT MET at <date -u>: PR 627 head unchanged, waiting on SLIP-PR627-PIN-FIX-S161-1 (AG-4)`, read the bus ONCE for that slip name (`node scripts/mail-wait.mjs scout --read SLIP-PR627-PIN-FIX-S161-1` if the verb accepts it; otherwise say the verb refused and quote the line), and STOP. The owner re-runs this same order later; you do not loop.

## STEPS (on the NEW head)
1. `git diff --stat b8b5ff07bfb31ba4e969823b975aec92dd659656..<new head>` — expected EXACTLY two paths: api/cwf/__tests__/filterToolsByMessageFloorRequired.test.ts and docs/relay/ENTRY-FLOOR-REQUIRED-S161-1-AG4-report.md. Any third path = RED, name it, do not post.
2. Quote line 22 of the test at the new head; expected the eight-argument spelling (five explicit `undefined`, floor omitted) under an intact `@ts-expect-error`. Confirm with your own probe (the same scratch tsc probe you ran in v1, no repo edit): with the floor `?` optional the directive is UNUSED (TS2578); with the floor required, green.
3. Quote the report's new evidence fence (TS2578 line + green typecheck line) and the corrected ORDER 6 count line (73 at head includes the report's own self-quote at line 184; code/test/UI 72 -> 72). `node scripts/relayAudit.ts` on the report at the new head — expected `[OK] kind=report grammar v1`.
4. FENCE unchanged: the first-commit fence at ab09ee278cbc01f08d9c9c864e6d1db990548886 still holds both paths (both were inside it in v1). Print the set difference both ways.
5. CI at the NEW head by full sha: `actions/runs?head_sha=<new head>` — read twice (S101-L1; a zero is read a second time before it is a premise). Expected total_count 4: Auto-merge landing · report-schema · Relay corpus · Build and Test, all success; eval-canary SKIPPED, named by job name, never by run id in prose. If Build and Test is in_progress, read ONCE more after steps 1–4 (no wait loop). Quote the merge guard line from the "changes" job (expected `[merge-guard] VERDICT GREEN`; note that PR 628 now collides with THIS PR from its side — the guard here reports `COLLISION: <n> other open PR(s)`; quote it as it stands, it is not a RED for 627, it is the reason 628 waits).
6. If steps 1–5 are clean and all four workflows are success: post adversary/scout success on the new head; then ONE read of master (no loop): print whether auto-merge landed and the merge sha. If Build and Test is still in_progress after your second read: print "CI PENDING at <time>", do NOT post, stop — the owner re-runs this order. If any step fails: RED with file:line and the step number; do not post.
REPLY with scout_reply (NOT laneSlip — laneSlip refuses the scout address, measured S161) as SCOUT-STATUS-LAND-PR627-S161-2, first line `ADVERSARY-VERDICT: GREEN|RED pr=627 head=<40-hex>` (or the PRECONDITION NOT MET line). If the bus write is refused, write the full reply to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-LAND-PR627-S161-2.md", print its sha256 and the exact error line, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no workflow dispatch, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR627-S161-1-v2
