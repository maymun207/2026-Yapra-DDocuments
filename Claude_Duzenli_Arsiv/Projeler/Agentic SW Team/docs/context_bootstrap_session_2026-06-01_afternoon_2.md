# Context Bootstrap — TheBluePrint23 D0 COMPLETE → D1 Scoping

> **Type:** Compressed session handoff · **Source session:** 2026-06-01 (afternoon, updated post-D0-close) · **Compressor:** Claude · **Predecessor bootstrap:** `context_bootstrap_session_2026-06-01.md`

---

### 0. NEXT-SESSION LOADER PRIMER

Paste verbatim into new session:

> Read this Context Bootstrap doc + `context_bootstrap.md` + `context_boostrapt_combo_prj.md` + `phase_0_runbook.md` + prior bootstrap `context_bootstrap_session_2026-06-01.md` from the project. Resume as senior full-stack architect, single-author of stage prompts (§5 invariant). Do NOT re-explain or expand this doc unless asked. **Phase D0 is complete** (D0.4d lessons at `c12bfde`). Next action: scope D1 — confirm whether D1 = Revolutionize Phase 1 platform development or D0.5 TheBluePrint23 V1 enhancements, then write the first stage prompt.

---

### 1. CORE SEED & STATE

- **Objective:** Unchanged — ARDICTECH dual-platform program. TheBluePrint23 = V0 meta-tooling SSoT app.
- **Current State:** **Phase D0 COMPLETE.** All 8 routes live, bilingual, filterable connectivity, EAIP architecture with inline click-to-detail. main = `c12bfde` (D0.4d lessons). Next = D1 scoping.
- **Phase D0.3 status:** COMPLETE — all 8 routes live at `theblueprint23.dev`.
- **Phase D0.4 status:** COMPLETE — D0.4a (nav TR) + D0.4b (EAIP conn filter) + D0.4c (Rev conn filter) + D0.4d (EAIP arch detail).
- **Operational Env:** Antigravity (Conductor=Maymun) · Node 22 · Vercel managed · GitHub PR-based · Claude Sonnet 4.6 thinking (default)
- **Identifiers:**
  - Repo: `TheBluePrint23` (private, live)
  - D0.4d lessons: `c12bfde` (PR #16, squash-merged) — **final D0 commit**
  - D0.4c merge: `34e5a5b` (PR #15) · D0.4a: `0abfd1c` (lessons: `4e726be`)
  - D0.3i merge: `0112649` · D0.3h: `7c04df2` · D0.3g: `a83b9ec`
  - Live: `theblueprint23.dev` + `theblueprint23.vercel.app`
  - Prompts archive: `prompts/v0/D0.X-*.md`

---

### 2. TECH STACK & ARCHITECTURAL MAPPING

**Unchanged from prior bootstrap** — Next.js 15 + React 19 + Tailwind 3.4.17 + TS strict + Vercel + dark theme tokens locked.

**Interactivity architecture (established D0.4b):**
```
Server page (async RSC)
  → imports data arrays from app/_data/
  → passes as serializable props to client leaf components
  → client components use useState + useMemo for filter state
  → NO data imports inside 'use client' components (import type only)
```

**Current client component inventory:**
```
app/_components/ui/LanguageToggle.tsx          — lang cookie toggle
app/_components/NavTabs.tsx                    — nav highlight + lang-aware labels
app/_components/MobileMenu.tsx                 — hamburger + lang-aware labels
app/_components/eaip-conn/ConnFilterTable.tsx     — EAIP conn filter (D0.4b)
app/_components/rev-conn/RevConnFilterTable.tsx   — Rev conn filter (D0.4c)
app/_components/eaip-arch/LayerGridClient.tsx     — EAIP arch click-to-detail (D0.4d); absorbs deleted LayerGrid/LayerSection/ComponentRow
```

**Lang plumbing (complete):**
```
getLang() [app/_lib/lang.ts] → cookie read → 'en'|'tr'
Header (async RSC) → lang → LanguageToggle (current), tabLabels + lang → NavTabs + MobileMenu
Server pages → lang + STRINGS[lang].X → client component strings props
NavItem: label, shortLabel (EN), shortLabelTr? (TR, D0.4a), href, tabKey?
```

---

### 3. DOMAIN DICTIONARY (additions since prior bootstrap)

- `ConnFilterTable` / `RevConnFilterTable`: `'use client'` components receiving full connection arrays + connTypes + phases/groups + bilingual strings as props from server. Manage typeFilter + search + phase/groupFilter state. Replace deleted static `ConnTable`/`RevConnTable`.
- `Step 0 (read-before-code)`: Mandatory first step in every data-consuming render prompt — AG reads actual data file field names before writing any component code. Established D0.3d after D0.3c's `layerId`→`layer`/`phaseId`→`phase` mismatch.
- `bound-colors.ts`: Shared non-component TS module in `app/_components/rev-plan/` exporting `BOUND_COLOR: Record<RevPhaseBound, string>`. Pattern: shared constant maps in dedicated module, not duplicated per component.
- `LayerGridClient`: `'use client'` replacement for deleted `LayerGrid.tsx`/`LayerSection.tsx`/`ComponentRow.tsx`. Receives `EAIP_COMPONENTS + LAYERS + PHASES + CONN_TYPES + EAIP_CONNECTIONS` as props from server page. Manages `selectedId: string | null` state. Renders inline detail panel (desc, notes, connections) below clicked component row. Connection lookup uses `component.id` (not name — confirmed D0.4d Step 0).

---

### 4. CRITICAL DECISIONS & RATIONALES (new this session)

24. **Server→client data prop-pass pattern (D0.4b)** → data arrays imported in server page, passed as serializable props to client component; client never imports data modules directly → prevents bundling large data in client JS. (rejected: client imports data directly → bundles 20-40KB data in JS chunk)
25. **Static server ConnTable deleted (not kept alongside client)** → dead code creates confusion; TypeScript build confirms no dangling imports; clean supersession. (rejected: keep both → tech debt immediately)
26. **`import type` only in `'use client'` components** → TypeScript type imports erased at compile time, zero bundle impact; data arrives at runtime as serialized JSON props. (rejected: full import of data modules in client → bundles entire constant)
27. **Bilingual purpose search: both `purposeEn` + `purposeTr`** (D0.4c) → TR-language search term finds connections even in EN display mode; `purposeTr` empty-string fallback to `purposeEn` in table cell. (rejected: search only active-lang purpose → misses cross-lang discovery)
28. **LoopDiagram reused in Bridge route** (D0.3i) → `app/_components/big-picture/LoopDiagram.tsx` imported across directory boundary; already bilingual via STRINGS; zero code duplication. (rejected: recreate SVG → 60+ lines of duplicate code)
29. **Charter bilingual data inline in components** (D0.3i) → `CHARTER_GATES`, `CHARTER_ROUTING`, `CHARTER_RISKS` typed `as const` arrays in component files; no `app/_data/` entry needed for static leadership doc. (rejected: add `bridge-charter.ts` to data layer → requires data stage, isolated module)
30. **`conn.from`/`conn.to` are component IDs not names** (confirmed D0.4d Step 0) → `Connection.from`/`to` store values like `'whatsapp'`, `'gateway'` matching `Component.id`; detail panel lookup: `connections.filter(c => c.from === component.id || c.to === component.id)`. All future cross-reference features must use ID. (assumed: name strings — corrected by AG Step 0 read)

---

### 5. CONSTRAINTS & INVARIANTS (additions/refinements)

All prior invariants STILL HOLD. Pattern Library now **#1-#31**. New entries from this session:

- `#25` Server→client data prop-pass: data modules imported in server RSC, passed as props; client component uses `import type` only
- `#26` `'use client'` component deletion: static server component replaced by interactive client = delete the server file; confirm no dangling imports
- `#27` Step 0 read-before-code: every data-consuming render prompt requires AG to read actual data files, record field names, report in PR body before writing component code
- `#28` Bilingual search: when data has paired `XEn`/`XTr` fields, search both — not just active lang
- `#29` Component reuse across directories: `app/_components/` is a shared namespace; cross-directory imports valid when component is genuinely reusable
- `#30` Shared constant modules: when 3+ components need same color/value map, extract to a named `.ts` module (not `.tsx`); co-locate in the component directory that owns it
- `#31` `SEV_COLOR`/`BOUND_COLOR` scope: severity colors local to leaf; bound colors shared via module — scope by semantic domain, not by convenience

**Confirmed field names (final, D0 closed):**
- `Component`: `id, name, layer, phase, desc, notes?, subOf?` — `adapt` is on `Layer` not `Component`
- `Layer`: `id, name, tag, adapt: boolean`
- `Phase`: `id, color, labelEn, labelTr` — 8 phases (core,wa,gu,cwf1,ins,cwf2,fin,ext)
- `Connection` (EAIP): `from, to, type, proto, purpose, phase` — **`from`/`to` = `Component.id` values** (e.g. `'whatsapp'`, `'gateway'`)
- `ConnType`: `id, color, descEn, descTr`
- `RevConnection`: `from, to, type, proto, purposeEn, purposeTr, group`
- `RevGroup`: `id, labelEn, labelTr` — 5 groups: `gw, mcp, tel, ch, st`
- Component count: **70** (67 top-level + 3 subOf) · Phase count: **8**

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

- **`eaip-gantt.ts` unconsumed**: file exists in `app/_data/`, not rendered anywhere. Deferred — V1 or future stage.
- **Charter deferred sections**: `SKILL`, `KICK`, `OPENS` arrays from `08_leadership_charter_bilingual.html` not rendered in `/bridge`. Deferred.
- **Component.desc / notes TR translation**: EN-only in all current renders. Deferred to dedicated TR translation stage.
- **Visual Gantt bar chart**: `rev-gantt.ts` rendered as text table in D0.3h only. No bar chart yet. Deferred.
- **Detail panel section labels EN-only**: "Description", "Inbound", "Outbound" in `LayerGridClient` are hardcoded EN — no STRINGS key. Deferred.

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Answer the D1 question**: Revolutionize Phase 1 platform dev (first real stage prompts for the autonomous engineering org) vs D0.5 TheBluePrint23 V1 (Supabase auth + edit-as-PR flow)? Maymun decides direction.
2. **Write first D1 (or D0.5) stage prompt** based on answer above.
3. **If D1 = Revolutionize Phase 1**: consult `phase_0_runbook.md` + `dev_schedule_patch_v1.md` + `ADR-001`/`ADR-002` for the stage 1.1.x scope. The Revolutionize Phase 1 groups are in `REV_PHASE1_GROUPS` (1.1–1.7, already extracted).

---

### 8. OPEN QUESTIONS FOR USER

- **D1 direction**: Revolutionize Phase 1 platform development (first real stage prompts for the autonomous engineering org) vs D0.5 TheBluePrint23 V1 (Supabase auth + inline edit-as-PR)? This is the only blocking question before the next session can write its first prompt.
- **Rev Architecture click-to-detail**: The 5 Rev systems with 33 agents have no click-to-expand yet. Mirror of D0.4d for Rev. Queue after D1 direction confirmed.

---

### 9. DIRECTIVE TO NEXT CLAUDE

Do NOT expand, re-explain, or summarize this doc unless asked. Resume from §7 step 1. All §5 invariants non-negotiable. Pattern #21 governing (operator never executes git/CLI). Merge mode declared in every prompt header. AUTHORED-BY tags in all lessons.md sections. Step 0 (read-before-code) mandatory in data-consuming render prompts.

---

### 10. SESSION ARTIFACTS PRODUCED (this session)

Stages executed and merged (this session):
- D0.3e (EAIP Schedule), D0.3f (Rev Architecture), D0.3g (Rev Connectivity), D0.3h (Rev Schedule), D0.3i (Bridge & Charter) — Phase D0.3 complete
- D0.4a (nav short-label TR), D0.4b (EAIP Connectivity filter), D0.4c (Rev Connectivity filter), D0.4d (EAIP Architecture click-to-detail) — **Phase D0.4 complete → Phase D0 COMPLETE**

Stage prompts authored this session (in project outputs):
- `D0.3e-eaip-plan.md`, `D0.3f-rev-arch.md`, `D0.3g-rev-conn.md`, `D0.3h-rev-plan.md`, `D0.3i-bridge-charter.md`
- `D0.4a-nav-short-tr.md`, `D0.4b-eaip-conn-filter.md`, `D0.4c-rev-conn-filter.md`, `D0.4d-eaip-arch-detail.md`

Pattern Library: **#1–#31** (was #1–#24 at start of prior session).
Cumulative D0 stage count: **26 stages merged** across D0.1 → D0.4d.

---

*End of compressed context. Load this doc + prior bootstraps + execute §7 step 1.*
