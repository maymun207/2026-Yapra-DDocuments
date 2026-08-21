# CWF — SESSION GRAPH KB · v96 (S95)

<!-- v95'i geçersiz kılar. Oturum belleği: ne oldu, neden, ne öğrenildi. -->

## §1 · S95 NE OLDU

Dört-şeritli çalışmanın ilk günü. İki dalga, sekiz merge, yedi kalem kapandı,
sıfır çakışma, sıfır sessiz revizyon kaybı. docVersion 233 → 240.

**Dalga 1** (#40 AG-1 · #41 AG-2 · #24 AG-3 · #22 AG-4) — iki şeritle başladı,
sahip "bu işler self-contained, paralelleştirelim" diye ısrar edince çit
haritası çıkarıldı ve dört şeride çıkıldı. Sekiz kalem SC-A (tam
self-contained) olarak sınıflandı.

**Dalga 2** (#10-1A AG-1 · #6 AG-2 · #26 AG-3 · #20 AG-4) — dördü de aynı gün
inşa edildi, incelendi, merge edildi.

## §2 · MİMARİ OLARAK NE DEĞİŞTİ

1. **ADR-014 doğdu.** Kapanan kusur bir olay değil bir ŞEKİL: üç ayrı organ
   "bu işlem hangi tablolara dokunur?" sorusunu üç ayrı ELLE YAZILMIŞ listeyle
   cevaplıyordu. Artık her tablo doğumda sınıfını beyan ediyor; snapshot/seed/
   export kapsamları TÜRETİLİYOR. `LEARNED_TABLES` liste değil,
   `tablesOfClass('learned.')`.
2. **S94 yangınının dersi eve yayıldı.** #41 etkin-gövde kapısı: yargı birimi
   ETKİN gövde, asla tarihsel dosya (tarihte üç meşru çıplak DELETE var,
   dosya tarayan kapı tam da değiştirilmesi yasak malzemeye kırmızı verirdi).
3. **LINE katmanı hem teşhis hem malzeme kazandı** (#24 + #22) — #23 PathB ve
   #25 Graph-KB artık ölçülmüş gerçeğe karşı tasarlanacak.
4. **Ölçüm altyapısı kuruldu** (#26 çıta + #20 maliyet organı) — vektör satın
   alma kararı artık sayıya karşı verilebilir.
5. **Sonda motoru canlıya indi** (#10-1A) — beyan bir iddiadır, davranış
   deneyerek bulunur. Ama anahtar 1B'de dönüyor.

## §3 · ÖĞRENİLEN YASALAR

**S95-1 DALGA-MÜHÜR YASASI.** Doğuşu: iki SC-A prompta "sıfır mühür + drift
temiz" yazdım; Architecture Map globu `api/cwf/_lib/**`'ı haşladığı için YENİ
dosya eklemek bile hash'i değiştiriyordu — iki şart bağdaşmazdı. İki AG de
çarpışmayı bağımsız yakaladı. **Hiçbir şerit kendi içinden ilk merge eden olup
olmadığını bilemez** ⇒ mühür inşada değil, merge turunda, rebase edilmiş
ağaçta basılır.

**S95-2 SIRA-DEĞİŞİMİ RELAY YASASI.** Sahip merge sırasını tersine çevirdi
(hazır iş, uçuştaki işin önüne). Üç şeride söyledim, AG-1'e söylemedim.
Bedel: iki fazla rebase + CI'sız çakışan push.

**S95-3 BÖLME ERTELEME DEĞİLDİR.** #10'un beş kuralı tek faza sığmıyordu.
1A/1B bölmesi yapıldı; 1A'nın raporu 1B'nin yokluğunun CANLI SONUCUNU adıyla
yazdı ("bir kez `unread` olan araç yeniden bağlanana dek öyle kalır") ve
`probed_at` + indeksini ŞİMDİ ekledi ki 1B dolu tabloya ikinci migration
atmasın.

## §4 · ŞERİTLERDEN ÖĞRENİLEN (AG'lerin kendi katkıları)

- **Test kendi kendini doğrulayamaz (AG-2):** `semanticRouter` beklentileri
  ELLE yazıldı, `deriveFrameEvidence` çağrılarak üretilmedi. Kodu çağırarak
  beklenti kuran test, fonksiyonun kendine eşit olduğunu doğrular.
- **Kaydedici ikinci model olmamalı (AG-2):** `IrFrameRawSchema` export edildi;
  yeniden beyan edilen kopya bugün uyuşur, ilk alan değişiminde ayrışır.
- **Sıra enstrümanın parçasıdır (AG-3):** hash sıralama deterministik ve
  alfabetik değil ama hâlâ katalogun SABİT fonksiyonu — sorgudan sorguya
  değişmiyor, position bias'ı skora çeviriyor.
- **Yapılmayanı saklama (AG-1):** hata kaydı prompta girmiyor, çünkü R3
  ("ilk başarısızlık kalıcı hüküm değildir") henüz yok; onu geri alacak
  mekanizma olmadan yazmak arızayı kalıcılaştırırdı.
- **Sansüs cron'a bağlanmaz (AG-1):** yarım saatte 25 çağrılık patlama = BUG-020.
- **Footgun-6 (AG-4):** provizyonel mühür commit'i merge turunda DÜŞÜRÜLÜR ve
  yeniden basılır — bu prosedür dalga yasası oldu.

## §5 · SÜREÇ ÖLÇÜMÜ

Dört şerit gerçekten ~2× hız verdi ama şerit sayısından değil: kazancın
kaynağı (a) C/D şeritlerine makine-doğrulanır doğum kanıtı zorunluluğu →
RULE-25 derinliği A şeridine saklandı, (b) kademeli teslim. Tavan hâlâ
Architect'in inceleme bandı.

Architect her incelemede transkript okumakla yetinmedi: #40'ta kapıyı iki
yönden kendi eliyle kırdı, #41'de regresyon ekti, #26/#20'de bağlayıcı iki
şartı (sıralama kuralı, hakem satırı) kaynak koddan doğruladı. Bu, S65-2'nin
(kanıt hesaplanır, iddia edilmez) şerit çıktısına uygulanmış hali.

## §6 · SAYILAR

| | S95 başı | S95 sonu |
|---|---|---|
| master | `d8f33f80` | `1b7f8dd` |
| docVersion | rev 233 | rev 240 |
| test dosyası | 533 | 554 |
| migration | 72 | 73 (uygulandı) |
| ADR | 13 | 14 |
| kapalı / açık | 9 / 32 | 16 / 25 |
| SOTA kapısı | 1/7 | 1/7 |

<!-- END · CWF-SESSION-GRAPH-KB-v96 -->
