# ARDIC'a Not — ARMES (KB7) Araç Yüzeyi: 5 Kalem
*CWF platformu · 2026-08-17 · 13 Ağustos notunun devamı · Tüm sayılar canlı ölçümdür:
141 aracın şeması araç kayıt aynasından, 97 aracın davranışı canlı çağrılarak,
örnek turlar üretim izlerinden okunmuştur.*

## 0. ÖNCE İYİ HABER — yetki düzeltmesi işe yaradı
13 Ağustos notunun 1. maddesindeki *"User has no access to factory"* hatası
**bugünkü 97 araçlık sayımda hiç görülmedi.** Örnek: o gün erişilemeyen
`getOrderList` bugün **493 kayıt** döndürdü. Teşekkürler. Aşağıdaki beş kalem
yetkiyle ilgili değil, **şema ve sözleşme** ile ilgilidir.

---

## 1. YANIT DOĞRULAMASI — çağrı başarılı dönüyor, yanıt reddediliyor
Bugün üretimde, gerçek bir kullanıcı sorusunda alınan hata:

```
Validation failed: structuredContent does not match tool outputSchema.
Validation errors: [: required property 'materialNumber' not found]
```

Çağrı sunucuya ulaştı ve **439 ms'de başarıyla döndü**; reddedilen şey yanıtın
kendisi oldu. Anlaşıldığı kadarıyla araçların **çıktı şeması (`outputSchema`),
girdi şemasıyla aynı alanları zorunlu sayıyor** — yani yanıt nesnesinde
`materialNumber`, `recipeType` gibi **istek parametreleri** aranıyor.

Sonuç, uçtaki kullanıcı için şudur: asistan bu metni bir **iş kuralı** sanıyor
ve kullanıcıya *"bana bir malzeme numarası verir misiniz?"* diye soruyor.
Yani sistem hatası, kullanıcıdan veri isteğine dönüşüyor.

**Talep:** `outputSchema` girdi şemasından ayrı tanımlansın; yanıtın gerçekten
içerdiği alanları tarif etsin. En azından istek parametreleri yanıt şemasında
`required` olmasın.

---

## 2. ŞEMA — 141 aracın 134'ünde TÜM parametreler zorunlu
Ölçüm: 141 aktif araç · **134'ünde `required` = tüm özellikler** · 4 sıfır-argümanlı
· 1 tam-opsiyonel · 2 kısmi. Yani katalogda pratikte **opsiyonel parametre yok.**

Örnekler:

| Araç | Zorunlu alanlar |
|---|---|
| `getRecipeTemplates` | factoryId, startDate, endDate, materialNumber, recipeType, **limit**, intervention, isSampling, operationalTest, isMill — **10 alan** |
| `getMaterialList` | factoryId, materialId, equivalentMaterialId, orderPlanRequestId, interventionRequestId, **inventoryOnly** — **6 alan** |
| `getOrders` | factoryId, materialNumber, date |

Filtre alanlarının ve `limit`in zorunlu olması, çağıran tarafı **boş yer tutucu**
doldurmaya mecbur bırakıyor. Bugün üretimde gerçekleşen çağrı:

```
getRecipeTemplates{ factoryId:"Sir", materialNumber:"", recipeType:"NORMAL",
                    limit:0, intervention:false, isSampling:false, ... }
```

`limit: 0` — yani sistem **sıfır kayıt istedi**, boş liste aldı ve kullanıcıya
"bu fabrikada aktif reçete yok" dedi. Veri vardı; soru hiç sorulmadı.

**Talep:** Her araçta gerçekten zorunlu olan alt küme işaretlensin (tipik olarak
`factoryId` + zaman aralığı). Filtreler (`materialNumber`, `recipeType`,
`intervention`, `isSampling`, `isMill`, `inventoryOnly`) **opsiyonel** olsun;
`limit` opsiyonel olsun ve makul bir varsayılanı bulunsun.

---

