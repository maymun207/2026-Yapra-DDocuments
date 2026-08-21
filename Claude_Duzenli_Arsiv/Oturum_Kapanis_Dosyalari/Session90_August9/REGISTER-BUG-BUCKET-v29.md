# REGISTER · BUG BUCKET · v29

<!-- REGISTER-BUG-BUCKET-v29 · 2026-08-09 · S90 kapanışı. v28'i supersede eder.
     Append-only: hiçbir kalem silinmez. -->

## KAPANANLAR (S90)
**GATE-JURISDICTION-AUDIT-1 bulgusu → ✅ CLOSED@`5d92d81`.** Üç organda
Madde-4 (susuş görünürlüğü) açığı denetimle bulundu, aynı gün faz oldu ve
merge edildi. Üretim tanığı 18:44: `burstGuard="watched"`,
`landing={g2:"no-claim", g3:"clean"}`. **Madde-3 (delilsiz hüküm) ihlali
gemide SIFIR** — denetimin asıl sonucu bu.

**Güvenli-sıfır (confident zero) · stage-drafts → ✅ CLOSED@`02a8d33`.**
`stageOrUpdateDraft`'ın boolean'ı "yapılacak bir şey yoktu" ile "yazma
REDDEDİLDİ"yi aynı `false`'a katlıyordu. Üç değerli yapıldı; **ve üretimde
hemen ateşlendi** (aşağıda W-034).

## YENİ W'LER (S90)
**W-034** ⚠ **ÜRETİM TANIKLI** — `<backend>.tool_annotation` kind ailesi
armes dışında MİNT EDİLMEMİŞ. Cron logu (18:00, 18:31): superset ve
honestbench için dörder taslak her tick'te `unknown kind` ile reddediliyor
(`failed=4`). **Bu bir regresyon değil, yeni açılan pencerenin ilk dürüst
görüntüsü** — ROUTE-DERIVE-1 öncesi aynı durum sessizce `0 staged` diye
raporlanırdı. Adlı iş: `TOOL-ANNOTATION-KIND-MINT-1` (register v94 §3).
Ev: `rule_kinds` seed domain'i / `kindsOnly`; `kinds.test.ts` pini yerinde.

**W-035** — `evalGate.ts:160-164` routing bloğu hâlâ armes-only (literal
`'armes'` hata mesajı dahil). ROUTE-DERIVE-1 GO'sunda ADIYLA kabul edildi,
bugün erişilemez (armes-dışı hiçbir şey yayınlamıyor). Ev: 2E.3 / yayın-yolu.

## DEVREDEN AÇIKLAR (değişmedi)
**W-030** (bölge-başlık niyeti, prompt şeridi) · **W-032** (kapı v0
hassasiyeti — S90 üretim turunda yine görüldü: `replans:1`, kelime taşımayan
`resolve_time_range` adımı; **yetki ihlali DEĞİL**, tezgâh incelemesi, faz
açılmaz) · **W-033** (tezgâh `drops.metrics` çipi kırmızı ama anlam
"resmî-id-değil" — sahip S90'da bunu canlı gördü ve yanıltıcılığı teyit
edildi; UI-POLISH) · **W-018** · UI-POLISH-NOTE · Gemini+PII 3. veri noktası.

**BUG:** 005 (proje kapanışı) · 014 (önkoşulsuz) · 015 · 016 · 017.
**BUG-016 (PROCESS) yeni sicil:** S90'da Architect iki brief'e birden
"rev 220 stands" yazdı; iki şerit bunu birbirinden bağımsız olarak mekanik
imkânsız kanıtladı. Ders → S90-2.
**ARMED:** 010-down · 029 — S90'da doğal tetik görülmedi, nöbet sürüyor.

## KANARYA DEFTERİ
**9× ardışık `verdict: null`.** S90'da iki koşu daha; sonuncusu
`scoredReps 5` — şimdiye kadarki en yüksek (seri 4·2·3·2·5), hash'ler
like-for-like ve yine karar yok. Bu artık gürültü değil, **enstrümanın
gücünün yetmediğinin dokuz gözlemli kanıtı**. CANARY-POWER-1'in yeri
değişmedi (#6), gerekçesi her dalgada ağırlaşıyor.

## ÖLÇÜLEBİLİR HALE GELEN
**no-jurisdiction üretim ORANI** — GATE-SILENCE-VISIBILITY-1 ile
`turn_done.burstGuard` ve `landing.g2/g3` alanları canlı; telemetri birikince
tek SQL okumasıyla çıkar. S91+ için hazır ölçüm.

<!-- END · REGISTER-BUG-BUCKET-v29 -->
