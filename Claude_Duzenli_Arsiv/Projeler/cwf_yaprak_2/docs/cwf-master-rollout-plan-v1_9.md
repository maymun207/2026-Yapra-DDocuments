# CWF — Master Rollout Planı · v1_9

*(cwf-master-rollout-plan-v1_8 · 2026-08-04 · S82 · Sahip-ratife yürüyüş haritası — tek takip belgesi budur. **v1_7_1'i amend eder** (S37-1). **v1_9: BLOK 2E doğdu — `KENDİNİ ANLATAN BACKEND`.** Sahip hükmü S82: *"Kocaman araba yapmışız, gitmişiz bir pistonun buji kablosunu çıkarmışız."* v1_8: `2.2a` doğdu ve harness'ın üç tasarım sorusu kapandı. Kural: buradan kalem SİLİNMEZ; biten işe ✅ ve kanıtı yazılır; yeni iş adıyla EKLENİR. **v1_7: `PB-B` raftan indi; `PB-A`+`PB-B`+altyapı tek program `PB-FULL-1` oldu, üç kanıtlı aşamayla (sahip onayı S82). Kabul ölçütü artık `cwf-sota-definition-v1_5` (R10/OPA).** v1_6 sahip hükmüyle ÜÇ KARARI KAPATTI: mount önce · Graph KB alarmını **sahip çaldı**, ölçüm beklemez · OPA **tek-tenant'ta da içeride**. v1_5'in mimari katmanı raftan indirme hamlesi aynen korunur.)*

> **⚠ ARCHITECT'E BAĞLAYICI NOT (sahip, S82):** *"Buralar çok kritik noktalar — çıkarım
> yapma, bana sor."* v1_5'te Architect iki kez çıkarım yaptı ve ikisi de sahip kararıydı:
> multi-tenant park edilince OPA'yı rafa geri gönderdi, ve Graph KB'yi bir ölçümün
> sonucuna bağladı. **Bir kalemin kapsamı, tetiği veya sırası hakkındaki her boşluk
> ADIYLA SORULUR; doldurulmaz.**

**Kabul ölçütü:** `cwf-sota-definition-v1_5` (BINDING). Her satır oradaki bir ölçüte bağlıdır; bağlanmayan satır ya adlı önkoşuldur ya v1 dışıdır (R6).
**Bütçe rakamı bu belgede YAZMAZ** — tek kaynak sözleşmenin R4'üdür. Bütçe değişince yalnızca bir dosya değişir.

---

## BLOK 1 · ÖLÇÜM PANOSU (MEASURE-1) — ✅ **KAPANDI 2026-08-03**

Kanıt zemini (kapanış anı, TARİHÎ — değiştirilmez): `origin/master` = `d599b8b2b25315dbb02bfa02efc61fbbe1e90d24` · docVersion **rev 185** · 67 migration · 436 test dosyası.

**Bugünkü zemin (v1_4, 2026-08-04):** `origin/master` = `b0e8c9e22f47450c80cdf50c5371f39ebdf27afe` · docVersion **rev 190** · 67 migration · **448** test dosyası · 13 ADR.

| # | İş | Durum | Kanıt |
|---|---|---|---|
| 1.0 | PHASE-M1P0-COUNT-HONESTY-1 | ✅ | merged; `countGuard` |
| 1.1 | Ölçüm tasarım notu | ✅ | `cwf-measure-1-design-note-v1` |
| 1.2 | PHASE-M1F1-FEEDBACK-PRODUCER-1 | ✅ | merged; `turn_feedback` |
| 1.2b | PHASE-INSPECT-VERDICT-1 (+FIX-1) | ✅ | merged |
| 1.3a | PHASE-M1F2A-HONEST-READ-1 | ✅ | `ce9c96de`; `readHonesty`; MEASURE-READ-HONESTY-1 |
| 1.3b | PHASE-M1F2B-DATA-LAYER-1 | ✅ | `310e4c0` |
| 1.4 | PHASE-M1F3-HEALTH-SURFACE-1 | ✅ | `d599b8b2` — 17. tab; owner-CRUD kapısı RLS satır/sütun ayrımını yakaladı, zayıflatılmadı |

**Blok 1'in bıraktığı ders (kayda geçti):** *RLS SATIRLARI kapatır, SÜTUNLARI değil.* Owner-yazılabilir tabloya yeni sütun = **sütun grant'ı**, policy düzenlemesi değil.

---

## BLOK 2 · ÖLÇÜLEBİLİRLİK — *sırayı açan blok*

**Neden başta:** sözleşme §6'daki üç kalem **16 ölçütün 15'ini** bloke ediyor. Projede başka hiçbir iş bu ölçekte bir şeyin önünü açmıyor. Ölçemeden inşa etmek, Blok 5'in *teslim edilip asla puanlanamaması* demek.

