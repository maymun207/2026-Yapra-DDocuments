# CWF Design Note — LEARNING-SNAPSHOT-1 · v1

<!-- cwf-design-LEARNING-SNAPSHOT-1-v1 · 2026-08-09 · S91.
     Sahip hükmü H4: ŞART, ve çok temiz çalışmalı.
     ⚠ §3 envanteri 2026-08-09'da `00062c7`'de ölçüldü. Faz açılırken
     CANLI AĞAÇTA YENİDEN DOĞRULANIR (S65-1) — bu notun kendisi kanıt değildir. -->

## §0 · SAHİBİN CÜMLESİ

*"Chat with your Factory'yi sıfırdan kurduğumu düşün — şu andaki bilgi
birikimimi oraya nasıl taşıyacağım? Var olan tüm öğrenimimi silebiliyor olmam
lazım, geçmişteki öğrenimimi versiyonlayarak geri koyabiliyor olmam lazım."*

## §1 · TEŞHİS — İKİ KATMAN, BİRİ KORUNUYOR BİRİ KORUNMUYOR

Ölçüldü (2026-08-09, canlı DB):

| Katman | Satır | Sürüm | Denetim | Sıfırlama | Geri yükleme |
|---|---|---|---|---|---|
| **Yönetilen** — `domain_rules` yayınlı | **310** | ✅ `rule_versions` 442 | ✅ `rule_audit` 863 | ✅ | ✅ prensipte |
| `episodes` (epizod · dosya · rutin) | 196 | ❌ | ❌ | kısmi (TTL) | ❌ |
| `entity_registry` (keşfedilen topoloji) | 796 | ❌ | ❌ | ❌ | ❌ |
| `router_proposals` (gözlem kuyruğu) | 20 | ❌ | ❌ | ❌ | ❌ |
| `backend_authority` (kazanılmış güven) | 3 | ❌ | ❌ | ❌ | ❌ |
| `tool_category_cache` (öğrenilmiş eşleme) | 2 | ❌ | ✅ `routing_audit` | ✅ | ❌ |

**Ayrım net:** yönetişim katmanı doğuştan versiyonlu, denetimli, geri
yüklenebilir — çünkü *karar* olarak tasarlandı. **Öğrenilmiş katman ~1.017 satır
ve hiçbirine sahip değil** — çünkü *yan ürün* olarak doğdu. Bu, S91'in genel
dersinin bir örneği daha: gözlem fazında doğan bir organ, güç kazanınca yeniden
yargılanmalıdır.

**İyi haber:** `router.learnEnabled` canlıda **0** (F185 freni), yani anahtar-kelime
öğrenme yolu kapalı ve `tool_category_cache` 2 sabit satırda duruyor. **Dört
kirlenme yolundan biri kapalı; üçü açık** (epizod yazımı · öneri kuyruğu ·
kazanılmış güven).

## §2 · NEDEN ŞİMDİ — BU BİR HİJYEN TERCİHİ DEĞİL, GİRİŞ BİLETİ

AgentBeats platformu, değerlendirmeye katılan her ajandan **kural olarak** şunu
istiyor: her koşuya **temiz, durumsuz** bir başlangıç durumuyla girmek; önceki
karşılaşmalardan **bellek, dosya ya da bağlam taşımamak**; uzun ömürlü durum
tutuyorsa **değerlendirmeler arasında durumu tamamen sıfırlayacak bir mekanizmaya
sahip olmak**; ve eşzamanlı koşuların çakışmaması için yerel kaynakları
**`task_id`** ile isim-alanına koymak.

Sahip bu gereksinimi platformdan bağımsız olarak kendi kafasından çıkardı; platform
onu yazılı kural olarak koyuyor. **Sonuç: LEARNING-SNAPSHOT-1 olmadan bu platforma
girilmez.** Rollout v2_8'de SOTA kapısının yedi önkoşulundan biridir.

## §3 · MEVCUT YÜZEYLER — ÜÇÜ VAR, HİÇBİRİ BESTELENEBİLİR DEĞİL

Recon (`00062c7`):

- **`api/admin/routing-cache.ts`** — POST: `tool_category_cache` silinir + **tek
  epoch bump** + `routing_audit` `'clear'` satırı `{deletedCount}` taşır, ve üçü
  **ayrılamaz** (C-D). ⭐ **Tam istenen şekle sahip TEK yüzey budur** — desen
  buradan alınır, icat edilmez.
- **`api/admin/memory-forget.ts`** — CRON tick, **TTL süpürmesi** (sıfırlama
  değil). Doğuştan gürültülü: tek satır `[MemoryForget] deleted=N scanned=M`, ve
  tarama sayısı okunamazsa **tick'i İPTAL eder** (MEASURE-READ-HONESTY-1).
