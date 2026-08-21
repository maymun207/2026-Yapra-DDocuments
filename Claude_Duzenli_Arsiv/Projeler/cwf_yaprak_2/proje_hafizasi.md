# 🧠 Proje Hafızası: cwf_yaprak_2

**Proje ID:** `019f9054-428c-7334-8b40-81abdc8afd35`

---

**Purpose & context**

Maymun is the product owner and lead decision-maker of the CWF→EAIP project (repo: `maymun207/cwf_yaprak`, public). CWF is a governed agentic AI platform connecting to MCP backends ARMES (KB7 ceramic-factory MES, ~141 flat tools) and Apache Superset 6.1 BI gateway, targeting Kale Seramik and eventually a multi-tenant Enterprise Agentic Intelligence Platform (EAIP). A parallel commercial product, Yapra.ai, presents this architecture to the cement/process industry market as the "Governed Cement Agent," with a sales deck and logo assets produced.

**Three-lane workflow (locked):**
- **Architect = Claude** — diagnosis, design, gated phase prompts, RULE-25 fresh-clone reviews; NEVER writes repo files
- **Author/Developer = AG** (Claude Code on AntiGravity) — all repo writes, `--no-ff` merges only, squash banned
- **Operator = Gemini** with Supabase MCP — migrations via `supabase db push` only (never `apply_migration`, ADR-005); schema reads, live verification; fenced: no repo contact, no governed-table writes, never echoes secrets

**Infrastructure constants:**
- Vercel: `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`
- Supabase: `fjbrkimwvtpwoxhziidh`
- Langfuse: self-hosted AWS EC2 `i-030c2b4fadebfa229` (eu-central-1), CloudFront `dl3644f5a7fnn.cloudfront.net`, OTLP/HTTP ingest at `/api/public/otel` (gRPC NOT supported)
- GitHub: `maymun207/cwf_yaprak`

**Project lineage:** CWF→EAIP continues the earlier `cwf_prod` Claude project (real prior architectural history). `EAIP-1` holds platform-level detail. `CWF-DEMO` has NOTHING to do with this project — never raise it. Claude cannot read `cwf_prod` or `EAIP-1` files from inside this project; anything load-bearing must be uploaded as a versioned artifact here.

**Decision style Maymun expects:** committed single-path recommendations (never option menus); diagnosis-first — name the hidden trap before prescribing a fix; push back honestly when sequencing is wrong and hold positions under pressure; never re-raise closed items; finish fully (no demo deferrals, no "later" without explicit sequencing).

**Communication:** Turkish for strategy/decisions, English for technical artifacts, prompts, and code.

---

**Current state**

Session S82 closed with a full handoff package minted: five versioned artifacts (bug bucket v21, open items register v86, rollout plan v2_1, session graph KB v83, bootstrap prompt v83) plus handoff manifest `cwf-handoff-manifest-S82-v1.md` listing all 15 files needed for continuation.

**S82 major outcomes:**
- Eight bugs closed with live production evidence: BUG-020 through BUG-030 (concurrent call burst protection, tool schema parameter guessing, render parity, unit derivation, health truth, gateway result visibility)
- Dual-lane parallel development introduced: AG-1 and AG-2 working simultaneously on non-overlapping file surfaces, Claude orchestrating merge sequencing
- **Critical discovery — conversation poisoning (SUCCESS-ONLY-RECALL-1):** 8/8 pattern where `conv=0` always succeeded and `conv≥1` always failed; the system works in fresh sessions but poisons itself with failure history in continuing conversations. This is **#1 queue priority.**
- **BUG-031 / CHART-CANDIDATE-1:** chart candidate selection broken between structurally different charts with similar names (Superset charts 85 and 94); text search without stemming + no `viz_type` filtering. Queue priority #2.
- New law S82-6 minted: "everything that should be in an architecture must be there from the start, in full detail" — established after minimalist approach cost significant time through circular problems
- False premise discovered in TOOL-EARNED-TRUST phase B: gateway inner-tool schemas were empty, not populated as written
- S82-5 law: "a payload field is not a surface; tests must enter at the parser"

**Current production SHA at S82 close:** `40085d62627d3277fb4cb2cb9251ec2c0296ca7c`, deployment `dpl_J2ioabsEVmrCdAcW2aBXD5uuRFgN`

**Work board (owner-ratified S74, binding):** `cwf-work-board-S74-v1.md` is the BINDING work base — never re-litigated. Register v86+ derives items from this board; new items enter as additions only.

---

**On the horizon**

