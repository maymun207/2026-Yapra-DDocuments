# Stage D0.7c — Resource Allocation dashboard

> **Stage type:** V0 finalization (D0.7 group) · last build stage before CTO sign-off
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Model used actual:** [AG fills in lessons.md self-report]
> **Estimated size:** M — Antigravity 30–45 min · human review 20–30 min
> **Merge mode:** operator-gated — CTO reviews the resource view on Vercel preview (this is the CTO-facing artifact; the headline insight is for the CTO)
> **Predecessor:** D0.7b (`0ab744f`) — Document hub (Library) merged, 10 nav tabs, 16 routes
> **Successor:** CTO fidelity pass → D0.7 finalization group closes → tool is review-ready

---

## 1. Goal

Add a **Resource Allocation dashboard** at `/resources` (11th nav tab) that answers, in one view, two questions the CTO asks before sign-off:

1. **Where does the engineering effort go?** (quantitative — engineer-hours by role)
2. **Who does the work, and when does the team re-shape?** (qualitative — team structure + the 3+3→1+5 transition contract)

After D0.7c:

- `/resources` renders a bilingual two-section dashboard.
- **Section A — Effort by role:** the canonical EAIP role-hours table (locked numbers below) rendered as a labeled horizontal bar chart + exact figures, with the headline callout that **AI Engineering is 52.9% of the entire EAIP build effort** (12,060 total hours).
- **Section B — Team & transition:** the 6-engineer team structure (Takım-1 / Takım-2 / CTO + Conductor + Architect), the current 3+3 allocation, and a concise summary of the three 3+3→1+5 transition triggers, with a link into the **Library** to the full A7 resource-allocation contract.
- A new 11th nav tab "Resources / Kaynaklar" that **does not overflow** the nav at any breakpoint (375 / 768 / 1024 / 1366 / 1440) — the existing three-tier breakpoint system (D0.2.1) absorbs it, with a short-label fallback if needed.

