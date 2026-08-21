# PHASE HARDEN-1 — Coverage gate (real) + Audit-or-alarm
**rev 2 · 2026-07-01 · target base HEAD `b52faa7` (master, 472 tests / 52 files, docVersion rev 12)**

> **v1→v2 delta:** AG's pre-flight surfaced that CI is **dormant** — the workflow triggers on `branches: ["main"]` but the repo's default/integration branch is **`master`** (no `main` branch exists), so no CI has ever run. Wiring a coverage job under that trigger would be a gate that never fires (the TD-7 defect again). v2 folds a **CI-trigger fix into 1A as its own commit (Commit A)** ahead of the coverage wiring, and adds a pre-flight check for the mismatch. Everything else is unchanged from v1.

Closes two "guard that isn't a guard" debts, both independent of the parked PL-1 F-obs:
- **TD-7** — the `vitest.config.ts` coverage thresholds (90/90/90/85) **never run** on any automated path → false assurance.
- **TD-9** — every admin user-mutation writes its audit row **best-effort** (`audit.insert` swallows the error, endpoint still returns `{ ok: true }`) → a governance-critical mutation can complete with **no durable audit record and no alarm**.

Two **independently gated** sub-phases (1A then 1B). Each has its own self-verify and its own commit. Do NOT blind-merge — finish and verify 1A before starting 1B.

---

## HARD PRE-FLIGHT GATE (abort if any check fails — paste evidence)
1. `git rev-parse HEAD` resolves on `master`; `git log -1 --oneline` = the UM-3 merge (`b52faa7` or a later verified master head). If HEAD ≠ expected, STOP and report.
2. `npm ci` clean; `npm run test` green (**472 tests, 52 files**). Paste the tail.
3. Confirm the two defects are still present (else the plan is stale):
   - `vitest.config.ts` → `test.coverage.thresholds` = `{ statements: 90, branches: 85, functions: 90, lines: 90 }`; `test.coverage.include` = `src/lib`, `src/store`, `src/services`, `src/hooks`, `shared` (NO `api/**`).
   - `.github/workflows/build-test.yml` runs `npm run build` + `npm run test` — **no** `--coverage` anywhere; `package.json` `build` script has no coverage step.
   - **CI dormancy (v2):** `git symbolic-ref refs/remotes/origin/HEAD` = `origin/master` and `git branch -a` shows **no `main` branch**, yet `.github/workflows/build-test.yml` triggers on `branches: ["main"]`. Confirm this mismatch — it means CI has **never fired**. (If a `main` branch DOES exist and is the integration branch, STOP and report; the fix below assumes master-only.)
   - `api/cwf/_lib/persistence/repositories/UserAuditRepository.ts` → `insert()` does `if (error) console.error(...)` and returns `void` (swallow).
   - `api/admin/users.ts` → every mutation case runs the mutation, then `await audit.insert({...})`, then `return res.status(200).json({ ok: true })` (two cases also return `tempPassword`).
