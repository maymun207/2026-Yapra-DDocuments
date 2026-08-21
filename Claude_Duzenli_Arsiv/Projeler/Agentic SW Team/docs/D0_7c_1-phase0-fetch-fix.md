# Stage D0.7c.1 — Phase 0 item-detail document fetch fix

> **Stage type:** V0 hotfix (D0.7 group) · diagnostic-first
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Date:** 2026-06-02
> **Model recommended:** Claude Sonnet 4.6, thinking mode
> **Model used actual:** [AG fills in lessons.md self-report]
> **Estimated size:** S — Antigravity 15–25 min · human review 10–15 min
> **Merge mode:** operator-gated — AG diagnoses + fixes + verifies in one PR; operator reviews the root-cause finding and the fix together, then approves.
> **Predecessor:** D0.7c (`1cb204b`)
> **Successor:** D0.7 CTO fidelity pass (this fix is part of earning that sign-off)

---

## 1. Goal

Phase 0 item-detail pages currently render `Document not yet available or could not be loaded. GitHub API 404: Not Found` even though the backing documents **exist** on `main`. Confirmed: all 25 Phase 0 stub docs are committed to `agbuilder-platform/revolutionize` at `docs/phase0/` (e.g. `docs/phase0/a1-open-prereqs.md` is present), alongside `docs/phase0/manifest.json`.

Therefore this is a **path-resolution bug**, not missing content: the path the detail route requests does not match the path that exists in the repo. After D0.7c.1, every Phase 0 item-detail page fetches its document successfully (HTTP 200) and renders it — even when that content is still a stub containing `TBD`s.

