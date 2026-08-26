# CWF-SESSION-GRAPH-KB · v103 — S102 düğümü eklendi

<!-- v102'yi geçersiz kılar. Grafiğin S101 ve öncesi düğümleri v102'deki hâliyle
     geçerlidir; bu dosya S102 düğümünü, kenarlarını, doğan yasaları ve
     Architect sicilini ekler. -->

## S102 DÜĞÜMÜ (2026-08-16, ~22 saat, iki kompaksiyon)

**On bir merge · dört faz · bir kutu ölümü ve yeniden doğuşu · üç anayasal yasa
· onbeş A-REC.** Zemin: `e7939c93` (rev 268) → `1f660ea` (rev 271).

### §1 · OLAY ZİNCİRİ

**1. LAW-LEDGER-1 (`cdb9f1f`).** Yasa korpusu `docs/laws/`'a taşındı ve CI
taban-uzunluk kapısıyla (M9) korumaya alındı. Yol üstünde v5_4'ün v5_1'e göre
anayasal metni ~270 karakter **sessizce sıkıştırdığı** ölçüldü; FIX-2-v2 ile
altı kanonik metin restore edildi (6/6 bayt-aynı). Tenant merceği `kale`+`m`
için VERİ-istisnası aldı. → **Q5 YASASI doğdu.**

**2. PROBE-CANARY-500 (`fd02f69`).** LAW-LEDGER merge'ünde kanarya 500 verdi;
teşhis: HARD-CRASH sınıfı, tek seferlik. Kök kusur enstrümandaydı — CI non-200
gövdesini atıyordu. Artık üç durumda basıyor. (Bu ders S102 boyunca iki kez
daha tekrarladı: bir şeyin *neden* öldüğü, atılan gövdede yaşıyor.)

**3. RBAC-GOVERNED-1 (`2208dc9`).** Koddaki rol paketi TAVAN oldu, satırlar
yalnız daraltabilir. Mutasyon kanıtı: tavan kalkınca 6 kırmızı; kimlik-anahtarı
sökülünce 2 kırmızı. Anon süpürmesi: census 24, revoke 20, 4 kasıtlı
`USING(true)`. Operator uyguladı, **Architect canlıda bağımsız doğruladı.**

**4. QDRANT-ENGINE-1 + FIX-1..FIX-6 — gecenin gövdesi.** Altı düzeltme turu,
her biri farklı bir katmanın gerçek kusuru:
- **FIX-1** üç onarım: SSM apply yolu (elle kabuk gerektirmeyen yakınsama; sekiz
  konteynerin tamamı miras aldı, duran bir PLATINUM borcu adıyla kapandı) ·
  CloudFront üzerinden dar imzalı yol · **kendi yazdığımız** bge-m3 imajı.
  Architect'in origin-header tasarımı şerit tarafından REDDEDİLDİ (edge'i
  doğruluyordu, çağıranı değil) → çağıran-kimliği + timing-safe karşılaştırma.
- **Tenant-zero kapısı**, parite korpusunu repo fikstürü olarak REDDETTİ (9
  kırmızı satır: kiracı sözlüğü). Şerit, merge mesajındaki cümleyi yalan hâle
  getirdiği için merge'ü DURDURDU → **RULE-20 merge mesajına uygulandı** →
  parite CI'da CANLIDAN okur (161 kalem; hiçbir metin repoya/loga girmez).
- **Kutu ÖLÜMÜ:** sabitlenmemiş AMI oynadı, `-auto-approve` okunmamış planı
  icra etti, EC2 yıkıldı, ClickHouse telemetri tarihçesi gitti. Yeniden kurma
  denemesi SG kotasında öldü (prefix-list kuralı **55** ağırlık × 3 > 60).
  → **S102-YASA-3 doğdu.**
- **FIX-2** üç tel: port başına ayrı SG · `ignore_changes=[ami]` · **plan-okuma
  kapısı CI'a** (yıkım varsa `yes-destroy` olmadan koşmaz).
- **FIX-2-ASCII:** EC2 `GroupDescription` ASCII-only; ev üslubunun em-dash'i
  apply'ı compute'a dokunmadan durdurdu. Şerit 92 non-ASCII satırı **körlemesine
  değiştirmedi, sınıflandırdı**: 74 yorum (kalır) · 15 terraform-yerel (AWS'ye
  gitmez) · 3 resource-içi (düzeltildi). CloudFront comment'ine kanıtla
  dokunmadı ("defalarca uygulandı, o API kabul ediyor").
