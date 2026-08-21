# Stage S2h — Big Picture publication + nav repurpose + A4 manifest fix

> **Stage type:** Content publication + app wiring (spans two repos)
> **Author:** Claude (single-author rule, per dev_schedule §9)
> **Recommended model:** Claude Sonnet 4.6 — extended thinking
> **Estimated size:** M (medium) — ~40–60 min AG + ~30 min human review
> **Operator:** Maymun (Conductor) · Reviewer: Claude (design) + Maymun (final merge)

> ⚠️ **AG CONFIGURATION — READ FIRST**
> - This stage produces **two PRs in two different repos** (content repo first, app repo second). Do NOT combine them into one PR; a PR is per-repo.
> - The canonical HTML is delivered as a **pre-authored file** at `_incoming/big_picture_bilingual.html`. You **do not author, regenerate, redraw, reformat, "improve," minify, or re-indent** its contents. You copy it byte-for-byte. The SVG coordinates and the bilingual blocks are exact; any edit is drift and will be rejected at review.
> - All `str_replace` operations use **exact confirmed strings** captured in Step 0 — never line numbers.
> - Do not auto-execute anything beyond the steps below. Stop at the two STOP-AND-REPORT gates.

---

## 1. Goal

Publish a new canonical, self-contained, bilingual architecture document — **"Big Picture"** — into the content repo and surface it in TheBluePrint23 by **repurposing the existing (mis-mapped) "Big Picture" item** to render this new document via the existing DocumentFrame embed pattern. In the same content-repo PR, fix the **A4 reading-week folder-path drift** in the Phase 0 manifest.

After this stage:
- `maymun207/revolutionize` contains `docs/architecture/big_picture_bilingual.html` (sha256 `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`).
- The Phase 0 manifest no longer references the wrong reading-week folder.
- The "Big Picture" item in TheBluePrint23 renders the new document (no longer the bridge doc).

---

## 2. Prerequisites

These MUST be true before AG starts:

- [ ] Operator has downloaded `big_picture_bilingual.html` (the file presented by Claude) and placed it **unmodified** at `_incoming/big_picture_bilingual.html` in the local working tree of the `maymun207/revolutionize` content repo.
- [ ] The file's sha256 is `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`. (Byte size: 35099.)
- [ ] AG has clone/working-tree access to **both** `maymun207/revolutionize` (content) and `maymun207/TheBluePrint23` (app).
- [ ] Branch protection: 1 approver on `main` for both repos (existing).

---

## 3. Context

### 3.1 Why a new canonical doc (not a React page)

Per the program's standing rule — *"Re-implement only where interactivity earns it; serve canonical source everywhere else"* — this content is published as **one self-contained HTML document** rendered through the existing `DocumentFrame` embed pattern. This keeps the single-source-of-truth invariant: there is exactly one copy of the content, in the content repo, and the app renders it directly. No content is duplicated into React components (that was the drift the DocumentFrame migration eliminated).

The document is **bilingual (EN/TR)** with an in-document language toggle, consistent with the v6 SSoT and the leadership charter. It is **self-contained** (its own `<style>` and `<script>`), so it renders correctly inside an iframe with `sandbox="allow-scripts"`.

### 3.2 Known wrong mapping being corrected

`app/page.tsx` historically frames `03_bridge_revolutionize_builds_eaip.html` while being labelled **"Big Picture"** — a known incorrect mapping. This stage repurposes that "Big Picture" surface to render the **correct** Big Picture document. The bridge document continues to be reachable through its own dedicated tab/route (do not remove the bridge route).

### 3.3 The A4 manifest drift (fix in this same content PR)

The Phase 0 manifest item `A4` ("Reading week — 6 write-ups") has an `acceptance` string pointing at the folder `docs/reading_week/`. The canonical value, used by both `phase_0_runbook.md` (`ls docs/reading_week_writeups/*.md | wc -l → 6`) and `program_plan_phase0_phase1_v1.md` (`committed to docs/reading_week_writeups/`), is **`docs/reading_week_writeups/`**. The manifest is the single outlier and must be aligned. The acceptance gate that reads the manifest would otherwise check the wrong folder.

### 3.4 Two-repo ordering (load-bearing)

The app fetches canonical docs **at runtime** from the content repo's `main`. Therefore the **content-repo PR must merge first**, and only then does the app-repo PR's "Big Picture" item resolve to a real file. Sequence: content PR → operator merge → app PR.

