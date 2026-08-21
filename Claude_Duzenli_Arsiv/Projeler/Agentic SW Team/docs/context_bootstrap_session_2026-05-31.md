# Context Bootstrap — ARDICTECH Combined-Platform Session

> **Type:** Compressed session handoff · **Source session:** 2026-05-31 · **Compressor:** Claude

---

### 0. NEXT-SESSION LOADER PRIMER

Paste verbatim into the new Claude session as first message:

> Read this Context Bootstrap doc + `context_bootstrap.md` + `context_boostrapt_combo_prj.md` + `phase_0_runbook.md` from the project. Resume as senior full-stack architect, single-author of stage prompts (§5 invariant). Do NOT re-explain or expand this doc unless asked. Next action: write D0.2 stage prompt unless I redirect.

---

### 1. CORE SEED & STATE

- **Objective:** Build ARDICTECH dual-platform program — EAIP (product platform, 67 components, 10 layers, 12,060h) + Revolutionize (autonomous engineering org, Phase 1 ≈ 42 stages, 6-8wk) — sharing sovereign substrate {Keycloak·Vault·MariaDB·MinIO·K8s·Redpanda·ClickHouse·Qdrant}. Bridge: intent_stream + verification_gate + reality_feed.
- **Current State:** 9 HTML deliverables shipped + 4 PDFs + 4 markdowns. Zero platform code yet. **TheBluePrint23 V0.1 SHIPPED LIVE** (meta-tooling SSoT app) on Vercel — Next.js scaffold renders hero at `https://theblueprint23.vercel.app` + `https://theblueprint23.dev`. Phase 0 runbook v0.1 draft created. Next stage: D0.2 (layout shell + 8 tabs).
- **Operational Env:** Antigravity (Conductor pattern, Maymun operates) · Node 22 · Vercel managed deploy · GitHub (org TBD, Maymun admin) · Anthropic Claude API + Vertex AI Gemini available
- **Identifiers:**
  - Meta-tooling repo: `<owner>/TheBluePrint23` (private, V0.1 deployed)
  - Platform repo: `maymun207/revolutionize` (suggested name, NOT YET CREATED)
  - Live URLs: `theblueprint23.dev` (primary, .dev TLD HSTS-preloaded) + `theblueprint23.vercel.app` (fallback)
  - Vercel project: `theblueprint23`
  - Prompts archive path: `TheBluePrint23/prompts/v0/D0.X-*.md`

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**Meta-tooling (TheBluePrint23):**
```
Next.js 15.x (App Router) → React 19.x → Tailwind 3.4.17 → TS strict
  → Vercel CDN/edge → users
V1: + Supabase (Postgres + REST + auth + RLS + realtime)
V2 (deferred): + GitHub API for inline-edit-as-PR flow
```

**Platform substrate (target arch, hybrid topology):**
```
Self-hosted: K8s · Redpanda(3) · ClickHouse(3) · Qdrant(2) · Postgres-HA ·
             MariaDB-Galera✓ · Keycloak✓ · MinIO✓ · Vault-HA · Grafana+Tempo+Metabase
Cloud SaaS: Anthropic Claude · Vertex Gemini · PagerDuty · Sentry · GitHub Enterprise✓ · LangSmith?
Zones: Z1 public-edge | Z2 app | Z3 data (no egress)
Cost target: self-hosted ~$800-1.5K/mo · SaaS ~$70-200/mo · LLM $5-15K/mo
```

**Dark theme tokens (locked):**
```
bg:#0D1117 · bg2:#161B22 · bg3:#21262D · border:#30363D · border2:#444C56
text:#E6EDF3 · text2:#8B949E · text3:#6E7681
accent: blue:#58A6FF · green:#3FB950 · amber:#E3B341
font-sans: system-ui,-apple-system,'Segoe UI',Roboto · font-mono: ui-monospace,'JetBrains Mono'
```

**Three-folds practice loops (concurrent):**
```
(1) CWF v1 delivery → Kale contract Dec 2026 [contractual, *cannot slip*]
(2) Revolutionize v0.5 internal product [can slip if needed]
(3) TheBluePrint23 meta-tooling [lowest risk, highest learning rate]
```

---

### 3. DOMAIN DICTIONARY

