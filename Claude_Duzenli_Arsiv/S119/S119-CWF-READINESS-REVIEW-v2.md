# CWF SOTA-HAZIRLIK İNCELEMESİ — S119 · v2

<!-- v1'İ GEÇERSİZ KILAR (S37-1). BÜTÜN olarak yazıldı, yamayla değil (A-REC-S101-7).
     v2'nin doğuş sebebi TEK BİR ŞEY: v1 §2⓷, #81'i bir SAHİP KARARINA bağlı ilan ediyordu.
     Sahip cevap verdi — "doküman reposunda, bunların hepsi var" — ve bu, o cümlenin İKİNCİ
     şıkkını gerçekleştirdi. Engel kalkmadı, SINIF DEĞİŞTİRDİ: bir sahip kararından bir
     MAKİNE OKUMASINA indi. Bu fark S102-YASA-1'in tam konusudur ve bayat bırakılamazdı.
     BAŞKA HİÇBİR BÖLÜM KISALTILMADI; v1'in tüm ölçümleri kelimesi kelimesine taşındı. -->

## §0 · BU BELGENİN SEBEBİ

Sahip şunu sordu: *"SOTA testlerine başlamadan önce %100 CWF, 0 eksik component ve bug kalmış
olmalı ki SOTA testlerinin bir anlamı olsun."*

Argümanın yarısı doğru, yarısı ters teper. Bu belge ikisini ayırır, kabul edilen kapıyı yazar,
ve SOTA öncesi ZORUNLU listeyi üç kaleme indirir.

**BURADAKİ HER SAYI BİR İDDİADIR (TOTAL-45).** Ölçüldüğü yerde ÖLÇÜLDÜ diye işaretlidir;
işaretsiz sayı yoktur. Yeni oturum açılışta taze klon + canlı DB ile doğrular; çelişkide ölçüm
kazanır ve fark bir bug olarak kaydedilir.

---

## §1 · KABUL EDİLEN KAPI (sahip onayı: S119, "kabul")

> **Bir kalem benchmark'ı ancak BİR KRİTERİN NE ÖLÇTÜĞÜNÜ DEĞİŞTİREBİLİYORSA bloke eder.**

**Neden "sıfır bug" kapısı reddedildi.** Defter append-only ve her oturum yeni kalem doğuruyor —
S118 açılışında repo defterinde 65 kalem ÖLÇÜLDÜ (`architect:open` alan 9, 2026-08-25T12:25:35Z).
"Sıfır" bu defterin hiç bulunmadığı ve bulunmayacağı bir durumdur. O kuralı benimsemek ihtiyat
değil, hiç ölçülmemenin yoludur — ve SOTA-1 açıkça der ki **bir kriter YALNIZ kanıtla emekli olur**,
kolaylık, maliyet ya da kapsam baskısıyla asla.

**Neden sahip yine de haklıydı.** Deterministik bir arıza sınıfı taşıyan bir sistemden alınan skor
bir ölçüm değil, bir gürültüdür. Kapı bunu korur: aşağıdaki üç kalem tam da o testi geçtiği için
zorunludur, "temizlik iyidir" diye değil.

---

## §2 · SOTA ÖNCESİ ZORUNLU — ÜÇ KALEM, SIRAYLA

### ⓵ `#29 A23` ANLAMA KATMANI — İLK İŞ (sahip: *"ilk iş olarak bitmesi lazım"*)

İç 7-anahtarın açık olan tekı. Artık tasarım kalemi değil, **tekrarlanabilir bir bug**:
`stageClarify.ts:321-329`, ikili resolved/unresolved döngüsü; `KB7 <equipment-metric>` sorgularında
deterministik (`F-S117-CLARIFY-CHILD-LAYER-FALSE-EMPTY-1`).

**Kapıyı neden geçer:** bir SOTA kriterinin (TIER A · Gaia2, clarification kapısı) kendi konusudur
ve içinde `pass@1 = 0` olan, hiçbir `k`'da düzelmeyen bir arıza sınıfı vardır. Bu haldeyken alınan
skor o kriterin ne ölçtüğünü değiştirir.

**S119'DA SEBEP DARALDI, VE BİR ARCHITECT HİPOTEZİ ÖLDÜ — §4'e bakınız.** Discovery altyapısı
kurulu VE dolu. Yani arıza discovery'nin YOKLUĞU değil; ondan SONRAKİ bir yerde. Yeni oturumun ilk
teşhis kartı bunu bilerek kesilmeli — dünkü "kaldıraç DISCOVERY-EXTEND-2" cümlesi ölçümle
daraltıldı, çürütülmedi ama artık tek başına yeterli bir açıklama değil.

