# REGISTER-BUG-BUCKET · v28

<!-- REGISTER-BUG-BUCKET-v28 · 2026-08-09 · S89 kapanışı · v27'yi geçersiz kılar.
     Kural değişmedi: kalem yalnız KANITLA kapanır. -->

## SAYIM (v28)
Numaralı 37 kalem: **✅ 30 kapalı · 🔶 5 açık (005 · 014 · 015 · 016 · 017) ·
🛡 2 ARMED (010-down · 029) · GRİ SIFIR.** S89 yeni numara açmadı; F-serisi ve W-serisi hareket etti.

## S89 HAREKETLERİ
**F-S89-1 — ✅ CLOSED@evidence (aynı gün doğdu-kapandı).** PLANNER-0'ın ilk üretim
tanığı (06:55Z, `8126b98c`): D1 kapı plana-uyanı cezalandırdı · D2 zırh "doğalgaz"ı
imha etti (sayı var, kelime yok) · D3 rutin tohumu taban disiplinini yerinden etti ·
D4 delilsiz hüküm (→ KAPI-YETKİ YASASI doğdu). Kök arkeolojisi: METRIC_IDS 28 Haz
`e3ab250` tapu-anahtarı; 20 Tem `fb9e958` IR-1 KARANLIK fazında zırha ödünç; frame
güç kazandıkça yeniden yargılanmadı. **Kapanış kanıtı:** FIX-1 v2 merge `5a052dc`
(beyan + yetki + disiplin-rutinle + tam-yelpaze; suite +1/+42, tümü D-5 çift yön)
+ **üretim tanığı 11:26Z** (`metricsSurface:["doğalgaz tüketimi"]` · `gate:active` ·
`replans:1` yalnız hazırlık adımında → W-032 · 4 arama yelpazesi · `identifier_alias`
onarımı · 5 hat veri · funnel 5/5 · `answerUnbacked:false`).

**W-028 → ✅ CLOSED-BY-RECON@S89.** Zincir: canlı ayna `execute_sql.tags=["mutate"],
destructiveHint:true` → `deriveReachClass`'ta FOREIGN_SURFACE_TAGS İLK kontrol
(gatewayDisposition.ts:63/132) → `hasDomainYield` gateway-içi yalnız `reach='data'`
sayar (landingSignals.ts:240). `af5dbe5f`'te 1 satır dönmesine rağmen domainYield=0
**politika-doğru**; yarış yok, kod açılmadı. Yan bulgu: o turun 10 tekrar çağrısının
hepsi foreign_surface ham-SQL'di — planner'ın chart-önce şablonu yapısal caydırıcı.

**W-029 → ✅ · W-031 → ✅** merge `8c8b172`; kanıt: bağımsız sayım 21 test /
4 mutasyon-kızarması; chatParser:262 per-CLAIM yasası bayt-teyitli.

**F-S88-1 → ✅** sahip-göz 05:53. Üç kalıntısı: W-029 ✅ · W-031 ✅ · **W-030 AÇIK**
(prompt şeridi; AG-2 S89'da bağımsız yeniden gözledi).

## YENİ W'LER
**W-032** (S89) — kapı v0, delil-kelimesi taşımayan hazırlık adımlarında (resolve_time_range)
tek dürtme üretiyor. Yetki yasası ihlal edilmedi; hassasiyet sınıfı. Ev: tezgâh incelemesi;
inceltme adayları: plan-adımı-farkındalı delil · ilk-adım muafiyeti. Faz açılmaz.
**W-033** (S89) — tezgâh `drops.metrics` çipi kırmızı; sayaç anlamı fix'le değişti
("imha"→"resmî-id-değil"), renk/etiket yanıltıcı. Ev: UI-POLISH ailesi.

## SİCİL GÜNCELLEMELERİ
**BUG-015 (INSTRUMENT):** W-026 ×5 (BENCH şeridinde çalışma-ağacı örneği). Yeni sicil
kanıtı: BENCH'in sadık-ikiz mutasyonu — 23 davranış testi yeşilken yalnız aynı-modül
kanıtı kızardı; "modeli değil organı test et" yasasının ölçülmüş hâli.
**BUG-016 (PROCESS):** S89 örneği: Architect'in GO'sunda kendi-ön-adımına-bağımlı
doğrulama (kilit) + kapının masum-durum probunun atlanması — ikisi de aynı gün
yakalandı ve ders satırı oldu (register v93 §2/2-3).
**Kanarya (CANARY-POWER-1 refakati):** 8× ardışık `verdict:null` (son ikisi S89
merge'lerinde, like-for-like). Enstrüman borcu büyüyor; #6'da yeri sabit.
**ARMED nöbet:** 010-down · 029 — S89'da doğal tetik görülmedi, nöbet sürüyor.

<!-- END · REGISTER-BUG-BUCKET-v28 -->
