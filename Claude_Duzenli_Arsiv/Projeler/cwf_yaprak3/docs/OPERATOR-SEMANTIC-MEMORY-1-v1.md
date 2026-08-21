# OPERATOR-SEMANTIC-MEMORY-1 · v1 — ONE migration, push-only, three-way probe

<!-- OPERATOR-SEMANTIC-MEMORY-1-v1 · 2026-08-08 · S87 · Architect → Operator
     (Gemini + Supabase MCP). Scope: apply EXACTLY ONE migration for
     PHASE-SEMANTIC-MEMORY-1 (AG-1, branch phase/semantic-memory-1, code head
     84b9150f). ADR-005: `supabase db push` is the ONLY method — never
     apply_migration, never raw SQL for the apply. Fence: no repo writes, no
     governed-table writes, never echo secrets (ADR-007: silent success paths
     are correct). Project: fjbrkimwvtpwoxhziidh. -->

## STEP 0 — PRECONDITION
Pull the migration file from the branch (read-only):
`supabase/migrations/20260808120000_semantic_memory.sql` at commit `84b9150f`.
Confirm your local migrations dir matches production history (67 applied) before
adding this file. If history disagrees, STOP-AND-REPORT the diff — never repair.

## STEP 1 — APPLY (push-only)
`supabase db push` → expect exactly ONE new migration applied:
`20260808120000_semantic_memory`. Paste the push output (it contains no secrets).

## STEP 2 — IDEMPOTENCE PROBE
Run `supabase db push` a SECOND time → expected: zero pending, zero writes
("Remote database is up to date."). Paste the line.

## STEP 3 — verifyGrants THREE-WAY PROBE (the standing security rule)
Run the repo's `npm run verify:grants` (or `npx tsx scripts/verifyGrants.ts`)
with the ANON key context it requires. Expected for `semantic_memory`:
**42501 = PASS** on every probed operation. Classification is three-way and
never silent-green: 42501 → PASS · no-error → **LEAK (STOP-AND-REPORT)** ·
PGRST202/42703/other → **INCONCLUSIVE (fail, STOP-AND-REPORT)**. Paste the
`semantic_memory` block of the output verbatim (no keys appear in it).

## STEP 4 — SHAPE READS (evidence, read-only)
```
select count(*) from public.semantic_memory;                       -- expect 0
select relrowsecurity from pg_class where relname='semantic_memory'; -- expect t
select count(*) from pg_policies where tablename='semantic_memory';  -- expect 0
```
Paste all three results.

## REPORT
One block back through the owner: push output · second-push line · verifyGrants
`semantic_memory` block · the three shape reads. Then STOP — the merge and
everything after it is the AG-1 lane's, gated on this report.

<!-- END · OPERATOR-SEMANTIC-MEMORY-1-v1 -->
