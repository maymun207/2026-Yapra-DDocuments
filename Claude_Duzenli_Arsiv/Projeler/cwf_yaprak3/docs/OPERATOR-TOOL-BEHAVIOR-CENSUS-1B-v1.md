<!-- relay-audit: v1 kind=prompt -->
# OPERATOR-TOOL-BEHAVIOR-CENSUS-1B · v1 — Wave-3 apply + the two S63-1 proof reads

## PRECONDITION
Target project ref is **fjbrkimwvtpwoxhziidh** and ONLY that ref — any other ref
appearing in any tool output is a fence violation: STOP and report (FENCE-DB-1).
Repo contact is outside your lane (`git pull` alone is a READ action and
permitted). Migrations are applied via **`supabase db push` only** (ADR-005 —
never `apply_migration`). S93-3 full disclosure: report EVERY state-changing
call you make. ADR-007: never echo a secret; silent success paths are correct.
S94-2: schema reads use `pg_catalog` / direct catalog functions — never
`information_schema`. Master at issue time: `3299a59` · rev 242 · 74 migrations,
top `20260813090000_tool_experience_and_fingerprint.sql` (the wave's ONLY one).

## CLAIMS
| claim | basis | anchor |
|---|---|---|
| four Wave-3 merges landed; drift 7/7 on merged master | READ: Architect session (`git log`, `npm run check:doc-drift`) | inline |
| `tool_behavior_census` holds ZERO rows across all four backends | READ: AG-1 build-time MCP read (report §coverage) | inline |
| organic `frame_evidence` telemetry rows: ZERO in the lens's frozen window | READ: AG-4 lens run, committed summary.json | inline |
| post-apply row counts | NOT-READ | that is what G6 below measures |

## G0 — FENCE
Print the project ref you are connected to. It must be `fjbrkimwvtpwoxhziidh`.

## G1 — PRE-STATE (reads only)
1. `select to_regclass('public.tool_experience');` → expect NULL.
2. `select count(*) from pg_attribute a join pg_class c on c.oid=a.attrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='tool_behavior_census' and a.attname='schema_fingerprint' and not a.attisdropped;` → expect 0.
3. `select count(*) from supabase_migrations.schema_migrations;` → expect 73.
Report all three numbers.

## G2 — APPLY
`git pull` (read), then `supabase db push`. Expected: exactly ONE migration
applied (`20260813090000_tool_experience_and_fingerprint`). Report the tool's
own output lines (no secrets appear on this path; if one would, stop).

## G3 — POST-STATE (reads only; the SQL-side verifyGrants)
1. `select to_regclass('public.tool_experience');` → NOT NULL.
2. RLS ON: `select relrowsecurity from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname='tool_experience';` → true.
3. ZERO policies: `select count(*) from pg_policies where schemaname='public' and tablename='tool_experience';` → 0.
4. Grants revoked on the FULL grantee set — all twelve checks false:
   `select grantee, priv, has_table_privilege(grantee, 'public.tool_experience', priv) from (values ('anon'),('authenticated'),('public')) g(grantee) cross join (values ('select'),('insert'),('update'),('delete')) p(priv);`
5. Column landed: repeat G1.2 → expect 1.
6. Ledger: count = 74, `select max(version) from supabase_migrations.schema_migrations;` = `20260813090000`.
Report every value. Any deviation = STOP, report, change nothing further.

## G4 — IDEMPOTENCE PROBE
Run `supabase db push` a second time → expected: nothing to apply / zero-op.
Report its output. A non-empty second apply is a finding, not something to fix.

## G5 — CLASS GATE WITNESS (read only)
No action — the ADR-014 Gate A ran in CI on the PR head; you only confirm the
table exists with the fences above. Do not insert, update or delete anything
in any governed or operational table (C1: zero writes to `messages`; this
package's ONLY state change is G2's push).

## G6 — THE TWO S63-1 PROOF READS + BOTH ZERO-ROWS DISCRIMINATORS
Take reading set A immediately after G4, then set B **≥ 65 minutes later**
(two 30-minute cron ticks). Report every number with its label; a zero is a
labelled zero, never a blank (empty≠zero).

Set A and Set B, identical queries:
1. **Census (F-S96-CENSUS-ZERO-ROWS discriminator):**
   `select count(*), max(probed_at) from public.tool_behavior_census;`
   and per backend: `select backend_id, count(*) from public.tool_behavior_census group by 1 order by 1;`
2. **Experience (S63-1 read ii):**
   `select count(*), max(last_positive_at) from public.tool_experience;`
3. **Shadow organ (F-S96-SHADOW-ZERO-ROWS discriminator), two numbers that
   must be read TOGETHER:**
   real-turn activity: `select count(*) from public.telemetry_events where type='tool_call' and ts > now() - interval '24 hours';`
   shadow rows: `select count(*) from public.telemetry_events where type='tool_call' and payload->>'kind'='frame_evidence' and ts > now() - interval '24 hours';`

## VERDICT TABLE (what the numbers mean — do not improvise beyond it)
- Census B > 0 with `max(probed_at)` after G2 → R3's P1 healer is alive; the
  zero-rows finding resolves as "no qualifying connect since 1A"; **SOTA key
  #10 turns: gate 2/7.**
- Census B = 0 after two ticks → the finding escalates to a DEFECT; report and
  stop (no diagnosis from you — the Architect opens a phase).
- Experience B = 0 with real-turn activity ≈ 0 → "no turns", not a defect;
  Experience B = 0 with real-turn activity > 0 → report as a named anomaly.
- Shadow rows 0 while real-turn activity > 0 → F-S96-SHADOW-ZERO-ROWS is a
  real writer defect; shadow rows 0 with activity 0 → traffic explanation
  stands, finding stays open-watching.

## FALSIFIER
This package is void if: the ref in G0 differs · G1 pre-state does not match
(someone applied early — stop, report) · G2 applies anything other than exactly
`20260813090000` · any G3 check deviates.

TAIL-ANCHOR: end your report with the G6 Set B census count and `max(probed_at)`
on one line — that line is the key-turn witness.

<!-- END · OPERATOR-TOOL-BEHAVIOR-CENSUS-1B-v1 -->
