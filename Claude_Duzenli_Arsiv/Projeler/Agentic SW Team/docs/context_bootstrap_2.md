# Context Bootstrap — CWF Delivery + Revolutionize v0.5 Program

### 0. NEXT-SESSION LOADER PRIMER

You are a senior full-stack architect + AI agent expert resuming work w/ ARDICTECH on the CWF delivery + Revolutionize v0.5 program. Read this doc as authoritative state, do not re-explain, resume from §7 unless redirected.

---

### 1. CORE SEED & STATE

- **Objective:** Deliver CWF (Chat With Factory) to Kale Seramik by Dec 2026 *while* the 6-senior-dev team learns agentic dev *and* builds Revolutionize v0.5 (internal AI dev platform) — three folds converge into one loop, same patterns practiced twice (customer + internal).
- **Current State:** Week 1 starter kit produced + validated. 16 files in `revolutionize_v0_5_week1/`. 2 working Python tools (Stage Generator, Eval Framework) + 1 workshop doc + top-level entry point (README + `setup.sh` + `requirements.txt`). `setup.sh` tested: passes core checks w/o API key, full pass w/ key. Pre-June-1; team has not yet started.
- **Operational Env:** Team on Mac/Linux (no Windows). Python 3.10+. Single dep: `anthropic>=0.40.0`. Default model `claude-sonnet-4-6` (Stage Generator), `claude-haiku-4-5-20251001` (LLM judge). Dual execution surface: Antigravity IDE (stable, CWF-critical) + Antigravity 2.0 desktop/SDK (trial, non-prod from Week 2) + Claude Code (fallback).
- **Identifiers:**
  - Owner: Maymun, ARDICTECH A.Ş., Istanbul
  - Tech Lead / Program Owner: CTO
  - Team: 6 senior devs (IoT-Ignite builders) + CTO
  - Customer: Kale Seramik (first CWF tenant)
  - Program window: 2026-06-01 → 2026-12 (Kale cutover); v0.5 complete end Month 7
  - Deliverable root: `/mnt/user-data/outputs/revolutionize_v0_5_week1/`
  - Target git repo (suggested): `git@github.com:maymun207/revolutionize.git`
  - Env var: `ANTHROPIC_API_KEY` (shell-loaded, never in committed `.env*`)
  - Pinned source docs: *EAI Platform Discussion* (CWF arch spec, 10 layers, MariaDB Galera, Keycloak, NiFi); *Revolutionize - True SW Team* (dev methodology, operator-not-typist model, stage backlog)

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**Program convergence:**
```
Patterns ─┬→ CWF (customer)
          └→ Revolutionize v0.5 (internal)
        same loop, twice
```

**Revolutionize v0.5 loop (4 components; 2 built, 2 future):**
```
Stage request (md)
  → [Stage Generator]✅ ── (Pattern Library v0.5 M3, retrieves top-N)
  → tool-agnostic prompt
  → Execution surface adapter {Antigravity IDE | Antigravity 2.0 | Claude Code}
  → diff + Artifacts
  → [Verifier]🔜 (M4-5, independent of surface, NOT trust self-reported Artifacts)
  → integrate → archive to Pattern Library
  → [Stage Backlog]🔜 (M6-7, state machine wraps loop)
```

**Channel Adapter Pattern applied to dev tooling:** Revolutionize core = tool-agnostic. Antigravity = swappable execution surface (thin adapter), not foundation. Mirror of CWF Layer 10 (CWF independent of WhatsApp/Teams/Web).

**Six agentic patterns taught Week 1:** Prompt Chaining | Routing | Parallelization | Orchestrator-Workers | Evaluator-Optimizer | Agent. Decision tree: single prompt → chain → route → parallelize → eval-opt → orch-workers → agent (only when truly dynamic).

**File map:**
```
revolutionize_v0_5_week1/
├── README.md                        * entry point
├── setup.sh                         * one-command verify
├── requirements.txt                 (anthropic>=0.40.0)
├── .gitignore                       (excl __pycache__, outputs/, .env*, .DS_Store)
├── 01_workshop_facilitator_guide.md * 90-min June-1 kickoff script
├── stage_generator/
│   ├── README.md
│   ├── stage_generator.py           (~250 LOC, thin wrapper)
│   ├── prompts/system_prompt.md     * "brain" — all logic lives here
│   └── example/{example_stage_request.md, run_example.sh}
└── eval_framework/
    ├── README.md
    ├── eval_runner.py               (~270 LOC + 6 built-in scorers)
    ├── llm_judge.py                 (Haiku-as-judge, hard-fail on must_contain/must_not_contain)
    └── examples/{example_subject.py, example_oee_evals.jsonl, run_example.sh}
```

