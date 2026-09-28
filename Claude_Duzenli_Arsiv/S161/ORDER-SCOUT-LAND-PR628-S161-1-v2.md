<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR628-S161-1-v2

LANE: scout (scout-1 window)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T06:38Z
SUPERSEDES: ORDER-SCOUT-LAND-PR628-S161-1-v1 (bus 718f4d98-3ef6-4a7f-b48f-926d4d93e576) — your v1 verdict SCOUT-STATUS-LAND-PR628-S161-1 (bus 47906597-3b3b-43ba-982e-7440a761cf02) was GREEN-CONTENT at head c32f821bd9a3c90265cce964c86923f9bf3fa557, not posted (merge guard red on the 627 collision). PR 627 has LANDED (master 81c87d58962bc01a1e164f8189fb97928810dee9, 05:04:48Z). AG-2 merged master into the branch under NOTICE-PR628-MERGE-MASTER-S161-3: merge commit 95a91f8fca3994140246e7da4ba1b3cbcfccff82 (seal conflict → checkout --theirs + reseal), report line commit, NEW HEAD badb059fe35072956b47366737683d7bd865f305 (slip SLIP-PR628-MERGE-MASTER-S161-2, doc-repo file, 06:3xZ).
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 (P5, row 113); OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S161-LANES-WAIT-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: do NOT re-review the content. Verify that the ONLY change since c32f821bd9a3c90265cce964c86923f9bf3fa557 is the master merge (with the reseal) plus one report line, confirm CI 4/4 at badb059fe35072956b47366737683d7bd865f305, post adversary/scout success, read master once.

## STEPS
1. `git fetch origin` · `git ls-remote origin refs/pull/628/head refs/heads/master` read twice, print both. If PR head ≠ badb059fe35072956b47366737683d7bd865f305: print both and STOP (RED: head moved).
2. `git log --oneline c32f821bd9a3c90265cce964c86923f9bf3fa557..badb059fe35072956b47366737683d7bd865f305` — expected: the merge commit 95a91f8f… (two parents: c32f821b… and 81c87d58…) and ONE report commit. Quote.
3. `git diff --stat 81c87d58962bc01a1e164f8189fb97928810dee9 badb059fe35072956b47366737683d7bd865f305` = the PR's own 11 paths against the NEW master (the E1-c instrument + report), nothing from master reverted: `git diff c32f821bd9a3c90265cce964c86923f9bf3fa557 badb059fe35072956b47366737683d7bd865f305 -- . ':!public/architecture/manifest.json' ':!docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md'` must equal `git diff c32f821bd9a3c90265cce964c86923f9bf3fa557 81c87d58962bc01a1e164f8189fb97928810dee9 -- . ':!public/architecture/manifest.json'` in its path set (i.e. only master's changes came in). Print the two path sets and their difference (expected empty).
4. SEAL: `npm run reseal --dry-run` if the script has one, else `npm run build` (five gates, check:doc-drift) at the head — quote the doc-drift line (expected "no drift"). The manifest's four digests as AG-2 printed them: ArchMap 8b997bbb8ea2 · ReqLifecycle 1c5ac66f40b4 · LLMCtl 64df2d44ca03 · GovModel 86cd67d1096b — confirm from the file at head.
5. Report line: quote the MERGED-MASTER fence in docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md; `node scripts/relayAudit.ts` on it → `[OK]`.
6. CI at badb059fe35072956b47366737683d7bd865f305 by full sha, read twice (S101-L1). Expected 4 workflows: Auto-merge landing · report-schema · Relay corpus · Build and Test — all success; skipped jobs by NAME. Quote the merge guard VERDICT line from the "changes" job (expected GREEN; the guard now collides with PRs 629/630 from THEIR side, not this one — quote the COLLISION line as it stands). If Build and Test is still in_progress: a NAMED wait — print `WAITING Build and Test at badb059f… <time>`, `sleep 120`, re-read; at most FIVE times (10 minutes); then either continue or print "CI PENDING after 10 min" and go to step 8 without posting.
7. If all clean and 4/4 success: post adversary/scout success on badb059fe35072956b47366737683d7bd865f305; then ONE read of master: print whether auto-merge landed and the merge sha.
8. REPLY with scout_reply as SCOUT-STATUS-LAND-PR628-S161-2, first line `ADVERSARY-VERDICT: GREEN|RED pr=628 head=badb059fe35072956b47366737683d7bd865f305` (or `CI PENDING`). If the bus write is refused, write the same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SCOUT-STATUS-LAND-PR628-S161-2.md", print its sha256.
9. THEN: `node scripts/mail-wait.mjs scout --read ORDER-SCOUT-REVIEW-CARD-E1A-V3-S161-1-v2` (bus 6a67fd1e-720f-4ed0-b309-dcee62fd4652, md5 698e3a1f62c19f7453c336d64c2bc2c2) and execute it (the E1-a v3 delta review; its own reply name is inside). THEN DO NOT STOP: `node scripts/mail-wait.mjs scout` (bounded 90 s / 40 min; OWNER-RULING-S161-LANES-WAIT-1); exit 0 → --read the new order, execute, reply, wait again; 3 → "NO MAIL 40 min", stop; 4 → READ FAILED with reason, stop.
FORBIDDEN: no edit, no push, no merge, no re-run, no dispatch, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR628-S161-1-v2
