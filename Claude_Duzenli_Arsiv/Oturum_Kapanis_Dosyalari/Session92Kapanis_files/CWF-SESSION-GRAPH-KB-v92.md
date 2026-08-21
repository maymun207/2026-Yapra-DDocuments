# CWF · SESSION GRAPH KB · v92 — S91

<!-- CWF-SESSION-GRAPH-KB-v92 · 2026-08-09. v91'i geçersiz kılar.
     Bu belge KARAR ZİNCİRİNİ taşır: ne oldu, neden oldu, neyi tetikledi. -->

## §1 · S91'İN TEK CÜMLESİ

Bir seramik fabrikasının sözlüğü platform tabanından çıktı, sistemin kendisi
hakkındaki yalanları düzeltildi — ve sahip, dış sınavlara mimari tamamlanmadan
girilmeyeceğine hükmetti.

## §2 · ZİNCİR (neden → ne → sonuç)

**① Boot, yarım bir kanıtla açıldı.** S90 `vocab_source` span attr'ını
okumamıştı. Architect epizod satırından okudu: tur `ee142f84` @ 18:44 →
`vocabSource='governed'`; **deploy öncesi 24 turun hepsi `null`** — pozitif
kontrol, S66-1. **Artık:** Langfuse ingest tarafı okunmadı → `LANGFUSE-ATTR-READ-1`.

**② Boot bir sapma da verdi.** Register v94 §0'ın *"kod tabanı 16 + operatör 2"*
parantezi bayattı; `PHASE-GATEWAY-RULE-FLOOR-FOLD-1` (`51eeb84`) operatör
kuralını katlamış, kod tabanı **18** olmuştu. Manşet doğruydu, kırılım
fold-öncesi dünyayı anlatıyordu. → v95'te düzeltildi.

**③ Recon, tasarım notunun görmediğini buldu.** Notun §3 envanteri `656ec292`'de
çıkarılmıştı, master iki merge ilerlemişti. Canlı ağaçta:
`FIRE_ROUTING_SYNONYMS` `toolCategories.ts:19`'da **ÖLÜ İMPORT** — F214 spread'i
literale çevirmiş, import kalmış, **test hâlâ sabiti pinliyor**, yani sabit
*canlı görünüyor*. Notun §3-F sınıflandırması bu görüntüye dayanmıştı.
**Ve asıl bulgu:** çitin (164–490) içindeki literaller çıkış grep'ine görünmez.
→ `ROUTING-FLOOR-BACKEND-1` doğdu.

**④ Architect kendi teşhisini iki kez daralttı.** Önce "üç kelime kalmış" dedi;
bloğun tamamını okuyunca **12 seramik kategorisi + ~100 araç adı** olduğunu
gördü ve *"fazın içine alalım"* tavsiyesini **geri çekti** — farklı organ, farklı
yasa (F185), farklı üretici. Sonra adı `…-TENANT-…` koydu; sahip *"ne tenantı?"*
diye sordu ve **haklıydı**: eksen backend, ve "tenant" bu repoda zaten
`check:tenant-zero` (müşteri kelimesi taraması) ve PARK'taki TENANT-CONSOLE
ailesinin adı. → `ROUTING-FLOOR-**BACKEND**-1`.

**⑤ Polarite yasasının dişi bulundu ve söküldü.** `metricVocab.ts`'in RULE 5
başlığı *"veriyle susturulabilen dedektör dedektör değildir"* diyordu; canlı
aleti `toolCategories.ts:936` F156 öğrenme koruması. **Korku gerçekti** — boş
dilim korumayı sessizce fail-OPEN yapar. **Hüküm:** `vocabSource !== 'governed'`
iken koruma **FAIL-CLOSED**. Yasanın GEREKÇESİ yorum olarak korundu, onu emekli
eden cümleyle: `vocabSource` (GATE-SILENCE-VISIBILITY-1) susmuş dedektörle temiz
dedektörün bayt-özdeşliğini bitirdi.

**⑥ İki şerit paralel koştu, DALGA-ÇAPA mekanik olarak temizdi.** AG-1
`api/**`+`shared/**` (4 haritalı sekme → sonradan **7** çıktı), AG-2 yalnız
`src/components/admin/**` (haritasız → mühür oynamaz). **Tek-skaler tuzağı
yapısal olarak ateşlenemedi**, çünkü sayıyı yalnız bir şerit basıyordu.

**⑦ Ve dört relay hatası bir tur kaybettirdi — dördü de Architect'in:**
(a) tasarım notu bloğunun hedef alanına **dosya adı** yazıldı, sahip onu şeride
verdi → S91-2 · (b) faz promptu şeridin **okuyamayacağı** iki notu BINDING
CARRIER ilan etti → S91-4 · (c) prompt **dal adı/push/rapor yolu/PR** demedi,
şeritler bitirdi ama origin'e hiçbir şey çıkmadı → S91-5 · (d) GO'da **kısa SHA**
verildi, `?head_sha=` boş dizi döndürdü → S91-6.

**⑧ AG-2 temiz getirdi, AG-1 yarım — ve ikisi de dürüst.** AG-2: 4 kart mahkûm
(taramanın **ikisini kaçırdığı** 03 ve 08 dahil), iki yönde kırmızı yanan kapsam
aleti, 4/4 mutasyon. AG-1 ilk turda **"STATUS: INCOMPLETE, NOT A MERGE
CANDIDATE"** yazdı, 217 tip hatasını sayı olarak bildirdi, mutasyon koşmadığı
için "sıfır" yazdı — **uydurmadı.**