**Critical scope boundary — what this stage does NOT do:** it does **not** fill in, edit, or complete any document content. The stubs still contain `TBD`s; that is real program work (e.g. A1's open-prereq answers) tracked separately. Fixing the fetch makes the *incompleteness* visible (a rendered stub + accurate "Stale" badge) instead of masking it as a 404. Do not touch document content.

---

## 2. Prerequisites

- D0.7c merged (`1cb204b`). 11-tab nav verified clean.
- All 25 Phase 0 docs + `docs/phase0/manifest.json` committed to `agbuilder-platform/revolutionize` on `main` (verified via repo browse: a1…a7, b1…b15, c1…c3, manifest.json). The committed filenames are **lowercase** (`a1-open-prereqs.md`, etc.).
- `fetchDocumentContent` exists in `app/_lib/github.ts` and works for the Library (D0.7b) — so the fetch primitive itself is fine; the bug is in the path passed to it for Phase 0.
- The Phase 0 governance manifest (`docs/phase0/manifest.json`) is a **separate** file from the Library manifest (`docs/library/manifest.json`). Do not conflate them.

---

## 3. Step 0 — Diagnose (this is the load-bearing part; report before fixing in the same PR)

AG performs the diagnosis and records every finding in the PR body. Diagnose first, then apply the fix that matches the actual root cause.

**0.1 — Scope.** Fetch the document for a spread of item ids across all three prefixes: **A1, A2, A7, B1, C1.** For each, report: resolves (200 + content) or 404. This determines whether the bug is **systematic** (all 404 → route path-construction / casing) or **per-item** (some 404 → manifest typos).

**0.2 — Manifest contract.** Read `docs/phase0/manifest.json`. For A1, A2, A7, B1, C1, report the **exact `file` field value** verbatim (the manifest is the path contract). Note whether each includes the `docs/phase0/` prefix and the casing.

**0.3 — Route path construction.** Open the Phase 0 detail route (`app/phase0/[itemId]/page.tsx` or wherever the item document is fetched). Report **exactly how the fetch path is built**:
- Does it pass `item.file` from the manifest **verbatim** to `fetchDocumentContent`?
- Or does it **reconstruct** the path from the route param (`itemId`), e.g. `docs/phase0/${itemId}-...md`? If so, what casing does `itemId` have? (The URL shows uppercase `/phase0/A1`; the file is lowercase `a1-...`.)
- Report the literal path string passed to `fetchDocumentContent` for item A1.

**0.4 — Pinpoint the mismatch.** State plainly: requested path vs actual committed path for A1, and the precise delta — **casing**, **missing/extra `docs/phase0/` prefix**, **wrong filename slug**, or **id-derived instead of manifest-derived**. Name the single root cause (or both, if two coexist).

If the diagnosis reveals something structurally larger than a path/casing fix (e.g. the manifest references a completely different naming scheme than the 25 committed stubs), **report BLOCKED with the finding** and stop — do not improvise a large change.

---

## 4. Fix — apply the one that matches the diagnosis

Choose strictly per Step 0's root cause. Prefer the smallest correct change.

- **If the route reconstructs the path from `itemId` (esp. with uppercase):** change it to use the manifest's `item.file` value verbatim. The manifest is the contract; the route should not rebuild paths from ids. This is the preferred fix if applicable — it also fixes any future casing/slug drift.
- **If the route already uses `item.file` but the manifest `file` entries are wrong** (missing `docs/phase0/` prefix, uppercase, typo'd slug): correct the `file` entries in `docs/phase0/manifest.json` to match the actual committed lowercase paths. (Manifest lives in the `revolutionize` repo — this is a repo edit, additive/corrective, not a UI-app change.)
- **If both:** fix both — route uses `item.file`, and `item.file` values are correct.

**Hard boundary — do NOT rename the committed repo files.** The 25 docs are correctly named lowercase. Fixing a buggy manifest/route by renaming the source files is backwards (additive-over-destructive rule). Fix the consumer (route/manifest), never the correctly-named source.

If the fetch path is correct but `fetchDocumentContent` still 404s, check whether the function needs the path **without** a leading slash, or whether the `GITHUB_PAT` has `Contents: Read` on `docs/phase0/` (it works for `docs/library/` and `docs/architecture/`, so this is unlikely — report if so).

---

## 5. Steps

**Step 0 — Diagnose.** §3. Record all findings for the PR body.

**Step 1 — Apply the matched fix.** §4. Smallest correct change.

**Step 2 — Re-verify the full set.** After the fix, fetch the document for **all 25 items** (a1–a7, b1–b15, c1–c3) and report a pass/fail map. Target: **25/25 resolve (200)**, 0 × 404. Stub content (with `TBD`s) rendering is a PASS — content completeness is out of scope.

**Step 3 — Regression: Library untouched.** Confirm `/library` and `/library/[docId]` still fetch correctly (separate manifest, must not be disturbed).

**Step 4 — TypeScript + build.** `npx tsc --noEmit` → 0. `npm run build` clean (17 routes, unchanged).

**Step 5 — Verify, commit, open PR.**
PR title: `"D0.7c.1: fix Phase 0 item-detail document fetch (404 → resolves)"`.
PR body MUST include: the Step 0 diagnosis (scope map, A1/A2/A7/B1/C1 manifest `file` values, route path-construction finding, named root cause), the chosen fix, and the Step 2 25/25 pass map. Screenshot of `/phase0/A1` rendering the stub content (no red banner).

AG stops. Report PR URL + the named root cause in one line.

---

## 6. Acceptance criteria

### Technical
- `npx tsc --noEmit` → 0. `npm run build` clean, 17 routes (unchanged).
- Root cause named explicitly in the PR body (one of: id-derived path / manifest path error / casing / both).
- Fix matches the diagnosis; smallest correct change; **no committed repo files renamed**.

### Functional — operator-verified on Vercel preview
- `/phase0/A1` renders the document content (the stub), **no red 404 banner**. The "Stale" badge remains (content still has `TBD`s — correct).
- Step 2 map: **25/25 Phase 0 items resolve**, 0 × 404.
- The acceptance-criteria block and Owner/Effort metadata still render as before.
- Approve/Block controls still work for an Approver.

### No regression
- `/library`, `/library/[docId]` still fetch and render (separate manifest untouched).
- `/`, `/resources`, the 8 deep-dive tabs unaffected.
- Console on `/phase0/A1` → zero app errors.

---

## 7. Edge cases
- **Some items resolve, others 404 after the fix:** means mixed manifest typos — correct the remaining `file` entries until 25/25. Report which were wrong.
- **A stub is empty (0 bytes):** renders as empty content, not a 404 — acceptable (it's a stub). Note any empties in the PR for the content-writing pass later.
- **Markdown stub with `TBD`:** renders normally via MarkdownRenderer; the Stale badge is driven by approval state / staleness logic, not by content — leave that logic alone.
- **Casing fix breaks on a case-insensitive local FS but works on GitHub:** the source of truth is the GitHub API (case-sensitive) — match the actual committed lowercase names.

---

## 8. Verification approach
1. Open `/phase0/A1` on the preview → stub content renders, no red banner, Stale badge present.
2. Spot-check `/phase0/A7` (resource-allocation), `/phase0/B1`, `/phase0/C3` → all render.
3. Confirm the Step 2 25/25 map in the PR body.
4. Open `/library/runbook` → still renders (no regression).
5. Console on `/phase0/A1` → no app errors.

If all pass → send: **`"Approved — merge D0.7c.1"`**.

---

## 9. Antigravity configuration
**Model recommended:** Sonnet 4.6 thinking. Small, but the diagnosis must be exact before the fix — that's the whole point of the stage.

**Watch for:**
- AG renaming the 25 committed repo files to match a buggy manifest/route. **Hard reject** — fix the consumer, not the correctly-named source.
- AG "fixing" by hardcoding the A1 path or special-casing one item. Reject — fix the general path resolution so all 25 work.
- AG editing document *content* to remove `TBD`s. **Reject** — content is out of scope; this stage only fixes the fetch.
- AG confusing the Phase 0 manifest with the Library manifest. Reject — they are different files in different folders.
- AG skipping the Step 0 diagnosis and jumping to a guessed fix. Reject — the PR body must show the named root cause and the 25/25 re-verify map.
- AG writing a new fetch function instead of reusing `fetchDocumentContent`. Reject.

---

## 10. Lessons.md template

After merge, AG creates `prompts/v0/D0.7c.1-lessons.md`:

```md
# D0.7c.1 Lessons

**Stage:** D0.7c.1 — Phase 0 item-detail document fetch fix
**Executed:** 2026-06-XX
**Operator:** Maymun · **Reviewer:** Claude + Maymun
**Merge mode:** operator-gated
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity**

**Stage size actual:** [Xm] (estimated S: 15–25 min)
**Model used actual:** [Sonnet 4.6 thinking / other]

**Step 0 diagnosis:**
- Scope: [A1/A2/A7/B1/C1 → 200/404 each]
- Manifest `file` values: A1=[...] A2=[...] A7=[...] B1=[...] C1=[...]
- Route path construction: [uses item.file verbatim / reconstructs from itemId as `...`]
- Path passed for A1: [literal string]
- **Named root cause:** [id-derived / manifest path error / casing / both]

**Fix applied:** [route → use item.file / manifest path corrections / both]
**Files modified:** [app/phase0/[itemId]/page.tsx and/or revolutionize:docs/phase0/manifest.json]
**No repo files renamed:** [✅]
**Document content untouched (TBDs preserved):** [✅]
**Step 2 re-verify:** [25/25 resolve · 0 × 404]
**Library regression check:** [✅ still resolves]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun**

**/phase0/A1 renders stub, no 404 banner:** [✅ / ❌]
**25/25 items resolve:** [✅ / ❌]
**Stale badge still accurate (content has TBDs):** [✅ / ❌]
**Library + other routes no regression:** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]
**Approval signal given at:** [timestamp]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — appended post-merge.
```

---

**End of Stage D0.7c.1 prompt. Hotfix — restores Phase 0 document rendering (404 → resolves). Content completeness (the `TBD` answers) remains separate program work. Part of earning the D0.7 CTO sign-off.**