### ⓶ `mcp-honestbench` DURUMU — ÇELİŞKİ, ÖNCE BU ÇÖZÜLMELİ

| taşıyıcı | ne diyor |
|---|---|
| `cwf-open-items-register-v121` §5 | **NOT BUILT** |
| `cwf-implementation-order-S118-v31` §1 A4 | *"Containerised, locally proven, deliberately never published"* — KURULU, yayınlanmamış |

İkisi aynı anda doğru olamaz. Ve bu, kabul sözleşmesinin ÖLÇÜM ALETİDİR: on altı kriterin on
altısının UNMEASURED olmasının sebebi bu satırdır. **Aletin durumu bilinmeden "hazır mıyız" sorusu
sorulamaz.** Yeni oturumun ilk ölçümlerinden biri budur ve BİRİNCİL kaynaktan doğrulanır
(S102 · türev kaynağın yerine geçmez).

### ⓷ `#81 BACKEND-DISCOVERY-1` — SAHİP HAKLI, LİSTEYE GİRİYOR

**ÖLÇÜLDÜ** — `docs/ground/open-items.md:83` [PI-002], taze klonda okundu:

- **Bu bir PHASE değil, bir BANT.** DOCUMENT sınıfı fazı (`PHASE-DOC-CORPUS-DISCOVERY-1`) S110'da
  indi ve `2499b0be…`'de master'ın atası olduğu kanıtlandı. **Bir bandın bir fazının inmesi bandı
  kapatmaz** — defterin kendi cümlesi.
- **Ve bant vektör korpusunu KAPIYOR:** `docs/relay/PHASE-VECTOR-CONSUMER-1-report.md`, korpusun
  ***"#81 inene kadar"*** indekssiz kaldığını söylüyor. `docs/ground/facts.json` raf-doldurma fazını
  "#81 bandı" altında dosyalıyor.

**Kapıyı neden geçer:** vektör korpusu indekssizse retrieval kriterleri ne ölçtüklerini değiştirir.

#### ⓷a · ENGELİN SINIFI DEĞİŞTİ — v2'nin yazılma sebebi

**ÖLÇÜLDÜ (repo):** #81'in ingestion-pipeline şartnamesi `cwf-ir-pathb-hybrid-logic-v1_3.html`
§2'de yaşıyor. Bunu iki bağımsız yer AÇIKÇA söylüyor — `docs/design/INDEX.md:38` ve
`.agents/CHANGELOG.md:129` — ve ikisi de baytların **bu repoda olmadığını** kaydediyor:
`disposition: owner-held`, *"gated vocabulary; deferred to #82b Design-RAG unpark."*

**v1 BURADAN ŞU SONUCU ÇIKARMIŞTI:** #81 ya `#82b` park'tan çıkarılmadan ya da sahip baytları
vermeden bitirilemez — **bir SAHİP KARARI, ve yeni bir tane.**

**SAHİP TANIKLIĞI (S119, verbatim): _"doküman reposunda, bunların hepsi var."_**

**BAĞLAYICI SONUÇ, VE FARK ÖNEMLİ:**

> Baytlar KAYIP DEĞİL. v1'in cümlesinin ikinci şıkkı zaten gerçekleşmiş durumda — baytlar ayrı bir
> doküman reposunda duruyor. **Yani #81'in önündeki engel bir KARAR değil, bir OKUMA'dır.**
> Bir okuma MAKİNE işidir (S102-YASA-1): sahibe taşınmaz, bir şeride kartla verilir.
> **#81 bu yüzden artık sahip kritik yolunda DEĞİLDİR.**

**VE `#82b` BU YÜZDEN PARK'TAN ÇIKMIŞ SAYILMAZ.** Bir şartnameyi OKUYABİLMEK ile Design-RAG'i
unpark etmek iki ayrı şeydir; sahibin *"ASLA UNUTMA"* dediği park kararı yerinde durur. Bu ayrımı
karıştıran her cümle bir park kararını sessizce iptal eder.

**ÖLÇÜLMEMİŞ, VE YENİ OTURUMUN #81 ÜZERİNDEKİ İLK İŞİ BUDUR:** doküman reposunun ADI, erişim yolu,
`cwf-ir-pathb-hybrid-logic-v1_3.html`'in orada gerçekten bulunduğu, ve §2'nin md5'i. Sahip tanıklığı
"var" için birincil kaynaktır; **NEREDE ve HANGİ HALDE olduğu için değildir** — o bir ölçümdür ve
yapılmamıştır. Defterde ayrıca **"org repo migration"** ve **"archive automation → private repo"**
kalemleri duruyor; aynı repo olup olmadıkları ÖLÇÜLMEDİ ve varsayılmamalıdır.

