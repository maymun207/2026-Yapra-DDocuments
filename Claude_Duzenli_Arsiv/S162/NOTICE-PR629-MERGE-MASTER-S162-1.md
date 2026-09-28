<!-- relay-audit: v1 kind=notice -->
NOTICE-PR629-MERGE-MASTER-S162-1

LANE: AG-1 (your OWN worktree on branch phase/lane-sandbox-allowances-s161-2, PR 629)
fanout: personalized (one lane, one body)
FROM: Architect, S162, 2026-09-28T16:58Z
SUPERSEDES: NOTICE-PR629-MERGE-MASTER-S161-1 (prepared in S161, never inserted, not in the archive — this is the first inserted version and it names the NEW master).
WHY NOW: PR 628 LANDED at 2026-09-28T16:49:40Z (scout GREEN, SCOUT-STATUS-LAND-PR628-S161-2, bus 7e0ee0a5-b13c-41d8-97a0-05e5d83ead51); master is 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26. PR 629 is next in the landing order (628 → 629 → 630). The 30-minute rule (§12.8) runs from 16:49:40Z.
OVERLAP, MEASURED BY THE ARCHITECT (gh compare 629head...master, files; pulls/629/files): PR 629 touches 8 paths; master since the merge-base c58438b59cff4d1d403634b28e44af9b01db6dea touches 40. The intersection is EXACTLY ONE path: package.json. public/architecture/manifest.json is NOT touched by PR 629 — no seal conflict is expected. The package.json conflict is one hunk: master ADDED one line after "check:tenant-zero" — `"check:backend-names": "node --import tsx scripts/checkBackendNames.ts",` (PR 628) — and PR 629 REWROTE the surrounding lines from `tsx …` to `node --import tsx …`.
RULING (Architect, under OWNER-APPROVAL-S161-PLAN-1 landing chain; register 121 practice — additive package.json resolution is legal ONLY under a notice that names it, this is that notice): resolve package.json as the UNION — keep every PR-629 rewritten line AND add master's one new line `check:backend-names` in master's position (after "check:tenant-zero"). Nothing else changes in that file. No other file is touched by hand.
NO CRON TASK. GRAFT: code context from graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
`git fetch origin && git ls-remote origin refs/heads/master` read twice; master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26 or later. Tree clean (`git status --short` empty). You are on phase/lane-sandbox-allowances-s161-2 at 9002925323d770237a278065b86074ed521ec75a or later.

## ORDER
1. `git merge origin/master` → conflict expected ONLY in package.json. If public/architecture/manifest.json ALSO conflicts (not expected): `git checkout --theirs public/architecture/manifest.json` then `npm run reseal` in the same merge commit (F-S161-RESEAL-CANNOT-PARSE-CONFLICT-MARKERS-1). If ANY other path conflicts: print the list, `git merge --abort`, STOP and slip the list. Resolve package.json per the RULING (union). Prove it: `node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('package.json parses')"` and `git diff origin/master -- package.json` must show ONLY the tsx → `node --import tsx` rewrites of your branch and ZERO removed script lines; quote that diff's `-`/`+` line counts. `git add package.json` (+ manifest if resealed) · `git status --porcelain` · `git commit --no-edit`.
2. `npm run build` (five gates) and `npm run typecheck:api`; quote the last line of each. If check:doc-drift names a tab, STOP and slip it (629 changes no narrative tab; a drift here is a finding, not a repair).
3. ONE evidence-fenced line in docs/relay/LANE-SANDBOX-ALLOWANCES-S161-1-AG1-report.md under its landing section: `MERGED-MASTER: <merge sha> (master 7b54180dc68b7f4b3ca76d4cbab45d8bde5f8e26 after PR 628; package.json union: 629 rewrites + check:backend-names)`; `node scripts/relayAudit.ts` on the report; ONE commit.
4. `git push origin phase/lane-sandbox-allowances-s161-2`; print the new head (40-hex) and `git ls-remote origin refs/heads/phase/lane-sandbox-allowances-s161-2`.
5. SLIP (laneSlip — your window has the proxy-aware transport, it is this PR) as SLIP-PR629-MERGE-MASTER-S162-1: first line `NEW-HEAD: <40-hex> pr=629`, merge sha, the package.json diff counts, build/typecheck last lines, relayAudit line, GRAFT line. If the bus write is refused, write the SAME bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S162/SLIP-PR629-MERGE-MASTER-S162-1.md" and print its sha256 — the Architect reads that folder every tick.
6. DO NOT STOP (OWNER-RULING-S161-LANES-WAIT-1): run `node scripts/mail-wait.mjs AG-1 --budget-min 480`. Branch on the EXIT CODE: 0 = a new row for AG-1 → `node scripts/mail-wait.mjs AG-1 --read <artifact_name> --take`, verify its md5 line, execute it, slip, wait again; 3 = budget exhausted with zero rows → print "NO MAIL, stopping" and stop; 4 = READ FAILED → print the reason and stop; 5/6 = digest/grammar refusal → print the ids, stop. Print every exit-code line. Bounded, in-turn, not a cron.
FORBIDDEN: any hand edit beyond the package.json union (and the manifest checkout+reseal if and only if it conflicts); rebase; --force; merge of your own PR; a cron or scheduled task; printing an environment value.

END · NOTICE-PR629-MERGE-MASTER-S162-1
