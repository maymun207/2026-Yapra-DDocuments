# 🧠 Proje Hafızası: Agentic SW Team

**Proje ID:** `019e71d6-a72b-7225-8015-b20a585a8f24`

---

**Purpose & context**

Maymun is the founder/CEO of ARDICTECH A.Ş. (Istanbul), running a dual-platform engineering program with a hard December 2026 delivery deadline for the CWF (Chat With Factory) product to Kale Seramik as the first tenant. The program has three reinforcing objectives: teaching the team agentic development, building Revolutionize (an autonomous agent platform), and delivering CWF via EAIP (the multi-tenant product platform). CWF delivery is the absolute non-negotiable priority; Revolutionize can slip, CWF cannot.

The two platforms have a deliberate bridge relationship: Revolutionize ships verified PRs into EAIP, and EAIP production telemetry feeds back as the reality signal guiding what Revolutionize builds next. The sovereign shared substrate includes Keycloak, Vault, MariaDB Galera, ClickHouse, Redpanda, MinIO, Kubernetes, Qdrant, and PostgreSQL.

**Key roles and people:**
- Maymun: Conductor/CEO — queues prompts, runs operator gate checks, approves merges; never types code directly
- CTO: simultaneously Tech Lead and Program Leader (single person holding both roles)
- AG (Antigravity): autonomous agent executor handling all git/GitHub/filesystem/deploy operations
- Claude: sole author of all stage prompts (strict single-author invariant)
- Takım-1 and Takım-2: six senior engineers (IoT-Ignite veterans) in a 3+3 structure transitioning to 1+5 when Revolutionize Phase 1 hits its exit gate
- Kale Seramik: first CWF customer; Türk Re: second customer (insurance triage)

**Two repositories:**
- Content repo: `agbuilder-platform/revolutionize`
- App repo: `maymun207/TheBluePrint23` (Next.js 15/React 19/TypeScript/Tailwind, deployed on Vercel at `theblueprint23.dev`)

**Current state**

The "Revolutionize" program (also called ARDIÇ/AG in earlier sessions) is actively in motion. TheBluePrint23 is live and functioning as a program command center, with content tabs rendering canonical HTML documents via a `DocumentFrame`/`ssoFrame` embed pattern (eliminating the previous drift defect where the same content lived in three independent places).

