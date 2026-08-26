# CWF — SOTA YOLCULUĞU · GÜNCEL TAM TABLO · S120 · v3

<!-- cwf-sota-full-table-S120-v3 · 2026-08-26. v2'yi (S106) GEÇERSİZ KILAR. BÜTÜN yazıldı.
     TÜRETİLMİŞ GÖRÜNÜM — bağlayıcı olan kaynaklardır, bu tablo değil.

     ⚠ DÜRÜSTLÜK ŞARTI, EN BAŞA: v2 ile bugün arasında ON DÖRT OTURUM var. Bu tablo o on dört
     oturumun TAMAMINI yeniden doğrulamıyor ve doğruladığını iddia etmiyor. Her satır iki
     etiketten birini taşır:
        [ÖLÇÜLDÜ S120]  — bugün, taze klondan (master da9b82b2…) ve canlı DB'den okundu
        [TAŞINDI]       — v2'den geldi, YENİDEN ÖLÇÜLMEDİ, doğru sayılmasın
     Etiketsiz satır yoktur. On dört oturumu tek geçişte doğrulamış gibi yapmak, bu projenin
     tam olarak yasakladığı şey olurdu. -->

## Yolculuğun haritası, tek satırda

**Bugün buradayız → İÇ KAPI 6/7 → #29 A23 → 7/7 = yaprak_gate → KABUL SÖZLEŞMESİ 0/16 → cinekop_gate**

---

## ⚠ §0 · İKİ SKORBORD — v2'nin EN BÜYÜK EKSİĞİ BUYDU

v2 yalnız yedi anahtarı gösteriyordu. **Yedi anahtar KABUL KRİTERİ DEĞİLDİR** ve yalnız onu gösteren bir tablo, bitmiş olmayan bir işi bitmiş gibi okutur.

| skorbord | durum | ne ölçer |
|---|---|---|
| **(A) İÇ 7-ANAHTAR** | **6/7** [ÖLÇÜLDÜ S120] | iç hazırlık. Mimarinin ayakta olup olmadığı |
| **(B) KABUL SÖZLEŞMESİ** | **0/16** [ÖLÇÜLDÜ S120] | SOTA-1'in bağladığı tek kriter. On altı DIŞ kriterin on altısı ÖLÇÜLMEDİ |

> **Yedinci anahtarı çevirmek SOTA-1'i TATMİN ETMEZ.** (A) 7/7 olduğunda mimari biter; iddia doğmaz. Bir kriter YALNIZ kanıtla emekli olur.

---

## A · YEDİ ANAHTAR

| 🔑 | Anahtar | Durum |
|---|---|---|
| #2 · #10 · #16 · #18 · #23 · #25 | öğrenme fotoğrafı · araç sayımı · sıfır-kod mount · A2A · Path-B leksikal · bilgi grafiği | ✅ S93 · S96 · S98 · S99 · S100 · S103 [TAŞINDI] |
| **#29** | **Anlama katmanı (A23)** | ⬜ **AÇIK — ama zemin v2'den bu yana ciddi biçimde değişti; §F'ye bak** |

**6/7** — kanonik sayaç. [ÖLÇÜLDÜ S120: proje talimatı §9 + bu tablonun §A'sı uyuşuyor]

⚠ **v2'nin bu sayısı üç oturum boyunca 5/7 diye yanlış taşındı** (#25 S103'te kapanmıştı). Bu satır o yüzden kanonik ilan edildi.

---

## B · KABUL SÖZLEŞMESİ (B) — 0/16, ve S120'de İLK KEZ BLOKAJ ADLANDIRILDI

| kalem | v2 dönemi | bugün |
|---|---|---|
| on altı dış kriter | ölçülmedi | **hâlâ 0/16** [ÖLÇÜLDÜ S120] — hiçbiri emekli olmadı |
| `mcp-honestbench` | "NOT BUILT" | **AYRIŞTI** [ÖLÇÜLDÜ S120] — aşağı bak |

**S120'nin en büyük tek kazancı burada ve bir kriteri emekli etmiyor — blokajı bilinmeyenden ADLANDIRILMIŞ bir inşa kalemine taşıyor:**

