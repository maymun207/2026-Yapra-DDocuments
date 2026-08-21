# PHASE F-OBS1 — OTel + Langfuse Observability Bootstrap
**claude-code-PHASE-F-OBS1-otel-langfuse-bootstrap-v1 · rev 1 · 2026-07-04**
**Repo:** `cwf_yaprak` · **Base:** `origin/master` @ `7e14471` (593/593 tests, docVersion rev 22)
**Author lane:** Claude Code (AntiGravity). All writes happen here. Nothing is done by hand outside this prompt.

---

## 0. WHY (context you must internalize before touching anything)

This phase lands **CP-1 (observe)** from the control-plane blueprint v2.1: the bought substrate is **OpenTelemetry + self-hosted Langfuse**; we build only the thin domain lens (instrumentation + redaction skeleton + serverless flush). After this phase, every chat turn produces a span tree visible in a Langfuse UI running locally in Docker Desktop.

Three known traps this phase exists to defuse — they are the acceptance criteria in disguise:

1. **Serverless span loss.** On Vercel, if spans are not force-flushed before the function's response completes, they are silently dropped. Everything looks green; nothing arrives.
2. **OTLP transport trap.** Langfuse's OTLP endpoint speaks **HTTP only** (`/api/public/otel`). A generic OTLP exporter defaults to gRPC and fails silently. We use `@langfuse/otel`'s `LangfuseSpanProcessor` (HTTP-native) and never a raw gRPC exporter.
3. **Full-I/O tracing = new secret-leak surface.** Spans will eventually carry full prompt/tool I/O. A deterministic redaction boundary must exist **at the span-processor level from day one** (skeleton now, hardened in F-obs3) — never a regex bolt-on after export.

**Success is defined as: a real chat turn from local dev produces a trace visible in the local Langfuse UI after force-flush — not a 200 response, not a green build.**

---

## 1. HARD PRE-FLIGHT GATE (abort if any check fails)

Run and paste evidence for ALL of the following before writing a single line:

```bash
git fetch origin && git rev-parse origin/master        # MUST print 7e14471...
git status --porcelain                                  # MUST be empty
npx vitest run 2>&1 | tail -3                           # MUST show 593 passed (593)
docker version --format '{{.Server.Version}}'           # Docker Desktop daemon reachable
docker ps --format '{{.Names}} {{.Ports}}'              # list running containers (port-conflict check, see §2.1)
node --version                                          # v22.x
```

If `origin/master` ≠ `7e14471`: **STOP** and report — do not proceed on drifted base.
Create the working branch: `git checkout -b feat-fobs1-otel-langfuse-bootstrap`.

---

## 2. HARD CONSTRAINTS (violating any of these = phase rejected in review)

- **C1 — Secrets env-only.** Langfuse keys (`LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`) and host (`LANGFUSE_HOST`) live in `.env.local` and Vercel env — NEVER in the repo, NEVER printed to logs or the report. The repo ships only `.env.example` entries with placeholder values. If a key is ever echoed, treat it as a security incident in the report.
- **C2 — Observability-down ≠ chat-down (floor discipline).** With `LANGFUSE_*` env absent or `OBSERVABILITY_ENABLED` false, the entire pipeline is a clean no-op: no init, no network, no latency, no error. The chat path must be byte-equivalent in behavior to today. This mirrors the DB-first/code-floor pattern: the agent is never observability-blind-broken.
- **C3 — Identity untouched.** Do NOT touch `chat.ts:392` (`traceId` 8-char) or `chat.ts:451` (`sessionId`). The three-id reconciliation (conversationId / log traceId / telemetry session_id → OTel trace id as SSOT) is **F-obs2**, explicitly out of scope here. Do not mint any additional per-turn id.
- **C4 — No manual spans yet.** F-obs1 = automatic AI SDK spans only (`experimental_telemetry`). Manual spans for `executeMCPTool`, DB reads, and the turn-pipeline extraction are **F-obs2**.
- **C5 — OBS-2 / OBS-3 byte-safe.** The completion guard (`completionGuard.ts`), the retry loop (`chat.ts` ~803–901), and `telemetry_events` emission are untouched. `telemetry_events` (governance ledger) and OTel tracing (debug) remain strictly separate systems — no cross-writes, no shared code paths.
- **C6 — RULE 1, no hardcoded values.** Env var NAMES, the enable flag, the OTLP path, service name, and flush timeout live in a config module (see §3.2), not inline literals.
- **C7 — Single insertion point.** `experimental_telemetry` is added ONLY inside `streamChat()` in `api/cwf/_lib/llm/gateway.ts` (the one `streamText` call site, line ~99). No provider-specific branches.
- **C8 — Source = text, no NUL bytes (RULE 24).** All new files plain UTF-8.
- **C9 — Compose stack is versioned, keys are not.** `infra/langfuse/docker-compose.yml` + `infra/langfuse/.env.example` + `infra/langfuse/README.md` are committed; `infra/langfuse/.env` is gitignored.

