# CWF · MASTER ROLLOUT PLAN · v2_9 — S92 açılışı

<!-- cwf-master-rollout-plan-v2_9 · 2026-08-10. v2_8'i amend eder.
     BAĞLAYICI YÜRÜYÜŞ SIRASI BUDUR. Tek takip belgesi budur;
     `cwf-implementation-order-S92-v4_2` bunun türetilmiş görünümüdür. -->

## §0 · v2_8'DEN FARK (S92 sahip hükümleri)

**S92-H1 · Kapının ARKASINDAKİ adsız işler yürüyüşe girdi.** Kapı sayılabilir
yapıldı ama arkasında adı olmayan iş bırakılmıştı; sahip hükmü: *"ekleyelim."*
İki yeni yürüyüş kalemi doğdu (§2'de **#33** ve **#34**). Üçüncü aday —
hakem-model maliyeti — **ayrı kalem OLMADI**: gerekçesi §2 altındaki not.
Yürüyüş **32 → 34.**

**S92-H2 · `CANARY-POWER-1` → `CANARY-VERDICT-TRUTH-1`.** Sahip onayı.
Eski ad, ölçümün çürüttüğü bir teşhisi (güç yetersizliği) taşıyordu; 136 koşuluk
kanıt kuralın kendisini gösteriyor. **Kalemin kendisi değişmedi**, S91-H3'ün
ratifiye ettiği pilot aynen duruyor — yalnız adı artık kusuru işaret ediyor.

**S92-H3 · Burn-down paydası artık sayılıyor, iddia edilmiyor.** v95 §9'un
"32 · açık 30"u hiçbir taşıyıcıda sıralanmamıştı. Bir-faz-bir-kalem granülünde
sayıldı: **34 kalem, 34'ü de açık.** S91'de kapanan iki kalem listenin İÇİNDE
değil, aynı oturumda doğup kapandı.

## §1 · DEĞİŞMEYEN ÜÇ HÜKÜM (S91, aynen)

**H2 · SOTA KAPISI = MİMARİNİN TAMAMLANMASI.** *(sahip hükmü, bağlayıcı)*
Dış benchmark'lara **girilmez** ta ki §3'teki yedisi bitene kadar. Gerekçe
yazılı: benchmark'lar spesifik olarak o bileşenleri ölçüyor; yokken koşmak
sonucu bilinen bir sınavdır. **Bu bir SOTA-1 ihlali değildir** — hiçbir ölçüt
emekli olmuyor; ölçüm doğru organın arkasına yerleşiyor ve kapının tetiği
**yedi adlı kalemle sayılabilir hâlde.**

**H3 · PİLOT = `CANARY-VERDICT-TRUTH-1`** *(eski adı CANARY-POWER-1)*, API-Bank
DEĞİL. Dış ölçüm kapının arkasına geçince geri besleme döngüsü içeriden kurulur.

**H4 · `LEARNING-SNAPSHOT-1` ŞART** ve SOTA kapısının önkoşulu. AgentBeats'in
temiz-durum kuralı onu **giriş bileti** yapıyor, hijyen tercihi değil.

## §2 · BAĞLAYICI SIRA

| # | Kalem | Şerit | Not |
|---|---|---|---|
| **1** | **CANARY-VERDICT-TRUTH-1** (#6d) | AG | Sahip-ratifiye pilot. 136 koşu, **sıfır hüküm**. Kusur güçte değil KURALDA |
| **2** | 🔑 **LEARNING-SNAPSHOT-1** | AG | Tasarım notu hazır; recon → faz. Kapı önkoşulu |
| **3** | **STAGE-CONTEXT-TRUTH-1** (`api/**`) | AG-1 | Aşama 04'ün ASIL nüshası hâlâ "planlayıcı yok" diyor |
| **4** | **TRUST-PANEL-PER-BACKEND-1** (`src/**`) | AG-2 | #3 ile ideal DALGA-ÇAPA çifti — dosya alanları ayrık |
| **5** | **ROUTING-FLOOR-BACKEND-1** | AG | 2E ray ailesi; üretilmiş tabana backend boyutu |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | ROUTE-ASK-1 kapısını besler |
| 7–9 | #6 ALETLER: BUG-015 (+W-026×5) · BUG-016 relay-denetçisi · BUG-017 ölçüm | dalga | Enstrüman + süreç kapıları |
| **10** | 🔑 **TOOL-BEHAVIOR-CENSUS-1** | — | Orkestrasyonun kalan yarısı · sıfır-elle-kural |
| 11 | FRAME-ON-ALL-PATHS-1 | — | CENSUS'un kardeşi |
| 12 | **METRIC-VOCAB-DISCOVERY-1** | — | ⚠ Önkoşulu S91'de KARŞILANDI |
| 13–14 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + `evalGate` armes kalıntısı) · 2E.4 ROUTE-ASK-1 | 2E | ROUTE-ASK ölçüm-kapılı |
| 15 | 2.2a backend-lifecycle affordance | Blok 2 | #16'nın önkoşulu |
| **16** | 🔑 **2.2 BENCH-BACKEND-MOUNT-1** | Blok 2 | Zero-code mount |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | honestbench backend'i henüz yok |
| **18** | 🔑 **2.5 BENCH-A2A-1** (= `SOTA-AGENT-ADAPTER-1`) | Blok 2 | **Ondört benchmark'ın ortak engeli.** A2A sunucusu |
| 19–22 | 2.4 BENCH-RESET-1 · **2.6 BENCH-SMOKE-1** · 2.8 DISCOVERY-EXTEND-2 · 2.9 CORPUS-LINE-FILL-1 | Blok 2 | 2.6 maliyet aleti (kapsam notu aşağıda) |
| **23** | 🔑 **2D.1 PB-FULL-1** | 2D açılışı | PathB · BM25+regex |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | 785 çözümsüz LINE |
| **25** | 🔑 **2D.3 GRAPH-KB-1** | 2D | 4. bellek katmanı |
| 26–28 | LLM-SCAN-BASELINE-1 · 2D.4a/b vektör (🔒 #26'ya bağlı) · 2D.5 OPA-POLICY-1 | 2D | |
| **29** | 🔑 **A23 ANLAMA KATMANI** | Blok 4 | ②-sınırı: A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| **—** | 🔓 **SOTA KAPISI AÇILIR** | — | Yedi önkoşul sayılabilir |
| **33** | **B-FRONTIER-PAIRING-1** *(S92 doğumlu)* | Blok 3 | ⚠ **Kapı SONRASI ama ilk skordan ÖNCE.** Her benchmark iki kez koşulur; eşit maliyet (R5) bir SONRADAN kurulamaz |
| **34** | **AGENTBEATS-INTEGRATION-1** *(S92'de yürüyüşe girdi)* | Blok 3 | Yeşil/mor ajan · A2A · `task_id` izolasyonu. #18 + #2'ye bağlı |
| 30 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | SOTA §10'un tüm ÖLÇÜLMEDİ'leri |
| 31 | Blok 4: honestbench (Fast_p, **yeşil ajan olarak**) | Blok 4 | #17'ye bağlı; AgentBeats üzerinden = C2+C3 bedava |
| 32 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | |

> **#20 `2.6 BENCH-SMOKE-1` — KAPSAM AÇIKLIĞI (S92, yazıya geçti).** Hakem-model
> maliyeti (MCP-Bench `o4-mini`, LongMemEval kategori hakemleri) **#20'nin
> kapsamındadır** ve artık yazılıdır. **Ayrı kalem MİNTLENMEDİ**, çünkü #20 zaten
> maliyet aletidir; ikinci bir maliyet organı kurmak, bu projenin defalarca
> adlandırdığı hatanın (ikinci sayaç / ikinci ölçen organ) aynısı olurdu.
> Sahibin "kapının arkasında adsız iş kalmasın" hükmü karşılandı: iş adıyla
> yazılı, evi belli, ve #20'nin bitiş tanımının parçası. *Sahip tek kelimeyle
> ayrı kalem yapabilir; o hâlde numarası **#35** olur.*

## §3 · SOTA KAPISI — SAYILABİLİR TETİK · **0/7**

S92 açılışında **koddan** okundu (belgeden değil), `api/**` · `shared/**` ·
`src/**` · `scripts/**` üzerinde:

```
[ ] #23 2D.1 PB-FULL-1             → 0 dosya
[ ] #25 2D.3 GRAPH-KB-1            → 0 dosya
[ ] #29 A23 ANLAMA KATMANI         → 3 isabet, ÜÇÜ DE YORUM (pozitif kontrol)
[ ] #16 2.2 BENCH-BACKEND-MOUNT-1  → 0 dosya
[ ] #18 2.5 BENCH-A2A-1            → 0 dosya
[ ] #2  LEARNING-SNAPSHOT-1        → 0 dosya
[ ] #10 TOOL-BEHAVIOR-CENSUS-1     → 0 dosya
```

**0/7 — ölçülmüş sıfır.** Her register bu kutuyu taşır ve sayar.

## §4 · PARALEL ŞERİT (bloke etmez)

2B.1 RAG şeridi (dış bekleme, sahip sinyali) · 2B.2 WEB-VALVE-1 (şerit
kapasitesi). *(`AGENTBEATS-INTEGRATION-1` buradan ÇIKTI — artık #34, yürüyüş
kalemi.)*

## §5 · PARK / TETİKLİ

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (CENSUS kapanışı) · LangGraph (eylem-uzvu
sonrası) · HISTORY-DIET-1 (2F sonrası) · MEMORY-HYGIENE-Q (S90 H3 ile hükme
bağlandı) · ROUTER-DISTILL-1 (ölçüm-tetikli) · TENANT-CONSOLE / EAIP-TENANT
(müşteri #2) · QUERY-CANDIDATE-1 (recon gerektirir).

<!-- END · cwf-master-rollout-plan-v2_9 -->