- **FIX-3:** `convert_id_to_token` tek elemanlı sonucu çıplak dict'e indiriyor →
  `KeyError: 0`, her istekte. **Daha kötüsü çökmeyendi:** `BGEM3FlagModel`'in
  `revision` parametresi YOK; değer `**kwargs`'a düşüp hiç iletilmiyordu —
  imajın determinizm yorumunda ilan ettiği "pinned revision" bir yalandı.
  Ağırlıklar build-time'da açık commit'te gömüldü + `HF_HUB_OFFLINE=1`:
  **indirme kalmadığı için pin GERÇEK.** Tembel yükleme de öldü; `/health`
  yalnız ağırlıklar resident'ken 200.
- **FIX-4:** apply parametreyi yazdı, association eski sürümü okudu, kanıtlar
  ESKİ konteyneri ölçtü ve her kol dürüst raporladı — **kimsenin deploy etmediği
  bir sistem tarif edildi.** Yakınsama workflow'a girdi (hesaplanmış sürüm
  beklemesi, adlandırılmış bütçe, sessiz sleep yok) + encoder artık başlatıldığı
  imaj referansını yankılıyor ve kanıt bunu dispatch girdisiyle karşılaştırıyor.
  → **S102-YASA-2 doğdu.**
- **FIX-5:** bayat named volume `/models`'ı gölgeliyordu — FIX-3 ağırlıkları
  gömünce sebebi ölmüş bir mount. Docker **boş** volume'u imajdan tohumlar,
  **dolu** olanı asla; bu yüzden temiz ortamda ÜREMİYOR. Şerit üç yolla yeniden
  üretti, sonra sildi. Yetim volume kutuda bırakıldı, adıyla kaydedildi
  (kabuğa girip silmek yasak).
- **FIX-6:** parite `Promise.all` ile 161 eşzamanlı encode fırlatıyordu —
  determinizm için **bilerek tek işçili** servise. Aynı koşu kendi kontrolünü
  taşıyordu: determinizm 20'yi SIRAYLA encode edip geçti, parite 161'i
  EŞZAMANLI deneyip düştü; aynı encoder, aynı korpus, tek fark çağrı deseni.
  Ölçüldü: bir frame sorgusu 1.2s, 400 kelime 22s → korpusun sıralı gömülmesi
  ~3 dakika: **bu bir iş (job), bir tur değil — ve hep öyleydi.**

**5. OBS-DELIVERY-NAME-1 (`319e6fc`, rev 271).** `[Obs]` satırı üç tanı turu
boyunca `swallowed=1` deyip **hangi hatayı** yuttuğunu söylemedi — evin kendi
"HANGİ konteyner" yasası, kendi enstrümanında ihlal. Artık `err=<Ad>[:<statü>]
[ <mesaj>]`, yalnız `delivery=failed` iken (bayat kimlik başarılı bir flush'a
binerse bu UYDURULMUŞ kanıt olurdu). Mutasyon: yakalamayı sökünce kompozisyon
süiti 4 kırmızı, saf formatter testleri yeşil — *saf fonksiyon testi bir kablo
kusurunu koruyamaz.*

**6. Langfuse teslim zinciri — CLOSED@owner-eyes.** Kutu yeniden doğdu (8
konteyner), anahtarlar terraform state'te yaşadı (pk ön eki her yerde aynı),
CloudFront üzerinden OTLP 200/37ms; `delivery=failed`'in kökü **eski
deployment'ın ölü kutuya bayat bağlantısıydı** ve AG-4 merge'ünün redeploy'u ile
kendiliğinden aktı. Sahip izi UI'da gözüyle gördü. Eski UI hesapları ve
telemetri tarihçesi volume ile gitti (kabul edilmiş).

