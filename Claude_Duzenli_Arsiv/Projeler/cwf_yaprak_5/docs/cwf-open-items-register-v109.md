# CWF — AÇIK KALEMLER REGISTER · v109 (S106 kapanışı)

<!-- cwf-open-items-register-v109 · 2026-08-18. v108'i GEÇERSİZ KILAR.
     Türetildiği taban: v108 (S105 kapanışı) + S106 canlı ölçümleri.
     L-ADAY-2: bu register PAYDA + PARK + NÖBET taşır; biri eksikse mint
     edilemez. Kalem yalnız CLOSED@evidence / SUPERSEDED-BY / MERGED-INTO ile
     çıkar; her kapanış kanıt satırını yapıştırır. NUMARA YENİDEN KULLANILMAZ
     (L-ADAY-1). BÜTÜN yazıldı — yönetişim artefaktı yamayla üretilmez
     (A-REC-S101-7). -->

## §0 · ZEMİN (S106 kapanışında ÖLÇÜLDÜ, türetilmedi)
`origin/master` **`8f8dd2a9345f6a61c3ac9b9dba41c62543cf99f1`** · docVersion
**rev 284** · **659** vitest test dosyası (koşan süit **9346** test) ·
`phase/*` = **0 ref** (origin master-only) · açık PR **0** ·
`vercel.json` cron **9 girdi**, sonuncusu `/api/admin/vector-index` `50 3 * * *` ·
`ALLOWED_KIND_SUFFIXES` = `['glossary_term','tool_doc','zone','entity_alias']` ·
`ALLOWED_CORPORA` = `['backend_tools.description','governed.knowledge']` ·
`armes` yönetilen satırlar (published): glossary_term **10** · tool_doc **1** ·
zone **4** · entity_alias **5** · ARMES canlı **141 araç** ·
üretim `[Vector]` son okuma: `hits=0 corpusSize=0 queueDepth=0`.

## §1 · SOTA KAPISI — **6/7**
Dönen: #2 (S93) · #10 (S96) · #16 (S98) · #18 (S99) · #23 (S100) · #25 (S103).
**Kalan: #29 🔑 A23 ANLAMA KATMANI** — W1 kilidi S106'da düştü, kart KESİLEBİLİR.
`yaprak_gate` = 7/7 (mimari tamam, ölçüm yok) · `cinekop_gate` = liste sıfır +
ölçüm turu.

## §2 · S106'DA KAPANANLAR

