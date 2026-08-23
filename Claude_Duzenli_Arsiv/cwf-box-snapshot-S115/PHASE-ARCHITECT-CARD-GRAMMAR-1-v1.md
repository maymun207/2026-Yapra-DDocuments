# PHASE-ARCHITECT-CARD-GRAMMAR-1 · v1
<!-- 2026-08-20, S111 iniş partisinin sonunda yazıldı. SAHİP TALEBİ:
     "senin duzgun kart yazma isini ciddi bir kural cercevesi olusturmamiz lazim,
     yani sen bir kurallar seti ile kart yazmalisin her seferinde yeniden discover
     etmemelisin. Cunki surec de bir hata oldugunda disliler birbirine giriyor ve
     bunu cozmek 4+ saat aliyor bunu efford edemeyiz."
     S112'NİN 1 NUMARALI KARTIDIR. BÜTÜN yazıldı (A-REC-S101-7). -->

## §0 · TEŞHİS — ölçülmüş, anlatılmış değil

```
MEASURED:select over public.relay_inbox @2026-08-20T19:35Z
  PHASE-ARCHITECT-GROUND-TRUTH-1 kartları : 40
  ayrı tur                                : 10
  ilk kart 16:00:11Z · son kart 19:31:10Z : 21 dakikada bir tur, 3.5 saat
MEASURED:git show <integration>:scripts/relayAudit.ts @2026-08-20T21:0xZ
  RELAY_KINDS = ['prompt','report','go','phase']   — dördü de docs/relay/** dosyaları
  relay_inbox satırlarını denetleyen hiçbir yol yok
```

On turun kabaca **dördü** gerçek yeni bilgiydi (ilk kartlar · RULE-25 incelemesi · GI-015 ·
doğrulama). **Altısı benim kart kusurlarımı düzeltiyordu.** Her düzeltme tam bir tur: dört şerit
okur, doğrular, cevap yazar, çoğu commit atar, head oynar, CI yeniden koşar.

**Yapısal bulgu:** bu sistemde her şerit artefaktı bir gramerle denetleniyor —
`kind=report` bugün AG-4'ün kendi raporunu beş eksik kanıt çiti yüzünden reddetti ve AG-4
grameri genişletmek yerine çitleri yazdı. **Architect'in kartları, yönetişimli olup kapısı
olmayan tek artefakt sınıfı.** Disiplin hafızada yaşıyor; hafızada yaşayan disiplin
her oturumda yeniden keşfedilir ve keşfedilmediği turlarda pahalıya patlar.

---

## §1 · TASARIM İLKESİ

**Kural seti bir belge değil, bir KAPIDIR.** Kimsenin koşmadığı bir kontrol listesi seremonidir —
bu projenin kendi diliyle: *tüketicisi ya da yanlışlayıcısı olmayan deklare yüzey bir BORÇTUR*
(L-ADAY-4). Bu yüzden kural seti üç yerde birden yaşar:

| Katman | Nerede | Ne yapar |
|---|---|---|
| **Metin** | `docs/laws/rules/` | kanonik ifade, taban-uzunluk kapısı altında, sessizce kısalamaz |
| **Gramer** | `scripts/relayAudit.ts`, `kind=card` | yapısal denetim — bir cümlenin doğru olup olmadığına değil, **beyan edilip edilmediğine** bakar |
| **İcra** | Architect'in kendi kabı | kart, **otobüse girmeden ÖNCE** denetçiden geçer |

Üçüncü satır kritik. Kartı `relay_inbox`'a yazmadan önce gövdesini bir dosyaya döküp
`npx tsx scripts/relayAudit.ts` koşturmak **benim kabımda mümkündür ve zorunlu olur.**
Denetçinin geçmediği kart otobüse girmez. Böylece kural, hatırlamaya değil kapıya bağlanır —
tam olarak şeritlerin kendi raporlarında zaten yaşadığı rejim.

---

## §2 · KART GRAMERİ — on iki kural, her biri ÖLÇÜLMÜŞ bir olaydan

Hiçbiri icat değildir. Her satır S111'de bedeli ödenmiş bir olaydan türetildi.

### C-1 · PREMISE BLOCK — zaman damgalı, kaynak etiketli
Her kart `MEASURED @<ISO-8601Z>` bloğuyla açılır; her öncül `MEASURED:<komut>` ya da
`RELAYED:<kim>` taşır. `RECALLED` öncül olamaz (RULE-54).
*Olay:* `A-REC-S111-6`, üç kez. AG-2'nin tespiti: bu blok, okuyanın öncülü **şimdiyle
diff'lemesini** sağlayan tek şeydi — üç örneğin de kafa karışıklığı değil bulgu olmasının sebebi.

