# CWF-TURN-DEBUG-RECON-S103-v2 — canlı tur teşhisi · ARMES araç yüzeyi

<!-- v2 · 2026-08-17: MEKANİZMA DÜZELTMESİ (RULE-20 — yeni sürüm, sessiz tadil değil).
     v1'in "istemci tarafı yanıt-şeması doğrulaması" atfı AG-4'ün ölçümüyle
     (branch phase/tool-arg-truth-1 @ 851692eb) YANLIŞLANDI ve düzeltildi;
     atıf hatası Architect'indir (türetilmişti, ölçülmemişti). v1 arşivde
     immutable yaşar (S37-1). Değişen: §0 · §1-analiz · §4 (3 yeni kalem) · §6. -->

<!-- CWF-TURN-DEBUG-RECON-S103-v2 · 2026-08-17 · Architect (paralel debug oturumu + AG-4 R0 ölçümü).
     KAYNAK: Supabase fjbrkimwvtpwoxhziidh CANLI okumaları — turn_trace_digest
     (span input/output baytları), backend_tools (input_schema), 
     tool_behavior_census, entity_registry. Ekran görüntüsü KANIT SAYILMADI;
     her iddia bir turn_id + span baytına dayanır.
     STATÜ: RECON — faz kartı DEĞİL. Kart kesilmeden önce §7'deki SQL ile
     bağımsız yeniden ölçülür (RULE-25: rapora güvenilmez).
     ⚠ turn_trace_digest 14 GÜNLÜK aynadır (ADR-008): bu turlar
     2026-08-31'den sonra okunamaz. Yeniden ölçüm o tarihten önce yapılmalı. -->

**PRECONDITION (S47-1):** Bu belge, 2026-08-17 08:03–09:01 UTC arasında canlı
üretimde koşan 18 turun beşini konu alır. Okuyan Architect'in `REGISTER-BUG-BUCKET`,
`cwf-open-items-register` ve `cwf-implementation-order` sürümlerini güncellemesi
beklenir. Hiçbir faz kartı bu belgeden TÜRETİLMEZ; §7 yeniden ölçülür, sonra kesilir.

---

## §0 · TEK CÜMLELİK HÜKÜM (v2 — mekanizma ÖLÇÜLDÜ)

Bu beş tur bir zekâ problemi değil bir **doğruluk-yüzeyi** problemidir: ARMES
çağrıları taşıma katmanında başarılı dönüyor, **karşı uçtan gelen bir
doğrulama-reddi METNİ** sonucun gövdesinde geliyor, bizim tarafta hata/veri
ayrımı bir **dize koklamasıyla** yapılıyor (`!!JSON.parse(resultText)?.error`)
ve `{error:…}` şeklinde OLMAYAN her ret **başarılı cevap** sayılıp modele veri
gibi veriliyor; model onu iş kuralı sanıp kullanıcıdan malzeme numarası
istiyor — ve aynı anda, hangi çağrının çalıştığını bilen iki organ hiç açılmıyor.

**KÖK KUSUR BİR TİPTİR (AG-4 ölçümü):** `executeMcpTool` `Promise<string>`
döndürür ve her başarısızlık yolu `JSON.stringify({error})` döndürür — cevapla
başarısızlık AYNI TİPTİR, hata-lığı baytlardan TAHMİN edilmek zorundaydı.
**v1'in "istemci tarafı yanıt-şeması doğrulaması" atfı YANLIŞTI:**
`outputSchema`/`structuredContent` bu repoda SIFIR kez geçiyor (altı ayrı
formülasyonla probe edildi — tek negatif prob yokluk kanıtı değildir) ve kurulu
MCP SDK 1.29.0 hem FARKLI bir cümle basar hem THROW eder — o siteden
`isError:false` üretilemez. Atıf hatası Architect'indir; ölçüm türetmeyi yendi.

