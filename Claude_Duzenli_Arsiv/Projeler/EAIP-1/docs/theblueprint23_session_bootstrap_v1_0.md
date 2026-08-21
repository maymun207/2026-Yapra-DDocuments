# Session Bootstrap — TheBluePrint23 / EAIP + Revolutionize Program (v1_0)

> Shorthand: `→` leads to | `⇒` results in | `↔` bidirectional | `w/` with | `≈` approx | `[A]:[B]` repo:path | `{x,y}` set | `*` critical/blocker | `DR-n` drift-register item

---

### 0. NEXT-SESSION LOADER PRIMER
You are Claude — senior full-stack architect for Maymun / ARDICTECH, resuming the TheBluePrint23 program. Treat this doc as the **index**, and `theblueprint23_knowledge_graph_v1_1.json` (same project knowledge) as the **payload** — do not re-derive what the JSON already holds. **Verify-before-trust protocol:** repos may have advanced since 2026-07-10; before asserting repo state, (a) ask user to re-open/upload, or (b) if accessible, run §3 identity checks. Facts here are pinned to: app `eed2d09` · content `ba8952f` · cwf_yaprak `dabc29e` · master md5 `8a0591cf765227b57c127b48fa8c730b`. Resume posture: read §5 open threads, confirm which thread the user wants, act.

---

