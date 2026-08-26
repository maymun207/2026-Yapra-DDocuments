# CWF — AJAN TAKSONOMİSİ v1_2 · KANONİK + YAPRAK DEĞERLENDİRMESİ
**cwf-vision-note-AGENT-TAXONOMY-v1_2 · 2026-08-25**

<!-- v1'i GEÇERSİZ KILMAZ, GENİŞLETİR (S37-1: v1 dokunulmadı).
     v1_2 FARKI: (a) merdiven formu ile üç-düzlem formu uzlaştırıldı, eksen
     kırılması adlandırılarak çözüldü; (b) kriter listesi 3+7'ye ayrıldı;
     (c) piyasa haritası, ihtiyaç haritası ve Yaprak değerlendirmesi eklendi;
     (d) her Yaprak hücresi kaynak + çürütücü ölçüm taşıyor.
     TASARIM KAYNAĞI (S112-YASA-1): §1–§4 Architect (Claude). §1.4'teki merdiven
     karşılaştırması, sahibin başka bir modele ürettirdiği taksonomi belgesinden
     alınmıştır; o belge kaynak olarak adlandırılmış, metni kopyalanmamıştır. -->

---

## §0 · STATÜ VE KANIT DİSİPLİNİ — önce oku

**Bu belge iki farklı güvenilirlik sınıfı taşır. Karıştırılırsa işe yaramaz.**

| Bölüm | Sınıf | Ne demek |
|---|---|---|
| §1–§4 · Taksonomi | **TASARIM** | Literatür + CWF doktrininden türetildi. Doğruluğu argümanla tartışılır. |
| §5 · Piyasa | **TAHMİN** | Ölçülmedi. Çürütücüsü §4'ün rakip dokümantasyonu üzerinde koşulmasıdır (`TAX-COMPETITOR-AUDIT-1`). |
| §6 · İhtiyaç | **YARGI** | Sahip alan bilgisi + ARDIC/ARMES bağlamı. Ağırlıklar açıkça yargıdır, ölçüm değil. |
| §7 · Yaprak bugün | **BELGE-KAYNAKLI** | Taze klon/canlı DB okuması YOK. Her hücrede kaynak + çürütücü ölçüm var. |
| §8 · Yaprak yarın | **PLANA BAĞLI İDDİA** | Kuyruktaki adlandırılmış kalemlere bağlıdır; kalem kaymışsa iddia kayar. |

**§7'nin hiçbir hücresi bir dış materyale ölçüm diye girmez.** Girmesi için taze
klon + canlı DB okuması gerekir; o iş `TAX-SELF-PLACEMENT-1`'dir ve yapılmadı.

---

## §1 · KANONİK TAKSONOMİ

### 1.1 · Neden tek merdiven yetmiyor

Doğrusal bir "Seviye 0→5" merdiveni iletişim için iyidir ama **kendi ekseniyle
çelişir.** Merdiven 0'dan 4'e tutarlı bir şeyi ölçer: *kararın ne kadarı modelde.*
Sonra yönetişimi 5. basamak yaparsan eksen kırılır — çünkü politika kapısı
otonominin bir üst basamağı değil, **otonomiye vurulan dizgindir.** Kendi
ekseniyle ölçülürse "Seviye 5" bir sistemin model-otonomisi "Seviye 3"ten
DÜŞÜKTÜR. Bir dış denetçi bunu ilk okumada yakalar:

> *"AutoGPT'den daha az otonom olan bir şey nasıl AutoGPT'nin iki basamak
> üstünde oluyor?"*

Bu soruya cevabın yoksa taksonomin savunulamaz. Cevap: **yönetişim dik bir
eksendir.** Politika kapılı tekil ajan mümkündür (A3 + C-yüksek). Sıfır
yönetişimli sürü de mümkündür (A4 + C-sıfır). İkincisi birincisinden daha
otonomdur ve **daha kötü bir üründür.**

### 1.2 · Kanonik biçim: bir tür + iki skor

```
İMZA:   A<tür> · B<güç>/15 · C<güvence>/21 · [BİRİM | SİSTEM]
```

- **A — TÜR.** Ayrık. *Çalışma zamanında sonraki adımı ve durma kararını kod mu
  model mi veriyor?* Kalite sıralaması DEĞİL; kararın ne kadarının devredildiği.
- **B — GÜÇ.** Beş boyut × 0–3. Literatürden devralındı (Shavit/Chan/Bent).
- **C — GÜVENCE.** Yedi kapı × 0–3. CWF doktrininden türetildi.

**Bileşik sınıflar** — merdivenin "Seviye 5"ini eksen kırmadan kurtarmanın yolu:

| Ad | Tanım | Neden bileşik |
|---|---|---|
| **KURUMSAL SINIF** | `A ≥ 3` **ve** `C ≥ 14/21` | İki eksende birden eşik. Tek basamak değil. |
| **GÖREV-KRİTİK SINIF** | `A ≥ 3` **ve** `C ≥ 18/21` **ve** C3·C5·C6 = 3 | Yetki, sınırlama ve kapı tavanda olmadan görev-kritik denmez. |
| **OYUNCAK** | `C ≤ 6` | B ne olursa olsun. Garajda yapılmış 800 HP. |

