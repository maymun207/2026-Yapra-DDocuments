# PHASE PROMPT · STAGE-CONTEXT-TRUTH-1 · v1 — lane AG-1

<!-- PHASE-STAGE-CONTEXT-TRUTH-1-v1 · 2026-08-10 · S92.
     SELF-CONTAINED (S91-4). If disk contradicts this prompt, STOP + report the byte. -->

## 0 · BOOTSTRAP

```bash
git clone https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git fetch origin && git rev-parse origin/master
# MUST print bceb58c94af3bf10f37bde106ad9f32b83707ecf
git checkout -b phase/stage-context-truth-1 origin/master
npm ci
```

**Fence:**
- `api/admin/stage-context.ts` (+ `api/admin/__tests__/stageContext.test.ts`)
- `api/cwf/_lib/replay/stageContextSlice.ts` (+ its tests under
  `api/cwf/_lib/replay/__tests__/` and `api/cwf/__tests__/`)
- `src/components/admin/StageContextSection.tsx`, `src/components/admin/StagesTab.tsx`
  (+ their `__tests__`)
- `src/dev/AdminPreview.tsx` — the stage-context snapshot fixture region (~:626-660)
- `src/lib/adminService.ts` — ONLY if the stage-context client types live there
  (verify; touch nothing else in it)
- new test files

**Lane AG-2 runs in parallel** on `toolCategories.ts`, `floorSyncCore.ts`,
`resolveToolCategories.ts`, `evalGate.ts`, `referenceData.ts`,
`runRouteDerivation.ts`, `api/cwf/_lib/replay/categorySlice.ts`,
`syncRoutingFloor.ts`, `genArchitectureFacts.ts`, `reconcileToolGovernance.ts`,
`router-proposals.ts`, `routing-curation.ts` and their tests. Touch NOTHING
there — note `categorySlice.ts` is theirs even though it is under `replay/`.
STOP + report if fences collide.

**Hard boundaries:** NO migration · the planner organ (`turn/planner.ts`,
`stageStream.ts`, `turnEfficiency.ts`) is READ-ONLY reference — this phase
changes what the ADMIN sees, never what the turn does · stages 08 and 14 stay
PERMANENT_THIN untouched · no squash.
**Typecheck:** `npm run typecheck:api`, both projects run SEPARATELY
(`&&` short-circuits; root `npx tsc --noEmit` compiles nothing — false green).

## 1 · WHY — the primary copy lies to the admin

`api/admin/stage-context.ts:40-48`:
```ts
const PERMANENT_THIN: Record<string, ThinStage> = {
    '04': {
        thin: 'no-artifact',
        note: { tr: "ayrı planlayıcı yok (ReAct) — araç döngüsü planın kendisi",
                en: 'no separate planner (ReAct) — the tool loop IS the plan' },
        links: ['11'],
    },
    ...
```

**Both halves are false since PHASE-PLANNER-0 merged:** a planner EXISTS
(`api/cwf/_lib/turn/planner.ts` — `derivePlan`/`composePlanBlock`,
`ctx.turnPlan`), and "PERMANENT" was disproven by its arrival. Today an admin
opening İncele → Aşama Bağlamı still reads "no planner." The lie is mirrored at
`src/dev/AdminPreview.tsx:640` (verbatim fixture) and echoed in
`stageContextSlice.ts`'s docblock ("04/08/14 PERMANENTLY thin"),
`StageContextSection.tsx`, `StagesTab.tsx`, and four test files (grep
`"ayrı planlayıcı yok"` / `'no separate planner'` — fix every hit).

## 2 · WHAT IS ACTUALLY RECORDED (read live at the anchor — bind to THIS)

The full plan text is **not persisted** (in-memory `ctx.turnPlan` only). What
IS persisted, per turn, from ONE derivation (`summarizeTurnPlanner(ctx)` at
`stageStream.ts:631`):

1. **Stage-9 span attrs** — `ATTR_PLANNER_PLAN`, `ATTR_PLANNER_TEMPLATE`,
   `ATTR_PLANNER_STEPS`, `ATTR_PLANNER_MODE`, and (only when measured)
   `ATTR_PLANNER_REPLANS`, `ATTR_PLANNER_GATE` (`stageStream.ts:641-650`).
