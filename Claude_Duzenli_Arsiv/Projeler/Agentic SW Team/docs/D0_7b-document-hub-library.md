# Stage D0.7b — Document hub (Library)

> **Stage type:** V0 finalization (D0.7 group) · document hub
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Estimated size:** L — Antigravity 60–80 min · human review 30–40 min
> **Merge mode:** operator-gated — CTO reviews the reading room on Vercel preview
> **Predecessor:** D0.7a (`b0958e8`) — canonical bridge serving on `/`
> **Successor:** D0.7c — Resource allocation dashboard

---

## 1. Goal

Add a **Library** — the team's reading room. A manifest-driven hub that lists every program document and renders it in-app: markdown via react-markdown, HTML via the iframe pattern D0.7a established. Single source of truth, fetched from the repo at request time, updated by a git commit.

After D0.7b:

- New `/library` route — lists all manifest documents grouped by category (Architecture / Schedules / Decisions / Process), bilingual.
- New `/library/[docId]` route — renders one document. HTML → iframe with height-sync; Markdown → react-markdown.
- A 9th nav tab "Library" / "Kütüphane" added, verified not to overflow the responsive nav.
- The D0.7a iframe logic is consolidated into a shared `DocumentFrame` component used by both `/` and `/library/[docId]` — `BigPictureFrame` is deleted (Pattern #35 grep applies).
- Documents not yet committed render a clean "not yet available" state — no broken links.

---

## 2. Prerequisites

- D0.7a merged at `b0958e8`. `/` serves the canonical bridge via iframe.
- `docs/library/manifest.json` committed to `agbuilder-platform/revolutionize` (see library-commit-guide).
- The 9 architecture HTMLs committed under `docs/architecture/` (D0.7a setup).
- `fetchDocumentContent(filePath)` exists in `app/_lib/github.ts` (D0.6d). `MarkdownRenderer` exists at `app/_components/phase0/MarkdownRenderer.tsx` (D0.6d).
- `BigPictureFrame.tsx` exists from D0.7a (will be consolidated/deleted here).
- TypeScript strict passing. `npm run build` clean.

---

## 3. Context

### Manifest types — new file `app/_data/library-types.ts`

```ts
export type DocFormat = 'html' | 'markdown';

export interface BilingualText {
  en: string;
  tr: string;
}

export interface LibraryCategory {
  id: string;
  order: number;
  title: BilingualText;
}

export interface LibraryDocument {
  id: string;
  category: string;     // matches a LibraryCategory.id
  order: number;
  title: BilingualText;
  summary: BilingualText;
  file: string;         // repo path
  format: DocFormat;
}

export interface LibraryManifest {
  schemaVersion: string;
  categories: readonly LibraryCategory[];
  documents: readonly LibraryDocument[];
}
```

### Manifest fetch — add to `app/_lib/github.ts`

Parallel to the existing `fetchManifest()` (phase0). Do not modify `fetchManifest` or `fetchDocumentContent`.

```ts
import type { LibraryManifest } from '@/app/_data/library-types';

export async function fetchLibraryManifest(): Promise<LibraryManifest | { error: string }> {
  const token = process.env.GITHUB_PAT;
  if (!token) return { error: 'GITHUB_PAT missing' };

  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/docs/library/manifest.json`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.raw',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { error: `Manifest fetch ${res.status}` };
    return JSON.parse(await res.text()) as LibraryManifest;
  } catch (e) {
    return { error: `Manifest parse failed: ${e instanceof Error ? e.message : String(e)}` };
  }
}
```

### Shared `DocumentFrame` — consolidate D0.7a's iframe (Pattern #35)

D0.7a created `BigPictureFrame.tsx`. Generalize it into a shared component, then refactor `/` to use it, then delete `BigPictureFrame`. **Before deleting: `grep -rl "BigPictureFrame" app/` must return exactly `app/page.tsx` — if anything else imports it, stop and report (the D0.7a lesson: BridgeOverview imported LoopDiagram unexpectedly).**

`app/_components/DocumentFrame.tsx` — identical height-sync logic from D0.7a, parameterized with a `title`:

```tsx
'use client';
import { useEffect, useState } from 'react';

