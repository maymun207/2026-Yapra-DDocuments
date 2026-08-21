# PHASE-B5-RETIRE-1 · v1
<!-- PHASE-B5-RETIRE-1-v1 · 2026-08-02 · S76 · Architect → AG.
     Owner disposition (named, on record): factory_registry drops NOW, inside
     v1 — "temiz bir nokta". Board B5 executes BEFORE the A8 tag so the seal
     contains the clean state. ONE branch, ONE merge; the DROP migration lands
     Operator-pending (ADR-005) — a separate Operator prompt follows the merge. -->

## §0 · HARD PRE-FLIGHT (live ground, Architect-read 2026-08-02)

Anchor: `origin/master` = `6350844e64e2d3f5e78bdc2a0ac720e32275fb83`
(Merge PHASE-A7-B6-MIN-DOCS-1) · 415 vitest files / 4620 tests (CI arbiter) ·
docVersion **rev 174**, 7 manifest tabs · prod
`dpl_Auep2zMMDNgQHZ5zBL6JRwN4VcDS` READY on the same SHA
(Architect-read via list_deployments) · 63 migration files.

Architect live census at the anchor (re-verify; STOP on mismatch):
- Non-test code referencing `factory_registry`:
  `stageClarify.ts` (ENTITY-FLOOR-1 fallback read, `scope:
  'floor=factory_registry'`) · `entityRegistrySync.ts` (mirror write) ·
  `entityDiscoverySync.ts` + `catalogSync.ts` (retirement comments) ·
  `clarificationLens.ts` (read + error string) ·
  `FactoryRegistryRepository.ts` · `factoryParamHint.ts` (comment) ·
  `observability/config.ts` (comment) · `shared/dbConstants.ts`
  (`FACTORY_REGISTRY`) · `scripts/runClarificationLens.ts` (display line).
- Tests: `stageClarify.test.ts` · `stageClarifyLayers.test.ts`.
- Migrations: created by `20260722130000_factory_registry.sql`; referenced in
  `20260725120000_backends_factory_param.sql` +
  `20260726120000_entity_registry_layers.sql`.
- MASTER-RUN check (register v78 §4): report the conclusion of run
  `30730054599` on `6350844e` in your §0 block (rule26 red there = known
  F-BW01 class — record, don't gate).

Branch: `phase/b5-retire-1`.

## §1 · BINDING CONSTRAINTS

1. **empty≠zero is sacred across the swap.** The floor read's four-way
   semantics (real-0 / missing / empty / non-chartable) and its
   "never a stamped absence" mirror posture must survey byte-for-meaning into
   the `entity_registry` read. Any place the old read distinguished
   no-rows-because-outage from no-rows-because-empty, the new read
   distinguishes it identically — named in your report.
2. **DB-first/code-floor intact:** the outage floor REMAINS a floor; the swap
   changes its source table, never its role.
3. **ADR-005:** the DROP migration is authored + idempotence-proven
   (disposable real-shape DB, double-apply) but NOT applied. `supabase db
   push` belongs to the Operator lane, after merge, under a FENCE-first
   prompt the Architect will issue.
4. **No history rewrite:** past migrations (`20260722130000_…` etc.) are
   NEVER edited; retirement is a NEW forward migration
   (`DROP TABLE IF EXISTS public.factory_registry` + its grants/policies,
   guarded, idempotent).
5. **`backends.entity_list_tool` — deterministic coupling rule, no
   discretion:** run a grep census for non-comment READ sites of
   `entity_list_tool` at the anchor. ZERO non-comment reads → include
   `ALTER TABLE … DROP COLUMN IF EXISTS entity_list_tool` in the SAME
   migration and remove its constants/types. ONE OR MORE reads → column
   STAYS, table-only migration, and the column becomes named v1.1 item
   ENTITY-LIST-TOOL-RETIRE-1 in your report. Paste the census either way.
6. **Zero governed-content writes · zero prompt/golden surface.** If any step
   appears to need one, STOP and hand back.
7. **Gate law:** eval-gate engine/stage order/interpreter untouched; if the
   floor swap touches gate-adjacent symbols, hash-pin the untouched set.
8. S37-2 (CI arbiter) · S66-1 (every self-verify zero needs a provable-fail
   control) · RULE-24 · house versioning.

## §2 · GATED SUB-PHASES

**G1 · Floor swap.** `stageClarify.ts` ENTITY-FLOOR fallback reads
`entity_registry` (FACTORY-layer rows) instead of `factory_registry`.
Pre-step (STOP condition): verify every field the floor read consumes has an
equivalent in `entity_registry`'s FACTORY rows; a missing field is a hand-back,
not an improvisation. `scope:` string updates to `floor=entity_registry`.
`clarificationLens.ts` + `runClarificationLens.ts` follow the same source
swap (lens obeys the laws it measures — S65-3).

**G2 · Sync retirement.** `entityRegistrySync.ts` stops mirroring into
`factory_registry`; `FactoryRegistryRepository.ts` deleted;
`shared/dbConstants.ts` `FACTORY_REGISTRY` removed; stale retirement comments
in `catalogSync.ts` / `entityDiscoverySync.ts` / `factoryParamHint.ts` /
`observability/config.ts` updated to the post-B5 truth (comments describe
TODAY).

**G3 · Tests.** `stageClarify*.test.ts` re-pointed at the new floor source;
add ONE test proving the outage-floor semantics survived (floor path returns
FACTORY entities from `entity_registry` when live discovery is down, with
empty≠zero intact). Suite green; report the count delta vs 4620.

**G4 · Migration.** `supabase/migrations/<ts>_retire_factory_registry.sql`
per constraints 3/4/5. Double-apply proof pasted (first apply: DROP …;
second apply: no-op, zero errors).

**G5 · Repo-clean proof.** `grep -rn factory_registry` over `api src shared
scripts docs .agents` = ZERO hits outside `supabase/migrations/**` (history
stays). Positive control: temporarily plant the token in a scratch file,
show the grep catches it, remove (S66-1).

**G6 · Docs + reseal if drifted.** CHANGELOG; if any mapped codeArea drifted
(turn/** WILL drift the Stage Cards + pipeline tabs), reseal in the same
branch — docVersion 174→175 disclosed; `check:doc-drift` [OK] at head.
Card reconcile: if a stage card mentions the factory floor source, its text
updates to the new truth (named diff).

**G7 · SELF-VERIFY (literal evidence, in order).** §0 census re-verified ·
run-30730054599 conclusion · G1 field-parity table · empty≠zero trace
(before/after semantics per branch of the four-way) · entity_list_tool
census + which arm of constraint 5 fired · suite counts + delta explanation ·
double-apply output · G5 zero-grep + its positive control · drift [OK] +
docVersion · forbidden-surface greps (no governed writes, no prompt/core).

## §3 · POST-MERGE SEQUENCE

1. Hand back → Architect RULE-25 review → GO (with CI gate per the S76
   amendment: build×2 + coverage; rule26 per the one-rerun flake discipline)
   → merge `--no-ff`, push, remote hash.
2. Architect issues OPERATOR-APPLY-B5-RETIRE (FENCE-first, G-gates,
   pre-flight row-count read, `supabase db push`, post-apply absence probe).
3. Post-apply Architect proof: prod healthy on the new master; clarify floor
   exercised via lens; THEN the A8 tag ceremony opens on the clean point.

## TAIL ANCHOR (S61-3)
This prompt ends after §3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · PHASE-B5-RETIRE-1-v1 · 2026-08-02 -->
