OPERATOR-PROMPT-S161-ITEM91-ALTER-ROLE-1

TO: Gemini operator (Supabase MCP), on the owner's Mac
RE-ISSUE OF: OPERATOR-PROMPT-S158-ITEM91-ALTER-ROLE-1 (never run; owner's words 2026-09-26 18:04 TSI). Same steps, same authority, same verifier file. Re-issued at S161 open, 2026-09-28 02:30 TSI (23:30Z), because register row 91 orders it in the first hour of S161.
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
AUTHORITY: OWNER-APPROVAL-S157-BUDGET-AND-ROTATION-1 ("onay bütçe 200/180 + şifre rotasyonu", 2026-09-23 07:04 TSI); role writes under OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (exactly two statements, once; the verifier may appear in YOUR transcript and MCP request only, never on the bus, in a commit or in a lane transcript).
SOURCE: SLIP-LANE-PASSWORD-ROTATION-S157-1 (bus 2026-09-23T05:49:43Z): verifier file ~/.cwf_lane_S157_scram_verifier, mode 600, sha256 prefix cb5b71a73f93.
QUIESCE (ORDER 2.5, Architect-measured): pg_stat_activity usename='cwf_lane' = 0 sessions at 2026-09-27T23:30:05Z; no to_lane order outstanding; role cwf_lane exists.
PRECONDITION: the owner has closed every Claude Code lane window except AG-4 (every other lane, the foreman, every scout) before you start.

STEP 1 - CHECK THE FILE: compute sha256 of ~/.cwf_lane_S157_scram_verifier (the file bytes, one trailing newline removed if present). The first 12 hex must be cb5b71a73f93. Print only those 12 hex. Anything else (file missing, prefix differs): STOP and say which.
STEP 2 - CHECK THE SHAPE: the content starts with SCRAM-SHA-256$4096: . Print only "shape ok" or STOP.
STEP 3 - ALTER (once): ALTER ROLE cwf_lane PASSWORD '<file content>';
STEP 4 - TERMINATE: select pg_terminate_backend(pid) from pg_stat_activity where usename = 'cwf_lane'; print the row count only.
STEP 5 - REPLY to the owner, four lines: the UTC time of STEP 3 to the second (select now() right after it), the 12-hex prefix, "shape ok", the STEP 4 count. Never print the verifier. Nothing else is run.
END · OPERATOR-PROMPT-S161-ITEM91-ALTER-ROLE-1
