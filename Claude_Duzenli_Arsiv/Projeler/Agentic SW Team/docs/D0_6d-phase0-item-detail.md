# Stage D0.6d — `/phase0/[itemId]` detail route + approve/block actions

> **Stage type:** V0 program command center · governance actions
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Estimated size:** L — Antigravity 60–80 min · human review 30–40 min
> **Merge mode:** operator-gated — approve/block round-trip verified on Vercel preview
> **Predecessor:** D0.6c (merged at `ef3cc74`)
> **Successor:** none — D0.6d closes Phase D0

---

## 1. Goal

Add `/phase0/[itemId]` — a per-item detail page where authenticated approvers can review content and record decisions. After D0.6d:

- Each card on `/phase0` is a link → clicking navigates to `/phase0/[itemId]`.
- Detail page shows item metadata, rendered content (type-dependent), and live status badge.
- `document` items: file fetched from GitHub and rendered as markdown (`.md`) or displayed via iframe (`.pdf`, `.svg`, `.html`).
- `infra-check` and `event` items: acceptance criteria shown prominently; no file fetch.
- Authenticated `approver`: sees Approve + Block buttons with optional note/evidence textarea. Submit inserts into `phase0_approvals` (current HEAD SHA auto-pinned).
- `reviewer` and `viewer`: read-only — see status + history, no action buttons.
- Approval history: all past decisions for the item displayed as an audit trail.
- No new SQL schema — `phase0_approvals` from D0.6c is sufficient.

---

## 2. Prerequisites

- D0.6c merged at `ef3cc74`. `phase0_approvals` table live, RLS confirmed, live badges working on `/phase0`.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` env var name confirmed (D0.6b hotfix, D0.6c Step 0 verified).
- `react-markdown` not yet installed — D0.6d installs it.
- TypeScript strict passing. `npm run build` clean. 15 routes live.

---

## 3. Context

### New dependency

```bash
npm install react-markdown
```

`react-markdown` is ESM-only. In Next.js 15 this is supported. If a CJS interop error appears during build, add `"react-markdown"` to `transpilePackages` in `next.config.ts` and report in the PR.

### `fetchDocumentContent()` — add to `app/_lib/github.ts`

```ts
export type DocEncoding = 'markdown' | 'pdf' | 'svg' | 'html' | 'unknown';

export interface DocumentContent {
  content: string;
  encoding: DocEncoding;
}

