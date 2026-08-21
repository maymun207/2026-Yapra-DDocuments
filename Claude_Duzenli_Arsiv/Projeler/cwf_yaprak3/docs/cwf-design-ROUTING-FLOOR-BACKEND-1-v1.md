# TASARIM NOTU · `ROUTING-FLOOR-BACKEND-1` · v1

<!-- cwf-design-ROUTING-FLOOR-BACKEND-1-v1 · 2026-08-10 · S92.
     Yürüyüş kalemi #5 (rollout v2_9). Bu not FAZ PROMPTU DEĞİLDİR — sahip
     onayından sonra AG-2 promptu yayınlanır (prompt hazır, aynı mesajda). -->

## §1 · KUSUR (S92'de canlıdan okundu)

`api/cwf/_lib/toolCategories.ts:164-490` — üretilmiş `[F214-FLOOR-SYNC]` bloğu,
**12 seramik kategorisi**: `'oee'` (:169), `'üretim'/'hat'/'reçete'/'parti'`
sınıfı Türkçe seramik kelimeleri, ~100 armes araç adı. Bu blok **platform
seviyesinde tek düz sabittir** ve iki yerde canlı:

1. `matchCategories(message, learned, categories = CATEGORIES)` (:1049) —
   **varsayılan argüman**. Outage/sıfır-satır anında HANGİ backend yönlendirilirse
   yönlendirilsin bu tabana düşer.
2. `getRoutingCategoryManifest()` (:1733) — backend parametresi YOK; semantic
   router promptu ve `resolveToolCategories()`'in outage yolu bu düz tabanı
   servis eder.

Üretici zincir (`scripts/syncRoutingFloor.ts` → çekirdek
`api/cwf/_lib/routing/floorSyncCore.ts`) **backend kavramı içermiyor** —
AG-1'in ROUTE-DERIVE-1 raporu §5'in adlandırdığı boşluk: *"bu kod tabanının
hiçbir yerinde backend-başına taban kavramı yoktur."*

**Sonuç:** superset (veya müşteri #2'nin herhangi bir backend'i) kesinti anında
**seramik sözlüğüyle** yönlendirilir. Tenant-zero'nun çıkış grep'i buraya
değmiyor (literal, referans değil) — yani bu, sözlüğün son sığınağı.

## §2 · YASA TABANI (hepsi ratifiye — yeni hüküm istenmez)

- **S90 H1 emsali, birebir:** mekanizma korunur, ADRES backend-başına taşınır
  ("tapu-anahtarlığı sökülmez" bu şekilde uzlaştırılmıştı; METRIC-REGISTRY-DATA-1
  aynı deseni sevk etti).
- **Tenant-zero:** platform tabanı BOŞtur; seramik kelimeleri yalnız armes'in
  backend-kapsamlı tabanında yaşar.
- **F185:** taban := BUGÜNÜN yayınlı hâli — üretici bunu zaten uyguluyor,
  değişmez.
- **§2.3 ALWAYS_INCLUDE kutsal:** hiçbir yol `offered=0` döndüremez; boş
  kategori tabanı ALWAYS_INCLUDE'u DÜŞÜRMEZ.
- **ADR-011 kemeri + STOP koşulları:** üreticinin write-exposed reddi ve
  floor-sourced-live reddi aynen korunur.

## §3 · TASARIM

**A · Üretilmiş blok backend-anahtarlı olur.**
`CATEGORIES: ToolCategory[]` → `FLOOR_BY_BACKEND: Record<string, ToolCategory[]>`.
armes anahtarı bugünkü 12 kategorinin bayt-aynı aynasını taşır. Başka hiçbir
anahtar üretilmez (yalnız armes'in yayınlı `tool_category` satırları var).
**Platform-düzeyi kategori listesi diye bir şey KALMAZ.**

**B · Erişimci backend ister.**
`getRoutingCategoryManifest(backendId: string)` — o backend'in tabanı, yoksa
`categories: []`. `alwaysInclude` backend'den bağımsız, aynen döner. Boş taban
bir HATA değildir: "bu backend'in kod tabanında sözlüğü yok" gerçeğinin dürüst
hâlidir (empty≠zero: anahtar yokluğu ile boş liste aynı şeydir burada, çünkü
üretici yalnız var olanı yazar — test bunu sabitler).

**C · Varsayılan argüman ÖLÜR.**
`matchCategories`'in üçüncü parametresi zorunlu olur. İç çağrı yerleri (:1387,
:1394, :1477) zaten açık geçiriyor; varsayılan, kusurun kendisiydi. Derleyici
bundan sonra her çağranın dilimini adıyla söylemesini zorlar (RoutingCoreInput
:1118-1123'ün yazılı niyeti buydu).

**D · Outage yolu backend'e sadık kalır.**
`resolveToolCategories()` taban servis ettiğinde, ÇÖZMEKTE OLDUĞU backend'in
tabanını servis eder — armes kesintide seramik tabanını alır, superset boş
taban + ALWAYS_INCLUDE alır.

**E · Üretici backend-farkında olur.**
`floorSyncCore.ts` render/splice/diff, backend-anahtarlı bölgeyi işler;
bayt-kararlılık (aynı girdi ⇒ bayt-aynı dosya), STOP koşulları ve ADR-011
kemeri aynen. `--report` çıktısı backend başına diff verir.

**F · Admin çağrı yerleri iplik geçirir.**
`router-proposals.ts:153` ve `routing-curation.ts:81` erişimciye backend id
verir. Kural: id çağrı yerinin MEVCUT bağlamından (satır/istek) gelir; bağlamda
gerçekten yoksa AG uydurma varsayılan İCAT ETMEZ — DURUR ve baytı raporlar,
hükmü Architect verir. (Kiracıyı koda geri gömecek bir `?? 'armes'` bu fazın
tam tersidir.)

## §4 · BU FAZ NE YAPMIYOR

Sözlük içeriği değişmez (armes'in 12'si bayt-aynı taşınır). Governance verisine
dokunulmaz. Migration yok, Operator yok. Router davranışı DB-yolunda değişmez —
değişen yalnız TABAN adresi ve outage anındaki dürüstlük.

## §5 · POZİTİF KONTROLLER (fazda test olarak var olacak)

- **M1:** superset id ile manifest → `categories: []` + ALWAYS_INCLUDE dolu;
  armes tabanını döndürecek şekilde mutasyonla → kırmızı (tenant-zero'nun
  çalışma-zamanı hâli).
- **M2:** armes id ile manifest → bugünkü 12 kategori **bayt-aynı** (isim +
  keyword + tool listeleri; sync `--report` CLEAN).
- **M3:** `matchCategories`'e varsayılanı geri koy → derleme/test kırmızı.
- **M4:** outage simülasyonu: armes çözümü tabana düşer → seramik taban;
  superset çözümü tabana düşer → boş + ALWAYS_INCLUDE, `offered > 0`.
- **M5:** üretici bayt-kararlılık: `--write` ikinci koşuda sıfır fark; ve
  write-exposed STOP aynen kırmızı üretmeye devam eder.

<!-- END · cwf-design-ROUTING-FLOOR-BACKEND-1-v1 -->
