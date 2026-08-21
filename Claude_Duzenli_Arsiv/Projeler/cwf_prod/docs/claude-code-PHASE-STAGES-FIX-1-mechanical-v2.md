# CWF — PHASE STAGES-FIX-1 — StagesDashboard v1 mechanical fixes (Wave 1)
**claude-code-PHASE-STAGES-FIX-1-mechanical-v2 · v2 · 2026-07-11 · Architect: Claude**

> **WHY v2 (supersedes v1):** AG correctly flagged that a true F9 in-panel viewer is NOT a
> today-mechanical fix — the `codePath` files live under `api/**` / `shared/**` (shipped to
> the serverless fn, absent from the client bundle and from `public/`), so serving them
> in-panel needs either a new source-serving server endpoint (a fresh security surface:
> RLS + path-traversal guard + an allowlist of servable files) or an authenticated raw
> fetch that breaks on a private repo. Both violate Wave 1's "no new API, ships today".
> **Architect decision: F9 in Wave 1 = the GOVERNED ON/OFF TOGGLE + private-repo auto-off
> (AG option 2). The real in-panel viewer moves to WAVE 2**, alongside the User-Docs bridge
> (they can share the same source-serving endpoint). F10 (copy-span-name) and F5 (back
> affordance) are UNCHANGED from v1. This is the only delta.

---

## 0 · MISSION

Fix the **mechanical** defects found in the live walkthrough of the merged StagesDashboard
(floor `b8db75e`). This is WAVE 1 — the layout/nav/link fixes that are independent of the
stage content. The CONTENT rewrite + User-Docs bridge (F13–F19, F7/F8/F17/F18 copy) is a
SEPARATE later phase (WAVE 2) — do NOT touch registry prose or write onboarding copy here.

Eight findings, grouped:
- **F4** shell scroll trap · **F5** back-nav (pushState + popstate + "← Aşamalar'a dön" strip)
- **F10** Langfuse chip → copy-span-name (self-hosted has no filter-URL) · **F6/F12** legend
- **F9** ‹/› in-panel read-only code viewer (replace the GitHub blob jump)
- **F1/F2** Replay-Quota User column (email/name join + orphan-row honesty)