export async function fetchDocumentContent(
  filePath: string,
): Promise<DocumentContent | { error: string }> {
  const token = process.env.GITHUB_PAT;
  if (!token) return { error: 'GITHUB_PAT missing' };

  const ext = filePath.split('.').pop()?.toLowerCase() ?? '';
  const encoding: DocEncoding =
    ext === 'md'   ? 'markdown' :
    ext === 'pdf'  ? 'pdf'      :
    ext === 'svg'  ? 'svg'      :
    ext === 'html' ? 'html'     : 'unknown';

  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/contents/${filePath}`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.raw',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return { error: `GitHub API ${res.status}: ${res.statusText}` };
    return { content: await res.text(), encoding };
  } catch (e) {
    return { error: `Fetch failed: ${e instanceof Error ? e.message : String(e)}` };
  }
}
```

### `fetchItemHistory()` — add to `app/_lib/supabase-phase0.ts`

Returns all approval records for one item, newest first. Used on the detail page for the audit trail.

```ts
export interface ApprovalRecord {
  id: string;
  status: 'approved' | 'blocked';
  note: string | null;
  commitSha: string;
  createdAt: string;
}

export async function fetchItemHistory(itemId: string): Promise<ApprovalRecord[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('phase0_approvals')
    .select('id, status, note, commit_sha, created_at')
    .eq('item_id', itemId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error || !data) return [];
  return data.map(r => ({
    id:        r.id,
    status:    r.status as 'approved' | 'blocked',
    note:      r.note ?? null,
    commitSha: r.commit_sha,
    createdAt: r.created_at,
  }));
}
```

### Server action — `app/phase0/[itemId]/actions.ts`

```ts
'use server';
import { createClient } from '@/app/_lib/supabase/server';
import { fetchRepoHeadSha } from '@/app/_lib/github';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type ActionState = { error: string } | null;

export async function submitApproval(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const itemId = formData.get('itemId') as string;
  const status = formData.get('status') as 'approved' | 'blocked';
  const note   = (formData.get('note') as string | null) || null;

  if (!itemId || !status) return { error: 'Invalid form data' };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authenticated' };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'approver') return { error: 'Only approvers can record decisions' };

  const commitSha = await fetchRepoHeadSha();
  if (!commitSha) return { error: 'Could not fetch current commit SHA — try again' };

  const { error } = await supabase
    .from('phase0_approvals')
    .insert({ item_id: itemId, status, note, commit_sha: commitSha, approved_by: user.id });

  if (error) return { error: error.message };

  revalidatePath('/phase0');
  revalidatePath(`/phase0/${itemId}`);
  redirect(`/phase0/${itemId}`);   // throws — never reaches return
}
```

### Client components

**`app/_components/phase0/MarkdownRenderer.tsx`** — thin `'use client'` wrapper:

```tsx
'use client';
import ReactMarkdown from 'react-markdown';

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-sm max-w-none text-text">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
```

**`app/_components/phase0/ApprovalForm.tsx`** — role-gated, uses `useActionState` (React 19):

```tsx
'use client';
import { useActionState } from 'react';
import { submitApproval, type ActionState } from '@/app/phase0/[itemId]/actions';
import type { Phase0ItemType } from '@/app/_data/manifest-types';
import type { Lang } from '@/app/_lib/i18n';

interface ApprovalFormProps {
  itemId:   string;
  itemType: Phase0ItemType;
  lang:     Lang;
}

const CTA = {
  'document':    { approve: { en: '✅ Approve',        tr: '✅ Onayla'         }, block: { en: '🚫 Block',  tr: '🚫 Engelle' } },
  'infra-check': { approve: { en: '✅ Mark Verified',  tr: '✅ Doğrulandı'     }, block: { en: '🚫 Block',  tr: '🚫 Engelle' } },
  'event':       { approve: { en: '✅ Mark Completed', tr: '✅ Tamamlandı'     }, block: { en: '🚫 Defer',  tr: '🚫 Ertele'  } },
} as const;

const PLACEHOLDER = {
  'document':    { en: 'Optional note…',     tr: 'İsteğe bağlı not…'  },
  'infra-check': { en: 'Paste evidence…',    tr: 'Kanıt yapıştır…'    },
  'event':       { en: 'Paste meeting notes / attendance…', tr: 'Toplantı notu yapıştır…' },
} as const;

export function ApprovalForm({ itemId, itemType, lang }: ApprovalFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(submitApproval, null);
  const cta = CTA[itemType];
  const ph  = PLACEHOLDER[itemType];

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="itemId" value={itemId} />
      <textarea
        name="note"
        placeholder={ph[lang]}
        rows={4}
        className="w-full rounded-lg border border-border bg-bg2 p-3 text-sm text-text placeholder-text3 focus:outline-none focus:ring-1 focus:ring-accent-blue resize-y"
      />
      {state?.error && (
        <p className="text-sm text-accent-red">{state.error}</p>
      )}
      <div className="flex gap-3">
        <button
          type="submit"
          name="status"
          value="approved"
          disabled={isPending}
          className="rounded-lg bg-accent-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {cta.approve[lang]}
        </button>
        <button
          type="submit"
          name="status"
          value="blocked"
          disabled={isPending}
          className="rounded-lg bg-accent-red px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {cta.block[lang]}
        </button>
        {isPending && <span className="self-center text-xs text-text3">Submitting…</span>}
      </div>
    </form>
  );
}
```

### Detail page — `app/phase0/[itemId]/page.tsx`

Server component. In Next.js 15, `params` is a Promise — `await` it.

Fetch sequence (parallel where independent):

```ts
const { itemId } = await params;
const [manifestResult, commitSha, history] = await Promise.all([
  fetchManifest(),
  fetchRepoHeadSha(),
  fetchItemHistory(itemId),
]);

// Find item or 404
const item = 'error' in manifestResult
  ? null
  : manifestResult.items.find(i => i.id === itemId);
if (!item) notFound();

// Fetch document content only for 'document' type
const docResult = item.type === 'document'
  ? await fetchDocumentContent(item.file)
  : null;

// Auth for role gating (no redirect — page is public, form just doesn't render)
const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();
const profile = user
  ? (await supabase.from('profiles').select('role').eq('id', user.id).single()).data
  : null;

// Current item status from latest history record + SHA
const latestApproval = history[0];
const status = computeStatus(
  latestApproval
    ? { status: latestApproval.status, commitSha: latestApproval.commitSha, note: latestApproval.note }
    : undefined,
  commitSha,
);
```

Page layout (single server component file, no extra component files needed beyond `MarkdownRenderer` and `ApprovalForm`):

```
← Back to Phase 0          [status badge — live]

[ID] · [type icon + label]
Title (text-xl font-semibold)
Owner · Effort (text-sm text-text3)

Acceptance criteria (font-mono text-xs bg-bg2 rounded p-3)

--- [document type only] ---
Horizontal rule
[MarkdownRenderer content] or [iframe for PDF/SVG/HTML] or [fetch error state]

--- [infra-check / event: no file section] ---

--- [Approval action — approver only] ---
Section heading: "Record decision" / "Karar kaydet"
[ApprovalForm itemId={itemId} itemType={item.type} lang={lang} />]

--- [reviewer / viewer: show read-only notice] ---
"Only approvers can record decisions." / "Yalnızca onaylayıcılar karar kaydedebilir."

--- [not logged in: show sign-in prompt] ---
"Sign in to review this item." / "Bu öğeyi incelemek için giriş yapın."

--- [Approval history — always visible if records exist] ---
Section heading: "Decision history" / "Karar geçmişi"
Per record (newest first):
  [status dot] approved / blocked · commit abcdef1 · relative date · note (if any)
```

### `ItemCard.tsx` — make cards clickable

Wrap the card's outer `div` in `<Link href={`/phase0/${item.id}`}>`. The entire card becomes a navigation target. Use `className="block"` on the Link to preserve layout.

### STRINGS additions

Add to `i18n.ts` under `phase0` key:

```ts
detail: {
  backLink:        { en: '← Back to Phase 0',    tr: '← Faz 0\'a Dön'           },
  recordDecision:  { en: 'Record decision',       tr: 'Karar kaydet'              },
  decisionHistory: { en: 'Decision history',      tr: 'Karar geçmişi'             },
  readOnly:        { en: 'Only approvers can record decisions.',
                     tr: 'Yalnızca onaylayıcılar karar kaydedebilir.'             },
  signInPrompt:    { en: 'Sign in to review this item.',
                     tr: 'Bu öğeyi incelemek için giriş yapın.'                  },
  noHistory:       { en: 'No decisions recorded yet.',
                     tr: 'Henüz karar kaydedilmedi.'                              },
  commitLabel:     { en: 'commit',                tr: 'commit'                    },
},
```

---

## 4. Step 0 mandatory reads

Before writing any code, AG must read and report:

1. **`app/_lib/github.ts`** — confirm `fetchRepoHeadSha` exists (from D0.6c); record exact export shape. Confirm `fetchDocumentContent` does NOT already exist.
2. **`app/_lib/supabase-phase0.ts`** — confirm `fetchLatestApprovals` exists; `fetchItemHistory` does NOT.
3. **`app/_data/manifest-types.ts`** — record `Phase0ItemType` values verbatim (expected: `'document' | 'infra-check' | 'event'`). Note hyphen spelling — it must match manifest.json exactly.
4. **`app/_components/phase0/ItemCard.tsx`** — record the outer container element. Confirm it is NOT already wrapped in a Link.
5. **`app/_lib/i18n.ts`** — confirm `phase0.detail` key does NOT already exist. Record `phase0.statusLabels` shape (from D0.6c) for consistency.
6. **`app/phase0/` directory listing** — confirm `[itemId]/` subdirectory does NOT exist yet.
7. **Fetch one manifest item from the live repo** (using the GitHub PAT via a test fetch or from PR preview) and report: the `file` field value for one `document` item and one `infra-check` item. This determines whether `file` is an empty string or a valid path for infra-check items.

If any finding conflicts with this prompt (e.g., `Phase0ItemType` uses underscore `infra_check`), **report the discrepancy — do not silently adjust**. Mismatches in the type string propagate to the `CTA` lookup in `ApprovalForm.tsx` and break the form.

---

## 5. Steps

**Step 0 — Reads.** §4. Report findings.

**Step 1 — Install dependency.**
`npm install react-markdown`. Confirm it appears in `package.json` dependencies. If build fails with ESM error, add to `transpilePackages` in `next.config.ts`.

**Step 2 — `github.ts` — add `fetchDocumentContent`.**
Append from §3. `fetchManifest` and `fetchRepoHeadSha` are untouched.

**Step 3 — `supabase-phase0.ts` — add `fetchItemHistory`.**
Append `ApprovalRecord` interface + `fetchItemHistory()` from §3.

**Step 4 — `app/phase0/[itemId]/actions.ts`.**
Create the file with `submitApproval` server action from §3.

**Step 5 — `MarkdownRenderer.tsx`.**
Create `app/_components/phase0/MarkdownRenderer.tsx` from §3.

**Step 6 — `ApprovalForm.tsx`.**
Create `app/_components/phase0/ApprovalForm.tsx` from §3. Verify `CTA` type keys match the `Phase0ItemType` values found in Step 0.

**Step 7 — `app/phase0/[itemId]/page.tsx`.**
Create the detail page. Implement the full layout from §3: metadata → content section (type-conditional) → approval action section (role-conditional) → history. Use `notFound()` for unknown `itemId`.

**Step 8 — `ItemCard.tsx` — Link wrapper.**
Wrap the card's outer element in `<Link href={`/phase0/${item.id}`} className="block">`. Confirm the existing hover styles remain visible.

**Step 9 — `i18n.ts` — add `phase0.detail` strings.**
Add from §3. Verify no key collision with existing `phase0.statusLabels` and `phase0.staleTooltip`.

**Step 10 — TypeScript + build.**
`npx tsc --noEmit` → 0. `npm run build` → clean (16 routes expected — 15 prior + 1 new dynamic route).

**Step 11 — Verify, commit, open PR.**
PR title: `"D0.6d: /phase0/[itemId] detail route + approve/block actions"`.
PR body: Step 0 findings + screenshot of detail page for one document item + one infra-check item.

AG stops. Report PR URL.

---

## 6. Acceptance criteria

### Technical

- `npx tsc --noEmit` → 0. `npm run build` → clean, 16 routes.
- `app/phase0/[itemId]/actions.ts` — first line is `'use server'`.
- `app/_components/phase0/MarkdownRenderer.tsx` — first line is `'use client'`.
- `app/_components/phase0/ApprovalForm.tsx` — first line is `'use client'`.
- `app/phase0/[itemId]/page.tsx` — no `'use client'` (server component).
- `grep -r "SUPABASE_SERVICE_ROLE_KEY" .` (excl. node_modules) → 0 results.
- `react-markdown` in `package.json` dependencies (not devDependencies).
- `fetchDocumentContent` and `fetchItemHistory` do not appear in any client component import.

### Functional — operator-verified on Vercel preview

**Navigation:**
- Click any card on `/phase0` → navigates to `/phase0/[itemId]`. Back link returns to `/phase0`.
- `/phase0/unknown-id` → renders Next.js 404 (not a crash).

**Document item (e.g., A1 or C2 — pick one with `type='document'`):**
- Detail page shows: item ID, type badge, live status badge, title, owner, effort, acceptance criteria.
- Markdown content rendered (headings, paragraphs visible — not raw text).
- Logged in as approver: Approve + Block buttons + note textarea visible.
- Submit Approve → redirect back to same page → status badge updates to 🟢 Approved.
- Submit Block → redirect → status badge updates to 🔴 Blocked.
- Decision history section shows the record(s) just created.

**Infra-check item (e.g., B1):**
- No file content rendered.
- Acceptance criteria visible in mono block.
- Evidence textarea placeholder differs from document item.
- Approve → "✅ Mark Verified" button label (or TR equivalent).

**Role gating:**
- Viewer / reviewer logged in → form section replaced by read-only notice.
- Logged out → sign-in prompt shown instead of form.

**Bilingual:**
- TR mode: back link "← Faz 0'a Dön", section headings, button labels switch per type.
- Status badge uses `statusLabels` from D0.6c i18n (Onaylandı / Engellendi / Eski Onay / Beklemede).

### No regression

- `/phase0` dashboard still loads, 25 cards, all clickable links.
- Live status badges from D0.6c still accurate.
- All 16 routes (15 prior + new dynamic) render without error.
- Console zero errors on `/phase0`, `/phase0/A1`, `/phase0/B1`.

---

## 7. Edge cases

- **`item.file` is empty string for infra-check item:** `fetchDocumentContent('')` is never called — the document fetch is inside `if (item.type === 'document')`. Safe.
- **Document file not yet committed in revolutionize repo (stub is empty or 404):** `fetchDocumentContent` returns `{ error }` → render a friendly "Document not yet available" state. Do not crash.
- **react-markdown ESM build error:** Add to `transpilePackages` in `next.config.ts`. Report in PR.
- **`submitApproval` called twice (double-click):** RLS INSERT has no unique constraint on `item_id` — two records are created. Second record becomes the "latest" and its status wins. Acceptable for MVP; D0.7 can add a debounce or form disable.
- **Approver submits without note:** `note` is nullable in the schema — valid. Placeholder text explains optionality.
- **PDF file path in `item.file`:** `fetchDocumentContent` returns `{ content: '<binary>', encoding: 'pdf' }`. Render via iframe with a `data:` URL or a GitHub raw URL. The iframe pattern: `<iframe src={githubRawUrl} className="w-full h-96 rounded" />` where `githubRawUrl` is constructed from the repo + file path. Phase 0 stubs are all `.md`, so this path is not exercised in D0.6d testing.
- **`params` not awaited:** Next.js 15 — `params` is a Promise. Missing `await` causes a TypeScript error. `npx tsc --noEmit` catches it.
- **User has no profile row (signed up before D0.6b migration ran):** `profile` is `null` → treated as viewer → read-only form shown. Correct fallback.

---

## 8. Verification approach

**Document item round-trip (A1 or whichever has `type='document'`):**
1. Navigate `/phase0` → click A1 card.
2. Confirm detail page loads: metadata, rendered markdown, Approve + Block buttons.
3. Add a note and click Approve.
4. Confirm redirect to same page; status badge → 🟢 Approved; history entry visible.
5. Click Block. Confirm status → 🔴 Blocked; history now has 2 entries.
6. Return to `/phase0`. A1 card badge → 🔴 Blocked (live badges updated).

**Infra-check item (B1 or similar):**
7. Navigate to `/phase0/B1`.
8. Confirm no markdown rendered; acceptance criteria shown; button label is "Mark Verified".
9. Submit. Confirm status updates.

**Role gating:**
10. Log out. Navigate to `/phase0/A1`. Confirm sign-in prompt replaces the form. Markdown still renders.
11. (If a reviewer account exists) Log in as reviewer. Confirm read-only notice.

**Bilingual:**
12. Toggle TR on `/phase0/A1`. Confirm all UI chrome switches.

**Regression:**
13. `/phase0` — 25 cards, all clickable. Badges unchanged.
14. All other existing routes. Console zero errors.

If all pass → send: **`"Approved — merge D0.6d"`**. AG squash-merges.

**D0.6d merging closes Phase D0.**

---

## 9. Antigravity configuration

**Model recommended:** Sonnet 4.6 thinking. New dynamic route + server action + two client components + auth-gated conditional rendering — highest complexity in D0.6 series.

**Watch for:**
- AG not awaiting `params` in the page component. Hard reject — Next.js 15 `params` is a Promise; missing `await` produces a TypeScript error.
- AG making the detail page `'use client'`. Reject — server component; only `MarkdownRenderer` and `ApprovalForm` are client components.
- AG using `useRouter().push()` for the back link instead of `<Link>`. Reject — static href is sufficient; no client component needed for navigation.
- AG importing `submitApproval` in the server page component to call it directly. Reject — server actions are called from client component forms only (via `useActionState`).
- AG adding `useEffect` to poll for status updates. Reject — redirect after submit + server component re-render is the correct pattern.
- AG adding a `phase0_notes` table or any new SQL migration. Reject — D0.6d requires no schema changes.
- AG installing `@uiw/react-markdown-preview`, `marked`, or any markdown package other than `react-markdown`. Reject.
- AG installing `react-pdf`. Reject — PDF is handled via iframe, no extra package needed.
- AG making `/phase0/[itemId]` auth-protected (redirect to `/login` if not logged in). Reject — stays public; logged-out users see read-only content + sign-in prompt.
- AG omitting the `ApprovalForm` `isPending` disabled state (double-submit risk). Require both buttons are `disabled={isPending}`.
- AG using `Phase0ItemType` values with underscore (`infra_check`) if Step 0 found hyphen (`infra-check`). Types must match manifest exactly.
- AG skipping the ItemCard Link wrapper. Reject — cards must be clickable from `/phase0`.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.6d-lessons.md`:

```md
# D0.6d Lessons

**Stage:** D0.6d — `/phase0/[itemId]` detail route + approve/block actions
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity**

**Stage size actual:** [Xm] (estimated L: 60–80 min)
**Model used actual:** [Sonnet 4.6 thinking / other]
**Files created:** app/phase0/[itemId]/page.tsx, app/phase0/[itemId]/actions.ts,
  app/_components/phase0/MarkdownRenderer.tsx, app/_components/phase0/ApprovalForm.tsx
**Files modified:** app/_lib/github.ts, app/_lib/supabase-phase0.ts,
  app/_components/phase0/ItemCard.tsx, app/_lib/i18n.ts
**New dependency:** react-markdown

**Step 0 findings:**
- Phase0ItemType values (verbatim): [document | infra-check | event  OR discrepancy]
- ItemCard outer element before patch: [div / other]
- ItemCard already wrapped in Link: [No ✅ / Yes — report]
- phase0.detail key pre-existing in i18n.ts: [No ✅ / conflict — BLOCKED]
- [itemId]/ directory pre-existing: [No ✅ / BLOCKED if yes]
- file field for one document item: [e.g. 'docs/phase0/a1-open-prereqs.md']
- file field for one infra-check item: [e.g. 'docs/phase0/b1-k8s-namespaces.md' / empty string]

**react-markdown ESM issue:** [none / transpilePackages added]
**params awaited in page.tsx:** [✅]
**page.tsx is server component (no 'use client'):** [✅]
**ApprovalForm uses useActionState (not useState):** [✅]
**submitApproval checks role before insert:** [✅]
**No new SQL migration added:** [✅]
**Document fetch omitted for infra-check/event items:** [✅]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**Card click navigates to /phase0/[itemId]:** [✅ / ❌]
**/phase0/unknown-id shows 404:** [✅ / ❌]
**Document item — markdown rendered:** [✅ / ❌]
**Approve → status badge updates to Approved:** [✅ / ❌]
**Block → status badge updates to Blocked:** [✅ / ❌]
**Decision history entries visible:** [✅ / ❌]
**Infra-check item — "Mark Verified" button label:** [✅ / ❌]
**Logged-out → read-only, no form:** [✅ / ❌]
**Bilingual toggle on detail page:** [✅ / ❌]
**/phase0 badges still live after D0.6d (no regression):** [✅ / ❌]
**Console zero errors on /phase0, /phase0/A1, /phase0/B1:** [✅ / ❌]
**16 routes clean:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — Claude appends post-merge.
```

---

**End of Stage D0.6d prompt. Merging D0.6d closes Phase D0.**
