# CWF — Proje Dosyaları Denetimi · S77 · v1
<!-- cwf-project-files-audit-S77-v1 · 2026-08-02 · Architect: Claude.
     Sahip talebi: "dosyaları tek tek gözden geçir". Ölçüt = çalışma-seti
     kuralı (CLAUDE-PROJECT-INSTRUCTIONS-v3 §0): proje klasörü YALNIZ CANLI
     seti taşır — harita, en-son register/KB/bootstrap, plan, yürürlükteki
     ADR'ler, canlı tasarım notları, uçuştaki phase prompt'u. Tüketilmiş
     prompt'lar ve süpersede sürümler ARŞİVDİR; içerikleri adıyla defterde,
     sonuçları git tarihinde yaşar. Sayım: 162 dosya → TUT 27 · SİL 131 ·
     SAHİP KARARI 4. -->

## A · TUT — canlı çalışma seti (27)
**Çekirdek (7):** CLAUDE-PROJECT-INSTRUCTIONS-v3 · cwf-work-board-S74-v1
(sahip-ratife taban) · cwf-open-items-register-v79 · CWF-SESSION-GRAPH-KB-v75
· CWF-BOOTSTRAP-AND-NEW-SESSION-PROMPT-v75 · cwf-master-plan-v5_3 ·
cwf-v1-scope-cut-v1_2.

**ADR'ler — her birinin EN SON sürümü (6):** ADR-001-v2 · ADR-005-v2 ·
ADR-006-v1 · ADR-009-**v1_1** · ADR-010-v1 · ADR-012-v1. *(Not: tam ADR
seti artık repo'da `docs/adr/` altında — repo kendi konusunun zeminidir;
buradakiler çalışma kopyası.)*

**Uçuştaki iş (4):** PHASE-FLOOR-TENANT-SPLIT-1-**v1_1** ·
cwf-floor-tenant-split-design-**v1_1** · cwf-floor-tenant-split-2-design-v1 ·
RAG-TEAM-NOTES-v1 (v79 §5 bekleme-sözleşmesi taşıyıcısı).