Recently completed:
- Stage S2h: deployed a bilingual (EN/TR) Big Picture canonical page with interactive SVGs, language toggle, AG-bypass highlight toggle, clickable diagram nodes, status badges, and open decisions panel — both PRs (#12 content, #30 app) merged successfully
- Manifested a comprehensive bilingual `big_picture_bilingual.html` (with sha256 hash-verified delivery)
- Fixed a manifest path bug (`reading_week/` → `reading_week_writeups/`)
- Resolved two critical deviations caught at Step 0: app fetches from `agbuilder-platform/revolutionize` (not `maymun207/revolutionize`), and the Big Picture surface uses `ssoFrame('big')` not a bridge document frame
- Corrected governance artifact placement (prompt files belong in app repo under lowercase `prompts/v0/`, not content repo under capital-P `Prompts/`)

Active open items:
- Four open architectural decisions documented in the Big Picture panel (conductor-vs-hands-on model, monorepo vs split repo, developer count, wrapper `/v1/model/info` as hard acceptance criterion for Stage 1.4.2)
- Pattern Library ID assignment pending INDEX.md read
- `§ Operator review (Maymun)` in S2h-lessons.md pending preview §7 verification (EN/TR toggle, node click, bypass highlight, responsive layout)
- Stage S2e (Supabase progress tracker) deliberately deferred to late M0/early M1

**On the horizon**

- LiteLLM gateway integration as the production path for budget-sensitive model work: VS Code (via Roo Code, Cline, or Continue extensions) connects via custom base URL with per-developer virtual keys; AG is scoped to git/filesystem/deploy only (no BYO-key/custom-provider support confirmed)
- Resolving the four open decisions in the Big Picture panel before full Phase 1 can proceed
- CWF → Kale Seramik delivery (contractual, M7/December 2026)
- Phase 1 stage groups: telemetry, streaming/storage, observability, LiteLLM gateway, MCP tool servers, agent base class, first product
- First product choice for Revolutionize Stage 1.6 output (Web Asistan widget recommended over CWF audit PDF generator)
- Türk Re insurance triage as second customer

**Key learnings & principles**

**Architecture:**
- The three-channel constraint (intent stream → verification gate → reality feed) is the strongest architectural decision in the program; it prevents channel proliferation
- Adopt patterns from frameworks (OpenClaw, Hermes Agent, OASIS/CAMEL-AI), not runtime dependencies
- Re-implement only where interactivity earns it; serve canonical source everywhere else — the DocumentFrame embed pattern eliminated permanent content drift
- Calendar-bound phases (shadow mode validation, telemetry maturity windows, production canaries) cannot be compressed; implementation-bound phases can compress 50–80% with AI assistance
- Per-seat subscription costs are largely irrelevant at the team's LLM spend scale; what matters is whether tools support BYO-key routing through the LiteLLM gateway (ADR-001)

**AG execution reliability:**
- AG executes well but its state reads and causal explanations are unreliable — trust only ground truth (raw GitHub files, standalone browser, Vercel production), never AG summaries
- Planning documents must be banner-guarded so AG does not auto-execute them
- Stages handed to AG one at a time, gated; never as a full plan
- Everything crossing the chat-to-disk boundary travels as a hash-verified downloaded file via `_incoming/` with shell `cp` only — text-paste is not a delivery channel for executable bytes (Pattern #20)
- File sizes must be measured in bytes via content hashes, not character counts (Pattern #19)
- Repo identity must be verified from ground truth at Step 0 of every stage prompt — stale memory references to wrong repo have caused critical deviations
- `DocumentFrame` vs `ssoFrame` usage distinction must be explicit in every stage prompt
- Governance artifacts (prompt files) belong in the app repo under lowercase `prompts/v0/`, not the content repo
- `str_replace` operations in stage prompts must target exact confirmed strings, not line numbers (line numbers shift between stages; string content is stable)
- Before deleting any component, grep must cover the entire `app/` tree (Pattern #35)

**Prompt authoring:**
- Mandatory Step 0 read-before-code discipline in every stage prompt (field name mismatches and wrong-repo errors caught this way)
- Stage prompts must include a grep-based acceptance criterion to catch repo path drift (Pattern #31)
- AG tends to write Claude's lessons.md section; enforce three-author structure with explicit AUTHORED-BY section headers (Antigravity self-report, Maymun operator review, Claude prompt-author retrospective)
- For operator-gated stages, prompt must explicitly state "AG does NOT merge — AG reports and stops"; otherwise AG auto-merges
- Prompts directed at AG describe outcomes and acceptance criteria, not procedural commands — no bash sequences, git commands, or "click the button" instructions

**Cost/tooling:**
- VS Code + LiteLLM gateway is the production path for high-volume token-intensive work (zero editor cost, raw API pricing, full cost-at-emission control)
- Antigravity lacks a documented BYO-key path; scope it to git/filesystem/deploy only for cost-controlled production work

**Approach & patterns**

- **Conductor model**: Maymun queues prompts and runs operator gate checks; AG executes; Claude authors all prompts. Maymun never types code directly; all mechanical execution delegated to AG
- **Stage-based atomic work**: one stage = one detailed AG prompt = one PR; stages executed one at a time with gate verification before the next begins
- **Two-repo ordering constraint**: content repo PR merges before app repo PR for coordinated deployments
- **Communication style**: Maymun is direct, terse, and momentum-oriented — prefers single-line confirmations, flags corrections crisply, defers implementation details to Claude when tradeoffs are explained, expects Claude to suggest better models rather than just execute described approaches
- **Interactive ops with Maymun**: one decision per turn with confirmation before proceeding (not multi-part lists); Maymun explicitly corrected over-listing behavior
- **Pattern Library**: cumulative, sacred — lessons.md required after every stage; patterns numbered sequentially; new entries added to INDEX.md
- **Anchored-insertion model**: standard for patching canonical documents to avoid snapshot-staleness
- **Bilingual convention**: all human-readable prose in EN/TR; technical identifiers (component names, protocol strings, stage IDs, hours) stay as-is in both languages
- **Evidentiary standard**: Maymun holds Claude to strict factual grounding — flag uncertainty, run live verification before making architectural or financial claims, never fill gaps with plausible-sounding data

**Tools & resources**

- **Antigravity (AG)**: VS Code fork, agentic IDE executor with git/GitHub/filesystem/deploy access; used as executor only (swappable adapter role)
- **LiteLLM**: LLM gateway (ADR-001); shared instance with per-developer virtual keys via VS Code extensions (Roo Code, Cline, or Continue)
- **VS Code**: primary production surface for gateway-routed, budget-controlled model work
- **TheBluePrint23**: Next.js 15/React 19/TypeScript strict/Tailwind app at `theblueprint23.dev` (Vercel); program command center
- **Supabase**: auth and governance log (profiles table, phase0_approvals immutable log, RLS); SQL migrations run manually via Supabase Dashboard
- **GitHub**: `agbuilder-platform` org for content repo; `maymun207` for app repo; GitHub Free tier (branch protection deferred until Team tier)
- **`openpyxl` + `recalc.py`**: xlsx inspection and formula verification pattern for build schedule files
- **Key frameworks adopted (patterns only)**: OpenClaw (7-stage execution loop, 8-axis security taxonomy), Hermes Agent (skills-as-markdown, SOUL.md, MEMORY.md/USER.md split), OASIS/CAMEL-AI (empathy engine runtime)
- **MCP (Model Context Protocol)**: external tool protocol (ADR-002) with per-agent capability allowlist matrix
- **Primary models**: Claude Opus/Sonnet, Gemini Pro
