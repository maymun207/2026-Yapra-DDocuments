# CWF (cwf_yaprak) — SOTA Architecture Review
**rev 1 · 2026-07-03** · Reviewed at HEAD `7e14471` (independently cloned from origin; 593/593 tests re-run and passed in the review container — not taken from any report)

---

## Verdict up front

**Design: SOTA-aligned. Implementation: SOTA on two of three pillars; the third (observability + eval harness) is the known open front.**

If SOTA for an enterprise agentic platform in mid-2026 means three pillars —
1. **Governed determinism** (the agent cannot be silently made wrong),
2. **Clean layered reuse** (every future-platform concern behind an interface today),
3. **Observability + evals** (every turn traceable; behavior regression-tested offline)

— then cwf_yaprak is **ahead of most of the industry on (1), solidly SOTA on (2), and deliberately behind on (3)**, with (3) being exactly the in-flight F-obs/replay work. That is not a hidden weakness; it is a sequenced one. The honest overall grade: **SOTA-track, one pillar from SOTA-complete.**

---

## Evidence base (what was actually verified)

- Fresh clone of `github.com/maymun207/cwf_yaprak` → HEAD `7e14471`, matching last verified state; no drift.
- `npm ci && vitest run` executed live: **64 files, 593/593 passed** (86s).
- 238 TS/TSX files; API core ~6.8k lines across small, single-purpose modules; largest domain file `toolCategories.ts` (557), orchestrator `chat.ts` (1042).
- 26 SQL migrations, RLS-backed governed tables, audit tables (`rule_audit`, `provider_audit`, `user_audit`).
- Type hygiene: `: any` appears in only 3 non-test API files.
- Build gate = `tsc -b` + `typecheck:api` + `gen:arch-facts` + `vite build` + `check:doc-drift`.

---

## Where it is genuinely SOTA (or beyond)

### 1. The unbypassable eval-gate is a differentiator, not a checkbox
`evalGate.ts` is pure and staged (schema → referential → behavioral) over a **candidate set** (published rules with the draft swapped in). The behavioral stage doesn't just validate the draft — it re-composes the resulting knowledge slice and asserts the safety invariants **survive composition**: blind-spot zones stay barcodeless + scrap-invisible, at least one blind-spot remains, critical markers persist in the rendered text. Publishing is server-side-only with RLS denying direct client writes.

Industry comparison: most "governed prompt/knowledge stores" in 2026 validate a payload against a schema and stop. Validating the *composed downstream artifact's semantic invariants* before publish is the property that makes a poisoned rule ("IKINCILUST scrap=0") structurally rejectable rather than review-dependent. This is beyond common practice.

### 2. DB-first / code-floor is applied consistently, and the floor invariant is load-bearing
The same pattern — `warm()` async DB read → sync serve → outage falls to a code reference floor — appears in `DbKnowledgeProvider`, `trustRegistry`, and `llmProviderRegistry`. The trust floor invariant ("an unverified/unknown backend is never authoritative") is enforced in the resolution order, not in a comment. A Supabase outage degrades to the reference floor instead of a knowledge-blind or trust-blind agent. This is the correct answer to the classic "config DB down = agent lobotomized" failure mode, and it is uniformly applied.

### 3. Single LLM gateway with fail-loud family dispatch
One `streamChat()` call site over the AI SDK for **all** providers, family-dispatch (`google/openai/anthropic/openai-compatible`), unknown family → **throw** (the old `default: google(...)` silent-swap trap is explicitly killed), secrets env-only with the registry storing only the env var *name*, Anthropic prompt caching preserved on the system prefix. OBS-2 widened `onFinish` to the full completion-signal surface with a type-locked redaction contract at the caller. This is textbook — and rarer in practice than it should be.

### 4. Provenance/trust as deterministic architecture (ADR-001)
Trust tier stamped from `server.*` (unforgeable by payload), authority ceiling in `backend_authority`, scope-identity contracts normalized with floor defaults. The design goal — "make a lying backend *harmless*, not *detected*" — is the correct threat model for single-source MCP backends, and it is implemented as code, not as an LLM judge. No runtime LLM-as-judge anywhere in the grounding/trust path. This matches or exceeds current published enterprise-agent security guidance.

### 5. The living-doc anti-drift gate is unusual and valuable
`checkDocDrift.ts` runs in the build, diffs each architecture tab's `codeAreas` globs against its `lastSyncedCommit` including the working tree, and warns before commit. Almost nobody wires architecture documentation into the build as a drift detector. (It is WARN-mode — see gaps.)

### 6. Stack currency
React 19, Tailwind 4, Vite 8, TS 6.0, Zod 4, ai@6, MCP SDK pinned at 1.29.0, Vitest 4. Nothing legacy, nothing exotic. Pinning the MCP SDK exactly (while caret-ranging the rest) is the right risk posture for the one protocol dependency that has broken transports before.

