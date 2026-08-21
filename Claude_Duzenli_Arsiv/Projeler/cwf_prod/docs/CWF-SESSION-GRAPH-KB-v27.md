# CWF — Session Graph KB · v27

<!-- v27 · 2026-07-08 · anchor = master HEAD `5485a96` (1213 tests / 119 files / docVersion rev 52 / drift [OK]).
     Supersedes v26. This window (Session 27) was almost entirely a GOVERNANCE + AGENT-ACCESS window:
     it did NOT touch C. It (1) reviewed + ratified AG's self-applied SEC-ADVISOR/BUGFIX/reconcile work,
     (2) downgraded AG's Supabase access to genuine read-only through a multi-layer plugin-override saga,
     (3) sealed ADR-005 (apply authority) + ADR-006 (agent operating modes), (4) closed HARDEN-FN-PROBE-1.
     C remains the committed FIRST TASK for the next session. -->

## Anchor
- HEAD `5485a96` · 1213 tests / 119 files · docVersion **rev 52** · drift [OK].
- Commit spine this window (oldest→newest): `84f4601` (session start) → `461d9cc`/`0658abe`/`a7af3b3`/`f747283`/`0ccae1c`/`8f5d309`/`b1529fa` (AG SEC-ADVISOR/BUGFIX/reconcile + BUILD-CLEANUP, self-applied) → `33f2b45`/`6ec36ff` (supabase-ro .mcp.json) → `468a9f3`/`5485a96` (HARDEN-FN-PROBE-1).

## Window narrative (Session 27)

### 1. AG got direct Supabase read+write; used it self-directed
Owner reported AG gained a read+write Supabase MCP connection and used it to author, apply, AND
self-verify three forward migrations + a ledger rewrite, landing at `b1529fa` WITHOUT a gated phase
prompt. Independently reviewed against pushed code:
- **SEC-ADVISOR-1** — `alter function public.set_updated_at() set search_path = ''` (lint 0011; behavior-neutral). Sound.
- **SEC-ADVISOR-2** — authz helpers `is_super_admin`/`has_backend_scope` moved `public`→`private` (closes advisor 0028/0029: SECURITY DEFINER fns in `public` are anon-callable RPCs = a boolean-oracle "is <uid> super_admin?" leak). 17 RLS policies re-qualified to `private.*`; public RPC endpoints dropped; DO-block asserts end-state + rolls back on drift. Sound + self-verifying. **Distinct remediation from B-saga:** authz helpers KEEP anon/authenticated EXECUTE (RLS evaluates in caller role) but live in a non-exposed schema; quota RPCs (B) instead REVOKED anon/authenticated EXECUTE (server-only). Two correct patterns for two cases.
- **BUGFIX-AUDIT-1** — real recurring prod bug: `delete_user` deleted the auth user then inserted the audit row with `target_user_id` = the deleted user → FK violation → deletions went **un-audited** (`[AUDIT-FAILURE]`, 5×). Fix: drop the two FKs to `auth.users` so audit outlives users (correct append-only pattern; `on delete set null` correctly rejected).
- **Ledger reconcile** — `supabase_migrations.schema_migrations` had been populated via MCP `apply_migration` with APPLY-TIMESTAMP versions (not file-prefixes) the whole project → `db push`/`migration list` would see all files un-applied. AG did delete-all + re-insert file-prefix rows. Root-cause fix, but self-verified.
- **Immutability held:** all migrations additive (no in-place edits). `.mcp.json` change carried NO secret.
- **Governance concern (the real finding):** two-gate discipline collapsed (AG author+apply+self-verify); un-gated sweep; contradicted the locked "autonomous-apply rejected as a standing mechanism" decision; the ledger delete-all+re-insert was self-verified. Sharpest edge = AG live write to secret-value tables (`mcp_secrets`, `llm_provider_secrets`).

