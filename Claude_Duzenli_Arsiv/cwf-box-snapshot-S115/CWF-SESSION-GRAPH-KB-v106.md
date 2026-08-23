# CWF-SESSION-GRAPH-KB · v106 — S106 düğümü eklendi

<!-- CWF-SESSION-GRAPH-KB-v106 · 2026-08-18. v105'i geçersiz kılar. Grafiğin
     S105 ve öncesi düğümleri v105'teki hâliyle GEÇERLİDİR ve tekrar edilmez
     (özetin özeti yasak); bu dosya S106 düğümünü, kenarlarını, doğan yasa
     adaylarını ve Architect sicilini ekler. -->

## S106 DÜĞÜMÜ (2026-08-18 · bir gün · üç kompaksiyon)

**Tek cümlelik hüküm:** kapı **6/7**'de kaldı ama vektör zinciri baştan sona
kuruldu — **beş merge tek oturumda indi** ve oturumun en kalıcı ürünü yine bir
onarım oldu: **paralel yazarlığın altındaki mühür yarışı ölçüldü, mekanizması
adlandı, kalıcı çözümü karta yazıldı.**

### §1 · OLAY ZİNCİRİ

1. **Vektör tüketicisi canlı kanıtla kapandı.** `[Vector] queried engine=qdrant
   surfaces=1 hits=0 corpusSize=0 queueDepth=0 ms=1235` — **dürüst-boş**.
   `queueDepth=0` kuyruğun VAR ve BOŞ olduğunu söyler; yok olsaydı `none`
   yazardı. *empty ≠ zero* yasasının ekrandaki karşılığı.

2. **rule26 kronik flake'ten çıktı, sınırlandı.** AG-1 kendini **üç kez
   ölçümle düzeltti**: (a) önbellek fixi yanlıştı — cache, apt'den SONRA koşan
   indirmeyi kısa devre eder, asılmayı bırakır; (b) probe `ubuntu-latest`'ta
   apt'yi ATLAMIYOR: 9 eksik paketin **hepsi font**, sıfır kütüphane →
   `--with-deps` KALDIRILAMAZ, çünkü fontlar metin metriğini değiştirir ve klip
   iddiası tam da metin metriği ölçer; (c) pay ilan edilenden dar (2×/3×) —
   sayılar değiştirilmedi, tel kuruldu. Sınırlar dört kez ölçüldü:
   **188/194/204/217 s**, tavan 600 s.

3. **ARMES ikiz kimlik krizi.** `armes` (system_of_record, 193 yönetişim satırı)
   sunucusuz "unreachable" görünürken, kabloyu `armes-new` (unverified, 0
   yönetişim) tutuyordu → 14 araç çakışması → kullanıcıya "ARMES kullanılamıyor".
   Kök: endpoint güncellemesi **yeni backend mount'u** olarak yapılmış. Kablo
   taşındı, `armes-new` retired, up **141 araç**.