---

## §3 · SOTA ÖNCESİ ZORUNLU **DEĞİL** — `PHASE-CONTEXT-RETRIEVAL-1` (sahip haklı)

**ÖLÇÜLDÜ**, ve tek bir negatif probla değil (S102 · tek negatif prob yokluk kanıtı değildir):
tüm dosya türlerinde arandı, ayrıca `contextRetrieval` ve `context_retrieval` formülasyonları
ayrıca denendi. Adı geçen dokuz dosya:

```
scripts/land.ts · landScript.test.ts · groundLedger.test.ts   -> yalnız DAL ADI olarak (fixture)
docs/ground/open-items.md                                      -> defter kaydı
docs/design/ADF-ARCHITECTURE-v1.html                           -> ADF = FABRİKA, ürün değil
docs/relay/*.md (dört rapor)                                   -> hepsi fabrika işi raporu
```

**Sıfır ürün kaynak dosyası. Sıfır ürün testi. Sıfır ADR.** Bu kalem Architect'in KENDİ bağlam
erişimidir — yani benim çalışma hafızam — CWF'nin çalışma zamanı değil. **Kapıyı geçmez, listeden
çıkar.** (Tasarım dokümanı hâlâ yok ve bu ayrı bir borç olarak defterde kalır.)

---

## §4 · S119'DA ÖLEN BİR ARCHITECT HİPOTEZİ — kayda geçer, çünkü ölçüm türetmeyi yener

**Hipotez (benim):** #29 A23'ün entity-unresolved arızası, `PHASE-DISCOVERY-EXTEND-2`'nin
`entity_topology_edges` migration'ının uygulanmamış olmasındandır. Dayanak:
`shared/grantPolicy.ts:70` — ***"AUTHORED, Operator-pending — 20260813101000_entity_topology_edges.sql"***.

**ÖLÇÜM (canlı DB, 2026-08-26 ~07:35Z) — HİPOTEZ ÇÜRÜTÜLDÜ:**

```
supabase_migrations.schema_migrations version='20260813101000'   -> 1 satır (UYGULANMIŞ)
to_regclass entity_topology_edges / entity_registry / backend_entity_layers -> üçü de VAR

entity_topology_edges   783 satır
entity_registry         800 satır
backend_tools           330 satır
backends                  7 satır
backend_entity_layers     3 satır
```

**Discovery altyapısı kurulu VE dolu.** Yani #29'un arızası eksik bir discovery zemininden
kaynaklanmıyor; sebep ondan SONRA. Bu, yeni oturumun teşhis kartını daraltır.

**VE BİR BULGU DOĞURDU:** `F-S119-GRANT-POLICY-COMMENT-ASSERTS-A-STALE-PENDING-MIGRATION-1` —
bir kaynak yorumu, on üç gün önce uygulanmış bir migration'ı hâlâ "Operator-pending" diye canlı
durum olarak iddia ediyor. Bir sonraki okuyucusunu yanıltacak bir satır. (`shared/dbConstants.ts:626`
ayrıca *"A RULING IS OWED — docs/relay/PHASE-DISCOVERY-EXTEND-2-report.md"* diyor; o hüküm hâlâ borç.)

**`backend_entity_layers = 3`, 7 backend ve 800 varlığa karşı.** Bu bir MERCEK konusudur, bulgu
değil — 3 gerçek veridir, boşluk değil (empty ≠ zero). Kapsamın doğru olup olmadığı ÖLÇÜLMEDİ.

---

## §5 · V31'İN, SAHİBİN VARSAYIMINI DOĞRUDAN ÇÜRÜTEN ÖLÇÜMÜ — kaybolmasın diye buraya taşındı

`cwf-implementation-order-S118-v31` §0, S118 recon'unda ölçüldü:

> *"Kabul sözleşmesinin 'bloke' dediği harness KOD TARAFINDAN BLOKE DEĞİL. Her kod tabanı onarıldı
> ve bağlandı; her faz indi."*

SOTA ile CWF arasında duran şey **inşa işi değil**: bir host (A1) · kimlik bilgileri (A2) ·
Operator'ın iki veri satırı (A3) · aletin yayınlanması (A4) · harcama izni (A5). **Beşi de sahip
yüzeyi, hiçbiri kod.** "Önce CWF'yi bitirelim" harfiyen uygulanırsa, inşanın BLOKE ETMEDİĞİ bir
ölçüm geciktirilir — ki bu tam olarak v30'un şekliydi ve recon onun öncülünü çürüttü.

