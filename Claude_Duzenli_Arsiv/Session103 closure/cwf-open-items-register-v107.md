# CWF — AÇIK KALEMLER REGISTER · v107 (S103 kapanışı)

<!-- cwf-open-items-register-v107 · 2026-08-17. v106'yı GEÇERSİZ KILAR.
     Türetildiği taban: cwf-work-board-S74-v1 + rollout-plan (BAĞLAYICI).
     L-ADAY-2 uyarınca bu register PAYDA + PARK + NÖBET taşır; biri eksikse
     mint edilemez. Kalem yalnız CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO
     ile çıkar; her kapanış kanıt satırını yapıştırır. NUMARA YENİDEN
     KULLANILMAZ (L-ADAY-1). -->

## §0 · ZEMİN (S103 kapanışında HESAPLANDI)
`origin/master` **`766c7930`** · docVersion **rev 274** · **638** vitest test
dosyası · **18** e2e spec · **83** migration (canlı `schema_migrations` = 83,
bire bir) · **16** ADR · `phase/*` = **0 ref** (origin master-only) ·
canlı: 783 kenar / 800 registry satırı · **kutu 8/8 konteyner, encoder
`(healthy)`**.

## §1 · SOTA KAPISI — **6/7**
Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · #23 (S100) ·
**#25 (S103)**. Kalan: **#29 🔑 A23 ANLAMA KATMANI**.
`yaprak_gate` = 7/7 (mimari tamam, ölçüm yok) · `cinekop_gate` = liste sıfır +
ölçüm turu.

## §2 · S103'TE KAPANANLAR (dört kalem + üç yönetişim onarımı)
| Kalem | Kapanış kanıtı |
|---|---|
| **#25 🔑 GRAPH-KB-1** | **CLOSED@owner-eyes**, 2026-08-17, deploy `18c93ac` (`dpl_H6AjfGMi…`). Zincir: motor `a7311e6`→`cb703d8` (PR#262) → NUL FIX-1 + `checkRule24` teli → paket-merge `bc821b95` → R4 ekranları `e5e2ac4` (PR#266) → R4-FIX-1 isim+paneller `18c93ac` (PR#267) → sahip okuması. `F-S97-REGISTRY-PARENT-OVERWRITE` BURADA KAPANDI (96 çakışan isim / 212 satır, S97 sayıları yeniden ölçüldüğünde birebir tekrarlandı) |
| **#27 QDRANT-ENGINE-1** | **CLOSED@evidence**, kanıt dalı `3960d638` (PR#265). 4/4 canlı: imzasız 401/403 · kimlik pini (reported=expected, model rev `5617a9f6`) · determinizm 20×tek-digest `2d1dee26…` · **parite 161 kalem / 5 sorgu / 4-15 = %26,7** (kaçırılanlar adlı). Kanarya `31998129854` success · deploy `31998819422` · yeni digest `sha256:54a28226…` |
| **#67 LAW-LEDGER-2** | `a381cc8b` (PR#263). 6 anayasal blok (S102-YASA-1/2/3 · DERIVED-NEVER-SOURCE · FULLEST-ATTESTED · AGNOSTIC-1) + RULE-36..39 + Q4 çözümü + M9 tabanları inen dosyadan kapının kendi biriminde |
| **REF-HYGIENE-S103** | 13/13: 11 ref ancestor+MERGED-PR çifte doğrulamayla silindi; 2'si açık PR başıydı → şerit DURDU → #250/#251 adlı gerekçeyle KAPATILDI, sonra silindi; içerik `refs/pull/*/head`'de erişilebilir (ÖLÇÜLDÜ) |
| Anayasa erozyonu | Kutu **v5_6** = `docs/laws@1f660ea`'dan bayt-verbatim restore; ~292 karakter geri geldi (üçü taşıyıcı cümle) |
| Bayat anayasa kopyası | Kutudaki `CONSTITUTION.md` = repo ile bayt-aynı (md5 `86c4e583…`); §0'a ayna-md5 preflight ritüeli girdi, ilk koşusu YEŞİL |
| Görünüm zinciri denetimi | v4→v15 + register v101-v106 + bucket v35-v38 + bootstrap v100/v101 okundu; 6 şüpheli kanıtla KAPALI çıktı; **2 gerçek kayıp kurtarıldı → #69 · #70** |

