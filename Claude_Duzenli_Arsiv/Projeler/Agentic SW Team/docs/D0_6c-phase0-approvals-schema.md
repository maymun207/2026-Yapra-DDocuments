# Stage D0.6c — `phase0_approvals` schema + live status badges

> **Stage type:** V0 program command center · approvals foundation
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Estimated size:** M — Antigravity 30–45 min · human review 20–30 min
> **Merge mode:** operator-gated — live badge behaviour verified via manual Supabase inserts on Vercel preview
> **Predecessor:** D0.6b (merged at `4a37172`)
> **Successor:** D0.6d — `/phase0/[itemId]` detail route + approve/block actions

---

## 1. Goal

Ship the `phase0_approvals` table and update `/phase0` to display live status badges per item. After D0.6c:

- SQL migration `0002_phase0_approvals.sql` committed (Maymun runs manually in Supabase SQL Editor — same pattern as D0.6b).
- `/phase0` cards show live status: 🟢 Approved / 🔴 Blocked / 🟡 Stale / 🔴 Pending.
- Status is commit-SHA-aware: if the repo's `main` HEAD has advanced since an approval was recorded, that item badge becomes 🟡 Stale.
- Logged-out users see all 🔴 Pending (RLS blocks unauthenticated reads — correct governance behaviour).
- No item detail route, no approve/block UI — those are D0.6d.

---

## 2. Prerequisites

- D0.6b merged at `4a37172`. Auth working. `profiles` table + `user_role` enum + triggers confirmed.
- **Critical — env var name changed in D0.6b hotfix:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `PUBLISHABLE_KEY`). Step 0 must grep-verify this before writing any Supabase client code.
- `public.user_role` enum exists: `('approver', 'reviewer', 'viewer')`. The RLS INSERT policy below references it.
- TypeScript strict passing. `npm run build` clean. 15 routes live.

---

## 3. Context

### Database schema — Maymun runs in Supabase SQL Editor

AG creates `supabase/migrations/0002_phase0_approvals.sql`. **File only — do not execute remotely.**

```sql
-- Phase 0 approval records
-- Append-only governance log: no UPDATE, no DELETE ever.
create table public.phase0_approvals (
  id          uuid        primary key default gen_random_uuid(),
  item_id     text        not null,  -- 'A1' … 'C3'
  status      text        not null check (status in ('approved', 'blocked')),
  note        text,                  -- optional free-text from approver
  commit_sha  text        not null,  -- main branch HEAD SHA at time of review
  approved_by uuid        not null references public.profiles(id),
  created_at  timestamptz not null default now()
);

-- Efficient latest-per-item query (ordered by created_at desc)
create index phase0_approvals_item_id_ts
  on public.phase0_approvals (item_id, created_at desc);

-- RLS
alter table public.phase0_approvals enable row level security;

-- Authenticated users can read all approval records
create policy "approvals_select_authenticated"
  on public.phase0_approvals for select
  to authenticated
  using (true);

-- Only approvers can write approval records
-- (reviewer note-only flow is out of scope until D0.6d)
create policy "approvals_insert_approver"
  on public.phase0_approvals for insert
  to authenticated
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
        and role = 'approver'::public.user_role
    )
  );

-- Intentional: no UPDATE policy, no DELETE policy.
-- phase0_approvals is an immutable governance log.
```

### GitHub commit SHA fetch

Append `fetchRepoHeadSha()` to the existing `app/_lib/github.ts`. Do **not** modify `fetchManifest()`.

```ts
export async function fetchRepoHeadSha(): Promise<string | null> {
  const token = process.env.GITHUB_PAT;
  if (!token) return null;

  const url = `${GITHUB_API}/repos/${GITHUB_REPO}/branches/main`;
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.commit?.sha as string) ?? null;
  } catch {
    return null;
  }
}
```

### Supabase Phase 0 helper — new file

`app/_lib/supabase-phase0.ts` — server-only, never imported in a client component.

