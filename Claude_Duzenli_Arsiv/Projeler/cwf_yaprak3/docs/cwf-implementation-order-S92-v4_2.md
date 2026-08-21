# CWF — TAM İMPLEMENTASYON SIRASI · S92 açılışı · v4_2

<!-- cwf-implementation-order-S92-v4_2 · 2026-08-10. v4'ü AMEND eder (S37-1).
     ⚠ TÜRETİLMİŞ GÖRÜNÜM — ikinci gerçek kaynak DEĞİL.
     Bağlayıcı sıra `cwf-master-rollout-plan-v2_9`, açık kalemler
     `cwf-open-items-register-v95`. Çelişirse onlar kazanır.
     v4_2 FARKI: S92 sahip hükümleri işlendi — #33/#34 doğdu (32→34),
     #1 yeniden adlandırıldı, #20'nin kapsamı yazıya geçti. -->

**ZEMİN (S92 açılışında taze TAM klonda HESAPLANDI, 2026-08-10):**
`origin/master` `00062c7871a994fea3d63a79ba3c918b5201f263` · docVersion **rev 223** ·
**518** test dosyası (vitest globları) / 6322 test · **68** migration · **13** ADR ·
GATEWAY_RULES **18 yayınlı / kod tabanı 18** · `phase/*` **27** ·
üretim `dpl_JE98TTsGH7FPGdxiYcyHeBsKKDLr` **READY** @ `39a0b90`.

**UÇUŞTA: 0 — İDDİA DEĞİL, ÖLÇÜM.** 27 `phase/*` dalının **hiçbiri**
`origin/master`'ın önünde değil (`git rev-list --count origin/master..<dal>` = 0,
27/27). S91-3 ŞERİT-TAMLIK KAPISI karşılanmış durumda: yarım şerit yok, S92
temiz tahtayla açılıyor.

