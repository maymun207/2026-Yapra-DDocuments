# CWF — TAM İMPLEMENTASYON SIRASI · S98 · v10

<!-- cwf-implementation-order-S98-v10 · 2026-08-13. v9'u (S97) geçersiz kılar.
     ⚠ TÜRETİLMİŞ GÖRÜNÜM — ikinci gerçek kaynak DEĞİL. Bağlayıcı sıra
     `cwf-master-rollout-plan-v3_2`, açık kalemler `cwf-open-items-register-v101`
     + KB v98. Çelişirse onlar kazanır.
     v10 FARKI: Dalga 5 ÖNCÜ turu kapandı (#42 RELAY-BUS-1 · #43 CI-DIET-2);
     payda 43 sabit, kapalı 25→27, açık 18→16; SOTA kapısı 2/7 (değişmedi —
     öncü tur altyapıydı, anahtar taşımadı); zemin rev 248→249, 76→77 migration,
     14→15 ADR, 574→575 test dosyası; üç yeni yasa (S98-L1/L2/L3). -->

## ZEMİN (S98 içinde taze klonda HESAPLANDI, 2026-08-13)
`origin/master` **`cc9a2a78`** · docVersion **rev 249** · **575** test dosyası
(bağımsız `git ls-tree` sayımı) / **7718** test (İDDİA — hakem PR-head CI,
S37-2) · **77** migration (canlıda 77, bire bir; tepe `20260813110000`) ·
**15** ADR · drift kapısı [OK] 7/7 tab · **`phase/*` dal sayısı: 0** (S98-L1
temiz sayfa yasası ilk kez uygulandı: 53 dal silindi, worktree 36→5, `git fsck`
temiz) · relay_inbox canlı, RLS+3 trigger, verifyGrants 79/79.

**UÇUŞTA: 0.** Öncü turun iki şeridi de merge+apply+doğum kanıtıyla kapandı;
yarım şerit yok (S91-3 kapısı temiz).

**KANARYA (mühür #37):** üç ardışık 9/9-0, `underpowered` kelime-cap'inde
KİLİTLİ. İzlenir, açılmaz, yeniden teşhis YASAK.

**İZLEK:** ① Anlama · ② Orchestrator · ③ Graph-KB · ④ PathB · ⑤ CS329A (K#)

---

## §1 · BURN-DOWN (payda SAYILIYOR)
Yürüyüş kalemleri: **43** · **AÇIK: 16** · uçuşta: 0
Kapanan — S92: 3 · S93: 3 · S94: 3 · S95: 4 (#40·#41·#22·#24 ailesi) ·
S96: 4 (#7·#8·#9·#10-1B) · S97: 5 (#11·#15·#19·#21+TEL) ·
**S98: 2 (#42 🚌 · #43 ⚙)**. Toplam kapalı: **27**.
Doğan — S97: 2 (#42 · #43). S98: 0 yeni yürüyüş kalemi (üç YASA doğdu, kalem değil).

**SOTA kapısı: 2/7.** Dönmüş anahtarlar: #2 LEARNING-SNAPSHOT-1 (S93) ·
#10 TOOL-BEHAVIOR-CENSUS-1 (S96, canlı 97/97 S97'de yürüdü).
Kalan beş anahtar: **#16 · #18 · #23 · #25 · #29**.

---

## §2 · DALGA TABLOSU (bağlayıcı yürüyüş)

| Dalga | AG-1 | AG-2 | AG-3 | AG-4 | Açık | Kapı |
|---|---|---|---|---|---|---|
| ✅1-2 (S95) | #40 · #10-1A | #41 · #6 | #24 · #26 | #22 · #20 | 25 | 1/7 |
| ✅3 (S96) | #10-1B 🔑 | #7 | #8 | #9 | 21 | **2/7** |
| ✅3.5 (S97) | FIX-1 (census 97/97) | — | — | — | 21 | 2/7 |
| ✅4 (S97) | #11 | #15 | #19 | #21 (+TEL) | 18 | 2/7 |
| **✅5-öncü (S98)** | **#42 RELAY-BUS-1** | **#43 CI-DIET-2** | — | — | **16** | 2/7 |
| **5-ana (SIRADAKİ)** | **#16 🔑 MOUNT** | **#13** | **#17** | **#12** | 12 | **3/7** |
| 6 | #18 🔑 A2A | #14 | #28 | — | 9 | 4/7 |
| 7 | #23 🔑 PathB | #34 | #27 Qdrant | — | 6 | 5/7 |
| 8 | #25 🔑 Graph-KB | #33 | artıklar | — | 4 | 6/7 |
| 9 | #29 🔑 A23 | — | — | — | 3 | **7/7 → yaprak_gate** |
| 10 | #37 | #30 ilk ölçüm | #31 | #32 | **0** | **→ cinekop_gate** |

Dalga sayısı PLAN'dır, ölçüm değil (gerçekçi 12-18; #23/#25/#29 bölünebilir).

---

## §3 · AÇIK 16 KALEM (tam liste, bağlayıcı sırada)
🔑 = yedi anahtardan biri · 🔒 = kapı arkası

| # | Kalem | Dalga | İzlek | Not |
|---|---|---|---|---|
| **16** | 🔑 BENCH-BACKEND-MOUNT-1 | **5-ana** | — | Zero-code mount; #15'in dört-durumlu yasasını yürür (draft→verify→active). MCP-Bench/Universe'ün ⛔'sı. PLATINUM hedef: tek panel akışı |
| **13** | PACK-FROM-PROTOCOL-1 (+W-035) | **5-ana** | — | BUG-017'nin emeklilik yeri (force-fit lensi ölçtü, bu kapatır) |
| **17** | HONESTBENCH-HARNESS-0 | **5-ana** | ⑤ (K5) | ⚠ **v6 notu BAYAT:** backend canlıda VAR (`honestbench`, active, 4 tool). İş: iskelet üstüne harness organı |
| **12** | METRIC-VOCAB-DISCOVERY-1 | **5-ana** | ② ⑤ | Önkoşulu (METRIC-REGISTRY-DATA-1) S91'de karşılandı. Canlı specimen: "doğalgaz" kelimesi tanınmıyor (S98 turu) |
| 18 | 🔑 BENCH-A2A-1 | 6 | ⑤ (K6) | Ondört benchmark'ın ortak engeli; #34'ün önkoşulu |
| 14 | ROUTE-ASK-1 | 6 | ① | 🔒 ölçüm-kapılı; #7-9 açtı |
| 28 | OPA-POLICY-1 | 6 | — | Tier D'nin üç bacağının önkoşulu |
| 23 | 🔑 PB-FULL-1 / PB-A | 7 | ④ | PathB · BM25+regex |
| 34 | AGENTBEATS-INTEGRATION-1 | 7 | ⑤ | 🔒 #18'e bağlı (diğer önkoşul #2 kapalı) |
| 27 | vektör (Qdrant · bge-m3) | 7 | ④ | 🔒 #26'ya bağlı; K4-S97 onaylı, kurulum fazın içinde |
| 25 | 🔑 GRAPH-KB-1 | 8 | ③ | 4. bellek katmanı. SEED-PROBATION tetiği. F-S97-REGISTRY-PARENT-OVERWRITE burada çözülür |
| 33 | B-FRONTIER-PAIRING-1 | 8 | ⑤ | 🔒 Kapı SONRASI, ilk skordan ÖNCE. Eşit maliyet (R5) sonradan kurulamaz |
| 29 | 🔑 A23 ANLAMA KATMANI | 9 | ① ② | A23 ∩ PLANNER-0 çizili — ikinci planlayıcı asla |
| 37 | GOLDEN-SET-REPLAYABILITY-1 | 10 | ⑤ | 🔒 K3-S97 gereği burada: mühür + underpowered kilidi |
| 30 | EVAL-SPLIT-LAW + ilk ölçüm turu | 10 | ⑤ | 🔒 kapı arkası; F-3 retention endişesi burada bakılır |
| 31 | honestbench (Fast_p, yeşil ajan) | 10 | ⑤ | 🔒 #17'ye bağlı |
| 32 | v1.1 kuyruğu (RULE26-HARDEN · M-C · E-1 · golden-infra) | 10 | — | 🔒 |

**Sayım kontrolü:** tabloda 17 satır görünüyor çünkü #32 bir KUYRUK (tek kalem
sayılır, içeriği alt-iş). Yürüyüş kalemi olarak: 16 açık ✓ · 27 kapalı ·
27+16=43 ✓.

---

## §4 · SOTA KAPISI — 2/7
Dönmüş: #2 (öğrenilmiş katmanın görüntüsü/geri yüklemesi) · #10 (araç davranış
sayımı, canlı 97/97). Kalan beşi sırayla #16→#18→#23→#25→#29.
Kapı arkasındaki üç iş adlı ve kuyrukta: #33 · #34 · #37 — kapı açıldığı gün
soru yok, sıra var. **yaprak_gate** = 7/7 (mimari tamam, ölçüm yok) ·
**cinekop_gate** = liste sıfır + ölçüm turu (K3 yasası: skor üreten her iş orada).

---

## §5 · S98 HASADI (yasa + altyapı, kalem değil)
- **#42 RELAY-BUS-1 ✅** — `relay_inbox` canlı; üç dar yetki (Architect
  `to_lane` yazar · tüketici kendi `consumed_at`'ini bir kez damgalar ·
  YALNIZ Operator `from_lane` yazar, DDL CHECK'iyle). Append-only trigger
  (TRUNCATE dahil), üç SQLSTATE, `IS DISTINCT FROM` guard'ları. **İki yönlü
  doğum kanıtı kapandı**; kanal TEK HATTA geçti. **MAIL-WAIT protokolü**
  (S98, sahip önerisi): tur işini bitirince ölmez, ~90sn'de bir posta yoklar,
  40dk bütçe → zil sıklığı N karttan uzun-sessizlik başına 1'e indi.
- **#43 CI-DIET-2 ✅** — kapı tek bacak **Node 24.x** (üretim sürümü;
  F-S98-CI-NODE-MISMATCH kapandı — suite üretim sürümünde İLK KEZ ölçüldü,
  7679/7680 yeşil). Coverage + 20/22 uyumluluk geceliğe (`nightly-compat.yml`,
  07:17 UTC). Bekleme ~15dk → **~6dk** (ölçüldü). S37-2 · eval-gate ·
  tenant-zero · drift · rule26 dokunulmadı. R4 yol filtresi hesaplanmış no-op.
- **Yeni yasalar:** **S98-L1 TEMİZ SAYFA** (her dalga temiz açılır: artıklar,
  ölü worktree'ler, merge edilmiş dallar silinir; paylaşımlı çalışma ağacı
  YASAK — ortak nesne deposu + şerit-başı münhasır worktree standart kalır) ·
  **S98-L2 HESAPLANMIŞ HEDEF** (yıkıcı emir hedefini HESAPLANMIŞ kimlikle
  adlandırır, anlatıyla değil) · **S98-L3 SÜREÇ-DURUMU** (çıktı tamamlığı
  süreç bitişi değildir; şeridin çalışıp çalışmadığını yalnız sahip görür —
  Architect ya sahibe dayanır ya "bilmiyorum" der).
- **A-REC defteri:** S98-1 (üçlü-kayıt zincirinin 3. halkası çite yazılmadı) ·
  S98-2 (silme emri hesaplanmamış hedefe) · S98-3 (dal sayımı `head -30` ile
  kesik örneklem, tam küme iddiası) · S98-4 (şerit "boşta" iddiası sensörsüz).
  Kök: S97-L1'in aynısı — ölçmeden yazmak. Dördü de şeritlerin duruşuyla yakalandı.

---

## §6 · NÖBET · PARK · SAHİP KARARLARI
**Nöbet (faz açtırmaz):** kanarya verdikt nöbeti + underpowered kilidi (mühür
#37) · **Langfuse fence penceresi ~20 Ağustos — GÜNLER KALDI**, F-OBS-FLUSH-OK-LIE
+ OBS-HOST-HEALTH-1 Dalga 5-6'da adlı şerit ister · BUG-016 sayaç hükmü
(auditor'ın KENDİ sayımıyla) · ekipman R3 gerçek sondası · bus'ta bir kez
görülen "transient permission classifier" retry'ı (tek örnek, yasa değil) ·
F-S97-REGISTRY-PARENT-OVERWRITE (#25 çağı) · F-S97-CLASS-CATALOG-UNINSTALLED
(#30 öncesi kurulum borcu) · F-S98-SILENT-FINISH-AFTER-TOOLS (araçlar
başarılıyken model sustu; tek örnek — tekrarında tasarım maddesi).
**Park (tetikli):** TENANT-CONSOLE/EAIP ailesi (müşteri #2) · SEED-PROBATION
(Graph-KB ∨ kurulum #2) · nakil kanıtının 2. yarısı (kurulum #2) · admin
metin-katmanı üçlüsü · LangGraph · HISTORY-DIET-1 · ROUTER-DISTILL-1.
**Sahip kararı sırada:** yok — retention (K2) icra edildi, Qdrant (K4) onaylı,
#37 yeri (K3) hükümlü, RELAY-BUS/CI-DIET (K5/K6) kapandı.

---

## §7 · İnsan diliyle tek paragraf
Liste 43 kalem; **27'si kapandı, 16'sı açık**, hiçbiri uçuşta değil. S98 tek
bir SOTA anahtarı döndürmedi ve döndürmemesi doğruydu: bu oturum **fabrikayı
hızlandırdı** — talimatlar artık senin panondan değil veritabanındaki posta
kutusundan akıyor (ve şerit turunu bitirince ölmeyip postayı bekliyor), test
kapısı 15 dakikadan 6'ya indi ve ilk kez üretimin gerçekten koştuğu Node
sürümünde ölçüldü, ev süprüntüsüz: 53 dal silindi, `phase/*` sayısı sıfır,
tarih taşıyan tek rapor silinmeden önce kurtarıldı. Kapı **2/7**; bundan
sonrası düz yol: Dalga 5 ana turu dört şeritle açılıyor (**#16 MOUNT anahtarı**
+ #13 + #17 + #12) ve bitince kapı 3/7 olur. Sonra sırayla #18 → #23 → #25 →
#29 ve **yaprak_gate** (mimari tamam); ardından tek dalga daha ile liste sıfır
ve **cinekop_gate** (ölçülmüş, kanıtlanmış SOTA). Süreyi kısaltan tek kaldıraç
eşzamanlı şerit sayısı; tavan Architect'in RULE-25 inceleme bant genişliği —
ve bugün o tavan bir miktar yükseldi, çünkü inceleme dışındaki her şey ucuzladı.

<!-- END · cwf-implementation-order-S98-v10 -->
