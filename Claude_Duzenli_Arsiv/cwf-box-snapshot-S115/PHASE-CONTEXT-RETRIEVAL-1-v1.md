# PHASE-CONTEXT-RETRIEVAL-1 · v1
<!-- 2026-08-21 · S112. Sahip onayı: "arch onay" (2026-08-21T06:1xZ).
     Bu belge, S112 açılışında ÖLÇÜMLE eksik bulundu: fazın adı iki taşıyıcıda
     geçiyordu, dokümanı yoktu. S91 tamlık kapısı gereği kart bu belge
     yazılmadan kesilmez. -->

## §0 · NEDEN BU BELGE VAR

Sahip hükmü, S110, kelimesi kelimesine:

> *"retrieval'i da bir sonraki turda yap ama mutlaka yapılmalı, skip sakın."*

S112 açılışında ölçüldü: hüküm iki taşıyıcıda **adıyla** yaşıyordu, **belgesi hiç yazılmamıştı.**
Bir faz, adı olup gövdesi olmayınca her oturumda "sıradaki" kalır ve hiç başlamaz. Bu belge o
boşluğu kapatır.

**Ölçülmüş öncüller (S112 açılışı, hepsi canlı):**

| Öncül | Değer | Nasıl ölçüldü |
|---|---|---|
| Vektör motoru | `vector.engine='qdrant'` published `2026-08-17T18:02:17Z` | Supabase `domain_rules` |
| Korpus bugün | **342 kayıt / 8 koleksiyon, HEPSİ araç açıklaması + governed knowledge** | `vector_index_digest` `group by collection` |
| Doküman korpusu | **SIFIR** — tek yasa, ADR, mimari belge ya da oturum arşivi yok | aynı sorgu |
| Korpus çiti | `ALLOWED_CORPORA` **kapalı liste, iki eleman**; `isCorpusAllowed` tek admission yolu | `vectorLane/corpora.ts` okundu |
| Encoder sırası | `EncodeClass = 'query' \| 'index'`, zorunlu parametre, kapıda ret | `vectorLane/admission.ts` okundu |
| Üçüncü sınıf | **YOK.** Dosyanın kendi cümlesi: *"üçüncü bir sınıf, bu ikisine karşı nasıl sıralanacağına dair bir kural ister"* | aynı dosya |
| Arşiv deposu | `maymun207/2026-Yapra-DDocuments` (private). **Ad kasıtlı, sahip teyit etti.** | sahip beyanı |
| Architect erişimi | **YOK** — `git ls-remote` kimlik bulamadı | ölçüldü, `2026-08-21T06:2xZ` |

---

## §1 · BU FAZIN ETRAFINDA KURULDUĞU RİSK — sahip bunu ayrıca emretti

Architect'in kendi uyarısı, sahip tarafından bağlayıcı kılındı:

> **Arşiv üstünde retrieval Architect'i daha ÖZGÜVENLİ yapar — daha DOĞRU yapmaz.**
> Korpus emekli olmuş kararlarla doludur. S102'nin *"5/7"*si oradadır. *"Valf kapalı"* oradadır.
> v113'ün göç iddiası oradadır. **S112'de yakalanan yanlışların hepsi o arşivde yazılı durur.**
> Bir isabet alıntılandığında **alıntı kanıt gibi görünür** ve gerçek bir belgeden geldiği için
> **sahte bir sağlamlık** taşır. S112'de *"5/7"* hatasının yakalanabilmesinin sebebi iki bağımsız
> kaynağın **karşılaştırılması** oldu. Retrieval birincisini verip ikincisini vermezse **o refleksi
> öldürür.**

Bu risk bir uyarı değil, bu fazın **kabul kriteridir**. Aşağıdaki §2 organı tarif eder; **§3 onu
meşru kılan tek şeydir.** §3 olmadan inen bir organ, bu projeye bugüne kadar yapılmış en pahalı
hasarı verir: **yanlış bir öncülü, kaynak göstererek sunmak.**

**Bu yüzden sıra bağlayıcıdır: §3'ün kapıları ÖNCE iner. Organ, kapılar yeşilken silahlanır
(karanlık iniş, `C-7`).**

