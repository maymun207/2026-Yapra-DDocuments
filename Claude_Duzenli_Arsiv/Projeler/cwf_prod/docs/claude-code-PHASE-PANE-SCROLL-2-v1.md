# PHASE PANE-SCROLL-2 — kill the monoblock everywhere + comprehensive guard (F151 finish)
**claude-code-PHASE-PANE-SCROLL-2-v1 · rev 1 · 2026-07-21 · Architect: Claude · Executor: AG**
G3 SCOPE RULING reversal — owner-legislated: the VSplit allowlist was wrong for
the owner's intent; the whole-pane-scroll model applies to EVERY panel.

> PLATINUM statement: after this phase all 12 non-Stages panels self-scroll by
> the ONE shared primitive AND the guard covers all 12 by construction — no
> per-panel tuning, no disclosed-blind gaps, no owner steps.

## §P · PRECONDITION (S47-1, self-checking) + ISOLATED WORKDIR (S56-1)
Valid ONLY while `origin/master`'s TIP is the **HOTFIX F152 merge commit**.
Re-derive fresh — do NOT trust a literal hash:
```bash
cd /tmp && rm -rf ps2-$$  && git clone --quiet https://github.com/maymun207/cwf_yaprak ps2-$$ && cd ps2-$$
git rev-parse origin/master
git log -1 --format=%s origin/master   # MUST contain "HOTFIX F152"
```
If the tip is NOT the F152 merge, STOP and report actual state. Use a UNIQUE
workdir you own (S56-1 — never a shared `/tmp/cwf_yaprak`). Grep test/build
commands from `package.json` (S32-1). Branch: `pane-scroll-2`. No other PR may
touch `src/components/admin/**` or `e2e/**` concurrently.

