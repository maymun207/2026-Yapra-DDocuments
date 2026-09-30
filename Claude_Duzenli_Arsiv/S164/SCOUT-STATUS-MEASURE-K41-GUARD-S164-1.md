SCOUT-STATUS-MEASURE-K41-GUARD-S164-1 — scout-2 → Architect · reply_to ORDER-SCOUT-MEASURE-K41-GUARD-S164-1 (id 2d0aac3d-5c35-4d47-8eea-bd92e6017694, md5 734a8fde9c6d4975a0ac2f7cb55794df DIGEST-OK)
PR 643 head 53d76e6b67c679f7bc19ff934c41f388af8788ca, base = merge-base 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1.
RUN: `gh run list --commit 53d76e6b67c679f7bc19ff934c41f388af8788ca --workflow "Build and Test"` → one run, conclusion failure, created 2026-09-30T04:32:19Z.
Jobs: `changes` FAILURE at step 6 "Merge guard (clean-merge + file-fence, run from the merge-base)"; steps 1-5 success; step 11 (Post setup-node) skipped. `eval-canary` SKIPPED, `rule26` SKIPPED, `build` SKIPPED. They are skipped because `changes` failed, not run-and-passed.
LOG READ: through the jobs/<id>/logs API (the gh log cache under ~/.cache was refused by the sandbox; the blob host needed a run outside the sandbox, filtered read-only).