**Built-in scorers:** `exact_match` | `contains_all` | `contains_any` | `regex_match` | `json_keys_present` | `numeric_within` | `llm_judge`.

**Stage request fields:** `Stage:`, `Stage ID:`, `Target surface:` (opt, `{any|antigravity-ide|antigravity-2.0|claude-code}`), Goal, Architecture context, Scope, Out of scope, Files, Constraints, Verification.

**Generated prompt sections (in order, all required except *):** Context | Task | Files (Read/Create/Modify) | Acceptance criteria (checkbox) | Constraints | Verification (bash + manual) | Out of scope | *Execution notes (only if `Target surface ≠ any`).

---

### 3. DOMAIN DICTIONARY & PROJECT GLOSSARY

- `CWF`: Chat With Factory — conversational AI over factory data (MES/ArMES/SOPs), first tenant Kale, multi-tenant from-day-one-shaped-but-Kale-only-deployed.
- `Revolutionize v0.5`: Internal AI dev platform — 4 components {Stage Generator, Verifier, Pattern Library, Stage Backlog}. NOT v2 (vision engine, speculation orch, empathy engine — those are 2027).
- `EAIP`: Enterprise AI Platform — 10-layer unified arch, MariaDB Galera primary DB, Keycloak auth, NiFi orchestrator. CWF independent of ArMES.
- `Stage`: 1 stage = 1 detailed prompt = 1 PR = 2-8 hrs of agent work. XL → must decompose.
- `Stage Generator`: Transforms human stage request (md) → execution-ready, surface-agnostic prompt. v0 = single Python script + system prompt + Claude API call.
- `Verifier`: M4-5 component. Reads diff + spec, returns {PASSED|PARTIAL|BLOCKED}. Independent of execution surface. Antigravity 2.0 Artifacts are INPUT not PROOF.
- `Pattern Library`: M3 component. Archive of successful stage prompts, embedding-retrieval, top-N injected into Stage Generator user msg.
- `Stage Backlog`: M6-7 component. Kanban-shape state machine {queued, in-flight, blocked, verified, merged} holding stage spec + generated prompt + Antigravity output + verification report.
- `Conductor / Operator`: Senior engineer's role — directs execution surface, doesn't type code. From *Revolutionize - True SW Team*.
- `Execution surface`: {Antigravity IDE, Antigravity 2.0 desktop/SDK, Claude Code}. Stage Generator output is surface-agnostic; only optional `Execution notes` section tailors per surface.
- `Artifact (AG 2.0)`: AG 2.0's self-reported plan/diff/screenshots/test-results. Useful as input to Verifier, NOT sufficient evidence (memory rule).
- `Dual-wield`: AG 2.0 design — IDE for code, 2.0 desktop for orchestration. Used together.
- `Three folds`: (a) learn agentic dev, (b) build Revolutionize v0.5, (c) deliver CWF. Same loop, different views.
- `Channel Adapter Pattern`: EAIP Layer 10 — core independent of channel. Now applied to dev tooling.
- `Eval set`: Frozen JSONL of {id, input, expected, scorer, pass_threshold, metadata}. Release gate for every CWF subsystem + every Revolutionize component.
- `LLM-as-judge`: Haiku 4.5 scoring natural-language outputs against rubric. Hard-fail pre-checks on must_contain/must_not_contain/length BEFORE API call (cost discipline). Threshold typically 0.7.

---

### 4. CRITICAL DECISIONS & RATIONALES

