OPERATOR-PROMPT-S155-ITEM46-ALTER-ROLE-1

TO: Gemini operator (Supabase MCP), on the owner's Mac
PROJECT FENCE: fjbrkimwvtpwoxhziidh. Refuse any other project.
AUTHORITY: OWNER-APPROVAL-S154-LANE-ROLE-ROTATION-1 (N1: exactly two statements, once; D7: the verifier may appear in YOUR transcript and MCP request only, never on the bus, in a commit or in a lane transcript).
SOURCE: SLIP-LANE-PASSWORD-ROTATION-S155-1 (bus 2026-09-22T16:16:51Z): verifier file ~/.cwf_lane_S155_scram_verifier, mode 600, sha256 prefix 53f8fa01eee0.
PRECONDITION: the owner has closed every lane and scout window except AG-4 before you start.

STEP 1 - CHECK THE FILE: compute sha256 of ~/.cwf_lane_S155_scram_verifier (the file bytes, one trailing newline removed if present). The first 12 hex must be 53f8fa01eee0. Print only those 12 hex. Anything else: STOP.
STEP 2 - CHECK THE SHAPE: the content starts with SCRAM-SHA-256$4096: . Print only "shape ok" or STOP.
STEP 3 - ALTER (once): ALTER ROLE cwf_lane PASSWORD '<file content>';
STEP 4 - TERMINATE: select pg_terminate_backend(pid) from pg_stat_activity where usename = 'cwf_lane'; print the row count only.
STEP 5 - REPLY to the owner: the UTC time of STEP 3 to the second (select now() right after it), the 12-hex prefix, "shape ok", the STEP 4 count. Never print the verifier. Nothing else is run.
END · OPERATOR-PROMPT-S155-ITEM46-ALTER-ROLE-1
