# CWF — M-A findings: the clarification-gate baseline · v1
<!-- cwf-ma-gate-baseline-findings-v1 · 2026-07-25 · S65 · Architect: Claude
     The done-proof record for MEASURE STEP 3 / M-A (S63-1: the merge was not the
     proof; this reading is). Source: read-only production run of the
     clarification-gate replay lens, run id fc8b67e7-8443-46dd-8978-f3b3ce0daf4b,
     merged at master 85993ac (rev 145). Design: cwf-measure-phase-design-v2 §3/§4.
     Binding on interpretation: ADR-009 v1_1 + ADR-010. -->

## §0 · What this document is
**The first empirical statement about this system's behavior.** Everything said
about CWF's quality before this was a design argument. This is a measured number,
nailed to a reproducible state. It is the "before" that STEP 5 (⑤/⑥) and the
Path B resolver work must beat to earn the word "improved."

## §1 · The number
> **~85% of recorded frames would have the gate ASK instead of ANSWER — and 99% of
> those blocks have a single cause: the entity could not be resolved.**

| View | n | ask (HIGH) | dominant cause |
|---|---|---|---|
| Per-utterance (dedup, skew-free) | 36 | **83.3%** | entity-unresolved 29 |
| Per-frame (population-weighted) | 2534 | **84.6%** | entity-unresolved 2120 / 2144 HIGH |
| **Organic traffic** (real users) | 80 | **35.0%** | entity-unresolved 26 |

Per-action (per-frame): COMPARE **100%** (22/22, all compare-under-resolved —
it needs ≥2 resolvable entities and the registry can barely resolve one) ·
COMMAND **99.9%** · QUERY_STATUS 93.2% · QUERY_EVENTS 85.1% · QUERY_MASTER
75.1% · QUERY_METRIC **67.0%** (the lowest — metric questions often name no
entity at all).

Per-set: gapfill 87.4% (n=1854) · question-set-v1 82.5% (n=600) · organic 35.0%
(n=80) · question-set-v2 **no recorded runs — the set exists, this is NOT a 0%
block rate** (empty≠zero, surfaced by the lens's own third defect fix).

**Skew check:** the frame population is dominated by 8 utterances repeated ~233×,
so the per-frame view could have been an artifact. It is not — the skew-free
per-utterance view (83.3%) agrees with the weighted view (84.6%). The conclusion
survives the corpus's imbalance.

**Frame stability:** 36 utterances produced ≥1 frame; 2 showed an unstable frame
shape across ~233 repetitions, and **0 showed an unstable gate outcome**. Frame
extraction is close to deterministic at this scale, and the gate's decision is
stable even where the frame wobbles.

## §2 · The decision-tie is resolved: registry, not extraction
The M-A room card (design v2 §4, E3) required the baseline to distinguish *"the
gate blocks mostly on registry gaps"* from *"the gate blocks mostly on extraction
ambiguity"*, because the two imply different next investments. The answer is not
close: **entity-unresolved accounts for 2120 of 2144 blocks (98.9%)**; the
`ambiguous` cause is effectively absent from the distribution.

The mechanism is structural, not incidental:
- `mergeFactoryRegistryResolution` runs **only when `frame.object === 'FACTORY'`**.
- For LINE / ZONE / EQUIPMENT objects, the only resolution channel is the governed
  `armes.entity_alias` index — **5 rows** (1 factory + 4 zones, all KB7). Zero
  line aliases, zero equipment aliases.
- In a MES, most questions are about lines and zones.

So the gate is deciding against a nearly-empty catalog in exactly the domain
where the questions live. It is behaving **correctly** — refusing to guess is its
contract — but the system pays with an 85% block rate.

## §3 · Registry snapshot (E5 — what makes this reproducible)
The lens re-resolves entities against live registry state, so the number is only
meaningful against that state:

- `entity_alias` index size: **5** (source: db)
- `factory_registry`: **17 active of 17 total**
- Floor: **rev 145**, master `85993ac`
- Run id: `fc8b67e7-8443-46dd-8978-f3b3ce0daf4b`
- Corpus: 2465 synthetic_runs rows + 80 telemetry ir_frame rows → **2534 armored
  frames**; 11 rows unarmorable (stored `action:'QUERY_TOPOLOGY'`, retired by
  IR-3 G0 — pre-merge residue, correctly excluded rather than silently dropped).

Re-running after the registry changes will produce a different number **by
design** — that is the point.

## §4 · Honest limits on this number
1. **HONEST-NULL.** `computeTurnClarification` swallows internal failures into
   `null`. A LOW/NONE row therefore means EITHER "the gate decided not to ask" OR
   "the gate degraded internally" — indistinguishable from outside the seam. The
   **HIGH counts are solid; the NONE bucket is suspect** and may be
   over-counting. Since HIGH is the headline, the finding stands, but a future
   phase should make the seam's failure mode observable.
2. **This is a replay, not live behavior.** It answers "what would today's gate
   decide, with today's registry" — not "what did production do". Production's
   gate is dark (`router.frameRouting = 0`).
3. **The synthetic corpus is not representative traffic.** Its utterances name
   entities across many factories deliberately. Organic traffic (35%, n=80) is
   the more representative figure and it is a small sample.
4. **LOW-vs-NONE split** was computed lens-side using the same production
   `resolveTimeRange` with the same pinned networkTime and governed boundaries;
   branch precedence was not reimplemented (the seam had already established that
   no HIGH/ALT_D branch fired).

## §5 · BINDING constraint on how this number may be improved
Recorded here because the cheap fix becomes tempting the moment this number is
read, and the next session must not reach for it:

> **Per ADR-009 v1_1: an entity-coverage gap is NEVER closed by writing alias or
> zone rows. The only sanctioned remedy is extending DISCOVERY to that layer.**

Writing an alias row per zone would lower this number and would be a regression
under the discovery law: it scales with the WORLD (plant size), goes stale the
moment ARMES changes, and lands the maintenance on the owner. The sanctioned path
is to extend the proven `entityRegistrySync` / `backends.entity_list_tool`
descriptor pattern from factories down to lines, zones and equipment — after
which this number should fall **and be re-measured to prove it fell**.

Related, and separately actionable: ARMES declares `factoryId` on 113 of its 145
tools as a free-form `type: "string"` with no enum, while `factory_registry`
already knows the 17 valid values. Injecting the discovered value set into what
the model sees is a pure-discovery improvement (nothing hand-authored) and
addresses an observed live failure — a turn that called
`getFactoryLines({factoryId:"GRANIT"})`, was rejected, and self-corrected to
`"Granit"`.

## §6 · What this baseline is the "before" for
- **STEP 5 (⑤/⑥)** — the understanding layer's delta is measured against this.
- **Path B resolver work** (③ Channel-2 BM25 + L5 entity-miss ledger) — its
  justification and its proof.
- **Discovery extension to lines/zones/equipment** — the single highest-leverage
  item this measurement identified, and the one M-A was built to find.

Any of those may claim improvement only by re-running this lens against a
recorded registry snapshot and showing the block rate fell **without** the
must-block guardian falling (E2: unresolvable probes must still block 100%).

<!-- END · cwf-ma-gate-baseline-findings-v1 · 2026-07-25 -->
