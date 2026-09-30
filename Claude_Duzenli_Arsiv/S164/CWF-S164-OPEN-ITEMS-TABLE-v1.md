# CWF-S164-OPEN-ITEMS-TABLE-v1 — A25 + A26 + TÜM AÇIK İŞLER (sahibin saklama kopyası)

Kesildi: S164, 2026-09-30 07:00 TSİ (04:00Z), sahip turu 11. Bu tablo register'ın YERİNE GEÇMEZ; register v157 S164 kapanışında kesilir ve bu tabloyu adıyla anar.
Çapraz kontrol kaynakları: sahibin CWF-S161-OPEN-ITEMS-TABLE-v1'i (doc repo S161/, 11007 bayt, tamamı okundu) · register v156 (tamamı okundu) · A26 v1_2 §9 · canlı ölçümler aşağıda.
ÇAPA (ölçüldü 03:57Z): master `1b2553c960317ab0cc0718e51dda8b7bc92bc112` (PR 640, Vercel prod READY) · açık PR: 641 (M1, head `dbfd228a983c19c5064b9ee01b61ece9ff0f8695`, CI 4/4 success) · otobüs relay_inbox 03:40Z sonrası okundu.
Sütunlar: Reg # = register numarası (S164 yeni satırları "S164-n", v157'de numara alır) · Durum = 04:00Z · Sonraki = ne · kim · ne zaman. Ölçülmeden taşınan satır "CARRIED" der. Tarihler HEDEFTİR, ölçülmüş hız: S161–S164 arası oturum başına 2–4 iniş.

## A · S164'TE KAPANANLAR / HÜKÜMLER (kanıtıyla)
| Reg # | Kalem | Kanıt |
|---|---|---|
| 141 | routing_obligation sahip tanıklığı (pişmiş → getCookedStockAndon) | domain_rules 322f9505-4473-4fff-bea1-1ceffde98250 published v1 · turn a39df592d6aaeb84ac90edb3ce51b768 stage 07 obligationsApplied outcome "offered" · 32 satırlı cevap (OWNER-WITNESS-S164-ROUTING-OBLIGATION-1) |
| 142 | TOUR-HONESTY inişi (S1 search_tools kapsamı + S4 boş ≠ sıfır) | PR 640 merge `1b2553c960317ab0cc0718e51dda8b7bc92bc112`, Vercel prod READY (PR 639 kırmızıydı → taze dal -2) |
| 103 E1-b | K-A fixture MCP backend (finans + lojistik 30 araç, kaExam) | **PR 633 merge `3d2f06a58c708cfc0c7f06fe9dac62c45a118cbd`** — S163'te inmiş ama register v156 "NOT landed, CARRIED UNVERIFIED" diye taşıdı. BUGÜN ölçüldü: dal `ebda839a…` master'ın 0 önünde, 11 gerisinde; master commit listesinde PR 633. Bulgu: F-S164-E1B-LANDED-UNRECORDED-1 |
| 140 A26 | A26 v1_2 YÜRÜRLÜKTE | OWNER-RULING-S164-A26-V12-1 ("onay A26 v1_2") · md5 6d71d26d3ffcd5226a26c7bc58ccb1a4 |
| 140 M3 | Geri bildirim = kanıt (measure-1 §2 değişikliği) | OWNER-RULING-S164-FEEDBACK-EVIDENCE-1 ("onay feedback-evidence") — M3'ün önündeki tek engel kalktı |
| 107 | Doküman reposu push | AG-4, ls-remote = `59b703fa…` (S164 içinde); bugünkü commit'ler yine ileride → kapanışta push notice |

## B · ŞU AN YÜRÜYEN (şeritlerde, 04:00Z)
| Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|
| 140 M1 | MCP isError geçişi (hata hata olarak görünür; araç mesajı reddi taşır) | PR 641 AG-1, CI 4/4 yeşil; ORDER-SCOUT-LAND-PR641-S164-1 scout-1'de (03:45Z) | scout-1 iner → Vercel READY · **bugün ≤ 04:30Z** |
| 140 M2 | Dürüst derecelendirme (boş cevap pozitif sayılmaz; başarısız tur öğretmez; MemoryTab rozeti) | AG-3 prep dalı `9b6715b0…`: D1–D5 yeşil, F7'de DURDU (soru turu taşınan seçeneğini kaybediyordu). Hüküm verildi: NOTICE-M2-F7-RULING-S164-1 (shape b, yalnız `offerable`), scout-2 aynı hükmü paralel inceliyor | M1 indikten sonra taze dal → PR → scout-1 · **bugün** |
| 143 | K41 düğme ayrımı (router.matrixReplace / keywordArmAllPaths) | dal `e2cb64c0` master'dan ayrışmış: 1 önde, 6 geride, 22 dosya | M2'den sonra taze-dal kartı (tek açık PR kuralı) → PR → scout-1; sonra SEN Rules UI'dan iki düğmeyi çevirirsin · **bugün/yarın 1 Eki** |

