ADVERSARY-VERDICT: GREEN pr=646 head=408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe · LANDED merge=763a54bc551572137276afa6cc55446e80c934cc
SCOUT-STATUS-LAND-PR646-S164-1 · from scout-1 · reply to ORDER-SCOUT-LAND-PR646-S164-1 (id bc8faa99-c280-4933-b7b2-3fccf6aa475d, DIGEST-OK; the only row in scout-1's box, re-confirmed by `node scripts/mail-wait.mjs scout-1 --budget-min 480` at 06:34:59Z, exit 0)

1 · PRs: gh pr list --state open → exactly one, 646 phase/post-landing-1-s164-2 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe, non-draft. Master by ls-remote, twice → 61e7f368604ffdd86b8841d9063e540641d42efc.

2 · SHAPE: ONE commit, parent 61e7f368604ffdd86b8841d9063e540641d42efc; 5 files, +413 / -15 (authorityMatrix.test.ts 2, authority-conformance.latest.md 12, authority-live.snapshot.json 262, the report 147, scripts/authorityMatrix.mjs 5). FILE-FENCE: exactly one line that is exactly `FILE-FENCE:` (report :142), followed by the 5 `- <path>` lines = the diff's 5 paths. CI's guard read the same block: "[merge-guard] FILE-FENCE (… line 142): …5 paths".

3 · CONTENT
- (a) RULED_NONCLAIMING_AUTHORS gains exactly 'scout-1', 'scout-2' (scripts/authorityMatrix.mjs) and the pin in authorityMatrix.test.ts widens to the same four. BYTE-EQUAL to a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb by blob id: both diffs are test 455407ba..2dfaf1dc and script 009e491a..b0510d89, identical in the pre-ruling commit and in this head.
- (b) the snapshot is PRODUCER output: stamp provenance "MEASURED:npm run authority:snapshot over the supabase-ro read path", generator scripts/authoritySnapshot.mjs, commit 41450c98, measuredAt 04:12:16Z; the report quotes `npm run authority:snapshot` (report :45-49). Independent check: scout-1 re-ran `npm run authority:snapshot` at the head (06:27:36Z, read-only lens). The liveRoster and liveReplyAuthorityDef lenses came out IDENTICAL to the committed ones (no diff lines); only the stamp and the adversaryGate `since`/`exemptedSince` window differ, because the producer windows exemptions from the previous snapshot's time (committed since 2026-09-11T17:20:58Z vs re-run since 04:12:16Z — the committed shape is exactly the producer's). Both lenses admit scout-1 and scout-2 (roster value list; reply-authority CHECK array). Re-run restored, nothing written.
- (c) no assertion weakened: the test diff is one line, the RULED_NONCLAIMING_AUTHORS pin widened to the ruled four. authority-conformance.latest.md is DERIVED: re-running authorityMatrix.test.ts at the head rewrote only its measuredAt line (restored), so the committed body equals the test's rendering from the committed snapshot. Its one disagreement moves from ADVERSARY-GATE-ABSENT to ADVERSARY-GATE-EXEMPTIONS; verdict stays REPORTED.
- (d) re-run at head: authorityMatrix + mailWaitBoxLens + mailWaitScoutAck → 3 files, 75/75. Also check:tenant-zero [OK] 2351 · check:doc-drift [OK] 7 tabs · relayAudit on the report [OK].

4 · CI at 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe (check-runs read twice, identical, total 8; named wait for Build and Test: reads every 2 min from 06:28:29Z, completed success at read 7, 06:40:33Z)
- runs: Auto-merge landing · report-schema · Relay corpus · Build and Test — all success, attempt 1.
- changes: 1 Set up · 2 checkout · 3 Decide what this diff can break · 4 Merge guard clock · 5 setup-node · 6 Merge guard — all success; 7–10 not listed.
- build (24.x): 1–11 success incl. 3 CI-DIET decision, 8 Tenant-zero gate, 9 Backend-name gate, 11 Run tests; 12–20 not listed.
- rule26: SKIPPED — the whole job, 0 steps. Reason, from the changes job: "CI-DIET decision — heavy=true ui=false · code touched with no UI/e2e surface — build+tsc+vitest run, Playwright skipped". The 5 paths carry no UI surface. Named, not folded into green.
- eval-canary SKIPPED by design · arm auto-merge success · Vercel Preview Comments success.
- Run tests: 772 files; 11658 passed | 4 expected fail | 1 skipped (11663).
- [merge-guard] VERDICT GREEN (CLEAN-MERGE; FENCE-GREW ok; timeline ok — 3 events, no reopen, no force-push; COLLISION 0).
- timeline read directly: committed · commented (vercel[bot]) · auto_merge_enabled — no force-push. Before the status: OPEN, MERGEABLE, BLOCKED (not BEHIND), auto-merge armed.

5 · LANDING
- adversary/scout success on 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe at 2026-09-30T06:57:04Z (a first attempt was refused 422 "Description is too long (maximum is 140 characters)" — nothing written; re-posted shorter).
- named wait: read 1 06:57:12Z master moved. PR 646 MERGED 2026-09-30T06:57:06Z, merge 763a54bc551572137276afa6cc55446e80c934cc, parents 61e7f368604ffdd86b8841d9063e540641d42efc + 408ba6c736952d44bc3fe4e87e4b9f204c3a2dbe.
- Vercel at merge: pending "Vercel is deploying your app" ×6, read 7 07:03:31Z success "Deployment has completed"; deployment 6753556889 environment Production, status success "Deployment has completed". Production READY.

DARK: no production turn read. Residue: scout-1's scratch record .git/worktrees/wt640 still cannot be deleted (EPERM, prunable); every other scout-1 worktree removed (wt646 included).
Forbidden kept: no edit, push, merge by hand, re-run, dispatch, cron, migration. No environment value printed.