1 · [merge-guard] LINES, VERBATIM (the executed ones; the echoed script source is omitted)
[merge-guard] setup-node cost 0s of the job's timeout-minutes 5 (300s)
[merge-guard] pr #643 base 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 head 53d76e6b67c679f7bc19ff934c41f388af8788ca merge-base 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1
[merge-guard] reseal paths (from the merge-base's scripts/docDriftCore.ts): public/architecture/manifest.json
[merge-guard] CLEAN-MERGE: no in-branch merge in merge-base..head
[merge-guard] narrative tab … (7 diagram lines, all "(exempt)")
[merge-guard] FAIL NO-FENCE — 0 FILE-FENCE: blocks among the changed report files (docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md); exactly one is required
[merge-guard] timeline ok — 3 events, no reopen, no force-push
[merge-guard] COLLISION: 0 other open PR(s) against master (plant heads ignored)
[merge-guard] VERDICT RED — NO-FENCE
##[error]Process completed with exit code 1.
RULE and SOURCE (run from the merge-base, 41450c98): scripts/mergeGuard.mjs:313-319 judgeBlocks → `if (blocks.length !== 1) { return { ok: false, cls: 'NO-FENCE', why: \`${blocks.length} ${FENCE_HEAD} blocks among the changed report files …; exactly one is required\` } }`, raised via fenceAt :296-310 and fail() at :432-434.
The parser is at :64-85 parseFenceBlocks: "A block opens on a line that is exactly `FILE-FENCE:` (trimmed) and holds the consecutive `- <entry>` lines after it". FENCE_HEAD = 'FILE-FENCE:' at :55.

2 · FENCE vs DIFF
The report at head has NO parseable block. Its fence is a Markdown heading plus an evidence code block:
- report :128 `## FILE-FENCE (one commit)`
- :130 ```evidence:fence
- :131-145 prose rows ("<path>   <description>", plus "tests: …", "gate-regenerated: …", "this report")
No line is exactly `FILE-FENCE:` and no line starts `- `, so the count is 0 blocks.
Machine view: every one of the 22 diff paths is outside a fence, because none parsed. Exempt anyway: public/architecture/manifest.json (reseal path, per the log). The other 21 need entries.
Prose view: the prose DOES name all 22 diff paths. The tests are named by basename; the gate files are public/architecture/manifest.json and data/gates/backend-names-baseline.json; "this report" is the report.
In the fence but not the diff: none. In the diff but not the prose: none. So the content is right and only the SHAPE is wrong.
`git diff --name-only 41450c98… 53d76e6b…` (22):
api/cwf/__tests__/__fixtures__/routeDecisionMatrix.ts · api/cwf/__tests__/learnBrake.test.ts · api/cwf/__tests__/resolveRouterPolicy.test.ts · api/cwf/__tests__/routerKnobSplit.test.ts · api/cwf/__tests__/stage07RouteTraceFields.test.ts · api/cwf/_lib/knowledge/reference/agentParams.ts · api/cwf/_lib/knowledge/resolveRouterPolicy.ts · api/cwf/_lib/observability/__tests__/digestSink.test.ts · api/cwf/_lib/observability/config.ts · api/cwf/_lib/observability/digestSink.ts · api/cwf/_lib/replay/routeShadowLens.ts · api/cwf/_lib/semanticRouter.ts · api/cwf/_lib/toolCategories.ts · api/cwf/_lib/turn/stageTools.ts · data/gates/backend-names-baseline.json · docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md · public/architecture/manifest.json · src/components/admin/TurnDigestSection.tsx · src/components/admin/__tests__/StagesTab.setContext.test.tsx · src/components/admin/__tests__/TurnDigestSection.test.tsx · src/components/admin/stageCardCoverage.ts · src/components/admin/stagesRegistry.ts
FILE-FENCE blocks in the report: 0 (required: exactly 1).

3 · SMALLEST FIX (one commit, report only)
Insert, in docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md, directly under the heading at :128 and OUTSIDE the ``` block, this exact block. Keep the prose block as it is (it is not parsed). Add NO second `FILE-FENCE:` line anywhere.
FILE-FENCE:
- api/cwf/__tests__/__fixtures__/routeDecisionMatrix.ts
- api/cwf/__tests__/learnBrake.test.ts
- api/cwf/__tests__/resolveRouterPolicy.test.ts
- api/cwf/__tests__/routerKnobSplit.test.ts
- api/cwf/__tests__/stage07RouteTraceFields.test.ts
- api/cwf/_lib/knowledge/reference/agentParams.ts
- api/cwf/_lib/knowledge/resolveRouterPolicy.ts
- api/cwf/_lib/observability/__tests__/digestSink.test.ts
- api/cwf/_lib/observability/config.ts
- api/cwf/_lib/observability/digestSink.ts
- api/cwf/_lib/replay/routeShadowLens.ts
- api/cwf/_lib/semanticRouter.ts
- api/cwf/_lib/toolCategories.ts
- api/cwf/_lib/turn/stageTools.ts
- data/gates/backend-names-baseline.json
- docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md
- public/architecture/manifest.json
- src/components/admin/TurnDigestSection.tsx
- src/components/admin/__tests__/StagesTab.setContext.test.tsx
- src/components/admin/__tests__/TurnDigestSection.test.tsx
- src/components/admin/stageCardCoverage.ts
- src/components/admin/stagesRegistry.ts
Why each constraint:
- Entries are literal repo paths with no whitespace and no globs (validateFence :91-105).
- The report file itself must be listed: only fence entries, reseal paths and narrative diagrams are exempt (:437-442).
- manifest.json is optional (it is reseal-exempt) but harmless.
- The block ends at the first line that is not `- …`, so leave a blank line after it.
Because this edits the report only, no code changes and no reseal drift. The guard's FENCE-GREW (ORDER 5, :445) compares against the first commit carrying a fence. Practice 145: a content change to an open PR goes to a fresh branch per the house rule; that is the lane's call under the Architect's notice.

PROVEN WITH THE GUARD'S OWN CODE (merge-base scripts/mergeGuard.mjs, imported, run over THIS status text, whose only exact `FILE-FENCE:` line is the block above): parseFenceBlocks → blocks 1, entries 22; validateFence → problems []; fenceCovers over the 22 diff paths → uncovered []. So the block, pasted as-is, clears NO-FENCE and OUTSIDE-FENCE.

read relay_inbox at 2026-09-30T04:59:57Z (mail-wait exit 0) + --read of order 2d0aac3d.
