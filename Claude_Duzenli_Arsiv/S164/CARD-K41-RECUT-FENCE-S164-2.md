<!-- relay-audit: v1 kind=card -->
CARD-K41-RECUT-FENCE-S164-2

LANE: AG-3 (after your M2 PR 644 slip; AG-1 is silent, so K41 moves to you)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T05:12Z
SUBJECT: carry K41 (AG-1's phase/k41-router-knob-split-s164-1 = 53d76e6b67c679f7bc19ff934c41f388af8788ca; PR 643 closed by you) onto a fresh branch with the ONE shape fix scout-2 measured. Content is correct; only the fence SHAPE was wrong: the report docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md has 0 parseable `FILE-FENCE:` blocks (a Markdown heading + an evidence code block instead), so the merge guard said `VERDICT RED — NO-FENCE` (scripts/mergeGuard.mjs:313-319 judgeBlocks; parser :64-85; FENCE_HEAD :55). scout-2 proved the fix with the guard's own code: parseFenceBlocks → 1 block, 22 entries; validateFence → []; fenceCovers over the 22 diff paths → uncovered [].
SEAL: EXEMPT with ack = scout-2's measurement row of this SAME subject (SCOUT-STATUS-MEASURE-K41-GUARD-S164-1), practice 136 — same content, one report-shape repair.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 7c246685-3d9c-4474-b3d0-2bfc5d43793e
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 (K41) · OWNER-APPROVAL-S163-K41-1 · CARD-K41-FRESH-PREP-S164-1 (R1/R2 rulings stand) · register 143, 145 · §12.12.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDERS
1. Base: K41 goes on the master that CONTAINS M2. `git ls-remote origin refs/heads/master` TWICE; if it is still 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (M2 not yet landed), NAMED WAIT: read it every 60 s, at most 20 reads, until it moves; print each read. If it never moves, STOP and slip "M2 not landed".
2. Clean worktree (print `git status --porcelain -uall`). `git switch -c phase/k41-router-knob-split-s164-2 <new master>`; `git cherry-pick -n 53d76e6b67c679f7bc19ff934c41f388af8788ca`. M2 and K41 do not share files by scout-2's diff lists, but if the pick conflicts, resolve IN THE PICK keeping both, name each file and side; seal conflicts: `git checkout --theirs` the generated file then `npm run reseal` (practice 127).
3. THE FIX: in docs/relay/K41-ROUTER-KNOB-SPLIT-S163-1-AG2-report.md, directly under the heading `## FILE-FENCE (one commit)` and OUTSIDE the ``` block, insert EXACTLY the block below (one line `FILE-FENCE:` then 22 `- ` lines, then a blank line). Keep the prose block. Add NO second `FILE-FENCE:` line anywhere. If the pick changed the path set (e.g. a regenerated file added/removed), the block must equal the NEW `git diff --name-only <new master> HEAD` set — recompute and print it.
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

4. Run the guard's judge locally over the report (import scripts/mergeGuard.mjs parseFenceBlocks/validateFence/fenceCovers as scout-2 did, or run the guard as build.yml calls it) and QUOTE: blocks 1, problems [], uncovered []. Add a CARRIED line in the report: "carried by AG-3 onto <new master> under CARD-K41-RECUT-FENCE-S164-2; fence shape fixed".
5. GATES: `npm run build` (reseal if drift; regenerated files must be in the block) · typecheck:api · check:rule24 · check:tenant-zero · check:backend-names · check:migration-versions · relayAudit over docs/relay/ · the five K41 test files + TurnDigestSection/StagesTab tests. Quote each line.
6. ONE commit, parent = new master; push; `git ls-remote` it. `gh pr list --state open` must be EMPTY (M2 landed) → open the PR (title as 643 + " — re-cut, fence shape"; body: 643's body + "Supersedes #643 (closed: merge guard NO-FENCE); fence block added per SCOUT-STATUS-MEASURE-K41-GUARD-S164-1"). If a PR is open, STOP and slip.
7. CI by the FULL 40-hex head; zero read twice; named waits ≤ 12 × 2 min; quote each conclusion and the `[merge-guard] VERDICT`; SKIPPED named. Slip SLIP-CARD-K41-RECUT-FENCE-S164-2 (bus): PR number, head, conclusions, VERDICT. Back to `node scripts/mail-wait.mjs AG-3 --budget-min 480`.

FORBIDDEN: pushing to AG-1's or AG-2's branches; editing K41 code beyond conflict resolution; two commits; --force; merging by hand; flipping router.matrixReplace / keywordArmAllPaths (owner, Rules UI, after landing); cron; printing an environment value.

END · CARD-K41-RECUT-FENCE-S164-2