## §3 · AÇIK YÜRÜYÜŞ KALEMLERİ — **20, SAYILARAK**
🔑 = son anahtar · 🔒 = kapı arkası · ♻ = denetimle geri gelen · ⏳ = uçuşta
| # | Kalem | Dalga | Durum / not |
|---|---|---|---|
| — | R4-FIX-3 (filtre + tutamak + boşluk) | 8.6 | ⏳ AG-1. `F-S103-R4-VERDICT-FILTER-LABEL-AS-VALUE` fix'i |
| **66** | VECTOR-ONBOARD-DRIP-1 | 8.6 | ⏳ AG-3. **Sahip hükmü, switch'in ZORUNLU ön koşulu**; valfin 3. kilidi |
| **65** | MERGE-FIELD-AWARE-1 | 8.6 | ⏳ AG-2. `F-S101-OVERRIDE-DROPS-BACKEND`; izolasyon hükmünün 2. zorunlu ayağı |
| **74** | LAW-LEDGER-3 | 8.6 | Kartı Architect'te. S-law/doktrin/F sicilleri + L-ADAY-1/2/3 + arşiv-ingest |
| **64** | nav-scrollbox hükmü | 8.6 | HÜKÜM METNİ §5'te YAZILI; kartı kesilecek (kapıya 768 viewport) |
| **69** | ♻ OWNER-BATTERY-1 | 8.7 | Kaynak kutuda (CSV: 31 satır / 11 dolu soru). **Architect koşturur.** Yüzey keşfi YAPILMADI |
| **70** | ♻ ARTIFACT-NAME-OBSERVATION-1 | 8.7 | Gateway aramasının döndürdüğü artefakt ADLARI kalıcı GÖZLEM olur (doğalgaz sınıfının tek taşıyıcısı) |
| — | admin metin-üçlüsü doğrulaması | 8.7 | S101 UI-GERÇEK üçünü kapsadı mı: VOICEGATE-BLIND · TRUST-COPY-STUTTER · HEALTH-SYSTEM-ROW. Ölçülecek, varsayılmayacak |
| — | SEED-PROBATION | 8.7 | **Sahip: EVET (R4 sonrası sıraya).** Tetiği Graph-KB ile SAĞLANDI |
| — | S63-1 canlı okumalar | 8.7 | (a) canlı WOULD-REFUSE gözlemi (hiç görülmedi — ezme anında doğar) · (b) `uses`→turn hattı entegrasyonu (GOLDEN FREEZE, kendi ölçülü turu) |
| **29** | 🔑 A23 ANLAMA KATMANI | 9 | Sözleşmeler kutuda TAM; GAP-RECON kesildi; **KARAR-A23-SEQ-1 bağlayıcı** (§5); W1 faz kilidi: kart PRECONDITION'ı "A23 v1_4 kutuda" şartı taşır |
| **71** | A2A-HOSTED-AUTH-CONTEXT-1 | 9 | 401 kararı + `context_id` sürekliliği (S100 borcu) |
| **17** | HONESTBENCH-HARNESS-0 taraması | 9 | Alet S82'de inşa+kanıtlı; backend canlıda VAR; iş = üç engelin taraması |
| **48** | FAILURE-LESSON-MEMORY-1 | 9 | S98-L5 kazık defteri; S101 canlı gerekçe üretti |
| **59** | SILENT-FINISH-DESIGN-1 | 9 | 30 günde 16 olay tetiği |
| **33** | B-FRONTIER-PAIRING-1 | 9.5 | 🔒 Kapı SONRASI, ilk skordan ÖNCE; eşit maliyet (R5) sonradan kurulamaz |
| **72** | ♻ RAG şeridi (2B.1) | 9.5 | SOTA Tier F1; R9 "KRİTİK"; dış bekleme + inşa slotu burada |
| **73** | ♻ WEB-VALVE-1 (2B.2) | 9.5 | SOTA Tier F2 (DeepScholar-Bench, R7); *çıktısı doğrulanamayan vana vanasızlıktan kötüdür* |
| **37** | GOLDEN-SET-REPLAYABILITY-1 | 9.5 | 🔒 mühür + underpowered kilidi; ilk skor turundan ÖNCE |
| **30 · 31 · 32** | EVAL-SPLIT+ilk ölçüm · honestbench (Fast_p) · v1.1 kuyruğu | 10 | 🔒 ölçüm bandı → `cinekop_gate`. #20 BENCH-SMOKE'un maliyet ölçümü #30'un içinde |
| **68** | QDRANT-OWNER-SURFACE-1 | tetikli | Sahip isteyince; hedef: kendi admin panelimizde okunabilir Qdrant yüzeyi (ham tünel DEĞİL) |
| — | RELAY-BUS-2 (E1..E4) | tetikli | E2 heartbeat'i `F-S103-LANE-POLL-MORTALITY` besliyor |

