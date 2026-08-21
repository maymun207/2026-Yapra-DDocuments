# PHASE-FAULT-SWITCH-0 · v1 — the fault the system can order, so honesty can be measured

<!-- PHASE-FAULT-SWITCH-0-v1 · 2026-08-07 · S86 · Architect: Claude (Opus 5).
     Lane: AG-1. One relay, self-contained (D-2). Rollout 2.3b · bucket v24 #1.
     Ratified qualities: env-armed · READ-ONLY · deterministic · fails-loud ·
     evidence on a PREVIEW deployment (owner ruling b).
     Downstream consumers BY NAME: BUG-006 + BUG-009 (bucket #2, adjacent),
     later D-OPA-3 (sota v1_5 R10: 100 % fail-closed under induced read failure). -->

## PRECONDITION (S47-1)
Fresh full clone (RULE-25; `--depth` banned). `git rev-parse origin/master` must be
`e98edb8445d92a4318b78531875fadb67b1e5f0e` **or a descendant whose only additions are
docs/relay commits or STEP A's own merge**. Any other movement → STOP, report, no work.
All writes by absolute path (D-8). Worktree, never the main clone (S83-3).

---

## STEP A · STANDING GO — merge the orphaned rescue fix (before any phase work)

`origin/rescue/chore-mcp-supabase-ro-f75b1f9` is the repo's ONLY unmerged branch:
exactly 1 commit `f75b1f9`, touching exactly `.mcp.json`, `.claude/settings.json`,
`.agents/CHANGELOG.md`. It finishes `33f2b45`'s half-hardening — master's `.mcp.json`
still lacks the `headers.Authorization: Bearer ${SUPABASE_ACCESS_TOKEN}` block, so
supabase-ro MCP is auth-broken on every fresh clone (silent: reads run via PostgREST).

**Machine-verifiable precondition (this is a standing GO — self-opening):** verify the
branch is exactly 1 commit ahead touching exactly those 3 files
(`git diff --name-only origin/master...origin/rescue/chore-mcp-supabase-ro-f75b1f9`).
Holds → merge WITHOUT further relay:

```
git merge --no-ff --cleanup=strip origin/rescue/chore-mcp-supabase-ro-f75b1f9 \
  -m "merge: rescue/chore-mcp-supabase-ro — supabase-ro MCP auth headers land on master (finishes 33f2b45)"
git push origin master
```

Expectations, BASE+DELTA: full CI team runs (`.mcp.json`/`.claude` are NOT in
paths-ignore — correct, S37-2); suite delta **+0 files / +0 tests** vs whatever the run
reports as base; production deploy may build or cancel — either is fine, this merge
carries no runtime code. Does not fail-gate the phase. CHANGELOG: keep the branch's
entry whole. Never echo `SUPABASE_ACCESS_TOKEN` or any secret value (ADR-007).

---

## STEP 0 · AUTH PROBE — name the arming path before building (D-1, lane-owned unknown)

The Architect cannot read AG's local credentials; this step resolves the ONE open
mechanic. Run and record verbatim outcomes (never secret values):

1. `vercel whoami` — is the CLI authenticated for team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`?
2. `vercel env ls` (project `cwf_yaprak`) — record, as PRESENT/ABSENT per environment
   only: `CRON_SECRET` (preview?), `VERCEL_AUTOMATION_BYPASS_SECRET` (any), Supabase
   vars (preview?).
3. Decision table:
   - CLI authed → arming path = `vercel env add` (STEP 3). Proceed.
   - CLI NOT authed → **STOP-AND-REPORT** after building C1–C3 (code + tests are
     auth-independent; only the preview choreography waits). The report names exactly
     what was probed and what was absent. Do not improvise a dashboard step for the
     owner — the Architect redesigns the delivery.
4. Protection note: Vercel Authentication is ON for all deployments (Architect read,
   `get_project_deployment_protection`). To curl the preview endpoint you need BOTH the
   endpoint's own bearer AND an SSO bypass: prefer `x-vercel-protection-bypass:
   $VERCEL_AUTOMATION_BYPASS_SECRET` if present; else report its absence in STEP 0's
   findings — the Architect will hand a time-boxed share link at that point. **Never
   commit, log, or echo any bypass value or share URL — the repo is public.**

---

## C1 · THE SWITCH — `api/cwf/_lib/faults/faultSwitch.ts` (new module)

```ts
export const FAULT_POINTS = ['synthetic-spend-read', 'backend-health-read'] as const;
export type FaultPoint = (typeof FAULT_POINTS)[number];
export class InducedReadFaultError extends Error { /* name = 'InducedReadFaultError' */ }
export function assertNoInducedFault(point: FaultPoint): void;
```

Laws, each with a comment naming it in the file:

1. **Disarmed = free.** `CWF_FAULT_SWITCH` absent or empty → return immediately. Zero
   logs, zero cost. Production's every day.
2. **Production refusal is structural.** If the var is set AND
   `process.env.VERCEL_ENV === 'production'` → `console.error('[FaultSwitch] REFUSED:
   armed in production — forcibly disarmed')` on EVERY call, then return. Never throw
   on this path — a misconfigured env var must not take production down; the born-loud
   line is the alarm.
3. **A typo is a total misconfiguration, not a silent disarm.** Parse the var as a
   comma-separated token list; ANY token outside `FAULT_POINTS` → throw a loud config
   error naming the bad token, at EVERY check site, regardless of `point`. A typo that
   silently disarmed would be BUG-006's own shape reborn inside the instrument built to
   kill it.
4. **Firing is loud, then it throws.** Token matches `point` →
   `console.error('[FaultSwitch] FIRING', { point })` then
   `throw new InducedReadFaultError('[FaultSwitch] induced: ' + point)`. The distinct
   error NAME is deliberate: it flows into `telemetry_events.payload.error` via
   `recordMeasurementUnavailable`, so induced evidence is forever distinguishable from
   a real outage in the ledger.
5. **Deterministic, read-only.** Same env → same behaviour on every invocation; no
   randomness, no counters, no writes. The switch only ever throws BEFORE a read.

Env key `CWF_FAULT_SWITCH` follows the `llm/config.ts` / `replay/config.ts` `CWF_*`
precedent and stays clear of `^MCP_[A-Z0-9_]+$` (that namespace is `apiKeyEnv`'s).

## C2 · TWO INJECTION POINTS (this phase, exactly two — scope note below)

- `SyntheticRunsRepository.tokensSpentToday()` — first statement:
  `assertNoInducedFault('synthetic-spend-read')`. Induces the M1F2A spend-fence path:
  injector catch → `recordMeasurementUnavailable('synthetic-injector.tokensSpentToday')`
  → `{ active:false, reason:'spend-unmeasured' }`.
- `BackendHealthRepository.latestByBackends()` — first statement:
  `assertNoInducedFault('backend-health-read')`. Induces the withholding catch in
  `mcpHealthWithholding.ts` (today: fail-open `withheldBackends: []` — BUG-009's exact
  shape; this phase makes it INDUCIBLE, the next phase changes the shape).

**SCOPE-CUT, named (ADR-012 R-1/R-2):** the other fence homes from the S85 surface map
(semanticRouter · floorSyncCore · ReplayAuditRepository) already carry shaped, honest
failure returns and join the registry additively when a measuring phase needs them —
a one-line `FAULT_POINTS` addition each. This is a SCOPE-CUT on the instrument's first
registry, not a deferral of any measurement.

## C3 · TESTS (in vitest scope: `api/cwf/__tests__/` or beside the module)

1. Disarmed → no-op (and no console output — assert via spy).
2. Armed with matching point → `InducedReadFaultError` thrown, `[FaultSwitch] FIRING`
   logged first.
3. Armed with non-matching valid point → no-op.
4. Unknown token → loud config throw naming the token (both when `point` matches
   nothing and when a valid token is also present — total, not partial).
5. Production refusal → var set + `VERCEL_ENV=production` stub → no throw, REFUSED
   line logged (this IS the S66-1 positive control for the refusal law — production is
   never tested live).
6. Integration: `runSyntheticInjectorTick` with armed env (stubbed) → returns
   `{ active:false, reason:'spend-unmeasured' }` and the measurement-failure recorder
   was called with the guard label (spy) — the BUG-006 evidence chain proven in vitro.
7. Integration: `withholdUnhealthyBackends` with armed env → fail-open
   `{ tools, withheldBackends: [] }` — pinned WITH a comment naming BUG-009 as the
   successor that will amend this exact assertion.
8. Determinism: two consecutive armed calls behave identically.

Env stubbing per existing test precedent (`process.env` save/restore); no test touches
a live deployment.

## C4 · PREVIEW EVIDENCE CHOREOGRAPHY (only if STEP 0 arm = CLI authed)

Order matters — env before push, so the deploy is BORN armed:

1. `vercel env add CWF_FAULT_SWITCH preview phase/fault-switch-0` with value
   `synthetic-spend-read` (branch-scoped: other lanes' previews stay clean; the
   health point is deliberately NOT armed on preview — its live exercise belongs to
   the BUG-006+009 phase by ratified adjacency, and arming it here would poison this
   preview's own turn-path debugging).
2. Push `phase/fault-switch-0` → preview deployment READY (record `dpl_` id + URL).
3. `curl -s -H "Authorization: Bearer $CRON_SECRET" -H "x-vercel-protection-bypass:
   $VERCEL_AUTOMATION_BYPASS_SECRET" https://<preview-url>/api/admin/synthetic-traffic-injector`
   (values from env, NEVER echoed into the report — report HTTP status + JSON body only).
4. Expected body: `{ "active": false, "reason": "spend-unmeasured" }` — the fence
   REFUSING, synchronously witnessed.
5. `vercel env rm CWF_FAULT_SWITCH preview phase/fault-switch-0` — the armed state
   dies in this step, never outlives the evidence.
6. Record in the report: preview `dpl_` id, exact UTC timestamp of the curl, HTTP
   status, body verbatim.

The Architect then reads, independently (named sensors, no relay needed):
- Vercel runtime logs on that `dpl_` id: `[FaultSwitch] FIRING` + the fence's own
  `daily spend UNMEASURABLE — injection REFUSED` line, causally ordered;
- Supabase (RO): the `telemetry_events` row — `payload.kind` = measurement-unavailable,
  `payload.guard = 'synthetic-injector.tokensSpentToday'`,
  `payload.error = 'InducedReadFaultError'`, `session_id` NULL.

That triple (HTTP body · log pair · durable row) is the first POSITIVE fence-firing
evidence in the project's history — the exact class BUG-006 says we never had.

## DOCS & GATES
`docs/` reference page for the switch is NOT required this phase (instrument, not a
stage); doc-drift gate rules — if it demands, `npm run reseal` in the merged worktree;
expect hash-only (no diagram sentence changes). W-025 caveat: the gate's VERDICT is
trusted, its `likelyCulprits` hint is not. CHANGELOG entry as usual. tenant-zero: the
new module carries no tenant vocabulary — gate should be green with its positive
control firing first.

## STOP-FOR-REVIEW CONTRACT
Branch `phase/fault-switch-0`. STOP after CI green on the branch head; push the
STOP-FOR-REVIEW report to `docs/relay/` (the Architect reads it from git — paste only
if push fails). Report carries: STEP A outcome (merge SHA or precondition failure),
STEP 0 probe table (PRESENT/ABSENT only), CI run id + suite BASE+DELTA (expected
**+2 files** vs the base the run reports; test-count delta stated by CI, not asserted),
C4 evidence block or the named reason it waits. Merge only on the Architect's GO with
verbatim subject. `--no-ff`, `--cleanup=strip`, squash banned.

## PROHIBITIONS
No secret value, bypass value, or share URL in any commit, log, or report (public
repo; ADR-007). No writes from the switch, ever. No third injection point. No
production arming path of any kind. No `apply_migration` — this phase carries ZERO
migrations and ZERO Operator steps.

<!-- END · PHASE-FAULT-SWITCH-0-v1 -->
