# PHASE L5 — PROGRESSIVE DELIVERY (rollout slices · guardrail auto-rollback · %0 = staging) · v1

<!-- claude-code-PHASE-L5-progressive-delivery-v1 · rev 1 · 2026-07-10 · AG-lane artifact.
     Ratified design: cwf-L5-progressive-delivery-design-v1 (Architect-lane; do NOT go
     looking for it — everything binding is embedded HERE verbatim). Anchor:
     origin/master b3e8148 (1853 tests / 174 files / docVersion rev 63). THIS PHASE HAS
     DDL: ONE migration, AUTHORED ONLY — Operator applies it later via `supabase db push`.
     AG's DB access is read-only (supabase-ro); AG NEVER applies anything. This phase
     RESEALS the living doc rev 63→64 (mapped .ts + diagram edits — S34-1 budgeted up
     front, not discovered late). -->

## 0 · HARD PRE-FLIGHT (STOP on any failure — report, do not improvise)

```bash
cd <workspace> && rm -rf cwf_yaprak && git clone https://github.com/maymun207/cwf_yaprak && cd cwf_yaprak
git rev-parse origin/master        # EXPECT b3e8148ae7bb53fe42c17530fe4b6370df8cbe59 — if moved, STOP and report
npm ci --no-audit --no-fund
npm run test                       # EXPECT green, 1853 tests / 174 files
npm run typecheck:api              # EXPECT green
npx vite-node scripts/checkDocDrift.ts   # EXPECT "[OK] no drift"
```
Branch: `feat/l5-progressive-delivery`. At the end: push the BRANCH and STOP — the merge
happens ONLY on the Architect's explicit GO after the RULE-25 fresh-clone review,
`--no-ff` (squash BANNED), with a verbatim merge message the Architect supplies at GO time.

## 1 · WHAT THIS PHASE BUILDS (one paragraph)

The `prompt.segment` publish gains a delivery dimension: a governed rollout
(`publish_rollouts` + `rollout_audit`) stages a GATED draft as the candidate at 0%
(de-facto staging), serves it to a deterministic user slice at N% (the hot-path tier in
`resolvePromptSegments`: lab-draft > rollout-candidate > published > floor), and watches
the sacred metric (empty-rate per arm, now durable on the `turn_done` ledger row) with a
Wilson guardrail that may do exactly ONE automated thing: roll a distinguishably-regressing
slice back to 0% (prior truth is intact — rollback restores, never destroys). Advancing
the %, completing to 100% (which executes the EXISTING gated publish — the pointer flip
never gains a second door), and cancelling stay human, promotion-tier (`ROLLOUT_MANAGE`).
`distinguishable=false` = UNDERPOWERED — the actuator does NOTHING on it, in either
direction, ever. Arm attribution is free by construction: a candidate turn composes a
different `promptRev`, and the fingerprint ledger already aggregates per rev.

## 2 · CONSTRAINTS (violating any one fails the phase)

- **C-A DDL AUTHORED, NEVER APPLIED.** Exactly ONE new migration file
  `supabase/migrations/20260710180000_l5_progressive_delivery.sql` (§3-G1, SQL embedded
  verbatim). AG does not apply it, does not seed, does not touch the live DB beyond
  supabase-ro reads. Every doc/comment written this phase states
  **"AUTHORED, Operator-pending"** for the NEW objects — never "applied".
- **C-B BYTE-IDENTITY pins** — `git diff b3e8148..HEAD -- <path>` MUST be empty for each:
  `api/cwf/_lib/adminGuard.ts` ·
  `api/cwf/_lib/knowledge/gate/goldenPublishContract.ts` ·
  `api/cwf/_lib/replay/pairedReplay.ts` ·
  `api/cwf/_lib/replay/canaryRun.ts` ·
  `api/cwf/_lib/replay/goldenSpecimens.ts` ·
  `api/admin/eval-ci.ts` ·
  `api/admin/prompt-golden.ts` ·
  `api/admin/golden-specimens.ts` ·
  `api/admin/replay.ts` (FROZEN, standing) ·
  `api/cwf/_lib/toolCategories.ts` (routing is OUT of L5).
  **Comments-stripped byte-identical** (the S34-1 comparator, NOT a line-grep) for:
  `api/cwf/_lib/replay/goldenRun.ts` · 
  `api/cwf/_lib/persistence/repositories/GoldenSpecimensRepository.ts`
  — their ONLY permitted diff is the §3-G6 stale-comment flip; zero code tokens change.
