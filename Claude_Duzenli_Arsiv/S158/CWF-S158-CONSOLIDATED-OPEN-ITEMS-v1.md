# CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1 — sahibin S155 listesi × register v144/v147/v148 × S158 canlı ölçüm

Kesildi: S158, 2026-09-23 08:45 TSİ. Sahibin isteğiyle ("aksiyon listesini detaylıca oku, cross check et, to-do listende eksik olmadığından emin ol").
KAYNAKLAR (tam okundu): sahibin yapıştırdığı liste (S155 dönemi, v144 gövdesi dahil) · register v147 (tam) · register v148 (tam) · bootstrap v159 · S158 bus (04:15Z sonrası tüm satırlar) · GitHub API 05:28Z–05:41Z.
ÇAPA: master `2d7087bff1eda24b6224c2fbd9a9d987061dec7d` (PR 610 merge, GitHub API 05:41Z). Doküman reposu GitHub main `04f47cd`; sonraki 24 commit YEREL (push yok).
KURAL: satır metni için EN TAM TANIKLI sürüm alındı (v147 > v148 olan yerlerde v147 detayı geri kondu; aşağıda "GERİ KONDU" işaretli).

## 0 · ÇAPRAZ KONTROL SONUCU

| Kontrol | Sonuç |
|---|---|
| Senin listendeki her kalem v148'de var mı? | EVET, 2 istisna dışında: **30** ve **46** v148 satırlarında yok. Kayıp DEĞİL: ikisi de S155'te kanıtla kapandı (v147 §1: 30 = PR 594 `b559019c`; 46 = SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3). v148 §1 bunları yalnız "v147'deki gibi" diye anıyor. |
| v148 satır detay düşürmüş mü? | **EVET — bulgu F-S158-REGISTER-V148-COMPRESSED-ROWS-1.** Düşen detaylar: 58-G4 "public/ dahil, büyük/küçük harfe duyarlı" · 40c altın vaka · 40d P3 içeriği (DAG, K9/K25, K28 A3 şablonu, kapsam cümlesi, K30 web) · 21'in iki hata adı · 35 "v56 §B uzlaştırma" · 66 ve 67'nin çözüm yolu · 45'in hüküm adı · 79'un bench notu · 68 PLATINUM-BREACH notu. Hepsi aşağıda GERİ KONDU. Çözüm: register v149 bu tablonun tam metnini taşır · bugün kapanışta. |
| Senin listende olmayan ama açık kalemler | 68–79 (GATE-1 gündemi + arşivden eski kalemler, S156'da numaralandı) · 81–86 (S156) · 87–93 (S157). Aşağıda hepsi var. |
| Yan panel listesi eksik mi? | EVET, gruplanmıştı; tek tek numara görünmüyordu. Panel bu tabloya göre yeniden kuruldu (her açık numara bir panel satırında adıyla). |

## A · ŞU AN YÜRÜYEN

| # | İş | Durum (08:45 TSİ) | Sonraki · ne zaman · kim |
|---|---|---|---|
| 90 | PR 610 bütçe kaydı (stop 200 / uyarı 180) master'a | **KAPANDI S158** @ merge `2d7087bff1eda24b6224c2fbd9a9d987061dec7d` | scout statüsü bus'ta okunacak; bugün 15:32 TSİ zamanlanmış bütçe koşusu yeşil mi, okunacak |
| 58 | ARMES HARDCODE YOK (en önemli kural). G0, G1a-1 (PR 593), G1a-2 (PR 595), G1b (PR 596) KAPALI. **G2** bilgi→veri: v3 scout-1 incelemesinde (emir 07:17, cevapsız kalmıştı; 08:4x yeniden başlatıldı). **G2c** kategori tabanı→veri (83). **G3** testler/fixture/yorum/diyagram. **G4** CI grep kapısı — `public/` DAHİL, büyük/küçük harfe DUYARLI (GERİ KONDU: F-S154-CASE-INSENSITIVE-ARMES-GREP-HITS-CLEARMESSAGES-1, F-S154-G4-SCOPE-MISSES-PUBLIC-1). 62 bunun içinde. | G2 v3 incelemede | G2 hüküm → AG-1 · öğlen; G2c, G3, G4 · bu akşam |
| 91 | cwf_lane şifre rotasyonu (S157 sızıntısı) | Kart v2 AG-4'te (bus 07:28); PR 610 indi → önü açık | AG-4 ORDERS 0-2 → Gemini ALTER → ORDER 3 · bugün öğlene kadar |
| 89 | Paylaşılan klon muhafızı | v1 scout RED (D1-D8) | v2 = D1-D8 aynen, EXEMPT → AG-2 · bu sabah |
| 26/86 | Her doküman doküman reposunda; köprüden push yok | GitHub main `04f47cd`; 24 commit yerel | S157 kapanış seti S157/ klasörüne + push notu ilk AG-4 penceresine · bu sabah |

## B · A24 PROGRAMI (ürün) — son tarih bu akşam TSİ

| # | İş | Durum | Sonraki · ne zaman |
|---|---|---|---|
| 39 | A24 P0 ölçümleri: M-a held-out sayıları · M-b item-5 analizörü · M-c RBAC kapsam süzgeci ikinci lens · M-d üretim günü tanımı (F-S149-TODAY-IS-CALENDAR-DAY-1) · resultStore handle eşiği (39 KB) · stage-12 hüküm metni · M2 MKB korpusu · M3′ replay | M-e bitti (S150); geri kalanı açık | Architect bugün; M2/M3′ şerit, 28 ile |
| 40b | P1-B satır içi toplamlar, yürütücünün deterministik yarısı (+F-S153-TOOL-FANOUT-34-CALLS-1) | kart v2 eski master'a göre kesilmiş | öncülü yeniden ölç → AG-4, rotasyondan sonra · bugün |
| 40c | P1-C: C1 KAPALI; C2 K24 iz alanları → C3 yönlendirme sınavı (altın vaka F-S149-SCRAP-TOOL-NOT-OFFERED-Q3-1, GERİ KONDU) → C4 held-out okuyucu → C5 K17 giriş aracı → erişim kanaryası | C2 kesilmedi | C2 → scout → AG-1, G2'den sonra · bugün |
| 40d | P2-0…P2-6 (kanal-2 BM25+RRF, TR analizör K15 = 5, 36, 51) · P3 (JSON DAG planlayıcı, conformal K9/K25 = 6, K28 A3 çıktı şablonu F-S149-A3-TEMPLATE-ABSENT-1, K29 takvim = 10, kapsam cümlesi F-S149-SCOPE-REFUSES-IN-DOMAIN-SYNTHESIS-1, K30 web) · P4 · P5 (GERİ KONDU) | kesilmedi | P2-0/P2-1 → scout-2 → AG-2 · bugün |
| 40e | PARAMS kartı (dalganın ihtiyaç duyduğu her yönetişimli parametre, güvenli tabanda) | kesilmedi | 40b'den sonra · bugün |
| 45 | Tüm parametreler env dosyasıyla yapılandır/yedekle/geri yükle (OWNER-RULING-S150-PARAMS-UI-ONLY-TODAY-1 ikinci yarı, GERİ KONDU) | tasarım başlamadı | P1'den sonra |
| 7 | Çözülmüş ebeveyn → çocuk katman (K31) | S147'de üç onarım master'da; determinizm ÖLÇÜLMEDİ | A24 P1 içinde · bugün |
| 8 | Typer | YOK | 13'ten sonra kart · bugün |
| 9 | L5 kaçırma defterleri | YOK | 13'ten sonra kart · bugün |
| 10 | LLM öncesi zaman dilimi + K29 takvim | açık | 40d P3 |
| 50 | Gruplu payload: recordCount tek grubu sayıyor, saklanan handle yalnız ilk grubu tutuyor | açık | AG-4 kartı, 40b'den sonra · bugün |
| 51 | Tokenizer: fold sonrası camelCase | açık | P2-0 |
| 36 | Vektör eşleşmesi 3/15 | P2'ye girdi | 40d ile |

## C · ÜRÜN HATALARI

| # | İş | Durum | Sonraki · ne zaman |
|---|---|---|---|
| 28 | Doküman/şirket soruları ARMES'e gidiyor (F-S153-DOC-QUESTION-MODEL-CHOSE-ARMES-1) | G1a-1, G1a-2, G1b indi | replay + M2 · bugün |
| 21 | S141'in iki ürün hatası: CHOSEN-OPTION-DOES-NOT-NARROW-ITS-SIBLING-REF · PREFIX-TIER-MATCHES-WRONG-FACTORY-LINE-AND-FACTORY-ID (GERİ KONDU) | ölçülmedi | P1'den sonra scout ölçer · bugün |
| 59 | Sayı damgası yöntem adındaki rakamda yanlış alarm ("5 Neden Analizi") | açık | küçük kart · bugün |
| 60 | Hatırlanan iddia ölçülmüş gibi yazılıyor | açık | 59 ile |
| 61 | Çağrılar düştüğü halde metin "hepsi" diyor | açık | küçük kart · bugün |
| 62 | Sabit bölme tavsiyesi metni | 58 içinde | 58 ile |
| 13 | Converge ilişkilendirmesi 11 Eylül'den beri çöküyor | bir okuma uzakta | Architect okur · S158 |
| 41 | Web valfi üretimde açık; Q4 yeniden sorulmadı (M-f) | canlı | SEN Q4'ü yeniden sorarsın |
| 82 | Superset elle yazılmış paket ayrıcalığı (F-S156-SUPERSET-HAND-PACK-PRIVILEGE-1) | açık | G2'den sonra kendi kartı · 24 Eyl |
| 83 | G2c kategori tabanı → veri (toolCategories.ts anahtarı + G1b scout'un listelediği her tüketici + makine bilgi tabanı anahtarı + CANONICAL_METRIC_TOOLS) | kesilmedi | G2 inince · bugün |
| 84 | Backend çökünce CWF cevap uyduruyor mu — canlı test | ÖLÇÜLMEDİ | G2'den sonra scout canlı okur · bugün |
| 85 | Graf KB yayınlanmış tool_graph_node satırlarını okusun (kod grafında dört, DB'de beş) | G2 ORDER 9'un devamı | G2'den sonra |

## D · FABRİKA (şeritler, kapılar, bus)

| # | İş | Durum | Sonraki · ne zaman |
|---|---|---|---|
| 17 | Scout'un bus'a statü yazma yolu (+S155 kök neden: auto-mode sınıflandırıcısı POST'u reddetti, F-S155-SCOUT-STATUS-POST-CLASSIFIER-DENIED-1) | S157'de scout'lar her statüyü yazdı; PR 596/597/610'da POST çalıştı | yeniden ölç; S158'de KAPANABİLİR |
| 55 | İki yönlü bus uyandırma hook'u (OWNER-RULING-S152-BUS-WAKE-HOOK-1) | v4 kesilmedi | 17'den sonra · bugün öğleden sonra |
| 56 | Hook timeout'ları saniye cinsinden | açık | 55'ten sonra |
| 66 | tsx IPC EPERM: sandbox pencerelerinde kart ön-kontrolü ölçülmüyor, kartlar KONTROLSÜZ teslim ediliyor (19'u içerir). Çözüm: her tsx girişi `node --import tsx` ile (GERİ KONDU) | açık | küçük kart · bugün |
| 67 | consumed_at: başlamamış ve çalışan şerit bus'ta aynı görünüyor (70+ satır damgasız). Çözüm: şerit açılışı okurken damgalar (GERİ KONDU) | açık | kart S158, 55 ile |
| 64 | noRuntimeApiImport dinamik import'u görmüyor | açık | küçük kart · bugün |
| 15 | Devralma sırası + self-takeover + kendi worktree (+F-S146-SHARED-CLONE-RACE-1) | v2 RED; v3 kesilmedi | v3 → scout · bugün |
| 16 | ruleset:drift gh → curl | açık | küçük kart |
| 18 | Workflow'lara actionlint | açık | küçük kart |
| 19 | tsx/esbuild | 66'ya BİRLEŞTİRİLDİ | — |
| 23 | scripts/land.ts sil (merge guard provamodülünü paylaşıyor) | açık | küçük kart |
| 31 | CP-3 RELAYED/RECALLED kabul etsin | açık | küçük kart |
| 32 | Worktree/dal hijyeni | açık | kendi kartı |
| 33 | Workflow testleri için çalıştıran lens | açık | küçük kart |
| 35 | REGISTER-BUG-BUCKET v58 (v57 S141'den beri bayat; v58, v56 §B'yi uzlaştırır — GERİ KONDU) | açık | küçük kart |
| 22 | OPA çalışma zamanı | yalnız keşif | açık |
| 53 | Dalga: 3 işçi + 2 scout | S157'de AG-2, AG-4 + 2 scout; AG-1 G2 bekliyor | G2 yeşil ile |
| 87 | Şerit DB şifresi her pencerenin ortamında (~/.zshenv), her scout basabilir (scout X1) | açık | rotasyondan sonra kart · S158 |

## E · GATE-1 GÜNDEMİ (proje talimatları §9)

| # | İş | Durum | Sonraki |
|---|---|---|---|
| 68 | ⓶ merge-yetki istisnasının çeliği (PLATINUM-BREACH-S122-1 kayıtta durur — GERİ KONDU) | ÖLÇÜLMEDİ; inişler artık ruleset'teki GitHub auto-merge ile | scout ölçer; kanıtla SUPERSEDED-BY önerilir |
| 69 | ⓷ ADF-ARCHITECTURE-v2 inişi (H2 yönü AÇIK) | ÖLÇÜLMEDİ | artefaktı bul; SEN H2'ye hükmedersin |
| 70 | foreman gözlem yolu | 81 ile KAPANDI (S157) | — |
| 71 | ⓺ atlanamaz dispatch-öncesi preflight hook | kısmi: DB kapısı zorluyor; mail-wait REPORT modunda, sandbox'ta ölçülmüyor | 66 ile |
| 72 | ⓻ P-9 uzantı adayı | ÖLÇÜLMEDİ | metni S133 arşivinden oku; SEN hükmedersin |
| 73 | P-6 gözlem penceresi (OWNER-RULING-S133-P6-SCOPE-AND-LOOP-1) | hükümle AÇIK, kapanış kriteri yok | SEN kapanış kriterine hükmedersin |

## F · ARŞİVDEN ESKİ KALEMLER

| # | İş | Durum | Sonraki |
|---|---|---|---|
| 74 | MA-RERUN koşu yarısı (dispatch + ölçüm + artefakt; harden PR 519 ile indi) | S135'ten beri açık | dal ref'inde dispatch (harcama yok) · A24'ten sonra |
| 75 | S140 planından kalanlar (iki ağaçta Recall@k tabanı · araç seçimi gözlemi · kapsam kapısı) | büyük ihtimalle A24 40c C3/C4 + 40d'ye SUPERSEDED | satır satır eşle; SEN onaylarsın |
| 76 | Eksik eski belgeler: bootstrap v140, v141, v143 ve S139 (S155'te 134 dosya aktarıldı) | açık | SEN cwf_yaprak_8 kutusundan arşive aktarırsın |
| 77 | architect:open Architect tarafından okunamıyor | S138'den beri OKUNMADI; köprüde `node --import tsx` yolu deneyebilir | dene; olmazsa şerit üretir |
| 78 | Mac'teki paylaşılan klon eski | KAPANDI S157 (SLIP-SHARED-CLONE-SYNC-S157-1); önleme = 89 | — |
| 79 | SOTA kabul skoru 0/16 (DOĞRULANMAMIŞ taşındı); S142'de 16'nın 15'i dondurulmuş bench kalemleri yüzünden bloklu ölçülmüştü (GERİ KONDU) | yeniden ölçülmedi | Architect cwf-sota-definition v1_5'le skorlar; SEN bench dondurmasını SOTA-1'e karşı tartarsın |

## G · SAHİP KALEMLERİ VE DONDURULMUŞLAR

| # | İş | Durum |
|---|---|---|
| 14 | Redis kimlik rotasyonu | senin kararın |
| 24 | Fırın 7 günlük duruş tanıklığı | sende |
| 41 | Q4'ü web valfi açıkken yeniden sor (M-f) | sende |
| 2 · 3 · 4 · 27 | Bench: A2A · RESET · BACKEND-MOUNT · persona | DONDURULMUŞ (OWNER-RULING-S143-FREEZE-BENCH-1) |

## H · SÜREKLİ UYGULAMALAR

26 her doküman doküman reposunda · 37 her push'tan sonra tracking ref · 49 device_commit md5 · 52 köprü git kilitleri (S158'de de görüldü, temizlendi) · 63 Architect GitHub okuma + köprüde graft · 80 kart saatleri `date -u`'dan · 92 boot metni önce şerit adını söyler, onaylı dış yazımdan önce "auto mode'dan çık" der · 93 açılışta master'daki her zamanlanmış workflow'un son sonucu okunur (S158: budget-fence 22 Eyl koşusu KIRMIZI → 90 ile çözüldü; Nightly Compatibility yeşil).

## §1 · KAPALI (referans, kanıtıyla)

S158: 90 @ PR 610 merge `2d7087bff1eda24b6224c2fbd9a9d987061dec7d`.
S157: 58-G1b @ PR 596 `3c930797…` · 81 @ PR 597 `edc7e880…` · 70 (81 ile) · 78 · 88.
S155: 30 @ PR 594 `b559019c…` · 58-G1a-2 @ PR 595 `1ca28ede…` · 46 @ SLIP-LANE-PASSWORD-ROTATION-S155-1-ORDER3 · 65 @ OPERATOR-RESULT-S155-ITEM65-1.
S154: 58-G1a-1 @ PR 593 `fdb0df24…`.
Daha önce: 1 · 5 (→40d) · 6 (→K9/K25) · 11 · 12 · 19 (→66) · 20 · 25 · 29 · 34 · 38 · 40 · 40c-C1 · 42 · 43 · 44 · 47 · 48 · 54 · 57 · 58-G0.

END · CWF-S158-CONSOLIDATED-OPEN-ITEMS-v1
