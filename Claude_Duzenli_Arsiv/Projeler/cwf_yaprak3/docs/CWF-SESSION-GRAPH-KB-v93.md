# CWF · SESSION GRAPH KB · v93 — S92

<!-- CWF-SESSION-GRAPH-KB-v93 · 2026-08-11 · v92'yi supersede eder. -->

## §1 · S92'NİN TEK CÜMLESİ

*"Aletler dürüstleşti: 28 gün 136 koşuda tek hüküm verememiş kanaryanın kusuru
güçte değil KURALDA çıktı ve paylaşılan organda düzeltildi (ilk üç gerçek
hüküm üretimde), 04 kartı 'planlayıcı yok' yalanını bıraktı, seramik taban
backend-anahtarına taşındı — üç merge, iki-şeritli iki dalga, bir STOP raporu
ve S90-1'in canlıda iki kez üretilip iki kez doğru çözülmüş çarpışması."*

## §2 · ZİNCİR (neden → ne → sonuç)

1. **Bootstrap RULE-25** → zemin 8/8 doğrulandı; canlı `replay_audit` okuması
   → **136 koşu, sıfır anlamlı hüküm** → üç bayt-bağlı kusur: F-S92-1
   (`separated` sıfır-olayda aritmetik imkânsız, goldenRun:122) · F-S92-2
   (`reps_completed` çarpımla uydurma, eval-ci:202; `emptyCount 0` =
   empty≠zero ihlali) · F-S92-3 (CI hayalet `verdict` alanı okuyor,
   build-test:212).
2. **Sahip:** ad `CANARY-VERDICT-TRUTH-1` (H2) + tasarım onayı (H3).
   `goldenVerdict`'in DÖRT tüketicisi bulundu → düzeltme paylaşılan organda,
   eylem yüklemi `=== 'regression'` teste çivili; `underpowered`'ın iki iş
   yapması (istatistik + nöbetçi) S89-1 md.4 ihlaliydi → `no_jurisdiction`
   ayrıldı, `clean_both_arms` N tabanıyla doğdu.
3. **Dalga 1 kesimi → S88-1 çapraz kontrol ÇARPIŞMA yakaladı:** sözlük
   `src/**`'e taşıyor (RolloutTab rozeti, adminService union'ları, preview
   fixture'ları) ve #4 TRUST-PANEL aynı iki dosyaya yazıyor → **#4 dalgadan
   çekildi**, AG-2'ye #5 verildi. v1 promptlar geri çekildi, v2 kesildi.
