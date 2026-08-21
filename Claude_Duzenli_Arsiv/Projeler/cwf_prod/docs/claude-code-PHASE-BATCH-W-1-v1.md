# PHASE BATCH-W-1 — The Walkthrough Dozen (W-1..W-12)
<!-- claude-code-PHASE-BATCH-W-1-v1 · rev 1 · 2026-07-20 · Architect: Claude
     Anchor: origin/master = e1218bad98615a7c0ff5c978908756971d52771f
     PRECONDITION (S47-1): valid ONLY while origin/master == e1218ba and no
     other BATCH-W branch exists. On mismatch: STOP and report actual state.
     Ceremony: FULL profile (multi-file, touches api/cwf/_lib/replay/**).
     CI-green on the PR head = merge precondition (S37-2). Zero migrations ·
     zero Operator · zero golden exposure (no prompt.segment touched).
     PLATINUM compliance: every fix here is self-configuring — no step in this
     phase creates a manual owner ritual; the W-5 fix specifically REMOVES a
     silent manual-refresh dependency. -->

## §0 · PRE-FLIGHT GATE (hard, all must pass before any edit)
```bash
cd <workspace> && git fetch origin && git rev-parse origin/master
# MUST print e1218bad98615a7c0ff5c978908756971d52771f — else STOP, report.
git checkout -b batch-w-1 origin/master
```
S32-1 discipline (commands grep-verified from `package.json` by the Architect
on the anchor tree — do not substitute):
- Tests: `npm test` (= `vitest run`; CI runs it UNSHARDED — sharded local
  greens are advisory only, S37-2)
- Typecheck: `npm run typecheck:api` · Build: `npm run build`
- RULE-26 harness: `npm run test:rule26` (= `playwright test`)
- Doc drift: `npm run check:doc-drift` · Reseal: `npm run reseal`

Push the branch EARLY (worktree/shared-checkout advisory stands). One lane
(AG-A) owns this phase end-to-end.

---

## §1 · ARCHITECT DIAGNOSES — TREE-PROVEN ON THE ANCHOR, BUILD ON THESE

### 1a · W-5 ROOT CAUSE (register v56's suspect is WRONG — corrected here)
The register suspected "redaction/allowlist eating `payload.kind`". The
Architect walked the full `ctx.emit → record` segment on a fresh anchor
clone: **no scrubber exists in that path.**
`stagesGovernance.ts:26` pushes `ctx.telemetry.record({...e})` verbatim;
`TelemetryRepository.record()` (repositories/TelemetryRepository.ts:51) does a
bare `.insert(event)`; the table CHECK admits `type='tool_call'`; the emit at
`chat.ts:209` fires POST-`runTurnPipeline` so `ctx.learnStats` is populated
(stage 07 runs pre-stream). Rows reach the DB — consistent with the S54 close
record (`learn_aggregate` rows FLOWING@e8a42833/05765832).

**The real fault is CLIENT-SIDE, two-headed, in `RoutingTab.tsx`:**
1. **Permission-race dead fetch.** `adminStore.capabilities` is `null` until
   `loadCapabilities()` resolves (`src/store/adminStore.ts:38`), and
   `can(perm)` returns **false** while null (`:191`). `RoutingTab` runs all
   loads in ONE `useEffect(..., [])` at mount (`RoutingTab.tsx:231-235`);
   `loadLearnAgg` (`:213`), `loadProposals` (`:225`) early-return on
   `!mayCurate`, `loadDrafts` (`:219`) on `!mayDraft`. When the tab mounts
   BEFORE capabilities land — exactly the deep-link/bridge arrival path the
   owner used in the walkthrough — the fetches are skipped **and never
   retried** (the permission flags are not effect dependencies).
2. **Fabricated-zero empty render (W-6 is the same defect's face).** When
   capabilities later flip `mayCurate` true, the strip renders, but
   `learnAgg` is still `null` → the `useMemo` aggregation over
   `learnAgg ?? []` (`:357-372`) prints `kept=0 skipped_broad=0 …` —
   fabricated zeros. **empty≠zero violated at the render layer of our own
   admin panel.** Required trichotomy: `null` = not-loaded/error (show a
   loading/degraded state, NEVER numbers) · `[]` = loaded-empty ("henüz
   kayıt yok / no rows yet") · rows = real sums.

Consequences you must honor:
- `ir_frame` telemetry rows do NOT share any fault (there is no fault on the
  write side). Do not touch the emit path.
- **F147 does NOT ride this phase** (its rider condition "if W-5's fix opens
  the emit path" is false — emit path needs no fix). F147 stays queued for
  the IR-3-era api batch. Do not implement it here.

### 1b · W-12 MECHANISM (exact, single fix site)
`resolveStage11` (`api/cwf/_lib/replay/stageContextSlice.ts:242-257`) marks
any `rawToolResults` entry not in `offeredToolNames` as a violation.
`offeredToolNames` = MCP `toolDefs` only (`stageTools.ts:272`). But the
gateway ALWAYS mounts **three** local deterministic tools outside that set —
`resolve_time_range` (`timeTools.ts:19`), `aggregate_records`,
`query_records` (`resultStore.ts:58-59`) — and the time tool records itself
into `rawToolResults` via `recordToolCall` (`stageTools.ts:410`). Hence the
false "outside offered set" badge on every turn that resolved a time range.
**Register premise correction (S54-1, carry to register v57):** the register
said "4 always-present gateway tools"; the tree shows THREE. Verify yourself;
if you find a fourth registration site, report it — do not silently assume
either count.
The LIVE check (`checkRoutingContainment`, `stageTools.ts:120`) is called
only inside MCP closures → it structurally cannot false-fire on local tools.
**Fix only the replay slice.** Do not add the union to the live check.

---

## §2 · GATED SUB-PHASES (in order; each gate = tests green before the next)

### G1 — W-5 + W-6: the hygiene strip lives (client-only)
1. Export a single named SSOT list of the permission-gated loaders' triggers:
   split the mount effect. Keep permission-FREE loads in the `[]` effect
   (`loadLive/loadReference/loadLiveCategories/loadBackendTools`). Move the
   permission-gated ones into effects keyed on their permission:
   ```ts
   useEffect(() => { if (mayCurate) { void loadLearnAgg(); void loadProposals(); } }, [mayCurate]);
   useEffect(() => { if (mayDraft) { void loadDrafts(); } }, [mayDraft]);
   ```
   (Effect re-fires when capabilities land — the race is dead by
   construction; a false→true flip is the ONLY transition, so no dedup
   machinery is needed.)
2. W-6 honest trichotomy in the strip render: `learnAgg === null` → a muted
   "yükleniyor / loading" (or the existing `learnAggError` box on error);
   `learnAgg.length === 0` → "henüz kayıt yok / no rows yet" (TR/EN via
   `t()`); rows → the real sums. The `(n)` counters render only in the
   rows branch. NEVER print a numeric 0 that was not summed from ≥1 row.
3. **Sweep (bounded):** grep ALL admin tab components for the same pattern —
   `useEffect(..., [])` whose loader early-returns on a `can(...)`-derived
   flag — and apply the same split wherever found. Report the sweep hit list
   in your evidence (files + line numbers), including "no other hits" if so.
4. Tests: (a) a race test — render RoutingTab with capabilities arriving
   AFTER mount (mock store flip), assert the strip fetch fires and rows
   render; (b) an empty-state test — loaded `{rows: []}` renders the
   no-rows message and NO `kept=0` text; (c) a null-state test — pre-load
   renders no fabricated numbers.

### G2 — W-12: gateway-tool union in the replay stage-11 slice
1. Mint the SSOT: `export const LOCAL_TOOL_NAMES: readonly string[]` (or a
   `Set`) in ONE place importable by both `stageTools.ts` (which registers
   them) and `stageContextSlice.ts`. Derive registrations from it or assert
   equality in a test — the constant and the registrations must be provably
   the same set (no drift-by-hand).
2. `resolveStage11`: `offered = offeredSet.has(name) || LOCAL_TOOL_NAMES` …
   union before the mismatch check. The unknown-offered-set branch
   (`offeredSet === null → assume ok`) stays byte-identical.
3. Tests: a recorded turn whose `rawToolResults` contains
   `resolve_time_range` + one offered MCP tool → containment `'ok'`; a turn
   with a genuinely un-offered MCP tool → still flagged. Plus the SSOT
   equality test from step 1.

### G3 — W-1: the page-level scroll law + RULE-26 assertion
LAW (owner-ratified): admin pages flow as ONE document — the page scrolls;
inner scrollboxes are legitimate ONLY for truly unbounded interactive
content (log streams, long tables with their own virtualization, `<pre>`
payload viewers). Nested "scroll traps" (a box that eats the wheel before
the page can move) are defects.
1. Sweep ALL admin tabs: remove/convert gratuitous `overflow-y-auto` /
   fixed-height inner boxes to natural flow; keep the legitimate class
   (justify each survivor in the report by name).
2. Extend the RULE-26 Playwright harness with a **no-scroll-trap assertion**:
   for each admin tab at 1280 and 1024, assert
   `document.documentElement.scrollHeight` grows with content (page-level
   flow) and that no non-allowlisted element has
   `scrollHeight > clientHeight` with `overflow-y` auto/scroll. Maintain the
   allowlist as an explicit exported array with a one-line justification
   comment per entry.
3. Evidence: `npm run test:rule26` green + the before/after allowlist.

### G4 — W-2 · W-3 · W-8: chips wave
- **W-2:** probe result's offered-tools render as full-height WRAPPING chips
  (flex-wrap), never a truncated single line, never an inner scrollbox
  (consistent with G3's law).
- **W-3:** the Test-mode probe runs ALL THREE slice versions — fire the
  existing `probeRouting(message, version)` for `floor | live | preview` in
  parallel (`Promise.allSettled`; ZERO api change). Each resulting tool chip
  carries membership dots: floor=orange · live=green · preview=turquoise
  (theme tokens, not raw hex — CHAT-UX-1/ADMIN-THEME-1 tokens). Above the
  chips, a one-line diff summary per adjacent pair ("live adds N, drops M vs
  floor"; "preview adds N, drops M vs live"). A failed arm renders an honest
  per-arm error state — never fabricated membership (empty≠zero, again).
- **W-8:** the stage-03 and stage-07 cards' offered-tool walls → the same
  wrapping-chip component. Extract ONE shared chip component; do not fork
  three copies.

### G5 — W-4: Frame Observation card live-binds
The card currently states frame status STATICALLY ("off") while production is
`frame=on`. Bind it to the live governed value the server already resolves
(`router.frameEnabled` — served through the existing governed-content read
path; find the existing endpoint/read the Stages/Governance surfaces already
use — do NOT mint a new endpoint if an existing read serves it; if none does,
a minimal PANEL_ACCESS GET mirroring `learn-aggregate.ts`'s shape is the
approved fallback). Render tri-state honestly: on / off / unknown(read
failed) — never a static claim.

### G6 — W-7 · W-9 · W-11: the teaching wave (copy, human voice)
- **W-7:** Tool Matching `PanelPrimer` LIFECYCLE line rewritten in the Wave-2
  human onboarding voice (both TR and EN; no AI-voice telegraphese; the
  reader is a new plant engineer, not the Architect).
- **W-9:** the stage-03 card teaches the REAL engine: the ladder — semantic
  router (frame-bearing, governed prompt) → keyword floor — including the
  live-proven graceful fallback (`path=floor`, `floor_reason=…`) and that
  the frame currently rides in SHADOW (observation, not steering). Content
  lives in `stagesRegistry.ts`; keep it structural (no invented numbers).
- **W-11:** one-page "how to read a trace" guide — a collapsible section
  reachable from the Inspect tab header: which QUESTION → which SPAN
  (`cwf.stage.*` map, `cwf.mcp.*`, stream attempts), plus the honest line
  that provider reasoning is closed-box (count-only). TR/EN. Static content,
  no fetch.

### G7 — W-10: Langfuse chip feedback
On click, the chip already copies the span name + opens the host. Add
VISIBLE feedback: transient "kopyalandı — aramaya yapıştır / copied — paste
into search" state (≈2s, then revert). No clipboard-permission regression:
keep the existing copy mechanism, only surface its success.

---

## §3 · BINDING CONSTRAINTS
- Zero changes to: emit paths, `TelemetryRepository`, migrations, eval-gate
  machinery, `checkRoutingContainment`, golden-run surfaces, prompt segments.
- `adminLegibility.test.ts` auto-generates 2 tests per admin `.tsx` — budget
  for new component files. jsdom lacks `scrollIntoView` — stub as the
  STAGES-FIX-2 tests do.
- All user-visible copy bilingual via the local `t()` convention.
- CHANGELOG + `.agents/` skill-KB entries land ON the feature branch
  pre-merge (in-place is legitimate only pre-merge — CHANGELOG ruling).
- Doc-drift: this phase touches mapped files → run `npm run reseal` on the
  final branch tree; flip + reseal in the same commit per S34-1 (budget it).

## §4 · SELF-VERIFY CHECKLIST (evidence = literal, paste outputs)
1. `npm test` green UNSHARDED locally AND CI green on the PR head (link).
2. G1 race test output + the sweep hit list (files:lines or "no other hits").
3. Screenshot-free textual proof for W-6: test names covering null / [] /
   rows trichotomy, all green.
4. G2: SSOT equality test name + the two containment test names, green.
5. `npm run test:rule26` output incl. the new no-scroll-trap assertions at
   1280 and 1024; the scrollbox allowlist pasted with justifications.
6. W-3: evidence of three-arm probe (test or dev-preview capture) + honest
   per-arm error render test.
7. W-4: tri-state render test (on/off/unknown).
8. `npm run typecheck:api` + `npm run build` + `npm run check:doc-drift`
   green on the final tree.
9. Diff-scope sweep: `git diff --stat e1218ba..HEAD` — NO files under
   `supabase/migrations/`, `api/cwf/_lib/persistence/`, prompt segments, or
   golden surfaces. Paste the stat.

## §5 · MERGE (only after Architect GO)
Merge `--no-ff` (squash banned). Merge-commit message VERBATIM:
```
Merge PHASE BATCH-W-1: walkthrough dozen — hygiene-strip permission-race fix + honest empty states, stage-11 local-tool union, page-scroll law + RULE-26 no-scroll-trap, probe tri-lens chips, frame live-bind, teaching copy
```
Report: remote hash + CI link + the §4 evidence block. The Architect will
FAST-GATE review (S43-2) against anchor `e1218ba`.

<!-- END · claude-code-PHASE-BATCH-W-1-v1 · rev 1 · 2026-07-20 -->
