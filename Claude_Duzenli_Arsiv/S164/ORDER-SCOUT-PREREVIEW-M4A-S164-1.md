<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-PREREVIEW-M4A-S164-1

LANE: scout-2 (after ORDER-SCOUT-LAND-PR645-BACKUP-S164-2: PR 645 MERGED 2026-09-30T06:17:13Z, master 61e7f368604ffdd86b8841d9063e540641d42efc, adversary status posted 06:16:59Z — reply to the backup order as LANDED-BY-OTHER with that sha and nothing else. Your SD review became SD1 v2 → AG-1 and SD2 v2 → AG-4, deltas applied by number; thank you.)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T06:21Z
PURPOSE: M4a is written and pushed but queued behind POST-LANDING-1 → M1B → M3. When its PR opens, the landing scout must not start from zero. Adversary-read the BRANCH now so the landing is a CI read, not a review.
TARGET: phase/m4a-memory-offered-overlap-s164-2 = b6e347be1aba2f300bee3748dd3ac836aef82fd1 (parent c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f), AG-4's SLIP-CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1 (doc repo S164/), card CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v2 (your own Δ1–Δ6).
AUTHORITY: §12.8 · §13.11 · OWNER-RULING-S164-A26-V12-1.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable. Read-only: status row only (long verdict → doc repo S164/ + bus slip with sha256, register 109).

## STEPS
1. `git fetch origin phase/m4a-memory-offered-overlap-s164-2`; print head and parent. `git merge-tree --write-tree 61e7f368604ffdd86b8841d9063e540641d42efc b6e347be1aba2f300bee3748dd3ac836aef82fd1` → CLEAN / CONFLICT + paths; reseal needed y/n.
2. Your own deltas, each GREEN/RED with file:line: Δ1 migration health_memory_daily (union denominator, security definer, the all-grantee revoke, service_role EXECUTE; OPERATOR-PENDING named) · Δ2 memoryOffered on clarification_asked · Δ3 SSE done frame carries no ids (M4A-7) · Δ5 fence · Δ6 no threshold. Plus: the word "used" absent from code/UI/docs of the diff; unavailable never 0 (M4A-4 + the planted fault).
3. The one test AG-4 reported flaky outside its touch set (vectorLane/admission.test.ts latency comparison): run it 3× at the branch head, print each result; say whether it is order/timing-dependent. Do not re-run CI.
4. scripts/verifyGrants.ts: does it need health_memory_daily listed for the anon-denial check (AG-4's "For the Operator" item 2)? file:line; y/n; which card carries it.
5. Status SCOUT-STATUS-PREREVIEW-M4A-S164-1: GREEN / RED + numbered deltas; the Operator prompt text for the migration (dry-run first, project fence fjbrkimwvtpwoxhziidh) ready to paste. UNMEASURED where not read. Back to `node scripts/mail-wait.mjs scout-2 --budget-min 480`.
FORBIDDEN: no edit, push, merge, PR, re-run of CI, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-PREREVIEW-M4A-S164-1
