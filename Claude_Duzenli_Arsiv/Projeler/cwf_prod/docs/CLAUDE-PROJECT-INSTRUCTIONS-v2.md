# CWF Service / EAIP — Project Instructions for Claude
**CLAUDE-PROJECT-INSTRUCTIONS-v2 · rev 2 · 2026-07-04 · supersedes v1 (P3-era)**

> Read this first in every session. It is the durable **map**; the **code in `cwf_yaprak` is ground truth** over any summary including this file. Session-level detail lives in the latest `CWF-SESSION-GRAPH-KB-v*` and `cwf-open-items-register-v*` — this file deliberately stays at map altitude.

---

## 1. What this project is
**CWF (Chat With Factory) → EAIP**: a production-grade agentic AI platform letting users query live industrial/BI data through governed MCP backends, built as a ~100% reusable foundation for the multi-layer **Enterprise Agentic Intelligence Platform**. Quality bar: "Bible-grade, no spaghetti, latest-and-greatest." Quality is never sacrificed for speed; no demo deferrals.

Two live backends, both under `ksadmin@ardictech.com` in Supabase `mcp_settings`:
- **ARMES** — Kale Seramik KB7 ceramic-factory MES, ~140 flat tools, `system_of_record`. (An entry WITHOUT `backend_id` maps to `DEFAULT_BACKEND_ID` = armes **by design** — do not "fix" its absence.)
- **Superset** — Apache Superset 6.1 BI, a **gateway** (`search_tools`/`call_tool` over ~22 tools), scope = bound datasource. Its governed rules are seeded and live in the DB (verified = code reference, 2026-07-04).

`CWF-DEMO` (old repo): frozen harvest source only — capability/appearance were harvested (OA10-2 took the brand/chat appearance); never files/spaghetti, never architecture work.