- **C-C VERDICT RULE NEVER RE-DERIVED.** The guardrail verdict is
  `goldenVerdict()` (import from `goldenRun.ts`) fed with
  `{ empty: { baseline: <priorArm>, candidate: <candidateArm> }, violation: { baseline: null, candidate: null } }`
  — VERIFIED at anchor: `strictlyWorse(null,·)`/`separated(null,·)` are false, so null
  violation intervals reduce the rule exactly to the empty axis. Do not fork, wrap-with-
  logic, or re-implement the rule; `wilsonInterval` comes from `pairedReplay.ts` as-is.
- **C-D THE ACTUATOR BOUNDARY (the phase's soul).** The ONLY automated state mutation in
  this entire phase is: verdict `'regression'` on a `'progressing'` rollout ⇒
  `state='rolled_back'` + ONE audit row (`action:'auto_rollback'`, `actor_user_id` NULL,
  `detail.outcome.actor:'rollout-guardrail'` — S33-1). The actuator NEVER: advances a
  percent, publishes, flips the published pointer, touches drafts, edits the floor, or
  acts on `'underpowered'` / `'non_regressing'`. Test pins in §4.
- **C-E ONE PROMPT DELTA IN FLIGHT.** While ANY `publish_rollouts` row for family
  `'prompt.segment'` is in state `'staged'` or `'progressing'`:
  (i) `governance.publish()` of a `prompt.segment` draft REJECTS
  (`ok:true, published:false`, audited reason `'rollout in flight'`) — UNLESS the ruleId
  IS the rollout's own `candidate_rule_id` (that publish IS the complete act);
  (ii) creating a second rollout for the family → 409 (endpoint) AND a partial unique
  index (DB, belt+braces);
  (iii) PATCH/DELETE of the referenced candidate draft → 409 (a drifting candidate
  destroys arm attribution). `domain_rules` is SERVER_ONLY-write, so the endpoint checks
  ARE the complete surface.
- **C-F REPLAY/CANARY NEVER SEE ROLLOUTS.** The rollout tier activates ONLY when the new
  OPTIONAL `rolloutUserId` opt is passed to `resolvePromptSegments` — and the ONLY call
  site that passes it is `stagesModel.ts` (production turn, `ctx.userId`). `eval-ci.ts`,
  the replay engine, and every other existing call site are byte-identical (C-B enforces
  eval-ci). Byte-comparability of replay arms is a law.
- **C-G promptRev DERIVATION UNTOUCHED.** `promptRevFrom` and the "promptRev = sha over
  the ORDERED resolved texts" discipline are byte-identical — promptRev IS the arm label;
  any shortcut destroys attribution. The candidate arm's rev emerges from the normal
  chain serving different text. Capture source for a rollout-served segment: the literal
  string `'rollout'` (the existing `'draft' | 'v<n>' | 'floor'` family gains one member).
- **C-H FAIL POSTURE = PRIOR TRUTH.** Any rollout-tier read error (rollout row fetch,
  candidate draft fetch, schema-invalid candidate payload) ⇒ that tier is SKIPPED for the
  turn — published/floor serves — with ONE loud `console.error`; `degraded` is NOT set
  (degraded means floor-forced-by-error; a skipped rollout serves the SAFE published arm,
  which is not degradation). The candidate is never the default in any failure mode.
  `'staged'` (0%) rows never serve regardless of bucket.
- **C-I MACHINE ARM DISJOINT (the eval-ci C-B law).** The cron endpoint
  `api/admin/rollout-guardrail.ts` NEVER imports `adminGuard`; auth = timing-safe compare
  of the `authorization: Bearer <secret>` header against env `CRON_SECRET` (the
  Vercel-cron native convention). Env unset ⇒ 503 naming ONLY the env var name; rejects
  are reason-only; the value is never echoed/logged (ADR-007 posture). The human
  "Evaluate now" arm lives in the ROLLOUT_MANAGE-gated lifecycle endpoint — both arms
  call the SAME pure core in `_lib`, neither imports the other's auth.
  **Vercel cron invokes with GET** — so on THIS endpoint, an authed GET IS the run
  (documented deviation from the eval-ci GET-echo pattern; an unauthed GET is 401 and
  side-effect-free, which preserves the safety property the echo pattern exists for).
- **C-J C9 EVERYWHERE.** Guardrail evaluations, audit rows, endpoint responses carry
  rates/counts/CIs/revs/ids ONLY — never segment text, reply text, or specimen content.
- **C-K SECRETS.** No secret values in code, tests, logs, or docs. New env NAME:
  `CRON_SECRET` (RULE-1 const in the endpoint, the `EVAL_CI_TRIGGER_SECRET_ENV`
  precedent).
- **C-L RESEAL BUDGETED.** This build edits seal-mapped files (`shared/grantPolicy.ts`,
  `shared/permissions.ts`) and the governance-model diagram — run the standing reseal
  ritual (rev 63→64) as its own commit, drift [OK] after. Do NOT treat the drift as a
  surprise (S34-1).

## 3 · GATED SUB-PHASES (commit per gate; message prefix given per gate)

### G1 — substrate: migration + constants + caps + probes  (`feat(l5-g1): …`)

**Migration `20260710180000_l5_progressive_delivery.sql`** (author EXACTLY this shape;
forward-only; idempotence guards in the standing style — `create table if not exists`,
`drop policy if exists` where applicable):

1. `publish_rollouts`:
   `id uuid primary key default gen_random_uuid()` · `family text not null` ·
   `target text not null` (the segmentId) · `candidate_rule_id uuid not null` ·
   `candidate_prompt_rev text not null` · `prior_prompt_rev text not null` ·
   `percent integer not null default 0 check (percent >= 0 and percent <= 100)` ·
   `state text not null default 'staged' check (state in ('staged','progressing','rolled_back','completed','cancelled'))` ·
   `created_by uuid references auth.users(id)` · `created_at timestamptz not null default now()` ·
   `updated_at timestamptz not null default now()`.
   Partial unique index `publish_rollouts_one_active_per_family` on `(family)` where
   `state in ('staged','progressing')`. RLS ON, ZERO policies; REVOKE ALL (incl. SELECT)
   from anon AND authenticated (the `user_quotas` posture — reads ride the gated endpoint
   via service role).
2. `rollout_audit`:
   `id uuid primary key default gen_random_uuid()` · `rollout_id uuid not null` ·
   `action text not null check (action in ('create','advance','evaluate','auto_rollback','cancel','complete'))` ·
   `actor_user_id uuid references auth.users(id)` (NULL = machine) ·
   `detail jsonb` · `created_at timestamptz not null default now()`.
   RLS ON, ZERO policies; REVOKE ALL (incl. SELECT) from anon AND authenticated
   (the `backend_trust_audit` posture).
3. `usage_empty_by_fingerprint(p_from timestamptz, p_to timestamptz)` returns table
   `(prompt_rev text, turns bigint, empty_turns bigint)` — language sql, SECURITY DEFINER,
   `set search_path = public`; body: select
   `d.config_fingerprint->>'promptRev'`, `count(*)`,
   `count(*) filter (where (d.payload->>'empty')::boolean is true)`
   from `public.telemetry_events d` where `d.type='message'` and
   `d.payload->>'kind'='turn_done'` and `d.config_fingerprint is not null` and
   `d.ts >= p_from and d.ts < p_to` group by 1. REVOKE EXECUTE FROM PUBLIC;
   GRANT EXECUTE TO service_role (the 20260709170000 lockdown pattern, applied at birth —
   never ship-then-fix).

**Code, same gate:**
- `shared/dbConstants.ts`: `PUBLISH_ROLLOUTS: 'publish_rollouts'`,
  `ROLLOUT_AUDIT: 'rollout_audit'` in `DB_TABLES`; a `ROLLOUT_STATES` const object +
  type; `ROLLOUT_AUDIT_ACTIONS` const (the `ROUTING_AUDIT_ACTIONS` precedent).
- `shared/permissions.ts`: `ROLLOUT_MANAGE: 'rollout:manage'` — super tier (the
  `ROUTING_EDIT_GLOBAL` placement precedent; SoD note in the comment: staging/advance/
  complete are promotion-tier acts).
- `shared/grantPolicy.ts`: both new tables → `WRITE_MODEL.SERVER_ONLY` with
  "AUTHORED, Operator-pending" provenance comments (truthful at build).
- `scripts/verifyGrants.ts`: `PROBES` rows —
  `[DB_TABLES.PUBLISH_ROLLOUTS]: { set: { family: '__p__' }, fcol: 'family', fval: '__nomatch__' }` ·
  `[DB_TABLES.ROLLOUT_AUDIT]:    { set: { action: '__p__' }, fcol: 'action', fval: '__nomatch__' }`;
  `SERVICE_ROLE_ONLY_FUNCTIONS` += `'usage_empty_by_fingerprint'`;
  `FN_EXECUTE_PROBES` entry with the REAL migration param names
  (`{ p_from: NO_WINDOW, p_to: NO_WINDOW }` — the benign zero-width window class). The
  existing coverage test (`verifyGrantsFnProbes.test.ts`) must pass WITHOUT edits — if it
  needs edits, the registry entry is wrong, not the test.
- **L1 param**: register `rollout.guardrailMinTurnsPerArm` in the agent-param registry
  (reference/agentParams.ts family — CORE kind, number, floor/reference default **50**,
  clamp **[10, 10000]**, NOT sessionTweakable). The L1 chain/clamp machinery is reused
  as-is; this is a registry row, not new machinery.

### G2 — resolution tier + bucket + empty stamp  (`feat(l5-g2): …`)

- `api/cwf/_lib/knowledge/rolloutBucket.ts` (NEW, pure, zero deps beyond node:crypto):
  `inRolloutSlice(rolloutId: string, userId: string, percent: number): boolean` —
  sha256 of the exact string `` `${rolloutId}:${userId}` ``, first 4 bytes big-endian as
  uint32, `% 10000 < percent * 100`. percent 0 ⇒ always false; 100 ⇒ always true.
  No `Math.random` anywhere in this phase.
- `PublishRolloutRepository` (NEW, service client, the repository conventions):
  `getActive(family)` (state in staged|progressing, the unique index guarantees ≤1) ·
  `create` · `updateState/percent` · `insertAudit` — every lifecycle mutation writes
  EXACTLY ONE audit row; a failed audit write fails the mutation loudly (audit-or-alarm).
- `resolvePromptSegments`: opts gain `rolloutUserId?: string | null` and an optional
  rollout-repo DI seam (tests). Tier order becomes:
  **draft (lab) > rollout > published > floor.** Rollout tier: only when `rolloutUserId`
  present AND repo configured; fetch active `'prompt.segment'` rollout; only
  `state==='progressing'` AND `inRolloutSlice(...)` serves; candidate text =
  `segmentTextFrom(getRuleById(candidate_rule_id))` for the rollout's `target` segment
  ONLY; capture source `'rollout'`. All failure modes per C-H. Existing behavior with the
  opt absent: byte-identical outputs (test-pinned truth table, §4).
- `stagesModel.ts`: the ONE call site passes `rolloutUserId: ctx.userId` (production).
- `stageStream.ts` + `turn/types.ts`: `ctx.surfacedEmpty?: boolean` — set `true` in the
  OBS-2 give-up branch (where `emptyCompletionMessage` replaces the text); the `turn_done`
  emit payload gains `empty: ctx.surfacedEmpty === true` (explicit false on normal turns).
  The retry loop, guard logic, and every other `stageStream` line: untouched (diff-scoped:
  the only hunks are the flag set + the payload key).

### G3 — lifecycle endpoint  (`feat(l5-g3): …`)

`api/admin/rollouts.ts` (the `routing-curation.ts` guard conventions —
`authed` + `ensurePermission`):
- `GET` (PANEL_ACCESS): active rollout (or null) + last N audit rows + the CURRENT
  guardrail verdict computed fresh (read-only evaluation — no audit row, no actuator).
- `POST action:'create'` (ROLLOUT_MANAGE): body `{ ruleId }`. Validate: row exists,
  `status===RULE_STATUS.DRAFT`, `kind_id===SYSTEM_KIND_IDS.PROMPT_SEGMENT`, key ∈
  `SEGMENT_IDS`. Run the Layer-1 gate (`runGate` with the kind def + published set — the
  `governance.publish` invocation mirrored EXACTLY, the result handled the same: gate fail ⇒
  200 `{created:false, failedStage, stages}` + audit-reject on `rule_audit`? NO —
  rollout gate failures audit to `rollout_audit` (`action:'create'`,
  `detail:{gate:'failed', failedStage}`) — `rule_audit` stays the publish family's
  ledger). **Layer-2 (golden) is NOT run at stage** — it stays where it lives, at the
  pointer flip (complete). Compute + store `prior_prompt_rev` (promptRevFrom over the
  CURRENT published-resolved set) and `candidate_prompt_rev` (same set with the
  candidate's text swapped into `target`). Insert `staged`/0%; audit `'create'`.
  One-active 409 per C-E.
- `POST action:'advance'` (ROLLOUT_MANAGE): body `{ percent }` — integer, > current,
  ≤ 100. First evaluate FRESH (the shared core): verdict `'regression'` ⇒ 409 (advancing
  into a known-red candidate is not a judgment call); `'underpowered'` ⇒ ALLOWED, verdict
  returned for display (an underpowered advisory must not hard-block a human — that is
  how gates get disabled). Set percent, state `'progressing'` if percent > 0; audit
  `'advance'` with `{from, to, verdict}`.
- `POST action:'evaluate'` (ROLLOUT_MANAGE): run the shared core WITH audit row
  (`'evaluate'`) AND the C-D actuator armed. Returns the verdict + per-arm counters/CIs.
- `POST action:'cancel'` (ROLLOUT_MANAGE): state `'cancelled'`, audit. Serving stops by
  construction (only `'progressing'` serves).
- `POST action:'complete'` (ROLLOUT_MANAGE): body `{ reason?, goldenRunId? }` — call the
  EXISTING `governance.publish(actor, candidate_rule_id, reason, { goldenRunId })`
  (Layer-2 fires HERE, untouched). On `published:true` ⇒ state `'completed'` + audit;
  on gate/Layer-2 reject ⇒ rollout UNCHANGED, return the publish result verbatim.
- `governance.ts` LEGIT OPEN, scoped: ONE guard hunk in `publish()` implementing C-E(i)
  (active-rollout check for `prompt.segment` drafts, candidate-ruleId exemption). The
  Layer-2 block, gate flow, version/audit writes: byte-identical (diff-scoped check).
- `api/admin/rules/[id].ts` + the draft PATCH/DELETE surface: the C-E(iii) 409 freeze.

### G4 — guardrail core + machine endpoint + cron  (`feat(l5-g4): …`)

- `api/cwf/_lib/replay/rolloutGuardrail.ts` (NEW): ONE exported evaluate core used by
  BOTH arms. Window = `[last 'advance' audit row's created_at (else rollout.created_at), now)`.
  Read `usage_empty_by_fingerprint(window)` via a thin service-role repository wrapper
  (the `UsageAnalyticsRepository` soft-fail conventions — but here a READ FAILURE means
  the evaluation returns a loud `'unavailable'` arm and the actuator does NOTHING: no
  data is never evidence). Pick the rows for `candidate_prompt_rev` / `prior_prompt_rev`;
  `wilsonInterval(empty_turns, turns)` per arm; POWER FLOOR: if either arm's `turns` <
  the resolved `rollout.guardrailMinTurnsPerArm` param ⇒ verdict is FORCED
  `'underpowered'` (never phrased "safe"; the CIs are still reported). Else
  `goldenVerdict(...)` per C-C. Pure decision, side effects in the callers.
- `api/admin/rollout-guardrail.ts` (NEW, machine arm per C-I): authed GET ⇒ evaluate +
  audit `'evaluate'` (machine: `actor_user_id` NULL, `outcome.actor:'rollout-guardrail'`)
  + the C-D actuator; response = verdict JSON (C9). No active rollout ⇒ 200
  `{ active: false }`, zero side effects. Unauthed ⇒ 401 reason-only.
- `vercel.json`: add
  `"crons": [{ "path": "/api/admin/rollout-guardrail", "schedule": "0 6 * * *" }]`
  (daily backstop; the human/panel arms are the primary cadence). Every other key in
  `vercel.json` byte-identical.

### G5 — RolloutTab (GOVERN)  (`feat(l5-g5): …`)

The RoutingTab registration precedent (nav + capability gating). Contents: active-rollout
card (family/target/percent/state, per-arm turns + empty counts + Wilson CIs, verdict
badge — UNDERPOWERED shown as "underpowered (n=<x>/<y>)", NEVER "safe/no effect");
staged-diff view (candidate text vs live published text for the target segment — the L2
diff affordance precedent); create (pick a ready prompt.segment draft) / advance /
evaluate / cancel / complete affordances, all `ROLLOUT_MANAGE`-gated (hidden without the
cap — matrix honesty); the audit drawer (the standing drawer pattern). RULE 26: rendered
evidence at 1280 AND 1024, nothing clips.

### G6 — stale-posture sweep + at-altitude diagram + reseal  (`docs(l5-g6): …`)

SANCTIONED SCOPE (the register's standing sweep, folded here — do NOT flag as creep):
- Flip the four stale GOLDEN-MARK-1 comments to "applied & live-verified 2026-07-10":
  `shared/grantPolicy.ts` GOLDEN_SPECIMENS row · the `shared/dbConstants.ts` golden
  block · `GoldenSpecimensRepository.ts` docblock · `goldenRun.ts` docblock. The last
  two files: comments-stripped byte-compare IDENTICAL (C-B).
- `public/architecture/diagrams/governance-model.html`: at-altitude update — add the
  `rollout:manage` matrix row + `publish_rollouts`/`rollout_audit` table rows (status:
  "AUTHORED, Operator-pending") + a version-note line; AND flip the SEVEN stale
  `Operator-pending` badges (routing L4 + golden — both families are applied &
  live-verified as of 2026-07-10).
- Living-doc lock-step: narrative/docs updates per the standing two-commit seal;
  **reseal rev 63→64** (C-L); `checkDocDrift` [OK] as the gate.

## 4 · SELF-VERIFY (evidence gates — literal, all must hold; paste outputs)

1. `npm run test` green; **test count strictly > 1853 and file count strictly > 174** —
   report the exact numbers (the Architect recounts independently; docs-only commits
   cannot move the count).
2. `npm run typecheck:api` green; `npx vite-node scripts/checkDocDrift.ts` → `[OK]`,
   manifest `docVersion` = rev 64.
3. Byte-pins: for every C-B path, paste `git diff b3e8148..HEAD -- <path> | wc -l` = 0;
   for the two comments-stripped pins, paste the comparator invocation + `IDENTICAL`.
4. Resolution truth table (unit tests, in-memory repos): (a) opt absent ⇒ output
   byte-identical to the pre-L5 resolver on the same fixtures; (b) `staged` never serves;
   (c) `progressing` + bucket-OUT ⇒ published; (d) `progressing` + bucket-IN ⇒ candidate
   text + capture `'rollout'` + a DIFFERENT promptRev than (c); (e) rollout fetch throws
   ⇒ published + loud + `degraded===false`; (f) candidate row missing/schema-invalid ⇒
   published + loud.
5. Bucket: determinism (1000 repeated calls, one answer); distribution sanity (10k
   synthetic userIds at percent=30 ⇒ in-slice fraction within 30% ± 2pts); percent 0 ⇒
   none, 100 ⇒ all; different rolloutIds re-shuffle membership.
6. Actuator fixtures (C-D): regression ⇒ `rolled_back` + ONE `auto_rollback` audit row
   with NULL actor + `outcome.actor:'rollout-guardrail'`; underpowered ⇒ ZERO state
   change, ZERO actuator audit; non_regressing (improvement) ⇒ ZERO state change; power
   floor (either arm < minTurns) ⇒ forced underpowered ⇒ ZERO action; usage read failure
   ⇒ `'unavailable'`, ZERO action.
7. 409 invariants: second rollout create; prompt.segment publish during an active rollout
   (and the candidate-ruleId EXEMPTION publishes fine); candidate draft PATCH/DELETE;
   advance into a fresh `regression` verdict.
8. Audit discipline: every lifecycle action ⇒ exactly ONE `rollout_audit` row (fixture
   count assertions); C9 — a grep over the new modules for forbidden payload fields
   (segment/reply text) comes back clean by construction of the row shapes.
9. Empty stamp: a give-up-path turn's `turn_done` payload has `empty: true`; a normal
   turn `empty: false` (harness assertions on the emitted event).
10. `verifyGrantsFnProbes.test.ts` passes UNEDITED; the two new PROBES rows + the fn
    entry present (grep evidence with the ACTUAL `DB_TABLES.*` constant names — RULE-1
    authoring, the S32-1/L4 lesson: never grep for inline table literals).
11. RULE 26: RolloutTab screenshots at 1280 and 1024.
12. Secrets: `git grep -n "CRON_SECRET"` shows the env NAME only in the RULE-1 const +
    docs; no value anywhere.

## 5 · REPORT FORMAT

Per gate: commit hash + one-paragraph delta + deviations (if any — disclosed, never
silent). Final: branch pushed, full §4 evidence block, the exact new test/file counts,
and the sentence "migration 20260710180000 AUTHORED, Operator-pending; CRON_SECRET env
must exist in Vercel production before the cron arm is live." Then STOP and wait for the
Architect's RULE-25 review.

<!-- END · claude-code-PHASE-L5-progressive-delivery-v1 · rev 1 · 2026-07-10 -->
