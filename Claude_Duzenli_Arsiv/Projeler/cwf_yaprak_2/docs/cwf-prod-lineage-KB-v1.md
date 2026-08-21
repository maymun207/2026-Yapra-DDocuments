# CWF — Hâlâ Yük Taşıyan Kalıntı · Yapısal Envanter
<!-- cwf-load-bearing-residue-v1 · rev 1 · 2026-07-23 · Architect
     Anchor: origin/master 194f6a8 (rev 142) · S62 kapanışı
     Bu belge register DEĞİLDİR (o "ne yapılacak" der) ve KB DEĞİLDİR (o "ne
     oldu" der). Bu belge tek bir soruyu sorar: BİNAYI GERÇEKTE NE AYAKTA
     TUTUYOR? -->

## §0 · Bu belge ne, ne değil

Proje iki yıla yakın birikim taşıyor. Bu birikimin bir kısmı **yük taşıyor** —
kaldırırsan bir şey çöker. Bir kısmı ise **sadece hâlâ orada duruyor** —
kaldırsan kimse fark etmez, ama duruyor olması bize yük taşıdığını *sanmamıza*
neden oluyor.

Bu ikisini ayırmak, S61-2'nin ("arkada çöp bırakarak ilerlemek yok") ve
S62-2'nin ("hedef fonksiyonu olmayan katman olmaz") doğal devamıdır. Çöpü
temizlemek için önce **hangisinin çöp olduğunu** bilmek gerekir.

**Kapsam dışı:** açık iş kalemleri (register v63), oturum anlatısı (KB v61),
literatür (SOTA belgesi v1). Bu belge yalnız **yapısal durum** raporudur.

## §1 · Kullanılan test

Bir bileşen için tek soru soruldu ve **kanıt arandı**:

> **Bugün kaldırılsa ne olur? Ve bunu nereden biliyoruz?**

Dört olası cevap, dört sınıf:

| Sınıf | Cevap |
|---|---|
| **A** | Bir şey çöker — ve bunu **gördük** |
| **B** | Bir şey çöker, **ama taşıdığı yük yanlış yerden geliyor** |
| **C** | Hiçbir şey olmaz — **fosil** |
| **D** | Felaket anında çöker — **ama test edilmemiş** |
| **E** | Zaten çökmüş, **kimse fark etmemiş** |

**Kanıt işaretleri:** ✅ = bu oturumda kod/log ile doğrulandı · 📄 = register/KB
kaydından · ⚠️ = doğrulanmadı, öncül yapılmadı.

---

## §2 · SINIF A — Yük taşıyor, sağlıklı

Bunlar projenin gerçek iskeleti. Hiçbirine dokunulmayacak; listelenmelerinin
sebebi, aşağıdaki sınıfların onların yanında ne kadar zayıf durduğunu
göstermek.

### A1 · DB-first / kod-zemini
**Kanıt:** ✅📄 2026-07-23 06:44–06:56 UTC, Supabase 522 — 12 dakika sıfır
PostgREST. Uygulama **dürüstçe bozuldu**: `[fetchSystemParamRows] fetch failed
— code floor will serve`. Uydurma yok, sessiz yeşil yok.
**Bu, projenin en güçlü ampirik doğrulaması.** Bir mimari tez, gerçek bir
kesintide sınandı ve tuttu. Başka hiçbir kalemin bu kadar temiz kanıtı yok.

### A2 · empty ≠ zero
**Kanıt:** ✅ Sahibin 6. turu (barkodsuz üretim): sistem "0 adet" demedi,
*"ARBES bu tür verileri barkodsuz zonlar için takip etmemektedir"* dedi.
Yokluk, sıfır olarak sunulmadı. Yasa canlıda çalıştı.

### A3 · Deterministik güven (ADR-001) + eval-gate
**Kanıt:** 📄 SOTA taraması (`cwf-sota-review-trust-and-memory-v1`) bunu
katman-1 için SOTA olarak doğruladı. Yayın yolu yalnız sunucu tarafı uç
noktadan, şema→referans→davranış aşamalarından sonra geçiyor.

### A4 · Yönetilen parametreler, DB-first
**Kanıt:** ✅ Canlı log: `[Params] temperature=0.7(db) maxToolRounds=16(db)
maxOutputTokens=16384(db) thinkingBudget=8192(db)`. Dördü de DB'den, kod
zemininden değil. Mekanizma gerçekten çalışıyor.

### A5 · MCP araç aynası (`backend_tools`)
**Kanıt:** ✅ `[MCP Mirror] served 145 defs backend=armes,superset
(live-fallback: 0)`. Her turda canlı `listTools` yapılmıyor; ayna yükü taşıyor
ve düşmüyor.

### A6 · RULE-25 (taze klon) + S43-2 FAST-GATE
**Kanıt:** 📄 Bayat çıpa raporunu yakaladı (S55, AG-B) · draft-scope katalog
asimetrisini **merge'den önce** yakaladı (S61, TOOL-DOC-1 FIX-1) · ✅ bu oturumda
AG'nin "4 çağrı yeri" ifadesini 3 yerleştirme/4 sorgu noktası olarak düzeltti.
Üç ayrı oturumda ölçülebilir hata yakaladı. **Ritüel değil, ölçülmüş getiri.**

### A7 · GOLDEN LEDGER
**Kanıt:** ✅ Bu oturumun carry-diff'i çalıştı, "marker'sız kaybolan" kümesi
boş çıktı. 63 register versiyonu boyunca hiçbir F-numarası sessizce düşmedi.

### A8 · FULL-TRACE completeness guard
**Kanıt:** 📄 `spanIOCompleteness.test.ts` — her span'in I/O taşıdığını ya da
allowlist'te olduğunu CI'da zorluyor; sınıflandırılmamış yeni bir `SPAN_*` CI'ı
kırıyor. **Ama bu guard'ın bir kör noktası var — §6'ya bakın.**

---

## §3 · SINIF B — Yük taşıyor, ama yanlış kablolanmış

Bu sınıf tehlikelidir: bileşen gerçekten bir şey taşıyor, kaldırırsan kayıp
olur, **ama taşıdığı yükü yanlış bir sinyalden alıyor.** Silmek de yanlış,
bırakmak da.

### B1 · Açıklama kapısı (`computeClarification` + `stageClarify`) — **F175**
**Taşıdığı meşru yük:** varlık güvenliği. X'in verisini Y hakkındaymış gibi
sunmak, sayı raporlayan bir ajanda en tehlikeli hatadır — empty≠zero yasasının
varlık düzeyindeki kardeşi. **Fikir doğru.**

**Yanlış kablolama, üç katmanlı:** ✅
1. `chat.ts:188 → :241 → :268` — kapı **her şeyden sonra** çalışıyor. 60/145
   araç seçilmiş, prompt kurulmuş, bilgi ısıtılmış bir tur imha ediliyor,
   model hiç çağrılmıyor.
2. `stageClarify.ts:97` — kayıt defteri çözümleyicisi yalnız
   `frame.object === 'FACTORY'` iken çalışıyor. `object` sorunun **konu
   alanını** adlandırır; varlığın türünü değil. Bu yüzden EMPLOYEE sorusundaki
   bir fabrika adı hiç çözümlenmiyor.
3. `computeClarification.ts` — `entity_ref.length > 0 && resolvable === 0`,
   hepsi-veya-hiç, HIGH, üretimi tamamen değiştiriyor.

**Ölçülen bedel:** ✅ 10 gerçek turun 7'si başarısız; 6'sı bu kapıdan.

**Literatürdeki adı:** epistemik başarısızlığı aleatorik muğlaklık gibi
işlemek — kendi arama hatamızı kullanıcıya yüklemek (SOTA belgesi §2.2).

### B2 · IR frame'in `entity_ref` yuvası
**Taşıdığı yük:** frame gerçekten iyi çalışıyor — router 6 kategori eşledi, 60
araç seçti, ne sorulduğunu anladı. ✅
**Yanlış kablolama:** yuva **tip ayrımı yapmıyor.** `4-12 vardiyası` (vardiya)
ve `sırlama 3-4-5` (hat aralığı) varlık sanılıyor, sonra B1'in
`resolvable === 0` sayımını zehirliyor. ✅

---

## §4 · SINIF C — Fosil: yük taşıyor sanıyoruz, taşımıyor

### C1 · Öğrenilmiş kelime haritası — **F177**
**Ne sanıyoruz:** sistemin öğrendiği, biriktirdiği, değer taşıyan bir varlık.
Sahibin kendi sorusu: *"Benim öğrenilmiş kelimelerim ne oldu?"*

**Gerçek durum:** ✅
- Canlı yolda **hiç sorgulanmıyor** — kategoriler `deriveCandidateCategories
  (frame)`'den, yani `(action × object)` tablosundan geliyor. Kelime yok.
- **Büyümüyor** — `stageTools.ts:494`: `[ToolFilter] learn suppressed
  basis=frame (cross-layer guard)`.
- İçeriğinin bir kısmı zaten gürültüydü (durak kelimeleri; ROUTE-HYGIENE-1'in
  var olma sebebi). 📄

**Yük taşıdığı tek an:** router çökerse (→ D1).
**Karar:** bir **öğrenme hedefi** olmaktan çıkmalı. Sabitlenmiş zemin olarak
kalır; gerçek öğrenme varlığı `router_proposals`'tır.

### C2 · İlk `tool_doc` overlay — **F172**
Mekanizma kanıtı tam, bilgi katkısı **sıfır**: *"Hat duraklarının listesini
döndürür"* — sunucu açıklamasını tekrar ediyor. 📄 Boru hattı yük taşıyor;
**içerik taşımıyor.** Overlay ancak sunucunun bilmediğini söylediğinde yük
taşır.

### C3 · `blind_spot` satır seçeneği
Coverage-is-config yasası altında **MOOT**. 📄 Eklenmeyecek; kayıtta durması
tek başına bir uyarıdır: bir zamanlar gerekli görünen bir şey, bir yasa
değiştiği an gereksizleşti.

---

## §5 · SINIF D — Felaket anında yük taşır, ama test edilmemiş

Bu sınıf, projenin en sinsi riskidir: **hiç test etmediğin sigorta.**

### D1 · Kelime katmanı zemini
**Taşıdığı yük gerçek:** ✅ A1'deki 522 kesintisi kanıtladı — kod zemini servis
etti. Zemin kavramı işliyor.
**Ama:** kelime katmanının **sözlüğü donmuş** (C1) ve **hiç ölçülmüyor.**
Router'ın çöktüğü gün devreye girecek olan şey, insanların bugün nasıl
konuştuğundan gitgide kopan bir haritada duruyor.
**Ölçüm aleti var:** `routerAbLens` tam bunu skorluyor (Recall@k'nın ta
kendisi). **Tetiği yok** — F129. 📄
**Yani:** yükü var, sağlamlığı bilinmiyor. Bu bir arıza değil, bir **bilgi
boşluğu** — ve S62-2 gereği kapatılması gereken ilk şey.

### D2 · `router_proposals` — kapanmayan halka
**Taşıdığı yük:** öğrenme, yetkiden öneriye indi — anayasal olarak **doğru
şekil** (gözlem → öneri → sahip onaylı yayın). ✅
**Ama:** ⚠️ öneri şeridinin bir **kapanışı doğrulanmadı**. İnceleme yüzeyi var
mı, kim bakıyor, bugüne dek kaç satır birikmiş — hiçbiri okunmadı. Ve sahibin
turlarında `proposals=[]` geldi: router hiçbir öneri üretmedi, sebebi
bilinmiyor. ✅ (gözlem) / ⚠️ (sebep)
**Kaydeden ama asla kapanmayan bir döngü, öğrenme değildir.**

### D3 · Sentetik trafik korpusu
**Taşıdığı yük:** K1'in veri kapısı. ✅ Günde tam **500 frame** (200 000 ÷ 400),
00:00 UTC'de başlar, ~01:39'da tavana vurur, kalan ~22 saat boş döner.
**Ama:** 29 utterance'lık bir seti günde ~17 kez tekrar ediyor. Bu **kararlılık**
ölçer, **kapsam** ölçmez — ve K1'in sorusu bir kapsam sorusudur.
**Ek uyarı (TOTAL-45):** `tokensToday` bir ölçüm değil, satır × 400 sabiti.
Gösterge "token" diyor, saydığı "satır".
**Yani:** üretim var, tüketim yok, ve üretilenin cinsi ihtiyacı karşılamıyor.

---

## §6 · SINIF E — Sessizce yük taşımayı bırakmış, kimse fark etmemiş

**Bu belgenin en önemli bölümü.**

### E1 · `golden-runner`'ın gözlemlenebilirliği — **F169**
`forceFlushObservability` cevaptan **sonra** çağrıldığı için span'ler
gönderilmiyor. ✅ Kanıt: 67 tick'in 55'i (%82), ve daha yeni deploy'da
20 dakikanın 20'si (%100).

**Bunun anlamı, hata mesajının kendisinden daha ağır:**

> **FULL-TRACE MANDATE, en az üç ardışık deploy boyunca bu şerit için
> ihlal ediliyordu — ve completeness guard bunu yakalayamadı.**

Çünkü guard **span'in I/O taşıyıp taşımadığını** kontrol ediyor,
**span'in varıp varmadığını** değil. İki ayrı şey. Bir ferman "her okuma
görünür olacak" diyorsa, "görünür" hem *doldurulmuş* hem *ulaşmış* demektir;
guard yalnız birincisini zorluyor.

Ve daha kötüsü: `claimed > 0` dalı da (gerçek golden işi) aynı şekilde
kayıp. ✅ "Gerçek iş korunuyor" sanısı yanlıştı.

### E2 · `synthetic-traffic-injector`'ın gözlemlenebilirliği
**Kanıt:** ✅ Dosyada `Observability`/`forceFlush` **hiç geçmiyor** —
gözlemlenebilirlik hiç bağlanmamış.
**Sonuç:** K1'in kanıt şeridi, FULL-TRACE'in dışında çalışıyor. Bir ihlal
değil (hiç bağlanmamış, kopmamış) ama **ferman ile gerçek arasındaki ikinci
boşluk**.

### E3 · S61-CLEAN-1'in F169 düzeltmesi
Yazıldı, merge oldu, deploy edildi — ve **hiçbir şey değiştirmedi**. `await` →
`void` yaptı; oysa flush her iki halde de cevaptan sonraydı. ✅
**Kaydedilme sebebi:** bir düzeltmenin merge olması, yük taşımaya başladığı
anlamına gelmiyor. **Merge bir kanıt değildir; canlı ölçüm kanıttır.**

---

## §7 · Sınıflar arası desen

Beş sınıfa bakınca tek bir örüntü çıkıyor:

> **Yönetişim katmanı ölçülüyor. Anlama katmanı ölçülmüyor.**

- Sınıf A'nın tamamı yönetişim tarafında ve **her birinin kanıtı var** —
  kesinti kaydı, canlı log satırı, CI testi, carry-diff çıktısı.
- Sınıf B, C, D'nin tamamı anlama tarafında ve **hiçbirinin metriği yok**.
- Sınıf E, iki tarafın kesiştiği yerde: bir yönetişim fermanı (FULL-TRACE) bir
  anlama-dışı şeride uygulanamamış, ve **ölçülmediği için görünmemiş**.

Bu, S62-2'nin neden owner tarafından yasalaştırıldığını tam olarak açıklıyor.
Deneme yanılma hissi bir karakter kusuru değildi; **ölçüm yokluğunun doğrudan
sonucuydu.** Ölçemediğin katmanı ancak yamayabilirsin.

İkinci desen, daha incesi:

> **Bir mekanizmanın var olması, çalıştığının kanıtı değil.**

`routerAbLens` yazılmış ama tetiklenmiyor. `router_proposals` besleniyor ama
kapanmıyor. Sentetik enjektör üretiyor ama tüketilmiyor. Completeness guard
zorluyor ama yanlış şeyi. Öğrenme kaydediliyor ama okunmuyor. **Beş ayrı yerde
aynı hata:** inşa edildi, bağlanmadı.

---

## §8 · Bunun sıralamaya etkisi

Envanter, register v63 §8'in sırasını **değiştirmiyor ama gerekçelendiriyor**:

1. **Önce E1'i kapat** (F169 fix) — çünkü bir ferman ihlali, bir özellik
   eksikliğinden ağırdır, ve düzeltme beş satır.
2. **Sonra D1'i ölç** (F129 → Recall@k taban çizgisi) — çünkü test edilmemiş
   sigorta, sınıf D'nin tamamının anahtarı ve **S62-2'nin doğrudan emri**.
3. **Sonra B1/B2'yi düzelt** (tip kapısı → τ/β) — çünkü ölçülmüş bir tabanın
   üstüne yapılan düzeltme artık deneme yanılma değil.
4. **Sonra C1'i emekli et** ve D2'yi kapat — fosili kaldır, gerçek öğrenme
   halkasını kapa.
5. E2'yi ve completeness guard'ın kör noktasını (span **varışı**) B5'e ya da
   bir sonraki gözlemlenebilirlik turuna yaz.

**Not:** C2 ve C3 hiçbir şeyi bloke etmiyor; sahibin takdirinde ve sıraya
girmeleri gerekmiyor.

---

## §9 · Doğrulanmadı — öncül yapılmadı

Dürüstlük gereği, bu belgede **doğrulanmamış** olarak işaretlenenler:

- ⚠️ `router_proposals` için bir inceleme yüzeyi var mı; kaç satır birikti (D2)
- ⚠️ Sahibin turlarında `proposals=[]` gelmesinin sebebi (D2)
- ⚠️ Canlı `synthetic.activeSetId`'nin gerçek utterance sayısı — 29 rakamı
  yazılı dokümandan, DB'den değil (D3)
- ⚠️ `getOrderList`'in doğası gereği "pişmiş stok" kapsamlı olup olmadığı —
  eğer değilse, sahibin 7. turundaki *"KB7 Pişmiş Stok İşleri"* başlığı F82
  sınıfı bir render yalanıdır ve **bu belgeye Sınıf B olarak girer**. Okunmadı.
- ⚠️ Sahibin 6. ve 7. turlarında *"hiçbir araç sorgusuna dayanmıyor"* bandının,
  araç çağrısı YAPILMIŞ turlarda görünmesi — banner çelişkisi. Kod okunmadı.

Bu beşi bir sonraki turda tek oturumda kapatılabilir ve **hiçbiri sahipten
adım istemez.**

---

## §10 · Tek cümle

> Projenin yönetişim iskeleti sağlam ve kanıtlı; anlama katmanı ise inşa
> edilmiş ama bağlanmamış beş mekanizmanın üzerinde duruyor — ve bir yasa
> (FULL-TRACE), ölçülmediği için üç deploy boyunca sessizce ihlal edildi.
> **Kalıntının çoğu çöp değil; bağlanmamış altyapı.**

<!-- SON · cwf-load-bearing-residue-v1 · rev 1 · 2026-07-23 -->
