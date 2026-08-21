# CWF — Q: Chat-Quota + Usage-Analytics — Design Note · v1

<!-- cwf-Q-quota-usage-analytics-design-v1 · rev 1 · 2026-07-09
     Grounded at origin/master 91170b7 (1388 tests / 139 files / docVersion rev 55 / drift [OK] —
     independently re-verified this session: fresh clone, full suite run, drift gate).
     Program slot: EAIP-LIFECYCLE queue #1 (register v29). HC-1 + HC-2 apply. -->

## 0. Honest baseline (verified at HEAD, not from memory)

What EXISTS today:
- **Replay quota — complete.** `user_quotas` ledger (`20260707160000_user_quotas.sql:32-40`), atomic
  `replay_quota_reserve` (`:80-150`, FOR UPDATE serialized) + `replay_quota_settle` (`:161-173`),
  EXECUTE lockdown revoke-PUBLIC + grant-service_role (`:188-191`). Pure decision spec
  `api/cwf/_lib/replay/quotaMath.ts:43-59` (`reserveDecision`) + `:66-68` (`settleConsumed`) —
  **already family-agnostic**: no replay-specific input crosses either function. Super-admin console
  `api/admin/replay-quota.ts` (GET ledger∪all-time / PUT limit·no_limit / POST ?reset, QUOTA_MANAGE
  on every op), client surface `src/lib/adminService.ts:762-772` + `QuotaPanel.tsx`.
- **Per-turn token truth — recorded, never aggregated.** Every LLM attempt emits ONE `llm_call`
  telemetry event with `input_tokens/output_tokens/total_tokens/cost_estimate` + `payload.attempt`
  (`api/cwf/_lib/turn/stageStream.ts:90-127`); `telemetry_events` schema + `user_id,ts desc` index
  at `20260626130443:21-47`. Super-admin cross-user raw read exists (`api/admin/telemetry.ts`,
  TELEMETRY_READ_ALL) — rows only, **no series, no aggregate**.
- **L1 lane — live.** `REFERENCE_AGENT_PARAMS` decls with per-decl `sessionTweakable`
  (`knowledge/reference/agentParams.ts:57-59`), ONE chain + ONE clamp (`resolveParamValue`/
  `clampParamValue`, same file `:96-115`), resolver hosted with the stage-8 warm
  (`turn/stagesModel.ts:95-99`). Gateway has a per-call `temperature?` seam (`llm/gateway.ts:99`)
  and a **static** `maxOutputTokens: GEN_MAX_OUTPUT_TOKENS` (`gateway.ts:137`, env default 8192 at
  `llm/config.ts:24`).

What does NOT exist (the gap Q fills):
- **No chat quota of any kind.** `api/cwf/chat.ts` goes auth (`:48-51`) → pipeline (`:99`) →
  stream with zero budget gate. A user can burn unbounded tokens on the platform key.
- **No usage graphs anywhere** — neither personal nor global; no cost time-series; no
  cost↔fingerprint join despite L1's `turn_done` carrier existing for exactly this.
- **No per-call output-token clamp seam** — `maxOutputTokens` is a global constant.

## 1. Q-1 — CHAT-QUOTA: per-user monthly chat-token ledger

### 1.1 The shape (mirror, don't generalize)
A **NEW table `user_chat_quotas`** + **new fns `chat_quota_reserve` / `chat_quota_settle`**, each a
1:1 mirror of the replay posture: RLS on / NO client policy / revoke-all from anon+authenticated /
SECURITY DEFINER fns with revoke-PUBLIC + grant-service_role (the `20260707160000` block, lines
57-66 and 188-191, copied structurally). Committed AGAINST the alternatives:
- NOT a `family` discriminator column on `user_quotas` — that changes the live table's PK
  (user_id) and applied migrations are immutable/forward-only; a composite-PK rebuild on a live
  enforcement ledger is disproportionate risk for zero capability gain.
- NOT one parameterized fn over two tables — two small mirrored fns are independently
  FN_EXECUTE-probeable and keep the SECURITY DEFINER SQL branch-free.

The **pure math is reused as-is**: `reserveDecision`/`settleConsumed` MOVE from
`_lib/replay/quotaMath.ts` to `_lib/quota/quotaMath.ts` (a pure relocation; replay imports updated;
both suites must pass byte-identically — the module docblock's "mirrors replay_quota_reserve 1:1"
sentence gains "and chat_quota_reserve"). Rationale: the chat gate must not import from `replay/`
(layering), and the file is already family-agnostic (verified §0).

