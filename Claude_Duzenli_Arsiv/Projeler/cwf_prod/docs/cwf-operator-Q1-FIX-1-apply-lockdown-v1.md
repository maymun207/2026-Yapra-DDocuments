# CWF — Operator Task: Q1-FIX-1 APPLY (execute lockdown) + re-verify · v1

<!-- cwf-operator-Q1-FIX-1-apply-lockdown-v1 · rev 1 · 2026-07-09
     Runs ONLY after the Architect confirms the Q1-FIX-1 merge is on origin/master. -->

## FENCE (read first — overrides everything below)
- OPERATOR lane: you NEVER mutate the git repo — no edits/commits, no `git pull`/`fetch`/
  `checkout`. Read-only git (`rev-parse`, `status`, `log`, reading files) is fine.
- Migration application via **`supabase db push` ONLY**. `apply_migration` / `execute_sql` DDL
  **FORBIDDEN**. `execute_sql` allowed for read-only SELECTs below.
- Never echo secret values. STOP-and-report verbatim on ANY surprise.

## Step 0 — Repo-state gate (read-only)
```
git rev-parse HEAD
git status --porcelain
ls supabase/migrations | grep 20260709170000
```
Expected: a clean status, and `20260709170000_chat_quota_usage_execute_lockdown.sql` present.
Report the HEAD hash verbatim (the Architect cross-checks it). File absent / dirty → STOP.

## Step 1 — Ledger sanity
```
npx supabase migration list
```
Expected: converged through `20260709160000`; exactly ONE local-only pending:
`20260709170000`. Anything else → STOP.

## Step 2 — Apply
```
npx supabase db push
```
Plan must list exactly the ONE lockdown file. Then:
```
npx supabase db push --dry-run
```
Expected literal: `Remote database is up to date.`

## Step 3 — Re-verify (three legs)
1. **proacl truth (execute_sql, SELECT-only):**
   `select proname, proacl from pg_proc where proname in ('chat_quota_reserve','chat_quota_settle','usage_daily_series','usage_totals_by_user','usage_by_fingerprint') order by 1;`
   PASS = every row's proacl contains ONLY `postgres=X/postgres` and `service_role=X/postgres`
   (NO anon, NO authenticated, NO `=X/` PUBLIC entry).
2. **Behavioral probes:**
   ```
   npx vite-node scripts/verifyGrants.ts
   ```
   Expected: **33 passed / 0 failed** — including `FN-EXEC anon chat_quota_reserve → 42501`
   (yesterday's 23503 must be GONE: the EXECUTE check now fires before the body).
3. **Ledger tamper glance (info-only):**
   `select count(*) as rows, coalesce(sum(consumed_tokens),0) as consumed from public.user_chat_quotas;`
   Report the two numbers (exposure-window sanity; no action either way).

## Report
One message: Step-0 outputs → migration list → push + dry-run literals → proacl dump →
the full verifyGrants tail → the glance numbers. All pass → end with:
`Q1-FIX-1 APPLY: ALL LEGS PASS — 33/33.` Else `STOPPED at <step>` + verbatim.

<!-- END · cwf-operator-Q1-FIX-1-apply-lockdown-v1 · rev 1 · 2026-07-09 -->
