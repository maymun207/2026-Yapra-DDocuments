# REGISTER · BUG BUCKET · v31

<!-- REGISTER-BUG-BUCKET-v31 · 2026-08-11 · S93 kapanışı. v30'u supersede
     eder. Append-only: hiçbir kalem silinmez. -->

## KAPANANLAR (S93)

**REPLAY CEVAP DEFTERİ → ✅ KAPANDI@`0d622de`.** Boş şemalı stub + bayt-aynı
argüman hash şartı = stokastik sisteme deterministik sınav. Ölçüm: 400 altın
chunk'ın 282'si (%70,5) sıfır skor, 0 failed/0 error işaretli, jetonun %82'si
(8.04M) boşa; düşen rep skorlananın 1,93×'i yakıyor — fırlatma sınıfı 282/282
jetonluyla ELENDİ. Fix: kayıttan şema türetimi + SAYILAN `servedByName`
isim-yedeği + sebep atfı (failedReps/stubMisses/servedByName/failureNames)
tüm havuz sınırlarından ledger'a; sıfır-skorlu chunk artık `UNSCORED cause=…`
basıyor. **Tanık: 3× ardışık 9/9, by_name 4→2→1.** Yayın kapısı aynı motor —
bedava düzeldi.

**"AGENT RESETLENEMİYOR" → ✅ KAPANDI@`dd561c5` 🔑1/7.** 6 tablo (altıncısı
`semantic_memory` — v1 envanter kaçağı, S93'te yakalandı; kapsam mekanik
`LEARNED_TABLES`) tek adlı satırda; atomik take/wipe/restore; `taskId` çift
anlamlı tek bayrak; panel + TAM CÜMLE onayı çift-katman. **S93-1 ilk kez
uygulandı:** canlı 1.060 satır doğum turu 6/6 bayt-aynı + sahip tarayıcı
tanığı.

**TABAN GERİ KALMIŞTI → ✅ KAPANDI@`f6d6e48`.** armes/machine +7 kelime;
`machine-knowledge-base` kendi anahtarıyla (per-backend tezi canlı diff'te —
düz tabanda 5 araç armes outage'ına sızardı); **G-EXCLUDE**: kapılı kelime
floor'a ASLA yazılmaz, sayıyla raporlanır (`employee` bayt-aynı); yapısal
alan kirliliği sync'i DURDURUR; tenant-zero yeşili iki yönde yanlışlanabilir
kanıtlı.

## YENİ W'LER (S93)

**W-039** — mkb'nin 5 aracı yazma-maruziyetini VARSAYILANDAN alıyor
(annotation yok; armes 97/97 pozitif kanıtlı). Annotation publish borç.

**W-040** — `routeKeywordLayer` tamlık guard'ı armes'e daraltıldı; boşluk
AÇIKÇA assert'li (`['machine-knowledge']`). mkb parity fixture'ı borç.

**W-041** — genişlemiş taban (13 kategori) üretim outage tanığı bekliyor;
hiçbir turn mkb sözlüğünü floor'dan almadı henüz.

## FENCE SİCİLİ (S93 — yeni sınıf)

**F-S93-OPERATOR-REPO-TOUCH — KESİN** (sahip ekranı: Gemini diff paneli
"2 files changed +13 −13"). Operator apply öncesi migration+testi düzenledi
(`WHERE true`), raporlamadı → ADR-002 iki-kapı ihlali → **S93-3 tam-beyan
yasası** her Operator relay'ine gömülü.

**F-S93-APPLIED≠REVIEWED — kayıtlı, zararsız, DÜZELTİLMEZ.** Canlı
wipe/restore gövdeleri `where true` taşır; repo incelenen sürümde; anlamsal
fark SIFIR. Uygulanmış migration dokunulmaz; ilk dokunan faz fırsatçı
yakınsar.

**F-S93-G6-UNDERREPORT** — 3 take (2 sentetik-aktör deneme), 1 raporlu; iki
fazlalık `s93-birth` satırı zararsız tarih, silinmesi #38'in ilk işi.

**PROCESS (Architect sicili, S93):** (1) modelleme hatası — deterministik
sınav × stokastik sistem, alet tasarımı Architect'in; S93-1 yasası bundan.
(2) PLATINUM-BREACH-S93 — onay verilmişken ratifikasyon töreni + yükletme;
oturum içinde düzeltildi (relay = onay deseni). (3) H1 "kalıntı" beklentisi
YANLIŞTI — köken-bazlı karar kuralı yine de doğru sonucu verdi; kural
tasarımı içerik tahminine değil kökene bağlanır.

## DEVREDEN AÇIKLAR (değişmedi)

**W-030 · W-032 · W-033 · W-018 · W-034 · W-035 · W-036 · W-037 · W-038** ·
UI-POLISH-NOTE · Gemini+PII 3. veri noktası · header SHA rozeti bayatlığı.
**BUG:** 005 (proje kapanışı) · 014 (önkoşulsuz) · 015 · 016 · 017 (alet
kuyruğu #7-9, sıra değişmedi). **ARMED:** 010-down · 029 — doğal tetik yok,
nöbet sürüyor.

## ÖLÇÜLEBİLİR HALE GELEN (S93)

- **Rep düşüş SEBEBİ** her satırda: `servedByName` + `failureNames` kanarya
  havuzunda, chunk digest'inde, eval-ci satırında — "düştü ≠ neden düştü"
  ayrımı artık veri.
- **Temiz-ajan görünürlüğü:** `turn_done.payload.cleanAgent.skipped` —
  görevli turn'ün hangi öğrenme kapılarını atladığı ölçülür (normal turn'de
  anahtar YOK — empty≠zero).
- **Öğrenilmiş katman envanteri** tek sabitten sayılır (`LEARNED_TABLES`);
  yeni bellek tablosu kaçağı suite'i kızartır.
- **Kanarya kapasite kısıtı ADLI:** checked-N 6 < taban 9 (cap 3) — #37'nin
  ölçülmüş gerekçesi; hüküm kelimesi bu yüzden kilitli, kusur değil.

<!-- END · REGISTER-BUG-BUCKET-v31 -->
