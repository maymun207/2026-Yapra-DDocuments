# OPERATOR-DISCOVERY-EXTEND-2-v1

<!-- relay-audit grammar v1 · kind=prompt (operator) · wave=4 · S97 ·
     Architect-authored · immutable (S37-1). RELAY ONLY AFTER the lane-D merge
     (GO-DISCOVERY-EXTEND-2 STEP 3) is confirmed on origin/master. -->

## FENCE — FIRST, BEFORE ANYTHING
Target project: `fjbrkimwvtpwoxhziidh` and NOTHING else — any other ref in any
tool output is a fence violation: STOP and report it verbatim (minus secrets).
No repo file contact. No governed-table writes. Secrets never echoed
(ADR-007) — silent success paths are correct. Every state-changing call you
make is reported by name in your closing block (S93-3).

## PRECONDITION
`origin/master` contains the merge subject `merge: PHASE-DISCOVERY-EXTEND-2`.
Applied-migration head is `20260813090000` (74 applied). If either differs,
STOP and report.

## STEP 1 — APPLY (the only authorized method)
`supabase db push` (ADR-005 — never `apply_migration`). Expected: exactly ONE
new migration applies: `20260813101000_entity_topology_edges.sql`. If the push
proposes anything else alongside it, STOP before confirming and report the
list. (`20260813100000_backend_lifecycle_state.sql` belongs to lane B's turn
and must NOT ride this push — if it appears, that is the STOP case.)

## STEP 2 — G-GATES (each computed, none asserted)
- **G1 · existence + shape:** `pg_catalog` (never `information_schema` —
  S94-2) shows `public.entity_topology_edges` with the composite PK and
  `discovered_via` NOT NULL.
- **G2 · grants:** the verifyGrants probe for this table passes with the
  HARDEN-FN-PROBE-1 three-way reading — `42501` = PASS; a no-error read is a
  LEAK (fail); anything else INCONCLUSIVE (fail). Never silent-green.
- **G3 · idempotence:** a second `supabase db push` reports nothing to apply.
- **G4 · class gate:** the persistence-class CI/drift check remains green in
  both directions (no unclassified live table, no classified missing table).
- **G5 · zero rows:** `select count(*) from entity_topology_edges` = 0 — the
  migration seeds NOTHING; a nonzero count here is a STOP finding.

## STEP 3 — CLOSING BLOCK (one paste to the owner)
Applied list (expected: the one file) · G1–G5 readings verbatim · the full
disclosure line: every state-changing call made this turn, by name.

## OUT OF SCOPE, EXPLICITLY
The first live `edges=` log line and the first edge-count read are the
ARCHITECT'S S63-1 read after the next discovery tick — not yours. Do not
trigger a sync, do not touch `entity_registry`, do not read beyond the gates
above.
<!-- END · OPERATOR-DISCOVERY-EXTEND-2-v1 -->