**Kartın adlandırmadığı sonuç (AG-4 buldu):** aynı boolean `recordToolSuccess`'ı
besliyordu — yanlış okunan retler davranış kaydına **BAŞARI** olarak yazıldı;
sistem, hiç cevap vermeyen bir aracın "çalıştığını" öğreniyordu.

**ÖZ-DÜZELTME zinciri (A-REC, kayda):** ilk okuma kökü "zorunlu-param dolgusu"
sandı → bayt okununca "doğrulama + isError yalanı"na daraldı (v1) → kod okununca
"tip birleşmesi + dize koklaması"na daraldı (v2). Her katman bir öncekini
ölçümle düzeltti.

## §1 · BEŞ TURUN BAYTI (turn_trace_digest · stage 10)

Oturum: 2026-08-17, yerel saat (UTC+3). Tek konuşma.

| # | turn_id | Yerel | Jeton | Gönderilen argüman → dönen |
|---|---|---|---|---|
| A | `7ac14543914b4bfa5f566169ddf64c27` | 11:55 | **112.490** | `getFactoryList{}` → 17 · `getRecipeTemplates{limit:0, isSampling:false, factoryId:"Sir", startDate:1786914000000, operationalTest:false, isMill:false, intervention:false, endDate:1786956919600}` → **VALIDATION FAILED** · `search_tools{"recipe list"}` → 4 (Superset katalogundan) |
| B | `ac7c52be1820df8072f7138d3691acb8` | 11:56 | **66.877** | `getFactoryList{}` → 17. **Başka veri çağrısı yok.** |
| C | `a5e7901458358343543b5b5342a88e9d` | 11:59 | **102.320** | `getFactoryList{}` → 17 · `getOrders{date:1786914000000, factoryId:"Sir"}` → **VALIDATION FAILED** |
| D | `cd1f5447dede9c8d898df734076fb0a0` | 12:00 | **64.521** | `getFactoryList{}` → 17. **Sıfır keşif.** |
| E | `76a591c41097130d305d1db0f9d768eb` | 12:01 | **308.020** | `getOrderList{Sir}` → 0 · `getMaterials{Sir, materialType:[]}` → 0 · `getRecipeTemplates{… materialNumber:"", limit:0, recipeType:"NORMAL" …}` → 0 · `getFactoryList{}` → 17 · `getOrderPlanRequestList` → 2 bayt (`[]`) |

**Toplam 654.228 jeton · sıfır cevaplanmış soru.**
A ve E **bayt-aynı** İngilizce soru, 6 dakika arayla, iki tamamen farklı plan.
Beş turun beşinde de arayüz "No registered procedure was used" ve
"3 past interaction(s) recalled" yazdı — hatırlama planı hiç değiştirmedi.

### Doğrulama hatasının tam metni (birincil bayt)

Tur C, `cwf.mcp.tool` span çıktısı:

```
{"bytes":138, "isEmpty":false,
 "head":"Validation failed: structuredContent does not match tool outputSchema.
         Validation errors: [: required property 'materialNumber' not found]",
 "recordCount":null, "returnedRecords":null, "truncated":false, "isError":false}
```

Aynı turun `cwf.mcp.attempt` span'ı: `{"ok":true, "ms":439, "resultBytes":138}`.
Tur A'da aynı hata iki alan için: `'materialNumber'` + `'recipeType'`.

Üç şey aynı anda doğru ve üçü de kusur (v2 — düzeltilmiş atıfla):
1. **Metin karşı uçtan geliyor** — çağrı sunucuya gitti, 439 ms'de döndü,
   ret metni sonucun gövdesindeydi. Reddin karşı uçta HANGİ katmanda üretildiği
   (gateway mi, ARMES sunucusu mu) hâlâ ölçülmedi — tedarikçi notunun konusu.
2. **Bizim tarafta hata-lık dize koklamasıyla tahmin ediliyordu** —
   `{error:…}` şekli dışındaki her ret `isError:false` aldı; hata metni `head`
   alanına veriymiş gibi kondu, `recordCount:null`.
