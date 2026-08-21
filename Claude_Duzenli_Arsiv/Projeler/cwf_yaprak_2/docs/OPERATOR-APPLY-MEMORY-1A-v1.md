# OPERATOR-APPLY-MEMORY-1A · v1
<!-- OPERATOR-APPLY-MEMORY-1A-v1 · 2026-07-30 · S71. Lane: OPERATOR (Gemini +
     Supabase MCP/CLI). ONE migration: 20260730150000_episodes.sql, merged to
     master at a51d70ec9496bace8d319939d055f3ca98a75556. Report every gate
     with LITERAL command output (scrubbed). On ANY red: STOP and report —
     never improvise, never edit, never retry with variations. -->

## FENCE — read this before any command (binding)

- You may READ the repo (a fresh read-only clone) and READ/APPLY against the
  Supabase project **`fjbrkimwvtpwoxhziidh`** ONLY.
- Migrations are applied via **`supabase db push` ONLY** (ADR-005). The MCP
  `apply_migration` tool is FORBIDDEN. Hand-run SQL that creates/alters
  objects is FORBIDDEN.
- ZERO writes to any governed table (`domain_rules`, `rule_kinds`, caches,
  proposals — nothing). This task writes nothing by hand; the push is the
  only mutation.
- ZERO repo writes — no commits, no pushes, no file edits.
- ADR-007: NEVER echo a secret, a connection string with credentials, or an
  env value. Silent success paths are correct; report names and statuses only.

## G0 · IDENTITY + GROUND (all must PASS before G1)

1. Fresh read-only clone of `maymun207/cwf_yaprak`; then:
   `git rev-parse origin/master` → MUST print
   `a51d70ec9496bace8d319939d055f3ca98a75556`. Anything else: STOP
   (you are not on the reviewed tree).
2. Confirm the migration file exists in the clone:
   `supabase/migrations/20260730150000_episodes.sql` (61 files total in that
   directory).
3. Project identity: confirm the linked/target project ref is
   `fjbrkimwvtpwoxhziidh` (link status or the URL's ref — do NOT print keys).
   A mismatch is a hard STOP (two live Supabase projects exist —
   the FENCE-DB-1 lesson).
4. Drift pre-read: `supabase migration list` — expect the remote side to be
   missing EXACTLY ONE local migration: `20260730150000`. If more than one is
   missing, or the remote has entries the local tree lacks: STOP and report
   the full list (something else has drifted; applying blind is forbidden).

## G1 · PRE-APPLY LIVE READ (SQL, read-only)

```sql
select to_regclass('public.episodes') as episodes_exists;
```
Expected: `null` (the table does not exist yet). If it already exists: STOP
and report (a prior partial apply or drift — the Architect decides).

## G2 · APPLY

`supabase db push`
- Expected: exactly `20260730150000_episodes.sql` applied, no errors.
- Paste the push output VERBATIM (it contains no secrets).
- Any error: STOP. Do not re-run, do not edit the file.

## G3 · IDEMPOTENCE PROBE (the second push)

`supabase db push` again.
- Expected literal outcome: "Remote database is up to date." (zero work).
- Anything else: report VERBATIM — a second-run diff is itself a finding.

## G4 · OBJECT READ (SQL, read-only — every line reported)

```sql
select count(*) as col_count
  from information_schema.columns
 where table_schema = 'public' and table_name = 'episodes';           -- expect 16

select indexname from pg_indexes
 where schemaname = 'public' and tablename = 'episodes'
 order by indexname;
-- expect: episodes_conversation_created_idx · episodes_expires_idx ·
--         episodes_pkey · episodes_user_created_idx   (4 rows)

select relrowsecurity from pg_class where oid = 'public.episodes'::regclass;
-- expect: true (RLS ON)

select count(*) as policy_count from pg_policies
 where schemaname = 'public' and tablename = 'episodes';               -- expect 0

select coalesce(relacl::text, 'NULL (no explicit grantee ACL)') as acl
  from pg_class where oid = 'public.episodes'::regclass;
-- expect: NO anon / authenticated / PUBLIC privilege anywhere in the ACL
-- (service_role / postgres owner entries are fine). Paste the ACL verbatim —
-- it contains role names only, no secrets.

select count(*) as row_count from public.episodes;                     -- expect 0
-- (0 is the REAL expected value: the production write path degrades to a
--  no-op until this apply; rows begin only after real user turns from now.)
```

## G5 · LIVE GRANT HARNESS

From the clone, with the project env available to you:
`node --import tsx scripts/verifyGrants.ts`
- Expected: ALL probes PASS, and the probe set now INCLUDES the new
  `episodes` row (MEMORY-1A G1 added it). Report the pass/total count and
  the episodes line's verdict. Value output is probe-shaped only; if any
  probe prints anything secret-shaped, STOP and report the probe NAME only.
- If the harness cannot run in your environment (missing env), report that
  as INCONCLUSIVE — do NOT substitute a hand-rolled check — and hand back.

## G6 · CLOSING REPORT (exact shape)

```
OPERATOR-APPLY-MEMORY-1A REPORT
G0 identity+ground : PASS/FAIL (+master hash · ref · migration-list delta)
G1 pre-read        : PASS/FAIL (episodes_exists = …)
G2 push            : PASS/FAIL (+verbatim output)
G3 second push     : PASS/FAIL (+verbatim outcome line)
G4 object read     : PASS/FAIL (cols=… · indexes=… · rls=… · policies=… ·
                     acl=… · rows=…)
G5 verifyGrants    : PASS/FAIL/INCONCLUSIVE (n/n · episodes probe verdict)
END STATE          : 20260730150000 present in remote migration list: yes/no
```

After this report, the Architect performs the live production reads
(`[MemoryWrite]` on real turns; the 03:40Z `[MemoryForget]` tick) — nothing
further from the Operator lane.

<!-- END · OPERATOR-APPLY-MEMORY-1A-v1 · 2026-07-30 -->
