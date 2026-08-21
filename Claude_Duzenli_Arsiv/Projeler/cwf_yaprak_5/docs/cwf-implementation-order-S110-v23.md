# CWF — UYGULAMA SIRASI · S110-v23
<!-- 2026-08-20. v22'yi GEÇERSİZ KILAR. Sıra BAĞLAYICI. BÜTÜN yazıldı. -->

## §0 · SIRANIN GEREKÇESİ (S110'da ölçülerek değişti)

S110 açılışında sıra "A23 devamı" idi. Kapanışta **değişti** ve sebebi ölçüm:

1. **Recall@k null** (`v3 0.3333 → 0.3333`, genişlik `13.00 → 16.78`) — ⑦ Yol B çalışan bir alet, **yanlış rafı** okuyor. Boşluk göndergesel; daha güçlü kodlayıcı kapatamaz.
2. **Architect üç kez ölçülebilir bir gerçeği yanlış beyan etti** ve üçünün kaynağı da özet zinciriydi.

Bu iki ölçüm, sırayı sahip hükmüyle şu hâle getirdi: **önce mimarın hafızası, sonra sistemin kataloğu, sonra anlama makinesi.**

---

## §1 · SIRA

### 1 · `PHASE-ARCHITECT-GROUND-TRUTH-1` — **BLOKLAYICI**

> Sahip hükmü: *"Aklını kaybeden bir mimarla köprü yapılmaz. Bu olmadan başka bir şey yapmak vakit ve para kaybı."*

| Alt kalem | İçerik |
|---|---|
| 1a · Üretilen gerçek | `genArchitectureFacts.ts` ZATEN koddan türetiyor (`facts.json`, sha damgalı). **Repoya commit edilecek** ve kapsamı "ne inşa edildi · kim okuyor · hangi tabloda kaç satır" eksenine genişletilecek. |
| 1b · Append-only defterler | Register/KB/bug-bucket `docs/laws/` gibi append-only + taban-uzunluk CI kapısı. **Yeniden yazma yasak.** Kaybın tek yapısal çaresi. |
| 1c · `RULE-54 PROVENANCE-BEFORE-PREMISE` | Her öncül `MEASURED:<komut>` / `RELAYED:<kim>` / `RECALLED` etiketi taşır. `RECALLED` öncül olamaz. YOKLUK iddiası ≥2 bağımsız mercek. |
| 1d · Açılış sırası | `facts.json` → `docs/laws/` → defter. Özetler yalnız anlatı. Bootstrap v111 §2'de zaten yazılı; kod tarafı burada. |
| 1e · Katalog/retrieval | Bilgi tabanı üstünde arama — projenin kendi Qdrant'ıyla, **ikinci bir sistem değil** (TEK-ORGAN). |
| 1f · `MEMORY.md` | Bu kartın kapsamında. **Toplu regex geçişi YASAK** — dosyanın kendi başlığı, aynı gün bir geçişin `·` ayracında sessizce kalem düşürdüğünü yazıyor. Çare yapısal. |

**Kabul:** S111 açılışında Architect'in ilk mesajı `facts.json`'dan okunmuş ölçümlerle kurulur; bir kalemin "yok" olduğu iddiası iki mercekle desteklenmeden yazılamaz.

### 2 · `#81 BACKEND-DISCOVERY-1` — ölçülmüş zorunluluk

Sahip formülasyonu bağlayıcı: **discover → verify → katalogla → soru gelince katalogdan uygun tool'lar LLM'e.**

| Alt kalem | Neden |
|---|---|
| 2a · Proaktif süpürme | Yazıcı fırsatçı; son yazma 2026-08-18, iki gündür sessiz. Arka planda bol zaman var. |
| 2b · İçerik derinliği | 47 satır yalnız AD taşıyor. Kolon, metrik, kapsam yok; grafikler hiç envantere alınmamış. Doküman korpusunda konu kapsamı yok. |
| 2c · Doğrulama (prover) | AG-3'ün altı dünyası spec olarak indi (`f6de2dec`); prover inşa edilmedi. **Doğrulanmamış katalog, dürüstçe aptal bir kelime listesinden daha tehlikelidir** — çünkü kanıt gibi görünür. |
| 2d · Tur anında okuyucu | Üç rafın da okuyucusu yok. Bu, sıranın kalbi. |
| 2e · Enum uzlaştırması | AG-3 ↔ AG-1 taşıyıcısı; `CATALOG_CLAIM_STATUSES` tek export const, patlama yarıçapı derleme hatası. |

**Kabul çıtası — sahip test seti, ORİJİNAL cümlelerle:** Q2 doğalgaz · Q20 mengil↔fırın kırığı · Q21 kabarcık↔press → doğru kapı. Personel sayısı · YK fayda tutarı → doküman korpusu. **Q2 için: veri yoluna ulaşıp *"bu rapor henüz yok, veri şurada, oluşturayım mı?"* demek GEÇER; *"bu veri panolarımızda yok"* KALIR.**

### 3 · `#29 A23` — SOTA'nın son anahtarı

| Alt kalem | Durum |
|---|---|
| 3a · ⑤/⑥ makinesi | Spec dormant (`1cbd1580`), makine YOK. `stageClarify.ts:329` üçlüyü öldürüyor; `'ambiguous'` erişilemez union üyesi; patlama yarıçapı **95/678**. |
| 3b · turn_context bağlanması | İskelet indi (`313efd99`), hiçbir aşama yazmıyor. ⑤/⑥'nın ön koşulu. |
| 3c · ② slot-başına güven | B5 (frame-güven kapısı) tek bit; `irFrame.ts:194` sessizce `AMBIGUOUS` varsayıyor — "emin değilim" ile "söylemedim" aynı kelimeye çöküyor. |
| 3d · A23 v1_4 → v1_5 amendment | Architect borcu. ⑦ Yol B'yi §9'a Adım 1.5 olarak yazacak. |
| 3e · Şirket/holding varlık katmanı | "Kaleseramik" hiçbir katmanda yok. |

### 4 · Paralel / bloklamayan

`F-S110-SUITE-TIMING-ASSERTION-LOADSENSITIVE` (master defekti) · `#79` sır rotasyonu (sahip + Operator) · `F-S110-FIRSTSEEN-MEANS-FIRST-WRITTEN` (Operator, tek satır) · `#80` Obs R2 · `#17` honestbench taraması + `cwf-sota-definition §10` bayat statü düzeltmesi.

### 5 · Kapalı kapılar — dış ölçüm merdiveni

`#33` B-FRONTIER-PAIRING-1 ve `#37` GOLDEN-SET-REPLAYABILITY-1 **ilk dış skordan ÖNCE** kurulur. `#30/#31/#32` (EVAL-SPLIT + ilk skor turu + honestbench + v1.1) → `cinekop_gate`.

---

## §2 · SOTA POZİSYONU

| Merdiven | Durum |
|---|---|
| 7 anahtar (`yaprak_gate`) | **6/7** — kalan tek anahtar #29 A23 |
| SOTA kabul sözleşmesi (`cinekop_gate`) | **0/19** — `cwf-sota-definition-v1_5 §10`'un on dokuz satırı `ÖLÇÜLMEDİ` |

İnşa merdiveninin son basamağındayız, ölçüm merdiveninin sıfırıncı basamağındayız.

<!-- END v23 -->
