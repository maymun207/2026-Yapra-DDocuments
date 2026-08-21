# CWF — Phase A Design Note: Sandbox-vs-Global RBAC + Nav Re-grouping · v3

<!-- v3 · 2026-07-06 · anchor = origin/master `bf3d95d`. SUPERSEDES v2.
     DELTA vs v2: (1) Providers row upgraded from "view + Tweak selection" to a FULL personal provider
     sandbox — developer adds own LLM providers (LiteLLM / Ollama / own API key), personal rows only,
     promotion to global is out-of-band (verbal/email → super adds). Carved as sub-phase A3. (2) Local-LLM
     entry: guided tunnel setup + auth-header-as-personal-secret + honest probe (reachable / unreachable /
     private-IP-blocked). Browser-direct localhost REJECTED (would bypass server-side deterministic
     governance — single-gateway + ADR-001 violation). (3) SSRF/egress guard named as a security artifact.
     (4) Quota interaction decided: personal-key spend = quota-exempt but AUDITED. (5) Phasing locked:
     A → A2 (kind sandbox) → A3 (provider sandbox) → B (quota) → C (User Docs). -->

## 0. The governing principle (owner-set)

> Developer plays with **everything in their own sandbox**; the **only** gated thing is **global level** —
> any change committing/publishing to shared, all-users state is **super_admin only**. Promotion of a
> proven sandbox artifact to global is a human act (verbal/email → super), not an in-system workflow.

One deliberate exception, owner-acknowledged: **CORE kind structure** is code-Zod-locked for *everyone*
(super included) — categorical immutable, not a sandbox/global question.

## 1. Phases (locked)

- **A — nav IA (5 sections) + sandbox-vs-global capability model** + visibility for surfaces whose sandbox
  already exists + server-side splits (replay lens/run, providers read/mutate, kinds read/edit).
- **A2 — SOFT-kind session-draft/preview subsystem** (new machinery: per-user kind draft store +
  `composeLabSlice` overlay of session kind-structure drafts + super-only `KIND_PUBLISH_GLOBAL`).
- **A3 — Personal provider sandbox** (new machinery: personal provider rows + gateway resolution +
  personal secret + SSRF guard + local-LLM tunnel entry + probe). Detail §4.
- **B — replay quota** (monthly auto-reset + super manual reset + no-limit + per-user usage view; grants
  developer a quota-gated `REPLAY_RUN`). Personal-key spend is quota-EXEMPT but audited (§4.4).
- **C — User Docs page** (DOCUMENTS renderer; hosts the committed governance-replay explainer).

## 2. Nav IA: two planes → five sections

`plane` (visual grouping only) → `section`; five `SectionGroup`s:
**DOCUMENTS** Architecture · (User Docs → C) | **CONNECTION SETTINGS** MCP Servers · LLM Providers |
**CONFIGURATION** Rules · Kinds · Routing | **MICROSCOPE** Inspect · Tweak · Replay | **GOVERN** User
Management. RULE 24 wording → "sectioned control-plane home" (lock-step). Primer collapse⇄expand preserved.

## 3. Sandbox-vs-global mapping (per surface)

