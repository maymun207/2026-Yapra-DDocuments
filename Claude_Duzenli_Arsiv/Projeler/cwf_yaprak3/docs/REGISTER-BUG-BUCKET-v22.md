# REGISTER-BUG-BUCKET v22 — S83 kapanışı (2026-08-07 ~01:45 +03)

<!-- v21'i geçersiz kılar. Sıra sahip-ratife; yeniden müzakere edilmez. -->

## §BUG.1 · BU OTURUM KAPANANLAR
- **BUG-024 ✅ KAPANDI** — canlı okuma: 5 çubuk ekranda + m³ KAYNAKTAN
  (display_name "Toplam Sarfiyat (M³)") + provenance'ta get_chart_data
  (tur `ea360766`, sahip ekran görüntüsü + Architect log okuması).
- **BUG-031 ✅ KAPANDI** — CHART-CANDIDATE-1 merged `ce2e244` + P1 (`d94bcfc3`
  grafik 85 çizildi) + P2 (`910675a7` tuzak kelime "sarfiyatı"→94 kabul
  edilmedi, kökle yeniden arama ölçüldü). Sessiz-94 üç örnekte de ölü.
- **BUG-032 → MERGED-UNPROVEN** — SUCCESS-ONLY-RECALL-1 merged `5277103e`.
  Canlı: [MemoryWrite] outcome=unproven ilk damga (`ea360766`) · offered=3
  pozitif kontrol · DB 146 epizod = 145 legacy(anahtar yok, sunulur) + 1
  damgalı + 0 failed. §0 deneyi ARMED-NOT-RUN (pencere 21:05–21:25Z üretimde
  BOŞ — Architect ölçtü). KAPANIŞ: ilk gerçek başarısız tur doğal yaşandığında
  P1 (aynı sohbette tekrar-sor→başarı) + P2 (failed satır yazıldı, sunulmadı)
  Architect okur. Zorlanmaz (kasıtlı arıza = FAULT-SWITCH-0'ın işi).

## §BUG.2 · BU OTURUM AÇILANLAR
- **BUG-033 · GitHub Actions push-tetiklerinde ÖLÜ.** Üç master push'u run
  doğurmadı; elle dispatch **#471 YEŞİL** `ce2e244`'te (5 iş, eval-canary +
  rule26 flake'siz) → motor/izin/workflow sağlam, şüpheli TEK katman webhook
  push-teslimi. DOĞAL SONDA: FIX-1 merge push'u — run doğarsa geçici-incident
  kaydıyla kapanır; doğmazsa adres Settings→Webhooks→recent deliveries.
  Yönetişim sapması kayıtlı+iyileşti: 3 merge yerel CI-eşdeğeriyle girdi,
  #471 ce2e244'ü geriye dönük harfiyen kanıtladı.
- **BUG-034 · kural-kaynaklı çizim tutarsızlığı + yanlış yokluk iddiası.**
  ce2e244'te N=3: 2/3 çizmedi. Mekanizma (a) `910675a7`: kurallar tam
  izlendi, 85 bulundu, veri çekildi, İNİŞ MADDESİ YOK → çizilmedi.
  (b) `74597fcc`: kök denemesi atlandı ("Granit Glazür"→0, "sarfiyatı"→94,
  kök hiç yok), get_chart_data hiç çağrılmadı, cevap "grafik
  bulunmamaktadır / BI sistemimizde mevcut değildir" — kural-1'in yasak
  maddesinin birebir ihlali, AYNI sohbette 85 üç dakika önce çizilmişken
  (conv=2 bellek o epizodu sunarken). AĞIRLAŞTIRICI: bu tur outcome
  yüklemine YANLIŞ-NEGATİF (sinyal yok → unproven yazıldı, geri
  çağrılabilir zehir tohumu). ÇARE: FIX-1 (aşağıda) + W-019.
  KAPANIŞ ÖLÇÜSÜ: republish SONRASI yeni N=3, hedef 3/3 (çizim ya da
  isim-isim soru, SIFIR yokluk-iddiası).

## §BUG.3 · FIX-1 DURUMU (S83 kapanış anı — AÇIK UÇ)
PHASE-CHART-CANDIDATE-1-FIX-1 inşa+kanıt+push `2cc554b0` (RULE-25 ✓ roster
17, üç ibare bayt-mevcut, +5 test → 5481, rev 202). GO verildi (>> BLOCK <<
formatında). **NOT-YET-LIVE (S80-3):** reconciler yokluk-tohumlar, metin
değişikliğini YENİDEN YAYINLAMAZ (`selfSeedReconciler.ts:255` kind_id::key
atlar, payload karşılaştırmaz) — kod doğru, üretim republish'e dek OKUMAZ.
ÖNCÜL HATASI #24 (Architect): "[Gate] publish ×3 satırı yokluk-tohumlamayı
kanıtlar, değişiklik-republish'ini değil." BEKLEYEN İKİ KARAR:
(1) sahip merge teyidi + BUG-033 sonda sonucu; (2) republish sahibi —
(a) sahip bu gece `resetSupersetGateway.ts` (script başlığı "OWNER's run")
YA DA (b) S84 Operator relay'i. N=3 YALNIZ republish sonrası.

## §BUG.4 · ESKİ AÇIKLAR (değişmedi)
BUG-006 · 009 · 010 · 011 · 012 · 015 · 016 · 017 · 028 · 029 (hüküm verili:
dil turun kendi sorusundan, toggle fallback) · BUG-005 (proje kapanışı).
BUG-025/026: HEALTH-TRUTH canlı okuma borçlu — Architect işi, S84 açılışı.

## §BUG.5 · İŞLEYEN SIRA (S84 için)
| # | İş | Not |
|---|---|---|
| 0a | FIX-1 republish + [Gate] v2 okuma + yeni N=3 | BUG-034 kapanışı; sahip tercihi (a)/(b) |
| 0b | BUG-033 hükmü | FIX-1 merge push sondasından |
| 1 | HEALTH-TRUTH canlı okuma | BUG-025/026; Architect kendisi |
| 2 | SIGNAL-SOURCE-1 **v2** | AG şeridi; v1 adıyla İPTAL; güncel tabana; chartId alias notu; stageTools artık şerit-tutsağı değil; "yerel yarım iş varsa at" satırı |
| 3+ | v21 sırası aynen: BUG-012 kapısı · PROBE-PARITY+AUTO-SYNC · FAULT-SWITCH-0 · 006+009 · 2F.1 PROCEDURE-RECALL · 2F.2 SEMANTIC-MEMORY · 2F.3 STEP-EFFICIENCY (referans çifti: `910675a7` calls=8 vs `d94bcfc3` calls=5 conv=1) · 015+016 · 017 · 2F.4 PLANNER-0 · 2E.2/3/4 · HONESTBENCH-RUN-1 · BUG-005 SON |

## §W · İZLEME/ALET KALEMLERİ (yeni bu oturum)
- **W-016** SynthTraffic tavan gürültüsü: 200K/200K'da her dakika level=error
  → log hacmi tam-metin sorguları zaman aşımına sokuyor.
- **W-017** publishAgentParam AG şeridinde TAM prod env istiyor (AG-1 §0 için
  çekti, sildi) → scoped-key'li yayın yolu alet borcu (ADR-002 gerilimi).
- **W-018** Gateway-tarafı MEKANİK kök-tekrarı: arama 0/1 sonuç dönerse geçit
  eksiz varyantı KENDİSİ dener — kural-2'yi tavsiyeden koda çevirir.
- **W-019** Yanlış yokluk-iddiası için deterministik arka-durdurucu: turun
  kendi araç defteri timeseries adayın döndüğünü bilirken "yok" cümlesi
  çelişki olarak yakalanır (prose-render-parity'nin ikizi). `74597fcc` kanıt.
- **W-020** AG-temp izin altyapısı: defaultMode=auto + hook byte-aynı (12/12
  sonda, çift yön) · allowlist 91→51 · ask 6. R1 UYGULANACAK: AG env'inden
  SUPABASE_ACCESS_TOKEN SİLİNİR (keychain değil; kanıt printenv=0 + hook
  db-push ask hâlâ ateşler). R2: secret söküldükten sonra taşınabilir
  kısımlar takım settings.json'a göçer. Sahip auto-onay diyaloğunu kendisi
  tıklar; oturum yeniden başlatılır.

<!-- END v22 -->
