# PHASE PANE-SCROLL-1 — whole-pane scroll for admin panels (F151)
**claude-code-PHASE-PANE-SCROLL-1-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG-B**
Design basis: `cwf-pane-scroll-defect-design-v1` (owner-approved, option a).

> PLATINUM statement: the fix is ONE shared scroll primitive applied by
> construction across non-split panels — the admin pane scrolls like any modern
> web app with zero per-panel manual tuning and zero owner steps. A future panel
> that re-pins `h-full` and re-traps scroll fails the guard, so the property
> holds without anyone re-checking.

---

## §P · PRECONDITION (S47-1 — verify BEFORE touching anything)
Valid ONLY while `origin/master == 31d456e83643da4f3f00f50505660927d0859719`
(docVersion rev 127) and NO other PR is open against `src/components/admin/**`.
On mismatch: **STOP and report actual state.**

**ISOLATED-WORKDIR MANDATE (S56-1, born this session):** do NOT use a shared
`/tmp/<reponame>` path. Clone into a UNIQUE directory you own for this phase
only (e.g. `/tmp/pane-scroll-<rand>`). The FLAKE-SWEEP-1 incident (two lanes
sharing `/tmp/cwf_yaprak`, checkouts interleaved) must not recur.

```bash
cd /tmp && rm -rf pane-scroll-1 && git clone --quiet https://github.com/maymun207/cwf_yaprak pane-scroll-1 && cd pane-scroll-1
git rev-parse origin/master   # must print 31d456e83643da4f3f00f50505660927d0859719
```
Grep all test/build commands from `package.json` (S32-1). Branch: `pane-scroll-1`.

## §1 · WHY (confirmed with rendered evidence — RULE-26 satisfied)
Owner walkthrough at `49ea01d`/`31d456e` (Rules tab, reproduces on every tab):
the right content pane cannot be scrolled as a whole. The large explanatory
cards at top (PanelPrimer + backend hero) sit fixed and eat vertical space; the
owner must manually collapse the primer to reach the list, and even then only
small inner boxes scroll. Root cause (tree-verified): F4 (STAGES-FIX-1) made the
shell `<main>` `overflow-y-auto` (`AdminPanel.tsx:383`), but every panel root
pins `h-full`, so `<main>` never overflows and its scroll can never engage —
overflow is trapped in nested `flex-1 min-h-0` ScrollAreas. **F4 fixed the
shell; the panels re-trap below it.** Target behavior (owner's own model,
GitHub/Vercel): the pane scrolls as one; heavy cards scroll away; inner boxes
may ALSO scroll but must not be the ONLY axis.

## §2 · THE HARD CONSTRAINT (G3 allowlist — DO NOT TOUCH)
`ProvidersTab` and `RoutingTab` render via **`VSplit`** — a DELIBERATE
fixed-viewport master-detail layout, ALLOWLISTED under the G3 SCOPE RULING
(PANEL-RESIZE-1, "RULE 26 by construction"). Leave both EXACTLY as they are.
`StagesTab` already uses the target pattern (`h-full overflow-y-auto`, pane
scrolls with `navScroll` scroll-restore) — it is the REFERENCE, untouched.

## §3 · BINDING CONSTRAINTS
1. **Two panel classes — classify each non-VSplit panel first (G1), then apply
   the matching treatment:**
   - **(A) Simple-flow panels** (no internal master-detail split): the pane
     itself scrolls. Drop `h-full` from the root; the content flows and `<main>`
     (already `overflow-y-auto`) becomes the scroll container, OR wrap the root
     content in a shared `PanelScroll` (`flex-1 min-h-0 overflow-y-auto`) if the
     panel needs its own bounded scroll region. Primer + hero become normal-flow
     blocks that SCROLL AWAY. Confirmed members: `UsersTab`, `InspectTab`,
     `QuotaPanel`, `BackendTrustPanel`, `RolloutTab`, `MCPSettingsTab`,
     `TweakTab`, `QuotaAnalyticsTab`, `ReplayTab`. (MCPSettings/ReplayTab already
     carry root overflow but stay `h-full`-capped — normalize them to the same
     primitive.)
   - **(B) Internal-split panels** (`GovernanceTab` — left rule list + right
     detail via inner ScrollAreas at ~785/831/902/1072): primer + hero + the
     tab/filter controls become normal-flow blocks that SCROLL AWAY; the
     master-detail SPLIT region below is bounded (fills the remaining viewport)
     so its existing inner ScrollAreas keep working independently. Do NOT
     document-flow the split itself (that would destroy independent list/detail
     scroll). Do NOT convert Governance into a VSplit.
