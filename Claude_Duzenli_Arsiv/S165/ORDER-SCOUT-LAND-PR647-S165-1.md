<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR647-S165-1

LANE: scout-2 (the scout-2 window ONLY; scout-1 prints "NOT MINE: scout-2 order" and stops). Thank you for SCOUT-STATUS-LAND-PR646-S165-1 — LANDED-BY-OTHER was exactly right.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:06Z
PRECONDITION: PR 647 OPEN at head 794be5a81b956937eee1a25d0fdeedc2eecde235, base = master 763a54bc551572137276afa6cc55446e80c934cc (the PR 646 merge). If the head or master differs, STOP and report both shas.
WHY: M1B (register 152) — AG-4's commit 3c44ed752de5949958ea25f928d8c9b76f5a87cf carried by AG-1 onto current master (NOTICE-M1B-CARRY-PR-S165-1, SLIP-NOTICE-M1B-CARRY-PR-S165-1) with the manifest resealed. It is the ONLY open PR. CI was queued/in_progress at 07:03Z.
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) item 1 · register 145, 152 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## STEPS
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 647 at 794be5a81b956937eee1a25d0fdeedc2eecde235. Master read twice by ls-remote = 763a54bc551572137276afa6cc55446e80c934cc.
2. SHAPE: ONE commit, parent = 763a54bc551572137276afa6cc55446e80c934cc; `git diff --stat` printed; the twelve M1B paths (api/cwf/__tests__/gatewayEnumerate.test.ts · api/cwf/__tests__/mcpIsErrorPassthrough.test.ts · api/cwf/__tests__/recordToolCall.test.ts · api/cwf/_lib/backends/__tests__/entityDiscoverySync.test.ts · api/cwf/_lib/backends/entityDiscoverySync.ts · api/cwf/_lib/mcp/gatewayEnumerate.ts · api/cwf/_lib/replay/__tests__/examScorers.test.ts · api/cwf/_lib/replay/examScorers.ts · api/cwf/_lib/turn/stageTools.ts · api/cwf/_lib/turn/types.ts · docs/relay/M1B-ISERROR-READERS-S164-1-AG4-report.md · public/architecture/manifest.json) and nothing else. The report has EXACTLY ONE `FILE-FENCE:` line + `- <path>` lines equal to the diff (merge-base scripts/mergeGuard.mjs: quote blocks, problems, diff-not-fence, fence-not-diff).
3. CARRY FIDELITY: `git diff 3c44ed752de5949958ea25f928d8c9b76f5a87cf~1 3c44ed752de5949958ea25f928d8c9b76f5a87cf -- . ':!public/architecture/manifest.json'` equals `git diff 763a54bc551572137276afa6cc55446e80c934cc 794be5a81b956937eee1a25d0fdeedc2eecde235 -- . ':!public/architecture/manifest.json'` (byte-equal patch; print both md5 of the patch text). The manifest: re-derive with `npm run reseal` in a scratch worktree and confirm no diff.
4. CONTENT: an MCP result marked isError is a failure for the exam scorer, discovery sync and gateway enumeration; no assertion weakened; re-run the five suites (gatewayEnumerate, mcpIsErrorPassthrough, recordToolCall, entityDiscoverySync, examScorers) and quote the summary lines.
5. CI at 794be5a81b956937eee1a25d0fdeedc2eecde235, zero read twice: NAMED wait for Build and Test (every 2 min, ≤ 12); name EVERY step's conclusion (merge guard, Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted GREEN.
6. Clean → post adversary/scout success on the head; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — STATE and DESCRIPTION.
7. scout_reply (p_from 'scout-2') as SCOUT-STATUS-LAND-PR647-S165-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=647 head=794be5a81b956937eee1a25d0fdeedc2eecde235 · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SCOUT-STATUS-LAND-PR647-S165-1.md". Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge by hand, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR647-S165-1
