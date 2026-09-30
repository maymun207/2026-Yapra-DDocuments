ADVERSARY-VERDICT: GREEN pr=645 head=15e8639cb280901c57729e778d60c3ddca81ac7a · LANDED merge=61e7f368604ffdd86b8841d9063e540641d42efc
SCOUT-STATUS-LAND-PR645-S164-1 · from scout-1 · reply to ORDER-SCOUT-LAND-PR645-S164-1 (id 2042c03a-986f-4909-87c1-1a175c149487, DIGEST-OK). Card created 05:33:48Z while scout-1 was on ORDER-SCOUT-PICK-READINESS-S164-1 (answered first, 05:5xZ); picked up by the next mail-wait at 06:12:59Z.

1 · PRs: gh pr list --state open → exactly one, 645 phase/k41-router-knob-split-s164-3 15e8639cb280901c57729e778d60c3ddca81ac7a, non-draft. PR 643 CLOSED 2026-09-30T05:00:38Z. Master by ls-remote, twice → c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f.

2 · SHAPE: ONE commit, parent c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f; 22 files, +1039 / -52. FILE-FENCE pre-checked: exactly one line that is exactly `FILE-FENCE:` (report :131; the other three mentions are prose :28, a heading :129 and an indented quoted log :263) followed by 22 `- <path>` lines = the diff's 22 paths, same set. CI's guard read the same block: "[merge-guard] FILE-FENCE (… line 131): …22 paths".

3 · CONTENT
- (a) two separate knobs router.matrixReplace and router.keywordArmAllPaths, appended at the tail of REFERENCE_AGENT_PARAMS, stage '07', sessionTweakable false, no migration (self-seed). NOTE ON THIS ORDER'S PREMISE: 3(a) says "both shipped OFF (default 0)". The code ships matrixReplace floor **1** and keywordArmAllPaths floor 0 — exactly as the authoritative CARD-K41-ROUTER-KNOB-SPLIT-S163-1-v2 D2 orders ("NEW router.matrixReplace (floor 1) … effective replace = frameRouting && matrixReplace. Floor 1 under the frameRouting guard reproduces today in EVERY state"). So no behaviour flips: matrixReplace=1 under frameRouting is today's replace, keywordArmAllPaths=0 leaves the arm dark (keywordArmAdded null). No DB publish in the PR. Verdict follows the card, not the order's wording; reported, not resolved.
- (b) R1: routeDecisionMatrix.ts throws unless keywordArmAdded is null/undefined, then strips it from the projection; no golden-hash file in the diff; the new field lives in the stage-07 span output + [ToolRoute] line only.
- (c) R2: both decls stage '07'; stagesRegistry.ts entry added on the stage-07 card (keyPrefix 'router.').
- (d) M2 intact: of the conflict-resolved paths only stageTools.ts is shared with M2; its diff vs master is four K41-only hunks (one import, two span vars, the [ToolRoute] tokens, two span fields). No other M2 path in the diff.
- (e) re-run at head (detached worktree): 20 files, 289/289 — routerKnobSplit, resolveRouterPolicy, stage07RouteTraceFields, learnBrake, digestSink, TurnDigestSection, StagesTab*, frameRoutingFlip, frameKeepsUnmodeledCategories, filterToolsByMessageRouter, stickyCategoryUnion, metricFloorSpanAttr, registerToolsSpanIO, routeOpenStageTools, routeShadowSeam, stageCardCoverage, governanceStagesArrival, m2HonestGrading.
- (f) non-test diff read: no backend id, tenant or category-name literal; the arm uses matchCategories with EMPTY_LEARNED (published/floor keywords only); routeShadowLens frame arm pins matrixReplace: true (D4).
- gates at head: check:doc-drift [OK] 7 tabs · reseal 0 tabs changed (digests 8049c8b2662c … df4a3ba77fd1 — identical to those scout-1's PICK-READINESS trial predicted for a K41 re-pick onto c2a9eab7) · gen:arch-facts unchanged · check:backend-names [OK] (system tests 807) · check:tenant-zero [OK] 2350 · typecheck:api exit 0 · relayAudit [OK].

4 · CI at 15e8639cb280901c57729e778d60c3ddca81ac7a (check-runs read twice, identical, total 8; CI already complete at first read — no Build-and-Test wait was needed)
- runs: Auto-merge landing · report-schema · Relay corpus · Build and Test — all success, attempt 1.
- changes job: 1 Set up · 2 checkout · 3 Decide what this diff can break · 4 Merge guard clock · 5 setup-node · 6 Merge guard (clean-merge + file-fence) — all success; 7–10 not listed by the API.
- build (24.x): 1–11 success incl. 8 Tenant-zero gate and 9 Backend-name gate; 12–20 not listed.
- rule26: 1–7 success incl. 7 RULE-26 headless clip gate; 8–12 not listed.
- eval-canary SKIPPED by design · arm auto-merge success · Vercel Preview Comments success.
- Run tests: 772 files; 11658 passed | 4 expected fail | 1 skipped (11663).
- [merge-guard] VERDICT GREEN (CLEAN-MERGE; FENCE-GREW ok; timeline ok — 3 events, no reopen, no force-push; COLLISION 0).
- timeline read directly: committed · commented (vercel[bot]) · auto_merge_enabled — no force-push. Before the status: OPEN, MERGEABLE, BLOCKED (not BEHIND), auto-merge armed.

5 · LANDING
- adversary/scout success on 15e8639cb280901c57729e778d60c3ddca81ac7a at 2026-09-30T06:16:59Z.
- named wait: read 1 06:17:07Z unchanged; read 2 06:18:08Z moved. PR 645 MERGED 2026-09-30T06:17:13Z, merge 61e7f368604ffdd86b8841d9063e540641d42efc, parents c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f + 15e8639cb280901c57729e778d60c3ddca81ac7a.
- Vercel at merge: pending "Vercel is deploying your app" ×3, read 4 06:21:38Z success "Deployment has completed"; deployment 6752943984 environment Production, status success "Deployment has completed". Production READY.

DARK: no production turn read; the owner's witness (matrixReplace=0 + keywordArmAllPaths=1 via Rules UI, then the tour question) is the owner's step after landing and was not done here (FORBIDDEN: knob flip).
Forbidden kept: no edit, push, merge by hand, re-run, dispatch, cron, migration, knob flip. No environment value printed. Worktree wt645 removed.
