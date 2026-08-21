# Context Bootstrap — ARDICTECH Virtual Software Engineering Organisation

### 0. NEXT-SESSION LOADER PRIMER

You are a senior full-stack architect resuming work on ARDICTECH's autonomous multi-agent software engineering platform. Read this doc as authoritative project state, do not re-explain its contents, and continue from §7 unless I redirect.

---

### 1. CORE SEED & STATE

- **Objective:** Build a Virtual Software Engineering Organisation — autonomous multi-agent platform that produces production software at senior-team quality, evolving v1 (human-team simulation) → v2 (cellular intelligence w/ speculation + formal verif + self-improvement).
- **Current State:** Pre-implementation. Architecture spec + diagrams + dev schedule + Gantt all produced. Team handoff package complete. Next action = produce first Antigravity stage prompt (Stage 1.1.1) OR resolve open questions before Phase 1 kickoff.
- **Operational Env:**
  - Dev model: AI-assisted via **Google Antigravity** (NOT human coding)
  - Models: Claude Opus 4.6, Claude Sonnet 4.6, Gemini 3.1 Pro
  - Target deployment: Hybrid (self-hosted + cloud SaaS), aligns w/ existing ARDICTECH platform (PilarOS, ArMES, IoT-Ignite, ArAI, CWF)
  - Existing infra to reuse: MariaDB Galera, Keycloak, MinIO, ClickHouse (team has expertise)
- **Identifiers:**
  - Owner: Maymun, ARDICTECH A.Ş., Istanbul
  - Deliverables: `/mnt/user-data/outputs/virtual_software_team_architecture.docx`, `virtual_software_team_architecture_diagrams.pdf`, `development_schedule_antigravity.docx`, `development_gantt_chart.pdf`
  - Project files (read-only): `/mnt/project/{Architecture_Review.pdf, Bootstrapping_a_revolutionary_platform.pdf, virtual_software_team_architecture_diagrams.pdf, development_schedule_antigravity.pdf}`

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**5 primary systems + 3 cross-cutting layers, 3 channels only:**

```
Vision Engine → [intent_stream] → Execution Swarm → [verif_gate] → Verification Mesh
                                                                          ↓
Production ← Reality Loop ← [reality_feed] ←──────────────────────────────┘
                ↓
       Meta-cognition (observes all)

Cross-cutting: Measurement Foundation | Living Knowledge | Tool Integration
```

**Telemetry pipeline (6 layers, agent never waits):**
| Layer | Tech | Deploy |
|---|---|---|
| 1. Emission | OpenTelemetry SDK + agent wrapper | in-process |
| 2. Ring buffer | Lock-free MPSC, 10MB, mmap | in-process |
| 3. Sidecar batcher | Rust/Go, zstd-3, 1000ev/5s | systemd/K8s |
| 4. Streaming | **Redpanda** 3-node (NOT Kafka) | self-host |
| 5. Storage | ClickHouse 3-node (hot 30d) + S3/MinIO (cold 365d) + Tempo (traces) | self-host |
| 6. Viz | Grafana (ops) + Metabase (analytical) + Tempo UI | self-host |

**LLM routing:**
- Opus 4.7 → EM agent, Architect, Code reviewer, Security, Founder agent, Intent synth, Spec author
- Sonnet 4.6 → execution cells, test gen, perf, reality observer, empathy personas (DEFAULT)
- Haiku 4.5 → PO agent, reporter, simple transformations
- Gemini 3.1 Pro → fallback + long-context

**Self-hosted:** Redpanda, ClickHouse, Tempo, Grafana, Metabase, Qdrant, PostgreSQL, MariaDB Galera ✓, Keycloak ✓, MinIO ✓, Vault
**Cloud SaaS:** Anthropic API, Vertex AI, PagerDuty, Sentry, GitHub Enterprise ✓, LangSmith (optional)

**Volume at medium scale (15 agents × 60ev/min × 4KB):** 360ev/s sustained, 31M ev/day, 47GB ClickHouse 30d, ~$800-1500/mo self-host vs $25-40K/mo SaaS.

---

### 3. DOMAIN DICTIONARY & PROJECT GLOSSARY

