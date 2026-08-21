# ARDICTECH Program Plan — Day 1 → Phase 0 Exit → Phase 1 Exit (v1.1)
## Charter Amendments · Phase 1 Entry Gate · Resourced Week-by-Week Plan

| Field | Value |
|---|---|
| Date | 2026-06-11 (v1.1 — exit gate reconciled against canonical schedule wording) |
| Status | Proposed — pending Maymun (sponsor) + CTO approval |
| Author | Claude (single-author rule, dev schedule §9) |
| Companion docs | `phase_0_runbook.md` · `dev_schedule_patch_v1.md` · ADR-001 · ADR-002 · A7 transition contract |
| Supersedes | Nothing — amends the charter and decomposes the runbook into a resourced calendar |

---

## 0. Stated assumptions (correct these, the plan shifts mechanically)

- **ASM-1 — Day 1 = Monday 2026-06-15.** All dates below are anchored there. If kickoff slips, slide everything; sequence and ownership do not change.
- **ASM-2 — Engineer skill slots.** Names unknown to this document; map your six engineers onto these profiles (the runbook's lead/support split already implies them):
  - **Dev#1** — Takım-1 Lead · senior backend/DevOps (K8s, Redpanda, ClickHouse, CI)
  - **Dev#2** — Takım-1 · backend/data engineer (pipelines, storage, Python)
  - **Dev#3** — Takım-1 · AI engineer (agent runtime, LLM integration, MCP)
  - **Dev#4** — Takım-2 Lead · senior backend/platform (Keycloak, Kong, Vault)
  - **Dev#5** — Takım-2 · AI engineer (LangGraph, RAG, Qdrant)
  - **Dev#6** — Takım-2 · full-stack (Channel Gateway, frontend, integrations)
- **ASM-3 — GitHub Team upgrade and quarterly LLM budget are closable inside Week 0.** Both are entry-gate items (G2, G3 below); if either cannot be closed by Week 1 Friday, Phase 1 start slips — by design, not accident.

---

# PART I — Charter Amendments (CA-1 … CA-7)

To be appended to `08_leadership_charter_bilingual.html` as a "Program Amendments v1" section after approval. Each amendment is one enforceable sentence plus its mechanism — no aspirational prose.

### CA-1 — CWF/Revolutionize decoupling (the honesty clause)
**Amendment:** CWF v1 for Kale Seramik is delivered by Takım-2 humans using the conductor methodology (Phase-0-proven: Conductor → Claude prompts → AG executes → gated merge). Revolutionize platform maturity is **not** on the CWF critical path, and no CWF milestone may take a dependency on any Revolutionize phase ≥ 2.
**Mechanism:** any proposed CWF task with a Revolutionize dependency is rejected at planning; the bridge ("Revolutionize ships PRs into EAIP") is a destination state, first exercised against EAIP no earlier than Phase 4 shadow mode.

### CA-2 — The verification gate must be measured, not trusted
**Amendment:** From Stage 1.1.1 onward, two reviewer-health metrics are first-class telemetry: **review-minutes-per-PR** and **defect-escape-rate** (defects found post-merge that the gate should have caught). Declining review time + rising merge rate triggers a mandatory gate review.
**Mechanism:** both metrics land on the Stage 1.3.4 dashboard next to cost and prefix-cache hit rate. Threshold: median review time falling below 15 min/PR for two consecutive weeks → CTO-led gate audit. Autonomy is *earned* by measured escape rates, never granted by schedule.

### CA-3 — Property-based testing is the default gate; formal methods are demoted to core invariants
**Amendment:** Hypothesis/fast-check property tests are the default Verification Mesh gate. TLA+/Alloy formal specification is reserved for a small named set of core invariants (identity state mutations, accounting idempotency, the verification gate's own state machine). **Phase 5 completion is not a prerequisite for Phase 6** — cells may enter production gated on property tests + canaries while formal coverage grows behind.
**Mechanism:** Phase 5 scope is re-cut at its just-in-time decomposition; the named invariant list is an ADR (ADR-00x) authored before Phase 5 starts.

### CA-4 — Conductor capability is a scheduled deliverable, not a hoped-for side effect
**Amendment:** All six engineers must each independently conduct ≥ 3 real stages (prompt request → AG direction → gate → merge) by Phase 1 exit. Learning curves are calendar-bound; this time is on the schedule (Part III rotation plan), not absorbed informally.
**Mechanism:** conductor log (who conducted which stage) is part of every `lessons.md`; the Phase 1 exit gate includes a 6/6 conductor-rotation check (G-X3 in Part II).

### CA-5 — Research-grade components carry kill criteria
**Amendment:** Empathy engine (OASIS), DSPy prompt evolver, and tournament selection each enter the schedule with an explicit telemetry-based success threshold and a sunset decision date. A component that does not show measured lift inside its validation window is cut at the decision date — not extended by default.
**Mechanism:** thresholds and dates are written into the stage prompts that introduce each component; the decision is a Maymun + CTO gate, recorded in the governance log.

### CA-6 — Reality-feed cold start is acknowledged in planning
**Amendment:** Revolutionize's reality feed has no production data before CWF goes live (≈ M5–M7). Phases 2–4 plan around thin reality data; v2 capability validation (tournament selection, prompt evolution) is not scheduled before ~M10 and is never used to justify earlier autonomy claims.
**Mechanism:** Phase 2+ just-in-time decompositions must state their reality-data assumptions explicitly; any stage claiming "validated by production telemetry" before CWF go-live is rejected at prompt review.

### CA-7 — Safety controls are technical, not social
**Amendment:** No agent (AG or Revolutionize) operates against a repository without enforced branch protection (required reviews + required CI status), and no agent class runs without a hard per-agent token/cost cap configured in the gateway wrapper (Stage 1.4.2).
**Mechanism:** GitHub Team tier + branch protection on both repos is entry-gate item G2; budget + cap configuration is G3. Both block Phase 1 start.

---

# PART II — Phase 1 Entry Gate (G1 … G8)

Checked **Friday Week 1, 16:00** together with the runbook §6 exit gate. Single red = Phase 1 does not start Monday. Every item has a binary acceptance command or artifact.

| # | Condition | Acceptance | Owner |
|---|---|---|---|
| **G1** | Phase 0 runbook exit gate fully green (A/B/C tracks, all §6 commands) | Runbook §6 table, every row ✅ | CTO |
| **G2** | GitHub Team tier active; branch protection (required review + required CI) enforced on `agbuilder-platform/revolutionize` **and** `maymun207/TheBluePrint23`; verified by a test push-to-main being rejected | Screenshot of rejected direct push, both repos | Maymun |
| **G3** | Quarterly LLM budget approved (number, not intent); per-agent-class caps drafted for the 1.4.2 wrapper config; ROPENS ③ flipped to RESOLVED | Budget figure in governance log + draft `caps.yaml` committed | Maymun + CTO |
| **G4** | First product decided (ROPENS ①) — Stage Group 1.6 scope named; browser-MCP promotion decision made (dev_schedule_patch open question) | Decision in governance log; default per runbook risk table = Web Asistan widget if undecided by Week 0 Friday | Maymun + CTO |
| **G5** | SOUL.md founder confirmation (ROPENS ②) — founder-agent values draft reviewed and signed by Maymun | Signed `SOUL.md` v0 committed to content repo | Maymun |
| **G6** | Reading week complete: 6/6 write-ups + ADR-003 (patterns adopted from prior art) drafted | `ls docs/reading_week_writeups/*.md \| wc -l` → 6; ADR-003 in repo | CTO (A5 owner consolidates) |
| **G7** | Expertise-gap review (ROPENS ⑤): external consultant needs assessed for Phase 1 scope; answer may be "none needed for Phase 1, revisit at Phase 3/5" | One-page assessment in governance log | CTO |
| **G8** | Conductor rotation schedule (Part III §R) signed by both team leads — the 6/6 training commitment of CA-4 | Rotation table committed + 2 lead signatures | Maymun |

> **Note on G4/G5:** these are the two items most likely to slip because they are decisions, not work. They are deliberately front-loaded into Week 0 with the runbook's own deadline ("Week 0 sonu") and a named default (Web Asistan widget) so indecision cannot stall the program.

---

# PART III — Resourced Plan, Day 1 → Phase 1 Exit

## Calendar skeleton

```
Week 0   Jun 15–19   A-track: decisions + reading week        ALL 6 devs reading
Week 1   Jun 22–26   B-track: joint substrate + C-track       Fri 16:00 EXIT GATE (runbook §6 + G1–G8)
─────────────────────────────────────────────────────────────  ← Phase 0 ends / Phase 1 + EAIP M1 begin
Week 2   Jun 29      P1-W1: SG 1.1 telemetry      │ T2: walking skeleton
Week 3   Jul 6       P1-W2: SG 1.1 done → 1.2     │ T2: M1 Core
Week 4   Jul 13      P1-W3: SG 1.2 done → 1.3     │ T2: M1 Core
Week 5   Jul 20      P1-W4: SG 1.3 done → 1.4∥1.7 │ T2: M1 close / M2 start
Week 6   Jul 27      P1-W5: 1.4 done · 1.7 mid    │ T2: Web Asistan
Week 7   Aug 3       P1-W6: 1.7 done → 1.5        │ T2: Web Asistan / CWF prep
Week 8   Aug 10      P1-W7: 1.5 done → 1.6        │ T2: CWF v1 starts (M3)
Week 9   Aug 17      P1-W8: 1.6 + EXIT GATE Fri   │ T2: CWF v1
─────────────────────────────────────────────────────────────  ← Phase 1 exit · 3+3→1+5 evaluation
Sep–Nov              Revolutionize Phase 2+        │ CWF v1 (M3–M5) → Kale UAT
December             (per transition outcome)      │ CWF Kale go-live — HARD DEADLINE
```

Phase 1 is planned at **8 weeks (the conservative end of 6–8)** because Week 2–3 cadence includes the team's first solo conducting — a learning curve, which is calendar-bound. If actual cadence hits the 5–10 stages/week ramp, SG 1.6 finishes in Week 8 and Week 9 becomes pure exit-gate buffer. Plan to the slow case; bank the fast case.

---

## Week 0 (Jun 15–19) — Decisions + Reading

**All six developers:** Reading week (runbook A4). Anthropic *Building Effective Agents* + OpenClaw + Hermes Agent + OASIS sources. 3–5 working days; one-page write-up each, committed to `docs/reading_week_writeups/`. This is their only assignment this week — protect it.

| Who | Mon–Tue | Wed–Thu | Fri |
|---|---|---|---|
| **Maymun** | G4 first-product decision session with CTO (deadline Fri, default = Web Asistan widget) · kick G2 GitHub upgrade | G5 SOUL.md review/sign · G3 budget approval | A-track checkpoint: G2–G5 status |
| **CTO** | A2 ADR-001/002 walkthrough to team (1h, recorded objections or "Accepted") · co-own G4 | A7 transition contract finalized · G7 expertise-gap assessment · read write-ups as they land | A5: name the ADR-003 consolidator · checkpoint |
| **Claude** | C1 walking-skeleton design (7–9 component chain, real/stub marked) with CTO | Author Stage 1.1.2–1.1.4 prompts (1.1.1 already written) · draft `caps.yaml` skeleton for G3 | Author B-track verify scripts where missing |
| **Dev#1–#6** | Reading | Reading + write-ups | Write-ups committed (6/6) |

**Week 0 exit check (informal, Fri):** G2 in motion, G3/G4/G5 decided, 6/6 write-ups in. Anything red here is the early-warning for the Week 1 gate.

---

## Week 1 (Jun 22–26) — Joint Substrate (B-track) + C-track

Runbook B1–B14 with its existing lead/support assignments, arranged into a dependency-respecting calendar. Both teams work the **shared** substrate — this is deliberate cross-training before the split.

| Who | Mon | Tue | Wed | Thu | Fri AM |
|---|---|---|---|---|---|
| **Dev#1** (T1L) | B7 Redpanda 3-broker + topics (`telemetry.raw.v1` p12 · `intent.stream.v1` p3 · `verification.gate.v1` p3 · `reality.feed.v1` p6) | B7 mTLS + B8 ClickHouse | B8 ClickHouse done · B13 AG workspace setup (4h lead setup) | B14 CI baseline + stage-gate skeleton (`ci.yml`, `verify.sh` runner) | Gate prep: own rows green |
| **Dev#2** (T1) | Support B3 Vault (T1 has 8h buffer for Vault HA risk) | B3 Vault HA cont. | Support B8 · review T2-led B-items | B14 support (CI used by both teams) | Hello-world PR through CI |
| **Dev#3** (T1) | Review Keycloak realm design (B-item, T2-led) | B11 support (observability stack) | B13: own AG hello-world + help others | A5 ADR-003 writing (if named consolidator) | AG access 6/6 verified |
| **Dev#4** (T2L) | Keycloak realm (T2-lead B-item) | Kong baseline · Vault policies | MinIO + MariaDB Galera items | Postgres + Qdrant items | Gate prep: own rows green |
| **Dev#5** (T2) | Support Keycloak · Qdrant | Observability stack (B11) | LangGraph stub design (C1 input) | Support B14 · AG hello-world | C3 plan input |
| **Dev#6** (T2) | MinIO support | Channel Gateway skeleton design (C-track input) | Support storage items | AG hello-world · docs | C3 plan input |
| **Maymun + CTO + Claude** | C2 (parallel): walking-skeleton visual + sign-off | C2 cont. | C3: Week-2 split execution plan drafted | C3 signed (Maymun + CTO + 2 leads) | — |

**Friday 16:00 — PHASE 0 EXIT GATE + PHASE 1 ENTRY GATE (G1–G8).** All runbook §6 commands + Part II table. Single red → emergency closure meeting, Week 2 does not start. The Monday/Friday ritual (30-min Monday standup, Friday demo) goes live from Week 2.

---

## Weeks 2–9 — Phase 1 execution (Takım-1) ∥ EAIP M1+ (Takım-2)

### Operating model for this block (see Part IV for rationale)

- **Unit of work:** 1 stage = 1 Claude-authored prompt = 1 AG run = 1 PR = 1 gated merge. Unchanged.
- **Assignment model:** stages are **pulled, not pushed**. Each T1 dev conducts one stage at a time (WIP limit = 1) from the top of the current stage group's ordered backlog. The weekly table below fixes *lanes and sequencing*, not name-to-stage-number bindings — AG stage durations vary 30 min–4 h and a name-per-stage plan goes stale by Wednesday.
- **Review budget is the managed constraint:** every PR gets ≥ 30 min human review. At 3–5 stages/week that is 1.5–2.5 h; at ramp (5–10) it is 2.5–5 h. Review is split: CTO reviews architecture-bearing stages (group openers, the 1.4.2 wrapper, 1.5.1 base class, anything touching security); cross-pair dev review covers the rest. CA-2 metrics record all of it from day one.
- **Cadence targets:** W2–3: 3–4 stages/wk (learning curve) · W4–6: 5–7 · W7–9: 7–10.

### §R — Conductor rotation (CA-4 / G8)

| Week | Conducting solo (T1) | T2 shadow/conduct slot |
|---|---|---|
| 2 | Dev#1 conducts 1.1.1; Dev#2, Dev#3 shadow then conduct 1 stage each | — (T2 heads-down on skeleton) |
| 3 | All T1 solo | Dev#5 conducts 1 T1 telemetry stage (cross-train) |
| 4 | All T1 solo | Dev#6 conducts 1 stage |
| 5–6 | All T1 solo | Dev#4 conducts 1 stage |
| 7–9 | T1 solo · T2 devs each conduct 1 more stage in their own EAIP lane using the same loop | — |

Target: **6/6 engineers ≥ 3 conducted stages by Phase 1 exit.** T2's CWF work uses the identical conductor loop, so their reps accumulate in their own lane — the rotation above only guarantees the floor.

### Takım-1 week-by-week

**Week 2 (P1-W1) — Stage Group 1.1 Telemetry foundation (10 stages) opens**
- **Dev#1:** conducts **1.1.1 telemetry event schema** (Pydantic + TS, schema-versioned) — the program's first Phase 1 stage; then OTel collector deployment stage. Friday demo: a telemetry event visible in Grafana (runbook commitment).
- **Dev#2:** agent-side emitter stages — lock-free ring buffer / fire-and-forget client lib; unknown-version rejection path.
- **Dev#3:** schema registry + validation stages; CI hook so any event-schema PR runs contract tests.
- Expect 3–4 of 10 stages merged. **CA-2 metrics live from the very first PR.**

**Week 3 (P1-W2) — finish 1.1, open 1.2 Streaming + storage (7 stages)**
- **Dev#1:** Redpanda consumer → ClickHouse insert pipeline stages.
- **Dev#2:** ClickHouse table schemas + materialized views (per-agent, per-intent rollups).
- **Dev#3:** remaining 1.1 stages → joins 1.2 (retention, replay tooling).
- Exit: 1.1 fully merged (10/10); 1.2 ≈ half. *Reality check vs. the original 6-week M1 of the unpatched schedule happens here: if <8 stages total merged by Friday, flag at demo — do not silently absorb.*

**Week 4 (P1-W3) — finish 1.2, open 1.3 Observability surface (7 stages)**
- **Dev#1:** Grafana dashboard stages (system health, pipeline lag).
- **Dev#2:** **1.3.4 cost & cache-efficiency dashboards** — per-agent cost trends, prefix-cache hit rate, the 10% WoW decline alert, **plus CA-2 reviewer-health panels**.
- **Dev#3:** Metabase analytical views + remaining 1.2/1.3 stages.

**Week 5 (P1-W4) — close 1.3; open 1.4 ∥ 1.7 (the parallel pair)**
- **Dev#1 → SG 1.4:** **1.4.1 LiteLLM proxy deployment** (Anthropic primary, Vertex fallback, Vault keys, Keycloak JWT, health checks, e2e verified call).
- **Dev#2 → SG 1.7:** **1.7.4 Filesystem MCP server — the calibration stage, shipped FIRST.** Lessons → MCP styleguide *before any other 1.7 stage starts*. This gate is hard.
- **Dev#3:** closes any 1.3 stragglers; prepares 1.7.5/1.7.6 (web search, docs fetch) to start the moment the styleguide lands.

**Week 6 (P1-W5) — 1.4 closes; 1.7 fans out**
- **Dev#1:** **1.4.2 gateway wrapper** (~500 LOC: agent-aware routing, attribution to `(agent_class, agent_instance, intent_id, cell_pool)`, per-minute token-burst limits, telemetry per call) — **G3's `caps.yaml` becomes enforced config here.** CTO reviews this PR personally.
- **Dev#2:** 1.7.5 + 1.7.6 in parallel (S-sized), then 1.7.2 Git MCP.
- **Dev#3:** 1.7.3 GitHub MCP (per-agent scope from Keycloak identity, Vault tokens).

**Week 7 (P1-W6) — 1.7.1 sandbox; SG 1.5 opens**
- **Dev#2:** **1.7.1 Sandbox MCP server** (L — Provider Interface + Docker backend, resource limits, MCP error semantics). The largest single stage in Phase 1; pair with Dev#1 if it threatens the week.
- **Dev#1:** **1.5.1 Agent base class** — prerequisites 1.4 + 1.7 now satisfied per dev_schedule_patch Change 4; MCP client + gateway wrapper + telemetry integration, allowlist from per-agent YAML. CTO reviews.
- **Dev#3:** first v1 agent stages from SG 1.5 (10 stages) — engineering-manager and backend-agent first.

**Week 8 (P1-W7) — SG 1.5 completes; SG 1.6 First product opens**
- **Dev#1:** remaining 1.5 agents (frontend, database, DevOps agents on the base class).
- **Dev#2 + Dev#3:** **SG 1.6** — the G4-decided first product, built *by the v1 agent set through the full loop*: intent → agents → verification gate → PR → human gate → merge. This is the program's first true Revolutionize-builds-something event.
- Mid-week: **Claude authors the Phase 1 exit-gate verification prompt**; Maymun + CTO dry-run the gate Friday.

**Week 9 (P1-W8) — 1.6 completes; PHASE 1 EXIT GATE (Friday)**
- All devs: 1.6 closure, defect burn-down, lessons.md sweep, Pattern Library consolidation into the MCP/agent styleguides.
- **Friday — Phase 1 exit gate.** The A7 contract's 5 items (reconcile exact wording against the contract doc — it is canonical) plus the CA additions:

**Canonical five — adopted verbatim from `07_revolutionize_schedule.html` (reconciled 2026-06-11; all five must hold):**

| # | Exit item (canonical wording) | Evidence |
|---|---|---|
| X1 | Telemetry flows end-to-end and is queryable | Live trace of one 1.6 agent run: action → event → Redpanda → ClickHouse → query |
| X2 | The LiteLLM gateway routes with per-agent cost attribution | Telemetry shows zero direct-to-provider calls; cost attributed to `(agent_class, agent_instance, intent_id, cell_pool)` |
| X3 | MCP servers enforce the capability allowlist at boot | Allowlist-violation rejection demo |
| X4 | v1 agents ship human-reviewed PRs through the verification gate | Merged 1.6 PRs + gate records |
| X5 | The first product is live in production | Production URL + telemetry from real traffic |

**Added by amendment (supplement the canonical five, do not replace them):**

| # | Exit item | Evidence |
|---|---|---|
| +A1 (CA-2) | Cost, prefix-cache and reviewer-health dashboards populated with ≥ 4 weeks history; per-agent cap enforcement demonstrated (a cap actually blocking, per CA-7) | Dashboard review + blocked-call demo |
| +A2 (CA-4) | Conductor rotation complete: 6/6 engineers ≥ 3 conducted stages | Conductor log |
| +A3 | Phase 2 just-in-time decomposition drafted; **3+3→1+5 evaluation held** — A7 trigger (i) is exactly this gate going green; trigger (ii) is the CWF velocity check | Decision in governance log |

> **Reconciliation record (2026-06-11):** v1 of this plan drifted from the canonical schedule in two places — its X2 was an insertion (moved to +A1) and its X5 lacked "live in production" (restored). The signed A7 contract (`docs/contracts/resource_allocation_v1.md`) governs the transition-trigger wording; if it differs from +A3, the contract wins.

### Takım-2 parallel lane (milestone grain — own detailed plan lives in the EAIP schedule)

| Weeks | T2 focus | Demo commitments |
|---|---|---|
| 2 | Walking skeleton: WhatsApp test webhook → Channel Gateway → LangGraph stub → LiteLLM proxy → mock LLM → echo → OTel → ClickHouse → Grafana (per C1 design) | Fri W2: WhatsApp echo round-trip visible end to end |
| 3–5 | M1 Platform Core completion (Kong production config, auth flows, tenancy model, real LLM behind the proxy) | Weekly Friday demos; M1 close ≈ end of Week 5 |
| 6–7 | M2: Web Asistan (overlapping Core per EAIP schedule) — also the default G4 first-product, creating a natural T1/T2 interface at SG 1.6 | Web Asistan slice live |
| 8–9 | **CWF v1 (Kale) begins — M3 of the EAIP schedule (M3–M5 window)** | CWF skeleton against Kale requirements |
| Sep–Nov | CWF v1 build + Kale UAT (M4–M5) — reinforced to 5 engineers if the 1+5 transition fires at Phase 1 exit | — |
| Dec | **Kale go-live — hard deadline** with Nov UAT buffer in front of it | — |

**Standing weekly rhythm (both teams, from Week 2):** Monday 30-min standup (blockers only) · Friday demo (working software, both lanes) · Friday gate-metric review (CA-2 panel, 10 min) · lessons.md per merged stage, three AUTHORED-BY sections, no exceptions.

**Roles throughout:** **Maymun** — sponsor, gate approvals, G-item ownership, conducts nothing but unblocks everything. **CTO** — Tech Lead/Program Leader, architecture-bearing PR reviews, runbook/exit-gate owner, write-up feedback. **Claude** — sole stage-prompt author (single-author invariant), Pattern Library curator, exit-gate prompt author, retros. **AG** — executor, one gated stage at a time, never merges unprompted.

---

# PART IV — Answer to your (B): a cleaner model than pure week-by-week assignment

Your described model (Dev#1 does X this week, Dev#2 does Y in parallel) is right for **Phase 0**, where work is infrastructure with fixed owners and real sequencing — the runbook already encodes it and Part III Week 0–1 just puts it on a calendar.

For **Phase 1 stage execution** I recommend — and Part III is written this way — a **two-level hybrid**:

1. **Lane plan at week grain (what I gave you above):** which stage *group* is open, what the cadence target is, who is in which lane, what Friday's demo must show. This is the PM commitment surface — it survives contact with reality.
2. **Pull-based stage assignment inside the week:** the ordered backlog of the open stage group is the queue; each conductor pulls the top stage, WIP limit 1, conducts it to merge, pulls the next. Names bind to stages at pull time, not at plan time.

Why this beats fixed name-to-stage-number weekly assignment: AG stage durations are wildly variable (your own lessons.md history: 30 min to half a day), stages sometimes self-close as no-ops (Pattern #18), and the true constraint is **review capacity, not authoring capacity**. A fixed plan misallocates within two days and generates re-planning overhead; a pull queue self-balances while the week-grain lane plan keeps accountability and demo commitments intact. The one thing pull does *not* decide is sequencing — that stays architect-ordered in the backlog (e.g., 1.7.4 before all other 1.7, hard).

This is also the model that scales into Phase 2+ without redesign: lanes and gates stay, only the backlog contents change.

---

# PART V — Top program risks on this plan (delta to runbook §risk table)

| Risk | Likelihood | Impact | Mitigation in this plan |
|---|---|---|---|
| G4/G5 decisions slip past Week 0 | High | High | Named defaults (Web Asistan widget) + Week 0 Friday deadline + gate blocks Phase 1 |
| Review rubber-stamping as cadence ramps W7–9 | Medium | High | CA-2 metrics from PR #1; CTO audit trigger at <15 min median |
| 1.7.1 Sandbox (L) blows Week 7 | Medium | Medium | Calibration-first ordering de-risks the pattern; Dev#1 pairing fallback; Week 9 buffer |
| Vault HA overrun (carried from runbook) | Medium | Medium | Dev#2's 8h buffer; Cloud SaaS fallback documented |
| T2 velocity drop during T1-heavy weeks | Low | High (CWF) | CA-1 firewall; A7 early-switch trigger (CWF < 2 stages/wk) monitored weekly from Week 2 |
| 6/6 conductor target eats delivery time | Medium | Medium | Rotation capped at 1 cross-train stage/week; T2 reps accrue in their own lane |

---

*End of program plan v1. On approval: Claude regenerates the charter amendments section for `08_leadership_charter_bilingual.html` (bilingual pass) and reconciles X1–X5 wording against the canonical A7 contract doc.*