3. **Model bunu iş kuralı sandı** ve kullanıcıya "bana bir malzeme numarası
   verir misiniz?" dedi. Kullanıcı, makinenin kendi körlüğünü kapatmaya çağrıldı.

---

## §2 · ŞEMA SAYIMI (backend_tools · birincil kaynak)

**141 aktif ARMES aracının 134'ünde `required` = TÜM özellikler.**
4 sıfır-argüman · 1 tam-opsiyonel · 2 kısmi · 15 araçta ≥4 zorunlu.
Yani katalogda **opsiyonel parametre diye bir şey yok.**

| Araç | required |
|---|---|
| `getRecipeTemplates` | factoryId, startDate, endDate, materialNumber, recipeType, **limit**, intervention, isSampling, operationalTest, isMill (**10**) |
| `getOrders` | factoryId, materialNumber, **date** (integer, birimsiz) |
| `getMaterialList` | factoryId, materialId, equivalentMaterialId, orderPlanRequestId, interventionRequestId, **inventoryOnly** (**6**) |
| `getMaterials` | factoryId, materialType |
| `getMaterialListByRecipeType` | factoryId, recipeType |

İkincil sonuç (Tur E'de ölçüldü): model şemayı tatmin etmek için **dejenere
yer tutucu** doldurdu — `limit:0` (sıfır kayıt istedi), `materialNumber:""`,
`materialType:[]`. Üçü de garantili `[]` üretir; üçü de kullanıcıya
"veri yok" diye okundu. **empty≠zero'nun araç-çağrısı katmanı yok.**

---

## §3 · ÖLÜ ÖLÇÜMLER (S98-L4 ihlali — ikisi de aynı gün, aynı veritabanı)

**(a) `tool_behavior_census` — aynı sabah 06:04–08:02 (yerel) koşmuş:**

| Araç | outcome | reason |
|---|---|---|
| `getOrders` | **unread** | required param `date` declares type 'integer' and publishes no machine-readable default |
| `getRecipeTemplates` | **unread** | aynısı, `startDate` |
| `getMaterials` | ok | **empty** — prob da `materialType:[]` yollamış |
| `getOrderList` | ok | **493 kayıt** (çalışan çağrı şekliyle) |
| `getFactoryList` | ok | 17 |

Dört saat sonra canlı planlayıcı tam aynı hatalara düştü. Ölçüm var, tüketici yok.
**Alt kusur:** census `call_shape.args.factoryId = {source:"discovered-specimen"}`
yazıyor, **değeri yazmıyor** → kendi 493'ünü yeniden üretemez (S102: ne ölçtüğünü
adıyla basamayan kanıt reddedilir).