Bu form, merdivenin anlatım gücünü korur (tek satırda söylenebilir) ama
eksen kırmaz.

### 1.3 · Katmanlı A — gerçek ürünler tek harfle adreslenmez

Gerçek sistemler karmadır. `A3` yazmak bilgi kaybettirir. Kanonik gösterim:

```
A2[çekirdek] ⊕ A3[kenar]     — sabit boru hattı, içinde sınırlı model döngüsü
A3[birim] ⊕ A4[sistem]        — özerk birimler, orkestre edilmiş
```

Tek harf isteniyorsa kural: **sistemin dış davranışını belirleyen katman
yazılır** ve katmanlı hâli parantezde durur.

### 1.4 · Merdiven ↔ üç düzlem eşlemesi

Dış tek-sayfalık için merdiven kullanılacaksa, eşleme budur:

| Merdiven | Kanonik | Not |
|---|---|---|
| Seviye 0 · Deterministik iş akışı | **A2** | n8n/Zapier grafı |
| Seviye 1 · Artırılmış sohbet botu | **A0 / A1** | 0 ile 1 arası SIRALANAMAZ — tür farkı (§3.1) |
| Seviye 2 · Araç destekli zincir | **A1–A2 arası** | model-yönlendirmeli ama sabit zincir |
| Seviye 3 · Otonom tekil ajan | **A3** | ReAct döngüsü |
| Seviye 4 · Çoklu ajan | **A4** | çalışma zamanı görev ayrıştırma şartı |
| Seviye 5 · Yönetişimli kurumsal | **bileşik: A≥3 ∧ C≥14** | tek eksen değil — §1.2 |

---

## §2 · SINIF TANIMLARI

**A0 · Üretim.** Tek çıkarım, araç yok, döngü yok.

**A1 · Donanımlı Model.** Model + retrieval/araç/bellek; her döngüyü insan
kapatıyor. Anthropic'in "augmented LLM" yapı taşı.

**A2 · Sabit Akış.** Orkestrasyon önceden yazılmış kod yollarıyla. Model
slotları doldurur; **topoloji insan-yazımı ve sabittir.** İki test, ikisi de
geçmeli: (a) yeni araç = elle şema değişikliği? (b) aynı hedefle iki koşuda
adım sırası farklı olabilir mi → hayır? İkisi de evet/hayır ise A2.

**A3 · Özerk Tekil.** Kontrol akışına ve **durma kararına** model karar verir.

**A4 · Koordineli Çoklu.** Birden çok A3 birimi + koordinasyon protokolü +
**çalışma zamanında üretilen** görev ayrıştırma. Sabit rol listesi + sabit sıra
= kaç "ajan" olursa olsun hâlâ A2.

**A5 · Yönetişimli Kurum.** A4 + beş özelliğin **hepsi**: versiyonlu kanonik
yasa korpusu · kapıda zorlanan rıza yüzeyi · sistem-hükümlü kimlik (prompt'ta
beyan değil) · ekle-yalnız defter · atlanamaz ölçüm kapısı.
**Tek soruluk testi:** bir birimin yetkisini prompt'unu değiştirerek
genişletebiliyor muyum? Evet ise A5 değil.

> **Çıkar çatışması beyanı:** A5 literatürde adlandırılmış bir sınıf değildir;
> bu notun icadıdır ve kendimizi içine koyduğumuz sınıfı kendimiz icat etmiş
> olmamız bir çatışmadır. Tek savunması beş özelliğinin **üçüncü tarafça
> ölçülebilir** olmasıdır. Ölçülemezse sınıf düşer.

---

## §3 · KRİTERLER — ÜÇ + YEDİ, ayrı listeler

Öteki merdiven belgesi dört kriteri tek liste yapıyor ve kendi tablosuyla
çelişiyor: dördüncü kriter yönetişimken Seviye 3 örneği AutoGPT'dir — sıfır
yönetişimin ders kitabı örneği. Ya tablo yanlış ya liste. Çözüm: **iki ayrı
liste.**

### 3.1 · LİSTE-1 · "AJAN" DEMEYE HAK KAZANDIRAN ÜÇ KRİTER (giriş kapısı)

Bent'in asgari koşulları. Üçü birlikte sağlanmadıkça kelime kullanılmaz.

| G | Kriter | Test | Kim düşer |
|---|---|---|---|
| **G1** | **Ortama etki** | Ortamı kalıcı ve gözlenebilir biçimde değiştiren eylem alıyor mu? | Sade chatbot ✗ · Sınıflandırıcı ✗ · n8n workflow ✓ |
| **G2** | **Hedef-güdümlülük** | Adımları ÇALIŞMA ZAMANINDA kendisi belirliyor ve hata alınca planı revize ediyor mu? | n8n workflow ✗ (ray çizili) · Sade chatbot ✗ |
| **G3** | **Durum farkındalığı** | Kararı ETKİLEYEN, etkileşimler arası süren bir durum temsili var mı? | Bellek düğümü var ama kararı etkilemiyorsa ✗ |

