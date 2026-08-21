# CWF — Visualization Overhaul Design Note · v1_1
<!-- cwf-viz-overhaul-design-v1_1 · 2026-07-31 · S73 · SUPERSEDES v1 (same day;
     v1 immutable per S37-1). Delta: §0b demo-parity ground reads · §1b the
     comparison table (owner side-by-side screenshots, same question both apps) ·
     §2b PHASE VIZ-UPLIFT-1 (chart parity + renderer decision) · F160 residue
     note · program = TWO phases. Everything in v1 (§0/§1/§2/§3/§5 laws,
     TABLE-EPOCH-1, F166 ruling) stands unchanged.
     Floor: origin/master 215bd9ab · rev 167 · 404/4484. -->

## §0b · ADDITIONAL GROUND (live reads, 2026-07-31)

- **The linked repo `maymun207/cwf` is the LANDING PAGE** (`cwf-landing-page`,
  3 files, single `main` branch) — the demo APPLICATION's chart code is not in
  it. The comparison below therefore uses the owner's side-by-side screenshots
  (same question, both apps) as the parity bar; if the demo app's repo can be
  named/made public, exact styling harvests become possible, but nothing below
  is blocked on it.
- **yaprak chart renderer census (`MessageChart.tsx`, 296 lines):** hand-rolled
  SVG, **zero chart-library dependency** (package.json grep), straight `<path>`
  segments (no curve interpolation), **ZERO tooltip/hover/crosshair lines**
  (grep: tooltip/hover/onMouse — no hits).
- **String-date tick bypass (mechanism of the ISO axis):** `chartData.ts:108` —
  the x label is `String(xv)` of whatever the tool returned. F209's
  redundancy-deriving formatter lives on the EPOCH path (`formatEpochMsLabel`);
  date STRINGS ("2026-07-25") bypass it entirely → the axis prints full ISO
  dates, and the final label clips at the container edge ("2026-07").
- **Multi-series reality check (F160 residue):** VIZ-BIND-2 machinery
  (`chartData.ts:142+`, F82 "render all, labelled") exists, and the yaprak
  screenshot itself renders a 7-series chart from `getOeeValuesForZones`. F160's
  original wording ("multi-series single chart unsupported") is STALE as an
  absolute; its live residue is narrower (per-line fan-out cases / cross-group
  binding polish) and is re-measured inside VIZ-UPLIFT-1 rather than assumed.

## §1b · THE COMPARISON (same question: "KB7 son 7 günlük OEE", both apps)

| Capability | CWF-DEMO app | cwf_yaprak today | Gap class |
|---|---|---|---|
| Hover crosshair + all-series tooltip | YES (date column + colored per-series values) | **ABSENT** | interaction |
| Curve smoothing | monotone curves | straight segments | polish |
| Axis date ticks | localized short ("25 Tem") | raw ISO strings, last label clipped | formatting (ONE clock) |
| Series names | humanized Turkish ("Fırın Üst") | raw codes ("FIRINUST") | labeling — the dialect HEADER affordance (CHART-SERIES-DIALECT-1) already ships the mechanism; viz v4 teaches its use |
| Point markers / hover halo / legend polish / title | YES | minimal | polish |
| Y scale | fixed 0–100 | data-driven min–max | NOT a defect — data-driven is honest; keep |
| Governance surface (Ham tool çıktısı · Kanıt strip · advisory banner · memory chip · honest fallbacks) | none | **YES — yaprak superior** | **must SURVIVE the uplift untouched** |

The verdict in one line: the demo wins on render polish; yaprak wins on truth
surface. The uplift imports the former and may not spend a pixel of the latter.

## §2b · PHASE VIZ-UPLIFT-1 — chart parity (the second phase of the program)

**Renderer decision (committed, buy-before-build):** adopt **Recharts** for
`MessageChart`'s drawing surface. Rationale: crosshair tooltip, monotone
interpolation, legend, responsive sizing arrive maintained and tree-shakeable;
hand-rolling the tooltip alone is a few hundred lines of edge cases we would
own forever. Boundary law: **Recharts touches pixels only.** `chartData.ts`
remains the single data/label pipeline (parser → rows → renderer); the honest
fallback panels (non-chartable, group-ambiguous, not-available-to-chart) stay
OUTSIDE the library, byte-identical; empty≠zero and presentation-only are
test-pinned across the swap (same rows in → same values displayed).

**Scope, gated:**
1. Crosshair tooltip — hover a date column, see every series' value with its
   color dot (the SS1 interaction).
2. Monotone curve interpolation + point markers + hover halo.
3. Tick localization through the ONE clock module (§2 item 1 extends): date
   STRINGS parse → zoned short labels ("25 Tem"); epoch path unchanged (F209);
   unparseable strings pass through raw — a guess never looks like an answer.
   Last-label clipping measured and fixed (RULE-26 numeric).
4. Series-name humanization: dialect `header` (already shipped) is the primary
   channel — the viz v4 publish (A5) teaches the model to supply human headers;
   renderer additionally falls back to entity-registry surface names where the
   series key resolves canonically, raw key otherwise (attributed, never
   invented).
5. Legend/title polish to the demo bar; F160 residue re-measured and either
   closed-by-evidence or re-scoped by name.
6. Table liveliness rider: `DataTable` styling pass (zebra/hover/sticky header
   at its existing altitude) — TABLE-EPOCH-1's formatting work (§2) lands
   first in VIZ-TABLE-1; this is the cosmetic layer above it.

**Evidence bar:** side-by-side rendered screenshots vs the demo exhibit @1280,
RULE-26 numeric margins, all three honest-fallback states re-exercised through
the new renderer, suite green with the presentation-only byte-pins.

**Cost stated honestly:** VIZ-TABLE-1 ≈ half an AG day; VIZ-UPLIFT-1 ≈ 1–2 AG
days + one new dependency. This is an **owner scope ADDITION to v1** (product
quality on the active user path) — named here, not smuggled; it rides the
freeze-independent lane and does not touch F48/A5's critical path.

## §4b · SEQUENCE (v1 §4 updated)

```
NOW        PHASE VIZ-TABLE-1 cut (TABLE-EPOCH-1 + F158 rider)
THEN       PHASE VIZ-UPLIFT-1 (this section) — AG lane, freeze-independent
           ∥ tick 08-01T03:40Z → F48 → A4 CLOSES → A5 (viz v4 content now
             also teaches dialect headers per §2b.4)
v1.1       F166-(B) attributed carry-forward · F160 residue if any survives
           the §2b.5 re-measure
```

<!-- END · cwf-viz-overhaul-design-v1_1 · 2026-07-31 · S73 · floor 215bd9ab -->