```ts
import 'server-only';
import { createClient } from '@/app/_lib/supabase/server';

export interface LatestApproval {
  status: 'approved' | 'blocked';
  commitSha: string;
  note: string | null;
}

export async function fetchLatestApprovals(): Promise<Record<string, LatestApproval>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};   // unauthenticated — caller renders all Pending

  const { data, error } = await supabase
    .from('phase0_approvals')
    .select('item_id, status, commit_sha, note')
    .order('created_at', { ascending: false });

  if (error || !data) return {};

  // Deduplicate: take the first (latest) record per item_id
  const result: Record<string, LatestApproval> = {};
  for (const row of data) {
    if (!result[row.item_id]) {
      result[row.item_id] = {
        status:    row.status as 'approved' | 'blocked',
        commitSha: row.commit_sha,
        note:      row.note ?? null,
      };
    }
  }
  return result;
}
```

### Status type — update `manifest-types.ts`

```ts
// Add 'stale' to the existing Phase0Status type
export type Phase0Status = 'pending' | 'approved' | 'blocked' | 'stale';
```

### Status computation — new pure-function file

`app/_lib/phase0-status.ts` — no Supabase import, no Next.js import. Pure logic only.

```ts
import type { LatestApproval } from '@/app/_lib/supabase-phase0';
import type { Phase0Status } from '@/app/_data/manifest-types';

export function computeStatus(
  approval: LatestApproval | undefined,
  currentSha: string | null,
): Phase0Status {
  if (!approval) return 'pending';
  if (approval.status === 'blocked') return 'blocked';
  // approved path: stale if SHA has advanced, else green
  if (!currentSha) return 'approved';   // can't compare → assume approved; no false-positive stale
  return approval.commitSha === currentSha ? 'approved' : 'stale';
}
```

### STRINGS additions — `i18n.ts`

Add under the `phase0` key (or create it if not present — check Step 0):

```ts
statusLabels: {
  pending:  { en: 'Pending',  tr: 'Beklemede'  },
  approved: { en: 'Approved', tr: 'Onaylandı'  },
  blocked:  { en: 'Blocked',  tr: 'Engellendi' },
  stale:    { en: 'Stale',    tr: 'Eski Onay'  },
},
staleTooltip: {
  en: 'Approved at a previous commit — re-review required.',
  tr: "Önceki bir commit'te onaylandı — yeniden inceleme gerekli.",
},
```

### Badge render — `ItemCard.tsx` update

Replace the hardcoded `pending` badge with a computed badge driven by `Phase0Status`.

| Status | Label (EN/TR) | Dot hex | Tailwind text |
|---|---|---|---|
| `pending` | Pending / Beklemede | `#F85149` | `text-accent-red` (exists from D0.6b patch) |
| `approved` | Approved / Onaylandı | `#3FB950` | `text-accent-green` |
| `blocked` | Blocked / Engellendi | `#F85149` | `text-accent-red` |
| `stale` | Stale / Eski Onay | `#D29922` | `text-accent-yellow` (verify token exists; add to tailwind.config.ts if missing) |

For `stale` status add a `title` tooltip attribute with the `staleTooltip` string so hovering reveals the explanation.

### Page composition update — `page.tsx`

Replace the single `fetchManifest()` call with three parallel fetches:

```ts
const [manifestResult, commitSha, approvals] = await Promise.all([
  fetchManifest(),
  fetchRepoHeadSha(),
  fetchLatestApprovals(),
]);
```

Thread `approvals` and `commitSha` down through `TrackSection` → `ItemCard`. Both props are optional-safe: `approvals` defaults to `{}`, `commitSha` defaults to `null` — the page must not crash if either is missing.

---

## 4. Step 0 mandatory reads

Before writing any code, AG must read the following and report findings in the PR body:

1. **`app/_lib/supabase/server.ts`** — confirm the env var string used is `NEXT_PUBLIC_SUPABASE_ANON_KEY` (not `PUBLISHABLE_KEY`). If different, use whatever is there and note the discrepancy.
2. **`app/_lib/github.ts`** — confirm `GITHUB_REPO = 'agbuilder-platform/revolutionize'`. If `maymun207`, report BLOCKED.
3. **`app/_data/manifest-types.ts`** — record the current `Phase0Status` definition verbatim before patching.
4. **`app/phase0/page.tsx`** — record the current import list and `fetchManifest()` call shape.
5. **`app/_components/phase0/ItemCard.tsx`** — record how the status badge is currently rendered (hardcoded string vs prop).
6. **`supabase/migrations/`** — confirm `0001_init_profiles.sql` exists; `0002_*.sql` does not. Report BLOCKED if `0002` already exists.
7. **`app/_lib/i18n.ts`** — confirm `phase0.statusLabels` does not exist yet (would be a key conflict). Report BLOCKED if it does.
8. **`tailwind.config.ts`** — confirm whether `accent.yellow` / `accent-yellow` token exists. Add `accent.yellow: '#D29922'` alongside the existing `accent.red` if missing.