## 3. TİP VE BİRİM BEYANI — 43 araç bu yüzden otomatik çağrılamıyor
`date`, `startDate`, `endDate` alanları şemada yalnız `integer` olarak
tanımlı: **birim yazmıyor** (saniye mi, milisaniye mi), örnek değer yok,
makine-okunur varsayılan yok. Aynı sorun boolean ve id alanlarında da var.

97 araçlık davranış sayımının sonucu:

| Durum | Adet |
|---|---|
| Çalıştı (kayıt döndü) | **18** (6'sı boş liste) |
| Okunamadı — zorunlu parametreye değer üretilemedi | **43** |
| Okunamadı — parametrenin hangi tür kimlik olduğu tarif edilmemiş | **35** |
| Okunamadı — bağlantı | 1 |

*(13 Ağustos notunun 3. maddesinde söz verdiğimiz araç-başına tablo budur;
tam liste araç adlarıyla ektedir, istediğinizde iletiriz.)*

**Talep:** Zaman alanlarının açıklamasına birim + örnek değer yazılsın
(ör. `"epoch milliseconds, e.g. 1786914000000"`); id alanlarının açıklamasına
hangi listeden geldiği yazılsın (ör. `materialNumber` → `getMaterialList`).

---

## 4. YETENEK BOŞLUĞU — liste alınamıyor, çünkü cevabı bilmek gerekiyor
13 Ağustos'ta vardiya sorgusu için bildirdiğimiz desen (`getEmployeeShiftBetween`
çalışan listesi istiyordu) **malzeme ve reçete yüzeyinde birebir tekrarlıyor:**

- `getOrders(factoryId, **materialNumber**, date)` — "bugün üretimde olan iş
  emirlerindeki malzemeler" sorulamıyor, çünkü malzeme numarasını bilmek gerekiyor.
- `getMaterialList(factoryId, **materialId**, equivalentMaterialId,
  orderPlanRequestId, interventionRequestId, inventoryOnly)` — malzeme listesi
  almak için malzeme kimliği gerekiyor.
- `getRecipeTemplates(… **materialNumber** …)` — bir fabrikanın bu haftaki aktif
  reçeteleri, malzeme numarası verilmeden listelenemiyor.

**Talep:** Bu üç uçta filtreler opsiyonel olsun; alternatif olarak
`factoryId` + tarih aralığıyla liste dönen bir uç. (`getMaterialListByRecipeType`
doğru yönde bir uç ama `recipeType` için geçerli değerlerin listesi yayınlanmıyor —
bu değerler de bir uçtan okunabilmeli.)

---

## 5. BOŞ DÖNÜŞ SEMANTİĞİ — "veri yok" ile "geçersiz sorgu" ayırt edilemiyor
Geçersiz veya boş filtreyle çağrıldığında (`materialType: []`, `materialNumber: ""`,
`limit: 0`) API **hata değil, boş dizi** dönüyor. Çağıran taraf için bu iki durum
aynı görünüyor: gerçekten kayıt yok mu, yoksa sorgu mu geçersizdi?

**Talep:** Geçersiz/eksik filtre için ayrı bir hata kodu ve mesajı. "Sonuç yok"
ile "sorgu kabul edilmedi" farklı yanıtlar olmalı.

---

### Özet
Yetki tarafı düzeldi; sıradaki tıkanma **sözleşme tarafında**: (1) çıktı şeması
girdi şemasıyla aynı zorunlulukları taşıyor, (2) filtreler zorunlu, (3) zaman
alanlarının birimi yayınlanmıyor, (4) liste uçları liste vermiyor, (5) boş yanıt
geçersiz sorguyu gizliyor. Bu beşi düzeldiğinde 97 aracın bugün okunamayan
79'unun büyük kısmı otomatik olarak açılır — tek tek özel çalışma gerekmeden.

*İletişim: Hülya · Araç başına ham çağrı/yanıt kayıtları ve tam sayım tablosu
talep hâlinde paylaşılır.*