**İZLEK:** ① Anlama · ② Orchestrator · ③ Graph-KB · ④ PathB · ⑤ CS329A (K#)

---

## §1 · NEDEN v4 — "32" bir iddiaydı, artık bir sayım

Register v95 §9 burn-down'ı **"Yürüyüş kalemleri: 32 · kapanan 2 · uçuşta 0 ·
açık 30"** diyor. Bu sayı **hiçbir taşıyıcıda sıralanmamış.** v3 §A'nın 26 satırı
bazı satırlarda birden çok kalemi paketliyor (#7 üç alet, #8 iki kalem, #12 iki,
#15 dört), bir satırı da (#23) kapının kendisi — yani iş değil. Hangi granülde
sayarsan say, 26 satır ne 32'yi ne 30'u veriyor.

**Bir burn-down'ın paydası yeniden hesaplanamıyorsa o bir burn-down değildir.**
S91 §8'in teşhisi doğruydu (burn-up var, burn-down yok) ve §9 doğru aleti kurdu;
eksik olan, aletin kendi paydasını taşımasıydı. Bu belge onu kapatır:
**bir faz = bir kalem** granülünde sayıldığında liste **tam 32** ediyordu —
ama **32'si de AÇIK.** S91'de kapanan iki kalem (STAGE-CARD-COVERAGE-1,
METRIC-REGISTRY-DATA-1) bu listenin İÇİNDE değil, ÖNCESİNDE; ikisi de S91 doğumlu
ve S91'de kapandı.

**S92 hükmüyle liste 34'e çıktı** (§2'de #33 ve #34 — kapının ARKASINDAKİ adsız
işler adıyla yürüyüşe girdi). Doğru burn-down cümlesi:

> **Yürüyüş kalemleri: 34 · açık: 34 · uçuşta: 0 · kapanan (S91): 2 (liste dışı,
> aynı oturumda doğup kapandılar).**

Bundan sonra her register **bu tabloyu adıyla taşır** ve kapananı satır numarasıyla
düşer. Payda bir daha kaybolmaz.

---

## §2 · YÜRÜYÜŞ KALEMLERİ — 32, SAYILMIŞ

🔑 = SOTA kapısının yedi anahtarından biri.

| # | Kalem | Şerit | İzlek | Not |
|---|---|---|---|---|
| 1 | **CANARY-VERDICT-TRUTH-1** *(eski adı `CANARY-POWER-1`, S92-H2)* | AG | ⑤ | Sahip-ratifiye pilot. 136 koşuda **sıfır** hüküm. Kusur güçte değil KURALDA — tasarım notu `cwf-design-CANARY-VERDICT-TRUTH-1-v1` |
| 2 | 🔑 **LEARNING-SNAPSHOT-1** | AG | — | Sahip hükmü H4. Tasarım notu hazır; recon → faz |
| 3 | **STAGE-CONTEXT-TRUTH-1** | AG-1 (`api/**`) | ② | Aşama 04'ün ASIL nüshası hâlâ "planlayıcı yok" diyor |
| 4 | **TRUST-PANEL-PER-BACKEND-1** | AG-2 (`src/**`) | — | #3 ile DALGA-ÇAPA çifti; dosya alanları ayrık |
| 5 | **ROUTING-FLOOR-BACKEND-1** | AG | — | 12 seramik kategorisi hâlâ platform tabanında |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | ① | ROUTE-ASK-1 kapısını besler |
| 7 | #6-a BUG-015 aletleri (+W-026 sicili ×5) | dalga | — | Enstrüman |
| 8 | #6-b BUG-016 relay-denetçisi | dalga | — | Süreç kapısı |
| 9 | #6-c BUG-017 ölçüm | dalga | — | Süreç kapısı |
| 10 | 🔑 **TOOL-BEHAVIOR-CENSUS-1** | — | ⑤ (K2) | Orkestrasyonun kalan yarısı; sıfır-elle-kural hedefi |
| 11 | FRAME-ON-ALL-PATHS-1 | — | ① | CENSUS'un kardeşi |
| 12 | **METRIC-VOCAB-DISCOVERY-1** | — | ② ⑤ | Önkoşulu S91'de KARŞILANDI |
| 13 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + `evalGate:160-164` armes kalıntısı) | 2E | — | |
| 14 | 2E.4 ROUTE-ASK-1 | 2E | ① | 🔒 ölçüm-kapılı; #6/#7-9 açar |
| 15 | 2.2a backend-lifecycle affordance | Blok 2 | — | #16'nın önkoşulu |
| 16 | 🔑 **2.2 BENCH-BACKEND-MOUNT-1** | Blok 2 | — | Zero-code mount. MCP-Bench/MCP-Universe'ün ⛔'sı |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | ⑤ (K5) | honestbench backend'i henüz YOK |
| 18 | 🔑 **2.5 BENCH-A2A-1** (= `SOTA-AGENT-ADAPTER-1`) | Blok 2 | ⑤ (K6) | **Ondört benchmark'ın ortak engeli.** A2A sunucusu |
| 19 | 2.4 BENCH-RESET-1 | Blok 2 | — | |
| 20 | 2.6 BENCH-SMOKE-1 | Blok 2 | — | Maliyet aleti — §10'un "$100 tahmin"ini ölçüme çevirir. **KAPSAM (S92): hakem-model maliyeti buraya dahildir** — ayrı kalem mintlenmedi, ikinci maliyet organı kurulmaz |
| 21 | 2.8 DISCOVERY-EXTEND-2 | Blok 2 | ③ | Graf hammaddesi |
| 22 | 2.9 CORPUS-LINE-FILL-1 | Blok 2 | ③ | |
| 23 | 🔑 **2D.1 PB-FULL-1 / PB-A** | 2D açılışı | ④ | PathB · BM25+regex |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | ③ | 785 çözümsüz LINE |
| 25 | 🔑 **2D.3 GRAPH-KB-1** | 2D | ③ | 4. bellek katmanı |
| 26 | LLM-SCAN-BASELINE-1 | 2D | ④ ⑤ (K4) | Vektörün geçmesi gereken çıta |
| 27 | 2D.4a/b vektör (Qdrant · bge-m3) | 2D | ④ | 🔒 #26'ya bağlı |
| 28 | 2D.5 OPA-POLICY-1 | 2D | — | Tier D'nin üç bacağının önkoşulu |
| 29 | 🔑 **A23 ANLAMA KATMANI** | Blok 4 | ① ② | A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| 30 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | ⑤ (K5-iii) | 🔒 kapı arkası |
| 31 | honestbench (Fast_p, **yeşil ajan olarak**) | Blok 4 | ⑤ (K5-ii) | 🔒 kapı arkası; #17'ye bağlı |
| 32 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | — | 🔒 |
| **33** | **B-FRONTIER-PAIRING-1** *(S92 doğumlu)* | Blok 3 | ⑤ | 🔒 Kapı SONRASI, ilk skordan ÖNCE. Eşit maliyet (R5) sonradan kurulamaz |
| **34** | **AGENTBEATS-INTEGRATION-1** *(S92'de yürüyüşe girdi)* | Blok 3 | ⑤ | 🔒 Yeşil/mor ajan · A2A · `task_id` izolasyonu. #18 + #2'ye bağlı |

---

## §3 · SOTA KAPISI — **0/7**, BELGEDEN DEĞİL KODDAN OKUNDU

Sahip hükmü H2: dış benchmark'lara bu yedisi bitmeden girilmez. S92 açılışında
`api/**` · `shared/**` · `src/**` · `scripts/**` üzerinde canlı tarama yapıldı:

```
[ ] #23 2D.1 PB-FULL-1              → "pathb|path_b|PB-FULL" : 0 dosya
[ ] #25 2D.3 GRAPH-KB-1             → "graph-kb|graphKb"     : 0 dosya
[ ] #29 A23 ANLAMA KATMANI          → "A23"                  : 3 dosya, ÜÇÜ DE YORUM
                                       (EpisodesRepository:471, planner.ts:28,
                                        memoryRetrieve.ts:3/73 — sözleşme notu,
                                        organ değil)
[ ] #16 2.2 BENCH-BACKEND-MOUNT-1   → "mount|zero-code"      : 0 dosya
[ ] #18 2.5 BENCH-A2A-1             → "a2a|agentCard"        : 0 dosya
[ ] #2  LEARNING-SNAPSHOT-1         → "learningSnapshot"     : 0 dosya
[ ] #10 TOOL-BEHAVIOR-CENSUS-1      → "behaviorCensus"       : 0 dosya
```

**0/7 — ölçülmüş sıfır, iddia edilmiş sıfır değil.** Yedisinin de tek satır kodu
yok. A23'ün üç isabeti pozitif kontroldür: tarama körlük yapmıyor, gerçekten
bakıyor ve gerçekten bulamıyor.

---

## §4 · İLK BENCHMARK'A GERÇEK MESAFE

Kapı yedi anahtarla açılıyor, ama **ilk koşuyu yapmak** kapıyı açmaktan farklı
bir cümledir. İşletim kılavuzu (`cwf-sota-run-guide-S91-v1`) üç şey daha
istiyor ve bunların **hiçbiri 32'nin içinde bir faz olarak yok**:

| Gereklilik | Kaynak | 32'de var mı? |
|---|---|---|
| **A2A adaptörü** — ondört benchmark'ın ORTAK engeli | Kılavuz §1 | ✅ **#18** |
| **zero-code mount** — MCP-Bench/Universe'ün ön şartı | Kılavuz §4 | ✅ **#16** |
| **B-FRONTIER eşi** — her benchmark İKİ kez koşulur (CWF + çıplak frontier, EŞİT maliyette) | Kılavuz §3 | ✅ **#33** *(S92'de doğdu)* |
| **AGENTBEATS-INTEGRATION-1** — kapının açıldığı ilk kalem | Rollout §2 satır 14 | ✅ **#34** *(paralelden yürüyüşe geçti)* |
| **Hakem-model maliyeti** (MCP-Bench `o4-mini`, LongMemEval kategori hakemleri) — üçüncü model masrafı | Kılavuz §5 | ✅ **#20'nin yazılı kapsamı** — ayrı kalem DEĞİL (ikinci maliyet organı kurulmaz) |

**Sonuç (S92'de KAPANDI):** kapının arkasındaki üç adsız iş artık adlı — ikisi
yürüyüş kalemi oldu (**#33** · **#34**), üçüncüsü **#20**'nin yazılı kapsamına
girdi. Kapı açıldığı gün *"şimdi ne yapıyoruz?"* sorusu **artık doğmaz.**

**Bugün koşulabilir tek şey yok.** Kılavuz §4'ün "✅ adapter sonrası" dediği
dördü (API-Bank · LongMemEval · τ²-bench · Agent-SafetyBench) **#18'in**
arkasında; #18 de kapının yedi anahtarından biri. Yani kapı ile ilk koşu
arasındaki mesafe, kapıya olan mesafeden **ayrı bir mesafe değil** — aynı
kalemin iki yüzü. Bu iyi haber.

---

## §5 · YÜRÜYÜŞÜN BAŞI İLE KAPI AYNI ŞEY DEĞİL — mesafe, teklif değil

İlk beş yürüyüş kaleminin **yalnız biri** (#2 LEARNING-SNAPSHOT-1) kapı anahtarı.
#1 kanarya, #3/#4/#5 üç dürüstlük borcu — hiçbiri kapıyı yaklaştırmıyor.
Anahtarların dağılımı:

```
kapı anahtarı sırası:  #2 ··· #10 ··· #16 ··· #18 ··· #23 ··· #25 ··· #29
yürüyüş sırası:         2     10      16      18      23      25      29
```

Yedi anahtar listenin **taban boyuna yayılmış**, ve beşi (#16 mount · #18 A2A ·
#23 PathB · #25 Graph-KB · #29 A23) büyük kalem. Bu bir erteleme tespiti değil —
**hiçbir kalemin düşürülmesi önerilmiyor** (SOTA-1 · S82-6 · S61-2 aynen
yürürlükte). Sadece mesafenin görünür olması gerekiyordu; artık görünüyor ve
sayılabilir.

Tek yapısal kaldıraç **paralellik**: #16/#18 (Blok 2, `api/**` + yeni yüzey),
#23/#25 (2D, bilgi katmanı) ve #29 (A23) **birbirinden büyük ölçüde ayrık dosya
alanları**. DALGA-ÇAPA disiplini (S88-1) iki şeridi zaten güvenle taşıyor. Kapıya
olan süre, kalem sayısıyla değil **eşzamanlı şerit sayısıyla** kısalır — ve bunun
tavanı Architect'in RULE-25 inceleme bant genişliğidir, AG kapasitesi değil.

---

## §6 · PARALEL · NÖBET · PARK (bloke etmez, 32'ye dahil değil)

**Paralel:** 2B.1 RAG şeridi (dış bekleme) · 2B.2 WEB-VALVE-1.
*(`AGENTBEATS-INTEGRATION-1` buradan ÇIKTI — artık yürüyüş kalemi **#34**.)*

**Nöbet / kusur (faz açtırmaz):** `LANGFUSE-ATTR-READ-1` (2 attr) ·
no-jurisdiction üretim ORANI · W-032 · W-030 · W-033 · W-018 · UI-POLISH-NOTE ·
Gemini+PII 3. veri noktası · BUG-005 · BUG-014 · ARMED 010-down · ARMED 029 ·
`BENCH-KULLANIM-DOC-1` · honestbench backend yokluğu.

**Park / tetikli:** ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (tetik: CENSUS) ·
LangGraph (eylem-uzvu sonrası) · HISTORY-DIET-1 (2F sonrası) · MEMORY-HYGIENE-Q
(S90 H3) · ROUTER-DISTILL-1 (ölçüm-tetikli) · TENANT-CONSOLE / EAIP-TENANT
(müşteri #2) · QUERY-CANDIDATE-1 (recon).

---

## §7 · İnsan diliyle tek paragraf

Liste **34 kalem ve 34'ü de açık** — S91'in "30 açık"ı sayılamayan bir paydadan
geliyordu; artık sayılıyor, ve S92 hükmüyle kapının arkasındaki iki adsız iş de
içine girdi. SOTA kapısı **0/7** ve bu sefer belgeden değil
**koddan** okundu: yedi anahtarın hiçbirinin tek satırı yok. İyi haber, mesafenin
tek olması: benchmark'ları koşturacak adaptör (#18) zaten kapının anahtarlarından
biri, yani "kapıya varmak" ile "ilk testi koşmak" iki ayrı yol değil. Ve kapının
**arkasındaki** üç adsız iş S92'de kapandı: B-FRONTIER eşi #33, AgentBeats
entegrasyonu #34, hakem-model maliyeti ise #20'nin yazılı kapsamı — ayrı organ
kurulmadı. Ve yapısal gerçek: yürüyüşün başındaki beş kalemin yalnız biri
anahtar, yedi anahtar listenin boyuna yayılmış. Hiçbirini düşürmüyoruz; kapıya
olan süreyi kısaltan tek şey **eşzamanlı şerit sayısı**, ve onun tavanı AG değil
Architect'in inceleme kapasitesi.

<!-- END · cwf-implementation-order-S92-v4_2 -->
