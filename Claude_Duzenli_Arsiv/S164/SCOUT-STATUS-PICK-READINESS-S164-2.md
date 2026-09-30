SCOUT-STATUS-PICK-READINESS-S164-2 · from scout-1 · second pass of ORDER-SCOUT-PICK-READINESS-S164-1 against the NEW master, as ORDER-SCOUT-LAND-PR645-S164-1 step 6 orders (reply_to = the PR645 order; the first pass is SCOUT-STATUS-PICK-READINESS-S164-1 against c2a9eab7).

MASTER: 61e7f368604ffdd86b8841d9063e540641d42efc (merge of PR 645, K41) — read by ls-remote and by gh at landing.
BRANCHES on origin (ls-remote): POST-LANDING-1 phase/post-landing-1-s164-1 f145e48e8d192291267b81c6f48c275877b74478 (parent 41450c98, M1) · M1B phase/m1b-iserror-readers-s164-1 3c44ed752de5949958ea25f928d8c9b76f5a87cf (parent 41450c98) · M4a phase/m4a-memory-offered-overlap-s164-2 b6e347be1aba2f300bee3748dd3ac836aef82fd1 (parent c2a9eab7, M2) — added as an extra row because it is the queue's tail; -s164-1 3faf7ea5 is superseded (its parent is the pre-merge M2 commit 37faf47a). No M3 branch on origin (a local M3 worktree exists at c2a9eab7 with no own commit — not measured).

| branch | head | vs master 61e7f368 (merge-tree) | conflicting paths | reseal |
|---|---|---|---|---|
| POST-LANDING-1 | f145e48e8d192291267b81c6f48c275877b74478 | CLEAN (tree b69e12bf) | — | n (paths outside every sealed tab's codeAreas) |
| M1B | 3c44ed752de5949958ea25f928d8c9b76f5a87cf | CONFLICT | public/architecture/manifest.json only (stageTools.ts now meets M2 AND K41 — auto-merges; mcpIsErrorPassthrough.test.ts auto-merges) | y — 5 tabs |
| M4a -s164-2 | b6e347be1aba2f300bee3748dd3ac836aef82fd1 | CONFLICT | public/architecture/manifest.json only | y — 6 tabs |

TRIALS (one temp worktree at 61e7f368; control first; cherry-pick -n, --ours manifest, gates; removed afterwards):
- CONTROL clean master 61e7f368: check:doc-drift [OK].
- M1B: reseal 5 tabs (Architecture Map 25d3e2d85dc7, Runtime Topology d4d5a2a454c4, Request Lifecycle af59bc3bd0af, Agent Control Plane 85454ed68aa3, Stage Cards a887b63ae89b; LLM Control Surface, Governance unchanged) → doc-drift [OK] · gen:arch-facts unchanged · backend-names [OK] (system tests 807) · typecheck:api exit 0 · vitest M1B+K41+M2 suites 17 files 289/289 · merged mcpIsErrorPassthrough.test.ts outside the sandbox 9/9.
- M4a: reseal 6 tabs (Architecture Map c71bb6cb1ace, Runtime Topology 1990dbc9d73e, Request Lifecycle a76f96cb8ab9, Governance Model c40997928641, Agent Control Plane 8530e75ded0f, Stage Cards a4508eb63af0; LLM Control Surface unchanged) → doc-drift [OK] · gen:arch-facts "left unchanged" (M4a's committed facts.json already equals the regenerated one) · backend-names [OK] · tenant-zero [OK] 2353 · typecheck:api exit 0 · check:migration-versions [OK] 101 unique 14-digit keys (M4a adds 20260930050000_health_memory_daily.sql) · vitest M4a+M2+K41 suites 12 files 219/219.
- Every re-pick is one step: cherry-pick -n onto current master, take master's manifest, npm run reseal in the same commit. No hand-merged hunk, no baseline rewrite, no facts change. Digests above hold only for a re-pick onto 61e7f368 alone.

PAIRWISE OVERLAP (each branch vs its own parent):
- POST-LANDING-1 ∩ M1B = ∅ · POST-LANDING-1 ∩ M4a = ∅.
- M1B ∩ M4a: api/cwf/_lib/turn/types.ts, public/architecture/manifest.json. merge-tree M1B×M4a: types.ts, stageTools.ts and mcpIsErrorPassthrough.test.ts AUTO-MERGE; manifest.json conflicts → the second of the two to land re-picks with a reseal.
- M4a carries a migration (20260930050000) and docs/ground/facts.json — the only queued branch with either; its landing will need the Operator's migration step per the house contract (not measured here).

UNMEASURED: POST-LANDING-1's own tests at the merged tree (clean merge, disjoint paths); full suites of the trials; M3 (no pushed branch).
Forbidden kept: read-only on every branch; no push, merge, re-run, cron, migration. No environment value printed.
