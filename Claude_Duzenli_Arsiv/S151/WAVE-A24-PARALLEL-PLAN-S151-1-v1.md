# WAVE-A24-PARALLEL-PLAN-S151-1-v1

S151 · 2026-09-21 · written after OWNER-APPROVAL-S151-PARALLEL-1 ("paralel onay", 22:22 TSI).
Owner design contributions, by name (S112-YASA-1): (1) use the idle addresses AG-1 and AG-2 instead of
minting AG-5/AG-6; (2) the earlier four-lane run ended with lanes colliding, unmerged PRs and branches
everywhere, and the Architect as the bottleneck; this plan must prevent that mechanically, not by promise.
Goal: all of A24 v1_3 (P1-P5, every K item) implemented on master by Wednesday 2026-09-23 evening TSI
(OWNER scope rule S151: no functionality removed).

## 1 · MEASURED STARTING STATE (bridge + Supabase MCP, 2026-09-21T19:20Z-19:25Z)

- factory_state: AG-1 WORKING (nonce 92a307b2…, heartbeat 2026-09-10) · AG-2 WORKING (nonce 9b568100…,
  heartbeat 2026-09-10) · AG-3 WORKING (heartbeat 2026-09-10) · AG-4 WORKING (heartbeat 2026-09-21T19:00Z, live)
  · AG-5 CLAIMED (heartbeat 2026-09-18) · scout, operator CLOSED (fossil rows).
- Lane refs (owner clone, lane-refreshed tracking refs): lane/AG-1 92a307b2 (2026-08-27) · lane/AG-2 9b568100
  (2026-08-27) · lane/AG-3 8641beb1 (2026-08-27) · lane/AG-4 0506b8c0 · lane/AG-5 ee4ffe01.
- Reading: AG-1 and AG-2 are IDLE (no output since 2026-08-27, heartbeat dark since 2026-09-10) but NOT FREE
  by protocol: a non-CLOSED row plus a present ref reads byte-identical to a healthy lane, so a fresh window
  cannot claim them by the plain-push walk. The same was true of AG-5/AG-6 (AG-6 has no row at all), so the
  owner is right: minting new addresses adds no freedom and adds a third fossil later.
- Straggler baseline: 20 remote branches not merged into origin/master (lane/AG-1..5, phase/a24-p1a…,
  go-landing-s125-1, land-equipment-dedupe-s135-1, nightly-compat-red-1, ref-sweep-remeasure-1,
  s118-final-closing-1-ag1-decayed, s118-lane-sweep-2-ag5-report, s119-landing-order-1..4,
  s125-foreman-boot-1-ag5-report, s129-foreman-boot-1, sync-and-measure-s138-1, scout/s135-open-measure-2);
  37 local branches not merged into local master; 11 prunable worktrees. This is the debris of the
  earlier multi-lane era, and it is the number this wave must not grow.

## 2 · WHY THE LAST MULTI-LANE RUN COLLAPSED (archive, named)

1. Landing was a lane's job (foreman + scripts/land.ts). When the foreman went deaf, PRs sat.
   Today landing is GitHub's (master-merge-gate ruleset + auto-merge.yml): no window merges.
2. Lanes shared one worktree (F-S146-SHARED-CLONE-RACE-1). Today every card orders its own worktree.
3. Pollers with budgets went deaf and cards fell into unread boxes. Today: no pollers, one card per window
   session, the owner pastes the boot, the Architect reads the bus on a timer.
4. Address claims deadlocked (F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1) and were hand-written.
5. Two lanes edited the same files; a conflict is a STOP by rule, so both stalled.
6. The Architect was the bottleneck: per-item approvals, and cards carrying defects that each needed a
   ruling (tonight: three rulings for one PR, because the card did not pre-pay the learnBrake tail pins,
   the doc-drift tabs and stagesRegistry.ts).

Items 1-4 are already cured by landed mechanisms. Items 5 and 6 are what this plan cures.

## 3 · THE MECHANISM

M1 · THREE LANES, DISJOINT FILE FENCES FOR THE WHOLE WAVE. Each lane owns a set of paths; no card for
lane X may list a path owned by lane Y. The Architect refuses its own card before insert if it does.
  - AG-4 · executor + grounding: api/cwf/_lib/grounding/**, toolResult.ts, resultStore.ts, the new
    inline-aggregates module, turn/planner.ts, turn/stageStream.ts, the A3 output contract (K28), the
    production calendar (K29). Phases: P1-A, P1-B, P3 planner/A3/calendar.
  - AG-1 · routing: api/cwf/_lib/routing/**, toolCategories.ts, the exam module (new), the trace schema
    fields (K24), the K17 entry tool. Phases: P1-C, P4 flip and removal.
  - AG-2 · retrieval + learning: the vector lane, BM25-TR + RRF (item 5, K15), the reranker ablation (K16),
    the outcome ledger and learning loop (K12, K23). Phases: P2, P5.
M2 · HOTSPOT FILES ARE PRE-PAID ONCE, FIRST. Every param-adding card collides at the tail of
agentParams.ts and learnBrake.test.ts; every PR reseals the manifest. So the first card of the wave
(AG-4, right after P1-A lands) declares EVERY governed param the wave needs, each at its safe floor
(off / measure), with their learnBrake pins, in one PR. After it lands no other card touches those two
files. Doc-drift is pre-paid in every card's fence: the six diagram paths, stagesRegistry.ts and the
manifest are named in every card's SHARED SURFACES from the start, with "merge origin/master, then
npm run reseal" as the ordered remedy. No ruling is needed for either again.
M3 · WIP = 1 PER LANE. A lane has at most one open PR. Its next card is inserted only after the previous
PR is merged. At most three open PRs exist at any time.
M4 · ZERO NEW STRAGGLERS, MEASURED. The wave is closed only when every phase/* branch it created is
merged by content and deleted (RULE-49), measured against the baseline in section 1. The 20 old
stragglers go to item 32 (worktree/branch hygiene) as its own card, not mixed into A24 work.
M5 · THE ARCHITECT STOPS BEING THE BOTTLENECK BY WORKING AHEAD. Each lane's cards are cut and sent to the
scout as a QUEUE (two to three ahead), so a lane's next card is already sealed on the bus when its
PR lands. Card template carries M2's pre-paid surfaces, so a lane stops only on a real finding.
M6 · ADDRESSES AG-1 AND AG-2 BY OWNER-CONFIRMED TAKEOVER. The owner witnesses that no window holds AG-1 or
AG-2 (the human-eye lens; OWNER-RULING-S133-COLD-RESTART-1 precedent). The boot text then carries that
confirmation, and the lane reclaims its own address with scripts/factoryState.mjs and a fresh nonce,
as AG-4 does on FW001. No hand-write of factory_state by the Architect.

## 4 · ORDER

Tonight: P1-A lands (PR #590) → PARAMS card (AG-4) → P1-B (AG-4). In parallel: P1-C card (AG-1) and
P2 card (AG-2) cut and sent to the scout tonight; AG-1 and AG-2 booted as soon as each card is GREEN.
Tuesday: P1 closed; P2 shadow running; P3 cards (AG-4) and P4 prep (AG-1).
Wednesday: P3, P4, P5 code on master behind their flags.
Time-bound exit proofs (SOTA-1 (a)(b)(c)): (a) P2 "N days shadow" and P4 "one week without DEGRADED";
(b) provable N days after the shadow starts, and on 2026-09-30; (c) the shadow rows and the DEGRADED
counter the landed code writes.
The Architect re-measures this schedule against real landings after P1-B and says the new date if it moved.

END · WAVE-A24-PARALLEL-PLAN-S151-1-v1
