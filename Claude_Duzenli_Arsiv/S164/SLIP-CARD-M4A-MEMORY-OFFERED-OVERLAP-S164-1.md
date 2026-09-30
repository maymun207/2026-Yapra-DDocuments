SLIP-CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1

card: CARD-M4A-MEMORY-OFFERED-OVERLAP-S164-1-v2 (+ NOTICE-M4A-BASE-M2-LANDED-S164-7)
branch: phase/m4a-memory-offered-overlap-s164-2
head: b6e347be1aba2f300bee3748dd3ac836aef82fd1
parent: c2a9eab76cf5eb538d49e4b11fe4b0f810339c1f (master, M2 landed as PR 644; ls-remote read twice before the re-pick and once before the push)
report: docs/relay/M4A-MEMORY-OFFERED-OVERLAP-S164-1-AG4-report.md
ci: UNMEASURED no PR by order; check-runs by the full head sha total_count=0
status: PUSHED
pr: NONE (queue: K41 → POST-LANDING-1 → M1B → M3 → M4a)

## Receipt
- The card, taken with --read --take: DIGEST-OK, SEAL admitted (ack 23ae74c7-03ab-42bc-985b-3ad7e3005dd8), [STAMPED]. The card grammar refused it (CP-1, 2, 3, 4, 8, 9, 10) under CARD_GATE=REPORT: REPORTED, not acted on.
- The notice, taken the same way: DIGEST-OK, [STAMPED].
- The scout map's sha256 equals the card's (2a4a40ba…cb29e).

## Base and re-pick
- Built first as a PREP on M2's head 37faf47a7fcec16e299050af0d83365a162ab3a4. That commit is 3faf7ea52c23739ae764e29edee1790d7b7bedce on phase/m4a-memory-offered-overlap-s164-1, pushed, and now LEFT UNTOUCHED (moving it would need a force push).
- The notice arrived at 05:28Z, while I was building; I read it at 05:36Z, before the slip. As ruled, I re-picked with `cherry-pick -n` onto c2a9eab7 on a FRESH branch, -s164-2 (the TOUR-HONESTY -1 → -2 precedent).
- `git diff --stat 37faf47a c2a9eab7` is EMPTY, so M2 landed tree-identical. The re-picked tree equals the prep tree (`git diff --cached --stat 3faf7ea5` is empty). The build on the new parent was green with no drift and facts unchanged. Only the report's base lines were edited for the re-pick.
- The Architect decides the fate of the -s164-1 branch. I did not delete it.

## Built (D1–D5, Δ1–Δ6)
- D1: memoryOffered gains ids (offered order) and blocks at memoryRetrieve.ts's one stamp site. The never-serialized memoryOfferedEvidence (per-row entity ids and tool names) is stamped from the same offer.
- D2/Δ2: turn_done AND clarification_asked carry memoryOffered {count, ids, blocks, unavailable} and memoryOverlap. The chatQuotaStream key pin is updated BY NAME, with closed-set shape pins.
- D3: a pure memoryOverlap.ts with three lenses: entity (resolved ids or an argument string), tool (outer name, the distiller's basis), and routine (plan.source==='routine' and the first step matched via procedureStepName, so gateway routines match). Overlap is unknown (memory-unavailable / entity-resolutions-absent / no-answer), never 0.
- Δ3: the SSE done frame projects to the exact pre-card shape; no episode id reaches the browser. cwfService and cwfStore are unchanged.
- Δ1: the migration 20260930050000_health_memory_daily.sql uses the union denominator, security definer, the all-grantee revoke and service_role EXECUTE. It is OPERATOR-PENDING, NOT applied. HealthAnalyticsRepository.memorySeries is added.
- D4: `GET /health-analytics?band=memory` is its own arm behind the same gate; the full Health response is unchanged. A no-data day has null figures, never 0. The Memory tab shows a per-day table labelled "overlap (not causation)" on its own load path, so a 503 means "could not read" and the browser still works.
- Δ6: no threshold; minN is shown as "thin evidence", never as a colour. D5: chip, prompt, recall and learn doors untouched.

## Tests
M4A-1 through M4A-7 all green (M4A-3 split into 3a and 3b as ordered). Planted fault: unavailable stamped as a measured 0 → M4A-4 red; reverted. The touched suites (7 files) pass 143/143.

## Gates
- build: the first run needed a reseal of 6 tabs (31b94a6d0d07 / 70d3e5cc7d28 / 5e3c9f59f2ef / cc9d69f3eabd / 198181b76840 / 23f4523aabd2, each = the gate's got), and facts.json was regenerated for the new module. After that: `[check:ground] GREEN`, `[check:doc-drift] [OK] no drift`, on both parents.
- typecheck:api exit 0; rule24 OK (2395); migration-versions OK (101); tenant-zero OK (2350); backend-names exact match; relay corpus 37/37; report:check OK; the report's own relay audit has zero violations.
- The forbidden word appears 0 times in the diff, the new files and the report (positive control: 72 added lines mention overlap).
- Full suite in the sandbox: 11640 passed, 17 failed.
  - 16 are listen EPERM in 5 files; outside the sandbox those files pass 123/123.
  - 1 is vectorLane/admission.test.ts, a latency comparison (32 ≤ 22 failed) in a module this branch does not touch. It passed 14/14 run alone. Reported, not folded into the green, not retried until green.

## Fence, named
- Added beyond the proposed fence: memorySliceWiring.test.ts (the strict memoryOffered pin; home of M4A-1/2), stageClarify.test.ts (the clarification pin Δ5 allows), healthAnalyticsContract.test.ts (the mirror pin), and docs/ground/facts.json (regenerated).
- Listed by Δ5 but NOT touched, because the full Health response keeps its shape: healthTab, healthCoverage, healthBackendReason, obsHostBandRow, persistenceClassBand, AdminPreview.tsx, HealthTab.tsx; and cwfService/cwfStore (Δ3).
- e2e: memory-1c-evidence.spec.ts asserts the three existing memory-health test ids, all unchanged. It does not route ?band=memory, so the new block renders "could not read" there.

## For the Operator
1. Apply 20260930050000_health_memory_daily.sql.
2. scripts/verifyGrants.ts does not yet list health_memory_daily. That file is outside this card's fence; add it when the migration is applied, so the anon denial is verified.

## Named
- Each full run rewrote the measuredAt line of authority-conformance.latest.md (a side effect). It was restored each time and is not in the commit.
- A read of a ~/.claude path was refused by guard-secrets GS-4; I did not route around it and used a scratchpad copy of the diff instead.
- No cron task. No environment value printed.

read relay_inbox at 2026-09-30T05:39:16Z, box empty