---

## §2 · ORGAN — ne inşa edilir

**TEK-ORGAN korunur.** Projenin kendi Qdrant'ı. İkinci bir vektör deposu kurulmaz: iki depo iki
ranker demektir, iki ranker aynı satırlar hakkında iki fikir demektir — `FORBIDDEN_CORPORA`'nın
`entity_registry` için yazdığı gerekçenin aynısı.

**Ad uzayı ikiye ayrılır:**

| Ön ek | Kim yazar | Kim okur |
|---|---|---|
| `cwf__*` | mevcut indeksleyici | **yalnız tur yolu** |
| `arch__*` | arşiv indeksleyicisi (YENİ) | **yalnız Architect** |

**Erişim yüzeyi: `cwf-ground-mcp` — salt-okuma MCP sunucusu.**

Neden REST + `web_fetch` değil, üç sebep, hepsi ölçülmüş kısıt:
1. `web_fetch` gövde gönderemez → sorgu **ve kimlik** URL'e gömülür → token her transkriptte kalır.
2. Yapılandırılmış hata sınıfı yok → `UNKNOWN` ile `boş sonuç` ayrımı taşınamaz. O ayrım bu
   projenin en pahalı dersidir (`GI-015`).
3. Aletin kullanımı **ölçülemez** → kapı kurulamaz. MCP aracı normal bir araçtır; çağrısı
   sayılabilir, kısıtlanabilir, test edilebilir.

**Üç araç, fazlası değil:**

| Araç | Döndürür |
|---|---|
| `ground_search(query, corpus, k)` | isabetler — **her biri §3 zarfıyla** |
| `ground_get(id)` | tek belge — **§3 zarfıyla** |
| `ground_corpora()` | ne var, kaç kayıt, **en son ne zaman beslendi** |

**Yazma yolu YOKTUR** — konfigürasyonla değil, inşa yoluyla. Sunucuda yazan bir kod yolu bulunmaz.

---

## §3 · TAZELİK SÖZLEŞMESİ — bu fazın omurgası

### §3.1 · Arşivde ÜÇ belge sınıfı vardır ve üçü FARKLI hüküm alır

Hepsini aynı şekilde döndürmek riskin ta kendisidir.

| Sınıf | Örnek | Hüküm | Anlamı |
|---|---|---|---|
| **TAŞIYICI** | `register-v108`, `bug-bucket-v41`, `INSTRUCTIONS-v5_6`, `BOOTSTRAP-v106` | `SUPERSEDED-BY <kardeş>` ya da `HEAD` | Sürüm ailesi. **Yalnız en yükseği canlıdır.** |
| **ANLIK GÖRÜNTÜ** | `CWF-S110-SESSION-CLOSE`, recon notları, ölçüm raporları | `HISTORICAL@<çapa>` | **Asla emekli olmaz** — bir ANIN doğrusudur. "Yanlış" değil, "o zamanki". |
| **KARAR** | `KARAR-*`, `PHASE-*`, ADR | `STANDING` ya da `RETIRED@<kanıt>` | Açıkça emekli edilene kadar yaşar. |

Bir anlık görüntüyü `SUPERSEDED` diye işaretlemek yanlıştır (o bir kayıttır), bir taşıyıcıyı
`STANDING` diye döndürmek ise **tam olarak S112'de yakalanan hatadır**.

### §3.2 · HÜKÜM OKUMA ANINDA HESAPLANIR — indeksleme anında ASLA

Bu, S112'nin en pahalı dersinin doğrudan uygulanmasıdır
(`F-S112-GROUND-STAMP-PREDATES-CONTENT-1`): **bir damga, jeneratörün koştuğu anı adlandırır,
içeriğin bugünkü doğruluğunu değil.**

Vektör yükü (payload) yalnız **değişmeyeni** taşır: `familyId` · `ordinal` · `class` ·
`sourcePath` · `commitSha` · `indexedAt`.
`SUPERSEDED` / `HEAD` hükmü **her sorguda yeniden hesaplanır**, aile dizininden.

