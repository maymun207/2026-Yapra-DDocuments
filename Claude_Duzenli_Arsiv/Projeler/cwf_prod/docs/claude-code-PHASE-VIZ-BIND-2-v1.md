# PHASE VIZ-BIND-2 — Multi-Group Results Render All, Labelled

<!-- claude-code-PHASE-VIZ-BIND-2-v1 · rev 1 · 2026-07-17
     Design authority: cwf-viz-bind-2-design-v1.md
     Ceremony: FULL profile (multi-file, trust-adjacent render honesty).
     CI (unsharded) is the sole test arbiter; Architect FAST-GATE review;
     CI-green is a merge precondition (S37-2).
     PLATINUM: client-only, zero migration, zero publish, zero config —
     one merge+deploy activates. -->

**PRECONDITION (S47-1):** Valid only while
`origin/master == 3dba52a588827dab211ed82715f9f56f0b7e0d5f` and no other open
PR touches `src/lib/toolResultSelect.ts`, `src/lib/chartData.ts`, or
`src/components/ui/cwf/MessageChart*.tsx`. On mismatch: STOP and report.

## 0 · Mission
Owner live test (trace `2032bf00`, 09:14Z): "tum hatlari tek bir grafikde
cizelim" returned a GroupAmbiguousPanel with 7 raw zone-UUID keys instead of
the requested chart. Build the "render all, labelled" branch F82 named:
multi-group tool results become a multi-series chart (or one grouped table)
with deterministic id→name labels resolved from same-turn tool results. Also
fix the evidence/warning chips rendering English on Turkish turns (F137).

## 1 · Hard pre-flight
```bash
cd /tmp && rm -rf cwf_yaprak && git clone -q https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master   # MUST print 3dba52a588827dab211ed82715f9f56f0b7e0d5f
grep -n "groupAmbiguous" src/components/ui/cwf/MessageChartContent.tsx   # :210 table, :257 chart — the ONLY consumers
grep -n "series: Array" src/components/ui/cwf/MessageChart.tsx           # multi-series model pre-exists
grep -rn "Kanıt\|Evidence:" src/lib/params/chatSurface.ts | head -4      # chip strings (SR1-W3b)
npm ci --no-audit --no-fund --silent && npx tsc --noEmit -p tsconfig.json
```
Also VERIFY and STATE in the report (do not assume): (a) how the group-key
discriminator resolves inside `sliceRecordGroups` (the `hitKey` path); (b) the
exact language-selection mechanism the bilingual GroupAmbiguousPanel uses.
Branch: `phase/viz-bind-2` from origin/master.

## 2 · Binding constraints
1. **Client-only.** `git diff --stat origin/master..HEAD -- api/ shared/ supabase/`
   MUST be empty. No prompt publishes, no golden anything (FREEZE), no env vars.
2. **VIZ-BIND-1 never-guess law untouched:** `resolveToolBinding` (call-level
   ambiguity) byte-identical; its tests pass UNCHANGED. Only the group-level
   RENDER path changes.
3. **No silent drops:** every group key becomes a series/table-group or is
   named in a visible note. One test pins a key-count == series-count+noted
   invariant.
4. **Empty≠zero at render:** an empty-array group yields an all-null series
   (chart's existing gap semantics), NEVER 0, NEVER dropped. Test pins it.
5. **Label map is deterministic and turn-scoped:** built ONLY from same-turn
   rawToolResults records exposing id-like+name-like pairs; unresolved keys
   render raw. No model text is consulted. No fuzzy matching.
6. **Cap:** `MAX_CHART_SERIES = 12` named constant; above cap → existing
   panel (with labelled keys). Panel remains for non-series chart types.
7. No new dependencies. Reuse the existing record→series mapping in
   chartData.ts per group — do not fork a second mapping implementation.
8. Merge `--no-ff` only after Architect GO; CI green on PR head first.

## 3 · Gated sub-phases

### W1 — `buildTurnLabelMap` + panel labelling (D2)
- New pure function in `src/lib/` (own file, own test file): scan
  rawToolResults, collect `zoneId|id → name` from record arrays; ties broken
  by first occurrence; malformed entries skipped silently.
- Apply to `GroupAmbiguousPanel` keys at BOTH consumers (:210, :257): render
  `label (shortKey)` when resolved, raw key otherwise.
- Tests: map build from the real getFactoryLines shape (use the actual KB7
  payload from the design's trace as fixture) · unresolved passthrough ·
  non-record results ignored.
**GATE W1:** targeted tests green; fixture is the real payload, not invented.

### W2 — `groupsToMultiSeries` chart branch (D1)
- In the chart consumer (:257): `groupAmbiguous` + series-capable type
  (line/bar) + keys.length ≤ MAX_CHART_SERIES → build multi-series chart
  config; per-group x/y mapping REUSES chartData.ts's existing logic; series
  name from W1's map.
- Tests: 7-group OEE fixture → 7 named series, legend on · empty group →
  all-null series present (constraint 4) · 13 groups → panel (labelled) ·
  pie/unsupported type → panel · sliced/flat paths byte-identical
  (equivalence test on existing fixtures).
**GATE W2:** regression test reproducing trace 2032bf00's shape flips from
panel to a 7-series chart with human names — paste the assertion.

### W3 — multi-group table branch (D3)
- Table consumer (:210): concatenated table, leading "Grup" column with
  resolved labels; same no-silent-drop + cap-free (tables scale by rows).
- Tests: 2-group concat with labels · empty group contributes zero rows but
  its label appears in a visible note (constraint 3).
**GATE W3:** targeted tests green.

### W4 — chip language (F137, D4)
- Evidence line + zero-evidence warning consume the SAME language mechanism
  as the bilingual panel (as verified in pre-flight (b)). State the mechanism
  and the change in one sentence in the report.
- Tests: TR turn → "Kanıt:" / TR warning; EN turn → English strings.
**GATE W4:** both render tests green.

### W5 — docs + reseal
- CHANGELOG + skill-KB entries; `npm run reseal` if the drift manifest flags
  touched mapped files (docVersion rev 108 → 109 in the flip commit).

## 4 · Self-verify (evidence, not assertion)
1. `git diff --stat origin/master..HEAD -- api/ shared/ supabase/` → EMPTY.
2. `resolveToolBinding` untouched: `git diff origin/master..HEAD -S "resolveToolBinding" -- src/lib/toolResultSelect.ts` shows no changes to that function's body — name the proof.
3. Regression test name + assertion for the 2032bf00 shape.
4. No-silent-drop invariant test name.
5. Empty-group all-null (never 0) test name.
6. Equivalence: sliced/flat paths unchanged — test names.
7. Chip language mechanism found + one-line description.
8. Full CI (unsharded) green on PR head — link.
9. Test/file delta stated.

## 5 · Report
Standard: branch, HEAD, name-list, gates W1–W5 evidence, self-verify 1–9,
pre-flight findings (a)+(b), open questions. Do NOT merge — Architect
FAST-GATE + CI green precede GO.

<!-- END · claude-code-PHASE-VIZ-BIND-2-v1 · rev 1 · 2026-07-17 -->
