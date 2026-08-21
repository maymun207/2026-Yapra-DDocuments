# RELAY-LIFECYCLE-SERVE-WIRE-1-v1 — AG-2 micro-turn

<!-- relay-audit grammar v1 · kind=prompt · wave=4 follow-up · lane=AG-2 · S97 ·
     Architect-authored · immutable (S37-1). The two follow-ups YOUR merge
     report declared, now unblocked: the …100000 migration is APPLIED and
     gated (Operator closing block verified by the Architect: 5/5 rows
     active, CHECK live, idempotent). -->

## PRECONDITION (S47-1)
`origin/master` = `a37fc9704d883e5ac8e0a475cc2dfd4e11f82868`. Different tip:
STOP and report. S93-2 (dead worktree law): your merged phase worktree is
DEAD — fresh exclusive worktree, fresh branch **`phase/lifecycle-serve-wire-1`**,
STEP 0 `git status --porcelain` proof, report `## TREE` mandatory.

## SCOPE — exactly the two lines you declared, plus their proof
**W1** · `api/cwf/_lib/turn/stagesResolve.ts:58` — the serve consequence
reaches the live turn: `resolveActiveBackends` consults the lifecycle
resolver so `paused`/`retired`/`draft` backends leave the served set. The
turn pipeline is FREE this wave-tail (lane A closed); this is the sanctioned
single-writer touch.
**W2** · `api/admin/config-fingerprint.ts:38` — lifecycle joins the
fingerprint so a state flip changes the config identity.
**W3** · tests: one wiring case per line — a `paused` fixture backend absent
from the served set on a real `stagesResolve` invocation; a fingerprint
inequality across a state flip. Byte-equivalence case: with all rows
`active`, the served set is identical to master's.

## FENCE
The two named files · matching `__tests__` · `.agents/` ×2 (union). NOTHING
else — no migration, no manifest (provisional seal only if CI demands, DROP
AT MERGE), no other turn file.

## FALSIFIER
Wrong if: (a) any state literal appears in either file (the resolver answers,
literals stay home); (b) with all-active data any served set differs from
master; (c) more than the two production files change.

## DELIVERY
Push · report `docs/relay/RELAY-LIFECYCLE-SERVE-WIRE-1-report.md` (grammar v1,
TREE+CLAIMS+DIFF) · PR against master · full suite + typecheck + tenant-zero
+ relayAudit + doc-drift. **AFTER PUSH: STOP — GO follows the Architect's
review.**
<!-- END · RELAY-LIFECYCLE-SERVE-WIRE-1-v1 -->
