# Stage S6–S7 (combined) — Tab flip to SSoT + Retire React content layer

> **stage_id:** S6-S7  
> **stage_type:** Phase 2 · App repo · re-point + clean up  
> **author:** Claude (architect · single-author rule)  
> **date:** 2026-06-03 (v2 — re-verified post S2c/S2d.1/S2d.2 cookbook merges)  
> **model_recommended:** Claude Sonnet 4.6, thinking mode  
> **model_used_actual:** [AG fills in `lessons.md`]  
> **estimated_size:** M — AG 30–45 min · human review 20 min (Vercel preview)  
> **merge_mode:** operator-gated — AG opens PR, Vercel preview auto-deploys, AG reports, stops. Operator checks preview URL for all 8 tabs + cookbook features, signals. AG merges.  
> **predecessor:** S3-S5 ✅ (verified clean; cookbook merges S2c/S2d.1/S2d.2 also landed)  
> **successor:** None — migration complete. S8 (Library tidy) is deferred/skipped. S2e (progress tracker) is a future workstream, not part of the migration.

> **v2 note (architect):** Re-verified against v6 SSoT post-cookbook expansion.
> File grew from ~25 KB to 247 KB; single `<script>` tag preserved; all seven
> section keys (`big, earch, econn, eplan, rarch, rconn, rplan`) still valid;
> `switchTab` function intact; `.hdr` selector unchanged. Three additions in
> v2: Step 0h (iframe-sizing check), expanded §10 cookbook acceptance,
> §10.5 operator informational notes.  

---

## 1. Goal

This is the stage where the tool becomes the SSoT. Two pieces of work in one PR:

**S6 — Flip all 8 content tabs to frame the SSoT (or charter):**
Each content tab currently renders a React component that hand-copies
canonical content from `app/_data/*.ts`. After this stage, each tab
frames the authoritative source directly via `DocumentFrame`, with a
small preamble injected app-side to hide the SSoT's own nav and jump to
the correct section. The top nav of `TheBluePrint23` is unchanged (Choice 2).

Tab mapping:
| Tab | Source | Section |
|---|---|---|
| Big Picture | SSoT | `big` |
| EAIP · Arch | SSoT | `earch` |
| EAIP · Connectivity | SSoT | `econn` |
| EAIP · Plan | SSoT | `eplan` |
| Revolutionize · Arch | SSoT | `rarch` |
| Revolutionize · Connectivity | SSoT | `rconn` |
| Revolutionize · Plan | SSoT | `rplan` |
| Bridge | Charter | (single scroll — no section) |

**S7 — Delete orphaned content layer:**
Once S6 is wired and verified on the Vercel preview, delete the React
content components (the ones replaced by the DocumentFrame approach) and
the `app/_data/*.ts` content files they read from. Delete the stale
`docs/` directory that exists in the app repo (a duplicate of the content
repo). App-machinery files (`i18n.ts`, `nav.ts`, `resources.ts`, and any
file still imported by Phase 0, Library, or Resources tabs) are NOT deleted.

**S8 (Library manifest tidy) is deferred** — the Library still works;
the standalone docs 01–07 just appear as redundant entries. Skip.

---

## 2. Repos in scope

- **App repo (primary):** `maymun207/TheBluePrint23`
- **Content repo (read-only reference):** `agbuilder-platform/revolutionize`

All code changes are in the app repo. Content repo is not touched.

---

## 3. Step 0 — Read live app repo before writing any code

Read the following files from the live `maymun207/TheBluePrint23` repo
and report their content/structure:

**3a. DocumentFrame component**
Find `DocumentFrame.tsx` (likely at `components/DocumentFrame.tsx` or
`app/_components/DocumentFrame.tsx`). Report:
- The prop interface (especially: what prop receives the HTML string?
  Is it `srcDoc`? Is there a `section` or `lang` prop?)
- Whether it uses `srcDoc` or `src`
- Whether `sandbox="allow-scripts"` is present
- Current full implementation (it should be short — ≤50 lines)

**3b. GitHub/content fetch utility**
Find `app/_lib/github.ts` (or similar). Report:
- The function signature for fetching a doc (likely `fetchDoc(path)` or
  similar)