4. **AG-2 STOP raporu (sıfır üretim baytı):** üç çit koşulu — hepsi haklı,
   ikisi Architect hatası (S92-2 kesilmiş sayım; `resolveToolCategories`
   union-çözümü hiç okunmamıştı — §2.D'nin göndergesi yoktu). Üçüncü bulgu:
   `npx tsc --noEmit` SAHTE YEŞİL (root `files: []`) → gerçek kapı
   `typecheck:api`, iki proje AYRI. AG-1'e errata gönderildi.
   **Ve `coveredBackendIds` keşfi:** kurulacak seam zaten vardı — kod
   `null = atıf bilinemez, sebep düz taban` diye kendi belgelemişti → faz
   bölünmedi, keskin bitiş ölçütü doğdu: null ÖLÜR.
5. **AG-1 kanarya sevkiyatı:** 4 sapma, 4'ü ratifiye — §6.1 eksen-kapsamlı
   kural tasarımın harfiyen hâlinin **L5 auto-rollback'i öldüreceğini**
   yakaladı (guardrail violation eksenini hiç vermez → her rollout
   `no_jurisdiction` olurdu). RULE-25: predicate'ler bayt-aynı, 6354/6355
   (tek kırmızı sandbox yük flake'i, izole 2× yeşil), reseal rev 224 —
   Architect'in "reseal gerekmez" hükmü YANLIŞTI (S92-3 probe hatası).
   Merge `b5da685` → **aletin İLK hükmü:** `no_jurisdiction` + N;
   `reps_completed 9 = 3 scored + 6 failed ÖLÇÜLMÜŞ`.
6. **Dalga 2 (#3 + #5):** recon 04'ün taşıyıcısını buldu (`turn_done.
   payload.planner` — plan metni kalıcı değil, özet HER turn'de) ve #5'i
   `src`-siz tasarladı (curation reference = birleşim, eski şekil) → god-file
   `adminService.ts` çakışması dalga-öncesi çözüldü. İki şerit de yeşil
   sevk etti; AG-1 yol üstünde gerçek loader kusuru düzeltti (üç sonuç tek
   `null`), AG-2 beş kapsam kararı işaretledi (en önemlisi §7.2: router LLM
   promptu artık çağıranın dilimini alıyor).
7. **Entegrasyon RULE-25:** iki dalı yerelde sırayla merge → manifest
   çatışması, `docVersion` iki tarafta AYNI "rev 225" (S90-1 senaryosu
   MİLİMETRİK üretildi) → protokol: merged ağaçta reseal + **rev 226 açık
   SET** → drift 7/7, tsc 0+0+0, **suite 521/6415 tam yeşil**.
8. **Merge zinciri:** `c2f7dfd` (stage-context) → AG-2 ikinci-merger
   protokolü birebir (`b646c01` reseal commit'i) → `0de5ffd` (routing-floor).
   Master, Architect'in yeşil ağacıyla kod düzeyinde bayt-aynı. Kanarya her
   merge'de konuştu: `no_jurisdiction`, N'ler 3/3·6/6 → 6/6·3/3.
9. **Elle tanık (H5):** 04 kartı üretimde — `recorded · live mode ·
   QUERY_MASTER · steps 3 · replans 0 · gate no-jurisdiction`. İki sürpriz
   kayda geçti: üretim planner'ı GERÇEKTEN plan türetiyor (karanlık-mod
   varsayımı eskidi) ve S89-1 sözlüğü iki organda birden canlı.
10. **Doğumlar:** #35 CANARY-REP-FAILURE-1 (tetik ATEŞLENDİ — failed/scored
    6/3→3/6→6/3 SALINIYOR, spesimen özelliği değil; kanaryanın 9 tabanına
    ulaşmasının tek kapısı) · #36 FLOOR-RESYNC-1 (önceden-var divergence:
    machine-knowledge-base 0↔1 + armes 8 keyword; artık doğru adrese akar).

## §3 · S92'NİN ÜÇ SEVKİYATI

`b5da685` CANARY-VERDICT-TRUTH-1 (rev 224 · 14/14 mutasyon) ·
`c2f7dfd` STAGE-CONTEXT-TRUTH-1 (rev 225 · 10/10) ·
`0de5ffd` ROUTING-FLOOR-BACKEND-1 (rev 226 · 8/8, kendi kontrolleriyle).

## §4 · GELECEK OTURUMLARIN BİLMESİ GEREKENLER

- **Sözlük artık 5'li ve YALNIZ `regression` eyler** — M1 dinamik sayımla
  çivili; 6. kelime otomatik kapsanır, ama eyleyen yüklem asla genişlemez.
- **`CLEAN_ARMS_MIN_N = GOLDEN_MIN_REPS × 3 = 9`** kod sabiti; rep-failure
  çözülmeden `clean_both_arms` pratikte ulaşılamaz (scored ~3 salınıyor).
- **`typecheck:api` iki proje AYRI koşulur** — `npx tsc --noEmit` hiçbir şeyi
  derlemez; `&&` kısa devre yapar. Her faz promptu bunu taşır.
- **Çok-şeritli her dalga S92-1 protokolünü GO'da taşır** (reseal + rev SET).
- **`categorySlice.ts` `replay/` altında ama routing ailesindendir** — çit
  yazarken dizin adı yanıltır; S92-2 tam sayım kuralı bunun için.
- Rollout **v3_0** bağlayıcı; payda **36 · açık 33**; ilk Architect masası
  register v96 §8.

<!-- END · CWF-SESSION-GRAPH-KB-v93 -->