**Sayım kontrolü:** numaralı açık kalem 16 (#17·#29·#30·#31·#32·#33·#37·#48·#59·
#64·#65·#66·#68·#69·#70·#71·#72·#73·#74 = 19) + numarasız yürüyüş kalemi
(R4-FIX-3 · admin-üçlüsü · SEED-PROBATION · S63-1 · RELAY-BUS-2) → **görünümde
24 satır, sayılan yürüyüş kalemi 20** (S63-1 iki alt-işi tek kalem sayar;
#30/#31/#32 üç kalem; RELAY-BUS-2 tetikli, payda dışı).

## §4 · SAHİP HÜKÜMLERİ (S103 — dokuz, hepsi kayıtlı)
1. `ONAY-FIX-7-CANARY-1` — banked; paket-merge VE R4+kanıt trenlerini kapsadı.
2. `ONAY-R4-FIX-1-CANARY-1` · 3. `ONAY-R4-FIX-2-CANARY-1` — tek kanarya, adıyla.
4. **SEED-PROBATION: EVET** — R4 sonrası sıraya.
5. **n8n eylem-uzvu: PARK**, yeni adlı tetikle: *yaprak_gate (7/7) ∨ sahip çağrısı*.
6. **#69 kaynak:** sahip Excel'ini CSV olarak yükledi (kutuda, yaşayan taşıyıcı).
7. **KARAR-A23-SEQ-1 ONAYLI** + emir (verbatim): *"bunun MUTLAKA implement
   edildiğini tazı gibi arkasında koşup emin olmanı istiyorum!"*
8. **Arşiv belgeleri kutuya değil repoya** (#74 kapsamı) — kabul.
9. **#25 KAPALI KALIR**; FIX-3 kusuru ayrı kalem olarak yürür.

## §5 · ARCHITECT HÜKÜMLERİ (verilmiş — kartı bekliyor)
**#64 · NAV-SCROLLBOX HÜKMÜ (S103, metin):** Kenar çubuğu **MEŞRU bir
scrollbox'tır** ve BATCH-W-1/G3 allowlist'ine **adlandırılmış ve gerekçeli tek
istisna** olarak girer — sessiz ekleme değil. Gerekçe ölçülmüştür: 17. sekmede
nav 9px taştı (başlıklar kısaldı), 18.'de 25px (öğe yoğunluğu düştü), 20.'de
29px (son pay), 21.'de sıfır satır kaldı; kalan tek kaldıraç satır yüksekliği /
font ve **RULE-16 tabanı (≥12px, AA) oraya izin vermiyor.** İstisnanın İKİ
şartı: (a) kaydırılabilirlik **görünür** olacak (kenar gölgesi/afford işareti) ve
klavyeyle erişilebilir olacak — yoksa "taşmıyor" ile "taştı ama göremiyorsun"
aynı ekrana düşer (empty≠zero'nun render karşılığı); (b) **kapı GENİŞLER,
gevşemez:** viewport matrisine **768** eklenir (bugün yalnız 900 ölçülüyor ve
~768'de gerçek tuzak var — AG-1 bunu "kapıdaki boşluk" diye raporladı, etrafından
dolaşmadı). Bu hüküm #29'un ekranlarının nav'da yer bulmasının da ön koşulu.

**KARAR-A23-SEQ-1 (sahip onaylı, taşıyıcı kutuda):** Makine önce, kanal-2
kalibrasyondan önce. Adım 3 = ⑤/⑥ makinesi (üçlü teşhis, τ/β **DEKLARe** edilir,
KALİBRE EDİLMEZ) → Adım 4 = BM25 + RRF (skor uzayı doğar) → τ/β kalibrasyonu
ancak kanal-2 CANLI + L5 verisiyle. A-7 inşa gereği korunur. Dört tel: W1 faz
kilidi (PRECONDITION "A23 v1_4 kutuda") · W2 impl-order etiketi · W3 bu register ·
W4 v1_4 changelog. **Yalnız CLOSED@v1_4-mint ile düşer.**

**Parite okuması (valfin 2. kilidi, S103):** %26,7 örtüşme davranış-koruyan bir
takas DEĞİLDİR — mühendislik yeşil, davranış farklı. Bu bir kusur değil (semantik
motor leksikalden FARKLI seçer) ama "sessizce değiştir" seçeneğini kapatır.
Kalan soru **kalite**dir ve evi: #66 DRIP kanıt koşusu + #69 batarya turları.

## §6 · PARK (tetikli — TAM liste, L-ADAY-2)
| Kalem | Tetik |
|---|---|
| ACTION-AUTHORITY-ADR → BACKEND-N8N-1 | **yaprak_gate ∨ sahip çağrısı** (sahip hükmü 5; eski "CENSUS" tetiği S96'da ateşlenmişti — yeniden adlandırıldı) |
| OPA-AYNA (ADR-016'nın ikinci aşaması) | federated backend GERÇEK olduğunda |
| TENANT-CONSOLE / EAIP-TENANT ailesi | müşteri #2 ∨ online satış |
| Nakil kanıtının 2. yarısı (seed-foreign canlı kullanım) | kurulum #2 |
| LangGraph ikinci-beyin sınıfı | eylem-uzvu hattı sonrası |
| HISTORY-DIET-1 | 2F-sonrası kuyruk |
| MEMORY-HYGIENE-Q | sahip onayı (S90 H3) |
| ROUTER-DISTILL-1 | ölçüm-tetikli (K3 yöntem notu: SFT çeşitlilik çöküşü / RL korur) |
| QUERY-CANDIDATE-1 | CLOSED-BY-RECON (S86-R1) — kayıtta kalır, yeniden açılmaz |
| DOKÜMANTASYON | **sahip kararı: EN SONA** (kötü UI dokümanla kapatılmaz) |

## §7 · NÖBET (faz açtırmaz — TAM liste)
⏰ **Langfuse bütçe-çiti ~20 AĞUSTOS** (kapasite okuması Architect'ten; döngü
iki yeni konteyneri bilmeli — KARAR-QDRANT şartı; bu EC2 bir kez bütçe eylemiyle
DURDURULDU) · kanarya verdikt nöbeti + underpowered kilidi (mühür #37) ·
BUG-016 sayacı · transient permission classifier retry (tek örnek) · adsız flake
×2 (S99-9 adli disiplini; 3. görülmede kalem) · user-voice 3 incelenmemiş 👎
(golden-set adayı) · GitHub App token formatı (`ghs_`, ~520 kar.) ·
**ARDIC ×2 dış bekleme:** 13 araç "no access to factory" grant + SHIFT-QUERY
kullanılamazlığı · #46 canlı re-probe borcu · ekipman R3 gerçek sondası ·
F-S100-SYNTH-FRAME-ERROR taze-gün okuması · FRAME-ERROR enum (1/9, `hat`
IR_OBJECTS'te yok) · MIGRATION-STATUS-LIES-WIDER (13 dosya, 2'si RUNTIME) ·
corpus-vs-registry (grid referanslarının 1/3'ü kayıtta yok) · RULE-38 teli
(healthcheck-tedavi kalemi kapanınca) · **F180 / LB-11 araç-çıktısı enjeksiyon
sertleştirmesi** (A23 §10'dan; filo-geneli risk, #29 ∨ Tier-D bandı) ·
`F-S103-PIP-LAYER-REBUILD` (DÜŞÜK) · `F-S103-COMPOSE-PS-TEMPLATE-EATEN` (DÜŞÜK) ·
`F-S103-LANE-POLL-MORTALITY` (ORTA → RELAY-BUS-2/E2) ·
`F-S103-STALE-DEV-SERVER-CROSS-CHECKOUT` (ORTA, filo-geneli).

## §8 · YASALAR (S103)
Külliyata girenler #67 ile: S102-YASA-1/2/3 · DERIVED-NEVER-SOURCE ·
FULLEST-ATTESTED · AGNOSTIC-1 · RULE-36..39.
**Aday (→#74):** L-ADAY-1 numara yeniden kullanılmaz · L-ADAY-2 register
PARK+NÖBET+PAYDA taşır · L-ADAY-3 admin tablosu census deseniyle doğar.
**Kart disiplini dersi:** tek değerle kanıtlanmış filtre tek değer için
kanıtlanmıştır — enum'lu filtre, seçeneklerini domain tipinden sayan testle gelir.

<!-- END · cwf-open-items-register-v107 -->