**Buradan çıkan sert sonuç:** n8n workflow G1'i geçer, G2'yi geçemez. Sade
chatbot üçünü de geçemez. **Her ikisine de "agent" demek tercih değil, hatadır**
— ve literatürle çürütülebilir bir hatadır.

Ek: **G1 ile G2 aynı eksende sıralanamaz.** Workflow G1 ✓/G2 ✗, chatbot
G1 ✗/G2 ✗. Merdivende 0 ile 1'i sıralamak keyfîdir; ikisi *tür* farkıdır.

### 3.2 · LİSTE-2 · "KURUMSAL SINIF" YAPAN YEDİ KAPI (C düzlemi)

Bunlar ajan olma kriteri DEĞİLDİR. Ajanı **yola çıkarılabilir** yapan
kriterlerdir. Her biri 0–3.

| Kapı | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| **C1 İzlenebilirlik** | log yok | çağrı sayımı | girdi+çıktı kısmen | HER model/araç/veri çağrısı girdi+çıktı ile kayıtlı, kapsam ölçülü, teslimat doğrulanmış |
| **C2 Yeniden üretilebilirlik** | yok | benzer çıktı | trace yeniden koşar | motor+aşama sırası+yorumlayıcı sabit, **bayt-karşılaştırılabilir** |
| **C3 Yetki modeli** | sınır yok | prompt'ta rica | kod tarafında allow-list | eylem uzayı kodda **sayılı**, DB satırı yalnız DARALTIR, negatif ikiziyle testli |
| **C4 Rıza yüzeyi** | yok | gelenek | bazı eylemlerde onay | adlandırılmış onay kümesi kapıda ZORLANIR + **alıcının kendi yüzeyi var** |
| **C5 Arıza sınırlaması** | yarıçap bilinmez | kısmen | kapalı-güvenli varsayılan | yarıçap ÖLÇÜLÜ + kapalı-güvenli + bilinmeyende DURUR + adlandırılmış geri alma |
| **C6 Ölçüm kapısı** | yok | manuel test | CI var, atlanabilir | atlanamaz kapı **ve bir şeyi reddettiği gösterilmiş** |
| **C7 Kiracılık + köken** | ayrım yok | mantıksal | izolasyon | izolasyon kanal-kanal ispatlı + her iddia birincil kaynağa izlenebilir + sır asla düz metin |

**C6'nın "reddettiği gösterilmiş" şartı kritiktir.** Hiçbir şeyi reddetmemiş
kapı, kapı olduğunu kanıtlamamıştır — yeşil test takımı yalnız kimsenin
sorgulamadığını kanıtlar.

---

## §4 · SINIFLANDIRMA PROSEDÜRÜ

```
S0. BİRİM mi SİSTEM mi? Söylemeden devam etme.
S1. Döngü var mı? Hayır → A0.
S2. Araç var mı? Hayır → A0. Var ama her döngüyü insan kapatıyor → A1.
S3. Sonraki adım + DURMA kararı: kod → A2 · model → S4
S4. Çok birim + koordinasyon + ÇALIŞMA ZAMANI görev ayrıştırma? Hayır → A3 · Evet → S5
S5. Beş A5 özelliğinin hepsi? Hayır → A4 · Evet → A5
S6. GİRİŞ KAPISI G1·G2·G3 — üçü yoksa "agent" kelimesi kullanılmaz.
S7. B1–B5 puanla. Ölçülmemiş boyut `[Ö?]`, 0 DEĞİL.
S8. C1–C7 puanla — ve MİMARİDE / ÖLÇÜLDÜ olarak AYRI puanla.
S9. Bileşik sınıf: A≥3 ∧ C≥14 → KURUMSAL · C≤6 → OYUNCAK
```

**S8'in çift puanlaması bu belgenin en işe yarar tarafıdır.** Mimari skor bir
tasarım iddiasıdır; ölçülmüş skor bir üründür. İkisinin arasındaki fark, bir
şirketin gerçek teknik borcudur.

---

## §5 · PİYASA NEREDE — TAHMİN, ölçüm değil

| Bant | Kim | A | C (ölçülmüş) | Nasıl satılıyor |
|---|---|---|---|---|
| **Kütle** | n8n/Zapier akışları, prompt-wrapper botlar, "agentic RAG" | A1–A2 | 0–4 | "AI Agent" |
| **Hype bandı** | AutoGPT, LangGraph ajanları, tekil ReAct kurulumları | A3 | 2–7 | "Autonomous agent" |
| **Demo bandı** | CrewAI, AutoGen, ChatDev kurulumları | A2–A4 (kurulum belirler) | 2–8 | "Multi-agent" |
| **Kapalı bant** | Büyük bulut sağlayıcıların kurumsal ajan ürünleri | A3 | 8–15 | "Enterprise agent" |
| **Boş bant** | — | A≥3 ∧ C≥18 | — | **kimse ölçüp yayınlamıyor** |

Üç gözlem:

1. **Kütle A2'de ve "agent" diye satılıyor.** Bu, müşterinin zararına çalışan
   bir yanlış adlandırmadır: müşteri A4 bekliyor, A2 alıyor. Kurumsal hayal
   kırıklığının kaynağı burada.
2. **Çerçeve sınıfı belirlemez.** "CrewAI kullandım" bir sınıf iddiası değildir;
   aynı çerçeveyle A2 de A4 de üretilir. Bu, piyasadaki en çok tekrarlanan
   kategori hatasıdır. MCP kullanmak da sınıf belirlemez — protokol her
   seviyede olabilir.
3. **C düzlemi ölçülüp yayınlanmıyor.** Ne rakipler ne biz. Piyasa B'yi
   konuşuyor, C'yi konuşmuyor — çünkü C demo edilemez, ancak kanıtlanır.

**Çürütücü:** §4'ü üç rakibin kendi dokümantasyonu üzerinde koş
(`TAX-COMPETITOR-AUDIT-1`). Tablo yanlışsa bu koşu yanlışlığı gösterir.

---

## §6 · İHTİYAÇ NEREDE — endüstriyel/fabrika bağlamı

Bu bölüm **yargıdır**, ölçüm değil. Ama yargı bir gerekçeye dayanır: fabrika
operasyonunda bir yanlış cevabın bedeli bir metin değil, bir üretim hattıdır.

### 6.1 · İhtiyaç eğrisi: B'de ORTA, C'de TAVAN

Fabrika **soyut hedef oluşturma** istemiyor. **Sürü koordinasyonu** istemiyor.
**Meta-öğrenme** istemiyor. İstediği şey listesi kısa ve sert:

| # | Gerçek ihtiyaç | Düzlem | Ağırlık |
|---|---|---|---|
| İ1 | **Doğru varlık çözümleme** — hangi "Glazur3"? Yanlış varlık = yanlış hat | B2 + A23 | 🔴 YÜKSEK |
| İ2 | **"Bilmiyorum" diyebilmek** — tahmin etmek yerine sormak/bildirmek | B2 + C5 | 🔴 YÜKSEK |
| İ3 | **Sınırlı eylem** — MES'e okuma mı yazma mı, hangi araç kime | C3 | 🔴 YÜKSEK |
| İ4 | **Denetlenebilirlik** — kim ne sordu, ne okundu, ne cevaplandı | C1 | 🔴 YÜKSEK |
| İ5 | **Kiracı izolasyonu + sır güvenliği** | C7 | 🔴 YÜKSEK |
| İ6 | **Geri alınabilirlik** — hatalı kural/davranış tek hamlede geri | C5 | 🔴 YÜKSEK |
| İ7 | **Değişikliğin kapıdan geçmesi** — üretime sessiz sızma yok | C6 | 🔴 YÜKSEK |
| İ8 | **Araç kapsamı** — MES'in gerçekten kullanılabilir yüzeyi | B1 | 🔴 YÜKSEK |
| İ9 | Vardiya/tur ötesi hafıza | B3 | 🟡 ORTA |
| İ10 | Kurum yöneticisinin kendi yüzeyi (mühendislik paneli değil) | C4 | 🟡 ORTA |
| İ11 | Yeniden üretilebilir hata ayıklama | C2 | 🟡 ORTA |
| İ12 | Uzun-erimli özerk işletim | B5 | 🟢 DÜŞÜK |
| İ13 | Öğrenme/ağırlık güncelleme | B4 | 🟢 DÜŞÜK — hatta **istenmeyen** |

**Sekiz yüksek-ağırlık kalemin altısı C düzleminde, ikisi B'de.**

### 6.2 · Piyasa ile ihtiyacın çakışmadığı yer

```
Piyasanın sattığı:    B yüksek (iddia) · C ölçülmemiş
İhtiyacın istediği:   B orta (doğru)   · C tavan (kanıtlı)
```

Bu boşluk Yaprak'ın ticari tezinin tamamıdır. Ama tezin bir bedeli var:
**C demo edilemez.** Toplantıda C3 gösteremezsin; ancak negatif ikizli bir test
modülü, bir denetim satırı ve bir geri-alma koşusu gösterirsin. Yani Yaprak'ın
satış hareketi demo değil, **kanıt teslimidir** — ve kanıt henüz üretilmedi.

### 6.3 · İhtiyacın en zor parçası otonomi DEĞİL

Fabrikada en zor iş **yönetişim altında belirsizlik çözmektir**: kullanıcı
"sırlama 3-4-5" dediğinde hangi kaydı kastettiğini bilmek, bilmiyorsa
uydurmadan sormak, sorarken kapsam dışına sızmamak. Bu ne B5'tir ne A4.
Bu, İ1+İ2'dir — ve tam olarak Yaprak'ın en büyük açık kalemidir (§7.4).

---

## §7 · YAPRAK BUGÜN — gerçekçi değerlendirme

### 7.0 · Önce zorunlu ayrım: İKİ AYRI SİSTEM aynı adı taşıyor

