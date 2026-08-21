# PHASE REPLAY-QUOTA-1 — Replay Quota Subsystem (B)
**v2 · 2026-07-07 · anchor = origin/master `09efc8e` · Author lane (AG) · design authority =
cwf-phase-B-replay-quota-subsystem-design-v1.md**

<!-- v2 · SUPERSEDES v1. DELTA vs v1 (folded from the A3 Operator-close learnings): §2.1 now (a) adds the
     new table's probe row to scripts/verifyGrants.ts AND (b) adds a CI coverage test so that live-only
     script can never silently drift again (it went 6 tables stale by the A3 window); §2.9 pins seal-time
     doc honesty (sealed docs state "authored, Operator-pending" — never pre-declare "applied"); §3 gains the
     matching checklist lines. Anchor moved 1074→ current master 09efc8e (A3 fully shipped + live-verified). -->

You implement THIS prompt exactly. Do NOT re-design, re-scope, or re-split. If something seems wrong, STOP and
report; do not improvise.

---

## 0. HARD PRE-FLIGHT GATE (all literally true before any write — paste evidence)
1. `git rev-parse origin/master` == `09efc8e` (fresh clone; if HEAD moved, STOP).
2. `npm ci` clean; **full suite green** — record `Tests N passed` + file count (baseline 1144 / 112 files).
3. **Drift gate GREEN** (`[OK]`).
4. `git status` clean; long-lived branch = `master`; merge `--no-ff` (squash BANNED).

## 1. HARD CONSTRAINTS (any violation = rejected)
- **Atomic before spend.** Quota enforcement is a single atomic reserve at the POST seam BEFORE any token is
  spent; a concurrent pair of runs that together exceed the limit → exactly ONE is denied (race test). No
  client-mutable counter — `consumed_tokens` is written ONLY by the service role.
- **REPLAY_RUN unchanged.** The quota is an ADDITIONAL gate after the existing `ensurePermission(REPLAY_RUN)` —
  never a replacement. Both run paths (single + `mode:'ab'`) gated identically.
- **Physical ceiling.** The run's own token budget is CLAMPED to the reserved amount so the engine physically
  cannot spend past the user's remaining quota (no overshoot, even mid-run).
- **Personal-key exemption, forward-safe.** At settle, `isPersonalProviderId(result.provider.resolvedId)` ⇒
  the run consumes 0 quota (fully refund) but is STILL audited (existing audit row unchanged). Unreachable today
  (replay resolves global providers only) — encode correctly; build NO replay-on-personal wiring.
- **Engine additivity.** `tokenBudget?` on the engine is optional; ABSENT ⇒ byte-identical to the anchor.
  Determinism, aggregation, rep loop, audit shape untouched. Prove byte-identical-when-absent.
- **Frozen files byte-identical.** evalGate, groundingCheck, trustRegistry, prompt/core, resolveAuthHeader,
  mcpSecrets, chat.ts — zero changes. Report the sweep.
- **No renamed strings.** Only ADD `QUOTA_MANAGE`.
- **Capability-not-role.** `QUOTA_MANAGE` super-admin-only (lands in `ALL_PERMISSIONS`; NOT in
  `MAKER_PERMISSIONS`/`CHECKER_PERMISSIONS`). Every quota-admin op `ensurePermission(ctx, QUOTA_MANAGE)`.
- **Two-gate migration.** You AUTHOR the migration; you do NOT apply it (Operator lane + schema-read + the
  live `verifyGrants` probe — see §2.1). Sealed docs say **authored, Operator-pending** (§2.9).
- **FULL REVIEW (cost + security):** the migration, `UserQuotasRepository` (the atomic reserve/settle SQL), the
  POST-seam enforcement, the engine clamp, the `replay-quota` endpoint, the permission delta.
- **Diff scope.** Permitted beyond code: `.agents/CHANGELOG.md`, `public/architecture/manifest.json`, the
  governance diagram, `scripts/verifyGrants.ts`, the frontend service/store. Nothing else unexpected.

---

## 2. GATED SUB-PHASES (in order)

