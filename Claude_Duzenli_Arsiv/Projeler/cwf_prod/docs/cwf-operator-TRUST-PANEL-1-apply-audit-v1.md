# CWF — Operator Task: TRUST-PANEL-1 APPLY (audit ledger) + unified probe run · v1

<!-- cwf-operator-TRUST-PANEL-1-apply-audit-v1 · rev 1 · 2026-07-10
     Runs ONLY after the Architect confirms the TRUST-PANEL-1 merge is on origin/master. -->

## FENCE (read first — overrides everything below)
- OPERATOR lane: NEVER mutate the git repo — no edits/commits, no `git pull`/`fetch`/`checkout`.
  Read-only git (`rev-parse`, `status`, reading files) is fine.
- Migrations via **`supabase db push` ONLY**; `apply_migration`/`execute_sql`-DDL FORBIDDEN.
  `execute_sql` allowed for the read-only SELECTs below. Never echo secrets.
  STOP-and-report verbatim on ANY surprise.

## Step 0 — Repo-state gate (read-only)
```
git rev-parse HEAD
git status --porcelain
ls supabase/migrations | grep 20260709180000
```
Expected: clean status; `20260709180000_backend_trust_audit.sql` present. Report the HEAD hash
verbatim (the Architect cross-checks it against the merge hash). Absent/dirty → STOP.

## Step 1 — Ledger sanity
```
npx supabase migration list
```
Expected: converged through `20260709170000`; exactly ONE pending: `20260709180000`.

## Step 2 — Apply
```
npx supabase db push
```
Plan must list exactly the ONE audit-ledger file. Then `npx supabase db push --dry-run` →
literal `Remote database is up to date.`

## Step 3 — Verify (three legs)
1. **Schema + posture (execute_sql, SELECT-only):**
   - `select count(*) from information_schema.tables where table_name='backend_trust_audit';` → 1
   - `select relrowsecurity from pg_class where relname='backend_trust_audit';` → true
   - `select count(*) from pg_policies where tablename='backend_trust_audit';` → **0**
     (service-role-only both directions — zero client policies is the design)
2. **Unified probe run:**
   ```
   npx vite-node scripts/verifyGrants.ts
   ```
   Expected: **0 failed**, total = previous 33 **+ 3** table probes (BACKENDS ·
   BACKEND_AUTHORITY · BACKEND_TRUST_AUDIT — the first two were exemption-covered before,
   now standard rows) → **36 passed**. Paste the three new probe lines + the final tally.
   Any LEAK/INCONCLUSIVE → STOP with the block verbatim.
3. **Ledger glance (info-only):**
   `select count(*) from public.backend_trust_audit;` → expected 0 (no console writes yet).

## Report
One message: Step-0 → list → push + dry-run literals → the three legs with literal outputs.
All pass → end with: `TRUST-PANEL-1 APPLY: ALL LEGS PASS — 36/36.` Else `STOPPED at <step>`.

<!-- END · cwf-operator-TRUST-PANEL-1-apply-audit-v1 · rev 1 · 2026-07-10 -->
