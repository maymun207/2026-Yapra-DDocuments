# KARAR-CI-DIET-2-v1 — tek kelimelik sahip kararı

<!-- S97 · Architect-authored · karar dosyası (faz promptu DEĞİL) -->

## Dert (bugün yaşanan, sayıyla)
Merge başına ~15 dk CI beklemesi × bu dalgada 8-10 bekletilen tur. Kaynak:
7600+ testlik suite'in Node 20 + Node 22'de ÇİFT koşumu, coverage
enstrümantasyonu, ve her fazda iki kez bekleme (PR-head + master).

## Kesilecekler (dördü birlikte tek karar)
1. **Node matrisi:** PR/merge kapısı = yalnız üretim Node sürümü. İkinci
   sürüm GECELİK zamanlanmış koşuya taşınır (uyumluluk sigortası kalır,
   kapı olmaktan çıkar).
2. **Coverage:** gecelik koşuya. Hiçbir merge kapımız coverage yüzdesine
   bağlı değil; enstrümantasyon vergisi kapıdan kalkar.
3. **Tek bekleme:** kapı = PR-head yeşili (S37-2 aynen). Master-sonrası koşu
   DEVAM eder ama bloklamaz; kırmızısı alarm-sınıfı olaydır (merge turunda
   yerel tam suite zaten zorunlu — bugün 4 merge'ün 4'ünde koşuldu).
4. **Yol filtresi:** yalnız `docs/relay/**` + `.agents/**` + `**/*.md`
   değişen push'lar tam suite yerine hızlı sınıf tetikler.

## Dokunulmayanlar
S37-2 (PR-head'de bölünmemiş tam suite TEK hakem) · eval-gate (ürün tezi) ·
tenant-zero · drift · relay-audit.

## Beklenen etki
Merge başına bekleme ~15dk → ~6-8dk; Dalga 5'in merge TRENİ ile birlikte
dalga başına bekletilen tur ~8-10 → ~3-4.

## Uygulama
"CI-DIET-2 evet" dersen: Dalga 5'e tek-şeritlik küçük faz olarak girer
(CI workflow dosyası tekil-kaynak, tek yazar); prompt'u ben keserim.

## SENİN KARARIN (tek kelime): **"CI-DIET-2 evet"** ya da **"hayır"**.
Önerim: evet.
<!-- END · KARAR-CI-DIET-2-v1 -->