- `v1`: Conservative multi-agent system simulating human team roles (PM, EM, Architect, FE, BE, DB, DevOps, Reviewer, Security agents). Build first.
- `v2`: Cellular intelligence — generalist full-stack cells + speculation + formal verif + self-improvement + meta-cognition. Emerges incrementally on v1.
- `Cell`: v2 generalist agent owning intent end-to-end. Follows OpenClaw 7-stage loop {normalize, route, assemble, infer, ReAct, load skills, persist}.
- `Intent`: Unit of "what to build" from Vision Engine. Replaces static PRDs. Immutable, replayable, prioritised, w/ Gherkin acceptance criteria.
- `Speculation`: v2 pattern — N parallel cells per intent, Verification Mesh picks winner. Most important v1→v2 evolution.
- `Shadow mode`: New capability runs alongside production silently, outputs compared before promotion. Calendar-bound (cannot compress).
- `Stage`: Unit of dev work. 1 stage = 1 Antigravity prompt = 1 PR. Sized XS/S/M/L (XL must decompose).
- `SOUL.md`: Founder's taste model file (from Hermes pattern). Persona + values + decision principles. Hand-curated.
- `MEMORY.md / USER.md`: Two-file split for long-term memory (Hermes pattern). Project context vs preferences. Pointer-indexes, not raw dumps.
- `Skill`: Markdown + YAML frontmatter file describing reusable how-to. Hermes format. Replaces vague "pattern library."
- `Living Knowledge`: Active intelligence layer — skills + ADRs + GraphRAG codebase graph + MEMORY.md + SOUL.md + pattern library + prompt versions.
- `Verification Mesh`: Multi-dim correctness proof. {Spec author, Verifier, Code reviewer, Test gen, Security, Red team, Performance, Taste eval}.
- `Reality Loop`: Closes production → vision feedback. Errors→verification properties, friction→intents, regressions→priority intents.
- `Meta-cognition`: Self-observation + architecture proposer + DSPy prompt evolver + parameter tuner. Activates last (Phase 8).
- `Conductor`: Senior engineer's role in this model — directs Antigravity, doesn't type code.
- `Calendar-bound vs Implementation-bound`: Calendar = real time required (validation, telemetry maturity, learning curves) → DOES NOT COMPRESS. Implementation = AI can speed up 50-80%.

---

### 4. CRITICAL DECISIONS & RATIONALES

- **AI-assisted dev w/ Antigravity** (NOT human coding) → Maymun's explicit constraint. Changes unit of work, role, bottleneck. (rejected: traditional dev because team is too small + AI now competitive)
- **v1 then v2, not v2 direct** → De-risks. v1 buildable in 6 months w/ commodity tooling. v2 emerges on substrate. (rejected: leap-to-v2 because most agentic enterprises fail this way)
- **Telemetry-first (Pillar 1 of measurement foundation)** → Every successful AI-first company invested in measurement before scaling capability. Substrate for all downstream decisions.
- **Redpanda > Apache Kafka** → Single binary, no Zookeeper, Kafka-protocol compatible, lower ops burden. (rejected: Kafka because team lacks deep Kafka expertise)
- **Self-host ClickHouse** → Team already has expertise; managed = 10× cost at scale. (rejected: ClickHouse Cloud, Datadog/Honeycomb due to per-event pricing — 20-30× more)
- **Hybrid deployment** → Maymun's choice. Forces every component to support both modes from day one. Rules out SaaS-only tooling.
- **Sidecar (separate process) > thread** → Process isolation survives agent crash w/ telemetry. mmap buffer is crash-safe.
- **30-day hot retention in ClickHouse** → Typical query window. Adjustable per compliance.
- **Adopt patterns from OpenClaw + Hermes + OASIS, NOT runtime deps** → Avoid coupling to external project roadmaps. Implement clean versions in our codebase.
- **OpenClaw 7-stage execution loop** → Reference impl for cell execution. Battle-tested.
- **Hermes skills-as-markdown + SOUL.md + MEMORY.md** → Concrete impl of v2 living knowledge. Better than handwaved "pattern library."
- **OASIS (CAMEL-AI) as empathy engine runtime** → Production-grade swarm to 1M agents. Skips months of build.
- **MiroFish emergence philosophy: empathy engine YES, engineering swarm NO** → Emergence is dangerous in engineering (need reproducibility), great for personas.
- **3 channels only {intent_stream, verification_gate, reality_feed}** → Prevents multi-agent chat proliferation failure mode.
- **Cell execution loop adopted from OpenClaw, not invented** → Reproducibility discipline separates production agents from black-box demos.
- **Default Sonnet, escalate to Opus only when cost-of-wrong > cost-delta** → Working rule for both system + Antigravity dev.
- **Stage is unit of work, not story** → 1 stage = 1 prompt = 1 PR.
- **XL stages must decompose** → Higher failure rates, harder review, expensive recovery.
- **Just-in-time prompt generation** → Detailed prompts produced when team is ready to execute (not big-design-upfront), to capture learnings between stages.
- **Verification ≠ compressible** → Engineer reads at 1×, Antigravity produces at 10×. Defense-in-depth verification stack absorbs the asymmetry. THIS IS THE CENTRAL CONSTRAINT.
- **Timeline 12-15 months (not 24)** → Implementation-bound phases compress 50-80%. Calendar-bound phases (validation, maturity) compress 0%.

---

### 5. CONSTRAINTS & INVARIANTS

**MUST-hold rules — never violate:**

