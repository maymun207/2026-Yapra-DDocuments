# Claude Code Phase — HARDEN-FN-PROBE-1: function-EXECUTE anon-deny probe in verifyGrants
**v1 · 2026-07-08 · Architect-authored · SECURITY-ARTIFACT touch (verifyGrants) → FULL review**

You are AG (Author lane). Implement exactly this spec — do not redesign it, do not widen scope. If one
design detail is genuinely ambiguous, ask ONE clarifying question, then proceed. This touches
`scripts/verifyGrants.ts`, an enforcement/security artifact — additive only, no change to existing
behavior.

## Why (context, do not skip)
`verifyGrants.ts` today proves anon **table UPDATE** is denied (42501). It has **no** probe for
**function EXECUTE**. But the B / REPLAY-QUOTA-1 FIX-1 leak was exactly a function-EXECUTE grant left
on anon/authenticated — a class the table-UPDATE probes structurally cannot catch. FIX-2 revoked
EXECUTE from public+anon+authenticated and granted only `service_role`. This phase adds a deterministic
probe that proves that lockdown holds against the REAL DB, plus a coverage test so a future
service-role-only function can't silently ship without a probe. This is the deterministic closing-gate
piece named in ADR-005.

## HARD PRE-FLIGHT (all must hold before writing code)
1. Fresh clone `origin/master`; `git rev-parse origin/master` — record the HEAD (expected current:
   `b1529fa` or later). Record test-file count (expected 118), `docVersion` (from
   `public/architecture/manifest.json`), and confirm **drift gate green** (`npm run build` → the
   `check:doc-drift` step at the end passes). If drift is red, STOP and report — do not proceed.
2. Run the suite once to get the baseline count: `npm ci --no-audit --no-fund --silent` then
   `npx vitest run --reporter=dot 2>&1 | tail -5`. Record the exact pass count (expected 1209).
3. Read `scripts/verifyGrants.ts` in full. Confirm the anchors you will build around:
   `PROBES` (table anon-UPDATE probes), `PROBES_COVERAGE_EXEMPT`, `isDenied(e)`, `main()`, and
   `shouldRunProbes(env) = !VITEST && !JEST_WORKER_ID` (the entry guard). Confirm the anon client is
   built from `DB_ENV.VITE_SUPABASE_PUBLISHABLE_KEY`.

## HARD CONSTRAINTS
- **Additive only.** Do NOT modify the existing table `PROBES`, the table probe loops, `isDenied`,
  `shouldRunProbes`, or the existing PROBES-coverage test. You ADD a new function-EXECUTE section and a
  new coverage test.
- **No secrets in code.** Reuse the existing anon client (publishable/anon key from env). The probe
  connects as anon — the exact key a browser/attacker holds.
- **Same entry guard.** The new probe must run inside the SAME `main()` that `shouldRunProbes` gates,
  so it is suppressed under a test runner (VITEST/JEST) and runs on the live `npx vite-node` entry.
- **Fail-loud, never silent-green** (this is the whole point — see the three-way outcome in Sub-phase 2).

## GATED SUB-PHASES

### Sub-phase 1 — SSOT list of service-role-only functions
Add an exported registry (mirrors the `PROBES` / `PROBES_COVERAGE_EXEMPT` pattern) naming each
service-role-only SECURITY DEFINER function + the **exact** PostgREST call (function name + the exact
named args, using the real parameter names so PostgREST resolves the overload). Benign args only — a
random UUID that matches no real row + zero deltas — so that even if EXECUTE were (wrongly) allowed,
the call is harmless:

```ts
// service-role-only RPCs: anon EXECUTE must be hard-denied (42501). The FIX-1 leak class the
// table-UPDATE probes cannot see. Args are benign (random uuid, zero deltas) — the EXECUTE check
// fires before the body, so a locked fn 42501s regardless; an unlocked one would run harmlessly.
export const FN_EXECUTE_PROBES: Record<string, Record<string, unknown>> = {
  replay_quota_reserve: { p_user_id: '00000000-0000-0000-0000-000000000000', p_ceiling: 0, p_default_limit: 0, /* 4th bigint arg — use its REAL name from the migration */ : 0 },
  replay_quota_settle:  { p_user_id: '00000000-0000-0000-0000-000000000000', p_reserved: 0, p_actual: 0 },
};
```
Confirm the exact signatures from `supabase/migrations/20260707160000_user_quotas.sql`:
`replay_quota_reserve(uuid,bigint,bigint,bigint)` params `p_user_id,p_ceiling,p_default_limit,<4th>`;
`replay_quota_settle(uuid,bigint,bigint)` params `p_user_id,p_reserved,p_actual`. Read and use the real
4th param name for reserve — do NOT guess; a wrong arg name makes PostgREST 404 (PGRST202) instead of
42501 and defeats the probe.

