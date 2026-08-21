# PHASE-ARCHITECT-GROUND-TRUTH-1 · v1
<!-- 2026-08-20, S110 kapanışında yazıldı. SAHİP ONAYLI (kapsam · docs/ground · yedi soru).
     S111'in 1 NUMARALI KARTI — bundan önce başka bir şey yapmak vakit ve para kaybıdır.
     Bu belge, register v114 onları emene kadar §6 ve §7'deki kalemlerin KANONİK evidir
     (v113 mühürlendikten sonra alındı; sunulmuş artefakt değişmez — S37-1). BÜTÜN yazıldı. -->

## §0 · SAHİBİN GEREKÇESİ (kelimesi kelimesine, S110)

> *"Aklını kaybeden bir mimarla köprü yapılmaz, dolayısıyla biz bunu fix etmek mecburiyetindeyiz
> ve seni pril pril hafızaya kavuşturacak altyapıyı inşa etmeliyiz. Bu olmadan başka bir şey
> yapmak vakit ve para kaybı."*

Ve teşhis: *"Her yeni session'da gidip bir kısmını okuyorsun, o dokümanları bölük pörçük
session'dan session'a özetleye özetleye gidiyorsun, her özette fidelity kaybediyorsun."*
Literatürdeki adı **brevity bias** / **context rot**.

**S110'un faturası:** Architect dokuz kez kendini düzeltti (`A-REC-S110-1…9`); altısı ölçülebilir
bir gerçeği yanlış beyan etmekti ve altısının da kaynağı özet zinciriydi. Defter iki mint'te
17.249 → 4.923 bayta indi; **18 kalem kapanış kaydı olmadan düştü** ve bu kayıp Architect'e aynı
gün üç kez yanlış hüküm verdirdi.

---

## §1 · TASARIM İLKESİ — neyi YAPMAYACAĞI

**Elle yazılmış tek bir "mimari dokümanı" çözüm DEĞİLDİR.** O da çürür, ve kanıtı elimizde:
`cwf-sota-full-table-S106-v2` bugün hâlâ `honestbench NOT BUILT` diyor; üretim dört `hb_*` aracı
sunuyor. Yazıldığı gün doğruydu, iki hafta sonra yalan.

Doğru şekil: **gerçek ÜRETİLİR · niyet YAZILIR · ikisi bir kapıyla kilitlenir.**

