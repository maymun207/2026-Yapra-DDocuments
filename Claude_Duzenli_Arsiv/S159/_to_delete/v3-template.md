# CWF-ROUTING-ARCHITECTURE-v2 — "Yetenek Yönlendiricisi" (Capability Router) · TASLAK v3 (S159-3)

DURUM: TASLAK v3 — scout hasım incelemesine (ORDER-SCOUT-REVIEW-ROUTING-ARCHITECTURE-v2-S159-3-v1) ve sahibin hükmüne (OWNER-RULING-S160-ROUTING-V2-1) gidiyor. Kod DOKUNULMADI. v2'yi (CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-2, sha256 ee5f2c973f93c45c8a2bec6a8cee93c5c5dfdcae63fa4dbd3323aaac79b6de29) GEÇERSİZ KILAR; v2'nin scout hükmü RED-ON-DESIGN (SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-2, bus 2026-09-26T17:57:15Z, COMPACT 7.312 karakter; tam metin 14.693 karakter, sha256 0bf043222706e1f20e7fdf8a834c92a613991fb26d598b42704248eea47b2a89 — bus 8192 sınırı ve scout penceresinin yazma çiti yüzünden ulaşmadı; bu sürümün scout emri onu iki parça hâlinde otobüse ister ve Architect arşivler).
MEASURED-AT: 2026-09-26T18:20Z (köprü saati). Ölçüm tabanı: master 2a6f6781b1a4748aac5f5bc7b1d73136863b1c35; canlı DB fjbrkimwvtpwoxhziidh; A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 (doc repo S150/, sha256 {{A24_SHA}}, 218 satır — §2 bu dosyadan MAKİNEYLE, satır numarasıyla, bayt bayt alıntılanmıştır); CWF-ASTRA-REVIEW-EVALUATION-S159-1; scout'un iki hükmü (S159-1 16:44:11Z, S159-2 17:57:15Z).

