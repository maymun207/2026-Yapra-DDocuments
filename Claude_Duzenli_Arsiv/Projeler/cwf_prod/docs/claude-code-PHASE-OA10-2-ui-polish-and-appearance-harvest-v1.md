# PHASE OA10-2 — UI polish sweep + chat appearance harvest (frontend-only) — v1

> **Version:** v1 · rev 1 · 2026-07-02 · Author lane prompt (Claude Code on AntiGravity)
> **Baseline:** origin/master @ `7737b86` (581 tests, docVersion rev 22)
> **Type:** frontend-only. Scope fence: `src/`, `public/`, `index.html`, `.agents/*` (+ `public/architecture/manifest.json` ONLY if doc-drift WARNs). If you touch `api/`, `shared/` (beyond a UI-constants file), `supabase/` — STOP, out of scope.

---

## 0 · Mission (two parts, one phase)

**A.** Fix the admin-panel UI clipping bugs (screenshot-verified in prod) and make the fix a **permanent, self-enforcing UI discipline rule** — the owner has had to report this class of bug repeatedly; after this phase it must be structurally impossible to ship it silently again.

**B.** Harvest the chat-surface appearance from the local **CWF-DEMO** repo into `cwf_yaprak`: brand assets verbatim, components reimplemented clean (house rule: harvest capability, never spaghetti files). CWF-DEMO stays **frozen and read-only** — you read from it, you never write to it.

---

## 1 · Hard pre-flight gate

1. `git status` clean; `git rev-parse origin/master` = `7737b86…`; local master matches. Tests: 581 green (record count).
2. **Locate CWF-DEMO locally** (sibling of the working dir, e.g. `../CWF-DEMO` under the same Desktop path). Report its absolute path + `git log -1` hash. Open it **read-only**. If not found, STOP and report — do not guess assets from memory.
3. Discovery inventory (report file paths before writing anything): in CWF-DEMO find — the ARDIC logo asset(s), the CWF logo asset(s), the favicon, the hero/background image, the login-page branding, the predefined-prompt list (where the strings live), the `>` upward accordion component, and the cycling "preparing" status messages implementation (strings + rotation mechanism).

## 2 · Part A — clipping fix + sweep + RULE

**2a · The named bug.** Rules list rows: the `● running vN` badge is clipped at the right edge of the list column (text cut mid-word, version invisible, badge sliding under the detail pane). Fix with the standard pattern: row = flex; the NAME gets `min-w-0 truncate` (+ `title` tooltip with the full name); the BADGE gets `shrink-0 whitespace-nowrap`; the list column gets a sane min width; nothing in a row may be visually clipped at 1280px **or** 1024px viewport widths.

**2b · The sweep.** Audit EVERY admin panel (all 9) for the same class: any flex row combining text + badge/pill/action, any table cell that can clip, any fixed-width column that can overflow. Fix all instances with the same pattern. Report the list of files/rows touched.

**2c · RULE (next free number) — UI DISCIPLINE, add to `.agents/AGENTS.md`:**
> *Every list row / table cell / badge must render without clipping at 1280px and 1024px. Pattern: text truncates (`min-w-0 truncate` + full-value tooltip), badges/actions never shrink (`shrink-0 whitespace-nowrap`), numbers right-aligned mono, no fixed pixel widths that can clip content. EVIDENCE: any phase that touches UI must include real rendered evidence (dev-server screenshot; if unavailable, DOM dump + the class-pattern assertions) at BOTH widths for every changed surface. A UI phase without rendered evidence is NOT done.*
CHANGELOG entry, house style.

**2d · Tests.** Extend the admin UI tests: for each list-row component, assert the class pattern (name node has `min-w-0`+`truncate`, badge node has `shrink-0`). These are structural guards — the rendered evidence in §4 is the visual proof.

## 3 · Part B — appearance harvest (chat surface)

Seven items, all sourced from the CWF-DEMO discovery in §1.3:

1. **ARDIC logo** — top bar of the chat surface (and login), as in DEMO.
2. **CWF logo** — hero on the chat home + login page.
3. **Favicon** — replace the default; also set the `index.html` `<title>` to the product name used in DEMO.
4. **Background hero image** — the wireframe-factory banner on the chat home (and the login backdrop if DEMO uses one).
5. **Predefined prompt chips** — the chip row under the input ("Bilgi Alabileceğiniz Konular", "Fabrika Listesi", "Aktif Alarmlar", "Aktif/Boş Değirmenler", "Aktif Reçeteler", "Kullanılan Materyaller", "Depo Envanteri" — take the authoritative list from DEMO). Clicking a chip submits its full question.
6. **`>` upward accordion** — the chevron at the chat input opens an accordion **upwards** listing the same predefined prompts as full questions; selecting one fills/submits.
7. **Cycling status messages** — while the response is being prepared (pre-first-token), show rotating status lines exactly in the DEMO spirit ("Kayıtları tarıyorum…", etc. — take the string set from DEMO), Claude-Code-style. Wire to the existing streaming lifecycle; the rotation stops at first token. Must not interfere with the OBS-2 empty-guard honest message (if the guard fires, its message replaces the spinner — never both, never blank).

**Harvest rules (hard):**
- **Assets verbatim** → `public/brand/` (logos, favicon, hero image). List every copied file with its DEMO source path.
- **Components reimplemented clean** in `cwf_yaprak`'s structure (shadcn/Tailwind house style) — do NOT copy DEMO component files.
- **RULE 1:** the predefined-prompt strings and the status-message strings are CONTENT → a UI-constants module (e.g. `src/lib/uiConstants.ts` or the existing constants home), never inline in components. (§8 note: this is advisory/soft content; a future governed home is possible, out of scope now.)
- Login page gets the DEMO branding (logo, tagline, backdrop) — functionality untouched (Supabase-direct login stays exactly as is).
- Empty≠zero at the render layer untouched; no chat pipeline changes; `chat.ts` untouched.

## 4 · Self-verification (evidence required)

1. Pre-flight transcript incl. the CWF-DEMO path + hash + the §1.3 discovery inventory (file paths).
2. **Rendered evidence per the new RULE:** dev-server screenshots (or DOM dumps if truly unavailable, stated why) of — Rules list at 1280px AND 1024px with badges fully visible; one more swept panel before/after; chat home with logos/hero/chips; the upward accordion open; the cycling status message mid-response; the login page.
3. Tests: prior 581 + new structural guards, all green; coverage floor not lowered; `typecheck` + build clean.
4. Asset manifest: every file added under `public/brand/` with its DEMO source path.
5. Greps: no hardcoded prompt/status strings in components (all from the constants module); no `.env` reads; zero writes inside the CWF-DEMO directory (`git -C <demo> status` clean).
6. `check:doc-drift` — expected: no WARN (appearance is below diagram altitude). If it WARNs, reseal per RULE 20 in the same seal.
7. RULE 25: seal → merge → **delete branch** → `git push origin master` → report the remote hash. NOT-DONE section if anything is incomplete.

---

*PHASE OA10-2 · v1 · rev 1 · 2026-07-02 · baseline 7737b86 · fix the clipping class forever; make the front door look like the product it is.*