- `EAIP`: Enterprise AI Platform — product platform, 67 components, customer-facing. M1-M13 milestones.
- `Revolutionize`: Internal autonomous-engineering org that BUILDS EAIP. Phase 1-8.
- `CWF`: Contract Workflow for Kale (manufacturing customer). M3-M5 deliverable. Contractual, Dec 2026 cutover.
- `ARMES`: ARDICTECH's existing Manufacturing Execution System (pre-existing platform).
- `SOUL.md`: Founder's taste/preference anchor doc, source for Vision Engine in Phase 2+. Owner = Maymun.
- `Conductor`: Senior engineer (here: Maymun) who directs Antigravity, does NOT type code (combo doc §3).
- `Three folds`: Same agentic loop practiced 3x — CWF customer build, Revolutionize internal, TheBluePrint23 meta.
- `Walking skeleton`: Week 2 deliverable, end-to-end stubbed chain WhatsApp→Gateway→LangGraph→LiteLLM→echo→OTel→ClickHouse→Grafana.
- `Stage-gate`: `stages/<id>/verify.sh` per stage, exit-0 gates next stage. CI enforces.
- `Pattern Library`: `docs/pattern_library/` — accumulating lessons.md entries from every stage. §5 invariant: SACRED.
- `Bridge channels`: 3 explicit interfaces between Revolutionize ↔ EAIP — intent_stream + verification_gate + reality_feed.
- `Phase 0`: Bootstrap phase, NOT development. 3 tracks: A (decisions, CTO+Maymun), B (shared substrate, all 6 eng joint Wk1), C (walking skeleton design). Plus new Track D (meta-tooling, this work).

---

### 4. CRITICAL DECISIONS & RATIONALES

1. **Team split: Builder vs Built** → T1 (3 eng) Revolutionize, T2 (3 eng) EAIP+CWF (rejected: Product-vs-Platform B → side-tracks Revolutionize; rejected: Together-then-split C → loses parallel time)
2. **Headcount: 3+3 → 1+5 at Phase 1 exit gate** → preserves Revolutionize team identity, then shifts to CWF crunch. Switch trigger: Phase 1 exit gate's 5 items green, OR CWF velocity <2 stage/wk (rejected: static 3+3 → CWF slip risk; rejected: 2+4 → Revolutionize stretches 10-12wk)
3. **Day 1 strategy: Wk1 joint Phase 0, Wk2 split** → shared learning, substrate ownership clarity, natural Monday/Friday ritual kickoff at Wk2 demo (rejected: Day1 split A → coordination overhead; rejected: 2wk joint C → too long)
4. **TheBluePrint23 phasing: V0 (static, 1wk) → V1 (Supabase, 2wk), V2 deferred** → ship live ASAP, add state later (rejected: V1-direct → no fallback if Supabase blocks)
5. **TheBluePrint23 PR review: Claude+Maymun dual-eye** → CTO time reserved for Phase 0 substrate (rejected: CTO review every PR → bottleneck)
6. **Stage prompt template: §6.1 full 13-field on TheBluePrint23 stages too** → calibration data for Phase 1, lessons.md feeds Pattern Library (rejected: lightweight template → no calibration value)
7. **V0 ship before V1 starts** → fallback safety, never blocked on missing app (rejected: V1-direct)
8. **Domain: theblueprint23.dev ($9.99)** → .dev TLD HSTS-preloaded, dev-tool positioning (rejected: .com unavailable, .io at $37.99 more expensive)
9. **Coordinator-who-stays-in-Revolutionize after 1+5 split = the engineer who wrote Stage Groups 1.1-1.3 (telemetry/observability)** → tooling-builds-tooling (rejected: random pick)
10. **Bilingual convention only for architectural deliverables** → operational runbooks Turkish-primary + English code/proper-nouns (rejected: full bilingual everywhere → 2x effort, no value for ops docs)
11. **Prompts committed to TheBluePrint23 repo at `prompts/v0/D0.X-*.md`** → §5 invariant "prompts versioned in git + SHA recorded"
12. **§4 (EAIP↔Revolutionize relationship) of 5 OPEN prereqs RESOLVED** → separate teams + shared substrate + 3 bridge channels. 4 prereqs remain TBD.

---

### 5. CONSTRAINTS & INVARIANTS (must-hold)

* `CWF feda edilemez, Revolutionize edilebilir` (combo §5) — if anything slips, Revolutionize slips first, CWF never
* `Pattern Library SACRED` — lessons.md after every stage, no exceptions
* `Every PR ≥30min human review, no rubber-stamp`
* `Monday+Friday rituals don't skip` (Mon: Stage Generator review; Fri: demo+retro+lessons update)
* `Single-author rule: Claude writes ALL stage prompts` (no committee, no co-authoring)
* `Prompts versioned in git + SHA recorded` per stage
* `Antigravity Artifacts ≠ Verifier proof` — independent verification mandatory (Verifier impl deferred to M4)
* `Bridge channels are the ONLY interface between Revolutionize and EAIP` — no direct coupling
* `Conductor (Maymun) does not type code` — only directs Antigravity
* `V0 read-only, no state` — no Supabase, no auth, no DB until V1
* `Phase 0 exit gate ALL green before Wk2 split` — single red item blocks
* `Repo visibility: PRIVATE` — never accidentally public
* `Tailwind tokens locked` — hex values above are canonical
* `Stage type discipline: §6.1 13-field template, no shortcuts`

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

