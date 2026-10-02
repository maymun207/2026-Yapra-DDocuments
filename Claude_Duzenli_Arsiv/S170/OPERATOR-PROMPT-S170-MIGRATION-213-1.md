OPERATOR-PROMPT-S170-MIGRATION-213-1

TO: Gemini operator (Supabase MCP), on the owner's Mac
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
FROM: Architect, S170, 2026-10-01 19:07 TSİ
AUTHORITY: OWNER-APPROVAL-S170-A (register 213, A26-P1a: the lane authors the migration, only the operator applies it after landing; practice 148).
MEASURED BY THE ARCHITECT (16:05Z): supabase_migrations.schema_migrations newest = 20261001060000. The file below is on master bf3e28374c499b2c243e92b431b6110ae4c290e6 (PR 674, merged 16:03:55Z) and NOT applied.

ONE MIGRATION, ONCE:
  supabase/migrations/20261001070000_machine_trace_label.sql — md5 40ff7b3a987d7a2491eef2b79dc59e3a, 4641 bytes

STEP 1 - GET THE BYTES: in the cwf_yaprak clone run `git fetch origin master`, then `git show origin/master:supabase/migrations/20261001070000_machine_trace_label.sql | md5sum` and `| wc -c`. Both must equal the values above. Print both lines. Any difference: STOP and say which.
STEP 2 - CHECK NOT APPLIED: select version from supabase_migrations.schema_migrations where version = '20261001070000'; → expected 0 rows. Print the count. If a row exists: STOP.
STEP 3 - DRY RUN (S102-YASA-3): from a clean worktree at master — `git worktree add ../cwf-ops-s170b origin/master` (never check out or edit the owner's main working copy); copy the main clone's supabase/.temp link folder into it if `supabase db push` asks for a link — then `supabase db push --dry-run` there. The list must be EXACTLY 20261001070000 and nothing else. Print the list. Anything else listed: STOP.
STEP 4 - APPLY: `supabase db push` in the same worktree. Print the tool's output lines. Any error: STOP, print it verbatim.
STEP 5 - VERIFY: (a) select version from supabase_migrations.schema_migrations where version = '20261001070000'; → 1 row. (b) select count(*) from pg_views where schemaname = 'public' and viewname = 'machine_trace_label'; → 1. (c) select has_table_privilege('anon', 'public.machine_trace_label', 'select'), has_table_privilege('authenticated', 'public.machine_trace_label', 'select'); → false, false. (d) select count(*) from public.machine_trace_label; → any number, printed (a read that errors is a STOP). Print all four.
STEP 6 - CLEAN UP: `git worktree remove ../cwf-ops-s170b`.
STEP 7 - REPLY to the owner, one line per step, nothing else. Never print a secret or an environment value. Run nothing that is not listed here.
END · OPERATOR-PROMPT-S170-MIGRATION-213-1