- **Alet YAYINDA.** Public repo, canlı HTTPS uç, kendi hash-pin'li payload'ıyla cevap veriyor. **İki ağdan bağımsız ölçüldü** (bir şerit + Architect). [ÖLÇÜLDÜ S120]
- **Düşman modları KOD.** Dört aile, beş kadran pozisyonu, artı bir dürüstlük kontrolü; `dial.json` davranış üzerindeki tek otorite ilan edilmiş. [ÖLÇÜLDÜ S120]
- **Eksik olan tek şey: DETERMİNİSTİK SKORLAYICI.** Donmuş geçme koşullarını uygulayan program yok — dört bağımsız mercek. [ÖLÇÜLDÜ S120]
- **Donmuş koşullar BULUNDU** — arşivde, üç mercekle, gating işareti YOK, birebir aktarıldı. Ama **üçü kendi kendine yeterli değil ve biri yazıldığı hâliyle ölçülemez olabilir.** [ÖLÇÜLDÜ S120]

> **Bağlayıcı sonuç: implementation-order'ın A4 maddesi BİTMİŞ.** Sahip kararı bekleyen bir kalem olarak taşınıyordu; karar gereksiz çünkü iş yapılmış. **Sahip tarafındaki kritik yol dörtten İKİYE indi: A1 host · A5 harcama.**

---

## C · S120'DE ÖLÇÜLENLER — gövde, ve ona bağlı olan her şey

| iş | kanıt |
|---|---|
| **GÖVDE KIRMIZIYDI** | build kapısı `Run tests` adımında FAILURE; head'de `total_count=0` olduğu için **kırmızı head'den görünmüyordu** [ÖLÇÜLDÜ S120] |
| tek sebep | dört yetim relay artefaktı + bir governed artefaktta on sekiz gramer ihlali [ÖLÇÜLDÜ S120] |
| **aynı sebep nightly-compat'in ÜÇ işini de kırmızı yapıyordu** | üç işin üçü de aynı iki assertion'da, bayt-bayt aynı; seri bir gecelik; **hiçbir şeyi kapılamıyorlar** (ruleset'in tek zorunlu context'i build) [ÖLÇÜLDÜ S120] |
| deliğin sebebi | **docs-only bir değişiklik build işini test adımı SKIPPED iken YEŞİL bitiriyordu** — bozuk artefakt hiçbir şey iddia etmeyen bir kapıdan iniyordu [ÖLÇÜLDÜ S120] |
| saf onarım TERSTİ | testin kendi mesajının önerdiği başlık ekleme 4 hatayı **113 ihlale** çıkarıyor [ÖLÇÜLDÜ S120] |
| **ONARILDI VE İNDİ** | master `da9b82b2…`. Architect'in kendi denetimi yeni master'da: **0 orphan · 0 ihlal · 0 bayat muafiyet · 0 enrolled · wildcard yok** [ÖLÇÜLDÜ S120] |
| ve hiçbir iddia değişmedi | inen değişiklikte **dört dosyada da SIFIR silme** — cümleler taşınmadı, oldukları yerde `evidence:` çitiyle sarıldı [ÖLÇÜLDÜ S120] |
| delik de kapandı | `relay-corpus.yml` — `paths-ignore` yok, docs-only değişiklikte de koşar; PR'da ateşledi ve yeşil geldi [ÖLÇÜLDÜ S120] |

---

## D · VEKTÖR HATTI — valf açık, tüketici kapalı, korpus dar

| anahtar | değer | [etiket] |
|---|---|---|
| `vector.enabled` | **1** (v2, published 2026-08-17) | ÖLÇÜLDÜ S120 |
| `vector.engine` | **qdrant** (v2, published 2026-08-17) | ÖLÇÜLDÜ S120 |
| `vector.indexRatePerSec` | 5 | ÖLÇÜLDÜ S120 |
| `vector.toolRetrievalMode` | **0** | ÖLÇÜLDÜ S120 |
| `pathB.enabled` | **0** | ÖLÇÜLDÜ S120 |
| `router.askOnUnresolved` | **0** | ÖLÇÜLDÜ S120 |

**Motor açık, tüketici kapalı.** ⑦ Yol B'nin tüketicisi YAZILDI ama rungu açılmadı.

**KORPUS DAR, VE BU BİR BULGU:** `vector_index_digest` **342 kayıt, 8 koleksiyon** — hepsi `backend_tools.description` ya da `governed.knowledge`. **Tek bir yasa, ADR, mimari doküman ya da oturum arşivi YOK.** [ÖLÇÜLDÜ S120]

---

## E · AÇIK YÜRÜYÜŞ — sıra, v32'nin ölçümüyle