## C · A26 PROGRAMI — BELLEK & ÖĞRENME (v1_2 §9; register 140)
| Adım | İçerik | Durum | Bağımlılık | Hedef |
|---|---|---|---|---|
| Track 0 | Ölçüm: trace builder yok, trace_label yok, K23 kodu yok, bölüm okuyucuları adlandırıldı | BİTTİ (PII hariç) | — | ✓ |
| Track 1b | **PII dedektörü** — hiçbir yerde yok (redaction.ts yalnız sırları maskeler); yokken no_pii = UNKNOWN, paylaşılan hiçbir öğrenilmiş satır yayınlanmaz | kesilmedi (S164-1) | — (paralel) | kart 1–2 Eki |
| M1 | isError geçişi | PR 641 yeşil (B) | — | bugün |
| M1B | examScorers readResult hükmünü de taşısın (M1 kalıntısı) + turn-dışı isError yolları (entityDiscoverySync.ts:389, gatewayEnumerate.ts:143/160) | kesilmedi (S164-2) | M1 | 1 Eki |
| TOUR-HONESTY | boş ≠ sıfır, search_tools kapsamı | İNDİ PR 640 | — | ✓ |
| M2 | dürüst derecelendirme + Δ-K1 `numeric.unsourced` lift + Δ-43 offerable = clean ∨ outcomeHonest | AG-3 (B), F7 hükmü verildi | M1 | bugün |
| M2B | W5: gönderilmemiş (not-sent) çağrı "başarı" sayılıyor | kesilmedi (S164-3) | M2 | 1 Eki |
| M3 | Geri bildirim döngüsü: human{label,reason} kanıt olarak (admin yolu, turn/** dışı) + inceleme kuyruğu UI + pin testinin güncellenmesi | hüküm VERİLDİ; kart kesilmedi | M2 | kart bugün → scout-2 → 1–2 Eki |
| M4 | Bellek enstrümanı: offered/used (+ helped yalnız gölgede) + panel + abstention dilimi | kesilmedi | M2 | 2 Eki |
| A26-P1 | trace_label (kaynak: telemetry tool_call + episodes.decision.outcome; callId+isEmpty eklenir) · store-time PII temizliği · düzeltme sözlüğü (yönetişimli) · CANLI recall-aday günlüğü · aday çıkarıcı iskeleti (yayın yok) | kesilmedi | Track 0, M1–M3, Track 1b | 2–3 Eki |
| A26-P2 | learned_proposals + tür-başı uygunluk (Δ-K2 tek kural: her bit SETTLED) + N/M/K + K34 genel + §9a güvenlik ifadeleri (yetki, silme kaskadı, tenant sütunları) + silme defteri AYNI transaction'da (Δ-K3) + `evidence.append_only` ailesi + envelope formatVersion (Δ-K4) + ilk ÖĞRENİLMİŞ örnek fixture backend'de yayın + geri alma | kesilmedi | P1, §9a | 4–6 Eki |
| A26-P3 | Graf KB containsAmong → stage 03 · bi-temporal `entity_fact` (yalnız backend'de olmayan olgular, Δ-K5) · iki deneyim serisi · tool_category_cache yazımı emekli · kullanıcı-kapsamlı iki yolun (carried ask, offeredRoutine) kapı kararı | kesilmedi | P2 (A25 E4 ile birlikte) | 7–8 Eki |
| A26-P4 (=A25 E5) | Gölge ORDER-lane recall (vektör dahil) · iki ölçüm etiketli sınav turlarında (Δ-K6) · decay/zehirlenme paramları ölçümle · C10 emekli | kesilmedi | P3, A25 E3 | 9–10 Eki |
| MEMORY-1 barı | Referans sistemler, görev sayısı, altın cevaplar, **yeni altın-cevap skorlayıcı** (Δ-K7), eşikler — ilk koşudan ÖNCE sahip onayı; SOTA tanımına girişi AYRI hüküm | açık (v1_2 §12) | M4 | sen 3–4 Eki'de hükmedersin |
| Gerekirse | Operator okuması: boş cevaplar çıkınca deneyim pozitifi sıfıra düşecek araç sayısı / backend (M2 D4 yeniden-prob deltası) | UNMEASURED | M2 | Architect okur, bugün |

## D · A25 PROGRAMI — YETENEK DOKUSU (register 103; OWNER-RULING-S159-A25-ADOPT-1)
| Aşama | İçerik | Durum | Sonraki / hedef |
|---|---|---|---|
| E1 zemin | E1-a K11 üç held-out set + K25 barı + dürüstlük metriği | İNDİ PR 635 (+ migration) | ✓ |
| | E1-b K-A fixture MCP backend | İNDİ PR 633 (bugün ölçülerek düzeltildi, A) | ✓ |
| | E1-c K-G aleti (case-sensitive backend-adı kapısı, public/ dahil) | İNDİ PR 628 | ✓ (sıfır kapısı E5'te silahlanır) |
| | **E1-d üç sağlayıcı faturalı baseline** | KESİLMEDİ — her ateşleme ADLANDIRILMIŞ harcama onayı ister (S102) | kart 1 Eki → ⚡ senin harcama onayın |
| E2 sözleşme | K32 routing_obligation | İNDİ PR 638 + 141 tanıklığı | ✓ |
| | K41 düğme ayrımı | dal (143) | B |
| | 119 iki backend kayıt defteri → tek veri + kategori doğumu | kesilmedi | kart 1–2 Eki, scout önce |
| | K33 araç kimliği (index.json yazıcı hedefi dahil) · ranking_policy kind · K38 · trace v2 K35 · 40e router.maxTools/maxSchemaTokens/maxFanout · K34 decideGoldenPublish (96 ile) · tool_experience → view · K40 fren | kesilmedi (~6 kart) | 2–4 Eki |
| E3 gölge | routeShadowLens B kolu replay'lenebilir · per-backend Recall@k (etiketli sınav turlarında) · 97 anahtar kelime hijyeni · 105 personel sorusu T2 · 36 vektör eşleşmesi · 40d P2 kanal-2 BM25+RRF | kesilmedi | 5–6 Eki |
| E4 katman | 7 ebeveyn→çocuk K31/K39 · şirket katmanı veriye · 85 Graf KB tool_graph_node · 10 zaman dilimi + K29 takvim (A26-P3 ile ortak) | kesilmedi | 7–8 Eki |
| E5 öğrenme + KALDIRMA | MATRIX 6×13 · IR enum'ları · alias enum · HAND_PACKED_BACKENDS (82) · 'machine-knowledge-base' literali · K-G sıfır kapısı yeşil = ARMES hardcode SIFIR (58 G3/G4) · A26-P4 | kesilmedi | 9–10 Eki = %100 çıkışı |
| A24 kalıntıları | 39 P0 ölçümleri (M-a → E1-a setleriyle KARŞILANDI, MERGED-INTO önerisi; M-b/M-c/M-d/handle/stage-12/M2/M3′ CARRIED) · 45 env dosyasıyla paramlar · 8 Typer · 9 L5 kaçırma defteri (=K36, E2/E3) · 10 zaman · 36 vektör · 7 ebeveyn→çocuk | CARRIED | E2–E4 ile |
| 106 | Sayı biçimleri ("1 250 000", "12,5 milyon") | kesilmedi (S161'den beri) | küçük kart, boş şeride · 1 Eki |

## E · ÜRÜN KUSURLARI
| Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|
| 120/131 | Sahip turu "KB7 pişmiş stokta hangi işler?" | K32 + obligation + TOUR-HONESTY üretimde; 32 satırlı cevap geldi | K41 inip düğmeler çevrildikten sonra SEN yeniden sorarsın; doğruysa 131 kapanır · 1 Eki |
| 84 | Backend çökünce uyduruyor mu — canlı test (+ entryFloorSource okuması) | ÖLÇÜLMEDİ | scout canlı okur, M2 sonrası · 1 Eki |
| 50 | Gruplu payload: recordCount tek grup | açık | küçük kart · 2 Eki |
| 59 · 60 · 61 · 62 | Sayı damgası yanlış alarm · hatırlanan = ölçülmüş · "hepsi" · sabit bölme tavsiyesi (62 → E5) | açık | 59+60+61 tek kart · 2 Eki |
| 21 | S141'in iki hatası | ölçülmedi | scout ölçer, E1 setine vaka |
| 13 | Converge ilişkilendirmesi çöküyor (11 Eyl'den beri) | bir okuma uzakta, CARRIED | Architect okur, bugün boş turda |
| 28 | Doküman/şirket soruları geniş replay | E1 zemini hazır | E3 gölgesiyle |
| 41 | Web valfi üretimde açık; Q4 yeniden sorulmadı | SAHİP | senin sorun |

## F · FABRİKA
| Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|
| 17 | Scout bus yazıcısı | PR 636 ile ÇALIŞIYOR (bugün scout-2 beş, scout-1 bir durum satırı yazdı) | KAPANIŞ ADAYI @PR 636 — v157'de |
| 67 | consumed_at yalnız --take damgalar; scout'lar damgalamaz (bugün her scout emri consumed_at NULL, işlendiği hâlde) | daraltıldı | "işlenmemiş ≠ damgasız" okuma kuralı yürürlükte; mekanizma kartı E2 sonrası |
| 121/133 | Merge guard dörtlü kilit | tek-açık-PR kuralı (145) ile aşılıyor; guard kartı kesilmedi | 3 Eki |
| 66 | tsx IPC EPERM: giriş anahtarı indi (634) ama tsx CLI başlatan testler kaldı — AG-3 bugün tam suite'te 16 sandbox EPERM raporladı | açık, daraltıldı | küçük kart · 2 Eki |
| 64 · 71 | noRuntimeApiImport dinamik import · atlanamaz dispatch-öncesi preflight hook | açık | 71 kanıtı bugün de: kartlarım repo CP-1/2/3/4/10'da REPORT modunda düşüyor (S164-4) |
| 96 | Altın kapı zayıf + kapalı runner sessiz | açık | E2 K34 ile |
| 98 | Guard hata mesajı taze-dal çaresini adlandırsın | açık | küçük kart |
| 135 · 146 · 147 · 149 · 144 | backend-name kapısı mock sayıyor · AG007 başlık literali · paylaşılan klon settings.local · free.md --since · POST-LANDING-1 (authority snapshot + scout genişlemesi) | kesilmedi | 144 bugün (plan); diğerleri boş şeride 1–3 Eki |
| 55 · 56 | İki yönlü bus-uyandırma hook'u · saniye timeout | mail-wait döngüsü (126) şerit tarafını karşıladı | SUPERSEDED-BY 126 önerisi — sen onaylarsın |
| 15 · 16 · 18 · 23 · 31 · 32 · 33 · 35 | Devralma v3 · ruleset:drift · actionlint · land.ts sil · CP-3 · dal hijyeni · workflow lensi · BUG-BUCKET v58 | CARRIED | küçük kartlar boş şeride |
| 22 · 53 | OPA keşif · dalga düzeni (bugün AG-1/3/4 + 2 scout) | sürekli | — |
| 93 | Zamanlanmış workflow okuması | S164'te OKUNMADI | kapanışta 1b2553c9'da okunur |
| 123 · 126 · 136 | Scout ön-koşullu emirler · şerit bekleme döngüsü · scout hükmü şeride adreslenmez | 126 yürürlükte (bugün sıfır yapıştırmalı kart döngüleri) | kapanışta ölçülür |

## G · GATE-1, ESKİ KALEMLER, SAHİP KALEMLERİ
| Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|
| 68 | ⓶ merge-yetki istisnasının çeliği | ÖLÇÜLMEDİ; inişler auto-merge | scout ölçer → SUPERSEDED-BY önerisi |
| 69 | ⓷ ADF-ARCHITECTURE-v2 inişi (H2) | ÖLÇÜLMEDİ | sen H2'ye hükmedersin |
| 72 · 73 | ⓻ P-9 · P-6 kapanış kriteri | sahip hükmü | sen |
| 74 | MA-RERUN koşu yarısı | S135'ten beri | dal ref'inde dispatch, A25 sonrası |
| 75 | S140 planı kalanı | büyük ihtimalle E1/E3'e SUPERSEDED | sen onaylarsın |
| 76 | Eksik bootstrap v140/v141/v143, S139 | açık | sen cwf_yaprak_8'den aktarırsın |
| 77 | architect:open okunamıyor | NOT-READ | node --import tsx ile köprüde dene |
| 79 | SOTA kabul skoru 0/16 | CARRIED | E1 bitti → Architect cwf-sota-definition v1_5 ile skorlar · 2 Eki |
| 14 · 24 | Redis rotasyonu · fırın 7 günlük duruş tanıklığı | SAHİP | senin |
| 2 · 3 · 4 · 27 | Bench | DONDURULMUŞ | — |

## H · SÜREKLİ UYGULAMALAR
26 · 37 · 49 · 52 · 63 · 80 · 92 · 93 · 100 · 101 · 102 · 108 · 110 · 116 · 117 · 118 · 122 · 127 · 145 (tek açık PR, taze dal) · 148 (migration'lı inişte operatör adımı aynı tur) · 150 (her tick gh.sh çapa okuması) · 151 (köprü paylaşılan klonda yalnız geçmiş okur).

## I · ÇAPRAZ KONTROLÜN SONUCU (S161 tablon → bugün)
- S161 tablosunda AÇIK görünüp artık KAPALI olanlar: 114 (@627) · 113 + 124 (@634) · 87 · 118 · E1-a (@635) · E1-b (@633) · E1-c (@628) · 125 · 128/134 (@636) · 132 · 141 · 142.
- Register v156'nın YANLIŞ taşıdığı tek satır: E1-b "NOT landed" — PR 633 ile S163'te inmişti (F-S164-E1B-LANDED-UNRECORDED-1; F-S122-STALE-COUNT sınıfı). Senin tablonda da açıktı; bugün ölçümle düzeltildi.
- S161 tablosunda OLMAYIP şimdi olanlar: 140 (tüm A26 programı), 141–151, S164 yeni satırları (J).
- Hiçbir satır düşürülmedi: S161 tablosundaki her Reg # yukarıda bir satırda ya da A'da duruyor (58/82/83 → D E5; 39/45/8/9/10/36 → D A24 kalıntıları; 40d/40e → D E2/E3).

## J · S164 YENİ SATIRLARI (v157'de numara alır)
| # | Kalem | Sınıf | Çözüm · ne zaman |
|---|---|---|---|
| S164-1 | PII dedektörü yok (Track 1b) | ürün/güvenlik | kart 1–2 Eki, scout önce |
| S164-2 | CARD-M1B: examScorers readResult + turn-dışı isError yolları | ürün | M1 sonrası · 1 Eki |
| S164-3 | CARD-M2B: W5 gönderilmemiş çağrı başarı sayılıyor | ürün | M2 sonrası · 1 Eki |
| S164-4 | F-S164-CARD-GRAMMAR-1: kartlarım repo mail-wait CP-1/2/3/4/10'da düşüyor, CARD_GATE=REPORT olduğu için geçiyor (§12.13) | fabrika | 71 ile; kapanışta ölçülür |
| S164-5 | A-REC-S164-1: kart CI-only kapıları (relayAudit, tenant-zero) adlandırmadı → PR 639 kırmızı | Architect | her kart CI kapı listesini taze klondan alır — yürürlükte |
| S164-6 | F-S164-E1B-LANDED-UNRECORDED-1 | kayıt | A'da düzeltildi; v157'de 103 E1-b CLOSED@PR 633 |
| S164-7 | M2 F7: soru turu offerable=false olup taşınan seçeneği kaybediyordu | ürün | NOTICE-M2-F7-RULING-S164-1 (shape b) · bugün |
| S164-8 | numeric.unsourced groundingSummary'e taşınmıyor (Δ-K1) | ürün | M2 / A26-P1 teli |

## K · BUGÜNÜN SIRASI (onaylı S164 planı içinde)
M1 iner (scout-1) → M2 taze dal + PR → K41 taze dal + PR → M3 kartı (scout-2) → M4 kartı → POST-LANDING-1 → kapanış seti (register v157, bootstrap v169). Tek açık PR kuralı: her iniş bir öncekinin master'ı üstünde.

END · CWF-S164-OPEN-ITEMS-TABLE-v1
