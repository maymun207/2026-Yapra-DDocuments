# PHASE-B5-RETIRE-1 · v1_1
<!-- PHASE-B5-RETIRE-1-v1_1 · 2026-08-02 · S76 · Architect → AG. Supersedes v1
     after the §0 STOP (correct-by-law). Owner disposition unchanged:
     factory_registry drops NOW, before the A8 tag. ONE branch, ONE merge;
     DROP migration lands Operator-pending (ADR-005). -->

## §0 · PRE-FLIGHT (delta from v1; v1's verified rows stand)

Anchor unchanged: `6350844e64e2…` · 415/4620 · rev 174, 7 tabs · 63
migrations · MASTER-RUN `30730054599` = ALL GREEN (recorded; no F-BW01 red).
Census correction ACCEPTED and finding minted: **PARAMHINT-MIRROR-READ-1** —
`factoryParamHint.ts:46` imports `FactoryRegistryRepository`; `:145`
`readActiveValuesFromRegistry` reads `listByBackend(backendId)` filtered
`status==='active'`, sole caller `stageTools.ts` (live turn path). Your
fail-open silent-regression analysis is endorsed; this phase dispositions the
read (G1b below), closing the finding by design. Your G1 parity pre-work is
adopted as evidence base (four fields; backfill `fr.factory_id→entity_id`,
`display_name`, `status`, timestamps; `EntityRegistryRepository
.listByBackendLayer(backendId,'factory')` as the natural read).
Branch: `phase/b5-retire-1`.

## §1 · BINDING CONSTRAINTS (v1 §1 carries verbatim, with three RULINGS)

**RULING R-A (constraint 5 arm — explicit, deterministic):** the census
point moves from at-anchor to **post-G2 tree**: after G2 retires the sync
module, re-run the non-comment READ census for `entity_list_tool` ON THE
BRANCH and paste it. ZERO reads then (expected — your at-anchor census shows
all reads live inside the retired module + its test) → **arm 1 fires: DROP
COLUMN IF EXISTS `backends.entity_list_tool` in the SAME migration**, its
constants/types removed. Any surviving read → arm 2 (column stays,
ENTITY-LIST-TOOL-RETIRE-1 named for v1.1). This honors both the no-discretion
rule and the project's own record (the 20260726120000 header + ENTITY-FLOOR-1
CHANGELOG naming the column's retirement as B5) and the owner's "temiz nokta".

**RULING R-B (G5 zero-grep scope):** literal ZERO over `api src shared
scripts` (code). Doc surfaces split by tense, never by convenience:
- ADR bodies (ADR-009 lines 139/151): NEVER edited (S37-1). Classified
  residual: `historical-ADR-body`.
- `.agents/CHANGELOG.md` history entries: never rewritten. Classified:
  `history`. The NEW G6 entry naming the retired table is expected and
  exempt by definition.
- KB `SKILL.md` lesson paragraphs: past-tense lessons STAY (classified
  `teaching-history`); any PRESENT-TENSE claim about the table/floor updates
  to post-B5 truth (named diff).
G7 lists EVERY residual hit with its classification; the S66-1 positive
control applies to the code-scope grep.

**RULING R-C (docs sweep is in-scope):** v1's census omission of
`docs/.agents` was an Architect gap; your three-surface inventory is adopted
as the authoritative doc-residual baseline for G7.

## §2 · GATED SUB-PHASES (v1 structure + one addition)

**G1a · Floor swap** — as v1 G1, using your verified parity: floor read →
`entity_registry` FACTORY-layer via `listByBackendLayer`; `scope:` →
`floor=entity_registry`; lens + `runClarificationLens` follow; four-way
empty≠zero branch map pasted (your one-to-one claim, now as evidence).

**G1b · Hint-read swap (NEW — closes PARAMHINT-MIRROR-READ-1):**
`factoryParamHint.ts` `readActiveValuesFromRegistry` →
`EntityRegistryRepository.listByBackendLayer(backendId,'factory')` filtered
`status==='active'`; fail-open posture PRESERVED (catch → [] stays — the
degrade-silent property is acceptable for a hint, but the SOURCE must live).
Add one test: hint values resolve from `entity_registry` rows; and one
negative control: with the repository read throwing, hint returns [] (the
documented fail-open, now proven rather than assumed).

**G2 · Sync retirement** — as v1 (repository deleted, mirror write removed,
`FACTORY_REGISTRY` constant gone, comments updated to post-B5 truth), PLUS
`entity_list_tool` write sites at `entityRegistrySync.ts:50,54` + its test
retire with the module. Then run RULING R-A's post-G2 census.

**G3 · Tests** — as v1 (floor test + count delta) plus G1b's two tests.

**G4 · Migration** — as v1, shaped by R-A's fired arm. Double-apply proof.

**G5 · Repo-clean proof** — per RULING R-B. Zero over code scope + classified
residual table for doc surfaces + positive control.

**G6 · Docs + reseal** — as v1 (CHANGELOG; expected drift: Stage Cards +
pipeline-mapped tabs from turn/** edits; docVersion 174→175 disclosed;
`check:doc-drift` [OK]; card text updates as named diffs if any card names
the floor source).

**G7 · SELF-VERIFY** — v1's list, updated: §0 delta re-verified · G1a parity
table + four-way trace · G1b test pair output · R-A post-G2 census + fired
arm · suite counts + delta · double-apply output · R-B residual
classification table + code-scope zero + positive control · drift [OK] +
docVersion · forbidden-surface greps.

## §3 · POST-MERGE SEQUENCE — unchanged from v1
(RULE-25 review → GO with S76 CI discipline → merge → OPERATOR-APPLY prompt
from the Architect → post-apply proof incl. lens-exercised floor AND a live
hint check → A8 tag ceremony on the clean point.)

## TAIL ANCHOR (S61-3)
This prompt ends after §3. If the last line you can see is not this
sentence, the relay was truncated — request a re-send before acting.
<!-- END · PHASE-B5-RETIRE-1-v1_1 · 2026-08-02 -->
