# CWF — PHASE NAV-STACK-1 — the nested-navigation layer (Stream B)
**claude-code-PHASE-NAV-STACK-1-nested-navigation-v1 · v1 · 2026-07-12 · Architect: Claude**

> **CEREMONY PROFILE: FULL.** Multi-file, touches the panel shell + several panels, and changes
> a cross-cutting interaction contract. So: fresh clone, **full suite** (sharded), **gated
> sub-phases**, full recount, and an Architect fresh-clone RULE-25 with independent probes.
> (Still client-only — no `api/**`, no migration — but the blast radius is the whole admin UI.)

---

## 0 · MISSION — fix the nested-navigation layer at its ROOT

The owner's 03→14 re-walk found five findings that are **one bug wearing five masks**: the admin
panel has **no navigation history**. Every "go deeper" action is an ad-hoc tab switch, and the
only origin the shell remembers is *Stages*.

**Code-verified roots at floor `017085e`:**
- `AdminPanel.tsx:284` — `KindsTab onOpenRules={(kindId) => { setRulesKindFilter(kindId); goToTab('rules'); }}`
  → clicking "N instances →" in **Kinds** silently switches the user to the **Rules** tab (F29).
- `AdminPanel.tsx:292-300` — `BackendTrustPanel onOpenScopeLens={(backendId) => { …set ?scopeBackend…; goToTab('replay'); }}`
  → **Trust → Replay** is another silent tab switch.
- `useTabNavigation` + `stageReturnCardId` remember **only a Stages origin**. So after
  Stages → Trust → Replay, "back" returns to **stage 12**, skipping Trust entirely (F41).
- Nested destinations render with no back affordance (F28) and no scroll memory (F27), and the
  Rules rule-detail view is cut off at the bottom (F31).

**The fix is one mechanism, not five patches: a real navigation stack with breadcrumbs.**

| Finding | Symptom | Cured by |
|---|---|---|
| **F27** | nested scroll-restore fails (Kinds → instance → back lands at Kinds top) | per-entry scroll memory on the stack |
| **F28** | no back button in a nested destination — user is stuck | breadcrumb / back rendered from the stack |
| **F29** | Kinds "N instances →" silently jumps to Rules; owner didn't know which page he was on | a labeled transition + breadcrumb showing `Kinds › Glossary Term › instances` |
| **F31** | Rules rule-detail cut off at the bottom | layout fix (scroll/height) in the detail view |
| **F41** | Stages → Trust → Replay → Back wrongly returns to stage 12, not Trust | the stack pops ONE hop, not all the way home |

---

