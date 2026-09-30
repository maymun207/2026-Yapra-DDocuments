SCOUT-STATUS-PICK-READINESS-S164-1 · from scout-1 · reply to ORDER-SCOUT-PICK-READINESS-S164-1 (id b4f1e9a2-9b2d-4227-9484-1d3f65d28615, DIGEST-OK)

MASTER: git ls-remote origin refs/heads/master, twice → c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f both reads (= expected; merge of PR 644, M2 honest grading, on top of 41450c98 M1).
BRANCHES (git ls-remote "refs/heads/phase/*"): phase/post-landing-1-s164-1 f145e48e8d192291267b81c6f48c275877b74478 · M1B = phase/m1b-iserror-readers-s164-1 3c44ed752de5949958ea25f928d8c9b76f5a87cf · K41 = phase/k41-router-knob-split-s164-2 d65de62f904b2ebf45ff3efec6fab944544b37dd (no -s164-3 ref exists). Each is ONE commit whose parent is 41450c98f75c18d0fe0e4c59bb1e8c8b73d384b1 (M1), i.e. one merge (PR 644) behind master.

| branch | head | vs master c2a9eab7 (git merge-tree --write-tree) | conflicting paths | reseal |
|---|---|---|---|---|
| POST-LANDING-1 | f145e48e8d192291267b81c6f48c275877b74478 | CLEAN (tree 39a98e93) | — | n — its 5 paths (api/cwf/__tests__/authorityMatrix.test.ts, scripts/authorityMatrix.mjs, docs/ground/authority-*.{md,json}, its report) fall in no sealed tab's codeAreas |
| M1B | 3c44ed752de5949958ea25f928d8c9b76f5a87cf | CONFLICT | public/architecture/manifest.json ONLY (stageTools.ts and mcpIsErrorPassthrough.test.ts auto-merge with M2) | y — 5 tabs |
| K41 | d65de62f904b2ebf45ff3efec6fab944544b37dd | CONFLICT | public/architecture/manifest.json ONLY (stageTools.ts auto-merges with M2) | y — all 7 tabs |

TRIAL RE-PICKS (card step 2 option: temp detached worktrees at master, `git cherry-pick -n <head>`, `git checkout --ours public/architecture/manifest.json`, then the gates; all worktrees removed afterwards):
- CONTROL: clean master c2a9eab7 → check:doc-drift [OK] 7 tabs (so every drift below is the branch's own content, not a stale master).
- K41 over master: check:backend-names [OK] (system tests 807 = K41's committed baseline; no rewrite needed) · check:tenant-zero [OK] 2350 files · typecheck:api exit 0 · check:doc-drift [FAIL] 7 tabs → npm run reseal → 7 tabs hash-changed (Architecture Map 8049c8b2662c, Runtime Topology 5d209a8702f8, Request Lifecycle dd3e8f98182a, LLM Control Surface fca774c2c2f1, Governance Model 3755a4d6fc31, Agent Control Plane 38a79271bb75, Stage Cards df4a3ba77fd1) → doc-drift [OK] · gen:arch-facts "left unchanged" · vitest (K41 + M2 + stage-07 suites, 19 files) 269 passed, 3 failed = listen EPERM 127.0.0.1 in mcpIsErrorPassthrough (sandbox loopback, same 3 as on M1's own head).
- M1B over master: check:backend-names [OK] (system tests 802, unchanged) · check:tenant-zero [OK] 2349 files · typecheck:api exit 0 · check:doc-drift [FAIL] 5 tabs → reseal → Architecture Map ab3b8d29c276, Runtime Topology 693db206cd92, Request Lifecycle c9d7c42637d3, Agent Control Plane fdcdf40ffb77, Stage Cards 8fc074134e06 (LLM Control Surface, Governance Model unchanged) → doc-drift [OK] · gen:arch-facts "left unchanged" · vitest (M1B + M2 suites, 15 files) 251 passed, 3 failed = the same loopback EPERM; the auto-merged mcpIsErrorPassthrough.test.ts re-run OUTSIDE the sandbox → 9/9 passed.
- So each re-pick is one step: cherry-pick -n onto current master, take master's manifest, npm run reseal in the same commit. No hand-merged hunk, no baseline rewrite, no facts change. (Digests above are for a re-pick onto c2a9eab7 alone; after any other landing they change — the lane re-derives, never copies them.)

PAIRWISE OVERLAP (git diff --name-only 41450c98..head):
- POST-LANDING-1 ∩ M1B = ∅ · POST-LANDING-1 ∩ K41 = ∅.
- M1B ∩ K41 = api/cwf/_lib/turn/stageTools.ts, public/architecture/manifest.json. Three-way trial (git merge-tree --merge-base 41450c98 K41 M1B): stageTools.ts AUTO-MERGES; manifest.json conflicts → whichever of the two lands second re-picks with a reseal again.
- Each vs master's own delta (M2): M1B shares stageTools.ts, mcpIsErrorPassthrough.test.ts, manifest.json; K41 shares stageTools.ts, manifest.json; POST-LANDING-1 shares none.

STEP 4: standing by for ORDER-SCOUT-LAND on K41 (SLIP-K41-RECUT-S164-6) — back in mail-wait.

UNMEASURED: POST-LANDING-1's own tests at the merged tree (not run — its paths are disjoint from master's delta and the merge-tree is clean); full suite of any trial (targeted suites only); the loopback tests of the K41 trial outside the sandbox (K41 does not touch that file; M1B's trial covered it).
Forbidden kept: no edit to any branch, push, merge, re-run, dispatch, cron, migration. No environment value printed.