### 2.1 — Migration (authored, NOT applied) + live-grant plumbing
`supabase/migrations/20260707<HHMMSS>_user_quotas.sql`:
- `public.user_quotas` — `user_id uuid pk → auth.users on delete cascade`, `monthly_limit_tokens bigint not
  null default <default>`, `no_limit boolean not null default false`, `consumed_tokens bigint not null default
  0`, `period_start timestamptz not null default date_trunc('month', now())`, `updated_at`, `updated_by uuid →
  auth.users on delete set null`; `set_updated_at()` trigger.
- **Service-role-only:** RLS ENABLED, **NO client policy**, `REVOKE select,insert,update,delete,truncate from
  anon, authenticated` (the mcp_secrets posture — the enforcement ledger is never client-mutable). Table +
  column comments stating this.
- `shared/grantPolicy.ts`: classify `user_quotas` = SERVER_ONLY (+ its test).
- **`scripts/verifyGrants.ts` PROBES:** ADD a `user_quotas` probe row (anon UPDATE → 42501). This live-only,
  non-CI script had drifted **6 tables stale** by the A3 window — do NOT add to that drift.
- **Anti-drift CI test (root-cause fix):** add a unit test asserting `PROBES` covers **every**
  `grantPolicy.ts`-classified table (SERVER_ONLY + OWNER_CRUD) — a build guard so the live-only script can
  never silently go stale again. (If backfilling reveals other missing rows, add them; report which.)
- `notify pgrst,'reload schema';`
**Gate:** DDL parses; grantPolicy test + PROBES-coverage test pass; migration NOT applied.

### 2.2 — Capability
`shared/permissions.ts`: add `QUOTA_MANAGE:'quota:manage'` to `PERMISSIONS`; super-admin-only comment; NOT in
`MAKER_PERMISSIONS`/`CHECKER_PERMISSIONS` (enters `ALL_PERMISSIONS` via the super derivation).
**Gate:** test — `hasPermission('super_admin','quota:manage')` true; `('power_user',…)`/`('user',…)` false,
minted through REAL bundles.

### 2.3 — Config constants
`api/cwf/_lib/replay/config.ts`: add `REPLAY_MONTHLY_TOKEN_QUOTA_DEFAULT` (env-overridable, a sensible multiple
of `REPLAY_TOKEN_BUDGET`) + `REPLAY_MIN_RUN_TOKENS` (the deny floor).

### 2.4 — Repository (the atomic core — FULL REVIEW)
`UserQuotasRepository` (service-role):
- `reserve(userId, ceiling) → { allowed; reserved; limit; consumed; noLimit; resetsAt }` — ONE atomic UPSERT
  statement: lazily create the row with the default if absent, roll the period if elapsed (zero consumed,
  advance period_start), compute `b = min(ceiling, remaining)`, and — unless `no_limit` — deny when
  `remaining < REPLAY_MIN_RUN_TOKENS`, else `consumed += b`. `no_limit` ⇒ `reserved = ceiling`, allowed, no
  decrement.
- `settle(userId, reserved, actual)` — atomic `consumed = greatest(0, consumed − reserved + actual)`.
- `get` / `list` / `setLimit(userId, limit|noLimit, actorId)` / `reset(userId, actorId)`.
**Gate:** unit tests — lazy-default upsert; roll-on-new-month zeroes consumed; reserve clamps to remaining;
`no_limit` never denies; sub-floor remaining denies; **concurrency race** (two joint-exceeding reserves →
exactly one allowed); settle refunds unspent; settle floors at 0.

### 2.5 — Engine clamp (additive; byte-identical when absent)
`runReplayExperiment` + `runPairedReplay` (+ request types): optional `tokenBudget?: number`; effective budget =
`min(REPLAY_TOKEN_BUDGET, tokenBudget ?? Infinity)`. Nothing else changes.
**Gate:** test — a below-natural `tokenBudget` aborts the run at it (`aborted.reason==='token_budget'`);
ABSENT ⇒ byte-identical (fixed-seed result equals the pre-change path).

### 2.6 — Enforcement wire-in at the POST seam (FULL REVIEW)
In `api/admin/replay.ts`, after `ensurePermission(REPLAY_RUN)` + body validation, for BOTH branches:
1. `const gate = await quotas.reserve(ctx.userId, REPLAY_TOKEN_BUDGET);`
2. `if (!gate.allowed) return res.status(429).json({ error, limit, consumed, resetsAt });` — NO run.
3. Run with `tokenBudget: gate.reserved`.
4. `const actual = isPersonalProviderId(result.provider.resolvedId) ? 0 : <run total tokens>;`
   `await quotas.settle(ctx.userId, gate.reserved, actual);` (ab total = baseline + perturbed).
