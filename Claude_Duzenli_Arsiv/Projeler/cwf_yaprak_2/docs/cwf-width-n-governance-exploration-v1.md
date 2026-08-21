# CWF / yaprak — GENİŞLİKTEN BAĞIMSIZ GOVERNANCE · KEŞİF NOTU · v1

<!-- cwf-width-n-governance-exploration-v1 · 2026-08-04 · S81 · Architect: Claude (Opus 5).
     STATUS: **EXPLORATION — BAĞLAYICI DEĞİL.**
     Bu belge bir faz prompt'u DEĞİL, bir tasarım notu DEĞİL, bir register kalemi DEĞİL.
     Hiçbir SOTA ölçütü eklemez, hiçbir kalemi ertelemez, work board'a girmez.
     Sahip talimatı (S81): "bu sohbet exploration... kayıtlara girmesin... zamanı gelince
     tekrar açarız." Bu dosya o "tekrar açma" anının tek taşıyıcısıdır.
     Kaynak: S81 tek oturumluk mimari sohbeti (sahip + Architect), sıfır kod okuması,
     sıfır canlı ölçüm. İçindeki her cümle ARGÜMANDIR, SONUÇ DEĞİLDİR. -->

---

## §0 · BU BELGE NEDİR, NE DEĞİLDİR

**Nedir:** bir oturumluk felsefi + mimari keşfin damıtılmış hâli. Yaprak'ın uzun
vadeli tezinin, henüz inşa edilmemiş ama kaybedilmemesi gereken kısmı.

**Ne değildir:**
- Bağlayıcı değil. `cwf-master-rollout-plan-v*` değişmedi.
- Register kalemi değil. `cwf-open-items-register-v*` değişmedi. GOLDEN LEDGER'a
  hiçbir satır girmedi.
- Work board kalemi değil. `cwf-work-board-S74-v1` değişmedi.
- SOTA ölçütü eklemedi. `cwf-sota-definition-v*` değişmedi.
- Bir doktrin değil. Hiçbir ADR'yi değiştirmez, hiçbir kilitli yasayı yeniden açmaz.

**Sahibin konumu (S81, doğrudan alıntı ruhu):** *"daha tek agent'ı doğru dürüst
çalıştırmayı ve onu SOTA hâline getirmekten uzak noktadayız."* Ölçüm önce gelir —
"ölçülene kadar, bin defa daha ölçülene kadar." Bu belge o işin **önüne geçmez**.

---

## §1 · TEZ — bu belgenin tek en değerli çıktısı

Oturum, yanlış bir soruyla başladı ve doğru bir soruyla bitti.

**Yanlış soru:** "CWF tek ajan mı olmalı, çok ajan mı?"
**Architect'in hatası:** platform sorusuna uygulama cevabı vermek. "ARMES tur şekli
fan-out istemiyor" doğru bir cümledir ama *başka bir sorunun* cevabıdır.

**Doğru soru (sahip, S81):** *"CWF bugün manufacturing için kullanılan bir agent ama
o sadece bir uygulama alanı; asıl olan yaprak ne? Biz aslında governed agent
mimarisini yapıyoruz. Her workflow için 'single agent ile çöz' mü diyeceğiz?"*

### TEZ

> **Yaprak'ın tezi "governed agent" değil, "GENİŞLİKTEN BAĞIMSIZ governed agent"
> olmalıdır.** Aynı yasalar N=1'de de N=8'de de geçerli olmalı. **Genişlik bir
> PARAMETREDİR, bir yeniden yazım değil.**

Bunun doğrudan sonucu: sahip olduğumuz her şey — provenance, `empty≠zero`, araç-başı
kazanılmış güven, tek turn id, kapı — bir **topolojiden** bir **protokole** terfi
etmelidir. Topolojisi tek bir değere sabitlenmiş bir mimari, mimari değil;
bir konfigürasyondur.

**Ve CWF bugün bu protokolün genişlik-1 konfigürasyonudur.** Bu, bugünkü işin
küçümsenmesi değil — tersine, protokolün ilk ve zorunlu koşumudur.

### Neden bu kaçınılmaz (sahibin argümanı, kabul edildi)
Tek çekirdek her şeye yetseydi multi-core çıkmazdı; tek math processor yetseydi GPU
çıkmazdı. Paralellik mühendisliğin doğal bir sonraki adımıdır.