Census kapsamı: 97/141 araç · **18 ok** (6'sı boş) · **79 okunamadı**
(43 `required-param-unresolvable` · 35 `no-specimen-discovered` · 1 `transport`).

**(b) `entity_registry` — 800 satır aynalı: 17 fabrika + 783 hat.**
`Sir` = "Sır Hazırlık - Çan", `Sir_Yerkoy` = "Sır Hazırlık - Yerköy" ikisi de kayıtlı.
Buna rağmen `getFactoryList` **6 turda uzaktan yeniden çağrıldı**; `"Sir"` dizesi
LLM tahminiyle yazıldı (tesadüfen doğru çıktı); `resolveEntityRef` hiç koşmadı;
Çan/Yerköy muğlaklığı hiç raporlanmadı. A23 ④ boşluğu artık **ölçülmüş vaka**.

---

## §4 · BUG REGISTER SATIRLARI (kopyala-yapıştır · v40 için)

| Kalem | Ağırlık | Bir cümle + kanıt |
|---|---|---|
| `F-S103-VALIDATION-AS-DATA` | **YÜKSEK** | MCP yanıt-şeması doğrulama hatası `isError:false` ile veri gibi modele veriliyor; model iş kuralı sanıp kullanıcıdan girdi istiyor. Kanıt: turn `a5e7901458358343543b5b5342a88e9d` span çıktısı |
| `F-S103-TOOL-RESULT-TYPE-CONFLATION` | **YÜKSEK · KÖK** | `executeMcpTool: Promise<string>`; her başarısızlık `JSON.stringify({error})` → cevap ve başarısızlık aynı tip, hata-lık dize koklamasıyla tahmin. S1 üç sınıfı TİPLE ayırdı (851692eb) — sarım katmanı KAPANDI; kalan yarısı (dejenere-arg göndermeme) S2'de |
| `F-S103-CENSUS-POISONED-BY-MISREAD` | **YÜKSEK** | Aynı boolean `recordToolSuccess`'ı besliyordu → yanlış okunan retler davranış kaydına BAŞARI yazıldı. Kirlilik KAPSAMI ölçülecek (hangi kayıtlar, hangi pencere) — S1 sonrası temiz akış başladı, geçmiş kayıt ayrı temizlik kalemi |
| `F-S103-PURE-TEST-CANNOT-GUARD-WIRING` | DERS (filo-geneli) | Sınıflandırıcı kablolu + birim süiti yeşilken kablolamayı KAPATMAK bütün süiti yeşil bıraktı — saf-fonksiyon testi kablolama kusurunu koruyamaz. Çare: gerçek kayıt yolunu süren kompozisyon ağı (iki bağımsız ağ, tek ağın iki adı değil) |
| `F-S103-OUTPUTSCHEMA-MIRRORED-NEVER` | **YÜKSEK** | `backend_tools` yalnız `input_schema` saklıyor; bizi reddeden `outputSchema` katalogda YOK — reddeden şemayı okuyamıyoruz |
| `F-S103-REQUIRED-ALL-134` | **YÜKSEK** | 141 aracın 134'ünde required=tüm paramlar → dejenere yer tutucu dolgusu (`limit:0`, `materialNumber:""`, `materialType:[]`) → sahte "veri yok" |
| `F-S103-DEGENERATE-ARG-EMPTY` | **YÜKSEK** | Geçersiz-argüman kaynaklı boş, gerçek boştan ayrılmıyor; bayrak kendisiyle çelişiyor: `{recordCount:0, head:"[]", isEmpty:false}`. Üçüncü sınıf gerekli: `not-asked:degenerate-arg` |
| `F-S103-ASK-FOR-THE-ANSWER` | **YÜKSEK** | Ürün, cevabın kendisini kullanıcıdan istiyor (malzeme numarası); Tur D **izin bile istedi**. ⑥ yasası: NIL+taşıyıcı → BİLDİR + kapsamlı liste, SORMA. `F-S98-SHIFT-QUERY-UNUSABLE`'ın reçete yüzeyindeki tekrarı |
| `F-S103-TOOLSEARCH-WRONG-CATALOG` | **YÜKSEK** | Tek keşif aracı `search_tools` **Superset** geçidini arıyor; ARMES'in 141 aracı aranabilir değil. Tur A `"recipe list"` sorgusuna `list_databases`/`list_datasets` döndü. Tur D bu yüzden "böyle bir aracımız yok" dedi — oysa `getMaterialListByRecipeType(factoryId, recipeType)` katalogda DURUYOR |
| `F-S103-CENSUS-NOT-CONSUMED` | **YÜKSEK** | S98-L4; + census specimen DEĞERİNİ saklamıyor → kendi kanıtı replay edilemez |
| `F-S103-LOCAL-MIRROR-BYPASS` | ORTA | 17 fabrika aynalı; 6 turda uzaktan çekildi; resolve hiç koşmadı; Sir/Sir_Yerkoy muğlaklığı raporlanmadı |
| `F-S103-NO-CROSS-TURN-CARRIER` | ORTA | A-10 taşıyıcı yok; çözülmüş `Sir` + zaman penceresi her tur çöpe; 5 turda 654.228 jeton |
| `F-S103-TURN-BUDGET-WALL` | ORTA | 300k jeton / 120k karakter kapıları **post-hoc**; Tur E kullanıcıyı "Şimdi … sorgulayalım:" cümlesinde bıraktı |
| `F-S103-SAME-QUESTION-TWO-PLANS` | ORTA | Bayt-aynı soru → iki plan; 5/5 turda "No registered procedure was used"; prosedür indüksiyonu sıfır |
| `F-S103-TIMERANGE-LABEL-LIE` | DÜŞÜK / güven-kritik | Hesap DOĞRU (`1786914000000` = 17.08 00:00+03), etiket YANLIŞ: ekranda "16.08.2026 21:00:00 UTC+3". UTC saati UTC+3 etiketiyle basılıyor — RULE-20 sınıfı yüzey yalanı |
| `F-S103-ANSWER-LANGUAGE-DRIFT` | DÜŞÜK | İngilizce soru → Türkçe cevap (Tur A ve E) |
| `F-S103-DIGEST-SPAN-CAP` | **HİPOTEZ** | Tur E'nin stage-10'u tam 20 span'de kesik; 7 araçlı tur = en büyük tur, en eksik iz. FULL-TRACE erozyonu olabilir — **digest yazıcısının koddan okunmasıyla doğrulanır, iddia edilmiyor** |

---

## §5 · SIRA ÖNERİSİ — `PHASE-TOOL-ARG-TRUTH-1`

Bu bir #29 işi **değil**. #29'un §9-adım-1 taban çizgisini bu beş tur zaten
üretti; ama **taban çizgisi bu kusurun üstünde ölçülürse kirli doğar** —
"turu öldüren soru" davranışının bugünkü hâlinin bir kısmı zekâ değil,
yanlış etiketlenmiş bir transport hatası. Bu yüzden bu, S61-2 borcudur:
doğrularken yüzeye çıktı, sonraki blok açılmadan temizlenir.

**Tek kart, üç dikiş (hepsi aynı dikiş yerinde — TEK-ORGAN):**

1. **Sonuç sınıflandırması (birinci ve zorunlu).** MCP çağrı sonucu üç sınıf
   basar: `answered` · `unreadable` (transport/doğrulama/yetki — **`isError` gerçeği
   söyler**) · `not-asked:degenerate-arg`. Doğrulama metni bir daha ASLA
   `head` alanına veri gibi girmez. Bu, MEASURE-READ-HONESTY-1'in araç katmanı.
2. **Governed `tool_arg_policy` satırları** (RULE-1: kodda sabit yok): gerçek-zorunlu
   alt küme · güvenli varsayılan (`limit`) · tip/birim beyanı (epoch-ms) ·
   "bu param yer tutucuyla gönderilemez" bayrağı. Dejenere argümanlı çağrı
   **gönderilmez**; modele boş dizi değil adlandırılmış ret + eksik slotun
   kapsamlı adayları (`entity_registry`/census'tan) döner.
3. **Census → argüman kurucu.** Çalışan çağrı şekli specimen **DEĞERİYLE** yazılır
   ve argümanı kuran yere bağlanır. `getOrderList`'in 493'ü yeniden üretilebilir olur.

**Kartın çıkış kapısı:** Tur A'nın sorusu (`"active recipes used in the SIR
factory this week"`) yeniden koşulur ve üç şey ölçülür — (a) hiçbir dejenere
argüman gönderilmedi, (b) hiçbir doğrulama metni veri olarak modele geçmedi,
(c) cevap ya veriyle gelir ya `NIL + kapsamlı liste` ile — **kullanıcıya soru
sorulmaz.**

**Bekleyen sahip hükmü:** bu kart Dalga 8'in içine borç-temizliği olarak mı
giriyor, #25/#29'un önüne mi geçiyor. (Architect görüşü: **önüne** — gerekçe
yukarıdaki "kirli taban çizgisi" cümlesi.)

**Ayrıca tedarikçiye gider:** `ARDIC-ARMES-arac-notu-2026-08-17` (ayrı artefakt,
aynı ölçümlerden yazıldı) — şema `required` genişliği, `outputSchema` reddi,
tip/birim beyanı, 97 araçlık sayım tablosu.

---

## §6 · NE İDDİA EDİLMİYOR (TOTAL-45)

- **`outputSchema`'nın `inputSchema` ile aynı olduğu İDDİA EDİLMİYOR.** Ölçülen
  şey yalnız hata METNİdir. Reddeden şema bizde aynalı değil (§4 kalemi);
  ham `tools/list` okunmadan sebep adlandırılamaz.
- ~~Doğrulamayı kimin yaptığı okunmadı~~ → **v2'de ÖLÇÜLDÜ:** bizim tarafta ve
  SDK'da DEĞİL (altı formülasyon + SDK 1.29.0 davranış probu, 851692eb).
  Karşı uçtaki üretim katmanı (gateway/ARMES) hâlâ ölçülmedi — ARDIC sorusu.
- `F-S103-DIGEST-SPAN-CAP` hipotezdir; 20 sayısı gözlemdir, sınır olduğu değil.
- Tur E'de `getOrderList{Sir}` → 0 dönüşünün **gerçek** boş mu (Sır Hazırlık'ta
  iş emri yok) yoksa filtre kaynaklı mı olduğu **ayrıştırılmadı**. Tek negatif
  prob yokluk kanıtı değildir; census'un 493'ü BAŞKA bir fabrikadan olabilir.
