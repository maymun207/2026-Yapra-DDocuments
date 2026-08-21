# PHASE PROMPT · ROUTING-FLOOR-BACKEND-1 · v1 — lane AG-2

<!-- PHASE-ROUTING-FLOOR-BACKEND-1-v1 · 2026-08-10 · S92.
     SELF-CONTAINED (S91-4): you canNOT see project files. Everything binding
     is embedded here. If anything on disk contradicts this prompt, STOP and
     report the byte — do not improvise. -->

## 0 · BOOTSTRAP (verbatim)

```bash
git clone https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git rev-parse origin/master   # MUST print the anchor below
git checkout -b phase/routing-floor-backend-1 origin/master
npm ci
```

Anchor: `00062c7871a994fea3d63a79ba3c918b5201f263`. If `origin/master`
differs, STOP and report — the line pins below are stale.

**Your file fence (writes allowed ONLY here):**
- `api/cwf/_lib/toolCategories.ts` (+ its tests)
- `api/cwf/_lib/routing/floorSyncCore.ts` (+ tests)
- `api/cwf/_lib/knowledge/resolveToolCategories.ts` (+ tests)
- `scripts/syncRoutingFloor.ts`
- `api/admin/router-proposals.ts` and `api/admin/routing-curation.ts` — ONLY
  the `getRoutingCategoryManifest` call sites (:153 and :81 respectively)
- new test files for the above

**Lane AG-1 runs in parallel** with fence `api/cwf/_lib/replay/**`,
`api/cwf/_lib/knowledge/gate/goldenPublishContract.ts`, `api/admin/eval-ci.ts`,
`api/admin/rollouts.ts`, `.github/workflows/build-test.yml`, and named verdict
surfaces in `src/**`. Touch NOTHING there — including ALL of `src/**`. Disjoint
fences are what make the wave safe (S88-1). If you need a file in the other
lane's fence, STOP and report.

**Hard boundaries:** NO migration. NO Operator step. NO vocabulary changes —
armes's 12 categories move ADDRESS byte-identically, their content is
untouched. No governance writes. No squash.

## 1 · WHY (the defect, read live at the anchor)

`api/cwf/_lib/toolCategories.ts:164-490` is a GENERATED block
(`[F214-FLOOR-SYNC:BEGIN/END]`, produced by `scripts/syncRoutingFloor.ts
--write`): **12 ceramic-factory categories** — `'oee'` (:169), Turkish ceramic
vocabulary (`'üretim'`, `'hat'`, `'reçete'`, `'parti'`, …), ~100 armes tool
names — declared as ONE flat platform-level constant:

```ts
const CATEGORIES: ToolCategory[] = [ /* 12 ceramic categories */ ];
```

It is live in two places:

1. `matchCategories(message, learned, categories: ToolCategory[] = CATEGORIES)`
   (:1049) — the DEFAULT argument. On outage/zero-rows, ANY backend being
   routed falls onto this ceramic floor.
2. `getRoutingCategoryManifest()` (:1733) — no backend parameter:
   ```ts
   export function getRoutingCategoryManifest(): { categories: ToolCategory[]; alwaysInclude: string[] } {
       return { categories: CATEGORIES.map(/* copy */), alwaysInclude: [...ALWAYS_INCLUDE] };
   }
   ```
   `resolveToolCategories()`'s outage path serves this flat floor, and the
   semantic router's prompt renders it.

The generator chain (`syncRoutingFloor.ts` → core logic in
`api/cwf/_lib/routing/floorSyncCore.ts`: `diffCatalogs`, `renderCategoriesRegion`,
`spliceCategoriesRegion`, `findWriteExposed`, `formatReport`) contains **no
backend concept anywhere**.

**Consequence:** a non-armes backend (superset today; any customer-#2 backend
tomorrow) gets routed with CERAMIC vocabulary the moment the DB floor engages.
This is the ceramic vocabulary's last refuge in platform code — the tenant-zero
exit grep does not reach it because these are literals, not references.

## 2 · THE DESIGN (owner-ratified — implement exactly this)

Law basis you are executing, not deciding: mechanism preserved, ADDRESS moves
per-backend (the S90 METRIC-REGISTRY precedent); platform floor EMPTY
(tenant-zero); floor := today's published state (F185); ALWAYS_INCLUDE is
sacred on every path (§2.3); the generator's STOP conditions and ADR-011
write-exposure belt survive unchanged.

**A · The generated block becomes backend-keyed.**
```ts
const FLOOR_BY_BACKEND: Record<string, ToolCategory[]> = {
    armes: [ /* today's 12 categories, byte-identical content */ ],
};
```
Only `armes` is generated (it is the only backend with published
`tool_category` rows). **No flat platform-level category list survives.** The
fenced markers stay; the region content changes shape.