| # | İş | Hangi SOTA ölçütü | Şerit |
|---|---|---|---|
| **2.1** | ✅ **`MA-RERUN-1`** — M-A lensini güncel registry'ye karşı yeniden koş | §10 iç ölçüt | **BİTTİ** S81, `d3d246c1`. Verdict **VOID** ve dürüstçe raporlandı: korpus (6626) enstrümanın tavanını (5000) aşmıştı. Üç bulgu voidden sağ çıktı; biri BUG-008 oldu. |
| **2.1a** | ✅ **`LENS-CEILING-1`** *(v1_4'te EKLENDİ — planda yoktu)* — ölçüm tavanı + BUG-008, tek parça | 2.1b'nin **adlı önkoşulu** | **BİTTİ** S82, `4469a370`. Tavan **emekli edildi**, yükseltilmedi: `truncated` artık kendi literalimiz hakkında değil **korpus** hakkında bir cümle. BUG-008 kapandı. Testler 4965 → 5015. |
| **2.1b** | ✅ **`MA-RERUN-2`** *(v1_4'te EKLENDİ)* — 7227 frame'lik koşunun analizi | **§10 iç ölçüt — ÖLÇÜLDÜ** | **BİTTİ** S82, `b0e8c9e2`. Sözleşmenin **ilk** kriteri kanıtla hareket etti: blok oranı 84.61 % → **55.41 %** (n=2534, like-for-like) · **38.63 %** (n=7227). Muhafız 4/4 tuttu. `cwf-sota-definition-v1_4` bunu §10'a bastı. |
| **2.2** | **`BENCH-BACKEND-MOUNT-1`** — bir benchmark'ın MCP sunucularını sıradan backend olarak mount et | **MCP-Bench · MCP-Universe** (zero-code mount) | AG · **2.3b'den hemen sonra (sahip hükmü v1_6).** En küçük iş, en yüksek bilgi; kod gerekirse `backend identity is DATA` o anda çürür. **Mount'u Operator kapısından yapar** — affordance 2.2a'dadır, çünkü aynı fazda olsaydı "sıfır kod değişikliği" iddiası bulanırdı. |
| **2.2a** | **`BACKEND-REGISTER-AFFORDANCE-1`** *(v1_8'de EKLENDİ, sahip hükmü S82)* — backend kaydı için kapılı admin affordance'ı | **Tier B'nin ADLANDIRILMIŞ ÖNKOŞULU** | AG (+Operator) · **Ölçülmüş gerekçe:** `MCP-Bench` **28 MCP sunucusu / 250 araç**, `MCP-Universe` **11 sunucu** — **39 backend'i Operator insert'iyle bağlamak bir kapı değil, duvardır.** Bugün `backends` tablosuna uygulamada hiçbir insert yolu yok (S82'de canlı doğrulandı): SELECT açık, yazma yalnız service-role. Bu bir **PLATINUM boşluğudur** ve Blok 3 ona çarpar. |
| **2.3** | ✅ **`BACKEND-LIFECYCLE-AFFORDANCE-1`** *(eski 2.2, terfi)* | 2.2'nin **adlı önkoşulu** | **BİTTİ** S81, `b960a1c9`. Beş bucket kaleminin kod yarısı + **ADR-013 `DECISION-PARITY-1`**, sıfır migration. |
| **2.3a** | **`HONESTBENCH-HARNESS-0`** *(v1_4'te EKLENDİ — sahip ratifiyesi S82)* — kadranlı sahte MCP sunucusu; tasarım `cwf-honestbench-harness-design-v1_1` | **Tier E** ilk taksiti · **2.2'nin provası** | AG · sahibin kendi tasarımı. M3 kadranı BUG-007'yi, iki kadran BUG-006'nın iki durumunu kanıtlanabilir kılar. **ÜÇ TASARIM SORUSU KAPANDI (sahip onayı, v1_8):** ① **AYRI REPO** — kazara deploy yapısal olarak imkânsız, yayınlanabilir (C2+C3), ve `BENCH-A2A-1`'in isteyeceği GHCR imajı burada başlar · ② **hangi modda kalacağımız TAHMİN EDİLMEZ, ÖN-KAYDEDİLİR** — dört mod için beklenti koşudan önce yazılır ve tahminin kendisi de puanlanır; dördü de geçilirse bu başarı değil **aletin yetersizliğidir** (§5) · ③ **mount Operator kapısından**, affordance 2.2a'da. |
| **2.3b** | **`FAULT-SWITCH-0`** *(v1_4'te EKLENDİ)* — iç okuma arızası anahtarı, tek boğazda (`getServiceClient`) | 2.3a'nın kardeşi | AG · **yalan dışarıda, arıza içeride.** Kural-tabanlı (asla rastgele), yalnız okuma, asla uydurma, ateşlediğinde yüksek sesle. BUG-009 ve BUG-006'nın üçüncü durumu bunsuz kanıtlanamaz. |
| **2.4** | **`BENCH-RESET-1`** — assessment başına doğrulanmış taze durum | **C3** — tüm tier'ların önkoşulu | AG + Operator |
| **2.5** | **`BENCH-A2A-1`** — CWF'yi A2A purple agent olarak aç (agent card · entrypoint · GHCR imajı) | **C2+C3** — 15 ölçütün ortak kapısı | AG · gerçek bir faz, yama değil |
| **2.6** | **`BENCH-SMOKE-1`** — duman koşusu **VE maliyet ölçüm aleti** | ilk dış sayı **+ §10'un "tur başına maliyet" satırı** | AG + sahip onayı · bütçe: sözleşme R4. **Çıktısı zorunlu:** metrelenmiş görev-başı maliyet, token in/out, benchmark ve model başına tam-tur ekstrapolasyonu. Bu aktüeller Architect'in tahminini **değiştirir** (D-3). |
| **2.7** | **`FRAME-SHADOW-EVIDENCE-1`** — A/B lensine üçüncü kol: kayıtlı frame'lerden `deriveCategories` aday seti turun kullandığı araçlara ulaşıyor muydu? | **τ²-bench · Gaia2**'nin erken yanlışlaması | AG · saf kod, **LLM maliyeti sıfır**, üretimde değişiklik sıfır |
| **2.8** | **`DISCOVERY-EXTEND-2`** *(koşul ÇÖZÜLDÜ — 2.1b ölçtü)* | **Gaia2 · τ²-bench** (kapı davranışı) | AG + Operator · ADR-009 toprağı, alias satırıyla ASLA kapatılmaz. **⚠ KAPSAM v1_4'te DEĞİŞTİ, ölçümle:** varsayım `ORDER`+`EMPLOYEE` hâkimiyeti ve *"beyan edilmiş katmanı yok"* mekanizmasıydı. Ölçüm (n=7227): ikisi büyük (918 blok, %32.9) ama **hâkim değil**. En büyük kova **`LINE` — 787 blok, 785'i entity-unresolved — ve o katman beyan edilmiş VE dolu.** Yani eksik-katman işi değil, **mevcut katmanın içinde çözümleme** işi: farklı hastalık, farklı ilaç. |
| **2.9** | **`CORPUS-LINE-FILL-1`** *(2.8'e biner)* | 2.8'in ölçüm-geçerliliği bileşeni | AG |

### ✅ HÜKÜM VERİLDİ (v1_6, sahip S82): **`mount` önce**

2.3b'den sonra **`BENCH-BACKEND-MOUNT-1` (2.2)** gelir. Gerekçe kayda geçti: 2.3a'nın
testbed sunucusu zaten sıradan bir backend olarak **mount edilecektir**, yani mount
işinin provası onun içinde yapılmış olur — sıcak bilgi hemen kullanılır. Ayrıca 2.2, **15
ölçütü bloklayan üç kapıdan birincisidir** ve üçüne de henüz dokunulmamıştı.
**`BUG-005` (2.10) onun arkasına geçer**, bağımsızdır ve hiçbir işle kesişmez.

### 🐞 KUSUR KUYRUĞU — *v1_4'te EKLENDİ, yürüyüş sırasında yeri olmayan tek şeydi*

Kaynak **`REGISTER-BUG-BUCKET`** (referansla taşınır, kopyalanmaz). Bugün **7 açık**.
Faz gerektiren üçü buraya adıyla giriyor; kalanların çaresi 2.3a/2.3b'nin kanıt bloğunda.

| # | İş | Hangi bug | Not |
|---|---|---|---|
| **2.10** | **`BUG-005-FIX`** — müşteri verisini log deposundan erişim kontrollü yere **taşı** | BUG-005 | Silme değil taşıma; AST census 7-yerlik grep tabanını aşmak zorunda. Hedefi ADR-013'ün yasası tanımlar. |
| **2.11** | **`HONEST-READ-2`** — düşmüş backend kullanıcıya "yeteneğim yok" diye ulaşmasın | BUG-002 | S81'de düzeltilmiş kod üzerinde **canlı gösterildi**. |
| **2.12** | **`PROBE-PARITY-1`** *(yeni ad)* — Probe düğmesi ve on-connect hook'unun kayıt paritesi | BUG-010 · BUG-011 | ADR-013 ailesi; ikisi de küçük, ikisi de evsizdi. |

---

## BLOK 2B · MÜŞTERİ GİRDİSİ YETENEĞİ — *Blok 2 ile paralel, farklı şerit*

**Neden ayrı blok:** ikisi de artık ölçüte bağlı (R7, R9) ve ikisi de Blok 3'ün Tier F koşusundan **önce** bitmek zorunda. Blok 2 harness'tır; bu blok ölçülecek yeteneğin kendisidir.

> **⚠ v1_4 DÜZELTMESİ — "paralel" kelimesi yanlış.** Bu blok v1_3'te *"Blok 2 ile
> paralel"* diye tarif edildi. **Paralel değil.** Tek bir Author şeridi (AG) var ve her
> iş oradan tek sıra hâlinde geçiyor; "paralel blok" pratikte "sıradaki blok" demek.
> Bu, planın bugüne kadar söylemediği yapısal gerçek ve **kuyruk süresini belirleyen
> asıl değişken sıralama değil, şerit sayısıdır.** `WEB-VALVE-1`'in hiçbir teknik
> bağımlılığı yoktur — beklediği tek şey şerit kapasitesidir.

| # | İş | Hangi SOTA ölçütü | Not |
|---|---|---|---|
| **2B.1** | **`RAG-FINISH-1`** — duraklatılmış şeridi bitir: `RAG-SVC-INIT-RACE-1` · `KB-TEST-RESIDUE-1` + **kullanıcı-gözü bitiş tanımı** | **F1 · BrowseComp-Plus** (citation accuracy ≥ üst çeyrek) | ⚠ **S74-1 ihlali kaydı:** şerit aylardır bitiş tanımı ve ölçümü olmadan paralel koştu. Ölçüt eksikliği semptomdu. Bitiş tanımı bu fazın **ilk** çıktısıdır, son çıktısı değil. |
| **2B.2** | **`WEB-VALVE-1`** — bağlam-kapılı web araştırma valfi *(eski 2.1)* | **F2 · DeepScholar-Bench** (verifiability ≥ üst çeyrek) | Muaf tutulmadı — ölçütü eklendi (R7). Doğrulanamayan çıktı üreten valf, valfsizlikten kötüdür. |

---

## BLOK 2D · MİMARİ KATMAN — *raftan indirildi, sahip hükmü S82*

**Sahip hükmü (S82):** *"Bunların olması gerektiğine inanıyorum, bu olmazsa olmaz.
Raftan kaldır ve plana koy. Seninle SOTA mimarisi için olması gereken yapının üzerinden
çok defa geçtik — hiçbiri boş değil, çatlağa düşmesin."*

**Neden bu blok var:** bu kalemlerin uyanma şartları bugüne kadar **iş tahtasında**,
yürüyüş sırası ise **bu belgede** yaşadı. İki ayrı belge. Bir işin tetiği, sırasını
taşıyan belgede yoksa o iş uyanmaz — S82'de tam olarak bu olduğu görüldü. **Alarm
metinleri buraya AYNEN taşındı.**

**Sıralama ilkesi, ve tersine çevrilmesi bu bloğun asıl hamlesi:** üç raf kaleminin de
hakemi **PB-A**'dır (Qdrant'ın tetiği *"PB-A'nın Postgres FTS'i F1'de yetmezse"*; Graph
KB'nin alarmı ms-bütçe). PB-A ise 5.6'da, Blok 5'in içinde, harness'ın arkasındaydı —
yani **üç kararın hakemi en sonda bekliyordu.** Bu blok önce hakemi öne çeker.

| # | İş | Hangi SOTA ölçütü | Uyanma şartı / not |
|---|---|---|---|
| **2D.1** | **`PB-FULL-1` AŞAMA 1 · `PB-A` — TABAN** — Postgres FTS (`tsvector`/`pg_trgm`) + **RRF**; `retrieval.topK`/`scoreThreshold` sözlüğü korunur *(5.6'dan öne çekildi)*. **Yanında donmuş, önceden kayıtlı soru seti + Recall@k ve p95.** | **F1 · BrowseComp-Plus** | **Şartsız — blok bununla açılır.** Motor hükmü: `cwf-master-plan-v5_3` §2.2 (sahip-ratife 2026-07-28) — motor **sözleşme arayüzünün arkasında**, takas tetiği önceden adlandırılmış. **Taban, PB-B var olmadan ÖNCE kaydedilir**; yoksa PB-B'nin sayısı hiçbir şey ifade etmez. |
| **2D.2** | **`LINE-RESOLUTION-DIAGNOSIS-1`** — `LINE`'ın 785 entity-unresolved bloğunun sebebi **nedir**? Özellikle: **multi-parent containment mi?** | **2.8'in adlı önkoşulu** *(v1_6: artık 2D.3'ün kapısı DEĞİL — sahip alarmı kendi çaldı; bu okuma 2.8'in kapsamı için hâlâ gereklidir)* | Ölçümden doğdu: 2.1b `LINE` 787 blok / 785 unresolved ölçtü — **beyan edilmiş ve DOLU** bir katmana karşı; ayrıca üretim log'u `layer=line total=779 active=779 **emptyContainers=12**`. JOIN LAW'ın Glazur3 çakışması aynı aile. **Bu okuma Graph KB'nin birinci alarmını ateşleyebilir.** |
| **2D.3** | **`GRAPH-KB-1`** — kavram merkezi, 4-sorgu arayüzü `ancestors · children · roots · in_scope`; motor bugün **Postgres recursive CTE** | **Gaia2 · τ²-bench** (kapı davranışı, entity çözümleme yoluyla) | **🔔 ALARMI SAHİP ÇALDI (S82) — KOŞULSUZ.** *"Hayır, ben çaldım o alarmı; sistem içinde olacak."* İş tahtası §F'nin alarm metni (*multi-parent containment VEYA ms-bütçe*) **kayıt olarak** durur ama artık bir KAPI değildir. Kavram merkezi, motor değil; topoloji zaten DATA (ADR-009). Neo4j/Apache AGE arayüzün ARKASINDA bir takas kararıdır, ⑤–⑥ kodu değişmez. |
| **2D.4a** | **`PB-FULL-1` AŞAMA 2 · `PB-B` — KALİTE sorusu** — **bge-m3** (deterministik TR encoder) + vektör indeks **`pgvector` üzerinde**, AYNI arayüzün arkasında; RRF sparse+dense'i birleştirir | **F1 · BrowseComp-Plus** | **Şartsız.** *(v1_7: `PB-B` raftan indi — sahip hükmü (a), S82.)* **Aynı donmuş set, aynı k, aynı p95 yöntemi. Çıktı bir skor değil, güven aralıklı bir DELTA.** `pgvector` seçimi kasıtlı: dense getirmenin işe yarayıp yaramadığı **hiçbir yeni altyapı kurmadan** öğrenilir, ve böylece **kalite sorusu ile altyapı sorusu karışmaz.** |
| **2D.4b** | **`PB-FULL-1` AŞAMA 3 · `RETRIEVAL-INFRA-1` — PERFORMANS sorusu** — indeksi Qdrant'a taşı (dense+sparse tek koleksiyon, sunucu-yanı RRF, tenant-per-collection) | **F1** · ve §E'nin (a)/(b) tetiklerinin cevabı | **Arayüzün arkasında bir MOTOR TAKASI.** Kanıtı iki bacak: **(i)** getirme sonuçları Aşama 2 ile **AYNI** (ya da ilan edilmiş tolerans içinde) — *sonuç değişiyorsa takas cevabı değiştirmiştir ve bu bir KUSURDUR, özellik değil*; **(ii)** p95, kurulumu haklı çıkaran miktarda düzelmiş. §E tetikleri: (a) ms-bütçe · (b) p95 — **ikisini de Aşama 1–2 ölçer** · (c) ~~multi-tenant~~ **KAPANDI (park, S82)**. **❓ KARAR NOKTASI (Architect doldurmuyor, soruyor):** Aşama 2'nin deltası pozitif çıkmazsa bu aşamanın öncülü kalmaz — o an sahip hükmeder. |
| **2D.5** | **`OPA-POLICY-1`** — politika yönetimi **OPA üzerinden**, fail-closed Rego ← `tool_annotation` | **⚠ AÇIK — sahibe SORU (aşağıda)** | **🔔 SAHİP HÜKMÜ (S82) — İÇERİDE, KOŞULSUZ.** *"Single-tenant mimaride de olsa policy'yi OPA üzerinden yönetilmesini istiyorum."* İş tahtası §E'nin *"yalnız EAIP multi-tenant'ta"* kaydı **bu hükümle geçersizdir**. Bugünkü `gatewayPolicy`+F80 aynı işi görüyor; dolayısıyla bu bir yetenek eklemesi değil, bir **yönetim yüzeyi** değişimidir ve eval-gate'in değiştirilemezliği (engine + stage sırası + interpreter) korunmak zorundadır. |

### ❓ AÇIK SORU — 2D.5'in ölçütü (Architect SORUYOR, doldurmuyor)

`OPA-POLICY-1` sahip hükmüyle içeridedir. Ama §1 **simetri maddesi** hâlâ bağlayıcıdır:
bir kalem ya bir ölçütü ilerletir, ya **adlandırılmış önkoşuldur**, ya v1 dışıdır —
**muafiyet yoktur.** Bugün OPA §3'teki hiçbir ölçüte bağlanmıyor. İki meşru yol var ve
**seçim sahibindir**; Architect birini seçmez:

- **(i) Ölçüt EKLE** — R7/R9'un kullandığı yol. Örneğin **MCP-SafetyBench / MT-AgentRisk**
  (Tier D) altında *"politika ihlallerinin fail-closed oranı"* gibi bir alt ölçüt. Kalem
  v1'de kalır **ve ölçülmek zorunda olur**.
- **(ii) ADLANDIRILMIŞ ÖNKOŞUL** — örneğin `EAIP-TENANT` ailesinin ya da bir sonraki
  müşterinin önkoşulu ilan edilir. Ölçülmez ama v1'de kalır ve gerekçesi yazılıdır.

**LangGraph** raftadır ve bu blokta DEĞİLDİR: Blueprint v2_1 Shape B **DEFERRED**, TS
çekirdek MCP servisi kalır, governance dokunulmaz, ADR-012 RR-2 kapıyı **yapısal** olarak
açık tutar. Kayıttadır, unutulmamıştır, sahip hükmü olmadan açılmaz.

---

## BLOK 2E · KENDİNİ ANLATAN BACKEND — *sunucu söylüyorsa, biz yazmayalım*

**BİTİŞ TANIMI (sahip, S82 — kullanıcı gözü, bu bloğun tek kabul ölçütü):**

> **"Admin gelir, backend'i ekler, credential'ını girer, sistem onu kullanır.
> Elle hiçbir müdahale yok."**

`BACKEND-IDENTITY-IS-DATA-1` (`d4f65600`) bu cümlenin **kapı** yarısını açtı.
Bu blok **oda** yarısıdır: bağlanan backend'in gerçekten *kullanılması*.

**Teşhis, sahibin kendi benzetmesiyle:** motor sekiz silindirli, ama her yeni
silindire yakıt hattını **elle** döşüyoruz. Ve manuel adım kullanıcıdan gizli —
RAG'ın yönlendirme rayı `scripts/jobs/rag-tool-categories-v1.json` ile, bir fazın
içinde döşendi. Sahip hiçbir şey yapmadı; **birileri o dosyayı yazdı.** Backend
#4 için biri yine yazacaktı.

**Ve bloğun tek cümlelik ilkesi — sahibin ARP benzetmesi:** ağda kimse merkezi
bir tablo tutmaz; *"10.0.0.5 kimde?"* diye sorulur, **sahibi cevaplar.** MCP'de o
yayın **zaten var**: `tools/list` adı/açıklamayı/şemayı, `initialize` ise
`instructions` ile sunucu-geneli kılavuzu gönderiyor. **İkisini de alıyoruz;
birincisini aynaya yazıp yok sayıyoruz, ikincisini hiç okumuyoruz.**

| # | İş | Hangi SOTA ölçütü | Not |
|---|---|---|---|
| **2E.1** | **`ROUTE-OPEN-1`** — yayınlanmış kategori kapsamı **olmayan** backend'in araçları alaka filtresinden **muaf** | **MCP-Bench · MCP-Universe** — zero-code mount'un *işlevsel* yarısı | **ACİL, sahip hükmü.** Muafiyet gateway için zaten yazılmış (`stageTools.ts:262-271`), sebebine genelleştirilmemiş. **Yüklem BACKEND başına olmalı, ARAÇ başına ASLA** — araç-başı, ADR-011'in 44 yazma aracını her tura sokar ve yasayı sessizce iptal eder. Bugün hiçbir backend kapsamsız → **davranış byte-byte aynı**, testle kanıtlanır |
| **2E.2** | **`ROUTE-DERIVE-1`** — ray aynadan **kendi kendine** doğar | aynı | `stage-drafts.ts` zaten aynayı okuyup kategori taslağı öneriyor, ama **`armes` kapsamına kilitli** ve **asla yayınlamıyor**. İkisi de kalkar; yayın **yokluk-esaslı**, kapıdan, `selfSeedReconciler` emsaliyle — insanın dokunduğu satır asla ezilmez |
| **2E.3** | **`PACK-FROM-PROTOCOL-1`** *(eski adı `BACKEND-PACK-OPTIONAL-1`, sahip onayıyla düzeltildi)* — MCP'nin `initialize` cevabındaki **`instructions`** alanı okunur ve pack'in yerine geçer | aynı | `buildBackendPack` bugün bir `switch`, tanımadığına **`default: return ''`**. Ve `instructions` kelimesi `mcpClient` / `catalogSync` / `mcp-probe`'un **hiçbirinde geçmiyor**. `pack.ts` **kod tabanı** olarak kalır; sunucu kendi kılavuzunu veriyorsa **o kazanır** — DB-first/code-floor'un kaynağı DB değil **backend'in kendisi** |
| **2E.4** | **`ROUTE-ASK-1`** — router, elle yazılmış anahtar kelime yerine **aynadaki açıklamalarla** eşleştirir | **τ²-bench · Gaia2** | Asıl ARP hamlesi: *"defterime bakayım"* değil *"kimde var?"*. Makine var (`routeSemantica`, `router.enabled`) ve **karanlıkta**. **2.7 `FRAME-SHADOW-EVIDENCE-1`'in ölçümünden sonra** — ölçmeden çevrilmez |

**Sıra kilidi:** `2E.1`, `2.3a`'nın G6 gösteriminden **önce** gelir. Aksi hâlde
sahip, sonucunu zaten bildiğimiz yarım bir cevabı kanıtlamış olur.

**Bu blok bir temizlik işi değil, Tier B'nin önkoşuludur:** `MCP-Bench` 28 sunucu
/ 250 araç. Elle ray döşeyerek oraya gidilmez — ama *"kapsamı yoksa hepsini ver"*
de tek başına yetmez, 250 aracı bağlama sığmaz. **2E.2 ve 2E.3 opsiyonel
iyileştirme değil, ölçütün şartıdır.**

---

## BLOK 3 · İLK ÖLÇÜM TURU

Blok 2 **ve** 2B kapanmadan başlayamaz. Bütçe: sözleşme **R4**. **Bütçe bir ölçütü karşılamıyorsa o ölçüt ÖLÇÜLMEDİ kalır — kısmi koşu asla "ölçüldü" işaretlenmez** (§8, §1 bütçe maddesi).

| # | İş | Ölçüt |
|---|---|---|
| 3.1 | Tier A + **B-FRONTIER eşit maliyetle** | τ²-bench · Gaia2 |
| 3.2 | Tier B | MCP-Bench · MCP-Universe |
| 3.3 | Tier C | LongMemEval (abstention) · Mem2ActBench · ToolComp · API-Bank |
| 3.4 | Tier D | MCP-SafetyBench · MT-AgentRisk · Agent-SafetyBench |
| 3.5 | Tier F | BrowseComp-Plus · DeepScholar-Bench |
| 3.6 | §10 durum tablosunun doldurulması (değer · koşucu · tarih · SHA) | C1 |

**Sıralama kuralı:** 2.6'nın metrelenmiş maliyeti geldikten sonra tier'lar **ölçüt-başı maliyete göre ucuzdan pahalıya** koşulur — böylece sabit bir bütçe en çok sayıda ölçütü kapatır. Bu bir kapsam kısması değil, aynı parayla daha çok ölçüm; hiçbir ölçüt küçültülmez, yalnızca sırası maliyetle belirlenir.

---

## BLOK 4 · `mcp-honestbench` — KATKI

| # | İş | Ölçüt |
|---|---|---|
| 4.1 | Green agent + dört düşman modu (M1 sessiz-sıfır · M2 sinyalsiz kırpma · M3 beyan sapması · M4 makul uydurma) | Tier E |
| 4.2 | Deterministik skorlama — **CWF sonuçları bilinmeden yazılır** | Tier E · ADR-001 |
| 4.3 | **CWF'nin bugün KALDIĞI en az bir mod** zorunlu | Tier E — pohpohlama tuzağı savunması |
| 4.4 | Yayın + AgentBeats onboarding | C2 |

---

## BLOK 5 · ANLAMA KATMANI (A23 programı)

| # | İş | Not |
|---|---|---|
| **5.0** | **`MEASURE-2`** — dört metriğin taban çizgisi *(A23'ün İÇİNDEN çıkarıldı, giriş kapısı oldu)* | Bugün ham maddesi olan ikisi: Recall@k (`routerAbLens`) ve kapı davranışı (M-A lensi). slot-F1 ve bütçe altında AUROC etiketleme maliyeti ister — **adlandırıldı, şimdi ödenmedi**. Giriş şartı: bedava iki metriğin taban çizgisi var. |
| 5.1 | ⑤/⑥ ayrımı — teşhis / karar / cevap | ⑥ ham metin almaz (D-N3) |
| 5.2 | `turn_context` — güven taşıyan tur-içi tahta | C1 yasası: `messages`'a yazmaz |
| 5.3 | Tur-arası taşıyıcı (A-10) | |
| 5.4 | τ/β iki eşikli entity linking — NIL · LINK · ASK | LongMemEval abstention'ın kardeşi |
| 5.5 | `frameRouting` yeniden değerlendirme | **Yalnızca 2.7 sonrası** ve MEASURE-2 taban çizgisiyle |
| 5.6 | ~~Hibrit getirme PB-A~~ → **2D.1'e TAŞINDI** (v1_5). Satır silinmedi: A23 içindeki yeri kayıttadır, işin kendisi Blok 2D'nin başına çekilmiştir çünkü üç raf kaleminin hakemi odur. | F1 ile kesişir |
| 5.7 | F177 çatalı · F199 · F198 | programa bağlı |

### ⚠ SOTA-1 KENDİNE UYGULAMA — A23'ün geri sıralanması

- **(a) Hangi ölçüt kanıtsız kalıyor:** τ²-bench · Gaia2 · ToolComp — yetenek katmanı.
- **(b) Ne zaman kanıtlanır hâle gelir:** **ölçülebilir** Blok 2 kapanışında (harness); **hedefe ulaşmışlığı** A23 bitiminde. Erken yanlışlama 2.7'de, Blok 2 içinde.
- **(c) Hangi ölçüm çözer:** Blok 3.1'in τ²-bench + Gaia2 taban çizgisi ve A23 sonrası tekrarı; ToolComp süreç skoru; 2.7'nin frame-gölge kanıtı.

**Gerekçe:** A23'ü harness'tan önce inşa etmek onu *teslim edilebilir ama puanlanamaz* yapar — sözleşmenin engellemek için var olduğu tam hata.

---

## BLOK 6 · v1.1 KUYRUĞU

| # | İş | Ölçüt | Not |
|---|---|---|---|
| 6.1 | **`RULE26-HARDEN-1`** *(R8)* | — | Sahip: *"boş beleş iş yapmanın kimseye faydası yok; işe yarayınca çalışmalı."* CI kapısı ayakta. |
| 6.2 | Küçük temizlik paketi | — | |
| 6.3 | Model karşılaştırma M-C | B-FRONTIER'in iç kardeşi | SYNTH-TRAFFIC-2/F204'e bağlı |
| 6.4 | Getirme iyileştirme E-1 + cache fix + golden-soru altyapı paketi | 5.0 ile **birleştirilecek**, çift yapılmayacak | |
| 6.5 | Sırasız blok | — | |

---

## 💤 PARK — uyuyor, silinmedi; tetiği çalınca uyanır

**TENANT-CONSOLE / EAIP-TENANT ailesi — sahip hükmüyle PARK TEYİT EDİLDİ (S82).** Tetik:
müşteri #2 sinyali veya online satış kararı. **Sonucu:** 2D.4'ün (c) tetiği kapandı; 2D.5
OPA ise sahip hükmüyle bundan BAĞIMSIZ olarak içeridedir (tek-tenant'ta da).

Ayrıca parkta:
**LangGraph** (Shape B DEFERRED, ADR-012 RR-2) · **M-C** model karşılaştırma (6.3, `SYNTH-TRAFFIC-2`/F204'e bağlı).

**`PB-B` RAFTAN İNDİ — v1_7, sahip hükmü (a), S82.** Silinmedi, TAŞINDI: **`PB-B` → 2D.4a**.
`M-C`'ye bağlılığı kalktı; `M-C` kendi başına 6.3'te durmaya devam ediyor.

**RAFTAN İNDİRİLDİLER — v1_5, sahip hükmü S82.** Silinmediler, TAŞINDILAR:
**Qdrant · bge-m3 · OPA → 2D.4 / 2D.5** · **Graph KB → 2D.3** · **PB-A → 2D.1**.
Uyanma şartları artık bu belgede, kendi satırlarında yaşıyor. *"Ölçümle uyanır, sezgiyle
değil"* kuralı KALDIRILMADI — korundu ve her kaleme kendi tetiğiyle yazıldı; değişen tek
şey, tetiği okuyan ölçümün (PB-A) artık en sonda değil en başta olması.

## 👁 İZLEME LİSTESİ — iş değil, göz

`rule26` Playwright kronik flake (F-BW01) · eval-canary PR koşularında yapısal atlanır (başarısızlık değil) · `seed_state` 23505 claim-race'leri (iyi huylu) · bayat dal süpürmesi.

---

## v1_8 → v1_9 DEĞİŞİM KAYDI

1. **BLOK 2E doğdu** — dört kalem, bitiş tanımı sahibin cümlesi. Teşhis:
   backend'in kendini anlatma yolları **protokolde zaten var** ve ikisini de
   kullanmıyoruz.
2. **`ROUTE-OPEN-1` ACİL** ve `2.3a`'nın G6 gösteriminden önce gelir.
3. **`BACKEND-PACK-OPTIONAL-1` → `PACK-FROM-PROTOCOL-1`** (sahip onayı). Ad
   yanlıştı: mesele pack'i opsiyonel kılmak değil, **sunucunun zaten gönderdiği
   kılavuzu okumak**.
4. **Architect'in üçüncü kez düzeltilen öncülü kayda geçti:** tasarım notu
   v1_1 §6 *"üçüncü backend sıfır kodla bağlandı"* diyordu. Gerçek liste:
   `backends` satırı (migration) · `BACKEND_IDS` (kod) · `assemble.ts` case (kod)
   · bir pack modülü (kod) · elle yazılmış kategori job dosyası. **Beş adım.**

## v1_7_1 → v1_8 DEĞİŞİM KAYDI

1. **`2.2a · BACKEND-REGISTER-AFFORDANCE-1` doğdu** (sahip hükmü S82) — Tier B'nin
   adlandırılmış önkoşulu. Gerekçesi ölçülmüş: 39 backend, sıfır insert yolu.
2. **Harness'ın üç tasarım sorusu kapandı** (sahip onayı) ve 2.3a satırına yazıldı:
   ayrı repo · ön-kayıtlı mod tahmini · Operator kapısından mount.
3. **Künye düzeltmesi taşındı** — v1_6/v1_7 kendini `v1_5` diye tanıtıyordu; `v1_7_1`
   bunu düzeltti, v1_8 doğru künyeyle devam ediyor.

## v1_6 → v1_7 DEĞİŞİM KAYDI

1. **`PB-B` raftan indi** (sahip hükmü (a)) ve **`M-C` bağımlılığı kalktı**. Path B'nin üç
   yarısı da artık plandadır: işlev 2D.1, dense 2D.4a, altyapı 2D.4b.
2. **`PB-FULL-1` tek program oldu, ÜÇ KANITLI AŞAMAYLA** (sahip onayı S82). Ayıran ilke:
   **bge-m3 bir KALİTE kararı, Qdrant bir PERFORMANS kararı** — aynı fazda ölçülürlerse
   ikisi de kanıtsız kalır.
3. **Aşama 2 `pgvector` üzerinde koşar**, Qdrant Aşama 3'tedir: dense getirmenin işe
   yarayıp yaramadığı yeni altyapı kurmadan öğrenilir.
4. **Aşama 3'ün kanıtı bir "aynılık" kanıtıdır** — motor takası sonucu değiştirirse bu bir
   kusurdur, özellik değil.
5. **Kabul ölçütü v1_4 → v1_5** (R10 · `OPA-POLICY-1`'in üç bacaklı ölçütü; D-OPA-3'ün
   aleti **`FAULT-SWITCH-0`**, yani 2.3b).
6. **Bir karar noktası ADIYLA açık bırakıldı:** Aşama 2'nin deltası pozitif değilse Aşama
   3'ün öncülü kalmaz.

## v1_5 → v1_6 DEĞİŞİM KAYDI

1. **`mount` önce** — 2.2 `BENCH-BACKEND-MOUNT-1`, 2.3b'den hemen sonra. `BUG-005` (2.10)
   arkasına geçti. Açık hüküm kapandı.
2. **Graph KB'nin alarmını SAHİP çaldı** — 2D.3 **koşulsuz**. Alarm metni kayıt olarak
   durur, kapı olmaktan çıkar. 2D.2 artık yalnız 2.8'in önkoşuludur.
3. **OPA içeride, tek-tenant'ta da** — 2D.5 `OPA-POLICY-1`, koşulsuz. §E'nin *"yalnız
   multi-tenant'ta"* kaydı bu hükümle geçersiz.
4. **Multi-tenant PARK teyit edildi** — 2D.4'ün (c) tetiği kapandı; geriye ölçülebilir
   (a) ve (b) kaldı. **2D.4, ölçüme bağlı kalan TEK mimari kalemdir.**
5. **Architect'e bağlayıcı not eklendi:** kapsam/tetik/sıra boşlukları ADIYLA SORULUR,
   doldurulmaz. v1_5'te iki kez ihlal edildi ve sahip ikisini de yakaladı.
6. **2D.5 için açık soru yazıldı** — ölçüt mü, adlandırılmış önkoşul mu. Architect
   seçmiyor.

## v1_4 → v1_5 DEĞİŞİM KAYDI

1. **BLOK 2D eklendi — mimari katman raftan indirildi** (sahip hükmü S82). Hiçbir kalem
   silinmedi; PARK ve RAF bölümlerinde **TAŞINDI** olarak işaretlendi.
2. **PB-A 5.6'dan 2D.1'e ÖNE ÇEKİLDİ.** Gerekçe: üç raf kaleminin de hakemi PB-A'dır ve
   en sonda bekliyordu. 5.6 satırı silinmedi, taşındığı yeri gösteriyor.
3. **Her uyanma şartı iş tahtasından bu belgeye AYNEN taşındı** — Graph KB'nin alarmı,
   §E'nin üç tetiği. Bir işin tetiği, sırasını taşıyan belgede yaşamak zorundadır.
4. **`LINE-RESOLUTION-DIAGNOSIS-1` (2D.2) doğdu** — 2.1b'nin ölçümünden. Graph KB'nin
   birinci alarmını ateşleyebilecek tek okuma.
5. **OPA'nın ölçütsüzlüğü §1 simetri maddesiyle İLAN EDİLDİ**, sessizce muaf tutulmadı.
6. **`HONESTBENCH-HARNESS-0` (2.3a) = testbed MCP sunucusudur** — sahibin S82'de adını
   koyduğu kalem; planda zaten yerindedir, çatlakta değildir.

## v1_3 → v1_4 DEĞİŞİM KAYDI

1. **Hiçbir satır silinmedi, hiçbir sıra sahip hükmü olmadan değiştirilmedi.**
2. **Biten üç kaleme ✅ + kanıt yazıldı:** 2.1 (`d3d246c1`, VOID), 2.3 (`b960a1c9`).
3. **Planda hiç olmayan dört kalem adıyla EKLENDİ:** 2.1a `LENS-CEILING-1` ✅ · 2.1b
   `MA-RERUN-2` ✅ · 2.3a `HONESTBENCH-HARNESS-0` · 2.3b `FAULT-SWITCH-0`.
4. **Kusur kuyruğu (2.10–2.12) eklendi** — 7 açık bugun yürüyüş sırasında yeri yoktu.
5. **Kabul ölçütü v1_3 → v1_4**; Blok 1'in tarihî kanıt zemini korunarak bugünkü zemin
   ayrı satır olarak eklendi.
6. **2B'nin "paralel" tarifi düzeltildi** — tek Author şeridi var; paralellik nominal.
7. **2.8 `DISCOVERY-EXTEND-2`'nin gerekçesi ölçümle değişti** (aşağıda).
8. **Açık sahip hükmü** belgeye adıyla yazıldı, varsayılmadı.

## v1_2 → v1_3 DEĞİŞİM KAYDI

1. **Bütçe rakamı bu belgeden ÇIKARILDI** — tek kaynak sözleşme R4. Bütçe her değiştiğinde artık yalnızca bir dosya değişir (bu oturumdaki üç sürüm sıçramasının sebebi buydu).
2. **2.6 `BENCH-SMOKE-1` maliyet ölçüm aleti oldu** — metrelenmiş görev-başı maliyet, token in/out, tam-tur ekstrapolasyonu zorunlu çıktı. Sözleşme §10'a "tur başına maliyet" satırı eklendi; bütçe artık kendisi de bir izlenen ölçüt.
3. **Blok 3'e sıralama kuralı eklendi:** metrelenmiş maliyet geldikten sonra tier'lar ucuzdan pahalıya koşulur — aynı parayla daha çok ölçüt kapanır. Kapsam kısması değil; hiçbir ölçüt küçültülmez.

<!-- END · cwf-master-rollout-plan-v1_3 · 2026-08-03 -->
