# REGISTER-BUG-BUCKET · v32 — S94 kapanışı

<!-- v31'i geçersiz kılar. Sadece AÇIK/İZLENEN kusur ve tuzaklar; kapananlar
     KB v95'te tarihçe olarak yaşar. -->

## AÇIK

| Ad | Sınıf | Öz | Aday çözüm |
|---|---|---|---|
| F-S94-VOICEGATE-BLIND | bekçi körlüğü | voiceGate yalnız stage registry + TweakTab'daki tek dizgiyi tarar; HİÇBİR admin panelini okumaz. "none (floor)" bu delikten geçti. Genişletmek çok dosyada mevcut metni kırmızılar → kendi fazı. | Admin metin-katmanı kapısı fazı (aşağıdaki üçlüyle birlikte) |
| F-S94-TRUST-COPY-STUTTER | metin kalitesi | Data Authority'de durum-2 satırında iki cümle ayraçsız yapışık ("no authority granted yet This backend publishes…"). | Aynı faz |
| F-S94-HEALTH-SYSTEM-ROW | yanlış soru | health-analytics filtresiz `backends` okur; Sağlık bandında `system` satırı kalıcı "ölçülmedi". `isDataBackend` oraya da uygulanmalı; kardeş yüzey taraması #4 raporu §(e)'de. | Küçük tekil faz ya da metin-katmanı fazına binme |
| SWEEP-BARE-DELETE-1 (#41) | ölçülmemiş alan | Snapshot organı DIŞI SECURITY DEFINER gövdelerinde çıplak tam-tablo DELETE var mı bilinmiyor; sınıf kapısı yalnız organı koruyor. safeupdate sınıfı "uygulanır-susur, koşunca ölür". | Yürüyüş #41 (aktif kalem, bucket'ta çapraz kayıt) |

## İZLENEN / NÖBET

| Ad | Not |
|---|---|
| Kanarya kelimesi | `underpowered` cap 3'te KİLİTLİ (checked 6<9) — BEKLENEN; yeniden teşhis yasak; mühür #37. Üç ardışık master 9/9-0 kanıt zincirinde. |
| F-OBS-FLUSH-OK-LIE | `langfuse=ok` = promise-resolve, teslim değil. Aylık fence penceresiyle (aşağıda) birleşince kör nokta büyür. |
| OBS-HOST-HEALTH-1 | Langfuse host sağlığı hiçbir iç izleme yüzeyinde yok. Aylık bütçe fence'i ~20'sinde ateşlenir (~10 gün). |
| GitHub App token formatı | ghs_, ~520 karakter — uzunluk varsayan entegrasyonlar kırılabilir. Bizde bilinen varsayım yok; nöbet notu. |
| Supabase CLI sürümü | Operator v2.108.0, güncel v2.113.0 — davranış farkı gözlenmedi; acele yok, fırsatçı güncelleme. |
| Ritüel artıkları | s94-ritual(🔒)/s94-ritual-2/pre-restore-… panelde; purge kapısı var, sahip istediğinde temizler. 🔒 s94-ritual'da bilinçli kalabilir (ilk dosya-yedeğin DB-içi eşi). |

## KAPANAN TUZAKLARIN TEK-SATIR HAFIZASI (tam metin KB v95)

safeupdate/ortam-göreli anlam → S94-1 YASA · information_schema boş kümesi →
S94-2 YASA · FK sansüsü yanlış iddiası → pg_catalog kuralı · recent-ops çift
körlük → sözlükten türetildi (#39) · mutation reporter tuzağı → muhafız şart ·
vercel autolink → AG-CLI kuralı · S82-5 kopya-ad → shared/ tip evi (#4).

<!-- END bucket v32 -->