**B · The accessor takes a backend.**
```ts
export function getRoutingCategoryManifest(backendId: string): { categories: ToolCategory[]; alwaysInclude: string[] }
```
Unknown/absent key → `categories: []`. `alwaysInclude` is backend-independent
and returned as today. An empty floor is NOT an error — it is the honest state
"this backend has no code-floor vocabulary". (Note: absent key and empty list
mean the same thing here BECAUSE the generator only writes backends that have
published rows — pin that equivalence in a test comment, don't blur it.)

**C · The default argument DIES.**
`matchCategories`'s third parameter becomes REQUIRED. The internal call sites
(:1387, :1394, :1477) already pass `categories` explicitly — the default was
the residual hazard. After this phase the compiler forces every caller to name
its slice (the written intent of `RoutingCoreInput` at :1118-1123).

**D · The outage path stays loyal to its backend.**
`resolveToolCategories()`: wherever it serves the floor (unconfigured / outage /
zero published rows), it serves the floor OF THE BACKEND IT WAS RESOLVING —
armes degrades to the ceramic floor; superset degrades to `[]` +
ALWAYS_INCLUDE, and `offered` stays > 0 via ALWAYS_INCLUDE. Read the file
first and report its current resolution signature in your report; if the
backend id is not already in its scope, thread it from the caller — do NOT
invent a module-level default.

**E · The generator becomes backend-aware.**
`floorSyncCore.ts` render/splice/diff operate on the backend-keyed region;
byte-stability holds (same input ⇒ byte-identical file; `--write` twice ⇒ zero
diff); `--report` prints per-backend diffs; the floor-sourced-live STOP and
the write-exposed STOP fire exactly as today.

**F · Admin call sites thread the id.**
- `api/admin/router-proposals.ts:153`
  (`getRoutingCategoryManifest().categories.find(...)`)
- `api/admin/routing-curation.ts:81`
  (`res.status(200).json(getRoutingCategoryManifest())`)

The backend id comes from the call site's EXISTING context (the proposal row /
the request). **If a call site genuinely has no backend id in scope: STOP and
report the byte — do not invent a fallback.** A `?? 'armes'` default would
re-embed the tenant this phase exists to remove; it is the one forbidden move.

## 3 · POSITIVE CONTROLS (each exists as a test; each shown red→green in the report)

| # | mutation / probe | must go RED |
|---|---|---|
| M1 | `getRoutingCategoryManifest('superset')` → `categories: []`, `alwaysInclude` non-empty; mutate to serve the armes floor → red (tenant-zero at runtime) |
| M2 | `getRoutingCategoryManifest('armes')` → today's 12 categories **byte-identical** (names + keywords + tools deep-equal against a fixture captured from the anchor); and `syncRoutingFloor.ts --report` exits CLEAN against live (paste the output) |
| M3 | Reintroduce the default argument on `matchCategories` → compile/test red |
| M4 | Outage simulation: armes resolution falling to the floor yields the ceramic floor; superset resolution falling to the floor yields `[]` + ALWAYS_INCLUDE with `offered > 0`; collapse either → red |
| M5 | Generator byte-stability: `--write` twice ⇒ second run writes nothing; and the write-exposed STOP still exits 1 on a seeded write-exposed tool → red when removed |

## 4 · DONE MEANS (in order)

1. `npx tsc --noEmit` → 0 errors.
2. `npx vitest run` → green, **0 skips**. Anchor baseline: 518 files / 6322
   tests — yours must be ≥; report exact numbers.
3. `npm run check:tenant-zero` (the existing CI gate) → green; paste its output.
4. M1–M5 red→green evidence in the report (paste each failing assertion line).
5. `git push -u origin phase/routing-floor-backend-1`
6. Open a PR against `master`. `eval-canary` is structurally SKIPPED on PR runs
   (spend fence) — not a failure. `rule26` Playwright has a known flake
   (F-BW01): one ordered rerun with matching signature is acceptable; report if
   it fires.
7. Report at `docs/relay/PHASE-ROUTING-FLOOR-BACKEND-1-report.md` (committed on
   the branch): anchor SHA · file list with line ranges · test counts
   before/after · M1–M5 evidence · `resolveToolCategories`'s resolution
   signature as found and how the backend id reached it · how the id reached
   each admin call site (or the STOP report if it could not) · any byte where
   reality contradicted this prompt.
8. **Do NOT merge.** The Architect reviews on a fresh clone (RULE-25) and
   authors the merge message.

<!-- END · PHASE-ROUTING-FLOOR-BACKEND-1-v1 -->
