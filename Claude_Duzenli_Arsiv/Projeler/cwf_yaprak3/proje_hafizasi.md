# 🧠 Proje Hafızası: cwf_yaprak3

**Proje ID:** `019fd79d-0be9-765e-9ee4-853c5e386b9c`

---

**Purpose & context**

Hulya (project name: "Maymun") is product owner and lead decision-maker of the CWF→EAIP project — a governed agentic AI platform over MCP backends targeting Kale Seramik's ceramic manufacturing operations, with a long-term goal of a multi-tenant Enterprise Agentic Intelligence Platform (EAIP). Backends: ARMES (KB7 MES, ~141 flat tools) and Apache Superset 6.1 BI gateway. Repo: `maymun207/cwf_yaprak`. Project lineage: CWF→EAIP continues the earlier cwf_prod Claude project; EAIP-1 holds platform-level detail. CWF-DEMO has nothing to do with this project — never raise it. Claude cannot read cwf_prod or EAIP-1 files from inside this project; anything load-bearing must enter as a versioned artifact uploaded here.

**Three-lane workflow (locked, never re-litigated):**
- **Architect** = Claude (Opus 5 from S79 onward): diagnosis, design, gated phase prompts, RULE-25 fresh-clone reviews; NEVER writes repo files
- **Author/Developer** = AG (Claude Code on AntiGravity): all repo writes, merges `--no-ff`, squash banned
- **Operator** = Gemini with Supabase MCP: migrations via `supabase db push` only (never `apply_migration`, ADR-005); schema reads, live verification; fenced: no repo contact, no governed-table writes, never echoes secrets

Communication: Turkish for strategy/decisions, English for technical artifacts, prompts, and code.