Owner-approved decisions (already made — implement, don't re-litigate):
- **F9 → in-panel viewer** (NOT GitHub links). **F10 → copy-span-name button** (NOT a link).
- **F5 → `pushState` + a "← Aşamalar'a dön" strip** shown only when arriving from Stages.

---

## 1 · HARD PRE-FLIGHT (gate 0 — STOP on mismatch)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master
```
- MUST print `b8db75e2cf2c65ea9446444ca954b27831a58a7f`. If master moved, STOP and report.
- `npm ci --no-audit --no-fund --silent`; full suite green at floor (**1992 / 190**, shard
  `--shard=1/2`+`2/2` if the time limit bites); drift gate `[OK]` (grep `package.json` for the
  invocation — S32-1, do not guess).
- Read before writing: `src/components/admin/AdminPanel.tsx` (nav + `navigateToTab` + `<main>`),
  `StagesTab.tsx`, `stagesLinks.ts`, `QuotaPanel.tsx`, `KindsTab.tsx` (its `<pre>` schema modal
  = the code-viewer precedent), `e2e/rule26-admin.spec.ts`.
- Branch `feature/stages-fix-1`. **Push, REPORT, do NOT merge** (Architect RULE-25 review →
  verbatim `--no-ff` merge message).

---

## 2 · BINDING CONSTRAINTS

- **C-1 · Wave-1 scope only.** NO registry prose edits, NO onboarding copy, NO User-Docs work.
  If a fix tempts you to "improve wording", stop — that's Wave 2.
- **C-2 · No new backend/DB, no new network call.** No migration, no new dependency, no
  eval-gate contact, and — per the v2 decision — NO new source-fetch (the in-panel viewer moved
  to Wave 2). If any fix seems to need a new API route, STOP and report rather than adding one.
- **C-3 · Diff scope.** Only `src/components/admin/**` + `e2e/**` + the living-doc/KB files the
  drift gate requires. Nothing under `api/**`, `shared/**`, `supabase/**`, `package.json` deps.
- **C-4 · Read-only preserved.** StagesTab still CHANGES nothing. The code viewer is read-only.
- **C-5 · Floors ratchet.** Suite ends > 1992; `tsc -b` + `typecheck:api` clean; every new
  behavior gets a test; RULE-26 still green; drift `[OK]`, docVersion bumps if a mapped area is
  touched (expect rev 69 → 70 only if the drift gate demands it — AdminPanel is likely mapped).

---

## 3 · GATED SUB-PHASES

### A · F4 — shell scroll trap
Root: `AdminPanel.tsx:258` `<main className="flex-1 min-h-0 overflow-hidden p-6">`. The
`overflow-hidden` traps every panel in its own box. Fix: let the main region scroll —
`overflow-y-auto` (keep `min-h-0` for the flex child to shrink correctly). **Audit every tab
that assumed the trap:** a panel that set its own `h-full overflow-y-auto` (e.g. StagesTab's
root `h-full overflow-y-auto`, iframe panels like Architecture at line ~290 `w-full h-full`)
must still fill and scroll correctly — no double scrollbars, no collapsed iframe. Test at 1280
& 1024 that the page scrolls to the last stage card AND that the Architecture iframe still
fills. Evidence: name the tabs you audited + how each behaves post-fix.

### B · F5 — back-nav (pushState + popstate + return strip)
1. `navigateToTab` (line 89): `replaceState` → **`pushState`** so browser back returns to the
   prior tab. Sidebar nav (`setTab`, line ~186) must ALSO write the URL (currently doesn't) —
   otherwise back is inconsistent. Factor the URL-write into one helper both call.
2. Add a **`popstate` listener** (in a `useEffect`) that re-derives `tab` from
   `resolveInitialTab(window.location.search)` so browser back/forward actually switches the
   rendered tab (today nothing re-reads the URL after mount). Clean up on unmount.
3. **"← Aşamalar'a dön" strip (F5 UX):** when the user arrived at a tab FROM Stages, show a
   thin strip at the top of the panel content: `← Aşamalar'a dön` / `← Back to Stages`,
   clicking it calls `navigateToTab('stages')`. Detect "arrived from Stages" WITHOUT new
   persistent state that could get stale: set a lightweight in-memory flag (React state at the
   AdminPanel level) when a StagesTab NavChip triggers the nav, cleared when the user navigates
   anywhere via the sidebar. Do NOT show it on a normal sidebar visit or a fresh `?tab=` load.
   Keep the existing bottom-left "Back to chat" button unchanged.
Tests: `resolveInitialTab` unchanged; a nav helper test (pushState called, URL has `?tab=`);
a popstate test (dispatch popstate → tab state follows the URL); the strip shows only after a
NavChip-origin nav and hides after a sidebar click.

### C · F10 — Langfuse chip becomes copy-span-name
[VERIFIED] Self-hosted Langfuse **v3.205 OSS** has no stable per-span filter URL (the Filter
Search Bar that serializes a filter into the URL is Langfuse **v4**, Cloud-only). So a
"filtered link" is a false promise. Change the chip:
- Chip is now a **button that copies the span name to the clipboard** (`navigator.clipboard
  .writeText(span)`), with a transient "kopyalandı ✓ / copied ✓" affordance.
- Keep the span name visible on the chip (as today).
- Add ONE small helper line at the top of the Langfuse-chip area OR in the legend:
  `Langfuse arama çubuğuna yapıştır (self-hosted'da span filtre-URL'i yok)` /
  `Paste into Langfuse's filter bar (self-hosted has no span filter-URL)`. Keep it short.
- Chips still only render when observability is configured AND the stage has spans (unchanged).
- Remove `buildSpanLink`'s use as an `href`; if you keep the function, repurpose/rename it or
  delete it — no dead generic `/traces` link. Update `stagesLinks.test.ts` accordingly.
Test: clicking a chip calls clipboard write with the exact span; chips absent when unconfigured.

### D · F6 + F12 — legend completeness
- **F6:** add the missing `📡` glyph to the legend array in `StagesTab.tsx`:
  `📡 canlı backend akışı` / `📡 live backend feed` (matches `KIND_GLYPH.live`).
- **F12:** add a color-key line so the violet vs primary NavChip distinction is explained:
  e.g. `mor çip = oturumluk deney yüzeyi (Ayarla)` / `violet chip = session experiment
  surface (Tweak)`. Keep it in the legend; one short entry.
Test: legend renders an entry containing `📡`; the color-key string is present.

### E · F9 — governed code-link toggle + private-repo auto-off (viewer deferred to Wave 2)
[DECISION] The real in-panel viewer is deferred (needs a source-serving endpoint — Wave 2).
For Wave 1, keep the ‹/› GitHub blob link but make it honest and controllable:
- **Governed on/off toggle (super-admin):** add a single boolean the super-admin can flip that
  hides/shows ALL ‹/› code links across the Stages page. Store it the SAME way other simple
  client-side admin display prefs are stored in this repo (grep for an existing pattern —
  e.g. a governed `agent.param`-style flag OR an existing UI-pref store; do NOT invent a new
  table/endpoint — if there is genuinely no existing home, use an in-memory + build-env default
  and FLAG that a durable governed home is a Wave-2 follow-up). Default ON when the repo is
  public, OFF when private (see below).
- **Private-repo auto-off:** the client cannot introspect repo visibility, so read a build-time
  env flag injected via Vite `define` — `__REPO_PUBLIC__` from `process.env.VITE_REPO_PUBLIC`
  (default `'true'` when unset, to preserve today's behavior on the current public repo). When
  `__REPO_PUBLIC__ === 'false'`, code links are auto-hidden regardless of the toggle (a private
  repo blob 404s for panel users — hiding is the honest default), and the toggle explains why
  it's disabled.
- Keep the existing `<sha>` pin + the `master` fallback label on the link when shown (carry the
  C-8 promise). No new dependency.
- Leave a short code comment at `CodeLinkGlyph` pointing to the Wave-2 in-panel viewer as the
  eventual replacement, so the follow-up is discoverable.
Tests: toggle hides/shows the ‹/› links; `__REPO_PUBLIC__='false'` hides them irrespective of
the toggle; the link (when shown) still targets the SHA-pinned blob URL.

### F · F1 + F2 — Replay-Quota User column
Root: `QuotaPanel.tsx:244` renders only `r.userId`.
- **F1:** show the user's **email (or display-name), UUID as secondary/tooltip**. The Users
  panel already fetches emails — reuse the same admin read (`adminService`), joining on userId.
  If the email map isn't readily available in this panel's data path, add the minimal read that
  Users already uses (no NEW endpoint — reuse the existing one). Fallback to the UUID when no
  email exists.
- **F2:** a ledger row with an empty/absent userId but real usage is an ORPHAN (deleted
  `auth.user`, surviving `user_quotas`). Do NOT hide the value (empty≠zero — the usage is real
  data). Render the identity honestly: `(silinmiş kullanıcı)` / `(deleted user)` with the UUID
  if present, and keep the usage numbers visible. Add a test with a fixture row that has usage
  but no email/identity → asserts the "deleted user" label AND the usage still shows.

## 4 · REPORT FORMAT (paste literally)

1. `git rev-parse origin/master` start + branch tip.
2. Full-suite line(s) at floor AND finish (must exceed 1992).
3. `git diff --stat b8db75e..HEAD` (must satisfy C-3).
4. Per sub-phase A–F: the fix + its test name(s) + evidence line.
5. F4: the list of tabs you audited for the scroll change + each one's post-fix behavior.
6. F9: confirm the governed toggle hides/shows all ‹/› links; confirm `__REPO_PUBLIC__='false'`
   force-hides them; state where the toggle's value is stored (existing home, or the flagged
   in-memory+env default) and confirm the real in-panel viewer is DEFERRED to Wave 2.
7. F10: confirm no dead `/traces` link remains; the clipboard behavior.
8. docVersion + drift `[OK]`; any INTENDED test edits listed; any deviation flagged at top.

*Architect will fresh-clone review (RULE-25), probe the F5 back-nav and F9 error path
independently, then issue the verbatim `--no-ff` merge message.*

<!-- END · claude-code-PHASE-STAGES-FIX-1-mechanical-v2 · v1 · 2026-07-11 -->