**Sebep:** `v116` indiği an, `v115` hakkında indeksleme zamanında yazılmış her "HEAD" etiketi
yalana döner ve **kimse fark etmez.** Hükmü yüke gömmek, bu fazı bu oturumda düzelttiğimiz hatanın
bir kopyası yapar.

### §3.3 · AİLE TAMAMLAMA — refleksi öldüren şeyin panzehiri

**Sahip riskinin çekirdek mekanizması budur.**

Öldürücü senaryo: sorgu `v108`'in kelimeleriyle eşleşir; `v115` aynı şeyi **farklı kelimelerle**
yazdığı için eşleşmez; Architect yalnız `v108`'i görür ve karşılaştıracak ikinci kaynağı hiç
bilmez.

**Kural: bir sürüm ailesinin herhangi bir üyesine gelen isabet, o ailenin BAŞINI sonuç kümesine
ZORLA sokar — başı sorguyla eşleşmese bile.**

```
ground_search("SOTA kapısı kaç")
  → hit: register-v112 §4 "5/7"      verdict SUPERSEDED-BY register-v115
  → FORCED: register-v115 §4         verdict HEAD  (sorguyla eşleşmedi, aile yüzünden geldi)
```

Bu, S112'de kazara yapılan karşılaştırmayı **imal eder**. Şansa bırakmaz.

Aynı kural anlık görüntülere uygulanmaz — bir oturum kapanışının "başı" yoktur. Onun yerine
**çapa** taşır: *"bu S110'un durumudur; bulunduğun oturum S112'dir."*

### §3.4 · ÜÇÜNCÜ DEĞER — hesaplayamıyorsa hüküm vermez

`GI-015`'in düzeltmesiyle **aynı şekil**: bakamamak ile bakıp hayır bulmak farklı cevaplardır.

Bir isabetin ailesi, sınıfı ya da çapası hesaplanamıyorsa, isabet:
- **sessizce düşürülmez** (yokluk kanıtı üretir),
- **çıplak döndürülmez** (sahte sağlamlık üretir),
- **`UNKNOWN` hükmüyle ve SEBEBİYLE** döndürülür.

`UNKNOWN` bir isabet, Architect'in düzyazısında **öncül olarak kullanılamaz**; yalnız *"şuraya
bakılmalı"* işareti olarak kullanılabilir.

### §3.5 · KAYNAK SINIFI — dairesel kanıta karşı

Arşiv, sahibin geçmiş talimatlarını **ve Architect'in geçmiş düzyazısını** birlikte tutar.
Architect'in kendi eski cümlesini kanıt diye alıntılaması **dairesel kanıttır** ve projenin
`TÜREV KAYNAĞIN YERİNE GEÇMEZ` yasasının doğrudan ihlalidir.

Her isabet bir **kaynak sınıfı** taşır:

| Sınıf | Ağırlık |
|---|---|
| `OWNER` — sahibin kendi sözü | en yüksek |
| `MEASURED` — damgalı ölçüm artefaktı | yüksek |
| `ARCHITECT` — Architect düzyazısı, hüküm, kart | **en düşük — tek başına kanıt DEĞİL** |

Bir iddia yalnız `ARCHITECT` sınıfı isabetlere dayanıyorsa, cevapta **adıyla** öyle etiketlenir.

### §3.6 · SÖZLEŞMENİN ÖZETİ — bir isabetin dönebilmesi için

Bir isabet §3'ün **beş alanını da** taşımadan dönmez: `class` · `verdict` · `anchor` ·
`sourceClass` · `familyHead` (varsa). Taşımıyorsa `UNKNOWN`.

> *"En tam tanıklı ifade kazanır"* yasasının retrieval'deki hâli budur. Organ bunsuz kurulursa
> yasa, **tam da ona en çok ihtiyaç duyulan yerde** çalışmaz.

---

## §4 · İZOLASYON ÇİTLERİ — CWF ürünü bozulmadan

**Çit 1 — Korpus listesi ikiye bölünür, kesişim BOŞ.**
`ALLOWED_CORPORA` bugün kapalı bir listedir ve öyle kalır; yanına `ARCHITECT_CORPORA` gelir.
Tur yolu `arch__*` adlandıramaz; Architect `cwf__*` adlandıramaz. **Kesişimin boşluğu bir testle
kanıtlanır** — yorumla değil.