- Dil kayması (İngilizce soru → Türkçe cevap) kusur olarak yazıldı; ürün
  hükmü sahibindir.

---

## §7 · YENİDEN ÖLÇÜM (RULE-25 · rapora güvenme, bunu koş)

```sql
-- 1) Beş turun argümanları ve dönüşleri (14 gün · 2026-08-31'e kadar)
select d.created_at, d.turn_id, d.token_summary->>'totalTokens' as tok,
 (select string_agg(coalesce(s->>'input','')||' -> '||coalesce(s->>'output',''), ' || ' order by ord)
  from jsonb_array_elements(coalesce(d.stages->'10'->'spans','[]'::jsonb)) with ordinality t(s,ord)
  where s->>'span'='cwf.mcp.tool') as tool_calls
from public.turn_trace_digest d
where d.turn_id in ('7ac14543914b4bfa5f566169ddf64c27','ac7c52be1820df8072f7138d3691acb8',
                    'a5e7901458358343543b5b5342a88e9d','cd1f5447dede9c8d898df734076fb0a0',
                    '76a591c41097130d305d1db0f9d768eb')
order by d.created_at;

-- 2) required = tüm özellikler sayımı
with t as (select tool_name,
  coalesce(jsonb_array_length(input_schema->'required'),0) req_n,
  (select count(*) from jsonb_object_keys(coalesce(input_schema->'properties','{}'::jsonb))) prop_n
  from public.backend_tools where backend_id='armes' and status='active')
select count(*) total, count(*) filter (where req_n>0 and req_n=prop_n) all_required,
       count(*) filter (where req_n>0 and req_n<prop_n) partial, count(*) filter (where prop_n=0) zero_arg
from t;

-- 3) Ölü ölçüm: census
select outcome, count(*), count(*) filter (where empty_result)
from public.tool_behavior_census where backend_id='armes' group by 1;

-- 4) Ölü ölçüm: yerel ayna
select layer_key, count(*) from public.entity_registry group by 1;
```

<!-- END · CWF-TURN-DEBUG-RECON-S103-v2 -->
