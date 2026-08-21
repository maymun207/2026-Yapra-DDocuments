# cwf-open-items-register-v98 — S94 kapanışı

<!-- v97'yi geçersiz kılar. Zemin: origin/master d8f33f80 · rev 233 ·
     533 dosya / 6820 test · 72 migration (canlıda 72, bire bir) · 13 ADR. -->

## §1 · SAHİP HÜKÜMLERİ (v97 §1 aynen + S94 eklemeleri)

- **#39 SNAPSHOT-PORTABILITY onayı (S94):** iki senaryo ayrı ürünler —
  (a) boş kuruluma nakil = tohum modu, kullanıcı belleği ASLA; (b) aynı
  kurulumda bozulmadan dönüş = tam geri yükleme, kullanıcı belleği DAHİL.
- **SAFETY-TAKE hükmü (S94):** her restore/seed, yıkımdan önce mevcut hâli
  otomatik görüntüye park eder; geri sarma tek yönlü olamaz.
- **#40 PERSISTENCE-CLASS onayı (S94):** her tablo doğumunda kalıcılık sınıfı
  beyan eder; beyan gönüllü değil — sınıfsız tablo CI'ı iki yönde kırar.
  Servis dalgasından (#23/#25/#29) ÖNCE gelir (S82-6).
- **HGT/tohum-şartlı-güven ("SEED-PROBATION") tohumu:** nakledilen bilgi yerli
  statüde doğmasın, kaynak-damgalı girip yerel kullanımda yerlileşsin
  (ADR-010 ruhu). PARK — bilimsel tartışma ayrı oturumda (scientist modu);
  Graph-KB geldiğinde kalem doğurur.

## §2 · YÜRÜYÜŞ DURUMU

**Payda 41 · KAPALI 9 · AÇIK 32.**

S94'te kapananlar (3):
- **#4 TRUST-PANEL-PER-BACKEND-1** — merge 342dc81; readOk ölçüm ekseni;
  düz alan öldü; tip shared/'a taşındı (S82-5 sınıfı yapısal kapandı);
  system hattı konsoldan çıktı; canlı sahip tanıklığı 4 satır/3 hâl.
- **#38 SNAPSHOT-LIFECYCLE-1** — merge 2d9cb72; ad benzersizliği (insert-hakem
  çakışma döngüsü) + onaylı silme + koruma bayrağı + elle temizleme; kurulum
  tarihinin İLK gerçek panel-silmeleri denetim satırlarıyla kanıtlı.
- **#39 SNAPSHOT-PORTABILITY-1** — merge f7af666 + FIX-2 ed527ec;
  cwf-learn/1 zarfı (sha256+manifest yeniden-türetme), export tek kapı
  SQL-içi denetimli, import→sıradan görüntü satırı, seed boş-hedef +
  sınıf haritası + sınırda kimlik sıyırma (sayılı), SAFETY-TAKE canlı;
  uçtan uca ritüel 6/6 bayt-aynılıkla kapandı.

S94'te doğanlar (3): #39, #40 (yk.), **#41 SWEEP-BARE-DELETE-1** — organ dışı
tüm SECURITY DEFINER gövdelerinde WHERE'siz tam-tablo DELETE taraması;
sınıf kapısı şimdilik yalnız snapshot organını koruyor. Küçük; #40 ile dalga
adayı (S88-1 çapraz kontrol şartıyla).

## §3 · SOTA KAPISI + KANARYA