**Sıradaki/park kalemlerin taşıyıcıları (6):** TENANT-CONSOLE-VISION-v1
(board G #2) · cwf-measure-phase-design-v2 + cwf-ma-gate-baseline-findings-v1
+ cwf-provider-arm-asymmetry-findings-v1 (M-C parkının kanıt/tasarım
taşıyıcıları) · cwf-synthetic-question-set-v3-real-operator-v1
(sahip-çapa provenance — AG'nin kelime-swap annotasyonları buna referans) ·
cwf-prod-lineage-KB-v1 (kalıcı soy kaydı).

**A23 programı — board D girdileri (6):** A23_cwf-execution-runbook-v1 ·
A23_cwf-target-component-architecture-v1_2 · A23_cwf-turn-sequence-target-v1_1
· A23_cwf-understanding-layer-architecture-v1_3 ·
cwf-understanding-layer-block-diagram-v1 · **board F karar taşıyıcıları:**
cwf-ir-pathb-hybrid-logic-v1_3.html (Path B sözleşmesi) +
cwf-agent-control-plane-blueprint-v2_1.html (LangGraph Shape-B DEFERRED
referansı). *(= 6+2, toplam sayıma dahil)*

**Vendor (1):** ARDICTECH_Load_Bearing_Core_v1_0.

## B · SİL — arşiv, çalışma setinde yeri yok (131)
**Eski registerlar (19):** cwf-open-items-register-v60 … v78 (v79 hariç
HEPSİ; defter kendi kendine yeterlidir — S63-2, hiçbir kalem eski sürüme
muhtaç değil).

**Eski KB'ler (14):** CWF-SESSION-GRAPH-KB-v61 … v74.

**Eski bootstraplar (14):** CWF-BOOTSTRAP-…-v61 … v74.

**Tüketilmiş PHASE prompt'ları (26):** A5-FREEZE-LIFT-1 · A7-B6-MIN-DOCS-1 ·
A8-SEAL-1 · B5-RETIRE-1-v1 + v1_1 · CATALOG-WRITE-LOCK-1 ·
DISCOVERY-EXTEND-1 + FIX-1 · F185-BRAKE-1 · F187-GATEWAY-SURFACE-1 ·
F190-ADR-LANDING · F214-FLOOR-SYNC-1 · MEMORY-1A · 1B · 1C-v1 · 1C-v1_1 ·
1C-FIX-1 · RAG-FINISH-2 · RAG-JOIN-FINISH-1 · RAG-JOIN-FIX-1 ·
ROUTE-SHADOW-1 · SYNTH-CORPUS-V3 · VIZ-FINISH-1 · VIZ-FINISH-1-FIX-1-v1_1 ·
VIZ-FINISH-1-FIX-2 · VIZ-MATCH-ARRAY-1 · VIZ-TABLE-1 · VIZ-UPLIFT-1.

**Tüketilmiş OPERATOR artifact'ları (12):** APPLY-B5-RETIRE ·
APPLY-DISCOVERY-EXTEND-1 · APPLY-MEMORY-1A · APPLY-MEMORY-1C ·
APPLY-ORPHAN-CLEANUP · APPLY-RAGJOIN-G2 · READ-F183-DISCOVERY-SURFACE ·
READ-F187-INNER-TOOLS-PER-TOOL (**.md'li ve uzantısız İKİ kopya**) ·
READ-F187-SUPERSET-DECLARATIONS · READ-OEE-DRAFT-EVIDENCE ·
READ-ROUTING-KEYWORD-CACHE.

**Tüketilmiş GO/RELAY (8):** GO-A5 · GO-A7-B6 · GO-B5-RETIRE · GO-MEMORY-1B
· GO-MEMORY-1C · GO-RAGJOIN-G1 · RELAY-A7-ADR012 · RELAY-MEMORY-1B.

**Süpersede sürümler (7):** ADR-009-v1 · cwf-master-plan-v5_2 ·
cwf-v1-scope-cut-v1_0 + v1_1 · cwf-measure-phase-design-v1 ·
cwf-f187-…-design-v1 + v1_1 (v1_2 de gemiye bindi, üçü de gidiyor → aşağıda).

**Gemiye binmiş tasarım notları (8):** cwf-f183-discovery-extension-design-v1
· cwf-f185-learning-guard-design-v1 · cwf-f187-superset-…-v1 · v1_1 · v1_2 ·
cwf-memory-1-design-v1_1 · cwf-viz-overhaul-design-v1_1 ·
cwf-synthetic-traffic-design-v1_3.

**Tüketilmiş araştırma/bulgu dokümanları (9):** cwf-sota-stage-sweep-part1 ·
part2 · part3 · cwf-sota-review-trust-and-memory-v1 ·
cwf-sota-understanding-layer-v1 (beşinin sonuçları A23_* artifact'larına ve
deftere işlendi) · cwf-stages-v1-review-findings-v5 ·
cwf-governance-replay-explained-v1 · cwf-board-walk-checklist-v1 ·
B4LITE-READINESS-PROBE-v1.

**Bayat mimari görselleri — canlıları artık REPO'da, mühürlü sekmelerde
(6):** cwf-architecture-map-v6.html · cwf-runtime-topology-v2.html ·
cwf-grand-sequence-flow-v1_2.html · cwf-ir-sequence-logic-v1.html ·
cwf-ir-taxonomy-design-v3.md · cwf-ir-architecture-roadmap-v1_2.md.

**Tüketilmiş korpus kaynakları (2):** cwf-synthetic-question-set-v1 ·
…-v2-additions-v1 (korpus repo koduna taşındı; v3-real-operator TUTULUYOR).

**Ders kitabı ara ürünü (3):** Chapter_6-7-8.txt ·
cwf-literature-crosscheck-dibia-bornet-v1 · cwf-literature-crosscheck-ch678-v1
(sonuçlar scope-cut v1_2 ratifikasyonuna işlendi).

## C · SAHİP KARARI (4) — silmem demedim, karar senin
- **Agentic_Artificial_Intelligence_-_Pascal_Bornet.epub** ve
  **Designing_Multi-Agent_Systems_-_Victor_Dibia.pdf:** kaynak kitaplar;
  crosscheck sonuçları kayıtlı. Projede tutmanın tek gerekçesi ileride
  yeniden başvurma niyeti — yer kaplıyorlar, karar senin.
- **cwf-ma-gate-baseline-findings-v1 + cwf-measure-phase-design-v2:** Ben
  TUT dedim (M-C parkı bunlara dönecek) ama M-C'yi hiç canlandırmama
  niyetin varsa bunlar da B'ye iner.

## D · Sayım mutabakatı
162 = 27 TUT + 131 SİL + 4 SAHİP KARARI (2'si TUT içinde sayıldı: ma-gate +
measure-v2; kitaplar + Chapter txt SİL sayımında değil). Silme SONRASI
beklenen klasör: **~29 dosya** — her biri adıyla bu listede.

<!-- END · cwf-project-files-audit-S77-v1 -->