## §1 · WHY (owner-legislated G3 reversal + the guard-blind debt)
1. **Monoblock still alive in Providers.** `ProvidersTab` uses `VSplit`
   (`ProvidersTab.tsx:180`) — a draggable fixed-viewport two-pane budget
   (`VSplit.tsx`: "the CHILD owns its own internal scroll, this component only
   owns the budget"). Its `h-full` root (`:162`) + two `h-full min-h-0
   overflow-*` panes = the exact monoblock the owner rejected: the primer sits
   fixed and eats space, the list + table each trap-scroll internally, the pane
   cannot scroll as one. PANE-SCROLL-1 excluded VSplit under the G3 SCOPE RULING
   ("deliberate fixed-viewport layout"). **The owner has OVERRIDDEN that ruling:
   the whole-pane-scroll model (GitHub/Vercel) applies everywhere; VSplit is the
   monoblock, not a protected design.**
2. **RoutingTab** no longer uses VSplit (TOOLMATCH-IA-1 dropped it — single-column
   modes) but its root still pins `h-full min-h-0` (`RoutingTab.tsx:453`) → same
   primer-eats-space trap.
3. **Guard-blind debt.** Trust / MCP / Tweak / QuotaAnalytics (PANE-SCROLL-1) +
   Rollout (F152) carry the `PanelScroll` wrapper but are NOT e2e-covered
   (`/dev/admin-preview?tab=` does not render them — the seam never seeds them).
   Close it so the guard covers ALL 12 non-Stages panels.

## §2 · BINDING CONSTRAINTS
1. **One primitive.** Every non-Stages panel root uses the existing `PanelScroll`
   (`min-h-full`) — including Providers and Routing after this phase. No bespoke
   per-panel overflow CSS.
2. **StagesTab untouched** (reference pattern, its own bounded self-scroll +
   navScroll). `AdminPanel.tsx`'s `<main>` untouched (already correct).
3. **No content/logic/data change** — layout + dev-harness seeding + guard only.
   Provider list/table rows, routing modes, all copy: byte-identical behavior.
4. **VSplit is DEAD after this** (its only consumer, ProvidersTab, stops using
   it — RoutingTab already dropped it). Verify by grep that NOTHING else imports
   `VSplit` before deleting; if anything does, STOP and report instead of forcing.

## §3 · PART A — kill the monoblock (Providers + Routing)
- **ProvidersTab:** wrap the root in `PanelScroll` (drop `h-full`, keep
  `max-w-5xl`). REPLACE the `<VSplit top={…} bottom={…}>` with the two children
  stacked as normal document-flow sections (provider toggle list, then the
  table) — each flows at natural height; the PANE scrolls; the primer scrolls
  away. Remove the `h-full min-h-0 overflow-*` wrappers on those two children
  (they were the VSplit panes' internal-scroll traps). Remove the `VSplit`
  import.
- **RoutingTab:** wrap the root in `PanelScroll` (drop `h-full min-h-0`). The
  per-mode body may keep its own bounded region (like Governance's master-detail)
  — the requirement is only that the PANE scrolls and the primer scrolls away.
- **Delete `VSplit.tsx` and its unit test file(s)** (they test now-deleted code —
  a legitimate removal, not a coverage regression; state the removed test count
  in the report). If a `vsplit`-named e2e/integration test exists, delete/adjust
  it too.

## §4 · PART B — dev-preview seam + comprehensive guard
- **AdminPreview.tsx:** add deterministic, DEV-ONLY, tree-shaken stubs (same
  pattern as the existing `getRollout` / quota stubs) so `?tab=providers`,
  `?tab=trust`, `?tab=mcp` (or its real tab id), `?tab=tweak`,
  `?tab=quota-analytics` (real id) each render their panel + primer with
  representative content. Grep the real tab ids from `adminTabs.ts` (S32-1) — do
  not guess.
- **`e2e/pane-scroll-admin.spec.ts`:** the `PANELS` array becomes ALL 12
  non-Stages panels (add back Rollout, add Trust/MCP/Tweak/QuotaAnalytics, add
  the now-flowing Providers + Routing). REMOVE the disclosed guard-blind comment
  (it must be EMPTY now — every panel reachable). Keep the
  `waitUntil:'domcontentloaded'` + explicit `waitFor` timeout from F152.
- **`e2e/rule26-admin.spec.ts` (horizontal guard):** remove the now-dead
  `[data-testid^="vsplit-top-"], [data-testid^="vsplit-bottom-"]` allowlist entry
  (VSplit deleted). Keep the `routing-mode-*` entry (still a valid bounded mode
  body). The horizontal no-clip assertion must still pass for the reworked
  Providers/Routing.

## §5 · GATED SUB-PHASES
- **G1 — Part A layout** (Providers de-VSplit + Routing wrapper + VSplit delete).
- **G2 — Part B seam + guard** (seed panels; guard = all 12; blind comment empty;
  horizontal allowlist cleaned).
- **G3 — RED→GREEN proof (mandatory).** Capture the vertical guard FAILING on the
  pre-Part-B tree for Providers (still pinned/VSplit) and for the newly-seeded
  panels, then GREEN after Part A+B. All 12 panels assert pane-grows. Horizontal
  rule26 still green for Providers/Routing. Paste RED and GREEN.
- **G4 — full suite + CI.** Full unsharded local pass; push; open PR. Update any
  ProvidersTab/RoutingTab test that asserted the old VSplit/h-full DOM to the new
  structure WITHOUT dropping assertions (state each). S37-2: FULL unsharded CI
  green on the PR head (the WHOLE rule26 job, no rerun — S55-1/S56-2) is the
  merge precondition.

## §6 · SELF-VERIFY CHECKLIST (evidence, literal)
- [ ] `git grep VSplit` on the final tree returns NOTHING (component + all
      references gone); removed-test count stated.
- [ ] `PanelScroll` on all 12 non-Stages panel roots (grep list). StagesTab +
      `<main>` untouched (grep-proven zero hunks).
- [ ] Vertical guard `PANELS` = all 12; disclosed-blind comment EMPTY; RED→GREEN
      pasted (Providers + newly-seeded panels fail pre-fix, all green post-fix).
- [ ] Horizontal rule26 guard: `vsplit-*` allowlist entry removed; Providers +
      Routing pass the horizontal no-clip assertion; green.
- [ ] AdminPreview seeds the 5 newly-covered panels via `?tab=` (real ids grep'd
      from `adminTabs.ts`); DEV-ONLY / tree-shaken (grep-prove no prod import).
- [ ] Rendered evidence (RULE-26): Providers now whole-pane-scrolls, primer
      scrolls away, no draggable divider.
- [ ] Full unsharded CI green on the PR head, rule26 whole-job, NO rerun.
- [ ] Doc-drift reseal budgeted if the manifest maps any touched .tsx (S34-1);
      state rev bump. VSplit deletion may touch a mapped file — check.
- [ ] Report cites the real merge-base from a fresh `git rev-parse` (S54-1) and
      confirms the tip was the F152 merge (§P).

## §7 · WHAT YOU DO NOT DO
No merge (Architect FULL review → verbatim merge message, S30-2). No StagesTab /
`<main>` change. No content/logic/data change. No migration. No golden runs
(FREEZE). No `retries`, no sleeps. No shared workdir. No CI rerun — root-cause or
report (S55-1).

<!-- END · claude-code-PHASE-PANE-SCROLL-2-v1 · rev 1 · 2026-07-21 -->