- The full content repo path it reads from
  (expected: `agbuilder-platform/revolutionize`, branch `main`)
- Any caching or error handling to be aware of

**3c. Big Picture tab**
Read `app/page.tsx`. Report what it currently renders (expected: it
frames `03_bridge_revolutionize_builds_eaip.html` but is labelled "Big
Picture" — this is the known wrong mapping).

**3d. All 7 content tab page files**
List and read the page.tsx (or equivalent) for each content tab route:
EAIP Arch, EAIP Conn, EAIP Sched, Rev Arch, Rev Conn, Rev Sched, Bridge.
For each, report:
- Route path
- Which React component it renders
- Whether that component imports from `app/_data/`

**3e. `app/_data/` directory**
List all files. Identify which are content copies (to delete in S7)
vs machinery (to keep). Machinery = files still imported by Phase 0,
Library, Resources, or nav/i18n logic.

**3f. `docs/` directory in app repo**
Check whether `docs/` exists in the app repo. If so, list its contents.

**3g. Charter header class**
Read `docs/architecture/08_leadership_charter_bilingual.html` from the
**content repo** (`agbuilder-platform/revolutionize`). Report what CSS
class or ID the top header uses (to know what the embed preamble must hide).

**3h. DocumentFrame iframe sizing (v2 — cookbook-aware)**
Report from `DocumentFrame.tsx`:
- The iframe `height` and `width` attributes (or inline styles)
- Any wrapping container with `height: 100vh`, `min-height`, `aspect-ratio`,
  or fixed pixel sizing
- Whether the iframe scrolls internally (scrollbar visible) or shows
  parent-page scrolling instead

**Why this matters:** the cookbook panel (S2c/S2d.1/S2d.2) renders as a
right-side overlay via `position: fixed` inside the iframe. Its content
can be tall — subtitle + owner + desc + deploy + config table + sample code
block + ops table + 2–3 failure modes + inbound/outbound connections +
notes + repo. For the panel to be fully usable, the iframe must render at
substantial height (ideally full viewport or close). If DocumentFrame
constrains the iframe to a short height (e.g., 400px), the panel will be
truncated and the cookbook UX degrades.

**Decision rule:** if the iframe is shorter than `min(800px, 80vh)`,
flag this in the Step 0 report. Suggested fix: `height: calc(100vh - <top-nav-height>px)`
on the iframe or its container. Do NOT silently change DocumentFrame —
report and let the operator decide.

Stop. Report all findings. Proceed to Step 1 only after reporting.

---

## 4. Step 1 — Create `ssoFrame` utility helper

Create a small server-side utility to avoid repeating the embed pattern
in every page file. Location: `app/_lib/ssoFrame.ts` (alongside
`github.ts`).

```typescript
import { fetchDoc } from './github'  // adjust import path if different

const SSOT_PATH = 'docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html'
const CHARTER_PATH = 'docs/architecture/08_leadership_charter_bilingual.html'

/**
 * Fetch the SSoT and inject an embed preamble that:
 *   1. Hides the SSoT's own nav bar (.hdr)
 *   2. Jumps to the requested section after load
 *
 * The preamble is inserted immediately before the SSoT's <script> block
 * so that switchTab() (defined inside that script) is available when
 * the load listener fires.
 */
export async function ssoFrame(section: string): Promise<string> {
  const html = await fetchDoc(SSOT_PATH)
  const preamble =
    '<style>.hdr{display:none!important}</style>' +
    '<script>window.addEventListener("load",function(){' +
    'if(typeof switchTab==="function")switchTab("' + section + '");' +
    '});</script>'
  // Replace the first (only) <script> tag in the SSoT
  return html.replace('<script>', preamble + '<script>')
}

/**
 * Fetch the leadership charter and inject an embed preamble that:
 *   1. Hides the charter's own header
 *   (No switchTab needed — charter is a single-scroll document)
 *
 * AG: in Step 0 you read the charter header class. Replace '.hdr' below
 * with the actual class/ID you found if it differs.
 */
export async function charterFrame(): Promise<string> {
  const html = await fetchDoc(CHARTER_PATH)
  // Adjust the selector below if Step 0 reveals the charter uses a
  // different class or ID for its top header.
  const preamble = '<style>.hdr{display:none!important}</style>'
  return html.replace('<head>', '<head>' + preamble)
}
```

**AG note:** if `fetchDoc` is async and uses different error-handling
patterns, adapt accordingly. Do not change `github.ts` itself.

---

## 5. Step 2 — Big Picture tab (fix the wrong mapping)

`app/page.tsx` currently frames `03_bridge_…html` but is labelled "Big
Picture." Replace its content with an SSoT frame at section `big`.

Confirm exact current implementation from Step 0, then replace the page
body to use `ssoFrame('big')`. The page should be a Next.js async server
component. Example final shape:

```tsx
import DocumentFrame from '@/components/DocumentFrame'  // adjust path
import { ssoFrame } from '@/lib/ssoFrame'  // adjust path

export default async function BigPicturePage() {
  const srcDoc = await ssoFrame('big')
  return <DocumentFrame srcDoc={srcDoc} />
}
```

Remove any import of the old content component (`03_bridge_…` framing or
whatever Step 0 reveals). Keep any page-level metadata (`export const
metadata = …`) if present — just replace the render logic.

---

## 6. Step 3 — Six architecture/plan tabs

For each of the six content tabs (EAIP Arch, EAIP Conn, EAIP Sched, Rev
Arch, Rev Conn, Rev Sched), replace the existing page body to call
`ssoFrame` with the correct section key.

| Tab | Section key |
|---|---|
| EAIP Arch | `'earch'` |
| EAIP Connectivity | `'econn'` |
| EAIP Plan / Sched | `'eplan'` |
| Revolutionize Arch | `'rarch'` |
| Revolutionize Connectivity | `'rconn'` |
| Revolutionize Plan / Sched | `'rplan'` |

For each file, confirm exact current implementation from Step 0, then
replace the render body. Pattern (same as Big Picture, different section):

```tsx
import DocumentFrame from '@/components/DocumentFrame'  // adjust path
import { ssoFrame } from '@/lib/ssoFrame'              // adjust path

export default async function [TabName]Page() {
  const srcDoc = await ssoFrame('[section-key]')
  return <DocumentFrame srcDoc={srcDoc} />
}
```

---

## 7. Step 4 — Bridge tab (frame the charter)

Replace Bridge tab to frame the leadership charter via `charterFrame()`:

```tsx
import DocumentFrame from '@/components/DocumentFrame'  // adjust path
import { charterFrame } from '@/lib/ssoFrame'          // adjust path

export default async function BridgePage() {
  const srcDoc = await charterFrame()
  return <DocumentFrame srcDoc={srcDoc} />
}
```

Note: the charter has its own bilingual toggle (`setLang`) — it will
work inside the frame since `sandbox="allow-scripts"` is set.

---

## 8. Step 5 (S7) — Delete orphaned content files

After completing Steps 2–4, and **only after confirming the build is
clean**, delete:

**8a. React content components**
Delete the React component files that previously powered each content tab
(the components replaced by DocumentFrame in Steps 2–4). Use the file
list from Step 0d. Keep: any component still imported by Phase 0,
Library, or Resources tabs.

**8b. Orphaned `app/_data/*.ts` content files**
Delete any `app/_data/*.ts` files that are only imported by the deleted
content components — i.e., content copies of the canonical docs. Keep:
- `i18n.ts` (if it powers nav labels, language toggle state, or Phase 0)
- `nav.ts` (if it powers the top-nav tab list)
- `resources.ts` (if it powers the Resources tab)
- Any other file still imported by a non-content component

When in doubt about a file, **keep it** — a false-positive deletion
causes a build error that's caught on preview; a missed file is harmless.

**8c. App-repo `docs/` duplicate**
If Step 0f confirmed `docs/` exists in the app repo, delete the entire
directory. The content repo is authoritative; the app-repo `docs/` is
stale.

---

## 9. Build verification (before opening PR)

Run the Next.js build in the app repo and confirm:

- `next build` exits 0 with no TypeScript errors
- No `Module not found` or missing import errors
- All page routes resolve without error

If the build fails:
1. **Do not open the PR.**
2. Diagnose the failure — most likely a remaining import of a deleted
   component. Fix the import (either remove it or keep the file if it
   turns out to be needed by something else).
3. Re-run the build.

---

## 10. Acceptance criteria

AG confirms each item before opening the PR.

**Structural:**
- [ ] `app/_lib/ssoFrame.ts` created and exports `ssoFrame` and `charterFrame`
- [ ] `app/page.tsx` (Big Picture) no longer imports any old bridge/big-picture component
- [ ] All 7 content tab pages (Big Picture + 6 architecture/plan tabs) import from `ssoFrame`
- [ ] `app/bridge/page.tsx` imports from `charterFrame`
- [ ] `next build` exits 0 — report the build output
- [ ] No remaining imports of deleted content components anywhere in the app

**Vercel preview (operator — run before merging):**

The PR triggers a Vercel preview. Operator checks the preview URL for
each of the following:

1. **Big Picture** — shows the SSoT `renderBig` output (two cards:
   Revolutionize + EAIP; substrate band; note). NOT the old Bridge-as-
   Big-Picture content.
2. **EAIP · Arch** — shows the 10-layer chip grid from the SSoT;
   click-to-detail panel opens on chip click; SSoT's own tab bar is
   hidden; app's top nav is intact.
3. **EAIP · Connectivity** — shows the hot-path SVG + filterable table.
4. **EAIP · Plan** — shows the Gantt + phase cards. Insurance bar reads
   "Insurance v0.8" (S3-S5 fix visible here).
5. **Revolutionize · Arch** — shows the 5 system pcards; click on a
   pcard opens the connection detail panel.
6. **Revolutionize · Connectivity** — shows the three-column integration
   map + filterable table.
7. **Revolutionize · Plan** — shows the Gantt + open prerequisites; ④
   shows "✓ RESOLVED"; ⑤ shows "Required capabilities".
8. **Bridge** — shows the leadership charter content (governance: CTO
   gates, model routing, risk register, skill map, kickoff, open items).
   NOT the old React Bridge content.
9. **Phase 0, Library, Resources** — all three app-machinery tabs render
   normally. No regressions.
10. **EN / TR toggle** — on any SSoT-framed tab, the SSoT's own toggle
    buttons (embedded inside the frame) switch language correctly.
    App-level top nav and tab labels remain EN (they use `nav.ts` /
    `i18n.ts` — not affected).
11. **No double nav** — no second tab bar visible inside any framed tab
    (the `.hdr` hide preamble is working).

**v2 additions — cookbook features inside framed tabs (operator):**

12. **EAIP Arch cookbook panel** — click `Channel gateway` chip → panel
    opens with: subtitle ("one brain → many surfaces"), Backend owner
    badge, description, Deployment box, Configuration keys table, **Sample
    call** section (bash, curl webhook), **Operations** table (health,
    metrics, log, trace), **Failure modes** (red left-border, 2 items),
    Inbound + Outbound connections, Implementation notes, repo footer link
    to `github.com/agbuilder-platform/channel-gateway`.
13. **EAIP Arch cookbook depth check** — click `LangGraph` → panel shows
    **3 failure modes** (LangGraph is the exception). Click `WhatsApp` →
    panel shows only the S2c sections (no Sample/Operations/Failure modes —
    external component).
14. **EAIP Conn inline expand** — click any row → detail row expands
    below with type description, protocol, purpose, phase. Click row again
    → collapses. Filter or lang toggle → all detail rows close cleanly.
15. **EAIP Conn cross-link** — FROM and TO names in the connectivity
    table have a dotted underline; hover changes cursor to pointer and
    color to blue. Click a name → the component's full cookbook panel
    opens. (This is the cookbook navigation primitive working inside the
    framed iframe.)
16. **HTML escape sanity** — click `LlamaIndex` chip → in the second
    failure mode, the symptom text contains "Retrieval slow (>500ms)"
    rendered as literal text, not a broken HTML tag.
17. **Embed widget sample escape** — click `Embed widget` chip → Sample
    call section shows `<script>` tags rendered as text (HTML-escaped),
    NOT executed as live HTML. (Confirms Pattern #16 — `<\/script>` source
    escape — survives the framing.)
18. **Panel scrollability** — open the deepest panel (LangGraph has
    most content: 3 errors + many connections + long notes). Confirm the
    panel content scrolls within itself; bottom of repo footer is reachable.
    If not, the iframe is too short — flag back to architect (Step 0h
    should have caught this earlier).

---

## 10.5 Operator informational notes (v2)

Two non-blocking heads-ups that may affect what you see in the preview:

**A. File size growth.** The v6 SSoT is now 247 KB (was ~25 KB when this
prompt was first authored). All seven SSoT-framed tabs now fetch a 247 KB
HTML document. Concrete impact:
- First view per tab: ~100–300 ms additional load over the old React
  rendering. Subsequent views in the same session are cached.
- All seven tabs frame the **same** SSoT — fetch could be optimized later
  with a shared cache in `ssoFrame`, but this is not a blocker.
- The Bridge tab frames a different doc (charter) — its size is unchanged.

**B. Possible "tab flash" on first load.** The SSoT's `<body>` is set up to
show the `big` section by default (`<section class="sec vis" id="sec-big">`).
The preamble's `load` listener fires `switchTab(section)` *after* DOM is
ready. So on tabs other than Big Picture, you may briefly see Big Picture
content (~50 ms) before it switches. This is cosmetic, not a bug. If it's
visually objectionable, a future polish stage can hide the body with
`opacity: 0` until switchTab fires. **Do not request a fix here** — keep
this stage focused on the structural flip.

**C. Cookbook interactivity is self-contained.** All cookbook features
(chip click panels, inline row expansion, FROM/TO cross-link) run via
JavaScript inside the iframe. The DocumentFrame's `sandbox="allow-scripts"`
attribute permits this. Confirm in Step 0a — if `allow-scripts` is missing,
cookbook features will not work and the entire flip is a regression vs.
the current React implementation.

---

## 11. PR and merge gate

PR title: `S6-S7: flip 8 content tabs to SSoT + retire React content layer`  
PR body includes:
- Step 0 findings (DocumentFrame prop interface, fetchDoc signature,
  Big Picture current state, tab file list, _data directory, docs/
  presence, charter header class, **iframe sizing assessment from 0h**)
- Build output (exit code + any warnings)
- List of deleted files (components + _data + docs/)
- Structural acceptance items (all checked)
- v2 cookbook acceptance items (12–18) — operator will verify on preview,
  but AG should at minimum confirm: Step 0a found `sandbox="allow-scripts"`
  on DocumentFrame (without it, items 12–18 will fail)

**AG stops after opening the PR.** Operator checks the Vercel preview
URL for all **18 items** above (11 original + 7 v2 cookbook checks). AG
merges only after operator signals approval.

---

## 12. Lessons.md

After merge, AG appends to `docs/process/lessons.md` in the
**content repo** (`agbuilder-platform/revolutionize`):

```
## S6-S7 (combined) — Tab flip + Retire React content layer
### AG delivery summary
Model: [model] · PR: [#N] · Merge SHA: [sha]
Step 0: DocumentFrame prop: [name] · sandbox: [present/missing] · fetchDoc: [signature]
  Big Picture was: [what it framed] · Charter header class: [class]
  Iframe sizing (0h): [pass / flagged — reason]
Build: exit [0/1] · warnings: [N]
Deleted components: [list] · Deleted _data files: [list]
Docs/ in app repo: [present/absent] · deleted: [yes/no]
Structural checks: [all pass / failures]
### Operator review
[Maymun fills in after Vercel preview check — 18 items: 11 original + 7 cookbook]
### Prompt-author retrospective
[Claude fills in next session]
```

---

## 13. Migration complete

After this PR merges:

- Every content tab in `theblueprint23.dev` renders from the single SSoT
  or charter — no React re-implementation, no `app/_data` content copies.
- Fix the SSoT → every tab updates automatically at next deploy.
- The drift defect is permanently eliminated.
- S8 (Library manifest tidy) is deferred — harmless, do it later when
  convenient.
