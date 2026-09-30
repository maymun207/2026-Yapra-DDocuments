<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR646-BACKUP-S165-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for SCOUT-STATUS-PREREVIEW-M4A-S164-1 — N1 and N2 are now with AG-4 as NOTICE-M4A-N1-N2-S165-1.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T06:58Z
PRECONDITION: PR 646 is OPEN at head 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe and master is 61e7f368604ffdd86b8841d9063e540641d42efc. If 646 is already MERGED, reply LANDED-BY-OTHER with the merge sha and stop.
WHY: PR 646 (POST-LANDING-1, register 144) has been CI-green since 06:38:59Z (Architect's read by full head: Build and Test, Relay corpus, report-schema, Auto-merge landing = completed success) and at 06:57Z carries NO adversary/scout status. The landing order ORDER-SCOUT-LAND-PR646-S164-1 went to scout-1 at 06:25Z and scout-1 has posted nothing since 06:23Z. The thirty-minute window (§13.11) closes at 07:09Z. You are the BACKUP lander, exactly as ORDER-SCOUT-LAND-PR645-BACKUP-S164-2 was.
COLLISION GUARD: before step 5, read the statuses on the head. If an adversary/scout status is ALREADY there (scout-1 got to it), post NOTHING, wait for the landing as in step 5, and reply LANDED-BY-SCOUT-1. Never post a second status.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 1 · §12.8 · §13.11 · register 144, 159.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 646 at 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe. Master read twice by ls-remote = 61e7f368604ffdd86b8841d9063e540641d42efc.
2. SHAPE: one commit, parent = master; `git diff --stat` printed; five paths: api/cwf/__tests__/authorityMatrix.test.ts · docs/ground/authority-conformance.latest.md · docs/ground/authority-live.snapshot.json · docs/relay/POST-LANDING-1-S164-1-AG4-report.md · scripts/authorityMatrix.mjs. The report has EXACTLY ONE `FILE-FENCE:` line followed by `- <path>` lines equal to that diff (scripts/mergeGuard.mjs parser, judgeBlocks).
3. CONTENT: (a) RULED_NONCLAIMING_AUTHORS gains exactly 'scout-1', 'scout-2' (scripts/authorityMatrix.mjs) with the pin in authorityMatrix.test.ts, byte-equal to the lines of PR 636's pre-ruling commit a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb; (b) docs/ground/authority-live.snapshot.json was PRODUCED by its producer script (the report quotes the command), not hand-edited; (c) no assertion weakened; (d) authorityMatrix.test.ts + mailWaitBoxLens.test.ts pass — re-run them.
4. CI at 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe, zero read twice: name EVERY step's conclusion (merge guard, Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted GREEN.
5. COLLISION GUARD (above), then: clean → post adversary/scout success on the head; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — STATE and DESCRIPTION (a state=success whose description says Canceled is NOT a deploy).
6. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-PR646-S165-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=646 head=408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe · LANDED merge=<40-hex>` (or LANDED-BY-SCOUT-1, or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-LAND-PR646-S165-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR646-BACKUP-S165-1
