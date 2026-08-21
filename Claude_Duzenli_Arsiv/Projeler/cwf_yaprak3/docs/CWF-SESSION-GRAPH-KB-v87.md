# CWF-SESSION-GRAPH-KB · v87 — S86 düğümü eklendi (2026-08-08)

<!-- v86'yı geçersiz kılar. Önceki düğümler (S1–S85) v86'da aynen; burada S86. -->

## S86 (2026-08-08) — "Çit kamera önünde ateşledi" günü
**Zemin:** açılış `e98edb84` → kapanış **`b4f96eeceebd1d9867cfe6f3053fe20b8db46821`** ·
rev 208→**211** · suite 490/5642 → **492/5719** (CI-hakemli) · migrations 67 sabit ·
Operator gün boyu SOĞUK · üretim `dpl_7Qy9i1…` @ `43d15f38`.

**4 merge (first-parent):** `b2d6c55` rescue (42 günlük supabase-ro MCP yarım
düzeltmesi — oturumun İLK işi) → `fd9f49b` FAULT-SWITCH-0 → `20276dd` RENDER-TIME-1
→ `43d15f38` FENCE-WITNESS-1. Çift-şerit eşzamanlılığı canlıda ilk kez: RENDER
merge'inde taban İKİ KEZ kaydı, S81-1 prosedürüyle temiz; manifest üç-hash hikâyesi
(iki dal 209'u farklı hash'le mühürledi → birleşik ağaç 321 dosya → rev 210).

**Ana olaylar:**
1. **İlk doğal kullanıcı seansı** (5 tur, 18:01–18:09Z, trace'ler 58f1a8b3…6ebeab2e):
   dürüstlük katmanı 3 vanadan ateşledi (G3 damgası modeli "dönüştürdüm" yalanında
   yakaladı · viz-invalid dürüst kutu · fails-loud öğreten hata) AMA kullanıcı 4 turda
   okunabilir tabloyu ALAMADI → KAFES teşhisi (markdown yasak + FROM_TOOL formatsız +
   elle epoch yasak + araç yok) + iki kod boşluğu: TABLE_TIME_FIELDS 3-ad allowlist'i
   (F-S86-1) ve parser'ın prose-anma yutması (F-S86-5, satır-çapasızlık).
2. **RENDER-TIME-1** aynı gün tasarlandı-inşa edildi-tanıklandı: sonek-predicate
   (grain kapısı AYRI korunarak — AG-2'nin yük taşıyan yakalayışı) + iki-site çapası +
   `last_N_days`. Tanık turu `3e0e63b0`: tek turda okunabilir tablo, `last_3_days` ilk
   denemede, sıfır FaultSwitch gürültüsü (LAW-1 üretim tanığı).
3. **FAULT-SWITCH-0 + FENCE-WITNESS-1 zinciri:** alet (5 yasa, 2 nokta) → C4'te üçüncü
   engel bulundu (**BUG-036**: preview anahtarı 42 gündür ölü — TÜM preview'lar
   governed-floored yaşıyormuş) → sahip W1 onarımı (ilk deneme "42d ago" bulgusuyla
   yakalandı: MEVCUDİYET≠GEÇERLİLİK) → tanık **04:37:20Z**: üçlü kanıt, satır
   `04c636b9-a3c5-4c74-b537-14675264fc89`. **BUG-006+009+036 kapandı.** BUG-009'un
   üçüncü-durumu: `healthReadFailed` + `BACKEND_HEALTH_GUARD` satırı + çift-dilli çip;
   fail-open POLİTİKA olarak korunup pinlendi.
4. **Kanarya iki hastalık:** tavan 60/60 (hesaplandı; CAP=240 sahip ilacı, koşu
   doğrulandı) → açılınca **CANARY-POWER-1** göründü (3 ardışık underpowered, 9/9→3
   skorlu) → #6 şartnamesine katlandı. **S86-2 yasası** doğdu.
5. **Danışman notu (CS329A) işlendi, sahip "1-4 onaylı":** R1 CLOSED-BY-RECON
   (gateway onarımı governed protokolde ZATEN var — QUERY-CANDIDATE-1 doğmadı) ·
   R2 ders satırı (compute değil discovery — MA-RERUN-2) · R3 PARK ROUTER-DISTILL-1
   (ölçülü tetik) · R4 multi-agent verifier-side. → plan **v2_2** basıldı, sahip yükledi.
6. **Canlı mühürler:** BUG-012 (3 üretim nesli, MEVCUT-ve-BOŞ) · BUG-028 (kimlik
   denklemi `queryCount=Σkanıt+failures`).

**Doğan yasalar/kurallar:** S86-1 (viz-sözleşme model-çıktısıyla sondalanır) ·
S86-2 (yeşil≠koşmuş; warning satırı okunur) · sahip-iletişim kuralı (aksiyon maddeleri
human-readable adım-adım — kalıcı bellekte).

**Şerit karnesi:** AG-1 dört ayrı görevde (rescue ayakta-GO'yu kendi açtı · alet fazı ·
iki C4 STOP-AND-REPORT'u — ikisi de doğru · tanık koşusu GET-vs-POST yakalayışıyla);
AG-2 RENDER'ı ikinci-merge yükümlülükleriyle temiz taşıdı (index-disiplini M-3,
temiz-worktree merceği M-6). Relay dokunuşları bütçe içinde; D-9 sensör düzeni
(git+Vercel+Supabase) gün boyu yapıştırmasız çalıştı — paylaşım-linki el değişimi
RELAY-BUS-1'in gerekçe defterine eklendi.

<!-- END v87 -->
