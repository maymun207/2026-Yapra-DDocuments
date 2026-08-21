# CWF-SESSION-GRAPH-KB · v95 — S94 düğümü eklendi

<!-- v94'ü geçersiz kılar. Grafiğin S93 ve öncesi düğümleri v94'teki hâliyle
     geçerlidir; bu dosya S94 düğümünü ve kenarlarını ekler. -->

## S94 DÜĞÜMÜ (2026-08-11 gece → 08-12 sabah)

**Dört merge + iki FIX + bir hotfix + bir yangın + bir ritüel.**

1. **#4 TRUST-PANEL-PER-BACKEND-1** (`2c3208b`→merge `342dc81`, rev 230).
   readOk ölçüm ekseni source otorite ekseninin YANINA (F156 korunarak);
   düz `allowedMetrics` öldü; yanıt tipi `shared/`a taşındı (iki tsconfig'in
   kesişimi — S82-5 sınıfı yapısal kapandı); system hattı konsol+yazma
   kapılarından gerçek sebeple çıkarıldı; AG voiceGate'in admin panellerine
   kör olduğunu kanıtladı (Architect'in prompt iddiası YANLIŞTI).
   Sahip tanıklığı: 4 satır, armes durum-1, üçü durum-2.

2. **#38 SNAPSHOT-LIFECYCLE-1** (`a968131`→merge `2d9cb72`, rev 231;
   migration `20260811160000` Operator-uygulandı). Teşhis: isim yazdıran
   onay, üç satır aynı ada cevap verirken hedefini tanıyamaz → benzersizlik
   silmeyle AYNI migration'da. Çakışma insert-hakem döngüsüyle çözülür (-2,
   -3) ve atanan ad geri döner. Silme FOR UPDATE + korumalı-satır reddi +
   kendi SQLSTATE'i; denetim satırı silinenin manifestosunu taşır; hiçbir şey
   cascade etmez. Purge: cron YOK; onaylanan sayı silmeyi YÖNLENDİRMEZ,
   KONTROL eder. Doğum kanıtı: kurulum tarihinin ilk gerçek panel-silmeleri
   (sahip, 06:24/06:25Z).

3. **#39 SNAPSHOT-PORTABILITY-1** (`0d5bbb8`+FIX-1 `7494544`→merge `f7af666`,
   rev 232; migration `20260812120000`). cwf-learn/1 zarfı; export = S93
   duvarının TASARLANMIŞ tek deliği, denetimi SQL-içi aynı işlemde; import
   dosyayı sıradan görüntü satırı olarak indirir (auto-suffix paylaşılan
   helper); seed boş-hedef-şart + sınıf haritası (episodes/semantic ASLA —
   TASK_NAMESPACED; entity_registry ASLA — yeniden keşif, ADR-009; authority
   bayrak+ayrı cümle); SAFETY-TAKE: restore/seed önce mevcut hâli park eder,
   denetim satırı safety_snapshot_id taşır. **FIX-1 hikâyesi:** RULE-25 canlı
   pg_constraint sayımı AG'nin "sıfır FK" iddiasını yanlışladı → beş FK →
   `router_proposals.resolved_by` nakli patlatırdı → sınırda-sıyırma
   (sayılı; sayı okunamazsa seed kendini reddeder) + DDL-türevi yapısal
   sansüs testi. Kök neden S94-2 yasası oldu.

4. **SAFEUPDATE YANGINI + FIX-2** (`2de70d8`→merge `ed527ec`, rev 233;
   migration `20260812160000`). İlk canlı restore "DELETE requires a WHERE
   clause" ile öldü — atomik geri sarım, sıfır kayıp, katman boş kaldı.
   Kök: `authenticator` rolü safeupdate preload eder; SECURITY DEFINER bile
   oturum kütüphanesinden kaçamaz; migration'lar postgres'ten uygulanır ve
   susar. S93'ün "~13 satır where true sapması" UYARLAMAYMIŞ; Architect onu
   "anlamsal eş" kaydıyla temizletmeyi EMRETTİ (A-REC-S94-2) → kusur.
   FIX-2: iki gövde (wipe de aynı çıplak metni taşıyordu — AG türetti,
   FIX2-D1) 6+6 `where true` ile yeniden basıldı; tek kullanımlık kabinde
   safeupdate SİLAHLANDIRILIP önce muhafızın ateşlediği kanıtlandı, kusur
   satır-70'te birebir yeniden üretildi, düzeltme geçti. Yapısal kapı:
   etkin gövdelerde çıplak tam-tablo DELETE = kırmızı.
   Boşluk penceresi ~50 dk; keşif senkronu bu sürede 800 varlığı KENDİ
   yeniden kurdu (R1'in istenmeden gelen kanıtı).

5. **RİTÜEL (doğum kanıtları + sahibin uçtan uca testi, tek oturuş):**
   take `s94-ritual`(1083) → export (denetimli, dosya sahibin diskinde) →
   İLK WIPE (1081+2) → [yangın+düzeltme] → restore (07:03, safety `49c48651`
   = pre-restore görüntüsü 800 satır) → import `s94-ritual-2` (suffix canlı).
   Kapanış ölçümü: 6/6 bayt-aynılık — beşi silme-öncesi parmak iziyle,
   entity_registry görüntü-içi diziyle (baseline farkı take-öncesi keşif
   güncellemesiydi). Denetim zinciri dört halka, öksüz satır sıfır.

**Yol üstü küçükler:** stray Vercel projesi (`merge-clone`) AG'nin `vercel ls`
kazasıyla doğdu, silindi (F-S94-VERCEL-AUTOLINK kuralı) · AG'nin
"cwf-demo" isim karışıklığı düzeltildi · Recent-ops iki-katman körlüğü
(#39'da kapandı) · mutation harness'ın kendi kendini yakalaması (vitest 4
reporter) · Operator iki apply'da S93-3'e harfiyen uydu.

## KENARLAR

S93-1(doğum kanıtı) ─proved-by→ S94 yangını (kusur provada yakalandı) ·
F-S93(where-true) ─inverted-into→ S94-1 yasası · ADR-009 ─live-proof→
48-dk kendi-kendine keşif · ADR-010 ─future→ SEED-PROBATION (park) ·
S82-5(kopya-ad) ─structurally-closed-by→ shared/ tip evi (#4) ·
empty≠zero ─new-instances→ information_schema boş kümesi (S94-2) +
strippedResolverIdentity ölçülü-sıfırı.

## S95'E DEVREDENLER

#40 (taşıyıcı projede) → #41 → retentionMax sahip kararı → #6/#7-9 dalgası.
Kanarya izlenir. Langfuse fence penceresi ~20'sinde. Kurulum #2 tetiği:
nakil kanıtının ikinci yarısı + TENANT ailesi yeniden girişi.

<!-- END KB v95 -->