### Sub-phase 2 — the probe loop in `main()`
After the existing table-probe sections, add a clearly-labelled section:
```
— service-role-only functions (EXECUTE revoked from anon; only service_role) —
```
For each entry in `FN_EXECUTE_PROBES`, call it as **anon**: `await anon.rpc(fnName, args)`. Classify the
result **three ways** (fail-loud):
- error `isDenied` (42501 / "permission denied for function") → **PASS** (`… → 42501`).
- **NO error** (call succeeded / returned data) → **FAIL — LEAK** (`NO ERROR (LEAK! anon can EXECUTE — REVOKE missing)`).
- any **other** error, incl. PGRST202 "could not find function" / not-found → **FAIL — INCONCLUSIVE**
  (`UNEXPECTED <code/msg> — probe cannot confirm lockdown; fix args/signature`). Do NOT treat an
  unexpected error as a pass — an ambiguous result must fail the tool, not silently green it.

Reuse `isDenied` for the PASS test; add the explicit not-found/other → INCONCLUSIVE branch.

### Sub-phase 3 — coverage test (anti-drift)
Add a test (in `api/cwf/__tests__/` — vitest `include` does NOT cover `scripts/**`, so it must live
here) that imports `verifyGrants.ts` and asserts: **every** name in `FN_EXECUTE_PROBES` is a real
service-role-only function, and — the drift guard — that the set of service-role-only functions the
project declares has a probe entry for each (so adding a future service-role-only function without a
probe FAILS CI). If there is no central registry of "service-role-only functions" to diff against,
create a minimal explicit one (e.g. `SERVICE_ROLE_ONLY_FUNCTIONS = ['replay_quota_reserve',
'replay_quota_settle']`) as the SSOT that BOTH `FN_EXECUTE_PROBES` and this test read, and assert
`Object.keys(FN_EXECUTE_PROBES)` set-equals `SERVICE_ROLE_ONLY_FUNCTIONS`. Importing under vitest must
NOT trigger live probes (verify `shouldRunProbes` returns false under VITEST — it already does).

## SELF-VERIFICATION (literal evidence required — build-green is NOT acceptance)
Report all of:
1. **Live probe run:** `npx vite-node scripts/verifyGrants.ts` (with the anon key env set) — paste the
   new section showing `replay_quota_reserve → 42501` PASS and `replay_quota_settle → 42501` PASS.
   (If your local env lacks the anon key, say so explicitly and hand the live run to the Operator; do
   NOT fabricate the output.)
2. **Suite delta:** the exact pass count before (1209) and after; the new coverage test adds tests —
   state the new total and that all pass.
3. **Guard intact:** confirm `shouldRunProbes` under VITEST still suppresses `main()` (the coverage
   test imports the module without opening a DB connection).
4. **Drift/reseal + CHANGELOG:** `check:doc-drift` green after your change; a dated `.agents/CHANGELOG.md`
   entry (What/Where/Verify) and the KB (`.agents/skills/cwf-project-kb/SKILL.md`) updated per RULE 3;
   `docVersion` resealed.

## DIFF SCOPE (explicitly permitted; nothing else)
`scripts/verifyGrants.ts` · the new test under `api/cwf/__tests__/` · `.agents/CHANGELOG.md` ·
`.agents/skills/cwf-project-kb/SKILL.md` · `public/architecture/manifest.json` (reseal). No production
code, no migrations, no other files.

## SEAL HONESTY
State the actual state at seal. The probe proves the CURRENT live lockdown; it does not apply any
migration. If the anon-key live run was handed to the Operator, say "probe authored; live run
Operator-pending" — do not pre-declare the live PASS you did not personally observe.
