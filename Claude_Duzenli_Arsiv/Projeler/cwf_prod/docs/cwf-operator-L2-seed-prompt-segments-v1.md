# CWF — Operator · L2 Seed: prompt.segment kind + 20 floor rows · v1

<!-- cwf-operator-L2-seed-prompt-segments-v1 · rev 1 · 2026-07-10 · Operator-lane artifact
     (Gemini + Supabase MCP). Anchor: origin/master fcaa4aa (PHASE L2 merged; verified floor
     1673/165/rev 58). This is a SCRIPT SEED (data writes via service client) — NOT a
     migration. Two-door: AG authored; you apply; the Architect verifies via your reads. -->

## FENCE (ALWAYS FIRST — ADR-006)

- You may: run the seed script, read schema/rows via Supabase MCP `execute_sql` SELECTs,
  run `supabase` CLI read commands.
- You may NOT: mutate the repo in ANY way (no pull/fetch/checkout/commit — read-only git),
  call `apply_migration`, execute DDL of any kind, edit any file, print any secret value.
- Any step failing its gate → STOP, report verbatim output, do nothing further.

## Step 0 — Repo-state gate (read-only)

1. In the existing working copy: `git rev-parse HEAD` →
   `fcaa4aaf33f92319189d112d2b2fe557a195a280`. If the working copy is NOT at this commit:
   STOP and report — do NOT pull/checkout yourself; the owner updates the checkout.
2. `git status --porcelain` → empty (dirty tree → STOP).
3. Confirm the script exists and contains no DDL/grants:
   `grep -inE "create table|alter table|grant |revoke " scripts/seedPromptSegments.ts`
   → ZERO hits (any hit → STOP).

## Step 1 — Env presence (names only — NEVER print values)

`SUPABASE_URL` and `SUPABASE_SECRET_KEY` present in the shell env (report presence as
yes/no only). Project ref must be `fjbrkimwvtpwoxhziidh`.

## Step 2 — Pre-state reads (Supabase MCP, SELECT only)

```sql
select count(*) as kind_rows from rule_kinds where kind_id = 'prompt.segment';
select count(*) as seg_rows from domain_rules where kind_id = 'prompt.segment';
```
Expected BOTH 0 (first apply). If seg_rows > 0: report the counts and CONTINUE — the seed is
never-clobber by design; the post-state gate below still applies.

## Step 3 — Run the seed

```
node --import tsx scripts/seedPromptSegments.ts
```
Paste the full stdout/stderr verbatim. Non-zero exit → STOP.

## Step 4 — Post-state gates (literal reads; every gate must hold)

```sql
-- G1: kind row exists, system lane, CORE
select kind_id, backend_id, class, is_locked from rule_kinds where kind_id = 'prompt.segment';
-- expect: 1 row · backend_id 'system' · class CORE-equivalent · locked true

-- G2: exactly 20 published v1 rows, one per segment
select count(*) as published from domain_rules
 where kind_id = 'prompt.segment' and status = 'published';
-- expect: 20

-- G3: segment id inventory (paste the full list)
select payload->>'segmentId' as seg, version, status from domain_rules
 where kind_id = 'prompt.segment' order by 1;
-- expect: the 20 ids: identity · safety.core_directives · safety.b1_scope ·
-- safety.b2_leakage · safety.b3_pii · safety.b4_jailbreak · safety.b5_tool_injection ·
-- tone · viz · tools.header · tools.rule.1 … tools.rule.10 — each version 1, published

-- G4: rule-10 floor is in PLACEHOLDER form (drift-trap check)
select payload->>'text' like '%{{AGGREGATE_TOOL}}%'
   and payload->>'text' like '%{{QUERY_TOOL}}%' as rule10_placeholders
  from domain_rules where kind_id = 'prompt.segment'
   and payload->>'segmentId' = 'tools.rule.10';
-- expect: true (literal tool names in the stored text = FAIL)

-- G5: identity floor spot-check (content sanity, no hash tooling needed)
select length(payload->>'text') as identity_len,
       payload->>'text' like '%Kale Seramik%' as identity_anchor
  from domain_rules where kind_id = 'prompt.segment'
   and payload->>'segmentId' = 'identity';
-- expect: identity_anchor true; paste identity_len
```

## Step 5 — Idempotence probe (the never-clobber gate)

Run the seed a SECOND time (same command). Then re-run G2 + G3: counts and versions must be
UNCHANGED (still 20, all version 1 — a version bump or row-count change = FAIL, report loud).
Paste the second run's stdout.

## Step 6 — Report

Verbatim: Step-0 hashes · env presence (yes/no) · pre-state counts · both seed run outputs ·
G1–G5 results · idempotence re-reads. NO interpretation needed — the Architect closes the
gate from your literals.

<!-- END · cwf-operator-L2-seed-prompt-segments-v1 · rev 1 · 2026-07-10 -->
