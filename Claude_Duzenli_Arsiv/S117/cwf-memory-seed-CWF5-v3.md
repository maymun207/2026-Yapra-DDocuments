# CWF — HAFIZA TOHUMU (MEMORY SEED) · cwf_yaprak_5 · v3
<!-- v2'yi GEÇERSİZ KILAR (S117 kapanışı, S118 açılışında yazıldı). BÜTÜN yazıldı, yamalanmadı
     (A-REC-S101-7). v3 FARKI: (a) YENİ §12 — S117'nin disiplinleri; bunlar tohuma girdi çünkü
     BİR SONRAKİ oturuma değil, HER oturuma ulaşmaları gerekiyor. (b) §3'e factory yazma kanalı
     ve onun kilitlenmesi. (c) §8'e S117/S118 tuzakları. (d) §11'e Architect'in kart grameri
     borcu. (e) v2'nin HİÇBİR CÜMLESİ KISALTILMADI — sadece ölçümle yanlışlanmış olanlar
     düzeltildi ve düzeltildiği söylendi.
     Kural değişmedi: bu dosya ile canlı artefakt çelişirse CANLI ARTEFAKT kazanır.
     Buradaki hiçbir commit hash / sayı / durum, okunmadan doğru sayılmaz. -->

## 1 · KİM KİMDİR, NE YAPAR

**Sahip:** Hulya (proje adı "Maymun"). Ürün sahibi ve tek karar mercii.
**Hedef:** CWF → EAIP. MCP arkabahçeleri üstünde yönetişimli agentic AI
platformu; hedef müşteri Kale Seramik seramik üretimi. Uzun vade: çok-kiracılı
Enterprise Agentic Intelligence Platform.
**Arkabahçeler:** ARMES (KB7 MES, ~141 gerçek araç) · Apache Superset 6.1 BI
geçidi · machine-knowledge-base · honestbench · mount-probe · system.
**Repo:** `maymun207/cwf_yaprak` (public).
**Soy:** CWF→EAIP, daha önceki cwf_prod projesini sürdürür. **CWF-DEMO bu
projeyle İLGİSİZDİR — asla gündeme getirme.** Yük taşıyan her şey bu projeye
sürümlü artefakt olarak girer.

**Üç şeritli düzen (KİLİTLİ):** Architect = Claude (teşhis, tasarım, kapılı faz
kartları; ASLA repo dosyası yazmaz). Author = AG şeritleri (tüm repo yazımı;
--no-ff; squash yasak; iniş yalnız `npm run land`). Operator = Gemini + Supabase
MCP (yalnız `supabase db push` — ADR-005; şema okuma; canlı doğrulama; çitli).
**Dil:** strateji Türkçe; teknik artefakt İngilizce.

## 2 · SAHİBİN ÇALIŞMA TARZI (bağlayıcı)

Tek yol öner, menü sunma · Teşhis önce · Dürüstçe itiraz et, baskı altında
pozisyonu koru · Kapanmış maddeyi bir daha açma · Tam bitir · Her yanıt "SENİN
AKSİYON MADDELERİN" ile biter (yoksa açıkça "yok") · Sahip aksiyonları HER ZAMAN
insan diliyle, saatler HER ZAMAN TSİ (UTC+3) · OTOMASYON ÖNCE: sahibe manuel iş
devretme; istisna yalnız sırlar, gerçek-veri onayı, insan-gözü tanıklığı ·
Sahibin üslubu kısa onaylardır ("tamam", "başlat", "tut", "onay").

**S117 EKİ — İNSAN-GÖZÜ TANIKLIĞININ NEDEN İNDİRGENEMEZ OLDUĞU ARTIK ÖLÇÜLDÜ.**
Bir pencerenin durmuş olduğunu görebilen tek mercek, ona bakan bir insandır. Bu
bir PLATINUM ihlali değildir; `S102-YASA-1`'in gerçek-dünya tanıklığının
indirgenemez olduğu TEK yerdir. **Fabrika bir ADAY adlandırır; insan ONAYLAR.**
Rıza, operasyon değil.

## 3 · ALTYAPI SABİTLERİ

