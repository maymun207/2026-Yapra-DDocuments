# cwf-memory-and-discovery-QA-S81 · v1
<!-- S37-1: bu dosya sürümlüdür, sessizce üzerine yazılmaz. -->
<!-- Basım: S84 (2026-08-07), Architect. Kaynak: S81 ikinci yarısı (FIX-1 gecesi),
     sahip ↔ Architect diyaloğu; tam metin S84'te sahip tarafından geri getirildi
     ve "mutlaka kayda geçsin" talimatıyla mintlendi. -->

## §A · NEDEN BU KAYIT VAR

S81'de sahip üç soru sordu (bellek, kök çıkarımı, Plan B/hibrit arama) ve verilen
cevap üç iş ipliğinin doğum belgesi oldu. Özet register/bucket'a girdi ama
diyaloğun tam metni hiçbir oturum dokümanına girmemişti. Bu dosya o boşluğu
kapatır: kaynak konuşma + her ipliğin nereye bağlandığı, tek yerde, izlenebilir.

## §B · KAYNAK KONUŞMA (S81, verbatim)

### Sahibin üç sorusu

> Şimdi benim burada takıldığım iki tane konu var. Bir tanesi, ya Memory'i biz
> düzelttik. Memory'de bunun cevabının "Successful" olarak yazılmış olması
> lazım. Memory'e niye bakılmadı? Yani burada Memory'deki bilgiyi biz Gemini'ye
> verdik, el eleme verdik ve o ignore mu etti? Yani neden olmadı? Bu birinci soru.
>
> İkinci sorum da bu kökler kısmı. Benim hatırladığım kadarıyla soru
> sorulduğunda aslında ilk başta bizim yaptığımız şeylerden bir tanesi, bu
> kökleri Gemini Flashlight'a sorup, köklerine soruyu ayırmak için bir
> döngümüz vardı. Orada kelimelerin döngüsünü çıkartmıyor muyuz? Sonuç
> itibariyle bunu da anlamadım.
>
> Bir şimdi konuşurken aklıma üçüncüsü de geldi. Sonuç olarak biz namıdeğer
> pet piyasası B dediğimiz, sonuçta sanırım bu A23'e karşılık geliyor; Quadrant
> ve BM25 RegEx implementasyonu bahsettiğim. Günün sonunda bunu implement
> etsek, ettiğimizde bu problemle karşılaşacak mıyız bir daha? Bu problemle
> ilişkili mi? Bir de buna cevap ver.

### Architect'in cevabı