5. On a thrown run error → `await quotas.settle(ctx.userId, gate.reserved, 0)` (refund) BEFORE the existing
   error-audit path. The audit insert stays exactly as today.
**Gate:** tests — 429 over quota (no run invoked); reserved budget clamps the engine; settle trues-up;
personal-resolved run settles 0 (still audited); error refunds; `REPLAY_RUN`-denied still 403s before quota.

### 2.7 — Super-admin endpoint (FULL REVIEW)
`api/admin/replay-quota.ts` (`ensurePermission(QUOTA_MANAGE)` on every op):
- **GET** → per-user view: `user_quotas` (consumed/limit/noLimit/resetsAt, current period) + an all-time free
  aggregate of `replay_audit.outcome.tokens.total` by `actor_user_id`.
- **PUT** → `setLimit` (validate numeric `monthly_limit_tokens ≥ REPLAY_TOKEN_BUDGET`, or `no_limit:true`).
- **POST `?reset`** → `reset` (consumed=0, period_start=now).
**Gate:** 403 test (non-super); view leaks only counts; set/reset audited via `updated_by`.

### 2.8 — UI
`QuotaPanel.tsx` (`if (!can(PERMISSIONS.QUOTA_MANAGE)) return null;`), in **GOVERN**: per-user table (user ·
consumed/limit · no_limit · resetsAt · all-time) with set-limit / toggle-no-limit / reset. `adminService`/
`adminStore` gain super-scoped CRUD with the cap load-guard.
**Gate:** rendered evidence 1280 + 1024 (RULE 26); store test asserts the view carries only counts.

### 2.9 — Tests + living-doc reseal
Coverage floor ratchets up. Gate tests mint through REAL bundles. Governance-model diagram: +`quota:manage` row
(super ●) + a "Replay quota (atomic reserve-clamp-settle; personal-key exempt)" note + the `user_quotas` table
row. Bump `docVersion` (rev 51). `.agents/CHANGELOG.md` entry. Drift `[OK]`. Two-commit seal; merge `--no-ff`.
- **Seal-time doc honesty (A3 learning):** the sealed CHANGELOG + diagram state the ACTUAL state at seal =
  **"migration authored, Operator-pending"** — do NOT pre-declare "Operator-applied." The flip to
  "applied + live grant-verified" is a POST-Operator follow-up commit (the A3 `09efc8e` pattern).

---

## 3. SELF-VERIFICATION (literal evidence — NOT "build green")
- [ ] `git rev-parse origin/master` before (`09efc8e`) → merged HEAD (pushed remote hash).
- [ ] Suite: exact before/after `Tests N passed` + file count.
- [ ] `grep quota:manage shared/permissions.ts` — in PERMISSIONS, NOT in MAKER/CHECKER; other strings untouched.
- [ ] Migration DDL pasted: `user_quotas` RLS-on, NO client policy, REVOKE both directions. NOT APPLIED.
- [ ] **`user_quotas` probe row present in `scripts/verifyGrants.ts`; PROBES-coverage test named + passing**
  (report any other tables the coverage test forced you to backfill).
- [ ] Atomic race test + clamp test + byte-identical-when-absent test named + passing.
- [ ] 429-over-quota (no run) + settle-trues-up + personal-exempt-settles-0 (still audited) + error-refund named + passing.
- [ ] `QUOTA_MANAGE` 403 test named + passing.
- [ ] Frozen-file sweep = ZERO. `git diff --stat` pasted; diff scope confirmed.
- [ ] Drift `[OK]`; docVersion == rev 51; **sealed docs say "authored, Operator-pending" (NOT pre-declared applied)**.

## 4. REPORT FORMAT
Section per sub-phase (2.1–2.9) with gate evidence; then §3 checklist with literal outputs; then the commit
ledger (code → doc → merge, pushed remote hash); then an explicit **"MIGRATION AUTHORED, NOT APPLIED — Operator
gate pending (schema-read + verifyGrants live probe)"** line. STOP at the first gate you cannot meet.

<!-- END · claude-code-PHASE-REPLAY-QUOTA-1-replay-quota-subsystem-v2 · 2026-07-07 · anchor 09efc8e · supersedes v1 -->
