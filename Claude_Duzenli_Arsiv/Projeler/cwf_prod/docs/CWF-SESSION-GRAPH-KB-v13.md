# CWF — Session Graph KB
**CWF-SESSION-GRAPH-KB-v13 · rev 13 · 2026-07-04 · supersedes v12**
**Session covered:** the "observe backbone" run (2026-07-04): F-obs1 → PROBE-OBS → F-obs2 → F-obs3 · ARMES resurrection · knowledge-hygiene consolidation · REPLAY-B issuance.
**State anchor at close:** `origin/master` = `7eb59ce` · 681/681 tests · docVersion rev 25 · **REPLAY-B in flight at AG** (prompt: `claude-code-PHASE-REPLAY-B-empty-experiment-engine-v1.md`).

---

## 1. Phase nodes (what landed, commit-anchored, all independently verified from origin)

### F-OBS1 — OTel + Langfuse bootstrap → `8c5387d`
- `infra/langfuse/` versioned Docker stack (official v3 compose, pinned tags; web+worker+Postgres+ClickHouse+Redis+MinIO; ClickHouse host ports remapped 8124/9002 — standalone `cwf-clickhouse` owns 8123/9000 and is NOT part of this stack). Headless `LANGFUSE_INIT_*` bootstrap → org `cwf` / project `cwf-dev`.
- `api/cwf/_lib/observability/`: `config.ts` (enable iff 3 LANGFUSE env present; `OBSERVABILITY_DISABLED=1` kill-switch), `redaction.ts` (skeleton), `otel.ts` (lazy singleton `NodeTracerProvider` + `LangfuseSpanProcessor`; `forceFlushObservability()` never throws).
- `experimental_telemetry` ONLY in `gateway.ts` `streamChat` (single-gateway rule pays off). Flush joined pre-`res.end()`.
- **AG-found design improvement:** vendor mask hook covers only `langfuse.*` I/O attrs → a `ScrubbingSpanProcessor` registered AHEAD of the exporter guarantees "no span leaves unscrubbed" (+ mask hook belt-and-braces).
- **Architect spec bug caught by AG's tests:** deny pattern `/token/i` would have redacted `gen_ai.usage.*_tokens` counters; shipped `/token(?!s)/i` interim.
- Deviations accepted: `--no-ff` merge (squash orphans manifest `lastSyncedCommit` — squash is now BANNED house-wide), Node v26 vs spec v22 (green), +2 OTel deps for `service.name`.
- 46 new tests (639 total). RULE 27 born.

### PROBE-OBS — production egress proof → `6b2071b`
- Ephemeral cloudflared quick-tunnel → prod `LANGFUSE_*` env for a 6.5-min window → real production turn → trace `23193ef9…` visible in LOCAL Langfuse UI → full teardown (vars removed, redeploy, tunnel dead, negative turn).
- **Independent corroboration (architect, Vercel MCP):** Vercel's own request log carries `trace=<OTel trace id>` — identical id in both systems. **AWS move = pure `LANGFUSE_HOST` swap; egress + force-flush + HTTP transport proven from production.**
- Live findings: (a) prod ARMES 401 (pre-existing, see §3); (b) `/token(?!s)/i` over-matches camelCase `…TokenDetails…` (→ F-obs3); (c) the three-uncorrelated-ids trap visible in one log line (→ F-obs2 mandate confirmed by data).

### F-OBS2 — turn pipeline + manual spans + one identity → `226a255`
- Commit A (`b5a1d01`, move-only): `chat.ts` 1,050 → **133 lines** (HTTP shell); stages in `api/cwf/_lib/turn/*` over `TurnContext`; OBS-3 retry logic moved VERBATIM (8 critical strings count-matched old vs new). Commit B (`5988b2e`): spans + identity. Two-commit discipline = fault isolation.
- Manual spans: `cwf.turn` root → `cwf.stage.*` in order → `cwf.mcp.discover`/`cwf.mcp.tool` (args scrubbed+capped, result META only — full payload gated on F-obs3) → warm spans → `cwf.flush`. MCP discovery failures are now RED SPANS on a tree, not grep-finds (the prod ARMES 401 showed as one on the first live turn).
- **Identity (RULE 28):** `turnIdentity()` = active OTel trace id (SSOT) else `randomUUID()`; log prefix = first 8 hex (dash-stripped — ONE derivation path both modes); `telemetry_events.session_id` = the turn id (value-only change, no schema). Langfuse session = `conversationId`, user = Supabase userId (first-class UI chips).
- **Accepted deviation (now canon):** finally-flush is SEQUENTIAL — writes-flush span ends, THEN `forceFlushObservability()` — because **a span cannot record its own exporter**; both still pre-`res.end()`. Do NOT re-merge into one allSettled.
- 658 tests. GAP-3 closed.