- **Apprenticeship inside the real build, no toy projects** → 6 senior IoT-Ignite devs don't need foundations sprint; CWF subsystems map to canonical agentic patterns (Tool Use → Routing → Orch-Workers → Eval-Opt). (rejected: 4-week immersion training because team can't pause Kale delivery)
- **Workflows before agents, raw API before frameworks (Months 1-3)** → Frameworks too early = engineers learn abstractions not patterns. LangGraph introduced M4 only when state mgmt demands it.
- **CWF-critical work on stable Antigravity IDE until ~M3** → AG 2.0 launched w/ known bugs (source control gaps, namespace collisions, CDN 404s — though Windows-specific so partial relief). Never bind contractual delivery to brand-new platform users call broken.
- **AG 2.0 trialed on non-production from Week 2** → Learn parallel subagents, scheduled tasks, SDK without risking Kale. Team Mac/Linux ⇒ Windows bugs N/A.
- **Stand on own feet + use 2.0 when helpful (Channel Adapter Pattern)** → Revolutionize core tool-agnostic; AG 2.0 = swappable adapter. Mirrors Maymun's "Colab is dependency, ArMES is not" positioning vs Kale. (rejected: build Revolutionize *on* AG 2.0 SDK because IP story collapses + Google roadmap risk + learning goal (a) lost)
- **System prompt is the logic, Python is a thin wrapper** → Fixes to generator behavior go in `system_prompt.md`, NOT code. Code re-reads md each call.
- **Stage Generator output surface-agnostic + optional `Target surface:` field** → Moving stages between surfaces = 1-line change, not rewrite. Only "Execution notes" section is tailored.
- **Verifier is independent + does NOT trust AG 2.0 Artifacts as proof** → Memory rule: "self-reported phase complete is not sufficient evidence." Cross-phase verification.
- **Default Sonnet, escalate Opus only when cost-of-wrong > cost-delta** → Stage Generator on Sonnet 4.6 (`claude-sonnet-4-6`). Haiku 4.5 (`claude-haiku-4-5-20251001`) for LLM-judge (cheap, fast, sufficient).
- **Evals as release gates, frozen JSONL** → No CWF subsystem ships w/o eval set. Pass rate is a number, tracked over time.
- **Pattern Library retrieval deferred to M3** → v0 `--patterns` flag accepted, ignored. Archive raw md only at M2.
- **No surface adapter automation in v0** → Operator pastes manually. Build adapter only when manual friction proves real. "Don't build before friction is real."
- **English for code/specs/evals/reading; Turkish for whiteboards/internal reviews** → Canonical material EN-only; bilingual team.
- **Monday 09:00 (briefing) + Friday 15:00 (review) recurring 16 weeks** → Non-negotiable cadence. The week skipped = team stops learning.

---

### 5. CONSTRAINTS & INVARIANTS

**Operating Rules (verbatim in every Stage Generator output, embedded in system prompt):**

1. *Execution agent NEVER touches `.env*` files* — Secrets via `$ENV_VAR_NAME` only. Verify `test -n "$VAR"` and fail BLOCKED if missing, never print value.
2. *Report BLOCKED, NEVER claim false success* — Every prompt ends w/ this instruction. Self-reported "complete" ≠ complete.
3. *Exact identifiers, NEVER substitute* — Supabase refs, GitHub repo names, Vercel project IDs, MariaDB instances, API endpoints. If unclear → `⚠️ CLARIFICATION NEEDED:` + stop.
4. *Cross-phase verification* — Every acceptance criterion maps to runnable check OR stated manual check. Verification section is how next stage proves prior state exists.
5. *No raw secrets in commands/output* — Use `echo -n "$VAR" | sha256sum` for value checks, never print.
6. *Additive over destructive* — Capture clean `git status` before destructive ops.

**Program-level invariants:**
- *CWF delivery has absolute priority* — If anything gives, v0.5 scope gives. Never reverse.
- *Pre-reading enforcement* — If anyone arrives June 1 w/o having read Anthropic *Building Effective Agents*, reschedule the workshop.
- *Pattern Library is sacred* — Every successful stage archived. Every failure post-mortemed.
- *Reading discipline survives deadlines* — Monday + Friday rituals do not skip under pressure.
- *Antigravity 2.0 Artifacts ≠ proof* — Verifier confirms independently against spec.
- *Stage size: XS/S/M/L only* — XL must decompose (system prompt emits SCOPE WARNING).
- *Eval coverage minimum* — ≥5 happy-path + ≥3 edge-case + ≥2 adversarial per set.
- *Prompts versioned in git, code-reviewed like code* — System prompt SHA recorded in every generation's metadata.
- *Single author for prompts* — Quality consistency; one source of truth.
- *Production canaries / shadow mode ≠ compressible* — Calendar-bound activities are 0% compressible vs implementation 50-80%.

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

**Open before June 1 (Maymun + CTO action):**
1. Decide which specific CWF subsystem is Week 2-3 first spike (default: single-turn OEE Q&A per `CWF-001-tool-use-spike`).
2. CTO reads `01_workshop_facilitator_guide.md` end-to-end.
3. May 25: pre-reading email sent to all 6 engineers (template in workshop guide §0).
4. May 29: 15-min check — has everyone started the reading?
5. Stand up GitHub repo + clone access for 6 engineers.