TASARIM KAYNAKLARI, ADIYLA (S112-YASA-1 · §12.14):
- OWNER-DESIGN-S159-1 (sahip, 19:16 TSİ): 6×13 sabit çerçeve matrisi ve koda gömülü sabit bloklar yapısal çöp; yeni bir backend (finans) MES sözlüğüne zorlanamaz; kendi kendine öğrenen/konfigüre olan/iyileşen yapı; kod öncesi doküman + plan + scout tartışması.
- EXT-DESIGN-S159-ASTRA-1 (ChatGPT Astra incelemesi, sahibin toplamasıyla): A1 üç sınıf yönetişimli veri · A2 sağlayıcı matrisi · A3 araç kimliği · A4 kapı genelleştirmesi · A5 keşif zinciri · A6 yönlendirme olayı · A7 toplulaştırma/kapsam yüzleri · A8 çalışma zamanı bütçesi · A9 kanıt aşamaları · A10 kabul tablosu · A11 kapsamlı sıfır-kod. Ölçümü: CWF-ASTRA-REVIEW-EVALUATION-S159-1 (21/24 kabul, 0 ret).
- SCOUT S159-2 (RED-ON-DESIGN, D1–D12): v2 §2'deki 16 maddenin yalnız 4'ü A24 ile aynıydı, 12'si daraltılmıştı (FULLEST-ATTESTED ihlali); P2 A24 P4 ile çelişiyordu; router.maxTools DB'de de kodda da yok; yükümlülük taşması normal durum olurdu (185 turda p50 13, p90 46, max 56 yükümlü araç); "şirket katmanı yalnız veri" YANLIŞ (IR_OBJECTS'ta COMPANY yok, alias enum'u kapalı, arg-policy satırı gerekli, canlı "Kaleseramik → KS fabrika" alias'ı); Anthropic yolunda yükümlülük hiçbir şeyi zorlamaz; cwf.trace.v1 kodda YOK; E3'ün "matris kapalı" kolu koşturulamaz (frameRouting stage 03'ü de kapatıyor); router.learnEnabled canlıda 0 (fren zaten açık); literatür düzeltmeleri (ToolScope dense+reranker, etiketler yeniden eşlenmiş; Toollery fatura orantısız; .942/.704 aynı koşul değil).
- ARCHITECT KÖR NOKTALARI, ADIYLA: A-REC-S159-1 (üç oturum yama), A-REC-S159-2 (v1 A24'ü numarayla taşıdı ve dört yerde tersini yazdı), A-REC-S159-3 (v2, A24'ü "inline ettim" diyerek PARAFRAZ etti — 16 kuralın 12'si daraldı; kural: alıntı MAKİNEYLE, satır numarasıyla, bayt bayt yapılır; el yazısı özet alıntı değildir — 12.4'ün belge genişliğinde hâli).

GEÇERSİZ KILACAĞI KARARLAR (yalnız sahip hükmüyle): OWNER-RULING-S140-K1-ORDER-CELL-HINT-1; IR-3 fazının "MATRIX router seçiminin yerine geçer" kuralı. KORUDUĞU KARARLAR: A24 v1_3'ün TAMAMI — §2'de bayt bayt (v3 A24'ün hiçbir kuralını daraltmaz; §3 yalnız EKLER); AGNOSTIC-1; OWNER-RULING-S153-NO-ARMES-HARDCODE-1; OWNER-RULING-S156-DATA-BACKENDS-1; OWNER-RULING-S156-FAIL-CLOSED-1; OWNER-RULING-S149-R07-PLANNER-1; OWNER-APPROVAL-S149-K14-WRITE-GATED-1; empty≠zero; partial≠complete; S102-YASA-3 (P4/E5'e kadar bugünkü yol dokunulmaz).

---

## 0 · Tek cümlede

Bugün soru→araç seçimi, kodun içine yazılmış bir seramik-MES sözlüğüyle (6 eylem × 13 nesne matrisi, kapalı nesne/katman enum'ları, ALWAYS_INCLUDE, `superset` literal'i, sabit mesajlar) ve sağlayıcıya göre DEĞİŞEN bir yolla yapılıyor (Anthropic'te süzgeç de çerçeve de stage 03 de koşmuyor; diğerlerinde LLM seçimi sahibin yayınladığı anahtar kelimeleri görmüyor). Hedef, A24 v1_3'ün yetenek kartı mimarisidir (§2), ÜSTÜNE: matrisin ve kapalı enum'ların yönlendirme yolundan çıkması (sahip), sahibin yayınladığı AÇIK YÜKÜMLÜLÜKLERİN her sağlayıcıda plan ve iz düzeyinde bağlayıcı olması, araç kimliğinin server+backend+tool olması, yayın kapısının her yönetişimli türe genelleşmesi, K24 izinin gerçekten inşa edilmesi ve kanıt aşamalı bir plan (Astra + scout). SOTA iddiası §8'in ölçümüyle kurulur, bileşen sayısıyla değil.

## 1 · Teşhis — ölçülmüş (S159 sonu; scout ve Astra düzeltmeleri işlenmiş)

İki yol (stageTools.ts:551): ANTHROPIC → kapsam içi TÜM araçlar ad sırasıyla sunulur; kategori/router/matris/anahtar kelime koşmaz; ÇERÇEVE YOKTUR, bu yüzden stage 03 (clarify) de KARANLIKTIR (stageClarify.ts:2764). DİĞERLERİ → stage 07 filterToolsByMessage: router LLM (kategori + IR çerçeve) → HIGH'da MATRIX yerine-geçme (deriveCategories.ts:63–92) → matchCategories yalnız fallback (:1561/:1568), basis='frame' (:1644) ve sticky/önceki mesaj (:1681) — mevcut mesaj için semantik yolda KOŞMAZ → metrik ipuçları her eylemde ama frameRouting kapısının arkasında (:1609; kapı ipuçlarını, metrik tabanını, unmodeled keep/add'i, derived izi VE stage 03'ü birlikte kapatır, stageClarify.ts:2771) → ALWAYS_INCLUDE (toolCategories.ts:1203–1205) + assemble.ts:55 `'superset'` literal'i → bütçe dolunca sabit metin (completionGuard.ts:228). Son 185 stage-07 turunun 185'i `path` taşıyor: hepsi Anthropic dışı.

Tanıklar (trace'ten): T1 sermaye (S158) · T2 personel (turn 85cb74bcfe773dbdfabb170296af8724, 16:02:28Z: path=semantic, basis=keyword, router [employee, production], metricsSurface ["personel sayısı","çalışan sayısı"], derived.hints [], 14 çağrı, 489.176 token, sabit metin; offeredByBackend'de honestbench ve mount-probe AYNI indeksleri [4,5,6,7] taşıyor — ad-temelli kimliğin canlı belirtisi) · T3 Q3 fire (S149; TARİHSEL — ipuçları S151'de eylemden bağımsız oldu) · T4 sayımlar: ARMES 50 dosya/71 eşleşme; MATRIX'e sıkı bağımlı 11 üretim + 8 test dosyası.

Yapısal nedenler (ölçülmüş):
(a) SÖZLÜK KODDA — irFrame.ts:54–62 (6 eylem, 13 nesne; COMPANY yok), coreSchemas.ts:136 alias katmanı z.enum([factory,line,zone,equipment]), toolArgPolicy.ts:284–286 (bağlama arg-policy satırı ister), deriveCategories.ts MATRIX, ALWAYS_INCLUDE, assemble.ts:55.
(b) OLASILIKSAL > DETERMİNİSTİK, sağlayıcıya göre farklı biçimde.
(c) SORUYA KOŞULLU GERİ BESLEME YOK — tool_experience yalnız censusToolDoc.ts:214 (seçim sonrası) ve toolCensusRefresh.ts:442 (offline) tarafından okunur; sayaç oku-topla-upsert (ToolExperienceRepository.ts:110–150). learnToolMapping (:950–956) ve legacy öğrenme (:1866) kapısız YAZAR, ama router.learnEnabled canlıda PUBLISHED 0 → fren bugün AÇIK (scout ölçümü).
(d) ARAÇ KİMLİĞİ ÇIPLAK AD — toolRetrieval.ts:335–345 `seen.has(c.tool)`; stageTools.ts:1281 claimToolName ikinci sahibi reddeder; T2'de iki backend aynı indeksleri taşıyor.
(e) YAYIN KAPISI TEK TÜRE — governance.ts:427–434, yalnız PROMPT_SEGMENT.
(f) SIRA VE KARANLIK — stage 03 clarify (runTurn.ts:259) araç kaydından (:191) SONRA; çözüm TÜM satırları tarar (stageClarify.ts:936–958); "Kaleseramik" canlı governed-alias/exact ile KS FABRİKASINA çözülür; Anthropic'te stage 03 hiç koşmaz.
(g) BÜTÇE TANIMSIZ — router.maxTools ve router.maxFanout ne DB'de ne kodda; router.maxCategories=4. Yayınlı tool_category: 13 satır, 169 anahtar kelime, 124 araç yuvası; bugün sunulan p50 26, max 171; "hat"→"hata" 24 aracı çeker.
(h) KODLAMA — encoder.ts yer tutucu: dense = token hash projeksiyonu, sparse = 1+log(tf) sözlüksel (:15, :67–68; öğrenilmiş DEĞİL); Qdrant iki prefetch + RRF (qdrantEngine.ts:510–527); pathB/bm25.ts yalnız varlık adları. cwf.trace.v1 KODDA YOK (tek geçtiği yer bir rapor cümlesi).

## 2 · A24 v1_3 — KELİMESİ KELİMESİNE (A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1, satır numarasıyla; makineyle alıntı, el değmedi)

Bu bölüm A24'ün bu belgenin dayandığı her satırını AYNEN taşır. v3, aşağıdaki hiçbir cümleyi daraltmaz; §3 yalnız ekler. Bir satırın burada olmaması "geçersiz" demek DEĞİLDİR — A24 v1_3 bütün olarak yürürlüktedir; buradakiler yönlendirme yolunun doğrudan dayandıklarıdır.

{{A24_BLOCK}}

## 3 · v3'ün A24'ün ÜSTÜNE eklediği kurallar (her biri uzattığı A24 satırını adlandırır; hiçbiri daraltmaz)

E-1 · MATRİS VE KAPALI ENUM'LAR YÖNLENDİRME YOLUNDAN ÇIKAR (OWNER-DESIGN-S159-1; A24 §10 "word-list router blind to paraphrase → removed" ve P4 "hand category rows (archived)" satırlarını GENİŞLETİR): deriveCategories MATRIX, IR_ACTIONS/IR_OBJECTS'ın süzgeç rolü, coreSchemas alias katman enum'u ve toolArgPolicy'nin katman-başı satır zorunluluğu E5'te silinir/veriye açılır; o güne kadar hükümsüz kalır (router.matrixReplace=0, E2'de ayrılan anahtar). Çerçeve GÖZLEM olarak kalır ve K24'ün frame{} alanını besler.
E-2 · ÜÇ SINIF YÖNETİŞİMLİ VERİ (EXT-DESIGN-S159-ASTRA-1 A1; K10 yetki katmanını, A24 P4 "keyword as ladder floor"u ve K1 bütçesini uzatır): (i) YETKİ KISITLARI = K10, aynen. (ii) AÇIK YÖNLENDİRME YÜKÜMLÜLÜKLERİ = YENİ yönetişimli tür `routing_obligation`, birimi (koşul, ARAÇ) — koşul: mesaj deseni/çerçeve alanı/varlık katmanı/sağlayıcı; araç: server+backend+tool (E-4). Yükümlülük "bu araç bu turda DEĞERLENDİRİLİR" demektir: süzgeçli sağlayıcıda sunulan kümeye girer ve K1 bütçesine ÖNCE sayılır; Anthropic'te (zaten sunulu) PLAN KISITI olur — st07p planı yükümlü aracı ya çağırır ya çağırmama nedenini adlandırır — ve iz `obligation_honoured` alanıyla ölçer. Yalnız yükümlülükler K1'in ilan edilmiş max K'sını aşarsa tur OBLIGATION-OVERFLOW damgası alır ve sahip Kurallar sekmesinde görür. (iii) ALAKA İPUÇLARI = mevcut tool_category anahtar kelimeleri, metric_registry ipuçları, tahmini katman, sticky: SIRALAMA kanıtı — VE A24 P4'ün dediği gibi MERDİVEN TABANI: router susarsa/retrieval kalibre değilse bugünkü fallback davranışı (anahtar kelime kategorileri sunulan kümeyi belirler) AYNEN kalır. Böylece sahibin girdiği hiçbir satır güç kaybetmez ("TEK bir fonksiyonalite çıkartılmaz") ve v2'nin P4 çelişkisi kalkar. GÖÇ VARSAYILANI sahibin hükmüdür; iki seçenek scout'un sayılarıyla §9(b)'de.
E-3 · SAĞLAYICI SUNUM MATRİSİ (Astra A2; K1/K18/K20'yi uzatır): sunulan küme sağlayıcı başına TANIMLIDIR. Anthropic: tam katalog önbellek yolu; yükümlülük = plan kısıtı + iz kontrolü; yükümlü araçların şema/özetleri ÖNBELLEK ÖN-EKİNİN İÇİNDE sabit kalır (tur başına yeniden sıralama yok — önbellek bozulur); çerçeve ve stage 03 bugün karanlık → E4 ayrıştırır. Diğerleri: süzgeçli yol = §5 L1/L2. Her yolun BEDELİ faturayla ölçülür (Toollery B.2: görünür token azalması fatura tasarrufu değildir), E1'in üç-sağlayıcı tabanı harcama onayı ister.
E-4 · ARAÇ KİMLİĞİ = server_id + backend_id + tool (Astra A3; K6 "backend.tool namespace + hash pin"i uzatır): retrieval birleşimi, kayıt, deneyim/iz, kartlar bu üçlüyle anahtarlanır; model-yüzlü ad türetilir ve çakışmasızdır; T2'deki honestbench/mount-probe çakışması E2'nin ilk kırmızı testi.
E-5 · YAYIN KAPISI GENELLEŞİR (Astra A4; K21/K25/A24 §8 "gate = K23 filter … published if the routing exam does not fall outside the K25 interval"i uzatır): decideGoldenPublish (governance.ts:434) tool_category · routing_obligation · ranking_policy · tool_profile · kart demeti için de kapı olur — KABLOLAMA (12.6), ikinci kapı DEĞİL.
E-6 · KEŞİF ZİNCİRİ (Astra A5; K1 "tool_search opens deferred tools"u uzatır): K1'in tool_search'ü sağlayıcı-agnostik CWF aracı olarak (A24 §12 açık soru 2: "CWF's own index default") `cwf_find_capability` adıyla; gateway'in `search_tools`ünden ayrı kimlik; zincir: ara → yetkili kart (K21 demeti) → güncel şema → kayıt (E-4 kimliğiyle) → bir sonraki model adımında kullanılabilir; her kullanım INITIAL-NEED-MISS (kaçırma defteri, register kalem 9 "L5 miss ledgers") ya da NEXT-STEP-DISCOVERY olarak sınıflanır; yalnız ilki A24 §8'in "base-set entry proposal"ına girer.
E-7 · YÖNLENDİRME OLAYI = K24'ÜN İLK İNŞASI (Astra A6; K24/K23/K12'yi uzatır, ikinci defter DEĞİL): cwf.trace.v1 bugün kodda yok; E2 onu A24 §9'daki alan listesiyle, APPEND-ONLY, `result_class` sözlüğü K24'ünki olacak şekilde inşa eder. Turdan SONRA gelen etiketler (K23 konjonksiyonu, kullanıcı düzeltmesi, tekrar soru) ayrı bir ETİKET tablosuna trace_id ile yazılır; iz satırı değişmez. Alan eklemesi adlandırılmış şema sürümü (cwf.trace.v1 → v1.1) ister. tool_experience bu izin TÜREV görünümü olur (oku-topla-upsert yarışı yapısal olarak biter).
E-8 · KARTA İKİ YÜZ (Astra A7; K28/K29/K22'yi uzatır): TOPLULAŞTIRMA (ölçü, birim, grain, tekrar-giderme anahtarı, zaman semantiği — "bugün aktif" ≠ "dönemde çalıştı" ≠ FTE — kapsama damgası) ve KAPSAM (bilgi araçları için kaynak envanterinden türetilen konu/dönem/kurum kapsamı; K22'nin pozitif yarısı). Her yüz provenance taşır (DERIVED / LEARNED / CURATED — A24 §5 "Alias · glossary …" satırındaki sözlük).
E-9 · ÇALIŞMA ZAMANI BÜTÇESİ PLANIN YANINDA (Astra A8; K1/K26/K27'yi uzatır): K1'in "per-turn max K tools and max schema tokens DECLARED"ı E1'de `router.maxTools`, `router.maxSchemaTokens` ve `router.maxFanout` olarak ilan edilir (bugün üçü de yok); yürütücü gerekli fan-out'u KODDA, paralel ve bütçeli koşar; ham yükler bağlama girmez; durmak yetenek değildir — doğrulanmış aggregate / batch / sayfalama / bütçeli paralel arasından seçim izde yazılır.
E-10 · KANIT AŞAMALARI (Astra A9; A24 §11 P0–P5'i yeniden SIRALAMAZ, E1–E5'i P0–P5'in içine yerleştirir — §7).
E-11 · KABUL TABLOSU (Astra A10; K19/K25/K11'i uzatır — §8), sağlayıcı kırılım ekseni olarak eklenir.
E-12 · SIFIR-KOD KAPSAMLI (Astra A11; K5 "card derived CLIENT-side" ve protokol sınıfını uzatır): MCP tools/list + backends kaydında ilan edilmiş kimlik doğrulama + protokol sınıfı (MCP/gateway) dahilinde; bilinmeyen auth/işlem protokolü kart kesimidir.
E-13 · ÜRETİCİLER AYRIDIR (scout D12; K3/K11'i uzatır): niyet-sorgusu üreticisi (Toollery; kart verisi, retrieval indeksine) ≠ sınav paraphrase üreticisi (K11) ≠ profiler (K3, Sequence A ⑦); üretilmiş hiçbir metin held-out sayılmaz (K11 "paraphrase generator ≠ profiler", kirlenme yasağı).
E-14 · SABİT KULLANICI METİNLERİNİN EVİ (scout: "no user-text home"): completionGuard.ts:228'in bütçe metni ve benzerleri prompt.segment türünde, tenant-editable veri olur (A24 §13.9'un b1_scope için yaptığı gibi: yeni segment sürümü, eval kapısı).

## 4 · İlkeler (pazarlıksız; A24 ile tutarlı)

P1 · SÖZLÜK VERİDE (E-1, K5, K17, AGNOSTIC-1).
P2 · ÜÇ SINIF (E-2): yetki bağlayıcı; yükümlülük değerlendirilir ve ölçülür; ipucu sıralar ve merdiven tabanıdır. Değişmez: her geçerli yönetişimli ipucu HER yolda ve HER sağlayıcıda değerlendirilir, etkisi izde; hiçbir ipucu yetkiyi aşmaz; aday olmak sunulmayı zorunlu kılmaz; yükümlülük Anthropic'te plan kısıtıdır, süzgeçli yolda sunumdur.
P3 · HER SUNULAN ARACIN NEDENİ İZDE (K24 offered_set[] + neden alanı: authority-pass / obligation / base-set / retrieval-rank / conformal / hint / layer / sticky / ladder-floor / discovery).
P4 · YENİ BACKEND = SIFIR KOD, KAPSAMLI (E-12; Sequence A ①–⑭ aynen).
P5 · KENDİNİ İYİLEŞTİRME KAPILI VE DEMETLİ (A24 §8 aynen + K21 + E-5); learnToolMapping ve :1866 freni (router.learnEnabled=0) E5'e kadar AÇIK kalır; E5'te olay yoluna taşınır.
P6 · FAIL-CLOSED, EMPTY≠ZERO, PARTIAL≠COMPLETE (OWNER-RULING-S156-FAIL-CLOSED-1; K12; K22).
P7 · PLAN + BÜTÇE (K26 aynen; E-9).
P8 · KEŞİF ZİNCİRİ (E-6).
P9 · SAĞLAYICI MATRİSİ (E-3).
P10 · ARAÇ KİMLİĞİ (E-4).

## 5 · Hedef mimari (A24 Sequence B üstünde)

L0 · Katalog = A24 §5'in dokuz yüzü + durum makinesi (aynen) + E-8'in iki yüzü + Toollery niyet örnekleri (kart verisi, kapılı, E-13). Kodlama: A24 K15/K16 (dense bge-m3 + BM25-TR + sparse P2 ablasyonu); bugünkü yer tutucu encoder E3'te değiştirilir, kazanan ölçümle.
L1 · Aday üretimi, sırayla: (0) K10 yetki süzgeci → (a) yükümlülükler (E-2) → (b) K1/K17 bütçeli TABAN KÜME: tool_search (= cwf_find_capability) + kullanım-sıklığı top-N giriş araçları (K17: classifier ∩ readOnlyHint ∩ sahip izin listesi; canary; veto) → (c) K2 hibrit getirme (araç granülü, backend'e toplanmış, iki korpus) → (d) K9 KONFORMAL KÜME (α 0.10 ilan; n_min 30; kalibre değilken KURULU DEĞİL → sunar; beş karar sınıfı) → (e) ipuçları sıralama kanıtı (anahtar kelime tek/çok kelime, metrik ipuçları eylemden bağımsız, katman kapsaması, sticky) → (f) MERDİVEN TABANI: router susar / vektör motoru düşer / kalibrasyon yok → anahtar kelime kategorileri bugünkü gibi (A24 ladder ③e, P4). "skor > 0" kuralı YOK; L1(f)'nin v2'deki "rank ≤ N" kuralı YOK — taban K17'nin bütçeli kümesidir, kapsama K9'un konformal kümesidir (scout D11).
  Katman kapsaması (v2 L1-d) E4'ün KOD işidir, veri değil (scout D4): IR_OBJECTS'a bağımlı süzme kalkar; alias katman enum'u backend_entity_layers'tan türetilir; toolArgPolicy satır zorunluluğu katman-agnostik olur; ŞİRKET katmanı backend_entity_layers'a satır olarak girer ve canlı "Kaleseramik → KS fabrika" alias'ının ÖNCELİĞİ sahibin hükmüdür (§9 c); clarify frameRouting'den ayrışır ve stage 07'den ÖNCE koşar (K31 aynen: her düğüm izde; descendant walk yalnız çok-katmanlı ifadeler için — v2'nin genişletmesi geri alındı).
L2 · Sıralama ve bütçe: K1 ilan edilmiş max K + şema token tavanı; doldurma sırası yükümlülük → taban küme → konformal/sıralı adaylar; OBLIGATION-OVERFLOW damgası; ranking_policy YAYINLANMIŞ veri (E-5 kapısı), çalışma zamanı öğrenilmiş ağırlık YOK; reranker K16 ablasyonu izin verirse, K18 SLO içinde.
L3 · K26 aynen; st07p, turn/planner.ts'in YENİ MODUDUR (A24 §13.1 — ikinci organ yok); yürütücü v0 aggregate_records'u toplama ilkeli olarak KABLOLAR (§13.4), partialRead taşıyıcısını uzatır (§13.5); sonuç sınıfları K24 result_class sözlüğünden.
Keşif zinciri: E-6. Öğrenme: A24 §8 aynen + E-7 izi. Kendi kendini yapılandırma: Sequence A ①–⑭ aynen.

## 6 · Envanter ve MEVCUT YOLLARIN KADERİ (scout D8; her yol, her aşamada)

| Bugünkü yol | E1–E3 (gölge) | E4 | E5 |
|---|---|---|---|
| gateway-whole (gateway araçları bütünüyle sunulur) | değişmez | gateway araçları kartlanır (K5 gateway_tool_policy); giriş yüzeyi K17 tabanına girer; bütün sunum kalır (tek giriş yolu) | K1 bütçesi altında taban küme + keşif |
| uncovered-whole (kategorisiz backend bütünüyle sunulur) | değişmez | K9 "kalibre değilken sunar" ile aynı davranış, artık ADIYLA (uncalibrated_offer) | kalibre backend'ler konformal küme; kalibre olmayanlar sunulur |
| FloorWiden | değişmez | merdiven tabanı (P4) içinde adıyla | aynı |
| named-tool door (kullanıcı aracı adıyla anarsa sunulur) | değişmez | yükümlülük sınıfı "user-named" (E-2 ii) | aynı |
| write lock | değişmez | K14 WRITE-GATED aynen | aynen |
| ALL-TOOLS (lab routingBypass) | değişmez | lab bayrağı kalır | kalır |
| ALWAYS_INCLUDE + assemble.ts:55 `'superset'` | ŞİMDİ küçük kart (scout: çit ihlali; sahip onayı §9 f): tool_graph_node role=entry + backends.pattern verisi; K17'nin PROPOSAL'ı | K17 türetimi | silinir (P4) |
| learnToolMapping / :1866 | fren AÇIK (learnEnabled=0) | fren | olay yoluna taşınır (P5) |
| matchCategories fallback/frame/sticky | değişmez | ipucu (sıralama) + merdiven tabanı | hand category rows ARŞİVLENİR (P4), keyword yalnız merdiven tabanı |
| MATRIX + IR enum süzgeci | gölgede karşılaştırılır | router.matrixReplace=0 ile hükümsüz | SİLİNİR; kırmızıya dönmesi GEREKEN testler E5 kartında dosya adıyla listelenir (11 üretim + 8 test, kesimde yeniden ölçülür) |
| completionGuard.ts:228 sabit metin | değişmez | prompt.segment'e taşınır (E-14) | — |

VAR/KABLOLAMA/EKSİK sayımı v2 §6'daki gibi, iki düzeltmeyle: cwf.trace.v1 EKSİK (kodda yok); learnToolMapping freni VAR ve AÇIK.

## 7 · Kanıt aşamaları (A24 §11'in içinde; tarih yerine bağımlılık; kart → scout → şerit → PR → sınav sayıları → scout iniş → master; 30 dakika = yeşil dal → master gecikmesi, aşama boyu değil)

E1 · DEĞERLENDİRME ZEMİNİ (A24 P0/P1'in sınav yarısı): K11 üç küme (profil-geliştirme · kalibrasyon · bağımsız kabul) held-out gerçek turlardan; kabul edilebilir küme etiketleri; dört tanık REGRESYON kümesi (final değil); K1 ilanları: router.maxTools · router.maxSchemaTokens · router.maxFanout (ilk değerler tabandan: bugün sunulan p50 26); K-A fikstürü: repoda tools/list'i JSON'dan servis eden sentetik MCP sunucusu (finans, 30 araç) + ikinci görülmemiş-sözlüklü backend; K-G aleti: check:tenant-zero + api/src/public üzerinde büyük-küçük harfe duyarlı ARMES grep kapısı; ÜÇ sağlayıcı tabanı (fatura maliyetiyle; harcama onayı §9 d); K25 kabul barajı BU AŞAMADA ilan edilir. Kod: yalnız replay/sınav aletleri ve fikstür.
E2 · KATALOG VE POLİTİKA SÖZLEŞMESİ (A24 P1'in kart yarısı): E-4 kimliği (ilk kırmızı test: T2'nin honestbench/mount-probe çakışması); K21 demeti tabloları + durum makinesi; routing_obligation ve ranking_policy türleri; E-8 yüzleri; cwf.trace.v1 İNŞASI (E-7) + etiket tablosu; frameRouting'in AYRILMASI — `router.matrixReplace` (yerine-geçme) ve `router.frameEnabled` (gözlem/ipucu/stage 03) ayrı anahtarlar (E3'ün ön koşulu; scout D6); E-5 kapı genelleştirmesi; tool_experience türev görünüm; E-14 metin evi. Çıkış: sözleşme testleri; kapısız yayın imkânsız (test); demet geri alma testi; iz satırı değişmezliği testi.
E3 · GÖLGE KARŞILAŞTIRMASI (A24 P2): kollar ADIYLA ve KOŞTURULABİLİR — canlı router çıktısı tekrar oynatılamadığı için bütün kollar digest'te KAYITLI router çıktısını (irFrame, routeProposals, offeredToolNames) sabit girdi alır: (1) kayıtlı-sunulan (bugün) · (2) matris kapalı (router.matrixReplace=0, ipuçları AÇIK) · (3) anahtar kelime her yolda · (4) BM25-TR · (5) dense (gerçek encoder) · (6) hibrit RRF · (7) +reranker (K16); ölçüler §8; iki göç varsayılanının OBLIGATION-OVERFLOW sıklığı; K9 kalibrasyon adayı. Çıkış: kazanan ölçümle; frameRouting/matrixReplace flip'i sahiple arayüzden, kapıyla.
E4 · KEŞİF–PLAN–YÜRÜTME (A24 P1-B/P3): boru hattı sırası (clarify → stage 07) ve şirket katmanı KOD kalemleri (D4); st07p (turn/planner.ts yeni modu) + yürütücü v0 (aggregate_records) + bütçeli fan-out; E-6 zinciri üç sağlayıcıda; E-3 sağlayıcı matrisi ve önbellek ön-eki. Çıkış: T2 tek tablo, ≤ router.maxFanout çağrı, sayılar yürütücü baytında; yeni keşfedilen araç aynı turda kullanılabilir; Anthropic'te obligation_honoured ölçülür.
E5 · ÖĞRENME VE KONTROLLÜ YAYIN + SÖKÜM (A24 P4/P5): olay → K23 → öneri → E-5 kapısı → canary → K21 yayın → geri alma (ilk LEARNED öneri geçer-yayınlanır-geri alınır); fren olay yoluna; MATRIX + IR süzgeç enum'ları + alias enum'u silinir, hand category rows arşivlenir, ALWAYS_INCLUDE zaten gitmiş; kırmızı test listesi kartta. Çıkış: A24 P4/P5 çıkışları + K-A/K-A′ yeşil + K-G 0.
ŞİMDİ (hükümden bağımsız, sahip onayıyla): ALWAYS_INCLUDE + assemble.ts:55 → veri (küçük kart, scout: repair now).

## 8 · Kabul sözleşmesi (K25: barajlar E1'de ilan edilir; K19 dilimli; K11 üç küme)

| Ölçüm | Kanıtladığı | SOTA izi |
|---|---|---|
| Backend Recall@k + araç Recall@3 + gerekli KÜMENİN tam kapsanması (backend başına, K19 dilimleri) | Gerekli yetenekler erişilebilir mi | Tier C API-Bank |
| Doğru argüman/kapsam; görev başarısı (E2E golden N=10/backend) | İş tamamlandı mı | Tier B zero-code mount; E2E sınavı |
| Yanlış-kesin ve gereksiz-vazgeçme (A24 iki yönlü soru metriği; false-scope) | Belirsizlik yönetimi | Tier A Gaia2; K4; K22 |
| Çağrı, tekrar, token, FATURA maliyeti (önbellek dahil) | Kaynak | K26 (c); K18 |
| p50/p95 (K18 SLO) | Hız | K18 |
| Backend × dil × SAĞLAYICI kırılımı | Zayıf grup gizli mi | K19; E-3 |
| Yetki, şema değişimi, kesinti, geri alma, QUARANTINE testleri | Değişim/arıza altında doğru mu | Tier D; K10; K21 |
| K-A / K-A′ iki görülmemiş backend sıfır kod (E-12 kapsamı) | Genelleme | Tier B; AGNOSTIC-1 |
| K-G kodda backend adı 0 — gerekli, yeterli değil | Hard-code yok | OWNER-RULING-S153 |

## 9 · Sahibin hükmüne sunulanlar (OWNER-RULING-S160-ROUTING-V2-1) — tek yol önerileriyle

(a) OWNER-RULING-S140-K1-ORDER-CELL-HINT-1 ve IR-3 yerine-geçme kuralının geri alınması (E5'te silinir; E2'den itibaren hükümsüz). Öneri: EVET.
(b) Yükümlülük göç varsayılanı, scout'un sayılarıyla: A · 169 anahtar kelimenin hepsi yükümlülük → 185 turda yükümlü araç p50 13, p90 46, max 56; >20 araç 25–65 turda; taşma NORMAL durum. B · mevcut satırlar ipucu + merdiven tabanı (A24 P4'ün kendi metni), yükümlülükler sahibin arayüzden yayınladığı (koşul, araç) satırları, ilk dördü dört tanığın anahtarları → taşma yapısal olarak nadir. Öneri: B.
(c) ŞİRKET katmanı: backend_entity_layers'a satır (veri) + IR_OBJECTS/alias enum'unun E4'te açılması (kod) + canlı "Kaleseramik → KS fabrika" alias'ının önceliği (şirket katmanı exact-match kazanır; fabrika alias'ı arşivlenir ya da kalır). Öneri: şirket kazanır, fabrika alias'ı ARŞİV.
(d) E1 üç-sağlayıcı taban ölçümü harcaması (held-out × 3 sağlayıcı; fatura maliyetiyle raporlanır). Öneri: ONAY, tavan kartta ilan.
(e) ADR-008 (scout S159-1): çerçeve yalnız gözlem. Öneri: EVET, E-1 ile aynı hüküm.
(f) ALWAYS_INCLUDE + assemble.ts:55 → veri küçük kartı ŞİMDİ (hükümden bağımsız). Öneri: ONAY.

## 10 · Kaynaklar (scout S1/S2 ölçümüyle düzeltilmiş)
- A24-V1_3-ARCHITECT-CAPTURE-S150-1-v1 — taban; §2 bayt bayt.
- CWF-ASTRA-REVIEW-EVALUATION-S159-1; SCOUT-STATUS-REVIEW-ROUTING-ARCHITECTURE-v2-S159-1 ve -S159-2.
- ToolScope (arXiv 2510.20036; ACL 2026 long): scout alıntısı §4.1 "we use a dense-only retriever (α=1) and rerank the top-50 candidates with a cross-encoder using min–max normalization"; §3.2 "we update our original benchmark dataset β by relabeling our gold responses"; taban çizgileri "on the original, unmerged tool sets" → Astra haklı: BM25+dense kanıtı DEĞİL; kazanç yeniden etiketlenmiş kümede.
- Toollery (arXiv 2609.22218): kart başına üretilmiş niyet sorguları; sayılar AYNI KOŞULDA: ham spec BM25 .571; genişletilmiş indekste BM25 .942, dense .900, RRF .945; embed+rerank ham spec .704 (.942 vs .704 aynı koşul değildir — scout kendi S159-1 okumasını düzeltti); App B.2: "visible-token reduction alone does not imply proportional monetary savings" → fatura ölçülür.
- Tool-to-Agent Retrieval (arXiv 2511.01854): ajan/sunucu getirmesi; +19.4% Recall@5 (LiveMCPBench) — nihai cevap değil.
- ToolRet (ACL 2025 Findings 2025.findings-acl.1258); HYSET / Tools Are Not Islands (arXiv 2607.25718); BaRP (arXiv 2510.07429) hipotez; SkillSmith; MUSE-Autoskill; MCP spec 2025-06-18 (`name` "Unique identifier for the tool"; tools/call sunucu oturumuna adresli).
- "%98 bağlam", "30–50 araç": A24 §12 "claims not to be repeated" — bu belgede eşik değildir.

END · CWF-ROUTING-ARCHITECTURE-v2-DRAFT-S159-3