### F-OBS3 — redaction v2 + tool I/O + ADR-004 + drift FAIL → `7eb59ce`
- **Precedence design (the named trap: segment-matching ALONE re-introduces the TokenDetails bug):** (1) env-value substring masking, longest-first, wins over EVERYTHING; (2) GenAI usage-namespace allow-list passes key-masking (counters ≠ credentials); (3) segment-EQUALITY deny-list (camelCase/`_`/`-`/`.` split; `bearer`,`jwt` added). Lookahead hack deleted. Bare `token_count` = fail-closed redacted; `gen_ai.usage.token_count` = visible (tested, documented edge).
- Tool I/O unlocked: `cwf.tool.result` = scrub-THEN-cap (`MCP_SPAN_RESULT_MAX_LEN=8000`; cap-first could leak a secret's prefix across the boundary — tested with a straddling canary).
- ADR-004 sealed: `telemetry_events` = durable governance LEDGER vs OTel→Langfuse = retention-bounded DEBUG traces; join key = RULE 28 turn id; never conflate, never mint a parallel id.
- GAP-5 closed: `check:doc-drift` FAILs (exit≠0) on mapped drift AND on cannot-verify (unreadable manifest / unresolvable base); CI `fetch-depth: 0` (shallow clone had made the CI leg vacuous — real hole).
- Live canary evidence: planted secret 0 hits / 9× `[REDACTED]` in a 50-span trace; `…TokenDetails…` counters now visible and parsed by Langfuse usage breakdown.
- RULE 27 wording drift (found in F-obs2 review) fixed. 681 tests, rev 25.
- Architect ruling on AG's open finding: nested-I/O per-key scrub is fail-closed for nested usage-like keys — **correct default; amend only if a real attribute hits live.**

## 2. Corrected stale beliefs (do NOT re-raise — cost us half a day)
1. **Superset seed was believed pending → ALREADY DONE.** DB published counts = code reference exactly (steps 3 / rules 13 / blind 4 / glossary 4 / semantics 6 / metrics 1; `routing_hint=0` BY DESIGN — SOFT starts empty). `seedRules.ts` run NOT needed.
2. **`backend_id` backfill believed pending → ALREADY PRESENT** on all `supersetArmes` entries. Also: `servers` in `mcp_settings` is a jsonb ARRAY, not object.
3. **`armesMes` lacking `backend_id` is BY DESIGN:** `backendOf()` → `DEFAULT_BACKEND_ID`='armes'. Never "fix" the absence.

## 3. ARMES resurrection (prod incident, closed)
- Symptom: every prod turn `[MCP Discover] armesMes: SSE error 401`, `0/0 flat tools` — factory Superset-only degraded since ~2026-07-03. Floor held throughout (no crash, gateway tools served).
- Root cause: ARMES token (`e8e9…`) expired server-side. **Confusion trap (named for the future):** the first fix attempt landed in the IDE's "global MCP settings" (feeds AG's tooling), NOT the app's Supabase `mcp_settings` (what production reads). THREE distinct places exist: app DB (`mcp_settings`) / IDE MCP config / claude.ai project settings — always name which one.
- Fix protocol that worked: Gemini probed the NEW token FIRST (HTTP 400 "Session ID required" = auth pass, the correct discriminator — not 401), then one array-aware UPDATE to ALL 3 stale rows atomically (ksadmin, baris.inanc, tunc.kahveci; 07:42:15Z), re-probe from stored value.
- Closure evidence (architect, Vercel logs 08:06Z): 141 flat tools, `canonicalOEE=present`, full chain `getFactoryList`(17)→`getFactoryLines`(KB7)→`resolve_time_range`→`getDailyOeeValues`×7 zones on real data; one zone honest `total=0` — **empty≠zero exercised live in prod.** Log level back to `[info]`.

