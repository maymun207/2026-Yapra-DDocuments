# CWF · AÇIK KALEMLER REGISTER · v95 — S91 kapanışı

<!-- cwf-open-items-register-v95 · 2026-08-09 · S91.
     v94'ü geçersiz kılar. ALTIN KURAL: kalem silinmez, adıyla taşınır. -->

## §0 · ZEMİN (S91 kapanışında, taze klonda HESAPLANDI)

| | |
|---|---|
| `origin/master` | **`00062c7871a994fea3d63a79ba3c918b5201f263`** |
| docVersion | **rev 223 · 2026-08-09** |
| Suite | **518 dosya / 6322 test**, 0 fail, 0 skip |
| Migration · ADR | **68** · **13** |
| GATEWAY_RULES | **18** yayınlı · **kod tabanı da 18** ⚠ (v94'ün "16+2 operatör" parantezi BAYATTI; `PHASE-GATEWAY-RULE-FLOOR-FOLD-1` `51eeb84` katladı — düzeltildi) |
| `phase/*` | **27** (süpürme TAMAM) |
| Üretim | `dpl_JE98TTsGH7FPGdxiYcyHeBsKKDLr` **READY** @ `39a0b90` |
| Governed | `armes.metric_registry` **3 yayınlı** · `superset.tool_annotation` **4 taslak** · `system.plan_template` 5 · `armes.tool_category` 12 yayınlı/4 taslak · gateway_rule 18 |

## §1 · S91 SAHİP HÜKÜMLERİ (bağlayıcı, yeniden tartışılmaz)

**H1 · Tasarım notu v1_1 onaylandı.** `cwf-design-METRIC-REGISTRY-DATA-1-v1_1`
v1'i amend eder: §3-A'nın "nothing pretends to be official" cümlesi zırha
daraltıldı · §3-C değeri `['quality']` olarak düzeltildi · §8.1 başlığı
"Armor-level honesty on an empty registry" · §10 adlandırılmış dışlama eklendi.

**H2 · SOTA kapısı = MİMARİNİN TAMAMLANMASI.** Dış benchmark'lara mimari
bileşenler (PathB · Graph-KB · anlama katmanı · orkestrasyon · mount) tamamlanmadan
**girilmez ve girilmemelidir.** Gerekçe sahibin: bu benchmark'lar spesifik olarak
o bileşenleri test ediyor; yokken koşmak, sonucu bilinen bir sınava girmektir ve
üretilen sayı bileşenler geldiğinde çöpe gider. Mimari-önce, test-sonra.
*(Architect'in "ölçümü öne çek" tavsiyesi bu hükümle GERİ ÇEKİLDİ. Architect'in
hatası: SOTA-1'in lafzını doğru okuyup yanlış yere uygulamak — var olmayan bir
bileşene karşı benchmark koşmak ölçütü ilerletmez, yerine geçecek bir sayı üretir.)*

**H3 · CANARY-POWER-1 çok önemli** — dış ölçüm yerine geçecek İÇ geri besleme
döngüsü. Kanarya **on ardışık merge'de** `verdict: null` döndürdü.

**H4 · LEARNING-SNAPSHOT-1 ŞART ve çok temiz çalışmalı.** Dört yetenek sahip
tarafından adlandırıldı; beşincisi AgentBeats'ten geldi (§4-D).

**H5 · S91-3 ŞERİT-TAMLIK KAPISI** (§3'te tam metin).

**H6 · Dosya kuralı.** Proje dosyasına yüklenecek her şey **FILE** olarak üretilir,
konuşma metnine yazılmaz. Şeride giden metin hedefi ŞERİT olan BLOCK'ta. Sahibe
yorum düz metin. Bir mesajdaki **her artefakt** eylem maddelerinde adıyla
yönlendirilir; yönsüz artefakt bırakılmaz.

**H7 · Adlandırma düzeltmesi.** Rota tabanı kalemi `…-TENANT-…` DEĞİL,
`ROUTING-FLOOR-**BACKEND**-1`. Bu repoda "tenant" zaten müşteri-kelimesi
tarayıcısıdır (`check:tenant-zero`: kale/kalebodur/seramik/kb7/glazur) ve PARK'taki
TENANT-CONSOLE ailesinin adıdır. Eksen BACKEND'dir.

## §2 · S91'DE KAPANANLAR

| Kalem | Kanıt |
|---|---|
| **`vocab_source` kanıtı** (S90'ın yarım kalan yarısı) | Epizod `ee142f843b7157c58d4c5cb0f5c80887` @ 18:44 TR → `vocabSource='governed'`. **Pozitif kontrol:** deploy öncesi 24 epizodun hepsi `null` — ölçülmüş süreksizlik, kendi kendini doğrulayan sıfır değil |
| **STAGE-CARD-COVERAGE-1** | `d32482f` · 4 kart mahkûm (03·04·05·08) · 4/4 mutasyon · 518/6317 · rev 222 korundu |
| **METRIC-REGISTRY-DATA-1** | `39a0b90` · 8/8 mutasyon · 217→0 tip hatası · 518/6322 · rev 223 · üretimde 3 governed satır |
| **W-034 / TOOL-ANNOTATION-KIND-MINT-1** | G7, ayrı commit `820bb5f` · `superset.tool_annotation` mint edildi, **4 taslak** sahnelendi, o yoldan **sıfır publish** |
| **ROUTE-DERIVE-1'in bayat "BLOKE" satırı** | `PHASE-ROUTE-DERIVE-1-MERGE-report.md:109`'a DISCHARGED işareti eklendi (S91-1'in uygulaması) |
| **Kapanış süpürmesi** | 29 → **27**; `rescue/chore-mcp-supabase-ro-f75b1f9` de silindi |

## §3 · S91 DOĞUMLU ARCHITECT YASALARI

**S91-1 · BAYAT BLOKAJ YASASI.** Kapanmış bir blokajın commit'li raporda ayakta
bırakılması **kalıcı bir yanlış öncüldür**: şerit yenilemesinden sağ çıkar ve taze
şeridi yeniden enfekte eder. Tanık: AG-1, ölçüm onu çürüttükten bir saat sonra
satırı birebir tekrarladı. **Çözüm rapora DISCHARGED işareti düşmektir** (tarih +
ölçülmüş kanıt), tarihi yeniden yazmak değil.

**S91-2 · RELAY YÖNLENDİRME YASASI.** `>> BLOCK: <hedef> <<` işaretinin hedef
alanı **ŞERİTTİR** (AG-1/AG-2/Operatör), asla dosya adı. Yanlış hedef bir yazım
hatası değil, **yanlış teslimattır**. Ve bir mesajdaki her artefakt eylem
maddelerinde adıyla yönlendirilir.

**S91-3 · ŞERİT-TAMLIK KAPISI (sahip yasası).** Herhangi bir AG şeridinin işi
bitmemişken oturum **KAPATILAMAZ**. Kapanış artefaktları ancak her aktif şerit
%100 bitirdikten sonra — merge olmuş ya da sahip hükmüyle açıkça geri çekilmiş —
üretilir. Yarım şerit bir "devir" değildir; **kapanışı bloke eder.** Pratik
sonuç: bir şerit INCOMPLETE rapor döndürdüğünde Architect'in sıradaki işi o
şeridin devam promptudur, kapanış artefaktları değil.

**S91-4 · FAZ PROMPTU KENDİ KENDİNE YETER (D-2'nin sertleştirilmesi).** Bir faz
promptu, şeridin **okuyamayacağı** bir belgeyi BINDING CARRIER ilan edemez.
AG lanes Claude proje dosyalarını GÖREMEZ. Tanık: v1 promptu iki tasarım notunu
zorunlu kaynak ilan etti, şerit ikisine de erişemedi, bir tur kayboldu.
**Çare: bağlayıcı hükümler promptun içine gömülür** (v2'nin §0'ı gibi).

**S91-5 · FAZ PROMPTU TAMLIK KAPISI.** Her faz promptu açıkça adlandırmak
zorunda: (a) dal adı `phase/<kebab>` · (b) o dalı origin'e PUSH etme talimatı ·
(c) rapor yolu `docs/relay/PHASE-<AD>-report.md` · (d) master'a PR açma (CI PR
head'inde koşsun). Bunlar yoksa şeridin işi Architect'e **görünmez** olur.

**S91-6 · CI SORGUSU TAM SHA İLE.** `?head_sha=<kısa>` **boş dizi** döndürür ve
bu, "CI hiç koşmadı" ile göz kararı ayırt edilemez. **Tam 40 karakter zorunlu**,
ve `refs/pull/<n>/merge`'ün varlığı çapraz kontrol edilir — çünkü **çakışmalı bir
PR'ın imzası da sıfır koşudur**. Bozuk sorgu elenmeden boş API sonucu bir ölçüm
değildir. *(Ayrıca: `git merge -F -` stdin okumaz, `git commit -F -`'in aksine.)*

## §4 · YENİ KALEMLER (S91 doğumlu)

**A · `ROUTING-FLOOR-BACKEND-1`** — 2E ray ailesi, `METRIC-REGISTRY-DATA-1`'in
hemen arkası. `api/cwf/_lib/toolCategories.ts:164–490`, üretilmiş
`[F214-FLOOR-SYNC]` bloğu: **12 seramik kategorisi**, `'oee'` (:169),
`'scrap'`/`'ıskarta'` (:381–382) literal olarak, artı ~100 armes araç adı. İki
yerde canlı: `matchCategories`'in **varsayılan argümanı** (outage fallback) ve
**:1123'te router-fallback promptuna basılan metin**. Çıkış grep'i buraya
DEĞMİYOR (literal, referans değil). AG-1'in ROUTE-DERIVE-1 raporu §5 boşluğu
zaten adlandırmıştı: *"bu kod tabanının hiçbir yerinde backend-başına taban
kavramı yoktur."* Üretici `scripts/syncRoutingFloor.ts` ve çekirdek
`floorSyncCore.ts`'te **"backend" kelimesi bile geçmiyor.**

**B · `TRUST-PANEL-PER-BACKEND-1`** — `src/**` şeridi. `backend-trust` yanıtı
`allowedMetricsByBackend` kazandı ama düz `allowedMetrics` korundu, çünkü
`BackendTrustPanel.tsx:337` onu **isimle** okuyor, tipini sunucudan değil elle
yazılmış istemci arayüzünden alıyor (S82-5 kopyala-adla tehlikesi) — yeniden
adlandırmak grant açılır listesini **sessizce** boşaltırdı. **Uygulama
yumuşatılmadı**: 422 kapısı backend-başına. Düz alan bir UI kolaylığıdır ve
sunucunun reddedeceği bir metriği hâlâ ÖNEREBİLİR. Borç: panel
`allowedMetricsByBackend`'e geçer, düz alan ölür.

**C · `STAGE-CONTEXT-TRUTH-1`** — `api/**` şeridi. `api/admin/stage-context.ts:41-48`
aşama 04'ü **KALICI ince** ilan ediyor (`'no-artifact'`, *"ayrı planlayıcı yok
(ReAct)"*), `src/dev/AdminPreview.tsx:629`'da aynalı, iki fixture'da yankılı.
**Her iki yarısı da yanlış:** `ctx.turnPlan`/`ctx.planBlock` gerçek artefakt, ve
kalıcılık iddiası PLANNER-0 ile doldu. **Bu ASIL nüshadır** — bugün İncele →
Aşama Bağlamı'nı açan admin hâlâ "planlayıcı yok" okuyor. AG-2 fence dışı olduğu
için doğru davranıp dokunmadı.

**D · `LEARNING-SNAPSHOT-1`** — sahip hükmü H4, **ŞART**. Beş yetenek:
① anlık görüntü (adlandırılmış+tarihli sürüm) · ② temiz sıfırlama (tek yönetilen
işlem) · ③ sürümlü geri yükleme · ④ temiz-ajan modu (benchmark koşusu üretim
öğrenmesine HİÇ yazmaz) · ⑤ **`task_id` isim-alanı izolasyonu** (AgentBeats
şartı, eşzamanlı değerlendirme çakışmasını önler).
**⚠ Kirlenme çift yönlü:** sadece "testler belleğimizi kirletir" değil — CWF dış
bir benchmark'ın araçlarına karşı koşarken öğrenme açıksa o kelimeleri
`tool_category_cache`'e yazar ve **armes'in üretim yönlendirmesini zehirler.**
Yani ④ test hijyeni değil, **üretim korumasıdır.** Tasarım notu:
`cwf-design-LEARNING-SNAPSHOT-1-v1`.

**E · `AGENTBEATS-INTEGRATION-1`** (eski adı WORKLANE-AGENT-EVAL-1). Sahibin daha
önce paylaştığı "ajan ajanı test eder" yapısı = **AgentBeats**
(`RDI-Foundation/agentbeats-tutorial`). **Yeşil ajan** değerlendirmeyi yönetir ve
kuralları koyar; **mor ajan** değerlendirilendir; iletişim **A2A protokolü**
üzerinden. Repo'da `scenarios/tau2/` (evaluator + agent) hazır. Paketleme: Docker
imajı GHCR'a, `--host --port --card-url` alan ENTRYPOINT, `linux/amd64`. BYOK.

**F · `SOTA-AGENT-ADAPTER-1`** — CWF'i **A2A sunucusu** olarak açığa çıkarma.
⚠ **Architect'in ilk önerisi (OpenAI-uyumlu uç nokta = harness'ı model kılığına
sokmak) AgentBeats bulgusuyla YERİNİ BIRAKTI**: platform "ajanını istediğin dil
ya da framework'le geliştir, yeter ki A2A sunucusu olarak açığa çıkar" diyor —
yani **harness-seviyesi arayüz**, ve CWF bir harness. **Evi listede zaten var:
#19 `2.5 BENCH-A2A-1`**, ki artık "güzel bir prova" değil **SOTA kapısının
önkoşuludur.**

**G · `LANGFUSE-ATTR-READ-1`** — iki okunmamış span attr'ı **tek kalemde**:
`cwf.grounding.vocab_source` (Langfuse ingest tarafı) + `cwf.burst_guard.state`.
İkisinin de DEĞERİ deftere kanıtlı; okunmamış olan taşıma. Boot v91 §C yalnız
birincisini saymıştı; GATE-SILENCE merge raporu §5.2 ikincisini adlandırıyor.

**H · honestbench backend'i yok** — G7 mint'i jenerik, ama
`honestbench.tool_annotation` doğmadı çünkü o backend bağlı/enabled değil. Kusur
değil, kayıt. Tetik: `2.3a HONESTBENCH-HARNESS-0`.

## §5 · ÖLÇÜLMÜŞ SİSTEM GERÇEKLERİ (S91'de okundu)

**① Kanarya ONA çıktı.** `verdict: null`, `underpowered`, on ardışık merge.
`scoredReps` serisi **4 · 2 · 3 · 6 · 3** — son merge'de güç **düştü**.
Yeşil bir kanarya İŞİ bir hüküm değildir. `CANARY-POWER-1` sahibi.

**② Planlayıcı ÜRETİMDE AÇIK AMA SESSİZ.** `PLANNER_ENABLED` tabanı **1**
(`agentParams.ts:742`, `stage:'05'`); ama plan bir frame ister ve frame çıkarımı
`router.enabled` + `ROUTER_FRAME_ENABLED`'a biner, **ikisinin de tabanı 0**
(`:390`). Organ koşuyor ve **sıfır bayt üretiyor.** "Açık mı?" ile "konuştu mu?"
iki ayrı ölçümdür. *(Kart 04'ün dördüncü yasası bunu açıkça söylüyor.)*

**③ Öğrenilmiş katman versiyonsuz.** Ölçüldü: `episodes` **196** ·
`entity_registry` **796** · `router_proposals` **20** · `backend_authority` **3** ·
`tool_category_cache` **2** → **~1.017 satır, yedeksiz/sürümsüz/geri yüklenemez.**
Karşısında yönetilen katman **310 yayınlı satır**, `rule_versions` 442 +
`rule_audit` 863 ile **zaten versiyonlu.** `router.learnEnabled` canlıda **0**
(F185 freni), yani dört kirlenme yolundan biri kapalı, üçü açık.

**④ Kart 08'in gizlediği:** `MAX_TOOL_RESULT_CHARS =
Number(process.env.MAX_TOOL_RESULT_CHARS) || 40000` — eski kart "kodda, 40000"
diyerek **env geçersiz kılmasını gizliyordu.** Telltale taraması bunu bulamazdı.

**⑤ Mutasyon 2'nin gösterdiği:** vocab parametresine varsayılan verildiğinde ve
bir çağrı yeri argümanını düşürdüğünde **`tsc` 0 ile çıktı**, oysa yönlendirici
her backend'i armes'ın üç kelimesiyle yargılıyordu. Yalnız census testi yakaladı.

**⑥ `replay.ts`'in ikinci grounding kolu sessizce kördü** — `?scopeReplay`
sıfır ihlal döndürüyordu ve bu "grant hiçbir şeyi değiştirmedi" diye okunurdu,
oysa hiçbir şey karşılaştırılmamıştı. Testler yakaladı, inceleme değil.

## §6 · NÖBET / KUSUR (faz açtırmaz)

`LANGFUSE-ATTR-READ-1` · no-jurisdiction üretim ORANI (alanlar canlı, telemetri
birikmeli) · W-032 kapı hassasiyeti · W-030 · W-033 · W-018 · UI-POLISH-NOTE ·
Gemini+PII 3. veri noktası · BUG-005 · BUG-014 · ARMED 010-down · ARMED 029 ·
W-026 sicili ×5 · `BENCH-KULLANIM-DOC-1` · `evalGate.ts:160-164` armes kalıntısı
(evi 2E.3) · W-035 (evi 2E.3).

## §7 · PARK / TETİKLİ

ACTION-AUTHORITY-ADR → BACKEND-N8N-1 (tetik: CENSUS kapanışı) · LangGraph
ikinci-beyin (tetik: eylem-uzvu hattı sonrası) · HISTORY-DIET-1 (2F sonrası) ·
MEMORY-HYGIENE-Q (**S90 H3 ile hükme bağlandı**: elle silme REDDEDİLDİ (PLATINUM),
çıplak TTL reddedildi, düşüş ADR-010 gözlem disiplinine bağlı) · ROUTER-DISTILL-1
(ölçüm-tetikli) · TENANT-CONSOLE / EAIP-TENANT (müşteri #2) · QUERY-CANDIDATE-1
(recon gerektirir).

## §8 · PROJE SAĞLIK ÖLÇÜMÜ (S91'de hesaplandı, sahip talebi)

45 gün (26 Haziran → 9 Ağustos) · **1.011 commit** (~22/gün) · **163 adlandırılmış
faz** · **94.609 satır** üretim TypeScript / 471 dosya · **89.259 satır** test
(≈1:1) · son 6 günde 48 merge, **%25'i fix sınıfı.**

**Karmaşıklık değerlendirmesi (1-100): içsel 80, yaşanan ~93.** Beş eksende:
alan/algoritma **35** · sistem büyüklüğü **52** · **değişmez yoğunluğu 85** ·
**doğrulama standardı 92** · eşgüdüm **78**. Aradaki 13 puan mühendislik değil
**eşgüdüm**: bir ekibin koordinasyon yükü tek insana sıkışmış durumda.
**Teşhis:** metodoloji yanlış değil — sıralama ve bitiş tanımı eksikti; ve
görünen tek gösterge (append-only ledger) **başarının fonksiyonu olarak uzuyor**,
yani burn-up var burn-down yok. §9 bunu düzeltiyor.

## §9 · BURN-DOWN (S91'de kuruldu — her register bunu taşır)

**Yürüyüş kalemleri: 32 · S91'de kapanan: 2 · uçuşta: 0 · açık: 30.**
Trend: S90'da 2 kapandı, S91'de 2 kapandı, ve S91'de **7 yeni kalem doğdu**
(A–G). Net: liste **+5**. Bu bir başarısızlık göstergesi DEĞİL — standart
bulguları yüzeye çıkarıyor — ama görünür olmadan yönetilemez, o yüzden artık
görünür.

<!-- END · cwf-open-items-register-v95 -->
