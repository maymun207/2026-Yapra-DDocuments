# CWF — PHASE STAGES-FIX-2 — StagesDashboard scroll-restore hotfix
**claude-code-PHASE-STAGES-FIX-2-scroll-restore-v1 · v1 · 2026-07-11 · Architect: Claude**

---

## 0 · MISSION (one bug, small, mechanical)

When the user deep-links out of a stage card (e.g. 03 → Routing) and returns via the
"← Aşamalar'a dön" strip OR the browser Back button, **StagesTab must return them to the
card they left from — not to the top (stage 00).** Today StagesTab is conditionally
rendered (`AdminPanel.tsx:293` `tab === 'stages' && <StagesTab…>`), so a tab switch
UNMOUNTS it; on return it remounts and its `overflow-y-auto` container (`StagesTab.tsx:280`)
resets `scrollTop` to 0. There is no scroll save/restore anywhere. Fix that.

This is the missing half of F5. Client-only, one component + its parent + a test.

---

## 1 · HARD PRE-FLIGHT (gate 0 — STOP on mismatch)

```bash
cd /tmp && rm -rf cwf_yaprak && git clone --quiet https://github.com/maymun207/cwf_yaprak.git
cd cwf_yaprak && git rev-parse origin/master
```
- MUST print `5fff42da3f48a371aa8c33d89554f9e2017af461` (the STAGES-FIX-1 tip). If master moved,
  STOP and report.
- `npm ci --no-audit --no-fund --silent`; full suite green at floor (**2008 / 193**; shard
  `--shard=1/2`+`2/2` if the time limit bites); drift `[OK]` (grep `package.json` for the
  invocation — S32-1).
- Read: `src/components/admin/AdminPanel.tsx` (the `navigateFromStages` wrapper + the
  conditional `tab === 'stages'` render + `useTabNavigation`), `src/components/admin/StagesTab.tsx`
  (root `overflow-y-auto` container at ~280, the `StageCard` node, `NavChip`).
- Branch `feature/stages-fix-2`. **Push, REPORT, do NOT merge.**

---

## 2 · BINDING CONSTRAINTS

- **C-1 · Scope.** Only `src/components/admin/**` (StagesTab + AdminPanel + a test) + the
  living-doc/KB files the drift gate requires. Nothing under `api/**`, `shared/**`,
  `supabase/**`, `package.json`. No new dependency. No `vite.config` change.
- **C-2 · Read-only preserved.** StagesTab still CHANGES nothing; this only restores scroll.
- **C-3 · No browser storage.** Do NOT use `sessionStorage`/`localStorage`. Keep the
  "which card did I leave from" memory in React state/ref at the AdminPanel level (survives
  the StagesTab unmount because AdminPanel stays mounted). This mirrors how `arrivedFromStages`
  already lives in `useTabNavigation`, not in storage.
- **C-4 · Floors ratchet.** Suite > 2008; `tsc -b` + `typecheck:api` clean; RULE-26 still
  green; drift `[OK]`, docVersion unchanged unless a mapped area is touched (it won't be).

---

## 3 · IMPLEMENTATION (committed design — the `scrollIntoView`-by-card approach)

Prefer targeting the ORIGINATING CARD by id over restoring a raw pixel `scrollTop` — it is
robust to layout/height changes (expanded "… daha fazla", wrapped rows) and lands the user on
the exact card they left.

1. **Give each card a stable DOM id.** In `StagesTab.StageCard`, add `id={`stage-${stage.id}`}`
   to the card's `<li>` root (the spine item). `stage.id` is already the React key — reuse it.
2. **Remember the origin card at the AdminPanel level.** Add a `lastStageCardId` ref/state in
   AdminPanel (NOT in StagesTab — it must survive StagesTab's unmount). `navigateFromStages`
   already wraps the Stages→tab jump; thread the originating `stage.id` through it: NavChip's
   `onNavigate` should pass the card id alongside the target tab, OR the StageCard sets it via a
   callback just before navigating. Pick the smaller diff; keep the discriminated-union `tab`
   narrowing intact (don't break the C-5 type-safety from UI-STAGES-1).
3. **Restore on remount.** Pass `initialScrollToCardId={lastStageCardId}` (or equivalent) into
   StagesTab. On mount, in a `useLayoutEffect`, if the prop is set, call
   `document.getElementById(`stage-${id}`)?.scrollIntoView({ block: 'start' })` (instant, not
   smooth — a jump, not an animation, so it feels like "returning to where I was"). Use
   `useLayoutEffect` (not `useEffect`) so the scroll happens before paint (no visible flash of
   the top). Guard for the element being absent.
4. **Clear the memory correctly.** The restore-target should apply ONLY when returning to
   Stages from a deep-link jump — NOT on a fresh sidebar click to Stages, NOT on a `?tab=stages`
   cold load (those should land at the top, stage 00). Tie it to the same `arrivedFromStages`
   signal that gates the return strip: if the user reaches Stages any other way, ignore/clear
   `lastStageCardId`. After a successful restore, it's fine to keep or clear it — just ensure a
   subsequent plain sidebar visit to Stages starts at the top.

### Edge cases to honor
- Browser **Back** (popstate) must restore too, not just the strip button — both routes end at
  `tab === 'stages'`, so if the restore keys off "arrived at Stages with a remembered origin
  card", both work. Verify the popstate path.
- A plain **sidebar → Stages** click starts at stage 00 (top). Assert this.
- If the remembered card id no longer exists (shouldn't happen — registry is static), the
  `?.` guard makes it a no-op (top). Fine.

---

## 4 · TESTS

- **Unit/RTL (jsdom):** jsdom doesn't lay out real scroll, so assert the MECHANISM, not pixels:
  render StagesTab with `initialScrollToCardId='intent'` (stage 03's id) → assert
  `scrollIntoView` was called on the element with `id="stage-intent"` (spy on
  `HTMLElement.prototype.scrollIntoView`). Render with no prop → assert it was NOT called
  (fresh load stays at top). Render with a bogus id → no throw (the `?.` guard).
- **AdminPanel integration (RTL):** simulate a NavChip nav from a known card, then a return
  (strip click and/or popstate) → assert the origin card id was remembered and handed to
  StagesTab; simulate a plain sidebar→Stages → assert NO restore target.
- Keep RULE-26 e2e untouched and green.

---

## 5 · REPORT (paste literally)

1. `git rev-parse origin/master` start + branch tip.
2. Suite at floor AND finish (must exceed 2008).
3. `git diff --stat 5fff42d..HEAD` (must satisfy C-1).
4. The mechanism: how the origin card id is remembered across the unmount, how it's restored
   (`useLayoutEffect` + `scrollIntoView`), and how it's gated to deep-link returns only.
5. Test names + the three unit assertions (restore called / not-called-on-fresh / bogus-safe).
6. Confirm: sidebar→Stages starts at top; browser Back also restores; no browser storage used.
7. Any deviation flagged at the top; docVersion + drift `[OK]`.

*Architect will fresh-clone review (RULE-25) — independently probing the fresh-load-starts-at-top
and the Back-restores paths — then issue the verbatim `--no-ff` merge message.*

<!-- END · claude-code-PHASE-STAGES-FIX-2-scroll-restore-v1 · v1 · 2026-07-11 -->