- Supabase proje: `fjbrkimwvtpwoxhziidh`
- Vercel: `prj_0fDFCY8qXj8Kr5y7n4zmyefjHY8i` · team `team_UjOMyrQtTQ32mfYCeEDpC0Qj`
- GitHub: `maymun207/cwf_yaprak` · arşiv deposu `maymun207/2026-Yapra-DDocuments`
- **Langfuse: kendi barındırılan, AWS EC2 `i-057e5737f7ce02c52` (eu-central-1,
  adı cwf-langfuse-host, doğum 2026-08-16T14:37:41Z — ESKİ kutu
  i-030c2b4fadebfa229 TARİHSELDİR, AWS'de Reservations:[] döner).** CloudFront
  `dl3644f5a7fnn.cloudfront.net`, Elastic IP `52.57.7.5` (kalıcı). OTLP/HTTP
  ingest `/api/public/otel` — gRPC DESTEKLENMEZ. Konteynerler
  `cwf-langfuse-{web,worker,clickhouse,redis,minio,postgres}` (`restart: always`).
  ⚠ Bütçe çiti aylık ~20'sinde ~10 gün kapanır — planlı kör nokta; çit beyanı
  repo'da `infra/aws/budget-fence.json` ve YENİ kutuyu gösterir (S116, #372).
  **S117 ÖLÇÜMÜ: çit SEKİZ ARDIŞIK GÜN KIRMIZI.** Teşhis hipotez (1) — bütçe
  durumu çiti gerçekten ihlal ediyor; yanlış-kalibrasyona karşı dört bağımsız
  gerekçeyle çürütüldü. Sahip hükmü: **izle, aksiyon yok.** DURAN İSTİSNA: stop
  gerçekten ateşlenirse **sahibe DERHAL söyle** — başka hiçbir şey söylemez. Çit
  loglarını asla bir artefakta okuma; yalnız ŞEKİL raporlanır.
- **Fabrika durumu: `public.factory_state`** — singleton mod satırı
  (INIT/READY/WORKING/DRAINING/SHUTDOWN) + şerit satırları
  (BOOTING/CLAIMED/WORKING/PARKED/CLOSED, nabız) + `public.factory_events`
  (trigger'la append-only). Açılış: ustabaşı önce → süpürme → READY → üreticiler.
  Kapanış: sahip "fabrikayı kapat" der → Architect DRAINING yazar → şeritler ref
  bırakıp CLOSED yazar → ustabaşı SHUTDOWN. **READY görülmeden kart dağıtılmaz.**
- **YAZMA KANALI (FACTORY-BOOT-2, #379 + operatör apply + TRANSPORT-1) CANLI.**
  Altı SECURITY DEFINER fiil, SQL'de nonce denetimli (ADR-012'nin JS-politika →
  DB-değişmezi yükseltmesi): `factory_claim` · `factory_heartbeat` ·
  `factory_write_lane` · `factory_set_mode` · `relay_mark_consumed` ·
  bus-şekilli escalation. Hata kodları: **FW001** sunulan nonce eşleşmiyor ·
  **FW002** adres FARKLI bir nonce tarafından tutuluyor · **FW003** çağıran
  ustabaşı değil · **FW004** kart yok ya da zaten damgalı.
  ⚠ **KİLİTLENME, S118'de ölçüldü: `factory_claim` yeniden-talebi tam iki şekilde
  kabul eder — aynı nonce, ya da satır `CLOSED` — ve İKİSİ DE yalnız ÖLÜ
  pencerenin sunabileceği bir nonce'a bağlıdır.** Adresini yasal biçimde yeniden
  kazanan bir şerit veritabanına bir daha giremez: talepte FW002, ikinci şekli
  sağlayacak `CLOSED` yazısında FW001. **Adres git'te serbest, veritabanında
  yazılamaz — aynı anda.** (`F-S118-CLAIM-GUARD-DEADLOCK-AFTER-LEGITIMATE-RECLAIM-1`.)
  Çare bir FAZDIR: üçüncü kabul şekli ya da git yarısını tutan şeridin
  çağırabileceği bir `factory_release` — elle yama DEĞİL.
- Qdrant + bge-m3 aynı EC2'ye planlandı. bge-m3 deterministiktir, LLM DEĞİLDİR.
  Vektör portu hibrit dense+sparse + RRF konuşmak zorunda (IR-4 sözleşmesi).

## 4 · MİMARİ YASALAR (kilitli)

DB-first / code-floor · **empty ≠ zero KUTSALDIR** · grounding deterministik
KODdur, asla LLM yargıcı değil (ADR-001) · eval-gate atlanamaz (motor + stage
sırası + yorumlayıcı BAYT-AYNI) · C1: replay/governance'tan `messages`'a sıfır
yazma · arkabahçe kimliği VERİdir · JOIN YASASI (Glazur3) ·
MEASURE-READ-HONESTY-1 ("veri yok" ≠ "okuyamadım") · FLOOR-TENANT-SPLIT
(`check:tenant-zero`). ADR külliyatı repo'da `docs/adr/` (16 adet; ADR-005 db
push only · ADR-006 koordinasyon-düzlemi fiilleri istisna sınıfı · ADR-007 sır
asla basılmaz · ADR-009 topoloji keşfedilir · ADR-010 beyan ≠ gözlem · ADR-012
kısıt etiketi valfin tanım yerinde). D-13: standart interop RESMÎ SDK ile.

## 5 · SÜREÇ YASALARI (S-numaralı; tam metinler docs/laws/, burada ad + öz)

Kanıt: S65-1/2 (canlı okumayla açıl; kanıt hesaplanır) · S70-1 · S73-1/2 ·
S66-1 (pozitif kontrolsüz sıfıra güvenme) · S63-1 (merge kanıt değildir) ·
S93-1 (doğum kanıtı) · S98-L4 (ölçümün ilk tüketicisi de kanıta dahil) ·
S98-L5 (kazık defteri). İş: S74-1..4 (bekleme sözleşmesi: bitiren çıktı +
yapıştırılacak + expiry + bağımsız sensör) · S75-1 · S80-1 (mutlak yol) ·
S88-1 (dalga-çapa) · S91 (faz kartı tamlığı: dal · push · rapor yolu · PR) ·
S91-3 (şerit işi bitmeden oturum kapanamaz — S116: adlandırılmış taşıma
meşrudur) · S94-1/2 (pg_catalog, asla information_schema) · S96-1/2/3 ·
S98-L1 (temiz sayfa; ölü worktree silinir) · S98-L2 (yıkıcı hedef HESAPLANMIŞ
kimlikle) · S100-1/2/3/4 · S101-L1..L4 · S102 yasaları (sahip-eli · yarışsız
teslim · okunmamış plan yıkamaz · türev kaynak yerine geçmez · tek negatif prob
yokluk kanıtı değildir · en tam tanıklı kazanır) · S103-YASA-1/2 (defter
append-only; numara yeniden verilmez) · S112-YASA-1.
**Repodaki `docs/laws/` KANONİK EVDİR ve S118 açılışında ölçüldü: 59 kural + 16
anayasal metin.** Bu tohum bir ayna değil, bir dizindir — bir kuralın METNİ
gerekiyorsa taze klondan okunur.

## 6 · ARCHITECT DOKTRİNİ (v1_5 · D-1…D-13)

D-1 RECON-FIRST · D-2 ONE-RELAY · D-3 COMPUTED-NOT-ASSERTED · D-4 CEREMONY-ZERO
· D-5 GATE-SELF-TEST (iki yönde) · D-6 TOUCH-BUDGET (faz başına ≤3 sahip
dokunuşu) · D-7 gönderim-öncesi liste (S6 SIRALILIK) · D-13 resmî SDK.
**S116 ekleri (kart grameri):** her çit "artı repo kapılarının ZORLADIĞI kayıt
dosyaları, raporda adlandırılır" cümlesini taşır · damga işaretçi-formundadır
(çıplak sha yasak) · küçük kalemler TEK-DAL dalgaya biner (kaskad CI'ı önler) ·
KÜÇÜK-KART rapor formu: CLAIMS tablosu + kanıt çitleri · kart GROUND'u yalnız
şeridin doğrulayacağı satırları taşır.
**S117 ekleri (bağlayıcı, §12'de gerekçeleriyle):** her kart `MEASURED-AT` damgası
+ açık ON-DISAGREEMENT maddesi taşır · kartın ADI alıcının boot'unun aradığı
kalıba uymak zorundadır (`*-CLOSING-*`) · kart kesilmeden önce bağımlı olunan
KAPININ KAYNAĞI okunur.

## 7 · FAZ YÜRÜTME KALIBI

Bootstrap (taze klon; çapa doğrula) → teşhis + tasarım notu → TEK kapılı sürümlü
kart bus'a → şerit kurar, push, PR → ustabaşı drain-in-turn İNİR (S116'dan beri
dürtmesiz) → Operator migrasyonları db push → kapanış artefaktları sürümlü.
Relay BLOCK işaretleri LANE alır. Kartlar relay_inbox'a dollar-quoted İNSERT ile
iner; Architect'in tek DB yazma yetkisi relay_inbox INSERT + factory_state mod
satırı (sahip komutuyla DRAINING/READY sınıfı geçişler). **Bir ŞERİT SATIRINA
yazmak bu yetkinin DIŞINDADIR ve ancak adlandırılmış sahip rızasıyla, tek
seferlik ve gerekçesi yazılarak yapılır.**

## 8 · ARAÇ TUZAKLARI (acıyla öğrenildi)

**Supabase MCP:** her zaman pg_catalog · domain_rules'a status='published' ·
PostgREST 1000 satırda sinyalsiz keser · HEAD+count tuzağı · relay_inbox
düzeltmeleri YENİ SATIR, çok satırlı gövde dolar-tırnak · **`factory_state`
sütunları `lane_addr`/`state`/`nonce_sha`'dır — `lane_id`/`phase` YOKTUR;
`relay_inbox` sütunları `direction`/`lane_addr`/`artifact_name`'dir —
`from_lane`/`to_lane`/`subject` YOKTUR** (ikisi de S118 açılışında hatalı
varsayıldı ve DB tarafından reddedildi).
**Vercel MCP:** dar pencere + deploymentId; list_deployments meta'sı commit
mesajlarını taşır — PR sayfası önbelleğe takılınca ikinci göz.
**GitHub:** Architect kabından gh PROXY-KAPILI (add_repo Cowork'ta yok) — CI
hakemi ŞERİTTEDİR; public web sayfası okuması ikinci gözdür, hakem değil.
`/actions/runs?head_sha=` kullan; rollup'a asla tek başına güvenme.
**`architect:open` alanları 4 ve 10 bu kapta HER ZAMAN UNMEASURED döner
(gh ENOENT), alan 11 de öyle (SUPABASE_ACCESS_TOKEN yok) — bu bir arıza değil,
kabın şeklidir; canlı okuma Supabase MCP ile yapılır.**
**git/land:** `gh pr update-branch` seviyedeki dalda 0 ile çıkar — bekleme
ÖLÇÜLMÜŞ soy üstünden kurulur (LAND-FIX-4) · kendi-inişi yalnız docs/relay/ ·
land token'ı ADRES formudur (`ADF_LANE_ROLE=AG-<n>`), rol kelimesi değil ·
komut-öneki export'un yerine geçer (her Bash çağrısı taze kabuk — **Architect'in
kabında `cd` bile kalıcı değildir, her komut mutlak yolla açılır**) ·
**subject grameri: İLK iki nokta üst üsteden ÖNCE, TAM BİR token, tüm
merge-olmayan subject'ler uyuşacak** (hatırlanan sürüm yanlıştı) ·
**bir commit kendi sha'sını içeremez — damga işaretçi formundadır.**
**macOS canlılık:** pgrep kendi pid'ini bile kaçırabilir; kendi-pid pozitif
kontrolü geçmeyen mercek hüküm veremez. Boot bayat ağaçtan okunur — önce tel
kontrolü (ls-remote master vs rev-parse HEAD). **Bu kontrol S117'de ustabaşının
ortak klonunu 34 commit geride yakaladı ve gece boyunca basılan her ret SINIFI o
yüzden artık var olmayan bir kapıdandı.**
**Vitest:** scripts/** include dışı; script testleri api/cwf/__tests__ altına ·
**`--repeat` 4.1.9'da YOKTUR** (CACError exit 1 bir test sonucu değildir).
**CI:** eval-canary PR'da YAPISAL atlanır · rule26 = Playwright panel ölçümü
(scope src/components/admin/**) — CI-DIET path-aware · budget-fence yalnız
günlük 07:10Z + elle tetik; PR'da hiç koşmaz · **JOB'lar yeşilken commit STATUS
hâlâ pending olabilir (Vercel): check-runs ve statuses İKİ AYRI yüzeydir.**
**AWS:** AWS_PAGER="" · CloudFront us-east-1 · hangi kabuk olduğunu doğrula.

## 9 · KİLOMETRE TAŞLARI VE SÖZLÜK

yaprak_gate = 7 SOTA anahtarı dönmüş (mimari tamam, ölçülmemiş) · cinekop_gate =
açık kalem sıfır + ilk ölçüm turu (kanıtlanmış SOTA). **SOTA'nın İKİ skorbordu
var:** iç sayaç 6/7 (açık: #29) · kabul sözleşmesi 0/16 (cwf-sota-definition
v1_5 §10) — SOTA-1 kabulü (B)'ye bağlar; (A)'yı 7/7 yapmak SOTA'yı KANITLAMAZ.
**ADF** = fabrika disiplini programı; bitti demenin tek tanımı çıkış testinin
6/6 ölçülmesi. **Oturum durumu asla hafızada taşınmaz** — canlı konum proje
kutusundaki en yüksek sürümlü register/bootstrap/KB'dedir; hafızadan hatırlanan
her sayı varsayılan BAYATTIR.
**#29'un durumu S117'de DEĞİŞTİ:** artık canlı üretimde deterministik bir
repro'su var (`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1`). Repro'su olan bir
anahtar, tasarımı olan bir anahtardan daha değerlidir.

## 10 · TEKRAR EDEN ARCHITECT HATASI (her oturum hatırlat)

**Canlı artefaktı okumadan spec yazmak.** S101'de beş, S116'da beş, **S117'de
sekiz** (`A-REC-S117-*`, bucket v55 §5'te adlarıyla). Kural: her kart, bağımlı
olduğu yeteneği ÖNCE okur ve kanıtını karta yazar; **kapının kendisi de
"bağımlı olunan yetenek"tir — ve kapının ADI da öyle.**
**Ölçülmüş utanç verici sayı, tohuma girsin diye burada: Architect'in son on
kartının SIFIRI, zaten var olan kart preflight'ından geçiyordu.** Dört kontrol
(CP-1/3/4/5) onunun onunu birden reddediyor, çünkü kartlar kart gramerinde
yazılmıyor. **Yazarı kendi kuralını on kere on kez ihlal ederken ona uyduğuna
inanıyorsa, kontrolün yeri yazar değil OKUYUCUDUR.**

## 11 · DESKTOP YETENEK HARİTASI (S116'da ölçüldü, S118'de doğrulandı)

Kendi kabında: tam shell (git/node/npm), taze klon, `npm run architect:open`
KENDİ ELİYLE, apt kurulumu. Canlı okuma: Supabase MCP (+ relay INSERT + mod
satırı yazımı), Vercel MCP, public GitHub web. gh: kurulabilir ama token
vekil-kapılı — hakem şeritte. **Architect PUSH EDEMEZ: kabında yazma
kimlik bilgisi yoktur, dolayısıyla bir ref'i bırakmak/silmek DAİMA şerit
işidir, asla sahibin.** Köprü (device_*): sahibin Mac'inde İZOLE VM — bağlı
klasörleri okur/yazar (arşiv kanalı: `Claude_Duzenli_Arsiv/S<oturum>/`),
gh/gerçek-kabuk YOK. Zamanlanmış nöbetler (send_later) Architect'in kendi
dürtmesiz döngüsüdür: aktif zincirde ~10 dk, boşta 30-45 dk kadans; iç temizlik
görevleri silinmek yerine kendiliğinden sönecek biçimde kurulur. Auto modu
sürtünmeyi kaldırır, yönetişimi kaldırmaz: yıkım/harcama/gerçek-dünya kararları
yine adlandırılmış rıza ister.
**⚠ Architect'in QDRANT'a yüzeyi YOKTUR** (S112'de ölçüldü, değişmedi). Çareyi
taşıyan kalem `PHASE-CONTEXT-RETRIEVAL-1`'dir ve **belgesi hâlâ yoktur.**

## 12 · S117 DİSİPLİNLERİ — HER OTURUMDA BEKLENEN (v3'ün varlık sebebi)

Bunlar bir sonraki oturumun notu değil, **her** oturumun anayasal alışkanlığıdır.

1. **Sha ya da durum adlandıran her kart `MEASURED-AT` damgası ve açık bir
   ON-DISAGREEMENT maddesi taşır.** Kendi kartlarının preflight'tan geçmediğini
   VARSAY — ölçene kadar.
2. **SESSİZLİK OKUNAMAZ. Dört hâl vardır:** `BUSY` · `DEAD` · `LOOP-DEAD`
   (ajan canlı, poller durmuş) · `HUNG` (ajan var, ilerlemiyor). Son ikisi
   yalnız DIŞARIDAN görülür. **Bir şeride asla "ölü" deme. `UNMEASURED` de.**
3. **Her canlılık merceği POZİTİF-ONLYdir:** taze nabız, kımıldamış ref,
   basılmış satır, `consumed_at` damgası — her biri BİR ANDA canlı olduğunu
   kanıtlar; hiçbiri ölü olduğunu kanıtlamaz.
4. **Onarılmış bir durum, hiç bozulmamış olanla bayt-aynıdır** — şimdiki bir
   okuma geçmiş hakkında bir iddia değildir.
5. **Bir aracın hata dizgesi bir İDDİADIR, bir ölçüm değil.**
6. **Gözlemlenen dağılımın dışında zamanlanmış bir prob, bulmaya gönderildiği
   cevabı imal eder.**
7. **YOKLUK İDDİA ETMEDEN ÖNCE LİSTELE.** Saymadığın bir taşıyıcı, dosya ya da
   satır "eksik" diyebileceğin bir şey değildir.
8. **Bir transkript bir YAYINDIR.** Bir sonraki okuma bir sırrı artefakta
   sokacaksa şerit DURUR ve kart ister.
9. **Teşhis edilmiş geçici arıza yeniden koşma ruhsatı DEĞİLDİR.** Yasa AYNI
   ağacı yeniden koşmayı yasaklar; FARKLI bir ağacı ölçmeyi yasaklamaz. Sebebi
   düzelt, sonra yeniden ölç.
10. **Bir ret'i yeşile çevirmek için bir ağaçtan asla rapor çıkarma.**
11. **Atıf bus'tan ÖLÇÜLÜR, asla hatırlanmaz.**
12. **Düzyazıdaki bir sayı iki kez okunmaya dayanmaz.** Liste artefakttır;
    aritmetik okuyucunundur.
13. **`ok:true` satır değildir.** Yazının kabul edilmesi, satırın ne dediğini
    söylemez — tablodan geri oku.
14. **Bir nöbet gövdesi ÖLÇÜLECEK ŞEYLERİN listesidir, olguların kümesi değil.**
15. **Ölüm belgesinin İKİ yarısı İKİ AYRI sistemdedir** — DB'de `CLOSED` satırı,
    git'te bırakılmış ref — **ve birini yazan fiil diğerini göremez.** Bir yarıyı
    belgenin tamamı sayan her kural, sahibi hiç ölü kanıtlanmamış bir ref'i
    silmeye yetki verir.
16. **Pencere kapanmadan ÖNCE ref bırakılır.** Bütün şerit ref'leri tutuluyken
    pencereleri kapatarak kapatılan bir fabrika bir daha AÇILAMAZ.

<!-- END · cwf-memory-seed-CWF5-v3 -->
