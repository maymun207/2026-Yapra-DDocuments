# Context Bootstrap — TheBluePrint23 D0.3a Complete → D0.3b Pending

> **Type:** Compressed session handoff · **Source session:** 2026-06-01 · **Compressor:** Claude · **Predecessor bootstrap:** `context_bootstrap_session_2026-05-31.md`

---

### 0. NEXT-SESSION LOADER PRIMER

Paste verbatim into the new Claude session as first message:

> Read this Context Bootstrap doc + `context_bootstrap.md` + `context_boostrapt_combo_prj.md` + `phase_0_runbook.md` + the PRIOR bootstrap `context_bootstrap_session_2026-05-31.md` from the project. Resume as senior full-stack architect, single-author of stage prompts (§5 invariant). Do NOT re-explain or expand this doc unless asked. Next action: hand D0.3b prompt to Maymun for AG execution (file `D0.3b-big-picture-render.md` already written in outputs of prior session — re-output if needed).

---

### 1. CORE SEED & STATE

- **Objective:** Unchanged — ARDICTECH dual-platform program (EAIP product + Revolutionize org), TheBluePrint23 = V0 meta-tooling SSoT app.
- **Current State:** TheBluePrint23 at `D0.3a complete`. `main` contains D0.1 + D0.2 + D0.2.1 + D0.3a.{1, 2, 2.1, 3}. Site renders 8-route shell with V0.2 placeholders on all routes. Data layer FULLY populated: 17 typed modules in `app/_data/`. Next stage = **D0.3b** (Big Picture render, first visible-change stage, prompt written and ready, NOT YET EXECUTED). Operator-gated merge mode.
- **Operational Env:** Antigravity (Conductor=Maymun, AG executes ALL git/GitHub/filesystem ops · Pattern #21) · Node 22 · Vercel managed deploy · GitHub (PR-based workflow, AG opens/merges) · Anthropic Claude Sonnet 4.6 thinking (default) · Gemini 2.5 Pro (one stage tested, also clean)
- **Identifiers:**
  - Repo: `TheBluePrint23` (private, V0 live)
  - Last main SHA (D0.3a.3 merge): `1a4d183`
  - Live URLs: `theblueprint23.dev` + `theblueprint23.vercel.app` (Vercel auto-deploy from `main`)
  - Prompts archive: `prompts/v0/D0.X-*.md` (committed by AG)
  - Source HTML files staged: `docs/_source/v5_ssot.html` + `docs/_source/v6_ssot_bilingual.html`
  - PRs so far: PR#1 (D0.1), PR#2 (D0.2), PR#3 (D0.3a.1), PR#4 (D0.3a.2+D0.3a.2.1 combined branch), PR#5 implicit (D0.3a.3, AG auto-merged at `1a4d183`)

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**Unchanged from prior bootstrap** — Next.js 15 + React 19 + Tailwind 3.4.17 + TS strict + Vercel + dark theme tokens locked.

**Data layer now populated (17 modules under `app/_data/`):**

```
SHARED (D0.3a.1):
  types.ts           — Layer, Phase, ConnType, Component, Connection, ConfigKey, Deploy + Lang
                      ConnTypeId UNION GROWN to 20 members across stages:
                      EAIP 16: REST,MCP,WS,KAFKA,CDC,OIDC,GRPC,S3,WEBHOOK,PSQL,SDK,GRAPH,JDBC,OTEL,SMB,HTTP
                      Rev 4 added in D0.3a.3: IN-PROC,MMAP,VAULT,GIT
                      PhaseId UNION GROWN to 8: core,wa,gu,cwf1,ins,cwf2,fin + 'ext' (added D0.3a.2.1)
                      Component gained: subOf?:string (added D0.3a.2.1)
  i18n.ts            — STRINGS:Record<Lang,StringsForLang>, 161 keys total (EN/TR)
  layers.ts          — LAYERS:Layer[] × 10 (L0-L9, adapt backfilled from v5)
  phases.ts          — PHASES:Phase[] × 8 (7 product + ext, colors hex)
  conn-types.ts      — CONN_TYPES:ConnType[] × 16 (EAIP context descriptions)

EAIP (D0.3a.2 + D0.3a.2.1):
  eaip-components.ts — EAIP_COMPONENTS × 70 (67 originals + 3 sub-stubs: prometheus→grafana, redpanda→debezium, falkordb→graphiti)
  eaip-connections.ts— EAIP_CONNECTIONS × 100, ALL referentially clean
  eaip-plan.ts       — EaipPlan local type, 7 phases × 42 tasks
  eaip-gantt.ts      — EaipGanttRow local type, 7 timeline rows

REVOLUTIONIZE (D0.3a.3):
  rev-systems.ts     — REV_SYSTEMS × 5 (Vision/Execution/Verification/Reality/Meta) w/ RevAgent discriminated union (agent|divider)
  rev-conn-types.ts  — REV_CONN_TYPES × 12 (Revolutionize-context descriptions; some IDs shared with EAIP)
  rev-groups.ts      — REV_GROUPS × 5 (gw|mcp|tel|ch|st)
  rev-connections.ts — REV_CONNECTIONS × 40 (name-based refs, not id-based — DIFFERENT from EAIP)
  rev-phase1-groups.ts — REV_PHASE1_GROUPS × 7, order [1.1,1.2,1.3,1.4,1.7,1.5,1.6] intentional
  rev-phases.ts      — REV_PHASES × 7 (Phase 2-8; Phase 1 detail in rev-phase1-groups)
  rev-opens.ts       — REV_OPENS × 5 (①-⑤ pre-conditions)
  rev-gantt.ts       — REV_GANTT × 8 (Phase 1-8 with impl|mix|cal bound)
```

**Render layer state:**
- `app/page.tsx` = V0.2 placeholder hero (will be replaced in D0.3b)
- `app/eaip/*`, `app/revolutionize/*`, `app/bridge/page.tsx` = V0.2 placeholders (untouched until D0.4+)
- `app/_components/`: Header, NavTabs, MobileMenu (D0.2.1 three-tier responsive: 2xl=full / lg=short / <lg=hamburger)
- `app/_lib/nav.ts` = NAV_ITEMS × 8 with label + shortLabel + href

---

### 3. DOMAIN DICTIONARY (additions to prior)

- `Pattern Library`: Now contains entries #1-#24 (was #1 at prior bootstrap). Entries #11-#24 listed in §5.
- `subOf`: Optional `Component` field referencing parent `id`; signals sub-component (prometheus|redpanda|falkordb).
- `ext phase`: 8th `PhaseId` member for L8/L9 external adapters (MariaDB, IoT-Ignite, ARMES, Exchange, ARU/KARU, SMB, SAP, SharePoint, Salesforce, Netaş). Color `#6E7681` (gray-3).
- `RevAgent`: Discriminated union `{kind:'agent',name,llm} | {kind:'divider',labelEn,labelTr}` — preserves v6's inline v1/v2 dividers in agent rosters.
- `Merge mode (hybrid C)`: Stage prompts now declare `Merge mode:` in header. `auto` = data-only stages, AG merges after acceptance. `operator-gated` = render/UX stages, AG opens PR + stops, operator approves via message, AG then merges.
- `AUTHORED-BY tag`: Lessons.md sections now carry explicit `AUTHORED-BY: AG | Maymun | Claude` headers to prevent AG drafting Claude's prompt-author retrospective.
- `vm-extraction technique`: Node `vm` module sandbox to evaluate v6 `<script>` content, extract data variables, generate TS modules. Introduced by Gemini in D0.3a.2. Reusable for any v6 data patch. Variant: line-range slicing (467-595) needed when source interleaves data + functions.

---

### 4. CRITICAL DECISIONS & RATIONALES (new this session)

13. **D0.3 split: D0.3a (data extraction) + D0.3b (Big Picture render) + later D0.4+ (per-tab UX)** → clean separation of data shape vs render concerns; data work auto-mergeable, render work operator-gated. (rejected: monolithic D0.3 → muddied lessons attribution)
14. **D0.3a further split into D0.3a.{1,2,3}** → types-first contract locks before payload arrives; EAIP vs Revolutionize as separate stages because they pull from different sources (v5 vs v6) (rejected: single D0.3a → too large for one prompt)
15. **D0.3a.2.1 patch stage after D0.3a.2** → close `ext` phase orphan + 3 dangling sub-component refs surfaced by D0.3a.2's extraction; pattern = "extraction stage flags reality-vs-schema gaps in lessons.md, immediate point-patch resolves them" (rejected: fold cleanup into D0.4 → pollutes UX stage)
16. **Source-of-truth assignment locked per dict** → v5 wins for EAIP depth (COMPS, CONNECTIONS.purpose); v6 wins for bilingual + Revolutionize + shared dicts (LAYERS, PHASES, CTYPES, T) (rejected: v6-only → loses 67-component detail; rejected: v5-only → loses Revolutionize side)
17. **TR translation deferred to dedicated later stage** → v5 prose (Component.desc/notes, ConfigKey.n, Connection.purpose) EN-only in TS modules; bilingual editorial work warrants TR-native review (rejected: machine-translate inline → low quality)
18. **Pattern #11 — prompts describe outcomes, not operator commands** → AG handles all git/bash/GitHub natively; Maymun reviews diffs, doesn't run commands. Stage prompts strip operator-facing procedural content. Effective from D0.3a.2 onward. (rejected: keep operator commands → wasted ~80 lines/prompt of pollution, prone to manual error)
19. **Pattern #21 — Operator never executes git/GitHub/CLI commands** → elevated from #11 to top-tier invariant after Maymun explicit ALL-CAPS directive. AG executes every PR open/merge/branch action. Operator's "review gate" = reading diffs, not clicking buttons. (rejected: manual merge button click → inefficient + error-prone)
20. **Hybrid merge mode C (data auto-merge, UX operator-gated)** → mechanical data stages have exhaustive acceptance criteria that ARE the review; UX/render stages need visual review no automation covers. Stage prompts declare mode in header. (rejected A full-auto → skips visual review on UX; rejected B full-gate → unnecessary friction on data work)
21. **§13 lessons.md template gained AUTHORED-BY tags + 4-question post-mortem made explicit** → AG was drafting Claude's section despite section names; tags make ownership structural. AG's section requested to answer 4 questions explicitly. (rejected: emphatic "MUST" language → didn't work)
22. **Combined-PR variant accepted: pre-merge patches add commits to open PR; post-merge patches need new PR** → D0.3a.2.1 added commits to PR #4 rather than opening PR #5, cleanly atomic merge of both stages.
23. **No render-time count computation** → D0.3b copy ("67 components", "10 layers") read verbatim from STRINGS, not computed from data arrays. Author-curated copy survives data evolution. (rejected: `EAIP_COMPONENTS.length` dynamic render → fragile when data grows)

---

### 5. CONSTRAINTS & INVARIANTS (additions/refinements)

* All prior invariants from prior bootstrap **STILL HOLD**.
* **Pattern Library entries #1-#24** are institutional record. New entries this session:
  - `#2` RSC/client leaf-level toggle idiom (Header RSC, NavTabs/MobileMenu client)
  - `#3` SSoT-nav-array idiom (`app/_lib/nav.ts` consumed by all nav components)
  - `#4` Layout acceptance criteria must include explicit viewport-width visual checks
  - `#5` Lessons.md is three-author; AG self-grade alone has structural bias
  - `#6` Stage prompt `model` field is advisory; substitution log in lessons.md
  - `#7` Three-tier responsive label idiom (label + shortLabel; `2xl:` swap; hamburger below `lg:`)
  - `#8` File count is a reasonable size proxy for stages
  - `#9` Layout acceptance criteria must include positive computed-style assertions
  - `#10` model_recommended/model_used split in lessons.md
  - `#11` Prompts describe outcomes, not operator commands (deprecates prior bash-command prompts)
  - `#12` Data extraction stages start with types.ts
  - `#13` Source-of-truth assignment explicit per dict
  - `#14` Bilingual surface area scales with key count
  - `#15` AG self-report is delivery summary, NOT self-graded post-mortem
  - `#16` `subOf?: string` for sub-component modeling in flat array
  - `#17` Neutral gray `#6E7681` for external/adapter phase entries
  - `#18` Two-stage data-patch pattern (extraction → point-patch)
  - `#19` Pre-merge patches add to open PR; post-merge patches new PR
  - `#20` Claude's section in lessons.md; AG must not fill (AUTHORED-BY tags)
  - **`#21` OPERATOR NEVER EXECUTES git/GitHub/CLI commands** (top-tier, governs all D0.X)
  - `#22` vm line-range extraction (when source mixes data + functions)
  - `#23` Inline discriminated unions for divider rows in flat arrays
  - `#24` ConnTypeId is a cross-platform vocabulary, not platform-specific
* **§5 review gate (≥30min, no rubber-stamp)** = reviewing the diff + Vercel preview, NOT clicking merge button. Merge action is always AG's. Human gate is *informed approval signal*.
* **Lessons.md three-section contract: AG self-report + Maymun operator review + Claude prompt-author retrospective.** Section ownership tagged. AG fills only its own.
* **Data layer locked from external edits.** Changes to `app/_data/*` require a dedicated stage with explicit type-evolution justification in lessons.md.

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

**Active items unique to this session:**
- D0.3b prompt written (255 lines, operator-gated mode) but NOT executed yet. File at `outputs/D0.3b-big-picture-render.md`.
- D0.3b will be the FIRST stage exercising operator-gated merge in production — workflow shape needs to hold (AG opens PR + stops, operator approves, AG merges).
- Language toggle (EN/TR) deferred to D0.3b.1 (sized S, infra-only). Data is already bilingual-ready in i18n.ts.
- D0.3a.2-lessons.md operator-review section may still be `[pending]` — pre-D0.3a.3 spot-checks were never formally archived in the operator section. Non-blocking but should be backfilled.
- D0.3a.3-lessons.md may also need Claude's retrospective added (drafted post-merge per template).

**Carry-forward from prior bootstrap (still TBD):**
- OPEN prereq #1 (first product: Web Asistan widget vs CWF audit PDF)
- OPEN prereq #2 (SOUL.md founder = Maymun confirmation)
- OPEN prereq #3 (quarterly LLM budget number)
- OPEN prereq #5 (expertise gaps consultants)
- GitHub MCP not connected (still optional; AG handles git/GitHub natively so less urgent than thought at prior bootstrap)
- Phase 0 runbook CTO redline still pending
- `make dev-up` local stack not designed
- Supabase MCP not connected (needed before V1)

**Model calibration cumulative:**
- Sonnet 4.6 thinking: D0.1, D0.2, D0.2.1, D0.3a.1, D0.3a.2.1, D0.3a.3 — 6 stages, all clean
- Gemini 2.5 Pro: D0.3a.2 only — 1 stage clean, introduced vm-extraction technique
- Recommendation: stay on Sonnet thinking for consistency; deliberate A/B only when justified

**Connection-target externals (informational, from D0.3a.3):**
- Many `REV_CONNECTIONS.to` values are external surfaces (LLM providers, MCP servers, Postgres) not in the agent set — this is design intent, not bugs. List was enumerated in D0.3a.3 lessons.md self-report.

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Maymun queues `D0.3b-big-picture-render.md` in Antigravity** → AG executes (operator-gated mode), opens PR, runs §6 acceptance, reports, **stops**.
2. **Maymun reviews Vercel preview at 5 viewports (1920/1366/1100/1023/375)** → confirms §6 visual checks, sends approval message to AG.
3. **AG merges D0.3b PR** → Vercel auto-deploys → first visible-change live at `theblueprint23.dev`.
4. **Lessons.md D0.3b** → AG drafts self-report; Maymun fills operator review; Claude appends prompt-author retrospective (when prepping D0.3b.1 or D0.3c).
5. **Decide D0.3b.1 (language toggle) vs D0.4 (EAIP Architecture with click-to-detail panel) order** → recommendation: D0.3b.1 first because every later tab benefits from i18n infra; D0.4 second because it's the first heavy UX stage (Qdrant-screenshot-style detail panel) and validates the data layer end-to-end.
6. **D0.4 will be M-sized minimum** → 10-layer stack render + 70-component grid + click → right-slide detail panel showing deploy/config/inbound/outbound. Operator-gated merge mode.

---

### 8. OPEN QUESTIONS FOR USER

- D0.3b execution timing: this week?
- D0.3b.1 (language toggle) priority: before or after D0.4?
- Whether to backfill empty `[pending]` operator-review sections in earlier lessons.md files retroactively, or treat them as acceptable institutional gaps (recommendation: leave them, note convention going forward)
- Carry-forward 4 OPEN prereqs from prior bootstrap — same status, awaiting Maymun + CTO sync.
- New compressed doc → upload to project knowledge (recommended)?

---

### 9. DIRECTIVE TO NEXT CLAUDE

Do NOT expand, re-explain, or summarize this doc unless explicitly asked. Resume work from §7 step 1 unless redirected. Treat §5 invariants as non-negotiable. **Pattern #21 is governing**: never include operator-facing git/GitHub/bash commands in any prompt or message unless deadly critical. **Merge mode declarations**: every new D0.X prompt must declare `Merge mode: auto | operator-gated` in its header. **Lessons.md AUTHORED-BY tags**: maintained on every section.

If a request conflicts with §5 invariants or Pattern #21, surface the conflict before complying.

---

### 10. SESSION ARTIFACTS PRODUCED (reference)

Files created during this source session (in outputs):
- `D0.2-layout-shell.md` (289 lines, executed)
- `D0.2.1-responsive-nav-patch.md` (255 lines, executed)
- `D0.2-lessons-retroactive-sections.md` (66 lines, operator + prompt-author sections)
- `D0.2.1-lessons.md` (95 lines, three-section)
- `D0.3a.1-types-i18n-shared.md` (433 lines, executed)
- `D0.3a.1-lessons.md` (102 lines, three-section)
- `D0.3a.2-eaip-deep-data.md` (189 lines, executed)
- `D0.3a.2.1-close-eaip-integrity.md` (234 lines, executed)
- `D0.3a.2.1-lessons.md` (95 lines, three-section)
- `D0.3a.3-rev-data.md` (344 lines, executed)
- `D0.3b-big-picture-render.md` (255 lines, **NOT EXECUTED** — pending)
- This document

Cumulative stage count: 7 stages merged (D0.1, D0.2, D0.2.1, D0.3a.1, D0.3a.2, D0.3a.2.1, D0.3a.3) + 1 pending (D0.3b).
Pattern Library count: 24 entries.

---

*End of compressed context. Reader: load source docs from project + prior bootstrap + execute §7 step 1.*