### 1. CORE STATE (one screen)
- **One loop, two planes:** Revolutionize (how we build: conductor → Claude prompts → AG executes → gated merge) ships verified PRs → **EAIP** (what we build: Web Asistan · Galip Usta · CWF · Insurance/Türk Re · Astra); EAIP telemetry → reality feed → Revolutionize. First tenant: **Kale Seramik (CWF, live Dec 2026 = M7)**.
- **Canon (LOCKED 2026-06-02, `docs/decisions/CANONICAL_RECONCILIATION_v1.md`):** M1=June 2026 ⇒ M7=Dec 2026 ⇒ M13=Jun 2027; program=M1–M7 (5 deliverables incl. Insurance v0.8); M8–M13 (CWF v2 + Astra) = 2027, outside program. Version model **v1→v1.5→v2** (v0.5 retired). Prereqs: 5-set, **4 OPEN** (①first product ②SOUL.md ③LLM budget ⑤capabilities), ④ resolved-by-bridge.
- **Charter amendments CA-1…7** (in `08_…charter…html`, via S2g-R2): CA-1 *honesty clause* — CWF v1 delivered by Takım-2 HUMANS; no CWF dependency on Rev phase ≥2; bridge first exercised ≥Phase-4 shadow. CA-6 reality-feed cold start (no prod data <M5–M7; no autonomy claims <M10). CA-7 technical safety = branch protection + per-agent token caps (=G2/G3).
- **Phase-1 entry gate G1–G8** (program_plan v1.1 Part II): Fri Week-1 16:00, single red = no start. G4 default first product = **Web Asistan widget**.
- **EAIP data layer (master):** 10 layers · 67 components · 100 connections · 16 protocols · plan A–G ≈12,060h (master: ins=1,220/fin=3,560). **Rev plane:** 5 systems · 33 mapped components · 40 connections (12 types incl IN-PROC/MMAP/VAULT/GIT) · 8 phases (Phase-1 backlog decomposed, 1.6 gated by OPEN ①).
- **Master file identity:** canonical name = `ARDICTECH_Platform_v6_SSoT_bilingual.html` (v6 filename INTENTIONAL — ssoFrame `SSOT_PATH` + R1 both say "v6 master"); internal label still "v5.1 · 10 Jun 2026" (=DR-1). Seal commit `24dc7e6` (PR#9, 2026-06-10): "sequence locked, D8 federation, Graphiti/Temporal gates, MariaDB scope".
- **Site:** theblueprint23.dev (Vercel) — 11 tabs; Phase-0 portal approvals SHA-pinned in Supabase (approved→stale on content HEAD advance).
- **Outside canon (merge wave pending, =DR-4/5/8):** Brick v0_2 (Talos D1–D5, fleet-control, tenancy/telemetry tiers) + v5_2 SOTA gaps (eval harness, query gate, pooled/Keycloak Organizations) + Dalga 1–4 (supply-chain chain-of-custody, backup ownership, CUE brick contract, release-train brakes, pooled enforcement) = **0 hits repo-wide** in content repo.

---

### 2. SOURCE MAP (where every fact lives)
| Source | Access | Contains |
|---|---|---|
| `theblueprint23_knowledge_graph_v1_1.json` (project knowledge + `/mnt/user-data/outputs/`) | direct | FULL payload: meta/provenance, canon(+CA+G-gates), eaip{layers,components_index,components_detail,connections,plan}, revolutionize{systems,connections,phases,phase1_backlog,opens}, governance{phase0 26 items, library 15 docs, patterns, ADRs, program_plan, seal}, stage_ledger(+SHAs), drift_register DR-1…12, edges |
| `agbuilder-platform/revolutionize` (content repo, **private by default**) | ask user → open/upload | CANON: `docs/architecture/{01..08, v6 master, big_picture_bilingual, context_boostrapt_combo_prj.md}` · `docs/phase0/{manifest.json, a1–a7,b1–b15,c1–c3,r1}` · `docs/library/{manifest.json, phase_0_runbook, dev_schedule_patch_v1, program_plan_…v1_1}` · `docs/decisions/CANONICAL_RECONCILIATION_v1.md` · `docs/pattern_library/INDEX.md` (#11–#40) · `adrs/ADR-001,002` · lessons ledgers (root + docs/process) |
| `maymun207/TheBluePrint23` (app repo) | ask user | Next.js app; `app/_lib/{github.ts→GITHUB_REPO, ssoFrame.ts→SSOT_PATH/CHARTER_PATH}`; `app/_data/{types,resources(LOCKED role-effort: AI 6,380/52.9% …),manifest-types,library-types}`; `prompts/v0/` stage specs+lessons (D0.x, R1, S-series) |
| v6 master HTML (project uploads may hold a copy) | direct if uploaded | 22 embedded JS data vars — see §3 extraction recipe; ssoFrame injections (Astra pistachio, HOTPATH, 3 mermaid.ai links) |
| This Claude project `/mnt/project/` | direct | ARDICTECH strategy corpus: v5_1 SSoT, brick v0_2, GU/CWF/ARMES/insurance artifacts, changeset v5_1, business models |
| `maymun207/cwf_yaprak` | ask user | Living-Architecture precedent: `public/architecture/{index.html,manifest.json,facts.json-gen}` + `scripts/{genArchitectureFacts,checkDocDrift}` |

---

### 3. ACCESS & VERIFICATION RECIPES
- **Clone (when opened):** `git clone --depth=50 https://github.com/agbuilder-platform/revolutionize.git` (depth≥5 per user rule; API unauth = rate-limited → prefer clone).
- **Identity check before trusting any local/uploaded master:** `md5sum ARDICTECH_Platform_v6_SSoT_bilingual.html` ⇒ `8a0591cf…` = state-as-of-2026-07-10; mismatch ⇒ repo advanced ⇒ re-extract + re-grep before claims.
- **Marker greps (drift re-check):** `grep -rli "Talos\|brick\|eval harness\|pooled\|SBOM\|Kyverno" docs/ adrs/` (expect ∅ until merge wave) · `grep -o "M1 = June\|hrs:1220\|hrs:1160" docs/architecture/06…` (export staleness) · `grep -rn "v0\.5" adrs/` (DR-10 residue).
- **Master var extraction (the 22 data vars → JSON):** slice each `var NAME=` block to the next `^var [A-Z]+=` boundary (regex `\bvar\s+([A-Z][A-Z0-9_]+)\s*=`), concat, append Node dump `fs.writeFileSync(k+'.json', JSON.stringify(v))`, run `node`. Names: `LAYERS COMPS COMPDATA EPH CTYPES ECONN EPLAN GANTT EROLE RSYS RCTYPES RGROUPS RCONN RGRP_P1 RPH RPHM RGANTT ROPENS MT RCOMP_PHASE OWNER_COLOR SCHEDULE_NOTE_V51`. ⚠ naive bracket-walkers break on embedded `</script>` strings (pattern #16); boundary-slicing is the proven method. COMPDATA key order ≠ COMPS order at 5 positions ⇒ match by normalized name.
- **If repos private (default):** request from user, in priority: content-repo re-open **or** upload of {changed files + v6 master}; else operate on KG JSON + declare staleness window explicitly.

---

### 4. DRIFT REGISTER (state @2026-07-10 — full text in KG JSON)
`DR-1`* master internal label v5.1 vs canonical v6 name → seal pass. `DR-2`* repo's OWN 0X exports lag master (06: no R2 markers, ins 1,160/fin 3,620 vs master 1,220/3,560) → regenerate-or-demote. `DR-3` 60h ins↔fin encoded only in master. `DR-4`* brick layer absent from canon (grep-verified ∅). `DR-5` v5_2 gap items absent. `DR-6`↓ substrate-band rendering lag only (doctrine settled: B9 Postgres; big_picture shows Qdrant·PostgreSQL + Galera live). `DR-7` 04 footer "v5". `DR-8` Cosign@A4.5 present, SBOM/SLSA/Kyverno ∅; A1 plain K8s; **CI engine unnamed (open question to user)**. `DR-9` model pins Opus 4.7. `DR-10` ADRs carry 3× "v0.5" (outside R1's docs/ scope, but Library-served). `DR-11` capital-P `Prompts/` at content root violates pattern #39; 3 lessons-ledger locations. `DR-12` a1 stub says "expertise gaps" (canonical: "required capabilities").

---

### 5. OPEN THREADS (resume menu)
1. **R4 seal pass** — convert DR-1/2/3/6/7/10/12 into one operator-gated content-repo PR-prompt (R-series format; acceptance = consistency report, "prove not assert").
2. **Merge wave** — brick v0_2 (D1 Talos pilot-gated/RKE2 fallback · D2 no-Rancher · D3 Omni-deferred-BSL · D4 fleet pull-only · D5 sealed-NOC) + v5_2 changeset + Dalga 1–4 into v6 master; closes DR-4/5/8; bump internal label to v6 in same pass.
3. **Dalga 1 detail blocked on:** CI engine identity (user never answered) — provenance/signing mechanics depend on it.
4. **G1–G8 live status** — repo shows stubs only (A1 🔴); real statuses in Supabase portal; ask user before asserting gate state.
5. Housekeeping candidates: DR-11 migration; ADR v1.5 sweep.

---

### 6. GUARDRAILS (non-negotiable working rules)
Facts before assumptions — read SSoT files before architectural claims; never reason from memory when a source exists. Versioning: `_vN_M` in filename **and** identical internal label; never overwrite. Consistency sweep: enumerate ALL occurrences before editing any cross-referenced value; re-grep to prove zero stale. Single-author rule: Claude authors specs/prompts; AG executes; operator-gated merges. Content-repo PRs stay pure content; stage specs/lessons → app-repo lowercase `prompts/v0/` (pattern #39). Hashes not byte counts (#19); coordinate-precise artifacts via `_incoming/`+`cp` (#20/#40). Internal artifacts EN; strategic conversation TR. Dense prose, direct verdicts, no fabricated numbers — unvalidated magnitudes flagged `[open:]`.

---

### 7. RESUME POINTER
Load KG JSON → confirm staleness window with user → pick thread from §5 → verify per §3 → act. If user says "R4" or "merge wave", the drift_register in the JSON is the authoritative input; do not re-audit from scratch unless identity checks fail.

*— end v1_0 · 2026-07-10 · author: Claude · companion payload: theblueprint23_knowledge_graph_v1_1.json —*
