# CWF — Operator Task: Q-1 APPLY (chat-quota migration + param seed + verify) · v2

<!-- cwf-operator-Q1-apply-chat-quota-and-seed-v2 · rev 2 · 2026-07-09
     Lane: Operator (Gemini + Supabase). Runs ONLY after the Architect confirms the
     Q-1 merge is on origin/master. Sequence is strict; STOP on any surprise. -->

## FENCE (read first — these override everything below)
- You are the OPERATOR. You NEVER mutate the git repo — no file edits, no commits, no
  CHANGELOG touches, and no `git pull`/`fetch`/`checkout` (ref/worktree mutations are
  repo writes). Read-only git commands (`rev-parse`, `status`, reading files) are fine.
  Reporting is your only output.
- Migration application is via **`supabase db push` ONLY**. `apply_migration` and any
  `execute_sql` DDL are **FORBIDDEN** (the 2026-07-09 phantom-ledger incident class).
  Ledger fixes, if ever needed, are `supabase migration repair` ONLY — and only when
  this prompt or the Architect explicitly instructs it.
- `execute_sql` is permitted for **read-only SELECTs** in the verification section.
- Never echo secret values (tokens, keys, connection strings). Command names + row
  counts + error codes only.
- On ANY unexpected output (unauthorized, drift warning, a migration you don't
  recognize, a non-empty push plan beyond the ONE file below): **STOP and report
  verbatim**. Do not improvise.

## Pre-req (once per machine/session)
```
npx supabase login --token <SUPABASE_ACCESS_TOKEN from your env — do not print it>
npx supabase link --project-ref fjbrkimwvtpwoxhziidh
```

## Step 0 — Repo-state gate (READ-ONLY — no pull, no checkout, no fetch)
The migration file is read from THIS working tree; AG merged locally, so master should
already be current. Verify, don't mutate:
```
git rev-parse HEAD
git status --porcelain
```
Expected: HEAD = `261c969107ac3b4929499c574da4e2d4a0d1215c` and an EMPTY status.
Any other hash / any dirty line → **STOP and report the outputs verbatim** (syncing the
repo is the Author lane's job, never yours — do NOT run `git pull`).

## Step 1 — Ledger sanity (read-only)
```
npx supabase migration list
```
Expected: local and remote converged through `20260709120000`; exactly ONE local-only
pending entry: `20260709160000_chat_quota_and_usage_analytics`. Anything else → STOP.

## Step 2 — Apply (the ONE door)
```
npx supabase db push
```
Expected plan: exactly the single file `20260709160000_chat_quota_and_usage_analytics.sql`.
If the plan lists anything else → STOP before confirming. After success:
```
npx supabase db push --dry-run
```
Expected literal: `Remote database is up to date.`

## Step 3 — Seed the three quota policy rows (idempotent)
```
node --import tsx scripts/seedAgentParams.ts
```
Expected: the 2 existing L1 rows are SKIPPED (already published); ONLY the 3 new
`quota.chat*` rows insert as published v1. Report the script's summary lines verbatim.

## Step 4 — Verification (all four legs required)
1. **Schema read (execute_sql, SELECT-only):**
   - `select count(*) from information_schema.tables where table_name='user_chat_quotas';` → 1
   - `select proname from pg_proc where proname in ('chat_quota_reserve','chat_quota_settle','usage_daily_series','usage_totals_by_user','usage_by_fingerprint') order by 1;` → all 5 rows
2. **EXECUTE lockdown truth (pg_proc.proacl, NOT information_schema):**
   - `select proname, proacl from pg_proc where proname in ('chat_quota_reserve','chat_quota_settle','usage_daily_series','usage_totals_by_user','usage_by_fingerprint');`
   - PASS = no `=X/` PUBLIC entry and no `anon`/`authenticated` grantee; `service_role=X` present.
3. **Behavioral anon-deny probes (the wired tool):**
   ```
   npx vite-node scripts/verifyGrants.ts
   ```
   Expected: the `user_chat_quotas` table probe DENIED + **7/7 function probes → 42501 PASS**
   (2 replay + 5 new). Any `LEAK` or `INCONCLUSIVE` → STOP and paste the block.
4. **Seeded-row literal read (execute_sql, SELECT-only):**
   - `select key, (payload->>'value') as value, version, status from domain_rules where backend_id='system' and key like 'quota.chat%' order by key;`
   - Expected 3 published v1 rows: chatMinTurnTokens=10000 · chatMonthlyTokensDefault=5000000 · chatTurnCeiling=200000.

## Report format
One message: Step-0 outputs → Step-1 list output → push output + dry-run literal → seed summary →
the four verification legs with literal outputs. If every leg passed, end with:
`Q-1 APPLY: ALL LEGS PASS — ready for Architect DOC-FLIP.` Otherwise: `STOPPED at <step>` + verbatim output.

<!-- END · cwf-operator-Q1-apply-chat-quota-and-seed-v2 · rev 2 · 2026-07-09 -->