1. **SUCCESS-ONLY-RECALL-1** (BUG-032) — conversation poisoning fix, first in queue
2. **CHART-CANDIDATE-1** (BUG-031) — chart candidate selection fix, second in queue
3. SOTA measurement rounds per `cwf-sota-definition-v1` — the sole v1 acceptance criterion
4. RAG backend join (Block 2B) — owner's team has an already-built MCP-native RAG service; connection deferred pending A5 completion
5. Multi-agent / width-N governance — exploration document `cwf-width-n-governance-exploration-v1.md` exists; re-entry gated on single-agent SOTA achievement, nothing from that exploration enters any register until then
6. EAIP multi-tenant architecture — parked; named trigger is customer #2 signal or online sales decision
7. Yapra.ai commercial path — productized delivery + governance annuity model (not SaaS); fastest recurring revenue path is converting Kale's Azure migration into a priced contract with annual subscription at go-live; ARMES installed base is lowest-friction channel for second sale

---

**Key learnings & principles**

**Architecture laws (locked, never re-litigate):**
- `empty≠zero` is sacred: real-0=data, missing=gap, empty="no data", non-numeric="not chartable" — survives outage and the render layer
- DB-first/code-floor: runtime SSOT is the governed DB; code reference serves exactly three roles (seed, reset target, outage floor)
- Grounding/trust is deterministic code, never an LLM judge (ADR-001: make a lying backend HARMLESS — contained, attributed, quarantinable — not honest)
- Eval-gate unbypassable (schema→referential→behavioral; "no gate change" = engine + stage order + interpreter byte-identical; additive per-backend dispatch is legitimate)
- C1 LAW: zero writes to `messages` from replay/governance paths
- Backend identity is DATA (a row, not an enum or migration)
- ADR-002: no mode grants repo-write and DB-write simultaneously
- ADR-007: secrets never echoed; silent success paths are correct

**SOTA-1 (owner-legislated S80, BINDING):** The sole acceptance criterion for CWF v1 is the artifact `cwf-sota-definition-v1`. Claude as Architect may NEVER defer, shrink, or re-order-down any item advancing a SOTA criterion. The only retained objection class is "this ordering makes SOTA unprovable," admissible only when naming in writing: (a) which criterion goes unproven, (b) the date it becomes provable, (c) which measurement resolves it. Any deferral missing those three is a SOTA-1 violation. A criterion retires only by evidence, never by convenience. **POSITIVE CONTROL: Claude restates SOTA-1 verbatim in the first message of every session; its absence tells the owner the session booted wrong.**

**Recurrent Architect error pattern (documented across S65–S82):** Writing specifications from documents or mental models rather than reading live artifacts. Standing corrections: citations must be copied from commands run in the same message; claims about production behavior must name a live read or admit it was not done; every phase prompt must carry its own falsifier.

**Test apparatus law (S82-2):** A test apparatus's report is also a claim; every harness must run its own red/green positive control before its output counts as evidence.

**Conversation poisoning pattern (discovered S82):** The system works correctly in fresh sessions but poisons itself with failure history in continuing conversations — discovered by Maymun after the Architect passed it twice. This is not a fringe case; it is 8/8 deterministic.

**S74-1 (owner-mandated):** Any program opened must have a user-eye finish definition and must complete as one piece before any other work begins.

**Key architectural rulings:**
- ADR-009: entity topology must be discovered from the backend, never hand-authored
- ADR-010: a backend declaration is a claim, not a warrant; trust earned from observed behavior per-tool, two-speed enforcement
- ADR-011: write-exclusion rule (CATALOG-WRITE-LOCK)
- ADR-012: four-layer restriction taxonomy — INVARIANT / POLICY / CONFIG / governed content; label lives on the valve at its definition site
- F187: Superset is a data source, not a rendering surface — CWF owns its own viz rendering layer

---

**Approach & patterns**

**SOTA-1 POSITIVE CONTROL:** Restate SOTA-1 verbatim in the first message of every session.

**Session state is NEVER carried in memory.** At the start of every session: read `CLAUDE-PROJECT-INSTRUCTIONS`, latest `cwf-open-items-register-v*`, `CWF-SESSION-GRAPH-KB-v*`, and bootstrap prompt. Treat any commit hash, test count, or open-item status recalled from memory as stale by default. Code in `cwf_yaprak` is ground truth over any summary.

**Phase execution pattern:** bootstrap (fresh clone; verify anchor commit + test count + docVersion + drift gate) → Architect diagnoses, writes design note, then ONE gated versioned phase prompt for AG → AG builds and pushes branch → RULE-25 review (fresh clone, independent recount, byte-pin diffs, grep verification) → GO + verbatim Architect-authored merge message → Operator applies migrations (FENCE-first, G-gates, idempotence probe, verifyGrants) → DOC-FLIP with reseal → session close producing versioned register, KB, and bootstrap artifacts.

