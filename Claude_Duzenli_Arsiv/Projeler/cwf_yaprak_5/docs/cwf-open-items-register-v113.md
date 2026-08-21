# CWF — AÇIK KALEMLER REGISTER · v113 (S110 kapanışı)
<!-- 2026-08-20. v112'yi GEÇERSİZ KILAR ve ONARIR.
     v113 BÜTÜN olarak, v108 (S105, 17.249 bayt — EN TAM TANIKLI nüsha) TABANINDAN yeniden kuruldu.
     GEREKÇE: defter iki mint'te 17.249 → 8.244 → 4.923 bayta indi ve ~18 kalem
     `CLOSED@evidence` / `SUPERSEDED-BY` / `MERGED-INTO` kaydı OLMADAN düştü.
     Bu bir ALTIN DEFTER ihlali ve "EN TAM TANIKLI İFADE KAZANIR" ihlalidir; sessiz
     sıkıştırma bir DEFEKTTİR, güncelleme değildir. Kayıp, S110'da Architect'e ÜÇ KEZ
     yanlış hüküm verdirdi (A-REC-S110-1, -7 ve "backend discovery yok" iddiası).
     Her geri getirilen kalem, S110'da REPO/DB'den ÖLÇÜLEREK doğrulanmış durumuyla girer. -->

## §0 · ÇAPA (S110 kapanışında taze klondan ÖLÇÜLDÜ)

| Ölçüm | Değer |
|---|---|
| `git rev-parse origin/master` | `ae85c3b4a9437c056ccb03a820c8cb28f958bb7b` |
| Kalan uzak ref | **YALNIZ `master`** — sıfır faz dalı, sıfır claim ref'i |
| Açık PR | 0 |
| Yasa evi | `docs/laws/` bundle · **54 kural + 15 anayasa** |
| `index.md` / `log.md` / `README.md` md5 | `8c0f8f7c` / `50eb337a` / `8bc7bfcb` (oturum boyunca değişmedi) |
| Son kural | **RULE-53** |
| `vector_index_digest` | **342/342** satır — korpus TAM |
| vector-index cron | `*/30 * * * *` — kararlı durumda ~7.6s, %0.4 doluluk |

⚠ Bu tablo bir İDDİADIR (TOTAL-45). S111 açılışında taze klonda doğrulanmadan öncül yapılmaz.

---

## §1 · S110'DA KAPANANLAR (carry-diff ile)

