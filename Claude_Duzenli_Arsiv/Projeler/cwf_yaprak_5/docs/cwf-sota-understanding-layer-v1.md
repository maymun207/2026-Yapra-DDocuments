# CWF — SOTA incelemesi: Anlama Katmanı
<!-- cwf-sota-understanding-layer-v1 · rev 1 · 2026-07-23 · Architect
     Anchor: origin/master 194f6a8 (rev 142)
     Kapsam: IR frame · varlık çözümleme · açıklama sorma politikası · araç yönlendirme
     Bu belge KOD YAZMADAN ÖNCE okunmak üzere yazıldı (owner direktifi, S62). -->

## §0 · Neden bu belge var

S62'de sahibin koyduğu teşhis şuydu: *"Bir mantık silsilesine oturtup bir hedefe
doğru gittiğimizi görmüyorum."*

Architect bunu doğruladı. Yönetişim mimarisi (empty≠zero, deterministik güven,
DB-first/kod-zemini, yayın kapısı, PLATINUM, ledger) tutarlı bir tez ve
disiplinle uygulanıyor. **Anlama mimarisi ise birikintiyle büyüdü:**

    kelime haritası → öğrenme → kirlendi → hijyen → anlamsal router
    → IR frame → varlık kapısı → frame-primary flip

Bu adımların hiçbiri planlı bir ilerleyişin parçası değildi; her biri bir
öncekinin gözlemlenmiş semptomuna verilmiş cevaptı. Kök sebep: **"ajan soruyu
anladı" ne demek, hiç tanımlanmadı.** Tanımsız hedefe doğru katman eklenince
her katman bir öncekinin yaması olur.

Bu belge üç şeyi yapar: (1) alanın gerçekte ne yaptığını okur, (2) bizim
sistemimizi ona karşı kıyaslar, (3) matematiksel tabanı olan bir çözüm önerir.

---

## §1 · Merkezi bulgu: biz ÜÇ ayrı problemi TEK torbaya koymuşuz

Literatürde bunlar ayrı ayrı çalışılmış, ayrı metrikleri, ayrı karar kuralları
olan üç problem:

| # | Problem | Sorusu | Bizdeki karşılığı |
|---|---|---|---|
| **P1** | Niyet/slot çıkarımı | Cümle hangi yapılandırılmış temsile karşılık gelir? | IR frame (`action`/`object`/`entity_ref`/`metrics`) |
| **P2** | Varlık bağlama (entity linking) | Bu yüzey biçimi hangi kanonik kayda karşılık gelir? | `resolveEntityRef` + alias + `factory_registry` |
| **P3** | Açıklama sorma politikası | Ne zaman sormalı, ne zaman en iyi tahminle devam etmeli? | `computeClarification` (kapı) |

**Bizim kapımız P3'ü yapıyor ama kararını P2'nin sonucuna bakarak veriyor.**
Bu bir kategori hatası ve literatürde tam adı var (§2.2).

Ek olarak, dördüncü bir problem daha var ve onu da aynı torbaya koymuşuz:

| **P4** | Araç getirimi (tool retrieval) | 145 araçtan hangileri bu tura girmeli? | kategori eşleme (`deriveCandidateCategories`) |

---

## §2 · Literatür 1 — Açıklama sorma politikası

Ana referans: Zhang & Choi, *Clarify When Necessary: Resolving Ambiguity
Through Interaction with LMs* (arXiv:2311.09469, UT Austin).

### 2.1 · Resmî çerçeve

Problem üç ardışık alt göreve ayrılıyor:

1. **Ne zaman sormalı** (when to clarify)
2. **Ne sormalı** (what to ask)
3. **Gelen cevapla ne yapmalı** (how to respond with the clarification)

Notasyon: kullanıcı girdisi `x`; olurlu çıktılar kümesi `Y = {y₁…y_k}`; gerçek
niyet `y* ∈ Y`. Her girdinin niyet dağılımı `P(y = y*|x)` vardır. **Bu dağılım
tek bir çıktı tarafından domine ediliyorsa, sistem sormamalı ve doğrudan
cevaplamalıdır.**

