# claude-code · PHASE Q-1 — CHAT-QUOTA + USAGE-ANALYTICS · v1

<!-- claude-code-PHASE-Q-1-chat-quota-usage-analytics-v1 · rev 1 · 2026-07-09
     Architect-authored gated phase prompt. Design source of truth:
     cwf-Q-quota-usage-analytics-design-v1.md (owner-approved 2026-07-09).
     Anchor: origin/master 91170b7 · 1388 tests / 139 files / docVersion rev 55 / drift [OK].
     You may ask exactly ONE clarifying design question before implementing; otherwise
     execute this spec exactly — do not redesign. -->

---

## §0 · MISSION

Ship the Q slice of the EAIP-LIFECYCLE program:

**Q-1 (enforcement):** a per-user **monthly chat-token quota** — a 1:1 structural mirror of the
shipped REPLAY-QUOTA-1 posture (`user_quotas` / atomic reserve→clamp→settle / service-role-only
ledger) — gating `POST /api/cwf/chat` **before any token is spent**, with policy values riding the
L1 `system` param lane (HC-1) and a **fail-open-with-alarm** outage stance (deliberate divergence
from replay's fail-closed; rationale in §3.2 — do not "harden" it).

**Q-2 (visibility):** token/cost **time-series analytics** over `telemetry_events` `llm_call`
rows via SQL aggregate functions (service-role-only EXECUTE), surfaced through TWO gated windows:
a **personal usage view for every authed user** (HC-2) and a **super-admin analytics console**
(global series · per-user drill-down · top-N leaderboard · optional config-fingerprint cost
buckets — the L1 payoff).

**UX mandate (owner-emphasized):** every human touchpoint in this phase is a designed experience,
not an error string. §4 is a full UX contract — the 429 moment, the proactive indicator, the
empty/loading/error states, bilingual copy, number/date humanization. Treat §4 with the same
rigor as the SQL.

---

## §1 · PRE-FLIGHT (hard gate — abort and report if ANY fails)

1. Fresh state: `git fetch origin && git rev-parse origin/master` → MUST print `91170b7…`.
   If HEAD moved, STOP and report the new hash — do not proceed on a stale anchor.
2. Clean worktree on a new branch `feat/q1-chat-quota-usage` cut from `origin/master`.
3. Baseline suite: `npx vitest run --reporter=dot` → MUST be **1388 passed / 139 files**.
4. **Drift gate green:** `npm run check:doc-drift` → MUST print `[OK]`.
5. `npm run typecheck:api` and `npx tsc -b` and `npx vite build` → all clean at baseline.
6. Confirm the anchors this spec is written against still hold (grep, don't trust):
   - `api/cwf/_lib/replay/quotaMath.ts` exports `reserveDecision`/`settleConsumed`.
   - `supabase/migrations/20260707160000_user_quotas.sql` contains the EXECUTE lockdown block
     (`revoke execute … from public;` + `grant execute … to service_role;`).
   - `api/cwf/_lib/llm/gateway.ts` line ~99 `temperature?: number` seam; line ~137
     `maxOutputTokens: GEN_MAX_OUTPUT_TOKENS`.
   - `api/cwf/chat.ts` — `getAuthContext` at ~:48, `withSpan(TURN_ROOT_SPAN_NAME…` after it,
     `runTurnPipeline(ctx)` at ~:99, a `finally`-side `allSettled` join for writes/flush.
   - `knowledge/reference/agentParams.ts` — `REFERENCE_AGENT_PARAMS` decl array with
     `sessionTweakable` per decl; `resolveParamValue` + `clampParamValue` exported.
   - `scripts/verifyGrants.ts` — `PROBES` and `FN_EXECUTE_PROBES` registries + coverage tests.
   Any anchor mismatch → STOP, report the drift verbatim, wait for the Architect.

---

## §2 · HARD CONSTRAINTS (violating any = the phase is rejected)

- **Secrets:** never print/commit tokens, keys, connection strings. Env names only.
- **No new runtime npm dependencies.** Charts are hand-rolled inline SVG (§4.6). Date/number
  humanization uses the platform `Intl` APIs. If you believe a dep is unavoidable, that is your
  ONE clarifying question — do not install first.
- **Frozen (diff MUST be empty; grep-pin in self-verify):**
  `api/cwf/_lib/knowledge/gate/evalGate.ts` · `api/cwf/_lib/turn/configFingerprint.ts` ·
  `api/cwf/_lib/prompt/**` · `api/cwf/_lib/replay/**` EXCEPT the `quotaMath` relocation's import
  lines (§3.1) · all grounding/trust/scope modules · `api/admin/replay-quota.ts` ·
  `supabase/migrations/*existing*` (applied migrations are immutable — ONE new migration only).
- **Telemetry contract:** the existing `message` / `llm_call` event shapes are byte-identical
  (assert in tests). The ONLY new emission is the deny-side `type:'error'` event (§3.2) — the
  `type` CHECK at `20260626130443:26` admits `'error'`; do NOT touch the CHECK.
- **RULE 1:** no inline magic numbers — window bounds, thresholds, top-N caps live in
  `shared/dbConstants.ts` (or the existing client constants home for pure-UI thresholds).
- **RULE 28:** never mint a per-turn id. The deny path has NO turn id (the turn never starts) —
  the deny telemetry row's `session_id` is `null`.
- **RULE 16 / RULE 26:** both legibility gates green; nothing clips at 1280×1024; no horizontal
  scroll introduced anywhere.
- **i18n:** zero hardcoded user-facing strings — every new string goes through the existing
  translation mechanism with BOTH `tr` and `en` keys (locate the existing dictionary; follow its
  key style).
- **Merge:** `--no-ff` (squash banned). Two-commit seal (code commit → reseal commit).
- **Migration two-door:** you AUTHOR the migration + seed extension; you NEVER apply. Every
  sealed doc states **"authored, Operator-pending"** for DB state. No exceptions.
- **ONE clarifying question budget** — spend it before writing code, or not at all.

---

## §3 · SERVER DESIGN CONTRACT

### 3.1 Pure core relocation (zero behavior change)
Move `api/cwf/_lib/replay/quotaMath.ts` → **`api/cwf/_lib/quota/quotaMath.ts`** (new dir).
Pure relocation: file content unchanged EXCEPT the module docblock's "mirrors
`replay_quota_reserve` 1:1" sentence gains "and `chat_quota_reserve`". Update every import
(runtime + tests) to the new path. The moved test file keeps every assertion byte-identical.
Rationale (leave as a code comment): the chat gate must not import from `replay/`; the math is
already family-agnostic.

### 3.2 The gate seam in `chat.ts`
Insert between the successful `getAuthContext` (~:48-51) and the `withSpan(TURN_ROOT_SPAN_NAME…)`
call — the reserve is **pre-root-span by construction** (a denied turn emits ZERO spans; leave a
comment citing this as deliberate):

```
resolveQuotaPolicy() ──► UserChatQuotasRepository.reserve(userId, ceiling, defaultLimit, minTurn)
        │                        │
        │                        ├─ repo/DB error → FAIL-OPEN: console.error('[ChatQuotaGate] degraded: …'),
        │                        │   quota = { degraded:true }, proceed unmetered. Later, inside the root
        │                        │   span, stamp attr `cwf.quota.degraded = true` (audit-or-alarm: loud,
        │                        │   never silent). Do NOT convert this to fail-closed — replay fails
        │                        │   closed because it spends over unredacted cross-user truth (a security
        │                        │   boundary); chat quota is a budget control and MUST NOT couple chat
        │                        │   availability to Supabase.
        │                        │
        │                        ├─ allowed:false → **429** JSON
        │                        │   `{ error:'quota_exceeded', consumed, limit, resetsAt }`
        │                        │   + best-effort deny telemetry: `type:'error'`, `user_id`,
        │                        │   `session_id:null`, `payload:{ kind:'chat_quota_denied', consumed,
        │                        │   limit }` (soft — a telemetry failure never blocks the 429)
        │                        │   + `console.log('[ChatQuotaGate] denied user=… consumed=… limit=…')`.
        │                        │   RETURN — nothing else runs.
        │                        │
        │                        └─ allowed:true → quota = { reserved, consumed, limit, noLimit,
        │                                                    resetsAt, degraded:false }
        └─ passed into createTurnContext(...) → ctx.quota
```

**`resolveQuotaPolicy()`** — new `api/cwf/_lib/knowledge/resolveQuotaPolicy.ts`:
- Returns `{ monthlyDefault, minTurn, turnCeiling }`.
- Reuses `resolveParamValue` + `clampParamValue` from `agentParams.ts` and **the existing
  system-published-rows fetch inside `resolveAgentParams.ts`** — export that fetch helper if it
  is currently module-private; do NOT duplicate its query. The lab tier is structurally absent
  here (the gate runs pre-labMode) AND the three decls are `sessionTweakable:false` — state both
  in the docblock.
- On DB outage: code-floor values (HC-1's outage floor). No env tier for these three (unlike
  temperature's legacy `GEN_TEMPERATURE`); the code decl IS the floor — comment this explicitly.
- This pre-span fetch is unspanned by construction — comment it (RULE 27 note).

**Policy decls** — append to `REFERENCE_AGENT_PARAMS` (`agentParams.ts:57ff`), all
`type:'number'`, all **`sessionTweakable:false`**, `stage:'00'` (pre-pipeline gate):

| key | value (floor) | min | max |
|---|---|---|---|
| `quota.chatMonthlyTokensDefault` | 5_000_000 | 100_000 | 1_000_000_000 |
| `quota.chatMinTurnTokens` | 10_000 | 1_000 | 1_000_000 |
| `quota.chatTurnCeiling` | 200_000 | 10_000 | 10_000_000 |

Add matching `AGENT_PARAM_KEYS` entries. If the seed-instances helper (`agentParams.ts:67`)
derives from the decl array, `scripts/seedAgentParams.ts` extends automatically — verify and
state which; if not derived, extend the script with the three published-v1 upserts under the
existing idempotent publish-only-where-none property (that property's test must still pass).
These rows enter `paramsCapture` → the config-fingerprint `paramsHash` moves after publish;
that is CORRECT (policy is config) — add one test comment acknowledging it; the fingerprint
CODE stays frozen.

**Deliberate invariant (comment at the clamp site):** with the seeded floors,
`minTurn (10 000) > GEN_MAX_OUTPUT_TOKENS (8 192)` — an ALLOWED turn is never output-clamped
below normal generation; the clamp (§3.4) only binds under exotic admin-published policy. Add a
unit test pinning `minTurn floor > GEN_MAX_OUTPUT_TOKENS` so a future floor edit trips it.

### 3.3 Migration (ONE file, authored only)
`supabase/migrations/20260709?????? _chat_quota_and_usage_analytics.sql` — timestamp must sort
AFTER `20260709120000`. Contents, in order:

1. **`user_chat_quotas`** — column-for-column mirror of `user_quotas`
   (`20260707160000:32-40`): same defaults EXCEPT `monthly_limit_tokens` default
   `5000000`; same trigger reuse (`set_updated_at`); RLS on / NO policies; revoke-all from
   anon+authenticated; table+column comments adapted (say "chat-turn token ledger"; state the
   honest-clamp nuance from the design note §1.3: input tokens are unknowable pre-stream, so
   monthly drift is bounded to ≤ one turn's overshoot via settle true-up).
2. **`chat_quota_reserve(uuid,bigint,bigint,bigint)`** and
   **`chat_quota_settle(uuid,bigint,bigint)`** — body-for-body mirrors of the replay pair
   (`:80-150`, `:161-173`) against `user_chat_quotas`. Keep the FOR UPDATE serialization comment.
3. **`usage_daily_series(p_user_id uuid, p_from timestamptz, p_to timestamptz)`**
   → `table(day date, turns bigint, tokens bigint, cost numeric)` — `type='llm_call'`,
   `p_user_id is null OR user_id = p_user_id`, `ts >= p_from and ts < p_to`,
   `group by date_trunc('day', ts)::date order by 1`. `turns = count(distinct session_id)`
   (RULE 28: one id per turn ⇒ distinct sessions in-window = turns; attempts collapse),
   `tokens = coalesce(sum(total_tokens),0)`, `cost = coalesce(sum(cost_estimate),0)`.
4. **`usage_totals_by_user(p_from timestamptz, p_to timestamptz)`**
   → `table(user_id uuid, turns bigint, tokens bigint, cost numeric)` — same predicate minus the
   user filter, `group by user_id`, `order by tokens desc`.
5. **`usage_by_fingerprint(p_from timestamptz, p_to timestamptz)`**
   → `table(prompt_rev text, params_hash text, turns bigint, tokens bigint, cost numeric)` —
   join `llm_call` rows to their turn's `turn_done` row **on `session_id`** (the
   `telemetry_events_session_id_idx` carries it): turn_done = `type='message' and
   payload->>'kind'='turn_done' and config_fingerprint is not null`; group by
   `config_fingerprint->>'promptRev'`, `config_fingerprint->>'paramsHash'`. Turns lacking a
   stamped `turn_done` row simply don't appear (pre-L1 history) — comment it.
6. **EXECUTE lockdown for ALL FIVE functions** — the standing block, per function:
   `revoke execute … from public;` + `grant execute … to service_role;` (the
   `20260707160000:188-191` pattern, including its "revoking from anon/authenticated alone is a
   NO-OP" rationale comment once at the top of the block).
7. `notify pgrst, 'reload schema';`

All functions `security definer set search_path = public`; the three analytics fns are
READ-ONLY (state it in their comments). Migration header carries the honest status line:
**"authored, Operator-pending"**.

### 3.4 Repositories + ctx + clamp + settle
- **`UserChatQuotasRepository`** — mirror `UserQuotasRepository:99-140` (reserve fail-closed
  SHAPE at the repo level is fine — the FAIL-OPEN decision lives at the chat.ts call site, which
  treats a `null`/error reserve as degraded). `list/setLimit/reset` mirrors for the admin console.
- **`UsageAnalyticsRepository`** — three thin `rpc()` wrappers (`dailySeries(userId|null, from,
  to)`, `totalsByUser(from,to)`, `byFingerprint(from,to)`); soft-fail to `[]` with a
  console.error (read-path).
- **ctx (`turn/types.ts` + `turn/context.ts`):** `quota: { reserved, consumed, limit, noLimit,
  resetsAt, degraded } | null` (null only when auth-less test harnesses construct ctx —
  keep existing harness ergonomics: make it optional-with-default in `createTurnContext`) and
  `actualTokens: number` (init 0).
- **Accumulation (`stageStream.ts` onFinish, beside :107-110):**
  `ctx.actualTokens += usage?.totalTokens ?? ((usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0));`
  — OBS-3 retries sum naturally. The emitted `llm_call` event object is UNCHANGED.
- **Clamp (`llm/gateway.ts`):** add `maxOutputTokens?: number` beside the `temperature?` seam
  (mirror its REPLAY-B docblock style, cite Q-1 §3.4); `:137` becomes
  `maxOutputTokens: params.maxOutputTokens ?? GEN_MAX_OUTPUT_TOKENS`. The stream stage passes
  `Math.min(GEN_MAX_OUTPUT_TOKENS, ctx.quota.reserved)` when `ctx.quota && !ctx.quota.degraded`
  (noLimit's reserved = ceiling ≥ GEN_MAX with floors, so passing it is harmless — comment).
  Every retry attempt shares the SAME value (same params object — pin with a gateway-spy test
  exactly like L1's `paramsGatewayWiring`).
- **Settle (`chat.ts` finally):** join
  `chatQuotas.settle(userId, ctx.quota.reserved, ctx.actualTokens)` into the existing
  `allSettled` beside writes-flush, ONLY when `ctx.quota && !ctx.quota.degraded &&
  !ctx.quota.noLimit`. Skip-reasons commented (noLimit never decremented at reserve → a settle
  would corrupt the counter; degraded reserved nothing). Soft-fail + `[ChatQuotaGate] settle
  failed` log. Crash-before-settle leaks the reservation until the month roll — same accepted
  property as replay; one comment.
- **SSE `done` payload (additive):** wherever the client-facing `done` event is written, add
  `quota: { consumed, limit, noLimit, resetsAt } | { degraded:true } | undefined` from
  `ctx.quota` (undefined when null). Comment the honesty nuance: this is the RESERVE-time
  counter — it may overstate by the unspent reservation until settle; the personal endpoint
  (§3.5) reads the settled ledger; the client treats this as an optimistic conservative value.
  Pin additivity: an existing done-shape test gains the new key, every prior key unchanged.

### 3.5 Endpoints
- **`GET /api/cwf/usage`** (new) — authed (the standard `getAuthContext`/`authed` used by chat
  — locate and reuse; NO extra capability: HC-2's everyone-window). Query `?days=` clamped to
  `[1, USAGE_SERIES_MAX_DAYS]`, default `USAGE_SERIES_DEFAULT_DAYS` (constants: 90 / 30 in
  `shared/dbConstants.ts`). Returns:
  ```
  { quota: { limit, consumed, noLimit, resetsAt } | null,   // null ⇒ no ledger row yet →
                                                             // client renders defaults note
    series: [{ day, turns, tokens }],                        // NO cost on the personal window
    allTime: { turns, tokens },
    windowDays }
  ```
  `series` from `usage_daily_series(ctx.userId, …)` — the userId comes from ctx BY CONSTRUCTION,
  never from the request (comment it). `allTime` = one wide-window call (from epoch constant) —
  same fn, no second fn. Personal window deliberately omits cost (product call: platform cost is
  admin-facing) — comment it.
- **`GET /api/admin/usage-analytics`** (new) — `ensurePermission(TELEMETRY_READ_ALL)` (the
  `admin/telemetry.ts` precedent). Params: `?days=` (same clamp) · `?user=<uuid>` → that user's
  series · `?byFingerprint=1` → the fingerprint buckets · default → `{ series (global),
  leaderboard: top USAGE_LEADERBOARD_N (constant, default 10, hard max 50) }`. All shapes typed.
- **`/api/admin/chat-quota`** (new) — a structural mirror of `api/admin/replay-quota.ts`
  (QUOTA_MANAGE on EVERY op; GET ledger rows / PUT `{userId, monthlyLimitTokens}` or
  `{userId, noLimit:true}` / POST `?reset=1`; `updated_by = ctx.userId` stamping). GET's all-time
  column: reuse `usage_daily_series`? No — all-time chat spend per user =
  `usage_totals_by_user(epoch, now)` mapped in (ONE call, not N). PUT's minimum bound: the
  monthly limit must be `≥` the resolved `quota.chatMinTurnTokens` (mirror replay's
  `≥ REPLAY_TOKEN_BUDGET` guard with the quota-policy floor).

### 3.6 verifyGrants (in-phase, non-negotiable)
- `PROBES` += `user_chat_quotas` row (an UPDATE probe against a harmless column — follow the
  existing row shapes).
- `FN_EXECUTE_PROBES` += FIVE rows: `chat_quota_reserve`, `chat_quota_settle`,
  `usage_daily_series`, `usage_totals_by_user`, `usage_by_fingerprint` (arg shapes matching the
  signatures).
- Both coverage tests (table-classification coverage + fn coverage) must pass — if
  `grantPolicy.ts` classifies tables, add `user_chat_quotas` there too.

---

## §4 · UX CONTRACT (design for the HUMAN — owner-mandated rigor)

Everything below is bilingual (`tr`/`en` via the existing mechanism), `.admin-theme`-token or
chat-theme-token styled (no raw hex), keyboard-reachable, and RULE-26 clean at 1280×1024. Copy
below is NORMATIVE — use it (translate the TR faithfully; keys follow the existing style).

### 4.1 The 429 moment (the single most important screen of this phase)
When the send fetch returns **429**, the human must experience an INTENTIONAL, calm boundary —
never a crash, never a toast, never raw JSON:
- Render a **`QuotaLimitNotice`** as a distinct block in the message list where the assistant
  reply would have appeared (icon + card, visually quieter than an error — this is a policy
  boundary, not a failure):
  - **Title** — tr: `Aylık kullanım limitine ulaştın` · en: `You've reached your monthly usage limit`
  - **Body line 1** — a horizontal usage bar (§4.6 component) at 100%, labeled
    `{consumed formatted} / {limit formatted} token`.
  - **Body line 2** — tr: `Limitin {resetsAt:human} tarihinde yenilenecek.` ·
    en: `Your limit resets on {resetsAt:human}.` — humanized via `Intl.DateTimeFormat`
    (long date, locale from the app language) **plus** relative days when < 15 days:
    tr: `({n} gün sonra)` · en: `(in {n} days)`.
  - **Body line 3 (muted)** — tr: `Limitini artırmak için yöneticinle iletişime geç.` ·
    en: `Contact your administrator to raise your limit.`
- The user's just-typed message stays visible in the composer (NOT cleared — they may want to
  copy it); the send action re-enables (a later grant may unblock them) but the header indicator
  flips to the **exceeded** state (§4.2) from the 429 payload immediately.
- No automatic retry. No repeated notices for repeated sends — if the LAST rendered block is
  already a `QuotaLimitNotice`, a subsequent 429 only pulses it (subtle highlight animation),
  never stacks duplicates.

### 4.2 The proactive indicator (never let a human hit the wall blind)
A small **`UsageIndicator`** chip in the chat shell header (place it in the existing header
cluster; pick the slot that does not crowd 380px mobile — verify with the mobile breakpoint):
- **States:**
  - `hidden` — no data yet, or `degraded` (fail-open turn) — render NOTHING (a broken meter is
    worse than no meter).
  - `normal` (< 80%) — a quiet ring/bar + `{pct}%` text, tooltip
    tr: `Aylık kullanım: {consumed} / {limit} token` · en: `Monthly usage: {consumed} / {limit} tokens`.
  - `warn` (≥ 80%) — amber accent; ONCE per session additionally show a dismissible inline hint
    under the composer — tr: `Aylık limitinin %{pct}'ini kullandın.` ·
    en: `You've used {pct}% of your monthly limit.`
  - `exceeded` (≥ 100% or after a 429) — red accent, `{pct}%` capped display at `100%`.
  - `noLimit` — an understated `∞` glyph, tooltip tr: `Limitsiz kullanım` · en: `Unlimited usage`.
- **Data flow:** initialize from `GET /api/cwf/usage` on shell mount; update OPTIMISTICALLY from
  every SSE `done.quota` snapshot (comment in store: reserve-time value, conservatively
  overstated until settle — acceptable because it never understates); a `done.quota.degraded`
  leaves the last known state untouched. Thresholds (80 / 100) are named constants — no inline
  literals (RULE 1).
- Clicking the chip opens the Usage view (§4.3). `aria-label` = the tooltip text.

### 4.3 The personal Usage view (`UsageView` — modal/drawer from the indicator)
Layout, top to bottom:
1. **Period card:** the usage bar (large), `{consumed} / {limit}` humanized, reset date line
   (same humanization as §4.1), `noLimit` renders the bar full-width neutral with the ∞ badge
   and NO percentage. `quota:null` (no ledger row yet) renders the bar at 0 with a muted note —
   tr: `Varsayılan limit uygulanır: {default}` · en: `Default limit applies: {default}` (the
   default comes from the endpoint? NO — keep the endpoint honest: `quota:null` means no row;
   the client shows the note WITHOUT a number if the default isn't in the payload. Decision:
   include `defaultLimit` in the `/api/cwf/usage` payload (resolved policy value) so the note
   can show the real number — add it to §3.5's shape.)
2. **Daily chart:** inline-SVG bar chart (§4.6) of `tokens` per day; window toggle
   `30g/90g` · `30d/90d` (segmented control; re-fetch on switch); hover/focus on a bar shows a
   tooltip `{day:short} — {tokens} token / {turns} tur|turns`.
3. **All-time line:** tr: `Toplam: {tokens} token · {turns} konuşma turu` ·
   en: `All-time: {tokens} tokens · {turns} turns`.
- **Loading:** skeleton bars (existing skeleton pattern if present, else a pulsing token-styled
  placeholder). **Fetch error:** an inline retry state — tr: `Kullanım verisi yüklenemedi.` +
  `Tekrar dene` · en: `Couldn't load usage data.` + `Retry` — NEVER fake zeros on a failed
  fetch (this is where empty≠zero applies at the render layer: fetch-failed ≠ zero usage).
  **Genuine zero:** days with no rows ARE zero usage (an append-only ledger's absence semantics
  — zero-fill the series client-side across the window; comment the distinction so nobody
  "fixes" it into a gap state).

### 4.4 Admin — QuotaPanel grows up (Ledger | Analytics)
Restructure `QuotaPanel.tsx` into two inner tabs (existing admin tab pattern):
- **Ledger tab:** a **family switch** `Replay | Chat` (segmented control, default Chat — it is
  the new center of gravity). Same table columns as today; the Chat family wires to
  `/api/admin/chat-quota` via new `adminService` methods (mirror `:762-772`). Row actions
  unchanged (set limit / no-limit / reset) with the SAME confirm dialogs. Add one humanization
  pass BOTH families benefit from: token numbers formatted (§4.6), `resetsAt` as
  `date (+in n days)`, `updatedBy` as the existing user rendering (reuse whatever UM ships for
  identity display; if it's a raw uuid today, wrap it in the existing `HashChip`
  click-to-copy). **Row selection** highlights the row and opens…
- **the drill-down strip** (right side panel or below-table expand — pick the one that survives
  1280×1024 without clipping): the selected user's daily chart (admin endpoint `?user=`),
  window toggle, and their leaderboard rank line.
- **Analytics tab:** top: **global daily chart** (tokens as bars + cost as a thin overlaid line
  with a right-side axis label `$`), window toggle 30/90. Below: **Top users** table
  (rank · user · turns · tokens · cost) from `leaderboard`. Below (collapsed by default):
  **`Konfigürasyona göre maliyet` / `Cost by configuration`** — the `?byFingerprint=1` table
  (`promptRev` short-hash chip · `paramsHash` short-hash chip · turns · tokens · cost), each
  hash a `HashChip` (click-to-copy, the L1 TweakTab pattern). Empty state — tr:
  `Bu aralıkta damgalı tur yok (L1 öncesi geçmiş görünmez).` · en:
  `No stamped turns in this window (pre-L1 history is not shown).`
- Every table: loading skeleton, error-with-retry, empty state with a human sentence (never a
  bare dash), and NO layout shift between states (reserve heights).

### 4.5 Copy & humanization rules (apply everywhere in this phase)
- **Numbers:** `formatTokens(n)` — `< 10 000` → grouped digits; `≥ 10 000` → compact
  (`12,4K` / `1,2M` style via `Intl.NumberFormat(locale, {notation:'compact'})`); tooltips always
  carry the exact grouped number. One shared util, used by chat AND admin sides.
- **Dates:** `formatResetDate(iso, locale)` — long date + relative-days suffix under 15 days.
  One shared util.
- **Currency:** cost renders with `Intl.NumberFormat(locale, {style:'currency',
  currency:'USD'})` at 2 decimals, tooltip carries 4 decimals (estimates are estimates — the
  column header says `Maliyet (tahmini)` / `Cost (est.)`).
- Percentages round DOWN below 100 (never show `100%` at 99.6 — a human trusts the meter more
  than the fine print), and cap at `100%` display when exceeded.

### 4.6 The chart component (shared, dependency-free)
ONE small `UsageBarChart` (src/components/shared or the existing shared home): inline SVG,
props `{ points: {day, tokens, turns, cost?}[], showCostLine?: boolean }`, theme-token colors
only, `viewBox`-responsive (no fixed pixel width — must not clip at 380 mobile NOR 1280 admin),
focusable bars (`tabindex`, `aria-label` per bar = the tooltip text), a `<title>` fallback for
tooltips + the styled hover tooltip. Max ~150 lines; no animation libraries; a `prefers-reduced-
motion` guard on the one pulse animation (§4.1).

---

## §5 · GATED SUB-PHASES (each gate: suite green + the listed literal evidence; do not start
the next before the previous gate holds)

- **Q1-a — Pure core:** quotaMath relocation · 3 policy decls + keys · `resolveQuotaPolicy` ·
  the `minTurn > GEN_MAX_OUTPUT_TOKENS` pin. Gate: moved quotaMath suite byte-identical
  assertions; new `resolveQuotaPolicy` tests (floor path · DB path · clamp-on-poisoned-bounds ·
  lab-absence is structural, add a test proving a labMode-carrying context CANNOT influence the
  resolved policy).
- **Q1-b — Migration + repos + probes:** the ONE migration · both repositories ·
  `verifyGrants` PROBES + 5 FN rows + grantPolicy classification. Gate: coverage tests green;
  `grep -c 'revoke execute' <migration>` = 5 and `grep -c 'grant  execute' <migration>` = 5;
  migration header contains the literal string `authored, Operator-pending`.
- **Q1-c — Gate wiring:** chat.ts seam · ctx fields · accumulation · gateway `maxOutputTokens?`
  · clamp pass-through · settle join · done payload · deny telemetry. Gate: the §6 wiring
  suites green; frozen-path greps empty (§7.3); the done-shape additivity test.
- **Q1-d — Endpoints:** `/api/cwf/usage` (+`defaultLimit`) · `/api/admin/usage-analytics` ·
  `/api/admin/chat-quota`. Gate: §6 endpoint suites green incl. all 401/403 shapes and the
  by-construction userId-scoping test.
- **Q2-a — Chat-side UX:** `UsageIndicator` · `UsageView` · `QuotaLimitNotice` · store 429 +
  done.quota handling · i18n keys · shared format utils + `UsageBarChart`. Gate: chat
  legibility gate green; store tests green.
- **Q2-b — Admin UX:** QuotaPanel Ledger|Analytics + family switch + drill-down + analytics
  tab + fingerprint table + adminService methods. Gate: admin legibility gate green; component
  tests green.
- **Q3 — Seal:** CHANGELOG entry (honest status: migration+seed **authored, Operator-pending**)
  · docVersion reseal rev 55 → **rev 56** · drift gate `[OK]` · two-commit seal · push branch ·
  report.

---

## §6 · REQUIRED TESTS (enumerate in the report with counts; add more where honest, never fewer)

**Pure/server:** quotaMath relocation suite (unchanged assertions) · `resolveQuotaPolicy` (≥5:
floors, DB-published override, clamp from CODE bounds on a widened DB row, non-finite → floor,
lab-cannot-influence) · policy-decl invariants (3 decls present, all `sessionTweakable:false`,
`minTurn floor > GEN_MAX_OUTPUT_TOKENS`) · seed extension (derived-or-explicit; the
never-clobber-published property still green) · `UserChatQuotasRepository` (reserve rpc arg
mapping, error→null) · `UsageAnalyticsRepository` (3 wrappers, soft-fail `[]`).

**Wiring:** deny → 429 shape `{error, consumed, limit, resetsAt}` + zero pipeline entry +
deny-telemetry emitted with `session_id:null` and telemetry-failure-doesn't-block-429 ·
fail-open path (repo throws → turn proceeds, `[ChatQuotaGate] degraded` logged, root-span attr
set) · allow → ctx.quota populated · accumulation sums TWO attempts (OBS-3-style retry fixture)
· gateway-spy: retries share ONE `maxOutputTokens` = `min(GEN_MAX, reserved)` · settle called
with `(reserved, actualTokens)` exactly once; SKIPPED on noLimit and on degraded · settle
soft-fail logged, response unaffected · done payload additive (old keys byte-identical) ·
existing `message`/`llm_call` event shapes unchanged (assert absence of new keys).

**Endpoints:** usage: 401 unauth · shape incl. `defaultLimit` · `?days` clamp both ends ·
userId from ctx (a spoofed `?user=` param is IGNORED — pin it) · quota:null passthrough.
usage-analytics: 403 non-super · global vs `?user=` vs `?byFingerprint=1` wrapper routing.
chat-quota: 403 non-super · PUT bound `≥ minTurn` rejects below · reset flow · GET maps
all-time via ONE `usage_totals_by_user` call.

**Client:** store 429 → QuotaLimitNotice state + indicator exceeded + composer text preserved +
duplicate-429 no-stack · done.quota updates indicator; degraded leaves state · UsageIndicator
threshold states (79/80/100/noLimit) from constants · format utils (compact, exact-tooltip,
round-down-below-100, cap-at-100) · UsageView zero-fill vs fetch-error distinction (zero-filled
days render bars-at-0; a rejected fetch renders the retry state, NEVER zeros) · QuotaPanel
family switch calls the right service · fingerprint-table empty state.

---

## §7 · SELF-VERIFICATION (literal evidence in the report — build-green alone is REJECTION)

1. **Counts:** final `npx vitest run` total (expect ≥ **1388 + ~55**; report the exact number)
   and file count; `typecheck:api`, `tsc -b`, `vite build` clean; oxlint no NEW warnings.
2. **Gates:** `check:doc-drift [OK]` post-reseal · adminLegibility + chatLegibility green.
3. **Frozen-path proof (paste the empty outputs):**
   `git diff 91170b7 -- api/cwf/_lib/knowledge/gate/evalGate.ts` → empty ·
   `git diff 91170b7 -- api/cwf/_lib/turn/configFingerprint.ts` → empty ·
   `git diff 91170b7 -- api/cwf/_lib/replay/ ':!api/cwf/_lib/replay/**quotaMath*'` → import-line
   changes ONLY (paste the diff, it must be import paths and the deleted file) ·
   `git diff 91170b7 -- api/admin/replay-quota.ts` → empty.
4. **Migration proof:** the two `grep -c` counts from Q1-b · `grep -n 'authored, Operator-pending'`
   hits in the migration header AND the CHANGELOG entry.
5. **Probe proof:** paste the 5 new `FN_EXECUTE_PROBES` keys + the `PROBES` key; both coverage
   tests' names in the passing output.
6. **UX proof:** the i18n key list (tr+en) added; confirmation that every §4 state has a
   component test or an explicit rendered-state assertion; the indicator threshold constants'
   names + home file.
7. **Diff scope:** the full `git diff --stat 91170b7..HEAD` — every touched path must be inside
   §8; anything outside = explain or revert.
8. **Seal:** the two commit shas (code, reseal), branch pushed, remote hash reported. The merge
   itself waits for the Architect's RULE-25 review — do NOT merge to master.

---

## §8 · DIFF SCOPE (whitelist — the standing extras included)

`api/cwf/_lib/quota/quotaMath.ts`* (moved) · `api/cwf/_lib/replay/**` import lines only ·
`api/cwf/_lib/knowledge/reference/agentParams.ts` · `api/cwf/_lib/knowledge/resolveQuotaPolicy.ts`*
· `api/cwf/_lib/knowledge/resolveAgentParams.ts` (fetch-helper export only) ·
`scripts/seedAgentParams.ts` (only if seed isn't decl-derived) ·
`supabase/migrations/2026070*_chat_quota_and_usage_analytics.sql`* ·
`api/cwf/_lib/persistence/repositories/UserChatQuotasRepository.ts`* ·
`api/cwf/_lib/persistence/repositories/UsageAnalyticsRepository.ts`* ·
`api/cwf/_lib/persistence/index.ts` · `api/cwf/_lib/turn/{types,context,stageStream}.ts` ·
`api/cwf/_lib/llm/gateway.ts` · `api/cwf/chat.ts` · `api/cwf/usage.ts`* ·
`api/admin/chat-quota.ts`* · `api/admin/usage-analytics.ts`* · `scripts/verifyGrants.ts` ·
`shared/dbConstants.ts` · `src/lib/adminService.ts` · the chat-side API client home ·
`src/store/cwfStore.ts` · `src/components/chat/{UsageIndicator,UsageView,QuotaLimitNotice}.tsx`*
· `src/components/shared/UsageBarChart.tsx`* (or the existing shared home) · the shared format
utils home* · `src/components/admin/QuotaPanel.tsx` (+ its new subcomponents*) · the i18n
dictionary file(s) · tests (new* + the named harness-touched) · `public/architecture/manifest.json`
· `.agents/CHANGELOG.md` · `.agents/AGENTS.md` + `.agents/skills/cwf-project-kb/SKILL.md` if
their standing sections reference quotas/params. (* = new file.) Anything else = out of scope.

---

## §9 · REPORT FORMAT

The standard phase report: sub-phase table with gate evidence · the §6 test inventory with
per-suite counts · the §7 items in order with pasted literal outputs · disclosed deviations as
a numbered least-deviation list (the L1 precedent: disclose, don't improvise silently) · the
ONE question if you spent it, with where its answer landed · commit shas + branch + remote hash.

## §10 · NON-GOALS (rejection if built)

Per-model/provider budget split · org/team quotas · billing export · telemetry retention/purge ·
fingerprint drill-down UI beyond the collapsed table · replay/chat ledger unification · any
`labMode` tier for quota policy · fail-closed chat gating · new npm dependencies · applying the
migration.

<!-- END · claude-code-PHASE-Q-1-chat-quota-usage-analytics-v1 · rev 1 · 2026-07-09 -->