| Surface | Sandbox op (developer + super) | Global op (super ONLY) | State |
|---|---|---|---|
| Rules | draft CRUD + session preview | `RULE_PUBLISH_GLOBAL` | ✅ exists |
| Lab / Tweak | session lab toggle + per-session model try | — | ✅ exists |
| Replay lenses | token-free lenses incl. `@ preview` (`REPLAY_LENS`, new) | paid run `REPLAY_RUN` (quota in B) | split in A |
| Kinds — SOFT structure | session kind-draft (`KIND_DRAFT`, A2) | `KIND_PUBLISH_GLOBAL` (A2; today's `KIND_SOFT_EDIT` becomes it) | ❌ → A2 |
| Kinds — CORE structure | — (code-locked for everyone) | reset-to-reference only | locked |
| Kind instances | via rule drafts | via rule publish | ✅ exists |
| **Providers** | **personal provider rows** — add own LLM (LiteLLM/Ollama/own key), personal secret, probe, use in own sessions (`PROVIDER_PERSONAL`, A3); registry view (`KIND— sorry — PROVIDER_VIEW`, A) | registry add/remove/config `PROVIDER_MANAGE`; promotion = out-of-band human act | view in A · sandbox in A3 |
| MCP | personal servers (owner-RLS) | global `CONFIG_GLOBAL` | ✅ exists — the pattern A3 copies |
| Routing | `ROUTING_CACHE_CLEAR` | `ROUTING_EDIT_GLOBAL` | ✅ exists |
| Users | — | `USER_MANAGE` | super only |

**Capability delta:** Phase A adds to `MAKER_PERMISSIONS`: `REPLAY_LENS`, `PROVIDER_VIEW`, `KIND_VIEW`
(interim read-only visibility until A2's `KIND_DRAFT`). A2 adds `KIND_DRAFT`. A3 adds `PROVIDER_PERSONAL`.
Global caps stay super. No role literals in render.

Nav `show:`: Kinds → `can(KIND_VIEW) || can(KIND_SOFT_EDIT)`; Providers → `can(PROVIDER_VIEW) ||
can(PROVIDER_MANAGE)`; Replay → `can(REPLAY_LENS) || can(REPLAY_RUN)`; rest unchanged.

## 4. A3 — Personal provider sandbox (design core)

**4.1 Data model — mirror the MCP personal/global pattern:** personal provider rows owner-RLS (per-user),
global registry untouched. A personal row: name, base URL, model id(s), auth = personal secret reference
(masked, rotate-only, never echoed, never client-bound). Resolution order for a session: session/Tweak
selection → personal row → global registry. **Single-LLM-gateway preserved:** a personal provider is a ROW
the existing gateway resolves (OpenAI-compatible endpoints: LiteLLM/Ollama fit natively) — NEVER a second
client/code path.

**4.2 Local-LLM entry (the owner's point-3 affordance):** app runs on Vercel → the server cannot reach a
developer's localhost. REJECTED alternative: browser-direct localhost calls (would move the LLM call
outside the server-side turn pipeline → bypasses deterministic governance gates; violates single-gateway +
ADR-001). ACCEPTED: guided tunnel flow inside the personal-provider UI — copy-paste tunnel command snippet
(e.g. cloudflared/ngrok), URL field, **auth-header field effectively mandatory** (a naked Ollama tunnel =
LLM open to the internet; the token is stored via the personal-secret discipline), plus an honest
**probe/test-connection** button (mirrors MCP probe): reachable / unreachable / private-IP-blocked.

**4.3 SSRF/egress guard (security artifact — full review):** personal base URLs are user-supplied server-
side fetch targets. Mandatory: https-only, block private/link-local/loopback ranges, post-resolve IP
validation. Tunnel URLs (public hostnames) pass naturally.

**4.4 Cost & audit:** paid replay/chat spend on a PERSONAL provider is **quota-exempt** (cost rides the
developer's own key) but **still audited** (audit is traceability, not cost). Global/shared provider spend
is what Phase B's quota protects.

## 5. Server-side gate discipline (visibility ≠ enforcement)

- **Replay `/api/admin/replay`** — GET (specimens + lenses; pure, token-free, un-audited) → `REPLAY_LENS`;
  POST (paid run) → `REPLAY_RUN`. C9 + NAME-ONLY unchanged.
- **Providers API** — read → `PROVIDER_VIEW`; mutate global → `PROVIDER_MANAGE`; personal rows (A3) →
  `PROVIDER_PERSONAL` + owner-RLS.
- **Kinds API** — read → `KIND_VIEW`; global write → `KIND_SOFT_EDIT` (A2 renames the axis: draft
  `KIND_DRAFT` / publish `KIND_PUBLISH_GLOBAL`). Session drafts never touch governed tables.

## 6. Invariants / floor

Global = super, always; sandbox ops never write governed global tables. Paid shared-spend gated (A: denied
to dev; B: quota). Lenses stay pure-GET/un-audited/NAME-ONLY/production-core-reuse. C9 raw payloads
server-side. CORE kind structure code-locked. Personal secrets masked/rotate-only/never client-bound.
Single LLM gateway. USER keeps no `PANEL_ACCESS`; MCP global stays `CONFIG_GLOBAL`.

## 7. Living-doc lock-step

Each phase seals independently: architecture doc + manifest reseal + (A only) RULE 24 wording, two-commit
pattern, docVersion bump, drift-gate-green pre-flight.

<!-- END · cwf-phase-A-rbac-nav-maker-sandbox-design-v3 · rev 3 · 2026-07-06 · supersedes v2 -->