### 2.2 · Bizim hatamızın adı: epistemik ≠ aleatorik belirsizlik

Makalenin en kritik cümlesi (Task 1):

> Bu görev, model belirsizliğine katkıda bulunan iki faktörü birbirinden
> ayırmayı gerektirir. **Epistemik belirsizlik** bilgi eksikliğinden kaynaklanır.
> **Aleatorik belirsizlik** ise çıktıdaki içsel rastgelelikten — çoğunlukla
> muğlaklıktan — kaynaklanır. Bu görevdeki sistemler **yüksek aleatorik ve
> düşük epistemik belirsizliğe** sahip örnekleri saptamalıdır.

Yani soru sormak **yalnızca aleatorik belirsizlik** için meşrudur.

**CWF'nin kapısı tam tersini yapıyor.** "Ganit fabrikası" epistemik bir
başarısızlıktır — kullanıcı ne demek istediğini gayet iyi biliyor, muğlaklık
YOK; bizim çözümleyicimiz bir yazım hatasını eşleyemedi. Kapı bu epistemik
başarısızlığı alıp kullanıcıya aleatorik bir soru olarak geri veriyor:
*"hangi varlığı kastettiniz?"*

> **Kendi arama başarısızlığımızı kullanıcının omzuna yüklüyoruz.**

Bu, tek cümlelik teşhistir ve tüm S62 gözleminin kökünü açıklar.

### 2.3 · Sınıflandırma değil, belirsizlik kestirimi + etkileşim bütçesi

Makale açıkça şunu söylüyor: *"ne zaman sorulacağını bir sınıflandırma görevi
olarak ele almıyoruz; bunu bir belirsizlik kestirimi hedefi olarak
değerlendiriyoruz."*

Mekanizma:
- Her girdi için skaler bir belirsizlik kestirimi `u(x)` üretilir
- Bir **etkileşim bütçesi** `b ∈ [0,100]` verilir
- `u(x)`'e göre sıralanan en üst `b%` örnek için soru sorulur

Metrikler: **AUROC** + **sabit etkileşim bütçesi altında performans**.
Bu, seçmeli tahmin (selective prediction) literatürüyle akrabadır.

**CWF'de bunların hiçbiri yok:** ikili sert bir kural, eşik yok, sıralama yok,
bütçe yok, ölçüm yok.

### 2.4 · INTENT-SIM — niyet entropisi

Önerilen yöntem: bir açıklama sorusu üret, ona `S` adet kullanıcı cevabı
örnekle, anlamsal olarak eşdeğer olanları NLI ile kümele, küme olasılıklarını
`P̂(c|x) = |c|/S` ile kestir, **entropiyi hesapla**: `u = H(P̂)`.

Sonuç: niyet entropisi, ham çıktı olasılığı (Likelihood) ve Self-Ask
temellerini tutarlı biçimde geçiyor. `b = %10` bütçede rastgele seçime göre
kazancı **iki katına** çıkarıyor.

### 2.5 · Muğlaklığın gerçek dağılımı

Makalenin 150 örneklik elle analizi (QA görevi):

| Muğlaklık türü | Oran |
|---|---|
| Kelime anlamı ayrımı / **varlık bağlama** | **%48** |
| Birden çok geçerli çıktı | %44 |
| Sözlük anlam vs. kastedilen anlam | %8 |

**Not:** varlık muğlaklığını korumaya almak içgüdüsü doğru — baskın sınıf o.
Yanlış olan tetikleyicidir, fikir değil.

---

## §3 · Literatür 2 — Varlık bağlama ve NIL problemi

Referanslar: Sevgili et al., *Neural Entity Linking: A Survey* (arXiv:2006.00575);
Shen et al., *Entity Linking with a Knowledge Base* (TKDE); USFD@KBP2011
(arXiv:1203.5073); *Reveal the Unknown* (arXiv:2302.07189).