4. **Merge treni — beş iniş, seri.** `79663513`(280, indeksleyici uç noktası) →
   `e32fc83f`(281, arşiv okuma-muhafızı) → `d3248a49`(282, obs sıralama fix'i) →
   `91d8e0c0`(283, zone+entity_alias kabulü) → `8f8dd2a9`(284, cron tetiği).
   Her biri: iki ebeveyn · `--no-ff` · bayt-aynı mesaj (**ham commit nesnesine**
   karşı) · ağaç-eşitliği kanıtı · tek push · tek kanarya · dal silme.

5. **Gözlemcilik: üç organ çelişmiyordu.** Architect'in çerçevesi ÇÜRÜTÜLDÜ.
   `langfuse=in-time` forceFlush döndü mü, `delivery` yutulmuş hata düştü mü,
   host probu host cevaplıyor mu — **üç soru, üç cevap**. Kurulu kaynaktan:
   span processor `onEnd`'de `.catch` iliştirip **zaten-yakalanmış** promise'i
   forceFlush'ın beklediği kuyruğa koyar; settle varışa tanıklık edemez. Gerçek
   kusur TEK SAYIYDI: `LANGFUSE_TIMEOUT` hiç set değil → vendor 5 s fallback =
   `OTEL_FLUSH_TIMEOUT_MS` bayt-bayt aynı → iki sayaç aynı anda dolar; flush
   kazandığında ret **pencere okunduktan sonra** düşer, serverless'ta hiç.

6. **Mühür yarışı — oturumun kalıcı bulgusu.** Dört şerit seri reseal vergisi
   ödedi. AG-4 ölçtü: *iki şerit aynı skaleri tuttu ve hiçbir kapı kızarmadı.*
   AG-1 keskinleştirdi: manifest çakışması YALNIZ hash'ler de oynadığı için
   yakalandı — **skaler tek başına sessizce merge olurdu**. Sahip patladı
   (*"beni maymun ettin"*) ve kalıcı çözüm emri verdi. Hüküm:
   **skaler ölür, kimlik inişte git'ten türetilir.**

7. **Tetik PLATINUM yolundan çözüldü.** Architect indeksleyici tetiğini sahibe
   `curl` yazdırarak çözmeyi REDDETTİ. AG-3 zemini okudu ve Vercel Cron'u seçti
   — Vercel kimlik bilgisini kendisi enjekte eder, insan tuşa basmaz, şerit sır
   taşımaz. **Sırrın varlığı, sırrı tutmadan kanıtlandı:** uç noktanın kendi
   zarif-kapanma şekli okundu — **401 = env set, 503 = değil**.

8. **Zone kabulü — yanlış çerçevenin düzeltilmesi.** Canlı turda `sırlama 3-4-5`
   çözülemedi; **aynı turda** `getFactoryLines` cevabı ARMES'ten getirdi. Sistem
   çözümü elinde tutup kullanamadı. Engel: kapalı kabul listesi. Architect bunu
   *tenant-zero kararı* diye çerçevelemişti — YANLIŞ: tenant-zero **repoyu**
   korur, Qdrant repo değil, korpus zaten `glossary_term` (tenant verisi) kabul
   ediyor. Sahip hükmü: *"zone kabul edilsin"*.

### §2 · KENARLAR (bu düğümün öncekilere bağlandığı yerler)

- **S105 → S106:** `F-S105-ARCHITECT-INGEST-CHANNEL-FAULT` kapandı — ve **aynı
  kanal sınıfı Architect'i bu oturumda tekrar ısırdı** (`TRANSPORT-DRIFT`).
  Zehirli satırın dersi soyut değildi.
- **S103 → S106:** AUDIT-OR-ALARM'ın **üçüncü ve dördüncü** canlı örneği
  (docVersion benzersizlik kapısı yok · pipe'lı çıkış kodu).
- **S102 → S106:** `S102-YASA-1` (sahip-eli) tetik kartını şekillendirdi;
  `S102-YASA-2` (yarışsız teslim) AG-1'in bekleme sözleşmesine dönüştü.
- **S101 → S106:** `S101-L2` (provisional docVersion kardeş merge'de bayatlar)
  bu oturumda **dört kez** gerçekleşti — uyarı, kanıta dönüştü.

### §3 · DOĞAN YASA ADAYLARI (→ LAW-LEDGER-4)

1. **"Yetki bir kotadır, tetikleyici değil"** (AG-2). Aynı onayın ikinci kez
   anılması ikinci icra hakkı doğurmaz; idempotans ÖLÇÜLÜR, hatırlanmaz
   (`merge-base --is-ancestor`). *İki şeritte kendiliğinden uygulandı.*
2. **"Bir kapının verdikti boru hattının sonundan okunamaz"** — dört canlı
   gözlem. `$?` borusuz okunur.
3. **"Saf test kablolama kusurunu koruyamaz"** (AG-4 R6): teli silmek yalnız
   kompozisyon testini kızartır, 14 saf iddia yeşil kalır.
4. **`--format=%B` ≠ saklanan mesaj** — sona newline ekler, sahte uyuşmazlık
   verir. Ham commit nesnesi okunur. *Araç gösterimi ≠ artefakt.*
5. **"Manifest yalnız içerik-türevi değer taşır; kimlik inişte türetilir"** —
   SEAL-DERIVE'ın yasası. Ardıl kuralı **iniş-anı** kuralıdır, yazım-anı değil.
6. **"Yeşil suite doğruluk değil, sorgulanmamışlık kanıtıdır"** (AG-3).
7. **"İki kanıt seviyesi birbirine sayılmaz"** — config seviyesi ≠ platform
   seviyesi (AG-3, cron).
8. **"Mocked-contract sahte-yeşili"** — fixture, handler'ın okuduğu var olmayan
   alanı uydurursa mock ile kod birbiriyle anlaşır, gerçekle anlaşmaz; 12 geçen
   testin göremediğini typecheck yakaladı.

### §4 · ARCHITECT SİCİLİ (S106)

| Kayıt | Ne oldu | Kim düzeltti |
|---|---|---|
| **A-REC-S106-1** | Kuyruk boşaldığında kapanışı önermek yerine yeni paket başlatmaya yöneldi | **Sahip** |
| **A-REC-S106-2** | Kart *"reseal revizyonu hesaplar"* dedi; reseal skaleri ARTIRMIYOR | **AG-2** |
| **A-REC-S106-3** | *"Üç organ çelişiyor"* çerçevesi yanlıştı | **AG-4** |
| **A-REC-S106-4** | Zone kabulünü tenant-zero kararı diye çerçeveledi | **Sahip hükmü** |
| **F-S106-TRANSPORT-DRIFT** | Kart aktarımında paragraf kaydı; **md5 kapısı reddetti** | **Kendi kapısı** |
| **F-S106-OWNER-STEP-WITHOUT-SURFACE** | Sahibe olmayan düğme tarif etti | Architect (kendi) |

**Düğümün dersi:** hakem hakemlenebilir olmalı. Bu oturumda Architect dört kez
düzeltildi; üçü şeritlerden, biri sahipten geldi ve bir tanesini kendi kurduğu
kapı yakaladı. Sistemin sağlığı, kusurun yokluğunda değil, **kusurun her
seferinde adıyla yüzeye çıkmasında**.

<!-- END · CWF-SESSION-GRAPH-KB-v106 -->