| dalga | kalem | durum |
|---|---|---|
| **Z (en üstte)** | gövde onarımı + deliğin kapatılması | **✅ İNDİ, S120** |
| Z | şerit komut formu / diyalog sınıfı | 🔄 teşhis indi, çare tasarlanacak |
| **A (sahip)** | **A1 host · A5 harcama** | ⬜ **sahibin İKİ kararı** — A4 ve A3 düştü |
| A4b | **honestbench deterministik skorlayıcı** | 🔄 tasarım uçuşta — **inşa işi, sahip kararı DEĞİL** |
| B | #29 A23 anlama katmanı 🔑 | ⬜ §F |
| B | #81 BACKEND-DISCOVERY-1 | **ENGELİ KALKTI** — spec bulundu, digest tuttu [ÖLÇÜLDÜ S120] |
| B | PR #409 kırmızısı · bayat-olgu süpürgesi · taşıyıcı birleştirme borcu | ⬜ |
| B | `PHASE-CONTEXT-RETRIEVAL-1` | **SOTA kuyruğundan ÇIKTI** — hiçbir kriteri kapılamıyor [ÖLÇÜLDÜ S119] |
| sonra | ref süpürgesi (40 sil / 26 hariç) | sahip kapsamı onayladı; **iniş dalgasından SONRA** |
| 9.5 / 10 | #33 · #72 RAG · #73 WEB-VALVE · #37 · #82b (PARK) · ilk skor turu | [TAŞINDI] |

---

## §F · ANLAMA KATMANI (A23) — ODA ODA, BUGÜN ÖLÇÜLDÜ

**v2'nin §F'si ile bugün arasındaki fark, bu tablonun en büyük haberi.** Üç oda "YOK" ya da "embriyon" yazıyordu; **üçü de artık kodda.**

### F.1 · Dokuz oda

| oda | hedef | v2 (S106) | **BUGÜN** [ÖLÇÜLDÜ S120] |
|---|---|---|---|
| ② Normalizer / IR Router | niyet+nesne+varlık+metrik | CANLI | **CANLI, değişmedi.** `router.frameRouting=1`, v4, published 2026-08-18 |
| ③ Mention Typer | "4-12 vardiyası" zamandır, varlık değil | YOK (0 dosya) | **HÂLÂ YOK.** İki mercek: dosya adı taraması + içerik taraması, ikisi de boş |
| ④ Resolve | iki kanal + skor + RRF | TEK KANAL | **HÂLÂ TEK KANAL** (`exact → prefix → fuzzy`). **AMA yeni bir dikiş var:** opsiyonel bir Path B sıralayıcı, YALNIZ `ambiguous` verdict'in aday listesini yeniden sıralayabilir — verdict TÜRÜNÜ asla değiştiremez. Kurucu yasası: *"AMBIGUOUS IS REPORTED, NEVER GUESSED AMONG."* Valf `pathB.enabled=0` — **atıl gönderildi, çünkü ölçüm "çevirme" dedi** |
| ⑤ Teşhis | üçlü LINK/NIL/AMBIGUOUS | EMBRİYON | **SÖZLEŞME İNDİ:** `routing/entityDiagnosis.ts`. **Ama BAĞLI DEĞİL — canlı tur yolunda SIFIR üretim importer'ı**, ve bunu kendi kapsam yasası olarak ilan ediyor |
| ⑥ Yürütme kararı | karar tablosu | EMBRİYON | **SÖZLEŞME İNDİ:** `routing/executionDecision.ts`, **oda ⑥ A23 v1_4'ten BİREBİR**. Yine **SIFIR üretim importer'ı** |
| ⑦ Araç getirimi | Yol A + Yol B | A canlı, B motoru hazır | **Yol A canlı; Yol B tüketicisi YAZILDI ama valf 0** (`vector.toolRetrievalMode=0`) |
| ⑧/⑨ Cevap + Atıf | "Granit olarak yorumladım" + güven çürümesi | kısmen; çürüme YOK | **ATIF AÇIĞI ARTIK ÖLÇÜLDÜ VE ADI VAR** — §F.4 |
| `turn_context` (GWT) | tur boyu paylaşılan bağlam | **YOK (0 dosya)** | **İSKELET İNDİ:** `turn/turnContextLog.ts` — append-only, tipli, atıflı, güven taşıyan katkılar. **Yine SIFIR üretim importer'ı** |
| Kapsama grafı §6 | in_scope / roots / ancestors | ~%60 | `GraphKbReader` var [ÖLÇÜLDÜ S120]; kapsam yüzdesi **YENİDEN ÖLÇÜLMEDİ** |
| τ/β · çapraz-tur taşıyıcı · L5 miss-ledger · sinyal tablosu | dördü | DÖRDÜ DE YOK | **L5 miss-ledger: hâlâ YOK** [ÖLÇÜLDÜ S120]. Diğer üçü **YENİDEN ÖLÇÜLMEDİ** |