### 3.1 · Kanonik üç aşama

1. **Aday üretimi** (candidate generation) — yüzey biçiminden olası kayıtlar
2. **Aday sıralama** (candidate ranking) — her adaya skor
3. **NIL kestirimi** (unlinkable mention prediction) — hiçbirine bağlanamıyorsa

NIL kestirimi resmî olarak *reddetme seçenekli sınıflandırma* (classification
with a reject option) olarak tanımlanır: `NILp: (C, M)ⁿ → {0,1}ⁿ`.

### 3.2 · Dört standart NIL yöntemi

1. Aday üretici hiç aday vermezse → önemsiz NIL
2. **Eşik `τ`**: en iyi adayın skoru `τ`'nun altındaysa → NIL
3. Sıralama aşamasına özel bir "NIL varlığı" eklemek
4. İkili sınıflandırıcı eğitmek (skor + NER bayrağı vb. özniteliklerle)

### 3.3 · Kritik ikinci eşik: **marj `β`**

USFD@KBP2011 iki ayrı teknik ölçüyor:

> İlki en yüksek skorlu adayı seçer; skoru `α` eşiğinin üstündeyse aday
> seçilir, altındaysa NIL. İkincisi **en yüksek iki skorun farkını** hesaplar
> ve `β` eşiğiyle karşılaştırır; fark eşiği aşarsa en yüksek aday seçilir,
> aşmazsa NIL.

**Bu iki eşik bizim aradığımız matematiktir.** Çünkü:

| Sinyal | Anlamı | Belirsizlik türü | Doğru eylem |
|---|---|---|---|
| `s₁ < τ` | hiçbir aday yeterince iyi değil | **epistemik** | tanımıyorum de — **SORMA** |
| `s₁ ≥ τ`, `s₁ − s₂ ≥ β` | tek bir aday net önde | belirsizlik yok | **bağla** |
| `s₁ ≥ τ`, `s₁ − s₂ < β` | iki aday başa baş | **aleatorik** | **SOR** (ve seçenekleri sun) |

"Ganit" → aday üretimi (TR-fold + prefix + Damerau-Levenshtein ≤2) "Granit"i
mesafe 1 ile verir, ikinci aday yok → `s₁` yüksek, marj büyük → **bağla, sorma**.
Bizde hiç çalışmadı, çünkü `frame.object !== 'FACTORY'` kapısı yolu kapattı.

### 3.4 · Açık soru sormak yerine seçenek sunmak

Interactive Question Clarification (arXiv:2012.09411) kapalı alanlı sistemler
için şunu bulur: açık uçlu soru sormak *"belirli bir diyalog ortamı için ciddi
özelleştirme gerektirir… Kaba sorular kullanıcıyı şaşkın bırakır."* Bunun
yerine **aday etiketlerini seçenek olarak sunmayı** önerirler.

Bizim `"Hangi varlığı (hat/bölge/ekipman) kastettiniz?"` cümlemiz tam da
tarif edilen "kaba soru". Kapalı bir alandayız — fabrikalarımız, hatlarımız,
zone'larımız sonlu ve kayıtlı. Seçenek sunabilecekken açık soru soruyoruz.

---

## §4 · Literatür 3 — Büyük araç kataloglarında yönlendirme

Referanslar: *The Hitchhiker's Guide to Agentic AI* (arXiv:2606.24937) §18.4.2;
Graph RAG-Tool Fusion (arXiv:2502.07223); SING (arXiv:2606.16591);
Tool-to-Agent Retrieval (arXiv:2511.01854); Dynamic ReAct (arXiv:2509.20386).

### 4.1 · Baskın yaklaşım: getirim-destekli araç seçimi