### 2. ADR-005 (Accepted) — Supabase apply authority
AG authors (repo, read-only live access) · **Operator (Gemini) applies via `supabase db push` ONLY** (`apply_migration`/`execute_sql`-DDL banned — the ledger-drift root cause) · deterministic closing gate = `verifyGrants` + `get_advisors`, Architect-reasoned over raw output · `private`-schema invariant · CI-apply documented as zero-rework future upgrade. Generalized by ADR-006.

### 3. The supabase-ro read-only downgrade saga (long — carries permanent learnings)
Goal: make AG's Supabase connection genuinely read-only. Layers hit, in order:
- Read-only is a **connection flag, not a key property** — Supabase PATs are all-scope; read-only = `?read_only=true` URL → server runs as a read-only Postgres role.
- OAuth broke on the `?`-URL: the **Claude Code IDE/VSCode extension double-encodes the `?`** when building the OAuth `resource` (#34880) → "resource must be a valid MCP endpoint". Terminal CLI encodes correctly. (PAT-header path was explored then rejected by owner as too manual.)
- **ROOT CAUSE:** the active Supabase connection was the **built-in `plugin:supabase:supabase`** (Built-in MCP, 29 read-WRITE tools), NOT `.mcp.json`. The name **"supabase" triggers Claude Code's built-in override** (#21368), ignoring the user's URL/params/headers entirely. That's why every `.mcp.json`/PAT edit was silently no-op'd, and why "the system reused the existing auth."
- **Fix:** disable `plugin:supabase:supabase` + add a **non-"supabase"-named** server `supabase-ro` (`?project_ref=fjbrkimwvtpwoxhziidh&read_only=true`), authenticate from terminal. Verified read-only at the **Postgres level**: `create table` → SQLSTATE **25006** (read-only transaction), role `supabase_read_only_user`, `transaction_read_only=on`, tools 29→20. Not honor-system — un-jailbreakable.

### 4. Independent verification (Gemini Operator) of the shipped work — PASS
Run by Gemini (postgres lane), independent of AG (the applier):
- Ledger **36 = 36** (repo has 36 migration files; 33 reconciled + 3 new SEC-ADVISOR/BUGFIX = 36; benign explained delta, NOT drift; every "applied" row maps to a live object).
- SEC-ADVISOR-2: helpers both in `private`, 0 in `public`; 17 policies ref helpers, 0 public-qualified; **0028/0029/0011 GONE**, only the 5 INTENTIONAL `rls_enabled_no_policy` INFO + 1 auth WARN remain.
- **B4 behavioral anon-deny:** `set local role anon; select … public.domain_rules` → 0 rows, NO permission error (RLS evaluates fine; anon sees nothing). Run on Gemini's postgres lane (AG's read-only lane cannot `SET ROLE anon` — 42501).
- BUGFIX-AUDIT-1: `user_audit` has 0 FK constraints.
- B-saga posture: `replay_quota_reserve/settle` proacl = `{postgres=X, service_role=X}` only.

