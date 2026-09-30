<!-- relay-audit: v1 kind=card -->
CARD-POST-LANDING-1-S164-1

LANE: AG-4 (in mail-wait)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T04:15Z
SUBJECT: register 144 = POST-LANDING-1 of the scout loop. Under CARD-SCOUT-LOOP-RULING-AND-PR-S163-1 the scout-1 / scout-2 widening of RULED_NONCLAIMING_AUTHORS (scripts/authorityMatrix.mjs) and its pin in authorityMatrix.test.ts were MOVED OUT of PR 636, because the conformance lens reads docs/ground/authority-live.snapshot.json, which could not admit scout-1 / scout-2 until the scout-loop migration of PR 636 was applied. That migration was applied 2026-09-29T06:14Z (register v156). Now the snapshot is re-measured and the line returns in its own commit.
SEAL: EXEMPT with ack = scout-2's review row of this SAME subject (SCOUT-STATUS-REVIEW-CARD-SCOUT-LOOP-S163-1), practice 136.
```evidence:adversary
ADVERSARY: EXEMPT
ack: 3e8bf097-2186-4138-9283-0b92836cd4e9
```
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 (POST-LANDING-1) · register 144, 145.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDERS
1. `git ls-remote origin refs/heads/master` TWICE, print. Clean worktree printed. `git switch -c phase/post-landing-1-s164-1 <that master>`.
2. With graft, find the PRODUCER of docs/ground/authority-live.snapshot.json (the script/npm target that writes it) and quote its line. Run it with your lane transport. If it needs a credential or role your window does not hold → STOP and slip the exact refusal (§12.2); do not hand-edit the snapshot.
3. Print the re-measured snapshot diff; scout-1 and scout-2 must appear where the lens reads them (the old :15 line). If they do NOT appear → STOP and slip the bytes (the migration's live effect is then the finding).
4. Restore the widening: RULED_NONCLAIMING_AUTHORS gains 'scout-1', 'scout-2' (scripts/authorityMatrix.mjs) and its pin in authorityMatrix.test.ts — the exact lines PR 636's pre-ruling commit a4d21a7a8a9f0411c1380b708d1cb02fdc702aeb carried (quote them from `git show` of that commit). No assertion weakened.
5. GATES: `npm run build` (reseal if drift) · `npm run typecheck:api` · check:rule24 · check:tenant-zero · check:backend-names · relayAudit over docs/relay/ · authorityMatrix.test.ts + mailWaitBoxLens.test.ts. Quote each line. Report docs/relay/POST-LANDING-1-S164-1-AG4-report.md (no bare 7–39 hex in prose).
6. ONE commit, parent = step-1 master. Push; `git ls-remote` it. DO NOT open a PR — the slot is M2's, then K41's. Slip SLIP-CARD-POST-LANDING-1-S164-1 (bus + fallback S164/): branch, 40-hex head, parent, gate lines, snapshot diff summary.
7. Back to `node scripts/mail-wait.mjs AG-4 --budget-min 480`.

FORBIDDEN: editing the snapshot by hand; applying a migration; weakening an assertion; opening a PR; --force; cron; printing an environment value.

END · CARD-POST-LANDING-1-S164-1
