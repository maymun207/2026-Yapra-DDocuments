# claude-code — PHASE CHAT-UX-1: Chat-Theme Tokens + Light/Dark/Auto · v1

<!-- claude-code-PHASE-CHAT-UX-1-chat-theme-tokens-v1 · v1 · 2026-07-09 · Architect-authored (Claude).
     Anchor = origin/master `77b3aa1` (1221 tests / 121 files / docVersion rev 53 / drift [OK]).
     Design: cwf-chat-ux-1-design-v1 (owner-approved 2026-07-09). Direction: Warm Readable Dark
     (default) + Light/Porcelain + Auto. Typography DEFERRED — do not change fonts/type scale.
     You (AG) implement this prompt EXACTLY. Do not redesign. ONE clarifying design question
     before starting is allowed; expect ONE committed answer. -->

## 0. HARD PRE-FLIGHT (all must pass before any edit)
1. `git fetch && git rev-parse origin/master` MUST print `77b3aa10e980f4db8655dd674bd0764779fb51c4`.
   Moved? STOP and report.
2. `git status --porcelain` empty.
3. Baseline: `npm ci --no-audit --no-fund --silent && npx vitest run --reporter=dot 2>&1 | tail -5`
   MUST show **1221 passed / 121 files**. Record literal tail.
4. Drift gate: `npm run check:doc-drift` → `[OK]`. Record literal output.
5. Branch: `git checkout -b feat/chat-ux-1-theme-tokens`.

## 1. HARD CONSTRAINTS (violating any = phase failure)
- **FROZEN — zero diffs under:** `api/` (entire tree) · `shared/permissions.ts` ·
  `shared/dbConstants.ts` · `supabase/` · `scripts/verifyGrants.ts` · `.mcp.json` ·
  **`src/components/admin/**` (ALL of it)** · `src/components/docs/**` · `public/docs/**` ·
  `src/docs/**`. In `src/index.css` the existing `:root` and `.admin-theme*` blocks are
  byte-frozen — chat tokens are ADDED as new blocks, nothing existing edited.
- **No new dependencies.** No secrets. No new permissions. No migration (no Operator lane).
- **Typography untouched:** no font-family, no type-scale redesign. The ONLY size change allowed
  is the mandated `text-[10px]/text-[11px]` → `text-xs` legibility floor in chat files.
- Token CSS in §UX.1 is Architect-authored and **VERBATIM** — write byte-exact, adjust nothing.
  All colors in migrated components come from these tokens (RULE 1: zero new literals).
- Merges `--no-ff` (squash banned). CHANGELOG entry in `.agents/CHANGELOG.md` (explicitly
  permitted, as are `public/architecture/manifest.json` resealing and `package.json` script rows).
- RULE 26: nothing clips at 1280/1024 — rendered evidence required, BOTH palettes.

## 2. WHAT YOU ARE BUILDING (one paragraph)
The chat shell today is `#08080c` + transparency-washed `text-white/N` everywhere — unreadable by
measurement (placeholder ≈1.3:1). You will add a **`.chat-theme` token system** (Warm Dark default
+ `.light` Porcelain) to `index.css`, a **persisted `theme: dark|light|auto`** in `uiStore` written
to `localStorage['cwf.theme']` (the key the docs reader already consumes), a **toggle in the
Sidebar under language**, and **migrate ChatShell / LoginPage / MessageChart fully onto the
tokens** — including a distinct error container so errors are never mistaken for answers. A
ban-list grep test makes the migration CI-permanent.

## 3. GATED SUB-PHASES

### UX.1 — Tokens (VERBATIM, additive)
Append to `src/index.css`, below all existing blocks, byte-exact:

```css
/* ──────────────────────────────────────────────────────────────────────
 * CHAT-UX-1 — the chat shell's OWN token system (distinct from .admin-theme).
 * Two palettes, same token names: `.chat-theme` = Warm Readable Dark (default),
 * `.chat-theme.light` = Light/Porcelain. Grounded in the factory's material
 * world (porcelain / clay / glaze / kiln-charcoal). Every value is WCAG-proven
 * (oklch→linear→WCAG report in the CHAT-UX-1 phase prompt; lowest pair 4.53:1).
 * RULE 1: chat components consume ONLY these vars — no color literals.
 * ────────────────────────────────────────────────────────────────────── */
.chat-theme {
    /* Warm Readable Dark — warm charcoal, SOLID foregrounds, clay accent. */
    --chat-bg: oklch(0.210 0.007 78.2);            /* #1a1815 */
    --chat-banner: oklch(0.183 0.007 78.1);        /* #14120f */
    --chat-surface: oklch(0.258 0.007 67.5);       /* #262320 */
    --chat-surface-2: oklch(0.296 0.009 67.5);     /* #302c28 */
    --chat-border: oklch(0.335 0.012 78.2);        /* #3a3630 */
    --chat-border-soft: color-mix(in oklab, var(--chat-border) 55%, var(--chat-bg));
    --chat-heading: oklch(0.963 0.009 78.3);       /* #f6f2ec · 15.9:1 on bg */
    --chat-body: oklch(0.879 0.016 77.1);          /* #ddd6cc · 12.3:1 on bg */
    --chat-secondary: oklch(0.706 0.021 77.3);     /* #a89f92 · 6.8:1 on bg */
    --chat-tertiary: oklch(0.608 0.021 75.2);      /* #8a8175 · 4.6:1 on bg */
    --chat-placeholder: oklch(0.655 0.026 85.8);   /* #98907f · 4.9:1 on surface */
    --chat-accent: oklch(0.737 0.117 59.4);        /* #e0975a clay/glaze */
    --chat-accent-fg: oklch(0.210 0.007 78.2);     /* 7.4:1 on accent */
    --chat-hover: color-mix(in oklab, var(--chat-heading) 7%, transparent);
    --chat-ring: var(--chat-accent);
    --chat-user-bubble: var(--chat-surface-2);
    --chat-destructive-bg: oklch(0.277 0.041 29.4);     /* #3a201c */
    --chat-destructive-border: oklch(0.431 0.091 32.2); /* #7a3b2f */
    --chat-destructive-fg: oklch(0.831 0.072 37.9);     /* #f2b8a6 · 8.7:1 */
}
.chat-theme.light {
    /* Light / Porcelain — warm off-white, high contrast, un-gloomy. */
    --chat-bg: oklch(0.977 0.007 80.7);            /* #faf7f2 porcelain */
    --chat-banner: oklch(0.936 0.014 78.3);        /* #efe9e0 */
    --chat-surface: oklch(1 0 0);                  /* #ffffff */
    --chat-surface-2: oklch(0.954 0.011 76.6);     /* #f4efe8 */
    --chat-border: oklch(0.904 0.018 78.2);        /* #e6ded2 */
    --chat-border-soft: color-mix(in oklab, var(--chat-border) 55%, var(--chat-bg));
    --chat-heading: oklch(0.224 0.009 75.2);       /* #1e1b17 · 16.1:1 on bg */
    --chat-body: oklch(0.342 0.015 84.6);          /* #3c3830 · 10.9:1 on bg */
    --chat-secondary: oklch(0.503 0.019 79.3);     /* #6a6358 · 5.6:1 on bg */
    --chat-tertiary: oklch(0.551 0.029 86.9);      /* #79715f · 4.5:1 on bg */
    --chat-placeholder: oklch(0.517 0.025 83.2);   /* #6f6758 · 5.6:1 on surface */
    --chat-accent: oklch(0.531 0.122 48.8);        /* #a35322 clay, AA-darkened */
    --chat-accent-fg: oklch(1 0 0);                /* 5.5:1 on accent */
    --chat-hover: color-mix(in oklab, var(--chat-heading) 6%, transparent);
    --chat-ring: var(--chat-accent);
    --chat-user-bubble: oklch(0.945 0.013 76.6);   /* #f0eae1 */
    --chat-destructive-bg: oklch(0.949 0.020 37.0);     /* #fbeae5 */
    --chat-destructive-border: oklch(0.765 0.085 37.3); /* #e3a08c */
    --chat-destructive-fg: oklch(0.447 0.134 37.9);     /* #8f3110 · 6.9:1 */
}
```

**Contrast report (Architect-measured, sRGB WCAG; do not re-derive, do not adjust):**
DARK — heading/bg 15.89 · body/bg 12.29 · body/surface 10.84 · secondary/bg 6.78 ·
tertiary/bg 4.62 · placeholder/surface 4.93 · accent-fg/accent 7.38 · destructive-fg/bg 8.68.
LIGHT — heading/bg 16.05 · body/bg 10.91 · secondary/bg 5.55 · tertiary/bg 4.53 ·
placeholder/surface 5.59 · accent-fg/accent 5.50 · accent/bg 5.15 · destructive-fg/bg 6.88.
All ≥4.5:1 body (icon-on-accent ≥3:1 UI floor exceeded).
**GATE UX.1:** CSS appended verbatim; `npx tsc --noEmit` + `vite build` clean; existing blocks
byte-identical (`git diff src/index.css` shows additions only).

