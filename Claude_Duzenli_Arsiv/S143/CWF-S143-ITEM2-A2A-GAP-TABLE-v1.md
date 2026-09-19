CWF-S143-ITEM2-A2A-GAP-TABLE-v1

S143 · 2026-09-19T20:15Z · master 7572c3bbfeed23656fcf8a55f6e64d93ed240c14. Owner approved this read ("Onay",
23:04 TSİ). Read-only: no card cut, no order dispatched.

## WHAT IS ON MASTER (measured)
a2a/{agentCard,config,executor,machineAuth,responseSink,runTask,server,spendFence}.ts · Dockerfile.a2a ·
BENCH-A2A-1 (6912f062, 2026-08-14) · A2A-SDK-ADOPT-1 (3f8878d7) · BENCH-RESET-1 endpoint api/admin/bench-reset.ts ·
BENCH-BACKEND-MOUNT-1 (b0d81740) · BENCH-SMOKE-1 cost meter (0ace26bd). R5 birth proof and a container round
trip were measured live on 2026-08-14 (PHASE-BENCH-A2A-1 report).

CORRECTION OF RECORD: ARCHITECT-MEASUREMENT-S142-SOTA-CONTRACT-READ-1 said "NONE of these three … has a card".
All three are BUILT and MERGED. Class: §12.6 (the definition was read, the consumer/work was not). Also the
Architect's own S143 table B carried the same error until this read.

## THE GAPS, FROM THE LANDED RECORDS' OWN "OWED" LISTS

| G | Gap | Source | Kind | Who |
|---|---|---|---|---|
| G1 | No bench host runs the A2A server (Vercel cannot host it; long-lived process) | RECON-AGENTBEATS-1 l.91, l.245 | DECISION + spend | owner |
| G2 | Hosted harness gets 401 — its client has no header hook; a shared secret authenticates every scorer forever. On-record proposal: per-assessment issued token | SDK-ADOPT-1 MERGE l.58/155; RECON l.111-117 | DECISION, then code | owner, then AG |
| G3 | Image never published (no GHCR token; no workflow) | BENCH-A2A-1 owed | code (+ visibility decision: repo is PRIVATE by ruling) | AG; owner on visibility |
| G4 | No real ANSWER over A2A from a configured environment has been measured since the SDK merge | SDK-ADOPT-1 MERGE l.151 | measurement (spend under R4) | AG, after G1 |
| G5 | context_id continuity: each task is a fresh conversation — multi-round scenarios (τ²-bench is dual-control, multi-turn) find no memory | SDK-ADOPT-1 MERGE l.157; executor.ts:17-22 | code | AG |
| G6 | Answers Turkish to English tasks — the confound lives in the GOVERNED prompt layer | BENCH-A2A-1 owed | governed row via gated publish | AG (gated path) |
| G7 | Public pre-auth card discloses mounted backend identities | RECON l.129-142 | DECISION | owner |
| G8 | Nobody monitors the A2A host; spend fence resets on reboot | RECON l.173-180 | code | AG |
| G9 | BENCH-RESET was unarmed (persistence_class_catalog absent, 2026-08-13). TODAY the function EXISTS in the live DB (pg_proc) — whether reset now succeeds is UNMEASURED | BENCH-RESET-1 report l.26; live pg_proc | measurement | AG / Operator |

Budget standing ruling (cwf-sota-definition §9 R4): 2M tokens for the §6 harness proof, $10 per measurement
round (provisional, owner).

END · CWF-S143-ITEM2-A2A-GAP-TABLE-v1
