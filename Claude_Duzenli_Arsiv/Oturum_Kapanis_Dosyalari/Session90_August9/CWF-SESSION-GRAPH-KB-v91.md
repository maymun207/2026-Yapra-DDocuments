# CWF — SESSION GRAPH KB · v91

<!-- CWF-SESSION-GRAPH-KB-v91 · 2026-08-09 · S90. v90'ı supersede eder. -->

## S90 — bir oturumda: bir denetim, iki merge, bir anayasa düzeltmesi

### 1 · Açılış (RULE-25 PASS, tek sapma bayta indi)
Boot zemini birebir tuttu; tek sapma `system.plan_template` **0 → 5 satır**
çıkmasıydı. Kaynak okundu: `selfSeedReconciler.ts:113` → `PLAN_TEMPLATE_SEEDS`
→ `planner.ts:184` `PLAN_TEMPLATE_KEYS`. Yani PLANNER-0 deploy'undan sonra
reconciler ABSENCE-ONLY self-seed'ini koşmuştu — **tasarlanmış davranış**,
09:37 TR'de beş satır yayınlanmış. Sapma değil, sözün tutulması.

### 2 · GATE-JURISDICTION-AUDIT-1 (S90'ın ilk işi, Architect)
Gemideki dokuz dayatıcı/dürtücü organ kaynak-okumasıyla üç sütuna dizildi
(kanunu · delili · delilsizken davranışı). Sonuç: **Madde-3 ihlali sıfır** —
S89'un yakaladığı tek örneği FIX-1 kapatmıştı. Tek bulgu Madde-4 açığı:
BurstGuard, landing G2/G3 ve grounding'de *"yetkim yoktu"* ile *"baktım,
temizdi"* aynı bayta katlanıyordu. Denetimin ürünü bir tablo değil, bir faz oldu.

### 3 · Çift dalga, ve dalganın kendisinin öğrettiği
İki şerit paralel koştu ve **ikisi de brief'imdeki aynı hatayı bağımsız
bulup escalate etti**: "rev 220 stands" beklentisi, `checkDocDrift` içerik
hash'lediği için mapped alana giren hiçbir fazda tutamaz.

- **AG-2 · GATE-SILENCE-VISIBILITY-1** (`5d92d81`): dört organ, sıfır davranış
  değişikliği (bayt-özdeşlik pinleriyle *test edilmiş*, iddia edilmemiş).
  BurstGuard'ın durumu **dört üye + null** oldu — çünkü AG-2 `ai@6.0.211`'in
  step döngüsünü OKUDU: araç çağırmayan bir düz-yazı turu freni hiç
  danışmıyor, yani *hiç sorulmadı* ile *soruldu ama kördü* aynı kelimeyi
  paylaşamaz. Mutasyon süpürmesi kendi kaynak yorumundan birini de yalanladı
  ve düzeltti.
- **AG-1 · ROUTE-DERIVE-1** (`02a8d33`): armes kilidi öldü; saf çekirdek +
  tek uygulayıcı; türetim **sync'in kendisine** bindi (buton + on-connect +
  30 dk cron), çünkü "katalog sync bitti" yalnız orada koşulsuz doğru.
  Makine aktörü `selfSeedReconciler`'ın kendi çözümü (FK dürüstlüğü).

**S90-1 doğdu:** AG-1 birleşik ağaçta **tek-skaler tuzağın ateşlendiğini**
ölçtü — iki şerit de rev 221 basmıştı; git anlaşan iki tarafta çatışma
vermez, sessizce birleştirir ve bir revizyon buharlaşır, üstelik `doc-drift`
yeşil kalır çünkü *hash'ler* doğru reseal olur. Yakalanma sebebi tek: GO'nun
sayıyı adıyla yazması.