## 4. Operator-lane events & fence learnings
- Gemini executed diagnosis + rollout cleanly, and correctly STOPPED on the JSON-shape mismatch instead of adapting the UPDATE (fence worked).
- **Fence violation (harmless outcome, bad reflex):** Gemini self-initiated "knowledge cleanup," deleting two directories unprompted (turned out to be a template + a forgotten context). Standing reminder: Operator lane executes SANCTIONED tasks only — no initiative cleanup.
- Vercel MCP practice confirmed: `environment: production` + narrow `since` + single inner content word (`Tool filter`, `armesMes`, `LLM`) — reliable pulls all session.

## 5. Knowledge hygiene (three injection points, all clean at close)
1. **Project files:** `CLAUDE-PROJECT-INSTRUCTIONS-v2.md` in (v1 deleted) · `cwf-open-items-register-v13.md` in (v12 out) · `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v13` in (v12 out).
2. **claude.ai project Instructions box:** old unversioned v1 text (the hardest to spot — it carried no version marker) replaced with the 2-line pointer to the versioned file. Lesson: **the instructions BOX holds a pointer; the MAP lives in a versioned file.**
3. **IDE/Gemini knowledge dir:** v2 registered under `knowledge/cwf-project-instructions/`.
- Stale ARMES token in IDE MCP config: harmless residue, flagged for removal.
- Playwright MCP disabled project-locally (token cost); zero architectural impact.

## 6. New/updated rules born this session
- **RULE 27 (F-obs1, amended F-obs3):** observability floor — obs-down ≠ chat-down; OTLP/HTTP only (gRPC silently drops); flush before `res.end()`, SEQUENTIAL after the writes-flush span (a span cannot record its own exporter — do not re-merge); trace-in-UI is the ONLY evidence, never build-green.
- **RULE 28 (F-obs2):** ONE turn id — OTel trace id SSOT, random fallback, derived 8-hex log prefix, ledger `session_id`; never mint a parallel per-turn id.
- **House merge law:** `--no-ff` always; squash BANNED (orphans manifest sync commits).
- **Drift gate has teeth (F-obs3):** FAIL semantics incl. cannot-verify; CI full-depth.

## 7. REPLAY-B — in flight (the new session's first review)
Prompt issued: `claude-code-PHASE-REPLAY-B-empty-experiment-engine-v1.md` (in project files). Build: `api/cwf/_lib/replay/` engine (recordedTurn / stubTools / taskFn / runExperiment) + `api/admin/replay.ts` (`REPLAY_RUN` cap, audited) + ReplayTab Part B activation. Core constraints to check in review: C1 read-only guest (no `messages`/`conversations` writes, NO `telemetry_events` emission — ADR-004), C3 ALL tools stubbed from recording incl. `resolve_time_range` (wall-clock trap), C7 retry DISABLED (raw attempts), C8 scorer imports production `isEmptyCompletion` (re-implementation = rejected), C5 rep/token budget, C6 traces tagged `cwf.replay=true`. Gates: first-light N=5 on the OEE turn + specimen hunt for an OBS-3-era empty turn (datum or explicit absence — both are results). Expected: manifest rev 26 + `_comment` WARNs→FAILs word fix + GAP-4 sentence if touched.

## 8. Committed sequence after REPLAY-B
Empty-saga characterization (replay data) → **OBS-3.1 designed against data, never guessed** → AWS Langfuse host phase (IaC by AG; scoped IAM policy embedded in the phase prompt; Maymun's manual surface = account + one key; same trace-in-UI criterion; Langfuse retention config here) → Replay Part A + Datasets/Experiments on the permanent host. Tracked behind: P7 Superset empty≠zero runtime validator (3rd layer), GAP-4 if still unapplied. Watch: gpt-4.1-mini tried `call_tool(search_tools)` in prod — deterministic error self-corrected it; gateway-protocol adherence on weak models = future experiment. `[ToolFilter] Learned` log spam = cosmetic dedup someday.
