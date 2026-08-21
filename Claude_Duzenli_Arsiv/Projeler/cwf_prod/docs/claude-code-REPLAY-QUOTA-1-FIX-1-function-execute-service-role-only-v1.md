# PHASE REPLAY-QUOTA-1 · FIX-1 — Lock the quota RPCs to service-role-only (EXECUTE from PUBLIC)
**v1 · 2026-07-07 · anchor = origin/master `b6bd150` · Author lane (AG) · a REQUIRED pre-apply correction to
the STILL-UNAPPLIED migration `supabase/migrations/20260707160000_user_quotas.sql` (REPLAY-QUOTA-1 / B).**

<!-- v1 · Caught in the RULE-25 review of B (b6bd150). The two SECURITY DEFINER functions revoke EXECUTE only
     from anon+authenticated, NOT from PUBLIC. Postgres grants EXECUTE to PUBLIC by default on function
     creation; anon/authenticated inherit it through PUBLIC, so the revoke is a NO-OP and both RPCs stay
     client-callable. Because they are SECURITY DEFINER (RLS-bypass), an authenticated user can POST
     /rest/v1/rpc/replay_quota_settle {p_user_id:<self>, p_reserved:<own consumed>, p_actual:0} to zero their
     own consumed_tokens → total quota bypass. The migration is authored-NOT-applied (verified: origin/master
     b6bd150 has no apply anywhere), so the fix is an in-place edit of the unapplied file. -->

You implement THIS prompt exactly. Do NOT re-design, re-scope, or touch anything outside the two lines named
below plus the CHANGELOG note. If something seems wrong, STOP and report.

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any write — paste evidence)
1. `git rev-parse origin/master` == `b6bd150` (fresh clone; if HEAD moved, STOP).
2. `npm ci` clean; **full suite green** — record `Tests N passed` + file count (baseline **1205 / 117**).
3. **Drift gate GREEN** (`[OK]`).
4. `git status` clean; long-lived branch = `master`; merge `--no-ff` (squash BANNED).
5. **Confirm the migration is UNAPPLIED anywhere** — this correction edits the source of a migration that has
   never run (no live rollback). If you have ANY evidence it was already applied to a live DB, STOP and report.

## 1. HARD CONSTRAINTS (any violation = rejected)
- **One file, two logical lines + comment.** The ONLY code change is inside
  `supabase/migrations/20260707160000_user_quotas.sql`, at the EXECUTE-hardening block for the two functions.
  No other `.sql`, no `.ts`, no test, no engine, no endpoint touched.
- **Revoke from PUBLIC, then re-grant to service_role.** Revoking EXECUTE from PUBLIC removes it from EVERY
  non-owner role including `service_role` — but the app calls these RPCs as `service_role` (via
  `getServiceClient()` / the service key). So you MUST re-grant EXECUTE to `service_role`, or every replay run
  fails-closed to 429. Both revoke AND grant are required; a bare revoke-from-public is a regression.
- **Frozen files byte-identical.** Unchanged from B: evalGate, groundingCheck, trustRegistry, prompt/core,
  resolveAuthHeader, mcpSecrets, chat.ts — zero changes. This FIX touches none of them.
