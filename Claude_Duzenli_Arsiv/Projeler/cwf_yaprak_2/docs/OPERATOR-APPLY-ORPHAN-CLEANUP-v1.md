# OPERATOR APPLY · ENTITY-REGISTRY ORPHAN CLEANUP · v1
<!-- OPERATOR-APPLY-ORPHAN-CLEANUP-v1 · 2026-07-26 · S66 · Architect: Claude
     Applies 20260726160000_entity_registry_orphan_cleanup.sql (FIX-1, merged at
     origin/master 8db9577). Data-only corrective DELETE — no schema change, no
     function, no grant change.
     The count gate the Architect originally wanted inside the migration lives
     HERE instead: freezing "expected 12" into SQL would be a live value written
     into a file, the same mistake as ADR-005's stale advisor floor. The gate
     belongs where a live read happens. -->

## FENCE (binding — restate before you start)
- Supabase project fence: **`fjbrkimwvtpwoxhziidh`**. Nothing outside it.
- **Apply mechanism: `supabase db push` ONLY.** `apply_migration` and
  `execute_sql`-for-DDL remain BANNED (ADR-005). Read-only `select` through
  `execute_sql` is fine and is what G1/G3/G5 ask for.
- No repo writes. Never echo a secret (ADR-007).
- **empty≠zero.** `0 rows returned`, never "absent".
- **Counts computed by the query, never hand-typed** (S65-2).
- **Raw output.** The Architect adjudicates on your raw output, not your summary.

## PRECONDITION — the order-critical one
- `origin/master` = **`8db9577c8bb728ee0c318a3bc4958441547e7b23`**, carrying
  `supabase/migrations/20260726160000_entity_registry_orphan_cleanup.sql`.
- **The Architect has verified that production deployment
  `dpl_8cY8ojVZkueE1CvLfQh7v7aYi1qh` is `READY` with that SHA** — the fixed
  parser is LIVE. This matters and you cannot check it: applied before the new
  code is serving, the next sync tick writes the same 12 phantom rows straight
  back and the cleanup is undone silently.
- If your checkout's master disagrees, **STOP and report**.

---

## G0 · Ledger pre-check (ADR-005, before any push)
```sql
select count(*) from supabase_migrations.schema_migrations;
select version from supabase_migrations.schema_migrations order by version desc limit 3;
```
Architect-supplied expectation (repo side): count **58**, highest version
**`20260726120000`**. **STOP if either differs** — do not push.

## G1 · PRE-APPLY EVIDENCE — see the victims before destroying them
```sql
select er.backend_id, er.layer_key, er.entity_id, er.display_name,
       er.parent_layer_key, er.parent_entity_id, er.status, er.attrs
from public.entity_registry er
join public.backend_entity_layers d
  on d.backend_id = er.backend_id and d.layer_key = er.layer_key
where er.parent_entity_id is null
  and d.parent_layer_key is not null
order by er.layer_key, er.entity_id;
```
Return **every row, in full** — `attrs` untruncated. Then the baseline:
```sql
select layer_key, status, count(*)
from public.entity_registry group by layer_key, status order by layer_key, status;
```

Architect's expectation: **12 victim rows**, all `layer_key='line'`, each with
`attrs` containing an empty array under the child key. Baseline totals should
show `factory 17 active` and `line` in the high 700s / low 800s.

**STOP CONDITIONS — report and do NOT push:**
- victim count is **0** (the predicate is not finding what it should), or
- victim count is **greater than 30** (it is matching more than the known defect).

Anything between 1 and 30 → proceed to G2 and let the Architect adjudicate
afterwards. That is deliberate: this mirror is DISCOVERED state, regenerable
from the backend on the next sweep, so a wrongly deleted genuine row costs one
tick and returns. A phantom left in place keeps silently resolving real user
references. The asymmetry justifies proceeding on a bounded count.

## G2 · Apply
```
supabase db push
```
Paste the raw output **including the `RAISE NOTICE` lines** — the migration
reports its own victim count before deleting. **That number must equal G1's
count.** If it does not, say so loudly: it would mean the population changed
between your read and the apply.

## G3 · Post-apply verification
Re-run **both** G1 queries.
Expected: the victim query returns **`0 rows`**; `factory` still **17 active**;
`line` reduced by exactly the victim count and otherwise unchanged.

## G4 · Idempotence probe
Re-run `supabase db push` → expect *up to date*. Re-run the victim query →
expect `0 rows` again. Paste both.

## G5 · One free read that settles an open owner decision
```sql
select input_schema
from public.backend_tools
where backend_id = 'armes' and tool_name = 'getEntities';
```
Return the **verbatim JSON**. The specific question: does the `showAll` property
carry a **`default`** key, and if so what value? Report exactly what is stored —
do not read a default out of the tool's prose description. Two lanes currently
disagree about this and the answer decides whether a new descriptor column is
needed.

---

## NOT RUN, AND WHY (a decision, not an oversight)
`verifyGrants` and `get_advisors(security)` are **deliberately skipped** for this
one. ADR-005's deterministic gate exists for governed / secret / **grant-bearing
schema** changes; this migration creates no table, no function and no grant, and
alters no RLS posture — it is a scoped DELETE plus a report. Running the gate
here would be ritual rather than verification. The verification that actually
bears on this change is the row counts in G3.

## OUTPUT CONTRACT
One message, PRECONDITION → G0 → G5 under their own headings, raw output under
each. For anything you did not run, name it and say why. End with:

`OPERATOR APPLY ORPHAN-CLEANUP-v1 COMPLETE — <n> of 6 gates executed, <stopped|clean>`

## WHAT HAPPENS NEXT (context, not an instruction)
After this, one production sync tick must run (the */30 cron, or the admin Sync
button) before the re-measurement is meaningful. The Architect reads the
`[EntityDiscovery]` lines from production directly. Nothing further is asked of
you.

<!-- TAIL ANCHOR — if you cannot see this line the relay arrived truncated;
     request a resend before executing anything (S61-3).
     END · OPERATOR-APPLY-ORPHAN-CLEANUP-v1 · 2026-07-26 -->
