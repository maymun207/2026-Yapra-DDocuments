# PHASE-BACKEND-LIFECYCLE-1-v1

<!-- relay-audit grammar v1 · kind=prompt · wave=4 · lane=B ·
     PHASE-BACKEND-LIFECYCLE-1-v1 · S97 · Architect-authored · immutable (S37-1).
     Walk item #15 (2.2a) — the NAMED precondition of #16 BENCH-BACKEND-MOUNT-1. -->

## PRECONDITION (S47-1)
`origin/master` = `243090898ba26dd796e21479e569d9230033054c` (rev 243 · 74
migrations, top `20260813090000`). If master differs, STOP and report.

## CLAIMS
| claim | reading |
|---|---|
| Backend lifecycle today is one boolean | READ: `mcp_settings` entries carry `enabled` beside id/url/transport; no state machine exists |
| Backend identity is DATA | READ: ADR-010 + BACKEND-IDENTITY-IS-DATA-1 — panel-created backends exist in production |
| A disabled backend's derived rows are undefined behaviour | READ: no code names what happens to mirror/census/experience/topology rows when `enabled` flips false — nothing archives, nothing withholds by STATE |

## THE DIAGNOSIS
#16 (zero-code mount, SOTA key) needs a backend to be born SAFELY: attached,
verified, served, paused, retired — without a redeploy and without orphaning
governed/learned rows. Today the only affordance is a bare `enabled` flag with
undefined downstream semantics. Mounting cannot be one click (PLATINUM) until
the states and their consequences are LAW. This phase legislates the state
machine and its consequences; #16 then merely walks it.

## SCOPE — numbered, closed
**R1 — the state machine, as DATA.** Migration (YOUR stamp, slot-1:
**`20260813100000_backend_lifecycle_state.sql`**): add `lifecycle text not null
default 'active'` to the backend-declaration surface (the same table the panel
writes — follow the house repository, do not invent a second table), with a
CHECK over the CLOSED set `'draft' | 'active' | 'paused' | 'retired'`.
Default `'active'` because F185: the floor is today's state — every existing
backend IS being served today. Per ADR-014 the column changes no table's
persistence class; state is a fact about the row.

**R2 — consequences are derived, single-sourced.** One resolver
(`backendLifecycle.ts`, new, in the backends lib) answers, per state:
served-on-turns? synced-by-catalog? probed-by-census? visible-in-panel?
`draft`: visible only; no serve, no sync, no probe. `active`: everything.
`paused`: no serve; sync+census CONTINUE (observation is not service —
ADR-010; a paused backend keeps earning/losing trust). `retired`: nothing
runs; derived rows are RETAINED (append-only history; deletion is a different
law) and every reader must treat them as historical. Consumers (stage
resolve-backends · catalogSync tick · census pass) ask the resolver — no
consumer re-derives. **Turn-pipeline files are LANE-A territory this wave:**
wire the serve-side consequence WITHOUT touching `api/cwf/_lib/turn/**` — the
resolve seam the pipeline already calls lives in the backends lib; if you
find the cut requires a turn-file edit, STOP and report the exact line.

**R3 — the affordance.** `MCPSettingsTab.tsx`: state visible per backend +
transition control. Legal transitions only (draft→active, active⇄paused,
active/paused→retired; retired is TERMINAL — resurrection is a new
declaration). Retire requires typed-name confirmation (the #38 ritual,
reused not reinvented). Turkish-first UI copy like the rest of the panel.

**R4 — honesty at the seams.** A paused/retired backend's tools NEVER reach a
turn (extend the existing offered-set derivation in the backends lib);
`[CatalogSync]`/`[CensusRefresh]` lines carry `lifecycle=` when not active.
empty≠zero: "no tools because paused" must be distinguishable from "no tools".

**R5 — tests.** State-machine legality both directions (illegal transition
refused BY NAME) · resolver consequence matrix (4 states × 4 questions,
closed) · a serve-exclusion case proving a paused backend's tools are absent
from the offered set while its census probing continues · migration text has
a `where true`-canonical form if any DELETE appears (S94-1 — expected: none).

## BIRTH PROOF (S93-1)
Within this phase: pause a SYNTHETIC/panel test backend (not armes, not
superset) in a test, and show the resolver + serve-exclusion + census-continue
facts in one integration case. The LIVE first measurement (a real `lifecycle=`
log line) is named in the report for the Architect's S63-1 read post-deploy.

## FENCE (file-pinned; anything else = STOP)
Migration `20260813100000_backend_lifecycle_state.sql` (Operator applies —
ADR-005; you only author the file) ·
`api/cwf/_lib/backends/backendLifecycle.ts` (new) ·
`api/cwf/_lib/persistence/repositories/McpSettingsRepository.ts` ·
`src/components/admin/MCPSettingsTab.tsx` · matching `__tests__` ·
`.agents/` ×2 (union). **catalogSync.ts is LANE-D territory this wave** — the
census/sync consequence lands as the resolver + a ≤3-line call-site edit ONLY
IF that call site is NOT in catalogSync.ts; otherwise declare the seam in your
report and leave the wiring to a named 2-line follow-up in the merge queue
(Architect will sequence it). `agentParams.ts` is LANE-A-EXCLUSIVE — no param
this phase. No turn/**, no admin nav, no CI/package/vercel files.

## SINGULAR-RESOURCE INVENTORY (fence-map S96-v2 §0 — binding verbatim)
Worktree+index: exclusive; STEP 0 `git status --porcelain` before any write;
report `## TREE` mandatory (S96-1). Refs/stash/object store: no refs outside
your branch, no stash, no `-B`/force/neighbour-checkout; lost tip = STOP;
push every meaningful commit. `.agents` ×2: union-append, 0-deletion
falsifier. Seal: provisional only, `DROP AT MERGE`. Migration ledger: wave
budget ≤2; YOUR slot is `20260813100000` exactly — a different stamp is a
fence breach. Single-writer files as named above. S96-2 birth-window governs
all verdicts.

## DELIVERY (S91 completeness gate)
Branch **`phase/backend-lifecycle-1`** · PUSH to origin · report at
**`docs/relay/PHASE-BACKEND-LIFECYCLE-1-report.md`** (grammar v1: header +
CLAIMS + DIFF + TREE) · open a **PR against master** (unsharded CI on PR head,
S37-2). Gates: full suite · typecheck:api · tenant-zero (control-first) ·
relayAudit on your report · doc-drift (provisional seal if needed).

## FALSIFIER
This phase is WRONG if: (a) any consumer answers a lifecycle question without
the resolver (grep for the state literals outside `backendLifecycle.ts` +
migration + tests must return only the UI's display strings); (b) a retired
backend's rows are deleted anywhere; (c) armes or superset changes state in
any test fixture that touches live tables; (d) the migration stamp differs
from the assigned slot.

## AFTER PUSH: STOP.
No merge without GO. Operator applies the migration only after the GO turn.
<!-- END · PHASE-BACKEND-LIFECYCLE-1-v1 -->
