# PHASE-SNAPSHOT-PORTABILITY-1-FIX-2 · v1 — PRODUCTION HOTFIX

<!-- Architect-authored · S94 · URGENT: production's learned layer is EMPTY and
     the only refill door is broken. Same lane (AG-1). NEW branch
     `phase/snapshot-portability-1-fix-2` cut from fresh origin/master (the old
     phase branch is deleted; S93-2 applies). Small, surgical, fast. -->

## WHAT BROKE, MEASURED (do not re-derive the diagnosis — verify the fix)

Live restore failed: `learning_restore failed: DELETE requires a WHERE clause.
The transaction aborted — the learned layer is unchanged.`

Root cause, Architect-measured on live: role **`authenticator`** carries
`session_preload_libraries = supautils, safeupdate`. Every app connection
(PostgREST → service_role) is born on that role, so **safeupdate is loaded in
the session and forbids WHERE-less DELETE — inside SECURITY DEFINER bodies
too** (the library is session-scoped, not user-scoped). Migrations apply as
`postgres` (no safeupdate), so a broken body applies silently and fails only
when RUN. This is why today's WIPE worked (its body is still the S93 applied
version with `where true`) while RESTORE failed (your migration re-emitted it
with bare DELETEs, per the brief's convergence order).

**The standing record was wrong and the Architect's order inverted it into a
defect:** the S93 "~13-line `where true` divergence" was never drift — it was
a live-environment adaptation whose reason was never written down. The brief's
"re-emit the reviewed text" order is REVOKED and REVERSED: **`delete … where
true;` is the CANONICAL form for full-table deletes in this database.**
Semantic equality is environment-relative; the convergence direction runs
repo→applied, not applied→repo.

## THE FIX (one function, one gate, one honesty note)

1. **New migration** (`2026…_restore_where_true.sql` — the two applied files
   and `20260812120000` are untouchable history): `CREATE OR REPLACE` of
   `learning_restore` ONLY, byte-identical to the current body EXCEPT each
   full-table `delete from <t>;` becomes `delete from <t> where true;` —
   matching the live-proven wipe shape. The migration's comment states the
   root cause (authenticator + safeupdate) so the form can never again read as
   noise. Sweep the WHOLE organ family's EFFECTIVE bodies (your lastIndexOf
   machinery) for any other bare full-table DELETE — the Architect believes
   restore is the only one (wipe = old body, seed/import/take = INSERT-based,
   delete/purge = WHERE-targeted) but DERIVE it, don't inherit it.
2. **The class gate, structural:** a standing test over the EFFECTIVE function
   bodies of the organ family asserting no `delete from <learned-table>`
   without a WHERE clause exists. Mutation control: stripping `where true`
   from the new body must RED it. This gate is environment-independent and is
   the MANDATORY prevention.
3. **Harness parity, attempted:** if the disposable-DB harness can load
   safeupdate (supabase/postgres image, or `LOAD 'safeupdate'` where the
   library exists), enable it and add a control proving a bare DELETE fails
   there. If the runtime cannot provide the library, say so in the report and
   rely on gate 2 — do not fake parity.
4. **Report** (`docs/relay/PHASE-SNAPSHOT-PORTABILITY-1-FIX-2-report.md`):
   the sweep result, which of 3's branches you took, gates, counts.
   docVersion **rev 233** (SET). Reseal only if the drift gate fires; expected
   hash-only or clean.

## GATES + DELIVERABLES

Both typechecks · full suite · tenant-zero · doc-drift. Branch pushed · PR ·
report · **STOP at push+PR+report** — the Architect reviews the delta
immediately and the GO follows within minutes; production is degraded, so do
nothing beyond the fence, but do it NOW.