### 1.2 The gate seam (where deny happens)
`chat.ts`, immediately AFTER `getAuthContext` succeeds (`:48-51`) and BEFORE `withSpan`/pipeline:
ONE atomic `chat_quota_reserve(userId, ceiling, default_limit, min_turn)` call via a new
`UserChatQuotasRepository` (mirrors `UserQuotasRepository:99-140`). Deny → **429**
`{ error, resetsAt, consumed, limit }` — zero tokens spent, zero spans emitted (the turn never
starts; consistent with RULE 27's "no work, no spans" spirit). Allow → `reserved` rides on ctx.

**Fail-open with alarm (deliberate divergence from replay's fail-closed).** Replay fails closed
because a run spends tokens over unredacted cross-user truth — a security boundary. Chat quota is
a BUDGET control on the product's core loop; a Supabase outage must not take chat down (the code
already degrades gracefully DB-less — the suite runs that way). On reserve error: log
`[ChatQuotaGate]` + set a root-span attr `cwf.quota.degraded=true` + proceed unmetered. This is
audit-or-alarm compliant: the degradation is loud, never silent.

### 1.3 The clamp leg (honest partial)
Replay clamps perfectly because the engine budget is set pre-run. A chat turn **cannot pre-know its
input tokens** — the only physically clampable dimension is output. Committed:
- Gateway gains a per-call `maxOutputTokens?: number` field mirroring the `temperature?` seam
  (`gateway.ts:99` pattern; `:137` becomes `params.maxOutputTokens ?? GEN_MAX_OUTPUT_TOKENS`).
  Signature-additive; every existing call site unchanged.
- The stream stage passes `min(GEN_MAX_OUTPUT_TOKENS, reserved)` — every OBS-3 retry attempt
  shares it (same property L1 pinned for temperature).
- The residual honesty: input tokens can overshoot `reserved` within ONE turn; the settle true-up
  (§1.4) bounds monthly drift to ≤ one turn's overshoot. This is stated in the migration header
  and the fn comment — no "perfect clamp" claim anywhere.

### 1.4 The settle leg (multi-attempt aware)
ctx accumulates `actualTokens += total_tokens` at each `llm_call` emission (`stageStream.ts:107-110`
already has the numbers in hand; OBS-3 retries naturally SUM). Settle =
`chat_quota_settle(userId, reserved, actual)` joined into chat.ts's existing finally
`allSettled` (beside the writes-flush — a DB write, same failure posture: soft-fail, logged).
`settleConsumed` floor-at-0 semantics unchanged.

### 1.5 Policy values ride the L1 lane (HC-1)
Three new `REFERENCE_AGENT_PARAMS` decls on the `system` lane, ALL `sessionTweakable:false`
(lab must NEVER touch quota policy — the flag already governs the lab tier structurally,
`agentParams.ts:109-115`):
- `quota.chatMonthlyTokensDefault` — floor 5_000_000, min 100_000, max 1_000_000_000
- `quota.chatMinTurnTokens` — floor 10_000, min 1_000, max 1_000_000 (the deny floor)
- `quota.chatTurnCeiling` — floor 200_000, min 10_000, max 10_000_000 (the per-turn reserve)

Resolved by a dedicated `resolveQuotaPolicy()` that reuses `resolveParamValue`+`clampParamValue`
(same chain, lab tier structurally absent — the gate runs pre-labMode) with its OWN small
system-rows fetch, because the gate sits BEFORE stage 8 where `resolveAgentParams` is hosted
(`stagesModel.ts:99`) — the same "honest extra roundtrip" precedent L1 set. Bounds come from the
CODE decls (a poisoned publish cannot widen its own bounds — the L1 property carries over).
Seeded by extending `scripts/seedAgentParams.ts` (idempotent, publish-only-where-none — existing
tested property). Fingerprint: the new rows enter `paramsCapture` automatically (it captures ALL
published `agent.param` rows) — quota-policy changes flip the paramsHash, which is CORRECT
(policy IS config).

### 1.6 HC-2 sandbox parity — scoped honestly
Quota policy VALUES get full parity via the L1 lane they ride (draft → gate → publish → reset,
already shipped machinery). The LEDGER (counters) has no sandbox concept — it is enforcement
state, like `replay_audit`; HC-2 applies to governed FAMILIES, and the family here is the policy
values, which conform. The per-user SET/no_limit/reset console mirrors replay-quota's (§1.7).

### 1.7 Admin console + personal window
- `api/admin/chat-quota.ts` — structural mirror of `replay-quota.ts` (QUOTA_MANAGE, GET/PUT/POST,
  updated_by stamping). QuotaPanel grows a family switch (Replay | Chat) over the same row UI.
- The user's OWN quota state (limit/consumed/resetsAt) surfaces through the Q-2 personal endpoint
  (§2.2) — the ledger is service-role-only, so that endpoint is the personal window, exactly as
  `replay-quota.ts`'s header describes for admins.

## 2. Q-2 — USAGE-ANALYTICS: token/cost time-series

### 2.1 The aggregation engine (the JS-reduce precedent does NOT scale)
`ReplayAuditRepository.allTimeTokensByActor` fetches every row and reduces in JS
(`ReplayAuditRepository.ts:55-70`) — fine for replay_audit's tiny cardinality, WRONG for
`telemetry_events` (months × turns × attempts). Committed: ONE read-only SQL function
`usage_daily_series(p_user_id uuid /*null = global*/, p_from timestamptz, p_to timestamptz)`
returning `(day date, turns bigint, tokens bigint, cost numeric)` — a `date_trunc('day', ts)`
GROUP BY over `type='llm_call'` rows, riding the existing `(user_id, ts desc)` index
(`20260626130443:44-47`). SECURITY DEFINER, service-role-only EXECUTE (the standing lockdown
block), **FN_EXECUTE_PROBES row + coverage in-phase** (`scripts/verifyGrants.ts:91` registry).
Caller scoping is by construction: the personal endpoint passes `ctx.userId`, never a body value.

### 2.2 Two gated windows, one function
- **GET `/api/cwf/usage`** (personal — HC-2's "usage view for everyone"): authed, NO extra cap;
  returns the caller's daily series (bounded window, default 90d) + their chat-quota state
  (limit/consumed/resetsAt via the service repo, scoped to ctx.userId) + all-time totals.
- **GET `/api/admin/usage-analytics`** (TELEMETRY_READ_ALL — the `admin/telemetry.ts` precedent):
  global series (`p_user_id = null`) + per-user leaderboard (a second small aggregate fn or a
  `group by user_id` variant, decided in the phase prompt) + the cost board.

### 2.3 Cost↔rev breakdown (the L1 fingerprint payoff)
`turn_done` events carry `config_fingerprint` and share `session_id = turnId` with the turn's
`llm_call` rows (RULE 28 — one id). The admin endpoint optionally joins the two by session_id to
bucket cost by `promptRev`/`paramsHash` — "what did config X cost us". Phase-1 scope: the join
exists as an optional `?byFingerprint=1` aggregate; a full drill-down UI is a later polish item.

### 2.4 UI
- **QuotaPanel — user graph**: selecting a row loads that user's daily series (admin endpoint,
  `?user=`); a small bar/line chart + the existing ledger columns.
- **Global cost board**: a new GOVERN-side card/tab (placement: beside QuotaPanel) — global daily
  tokens+cost, 30/90d toggle, top-N users, optional fingerprint buckets. `.admin-theme` tokens +
  existing shadcn only; bilingual `t()`; both legibility gates must stay green (RULE 16).

## 3. Hidden traps (named up front)

1. **Chat ≠ replay reserve semantics.** Replay knows its budget pre-run; chat's input tokens are
   unknowable pre-stream. The design's answer is ceiling-reserve + output-clamp + settle-true-up;
   anyone "improving" this to a perfect pre-clamp is designing fiction.
2. **Fail-open is deliberate** (§1.2) — do not "harden" chat quota to fail-closed in review; that
   couples chat availability to Supabase. The loud-degradation attr is the invariant.
3. **The gate runs pre-pipeline** — it cannot reuse the stage-8 param resolution; a "free reuse"
   claim there would repeat the L1-v1 error mode. The extra fetch is the honest cost.
4. **Lab exclusion is load-bearing**: `sessionTweakable:false` on all three policy decls; a test
   must pin that a labMode turn CANNOT alter its own quota policy.
5. **JS-reduce over telemetry_events is a scaling trap** (§2.1) — the SQL aggregate fn is
   non-negotiable; do not mirror `allTimeTokensByActor` here.
6. **Settle must sum attempts** — an OBS-3 retried turn has ≥2 `llm_call` events; settling only
   the last attempt under-counts.
7. **The seed fn gains rows** — `seedAgentParams.ts` runs BEFORE any `seedRules.ts` re-run
   (existing ORDER constraint, CHANGELOG L1 §2.7) — unchanged, but the Operator prompt restates it.

## 4. Non-goals (this phase)
Per-model/per-provider budget split · org/team quotas · billing export · real-time streaming
usage dashboards · retention/purge job (pre-existing telemetry TODO, separate item) · fingerprint
drill-down UI beyond the `?byFingerprint=1` aggregate · replay/chat ledger unification.

## 5. Migration + probe obligations (standing rules, restated as gates)
- ONE forward migration: `user_chat_quotas` + 2 fns + `usage_daily_series` (+ its leaderboard
  variant if separate) — every fn gets the revoke-PUBLIC/grant-service_role block.
- verifyGrants: `user_chat_quotas` **PROBES row** + `chat_quota_reserve`/`chat_quota_settle`/
  `usage_daily_series` **FN_EXECUTE_PROBES rows** — in-phase, coverage tests green.
- Two-door: migration + seed extension AUTHORED (AG) ≠ APPLIED (Operator, `db push` ONLY, FENCE
  block first); confirm = schema read + anon-deny table probe + fn EXECUTE anon-deny probes +
  literal reads of the 3 seeded policy rows.
- Sealed docs state actual state ("authored, Operator-pending") until the DOC-FLIP.

<!-- END · cwf-Q-quota-usage-analytics-design-v1 · rev 1 · 2026-07-09 -->
