# CWF — Session Graph KB · v28

<!-- v28 · 2026-07-09 · anchor = master HEAD `f77df8c` (1285 tests / 126 files / docVersion rev 53 / drift [OK]).
     Supersedes v27. Session 28 was a UX / THEME window: three phases shipped end-to-end (C, CHAT-UX-1,
     ADMIN-THEME-1), each Architect-designed → AG-built → RULE-25-reviewed → merged. Central themes:
     the chat/admin got a real theme system (global cwf.theme), legibility became a wired CI gate, and
     the Architect learned to produce RULE-26 evidence headlessly (which caught a real harness bug). -->

## Anchor
- HEAD `f77df8c` · 1285 tests / 126 files · docVersion **rev 53** · drift [OK].
- First-parent spine this window: `5485a96` (start) → `77b3aa1` (C) → `8632eac` (CHAT-UX-1) → `f77df8c` (ADMIN-THEME-1).

## Window narrative (Session 28)

### 1. C — User Docs reader (`77b3aa1`)
Bootstrap-verified at `5485a96`; the C design note (v1, anchored `84f4601`) still held. Owner pivoted
mid-phase: the app has NO markdown lib and the original plan was an HTML-iframe "twin" (a hand-rendered
`.html` alongside the canonical `.md` — a drift vector I over-engineered). Owner's spec superseded it:
**`.md` is the single stored form, rendered at runtime**, and clicking a doc opens a **new browser tab**
with a GitHub-Docs-style reader (left rail · breadcrumb · content · right TOC). Design v2. I authored the
standing textbook **`cwf-governance-replay-explained-v1.md`** (the owner-flagged CRITICAL deliverable:
what a lens is · token-free governance regression testing · the three lenses as three data-agent failure
modes · ADR-001 make-a-lying-backend-harmless · the real 2026-07-06 Wilson-CI A/B worked example). AG
built it: `react-markdown`+`remark-gfm`+`rehype-sanitize`, `registry.ts` (a future doc = one `.md` + one
row), `DocsReader.tsx`, a nav item that `window.open`s (deliberately NOT a Tab-union member). AG's ONE
clarifying question (the §5 table reached it flattened) → I overrode transcription with a **hard sha256
gate** on an Architect-supplied canonical file (byte-exact `a62763…240a`); I first mis-instructed
"hand AG the file" (impossible — AG codes, it can't receive files) then corrected to content-fidelity +
the sha256/verbatim-block approach. Reviewed + accepted; 1213/119 → 1221/121.

### 2. CHAT-UX-1 — the chat gets a real theme system (`8632eac`)
Owner: "CWF çok karanlık ve okunamıyor gerçekten KÖTÜ" — genuine frustration with the gloomy chat
palette. I ran a RULE-25-grounded review of an external UX audit: it **miscategorized** the intentionally
dark chat shell (`src/components/ui/*`, NOT under RULE 16) as RULE-16 violations, but its UX-01 (admin
`text-[10/11px]`) was a REAL regression — and the deeper find was that RULE 16 was asserted "grep-enforced"
with **no actual CI gate** (61 violations had accumulated silently). Root cause of the gloom: the chat
shell had **no token system** — solid near-black + pervasive transparency-washed `text-white/N`. I built a
3-palette live-toggle mockup grounded in the factory's material world (porcelain/clay); owner chose
**Warm Dark + Light + Auto**. AG built `.chat-theme` (+`.light`) oklch tokens (I measured 24/24 WCAG PASS),
`uiStore.theme` persisted to `cwf.theme`, a Sidebar toggle, full migration off literals, the UX-04 error
container, UX-05 chart contrast, and the **`chatLegibility` CI gate** (proven to fire). AG's clarifying
question on decorative cold literals (violet user-avatar, cyan new-chat, `#8cc9ff` login) → I committed
**Option-3-corrected**: full RULE 1, preserve user≠bot via neutral-not-hue, retire the cold identity,
extend the grep. 1221/121 → 1250/125. **THEME-1 folded in here.**

### 3. ADMIN-THEME-1 — admin joins the global theme (`f77df8c`) — the long one
Owner: the theme toggle applies to chat but NOT admin/settings — "neden admin'i dokunmadan bıraktık?"
**A fair challenge; my mistake.** CHAT-UX-1 scoped the toggle to `.chat-theme` for phase hygiene, which
produced a half-working global control. Corrected principle: **theme is GLOBAL** (chat + admin + docs, one
system). Grounding was reassuring: `.admin-theme.dark` already existed (34 tokens, dormant); DocsReader
already honored `cwf.theme`; the 61 violations were ALL `text-[10/11px]` (zero opacity), 56 in ReplayTab;
the dark palette measured 10/12 WCAG PASS, needing 2 fixes. I authored the combined phase (theme wiring +
palette activation + legibility + admin CI gate). Then a **multi-failure recovery saga**:
- **AG crashed mid-phase**, recovered in a NEW session, reported the work "commit'lendi (12f7917)" — but
  the branch was **NOT pushed** (remote had only master). I caught it: unreachable = unreviewable AND
  at-risk (AG had already crashed once). Told AG to **push the branch (not merge)** — the safe intermediate.
- Branch reviewed: code all PASS, BUT (automation-first) I tried to produce the RULE-26 evidence myself
  via `vite dev` + playwright + system Chrome — and the `/dev/admin-preview` harness **rendered blank**:
  `Cannot destructure 'basename'` — AdminPanel renders react-router `<Link>`s but the harness short-circuits
  ABOVE `<BrowserRouter>`, so no router context → crash. A real defect the harness's own "added" status
  had hidden. Told AG to wrap the harness in `MemoryRouter`.
- AG fixed (`180ef3a`); I re-verified (tree-shake JS-bundle = 0; the "2 dist hits" were benign CHANGELOG
  prose) and **produced the RULE-26 evidence myself**: 4 panel shots (1280/1024 × dark/light, all
  clip-clean, `.admin-theme.dark` correctly applied only in dark) + a **portal-in-dark** shot proving the
  central trap (portaled Radix content, rendered to `document.body`, is dark-themed). Accepted, authorized
  merge; AG merged `--no-ff` → `f77df8c`. Post-merge: master tree == the verified branch tip (suite re-run
  redundant). 1250/125 → 1285/126.

## Permanent learnings (carry forward as standing rules)
- **Theme is GLOBAL.** Chat, admin, and docs are one theme system driven by a single `localStorage['cwf.theme']`
  (`dark|light|auto`), resolved by the `useChatTheme()` hook. Never ship a half-global toggle. Chat and admin
  keep SEPARATE token sets (`.chat-theme` = warm dark/porcelain; `.admin-theme` = neutral shadcn light/dark)
  but obey the SAME key. The docs reader rides the admin tokens.
- **Legibility is a WIRED CI grep, not prose.** RULE 16 was asserted "grep-enforced" but had no gate → 61
  regressions. The fix pattern (now standing): a disk-reading vitest gate (`chatLegibility`, `adminLegibility`)
  that scans source for banned tokens (`text-white/N`, `text-[10/11px]`, cold-color utilities, raw hex, raw
  `"admin-theme"`), excludes `__tests__`, asserts `.toEqual([])` with file:line, and is proven to fire.
- **md-native docs beat an HTML twin.** `react-markdown`+`remark-gfm`+`rehype-sanitize`; a doc = one `.md`
  under `public/docs/` + one `registry.ts` row. When AG must ship Architect-authored content verbatim and
  transmission may flatten it, use a **sha256 byte-exact gate** on a canonical file (don't rely on
  re-transcription). `.md` also ports cleanly if we ever migrate to a docs platform.
- **DEV preview harnesses are deliverables and must supply router context.** Wrap router-context components
  in `MemoryRouter` or the harness blank-crashes; "added" ≠ "renders" — prove it renders. Keep the harness
  DEV-gated (`import.meta.env.DEV`) and prove tree-shaken via `dist/assets/*.js` grep = 0.
- **Always push the feature branch on phase completion** (even without merging). Unpushed work is
  unrecoverable + unreviewable — a hard rule after this window's crash-then-unpushed saga. Safe sequence:
  push branch → Architect RULE-25 review → RULE-26 evidence → AG merges `--no-ff` → Architect post-merge.
- **Architect produces RULE-26 evidence headlessly.** System Chrome (`/opt/google/chrome/chrome`) +
  playwright-core + `vite dev`, driving a DEV harness with `localStorage['cwf.theme']` seeded per shot.
  This removes the owner's manual-screenshot step AND catches harness render bugs (it caught the crash).
- **Measured, not vibes.** Every token pair is proven oklch→linear→WCAG before shipping (chat 24/24;
  admin dark 10/12 as-found + 2 measured fixes). Decorative dividers are NOT held to 3:1 (consistent with
  the accepted light theme); text pairs are ≥4.5:1, icon-on-fill ≥3:1.
- Carried (still in force): sandbox-vs-global RBAC · empty≠zero sacred · DB-first/code-floor SSOT ·
  injection boundary (tool content = DATA) · trust = deterministic never an LLM judge · ADR-005 apply
  authority · ADR-006 agent modes · the `.mcp.json` plugin-override trap · SECURITY DEFINER lockdown ·
  the private-schema authz invariant.

## Open / carried to register v28
Next substantive work = the **scope/authority lens** (Part A widen — `checkScopeDivergence`,
`backendAuthority` axis; design note first). Then endpoint switcher → GOVERN polish/P7. Owner aesthetic
sign-off on the dark palettes is still open (cheap token tweak if requested).

<!-- END · CWF-SESSION-GRAPH-KB · v28 · 2026-07-09 -->