2. **One shared primitive.** Introduce a single `PanelScroll` component (or a
   single shared className constant) — do not hand-write bespoke overflow CSS
   per panel. This is what makes the guard meaningful and the property hold by
   construction.
3. **Do not touch:** `ProvidersTab`, `RoutingTab`, `VSplit.tsx`, `StagesTab`,
   `AdminPanel.tsx`'s `<main>` (its `overflow-y-auto` is already correct — do
   not double-wrap), any `api/**`/`shared/**`/migration file.
4. **No content/behavior change** — only layout/scroll containers. No copy
   edits, no primer collapse-default changes (the primer already has
   collapse/expand from STAGES-FIX-3; leave its default). Assertion counts in
   touched tests ≥ before.
5. RULE-26 horizontal no-scroll-trap assertion must still pass unchanged; the new
   vertical guard (§5) is additive.

## §4 · GATED SUB-PHASES
- **G1 — classify + audit.** For every non-VSplit admin panel, produce a table:
  `panel · class (A simple-flow / B internal-split) · current root class · has
  internal ScrollArea? · treatment`. State the reason for each class. This is
  the load-bearing judgment step — do not skip to edits.
- **G2 — implement** the shared `PanelScroll` primitive + apply per §3. VSplit
  panels and StagesTab appear in NO diff hunk.
- **G3 — RED→GREEN guard proof (mandatory, RULE-26 sibling).** Add a headless
  layout assertion (same harness family as the existing RULE-26 no-scroll-trap
  test / rule26 CI job): render each non-VSplit panel with tall content at
  1280×800 and 1024×768 and assert the PANE is the scroll container (the panel's
  scroll root has `scrollHeight > clientHeight` and the primer's top is reachable
  by scrolling to top) — NOT a nested inner box as the sole axis. VSplit panels
  (Providers, Routing) are EXPLICITLY allowlisted in this assertion exactly as in
  the horizontal guard, with a one-line justification. Capture the guard FAILING
  on the pre-change tree (Governance/Users/etc. trap scroll) then GREEN after.
  A guard green from the start is worthless.
- **G4 — full suite + CI.** Full unsharded local pass; push branch; open PR.
  S37-2: unsharded CI green on the PR head is the merge precondition. If existing
  admin panel tests assert on `h-full` DOM structure, update them to the new
  structure WITHOUT dropping assertions (state each change in the report).

## §5 · SELF-VERIFY CHECKLIST (evidence, literal)
- [ ] G1 classification table pasted in full (every non-VSplit panel, class +
      reason).
- [ ] G2: single shared `PanelScroll` primitive introduced; grep proof it is the
      only new scroll-container mechanism (no bespoke per-panel overflow CSS).
- [ ] `git diff --name-only origin/master..HEAD` pasted; `ProvidersTab.tsx`,
      `RoutingTab.tsx`, `VSplit.tsx`, `StagesTab.tsx`, `AdminPanel.tsx`'s `<main>`
      appear in ZERO hunks (grep-proven).
- [ ] G3 guard: RED output on pre-change tree pasted; GREEN post-change;
      horizontal RULE-26 guard still green; VSplit allowlist entry shown.
- [ ] Rendered evidence (RULE-26): a screenshot or headless-measured proof that
      Governance's pane now scrolls and the primer scrolls away.
- [ ] Touched-test assertion counts ≥ baseline (table).
- [ ] Full unsharded CI green link on the PR head.
- [ ] Doc-drift reseal budgeted if the manifest maps any touched .tsx (S34-1);
      state rev bump.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1).
- [ ] ISOLATED workdir used (unique path), per S56-1 — stated in the report.

## §6 · WHAT YOU DO NOT DO
No merge (Architect reviews — FULL profile: multi-file client layout + new guard
— then authors the verbatim merge message, S30-2). No touching VSplit panels /
StagesTab / `<main>`. No content edits. No migrations. No golden runs (FREEZE).
No shared `/tmp/cwf_yaprak` (S56-1).

<!-- END · claude-code-PHASE-PANE-SCROLL-1-v1 · rev 1 · 2026-07-21 -->
