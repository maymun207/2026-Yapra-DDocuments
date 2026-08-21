# OPERATOR-TOOL-BEHAVIOR-CENSUS-1A · v1 — Architect → Operator (Gemini)

Migration `20260812200000_tool_behavior_census.sql` merged to master
(`1b7f8dd`) and must now be applied. Fence: project **`fjbrkimwvtpwoxhziidh`**
ONLY — any other project ref appearing in tool output is a fence violation,
stop and report it.

## STANDING LAWS FOR THIS RELAY
- **ADR-005:** `supabase db push` is the ONLY authorised apply method.
  `apply_migration` is forbidden.
- **ADR-002 / lane fence:** you do not touch repo files. `git pull` is a READ
  action and is allowed; nothing else.
- **ADR-007:** never echo a secret value. A silent success path is correct.
- **S93-3 full-disclosure:** report EVERY state-changing call you make,
  including ones that failed or that you decided not to repeat.
- **S94-2 catalogue law:** `information_schema` is privilege-filtered and
  returns an empty set with no error. Every schema check below MUST use
  `pg_catalog` (`pg_class` / `pg_attribute` / `pg_constraint` / `pg_indexes`)
  or DDL text. An empty result from `information_schema` is UNREAD, not zero.

## STEP 0 · FENCE-FIRST (before any write)
Report, from `pg_catalog`:
- the applied-migration count and the ledger top version;
- whether `public.tool_behavior_census` already exists (expected: NO).
If the ledger top is already `20260812200000`, STOP — it is applied; skip to
STEP 3 and report that no push was needed.

## STEP 1 · APPLY
`git pull` on your read-only checkout, then `supabase db push`. Report the
command output verbatim (minus any secret material).

## STEP 2 · G-GATES (all from `pg_catalog`, all reported)
- **G1 · table exists:** `public.tool_behavior_census` present.
- **G2 · shape:** column names + types, and confirm `probed_at` exists.
- **G3 · uniqueness:** the one-row-per-(backend_id, tool_name, via_gateway)
  constraint is present and is a real constraint/index, named.
- **G4 · index:** the `probed_at` index exists (1B's staleness scan depends on
  it; if it is missing, say so plainly rather than inferring it from the
  migration text).
- **G5 · grants:** confirm the table is NOT readable/writable by `public`,
  `anon` or `authenticated`. Report the actual grant rows you read; an empty
  grant read must be declared UNREAD, not "no grants".
- **G6 · idempotence probe:** run `supabase db push` a second time and confirm
  it is a no-op. Report the output.
- **G7 · ledger:** applied count and new ledger top (expected 73 and
  `20260812200000` — but READ them, do not assume).

## STEP 3 · REPORT
One message containing: every command run, every gate's raw reading, and an
explicit line for anything you could NOT read (unread ≠ pass). Do not write
any row into the new table; it is populated by the connect-time census, not
by hand.

>> BLOCK: Operator <<