> Bir ajanın yüzlerce veya binlerce aracı olduğunda, tüm tanımları prompt'a
> koymak hem uygulanamaz (token maliyeti) hem de ters etkilidir (seçim
> karışıklığı).
>
> - **Getirim-destekli araç seçimi:** her turda, kullanıcı sorgusu ile araç
>   açıklamaları arasındaki gömme benzerliğiyle yalnızca en ilgili top-k araç
>   getirilir.
> - **İnce ayarlı araç seçimi:** araç kullanım yörüngeleri üzerinde model
>   eğitilir.
>
> Pratikte üretim harness'leri bu stratejileri birleştirir: bir getirim
> katmanı araç kümesini ön-filtreler, prompt filtrelenmiş araçları içerir,
> modelin kendi fonksiyon çağırma yeteneği nihai seçimi yapar.

**CWF bu tarifin ilk yarısını yapıyor ama tamamen farklı bir mekanizmayla:**
gömme benzerliği yerine **sembolik kategori eşleme** — `(action × object) →
kategori → araçlar`. 145 araçtan 10–60 arasına iniyoruz, yani ön-filtre
çalışıyor; ama filtre **öğrenilmiş bir vektör uzayı değil, elle yazılmış bir
tablo**.

### 4.2 · Bunun sonuçları — dürüst muhasebe

**Sembolik tablonun LEHİNE:**
- Deterministik, denetlenebilir, yönetilebilir (bizim anayasamızla uyumlu)
- Yayın kapısından geçer, versiyonlanır, geri alınabilir
- Gömme modeli maliyeti/gecikmesi yok

**ALEYHİNE:**
- `(action × object)` kartezyen çarpımı elle bakımlı; yeni bir nesne türü
  yeni satırlar demek
- Bir aracın *ne yaptığı* ile *hangi kategoride olduğu* arasındaki bağ elle
  kurulur — SING'in "intention–tool graph"ı ya da Graph RAG-Tool Fusion'ın
  bağımlılık grafiği gibi bir yapı yok
- **Ölçülmüyor:** Recall@k yok

### 4.3 · Standart metrikler

Alan **Recall@k** ve **nDCG@k** kullanıyor (SING: Global Recall@5; Tool-to-Agent:
Recall@5 +%19.4, nDCG@5 +%17.7).

**Bizde bu metriğin ham maddesi ZATEN VAR:** `routerAbLens` (SR1-W3a) kayıtlı
numuneler üzerinde her kolun *"turun gerçekte kullandığı araçlara ulaşıp
ulaşmadığını"* skorluyor. Bu, Recall@k'nın ta kendisi — sadece adı konmamış ve
F129 gereği tetikleyici arayüzü yok.

---

## §5 · CWF ↔ SOTA kıyaslaması

| Katman | SOTA | CWF bugün | Boşluk |
|---|---|---|---|
| **P1 Frame** | slot doldurma, slot-düzeyi F1 ile ölçülür | LLM router → IR frame | **ölçülmüyor**; `entity_ref` yuvası tip ayrımı yapmıyor (vardiya, iş emri no da varlık sanılıyor) |
| **P2 Varlık bağlama** | aday üretimi → sıralama → **NIL (τ)** + **marj (β)** | tek yol: exact/prefix/DL≤2, **fakat `object==='FACTORY'` kapısına bağlı** | τ yok, β yok, NIL kavramı yok; tip kapısı yanlış eksende |
| **P3 Açıklama sorma** | belirsizlik kestirimi `u(x)` + bütçe `b` + AUROC; **yalnız aleatorik** | ikili sert kural: `entity_ref.length > 0 && resolvable === 0` | epistemik/aleatorik ayrımı yok; bütçe yok; eşik yok; **hazırlanmış işi imha ediyor** |
| **P3b Ne sorulacak** | kapalı alanda **seçenek sun** | tek, sabit, jenerik cümle | aday listesi kullanıcıya hiç gösterilmiyor |
| **P3c Cevapla ne yapılacak** | üçüncü resmî alt görev | **yok** — mekanizma tanımlı değil | kullanıcı cevap verse ne olacağı belirsiz |
| **P4 Araç getirimi** | gömme + top-k, Recall@k ile ölçülür | sembolik `(action × object)` tablosu | Recall@k ölçülmüyor (alet var, tetiği yok) |

