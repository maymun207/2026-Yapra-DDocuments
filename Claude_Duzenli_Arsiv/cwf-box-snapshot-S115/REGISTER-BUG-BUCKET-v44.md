# CWF — BUG BUCKET · v44 (S108 kapanışı)
<!-- 2026-08-19. v43'ü GEÇERSİZ KILAR. Her kalem ADIYLA. Kapanış kanıtla olur. -->

## §1 · S108'DE AÇILAN DEFEKTLER

| Ad | Ölçüm | Durum |
|---|---|---|
| `F-S108-VECTOR-INDEX-TIMEOUT` | cron 504 · 300 sn bütçenin %95'i · armes 223 331 ms tek başına · beş backend `memo=cold` her koşuda · `[Vector] corpusSize` hiç basılmadı | AÇIK · ağır |
| `F-S108-STAGEDRAFT-UNKNOWN-KIND` | `honestbench` + `mount-probe`: `unknown kind '<backend>.tool_annotation'`, `failed=4` her 30 dk | AÇIK |
| `F-S108-RULE24-COLLISION` | `RULES.md:353` = /admin UI evi · `build-test.yml:97` = "RULE-24 gate (no literal NUL)" · Architect talimatı v5_6 §3 = "no NUL" | REPO'DA KAPALI (#297, RULE-40) · **talimat korpusunda AÇIK** |
| `F-S108-LAW-OUTSIDE-HOME` | `ran-floor` yasası yalnız şeridin yerel `MEMORY.md`'sinde yaşıyordu; `docs/laws/` karşılığı yok | AÇIK · landing kartı bekliyor |
| `F-S108-IDENTITY-BY-BUS-INFERENCE` | Dört pencere "en taze kart AG-1'e yazılmış ⇒ AG-1'im" diye kimlik türetti. Bir pencere bunu "DERIVED, not assumed" başlığı altında yaptı | KAPALI — claim ref'i + RULE-42 |
| `F-S108-SINGLE-LENS-GOVERNANCE` | `404` klasik uçtan geldi, ruleset AKTİF'ti. İki uç birbirine kör | KAPALI — iki-mercek yasası |
| `F-S108-QUEUE-ORDER-IGNORED` | 4 saatlik GO, okunmamış üç yeni hüküm dururken koşturuldu; biri kartın harcanmış olduğunu söylüyordu | KAPALI — kuyruk-önce yasası |
| `F-S108-CLASSIFIER-MATCHES-SHAPE` | AG-3: aynı `PUT` bileşikte ret, çıplakta geçti. **KARŞI ÖRNEK:** AG-1'in bileşik `POST /rulesets` geçti | **HİPOTEZ** — yasa değil |
| `F-S108-A23-RECALL-UNIMPLEMENTED` | A23 §9 Step 1 "Recall@k" diyor; `routerAbLens` yalnız `scoreRouterAbCoverage` + `computeRouterAbDivergence` yayınlıyor. Yer gerçeği (`intendedToolCategories`) 66/66 DOLU, tüketici hiç yazılmamış | AÇIK · daraltıldı · S109'da skorer |
| `F-S108-MIRROR-CLOSURE-UNMEASURED` | S107 kapanışı repo md5'ini kutununki sanarak yazdı | KAPALI — ayna emekli |
| `F169` (yeniden tanımlandı) | `runTurn.ts` 258–333 `finally` DOĞRU (write dizisi → `writeDigest` → `forceFlushObservability()` → `res.end()`, hepsi awaited). Delik: **stream-öncesi throw o `finally`'ye hiç girmez**, `chat.ts` 173–186 dış catch'ine düşer ve orada HİÇ flush yok. Aynısı `getAuthContext`, `resolveQuotaPolicy`, `chatQuotas.reserve` | AÇIK · AG-2'nin W1'i |

## §2 · ARCHITECT ÖZ-DÜZELTMELERİ (A-REC) — S108

| Kod | Ne oldu |
|---|---|
| `PB-S108-1` | Sahibe "bu dosyayı kutuya yükle" maddesi yazdım. PLATINUM: manuel iş GEREKİYORSA tasarım yanlış. Doğru cevap maddeyi kaldırmaktı — ayna emekli edildi. |
| `A-REC-S108-1` | "Üç doküman" dedim, ek DÖRTTÜ. Saymadan yazdım. → K1: sayı ancak sayımdan doğar. |
| `A-REC-S108-2` | "Dünkü soru" dedim; soru AYNI SABAHTI ve elimde zaman damgası vardı. → K2: göreli zaman kelimesi yasak, adlandırılmış çapa kullanılır. |
| `A-REC-S108-3` | `relay_inbox`'a `payload` kolonuna yazdım; kolon `body`. Şemayı okumadan yazdım. |
| `A-REC-S108-4` | MERGE-GATE kartına "enable auto-merge on your own PR" yazdım. Korumasız repoda bu "şimdi, incelenmeden, CI uçuşurken birleştir" demek — ve PR #295 tam olarak öyle indi, üstelik başlığında "⛔ DO NOT MERGE" yazarken. Bayrağın anlamını ADINDAN çıkardım, ölçmedim. |
| `A-REC-S108-5` | W3'ü "11 soruyu korpusa kodla" diye yazdım, tenant-zero koruması KOYMADIM. Repo public; kontrol URL'leri (`armes.ardich`, repoda 0 emsal) inecekti. Şeridin dosyayı bulamaması sızıntıyı durdurdu. |
| `A-REC-S108-6` | R4'te "üçüncü ret = harness bütün ayar yazmalarını engelliyor" çıkarımı yazdım. AG-2 ölçümle çürüttü. |
| `A-REC-S108-7` | 13/13 re-run kredisini AG-1'e verdim; iş AG-4'ündü. Bir pencerenin işini başka pencereye atfettim — `REPORT-HEADER-1`'i yazdıktan BİR TUR SONRA. |

## §3 · TAŞINAN (S107'den, hâlâ açık)
`F-S107-LANE-WAKE-MANUAL` (ağır — sahip S108'de ~12 kez "posta" yazdı) · `F-S107-RELAY-ONE-WAY` (yapısal) ·
`F-BW01` rule26 flakiness (kanıt: #296 rule26 FAILURE ile indi, aynı iş #297'de araya hiçbir şey girmeden geçti).

## §4 · KAPANMA KURALI
Bir defekt yalnız ÖLÇÜLEREK kapanır ve kapanış cümlesi ÖLÇÜLEN YÜZEYİ adlandırır.
`F-S108-MIRROR-CLOSURE-UNMEASURED` bu kuralın neden var olduğunun kaydıdır.
<!-- END v44 -->
