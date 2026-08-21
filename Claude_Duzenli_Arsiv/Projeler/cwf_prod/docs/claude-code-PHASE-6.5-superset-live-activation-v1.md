# Claude Code 4.8 — PHASE 6.5 (v1): Superset live activation + confidence pass — seed, activate, and PROVE the DB-sourced/live-gateway path against the real backend
<!-- version: v1 · 2026-06-27 · cwf_yaprak P6.5 superset live activation -->
### cwf_yaprak · master HEAD `2f6cf0a` (P6) · P6 is test-proven on the CODE FLOOR; this phase exercises the DB-sourced path + the live Superset gateway · build nothing new, ACTIVATE + VERIFY
> Run with Claude Code 4.8 (AntiGravity) from **cwf_yaprak**, AFTER P6 (`2f6cf0a`). P6 landed the Superset pack, the governed-store composer, runtime scoping, and the eval-gate dispatch — all green in tests, but serving from the **code floor** because no Superset rules are published in the DB yet and no `mcp_settings` entry is tagged `backend_id:'superset'`. P6.5 makes the DB the live source of truth for Superset and proves the full path against the **real** backend, mirroring the P4 `verifyRules.ts` live-gate proof and the P5.6 live-RLS proof. This is an ACTIVATION + VERIFICATION runbook — **no new feature code**; the only authored artifact is a live-verification script.

---

## ROLES (this phase is human-in-the-loop, like the P5.6 live proof)
- **[AG]** authors ONE script (`scripts/verifySupersetRules.ts`, mirroring `scripts/verifyRules.ts`) + the exact runbook commands. AG makes **no DB writes** and **no live Superset calls** (it lacks the service role + live creds).
- **[MAYMUN runs]** the service-role steps (seed, backfill, verify) and the live read-only gateway round-trip, then **[PASTES BACK]** the outputs. Architect (me) reviews the pasted evidence against the expected results before P6.5 is marked done.
- Nothing is "proven" from AG's report alone — the live ✅/❌ output is the proof.

## WHAT IS AND ISN'T HAPPENING
- **IS:** seed the Superset `rule_kinds` + CORE rules into the governed DB (via the existing `scripts/seedRules.ts`); tag the `supersetArmes` server with `backend_id:'superset'` so `resolveActiveBackends` lights up dual-backend for `ksadmin`; author + run a live Superset gate-verification script; perform one read-only live `search_tools→call_tool` round-trip; record the LIVE-gate result in the CHANGELOG.
- **IS NOT:** any change to P6 feature code (pack, composer, resolver, eval-gate dispatch, assembler), the chat/transport/gateway machinery, or ARMES. No mutating Superset call, ever. No schema/migration change (the tables already exist; this is data + verification).
- **Source-of-truth reminder (locked):** the DB is the runtime source of truth once seeded; the code baseline is seed + reset target + outage floor. Before the seed, Superset correctly serves from the code floor — P6.5 flips it to DB-sourced and proves the floor still catches a DB outage.

## HARD PRE-FLIGHT GATE (verify against the LIVE DB — stop and report if any fails)
1. On `2f6cf0a`; baseline green (build/lint/typecheck/`vitest` — report the 249 count).
2. **Live prerequisites confirmed (do NOT assume — query the real DB via the Supabase MCP and report):**
   - The P4 governance tables are live: `rule_kinds`, `domain_rules`, `rule_versions`, `rule_audit`.
   - `public.backends` contains BOTH `armes` and `superset` rows (the FK target — Superset kind seeds fail without the `superset` row). Report the two rows.
   - A `super_admin` exists in `user_roles` (`ksadmin`) — `verifyRules.ts` needs an actor FK.
   - The code reference carries the 7 `superset.*` kinds (`KIND_IDS`: gateway_step, gateway_rule, resource_semantic, metric_definition, blind_spot, glossary_term, routing_hint) and their `REFERENCE_INSTANCES`. Confirm `KIND_REGISTRY` + `REFERENCE_INSTANCES` include them.
   - Confirm `ksadmin`'s `mcp_settings.servers` currently has a `supersetArmes` entry and whether it already carries a `backend_id` (report the field; do not print tokens).
3. Report findings, then proceed.

