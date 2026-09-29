<!-- relay-audit: v1 kind=notice -->
NOTICE-PR631-FRESH-BRANCH-S163-1

LANE: AG-1 (in mail-wait if your S162 loop is still alive; your last branch phase/lane-sandbox-allowances-s162-3 at b2ebe011cae56130bf772339207847810725d90d, PR 631 CLOSED unmerged 2026-09-28T19:17:16Z by the serial-close ruling)
fanout: personalized (one lane, one body)
FROM: Architect, S163, 2026-09-29T01:51Z
AUTHORITY: OWNER-APPROVAL-S162-PLAN-1 (landing chain, step b) · OWNER-RULING-S162-GET-IT-DONE-1 (one open PR at a time; find the way and ship).
MEASURED by the Architect at 2026-09-29T01:51Z: master = 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd (Merge PR #633, E1-b, merged 2026-09-28T19:36:31Z; Vercel production READY dpl_4zciE5QC99Wk9ZiJEAmEvStSyBdX). Open PRs: NONE. PR 631 = ONE non-merge commit b2ebe011 (parent 7b54180d), 8 paths: .claude/settings.json · api/cwf/__tests__/laneWriteTransport.test.ts · docs/ops/LANE-SANDBOX.md · docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md · package.json · scripts/checkGroundTruth.ts · scripts/laneWrite.mjs · scripts/mail-wait.mjs. PR 633 ALSO changed package.json (and facts.json/manifest.json, not in your fence).
WHY CHERRY-PICK AND NOT `git checkout <sha> -- <paths>`: b2ebe011's package.json predates 633; checking it out would DELETE 633's package.json lines. Carry the DIFF, not the file.
GUARD RULES THIS DEPENDS ON (scripts/mergeGuard.mjs at master, quoted by line, A-REC-S162-1/-2):
- MERGE-HAND-EDIT, L260-290: `git rev-list --min-parents=2 --parents mb..head` (L261) — ONLY merge commits are rehearsed. A cherry-pick is a single-parent commit; resolving a package.json conflict INSIDE it is not a merge-hand-edit.
- COLLISION, L494/L504/L521: open PRs only; there are none, so no yield.
- FENCE-GREW: the report's scope fence in the FIRST commit must list all 8 paths (it already does, carried by the cherry-pick). Do not add a path in a later commit.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
`git fetch origin && git ls-remote origin refs/heads/master` read twice; expected 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd (if moved, STOP and slip the new sha). Tree clean (name any dirty file, do not discard it — CLAUDE.md §8).

## ORDER
1. `git checkout -b phase/lane-sandbox-allowances-s163-4 origin/master` · `git cherry-pick b2ebe011cae56130bf772339207847810725d90d`. If package.json conflicts: keep EVERY line of both sides of the "scripts" block (633's lines AND 631's lines; 631's `node --import tsx` rewrites win where the SAME key differs), then `git cherry-pick --continue`. Any conflict OUTSIDE package.json → STOP and slip the path (do not resolve).
2. Proofs, quoted in the slip: `git log --format='%H %P' origin/master..HEAD` = exactly ONE commit with ONE parent 3d2f06a5; `git diff --name-only origin/master` = exactly the 8 paths; `git diff b2ebe011cae56130bf772339207847810725d90d -- <the 7 paths other than package.json>` EMPTY; `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8'))"` OK; every "scripts" key of origin/master's package.json still present (print the count before/after). In the report add ONE evidence-fenced line under the landing section: `FRESH-BRANCH: phase/lane-sandbox-allowances-s163-4 cherry-picked from b2ebe011 onto master 3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd; supersedes PR 631 (closed by serial-close ruling)` — amend it INTO the same single commit (git commit --amend --no-edit after git add of the report), so the branch stays ONE commit. `node scripts/relayAudit.ts` on the report.
3. `npm run build` (five gates) and `npm run typecheck:api` and `npm run check:backend-names`; quote the last line of each.
4. `git push -u origin phase/lane-sandbox-allowances-s163-4`; print the 40-hex head and `git ls-remote origin refs/heads/phase/lane-sandbox-allowances-s163-4`. Open the PR (non-draft, title `AG-1: LANE-SANDBOX-ALLOWANCES-S161-1 — proxy-aware pg transport, tsx entry switch, sandbox keys (supersedes #631)`), arm auto-merge exactly as your earlier PRs did. Do NOT delete old branches.
5. CI at the new head by full 40-hex sha, read twice if zero (S101-L1); quote the `[merge-guard] VERDICT` line of the changes job (expected GREEN: no merge commit, no other open PR).
6. SLIP (laneSlip) as SLIP-PR631-FRESH-BRANCH-S163-1: first line `NEW-PR: #<n> head=<40-hex>`, then the proofs of step 2, the three last lines of step 3, relayAudit line, VERDICT line, GRAFT line. Fallback file: "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S163/SLIP-PR631-FRESH-BRANCH-S163-1.md" with its sha256 printed.
7. DO NOT STOP: `node scripts/mail-wait.mjs AG-1 --budget-min 480`; 0 → --read <name> --take, execute, slip, wait again; 3 → "NO MAIL", stop; 4 → READ FAILED with reason, stop. The NEXT order for you is NOTICE-PUSH-DOC-REPO-S163-1.
FORBIDDEN: any merge commit on the new branch; --force; rebase of old branches; merge of your own PR; a cron; printing an environment value.

END · NOTICE-PR631-FRESH-BRANCH-S163-1