---

## 4. Detailed task

### Step 0 — Mandatory reads (STOP-AND-REPORT gate #1)

Read the **live** files and report findings verbatim. Do not write any code or move any file before this report is delivered and acknowledged.

**Content repo (`maymun207/revolutionize`):**
0a. Confirm `_incoming/big_picture_bilingual.html` exists. Report its **byte size** and **sha256**. If the sha256 ≠ `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`, **STOP** — the file is wrong; do not proceed.
0b. Confirm `docs/architecture/` exists and list its current contents (expected to include `ARDICTECH_Platform_v6_SSoT_bilingual.html`, `08_leadership_charter_bilingual.html`). Confirm `docs/architecture/big_picture_bilingual.html` does **not** already exist.
0c. Open `docs/phase0/manifest.json`. Find the `A4` item. Report its **exact** `acceptance` string, character-for-character.
0d. Search `docs/phase0/` for every occurrence of the substring `reading_week` (in `manifest.json` and in any stub `.md`). Report each file + the exact surrounding string. Distinguish `reading_week/` (wrong) from `reading_week_writeups/` (correct).
0e. Open `docs/library/manifest.json` (the document-hub/library manifest) if it exists. Report whether architecture docs (SSoT, charter) are registered there and the **exact JSON shape** of one such entry (so a new entry can match it). If no library manifest exists, report that.

**App repo (`maymun207/TheBluePrint23`):**
0f. Find the content-fetch utility (`app/_lib/github.ts` and/or `app/_lib/ssoFrame.ts`). Report: the **exact repo + branch** it fetches from (this is the gate — see below), the fetch function signature, and how a doc path is passed.
0g. Find `DocumentFrame.tsx`. Report its prop interface (which prop receives the HTML string; whether it uses `srcDoc`; whether `sandbox="allow-scripts"` is present), and the full implementation.
0h. Open `app/_lib/nav.ts`. Report the **full** nav structure: the Revolutionize pull-down/group, every item under it (id, label, short label, route), and where the **"Big Picture"** item currently lives (its id, label, and route).
0i. Identify the page/route that the "Big Picture" item resolves to (e.g. `app/page.tsx` or a route file). Report **exactly** which document path that page currently frames (expected: `03_bridge_revolutionize_builds_eaip.html`) and the **exact** code line/string that sets that path.

**GATE (do not skip):** If 0f reports the app fetches from a repo **other than** `maymun207/revolutionize` (e.g. `agbuilder-platform/revolutionize`), **STOP and REPORT**. Placing the doc in `maymun207/revolutionize` while the app fetches from a different repo means the doc will not load. Do not guess; the operator decides whether to (a) place the doc in the repo the app actually fetches from, or (b) reconcile the fetch path. Resume only on explicit operator direction.

Report all of 0a–0i, then **STOP**.

---

### Step 1 — Content repo: place the canonical doc

(Resume only after Step 0 report is acknowledged.)

1.1 Verify the incoming file's sha256 equals `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`. If it does not match, **STOP**.
1.2 Copy `_incoming/big_picture_bilingual.html` to `docs/architecture/big_picture_bilingual.html` **byte-for-byte** (a plain file copy — no reformatting, no normalization, no re-encoding).
1.3 Verify the copied file's sha256 still equals the value above. Remove the file from `_incoming/` after the copy succeeds.

### Step 2 — Content repo: fix the A4 manifest drift

2.1 Using the **exact** `acceptance` string captured in Step 0c, `str_replace` only the folder fragment `reading_week/` → `reading_week_writeups/` within that string. Make the minimal change; do not touch any other field or item.
2.2 For every other `reading_week/` occurrence found in Step 0d that refers to the bare folder (not already `reading_week_writeups/`), apply the same correction using exact confirmed strings. If a stub file legitimately needs no change, say so explicitly in the lessons file.

### Step 3 — Content repo: register in library manifest (conditional)

3.1 If Step 0e found a library manifest with architecture entries, add a new entry for `big_picture_bilingual.html` that **matches the existing entry shape exactly** (same keys, same casing). Suggested fields if the shape allows: a stable `docId` (e.g. `big-picture`), a bilingual title ("Big Picture" / "Büyük Resim"), category architecture, the path `docs/architecture/big_picture_bilingual.html`.
3.2 If no library manifest exists, skip this step and note it in lessons.

### Step 4 — Content repo: open PR #1 (STOP-AND-REPORT gate #2)

