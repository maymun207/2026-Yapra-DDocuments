# CWF — BUG BUCKET REGISTER · v42 (S106)

<!-- REGISTER-BUG-BUCKET-v42 · 2026-08-18. v41'i GEÇERSİZ KILAR.
     Kalem yalnız CLOSED@evidence ile çıkar. Kusur SAHİPLİDİR: her satır hangi
     elin düşürdüğünü ADIYLA yazar (RULE-25'in özü: doğrulanan taraf kendi
     hakemi olamaz — hakemin kaçırması da kayda geçer). BÜTÜN yazıldı. -->

## §1 · S106'DA AÇILANLAR

| Bug | Sınıf | Fail | Durum |
|---|---|---|---|
| **F-S106-OBS-DELIVERY-SILENT-LOSS** | asılsız değişmez / iki eşit sınır | yazan el kurulum, kaçıran hakem **Architect** | **KAPALI** — merge `d3248a49`. `LANGFUSE_TIMEOUT` set değil → vendor 5 s fallback = `OTEL_FLUSH_TIMEOUT_MS` bayt-bayt aynı; flush kazanınca ret pencere-sonrası düşer (serverless'ta hiç). Fix sırayı düzeltti, sınırı değil |
| **F-S106-DOCVERSION-NO-UNIQUENESS-GATE** | AUDIT-OR-ALARM / dayatmasız değişmez | **Architect** (mimari) | **AÇIK** — iki şerit aynı skaleri tuttu, hiçbir kapı kızarmadı. AG-1 ölçtü: manifest çakışması YALNIZ hash'ler de oynadığı için yakalandı; **skaler tek başına SESSİZCE merge olurdu** (aynı dosya, aynı JSON, metinsel örtüşme yok). Kapanış: `PHASE-SEAL-DERIVE-1` |
| **F-S106-SEAL-SERIALIZATION-CONTENTION** | eşzamanlılık / seri kaynak | **Architect** (mimari) | **AÇIK** — dört şerit tek numara için yarıştı; 280→281→282→283→284 seri yeniden-çapalama vergisi. Aynı kartla kapanır |
| **F-S106-ARCHITECT-TRANSPORT-DRIFT** | kanal / elle taşıma | **Architect** | **AÇIK/ELİM** — md5 kapısı kartı REDDETTİ (uzun base64'te bir paragraf kaydı; sıfır satır düştü). Sınıf: uzun base64'te hata GÖRÜNMEZ. Elim: kartlar kısa tutulur, kapı asla atlanmaz. *`F-S105-ARCHITECT-INGEST-CHANNEL-FAULT` ile aynı kanal sınıfı* |
| **F-S106-OWNER-STEP-WITHOUT-SURFACE** | PLATINUM / sahibe olmayan yüzey | **Architect** | **AÇIK/ELİM** — sahibe panelde bulunmayan bir düğme tarif edildi (`armes-new` retired ama `enabled=true`; kart yok). Zararsız (MCP Mirror `lifecycle=retired`'ı dışlıyor) ama kayıt şart |
| **F-S106-LANE-PERMISSION-SCOPE-INCOMPLETE** | boot / eksik yetki kapsamı | **Architect** | **AÇIK** — S106'da **dört kez** ısırdı (git merge / git push ×2 / checkout). Elim: boot şablonuna dört git izni açılışta (`checkout --detach`, `merge`, `push`, `worktree`) |
| **F-S106-ARMES-NO-REVERSE-SHIFT-QUERY** | tedarikçi sözleşmesi | **ARDIC/ARMES** | **AÇIK/DIŞ** — `getEmployeeShiftsBetweenDate` ve `getEmployeeShiftBetween` ikisi de `employeeId` ZORUNLU; "hat+vardiya → personel listesi" ters yönü YOK. Hülya'ya iletildi |
| **F-S106-SHIFT-VOCAB-GAP** | tedarikçi sözleşmesi / sözlük | **ARDIC/ARMES** | **AÇIK/DIŞ** — enum `SHIFT_24_08 / 08_16 / 16_24` vs saha dili "4-12 vardiyası". Eşleme yok |
| **F-S106-CONSTITUTION-MIRROR-STALE** | ayna / türev bayatlığı | **Architect** | **AÇIK** — kutudaki `CONSTITUTION.md` aynası ile `docs/laws/` arasında md5 farkı. Preflight ritüeli var, onarım yapılmadı |
| **A-REC-S106-1** | oturum hijyeni | **Architect** | **KAPALI@sahip-uyarısı** — kuyruk boşaldığı anda kapanışı önermek yerine sıradaki kartı ateşlemeye yöneldi; oturum tazeliği Architect'in PROAKTİF sorumluluğudur. Sahip yakaladı, Architect derhal geri aldı |
| **A-REC-S106-2** | ölçmeden iddia | **Architect** | **KAPALI@AG-2** — kart *"reseal koşturarak revizyonu COMPUTE et"* diyordu; AG-2 ölçtü: **reseal skaleri ARTIRMAZ**, yalnız hash'leri hesaplar. Mekanizma okunmadan iddia edildi |
| **A-REC-S106-3** | yanlış çerçeve | **Architect** | **KAPALI@AG-4** — *"üç organ birbirini yalanlıyor"* çerçevesi ÇÜRÜTÜLDÜ: üç organ üç ayrı soruya cevap veriyor, çelişki yok. Kurulu kaynaktan gösterildi |
| **A-REC-S106-4** | yanlış çerçeve | **Architect** | **KAPALI@sahip-hükmü** — zone kabulü *tenant-zero kararı* diye çerçevelendi; yanlıştı. tenant-zero **repoyu** korur, Qdrant repo değil, korpus zaten `glossary_term` (tenant verisi) kabul ediyor |

## §2 · S105'TEN TAŞINANLAR

| Bug | Durum |
|---|---|
| **F-S105-ARCHITECT-INGEST-CHANNEL-FAULT** | **KAPALI** — zehirli satır kalır, okuyucular bağışık (`archiveIntegrity.ts`, merge `e32fc83f`). Silme imkânsızdı: tetikler koşulsuz, tetiğin kendi yorumu istisnayı reddediyor (*"just this one field" is how append-only dies*). Silmek kanal kusurunun kanıtını yok ederdi |
| **F-S105-PARITY-IS-A-DISTRIBUTION** | **AÇIK** — 26.7/20.0/26.7. Kapanış: tekrarlı ölçüm protokolü (→ register #78) |
| **F-S105-SEAL-TABS-BEYOND-EDIT** | **AÇIK/İZLEME** — S106'da yeni gözlem yok; SEAL-DERIVE'ın R1'i bu soruyu da yanıtlamalı |
| **F-S105-TENANT-ZERO-COUNT-DELTA** | **AÇIK/DÜŞÜK** — kapatılmadan kapı sayısı alıntılanmaz |
| **PLATINUM-BREACH-S105-1** | **AÇIK** — yasa adayı L-ADAY-8 |

## §3 · DERSLER (S106)

1. **Şeritler dört kez kendi aleyhlerine rapor verdi.** AG-2 kendi ilk R2 taramasının büyük-küçük harf duyarsız kendini dışladığını buldu (sonuç değişmedi, *"arama iddia edildiğinden dardı"*); AG-3 yeşil 9346 test varken kendi admission iddiasının geçersizleştiğini **birleşmiş testi okuyarak** gördü; AG-4 kendi raporundaki bakir md5'in gönderilen dosyanınki olmadığını düzeltti; AG-1 çakışmanın sessizce geçebileceğini ölçtü. **Bu sistemin bağışıklığıdır; kayıt bunu ödüllendirir.**
2. **Architect dört kez düzeltildi** (A-REC-S106-1..4) ve üçü şeritlerden geldi. Hakem hakemlenebilir olmalı.
3. **Borulu çıkış kodu bugün DÖRT kez yalan söyledi** — typecheck tail CLEAN, `git merge` exit 0 while CONFLICTED (×2), merge pipe 0. Tek gün, dört bağımsız gözlem: bu artık flake değil, sınıf.
4. **md5 kapısı Architect'i yakaladı.** Kapılar yalnız şeritler için değildir.
5. **Kanarya sınırları dört kez ölçüldü** (188/194/204/217 s / 600 s) — sınırlama merge'i kanıtlandı, tavan rahat, kesme yok.

<!-- END · REGISTER-BUG-BUCKET-v42 -->
