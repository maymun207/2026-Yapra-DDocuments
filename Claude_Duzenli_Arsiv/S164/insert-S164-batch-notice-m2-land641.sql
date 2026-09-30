with b0 as (select $b$<!-- relay-audit: v1 kind=notice -->
NOTICE-M2-CARRY-TEST-S164-1

LANE: AG-3 (working on CARD-M2-HONEST-GRADING-S164-1-v2)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:50Z
AUTHORITY: CARD-M2-HONEST-GRADING-S164-1-v2 (this notice ADDS one test and one report line; it changes no design) · scout-2 SCOUT-STATUS-REVIEW-A26-V11-S164-1 Δ-K9 (bus row 327f577b-a13d-4305-9d75-bc1cf4d5001c).
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.
WHY: scout-2 measured at master 1b2553c960317ab0cc0718e51dda8b7bc92bc112 that the stage-03 "answer a shown question" path — stageClarify.ts:677-704 readCarriedResolution → `repo.listRecentByConversation(conversationId, 1, taskId)` → `matchShownOptionDetailed(message, row.decision?.ask ?? null)`, reached at :2798 (frameRouting-gated) — reads through the SAME `.or(OFFERABLE_OUTCOME_FILTER)` as recall (EpisodesRepository.ts:550). So your D2 filter change also decides whether a user's reply to a shown ask can be resolved by its option. An ask turn that ran discovery calls is tool-bearing; if its outcome is not `outcomeHonest` (e.g. grounding did not run: groundingOk null), under D2 it stops carrying.

## STEPS
1. Measure first, before changing anything: on your branch, for an ask turn with discovery calls (fixture), print the class and `offerable` your D2 computes, and whether readCarriedResolution still returns the option. Quote the lines.
2. ADD test F7 (named): "an ask turn with discovery calls still carries its shown option to the next turn under M2's filter" — green required. If it cannot be green without widening D2, STOP and slip the measured bytes (class, signals, offerable) — the Architect rules; do NOT invent a second filter.
3. Report line: "stage-03 carried-ask read shares OFFERABLE_OUTCOME_FILTER (EpisodesRepository.ts:550); F7 result: <line>".
4. Continue the card as written (fence gains nothing if F7 passes; if it needs a test-only fixture file, it joins the fence and is named).

END · NOTICE-M2-CARRY-TEST-S164-1
$b$ as t),
b1 as (select $b$<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR641-S164-1

LANE: scout-1 (the scout-1 window ONLY; scout-2 prints "NOT MINE: scout-1 order" and stops)
fanout: personalized (one lane, one body)
FROM: Architect, S164, 2026-09-30T03:52Z
WHY: M1 (register 140, Track 1) is on PR 641, branch phase/m1-mcp-iserror-passthrough-s164-1, head dbfd228a983c19c5064b9ee01b61ece9ff0f8695, ONE commit whose parent is master 1b2553c960317ab0cc0718e51dda8b7bc92bc112 (AG-1, CARD-M1-MCP-ISERROR-PASSTHROUGH-S164-1-v2). The card is scout-2-reviewed (SCOUT-STATUS-REVIEW-CARD-M1-S164-1, RED, thirteen deltas Δ1–Δ13 all applied in v2). Architect's read at 2026-09-30T03:5xZ by full head: Auto-merge landing · report-schema · Relay corpus · Build and Test — all completed success (four runs). The PR is non-draft and blocked only on adversary/scout.
AUTHORITY: OWNER-APPROVAL-S164-PLAN-1 item 2 · OWNER-APPROVAL-S163-MEMORY-PLAN-1 · §12.8 · §13.11.
NO CRON TASK. GRAFT: graft first. SECURITY: never print, echo, printenv or cat any environment variable.

## ORDER
1. `gh pr list --state open --json number,headRefName,headRefOid` → EXACTLY ONE open PR: 641, phase/m1-mcp-iserror-passthrough-s164-1, dbfd228a983c19c5064b9ee01b61ece9ff0f8695. Master read twice by ls-remote = 1b2553c960317ab0cc0718e51dda8b7bc92bc112.
2. SHAPE: one commit, parent = master; `git diff --stat 1b2553c960317ab0cc0718e51dda8b7bc92bc112 dbfd228a983c19c5064b9ee01b61ece9ff0f8695` printed.
3. CONTENT vs the card v2 (read it in S164/ and scout-2's M1 review): (a) ONE execute function returning `{ text, isError }` — no sibling; `result.isError === true` spelled as the card says; (b) the four not-sent arms stay TEXT, no manufactured isError for a not-sent call; (c) repair path still text-gated; (d) `modelFacingRefusal` carries `toolMessage` ONLY for reason tool-reported, recognised rejection sentences unchanged (D3); (e) the attempt span `{ok, isError, ms, resultBytes}` with the ok/isError comment; (f) all 25 mock files use okOutcome/errOutcome — the two zero-hit greps of D4 re-run and printed; (g) toolResultClassWiring's transport case now tool-reported AND the okOutcome sibling still reads transport; (h) F1–F6 tests exist and pass locally — re-run them; (i) NOT touched: toolOutcomes.ts, examScorers.ts, fixtureMcpServer.ts, entityDiscoverySync.ts, gatewayEnumerate.ts; (j) no backend/tool/sentence literal in non-test source (F5 diff).
4. CI at dbfd228a983c19c5064b9ee01b61ece9ff0f8695, zero read twice: name EVERY Build and Test step's conclusion (incl. Tenant-zero, Backend-name gate, rule26); eval-canary skipped by design (name it); `[merge-guard] VERDICT` quoted and GREEN; no FORCE-PUSH on the 641 timeline.
5. Clean → post adversary/scout success on dbfd228a983c19c5064b9ee01b61ece9ff0f8695; NAMED wait for the landing (master every 60 s, ≤ 10); print the merge sha; then the Vercel production deployment at the merge sha — read its STATE and DESCRIPTION (a success whose description says cancelled is not a deploy).
6. scout_reply (p_from 'scout-1') as SCOUT-STATUS-LAND-PR641-S164-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=641 head=dbfd228a983c19c5064b9ee01b61ece9ff0f8695 · LANDED merge=<40-hex>` (or NOT-LANDED + the one reason with the failing STEP and the skipped steps). Same bytes to "2026 - Yapra - DDocuments/Claude_Duzenli_Arsiv/S164/SCOUT-STATUS-LAND-PR641-S164-1.md". Back to `node scripts/mail-wait.mjs scout-1 --budget-min 480`.
FORBIDDEN: no edit, push, merge, re-run, dispatch, cron, migration apply; never print an environment value.

END · ORDER-SCOUT-LAND-PR641-S164-1
$b$ as t)
insert into public.relay_inbox (direction, lane_addr, artifact_name, body)
select 'to_lane','AG-3','NOTICE-M2-CARRY-TEST-S164-1', b0.t from b0 where md5(b0.t)='d99027f007482aff208a3c0b38d90e6d' and encode(sha256(convert_to(b0.t,'UTF8')),'hex')='dac7ef2b7b0442fb929fd79a868e9cb06d67d2575d0a5322d849bc957819b880'
union all
select 'to_lane','scout-1','ORDER-SCOUT-LAND-PR641-S164-1', b1.t from b1 where md5(b1.t)='d25ea77fc5590b56a2a75961659db99c' and encode(sha256(convert_to(b1.t,'UTF8')),'hex')='8c4cf17172d1413a67b00ae91a951afda9ac9aeec124a7ad4267a922540a9402'
returning id, artifact_name, created_at;
