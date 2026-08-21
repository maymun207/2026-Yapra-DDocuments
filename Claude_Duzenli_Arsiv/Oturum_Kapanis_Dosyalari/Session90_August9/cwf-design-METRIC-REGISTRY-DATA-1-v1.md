# CWF Design Note — METRIC-REGISTRY-DATA-1 · v1

<!-- cwf-design-METRIC-REGISTRY-DATA-1-v1 · 2026-08-09 · S90.
     OWNER-RATIFIED. This note is the binding carrier of the S90 ruling below.
     It enters register v94 and rollout by name. GOLDEN LEDGER: this item may
     leave carriers ONLY via CLOSED@evidence. -->

## §0 · THE OWNER RULING (S90 — verbatim substance, binding)

> Backend-specific deed words (armes's `oee · fire · throughput`) living
> hard-coded inside the codebase is wrong for this platform. The flow principle
> is explicit: **any backend connects → is probed and verified → after observed
> maturity the deed (tapu) is assigned by the system itself — with, if needed,
> an admin surface on top where the deed and its words are placed. Words like
> OEE/fire/throughput must not live in code.** Imagine this system deployed at
> an insurance company or a bank: what is OEE there? What does "fire" mean in
> banking? (Owner, S90.)

Corollary the owner also fixed earlier the same session (METRIC-VOCAB-DISCOVERY
ratification): the vocabulary must grow by **self-learning through a governed
gate**, never by keyboard, never silently.

## §1 · WHY (the diagnosis, so it is never re-litigated)

1. **Archaeology.** `METRIC_IDS` was born 2026-06-28 (`e3ab250`) as trust-registry
   keys when exactly ONE backend existed. On 2026-07-20 (`fb9e958`, IR-1 dark
   phase) it was lent to the armor. S89 already convicted the second loan
   (F-S89-1). S90 re-adjudicates the first: in an EAIP world — backend identity
   is DATA (2.2), topology is DISCOVERED (ADR-009), trust is EARNED (ADR-010) —
   a ceramic factory's field vocabulary in the shared code floor is a lie told
   to every future tenant. The bank/insurance argument is the one-sentence
   refutation.
2. **Classification correction (Architect's own error, recorded).** The
   structure→code / data→panel law was previously applied to the WORDS. Correct
   split: the **mechanism** (a per-backend ledger answering "for which metric is
   this backend's word the record") is structure → code. The **words and their
   aliases** are backend field-data → governed rows. `shared/metricVocab.ts`
   (fire→scrap/ıskarta, throughput→debi/k4) is the same class of data and moves
   with them.
3. **Precedent already on board — pattern reuse, not invention.**
   GATEWAY_RULES: 16 in code floor, 18 published in DB (operator extension
   live). `system.plan_template`: code floor + ABSENCE-ONLY self-seed
   (witnessed self-publishing 2026-08-09 09:37 TR, 5 rows, rule_audit-visible).
   METRIC-REGISTRY-DATA-1 applies the SAME pattern to metric identity.

## §2 · WHAT STAYS / WHAT MOVES (locked)

| Stays in code (structure) | Moves to governed data |
|---|---|
| The registry MECHANISM: kind schema, resolution chain, ABSENCE-ONLY seeding, publish gates (F80 · typo guard · RULE 31 · eval-gate) | The WORDS: `oee`, `fire`, `throughput` — as **armes seed reference**, not platform floor |
| BEYAN capture semantics (`metricsSurface` derivation shape) — untouched | The ALIASES: entire `METRIC_ALIASES` map (`shared/metricVocab.ts`) — per-metric `aliases[]` payload |
| Deterministic ordering, folding, dedupe laws | Per-metric behavior hints currently hard-coded (see `hasFireMetric`, §3-C) |
| Trust-grant machinery (Data Authority panel, grants in DB — already data) | The `allowedMetrics` BASE SET (today `METRIC_IDS ∪ grants`; becomes `published registry rows ∪ grants`) |

**Type consequence (structure decision, locked):** `MetricId` ceases to be a
closed compile-time union — it becomes `string`. A closed union IS hard-coding
at the type level. Any exhaustiveness that relied on it becomes data-driven
(sole live case found: §3-C fire special-case).

## §3 · LIVE RECON (computed 2026-08-09, fresh clone @ `656ec292`, tests excluded)

**Definition sites (both DELETED by the phase):**
- `shared/dbConstants.ts:337-342` — `METRIC_IDS` + `MetricId`
- `shared/metricVocab.ts` — `METRIC_ALIASES` (+ derived export at :39)

**Read sites, classified, each with its conversion:**

A · **Armor** — `api/cwf/_lib/routing/irFrame.ts:96,123,144`
   (`METRIC_ID_SET` → keptMetrics filter → metricsSurface derivation).
   → Reads the turn's resolved registry slice. Empty slice ⇒ `keptMetrics=[]`,
   **every** raw metric word → beyan surface. That is the CORRECT day-one
   behavior for a bank: nothing pretends to be official; everything lives as
   user declaration. drops arithmetic stays byte-identical in shape.

B · **Trust surface** — `api/admin/backend-trust.ts:15,107,121`
   (`allowedMetrics = METRIC_IDS ∪ grants`).
   → `allowedMetrics = published registry rows(backend) ∪ grants`. The panel's
   "+" picker becomes per-backend truthful: a bank backend offers bank metrics
   or nothing — never `oee`.
   Also `api/cwf/_lib/knowledge/reference/backendTrust.ts:59`
   (`authoritativeMetrics: [OEE, FIRE, THROUGHPUT]`) — armes seed row keeps its
   MEANING but references armes's registry-seeded ids (single source: the seed
   module below), not the shared constant.

C · **Routing derive** — `api/cwf/_lib/routing/deriveCategories.ts:97,111,134`.
   :97/:111 (metric presence ⇒ 'metrics' category surfaces, ∪-law) → reads the
   slice; law unchanged. :134 `hasFireMetric` special-case → the LAST
   domain-behavior byte keyed on a word. Converts to a payload hint on the
   registry row (e.g. `categoryHints: ['scrap']` on armes/fire); derive reads
   hints, never a literal.

D · **Grounding** — `api/cwf/_lib/grounding/groundingCheck.ts:464-466`
   (+ alias consumer). → First-recognized-id scan iterates the slice
   (deterministic order = row key order, stated in code).

E · **Bench** — `api/admin/bench/armor.ts:100` (`VOCABULARY`) and the
   "Official metric ids" preset (`BenchTab.tsx:136`, server-echoed).
   → Server resolves from the registry. The bench thereby gains a NEW power the
   owner asked about on 2026-08-09: per-backend vocabulary becomes VISIBLE and
   testable per backend. Zero client redesign (preset is already server-fed).

F · **Alias consumers** (via `metricVocab`) — `routing/learnableCorpus.ts`,
   `routing/functionWords.ts`, `grounding/groundingCheck.ts`,
   `turn/stageTools.ts`, `toolCategories.ts` (5 files).
   → All read `aliases[]` from the slice. `functionWords` note: if any alias
   token is baked into stop/function-word logic, the phase proves the read is
   slice-driven with a fixture where the alias set differs.

**Exit criterion for the sweep:** `grep -rn "METRIC_IDS\|METRIC_ALIASES"` over
`api shared src` (tests excluded) returns ONLY the armes seed module.

## §4 · TARGET SHAPE (locked single path)

1. **Kind:** `backend.metric_registry` — backend-scoped governed rows.
   Key = metric id. Payload = `{ id, aliases: string[], categoryHints?: string[], label?: {tr,en} }`.
   Published rows are the ONLY runtime truth (DB-first). Versioned, audited,
   archived like every domain_rule.
2. **Floor:** platform floor is **EMPTY** (tenant-zero honest). No metric word
   exists platform-wide. `none (floor)` in the panel means exactly that.
3. **armes seed:** the three ids + their aliases + the fire categoryHint move
   to an armes-scoped seed module (reference data), ABSENCE-ONLY self-seeded by
   the reconciler — the plan-template pattern verbatim, including the
   rule_audit witness rows.
4. **Turn resolution (locked decision + rationale):** the armor/derive/
   grounding vocabulary slice = **∪ of published registry rows across the
   turn's ACTIVE backends** (same resolution family as the grounding knowledge
   slice, FTS2 G4). Rationale: a word official in ANY active backend is an id
   for the turn; per-backend AUTHORITY attribution already lives in trust
   grants and is not the armor's question. Absent/failed read ≠ empty
   (MEASURE-READ-HONESTY): a failed slice read falls to last-known/floor with
   the honest-attribution flag GATE-SILENCE-VISIBILITY-1 is adding to
   grounding (`vocabSource`), extended here to `vocabSource: 'governed' |
   'floor' | 'stale'`.
5. **Publish gates unchanged:** rows enter via the standard gated publish
   (F80 · typo guard · RULE 31 · eval-gate). No auto-publish of heuristic
   content — F95 discipline. ABSENCE-ONLY: self-seed never rewrites existing
   rows.
6. **Admin affordance:** Data Authority panel's picker reads the registry
   (§3-B). A registry EDIT surface (add a metric row by hand through the gated
   publish path) is the owner's "gerekirse arayüzü olur" — in scope as the
   standard Rules-tab draft/publish flow for the new kind (no bespoke UI), so
   PLATINUM holds: single-click operational, no code change per word.

## §5 · S89 IMMUTABLES — RECONCILIATION CLAUSE (paste into v94)

> *"Tapu-anahtarlığı sökülmez"* — **not dismantled: multiplied per backend and
> re-addressed from shared code constant to backend-scoped governed rows, by
> owner ruling S90.* The MECHANISM (deed ledger) is preserved and strengthened.
> *"Sansür rolü geri gelmez"* — untouched; BEYAN capture is byte-preserved and
> its coverage WIDENS (empty registry ⇒ everything is beyan).
> *"Beyan liste değildir"* — untouched; the registry is the OFFICIAL-id ledger
> (owner/discovery-published, versioned), never a beyan store. Future sessions
> must not read this move as an immutable violation.

## §6 · RELATION TO METRIC-VOCAB-DISCOVERY-1 (owner-ratified same day)

METRIC-REGISTRY-DATA-1 is the **named precondition**: the discovery line
(BEYAN telemetry evidence + census probing → candidate rows → governed publish)
needs the ledger it writes INTO. Discovery stays at its CENSUS-adjacent
coordinate; the chain is: registry (this) → census → discovery. Self-learning
proposes; governance decides; the key is born only at publish.

## §7 · SEQUENCING + LANE CONSTRAINT

Coordinate: **first free slot behind the BATAKLIK-KURUTMA wave** (small,
deterministic, does not wait for CENSUS). **DALGA-ÇAPA constraint (S88-1):**
this phase touches `groundingCheck.ts`, which the in-flight
GATE-SILENCE-VISIBILITY-1 (AG-2) also edits — the phase prompt may NOT be cut
until that lane merges; it bases on the merged master and adopts its
`vocabSource` field (§4.4) rather than colliding with it.

## §8 · ACCEPTANCE (S63-1 proof reads, named now)

1. **Bank-shaped honesty:** a fixture backend with an EMPTY registry — armor
   keeps ZERO ids, all submitted words land beyan-captured; provable on the
   Armor bench (owner-eye optional) and in tests.
2. **armes parity:** the three ids resolve from DB rows; golden fixtures
   byte-par with pre-phase behavior; bench "Official metric ids" preset shows
   the same three, now server-resolved from the registry.
3. **Seed witness:** rule_audit carries the ABSENCE-ONLY armes seed publishes
   (one row per id), same shape as today's plan-template witness.
4. **Deletion sweep:** §3 exit criterion green; `shared/metricVocab.ts` gone;
   `MetricId` = string.
5. **Fire hint:** deriveCategories fixture proves the scrap surface now comes
   from the row payload (mutation: drop the hint → the named test dies).

## §9 · REGISTER/ROLLOUT CARRIAGE (v94 mint lines)

- §S90 rulings: this ruling verbatim-substance + item birth
  `METRIC-REGISTRY-DATA-1` (this note = binding carrier).
- §İZLEK: none of the five anchors moves; note under İZLEK-5/K-line that the
  registry is discovery's precondition.
- METRIC-VOCAB-DISCOVERY-1 line gains: "önkoşul: METRIC-REGISTRY-DATA-1".
- §5 reconciliation clause pasted under the S89 immutables block.
- Rollout: new row behind BATAKLIK wave, before STAGE-CARD-COVERAGE-1 or
  immediately after it (Architect picks at cut time based on lane freedom;
  both satisfy §7).

<!-- END · cwf-design-METRIC-REGISTRY-DATA-1-v1 · S90 -->