**Open architectural crossroads (deferred to relevant phase):**
- Pattern Library storage: Qdrant vs pgvector vs raw md+grep. Decision at M2.
- Verifier impl: pure Python diff-parser vs LLM-based vs hybrid. Decision at M4.
- Antigravity 2.0 SDK adapter — build or skip? Decision at v0.7 (M4-5), data-driven from Week 2+ trials.
- Framework adoption: LangGraph vs Claude Agent SDK vs continue raw API. Decision at M4 when state mgmt demands.
- Multi-tenancy shape: design seams now, deploy Kale-only. Full multi-tenant rollout when 2nd customer signed.

**Known risk hotspots:**
- Senior engineers' deterministic instincts fighting agentic patterns (HIGH) — addressed in workshop §2.3.
- Rubber-stamp PR review at AG 10× speed (HIGH) — Friday review w/ adversarial challengers.
- Calendar compression illusion — stakeholders pushing "faster" on validation windows (HIGH).
- AG 2.0 platform instability through ~M3 (MEDIUM, Mac/Linux mitigates).
- Cost runaway from poorly-bounded stages (MEDIUM) — XL decomposition rule.
- Prompt drift across team (MEDIUM) — single author (Stage Generator) + versioning.
- Single-point-of-failure on CTO (MEDIUM) — 6 hrs/week minimum first 3 weeks; transition to team after.

**Tech debt (intentional, v0):**
- Stage Generator: no Pattern Library retrieval, no Verifier integration, no web UI, hard-coded model, no cost dashboard, no retry. All deliberate.
- Eval Framework: no CI integration yet, no judge calibration eval set, no production-monitoring integration.

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Maymun + CTO walk through Week 1 starter kit together** — success: CTO can run `bash setup.sh` and gets ALL CHECKS PASSED w/ key.
2. **CTO reads `01_workshop_facilitator_guide.md` end-to-end** — success: CTO can run the 90-min session from memory.
3. **May 25: pre-reading email sent** — success: 6 engineers ack receipt, read Anthropic *Building Effective Agents*.
4. **May 29: pre-reading check-in (15 min)** — success: all 6 confirm started.
5. **Stand up GitHub repo + push starter kit** — success: 6 engineers have clone access.
6. **June 1 09:00: CTO runs workshop** — success: team draws three-folds + six-patterns from memory; six operating rules + execution surface policy on whiteboard; Week 1 deliverables assigned.
7. **June 1 afternoon: engineers clone repo + run `setup.sh`** — success: all 6 see ALL CHECKS PASSED on their machines.
8. **June 2-5 Week 1**: every engineer runs Anthropic API hello-world; team picks Week 2-3 CWF subsystem (default: single-turn OEE Q&A); 1-2 volunteers install AG 2.0 desktop for non-prod trial; Friday 15:00 first review.
9. **Week 2-3**: first real CWF stage request written → Stage Generator → AG IDE execution → review → integration → first eval set frozen.
10. **Month 2**: Pattern Library v0 (archive raw md). Eval CI integration. Stage Generator eval set frozen (10-15 examples).

**Default user trigger for next session:** "Claude, give me [the May 25 pre-reading email | the 16-week calendar template | the real Week 2-3 CWF spike stage request | …]" → Claude produces requested artifact, follows existing conventions.

---

### 8. OPEN QUESTIONS FOR USER

- Has Maymun walked CTO through the starter kit yet? Has `setup.sh` been run on real machine?
- Is the GitHub repo created? At which URL?
- Has the pre-reading email gone out (target: May 25)?
- Has the team picked which CWF subsystem is Week 2-3 first spike, or sticking w/ default single-turn OEE Q&A?
- Any changes to the team composition since (6 engineers + CTO confirmed)?
- Which next-deliverable order does Maymun want — (a) May 25 pre-reading email + 16-week calendar template, (b) real Week 2-3 CWF stage request, (c) both sequentially?
- Has Maymun shared the EAIP arch spec + Revolutionize methodology doc w/ all 6 engineers, or only CTO so far?
- Any update on Kale contract signature status / payment milestones that would shift Dec 2026 cutover?

---

### 9. OPERATIONAL DIRECTIVE FOR NEW SESSION

Do not expand or re-explain the compressed doc unless asked. Treat this as state. Resume from §7.
