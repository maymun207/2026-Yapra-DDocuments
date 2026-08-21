# RULING-BACKEND-LIFECYCLE-1-v1 — fence amendment, lane B

<!-- relay-audit grammar v1 · kind=prompt (amendment) · wave=4 · lane=B ·
     RULING-BACKEND-LIFECYCLE-1-v1 · S97 · Architect-authored.
     AMENDS the FENCE of PHASE-BACKEND-LIFECYCLE-1-v1. The phase prompt itself
     remains immutable (S37-1); this is a named amendment carried beside it. -->

## PRECONDITION
`origin/master` = `243090898ba26dd796e21479e569d9230033054c` ·
your branch `phase/backend-lifecycle-1` at `5bb70b2` or later. Continue on the
SAME worktree and the SAME branch — no new tree, no rebase, no force.

## CLAIMS
| claim | reading |
|---|---|
| `public.backends` is the declaration surface | READ (Architect, live `pg_catalog` this session): `backends` = 8 columns, `enabled` present; `mcp_settings` = 3 columns, no `enabled` |
| A jsonb array element cannot carry DEFAULT/CHECK | READ: lane B's diagnosis, confirmed by the shape above |
| The brief pinned the wrong repository | READ: `PHASE-BACKEND-LIFECYCLE-1-v1` FENCE names `McpSettingsRepository.ts` while R1 says "the backend-declaration surface" |

## THE RULING
**Lane B's diagnosis is UPHELD in full.** The defect is the Architect's: the
fence was written from documents rather than from a live read of the schema
(D-1 violation, recorded as `A-REC-S97-2`). Stopping to ask was correct
behaviour, not a delay — a panel switch with no transport is not an
affordance (S82-6), and building it against the wrong table would have been
worse than stopping.

The migration and resolver targeting `public.backends` stand as built.
`mcp_settings` is OUT of this phase entirely.

## FENCE AMENDMENT — the fence is now, in full
`supabase/migrations/20260813100000_backend_lifecycle_state.sql` (your slot,
unchanged; Operator applies — ADR-005) ·
`api/cwf/_lib/backends/backendLifecycle.ts` ·
**`api/cwf/_lib/persistence/repositories/RuleStoreRepository.ts`** (REPLACES
`McpSettingsRepository.ts`, which is hereby OUT OF FENCE — do not touch it) ·
**the backend-serving derivation in the backends lib** (the offered-set /
resolve-backends seam, `api/cwf/_lib/backends/**` only) ·
**`src/components/admin/MCPSettingsTab.tsx`** and, IF AND ONLY IF the panel's
backend chips live elsewhere, the ONE component file that actually renders
them (name it in the report; if it is more than one file, STOP and report) ·
**`src/services/adminService.ts`** (or whichever single service file carries
`updateBackend` — additive transition call only) ·
matching `__tests__` · `.agents/` ×2 (union seam).

STILL OUT OF FENCE, unchanged: `api/cwf/_lib/turn/**` (lane A) ·
`api/cwf/_lib/backends/catalogSync.ts` (lane D) ·
`api/cwf/_lib/knowledge/reference/agentParams.ts` (lane A) ·
`src/components/admin/BenchTab.tsx` (lane C) · `shared/learningSnapshot.ts`
(lane C) · CI workflow / `package.json` / `vercel.json` · any second
migration stamp.

## WHAT TO BUILD NOW (the three parts that were correctly withheld)
1. **Consumer wiring** — the serve consequence, through the resolver, at the
   backends-lib seam. If the only reachable call site turns out to be inside
   `catalogSync.ts` (lane D) or `turn/**` (lane A), do NOT edit it: name the
   exact file and line in the report and leave it as a declared 2-line
   follow-up for the merge queue. The sync/probe consequences for `paused`
   are CONTINUE, so most of that wiring is expected to be a no-op by design.
2. **The panel affordance** — state visible per backend, legal transitions
   only, retired terminal, typed-name confirmation on retire (#38 ritual
   reused), Turkish-first copy.
3. **The S93-1 birth proof** — a synthetic/panel test backend (never armes,
   never superset) walked through pause → serve-exclusion asserted →
   census/sync continuation asserted, in one integration case. Name the live
   first `lifecycle=` reading for the Architect's post-deploy S63-1 read.

Your pre-migration derivation rule (`enabled=false` → `paused`, never
`retired`, and the read says it DERIVED) is ACCEPTED as built and is the
correct floor semantics (F185).

## FALSIFIER (amended)
Unchanged from the phase prompt, plus: (a) any write to `mcp_settings` in this
diff; (b) a lifecycle state literal appearing outside `backendLifecycle.ts` +
the migration + tests + UI display strings; (c) a migration assertion that can
be satisfied by comment text (the instrument defect you caught — the comment-
stripped judgement must hold for every migration assertion in this diff).

## DELIVERY
Unchanged: branch `phase/backend-lifecycle-1` · push · report at
`docs/relay/PHASE-BACKEND-LIFECYCLE-1-report.md` (update in place; grammar v1
header + CLAIMS + DIFF + TREE) · PR against master · gates: full suite,
typecheck:api, tenant-zero control-first, relayAudit, doc-drift.

## AFTER PUSH: STOP. No merge without GO.
<!-- END · RULING-BACKEND-LIFECYCLE-1-v1 -->