const HEIGHT_SHIM = `<script>
  (function () {
    function report() {
      parent.postMessage(
        { type: 'doc-height', height: document.documentElement.scrollHeight },
        '*'
      );
    }
    window.addEventListener('load', report);
    window.addEventListener('resize', report);
    if (window.ResizeObserver) new ResizeObserver(report).observe(document.body);
  })();
</script>`;

export function DocumentFrame({ html, title }: { html: string; title: string }) {
  const [height, setHeight] = useState(1100);
  const srcDoc = html + HEIGHT_SHIM;

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'doc-height' && typeof e.data.height === 'number') {
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
      title={title}
      style={{ width: '100%', height, border: 'none', display: 'block' }}
    />
  );
}
```

Note the message `type` changes from `bp-height` to `doc-height`. Update `/`'s usage to import `DocumentFrame` and pass `title="ARDICTECH Big Picture — Revolutionize builds EAIP"`.

### Library index — `app/library/page.tsx` (server)

```ts
import { fetchLibraryManifest } from '@/app/_lib/github';
```

Behaviour:
- Fetch the manifest. On error → render a `LibraryError` state (mirror `BigPictureError` from D0.7a).
- Group `documents` by `category`, ordered by `category.order` then `document.order`.
- For each category: a section heading (bilingual via current lang) + a grid of `DocumentCard`s.
- Read `lang` the same way the existing tabs do (Step 0 confirms the lang-resolution pattern — likely a cookie or a layout-level provider from D0.3b.1).

### `DocumentCard.tsx` — `app/_components/library/DocumentCard.tsx`

A `<Link href={`/library/${doc.id}`} className="block">` card showing:
- Title (bilingual), `text-base font-semibold text-text`.
- Summary (bilingual), `text-sm text-text2`, clamped to 2–3 lines.
- A format chip: "HTML" or "MD" in `font-mono text-xs`, `bg-bg3 border border-border rounded px-2`.
- Hover state consistent with the phase0 `ItemCard` (border lift / subtle bg change).

### Library detail — `app/library/[docId]/page.tsx` (server)

Next.js 15 — `params` is a Promise, `await` it (D0.6d lesson).

```ts
const { docId } = await params;
const manifestResult = await fetchLibraryManifest();
if ('error' in manifestResult) return <LibraryError error={manifestResult.error} />;

const doc = manifestResult.documents.find(d => d.id === docId);
if (!doc) notFound();