**Governing principle applied (this session's rule):** the role table earns re-implementation (interactive chart, hover, exact figures inline) → typed React data. The full transition contract is prose the team reads top-to-bottom → it is **not** rebuilt here; the dashboard shows a concise trigger summary and links to the canonical contract already in the Library. Re-implement where interactivity earns it; serve canonical everywhere else.

---

## 2. Prerequisites

- D0.7b merged at `0ab744f`. `/library` live in production, 13 docs across 4 categories.
- Nav currently renders **10 tabs** cleanly at 1366 / 1440 (operator-verified this session). This stage adds the 11th — the nav-fit check is a hard acceptance gate, not an afterthought.
- `app/_lib/nav.ts` holds the tab list (Library was added as the 10th in D0.7b).
- `app/_data/i18n.ts` has the bilingual `STRINGS` structure with `getLang()` cookie helper.
- TypeScript strict passing. `npm run build` clean (16 routes).
- The A7 contract doc is committed somewhere in `agbuilder-platform/revolutionize` — **Step 0 confirms the exact path** (candidates: `docs/phase0/a7-resource-allocation.md`, `docs/contracts/resource_allocation_v1.md`). The Library link target depends on this.

---

## 3. Context

### 3.1 The canonical role-hours table — LOCKED, do NOT re-extract

These figures were extracted from `06_eaip_schedule.html` and locked in a prior session. **Embed them verbatim as typed data. Do not re-derive, re-sum, or re-extract from the schedule HTML — that risks drift.** The percentages are pre-computed against the 12,060 total.

| Role | Hours | Share |
|---|---|---|
| AI Eng | 6,380 | 52.9% |
| Data Eng | 2,440 | 20.2% |
| Backend | 2,180 | 18.1% |
| DevOps | 740 | 6.1% |
| Frontend | 320 | 2.7% |
| **Total** | **12,060** | 100% |

The headline insight for the CTO: **AI Engineering is more than half the entire EAIP effort** — this validates ML/AI-eng as the load-bearing role and frames why the 3+3→1+5 transition flows freed Revolutionize engineers into AI-heavy CWF/EAIP work.

### 3.2 Team structure — from runbook §1 (canonical)

```
Takım-1   3 engineers   Joint substrate (B-track) → Week 2: Revolutionize Phase 1
Takım-2   3 engineers   Joint substrate (B-track) → Week 2: EAIP M1 Core
CTO       1             Tech Lead + Program Leader · A-track owner · runbook PR review
Maymun    —             Sponsor / Conductor (directs, not an implementing engineer)
Claude    —             Senior architect / sole stage-prompt author
```

Current allocation: **3+3** (T1 on Revolutionize, T2 on EAIP). Engineering headcount = 6.

### 3.3 The 3+3→1+5 transition — from runbook A7 (§95–98)

The transition trigger has **three** conditions. Step 0 reads the dedicated A7 contract doc for the authoritative wording; the runbook baseline is:

1. **Automatic switch:** Revolutionize Phase 1 exit gate's 5 items all green.
2. **Early switch:** CWF velocity drops below 2 stages/week.
3. **Mechanics:** which 2 engineers move from T1 to T2, and under which conditions.

After transition: **1+5** — one engineer stays on Revolutionize maintenance, five flow into the AI-heavy CWF / EAIP work (consistent with §3.1: AI Eng is the dominant load).

**Step 0 reconciliation duty:** read the actual A7 contract doc. If its wording differs from the three triggers above, report the difference and use the doc's wording in the rendered summary. Do not silently override — report, then use canonical.

### 3.4 Data file — `app/_data/resources.ts` (NEW)

Typed, embedding §3.1 and §3.2 as canonical data. No fetch, no extraction logic.

```ts
// app/_data/resources.ts
export interface RoleEffort {
  role: string;       // technical identifier — stays as-is in both languages
  hours: number;
  share: number;      // pre-computed percentage (do not recompute from hours)
}

export const ROLE_EFFORT: RoleEffort[] = [
  { role: 'AI Eng',   hours: 6380, share: 52.9 },
  { role: 'Data Eng', hours: 2440, share: 20.2 },
  { role: 'Backend',  hours: 2180, share: 18.1 },
  { role: 'DevOps',   hours: 740,  share: 6.1  },
  { role: 'Frontend', hours: 320,  share: 2.7  },
];

export const TOTAL_HOURS = 12060;

export interface TeamUnit {
  id: string;
  count: number | null;     // null for non-engineering program roles
  trackKey: string;         // i18n key for the track/role description
}

export const TEAM: TeamUnit[] = [
  { id: 'Takım-1', count: 3,    trackKey: 'team.t1' },
  { id: 'Takım-2', count: 3,    trackKey: 'team.t2' },
  { id: 'CTO',     count: 1,    trackKey: 'team.cto' },
  { id: 'Conductor', count: null, trackKey: 'team.conductor' },
  { id: 'Architect', count: null, trackKey: 'team.architect' },
];

// Transition trigger keys — rendered text comes from i18n; verified against the
// A7 contract doc in Step 0. The doc is the source of truth for wording.
export const TRANSITION_TRIGGERS = ['auto', 'early', 'mechanics'] as const;
```

### 3.5 The bar chart — CSS/Tailwind, no chart library

Do **not** add a chart dependency. A labeled horizontal bar per role, width = `share%`, theme tokens for color (AI Eng gets the accent to draw the eye to the 52.9%). Each row: role label · bar · `hours` + `share%`. A total row beneath. This matches the dependency-light, token-driven style of the existing tabs.

```tsx
// app/_components/resources/EffortBars.tsx — client or server (no interactivity required → server is fine)
// Render ROLE_EFFORT as horizontal bars. width:`${share}%`. AI Eng bar uses the accent token.
// Show hours (formatted with thousands separator) and share% at the row end.
// Total row: TOTAL_HOURS with a "100%" cap.
```

If a subtle hover (e.g., row highlight) is desired, that's the only reason to make it a client component — operator's call; default to server component, no JS, for the chart.

### 3.6 i18n — append a `resources` block

Add to `STRINGS` in `i18n.ts`, both `en` and `tr`:

- `resources.navLabel` — "Resources" / "Kaynaklar"
- `resources.navLabelShort` — "Resources" / "Kaynak"  (short-label fallback for the tightest nav tier)
- `resources.title` — "Resource Allocation" / "Kaynak Dağılımı"
- `resources.subtitle` — bilingual one-liner: where the effort goes and how the team re-shapes
- `resources.effortHeading` — "Effort by role" / "Role göre eforun dağılımı"
- `resources.headline` — "AI Engineering is 52.9% of the entire EAIP build effort." / "Yapay Zekâ Mühendisliği, EAIP'nin toplam yapım eforunun %52,9'u."
- `resources.totalLabel` — "Total" / "Toplam"
- `resources.teamHeading` — "Team & transition" / "Ekip ve geçiş"
- `resources.currentAlloc` — "Current allocation: 3 + 3" / "Mevcut dağılım: 3 + 3"
- `resources.transitionHeading` — "The 3+3 → 1+5 transition" / "3+3 → 1+5 geçişi"
- `resources.transition.auto` — automatic switch on Phase 1 exit gate (bilingual)
- `resources.transition.early` — early switch on CWF velocity < 2 stages/wk (bilingual)
- `resources.transition.mechanics` — which 2 engineers move T1→T2 (bilingual)
- `resources.contractLink` — "Read the full A7 resource-allocation contract →" / "A7 kaynak dağılımı sözleşmesinin tamamını oku →"
- `team.t1` / `team.t2` / `team.cto` / `team.conductor` / `team.architect` — track descriptions (bilingual)

Role names (`AI Eng`, `Data Eng`, etc.) are technical identifiers — they stay as-is in both languages (Pattern: identifiers are code, not prose).

### 3.7 Library link target

The "Read the full contract" link points into the existing Library. If the A7 contract is a Library doc, link to `/library/<docId>` (Step 0 reports the docId). If it is NOT yet a Library doc but exists in the repo, link to the **runbook** doc in the Library (already present — `runbook` docId) and note in the PR that adding the A7 contract as its own Library entry is a future tiny manifest addition. Do not create a new fetch path here.

---

## 4. Step 0 mandatory reads

Before writing code, AG reads and reports:

1. **`app/_lib/nav.ts`** — record the current 10 tabs (ids, labels, order) and the breakpoint-tier logic. Report where the 11th tab inserts and which tier short-labels first.
2. **`app/_data/i18n.ts`** — confirm the `STRINGS` shape and `getLang()` usage; record where the `resources` block appends.
3. **A7 contract doc path** — check `docs/phase0/a7-resource-allocation.md` AND `docs/contracts/resource_allocation_v1.md` in `agbuilder-platform/revolutionize`. Report which exists (or both, or neither). Read the existing one and report its three (or N) transition triggers verbatim — reconcile against §3.3.
4. **Library manifest** — `docs/library/manifest.json`: report whether the A7 contract is a listed doc (and its `docId`), or confirm it is not (→ link to `runbook` per §3.7).
5. **Confirm `/resources` is a free route** — no existing `app/resources/` directory.

If the nav file structure differs materially from the assumption (e.g., labels are not i18n-keyed), report before proceeding — the short-label fallback depends on it.

---

## 5. Steps

**Step 0 — Reads.** §4. Report findings, especially: the confirmed A7 contract path + docId (or runbook fallback), the verbatim transition triggers, and the nav tier where the 11th tab risks overflow.

**Step 1 — `app/_data/resources.ts`.** Create the typed data from §3.4 (verbatim locked numbers).

**Step 2 — i18n.** Append the `resources` + `team.*` blocks (en + tr) from §3.6.

**Step 3 — `EffortBars.tsx`.** The CSS bar chart from §3.5 (server component default).

**Step 4 — `TeamTransition.tsx`.** Team structure list (from `TEAM` + `team.*` i18n) + current 3+3 allocation + the three transition triggers (from i18n, wording per Step 0) + the Library contract link (§3.7).

**Step 5 — `app/resources/page.tsx`.** Server component composing: title + subtitle, Section A (`effortHeading`, headline callout, `EffortBars`), Section B (`teamHeading`, `TeamTransition`). Bilingual via `getLang()`. Match the layout shell / container conventions of an existing tab (e.g., a schedule route).

**Step 6 — Nav.** Add the 11th tab to `nav.ts` (id `resources`, label `resources.navLabel`, short label `resources.navLabelShort`, route `/resources`). Place it logically (after the schedules, before/after charter — operator-sensible; report placement). Ensure the short-label fallback is wired into the tightest tier.

**Step 7 — TypeScript + build.** `npx tsc --noEmit` → 0. `npm run build` → 17 routes (was 16, +1: `/resources`).

**Step 8 — Nav breakpoint check (HARD GATE — do not skip, do not self-pass without evidence).** Render the nav at **375 / 768 / 1024 / 1366 / 1440 px** with all 11 tabs. For each breakpoint report: visible tab count, whether any tab wraps/scrolls/truncates, and the computed nav-row width vs viewport width. Capture screenshots at 1366 and 1440 (the historical overflow zone). If overflow occurs, apply the short-label tier (`navLabelShort`) and/or adjust the tier threshold — within this stage — and re-check. **Truncating to ellipsis, horizontally scrolling, or hiding a tab is NOT acceptable** and must be fixed before PR.

**Step 9 — Verify, commit, open PR.**
PR title: `"D0.7c: resource allocation dashboard (/resources, 11th tab)"`.
PR body must include: Step 0 findings (A7 path + docId, verbatim triggers, nav tier), and the **Step 8 nav breakpoint table** with the 1366/1440 screenshots, plus a `/resources` screenshot at 1440 and 375.

AG stops. Report PR URL.

---

## 6. Acceptance criteria

### Technical

- `npx tsc --noEmit` → 0. `npm run build` clean, **17 routes** (+`/resources`).
- `app/_data/resources.ts` numbers match §3.1 **exactly** (6380 / 2440 / 2180 / 740 / 320; total 12060; shares 52.9 / 20.2 / 18.1 / 6.1 / 2.7). No recomputation drift.
- `EffortBars` bar widths use the `share` field directly (not hours/total recomputed).
- i18n: `resources.*` and `team.*` present in BOTH `en` and `tr`. No hardcoded EN prose in the components (Pattern: detail-panel i18n lesson from D0.5c — no `"Total"`, `"Team"` hardcoded).
- Role identifiers (`AI Eng`, etc.) render identically in EN and TR (not translated).
- `app/resources/page.tsx` is a server component; reads `getLang()`.
- Library link resolves to a real `/library/<docId>` (or `/library/runbook` fallback) — Step 0 confirmed it.

### Nav fit (HARD GATE — operator-verified on Vercel preview)

- At **1366px and 1440px**, all 11 tabs sit on one row, full (or short-tier) labels, **no horizontal scroll, no truncation, no hidden tab**.
- At 768 / 1024 the tier behavior is graceful (short labels or known responsive collapse — but never a broken/overflowing row).
- At 375px the nav uses whatever mobile pattern already exists for the other 10 tabs (no new mobile regression).
- Step 8 breakpoint table is in the PR body with computed widths + 1366/1440 screenshots.

### Functional — operator-verified

- `/resources` renders Section A: the 5 role bars, AI Eng visually dominant (~half width, accent color), exact hours + shares, total row 12,060 / 100%, headline callout present.
- Section B: team list (T1 ×3, T2 ×3, CTO ×1, Conductor, Architect), "Current allocation: 3+3", the three transition triggers, and a working "full contract" link into the Library.
- EN/TR toggle flips all prose (headings, subtitle, headline, triggers, team descriptions) — role identifiers stay as-is.
- The 11th tab navigates to `/resources` and is highlighted as active.

### No regression

- All 10 prior tabs still navigate and render; `/` bridge, `/library`, `/phase0` unaffected.
- Console on `/resources` → zero app errors.

---

## 7. Edge cases

- **A7 contract doc not found at either path:** Section B still renders the triggers from i18n (§3.3 baseline), and the link points to the `runbook` Library doc. Report BLOCKED only if neither the contract nor the runbook is resolvable in the Library — otherwise degrade to the runbook link and note it.
- **A7 triggers differ from §3.3:** use the doc's wording (Step 0), update the i18n strings accordingly, and note the difference in the PR. The doc is canonical.
- **11th tab overflows even with short labels at 1366px:** do NOT hide or scroll. Acceptable fixes within this stage: tighten tab horizontal padding for the desktop tier, or lower the short-label tier threshold so short labels engage earlier. If neither resolves it cleanly, report — a dedicated nav-redesign (overflow menu) becomes its own stage; do not improvise an overflow menu here.
- **Share percentages don't sum to exactly 100 (52.9+20.2+18.1+6.1+2.7 = 100.0):** they do — but the total bar caps at 100% regardless; never normalize the locked figures.
- **Bilingual number formatting:** hours use a thousands separator; TR uses `.` (6.380), EN uses `,` (6,380) — use the locale-appropriate separator if trivially available, else a consistent separator is acceptable (note the choice). Do not change the underlying numbers.

---

## 8. Verification approach

1. Open Vercel preview `/resources`. Confirm Section A bars (AI Eng dominant), exact figures, headline, total.
2. Confirm Section B: team list, 3+3 allocation, three triggers, working contract link → lands in the Library on the right doc.
3. Toggle EN/TR → all prose flips; role names unchanged.
4. **Resize to 1366px then 1440px** — all 11 tabs on one row, no overflow/truncation/scroll/hidden tab. Then 1024 / 768 / 375 — graceful.
5. Click the 11th tab from another route → navigates + active state.
6. DevTools console on `/resources` → no app errors.
7. Spot-check no regression: `/`, `/library`, `/phase0` still load.

If all pass → send: **`"Approved — merge D0.7c"`**.

---

## 9. Antigravity configuration

**Model recommended:** Sonnet 4.6 thinking. Straightforward data + composition + i18n; the one piece needing care is the nav-fit gate (Step 8) — AG has skipped breakpoint reporting on prior stages, so it is written as a hard, evidence-required gate here.

**Watch for:**
- AG re-extracting role hours from `06_eaip_schedule.html` instead of using the locked §3.1 numbers. Reject — drift risk; the numbers are canonical.
- AG recomputing `share` from `hours/total` and getting rounding drift. Reject — use the locked `share` field.
- AG hardcoding EN labels (`"Total"`, `"Team"`, `"Resources"`) in components. Reject — i18n keys only (D0.5c lesson).
- AG translating role identifiers (`AI Eng` → `YZ Müh.`). Reject — identifiers stay as-is.
- AG declaring the stage done **without** the Step 8 nav breakpoint table + 1366/1440 screenshots. Reject — this is the exact gate skipped on D0.7b; it is non-negotiable here.
- AG resolving nav overflow by truncating labels to ellipsis, enabling horizontal scroll, or hiding a tab. Reject — short-label tier or padding/threshold fix only; escalate if neither works.
- AG adding a chart library (recharts/chart.js) for five bars. Reject — CSS/Tailwind bars.
- AG making `/resources` a client component without need. Prefer server; client only if a hover interaction is explicitly added.
- AG creating a new GitHub fetch for the contract. Reject — link into the existing Library route; no new fetch.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.7c-lessons.md`:

```md
# D0.7c Lessons

**Stage:** D0.7c — Resource Allocation dashboard
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun (+ CTO sign-off pass)
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity**

**Stage size actual:** [Xm] (estimated M: 30–45 min)
**Model used actual:** [Sonnet 4.6 thinking / other]
**Files created:** app/_data/resources.ts, app/_components/resources/EffortBars.tsx, TeamTransition.tsx, app/resources/page.tsx
**Files modified:** app/_lib/nav.ts, app/_data/i18n.ts

**Step 0 findings:**
- A7 contract path found: [docs/phase0/a7-resource-allocation.md / docs/contracts/resource_allocation_v1.md / neither]
- A7 contract Library docId: [docId / runbook fallback]
- Transition triggers verbatim: [list — and any difference from runbook §3.3]
- Nav: 11th tab inserted at [position]; short-label tier engages at [breakpoint]

**Locked role numbers used verbatim (no re-extract):** [✅]
**share field used for bar widths (not recomputed):** [✅]
**i18n resources.* + team.* in en AND tr:** [✅]
**Role identifiers untranslated:** [✅]
**No chart library added:** [✅]

**Step 8 nav breakpoint table:**
| px | visible tabs | wrap/scroll/truncate | nav width vs viewport |
|----|--------------|----------------------|------------------------|
| 375 | | | |
| 768 | | | |
| 1024 | | | |
| 1366 | | | |
| 1440 | | | |
(screenshots at 1366 + 1440 attached to PR)

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**Section A renders (5 bars, AI Eng dominant, total 12,060):** [✅ / ❌]
**Section B renders (team + 3+3 + 3 triggers + contract link):** [✅ / ❌]
**Contract link lands on the right Library doc:** [✅ / ❌]
**EN/TR toggle flips all prose; identifiers unchanged:** [✅ / ❌]
**11 tabs fit at 1366 + 1440 (no overflow/truncation/hidden):** [✅ / ❌]
**No regression on /, /library, /phase0:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**CTO sign-off on the resource view:** [✅ / pending]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — appended post-merge.
```

---

**End of Stage D0.7c prompt. Last build stage of the D0.7 finalization group — after merge + CTO fidelity pass, TheBluePrint23 is review-ready and D0.7 closes. Then, on Maymun's signal, the program shifts to "B" (Revolutionize Phase 1, Stage 1.1.1 already written).**