2. **The `turn_done` ledger event** — `telemetry_events` row,
   `type='message'`, `payload->>'kind'='turn_done'` (the emit at
   `stageStream.ts:~668`; the planner ledger key is referenced at
   `stageStream.ts:42`). **Read that emit block yourself and report the exact
   planner key name(s) in the payload** — the slice must bind to the SAME
   carrier the turn writes (S70-3: the consuming path is the witness; no
   parallel shape).

The summary fields: `plan: boolean` · `template` · `steps` · `mode:
'live'|'dark'` · `replans: number|null` · `gate: string|null`. Production
today runs mode-'dark'-or-plan-absent territory (frame inference floors to 0)
— the slice must SHOW that honestly, never dress it up.

## 3 · THE DESIGN

**A · `'04'` leaves `PERMANENT_THIN`.** 08 and 14 stay. The docblock's
"04/08/14" trio becomes "08/14" everywhere it appears.

**B · A real 04 slice in `stageContextSlice.ts`:** for the inspected turn, read
its `turn_done` row (the slice module already resolves the turn's telemetry —
reuse the existing read path, never a second query shape) and emit:
- planner summary present → `status: 'recorded'`, artifact = the summary
  fields verbatim (plan/template/steps/mode, replans/gate only when present —
  absent ≠ zero, do not fabricate either direction).
- row present but planner keys absent (turn predates PLANNER-0's ledger key)
  → an honest thin: `note` = "planner ledgeri bu turn'den yeni — kayıt yok" /
  "the planner ledger postdates this turn — nothing recorded". NOT
  'no-artifact-forever', and NOT an error.
- `turn_done` row itself absent/unreadable → the slice's existing
  could-not-read state (MEASURE-READ-HONESTY-1: "no data" ≠ "could not read" —
  the module already distinguishes these; follow its local convention).
- The plan TEXT is not persisted: the slice says so in its note
  ("plan metni kalıcı değil — özet kaydedilir" / "plan text is not persisted —
  the summary is"), so nobody mistakes the summary for the artifact.

**C · UI renders it:** `StageContextSection`/`StagesTab` stop special-casing
04 as permanent-thin; render the summary fields; `mode: 'dark'` displays as
its own labeled state ("planner koştu, frame yok — karanlık mod" / "planner
ran, no frame — dark mode"), never as a failure and never hidden.

**D · Fixtures:** `AdminPreview.tsx` 04 becomes a `recorded` example with a
realistic summary (`plan: true, template, steps, mode: 'live', replans: 0`);
add one pre-planner-thin example if the preview structure allows a second turn
cheaply — otherwise note it in the report and skip.

## 4 · POSITIVE CONTROLS

| # | probe | RED when |
|---|---|---|
| M1 | repo-wide grep `"ayrı planlayıcı yok"` + `'no separate planner'` = **0 hits** (test asserts the grep) | reintroduce the string → red |
| M2 | 04 slice with planner keys present → `recorded` + verbatim summary | drop a field / fabricate `replans: 0` when absent → red |
| M3 | 04 slice, row present, keys absent → the postdates-thin note; NEVER the old permanent note | swap → red |
| M4 | 04 slice, row unreadable → the module's could-not-read state, distinct from M3's | conflate → red |
| M5 | 08 and 14 slices byte-identical to pre-phase (deep-equal fixture) | drift → red |
| M6 | UI: `mode:'dark'` renders the labeled dark state, not an error and not blank | delete the branch → red |

## 5 · DONE MEANS

1. `npm run typecheck:api` both projects separately, 0 + 0.
2. `npx vitest run` green, 0 skips, ≥ the count you measure at bootstrap
   (report it).
3. M1–M6 red→green evidence.
4. Push `phase/stage-context-truth-1`, open PR (`eval-canary` skips on PR;
   F-BW01 one ordered rerun allowed).
5. Report `docs/relay/PHASE-STAGE-CONTEXT-TRUTH-1-report.md`: anchor · files +
   line ranges · **the exact turn_done planner key name(s) you found** · both
   typecheck outputs · test counts · M-evidence · any byte contradicting this
   prompt (§2's line numbers shift easily — report, don't improvise).
6. **Do NOT merge** (RULE-25).

<!-- END · PHASE-STAGE-CONTEXT-TRUTH-1-v1 -->