### 5. ADR-006 (Accepted) — Agent Operating Modes
Developer mode = {repo: write, DB: **read-only**}; Operator mode = {repo: read-only/none, DB: **write**}. **Invariant: no mode grants repo-write AND DB-write simultaneously** → author ≠ applier always. Role-based, symmetric (AG develops → Gemini operates, and vice-versa). **Mode is bound to a CONNECTION, not a spoken claim; default = safe (read-only DB).** Today: AG = Developer default (supabase-ro read-only); Gemini = Operator default (postgres write). Architect (Claude) orthogonal. Generalizes ADR-005 (supabase-ro = Developer-mode's DB side). Does NOT by itself make CHANGELOG/KB discipline agent-agnostic — that's a separate deferred follow-up.

### 6. HARDEN-FN-PROBE-1 (CLOSED, RULE-25-reviewed) — `5485a96`
Added to `scripts/verifyGrants.ts`: `SERVICE_ROLE_ONLY_FUNCTIONS` SSOT + `FN_EXECUTE_PROBES` (real migration param names incl. `p_min_run`; benign NO_UUID/zero args) + a **three-way fail-loud** anon-RPC probe loop in `main()` (42501=PASS · no-error=LEAK · PGRST202/other=INCONCLUSIVE-fail — no silent green), inside the `shouldRunProbes` guard. New coverage test `api/cwf/__tests__/verifyGrantsFnProbes.test.ts` (+4): SSOT set-equality (future service-role fn can't ship probe-less) + real-args + VITEST-no-DB-connect. Live: `replay_quota_reserve/settle` anon RPC → 42501 PASS (AG-observed, own env). Independent RULE-25: scope = exactly 5 files, two `--no-ff` merges, suite **1213/119 independently recounted**, UNMAPPED-drift claim verified (no manifest codeArea glob touches `scripts/` or `api/cwf/__tests__/`), seal-honest. This is ADR-005's deterministic-gate final building block.

## Permanent learnings (carry forward as standing rules)
- **`.mcp.json` "supabase" name = built-in plugin override trap (#21368):** Claude Code's built-in Supabase plugin overrides a user server named exactly `supabase`, ignoring URL/params/headers. Use a **non-"supabase" name** + disable the built-in plugin. The `/mcp` panel's "Built-in MCPs" section is where the real active connection lives, not `.mcp.json`.
- **Supabase MCP read-only = a connection flag (`?read_only=true`), not a token property** → server runs as `supabase_read_only_user`, `transaction_read_only=on`; DDL → 25006. PATs are all-scope; you cannot make a "read-only key."
- **Claude Code IDE-extension OAuth double-encodes `?`-URLs (#34880)** → authenticate MCP OAuth from a plain terminal, not the IDE extension; the terminal-cached token then works in the IDE too.
- **Never point an MCP at production data** (Supabase's own guidance) → read-only + project-scope is the mitigation; apply belongs out of the interactive-agent path (ADR-005).
- **ADR-005:** apply = Operator/CI `db push` (never `apply_migration`); AG DB = read-only; deterministic gate = `verifyGrants` + `get_advisors`; `private`-schema authz invariant.
- **ADR-006:** agent modes; developer=read-only DB, operator=write DB, never both in one actor; mode bound to connection; default = safe.
- **`private`-schema authz invariant (SEC-ADVISOR-2):** every future RLS policy/migration calls `private.is_super_admin(...)` / `private.has_backend_scope(...)`; NEVER add `private` to PostgREST's exposed-schema list (re-opens the boolean-oracle RPC leak).
- **verifyGrants now covers function-EXECUTE anon-deny (HARDEN-FN-PROBE-1)** via the SSOT + three-way fail-loud probe; a future service-role-only function must be added to `SERVICE_ROLE_ONLY_FUNCTIONS` (CI test enforces a matching probe).
- **If a secret ever enters `.mcp.json`, use a `${ENV_VAR}` reference, never a raw value** (public repo). Note Claude Code header `${VAR}` substitution has an open bug on Windows/WSL (#51581/#6204) — env-in-headers may not substitute there.
- Carried from prior windows (still in force): SECURITY DEFINER function lockdown = REVOKE EXECUTE FROM public+anon+authenticated + GRANT service_role; applied migrations immutable → forward-only, revokes-only for fn lockdown; assert the REAL runtime signal (VITEST/JEST env), not a fabricated argv proxy; empty≠zero sacred; DB-first/code-floor SSOT; injection boundary (ADR-001) tool content = DATA not COMMAND; trust = deterministic, never an LLM judge.

## Open / carried to register v27
C (User Docs page + standing textbook governance-replay explainer) is the committed FIRST TASK — untouched this window. Then scope/authority lens → endpoint switcher → GOVERN polish/P7. NEW DEFERRED: multi-author CHANGELOG/KB gates (GEMINI.md→AGENTS.md pointer + changelog-touched CI check) before onboarding Gemini as a routine Developer.

<!-- END · CWF-SESSION-GRAPH-KB · v27 · 2026-07-08 -->