**Open prereqs (4 of 5 still TBD):**
1. *First product (Stage 1.6)*: Web Asistan widget vs CWF audit PDF generator. Recommendation: **Web Asistan widget** (low risk, telemetry-rich, non-contractual). Maymun decision pending.
2. *SOUL.md founder*: Default = Maymun, formal confirmation needed.
3. *Quarterly LLM budget USD*: Suggested $15-25K/quarter for Phase 1. Maymun decision.
5. *Expertise gaps for external consultants*: Suggested TLA+/Alloy formal methods + multi-tenant security audit + ML evals.

**Tech-debt / deferred:**
- GitHub MCP not connected (opt-in needed for `search_mcp_registry`). Not blocking; D0.1 worked without. Recommend connect before D0.2 review.
- Supabase MCP not yet connected. Need before V1 work starts.
- Phase 0 runbook acceptance commands are *iskelet*, CTO redline (24h SLA promised) not yet received.
- `Loki` not in B11 observability stack (combo doc omitted). Open question for CTO redline.
- B7 Redpanda partition counts + B8 ClickHouse replica config are placeholders, CTO must validate against load expectations.
- `make dev-up` local stack not designed yet — needed before Phase 1 to avoid all reviews happening on cluster.
- Vercel free tier limits: monitor if app grows past hobby thresholds (unlikely in V0-V1).

**Active edge cases observed:**
- Create-next-app may pull Tailwind v4 by default; D0.1 pinned to v3.4.17 successfully (Antigravity got it right first try, 2 min).
- HSTS preload via .dev TLD = automatic, no manual config needed.

**Architectural crossroads pending decision:**
- Verifier implementation choice (M4): formal methods vs property-based vs LLM-based. Not urgent (Phase 1 doesn't gate on it).
- Auth migration path V1→V2: Supabase auth initially, Keycloak SSO later — migration not designed.

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Commit `D0.1-lessons.md` to `TheBluePrint23/prompts/v0/`** → file present in repo, ≥1 commit
   - Content seed: stage took 2min, single-shot success, Tailwind 3.4.17 pulled correctly, prompt deemed adequate by operator
2. **Write D0.2 stage prompt** (Claude) → file `D0.2-layout-shell.md` ready for Antigravity
   - Scope: top nav (8 tabs), sticky header, active-route highlight, 8 placeholder routes, custom 404, responsive hamburger
   - Same §6.1 13-field template structure as D0.1
3. **Resolve OPEN prereq #1 (first product)** (Maymun + CTO) → written answer in `docs/decisions/open_prereqs.md`, no TBD
4. **Phase 0 runbook CTO redline** → `phase_0_runbook.md` v0.2 with verified acceptance commands
5. **Connect GitHub MCP** (Maymun, optional) → Claude can read PRs/code for future stage prompts
6. **Execute D0.2 in Antigravity** (Maymun) → 8-tab nav live on theblueprint23.dev
7. **Commit D0.2-lessons.md** → pattern library entry #2
8. **D0.3 prompt: v6 SSoT content port to Next.js routes** (Claude after D0.2)

---

### 8. OPEN QUESTIONS FOR USER

- OPEN prereq #1: Web Asistan widget vs CWF audit PDF? (recommendation: widget)
- OPEN prereq #2: SOUL.md founder = Maymun confirmed? (formal yes/no)
- OPEN prereq #3: Quarterly LLM budget number? ($15-25K range suggested, need actual)
- OPEN prereq #5: Expertise gaps consultant search priority? (3 areas suggested)
- GitHub MCP opt-in: connect now or wait?
- Phase 0 runbook redline: CTO availability this week?
- Domain ownership: `theblueprint23.dev` registrar = Vercel-managed, all good?
- Should new compressed doc be added to project knowledge (recommended) or only pasted in new session?

---

### 9. DIRECTIVE TO NEXT CLAUDE

Do NOT expand, re-explain, or summarize this doc unless explicitly asked. Resume work from §7 step 1. Treat §5 invariants as non-negotiable. If a request conflicts with §5, surface the conflict before complying.

---

### 10. SESSION ARTIFACTS PRODUCED (reference)

Files created during source session (already in project or outputs):
- `phase_0_runbook.md` (v0.1 draft, 341 lines, 3 tracks + exit gate)
- `D0.1-repo-init.md` (350-line stage prompt, executed successfully)
- This document

External live artifacts:
- TheBluePrint23 repo on GitHub (private, V0.1)
- `https://theblueprint23.vercel.app` (Vercel default)
- `https://theblueprint23.dev` (purchased $9.99/yr, .dev TLD)

---

*End of compressed context. Reader: load source docs from project + execute §7 step 1.*