**⑨ Sahip, oturumun ortasında yorgunluk ve karamsarlık bildirdi**, ve *"metodoloji
mi yanlış, yoksa bu gerçekten çok mu zor?"* diye sordu. Architect ölçtü: 45 gün,
1.011 commit, 163 faz, 94.6k üretim satırı, ~1:1 test. **Cevap: ikisi de değil.**
Metodoloji doğru, sorun **sıralama + bitiş tanımı + görünürlük**. Ledger
append-only olduğu için liste **başarının fonksiyonu olarak** uzuyor: burn-up var,
burn-down yok. → v95 §9'da burn-down kuruldu.

**⑩ Architect "ölçümü öne çek" dedi; sahip reddetti ve HAKLIYDI.** Gerekçe:
benchmark'lar tam da eksik bileşenleri (PathB · Graph-KB · anlama · mount)
ölçüyor; yokken koşmak sonucu bilinen bir sınavdır ve üretilen sayı çöp olur.
**Architect'in hatası: SOTA-1'in lafzını doğru okuyup yanlış yere uygulamak.**
→ **H2: SOTA kapısı = mimarinin tamamlanması.**
Ve Architect'in aradığı geri besleme döngüsünün cevabı dışarıda değil içerideydi:
**kanarya 10 merge'dir konuşamıyor** → `CANARY-POWER-1` pilot oldu.

**⑪ Sahip yeni bir mimari boşluk buldu — ve o boşluk bir giriş biletiymiş.**
"Testler belleğimizi kirletecek; öğrenmemin yedeğini alabilmeliyim, silebilmeliyim,
sürümleyip geri koyabilmeliyim." Ölçüldü: **öğrenilmiş katman ~1.017 satır,
versiyonsuz**; yönetilen katman 310 satır, **zaten versiyonlu**. Sonra sahibin
işaret ettiği **AgentBeats** okundu ve aynı şeyi **kural** olarak yazıyordu: her
ajan her değerlendirmeye **temiz, durumsuz** girmeli, uzun ömürlü durum tutan bir
ajanın **tam sıfırlama mekanizması** olmalı, kaynaklar **`task_id`** ile
isim-alanına konmalı. → `LEARNING-SNAPSHOT-1` (5 yetenek) **ŞART**.

**⑫ Ve AgentBeats adaptör problemini yeniden tanımladı.** Architect "CWF'i
OpenAI-uyumlu uç nokta yap" demişti — harness'ı model kılığına sokmak. AgentBeats
**A2A sunucusu** istiyor: harness-seviyesi arayüz. → `SOTA-AGENT-ADAPTER-1`
yeniden tanımlandı, evi **#19 `2.5 BENCH-A2A-1`**, ve `mcp-honestbench` bir
**yeşil ajan** olarak doğmalı (yayınlanmışlık C2 + tekrarlanabilirlik C3 bedava).

**⑬ Sahip kapanış yasasını koydu:** S91-3 — şeritler %100 bitmeden oturum
kapanmaz. Hüküm anında işledi: Architect kapanış artefaktlarına geçecekken
AG-1'in v2 devam promptunu kesti.

## §3 · S91'İN İKİ SEVKİYATI

| | STAGE-CARD-COVERAGE-1 `d32482f` | METRIC-REGISTRY-DATA-1 `39a0b90` |
|---|---|---|
| Ne yaptı | Sistemin kendisi hakkındaki 4 yalanı düzeltti + kapsam aleti | Tapu sözlüğünü koddan backend-başına governed satıra taşıdı |
| Mutasyon | 4/4 | **8/8** |
| Suite | 517/6308 → 518/6317 | → **518/6322** |
| Mühür | rev 222 korundu (haritasız alan) | **rev 223**, 7 sekme |
| Migration | 0 | **0** (kindsOnly seed deseni) |
| Kanıtın öz cümlesi | *"Tarama dördün ikisini kaçırdı"* | *"`tsc` 0 döndü, yönlendirici armes'ın üç kelimesiyle yargılıyordu"* |

## §4 · GELECEK OTURUMLARIN BİLMESİ GEREKENLER

- **Kanarya yeşil OLABİLİR ve yine de hiçbir şey söylemez.** İş sonucu değil,
  gövde okunur. On kez oldu.
- **Planlayıcı üretimde AÇIK ama SESSİZ** — `planner.enabled`=1,
  `router.frameEnabled`=0. "Açık mı" ile "konuştu mu" iki ayrı ölçüm.
- **Şeritler proje dosyalarını göremez.** Prompt kendi kendine yetmeli.
- **`?head_sha=` kısa SHA ile boş döner**, ve çakışmalı PR de sıfır koşu verir.
- **Üretilmiş kod bile tek-backend varsayımı taşıyabilir** — S91'in en genel
  dersi: yalnız elle yazılmış sabitler değil, **aynalar da** yeniden yargılanır.
- **`git merge -F -` stdin okumaz.**
- **Architect'in TIMER'ı YOKTUR.** Bekleme sözleşmelerinde EXPIRY, sahibin bir
  sonraki mesajıdır — saat değil.

<!-- END · CWF-SESSION-GRAPH-KB-v92 -->