## HARD CONSTRAINTS
- **No feature-code change.** `scripts/verifySupersetRules.ts` is the only new file; `scripts/seedRules.ts` is RUN, not edited. If a P6 file needs changing to make the live path work, STOP and report it as a P6 defect — do not silently patch.
- **Read-only against live Superset.** The round-trip uses `search_tools` (read) + `call_tool` on a **non-mutating** underlying tool only (e.g. `get_instance_info` / `list_dashboards`). NEVER call a mutating tool. If live creds are absent/unreachable, the P6 fixture stands and the live round-trip is **deferred, not failed** (graceful — don't block the phase; record it as deferred).
- **Secrets via env only.** Never read/print `.env*`, the service-role key, the MCP token, or any JWT. The scripts read env and never print secrets (mirror `seedRules.ts`/`verifyRules.ts`).
- **Idempotent + reversible where possible.** `seedRules.ts` is idempotent (skips already-published `(kind,key)`). The `backend_id` backfill is a single jsonb edit; state how to revert it.
- **Versioning (standing rule):** if any diagram/KB is regenerated, bump to a new file (no silent overwrite).

---

## STEP P6.5.1 — Seed the Superset rules into the governed DB  **[MAYMUN runs, service role]**
- **[AG]** state the exact command + the confirmation queries.
- **[MAYMUN runs]** `scripts/seedRules.ts` with the service-role env set:
  ```
  npx vite-node scripts/seedRules.ts        # or: node --import tsx scripts/seedRules.ts
  ```
  (Idempotent: upserts all kinds; inserts published v1 instances only where absent. Seeds the 7 `superset.*` kinds + their CORE rules — and any ARMES rows not already present.)
- **[PASTE BACK]** the script output (`Seeded N kinds`, `Seeded instances: X inserted, Y already present`) + the result of:
  ```sql
  select kind_id, class, is_locked from rule_kinds where backend_id='superset' order by kind_id;
  select count(*) from domain_rules where backend_id='superset' and status='published';
  ```
- **Expected:** 7 `superset.*` kinds present (blind_spot/gateway_rule/etc. CORE-locked where authored); a non-zero published Superset rule count.

## STEP P6.5.2 — Activate dual-backend for ksadmin  **[MAYMUN runs, service role]**
- **[AG]** produce the exact jsonb update that tags the `supersetArmes` entry with `backend_id:'superset'` inside `ksadmin`'s `mcp_settings.servers` array (match on the entry's name/id; do NOT disturb the ARMES entry or any token), plus the revert statement.
- **[MAYMUN runs]** the update via the Supabase MCP.
- **[PASTE BACK]** the post-update read (names + `backend_id` per entry only — **no tokens**):
  ```sql
  select jsonb_agg(jsonb_build_object('name', s->>'name', 'backend_id', s->>'backend_id'))
  from mcp_settings, jsonb_array_elements(servers) s
  where user_id = (select user_id from user_roles where role='super_admin' limit 1);
  ```
- **Expected:** the `supersetArmes` entry now shows `backend_id: 'superset'`; the ARMES entry unchanged → `resolveActiveBackends` will yield `['armes','superset']` for `ksadmin`.

## STEP P6.5.3 — Live Superset gate verification  **[AG authors `scripts/verifySupersetRules.ts`; MAYMUN runs]**
Mirror `scripts/verifyRules.ts` exactly (service role for governance via `RuleGovernanceService`; the publishable/anon key for the RLS-deny proof; self-clean any drafts it creates; read env only, never print secrets). Prove, against the real DB, the Superset analogs of the P4 gate suite:
- **Seed present:** the 7 `superset.*` kinds + their published CORE rules exist.
- **DB path composes:** `DbKnowledgeProvider.warm(_, { backends:['superset'] })` then `getDomainContext` returns a slice carrying the gateway protocol (`search_tools`/`call_tool`) + the empty≠zero blind-spot (the DB-sourced path, not the floor).
- **DB-sourced == floor (equivalence):** the DB-composed Superset slice carries the SAME safety invariants as the `StaticKnowledgeProvider` code floor (assert both contain the gateway markers + the permission-scoped-empty forbidden text).
- **Outage floor still holds:** a simulated DB-down/empty provider falls back to the code baseline and STILL serves the Superset protocol + blind-spot (empty≠zero survives a Supabase outage).
- **Poison REJECTED at behavioral (the IKINCILUST analog, live):** a poisoned Superset draft — (a) a `gateway_rule` that drops the search-then-call invariant, and (b) a `blind_spot` inverted to "permission-scoped-empty → report as zero" — is REJECTED by `svc.publish(...)` → `{ published:false, failedStage:'behavioral' }`. An extra-field payload → `failedStage:'schema'` (`.strict()`).
- **Valid edit PUBLISHES:** a legitimate Superset edit passes the gate and publishes.
- **RLS deny (anon):** a non-service-role client is denied a direct `status='published'` write on a Superset rule (`42501`).
- **[MAYMUN runs]** `npx vite-node scripts/verifySupersetRules.ts` and **[PASTES BACK]** the ✅/❌ block (mirror the P4 "LIVE gates N/N passed" format).
- **Expected:** all checks ✅; the poison rows rejected at `behavioral`/`schema`; the valid edit published; anon publish `42501`.

