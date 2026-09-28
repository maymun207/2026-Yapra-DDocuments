<!-- relay-audit: v1 kind=notice -->
NOTICE-PR628-MERGE-MASTER-S161-1

LANE: AG-2 (your existing window or a fresh one; /clear first; your OWN worktree on branch phase/e1c-backend-name-gate-s161-2)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T04:32Z
OWNER APPROVAL: OWNER-APPROVAL-S161-PLAN-1 ("onay S161 planı", 2026-09-28 02:37 TSI), plan step P5 (row 113 / E1-c); the landing is auto-merge on adversary/scout success — no master push by hand, no new spend.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your slip is written, stop.
GRAFT: code context from graft first; your slip carries a GRAFT line.
SECURITY: never print, echo, printenv or cat any environment variable.
WHAT: bring master into your branch after PR 627 lands, so the merge guard's COLLISION with PR 627 clears and CI runs past step 6. Scout-1 already reviewed your content at head c32f821bd9a3c90265cce964c86923f9bf3fa557: ADVERSARY-VERDICT GREEN-CONTENT (SCOUT-STATUS-LAND-PR628-S161-1, bus row 47906597-3b3b-43ba-982e-7440a761cf02, 04:27Z), not posted because the guard was red on the collision. Nothing in your code changes.

## PRECONDITION (read first, no waiting)
`git fetch origin && git ls-remote origin refs/heads/master` — read twice, print both.
- master must NOT be c58438b59cff4d1d403634b28e44af9b01db6dea, AND `git merge-base --is-ancestor 76e8037fdd58405080a2d7c2098d7ffc36e5c6bf origin/master` must exit 0 (PR 627's landed head is in master). If either fails: print `PRECONDITION NOT MET at <date -u>: master <sha>, 627 not landed`, and STOP. The owner re-runs this notice later; you do not loop.

## ORDER
1. On your branch, clean tree (`git status --short` empty): `git merge origin/master` — never a rebase, never --force, not one byte of any file edited by hand. A CONFLICT means the other lane's content is in play: print the conflicting paths and STOP (report it; do not resolve).
2. If the merge touched a sealed file, `npm run reseal` in the SAME commit (the merge commit is amended only by the reseal, nothing else); print the re-derived digests.
3. `npm run build` (five gates) and `npm run typecheck:api`; quote the last line of each. Do NOT re-run CI, do NOT dispatch.
4. Append ONE line to docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md under its landing section, inside an evidence fence: `MERGED-MASTER: <merge sha> (master <sha> after PR 627)`; run `node scripts/relayAudit.ts` on the report; if it refuses, fix the report only. ONE commit for this line.
5. `git push origin phase/e1c-backend-name-gate-s161-2` — one push carrying the merge commit and the report commit; print the new head (40-hex) and `git ls-remote origin refs/heads/phase/e1c-backend-name-gate-s161-2`.
6. The push makes its own CI run; scout-1 (ORDER-SCOUT-LAND-PR628-S161-1-v2, to follow) posts adversary/scout on the new head; auto-merge lands it.
SLIP with laneSlip as SLIP-PR628-MERGE-MASTER-S161-1: first line `NEW-HEAD: <40-hex> pr=628`, then the merge sha, master sha, build/typecheck last lines, relayAudit line, GRAFT line. If the bus write is refused, write the slip to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SLIP-PR628-MERGE-MASTER-S161-1.md", print its sha256 and the exact error line, stop.
FORBIDDEN: any hand edit to a file during the merge; rebase; --force; merge of your own PR; poll task; cron; printing an environment value.

END · NOTICE-PR628-MERGE-MASTER-S161-1