| Kalem | Kapanış kanıtı |
|---|---|
| **#75 VECTOR-CONSUMER-1** | **CLOSED@evidence.** Üretim satırı okundu: `[Vector] queried engine=qdrant surfaces=1 hits=0 corpusSize=0 droppedLong=0 queueDepth=0 ms=1235` — dürüst-boş. `queueDepth=0` kuyruğun VAR ve BOŞ olduğunu söyler (yok olsaydı `none`). ObsHostHealth: vector-index/encoder reachable. Merge `974e24a5` (rev 278) |
| **F-S106-VECTOR-OUTCOME-SILENT** | **CLOSED@evidence.** PR #285 / `b3c9f3b8` (rev 279), consent `ONAY-VECTOR-CONSUMER-FIX-1-MERGE` |
| **F-BW01 · rule26** | **CLOSED@evidence.** Merge `3f2173cb`, consent `ONAY-RULE26-BOUNDED-MERGE`. Üç işe timeout: rule26 10 dk · build 20 dk · eval-canary 25 dk (kendi 900 s poll bütçesinden türetildi, örneklemden değil). Playwright kurulumu ikiye bölündü (probe/apt 5 dk + browser-download 5 dk). **Dört ölçüm:** 188/194/204/217 s, hepsi 600 s altında; apt 14–19 s. `--with-deps` KALDIRILAMAZ (9 eksik paketin HEPSİ font, sıfır kütüphane; fontlar metin metriğini değiştirir, klip iddiası metin metriği ölçer) |
| **PHASE-VECTOR-INDEX-1** (uç nokta) | **CLOSED@evidence.** Merge `79663513` (rev 280), PR #287 |
| **PHASE-ARCHIVE-READGUARD-1** | **CLOSED@evidence.** Merge `e32fc83f` (rev 281), PR #288, consent `ONAY-ARCHIVE-READGUARD-MERGE`. `archiveIntegrity.ts` master'da; üç adlı sonuç (yok / bulundu / md5 uyuşmazlığı) |
| **F-S105-ARCHITECT-INGEST-CHANNEL-FAULT** | **CLOSED@evidence** — zehirli satır KALIR (append-only; silme/güncelleme imkânsız, tetikler koşulsuz), okuyucular BAĞIŞIK. Sayım: sıfır üretim okuyucusu (`verifyGrants.ts` bir yazma-probu, içerik okumaz) |
| **F-S106-OBS-DELIVERY-SILENT-LOSS** | **CLOSED@evidence.** Merge `d3248a49` (rev 282), PR #289, consent `ONAY-OBS-DELIVERY-MERGE`. Kök: `LANGFUSE_TIMEOUT` hiç set değil → vendor 5 s fallback = `OTEL_FLUSH_TIMEOUT_MS` (config.ts:46) bayt-bayt aynı → iki sayaç aynı anda dolar; flush kazanınca ret pencere-sonrası düşer, serverless'ta hiç. Fix SINIRI değil SIRAYI düzeltir |
| **PHASE-CORPUS-ADMIT-ZONE-1** | **CLOSED@evidence.** Merge `91d8e0c0` (rev 283), PR #290, consent `ONAY-CORPUS-ADMIT-ZONE-MERGE`, sahip hükmü verbatim: *"zone kabul edilsin"*. Liste KAPALI kaldı; gerekçe `corpora.ts` içinde yorum olarak yaşıyor |
| **PHASE-VECTOR-INDEX-RUN-1** (tetik) | **CLOSED@evidence** (merge yarısı). Merge `8f8dd2a9` (rev 284), PR #291, consent `ONAY-VECTOR-INDEX-RUN-MERGE`. Cron `50 3 * * *` dağıtılmış yapılandırmada. **R3/R4 AÇIK** — §3'e taşındı |
| **ARMES ikiz kimlik krizi** | **CLOSED@evidence.** Kablo `armes`'e (system_of_record, 193 yayınlı yönetişim satırı) taşındı; `armes-new` (unverified, 0 yönetişim) retired. 14 araç çakışması bitti; up **141 araç 1268 ms** |

## §3 · AÇIK KALEMLER (PAYDA)