Ve ikinci ayrım (S110'da öğrenildi):

| Gerçek türü | Nasıl saklanır |
|---|---|
| **Kod gerçeği** (backend'ler, kategoriler, izinler, fazlar) | build'de üretilir, commit'lenir, **commit sha'sıyla** damgalı |
| **Canlı gerçek** (kaç satır, kim yazdı, ne zaman) | ölçülür, commit'lenir, **sha + ZAMAN** damgalı, ve **tazeliği düşünce derecesi düşer** |

> **Damgasız bir anlık görüntü yalan söyler. Damgalı bir anlık görüntü TARİHLİ BİR ÖLÇÜMDÜR.**
> `RULE-54` dilinde meşru bir öncüldür: `MEASURED:<komut>@<sha>@<zaman>`. Master ilerlemişse
> okuyan, yeniden koşmadan onu öncül yapamaz.

**Sahip şartı (bağlayıcı):** bütün çıktılar **GitHub'da versiyonlu** saklanır ve Architect onları
**klonsuz, `raw.githubusercontent.com` üzerinden** okur. Hafıza dosya dosya taşınmaz.
S110'da ölçüldü: `docs/laws/index.md` raw üzerinden HTTP 200, 14.183 bayt, md5 repodakiyle birebir.

**Bunun kazandırdığı fazladan şey:** commit'lenmiş anlık görüntüler arasındaki **fark tarihin
kendisi olur.** Öksüz listesinin 4'ten 0'a inişi `git log`'da görünür — bugüne kadar hiç sahip
olmadığımız ilerleme kaydı.

---

## §2 · `docs/ground/` — versiyonlu gerçek evi (sahip seçimi)

`docs/laws/` ile aynı ailede, aynı disiplinle: **yeniden yazılamaz, sessizce kısalamaz.**

| Artefakt | İçerik | Yenilenme | Damga |
|---|---|---|---|
| `facts.json` | kod gerçeği | her build | commit sha |
| `census.latest.json` | canlı sayım | `npm run census` | sha + zaman |
| `census.log.jsonl` | **append-only** sayım geçmişi | her koşuda bir satır | sha + zaman |
| `orphans.md` | yazıcısı olup okuyucusu olmayan yüzeyler | her build | commit sha |
| `open-items.md` | **append-only** defter | her mint | mint sha |

---

## §3 · İŞ KALEMLERİ

### A · Üretilen gerçeği tamamla — AG-1

`scripts/genArchitectureFacts.ts` **zaten var** ve kendi başlığında yazıyor: *"Nothing here is
hand-maintained."* Üretiyor: backend'ler · yönlendirme kategorileri · izin matrisi × roller ·
faz listesi · `[ToolRoute]` alan sözlüğü, commit sha damgalı.

İki eksik:
1. **Taze klonda YOK** — build çıktısı, commit edilmiyor. Okumak için build koşturmak gerekiyor.
2. **Kapsamı Architect'in hata eksenini kapsamıyor** — "ne inşa edildi / kim okuyor" sorusunu
   cevaplamıyor.

**İş:** `docs/ground/facts.json` olarak repoya sabitle + kapsamı genişlet.

### B · `npm run census` — canlı sayım, damgalı — AG-1

Tek çıktı: `backends` · `backend_tools` (+ `input_schema` ve `description` dolu oranı) ·
`entity_registry` · `backend_entity_layers` · `tool_behavior_census` ·
`gateway_artifact_observations` (+ **son yazma tarihi** — fırsatçı yazıcı sessizse görünmeli) ·
`vector_index_digest` · `domain_rules` · `mcp_secrets` (**ad ve uzunluk, DEĞER ASLA**).

> Bu komut S110'daki üç hatanın **üçünü de** engellerdi. "Backend discovery yok" diyebilmem için
> bu çıktıyı görmezden gelmem gerekirdi.

**SALT-OKUMA.** Yazma yok; A-REC-S109-9 kapısı geçerli.

### C · ÖKSÜZ RAPORU — AG-2 · **fazın en değerli tek parçası**

S110'un tek cümlesi: *sistem her şeyi inşa etmiş, hiçbirini okumuyor.*

**Statik analiz:** her deklare edilmiş yüzey için (repository · korpus · tablo · modül) —
`runTurn`'den başlayan import/çağrı grafiği taranır; **yazıcısı olup tur yolunda okuyucusu
olmayan** her yüzey `orphans.md`'ye basılır.

S110'da elle bulunan dördü, aletin doğrulaması gereken taban:

```
ÖKSÜZ  vector corpus (342 kalem)      yazar: vector-index cron   okuyan: YOK (⑦ Yol B yanlış raf)
ÖKSÜZ  gateway_artifact_observations  yazar: gateway sniff       okuyan: YOK  (47 satır, doğalgaz dahil)
ÖKSÜZ  turnContextLog                 yazar: YOK                 okuyan: YOK
ÖKSÜZ  doc corpus (knowledge_search)  yönlendirilmiyor
```

Yasası zaten var — **L-ADAY-4**: *"tüketicisi ya da yanlışlayıcısı olmayan deklare yüzey bir
BORÇTUR, özellik değil."* Bu, o yasanın icra organı. Bu fazda **rapor eder**; kapıya dönüşmesi
ayrı bir karardır.

### D · Append-only defterler + İKİ taban kapısı — AG-3

Register/KB/bug-bucket `docs/ground/open-items.md` altına iner, append-only:

- **bayt tabanı** — bir mint kısalamaz
- **kalem tabanı** — kalem sayısı düşemez; düşen her kalemin `CLOSED@evidence` /
  `SUPERSEDED-BY` / `MERGED-INTO` kaydı olmalı, yoksa **build KIRMIZI**

> S110'daki 18 kalemlik kayıp bu kapıyla imkânsızdı. `docs/laws/` hiçbir şey kaybetmedi çünkü
> kapısı vardı; register 18 kalem kaybetti çünkü yoktu. **Mekanizma kanıtlı, yalnız defterlere
> uygulanmamış.**

### E · `RULE-54 · PROVENANCE-BEFORE-PREMISE` mint — AG-3

> Bir öncül karta, hükme ya da rapora girmeden önce **kaynak etiketi** taşır:
> `MEASURED:<komut>` · `RELAYED:<kim>` · `RECALLED`.
> **`RECALLED` bir öncül OLAMAZ.**
> Ve bir **YOKLUK** iddiası en az **iki bağımsız mercek** ister.

| S110 hatası | Yakalayan madde |
|---|---|
| "#70 hiç inşa edilmedi" | yokluk iddiası tek mercekle (`git log --grep`) |
| "backend discovery yok" | `RECALLED` öncül |
| "#75 açık" | `RELAYED:register-v112`, v109'un kapanış kaydıyla çelişiyor |

Relay gramer denetçisi zaten kart yapısını doğruluyor; claim satırlarına provenance kontrolü eklenir.

### F · `npm run architect:open` — AG-4 · **fazın taçı**

Tek komut, oturum açılışının tamamını basar:

```
master sha · kalan dallar · açık PR
docs/laws sayım + md5
facts.json özeti           (kod gerçeği)
census.latest.json         (canlı gerçek, damgalı)
orphans.md                 (yapılmış ama okunmayan)
open-items.md başı         (payda)
```

> Bundan sonra oturum açılışı *"şu 20 belgeyi oku"* değil, ***"şu komutu koştur ve çıktısını oku"***
> olur. Özet zinciri kırılır — çünkü zincire ihtiyaç kalmaz.

### G · `MEMORY.md` — yapısal çare, toplu geçiş DEĞİL — AG-4

Şerit hafızası 21.4 KB, 24.4 KB okuma limitine yaklaşıyor. **S110'da AG-3 ve AG-4 sıkıştırmayı
YAPMADI ve bayrak kaldırdı** — dosyanın kendi başlığı, aynı gün bir regex geçişinin `·` ayracında
sessizce kalem düşürdüğünü yazıyor. İkisi de haklıydı.

**Toplu regex geçişi YASAK.** Çare append-only + indeks. Ve sıkıştırma gerekiyorsa dosyayı
**münhasıran tutan** bir oturum yapar, yarışarak değil.

### H · `HANDOVER-PROCEDURE-v1` — AG-4 · **repoda, kutuda değil**

Yeni bir proje kutusuna eksiksiz devrin prosedürü. §5'teki yedi soruyu kabul testi olarak taşır.
Kutuda yaşarsa çürür; repoda yaşarsa kapılıdır.

---

## §4 · KAPSAM DIŞI (bilerek, ve ASLA DÜŞÜRÜLMEZ)

**`PHASE-CONTEXT-RETRIEVAL-1`** — bilgi tabanı üstünde arama (`find_relevant_context(task)`).
`#81`'in içerik kataloğuna bağlı; bu fazın işi **zemini kurmak**, aramayı değil.

> **Sahip hükmü S110, kelimesi kelimesine: *"retrieval'i da bir sonraki turda yap ama mutlaka
> yapılmalı, skip sakın."*** S112'nin kartı. `#82b` ile aynı statüde: ASLA DÜŞÜRÜLMEZ.
> Ayrı sistem değil — projenin kendi Qdrant'ıyla (TEK-ORGAN).

---

## §5 · KABUL KRİTERİ — yedi soruluk handover testi

Temiz bir oturum açılır: *"Bu yedi soruyu YALNIZ elindeki belgelerle ve ölçümle cevapla; bana
soru sorma, hatırlayarak yazma."*

| # | Soru | Kaynak | Hangi S110 hatasının panzehiri |
|---|---|---|---|
| 1 | `origin/master` sha'sı kaç, kaç dal, kaç açık PR? | taze klon / raw GitHub | — (temel çapa) |
| 2 | Yedi anahtarın kaçı kapalı, kalan hangisi, neden? | `open-items.md` | — |
| 3 | Recall@k'da yenilecek sayı kaç, kim ölçtü, ne zaman? | `open-items.md` + `census.log` | — |
| 4 | Kaç backend, kaç araç, kaç varlık, kaç artefakt kayıtlı? | `census.latest.json` | ✅ *"backend discovery yok"* |
| 5 | Yapılmış ama üretimde okunmayan üç şeyi say. | `orphans.md` | ✅ *"#70 hiç inşa edilmedi"* |
| 6 | Bir sonraki kartın adı ne, gerekçesi ne? | `open-items.md` + order | ✅ kapanmış `#75`'i yeniden açmak |
| 7 | Sahibin tek yüzeyi nedir? | proje talimatları | — (anayasa) |

**Yedisi de kaynağıyla cevaplanıyorsa faz GEÇER.** Cevaplanamayan her soru, eksik parçanın adını
söyler — tahmine gerek kalmaz.

⚠ Test rastgele seçilmedi: 4, 5 ve 6 doğrudan S110'un üç yanlış hükmünden türetildi.
Sahip hükmü: *"tamam bu şekilde başlayalım, sonrasında gerekirse ekleriz."*

---

## §6 · ŞERİT DAĞILIMI

| Şerit | İş |
|---|---|
| **AG-1** | A + B — `facts.json` genişletme & repoya sabitleme + `npm run census`, `docs/ground/` altına damgalı yazım |
| **AG-2** | C — öksüz raporu (`runTurn` import grafiği → `orphans.md`) |
| **AG-3** | D + E — append-only defter + iki taban kapısı + `RULE-54` mint |
| **AG-4** | F + G + H — `architect:open` · `MEMORY.md` yapısal çare · `HANDOVER-PROCEDURE-v1` |

Bağımlılık: AG-1 `docs/ground/` şemasını **önce ve hızlı** raporlar; AG-3 ve AG-4 ona bağlanır.
AG-2'nin işi bağımsızdır, hemen başlayabilir.

---

## §7 · DÜRÜST SINIR

Bu faz Architect'i **muhakeme** hatalarından KORUMAZ. **Ölçülebilir gerçek** hatalarından korur —
S110'un dokuz öz-düzeltmesinin altısı o sınıftandı. Kalan üçü (yanlış yama önerisi · markalı prob
cümlesi · ADR-010'u çiğneyen soru) muhakeme hatasıydı ve onların çaresi şeritlerin S110'da
gösterdiği refleks:

> **Kart otoritedir ama öncül değildir.**

S110'da evin Mimarına yapılan dört düzeltmenin dördü de, doğrulayamadığı bir öncülü kabul etmeyen
bir şeritten çıktı. Bu faz o refleksi ortadan kaldırmaz — ona sağlam bir zemin verir.

<!-- END PHASE-ARCHITECT-GROUND-TRUTH-1-v1 -->
