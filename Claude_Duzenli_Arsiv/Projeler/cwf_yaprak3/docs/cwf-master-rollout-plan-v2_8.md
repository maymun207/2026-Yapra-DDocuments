# CWF · MASTER ROLLOUT PLAN · v2_8 — S91 kapanışı

<!-- cwf-master-rollout-plan-v2_8 · 2026-08-09. v2_7'yi amend eder.
     BAĞLAYICI YÜRÜYÜŞ SIRASI BUDUR. Tek takip belgesi budur;
     `cwf-implementation-order-S91-v3` bunun türetilmiş görünümüdür. -->

## §1 · S91'DE DEĞİŞEN ÜÇ HÜKÜM

**H2 · SOTA KAPISI = MİMARİNİN TAMAMLANMASI.** *(sahip hükmü, bağlayıcı)*
Dış benchmark'lara **girilmez** ta ki şu yedisi bitene kadar:
`PathB (2D.1)` · `Graph-KB (2D.3)` · `anlama katmanı (A23)` · orkestrasyon
(PLANNER-0 sevk edildi, kalanı A23 ile) · `zero-code mount (2.2/2.2a)` ·
**`A2A sunucusu (2.5 BENCH-A2A-1 = SOTA-AGENT-ADAPTER-1)`** ·
**`LEARNING-SNAPSHOT-1`**.
Gerekçe yazılı: benchmark'lar spesifik olarak o bileşenleri ölçüyor; yokken
koşmak sonucu bilinen bir sınavdır ve üretilen sayı bileşenler geldiğinde çöpe
gider. **Bu bir SOTA-1 ihlali değildir** — hiçbir ölçüt emekli olmuyor, hiçbiri
"gerek yok" diye düşmüyor; ölçüm doğru organın arkasına yerleşiyor ve **kapının
tetiği yedi adlı kalemle sayılabilir hâlde.**

**H3 · PİLOT = `CANARY-POWER-1`, API-Bank DEĞİL.** Dış ölçüm kapının arkasına
geçince, geri besleme döngüsü **içeriden** kurulur. Kanarya 10 ardışık merge'de
`verdict: null` — kırık olan bu.

**H4 · `LEARNING-SNAPSHOT-1` ŞART** ve SOTA kapısının önkoşulu. AgentBeats'in
temiz-durum kuralı onu **giriş bileti** yapıyor, hijyen tercihi değil.

## §2 · BAĞLAYICI SIRA

| # | Kalem | Şerit | Not |
|---|---|---|---|
| **1** | **CANARY-POWER-1** (#6d) | AG | Sahip-ratifiye pilot. `scoredReps` 4·2·3·6·3 — güç düşüyor. Ekstrapolasyonla-N zorunlu girdi |
| **2** | **LEARNING-SNAPSHOT-1** | AG | Tasarım notu hazır; recon → faz. SOTA kapısı önkoşulu |
| **3** | **STAGE-CONTEXT-TRUTH-1** (`api/**`) | AG-1 | Aşama 04'ün ASIL nüshası hâlâ "planlayıcı yok" diyor |
| **4** | **TRUST-PANEL-PER-BACKEND-1** (`src/**`) | AG-2 | #3 ile ideal DALGA-ÇAPA çifti — dosya alanları ayrık |
| **5** | **ROUTING-FLOOR-BACKEND-1** | AG | 2E ray ailesi; üretilmiş tabana backend boyutu |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | ROUTE-ASK-1 kapısını besler |
| 7 | #6 ALETLER: BUG-015 (+W-026×5) · BUG-016 relay-denetçisi · BUG-017 ölçüm | dalga | Enstrüman + süreç kapıları |
| 8 | TOOL-BEHAVIOR-CENSUS-1 + FRAME-ON-ALL-PATHS-1 | — | Sıfır-elle-kural hedefi |
| 9 | **METRIC-VOCAB-DISCOVERY-1** | — | ⚠ **Önkoşulu S91'de KARŞILANDI** (registry sevk edildi) |
| 10 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + `evalGate` armes kalıntısı) · 2E.4 ROUTE-ASK-1 | 2E | ROUTE-ASK ölçüm-kapılı |
| 11 | Blok 2: 2.2a · **2.2 mount** · 2.3a HONESTBENCH-HARNESS-0 · 2.4 · **2.5 BENCH-A2A-1** · 2.6 BENCH-SMOKE-1 · 2.8 · 2.9 | Blok 2 | ⚠ **2.2 ve 2.5 artık SOTA kapısının önkoşulu** |
| 12 | 2D: **2D.1 PB-FULL-1** · 2D.2 · **2D.3 GRAPH-KB-1** · LLM-SCAN-BASELINE-1 · 2D.4a/b vektör · 2D.5 OPA | 2D | ⚠ **2D.1 ve 2D.3 SOTA kapısının önkoşulu** |
| 13 | **A23 ANLAMA KATMANI** | Blok 4 | ⚠ **SOTA kapısının önkoşulu.** ②-sınırı: A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| **14** | 🔓 **SOTA KAPISI AÇILIR** | — | Yedi önkoşul sayılabilir. `AGENTBEATS-INTEGRATION-1` → pilot benchmark → B-FRONTIER |
| 15 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | SOTA §10'un tüm ÖLÇÜLMEDİ'leri |
| 16 | Blok 4: honestbench (Fast_p, **yeşil ajan olarak**) | Blok 4 | AgentBeats üzerinden = C2+C3 bedava |
| 17 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | |

## §3 · SOTA KAPISI — SAYILABİLİR TETİK

Kapı açılır ⇔ şu **yedisi** merge olmuştur:

```
[ ] 2D.1 PB-FULL-1            (PathB · BM25+regex)
[ ] 2D.3 GRAPH-KB-1           (4. bellek katmanı)
[ ] A23 ANLAMA KATMANI
[ ] 2.2 BENCH-BACKEND-MOUNT-1 (zero-code mount)
[ ] 2.5 BENCH-A2A-1           (= SOTA-AGENT-ADAPTER-1, A2A sunucusu)
[ ] LEARNING-SNAPSHOT-1
[ ] TOOL-BEHAVIOR-CENSUS-1    (orkestrasyonun kalan yarısı)
```

**0/7.** Her register bu kutuyu taşır ve sayar. *"Hazır olunca"* değil,
**"şu yedisi bitince"** — sahibin karamsarlığının sebebi tetiksiz bir koşuldu ve
bu onu bitirir.

## §4 · PARALEL ŞERİT (bloke etmez)

2B.1 RAG şeridi (dış bekleme, sahip sinyali) · 2B.2 WEB-VALVE-1 (şerit
kapasitesi) · `AGENTBEATS-INTEGRATION-1` okuma/keşif (kapıyı beklemez, ama
entegrasyon kapının arkasında).

## §5 · PARK / TETİKLİ

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS kapanışı) · LangGraph (eylem-uzvu
sonrası) · HISTORY-DIET-1 (2F sonrası) · MEMORY-HYGIENE-Q (S90 H3 ile hükme
bağlandı) · ROUTER-DISTILL-1 (ölçüm-tetikli) · TENANT-CONSOLE / EAIP-TENANT
(müşteri #2) · QUERY-CANDIDATE-1 (recon gerektirir).

<!-- END · cwf-master-rollout-plan-v2_8 -->
