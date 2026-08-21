# 🧠 Proje Hafızası: cwf_prod

**Proje ID:** `019f07a5-a460-7542-a1d7-f0770065d7ba`

---

**Purpose & context**

Maymun is the product owner and technical decision-maker of **CWF→EAIP** (cwf_yaprak), a production-grade "Chat With Factory" agentic AI platform for a ceramic manufacturing operation. The system connects users to live factory data through governed MCP backends (ARMES MES and Apache Superset BI) via an LLM pipeline built on Next.js/TypeScript, Supabase, and Vercel. The long-term goal is for CWF to serve as the foundation of a multi-layer Enterprise Agentic Intelligence Platform (EAIP).

Maymun works in a strict **three-lane orchestration model**:
- **Architect lane** = Claude: diagnosis, design, versioned phase prompts, FAST-GATE reviews
- **Author lane** = AG (Claude Code on AntiGravity): all repo writes via PRs
- **Operator lane** = Gemini + Supabase MCP: database migrations and reads only

Communication convention: Turkish for strategy/decisions, English for technical artifacts and prompts. Project repo: `github.com/maymun207/cwf_yaprak` (public). Key infra: Vercel project `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, Supabase project `fjbrkimwvtpwoxhziidh`, AWS Langfuse host at `dl3644f5a7fnn.cloudfront.net`.

---

**Current state**

**Verified floor (most recent confirmed):** master `f551bc068a10714b7d43e35e614cd32f9e060a48` · docVersion rev 141 · ~350 test files / 3735 tests · 56 migrations · drift OK. (TOTAL-45 RULE: treat this as a claim requiring fresh verification at session start — `git rev-parse origin/master`.)

**Active release track (cwf-master-plan-v5_2):**
- B1 (IR arc) — **CLOSED**
- B2 (Superset) — **CLOSED** ("kapalı, geri dönmemek üzere")
- **LOG-TRUTH-1** — in-flight with AG:
  - G0: instrumentation-only (F169 flush diagnostic)
  - G1: deliberately empty
  - G2: F173 fix (non-UUID `'preview'` identity hitting uuid-typed column, ~591 executions)
- **B3 (MEMORY-1)** — next block; design phase pending

**Open items (register v63 era):**
- **F169**: observability flush timeout (~7/9 cron ticks failing); first patch failed in production; LOG-TRUTH-1 G0 is the instrumentation step before attempting G2
- **F172**: open (carry)
- **F173**: `'preview'` dev harness identity → uuid column; queued in LOG-TRUTH-1 G2
- **F171-B**: open (carry)
- **Understanding layer**: 7/10 real production turns failing; root cause diagnosed as treating epistemic failures (lookup misses) as aleatoric ambiguity; SOTA review delivered (`cwf-sota-understanding-layer-v1`); two-threshold decision rule (τ for NIL, β for margin) proposed from entity linking literature
- **`cwf-load-bearing-residue-v1`**: structural inventory classifying all project components by load-bearing status — authored at S62 close
- **F150 / OBS-TRACE-2b**: 11 `.rpc()` sites still untraced; owner said "başlat" — queued
- **BOARD-WALK re-walk**: owed (cards 01·02·04·05·06·08·09·10·13·14); owner "ASLA unutma"
- **ADR-005**: repo-absent (exists in governed records since S27 but not committed to `docs/adr/`; ADR-001–004, 006, 007 committed; ADR-008 minted S55)
- **ADR-009**: does NOT exist in any form (confirmed S62+); current ADR numbering stops at ADR-008

**Standing rules in force this session:**
- S62-1: enumerate every call site, count each in production, read the differing variable (born from F169 three-endpoint comparison)
- S62-2: no layer without a named, measurable target function; measure before fixing
- S62-3: CI verification is AG's blocking Step 1
- S61-2: no debt left behind; a warning label is not a fix
- S61-3: relay payloads can arrive truncated; tail anchor required; report on mismatch, never merge
- S59-2 / TOTAL-45: any log/telemetry field is a CLAIM — verify emitting code or corroborate before using as a premise (PERMANENT, "ASLA UNUTMA")

**Architect premise-error tally:** 14 (tracked cumulatively; errors #13 = cold/warm hypothesis self-falsified, #14 = carry from S62)

---

**On the horizon**

- **B3 MEMORY-1**: two-loop design (async distiller cron for episodic writes, deterministic SQL retrieval at pipeline stage 05, promotion-through-existing-gate, TTL-based forgetting); zero new infrastructure — built on existing Supabase, Vercel cron, eval-gate, governed parameter rails; F166-aware design required
- **Understanding layer fix**: implement two-threshold decision rule; no layer ships without a named measurable target function (S62-2)
- **F166 (cross-turn viz binding)**: turn-scoped viz binder cannot access prior turn tool results; deferred to after B3
- **`cwf-synthetic-gapfill-v1`**: DB record in `synthetic_question_sets` (id `2c54030d…`), Session 57 origin; actual 8-utterance content requires Operator Supabase read
- **Project knowledge cleanup**: new project "CWF / EAIP — Live" recommended (keep-list ~27 files); old project becomes read-only archive
- **CLAUDE-PROJECT-INSTRUCTIONS-v3.md**: delivered at S61/62 boundary; constitutionally current
- **F161 pagination honesty**: enters immediately after B2 closure (already closed), before B3 — may need sequencing re-check against LOG-TRUTH-1 state
- **Security-cleanup workstream**: all six mcp_settings servers carry raw inline credentials with zero `apiKeyEnv` references — named, deferred to a later block
- **FINAL docs+arch pass**: last item after all development complete; governance-replay explainer (`cwf-governance-replay-explained-v1`) already delivered, refresh only at this pass

---

**Key learnings & principles**

**Constitutional laws (supreme, immutable):**

1. **PLATINUM RULE**: every component must self-configure; single-click operational; manual configuration required = design is WRONG → STOP and REDESIGN. Breach protocol: declare unprompted, log PLATINUM-BREACH-#, supersede artifact, halt other work. Self-check trigger before every "YOUR ACTION ITEMS" bullet: does this require human judgment? If no → machine work, fold into AG/Operator instruction.

2. **GOLDEN LEDGER RULE**: append-only session carriers; items leave only via explicit terminal marker (CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO); carry-diff pasted into every new artifact; no summary-of-summary; plan-file parked/queue lines survive by name.

3. **FULL-TRACE MANDATE**: every pipeline stage, every DB/table read, every tool call — INPUT+OUTPUT visible in both Langfuse AND StagesDashboard; no read stays dark; only raw secrets scrubbed. Enforced by construction via COMPLETENESS GUARD (spanIOCompleteness.test.ts).

4. **GOLDEN FREEZE**: NO golden run work of any kind until owner explicitly lifts freeze. All golden-infra items below product work.

**Architecture invariants:**
- **DB-first / code-floor**: runtime SSOT = governed DB; code reference = seed + reset target + outage floor; never invert
- **Backend identity is DATA**: adding a backend = adding rows, not code; factory↔backend coverage is CONFIG not doctrine (mutable connection config discovered live each turn — never encode which factory lives in which backend as a governed rule)
- **Deterministic trust line**: grounding/trust = deterministic code only, never an LLM judge; empty≠zero is sacred and extends to the render and trace layers
- **ADR-008 three-system observability split**: telemetry_events = LEDGER / Langfuse = TRACES / turn_trace_digest = DEBUG MIRROR (bounded 14-day)
- **No layer without a named measurable target function** (S62-2 — born from understanding layer diagnosis)

**Process discipline:**
- **FAST-GATE** (S43-2): CI is sole test arbiter; review ≤60s; shallow clone → merge-base → migrations → frozen-surface diff → security greps. Deep ritual only when CI unavailable, release hardening, or explicit owner request
- **S37-1 / artifact immutability**: once an artifact is PRESENTED it is IMMUTABLE; amendment = new version (vN_2 same session); never in-place edit even when disclosed
- **S37-2**: CI-green is merge precondition; sharded local runs ≠ CI unsharded run (sharding hides timing flakes)
- **S47-1**: every cross-lane instruction carries explicit state precondition hash
- **S54-3**: every cross-lane relay payload = exactly ONE self-contained artifact
- **S54-4**: authorization for consent-class live actions spoken by owner in their own words in the executing agent's channel
- **S53-2**: artifact final-state checks hit the artifact, never the conversation reconstruction
- **S36-2**: grep project files before authoring any versioned artifact (no re-authoring existing artifacts without grepping first)
- **Two ceremony profiles**: FULL (multi-file, any api/shared/migration/security touch) vs HOTFIX (single-file client-only, targeted tests only); never lighten for security/DB/eval/trust work
- **Factory↔backend coverage law**: never encode as doctrine; always config

**Premise-error discipline:**
- TOTAL-45 / S59-2: log field semantics must be verified against emitting code or corroborated — otherwise carry "unverified" mark everywhere
- S54-1: tree-verify every premise before authoring (seven Architect premise errors caught by AG tree-reads in one session established this as load-bearing)
- S62-1: enumerate every call site, count each in production, read the differing variable

---

**Approach & patterns**

**Versioning (standing user rule — non-negotiable):**
Every generated artifact MUST carry an explicit version in both FILENAME and inside the file (e.g., `cwf-architecture-map-v3.html`, internal "rev 3 · 2026-06-27"). Never overwrite a prior version silently. Once presented to owner: IMMUTABLE. Same-session amendment = vN_2 / "rev N.2". This applies to ALL deliverables: phase prompts, design notes, diagrams, docs, architecture maps.

**Session lifecycle:**
1. Read bootstrap + KB + register to reestablish state
2. Fresh clone: `git rev-parse origin/master` → verify floor hash, test count, migration count, drift gate
3. Drive next workable register item proactively (S54-2: Architect never idles while register has workable items)
4. All execution through AG or Operator lanes; owner relay-only
5. Close with register + KB + bootstrap triplet (three artifacts, all consistent)

**Communication:**
- Turkish for strategy/decisions; English for technical artifacts and prompts
- Every response containing any manual action Maymun must perform → explicit "YOUR ACTION ITEMS" bullet list, concrete and self-contained; if zero manual actions, say so explicitly ("Senden bir şey gerekmiyor")
- Before any "YOUR ACTION ITEMS" bullet: PLATINUM self-check — does this require human judgment? If no → fold into machine instruction
- Committed single-path recommendations, not option menus; diagnosis-first; name hidden traps explicitly
- Tight prose; no re-raising closed items; never end with "nothing to do" while unlocked register items remain

**Merge discipline:**
- `gh pr merge` with explicit `--subject "…" --body "…"` parameters (empty flags → GitHub uses default message)
- Verbatim merge messages authored by Architect (S30-2)
- Tail anchor on every relay merge instruction (S61-3)
- CI green before merge (S37-2); AG's CI verification is blocking Step 1 (S62-3)

**Operator lane:**
- FENCE block must be first section of every Operator prompt
- Project ref `fjbrkimwvtpwoxhziidh` must be stated explicitly (defaulted to wrong project historically)
- Two-door discipline: AG authors migrations, Operator applies, Architect verifies from Gemini's literal output
- `supabase db push` via Operator/CI only — never `apply_migration` tool
- verifyGrants after every migration apply

**AG discipline:**
- S56-1: isolated workdir per AG lane; parallelism only with separate clones/worktrees
- One live agent per worktree (S44-1)
- Never cite an off-repo Architect document as AG-verifiable; embed verbatim or attribute explicitly as "off-repo, Architect-layer"
- Authorization for consent-class actions spoken by owner in their own words (S54-4)

---

**Tools & resources**

**Vercel MCP log queries (verified patterns):**
- Scope to specific `deploymentId` (re-resolve after every merge via `list_deployments` — stale ID returns empty without error)
- `since` parameter: narrow windows (≤18h); broad windows time out
- `query` parameter: single inner content word (e.g., "Route", "Seed", "basis") — multi-word phrases fail
- `group_by=requestPath` survives 12-hour windows; use first to locate traffic patterns, then narrow
- After merge: `list_deployments` → get current READY production deploymentId → then `get_runtime_logs`
- Query term contamination is a real risk (e.g., "ceiling" matched `ceilingFailed`; "Frame" matched SynthTraffic frame-only logs) — use distinctive content words
- Specific factory name (e.g., "Ganit") reliably targets exact relevant log lines
- When factory is idle/degraded, traffic logs return empty — use `list_deployments` to confirm what commit is live

**GitHub API:**
- Rate-limited from shared sandbox IPs (HTTP 403); workaround: rely on AG-reported CI, use Vercel log patterns instead
- Run-level endpoint (`/actions/runs?head_sha=`) usually succeeds; jobs-level detail endpoint reliably hits rate limit

**Supabase / Operator MCP:**
- `pg_proc.proacl` more reliable than `information_schema.role_routine_grants` for EXECUTE grant verification
- Surgical `jsonb_set` array-element updates require index + id-based guard condition
- Read-only verification: `supabase_read_only_user` role, `transaction_read_only=on`
- All raw DB reads routed through Operator lane per ADR-006

**Vercel Cron:** GET-only; `CRON_SECRET` pattern for auth

**Key project files (current):**
- `CLAUDE-PROJECT-INSTRUCTIONS-v3.md` — constitutional reference (current as of S61/62)
- `cwf-master-plan-v5_2.md` — MUST-FOLLOW UNTIL FINISH rule book
- `cwf-open-items-register-v63.md` — open items (or latest version)
- `CWF-SESSION-GRAPH-KB-v61.md` + `CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v61.md` — session carriers (or latest)
- `cwf-sota-understanding-layer-v1` — understanding layer diagnosis (S62)
- `cwf-load-bearing-residue-v1` — structural inventory (S62)
- `cwf-governance-replay-explained-v1` — governance-replay textbook (delivered, do not re-author)
- `docs/adr/` — ADR-001–004, 006, 007 committed; ADR-005 and ADR-008 repo-absent

**ADR registry (current):**
- ADR-001: Backend Trust & Provenance
- ADR-002: Agent Operating Modes
- ADR-003: LLM empty-completion retry
- ADR-004: Ledger vs trace separation
- ADR-005: Supabase apply authority (repo-absent)
- ADR-006: Agent lane hygiene (committed)
- ADR-007: (committed)
- ADR-008: Three-system observability split — telemetry_events LEDGER / Langfuse TRACES / turn_trace_digest DEBUG MIRROR (minted S55, repo-absent)
- ADR-009: Does NOT exist
