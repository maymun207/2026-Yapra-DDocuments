# OPERATOR — SR1-W2 Apply: `router_proposals` migration
<!-- cwf-operator-SR1-W2-apply-v1 · rev 1 · 2026-07-17 -->

## S47-1 PRECONDITION (binding)
Valid ONLY while `origin/master == 82e7552` and the pending-migration set is
EXACTLY ONE file: `20260717120000_router_proposals.sql`. On any mismatch:
**STOP and report actual state** — do not adapt.

## FENCE (read first, absolute)
- Target Supabase project: **`fjbrkimwvtpwoxhziidh`** — the ONLY project you
  touch. If your connected project ref differs, STOP and report (SEC-1
  precedent: stopping on a wrong-project misconfig is the model behavior).
- Apply via **`supabase db push` ONLY** (ADR-005). NEVER the `apply_migration`
  tool. NEVER hand-run the SQL.
- No repo writes. No governed-table writes (`domain_rules`, `rule_*`). Reads
  are fine.
- Never echo secret values (ADR-007). Grant/ACL output contains role names
  only — that is fine to paste.

## G-GATES (literal, in order; paste evidence under each)

**G1 — Preconditions.**
1. Confirm connected project ref = `fjbrkimwvtpwoxhziidh`.
2. `supabase db push --dry-run` (or the MCP equivalent listing pending
   migrations): expect EXACTLY `20260717120000_router_proposals.sql`.
3. Read: `select to_regclass('public.router_proposals');` → expect NULL
   (table absent pre-apply).
On any deviation: STOP, report, await instruction.

**G2 — Apply.**
`supabase db push`. Paste the applied-migrations output line.

**G3 — Post-apply verification (reads only).**
1. Table exists: `select to_regclass('public.router_proposals');` → non-NULL.
2. RLS on, zero policies:
   `select relrowsecurity from pg_class where relname='router_proposals';` → t
   `select count(*) from pg_policies where tablename='router_proposals';` → 0
3. Table grants — full grantee set denied:
   `select grantee, privilege_type from information_schema.role_table_grants
    where table_name='router_proposals'
    and grantee in ('PUBLIC','anon','authenticated');` → **0 rows**.
4. Function EXECUTE — use the CATALOG, not information_schema alone (S30-1 /
   the L-line lesson: `role_routine_grants` misses PUBLIC `=X/owner` ACLs):
   `select proacl from pg_proc where proname='record_router_proposal';`
   Expect: NO `=X/` (PUBLIC) entry, NO `anon=`/`authenticated=` entry;
   `service_role=X/...` present. Three-way read (HARDEN-FN-PROBE-1 posture):
   denied = PASS · executable-by-clients = LEAK (report immediately) ·
   unreadable/absent = INCONCLUSIVE (report, do not green-light).
5. Index exists:
   `select indexname from pg_indexes where tablename='router_proposals';`
   → includes `router_proposals_status_count_idx`.

**G4 — Idempotence probe (S31-1).**
Re-run `supabase db push` → expect "no new migrations" / no-op. Paste output.

**G5 — Report.**
One message back: G1–G4 evidence blocks + a single verdict line
(`ALL PASS` or the first failing gate). No interpretation beyond that.

## What you do NOT do
- Do not run `scripts/verifyGrants.ts` — that is a repo script; AG-A executes
  it post-apply (ADR-006 rev 2 gated-service lane) and the Architect reads the
  result.
- Do not insert/update any row in `router_proposals` — the first rows arrive
  from the machine (fire-and-forget emission) once the router is enabled
  (SR1-W3), or from `verifyGrants` probes.

<!-- END · cwf-operator-SR1-W2-apply-v1 · rev 1 · 2026-07-17 -->
