# claude-code · Q1-FIX-1 — EXECUTE lockdown, ALL grantees (5 fns) + author-time gate · v1

<!-- claude-code-Q1-FIX-1-execute-lockdown-all-grantees-v1 · rev 1 · 2026-07-09
     Cause (owned by the Architect): the Q-1 phase prompt §3.3(6) cited the PRE-FIX-2
     pattern (20260707160000:188-191, "from public" only) instead of the standing
     FIX-2 all-grantees rule (20260707170000). AG executed the spec exactly; the
     HARDEN-FN-PROBE-1 live gate caught it at the Operator door (4× LEAK + 1× 23503
     INCONCLUSIVE). This fix mirrors REPLAY-QUOTA-1 FIX-2 and adds the author-time
     gate that makes the class unshippable. ONE clarifying question budget; expect zero. -->

## §1 Pre-flight (hard)
1. `git fetch origin && git rev-parse origin/master` → `261c969107ac3b4929499c574da4e2d4a0d1215c`
   (moved → STOP, report).
2. Branch `fix/q1-execute-lockdown` off origin/master; clean tree.
3. Baseline: suite **1501/151**, `check:doc-drift [OK]`.
4. Anchors: `supabase/migrations/20260707170000_user_quotas_execute_lockdown.sql` exists with
   `from public, anon, authenticated` lines; `scripts/verifyGrants.ts` exports
   `SERVICE_ROLE_ONLY_FUNCTIONS` (7 entries).

## §2 Hard constraints
- Applied migrations IMMUTABLE — do NOT edit `20260709160000_…`. ONE new forward migration only.
- **REVOKES-ONLY**: no `create or replace function` anywhere in the fix (re-creation re-triggers
  `pg_default_acl` — the FIX-2 header rationale; cite it).
- No app-code changes, no probe changes (post-fix, `chat_quota_reserve`'s probe flips
  23503 → 42501 by itself: the EXECUTE check fires before the body).
- No reseal expected: migrations/tests/CHANGELOG are unmapped — `check:doc-drift` must stay `[OK]`
  with docVersion **unchanged at rev 56**. ONE commit, merge `--no-ff` after Architect review.
- Sealed docs state the honest incident (spec regression named as the Architect's; the live
  gate's catch named as the system working) — never sanitize.

## §3 The migration — `supabase/migrations/20260709170000_chat_quota_usage_execute_lockdown.sql`
Structural mirror of `20260707170000` (read it first; keep its header shape):
- Header: what happened (Q-1 revoked PUBLIC only; Supabase `pg_default_acl` grants EXECUTE to
  anon+authenticated BY NAME at creation, so the PUBLIC revoke left them live — proacl showed
  `anon=X/postgres, authenticated=X/postgres` on all 5), why it matters (SECURITY DEFINER ⇒
  EXECUTE is the SOLE gate: an authenticated user could zero their own chat ledger via
  `rpc/chat_quota_settle` or read CROSS-USER usage via the three aggregates), the cause line
  ("the Q-1 phase prompt cited the pre-FIX-2 pattern; the HARDEN-FN-PROBE-1 live probe caught
  it at the Operator door — exposure window: minutes, no exploitation evidence"), STATUS:
  authored, Operator-pending.
- Body: for EACH of the five —
  `chat_quota_reserve(uuid, bigint, bigint, bigint)` · `chat_quota_settle(uuid, bigint, bigint)` ·
  `usage_daily_series(uuid, timestamptz, timestamptz)` · `usage_totals_by_user(timestamptz, timestamptz)` ·
  `usage_by_fingerprint(timestamptz, timestamptz)` —
  `revoke execute on function public.<fn>(<sig>) from public, anon, authenticated;`
  then `grant  execute on function public.<fn>(<sig>) to service_role;` (idempotent).
- `notify pgrst, 'reload schema';`

## §4 The author-time gate — `api/cwf/__tests__/migrationFnLockdown.test.ts` (new)
Deterministic CI pin that makes this class unshippable again:
- Import `SERVICE_ROLE_ONLY_FUNCTIONS` from `scripts/verifyGrants.ts` (the SSOT — the existing
  fn-probe coverage test already imports it, follow its pattern).
- Read every `supabase/migrations/*.sql` from disk. For EACH fn in the SSOT, assert that at
  least one file contains a single `revoke execute on function public.<fn>(` statement whose
  grantee list (the text after `from` up to `;`) includes **all three** tokens `public`, `anon`,
  `authenticated` (whitespace-tolerant; statement may span lines).
- Second test: a PUBLIC-only revoke for an SSOT fn WITHOUT an all-grantees revoke elsewhere
  fails — prove it by asserting the helper (extract the matcher into a small pure function in
  the test file) returns false on the literal Q-1 lines and true on the FIX-2 lines (fixture
  strings copied verbatim from the two real migrations).
- Docblock: the incident date + "Supabase pg_default_acl grants anon/authenticated by name;
  revoking PUBLIC is not enough" + pointer to FIX-2 and this FIX.

## §5 CHANGELOG (unsanitized)
New top section `## [2026-07-09] Q1-FIX-1 — chat/usage function EXECUTE lockdown (all grantees)`:
What (the 5 fns were live-EXECUTABLE by anon/authenticated between the Q-1 apply and the
Operator STOP) · Cause (Architect spec regression — prompt cited 20260707160000:188-191
pre-FIX-2 pattern; the standing all-grantees rule existed) · Catch (HARDEN-FN-PROBE-1 three-way
fail-loud: 4× LEAK + 1× 23503 INCONCLUSIVE, Operator STOPPED per fence) · Fix (revokes-only
forward migration, FIX-2 mirror) · Gate (migrationFnLockdown.test.ts — SSOT×migrations corpus
scan) · Status: migration **authored, Operator-pending**.

## §6 Self-verify (literal evidence)
1. Suite total + file count (expect 151→152 files; report exact test delta).
2. `check:doc-drift [OK]`, docVersion literal `rev 56` unchanged, `typecheck:api`+`tsc -b` clean.
3. `grep -c 'from public, anon, authenticated' <new migration>` = **5**;
   `grep -c 'create or replace' <new migration>` = **0**.
4. New test output: both tests named + passing; the negative-fixture assertion shown.
5. `git diff --name-only 261c969..HEAD` — exactly: the new migration · the new test ·
   `.agents/CHANGELOG.md` (+ `.agents/skills/...SKILL.md` ONLY if its Q-1 section's lockdown
   sentence needs the honest one-line amend — if touched, paste the diff).
6. ONE commit sha, branch pushed, remote hash. Do NOT merge — Architect reviews first.

<!-- END · claude-code-Q1-FIX-1-execute-lockdown-all-grantees-v1 · rev 1 · 2026-07-09 -->