4.1 Commit Steps 1–3 on a feature branch. Open a PR against `main` of `maymun207/revolutionize`. Title: `S2h: publish Big Picture canonical doc + fix A4 manifest path`.
4.2 Report the PR URL and a concise diff summary. **STOP.** Do not start Step 5 until the operator has merged PR #1.

### Step 5 — App repo: repurpose the "Big Picture" item

(Resume only after operator confirms PR #1 is merged to content `main`.)

5.1 In the page/route identified in Step 0i, replace the framed document path — using the **exact** string captured in Step 0i — from the bridge doc to `docs/architecture/big_picture_bilingual.html`. Use the same DocumentFrame/ssoFrame helper and the same calling convention already used by the other content tabs (confirmed in Step 0f/0g). Do not invent a new fetch path or a new component.
5.2 If the "Big Picture" label/short-label in `nav.ts` is unchanged, leave it. Only change the document the route resolves to. Do **not** remove or alter the dedicated bridge route.
5.3 If DocumentFrame does not currently set `sandbox="allow-scripts"` (Step 0g), the language toggle and clickable nodes will not run. In that case, report this and recommend enabling `allow-scripts` for this embed — but do **not** change DocumentFrame's sandbox globally without operator approval (it may affect other embeds). Note the finding in lessons.

### Step 6 — App repo: typecheck, build, open PR #2

6.1 `npx tsc --noEmit` → 0 errors.
6.2 `npm run build` → succeeds; route count unchanged (repurpose adds no route).
6.3 Commit on a feature branch, open PR against `main` of `maymun207/TheBluePrint23`. Title: `S2h: repurpose Big Picture to canonical big_picture doc`. Report PR URL + diff summary.

---

## 5. Scope boundaries

**In scope:** placing the pre-authored doc; the A4 manifest path fix; optional library-manifest registration; repurposing the existing "Big Picture" surface to the new doc; typecheck/build.

**Out of scope (do NOT do):**
- Editing the HTML content in any way (no redraw, no translation, no reformatting).
- Removing or relabelling the bridge tab/route.
- Renaming the "Big Picture" nav item or changing its position.
- Changing the content-fetch repo/branch (that is the Step 0 GATE — operator-only).
- Changing DocumentFrame's global sandbox attribute without approval.
- Combining the two repos into one PR.
- Any other content tab, Phase 0 item, Library entry, or unrelated refactor.

---

## 6. Acceptance criteria

Content repo (PR #1):
- [ ] `docs/architecture/big_picture_bilingual.html` exists; sha256 = `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`; byte size 35099.
- [ ] `_incoming/big_picture_bilingual.html` no longer present.
- [ ] `grep -rn "reading_week/" docs/phase0/` returns **0** results that are not `reading_week_writeups/`.
- [ ] `docs/phase0/manifest.json` A4 `acceptance` now contains `docs/reading_week_writeups/`.
- [ ] Library manifest entry added **iff** a library manifest with architecture entries exists; otherwise explicitly noted as skipped.
- [ ] No other file in the content repo changed.

App repo (PR #2):
- [ ] The "Big Picture" surface frames `docs/architecture/big_picture_bilingual.html` (exact path), via the existing DocumentFrame/ssoFrame helper.
- [ ] The bridge route still exists and still frames the bridge doc.
- [ ] `npx tsc --noEmit` → 0 errors. `npm run build` → success, route count unchanged.
- [ ] No new fetch utility or duplicate component introduced.

---

## 7. Test / verification requirements

- After PR #1 merges, fetch `docs/architecture/big_picture_bilingual.html` from content `main` and confirm sha256 unchanged (the byte-copy survived round-trip).
- After PR #2 (on the preview deployment): open the "Big Picture" surface and confirm: (a) the page renders the new doc (title "Big Picture — Revolutionize developer & runtime topology"); (b) the **EN/TR toggle** switches all prose; (c) **clicking a diagram node** scrolls to its section; (d) the **"Highlight AG bypass path"** button toggles the dashed amber path; (e) the bridge tab is unaffected. If (b)/(c)/(d) do not work, the sandbox lacks `allow-scripts` — report per Step 5.3.
- Render-check at 375 / 768 / 1366 px: the embedded doc is responsive (max-width 1040, fluid SVGs); confirm no horizontal overflow of the app shell.

---

## 8. Style / idiom

- Match the existing content tabs exactly: same fetch helper, same DocumentFrame call signature, same route conventions. This stage adds no new patterns — it reuses.
- Bilingual handling lives **inside** the document (its own toggle). The app does not need to pass a `lang` prop for this doc.
- Commits: imperative, scoped, one logical change per commit where practical.

---

## 9. Edge cases

- **sha256 mismatch on incoming file** → STOP at Step 0a/1.1. Do not "fix" by re-saving; the operator re-downloads.
- **App fetches from a different repo than `maymun207/revolutionize`** → STOP at Step 0 GATE; operator decides.
- **DocumentFrame lacks `allow-scripts`** → doc still renders statically (EN default visible), but toggle/clicks are inert; report, recommend, do not globally change sandbox.
- **A4 string differs from expected** → use whatever the live string actually is (Step 0c is the source of truth), correcting only the `reading_week/` fragment.
- **Multiple `reading_week/` hits** → fix all bare-folder occurrences; leave any already-correct `reading_week_writeups/` untouched.
- **"Big Picture" item not found in nav** → STOP and report; the repurpose target is ambiguous and must be confirmed before wiring.

---

## 10. Deliverables

1. Content-repo PR #1: new canonical doc + A4 fix (+ optional library entry).
2. App-repo PR #2: Big Picture repurpose.
3. `prompts/v0/S2h-lessons.md` (template below), committed in PR #1 or PR #2 per repo convention.

---

## 11. Verification approach (summary)

Ground truth is raw GitHub files and the standalone preview deployment — never AG state summaries. The operator verifies §6 against the PR diffs and §7 against the preview before each merge. Each PR requires ≥ 30 min human review.

---

## 12. Model recommendation

Claude Sonnet 4.6, extended thinking. The content is pre-authored (no generation), so the work is precise reads + exact `str_replace` + a byte copy + reusing an existing embed pattern across two repos. Sonnet 4.6 with thinking is sufficient and appropriate; Opus is not required.

## 13. Size estimate

**M (medium).** Two repos, two PRs, a STOP gate between them, but no novel components and no authored content. ~40–60 min AG execution split across the two PRs + ~30 min human review per PR.

---

## Lessons template — create `prompts/v0/S2h-lessons.md`

```md
# S2h Lessons

**Stage:** S2h — Big Picture publication + nav repurpose + A4 manifest fix
**Executed:** 2026-XX-XX
**Operator:** Maymun · **Reviewer:** Claude (design) + Maymun (final merge)
**Result:** [✅ / ❌]

---

## § Antigravity self-report
**AUTHORED-BY: Antigravity** — fill only this section.

**Stage size actual:** [Xm] (estimated M: 40–60 min)
**Model used actual:** [Sonnet 4.6 thinking / other — record substitution if it happened]
**Incoming file sha256 match at Step 0a:** [✅ / ❌ + value]
**Step 0 GATE — app fetch repo reported:** [exact repo + branch]
**Copied doc sha256 after Step 1.3:** [value]
**A4 acceptance string before → after:** [exact strings]
**Other reading_week occurrences found/fixed:** [list, or "none beyond A4"]
**Library manifest entry:** [added with shape … / skipped — no manifest]
**DocumentFrame allow-scripts present:** [✅ / ❌]
**(a) What I did well:** [bullets]
**(b) What I missed or got wrong:** [≥ 1 bullet; never "none"]
**(c) Surprises:** [bullets — anything in the live repos that didn't match the prompt's expectations]
**(d) Prompt weaknesses identified:** [bullets]

## § Operator review (Maymun)
**AUTHORED-BY: Maymun** — fill after PR-diff review + preview check.

**PR #1 diff scope = doc + A4 only:** [✅ / ❌]
**PR #2 diff scope = Big Picture repurpose only; bridge intact:** [✅ / ❌]
**Preview: EN/TR toggle works:** [✅ / ❌]
**Preview: diagram node click → scroll works:** [✅ / ❌]
**Preview: AG-bypass highlight toggle works:** [✅ / ❌]
**Preview: no app-shell horizontal overflow (375/768/1366):** [✅ / ❌]
**Things AG self-report missed:** [≥ 1 bullet]

## § Prompt-author retrospective (Claude)
**AUTHORED-BY: Claude** — do not fill; Claude appends post-merge.
```

---

**End of Stage S2h prompt.**
**Canonical doc sha256:** `febc4c7e135638d91f4a1ae4576da128908334b2aadbd96835c9542c991e57cd`
