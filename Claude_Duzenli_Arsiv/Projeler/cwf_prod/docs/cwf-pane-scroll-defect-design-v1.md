# CWF — Admin pane-scroll defect (F151) · design note v1
**cwf-pane-scroll-defect-design-v1 · rev 1 · 2026-07-21 · Architect: Claude**

> PLATINUM statement: the fix is a shared layout primitive applied by
> construction across panels — no per-panel manual tuning, no owner steps; the
> admin shell scrolls like any modern web app out of the box.

## 1 · THE FINDING (F151 — confirmed with rendered evidence, RULE-26 satisfied)
Owner walkthrough 2026-07-21, screenshot at floor `49ea01d`, **Rules tab**
(reproduces on EVERY tab). Symptom: the right content pane cannot be scrolled as
a whole. The large explanatory cards at the top (PanelPrimer + the backend
"hero" card) sit fixed, eating vertical space; the owner must MANUALLY collapse
the primer to see the rule list, and even then only the small inner boxes scroll
internally. The owner's mental model is the correct one: "GitHub'da böyle,
Vercel'de böyle — the main content pane scrolls as one; inner boxes may ALSO
scroll, but the pane itself must scroll too."

## 2 · ROOT CAUSE (tree-verified at `49ea01d`, S54-1)
F4 (STAGES-FIX-1) correctly made the shell `<main>` `overflow-y-auto`
(`AdminPanel.tsx:383`). But every panel root pins itself to `h-full`
(`GovernanceTab.tsx:547`, `InspectTab.tsx:275`, `UsersTab.tsx:94`,
`QuotaPanel.tsx:255`, `BackendTrustPanel.tsx:280`, …). `h-full` forces the panel
to exactly `<main>`'s height, so main NEVER overflows and its `overflow-y-auto`
can never engage — the overflow is pushed DOWN into nested `flex-1 min-h-0`
ScrollAreas (e.g. `GovernanceTab.tsx:785/831/902/1072`). Result: fixed top
cards + trapped inner scroll. **F4 fixed the shell; the panels re-trap below it.**
This is why the F4-complete claim was complacent — F151 supersedes that comfort.

RULE-26 does not catch this: the no-scroll-trap guard asserts HORIZONTAL
non-clipping at 1280/1024; it says nothing about vertical inner-scroll traps.
(A guard extension is proposed in §6.)

## 3 · THE HARD CONSTRAINT (G3 allowlist — must survive)
`ProvidersTab` and `RoutingTab` render via **`VSplit`** — a DELIBERATE
fixed-viewport master-detail layout, ALLOWLISTED under the **G3 SCOPE RULING**
(PANEL-RESIZE-1, `f1c40d8`, "RULE 26 by construction"). A blanket "drop h-full
everywhere, let the page flow" would DESTROY these intentional layouts (list and
detail would stop being independently scrollable; long lists would push detail
off-screen). Any fix MUST leave VSplit panels untouched. `StagesTab` already
uses the target pattern correctly (`h-full overflow-y-auto` — the pane itself
scrolls, with scroll-restore via `navScroll`); it is the reference, not a
target.

## 4 · COMMITTED RECOMMENDATION (single path — not a menu)
**Two-tier scroll, applied via a shared `PanelScroll` wrapper:**

1. **Non-split panels** (Governance, Users, Inspect, Quota, BackendTrust,
   Rollout, MCP, Tweak, Replay) adopt document-flow scroll: the panel root drops
   `h-full`, wraps its content in a shared `PanelScroll` (`flex-1 min-h-0
   overflow-y-auto` living at the panel-root level, so the PANE scrolls). The top
   primer + hero cards become normal-flow blocks that **scroll away** with the
   pane — no manual collapse required to reach content. Inner boxes may keep
   their own overflow for genuinely long sub-lists, but they no longer TRAP the
   pane (the pane scroll is the primary axis, inner scroll is the exception).
2. **VSplit panels** (Providers, Routing) stay EXACTLY as they are — G3
   allowlisted. The ONLY change: their top primer/hero, if any sits above the
   split, is moved into a normal-flow header ABOVE the bounded split region so it
   scrolls away, while the split itself keeps its fixed-viewport independent
   panes. (Verify per-panel; may be a no-op if their primers already sit inside
   the split.)
3. **StagesTab** untouched (already correct; scroll-restore coupling preserved).

Net effect = the GitHub/Vercel model the owner asked for: the right pane scrolls
as one; heavy explanatory cards scroll away; deliberate master-detail layouts
survive.

## 5 · WHY NOT the alternatives (named, per honesty)
- *Blanket document-flow everywhere* → breaks G3 VSplit. Rejected.
- *Just auto-collapse the primer by default* → treats the symptom (space), not
  the cause (pane can't scroll); the rule list would still be a trapped inner
  box. Rejected.
- *Make every panel a VSplit* → over-applies a heavy master-detail pattern to
  simple list panels; worse UX, more code. Rejected.

## 6 · GUARD EXTENSION (so F151 can't silently return)
The phase adds a headless assertion (RULE-26 sibling): at 1280×800 and 1024×768,
for each non-VSplit panel, `mainRegion.scrollHeight > mainRegion.clientHeight`
when content is tall (i.e. the PANE is the scroll container, not a nested box),
AND the primer card's top is reachable by scrolling. VSplit panels are
explicitly allowlisted in this assertion exactly as they are in the horizontal
no-scroll-trap guard. Red→Green proof mandatory (guard fails on the current tree
first).

## 7 · SEQUENCING / LANES
- This is Architect design work authored in parallel while AG-A (FLAKE-SWEEP-1,
  `src/**/*.test.tsx`) and AG-B (OBS-TRACE-2b, `persistence/**`) run. **Surface
  overlap:** FLAKE-SWEEP-1 touches admin TEST files; this phase touches admin
  COMPONENT files + adds its own tests. To avoid an S47-1 collision, this phase
  is authored but **held until FLAKE-SWEEP-1 merges** (or is explicitly assigned
  to the same agent as a follow-on), so the two never edit overlapping admin test
  files concurrently. Owner decides ordering.
- Profile: **FULL** (multi-file client layout + a new guard) — not FAST-GATE.
- Register: F151 to be entered in the next register version (v58) with this note
  as its last-full-wording pointer. It does NOT reopen F4 (F4's shell fix stays);
  F151 is the panel-layer sibling.

## 8 · OWNER DECISION NEEDED (one question)
Ordering only — the technical path above is committed. Do we (a) hold F151 until
FLAKE-SWEEP-1 merges then run it as its own FULL phase, or (b) fold F151 into the
BOARD-WALK re-walk wave (it is a legibility/layout item that touches the same
panels)? Recommendation: (a) — it's a clean, self-contained layout phase and the
owner is clearly blocked by it daily; don't defer it into a batch.

<!-- END · cwf-pane-scroll-defect-design-v1 · rev 1 · 2026-07-21 -->