> **ÜÇ ODANIN ORTAK ŞEKLİ, VE BU BİR TASARIM SEÇİMİ:** ⑤, ⑥ ve `turn_context` **sözleşme olarak indi, makine olarak inmedi.** Üçü de *"bu modül hiçbir şeyi yönlendirmez"* diye yazıyor ve **importer'ının olmaması bunu bir söz değil, grep'le doğrulanabilir bir OLGU yapıyor.** Bu, "spec önce, davranış sonra" disiplininin en temiz hâli.

### F.2 · Build order (§9) — hangi adımdayız

| adım | iş | durum |
|---|---|---|
| 0 | flush cevaptan önce | [TAŞINDI] ödenmiş görünüyor |
| **1** | **ÖLÇ: Recall@k taban çizgisi** | ⚠ **DURUM BELİRSİZ.** Path B için eşli Recall@k ölçüldü (Line-1 gridi, 19/20 OFF, 19/20 ON, sıfır satır yer değiştirdi, pozitif kontrolüyle). **Bunun §9'un adım-1 tabanı OLUP OLMADIĞI ÖLÇÜLMEDİ** — aynı ada sahip iki ölçüm olabilir |
| 2 | `turn_context` | **İSKELET İNDİ** [ÖLÇÜLDÜ S120] |
| 3 | ⑤/⑥ makinesi + taşıyıcı | **SÖZLEŞMELER İNDİ, MAKİNE İNMEDİ** [ÖLÇÜLDÜ S120] |
| 4 | ③ Mention Typer + BM25/RRF kanal-2 | BM25 modülü var; **③ hâlâ sıfırdan** |
| 5 | L5 miss-ledger | **hâlâ sıfırdan** [ÖLÇÜLDÜ S120] |
| 6 | kelime haritası rol değişimi | [TAŞINDI] zemin hazır |
| 7 | soru bütçesi b + AUROC | [TAŞINDI] sıfırdan |

### F.3 · W1 kilidi — v2'nin "Architect borcu" dediği şey

v2: *"#29'un ilk faz kartı A23 v1_4'ün kutuda olmasını ZORUNLU kılar; amendment yoksa kart KESİLEMEZ."*

**BUGÜN ÖLÇÜLEN, VE İKİSİ AYNI ŞEY DEĞİL:**
- `executionDecision.ts` **oda ⑥'yı A23 v1_4'ten BİREBİR taşıyor** — yani v1_4'ün içeriği koda ulaşmış. [ÖLÇÜLDÜ S120]
- **Ama tasarım indeksi hâlâ v1_3'ü bağlayıcı listeliyor ve v1_4 indekste YOK.** [ÖLÇÜLDÜ S120]

> ⚠ **Yani v1_4 bir RELAY olarak var, bir INDEKSLİ BELGE olarak yok.** W1'in tatmin olup olmadığı **ÖLÇÜLMEDİ** ve bu tablo onu çözmüyor — çözen ölçüm, tasarım indeksinin v1_4 satırıyla güncellenmesi ya da relay'in yeterli sayıldığının yazılı hükmüdür.

**VE KODDA KAYITLI BİR ARCHITECT HATASI:** `executionDecision.ts`'in ilk taslağı, v1_4 sahip-elinde olduğu için **uydurulmuş bir eksen** kullanmış (REQUIRED/OPTIONAL/IRRELEVANT). ADDENDUM-1 odayı birebir aktarınca eksenin **YANLIŞ** olduğu görülmüş; dosya odanın kendi kelimeleriyle yeniden anahtarlanmış. Gerçek eksen: **CARRIER vs NOT-CARRIER** — yapısal bir doluluk kontrolü, cevabın varlığı ne kadar istediğine dair bir yargı değil.

### F.4 · S120'NİN #29 ÜZERİNDEKİ ÖLÇÜMÜ — ve bu bir yükseltme

**ÜÇLÜ, BORUNUN İKİ UCUNDA DA VAR VE ORTADA YOK EDİLİYOR.** Kodun kendi belgelediği, S120'nin canlı veriyle doğruladığı:

