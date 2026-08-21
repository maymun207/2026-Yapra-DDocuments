# CWF Design Note — LEARNING-SNAPSHOT-1 · v1_1 (AMEND)

<!-- cwf-design-LEARNING-SNAPSHOT-1-v1_1 · 2026-08-11 · S93. v1'i AMEND eder
     (S37-1). Sahip hükmü H4 aynen: ŞART, ve çok temiz çalışmalı.
     Zemin: origin/master 0d622de (rev 227). Her sayı BU OTURUMDA canlıdan
     ölçüldü (D-3); v1'in 2026-08-09 envanteri tarih oldu. -->

## §0 · v1'DEN NE DEĞİŞTİ — üç şey

1. **Envanter 5 değil 6 tablo** — `semantic_memory` bulundu (§1.5). v1'in
   kapsam listesi eksikti; S92'nin "beş tablo" notu bu eksiği devraldı.
2. **Migration doğrulandı ama ŞEKLİ değişti** — S92 notu "iki çıplak-PK tablo →
   `task_id` migration'sız imkânsız" diyordu. Ölçüm doğru, sonuç rafine:
   o iki tabloya `task_id` KOLONU GEREKMEZ, çünkü temiz-ajan modunda onlara
   yazmak zaten YASAK (§4). `task_id` kolonu iki KULLANICI-kapsamlı bellek
   tablosuna gider: `episodes` + `semantic_memory`.
3. **S93-1 gömüldü** — organ, kurulduğu fazın İÇİNDE ilk gerçek
   snapshot→restore turunu üretimde koşar ve kanıtlar (§5). "Kuruldu ama hiç
   çalışmadı" sınıfı bu organ için doğuştan imkânsız.

## §1 · ENVANTER (2026-08-11, canlıdan — v1 §1'i supersede eder)

