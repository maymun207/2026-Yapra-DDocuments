<!-- relay-audit: v1 kind=notice -->
NOTICE-PR629-FRESH-BRANCH-S162-1

LANE: AG-1 (in mail-wait; your worktree on phase/lane-sandbox-allowances-s161-2 at bcb0c576ac2e1f815ff34ec1e0824d0c1a337e1b)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T17:40Z
SUPERSEDES: NOTICE-PR629-MERGE-MASTER-S162-1 (bus 76c98861-96ee-49cb-8f7a-26b45f27bb50) — executed by you exactly as written, and WRONG BY THE GUARD'S DESIGN. A-REC-S162-1 (Architect): I ordered a hand-resolved package.json union inside a merge commit without reading the guard's rule; practice 101 (register) already said a colliding sibling is carried onto a FRESH BRANCH, never merged by hand.
MEASURED by scout-1 (SCOUT-STATUS-MEASURE-PR629-GUARD-S162-1, bus bdc63113-1867-4a2d-8ff5-35aec42df436): Build and Test at bcb0c576 → job changes step 6 `[merge-guard] FAIL MERGE-HAND-EDIT — 6c3c7128faf21a36b2b39d68b4e550a617e8b907 — rehearsal conflicted; the commit differs outside the reseal paths: package.json` → `VERDICT RED — MERGE-HAND-EDIT`. Rule at scripts/mergeGuard.mjs L260-290 (merge-base 7b54180d): every MERGE commit in mb..head is rehearsed with merge-tree on its parents; a tree that differs from the rehearsal outside the reseal paths fails. FENCE-GREW ok; COLLISION with #630 is a note (#630 yields). The CONTENT of your union is right (17/17, check:backend-names once, 18 `node --import tsx` lines, zero bare `tsx scripts/`); the MECHANISM (a merge commit with a hand resolution) is what the guard rejects. Remedy named by the scout and adopted: a fresh branch from current master carrying the same 8-path change with NO in-branch merge commit (as PR 620 did for 618).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
`git fetch origin && git ls-remote origin refs/heads/master` read twice; master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26 (if master moved, STOP and slip the new sha — the Architect re-cuts). Tree clean.

## ORDER
1. `git checkout -b phase/lane-sandbox-allowances-s162-3 origin/master`. Bring the branch's CONTENT over without a merge: `git checkout bcb0c576ac2e1f815ff34ec1e0824d0c1a337e1b -- .claude/settings.json api/cwf/__tests__/laneWriteTransport.test.ts docs/ops/LANE-SANDBOX.md docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md package.json scripts/checkGroundTruth.ts scripts/laneWrite.mjs scripts/mail-wait.mjs` (the 8 fenced paths; bcb0c576's tree already carries the union). Prove: `git diff --stat bcb0c576ac2e1f815ff34ec1e0824d0c1a337e1b -- <those 8 paths>` is EMPTY, and `git diff --name-only origin/master` lists exactly those 8. In the report add ONE evidence-fenced line under the landing section: `FRESH-BRANCH: phase/lane-sandbox-allowances-s162-3 from master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26; content = bcb0c576 tree for the 8 fenced paths; supersedes PR 629 (MERGE-HAND-EDIT, guard by design)`; `node scripts/relayAudit.ts` on the report. ONE commit (non-merge), subject in the house grammar.
2. `npm run build` (five gates) and `npm run typecheck:api`; quote the last line of each.
3. `git push -u origin phase/lane-sandbox-allowances-s162-3`; print the 40-hex head and `git ls-remote origin refs/heads/phase/lane-sandbox-allowances-s162-3`. Open the PR (non-draft, title `AG-1: LANE-SANDBOX-ALLOWANCES-S161-1 — proxy-aware pg transport, tsx entry switch, sandbox keys (supersedes #629)`), then close PR 629 with the comment `superseded by #<new> — MERGE-HAND-EDIT by guard design; practice 101`. Do NOT delete the old branch.
4. CI at the new head by full sha, read twice if zero; quote the `[merge-guard] VERDICT` line from the changes job (expected GREEN; COLLISION note with #630 expected, #630 yields).
5. SLIP (laneSlip) as SLIP-PR629-FRESH-BRANCH-S162-1: first line `NEW-HEAD: <40-hex> pr=<new number>`, the empty diff-stat proof, build/typecheck last lines, relayAudit line, the VERDICT line, GRAFT line. Fallback file: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR629-FRESH-BRANCH-S162-1.md" with its sha256 printed.
6. DO NOT STOP: `node scripts/mail-wait.mjs AG-1 --budget-min 480`; 0 → --read <name> --take, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED with reason, stop.
FORBIDDEN: any merge commit on the new branch; rebase of the old branch; --force; merge of your own PR; a cron; printing an environment value.

END · NOTICE-PR629-FRESH-BRANCH-S162-1