**ARCHITECT DOCTRINE v1_1 (binding, owner-mandated S77, updated S78):**
- **D-1 RECON-FIRST:** No phase prompt over unverified live state — thin recon brief first
- **D-2 ONE-RELAY:** One self-contained file per relay, all dependencies embedded
- **D-3 COMPUTED-NOT-ASSERTED:** Every value from a named in-session command; hand-transcription banned
- **D-4 CEREMONY-ZERO:** Owner manual work only for secrets / real data-changing consent / hand-witness; provable-zero ops get machine gates (`--expect-zero`)
- **D-5 GATE-SELF-TEST:** Every authored rule tested both directions including innocent-case probe
- **D-6 TOUCH-BUDGET:** Max 3 owner touches per phase; 4th = named incident
- **D-7:** Pre-send checklist mandatory before every relay-carrying message; applies to EVERY message containing any owner-facing item; question 6 enforces SEQUENTIAL (if owner asks for one step, deliver exactly one step)

Read the doctrine file every session.

**WAIT CONTRACT law (S74-3/S74-4, owner-mandated):** Claude's only window is what Maymun pastes. (1) Any next step depending on another lane's output is NEVER "action items: yok" — the relay is a named action item. (2) Every waiting state must state: exactly WHAT output ends it, that the owner must PASTE it, an EXPIRY with a default probe, and any independent SENSOR Claude will read instead of assuming. (3) On every relayed lane output, check what question it leaves UNANSWERED — a gap is an action item, never assumed "still in progress."

**"YOUR ACTION ITEMS" rule:** Any response containing a manual action for Maymun must surface it as an explicit bullet list, never buried in prose. If there are zero manual actions, say so explicitly.

**Automation-first (highest-priority standing directive):** NEVER offload manual work to Maymun — build the automation or read the data with available tools first. Any manual step an operation requires is a missing-tooling BUG. Tests must be observable — Claude reads Vercel runtime logs itself.

**Premise error discipline:** All Architect premise errors are logged by session with a root cause. Maymun's memory of prior session decisions has repeatedly been more reliable than Claude's — treat Maymun's corrections as ground truth and log the error explicitly.

**Security standing rules:**
- Every new secret or owner-CRUD table gets an in-phase `verifyGrants` probe row plus a CI coverage test
- All-grantees revoke pattern: revoke from public, anon AND authenticated explicitly, never PUBLIC only
- `apiKeyEnv` resolution restricted to `^MCP_[A-Z0-9_]+$`
- HARDEN-FN-PROBE-1: three-way classification (42501=PASS, no-error=LEAK, PGRST202/other=INCONCLUSIVE-fail; never silent-green)
- Secrets are env-only; structure→code, data→gated admin UI, secret→env

**Process rules (locked):**
- RULE-25: starts at a fresh clone + `git rev-parse origin/master` — never trust a report, never `git stash`; merge isn't done until pushed and remote hash reported
- RULE-26: nothing clips at 1280/1024
- RULE-1/23/24/27/28 and S30–S35 series: see project instructions
- Stochastic verification: a small clean sample is NOT proof — N-rep plus the specific observation
- Versioning: every artifact carries its version in filename AND inside; never silently overwrite

**S79+:** Architect lane runs on Claude Opus 5 (Maymun's decision, S78).

---

**Tools & resources**

**Vercel MCP patterns:**
- Wide log windows time out — scope to a `deploymentId` with ≤30 min window for detail reads
- `group_by=requestPath` is the fast path and survives 12h
- Query with ONE distinctive inner content word, never a phrase
- `list_deployments` with `target=production`, `state=READY`, matching SHA = authoritative deploy confirmation
- Reliable log tokens: `LLMFinish`, `TurnEfficiency`, `BurstGuard`, `get_chart_data`, `ToolRoute`, `BackendHealth`, `MemoryForget`, `CatalogSync`
- Endpoints with no `console.log` produce no output even when they ran
- `api.github.com` is rate-limited (403) from Architect sandbox — CI verification folded into AG's GO block as blocking STEP 1

**Supabase / Operator patterns:**
- `supabase db push` is the sole authorized migration method
- PostgREST silently caps at 1000 rows — any large table read must page or use SQL-side aggregation
- Security verification requires both `information_schema.column_privileges` AND `pg_attribute.attacl` together; for EXECUTE grant verification read `pg_proc.proacl`, not `information_schema` alone
- Operator relay pattern: FENCE-first prompt, G-gates, idempotence probe, verifyGrants, positive control

**Vitest:** `process.env.VITEST === 'true'`; include covers `src/**`, `shared/**`, `api/**/__tests__` but NOT `scripts/**` — script-layer tests go in `api/cwf/__tests__`

**Key project documents (live versions govern):** `CLAUDE-PROJECT-INSTRUCTIONS`, `cwf-open-items-register-v*`, `CWF-SESSION-GRAPH-KB-v*`, bootstrap prompt, `cwf-master-rollout-plan-v1`, `cwf-work-board-S74-v1.md`, `cwf-sota-definition-v1`, `cwf-architect-doctrine-v1_1`, `cwf-handoff-manifest-S82-v1.md`
