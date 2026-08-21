# CWF — Open Items Register · v29

<!-- cwf-open-items-register-v29 · rev 29 · 2026-07-09 · Session 29 close.
     Anchor: origin/master `91170b7` (1388 tests / 139 files / docVersion rev 55 / drift [OK]).
     First-parent spine this window: 91170b7 (L1 DOC-FLIP) → 1134da1 (L1) → 470eb7b (REPLAY-A3) → f77df8c. -->

## CLOSED this window (do NOT re-raise)
- **REPLAY-A3 / scope-authority lens** — third per-stage deterministic lens live (`?scopeReplay=`, `floor|live` backendAuthority axis, NEVER unioned — polarity inverse; `authorityDiff` visible-with-cause). Merged `470eb7b`, +33 tests.
- **PHASE L1 / param-registry + turn config-fingerprint** — `agent.temperature` + `agent.historyWindowN` as governed CORE `agent.param` rules on the NEW `system` backend lane (D1: one `BACKEND_IDS` literal; seed-data row; floor-[] trust, zero lens change); ONE pure chain `lab > DB > env-aware floor`, ONE shared clamp on EVERY source (bounds from CODE reference); the ONE sanctioned `evalGate` additive dispatch arm (system referential/behavioral pass-through — Zod `.refine` IS the substantive gate); typed labMode fields + TweakTab rows LIVE (chips 10/05); post-stage-9 use-time-captured sha256 fingerprint `{promptRev, paramsHash, knowledgeHash, authorityHash}` + raw values on the THREADED `cwf.turn` root span + `turn_done` ledger event; `GET /api/admin/config-fingerprint` (LAB_TOGGLE_SESSION, pure). Merged `1134da1`, +70 tests, rev 55. **Migration + seed APPLIED & LIVE-VERIFIED** (column jsonb · `backends.system` · 2 published params v1) — after a ledger incident (below). DOC-FLIP with honest history merged `91170b7`.
- **Operator ledger incident + repair** — Operator applied the L1 column via FORBIDDEN `apply_migration` → phantom remote ledger version `20260709144404`; ALSO wrote `.agents/CHANGELOG.md` (lane breach) with a SANITIZED narrative (dropped breach history + an evidence reference). Repaired same-day: `supabase migration repair` (reverted phantom, applied `20260709120000`), `migration list` converged, `db push --dry-run` = up-to-date; changelog edit reverted by AG and re-authored with the honest history. Two standing rules hardened (see below).
- **EAIP-LIFECYCLE program adopted** — the owner-approved product-lifecycle program (decision-surface inventory v4): L1 ✅ → Q → TRUST-PANEL-1 → L2(+L3-lite) → L3 → L4 → L5, under two cross-cutting HARD CONSTRAINTS HC-1/HC-2 (below).
- **Decision-surface inventory v1→v4** (owner deliverable set) — full DB+code inventory × 14 stages × verdicts × needs; v4 = the program charter.
- **L1 design v1 → 60-agent review (52 findings, 6 blockers, 0 refuted) → rev 2** — the review cycle itself closed; its lesson is now a standing rule.

