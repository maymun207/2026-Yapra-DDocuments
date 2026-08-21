# PHASE PRIMER-COLLAPSE-1 — PanelPrimer becomes collapse/expand (reversible) · v1
<!-- rev 1 · 2026-07-06 · Author lane (AG). Fixes the owner-reported live breakage: the admin
     Panel Primer's ✕ dismisses it irreversibly for the session (renders null → no way back until
     next session). Make it a COLLAPSE/EXPAND toggle instead. ONE shared component
     (src/components/admin/adminUi.tsx → PanelPrimer) → fixes ALL panels (Kinds, Providers, MCP,
     Replay, …). Frontend-only, src/** (UNMAPPED) → NO reseal / NO docVersion bump; changelog only.
     Code-grounded at master HEAD 3f8b639 (rev 46, 980/92). NOT security-relevant → standard gate
     (not hotfix, not full-review). Written by the Architect, NOT AG. -->

---

## 0. HARD PRE-FLIGHT GATE (do not start until ALL are literally true)
- [ ] Fresh clone of `github.com/maymun207/cwf_yaprak`; `git rev-parse origin/master` == **`3f8b639…`** (RULE 25).
- [ ] `npm ci` clean; **baseline suite green** — paste the literal count (expected **980/980 across 92 files**).
- [ ] **Drift gate green:** `npm run check:doc-drift` → paste the `[OK]` line.

---

## 1. What this is (one paragraph)
`PanelPrimer` (`src/components/admin/adminUi.tsx`) currently persists a per-`id` `'dismissed'` flag in
`sessionStorage` and, when dismissed, `return null` — the primer VANISHES with no affordance to bring it
back until the next session. The owner closed the MCP-servers primer and lost it. Change the one-way
dismiss into a **collapse ⇄ expand** toggle: collapsed renders a slim, clickable header (icon + title +
a chevron) that re-expands on click; expanded renders the full four-row primer with the ✕ replaced by a
collapse chevron. The collapsed/expanded state persists per `id` in **`sessionStorage`** (unchanged
store — see §2.2). One shared component → every admin panel's primer becomes reversible.

---

## 2. HARD CONSTRAINTS
**2.1 — Reversible, never null-on-dismiss.** After this change, the primer MUST NEVER render `null`.
Collapsed = a compact, clickable header that can re-expand in the SAME session. There is no state from
which the user cannot get the primer content back with one click.

**2.2 — sessionStorage, NEVER localStorage (standing rule).** Keep the persistence in `sessionStorage`
(the primer is orientation that returns next session, deliberately not localStorage — the existing
comment states this). Do NOT switch to localStorage. Do NOT use any other browser storage. Wrap every
`sessionStorage` access in try/catch exactly as today (SSR/privacy-mode safe → default expanded).
Migrate the semantics honestly: the old value `'dismissed'` should be read as **collapsed** (so a user
mid-session who already "dismissed" sees a collapsed header, not a vanished box); new writes use a
clear value (e.g. `'collapsed'` / `'expanded'`). Default when absent/unreadable = **expanded**.

**2.3 — The four primer contents are untouched.** Do NOT change any call site's `controls/tables/code/
lifecycle` props or the primer text on Kinds/Providers/MCP/Replay/etc. This is a behavior change to the
container only. Keep the `data-testid={`primer-${id}`}` on the expanded box; add a distinct, stable
testid/aria for the collapsed header (e.g. `data-testid={`primer-${id}-collapsed`}`) and an
`aria-expanded` on the toggle control.

**2.4 — Do NOT touch the separate `DismissibleHelp` banner** (the other component in `adminUi.tsx` that
persists in localStorage). It is out of scope. If you want, note in the CHANGELOG that its localStorage
persistence is a tracked-small inconsistency for a later pass — but do not change it here.

**2.5 — Design system.** Reuse `.admin-theme` + existing shadcn `Button`/`Info`/chevron (`lucide-react`
`ChevronDown`/`ChevronRight` or `ChevronUp`) already available. No new visual language, no new hex, no
new tokens. RULE 26: the collapsed header and expanded box must not clip at 1280/1024.

**2.6 — Secrets / scope.** No secret handling. Frontend-only: the ONLY non-test file changed is
`src/components/admin/adminUi.tsx` (+ its test). No `api/**`, no migration, no `shared/**`, no manifest.

---

## 3. IMPLEMENTATION (single component)
In `PanelPrimer` (`adminUi.tsx`):
- Replace the `open`/`dismiss`→`return null` logic with a `collapsed` boolean persisted per `id`:
  - initial: `sessionStorage.getItem(key)` → `'collapsed'` (or legacy `'dismissed'`) ⇒ collapsed; else expanded.
  - `toggle()` flips it and writes `'collapsed'`/`'expanded'` (try/catch).
- **Collapsed render (NEW — replaces `return null`):** a slim row — the `Info` icon + the `title` +
  a right-aligned chevron button (`aria-expanded={false}`, `aria-label` bilingual "genişlet"/"expand"),
  the whole header clickable to expand. `data-testid={`primer-${id}-collapsed`}`.
- **Expanded render:** the existing four-row box, but the trailing ✕ `Button` becomes a **collapse**
  chevron button (`aria-expanded={true}`, `aria-label` bilingual "daralt"/"collapse"). Keep
  `data-testid={`primer-${id}`}`.
- Keep it bilingual via the existing `props.lang` `t()` pattern.

---

## 4. TESTS (RTL; coverage floor ratchets up)
Add to the existing primer test coverage (the file already referencing `PanelPrimer` /
`primer-` testids — extend it, don't fork):
1. **Reversible:** render expanded → click the collapse control → the four-row content is gone AND the
   collapsed header (`primer-${id}-collapsed`) is present (NOT null/absent) → click the collapsed header
   → the four-row content is back. Assert the box is never fully removed from the DOM.
2. **Persistence (sessionStorage):** collapsing writes `sessionStorage['cwf.admin.primer.<id>']` to the
   collapsed value; a fresh mount with that value renders collapsed; assert `localStorage` is NOT written.
3. **Legacy migration:** a pre-existing `'dismissed'` value renders **collapsed** (a header), not null.
4. **Content intact:** an expanded primer still shows its `controls/tables/code/lifecycle` rows.

---

## 5. SELF-VERIFICATION (literal evidence, not "build green")
1. Baseline & final test counts (state N added).
2. Paste the assertion from test #1 proving the primer is NEVER null after collapse (collapsed header present).
3. Paste the test #2 assertion that `localStorage` is not written and `sessionStorage` holds the state.
4. `git diff --name-only` shows ONLY `src/components/admin/adminUi.tsx` (+ its test) [+ `.agents/CHANGELOG.md`
   in the follow-up doc commit]. NO `api/**`, NO migration, NO manifest/docVersion change.
5. `tsc -b` + `vite build` green.
6. `check:doc-drift` → still `[OK]` (src/** unmapped, no mapped area touched → NO reseal, NO docVersion
   bump — confirm the drift line and that manifest.json is unchanged).
7. Branch → `--no-ff` merge (squash banned) → push → report remote HEAD hash.

## 6. YOUR ACTION ITEMS (for Maymun)
- **None manual.** Frontend-only, no migration/env/Operator. After merge I fresh-clone review the diff;
  the live check is trivial (open any panel, collapse the primer, re-expand it).