- *Agent NEVER waits for telemetry* — emission is fire-and-forget into ring buffer, microseconds latency.
- *PII + secrets NEVER in telemetry* — redaction at emission. Full prompts/completions in separate access-controlled artefact store, referenced by hash only.
- *No agent has production write access by default* — shadow agents = read-only credentials.
- *Capability ALLOWLIST, never denylist* — every agent starts w/ zero capabilities.
- *Secrets via Vault references only* — never raw values in config/prompts/telemetry.
- *Hatched (calendar-bound) Gantt bars DO NOT move* — shadow validation, telemetry maturity, production canaries are real time.
- *Every PR gets 30+ min human review minimum* — anti rubber-stamp rule.
- *No phase skipped to accelerate later phases* — each provides substrate for next.
- *Mandatory ADR citation in every stage prompt* — prevents architectural drift.
- *Schema version in every telemetry event* — pipeline rejects unknown versions, never silent corruption.
- *Cost calculated at emission time* — versioned pricing table, never trust agent to compute own cost.
- *All prompts authored by Claude (single author)* — quality consistency.
- *Prompts version-controlled in `prompts/phase-N/stage-X.Y.Z/{v1.md, v2.md, final.md, lessons.md}`* — institutional learning.
- *Stage definition: 1 stage = 1 detailed prompt = 1 PR* — never combine.
- *Antigravity has zero memory between sessions* — every prompt self-contained.
- *Use existing ARDICTECH infra where it fits* — MariaDB, Keycloak, MinIO, ClickHouse.

**Stage prompt template (§6.1 of dev schedule doc) — fields required:**
goal, prerequisites, context (arch sections quoted inline + ADRs + existing code patterns + libs to use/avoid), detailed task, scope boundaries (what NOT to build), acceptance criteria (concrete + testable), test requirements, style/idiom, edge cases, deliverables list, verification approach, model recommendation, size estimate.

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

**Open before Phase 1 can start (from architecture spec §12.2):**
1. * First product the system will build — clear scope, low business risk, rich production telemetry. UNRESOLVED.
2. * Founder for SOUL.md purposes — anchors taste model. UNRESOLVED.
3. * Quarterly LLM spend budget — shapes routing decisions. UNRESOLVED.
4. * Relationship of new system to existing ARDICTECH platform (extensions vs independent products). UNRESOLVED.
5. * Where team has biggest expertise gaps (likely: formal methods TLA+/Alloy, agent orchestration, multi-tenant security). UNRESOLVED.

**Pre-Phase-1 reading week (3-5 days, NOT OPTIONAL):**
- OpenClaw source (Agent Runner + Lane Queue)
- Hermes Agent source (skills + self-modification)
- OASIS run locally w/ 50-agent example

**Known risk hotspots:**
- Rubber-stamp PR review at AI production speed (HIGH severity)
- Calendar compression illusion — stakeholders push to "go faster" on validation windows (HIGH)
- Prompt quality drift across stages without single-author discipline (MEDIUM)
- Cost runaway from poorly-bounded XL stages (MEDIUM)
- Meta-cognition (Phase 8) needs 12+ months telemetry from Phase 2 onwards — cannot accelerate

**Open architectural crossroads (deferred to relevant phase):**
- Empathy engine — adopt OASIS as service vs reimplement clean. Decision in Phase 2.
- Formal methods scope — TLA+/Alloy on critical paths only vs property-based testing fallback. Decision in Phase 5.
- Zep memory layer — Zep Cloud (SaaS) vs Zep Open Source vs pgvector. Decision in Phase 4.

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Maymun resolves 5 open questions** (§6 list above) — success: written answers for each before Week 1 alignment session.
2. **Team alignment session** (90 min) — walk team through arch spec + diagrams + schedule + Gantt. Capture disagreements as follow-ups. Success: team consensus on model.
3. **Senior engineers do reading week** (3-5 days) — OpenClaw + Hermes + OASIS. Success: 1-page write-up per engineer on patterns observed.
4. **Stand up Antigravity workspace** — model access (Anthropic + Google), Vault integration, repo structure `prompts/phase-N/...`, CI baseline. Success: empty workspace ready to receive Stage 1.1.1.
5. **Generate Stage 1.1.1 prompt** ("Telemetry event schema — Pydantic + TypeScript") via Claude — calibration exercise. Success: full template-compliant prompt produced.
6. **Execute Stage 1.1.1 via Antigravity, review, merge** — success: schema files committed, lessons.md captures observations.
7. **Iterate on prompt template based on Stage 1.1.1 lessons** — success: template v2 promoted to styleguide.
8. **Chain Phase 1 stages** at 3-5/week ramping to 5-10/week — success: all ~40 P1 stages complete + first product live in production.

**Default user trigger for next session:** "Claude, give me the prompt for Stage X.Y.Z — [name]" → Claude produces full template-compliant prompt per dev schedule §6.1.

---

### 8. OPEN QUESTIONS FOR USER

- Which of the 5 unresolved Phase-1 prerequisite questions (§6) have been answered since this session?
- Has team alignment session happened? Any disagreements captured?
- Has reading week happened? Any pattern observations the architecture should adopt?
- Is Antigravity workspace stood up? Repo structure in place?
- Ready to generate Stage 1.1.1 prompt, OR are we still in alignment/reading phase?
- Any architecture changes since last session based on team feedback?

---

### 9. OPERATIONAL DIRECTIVE FOR NEW SESSION

Do not expand or re-explain the compressed doc unless asked. Treat this as state. Resume from §7.
