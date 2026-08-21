# RECON · MEASURE-1 F2 (rollout 1.3 · Veri katmanı) · v1_1
<!-- RECON-M1F2-DATA-LAYER-1-v1_1 · 2026-08-03 · S80 · Architect: Claude Opus 5.
     AMENDS v1 (S37-1: presented artifacts are immutable; amend = new version).
     Three deltas, all evidence-driven, listed in §7.
     D-1 thin recon. NO phase prompt is written until this document exists.
     Every value below comes from a command run THIS session against a fresh
     RULE-25 clone at origin/master = e214b7e60ec3f1d14fca1f41883eea1184046af5
     (D-3: nothing hand-transcribed, nothing recalled). -->

## §0 · Provenance (the commands, by name)

| Claim | Command |
|---|---|
| floor hash / branches / migrations / test files | `git clone` → `git rev-parse origin/master` · `git branch -r` · `git merge-base --is-ancestor` · `ls supabase/migrations/*.sql \| wc -l` · vitest `include`-glob find |
| every schema line below | `awk '/create table if not exists public.<t>/,/^\);/' supabase/migrations/*.sql` |
| every code line below | `grep -rn --include=*.ts` over `api/`, `shared/`, excluding `__tests__` |
| aggregate SQL fns | `grep -n "create or replace function" supabase/migrations/20260709160000_chat_quota_and_usage_analytics.sql` |
| cron schedule | `python3 json.load(open('vercel.json'))['crons']` |

Prod at recon time: `dpl_4H9Jbj7Yy1qruafTpib7SFjxhKwK`, READY, `target=production`,
SHA `e214b7e6…` (Vercel `list_deployments`).

---

## §1 · The question the bootstrap asked, answered

> *"hangi sayım hangi tablodan geliyor, `telemetry_events` mi `turn_feedback` mi,
> sentetik ayrımı hangi alandan okunuyor"*

**R1 · The synthetic split is a TABLE BOUNDARY, not a field.** There is no
`is_synthetic` column to read, and 1.3 must not invent one.

`telemetry_events` has exactly **two** writers in the whole repo:
* `api/cwf/_lib/turn/stagesGovernance.ts:29` — `ctx.telemetry.record(...)`, i.e.
  every `ctx.emit` from the chat turn pipeline;
* `api/cwf/chat.ts:115` — the quota-DENY row, `session_id: null` by construction.

