# PHASE-BENCH-RESET-1-v1

<!-- relay-audit grammar v1 · kind=prompt · wave=4 · lane=C ·
     PHASE-BENCH-RESET-1-v1 · S97 · Architect-authored · immutable (S37-1).
     Walk item #19 (2.4). Note carried from the order: #38/#39 built the
     bricks; ADR-014 supplies the LAW this reset derives from. -->

## PRECONDITION (S47-1)
`origin/master` = `243090898ba26dd796e21479e569d9230033054c` (rev 243). If
master differs, STOP and report.

## CLAIMS
| claim | reading |
|---|---|
| Snapshot organs exist and are proven | READ: #38 (name-unique, confirmed delete, keep, purge-to-bound) + #39 (cwf-learn/1 envelope, SAFETY-TAKE, 6/6 byte-identical ritual) closed S94-S95, register v100 |
| Reset scope derivation already has a single source | READ: ADR-014 — "snapshot/seed/export scopes are DERIVED from the classes rather than listed"; `shared/dbConstants.ts` PERSISTENCE_FAMILY.LEARNED + `shared/learningSnapshot.ts` carry the derivation |
| No bench-scoped reset exists | READ: `api/admin/` holds `learning-snapshot.ts`; no reset endpoint; bench runs today inherit whatever the learned layer happens to contain |
| retentionMax serves from the code floor | READ: `agentParams.ts:818` — value 500, min 5, max 5000, consulted only by the admin purge endpoint |

## THE DIAGNOSIS
A benchmark score over a system whose learned layer drifts between runs is not
a measurement — two runs differ by an uncontrolled variable. cinekop_gate
(the owner's measured-SOTA line) needs runs that start from a NAMED state.
The bricks exist (#38/#39); the law exists (ADR-014); what is missing is the
one action that composes them: reset-to-named-snapshot with a scope COMPUTED
from persistence classes. The trap this phase must not fall into: writing a
second scope list. The moment a bench-reset table list exists by hand,
ADR-014 is repealed in practice — the scope is DERIVED or the phase is wrong.

## SCOPE — numbered, closed
**R1 — the reset action.** New endpoint `api/admin/bench-reset.ts`:
input = a snapshot NAME (the #38 ritual: destructive confirmation is typed
against that name). Sequence, atomic in effect: (1) SAFETY-TAKE (the #39
pre-restore snapshot, reused verbatim — same code path, not a copy);
(2) restore the named snapshot through the EXISTING restore machinery;
(3) for LEARNED-family tables in scope that the snapshot does not carry,
clear to empty — via the class derivation, never a list. `where true`
canonical for any full-table DELETE (S94-1), inside the existing
SECURITY DEFINER posture (#41's sweep class — do not add a bare DELETE).

**R2 — scope is DERIVED, and the derivation is shared.** The reset scope
resolver is the SAME function family the snapshot organ uses
(`shared/learningSnapshot.ts` / `PERSISTENCE_FAMILY.LEARNED`), extended
additively if a bench distinction is genuinely needed (expected: it is not).
`learned.authority` handling follows exactly what the existing snapshot scope
says about it — read it, follow it, do not re-legislate. `governed`,
`operational.telemetry` (C1 LAW), `operational.mirror`, `content.user`,
`secret` are NEVER in reset scope, and a test proves each exclusion BY CLASS,
not by table name.

**R3 — the affordance.** `BenchTab.tsx`: a reset control naming the snapshot,
showing the DERIVED scope (class → table count) BEFORE confirmation — the
operator sees what will move, computed live from the catalog. Refuse when the
persistence catalog is unreadable (MEASURE-READ-HONESTY-1: "could not read" ≠
"nothing in scope").

**R4 — K2 EXECUTION (owner-consented governed publish).** Owner ruling
K2-S97, spoken 2026-08-13: *"K2: evet"* — `learning.snapshotRetentionMax` is
to be PUBLISHED as a governed value; Architect-committed value **50**
(min 5 / max 5000 bounds hold). Execute through the EXISTING gated governed-
publish path on standing consent; verify by read-back showing source=db,
value=50; put both the write receipt and the read-back in the report. If NO
machine path for a governed publish exists, STOP and report — do not build
one inside this fence (that would be a new organ, not a step).

**R5 — tests.** Scope-derivation both directions (a table added to a LEARNED
class in a fixture catalog enters scope with ZERO reset-code edits — the
ADR-014 dividend, proven) · per-class exclusion probes (R2) · confirmation
ritual (wrong name refused) · SAFETY-TAKE presence (a reset without its
pre-snapshot must be impossible, tested by mutation: remove the take, a named
test goes red) · catalog-unreadable refusal.

## BIRTH PROOF (S93-1)
Within the phase: one integration case runs the full sequence against fixture
tables (SAFETY-TAKE row exists · restore applied · derived-scope clear
happened · excluded classes untouched, asserted by class). The live first
reset is NOT run against production learned data in this phase — it is named
in the report as the deferred hand-witness (D-4 consent class: destroying
real learned state needs the owner's explicit go, which #30's first
measurement round will carry).

## FENCE (file-pinned; anything else = STOP)
`api/admin/bench-reset.ts` (new) · `src/components/admin/BenchTab.tsx` ·
`shared/learningSnapshot.ts` (ADDITIVE only, and only if R2 genuinely needs
it) · matching `__tests__` · `.agents/` ×2 (union). **NO migration — your
lane has no stamp; if you believe DDL is needed, STOP and report.**
`agentParams.ts` is LANE-A-EXCLUSIVE (K2 is a DB publish, not a code edit).
No turn/**, no catalogSync.ts, no MCPSettingsTab, no CI/package/vercel files.

## SINGULAR-RESOURCE INVENTORY (fence-map S96-v2 §0 — binding verbatim)
Worktree+index: exclusive; STEP 0 `git status --porcelain` before any write;
report `## TREE` mandatory (S96-1). Refs/stash/object store: no refs outside
your branch, no stash, no `-B`/force/neighbour-checkout; lost tip = STOP;
push every meaningful commit — origin is the only safe place. `.agents` ×2:
union-append, 0-deletion falsifier. Seal: provisional only, `DROP AT MERGE`.
Migration ledger: you have NO slot. Single-writer files as named. S96-2
birth-window governs all verdicts.

## DELIVERY (S91 completeness gate)
Branch **`phase/bench-reset-1`** · PUSH to origin · report at
**`docs/relay/PHASE-BENCH-RESET-1-report.md`** (grammar v1: header + CLAIMS +
DIFF + TREE) · open a **PR against master** (unsharded CI on PR head, S37-2).
Gates: full suite · typecheck:api · tenant-zero (control-first) · relayAudit
on your report · doc-drift (provisional seal if needed).

## FALSIFIER
This phase is WRONG if: (a) any hand-maintained table list defines reset scope
(grep the diff for table-name literals outside tests/fixtures — the only
legitimate hits are class-catalog entries that already existed); (b) a reset
can run without a SAFETY-TAKE; (c) any excluded class is touchable through any
input; (d) K2's read-back shows anything other than source=db value=50, or the
publish happened outside the gated path.

## AFTER PUSH: STOP.
No merge without GO.
<!-- END · PHASE-BENCH-RESET-1-v1 -->
