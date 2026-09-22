OPERATOR-PROMPT-S155-ITEM65-RETIRED-BACKEND-DISABLE-1

TO: Gemini operator (Supabase MCP)
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
AUTHORITY: owner S155 plan approval "onay", 2026-09-22 18:03 TSI (item 65, F-S154-RETIRED-BACKEND-ENABLED-1). Only the Gemini operator writes CWF tables.
WHY: backend armes-new is lifecycle=retired but enabled=true; "enabled" admits it into mirrors that should skip it.

STEP 1 - READ (print the row):
select id, enabled, lifecycle from backends where id = 'armes-new';
Expected: armes-new | true | retired. Anything else: STOP and print it.

STEP 2 - WRITE (one row, guarded):
update backends set enabled = false where id = 'armes-new' and lifecycle = 'retired' and enabled = true returning id, enabled, lifecycle;
Expected: exactly one row returned: armes-new | false | retired. Zero rows: STOP and print STEP 1 again.

STEP 3 - VERIFY:
select id, enabled, lifecycle from backends order by id;
Print all rows. No other table is touched. No delete. No DDL.

REPLY: paste the three outputs back to the owner verbatim.
END · OPERATOR-PROMPT-S155-ITEM65-RETIRED-BACKEND-DISABLE-1
