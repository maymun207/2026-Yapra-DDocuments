OPERATOR-PROMPT-S163-MIGRATIONS-1

TO: Gemini operator (Supabase MCP), on the owner's Mac
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
FROM: Architect, S163, 2026-09-29 09:15 TSİ
AUTHORITY: OWNER-APPROVAL-S163-PLAN-1 (items 3 and 4: land PR 635's content and the scout loop; each landed migration is applied by the operator after landing — the two-door rule written in each file's own header).
MEASURED BY THE ARCHITECT (live DB, 06:10Z): supabase_migrations.schema_migrations newest = 20260917070000; public.golden_specimens has NO exam_set / acceptable column; public.scout_reply has the OLD signature (p_reply_to uuid, p_artifact_name text, p_body text). Both files below are on master ee12161ecad43b338489e85fcb73df1e08aa8ac0 and NOT applied.

TWO MIGRATIONS, IN THIS ORDER, EACH ONCE:
  A · supabase/migrations/20260928180000_golden_specimens_exam_set.sql — md5 387add04ab57cc7ec5dd8259031ae36a, 3463 bytes (PR 635)
  B · supabase/migrations/20260929030000_scout_addresses_and_reply_ack.sql — md5 8e41515c4d5199dd8f091f4af79ab1da, 14591 bytes (PR 636)

STEP 1 - GET THE BYTES: in the cwf_yaprak clone run `git fetch origin master` then for each file `git show origin/master:<path> | md5sum` and `| wc -c`. Both must equal the values above. Print the two md5 lines. Any difference: STOP and say which.
STEP 2 - CHECK NOT APPLIED: select version from supabase_migrations.schema_migrations where version in ('20260928180000','20260929030000'); → expected 0 rows. Print the count. If a row exists: STOP.
STEP 3 - DRY RUN (S102-YASA-3: the plan is read before it runs): from a clean worktree at master — `git worktree add ../cwf-ops-s163 origin/master` (never check out or edit the owner's main working copy), copy the main clone's supabase/.temp link folder into it if `supabase db push` asks for a link — then `supabase db push --dry-run` there. The listed migrations must be EXACTLY A then B and nothing else. Print the list. Anything else listed: STOP.
STEP 4 - APPLY: `supabase db push` in the same worktree (applies A then B under their own file versions). Print the tool's output lines. If B raises (its DO block raises unless exactly one constraint matches): STOP, print the error verbatim.
STEP 5 - VERIFY A: select column_name from information_schema.columns where table_schema='public' and table_name='golden_specimens' and column_name in ('exam_set','acceptable'); → expected 2 rows. And select version from supabase_migrations.schema_migrations where version in ('20260928180000','20260929030000'); → expected 2 rows. Print both.
STEP 6 - VERIFY B: (a) select pg_get_function_identity_arguments(p.oid) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public' and p.proname='scout_reply'; → expected ONE row containing p_from. (b) select lane_addr, state from public.factory_state where lane_addr in ('scout-1','scout-2'); → expected 2 rows. Print both.
STEP 7 - CLEAN UP: `git worktree remove ../cwf-ops-s163`.
STEP 8 - REPLY to the owner, one line per step, nothing else. Never print a secret or an environment value. Run nothing that is not listed here.
END · OPERATOR-PROMPT-S163-MIGRATIONS-1