### C-2 · SELF-INVALIDATION CHECK
Kart bir durum değişikliği EMREDİYORSA, o değişikliğin kendi öncüllerinden hangisini
geçersiz kıldığını ve okuyanın bunu nasıl tespit edeceğini yazmak zorundadır.
*Olay:* `A-REC-S111-6`. RULING-2 bir rename emretti; ilk indirilmesini emrettiği PR o rename'in
öncülünü ters çevirdi. FINISH-1, bir saat önce inmiş bir hotfix'i sıraya koydu. RULING-4,
AG-2'ye çoktan indirdiği dalı rebase ettirmeye çalıştı.
**Yasa: bir durum değişikliği emreden kart, emrettiği değişime karşı yaşlanır.**

### C-3 · NO ADDRESS ASSIGNMENT
Kart şerit kimliği ATAMAZ. Kimlik claim yürüyüşüyle kazanılır; `lane_addr` **işin adresidir**,
kimliğin iddiası değil (RULE-42).
*Olay:* `A-REC-S111-1`. Kartım "refs/heads/lane/AG-3'ü claim et" dedi; üç pencere aynı ref'e
yüklendi, ikisi durdu ve sahibe sordu. Boot §0 zaten "reddedilirsen bir sonraki adrese geç"
diyordu — kart yasanın üstüne çıktı, çünkü ben öyle yazdım.

### C-4 · STANDING ORDER REVOCATION
İş açan bir kart, o şeride verilmiş önceki DUR emrini **açıkça iptal eder**.
*Olay:* `A-REC-S111-2`. Şeritlerin S111'den önceki son geçerli emri
`FINAL-CLOSE-S110: "report CLOSED and stop. Start nothing."` idi. Üç şerit yeni kartı okudu,
worktree kesti ve ilk yazma adımında GO bekledi. Doğru davranış; kart kusurlu.