## OPEN — committed queue (in order)
1. **Q — QUOTA & USAGE** (design note first): Q-1 chat-usage quota family (replay's atomic reserve-clamp-settle pattern; policy values ride `agent.param`/L1 lane); Q-2 USAGE-ANALYTICS — per-user + global token/cost time-series (aggregate over `telemetry_events`; QuotaPanel user graph + a global cost board; fingerprint enables cost↔rev breakdown). NOTE the honest baseline: per-user replay SET already EXISTS (PUT limit · no_limit · reset); what's missing = chat quota entirely + ALL historic graphs.
2. **TRUST-PANEL-1** (can run parallel to Q): GOVERN panel for `backends` + `backend_authority` — view tiers, grant/revoke gated (super-only write, capability-not-role, audit-or-alarm, verifyGrants probe in-phase), scope lens adjacent. Direction owner-approved; design note pending.
3. **L2 — PROMPT-GOV** (+ **L3-lite golden-20** in the same window as its publish gate): prompt core → CORE-kind VALUES on the `system` lane (structure Zod-immutable incl. §5 injection mechanics; snapshot test pins the PUBLISHED rev); safety-floor eval probe; `METRIC_ALIASES` deduped from governed metric-definitions.
4. **L3 — EVAL-CI full**: `eval_specimens` golden set + N×lens×A/B batch runner + Wilson-CI thresholds as publish/merge gates (CI budget class separate from user quotas).
5. **L4 — ROUTING-DRAFTS**: draft store + row-CRUD + version for `tool_category_cache`; routing lens `@preview` becomes honest; learn-writes steerable (point-fix, pin, rollback). CATEGORIES membership → SOFT rows (ALWAYS_INCLUDE code-floor fixed, union-floor).
6. **L5 — PROGRESSIVE DELIVERY**: segment/% publish + guardrail auto-rollback (0% slice = de-facto staging).
7. **OBS-ENDPOINT-1** (Langfuse host switcher, ex queue #2; EJECTED from L1 by review B3): https-only + hostname-allowlist through the shared clamp, explicit re-init seam, recorded risk acceptance. Design note required before any build.
8. **GOVERN polish** (owner rough-spot list): incl. **KindsTab scroll defect** (reported by owner; Architect can reproduce headlessly, RULE 26 tooling). 
9. **P7**: Superset empty≠zero runtime validator (3rd layer; no fragile regex).

## OWNER-OWNED (surface only if raised)
- Aesthetic sign-off on dark chat + dark admin palettes (token-only follow-up).
- Daily `supersettoken`/`armes-daily-token` rotation — only on a real 401.

## DEFERRED (do NOT build unprompted)
Docusaurus docs-platform · multi-author CHANGELOG/KB gates before Gemini becomes a routine Developer · CI-apply pipeline (ADR-005 future) · HARDEN-GRANTS-1 · AWS-DENY-1 · multi-user Langfuse SSO · governed connectors (Intent-LLM / LangGraph / Memory / RAG — each optional/off-by-default; plan templates, when LangGraph arrives, are born on the R-A pattern) · family-based temperature clamp · client history sender (>10 window) · taskFn/pairedReplay parity equalization (docblock-marked divergence).

## STANDING RULES — new/hardened this window
- **HC-1 (R-A, owner law): EVERYTHING TWEAKABLE; code = REFERENCE** (seed · outage-floor · always-available one-click reset target); DB = versioned gated copy; union-floor where detector/availability polarity applies; "coded-for-safety" alone is NOT a lock rationale — locks remain ONLY on ENGINES/MECHANICS (eval-gate engine, grounding algorithms, injection-boundary wiring, single gateway, Zod structure, audit-ledger mechanics).
- **HC-2 (R-B, owner law): SANDBOX PARITY** — every new governed family ships session-preview → personal draft → super-only global publish + reset-to-reference; non-conforming designs auto-reject.
- **Design notes get RULE-25 treatment**: every load-bearing claim line-anchored at HEAD; the word "free/bedava" is forbidden without proof (L1-v1 lesson: 52/52 findings survived because the note was written from the machinery's mental model, not the code).
- **Every Operator task prompt carries its FENCE block as its FIRST section** (apply_migration/execute_sql-DDL/repo-writes forbidden; db push ONLY; migration repair for ledger fixes; STOP-and-report on any surprise). Proven twice today: breach happened without it; STOP-behavior happened with it.
- **evalGate additive-backend-dispatch pattern, third instance** (armes → superset → system): adding a backend legitimately adds ONE dispatch arm; engine/stage-order/old branches byte-identical, test-pinned.
- **params-as-kind pattern**: platform config rides the governed-kind lifecycle on the `system` lane — L2 prompt values reuse the SAME lane.
- **Fingerprint discipline**: stamp attests PUBLISHED state only (lab under `cwf.lab.*`; drafts never flip hashes); inputs use-time-captured (torn-attestation); join key = `ctx.turnId`.

<!-- END · cwf-open-items-register-v29 · rev 29 · 2026-07-09 -->