## STEP P6.5.4 — Live gateway round-trip  **[MAYMUN runs in the app, read-only]**
- With both backends active for `ksadmin`, in the running app send (i) a Superset-intent query (e.g. "list the Superset dashboards") and (ii) an ARMES-intent query (e.g. a KB7 throughput question), in the same session.
- **[PASTE BACK]** the tool-call trace (from `telemetry_events` `type='tool_call'` for the session, or the server logs):
  ```sql
  select tool_name, ts from telemetry_events
  where session_id = '<the session id>' and type='tool_call' order by ts;
  ```
- **Expected:** the Superset turn shows `search_tools` THEN `call_tool` (a name that appeared in the search result — never fabricated), read-only, no mutation; the ARMES turn shows flat ARMES tools (`getFactoryLines`, …). No cross-talk. **If live Superset is unreachable, record this step as DEFERRED** (the P6 fixture stands) — do not fail the phase.

## STEP P6.5.5 — Record + commit  **[AG]**
- `.agents/CHANGELOG.md`: a dated **LIVE gate** entry mirroring the P4 "LIVE gates 9/9" line — the Superset live results (seed counts, DB-compose, floor-equivalence, outage-floor, poison rejection stages, valid publish, RLS deny) + the round-trip result (or "deferred — live Superset unreachable").
- `docs/ROADMAP.md`: note Superset is now DB-sourced + live-activated.
- **Explicitly carry the P7 gap forward** in the CHANGELOG/ROADMAP: *"Superset empty≠zero has prompt(code-floor)+eval-gate defense but NO deterministic runtime facts-ledger validator yet (ARMES has 3 layers, Superset 2) — a Superset-scoped runtime validator is a P7 item; do not bolt on a fragile regex."*
- Commit `chore(phase6.5): Superset live activation + live gate verification script` (+ the script). **Push + prove sync** (`git log --oneline origin/master..HEAD` empty; `git rev-parse origin/master` = new HEAD).

---

## SELF-VERIFICATION CHECKLIST (confirm each, with evidence)
- [ ] Pre-flight: on `2f6cf0a`; baseline green (count); live prereqs confirmed — `backends` has `armes`+`superset`, P4 tables live, `ksadmin` super_admin present, 7 `superset.*` kinds + instances in code, `supersetArmes` entry located (no tokens printed). Report deltas.
- [ ] P6.5.1: `seedRules.ts` run; 7 `superset.*` kinds + non-zero published Superset rules present (paste counts).
- [ ] P6.5.2: `supersetArmes` tagged `backend_id:'superset'`; ARMES entry untouched; revert statement provided (paste the names+backend_id read).
- [ ] P6.5.3: `verifySupersetRules.ts` authored (mirrors `verifyRules.ts`) and RUN live — seed present, DB-compose, **DB==floor equivalence**, **outage-floor holds**, **poison REJECTED at behavioral** (both poisons) + schema-poison at schema, valid publishes, anon `42501` (paste the ✅/❌ block).
- [ ] P6.5.4: live read-only `search_tools→call_tool` round-trip (non-fabricated name, no mutation) + ARMES flat-tool turn, no cross-talk — OR recorded DEFERRED with reason (paste the tool_call trace).
- [ ] P6.5.5: CHANGELOG LIVE-gate entry + ROADMAP + the explicit P7 runtime-validator gap; committed AND pushed (sync proven).
- [ ] No P6 feature code changed (the only new file is `verifySupersetRules.ts`); no `.env*` touched; no token/secret printed; no mutating Superset call; no schema change.
- [ ] State explicitly: **"Phase 6.5 complete — Superset rules seeded into the governed DB (DB is now the runtime source of truth; code is seed+reset+floor); ksadmin's supersetArmes tagged backend_id:'superset' so dual-backend is live; the DB-sourced Superset slice equals the code floor and the floor still serves on a simulated DB outage; a poisoned Superset rule is REJECTED at the eval-gate behavioral stage live (the IKINCILUST analog) and a valid edit publishes; anon publish denied 42501; a read-only search_tools→call_tool round-trip ran against the real gateway [or: deferred — live Superset unreachable]; the P7 Superset-runtime-validator gap is recorded; no P6 feature code changed; pushed and in sync."**

Do NOT: edit P6 feature code, call any mutating Superset tool, change schema/migrations, or mark the phase done on AG's report alone (the live ✅/❌ + pasted evidence is the proof). Stop after the checklist and present the report with the pasted live outputs.