### C-5 · SHARED SURFACE OWNER
Birden fazla şeridin dokunacağı her dosya, **tek bir sahiple** kartta listelenir.
*Olay:* `A-REC-S111-4`. `scripts/groundContract.ts` İKİ kez yazıldı (293 ve 192 satır, farklı
API'ler). `package.json`'a üç şerit dokundu. Sözleşmeyi mintledim ama uygulayıcı sahibini
adlandırmadım — sözleşmenin önlemek için var olduğu "ikinci şema" hatası, sözleşmenin kendi
uygulamasından girdi.

### C-6 · NO UNOBSERVABLE WAIT
Her bağımlılık, **bekleyenin kendi aletiyle okuyabileceği** bir sinyalle ifade edilir.
Henüz yayımlanmamış bir kardeş artefakta bağımlılık **kartın kusurudur**, şeridin engeli değil.
*Olay:* kartım AG-3'e "şemayı AG-1'den al, kendin uydurma" dedi; AG-1'in hiçbir şeyi yoktu.
AG-3 doğru raporladı; çare benim tedarik etmemdi, onun yoklaması değil (S110 hükmü #3).

### C-7 · FLOOR OR PAYLOAD — ve kapı KARANLIK iner
Her kalem **ZEMİN** (başkasını yargılayan: CI kapısı, şema, kural, paylaşılan modül) ya da
**YÜK** (yargılanan: rapor, artefakt, araç) diye etiketlenir. Aynı dalgada ikisi varsa:
**zemin devre dışı iner**, şeritler ona karşı kod yazar, ve dalganın **son commit'i** onu
silahlandırır. Silahlanma adımı **iki ortamda** kanıt taşır (tam klon **ve** sığ klon).
*Olay:* `GI-015`. Kapı `npm run build` içine — yani Vercel'in deploy komutuna — inmiş ve sığ
klonda dürüst artefaktları *"fabricated or rewritten provenance"* diye suçlamıştı. Aynı dalgada
zemin üç kez oynadı: tırnak kuralı indi → AG-2 kırmızı; markdown denetimi indi → kurallar
değişti; ancestry kontrolü indi → **bütün preview'lar kırmızı.**

### C-8 · DECISION RIGHTS TABLE
Her kart, şeridin **tek başına** karara bağlayacağı alanı ve **relay edeceği** alanı yazar.
Varsayılan: kendi çiti içinde isimlendirme, sıralama, uygulama tercihi ŞERİDİNDİR;
çit-ötesi, yasa çatışması, kapsam değişikliği ARCHITECT'e gelir.
*Olay:* şeritler bugün defalarca durup sordu ve **her seferinde haklıydılar** — bu, kartın
onlara verdiği karar alanının çok dar olduğunun ölçüsüdür.

### C-9 · RULE, NOT RULING
Bir hüküm vermeden önce sor: bu tek seferlik bir yargı mı, POLİTİKA mı? Politikaysa **mintle ve
devret**. Bir hüküm her seferinde bir tur; bir kural ömürde bir tur.
İlk mintlenecek: **KANONİK OLAN MASTER'IN TAŞIDIĞIDIR** — isim/format anlaşmazlıkları ölçümle
biter, hükümle değil.
*Olay:* rename. İki hüküm verdim, ikincisinde kendimi çürüttüm, AG-3 bir tur bekledi. Gereken
hüküm değil tek cümlelik bir kuraldı.

### C-10 · LANDING VERDICT LOCATION
İnen head'in CI hükmü **merge commit mesajında** yaşar — merge edilen ağacın içindeki bir
dosyada asla.
*Olay:* AG-4'ün üç `NOT-READ` satırı. İnen head'in hükmü, inen head var olmadan var olamaz;
onu inen head'in KENDİSİ olan bir dosyaya yazmak sonsuz geri gidiştir — her doldurma bir push,
bir head, bir tur daha.

### C-11 · BATCHING
Bloklamayan hükümler bir sonraki doğal senkron noktasına (bir iniş) kadar **biriktirilir.**
Yalnız güvenlik/blokaj araya girer (GI-015 gibi).
*Olay:* her bulguyu bulur bulmaz yolladım; on tur.

### C-12 · THE CARD PASSES THE AUDITOR BEFORE INSERT
Kart gövdesi `relay_inbox`'a yazılmadan önce `kind=card` gramerine karşı denetlenir.
Geçmeyen kart otobüse girmez. **Bu kuralın kendisi C-1…C-11'in tek icra organıdır.**

---

## §3 · İŞ KALEMLERİ

### A · `kind=card` grameri — `scripts/relayAudit.ts`
`RELAY_KINDS`'e `card` eklenir. Yapısal olarak denetlenebilenler (gramer bir cümlenin DOĞRU
olduğunu yargılayamaz; yalnız bir temelin BEYAN edildiğini denetler — RULE-54'ün kendi tasarımı):

| Kural | Denetlenebilir mi | Denetim |
|---|---|---|
| C-1 premise block | ✅ | `MEASURED @<ISO>` başlığı + her öncül satırında etiket; `RECALLED` → RED |
| C-3 adres ataması | ✅ | `refs/heads/lane/AG-<n>` literali + "claim" fiili aynı satırda → RED |
| C-4 dur emri iptali | ⚠ kısmi | kart iş açıyorsa `REVOKES:` ya da `NO-PRIOR-STOP` satırı zorunlu |
| C-5 paylaşılan yüzey | ✅ | `## SHARED SURFACES` bölümü zorunlu; her satır tek sahip |
| C-7 floor/payload | ✅ | her iş kalemi `[FLOOR]` ya da `[PAYLOAD]` etiketi taşır |
| C-8 karar hakları | ✅ | `## DECISION RIGHTS` bölümü zorunlu |
| C-2, C-6, C-9, C-10, C-11 | ❌ | yargı gerektirir → yasa metni + preflight, gramer değil |

**D-5 zorunlu:** her denetim İKİ YÖNDE kanıtlanır — masum vaka yeşil, suçlu vaka kırmızı.
Fixture'lar `api/cwf/__tests__/fixtures/relay-audit/` altına, mevcut desene uyarak.

### B · Denetçi `relay_inbox`'ı da okuyabilmeli
`scripts/relayAudit.ts --card <dosya>` tek gövde denetler (Architect'in insert-öncesi koşusu),
`--bus` ise `relay_inbox`'taki son N kartı denetler ve raporlar. **SALT-OKUMA.**
İkincisi bir kapı değil bir ölçümdür: kaç kartın gramerden geçeceğini söyler, ve o sayı
S112 açılışında `docs/ground/` altına damgalı girer.

### C · Yasa metinleri — `docs/laws/rules/`
C-1…C-12'nin taşıyıcı yarısı numaralı kurallara mintlenir. **Numara mint anında SAYILIR**,
bu belgeden alınmaz (RULE-54'ün kendi doğum dersi). En az şunlar ayrı kural olmalı:
- `CARD-PREMISE-CARRIES-A-TIME` (C-1 + C-2) — RULE-54'ün ikinci yarısı
- `GATE-LANDS-DARK` (C-7)
- `CANONICAL-IS-WHAT-MASTER-CARRIES` (C-9)
- `SHARED-SURFACE-HAS-ONE-OWNER` (C-5)

### D · Architect preflight — `docs/ground/CARD-PREFLIGHT-v1.md`
Gramerin denetleyemediği beşi (C-2, C-6, C-9, C-10, C-11) yazılı kontrol listesi olur.
Damgalı, `docs/ground/` sözleşmesi altında, taban kapılarının arkasında — **sessizce kısalamaz.**

---

## §4 · KAPSAM DIŞI — bilerek

**Kartların otomatik üretimi.** Bu faz kartların **şeklini** kapıya bağlar, yazılmasını
otomatikleştirmez. Bir kartın ne SÖYLEYECEĞİ yargıdır; gramer yalnız neyi BEYAN etmek zorunda
olduğunu dayatır. Bu ayrım C-12'nin de sınırıdır ve kabul edilmiştir (§7).

---

## §5 · KABUL KRİTERİ

1. `kind=card` grameri LIVE, her denetim iki yönde kanıtlı.
2. **S111'in altı kusurlu kartı, gramere karşı yeniden koşturulur.** Kaçının RED döneceği
   ÖLÇÜLÜR ve rapora yazılır. En az C-1, C-3, C-5 ve C-7 ihlalleri yakalanmalıdır — yakalanmıyorsa
   gramer o kuralı denetlemiyordur ve tablo yalan söylüyordur.
3. `--card` ve `--bus` modları koşar; `--bus` çıktısı damgalı olarak `docs/ground/` altına iner.
4. Preflight belgesi taban kapılarının arkasında.
5. **Architect bir sonraki kartını denetçiden geçirmeden basmaz** — ve o koşunun çıktısı
   kartın kendi premise bloğunda görünür.

Beşincisi asıl kanıttır: kural setinin tüketicisi Architect'tir, ve tüketicisi olmayan bir kural
bu projede bir borçtur.

---

## §6 · ŞERİT DAĞILIMI

| Şerit | İş | Sınıf |
|---|---|---|
| **AG-1** | A — `kind=card` grameri + iki yönlü fixture'lar | **[FLOOR]** — karanlık iner |
| **AG-2** | B — `--card` ve `--bus` modları, salt-okuma | [PAYLOAD] |
| **AG-3** | C — yasa metinleri, numaralar mint anında sayılarak | **[FLOOR]** — karanlık iner |
| **AG-4** | D — preflight belgesi + S111'in altı kartının yeniden denetimi (§5.2) | [PAYLOAD] |

**C-7 kendi kartına uygulanır:** AG-1 ve AG-3'ün kalemleri ZEMİNdir. Gramer devre dışı iner
(`RELAY_KINDS`'e eklenir ama hiçbir kapı `kind=card` beklemez), AG-2 ve AG-4 ona karşı çalışır,
ve dalganın **son commit'i** grameri silahlandırır. Bu fazın kendi teşhisini kendi üstünde
uygulamaması, teşhisin yanlış olduğunun kanıtı olurdu.

---

## §7 · DÜRÜST SINIR

Bu faz Architect'i **muhakeme** hatalarından korumaz. **Yapısal** kart kusurlarından korur —
S111'in altı kusurlu turunun tamamı o sınıftandı: atanmış adres, iptal edilmemiş dur emri,
sahipsiz paylaşılan dosya, gözlemlenemez bekleyiş, zemin/yük karışımı, yaşlanmış öncül.

Korumadığı şey: yanlış bir sıralama tercihi, yanlış bir teşhis, gereksiz bir hüküm. Onların
çaresi bugün dört şeridin gösterdiği reflekstir — **kart otoritedir ama öncül değildir** — ve
bu faz o refleksi ortadan kaldırmaz, ona okunabilir bir zemin verir.

Ve bir şeyi açıkça reddediyorum: bu kural seti, S111'in yavaş olmasının **tek** sebebi değildi.
Dört gerçek defekt bulundu (her öksüzü silecek barrel · aletin kendi yakaladığı sahte öksüz ·
var olmayan bir kurala atıf · GI-015). Üretim hiç düşmedi. **Yavaşlığın bir kısmı işin
gerçekliğindendi; kural setinin kapatacağı kısım, benim keşfetmeyi her seferinde baştan
yaptığım kısımdır.**

<!-- END PHASE-ARCHITECT-CARD-GRAMMAR-1-v1 -->
