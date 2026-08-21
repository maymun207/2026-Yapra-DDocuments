# ARDIC'a Not — ARMES (KB7) Araç Yüzeyi: 3 Kalem
*CWF platformu · 2026-08-13 · Otomatik araç sayımı (97 araç canlı çağrılarak ölçülmüştür)*

## 1. YETKİ — tek düzeltme, 13+ aracı birden açar
CWF'in araç-doğrulama servisi (sayım kimliği) fabrika erişimine sahip değil.
Aşağıdaki araçların TAMAMI aynı hatayı veriyor: **"User has no access to factory"**
→ getActiveShifts · getCarPoolList · getCarQuantityInfo · getCookedStockAndon ·
getEntitySummary · getInventoryCatalogue · getMaterials · getMaterialTypes ·
getMoistureContentTable · getOrderList · getRawStockPool · getTransferrableZoneList ·
getRecipe(dolaylı)
**Talep:** CWF entegrasyon kullanıcısına ilgili fabrika(lar) için okuma yetkisi
verilmesi. (Not: son-kullanıcı oturumları çalışıyor; eksik olan yalnız
entegrasyonun kendi doğrulama kimliği.)

## 2. YETENEK BOŞLUĞU — vardiya sorgusu ters yönde çalışıyor
İş ihtiyacı: "X fabrikasında, dün 16:00-24:00 vardiyasında çalışan personeli
listele" (opsiyonel: hat/zon filtresiyle).
Mevcut durum: `getEmployeeShiftBetween` bu sorgu için **çalışan UUID listesi**
(`employeeIds`) girdisi istiyor — yani cevabı bilmeden soru sorulamıyor
(6811 çalışan). `getEmployees` yalnız ad/id/sicil döndürüyor (hat/zon yok).
**Talep:** Vardiya + tarih aralığı (+ opsiyonel hat/zon) girdisiyle personel
listesi döndüren bir sorgu ucu — `getEmployeesByShift(factoryId, shiftStart,
shiftEnd, lineIds?)` benzeri. Alternatif: `getEmployeeShiftBetween`'de
`employeeIds`'ın opsiyonel olması.

## 3. BİLGİ — tam kusur listesi bir sonraki sayım turundan sonra
97 aracın 70'i tipli argüman istediği için henüz otomatik doğrulanamadı
(sonda tarafımızda derinleştiriliyor — gerçek fabrika/hat/zon/sicil
örnekleriyle). Madde 1'deki yetki verildikten ve sondamız derinleştikten
sonra, araç başına "çalışıyor / kusurlu (hata metniyle) / erişilemedi"
tablosunu paylaşacağız. Bu notta yalnız BUGÜN kanıtlı olanlar var.

*İletişim: Hülya · Teknik ek isterseniz araç başına ham çağrı/yanıt
kayıtları mevcut.*
