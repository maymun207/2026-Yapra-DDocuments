OPERATOR-PROMPT-S170-MIGRATION-209-1

TO: Gemini operator (Supabase MCP), on the owner's Mac
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
FROM: Architect, S170, 2026-10-01 09:20 TSİ
AUTHORITY: OWNER-APPROVAL-S169-PLAN-1 (register 209: the lane authors the migration, only the operator applies it after landing; practice 148).
MEASURED BY THE ARCHITECT (live DB, 06:15Z): supabase_migrations.schema_migrations newest = 20260930060000. The file below is on master ae766b56562717b8ea115b7ef9092e1103c84a66 (PR 671, merged 06:01:22Z) and NOT applied.

ONE MIGRATION, ONCE:
  supabase/migrations/20261001060000_adversary_gate_refuses_pickup_ack.sql — md5 edaecfe52ce25f4200f1fd67ef338877, 7079 bytes

STEP 1 - GET THE BYTES: in the cwf_yaprak clone run `git fetch origin master`, then `git show origin/master:supabase/migrations/20261001060000_adversary_gate_refuses_pickup_ack.sql | md5sum` and `| wc -c`. Both must equal the values above. Print both lines. Any difference: STOP and say which.
STEP 2 - CHECK NOT APPLIED: select version from supabase_migrations.schema_migrations where version = '20261001060000'; → expected 0 rows. Print the count. If a row exists: STOP.
STEP 3 - DRY RUN (S102-YASA-3): from a clean worktree at master — `git worktree add ../cwf-ops-s170 origin/master` (never check out or edit the owner's main working copy); copy the main clone's supabase/.temp link folder into it if `supabase db push` asks for a link — then `supabase db push --dry-run` there. The list must be EXACTLY 20261001060000 and nothing else. Print the list. Anything else listed: STOP.
STEP 4 - APPLY: `supabase db push` in the same worktree. Print the tool's output lines. Any error: STOP, print it verbatim.
STEP 5 - VERIFY: (a) select version from supabase_migrations.schema_migrations where version = '20261001060000'; → 1 row. (b) select position('PICKED-UP' in p.prosrc) > 0 from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname = 'relay_adversary_gate_check'; → one row, true. (c) select has_function_privilege('anon', 'public.relay_adversary_gate_check(text, text, text)', 'execute'), has_function_privilege('authenticated', 'public.relay_adversary_gate_check(text, text, text)', 'execute'); → false, false. Print all three.
STEP 6 - CLEAN UP: `git worktree remove ../cwf-ops-s170`.
STEP 7 - REPLY to the owner, one line per step, nothing else. Never print a secret or an environment value. Run nothing that is not listed here.
END · OPERATOR-PROMPT-S170-MIGRATION-209-1