| | **Yaprak çalışma zamanı** | **CWF/ADF geliştirme koşum takımı** |
|---|---|---|
| Nedir | Müşteriye teslim edilen ürün | Ürünü inşa eden fabrika |
| Kim kullanır | Fabrika operatörü | Architect + AG şeritleri + Operator |
| Sınıfı | **A2[çekirdek] ⊕ A3[kenar]** | **A4, A5 adayı** |
| Çoklu-ajan mı | **HAYIR** | Evet |

**Öteki taksonomi belgesinin Yapra.ai'yi Seviye 5'e koyması bu ayrımı
kaçırıyor.** Seviye 5, Seviye 4'ü kapsar; Seviye 4 çalışma zamanı çoklu-ajan
demektir; Yaprak'ın ürünü tek-organizma bir tur boru hattıdır ve bu bir
**bilinçli karardır**, eksiklik değil (S88: *"bayt seviyesinde teşhis
edilebilirlik modülerliği yener"*). A4 özellikleri koşum takımında yaşıyor.

### 7.1 · A DÜZLEMİ — Yaprak çalışma zamanı

**Ölçüm dayanağı (belge):** S88 bileşen haritası + tur dizisi belgeleri +
A23-GAP-RECON-S103.

| Katman | Sınıf | Kanıt |
|---|---|---|
| Boru hattı | **A2** | 10 sıralı aşama, tek `TurnContext`, **aşama sırası davranıştır**, sıcak-takılabilir değil (bilinçli) |
| Yönlendirme | **A1–A2** | ② governed router = ayrı completion; frame LLM cevabına biner, çağrı sayısı artmaz |
| Araç döngüsü | **A3** | ⑩ `streamText` döngüsü, model araç seçer, `maxToolRounds` ile sınırlı |
| Planlayıcı | **A3, sınırlı** | `turn/planner.ts` deterministik plan bloğu + `planner.replanNudgeMax` re-plan kapısı; dosya başlığında mühürlü: *"TEK planlayıcı organ"* |
| Temellendirme | **A2 (kod)** | ⑨ grounding deterministik kod, **asla LLM hakem** (ADR-001) |

**Hüküm: `A2[çekirdek] ⊕ A3[kenar]`.** Tek harf isteniyorsa **A3** — çünkü dış
davranışı belirleyen katman araç döngüsüdür.

**Giriş kapısı:** G1 ✓ (MES'e gerçek erişim, 141 araç) · G2 ✓ ama **sınırlı**
(re-plan kapısı var, serbest planlama yok) · G3 ✓ (episodes + dossiers +
routines, turlar arası). **Üçü de geçiyor — "agent" kelimesi hak edilmiş.**

### 7.2 · B DÜZLEMİ — güç

| Boyut | Puan | Gerekçe | Çürütücü ölçüm |
|---|---|---|---|
| **B1 Ortam etkileşimi** | **2** | 141 ARMES aracı + Superset; sıfır-kod mount **üretimde ispatlı** (Superset, ARMES'in tek satırına dokunmadan eklendi); esnek araç seçimi var. 3 değil: yapılandırılmamış ortamda yeni eylem bileşimi yok | Araç getirimi Recall@k taban çizgisi — **hiç koşulmamış** |
| **B2 Hedef karmaşıklığı** | **1** | Tur-kapsamlı tek hedef; deterministik plan bloğu + sınırlı re-plan. Alanlar arası bağımlı çoklu hedef yönetimi yok | A23 adım-1 ölçümü |
| **B3 Zamansal tutarlılık** | **2** | Blok 2F: epizodik bellek + rutinler + anlamsal dosyalar + huni; **yalnız kanıtlanmış turlar öğretir**; v-zemini, başarısız satırlar dışlanır. 3 değil: `turn_context`/GWT **0 dosya**, çapraz-tur taşıyıcı **yok** | LongMemEval koşusu |
| **B4 Öğrenme** | **1** | Ağırlık güncellemesi yok — ve **olmaması doğru** (İ13). Yönetilen satır + bellek birikimi | — (kavramsal, ölçüm gerekmez) |
| **B5 Özerklik** | **1** | Kapalı-güvenli varsayılanlar, güven-çürümesi, NIL turu öldürmez, adlandırılmış geri alma. 2 değil: uzun-erimli gözetimsiz işletim yok — tur kapsamlı | Agent-SafetyBench |

**B TOPLAM: 7/15.** Ve bu **kötü bir haber değil** — §6.1'e göre ihtiyaç
eğrisi B'de zaten orta bandı istiyor. Sorun toplamda değil, **B2'de** (§7.4).

### 7.3 · C DÜZLEMİ — güvence · MİMARİDE vs ÖLÇÜLDÜ

Bu tablo belgenin merkezidir.

| Kapı | Mimari | Ölçüldü | Mimarinin dayanağı | Ölçümü düşüren şey |
|---|---|---|---|---|
| **C1 İzlenebilirlik** | **3** | **2** | FULL-TRACE MANDATE; araç INPUT+OUTPUT; aşama başına span; üç asla-karıştırılmayan sistem (ledger ≠ trace ≠ digest); yanıttan ÖNCE force-flush | 🔴 **#80**: `[Obs] flush delivery=failed swallowed=N` günlerce büyüdü · 🔴 `F-S106-VECTOR-OUTCOME-SILENT`: `off`/`unavailable` span AÇMIYOR — okuyucunun kendi içinde `empty≠zero` ihlali |
| **C2 Yeniden üretilebilirlik** | **3** | **1** | Eval-gate bayt-aynılığı (motor + aşama sırası + yorumlayıcı); `replay/routerAbLens`; admin replay sekmesi | 🔴 **eval-canary 25+ kez SKIPPED, hiçbir inişte puanlamadı.** Bayt-aynılık iddiası bugün **kanıtsızdır** |
| **C3 Yetki modeli** | **3** | **3** | Clamp: kod = MAKSİMUM, DB satırı yalnız DARALTIR (iki yönlü test); ADR-010 araç başına kazanılmış güven; TEK `streamText` sitesi (grep-testli); `check:tenant-zero` CI'da istisnasız | — **Bu kapı gerçekten ödenmiş.** Beş kanal izolasyon ispatı negatif ikizleriyle |
| **C4 Rıza yüzeyi** | **2** | **2** | Kapılı admin publish yolu; ADR-012 dört katman (INVARIANT/POLICY/CONFIG/kiracı içeriği); "kasıtlı eylem" sayfaları denetimli | 🟡 **Tenant console VİZYON NOTU** — inşa edilmedi. Alıcının kendi rıza yüzeyi YOK; bugün mühendislik paneli var. Mimari de bu yüzden 3 değil 2 |
| **C5 Arıza sınırlaması** | **3** | **2** | Adlandırılmış geri alma: *"TEK governed publish, deploy yok"*; kapalı-güvenli varsayılanlar (`toolRetrievalMode=0`, DB kesintisinde de 0); tanınmayan mention → NIL, NIL turu öldürmez | 🔴 **Baskın arıza modunun sınırlaması inşa edilmedi.** Varlık belirsizliği patlama yarıçapı ÖLÇÜLDÜ: **678 kayıtlı addan 95'i 2+ varlık id taşıyor** (208 id, en kötü 3'e dallanma) — ve üçlü teşhis makinesi yok |
| **C6 Ölçüm kapısı** | **3** | **1** | Atlanamaz publish yolu; eval-gate 3/3 (SCHEMA·REFERENTIAL·BEHAVIORAL) `frameRouting` yayınında koştu | 🔴 **Kapı bir şeyi reddettiğini gösteremedi.** eval-canary sıfır kez puanladı → C6'nın 3 şartı ("reddettiği gösterilmiş") sağlanmıyor |
| **C7 Kiracılık + köken** | **3** | **2** | Beş kanal izolasyonu (okuma·birleştirme·yazma·yürütme·önbellek) her biri negatif ikiziyle; çapraz-kullanıcı okuması `user_audit` satırı yazar; sırlar maskeli, asla kullanıcı geçmez; **atıflar akıştan okunur, model YAZAMAZ** | 🔴 **#79**: `mcp_secrets` üç satır (`armes-new`, `ragbackend`, `supersettoken`) **DÜZ METİN**. Rotasyon sahip eylemi, yapılmadı |

**C MİMARİDE: 20/21 · C ÖLÇÜLDÜ: 13/21**

### 7.4 · TEK CÜMLELİK HÜKÜM

> **Yaprak'ın mimarisi kurumsal sınıfın tavanında; ölçümü %62'sinde. Ve
> ihtiyacın en zor iki kalemi (İ1 doğru varlık çözümleme, İ2 "bilmiyorum"
> diyebilmek) tam olarak Yaprak'ın en büyük açık kalemidir.**

Bunun kanıtı, savunma değil ölçüm:

- ⑤/⑥ anlama makinesi **inşa edilmedi**. Spec + 27 falsifier `1cbd1580`'de
  uykuda.
- Üçlü teşhis (LINK/NIL/AMBIGUOUS) boruda ölüyor: `stageClarify.ts:321-329`
  ikili döngü. `'ambiguous'` canlı düzlemde **erişilemez union üyesi**.
- `askOnUnresolved` **karanlık valf**: karar her turda hesaplanıyor,
  `wouldHaveAsked=1` telemetriyle loglanıyor, **soru sorulmuyor** (valve=0).
  Yani sistem bugün *ne zaman sorması gerektiğini biliyor ve sormuyor.*
- ③ Mention Typer: **0 dosya**. "4-12 vardiyası" entity_ref'e düşüyor.
- ④ Resolve tek kanal — skor yok (s₁/s₂ yok) → τ/β **tanımsız**.
- Şirket/holding seviyesinde varlık katmanı **yok** ("Kaleseramik" hiçbir
  katmanda geçmiyor).

### 7.5 · Bileşik sınıf hükmü — BUGÜN

| Sınıf | Şart | Yaprak | Sonuç |
|---|---|---|---|
| Ajan mı | G1·G2·G3 | ✓✓✓ | **EVET** |
| OYUNCAK mı | C ≤ 6 | 13 | **hayır** |
| KURUMSAL SINIF | A≥3 ∧ C≥14 | A3 ✓ · C=13 | **HAYIR — bir puan eksik** |
| GÖREV-KRİTİK | A≥3 ∧ C≥18 ∧ C3·C5·C6=3 | C5=2, C6=1 | **HAYIR** |

**Yaprak bugün kurumsal sınıfın bir puan altındadır ve o puan #79'dur
(düz metin sırlar) — bir mimari eksik değil, ödenmemiş bir borç.**

### 7.6 · İHTİYACIN NE KADARINI KARŞILIYOR — BUGÜN

| # | İhtiyaç | Ağırlık | Bugün | Neden |
|---|---|---|---|---|
| İ1 | Doğru varlık çözümleme | 🔴 | ⚠ **KISMEN** | Tek kanal, skorsuz; 95/678 ad çok-anlamlı |
| İ2 | "Bilmiyorum" diyebilmek | 🔴 | ❌ **HAYIR** | Karar hesaplanıyor, valf kapalı |
| İ3 | Sınırlı eylem | 🔴 | ✅ **EVET** | Clamp + ADR-010, testli |
| İ4 | Denetlenebilirlik | 🔴 | ⚠ **KISMEN** | Mimari tam; teslimat arızalı (#80) |
| İ5 | Kiracı izolasyonu + sır | 🔴 | ⚠ **KISMEN** | İzolasyon ✓ · sırlar düz metin ❌ |
| İ6 | Geri alınabilirlik | 🔴 | ✅ **EVET** | Tek governed publish, deploy yok |
| İ7 | Kapıdan geçme | 🔴 | ⚠ **KISMEN** | Kapı var, reddettiği gösterilmedi |
| İ8 | Araç kapsamı | 🔴 | ✅ **EVET** | 141 araç, sıfır-kod mount ispatlı |
| İ9 | Tur ötesi hafıza | 🟡 | ✅ EVET | Blok 2F |
| İ10 | Alıcının kendi yüzeyi | 🟡 | ❌ HAYIR | Tenant console vizyon |
| İ11 | Yeniden üretilebilir hata ayıklama | 🟡 | ⚠ KISMEN | Mimari ✓, kanıt ✗ |
| İ12 | Uzun-erimli özerklik | 🟢 | ❌ hayır | ihtiyaç düşük |
| İ13 | Öğrenme | 🟢 | ❌ hayır | **istenmiyor** |

**Sekiz yüksek-ağırlık kalemden: 3 tam · 4 kısmen · 1 hayır.**

Tek cümlelik ticari hâli: *"Yaprak, endüstriyel ihtiyacın yüksek-ağırlık
kalemlerinin üçünü bugün karşılıyor, dördünü mimaride karşılayıp kanıtını
üretmemiş, birini hiç karşılamıyor."*

---

## §8 · YAPRAK YARIN — ufuk çizgisi, kuyruğa bağlı

Aşağıdaki her satır **kuyrukta adlandırılmış bir kaleme** bağlıdır. Kalem
kayarsa iddia kayar.

| Kalem | Neyi kapatır | Etkisi |
|---|---|---|
| **#29 A23 anlama katmanı** (⑤/⑥ + üçlü teşhis + kanal-2/RRF + τ/β) | İ1, İ2 | **B2 1→2** · **C5 2→3** · valf açılınca sistem *sorabilir* hâle gelir |
| **#79 sır rotasyonu** | İ5 | **C7 2→3** → C=14 → **KURUMSAL SINIF eşiği geçilir** |
| **eval-canary SKIPPED soruşturması** (Kademe 3) | İ7 | **C6 1→3** — kapı bir şeyi reddettiğini gösterirse |
| **#80 Langfuse teslimat** | İ4 | **C1 2→3** |
| **`F-S106-VECTOR-OUTCOME-SILENT` FIX-1** | İ4 | C1'in ikinci yarısı |
| **ADF çıkış testi 3+/6 → 6/6** | — | Koşum takımının kendi kabulü; S113-H2 kalkar, #29 açılır |
| **SOTA kabul sözleşmesi 0/16** | B'nin dış ölçümü | B `[Ö?]` → ölçülmüş; **B düzlemi = SOTA'nın dış hâli** |
| **VECTOR-QOS + tüketici rungu** | İ8 | B1 2→2.5; araç getirimi Yol B |
| **Tenant console** | İ10 | **C4 2→3** |
| **`PHASE-CONTEXT-RETRIEVAL-1`** | Architect'in kendi yüzeyi | Ürün sınıfını değiştirmez; fabrikayı hızlandırır |

### 8.1 · Ufuk hâli — iddia

```
BUGÜN:   A2[çekirdek]⊕A3[kenar] · B 7/15 · C mimari 20/21 · C ölçüldü 13/21
                                            → KURUMSAL SINIF DEĞİL (1 puan)

#79 SONRASI (en ucuz hamle):              C ölçüldü 14/21
                                            → KURUMSAL SINIF ✓

A23 + KAPI BORÇLARI SONRASI:   B 8-9/15 · C ölçüldü 19-20/21
                                            → GÖREV-KRİTİK SINIF eşiğinde
                                              (C3·C5·C6 = 3·3·3 şartı sağlanır)

SOTA 16/16 SONRASI:            B ölçülmüş — dış kanıtla
```

### 8.2 · Ufkun ötesinde OLMAYAN şey

Yaprak **A4 olmayı hedeflemiyor** ve hedeflememeli. Çalışma zamanı
çoklu-ajan mimarisi, bayt seviyesinde teşhis edilebilirliği (S73-1) feda eder
ve endüstriyel ihtiyaç listesinde (§6.1) karşılığı yoktur. **A4 özellikleri
koşum takımında yaşamaya devam eder** — ve orada, ADF'nin kendisi ayrı bir
ürün adayıdır.

Bu, kuyruktaki tek "ufuk ötesi" kalemin neden `ADF-HEADLESS-LANE-1` olduğunu
da açıklıyor: o kalem ADF'yi bağımsız ürüne çeviren yoldur, Yaprak'ı A4
yapan yol değil.

---

## §9 · BU BELGENİN ÇÜRÜTÜCÜLERİ

Bir taksonomi çürütülemiyorsa taksonomi değildir. Bunlar çürütür:

1. **`TAX-SELF-PLACEMENT-1`** — §7'nin taze klon + canlı DB üzerinde koşulması.
   Herhangi bir hücre yanlış çıkarsa bu belge bir bug kaydı doğurur.
2. **`TAX-COMPETITOR-AUDIT-1`** — §5 tahmininin üç rakip üzerinde sınanması.
   Kütle A2'de değilse §5 düşer.
3. **A5 sınıfının üçüncü tarafça ölçülebilirliği** — ölçülemezse sınıf düşer
   (§2 çıkar çatışması beyanı).
4. **§6 ağırlıkları sahibin yargısıdır.** Sahip bir ağırlığı değiştirirse §7.6
   ve §8 yeniden hesaplanır.
5. **eval-canary bir şeyi reddederse** C6 3'e çıkar; reddedemezse C6'nın
   mimari 3'ü de sorgulanmalıdır — bir kapı davranışıyla tanımlanır, tasarımıyla
   değil.

---

## §10 · KAYNAK DEFTERİ

**Dış literatür** — `[P]` birincil okundu · `[S]` yalnız ikincil tanıklık.
Bir `[S]` satırı öncül değildir.

| Kaynak | Statü |
|---|---|
| Bent, B. (2025) *The Term 'Agent' Has Been Diluted Beyond Utility.* arXiv:2508.05338 | **[P]** |
| Sapkota, Roumeliotis, Karkee (2025) *AI Agents vs. Agentic AI.* Information Fusion 126:103599 | **[S]** |
| Anthropic (2024) *Building Effective Agents* | **[S]** — birincil URL çekilemedi |
| Wooldridge & Jennings (1995); Franklin & Graesser (1996); Russell & Norvig | **[S]** |
| Shavit ve ark. (2023); Chan ve ark. (2023 FAccT); Kapoor ve ark. (2024) | **[S]** |
| Kasirzadeh & Gabriel (2025) arXiv:2504.21848; ISO/SAE PAS 22736; NIST ALFUS | **[S]** |

**İç kaynaklar** — §7'nin her hücresi buradan okundu, hafızadan değil:

| Belge | Ne verdi |
|---|---|
| `cwf-vision-note-MODULARITY-AND-MULTI-AGENT-S88-v1` | Bileşen haritası · 10 aşama · dikiş sınıflandırması · "yetki bağlantıya bağlanır, beyana değil" |
| `A23-GAP-RECON-S103-v1` | Oda-oda anlama katmanı durumu · 0-dosya ölçümleri · karanlık valf |
| `cwf-open-items-register-v113 / v117 / v120` | #79 · #80 · patlama yarıçapı 95/678 · eval-canary SKIPPED |
| `PHASE-RBAC-GOVERNED-1-v1` | Clamp deseni · beş kanal izolasyonu · `user_audit` |
| `PHASE-VECTOR-CONSUMER-1-v1` | Adlandırılmış geri alma paragrafı · kapalı-güvenli varsayılan |
| `TENANT-CONSOLE-VISION-v1` | C4'ün neden 2 olduğu (alıcı yüzeyi vizyon) |
| `cwf-sota-full-table-S106-v2` · proje talimatları §9 | İki skorbord: iç 6/7 · kabul 0/16 |
| `cwf-implementation-order-S116-v29` | §8'in kuyruk bağları |

**Öteki taksonomi belgesi** (sahibin başka bir modele ürettirdiği) — §1.4'te
merdiven karşılaştırması için kaynak olarak adlandırıldı; metni kopyalanmadı.
Katkısı iki yerde korundu: tek-tablo iletişim formu ve "hibrit deterministik
politika + olasılıksal LLM" formülasyonu.

<!-- END · cwf-vision-note-AGENT-TAXONOMY-v1_2 -->
