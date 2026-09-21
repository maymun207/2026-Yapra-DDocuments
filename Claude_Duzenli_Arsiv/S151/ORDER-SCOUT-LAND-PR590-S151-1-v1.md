<!-- relay-audit: v1 kind=notice -->
ORDER-SCOUT-LAND-PR590-S151-1-v1

LANE: scout (scout-1 window)
fanout: personalized (one lane, one body)
FROM: Architect, S151, bus clock about 2026-09-21T19:50Z
OWNER APPROVAL: OWNER-APPROVAL-S151-P1A-BLOCK-RULING-1 ("1-) onay", 21:52 TSI): landing P1-A on PR #590, scout adversary on the PR head, auto-merge on green.
NO POLL OR CRON TASK. Bekleme dongusu yok. When your status is written, stop.
GATE-NOTE: written with a STEPS section.
GRAFT: take code context from graft first (graft ask --source, graft grep, graft callers); raw grep only for what graft does not index. Your status carries a GRAFT line listing the graft commands you ran (owner rule, S151 22:47 TSI).
WHAT: adversary review of the P1-A code on PR #590 (CARD-A24-P1A-NUMERIC-GUARD-S150-1-v3, as widened by RULING-A24-P1A-ORDER4-S151-1, RULING-A24-P1A-DOCDRIFT-S151-2 and RULING-A24-P1A-STAGECARDS-S151-3), then the adversary/scout status on the head that will land.

## PREMISE
MEASURED: 2026-09-21T19:40Z, owner clone tracking refs: origin/phase/a24-p1a-numeric-guard-s150-1 = 4875e202710188fd47bf3571bceeb1066a684319; origin/master = 9cb7fefc947745bec1fdd97aff62d58c34c47919 (lane-refreshed, not ls-remote).
MEASURED: 2026-09-21T19:10Z, AG-4's SLIP-A24-P1A-ORDER4-S151-1: at 4875e202 the only red gate was check:doc-drift (six tabs); suite green locally.
UNMEASURED: whether AG-4 has pushed the ruling-3 commit (six diagrams, stagesRegistry.ts description text, manifest reseal) when you start. Your ls-remote measures it.
SELF-INVALIDATION: dies if PR #590 is closed or its branch is replaced.

## STEPS
1. Print `git ls-remote origin refs/heads/master` and `git ls-remote origin refs/heads/phase/a24-p1a-numeric-guard-s150-1` (full 40-hex both).
2. REVIEW THE CODE NOW at 4875e202710188fd47bf3571bceeb1066a684319 (the code does not change in ruling 3): the diff against master in every non-doc file. Hostile questions: (a) is anything ledgered from rawForClient (card FORBIDDEN)? (b) do `ok`, `violations`, `vocabSource` stay byte-identical, and does the mutation test really pin it? (c) does the stamp reach both hops and never re-enter the grounding check? (d) is grounding.numericMode floored at 'measure' with unknown values resolving loud, and is the learnBrake shift exactly one per pin plus one new pin? (e) any backend or tenant name in new code or fixtures? (f) anything that would break production with the param at its floor?
3. IF the branch head is no longer 4875e202…: diff 4875e202…..<new head> and confirm it touches ONLY public/architecture/diagrams/*, the description text in src/components/admin/stagesRegistry.ts, public/architecture/manifest.json and the AG-4 report. Anything else is RED.
4. Read CI at the CURRENT head by the full 40-hex sha (actions runs by head_sha; read a zero TWICE). Name each run and its conclusion; a SKIPPED job is named, never folded into green.
5. If steps 2-4 are clean AND every required CI context is green at the current head: post the adversary/scout status on that head. If CI is still running: post nothing, write your status with the review verdict and the CI state, and stop; the Architect re-orders the post.
REPLY (on the bus): SCOUT-STATUS-LAND-PR590-S151-1, first line `ADVERSARY-VERDICT: GREEN|RED pr=590 head=<40-hex>`, then the findings, the CI runs by name, whether the status was posted, and the GRAFT line.
FORBIDDEN: no edit, no push, no merge, no poll task, no cron; never print an environment value.

END · ORDER-SCOUT-LAND-PR590-S151-1-v1
