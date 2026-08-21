# PHASE F214-FLOOR-SYNC-1 · v1
<!-- PHASE-F214-FLOOR-SYNC-1-v1 · 2026-07-30 · S71 · v1-path item A6.
     Author lane: AG. Branch: phase/f214-floor-sync-1 off master @ the anchor
     below. Merge: --no-ff, message Architect-authored VERBATIM at GO (S30-2).
     ZERO migrations · ZERO governed writes · ZERO gated publishes (freeze safe). -->

## §0 · LIVE GROUND THIS PHASE DEPENDS ON (S65-1 — re-verify, never assume)

- Anchor: `origin/master` = `523c44b4a893e308462f146d2a52b2aa9c19520c` · 387 test
  files / 4318 tests (CI-arbitrated) · docVersion rev 162.
- The finding (F214, register v71 §7): the outage/zero-rows CODE FLOOR of the
  routing catalog and the LIVE published catalog have diverged — a READ-set
  divergence only. ADR-011 already binds writes at the floor (`seedExposureOf`
  filters the floor path), so this is availability-under-outage, never authority.
- Definition sites (S30-3):
  - Floor: `api/cwf/_lib/toolCategories.ts:156` `CATEGORIES` (module array) —
    the ADR-011 ROOT surface, doc-mapped in `public/architecture/manifest.json`
    (codeAreas) → **this phase budgets a reseal**.
  - Manifest reader: `toolCategories.ts:1494` `getRoutingCategoryManifest()`.
  - Consumer: `api/cwf/_lib/knowledge/resolveToolCategories.ts` — DB-first;
    `:54` zero-rows → FLOOR, `:66` fetch-fail → floor; `source: 'db' | 'floor'`.
    The floor serves ONLY on outage/zero-rows; production turns with DB rows
    present are byte-identical by construction.
  - Guard: `api/cwf/__tests__/catalogWriteLock.test.ts` (ADR-011 at the floor,
    asserted against the REAL `seedExposureOf`).
