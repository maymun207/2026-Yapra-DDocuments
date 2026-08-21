# CWF — Synthetic Corpus v3: the owner's real operator questions
<!-- cwf-synthetic-question-set-v3-real-operator-v1 · 2026-07-26 · S66 · Architect: Claude
     Source: nine questions supplied verbatim by the owner in S66 — real questions
     a Kale operator actually asks, not Architect-invented probes.
     Applied as operational test data through the admin Question Sets CRUD
     (SEEDING RULING: plain CRUD, not the governed-kind lane), same path as the
     v2 additions.
     GOLDEN-FREEZE-independent: frame-only, no prompt.segment, no ceiling change. -->

## §0 · Why this set is different from v1/v2
v1 and v2 were **Architect-authored to exercise enum values**. Every utterance
was built backwards from a taxonomy cell that needed traffic. That makes them
good coverage instruments and poor realism instruments.

These nine come from the owner. They carry the things invented questions never
do: typos mid-sentence, multiple entities in one breath, a shift window plus a
date plus a line range, bare record identifiers, and a request for **analysis**
rather than retrieval. Three of them press directly on defects we already know
about — which makes them regression probes on arrival, not just corpus volume.

**They are also harder than what CWF currently answers.** That is the point. A
corpus that only contains questions we pass measures nothing.

## §1 · The set

Each row: the utterance as the owner wrote it (typos preserved — they are data),
the expected frame, and what it exercises. **Where the expected object is
uncertain against the live enum, it is marked `?` rather than guessed** — the
first run resolves it, and a mismatch is a finding about the taxonomy, not a
broken row.

| # | Utterance | Expected frame | What it exercises |
|---|---|---|---|
| R1 | KB7 fabrikasının 3 günlük fırın duruşlarını getirir misin? | QUERY_EVENTS × ZONE × KB7 | zone-scoped downtime; relative window ("3 günlük"); `fırın` must reach FIRINALT/FIRINUST via the discovered `description` field |
| R2 | Granit fabrikasının doğalgaz tüketim grafiğini çizer misin 7 gün için? | QUERY_METRIC × FACTORY × Granit | **the F187 probe.** A chart request against Superset data. Today this burns tool rounds on `generate_chart` and returns nothing usable |
| R3 | Ganit fabrikasında dün akşam 4-12 vardiyasında sırlama 3-4-5 te çalışan personelleri listele. | QUERY_STATUS? × EMPLOYEE × Granit | **the F175 dead turn, verbatim.** Typo (`Ganit`), three entity refs, a shift window, a line RANGE ("3-4-5" = three lines, not one) |
| R4 | Granit fabrikasında 10106202 sicil nolu çalışanın bu haftaki işe giriş çıkışlarını getir. | QUERY_EVENTS × EMPLOYEE × Granit | **record-identifier class** (§2). See the PII note in §4 |
| R5 | Dün KB7'de barkodsuz üretim olmuş. Kaç adet karo barkodsuz üretmişiz? Problem hangi saat aralığında oluşmuş? | QUERY_METRIC × ZONE × KB7 | **two questions in one turn**; and `barkodsuz` is exactly what `armes.zone`'s `hasBarcode:false` qualifier describes — the F184 knowledge that discovery does NOT replace |
| R6 | KB7 pişmiş stokta hangi işler bulunuyor? | QUERY_STATUS × ZONE × KB7 | zone-as-stock-location rather than zone-as-production-line |
| R7 | 1596497 nolu iş emrinin fire ve fire sebeplerini getirir misin? | QUERY_METRIC × ORDER? × (none) | **record-identifier with NO factory named**; scrap plus its reason codes |
| R8 | Son 1 haftalık KB7 X hattının kamera performanslarını incele. Bariz düşük performans gösteren kameramız var mı? Performansları 3 grupta topla: 99+ iyi, 97+ ilgilenmesi gerekiyor acil değil, 96 ve altı acil düzeltilmeli. | COMPARE × EQUIPMENT × KB7 | **analysis, not retrieval** — fetch, then threshold-group into owner-defined bands, then judge. Also EQUIPMENT, the layer F194 leaves empty |
| R9 | Granit Ham stokta bulunan arabaları, içlerindeki işleri, miktarları ve bekleme sürelerini getir. | QUERY_STATUS × VEHICLE × Granit | four fields in one request; `Granit Ham` is a stock area, not a factory — the "Granit" prefix invites a wrong resolve |

