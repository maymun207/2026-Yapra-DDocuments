# CWF — MEASURE-1 Design Note · v1
<!-- cwf-measure-1-design-note-v1 · 2026-08-02 · S78 · Architect: Claude.
     Master rollout plan item 1.1. Ratified inputs: S71 umbrella decision
     (FEEDBACK-1 + HEALTH-DASH-1, three phases, producer-first, three hard
     rulings) · S78 five riders + dashboard draft v2 (this note is the draft's
     FILED home — the artifact debt closes here) · M1-P0 (count honesty) as
     the foundation stone, in flight at authoring time.
     Earned premises (computed this session, fresh clone @ 29e4965f):
     wilsonInterval lives in api/cwf/_lib/replay/pairedReplay.ts (reused by
     canaryRun) · golden_specimens curation endpoint exists (api/admin/) ·
     messages.trace_id = ctx.turnId = the ONE turn id (RULE-28 migration
     20260705140000) · zero existing turn_feedback/thumbs code · admin tab
     whitelist currently 16 tabs (adminTabs.ts). -->

## §1 · Three hard rulings (S71, unchanged, binding)
1. **Never auto-learning.** Feedback flows to HUMANS and MEASUREMENT only.
   The path to learning exists solely through the eval-gate by human
   disposition. Feedback is never a prompt input, never a knowledge source,
   never a viz data source (F166 sibling).
2. **Denominator honesty.** Every rate ships with Wilson interval (reuse
   pairedReplay.wilsonInterval) and a governed minimum-N; below N the card
   is GRAY, never green, never red.
3. **Every 👎 is a golden candidate.** One click from the queue into the
   existing golden_specimens curation rail — curation stays human.

## §2 · Phase F1 — the producer (turn_feedback)
- ONE table `turn_feedback`: trace_id (joins messages.trace_id — the ONE
  turn id, RULE-28; never a second id), conversation_id, user_id, verdict
  up|down, optional bounded reason_text, created/updated. UNIQUE(user_id,
  trace_id), latest-wins upsert (a user may change their mind). RLS:
  user inserts/reads OWN rows; admin reads via service role.
- Chat UI: 👍/👎 on assistant messages; 👎 opens optional reason field.
- ZERO reads from the turn pipeline — structurally: no pipeline file may
  import the feedback repository (test-pinned).
- ONE migration, Operator-applied (ADR-005), verifyGrants row per standing
  security rule.

## §3 · Phase F2 — the data layer
- Aggregates as deterministic SQL/endpoint rollups (daily series): turn
  volume, error classes, p95, grounded-answer rate, feedback rates, token
  spend. **Cost split real vs synthetic** by actor attribution (the
  injector's identity), never by heuristics.
- **Useful-turn ratio — the anchor metric, PROXY v1 (deterministic, named
  as proxy on the card):** a turn counts useful when it completed without
  runtime error AND produced either (a) attributed evidence (≥1 chip) or
  (b) an honest withhold (clarification / in-law refusal / UNKNOWN-
  attributed). Denominator = turn_done events (F211 folds in here). The
  TRUE definition upgrades when feedback data matures — the card's fine
  print says which definition it is showing.
- **W2.4 withholding counter:** honest-withhold turns as a neutral series —
  displayed uncolored; withholding is correctness, not failure.
- **governed `health.*` thresholds** on the agent.param rail (CONFIG
  layer): minN, p95 warn ms, useful-turn warn %, feedback-queue age warn —
  values changed only through the gated params surface, audited.
- **Honesty-violations card feed:** violations = 0 BY CONSTRUCTION
  (M1-P0's countGuard closed the class); the card's footnote counts
  CountUnavailableError occurrences (last 7d) as "measurement failures
  CAUGHT" — catches are successes, never violations.

## §4 · Phase F3 — the surfaces
- Admin tab 17: **'health' ("Sağlık")** — the dashboard draft v2 filed
  here as its band spec: page-level verdict chip ("İYİ — N uyarı") + the
  "worst thing, named" line; then six bands — 1 Omurga (prod/CI/backends/
  observability/DB) · 2 Konuşmalar (volume, new-error-classes, p95,
  grounded rate) · 3 Kullanıcı sesi (👍/👎 + Wilson, unreviewed-👎 queue
  size, 👎→golden conversions) · 4 Bilgi & yönetişim (published rows, last
  gate verdict, aging drafts, golden last run, entity registry, memory
  tick) · 5 Güven & maliyet (per-backend earned trust, tenant-zero CI,
  monthly tokens vs ceiling, per-turn cost) · 6 Gece işleri (synthetic,
  forget tick, rollout guardrail — "underpowered" stays gray — cron
  health). Hero strip carries anchor metric + honesty card + W2.4.
- Direction-aware trend arrows on every card (↑ red on p95/cost, ↑ green
  on volume) — series from F2.
- Gray-card law everywhere: no data / below-N = gray with the reason.
- Every card deep-links to its existing room (Stages · Trust · Memory ·
  Replay · Rollout…) — the dashboard is an index, never a dead end.
- **Feedback queue:** unreviewed 👎 list (turn link, reason, age) + the
  one-click golden-candidate action.

## §5 · Out of scope, named (so nothing sneaks in)
Auto-learning · sentiment/LLM judging of feedback · surveys/NPS · any
pipeline read of feedback · episode-importance feed from feedback (a
FUTURE gated decision by name, not built here) · alerting/notifications
(a later rider once thresholds prove themselves).

## §6 · Sequencing and shape
F1 → F2 → F3, one gated phase prompt each, D-1 recon riding on this
note's computed premises plus a per-phase G0 live read (S65-1). F1 carries
the only migration. F3 grows the tab whitelist 16 → 17. Each phase names
its post-deploy proof read (S63-1): F1 = a real 👍 row read from the
table after a live click; F2 = one aggregate endpoint returning a series
that matches a hand-checked day; F3 = the tab rendering with REAL greens,
REAL grays, and the verdict line, witnessed at container width (RULE-26).

— END · cwf-measure-1-design-note-v1 —
