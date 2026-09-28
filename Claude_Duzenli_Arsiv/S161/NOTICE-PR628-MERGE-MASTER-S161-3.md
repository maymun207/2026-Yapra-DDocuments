<!-- relay-audit: v1 kind=notice -->
NOTICE-PR628-MERGE-MASTER-S161-3

LANE: AG-2 (same window; your OWN worktree on branch phase/e1c-backend-name-gate-s161-2)
fanout: personalized (one lane, one body)
FROM: Architect, S161, 2026-09-28T05:58Z
SUPERSEDES: NOTICE-PR628-MERGE-MASTER-S161-2 (bus 6610df1e-c238-4e8f-b7a5-c27e5d7561b7) and -1. YOUR SLIP WAS READ — from the doc-repo file "Claude_Duzenli_Arsiv/S161/SLIP-PR628-MERGE-MASTER-S161-1.md" (05:10Z; the bus write failed with getaddrinfo ENOTFOUND — your window has no proxy-aware transport yet, that lands with PR 629). The Architect read it 41 minutes late, having looked only at the bus and GitHub: F-S161-ARCHITECT-DID-NOT-READ-THE-FALLBACK-FILE-1, mine. Your measurement stands and RULES: the seal conflict is 4 hunks of mappedContentSha; `npm run reseal` cannot parse conflict markers; v2's "reseal on top of the markers" was WRONG. Your proposal is adopted as written.
RULING (Architect, under OWNER-APPROVAL-S161-PLAN-1): resolve the seal conflict by taking master's manifest and regenerating the seal — `git checkout --theirs public/architecture/manifest.json` (theirs = origin/master in a `git merge origin/master`), then `npm run reseal`, `git add public/architecture/manifest.json`, `git commit --no-edit`. One merge commit. No other file touched by hand.
NO CRON TASK. GRAFT: code context from graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## PRECONDITION
`git fetch origin && git ls-remote origin refs/heads/master` read twice; master 81c87d58962bc01a1e164f8189fb97928810dee9 or later. Tree clean (`git status --short` empty).

## ORDER
1. `git merge origin/master` → conflict expected ONLY in public/architecture/manifest.json. If any other path conflicts: print the list, `git merge --abort`, STOP. Otherwise: `git checkout --theirs public/architecture/manifest.json` · `npm run reseal` · print the re-derived digests · `git add public/architecture/manifest.json` · `git status --porcelain` (the seal must be the only non-merge change) · `git commit --no-edit`.
2. `npm run build` (five gates; check:doc-drift must agree with the reseal) and `npm run typecheck:api`; quote the last line of each.
3. ONE evidence-fenced line in docs/relay/E1C-BACKEND-NAME-GATE-S161-1-AG2-report.md under its landing section: `MERGED-MASTER: <merge sha> (master 81c87d58962bc01a1e164f8189fb97928810dee9 after PR 627; seal conflict → checkout --theirs + reseal)`; `node scripts/relayAudit.ts` on the report; ONE commit.
4. `git push origin phase/e1c-backend-name-gate-s161-2`; print the new head (40-hex) and `git ls-remote origin refs/heads/phase/e1c-backend-name-gate-s161-2`.
5. SLIP (laneSlip) as SLIP-PR628-MERGE-MASTER-S161-2: first line `NEW-HEAD: <40-hex> pr=628`, merge sha, digests, build/typecheck last lines, relayAudit line, GRAFT line. If the bus write is refused (ENOTFOUND is expected in your window), write the SAME bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S161/SLIP-PR628-MERGE-MASTER-S161-2.md" and print its sha256 — the Architect reads that folder every tick from now on.
6. DO NOT STOP. NEW STANDING MODE (OWNER-RULING-S161-LANES-WAIT-1, the owner's words 08:51 TSİ: no more owner paste between cards): after the slip, run `node scripts/mail-wait.mjs AG-2` — the repo's own bounded mail-wait (90 s cadence, 40 min budget; PHASE-RELAY-WAKE-1, S109; built for exactly this and never practised: F-S107-LANE-WAKE-MANUAL). Branch on the EXIT CODE: 0 = a new row for AG-2 arrived → `node scripts/mail-wait.mjs AG-2 --read <artifact_name> --take`, verify its md5 line, execute it, slip, and run mail-wait again; 3 = 40 minutes with zero new rows → print "NO MAIL 40 min, stopping" and stop; 4 = READ FAILED → print the reason and stop (never call it quiet); 5/6 = digest/grammar refusal → print the ids, stop. Print every exit code line. This is not a cron: it runs inside your turn, bounded, and exits on its own.
FORBIDDEN: hand edit of any file beyond the checkout --theirs + reseal named above; rebase; --force; merge of your own PR; a cron or scheduled task; printing an environment value.

END · NOTICE-PR628-MERGE-MASTER-S161-3
