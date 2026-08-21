# Context Bootstrap — Single-Source Migration (2026-06-03)

> Read this first in the new session. Roles unchanged: Maymun = Conductor; Claude = architect/sole stage-prompt author; AG = executor. One gated stage at a time; AG runs ONLY the gated stage, never a whole planning doc. Verify on ground truth (raw GitHub / standalone file / Vercel preview), never AG summaries.

## ⛔ FIRST ACTION IN NEW SESSION — one open question to confirm
**Is the single source = TWO canonical docs (recommended), or fold the charter into the SSoT as one file?**
- Recommended: **two docs** — `v6 SSoT` owns architecture (7 tabs); `08 charter` owns governance (Bridge tab). No content is duplicated → still rock-solid single-source, cleaner separation, charter stays a usable standalone doc.
- Alternative: fold charter into SSoT as a `sec-bridge` section (one file, but mixes concerns + more work — advised against).
Once Maymun confirms → **write S2.**

## Why we're doing this (the defect)
Same content lived in 3 hand-maintained places that drift: canonical HTML docs (→ Library), `app/_data/*.ts` React layer (→ interactive tabs), and a duplicate `docs/` in the app repo. The React content layer was a hand-copy of docs that already existed → the drift source. Fix = single source, tool RENDERS docs, retire the React content re-implementation.

## Decided this session
- **Option A** (render docs, retire React content layer) — confirmed by INV-1: 0 substantial deltas; HTML5 does everything React does for content (13 deltas: 7 trivial, 6 moderate).
- **Choice 2 nav** — keep the familiar per-section top tabs (already-debugged responsive nav preserved); each tab frames its source at its section.
- **Retire ALL React content copies, incl. the React Bridge** (keeping it re-creates charter drift).
- **Embed mode = app-side injection** (not an SSoT edit) → so S2 shrinks to click-to-detail only.

## S1 findings (locked facts — don't re-discover)
SSoT = `docs/architecture/ARDICTECH_Platform_v6_SSoT_bilingual.html`, 730 lines, commit `662fe75`, content repo `agbuilder-platform/revolutionize@main`. App repo = `maymun207/TheBluePrint23` (fetches content from content repo via `app/_lib/github.ts`; has a stale `docs/` duplicate → delete in S7).

**Mapping (all 7 architecture tabs confirmed clean):**
`TABS` @ SSoT:155 = `[['big','sec-big'],['earch','sec-earch'],['econn','sec-econn'],['eplan','sec-eplan'],['rarch','sec-rarch'],['rconn','sec-rconn'],['rplan','sec-rplan']]`. Big Picture→sec-big, EAIP Arch→sec-earch, EAIP Conn→sec-econn, EAIP Sched→sec-eplan, Rev Arch→sec-rarch, Rev Conn→sec-rconn, Rev Sched→sec-rplan.

**Bridge tab ≠ architecture.** Its 7 components are governance: overview (=Big Picture loop), CTO gates(8), model routing(4), risk register(6), skill map(5), kickoff(9), open items(6). Canonical source = `08_leadership_charter_bilingual.html` (38KB, bilingual, own render()+setLang(), no internal tab bar): `var GATES`@85, `ROUTING`@94, `RISKS`@99, `SKILL`@107, `KICK`@113, `OPENS`@123. NOT in the SSoT. Bridge tab → frame the charter directly. **Trim charter overview so Bridge doesn't repeat the Big-Picture loop.**

**Big Picture correction:** app root currently frames `03_bridge_…html` (EN-only, missing substrate band, ADR note, v1.5 note, TR). Intended source = SSoT `renderBig` (has all + bilingual). `app/page.tsx:6-8` comment already flags the swap.

**The one net-new feature for S2:** `renderEarch`(SSoT:612) + `renderRarch`(SSoT:667) are chip-lists with NO click-to-detail. Add click-to-expand panels w/ inbound/outbound connections. Likely **reuses connection data already in the SSoT** (renderEconnTable@646, renderRconnTable@692 have conn data+filters) — S2 Step 0 confirms before authoring.

**Embed mechanism (app-side, for S6):**
- `switchTab(id)` @SSoT:723 — shows/hides `.sec` via `.vis` class (SSoT:31 `.sec{display:none}.sec.vis{display:block}`). id ∈ big/earch/econn/eplan/rarch/rconn/rplan.
- `setLang(l)` @SSoT:724 — independent of section state; re-renders all 7 sections, leaves `.vis` untouched.
- Nav = `.hdr` (SSoT:130-141), `.tabs` JS-rendered by `buildNav()`. Hide via injected `<style>.hdr{display:none!important}</style>`.
- `DocumentFrame.tsx:24` uses `srcDoc` (not `src`), `sandbox="allow-scripts"` (line 36) → query params can't reach SSoT. **Mechanism:** DocumentFrame prepends a preamble before SSoT's `<script>` (SSoT:153): a `<style>` to hide `.hdr` + `<script>window.addEventListener('load',()=>switchTab(SECTION))</script>` (load fires after the SSoT's own `setLang('en')` init). Charter framed the same way (hide its header; no switchTab needed — single scroll).

## The plan (8 stages, 2 phases) — full doc: MIGRATION_PLAN_single_source.md
**Phase 1 (content repo; verify by opening self-contained file standalone before merge):**
- S1 ✅ done (this doc).
- **S2** — enhance SSoT: click-to-detail panels (EAIP Arch + Rev Arch). *Embed is app-side, so NOT in S2.* M, may split. ← NEXT
- S3 — reconcile timeline in SSoT (was R2). S.
- S4 — reconcile prerequisites in SSoT (was R3). S.
- S5 — verify SSoT consistency (was R4). XS–S.

**Phase 2 (app repo; Vercel PR previews available):**
- S6 — re-point tabs: 7 → frame SSoT@section (embed preamble); Bridge → frame charter (embed preamble, trim overview); fix Big Picture mapping; **keep top nav (Choice 2)**; app-machinery tabs (Phase 0/Library/Resources) untouched. M.
- S7 — delete React content components (incl. Bridge) + orphaned `app/_data` content files (Step 0 lists what machinery still needs: i18n.ts, nav.ts, resources.ts) + delete app-repo `docs/` duplicate. S–M.
- S8 — retire standalone docs 01–07 (superseded by SSoT) + tidy Library manifest; **KEEP charter + SSoT + process docs**. S, deferrable.

## Reconciliation status (folded into migration)
R1 (v0.5→v1.5) MERGED @`662fe75`; its SSoT edit (`vmodel_note` in `big{}`) preserved → foundation for S3–S5. Timeline→S3, prereqs→S4, verify→S5, all now target the one SSoT file.

## In-flight expectations / rules
- Production never breaks: Phase 1 doesn't touch what tabs render; Phase 2 flips them with preview verification first.
- Transient during Phase 1: Library shows updated SSoT while tabs still show old React — expected, resolves at S6.
- Bilingual EN+TR for prose; technical identifiers stay as-is; operator TR review.
- Optional later: consolidate the two repos into one (kills two-repo confusion + gives content Vercel previews) — separable from the drift fix, low priority vs CWF.

## Artifacts from this session (in /mnt/user-data/outputs/ — save to project)
`MIGRATION_PLAN_single_source.md` · `INV-1-interactivity-inventory.md` · `S1-mapping-recon.md` · this bootstrap.
