# PHASE-DISCOVERY-EXTEND-2-v1

<!-- relay-audit grammar v1 · kind=prompt · wave=4 · lane=D ·
     PHASE-DISCOVERY-EXTEND-2-v1 · S97 · Architect-authored · immutable (S37-1).
     Walk item #21 (2.8) — the raw material of #25 GRAPH-KB-1 (chain:
     DISCOVERY-EXTEND-2 → LINE diagnosis (✅ S95) → GRAPH-KB-1). ADR-009 is
     ground truth for this subject: topology is DISCOVERED, never hand-authored. -->

## PRECONDITION (S47-1)
`origin/master` = `243090898ba26dd796e21479e569d9230033054c` (rev 243 · 74
migrations, top `20260813090000`). If master differs, STOP and report.

## CLAIMS
| claim | reading |
|---|---|
| Discovery today yields NODES, not EDGES | READ: live tick 2026-08-13T06:00Z — `[EntityDiscovery] layer=factory total=17` · `layer=line total=783 emptyContainers=12`; parent-child relations exist transiently in parse but no edge row persists |
| The equipment layer is honestly dark | READ: same tick — `layer=equipment SKIPPED reason=required-param-no-default param=showAll`; ADR-009 forbids guessing the value |
| Graph-KB has no substrate | READ: no topology-edge table exists (pg_catalog census this session: `tool_behavior_census`, `tool_experience`; no edge relation) |
| JOIN LAW needs discovered parents | READ: project law — armes-domain zone reads require parent guard; name-only matching forbidden (the Glazur3 collision) |

## THE DIAGNOSIS
#25 GRAPH-KB-1 is the last unbuilt memory layer, and a graph is EDGES. Today
discovery proves the nodes (17 factories, 783 lines) and then throws the
containment away — the parse KNOWS which factory owns which line at the
moment it reads the payload, and persists only the child. That discarded
containment is exactly the JOIN LAW's parent guard and exactly Graph-KB's
substrate. This phase makes edges first-class discovered DATA — with
provenance, absence-honesty, and zero hand-authoring. The equipment layer's
darkness stays UNLESS the discovery grammar itself can be extended honestly
(R3): probing a DECLARED boolean's two values is observation (ADR-010);
inventing a value from prose is authorship (forbidden, stays forbidden).

## SCOPE — numbered, closed
**R1 — the edge table.** Migration (YOUR stamp, slot-2:
**`20260813101000_entity_topology_edges.sql`**): `entity_topology_edges` —
backend_id · parent_ref · child_ref · edge_kind (closed: `'contains'`) ·
discovered_via (tool name) · first_seen · last_seen · absent_since
(nullable). ADR-014: declare persistence class **`learned.discovered`** at
birth (the class whose seed REFUSES — discovery must re-earn on a fresh
install, by design). RLS posture and grants follow the house pattern for
discovered tables; verifyGrants probe row + CI coverage per standing security
rule.

**R2 — the sync writes edges.** `entityDiscoveryParse.ts` /
`entityDiscoverySync.ts` (+ the catalogSync call site — catalogSync.ts is
YOURS this wave): while parsing the SAME payloads discovery already reads,
persist containment edges. ABSENCE-ONLY on identity (an edge row is never
rewritten; `last_seen` advances; an edge missing from a fresh read gets
`absent_since` set, NEVER deleted — empty≠zero for topology: "observed gone"
is a fact with a timestamp, "never observed" is no row). `emptyContainers`
become real: a container with zero children is an edge-less PARENT node fact,
logged as itself, not silently a gap.