| # | Kalem | Durum / kapanış kapısı |
|---|---|---|
| **#81** | **Vektör korpusu dolumu** | ⏰ **Cron ilk atış 03:50 UTC (19 Ağu).** Kapanış: üretimdeki `[Vector]` satırında `corpusSize > 0` — **Architect okur**, şerit iddia edemez (S63-1). R3 (canlı koşu sayıları) + R4 (idempotans, iki koşu iki satır) burada kapanır |
| **#29** | **🔑 A23 ANLAMA KATMANI** | Son SOTA anahtarı. W1 kilidi düştü (`A23_cwf-understanding-layer-architecture-v1_4`, md5 `3a2eb694`, 51390 bayt). Kart kesilebilir; adım-1 taban ölçümü giriş kapısı. Obs onarımı indi → taban SIZINTISIZ alınabilir |
| **#76** | **PHASE-SEAL-DERIVE-1** | Kart AG-2 kutusunda **DAMGASIZ**, id `2581cd7b-b176-42fb-aa1e-939da86029f9`, md5 `2c6b6265656f1dd1b3e290d6e72c385b`, 3858 char. Bekleme sözleşmesi (STEP 0) **KARŞILANDI** (iki dal silindi). **Gelecek oturumun İLK işi.** DO NOT MERGE — adlı onay gerekecek |
| **#77** | **VECTOR-ONBOARD-DRIP-1** | Sahip hükmü, verbatim: *"vector lane needs VECTOR-QOS — queries always outrank indexing, plus traffic throttling for onboarding/indexing load — as its own separate phase, mandatory before the engine switch."* AYRI FAZ, zorunlu |
| **#78** | **Parite TEKRARLI ölçümü** | Parite bir DAĞILIMDIR: 26.7 / 20.0 / 26.7 aynı build. Tek ölçüm geçersiz. Protokol yazılacak |
| **#79** | **Düz-metin sır onarımı + rotasyon** | `mcp_secrets` değerleri DÜZ (ragbackend token, superset JWT görüldü); global mcp satırı args'ında `ak_eDq8…`; eski kişisel satırlarda Bearer token'lar; panel inline-secret rozeti `machine-knowledge-base`'i görüyor **`armes`'i GÖRMÜYOR** (uyarı kapısı boşluğu). **Rotasyon sahibin gerçek-dünya adımı — adıyla istenecek** |
| **#80** | **Obs R2 borcu** | Langfuse kabul/gönderilen oranı. Host erişimi şeritte yok; host erişimli taraftan ölçülecek |
| **#68** | **Qdrant sahip-yüzü** | Sahibin tarayıcıdan Qdrant görebilmesi. Tercih: ham maruziyet değil, projenin kendi admin panelinde okunur yüzey. **TETİKLİ** — sahip çağırınca |
| **#82a** | **DESIGN-HOME-1** | `docs/design/` repo evi, 12 tasarım HTML'i, bayt-kimliği md5-pinli. Sahip 8/8 belgeyi tutuyor, md5=INDEX pini teyitli |
| **#63b** | **LAW-LEDGER-4** | S106'nın yedi yasa adayı külliyata yazılacak (→ §5) |

## §4 · PARK

| Kalem | Sahip hükmü |
|---|---|
| **#82b · Design-RAG** | *"şimdilik park et ama **ASLA UNUTMA**"* — Qdrant üzerinden tasarım korpusu RAG'i. Tetik: sahip çağrısı ∨ A23-sonrası envanter konuşması. **ASLA DÜŞÜRÜLMEZ** |
| **SEED-PROBATION** | Ad rezerve (S94); tanım gövde §6. Tetik: Graph-KB'nin nakledilebilir beyni kalınlaştırması ∨ kurulum #2 sinyali |

## §5 · NÖBET (dış bekleme / zamanlı)

| Nöbet | Vade / karşı taraf |
|---|---|
| ⏰ **Cron ilk atış** | **03:50 UTC, 19 Ağustos** — sonrasında `[VectorIndex]` satırı okunur |
| ⏰ **Langfuse bütçe çiti** | **~20 Ağustos** |
| **ARDIC ×2** | `F-S106-ARMES-NO-REVERSE-SHIFT-QUERY` (hat+vardiya→personel ters yönü YOK) · `F-S106-SHIFT-VOCAB-GAP` (enum `SHIFT_24_08/08_16/16_24` vs saha "4-12 vardiyası"). Hülya'ya İLETİLDİ |
| **Vercel cron platform seviyesi** | AG-3 dürüst sınırı: cron girdisi *dağıtılmış yapılandırmada* doğrulandı, Vercel'in *kayıtlı cron listesi* okunamadı. **İki seviye birbirine sayılmaz** |
| **AG-2 relay damga borcu** | RO rol damgalayamaz (S99-2); makbuz master'ın kendisinde. Operatör temizliği |

## §6 · SOTA-1 ÜÇLÜSÜ (nakil kanıtının ikinci yarısı — v98'den taşınır)
(a) seed-foreign kanıtsız · (b) kurulum #2 · (c) hedef loglarında taşınan
öğrenmenin canlı kullanımı.

<!-- END · cwf-open-items-register-v109 -->