### UX.2 — Theme state, persistence, toggle
1. `src/store/uiStore.ts`: add `theme: 'dark' | 'light' | 'auto'` (default `'auto'`) + `setTheme`.
   **Persist** `theme` to `localStorage['cwf.theme']` and `currentLang` to
   `localStorage['cwf.lang']` (fixes the lang-resets-on-reload latent bug): hydrate on store init,
   write on set. Guard `localStorage` access for test/SSR safety (try/catch or typeof check).
2. Theme application: the chat root (ChatShell outermost div) and LoginPage root get
   `className="chat-theme …"`; a small shared hook `useChatTheme()` (new file
   `src/lib/useChatTheme.ts`) returns `light: boolean` — `theme==='light'` ⇒ true,
   `'dark'` ⇒ false, `'auto'` ⇒ live `matchMedia('(prefers-color-scheme: dark)')` with a change
   listener (cleanup on unmount). Roots append `light` class when true.
3. `src/components/ui/Sidebar.tsx`: directly BELOW the language row (line ~160), a theme row in
   the same `itemCls` visual language: icon (`Sun`/`Moon`/`Monitor` from lucide by current mode) +
   label `t('theme')` + a right-aligned small value (`Açık/Koyu/Oto` · `Light/Dark/Auto`).
   Click cycles light → dark → auto. Add the `theme` i18n key wherever `language` is defined.
4. **Do NOT touch DocsReader** — it already reads `cwf.theme` on mount by design (C built the
   consumer; this phase builds the writer).
**GATE UX.2:** store test passes locally; toggling in dev flips the palette live in both the shell
and login; `auto` follows the OS.

### UX.3 — Migrate the three surfaces onto tokens (the ban-list defines "done")
Scope files: `src/components/ui/ChatShell.tsx`, `src/components/ui/LoginPage.tsx`,
`src/components/ui/Sidebar.tsx`, `src/components/ui/cwf/MessageChart.tsx` (+ any `src/components/ui/cwf/*`
file the grep flags).
1. Replace ALL color literals and opacity-wash classes with tokens (Tailwind v4 var shorthand,
   e.g. `bg-(--chat-bg)`, `text-(--chat-body)`, `border-(--chat-border)`,
   `hover:bg-(--chat-hover)`, `placeholder:text-(--chat-placeholder)`). Mapping guide:
   `#08080c`→bg · `#040408`→banner · `#121218`/`#1c1c24`→surface/surface-2 ·
   `text-white/90+`→heading · `/70-80`→body · `/33-50`→secondary · `/15-25`→tertiary (metadata) or
   placeholder (inputs) · `bg-white/5` hovers→hover · `border-white/*`→border/border-soft ·
   send-button `bg-white/90 text-[#08080c]`→accent/accent-fg · amber bot-avatar accents→accent.
   Gradients that fade into the page (banner) reference `var(--chat-bg)`/`var(--chat-banner)`.
