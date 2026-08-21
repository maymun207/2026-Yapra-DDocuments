# CWF — SESSION GRAPH KB · v102 (S101)
<!-- S101 kapanışında yazıldı. v101'i geçersiz kılmaz, ÜSTÜNE ekler. -->

## S101 · KİMLİK
2026-08-15 · Architect: Claude Opus 5 · Şeritler: AG-1, AG-2, AG-3 ·
Operator: çağrılmadı (migrasyonsuz oturum) · Zemin: rev 262 → **268** ·
`origin/master` `2caaffba` → **`e7939c93`**.

## §1 · OTURUMUN ŞEKLİ
Plan Dalga 8'i açmaktı. Sahip Dalga 8'i DURDURDU ve dört UX şikâyeti getirdi.
Oturum, dalga dışı bir **UI-GERÇEK programına** dönüştü: altı faz, üç şerit,
tek gün. Kapı 5/7'de kaldı — **bilerek**: #25/#29'un kanıtı bu ekranlarda
okunacak, ve program öncesi hâlleriyle o kanıt okunamazdı.

## §2 · MERGE ZİNCİRİ (hepsi doğrulandı: origin + Vercel READY/production)
| Sıra | Faz | Merge SHA | rev |
|---|---|---|---|
| 1 | CENSUS-CONSOLE-2 (AG-1) | `5356fe8a` | 262 |
| 2 | MCP-SETTINGS-TRUTH-1 (AG-2) | `fb427873` | 263 |
| 3 | STAGES-TRUTH-1 (AG-3) | `63b3beb2` | 264 |
| 4 | MCP-SETTINGS-TRUTH-1-FIX-1 (AG-2) | `8c610a70` | 265 |
| 5 | TURN-QUESTION-TRUTH-1 (AG-1) | `566b315e` | 267 |
| 6 | MCP-SETTINGS-TRUTH-1-FIX-2 (AG-2) | `e7939c93` | **268** |
rev 266 hiç master'a inmedi — provisional mühürdü, S101-L2'nin kanıtı.

## §3 · TEŞHİS ANLATILARI (bu oturumun asıl değeri)

### 3.1 · "Bu ekranı görüyorum, eee ne yapacağım?"
Ölçüm organları S93-1 gereği doğdu ("ölçtüğünü göster"), ama S98-L4'ün insan
yarısı hiç uygulanmadı: *bu veriyi kim okuyor ve okuyunca NE YAPIYOR?* Census
ekranı ham hüküm döküyordu (`unclassified`, `excluded by law`), hükmü eyleme
çevirmiyordu. Oysa her hükmün zaten deterministik bir sahibi vardı: `answered`
→ kimse · `excluded by law` → kimse (ADR-011 çalışıyor) · THEIRS → tedarikçi ·
OURS → sistem kendi iyileşir · `unclassified` → biz. Sahibin sorusunun cevabı
"bu listede senin manuel test etmen gereken hiçbir şey yok"tu; ekranın suçu
bunu söylememesiydi.

### 3.2 · "Sildim ama duruyor" — durum, tarihin vekili olarak kullanılmıştı
tk-temp draft yaratıldı, retire edildi, silinemedi. Kök: delete yalnız `draft`
durumunda vardı; retire terminal olduğu için çıkış SONSUZA DEK kapandı. Gerçek
değişmez "yayınlanmış/servis görmüş kimliğin TARİHİ korunur"dı — durum değil.
FIX-1 yasayı tarihe bağladı; census zaten tarihi doğrudan ölçüyordu.
**Ders: bir kapı, korumak istediği şeyin VEKİLİNİ test ediyorsa, vekilin
yanlış olduğu gün kapı yanlış kapanır.**

