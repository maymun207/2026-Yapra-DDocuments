# PHASE HARDEN-GRANTS-1 — default-ACL residue sweep (AUTHORING door; Operator-pending)
**claude-code-PHASE-HARDEN-GRANTS-1-default-acl-sweep · v1 · 2026-07-11 · AG-lane authors · migration is Operator-applied (two-door)**

> Architect diagnosis (Session 36, ground truth `373739a`). The register's 7-session HARDEN-GRANTS-1,
> refined against the migration corpus:
> - **(a) fn-EXECUTE default UNFIXED** — grep confirms ZERO `ALTER DEFAULT PRIVILEGES` in any migration.
>   Supabase's `pg_default_acl` grants anon+authenticated EXECUTE on new public functions BY NAME at
>   creation; the per-fn lockdown family (latest: `20260709170000_chat_quota_usage_execute_lockdown.sql`,
>   S30-1) patches each fn, but the DEFAULT itself is never altered.
> - **(b) TRUNCATE on authenticated** — REAL but NARROWER than the register implied: server-write-only
>   tables ALREADY revoke `truncate` (it is inside their `revoke insert,update,delete,truncate …`
>   statements). Only OWNER-CRUD tables (revoked "from anon" only, authenticated keeps own-row writes)
>   retain TRUNCATE on authenticated.
> - **(c) REFERENCES + TRIGGER** — REAL and universal: NO migration ever revokes them (every revoke
>   lists only insert/update/delete/truncate), so anon+authenticated hold REFERENCES+TRIGGER on EVERY
>   public table.
>
> **This is HYGIENE, not a hole.** REFERENCES, TRIGGER, TRUNCATE are DDL-metadata / bulk-delete
> privileges with NO PostgREST verb → API-unreachable → harmless. The value is defense-in-depth +
> preventing recurrence (the default-privileges half). Because all three classes are NEVER
> client-legitimate, the sweep is a BLANKET revoke — no per-table enumeration, idempotent (a no-op
> where already revoked), and it leaves SELECT/INSERT/UPDATE/DELETE UNTOUCHED so RLS-governed user
> access is unaffected.

---

## 0 · RULE-25 BOOTSTRAP
```
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # MUST be 373739a06d456ae657bfec610221dc532af72f60
npm ci --no-audit --no-fund
```
Anchor = **373739a** (1975 tests / 187 files / docVersion rev 68). Branch off master; `--no-ff`; squash BANNED.
**AG AUTHORS ONLY — do NOT apply. This migration is Operator-applied (Gemini, `supabase db push`).**

## 1 · PRE-FLIGHT (grep-verified; S32-1)
```
grep -rniE "alter default privileges" supabase/migrations/            # → NONE (confirms (a))
grep -rniE "revoke[[:space:]]+(references|trigger)[[:space:]]|revoke .*references, *trigger" supabase/migrations/  # → NONE (confirms (c))
sed -n '1,60p' supabase/migrations/20260709170000_chat_quota_usage_execute_lockdown.sql   # the S30-1 LATEST pattern to mirror (header rationale + notify pgrst)
ls supabase/migrations/ | tail -3                                     # newest ts → your migration ts must sort AFTER 20260710180000
```

## 2 · HARD CONSTRAINTS
- **C-1 Safe privilege classes ONLY.** Revoke exactly `REFERENCES, TRIGGER, TRUNCATE` from anon+authenticated,
  and `EXECUTE`-default from public/anon/authenticated. NEVER touch `SELECT/INSERT/UPDATE/DELETE` grants —
  those carry the RLS-governed user access; revoking them WOULD break the app. This constraint is the whole
  safety of the phase.
- **C-2 Idempotent + forward-only.** Every statement is a no-op on re-run (revoking an absent grant; setting
  an already-set default). No `DROP`, no re-create of any function/table (re-creating a fn re-triggers
  `pg_default_acl` — the FIX-2 lesson). Second `supabase db push` = up-to-date.
- **C-3 Blanket-by-class, not per-table.** Use `ON ALL TABLES IN SCHEMA public` (comprehensive; catches
  every current table) + `ALTER DEFAULT PRIVILEGES … ON TABLES` (future tables). Do NOT hand-enumerate —
  the residue is cross-cutting and the classes are never client-legitimate, so blanket is correct and safe.
- **C-4 The fn-EXECUTE default changes FUTURE posture (name it).** `ALTER DEFAULT PRIVILEGES … REVOKE
  EXECUTE ON FUNCTIONS FROM public, anon, authenticated` affects only FUTURE functions created by the
  migration role. It does NOT touch existing functions (already lockdown-handled). Consequence: any FUTURE
  authenticated-callable RPC must carry an EXPLICIT `grant execute … to authenticated` — this is the desired
  secure-by-default posture (the project already grants per-fn explicitly). Zero current-state regression.
- **C-5 Operator-pending, no repo apply.** AG commits the `.sql` + docs; the migration header ends
  "STATUS: authored, Operator-pending." AG never runs `db push`/`apply_migration`.