const contentResult = await fetchDocumentContent(doc.file);
```

Render:
- A back link "← Library" / "← Kütüphane" to `/library`.
- The document title (bilingual) as the page heading + the summary below it.
- If `'error' in contentResult` → a "Document not yet available" panel (the doc is in the manifest but the file isn't committed): friendly heading, the manifest path shown in mono, a note that it appears once committed. **Not an error — an expected state.**
- Else if `doc.format === 'html'` → `<DocumentFrame html={contentResult.content} title={doc.title[lang]} />`.
- Else (`markdown`) → `<MarkdownRenderer content={contentResult.content} />` (reuse the D0.6d component; import from `@/app/_components/phase0/MarkdownRenderer`).

### Nav — add the 9th tab

The nav (D0.2 / D0.2.1 three-tier responsive system) currently has 8 tabs. Add "Library" / "Kütüphane" → `/library`. **Step 0 records the nav source file and the current tab array.** After adding, verify at the D0.2.1 breakpoints (the prompt's acceptance criteria require visual checks at 375 / 768 / 1024 / 1366 / 1440px) that 9 tabs do not overflow or wrap incorrectly — the three-tier system should absorb it, but a 9th item is exactly the kind of thing that tips a breakpoint. If it overflows at any width, report with the width and the observed behaviour rather than forcing a layout hack.

### STRINGS additions — `i18n.ts`

```ts
library: {
  navLabel:      { en: 'Library', tr: 'Kütüphane' },
  title:         { en: 'Library', tr: 'Kütüphane' },
  lede:          { en: 'The program reading room — architecture, decisions, schedules, and process, served from the source of truth.', tr: 'Program okuma odası — doğruluk kaynağından sunulan mimari, kararlar, takvimler ve süreç.' },
  backLink:      { en: '← Library', tr: '← Kütüphane' },
  notAvailable:  { en: 'Document not yet available', tr: 'Belge henüz mevcut değil' },
  notAvailableNote: { en: 'This document is listed in the library but has not been committed to the repository yet. It will appear here once committed.', tr: 'Bu belge kütüphanede listelenmiş ancak henüz depoya eklenmemiş. Eklendiğinde burada görünecek.' },
  fetchError:    { en: 'Library unavailable', tr: 'Kütüphane kullanılamıyor' },
},
```

---

## 4. Step 0 mandatory reads

Before writing code, AG reads and reports:

1. **Fetch `docs/library/manifest.json`** from the repo. Confirm it parses. Report the document count and the `file` path of each. **For each `file` path, do a HEAD/GET via `fetchDocumentContent` and report which resolve (200) and which 404.** This availability map goes in the PR body.
2. **`app/_lib/github.ts`** — confirm `fetchDocumentContent` and `fetchManifest` exist; `fetchLibraryManifest` does NOT. Record `GITHUB_API` and `GITHUB_REPO` constant values.
3. **`app/_components/big-picture/BigPictureFrame.tsx`** — record its exact content (to port into `DocumentFrame`). Then `grep -rl "BigPictureFrame" app/` — confirm the result is exactly `app/page.tsx`. If anything else imports it: report, do not delete.
4. **`app/page.tsx`** — record how it imports/uses `BigPictureFrame` so the refactor to `DocumentFrame` is exact.
5. **`app/_components/phase0/MarkdownRenderer.tsx`** — confirm it exists and its prop shape (`{ content: string }`).
6. **Nav source** — locate the nav component, record the current tab array (the 8 entries, their labels and hrefs). Record the lang-resolution mechanism (cookie / context / layout prop).
7. **Current route count** — run `npm run build` and record the route count. (D0.6d reported 16; D0.7a reported 15 — reconcile and report the actual current number so the post-D0.7b expectation is correct: current + 2 new routes.)

If the manifest is not found: **report BLOCKED** — commit it first.

---

## 5. Steps

**Step 0 — Reads.** §4. Report findings, especially the availability map and the `BigPictureFrame` grep result.

**Step 1 — `library-types.ts`.** Create `app/_data/library-types.ts` from §3.

**Step 2 — `fetchLibraryManifest`.** Append to `app/_lib/github.ts`. Do not touch the existing two functions.

**Step 3 — `DocumentFrame.tsx`.** Create `app/_components/DocumentFrame.tsx` from §3 (ported from `BigPictureFrame`, `title` param, `doc-height` message).

**Step 4 — Refactor `/` to use `DocumentFrame`.** Update `app/page.tsx` import + usage. Verify identical rendering.

**Step 5 — Delete `BigPictureFrame.tsx`.** Only after Step 0 grep confirmed sole-use by `app/page.tsx` and Step 4 refactor is done. Pattern #35.

**Step 6 — `DocumentCard.tsx`.** Create `app/_components/library/DocumentCard.tsx` from §3.

**Step 7 — `LibraryError` + library index.** Create the error component and `app/library/page.tsx` (grouped, ordered, bilingual).

**Step 8 — Library detail.** Create `app/library/[docId]/page.tsx` from §3 — html→`DocumentFrame`, markdown→`MarkdownRenderer`, missing→"not yet available".

**Step 9 — Nav 9th tab.** Add "Library" to the nav tab array. Verify breakpoints per §3.

**Step 10 — STRINGS.** Add the `library` block to `i18n.ts` from §3.

**Step 11 — TypeScript + build.** `npx tsc --noEmit` → 0. `npm run build` → clean. Route count = Step 0 count + 2 (`/library`, `/library/[docId]`).

**Step 12 — Verify, commit, open PR.**
PR title: `"D0.7b: document hub (Library)"`.
PR body: Step 0 findings + the availability map (which docs resolved / 404) + screenshots of `/library` index and one HTML doc + one markdown doc detail on Vercel preview + nav screenshot at 1366px showing 9 tabs.

AG stops. Report PR URL.

---

## 6. Acceptance criteria

### Technical

- `npx tsc --noEmit` → 0. `npm run build` clean, route count = prior + 2.
- `DocumentFrame.tsx` first line `'use client'`; `app/library/page.tsx` and `app/library/[docId]/page.tsx` are server components (no `'use client'`).
- `BigPictureFrame.tsx` deleted; `grep -rl "BigPictureFrame" app/` → 0 results.
- `app/page.tsx` renders identically to before (still the canonical bridge, now via `DocumentFrame`).
- `fetchLibraryManifest` added; `fetchManifest` and `fetchDocumentContent` unchanged.
- `params` awaited in `[docId]/page.tsx`.
- `grep -r "SUPABASE_SERVICE_ROLE_KEY" .` (excl node_modules) → 0.

### Functional — operator-verified on Vercel preview

- `/library` lists documents grouped into the 4 categories, in order, bilingual headings.
- Each card links to `/library/[docId]`.
- An HTML doc (e.g., `eaip-arch`) renders in the iframe with correct height-sync (no scrollbar/gap) at 1440px and 375px.
- A markdown doc (e.g., `adr-001` if committed) renders formatted via react-markdown.
- A not-yet-committed doc shows the "not yet available" panel with its manifest path — no crash, no broken iframe.
- `/library/unknown-id` → Next.js 404.
- Nav shows 9 tabs; Library tab navigates to `/library`; no overflow/wrap at 375/768/1024/1366/1440px.
- Language toggle switches all library chrome (headings, lede, card titles/summaries, back link).

### No regression

- `/` still serves the canonical bridge (now via `DocumentFrame`), height-sync intact.
- The 8 deep-dive tabs unaffected and still bilingual.
- `/phase0` and `/phase0/[itemId]` unaffected.
- Console zero app errors on `/library`, a detail page, and `/`.

---

## 7. Edge cases

- **Manifest references a path that 404s:** detail page shows "not yet available"; index still lists the card (the card doesn't fetch content). Expected, not an error.
- **Manifest has a `category` id with no matching category entry:** group it under an "Other" fallback heading rather than dropping it; report in PR.
- **HTML doc with embedded `<script>` (schedule/charter HTMLs):** `sandbox="allow-scripts"` runs it in null origin — renders correctly. Same as D0.7a.
- **Very large HTML doc (v6 SSoT bilingual is big):** iframe grows to full height; page scrolls. No max-height clamp. If load feels slow, the `revalidate: 60` cache absorbs repeat views.
- **Markdown with raw HTML inside:** react-markdown does not render raw HTML by default (safe). If a doc needs it, that's a future `rehype-raw` decision — out of scope; note if a doc renders oddly.
- **`params` not awaited:** TypeScript error in Next 15 — `tsc` catches it.
- **9th nav tab overflow:** if the three-tier system can't absorb it at some width, report the width + behaviour. Do not silently truncate labels or hide the tab; a follow-up patch (D0.7b.1) handles nav if needed.

---

## 8. Verification approach

1. Open `/library`. Confirm 4 category sections in order, documents listed, bilingual headings.
2. Click an architecture doc (HTML) → renders in iframe, height correct at 1440px; shrink to 375px → re-syncs.
3. Click an ADR (markdown, if committed) → renders formatted. If not committed → "not yet available" with path shown.
4. `/library/unknown-id` → 404.
5. Toggle EN/TR on `/library` and a detail page → all chrome switches.
6. Confirm the Library nav tab appears and works; check no nav overflow at 375/768/1024/1366/1440px.
7. Return to `/` → bridge still renders (now via DocumentFrame), height-sync intact.
8. Visit the 8 deep-dive tabs + `/phase0` → no regression.
9. DevTools console on `/library`, a detail page, `/` → no app errors.

If all pass → send: **`"Approved — merge D0.7b"`**.

---

## 9. Antigravity configuration

**Model recommended:** Sonnet 4.6 thinking. Two new routes + manifest types + fetch + shared-component consolidation + nav change + safe deletion — highest complexity in the D0.7 group.

**Watch for:**
- AG deleting `BigPictureFrame` before grepping all of `app/` and before the `/` refactor. Hard reject — Pattern #35.
- AG re-implementing documents as React instead of serving canonical HTML/markdown. Hard reject — the entire point is zero-drift serving.
- AG writing a new fetch instead of reusing `fetchDocumentContent` for document bodies. Reject.
- AG fetching each document's content on the index page to show availability. Reject — 13 fetches per index load; the index lists from the manifest only, detail handles availability.
- AG adding `allow-same-origin` to the iframe sandbox. Reject (D0.7a rule).
- AG making `/library` auth-gated / redirecting to login. Reject — library is public reference within the tool, consistent with the architecture tabs.
- AG using `useState`/`useEffect` to fetch the manifest client-side. Reject — server components fetch; only `DocumentFrame` is client (for the height message).
- AG not awaiting `params` in `[docId]`. Hard reject.
- AG installing a new markdown library. Reject — reuse `MarkdownRenderer` (react-markdown, already a dep from D0.6d).
- AG truncating nav labels or hiding the Library tab to "fix" overflow. Reject — report the overflow; D0.7b.1 patches nav if needed.
- AG duplicating the iframe height-sync logic in a new library-specific frame instead of consolidating into shared `DocumentFrame`. Reject — one shared component.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.7b-lessons.md`:

```md
# D0.7b Lessons

**Stage:** D0.7b — Document hub (Library)
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun (+ CTO sign-off pass)
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity**

**Stage size actual:** [Xm] (estimated L: 60–80 min)
**Model used actual:** [Sonnet 4.6 thinking / other]
**Files created:** app/_data/library-types.ts, app/_components/DocumentFrame.tsx, app/_components/library/DocumentCard.tsx, app/_components/library/LibraryError.tsx, app/library/page.tsx, app/library/[docId]/page.tsx
**Files modified:** app/_lib/github.ts, app/page.tsx, app/_lib/i18n.ts, [nav source file]
**Files deleted:** app/_components/big-picture/BigPictureFrame.tsx

**Step 0 findings:**
- Manifest parsed: [✅] · document count: [13]
- Availability map (resolved / 404): [list — e.g. 9 resolved, 4 404 (adrs + process docs)]
- BigPictureFrame grep result: [exactly app/page.tsx ✅ / other — list]
- MarkdownRenderer prop shape: [{ content: string } ✅]
- Nav source file + current tab count: [file, 8 tabs]
- Lang-resolution mechanism: [cookie / context / layout prop]
- Route count before D0.7b: [actual number — reconciles 15 vs 16]

**BigPictureFrame deleted only after refactor + grep:** [✅]
**DocumentFrame shared (no duplicate iframe logic):** [✅]
**params awaited in [docId]:** [✅]
**Documents served as canonical (not re-implemented):** [✅]
**Index lists from manifest only (no per-doc fetch):** [✅]
**9th nav tab overflow at any breakpoint:** [none ✅ / overflow at Xpx — D0.7b.1 needed]
**No new markdown dependency:** [✅]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**/library lists 4 categories in order, bilingual:** [✅ / ❌]
**HTML doc renders in iframe, height correct 1440 + 375:** [✅ / ❌]
**Markdown doc renders formatted (if committed):** [✅ / ❌]
**Not-yet-available state for uncommitted docs:** [✅ / ❌]
**/library/unknown-id → 404:** [✅ / ❌]
**Library nav tab works, no overflow 375–1440:** [✅ / ❌]
**Language toggle switches all library chrome:** [✅ / ❌]
**/ still serves bridge via DocumentFrame (no regression):** [✅ / ❌]
**8 deep-dive tabs + /phase0 unaffected:** [✅ / ❌]
**Console zero app errors:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**CTO sign-off on reading room:** [✅ / pending]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — appended post-merge.
```

---

**End of Stage D0.7b prompt. D0.7 finalization group — the team's reading room.**