2. Legibility floor: every `text-[10px]`/`text-[11px]` in scope → `text-xs` minimum.
3. **Error container (UX-04):** in ChatShell, when a message is an error (`msg.error` truthy —
   verify the actual flag in `cwfStore` and use the real one), render a distinct block instead of
   a normal assistant bubble: `bg-(--chat-destructive-bg) border border-(--chat-destructive-border)
   text-(--chat-destructive-fg) rounded-xl p-3.5` + an `AlertTriangle` icon. Copy states what
   happened + how to recover, TR/EN via the existing `t` convention (e.g. TR:
   "ARMES bağlantısı yanıt vermedi (401). Günlük token yenilendikten sonra tekrar deneyin —
   Superset sorguları etkilenmez." / EN equivalent). Never apologetic, never vague.
4. **MessageChart (UX-05):** axis/tick/legend text `fontSize={10}` → `12`; `fill="#ffffff"
   fillOpacity={0.4-0.45}` → solid `fill="var(--chat-secondary)"` (no fillOpacity); legend
   `text-[10px] text-white/50` → `text-xs text-(--chat-secondary)`. Chart SERIES colors are out of
   scope — leave them.
**GATE UX.3:** the ban-list grep (UX.4's regex) already lands EMPTY on the scope files;
`vite build` clean; dev-server visual pass in both palettes.

### UX.4 — CI-permanent legibility gate + tests
1. NEW `src/components/ui/__tests__/chatLegibility.test.ts` — reads the scope files from disk and
   asserts ZERO matches of:
   `/(text|bg|border|ring|placeholder:text)-white\/\d+|#08080c|#040408|#121218|#1c1c24|text-\[10px\]|text-\[11px\]|fillOpacity=\{0\.[0-5]/`
   with a clear failure message naming file+line. (Suite-run = CI-enforced; this is the lesson from
   admin's RULE-16 regression — the ban must be a wired gate, not prose.)
2. NEW `src/store/__tests__/uiStoreTheme.test.ts` (or extend the existing uiStore test): default
   `'auto'`; `setTheme('dark')` persists to `localStorage['cwf.theme']`; hydrate-on-init reads it
   back; `setLanguage` persists `cwf.lang`.
3. NEW `src/lib/__tests__/useChatTheme.test.ts`: dark⇒false-light, light⇒true, auto follows a
   mocked `matchMedia` incl. change event.
4. ChatShell error-state test (new or extended): an error message renders the destructive
   container (query by role/testid + class), NOT a standard bubble; a normal message does not.
5. Sidebar test (extend if one exists, else new): theme row renders below language; click cycles
   light→dark→auto in the store.
**GATE UX.4:** full suite green; report NEW totals (recount — expect 121 + 3-to-4 files; do not
assume the number).

### UX.5 — Sanctioned preview harness + seal
1. **Harness (the C lesson — fresh-clone-reproducible evidence, no auth bypass of the real app):**
   NEW `src/dev/ChatPreview.tsx` + route `/dev/chat-preview` registered in `App.tsx` ONLY when
   `import.meta.env.DEV` (conditional route — tree-shaken from prod builds; assert via
   `vite build` + a grep of `dist/` for `chat-preview` returning nothing). The harness renders,
   with a mocked store (no network, no Supabase): (a) the welcome screen, (b) a conversation with
   a data table + the empty≠zero note, (c) an error message, (d) LoginPage — with a visible
   theme toggle. This is a component render harness, NOT an auth bypass: it imports components
   directly and never touches real routes/session.
2. RULE-26 evidence: screenshots at **1280 and 1024**, **dark AND light** (≥6 images: welcome ×2,
   conversation+error ×2, login ×2) + a programmatic clip check (scrollWidth==clientWidth) table.
3. `.agents/CHANGELOG.md` entry (CHAT-UX-1: what/how/verify, test delta, the ban-list gate).
4. Drift gate: `npm run check:doc-drift`; if a mapped tab flags (ui/** may be mapped),
   reseal-not-redraw + docVersion bump exactly as the gate directs; `[OK]` ⇒ no speculative bump.
5. **Frozen sweep (literal, must print nothing):**
   `git diff --stat 77b3aa1..HEAD -- api/ shared/permissions.ts shared/dbConstants.ts supabase/ scripts/verifyGrants.ts .mcp.json src/components/admin/ src/components/docs/ public/docs/ src/docs/`
   plus proof the admin/`:root` blocks of index.css are untouched:
   `git diff 77b3aa1..HEAD -- src/index.css` shows ONLY the appended chat blocks.
6. Merge `--no-ff` to master, push, report remote hash.

## 4. SELF-VERIFICATION REPORT (literal evidence — build-green is NOT acceptance)
Verbatim: pre-flight HEAD + 1221/121 tail + drift `[OK]` · per-gate outputs · final suite tail with
NEW counts (recounted) · ban-list grep empty on scope files · frozen-sweep empty output ·
index.css diff = additions-only proof · `dist/` grep proving the harness is absent from prod ·
the ≥6 screenshots + clip table · CHANGELOG hunk · drift final (+ manifest diff if resealed) ·
remote hash. The Architect fresh-clones and independently re-verifies every claim (RULE 25).

<!-- END · claude-code-PHASE-CHAT-UX-1-chat-theme-tokens-v1 · v1 · 2026-07-09 · anchor 77b3aa1 -->