Grepped and absent: the synthetic injector, the golden runner, the replay lenses
and the eval canary never call `TelemetryRepository.record`. The injector runs
**frame-only** (`runSyntheticInjectorTick.ts` header: *"drives NO pipeline, writes
NOTHING"* for full-turn mode; frame mode writes `synthetic_runs` only), so it
produces **no** `messages` row and **no** `telemetry_events` row.

**⇒ `telemetry_events` is already real-user-only, structurally.** The existing
`usage_daily_series` needs no synthetic filter; it never had contamination.
Synthetic spend is a **second read against a second table**, rendered as its own
number — never summed into the real one.

**R2 · Synthetic spend is an ESTIMATE by construction, and must be labelled one.**
`ESTIMATED_TOKENS_PER_ROUTER_CALL = 400` (`runSyntheticInjectorTick.ts:36`), whose
own comment says `routeSemantica` surfaces no usage and this is *"a documented
conservative ESTIMATE for the ledger/ceiling, not precise metering."* Real spend
(`telemetry_events.total_tokens` / `cost_estimate`) is metered. Two different
epistemic classes; the cost band renders them as two rows, never one total.

---

## §2 · What already exists — do not rebuild

| Asset | Location | Note |
|---|---|---|
| `usage_daily_series(uuid, tstz, tstz)` | migration `20260709160000` | per-day `turns / tokens / cost`; `p_user_id null` ⇒ global; service-role-only EXECUTE, revoked from public |
| `usage_totals_by_user`, `usage_by_fingerprint` | same migration | per-user leaderboard, per-config-fingerprint cost |
| `usage_empty_by_fingerprint` | **migration `20260710180000`** (v1 CORRECTION: there are FOUR usage_* functions, across TWO migrations — v1 said three) | the L5 guardrail's evidence read; **the only one with an honest null-on-failure contract** |
| `FN_EXECUTE_PROBES` | `scripts/verifyGrants.ts:111+` | single-source list of service-role-only fns whose anon EXECUTE must be 42501-denied, with a CI coverage test. **Any new SQL function in 1.3b lands here** |
| `GET /api/admin/usage-analytics` | `api/admin/usage-analytics.ts` | already gated on `TELEMETRY_READ_ALL`, pure read, days clamped |
| `exactCountOrThrow` / `CountUnavailableError` | `api/cwf/_lib/persistence/countGuard.ts` | the 1.0 guard — **every 1.3 count goes through it** |
| `wilsonInterval` | `api/cwf/_lib/replay/pairedReplay.ts` | reused by `canaryRun.ts`; the design note's ruling 2 |
| governed param rail | `api/cwf/_lib/knowledge/reference/agentParams.ts` `AGENT_PARAM_KEYS` | `health.*` lands here with the `MEMORY_TTL_DAYS` posture: db > code-floor, no lab tier, `sessionTweakable:false` |
| `turn_feedback` | migration `20260802160000` (applied) | `trace_id text`, `unique(user_id, trace_id)`, verdict `up\|down` — joins by VALUE on `trace_id` (RULE 28) |
| honest-null precedent | `EpisodesRepository.countHealth` (F221) | `{total: number\|null}` — "not measured" survives to the surface |

---

## §3 · Three traps the design note could not have seen

### R3 · SYNTH-SPEND-FOLD-1 — a spend fence that disarms itself when raised (NEW)

```ts
// SyntheticRunsRepository.tokensSpentToday()
if (error) { console.error(...); return 0; }
return ((data ?? []) as {tokens:number}[]).reduce((s,r) => s + (r.tokens ?? 0), 0);
```

Two independent silent-zero faults in one method:

1. **Failed read folds to 0** — the exact `HEAD-COUNT-SILENT-204-1` class that 1.0
   closed. It survived because M1P0's census was scoped to `head:true` count reads
   (19 sites / 15 folds); this is a `select('tokens')` + `reduce`, so it was
   outside the declared arm. Consequence: a DB blip reads as *"nothing spent
   today"* and the injector keeps injecting.
2. **Unpaginated select** — PostgREST caps at db-max-rows (1000) with **no
   truncation signal**. At the code floor (`dailyTokenCeiling` 200 000 ÷ 400 =
   **500 rows/day**) this is under the cap today. The governed param's declared
   `max` is **2 000 000** ⇒ **5 000 rows/day**: the read silently caps at ~400 000
   and the ceiling can **never** trip. The fence fails exactly at the moment a
   human widens it through the admin panel.

**Scope call (FIX-SCOPE-TRUTH-1, flagged not absorbed):** 1.3's cost band cannot
state synthetic spend truthfully while its only reader is both silently-zeroing
and silently-truncating. The repair rides **inside** 1.3 as a named sub-gate.
This is an extension beyond the plan's one-line wording for 1.3 — declared here
so the owner can veto it rather than discover it in the diff.

### R4 · The denominator and the numerator disagree about which turns exist

* `usage_daily_series` counts `turns = count(distinct session_id)` over
  **`llm_call`** rows.
* The design note's useful-turn ratio counts over **`turn_done`** rows
  (`type='message'` + `payload.kind='turn_done'`, `stageStream.ts:434`).
* `chat.ts:242` decides once, before any SSE byte, whether the turn asks instead
  of answering; `runClarificationTurn` **replaces** `runStreamStage`. A
  clarification turn therefore emits `clarification_asked`
  (`stageClarify.ts:465`) and has **no `turn_done` row and no `llm_call` row**.
* A quota-denied turn writes one `type='error'` row with `session_id: NULL` — it
  cannot join to anything.

**⇒ the honest-withhold class the numerator wants to CREDIT is structurally
missing from both candidate denominators.** Today this is latent, not active:
`computeTurnClarification` is a no-op while `router.frameRouting` is dark, and it
is dark. Building the ratio on `turn_done` alone would ship a metric that silently
breaks on the day A23 turns that switch on.

**Committed path:** denominator = distinct `session_id` over
`turn_done ∪ clarification_asked`. Quota-denied turns are a **separate named
row** ("reddedilen tur"), never folded in — they have no turn id and joining them
would be a fabrication.

### R5 · p95 has no SQL home, and an in-code p95 is a 1000-row lie

`latency_ms` is populated on `llm_call` (`stageStream.ts:201`) and `tool_call`
(`stageTools.ts:584`) rows. The only percentile helper in the repo is
`quantile(...)` inside `routeShadowLens.ts:855`, which operates on an in-memory
array. Reading a day of latencies into JS would hit the same silent 1000-row cap
as R3.

**Committed path:** p95 is a new SQL aggregate beside `usage_daily_series`, same
posture (service-role-only EXECUTE, `revoke ... from public`, `notify pgrst`).

---

## §4 · The evidence signals that actually exist for "useful turn"

There is **no persisted chip count**. The deterministic ledger facts available:

| Signal | Where |
|---|---|
| tool executed, succeeded | `type='tool_call'`, `tool_name` not null, `payload.ok=true` |
| grounding violated | `type='error'`, `payload.kind='grounding_violation'`, `payload.count` |
| answer was empty | `turn_done.payload.empty` (explicit `false` on normal turns) |
| procedure rules retrieved | `turn_done.payload.procedureRulesRetrieved` |
| honest withhold | `payload.kind='clarification_asked'`, `payload.level` |
| LLM failed | `type='error'`, `payload.kind='llm_error'` |
| quota degraded / denied | `turn_done.payload.quotaDegraded` · `payload.kind='chat_quota_denied'` |

The design note's PROXY v1 is buildable from exactly this set and nothing else.
The card's fine print names it a proxy — as §3 of the note already requires.

---

## §5 · CENSUS (added at v1_1) — the class is bigger than R3

R3 was one site. A mechanical census over
`api/cwf/_lib/persistence/repositories/*.ts` (error branch → literal `0`/`[]`,
line-numbered, run this session) returns **31 sites**. They are not one class:

**Class A — measurement / ledger / actuator / fence (must be repaired):**
`SyntheticRunsRepository.tokensSpentToday` (fence + 1000-row cap) ·
`UsageAnalyticsRepository.dailySeries` / `totalsByUser` / `byFingerprint` (1.3's
own spine) · the four `Number(x) || 0` mapper lines (68/83/106/121 — a genuine
SQL `null` becomes `0`) · `ToolCacheRepository.clearAll` (the count lands in an
**audit row**; missed by M1P0 because it is a `delete().select()`, not a head
count) · `TurnTraceDigestRepository.deleteOlderThan` (reported cron result).

**Class B — fail-open human-read lists (left alone, named, carried):** the
remaining ~24, plus `RoutingCacheMetaRepository.getEpoch`, whose `0` is a
documented deliberate *"degrade to no change"* on the advisory routing layer.
Named deferral is legitimate; silent deferral is not (S61-2).

**Sharpest single finding:** `UsageAnalyticsRepository` holds the right posture
and the wrong one in the same file. `emptyByFingerprint` returns `null` on
failure and its comment gives the reason — *a fabricated `[]` would mislabel an
outage as evidence* — because its consumer is an actuator. Its three siblings
return `[]`. 1.3 was about to make those three the dashboard's spine.

**Ruling minted (MEASURE-READ-HONESTY-1):** a read feeding a measurement, a
durable ledger row, an actuator or a spend/safety fence MUST distinguish "no
data" from "could not read"; fail-open is the right of human-read lists only.
Tested both directions per D-5 — it must fire on every Class A site and must NOT
fire on Class B.

---

## §6 · Shape 1.3 will take — TWO gates, not one (v1_1 revision)

The plan item **1.3 does not change**; its execution takes two gated phases,
because they are different risk classes and cannot share one RULE-25 review.

**1.3a · `PHASE-M1F2A-HONEST-READ-1`** (code + tests + docs only; NO migration,
NO Operator door, NO new surface): the Class A repair, the spend fence with its
paging proof, consumer truthfulness at the render layer, reseal. Starts
immediately — it has zero cross-lane dependency.

**1.3b · `PHASE-M1F2B-DATA-LAYER-1`** (one migration, Operator-applied):
1. SQL aggregates beside the existing four — daily turn/verdict/withhold series
   over the R4 union, error-class counts, latency p95 (R5: p95 has no SQL home
   and an in-code p95 would hit the same 1000-row lie).
2. Governed `health.*` thresholds on the `agent.param` rail (`minN`,
   `p95WarnMs`, `usefulTurnWarnPct`, `feedbackQueueAgeWarnHours`), posture copied
   from `MEMORY_TTL_DAYS`.
3. One gated `TELEMETRY_READ_ALL` read endpoint; every count via
   `exactCountOrThrow`; `verifyGrants` `FN_EXECUTE_PROBES` row per new function.
4. Proof read (S63-1): one aggregate endpoint returning a series that matches a
   hand-checked day.

**Why this order and not the reverse:** authoring 1.3b's endpoint on top of
readers that fold an outage to zero is precisely S79's L2 — compensating for a
defect you have not diagnosed installs blindness. No surface work in either; the
tab is 1.4.

---

## §7 · What changed from v1

1. **Correction:** v1 said "the existing three" usage_* functions. There are
   **four**, across two migrations; the fourth (`usage_empty_by_fingerprint`) is
   the one carrying the honest contract this phase generalises.
2. **Census added (§5):** R3 was one site; the class is 31 censused sites split
   into Class A (repair now) and Class B (named, carried).
3. **Shape revised (§6):** one phase became two gates, with the ordering argued.

## §8 · Owner-facing items

**None.** The R3 scope disposition v1 asked for was ratified by the owner on
2026-08-03 ("bozuk ve güvenilmez ile hayat devam etmez") and is now the wider
Class A repair in 1.3a. This document is an Architect working base — it is
**not a relay**; only the phase prompt travels to AG.

<!-- END · RECON-M1F2-DATA-LAYER-1-v1 -->
