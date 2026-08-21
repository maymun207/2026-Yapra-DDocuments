# Context Bootstrap — TheBluePrint23 D0.3 Complete → D0.4 Interactivity

> **Type:** Compressed session handoff · **Source session:** 2026-06-01 (afternoon) · **Compressor:** Claude · **Predecessor bootstrap:** `context_bootstrap_session_2026-06-01.md`

---

### 0. NEXT-SESSION LOADER PRIMER

Paste verbatim into new session:

> Read this Context Bootstrap doc + `context_bootstrap.md` + `context_boostrapt_combo_prj.md` + `phase_0_runbook.md` + prior bootstrap `context_bootstrap_session_2026-06-01.md` from the project. Resume as senior full-stack architect, single-author of stage prompts (§5 invariant). Do NOT re-explain or expand this doc unless asked. Next action: confirm D0.4c merged (check main SHA), then write D0.4d prompt — the final D0 stage.

---

### 1. CORE SEED & STATE

- **Objective:** Unchanged — ARDICTECH dual-platform program. TheBluePrint23 = V0 meta-tooling SSoT app.
- **Current State:** D0.4c (Rev Connectivity filter) executing with AG — in-progress or just merged. After D0.4c merges, **1 stage remains**: D0.4d (EAIP Architecture click-to-detail). That closes D0 entirely.
- **Phase D0.3 status:** COMPLETE — all 8 routes live at `theblueprint23.dev`.
- **Operational Env:** Antigravity (Conductor=Maymun) · Node 22 · Vercel managed · GitHub PR-based · Claude Sonnet 4.6 thinking (default)
- **Identifiers:**
  - Repo: `TheBluePrint23` (private, live)
  - D0.4a merge SHA: `0abfd1c` (lessons: `4e726be`)
  - D0.4b merge: confirmed merged (PR #14, exact SHA not captured)
  - D0.4c: in-progress (check current main SHA on next session load)
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
app/_components/eaip-conn/ConnFilterTable.tsx  — EAIP conn filter (D0.4b)
app/_components/rev-conn/RevConnFilterTable.tsx — Rev conn filter (D0.4c)
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
- `D0.4d`: Final D0 stage — EAIP Architecture click-to-detail panel. LayerGrid/LayerSection/ComponentRow → client components; server page passes `EAIP_COMPONENTS + LAYERS + PHASES + EAIP_CONNECTIONS` as props; `LayerGrid` manages `selectedComponent` state + renders detail panel.

---

### 4. CRITICAL DECISIONS & RATIONALES (new this session)

24. **Server→client data prop-pass pattern (D0.4b)** → data arrays imported in server page, passed as serializable props to client component; client never imports data modules directly → prevents bundling large data in client JS. (rejected: client imports data directly → bundles 20-40KB data in JS chunk)
25. **Static server ConnTable deleted (not kept alongside client)** → dead code creates confusion; TypeScript build confirms no dangling imports; clean supersession. (rejected: keep both → tech debt immediately)
26. **`import type` only in `'use client'` components** → TypeScript type imports erased at compile time, zero bundle impact; data arrives at runtime as serialized JSON props. (rejected: full import of data modules in client → bundles entire constant)
27. **Bilingual purpose search: both `purposeEn` + `purposeTr`** (D0.4c) → TR-language search term finds connections even in EN display mode; `purposeTr` empty-string fallback to `purposeEn` in table cell. (rejected: search only active-lang purpose → misses cross-lang discovery)
28. **LoopDiagram reused in Bridge route** (D0.3i) → `app/_components/big-picture/LoopDiagram.tsx` imported across directory boundary; already bilingual via STRINGS; zero code duplication. (rejected: recreate SVG → 60+ lines of duplicate code)
29. **Charter bilingual data inline in components** (D0.3i) → `CHARTER_GATES`, `CHARTER_ROUTING`, `CHARTER_RISKS` typed `as const` arrays in component files; no `app/_data/` entry needed for static leadership doc. (rejected: add `bridge-charter.ts` to data layer → requires data stage, isolated module)

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

**Confirmed field names (load-bearing for D0.4d):**
- `Component`: `id, name, layer, phase, desc, notes?, adapt: false (on Layer, not Component), subOf?`
- `Layer`: `id, name, tag, adapt: boolean`
- `Phase`: `id, color, labelEn, labelTr` — 8 phases (core,wa,gu,cwf1,ins,cwf2,fin,ext)
- `Connection` (EAIP): `from, to, type, proto, purpose, phase`
- `ConnType`: `id, color, descEn, descTr`
- Component count: **70** (67 top-level + 3 subOf entries)
- Phase count: **8** (ext phase added D0.3a.2.1, 10 ext components)

**D0.4d architecture (pre-decided, ready to prompt):**
```
Server page (EaipArchitecturePage):
  imports: EAIP_COMPONENTS, LAYERS, PHASES, EAIP_CONNECTIONS
  renders: <EaipArchHero lang> (unchanged, server)
           <LayerGridClient components={...} layers={...} phases={...} connections={...} lang={lang} />
           <EaipArchNote lang> (unchanged, server)

LayerGridClient ('use client'):
  props: components, layers, phases, connections, lang
  state: selectedComponent: Component | null
  renders: layer sections + ComponentRow (with onClick → setSelectedComponent)
           + ComponentDetailPanel (slide-in or below selection, shows desc/notes/connections)

ComponentDetailPanel: shows name, layer name, phase badge, desc, notes, inbound+outbound connections
```
- LayerSection, ComponentRow → become functions inside LayerGridClient (or thin client components)
- No new deps — Tailwind transition for panel open/close
- EAIP_CONNECTIONS cross-referenced by `conn.from` / `conn.to` matching `component.name`
- Panel closes on Escape key or clicking background (standard accessible modal behavior)

---

### 6. BLOCKED POINTS, EDGE CASES, TECH DEBT

- **D0.4c** (Rev Connectivity filter): currently executing with AG. If already merged when next session loads, proceed directly to D0.4d. If still in PR → check Vercel preview + approve.
- **`eaip-gantt.ts` unconsumed**: file exists in `app/_data/`, not rendered anywhere. Deferred — D0.4+ or V1.
- **Charter deferred sections**: `SKILL`, `KICK`, `OPENS` arrays from `08_leadership_charter_bilingual.html` not rendered in `/bridge`. Deferred.
- **Component.desc / notes TR translation**: EN-only in all current renders. Deferred to dedicated TR translation stage (D0.5+).
- **`eaip-gantt.ts`** rendered as text table in D0.3h — no visual Gantt bar chart. Deferred.
- **D0.4d `conn.from`/`conn.to` as names, not IDs**: EAIP connections reference components by name string (`conn.from === component.name`). Cross-reference in detail panel: `connections.filter(c => c.from === component.name || c.to === component.name)`. Case-sensitivity: likely exact match (extracted verbatim from v5 source).

---

### 7. IMMEDIATE NEXT STEPS (SEQUENTIAL)

1. **Confirm D0.4c status** → check if PR merged (look at main SHA). If merged: proceed. If still open: approve first.
2. **Write D0.4d prompt** (EAIP Architecture click-to-detail) → architecture pre-decided in §5. L-sized. Operator-gated. Model: Sonnet 4.6 thinking.
3. **Execute D0.4d via AG** → operator reviews detail panel at multiple viewports + keyboard accessibility.
4. **After D0.4d merge: D0 COMPLETE** → generate D0 completion context bootstrap + begin D1 scoping.

---

### 8. OPEN QUESTIONS FOR USER

- **D0.4d detail panel UX preference**: slide-over panel (right side, overlays content) vs inline expansion below selected component vs bottom sheet on mobile? Recommendation: slide-over on desktop + bottom sheet on mobile (standard reference-app pattern).
- **After D0 complete**: does D1 = Revolutionize platform development (Phase 1 stages), or is there a D0.5 (TheBluePrint23 V1 with Supabase auth + edit-as-PR flow)?

---

### 9. DIRECTIVE TO NEXT CLAUDE

Do NOT expand, re-explain, or summarize this doc unless asked. Resume from §7 step 1. All §5 invariants non-negotiable. Pattern #21 governing (operator never executes git/CLI). Merge mode declared in every prompt header. AUTHORED-BY tags in all lessons.md sections. Step 0 (read-before-code) mandatory in data-consuming render prompts.

---

### 10. SESSION ARTIFACTS PRODUCED (this session)

Stages executed and merged (this session):
- D0.3e (EAIP Schedule), D0.3f (Rev Architecture), D0.3g (Rev Connectivity), D0.3h (Rev Schedule), D0.3i (Bridge & Charter) — Phase D0.3 complete
- D0.4a (nav short-label TR), D0.4b (EAIP Connectivity filter)
- D0.4c (Rev Connectivity filter) — in progress

Stage prompts authored this session (in project outputs):
- `D0.3e-eaip-plan.md`, `D0.3f-rev-arch.md`, `D0.3g-rev-conn.md`, `D0.3h-rev-plan.md`, `D0.3i-bridge-charter.md`
- `D0.4a-nav-short-tr.md`, `D0.4b-eaip-conn-filter.md`, `D0.4c-rev-conn-filter.md`

Pattern Library: **#1–#31** (was #1–#24 at start of prior session).

---

*End of compressed context. Load this doc + prior bootstraps + execute §7 step 1.*