**R2 and R8 need a concrete number to be reproducible.** "x gün" was left variable
in the owner's phrasing; the set fixes R2 at **7 gün** and R8 at **son 1 hafta**.
A synthetic corpus with a floating window measures a different question every
run.

## §2 · A finding this set surfaces before it is even run
R4 and R7 carry **bare record identifiers** — a personnel number (`10106202`) and
a work-order number (`1596497`). These are not topology. They will never appear
in `entity_registry`, no matter how deep discovery goes, because they are
**transactional records**, not places or equipment.

So: if the clarification gate treats a record identifier as an unresolved
`entity_ref`, it will block — and **no amount of discovery can ever fix it.**
That would be a category error, not a coverage gap, and it would sit invisibly
inside the `entity-unresolved` bucket that currently dominates the cause
distribution.

**This is a hypothesis, not a finding.** It is stated here so the first run can
falsify it: if R4 and R7 come back HIGH with cause `entity-unresolved`, the class
is real and needs its own lane (a record-id is resolved by *asking the backend*,
not by matching a catalog). If they come back LOW or NONE, the frame extractor
is already distinguishing them and the concern is closed. Either way we learn it
from one run instead of arguing about it.

## §3 · Three rows are known-failing on arrival — deliberately
- **R2** exercises F187. Today Superset's chart tools render into Superset and
  return URLs; CWF has no answer. Expect failure until F187 ships.
- **R8** needs the equipment layer, which F194 leaves honestly empty
  (`getEntities` declares `showAll` required with no machine-readable default).
  Expect the gate to ASK.
- **R3** is the turn that started the understanding-layer work. It should now
  resolve `sırlama 3` through the discovered `description: "Sırlama 3 ( Alt Kat )"`
  — but `3-4-5` is a RANGE naming three lines, and nothing in the resolver
  handles ranges. Expect partial resolution at best.

Recording expected failures **before** the run is what makes the run evidence
rather than a demo. If R2 passes, my F187 diagnosis is wrong and I want to know.

## §4 · Two decisions the owner must make before this is applied

**D1 · The real personnel number.** `10106202` is a real Kale sicil number. The
synthetic injector runs frame-only, but the **utterance text still lands in
`telemetry_events`** and is replayed by every lens run afterwards. That ledger is
specified as PII-free. Recommendation: replace it with a syntactically identical
but non-real value for the corpus row, and keep the real number for manual
one-off testing where it is not persisted. If the real number is required for the
test to be meaningful, say so and I will treat the PII question as an explicit,
recorded exception rather than an oversight.

**D2 · Which set.** These nine can be a **new v3 set** or appended to v2.
Recommendation: **a new v3 set.** v2 already has no baseline (§5) and mixing a
third population into it makes both unmeasurable. A clean set gets a clean
baseline on its first pass.

## §5 · The baseline discipline — the part that is easy to skip
**S66-3: a before/after whose population changed is not a measurement.**

We just paid for this. question-set-v2 supplied 474 of 589 frames in the F183
re-measurement and had **zero** recorded runs at M-A, so its numbers compare to
nothing. Adding v3 without recording its baseline repeats the mistake one set
later.

**Required order:**
1. apply v3 through the Question Sets panel (D1/D2 settled);
2. let round-robin cycle **at least 3 full passes** so every utterance has
   multiple frames — a single pass is a sample of one per row;
3. **run the clarification lens and record v3's per-set numbers as its baseline**,
   with the per-layer registry snapshot attached, before any further phase lands;
4. only then does the next change get measured against it.

Step 3 is the one that gets skipped under pressure. It is the cheapest step and
the one whose absence cost us the headline this session.

## §6 · What this set does NOT do
- No ceiling change, no rate change — coverage, not volume.
- No `prompt.segment` publish; frame-only, GOLDEN-FREEZE-independent.
- It does not replace v1/v2. Those remain the enum-coverage instruments; v3 is
  the realism instrument. Different jobs, both needed.
- It is not a benchmark of answer quality. The lens measures the clarification
  gate. Whether R8's threshold grouping is actually any good is a question for a
  human reading the answer, and this corpus cannot tell you.

<!-- END · cwf-synthetic-question-set-v3-real-operator-v1 · 2026-07-26 · S66 -->