**A3, A4'ün AŞAĞISINDADIR** (S119'da ölçüldü, v31 bunu paralel sanıyor). Sahip tarafındaki kritik
yol dört değil **üç** karardır — ve v2'nin §2⓷a düzeltmesinden sonra **#81 o yola EKLENMEZ.**

---

## §6 · İKİ SKORBORD — bir kapanış yalnız (A)'yı anıyorsa eksik kapanmıştır

**(A) İÇ 7-ANAHTAR SAYACI — 6/7.** Açık: `#29` A23. Kanonik enumerasyon
`cwf-sota-full-table-S106-v2` §A. **Bu bir İÇ HAZIRLIK ölçüsüdür ve KABUL KRİTERİ DEĞİLDİR.**

**(B) KABUL SÖZLEŞMESİ — 0/16.** `cwf-sota-definition` v1_5 §10. On altı dış kriterin on altısı
ÖLÇÜLMEDİ · `mcp-honestbench` durumu ÇELİŞKİLİ (§2⓶) · D-OPA-2 / D-OPA-3 ÖLÇÜLMEDİ · maliyet
ÖLÇÜLMEDİ. Ölçülmüş tek satır iç M-A satırlarıdır ve §10.1'in kendi cümlesi geçerlidir: C2 altında
iç, kendi koşulmuş, yayınlanmamış bir sayı bir **otoportredir**.

> **Yedinci anahtarı çevirmek SOTA-1'i TATMİN ETMEZ.** "SOTA kapısı 6/7" diye kapanıp (B)'yi anmayan
> her oturum eksik kapanmıştır.

(B)'nin tek ölçülmüş satırının son kullanma tarihi OLAY-TABANLIDIR ve muhtemelen dolmuştur —
`frameRouting=1` S106'da canlıya geçti — **ama bu ÖLÇÜLMEDİ.** Çözen ölçüm `MA-RERUN-2`'nin
`b0e8c9e2` sonrası yeniden koşusu; S113–S117 arası hiç koşulmadı.

---

## §7 · YENİ OTURUMUN AÇILIŞ SIRASI (sahip talimatı: temizlik önce, "CWF işleri temiz başlasın")

1. **Taze klon + canlı DB ile ÇAPA doğrulaması.** Bu belgedeki her sayı bir İDDİADIR.
2. **FULL TEMİZLİK — local git ile GitHub %100 senkron.** Sahibin S119'daki birinci ve S120'deki
   tekrarlanan talebi, ve gerekçesi kendi cümlesi: *"temizlik olsun ki CWF işleri temiz başlasın."*
   Sırası: **(a)** uçuştaki dört kart raporu toplanır — AG-1 `BUILD-DOCS-ASSERTION-1` ·
   AG-2 `AUTHOR-LENS-DIAGNOSE-1` · AG-3 `A2A-BUILD-EOF-1` · AG-5 `LANDING-ORDER-4`;
   **(b)** yazar merceğinin kilitlediği dallar için hüküm verilir (AG-2'nin raporu seçenek kümesini
   getirir, SEÇMEZ — seçim Architect'in, sahip rızasıyla); **(c)** süpürge 34'ün 1'inde DURUYOR ve
   devamı ayrıca sahip sözü ister (yıkım; durdurma emrini sahip verdi).
3. **`mcp-honestbench` durumunu BİRİNCİL kaynaktan çöz** (§2⓶).
4. **`#29 A23` teşhis kartı** — §4'ün daralttığı sebep uzayıyla. Sahip: *ilk iş.*
5. **`#81` için DOKÜMAN REPOSU OKUMASI** (§2⓷a) — sahip kararı değil, bir şeride kart. Repo adı,
   erişim yolu, dosyanın varlığı ve §2'nin md5'i ölçülür.

**S119 KAPANIŞ BORCU, devredildi:** `S118-FINDINGS-ADDENDUM-1` → `S118-SESSION-NOTES` birleştirme ·
`REGISTER-BUG-BUCKET` / `cwf-open-items-register` / `CWF-SESSION-GRAPH-KB` S119 sürümleri ·
`cwf-implementation-order` S119 (A3'ün A4'ün aşağısında olduğunu taşıyarak) · `CWF-S119-SESSION-CLOSE` ·
`bootstrap v120` — **çapa tablosu kapanışın SON EYLEMİ olmak zorunda**
(`F-S119-ANCHOR-MINTED-BEFORE-THE-LAST-ACT-1`).

**S119'UN BULGU DEFTERİ** `claude/S119-FINDINGS-LEDGER-v3.md`'dir ve carry-diff tablosuyla birlikte
neyin sınıf değiştirdiğini taşır. Bu belge onun yerine geçmez; onun yanında durur.

<!-- END · S119-CWF-READINESS-REVIEW-v2 -->