| Tablo | Satır | PK | Kapsam | Sürüm/denetim |
|---|---|---|---|---|
| `episodes` | 214 | `id` uuid | user_id + conversation_id | ❌ |
| `semantic_memory` **(YENİ — v1'de YOKTU)** | 12 | `id` uuid | user_id | ❌ |
| `entity_registry` | 796 | `id` uuid | backend_id + layer | ❌ |
| `router_proposals` | 20 | **`keyword` (çıplak)** | global | ❌ |
| `backend_authority` | 3 | `(backend_id, metric)` | backend | ❌ |
| `tool_category_cache` | 2 | **`keyword` (çıplak)** | global | kısmi (`routing_audit`) |

Toplam **1.047 satır**, hiçbiri snapshot'lanabilir/geri-yüklenebilir değil.
Kod tarafı: `task_id` **0 isabet** (canlı grep, `0d622de`).
`router.learnEnabled` = **0** (F185 freni açık). `routing-cache.ts`'in C-D
şekli (silme + TEK epoch bump + denetim satırı ayrılamaz) yerinde — desen
oradan alınır.

## §1.5 · ALTINCI TABLO BULGUSU — kapsam testinin doğum kanıtı

`semantic_memory` (PHASE-SEMANTIC-MEMORY-1, S86) bellek organının semantik
katmanıdır ve v1'in envanterine hiç girmemiş. Organ daha kurulmadan v1 §4①'in
öngördüğü kaza yaşandı: **kapsam listesi elle tutulursa kaçak kaçınılmaz.**
Sonuç iki yönlü: (a) kapsam artık 6 tablo; (b) kapsam-kaçağı testi elle liste
karşılaştırması DEĞİL, mekanik türetim olacak — `DB_TABLES` içinde öğrenilmiş
katman sınıfına giren her tablo (yazma yolu `memoryDistill`/`learn`/`observe`
ailesinden geçenler) `LEARNED_TABLES` sabitinde yoksa test kırmızı; sabitin
kendisi snapshot RPC'sinin okuduğu TEK kaynak.

## §2 · BEŞ YETENEK → MEKANİZMA (v1 §4 aynen, adresleri netleşti)

**① SNAPSHOT** — yeni `learning_snapshots` tablosu (id · name · created_at ·
created_by · `manifest` jsonb [tablo→satır sayısı] · `payload` jsonb
[tablo→satır dizisi]). 1.047 satır ölçeğinde jsonb doğru araç; tutarlılık
sınırı **tek SQL fonksiyonu** (`learning_snapshot_take`) = tek işlem. Manifest
sayıları payload'dan TÜRETİLİR, ayrı sayılmaz (tek kaynak).

**② TEMİZ SIFIRLAMA** — `learning_wipe` RPC: 6 tablodan silme + `tool_category_cache`
için TEK epoch bump + `memory_audit`/`routing_audit` satırları — routing-cache.ts
C-D şekli, ayrılamaz. Sayı silmenin kendi RETURNING'inden ölçülür; okunamazsa
İPTAL (MEASURE-READ-HONESTY-1).

**③ SÜRÜMLÜ GERİ YÜKLEME** — `learning_restore(snapshot_id)` RPC: wipe +
insert aynı işlemde; ya hepsi ya hiçbiri. Denetim satırı hangi görüntüden
geldiğini taşır.

**④ TEMİZ-AJAN MODU** ve **⑤ `task_id` İZOLASYONU** — §4'te BİRLEŞTİ.

Üç RPC de service-role-only; RLS + all-grantees revoke + verifyGrants probe
satırları + HARDEN-FN-PROBE-1 üç-yönlü sınıflandırma (standart).

## §3 · MIGRATION (tek dosya, ADR-005 `db push`, Operator adımı)

1. `learning_snapshots` tablosu (server-only sınıf; grantPolicy satırı).
2. `episodes.task_id` **text NULL** + kısmi indeks `(user_id, task_id)`.
3. `semantic_memory.task_id` **text NULL** + aynı indeks deseni.
4. Üç SQL fonksiyonu: `learning_snapshot_take` · `learning_wipe` ·
   `learning_restore` (SECURITY DEFINER, service-role EXECUTE, geri kalan
   herkesten revoke).
`router_proposals` / `tool_category_cache` / `backend_authority` /
`entity_registry`'ye kolon DOKUNMAZ — koruma §4'ün refleksiyle sağlanır.

## §4 · TEK BAYRAK: `ctx.taskId` — varlığı hem izolasyon hem temizlik

Bir turn `taskId` taşıyorsa (yeni İSTEĞE BAĞLI istek alanı; bugün tek
tüketicisi gelecekteki A2A sunucusu #18):

- **Global öğrenme kapıları KAPANIR** (yazma reddedilir, sessizce değil —
  ledger'a `skipped:clean-agent` düşer): `tool_category_cache` learn ·
  `router_proposals` record · `backend_authority` gözlem terfisi ·
  `entity_registry` keşif yazımı. Çift yönlü kirlenme koruması: benchmark
  kelimeleri armes'in üretim yönlendirmesini ASLA zehirlemez (v1 §4④'ün
  "üretim koruması" cümlesi mutlaklaştı).
- **Kullanıcı-kapsamlı bellek İSİM-ALANLANIR**: `episodes` ve `semantic_memory`
  yazımı `task_id` ile; okuma AYNI `task_id`'ye filtreli. Görev İÇİ çok-turlu
  bellek çalışır (ajanın çalışma belleği), görevler ARASI sıfır taşıma —
  AgentBeats'in tam istediği. Üretim turn'leri (`task_id` NULL) yalnız NULL
  okur; bugünkü davranış bayt-aynı.
- Eşzamanlı iki görev birbirinin satırını GÖREMEZ (kabul kanıtı #6).

## §5 · S93-1 FAZ-İÇİ CANLI KANIT (yeni — sahip onaylı tek egzersiz)

Merge + üretim yakınsaması sonrası, fazın kapanış adımı olarak:
1. `learning_snapshot_take('s93-birth')` — canlı 1.047± satır görüntülenir;
   manifest sayıları canlı sayımlarla karşılaştırılır (6/6 eşit ⇒ PASS).
2. **Aynı görüntüden `learning_restore`** — atomik wipe+reinsert; sağlıklıysa
   veri bayt-aynı döner, sayılar yeniden 6/6 eşit, denetim satırları yazılmış.
Bu, üç yeteneğin üçünü gerçek veride egzersiz eder ve S93-1'i karşılar: alet
doğduğu gün ölçtü ve ölçümü doğrulandı. (Atomiklik SQL işleminin garantisi;
yine de bu adım sahibin AÇIK onayıyla koşulur — R-2.)

## §6 · KABUL KANITLARI (v1 §6 + iki ek, her biri mutasyonlu)

v1'in 6 kanıtı aynen (yarım görüntü imkânsız · kapsam kaçağı imkânsız —
artık 6 tabloyla ve mekanik türetimle · sayı ölçülür · restore atomik ·
temiz-ajan yazmaz + pozitif kontrol · task izolasyonu). Ek:
7. **`skipped:clean-agent` görünür** — kapı kapatınca ledger satırı doğar;
   mutasyon: satırı düşür ⇒ adlandırılmış test ölür (S89-1 md.4).
8. **NULL üretim bayt-aynı** — `task_id` NULL yolunda okuma/yazma davranışı
   fazdan önceki halle pin'li (bayt-aynılık regresyon testi).

## §7 · SINIRLAR (v1 §5 aynen)

Yönetilen katmana dokunmaz · yeni unutma politikası koymaz (MEMORY-HYGIENE-Q
ayrı, S90-H3) · `entity_registry` keşif yolunu değiştirmez (ADR-009; görüntü
kapsar, üretimi değiştirmez).

## §8 · RATİFİKASYON MADDELERİ (sahip)

- **R-1 · Migration onayı** — §3'ün tek dosyası; Operator `supabase db push`
  yolu (ADR-005), G-kapıları + idempotence probe + verifyGrants standart.
- **R-2 · Faz-içi canlı restore egzersizi** — §5'in 2. adımı üretim öğrenilmiş
  katmanını yerinde yeniden yazar (sağlıklıysa bayt-aynı). Onay = veri
  değiştiren adım onayı (D-4 sınıfı).
- **R-3 · Temiz-ajan semantiği** — `taskId` varlığı = global öğrenmeye sıfır
  yazma + kullanıcı belleği isim-alanlı. S92 notunun rafinesi: çıplak-PK iki
  tabloya kolon DEĞİL, kapı reddi. (Architect tavsiyesi üçünde de: EVET.)

## §9 · SIRALAMA + S88-1

Rollout v3_0 **#2**, kapının ilk anahtarı. Şerit: AG (+ Operator migration
adımı). ⚠ S88-1 eşleştirme: bu faz `memoryDistill` / `memoryRetrieve` /
`EpisodesRepository` / `SemanticMemoryRepository` / öğrenme kapıları + yeni
`api/admin/learning-snapshot.ts` + migration'a dokunur; paralel adaya (#36
FLOOR-RESYNC-1: `toolCategories` taban bölgesi + tek script) çitler AYRIK —
ikisi aynı dalgada merge ederse GO'lar S92-1 ikinci-merger protokolünü taşır.

<!-- END · cwf-design-LEARNING-SNAPSHOT-1-v1_1 -->