**If any Step 0 finding is BLOCKED: stop, report, do not write code.**

---

## 5. Steps

**Step 1 — Step 0 reads.** Read §4 files. Report findings. Proceed only if no BLOCKED conditions.

**Step 2 — SQL migration file.**
Create `supabase/migrations/0002_phase0_approvals.sql` from §3. File only — no remote execution.

**Step 3 — `github.ts` — add `fetchRepoHeadSha()`.**
Append the function from §3. `fetchManifest()` is untouched.

**Step 4 — `supabase-phase0.ts` — new file.**
Create `app/_lib/supabase-phase0.ts` with `LatestApproval` interface + `fetchLatestApprovals()` from §3.

**Step 5 — `phase0-status.ts` — new pure-function file.**
Create `app/_lib/phase0-status.ts` with `computeStatus()` from §3. Zero Supabase imports.

**Step 6 — `manifest-types.ts` — add `'stale'`.**
Update `Phase0Status` type per §3.

**Step 7 — `tailwind.config.ts` — add `accent.yellow` if missing.**
From Step 0 finding. Add `accent.yellow: '#D29922'` alongside existing `accent.red`.

**Step 8 — `i18n.ts` — add status strings.**
Add `phase0.statusLabels` and `phase0.staleTooltip` from §3. Verify no key collision.

**Step 9 — `page.tsx` — parallel fetch.**
Replace single `fetchManifest()` with `Promise.all([fetchManifest(), fetchRepoHeadSha(), fetchLatestApprovals()])`. Pass `approvals` and `commitSha` into `TrackSection`.

**Step 10 — `TrackSection.tsx` — thread props.**
Accept `approvals: Record<string, LatestApproval>` and `commitSha: string | null`. Pass both to each `ItemCard`.

**Step 11 — `ItemCard.tsx` — live badge.**
Accept `approval: LatestApproval | undefined` and `commitSha: string | null` props. Call `computeStatus(approval, commitSha)`. Render badge from §3 badge map using STRINGS status labels. Add `title` tooltip for `stale`.

**Step 12 — TypeScript + build.**
`npx tsc --noEmit` → 0. `npm run build` → clean.

**Step 13 — Verify, commit, open PR.**
PR title: `"D0.6c: phase0_approvals schema + live status badges"`.
PR body must include:
- Step 0 findings table.
- The full SQL migration (copy-pasteable for Maymun — do not paraphrase).
- Current HEAD SHA of `agbuilder-platform/revolutionize` main branch (AG fetches it during the build verification — log it once, include in PR body).
- Maymun's UUID lookup query: `select id from public.profiles where email = 'maymun207@gmail.com';`
- Screenshot of `/phase0` on Vercel preview (all 🔴 Pending — expected at this point).

AG stops. Report PR URL.

---

## 6. Acceptance criteria

### Technical

- `npx tsc --noEmit` → 0. `npm run build` clean.
- `supabase/migrations/0002_phase0_approvals.sql` exists, contains `phase0_approvals` table + index + both RLS policies.
- `app/_lib/supabase-phase0.ts` — first line is `import 'server-only'`.
- `app/_lib/phase0-status.ts` — zero imports from `@supabase/*` or `next/*`.
- `grep -r "SUPABASE_SERVICE_ROLE_KEY" .` (excl. node_modules) → 0 results.
- `grep -r "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" .` (excl. node_modules) → 0 results.
- `Phase0Status` in `manifest-types.ts` includes `'stale'`.
- `i18n.ts` `phase0.statusLabels` has all 4 keys (`pending` / `approved` / `blocked` / `stale`) in both `en` and `tr`.
- `phase0_approvals` migration has **no** `UPDATE` policy and **no** `DELETE` policy.

### Functional — operator-verified after SQL migration runs

**Pre-insert baseline:**
- Login at `/phase0` as `maymun207@gmail.com`. All 25 cards show 🔴 Pending.