- **`api/admin/routing-curation.ts`** — `opClear()` ve akrabaları; anahtarsız bir
  `'clear'` satırı dürüstçe desteklenmiyor → 422.

**Yazma yolları:** `EpisodesRepository.ts` · `SemanticMemoryRepository.ts` ·
`turn/landingSignals.ts` · `turn/memoryRetrieve.ts` · `resolveMemoryPolicy.ts`.

**Sonuç: sıfırlama parça parça var, anlık görüntü ve geri yükleme HİÇ yok, ve üç
yüzey birbirinden habersiz.**

## §4 · HEDEF ŞEKİL — BEŞ YETENEK

**① ANLIK GÖRÜNTÜ (snapshot).** Öğrenilmiş katmanın tamamı, adlandırılmış ve
tarihli tek bir sürüm olarak. Tutarlılık sınırı **tek işlem** olmalı — yarısı
alınmış bir görüntü, alınmamış bir görüntüden kötüdür çünkü güvenilir görünür.
Kapsam açıkça listelenir ve **kapsam listesi kodda tek yerdedir** (yeni bir
öğrenme tablosu doğduğunda listeye girmezse **test kırılır** — `healthCoverage`
ve `stageCardCoverage` emsali: iki hâl, üçüncüsü yok).

**② TEMİZ SIFIRLAMA.** Tek yönetilen işlem. `routing-cache.ts`'in şekli:
silme + epoch + denetim satırı **ayrılamaz**. Sayı **ölçülür**, iddia edilmez;
okunamazsa **iptal**, "0" değil (MEASURE-READ-HONESTY-1).

**③ SÜRÜMLÜ GERİ YÜKLEME.** Bir görüntüyü geri koyar. Geri yükleme **denetim
satırı bırakır** ve hangi görüntüden geldiğini söyler. Kısmi geri yükleme
yasaktır — ya hepsi ya hiçbiri.

**④ TEMİZ-AJAN MODU.** Benchmark koşusu üretim öğrenmesine **HİÇ yazmaz**.
⚠ **Bu test hijyeni değil, ÜRETİM KORUMASIDIR:** CWF dış bir benchmark'ın
araçlarına karşı koşarken öğrenme açıksa o kelimeleri `tool_category_cache`'e
yazar ve **armes'in üretim yönlendirmesini zehirler.** Kirlenme çift yönlüdür.

**⑤ `task_id` İZOLASYONU.** Eşzamanlı değerlendirmelerin birbirine karışmaması
için isim-alanı. AgentBeats şartı.

## §5 · SINIRLAR (bu faz NE YAPMAZ)

- **Yönetilen katmana dokunmaz.** `domain_rules` zaten versiyonlu; onu bu
  mekanizmaya sokmak çalışan bir sistemi bozar.
- **Yeni bir unutma politikası koymaz.** `MEMORY-HYGIENE-Q` S90 H3 ile hükme
  bağlandı (elle silme REDDEDİLDİ · çıplak TTL reddedildi · düşüş ADR-010 gözlem
  disiplinine bağlı) ve **ayrı bir kalemdir.**
- **`entity_registry`'nin keşif yolunu değiştirmez** — ADR-009: topoloji
  keşfedilir. Görüntü onu **kapsar**, üretimini değiştirmez.

## §6 · KABUL KANITLARI (her biri bir mutasyonla)

1. **Yarım görüntü imkânsız** — işlem ortasında kesilirse görüntü YAZILMAZ.
   Mutasyon: tutarlılık sınırını kaldır ⇒ adlandırılmış test ölür.
2. **Kapsam kaçağı imkânsız** — listeye girmemiş bir öğrenme tablosu ⇒ test kırmızı.
3. **Sıfırlama sayısı ölçülür** — sayım okunamazsa iptal, `0` değil.
4. **Geri yükleme atomik** — kısmi geri yükleme ⇒ adlandırılmış test ölür.
5. **Temiz-ajan modu gerçekten yazmaz** — mod açıkken bir öğrenme yazımı
   denenir ⇒ sıfır satır, ve **pozitif kontrol**: mod kapalıyken aynı yazım
   satır üretir (S66-1 — yazmayan bir yolun "yazmadığı" kanıt değildir).
6. **`task_id` izolasyonu** — iki eşzamanlı sahte koşu birbirinin satırını görmez.

## §7 · SIRALAMA

Rollout v2_8 **#2** (CANARY-POWER-1'in hemen arkası) ve **SOTA kapısının yedi
önkoşulundan biri.** Faz açılırken §3 recon'u canlı ağaçta yeniden doğrulanır.

<!-- END · cwf-design-LEARNING-SNAPSHOT-1-v1 -->
