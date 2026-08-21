# claude-code-PHASE-OBS-LEGIBILITY-1-v1.md

<!-- v1 · 2026-07-15 · Architect-authored · branch: obs-legibility-1 · profile: FULL
     (api/** + observability surface). Design contract: cwf-obs-legibility-1-design-v1_2
     (owner-approved). CI = sole test arbiter (S43-2); merge ONLY on green unsharded CI.
     PLATINUM: all deliverables are automatic at runtime (write-time enrichment, span
     stamping, client-side grouping); the parity mapping is TEST-enforced, never
     hand-maintained; no manual step is created. -->

## 0 · PRE-FLIGHT GATE (hard)
- `git rev-parse origin/master` == `86a233395f7544ffbe773e1cc95ec92c8ec9628a`
  (VIZ-BIND-2 merge). STOP if not.
- Branch `obs-legibility-1` off master. `npm ci` clean. Drift gate green.
- Confirm anchors: `api/cwf/chat.ts` root span (~:143, `withSpan(TURN_ROOT_SPAN_NAME…`
  with only TRACE_SESSION_ID + TRACE_USER_ID); `scrubIoData`
  (api/cwf/_lib/observability/redaction.ts:~183); `withStageSpan`
  (observability/spans.ts, prefix from config); the 10 pipeline stage names in
  `api/cwf/_lib/turn/pipeline.ts` (resolve-mcp … warm-trust) + `'stream'` in chat.ts;
  `src/components/admin/InspectTab.tsx` flat list + relative windows + Langfuse
  trace deep-link (~:71); `src/components/admin/stagesRegistry.ts` `spans[]` per
  stage + `stagesRegistry.test.ts` C-9d pins.
- **Discovery gate (report findings in the phase report, adapt without changing the
  contract):** (a) locate the turn-scoped `message` telemetry event's emit site
  (TelemetryRepository.record path) and whether ANY telemetry event already carries
  the conversation id — if yes, REUSE that key, do not mint a second (RULE-28
  spirit); (b) confirm the exact `LangfuseOtelSpanAttributes` input/output key
  names available in observability/config.ts — if absent, add them THERE (RULE 1),
  matching the Langfuse OTel attribute convention already used by the MCP-span I/O.

## 1 · HARD CONSTRAINTS
- **ADR-004 line holds:** ledger = minimal + write-time-redacted; trace plane may
  carry full scrubbed I/O. `query_head` is a capped (120 chars) scrubbed
  finding-aid — never full I/O in the ledger.
- **C1 LAW:** zero writes to `messages`; zero cross-user `messages` reads from the
  admin client. The session tier is built from telemetry rows ONLY.
- **RULE 27/28 untouched:** flush stays sequential after the writes-flush point;
  root-span output is stamped BEFORE the flush span; ONE turn id — no new ids.
- **No migrations, no new endpoints, no new telemetry event types.** The date
  upper bound extends the EXISTING admin telemetry query param surface (`from` +
  new `to`); `query_head`/`conversation_id` ride the EXISTING jsonb payload.
- **No secrets read/printed.** Scrubbing goes through `scrubIoData` — never a
  hand-rolled regex.
- **empty≠zero on the trace face:** an empty/aborted turn stamps the OBS-2 honest
  message as output — never undefined/blank.
- Old telemetry rows (no query_head/conversation_id) group under an honest
  "pre-legibility" bucket — never fabricated faces.
- Merges `--no-ff`, squash banned. Living-doc lock-step: observability/config +
  pipeline are drift-mapped surfaces — budget the reseal (S34-1 two-commit seal
  if mixed).

## 2 · GATED SUB-PHASES

### L1.A — Ledger turn face (server)
At the turn-scoped `message` event emit site, add to payload:
`query_head = cap(scrubIoData(userMessage), 120)` and `conversation_id =
ctx.resolvedConversationId` (subject to discovery gate (a) reuse). Write-time,
through the existing redaction path. Unit tests: scrub applied (an env-value
substring never survives into query_head), cap at 120, conversation id present.

### L1.B — Root-span scrubbed I/O (server)
- At root-span open (chat.ts): stamp input = scrubbed user message + `historyN`.
- After `withStageSpan('stream', …)` resolves and BEFORE flush: stamp output =
  scrubbed final assistant text, capped with the SAME cap class as the F-obs3
  MCP-span I/O (reuse the constant — no new magic number). Aborted/empty →
  the OBS-2 honest message.
- Keys via `LangfuseOtelSpanAttributes` (discovery gate (b)).
- Tests: span-attribute assertions via the existing observability test harness;
  empty-turn case stamps the honest message.

### L1.C — Stage-numbered span names (server + registry, ONE mapping)
- `observability/config.ts` gains `STAGE_NUMBER_BY_SPAN` (span base name → 'NN',
  from the stagesRegistry claims: telemetry-init/lab-overlay → 01 … stream → 10;
  exact numbers read from `stagesRegistry.ts` `spans[]` — the registry is the
  pedagogical SSOT).
- `withStageSpan` emits `cwf.stage.<NN>.<name>`.
- Mechanically update: registry `spans[]` strings, C-9d pins, Inspect deep-link
  tooltip text if it names spans. NO duplicated table: the client stage-label
  map (L1.E) derives from registry `spans[]`; the parity test (L1.D) asserts
  config map ≡ registry claims (bijection over stage spans).
- CHANGELOG documents the accepted history discontinuity (pre-phase traces keep
  old names).

### L1.D — Parity test tooth (both directions)
`CROSS_STAGE_SPANS` documented list in config (root `cwf.turn`, flush, stream
per-attempt children, shared warm/mcp/grounding spans as found). New test:
(real span inventory from config ∪ TURN_STAGES) − (∪ registry `spans[]` ∪
CROSS_STAGE_SPANS) = ∅, AND config `STAGE_NUMBER_BY_SPAN` ≡ registry claims.
Positive assertions: stage 00 `spans:[]` (pre-span BY DESIGN — quota gate runs
before the root span opens) · stages 13–14 carry the client-side-unspannable
wording.

### L1.E — Inspect: Sessions → Turns → Events (client)
Rebuild `InspectTab.tsx` default view per design §2.3:
- Time scope: existing relative windows + from–to date-range picker (extends the
  existing query param surface with `to`).
- Tier 1 sessions grouped by `conversation_id` (first turn's query_head · start
  time · turn count · Σ tokens); Tier 2 turn cards per `session_id` (query_head ·
  time · model · Σ tokens · badges: grounding-catch in F38 shield wording,
  TRUNCATED, quota-degraded); Tier 3 stage-labelled events (labels derived from
  registry `spans[]` + event-type map, test-pinned; unknown → honest "unmapped").
- Keyword search: one box, query_head-first, then type/model/tool_name/payload
  (reuse the existing needle logic).
- Per-card: existing Langfuse trace deep-link + copy-turn-id; per-session: the
  Langfuse SESSIONS view link (`…/project/<id>/sessions/<conversationId>` — same
  host/project config source as the trace link, hidden when unconfigured).
- Pre-phase rows → "pre-legibility" bucket. Flat event list survives as a
  secondary "Olaylar / Events" toggle (the seven SOTA columns demoted, not
  deleted).
- adminLegibility.test.ts auto-gens 2 tests per admin .tsx — expect the count
  shift; jsdom lacks scrollIntoView (stub as in prior phases).

### L1.F — Seal + CI + docs
Reseal per drift-mapped touches (two-commit seal if mixed). `.agents/`
CHANGELOG + SKILL-KB entries. Push branch, open PR; **unsharded CI green on the
PR head is the merge gate** (PR canary SKIP = the C-H no-spend fence, by design —
do NOT call it toothless; master canary runs post-merge).

## 3 · SELF-VERIFY (evidence, literal — never build-green)
1. **Trace face:** a real dev/prod turn's root span shows populated Input AND
   Output in the Langfuse UI, stage spans named `cwf.stage.<NN>.<name>`.
   Screenshot-equivalent evidence (span tree text) in the report.
2. **Sessions view:** the same conversation appears in Langfuse Sessions with
   per-turn legible I/O.
3. **Inspect:** cold open → session tier shows the conversation via query_head;
   keyword search on words from the question surfaces the turn card. The ≤5s
   north-star flow described step-by-step in the report.
4. **Parity red-green:** temporarily remove one claimed span name → test red;
   restore → green. Show both runs.
5. **Ledger discipline:** a query containing a known env-value substring never
   surfaces it in query_head (test evidence).
6. `git diff --stat master.. -- supabase` EMPTY; no new endpoints; report files
   touched + new test count + PR link. No merge before CI green.

## 4 · MERGE MESSAGE (Architect-authored, use verbatim on GO)
Merge OBS-LEGIBILITY-1 — turn faces on both planes: ledger query_head + root-span scrubbed I/O, Sessions→Turns→Events Inspect, stage-numbered spans + two-way parity tooth

<!-- END · claude-code-PHASE-OBS-LEGIBILITY-1-v1 · rev 1 · 2026-07-15 -->