Kapı **1/7** (değişmedi; #38/#39 kapı anahtarı değil, altyapı). Kalanlar:
#10 · #16 · #18 · #23 · #25 · #29.

Kanarya kanıt zinciri (S63-1): master'da ÜÇ ardışık koşu
`scored 9 / failed 0` — f6d6e48 → f7af666 → ed527ec (run 31571903431 son).
Kelime `underpowered` cap'te KİLİTLİ (checked 6<9) — beklenen; yeniden teşhis
YASAK; mühür #37'de. İzlenir, açılmaz.

## §4 · S94 BULGULARI

| Ad | Durum | Öz |
|---|---|---|
| F-S94-SAFEUPDATE-SEMANTICS | **YASA + kapalı** | `authenticator` rolü safeupdate preload eder; WHERE'siz DELETE canlıda ölür, migration'da sessiz geçer. S93 "where true" sapması UYARLAMAYDI. Yasa: **anlamsal eşdeğerlik ortama görelidir**; `delete … where true` bu DB'de kanonik biçim. Düzeltme canlıda kanıtlı (FIX-2). |
| F-S94-FK-CENSUS | **YASA + kapalı** | Öğrenilmiş katmanda 5 FK var; "sıfır" iddiasının kökü: `information_schema` kısıt görünümleri AYRICALIK-süzgeçli, sahibi olunmayan tabloda hatasız BOŞ döner. Yasa: sansüsler `pg_catalog`/DDL okur; boş information_schema sonucu OKUNMAMIŞ sayılır. Gizlediği kusur (resolved_by nakli) FIX-1'de sınırda-sıyırma ile kapandı. |
| F-S94-VOICEGATE-BLIND | **AÇIK** | voiceGate 2 dosya tarar, hiçbir admin panelini okumaz; "none (floor)" bu yüzden yaşadı. Admin metin katmanının kapısı yok — kardeşi F-S94-TRUST-COPY-STUTTER (Data Authority'de yapışık iki cümle). Adaylık: ayrı küçük faz. |
| F-S94-HEALTH-SYSTEM-ROW | **AÇIK** | health-analytics filtresiz backend listesi okur; Sağlık bandında system satırı kalıcı "ölçülmedi" durur. Yanlış soru sınıfı; küçük. |
| F-S94-RECENT-OPS-VOCAB-GAP | **kapalı (#39)** | İKİ katman: sunucu el-filtresi + istemci el-etiketi. Artık ikisi de paylaşılan sözlükten türer; bilinmeyen eylem ham adıyla görünür. |
| F-S94-MUTATION-HARNESS-REPORTER | **kayıt** | vitest 4 `--reporter=basic`'i kaldırdı; koşmayan test = 16 sahte-hayatta-kalma olurdu; muhafız yakaladı. Ev-çapı tuzak. |
| F-S94-VERCEL-AUTOLINK | **kayıt/kural** | Bağlanmamış klasörde `vercel ls` PROJE YARATIR. Kural: AG şeritleri geçici klonlarda Vercel CLI çalıştırmaz. |

**Architect sicili:** A-REC-S94-1 (merge mesajında hesaplanmamış "sixteen") ·
A-REC-S94-2 (ölçülmemiş "anlamsal eş" iddiasını zorunlu emre çevirmek —
safeupdate olayının tetiği) · A-REC-S94-3 (yanlış beklenti satırları: emniyet
görüntüsü "0 satır" tahmini — gerçek 800, keşif kendi kendini iyileştirdi;
Operator G4'te "4 görüntü" — doğrusu 3; ve "kapalı 10" sayım hatası).
Ortak kök: hesaplamadan sayı/beklenti yazmak. D-3 bilinçli sıkılaştırılır.

**Olumlu tanıklıklar:** atomik geri sarım + yüksek sesli hata gerçek olayda
tuttu · S93-1 doğum-kanıtı yasası kusuru prova gününde yakalattı · keşfedilen
katman 48 dakikada 800 varlığı kendisi yeniden kurdu (R1'in canlı kanıtı) ·
Operator S93-3'e iki relay'de de harfiyen uydu.

## §5 · UFUKTA (sıra — rollout v3_2)

1. **#40 PERSISTENCE-CLASS-1** — taze master'a prompt; ADR-014; servis
   dalgasından önce ZORUNLU. #41 ile dalga adayı (S88-1 kontrolü şart).
2. **#41 SWEEP-BARE-DELETE-1** — küçük tarama+kapı genişletme.
3. **Sahip kararı bekleyen:** `learning.snapshotRetentionMax` yayın kararı
   (şu an kod tabanı 500'den servis; S80-3: yayın SONRASI sabit düzenlemek
   etkisizdir — karar yayından önce). Ritüel artıkları (s94-ritual ·
   s94-ritual-2 · pre-restore-…) panelde durabilir; "Clean up old ones"
   istendiğinde temizler — acele yok.
4. #6 + #7-9 dalga hazırlığı · TOOL-BEHAVIOR-CENSUS-1 · AgentBeats (#18 yolu).
5. Langfuse ay-sonu fence penceresi (~20'si) yaklaşıyor — F-OBS-FLUSH-OK-LIE
   ve OBS-HOST-HEALTH-1 yüksek öncelik korur.
6. GitHub App token format değişikliği (ghs_, ~520 kar.) — nöbet notu.

## §6 · ARTIK/İZ

`s94-ritual` dosyası (`.cwf-learn.json.gz`, ~1083 satır) sahibin diskinde —
kurulum-dışı İLK yedek. Hassas veri gibi saklanır. Nakil yarısının kanıtı
kurulum #2'yi bekler (SOTA-1 şekli: (a) seed-foreign kanıtsız; (b) kurulum #2
sinyali; (c) boş hedefe tohum + hedef loglarında taşınmış öğrenmenin canlı
turn'de kullanımı).

<!-- END v98 -->