**Live badge tests (manual inserts in Supabase SQL Editor):**
- Insert `(item_id='A1', status='approved', commit_sha=<real-sha>, approved_by=<maymun-uuid>)` → A1 shows 🟢 Approved. Others stay 🔴 Pending.
- Insert `(item_id='B1', status='approved', commit_sha='deadbeef00000000', approved_by=<maymun-uuid>)` → B1 shows 🟡 Stale (fake SHA ≠ current).
- Insert `(item_id='C1', status='blocked', commit_sha=<real-sha>, approved_by=<maymun-uuid>)` → C1 shows 🔴 Blocked.
- 🟡 Stale badge has hover tooltip (title attr) showing the stale explanation string.

**Auth gate:**
- Sign out → all 25 cards revert to 🔴 Pending (RLS confirmed blocking unauthenticated reads).

**Bilingual:**
- TR mode: A1 → "🟢 Onaylandı", B1 → "🟡 Eski Onay", C1 → "🔴 Engellendi", others → "🔴 Beklemede".

### No regression

- All 15 routes render without error.
- Header `UserMenu` still works (login / logout).
- DevTools console on `/phase0` → zero errors, zero warnings.

---

## 7. Edge cases

- **`fetchRepoHeadSha()` returns `null`:** `computeStatus()` falls back to `'approved'` for approved records (no stale detection). Prefer false-negative over false-positive on the 🟡 badge. `/phase0` must not crash.
- **`phase0_approvals` table not yet created (SQL not run):** `fetchLatestApprovals()` catches the Supabase 42P01 error and returns `{}` → all Pending. Page does not crash.
- **Multiple approval records for same item:** Deduplication in `fetchLatestApprovals()` takes latest `created_at`. Newest record wins — a re-block after an approval shows blocked; a re-approval after a block shows approved.
- **`approved_by` FK in manual test insert:** Must use Maymun's actual UUID from `profiles`. Wrong UUID → FK violation. PR body includes the lookup query.
- **`accent-yellow` token missing:** AG adds it in Step 7. If it already exists under a different name (Step 0 finding), use the existing token and report.
- **`phase0.statusLabels` already present in `i18n.ts`:** Report BLOCKED in Step 0. Do not overwrite silently.
- **`react-markdown` / `react-pdf` added by accident:** Not needed — D0.6c has no document rendering. Reject in review.

---

## 8. Verification approach

**Setup (one-time — Maymun):**
1. Run `0002_phase0_approvals.sql` in Supabase Dashboard → SQL Editor.
2. Get Maymun's UUID from PR body query (or run `select id from public.profiles where email = 'maymun207@gmail.com'`).
3. Get the current HEAD SHA from the PR body (AG includes it).

**Baseline:**
4. Log in at Vercel preview `/phase0`. Confirm all 25 cards show 🔴 Pending.

**Approve A1 (green path):**
5. Supabase SQL Editor:
   ```sql
   insert into public.phase0_approvals (item_id, status, commit_sha, approved_by)
   values ('A1', 'approved', '<real-sha-from-pr-body>', '<maymun-uuid>');
   ```
6. Refresh `/phase0`. A1 → 🟢 Approved. All others → 🔴 Pending.

**Stale B1 (SHA mismatch):**
7. Supabase SQL Editor:
   ```sql
   insert into public.phase0_approvals (item_id, status, commit_sha, approved_by)
   values ('B1', 'approved', 'deadbeef00000000', '<maymun-uuid>');
   ```
8. Refresh → B1 → 🟡 Stale. Hover the badge → tooltip visible.

**Block C1:**
9. Supabase SQL Editor:
   ```sql
   insert into public.phase0_approvals (item_id, status, commit_sha, approved_by)
   values ('C1', 'blocked', '<real-sha-from-pr-body>', '<maymun-uuid>');
   ```
10. Refresh → C1 → 🔴 Blocked.

**Auth gate:**
11. Sign out. Refresh `/phase0`. All 25 → 🔴 Pending (RLS confirmed).

**Bilingual:**
12. Sign back in. Toggle TR → A1 "Onaylandı", B1 "Eski Onay", C1 "Engellendi".

**Regression:**
13. Visit all 15 routes. No errors.
14. DevTools console on `/phase0` → zero errors, zero warnings.

