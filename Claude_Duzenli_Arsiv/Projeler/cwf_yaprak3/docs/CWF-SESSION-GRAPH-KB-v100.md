# CWF — SESSION GRAPH KB · v100 (S99 kapanışı)

<!-- CWF-SESSION-GRAPH-KB-v100 · 2026-08-14. v99'u geçersiz kılar.
     S99: Dalga 6 + kuyruğu — 10 kalem kapandı, 3 doğdu, kapı 4/7. -->

## §1 · S99 YASALARI (dokuz — hepsi olaydan doğdu)

| Yasa | İçerik | Doğuran olay |
|---|---|---|
| **S99-1** | AG şeridinin yazma-DB tutamağı TEK ifade sınıfı çalıştırır: kendi `lane_addr`'inin `consumed_at`'i. Yoklama salt-okunur rolle. | AG-2'nin damga-yetkisi bulgusu |
| **S99-2** | Teslimat kanıtı GİT'tir (`phase/*` + rapor). Damga nezaket makbuzu: izin varsa vurulur, yoksa sessiz atlanır, ret ASLA dolaşılmaz. Damgasız ≠ teslim edilmemiş. | İki şerit iki farklı şekilde damgalayamadı |
| **S99-3** | İnşadaki şeride posta KESMEDİR ve turu öldürür. Posta yalnız faz sınırında okunur; bloklayıcı olmayan kart çalışan şeride atılmaz. | AG-1 19:46'da iki kart damgalayıp durdu |
| **S99-4** | Yetkili işi olan şerit MAIL-WAIT'e giremez; nöbet yalnız boş şerit içindir. | AG-1 merge'i yapıp nöbete hapsoldu |
| **S99-5** | Negatif-yalnız falsifier paketi çalışan çiti atıl çitten AYIRAMAZ. Her çit, izin verdiği tek şeyi çalıştıran POZİTİF kontrolle gönderilir. Metin/apply kapıları atıl grant'ı göremez; yalnız gerçek Postgres'e davranışsal sonda görür. | `relay_lane` ilk taslağı: 6 ret geçti, damga sessizce 0 satır |
| **S99-6** | Kapı işini reddederse İŞİ değiştir. Güvenlik eşleştiricisini genişletmek yalnız adlandırılmış Architect tadili + iki yönlü masum-vaka sondasıyla. Üç ayrı `revoke` ≠ tek ifade: yalnız-PUBLIC revoke diğerlerini açık bırakır. | AG-4 `migrationFnLockdown`'a iki kez uydu |
| **S99-7** | Başarısız olamayan doğrulama, doğrulama değildir — testlere uygulanan yasa ALETLERE de uygulanır. Yazan her yardımcı, önkoşulu yazımdan önce, etkiyi yazımdan sonra iddia eder. | Koşulsuz `ok` basan CHANGELOG betiği; `gh pr create` sessiz askıda kaldı |
| **S99-8** | Entegrasyon fiili MERGE-from-master-into-branch'tir; rebase+force-push YASAK (S96-1 doğal sonucu: paylaşılan ref'te force olmaz). GO'lardaki "rebase" kelimesi ölmüştür. | AG-4'ün açıklanmış sapması ratifiye |
| **S99-9** | Kapı verdikti EXIT-CODE ile yakalanır: `vitest \| tail` non-zero'yu yutar ve zincir push'a ilerler. `pipefail`/açık EXIT yakalama push kararından önce zorunlu. Kırmızı çıktı DOSYAYA yakalanmadan re-run yapılmaz — yeşile dönen flake'in kimliği kaybolur. | AG-4 kırmızı süitte push etti, kendisi yakaladı, satır kayboldu |