- **No behavior/test change.** The suite must stay **1205 / 117** (grant-layer DDL is not unit-testable here;
  the behavioral proof is the Operator's live read, next). If any test count changes, STOP and explain.
- **Migration STILL authored, NOT applied.** You do not apply it. Sealed docs keep saying
  "authored, Operator-pending."

---

## 2. THE CHANGE (exact)

In `supabase/migrations/20260707160000_user_quotas.sql`, the current EXECUTE-hardening block is:

```sql
-- ── EXECUTE hardening: only the service role may run the ledger functions ─────
-- SECURITY DEFINER runs as the function owner, but EXECUTE must still be revoked from the
-- client roles so a browser can never invoke the reserve/settle RPCs directly.
revoke execute on function public.replay_quota_reserve(uuid, bigint, bigint, bigint) from anon, authenticated;
revoke execute on function public.replay_quota_settle(uuid, bigint, bigint) from anon, authenticated;
```

Replace that block with (revoke from **PUBLIC** — which subsumes anon/authenticated — then re-grant to
`service_role` so the app's service client can still call them):

```sql
-- ── EXECUTE hardening: ONLY the service role may run the ledger functions ─────
-- These are SECURITY DEFINER (they run as the owner and BYPASS RLS on user_quotas), so the
-- ONLY thing gating a client from mutating the ledger is the EXECUTE grant. Postgres grants
-- EXECUTE to PUBLIC by default on function creation, and anon/authenticated inherit it through
-- PUBLIC — so revoking from anon/authenticated alone is a NO-OP. We revoke from PUBLIC (which
-- covers every client role) and then re-grant EXECUTE to service_role only, because the app
-- calls these RPCs as service_role (getServiceClient / the service key). Result: a browser
-- (anon OR authenticated) can never invoke reserve/settle via PostgREST RPC; the service role
-- still can. Without this, an authenticated user could POST /rest/v1/rpc/replay_quota_settle
-- {p_user_id:<self>, p_reserved:<own consumed>, p_actual:0} and zero their own quota.
revoke execute on function public.replay_quota_reserve(uuid, bigint, bigint, bigint) from public;
revoke execute on function public.replay_quota_settle(uuid, bigint, bigint) from public;
grant  execute on function public.replay_quota_reserve(uuid, bigint, bigint, bigint) to service_role;
grant  execute on function public.replay_quota_settle(uuid, bigint, bigint) to service_role;
```

Leave the header comment on the reserve function (the "EXECUTE revoked from anon+authenticated" phrasing in
its `comment on function …` string) consistent — update it to say "service-role-only (EXECUTE revoked from
PUBLIC; granted to service_role)" so the stored comment does not misstate the lock. Same for the settle
function's comment. Those two `comment on function` strings are the only other allowed edits in the file.

## 3. SEAL
- `.agents/CHANGELOG.md`: a short **FIX** note under the REPLAY-QUOTA-1 entry (or a dated FIX line) —
  "FIX-1: the quota RPCs' EXECUTE was revoked from anon/authenticated only, not PUBLIC (a no-op against the
  default PUBLIC grant); corrected to revoke from PUBLIC + grant to service_role so the SECURITY DEFINER
  reserve/settle functions are truly service-role-only. Migration still authored, Operator-pending."
- **No docVersion bump / no diagram redraw expected** — the governance diagram already states `user_quotas` is
  "service-role-ONLY … REVOKE-all"; this FIX makes the DDL match that claim (it does not change the depicted
  contract). Run `check:doc-drift`: if it stays `[OK]`, CHANGELOG-only. If it flags, STOP and report (do not
  redraw without confirming why a mapped area moved).
- Merge `--no-ff` (squash BANNED). Push; report the remote hash.

## 4. SELF-VERIFICATION (literal evidence)
- [ ] `git rev-parse origin/master` before (`b6bd150`) → merged HEAD (pushed remote hash).
- [ ] `grep -n "execute on function" supabase/migrations/20260707160000_user_quotas.sql` — shows `from public`
      on BOTH revokes AND `to service_role` on BOTH grants; no `from anon, authenticated` execute line remains.
- [ ] Suite unchanged: **1205 / 117** before and after (paste both).
- [ ] Frozen-file sweep = ZERO. `git diff --stat b6bd150..<HEAD>` = the migration file + CHANGELOG only.
- [ ] Drift `[OK]`; docVersion still rev 51; sealed docs still say "authored, Operator-pending".
- [ ] Explicit line: **"MIGRATION STILL AUTHORED, NOT APPLIED — Operator gate pending."**

## 5. REPORT FORMAT
The change block pasted; the §4 checklist with literal outputs; the commit ledger (fix → merge, pushed remote
hash); then the "MIGRATION STILL AUTHORED, NOT APPLIED" line. STOP at the first gate you cannot meet.

<!-- END · claude-code-REPLAY-QUOTA-1-FIX-1-function-execute-service-role-only-v1 · 2026-07-07 · anchor b6bd150 -->