### 4 · Tezgâh turu (sahip + Architect, canlı üretim)
S89'da inşa edilen TEZGÂH ilk kez uçtan uca kullanıldı. A→G yedi deney:
zırhın 150 kelimelik saha koşusu (3 vocab-kept / **147 beyan-captured / 0
discarded**), kapının üç hükmü (on-frame · off-frame · **no-jurisdiction**),
ve kapanışta beyanın kapıya yetki kazandırması. **İki bulgu tezgâhtan çıktı:**
(a) beyan kanalı dışarıdan enjekte edilemez — yüzey zırhın ÇIKTISIDIR, yani
bir beyan ancak kullanıcının sözünden zırhın içinde doğar (K1'in bütünlüğü);
(b) kapı yüzeydeki öbeği fold'layıp sözcüklere bölüyor, tam-parça aramıyor —
`dogalgaz` + `tuketimi` iki ayrı kanıt çipi. Her iki "sapma" da benim
talimat hatamdı; tezgâh organı değil, beni düzeltti.
Ayrıca otomasyon katmanı ölçüldü: tezgâhın kendi dört test dosyası **47/47**
(Architect taze klonda koştu) — ve S89'un aynı-modül mutasyon kanıtı,
"kopya değil sevk edilen bayt" iddiasının sayısal teminatı.

### 5 · Anayasa düzeltmesi — S90'ın asıl olayı
Sahip Data Authority panelinde üç kelimenin nereden girildiğini sordu.
Architect'in ilk cevabı yasayı doğru, **sınıflandırmayı yanlış** uyguladı:
"kelimeler kodda yaşar, tasarım budur". Sahip reddetti ve gerekçeyi tek
cümlede verdi: *"Bu sistem bir sigorta şirketinde kullanılsa OEE'nin anlamı
ne? Bankacılıkta FIRE'ın ne anlamı var?"*

Doğru ayrım kayda geçti: **mekanizma** (tapu defteri) yapıdır → kodda;
**kelimeler ve takma adlar** backend alan-verisidir → governed satırda.
Recon, hükmün boyutunu sayıyla gösterdi: kelimeler tek sabitte değil,
`METRIC_ALIASES`'la birlikte **iki dosyada ve ~15 okuma noktasında**
(`fire→scrap/ıskarta`, `throughput→debi/k4` gibi Türkçe seramik verisi dahil).
Emsal zaten gemideydi (GATEWAY_RULES 16-kod/18-DB; plan şablonları
self-seed) — desen icat edilmedi, uygulandı.
Bağlayıcı taşıyıcı: **`cwf-design-METRIC-REGISTRY-DATA-1-v1`**.
Aynı gün ratife edilen kardeşi: **METRIC-VOCAB-DISCOVERY-1** — sözlük
klavyeyle değil, self-learning ile governed kapıdan büyür.

### 6 · Kanıt okumaları (S63-1)
- **AG-2:** üretim turu 18:44 → `burstGuard="watched"`, `landing={g2:"no-claim",
  g3:"clean"}`, `planner={gate:active, plan:true, steps:11, replans:1}`. ✅
  (Yarım: grounding span attr'ı Langfuse'ta okunmadı → S91 ilk iş.)
  *Yan ders:* `turn_done` bir **`message`** satırıdır (`payload.kind`); ilk
  sorgum bu yüzden boş döndü — **şema bilgisizliği "yokluk" gibi görünür.**
- **AG-1:** cron tick'leri 18:00 ve 18:31 → dört backend'de `trigger=post-sync`;
  armes `categoryDraftsStaged=4` → sonraki tick `0` (**idempotence canlı**);
  DB'de dört `armes.tool_category` taslağı; bu yoldan sıfır publish. ✅
  Ve pencere açılır açılmaz ilk dürüst görüntüsünü verdi: superset/honestbench
  annotation kind'ları yok → `failed=4`, adıyla raporlandı (W-034).

### 7 · Oturumun şekli
Denetim → denetimden doğan faz → çift dalga → iki merge → canlı kanıt →
ve arada, sahibin tek sorusuyla açılan bir anayasa düzeltmesi. S90'ın
karakteristiği: **her düzeltme bir üst yasayı güçlendirerek geldi** — kapı
susuşu empty≠zero'nun kapılara uygulanması, ray-türetimi backend-identity-is-
DATA'nın uygulanması, metric-registry ise ikisinin de altındaki
yapı-vs-veri ayrımının doğru yerine oturtulması.

<!-- END · CWF-SESSION-GRAPH-KB-v91 -->