**Infrastructure constants:**
- Vercel: `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i`, team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`
- Supabase: `fjbrkimwvtpwoxhziidh`
- GitHub: `maymun207/cwf_yaprak`
- Self-hosted Langfuse on AWS EC2 `i-030c2b4fadebfa229` (eu-central-1) behind CloudFront `dl3644f5a7fnn.cloudfront.net`, Elastic IP `52.57.7.5` (permanent); OTLP/HTTP ingest at `/api/public/otel` (gRPC NOT supported). Six containers: `cwf-langfuse-web`, `cwf-langfuse-worker`, `cwf-langfuse-clickhouse`, `cwf-langfuse-redis`, `cwf-langfuse-minio`, `cwf-langfuse-postgres` (all `restart: always`). Budget fence fires monthly (~August 20 for ~10 days) — planned blind spot, elevated priority for OBS-HOST-TRUTH-1.
- Qdrant + bge-m3 embedding service planned on same EC2 (two additional containers); bge-m3 is deterministic (not an LLM); vector port must speak hybrid dense+sparse with RRF fusion

**Long-term milestones (owner terminology, binding S95):**
- **yaprak_gate** = all seven SOTA gate keys turned (Wave 12 equivalent); architecture complete, not yet measured
- **cinekop_gate** = full open-item list at zero + first measurement round complete (Wave 15 equivalent); SOTA claim measured and provable
- Rule of thumb: yaprak_gate = architecture complete; cinekop_gate = system proven. Wave counts are a plan, not a measurement — realistic range 12–18 waves.

---

**Current state**

As of S100 (the most recent session), Wave 7 was completed in its entirety — 14 merges across three sub-trains (W7T1, W7T2, W7T3). **SOTA gate advanced to 5/7 keys.**

**Key S100 outcomes:**
- Synthetic traffic injector: diagnosed as working correctly but hitting a daily budget ceiling (not broken); even-spread pacing implemented
- Tool-behavior census console built
- Bus card grammar system (deliverables slot) fixed
- Housekeeping: 12 stale branches deleted, 14 migration file STATUS headers corrected
- #23 lexical retrieval (Path B entity seam): built with honest measurement; valve stays at floor 0
- A2A protocol migrated to official `@a2a-js/sdk` per new binding doctrine law **D-13** (standard interop/transport protocols must use their official SDK; internal governance/verification logic stays as code; discriminating test: can an external party measure conformance to the surface?)
- ADR-016 created: governed organ = policy engine
- Vector lane built with swappable port architecture (incumbent default, Qdrant-ready)

**S100 audit findings (from the S100 audit session):** Stage cards 03 (Intent/Understanding) and 04 (Planning) contain incorrect copy — both organs are live in production but cards claim otherwise. Card 07 (Tool Selection) learning arm frozen. Card 13 (Format/Presentation) has no server-side span measurement. Card 14 (Memory Update) is most deficient: turn-level learning attribution log-only, no persistence, primary deliverable table stagnant. Systemic root cause labeled `F-S100-COVERAGE-FLOOR-BLIND`: `stageCardCoverage.ts` is blind to published policy overrides in `domain_rules`. Proposed fix `STAGE-CARD-LIVE-TRUTH-1` (add `livePolicy` anchor type) is queued.

**Repository ground truth (S100 close):** origin/master `bfd9153b`, docVersion rev 258, 601 vitest-include test files (plus 15 separate Playwright e2e specs), 80 migrations, 15 ADRs, drift 7/7 clean.

---

**On the horizon**

- **STAGE-CARD-LIVE-TRUTH-1**: fix `stageCardCoverage.ts` to resolve live published policy values (SC-A lane candidate for Wave 8)
- **Qdrant / bge-m3 deployment**: two containers on existing AWS EC2; switch via governed valve publish when ready
- **FAILURE-LESSON-MEMORY-1** (S98-L5 walk item): tool failure truth written to model-visible persistent memory; prerequisite: #13; S87 success-conditional procedure recall untouched
- **METRIC-VOCAB-DISCOVERY-1**: vocabulary grows by self-learning through governed gate, never keyboard; named precondition of the S90-ratified metric registry ruling
- **Remaining SOTA gate items**: #25, #29 (and open items #27 vector, #30 EVAL-SPLIT-LAW, #31 honestbench, #32 v1.1 queue, #33 B-FRONTIER-PAIRING, #34 AGENTBEATS, #37 GOLDEN-SET-REPLAYABILITY) — required for cinekop_gate
- **OBS-HOST-HEALTH-1**: Langfuse host health on no internal monitoring surface; elevated priority given budget fence blind-spot pattern
- **Open owner decisions**: `learning.snapshotRetentionMax` publication; #37 early pull consideration; Qdrant infrastructure approval

---

**Key learnings & principles**

**Architecture laws (locked, never re-litigate):**
- **DB-first/code-floor**: runtime SSOT is governed DB; code reference serves exactly three roles: seed, reset target, outage floor
- **empty≠zero** is sacred — survives outage and render layer (real-0=data, missing=gap, empty="no data", non-numeric="not chartable")
- **Grounding/trust** is deterministic code, never an LLM judge (ADR-001: make a lying backend HARMLESS — contained, attributed, quarantinable)
- **Eval-gate** unbypassable; schema→referential→behavioral; "no gate change" = engine + stage order + interpreter byte-identical
- **C1 LAW**: zero writes to messages from replay/governance paths
- **Backend identity is DATA** (a row, not an enum or migration)
- **ADR-002**: no mode grants repo-write AND DB-write simultaneously
- **ADR-007**: secrets never echoed; silent success paths are correct
- **ADR-009**: entity topology must be discovered from the backend, never hand-authored
- **ADR-010**: a backend declaration is a claim, not a warrant; trust earned from observed behavior at per-tool granularity, two-speed enforcement
- **ADR-011**: write-exclusion rule; all 44 write-annotated tools excluded from filtered turns by design
- **ADR-012**: four-layer restriction taxonomy — INVARIANT / POLICY / SCOPE-CUT / CONFIG; label lives on the valve at its definition site (R-1); name the layer before legislating (R-2)
- **D-13** (S100): standard interop/transport protocols must use their official SDK; internal governance/verification logic stays as code
- **MEASURE-READ-HONESTY-1**: reads feeding measurements/ledgers/actuators/fences must distinguish "no data" from "could not read"
- **FLOOR-TENANT-SPLIT**: CI gate enforces zero tenant-specific vocabulary across all eight tokens
- **S98-L4** (sahip yasası): Ölçen bir organın doğum kanıtı ilk tüketicisini de kapsar. Kimsenin okumadığı ölçüm ölüdür — her ölçüm organı fazında "bu veriyi kim okuyor?" sorusunun cevabı adıyla yazılır
- **S98-L5** (sahip yasası — "kazık defteri"): Negatif tecrübe birinci sınıf bilgidir. Başarısız turdan çıkan araç-gerçeği kalıcı ve model-görünür hafızaya otomatik yazılmalı
- **S90 owner ruling (binding)**: METRIC-REGISTRY-DATA-1 — metric words (oee/fire/throughput) and METRIC_ALIASES are backend field-DATA, not structure; they move out of code into backend-scoped governed rows (`kind backend.metric_registry`); armes trio becomes armes ABSENCE-ONLY seed; platform floor EMPTY. Mechanism stays code. Named precondition of METRIC-VOCAB-DISCOVERY-1
- **JOIN LAW**: armes-domain zone reads require parent guard; name-only matching forbidden (Glazur3 collision)

**Recurring Architect premise error (root cause):** writing specifications from documents rather than reading live artifacts. Every phase brief must open with a live read of the governed state it depends on (S65-1). Evidence is computed, never asserted (S65-2, D-3).

**Other standing laws:** S73-1 (diagnosis chain ends at a byte, never patch above proven layer); S73-2 (backend toggle → warm discovery caches lie for up to one 5-min TTL); S74-1 (opened program has a user-eye finish definition, completes as one piece); S74-2 (consent carries scope AND stop boundaries); S75-1 (job file unproven until seam's own loader swallows it); S80-1 (scratch-clone sessions use absolute paths); S63-1 (merge is not proof — live measurement is; every fix phase names its post-deploy proof read); S66-1 (self-verify zero not trusted without positive control); S70-1 (live-state claims derivable with a named source); S88-1 (DALGA-ÇAPA YASASI — multi-lane phase prompts checked against each other before release when one lane's prompt intentionally moves master); S89 GATE-JURISDICTION (4 articles; silent gates must record their silence); S93-1 (birth proof law — every measurement organ must produce and verify its first real measurement within its own phase); S94-1 (semantic equivalence is environment-relative; `delete … where true` is canonical in this database); S94-2 (constraint censuses must use `pg_catalog` or DDL text, never `information_schema`); S96-1/2/3 (tree+ref exclusivity, birth-window, union seam); S91-3 LANE-COMPLETION GATE (session may NOT close while any AG lane's work is unfinished).

---

**Approach & patterns**

**Decision style Maymun requires:**
- Committed single-path recommendations (never menus of options)
- Diagnosis-first: name the hidden trap before prescribing a fix
- Push back honestly when sequencing is wrong; hold positions under pressure
- Never re-raise closed items
- Finish fully — no demo deferrals, no "later" without explicit sequencing
- Maymun's own style: brief confirmations ("tamam", "baslat", "ok devam"), raises UX/architecture objections with specific questions

**Sahip aksiyon maddeleri HER ZAMAN human-readable yazılır:** adım adım, ekranda göreceği kelimelerle (hangi menü, hangi buton), ne değişeceği ve neden tek düz cümleyle. Tek satırlık kriptik/jargonlu talimat yasak — sahip Claude'u decode etmek zorunda kalmamalı.

**Phase execution pattern:**
Bootstrap (fresh clone; verify anchor commit + test count + docVersion + drift gate) → Architect diagnoses, writes design note, then ONE gated versioned phase prompt for AG → AG builds and pushes branch → RULE-25 review (fresh clone, independent recount, byte-pin diffs, grep verification) → GO plus verbatim Architect-authored merge message → Operator applies migrations (FENCE-first, G-gates, idempotence probe, verifyGrants) → DOC-FLIP with reseal → session close producing versioned register, KB, and bootstrap artifacts.

**Phase prompt completeness gate (S91, owner-mandated):** Every phase prompt MUST name explicitly: (a) branch name `phase/<kebab-name>`, (b) instruction to PUSH that branch to origin, (c) report file path `docs/relay/PHASE-<NAME>-report.md`, (d) open a PR against master so CI runs on PR head.

**Relay BLOCK markers:** `>> BLOCK: <target> <<` takes a LANE in target slot (AG-1/AG-2/Operator), never a filename. Anything meant for project-knowledge upload produced as an actual FILE (create_file + present_files), never pasted into chat prose. Every artifact in a message routed by name in owner action items; no artifact left unrouted.

**Wait contract (S74-3/S74-4):** Claude's only window is what Maymun pastes. (1) Any next step depending on another lane's output is NEVER "action items: yok" — the relay is a named action item. (2) Every waiting state must state: exactly WHAT output ends it, that the owner must PASTE it, an EXPIRY with a default probe, and any independent SENSOR Claude will read. (3) On every relayed lane output, check what question it leaves UNANSWERED — a gap is an action item, never assumed "still in progress."

**Wave/parallel execution:** Up to four AG lanes (AG-1 through AG-4) run concurrently on disjoint source fences. Three singleton bottlenecks: seal/docVersion token (one writer per wave), migration ledger (max 2 per wave with pre-assigned timestamp slots), turn pipeline surface. SC-A class items (new files only, no migrations, no seal, no turn-pipeline contact) can safely run in C/D lanes. MAIL-WAIT protocol: lanes poll for mail after completing work rather than dying.

**Relay bus (relay_inbox):** Dollar-quoted strings (`$label$...$label$`) required for multi-line SQL inserts to avoid escaping failures. UPDATE on consumed rows silently returns zero rows — amendment cards must be inserted as new rows. Pattern for checking unconsumed cards: `WHERE consumed_at IS NULL AND lane_addr = 'AG-X'`.

**Session state is never carried in memory:** live position lives in project files — CLAUDE-PROJECT-INSTRUCTIONS, latest `cwf-open-items-register-v*`, `CWF-SESSION-GRAPH-KB-v*`, bootstrap prompt, and master rollout plan. Code in `cwf_yaprak` is ground truth over any summary. Treat any commit hash, test count, or open-item status recalled from memory as stale by default.

**Automation-first (highest-priority standing directive):** NEVER offload manual work to Maymun — build the automation or read data with available tools first. Any manual step is a missing-tooling BUG. "YOUR ACTION ITEMS" rule: any response containing a manual action for Maymun must surface it as an explicit bullet list; if zero manual actions, say so explicitly.

**Architect Doctrine v1_1 (binding, never violated):**
- D-1 RECON-FIRST — no phase prompt over unverified live state; thin recon brief first
- D-2 ONE-RELAY — one self-contained file per relay, all dependencies embedded
- D-3 COMPUTED-NOT-ASSERTED — every value from a named in-session command; hand-transcription banned
- D-4 CEREMONY-ZERO — owner manual work only for secrets / real data-changing consent / hand-witness
- D-5 GATE-SELF-TEST — every authored rule tested both directions including innocent-case probe
- D-6 TOUCH-BUDGET — max 3 owner touches per phase; 4th = named incident (GO relay structurally requires 4 touches — doctrine v1_2 pending)
- D-7 pre-send checklist — mandatory before every relay-carrying message AND every message containing any owner-facing item; Question 6 enforces SEQUENTIAL: if one step is requested, exactly one step is provided

---

**Tools & resources**

**Supabase MCP (`execute_sql`):**
- Always use `pg_catalog` (never `information_schema` — privilege-filtered, returns empty results silently; S94-2)
- `pg_get_constraintdef(oid)` from `pg_constraint` for constraint censuses; `pg_get_functiondef(p.oid)` from `pg_proc` for function body inspection
- `has_table_privilege(grantee, 'public.tablename', priv)` for grant verification (three-way: `42501`=PASS, no-error read=LEAK/fail, anything else=INCONCLUSIVE/fail)
- Telemetry: `turn_done` events stored as `type='message'` rows with `payload->>'kind'='turn_done'` — querying `type='turn_done'` returns empty even when data exists
- `domain_rules` filtered queries: always add `status='published'` to avoid returning all historical archived rows
- PostgREST caps selects at 1000 rows with no truncation signal — any read of a potentially large table must page to exhaustion or use SQL-side aggregation
- `relay_inbox` table uses `consumed_at` column; UPDATE on consumed rows silently returns zero rows — insertions only for amendments
- `domain_rules` and `domain_rules_versions` track governed parameter publishes with full audit trail

**Vercel MCP (`get_runtime_logs`):**
- Wide log windows time out — scope to a `deploymentId` with ≤30 min window for detail reads
- `group_by=requestPath` is the fast path, survives 12h windows
- `query` parameter: ONE distinctive inner content word, never a phrase
- `group_by` parameter accepts `requestPath` or `statusCode`; `since` accepts human-readable durations ("6h", "60m")
- `list_deployments` with `state=READY` + `target=production` + matching SHA is authoritative deploy confirmation
- Supabase RLS reads (browser direct) never appear in Vercel runtime logs — only requests through Vercel serverless functions are visible
- Key log vocabulary: `MemoryForget`, `MemoryWrite`, `Memory`, `BackendHealth`, `CatalogSync`, `ToolRoute`, `knowledge_lookup_parameter`, `EntityDiscovery`, `LearnCorpus`, `Gate`, `LLMFinish`, `getOeeValuesForZones`, `SynthTraffic`, `CensusRefresh`

**GitHub API:** Rate-limited (403) from Architect sandbox; CI verification folded into AG's GO block as blocking STEP 1 with explicit pass condition. Use `/actions/runs?head_sha=<SHA>` (not `/commits/<SHA>/check-runs` which returns `total_count:0` unreliably). `in_progress`/`null` is NOT a pass. Git ancestor test: `git merge-base --is-ancestor <ref> origin/master` (not `ahead=0` commit count).

**Vitest:** `process.env.VITEST === 'true'`; include covers `src/**`, `shared/**`, `api/**/__tests__` but NOT `scripts/**` — script-layer tests go in `api/cwf/__tests__`.

**AWS CLI (CloudShell):** Requires `export AWS_PAGER=""` at session start. CloudFront API calls require `--region us-east-1`. Always confirm shell environment before interpreting Docker output (CloudShell vs. EC2 SSH).

**Key technical vocabulary:** RULE-25, RULE-26, S66-1, F185, ADR-005, ADR-011, governed params (S46 reconciler self-seed pattern), three-lane relay pattern, eval-canary (structurally skipped on PR runs due to spend fence — not a failure condition), rule26 Playwright job (chronic flake F-BW01, one ordered rerun with signature matching), check:tenant-zero CI gate, MAIL-WAIT protocol, yaprak_gate, cinekop_gate, `relay_inbox`, SOTA gate (currently 5/7).
