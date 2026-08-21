# PHASE-FRAME-ON-ALL-PATHS-1-v1

<!-- relay-audit grammar v1 · kind=prompt · wave=4 · lane=A ·
     PHASE-FRAME-ON-ALL-PATHS-1-v1 · S97 · Architect-authored · immutable (S37-1) -->

## PRECONDITION (S47-1)
`origin/master` = `243090898ba26dd796e21479e569d9230033054c` (rev 243 · 562 test
files · 74 migrations · drift 7/7). If master differs, STOP and report — a
moved floor re-fences this wave (S88-1).

## CLAIMS
| claim | reading |
|---|---|
| Frame runs on exactly ONE path today | READ: `stageTools.ts` — the frame layer lives inside `filterToolsByMessage`, reached only on the covered-flat branch; the else-literal sets `irFrame: null`, `frameEvidence: undefined` |
| Gateway-only turns never consult the frame | READ: `stageTools.ts` else-branch comment ("the router LLM call, and therefore the frame layer, never ran on this branch") |
| The absence is honest but UNNAMED | READ: `frameEvidence: undefined` — no reason field exists; "never ran (dark)" vs "never ran (no message)" vs "ran, no frame" are indistinguishable downstream |

## THE DIAGNOSIS
ROUTE-ASK-1 (#14) and A23 (#29) consume frame evidence. Today that evidence
exists only on turns where the flat-tool filter runs. A Superset-only turn, a
keyword-fallback turn, an uncovered-flat-only turn produce NO frame and NO
named reason — for the understanding layer these turns are invisible, and an
invisible turn cannot be asked about. The census taught the house that every
tool must be tried and the trial recorded; this phase is its sibling for the
frame: every USER TURN either runs the frame layer or records, by name, why
it did not.

## SCOPE — numbered, closed
**R1 — one seam.** New `api/cwf/_lib/routing/resolveTurnFrame.ts`: a single
function through which EVERY user-turn frame decision flows. It either (a)
invokes the ONE existing extractor path (`armorIrFrame` fed by the one router
call — feed it, never fork it; zero new frame-parsing logic, the
`extractSyntheticFrame` law) and returns `{frame, drops, evidence}`, or (b)
returns an honest absence `{ran:false, reason}` with a CLOSED reason enum:
`'router-dark' | 'no-covered-flat' | 'no-message' | 'router-error'`.
Absence-with-reason, never bare `undefined` (empty≠zero at the frame layer:
"ran and found nothing" ≠ "never ran").

**R2 — the else-branch goes through the seam.** The gateway-only/no-covered-flat
literal in `stageTools.ts` is replaced by a seam call. At the code floor
(R3 = 0) behaviour is BYTE-EQUIVALENT to today except the absence now carries
its reason into `ctx` and the shadow record. No second completion site is
created at the floor.

**R3 — governed switch, dark at birth.** Append `router.frameOnAllPaths` to
`agentParams.ts`: bool-as-number, code floor **0** (F185: THE FLOOR IS TODAY'S
STATE), `sessionTweakable:false`, ops-plane stage '00', db>floor, no lab/env
tier — the ROUTER_ENABLED convention exactly. At 1, the seam runs the frame
extractor on paths that lack a flat filter (frame extracted and RECORDED,
steering NOTHING — `router.frameRouting` floor 0 is untouched and out of
fence). Publication is a FUTURE owner decision; this phase ships dark.

**R4 — shadow carries the new facts.** Frame-shadow rows gain the absence
reason (additive field; existing rows/readers untouched). The #6 evidence
shape is EXTENDED, never reshaped.

**R5 — tests.** (i) seam unit tests over the reason enum, both directions;
(ii) an integration case proving the else-branch records `no-covered-flat`
at floor; (iii) a floor-equivalence case: with param at 0, the offered toolset
and every pre-existing ctx field are byte-identical to master's behaviour;
(iv) mutation probe: re-introduce the bare `undefined` literal — a named test
must go red.

## BIRTH PROOF (S93-1)
The organ's first real measurement is producible AT THE FLOOR: after deploy,
the first gateway-only or keyword turn writes a shadow row carrying
`reason='router-dark'` or `'no-covered-flat'`. The report names the exact log
line / row the Architect will read (S63-1); AG does not read production
(carry as NOT-READ per grammar).

## FENCE (file-pinned; anything else = STOP)
`api/cwf/_lib/routing/resolveTurnFrame.ts` (new) ·
`api/cwf/_lib/routing/frameEvidence.ts` (additive) ·
`api/cwf/_lib/turn/stageTools.ts` ·
`api/cwf/_lib/knowledge/reference/agentParams.ts` (APPEND only — this file is
LANE-A-EXCLUSIVE this wave) · matching `__tests__` files · `.agents/` ×2
(union seam). **No migration. No `package.json`/`vercel.json`/CI workflow.**
Turn pipeline is single-writer this wave and the writer is YOU — but only the
one file named above.

## SINGULAR-RESOURCE INVENTORY (fence-map S96-v2 §0 — binding verbatim)
Worktree+index: exclusive per lane; STEP 0 `git status --porcelain` proof
before ANY write; report `## TREE` mandatory or review will not start (S96-1).
Refs/stash/object store: worktree does NOT isolate them — no refs outside your
branch, no stash (patch files instead), no `-B`/`branch -f`/force-push/
neighbour-checkout; lost tip = STOP-and-report; push after every meaningful
commit (origin is the only safe place). `.agents` ×2 files: union-append,
deletions forbidden, falsifier = 0 deletions. Seal: builders never touch it;
provisional seal allowed ONLY as `DROP AT MERGE` for CI. Migrations: your lane
has NO slot. Turn pipeline/admin nav/CI workflow/package.json/vercel.json:
single-writer rules above. Verdicts: S96-2 birth-window — pre-deploy activity
proves nothing about this organ.

## DELIVERY (S91 completeness gate)
Branch **`phase/frame-on-all-paths-1`** · PUSH to origin · report at
**`docs/relay/PHASE-FRAME-ON-ALL-PATHS-1-report.md`** (grammar v1: header +
CLAIMS + DIFF + TREE) · open a **PR against master** so unsharded CI runs on
the PR head (S37-2). Gates before report: full suite · `typecheck:api` ·
tenant-zero (control-first) · relayAudit on your own report · doc-drift
(provisional seal if red from your files).

## FALSIFIER
This phase is WRONG if any of: (a) a second frame-parsing code path exists
after merge (grep: `armorIrFrame` call sites must be unchanged in count on the
turn path); (b) with the param at floor 0 any turn's offered toolset differs
from master; (c) a frame influences routing anywhere (frameRouting floor
untouched); (d) an absence is recorded without a reason.

## AFTER PUSH: STOP.
No merge without GO. The Architect reviews from a fresh clone (RULE-25).
<!-- END · PHASE-FRAME-ON-ALL-PATHS-1-v1 -->
