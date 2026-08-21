# PHASE PROMPT · ROUTING-FLOOR-BACKEND-1 · v2 — lane AG-2 (single-lane re-issue)

<!-- PHASE-ROUTING-FLOOR-BACKEND-1-v2 · 2026-08-10 · S92. Supersedes v1, whose
     STOP report was accepted IN FULL — all three conditions were correct.
     This re-issue answers §7 of that report point by point.
     SELF-CONTAINED (S91-4). If disk contradicts this prompt, STOP + report the byte. -->

## 0 · BOOTSTRAP

```bash
git clone https://github.com/maymun207/cwf_yaprak.git && cd cwf_yaprak
git fetch origin && git rev-parse origin/master
# MUST print bceb58c94af3bf10f37bde106ad9f32b83707ecf  (CANARY-VERDICT-TRUTH-1 merged)
git checkout -b phase/routing-floor-backend-2 origin/master
npm ci
```

Reuse of your v1 branch is NOT wanted — fresh branch from the new anchor. Your
v1 STOP report stays on `phase/routing-floor-backend-1` as the historical
record.

**Fence (v1 §3's 22 compile-breaking files are now IN — the parallel-lane
constraint is gone):**
- `api/cwf/_lib/toolCategories.ts` · `api/cwf/_lib/routing/floorSyncCore.ts` ·
  `api/cwf/_lib/knowledge/resolveToolCategories.ts` ·
  `api/cwf/_lib/knowledge/gate/evalGate.ts` ·
  `api/cwf/_lib/knowledge/reference/referenceData.ts` ·
  `api/cwf/_lib/knowledge/runRouteDerivation.ts` ·
  `api/cwf/_lib/replay/categorySlice.ts` ·
  `scripts/syncRoutingFloor.ts` · `scripts/genArchitectureFacts.ts` ·
  `scripts/reconcileToolGovernance.ts` ·
  `api/admin/router-proposals.ts` · `api/admin/routing-curation.ts`
- every test file your v1 §3b enumerated, plus new tests
- **`src/**` stays FORBIDDEN** — §2 is designed so you never need it. Lane AG-1
  runs in parallel on `api/admin/stage-context.ts`,
  `api/cwf/_lib/replay/stageContextSlice.ts`, and named `src/**` stage-context
  surfaces. If you find yourself needing any of those: STOP + report.

**Hard boundaries:** NO migration · NO governance writes · armes's 12
categories move address **byte-identically** · no squash.
**Typecheck gate (your §6, adopted):** `npm run typecheck:api`, and run BOTH
projects SEPARATELY before reporting — the `&&` short-circuits.

## 1 · WHY — unchanged from v1, which you verified byte-by-byte

Flat `CATEGORIES` (`toolCategories.ts:164-490`, generated `[F214-FLOOR-SYNC]`
block, 12 ceramic categories) is the platform-level outage floor for EVERY
backend, via the `matchCategories` default arg (:1049) and the backend-blind
`getRoutingCategoryManifest()` (:1733). The generator chain has no backend
concept. A non-armes backend degrades onto ceramic vocabulary.

## 2 · THE DESIGN — v1's design + the four rulings your STOP report requested

**A · Backend-keyed floor** (unchanged from v1):
```ts
const FLOOR_BY_BACKEND: Record<string, ToolCategory[]> = { armes: [ /* today's 12, byte-identical */ ] };
```
No flat platform list survives. Generator renders this shape; byte-stable;
STOP conditions + ADR-011 belt unchanged.

**B · Accessor** (unchanged): `getRoutingCategoryManifest(backendId: string)`;
unknown key → `categories: []`; `alwaysInclude` unchanged. **Required, not
optional** — your §3's note is ratified: optional-with-default is the hard-code
at the type level. Fix every compile break the required param causes; that is
what the widened fence is for.

**C · `matchCategories` default dies** (unchanged; your §7 confirmed it
in-fence — four internal call sites already pass explicitly).

