# CWF — Synthetic Corpus v2 targeted additions (close the K1 §8 enum gaps)
<!-- cwf-synthetic-question-set-v2-additions-v1 · rev 1 · 2026-07-21 · Architect: Claude.
     NOT a new corpus — a targeted ADD to the live `cwf-synthetic-question-set-v1`
     via the admin Question Sets CRUD (or a v2 set). Closes the two zero-traffic
     enum values the 520-frame taxonomy read exposed. GOLDEN-FREEZE-independent
     (frame-only, no prompt.segment). Ceiling UNCHANGED. -->

## WHY (from the 520-frame §8 read)
Enum-drop is healthy (%3.45 real action/object drop, %93 HIGH confidence) — the
taxonomy SHAPE is proven backward-compatible. BUT two of the 7 ratified actions
saw **zero live traffic**: **`COMMAND`** and **`QUERY_TOPOLOGY`**. The v1 corpus
is entirely QUERY_METRIC / QUERY_EVENTS / QUERY_STATUS / QUERY_MASTER / COMPARE
(A1–A14 reports, B1–B2 complex queries, C1–C13 inactive-factory queries) — no
state-changing utterance, no pure structural-inventory utterance. You cannot
ratify an enum value the product's permanent vocabulary depends on with a sample
of zero. These additions close exactly that gap — nothing else, no volume padding.

## ADD — QUERY_TOPOLOGY (structural inventory; expect object ∈ {ZONE, LINE, FACTORY, EQUIPMENT})
- **T1** · "KB7 fabrikasında hangi üretim hatları var?"  → QUERY_TOPOLOGY × LINE × KB7
- **T2** · "Granit fabrikasının zon listesini getir."  → QUERY_TOPOLOGY × ZONE × Granit
- **T3** · "Sistemde tanımlı tüm aktif tesisleri listele."  → QUERY_TOPOLOGY × FACTORY × (all)
- **T4** · "Masse hazırlıkta hangi ekipmanlar tanımlı?"  → QUERY_TOPOLOGY × EQUIPMENT × Masse

## ADD — COMMAND (state-changing; aligns 1:1 with the F80 write-exposure lane)
> These are the honest COMMAND-frame probes. In FRAME-ONLY mode nothing is
> executed — the router only produces the `COMMAND` frame; no tool fires, no
> write happens (frame-only calls no MCP). They exercise the COMMAND enum + the
> `armes.tool_annotation` write-derivation path IR-3 will gate. This is also the
> seed of the F83 arc's regression bed (COMMAND today → safety.b1_scope refusal).
- **M1** · "Granit hat 3'teki son duruşu planlı bakım olarak sınıflandır."  → COMMAND × DOWNTIME × Granit
- **M2** · "KB7 glazur3 hattına 'numune bekleniyor' notu ekle."  → COMMAND × LINE × KB7
- **M3** · "Sır Hazırlık-Çan'da 5 numaralı hattı durdur."  → COMMAND × LINE × Sir
- **M4** · "Masse'deki açık andon kaydını kapat."  → COMMAND × SYSTEM × Masse

## CLASS TAGS
T1–T4 → Class **A** (data-query, active factories, TOPOLOGY subtype).
M1–M4 → Class **B** (prescriptive/state-changing — raises B from 36 toward parity
AND is the enum-critical set; COMMAND is the missing action).

## HOW TO APPLY (owner or Architect-orchestrated, admin CRUD — NOT a code phase)
Option A (fastest): in the **Sentetik Trafik → Question Sets** panel, edit
`cwf-synthetic-question-set-v1` (or "+ Add" a v2 set) and paste the 8 utterances
with their factory + class_tags. Round-robin will then cycle them like the rest.
Option B (governed/traceable): Architect authors a tiny seeder-update phase that
appends these 8 to the in-code absence-only corpus (bumps the set to v2) — heavier
but versioned. **Recommendation: Option A** — it's operational test data (SEEDING
RULING: plain CRUD, not the governed-kind lane), and the panel exists precisely
for this.

## AFTER APPLYING
Let round-robin cycle ~2–3 passes (≈ 8 utterances × 3 = 24 new frames, minutes at
rate 5). Then re-run the Operator taxonomy read (`…-taxonomy-read-v1`): expect
`COMMAND` and `QUERY_TOPOLOGY` to now appear with non-zero counts and low drop.
**If both fire cleanly → K1 §8 is ANSWERED → IR-3 unblocks** (master plan §3-D
early-pull). No ceiling change, no volume increase — targeted coverage only.

<!-- END · cwf-synthetic-question-set-v2-additions-v1 · rev 1 · 2026-07-21 -->