```
ÜRETİCİ    resolveEntityRef.ts      resolved | unresolved | ambiguous   ← üçlü VAR
BORU       computeClarification.ts  { canonical } | 'unresolved'        ← İKİLİ, üçüncüsü inecek yer YOK
TÜKETİCİ   askOnUnresolved.ts       resolved | unresolved | ambiguous   ← üçlü YİNE VAR
```

Çöküş **tek bir ifadede**: `stageClarify.ts` — `if (res.kind !== 'resolved') continue;`.

**Sonucu:** `'ambiguous'` canlı tur yolunda **ERİŞİLEMEZ** bir union üyesi, ve ona bağlı `'ambiguous-only'` dalı **ATEŞLENEMEZ.**

**S120'NİN CANLI ÖLÇÜMÜ — ve Architect'in argümanını TERSİNE ÇEVİRDİ:**

```
canlı bağ (3 farklı entity id)
  RESOLVER'IN ÜRETTİĞİ  : ambiguous (3 aday)
  HARİTANIN TAŞIDIĞI    : unresolved
  decideAsk ÇÖKÜŞLE     : ask      ← kullanıcıya SORULUYOR
  decideAsk ÇÖKÜŞSÜZ    : no-ask   ← "ambiguous-only"
```

> **Çöküşü tek başına açmak sistemi daha AZ soru sorar hale getirirdi.** Çöküş şu an *ikinci bir bug'ı iptal eden* bir bug. **Bu, sıra kısıtını ZORUNLU kılar: "birkaç buldum" soru şekli, taşıma açılmadan ÖNCE var olmalı.**

**VE KULLANICIYA ULAŞAN GERÇEK KUSUR — atıf açığının ölçülmüş hâli:**

O soru ateşlendiğinde ekrana çıkan cümle, kullanıcının kendi dilinde:

> *"… ifadesini hiçbir bağlı kaynakta bulamadım."*

— resolver'ın **üç adayı döndürdüğü** yolda. `proposeCandidates`'in `candidateEntityIds`'in geçebileceği bir parametresi **yok**; aday listesi yapısal olarak düşürülüyor.

**Sistem üç şey bulup "hiçbir şey bulamadım" diyor** — üretimde, `empty ≠ zero` yasasının ürün yüzündeki ihlali, ve tam da `mcp-honestbench`'in ölçmek için yazıldığı eksen.

**TASARIMI BELİRLEYEN TEK ÖLÇÜM:** bağlı satırlar **kullanıcının okuyabileceği her alanda birebir aynı** — aynı ad, aynı attrs, aynı açıklama. **Yalnız asıldıkları EBEVEYNDE ayrışıyorlar** — ve ebeveyn clarify aşamasının kendi aday haritasında düşürülüyor. Ebeveyn adları birbirinden farklı, yani ebeveyn ayırt EDEBİLİR; onu taşıyan hiçbir şey yok.

**Architect hükmü (sahip rızası bekliyor):** ambiguous bir referans **SORMALI**, ve soru **ne bulduğunu ADLANDIRMALI.**

### F.5 · Tek cümlelik dürüst hüküm

**v2 "anlama katmanı ilk kez nefes aldı" diyordu. Bugün: nefes almaya devam ediyor, iskeleti kondu, ama hâlâ ayağa kalkmadı — ve neden kalkmadığı artık tahmin değil, ölçüm.**

Üç oda sözleşme olarak indi ve üçü de bilerek bağlanmadı. Eksik olan tasarım değil, **makine**. Ve S120 makinenin önündeki tek gerçek engeli buldu: taşımayı açmadan önce sorunun şekli var olmalı, yoksa onarım soruyu kötüleştirmez — **susturur.**

---

## §G · BU TABLONUN KENDİSİ HAKKINDA

**Yeniden ölçülmedi ve öyle işaretlendi:** #2–#25 anahtarlarının kapanış kanıtları · §9 adım 0 ve 6–7 · kapsama grafı yüzdesi · τ/β ve çapraz-tur taşıyıcı · v2'nin §B ve §E bölümlerinin S106'ya özgü satırları.

**Bir sonraki okuyucuya:** bu tablo türetilmiş bir görünümdür. Bağlayıcı olanlar taze klon, canlı DB, `cwf-sota-definition` ve register/bucket'ın en yüksek sürümleridir. **Çelişirse ONLAR kazanır ve fark bir bug olarak kaydedilir.**

<!-- END · cwf-sota-full-table-S120-v3 -->