---

## 3. GATED SUB-PHASES (complete + self-verify each before the next)

### 3.1 — Local Langfuse stack (infra, versioned in repo)

1. Create `infra/langfuse/` containing:
   - `docker-compose.yml` — based on the **official Langfuse v3 self-host compose** (langfuse web + worker + Postgres + ClickHouse + Redis + MinIO). Pin image tags (no `:latest`). Adapt only: container name prefix `cwf-langfuse-*`, and ports (see conflict check below).
   - `.env.example` — every variable the compose needs, placeholder values only, with one-line comments.
   - `README.md` — bring-up (`docker compose up -d`), teardown, where the UI lives, how to create the org/project/API keys, and an explicit note: **this stack is the DEV host; the PROD host (AWS) is a later phase — only `LANGFUSE_HOST` changes.**
2. **Port-conflict check:** the operator's machine may already run a standalone ClickHouse container (installed earlier, not part of this stack). If `docker ps` from the pre-flight shows anything bound to ports this compose needs (e.g. 8123/9000/3000/5432/6379/9090), remap the compose's host-side ports and document the mapping in the README. The standalone ClickHouse is NOT used by this stack — note in the README that it can be stopped.
3. Add `infra/langfuse/.env` to `.gitignore`.
4. Bring the stack up. **Evidence required:** `docker compose ps` output showing all services healthy + the Langfuse UI reachable (state the URL and HTTP status; screenshot if the harness allows).
5. In the Langfuse UI, create org `cwf` → project `cwf-dev` → API keys. Put keys in the repo-root `.env.local` (`LANGFUSE_HOST`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`). **Do not paste key values anywhere in the report** — report only that they exist (`grep -c LANGFUSE .env.local` → 3).

**Gate 3.1:** stack healthy + UI reachable + keys in env. Paste evidence.

### 3.2 — Observability module (code)

1. Install dependencies (pin per house style — caret for the OTel/Langfuse family is fine, but record exact resolved versions in the report):
   - `@langfuse/otel` (provides `LangfuseSpanProcessor`, HTTP-native export)
   - `@opentelemetry/sdk-trace-node`, `@opentelemetry/api`
2. Create `api/cwf/_lib/observability/config.ts` (RULE 1 home):
   - `OBSERVABILITY_ENABLED` — derived: true iff `LANGFUSE_PUBLIC_KEY` && `LANGFUSE_SECRET_KEY` && `LANGFUSE_HOST` are all present, with an optional `OBSERVABILITY_DISABLED=1` env kill-switch that forces false.
   - `OTEL_SERVICE_NAME = 'cwf-api'`, flush timeout constant, and the env var names as exported constants.
3. Create `api/cwf/_lib/observability/redaction.ts` — the **scrubber skeleton**:
   - Export `scrubSpanAttributes(attrs)` — deterministic, pure, unit-testable.
   - v1 scope (skeleton, hardened in F-obs3): mask values of any attribute whose key matches a deny-list (`authorization`, `api[-_]?key`, `token`, `secret`, `password`, case-insensitive) and mask any attribute **value** that equals a currently-set sensitive env value (compare against the values of env vars matching the same deny-list — compare by value, never log which var matched). Replacement: `"[REDACTED]"`.
   - A file-top comment stating: *this is the deterministic redaction boundary; it runs at the span-processor level BEFORE export; F-obs3 hardens it and seals it with an ADR.*
4. Create `api/cwf/_lib/observability/otel.ts`:
   - Lazy **module-level singleton** init (`initObservability()`): constructs `NodeTracerProvider` with `LangfuseSpanProcessor` and registers it globally. Wire the scrubber via the processor's masking/`shouldExportSpan` hooks so **no span leaves the process unscrubbed**. Idempotent across warm invocations; a hard no-op when `OBSERVABILITY_ENABLED` is false (C2).
   - `forceFlushObservability(): Promise<void>` — calls the provider/processor `forceFlush()` with the configured timeout; **never throws** (catch → `console.error('[Obs] flush failed (non-fatal)…')`); instant resolved promise when disabled.
   - HTTP-only export is inherent to `LangfuseSpanProcessor`; add a comment naming the gRPC trap so nobody "simplifies" this to a generic OTLP exporter later.
5. Wire-up (exactly two touch points):
   - **`api/cwf/_lib/llm/gateway.ts`** — inside `streamChat()`, add to the `streamText` options: `experimental_telemetry: { isEnabled: OBSERVABILITY_ENABLED, functionId: 'cwf-chat-turn' }`. No metadata carrying user content in this phase.
   - **`api/cwf/chat.ts`** — (a) call `initObservability()` once near the top of the handler (idempotent); (b) in the existing `finally` block, join the flush into the existing await: `await Promise.allSettled([...telemetryWrites, ...persistenceWrites, forceFlushObservability()])`. The flush completes **before** `res.end()` — same guarantee the persistence writes already rely on. Touch nothing else in `chat.ts`.

**Gate 3.2:** `npm run build` green (full gate: tsc -b + typecheck:api + gen:arch-facts + vite build + check:doc-drift). Paste tail.

### 3.3 — Tests

Add unit tests (Vitest, house patterns) covering at minimum:
1. `config.ts`: enabled iff all three env present; kill-switch forces disabled.
2. `redaction.ts`: deny-list key masking (each pattern, case-insensitivity); env-value masking (set a fake env var in the test, assert its value is masked wherever it appears); non-sensitive attributes pass through untouched; determinism (same input → same output).
3. `otel.ts`: disabled mode → `initObservability()` and `forceFlushObservability()` are no-ops that never throw and make no network calls; `forceFlushObservability()` never rejects even when the provider throws (mock).
4. `gateway`: with observability disabled, `streamChat` behaves exactly as before (existing tests must all still pass — that IS the assertion).

**Gate 3.3:** `npx vitest run` — ALL green, total ≥ 593 + new tests. Paste the summary line.

### 3.4 — Live local verification (the real gate)

1. Start local dev with `.env.local` loaded (Langfuse stack from 3.1 running).
2. Send one real chat turn through the app (any ARMES question that triggers at least one tool call).
3. Open the local Langfuse UI → Traces. **Evidence required:** the trace exists; report its **trace id**, the span count, and name the spans you see (the AI SDK generation span(s) at minimum; tool spans appear per AI SDK's automatic instrumentation). Screenshot if the harness allows.
4. Negative check (C2): temporarily unset the Langfuse env (or set `OBSERVABILITY_DISABLED=1`), send another turn, confirm: chat works normally, no errors logged, no new trace appears. Restore env.

**Gate 3.4:** trace-in-UI evidence + negative-check evidence. Without this, the phase is NOT done regardless of green tests (build-green-hides-it is exactly the failure mode here).

### 3.5 — Living-doc lock-step (two-commit seal)

This phase touches mapped areas (`gateway.ts`, `chat.ts`, `api/cwf/_lib/observability/**`). In a **separate commit** after the code commit:
1. Re-sync affected tabs: **Agent Control Plane** (CP-1 observe cell: F-obs1 landed — automatic spans + flush + redaction skeleton; manual spans/identity = F-obs2) and **Runtime Topology** (add the observability module + flush join in the finally block, at depicted altitude). If a tab's altitude doesn't depict this change, reseal `lastSyncedCommit` only and say so.
2. Bump manifest `docVersion` → **rev 23** with a reviewNote naming what changed and what was reseal-only.
3. `npm run check:doc-drift` clean.

### 3.6 — Merge + push (RULE 25)

Squash-merge the branch to master with a conventional message (`feat(f-obs1): …`), delete the branch, **push**, and report `git rev-parse origin/master` — the merge is not done until the remote hash is reported.

---

## 4. SELF-VERIFICATION CHECKLIST (paste evidence for every line — assertions are not evidence)

- [ ] Pre-flight: origin/master was `7e14471`, clean tree, 593/593 baseline
- [ ] `infra/langfuse/` committed: compose (pinned tags) + `.env.example` + README; `.env` gitignored
- [ ] `docker compose ps` all healthy + Langfuse UI URL + reachable status
- [ ] Port conflicts checked against pre-flight `docker ps`; remaps (if any) documented
- [ ] `.env.local` has the 3 LANGFUSE vars (count only — values never shown)
- [ ] New deps + exact resolved versions listed
- [ ] `observability/config.ts` + `redaction.ts` + `otel.ts` exist; scrubber wired at processor level; flush never throws
- [ ] `experimental_telemetry` added ONLY in `gateway.ts` `streamChat`; diff of `gateway.ts` shown
- [ ] `chat.ts` diff shows ONLY: init call + flush joined into the existing `finally` allSettled; `traceId`/`sessionId` lines untouched
- [ ] Full build gate green (tail pasted)
- [ ] Vitest: total count + all green (≥ 593 + new)
- [ ] **Live trace evidence:** trace id + span names from local Langfuse UI
- [ ] **Negative check:** env absent → chat normal, zero traces, zero errors
- [ ] Doc seal commit: tabs re-synced/resealed, manifest rev 23, drift check clean
- [ ] Pushed; `git rev-parse origin/master` remote hash reported

## 5. EXPLICIT NON-GOALS (do not do these)

- No manual spans, no turn-pipeline extraction, no id reconciliation (F-obs2)
- No scrubber hardening beyond the skeleton, no observability ADR (F-obs3)
- No AWS/tunnel work (separate phase after F-obs1 review)
- No Langfuse prompt-store / datasets / experiments usage (Replay phases)
- No changes to `telemetry_events`, completionGuard, retry loop, grounding, or persistence