### 5.1 · Canlı kanıt — S62 oturumu

10 tur, 7'si başarısız. Altısı aynı kapıdan. Örnek (prod log, 07:58:05):

```
[Frame] action=QUERY_MASTER object=EMPLOYEE
        entity_ref=[Ganit fabrikası, sırlama 3-4-5, 4-12 vardiyası]
[Route] matched=[employee,factory,production,metrics,machine,andon]
[ToolRoute] offered=60/145
[EntityResolve] alias refs=[…] resolved=[] unresolved=[üçü de]
→ HIGH clarification, tur iptal, model hiç çağrılmadı
```

Bu tek log satırı üç boşluğu birden gösteriyor:
- `4-12 vardiyası` bir varlık değil → **P1 tip hatası**
- `Ganit` → `Granit` epistemik, marj büyük olurdu → **P2 τ/β eksikliği**
- 60 araç hazırdı, imha edildi → **P3 politika hatası**

---

## §6 · Önerilen algoritma

### 6.1 · Aşama A — varlık çözümlemeyi gerçek bir EL hattına çevir

Her `m ∈ frame.entity_ref` için:

**A1 · Tip kapısı — sorguya değil, ANIMA (mention) bak.**
Kapı `frame.object`'e bakmayı bırakır. Her mention kendi slot tipini taşır
(`factory` | `zone` | `line` | `equipment` | `shift` | `order` | `employee` |
`time`). Yalnız **bağlanabilir varlık sınıfları** EL'e girer. `4-12 vardiyası`
tipi `shift`'tir → EL'e girmez, `resolvable` sayımına dahil edilmez.

> Bu tek değişiklik S62'deki 6 turun en az 3'ünü kurtarır.

**A2 · Aday üretimi** — tüm kayıt defterleri üzerinde, `frame.object`'ten
BAĞIMSIZ. Mevcut mekanizma (TR-fold + exact + prefix + Damerau-Levenshtein ≤2)
korunur; yalnız kapısı kalkar.

**A3 · Sıralama** → `s₁ ≥ s₂ ≥ …` (normalize edilmiş benzerlik skorları)

**A4 · Karar kuralı** — iki yönetilen eşik:

```
if s₁ < τ                    → NIL        (epistemik)
elif (s₁ − s₂) ≥ β           → LINK(c₁)   (belirsizlik yok)
else                         → AMBIGUOUS  (aleatorik)
```

`τ` ve `β` **yönetilen `agent.param`** olur (`entity.nilThreshold`,
`entity.marginThreshold`) — kodda sabit değil, yayınla ayarlanabilir, ledger'a
damgalanır. Bu, projenin kendi DB-first/kod-zemini yasasına uyar.

### 6.2 · Aşama B — açıklama sorma politikası

Üç sonucun üç FARKLI davranışı olur — bugün üçü de aynı cümleyi üretiyor:

| Sonuç | Davranış | Neden |
|---|---|---|
| **LINK** | sessizce bağla, **atıfla göster** | belirsizlik yok |
| **NIL** | *"'Ganit' adında kayıtlı bir fabrika yok. Kayıtlılar: Granit, KB7, …"* — **soru değil, bilgi** | epistemik; kullanıcı zaten ne dediğini biliyor |
| **AMBIGUOUS** | **seçenek sun**: *"Glazur3 mü Glazur4 mü?"* | aleatorik; tek meşru soru sınıfı |

Ve **soru yalnızca mention TAŞIYICI ise** sorulur: o mention çözülmeden cevap
üretilemiyorsa. Bir turda 60 araç seçilmiş ve mention cevabın kritik yolunda
değilse, sormak kazanç değil kayıptır.

Resmî hâli — beklenen fayda:

```
SOR  ⟺  E[kazanç | soru] > etkileşim maliyeti
```

Pratik vekil (LLM simülasyonu gerektirmeyen, deterministik):

