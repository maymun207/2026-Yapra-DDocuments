# OPERATOR RELAY · LEARNING-SNAPSHOT-1 · v1

>> BLOCK: Operator <<

Scope: apply ONE migration, then run the S93-1 BIRTH PROOF (owner-ratified
R-2). You touch the DATABASE ONLY — no repo contact, no governed-table writes,
no secret ever echoed (ADR-007: silent success paths are correct).
PRECONDITION: AG-1's LEARNING-SNAPSHOT merge is on origin/master (the owner
relays this to you only after that).

## G1 · FENCE-first
Confirm your working context is the Supabase project `fjbrkimwvtpwoxhziidh`
and that you will use `supabase db push` — `apply_migration` is BANNED
(ADR-005). If push would apply anything OTHER than
`20260811120000_learning_snapshots.sql`, STOP and report the list.

## G2 · Apply + idempotence
1. `supabase db push` → expect exactly the one migration applied, exit 0.
2. `supabase db push` again → expect "no migrations to apply" / notices only
   (idempotence probe). Any error text: report VERBATIM minus secrets.

## G3 · verifyGrants + HARDEN-FN-PROBE-1
Run the grants verification incl. the new rows. For each of the three
functions (`learning_snapshot_take` · `learning_wipe` · `learning_restore`)
the anon/authenticated EXECUTE probe must classify: 42501 = PASS ·
no-error = **LEAK (STOP, report)** · PGRST202/other = INCONCLUSIVE-fail.
Never silent-green. Also confirm `learning_snapshots` SELECT is revoked from
anon AND authenticated (all-grantees pattern).

## G4 · S93-1 BIRTH PROOF part 1 — snapshot (read-only in effect)
```sql
select learning_snapshot_take('s93-birth', <your-operator-actor-uuid>);
```
Record the returned manifest. Then read live counts of the six tables
(episodes · semantic_memory · entity_registry · router_proposals ·
backend_authority · tool_category_cache) and confirm manifest = live, 6/6.
Mismatch ⇒ STOP, report both maps.

## G5 · S93-1 BIRTH PROOF part 2 — restore from that same snapshot
Owner consent for this data-changing step is ALREADY RATIFIED (R-2). Healthy
outcome = the layer is byte-identical afterwards.
```sql
select learning_restore(<the-snapshot-id-from-G4>, <actor-uuid>);
```
Then: (a) re-read the six live counts — must equal G4's, 6/6; (b) confirm ONE
epoch bump on the routing cache meta row per act (take does not bump; wipe
inside restore bumps once); (c) confirm the ledger rows exist —
`routing_audit` action 'clear' with `deletedCount`+`pinnedDeleted`, and
`memory_audit` rows for wipe+restore, the restore row naming the snapshot id.
Any count unreadable or unequal ⇒ report the exact maps; do NOT retry
restore on your own.

## G6 · Report back (paste to the owner)
A short table: push #1 result · push #2 result · 3× probe classification ·
G4 manifest-vs-live 6/6 · G5 counts-equal 6/6 · epoch before/after · ledger
row ids. Secrets: none, ever.

TAIL: OPERATOR LEARNING-SNAPSHOT-1 v1 — apply + birth proof