---

## Where it is not yet SOTA (honest deltas)

### GAP-1 — Observability pillar absent at runtime (known; F-obs)
No OTel, no span tree, no per-turn causal trace beyond the 8-char log `traceId`. `telemetry_events` is a ledger, correctly kept separate from tracing — but the tracing half doesn't exist yet. A SOTA agentic platform in 2026 ships span-level tracing (prompt, tool calls, tokens, latency) from the first production turn. This is the single largest delta, it is already diagnosed, phased (F-obs1–3), and blocked only on the Langfuse host decision (OA-8). **The empty-completion saga is the live proof of the cost of this gap**: OBS-3 had to be verified via ad-hoc Vercel log reads instead of a replay lab.

### GAP-2 — No LLM-behavioral eval harness / golden dataset
593 tests are unit/contract tests — excellent, but they test the deterministic shell, not the agent's behavior distribution. There is no golden-question regression suite, no replay harness (Replay panels are honest inactive shells). SOTA = offline eval runs gating prompt/knowledge changes. Blueprint v2.1 correctly buys this from Langfuse datasets/experiments + builds only domain scorers — right call, not yet landed.

### GAP-3 — `chat.ts` (1042 lines) is trending toward a god-orchestrator
It is well-commented and deliberate ("single gateway"), but auth → MCP resolve → tool discovery → filtering → prompt build → stream loop → grounding → completion guard → retry → persistence → telemetry all live in one handler. Each phase (OBS-2, OBS-3, upcoming F-obs) accretes here. SOTA shape: an explicit **turn pipeline** (ordered stages with a shared turn-context object), so instrumentation and retry become stages, not inline blocks. Recommendation: do this extraction **as part of F-obs2** (manual spans force you to name the stages anyway — extract them once, instrument them once).

### GAP-4 — "Backend = a row" holds at the data plane, not at the prompt plane
`assemble.ts` dispatches packs via a code `switch (backend)` and `BackendId` is a code type. Under the locked data/structure split this is *defensible* (a domain pack is structure, not data), but the claim "adding a backend is a row, not a migration" should be stated precisely: **a row + a pack + one registration**. Not a flaw — a truth-in-advertising correction for the architecture docs.

### GAP-5 — Doc-drift guard is WARN, not FAIL
Explicitly tracked as a follow-up in the script header. Until it fails the build, lock-step is convention-enforced (by review), not machine-enforced.

### GAP-6 — Serverless resilience is timeout-based, not durable
Per-tool timeouts + transient-retry + force-flush plans are the right serverless hygiene. But a Vercel function dying mid-turn loses the turn; there is no durable-execution/resume story. For a factory chat this is likely **correctly out of scope** (over-engineering now), but for the EAIP horizon (long multi-step agent runs) durable execution (Temporal/Inngest-class) will eventually become a layer — worth a one-line note in the roadmap, not a build item.

### GAP-7 — Retry robustness proven insufficient by your own live data
OBS-3's identical same-provider retry demonstrably does not escape input-correlated empty regions; cross-provider failover / perturbed retry (OBS-3.1) is deferred pending replay data. Correct sequencing (design against data, not guesses) — but until then the floor is "honest error," not "recovered answer."

---

## SOTA scorecard

| Pillar | State | Grade |
|---|---|---|
| Governed determinism (eval-gate, empty≠zero, trust/provenance, RLS, audit) | Implemented, behaviorally tested, uniformly patterned | **Ahead of SOTA** |
| Layered reuse contract (gateway, KnowledgeProvider, repositories, prompt assembler, DB-first/code-floor) | Implemented; one god-orchestrator tension (GAP-3), one honesty correction (GAP-4) | **SOTA** |
| Observability + evals (tracing, replay, golden harness) | Designed (blueprint v2.1, F-obs phased), not landed | **Pre-SOTA — the open front** |
| Engineering hygiene (types, tests, migrations, secrets, doc-drift, stack currency) | 593 tests, 3 `any` files, env-only secrets, build-integrated drift check | **SOTA** |

## Committed recommendation (one path, not a menu)

The single highest-leverage move is unchanged from the current plan and this review confirms it: **unblock OA-8 (host options) → land F-obs1–3 → stand up the replay lab with the empty-completion saga as first customer.** Fold the GAP-3 turn-pipeline extraction into F-obs2 (you will be naming the stages for spans anyway — extract once, instrument once). Escalate doc-drift WARN→FAIL after the next full-tab reconcile. Everything else in the gap list is either already sequenced or correctly deferred.

**Bottom line:** Bu mimari, governance/determinism ekseninde 2026 endüstri pratiğinin önünde; katmanlama ve hijyende SOTA; observability/eval ekseninde bilinçli olarak bir faz geride. "SOTA kabul edilebilir mi?" — tasarım olarak evet; F-obs + replay lab indiğinde uygulama olarak da tereddütsüz evet.
