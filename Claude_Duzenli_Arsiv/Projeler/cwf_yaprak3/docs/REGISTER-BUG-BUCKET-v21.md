# REGISTER — BUG BUCKET · v21

<!-- REGISTER-BUG-BUCKET-v21 · 2026-08-06 · S82 kapanışı · Architect: Claude (Opus 5).
     v20'yi amend eder. İŞLEYEN KUYRUK §BUG.5'tir. Kalem SİLİNMEZ; biten işe ✅+kanıt,
     yeni iş adıyla eklenir. Bu sürüm register v86'ya VERBATIM kopyalanır (sahip hükmü
     S82 — D-003 böyle düşer). -->

## POZİTİF KONTROL — dört sayı
> **13 açık bug · 8 kapalı(bu oturum) · 13 izleme · 0 canlı borç (D-003 discharged)**
> Bu sayılar dosyayla uyuşmuyorsa oturum yanlış boot etmiştir.

---

## §BUG.1 · AÇIK BUGLAR (13)

### Merge'li, canlı okuma borçlu (5)
- **BUG-023** — nesir çizilmeyen grafiği ilan ediyor. `PROSE-RENDER-PARITY-1` merge
  (`61bc83e`). Canlı: `31f2276d`'de dürüst panel + "(no chart was drawn)" göründü ✅
  ama nesir hâlâ "Bu grafik göstermektedir" diyor — panel-nesir paritesi canlı okuma
  borçlu.
- **BUG-024** — kaynağın söylemediği birim. `UNIT-TRUTH-1` merge (`e0990df`). m³ kanıtı
  `4802570d` grafiğinde göründü (kaynak `display_name: "Toplam Sarfiyat (M³)"`) — tam
  kapanış satırı canlı UNIT-TRUTH okumasıyla.
- **BUG-025** — ayar/sync sağlıklı backend'e `down` yazıyor. HEALTH-TRUTH-1 merge (S81).
  Canlı okuma borçlu.
- **BUG-026** — sağlık sebebi kaydedilip gösterilmiyor. HEALTH-TRUTH-1 merge (S81).
  Canlı okuma borçlu.
- **BUG-027** — kapsam reddi kendini yalanlayan çipin yanında. `PROSE-RENDER-PARITY-1`
  merge (`61bc83e`). Canlı okuma borçlu.

### AG-1'de, askıda (2)
- **BUG-028** — başlık sayacı kendi kanıt listesiyle çelişiyor (13/14, 8/9 üretimde
  iki kez ölçüldü). `PHASE-SIGNAL-SOURCE-1` AG-1'de. Düzeltme: üç yerel closure
  (`stageTools:1194/1214/1219`) deftere kaydeder, başlık `ledger.calls`'tan türer.
  Önceki "ledger'a taşı 13==13" düzeltmesi REDDEDİLDİ (iki yüzey eşit ama ikisi de
  yanlış); kaynak düzeltmesi şart.
- **BUG-029** — TR soruya EN sistem mesajı. `PHASE-SIGNAL-SOURCE-1` AG-1'de. Zincir:
  yan panel düğmesi → `currentLang`(default 'en') → `ctx.language`. Hüküm: sistem
  cümlelerinin dili **turun kendi sorusundan** türer; toggle FALLBACK olur.

### El değmemiş (6)
- **BUG-006** — çit ateşlemesi log YOKLUĞUNDAN çıkarılıyor. Aleti `FAULT-SWITCH-0`.
  Kanıt PREVIEW deployment'ta (sahip hükmü b) — üretim penceresi hiçbir şey eklemez.
- **BUG-009** — başarısız withholding okuması = "hiçbir şey saklanmadı". `FAULT-SWITCH-0`
  çıktısıyla.
- **BUG-010** — probe düğmesi canlılığı kanıtlıyor, kaydetmiyor. `PROBE-PARITY-1`.
- **BUG-011** — on-connect sağlık yazımı geç/eksik/yanlış atıflı. `AUTO-SYNC-ON-SAVE-1`.
- **BUG-012** — flat backend başka backend'in araç adını sessizce gasp ediyor. Kayıt
  kapısı. HONESTBENCH-RUN-1 M3b'den önce şart.