### 3.3 · Census hiçbir şey göremiyordu, çünkü gövdesiz sormuştu
FIX-1 sonrası delete hâlâ reddediliyordu: ~40 tablo "okunamadı". Architect
teşhisi (tablo evreni yanlış) DOĞRU YÖNDEYDİ ama bir kat yukarıdaydı. AG-2'nin
canlı okuması kökü buldu: `{count:'exact', head:true}` → HEAD yanıtının gövdesi
yok → PostgREST'in `42703` hata JSON'u YOLCULUK EDEMİYOR → "bu tabloda
`backend_id` kolonu yok" cevabı hiç ulaşmıyor, hepsi `unreadable` kovasına
düşüyor. `.limit(0)` ile gövde geri geldi. Utandıran ayrıntı: `countGuard.ts`
tam bu gövdesiz-HEAD özelliğini "canlı kanıtlanmış" diye belgeliyormuş —
sayım o tuzağa karşı korunmuş, hata kodu korunmamış, **dört satır arayla**.

### 3.4 · Model yanlış soruyu cevapladı (oturumun en ciddi hatası)
Tavan-iptali turu dürüst bir cümle üretti ("boyut sınırı; soru reddedilmedi,
daha dar sor"). O tur `empty:true` → `outcome:'failed'` → bir sonraki turun
geçmişinde cümle **silinip** "[önceki deneme başarısız — içeriği taşınmadı]"
ile değiştirildi. Modele giden şey: cevapsız bir soru, "başarısız" etiketiyle,
güncel sorunun hemen üstünde. Model ikisini takas etti ve iptal edilmiş soruyu
koşturdu; üstüne hiç yapılmamış bir araç çağrısı iddia etti (konfabülasyon).
AG-1 iki rakip mekanizmayı (off-by-one · persist-order) yazılı KANITLA öldürdü
ve **kanıtının gücünü abartmadı**: kodun yanıltıcı geçmiş verdiğini kanıtladı,
modelin yorumunu kanıtlamadı. Düzeltme yazarlığa bağlandı (S101-L4).

### 3.5 · Beş fazdır yeşil geçen sahte kanıt
`cwf.flush` span'ı stage 14'te hiç görünmüyordu. Architect kartı "span hiç
açılmıyor" dedi — yanlış. Açılıyordu; iki bağımsız sebeple düşüyordu: turn
kökü altında açılınca `stageNo` null (soy), ve digest, flush span'ının KENDİ
callback'i içinde boşalıyordu (hiçbir span kendi sonunu gözleyemez). Üç UI
fixture'ı canlı yolun asla üretemeyeceği bir '14' kovasını elle yazmış ve beş
faz boyunca yeşil geçmiş. **Fixture, gerçeği değil beklentiyi doğruluyorsa,
test bir aynadır.**

## §4 · ŞERİTLERİN ARCHITECT'İ DÜZELTTİĞİ BEŞ AN (A-REC-S101-1..5)
Şeritler bu oturumda beş kez Architect öncülünü canlı okumayla çürüttü ve her
seferinde ÖNCE sordu, sonra yazdı — istenen davranışın kendisi. Hepsinin kökü
aynı: **dokümandan spec yazmak** (S65-1). En pahalısı #3: reçetelenen DELETE
uygulanmış olsaydı `status='missing'` gözlem tarihi (ADR-010'un kalbi) yok
edilecekti ve superset yine yanlış kalacaktı.

## §5 · SAYILAR
Zemin: 621→**624** test dosyası (src 155 · shared 6 · api 463) · 16 e2e ·
80 migration · 16 ADR · drift 7/7. Bir turda ölçülen: 91 DB okuması / **0
etiketsiz** · 34 okumanın 30'u gösterilip "showing 30 of 34" denmiş.
armes: 141 live + 9 missing (disk 150, **sıfır satır silinmedi**) ·
superset: 4 giriş noktası + 22 gateway = 26 · tk-temp: **yok**.

## §6 · S102 İÇİN AÇIK UÇLAR
Kapı 5/7 · Dalga 8 sırası sahip onaylı (QDRANT → RBAC+iki bulgu → #25) ·
dokuz açık bulgu (§6, bootstrap v102) · altı merge edilmiş `phase/*` ref
silinmeyi bekliyor (S98-L1) · dört kişisel satır iki başka hesapta
`backend_id` boş, RLS gereği ulaşılamaz.

<!-- END · CWF-SESSION-GRAPH-KB-v102 -->