**R3 — the discovery grammar extension (equipment), honesty-bounded.**
Extend the sync's parameter handling with ONE new capability: when a required
parameter publishes a MACHINE-READABLE closed value space (boolean, or enum
with ≤4 declared values) AND the tool is read-annotated under ADR-011, the
sync may probe each declared value, compare shapes, and record the outcome as
DISCOVERED behaviour (provenance = the probe). If `showAll` on
`getEntities` meets this bar, the equipment layer syncs; if it does not
(free-text, no declared space), the SKIPPED line stays exactly as honest as
today. The report states WHICH branch reality took, with the declared-schema
bytes quoted. Guessing from prose remains forbidden in both branches.

**R4 — the log tells the new truth.** `[EntityDiscovery]` lines gain
`edges=N edgesAbsent=M` per layer; the first live line is the birth proof.

**R5 — tests.** Edge persistence ABSENCE-ONLY both directions (re-observation
advances last_seen only; disappearance sets absent_since; nothing deletes) ·
Glazur3-class regression: two children with IDENTICAL names under different
parents produce two DISTINCT edges and a parent-guarded read distinguishes
them · R3 gate both directions (declared boolean → probed; free-text required
param → SKIPPED unchanged) · migration idempotence probe text for the
Operator (the house G-gate pattern).

## BIRTH PROOF (S93-1)
Within the phase: fixture-payload integration test producing edges with
provenance. LIVE first measurement named for the Architect's S63-1 read:
the first post-deploy `[EntityDiscovery] … edges=` line for armes
(expected magnitude: factory→line containment, hundreds of edges on first
tick) plus a one-query edge count the Architect runs (`select count(*) from
entity_topology_edges where backend_id='armes'`).

## FENCE (file-pinned; anything else = STOP)
Migration `20260813101000_entity_topology_edges.sql` (Operator applies —
ADR-005) · `api/cwf/_lib/backends/entityDiscoveryParse.ts` ·
`api/cwf/_lib/backends/entityDiscoverySync.ts` ·
`api/cwf/_lib/backends/catalogSync.ts` (LANE-D-EXCLUSIVE this wave) · one new
repository file under `api/cwf/_lib/persistence/repositories/` ·
`shared/dbConstants.ts` (ADDITIVE: the table name + its class entry ONLY) ·
matching `__tests__` · `.agents/` ×2 (union). `agentParams.ts` is
LANE-A-EXCLUSIVE. No turn/**, no admin components, no CI/package/vercel files.

## SINGULAR-RESOURCE INVENTORY (fence-map S96-v2 §0 — binding verbatim)
Worktree+index: exclusive; STEP 0 `git status --porcelain` before any write;
report `## TREE` mandatory (S96-1). Refs/stash/object store: no refs outside
your branch, no stash, no `-B`/force/neighbour-checkout; lost tip = STOP;
push every meaningful commit — origin is the only safe place. `.agents` ×2:
union-append, 0-deletion falsifier. Seal: provisional only, `DROP AT MERGE`.
Migration ledger: wave budget ≤2; YOUR slot is `20260813101000` exactly.
Single-writer files as named. S96-2 birth-window governs all verdicts.

## DELIVERY (S91 completeness gate)
Branch **`phase/discovery-extend-2`** · PUSH to origin · report at
**`docs/relay/PHASE-DISCOVERY-EXTEND-2-report.md`** (grammar v1: header +
CLAIMS + DIFF + TREE) · open a **PR against master** (unsharded CI on PR
head, S37-2). Gates: full suite · typecheck:api · tenant-zero (control-first)
· relayAudit on your report · doc-drift (provisional seal if needed).

## FALSIFIER
This phase is WRONG if: (a) any edge or parameter value is hand-authored
(every edge row must trace to a parsed payload or a declared-space probe —
provenance column non-null by constraint); (b) anything DELETEs an edge row;
(c) the equipment layer syncs despite a free-text required param; (d) the
table lands without a persistence class (the #40 gate must stay green in both
directions); (e) the migration stamp differs from the assigned slot.

## AFTER PUSH: STOP.
No merge without GO. Operator applies the migration only after the GO turn.
<!-- END · PHASE-DISCOVERY-EXTEND-2-v1 -->
