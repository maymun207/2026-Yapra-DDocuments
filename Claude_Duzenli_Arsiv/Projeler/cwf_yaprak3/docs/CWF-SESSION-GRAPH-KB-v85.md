# CWF-SESSION-GRAPH-KB v85 — S84 işlenmiş
<!-- v84'ü geçersiz kılar. S37-1 sürümleme. -->

## S84 ÖZET GRAFİĞİ (2026-08-07, tek gün, üç merge + iki republish)
Boot(RULE-25, 4/4 sayı) → BUG-033 hükmü (dış arıza; web sensörüyle kesildi;
Settings→Webhooks adresi İPTAL — Actions push tetiği kullanıcı-webhook'u
değildir) → Republish-1 (Operator v2; relay v1 STOP'u DOĞRUYDU: status filtresi
yoktu → ÖNCÜL #25; **orphan keşfi**: call-tool-request-wrapper 18. yayınlı
satır) → FIX-1 CANLI → N=3 #1: 1/3 → **BUG-035 doğdu** (search_tools = ARAÇ
indeksi; S1 "doğalgaz sarfiyatı" araması get_dataset_info döndürüyordu —
katman karışıklığı) → sahip T4/T5 turları (T5 baskı altında tam doğru
epistemik: list_datasets→74, list_charts→80/85, dürüst sınır; **dataset 74 =
günlük ham veri VAR, küre yolu YOK** → ADHOC-VIZ-1 adayı) → sahip felsefe
oturumu → **DÖRT-DURUM YASASI ratife** (tek aday→çiz+kapsam · çok→isim+id ·
küre-yok-ham-var→en-yakını çiz+sınır+dataset söyle · hiç→numaralandırma
kanıtlı kapsamlı yokluk) → PHASE-CHART-LANDING-MECH-1 (G1 katman-öğretimi ·
G2 yokluk-numaralandırma-şartı · G3 fetched-not-drawn · G4 kural v3; merge
30a396d4; canary İLK kez bu kodu örttü) → Republish-2 (v3 CANLI) → N=3 v2
**3/3** → BUG-034+035 KAPANDI → HEALTH-TRUTH canlı okuma (BUG-025/026 kapalı)
→ çift şerit: FOLD (4af2eeb8) ∥ SIGNAL-SOURCE (da8a0d5, rev 205) →
COLLISION-1 build (ba05bb7, S85'e devir) → sahip CI-maliyet krizi →
CI-DIET-1 reçetesi → kapanış artefaktları.

## YENİ YASALAR/DERSLER
- **S84-1**: canary 900 sn bütçesi içinde master'a takip push yok.
- **ÖNCÜL #25**: governance tablosu append-only TARİH tutar; beklenti
  status-filtresiz yazılmaz.
- **ÖNCÜL #26**: guard GÖZLENEN desene yazılır (AG merge+rapor iki-commit
  deseni), hatırlanan şekle değil.
- **ÖNCÜL #27**: kapsam-notu grounding'e bağlı; 0-araçlı sohbet-reddi şablonu
  tetiklemez — sonda tasarımında hesaba katılır.
- **SONDA EKONOMİSİ**: bilerek tetiklenemeyen bozuk-sınıf yüzeyler ARMED
  ailesi; sahip dokunuşu kontrived tetiklere harcanmaz; ilk doğal örneği
  Architect telemetriden okur.
- **RESEAL GEREKÇESİ CANLI**: birleşik içeriğin hash'i iki şeridin hiçbirine
  ait değil (75050fda ≠ 9bac2335 ≠ a90414ac); elle birleştirme hiç var
  olmamış ağacın hash'ini yazar → doc-drift yalan üstünde yeşile döner.
- **CHANGELOG yapısal çakışması**: aynı-gün çift merge'de kaçınılmaz; iki
  giriş tam tutulur, geç-merge üstte.
- **CANARY YEŞİLİ ≠ KALİTE**: verdict:null/underpowered olabilir; ödenen borç
  "koşma yükümlülüğü"dür; kalite hükmü bankalanmaz.

## AYAK-TABANCALARI (footguns, S84'te üç şeritçe yaşandı)
vitest 4'te `--reporter=basic` YOK (harness matched=0 guard'ı olmadan sahte
yeşil) · `git merge -F -` stdin OKUMAZ (`git commit -F -` okur — alışkanlık
yanlış aktarır) · `gh run watch --exit-status` başarısız run'da 0 dönebilir ·
ham NUL baytı dosyayı git'te binary moda çevirip grep'i sessizce boşaltır ·
`tsc | head` exit'i head'inkidir · zsh unquoted `$SUITES` word-split yapmaz →
vitest 0 dosya eşler, tüm mutasyonlar "hayatta" görünür (literal-path kontrolü
şart) · PostgREST 1000-satır sessiz limiti (sayfalama/SQL-agregasyon) ·
sandbox tam-takım vitest ortam-sınıfı asılabilir (191. dosya donması) —
hedefli koşu + dürüst beyan.

## MİMARİ GERÇEKLER (S84'te bayt-kanıtlı)
- `search_tools` = iç-ARAÇ indeksi; grafik/dataset adları `call_tool(list_*)`
  arkasında. Kök kuralı İÇERİK aramalarına uygulanır (v3 metni).
- `domain_rules` append-only; canlı küme = status='published' filtresi.
- `resetToReference` yalnız referans anahtarlarını yürütür; referans-dışı
  yayınlı satıra dokunmaz; tek RESET audit + per-publish [Gate] satırları;
  provider invalidate script sürecinde kalır (prod lambda TTL ~5 dk ayrı).
- Yerel araç mount'u stage-7 loop'unun SONUNDA → COLLISION-1 rezervasyonla
  öne aldı (davranış bayt-aynı, kayıp sesli). stagesModel.ts:90 toolNames'i
  closure tarafından türetir.
- Outcome damgaları: `absenceWithoutEnumeration` / `fetchedNotDrawn` canlı;
  N=3 v2'de üçü doğru-SESSİZ; dünkü 5×kör-unproven serisiyle kontrast.
- Telemetri intake `language` alanı = TOGGLE kaydı (adıyla muaf,
  stagesGovernance.ts:40) — dedektör kanıtı değil.

## S85'E DEVREDEN
COLLISION RULE-25 (dal ba05bb7; GO öncesi backend_tools yerel-ad okuması) ·
CI-DIET-1 ACİL #1 · LEDGER-COMPLETE-1 · PROBE-PARITY+AUTO-SYNC (AG-1) ·
nöbetler bootstrap §F'te tam liste.