If all pass → send: **`"Approved — merge D0.6c"`**. AG squash-merges.

---

## 9. Antigravity configuration

**Model recommended:** Sonnet 4.6 thinking. SQL + multi-file patch + parallel fetch + prop threading — moderate complexity.

**Watch for:**
- AG adding approve/block buttons or `/phase0/[itemId]` detail route. Reject — that is D0.6d.
- AG adding `UPDATE` or `DELETE` policy on `phase0_approvals`. Hard reject — immutable log.
- AG using `SUPABASE_SERVICE_ROLE_KEY` anywhere. Hard reject.
- AG using `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (old name pre-D0.6b hotfix). Step 0 must find the correct name in existing files and use it.
- AG adding `react-markdown`, `react-pdf`, or any document rendering. Reject — D0.6d only.
- AG making `/phase0` redirect to `/login` for unauthenticated users. Reject — stays public; logged-out view shows all Pending.
- AG using `useState` for approval state (wanting to "refresh without a full page load"). Reject — server component; page re-render via route refresh is correct.
- AG adding a "Refresh" or "Reload" button. Reject — `revalidate: 60` on both fetches is sufficient.
- AG running `Promise.all` but awaiting each fetch sequentially inside it. Verify the three calls are genuinely parallel.
- AG adding a reviewer INSERT policy in this stage. Reviewer note flow is D0.6d scope — leave the INSERT policy approver-only for now.
- AG skipping the HEAD SHA in the PR body. Reject — Maymun needs it for the manual verification inserts.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.6c-lessons.md`:

```md
# D0.6c Lessons

**Stage:** D0.6c — `phase0_approvals` schema + live status badges
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity** — fill only this section.

**Stage size actual:** [Xm] (estimated M: 30–45 min)
**Model used actual:** [Sonnet 4.6 thinking / other]
**Files created:** supabase/migrations/0002_phase0_approvals.sql, app/_lib/supabase-phase0.ts, app/_lib/phase0-status.ts
**Files modified:** app/_lib/github.ts, app/_data/manifest-types.ts, app/_lib/i18n.ts, tailwind.config.ts (if accent.yellow added), app/phase0/page.tsx, app/_components/phase0/TrackSection.tsx, app/_components/phase0/ItemCard.tsx
**Files deleted:** none
**New dependencies:** none

**Step 0 findings:**
- Supabase env var name in server.ts: [ANON_KEY ✅ / other — specify]
- GITHUB_REPO constant: [agbuilder-platform/revolutionize ✅ / BLOCKED if maymun207]
- Phase0Status before patch: [verbatim]
- ItemCard status badge before patch: [hardcoded 'pending' / prop-driven]
- supabase/migrations/ contents: [0001 only ✅ / BLOCKED if 0002 exists]
- i18n.ts phase0.statusLabels pre-existing: [not present ✅ / BLOCKED]
- tailwind.config.ts accent.yellow: [added / already present as token X]

**`phase0_approvals` migration created:** [✅]
**`import 'server-only'` on supabase-phase0.ts:** [✅]
**`phase0-status.ts` has zero Supabase imports:** [✅]
**`phase0_approvals` has UPDATE policy:** [confirmed zero — immutable log]
**`phase0_approvals` has DELETE policy:** [confirmed zero]
**D0.6d scope added (approve buttons, detail route, react-markdown):** [confirmed not present]
**HEAD SHA included in PR body:** [✅]
**Maymun UUID query included in PR body:** [✅]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**SQL migration 0002 run successfully:** [✅ / ❌]
**All 25 Pending on login (no approvals in DB):** [✅ / ❌]
**A1 → 🟢 Approved after insert with real SHA:** [✅ / ❌]
**B1 → 🟡 Stale after insert with fake SHA:** [✅ / ❌]
**Stale tooltip visible on hover:** [✅ / ❌]
**C1 → 🔴 Blocked after insert:** [✅ / ❌]
**Signed out → all 🔴 Pending (RLS confirmed):** [✅ / ❌]
**Bilingual status labels in TR mode:** [✅ / ❌]
**Console zero errors on /phase0:** [✅ / ❌]
**15 routes no regression:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — Claude appends post-merge.
```

---

**End of Stage D0.6c prompt.**
