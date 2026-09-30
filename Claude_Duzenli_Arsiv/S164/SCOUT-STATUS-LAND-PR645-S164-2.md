ADVERSARY-VERDICT: GREEN pr=645 head=15e8639cb280901c57729e778d60c3ddca81ac7a · LANDED merge=61e7f368604ffdd86b8841d9063e540641d42efc · LANDED-BY-SCOUT-1 (no second status posted)
SCOUT-STATUS-LAND-PR645-S164-2 — scout-2 (backup lander) · reply_to ORDER-SCOUT-LAND-PR645-BACKUP-S164-2 (id 4bfd8b43-5b6e-4ef9-a2da-61514379d40d, md5 e378c588bade966f08b6911ffa3c49c6 DIGEST-OK). The order was read 06:16:22Z; it was minted 05:55:37Z, so the latency was 1244s: my box wait was mid-cycle when it was minted.

LANDED-BY-SCOUT-1:
- On first read of the head's statuses there was no adversary/scout status, only Vercel preview `success | Canceled by Ignored Build Step` 05:29:21Z, which is a cancelled preview and not a deploy.
- Before posting I re-read it: one adversary/scout status existed, `success | scout-1 GREEN ORDER-SCOUT-LAND-PR645-S164-1: shape/fence 22=22/R1 R2/knob floors per card D2/tests 289/gates/CI 4of4 clean | 2026-09-30T06:16:59Z`.
- Per the order I VERIFIED it and posted NOTHING. My independent read below reaches the same GREEN.

1 · PRE: `gh pr list --state open` → exactly one: 645, phase/k41-router-knob-split-s164-3, head 15e8639cb280901c57729e778d60c3ddca81ac7a. ls-remote master ×2 → c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f.

2 · SHAPE: `git log --format="%H %P"` → 15e8639c… with parent c2a9eab7…, one commit. diff --stat: 22 files, +1039/−52.
FENCE, checked with the merge-base's own scripts/mergeGuard.mjs (c2a9eab7 tree): blocks 1 (report line 131), entries 22, problems [], diff-not-fence [], fence-not-diff []. The PR 643 NO-FENCE defect is fixed.

3 · CONTENT:
(a) Two separate knobs (agentParams.ts decls, both stage '07', min 0 / max 1, sessionTweakable false): router.matrixReplace value **1**, router.keywordArmAllPaths value **0**.
CARD-VS-BYTES: the order says "both shipped OFF (default 0)"; matrixReplace's floor is 1. This is NOT a flip. Effective replace = frameRouting && matrixReplace (toolCategories.ts:1651-1658 `routerPolicy.matrixReplace !== false`; resolveRouterPolicy.ts:81/:106), so 1 reproduces today in every state, and 0 would have DROPPED production's current replace at deploy. The decl comment states this, and scout-1's status says "knob floors per card D2", so the card body D2 appears to rule 1. The ORDER's wording is the stale line. keywordArmAllPaths = 0 adds nothing at the floor.
(b) R1: routeDecisionMatrix.ts now THROWS if `keywordArmAdded` is non-null with the knob unset, and strips it from the projection only after proving it dark. The decision projection is otherwise unchanged. stage07RouteTraceFields (which drives the matrix) is green at head.
(c) R2: both knobs are stage '07'.
(d) M2 intact: the stageTools.ts diff is additive only (one import, knobsForSpan/keywordArmAddedForSpan, `knobs=`/`kwArm=` tokens on [ToolRoute], two span fields). No M2 path is otherwise touched. At head: recordToolEmpty/`empty:` (stageTools.ts ×2), listLastForCarry and CARRY_OUTCOME_FILTER (EpisodesRepository.ts ×5, stageClarify.ts ×3) are present.
(e) RE-RUN at the head tree (git archive into scratch, the clone's node_modules linked, the shared clone untouched): routerKnobSplit, learnBrake, resolveRouterPolicy, stage07RouteTraceFields, digestSink, TurnDigestSection, StagesTab.setContext → "Test Files 7 passed (7) · Tests 109 passed (109)".
(f) Literals: CI Tenant-zero gate success, Backend-name gate success. data/gates/backend-names-baseline.json is in the fence (the instrument's own baseline).

4 · CI at 15e8639cb280901c57729e778d60c3ddca81ac7a (check-runs total 8), all complete at first read, so no wait was needed:
Build and Test 36673660157:
- changes success, steps 1-6 incl. "Merge guard (clean-merge + file-fence, run from the merge-base)" success
- eval-canary SKIPPED (by design)
- build (24.x) success: RULE-40, Migration version-key, Tenant-zero, Backend-name, Build, Run tests all success
- rule26 success: Playwright deps/Chromium, RULE-26 headless clip gate success
report-schema 36673660108 success · Relay corpus 36673660103 success · Auto-merge landing 36673660229 success · Vercel Preview Comments success.
Merge guard, verbatim: `[merge-guard] pr #645 base c2a9eab7… head 15e8639c… merge-base c2a9eab7…` · `[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head` · `[merge-guard] FILE-FENCE (docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md line 131): <22 paths>` · `[merge-guard] timeline ok — 3 events, no reopen, no force-push` · `[merge-guard] COLLISION: 0 other open PR(s) against master (plant heads ignored)` · `[merge-guard] VERDICT GREEN`.

5 · LANDING:
- PR 645 MERGED at 2026-09-30T06:17:13Z, merge 61e7f368604ffdd86b8841d9063e540641d42efc; ls-remote master = 61e7f368….
- VERCEL at the merge sha: status pending "Vercel is deploying your app" 06:17:23Z (waits 1-2), then `success | Deployment has completed` (wait 3, 06:21:52Z).
- Deployment 6752943984 environment `Production`, latest status `success | Deployment has completed` at 2026-09-30T06:21:36Z. A completion, not a cancellation.
LOG ACCESS: one filtered read-only fetch outside the sandbox for the job log blob host (permission-gated).

NEXT: resuming ORDER-SCOUT-REVIEW-CARD-SD-S164-1 against the new master 61e7f368 (a delta note follows as its own row).
read relay_inbox at 2026-09-30T06:16:22Z (mail-wait exit 0) + --read of order 4bfd8b43.
