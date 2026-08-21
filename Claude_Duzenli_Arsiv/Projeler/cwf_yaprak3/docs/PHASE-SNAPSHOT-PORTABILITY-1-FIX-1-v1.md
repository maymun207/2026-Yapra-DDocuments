# PHASE-SNAPSHOT-PORTABILITY-1-FIX-1 · v1

<!-- Architect-authored · S94 · surgical addendum to PHASE-SNAPSHOT-PORTABILITY-1.
     Same lane (AG-1), SAME branch `phase/snapshot-portability-1` — this is not a
     new phase; push additional commits to the existing branch/PR. -->

## WHY THIS RELAY EXISTS — a false recon fact hid a real defect

Your D1 stated: *"no foreign key (verified live — all six learned tables have
zero FKs)"*. The Architect re-measured live (`pg_constraint`, contype='f'):
**FIVE foreign keys exist** across the six tables:

```
backend_authority.backend_id  → backends(id)        ON DELETE RESTRICT
entity_registry.backend_id    → backends(id)        ON DELETE RESTRICT
episodes.user_id              → auth.users(id)      ON DELETE CASCADE
router_proposals.resolved_by  → auth.users(id)
semantic_memory.user_id       → auth.users(id)      ON DELETE CASCADE
```

(`tool_category_cache` is the only FK-free one.)

**Consequences, ruled by the Architect:**

1. **D1's RULING STANDS — stronger, with a corrected mechanism.** A foreign
   seed of `semantic_memory` would not silently plant unreachable rows; it
   would FAIL the transaction on the FK. Either way: user-scoped tables never
   transport. Correct the factual claim in the report — a false premise left
   standing becomes the next lane's truth.
2. **A LATENT DEFECT is exposed:** `router_proposals` is classed TRANSPORTABLE,
   but any RESOLVED proposal carries `resolved_by` = a SOURCE-installation user
   id. Seeding a realistic file into a foreign installation FK-violates and the
   whole seed fails. Your fixtures carried no resolved proposal, so the suite
   never saw it — unfalsified is not proven.

## THE FIX (committed, single path)

**R-FIX1 · Identity is nulled at the border, and the act is counted.** The seed
transports `router_proposals` rows with `resolved_by := NULL`. Who resolved a
proposal is source-installation-local identity; the resolution's substance
already lives in `tool_category_cache`, which transports. The seed result
gains a count (e.g. `strippedResolverIdentity: n`) — zero silent mutation;
empty≠zero discipline applies (0 = measured zero, and the field is always
present).

**R-FIX2 · The census becomes structure, not memory.** A new test derives, from
the learned tables' own migration DDL, every column referencing `auth.users`,
and asserts each owning table is either classed `NEVER_USER_SCOPED` or has
that column in an explicit `SEED_BORDER_STRIPPED_COLUMNS` map (new, in
`shared/learningSnapshot.ts`, beside the class map). A seventh learned table
with a user reference then FORCES a classification-or-strip decision at build
time. Mutation control: removing `resolved_by` from the strip map must RED it.

**R-FIX3 · A realistic fixture.** At least one seed test carries a RESOLVED
proposal (non-null `resolved_by`) through export→import→seed on the disposable
Postgres — the case the FK actually punishes — asserting the row lands with
`resolved_by IS NULL` and the count reports 1. Backend-dimension R3
(skip-and-count on unknown backend ids) must ALSO be exercised against the
REAL FK (`ON DELETE RESTRICT` parents) in the same run, since your prior proof
of it ran against fixtures that could not FK-fail.

**R-FIX4 · Report corrections, named:** (i) the FK census replaced with the
measured five-FK truth; (ii) one sentence confirming the F-S93 `where true`
convergence status in the new migration's replaced bodies (the Architect found
a single remaining occurrence — state its location and why it is correct, or
remove it if it is not); (iii) this FIX appended as its own section, history
unedited.

## FENCE

Only: the seed SQL in `20260812120000_snapshot_portability.sql` (NOT the two
applied files — untouchable), `shared/learningSnapshot.ts`, the seed's
repository/endpoint result type if the new count surfaces there, tests, and
the report. Nothing else. docVersion stays **rev 232** unless the drift gate
disagrees — if it does, stop and report.

## GATES + DELIVERABLES

Both typechecks · full suite · tenant-zero · doc-drift. Re-run the mutation
set affected by the seed path (at minimum M4/M5/M8/M9/M21/M22 plus the new
strip-map control), same harness guard. Push to the SAME branch, same PR, CI
on the new head. Report the new head SHA. STOP at push — the GO comes after
the Architect re-reviews the delta.