> **1 · "Memory'de 'successful' yazıyordu, niye bakılmadı?"**
>
> Burada iki gerçek var ve ikisi de bu gece kurduğumuz sistemin bilinçli kararı:
>
> Birincisi — bellekte "successful" hiç yazmıyordu, yazamazdı da. Sunucu
> grafiğin çizildiğini göremiyor (render tarayıcıda olur); o yüzden çizen turun
> damgası bile unproven — "başarısız değil ama kanıtlayamam." Bu gece
> kurduğumuz filtre yalnız failed'ı dışarıda tutar; "başarılı, bunu tekrarla"
> diye bir etiket henüz yok.
>
> İkincisi — belleğin Gemini'ye verdiği şey cevap değil, kırıntı. Tasarım
> gereği belleğe ham cevap yazılmaz (zehirlenmenin dersi tam buydu: cevap
> metni taşınırsa, kötü cevap da taşınır). Gemini'nin eline geçen şey şuydu:
> "daha önce şu soru soruldu, şu araçlar kullanıldı." "Grafik 85'i çiz, işe
> yarıyor" DEĞİL. İkinci turda bu kırıntıyı görünür şekilde kullandı (çağrı
> sayısı 8'den 5'e düştü, neredeyse dosdoğru gitti); üçüncü turda aynı kırıntı
> öndeyken savruldu — çünkü bellek prompt'ta bir tavsiyedir ve model 0.7
> sıcaklıkta zar atar.
>
> Senin beklediğin şey — "bu soru = grafik 85, geçen sefer çalıştı, aynısını
> yap" — sistemde adıyla planlı ama henüz inşa edilmedi: PROCEDURE-RECALL-1
> (başarılı turdan rutin damıtmak) ve SEMANTIC-MEMORY-1 (soru→artefakt olgusu
> — senin tetiğini çektiğin kalem). Bu gece o katmanın önkoşulunu bitirdik:
> rutin damıtacaksan önce zehirli turdan damıtmadığından emin olmalısın.
> Sıradaki iki iş tam senin sorduğun boşluğu dolduruyor.
>
> **2 · "Kök döngümüz yoktu mu? Kelimeleri köklerine ayırmıyor muyuz?"**
>
> Var — ama başka bir katmanda çalışıyor. Frame çıkarımı senin SORUNU parçalar
> ("Granit Glazür hatları" varlığını, "metrik sorgusu" niyetini çıkarır) ve bu,
> bizim yönlendirmemizi besler: hangi kategoriler, hangi araçlar. O katman bu
> gece de kusursuz çalıştı ([Frame] entity_ref=[Granit Glazür hatları]
> conf=HIGH).
>
> Kırılan yer şu: model list_charts'a giderken arama kelimesini kendi yazar —
> "sarfiyatı" mı yazacak, "sarfiyat" mı, o anki üretimine kalmış — ve o kelime
> Superset'in kendi düz-metin aramasına gider. Bizim kök makinemiz o giden ipin
> üstünde hiç durmuyor. Yani kök bilgimiz var ama yanlış boru hattında. Bunu
> fark etmen değerli, çünkü kalıcı çözümün adresini gösteriyor: kural-2 modele
> "kökü dene" diye tavsiye ediyor; asıl sağlam çözüm, geçidin kendisinin bunu
> mekanik yapması — arama 0 ya da 1 sonuç dönerse geçit eksiz varyantı kendisi
> denesin, model hatırlasın-hatırlamasın. Bunu W-kalemi olarak deftere
> yazıyorum: "gateway-tarafı mekanik kök-tekrarı" — kural-2'yi tavsiyeden koda
> çevirir.
>
> **3 · "Plan B — Qdrant + BM25 — bunu yapsak bu problem biter mi?"**
>
> Doğrudan ilişkili, ve cevap: yarısını kökten bitirir, yarısına dokunmaz.
>
> Bitirdiği yarı: bu gecenin tetiği olan ek-kırılganlığı. Grafik kataloğunu
> kendi tarafımızda hibrit indekslersek (BM25 + embedding), "doğalgaz sarfiyatı
> grafiği" araması 80/85/94'ü ekinden bağımsız bulur — "sarfiyatı"≈"sarfiyat"
> ayrımı embedding için yok hükmündedir. Tuzağın kurulduğu keşif katmanı
> ortadan kalkar. Ve zaten hammaddesi elimizde: LearnCorpus 796 varlığı
> keşfetmiş durumda (ADR-009 — topoloji keşfedilir, elle yazılmaz);
> SEMANTIC-MEMORY-1'in "Granit gaz = grafik 85" olgusu da aynı fikrin en ucuz
> hâli.
>
> Dokunmadığı yarı: bu gecenin silahı olan karar hatası. Adayları kusursuz
> sırayla önüne koysan bile "çiz mi, tabloya mı dök, 'yok' mu de" kararını yine
> model verir — birinci turda 85'in verisi elindeyken çizmedi, hatırla. O
> katmanın çaresi bu gece kestiğimiz FIX-1 (iniş maddesi) ve ileride
> deterministik yokluk-iddiası sensörü.
>
> Yani sıralama tahtada zaten doğru duruyor: FIX-1 (şimdi, karar katmanı) →
> 2F.1+2F.2 (soru→artefakt+rutin) → RAG/hibrit şerit (keşif katmanı, dış
> ekiple). Üçü birlikte, bu gece gördüğün patlamanın üç sebebini üç ayrı
> yerinden söker.

## §C · ÜÇ İPLİĞİN AKIBETİ (S84 sonu itibarıyla — canlı defter)

| İplik | Doğduğu kayıt | S84 durumu |
|---|---|---|
| 1 · Bellek "successful" boşluğu | Önkoşul: `PHASE-SUCCESS-ONLY-RECALL-1` (S82'de merge, CANLI — S84'te S3 turu zehirli tarihten toparlanarak filtreyi canlıda kanıtladı). Devamı: **2F.1 PROCEDURE-RECALL** + **2F.2 SEMANTIC-MEMORY**, bucket v22 §BUG.5 sırasında | Önkoşul ✅ · 2F.1/2F.2 kuyrukta |
| 2 · Kök / mekanik tekrar | **W-018** (bucket v22 §W, register v87:53) | S84'te kanıt fikri evirdi: `search_tools`'un ARAÇ indeksi olduğu bayt-kanıtlandı → çare varyant değil **katman-öğretimi + numaralandırma yasası** oldu (`PHASE-CHART-LANDING-MECH-1` G1+G2, merge `30a396d4`). W-018 → SUPERSEDED · **BUG-035 KAPANDI** · N=3 v2 = 3/3 |
| 3 · Plan B (Qdrant+BM25, A23 ailesi) | RAG/hibrit dış-ekip şeridi; 3-soru relay'i pasif nöbette | "Yarısını bitirir" analizi geçerliliğini koruyor — ve **karar-katmanı yarısı S84'te bitti** (dört-durum yasası + deterministik damgalar). Keşif-katmanı yarısı RAG şeridinde; `machine-knowledge-base` backend'i kayıtlı ve sağlıklı (S84 sağlık okuması), içerik entegrasyonu sahip sinyali bekliyor. Bitişik yeni aday: **ADHOC-VIZ-1** (küre-dışı grain için ham-veriden grafik yolu) |

## §D · BU KAYDIN YERİ

Bu dosya karar-kaydıdır (oturum dokümanı değil): S81 diyaloğunun kaynak metni +
ipliklerin izlenebilirliği. Register/bucket satırları buraya atıf verebilir.
Güncellemesi yeni sürümle olur (v2, v3…); v1 asla üzerine yazılmaz.
