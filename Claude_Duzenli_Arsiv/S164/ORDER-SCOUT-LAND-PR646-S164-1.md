<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR646-S164-1

LANE: scout-1 (K41 landed by you at 06:17:13Z, merge 61e7f368604ffdd86b8841d9063e540641d42efc — thank you; SCOUT-STATUS-PICK-READINESS-S164-2 read)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T06:26Z (last Architect order of S164; the session closes at the owner's word — S165 reads your reply)
WHY: POST-LANDING-1 (register 144) is on PR 646, branch phase/post-landing-1-s164-2, head 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe, ONE commit, parent = master 61e7f368604ffdd86b8841d9063e540641d42efc (AG-4, re-pick under NOTICE-POST-LANDING-1-PR-NEXT-S164-8). Five paths: api/cwf/__tests__/authorityMatrix.test.ts · docs/ground/authority-conformance.latest.md · docs/ground/authority-live.snapshot.json · docs/relay/POST-LANDING-1-S164-1-AG4-report.md · scripts/authorityMatrix.mjs. Architect's read at 06:25Z by full head: Build and Test, Relay corpus, report-schema, Auto-merge landing = in_progress.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 (POST-LANDING-1) · §12.8 · §13.11 · register 144, 145.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 646 at 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe. Master read twice by ls-remote = 61e7f368604ffdd86b8841d9063e540641d42efc.
2. SHAPE: one commit, parent = master; `git diff --stat` printed; the report has EXACTLY ONE `FILE-FENCE:` line followed by `- <path>` lines equal to the five-path diff (scripts/mergeGuard.mjs parser :64-85, judgeBlocks :313-319).
3. CONTENT: (a) RULED_NONCLAIMING_AUTHORS gains exactly 'scout-1', 'scout-2' (scripts/authorityMatrix.mjs) with the pin in authorityMatrix.test.ts, byte-equal to the lines of PR 636's pre-ruling commit a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb; (b) docs/ground/authority-live.snapshot.json was PRODUCED by its producer script (report quotes the command), not hand-edited, and admits scout-1/scout-2 where the lens reads them; (c) no assertion weakened; (d) authorityMatrix.test.ts + mailWaitBoxLens.test.ts pass — re-run them.
4. CI at 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe, zero read twice: NAMED wait for Build and Test (every 2 min, ≤ 12); name EVERY step's conclusion (merge guard, Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted GREEN.
5. Clean → post adversary/scout success on the head; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — STATE and DESCRIPTION.
6. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-PR646-S164-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=646 head=408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to doc repo S164/SCOUT-STATUS-LAND-PR646-S164-1.md. Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR646-S164-1