- **BUG-014** — credential yolu hiç çalıştırılmadı, hiçbir backend'de. **ALETİ YOK**
  (credential isteyen backend gerekiyor — adlı yokluk). G6 "test edilmedi" notuyla
  kapandı; bu bug açık kalır.
- **BUG-015** — üç test aleti hiçbir şey ölçmeden başarı raporladı. Alet+süreç kapıları.
- **BUG-016** — 23 öncül hatası, tek şekil. Aynı faz.
- **BUG-017** — frame yabancı varlığı ARMES taksonomisine zorluyor. Lens fazı, kanıt
  yolu (ii) sahip hükümlü.
- **BUG-005** — müşteri verisi 3. taraf log deposuna verbatim. **SAHİP HÜKMÜ: EN SON**
  ("her şey bittiğinde, belki bir ay sonra, CWF is done dediğimiz anda"). AST census hazır.

*(Not: yukarıda 6 "el değmemiş" başlık + BUG-014/015/016/017/005 = mantıksal olarak
13 açık; 028/029 AG-1'de sayılır. Toplam açık = 13.)*

---

## §BUG.2 · BU OTURUM KAPANANLAR (8) — canlı kanıtla

- **BUG-020** ✅ — ajan müşterinin BI sunucusunu devirdi. Fren üç şafta bindi:
  `gateway.maxConcurrentCallsPerBackend=3` (KUYRUKLAR, asla reddetmez) ·
  `turn.maxTokensPerTurn=300000` (totalTokens, cached-dahil, AMENDMENT §B) ·
  `turn.maxCallsPerToolPerTurn=30` (arka duvar). **Canlı:** `27f4ec93` — semafor 4 çağrıyı
  sıraya aldı, çip iki dilde "hiçbir sonuç atılmadı, yavaşlatıldı" dedi. **Artık kapandı**
  (sahip hükmü: birim kanıt yeter — 3'e karşı 7, mutasyon-kanıtlı, S66-1 kontrollü).
  Merge `a9649019` + FIX-1 `114894a8`.
- **BUG-021** ✅ — gateway iç-araç şemalarını kaybediyor (32 örnek, 7 değil — üretimden
  sayıldı). İki yarı: 9 governed `tool_doc` overlay yayında (Operator, `9b1f2b7`) +
  deterministik repair (stage-7, kapalı 3-kural harita). **Canlı:** repair üç varyantı da
  yakaladı — `chart_id`(`7075a301`), `id`(`ce354e56`), `chartId` camelCase. Merge
  `a24271d4`.
- **BUG-023/027** — merge `61bc83e` (yukarı bak; parite canlı borçlu ama fazın kendisi
  kapandı).
- **BUG-024** — merge `e0990df`.
- **BUG-025/026** — merge (S81 HEALTH-TRUTH).
- **BUG-030** ✅ — gateway sonucu viz katmanına görünmez (üç kopuk halka: scope filtresi
  `effectiveToolName`, `argsContainMatch` derin karşılaştırma, `findRecordGroups`
  columns+data çözümü). **Canlı:** beş çubuk ekranda (`4802570d` + panelli mesajın
  yeniden çizimi). Merge `c8018e7`.

---

## §BUG.3 · YENİ KALEMLER (S82'de doğdu)

- **BUG-031 · İKİ GRAFİK TUZAĞI / aday seçimi yok.** Superset'te iki benzer grafik:
  ID **85** (`echarts_timeseries_bar`, 5 satır, hat başına) vs ID **94**
  (`big_number_total`, 1 satır, tek toplam). Arama düz metin, kök bulmaz: `"sarfiyat"`→85
  (grafik), `"sarfiyatı"`→94 (tek sayı), `"tüketimi"`→0. Model doğru grafiği bulup
  bulamaması **arama kelimesine** bağlı, ve `viz_type` bilgisi elimizde olmasına rağmen
  hiçbir kural adayı şekle göre elemiyor. Alet: `CHART-CANDIDATE-1` — (1) grafik
  istendiğinde `big_number_total` tek başına yetmez, (2) tek-aday şüphesi → kökle tekrar
  ara, (3) belirsizse kullanıcıya isim isim sor.
- **BUG-032 · CONV-POISONING (bu oturumun EN BÜYÜK bulgusu).** Sistem kendi
  başarısızlıklarıyla kendini zehirliyor. **8/8 desen:** `conv=0`→başarı
  (`27f4ec93·8b2cb9bc·4802570d`), `conv≥1`→başarısızlık
  (`31f2276d·0c8632b3·ce354e56·b875b00d`). Bir tur "çizemiyorum" dediğinde o cevap iki
  kanaldan geri besleniyor: hafıza (`conv=N` epizod) + `historyWindowN=6` penceresi. Yeni
  sohbet zehiri kaldırıyor, aynı soru aynı veriyle grafiği veriyor. Literatür uyarısı #5
  (başarısız yörünge oyun kitabına değil incelemeye gider) birebir ihlal — `[MemoryWrite]`
  HER turda ateşliyor. Alet: **`SUCCESS-ONLY-RECALL-1`** — kanıtlanmış cevap üretmeyen
  tur ne yazılır ne geri çağrılır (yazma yolunda bayrak + okuma yolunda filtre).
  **Taşıyıcı ayrımı (hafıza vs geçmiş penceresi) log'dan yapılamadı; ayıran deney:
  `historyWindowN` 6→0 yayınla, aynı sohbette tekrar sor — faz §0 bu okumayla açılır.**

---

## §BUG.4 · BORÇLAR
- **D-003** ✅ DISCHARGED — §BUG artık register'a verbatim kopyalanıyor (bu sürümle).

---

## §BUG.5 · İŞLEYEN KUYRUK — sahip-ratife, sırayla

| # | Faz | Kapatır | Not |
|---|---|---|---|
| **1** | **`SUCCESS-ONLY-RECALL-1`** | BUG-032 | **YENİ 1. SIRA** — conv-poisoning. Küçük, deterministik, iki dokunuş. §0 = historyWindowN 6→0 deneyi |
| **2** | **`CHART-CANDIDATE-1`** | BUG-031 | aday seçim kuralları |
| 3 | `SIGNAL-SOURCE-1` | BUG-028+029 | AG-1'de askıda + `chartId` alias notu |
| 4 | `UNIT-TRUTH` canlı okuma | BUG-024 kapanış | + 023/027 parite |
| 5 | HEALTH-TRUTH canlı okuma | BUG-025/026 kapanış | |
| 6 | BUG-012 kayıt kapısı | BUG-012 | HONESTBENCH M3b önkoşulu |
| 7 | `PROBE-PARITY-1`+`AUTO-SYNC-ON-SAVE-1` | BUG-010/011 | |
| 8 | `FAULT-SWITCH-0` (rollout 2.3b) | — (alet) | env-armed, reads-only, deterministic, fails-loud. Kanıt PREVIEW |
| 9 | BUG-006+009 | BUG-006/009 | 8'in çıktısı |
| 10 | `PROCEDURE-RECALL-1` (2F.1) | — | başarılı turdan rutin; SUCCESS-ONLY sonrası anlamlı |
| 11 | `SEMANTIC-MEMORY-1` (2F.2) | — | **sahip tetiği çekti** — soru→artefakt olgusu, tam kalem |
| 12 | `STEP-EFFICIENCY-1` (2F.3) | — | [TurnEfficiency] → ölçüm panosu |
| 13 | 015+016 alet/süreç kapıları | BUG-015/016 | |
| 14 | BUG-017 lens | BUG-017 | |
| 15 | `PLANNER-0` (2F.4) | — | plan-first + re-plan gate; 10-11'i tüketir |
| … | 2E.2/2E.3/2E.4 · HONESTBENCH-RUN-1 | — | rollout 2E |
| SON | BUG-005 | BUG-005 | sahip: proje kapanışı |

**Ratife kısıtlar korunur:** FAULT-SWITCH-0 → 006+009 bitişik · BUG-012 önce · BUG-005 son.

---

## §BUG.6 · İZLEME LİSTESİ (13)
W-001…W-014 v20'den taşınır (ikisi PROMOTED mezar taşı) + **W-015** (silent-finish tavsiye
metni sabit yazılı — `90f1f5ed`'de şans eseri isabet etti; küçük girdili `error` turunda
"büyük olabilir" yazarsa promosyon) + **W-013 güncelleme** (arama davranışı `90f1f5ed`'de
düzeldi — `list_charts(search)` tek çağrı; ama BUG-031 gösterdi ki arama kelimesi hâlâ
oynak).
