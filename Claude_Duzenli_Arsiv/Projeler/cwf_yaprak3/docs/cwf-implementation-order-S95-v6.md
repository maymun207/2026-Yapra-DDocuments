# CWF — TAM İMPLEMENTASYON SIRASI · S95 · v6

<!-- cwf-implementation-order-S95-v6 · 2026-08-12. v5'i (S93) geçersiz kılar.
     ⚠ TÜRETİLMİŞ GÖRÜNÜM — ikinci gerçek kaynak DEĞİL. Bağlayıcı sıra
     `cwf-master-rollout-plan-v3_2`, açık kalemler `cwf-open-items-register-v98`
     + KB v95. Çelişirse onlar kazanır.
     v6 FARKI: S93 kapanışları (#2 🔑 · #35 · #36) + S94 kapanışları
     (#4 · #38 · #39) + S94 doğumları (#38 · #39 · #40 · #41) işlendi;
     payda 37→41; SOTA kapısı 0/7→1/7. -->

**ZEMİN (S95 açılışında taze klonda HESAPLANDI, 2026-08-12):**
origin/master `d8f33f80a5ba3c76fa710e0c73918664f0ffd979` · docVersion rev 233 ·
533 test dosyası (bağımsız find sayımı) / 6820 test (İDDİA — hakem PR-head CI,
S37-2; sandbox 403) · 72 migration (canlıda 72, bire bir; tepe
`20260812160000`) · 13 ADR · drift kapısı [OK] 7/7 tab · üretim f7af666'ya
yakınsamış (sonraki iki commit docs-only).

**UÇUŞTA: 0.** S94 dört merge'ün dördü de oturum içinde kapandı; yarım şerit yok
(S91-3 kapısı temiz).

**KANARYA (mühür #37):** master'da ÜÇ ardışık `scored 9 / failed 0`
(f6d6e48 → f7af666 → ed527ec). Kelime `underpowered` cap'te KİLİTLİ
(checked 6<9) — beklenen; yeniden teşhis YASAK. İzlenir, açılmaz.

**İZLEK:** ① Anlama · ② Orchestrator · ③ Graph-KB · ④ PathB · ⑤ CS329A (K#)

---

## §1 · BURN-DOWN (payda SAYILIYOR)

Yürüyüş kalemleri: **41** · AÇIK: **32** · uçuşta: **0**
Kapanan — S92: 3 (#1 · #3 · #5) · S93: 3 (#2 🔑 · #35 · #36) ·
S94: 3 (#4 · #38 · #39). **Toplam kapalı: 9.**
Doğan — S92: 2 (#35 · #36) · S93: 1 (#37) · S94: 4 (#38 · #39 · #40 · #41).

**SOTA kapısı: 1/7** — #2 LEARNING-SNAPSHOT-1 ilk anahtar (S93, doğum kanıtlı).
Kalan altı anahtar: **#10 · #16 · #18 · #23 · #25 · #29**.

---

## §2 · TAM TABLO — 41 kalem, bağlayıcı sırada (rollout v3_2)

🔑 = SOTA kapısının yedi anahtarından biri · ✅ = kapandı · 🔒 = kapı arkası

| # | Kalem | Şerit | İzlek | Durum / Not |
|---|-------|-------|-------|-------------|
| ✅1 | ~~CANARY-VERDICT-TRUTH-1~~ | — | ⑤ | S92 KAPANDI `b5da685` (rev 224). Verdikt NÖBETİ sürüyor (faz açtırmaz) |
| ✅2 | 🔑 ~~LEARNING-SNAPSHOT-1~~ | — | — | S93 KAPANDI (rev 228). Kapı 0/7→1/7. Doğum kanıtı: snapshot+restore bayt-aynı, epoch tek artış, denetim satırları. S94'te #38/#39 ile organ olgunlaştı |
| ✅3 | ~~STAGE-CONTEXT-TRUTH-1~~ | — | ② | S92 KAPANDI `c2f7dfd` (rev 225) |
| ✅4 | ~~TRUST-PANEL-PER-BACKEND-1~~ | — | — | S94 KAPANDI `342dc81` (rev 230). readOk ekseni; düz alan öldü; S82-5 sınıfı yapısal kapandı |
| ✅5 | ~~ROUTING-FLOOR-BACKEND-1~~ | — | — | S92 KAPANDI `0de5ffd` (rev 226). FLOOR_BY_BACKEND |
| 6 | 2.7 FRAME-SHADOW-EVIDENCE-1 | AG | ① | ROUTE-ASK-1 kapısını besler. Sıra 4. slot (#40/#41'den sonra) |
| 7 | #6-a BUG-015 aletleri (+W-026 ×5) | dalga | — | Enstrüman; #6 ile dalga hazırlığı |
| 8 | #6-b BUG-016 relay-denetçisi | dalga | — | Süreç kapısı |
| 9 | #6-c BUG-017 ölçüm | dalga | — | Süreç kapısı |
| 10 | 🔑 TOOL-BEHAVIOR-CENSUS-1 | — | ⑤ (K2) | Taşıyıcı projede. Orkestrasyonun kalan yarısı; sıfır-elle-kural |
| 11 | FRAME-ON-ALL-PATHS-1 | — | ① | CENSUS'un kardeşi |
| 12 | METRIC-VOCAB-DISCOVERY-1 | — | ② ⑤ | Önkoşul (METRIC-REGISTRY-DATA-1) S91'de karşılandı |
| 13 | 2E.3 PACK-FROM-PROTOCOL-1 (+W-035 + evalGate:160-164) | 2E | — | |
| 14 | 2E.4 ROUTE-ASK-1 | 2E | ① | 🔒 ölçüm-kapılı; #7-9 açar |
| 15 | 2.2a backend-lifecycle affordance | Blok 2 | — | #16'nın önkoşulu |
| 16 | 🔑 2.2 BENCH-BACKEND-MOUNT-1 | Blok 2 | — | Zero-code mount. MCP-Bench/Universe'ün ⛔'sı |
| 17 | 2.3a HONESTBENCH-HARNESS-0 | Blok 2 | ⑤ (K5) | honestbench backend'i henüz YOK |
| 18 | 🔑 2.5 BENCH-A2A-1 (= SOTA-AGENT-ADAPTER-1) | Blok 2 | ⑤ (K6) | Ondört benchmark'ın ortak engeli. A2A sunucusu; #34'ün önkoşulu |
| 19 | 2.4 BENCH-RESET-1 | Blok 2 | — | Not: #38/#39 snapshot organı reset'in yapı taşlarını hazırladı |
| 20 | 2.6 BENCH-SMOKE-1 | Blok 2 | — | Maliyet aleti. Yazılı kapsam (S92-H1): hakem-model maliyeti dahil |
| 21 | 2.8 DISCOVERY-EXTEND-2 | Blok 2 | ③ | Graf hammaddesi |
| 22 | 2.9 CORPUS-LINE-FILL-1 | Blok 2 | ③ | |
| 23 | 🔑 2D.1 PB-FULL-1 / PB-A | 2D açılışı | ④ | PathB · BM25+regex |
| 24 | 2D.2 LINE-RESOLUTION-DIAGNOSIS-1 | 2D | ③ | 785 çözümsüz LINE |
| 25 | 🔑 2D.3 GRAPH-KB-1 | 2D | ③ | 4. bellek katmanı. SEED-PROBATION tetiği (park, v98 §1) |
| 26 | LLM-SCAN-BASELINE-1 | 2D | ④ ⑤ (K4) | Vektörün geçmesi gereken çıta |
| 27 | 2D.4a/b vektör (Qdrant · bge-m3) | 2D | ④ | 🔒 #26'ya bağlı |
| 28 | 2D.5 OPA-POLICY-1 | 2D | — | Tier D'nin üç bacağının önkoşulu |
| 29 | 🔑 A23 ANLAMA KATMANI | Blok 4 | ① ② | A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| — | 🔓 **SOTA KAPISI** | — | — | **1/7** — kalan: #10 · #16 · #18 · #23 · #25 · #29 |
| 30 | Blok 3: EVAL-SPLIT-LAW + ilk ölçüm turu | Blok 3 | ⑤ (K5-iii) | 🔒 kapı arkası |
| 31 | honestbench (Fast_p, yeşil ajan) | Blok 4 | ⑤ (K5-ii) | 🔒 #17'ye bağlı |
| 32 | v1.1 kuyruğu: RULE26-HARDEN-1 · temizlik · M-C · E-1 · golden-infra | Blok 5–6 | — | 🔒 |
| 33 | B-FRONTIER-PAIRING-1 | Blok 3 | ⑤ | 🔒 Kapı SONRASI, ilk skordan ÖNCE. Eşit maliyet (R5) sonradan kurulamaz |
| 34 | AGENTBEATS-INTEGRATION-1 | Blok 3 | ⑤ | 🔒 Yeşil/mor ajan · A2A · task_id izolasyonu. #18 + #2(✅)'ye bağlı |
| ✅35 | ~~CANARY-REP-FAILURE-1~~ | — | ⑤ | S93 KAPANDI `0d622de` (rev 227). Kanarya ailesi bitti; kanıt zinciri şimdi 3 ardışık 9/9-0 |
| ✅36 | ~~FLOOR-RESYNC-1~~ | — | — | S93 KAPANDI (rev 229). BATAKLIK-KURUTMA dalgası tamam |
| 37 | GOLDEN-SET-REPLAYABILITY-1 | Blok 3 | ⑤ | 🔒 İlk skor turundan ÖNCE: isim-yedeği bağımlılığı + alfabetik örneklem + K-3 (cap 3→5). `underpowered` kilidinin MÜHRÜ burada |
| ✅38 | ~~SNAPSHOT-LIFECYCLE-1~~ | — | — | S94 KAPANDI `2d9cb72` (rev 231). Ad benzersizliği + onaylı silme + koruma bayrağı |
| ✅39 | ~~SNAPSHOT-PORTABILITY-1~~ | — | — | S94 KAPANDI `f7af666`+FIX-2 `ed527ec` (rev 232-233). cwf-learn/1 zarfı; ritüel 6/6 bayt-aynı; iki yasa doğurdu (S94-1/2). Nakil kanıtının 2. yarısı kurulum #2'yi bekler (§4 park) |
| **40** | **PERSISTENCE-CLASS-1** | **AG** | — | **SIRADAKİ.** Taşıyıcı `cwf-design-PERSISTENCE-CLASS-1-v1` projede. ADR-014 üretir; sınıfsız tablo CI'ı İKİ yönde kırar. Servis dalgasının (#23/#25/#29) ÖNÜNDE ZORUNLU (S82-6). Doğum kanıtı: kapı iki yönde kırmızı + S66-1 + canlı Sağlık bandı |
| 41 | SWEEP-BARE-DELETE-1 | AG | — | Organ-dışı tüm SECURITY DEFINER gövdelerinde çıplak tam-tablo DELETE taraması; #39 sınıf kapısının ev geneline genişletilmesi. #40 ile dalga ADAYI — şart: S88-1 çapraz kontrol + S92-1 GO emri + çit ayrıklığı KANITLANIR |

**Sayım kontrolü (S94-3):** ✅ dokuz satır (#1·#2·#3·#4·#5·#35·#36·#38·#39) ·
açık 32 satır (#6–#34 arası 29 + #37 + #40 + #41) · 29+3=32 ✓ · 9+32=41 ✓.

---

## §3 · SOTA KAPISI — 1/7

İlk anahtar #2 S93'te doğum kanıtıyla döndü. #38/#39 anahtar DEĞİL —
organın olgunlaşması (altyapı). Kalan altı anahtarın kod izi: canlı grep
S92'de sıfırdı; #10 taşıyıcısı hazır, #16→#18→#23→#25→#29 rollout v3_2
§2/6 sırasında. **#40 hepsinin önünde** (S82-6: sınıflandırma yasası servis
dalgasından önce dikilir).

## §4 · İLK BENCHMARK'A MESAFE

Kapı arkasında adlı üç iş değişmedi: **#33 · #34 · #37** — kapı açıldığı gün
soru yok, kuyruk var. #34'ün iki önkoşulundan biri (#2) artık kapalı;
kalan önkoşul #18. Nakil kanıtının ikinci yarısı (seed-foreign canlı kullanım)
kurulum #2 tetiğinde, SOTA-1 (a)(b)(c) şekliyle register v98 §6'da parklı.

## §5 · PARALEL · NÖBET · PARK · SAHİP KARARI

**Sahip kararı (sırada, yayın ÖNCESİ — S80-3):** `learning.snapshotRetentionMax`
governed yayınlansın mı (kod tabanı 500). #40 promptuyla birlikte insan-dili
karar maddesi olarak gelecek.

**Paralel:** 2B.1 RAG (dış bekleme) · 2B.2 WEB-VALVE-1.

**Nöbet (faz açtırmaz):** CANARY-VERDICT-TRUTH verdikt nöbeti · kanarya
`underpowered` kilidi (mühür #37) · Langfuse aylık fence penceresi (~20'si,
~10 gün) — F-OBS-FLUSH-OK-LIE + OBS-HOST-HEALTH-1 yüksek öncelik ·
GitHub App token formatı (ghs_, ~520 kar.) · W-030/032/033/018/034/035/036/037/038
· UI-POLISH-NOTE · BUG-005 · BUG-014 · header SHA rozeti bayatlığı.

**Açık S94 bulguları (aday faz — sıraya S95'te sahip görünürlüğüyle):**
admin metin-katmanı kapısı üçlüsü — F-S94-VOICEGATE-BLIND +
F-S94-TRUST-COPY-STUTTER + F-S94-HEALTH-SYSTEM-ROW ortak küçük fazı.

**Park (tetikli):** TENANT-CONSOLE/EAIP-TENANT (tetik: müşteri #2 / online
satış) · RELAY-BUS-1 · Doctrine v1_2 D-6 düzeltmesi · SEED-PROBATION (tetik:
Graph-KB ∨ kurulum #2) · nakil kanıtı 2. yarısı (tetik: kurulum #2) ·
ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (tetik: CENSUS) · LangGraph ·
HISTORY-DIET-1 · MEMORY-HYGIENE-Q · ROUTER-DISTILL-1 · QUERY-CANDIDATE-1.

## §6 · İnsan diliyle tek paragraf

Liste 41 kalem; 9'u kapandı, 32'si açık, hiçbiri uçuşta değil. S93 kapının ilk
anahtarını döndürdü (öğrenilmiş beynin görüntüsü/geri yüklemesi doğum kanıtıyla
çalışıyor), S94 o organı olgunlaştırdı (yaşam döngüsü + taşınabilirlik) ve yol
üstünde bir yangından iki kalıcı yasa çıkardı. Kapı 1/7 ve bundan sonrası düz
yol: önce #40 kalıcılık-sınıfı yasası dikilir (her tablo doğumunda sınıf beyan
eder, yoksa CI kırmızı), yanına küçük #41 taraması dalga adayı, sonra alet
kuyruğu (#6-9) ve sırayla altı anahtar (#10·#16·#18·#23·#25·#29). Kapının
arkasındaki üç iş adlı (#33·#34·#37) — kapı açıldığı gün soru yok, kuyruk var.
Süreyi kısaltan tek kaldıraç eşzamanlı şerit sayısı; tavanı Architect'in
RULE-25 inceleme bant genişliği.

<!-- END · cwf-implementation-order-S95-v6 -->