**Architect'in eklediği düzeltme — ve asıl ders:** multi-core "doğal adım" olarak
seçilmedi, **duvara çarpıldı** (Dennard ölçeklemesi ~2004'te bitti). Ve multi-core'u
mümkün kılan şey çekirdek sayısı değil, **bellek modeliydi**: cache coherence,
happens-before, memory barrier. Fan-out kolaydı; onlarca yıl yiyen şey **tutarlılık
sözleşmesiydi**. O sözleşme olmadan paralellik, hızlı yanlış cevap üreten bir makinedir.

> **Yaprak tam olarak budur: bir ajan değil, bir sözleşme.**

Üçüncü ders: kazananlar çekirdek ekleyenler değil, **programlama modelini tanımlayanlar**
oldu (pthreads → OpenMP → CUDA → actor modeli). Model her somut çipten uzun yaşadı.
Oturumun sahip tarafından işaretlenen cümlesi: **"CUDA'yı yazan kazandı, CUDA'yı
kullanan değil."**

---

## §2 · BEŞ PROBLEM — governed multi-agent'ın gerçekten çözülmemiş kısmı

Sahadaki herkes fan-out yapıyor. **Kimsenin yapmadığı şey, kanıtın hop'lardan sağ
çıkması.** Aşağıdaki beş kalem "yapılacak iş listesi" değil — **SOTA iddiasının
kendisidir.**

Her başlıkta aynı disiplin: *problem ne · naif cevap neden çöküyor · elimizde ne var ·
gerçekten eksik olan ne.*

---

### P1 · PROVENANCE KOMPOZİSYONU

**Problem.** Genişlik 1'de kanıt ayakta, çünkü zincir tek: tool result →
`rawToolResults` → deterministik evidence chip → render. Atıf **yapısaldır**
(mention → canonical_id → score → method) ve modelin kalemi ona hiç değmez.
Genişlik N'de sentezleyicinin girdisi N şeridin çıktısıdır. Bir şerit sonucu
sentezleyicinin prompt'una **metin** olarak girdiği an lineage yıkanır.

**Naif cevap neden çöküyor.** "Sentezleyiciden kaynak göstermesini isteriz" =
modelden kendi muhakemesi hakkında dürüst olmasını istemek. ADR-001'in runtime'da
yasakladığı şeyin ta kendisi. **Atıfı üreten ile atfı doğrulayan aynı organ olamaz.**

**Kırılma noktası — atıfın öznesi değişir.** Genişlik 1'de provenance *cevaba*
yapışabilir. Genişlik N'de sentezlenmiş bir cümle iki şeridi birden kullanır; yani
provenance artık bir kaynak değil bir **küme**, ve yapıştığı yer cevap değil **iddia**.
Kanıt bir *rozet* olmaktan çıkıp bir *tip* olmak zorundadır.

**Elimizde olan.** Evidence chip'in deterministik inşası (prose'dan parse edilmez) ·
dört hâl (`real-0 = veri` · `missing = boşluk` · `empty = "veri yok"` ·
`non-numeric = "grafiklenemez"`) · tek turn id (RULE-28) · MEASURE-READ-HONESTY-1'in
üç sözleşmesi (throw · null · numberOrNull).

**Gerçekten eksik olan — iki parça:**

- **(a) MERGE OPERATÖRÜ.** Şerit A "OEE = 0 (gerçek)" diyor, şerit B "okunamadı"
  diyor. Birleşik cevap ne der? Bugün tanımı yok. **Ve bu operatör LLM olamaz.**
- **(b) KAPSAM BEYANI** — asıl zor olan. Şerit C öldüyse cevap bunu söylemek
  zorundadır. Bu bir **negatif yükümlülüktür** ve negatif yükümlülükler ortada olana
  bakarak denetlenemez. Tek dürüst çözüm: kapsam ifadesi **plandan türetilir,
  modelden değil** — bariyer, "açtığım şeritler" ile "sonuç dönen şeritler" listesini
  kıyaslar ve farkı cevaba **yapısal olarak** iliştirir.