```
SOR  ⟺  s₁ ≥ τ  ∧  (s₁ − s₂) < β  ∧  taşıyıcı(m)  ∧  bütçe_uygun
```

Bu vekil, INTENT-SIM'in entropi kestiriminin kapalı-alan özel hâlidir: sonlu ve
kayıtlı bir varlık kümemiz olduğu için niyet dağılımını *simüle etmemize gerek
yok* — aday skorlarından doğrudan okuyabiliyoruz. **Bu bizim avantajımız**, ve
deterministik-güven yasamızla da uyumlu (LLM yargıcı yok).

### 6.3 · Aşama C — hazırlanmış işi ASLA imha etme

Sormamaya karar verildiğinde tur devam eder ve çözüm **görünür biçimde
atıflandırılır**: *"Granit fabrikası olarak yorumladım."*

Bu, projenin kendi anayasasının doğrudan uzantısıdır. ADR-001 der ki: *yalan
söyleyen bir backend'i dürüst yapmaya çalışma, ZARARSIZ yap — kapsanmış,
atıflı, karantinaya alınabilir.* Aynı ilke burada:

> **Yanlış bir çözümlemeyi imkânsız yapmaya çalışma — GÖRÜNÜR yap.**

Görünür ve düzeltilebilir bir tahmin, sessiz bir tahminden de, sert bir
duvardan da üstündür. Zaten bir provenance katmanımız var; kullanmıyoruz.

---

## §7 · "Anlama"nın ölçülebilir tanımı

Sahibin asıl sorusunun cevabı bu. Bugüne kadar bir hedef fonksiyonumuz olmadığı
için birikinti oluştu. Dört metrik, dört katman:

| Katman | Metrik | Ham madde bizde var mı? |
|---|---|---|
| **P1 Frame** | slot-düzeyi F1 (`action`, `object`, `entity_ref`, `metrics`) | **evet** — sentetik trafik korpusu (`synthetic_runs`, günde 500 frame) |
| **P2 Varlık bağlama** | Acc@1 + **NIL-duyarlı doğruluk** | kısmen — etiketli set üretilmeli |
| **P4 Araç getirimi** | **Recall@k** (sunulan set turun kullandığı araçları içerdi mi) | **evet** — `routerAbLens` bunu zaten hesaplıyor |
| **P3 Sorma politikası** | **AUROC** + bütçe `b` altında performans | hayır — inşa edilmeli |

**Kritik gözlem:** dördünden ikisinin ham maddesi zaten üretiliyor ve
kullanılmıyor. Sentetik enjektör günde 500 frame kaydediyor (tavan: 200 000
token ÷ 400 = tam 500), ve `routerAbLens` Recall@k'yı hesaplıyor ama
tetiklenmiyor (F129).

**Uyarı (F174):** enjektör 29 utterance'lık bir seti günde ~17 kez tekrar
ediyor. Bu *kararlılık* ölçer, *kapsam* ölçmez. Etiketli değerlendirme seti
için set genişliği gerekir, tavan yüksekliği değil.

---

## §8 · Neyi emekli etmeliyiz

**Öğrenilmiş kelime haritası, bir öğrenme hedefi olmaktan çıkmalı.**

Gerekçe zinciri:
1. Kelime yönlendirmesi eklemeli dillerde yapısal olarak zayıf (SR1'in var
   olma sebebi; kanıt sahibin kendi durak-kelimeleriyle dolu haritası)
2. Anlamsal yol açıkken harita zaten sorgulanmıyor
3. Öğrenme zaten bastırılmış (`learn suppressed basis=frame`)
4. İki öğrenme döngüsü sürdürmek iki dürüstlük yükü demek

**Kalması gereken:** outage zemini olarak **sabitlenmiş** hâli + `routerAbLens`
ile **düzenli ölçülmesi** (bugün donmuş VE ölçülmüyor — test edilmeyen sigorta).

**Gerçek öğrenme varlığı:** `router_proposals` (gözlem → öneri → sahip onaylı
yönetilen satır). Makine zaten kurulu; eksik olan **kapanış halkası** — öneriler
birikiyor ama terfi mekanizması ve inceleme yüzeyi doğrulanmadı.