4. `npx vitest run --coverage` and paste the **Coverage summary** block. Expected ballpark (verify, don't assume): Stmts ~57% · Branch ~61% · Funcs ~54% · Lines ~62%. **The floor you set in 1A must be derived from THIS run**, not from this document — if your numbers differ from the ballpark by >3 pts, use YOURS and say so.

---

## HARD CONSTRAINTS (whole phase)
- **No runtime/agent behavior change.** No touch to `api/cwf/chat.ts`, the LLM gateway, knowledge providers, the eval-gate, prompt composers, or MCP paths. This is CI + test-config + the admin endpoint + admin UI only.
- **Secrets (RULE 0):** the new `[AUDIT-FAILURE]` log line carries **only** `action`, `actor_user_id`, `target_user_id`, and the error `message` — **never** `old_value`/`new_value` payloads (they can contain email/metadata) and **never** a password/`tempPassword`. The one-time `tempPassword` reveal path is unchanged.
- **RULE 1 (no hardcoded config):** coverage floor numbers live in `vitest.config.ts` (that IS config — fine). Do not introduce any other magic literals; reuse `USER_AUDIT_ACTIONS`, `DB_TABLES`, existing constants.
- **audit-or-alarm ≠ rollback.** The GoTrue mutation already happened and is not transactional — NEVER attempt to undo or re-run it on audit failure. The mutation stays truthful.
- **Living-doc lock-step (RULE 20):** each sub-phase that touches a manifest-mapped code area updates the affected tab + bumps `lastSyncedCommit` + `docVersion` in the SAME commit (two-commit seal: code commit, then doc/manifest seal commit). Verify **altitude** first — reseal vs redraw — and paste the doc diff.
- One sub-phase = one logical change = its own commit + its own seal. `npm run build` + `npm run check:doc-drift` clean before each seal.

---

## SUB-PHASE 1A — Coverage gate: honest floor, CI-enforced, ratchet-only (TD-7)

**Diagnosis (verified):** the 90/85 thresholds fail the real numbers by ~30 pts, which is exactly why they were never wired to an automated path — a born-fail gate that would red every build, so it was left inert. Compounding it (found in pre-flight): **CI itself is dormant** — it triggers on a `main` branch that doesn't exist, so nothing has ever run. Fix = wake CI on the real branch, THEN wire an HONEST coverage floor that actually runs, plus a ratchet policy so it climbs.

**Do — two commits (A then B), one logical change each:**

**Commit A — `fix(ci): trigger CI on master (workflow was dormant — triggered on non-existent 'main')`:**
0. In `.github/workflows/build-test.yml`, set BOTH `push.branches` and `pull_request.branches` to `[ "master" ]`. Do **not** use `[ "main", "master" ]` — `main` doesn't exist and a dead entry rots. Add a comment: `# tracks the default branch; if master is ever renamed, update this or CI goes dormant.` This is a standalone, separately-auditable fix of a pre-existing dormant-CI bug — commit it on its own before the coverage wiring.

**Commit B — the coverage gate (the TD-7 body):**
1. In `vitest.config.ts`, replace the `thresholds` block with a floor derived from YOUR pre-flight coverage run, set a few points below measured (ratchet headroom). Baseline target (adjust to your measured numbers, staying just below each):
   ```
   thresholds: {
     statements: 55,   // measured ~57.4 — ratchet floor, never lower
     branches: 58,     // measured ~61.3
     functions: 50,    // measured ~53.8
     lines: 58,        // measured ~61.7
   },
   ```
   Add a one-line comment above the block: `// RATCHET FLOOR — raise when a phase adds coverage; NEVER lower. Real gate (CI: coverage job). See AGENTS.md.`
   **Do NOT** change `coverage.include` (scope stays `src`+`shared`; `api/**` expansion is a separate, deliberate follow-up — out of scope here).
2. Wire coverage into CI as a **real gate**. In `.github/workflows/build-test.yml`, add a dedicated `coverage` job (Node 22 only — run coverage once, not on both matrix legs) that does `npm ci` then `npm run test:coverage`. Leave the existing matrix `build` job (build + plain `test` on 20.x/22.x) intact — plain tests still prove both Node versions; coverage enforces the floor once. `test:coverage` already exists (`vitest run --coverage`) and will exit non-zero below the floor.
3. Record the **ratchet policy** as a standing rule: add a short bullet to `.agents/AGENTS.md` (under the testing/quality rules) — "Coverage floor in `vitest.config.ts` is a RATCHET enforced by the CI `coverage` job: never lower it; raise it when a phase adds coverage. Scope is `src`+`shared` (api coverage is a tracked follow-up)." Mirror one line into `.agents/CHANGELOG.md`.

**1A self-verify (evidence):**
- Paste `npx vitest run --coverage` summary showing **PASS** against the new floor (no `ERROR: … does not meet global threshold`).
- Paste the `.github/workflows/build-test.yml` diff showing BOTH the `branches` fix (`main`→`master`, Commit A) and the new `coverage` job (Commit B).
- `git grep -n "statements: 90\|branches: 85" vitest.config.ts` → **empty** (old numbers gone). Also `grep -n "branches:" .github/workflows/build-test.yml` → shows `master`, no `main`.
- **CI actually fires (the free proof):** because Commit A wakes CI, the HARDEN-1 PR is the first CI run in this repo's history. Paste/confirm the PR's check runs appear and are green — this proves the trigger fix AND that the coverage gate runs. **Guard:** the newly-live build+test job has never been exercised on master; if it FAILS on the PR (a latent build issue), STOP and report it — do not paper over it.
- State the ratchet-rule location (AGENTS.md line) and confirm `coverage.include` is unchanged (no `api/**`).
- RULE 20: is `vitest.config.ts` / `.github/workflows/**` / `.agents/**` mapped in `public/architecture/manifest.json`? If mapped → reseal affected tab + bump `lastSyncedCommit`/`docVersion`; if unmapped → state so explicitly. `npm run check:doc-drift` clean. Paste the check output.

---

## SUB-PHASE 1B — Audit-or-alarm for governance-critical mutations (TD-9)

**Diagnosis (verified):** in `api/admin/users.ts`, all 13 mutation cases (`assignRole`, `setScopes`, `removeRole`, `invite`, `sendReset`, `disable`, `enable`, `confirmEmail`, `setTempPassword`, `changeEmail`, `updateProfile`, `resendInvite`, `deleteUser`) run `mutation → await audit.insert(...) → return { ok: true }`. `UserAuditRepository.insert` swallows the DB error (logs, returns void). So an audit-write failure yields a clean `{ ok: true }` with **no durable audit row** — a silent governance hole.

**Committed design = audit-or-ALARM (NOT audit-or-fail-the-response).** Rejected failing the HTTP response because: (a) `setTempPassword` and `resendInvite` return a one-time `tempPassword` secret — failing the response loses it; (b) the GoTrue mutation already happened and isn't rollbackable, so a non-2xx would invite a harmful retry (double-invite / new secret). The mutation stays truthful; the swallow dies.

**Do:**
1. `UserAuditRepository`: add a strict-reporting insert that tells the caller whether it persisted, WITHOUT throwing (keep it non-throwing so it can never break a request):
   ```ts
   /** Like insert(), but reports success. Non-throwing: false on any failure (no client, or DB error). */
   async insertReporting(row: UserAuditRow): Promise<boolean> {
     if (!this.client) return false;
     const { error } = await this.client.from(DB_TABLES.USER_AUDIT).insert(row);
     if (error) { console.error(`[${this.name}] insert:`, error.message); return false; }
     return true;
   }
   ```
   Keep the existing `insert()` for any non-critical/back-compat callers; the read `listForUser` path is untouched.
2. `api/admin/users.ts`: introduce a small local helper so every mutation case is uniform, e.g.:
   ```ts
   // Writes the audit row; on failure surfaces a LOUD, secret-free alarm and returns false so the
   // response can carry audited:false. NEVER logs old/new payloads or secrets.
   async function auditOrAlarm(audit, row): Promise<boolean> {
     const ok = await audit.insertReporting(row);
     if (!ok) console.error(`[AUDIT-FAILURE] action=${row.action} actor=${row.actor_user_id ?? '∅'} target=${row.target_user_id ?? '∅'}`);
     return ok;
   }
   ```
   Replace each `await audit.insert({...})` call site with `const audited = await auditOrAlarm(audit, {...})`, and change each success return from `{ ok: true }` to `{ ok: true, audited }` (and the two secret cases to `{ ok: true, audited, tempPassword }`). The happy path yields `audited: true`; a failed audit yields `audited: false` **with the mutation already applied**.
   - The `[AUDIT-FAILURE]` line must contain ONLY action + actor id + target id (no payloads, no secrets) — Vercel-greppable so it's read via the Vercel MCP with zero manual steps.
3. UI surface (governed-UI rule — the operator must not be blind): thread `audited` through `src/lib/adminService.ts` (mutation return types gain `audited?: boolean`) → `src/store/adminStore.ts` → the action handlers in `src/components/admin/UsersTab.tsx`. When a mutation returns `audited === false`, show a **distinct warning** (toast/inline): `⚠ İşlem tamamlandı ama DENETLENEMEDİ — kaydı elle doğrulayın (audit failed).` Success stays as-is.
4. **Out of scope (note in the register, do NOT bundle):** audit-FIRST ordering for the irreversible `deleteUser` (write the audit intent before the destructive GoTrue call) — needs an intent/outcome nuance; separate small hardening. Also NOT in scope: a `telemetry_events` audit-failure row (the admin endpoint has no telemetry channel; wiring one to detect an audit-write failure is turtles). The structured log + response flag + UI badge are the signal.

**1B self-verify (evidence):**
- **New test** (`api/admin/__tests__/users.test.ts`, +cases): inject a `UserAuditRepository` whose insert fails (mock client returns an error), for a representative mutation (e.g. `disable`) assert: (a) the GoTrue mutation still ran (spy called), (b) response is `{ ok: true, audited: false }`, (c) a `[AUDIT-FAILURE]` line was logged (spy on `console.error`) and it contains NO `old_value`/`new_value`/password substring, (d) a happy-path case asserts `{ ok: true, audited: true }`. Paste the test + `npm run test` output (count must rise from 472).
- Grep proof the swallow is gone at the critical sites: every mutation case now uses `auditOrAlarm`/`insertReporting` (paste `grep -n "audit.insert(" api/admin/users.ts` → the old best-effort swallow is no longer on the mutation return path).
- `npm run typecheck:api` + `npm run build` green; `oxlint` clean.
- RULE 20: `api/admin/**` is mapped to the **Governance Model** tab (which depicts the gated `/api/admin/users` endpoint + audit). Verify altitude: the audit posture changes from best-effort to **fail-loud (audit-or-alarm)** — decide reseal vs redraw. If the diagram states audit is "best-effort" at its altitude, it must be corrected (redraw the note); if audit appears only as an undifferentiated component, reseal. Bump `lastSyncedCommit` + `docVersion` in the seal commit. Paste the doc diff + `check:doc-drift` clean.

---

## FINISH — report back (for architect review against the actual diff)
- Commits: 1A = 3 (Commit A trigger fix · Commit B coverage · seal), 1B = 2 (code · seal) → 5 total, on a branch → PR to `master`; paste `git log --oneline` for the range.
- Final `npm run build` + `npm run test` + `npm run test:coverage` + `check:doc-drift`: all green; paste the coverage summary and the new test count.
- One-paragraph summary per sub-phase: what changed, the honest floor numbers you actually set (with your measured baseline), and the audit-or-alarm response contract. Note explicitly that no runtime/agent path was touched.