Devamı: sentezleyici çıktısına post-hoc deterministik doğrulama — cevaptaki her sayı
bir şeridin ham değerine eşleşmek zorunda; eşleşmeyen sayı işaretlenir. Evidence
chip'in aynısı, iddia-başı.

---

### P2 · GÜVEN BİLEŞİMİ — açık ara en zoru

**Problem.** ADR-010 araç-başı, gözlemlenmiş güven veriyor. Güvenilir bir şeritle
güvenilmeyen bir şeridin **birleşiminden** doğan iddianın güveni nedir?

**Naif cevap neden çöküyor.** `min()` üç ayrı yerde yanlış:
- **Bağlaç** (A ve B ikisi de gerekli) → `min` doğru.
- **Teyit** (iki bağımsız kaynak aynı şeyi söylüyor) → güven **artmalı**; `min` göremez.
- **Seçim** (cevap yalnızca A'yı kullandı) → B'nin düşük güveni cevaba **bulaşmamalı**.

Yani güven *cevap üstünde* bileşmiyor; **türetme grafiği üstünde** bileşiyor. Farklı
türetme şekli → farklı operatör.

**Teyitteki tuzak (bizde çok somut).** Teyit ancak kaynaklar **gerçekten bağımsızsa**
güveni artırır. Superset ile ARMES aynı MES tablolarını okuyor olabilir — o zaman
"iki kaynak da aynı şeyi söylüyor" bir teyit değil, **tek kaynağın iki kere
sayılmasıdır**. Teyit, kaynak sayısıyla değil **provenance örtüşmesiyle** iskonto
edilmelidir. → **Bu, P1'i P2'nin önkoşulu yapar.**

**Güven skaler değil.** Gözlenen davranış çok boyutlu: tazelik · kapsam doğruluğu ·
**kırpılmışlık** (PostgREST 1000 satır!) · beyan-davranış uyumu. Tek sayıya çökertmek,
tam da yük taşıyan boyutu kaybetmektir. Bileşim **bileşen-başı** yapılmalıdır.

**Asıl tehlike: GÜVEN AKLAMA.** Düşük güvenli bir şeridin sayısı, yüksek güvenli bir
şeridin hesabından geçip **yüksek güven giyerek** çıkar.

**Adı ve cevabı var: taint tracking** (Denning, 1976). Etiketler bir kafes üstünde
yaşar, yukarı serbestçe akar, aşağı **yalnızca açık bir declassification aktıyla**
iner. Ve bizim için güzel olan: *declassification bir kapı işidir.* Yani güven
bileşimi zaten kurulu makinenin diline birebir çevrilir — **ajan önerir, kapı
hükmeder.** Emergent bir merge sonucu olarak güven yükselemez; yükselmesi
**kaydedilmiş bir karar** olmak zorundadır.

---

### P3 · GENİŞLİK N'DE KAPI NEREDE DURUR

**Naif cevap neden çöküyor.** Ajan-başı kapı = N kapı = yanlış olabilecek N yer. Ve
daha kötüsü: **her şerit tek tek kurallara uygunken birleşim ihlal edebilir.** Bunun
adı konmuş: veritabanı çıkarım/agregasyon saldırısı. İki masum sorgu, birleştiğinde
hiçbirinin yetkili olmadığı bilgiyi verir. Bizde teorik değil — tenant-zero ve
ADR-012'nin SCOPE-CUT katmanı tam bu yüzeye bakıyor.

**Yapısal hediye.** ADR-011 sayesinde filtreli turlarda her şerit **salt okuma**.
Yani bariyerde durup birleşimi denetlemek *geç değil* — geri alınamaz hiçbir şey
olmadı. Çoğu sistemde çıkış kapısı güvensizdir; bizde güvenli. **Bedeli para,
güvenlik değil.**

**Şekil — iki katman, ajan seviyesinde hiçbir şey:**
- **Kabul kapısı (plan anında).** Fan-out'tan önce: şeritler var olan backend'leri mi
  adlandırıyor · araçlar read-annotated mı · genişlik tavanı aşılıyor mu · döngü var mı.
  Ucuz ve deterministik.
- **Kompozisyon kapısı (bariyerde).** Şeritleri değil, **join'i** denetler.

Ajan-başı kapı **bilerek yoktur** — kapsama *illüzyonu* üretir.
Yasa adayı: **kapı ajanı değil, sözleşmeyi kapatır.** (ADR-012 R-1'in devamı: etiket
valfin tanım yerinde yaşar.)

---

### P4 · DETERMİNİZM VE REPLAY

**Problem.** Paralel yürütme sıralamada nondeterministiktir; replay lens'leri ve
eval-gate tekrarlanabilirlik varsayar.

**Ayrım, ve çözümün tamamı burada.** *Varış sırası nondeterminizmi ≠ sonuç
nondeterminizmi.* Bariyerdeki merge **değişmeli ve birleşmeli** (commutative +
associative) ise, şeritlerin dönüş sırası sonucu etkilemez. O zaman **paralellik
determinizme sıfıra mal olur.**

Yani bu bir zamanlayıcı problemi değil, **merge fonksiyonu üstünde bir kısıttır.**
Bariyer şeritleri sabit bir anahtara göre sıralar; gerisi kendiliğinden gelir.
(Literatürdeki diğer yol — schedule'ı kaydet, log'a karşı replay et — bize kıyasla
pahalı ve gereksiz.)

**Nerede kırılır: timeout.** 5.0 sn'de zaman aşan bir şerit başka koşuda 5.1'de
dönerse sonuç değişir. Bu **onarılabilir değildir**; yalnızca dürüstçe
muhasebeleştirilebilir: **kapsam kümesi kaydedilmiş bir olgudur, yeniden türetilen
bir şey değil.** Replay, "o koşuda şu üç şerit döndü" bilgisini **girdi** olarak alır.

→ Bu, **P1(b) ile aynı nesnedir.** Kapsam beyanı hem dürüstlük hem determinizm
borcunu aynı anda öder.

---

### P5 · DELEGASYONUN KISIT ETİKETİ

**Problem.** ADR-012 dört katmanı tanımlar (INVARIANT / POLICY / SCOPE-CUT / CONFIG)
ve R-2 der ki: **yasa yapmadan önce katmanı adlandır.** Delegasyon bugün etiketsizdir —
çünkü yoktur.

**Etiketleme, doğrudan:**

| Kalem | Katman |
|---|---|
| fan-out genişlik tavanı | **CONFIG** (tool-round tavanının kardeşi, yönetimli param) |
| bir şeridin dokunabileceği backend kümesi | **SCOPE-CUT** |
| "delege şerit asla yazamaz" | **INVARIANT** (ADR-011'e biner) |
| "plan doğrulanmadan fan-out olmaz" | **INVARIANT** |
| "dış ajana / A2A'ya delege" | **POLICY** |

**İnce olan: delegasyon geçişlidir.** Şerit B'nin kendisi bir ajansa
(agent-as-backend), kısıt kümemiz aşağı **yayılmaz** — alt-ajanın içi opaktır
("agents all the way down"). Kısıtlar aşağıya *dayatılamaz*; yalnızca **talep edilir
ve gözlenir**. Bu, ADR-010'un beyan-gözlem ayrımının bir seviye yukarısıdır:
**alt-ajanın "kısıtlarınıza uyuyorum" demesi bir iddiadır, warrant değil.**

ADR-001 doktrini olduğu gibi genelleşir: *yalan söyleyen backend'i zararsız kıl* →
**yalan söyleyen alt-ajanı zararsız kıl.** Zaptetme makinesi zaten MCP sınırında
duruyor — multi-agent'ın doğru sınırının orası olmasının sebebi ideoloji değil,
**makinenin nerede kurulu olduğudur.**

**Valfin etiketi bir alan daha taşımalı:** `enforcement: local | demanded-and-observed`.

---

## §3 · SIRALAMA VE BAĞIMLILIKLAR

| | Problem | Elimizde olan | Gerçek boşluk |
|---|---|---|---|
| **P2** | Güven bileşimi | ADR-010 (yarısı) | Kafes + declassification aktı · bağımsızlık iskontosu |
| **P1** | Provenance kompozisyonu | Evidence chip · dört hâl | Merge operatörü · **kapsam beyanı** |
| **P3** | Kapı | ADR-011 hediyesi · ADR-012 R-1 | İki katmanlı kapı şekli |
| **P5** | Delegasyon etiketi | ADR-010 + ADR-012 | `enforcement` alanı |
| **P4** | Determinizm | — | Neredeyse bedava: **merge commutative olsun** |

**P1 ve P2 = SOTA iddiasının kendisi.** Fan-out'u herkes yapıyor; genişlik N'de kanıtı
ve güveni ayakta tutan mimari **yok**. P3/P5 elimizdekinin bir seviye terfisi.
P4 bir kısıt cümlesi.

**İki bağımlılık — bunlar bağımsız beş kalem DEĞİL:**
- **P1 → P2**: lineage taşınmadan bağımsızlık iskontosu hesaplanamaz.
- **P1(b) ≡ P4'ün timeout cevabı**: kapsam kümesi tek nesnedir, iki borcu birden öder.

---

## §4 · BİYOLOJİK MEKANİZMA HARİTASI — hangisi gerçekten iş gördü

Sahip, mikrobiyoloji/moleküler biyoloji seviyesinde provenance çözümleri içeren bir
belge getirdi. Aşağıdakiler **metafor değil**, tasarımı fiilen ilerleten üç mekanizma
ve iki uyarıdır.

### İş gören üç mekanizma

1. **DNMT1 (bakım metiltransferazı) → P1'in merge operatörü ZORUNLUDUR.**
   Epigenetik işaretler replikasyondan sonra otomatik devam etmez; hemimetile
   bölgeleri tanıyıp işareti yeni zincire **aktif olarak kopyalayan** bir enzim
   gerekir; o olmazsa işaret nesiller içinde seyrelir.
   → **Metadata dönüşümden bedava sağ çıkmaz.** Her hop (özetleme, agregasyon,
   yeniden render) bir replikasyon olayıdır ve türetilmiş nesneye provenance'ı
   yeniden iliştiren bir mekanizma gerektirir. Merge operatörü "iyi olurdu"
   sınıfından değil — **o, bakım metiltransferazıdır.**

2. **Hemimetilasyon / zincir ayrımı (MMR) → P2, P1'in önkoşuludur.**
   Mismatch repair'in çalışabilmesi için **hangi zincirin yeni olduğunu** bilmesi
   gerekir; zincir ayrımı olmasaydı tamir zamanın yarısında **doğru zinciri bozardı.**
   → **İki şerit çeliştiğinde hangisinin düzeltileceğine karar vermek için otorite
   sıralaması gerekir, ve o sıralama provenance'tan gelir.** "P1 → P2" bağımlılığı
   böylece iddia olmaktan çıkıp mekanizma seviyesinde zorunluluk olur.

3. **PAM / self-nonself ayrımı → karantina işareti verinin YANINDA taşınır.**
   CRISPR'ın kendi hafıza dizisine saldırmasını önleyen şey PAM motifidir; o olmasa
   sistem otoimmün olur.
   → **Yalanın kaydı, yalanın kendisiyle karıştırılmamalıdır.** Kötü backend çıktısını
   denetim için ledger'a yazarız; başka bir bileşen onu okuyup veri sanabilir.
   Karantina işareti verinin **yanında** taşınmak zorundadır — içinde değil, sonradan
   bakılan bir yerde değil.

### Destekleyici iki gözlem

4. **Endosimbiyoz → işlev birleşir, soy birleşmez.** mtDNA 1.5 milyar yıldır ayrı
   izlenebilir. P1'in cevabı tek cümlede budur: *cevabı sentezlersin, provenance'ı
   sentezlemezsin.* **Ama bedava değil:** mitokondriyal genlerin çoğu evrim boyunca
   çekirdeğe göç etti (~1500 → 37). Soy ayrımı **entegrasyon baskısı altında aşınır**;
   aşınmayı durduran şey **zardır** (fiziksel bölmelenme).
   → **Provenance bir sözlükte ALAN ise göç eder ve seyrelir; bir BÖLME (tipli zarf)
   ise hayatta kalır.**
   Ek: *heteroplazmi* — hastalık ancak belli bir orandan sonra çıkar. Karışık kaliteli
   kanıtın doğru modeli skaler değil, **eşikli bir popülasyondur.**

5. **Proofreading katmanları → P3'ün iki katmanlı kapısının bağımsız teyidi.**
   Üç bağımsız katman (baz seçim ~10⁻⁵ → +ekzonükleaz ~10⁻⁷ → +MMR ~10⁻⁹). Toplam
   ~10¹⁰ iyileşme **bileşimden** gelir, tek mükemmel doğrulayıcıdan değil. Ve
   proofreading **yerel + anlık**, MMR **post-hoc + yerel değil** — iki farklı zaman,
   iki farklı kapsam.

### Belgede olmayan, oturumda eklenen iki büyük şey

- **FAIL-STOP.** Doğanın doğrulanamayan duruma cevabı uyarı değil, **durmaktır**
  (checkpoint'ler, p53, apoptoz). Bu S61-2'nin biyolojik hâlidir: *bozuk bir şeyin
  üstündeki uyarı etiketi bir düzeltme değildir.* Ajan sistemlerinin neredeyse
  tamamında eksik olan şey budur — hepsi her koşulda bir cevap üretir.
  → **Genişlik N'de REFÜZ birinci sınıf bir sonuç olmalıdır.** Olmazsa mimari
  provenance'ı koruyamaz, çünkü boşluğu doldurmaktan başka çaresi kalmaz.
- **BEDEL.** Proofreading replikasyonu yavaşlatır; bağışıklık devasa enerji yer; R-M
  sistemleri yararlı geni de keser. Doğa provenance için **sürekli ve büyük bir vergi**
  öder ve karşılığında ilk virüsle yok olmayan bir organizma alır.
  → Amdahl notunun karşı ağırlığı: **governance turun seri kesridir** (entity çözümü,
  zaman aralığı, politika, kapı), yani paralel tavanımız yönetişimsiz bir sürününkinden
  **yapısal olarak düşük** olacaktır. Buna karşılık verdiğimiz şey onların veremediği
  tek şeydir: cevabın nereden geldiği. Çözüm governance'ı paralelleştirmek değil —
  **governance'ın ALTINDA paralelleştirmek.**

### Analojinin reddedilmesi gereken iki yeri

- **Popülasyon vs cevap-başı.** Doğanın garantileri istatistikseldir; bakteri
  popülasyonun %99'unu kaybetmeye razıdır. Bizim provenance garantimiz **cevap başına**
  olmak zorundadır. Doğanın "olasılıksal yeterli" dediği yerde biz "deterministik
  zorunlu" ihtiyacındayız.
- **Ağaç değil, DAG.** HGT yüzünden bakteriyel filogeni bir ağaç değil bir **ağdır**;
  "tek soy" kavramı orada çöker. Evidence chip bugün ağaç-benzeri bir yapı varsayıyor
  (mention → canonical_id → score → method). Genişlik N'de, birbirine referans veren
  şeritlerle bu bir **DAG**'a döner ve "bu nereden geldi" sorusunun tek yollu bir
  cevabı kalmaz. **Bu, P1'in bugün adlandırılmış ama çözülmemiş en derin kısmıdır.**

---

## §5 · AYAKTA KALAN HÜKÜMLER

1. **LangGraph'a HAYIR.** (Zaten raf kararı; sahip açtı, yeniden değerlendirildi,
   pozisyon güçlendi.) Gerekçe tek cümlede: **sen bir SÖZLEŞME yazıyorsun, LangGraph
   bir MOTOR satıyor.** Motor sözleşmeyi taşımaz, sözleşmeyi kendi state modelinin
   içine gömer — ve yaprak üçüncü partiye kiracı olur. Multi-core dersinin tam tersi.
   Somut faturalar: eval-gate'in byte-özdeşlik öznesi üçüncü parti sürümüne kayar ·
   FULL-TRACE guard göremediği bir sınırı denetleyemez · ikinci runtime `BENCH-A2A-1`'in
   paketleme yüzeyini ikiye katlar · ikinci stateful motor `BENCH-RESET-1`'in (C3)
   kapatması gereken yeni bir durum yüzeyi yaratır.
   **Bunun yerine kelime dağarcığını al, bedava:** node · tipli state kanalı + reducer ·
   koşullu kenar · bariyer/join semantiği · checkpoint.
   **LangGraph'ı gerçekten hak ettirecek tek tetik:** iş, isteğin ömrünü aşarsa. O gün
   bile ilk bakılacak yer dayanıklı-yürütme motorlarıdır (Temporal/Inngest sınıfı).

2. **Fan-out EVET — ama ajan sürüsü olarak değil.** Bizim paralellik yolumuz
   muhtemelen `turn_context` (A23 5.2, "güven taşıyan tur-içi tahta") üstünde
   **fan-out edilmiş şeritlerdir**. Dibia taksonomisinde bu hâlâ *workflow pattern with
   parallel execution* — en yüksek güvenilirlik çeyreğinden çıkmadan kazancın büyük
   kısmını (bağlam izolasyonu + paralel latency) almak. Tek `streamText` yasası
   kırılmaz: alt-araştırmalar **getirme** işidir, üretim değil; tek üretim sitesi
   sentezde kalır.

3. **Sınıflandırma yeni bir planlayıcı istemiyor.** Doğru soru "bu iş paralel mi?"
   değil, **"B'nin girdisi A'nın çıktısına referans veriyor mu?"** (Bernstein).
   ADR-011 sayesinde her şerit salt okuma → *anti* ve *output* bağımlılıkları
   **yapısal olarak imkânsız**; geriye yalnızca *flow* kalır. Ve şeklimiz genel DAG
   değil, **üç fazlı**: seri önek (entity çözümü, zaman aralığı) → fan-out (backend
   partition) → bariyer → sentez.
   **Taahhütlü yol: router zaten partition'ı üretiyor** — IR frame → `deriveCategories`
   → backend başına aday araç seti. Aday seti iki backend'e yayılıyorsa fan-out planı
   zaten oradadır. Yeni completion sitesi sıfır.
   ⚠ **Bu iddia GREP'LENMEDİ.** Yeniden açılışta ilk doğrulanacak şey budur.

4. **Federasyon zaten planda ve bedava.** `BENCH-A2A-1` (rollout 2.5) + agent-as-backend
   (`backend identity is DATA` → uzman ajanı MCP sunucusu olarak mount = sıfır kod).
   ADR-010/011/012 çalışmaya devam eder çünkü **delegasyon bir tool call'dur.**
   Bu belgedeki "genişlik" tartışması bunu değiştirmez; onun üstüne biner.

---

## §6 · ARCHITECT'İN OTURUM İÇİNDE GERİ ÇEKTİKLERİ (errata — silinmez)

Dürüstlük kaydı; gelecekte aynı hataların tekrarlanmaması için tutuluyor.

1. **"Tek ajan bizim için doğru cevap."** → GERİ ÇEKİLDİ. Uygulama seviyesinde
   savunulabilir, **platform seviyesinde savunulamaz.** Kategori hatası: platform
   sorusuna uygulama cevabı.
2. **"Doğada tekerlek yok."** → GERİ ÇEKİLDİ. Bakteriyel flagellum ve ATP sentaz
   gerçek rotor-stator sistemleridir. Doğa dönen makineyi **buldu** ve ölçek
   büyüdüğünde **terk etti** — bu, sahibin tezini destekler, benimkini değil.
3. **"Hiçbir organizma EM ile haberleşmiyor."** → GERİ ÇEKİLDİ. Elektrikli balıklar
   alan modüle ederek haberleşir; köpekbalığı µV/cm algılar; kuş manyetorasepsiyonu
   muhtemelen kuantum spin dinamiğine dayanır.
4. **Dolanıklık üstüne kesin hüküm.** → YUMUŞATILDI. No-communication teoremi
   *kuantum mekaniği doğruysa* geçerlidir — teorinin içinde bir sonuç, teorinin
   üstünde bir gerçek değil. Sahibin itirazı kayıtlıdır ve konu kapatılmamıştır.
   (Yine de mimari için taşınan ders geçerli: **korelasyon nedensellik değildir** —
   P2'nin bağımsızlık iskontosu tam bu ayrımın üstünde durur.)

**Geri çekilmeyen tek çivi:** doğa problemin çözümünü bulmuş olabilir ama **bizim
problemimizi hiç sormadı.** Hayatta kalma "doğru cevabı" gerektirir; **kanıtlanabilir
doğru cevabı** gerektirmez. Provenance, denetlenebilirlik ve tekrarlanabilirlik
hayatta kalma baskısı altında ortaya çıkmaz — ölen geri bildirim vermez. Beyin muazzam
hesap yapar ama kendi çıkarımının kaynağını raporlayamaz (konfabülasyon; split-brain
bulguları): **akıcı ama uydurulmuş gerekçe.** ADR-001'in "runtime'da LLM yargıç olmaz"
yasası tam olarak buna karşıdır.
→ **Yaprak'ın yaptığı şey: doğanın hiç ihtiyaç duymadığı bir garantiyi, doğanın
çözdüğü mekanizmalarla inşa etmek.**

---

## §7 · YENİDEN AÇILIŞ — ne olursa bu belge masaya döner

**Sahip talimatı: yalnızca sahip açar.** Aşağıdakiler Architect'in kendiliğinden iş
açma gerekçesi DEĞİLDİR; sahibin karar anında bakacağı sinyallerdir.

**Ön koşul (sahip, S81):** tek ajanın SOTA hâline getirilmesi. Bu belge o işin önüne
geçmez ve onunla yarışmaz.

**Ölçülebilir tetikler** (üçü de sayı, sezgi değil; ham maddesi bugün
`telemetry_events` + Langfuse'da mevcut):

1. **Bağlam tavanı.** Backend sayısı 2 → 4'e çıkıyor (ARMES · Superset · RAG ·
   web valve). Domain pack'ler tek prompt'a sığmamaya başladığı gün bu argüman
   kendiliğinden kazanır. **En yakın olan budur ve Blok 2B ile geliyor.**
2. **Gerçek paralellik talebi.** Turların anlamlı bir yüzdesi ≥2 alana dokunuyorsa ve
   tool-round tavanına çarpma oranı yükseliyorsa.
3. **Routing tavanı.** Kategori routing'den sonra Recall@k hedefin altında kalırsa.

**Okunacak dört gözlem:** backend-çeşitliliği oranı (≥2 alana dokunan tur %'si) ·
tool-round tavanına çarpma oranı · sentez anında bağlam doluluğu · çok-alanlı turların
latency kuyruğu.

**Dış alet:** **Gaia2** zaten "dinamik, asenkron ortamlar" ölçüyor. Bu şeklin
eksikliğini bize kendi görüşümüz değil, o benchmark söyler.

---

## §8 · SOTA-1 POZİSYONU (açık, kaçamaksız)

İç orkestrasyon bugün `cwf-sota-definition-v1_3` §3'teki **hiçbir ölçütü
ilerletmiyor**. Bunu *"gerek yok / trafik az / sonra"* diye söylemiyorum — o gerekçe
Architect'e yasaktır. **§1 simetri maddesi gereği** hüküm açıkça masadadır ve karar
sahibindir: **(i) düşür · (ii) önkoşul olarak adlandır · (iii) hizmet ettiği ölçütü
ekle.**

**Sahip S81'de hiçbirini seçmedi ve seçmesi de istenmedi.** Kalem ertelenmedi;
**hiç açılmadı.** Bu belge açılmamış bir kalemi saklar, ertelenmiş bir kalemi değil.

Ölçüt eklemenin bedeli kayıtlıdır: eklenen her ölçüt **ölçülmek zorundadır** ve
Blok 3'ün bütçesine biner (sözleşme R4).

---

## §9 · EPİSTEMİK ETİKET

Bu belgedeki **hiçbir cümle ölçülmüş değildir.** Kod okunmadı, canlı state okunmadı,
grep yapılmadı. §5.3'teki "router zaten partition üretiyor" iddiası dahil, her teknik
önerme **iddiadır (TOTAL-45 / S59-2).** Yeniden açılışta ilk iş, bu belgeyi bir
premise gibi kullanmak değil, **canlı okumayla doğrulamaktır (S65-1, D-1
RECON-FIRST).**

Ve program katmanı yasası, kendimize: **sistem hakkında ölçülmemiş bir iddia bir
argümandır, bir sonuç değil — kendi düzyazında öyle etiketle.**

---

<!-- END · cwf-width-n-governance-exploration-v1 · 2026-08-04 · S81 · EXPLORATION, NOT BINDING -->
