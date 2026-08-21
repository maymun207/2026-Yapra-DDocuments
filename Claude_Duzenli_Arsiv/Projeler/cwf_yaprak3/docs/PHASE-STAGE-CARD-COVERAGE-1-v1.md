# PHASE-STAGE-CARD-COVERAGE-1 · v1  (lane AG-2)

PRECONDITION (S47-1): origin/master == c1e3f5f9…, docVersion rev 222, 517 test
files, origin phase/* == 27. Verify from a FRESH FULL CLONE (RULE 25).

LANE FENCE — ABSOLUTE: you edit ONLY `src/components/admin/**`, and NOT
`BenchTab.tsx` (AG-1 holds one comment line there). You do NOT touch `api/**`,
`shared/**`, `scripts/**`, `supabase/**`, or `public/architecture/manifest.json`.

WHY THIS PHASE: the Stage Cards are the system's own account of itself to an
admin. Several now describe a system that no longer exists. A doc surface that
lies is worse than an absent one, because it is BELIEVED.

## RECON GIVEN (Architect measured at c1e3f5f — verify, do not assume)

- `src/components/admin/stagesRegistry.ts` · `STAGES` holds **15** cards
  (00–14). The bootstrap says 16; 15 is what the file contains. Confirm and
  report the number you measure.
- `adminTabs.ts` `TABS` holds **18** tabs (…, 'health', 'bench').
- Card **04 `planning`** is factually wrong in FIVE places now that PLANNER-0
  and `system.plan_template` (5 published rows) are live: `purpose` ("Ayrı bir
  planlayıcı yoktur"), `tweak` ("Bugün burada ayar yüzeyi yok"), `sources` (the
  `'—' / Ertelenmiş bağlayıcı` row), `deep[0]` ("Neden boş bırakıldı?"), and
  `deep[1]` (a prophecy that came true and must become present tense). `try`
  is half-true and needs re-pointing at the planner's own evidence.
- Card **05 `memory-retrieval`**: the `Hata yokluğu başarı değildir` law is
  STALE (LANDING-YIELD-TRUTH-1 changed both of its clauses). A three-law
  replacement SKELETON is at
  `docs/relay/PHASE-LANDING-YIELD-TRUTH-1-report.md:157` — it is ELLIPSED, not
  drop-in. WRITE the three laws out against the code; do not paste a skeleton
  with `…` in it.

## G1 · THE COVERAGE INSTRUMENT (pattern reuse, not invention)

Build `stageCardCoverage.ts` + its test on the **`healthCoverage.ts` /
`healthCoverage.test.tsx` precedent (M1F4)**: the module holds the item list;
the test FAILS if any item is in neither state —

  (a) DESCRIBED and true against code, or
  (b) a NAMED deferral with an owner.

Mutation-prove it three ways, including that an item which INVENTS a
description reds.

## G2 · THE COVERAGE RULE, NAMED (this is the ruling you were told would come)

An organ is COVERED when a card describes it and every claim in that card is
true against the shipped code. The 15 cards describe PIPELINE STAGES; the
TEZGÂH (bench, the 18th tab) is not a pipeline stage and therefore takes a
**NAMED DEFERRAL**, not an invented card — homed at `BENCH-KULLANIM-DOC-1`
(register v94 §1 H5, the User Docs surface). Record it as a deferral in the
coverage list so it can never fall out silently; do not manufacture a stage
card for it.

## G3 · THE JUDGEMENT DISCIPLINE (the trap in this phase)

A telltale scan (stale phrases: "yoktur", "ertelendi", "geldiği gün",
"bugün ... yok", "ayrı bir ... yoktur") produces CANDIDATES ONLY. No verdict
leaves this phase without a card-versus-code read at the byte. A card marked
"still true" on the strength of a regex is exactly the failure this phase
exists to fix. Every verdict in your report names the file:line you read.

## G4 · THE REWRITES

Cards 04 and 05 at minimum. Any other card your card-vs-code pass convicts:
fix it in the same phase and name it — a phase that finds a lie and files it
for later leaves debt (S61-2).

WORDING LAW (inherited, do not break): the core claim on card 05 — the system
does not LEARN knowledge; the only learning is word→tool mapping; knowledge
changes only through 06's gated path — stays intact.

## DOC / SEAL — YOU DO NOT MINT A NUMBER (S90-1)

`src/**` is mapped by NO tab, so `check:doc-drift` should stay green and no
reseal should be required. Run `npm run build` (it ends in check:doc-drift) and
report the result. IF the seal moves anyway: **STOP and report. Do not write a
docVersion string.** AG-1 is minting one this wave; two lanes writing the same
scalar merge without conflict and one revision evaporates — that is S90-1, and
this brief closes it by construction rather than by luck.

## STOP-FOR-REVIEW

Report: the measured card count; every card verdict with the file:line that
justified it; the coverage list with its named deferral; mutations and their
killing tests; suite before→after measured in the same fresh clone; the
doc-drift result; and anything this brief got wrong.
