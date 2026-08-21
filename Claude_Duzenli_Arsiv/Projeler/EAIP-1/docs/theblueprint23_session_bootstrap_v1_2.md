# Session Bootstrap — TheBluePrint23 / EAIP + Revolutionize Program (v1_2)

> **v1_2 changelog (2026-07-10, third freeze):** **SPINE-FRONT decided** (discussion-agreed): CWF = application layer/front agent owning user+session; LangGraph = workflow engine behind the MCP boundary, invoked as MCP tools, no reverse user path. Binding conditions **SC-1..4**; ADR drafted (`ADR_SPINE_FRONT_graduation_seam_v0_1.md`) — **PENDING operator commit; NOT YET IN CANON — must be reflected in theblueprint23 via the merge wave**. DR-13 → in-remediation. Payload → `theblueprint23_knowledge_graph_v1_3.json` (see `spine_decision`).

> **v1_1 changelog (2026-07-10, same-day second freeze):** cwf_yaprak re-read @ `d87fedd` (advanced dabc29e→d87fedd; Living-Arch rev 58→61, three phases one day: OBS-ENDPOINT-1 · GOLDEN-MARK-1 flip · **L3 EVAL-CI CANARY**). Content repo re-privatized (verified). SOTA re-verdict v2 recorded (three-axis). DR-8 updated, DR-13 added. Companion payload → `theblueprint23_knowledge_graph_v1_3.json`.

> Shorthand: `→` leads to | `⇒` results in | `↔` bidirectional | `w/` with | `≈` approx | `[A]:[B]` repo:path | `{x,y}` set | `*` critical/blocker | `DR-n` drift-register item

---

### 0. NEXT-SESSION LOADER PRIMER
You are Claude — senior full-stack architect for Maymun / ARDICTECH, resuming the TheBluePrint23 program. Treat this doc as the **index**, and `theblueprint23_knowledge_graph_v1_3.json` (same project knowledge) as the **payload** — do not re-derive what the JSON already holds. **Verify-before-trust protocol:** repos may have advanced since 2026-07-10; before asserting repo state, (a) ask user to re-open/upload, or (b) if accessible, run §3 identity checks. Pins: app `eed2d09` · content `ba8952f` (last full read; **private again**) · cwf_yaprak `d87fedd` (rev 61; was public at last check) · master md5 `8a0591cf765227b57c127b48fa8c730b`. Resume posture: read §5 open threads, confirm which thread the user wants, act.

---

