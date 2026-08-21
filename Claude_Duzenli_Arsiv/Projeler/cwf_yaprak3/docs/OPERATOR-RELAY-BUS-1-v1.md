# OPERATOR-RELAY-BUS-1-v1 — apply the carrier, then let it carry your report

<!-- S98 · Architect-authored · Operator lane (Gemini + Supabase MCP).
     PROJECT FENCE: fjbrkimwvtpwoxhziidh — every call targets THIS project
     and no other; any other ref appearing anywhere in tool output is a
     fence violation, STOP and report.
     PRECONDITION (S47-1): AG-1's GO-TRAIN STEP 3 is merged — master
     carries supabase/migrations/20260813110000_relay_inbox.sql. The owner
     relays this card only after that. This is the LAST pasted Operator
     card: your next one arrives as a relay_inbox row. -->

## G1 — pre-flight reads (read-only)
1. `select count(*), max(version) from supabase_migrations.schema_migrations where true;`
   → expect 76 / `20260813101000`. Anything else: STOP, report verbatim.
2. Confirm `relay_inbox` absent:
   `select count(*) from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='relay_inbox';`
   → expect 0. (S94-2: pg_catalog, never information_schema.)

## G2 — apply (the ONE authorized method, ADR-005)
`supabase db push` from a fresh read-only checkout of master — NEVER
`apply_migration`. Expected: exactly ONE migration applied,
`20260813110000_relay_inbox.sql`.

## G3 — post-apply verification (read-only)
1. Migration count → 77, top `20260813110000`.
2. Table live with RLS: `select relrowsecurity from pg_catalog.pg_class c join pg_catalog.pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='relay_inbox';` → `true`.
3. Triggers present (expect 3 rows — append-only, no-delete, no-truncate):
   `select tgname from pg_catalog.pg_trigger where tgrelid = 'public.relay_inbox'::regclass and not tgisinternal;`
4. Zero rows: `select count(*) from relay_inbox where true;` → 0.

## G4 — idempotence probe
Run `supabase db push` a SECOND time → expected: zero migrations applied,
zero errors. Report the tool's own output line.

## G5 — verifyGrants
Run the repo's `scripts/verifyGrants.ts` (read-only checkout; the script
self-cleans its probe row). Expected: ALL probes PASS including the new
`relay_inbox` row (anon UPDATE denied 42501). Report the pass count.

## G6 — BIRTH: your report becomes the organ's first row
File your ENTIRE narrative report for G1–G5 as the first `from_lane` row
— the migration's application report arrives through the table the
migration created:

```sql
insert into relay_inbox (direction, lane_addr, artifact_name, body)
values ('from_lane', 'operator', 'OPERATOR-REPORT-RELAY-BUS-1-v1',
        '<your full G1–G5 report text>')
returning id, created_at;
```

Paste the returned `id` + `created_at` back to the owner as your ONLY
chat output for this card (one line) — everything else lives in the row.
LAWS in force on the body: ADR-007 secrets NEVER (no key, no token, no
grant string — verifyGrants output as counts only); S93-3 full disclosure
of every state-changing call (the push, this insert) YES.

## FENCES (standing)
Read-only git checkout permitted (S97 ruling), repo WRITES forbidden ·
no governed-table writes · `delete … where true` canonical if ever needed
(not needed here) · this card authorizes exactly: two `db push` runs, the
verifyGrants script, the ONE insert above. Nothing else.

<!-- END · OPERATOR-RELAY-BUS-1-v1 -->
