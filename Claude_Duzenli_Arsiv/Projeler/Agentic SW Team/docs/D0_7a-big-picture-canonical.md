# Stage D0.7a — Big Picture hero serves canonical bridge

> **Stage type:** V0 finalization (D0.7 group) · canonical document serving
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Estimated size:** M — Antigravity 30–45 min · human review 20–30 min
> **Merge mode:** operator-gated — CTO reviews the finalized big picture on Vercel preview
> **Predecessor:** D0.6d (`074485b`) — Phase D0 governance complete
> **Successor:** D0.7b — Document hub (Library)

---

## 1. Goal

Replace the card-based big picture on `/` with the **canonical bridge architecture document**, served directly from the repo via iframe. This is the calibration stage for canonical-document serving — the pattern D0.7b generalizes into the full Library.

After D0.7a:

- `/` renders `docs/architecture/03_bridge_revolutionize_builds_eaip.html` — the two-plane Revolutionize → EAIP diagram with the shared sovereign substrate band — fetched from `agbuilder-platform/revolutionize` at request time.
- Rendered via `<iframe srcDoc={...} sandbox="allow-scripts">` — pixel-identical to the canonical file, zero drift.
- Iframe height syncs to content via a render-time shim appended to the served HTML (the canonical file in the repo is **not** modified).
- The 8 interactive deep-dive tabs (EAIP/Rev architecture, connectivity, schedules, charter) stay exactly as they are.
- The old card-based big picture components are deleted (Pattern #26 — delete on replace).

**Bilingual note:** the canonical bridge is EN-only, so the landing page becomes EN-only. The deep-dive tabs remain bilingual. If the CTO requires a bilingual landing, swap `BRIDGE_PATH` to the v6 SSoT bilingual document (`docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`, which has a built-in toggle) — same mechanism, one constant change. Documented but not done in this stage.

---

## 2. Prerequisites

- D0.6d merged at `074485b`.
- `03_bridge_revolutionize_builds_eaip.html` committed to `agbuilder-platform/revolutionize` — **Step 0 verifies the exact committed path and filename**.
- `fetchDocumentContent(filePath)` exists in `app/_lib/github.ts` (added in D0.6d) — reused here, not rewritten.
- `GITHUB_PAT` env var has `Contents: Read` on the repo (existing from D0.6a).
- TypeScript strict passing. `npm run build` clean.

---

## 3. Context

### Reuse D0.6d's fetch — do not write a new one

`fetchDocumentContent(filePath)` from D0.6d returns `{ content: string; encoding: DocEncoding }` or `{ error: string }`. For the bridge file, `encoding` will be `'html'`. Call it directly. **Do not add a new fetch function.**

### The render — iframe with a height-sync shim

The bridge HTML is fully self-contained (inline `<style>`, and the schedule-family HTMLs carry inline render `<script>`s). It renders perfectly in `<iframe srcDoc={html}>`. Two technical points:

**Sandbox:** use `sandbox="allow-scripts"` (note: **without** `allow-same-origin`). This runs the document's embedded scripts in a null origin — safe isolation — while still permitting `parent.postMessage` (postMessage works cross-origin by design, so height-sync still functions).

**Height sync:** iframes don't auto-size to content. To avoid a fixed height that breaks across breakpoints (the bridge SVG is responsive — `width:100%; height:auto` — so its rendered height changes with viewport width), append a small reporter shim to the HTML *at render time*. This keeps the canonical repo file untouched.

```tsx
// app/_components/big-picture/BigPictureFrame.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

const HEIGHT_SHIM = `<script>
  (function () {
    function report() {
      parent.postMessage(
        { type: 'bp-height', height: document.documentElement.scrollHeight },
        '*'
      );
    }
    window.addEventListener('load', report);
    window.addEventListener('resize', report);
    if (window.ResizeObserver) new ResizeObserver(report).observe(document.body);
  })();
</script>`;

export function BigPictureFrame({ html }: { html: string }) {
  const [height, setHeight] = useState(1100); // fallback before first message
  const srcDoc = html + HEIGHT_SHIM;

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'bp-height' && typeof e.data.height === 'number') {
        setHeight(e.data.height);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <iframe
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      title="ARDICTECH Big Picture — Revolutionize builds EAIP"
      style={{ width: '100%', height, border: 'none', display: 'block' }}
    />
  );
}
```

### Page composition

```tsx
// app/page.tsx — server component
import { fetchDocumentContent } from '@/app/_lib/github';
import { BigPictureFrame } from '@/app/_components/big-picture/BigPictureFrame';
import { BigPictureError } from '@/app/_components/big-picture/BigPictureError';

const BRIDGE_PATH = 'docs/architecture/03_bridge_revolutionize_builds_eaip.html';
// ^ Step 0 confirms exact path. To make landing bilingual later, swap to the
//   v6 SSoT bilingual document — no other change required.

export default async function Home() {
  const result = await fetchDocumentContent(BRIDGE_PATH);
  if ('error' in result) {
    return <BigPictureError error={result.error} />;
  }
  return (
    <main className="w-full">
      <BigPictureFrame html={result.content} />
    </main>
  );
}
```

`BigPictureError.tsx` — server component, friendly message: heading "Big picture unavailable", the error detail in a mono block, and a note that the document is fetched from the revolutionize repo. Mirrors the `Phase0ErrorState` style from D0.6a.

### Components to delete (Pattern #26 — delete on replace)

The old card-based big picture from D0.3b / D0.3b.1. Step 0 records the exact files; expected candidates:
- `app/_components/big-picture/BigPictureHero.tsx`
- `app/_components/big-picture/LoopDiagram.tsx`
- `app/_components/big-picture/SubstrateBanner.tsx` (or similar)
- any other `big-picture/` components that only the old `/` used.

Verify each is imported **only** by the old `app/page.tsx` before deleting. If any is shared with another route, do not delete — report.

### What stays untouched

- All 8 deep-dive tabs and their components.
- The header / nav / language toggle (the toggle still works on every other route).
- `STRINGS.big` in `i18n.ts` — leave it in place for now (the bilingual swap option may use it). Do not delete the strings even though the new `/` no longer reads them. Note this as intentional dead-but-reserved data in the PR.

---

## 4. Step 0 mandatory reads

Before writing code, AG reads and reports:

1. **Repo path of the bridge file.** Confirm `docs/architecture/03_bridge_revolutionize_builds_eaip.html` exists in `agbuilder-platform/revolutionize` (fetch it via `fetchDocumentContent` as a test, or list `docs/architecture/`). Report the exact path and filename. If different from the assumed path, report the actual path — it becomes `BRIDGE_PATH`.
2. **`app/_lib/github.ts`** — confirm `fetchDocumentContent` exists with the D0.6d signature `(filePath) => Promise<{content, encoding} | {error}>`.
3. **`app/page.tsx`** — record current imports and the components it renders.
4. **`app/_components/big-picture/`** — list all files. For each, grep for imports across `app/` to confirm it's used only by the old `/`.
5. **Verify the fetched bridge HTML is self-contained** — confirm it has inline `<style>` and note whether it has inline `<script>` (the bridge itself may not; the schedule HTMLs do). This confirms the `sandbox="allow-scripts"` decision.

If `03_bridge` is not found at any `docs/` path: **report BLOCKED** — the file must be committed first.

---

## 5. Steps

**Step 0 — Reads.** §4. Report findings, especially the confirmed `BRIDGE_PATH`.

**Step 1 — `BigPictureFrame.tsx`.** Create the client component from §3.

**Step 2 — `BigPictureError.tsx`.** Create the server error-state component.

**Step 3 — Rewrite `app/page.tsx`.** Replace the card composition with the fetch + `BigPictureFrame` from §3. Use the confirmed `BRIDGE_PATH` from Step 0.

**Step 4 — Delete old big-picture components.** Only those confirmed used solely by the old `/` (Step 0 finding). Leave `STRINGS.big` in `i18n.ts`.

**Step 5 — TypeScript + build.** `npx tsc --noEmit` → 0. `npm run build` → clean (16 routes, unchanged count).

**Step 6 — Verify, commit, open PR.**
PR title: `"D0.7a: big picture hero serves canonical bridge"`.
PR body: Step 0 findings (confirmed BRIDGE_PATH, deleted components list) + screenshot of `/` on Vercel preview at desktop (1440px) and mobile (375px) widths showing the bridge rendered + iframe height correct (no clipping, no excess whitespace).

AG stops. Report PR URL.

---

## 6. Acceptance criteria

### Technical

- `npx tsc --noEmit` → 0. `npm run build` clean, 16 routes.
- `BigPictureFrame.tsx` first line is `'use client'`.
- `BigPictureError.tsx` has no `'use client'` (server component).
- `app/page.tsx` is a server component, calls `fetchDocumentContent`, no new fetch logic added.
- `grep -r "fetchDocumentContent" app/` shows it imported by `app/page.tsx` (server) — never by a client component.
- Old big-picture card components deleted; `grep -r "LoopDiagram\|BigPictureHero" app/` → 0 results.
- `STRINGS.big` still present in `i18n.ts` (reserved for bilingual swap).

### Functional — operator-verified on Vercel preview

- `/` renders the bridge: two planes (Revolutionize purple, EAIP blue), the down arrow "ships verified PRs", the amber reality-feed loop, and the shared substrate band with LiteLLM + MCP boxes.
- Iframe height fits the content — no internal scrollbar, no large empty gap below — at 1440px and at 375px.
- Resize the window from wide to narrow → iframe height re-syncs (the SVG reflows, height adjusts).
- The header / nav still render above the iframe; nav tabs still navigate to the 8 deep-dive routes.
- `GITHUB_PAT=invalid` (preview test) → `BigPictureError` renders cleanly, no crash. Restore the PAT after.

### No regression

- All 8 deep-dive tabs render and are still bilingual (toggle works).
- `/phase0` and `/phase0/[itemId]` unaffected.
- Console on `/` → zero errors, zero warnings (note: a sandboxed iframe may log a benign sandbox notice in some browsers; document if seen, but no app-level errors).

---

## 7. Edge cases

- **Bridge file moved or renamed after Step 0:** `fetchDocumentContent` returns `{ error }` → `BigPictureError` renders. The PR body's confirmed path is the contract.
- **Iframe height message never arrives** (script blocked, old browser): fallback height of 1100px applies — content may scroll internally but renders. Acceptable degradation.
- **`sandbox="allow-scripts"` blocks the bridge's own rendering:** the bridge is mostly static SVG; if it has no inline script it renders fine regardless. If a schedule-family HTML is ever served here, `allow-scripts` is required — already set.
- **CSP on the host blocks `srcDoc`:** Next.js default has no CSP that blocks srcDoc. If a CSP is added later, `frame-src 'self'` plus srcDoc allowance is needed — out of scope now, note for future.
- **Very tall content on mobile:** the iframe grows to full content height; the page scrolls normally. No max-height clamp — the whole document should be readable.

---

## 8. Verification approach

1. Open Vercel preview `/`. Confirm the bridge architecture renders (two planes + substrate + LiteLLM/MCP).
2. Confirm no internal iframe scrollbar at 1440px; the whole diagram + cards + footer visible by scrolling the page, not the frame.
3. Shrink to 375px. Confirm the SVG reflows and the iframe height re-syncs (no clipping).
4. Click each of the 8 nav tabs → confirm deep-dive routes still work and are bilingual.
5. Toggle EN/TR on a deep-dive tab → still works. (Landing `/` is EN-only by design — confirm this is the expected CTO-reviewed behavior.)
6. DevTools console on `/` → no app errors.

If all pass → send: **`"Approved — merge D0.7a"`**.

---

## 9. Antigravity configuration

**Model recommended:** Sonnet 4.6 thinking. Iframe height-sync + server/client split + safe component deletion — moderate, with the height-sync being the one non-obvious piece.

**Watch for:**
- AG writing a new GitHub fetch instead of reusing `fetchDocumentContent`. Reject.
- AG using `sandbox` with `allow-same-origin` added. Reject — `allow-scripts` alone is the safe combination; adding same-origin defeats the isolation.
- AG modifying the canonical bridge file in the repo to add the height script. Hard reject — the shim is appended at render time in `BigPictureFrame`, the repo file stays pure.
- AG setting a fixed iframe height with no sync. Reject — breaks across breakpoints; the height-sync shim is required.
- AG deleting `STRINGS.big` from `i18n.ts`. Reject — reserved for the bilingual swap option.
- AG re-implementing the bridge as React/SVG instead of serving the canonical HTML. Hard reject — the entire point is zero-drift canonical serving.
- AG deleting a big-picture component that's shared with another route. Reject — Step 0 must confirm sole usage before deletion.
- AG making `/` a client component to handle the iframe. Reject — the page stays server (fetches HTML); only `BigPictureFrame` is client.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.7a-lessons.md`:

```md
# D0.7a Lessons

**Stage:** D0.7a — Big picture hero serves canonical bridge
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun (+ CTO sign-off pass)
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity**

**Stage size actual:** [Xm] (estimated M: 30–45 min)
**Model used actual:** [Sonnet 4.6 thinking / other]
**Files created:** app/_components/big-picture/BigPictureFrame.tsx, BigPictureError.tsx
**Files modified:** app/page.tsx
**Files deleted:** [old big-picture components — list]

**Step 0 findings:**
- Confirmed BRIDGE_PATH: [docs/architecture/03_bridge_... or actual]
- fetchDocumentContent signature matches D0.6d: [✅]
- Old big-picture components found: [list]
- Each confirmed sole-use by old `/`: [✅ / shared — kept]
- Bridge HTML self-contained (inline style): [✅] · inline script present: [yes/no]

**Height-sync shim appended at render time (repo file unchanged):** [✅]
**sandbox="allow-scripts" without allow-same-origin:** [✅]
**fetchDocumentContent reused (no new fetch fn):** [✅]
**STRINGS.big left in place:** [✅]
**Bridge re-implemented as React (should NOT be):** [confirmed served as canonical HTML]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**Bridge renders on / (two planes + substrate + LiteLLM/MCP):** [✅ / ❌]
**Iframe height fits at 1440px (no scrollbar, no gap):** [✅ / ❌]
**Iframe height re-syncs at 375px:** [✅ / ❌]
**8 deep-dive tabs still work + bilingual:** [✅ / ❌]
**Landing EN-only confirmed acceptable (or bilingual swap requested):** [accepted / swap requested]
**Error state renders with invalid PAT:** [✅ / ❌]
**Console zero app errors on /:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**CTO sign-off on finalized big picture:** [✅ / pending]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — appended post-merge.
```

---

**End of Stage D0.7a prompt. D0.7 finalization group — calibration stage for canonical document serving.**