**7. Çalışma modu.** `relay_inbox` posta kutusu bütün oturumu taşıdı: 24 kart/
rapor, hepsi base64+md5 doğrulamalı. Claude Code izin kapısı tuzağı öğrenildi
(refspec'li push "Always allow"u aşar). Operator boot şablonu akışa girdi.

### §2 · S102'DE DOĞAN YASALAR

| Yasa | Doğuran olay |
|---|---|
| **S102-YASA-1 SAHİP-ELİ** | Architect operasyon adımlarını (ısıtma, tetikleme, log okuma) sahibin kabuğuna taşıdı; sahip yakaladı: *"bana burada davul çaldırttırıyorsun"* |
| **S102-YASA-2 YARIŞSIZ TESLİM** | FIX-4: her kol dürüst raporladı ama kimsenin deploy etmediği sistemi tarif etti |
| **S102-YASA-3 OKUNMAMIŞ PLAN YIKAMAZ** | Kutunun `-auto-approve` ile yıkılması |
| **YASA: türev kaynağın yerine geçmez / tek negatif prob yokluk kanıtı değildir** | Sözleşme iddiasının memory-seed'den doğrulanması + Langfuse rota logunun boş dönmesinin "ulaşmıyor" sanılması |
| **YASA: en tam tanıklı ifade kazanır** | v5_4'ün v5_1'i sessizce sıkıştırması |
| ÖLÇÜM TÜRETMEYİ YENER | Şeridin 1.79 GiB ölçümü Architect'in 2.3 GB türetmesini çürüttü |
| API sınırı = API'nin karakter seti | Em-dash'in apply'ı durdurması |
| Healthcheck ≠ tedavi | `restart: always` sağlığa bakmaz; kilitli konteyner 15 dk unhealthy raporladı, kimse aksiyon almadı |
| Eşzamanlılık çağrılanın işçi modeline göre seçilir | 161'lik fan-out'un tek işçili servisi boğması |

### §3 · ARCHITECT SİCİLİ — A-REC-S102 (onbeş)

| # | Hata | Nasıl yakalandı |
|---|---|---|
| 1-2 | Ön-uçuş hataları (önceki kompaksiyon) | — |
| 3 | v5_3'ü kaynak sanmak | Sahip |
| 4 | "KAYIT YOK" önerisi | Sahip |
| 5 | En-yeni = en-tam varsaymak (288→270 erozyonu) | Ölçüm |
| 6 | Sensörsüz "iki şerit uçuşta" iddiası | Sahip |
| 7 | Kartsız şeride kanıt-düzlemi emri | Şerit |
| 8 | Boot'suz Operator'a "posta" | **Sahip** |
| 9 | Origin-header auth tasarımı (edge'i doğrulardı) | **Şerit reddetti** |
| 10 | RBAC merge kanaryası adlandırılmış onaysız ateşlendi | Kendiliğinden beyan |
| 11 | Plan-okuma kapısı merge-first yazımında düştü → **kutu yıkıldı** | Felaketin kendisi |
| 12 | FIX-2 kartı: iki portu tek SG'ye (110 > 60) | **Şerit düzeltti** |
| 13 | "SAYI=0 → istek ulaşmıyor" — doğrulanmamış öncül (rota erişim-loglanmıyor) | Kendiliğinden beyan |
| 14 | Operasyonun sahibin kabuğuna taşınması | **Sahip** |
| 15 | `mem_limit: 2g`'yi encoder'a yanlış atfetmek + OOM hipotezi | **Şerit ölçtü** |

**Kök desenler:** (a) ölçmeden yazmak (S65-1'in devamı); (b) bir kartta yaşayan
kural, o kart yeniden yazılınca ölür — **kural kabloya dönmedikçe kural
değildir**; (c) Architect'in kendi kabının sınırını sahibin eline devretme
refleksi. PLATINUM-BREACH-S102-1: "AG-4 için modifiye et". NOTE-CONSENT-TIMING-
S102: FIX-6 kanaryası açık onaydan dakikalar önce ateşlendi (genel hüküm, tek
tek onayların yerine geçmez — kural pekişti).

**Olumlu tanıklıklar:** tenant-zero kapısı Architect'in fikstür tasarımını
yendi · şerit yalan merge mesajını reddetti · şerit kartın durma maddesini
işletip R2'yi körlemesine uygulamadı · şerit imajı göndermeden önce yerelde
koşturdu · Operator üç işini de fence+md5+hash önkoşuluyla yaptı · sahip iki kez
Architect'i doğru yere çekti.

### §4 · KENARLAR

Q5 yasası ─enforced-by→ docs/laws taban-uzunluk kapısı (M9) ·
RULE-20 ─extended-to→ merge mesajı (şerit reddi) ·
tenant-zero kapısı ─defeated→ Architect fikstür tasarımı ─replaced-by→ canlı korpus okuması ·
AUDIT-OR-ALARM ─new-instance→ yutulan `revision` kwarg'ı ·
S102-YASA-3 ─wired-as→ `deploy-langfuse.yml` plan kapısı ·
S102-YASA-2 ─wired-as→ yakınsama beklemesi + kimlik ön-kontrolü ·
S102-YASA-1 ─wired-as→ dispatch'in şeride devri ·
empty≠zero ─new-instance→ `[Obs]` sessizliği = delivered (kod hükmü) ·
determinizm garantisi ─costs→ tek işçi ─implies→ VECTOR-ONBOARD-DRIP-1.

### §5 · S103'E DEVREDENLER

FIX-7 (uçuşta, dal push edilmedi, **yeni digest doğacak**) → parite sayıları →
Architect'in bağımsız okuması · GRAPH-KB-1 🔑 (durum ölçülecek) · LAW-LEDGER-2
(S102 yasaları + AGNOSTIC-1 rename) · MERGE-FIELD-AWARE-1 ·
VECTOR-ONBOARD-DRIP-1 (switch'in ön koşulu) · 13 ölü ref hijyeni ·
bütçe-çiti ~20 Ağustos.

<!-- END KB v103 -->