**Ortak kalıp (dört görülme):** negatif sinyalin YOKLUĞU pozitif okundu —
atıl rol (6 ret=yeşil) · sıfır CI koşusu (=hepsi geçti) · koşulsuz `ok`
(=yazıldı) · pipe'lı exit (=süit yeşil). Tek çare: şeyin kendisini çalıştıran
kontrol. (Karşı örnek: AG-2 sıfır digest'i "trafik yokluğu" diye DOĞRU okudu.)

## §2 · SERTLEŞTİRİLMİŞ CI KURALI (uçuştaki tüm GO'ları değiştirir)
1. `head_sha` ile sorgula, asla check ADIYLA değil.
2. **Koşu VAR OLMALI** — `total_count: 0` BAŞARISIZ kontroldür. Teşhis uzayı:
   PR conflicted · dal itilmemiş · **PR henüz açılmamış** (workflow `push` yalnız
   `master`'da; feature dalı koşuyu ancak PR ile alır) · master docs-only push
   (`paths-ignore: docs/**, .agents/**` — beklenen sıfır).
3. `completed` + `conclusion: success`. 4. Gerisi: bekle, asla merge etme.

## §3 · A-REC-S99 SERİSİ (sekiz Architect hatası — hepsini şerit ölçerek yakaladı)
| # | Hata | Yakalayan |
|---|---|---|
| 1 | `consumed_at`'i bekleme sensörü ilan etmek (şeritler tetikleyemezken) | AG-2+AG-4 |
| 2 | Çalışan şeride bloklayıcı olmayan kart atmak | AG-1 durması |
| 3 | "İKİ yetkili makine çağırıcısı" sayımı (canlıda ≥9; sınıf adlandırılır, sayı değil) | Vercel cron sayımı |
| 4 | GO'lar kendi gramerini kırdı (TAIL-ANCHOR yok, CLAIMS yok, tripwire dolu) — İKİNCİ görülme = yetkilendirme katmanında örüntü | AG-3 |
| 5 | Kanıt çitinde bayat pozisyon — çitler artık okuma anının UTC damgasını taşır | AG-4 |
| 6 | Var olmayan sayım-UI'sine kriter yazmak (belgeden spec, canlı okumasız) | AG-3 |
| 7 | Operator çiti kendi içinde çelişikti ("repo teması yok" + "db push tek yol") → salt-okunur checkout kuralı doğdu | Operator ilk koşusu |
| 8 | `evalGate:164` literal teşhisi: sebep yanlıştı (çağrı `isArmes` kolunun ARKASINDA; zarar backend adı vermeyen ÜÇ kardeşte) | AG-4 |
**Meta:** oturumun asıl bulgusu — en az doğrulanan bileşen Architect'ti; S99
yönetişimi içe çevirdi (gramer kartlarıma, sensör bus'ıma, damga çitlerime).

## §4 · S99'DA DOĞAN ORGANLAR
- **`relay_lane` rolü** (#53): NOLOGIN/NOINHERIT, tam iki sütun ayrıcalığı
  (`SELECT/id`, `UPDATE/consumed_at`), RLS'li UPDATE'in kendi WHERE'i için
  SELECT politikası ŞART (ilk taslağın atıllık sebebi). Telde DEĞİL —
  `authenticator` grant'ı bilinçli alınmadı, testle pinli.
- **`persistence_class_catalog()`** (#54): SECURITY DEFINER, `pg_catalog`
  tabanlı; 54/54, drift 0/0; panel bandı "could not read"→GOOD döndü; sahip
  gözüyle doğrulandı. bench-reset 503'ü artık dünya değiştiği için çözülebilir.
- **A2A purple agent** (#18 🔑): `a2a/server.ts`, kendi `A2A_TRIGGER_SECRET`'i
  (dış-tetikleyici SINIFI: eval-ci + A2A; platform-cron sınıfı ayrı), kendi
  harcama çiti, FK aktör (`A2A_ACTOR_USER_ID` gerçek `auth.users` satırı —
  boot reddi), `runTurn.ts` davranış-koruyan çıkarımı (sıfır test beklentisi
  düzenlemesi), tek `streamText` sitesi korundu. GHCR push adlandırılmış borç.
- **`scripts/busDelivery.ts`**: ACTED/RECEIPTED/NO-EVIDENCE; ilk koşusu kendi
  onaylı kuralını eleştirdi (dal çürür, alıntı=icraat) → #58; eşleştirici APTAL
  kalır, false-positive testle pinli. S100 boot ritüeline girdi.
- **Host-health nabzı** (#45): cron+band; `could-not-read` YAZILIR; pencere
  anotasyonu ayrı modülde (probe import EDEMEZ — yapısal); mutasyon dersi:
  mutasyona uğrattığın ÖĞEYİ iddia et, komşusunu değil (M2).
- **ROUTE-ASK** (#14): karanlık valf `router.askOnUnresolved` (kod tabanı 0),
  kanıt her turda; FF_UNRESOLVED %26.5 ölçümü kapıyı açmıştı.
- **Assembler generic** (#55): born-knowing-ARMES ailesinin kapanışı — elle
  yazılmış üç pack override, gerisi türetilmiş; üç yokluk durumu ayrık.

## §5 · OPERATOR ŞERİDİ DOĞDU
Bootstrap v1 + 3 kart + 3 rapor. İlk koşuda bayat-checkout'u yanlış atfetti
("dosya konmamış") → A-REC-S99-7 düzeltmesi: **salt-okunur checkout, yalnız
fetch+ff-only; ff temiz değilse DUR** ("görüş güncellemek yazarlık değildir;
dünyayı değiştirmek yazarlıktır"). Sıra-dışı zaman damgası için `--include-all`
bayrağını kendisi ekleyip AÇIKLADI. Kabuller hep 4. adımda (pozitif kontrol).

## §6 · SAYIM YÖNTEMLERİ (bağlayıcı)
vitest cetveli = üç include glob'u (S99 sonu: **601** = src 145 + shared 6 +
api 450 civarı; kesin sayı boot'ta hesaplanır) · `e2e/*.spec.ts` AYRI korpus
(**15** dosya) · ham `*.test.*` süpürmesi FARKLI cetveldir, drift değildir ·
migration tepe SÜRÜMÜ ile tepe DOSYA ADI ayrışabilir (sıra-dışı uygulama).

## §7 · S99 BULGULARI (bucket v35'e işlendi)
F-S99-BUS-WRITE-AUTHORITY-BY-CONVENTION ✅(#53) ·
F-S99-BENCH-RESET-UNARMED ✅(#54) · F-S99-CI-ZERO-RUNS-READS-AS-CLEAN ✅(yasa) ·
F-S99-MAILWAIT-ATTRACTOR ✅(S99-3/4) · **F-S99-SYNTHETIC-INJECTOR-SILENT 🔴(#57)**
— 21 planlı ateşleme, 0 koşu, 0 digest; kontrol: obs-host cron AYNI pencerede
attı → arıza enjektöre özgü, 01:39Z'den beri · ARDIC tersine dönüşü: 18/18
BİZİM (satıcı listesi yok; census'a üç-liste yasası: THEIRS/OURS/unattributed) ·
adsız flake ×2 (nöbet) · silent_finish 16 olay → tetik → **#59** ·
render-iddia dersi: yük taşıyan yarı CLASS'tır (`truncate` görsel kırpar, DOM
tam dizeyi tutar — metin iddiası sahte-geçer).

<!-- END · CWF-SESSION-GRAPH-KB-v100 -->