### 1. CORE STATE (one screen)
- **One loop, two planes:** Revolutionize (how we build: conductor → Claude prompts → AG executes → gated merge) ships verified PRs → **EAIP** (what we build: Web Asistan · Galip Usta · CWF · Insurance/Türk Re · Astra); EAIP telemetry → reality feed → Revolutionize. First tenant: **Kale Seramik (CWF, live Dec 2026 = M7)**.
- **Canon (LOCKED 2026-06-02, `docs/decisions/CANONICAL_RECONCILIATION_v1.md`):** M1=June 2026 ⇒ M7=Dec 2026 ⇒ M13=Jun 2027; program=M1–M7 (5 deliverables incl. Insurance v0.8); M8–M13 (CWF v2 + Astra) = 2027, outside program. Version model **v1→v1.5→v2** (v0.5 retired). Prereqs: 5-set, **4 OPEN** (①first product ②SOUL.md ③LLM budget ⑤capabilities), ④ resolved-by-bridge.
- **Charter amendments CA-1…7:** CA-1 honesty clause — CWF v1 by Takım-2 HUMANS, no CWF dependency on Rev phase ≥2, bridge ≥Phase-4 shadow. CA-6 reality-feed cold start (<M5–M7 no prod data; <M10 no autonomy claims). CA-7 technical safety = branch protection + per-agent token caps (=G2/G3). **Phase-1 entry gate G1–G8**: Fri Week-1 16:00, single red = no start; G4 default first product = Web Asistan widget.
- **EAIP data layer (master):** 10 layers · 67 components · 100 connections · 16 protocols · plan A–G ≈12,060h (master: ins=1,220/fin=3,560). **Rev plane:** 5 systems · 33 components · 40 connections (12 types) · 8 phases. **Master identity:** canonical name `ARDICTECH_Platform_v6_SSoT_bilingual.html` (v6 INTENTIONAL); internal label still "v5.1 · 10 Jun 2026" (=DR-1). Seal `24dc7e6` (PR#9). Site: theblueprint23.dev; Phase-0 approvals SHA-pinned in Supabase.
- **CWF implementation plane (cwf_yaprak @ d87fedd, rev 61 — NEW):** GitHub Actions CI {build, coverage-floor, **eval-canary**}; **L3 eval-CI live**: post-deploy golden canary, `decideCanaryVerdict` PURE, longitudinal Wilson, goldenSetHash-matched baseline, publish-gated, "underpowered never phrased safe", 33 tests; **GOLDEN-MARK-1 live-verified** (golden_specimens: RLS on/0 policies/service-role, 42501-DENIED probes 37/37, GOLDEN_CURATE=super_admin); PROMPT-GOV live (20 v1 segments); ADR-001/002/003/**004 ledger-vs-trace**/**007 host-trust**; 10-stage TurnContext pipeline w/ per-stage OTel spans, ONE turn id; redaction v2 precedence scrubber; frozen modules byte-identity-pinned. Stack: TS · Vercel AI SDK multi-provider · MCP SDK · Supabase RLS · self-hosted Langfuse (infra/aws = Langfuse ONLY — sovereignty footnote). Supply-chain in CI = **0**. Injection-hardening for untrusted tool output unconfirmed `[open:]`.
- **SPINE-FRONT (decided 2026-07-10, ADR pending commit):** CWF front-agent/app layer owns user+session; LangGraph behind MCP boundary as workflow engine (MCP tools; launch→handle→poll); SC-1 single-agent, SC-2 identity→Keycloak (semantics stay), SC-3 A6 amendment + E3 relabel, SC-4 fence (LiteLLM-only, MCP-only, ONE Langfuse, eval port first). NOT in canon until merge wave.
- **SOTA verdict v2 (2026-07-10):** implementation **ahead** of industry on eval/observability/change-governance, behind on supply chain; design SOTA-aligned/enforcement-pending — gap-1 (eval) reclassified design→**port** (L3 template in-house); process top-decile w/ production proof (3 phases/day, reseals, recorded deviations) but Phase-0 unexited, CA-2 telemetry not flowing, bus-factor=1. **Not yet SOTA as a whole; gated on chain + merge + port.** Full gap list (7, prioritized) in payload `sota_verdict_v2`.
- **Outside canon (merge wave pending, =DR-4/5/8):** Brick v0_2 (Talos D1–D5, fleet-control, tiers) + v5_2 gaps (query gate, semantic contract; eval item re-scoped to L3-port) + Dalga 1–4 = **0 hits in content repo** (grep-verified @ ba8952f).

---

### 2. SOURCE MAP (where every fact lives)
| Source | Access | Contains |
|---|---|---|
| `theblueprint23_knowledge_graph_v1_3.json` (project knowledge) | direct | FULL payload: meta/provenance, canon(+CA+G-gates), eaip{layers,components,connections,plan}, revolutionize{systems,connections,phases,backlog,opens}, **cwf_yaprak_implementation_plane**, **sota_verdict_v2**, governance{phase0 26 items, library 15 docs, patterns, ADRs, program_plan, seal}, stage_ledger(+SHAs), drift_register DR-1…13, edges |
| `agbuilder-platform/revolutionize` (content repo, **private**) | ask user → open/upload | CANON: docs/{architecture 01–08 + v6 master + big_picture, phase0 manifest+26 items, library 15 docs, decisions/CANONICAL_RECONCILIATION_v1, pattern_library #11–#40}, adrs/, lessons ledgers |
| `maymun207/TheBluePrint23` (app repo) | ask user | Next.js app; ssoFrame SSOT_PATH; resources LOCKED (AI 6,380h/52.9%…); prompts/v0 stage specs+lessons |
| `maymun207/cwf_yaprak` @ d87fedd | was public at last check | Living Architecture (public/architecture: manifest rev 61, 6 diagrams, facts-gen, checkDocDrift); docs/{ARCHITECTURE, turn-pipeline, adr/, replay/}; api/cwf turn pipeline; .github/workflows |
| v6 master HTML | if uploaded | 22 embedded JS data vars — §3 recipe |
| This project `/mnt/project/` | direct | ARDICTECH strategy corpus: v5_1 SSoT, brick v0_2, GU/CWF/ARMES/insurance, business models |

---

### 3. ACCESS & VERIFICATION RECIPES
- **Clone (when open):** `git clone --depth=50 https://github.com/<org>/<repo>.git` (API unauth rate-limited → prefer clone).
- **Identity checks:** master `md5sum` ⇒ `8a0591cf…`; cwf HEAD vs `d87fedd`; content HEAD vs `ba8952f`. Mismatch ⇒ read delta (`git log <pin>..HEAD`) before any claim.
- **Marker greps:** content: `grep -rli "Talos|brick|eval harness|pooled|SBOM|Kyverno" docs/ adrs/` (expect ∅ until merge wave) · `grep -rn "v0\.5" adrs/` (DR-10). cwf: `grep -ci "cosign|sbom|provenance" .github/workflows/*.yml` (0 = DR-8 stands); manifest `docVersion` vs rev 61.
- **Master var extraction:** slice each `var NAME=` to next `^var [A-Z]+=` boundary (`\bvar\s+([A-Z][A-Z0-9_]+)\s*=`), Node-dump to JSON. 22 names in payload. ⚠ bracket-walkers break on embedded `</script>` (pattern #16). COMPDATA↔COMPS order differs at 5 positions ⇒ match by normalized name.
- **If repos private:** request re-open/upload of {changed files + master}; else operate on payload + declare staleness window.

---

### 4. DRIFT REGISTER (@2026-07-10 second freeze — full text in payload)
`DR-1`* master internal label v5.1 vs canonical v6 name. `DR-2`* repo's OWN 0X exports lag master (06: no R2 markers, 1,160/3,620 vs 1,220/3,560). `DR-3` 60h ins↔fin only in master. `DR-4`* brick layer absent from canon (∅ grep). `DR-5` v5_2 items absent. `DR-6`↓ substrate-band rendering lag (doctrine settled: B9 Postgres). `DR-7` 04 footer "v5". `DR-8` supply chain: Cosign@A4.5 named, chain ∅ BOTH sides; **CWF working CI = GitHub Actions**; EAIP canon CI unnamed; **CRA clock ≈Sept 2026**. `DR-9` model pins Opus 4.7. `DR-10` ADRs 3× "v0.5". `DR-11` capital-P Prompts/ vs pattern #39; 3 ledger locations. `DR-12` a1 stub "expertise gaps". **`DR-13`** stack divergence — **in-remediation:** SPINE-FRONT ADR drafted v0_1; closes on operator commit + SC-3 seal pass.

---

### 5. OPEN THREADS (resume menu)
1. **R4 seal pass** — DR-1/2/3/6/7/10/12 → one operator-gated content-repo PR-prompt (R-series; acceptance = consistency report).
2. **Merge wave** — brick v0_2 + v5_2 (eval item = **L3 port**) + Dalga 1–4 + **SPINE-FRONT SC-3 edits (A6 amendment EN+TR, E3→wiring relabel)** → v6 master; closes DR-4/5/8/13; label→v6 same pass. Preface = **commit the drafted seam ADR** (operator-gated; number at commit).
3. **Dalga 1 detail** — partially unblocked: CWF precedent = GitHub Actions; EAIP canon CI still unnamed — confirm w/ user before writing provenance mechanics.
4. **G1–G8 live status** — repo stubs only (A1 🔴); truth in Supabase portal; ask before asserting.
5. Housekeeping: DR-11 migration; ADR v1.5 sweep; sovereignty footnote for AWS-hosted Langfuse.

---

### 6. GUARDRAILS (non-negotiable working rules)
Facts before assumptions — read SSoT files before architectural claims; never reason from memory when a source exists. Versioning: `_vN_M` in filename **and** identical internal label; never overwrite. Consistency sweep: enumerate ALL occurrences, edit once, re-grep to prove zero stale. Single-author rule: Claude authors specs/prompts; AG executes; operator-gated merges. Content-repo PRs pure content; specs/lessons → app-repo lowercase `prompts/v0/` (#39). Hashes not byte counts (#19); `_incoming/`+`cp` for coordinate-precise artifacts (#20/#40). Internal artifacts EN; strategic conversation TR. Dense prose, direct verdicts, no fabricated numbers — unvalidated magnitudes `[open:]`.

---

### 7. RESUME POINTER
Load payload v1_2 → confirm staleness window with user → pick thread from §5 → verify per §3 → act. "R4"/"merge wave" ⇒ drift_register + `sota_verdict_v2.gap_list_prioritized` are the authoritative inputs; do not re-audit unless identity checks fail.

*— end v1_2 · 2026-07-10 · author: Claude · companion payload: theblueprint23_knowledge_graph_v1_3.json —*
