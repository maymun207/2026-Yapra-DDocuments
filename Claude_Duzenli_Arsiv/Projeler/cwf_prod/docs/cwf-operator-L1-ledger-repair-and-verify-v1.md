# CWF — Operator Task: L1 LEDGER REPAIR + LITERAL VERIFY · v1
<!-- cwf-operator-L1-ledger-repair-and-verify-v1 · rev 1 · 2026-07-09 · Architect-authored,
     Operator lane (Gemini + Supabase MCP / CLI). Project ref: fjbrkimwvtpwoxhziidh. -->

## FENCE (read first — these caused the current incident)
- FORBIDDEN in this lane, always: `apply_migration`, `execute_sql` for DDL, ANY repo file
  write (including `.agents/CHANGELOG.md` — doc flips are the Author lane's job), echoing secrets.
- Migrations are applied via **`supabase db push` ONLY**. Ledger fixes via
  **`supabase migration repair` ONLY**.
- If any step below fails or asks something unexpected: STOP and report the literal output.
  Do not improvise an alternative path.

## WHY (context)
The L1 column migration was applied via `apply_migration`, which recorded a PHANTOM ledger
version `20260709144404`. The repo's authored file is `20260709120000_telemetry_config_fingerprint.sql`.
Ledger and repo now disagree. The SCHEMA is correct (column exists; the file is idempotent) —
only the LEDGER needs repair. Do not touch the schema.

## STEPS (in order, paste literal output for each)

1. **Show current ledger state:**
   `supabase migration list` (linked to fjbrkimwvtpwoxhziidh)
   → paste the table. Expected to show `20260709144404` applied remotely and
   `20260709120000` pending/local-only.

2. **Repair — remove the phantom, mark the authored one applied (ledger-only, no DDL):**
   `supabase migration repair --status reverted 20260709144404`
   `supabase migration repair --status applied 20260709120000`

3. **Prove convergence:**
   `supabase migration list` → paste: `20260709120000` must show applied on remote;
   `20260709144404` must be gone/reverted.
   `supabase db push --dry-run` → paste: expected "Remote database is up to date" /
   no pending migrations.

4. **Literal DB verification (reads only — `execute_sql` is fine for SELECT):**
   a. Column exists:
      `select column_name, data_type from information_schema.columns
       where table_name='telemetry_events' and column_name='config_fingerprint';`
   b. System lane row:
      `select id, name from backends where id='system';`
   c. The two published params:
      `select key, status, version, payload->>'value' as value
       from domain_rules where backend_id='system' and kind_id='agent.param'
       order by key;`
      → expected 2 rows (`agent.historyWindowN`, `agent.temperature`), status `published`.

5. **Repo hygiene note (NO ACTION by you):** you edited `.agents/CHANGELOG.md` in the local
   working tree. Leave it exactly as is — do NOT commit, do NOT revert, do NOT touch the repo
   again. The Author lane (AG) will revert your edit and author the proper doc-flip commit.

## REPORT FORMAT
One message: the four literal outputs (1/3/4a/4b/4c + dry-run), each under its step number,
plus a single line confirming step 5 acknowledged. No summaries in place of raw output.

<!-- END · cwf-operator-L1-ledger-repair-and-verify-v1 · rev 1 · 2026-07-09 -->