**Çit 2 — Kimlik uzayı zaten ayrı.**
CWF kayıtları `<backendId>:tool:<ad>` / `<backendId>:rule:<kind>:<key>` olarak mintlenir; hepsi
backend-scoped. Arşiv kayıtları `arch:<familyId>:<ordinal>:<chunk>` olur. **Backend'i yoktur** —
mevcut şekle uymaz, kazara karışamaz.

**Çit 3 — Kullanıcı verisi hâlâ yasak.**
`FORBIDDEN_CORPORA` (`episodes`, `semantic_memory`, `entity_registry`) **değişmez.** Bu faz
oraya dokunmaz. Dosyanın gerekçesi aynen geçerlidir: *"bir vektörle birlikte hiçbir RLS politikası
seyahat etmez."*

**Çit 4 — Depo/çalışma-zamanı ayrımı korunur.**
`corpora.ts`'in kendi hükmü: *"tenant-zero PUBLIC REPOSITORY'yi korur; vektör deposu bir
çalışma-zamanı deposudur, repository değil."* Arşiv **private** olduğu için `GI-001`'in engeli
düşer — ama **public repo kuralı değişmez ve mutlaktır**: hiçbir fixture, yorum, rapor ya da
commit mesajına tenant kelimesi girmez, bu belge dahil.

---

## §5 · ENCODER — üçüncü sınıf ve neden EN ALTTA

`admission.ts` bugün iki sınıf tanır ve *"üçüncü bir sınıf bir kural ister"* der. Kural budur:

```
EncodeClass = 'query' | 'index' | 'archive'
öncelik:      query   >   index  >  archive
```

**`archive` neden `index`'in bile ALTINDA:** encoder tek işçidir, sıralıdır ve bu **kasıtlıdır** —
bayt-aynılık ona bağlıdır. Bir fabrika operatörünün sorusu bekliyorken Architect'in geçmiş
araması sıraya giremez. Onboarding bile Architect'ten önce gelir: onboarding bir müşteriyi
çalışır hale getirir, Architect'in araması bir kolaylıktır.

Determinizm sözleşmesine **dokunulmaz**: iş hâlâ tek seferde bir tane koşar. Değişen tek şey
**hangi işin sırada olduğudur**.

---

## §6 · KİM BESLER — Architect DEĞİL, ve bu ölçülmüş bir kısıttır

**Ölçüldü, `2026-08-21T06:2xZ`:** Architect'in kabı private depoya erişemez
(`could not read Username for 'https://github.com'`). Bu bir yokluk kanıtı değildir — depo
dolu olabilir; **Architect bakamaz.**

`S102-YASA-1` gereği bu iş sahibe taşınamaz. Dolayısıyla:

> **Arşiv indeksleyicisi bir ŞERİT ya da CI işidir.** Şeritlerin GitHub erişimi vardır.
> Architect **yalnız okuyan** taraftır (MCP üstünden), **besleyen** taraf değildir.

Bu, kaza sonucu daha temiz bir tasarımdır: besleyen ile okuyan farklı şeritler olduğu için
**Architect'in korpusu kendi lehine şekillendirmesi yapısal olarak imkânsızdır.** Bu özellik
belgeye kasıtlı olarak yazılır ve ileride "kolaylık olsun" diye kaldırılamaz.

---

## §7 · KABUL — hepsi İKİ YÖNLÜ, hiçbiri gözlemle değil

`D-5` gereği her kapı hem masum hem suçlu vakayı gösterir. Tek yönlü yeşil hiçbir şey kanıtlamaz.

