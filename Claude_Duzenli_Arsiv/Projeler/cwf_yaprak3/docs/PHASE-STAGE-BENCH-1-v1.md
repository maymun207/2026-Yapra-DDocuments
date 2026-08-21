# PHASE-STAGE-BENCH-1 · v1 — the inspection table: every organ testable alone, its verdicts visible

<!-- PHASE-STAGE-BENCH-1-v1 · 2026-08-09 · S89 · Architect → AG-2.
     ONE self-contained relay. Owner-ratified this session: "her katmanı kendi
     başına sanity-check edebileceğimiz, sentetik girdi döküp ÇIKTISINI
     GÖREBİLECEĞİMİZ yapı" — starting with the two organs that burned us today:
     the metric ARMOR and the drift GATE. ONE-ORGAN note: this is
     STAGE-PLAYGROUND (v1.1 queue) leaving the park and growing its first real
     body — same concept center, bigger scope; do not create a second
     playground concept anywhere.
     Branch: phase/stage-bench-1 · base = origin/master. -->

## PRECONDITION
```
git fetch origin && git rev-parse origin/master
```
Expected `fe06ed6efd2a69d8c6d685ef36605db9a7501820` or a descendant (AG-1 is
building `phase/planner-0-fix-1` in parallel; if master has ALREADY taken that
merge when you start, base on it — that is the GOOD case for you, the real
`judgeGateStep` exists. Otherwise build against the CONTRACT below.)

## WHY (owner's law, verbatim spirit)
Unit tests freeze developer-chosen fixtures; the owner wants an INSPECTION
TABLE: pour synthetic input over a REAL organ, see the verdict AND ITS REASON
on screen, judge with human eyes. Today's incident is the proof of need: the
armor's unit tests were green while "the entire energy family gets destroyed
and nothing records the word" was invisible — a bench would have shown it in
one screen on July 20.

## HARD PINS
P1 · **Production bytes only.** Each bench IMPORTS and calls the real
     function — `armorIrFrame` (api/cwf/_lib/routing/irFrame.ts:87) and
     `judgeGateStep` (contract below). Re-implementation or copy = the bench
     lies = the phase fails its own purpose. A test PROVES each endpoint
     resolves to the same module the runtime uses.
P2 · **Read-only.** Zero writes anywhere: no governed rows, no episodes, no
     telemetry events from bench runs (bench usage is not production signal).
     Admin-gated like existing admin surfaces (owner-CRUD auth pattern).
P3 · **Reasons visible (the owner's evidence law applied to the bench
     itself).** Every verdict row carries its GEREKÇE: which token matched,
     which set was empty, what was dropped vs captured. A bench that says
     only "off-frame" is a başıbozuk bench.
P4 · Tenant-zero floor: bench UI strings generic; preset CONTENT is loaded at
     runtime from DATA (governed rows / code constants via their real read
     paths), never hardcoded vocabulary in bench code.
P5 · Wave discipline (S88-1): touch ONLY `src/**`, `api/admin/bench/**`, and
     your tests. Do NOT touch `api/cwf/_lib/**` — if the gate contract is
     absent on your base, use the local fake (below); integration snaps at
     merge order (yours lands SECOND).

## THE GATE CONTRACT (AG-1 is exporting EXACTLY this from turn/planner.ts)
```ts
export function judgeGateStep(frame: IrFrame | null, argsJson: string):
  { verdict: 'on-frame' | 'off-frame' | 'no-jurisdiction';
    matchedToken?: string; evidence: string[] }
```
If absent on your base: implement `src`-side ONLY a typed import seam +
local fake honoring this signature for tests; wire the real import behind the
seam so the post-merge tree needs ZERO edits from you (a one-line import path
that resolves once AG-1's file lands — prove with a skipped-until-present
integration test that un-skips by feature detection).

## BUILD
1. **Admin endpoints** (`api/admin/bench/armor.ts`, `api/admin/bench/gate.ts`,
   owner-gated by the existing admin auth pattern; POST, pure, stateless):
   - armor: body `{words: string[]}` → for each word, build a minimal raw
     frame carrying it as a metrics entry, run REAL `armorIrFrame`, return
     rows `{word, fate: 'vocab-kept'|'beyan-captured'|'discarded',
     detail}` — post-FIX, 'discarded' should be structurally impossible for
     metrics; the bench will PROVE that on screen. Include the aggregate
     drops counters as returned by the armor.
   - gate: body `{frame: {action, object, entity_ref[], metrics[],
     metricsSurface[], time?}, calls: string[]}` → per call, REAL
     `judgeGateStep` verdict row + the evidence set once.
2. **Admin UI — "Tezgâh" tab** (the established 17-tab admin pattern; one new
   tab, two panes):
   - **Zırh tezgâhı:** textarea (one word per line) + preset buttons that load
     REAL data via existing read paths: "machine-v5 kelimeleri" (the published
     `armes.tool_category/machine` row's keywords), "resmî ölçüt id'leri"
     (METRIC_IDS + aliases from metricVocab). Run → verdict table with fate
     coloring + counters. Empty input ⇒ honest empty-state, no fake rows.
   - **Bekçi tezgâhı:** frame form (action/object pickers from the real
     IR_ACTIONS/IR_OBJECTS exports; entity/metrics/beyan text inputs) + call
     list (one JSON-ish args string per line) → step table: call → verdict →
     matchedToken/gerekçe; evidence set shown once above the table;
     `no-jurisdiction` rendered as its own visible state, never as "clean".
   - Both panes: a "senaryoyu kopyala" button serializing the run
     (input+verdicts) to clipboard as markdown — the owner's relay currency.
3. Tests: endpoint purity (no DB writes — spy-pinned), same-module proof (P1),
   fate mapping table-driven, UI renders the three gate states distinctly,
   preset loaders read through the REAL read paths (mocked at the data edge).

## GATES
G1 · P1 same-module proof both benches; REVERSE: a planted twin
     implementation reds it.
G2 · Armor bench on the machine-v5 preset (fixture copy of the 27 words via
     split fragments, lens-safe) shows the energy family's fate — and the
     assertion is written against the CONTRACT ("no metric word may be
     'discarded'"), so it goes green only on the post-FIX tree: mark it
     integration-skipped-until-present like the gate test (feature
     detection), never a fake-green.
G3 · Gate bench: the S89 witness scenario as a saved example (frame with
     beyan `doğalgaz`, single compliant call) renders on-frame with
     matchedToken visible; the no-evidence scenario renders no-jurisdiction;
     an off-frame scenario renders the nudge-eligible state.
G4 · Read-only: bench calls produce zero rows in any table (spy at the
     service-client seam).
G5 · check:tenant-zero green with zero exclusions; admin tab strings generic.

## CI + REPORT (STOP-FOR-REVIEW; do NOT merge)
lint · typecheck:api · build · full test (state exact arithmetic over your
base) · check:doc-drift both modes · check:tenant-zero. Push branch +
`docs/relay/PHASE-STAGE-BENCH-1-report.md`: per-gate test names · a SCREENSHOT
or rendered-markdown sample of both benches on the presets · which base you
built on and which integration tests are feature-detected · diffstat ·
PR-head CI run id by CONCLUSION · deviations named. New spans: "yeni span:
yok" expected. Stage-card bucket: admin-surface family. Merges are SEQUENCED:
FIX-1 lands first, you land second.

<!-- END · PHASE-STAGE-BENCH-1-v1 -->
