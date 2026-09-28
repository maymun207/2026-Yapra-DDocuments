# CWF-S161-OPEN-ITEMS-TABLE-v1 — AÇIK KALEMLER TABLOSU (sahibin saklama kopyası)

Kesildi: S161, 2026-09-28 03:15 TSİ (00:15Z), sahip turu 9. Kaynaklar: register v152 (tam), sahibin S158 konsolide listesi (tur 8'de çapraz kontrol edildi), S161'de ölçülenler. ÇAPA: master c58438b59cff4d1d403634b28e44af9b01db6dea (PR 625; Vercel prod READY). Açık PR: 0. Bu tablo register'ın YERİNE GEÇMEZ; register v153 S161 kapanışında kesilir ve bu tabloyu adıyla anar. Ölçülmeden taşınan her satır "CARRIED" der.
Sütunlar: Panel # = yan panel görev satırı · Reg # = register numarası · Durum = 00:15Z itibariyle · Sonraki = ne, ne zaman, kim.

## A · S161'DE KAPANANLAR (kanıtıyla)
| Reg # | Kalem | Kanıt |
|---|---|---|
| 91 | cwf_lane şifre rotasyonu | ALTER 2026-09-27T23:38:13Z (operator, postgres_logs) · SLIP-LANE-PASSWORD-ROTATION-S157-1-ORDER3 bus 68a209f1 (23:48:25Z) · 3e supavisor log okuması PASS · CLOSURE-ITEM91-LANE-PASSWORD-ROTATION-S161-1 |
| 115 | F3/F6 iki açık hüküm | OWNER-RULING-S161-F3-F6-1 ("F3 onay, F6 onay", 02:37 TSİ) · RULING-S161-F3-F6-1; uygulama 114 kartında |
| 112 | ORDER 0 floor satırı (S160'ta kapandı, teyit) | domain_rules ff915392… published v1 2026-09-27T18:09Z |

## B · ŞU AN YÜRÜYEN (şeritlerde, 00:15Z)
| Panel # | Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|---|
| 4 | 114 | CARD-ENTRY-FLOOR-REQUIRED-S161-1-v1: entryFloor parametresi zorunlu · F3 stage-07 metni · F6 mcp-catalog fail-closed + "kural deposu okunamadı" rozeti · tekil e2e locator (rule-key-input) · Rules formu JSON hatası | AG-4'te (bus 6fb2435d, 23:45:57Z); dal/PR henüz görünmedi (00:13Z) | PR → CI tam sha → scout iniş emri → master, yeşilden 30 dk içinde · bugün |
| 8 | 107/118 | Doküman reposu push (5 commit ileride, HEAD 78f681c) | NOTICE-PUSH-DOC-REPO-S161-1 AG-1'de (bus c9c82d59); ls-remote 40-hex kanıtı bekleniyor | AG-1 slip / ekran aktarımı · şimdi |
| 5 | 113 | CARD-LANE-SANDBOX-ALLOWANCES-S161-1-v1: pooler DNS · doc-repo tracking-ref · tsx IPC · gh TLS — ORDER 0 "önce ölç" | scout-2 hasım incelemesinde (bus 1eb42aed, 23:57:33Z) | GREEN → AG-1 · bugün; RED → v2 |
| 2 | 87 | Şerit DB şifresi her pencerede | Rotasyon sonrası IDE yeniden açıldı; ilk pencere DIGEST'i (7daa7d999500 olmalı) henüz okunmadı | AG-1/AG-4 çıktısının ilk satırı · şimdi |

## C · A25 PROGRAMI (ürünün omurgası; OWNER-RULING-S159-A25-ADOPT-1)
| Panel # | Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|---|
| 6 | 103 E1 | Değerlendirme zemini: K11 üç ayrık held-out set + kabul-küme etiketleri · T1–T4 regresyon seti · K-A fixture MCP sunucusu (finans, 30 araç, JSON) + K-A′ ikinci sözlük · K-G aleti (case-sensitive armes grep, public/ dahil, =0 kapısı) · 3 sağlayıcı faturalı baseline (her ateşleme ADLANDIRILMIŞ harcama onayı) · K25 barı | ~4 kart, hiçbiri kesilmedi | E1-a + E1-c bu tur kesilir → scout-1/scout-2 paralel → AG-1/AG-2/AG-4 paralel; hedef E1 = bu oturum + 29 Eyl |
| 10 | 103 E2 | Sözleşme: K33 araç kimliği (index.json'un tek backend'i yazıcı hedefi yapması dahil, F-S160-BACKENDS-INDEX…) · routing_obligation + ranking_policy kinds · K38 · trace v2 K35 · router.maxTools/maxSchemaTokens/maxFanout (40e ile) · K41 düğme ayrımı · decideGoldenPublish K34 (96 ile) · tool_experience → view · K40 | ~7 kart, kesilmedi | E1'den sonra; hedef ≈ 3 Ekim |
| 10 | 103 E3 | Gölge (routeShadowLens arm B replay'lenebilir; per-backend Recall@k); 97 anahtar kelime hijyeni · 105 personel sorusu T2 · 36 vektör eşleşmesi · 40d P2 kanal-2 BM25+RRF | kesilmedi | E2'den sonra |
| 10 | 103 E4 | 7 ebeveyn→çocuk katman K31/K39 · şirket katmanı veriye (F-S159-COMPANY-LAYER-IS-CODE-1) · 85 Graf KB tool_graph_node okur · 10 zaman dilimi + K29 takvim | kesilmedi | E3'ten sonra |
| 10 | 103 E5 | Öğrenme (kapılı) + KALDIRMA: MATRIX 6×13 · IR enum'ları · alias enum · HAND_PACKED_BACKENDS (82) · 'machine-knowledge-base' literali · K-G kapısı yeşil = ARMES hardcode SIFIR | kesilmedi | E4'ten sonra; %100 = E5 çıkışı, hedef ≈ 7–10 Ekim (ölçülmüş hızla; paralelle ≈ 3–4 Ekim) |
| 9 | 58 / 82 / 83 | NO ARMES HARDCODE: G3 test/fixture/yorum/diyagram · G4 CI grep kapısı = K-G · 82 daraltıldı (HAND_PACKED_BACKENDS + mkb literali kaldı) · 83 kod+veri yarısı KAPALI | E1-c (K-G) + E5 | E1-c bu tur |
| 13 | 39 | A24 P0 ölçümleri: M-a held-out sayıları · M-b item-5 analizörü · M-c RBAC ikinci lens · M-d üretim günü tanımı · handle eşiği 39 KB · stage-12 hüküm metni · M2 MKB korpusu · M3′ replay | M-e bitti; kalanı CARRIED | E1 zemini ile (K11 setleri M-a'yı kapsar) |
| 20 | 45 · 8 · 9 · 10 · 36 | A24 kalıntıları: 45 parametreler env dosyasıyla (OWNER-RULING-S150 ikinci yarı) · 8 Typer · 9 L5 kaçırma defteri (=A25 K36) · 10 zaman dilimi+K29 · 36 vektör eşleşmesi 3/15 | CARRIED | 9 → E2/E3 K36; 10/36 → E3/E4; 45 → E2 sonrası tasarım; 8 → 13'ten sonra kart |
| 7 | 106 | Sayı biçimleri: "1 250 000" boşluklu gruplar tek literal; "12,5 milyon" çarpanları | kesilmedi | küçük kart → scout → AG · boş bir saatte, bugün |

## D · ÜRÜN KUSURLARI
| Panel # | Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|---|
| 14 | 84 | Backend çökünce CWF uyduruyor mu — canlı test (+ stage-07 span'da entryFloorSource okuması; F6 sonrası 'unread' adlandırılır) | ÖLÇÜLMEDİ | 114 indikten sonra scout canlı okur |
| 15 | 50 | Gruplu payload: recordCount tek grubu sayıyor; saklanan handle ilk grubu tutuyor | açık | AG-4 küçük kartı, E1 kartları arasında |
| 15 | 59 · 60 · 61 · 62 | Sayı damgası yanlış alarm ("5 Neden Analizi") · hatırlanan iddia ölçülmüş gibi · "hepsi" deniyor · sabit bölme tavsiyesi (62 → E5) | açık | 59+60+61 tek küçük kart |
| 15 | 21 | S141'in iki hatası: CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF · PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID | ölçülmedi | scout ölçer, E1 setine vaka olarak girer |
| 15 | 13 | Converge ilişkilendirmesi 11 Eylül'den beri çöküyor | bir okuma uzakta (CARRIED) | Architect okur · bu oturum boş turda |
| 15 | 28 | Doküman/şirket soruları geniş replay (sermaye sorusu S158'de kapandı) | E1 replay zemini | T1–T4 seti içinde |
| 17 | 41 | Web valfi üretimde açık; Q4 yeniden sorulmadı (M-f) | SAHİP | sen Q4'ü yeniden sorarsın |

## E · FABRİKA (şeritler, kapılar, bus)
| Panel # | Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|---|
| 11 | 67 / 17 | consumed_at yalnız --take damgalar (F-S160); okuyucu damgalasın + scout tüketilmiş emri reddetsin · scout bus yazıcısı | mekanizma ölçüldü | kart, 113 indikten sonra (sandbox bus yazısını açmalı) |
| 12 | 96 | Altın kapı zayıf (110/200 boş rep) + kapalı runner sessiz | açık | E2 K34 kartı ile |
| 16 | 98 | Merge guard hata mesajı taze-dal çaresini adlandırsın | açık | küçük kart |
| 16 | 66 · 64 · 71 | tsx IPC EPERM (preflight sandbox'ta ölçülmüyor; çözüm node --import tsx) · noRuntimeApiImport dinamik import'u görmüyor · atlanamaz dispatch-öncesi preflight hook | 66 → 113 kartı (1c) içinde | 113 ile; 64 küçük kart; 71 = 66+113 |
| 16 | 55 · 56 | İki yönlü bus-uyandırma hook'u v4 (OWNER-RULING-S152) · hook timeout'ları saniye | v4 kesilmedi | 67'den sonra |
| 16 | 15 · 16 · 18 · 23 · 31 · 32 · 33 · 35 | Devralma v3 · ruleset:drift gh→curl · actionlint · land.ts sil · CP-3 RELAYED/RECALLED · worktree/dal hijyeni (617/618/619 dalları) · workflow test lensi · REGISTER-BUG-BUCKET v58 (v56 §B uzlaştırma) | açık (CARRIED) | küçük kartlar, boş şeride |
| 17 | 22 · 53 | OPA çalışma zamanı (keşif) · dalga 3 işçi + 2 scout | 53 = bugünkü düzen | sürekli |
| 18 | 93 · 104 | Zamanlanmış workflow okuması: Nightly Compatibility SUCCESS 13:25Z @9fbb0b9b, budget-fence SUCCESS; c58438b5'te koşu yok | ölçüldü | bugün ~13:00Z sonrası c58438b5'te okunur |

## F · GATE-1 GÜNDEMİ, ESKİ KALEMLER, SAHİP KALEMLERİ
| Panel # | Reg # | Kalem | Durum | Sonraki |
|---|---|---|---|---|
| 17 | 68 | ⓶ merge-yetki istisnasının çeliği (PLATINUM-BREACH-S122-1 kayıtta durur) | ÖLÇÜLMEDİ; inişler GitHub auto-merge | scout ölçer → SUPERSEDED-BY önerisi, sen hükmedersin |
| 17 | 69 | ⓷ ADF-ARCHITECTURE-v2 inişi (H2 yönü AÇIK) | ÖLÇÜLMEDİ | sen H2'ye hükmedersin |
| 17 | 72 · 73 | ⓻ P-9 uzantı adayı · P-6 gözlem penceresi kapanış kriteri | sahip hükmü | sen hükmedersin |
| 21 | 74 | MA-RERUN koşu yarısı (dispatch + ölçüm + artefakt) | S135'ten beri açık | dal ref'inde dispatch (harcama yok), A25 sonrası |
| 21 | 75 | S140 planından kalanlar (Recall@k tabanı · araç seçimi gözlemi · kapsam kapısı) | büyük ihtimalle E1/E3'e SUPERSEDED | satır satır eşleme, sen onaylarsın |
| 21 | 76 | Eksik eski belgeler: bootstrap v140/v141/v143, S139 | açık | sen cwf_yaprak_8 kutusundan arşive aktarırsın |
| 21 | 77 | architect:open Architect tarafından okunamıyor | S138'den beri NOT-READ | köprüde node --import tsx dene; olmazsa şerit üretir |
| 21 | 79 | SOTA kabul skoru 0/16 (CARRIED; S142'de 15/16 dondurulmuş bench yüzünden bloklu) | yeniden ölçülmedi | Architect cwf-sota-definition v1_5'le skorlar (E1 sonrası); bench dondurmasını SOTA-1'e karşı sen tartarsın |
| 17 | 14 · 24 | Redis kimlik rotasyonu · fırın 7 günlük duruş tanıklığı | SAHİP | senin kararın / tanıklığın |
| 17 | 2 · 3 · 4 · 27 | Bench: A2A · RESET · BACKEND-MOUNT · persona | DONDURULMUŞ (OWNER-RULING-S143-FREEZE-BENCH-1) | — |

## G · S161 BULGULARI (kapanışta CWF-S161-FINDINGS'e girer)
F-S159-SOTA1-NOT-FIRST-CALL-1 (üçüncü tekrar; kalıcı çözüm proje talimatı v5_11 §0 — sahip düzenler) · F-S161-POOLER-LOG-BLIND-TO-CLIENT-SIDE-AUTH-FAILURE-1 (3e lensi istemci-tarafı reddi görmez) · F-S160-LANE-SANDBOX-DNS-BLOCKS-BUS-WRITE-1 dördüncü ölçüm (→113) · Architect kör noktası: F3/F6 önerisinde enum adlarını okumadan yazdı (RULING-S161-F3-F6-1'de düzeltildi).

## H · SÜREKLİ UYGULAMALAR (panel 22)
26 her doküman doküman reposunda + proje kutusunda aynı turda · 37 push sonrası tracking ref · 49 device_commit md5 · 52 köprü git kilitleri (gitw.sh) · 63 GitHub okuma gh.sh + köprüde graft · 80 kart saatleri date -u · 92 boot metni önce şerit adı, onaylı dış yazımdan önce "auto mode'dan çık" · 93 açılışta zamanlanmış workflow sonuçları · 100 yönlendirme şikâyetinde önce stage-07 izi · 101 çakışan kardeş PR taze dala · 102 iniş Vercel prod listesinden · 108 gh.sh/gitw.sh cwf-architect-ro'da · 110 tasarım belgesi bayt bayt alıntılar · 116 UI metni değişince e2e locator çite · 117 kadans, bus insert üretilir (md5+sha256) · 118 push kanıtı ls-remote 40-hex.

END · CWF-S161-OPEN-ITEMS-TABLE-v1
