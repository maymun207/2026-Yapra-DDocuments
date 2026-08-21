# CWF — Synthetic Traffic subsystem · design note v1_2
**cwf-synthetic-traffic-design-v1_2 · rev 1.2 · 2026-07-21 · Architect: Claude**
Amends v1 (immutable, S37-1). Two owner-supplied corrections folded in:
1. **ARMES = FOUR live factories, not just KB7** — the question set MUST span all
   four, so the frame's `FACTORY` enum (and TRANSFER/EMPLOYEE, exercised by
   shipment questions) gets real coverage. (This also corrects a durable-map
   premise that framed ARMES as "the KB7 factory" — see §5a.)
2. **Two question CLASSES** — pure data-query vs prescriptive/agentic (F83 arc) —
   which interact differently with the pipeline and with `safety.b1_scope`.
Everything else in v1 stands (mechanism §2, two-mode cost §3, architecture §4,
traps §6, §8 payoff §7). This version replaces §5 and adds §5a.

## §5a · THE FOUR FACTORIES (tree-verified scope axis)
ARMES serves FOUR live factories (owner-confirmed):
- **KB7** — ceramic (glazur/fırın/press) — the historical default.
- **Granit** — granite factory (sırlama/glazing lines).
- **Sır Hazırlık — Çan** — glaze-prep, Çan site.
- **GR & SFX Masse Hazırlık** — mass-prep.
Tree-proof: the IR frame's `object` enum already includes **FACTORY** (plus LINE,
ZONE, EQUIPMENT, ORDER, RECIPE, MATERIAL, TRANSFER, VEHICLE, EMPLOYEE, QUALITY,
DOWNTIME, SYSTEM) — `semanticRouter.ts:171`, `routing/irFrame.ts:26`. So the
factory scope is a first-class frame dimension; a KB7-only set would never
exercise the `FACTORY` enum and would bias §8. **Every question set must
distribute across all four factories.**

## §5 · QUESTION SETS — Pareto strategy, TWO classes (replaces v1 §5)
Grounded in the real tool catalog (`getDailyLineStops`, `getLineStopsReport`,
`getScrapBarcodeList`, `getFactoryList`, `getOrderList`, `getQualityList`,
`getDailyManualScrap`, …) and the owner's four example questions.

### Class A — DATA-QUERY (triggers ARMES tools, feeds frames cleanly)
Owner examples that define this class:
- **Q1 (Granit · DOWNTIME × ZONE × MATERIAL × time-sort):** "Granit fabrikası
  sırlama hatlarında bugün yaşanan duruşları; neden/kaynak/süre/baş-bitiş + bölge
  ve malzeme no kırınımında raporla, başlama zamanına göre eskiden yeniye sırala."
  → frame: action=REPORT, object=DOWNTIME, factory=Granit, scope=ZONE(sırlama),
  fields={reason,source,duration,start,end,zone,material}, sort=asc.
- **Q2 (Sır Hazırlık · TRANSFER × EMPLOYEE × MATERIAL × date):** "22 Haziran 2026
  sevk edilen tüm sırların; sevk fabrikası, malzeme adı, miktar, teslim
  eden/alan adıyla tek tek listele." → frame: action=LIST, object=TRANSFER,
  factory=SırHazırlık, fields={dest_factory,material,qty,sender,receiver},
  time=2026-06-22.
This class exercises DOWNTIME/TRANSFER/EMPLOYEE/MATERIAL enums + real tools. Ideal
for BOTH frame-only (§8) and full-turn (tool-triggering) modes.

### Class B — PRESCRIPTIVE / AGENTIC (the F83 arc; today REFUSED)
Owner examples:
- **Q3 (KB7 glazur3 · corrective + A3 report):** "son 24 saatte duruş/fire/
  verimsizlikleri asakai için A3 raporla, EK OLARAK düzeltici aksiyon önerilerinde
  bulun."
- **Q4 (KB7 glazur3 · production + web research + roadmap):** "üretim raporu çıkar,
  en çok gelen hata için LİTERATÜR TARAMASI yap, düzeltici aksiyon YOL HARİTASI
  çiz, kontrol etmem gereken iş kalemlerini öncelik sırasıyla listele."
Tree-proof: `safety.b1_scope` (`prompt/core/promptFloor.ts:56`) today REFUSES the
corrective/prescriptive half ("bu yeteneğim yok"). So in full-turn mode Q3/Q4
produce a REFUSAL — which is itself valuable synthetic signal:
- **§8 validation:** does IR-1 frame extraction still fire on a turn the main LLM
  later refuses? (frame is extracted at the ROUTER stage, before b1_scope acts —
  so the frame MUST record regardless. A synthetic Q3/Q4 proves this.)
- **F83 regression bed:** Q3/Q4 are the FUTURE target behavior (MEMORY-1 → F83:
  KB→web→write-back). Seeding them now gives a ready regression set for when the
  F83 arc lands — the same utterances should flip from refusal to a real
  corrective roadmap.

### The set v1 shape (Pareto: vital-few intents × 4 factories × frame axes)
~40 curated utterances: Class A dominant (OEE, fire/scrap, line-stops, shipment,
production, counter, order) distributed across KB7/Granit/Sır-Çan/Masse, varied
on scope (line/zone/equipment/factory/"tümü"), time (dün/bu hafta/24saat/vardiya/
tarih), action (sorgu/raporla/listele/karşılaştır), and agglutinative phrasing
('hattının','haftalık','deki' — the IR evidence class). A minority Class B
(Q3/Q4-style) to exercise the refusal-frame path + seed the F83 bed. The owner's
four examples are seeded verbatim as anchors.

## §9 · OWNER DECISIONS (carried from v1, refined)
- **Mode default:** frame-only for K1 (cheap, immediate) with full-turn as a knob?
  — *Note: Class B (Q3/Q4) in full-turn returns a REFUSAL today; that's expected
  and useful (frame still records). Confirm you want Class B in the set now as an
  F83 regression bed, or hold Class B until the F83 arc.*
- **Injector engine:** cron-driven (robust) vs start/stop-panel-open (fragile)?
- **Go:** approve → I author question-set v1 (~40 utterances, 4 factories, both
  classes) + the SYNTH-TRAFFIC-1 phase in one shot.

<!-- END · cwf-synthetic-traffic-design-v1_2 · rev 1.2 · 2026-07-21 -->