---

## §9 · Literatürün ÇÖZMEDİĞİ şeyler — dürüst sınır

Bu belge "alan bunu çözmüş, kopyalayalım" demiyor. Açık kalan yerler:

- **Ne zaman sorulacağı çözülmüş değil.** En iyi yöntemler (INTENT-SIM,
  semantic entropy) AUROC ~0.53–0.63 civarında; rastgeleden iyi ama uzak ara
  değil. Bizim kapalı-alan avantajımız (sonlu, kayıtlı varlık kümesi) bizi
  aslında **açık-alan SOTA'sından daha iyi bir konuma** koyuyor — entropiyi
  simüle etmek yerine aday skorlarından okuyabiliyoruz.
- **`τ` ve `β` eğitim verisinden öğrenilir.** Bizde etiketli veri yok; ilk tur
  elle seçilmiş muhafazakâr değerlerle başlamalı ve ölçümle ayarlanmalı. Bunu
  "ayarladık, bitti" diye kapatmak S55-1 ihlali olur.
- **Sembolik vs. gömme tabanlı araç getirimi arasındaki tercih bizim için
  açık değil.** Sembolik tablo anayasamıza (deterministik, denetlenebilir,
  yönetilen) uyuyor; gömme yaklaşımı ölçeklenir ama yayın kapısından nasıl
  geçeceği çözülmemiş bir tasarım sorusudur. **Bu belge bir tavsiye vermiyor;**
  Recall@k ölçülene kadar veri yok.

---

## §10 · Önerilen sıra (kod yazmadan önce onay gerektirir)

1. **ÖLÇ, sonra değiştir.** Önce Recall@k ve mevcut kapı davranışının taban
   çizgisi çıkarılır (`routerAbLens` tetiklenir, F129 kapatılır). Bir taban
   çizgisi olmadan yapılan her düzeltme yine deneme yanılmadır.
2. **A1 tip kapısı** — en küçük değişiklik, en büyük kazanç, en düşük risk.
3. **A4 τ/β karar kuralı** + üç ayrı davranış (LINK / NIL / AMBIGUOUS).
4. **Aşama C atıf görünürlüğü** — provenance katmanı zaten var.
5. Kelime haritasının emekliliği + `router_proposals` kapanış halkası.
6. Sorma politikasının bütçelenmesi ve AUROC ile ölçülmesi.

---

## §11 · Kaynaklar

- Zhang, M.J.Q. & Choi, E. — *Clarify When Necessary: Resolving Ambiguity Through Interaction with LMs*, arXiv:2311.09469
- Sevgili et al. — *Neural Entity Linking: A Survey of Models Based on Deep Learning*, arXiv:2006.00575
- Shen, Wang & Han — *Entity Linking with a Knowledge Base: Issues, Techniques, and Solutions*, TKDE
- USFD@KBP2011 — *Entity Linking, Slot Filling and Temporal Bounding*, arXiv:1203.5073
- *Reveal the Unknown: Out-of-Knowledge-Base Mention Discovery with Entity Linking*, arXiv:2302.07189
- *Interactive Question Clarification in Dialogue via Reinforcement Learning*, arXiv:2012.09411
- *The Hitchhiker's Guide to Agentic AI: From Foundations to Systems*, arXiv:2606.24937 §18.4.2
- Lumer et al. — *Graph RAG-Tool Fusion*, arXiv:2502.07223
- *SING: Synthetic Intention Graph for Scalable Active Tool Discovery*, arXiv:2606.16591
- *Tool-to-Agent Retrieval*, arXiv:2511.01854
- Aliannejadi et al. — ClariQ / ConvAI3, arXiv:2009.11352
- Amazon Science — *Deciding whether to ask clarifying questions in large-scale spoken language understanding*

<!-- SON · cwf-sota-understanding-layer-v1 · rev 1 · 2026-07-23 -->