| Kalem | Kapanış kanıtı |
|---|---|
| **#75 VECTOR-CONSUMER-1** | ZATEN S106'da kapanmıştı (`974e24a5`). v112 onu yanlışlıkla yeniden açtı. **CLOSED@evidence** — canlı üretim logu 2026-08-20T04:29Z: `[Vector] queried engine=qdrant hits=5`. Bkz. A-REC-S110-1. |
| **#70 ARTIFACT-NAME-OBSERVATION-1** | **KAPANMADI — DÜZELTİLDİ.** İnşa edilmiş ve çalışıyor: `gateway_artifact_observations`, 47 satır, `observed_via=list_datasets`, 2026-08-18. Architect "hiç inşa edilmedi" demişti; tek negatif grep'ti (A-REC-S110-7). §2'de KISITLI KAPSAMLA açık kalıyor. |
| **F-S110-DIGEST-PGRST-404** | CLOSED@evidence — Operator `NOTIFY pgrst, 'reload schema'`; `edge_logs` 05:45:31Z GET → **200** (sabah altı kez 404'tü). |
| **F-S110-ABSENT-CLASSIFIER-MISSES-PGRST205** | CLOSED — `unexposed` üçüncü durumu, PR #310 (`b33ac46d`), dört mutant öldürüldü. |
| **F-S110-DRIP-ON-FALSE-GREEN** | CLOSED — `storeStatus` başlangıcı `idle`; canlıda görüldü: `backend=system items=0 drip=idle`. |
| **PHASE-DIGEST-TRUTH-AND-CORPUS-1** | LANDED `b33ac46d` · korpus 342/342 · kadans `*/30` ölçümle hak edildi (koşu 5: encoded=0, mark=N/N, ~7.6s / 1800s = %0.4). |
| **⑦ Yol B / PHASE-TOOL-RETRIEVAL-PATHB-1** | LANDED `674d4ea8` · A23 §9 **Adım 1.5** olarak sahip onaylı. Alet çalışıyor; **yanlış rafı okuyor** (§2 #81). |
| **PHASE-DIAGNOSIS-DECISION-SPEC-1** | LANDED `1cbd1580` · spec + 27 falsifier, dormant. **Makine inşa EDİLMEDİ** — §2'de açık. |
| **PHASE-CATALOG-VERIFY-1** | LANDED `f6de2dec` · altı durum + statü≠izin ayrımı, dormant. |
| **PHASE-TURN-CONTEXT-SKELETON-1** | LANDED `313efd99` · `turnContextLog` + 16 falsifier. **Bağlı değil** — hiçbir aşama yazmıyor. |
| **PHASE-BACKEND-CATALOG-CARRIER-1** | LANDED `b90897fc` · yalnız rapor; R0 sonucu: ikinci kimlik uzayı açılmadı (TEK-ORGAN). |
| **PHASE-RAG-REACH-PROBE-1** | LANDED `1ea3ff07` + `ae85c3b4` · Part A sahip probuyla kapandı. |
| **PHASE-DOC-CORPUS-DISCOVERY-1** | LANDED `ae85c3b4` · `probeKnowledgeCorpus` + `npm run probe:knowledge`. |
| **#81 doğum kanıtı (cron ilk ateşleme)** | S108'de kapanmıştı; S110'da korpus TAMAMLANDI (342/342, dört koşu 242→142→42→0). Kalem §2'de içerik ekseniyle açık. |

---

## §2 · AÇIK KALEMLER — PAYDA (S111 sıralı)

### ⓵ S111'İN 1 NUMARASI — sahip hükmü, tartışmasız

**`PHASE-ARCHITECT-GROUND-TRUTH-1`** — *"Aklını kaybeden bir mimarla köprü yapılmaz."*
S110'da Architect üç kez ölçülebilir bir gerçeği yanlış beyan etti; üçünün de kaynağı **oturumdan oturuma yeniden yazılan özet zinciri**ydi. Kapsam:
- **Üretilen gerçek:** `scripts/genArchitectureFacts.ts` → `public/architecture/facts.json` ZATEN VAR ve her build'de koddan türetiyor (6 backend · 13 kategori · 31 izin × 3 rol · 388 faz, sha damgalı). **Repoya commit edilmiyor ve Architect'in açılış sırasında yok.** Kapsamı "ne inşa edildi / kim okuyor" eksenine genişletilecek.
- **Defterler append-only olacak** — `docs/laws/` gibi, taban-uzunluk CI kapısıyla. Yeniden yazma yasak. Bu kaybın tek yapısal çaresi.
- **`RULE-54 · PROVENANCE-BEFORE-PREMISE`** mintlenecek: her öncül `MEASURED:<komut>` / `RELAYED:<kim>` / `RECALLED` etiketi taşır; **`RECALLED` öncül olamaz**; YOKLUK iddiası en az iki bağımsız mercek ister.
- **Açılış sırası tersine:** `facts.json` → `docs/laws/` → append-only defter. Özetler yalnız anlatı.
- **Katalog/retrieval** — bilgi tabanı üstünde arama (projenin kendi Qdrant'ıyla, ayrı sistem değil).
- **`MEMORY.md` sıkıştırması bu kartın kapsamındadır.** AG-3 ve AG-4 S110 kapanışında bunu YAPMADI ve bayrak kaldırdı: dosyanın kendi başlığı, aynı gün bir regex geçişinin `·` ayracında sessizce kalem düşürdüğünü yazıyor. Toplu geçiş yasak; çare yapısaldır (append-only + indeks + retrieval), bir sıkıştırma turu değil.

### ⓶ #81 BACKEND-DISCOVERY-1 — **ölçülmüş zorunluluk** (sahip: *"bu olmadan hiçbir şey çalışmaz"*)

S110'un null'ı bu kalemi kanıta bağladı. Sahip formülasyonu bağlayıcı: *her bağlanan backend detaylıca **discover** edilir, **verify** edilir, **kataloglanır**; soru gelince katalogdan hangi backend/hangi tool uygunsa **o tool'lar LLM'e gönderilir**.*

**Ölçülmüş durum — üç şey VAR, dört şey YOK:**

| VAR | Ölçüm |
|---|---|
| Backend/araç keşfi | 7 backend · **330 araç** (330'unun da `input_schema` + `description` dolu) |
| Varlık keşfi | **800** `entity_registry` satırı · 3 katman |
| Davranış gözlemi | **194** `tool_behavior_census` satırı |
| Artefakt keşfi (#70) | **47** Superset dataset adı — içinde `Granit - Mengil Doğalgaz Kullanımı` ve `gas_consumption_summary` |
| Vektör indeksi | **342/342** |

| YOK | Sonuç |
|---|---|
| **Proaktif süpürme** | Yazıcı FIRSATÇI — yalnız biri gateway'den `list_datasets` çağırınca öğreniyor. Son yazma **2026-08-18 11:56**, o günden beri hiç. Sahip bunu S105'ten beri istiyor. |
| **İçerik derinliği** | Yalnız AD tutuluyor; kolon, metrik, kapsam yok. Grafikler hiç envantere alınmamış (`observed_via` 47/47 `list_datasets`). |
| **Doğrulama** | AG-3'ün altı dünyası spec olarak indi; **prover inşa edilmedi**. |
| **Tur anında okuyucu** | **HİÇ KİMSE.** Üç raf da (vektör korpusu · RAG dokümanları · 47 dataset adı) okuyucusuz. |

**S110'un mühürlü kanıtı — iki katmanda birden sözcüksel çöküş:**
- Recall@k null: **v3 `0.3333 → 0.3333`**, genişlik `13.00 → 16.78`; E1 altında hiçbir korpusta kurtarma yok, her kazanç ~3.5 fazla araçla geldi. Arm A mühürlü tabanı birebir üretti → alet çapalı.
- Kontroller mekanizmayı taşıyor: mekanizma-kelimeli soru `knowledge_search`'ü yüzeye çıkarıyor; **dört gerçek üretim sorusunun dördü de çıkarmıyor.**
- `tuketim` → **SIFIR**, çünkü dataset adı `Kullanımı`. On iki şekil denendi: 4 isabet, 8 ıska.
- **Boşluk GÖNDERGESEL, sözcüksel değil** — daha güçlü kodlayıcı kapatamaz.

**Kabul çıtası (sahip test seti):** Q2 doğalgaz · Q20 mengil↔fırın kırığı · Q21 kabarcık↔press doğru kapıya yönlensin; personel sayısı ve YK fayda tutarı doküman korpusuna yönlensin. **ORİJİNAL cümleler** — marka, iki parça, hepsiyle — çalışsın.

### ⓷ #29 A23 — SOTA'nın son anahtarı (kapı 6/7)

- Adım 0+1 CLOSED@evidence · **Adım 1.5 (⑦ Yol B) LANDED** · Adım 2 iskeleti LANDED ama **bağlı değil**
- **⑤/⑥ makinesi İNŞA EDİLMEDİ.** Spec + 27 falsifier `1cbd1580`'de dormant. Üçlü teşhis boruda ölüyor: `stageClarify.ts:329`. `'ambiguous'` canlı düzlemde **erişilemez union üyesi**. **Patlama yarıçapı ölçüldü: 678 kayıtlı adın 95'i 2+ varlık id taşıyor (208 id, en kötü 3'e dallanma).**
- **A23 v1_4 → v1_5 amendment** — ⑦ Yol B'yi §9'a Adım 1.5 olarak yazan belge. **Architect borcu, S110'da üretilmedi.**
- Enum uzlaştırması (AG-3 ↔ AG-1 taşıyıcısı) — `CATALOG_CLAIM_STATUSES` tek export'lu const; patlama yarıçapı derleme hatası. NOT-READ, aksiyona hazır.

### ⓸ ON BEKÇİ — koordinasyon (sahip: *"başıbozuk ordu"*)

S110'da bir sabahta üç bekçi canlıda ölçüldü, üçü de aynı soruyu öldürdü:

| # | Bekçi | Yer | Çare |
|---|---|---|---|
| B0 | BurstGuard | ön | — (sağlıklı) |
| **B1** | Kategori (kelime→kategori) | routing | ⑦ Yol B + #81 |
| B2 | GatewayPolicy | register-tools | — |
| B3 | ToolCollision | register-tools | — |
| **B4** | Varlık-çözümleme kapısı | clarify | ⑤/⑥ karar tablosu |
| **B5** | Frame-güven kapısı (tek bit) | clarify | A23 ② slot-başına güven |
| B6 | COMPARE kapısı | clarify | ⑤/⑥ |
| B7 | Zaman kapısı (LOW, yumuşak) | clarify | — |
| B8 | ALT-D / COMMAND | clarify | — |
| B9 | Kısaltma bandı | stream | ✅ çalışıyor, dürüst |

B4'ün iki kanalı var (alias + kapsam); kapsam kanalı `suppressedClarification=true` ile **elle** yamalanmış — koordinasyon tasarımla değil boolean'la sağlanıyor. **Şirket/holding seviyesinde varlık katmanı YOK** ("Kaleseramik" hiçbir katmanda yok).

### ⓹ GERİ GETİRİLEN KALEMLER (v108 tabanı — kapanış kaydı olmadan düşmüşlerdi)

| # | Kalem | S110'da ölçülen durum |
|---|---|---|
| **#79** | **Düz-metin sır onarımı + rotasyon** | 🔴 **GÜVENLİK.** `mcp_secrets` üç satır (`armes-new`, `ragbackend`, `supersettoken`) — değerler DÜZ. Üç mint'tir defterde yoktu. Rotasyon SAHİP eylemi. |
| **#80** | Obs R2 borcu (Langfuse kabul/gönderim oranı) | 🔴 S110 boyunca canlıda ARIZALI: `[Obs] flush delivery=failed … swallowed=N`, N gün boyunca büyüdü. Bütçe çiti ~20 Ağustos'ta doldu; **sahip hükmü: uzatma yok, adlandırılmış erteleme.** |
| **#77** | VECTOR-ONBOARD-DRIP-1 / VECTOR-QOS | Öncelik kuyruğu + throttling. Drip indi; **kuyruğun yük altındaki davranışı ölçülmedi** (R5). |
| **#78** | Parite tekrarlı ölçümü | Bir koşu bir dağılımı ölçemez. Açık. |
| **#17** | HONESTBENCH-HARNESS-0 taraması | Backend CANLI (4 `hb_*` aracı). ⚠ `cwf-sota-definition-v1_5 §10` hâlâ **`NOT BUILT`** diyor — **statü tablosu BAYAT**, düzeltilecek. |
| **#33** | B-FRONTIER-PAIRING-1 | 🔒 İlk dış skordan ÖNCE kurulmalı. Commit izi 0 (tek negatif prob). |
| **#37** | GOLDEN-SET-REPLAYABILITY-1 | 🔒 Aynı kapı. Commit izi 0. |
| **#48** | FAILURE-LESSON-MEMORY-1 | Commit'te açıkça *"untouched"*. |
| **#59** | SILENT-FINISH-DESIGN-1 | Belirsiz, ölçülecek. |
| **#64** | nav-scrollbox hükmü | Belirsiz, ölçülecek. |
| **#67** | (v108'den, kapsam ölçülecek) | Kayıp; yeniden okunacak. |
| **#69** | OWNER-BATTERY-1 (11 soru) | Commit izi 0. A23 adım-1 taban korpusu. |
| **#70** | ARTIFACT-NAME-OBSERVATION-1 | **İNŞA EDİLMİŞ** (47 satır). Kalan: proaktif süpürme · derinlik · okuyucu. #81'e MERGED-INTO. |
| **#71** | A2A-HOSTED-AUTH-CONTEXT-1 | Commit izi 0. |
| **#72** | RAG şeridi (Tier F1) | R9: *"KRİTİK"*. |
| **#73** | WEB-VALVE-1 (Tier F2) | Commit izi 0. |
| **#74** | (v108'den, LAW-LEDGER ailesi) | LAW-OKF-1 ile emilmiş olabilir — ölçülecek. |
| **#68** | Qdrant sahip-yüzü | Tetikli: sahip isteyince. |
| **NÖBET listesi** | v109 §7'de vardı, v110'da silindi | Geri: Langfuse çiti (doldu) · ARMES 134/141 aracın tüm parametreleri `required` · G3 doğum kanıtı (Hülya'nın üç soruluk gözlemi). |

⚠ `commit izi 0` bir **negatif prob**tur, yokluk kanıtı DEĞİLDİR (S102). Hepsi *presumed OPEN*; S111'de `facts.json` genişletilince ölçülecek.

### ⓺ S110'DAN DOĞAN YENİ KALEMLER

| Kalem | Durum |
|---|---|
| `F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` | **MASTER defekti.** 2 taban × 4 koşu = 2 yeşil/2 kırmızı, 1–2 ms taşma; ağaç master'la bayt-aynı; 8/8 izolasyonda geçiyor. Kendi kartıyla gelecek. |
| `F-S110-MODEL-ASSERTS-ABSENCE-FROM-TWO-PROBES` | Model iki Türkçe alt-dize probundan genel yokluk hükmü çıkardı. Çare: ⑧ Cevaplama odasının yokluk-beyanı disiplini. |
| `F-S110-FIRSTSEEN-MEANS-FIRST-WRITTEN` | `gateway_artifact_observations`: 47 satırın 37'sinde `first_seen > last_seen`. Sütun "ilk gözlenme" diyor, "ilk yazılma" üretiyor. **Hüküm: backfill YOK, migration düzenlenmeyecek** — yalnız sütun yorumu düzeltilecek (Operator, S111). |
| `F-S110-OPERATOR-PROOF-STATUS-BODY-MISMATCH` | Operator raporu `401/403` + gövde `42501` yazdı; telde ölçülen **401**. İkisi aynı anda doğru olamaz. |
| `F-S110-CLAIM-DELETE-RACE` | Hükme bağlandı → **S111 boot standardı**: silme adımı YOK, claim = ölçülmüş bayat sha'ya pinli `--force-with-lease`. |
| `F-S110-UNOBSERVABLE-PRECONDITION` | Hükme bağlandı → bir bekleme sözleşmesi, bekleyenin kendi aletiyle okuyabileceği sinyallerle ifade edilir. Akran düzyazısı sinyal değildir. |
| `F-S110-POST-MERGE-ORPHAN-COMMIT` | Adlandırılmış desen: doğru bir kuralın (sha-bağlama) bilinen bedeli, defekt değil. |
| `F-S110-RELAY-AUDIT-PIPE-IN-CLAIMS-FENCE` | `## CLAIMS` bölümü bir sonraki `##`'e kadar sürüyor; kanıt bloklarındaki borulu satırlar claim sanılıyor. Mekanizma ÇIKARIM (parser okunmadı). |
| Korpus kendi dokümanlarını sayamıyor | AG-2 Part A bulgusu. #81'in doküman yarısının ön koşulu. |

---

## §3 · PARK EDİLMİŞ — ASLA DÜŞÜRÜLMEZ

| Kalem | Tetik |
|---|---|
| **#82b Design-RAG** | Sahip çağrısı VEYA A23-sonrası envanter. S105 hükmü: *"şimdilik park et ama ASLA UNUTMA"*. |
| **#68 Qdrant sahip-yüzü** | Sahip isteyince; hedef: projenin kendi admin panelinde okunabilir Qdrant yüzeyi. |
| **A23 v1_4 → v1_5 amendment** | Architect borcu; kilitli belge yerinde düzenlenmez, amendment mekanizmasıyla. |
| **G3 doğum kanıtı** | ARMES toparlanması + Hülya'nın üç soruluk gözlemi. |
| **R5 · VECTOR-QOS yük ölçümü** | Gerçek trafiğe denk gelen bir indeksleme koşusu. **Boş popülasyon geçer not değildir.** |

---

## §4 · SOTA POZİSYONU — iki merdiven, karıştırılmasın

| Merdiven | Durum |
|---|---|
| **7 anahtar (`yaprak_gate`)** | **6/7.** #2 · #10 · #16 · #18 · #23 · #25 kapalı. Kalan tek anahtar: **#29 A23**. |
| **SOTA kabul sözleşmesi (`cinekop_gate`)** | **0/19.** `cwf-sota-definition-v1_5 §10`'un on dokuz satırının on dokuzu `ÖLÇÜLMEDİ`. Ölçülmüş iki satır iç (M-A kapı blok oranı, 2026-08-04). |

> İnşa merdiveninin son basamağındayız, ölçüm merdiveninin sıfırıncı basamağındayız. Dış bir kriter bugüne kadar bir kez bile koşulmadı.

<!-- END v113 -->
