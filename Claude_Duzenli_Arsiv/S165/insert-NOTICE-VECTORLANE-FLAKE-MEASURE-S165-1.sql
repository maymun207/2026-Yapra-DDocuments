with b as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1

LANE: AG-1 (the AG-1 window ONLY; any other window prints "NOT MINE: AG-1 notice" and stops). Thank you for PR 647 (M1B carry) — scout-2 holds its landing.
fanout: personalized (one lane, one body)
FROM: Architect, S165, 2026-09-30T07:08Z
PRECONDITION: master 763a54bc551572137276afa6cc55446e80c934cc or later contains api/cwf/_lib/vectorLane/__tests__/admission.test.ts and api/cwf/_lib/vectorLane/admission.ts.
WHY: scout-2 measured (SCOUT-STATUS-PREREVIEW-M4A-S164-1 §3, doc repo S164/) that admission.test.ts is TIMING-DEPENDENT BY CONSTRUCTION: the fake encoder sleeps on a real setTimeout (:25) and the assertions compare wall-clock Date.now() with no fake timers — :73-99 loaded p50 ≤ idle.p50 + COST×3 and max ≤ idle.max + COST×4; :123-133 slow/fast ratio > 1.8; :146-150 elapsed < 1000 ms. It passed 3×3 alone and can fail under CPU contention in a full parallel suite — a latent red that would block an unrelated landing (S55-1: nobody re-runs to chase green). This notice is MEASURE-AND-PROPOSE ONLY. The fix card is cut from your proposal and goes to the scout BEFORE any code (§12.1: new subject).
AUTHORITY: OWNER-APPROVAL-S165-PLAN-1 ("plani onayliyorum", 2026-09-30 09:35 TSİ) plan item 6 (backlog, measure first) · S61-2 (no debt left behind).
NO CRON TASK. GRAFT: graft first (graft/api/cwf/_lib/vectorLane/admission.md and __tests__/admission.test.md, graft/.graph/wiring.json), then git grep for instance calls. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. Read admission.ts and admission.test.ts at current master (quote the head sha). Answer by file:line: (a) does createAdmission accept an injectable clock/scheduler, or does it read Date.now/setTimeout/performance directly? (b) which of the five proofs (a)–(e) depend on wall-clock time, and which only on ORDER? (c) is the rate throttle (indexRatePerSec) implemented with timers the test could control?
2. REPRODUCE the flake: run the file under contention — e.g. `npx vitest run api/cwf/_lib/vectorLane/__tests__/admission.test.ts --repeat 20` WHILE a parallel full `npx vitest run` executes (or with a CPU burner). Quote pass/fail counts and the failing assertion text if any. A zero-failure result is reported as "not reproduced in N runs", never as "not flaky".
3. PROPOSE ONE design (not a menu) that makes the proofs deterministic WITHOUT weakening any of them: every numeric claim the file makes today must still be asserted, against a controlled clock (vi.useFakeTimers + advanceTimersByTimeAsync, or an injected clock if (a) allows). Name the exact files and lines it touches and whether admission.ts must change (if it must, say why the production path stays byte-identical in behaviour). Name the planted fault that proves the new test still guards ordering.
4. NO commit, NO branch, NO push. Slip SLIP-NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1 to the bus with 1–3 in full; same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S165/SLIP-NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1.md". Back to `node scripts/mail-wait.mjs AG-1 --budget-min 480`.

FORBIDDEN: editing any file; weakening or deleting an assertion in a proposal; re-running CI; cron; printing an environment value.

END · NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-1','NOTICE-VECTORLANE-FLAKE-MEASURE-S165-1', b.t from b where md5(b.t)='128e381f5a96f967344d9f6774a4a7c2' and encode(sha256(convert_to(b.t,'UTF8')),'hex')='0f30a7d2713468b2ddc1aee4202dc326af5e1ab992e1fd3b89c545f223d58009'
returning id, artifact_name, created_at, md5(body);