## 1 · PRE-FLIGHT (gate 0 — STOP on mismatch)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master
```
- MUST print `017085e23d9167b19455a953a88281079556c648`. If master moved, STOP and report.
- `npm ci --no-audit --no-fund --silent`; **full suite** green at floor (shard `--shard=1/2` +
  `2/2` and sum — record the number); drift `[OK]` (grep `package.json` for the invocation, S32-1).
- Read fully before writing: `AdminPanel.tsx` (nav wiring, the two adjacency jumps at 284 & 292,
  the conditional tab rendering, `stageReturnCardId`), `useTabNavigation.ts` (pushState/popstate/
  `arrivedFromStages`), `BackToStagesStrip.tsx`, `StagesTab.tsx` (NavChip → `onNavigate(tab, cardId)`),
  `KindsTab.tsx` (`onOpenRules`), `RulesTab.tsx` (the kind filter + rule-detail view),
  `BackendTrustPanel.tsx` (`onOpenScopeLens`), `ReplayTab.tsx` (the scope-lens context strip —
  **this is the reference pattern, see §3.4**), `adminTabs.ts` (`tabLabel`, `resolveInitialTab`).
- Branch `feature/nav-stack-1`. **Push, REPORT, do NOT merge.**

---

## 2 · BINDING CONSTRAINTS

- **C-1 · Scope.** Only `src/components/admin/**` + `e2e/**` + the living-doc/KB files the drift
  gate demands. NOTHING under `api/**`, `shared/**`, `supabase/**`, `package.json`. No new
  dependency (no router library — see C-3). No `vite.config` change.
- **C-2 · Replace the mechanism, don't stack a second one.** `BackToStagesStrip` and
  `stageReturnCardId` are the *special case* of what you are building. **Generalize them into the
  stack; do not leave two parallel systems.** The Stages→panel→back behavior must keep working
  EXACTLY as it does today (it is the one nav path the owner already validated) — but it must now
  be *one entry* in the general stack, not a bespoke path.
- **C-3 · No router library, no browser storage.** The stack lives in React state at the
  `AdminPanel` level (which never unmounts). Continue using `pushState`/`popstate` on the existing
  `useTabNavigation` — extend it, don't fork it. No `sessionStorage`/`localStorage` for nav state.
- **C-4 · URL stays the source of truth for the CURRENT location.** `?tab=` (+ existing params
  like `?scopeBackend=`) must keep working as deep-links and cold-loads. A cold `?tab=rules` load
  = an EMPTY stack (no fake breadcrumb) — the user didn't come from anywhere.
- **C-5 · Capability gates untouched.** Navigation never bypasses a tab's existing permission
  guard. If a stack entry points at a tab the user can't see, the entry is dropped, not rendered.
- **C-6 · Read-only preserved.** No panel gains a write action in this phase. No content/prose
  rewriting (that's Wave 2) — the ONLY new strings are breadcrumb labels + the transition line
  in §3.4, both via `t('TR','EN')`, both reusing `tabLabel()` from STAGES-FIX-3.
- **C-7 · Floors ratchet.** Full suite > the floor count; `tsc -b` + `typecheck:api` clean;
  RULE-26 e2e green (extend it — see §3.6); drift `[OK]`.

---

## 3 · DESIGN (committed — implement this shape)

### 3.1 The stack
A `NavEntry[]` in `AdminPanel` state, one entry per *hop the user took to get here*:

```ts
interface NavEntry {
    tab: Tab;                    // where this hop lives (typed — dead links are compile errors)
    label: string;               // breadcrumb text, from tabLabel() + optional detail suffix
    context?: {                  // what made this hop special (restored on return)
        stageCardId?: string;    // Stages: the card the user left from (today's stageReturnCardId)
        kindFilter?: string;     // Rules: the kind the user drilled in from
        scopeBackend?: string;   // Replay: the backend whose scope lens was opened
        scrollY?: number;        // per-entry scroll memory (F27) — see 3.3
    };
}
```
- `push(entry)` on every *deeper* navigation (Stages chip → panel; Kinds → Rules instances;
  Trust → Replay scope lens; and any future adjacency jump).
- `pop()` on back/breadcrumb → restores that entry's tab **and** its `context` (filter, scroll,
  scope param) — i.e. **one hop, not all the way home** (this is F41).
- A **sidebar click clears the stack** (an explicit lateral move = a fresh start, matching today's
  `stageReturnCardId` clearing behavior).
- Depth cap: keep it small (e.g. 5) and drop the oldest — a runaway stack is a bug, not a feature.

### 3.2 Breadcrumb + back (F28, F29, F41)
Render, above the panel content, a breadcrumb built from the stack:

`← Kinds › Glossary Term › örnekleri (Rules)`

- The `←` (and each crumb) pops to that entry. Keyboard-accessible; `aria-label`ed.
- **The current location is the last crumb** — this is what tells the owner *"you are in Rules
  now, and you came from Kinds"* (F29's whole complaint).
- The strip renders ONLY when the stack is non-empty (cold load / sidebar visit → no strip).
- **This REPLACES `BackToStagesStrip`** — the Stages case becomes a stack of depth 1 whose crumb
  reads `← Aşamalar` / `← Stages` (behavior identical to today; C-2).
- Browser **Back** (popstate) must pop the stack, not just change the tab — one hop per Back.

### 3.3 Scroll memory per entry (F27)
Today `StagesTab` restores via `stageReturnCardId` + `useLayoutEffect` + `scrollIntoView`.
Generalize: when pushing a hop, record the current scroll position of the scrollable region
(`<main>`); on pop, restore it in a `useLayoutEffect` (before paint, no flash).
- Keep the **card-id** mechanism for Stages (it is more robust than pixels — it survives layout
  shifts from expanded disclosures). So: Stages uses `stageCardId` (unchanged), other panels use
  `scrollY`. Both live in `NavEntry.context`; the restore path branches on which is present.
- jsdom has no real layout: assert the MECHANISM (scrollIntoView called on the right node /
  scrollTop assigned), not pixels. jsdom also lacks `scrollIntoView` on the prototype — stub it
  (known footgun from STAGES-FIX-2).

### 3.4 Labeled transitions (F29) — reuse the pattern that already works
**ReplayTab ALREADY does this right**, and the owner explicitly loved it: arriving from the Trust
console it shows *"Scope lens opened for 'superset' (from the Backend Trust console) — pick a
specimen and run the scope/authority lens."* That is the reference pattern.
- Give the **Kinds → Rules** jump the same treatment: on arrival, Rules shows a one-line context
  strip — e.g. `Kinds'ta "Glossary Term" yapısını gördün — bunlar onun örnekleri.` /
  `You came from the "Glossary Term" kind in Kinds — these are its instances.` Keep it to ONE
  line; do not write a paragraph (Wave 2 owns prose).
- Do NOT re-implement Replay's strip — leave it as is; just make Rules' arrival equally honest.

### 3.5 F31 — the nested detail view is cut off
The Rules rule-detail (payload + version timeline) is clipped at the bottom. With `<main>` now
scrollable (STAGES-FIX-1) this is a panel-internal height/overflow bug: make the detail column
scroll or size correctly at 1280 AND 1024 so the version timeline + rollback controls are
reachable. Do not restructure the payload editor — just make it reachable.

### 3.6 RULE-26 coverage
Extend `e2e/rule26-admin.spec.ts` with the deep path: `?tab=kinds` → click an instances link →
assert no horizontal overflow at 1280 & 1024 **with the breadcrumb rendered**. If a fixture/auth
blocker makes this impractical, say so explicitly in the report rather than faking it.

---

## 4 · GATED SUB-PHASES (close each with green tests before the next)

- **A · The stack primitive.** `NavEntry`, `push`/`pop`/`clear`, depth cap, typed `tab`. Unit
  tests: push/pop/clear semantics; sidebar-click clears; depth cap drops oldest; unknown tab
  rejected.
- **B · Wire it into `useTabNavigation`.** pushState per hop; popstate pops ONE entry; cold
  `?tab=` load = empty stack; existing `?scopeBackend=` deep-link still works. Tests for each.
- **C · Breadcrumb component + retire `BackToStagesStrip`.** Renders from the stack; each crumb
  pops to its entry; hidden when the stack is empty; Stages case behaves EXACTLY as today.
  Report explicitly that no second nav system remains (C-2).
- **D · Scroll memory.** Per-entry restore (`scrollY` for panels, `stageCardId` for Stages);
  `useLayoutEffect`; no flash. Tests assert the mechanism.
- **E · The two adjacency jumps.** Convert `onOpenRules` (Kinds→Rules) and `onOpenScopeLens`
  (Trust→Replay) to push a stack entry with their context (`kindFilter` / `scopeBackend`). Add
  the Rules arrival strip (§3.4). Verify Stages→Trust→Replay→Back lands on **Trust** (F41).
- **F · F31 detail-view layout** + RULE-26 extension (§3.6).
- **G · Full self-verify + push.** Full suite (sharded, sum it) > floor; typecheck clean; drift
  `[OK]`; push branch; REPORT. **Do not merge.**

---

## 5 · REPORT FORMAT (paste literally)

1. `git rev-parse origin/master` at start + branch tip.
2. Full-suite counts at floor AND finish (sharded sums shown).
3. `git diff --stat 017085e..HEAD` (must satisfy C-1).
4. Per sub-phase A–F: what changed + test names + one evidence line.
5. **F41 proof:** the exact test/steps showing Stages → Trust → Replay → Back lands on **Trust**
   (not stage 12), and a second Back lands on **Stages** at the origin card.
6. **C-2 proof:** `BackToStagesStrip` is gone (or is now a thin wrapper over the stack) and there
   is exactly ONE navigation mechanism. Grep evidence.
7. Cold-load proof: `?tab=rules` with no history → NO breadcrumb, no fake origin.
8. RULE-26 result (or an honest explanation if the deep path couldn't be automated).
9. docVersion + drift `[OK]`; INTENDED test edits listed; any deviation flagged at the TOP.

*Architect will fresh-clone review (RULE-25, FULL): independent probes of the F41 multi-hop path,
the cold-load empty-stack path, and the sidebar-clears-stack path — then the verbatim `--no-ff`
merge message.*

<!-- END · claude-code-PHASE-NAV-STACK-1-nested-navigation-v1 · v1 · 2026-07-12 -->