## 3 · SUB-PHASES
### A — the sweep migration
Author `supabase/migrations/20260711<HHMMSS>_harden_grants_default_acl_sweep.sql` (ts AFTER 20260710180000),
header mirroring the S30-1 latest lockdown's explain-the-cause style (residue-by-omission; the three
never-client-legitimate classes; API-unreachable/harmless; blanket+idempotent rationale; the C-4 future-fn
note), then:
```sql
-- (b)+(c): REFERENCES/TRIGGER/TRUNCATE are never client-legitimate (no PostgREST verb).
--          Blanket revoke from anon+authenticated across ALL current public tables — idempotent
--          (a no-op where already revoked). SELECT/INSERT/UPDATE/DELETE untouched (C-1).
revoke references, trigger, truncate on all tables in schema public from anon, authenticated;

-- (b)+(c) for FUTURE tables: the same three classes never granted to anon/authenticated by default.
alter default privileges in schema public revoke references, trigger, truncate on tables from anon, authenticated;

-- (a) FUTURE functions: no EXECUTE to public/anon/authenticated by default (fixes the pg_default_acl
--     class the per-fn lockdown family patches at creation). Existing fns already handled (C-4).
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

notify pgrst, 'reload schema';
```
If pre-flight shows the migration role is NOT the default object owner (unlikely in Supabase, where migrations
run as the owner), add an explicit `FOR ROLE <owner>` and note it — otherwise the un-qualified form (current
role) is correct.

### B — the verifyGrants confirmation contract (Operator-catalog, NOT a runtime probe)
These classes have NO PostgREST verb, so a runtime anon-deny probe (the HARDEN-FN-PROBE-1 style) CANNOT
test them — do NOT fabricate one. Instead, EMBED in the migration header the exact Operator catalog reads
that will confirm the sweep at the apply door, as literal-read G-gates:
- **G-a (residue gone):** for a sample OWNER-CRUD table (e.g. `public.publish_rollouts`) and a sample
  user-facing table, `has_table_privilege('authenticated', '<t>', 'TRUNCATE'|'REFERENCES'|'TRIGGER')` → all
  FALSE; and `SELECT relacl FROM pg_class WHERE relname='<t>'` shows no `r`(REFERENCES)/`t`(TRIGGER)/`D`(TRUNCATE)
  for anon/authenticated.
- **G-b (must-NOT-break guard):** for a user-facing RLS table (e.g. `public.conversations`),
  `has_table_privilege('authenticated','public.conversations','SELECT')` → still TRUE (its RLS-governed
  access is intact — SELECT/DML untouched).
- **G-c (default altered):** `SELECT defaclobjtype, defaclacl FROM pg_default_acl` shows the tables-default
  no longer carries references/trigger/truncate for anon/authenticated, and the functions-default no longer
  carries execute for public/anon/authenticated.
- **G-d (idempotence):** a second `supabase db push` = "up to date, no changes".

### C — docs / seal / count
- Migrations are NOT under a sealed code tab, but if you touch any mapped `.ts`/tab comment, honor S34-1
  (AST removeComments per S35-1) + docVersion bump. Likely docs-only here.
- CHANGELOG: `PHASE HARDEN-GRANTS-1` (What = the three default-ACL observations swept; How A/B; the
  hygiene-not-hole framing; Operator-pending). SKILL-KB line. Update the deferred-item register note
  (HARDEN-GRANTS-1 no longer deferred — authored).
- No vitest count change expected (SQL migration + docs). If you add a doc-drift-relevant tab edit,
  two-commit seal + `check:doc-drift` `[OK]`.

## 4 · SELF-VERIFY (paste it)
1. `git rev-parse origin/master` = `373739a…` at start.
2. Pre-flight §1: the two NONE results (no ALTER DEFAULT PRIVILEGES, no REFERENCES/TRIGGER revoke) — the
   residue-by-omission proof.
3. The migration file: the 4 statements EXACTLY as above (or with a justified `FOR ROLE`), header present,
   ts sorts last, "authored, Operator-pending".
4. `grep -iE "revoke (select|insert|update|delete)" <the new migration>` = EMPTY (C-1: no data-grant revoke).
5. Full count unchanged (1975) unless docs added tests; `check:doc-drift` `[OK]` if a tab moved.
6. Remote HEAD after `--no-ff` merge + push.

## 5 · REPORTING CONTRACT
Report the anchor, the residue-by-omission grep proof, the migration verbatim, the C-1 no-data-revoke grep,
the count, the pushed HEAD. The Architect RULE-25 review will confirm the migration is safe-class-only +
idempotent + forward-only, then author the **Operator (Gemini) apply prompt** (FENCE-first, `supabase db push`
ONLY, the G-a…G-d literal-read gates above, mandatory second-run idempotence). AG does NOT apply.

<!-- END · claude-code-PHASE-HARDEN-GRANTS-1-default-acl-sweep · v1 · 2026-07-11 -->