| # | Kapı | Masum (YEŞİL olmalı) | **Suçlu (KIRMIZI olmalı)** |
|---|---|---|---|
| 1 | Aile tamamlama | `v3`'ün kelimeleriyle sorgu, sonuçta `v7` **HEAD** olarak var | fixture'da `v7` var ama sonuçta yok → **kapı kırmızı** |
| 2 | Hüküm okuma anında | `v8` indekslendikten sonra `v7` sorgusu `SUPERSEDED` der | hüküm yükten okunuyorsa `v7` hâlâ `HEAD` der → **kırmızı** |
| 3 | Üçüncü değer | ailesi çözülemeyen isabet `UNKNOWN` + sebep döner | çıplak ya da sessizce düşmüş → **kırmızı** |
| 4 | Korpus kesişimi | Architect `arch__*` okur | Architect `cwf__*` isteyince **reddedilir** → istek geçerse **kırmızı** |
| 5 | Sınıf ayrımı | oturum kapanışı `HISTORICAL@S110` döner | `SUPERSEDED` dönerse → **kırmızı** |
| 6 | Kaynak sınıfı | Architect düzyazısı `ARCHITECT` etiketli döner | etiketsiz dönerse → **kırmızı** |
| 7 | Encoder sırası | `archive` işi, bekleyen `query` ve `index` işlerinden **sonra** koşar | önce koşarsa → **kırmızı** |
| 8 | Salt-okuma | sunucuda yazan kod yolu **yok** | herhangi bir yazma yolu → **kırmızı** |

**Kapı 1 ve 2 bu fazın kalbidir.** Diğer altısı geçip bu ikisi geçmezse faz **başarısızdır** ve
organ silahlanmaz.

---

## §8 · BU FAZIN YAPMADIKLARI — sessizlik davet değildir

- `vector.toolRetrievalMode`'a **dokunmaz.** ⑦ Yol B ayrı bir kalemdir.
- `FORBIDDEN_CORPORA`'yı **genişletmez.**
- Encoder'ı eşzamanlı **yapmaz** — yalnız sıralamayı değiştirir.
- Public repoya tenant kelimesi **sokmaz.**
- Arşive **yazmaz** — arşiv sahibin deposudur, organ onu yalnız okur.
- `#82b` Design-RAG'ı **kapsamaz** — aynı organa binecektir ama **kendi kartıyla**, kendi kabul
  kriteriyle. (Parkta kalır; `ASLA UNUTMA` hükmü sürer.)

---

## §9 · ŞERİT DAĞILIMI — dört kalem

| Kalem | İş | Sınıf |
|---|---|---|
| **A** | Aile/sınıf/çapa çıkarıcı + **okuma anında** hüküm hesabı (§3.1–§3.2) | **FLOOR** |
| **B** | `ARCHITECT_CORPORA` ayrımı + kesişim testi + `arch:` id şeması (§4) | **FLOOR** |
| **C** | `EncodeClass` üçüncü sınıfı ve sıralama kanıtı (§5) | **FLOOR** |
| **D** | `cwf-ground-mcp` salt-okuma sunucu + üç araç + arşiv indeksleyicisi (§2, §6) | PAYLOAD |

**KARANLIK İNER (`C-7`):** A, B, C zemindir ve **hiçbir tüketici beklemeden** iner. D onlara karşı
inşa edilir. Dalganın **son commit'i** organı silahlandırır ve o commit kanıtı **iki ortamda**
taşır.

**Adres ataması YOKTUR** (`C-3`) — kartta hangi şeridin hangi kalemi alacağı yazılır, kimlik
iddiası yazılmaz.

---

## §10 · SIRA VE ÖN KOŞUL

**ÖN KOŞUL:** `PHASE-ARCHITECT-CARD-GRAMMAR-1` iner (item E dahil). Sebep: bu faz **çok kalemli
ve çok şeritli**; S111'in altı kusurlu turu tam olarak bu şekilde bir dalgada üretildi. Gramer
kapısı yokken bu kartı kesmek, düzeltmeye çalıştığımız hatayı bilerek tekrarlamaktır.

**Ayrıca:** kart kesilmeden önce arşiv deposunun **envanteri ölçülür** (kaç dosya, hangi aileler,
hangi sınıflar). Envanter olmadan yazılan bir çıkarıcı, tahmin edilmiş bir şemaya yazılmış olur —
ve tahmin, bu belgenin karşı kurulduğu şeydir. **Envanteri bir şerit ölçer, Architect değil (§6).**

<!-- END PHASE-CONTEXT-RETRIEVAL-1-v1 -->
