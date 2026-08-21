# PHASE REPLAY-QUOTA-1 · FIX-2 — Strip residual EXECUTE on the quota RPCs (public + anon + authenticated)
**v1 · 2026-07-07 · anchor = origin/master `a639828` · Author lane (AG) · a REQUIRED forward migration. The
FIX-1 lockdown was insufficient: the Operator applied `20260707160000_user_quotas.sql` and the LIVE schema-read
confirmed `anon` and `authenticated` STILL hold `EXECUTE` on both `SECURITY DEFINER` quota functions.**

<!-- v1 · Root cause: Supabase's pg_default_acl grants EXECUTE on new public-schema functions to anon +
     authenticated BY NAME (explicit grants), not only via PUBLIC. FIX-1 changed the revoke to `from public`
     (dropping the anon/authenticated revoke), which removed only the PUBLIC grant and left the explicit named
     grants intact → the functions remain client-callable. The correct lock revokes from ALL THREE
     (public, anon, authenticated). Because 20260707160000 is now APPLIED (immutable), this is a NEW forward
     migration; do NOT edit the applied file. Do NOT `create or replace` the functions (that re-triggers
     pg_default_acl and re-grants to anon/authenticated). Revokes-only on the live objects. -->

You implement THIS prompt exactly. No re-design, no re-scope. If something seems wrong, STOP and report.

---

## 0. HARD PRE-FLIGHT GATE (all literally true — paste evidence)
1. `git rev-parse origin/master` == `a639828` (fresh clone; if HEAD moved, STOP).
2. `npm ci` clean; **full suite green** — record `Tests N passed` + files (baseline **1205 / 117**).
3. **Drift gate GREEN** (`[OK]`).
4. `git status` clean; branch `master`; merge `--no-ff` (squash BANNED).

## 1. HARD CONSTRAINTS (any violation = rejected)
- **Do NOT edit `supabase/migrations/20260707160000_user_quotas.sql`.** It is APPLIED (immutable). This is a
  NEW forward migration that operates on the already-created live functions.
- **Revokes-only. No `create or replace function`, no function-body change, no table change.** Re-creating the
  functions would re-trigger `pg_default_acl` and re-grant EXECUTE to anon/authenticated. This migration ONLY
  revokes + (idempotently) re-grants to `service_role`.
- **Revoke from all THREE grantees: `public, anon, authenticated`.** Revoking from PUBLIC alone (FIX-1) left the
  explicit named grants; revoking from anon/authenticated alone would leave a PUBLIC grant if present. Revoke
  all three, then grant `service_role` (the app calls these as `service_role` via `getServiceClient()` — a bare
  revoke without the grant fails every replay run closed to 429).
- **One new `.sql` file + a CHANGELOG note. Nothing else.** No `.ts`, no test, no engine/endpoint. Frozen files
  (evalGate, groundingCheck, trustRegistry, prompt/core, resolveAuthHeader, mcpSecrets, chat.ts) untouched.
- **Suite stays 1205 / 117** (grant-layer DDL is not unit-testable here; the live proof is the Operator's
  re-read, next). If any test count changes, STOP and explain.
- **Migration AUTHORED, NOT applied.** You do not apply it (Operator gate).

## 2. THE MIGRATION (exact)
Create `supabase/migrations/20260707170000_user_quotas_execute_lockdown.sql`:

```sql
-- ============================================================================
-- Migration: user_quotas_execute_lockdown  (REPLAY-QUOTA-1 / FIX-2)
--
-- FIX-1 revoked EXECUTE on the two SECURITY DEFINER quota functions from PUBLIC only. The
-- Operator's live schema-read of the applied 20260707160000 confirmed anon + authenticated
-- STILL hold EXECUTE — Supabase's pg_default_acl grants EXECUTE on new public-schema functions
-- to anon + authenticated BY NAME, and revoking PUBLIC does not remove those explicit grants.
--
-- These functions are SECURITY DEFINER (they run as the owner and BYPASS RLS on user_quotas),
-- so the EXECUTE grant is the SOLE gate. While anon/authenticated can EXECUTE, any authenticated
-- user could POST /rest/v1/rpc/replay_quota_settle {p_user_id:<self>, p_reserved:<own consumed>,
-- p_actual:0} to zero their own quota (or reserve against a victim's user_id to drain theirs).
--
-- This migration revokes EXECUTE from ALL client grantees (public + anon + authenticated) and
-- re-grants ONLY service_role (the app's service client). It does NOT re-create the functions
-- (that would re-trigger pg_default_acl). Idempotent.
-- ============================================================================

revoke execute on function public.replay_quota_reserve(uuid, bigint, bigint, bigint) from public, anon, authenticated;
revoke execute on function public.replay_quota_settle(uuid, bigint, bigint)          from public, anon, authenticated;

grant  execute on function public.replay_quota_reserve(uuid, bigint, bigint, bigint) to service_role;
grant  execute on function public.replay_quota_settle(uuid, bigint, bigint)          to service_role;

notify pgrst, 'reload schema';
```

## 3. SEAL
- `.agents/CHANGELOG.md`: a short **FIX-2** note under the REPLAY-QUOTA-1 entry — "FIX-2: the Operator's live
  read of the applied 20260707160000 showed anon+authenticated retained EXECUTE on the SECURITY DEFINER quota
  RPCs (Supabase pg_default_acl grants EXECUTE to anon/authenticated by name; FIX-1's revoke-from-PUBLIC did not
  remove them). New forward migration 20260707170000 revokes EXECUTE from public+anon+authenticated and grants
  service_role only; functions not re-created. **`user_quotas` TABLE is applied; this EXECUTE lockdown is
  authored, Operator-pending.**"
- **No docVersion bump / no diagram redraw** — the diagram already depicts `user_quotas`/its RPCs as
  service-role-only; FIX-2 makes the live grants match. Run `check:doc-drift`: if `[OK]`, CHANGELOG-only; if it
  flags, STOP and report.
- Merge `--no-ff` (squash BANNED). Push; report the remote hash.

## 4. SELF-VERIFICATION (literal evidence)
- [ ] `git rev-parse origin/master` before (`a639828`) → merged HEAD (pushed remote hash).
- [ ] New file present; `grep -n "execute on function" supabase/migrations/20260707170000_user_quotas_execute_lockdown.sql`
      shows `from public, anon, authenticated` on BOTH revokes AND `to service_role` on BOTH grants; and
      `grep -c "create or replace" …170000….sql` == **0** (revokes-only, no re-create).
- [ ] `git diff b6bd150..<HEAD> --stat` — wait, use the correct base: `git diff a639828..<HEAD> --stat` = the
      new migration + CHANGELOG only (2 files). `20260707160000_user_quotas.sql` UNCHANGED.
- [ ] Suite unchanged: **1205 / 117** before and after (paste both).
- [ ] Frozen-file sweep = ZERO.
- [ ] Drift `[OK]`; docVersion still rev 51.
- [ ] Explicit line: **"`user_quotas` TABLE applied; FIX-2 EXECUTE lockdown AUTHORED, NOT applied — Operator gate pending."**

## 5. REPORT FORMAT
The migration pasted; the §4 checklist with literal outputs; the commit ledger (fix → merge, pushed remote
hash); then the "TABLE applied; FIX-2 AUTHORED, NOT applied" line. STOP at the first gate you cannot meet.

<!-- END · claude-code-REPLAY-QUOTA-1-FIX-2-execute-lockdown-all-grantees-v1 · 2026-07-07 · anchor a639828 -->