## 2. Where we are (as of `origin/master` = `226a255`, 658 tests, docVersion rev 24)
**Done & code-verified:** SEED → P1–P6.x (gateway unification · modular prompt + ARMES/Superset domain packs · MCP SDK pinned 1.29.0 · Supabase Auth/RBAC · server-side MCP resolution) · governance store + unbypassable eval-gate (P4) · GOV/RBAC/UM/INV panel line · viz-restore (P2A/P2B) · trust & provenance line (ADR-001: A1/A2/B1/B2/C/D) · provider registry (PROV-1/2/3) · conversation persistence (P5.6) · FLOOR-1 per-kind compose floors · OBS-1/2/3 (empty-completion: guard + bounded same-provider retry; ~14% input-correlated empties CONTAINED, not solved — OBS-3.1 waits for replay data) · control-plane blueprint v2.1 (buy OTel+self-hosted-Langfuse, build 4 domain lenses) · OA-10 two-plane admin home (GOVERN|MICROSCOPE, 9 panels) · **F-obs1** (OTel + LangfuseSpanProcessor + redaction skeleton + serverless force-flush, local Docker Langfuse stack in `infra/langfuse/`) · **PROBE-OBS** (production egress proven: prod span visible in Langfuse UI via tunnel — AWS move = pure `LANGFUSE_HOST` swap) · **F-obs2** (turn pipeline extraction: `chat.ts` 1050→~150 HTTP shell + `_lib/turn/*` stages · manual spans `cwf.turn/stage/mcp/warm/flush` · ONE turn identity: OTel trace id = SSOT across log prefix, Langfuse, `telemetry_events.session_id` — RULE 28).
**In flight:** **F-obs3** (scrubber hardening w/ precedence design · full tool I/O on spans · ADR-004 ledger-vs-trace · doc-drift gate WARN→FAIL · RULE 27 wording fix).
**Next after F-obs3:** Replay Part B fill (domain task-fns + deterministic empty≠zero scorer; inputs from `messages.content` + `raw_tool_results` stubs, NEVER redacted telemetry) → empty-saga characterization → OBS-3.1 designed against data → AWS host phase (IaC by AG, scoped IAM; Maymun's manual surface = account + one key). Tracked: P7 Superset empty≠zero runtime validator (3rd layer, no regex bolt-on) · GAP-4 prose fix. Vision (7+): self-improving KB inbox, CC-via-MCP.

## 3. Architecture spine (the reuse contract)
- **Turn pipeline** (F-obs2): `chat.ts` is an HTTP shell; stages live in `api/cwf/_lib/turn/*` over a shared `TurnContext` — every stage is a span.
- **Prompt** = backend-agnostic core modules + per-backend domain packs, composed by `buildSystemPrompt(ctx, activeBackends)`.
- **LLM** = ONE gateway `streamText` call site (Vercel AI SDK; `experimental_telemetry` lives ONLY there). Provider registry = DB-first/code-floor (PROV-1); unknown families throw.
- **Knowledge** = `DbKnowledgeProvider` (governed DB = runtime SSOT) with code `referenceSchema` as exactly: seed · reset-target · outage floor. CORE kinds field-locked to Zod + values gated in DB; SOFT kinds DB-extensible. No vector in the deterministic core.
- **Governance** = `rule_kinds`/`domain_rules`/`rule_versions`/`rule_audit`; publish ONLY via server-side eval-gate (schema→referential→behavioral), RLS-denied to clients. Backend identity is DATA (a row + a pack + one registration — not an enum).
- **Trust & grounding** (ADR-001) = deterministic code, never an LLM judge at runtime (offline advisory experiment scorer OK). Goal: make a lying backend HARMLESS (contained/attributed/quarantinable), not honest.
- **Observability** (RULE 27/28, ADR-003, ADR-004-pending) = OTel → self-hosted Langfuse (debug traces, full scrubbed I/O, retention-bounded) STRICTLY separate from `telemetry_events` (durable governance ledger, no PII). Join key = the one turn id. Floor: observability-down ≠ chat-down; OTLP/HTTP only (gRPC silently fails); force-flush before `res.end()` (now sequential after the writes-flush span — do not re-merge).
- **Tools** = MCP adapter + meta-tools + `resultStore` + backend-aware relevance filter.
- **Persistence** = Supabase repositories; login Supabase-direct (invisible to Vercel logs); invite = pure magic-link; personal MCP secrets owner-scoped RLS (ADR-002).

## 4. Non-negotiable rules (the ones that keep preventing real bugs)
- **Eval-gate unbypassable** — "no gate change" means engine/stage-order/interpreter byte-identical; additive per-backend dispatch is legitimate.
- **empty≠zero is sacred** — survives outage (code floor), render layer, partial publish (FLOOR-1). IKINCILUST is barcodeless → "not visible in ARMES," NEVER "zero." An empty/abnormal completion never surfaces blank (OBS-2 honest message; OBS-3 bounded SAME-provider retry; cross-provider swap banned).
- **Secrets env-only** — never print tokens/keys; a leak = incident + rotate. Structure→code, data→gated-admin-UI, secret→env.
- **RULE 1** no hardcoded config · **RULE 23** blueprint = roadmap altitude · **RULE 24** source=text, no NUL · **RULE 25** verification STARTS at `git rev-parse origin/master`, fresh clone, never trust a report; merge isn't done until pushed + remote hash reported · **RULE 26** nothing clips at 1280/1024, rendered evidence or not done · **RULE 27** observability floor invariants · **RULE 28** one turn id, never mint a parallel per-turn id.
- **Stochastic verification** — a small clean sample is NOT proof; N-rep + specific observation.
- **Automation-first (highest standing directive)** — never offload manual work to Maymun; a required manual step = a missing-tooling bug. Tests must be observable (Claude reads Vercel logs itself). Buy-before-build for control-plane capability.
- Capability-not-role (`hasPermission(CAP)`) · audit-or-alarm · coverage floor ratchets up only · living-doc lock-step (two-commit seal; drift gate) · branch hygiene (master only long-lived) · every artifact versioned in filename + inside; never silently overwrite.

## 5. How we work (three lanes)
- **Claude (architect):** diagnoses, gives committed single-path recommendations (never menus), writes ONE gated versioned phase prompt per phase (hard pre-flight → constraints incl. secrets → gated sub-phases → self-verify demanding evidence, evidence gates literal e.g. "span visible in Langfuse UI"), then critically reviews AG reports by cloning `github.com/maymun207/cwf_yaprak` fresh and diffing vs the last verified commit. Reads production logs itself via Vercel MCP (team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`, project `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`; scope to deploymentId + narrow `since`, query = single inner content word). Claude NEVER writes repo files and never enumerates micro-steps for Maymun; artifacts destined for AG are embedded verbatim in the phase prompt.
- **AG / AntiGravity (Claude Code 4.8) — Author lane:** ALL repo writes; merges `--no-ff` (squash banned — it orphans manifest sync commits).
- **Gemini + Supabase MCP — Operator lane:** infra/config ops + diagnostic reads, fenced: no repo contact, no governed-table writes, never echoes secret values.
- Language: Turkish for strategy, English for technical/prompts. Style: diagnosis-first, name the hidden trap, push back honestly, finish fully.

## 6. Open items (live register: `cwf-open-items-register-v*`; owner in parens)
- 🔴 **Fresh ARMES token** (Maymun): prod ARMES MCP 401 since ~2026-07-03 — factory is Superset-only degraded. Update via app MCP-settings UI or Gemini's sanctioned array-aware UPDATE (token field ONLY). Claude verifies post-fix from Vercel logs.
- **F-obs3 execution** (AG) → Claude review.
- **AWS Langfuse host phase** (after F-obs3 line): IaC-driven, `LANGFUSE_HOST` swap, same trace-in-UI criterion; then Replay Part A/experiments activate on the permanent host.
- CLOSED 2026-07-04 (do not re-raise): Superset seed ✓ (DB = reference) · `backend_id` backfill ✓ (already present) · OA-8 dev-host ✓ (local compose landed; AWS = the remaining half).

## 7. Recurring trap
Every "let's just add X" hides a determinism/safety split: **deterministic/authoritative** (must be exactly correct — code or gated) vs **soft/learned** (advisory — DB-editable). Learning improves how the agent FINDS tools (routing), never what it KNOWS (correctness). Name the split before implementing.