**D · RESTATED against the union-resolution that actually exists** (your STOP 2):
`resolveToolCategories()` resolves ALL enabled backends into one union — there
is no singular "the backend it was resolving," so v1's sentence is void. The
ratified restatement:
- The FLOOR the resolver serves (unconfigured / outage / zero rows / fetch
  fail) becomes **the union of `FLOOR_BY_BACKEND` over the backend ids it was
  about to read** (the `backendIds` list it already computes — registry read,
  seed fallback). Today that union is byte-identical to the old flat floor
  (armes is the only key), so behavior is unchanged while the ADDRESS is now
  per-backend. A future non-armes backend's outage no longer inherits ceramic
  words.
- `coveredBackendIds` on the floor slice: **`null` dies.** The per-backend
  floor gives the floor slice real attribution — the keys of the floor entries
  actually served. Update the `:40-60` docblock (which documented `null` as
  forced by the flat floor — that force is what this phase removes) and every
  caller that special-cases `null`. **This is the phase's sharpest new DONE
  criterion: the floor path stops answering "attribution unknowable."**

**E · Generator per-backend** (unchanged from v1). The live read is already
per-backend attributable (`r.backend_id` on every row — your §7 named the
seam); group by it when rendering.

**F · The two admin call sites — RULED:**
- `router-proposals.ts:153`: pass **`'armes'` explicitly**, with this comment
  bound to the literal ten lines down: `// armes-scoped BY EXISTING DESIGN:
  createDraft at :163 hardcodes backendId:'armes'; this call declares the same
  scope. ROUTING-FLOOR-BACKEND-1 ruling — widening this endpoint to other
  backends is a separate, owner-sequenced item.` You were right that silently
  passing it would be the forbidden move; DECLARING it, bound to the existing
  literal, is the honest present tense. Named in your report so the owner sees
  the scoping.
- `routing-curation.ts:81` (`?view=reference`): serve the **union across
  `FLOOR_BY_BACKEND`** in the EXISTING response shape
  `{ categories, alwaysInclude }` — an internal `getRoutingFloorReference()`
  helper. Today: byte-identical response (armes only), **zero `src/**`
  change** — which is why the fence can exclude it. The helper's docblock says
  what it is: the whole code floor, all backends, admin reference view.

## 3 · POSITIVE CONTROLS

| # | probe | RED when |
|---|---|---|
| M1 | `getRoutingCategoryManifest('superset')` → `[]` + non-empty alwaysInclude | mutate to serve armes → red |
| M2 | `('armes')` → 12 categories deep-equal to an anchor-captured fixture; `--report` CLEAN against live (run it — `.env.local` must be copied into a worktree, your §7 note) | drift → red |
| M3 | default arg reintroduced on `matchCategories` | compile red |
| M4 | outage: resolver floor = union of the read-list's floors; armes-only list ⇒ byte-equal to old flat floor; superset-only list ⇒ `[]` + ALWAYS_INCLUDE, `offered > 0` | collapse either → red |
| M5 | generator: `--write` twice ⇒ second write empty; write-exposed STOP still exits 1 | remove → red |
| M6 | floor slice `coveredBackendIds` is a real Set (the served keys), never `null`; a caller still special-casing `null` for the floor | reintroduce `null` → red |
| M7 | reference view: response JSON deep-equal to pre-phase response at the current live state | shape drift → red |

## 4 · DONE MEANS

1. `npm run typecheck:api` — both projects separately, 0 + 0.
2. `npx vitest run` green, 0 skips, ≥ the anchor count you measure at bootstrap
   (report it — the canary merge moved it above 519/6355).
3. `npm run check:tenant-zero` green **in a clean worktree** (your §7 false-red
   note stands); paste output.
4. M1–M7 red→green evidence.
5. Push `phase/routing-floor-backend-2`, open PR against master
   (`eval-canary` skips on PR; F-BW01 one ordered rerun allowed).
6. Report `docs/relay/PHASE-ROUTING-FLOOR-BACKEND-2-report.md`: anchor · files
   +line ranges · both typecheck outputs · test counts · M-evidence · the
   `coveredBackendIds` docblock diff · any byte contradicting this prompt.
7. **Do NOT merge** (RULE-25).

<!-- END · PHASE-ROUTING-FLOOR-BACKEND-1-v2 -->
