# CWF — CHAT-UX-1 Design Note: Chat-Shell Token System + Light/Dark/Auto Theme · v1

<!-- v1 · 2026-07-09 · anchor = origin/master `77b3aa1` (1221 tests / 121 files / docVersion rev 53 / drift [OK]).
     RULE-25 fresh-clone grounded this session: index.css `:root` chat tokens (light values, dark dormant
     under `.admin-theme.dark` 61-64), ChatShell.tsx (#08080c bg + pervasive text-white/{15..70}),
     LoginPage.tsx (placeholder text-white/15 ≈1.3:1), MessageChart.tsx (fontSize=10 fillOpacity=0.4),
     Sidebar.tsx language toggle line 160, uiStore.ts (currentLang, no persist), DocsReader.tsx (already
     reads localStorage['cwf.theme']).
     Owner-approved direction 2026-07-09: Warm Readable Dark + Light/Porcelain + Auto (full theme system);
     typography deep-dive DEFERRED (keep current). Folds the queued THEME-1. Design only — NOT the AG prompt. -->

## 0. What CHAT-UX-1 is
The chat shell is unreadable and gloomy because it has **no token system** — it paints solid
near-black (`#08080c`) surfaces and then washes every foreground with transparency
(`text-white/15…/70`), so nothing has real contrast and the whole surface reads as muddy. Admin has
`.admin-theme`; **the chat side has nothing.** CHAT-UX-1 gives the chat shell a real CSS-variable
token system with **two palettes (Warm Dark default + Light/Porcelain)** and a **Light/Dark/Auto**
toggle — which is simultaneously the real body of the queued **THEME-1**. It resolves audit items
UX-02 (login contrast), UX-03 (chat metadata), UX-04 (error state), UX-05 (chart axes) at the root,
by construction, not as spot-patches.

## 1. Root cause (why a token system, not a find-replace)
Spot-fixing `text-white/15`→`/40` in 40 places would leave the same architecture — ad-hoc opacity
literals scattered across components, no single source of truth, guaranteed to drift again (exactly
how admin's RULE-16 regressed). The fix is structural: **define chat tokens once, consume them
everywhere, toggle the token set for theme.** Same discipline that made admin legible-by-construction.

## 2. Committed architecture

### 2.1 A chat token set, distinct from `.admin-theme`
The chat shell is the dark-brand product surface; admin is a neutral light control panel. They must
NOT share a token set. Commit: a **`.chat-theme`** scope (wrapping the chat/login shell root) with
two token blocks in `src/index.css`:
- **`.chat-theme` (default = Warm Dark):** warm charcoal surfaces (not blue-black), SOLID
  foregrounds, one clay/glaze accent. Named tokens mirror the admin vocabulary for consistency:
  `--chat-bg`, `--chat-surface`, `--chat-surface-2`, `--chat-border`, `--chat-heading`,
  `--chat-body`, `--chat-secondary`, `--chat-tertiary`, `--chat-placeholder`, `--chat-accent`,
  `--chat-accent-fg`, `--chat-user-bubble`, `--chat-destructive`, `--chat-destructive-fg`.
- **`.chat-theme.light` (Light/Porcelain):** warm off-white grounded in the factory's material
  (porcelain/clay); the SAME token names, light values. Toggling the class re-skins everything.
- All values are **oklch**, contrast-proven (oklch→linear→WCAG) exactly like the admin block; the
  proposal mockup's hex values (`cwf-chat-ux-redesign-proposal-v1.html`) are the visual target,
  translated to oklch tokens with a documented contrast report.

### 2.2 Theme state = uiStore, persisted to `cwf.theme` (the key the docs reader already reads)
`src/store/uiStore.ts` gains `theme: 'dark' | 'light' | 'auto'` (default `'auto'`) + `setTheme`,
**persisted to `localStorage['cwf.theme']`** — the exact key `DocsReader` already consumes, so the
reader and the chat shell stay in lock-step for free (C built the consumer; CHAT-UX-1 builds the
owner/writer). `currentLang` gains persistence in the same pass (it currently resets to `'en'` on
reload — a latent bug). Resolution: `dark`/`light` apply directly; `auto` subscribes to
`matchMedia('(prefers-color-scheme: dark)')` live. A tiny effect toggles `light`/`dark` classes on
the `.chat-theme` root.

### 2.3 The toggle lives under language (where the owner first asked)
`src/components/ui/Sidebar.tsx`, immediately after the language row (line 160): a Light/Dark/Auto
control in the same `itemCls` visual language (a `Sun`/`Moon`/`Monitor` lucide affordance or a small
segmented control). Reads/writes `uiStore.theme`.

### 2.4 Migrate the three surfaces off opacity-literals onto tokens
- **`ChatShell.tsx`:** replace `bg-[#08080c]`/`#121218`/`#040408` and every `text-white/{15..90}`
  with the `--chat-*` tokens. Solid foregrounds — the wash disappears. (UX-03)
- **`LoginPage.tsx`:** `placeholder:text-white/15` (≈1.3:1) → `--chat-placeholder` (≥4.5:1); footer
  likewise. The dark login keeps its identity, becomes readable. (UX-02)
- **`MessageChart.tsx`:** axis/label `fontSize={10} fillOpacity={0.4}` → `fontSize={12}` + a solid
  token fill (`--chat-secondary`), legend `text-[10px] text-white/50` → token. (UX-05)
- **Error state (UX-04):** in `ChatShell.tsx`, when `msg.error` is true, render inside a distinct
  container (`--chat-destructive` bg/border/fg + an `AlertTriangle`) instead of a normal assistant
  bubble — an error must never be mistaken for an answer. Copy follows the frontend-design rule:
  state what happened + how to recover, in the interface's voice (e.g. the ARMES-401 message from
  the mockup).

## 3. Scope / frozen / seal
- **Frozen — zero diffs:** `api/` (entire tree), `shared/permissions.ts`, `shared/dbConstants.ts`,
  `supabase/`, `scripts/verifyGrants.ts`, `.mcp.json`, **`.admin-theme` token block + all
  `src/components/admin/**`** (CHAT-UX-1 is the chat surface only; admin legibility is the SEPARATE
  RULE-16-RESTORE phase next in queue). The docs-reader `.docs-content` block stays as-is (it rides
  the admin tokens by design).
- **No backend, no migration, no new permission, no Operator lane.** Two-lane: Architect authors the
  note + tokens (oklch values + contrast report) + prompt; AG wires tokens/store/toggle/migration.
- **New deps:** none (pure CSS tokens + a lucide icon already available).
- **Acceptance (measured, not vibes):** (a) contrast report oklch→linear→WCAG, every text/bg pair
  ≥4.5:1 body / ≥3:1 large, BOTH palettes; (b) RULE-26 no clip at 1280/1024; (c) a chat-side
  banned-opacity grep (`text-white/{10..50}` in `src/components/ui/ChatShell|LoginPage|cwf/*`) lands
  empty after migration — and, learning from RULE-16, this grep is wired as a **real CI check** so it
  can't regress (the gap RULE-16-RESTORE also closes for admin).
- **Screenshot reproducibility (the tracked gap from C):** the AG prompt includes a **sanctioned
  screenshot/preview harness or test-auth path** so RULE-26 evidence is fresh-clone reproducible —
  the login/welcome screens are pre-auth viewable, the conversation + error states need the harness.
- **Drift:** touching `src/index.css`/`ui/*` is below diagram altitude ⇒ expect reseal-not-redraw if
  a mapped tab depicts these; gate on `check:doc-drift`, bump docVersion only if flagged.

## 4. Interaction with the queued items
- **THEME-1 is subsumed here** — do not schedule it separately; CHAT-UX-1 *is* the theme system.
- **RULE-16-RESTORE stays next** and is disjoint (admin surface + its own CI grep); the two phases
  share the "legibility is a wired CI grep" pattern but touch non-overlapping files.

## 5. Open refinements (owner input welcome, none blocking)
- Accent value: mockup used clay `#e0975a` (dark) / `#bd6a35` (light) → oklch. Adjustable.
- Warm-dark surface temperature (how warm the charcoal reads).
- Typography: **DEFERRED** per owner ("keep current for now") — the tokens don't touch type; a later
  type pass can layer on without rework.

## 6. Deliverable order (on approval)
1. This design note (v1) — done.
2. The oklch token values + contrast report (I author, embedded in the AG prompt).
3. ONE gated AG phase prompt: tokens in `index.css` (`.chat-theme` + `.light`) · `uiStore.theme`
   persisted to `cwf.theme` (+ `currentLang` persist) · Sidebar toggle · migrate
   ChatShell/LoginPage/MessageChart onto tokens · error container · chat-opacity CI grep · sanctioned
   screenshot harness · frozen sweep · drift gate · RULE-26 evidence both palettes.

<!-- END · cwf-chat-ux-1-design-v1 · v1 · 2026-07-09 · anchor 77b3aa1 -->