- Governing law (already in the file's own comments, `toolCategories.ts:154`):
  **F185 — the floor is TODAY'S state, never a new one.** Sync direction is
  therefore one-way: floor := today's live published catalog. No editorial
  changes ride this phase.

## §1 · PREMISE BLOCK (mandatory — STOP on any red)

**P-A · REACHABILITY.** (1) The floor path is reachable exactly at
`resolveToolCategories.ts:54/:66`; grep-confirm both branches exist as
described before building. (2) Live-read reachability: the measurement script
runs with `node --import tsx --env-file=.env.local` (the existing
`seed:*`/`reconcile:tools` pattern in `package.json` — S32-1 verified). If
`.env.local` is absent or the read fails in your environment, **STOP and
report** — do not substitute assumed data.

**P-B · PROVENANCE.** Floor side (Architect-computed today from `523c44b4`,
regex over `CATEGORIES` + the `CANONICAL_METRIC_TOOLS` spread): **12
categories, 80 distinct tool names**. Re-derive via the REAL
`getRoutingCategoryManifest()` — if your number differs from 80, REPORT the
difference; do not silently adopt either value. Live side (S70 Operator read,
register v71 §1): **12 published categories · 108 slots · 97 distinct tools ·
ZERO write tools** — re-read live in G1; the register value is a prior, not a
measurement. The historic "42 floor-only / 20 live-only" (F190 era) is
**STALE** — CATALOG-WRITE-LOCK-1 removed 35 write tools from the floor after
it was taken. Do not carry those numbers anywhere.

**P-C · SATISFIABILITY.** Mirroring live into the floor cannot violate ADR-011:
the live catalog holds zero write tools (Operator-verified) AND the
`seedExposureOf` floor filter stays in place — belt and suspenders. The gate,
the DB, and every governed row are untouched: this phase is code + one script,
zero migrations, zero publishes. If the G1 measurement finds a WRITE-exposed
tool in any live published category, that is a NEW critical finding — STOP,
report, do not sync it into the floor.

## §2 · BINDING CONSTRAINTS

1. **F185 law:** the synced floor equals the live published catalog — category
   names, keyword lists, tool lists — exactly. No additions, no "while we're
   here" improvements, no reordering that changes semantics.
2. **Repeatability (automation-first):** the sync is produced by a script, not
   by hand-editing 97 tool names. The script has two modes: `--report`
   (read-only diff: floorOnly[], liveOnly[], per-category keywordDiff, counts)
   and `--write` (regenerates the floor definition byte-stably — same input ⇒
   byte-identical output, deterministic ordering). Implementation shape (fenced
   generated region inside `toolCategories.ts` vs. an extracted data module) is
   YOUR call within these constraints; whichever you choose, `CATEGORIES`
   remains the single floor definition and `resolveToolCategories`'s existing
   default/consumers change ZERO.
3. **ADR-011 stays test-held:** `catalogWriteLock.test.ts` green, still
   asserting against the real `seedExposureOf`. If your sync mechanism could
   ever admit a write tool, the test must be the thing that fails.
4. **Category-order independence:** before any reorder, grep-verify no consumer
   depends on `CATEGORIES` array order beyond union semantics
   (`matchCategories` produces a set). If an order dependence exists, preserve
   order and report it.
5. **Secrets:** env names only, never values (ADR-007). The script logs counts
   and names, never credentials, never row payloads beyond category/tool/keyword.
6. **Reseal in-phase:** `toolCategories.ts` is doc-mapped. Run
   `npm run check:doc-drift`; reseal EVERY tab it flags (a newly created file
   can join the map — the S70 reseal-scope lesson). Two-commit pattern if the
   reseal mixes with code.
7. **A5 forward note (carry into the script header):** the freeze-lift
   publishes (tools.rule.1/6 v2) will re-diverge the floor by exactly those
   rules; the named follow-up is one `--report` + `--write` re-run inside A5.
   This phase makes that a one-command operation; it does NOT pre-apply them.

## §3 · GATES

**G1 · MEASURE.** Build the script; run `--report` against live. The report is
this phase's replacement for every stale number: floorOnly / liveOnly /
keywordDiff by name, with counts. Paste it VERBATIM into the self-verify block.
The live read must go through the SAME repository read
`resolveToolCategories.ts` uses (S70-3: the consuming path is the witness —
no parallel query shape).

**G2 · SYNC.** Run `--write`; commit the regenerated floor. Then re-run
`--report`: it must print zero divergence. Idempotence: a second `--write` on
the synced tree produces a byte-identical file (prove with `git diff --stat`
empty).

**G3 · GUARDS + TESTS.** (a) `catalogWriteLock.test.ts` green unmodified (or
extended, never weakened). (b) New script-layer tests in `api/cwf/__tests__/`
(vitest `include` covers this path, NOT `scripts/**`): idempotence
(run-twice byte-compare) AND a **positive control** (S66-1): inject a synthetic
divergence into a fixture floor → `--report` MUST flag it; a diff tool whose
zero cannot fail proves nothing. (c) The consuming-path witness: a test drives
`resolveToolCategories`'s zero-rows branch and asserts the offered floor set
equals the synced mirror set (this is F214's actual repair, exercised through
the actual branch). (d) Full suite + `npm run typecheck:api` green; report
test-file/test counts.

**G4 · SEAL.** `npm run check:doc-drift` clean after reseal; `npm run build`
green. Push branch. NO merge — GO comes after the Architect's RULE-25 fresh-
clone review, with the merge message authored then.

## §4 · SELF-VERIFY (literal evidence, in this order)

1. `git rev-parse HEAD` + branch name.
2. P-A grep outputs (both floor branches; env-file precedent line from
   package.json).
3. G1 `--report` output VERBATIM (pre-sync).
4. G2 post-sync `--report` (zero divergence) + idempotence `git diff --stat`.
5. G3 test run tail: suite totals, the positive-control test shown RED-capable
   (run it once with the injected divergence unfixed in a fixture to show the
   failure message, then the green run).
6. Grep proof: zero write-exposed tools in the synced floor
   (`seedExposureOf`-derived, not hand-listed).
7. `check:doc-drift` output post-reseal; list of resealed tabs.
8. Explicit statements: "ZERO migrations · ZERO governed writes · ZERO
   publishes · freeze untouched."

## §5 · STOP CONDITIONS

Missing/failing env for the live read (P-A) · floor census ≠ 80 unexplained
(P-B — report, then proceed only with the measured value) · ANY write-exposed
tool found live-published (P-C — critical finding, no sync) · an order-dependent
consumer of `CATEGORIES` (report before touching order) · gate/test weakening
of any kind.

**Post-merge proof read (S63-1, Architect-owned):** fresh clone of merged
master → `--report` prints zero divergence with the positive control still
red-capable; production deployment READY; one live turn evidencing normal
DB-first routing (`source: 'db'`, behavior unchanged).

<!-- END · PHASE-F214-FLOOR-SYNC-1-v1 · 2026-07-30 -->
